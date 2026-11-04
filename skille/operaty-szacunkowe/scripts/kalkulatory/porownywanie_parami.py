#!/usr/bin/env python3
"""Metoda porównywania parami (podejście porównawcze) ze śladem obliczeń w XLSX.

Podstawa metodyczna: Nota Interpretacyjna PFSRM "Zastosowanie podejścia
porównawczego w wycenie nieruchomości" (metoda porównywania parami);
rozporządzenie ws. wyceny nieruchomości (do porównań co najmniej trzy
nieruchomości ze zbioru podobnych). Parametry rynkowe (trend, wagi, oceny cech)
pochodzą wyłącznie z badania rynku przez rzeczoznawcę.

Założenie upraszczające (jawne): poprawki kwotowe rozkładają się liniowo między
stopniami skali ocen (zakres kwotowy cechy = waga% x ΔC, dzielony równo na
punkty skali). To jeden z wariantów metody; przy cechach o nieliniowym wpływie
rzeczoznawca stosuje korekty per stopień poza skryptem i opisuje to w operacie.
Podstawa ΔC jest jawną decyzją: podaj `delta_c_zbioru` (rozstęp zaktualizowanych
cen ZBIORU nieruchomości podobnych, zalecane, z uzasadnieniem w rejestrze) ALBO
`delta_c_proba_uzasadnienie` (świadome przyjęcie rozstępu samej próby, gdy próba
wyczerpuje zbiór). Każda cecha deklaruje `kierunek`: "wyzsza_lepsza" albo
"nizsza_lepsza" (przy nizsza_lepsza znak poprawki jest odwracany), bo bez tego
odwrócona skala odwróciłaby znak wszystkich poprawek. Każda transakcja musi mieć
niepuste `zrodlo`, a wejście pole `warunki_transakcji` (potwierdzenie + krótkie
uzasadnienie znajomości warunków zawarcia transakcji, wymóg par. 8).

Wejście: JSON (ścieżka jako argument); wzór z opisem pól:
assets/przyklady/dane-porownywanie.json. Struktura:
{
  "id_wyceny": "2026/08/01",
  "data_wyceny": "2026-08-15",
  "powierzchnia_m2": 54.3,
  "trend_pct_rok": 4.0,              // korekta cen na datę wyceny; 0 = brak
  "prog_odchylenia_pct": 20.0,       // flaga odchylenia wyniku od mediany
  "delta_c_zbioru": 2300.0,          // ALBO delta_c_proba_uzasadnienie (patrz wyżej)
  "delta_c_proba_uzasadnienie": "",
  "mala_proba_uzasadnienie": "",     // wymagane, gdy transakcji mniej niż 4
  "warunki_transakcji": {"potwierdzenie": true,
    "uzasadnienie": "warunki znane z aktów/RCN, transakcje wolnorynkowe"},
  "cechy": [
    {"nazwa": "lokalizacja", "waga_pct": 60, "skala": [1, 3],
     "kierunek": "wyzsza_lepsza",
     "uzasadnienie": "analiza 24 transakcji rynku lokalnego ..."},
    {"nazwa": "stan techniczny", "waga_pct": 40, "skala": [1, 3],
     "kierunek": "wyzsza_lepsza", "uzasadnienie": "..."}
  ],
  "nieruchomosc_wyceniana": {"oceny": {"lokalizacja": 2, "stan techniczny": 3}},
  "transakcje": [
    {"id": "T1", "data": "2026-02-10", "cena_m2": 5000,
     "oceny": {"lokalizacja": 3, "stan techniczny": 3}, "zrodlo": "RCN poz. 123"},
    ...
  ],
  "outliery_decyzje": {              // wymagane TYLKO gdy skrypt oflagował outliery
    "T7": {"decyzja": "odrzuc", "uzasadnienie": "transakcja rodzinna, cena nierynkowa"},
    "T9": {"decyzja": "zostaw", "uzasadnienie": "cena potwierdzona w akcie, rynek rosnący"}
  }
}

Kroki (kolejność metodyczna): 1) walidacja wejścia (odmowy z komunikatem, nie
tracebackiem), 2) korekta trendu czasowego cen na datę wyceny, 3) detekcja
outlierów (od 4 transakcji: IQR 1.5 przy n>=6, mediana+-3*MAD przy n=4-5): przy trafieniach skrypt ZATRZYMUJE
obliczenia, dopóki wejście nie zawiera decyzji rzeczoznawcy dla każdego
oflagowanego (zostaw/odrzuc + uzasadnienie; decyzje zapisz też do rejestru),
4) statystyka próby po decyzjach, 5) ΔC, zakresy kwotowe cech z wag, porównanie
parami, 6) analiza wrażliwości wag (+-5 p.p. przenoszone parami między cechami),
7) XLSX: Info | Dane | Trend | Statystyka | Porownanie | Wrazliwosc | Tablica_wiazan.

Wyjście: JSON na stdout + plik XLSX obok pliku wejściowego. XLSX zawiera ślad
wartości pośrednich każdego kroku jako liczby statyczne (bez formuł); tablica
wiązań wskazuje arkusz i komórkę wyniku oraz źródło pierwotne każdej wielkości;
arkusz Info niesie oznaczenie MATERIAŁ WARSZTATOWY i metadane wyceny.
Zaokrąglenia: pełna precyzja w toku obliczeń; prezentacja zaokrąglana kupiecko
(ROUND_HALF_UP): zł/m2 do 0.01, wartość końcowa do pełnych zł.
Teksty użytkownika zaczynające się od znaków formuł (= + - @) są w XLSX
neutralizowane apostrofem (openpyxl i tak zapisuje stringi jako tekst; apostrof
to dodatkowy pas bezpieczeństwa i jest widoczny w komórce).
"""
import hashlib, json, math, statistics, sys
from datetime import date, datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Font

