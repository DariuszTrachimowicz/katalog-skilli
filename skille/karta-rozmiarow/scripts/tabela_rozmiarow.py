#!/usr/bin/env python3
"""Sprawdza spójność tabeli rozmiarów i oddaje ją jako tabelę Markdown albo listę.

Użycie:
  python scripts/tabela_rozmiarow.py tabela.csv
  python scripts/tabela_rozmiarow.py tabela.csv --lista
  python scripts/tabela_rozmiarow.py tabela.csv --na-cm     (kolumny w mm pokazuje w cm, dzieląc przez 10)
  python scripts/tabela_rozmiarow.py --selftest

Plik CSV ze średnikiem albo przecinkiem jako separatorem (skrypt wybiera ten, przy którym
wszystkie wiersze mają tyle samo pól co nagłówek). Pierwszy wiersz to nagłówki, pierwsza
kolumna to rozmiar, wiersze od najmniejszego rozmiaru. Kolumna liczbowa: liczba („88”,
„88,5”) albo zakres („86-90”); kolumna z tekstem (np. oznaczenie literowe od producenta)
jest przepisywana bez sprawdzania. Puste pole to brak danych.

Sprawdza: kolejność rozmiarów, czy wymiary rosną, czy zakresy sąsiednich rozmiarów nie
nachodzą na siebie i nie zostawiają przerwy, czy skok jest równy, powtórzone i puste
rozmiary, puste pola, brak jednostki w nagłówku. Niczego nie przelicza na inne systemy
rozmiarów i niczego nie uzupełnia. Nie łączy się z siecią i niczego nie zapisuje.
Kod wyjścia: 0 bez uwag, 1 są uwagi, 2 złe dane wejściowe.
"""
import argparse
import csv
import io
import re
import sys
from decimal import Decimal, InvalidOperation

BOM = chr(0xFEFF)
JEDNOSTKA = re.compile(r"(?:^|[\s(_\[])(cm|mm)(?:$|[\s)_\]])", re.I)
LICZBA = r"\d+(?:[.,]\d+)?"
ZAKRES = re.compile(rf"^\s*({LICZBA})\s*-\s*({LICZBA})\s*$")
POJEDYNCZA = re.compile(rf"^\s*({LICZBA})\s*$")
OZNACZENIE = re.compile(r"(^|[\s(_])(UK|US|EU|IT|FR|DE|JP|CN|MX)($|[\s)_])|literow|oznacz|size|miseczk", re.I)
WYGLADA_NA_LICZBE = re.compile(r"^\s*[-+]?(\d+(?:[.,]\d+)?(?:\s*-\s*[-+]?\d+(?:[.,]\d+)?)?|s?nan|inf(inity)?)\s*$", re.I)
BLAD_ARKUSZA = re.compile(r"^#[A-Z/0!?]+[!?]?$|^#N/A$", re.I)
NAZWA_WYMIARU = re.compile(r"biust|talia|talii|biodr|obw[oó]d|klatk|d[lł]ugo[sś][cć]|szeroko|wzrost|wk[lł]adk|stop[ay]|nogawk|r[eę]kaw|szyj|pas[ae]?\b", re.I)
RANGA = {"XXXS": 0, "3XS": 0, "XXS": 1, "2XS": 1, "XS": 2, "S": 3, "M": 4, "L": 5, "XL": 6,
         "XXL": 7, "2XL": 7, "XXXL": 8, "3XL": 8, "4XL": 9, "5XL": 10, "6XL": 11}


class ZleDane(Exception):
    pass


def liczba(s):
    try:
        d = Decimal(s.strip().replace(",", "."))
    except InvalidOperation:
        raise ZleDane(f"nie rozumiem wartości: {s}")
    if not d.is_finite() or d <= 0:
        raise ZleDane(f"wymiar musi być dodatnią liczbą: {s}")
    return d


