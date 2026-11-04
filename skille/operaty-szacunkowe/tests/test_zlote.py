#!/usr/bin/env python3
"""Złote testy kalkulatorów i rejestru. Uruchamiać po KAŻDEJ zmianie skryptów:
    python tests/test_zlote.py
Wartości wzorcowe policzone ręcznie, patrz komentarze przy każdym teście.
"""
import json, subprocess, sys, tempfile
from pathlib import Path

BAZA = Path(__file__).resolve().parent.parent
SKRYPTY = BAZA / "scripts"
KALK = SKRYPTY / "kalkulatory"
BLEDY = []


def uruchom(argv, oczekuj_blad=False):
    r = subprocess.run([sys.executable] + argv, capture_output=True, text=True)
    if oczekuj_blad:
        assert r.returncode != 0, f"oczekiwano odmowy, a skrypt przeszedł: {argv}"
        return r.stderr + r.stdout
    assert r.returncode == 0, f"skrypt padł: {argv}\n{r.stderr}"
    return r.stdout


def test(nazwa, fn):
    try:
        fn()
        print(f"  OK  {nazwa}")
    except AssertionError as e:
        BLEDY.append(f"{nazwa}: {e}")
        print(f"  BLAD {nazwa}: {e}")


def _plik(dane):
    td = tempfile.mkdtemp()
    p = Path(td) / "dane.json"
    p.write_text(json.dumps(dane), encoding="utf-8")
    return p


def _pp(dane, oczekuj_blad=False):
    p = _plik(dane)
    out = uruchom([str(KALK / "porownywanie_parami.py"), str(p)],
                  oczekuj_blad=oczekuj_blad)
    return out if oczekuj_blad else json.loads(out)


def _kap(dane, oczekuj_blad=False):
    p = _plik(dane)
    out = uruchom([str(KALK / "kapitalizacja.py"), str(p)], oczekuj_blad=oczekuj_blad)
    return out if oczekuj_blad else json.loads(out)


# ---------- porównywanie parami ----------
# Wzorzec ręczny: ceny 5000/4000/4500 (trend 0%), ΔC=1000.
# Cechy: lokalizacja 60% skala 1-3 -> zakres 600, na pkt 300;
#        stan 40% skala 1-3 -> zakres 400, na pkt 200.
# Wyceniana: lok 2, stan 3.
# T1(3,3): -300+0 -> 4700 | T2(1,1): +300+400 -> 4700 | T3(2,2): 0+200 -> 4700
# Średnia 4700 zł/m2; powierzchnia 50 m2 -> 235000 zł.
# Wrażliwość 65/35 i 55/45: średnie 4725 i 4675, maks. odchylenie 25/4700 = 0.53%.
DANE_PP = {
    "id_wyceny": "TEST/1", "data_wyceny": "2026-08-15", "powierzchnia_m2": 50,
    "trend_pct_rok": 0.0, "prog_odchylenia_pct": 20.0,
    "mala_proba_uzasadnienie": "test wzorcowy na minimalnej próbie 3 transakcji",
    "delta_c_proba_uzasadnienie": "test: próba wzorcowa wyczerpuje zbiór",
    "warunki_transakcji": {"potwierdzenie": True,
                           "uzasadnienie": "test: warunki wolnorynkowe znane"},
    "cechy": [
        {"nazwa": "lokalizacja", "waga_pct": 60, "skala": [1, 3],
         "kierunek": "wyzsza_lepsza", "uzasadnienie": "test"},
        {"nazwa": "stan", "waga_pct": 40, "skala": [1, 3],
         "kierunek": "wyzsza_lepsza", "uzasadnienie": "test"},
    ],
    "nieruchomosc_wyceniana": {"oceny": {"lokalizacja": 2, "stan": 3}},
    "transakcje": [
        {"id": "T1", "data": "2026-02-15", "cena_m2": 5000,
         "oceny": {"lokalizacja": 3, "stan": 3}, "zrodlo": "test poz.1"},
        {"id": "T2", "data": "2026-03-15", "cena_m2": 4000,
         "oceny": {"lokalizacja": 1, "stan": 1}, "zrodlo": "test poz.2"},
        {"id": "T3", "data": "2026-04-15", "cena_m2": 4500,
         "oceny": {"lokalizacja": 2, "stan": 2}, "zrodlo": "test poz.3"},
    ],
}


def t_pp_bazowy():
    w = _pp(DANE_PP)
    assert w["wynik_m2"] == 4700.0, f"wynik_m2={w['wynik_m2']}, oczekiwano 4700.0"
    assert w["wartosc_zl"] == 235000, f"wartosc={w['wartosc_zl']}, oczekiwano 235000"
    assert w["delta_c"] == 1000.0
    assert w["flaga_odchylenia_od_mediany"] is False
    assert w["wynik_poza_przedzialem_proby"] is False
    assert w["wrazliwosc"]["min_m2"] == 4675.0 and w["wrazliwosc"]["max_m2"] == 4725.0, \
        f"wrażliwość {w['wrazliwosc']}"
    assert w["wrazliwosc"]["maks_odchylenie_pct"] == 0.53, w["wrazliwosc"]
    assert w["OZNACZENIE"].startswith("MATERIAŁ WARSZTATOWY")
    assert Path(w["xlsx"]).exists(), "brak pliku XLSX"
    from openpyxl import load_workbook
    wb = load_workbook(w["xlsx"])
    assert wb.sheetnames[0] == "Info" and "MATERIAŁ WARSZTATOWY" in str(wb["Info"]["A1"].value)


