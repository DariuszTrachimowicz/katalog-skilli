#!/usr/bin/env python3
"""Wyciąg bankowy (CSV z polskiego banku) na tabelę z kontrolą sum.

Co robi:
- rozpoznaje kodowanie (UTF-8 z BOM i bez, Windows-1250), separator (średnik, przecinek,
  tabulator) i wiersz nagłówka (pomija blok informacji o rachunku przed tabelą i stopkę),
- znajduje kolumny po nazwach: data, kwota albo osobno uznania i obciążenia, opis, tytuł,
  kontrahent, rachunek kontrahenta, saldo po operacji, waluta,
- oznacza: przeksięgowania VAT w podzielonej płatności (/VAT/, rachunek VAT), przelewy na
  mikrorachunek podatkowy (ciąg 10100071222), do ZUS (ciąg 60000002026 na pozycjach 3-13),
  opłaty i prowizje banku, duplikaty, kwoty w innej walucie,
- liczy sumy wpływów i wydatków (bez przeksięgowań VAT) i sprawdza ciągłość salda,
- z pliku reguł (słowo w opisie -> kategoria) przypisuje kategorie i liczy sumy, a pozycje
  bez reguły wypisuje do decyzji,
- numery rachunków w wyjściu maskuje (zostają 4 ostatnie cyfry).

Użycie:
  python wyciag.py historia.csv
  python wyciag.py historia.csv --reguly reguly.json --csv wynik.csv
  python wyciag.py --selftest

reguly.json: {"ORLEN": "Paliwo i auto", "CZYNSZ": "Czynsz i media", ...}
(słowo albo fraza, wielkość liter bez znaczenia, pierwsza pasująca reguła wygrywa;
 klucz zaczynający się od "re:" to wyrażenie regularne)

Kod wyjścia: 0 bez uwag, 1 wynik z uwagami, 2 złe dane.
"""
import argparse
import csv
import io
import json
import re
import sys
from datetime import date, datetime
from decimal import Decimal, InvalidOperation


class ZleDane(Exception):
    pass


def dekoduj(b):
    """Zwraca (tekst, kodowanie). UTF-8 ma pierwszeństwo, inaczej Windows-1250."""
    if b.startswith(b"\xef\xbb\xbf"):
        return b[3:].decode("utf-8"), "UTF-8 z BOM"
    try:
        return b.decode("utf-8"), "UTF-8"
    except UnicodeDecodeError:
        pass
    try:
        return b.decode("cp1250"), "Windows-1250"
    except UnicodeDecodeError:
        raise ZleDane("nie rozpoznaję kodowania pliku (ani UTF-8, ani Windows-1250)")


def norm(t):
    return re.sub(r"\s+", " ", (t or "").replace("#", "").replace("﻿", "")).strip().lower()


POLA = [
    ("data", [r"^data ksi[eę]gowania$", r"^data ksi[eę]g\.?$", r"^data operacji$", r"^data transakcji$", r"^data waluty$", r"^data$"]),
    ("uznanie", [r"uznani", r"wp[lł]yw", r"^ma$"]),
    ("obciazenie", [r"obci[aą][zż]eni", r"wyp[lł]yw", r"^winien$"]),
    ("kwota", [r"^kwota w walucie rachunku$", r"^kwota operacji$", r"^kwota$", r"^kwota transakcji$"]),
    ("saldo", [r"saldo"]),
    ("waluta", [r"^waluta rachunku$", r"^waluta$", r"^waluta operacji$"]),
    ("kontrahent", [r"nadawca ?/ ?odbiorca", r"^kontrahent", r"nazwa (nadawcy|odbiorcy)", r"^odbiorca$", r"^nadawca$"]),
    ("rachunek", [r"numer konta", r"rachunek (docelowy|źródłowy|zrodlowy)", r"numer rachunku", r"^rachunek"]),
    ("tytul", [r"^tytu[lł]", r"^tytułem$", r"szczeg[oó][lł]y"]),
    ("opis", [r"opis", r"typ (transakcji|operacji)", r"rodzaj (transakcji|operacji)"]),
]


def mapuj(naglowki):
    """Zwraca słownik pole -> lista indeksów kolumn (dla daty wybiera najlepszą)."""
    n = [norm(h) for h in naglowki]
    mapa = {}
    for pole, wzorce in POLA:
        for w in wzorce:
            for i, h in enumerate(n):
                if h and re.search(w, h) and not any(i in v for v in mapa.values()):
                    mapa.setdefault(pole, [])
                    if pole in ("data", "kwota", "saldo", "waluta", "uznanie", "obciazenie"):
                        if not mapa[pole]:
                            mapa[pole].append(i)
                    else:
                        mapa[pole].append(i)
            if pole in ("data", "kwota") and mapa.get(pole):
                break
    return mapa


def separator(linie):
    najlepszy, wynik = None, -1
    for sep in (";", ",", "\t"):
        try:
            wiersze = list(csv.reader(linie[:60], delimiter=sep, quotechar='"', strict=True))
        except csv.Error:
            continue
        dlug = [len(w) for w in wiersze if len(w) >= 2]
        if not dlug:
            continue
        najczestsza = max(set(dlug), key=dlug.count)
        punkty = dlug.count(najczestsza) * najczestsza
        if punkty > wynik:
            najlepszy, wynik = sep, punkty
    if not najlepszy:
        raise ZleDane("nie rozpoznaję separatora pól (średnik, przecinek albo tabulator)")
    return najlepszy


WALUTA_SUFIKS = re.compile(r"\s*(PLN|ZŁ|EUR|USD|GBP|CHF|CZK|SEK|NOK|DKK|HUF|UAH)\s*$", re.I)


def waluta_z(t):
    m = WALUTA_SUFIKS.search((t or "").strip())
    if not m:
        return ""
    w = m.group(1).upper()
    return "PLN" if w == "ZŁ" else w


def wartosc(t):
    """Kwota w zapisie polskim albo z kropką; zwraca Decimal albo None dla pustej."""
    s = (t or "").strip().replace("\xa0", " ")
    if s == "":
        return None
    s = WALUTA_SUFIKS.sub("", s)
    if re.fullmatch(r"\(.*\)", s):  # zapis księgowy (123,45) = minus
        s = "-" + s[1:-1]
    if s.endswith("-") and not s.startswith("-"):  # minus na końcu
        s = "-" + s[:-1]
    s = s.replace(" ", "")
    if s.startswith("+"):
        s = s[1:]  # „1+2” zostaje błędem, nie 12
    if re.fullmatch(r"-?\d{1,3}(\.\d{3})+,\d{1,2}", s):
        s = s.replace(".", "").replace(",", ".")
    elif re.fullmatch(r"-?\d+,\d{1,4}", s):
        s = s.replace(",", ".")
    elif not re.fullmatch(r"-?\d+(\.\d{1,4})?", s):
        raise ValueError(t)
    k = Decimal(s)
    if not k.is_finite():
        raise ValueError(t)
    return k


def data_z(t):
    s = (t or "").strip()[:10]
    for f in ("%Y-%m-%d", "%d.%m.%Y", "%d-%m-%Y", "%d/%m/%Y", "%Y.%m.%d", "%Y%m%d"):
        try:
            return datetime.strptime(s, f).date()
        except ValueError:
            continue
    raise ValueError(t)


IBAN_DLUGOSC = {"AT": 20, "BE": 16, "BG": 22, "CH": 21, "CY": 28, "CZ": 24, "DE": 22, "DK": 18,
                "EE": 20, "ES": 24, "FI": 18, "FR": 27, "GB": 22, "GR": 27, "HR": 21, "HU": 28,
                "IE": 22, "IT": 27, "LT": 20, "LU": 20, "LV": 21, "MT": 31, "NL": 18, "NO": 15,
                "PL": 28, "PT": 25, "RO": 24, "SE": 24, "SI": 19, "SK": 24, "UA": 29}
KONTEKST_DOKUMENTU = re.compile(r"(?<![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])(?:F[VSAKZ]|FAKTUR\w*|PARAGON\w*|RACHUN\w*|KOREKT\w*|PA|RA|ZAM[OÓ]WIENI\w*|ZAM\.|KWOTA|DOKUMENT\w*)(?:[\s.:/#-]*(?:VAT|NR\.?|NUMER))*[\s.:/#-]*$", re.I)


def pesel_ok(t):
    c = re.sub(r"\D", "", t)
    if len(c) != 11:
        return False
    s = sum(int(a) * w for a, w in zip(c, (1, 3, 7, 9, 1, 3, 7, 9, 1, 3)))
    return (10 - s % 10) % 10 == int(c[10])
PO_KWOCIE = re.compile(r"\s*(?:PLN|ZŁ|EUR|USD|GBP|CHF)\b", re.I)