def wartosc(s):
    """Zwraca (od, do), None dla pustego pola; ZleDane dla tekstu, który nie jest liczbą."""
    s = (s or "").strip()
    if not s:
        return None
    m = ZAKRES.match(s)
    if m:
        a, b = liczba(m.group(1)), liczba(m.group(2))
        if a > b:
            raise ZleDane(f"zakres malejący: {s}")
        return a, b
    if POJEDYNCZA.match(s):
        v = liczba(s)
        return v, v
    raise ZleDane(f"nie rozumiem wartości: {s}")


def rodzaj_kolumny(naglowek, komorki):
    """'wymiar' (liczby sprawdzane), 'oznaczenie' (rozmiary innych systemów od producenta) albo 'tekst'."""
    if JEDNOSTKA.search(naglowek):
        for c in komorki:
            wartosc(c)  # kolumna z jednostką musi mieć poprawne wymiary, błąd kończy się ZleDane
        return "wymiar"
    niepuste = [c for c in komorki if c.strip()]
    if any(BLAD_ARKUSZA.match(c.strip()) for c in niepuste):
        raise ZleDane(f"{naglowek}: w kolumnie są błędy z arkusza (np. #VALUE!), popraw plik u źródła")
    if NAZWA_WYMIARU.search(naglowek) and not OZNACZENIE.search(naglowek):
        for c in komorki:
            wartosc(c)  # kolumna nazwana jak wymiar musi mieć poprawne liczby
        return "wymiar"
    if OZNACZENIE.search(naglowek):
        return "oznaczenie"
    if czy_liczbowa(komorki):
        return "wymiar"
    if any(WYGLADA_NA_LICZBE.match(c) for c in niepuste):
        raise ZleDane(f"{naglowek}: wartości wyglądają na liczby, ale nie są poprawnymi wymiarami: " + ", ".join(niepuste[:4]))
    return "tekst"


def czy_liczbowa(komorki):
    niepuste = [c for c in komorki if c.strip()]
    if not niepuste:
        return True
    ok = 0
    for c in niepuste:
        try:
            wartosc(c)
            ok += 1
        except ZleDane:
            pass
    if ok == len(niepuste):
        return True
    if ok == 0:
        return False
    raise ZleDane("kolumna miesza liczby i tekst: " + ", ".join(niepuste[:4]))


def wczytaj(tekst):
    tekst = tekst.lstrip(BOM)
    linie = [l for l in tekst.splitlines() if l.strip()]
    for sep in (";", ",", "\t"):
        try:
            wiersze = [w for w in csv.reader(io.StringIO(tekst), delimiter=sep, strict=True) if any(c.strip() for c in w)]
        except csv.Error:
            continue
        if any("\n" in c or "\r" in c for w in wiersze for c in w):
            continue  # pole przez kilka linii: zwykle niedomknięty cudzysłów
        if len(wiersze) == len(linie) and len(wiersze) >= 2 and len(wiersze[0]) >= 2 and all(len(w) == len(wiersze[0]) for w in wiersze):
            break
    else:
        raise ZleDane("nie da się ustalić separatora: wiersze mają różną liczbę pól albo tabela ma jedną kolumnę")
    naglowki = [c.strip() for c in wiersze[0]]
    dane = [[c.strip() for c in w] for w in wiersze[1:]]
    puste = [str(i + 2) for i, w in enumerate(dane) if not w[0]]
    if puste:
        raise ZleDane("pusty rozmiar w wierszu " + ", ".join(puste))
    bledne = [w[0] for w in dane if BLAD_ARKUSZA.match(w[0])]
    if bledne:
        raise ZleDane("w kolumnie rozmiarów są błędy z arkusza: " + ", ".join(bledne[:4]))
    return naglowki, dane


def klucz_rozmiaru(r):
    """('L', pozycja) dla liter, ('N', liczba, litery) dla liczb (98/104, 75B); None, gdy nie wiadomo."""
    t = r.strip().upper()
    if t in RANGA:
        return ("L", RANGA[t], "")
    m = re.fullmatch(r"(\d+(?:[.,]\d+)?)(?:/\d+)?([A-Z]{0,3})", t)
    if m:
        return ("N", Decimal(m.group(1).replace(",", ".")), m.group(2))
    return None