OZNACZENIE = "MATERIAŁ WARSZTATOWY, PROJEKT NIEPODPISANY"
WERSJA = "1.0.0"


def odmowa(tekst: str):
    sys.exit("ODMOWA: " + tekst)


def zaokr(v: float, miejsca: int = 2) -> float:
    q = Decimal(1).scaleb(-miejsca)
    return float(Decimal(str(v)).quantize(q, rounding=ROUND_HALF_UP))


def zaokr_zl(v: float) -> int:
    return int(Decimal(str(v)).quantize(Decimal(1), rounding=ROUND_HALF_UP))


def bezpieczny(v):
    if isinstance(v, str) and v[:1] in ("=", "+", "-", "@"):
        return "'" + v
    return v


def dopisz(ws, wiersz):
    ws.append([bezpieczny(v) for v in wiersz])


def liczba(v, nazwa, dodatnia=False):
    if not isinstance(v, (int, float)) or isinstance(v, bool) or not math.isfinite(v):
        odmowa(f"pole '{nazwa}' musi być skończoną liczbą (jest: {v!r}).")
    if dodatnia and v <= 0:
        odmowa(f"pole '{nazwa}' musi być dodatnie (jest: {v}).")
    return float(v)


RE_DATA = __import__("re").compile(r"^\d{4}-\d{2}-\d{2}$")
SEP_P = " \t.\u00a0\u2010\u2011\u2012\u2013\u2014\u2015-"
RE_PESEL = __import__("re").compile(r"(?<![\d])((?:\d[" + SEP_P + r"]{0,2}){10}\d)(?![\d])")


def _pesel_poprawny(c):
    wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
    return (10 - sum(int(x) * w for x, w in zip(c[:10], wagi)) % 10) % 10 == int(c[10])


def sprawdz_pesel(tekst, gdzie):
    re_ = __import__("re")
    for m in RE_PESEL.findall(tekst or ""):
        cyfry = re_.sub("[" + SEP_P + "]", "", m)
        if len(cyfry) == 11 and _pesel_poprawny(cyfry):
            odmowa(f"pole {gdzie} zawiera numer PESEL; dane osobowe stron nie wchodzą "
                   "do obliczeń (minimalizacja). Usuń numer i uruchom ponownie.")


def data_iso(v, nazwa):
    if not isinstance(v, str) or not RE_DATA.match(v):
        odmowa(f"pole '{nazwa}' musi być datą w formacie RRRR-MM-DD (jest: {v!r}).")
    try:
        return date.fromisoformat(v)
    except ValueError:
        odmowa(f"pole '{nazwa}' nie jest poprawną datą RRRR-MM-DD (jest: {v!r}).")


def _lata(d1: date, d2: date) -> float:
    return (d2 - d1).days / 365.25


