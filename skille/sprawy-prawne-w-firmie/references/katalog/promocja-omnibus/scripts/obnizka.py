#!/usr/bin/env python3
"""Liczy cenę odniesienia przy obniżce i procent obniżki od niej.

Użycie:
  python scripts/obnizka.py --historia "2026-10-20:299;2026-11-11:399" --oferowany-od 2026-03-01 --obnizka 2026-11-27 --cena 199
  python scripts/obnizka.py --historia "..." --obnizka 2026-11-27 --cena 199 --deklarowany 50 --przekreslona 399
  python scripts/obnizka.py --najnizsza 520 --cena 312 --deklarowany 40
  python scripts/obnizka.py --przed-pierwsza 10 --cena 4 --deklarowany 60     (towar szybko psujący się)
  python scripts/obnizka.py --selftest

--historia: pary data:cena oddzielone średnikiem; cena obowiązuje od tej daty do następnej
zmiany. Jedna zmiana na dzień (przy kilku zmianach jednego dnia skrypt prosi o dokładniejsze dane).
--oferowany-od: pierwszy dzień sprzedaży produktu w tym kanale. Bez niego, gdy historia
zaczyna się po początku okna 30 dni, skrypt mówi, których dni brakuje, zamiast zgadywać.
--przed-pierwsza: cena sprzed pierwszej obniżki (towar szybko psujący się), zamiast okna 30 dni.
Ceny w zł, dodatnie, najwyżej dwa miejsca po przecinku. Skrypt nie łączy się z siecią
i niczego nie zapisuje. Wynik to rachunek na danych od użytkownika, nie ocena zgodności z prawem.
Kod wyjścia: 0 bez uwag, 1 są uwagi do oceny, 2 złe dane wejściowe.
"""
import argparse
import io
import sys
from contextlib import redirect_stdout
from datetime import date, timedelta
from decimal import Decimal, ROUND_HALF_UP, InvalidOperation


class ZleDane(Exception):
    pass


def kwota(s):
    try:
        d = Decimal(str(s).replace(" ", "").replace(",", "."))
    except InvalidOperation:
        raise ZleDane(f"nie rozumiem kwoty: {s}")
    if not d.is_finite() or d <= 0:
        raise ZleDane(f"kwota musi być dodatnią liczbą: {s}")
    if d.as_tuple().exponent < -2:
        raise ZleDane(f"kwota ma więcej niż dwa miejsca po przecinku: {s}")
    return d


def zl(d):
    return f"{d.quantize(Decimal('0.01'), ROUND_HALF_UP)}".replace(".", ",") + " zł"


def proc(d):
    return f"{d.quantize(Decimal('0.01'), ROUND_HALF_UP)}".replace(".", ",") + " %"


def dzien(s):
    try:
        return date.fromisoformat(s.strip())
    except ValueError:
        raise ZleDane(f"data w formacie RRRR-MM-DD: {s}")


def parsuj_historie(tekst):
    pary = []
    for kawalek in tekst.split(";"):
        kawalek = kawalek.strip()
        if not kawalek:
            continue
        if ":" not in kawalek:
            raise ZleDane(f"para data:cena: {kawalek}")
        d, c = kawalek.split(":", 1)
        pary.append((dzien(d), kwota(c)))
    if not pary:
        raise ZleDane("pusta historia cen")
    daty = [d for d, _ in pary]
    if len(set(daty)) != len(daty):
        raise ZleDane("kilka zmian ceny jednego dnia: podaj, która cena obowiązywała i przez ile, albo najniższą z tego dnia")
    pary.sort()
    return pary


def okno_30(pary, d_obnizki, oferowany_od=None):
    """Zwraca (najniższa, opis_podstawy, brakujace_dni_lub_None, poczatek_okna)."""
    poczatek = d_obnizki - timedelta(days=30)
    if pary[0][0] >= d_obnizki:
        raise ZleDane("historia nie obejmuje żadnego dnia przed obniżką")
    od = poczatek
    opis = "najniższa cena z 30 dni przed obniżką"
    brak = None
    if oferowany_od and oferowany_od > poczatek:
        od = oferowany_od
        opis = "najniższa cena od wprowadzenia towaru"
        if pary[0][0] > oferowany_od:
            brak = (oferowany_od, pary[0][0] - timedelta(days=1))
    elif pary[0][0] > poczatek:
        brak = (poczatek, pary[0][0] - timedelta(days=1))
    if oferowany_od and oferowany_od >= d_obnizki:
        raise ZleDane("dzień rozpoczęcia sprzedaży musi być wcześniejszy niż dzień obniżki")
    if oferowany_od and pary[0][0] < oferowany_od:
        raise ZleDane("historia zawiera ceny sprzed rozpoczęcia sprzedaży; sprawdź --oferowany-od albo historię")
    ceny = []
    for i, (zm, cena) in enumerate(pary):
        do = pary[i + 1][0] if i + 1 < len(pary) else d_obnizki
        do = min(do, d_obnizki)
        if do > od and zm < d_obnizki and do > zm:
            ceny.append(cena)
    if not ceny:
        raise ZleDane("historia nie obejmuje żadnego dnia okna przed obniżką")
    return min(ceny), opis, brak, od