def bez_kreski(t):
    return t.replace("|", "\\|")


def siatka_stanikowa(rozm, naglowki):
    """Rozmiary typu 70A, 75B w tabeli biustonoszy (rozpoznanej po nagłówku): wymiary nie rosną liniowo."""
    stanik = any(re.search(r"pod biust|miseczk|stanik|biustonosz", n, re.I) for n in naglowki)
    return stanik and all(re.fullmatch(r"\d{2,3}[A-K]{1,2}", r.strip().upper()) for r in rozm)


def fmt(v):
    a, b = v
    t = lambda d: f"{d.normalize():f}".replace(".", ",")
    return t(a) if a == b else f"{t(a)}-{t(b)}"


def sprawdz(naglowki, dane, info=None):
    uwagi = []
    info = [] if info is None else info
    rozm = [w[0] for w in dane]
    powt = sorted({r for r in rozm if rozm.count(r) > 1})
    if powt:
        uwagi.append("powtórzone rozmiary: " + ", ".join(powt))
    klucze = [klucz_rozmiaru(r) for r in rozm]
    znane = [(r, k) for r, k in zip(rozm, klucze) if k is not None]
    for (r1, k1), (r2, k2) in zip(znane, znane[1:]):
        if k1[0] == k2[0] and k2 <= k1 and r1 != r2:
            uwagi.append(f"kolejność wierszy: {r2} stoi po {r1}; ułóż od najmniejszego rozmiaru, inaczej ocena wzrostu wymiarów nie ma sensu")
    if len(znane) < len(rozm) or len({k[0] for _, k in znane}) > 1:
        info.append("kolejności części rozmiarów nie da się sprawdzić automatycznie; skrypt zakłada, że wiersze idą od najmniejszego")
    stanik = siatka_stanikowa(rozm, naglowki)
    if stanik:
        info.append("siatka stanikowa (np. 70A, 75B): wymiary nie rosną od wiersza do wiersza, więc skrypt sprawdza tylko poprawność liczb, puste pola i jednostki")
    liczbowe = 0
    for k in range(1, len(naglowki)):
        nazwa = naglowki[k]
        kolumna = [w[k] for w in dane]
        rodzaj = rodzaj_kolumny(nazwa, kolumna)
        if rodzaj == "oznaczenie":
            info.append(f"{nazwa}: oznaczenia rozmiarów od producenta, przepisane bez sprawdzania i bez przeliczania")
            continue
        if rodzaj == "tekst":
            info.append(f"{nazwa}: kolumna tekstowa, przepisana bez sprawdzania")
            continue
        liczbowe += 1
        vals = [wartosc(c) for c in kolumna]
        puste = [dane[i][0] for i, v in enumerate(vals) if v is None]
        if puste:
            uwagi.append(f"{nazwa}: brak wartości dla rozmiarów {', '.join(puste)}")
        para = [] if stanik else [(dane[i][0], v, i) for i, v in enumerate(vals) if v is not None]
        skoki, styki, przerwy = [], [], []
        for (r1, v1, i1), (r2, v2, i2) in zip(para, para[1:]):
            if v2[0] < v1[0] or v2[1] < v1[1]:
                uwagi.append(f"{nazwa}: wartość maleje między {r1} ({fmt(v1)}) a {r2} ({fmt(v2)})")
            elif v1 == v2:
                uwagi.append(f"{nazwa}: ta sama wartość dla {r1} i {r2} ({fmt(v1)})")
            if v1[0] != v1[1] and v2[0] != v2[1]:
                if v2[0] == v1[1]:
                    styki.append(fmt((v1[1], v1[1])))
                elif v2[0] < v1[1]:
                    uwagi.append(f"{nazwa}: zakresy {r1} ({fmt(v1)}) i {r2} ({fmt(v2)}) nachodzą na siebie")
                else:
                    przerwy.append(f"{r1} ({fmt(v1)}) i {r2} ({fmt(v2)})")
            if i2 == i1 + 1:  # skok tylko między sąsiednimi rozmiarami, bez przeskoku przez puste pole
                skoki.append(v2[0] - v1[0])
        if styki:
            info.append(f"{nazwa}: wartości graniczne ({', '.join(styki)}) należą do dwóch sąsiednich rozmiarów; karta może powiedzieć, co wtedy wybrać, tylko jeśli producent to podaje")
        if przerwy:
            uwagi.append(f"{nazwa}: przerwa między zakresami ({'; '.join(przerwy)}); wymiar pomiędzy nie ma rozmiaru; zapytaj producenta, co wtedy (przy zapisie w pełnych jednostkach to często zamierzone)")
        if skoki and (max(skoki) - min(skoki)) > max(skoki) * Decimal("0.15"):  # drobne różnice (np. sztych 6,67 mm) pomijamy
            uwagi.append(f"{nazwa}: nierówny skok między rozmiarami ({', '.join(fmt((s, s)) for s in skoki)}); sprawdź, czy to zamierzone")
        if not JEDNOSTKA.search(nazwa):
            uwagi.append(f"{nazwa}: nagłówek nie podaje jednostki (cm albo mm); ustal ją z producentem, nie zakładaj")
    if liczbowe == 0:
        raise ZleDane("tabela nie ma żadnej kolumny z wymiarami")
    return uwagi


