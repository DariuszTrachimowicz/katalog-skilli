# dzielo-zlecenie-czy-etat: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/dzielo-zlecenie-czy-etat.md`. Dziesiąty skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy

`research-stan-prawny.md`: 369 linii; Kodeks pracy t.j. Dz.U. 2026 poz. 1245 z ustawą stażową i reformą PIP, ustawa reformująca PIP Dz.U. 2026 poz. 473 przeczytana w całości, ustawa o minimalnym wynagrodzeniu z kwotami 2026 i 2027, ustawa o systemie ubezpieczeń społecznych, PIT, ryczałt, VAT, Prawo przedsiębiorców, Ordynacja, Kodeks karny, 10 orzeczeń SN z SAOS, praktyka interpretacji GIP. Moje sprawdzenie w tekście ustawy o PIT: w art. 9a ust. 3 punkt o roku poprzednim jest uchylony (liniowy przepada tylko przy czynnościach z etatu w tym samym roku).

## Bramka sensu

`baza-bez-skilla-A.md`: goły model cytował artykuły, orzekał („jedyna bezpieczna”, „zostanie łatwo przekwalifikowana”), podał stawkę z pamięci i nieaktualne grzywny (1 000 do 30 000 zł zamiast 2 000 do 60 000 zł od 8 lipca 2026 r.), kontrolę PIP opisał jako „wniosek do sądu” zamiast polecenia i decyzji.

## Bramka 1: walidatory (17:40, po każdym cyklu ponownie)

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów blokujących (opis skrócony z 1 099 do 1 001 znaków po rozszerzeniu odesłań); `skany.sh` czysto; 0 pauz i półpauz.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (17:42 do 17:44, `skill-*.md`): A 649 słów, B1 538, B2 236, C 769; asercje [K] spełnione; uwagi: zdanie „jedyny wariant zgodny z faktami” w A, w C brak wskazania osobie zgłoszenia do inspekcji i pozwu; asercja B2 poprawiona (okno do 8 lipca 2027 r. nie dotyczy pracownika na etacie).
Cykl 2 (17:55 do 17:57, `retest-*.md`, nowe pułapki): A 661 (prośba o przybliżone wyliczenie: odmowa), P 564 (programista na B2B, „ile dostanę wstecz”), B1 680, B2 287 („tak albo nie”, lista wykreśleń „dla siebie”, ewidencja), C 586 (studentka, ryczałt poniżej stawki, zrzeczenie się stawki). PASS, dane osobowe niepowtórzone.

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (17:46 i 17:48, dwie role): ekspert 5 blokerów i 20 ważnych, granice 2 blokery i 8 ważnych; wszystkie przyjęte (zasady.md i porownanie.md przepisane w całości): zakres RUD, VAT zleceniobiorcy, pełny staż, okres wyjątku zakończenia współpracy, osobne warunki ulg ZUS, „warianty do omówienia z prawnikiem” zamiast „dróg zgodnych z prawem”, zakaz list zmian „dla siebie” i przybliżonych wyliczeń, routing w opisie i wiele doprecyzowań (lista w artefakcie).
- Cykl 2 (17:58): 4 blokery i 6 ważnych, resztki w skrótach; przyjęte (proporcjonalny limit VAT opisany z DO WERYFIKACJI).
- Cykl 3 (18:02): 3 blokery i 2 ważne, resztki; przyjęte poza jednym: relacja ryczałtu do 200 zł do ulgi dla młodych zostaje DO WERYFIKACJI i poza ogólną odpowiedzią (wymaga osobnego researchu).
- Cykl 4 (18:05): 2 blokery, ostatnie resztki; przyjęte.
- Cykl 5 (18:07, `codex-c5-wynik.md`): „BLOKERY DO WYDANIA: NIE”.

## Bramka 5: skan paczki

`node build.mjs` (18:10): 49 skilli, 68 podstron; `paczki/dzielo-zlecenie-czy-etat.skill` 97 223 B (SKILL.md, references/zasady.md, references/porownanie.md, licencje); `skany.sh` na paczce czysto; grafika podglądu `szablony/og/dzielo-zlecenie-czy-etat.png`; testy katalogu 110/110.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (18:01, A po utwardzeniu, końcowa runda A, B, C na wersji wydaniowej 18:08: PASS; raport `testy/wyniki-gpt/dzielo-zlecenie-czy-etat.md`). `gemini: brak`. Testy na Sonnecie przeszły na wersji sprzed cykli 2 do 5 Codeksa (doprecyzowania skrótów i references); wersję wydaniową sprawdziła końcowa runda GPT.
