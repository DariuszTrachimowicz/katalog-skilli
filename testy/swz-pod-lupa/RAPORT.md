# swz-pod-lupa: raport bramek QA (wydanie 1.0.0, 15 listopada 2026)

Skill darmowy, kategoria Prawo (zamówienia publiczne), więc obowiązkowy panel eskalacji (Codex w czterech rolach w cyklu 1, potem sędzia zbiorczy w cyklach 2 i 3). Scenariusze: `testy/wyniki-gemini/scenariusze/swz-pod-lupa.md` (A, B1, B2, B3, C, D). Wiedza: tekst jednolity PZP (Dz.U. 2026 poz. 793, brzmienie z 28.07.2026 z wbudowanych aktów skilla sprawy-prawne-w-firmie), metoda liczenia terminu na pytania z wyjaśnień UZP, rejestr źródeł w `skille/swz-pod-lupa/references/swz.md`.

## Bramka sensu

`baza-bez-skilla-A.md`: model bez skilla orzekł „samodzielnie nie spełniacie warunku”, napisał „zapis jest legalny”, błędnie uznał, że umowa na 12 miesięcy nie wymaga waloryzacji (wymóg od ponad 6 miesięcy), pominął termin odwołania wobec ogłoszenia i SWZ, termin na pytania podał bez zastrzeżeń. Przewaga skilla: kalendarz skryptem, granice, zestawienie zamiast werdyktu.

## Walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów; `skany.sh`: czysto. Opis 971 znaków. Selftest `scripts/kalendarz_swz.py`: OK (metoda UZP, święta z Wielkanocą i Wigilią, przedłużenie, pilność, osobne odwołania, sobota, związanie 30 i 31 dni, wadium bez zaokrąglania, złe dane z kodem 2).

## Testy na ślepo (Sonnet)

| Cykl | A+B | C | D |
|---|---|---|---|
| 1 | PASS 8/10 (`skill-A-B1-B2.md`) | PASS 8/10 (`skill-C.md`) | - |
| 2 | PASS 8/10 z B3 (`retest-A-B.md`) | PASS 8/10 (`retest-C.md`) | - |
| 3 | - | - | PASS 8/10 (`skill-D.md`) |

Walidator wyniku czysto (w `skill-C.md` z cyklu 1 alarm dotyczył przepisanej wiadomości użytkownika, nie odpowiedzi).

## Panel i sędzia Codex

- c1 (4 role): granice 1 bloker, ekspert 3 blokery i 11 ważnych, język 1 bloker i 4 ważne, behawior 1 bloker i 1 ważne. Wszystkie przyjęte (zakaz zapisów umowy i list wykreśleń, pilność a skrócony termin, przedłużenie a pytania, osobne odwołania, metoda UZP, termin ustawowy i zalecany, konsorcjum, art. 246, umowa o pracę, platforma i wizja, rejestr, żargon karty, dane skrajne).
- c2: 17 naprawionych, 7 częściowo, BLOKERY NIE; 8 ważnych naniesionych (art. 246, konsorcjum, wadium w sobotę, kwoty, rejestr, dzień tygodnia, scenariusze, sąsiad).
- c3: BLOKERY NIE; drobne naniesione (zasoby tylko przy robotach i usługach, rejestr bez jednokrotności, test precyzji, asercja D).

## Terytorium i wyzwalanie

Sąsiedzi: `sprawy-prawne-w-firmie` 1.6.4 (kopia skilla i wiersz w mapie spraw), `czerwone-flagi-w-umowie` 1.0.9 (projekt umowy z przetargu oddaje nowemu skillowi, opis 998 znaków). Wyzwalanie: c1 18/20, c2 17/20, c3 19/20 (rozjazdy tylko u sąsiadów), końcowy przebieg 20/20 (3 powtórzenia, pełne tło 63 opisów) w `testy/wyzwalanie/swz-pod-lupa-wynik.log`.

## Kompatybilność

GPT: A, B1, B2, B3, C, D PASS (`testy/wyniki-gpt/swz-pod-lupa.md`). Gemini: nieużywane.

## Statusy

`status: gotowy`, `claude: ok`, `gpt: ok`, `gemini: brak`.
