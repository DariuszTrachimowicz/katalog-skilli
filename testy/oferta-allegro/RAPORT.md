# oferta-allegro: raport bramek QA (wydanie 1.0.0, 15 listopada 2026)

Skill darmowy, kategoria Marketing, bez prawa, podatków i kadr, więc panel eskalacji nie jest wymagany. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/oferta-allegro.md`. Zasady Allegro: research 15.11.2026, 25 źródeł (pomoc i dokumentacja Allegro, UOKiK), rejestr w `skille/oferta-allegro/references/zasady-allegro.md`; trzy twierdzenia zmieniające porady (wyłączenie ofert wielowariantowych 14.04.2026, wyszukiwarka bez opisów, zakaz informacji o gwarancji w opisie) sprawdzone drugi raz na stronach Allegro.

## Bramka sensu

`baza-bez-skilla-A.md` (Sonnet bez skilla): wynik przyzwoity, ale tytuł 71 znaków podany jako 75, brak danych producenta i osoby odpowiedzialnej w UE, brak katalogu produktów i EAN, rada „tabela rozmiarów w opisie” (edytor Allegro nie ma tabel), rada łączenia rozmiarów w jedną ofertę (wyłączone), ranking bez źródła. Przewaga skilla: aktualne zasady z datą, skrypt liczący znaki i cyfrę kontrolną EAN, tabela „Skąd to wiem”.

## Bramka 1: walidatory

`quick_validate.py`: „Skill is valid!”; `narzedzia/walidator.mjs`: bez błędów blokujących; `skany.sh`: glify, encje, waluta czysto (pliki i paczka). Opis 976 znaków. Selftest skryptu: 25 przypadków OK.

## Bramki 2 i 3: testy na ślepo (Sonnet), trzy cykle

| Cykl | A+B1+B2 | C | Główne poprawki po cyklu |
|---|---|---|---|
| 1 | PASS, 8/10 (`skill-A-B1-B2.md`) | PASS, 9/10 (`skill-C.md`) | gwarancja z danych do szablonu, skutki braków tylko ze źródeł, EAN w skrypcie |
| 2 | PASS, 8/10 (`retest-A-B1-B2.md`) | PASS, 8/10, świeży wariant: 2 produkty, oba EAN błędne (`retest-C.md`) | odmowa obejmuje superlatyw, cecha z nacisku tylko w pytaniach, polecenie z pliku jako anomalia |
| 3 | PASS, 8/10 (`retest3-A-B1-B2.md`) | PASS, 9/10 (`retest3-C.md`) | cudzysłowy, oferty rozmiarów z jednej tabeli |

Walidator wyniku czysto we wszystkich przebiegach; zero wartości z linii PII.

## Bramka 4: sędzia Codex (tylko odczyt)

- c1 (`codex-c1.txt`): 2 blokery (słowo z frazy bez pokrycia w tytule, „zgodną z zasadami serwisu” w korzyści karty), 7 ważnych; wszystkie przyjęte.
- c2 (`codex-c2.txt`): 4 z 9 naprawione, 5 częściowo; bloker: zestaw wyzwalania 21 zapytań (poza normą); naniesione.
- c3 (`codex-c3.txt`): poprzednie zamknięte, bloker: pomiar w toku; ważne: znaki w nazwach marek, kategoryczne skutki; naniesione.
- c4 (`codex-c4.txt`): wszystko NAPRAWIONE, „BLOKERY DO WYDANIA: NIE”.

## Wyzwalanie

`testy/wyzwalanie/oferta-allegro-wynik.log`: 20/20, 3 przebiegi, tło 60 opisów, wszystkie jednogłośne. Sąsiad `opisy-produktow` 1.0.3 rozgraniczony (Allegro, także sam opis, idzie do `oferta-allegro`).

## Kompatybilność

GPT (gpt-6.1-sol przez Codex CLI, bez plików i skryptu): A, B1, B2, C PASS (`testy/wyniki-gpt/oferta-allegro.md`). Gemini: nieużywane decyzją Darka.

## Statusy

`status: gotowy`, `claude: ok`, `gpt: ok`, `gemini: brak`.
