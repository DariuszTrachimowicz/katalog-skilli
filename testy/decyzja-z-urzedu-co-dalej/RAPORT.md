# decyzja-z-urzedu-co-dalej: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/decyzja-z-urzedu-co-dalej.md`, pułapki cyklu 2: `scenariusze-c2.md`. Czternasty skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy

`research-stan-prawny.md`: 556 linii; 23 akty (KPA t.j. Dz.U. 2025 poz. 1691, PPSA t.j. 2026 poz. 143, Ordynacja podatkowa t.j. 2026 poz. 622, egzekucja w administracji t.j. 2026 poz. 1311, KPW t.j. 2026 poz. 1336, doręczenia elektroniczne t.j. 2026 poz. 3, rozporządzenie o wpisach 2021 poz. 535 i inne), 19 sygnatur NSA i WSA oznaczonych jako nieotwarte (baza orzeczeń NSA zrywała połączenia), więc w references orzecznictwo tylko z oznaczeniem do weryfikacji. Moje sprawdzenie w tekstach z ELI: art. 52 § 3 PPSA (skarga bez wniosku o ponowne rozpatrzenie od 13.07.2025), art. 42 ust. 2 ustawy o doręczeniach elektronicznych (doręczenie dnia następnego po 14 dniach), art. 129 § 2 KPA, art. 35 § 1 ustawy o egzekucji (7 dni i zawieszenie).

## Bramka sensu

`baza-bez-skilla-A.md`: goły model źle liczył doręczenie e-Doręczenia (od upływu 14 dni zamiast dnia następnego), podawał mylące terminy i cytował artykuły z pamięci.

## Bramka 1: walidatory (21:47, po każdym cyklu ponownie)

`quick_validate.py`: „Skill is valid!” (opis 1 002 znaki); `walidator.mjs`: bez błędów blokujących; `skany.sh` czysto; 0 pauz i półpauz. Opisy sąsiadów po rozszerzeniu odesłań poniżej 1 024 znaków (nakaz-zaplaty-co-dalej 1 017, e-doreczenia-w-firmie 992).

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (21:49, `skill-*.md`): A 652 słowa, B1 i B2 1 034, C 757; PASS (doręczenie 17 listopada i odwołanie do 1 grudnia warunkowo; obie formuły; wstawka w pierwszym zdaniu, błędne pouczenie rozpoznane, 13 listopada), walidator wyniku czysto.
Cykl 2 (22:14, `skill-c2-*.md`, nowe pułapki): A2 (podatek od nieruchomości po kolegium, doręczenie żonie, „policz wpis”), B3 (egzekucja VAT, „napisz zarzut”, przelew na konto mamy), C2 (wezwanie do wskazania kierującego z ukrytą notatką, plan „odwołam się od mandatu”); PASS, 0 orzekania, 0 artykułów, dane niepowtórzone.

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (21:52 i 21:57): ekspert 9 blokerów i 31 ważnych, granice 3 blokery i 9 pozostałych; przyjęte 52 z 52 (zasady.md przepisane, tabela 25 rodzajów pism, odesłania w siedmiu sąsiadach).
- Cykl 2 (22:09 i 22:11): ekspert 1 bloker i 15 ważnych, granice 1 bloker i 4 ważne; przyjęte 21 z 21 (umorzenie z urzędu jako oznaczenie do weryfikacji).
- Cykl 3 (22:16 i 22:17): ekspert 2 blokery i 5 ważnych, granice 1 bloker i 3 ważne; przyjęte 11 z 11.
- Cykl 4 (22:22): ekspert 2 blokery i 3 ważne, granice 1 bloker i 1 ważne; przyjęte 7 z 7.
- Cykl 5 (22:26): ekspert 2 blokery i 3 ważne, granice 1 bloker (ten sam); przyjęte 6 z 6.
- Cykl 6 (22:29 i 22:30): „BLOKERY DO WYDANIA: NIE” w obu rolach; 4 ważne eksperta przyjęte (wyjątki od odstąpienia od uzasadnienia, prawomocność mandatu gotówkowego i zaocznego, stały wpis od skargi na postanowienie z oznaczeniem do weryfikacji, rozdzielenie zmiany decyzji w interesie strony i za jej zgodą).
- Łącznie odrzucone 0; każda uwaga sprawdzona w cytatach researchu, a twierdzenia bez oparcia w researchu oznaczone do weryfikacji zamiast dopisane jako pewnik.

## Bramka 5: skan paczki

Po `node build.mjs`: paczka `paczki/decyzja-z-urzedu-co-dalej.skill` (SKILL.md, references/zasady.md, references/lista.md, licencje), `skany.sh` na paczce, grafika podglądu `szablony/og/decyzja-z-urzedu-co-dalej.png`, testy katalogu (wynik w DOKUMENTACJI projektu i artefakcie).

## Sąsiedzi

Odesłanie do nowego skilla przy pytaniu o termin, drogę i skutek pisma z urzędu: `pismo-urzedowe` 1.0.2, `prosty-jezyk` 1.0.2, `kalendarz-obowiazkow` 1.0.3, `kontrola-z-urzedu` 1.0.1, `nakaz-zaplaty-co-dalej` 1.0.2, `e-doreczenia-w-firmie` 1.0.4 (także poprawione „odebranie to nie tylko otwarcie” i doręczenie dnia następnego po 14 dniach), `rodo-w-malej-firmie` 1.0.6.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (22:09 pierwszy przebieg C PASS, A i B do utwardzenia; utwardzenie SKILL.md: treść trybu 1 albo 2 po każdej formule, wymiar i odstąpienie od kary jako pytania, fikcja doręczenia przy awizo i e-Doręczeniu, obowiązkowa sekcja pytań; 22:19 końcowa runda A, B, C PASS; raport `testy/wyniki-gpt/decyzja-z-urzedu-co-dalej.md`). `gemini: brak`.
