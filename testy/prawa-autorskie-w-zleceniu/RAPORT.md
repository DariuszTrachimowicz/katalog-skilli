# prawa-autorskie-w-zleceniu: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/prawa-autorskie-w-zleceniu.md`. Ósmy skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy (przed treścią, 14:15)

`research-stan-prawny.md`: 334 linie. Ustawa o prawie autorskim t.j. Dz.U. 2025 poz. 24 z nowelizacją od 20 września 2024 r. (po t.j. tylko zmiana o platformach od 6 listopada 2026 r., nie dotyczy umów), poprzedni t.j. do porównania brzmień, KC t.j. Dz.U. 2026 poz. 795, ustawa o informatyzacji (podpis zaufany), AI Act ze zmianą 2026/1744, 10 orzeczeń SN przeczytanych w SAOS, 4 wyroki TSUE w polskiej wersji. Ustalenia: w przepisie o utworze nie ma słowa „człowiek” (ludzkie autorstwo wynika z pojęcia twórcy i orzecznictwa); projektu przepisów o AI w prawie autorskim w Sejmie nie znaleziono. Kluczowe cytaty sprawdzone ręcznie w tekście ustawy (14:16).

## Bramka sensu (14:05)

`baza-bez-skilla-A.md`: goły model zacytował zły przepis o formie przeniesienia i zły ustęp o licencji niewyłącznej, orzekł „grafik nie ma racji” i wypisał elementy umowy przeniesienia do przygotowania.

## Bramka 1: walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów blokujących (opis 924 znaki); `skany.sh`: glify, encje, waluta czysto; 0 pauz i półpauz w czterech plikach.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (14:53 do 14:54, `skill-*.md`): A, B1/B2, C, wszystkie asercje [K] spełnione; 3 uwagi do utwardzenia: licencja z braku zapisu bez „co do zasady” (A), brak zakresu praw do programu (B1), wyliczenie grup pól zaraz po odmowie (B2). Poprawione w `SKILL.md`.
Cykl 2 (15:06, `retest-*.md`, nowe pułapki): A 529 słów, nowy P (fotografka, B2B i NDA, „ile warte są prawa”) 545, B1 550 z zakresem praw do programu, B2 559 (odmowa maila z listą wykreśleń, wspólnik nie podpisze bez umocowania), C 778 z umową zawierającą karę umowną (pominięta jako poza zakresem, odesłanie do czerwone-flagi-w-umowie), AI warunkowo, anonimowość jako prawo twórcy. PASS.

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (14:53 do 14:59, dwie role): ekspert 1 bloker i 15 ważnych, granice 2 blokery i 8 ważnych. Blokery: automatyczna „sprzeczność” przy oświadczeniu o AI; „sprzeczne z przepisami” i „nieważne” w poleceniach trybu 3. Przyjęte 24 ustalenia (m.in. anonimowość jako wykonanie prawa osobistego, nie każda zmiana jest opracowaniem, podstawy wizerunku, nowa technika a nieznane pole, wyjątki informacji o przychodach, architektura i wina twórcy przy braku rozpowszechniania, rozdzielenie dwóch podstaw odstąpienia, wyłączenia dla programów, uprawniony do roszczeń i do podpisu, I CSK 450/10 bez automatycznej licencji, grupy pól zamienione na pytania o korzystanie, rozszerzona formuła odmowy, „Typowe” i „nie widzę w tym tekście”, zakres trybu 3, portfolio a NDA, karta bez obietnicy rozstrzygnięcia, zgodność `format` zamiast `brak`). Odrzucone 1: brak podstawy dla warunków nieodpłatnej pomocy prawnej, bo art. 4 i 5 ustawy odczytano w researchu skilla nakaz-zaplaty-co-dalej (linie 20 i 208); źródło dopisane do rejestru.
- Cykl 2 (15:04 do 15:10, `codex-c2-wynik.md`): 1 bloker i 4 ważne, wszystkie niedociągnięcia poprawek; przyjęte (lista kontrolna bez kwalifikacji „nieważne”, rozdzielenie dwóch uprawnień informacyjnych, tabela zmian dla programów, podpis i roszczenia uprawnionego, „napięcie” przy AI warunkowo).
- Cykl 3 (15:13, `codex-c3-wynik.md`): „BLOKERY DO WYDANIA: NIE”, 2 ważne resztki poprawek, przyjęte.
- Cykl 4 (15:16, `codex-c4-wynik.md`): „BLOKERY DO WYDANIA: NIE”, zero ważnych; potwierdzone też dwa dopiski po rundzie GPT.

## Bramka 5: skan paczki

`node build.mjs` (15:18): 47 skilli, 66 podstron; `paczki/prawa-autorskie-w-zleceniu.skill` 105 595 B (SKILL.md, references/zasady.md, references/klauzula.md, LICENSE.txt, LICENCJA.txt); `skany.sh` na paczce czysto; grafika podglądu `szablony/og/prawa-autorskie-w-zleceniu.png` przebudowana po zmianie zdania korzyści; testy katalogu 108/108.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (15:12, utwardzenie B2 i zakaz linków, końcowa runda A, B, C na wersji wydaniowej 15:16: PASS; raport `testy/wyniki-gpt/prawa-autorskie-w-zleceniu.md`). `gemini: brak` (nieużywane). Testy na Claude Sonnet przeszły na wersji sprzed cykli 2 do 4 Codeksa (późniejsze zmiany doprecyzowują references i dwa zdania SKILL.md); wersję wydaniową sprawdziła końcowa runda GPT.