def procent(baza, cena):
    return (baza - cena) / baza * 100


def main(argv):
    p = argparse.ArgumentParser()
    p.add_argument("--historia")
    p.add_argument("--obnizka", help="pierwszy dzień ceny obniżonej RRRR-MM-DD")
    p.add_argument("--oferowany-od", help="pierwszy dzień sprzedaży w tym kanale RRRR-MM-DD")
    p.add_argument("--najnizsza", help="najniższa cena z 30 dni, gdy znasz ją wprost")
    p.add_argument("--przed-pierwsza", help="cena sprzed pierwszej obniżki (towar szybko psujący się)")
    p.add_argument("--cena", help="cena po obniżce")
    p.add_argument("--deklarowany", help="procent obniżki z komunikatu, np. 50")
    p.add_argument("--przekreslona", help="cena pokazana jako przekreślona")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args(argv)
    if a.selftest:
        return selftest()
    try:
        return licz(a)
    except ZleDane as e:
        print(f"Złe dane: {e}")
        return 2


def licz(a):
    zrodla = sum(bool(x) for x in (a.najnizsza, a.przed_pierwsza, a.historia))
    if not a.cena or zrodla != 1 or (a.historia and not a.obnizka):
        raise ZleDane("podaj --cena i dokładnie jedno z: --historia z --obnizka, --najnizsza, --przed-pierwsza")
    if not a.historia and (a.obnizka or a.oferowany_od):
        raise ZleDane("--obnizka i --oferowany-od działają tylko z --historia")
    cena = kwota(a.cena)
    uwagi = 0
    if a.najnizsza:
        baza, opis = kwota(a.najnizsza), "najniższa cena z 30 dni przed obniżką (podana)"
    elif a.przed_pierwsza:
        baza, opis = kwota(a.przed_pierwsza), "cena przed pierwszą obniżką (towar szybko psujący się)"
    else:
        d = dzien(a.obnizka)
        ofer = dzien(a.oferowany_od) if a.oferowany_od else None
        baza, opis, brak, od = okno_30(parsuj_historie(a.historia), d, ofer)
        print(f"Okno: od {od.isoformat()} do {(d - timedelta(days=1)).isoformat()}")
        if brak:
            print(f"UWAGA: brak cen z dni {brak[0].isoformat()} do {brak[1].isoformat()}; "
                  "wynik dotyczy tylko znanej części okna, a cena z brakujących dni może być niższa. "
                  "Jeśli produktu wtedy nie było w sprzedaży, podaj --oferowany-od.")
            opis += " w znanej części okna"
            uwagi = 1
    print(f"Cena odniesienia: {zl(baza)} ({opis})")
    print(f"Cena po obniżce: {zl(cena)}")
    if cena >= baza:
        print("UWAGA: cena po obniżce nie jest niższa od ceny odniesienia, więc względem niej obniżki nie ma.")
        uwagi = 1
    else:
        print(f"Obniżka od ceny odniesienia: {proc(procent(baza, cena))} ({zl(baza - cena)})")
    if a.deklarowany:
        try:
            dek = Decimal(str(a.deklarowany).replace(",", ".").replace("%", "").strip())
        except InvalidOperation:
            raise ZleDane(f"procent z komunikatu to liczba, np. 30: {a.deklarowany}")
        if not dek.is_finite() or not (0 < dek < 100):
            raise ZleDane(f"procent z komunikatu musi być większy od 0 i mniejszy od 100: {a.deklarowany}")
        z_dekl = (baza * (100 - dek) / 100).quantize(Decimal("0.01"), ROUND_HALF_UP)
        if z_dekl != cena:
            kier = "większą" if z_dekl < cena else "mniejszą"
            print(f"UWAGA: komunikat podaje {proc(dek)}; od ceny odniesienia {zl(baza)} daje to {zl(z_dekl)}, "
                  f"a cena po obniżce to {zl(cena)}, więc komunikat obiecuje {kier} obniżkę, niż wynika z cen.")
            uwagi = 1
        else:
            print(f"Procent z komunikatu {proc(dek)} odpowiada cenie po obniżce liczonej od ceny odniesienia.")
    if a.przekreslona:
        prz = kwota(a.przekreslona)
        if prz != baza:
            print(f"UWAGA: cena przekreślona {zl(prz)} różni się od ceny odniesienia {zl(baza)}. "
                  "Ocena zależy od prezentacji: cena odniesienia musi być widoczna obok w równorzędnej formie, "
                  "a procent i korzyść liczone od niej.")
            if prz > cena:
                print(f"Obniżka od ceny przekreślonej: {proc(procent(prz, cena))}")
            uwagi = 1
    return uwagi


