#!/usr/bin/env python3
"""Podejście dochodowe, metoda inwestycyjna, technika kapitalizacji prostej: W = NOI / R.

Podstawa: Nota Interpretacyjna PFSRM "Zastosowanie podejścia dochodowego".
Warunki stosowania egzekwowane przez skrypt:
  - kapitalizacja prosta wymaga dochodu stabilnego w dłuższym okresie; wejście
    musi zawierać potwierdzenie tej przesłanki z uzasadnieniem,
  - stopa kapitalizacji NIGDY nie jest wybierana automatycznie: transakcje
    rynkowe (R_i = NOI_i / cena_i) dają wyłącznie tablicę i statystykę
    pomocniczą, a stopę przyjmuje rzeczoznawca wprost, z uzasadnieniem
    uwzględniającym porównywalność obiektów i różnice ryzyka; skrypt flaguje
    stopę przyjętą poza przedziałem stóp z rynku oraz brak tablicy z rynku.

Granica pojęcia kosztów operacyjnych (częsty błąd sztuki): do NOI wchodzą roczne
wydatki operacyjne właściciela (podatki i opłaty, ubezpieczenie, zarządzanie,
utrzymanie techniczne, media niepokrywane przez najemców) ORAZ średnioroczny
nakład na regularnie powtarzaną wymianę elementów stałego wyposażenia (nakłady
odtworzeniowe okresowe); NIE wchodzą amortyzacja, obsługa długu ani nakłady
rozwojowe. Skrypt tego nie rozstrzygnie za rzeczoznawcę, przypomina w wyjściu,
a podstawę przyjętych wielkości dochodu dokumentuje pole podstawa_dochodu.

Wejście: JSON (ścieżka jako argument); wzór: assets/przyklady/dane-kapitalizacja.json.
{
  "dochod": {                       // roczny, dla nieruchomości wycenianej
    "pgi": 240000,                  // potencjalny dochód brutto
    "pustostany_pct": 5,            // 0-100
    "zaleglosci_pct": 1,            // 0-100
    "koszty_operacyjne": 48000,     // roczne koszty operacyjne właściciela, >= 0
    "podstawa_dochodu": "umowy najmu i zestawienie kosztów za 2025 (obowiązkowe)"
  },
  "dochod_stabilny": {
    "potwierdzenie": true,          // przesłanka: dochód stały (lub o stałym
    "uzasadnienie": "..."           // trendzie) w DŁUGIM okresie, z analizy
  },                                //  nieruchomości i rynku, nie z samego stażu najmu
  "stopa": {
    "transakcje": [                 // tablica pomocnicza z rynku (zalecana)
      {"id": "K1", "noi": 120000, "cena": 2000000, "zrodlo": "..."}
    ],
    "przyjeta_pct": 7.5,            // stopa przyjęta przez rzeczoznawcę (obowiązkowa)
    "uzasadnienie": "..."           // obowiązkowe, odnosi się do ryzyka i porównywalności
  }
}
Wyjście: JSON z EGI, NOI, tablicą R_i i statystyką stóp, stopą przyjętą i wartością.
Zaokrąglenia prezentacyjne kupieckie (ROUND_HALF_UP): kwoty do 0.01 zł, wartość do
pełnych zł, stopy do 3 miejsc; statystyka liczona na wartościach niezaokrąglonych.
"""
import hashlib, json, math, statistics, sys
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path


def odmowa(t):
    sys.exit("ODMOWA: " + t)


def zaokr(v, miejsca=2):
    return float(Decimal(str(v)).quantize(Decimal(1).scaleb(-miejsca),
                                          rounding=ROUND_HALF_UP))


def zaokr_zl(v):
    return int(Decimal(str(v)).quantize(Decimal(1), rounding=ROUND_HALF_UP))


def liczba(v, nazwa):
    if not isinstance(v, (int, float)) or isinstance(v, bool) or not math.isfinite(v):
        odmowa(f"pole '{nazwa}' musi być skończoną liczbą (jest: {v!r}).")
    return float(v)