def komorka(c, liczbowa):
    if not c.strip():
        return "brak danych"
    return fmt(wartosc(c)) if liczbowa else bez_kreski(c)


def na_cm(naglowki, dane):
    """Kolumny z jednostką mm przelicza dosłownie na cm (dzielenie przez 10), reszta bez zmian."""
    nowe_n, kolumny = list(naglowki), []
    for k in range(1, len(naglowki)):
        m = JEDNOSTKA.search(naglowki[k])
        if m and m.group(1).lower() == "mm":
            kolumny.append(k)
            nowe_n[k] = naglowki[k][: m.start(1)] + "cm" + naglowki[k][m.end(1):]
    nowe_d = []
    for w in dane:
        w = list(w)
        for k in kolumny:
            v = wartosc(w[k])
            if v:
                w[k] = fmt((v[0] / 10, v[1] / 10))
        nowe_d.append(w)
    return nowe_n, nowe_d


def typy_kolumn(naglowki, dane):
    return [True] + [rodzaj_kolumny(naglowki[k], [w[k] for w in dane]) == "wymiar" for k in range(1, len(naglowki))]


def markdown(naglowki, dane):
    typy = typy_kolumn(naglowki, dane)
    linie = ["| " + " | ".join(bez_kreski(n) for n in naglowki) + " |", "|" + "---|" * len(naglowki)]
    for w in dane:
        linie.append("| " + " | ".join([bez_kreski(w[0])] + [komorka(w[k], typy[k]) for k in range(1, len(naglowki))]) + " |")
    return "\n".join(linie)


def lista(naglowki, dane):
    typy = typy_kolumn(naglowki, dane)
    return "\n".join(
        f"Rozmiar {w[0]}: " + ", ".join(f"{naglowki[k]}: {komorka(w[k], typy[k])}" for k in range(1, len(naglowki)))
        for w in dane)


def main(argv):
    p = argparse.ArgumentParser()
    p.add_argument("plik", nargs="?")
    p.add_argument("--lista", action="store_true", help="wersja bez tabeli, np. do edytora bez tabel")
    p.add_argument("--na-cm", action="store_true", help="kolumny w mm pokaż w cm")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args(argv)
    if a.selftest:
        return selftest()
    if not a.plik:
        p.print_usage()
        return 2
    try:
        with open(a.plik, encoding="utf-8-sig") as f:
            naglowki, dane = wczytaj(f.read())
        info = []
        uwagi = sprawdz(naglowki, dane, info)
        n_out, d_out = na_cm(naglowki, dane) if a.na_cm else (naglowki, dane)
        tekst = lista(n_out, d_out) if a.lista else markdown(n_out, d_out)
    except (ZleDane, OSError) as e:
        print(f"Złe dane: {e}")
        return 2
    print(tekst)
    print()
    for i in info:
        print(f"INFO: {i}")
    for u in uwagi:
        print(f"UWAGA: {u}")
    if not uwagi:
        print("Bez uwag o spójności. Prawdziwość wymiarów sprawdza sprzedawca.")
    return 1 if uwagi else 0