def dokument(mt):
    """Liczba zaraz po „FV”, „faktura”, „kwota” albo przed walutą to numer dokumentu lub kwota."""
    t = mt.string
    return bool(KONTEKST_DOKUMENTU.search(t[max(0, mt.start() - 30):mt.start()]) or PO_KWOCIE.match(t[mt.end():]))


def maskuj(t):
    """Numery rachunków do 4 ostatnich znaków; karty, PESEL, telefony i adresy kategorią."""
    def rachunek(mt):
        znaki = re.sub(r"[^0-9A-Za-z]", "", mt.group(0))
        return "…" + znaki[-4:]

    def iban(mt):
        s = mt.group(0)
        dl = IBAN_DLUGOSC.get(s[:2].upper())
        n = 0
        for i, c in enumerate(s):
            if c.isalnum():
                n += 1
                if dl and n == dl:  # dalsze znaki (np. „FV12”) nie należą do rachunku
                    return "…" + re.sub(r"[^0-9A-Za-z]", "", s[:i + 1])[-4:] + s[i + 1:]
        return rachunek(mt)

    def jesli_nie_dokument(etykieta, zawsze=lambda mt: False):
        """Liczby pewne z budowy (PESEL z sumą kontrolną, +48) maskujemy zawsze, inne poza kontekstem dokumentu."""
        def f(mt):
            return etykieta if zawsze(mt) or not dokument(mt) else mt.group(0)
        return f

    def adres(mt):
        przed = mt.string[max(0, mt.start() - 14):mt.start()]
        return mt.group(0) if re.search(r"lokalizacja:\s*$", przed, re.I) else "adres: [adres]"
    t = re.sub(r"\s*[\r\n]+\s*", " ", t or "")  # pole wieloliniowe: złamanie wiersza nie kończy wartości po etykiecie
    # jawnie opisane dane osoby: po etykiecie znika cała wartość do końca pola (do ; | albo
    # następnej etykiety „Słowo:”); lepiej zamaskować za dużo niż pokazać PESEL albo adres
    koniec = r"$"  # do końca pola: słowo z dwukropkiem w środku („do kontaktu:”, „Ulica:”) nie kończy wartości
    data_wzor = re.compile(r"(?<!\d)(?:\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2}|\d{1,2}[.\-/]\d{1,2}[.\-/]\d{4}"
                           r"|20\d\d(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))(?!\d)")
    po_dokumencie = re.compile(r"(?:FV|FAKTUR\w*|NIP|ZAM[OÓ]WIENI\w*|ZAM\.|KWOTA|DOKUMENT\w*)(?:[\s.:/#-]*(?:VAT|NR\.?|NUMER))*[\s.:/#-]*$", re.I)

    def telefony(t):
        """Wszystkie ciągi 7-15 cyfr ze spacjami, dywizami, kropkami, nawiasami albo + (pozycje);
        pomija daty, kwoty (przecinek albo dwa miejsca po kropce; sama waluta za liczbą nie wystarcza,
        bo po etykiecie telefonu „600100200 PLN” to nadal telefon) i numery po „FV”,
        „NIP”, „faktura”, „zamówienie”."""
        # najpierw osłona tego, co na pewno nie jest telefonem (pozycje bez zmian), potem każdy
        # pozostały ciąg z co najmniej 7 cyframi znika, bez górnego limitu (sklejone numery też)
        bez = data_wzor.sub(lambda d: "#" * len(d.group(0)), t)
        bez = re.sub(r"(?<![\d.,])(?:\d{1,3}(?:[ \xa0]\d{3})+|\d+)[.,]\d{2}(?![\d.,]?\d)", lambda d: "#" * len(d.group(0)), bez)
        bez = re.sub(r"(?i)NIP[\s.:#-]*\d(?:[\s\-]?\d){9}(?!\d)", lambda d: "#" * len(d.group(0)), bez)
        bez = re.sub(r"(?i)(?<!\d)(?:\d{1,3}(?:[ \xa0]\d{3})+|\d+)(?:[.,]\d{2})?\s*(?:PLN|ZŁ|EUR|USD|GBP|CHF|CZK|SEK|NOK|DKK|HUF|UAH)\b", lambda d: "#" * len(d.group(0)), bez)
        bez = re.sub(r"(?i)(?<![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])(?:F[VSAKZ]|FAKTUR\w*|PARAGON\w*|RACHUN\w*|KOREKT\w*|PA|RA|ZAM[OÓ]WIENI\w*|ZAM\.|KWOTA|DOKUMENT\w*|NIP)(?:[\s.:/#-]*(?:VAT|NR\.?|NUMER))*[\s.:/#-]*[0-9A-Za-z][0-9A-Za-z/\-.]*",
                     lambda d: "#" * len(d.group(0)), bez)
        wynik = []
        for m in re.finditer(r"[+(]?\d[\d\s\-()./]*\d", bez):
            if len(re.sub(r"\D", "", m.group(0))) >= 7:
                wynik.append((m.start(), m.end()))
        return wynik

    def etykieta(nazwa, zamiennik):
        def f(mt):
            if nazwa == "adres" and re.search(r"lokalizacja:\s*$", mt.string[max(0, mt.start() - 14):mt.start()], re.I):
                return mt.group(0)  # karta w PKO: adres sklepu
            if nazwa == "pesel":
                # każdy numer z 11 cyfr do końca tekstu (dwie osoby w jednym tytule), dowolne separatory
                wartosc_pola, ile = re.subn(r"(?<!\d)\d(?:[\s\-./_:;\u2013\u2014]*\d){10}(?!\d)", zamiennik, mt.group(2))
                return mt.group(0) if not ile else mt.group(1) + wartosc_pola
            if nazwa == "telefon":
                wartosc_pola = mt.group(2)
                miejsca = telefony(wartosc_pola)
                if not miejsca:
                    return mt.group(0)  # po etykiecie nie ma numeru telefonu (np. „abonament tel. za 01.11.2026 FV 42/2026”)
                # każdy numer do końca pola znika, tekst między numerami (FV, data, NIP) zostaje
                for a, b in reversed(miejsca):
                    wartosc_pola = wartosc_pola[:a] + zamiennik + wartosc_pola[b:]
                return mt.group(1) + wartosc_pola
            return mt.group(1) + " " + zamiennik
        return f
    t = re.sub(r"(?i)(?<![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])(PESEL)((?:\s*(?:nr\.?|numer))?\s*:?\s*.*?)" + koniec, etykieta("pesel", "[PESEL]"), t)
    TELEFON_ETYKIETA = re.compile(r"(?i)(?<![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])(tel\.|tel(?![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])|telefon[a-ząćęłńóśźż]*|kom\.|kom(?![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])|komórk[a-ząćęłńóśźż]*|mob\.|mobile|gsm(?![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]))(\s*:?\s*.*?)" + koniec)
    t = TELEFON_ETYKIETA.sub(etykieta("telefon", "[telefon]"), t)
    t = re.sub(r"(?i)(?<![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])(adres(?:\s+(?:zamieszkania|zameldowania|do korespondencji))?|adr\.|adr(?![A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])|miejsce\s+zamieszkania|zamieszka[łl]\w*|zameldowan\w*)((?:\s*:\s*|\s+).*?)" + koniec, etykieta("adres", "[adres]"), t)
    t = re.sub(r"\+\s*\d{1,3}[\s\-]*\(?\d{2,4}\)?(?:[\s\-]?\d{2,4}){2,4}(?!\d)", "[telefon]", t)
    t = re.sub(r"(?<!\d)\(\d{2,3}\)[ \-]?\d{3}[ \-]?\d{2,3}[ \-]?\d{2,3}(?!\d)", "[telefon]", t)
    t = re.sub(r"(?<![0-9A-Za-z])(?:PL)?\d{2}(?:[ ]?\d{4}){6}(?!\d)", rachunek, t)
    t = re.sub(r"(?<![0-9A-Za-z])[A-Z]{2}\d{2}(?:[ ]?[A-Z0-9]{4}){3,7}(?:[ ]?[A-Z0-9]{1,3})?(?![0-9A-Za-z])", iban, t)
    t = re.sub(r"(?<![0-9*X])(?:[0-9*X]{4}[ -]?){3}[0-9*X]{4}(?![0-9*X])", "[numer karty]", t)
    t = re.sub(r"(?<![\w/-])\d{6}[ -]?\d{5}(?![\w/-])", jesli_nie_dokument("[11 cyfr, np. PESEL]"), t)
    t = re.sub(r"(?<![\w,./-])(?:\+48[ -]?|(?!0))\d{3}[ .-]?\d{3}[ .-]?\d{3}(?![\w/-]|[,.]\d)", jesli_nie_dokument("[telefon]", lambda mt: mt.group(0).startswith("+48")), t)
    t = re.sub(r"(?i)\b(?:ul|al|os|pl)\.\s*[^,;|]{1,40}?\d+[a-z]?(?:/\d+)?", "[adres]", t)
    t = re.sub(r"(?<![\w/-])\d{2}-\d{3}(?![\w/-])", jesli_nie_dokument("[kod pocztowy]"), t)
    return t


