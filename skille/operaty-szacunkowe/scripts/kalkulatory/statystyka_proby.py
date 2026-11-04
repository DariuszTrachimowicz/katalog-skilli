#!/usr/bin/env python3
"""Statystyka próby transakcyjnej + flaga odchylenia wyniku od mediany.

Do uzasadnienia reprezentatywności próby w analizie rynku oraz do kontroli
wyniku (proces bankowy / AMRON: wynik odległy od mediany wymaga komentarza).

Użycie:
  python3 statystyka_proby.py --ceny 5000 4000 4500 [--wynik 4700] [--prog 20]
"""
import argparse, json, math, statistics, sys
from decimal import Decimal, ROUND_HALF_UP


def zaokr(v, miejsca=2):
    return float(Decimal(str(v)).quantize(Decimal(1).scaleb(-miejsca),
                                          rounding=ROUND_HALF_UP))


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--ceny", type=float, nargs="+", required=True)
    p.add_argument("--wynik", type=float)
    p.add_argument("--prog", type=float, default=20.0)
    a = p.parse_args()
    c = a.ceny
    if len(c) < 2:
        sys.exit("ODMOWA: minimum 2 ceny.")
    if any(not math.isfinite(x) or x <= 0 for x in c):
        sys.exit("ODMOWA: wszystkie ceny muszą być dodatnimi, skończonymi liczbami.")
    srednia = statistics.mean(c)
    odch = statistics.stdev(c)
    s = {"n": len(c), "min": min(c), "max": max(c), "rozstep": max(c) - min(c),
         "srednia": zaokr(srednia),
         "mediana": zaokr(statistics.median(c)),
         "odch_std": zaokr(odch),
         }
    s["wsp_zmiennosci_pct"] = zaokr(100 * odch / srednia)
    out = {"OZNACZENIE": "MATERIAŁ WARSZTATOWY, PROJEKT NIEPODPISANY",
           "statystyka": s}
    if s["wsp_zmiennosci_pct"] > 30:
        out["OSTRZEZENIE_PROBA"] = ("Współczynnik zmienności > 30%, próba może być "
                                    "niejednorodna; rozważ zawężenie kryteriów (wpis do rejestru).")
    if a.wynik is not None:
        odch = zaokr(100 * abs(a.wynik - s["mediana"]) / s["mediana"])
        out["wynik"] = a.wynik
        out["odchylenie_od_mediany_pct"] = odch
        out["flaga_odchylenia"] = odch > a.prog
        if odch > a.prog:
            out["WYMAGANE"] = (f"Odchylenie {odch}% > próg {a.prog:g}%, wymagany akapit "
                               f"uzasadnienia w operacie i wpis do rejestru.")
        if a.wynik < s["min"] or a.wynik > s["max"]:
            out["OSTRZEZENIE_WYNIK"] = "Wynik poza przedziałem cen próby."
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
