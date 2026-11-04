#!/usr/bin/env python3
"""Zużycie techniczne budynku, trzy formuły z jawnym wyborem i podstawą.

Podstawa: literatura wyceny i budownictwa. Przyjęte przyporządkowanie formuł
do gospodarki remontowej obiektu:
  liniowa (t/T):              obiekty o złej, zaniedbanej gospodarce remontowej,
  Ross ((t/T + (t/T)^2)/2):   obiekty o prawidłowej, przeciętnej gospodarce,
  nieliniowa ((t/T)^2, tzw. formuła Eytelweina): obiekty bardzo dobrze utrzymane.
Wybór formuły to decyzja rzeczoznawcy oparta na oględzinach, wymaga wpisu do
rejestru z uzasadnieniem; przyporządkowanie wyżej to punkt wyjścia, nie automat.
Wynik metody czasowej jest POMOCNICZY: nie zastępuje oceny zużycia elementów
z oględzin ani badań specjalistycznych; formuła liniowa bywa w literaturze
traktowana jako teoretyczna dla budynków.

Użycie:
  python3 zuzycie.py --wiek 20 --trwalosc 100 [--formula ross|liniowa|nieliniowa]

Bez --formula wypisuje wszystkie trzy do porównania.
Formuły (t = wiek, T = okres trwałości):
  liniowa:    Sz = t/T
  ross:       Sz = ((t/T) + (t/T)^2) / 2
  nieliniowa: Sz = (t/T)^2
"""
import argparse, json, sys
from decimal import Decimal, ROUND_HALF_UP


def zaokr(v, miejsca=2):
    return float(Decimal(str(v)).quantize(Decimal(1).scaleb(-miejsca),
                                          rounding=ROUND_HALF_UP))

INTERPRETACJA = {
    "liniowa": "zła (zaniedbana) gospodarka remontowa",
    "ross": "prawidłowa (przeciętna) gospodarka remontowa",
    "nieliniowa": "bardzo dobre utrzymanie obiektu",
}


def licz(wiek: float, trwalosc: float):
    import math
    if not (math.isfinite(wiek) and math.isfinite(trwalosc)):
        sys.exit("ODMOWA: wiek i trwałość muszą być skończonymi liczbami.")
    if trwalosc <= 0 or wiek < 0:
        sys.exit("ODMOWA: trwałość musi być > 0, wiek >= 0.")
    if wiek > trwalosc:
        sys.exit("ODMOWA: wiek przekracza przyjęty okres trwałości, formuły dałyby "
                 "zużycie ponad 100%. Zweryfikuj T (remonty przedłużające trwałość, "
                 "wpis do rejestru z uzasadnieniem) i uruchom ponownie.")
    u = wiek / trwalosc
    return {"liniowa": u, "ross": (u + u * u) / 2, "nieliniowa": u * u}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--wiek", type=float, required=True)
    p.add_argument("--trwalosc", type=float, required=True)
    p.add_argument("--formula", choices=["ross", "liniowa", "nieliniowa"])
    a = p.parse_args()
    w = licz(a.wiek, a.trwalosc)
    wyniki = {k: zaokr(v * 100) for k, v in w.items()}
    u = a.wiek / a.trwalosc
    out = {"OZNACZENIE": "MATERIAŁ WARSZTATOWY, PROJEKT NIEPODPISANY",
           "charakter_wyniku": "pomocnicza metoda czasowa; nie zastępuje oceny "
                               "zużycia elementów z oględzin",
           "wiek": a.wiek, "trwalosc": a.trwalosc, "zuzycie_pct": wyniki,
           "interpretacja_formul": INTERPRETACJA,
           "zapis_rachunku": {
               "liniowa": f"Sz = t/T = {a.wiek:g}/{a.trwalosc:g} = {wyniki['liniowa']:g}%",
               "ross": (f"Sz = ((t/T)+(t/T)^2)/2 = (({u:.4f})+({u:.4f})^2)/2 "
                        f"= {wyniki['ross']:g}%"),
               "nieliniowa": f"Sz = (t/T)^2 = ({u:.4f})^2 = {wyniki['nieliniowa']:g}%",
           }}
    if a.formula:
        out["wybrana_formula"] = a.formula
        out["zuzycie_przyjete_pct"] = wyniki[a.formula]
        out["UWAGA"] = ("Wybór formuły zapisz do rejestru z uzasadnieniem z oględzin "
                        f"(przyjęta formuła odpowiada: {INTERPRETACJA[a.formula]}).")
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