def waliduj(d: dict):
    if not isinstance(d, dict):
        odmowa("wejście musi być obiektem JSON (słownikiem).")
    for k in ("id_wyceny", "data_wyceny", "powierzchnia_m2", "cechy",
              "nieruchomosc_wyceniana", "transakcje"):
        if k not in d:
            odmowa(f"brak wymaganego pola '{k}' w wejściu (wzór w nagłówku skryptu).")
    dw = data_iso(d["data_wyceny"], "data_wyceny")
    liczba(d["powierzchnia_m2"], "powierzchnia_m2", dodatnia=True)
    trend = liczba(d.get("trend_pct_rok", 0.0), "trend_pct_rok")
    if trend <= -100:
        odmowa("trend_pct_rok nie może być mniejszy lub równy -100%/rok.")
    liczba(d.get("prog_odchylenia_pct", 20.0), "prog_odchylenia_pct", dodatnia=True)
    if d.get("delta_c_zbioru") is not None:
        liczba(d["delta_c_zbioru"], "delta_c_zbioru", dodatnia=True)

    if not isinstance(d["cechy"], list) or not d["cechy"] \
            or not all(isinstance(c, dict) for c in d["cechy"]):
        odmowa("pole 'cechy' musi być niepustą listą obiektów.")
    if not isinstance(d["nieruchomosc_wyceniana"], dict) \
            or not isinstance(d["nieruchomosc_wyceniana"].get("oceny"), dict):
        odmowa("pole 'nieruchomosc_wyceniana' musi być obiektem z polem 'oceny'.")
    nazwy = [c.get("nazwa") for c in d["cechy"]]
    if len(set(nazwy)) != len(nazwy):
        odmowa(f"zdublowane nazwy cech: {sorted({n for n in nazwy if nazwy.count(n) > 1})}.")
    suma_wag = sum(liczba(c.get("waga_pct"), f"waga_pct cechy '{c.get('nazwa')}'",
                          dodatnia=True)
                   for c in d["cechy"])
    if abs(suma_wag - 100) > 1e-9:
        odmowa(f"wagi cech sumują się do {suma_wag}%, wymagane 100%.")
    for c in d["cechy"]:
        if not str(c.get("uzasadnienie", "")).strip():
            odmowa(f"cecha '{c['nazwa']}' bez uzasadnienia wagi.")
        if c.get("kierunek") not in ("wyzsza_lepsza", "nizsza_lepsza"):
            odmowa(f"cecha '{c['nazwa']}': wymagane pole kierunek "
                   "(wyzsza_lepsza albo nizsza_lepsza); bez niego odwrócona skala "
                   "odwróciłaby znak poprawek bez ostrzeżenia.")
        sk = c.get("skala")
        if (not isinstance(sk, list) or len(sk) != 2
                or not all(isinstance(x, (int, float)) and math.isfinite(x) for x in sk)
                or sk[0] >= sk[1]):
            odmowa(f"cecha '{c['nazwa']}': skala musi być parą [min, max] z min < max "
                   f"(jest: {sk!r}); odwrócona lub zdegenerowana skala zerowałaby poprawki.")

    if not isinstance(d["transakcje"], list) \
            or not all(isinstance(x, dict) for x in d["transakcje"]):
        odmowa("pole 'transakcje' musi być listą obiektów.")
    if len(d["transakcje"]) < 3:
        odmowa(f"{len(d['transakcje'])} transakcje w próbie; metoda porównywania "
               "parami wymaga co najmniej 3 nieruchomości podobnych.")
    idki = [t.get("id") for t in d["transakcje"]]
    if len(set(idki)) != len(idki):
        odmowa(f"zdublowane id transakcji: {sorted({i for i in idki if idki.count(i) > 1})}; "
               "każda nieruchomość porównawcza musi być odrębna.")
    def sprawdz_oceny(oceny, kogo):
        for c in d["cechy"]:
            if c["nazwa"] not in oceny:
                odmowa(f"brak oceny cechy '{c['nazwa']}' dla {kogo}.")
            o = liczba(oceny[c["nazwa"]], f"ocena '{c['nazwa']}' ({kogo})")
            lo, hi = c["skala"]
            if not (lo <= o <= hi):
                odmowa(f"ocena '{c['nazwa']}' = {o} ({kogo}) poza zadeklarowaną "
                       f"skalą {lo}-{hi}; poprawka ekstrapolowałaby poza zakres cechy.")
    wt = d.get("warunki_transakcji", {})
    if not isinstance(wt, dict):
        odmowa("pole 'warunki_transakcji' musi być obiektem.")
    if wt.get("potwierdzenie") is not True or not str(wt.get("uzasadnienie", "")).strip():
        odmowa("wymagane pole warunki_transakcji (potwierdzenie + uzasadnienie "
               "znajomości warunków zawarcia transakcji w próbie, wymóg metody).")
    for t in d["transakcje"]:
        liczba(t.get("cena_m2"), f"cena_m2 transakcji {t.get('id')}", dodatnia=True)
        if not str(t.get("zrodlo", "")).strip():
            odmowa(f"transakcja {t.get('id')} bez źródła (zrodlo); każda cena "
                   "w śladzie musi mieć źródło.")
        sprawdz_pesel(" ".join(str(t.get(k, "")) for k in ("id", "zrodlo")),
                      f"transakcji {t.get('id')}")
        dt = data_iso(t.get("data"), f"data transakcji {t.get('id')}")
        if dt > dw:
            odmowa(f"transakcja {t['id']} ma datę {t['data']} późniejszą niż data "
                   f"wyceny {d['data_wyceny']}; do próby wchodzą transakcje sprzed "
                   "daty określenia wartości.")
        sprawdz_oceny(t.get("oceny", {}), f"transakcji {t.get('id')}")
    sprawdz_oceny(d["nieruchomosc_wyceniana"].get("oceny", {}), "nieruchomości wycenianej")
    if d.get("delta_c_zbioru") is None \
            and not str(d.get("delta_c_proba_uzasadnienie", "")).strip():
        odmowa("wymagana jawna podstawa ΔC: podaj delta_c_zbioru (rozstęp "
               "zaktualizowanych cen zbioru podobnych, zalecane) albo "
               "delta_c_proba_uzasadnienie (świadome przyjęcie rozstępu próby).")
    sprawdz_pesel(json.dumps(d, ensure_ascii=False), "wejścia")
    if len(d["transakcje"]) < 4 and not str(d.get("mala_proba_uzasadnienie", "")).strip():
        odmowa("próba ma mniej niż 4 transakcje, więc detekcja outlierów (IQR) nie "
               "zadziała; wymagane niepuste pole 'mala_proba_uzasadnienie' "
               "(świadoma decyzja o pracy na tak małej próbie, zapisz ją też do rejestru).")
    return dw