def t_pp_trend():
    # Trend 10%/rok; T1 rok przed datą wyceny: 4000 * 1.1^(365/365.25) = 4399.71...
    # Oceny identyczne z wycenianą -> zero poprawek, wynik = średnia trzech cen.
    d = json.loads(json.dumps(DANE_PP))
    d["trend_pct_rok"] = 10.0
    d["transakcje"] = [
        {"id": "T1", "data": "2025-08-15", "cena_m2": 4000,
         "oceny": {"lokalizacja": 2, "stan": 3}, "zrodlo": "t"},
        {"id": "T2", "data": "2026-08-15", "cena_m2": 4600,
         "oceny": {"lokalizacja": 2, "stan": 3}, "zrodlo": "t"},
        {"id": "T3", "data": "2026-08-15", "cena_m2": 4300,
         "oceny": {"lokalizacja": 2, "stan": 3}, "zrodlo": "t"},
    ]
    w = _pp(d)
    oczek = (4000 * (1.1 ** (365 / 365.25)) + 4600 + 4300) / 3
    assert abs(w["wynik_m2"] - round(oczek, 2)) < 0.02, \
        f"wynik_m2={w['wynik_m2']}, oczekiwano ~{oczek:.2f}"


def t_pp_odmowy():
    zle = json.loads(json.dumps(DANE_PP)); zle["cechy"][0]["waga_pct"] = 55
    assert "100%" in _pp(zle, oczekuj_blad=True)
    zle = json.loads(json.dumps(DANE_PP)); zle["cechy"][1]["uzasadnienie"] = " "
    assert "uzasadnienia" in _pp(zle, oczekuj_blad=True)
    # mniej niż 3 transakcje
    zle = json.loads(json.dumps(DANE_PP)); zle["transakcje"] = zle["transakcje"][:2]
    assert "co najmniej 3" in _pp(zle, oczekuj_blad=True)
    # rozstęp 0
    zle = json.loads(json.dumps(DANE_PP))
    for t in zle["transakcje"]:
        t["cena_m2"] = 4500; t["oceny"] = {"lokalizacja": 2, "stan": 3}
    assert "rozstęp" in _pp(zle, oczekuj_blad=True)
    # brak oceny cechy
    zle = json.loads(json.dumps(DANE_PP)); del zle["transakcje"][0]["oceny"]["stan"]
    assert "brak oceny" in _pp(zle, oczekuj_blad=True)


def t_pp_walidacje_wejscia():
    # duplikat id transakcji
    zle = json.loads(json.dumps(DANE_PP)); zle["transakcje"][1]["id"] = "T1"
    assert "zdublowane id" in _pp(zle, oczekuj_blad=True)
    # mała próba bez uzasadnienia
    zle = json.loads(json.dumps(DANE_PP)); zle["mala_proba_uzasadnienie"] = ""
    assert "mala_proba_uzasadnienie" in _pp(zle, oczekuj_blad=True)
    # skala odwrócona
    zle = json.loads(json.dumps(DANE_PP)); zle["cechy"][0]["skala"] = [3, 1]
    assert "skala" in _pp(zle, oczekuj_blad=True)
    # ocena poza skalą
    zle = json.loads(json.dumps(DANE_PP)); zle["transakcje"][0]["oceny"]["stan"] = 5
    assert "poza zadeklarowaną" in _pp(zle, oczekuj_blad=True)
    # data transakcji po dacie wyceny
    zle = json.loads(json.dumps(DANE_PP)); zle["transakcje"][0]["data"] = "2026-09-01"
    assert "późniejszą" in _pp(zle, oczekuj_blad=True)
    # zły format daty: komunikat, nie traceback
    zle = json.loads(json.dumps(DANE_PP)); zle["transakcje"][0]["data"] = "2026-02-30"
    out = _pp(zle, oczekuj_blad=True)
    assert "ODMOWA" in out and "Traceback" not in out
    # NaN w cenie
    zle = json.loads(json.dumps(DANE_PP))
    tekst = json.dumps(zle).replace("5000", "NaN", 1)
    p = _plik({}); p.write_text(tekst, encoding="utf-8")
    out = uruchom([str(KALK / "porownywanie_parami.py"), str(p)], oczekuj_blad=True)
    assert "skończoną liczbą" in out
    # brak wymaganego klucza: komunikat, nie traceback
    zle = json.loads(json.dumps(DANE_PP)); del zle["powierzchnia_m2"]
    out = _pp(zle, oczekuj_blad=True)
    assert "brak wymaganego pola" in out and "Traceback" not in out
    # brak kierunku skali
    zle = json.loads(json.dumps(DANE_PP)); del zle["cechy"][0]["kierunek"]
    assert "kierunek" in _pp(zle, oczekuj_blad=True)
    # brak potwierdzenia warunków transakcji
    zle = json.loads(json.dumps(DANE_PP)); del zle["warunki_transakcji"]
    assert "warunki_transakcji" in _pp(zle, oczekuj_blad=True)
    # brak jawnej podstawy delta C
    zle = json.loads(json.dumps(DANE_PP)); zle["delta_c_proba_uzasadnienie"] = ""
    assert "podstawa ΔC" in _pp(zle, oczekuj_blad=True)
    # puste źródło transakcji
    zle = json.loads(json.dumps(DANE_PP)); zle["transakcje"][0]["zrodlo"] = " "
    assert "źródła" in _pp(zle, oczekuj_blad=True)
    # waga ujemna
    zle = json.loads(json.dumps(DANE_PP))
    zle["cechy"][0]["waga_pct"] = -10; zle["cechy"][1]["waga_pct"] = 110
    assert "dodatnie" in _pp(zle, oczekuj_blad=True)
    # PESEL w źródle transakcji
    zle = json.loads(json.dumps(DANE_PP))
    zle["transakcje"][0]["zrodlo"] = "akt, strona PESEL 44051401359"
    assert "PESEL" in _pp(zle, oczekuj_blad=True)
    # duplikat nazwy cechy
    zle = json.loads(json.dumps(DANE_PP)); zle["cechy"][1]["nazwa"] = "lokalizacja"
    zle["nieruchomosc_wyceniana"]["oceny"] = {"lokalizacja": 2}
    assert "zdublowane nazwy cech" in _pp(zle, oczekuj_blad=True)


