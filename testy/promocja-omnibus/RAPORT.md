# promocja-omnibus: raport bramek QA (wydanie 1.0.0, 15 listopada 2026)

Skill darmowy, kategoria Prawo, więc panel eskalacji obowiązkowy (role rozdzielone, runda behawioralna). Scenariusze: `testy/wyniki-gemini/scenariusze/promocja-omnibus.md`. Stan prawny: research 15.11.2026, 12 źródeł w `skille/promocja-omnibus/references/zasady.md` (ustawa o informowaniu o cenach, t.j. Dz.U. 2023 poz. 168, bez zmian w ELI; rozporządzenie o uwidacznianiu cen; dyrektywa i wytyczne KE; TSUE C-330/23; wyjaśnienia Prezesa UOKiK; decyzja DIH-3.154.2025; komunikaty UOKiK 2025-2026; kontrole IH za 2025).

## Bramka sensu

`baza-bez-skilla-A.md`: rachunek dobry, ale zły akt („ustawa o prawach konsumenta”), orzekanie („klasyczne naruszenie”, „nie przejdzie”) i gotowy baner. Model bazowy wyłapał też błędny dzień tygodnia w scenariuszu (poprawiony).

## Walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów; `skany.sh`: czysto (pliki i paczka). Opis 1013 znaków. Selftest kalkulatora `scripts/obnizka.py`: 28 przypadków OK. Kopia parasola `sprawy-prawne-w-firmie` odświeżona, cytowania 3009/0.

## Testy na ślepo (Sonnet)

| Cykl | A+B1+B2 | C | Uwagi |
|---|---|---|---|
| 1 | PASS 8/10 (`skill-A-B1-B2.md`) | PASS 8/10 (`skill-C.md`) | niepełna historia uznana za „krótko w sprzedaży”, formuła odmowy bez prośby |
| 2 | PASS 8/10 (`retest-A-B1-B2.md`) | PASS 8/10, wariant salonów kosmetycznych (`retest-C.md`) | „nie spełnia wymogu” (zakaz dopisany po tym przebiegu) |
| 3, wersja końcowa | PASS 8/10 (`retest3-A-B1-B2.md`) | PASS 8/10, właściwy scenariusz C (`retest3-C.md`) | bez orzekania, bez dopisanych danych |

## Panel Codeksa

- c1, cztery role: granice 1 bloker, ekspert 2, język 0, behawioralna 1 (`codex-c1-*.txt`): tolerancja procentu w skrypcie, dwie zmiany ceny jednego dnia, niepełna historia w scenariuszu, ścieżka towaru szybko psującego się; ok. 15 ważnych. Wszystko przyjęte.
- c2 (`codex-c2.txt`): 1 bloker (retest sprzed ostatniej poprawki), walidacja procentu i dat. Naniesione.
- c3 (`codex-c3-przerwany.txt`, ukończony; `codex-c3.txt`): wszystko naprawione, „BLOKERY DO WYDANIA: NIE”; ostatnia uwaga (wyjątki w FAQ o newsletterze) naniesiona przed wydaniem.

## Wyzwalanie

20/20 w cyklu 1 i po zmianie opisu (`testy/wyzwalanie/promocja-omnibus-wynik.log`), 3 przebiegi, pełne tło, w tym decyzja UOKiK i Inspekcji Handlowej u właściwych skilli.

## Kompatybilność

GPT: A, B1, B2, C PASS (`testy/wyniki-gpt/promocja-omnibus.md`). Gemini: nieużywane.

## Terytorium

`regulamin-sklepu-checklista` 1.1.1 odsyła komunikat o obniżce; `sprawy-prawne-w-firmie` 1.6.3 ma kopię skilla i wiersz w mapie spraw.

## Statusy

`status: gotowy`, `claude: ok`, `gpt: ok`, `gemini: brak`.