def koryguj_trend(transakcje, data_wyceny: date, trend_pct_rok):
    out = []
    for t in transakcje:
        lata = _lata(date.fromisoformat(t["data"]), data_wyceny)
        wsp = (1 + trend_pct_rok / 100) ** lata
        out.append({**t, "lata_do_wyceny": lata, "wsp_trendu": wsp,
                    "cena_m2_skoryg": t["cena_m2"] * wsp})
    return out


def outliery_iqr(ceny):
    """Detekcja odstajacych: IQR 1.5 dla n>=6; dla n w 4-5 mediana+-3*MAD,
    bo przy tak malej probie skrajna cena wciaga kwartyle i IQR jest slepy."""
    n = len(ceny)
    if n < 4:
        return None, None, []
    if n < 6:
        med = statistics.median(ceny)
        mad = statistics.median([abs(c - med) for c in ceny])
        # mad == 0 (wiekszosc cen identyczna): granice zwezone do mediany,
        # wiec KAZDA odmienna cena idzie do decyzji rzeczoznawcy zamiast
        # cichego wylaczenia detekcji
        dol, gora = med - 3 * mad, med + 3 * mad
    else:
        q1, q3 = statistics.quantiles(ceny, n=4)[0], statistics.quantiles(ceny, n=4)[2]
        iqr = q3 - q1
        dol, gora = q1 - 1.5 * iqr, q3 + 1.5 * iqr
    return dol, gora, [i for i, c in enumerate(ceny) if c < dol or c > gora]


def statystyka(ceny):
    s = {"n": len(ceny), "min": min(ceny), "max": max(ceny),
         "srednia": statistics.mean(ceny), "mediana": statistics.median(ceny),
         "rozstep": max(ceny) - min(ceny)}
    s["odch_std"] = statistics.stdev(ceny) if len(ceny) > 1 else 0.0
    s["wsp_zmiennosci_pct"] = 100 * s["odch_std"] / s["srednia"] if s["srednia"] else 0.0
    return s