DANE_OUT = None


def _dane_outliery():
    # 6 transakcji o identycznych ocenach z wycenianą (zero poprawek):
    # 4000/4020/4040/4060/4080/12000. IQR(6, quantiles n=4): q1=4015, q3=6060,
    # górna granica 9127.5 -> T6=12000 oflagowana.
    d = json.loads(json.dumps(DANE_PP))
    d["mala_proba_uzasadnienie"] = ""
    d["transakcje"] = [
        {"id": f"T{i+1}", "data": "2026-05-15", "cena_m2": c,
         "oceny": {"lokalizacja": 2, "stan": 3}, "zrodlo": f"t{i+1}"}
        for i, c in enumerate([4000, 4020, 4040, 4060, 4080, 12000])
    ]
    return d


def t_pp_outliery():
    d = _dane_outliery()
    # bez decyzji -> obliczenia wstrzymane
    out = _pp(d, oczekuj_blad=True)
    assert "outlier" in out and "T6" in out
    # decyzja odrzuc -> wynik = średnia pozostałych pięciu = 4040
    d["outliery_decyzje"] = {"T6": {"decyzja": "odrzuc",
                                    "uzasadnienie": "cena nierynkowa, transakcja powiązana"}}
    w = _pp(d)
    assert w["wynik_m2"] == 4040.0, w["wynik_m2"]
    assert w["outliery_flagi"] == ["T6"] and w["outliery_odrzucone"] == ["T6"], w
    # decyzja zostaw -> średnia sześciu: 32200/6 = 5366.67 (poza próbą 4000-4080? nie,
    # max=12000, więc w przedziale); flaga odchylenia od mediany (4050): 32.51% > 20%
    d2 = _dane_outliery()
    d2["outliery_decyzje"] = {"T6": {"decyzja": "zostaw",
                                     "uzasadnienie": "cena potwierdzona w akcie"}}
    w2 = _pp(d2)
    assert w2["outliery_odrzucone"] == [] and w2["wynik_m2"] == 5366.67, w2["wynik_m2"]
    assert w2["flaga_odchylenia_od_mediany"] is True and "WYMAGANE" in w2
    # decyzja dla nieoflagowanej transakcji -> odmowa
    d3 = _dane_outliery()
    d3["outliery_decyzje"] = {"T6": {"decyzja": "odrzuc", "uzasadnienie": "x"},
                              "T2": {"decyzja": "odrzuc", "uzasadnienie": "x"}}
    assert "nieoflagowane" in _pp(d3, oczekuj_blad=True)
    # za mało po odrzuceniu: 4 transakcje, klaster 3 + outlier odrzucony -> zostają 3, OK;
    # wariant z 2 klastrowymi się nie zdarzy przy min-3 na wejściu i 1 fladze, więc
    # symulujemy przez odrzucenie z 4: [4000,4010,4020,12000] -> q1=4002.5, q3=6015,
    # granica 9033.75, T4 oflagowana; po odrzuceniu 3 -> przechodzi; kontrola progu <3
    # wymaga 2 flag: [4000,4010,11000,12000] -> q1=4002.5, q3=11750, iqr=7747.5:
    # granice szerokie, brak flag. Zostawiamy ścieżkę <3 pokrytą przez wejście 2 transakcji.