def bez_formuly(t):
    """Pole tekstowe do CSV: nie zaczyna się od znaku, który arkusz wziąłby za formułę."""
    t = t or ""
    return "'" + t if t[:1] in ("=", "+", "-", "@", "\t", "\r") else t


STOPKA = re.compile(r"^\s*#?\s*(?:suma|razem|[łl][aą]cznie|saldo|podsumowanie|obroty|stan rachunku|liczba operacji|kryteria)(?:\s+\S+)?\s*:?\s*$"
                    r"|\b(?:razem|og[oó][łl]em|[łl][aą]cznie)\s*:?\s*$", re.I)


def wczytaj(tekst):
    linie = [l for l in tekst.splitlines()]
    sep = separator([l for l in linie if l.strip()])
    nieodczytane, bledy = [], []
    czytnik = csv.reader(io.StringIO(tekst), delimiter=sep, quotechar='"', strict=True)
    try:
        wiersze = list(czytnik)
    except csv.Error:
        nieodczytane.append(f"linia pliku {czytnik.line_num}")
        bledy.append(f"uszkodzony cudzysłów około linii {czytnik.line_num} pliku: operacje mogły się skleić albo zniknąć")
        wiersze = list(csv.reader(io.StringIO(tekst), delimiter=sep, quotechar='"'))
    start = None
    for i, w in enumerate(wiersze[:80]):
        m = mapuj(w)
        if "data" in m and ("kwota" in m or ("uznanie" in m and "obciazenie" in m)):
            start = i
            break
    if start is None:
        raise ZleDane("nie znalazłem wiersza nagłówka z datą i kwotą (albo uznaniami i obciążeniami)")
    naglowki = wiersze[start]
    mapa = mapuj(naglowki)
    zajete = {i for v in mapa.values() for i in v}
    puste = [i for i, h in enumerate(naglowki) if not norm(h) and i not in zajete]
    if puste:
        mapa.setdefault("opis", []).extend(puste)  # np. iPKO: dalsze części opisu bez nazwy kolumny
    typ = [i for i in mapa.get("opis", []) if re.search(r"typ (transakcji|operacji)|rodzaj", norm(naglowki[i]))]
    # pole w cudzysłowie, w którym po złamaniu linii stoi data i separator: sklejona operacja
    sklejona = re.compile(r"\n\s*\"?(?:\d{4}[.\-/]\d{2}[.\-/]\d{2}|\d{2}[.\-/]\d{2}[.\-/]\d{4}|\d{8})\"?\s*" + re.escape(sep))
    dane, pominiete = [], 0
    for nr, w in enumerate(wiersze[start + 1:], start=start + 2):
        if not any(c.strip() for c in w):
            continue

        def pole(p, sep=" "):
            return sep.join(w[i].strip() for i in mapa.get(p, []) if i < len(w) and w[i].strip())
        kwoty = [w[mapa[p][0]] for p in ("kwota", "uznanie", "obciazenie") if p in mapa and mapa[p][0] < len(w)]
        k = mapa["data"][0]
        komorka = w[k].strip() if k < len(w) else ""
        try:
            d = data_z(komorka)
        except ValueError:
            stopka = STOPKA.search(komorka) or (not komorka and any(STOPKA.search(c) for c in w))
            if any(re.search(r"\d", x) for x in kwoty) and not stopka:
                nieodczytane.append(nr)
                bledy.append(f"wiersz {nr}: brak albo nieprawidłowa data przy kwocie; operacja poza sumami")
            else:
                pominiete += 1  # stopka, podsumowanie, drugi wiersz nagłówka
            continue
        if any(sklejona.search(c) for c in w):
            nieodczytane.append(nr)
            bledy.append(f"wiersz {nr}: pole w cudzysłowie obejmuje następną linię, która wygląda jak osobna operacja (niedomknięty cudzysłów?); tamta operacja nie weszła do sum")
        waluty = {waluta_z(x) for x in kwoty if waluta_z(x)}
        waluta_sufiks = next(iter(waluty), "")
        waluta_kol = pole("waluta").upper().replace("ZŁ", "PLN")
        if len(waluty) > 1 or (waluta_sufiks and waluta_kol and waluta_sufiks != waluta_kol):
            nieodczytane.append(nr)
            bledy.append(f"wiersz {nr}: sprzeczne waluty ({', '.join(sorted(waluty | {waluta_kol} - {''}))}); operacja poza sumami")
            continue
        try:
            if "kwota" in mapa:
                kw = wartosc(w[mapa["kwota"][0]]) if mapa["kwota"][0] < len(w) else None
            else:
                u = wartosc(w[mapa["uznanie"][0]]) if mapa["uznanie"][0] < len(w) else None
                o = wartosc(w[mapa["obciazenie"][0]]) if mapa["obciazenie"][0] < len(w) else None
                kw = (u or Decimal(0)) - abs(o or Decimal(0))
                if u is None and o is None:
                    kw = None
        except (ValueError, InvalidOperation):
            nieodczytane.append(nr)
            bledy.append(f"wiersz {nr}: nieczytelna kwota; operacja poza sumami")
            continue
        try:
            saldo = wartosc(w[mapa["saldo"][0]]) if "saldo" in mapa and mapa["saldo"][0] < len(w) else None
        except (ValueError, InvalidOperation):
            saldo = None
            bledy.append(f"wiersz {nr}: nieczytelne saldo; operacja zostaje, saldo pominięte w kontroli")
        if kw is None:
            nieodczytane.append(nr)
            bledy.append(f"wiersz {nr}: brak kwoty; operacja poza sumami")
            continue
        dane.append({"wiersz": nr, "data": d, "kwota": kw, "saldo": saldo,
                     "waluta": waluta_kol or waluta_sufiks, "kontrahent": pole("kontrahent"),
                     "rachunek": pole("rachunek", " | "), "tytul": pole("tytul"), "opis": pole("opis"),
                     "opisy": [w[i].strip() for i in (typ or mapa.get("opis", [])) if i < len(w) and w[i].strip()]})
    if not dane:
        raise ZleDane("po nagłówku nie ma ani jednej operacji z datą i kwotą")
    return naglowki, mapa, sep, dane, pominiete, bledy, nieodczytane


def nrb_ok(cyfry):
    """Polski numer rachunku (26 cyfr): suma kontrolna IBAN."""
    if len(cyfry) != 26 or not cyfry.isdigit():
        return False
    return int(cyfry[2:] + "2521" + cyfry[:2]) % 97 == 1


def oznacz(o):
    tekst = " ".join([o["opis"], o["tytul"], o["kontrahent"]]).upper()
    rachunki = [re.sub(r"\D", "", r) for r in o["rachunek"].split("|")]
    # numery rachunków wpisane w opis albo tytuł (np. PKO): 26 cyfr, także ze spacjami
    for m in re.finditer(r"(?<!\d)(?:PL)?\d{2}(?:[ ]?\d{4}){6}(?!\d)", " ".join([o["opis"], o["tytul"]])):
        if not dokument(m):  # numer po „FV” to numer dokumentu, nie rachunek odbiorcy
            rachunki.append(re.sub(r"\D", "", m.group(0)))
    z = []
    if "/VAT/" in tekst.replace(" ", "") or re.search(r"RACH(UNEK|\.)? ?VAT|PRZEKSI[EĘ]GOWANIE.*VAT|PODATKU VAT", tekst):
        z.append("VAT")
    if any(nrb_ok(r) and r[2:13] == "10100071222" for r in rachunki):
        z.append("US")
    if any(nrb_ok(r) and r[2:13] == "60000002026" for r in rachunki):
        z.append("ZUS")
    typ_tekst = " ".join(o.get("opisy") or [o["tytul"]]).upper()
    if re.search(r"OP[ŁL]AT[AY]|PROWIZJ|ABONAMENT ZA|MONTHLY FEE", typ_tekst):
        z.append("OPŁATA")
    if o["waluta"] and o["waluta"].upper() not in ("PLN", "ZŁ"):
        z.append("WALUTA")
    return z


VAT_TYP = re.compile(r"^\s*(?:PRZEKSI[EĘ]GOWANIE\s+(?P<na>NA|Z)\s+RACH(?:UNEK|UNKU|\.)?\s*VAT"
                     r"|PRZELEW\s+(?P<kier>PRZYCHODZ[AĄ]CY|WYCHODZ[AĄ]CY)\s+PODATKU\s+VAT)")