def porownaj(cechy, wyceniana, transakcje_skoryg, delta_c):
    wiersze = []
    for t in transakcje_skoryg:
        poprawki, suma = [], 0.0
        for c in cechy:
            lo, hi = c["skala"]
            zakres_kw = c["waga_pct"] / 100 * delta_c
            na_pkt = zakres_kw / (hi - lo)
            roznica = wyceniana["oceny"][c["nazwa"]] - t["oceny"][c["nazwa"]]
            if c.get("kierunek") == "nizsza_lepsza":
                roznica = -roznica
            popr = roznica * na_pkt
            poprawki.append({"cecha": c["nazwa"], "roznica_ocen": roznica,
                             "zakres_kwotowy": zakres_kw, "na_punkt": na_pkt,
                             "poprawka": popr})
            suma += popr
        wiersze.append({"id": t["id"], "cena_m2_skoryg": t["cena_m2_skoryg"],
                        "poprawki": poprawki, "suma_poprawek": suma,
                        "cena_po_korekcie": t["cena_m2_skoryg"] + suma})
    srednia = statistics.mean(w["cena_po_korekcie"] for w in wiersze)
    return wiersze, srednia


def wrazliwosc(cechy, wyceniana, transakcje_skoryg, delta_c, krok_pp=5.0):
    wyniki = []
    n = len(cechy)
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            wagi = [dict(c) for c in cechy]
            if wagi[i]["waga_pct"] - krok_pp < 0:
                continue
            wagi[i]["waga_pct"] -= krok_pp
            wagi[j]["waga_pct"] += krok_pp
            _, sr = porownaj(wagi, wyceniana, transakcje_skoryg, delta_c)
            wyniki.append({"scenariusz": f"{cechy[i]['nazwa']} -{krok_pp:g}pp / "
                                         f"{cechy[j]['nazwa']} +{krok_pp:g}pp",
                           "wynik_m2": sr})
    return wyniki