def selftest():
    def blad(fn, *a):
        try:
            fn(*a)
        except ZleDane:
            return True
        return False

    ok = "Rozmiar;Biust (cm);Talia (cm);Biodra (cm)\n36;84-88;66-70;92-96\n38;88-92;70-74;96-100\n40;92-96;74-78;100-104\n"
    n, d = wczytaj(ok)
    inf = []
    assert sprawdz(n, d, inf) == [], sprawdz(n, d)
    assert sum("graniczne" in x for x in inf) == 3, inf
    n, d = wczytaj("Rozmiar,Biust (cm),Talia\n36,86-90,68\n38,88-92,72\n40,,70\n40,96-100,76\n")
    u = " | ".join(sprawdz(n, d))
    for frag in ("powtórzone rozmiary: 40", "nachodzą na siebie", "brak wartości", "maleje", "Talia: nagłówek nie podaje jednostki"):
        assert frag in u, (frag, u)
    n, d = wczytaj("Rozmiar;Długość wkładki (cm)\n37;23,5\n38;24,5\n39;25\n")
    assert any("nierówny skok" in x for x in sprawdz(n, d))
    n, d = wczytaj("Rozmiar;Obwód (cm)\nS;80-84\nM;88-92\n")
    assert any("przerwa" in x for x in sprawdz(n, d))
    n, d = wczytaj("Rozmiar;Obwód (cm)\nS;80-84\nM;85-89\n")
    assert any("przerwa między zakresami" in x for x in sprawdz(n, d))
    n, d = wczytaj("Rozmiar;Biust (cm);Talia (cm)\n36;NaN;66\n38;NaN;70\n")
    assert blad(sprawdz, n, d)  # zły wymiar w kolumnie z jednostką nie przechodzi jako tekst
    n, d = wczytaj("Rozmiar;Biust;Talia (cm)\n36;-20;66\n38;-24;70\n")
    assert blad(sprawdz, n, d)  # liczby ujemne bez jednostki też nie są tekstem
    n, d = wczytaj("Rozmiar;Biust (cm);UK\n36;84;8\n38;88;10\n")
    assert not any("UK" in x for x in sprawdz(n, d))  # oznaczenie UK bez jednostki to nie błąd
    for kol, ok_ in (("3XS,2XS,XS", True), ("XL,2XL,3XL", True), ("75A,75B,80A", True), ("98/104,110/116", True), ("XXS,3XS", False), ("3XL,M", False)):
        csv_ = "Rozmiar;Obwód (cm)\n" + "".join(f"{r};{80 + 4 * i}\n" for i, r in enumerate(kol.split(",")))
        n, d = wczytaj(csv_)
        jest = any("kolejność" in x for x in sprawdz(n, d))
        assert jest != ok_, (kol, sprawdz(n, d))
    n, d = wczytaj("Rozmiar;Obwód (cm)\nS;80,5-84,5\nM;84,5-88,5\n")  # średnik z przecinkami dziesiętnymi
    assert n == ["Rozmiar", "Obwód (cm)"] and d[0][1] == "80,5-84,5", (n, d)
    n, d = wczytaj("Rozmiar;Biust (cm)\nM;88\nS;84\n")
    assert any("kolejność wierszy" in x for x in sprawdz(n, d))
    n, d = wczytaj("EU;Biust (cm);Literowy\n36;84;S\n38;88;M\n")
    inf = []
    assert sprawdz(n, d, inf) == [] and any("oznaczenia" in x for x in inf), inf
    assert "| 36 | 84 | S |" in markdown(n, d)
    n, d = wczytaj(BOM + "rozmiar;dlugosc_wkladki_mm\n36;232\n37;239\n")
    assert not any("jednostki" in x for x in sprawdz(n, d))
    n2, d2 = na_cm(n, d)
    assert n2[1] == "dlugosc_wkladki_cm" and d2[0][1] == "23,2", (n2, d2)
    assert blad(wczytaj, "Rozmiar;Biust (cm)\n36;84;9\n")  # nadmiarowe pole
    assert blad(wczytaj, "Rozmiar;Biust (cm)\n;84\n")  # pusty rozmiar
    n, d = wczytaj("Rozmiar;Uwagi\n36;krótka\n38;długa\n")
    assert blad(sprawdz, n, d)  # brak kolumn z wymiarami
    for zla in ("abc", "90-86", "-20", "0", "NaN", "Infinity"):
        assert blad(wartosc, zla), zla
    n, d = wczytaj("Rozmiar;Biust (cm)\n36;84\n38;abc\n")
    assert blad(sprawdz, n, d)  # zła wartość w kolumnie z jednostką
    n, d = wczytaj("Rozmiar;Biust\n36;84\n38;abc\n")
    assert blad(sprawdz, n, d)  # mieszanka liczb i tekstu
    assert fmt(wartosc("88,5")) == "88,5" and fmt(wartosc("86-90")) == "86-90"
    for zla_kol in ("#VALUE!;#REF!", "abc;def", "sNaN;sNaN"):
        a1, a2 = zla_kol.split(";")
        n, d = wczytaj(f"Rozmiar|Biust|Talia (cm)\n36|{a1}|66\n38|{a2}|70\n".replace("|", ";"))
        assert blad(sprawdz, n, d), zla_kol  # kolumna nazwana jak wymiar nie przechodzi jako tekst
    assert blad(wczytaj, 'Rozmiar;Biust (cm);Uwagi\nS;84;"XS\nM;88;M\n')  # niedomknięty cudzysłów
    n, d = wczytaj("Rozmiar;Biust (cm);Odpowiednik\n75A;84;3XS\n75B;88;2XS\n")
    assert sprawdz(n, d) == [], sprawdz(n, d)  # kody w nierozpoznanym nagłówku to tekst
    n, d = wczytaj("Rozmiar;Biust (cm);Uwagi\nS;84;S | M\nM;88;M\n")
    assert "S \\| M" in markdown(n, d)
    n, d = wczytaj("Rozmiar;Biust (cm)\nM;84\nS;88\nONE SIZE;92\n")
    assert any("kolejność" in x for x in sprawdz(n, d))
    n, d = wczytaj("Rozmiar;Biust (cm)\nS | M;84-88\nL | XL;88-92\n")
    assert "| S \\| M | 84-88 |" in markdown(n, d), markdown(n, d)
    assert blad(wczytaj, "Rozmiar;Biust (cm)\n#VALUE!;84\nM;88\n")
    n, d = wczytaj("Rozmiar;Obwód pod biustem (cm);Obwód biustu (cm)\n70A;68-72;82-84\n70B;68-72;84-86\n70D;68-72;88-90\n75A;73-77;87-89\n")
    assert sprawdz(n, d) == [], sprawdz(n, d)  # siatka stanikowa bez fałszywych uwag
    n, d = wczytaj("Rozmiar;Obwód klatki (cm)\n34R;87\n36R;92\n38R;87\n40R;102\n")
    assert any("maleje" in x for x in sprawdz(n, d))  # 34R, 36R to odzież, nie staniki
    n, d = wczytaj("Rozmiar;Długość wkładki (mm)\n36;232\n37;239\n38;245\n39;252\n")
    assert sprawdz(n, d) == [], sprawdz(n, d)  # skoki 7, 6, 7 mm to sztych, nie błąd
    print("selftest: OK")
    return 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main(sys.argv[1:]))