def przeksiegowanie_vat(o, znaczniki):
    """Ruch między rachunkiem rozliczeniowym a rachunkiem VAT w ramach podzielonej płatności.

    Rozpoznaje po typie operacji na początku pola: kolumna typu transakcji, gdy plik ją ma
    (PKO, Pekao), inaczej opis operacji (mBank), a tytuł tylko bez obu. Kierunek musi zgadzać
    się ze znakiem kwoty. Opłata za przeksięgowanie, przelew do urzędu skarbowego i fraza
    w opisie przy zwykłym typie przelewu nie wystarczą.
    """
    if "VAT" not in znaczniki or "US" in znaczniki:
        return False
    pola = o.get("opisy") or [re.sub(r"/VAT/.*", "", o["tytul"], flags=re.I)]
    for p in pola:
        m = VAT_TYP.match(p.upper())
        if m:
            ujemna = m.group("na") == "NA" if m.group("na") else m.group("kier").startswith("WYCHODZ")
            return (o["kwota"] < 0) == ujemna
    return False


ZE_ZNACZNIKA = {"US": "Podatki (US)", "ZUS": "ZUS", "OPŁATA": "Opłaty bankowe"}


def kategoria(o, reguly):
    """Pierwsza pasująca reguła (fraza albo re:wyrażenie, na opisie, tytule i kontrahencie);
    bez reguły kategoria ze znacznika US, ZUS albo OPŁATA."""
    tekst = " ".join([o["opis"], o["tytul"], o["kontrahent"]])
    for klucz, kat in reguly.items():
        if klucz.startswith("re:"):
            if re.search(klucz[3:], tekst, re.I):
                return kat
        elif klucz.lower() in tekst.lower():
            return kat
    for z in o.get("znaczniki", []):
        if z in ZE_ZNACZNIKA:
            return ZE_ZNACZNIKA[z]
    return None


def zl(k):
    znak = "-" if k < 0 else ""
    k = abs(k).quantize(Decimal("0.01"))
    calk, ulam = f"{k:.2f}".split(".")
    g = []
    while calk:
        g.insert(0, calk[-3:])
        calk = calk[:-3]
    return znak + " ".join(g) + "," + ulam


def analiza(tekst, reguly=None):
    naglowki, mapa, sep, dane, pominiete, bledy, nieodczytane = wczytaj(tekst)
    reguly = reguly or {}
    for klucz in reguly:
        if klucz.startswith("re:"):
            try:
                re.compile(klucz[3:])
            except re.error as e:
                raise ZleDane(f"reguła „{klucz}” nie jest poprawnym wyrażeniem: {e}")
    uwagi = list(bledy)
    if nieodczytane:
        uwagi.insert(0, f"SUMY NIEPEŁNE: nie wszystko dało się odczytać (wiersze: {', '.join(map(str, nieodczytane))}); nie podawaj sum jako końcowych")
    for o in dane:
        o["znaczniki"] = oznacz(o)
        o["przeksiegowanie_vat"] = przeksiegowanie_vat(o, o["znaczniki"])
        o["kategoria"] = kategoria(o, reguly) if reguly else None
    # duplikaty
    widziane = {}
    for o in dane:
        k = (o["data"], o["kwota"], o["tytul"], o["opis"], o["kontrahent"])
        if k in widziane:
            o["znaczniki"].append("DUPLIKAT?")
            uwagi.append(f"wiersz {o['wiersz']} wygląda jak powtórzenie wiersza {widziane[k]} (ta sama data, kwota i opis); sprawdź, czy to dwie operacje")
        else:
            widziane[k] = o["wiersz"]
    # saldo
    salda = [o for o in dane if o["saldo"] is not None]
    saldo_stan = "nie sprawdzono: plik nie ma salda po operacji"
    if len(salda) >= 2:
        def ciaglosc(lista):
            """Między kolejnymi saldami sumuje wszystkie operacje (także bez salda)."""
            zle, ostatnie, suma = 0, None, Decimal(0)
            for o in lista:
                if ostatnie is None:
                    if o["saldo"] is not None:
                        ostatnie = o["saldo"]
                    continue
                suma += o["kwota"]
                if o["saldo"] is not None:
                    if ostatnie + suma != o["saldo"]:
                        zle += 1
                    ostatnie, suma = o["saldo"], Decimal(0)
            return zle
        daty = [o["data"] for o in dane]
        niejasna = None
        if all(a <= b for a, b in zip(daty, daty[1:])) and daty[0] != daty[-1]:
            zle = ciaglosc(dane)  # od najstarszej
        elif all(a >= b for a, b in zip(daty, daty[1:])) and daty[0] != daty[-1]:
            zle = ciaglosc(list(reversed(dane)))  # najnowsze na górze
        else:
            przod, tyl = ciaglosc(dane), ciaglosc(list(reversed(dane)))
            zle = min(przod, tyl)
            niejasna = "obu kierunkach" if przod == tyl == 0 else ("kolejności od góry" if przod == 0 else "kolejności od dołu")
        if len(salda) < len(dane):
            uwagi.append(f"saldo podane tylko przy {len(salda)} z {len(dane)} operacji; kontrola obejmuje tylko te wiersze")
        if zle:
            saldo_stan = f"rozjazd w {zle} miejscach"
            if niejasna:
                saldo_stan += " (kolejność operacji nie wynika z dat, policzone przy korzystniejszym kierunku)"
            uwagi.append(f"saldo po operacji nie zgadza się w {zle} miejscach (saldo poprzednie + kwota ≠ saldo); możliwe brakujące operacje, inna kolejność albo operacje z tą samą datą w innym porządku")
        elif niejasna:
            saldo_stan = f"nie sprawdzono: kolejność operacji nie wynika z dat (jedna data albo pomieszane); saldo układa się bez rozjazdu w {niejasna}, porównaj z wyciągiem z banku"
        elif nieodczytane:
            saldo_stan = "nie sprawdzono: część operacji nie dała się odczytać; pozostałe układają się bez rozjazdu"
        else:
            saldo_stan = "zgodna (sprawdza ciągłość operacji z pliku, nie to, czy plik ma wszystkie operacje z okresu)"
    elif len(salda) == 1:
        saldo_stan = "nie sprawdzono: saldo tylko przy jednej operacji"
    if any("WALUTA" in o["znaczniki"] for o in dane):
        uwagi.append("są operacje w innej walucie niż PLN: są poza sumami w zł (skrypt nie przelicza kursów); gdy bank podaje kwotę w walucie rachunku, zwykle jest w osobnej kolumnie")
    licz = [o for o in dane if not o["przeksiegowanie_vat"] and "WALUTA" not in o["znaczniki"]]
    obce = {}
    for o in dane:
        if "WALUTA" in o["znaczniki"]:
            obce.setdefault(o["waluta"].upper(), Decimal(0))
            obce[o["waluta"].upper()] += o["kwota"]
    wplywy = sum((o["kwota"] for o in licz if o["kwota"] > 0), Decimal(0))
    wydatki = sum((o["kwota"] for o in licz if o["kwota"] < 0), Decimal(0))
    vat = [o for o in dane if o["przeksiegowanie_vat"]]
    miesiace = {}
    for o in licz:
        m = miesiace.setdefault(f"{o['data'].year}-{o['data'].month:02d}", [Decimal(0), Decimal(0)])
        m[0 if o["kwota"] > 0 else 1] += o["kwota"]
    kat = {}
    bez = []
    if reguly:
        for o in licz:
            if o["kategoria"]:
                kat.setdefault(o["kategoria"], [Decimal(0), Decimal(0), 0])
                kat[o["kategoria"]][0 if o["kwota"] > 0 else 1] += o["kwota"]
                kat[o["kategoria"]][2] += 1
            else:
                bez.append(o)
    wynik = {
        "separator": {";": "średnik", ",": "przecinek", "\t": "tabulator"}[sep],
        "kolumny": {p: [naglowki[i] for i in v] for p, v in mapa.items()},
        "operacji": len(dane), "pominiete": pominiete,
        "od": min(o["data"] for o in dane), "do": max(o["data"] for o in dane),
        "wplywy": wplywy, "wydatki": wydatki, "netto": wplywy + wydatki,
        "vat": vat, "obce": obce, "saldo_stan": saldo_stan, "reguly": bool(reguly), "miesiace": miesiace, "nieodczytane": nieodczytane, "kategorie": kat, "bez_kategorii": bez, "uwagi": uwagi, "dane": dane,
    }
    return wynik


MIESIACE = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia",
            "września", "października", "listopada", "grudnia"]