def t_pp_wstrzykniecie_xlsx():
    from openpyxl import load_workbook
    d = json.loads(json.dumps(DANE_PP))
    d["transakcje"][0]["zrodlo"] = '=HYPERLINK("http://zly.example","klik")'
    d["transakcje"][1]["zrodlo"] = "+SUM(A1:A9)"
    d["transakcje"][2]["zrodlo"] = "@cmd"
    w = _pp(d)
    wb = load_workbook(w["xlsx"])
    for wiersz in (2, 3, 4):
        kom = wb["Dane"].cell(row=wiersz, column=4)
        assert kom.data_type != "f", "wstrzyknięta formuła wykonana w XLSX"
        assert str(kom.value)[0] == "'", f"brak neutralizacji: {kom.value!r}"
    # źródła trafiają też do Tablica_wiazan
    tw = wb["Tablica_wiazan"]
    zrodla = [str(tw.cell(row=r, column=4).value) for r in range(2, tw.max_row + 1)]
    assert any(z.startswith("'=") for z in zrodla), "brak neutralizacji w tablicy wiązań"


def t_pp_jedna_cecha():
    d = json.loads(json.dumps(DANE_PP))
    d["cechy"] = [{"nazwa": "lokalizacja", "waga_pct": 100, "skala": [1, 3],
                   "kierunek": "wyzsza_lepsza", "uzasadnienie": "test"}]
    d["nieruchomosc_wyceniana"] = {"oceny": {"lokalizacja": 2}}
    for t, o in zip(d["transakcje"], (3, 1, 2)):
        t["oceny"] = {"lokalizacja": o}
    w = _pp(d)
    assert "uwaga" in w["wrazliwosc"], w["wrazliwosc"]


def t_pp_delta_c_zbioru():
    # ΔC z zbioru 2000 zamiast rozstępu próby 1000: zakresy x2,
    # T1: -600, T2: +600+800=+1400 -> 5400, T3: +400 -> 4900; średnia (4400+5400+4900)/3=4900
    d = json.loads(json.dumps(DANE_PP))
    d["delta_c_zbioru"] = 2000.0
    w = _pp(d)
    assert w["wynik_m2"] == 4900.0, w["wynik_m2"]
    assert "zbioru" in w["zrodlo_delta_c"]


def t_pp_kierunek_skali():
    # cecha nizsza_lepsza: wyceniana 1 (lepsza), transakcje 3 (gorsze)
    # ceny 4000/4500/5000, ΔC=1000 (próba), waga 100%, na_pkt 500,
    # poprawka +2x500=+1000 -> wynik = średnia(5000,5500,6000) = 5500
    d = json.loads(json.dumps(DANE_PP))
    d["cechy"] = [{"nazwa": "halas", "waga_pct": 100, "skala": [1, 3],
                   "kierunek": "nizsza_lepsza", "uzasadnienie": "test"}]
    d["nieruchomosc_wyceniana"] = {"oceny": {"halas": 1}}
    for tr, (c, o) in zip(d["transakcje"], ((4000, 3), (4500, 3), (5000, 3))):
        tr["cena_m2"] = c; tr["oceny"] = {"halas": o}
    w = _pp(d)
    assert w["wynik_m2"] == 5500.0, w["wynik_m2"]
    assert w["flaga_odchylenia_od_mediany"] is True


def t_pp_wynik_dodatni():
    # korekty sprowadzają cenę do zera: wyceniana 1, transakcje 3, wyzsza_lepsza
    # poprawka -1000 przy cenach 1000/2000/3000 -> ODMOWA zamiast wyniku <= 0
    d = json.loads(json.dumps(DANE_PP))
    d["cechy"] = [{"nazwa": "stan", "waga_pct": 100, "skala": [1, 3],
                   "kierunek": "wyzsza_lepsza", "uzasadnienie": "test"}]
    d["nieruchomosc_wyceniana"] = {"oceny": {"stan": 1}}
    for tr, (c, o) in zip(d["transakcje"], ((1000, 3), (2000, 3), (3000, 3))):
        tr["cena_m2"] = c; tr["oceny"] = {"stan": o}
    out = _pp(d, oczekuj_blad=True)
    assert "zera" in out or "kierunek" in out


