# zamkniecie-firmy-krok-po-kroku: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/zamkniecie-firmy-krok-po-kroku.md`. Dziewiąty skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy (16:26)

`research-stan-prawny.md`: 526 linii, 23 akty w tekstach jednolitych (Prawo przedsiębiorców, ustawa o CEIDG ze zmianą od 14.10.2026, ubezpieczenia społeczne, świadczenia zdrowotne, VAT, PIT, ryczałt, rozporządzenia o KPiR i kasach, Ordynacja, Kodeks pracy, zwolnienia grupowe, archiwa, FUS, Prawo upadłościowe, zarząd sukcesyjny, e-Doręczenia, KC, KSH, PPK, odpady), praktyka biznes.gov.pl, podatki.gov.pl, zus.pl, wyrok WSA I SA/Go 349/24. Moje sprawdzenie w tekstach ustaw (pdftotext z ELI): brak terminu VAT-Z w ustawie o VAT, 7 dni w ustawie o CEIDG tylko dla zmiany wpisu, informacja o spisie z ostatnią deklaracją, PIT-4R w dniu zaprzestania, opodatkowanie przekazania towaru na cele osobiste, art. 42g ustawy o PIT obejmuje PIT-11 pracowników i zleceniobiorców, przesunięcie terminu z soboty i dnia wolnego w Ordynacji.

## Bramka sensu (16:00)

`baza-bez-skilla-A.md`: goły model podał numer artykułu, daty jako pewniki („do 7 stycznia 2027”), kazał opłacić składki za grudzień „do końca 2026”, pominął objęcie spisem środków trwałych i wykaz majątku, PIT-11 przesunął na luty.

## Bramka 1: walidatory (16:33, po każdym cyklu ponownie)

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów blokujących (opis 933 znaki); `skany.sh`: glify, encje, waluta czysto; 0 pauz i półpauz w czterech plikach.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (16:35 do 16:36, `skill-*.md`): A 733 słowa, B1 592, B2 505, C 754, wszystkie asercje [K] spełnione; walidator wyniku na samych wyjściach czysto.
Cykl 2 (16:52 do 16:53, `retest-*.md`, nowe pułapki): A 740, nowy P (fryzjerka, zawieszenie od 1 grudnia przy zleceniobiorcy, ulga na start po pół roku) 522, B1 532, B2 432 („tak albo nie”, spis do wypełnienia, spółka cywilna bez wspólnika), C 1 039 (VAT kwartalny, sprzedaż sklepu bratu z pracownikiem). PASS; uwaga: C za długie, dopisany limit trybu 3.

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (16:41 i 16:46, dwie role): ekspert 5 blokerów i 22 ważne, granice 2 blokery i 12 ważnych. Przyjęte wszystkie poza jednym blokerem: zakres przyspieszonego terminu PIT-11 (odrzucony, art. 42g ust. 1 ustawy o PIT wymienia wprost informacje z art. 39 ust. 1 i 3, art. 35 i 42). Najważniejsze przyjęte: zdrowotna przy zawieszeniu od pierwszego dnia miesiąca, pełny wyjątek urlopowy, bez „albo restrukturyzacji”, kryterium prawa do odliczenia, reguła przesunięcia terminów, karta podatkowa, VAT i ryczałt kwartalny, kasowy PIT i VAT, wyjątki reguły 6 lat, KSeF, wyjątki JPK w zawieszeniu, ulgi po 60 miesiącach, spółka cywilna, ekwiwalent i przejście pracowników, przechowywanie, przedawnienie, upadłość konsumencka, RZS-R, odmowa przy „potwierdź kompletność”, dosłowność cytatów, opis i karta bez nadmiernych obietnic.
- Cykl 2 (16:55, `codex-c2-wynik.md`): 1 bloker i 9 ważnych, wszystkie niedociągnięcia poprawek cyklu 1, przyjęte.
- Cykl 3 (17:00, `codex-c3-wynik.md`): 1 bloker i 3 ważne, resztki w skrótach, przyjęte.
- Cykl 4 (17:05, `codex-c4-wynik.md`): 1 bloker i 1 ważne, ostatnie resztki sformułowania o zdrowotnej i karcie; sformułowanie ujednolicone w całym skillu.
- Cykl 5 (17:07, `codex-c5-wynik.md`): „BLOKERY DO WYDANIA: NIE”.

## Bramka 5: skan paczki

`node build.mjs` (17:09): 48 skilli, 67 podstron; `paczki/zamkniecie-firmy-krok-po-kroku.skill` 102 479 B (SKILL.md, references/zasady.md, references/plan.md, LICENSE.txt, LICENCJA.txt); `skany.sh` na paczce czysto; grafika podglądu `szablony/og/zamkniecie-firmy-krok-po-kroku.png`; testy katalogu 109/109.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (16:58, C po utwardzeniu, końcowa runda A, B, C 17:03: PASS; raport `testy/wyniki-gpt/zamkniecie-firmy-krok-po-kroku.md`). `gemini: brak` (nieużywane). Testy na Sonnecie przeszły na wersji sprzed cykli 2 do 5 Codeksa (późniejsze zmiany doprecyzowują references i trzy zdania SKILL.md).