MIESIACE_M = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień",
              "wrzesień", "październik", "listopad", "grudzień"]


def slownie(d):
    return f"{d.day} {MIESIACE[d.month - 1]} {d.year}"


def drukuj(w, kodowanie):
    print(f"Plik: kodowanie {kodowanie}, separator {w['separator']}, operacji {w['operacji']}, "
          f"pominięte wiersze bez daty (nagłówki, stopka) {w['pominiete']}, okres od {slownie(w['od'])} do {slownie(w['do'])}")
    print("Rozpoznane kolumny: " + "; ".join(f"{p}: {', '.join(v)}" for p, v in w["kolumny"].items()))
    print()
    print(f"Kontrola salda: {w['saldo_stan']}")
    print()
    print("| Nr | Data | Kwota | Waluta | Kontrahent | Tytuł / opis | Znaczniki | Kategoria |")
    print("|---|---|---|---|---|---|---|---|")
    for o in w["dane"]:
        tyt = maskuj((o["tytul"] + " " + o["opis"]).strip())[:90].replace("|", "/")
        kon = maskuj(o["kontrahent"])[:40].replace("|", "/")
        zn = ", ".join(o["znaczniki"] + (["przeksięgowanie VAT, poza sumami"] if o["przeksiegowanie_vat"] else []))
        print(f"| {o['wiersz']} | {o['data'].isoformat()} | {zl(o['kwota'])} | {o['waluta'] or 'PLN'} | {kon} | {tyt} | {zn} | {o['kategoria'] or ''} |")
    print()
    print(f"SUMY (bez przeksięgowań VAT): wpływy {zl(w['wplywy'])} zł, wydatki {zl(w['wydatki'])} zł, różnica {zl(w['netto'])} zł")
    if w["vat"]:
        print(f"Przeksięgowania VAT (podzielona płatność) poza sumami: liczba {len(w['vat'])}, razem {zl(sum((o['kwota'] for o in w['vat']), Decimal(0)))} zł")
    if len(w["miesiace"]) > 1:
        print("\n| Miesiąc | Wpływy | Wydatki | Różnica |")
        print("|---|---|---|---|")
        for k, (wp, wy) in sorted(w["miesiace"].items()):
            print(f"| {MIESIACE_M[int(k[5:]) - 1]} {k[:4]} | {zl(wp)} | {zl(wy)} | {zl(wp + wy)} |")
    for wal, suma in w.get("obce", {}).items():
        print(f"Operacje w {wal} poza sumami w zł: razem {zl(suma)} {wal}")
    if w["reguly"]:
        print("\n| Kategoria | Wpływy | Wydatki | Operacji |")
        print("|---|---|---|---|")
        for k, (wp, wy, n) in sorted(w["kategorie"].items()):
            print(f"| {k} | {zl(wp)} | {zl(wy)} | {n} |")
        sk = sum((v[0] + v[1] for v in w["kategorie"].values()), Decimal(0)) + sum((o["kwota"] for o in w["bez_kategorii"]), Decimal(0))
        print(f"Kontrola: suma kategorii i pozycji bez kategorii {zl(sk)} zł = różnica {zl(w['netto'])} zł: {'TAK' if sk == w['netto'] else 'NIE'}")
    if w["bez_kategorii"]:
        print(f"\nBEZ KATEGORII ({len(w['bez_kategorii'])}): wiersze " + ", ".join(str(o["wiersz"]) for o in w["bez_kategorii"]))
    if w["uwagi"]:
        print("\nUWAGI:")
        for u in w["uwagi"]:
            print("- " + u)


def zapisz_csv(w, sciezka):
    with open(sciezka, "w", encoding="utf-8-sig", newline="") as f:
        z = csv.writer(f, delimiter=";")
        z.writerow(["Wiersz", "Data", "Kwota", "Waluta", "Kontrahent", "Tytuł", "Opis", "Znaczniki", "Przeksięgowanie VAT", "Kategoria"])
        for o in w["dane"]:
            z.writerow([o["wiersz"], o["data"].isoformat(), zl(o["kwota"]).replace(" ", ""), o["waluta"] or "PLN",
                        bez_formuly(maskuj(o["kontrahent"])), bez_formuly(maskuj(o["tytul"])), bez_formuly(maskuj(o["opis"])),
                        ", ".join(o["znaczniki"]), "tak" if o["przeksiegowanie_vat"] else "", bez_formuly(o["kategoria"] or "")])