def t_pp_outlier_mala_proba():
    # n=4 z ekstremum: IQR bylby slepy, MAD flaguje; po odrzuceniu n=3 wymaga
    # uzasadnienia malej proby (luka bypass zamknieta)
    d = json.loads(json.dumps(DANE_PP))
    d["mala_proba_uzasadnienie"] = ""
    d["transakcje"] = [
        {"id": f"T{i+1}", "data": "2026-05-15", "cena_m2": c,
         "oceny": {"lokalizacja": 2, "stan": 3}, "zrodlo": f"t{i+1}"}
        for i, c in enumerate([1000, 1010, 1020, 1000000])
    ]
    out = _pp(d, oczekuj_blad=True)
    assert "outlier" in out and "T4" in out
    d["outliery_decyzje"] = {"T4": {"decyzja": "odrzuc",
                                    "uzasadnienie": "cena wielokrotnie poza rynkiem"}}
    out = _pp(d, oczekuj_blad=True)
    assert "mala_proba_uzasadnienie" in out
    d["mala_proba_uzasadnienie"] = "swiadoma praca na 3 transakcjach po odrzuceniu"
    w = _pp(d)
    assert w["wynik_m2"] == 1010.0, w["wynik_m2"]
    # mad == 0 (3 identyczne ceny) nie wylacza detekcji: odmienne ceny flagowane
    d2 = json.loads(json.dumps(DANE_PP))
    d2["mala_proba_uzasadnienie"] = "test malej proby"
    d2["transakcje"] = [
        {"id": f"T{i+1}", "data": "2026-05-15", "cena_m2": c,
         "oceny": {"lokalizacja": 2, "stan": 3}, "zrodlo": f"t{i+1}"}
        for i, c in enumerate([4500, 4500, 4500, 4520, 999000])
    ]
    out = _pp(d2, oczekuj_blad=True)
    assert "T4" in out and "T5" in out
    d2["outliery_decyzje"] = {
        "T4": {"decyzja": "zostaw", "uzasadnienie": "cena z aktu, roznica rynkowa"},
        "T5": {"decyzja": "odrzuc", "uzasadnienie": "blad rzedu wielkosci w zrodle"}}
    w2 = _pp(d2)
    assert w2["wynik_m2"] == 4505.0, w2["wynik_m2"]


def t_pp_delta_zbioru_mniejsza():
    # rozstep zbioru nie moze byc wezszy niz rozstep proby
    d = json.loads(json.dumps(DANE_PP))
    d["delta_c_zbioru"] = 500.0
    out = _pp(d, oczekuj_blad=True)
    assert "podzbioru" in out


# ---------- zużycie ----------
def t_zuzycie():
    w = json.loads(uruchom([str(KALK / "zuzycie.py"), "--wiek", "20", "--trwalosc", "100"]))
    z = w["zuzycie_pct"]
    assert z["liniowa"] == 20.0 and z["ross"] == 12.0 and z["nieliniowa"] == 4.0, z
    i = w["interpretacja_formul"]
    assert "zła" in i["liniowa"] and "prawidłowa" in i["ross"] \
        and "bardzo dobre" in i["nieliniowa"], i
    assert "20/100" in w["zapis_rachunku"]["liniowa"]
    out = uruchom([str(KALK / "zuzycie.py"), "--wiek", "120", "--trwalosc", "100"],
                  oczekuj_blad=True)
    assert "trwało" in out


# ---------- kapitalizacja ----------
DANE_KAP = {
    "dochod": {"pgi": 240000, "pustostany_pct": 5, "zaleglosci_pct": 1,
               "koszty_operacyjne": 48000,
               "podstawa_dochodu": "test: umowy najmu i koszty 2025"},
    "dochod_stabilny": {"potwierdzenie": True,
                        "uzasadnienie": "najem instytucjonalny, umowy wieloletnie"},
    "stopa": {"transakcje": [
        {"id": "K1", "noi": 120000, "cena": 2000000, "zrodlo": "t", "data": "2026-03-01"},
        {"id": "K2", "noi": 90000, "cena": 1200000, "zrodlo": "t", "data": "2026-05-10"},
        {"id": "K3", "noi": 200000, "cena": 2500000, "zrodlo": "t", "data": "2026-06-20"}],
        "przyjeta_pct": 7.5,
        "uzasadnienie": "obiekt o ryzyku zbliżonym do K2, środek przedziału rynkowego"}}


def t_kapitalizacja():
    # EGI 225600, NOI 177600, stopy 6/7.5/8, przyjęta 7.5 -> W = 2368000
    w = _kap(DANE_KAP)
    assert w["egi"] == 225600.0 and w["noi"] == 177600.0, (w["egi"], w["noi"])
    assert w["R_pct"] == 7.5 and w["wartosc_zl"] == 2368000
    assert w["statystyka_stop_pct"]["mediana"] == 7.5
    assert "OSTRZEZENIE_STOPA" not in w and "OSTRZEZENIE_BRAK_TABLICY" not in w


def t_kapitalizacja_flagi():
    # stopa poza przedziałem rynku
    d = json.loads(json.dumps(DANE_KAP)); d["stopa"]["przyjeta_pct"] = 12.0
    d["stopa"]["uzasadnienie"] = "obiekt o podwyższonym ryzyku, pustostan strukturalny"
    w = _kap(d)
    assert "OSTRZEZENIE_STOPA" in w
    # brak tablicy z rynku bez opisu badania -> odmowa
    d = json.loads(json.dumps(DANE_KAP)); d["stopa"]["transakcje"] = []
    assert "badania rynku" in _kap(d, oczekuj_blad=True)
    # brak tablicy, ale z opisem badania rynku -> przechodzi z uwagą
    d["stopa"]["badanie_rynku"] = "test: analiza 6 transakcji komercyjnych 2026 H1"
    w = _kap(d)
    assert "UWAGA_TABLICA" in w and w["badanie_rynku"].startswith("test")


