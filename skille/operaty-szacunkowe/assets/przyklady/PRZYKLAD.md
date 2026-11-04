# Pokazowa wycena od A do Z (dane fikcyjne, DEMO)

Kompletny, wygenerowany naprawdę (nie ręcznie spisany) przebieg wyceny lokalu
mieszkalnego 54,3 m2 pod kredyt, metodą porównywania parami. Pliki obliczeniowe
i rejestr w `wycena-demo/` powstały z realnych uruchomień skryptów; projekt
operatu i arkusz samooceny to materiał warsztatowy zbudowany na tych wynikach.
Dane rynkowe są fikcyjne i oznaczone DEMO.

## Co tu jest

| Plik | Co pokazuje |
|---|---|
| `wycena-demo/rejestr.jsonl` | rejestr decyzji: 19 wpisów z łańcuchem skrótów, od otwarcia po kontrolę |
| `wycena-demo/rejestr-eksport.md` | ten sam rejestr jako czytelna tabela (`rejestr.py export --format md`) |
| `wycena-demo/dane-porownywanie.json` | wejście kalkulatora zbudowane z danych "od użytkownika" (z kierunkami skal, źródłami, warunkami transakcji i ΔC zbioru) |
| `wycena-demo/dane-porownywanie.xlsx` | arkusz ze śladem obliczeń: Info, Dane, Trend, Statystyka, Porownanie, Wrazliwosc, Tablica_wiazan |
| `wycena-demo/dane-porownywanie.wynik.json` | wynik kalkulatora: 11 972,97 zł/m2, wartość 650 132 zł, sha256 wejścia |
| `wycena-demo/projekt-operatu.md` | projekt operatu (MATERIAŁ WARSZTATOWY) zbudowany na tych liczbach |
| `wycena-demo/arkusz-samooceny.md` | wypełniony arkusz samooceny (20 pozycji) |
| `wycena-demo/check.txt` | wynik `rejestr.py check`: OK + skrót końcowy łańcucha (kotwica) |

## Jak to powstało, krok po kroku

1. **Etap 1 (założenia):** `rejestr.py init` + wpisy: założenia (cel kredytowy,
   wartość rynkowa, daty), decyzja o podejściu z uzasadnieniem i polem
   `--dane '{"podejscie": "porownawcze"}'`, protokół materiałów.
2. **Etap 2 (analiza rynku):** kryteria doboru próby, 5 transakcji ze źródłami
   (RCN/akt), odrzucenie z uzasadnieniem, ostrzeżenie o próbie poniżej 6,
   trzy wagi z kierunkami skal, decyzja o trendzie 4%/rok i o ΔC = 2300 zł/m2
   z rozstępu zaktualizowanych cen zbioru 21 transakcji. Rejestr nie przyjąłby
   transakcji przed kryteriami ani wagi czy decyzji bez uzasadnienia.
3. **Etap 3 (obliczenia):**
   `python scripts/kalkulatory/porownywanie_parami.py wycena-demo/dane-porownywanie.json`.
   Kalkulator wymusił źródła, warunki transakcji, kierunki skal i jawną
   podstawę ΔC; skorygował ceny trendem, policzył statystykę (bez outlierów),
   poprawki parami i wrażliwość (maks. odchylenie scenariusza 0,38%), zapisał
   XLSX i wynik JSON z sha256 wejścia. Wpis `obliczenie` niesie parametry
   przebiegu w polu dane.
4. **Etap 4 (redakcja):** projekt-operatu.md z oznaczeniem MATERIAŁ
   WARSZTATOWY i klauzulami roboczymi; wpis `redakcja` (bez niego rejestr nie
   wpuści na kontrolę).
5. **Etap 5 (kontrola):** arkusz-samooceny.md (18 TAK, 2 NIE DOTYCZY, zero
   NIE) + `rejestr.py check` ze skrótem końcowym łańcucha zanotowanym
   w projekcie operatu.

## Co warto obejrzeć w XLSX

- **Info:** oznaczenie MATERIAŁ WARSZTATOWY i metadane wyceny.
- **Tablica_wiazan:** skąd pochodzi każda kluczowa wielkość (adres komórki
  wyniku, źródło pierwotne każdej ceny transakcyjnej).
- **Wrazliwosc:** co się dzieje z wynikiem przy przesunięciach wag o 5 p.p.

Uwaga: to materiał pokazowy. W realnej wycenie dane pochodzą z Twojego badania
rynku, a każda decyzja ma uzasadnienie merytoryczne, nie "DEMO".