def selftest():
    mbank = ("mBank S.A. Bankowość Detaliczna;\n#Klient;\nJAN TESTOWY;\n\n"
             "#Data operacji;#Data księgowania;#Opis operacji;#Tytuł;#Nadawca/Odbiorca;#Numer konta;#Kwota;#Saldo po operacji;\n"
             "2026-11-02;2026-11-02;PRZELEW PRZYCHODZĄCY;FV 12/2026;ALFA SP. Z O.O.;'12 1140 2004 0000 3102 1234 5678';1 230,00;5 230,00;\n"
             "2026-11-03;2026-11-03;ZAKUP PRZY UŻYCIU KARTY;ORLEN STACJA 123;;;-200,50;5 029,50;\n"
             "2026-11-05;2026-11-05;PRZELEW ZEWNĘTRZNY;ZUS SKŁADKI;ZUS;'42 6000 0002 0260 1234 5678 9012';-1 600,00;3 429,50;\n"
             "2026-11-06;2026-11-06;PRZEKSIĘGOWANIE NA RACH. VAT;/VAT/230,00/IDC/1234567890/INV/FV 12/2026;;;-230,00;3 199,50;\n"
             "2026-11-07;2026-11-07;OPŁATA ZA PROWADZENIE RACHUNKU;;;;-15,00;3 184,50;\n"
             "#Saldo końcowe;;;;;;;3 184,50;\n")
    w = analiza(mbank, {"ORLEN": "Paliwo i auto", "ALFA": "Wpływy od klientów"})  # ZUS i opłata ze znaczników
    assert w["operacji"] == 5, w["operacji"]
    assert w["wplywy"] == Decimal("1230.00") and w["wydatki"] == Decimal("-1815.50"), (w["wplywy"], w["wydatki"])
    assert len(w["vat"]) == 1
    zn = {o["wiersz"]: o["znaczniki"] for o in w["dane"]}
    assert "ZUS" in zn[8] and "OPŁATA" in zn[10], zn
    assert not w["uwagi"], w["uwagi"]
    assert not w["bez_kategorii"]
    assert maskuj("12 1140 2004 0000 3102 1234 5678") == "…5678"
    # przecinek, cudzysłowy, osobne uznania i obciążenia, data dd.mm.rrrr, Windows-1250
    plik = ('"Data księgowania","Opis","Uznania","Obciążenia","Saldo"\n'
            '"02.11.2026","Wpłata od klienta","1000,00","","1000,00"\n'
            '"03.11.2026","Przelew na 20 1010 0071 2222 1234 5678 9012 PIT","","300,00","700,00"\n'
            '"04.11.2026","Czynsz","","500,00","300,00"\n'
            '"04.11.2026","Czynsz","","500,00","-200,00"\n')
    w = analiza(plik.encode("cp1250").decode("cp1250"))
    assert w["operacji"] == 4 and w["wydatki"] == Decimal("-1300.00"), w["wydatki"]
    assert any("powtórzenie" in u for u in w["uwagi"]), w["uwagi"]
    assert "US" in w["dane"][1]["znaczniki"], w["dane"][1]["znaczniki"]  # mikrorachunek w opisie
    # saldo niespójne
    plik2 = "Data;Kwota;Saldo\n2026-11-01;100,00;100,00\n2026-11-02;-50,00;40,00\n"
    w = analiza(plik2)
    assert any("saldo" in u for u in w["uwagi"]), w["uwagi"]
    # kolejność malejąca (najnowsze na górze) jest w porządku
    plik3 = "Data;Kwota;Saldo\n2026-11-02;-50,00;50,00\n2026-11-01;100,00;100,00\n"
    assert not analiza(plik3)["uwagi"]
    # kwoty z kropką tysięcy i sufiksem
    assert wartosc("1.234,56") == Decimal("1234.56") and wartosc("-12,30 PLN") == Decimal("-12.30") and wartosc("+5") == Decimal(5)
    for zle in ["abc", "1,2,3", "nan", "1e5"]:
        try:
            wartosc(zle)
        except ValueError:
            continue
        raise AssertionError(zle)
    # brak nagłówka
    try:
        analiza("a;b;c\n1;2;3\n")
        raise AssertionError("brak nagłówka przeszedł")
    except ZleDane:
        pass
    # kodowanie
    assert dekoduj("Data;Kwota\n".encode("cp1250"))[1] in ("UTF-8", "Windows-1250")
    assert dekoduj("Data księgowania;Kwota\n".encode("cp1250"))[1] == "Windows-1250"
    assert dekoduj(b"\xef\xbb\xbfData;Kwota\n")[1] == "UTF-8 z BOM"
    # PKO iPKO: przecinek, cudzysłowy, kolumny bez nazw z dalszym opisem
    pko = ('"Data operacji","Data waluty","Typ transakcji","Kwota","Waluta","Opis transakcji","","","",""\n'
           '"2026-11-03","2026-11-03","Płatność kartą","-45.90","PLN","Tytuł: 000498849 74230786","Lokalizacja: Adres: BIEDRONKA 123 Miasto: LODZ","","",""\n'
           '"2026-11-02","2026-11-02","Przelew na rachunek","1500.00","PLN","Rachunek nadawcy: 12 1020 3000 0000 1111 2222 3333","Nazwa nadawcy: FIRMA BETA","Tytuł: FV 7/2026","",""\n')
    w = analiza(pko)
    assert w["operacji"] == 2 and w["wplywy"] == Decimal("1500.00") and w["wydatki"] == Decimal("-45.90"), (w["wplywy"], w["wydatki"])
    assert "Kwota" in w["kolumny"]["kwota"], w["kolumny"]
    # Pekao: średnik, data dd.mm.rrrr, „Kwota operacji”, „Tytułem”
    pekao = ("Data księgowania;Data waluty;Nadawca / Odbiorca;Adres nadawcy / odbiorcy;Rachunek źródłowy;Rachunek docelowy;Tytułem;Kwota operacji;Waluta;Numer referencyjny;Typ operacji\n"
             "05.11.2026;05.11.2026;ZAKŁAD UBEZPIECZEŃ SPOŁECZNYCH;;12 1240 0000 1111 2222 3333 4444;42 6000 0002 0260 1234 5678 9012;SKŁADKI 10/2026;-1 650,00;PLN;REF1;PRZELEW\n"
             "06.11.2026;06.11.2026;JAN KLIENT;;;;ZAPŁATA FV 3/2026;2 000,00;PLN;REF2;PRZELEW PRZYCHODZĄCY\n")
    w = analiza(pekao)
    assert w["operacji"] == 2 and "ZUS" in w["dane"][0]["znaczniki"], w["dane"][0]["znaczniki"]
    assert w["kolumny"]["kwota"] == ["Kwota operacji"] and "Tytułem" in w["kolumny"]["tytul"], w["kolumny"]
    # Alior: dwa wiersze nagłówka, data dd-mm-rrrr, kwota w walucie rachunku ma pierwszeństwo
    alior = ("Kryteria: od 01-11-2026 do 30-11-2026;;;;;;;;;;\n"
             "Data transakcji;Data księgowania;Nazwa nadawcy;Nazwa odbiorcy;Szczegóły transakcji;Kwota operacji;Waluta operacji;Kwota w walucie rachunku;Waluta rachunku;Numer rachunku nadawcy;Numer rachunku odbiorcy\n"
             "07-11-2026;08-11-2026;MOJA FIRMA;SKLEP DE;Zakup online;-10,00;EUR;-43,50;PLN;;\n"
             "09-11-2026;09-11-2026;MOJA FIRMA;BANK;POBRANIE OPŁATY/PROWIZJI;-9,00;PLN;-9,00;PLN;;\n")
    w = analiza(alior)
    assert w["operacji"] == 2 and w["wydatki"] == Decimal("-52.50"), (w["wydatki"], w["kolumny"])
    assert "OPŁATA" in w["dane"][1]["znaczniki"]
    # waluta obca poza sumami w zł, PESEL maskowany
    plik5 = "Data;Kwota;Waluta;Tytuł\n2026-11-02;-55,00;EUR;uchwyty\n2026-11-03;-10,00;PLN;zaliczka PESEL 80010112345\n"
    w = analiza(plik5)
    assert w["wydatki"] == Decimal("-10.00") and w["obce"] == {"EUR": Decimal("-55.00")}, (w["wydatki"], w["obce"])
    assert "80010112345" not in maskuj("zaliczka PESEL 80010112345")
    # dwie kolumny, waluta w sufiksie kwoty, minus na końcu, nawias
    w = analiza("Data;Kwota\n2026-11-01;-55,00 EUR\n2026-11-02;120,00-\n2026-11-03;(10,00)\n2026-11-04;200,00 PLN\n")
    assert w["obce"] == {"EUR": Decimal("-55.00")}, w["obce"]
    assert w["wydatki"] == Decimal("-130.00") and w["wplywy"] == Decimal("200.00"), (w["wydatki"], w["wplywy"])
    assert w["saldo_stan"].startswith("nie sprawdzono")
    # saldo: kolejność z dat, błąd nie znika po odwróceniu
    w = analiza("Data;Kwota;Saldo\n2026-11-01;100,00;100,00\n2026-11-02;-50,00;150,00\n")
    assert w["saldo_stan"].startswith("rozjazd"), w["saldo_stan"]
    # pole wieloliniowe w cudzysłowie
    w = analiza('Data;Kwota;Tytuł\n2026-11-01;-10,00;"linia 1\nlinia 2"\n2026-11-02;-5,00;x\n')
    assert w["operacji"] == 2 and "linia 2" in w["dane"][0]["tytul"]
    # maskowanie
    tekst = maskuj("Jan, ul. Polna 7/3, 15-200 Białystok, tel. +48 600 100 200, karta 4567 8901 2345 6789, IBAN DE89 3704 0044 0532 0130 00, PESEL 800101 12345")
    for zakazane in ["Polna 7/3", "15-200", "600 100 200", "4567 8901 2345 6789", "DE89 3704", "800101 12345"]:
        assert zakazane not in tekst, (zakazane, tekst)
    assert maskuj("FV 12/2026 kwota 1 230,00") == "FV 12/2026 kwota 1 230,00"
    # przelew VAT do urzędu i płatność MPP z „rachunek VAT” w /TXT/ zostają w sumach
    w = analiza("Data;Kwota;Rachunek odbiorcy;Tytuł;Opis\n"
                "2026-11-20;-123,00;41 1010 0071 2222 9876 5432 1098;Zapłata podatku VAT;PRZELEW\n"
                "2026-11-21;-246,00;;/VAT/46,00/IDC/1234567890/INV/FV 1/TXT/rachunek VAT listopad;PRZELEW WYCHODZĄCY SPLIT PAYMENT\n")
    assert w["wydatki"] == Decimal("-369.00") and not w["vat"], (w["wydatki"], len(w["vat"]))
    # zła data: operacja nie znika po cichu, sumy oznaczone jako niepełne
    w = analiza("Data;Kwota\n31.11.2026;-50,00\n01.11.2026;-10,00\n")
    assert w["nieodczytane"] and w["uwagi"][0].startswith("SUMY NIEPEŁNE"), w["uwagi"]
    # nieczytelne saldo nie usuwa operacji
    w = analiza("Data;Kwota;Saldo\n2026-11-01;-10,00;abc\n2026-11-02;-5,00;100,00\n")
    assert w["operacji"] == 2
    # saldo z lukami: sumowanie operacji między punktami
    w = analiza("Data;Kwota;Saldo\n2026-11-01;100,00;100,00\n2026-11-02;-20,00;\n2026-11-03;-30,00;50,00\n")
    assert w["saldo_stan"].startswith("zgodna"), w["saldo_stan"]
    w = analiza("Data;Kwota;Saldo\n2026-11-01;100,00;100,00\n2026-11-02;-20,00;0,00\n")
    assert w["saldo_stan"].startswith("rozjazd"), w["saldo_stan"]
    # NRB z błędną sumą kontrolną nie daje US
    assert not nrb_ok("35101000712222987654321099") or nrb_ok("35101000712222987654321098")
    # zła reguła
    try:
        analiza("Data;Kwota\n2026-11-01;-1,00\n", {"re:[": "X"})
        raise AssertionError("zła reguła przeszła")
    except ZleDane:
        pass
    # iPKO: kolumny bez nazwy w opisie
    w = analiza('"Data operacji","Kwota","Opis transakcji","",""\n"2026-11-02","-5.00","Tytuł: x","Nazwa odbiorcy: SKLEP ABC",""\n')
    assert "SKLEP ABC" in w["dane"][0]["opis"], w["dane"][0]["opis"]
    # cykl 2 sędziego: opłata za przeksięgowanie to wydatek; fraza w tytule przy kolumnie opisu nie wyłącza
    w = analiza("Data;Kwota;Opis;Tytuł\n"
                "2026-11-01;-5,00;OPŁATA ZA PRZEKSIĘGOWANIE NA RACH. VAT;\n"
                "2026-11-02;-100,00;PRZELEW WYCHODZĄCY;Przeksięgowanie na rach. VAT\n"
                "2026-11-03;46,00;PRZEKSIĘGOWANIE NA RACH. VAT;/VAT/46,00\n")
    assert w["wydatki"] == Decimal("-105.00") and w["wplywy"] == Decimal("46.00") and not w["vat"], (w["wydatki"], w["wplywy"])
    # pusta albo zła data przy kwocie = sumy niepełne; stopka z tekstem = pominięta
    w = analiza("Data;Kwota\n2026-11-01;-10,00\n;-99,00\n20261131;-7,00\nSuma;-116,00\n")
    assert len(w["nieodczytane"]) == 2 and w["pominiete"] == 1 and w["uwagi"][0].startswith("SUMY NIEPEŁNE"), (w["nieodczytane"], w["pominiete"])
    # niedomknięty cudzysłów daleko w pliku
    wiersze = "".join(f"2026-11-{1 + i % 28:02d};-1,00;op {i}\n" for i in range(60))
    w = analiza("Data;Kwota;Tytuł\n" + wiersze + '2026-11-29;-20,00;"bez końca\n2026-11-30;-50,00;ostatnia\n')
    assert w["nieodczytane"] and w["uwagi"][0].startswith("SUMY NIEPEŁNE"), w["uwagi"][:2]
    # konflikt walut blokuje sumy
    w = analiza("Data;Kwota;Waluta\n2026-11-01;-55 EUR;PLN\n2026-11-02;-10,00;PLN\n")
    assert w["wydatki"] == Decimal("-10.00") and w["nieodczytane"] == [2], (w["wydatki"], w["nieodczytane"])
    # saldo przy jednej dacie: nie sprawdzono; przy nieodczytanej operacji: nie sprawdzono
    w = analiza("Data;Kwota;Saldo\n2026-11-01;100,00;100,00\n2026-11-01;-20,00;0,00\n")
    assert w["saldo_stan"].startswith("nie sprawdzono"), w["saldo_stan"]
    w = analiza("Data;Kwota;Saldo\n2026-11-01;100,00;100,00\n2026-11-02;abc;80,00\n2026-11-03;-20,00;80,00\n")
    assert w["saldo_stan"].startswith("nie sprawdzono"), w["saldo_stan"]
    # dane osobowe w innych zapisach, ale nie numery dokumentów i kwoty
    t = maskuj("PESEL 800101-12345, adres: Warszawa, Kwiatowa 5")
    assert "800101-12345" not in t and "Kwiatowa" not in t, t
    assert "BIEDRONKA 123" in maskuj("Lokalizacja: Adres: BIEDRONKA 123 Miasto: LODZ")
    for zostaje in ["FV 123456789", "FV 12-345/2026", "kwota 123 456 789 PLN"]:
        assert maskuj(zostaje) == zostaje, (zostaje, maskuj(zostaje))
    t = maskuj("DE89 3704 0044 0532 0130 00FV12")
    assert t == "…3000FV12", t
    # numer po „FV” nie daje US
    w = analiza("Data;Kwota;Tytuł\n2026-11-01;-10,00;zapłata FV 41 1010 0071 2222 9876 5432 1098\n")
    assert "US" not in w["dane"][0]["znaczniki"], w["dane"][0]["znaczniki"]
    # cykl 3 sędziego
    t = maskuj("PESEL 440514-01458 PLN, FV +48 600 100 200, FV tel. 600100200")
    assert "01458" not in t and "600 100 200" not in t and "600100200" not in t, t
    w = analiza("Data;Kwota;Opis\n2026-11-01;-10,00;x\n2026-11-XX;-99,00;y\n;-10,00;Suma obciążeń\n")
    assert w["nieodczytane"] == [3] and w["pominiete"] == 1, (w["nieodczytane"], w["pominiete"])
    for zle in ["1+2", "++5"]:
        try:
            wartosc(zle)
            raise AssertionError(zle)
        except ValueError:
            pass
    w = analiza("Data;Typ operacji;Opis transakcji;Tytuł;Kwota\n"
                "2026-11-01;PRZELEW WYCHODZĄCY;Przeksięgowanie na rach. VAT;FV 9;-100,00\n"
                "2026-11-02;PRZEKSIĘGOWANIE NA RACH. VAT;;/VAT/23,00/IDC/1/INV/FV 9/TXT/opłata za usługi;-23,00\n")
    assert w["wydatki"] == Decimal("-100.00") and len(w["vat"]) == 1, (w["wydatki"], len(w["vat"]))
    w = analiza("Data;Uznania;Obciążenia\n2026-11-01;100 PLN;55 EUR\n2026-11-02;10,00;\n")
    assert w["wplywy"] == Decimal("10.00") and w["nieodczytane"] == [2], (w["wplywy"], w["nieodczytane"])
    w = analiza("Data;Kwota;Tytuł\n2026-11-01;-10,00;FV nr 41 1010 0071 2222 9876 5432 1098\n")
    assert "US" not in w["dane"][0]["znaczniki"], w["dane"][0]["znaczniki"]
    w = analiza("Data;Kwota\n2026-10-05;100,00\n2026-11-05;-40,00\n")
    assert w["miesiace"] == {"2026-10": [Decimal("100.00"), Decimal(0)], "2026-11": [Decimal(0), Decimal("-40.00")]}, w["miesiace"]
    # cykl 4 sędziego
    t = maskuj("tel. +48 (600) 100-200; PESEL: 440 514 01458; adres zamieszkania: Warszawa, Kwiatowa 5; FV telefon kontaktowy: 600100200 PLN; (22) 600 10 20")
    for zakazane in ["100-200", "514 01458", "Kwiatowa", "600100200", "600 10 20"]:
        assert zakazane not in t, (zakazane, t)
    w = analiza("Data;Kwota;Opis\n2026-11-01;-10,00;x\n;-10,00;Obciążenia razem\n;100,00;Uznania razem\n2026-11-XX;-99,00;Saldo za fakturę\n")
    assert w["nieodczytane"] == [5] and w["pominiete"] == 2, (w["nieodczytane"], w["pominiete"])
    w = analiza("Data;Kwota;Tytuł\n2026-11-01;-10,00;FV VAT nr 41 1010 0071 2222 9876 5432 1098\n")
    assert "US" not in w["dane"][0]["znaczniki"], w["dane"][0]["znaczniki"]
    w = analiza("Data;Rodzaj operacji;Opis transakcji;Kwota\n2026-11-01;PRZELEW WYCHODZĄCY;Przeksięgowanie na rach. VAT;-100,00\n")
    assert w["wydatki"] == Decimal("-100.00") and not w["vat"], (w["wydatki"], len(w["vat"]))
    # cykl 5 sędziego
    for tekst, zakazane in [("PESEL nr 440 514 01458", "01458"), ("telefon: +49 151 12345678", "12345678"),
                            ("adres zamieszkania Warszawa, Kwiatowa 5", "Kwiatowa"), ("zwrot +49 151 12345678", "12345678")]:
        assert zakazane not in maskuj(tekst), (tekst, maskuj(tekst))
    for tekst, zakazane in [("telefon nr: 22 600 10 20", "600 10 20"), ("tel. nr 22 600 10 20", "600 10 20"),
                            ("telefon numer 22 600 10 20", "600 10 20"), ("adres:Warszawa, Kwiatowa 5", "Kwiatowa")]:
        assert zakazane not in maskuj(tekst), (tekst, maskuj(tekst))
    for zostaje in ["Abonament tel. listopad", "Abonament tel. 01.11.2026", "Telefon: FV nr 123456789", "hotel 123456789 PLN", "komis 123456789 PLN", "telewizja 123456789 PLN",
                    "Telefon FV nr 123456789", "telefon NIP 5260000001", "1 230,00 zł", "NIP 123-456-78-90"]:
        assert maskuj(zostaje) == zostaje, (zostaje, maskuj(zostaje))
    w = analiza("Data;Kwota;Opis\n2026-11-01;-1,00;x\n;-99,00;Saldo za fakturę\n;-5,00;Saldo końcowe\n")
    assert w["nieodczytane"] == [3] and w["pominiete"] == 1, (w["nieodczytane"], w["pominiete"])
    w = analiza("Data;Kwota;Tytuł\n2026-11-01;-10,00;Faktura VAT numer 41 1010 0071 2222 9876 5432 1098\n")
    assert "US" not in w["dane"][0]["znaczniki"], w["dane"][0]["znaczniki"]
    # bateria etykiet danych osoby (etykieta x separator x zapis numeru): żadna końcówka numeru nie zostaje
    for e in ["tel", "tel.", "telefon", "telefon kontaktowy", "tel. kom.", "kom.", "komórka", "numer telefonu", "mobile"]:
        for sp in ["", " ", ": ", ":", " nr ", " nr: ", " numer: "]:
            for n in ["600100200", "600-100-200", "600.100.200", "22.600.10.20", "+48 600 100 200", "(22) 600 10 20", "22 600 10 20", "+49 151 12345678"]:
                m = re.sub(r"\D", "", maskuj(f"zwrot {e}{sp}{n} dla Jana"))
                assert re.sub(r"\D", "", n)[-6:] not in m, (e, sp, n)
    for e in ["adres", "adres zamieszkania", "adr.", "zamieszkała"]:
        for sp in [" ", ": ", ":"]:
            assert "Kwiatowa" not in maskuj(f"zwrot {e}{sp}Warszawa, Kwiatowa 5/3"), (e, sp)
    for e in ["PESEL", "PESEL nr", "nr PESEL"]:
        for n in ["44051401458", "440514-01458", "440 514 01458"]:
            assert "1458" not in maskuj(f"x {e}: {n} y"), (e, n)
    for tekst, zakazane in [("telefon do kontaktu: 22 600 10 20", "600 10 20"), ("adres: Warszawa, Ulica: Kwiatowa 5", "Kwiatowa"),
                            ("tel. w sprawie dostawy: 600 100 200", "600 100 200")]:
        assert zakazane not in maskuj(tekst), (tekst, maskuj(tekst))
    assert maskuj("tel. 600 100 200 za listopad FV 42/2026") == "tel. [telefon] za listopad FV 42/2026"
    assert maskuj("tel. FV 123456789, 600.100.200") == "tel. FV 123456789, [telefon]", maskuj("tel. FV 123456789, 600.100.200")
    assert maskuj("Abonament tel. 12345.67 PLN") == "Abonament tel. 12345.67 PLN"
    assert maskuj("Abonament tel. 12 345.67 PLN") == "Abonament tel. 12 345.67 PLN"
    assert "03628" not in maskuj("PESEL:440 514 01458; PESEL:020 708 03628"), maskuj("PESEL:440 514 01458; PESEL:020 708 03628")
    assert "Kwiatowa" not in maskuj("adres: Warszawa | Kwiatowa 5/3") and "01458" not in maskuj("PESEL: 440514_01458")
    assert "PESEL" not in maskuj("FV 44051401458"), maskuj("FV 44051401458")
    for tekst in ["kamera 600 100 200", "zwrot za naprawę, kom: 600.100.200", "gsm 600 100 200", "mob. 600100200", "kontakt 600.100.200"]:
        assert "100" not in maskuj(tekst), (tekst, maskuj(tekst))
    for tekst in ["zwrot, adr: Warszawa, Kwiatowa 5/3", "adr Warszawa Kwiatowa 5", "miejsce zamieszkania: Kwiatowa 5", "zameldowany Kwiatowa 5"]:
        assert "Kwiatowa" not in maskuj(tekst), (tekst, maskuj(tekst))
    for zostaje in ["komis 600 PLN", "komu: Jan", "gsmarena 12", "adrenalina park 50 zł", "Zapłata FS 202611001", "FA 202611001",
                    "paragon 202611001", "korekta 202611001", "Abonament tel. kwota 123 456 789 PLN",
                    "Abonament tel. 123456789 CHF", "Abonament tel. 123456789 GBP"]:
        assert maskuj(zostaje) == zostaje, (zostaje, maskuj(zostaje))
    for tekst, zakazane in [("PESEL: 440 514 01458\nraty za listopad", "01458"), ("telefon: 600.100.200\r\nzwrot za listopad", "600.100.200"),
                            ("adres: Warszawa\nKwiatowa 5/3", "Kwiatowa"), ("PESEL: 440514:01458", "01458")]:
        assert zakazane not in maskuj(tekst), (tekst, maskuj(tekst))
    for zostaje in ["FV FS/123456789/2026", "zamówienie AB-123456789/2026", "tel. FV FS/123456789/2026", "Tytuł: 000498849 74230786"]:
        assert maskuj(zostaje) == zostaje, (zostaje, maskuj(zostaje))
    assert maskuj("telefon: NIP 526 00 00 001") == "telefon: NIP 526 00 00 001", maskuj("telefon: NIP 526 00 00 001")
    for tekst, zakazane in [("tel. (22) 600/10/20", "600/10/20"), ("PESEL: 440514/01458", "01458"), ("adres: Warszawa; Kwiatowa 5/3", "Kwiatowa")]:
        assert zakazane not in maskuj(tekst), (tekst, maskuj(tekst))
    assert maskuj("tel. FV 42/2026 600.100.200") == "tel. FV 42/2026 [telefon]", maskuj("tel. FV 42/2026 600.100.200")
    for tekst, zakazane in [("tel. NIP 5260000001 600.100.200", "600.100.200"), ("tel. 600.100.200 500.200.100", "500.200.100"),
                            ("PESEL: 440514  01458", "01458")]:
        assert zakazane not in maskuj(tekst), (tekst, maskuj(tekst))
    for tekst, zakazane in [("telefon: 600.100.200, tel. 500.200.100", "500.200.100"), ("telefon 01.11.2026 600.100.200", "600.100.200"),
                            ("tel. 600.100.200, 500.200.100", "500.200.100"), ("tel. 600 100 200 lub 22 500 20 10", "500 20 10")]:
        assert zakazane not in maskuj(tekst), (tekst, maskuj(tekst))
    for zostaje in ["Abonament tel. za listopad, zam. nr 123456789", "Abonament tel. za 20261101 FV 42/2026"]:
        assert maskuj(zostaje) == zostaje, (zostaje, maskuj(zostaje))
    for zostaje in ["Abonament tel. za 01.11.2026", "Abonament tel. 01.11.2026 FV 42/2026", "telefon 123 456,78 PLN", "zam. nr 12/2026",
                    "Abonament tel. za 2026-11-01 FV 42/2026", "Abonament tel. za listopad, FV nr 123456789", "Abonament tel. NIP 5260000001", "ZUS 10/2026", "PRZELEW PRZYCHODZĄCY 2026-11-05", "Tytuł: FV 7/2026"]:
        assert maskuj(zostaje) == zostaje, (zostaje, maskuj(zostaje))
    # formuła w CSV
    assert bez_formuly("=1+1") == "'=1+1" and bez_formuly("czynsz") == "czynsz"
    # US po mikrorachunku w kolumnie rachunku
    plik4 = "Data;Kwota;Rachunek odbiorcy;Tytuł\n2026-11-20;-850,00;41 1010 0071 2222 9876 5432 1098;PIT-5\n"
    assert "US" in analiza(plik4)["dane"][0]["znaczniki"]
    print("selftest: OK")