def t_kapitalizacja_odmowy():
    # stopa bez uzasadnienia
    d = json.loads(json.dumps(DANE_KAP)); d["stopa"]["uzasadnienie"] = ""
    assert "uzasadnienia" in _kap(d, oczekuj_blad=True)
    # brak potwierdzenia stabilności dochodu
    d = json.loads(json.dumps(DANE_KAP)); del d["dochod_stabilny"]
    assert "stabiln" in _kap(d, oczekuj_blad=True)
    # same transakcje bez stopy przyjętej
    d = json.loads(json.dumps(DANE_KAP)); del d["stopa"]["przyjeta_pct"]
    assert "automatyczn" in _kap(d, oczekuj_blad=True)
    # NOI wyceny <= 0
    d = json.loads(json.dumps(DANE_KAP)); d["dochod"]["koszty_operacyjne"] = 999999
    assert "NOI" in _kap(d, oczekuj_blad=True)
    # transakcja stopy bez daty
    d = json.loads(json.dumps(DANE_KAP)); del d["stopa"]["transakcje"][0]["data"]
    assert "daty" in _kap(d, oczekuj_blad=True)
    # transakcja stopy z NOI <= 0
    d = json.loads(json.dumps(DANE_KAP)); d["stopa"]["transakcje"][0]["noi"] = -5
    assert "NOI <= 0" in _kap(d, oczekuj_blad=True)
    # brak podstawy dochodu
    d = json.loads(json.dumps(DANE_KAP)); del d["dochod"]["podstawa_dochodu"]
    assert "podstawa_dochodu" in _kap(d, oczekuj_blad=True)
    # pustostany poza zakresem
    d = json.loads(json.dumps(DANE_KAP)); d["dochod"]["pustostany_pct"] = 150
    assert "0-100" in _kap(d, oczekuj_blad=True)


# ---------- statystyka ----------
def t_statystyka():
    w = json.loads(uruchom([str(KALK / "statystyka_proby.py"),
                            "--ceny", "5000", "4000", "4500", "--wynik", "5600"]))
    s = w["statystyka"]
    assert s["mediana"] == 4500.0 and s["rozstep"] == 1000.0
    assert w["flaga_odchylenia"] is True and w["odchylenie_od_mediany_pct"] == 24.44
    assert "OSTRZEZENIE_WYNIK" in w
    out = uruchom([str(KALK / "statystyka_proby.py"), "--ceny", "5000"],
                  oczekuj_blad=True)
    assert "minimum 2" in out
    out = uruchom([str(KALK / "statystyka_proby.py"), "--ceny", "5000", "-4000"],
                  oczekuj_blad=True)
    assert "dodatnimi" in out