def main():
    if len(sys.argv) != 2:
        sys.exit("Użycie: porownywanie_parami.py <dane.json>")
    sciezka = Path(sys.argv[1])
    try:
        d = json.loads(sciezka.read_text(encoding="utf-8"),
                       parse_constant=lambda s: math.nan)
    except FileNotFoundError:
        odmowa(f"nie znaleziono pliku wejściowego {sciezka}.")
    except json.JSONDecodeError as e:
        odmowa(f"plik wejściowy nie jest poprawnym JSON-em ({e}).")
    dw = waliduj(d)

    trans = koryguj_trend(d["transakcje"], dw, d.get("trend_pct_rok", 0.0))
    ceny0 = [t["cena_m2_skoryg"] for t in trans]
    dol, gora, idx_out = outliery_iqr(ceny0)
    flagi_out = [trans[i]["id"] for i in idx_out]
    decyzje = d.get("outliery_decyzje", {}) or {}
    if not isinstance(decyzje, dict) \
            or not all(isinstance(v, dict) for v in decyzje.values()):
        odmowa("pole 'outliery_decyzje' musi być obiektem obiektów.")
    obce = [i for i in decyzje if i not in flagi_out]
    if obce:
        odmowa(f"outliery_decyzje zawiera id nieoflagowane przez detekcję: {obce}. "
               "Decyzje dotyczą wyłącznie transakcji oflagowanych; zwykłe odrzucenie "
               "transakcji rób przed wejściem (wpis 'odrzucenie' w rejestrze) i usuń "
               "ją z listy.")
    odrzucone = []
    if flagi_out:
        bez_decyzji = [i for i in flagi_out
                       if i not in decyzje
                       or decyzje[i].get("decyzja") not in ("zostaw", "odrzuc")
                       or not str(decyzje[i].get("uzasadnienie", "")).strip()]
        if bez_decyzji:
            odmowa("wykryto outliery cen (IQR 1.5): " + ", ".join(flagi_out)
                   + f" (granice {dol:.2f} - {gora:.2f} zł/m2). Obliczenia wstrzymane: "
                   "dla każdego z nich dodaj do wejścia pole outliery_decyzje "
                   "(zostaw/odrzuc + niepuste uzasadnienie), a decyzje zapisz do "
                   "rejestru wpisami typu decyzja/odrzucenie.")
        odrzucone = [i for i in flagi_out if decyzje[i]["decyzja"] == "odrzuc"]
        trans = [t for t in trans if t["id"] not in odrzucone]
        if len(trans) < 3:
            odmowa(f"po odrzuceniu outlierów zostały {len(trans)} transakcje; "
                   "wymagane co najmniej 3. Poszerz próbę (wpis 'powrot' w rejestrze).")
        if len(trans) < 4 and not str(d.get("mala_proba_uzasadnienie", "")).strip():
            odmowa("po odrzuceniu outlierów próba spadła poniżej 4 transakcji; "
                   "wymagane niepuste pole mala_proba_uzasadnienie (świadoma decyzja "
                   "o pracy na tak małej próbie, zapisz ją też do rejestru).")
    ceny = [t["cena_m2_skoryg"] for t in trans]
    stat = statystyka(ceny)
    if d.get("delta_c_zbioru") is not None \
            and d["delta_c_zbioru"] < stat["max"] - stat["min"] - 1e-9:
        odmowa(f"delta_c_zbioru = {d['delta_c_zbioru']:.2f} zł/m2 jest mniejsze niż "
               f"rozstęp cen samej próby ({stat['max'] - stat['min']:.2f} zł/m2); "
               "rozstęp zbioru nie może być węższy niż rozstęp jego podzbioru, "
               "sprawdź dane z badania rynku.")
    delta_c = d["delta_c_zbioru"] if d.get("delta_c_zbioru") is not None \
        else stat["max"] - stat["min"]
    zrodlo_delta = ("rozstęp cen zbioru podobnych (delta_c_zbioru, uzasadnienie "
                    "w rejestrze)" if d.get("delta_c_zbioru") is not None
                    else "rozstęp cen próby po decyzjach (jawnie uzasadnione "
                         "polem delta_c_proba_uzasadnienie)")
    if delta_c <= 0:
        odmowa("rozstęp cen próby = 0, porównywanie parami nie ma podstaw.")

    wiersze, wynik_m2 = porownaj(d["cechy"], d["nieruchomosc_wyceniana"], trans, delta_c)
    zle_ceny = [w["id"] for w in wiersze if w["cena_po_korekcie"] <= 0]
    if zle_ceny or wynik_m2 <= 0:
        odmowa("korekty sprowadzają cenę do zera lub poniżej ("
               + (", ".join(zle_ceny) or "wynik") + "); sprawdź kierunek skal, "
               "wagi i podstawę ΔC, bo suma poprawek przekracza cenę.")
    wraz = wrazliwosc(d["cechy"], d["nieruchomosc_wyceniana"], trans, delta_c)
    wart = wynik_m2 * d["powierzchnia_m2"]

    prog = d.get("prog_odchylenia_pct", 20.0)
    odch_pct = 100 * abs(wynik_m2 - stat["mediana"]) / stat["mediana"]
    flaga_odch = odch_pct > prog
    poza_probą = wynik_m2 < stat["min"] or wynik_m2 > stat["max"]
    if wraz:
        w_min = min(w["wynik_m2"] for w in wraz)
        w_max = max(w["wynik_m2"] for w in wraz)
        maks_odch_wraz_pct = 100 * max(abs(w["wynik_m2"] - wynik_m2) for w in wraz) / wynik_m2
    else:
        w_min = w_max = None
        maks_odch_wraz_pct = None

    # ---------- XLSX (ślad statyczny, bez formuł) ----------
    wb = Workbook()
    bold = Font(bold=True)

    ws = wb.active; ws.title = "Info"
    for wiersz in [[OZNACZENIE],
                   ["Arkusz wygenerowany narzędziem warsztatowym; dane, założenia "
                    "i wyniki weryfikuje rzeczoznawca majątkowy."],
                   [],
                   ["id wyceny", d["id_wyceny"]],
                   ["data wyceny", d["data_wyceny"]],
                   ["data wygenerowania (UTC)",
                    datetime.now(timezone.utc).isoformat(timespec="seconds")],
                   ["metoda", "porównywanie parami (podejście porównawcze)"],
                   ["źródło ΔC", zrodlo_delta]]:
        dopisz(ws, wiersz)
    ws["A1"].font = bold

    ws = wb.create_sheet("Dane")
    dopisz(ws, ["id", "data", "cena_m2 [zł]", "źródło", "status"]
           + [c["nazwa"] for c in d["cechy"]])
    for c in ws[1]: c.font = bold
    wiersz_dane = {}
    for t in d["transakcje"]:
        status = "ODRZUCONA (outlier, decyzja rzeczoznawcy)" if t["id"] in odrzucone \
            else ("OUTLIER pozostawiony decyzją" if t["id"] in flagi_out else "przyjęta")
        dopisz(ws, [t["id"], t["data"], t["cena_m2"], t.get("zrodlo", ""), status]
               + [t["oceny"][c["nazwa"]] for c in d["cechy"]])
        wiersz_dane[t["id"]] = ws.max_row
    ws.append([])
    dopisz(ws, ["WYCENIANA", d["data_wyceny"], "n/d", "n/d", "n/d"]
           + [d["nieruchomosc_wyceniana"]["oceny"][c["nazwa"]] for c in d["cechy"]])

    ws = wb.create_sheet("Trend")
    dopisz(ws, ["id", "data transakcji", "lat do daty wyceny", "trend %/rok",
                "współczynnik (1+r)^t", "cena skorygowana [zł/m2]"])
    for c in ws[1]: c.font = bold
    for t in trans:
        dopisz(ws, [t["id"], t["data"], zaokr(t["lata_do_wyceny"], 4),
                    d.get("trend_pct_rok", 0.0), zaokr(t["wsp_trendu"], 6),
                    zaokr(t["cena_m2_skoryg"], 2)])

    ws = wb.create_sheet("Statystyka")
    for k, v in [("n (liczebność próby po decyzjach)", stat["n"]), ("min", stat["min"]),
                 ("max", stat["max"]), ("ΔC przyjęte", delta_c),
                 ("źródło ΔC", zrodlo_delta),
                 ("średnia", stat["srednia"]), ("mediana", stat["mediana"]),
                 ("odch. standardowe", stat["odch_std"]),
                 ("wsp. zmienności [%]", stat["wsp_zmiennosci_pct"]),
                 ("granice outlierów (IQR 1.5)",
                  f"{dol:.2f} - {gora:.2f}" if dol is not None
                  else "n<4, nie liczono (mala_proba_uzasadnienie w rejestrze)"),
                 ("outliery oflagowane", ", ".join(flagi_out) if flagi_out else "brak"),
                 ("outliery odrzucone decyzją", ", ".join(odrzucone) if odrzucone else "brak")]:
        dopisz(ws, [k, zaokr(v, 2) if isinstance(v, float) else v])
    ws["A1"].font = bold

    ws = wb.create_sheet("Porownanie")
    naglowek = ["id", "cena skoryg. [zł/m2]"]
    for c in d["cechy"]:
        naglowek += [f"{c['nazwa']}: Δocen", f"{c['nazwa']}: poprawka [zł/m2]"]
    naglowek += ["suma poprawek", "cena po korekcie [zł/m2]", "zapis rachunku"]
    dopisz(ws, naglowek)
    for c in ws[1]: c.font = bold
    for w in wiersze:
        rachunek = " + ".join(f"({p['roznica_ocen']:+g}x{p['na_punkt']:.2f})"
                              for p in w["poprawki"])
        wiersz = [w["id"], zaokr(w["cena_m2_skoryg"], 2)]
        for p in w["poprawki"]:
            wiersz += [p["roznica_ocen"], zaokr(p["poprawka"], 2)]
        wiersz += [zaokr(w["suma_poprawek"], 2), zaokr(w["cena_po_korekcie"], 2),
                   f"{w['cena_m2_skoryg']:.2f} {rachunek}"]
        dopisz(ws, wiersz)
    ws.append([])
    dopisz(ws, ["WYNIK: średnia cen po korekcie [zł/m2]", zaokr(wynik_m2, 2)])
    kom_wynik = f"Porownanie!B{ws.max_row}"
    dopisz(ws, ["x powierzchnia [m2]", d["powierzchnia_m2"]])
    dopisz(ws, ["WARTOŚĆ [zł] (zaokr. do pełnych zł)", zaokr_zl(wart)])
    kom_wartosc = f"Porownanie!B{ws.max_row}"
    for c in d["cechy"]:
        dopisz(ws, [f"parametry cechy '{c['nazwa']}'",
                    f"waga {c['waga_pct']}%, skala {c['skala']}, "
                    f"zakres kwotowy {c['waga_pct']/100*delta_c:.2f} zł/m2"])

    ws = wb.create_sheet("Wrazliwosc")
    dopisz(ws, ["scenariusz przesunięcia wag", "wynik [zł/m2]", "odchylenie od bazowego [%]"])
    for c in ws[1]: c.font = bold
    for w in wraz:
        dopisz(ws, [w["scenariusz"], zaokr(w["wynik_m2"], 2),
                    zaokr(100 * (w["wynik_m2"] - wynik_m2) / wynik_m2, 2)])
    ws.append([])
    if maks_odch_wraz_pct is not None:
        dopisz(ws, ["maks. odchylenie scenariusza od bazy [%]", zaokr(maks_odch_wraz_pct, 2)])
    else:
        dopisz(ws, ["analiza wrażliwości",
                    "nie przeprowadzono (jedna cecha, brak scenariuszy przesunięć)"])

    ws = wb.create_sheet("Tablica_wiazan")
    dopisz(ws, ["wielkość", "arkusz!komórka wyniku", "pochodzi z", "źródło pierwotne"])
    for c in ws[1]: c.font = bold
    dopisz(ws, ["wartość nieruchomości [zł]", kom_wartosc,
                "wynik zł/m2 x powierzchnia", "obliczenie"])
    dopisz(ws, ["wynik [zł/m2]", kom_wynik,
                "średnia cen po korekcie wszystkich par", "obliczenie"])
    dopisz(ws, ["ceny po korekcie", "Porownanie, kolumna 'cena po korekcie'",
                "cena skoryg. + poprawki cech", "obliczenie"])
    dopisz(ws, ["ceny skorygowane trendem", "Trend", "cena_m2 x (1+trend)^lata",
                "dane wejściowe + parametr trendu"])
    for t in d["transakcje"]:
        dopisz(ws, [f"cena transakcji {t['id']}", f"Dane!C{wiersz_dane[t['id']]}",
                    "wpis użytkownika", t.get("zrodlo", "ŹRÓDŁO NIEPODANE, uzupełnij!")])
    dopisz(ws, ["wagi cech", "Porownanie (parametry)", "deklaracja rzeczoznawcy",
                "rejestr decyzji, wpisy typu 'waga'"])
    dopisz(ws, ["trend %/rok", "Trend", "deklaracja rzeczoznawcy",
                "rejestr decyzji / analiza rynku"])
    dopisz(ws, ["ΔC", "Statystyka", zrodlo_delta, "rejestr decyzji / analiza rynku"])

    plik_xlsx = sciezka.with_suffix(".xlsx")
    xlsx_nadpisany = plik_xlsx.exists()
    try:
        wb.save(plik_xlsx)
    except OSError as e:
        odmowa(f"nie mogę zapisać pliku XLSX {plik_xlsx} ({e}); zamknij plik, "
               "jeśli jest otwarty w Excelu, i uruchom ponownie.")

    wynik = {
        "OZNACZENIE": OZNACZENIE,
        "wynik_m2": zaokr(wynik_m2, 2), "wartosc_zl": zaokr_zl(wart),
        "statystyka": {k: zaokr(v, 2) if isinstance(v, float) else v for k, v in stat.items()},
        "delta_c": zaokr(delta_c, 2), "zrodlo_delta_c": zrodlo_delta,
        "outliery_flagi": flagi_out,
        "outliery_odrzucone": odrzucone,
        "flaga_odchylenia_od_mediany": flaga_odch,
        "odchylenie_od_mediany_pct": zaokr(odch_pct, 2),
        "wynik_poza_przedzialem_proby": poza_probą,
        "wrazliwosc": ({"min_m2": zaokr(w_min, 2), "max_m2": zaokr(w_max, 2),
                        "maks_odchylenie_pct": zaokr(maks_odch_wraz_pct, 2)}
                       if maks_odch_wraz_pct is not None
                       else {"uwaga": "nie przeprowadzono (jedna cecha, brak scenariuszy)"}),
        "xlsx": str(plik_xlsx),
        "xlsx_nadpisal_poprzedni": xlsx_nadpisany,
        "wejscie_sha256": hashlib.sha256(sciezka.read_bytes()).hexdigest(),
        "wersja_skryptu": WERSJA,
        "polityka_zaokraglen": ("pełna precyzja w toku; prezentacja kupiecko (ROUND_HALF_UP): "
                                "zł/m2 do 0.01, wartość do 1 zł"),
    }
    if flaga_odch:
        wynik["WYMAGANE"] = (f"Wynik odchyla się od mediany próby o {odch_pct:.1f}% "
                             f"(próg {prog:g}%), wymagany akapit uzasadnienia do rejestru "
                             f"przed redakcją.")
    if poza_probą:
        wynik["OSTRZEZENIE"] = "Wynik poza przedziałem cen próby, zweryfikuj oceny cech i wagi."
    tekst_wyniku = json.dumps(wynik, ensure_ascii=False, indent=2, allow_nan=False)
    sciezka.with_suffix(".wynik.json").write_text(tekst_wyniku + "\n", encoding="utf-8")
    print(tekst_wyniku)


if __name__ == "__main__":
    main()