def main():
    if len(sys.argv) != 2:
        sys.exit("Użycie: kapitalizacja.py <dane.json>")
    try:
        d = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"),
                       parse_constant=lambda s: math.nan)
    except FileNotFoundError:
        odmowa(f"nie znaleziono pliku wejściowego {sys.argv[1]}.")
    except json.JSONDecodeError as e:
        odmowa(f"plik wejściowy nie jest poprawnym JSON-em ({e}).")
    if not isinstance(d, dict):
        odmowa("wejście musi być obiektem JSON (słownikiem).")
    for k in ("dochod", "stopa"):
        if k not in d or not isinstance(d[k], dict):
            odmowa(f"pole '{k}' musi być obiektem (wzór w nagłówku skryptu).")
    if not isinstance(d.get("dochod_stabilny", {}), dict):
        odmowa("pole 'dochod_stabilny' musi być obiektem.")

    stab = d.get("dochod_stabilny", {})
    if stab.get("potwierdzenie") is not True or not str(stab.get("uzasadnienie", "")).strip():
        odmowa("kapitalizacja prosta wymaga dochodu stałego (lub o stałym trendzie) "
               "w długim okresie. Dodaj pole dochod_stabilny z potwierdzeniem "
               "i uzasadnieniem wyprowadzonym z analizy nieruchomości i rynku "
               "(nie z samego stażu najmu), albo rozważ technikę dyskontową.")

    doch = d["dochod"]
    pgi = liczba(doch.get("pgi"), "dochod.pgi")
    pust = liczba(doch.get("pustostany_pct", 0), "dochod.pustostany_pct")
    zal = liczba(doch.get("zaleglosci_pct", 0), "dochod.zaleglosci_pct")
    koszty = liczba(doch.get("koszty_operacyjne"), "dochod.koszty_operacyjne")
    if not str(doch.get("podstawa_dochodu", "")).strip():
        odmowa("wymagane pole dochod.podstawa_dochodu (skąd pochodzą PGI, "
               "pustostany, zaległości i koszty); dochód bez podstawy nie wchodzi "
               "do śladu obliczeń.")
    if not (0 <= pust < 100) or not (0 <= zal < 100):
        odmowa("pustostany_pct i zaleglosci_pct muszą mieścić się w przedziale 0-100.")
    if koszty < 0:
        odmowa("koszty_operacyjne nie mogą być ujemne.")
    egi = pgi * (1 - pust / 100 - zal / 100)
    noi = egi - koszty
    if noi <= 0:
        odmowa("NOI <= 0, kapitalizacja prosta nie ma zastosowania; "
               "rozważ inne podejście i udokumentuj w rejestrze.")

    st = d["stopa"]
    trans_st = st.get("transakcje") or []
    if not isinstance(trans_st, list) or not all(isinstance(x, dict) for x in trans_st):
        odmowa("pole 'stopa.transakcje' musi być listą obiektów.")
    tablica_r, stopy = [], []
    for t in trans_st:
        cena = liczba(t.get("cena"), f"cena transakcji {t.get('id')}")
        noi_t = liczba(t.get("noi"), f"noi transakcji {t.get('id')}")
        if cena <= 0:
            odmowa(f"transakcja {t.get('id')} z ceną <= 0.")
        if noi_t <= 0:
            odmowa(f"transakcja {t.get('id')} z NOI <= 0 nie nadaje się do "
                   "wyprowadzenia stopy kapitalizacji.")
        r_i = 100 * noi_t / cena
        stopy.append(r_i)
        if not str(t.get("zrodlo", "")).strip():
            odmowa(f"transakcja {t.get('id')} w tablicy stóp bez źródła (zrodlo).")
        dt = str(t.get("data", ""))
        if not __import__("re").match(r"^\d{4}-\d{2}-\d{2}$", dt):
            odmowa(f"transakcja {t.get('id')} w tablicy stóp bez daty RRRR-MM-DD; "
                   "stopy kapitalizacji zależą od momentu w czasie, data jest częścią "
                   "wartości dowodowej tablicy.")
        tablica_r.append({"id": t.get("id"), "R_pct": zaokr(r_i, 3),
                          "zrodlo": t.get("zrodlo"), "data": t.get("data")})

    r_pct = st.get("przyjeta_pct")
    if not r_pct:
        odmowa("stopę kapitalizacji przyjmuje rzeczoznawca (pole "
               "stopa.przyjeta_pct z uzasadnieniem). Tablica stóp z rynku jest "
               "materiałem pomocniczym, nie wyborem automatycznym.")
    r_pct = liczba(r_pct, "stopa.przyjeta_pct")
    if not str(st.get("uzasadnienie", "")).strip():
        odmowa("stopa przyjęta wymaga uzasadnienia "
               "(pole stopa.uzasadnienie), zapisz je też do rejestru.")
    if r_pct <= 0:
        odmowa("stopa kapitalizacji musi być dodatnia.")

    wynik = {"OZNACZENIE": "MATERIAŁ WARSZTATOWY, PROJEKT NIEPODPISANY",
             "egi": zaokr(egi), "noi": zaokr(noi), "tablica_stop": tablica_r}
    if r_pct < 0.5:
        wynik["OSTRZEZENIE_SKALA_STOPY"] = (
            f"Stopa przyjęta {r_pct}% jest podejrzanie niska; upewnij się, że podajesz "
            "procent (7.5), nie ułamek (0.075).")
    if stopy:
        wynik["statystyka_stop_pct"] = {"n": len(stopy),
                                        "min": zaokr(min(stopy), 3),
                                        "max": zaokr(max(stopy), 3),
                                        "mediana": zaokr(statistics.median(stopy), 3)}
        if r_pct < min(stopy) - 5e-4 or r_pct > max(stopy) + 5e-4:
            wynik["OSTRZEZENIE_STOPA"] = (
                f"Stopa przyjęta {r_pct}% leży poza przedziałem stóp z rynku "
                f"({min(stopy):.3f}% - {max(stopy):.3f}%); uzasadnienie musi wprost "
                "tłumaczyć tę różnicę (ryzyko, porównywalność obiektów).")
    else:
        if not str(st.get("badanie_rynku", "")).strip():
            odmowa("stopę kapitalizacji ustala się na podstawie badania rynku "
                   "nieruchomości podobnych: podaj tablicę stóp z transakcji "
                   "(stopa.transakcje) ALBO pole stopa.badanie_rynku z opisem "
                   "rynkowego źródła poziomu stopy (co badano i kiedy).")
        wynik["badanie_rynku"] = st.get("badanie_rynku")
        wynik["UWAGA_TABLICA"] = (
            "Stopa bez tablicy stóp w wejściu: podstawą jest opis badania rynku "
            "(pole badanie_rynku); odnotuj go w rejestrze i w operacie.")

    wartosc = noi / (r_pct / 100)
    wynik.update({
        "R_pct": zaokr(r_pct, 3),
        "uzasadnienie_stopy": st.get("uzasadnienie"),
        "podstawa_dochodu": doch.get("podstawa_dochodu"),
        "podstawa_stopy": "przyjęta przez rzeczoznawcę z uzasadnieniem",
        "wartosc_zl": zaokr_zl(wartosc),
        "zapis_rachunku": f"W = NOI/R = {noi:.2f} / {r_pct/100:.5f} = {wartosc:.2f}",
        "UWAGA": ("Parametry, tablicę stóp i podstawę stopy zapisz do rejestru decyzji. "
                  "Sprawdź granicę kosztów operacyjnych: bez amortyzacji, obsługi długu "
                  "i nakładów inwestycyjnych."),
    })
    wynik["wejscie_sha256"] = hashlib.sha256(Path(sys.argv[1]).read_bytes()).hexdigest()
    tekst_wyniku = json.dumps(wynik, ensure_ascii=False, indent=2, allow_nan=False)
    Path(sys.argv[1]).with_suffix(".wynik.json").write_text(tekst_wyniku + "\n",
                                                            encoding="utf-8")
    print(tekst_wyniku)


if __name__ == "__main__":
    main()