# ---------- rejestr ----------
def t_rejestr():
    with tempfile.TemporaryDirectory() as td:
        r = str(SKRYPTY / "rejestr.py")
        # PESEL w init -> odmowa
        out = uruchom([r, "init", td, "--id", "wycena 44051401359"], oczekuj_blad=True)
        assert "PESEL" in out
        uruchom([r, "init", td, "--id", "TEST/1", "--cel", "test"])
        # powtórny init -> odmowa (append-only)
        out = uruchom([r, "init", td, "--id", "TEST/2"], oczekuj_blad=True)
        assert "append-only" in out
        # nieznany typ -> odmowa
        out = uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "zalozenia",
                       "--tresc", "x"], oczekuj_blad=True)
        assert "nieznany typ" in out
        # typ bramkowy w złym etapie -> odmowa
        out = uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "transakcja",
                       "--tresc", "x"], oczekuj_blad=True)
        assert "należy do etapu" in out
        # wejście na analiza_rynku bez założeń i podejścia -> odmowa
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "kryteria",
                       "--tresc", "rynek lokalny X"], oczekuj_blad=True)
        assert "zalozenie" in out and "podejscie" in out
        uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "zalozenie",
                 "--tresc", "cel: kredyt; wartosc rynkowa"])
        # decyzja ze złym podejściem -> odmowa
        out = uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "decyzja",
                       "--tresc", "metoda", "--uzasadnienie", "x",
                       "--dane", '{"podejscie": "hybrydowe"}'],
                      oczekuj_blad=True)
        assert "spoza listy" in out
        uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "decyzja",
                 "--tresc", "podejscie porownawcze, porownywanie parami",
                 "--uzasadnienie", "sa ceny transakcyjne podobnych",
                 "--dane", '{"podejscie": "porownawcze"}'])
        # decyzja bez uzasadnienia -> odmowa
        out = uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "decyzja",
                       "--tresc", "x"], oczekuj_blad=True)
        assert "uzasadnienia" in out
        # bez protokolu materialow nie wejdziesz na analize
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "kryteria",
                       "--tresc", "rynek"], oczekuj_blad=True)
        assert "material" in out
        uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "material",
                 "--tresc", "otrzymano KW, EGiB; brak swiadectwa (poproszono)"])
        # PESEL zakodowany w JSON (\u0034...) -> odmowa po zdekodowaniu
        out = uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "material",
                       "--tresc", "x", "--dane",
                       '{"s": "\\u0034\\u0034051401359"}'], oczekuj_blad=True)
        assert "PESEL" in out
        # transakcja przed kryteriami -> odmowa
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "transakcja",
                       "--tresc", "T1"], oczekuj_blad=True)
        assert "kryteri" in out
        uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "kryteria",
                 "--tresc", "rynek lokalny X, 24 mies., lokale 2-pok."])
        uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "transakcja",
                 "--tresc", "T1 5000 zł/m2"])
        # odrzucenie bez uzasadnienia -> odmowa
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "odrzucenie",
                       "--tresc", "T9"], oczekuj_blad=True)
        assert "uzasadnienia" in out
        # PESEL z separatorami -> odmowa
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "material",
                       "--tresc", "wlasciciel PESEL 44 05 14-013-59"], oczekuj_blad=True)
        assert "PESEL" in out
        # PESEL w --uzasadnienie i --dane -> odmowa
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "material",
                       "--tresc", "x", "--uzasadnienie", "44051401359"], oczekuj_blad=True)
        assert "PESEL" in out
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "material",
                       "--tresc", "x", "--dane", '{"strona": "44051401359"}'],
                      oczekuj_blad=True)
        assert "PESEL" in out
        # --dane nie-obiekt -> odmowa
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "material",
                       "--tresc", "x", "--dane", '[1,2]'], oczekuj_blad=True)
        assert "obiektem JSON" in out
        # wejście na obliczenia przy 1 transakcji (podejście porównawcze) -> odmowa
        out = uruchom([r, "add", td, "--etap", "obliczenia", "--typ", "obliczenie",
                       "--tresc", "porownywanie parami",
                       "--dane", '{"plik": "d.json"}'], oczekuj_blad=True)
        assert "transakcja" in out
        uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "transakcja",
                 "--tresc", "T2 4000 zł/m2"])
        uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "transakcja",
                 "--tresc", "T3 4500 zł/m2"])
        uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "waga",
                 "--tresc", "lokalizacja 60%", "--uzasadnienie", "analiza rynku lokalnego"])
        # obliczenie bez dane.plik -> odmowa (wiazanie rejestru z przebiegiem)
        out = uruchom([r, "add", td, "--etap", "obliczenia", "--typ", "obliczenie",
                       "--tresc", "porownywanie parami"], oczekuj_blad=True)
        assert "plik" in out
        uruchom([r, "add", td, "--etap", "obliczenia", "--typ", "obliczenie",
                 "--tresc", "porownywanie parami",
                 "--dane", '{"plik": "d.json", "wynik_m2": 4700.0}'])
        # kontrola bez redakcji -> odmowa
        out = uruchom([r, "add", td, "--etap", "kontrola", "--typ", "kontrola",
                       "--tresc", "arkusz"], oczekuj_blad=True)
        assert "redakcja" in out
        uruchom([r, "add", td, "--etap", "redakcja", "--typ", "redakcja",
                 "--tresc", "czesci opisowe operatu"])
        # wpis merytoryczny wstecz bez powrotu -> odmowa
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "transakcja",
                       "--tresc", "T4"], oczekuj_blad=True)
        assert "chronologi" in out
        # powrot bez uzasadnienia -> odmowa
        out = uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "powrot",
                       "--tresc", "poszerzenie proby"], oczekuj_blad=True)
        assert "uzasadnienia" in out
        # jawny powrot otwiera etap; stare obliczenie przestaje wystarczać
        uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "powrot",
                 "--tresc", "poszerzenie proby po wyniku probnym",
                 "--uzasadnienie", "wynik wisi na jednej wadze"])
        uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "transakcja",
                 "--tresc", "T4 4200 zł/m2"])
        out = uruchom([r, "add", td, "--etap", "redakcja", "--typ", "redakcja",
                       "--tresc", "poprawki opisu"], oczekuj_blad=True)
        assert "obliczenie po ostatnim powrocie" in out
        uruchom([r, "add", td, "--etap", "obliczenia", "--typ", "obliczenie",
                 "--tresc", "porownywanie parami, przebieg 2",
                 "--dane", '{"plik": "d2.json", "wynik_m2": 4600.0}'])
        uruchom([r, "add", td, "--etap", "redakcja", "--typ", "redakcja",
                 "--tresc", "czesci opisowe, przebieg 2"])
        uruchom([r, "add", td, "--etap", "kontrola", "--typ", "kontrola",
                 "--tresc", "arkusz samooceny wypelniony"])
        # zmiana podejscia po obliczeniach bez powrotu -> odmowa
        out = uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "decyzja",
                       "--tresc", "jednak dochodowe", "--uzasadnienie", "x",
                       "--dane", '{"podejscie": "dochodowe"}'], oczekuj_blad=True)
        assert "powrot" in out
        # tryb plikowy add --plik
        wp = Path(td) / "wpis.json"
        wp.write_text(json.dumps({"etap": "kontrola", "typ": "uzasadnienie",
                                  "tresc": "wpis trybem plikowym $(echo test)",
                                  "uzasadnienie": "x"}), encoding="utf-8")
        out = uruchom([r, "add", td, "--plik", str(wp)])
        assert "zapisany" in out
        out = uruchom([r, "check", td])
        assert "OK" in out and "Skrót końcowy" in out
        # katalog z '..' -> odmowa
        out = uruchom([r, "check", td + "/../" + Path(td).name], oczekuj_blad=True)
        assert ".." in out
        # manipulacja pliku -> check wykrywa przerwany łańcuch
        pl = Path(td) / "rejestr.jsonl"
        linie = pl.read_text(encoding="utf-8").splitlines()
        w2 = json.loads(linie[1]); w2["tresc"] = "PODMIENIONE"
        linie[1] = json.dumps(w2, ensure_ascii=False, sort_keys=True)
        pl.write_text("\n".join(linie) + "\n", encoding="utf-8")
        out = uruchom([r, "check", td], oczekuj_blad=True)
        assert "łańcuch" in out or "hash" in out


