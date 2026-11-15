# karta-rozmiarow: raport bramek QA (wydanie 1.0.0, 15 listopada 2026)

Skill darmowy, kategoria Marketing, bez prawa, podatków i kadr, więc panel eskalacji nie jest wymagany; sędzia Codex w sześciu cyklach. Scenariusze: `testy/wyniki-gemini/scenariusze/karta-rozmiarow.md`. Wiedza: research 15.11.2026, 12 źródeł w `skille/karta-rozmiarow/references/pomiary.md` (PKN o normach PN-EN 13402 i ISO 8559, ISO 9407 i 19407, praktyka Reserved, CCC, Esotiq, Sellpy, UOKiK).

## Bramka sensu

`baza-bez-skilla-A.md`: goły model dopisał regułę „na granicy weź większy”, twierdzenia o lnie, ranking „większość bierze mniejszy”, przyjął bez pytania wymiary ciała i podsunął „prawdopodobnie 106”. Przewaga skilla: zero dopisanych liczb i rad, pytania o jednostkę i rodzaj wymiaru, skrypt spójności tabeli.

## Walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów; `skany.sh`: czysto (pliki i paczka). Opis 989 znaków. Selftest `scripts/tabela_rozmiarow.py`: ok. 40 przypadków OK (separator, przecinki dziesiętne, nadmiarowe pola, przerwy, nakładki, kolejność liczbowa, literowa i stanikowa, oznaczenia UK/US jako tekst, walidacja liczb, mm na cm).

## Testy na ślepo (Sonnet)

| Cykl | A+B1+B2 | C | Uwagi |
|---|---|---|---|
| 1 | PASS (`skill-A-B1-B2.md`) | PASS 8/10 (`skill-C.md`) | „cm” dopisane bez potwierdzenia, prośba nazwana anomalią, jednostka „_mm” nierozpoznana |
| 2 | PASS 8/10 (`retest-A-B1-B2.md`) | PASS 8/10 (`retest-C.md`) | jednostki i rodzaj wymiaru jako pola do uzupełnienia, bez porady stopa-wkładka |

Walidator wyniku czysto we wszystkich przebiegach; zero wartości z linii PII.

## Sędzia Codex

- c1 (`codex-c1.txt`): 3 blokery (cicha utrata danych przy średniku i przecinkach dziesiętnych, centymetry bez potwierdzenia, rada stopa-wkładka bez danych producenta), 12 ważnych. Wszystko przyjęte.
- c2 (`codex-c2.txt`): 1 bloker (zły wymiar obok poprawnego przechodził jako tekst), kolejność oznaczeń 3XS, 2XL, 75A, przerwy zależne od jednostki. Naprawione.
- c3 (`codex-c3.txt`): zachowanie modelu bez zarzutu; skrypt: kolumna wymiaru z błędami arkusza, niedomknięty cudzysłów; naprawione.
- c4 (`codex-c4.txt`): znak „|” w kolumnie rozmiarów, błąd arkusza w rozmiarach, siatka stanikowa; naprawione.
- c5 (`codex-c5.txt`): realne tabele producentów (Bonprix, Strauss, Clarks, staniki, UK i US) bez fałszywych błędów; bloker: oznaczenia 34R, 36S brane za staniki; naprawione.
- c6 (`codex-c6.txt`): „BLOKERY DO WYDANIA: NIE”, bez regresji na tabelach Gatty.

## Wyzwalanie

`testy/wyzwalanie/karta-rozmiarow-wynik.log`: 20/20, 3 przebiegi, pełne tło (cykl 1: 19/20, rozjazd po stronie sąsiada co-mowi-arkusz, zapytanie doprecyzowane).

## Kompatybilność

GPT: A, B1, B2, C PASS (`testy/wyniki-gpt/karta-rozmiarow.md`). Gemini: nieużywane.

## Statusy

`status: gotowy`, `claude: ok`, `gpt: ok`, `gemini: brak`.