def main():
    p = argparse.ArgumentParser(description="Wyciąg bankowy CSV na tabelę z kontrolą sum")
    p.add_argument("plik", nargs="?")
    p.add_argument("--reguly", help="plik JSON: fraza z opisu -> kategoria")
    p.add_argument("--csv", help="zapisz tabelę do pliku CSV (średnik, UTF-8 z BOM, do Excela)")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args()
    if a.selftest:
        selftest()
        return 0
    try:
        if not a.plik:
            raise ZleDane("podaj plik CSV z banku")
        try:
            b = open(a.plik, "rb").read()
        except OSError as e:
            raise ZleDane(f"nie mogę otworzyć pliku: {e}")
        if b[:4] == b"PK\x03\x04" or b[:8] == b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1":
            raise ZleDane("to plik Excela (XLSX/XLS); zapisz go jako CSV albo pobierz z banku eksport CSV")
        if b.lstrip()[:4] in (b":20:", b"{1:F") or b":61:" in b[:4000]:
            raise ZleDane("to wygląda na plik MT940; ten skrypt czyta CSV, pobierz z banku eksport historii w CSV")
        tekst, kod = dekoduj(b)
        reguly = {}
        if a.reguly:
            try:
                reguly = json.load(open(a.reguly, encoding="utf-8"))
            except (OSError, ValueError) as e:
                raise ZleDane(f"plik reguł: {e}")
            if not isinstance(reguly, dict) or not all(isinstance(k, str) and isinstance(v, str) for k, v in reguly.items()):
                raise ZleDane("plik reguł: oczekuję słownika „fraza”: „kategoria”")
        w = analiza(tekst, reguly)
    except ZleDane as e:
        print("BŁĄD DANYCH: " + str(e))
        return 2
    drukuj(w, kod)
    if a.csv:
        zapisz_csv(w, a.csv)
        print(f"\nZapisano tabelę: {a.csv}")
    return 1 if w["uwagi"] or w["bez_kategorii"] else 0


if __name__ == "__main__":
    sys.exit(main())