def selftest():
    cicho = io.StringIO()

    def uruchom(*args):
        with redirect_stdout(cicho):
            return main(list(args))

    h = parsuj_historie("2026-10-20:299;2026-11-11:399")
    n, opis, brak, _ = okno_30(h, date(2026, 11, 27), date(2026, 3, 1))
    assert n == Decimal("299") and brak is None and "30 dni" in opis
    n, opis, brak, _ = okno_30(parsuj_historie("2026-11-01:299;2026-11-11:399"), date(2026, 11, 27))
    assert n == Decimal("299") and brak == (date(2026, 10, 28), date(2026, 10, 31)), brak
    n, opis, brak, _ = okno_30(parsuj_historie("2026-11-12:690"), date(2026, 11, 27), date(2026, 11, 12))
    assert n == Decimal("690") and brak is None and "od wprowadzenia" in opis
    n, _, _, _ = okno_30(parsuj_historie("2026-09-01:100;2026-10-28:150"), date(2026, 11, 27))
    assert n == Decimal("150"), n  # 100 zł obowiązywało do 27.10, czyli poza oknem
    n, _, _, _ = okno_30(parsuj_historie("2026-09-01:100;2026-10-29:150"), date(2026, 11, 27))
    assert n == Decimal("100"), n  # 28.10 jest pierwszym dniem okna
    try:
        parsuj_historie("2026-09-01:100;2026-11-01:80;2026-11-01:90")
        assert False, "dwie zmiany jednego dnia"
    except ZleDane:
        pass
    for zla in ("-20", "0", "NaN", "Infinity", "1,234"):
        try:
            kwota(zla)
            assert False, zla
        except ZleDane:
            pass
    assert kwota("1 299,99") == Decimal("1299.99")
    assert uruchom("--najnizsza", "520", "--cena", "312", "--deklarowany", "40") == 0
    assert uruchom("--najnizsza", "100", "--cena", "80.49", "--deklarowany", "20") == 1
    assert uruchom("--najnizsza", "100", "--cena", "80.50", "--deklarowany", "20") == 1
    assert uruchom("--najnizsza", "299", "--cena", "199", "--deklarowany", "50") == 1
    assert uruchom("--najnizsza", "299", "--cena", "199", "--przekreslona", "399") == 1
    assert uruchom("--najnizsza", "199", "--cena", "199") == 1
    assert uruchom("--przed-pierwsza", "10", "--cena", "4", "--deklarowany", "60") == 0
    assert uruchom("--najnizsza", "100", "--cena", "-20") == 2
    assert uruchom("--najnizsza", "100", "--przed-pierwsza", "90", "--cena", "50") == 2
    for zly in ("abc", "NaN", "Infinity", "-20", "120", "0"):
        assert uruchom("--najnizsza", "100", "--cena", "80", "--deklarowany", zly) == 2, zly
    assert uruchom("--historia", "2026-11-01:100", "--obnizka", "2026-11-27", "--oferowany-od", "2026-11-27", "--cena", "80") == 2
    assert uruchom("--historia", "2026-11-01:100;2026-11-13:80", "--obnizka", "2026-11-27", "--oferowany-od", "2026-11-12", "--cena", "70") == 2
    assert uruchom("--najnizsza", "100", "--cena", "80", "--obnizka", "2026-11-27") == 2
    print("selftest: OK")
    return 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main(sys.argv[1:]))