def t_rejestr_dochodowe():
    # dla podejścia dochodowego bramka obliczeń nie wymaga transakcji ani wag
    with tempfile.TemporaryDirectory() as td:
        r = str(SKRYPTY / "rejestr.py")
        uruchom([r, "init", td, "--id", "TEST/D", "--cel", "aktualizacja czynszu"])
        uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "zalozenie",
                 "--tresc", "cel: sprzedaz; wartosc rynkowa; komercja"])
        uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "decyzja",
                 "--tresc", "podejscie dochodowe, kapitalizacja prosta",
                 "--uzasadnienie", "nieruchomosc przynosi stabilny dochod",
                 "--dane", '{"podejscie": "dochodowe"}'])
        uruchom([r, "add", td, "--etap", "zalozenia", "--typ", "material",
                 "--tresc", "umowy najmu, zestawienie kosztow 2025"])
        uruchom([r, "add", td, "--etap", "analiza_rynku", "--typ", "kryteria",
                 "--tresc", "rynek najmu lokali uslugowych, 24 mies."])
        uruchom([r, "add", td, "--etap", "obliczenia", "--typ", "obliczenie",
                 "--tresc", "kapitalizacja prosta, NOI i tablica stop",
                 "--dane", '{"plik": "kap.json", "stopa_przyjeta_pct": 7.5}'])
        out = uruchom([r, "check", td])
        assert "OK" in out and "dochodowe" in out


if __name__ == "__main__":
    print("Złote testy operaty-szacunkowe:")
    test("porównywanie parami, wzorzec 4700 zł/m2 / 235 000 zł + arkusz Info", t_pp_bazowy)
    test("porównywanie parami, korekta trendu", t_pp_trend)
    test("porównywanie parami, odmowy (wagi, uzasadnienie, min. 3, rozstęp, oceny)", t_pp_odmowy)
    test("porównywanie parami, walidacje wejścia (duplikaty, skala, daty, NaN)", t_pp_walidacje_wejscia)
    test("porównywanie parami, outliery: wstrzymanie, odrzuc, zostaw, obce id", t_pp_outliery)
    test("porównywanie parami, neutralizacja formuł XLSX (= + @, tablica wiązań)", t_pp_wstrzykniecie_xlsx)
    test("porównywanie parami, jedna cecha bez fałszywego 0% wrażliwości", t_pp_jedna_cecha)
    test("porównywanie parami, kierunek skali nizsza_lepsza (5500 zł/m2)", t_pp_kierunek_skali)
    test("porównywanie parami, odmowa wyniku niedodatniego", t_pp_wynik_dodatni)
    test("porównywanie parami, ΔC ze zbioru podobnych (4900 zł/m2)", t_pp_delta_c_zbioru)
    test("porównywanie parami, outlier przy n=4 (MAD) i bramka małej próby", t_pp_outlier_mala_proba)
    test("porównywanie parami, ΔC zbioru węższe niż próby to odmowa", t_pp_delta_zbioru_mniejsza)
    test("zużycie, wzorce + interpretacje + zapis rachunku + odmowa t>T", t_zuzycie)
    test("kapitalizacja, NOI 177 600, R przyjęte 7.5%, W 2 368 000", t_kapitalizacja)
    test("kapitalizacja, flagi (stopa poza rynkiem, brak tablicy)", t_kapitalizacja_flagi)
    test("kapitalizacja, odmowy (uzasadnienie, stabilność, automat, NOI, podstawa)", t_kapitalizacja_odmowy)
    test("statystyka, flaga 24.44%, odmowy (n<2, ceny niedodatnie)", t_statystyka)
    test("rejestr, bramki, powrot, PESEL (separatory, init, unicode), --plik, kotwica", t_rejestr)
    test("rejestr, ścieżka dochodowa bez wymogu transakcji i wag", t_rejestr_dochodowe)
    if BLEDY:
        print(f"\n{len(BLEDY)} TEST(ÓW) PADŁO"); sys.exit(1)
    print("\nWszystkie złote testy przeszły.")
