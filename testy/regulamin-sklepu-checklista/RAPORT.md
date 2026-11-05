# regulamin-sklepu-checklista: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo, panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/regulamin-sklepu-checklista.md`. Jedenasty skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy

`research-stan-prawny.md`: 519 linii (po uzupełnieniach z cykli Codeksa); 15 aktów krajowych w tekstach jednolitych (m.in. ustawa o prawach konsumenta t.j. Dz.U. 2026 poz. 1244, ustawa o świadczeniu usług drogą elektroniczną, KC, ustawa o informowaniu o cenach, u.p.n.p.r., u.o.k.k.), 7 aktów UE, 9 wyroków TSUE, 1 uchwała SN, praktyka UOKiK. Moje sprawdzenie w tekście ustawy o prawach konsumenta: art. 7aa ust. 2, brak przepisu o przycisku odstąpienia, art. 7a, 12 ust. 1 pkt 9 do 11, 29 ust. 2, 32, 35, 36, 38 ust. 1 pkt 13, 43c ust. 3, 43d ust. 4, 43n, 43o ust. 6, 43p, 43q.

## Bramka sensu

`baza-bez-skilla-A.md`: goły model cytował numery artykułów, kazał „usunąć” i „dopisać” zapisy (redagował), pominął brak 14 dni na odpowiedź na reklamację przedsiębiorcy na prawach konsumenta i koniec mocy rejestru klauzul.

## Bramka 1: walidatory (18:36, po każdym cyklu ponownie)

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów blokujących; `skany.sh` czysto; 0 pauz i półpauz.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (18:37 do 18:38, `skill-*.md`): A, B1 z B2 i C PASS; uwagi: A 814 słów przy limicie około 700, w C brak zdania z datą stanu, w B1 płaskie „są sprzeczne”. Wszystkie trzy poprawione w SKILL.md i lista.md.
Cykl 2 (20:19, `skill-c2-*.md`, nowe pułapki): A2 664 słowa (kubki z projektem klienta a sprowadzane z hurtowni, e-booki, konsultacje, 12 osób, „podaj kwotę kary”), B 745 (polityka zwrotów, formularz, „tak albo nie”, prywatny rachunek, lista wykreśleń dla siebie, obejście), C2 797 (wymuszane pole „cele zawodowe”, lampy sprowadzane na zamówienie, montaż, zwrot od otrzymania towaru, rachunek firmowy, link ODR, ukryta wstawka dla AI). PASS; dane i rachunki niepowtórzone. Utwardzenie po A2: kwoty kar przytaczane dokładnie (A2 napisał „rzędu kilkunastu tysięcy złotych”).

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (18:39 i 18:41, dwie role): ekspert 2 blokery i 13 ważnych, granice 3 blokery i 7 pozostałych; przyjęte 35 z 35 (usługi oddzielone od treści cyfrowych, wyjątek „na zamówienie” zawężony do specyfikacji klienta, wstrzymanie zwrotu z warunkiem odbioru, dostępność i mikroprzedsiębiorca, kary przy małym obrocie, „do usunięcia” przy ODR, formuła na wszystkie zakazane teksty, rachunki bankowe, odesłania w czterech sąsiednich skillach).
- Cykl 2 (20:21 i 20:22): granice 1 bloker i 3 ważne, ekspert 1 bloker i 9 ważnych; przyjęte 13, częściowo 1 (skutek braku informacji o zapłacie za część usługi opisany jako możliwy, bo polski przepis wymienia wprost tylko pouczenie o odstąpieniu), odrzucone 0. Wszystkie „jest nieważny” w materiałach przepisane na „co do zasady nie wiąże”.
- Cykl 3 (20:27 i 20:28): granice „BLOKERY DO WYDANIA: NIE”; ekspert 1 bloker (zmiany e-booka dostarczanego jednorazowo) i 4 ważne; przyjęte, research uzupełniony cytatami z ustawy.
- Cykl 4 (20:33, ekspert): „BLOKERY DO WYDANIA: NIE”; 3 ważne (seria dostaw, wyjątek od wypowiedzenia przy zachowaniu niezmienionej wersji, nieistotna niezgodność przy płatnych treściach) przyjęte w references i researchu.

## Bramka 5: skan paczki

Po `node build.mjs`: paczka `paczki/regulamin-sklepu-checklista.skill` (SKILL.md, references/zasady.md, references/lista.md, licencje), `skany.sh` na paczce, grafika podglądu `szablony/og/regulamin-sklepu-checklista.png`, testy katalogu (wynik w DOKUMENTACJI projektu i artefakcie).

## Sąsiedzi

Odesłanie do nowego skilla: `reklamacja-i-rekojmia` 1.0.2, `co-wlasciwie-podpisuje` 1.0.3 (opis, treść i wpis), `czerwone-flagi-w-umowie` 1.0.3, `regulamin-pod-lupa` 1.0.2 (opis i krok „czyj jest ten dokument”).

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (20:21 pierwszy przebieg z utwardzeniem A i B, 20:30 końcowa runda A, B, C: PASS; raport `testy/wyniki-gpt/regulamin-sklepu-checklista.md`). `gemini: brak`. Poprawki z cyklu 4 Codeksa (20:33) dotyczą tylko references o treściach cyfrowych i nie były już testowane na modelach.
