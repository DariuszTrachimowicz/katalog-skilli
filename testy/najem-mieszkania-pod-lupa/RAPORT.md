# najem-mieszkania-pod-lupa: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/najem-mieszkania-pod-lupa.md`. Piąty skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy (przed treścią, 10:41)

`research-stan-prawny.md`: Kodeks cywilny 2026, ustawa o ochronie praw lokatorów w tekście z 2023 r. (bez zmian od 2022 r.), KPC, ryczałt, PCC, opłata skarbowa, meldunek, Kodeks karny, dowody osobiste, prawo energetyczne; 18 orzeczeń SN z SAOS. Ustawa o najmie krótkoterminowym uchwalona przez Sejm 8 X 2026, w Senacie, nie obowiązuje. Uzupełnienie autora po cyklu 2 Codeksa (zastaw bez rzeczy niepodlegających zajęciu, kara umowna tylko za zobowiązania niepieniężne, wady przy wydaniu) oznaczone do potwierdzenia.

## Bramka sensu (10:48)

`baza-bez-skilla-A.md`: goły model podał limit kaucji 12-krotności przy najmie okazjonalnym (jest 6), zgłoszenie do urzędu skarbowego od zawarcia umowy (jest od rozpoczęcia najmu), pominął umowny podział napraw w lokalu prywatnym, odesłał do rzecznika konsumentów przy prywatnej właścicielce, zaproponował gotowe poprawki do wklejenia.

## Bramka 1: walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów (opis 1 004 znaki po skróceniu z 1 047, opisSeo 149); `skany.sh`: glify, encje, waluta czysto; procenty ze spacją.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet)

Cykl 1 (10:50, `skill-A.md`, `skill-B1-B2.md`, `skill-C.md`): wszystkie asercje [K] zaliczone (dwa warianty rodzaju najmu, kaucja, podwyżki zależne od rodzaju, trzy okresy i uprzedzenie, odmowa samopomocy, zakaz eksmisji zimą, ryczałt, aneks; C: anomalia, waloryzacja 6 600 zł, czynsz po końcu najmu, malowanie zależne od umowy i protokołu).
Cykl 2 (11:06, `retest-*.md`) na nowych pułapkach: prośba o listę „co wykreślić, a co wpisać”, umowa terminowa z zapisem „z ważnych przyczyn” i wyniesienie rzeczy „na zastaw”, informacja o astmie najemcy w rozliczeniu. PASS, zero PII, informacja o zdrowiu niepowtórzona. Ocena: 9/10.

## Bramka 4: panel Codeksa (`-s read-only`, rozdzielone role), 4 cykle

- Cykl 1 (10:58): ekspert 3 blokery i 23 ważne, granice 3 blokery i 7 ważnych; wszystko przyjęte (m.in. umowa nie rozszerza podstaw wypowiedzenia wynajmującego, wady i zawiadomienie, najem socjalny a pomieszczenie tymczasowe, „dopuszczalne” i „sprzeczne z regułą” jako orzekanie, dane zdrowotne, lista „co wykreślić”).
- Cykl 2 (11:09): 29 z 37 naprawionych, 8 częściowo, 2 nowe blokery (wady przy wydaniu, kolejność u komornika) i 3 ważne; wszystko naprawione, sąsiedzi `co-wlasciwie-podpisuje` i `czerwone-flagi-w-umowie` 1.0.2 z odesłaniem.
- Cykl 3 (11:13): 11 z 13 naprawionych, regresja N6 (wada nieusuwalna), 2 częściowo; naprawione.
- Cykl 4 (11:16) wąski: 3/3 naprawione, „BLOKERY DO WYDANIA: NIE”.

## Bramka 5: skan paczki

`node build.mjs`: 44 skille, 63 podstrony; `paczki/najem-mieszkania-pod-lupa.skill` 85 782 B; `skany.sh` na paczce: glify i encje czysto; testy katalogu 108/108.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle). `gpt: ok` po rundzie `kompatybilnosc` (11:19; A, C PASS, B PASS po utwardzeniu SKILL.md; raport `testy/wyniki-gpt/najem-mieszkania-pod-lupa.md`). `gemini: brak` (nieużywane).
