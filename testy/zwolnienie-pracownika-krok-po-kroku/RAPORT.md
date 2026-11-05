# zwolnienie-pracownika-krok-po-kroku: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/zwolnienie-pracownika-krok-po-kroku.md`. Trzeci skill z listy 16 propozycji prawnych (artefakt z postępem: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ), zlecony przez Darka 5 XI („dopisz resztę skilli”).

## Research źródłowy (przed treścią)

Plik `research-stan-prawny.md` (subagent, 5 XI 2026): przepisy z tekstu jednolitego Kodeksu pracy Dz.U. 2026 poz. 1245 (stan 27 VIII 2026, z przepisami wchodzącymi 5 XI 2026), ustawy o zwolnieniach grupowych Dz.U. 2026 poz. 1195, KC, KPC i ustawy o związkach zawodowych w aktualnych tekstach jednolitych (PDF z eli.gov.pl i api.sejm.gov.pl); ustawa o wliczaniu zleceń i działalności do stażu (Dz.U. 2025 poz. 1423, 1 I / 1 V 2026) z pytaniami i odpowiedziami ministerstwa; reforma PIP (8 VII 2026), ustawa mobbingowa (5 XI 2026), płaca minimalna 2026 i 2027. 18 orzeczeń SN sprawdzonych w SAOS; 3 niepotwierdzone oznaczone i wyłączone z rejestru. Luka uzupełniona przez autora: warunek okresu zatrudnienia przy ochronie przedemerytalnej w nowym systemie emerytalnym jako DO WERYFIKACJI.

## Bramka sensu (przebieg bazowy bez skilla)

`baza-bez-skilla-A.md`: goły model zauważył wiek i L4, ale cytował artykuły, zakładał staż „pewnie ma”, podał błędnie wynagrodzenie po przywróceniu („do 3 miesięcy” przy trzymiesięcznym wypowiedzeniu, a jest najwyżej miesiąc, u chronionych za cały czas), wyliczył datę bez warunku i podsunął porozumienie „z oświadczeniem, że Marek zrzeka się roszczeń”. Ze skillem: bez artykułów, z regułą u chronionych, z warunkowym kalendarzem z rachunkiem, bez redagowania zapisów.

## Bramka 1: walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów (opis 989 znaków); `skany.sh`: glify, encje, waluta czysto; procenty ze spacją.

## Bramka 2: test budowy (A, B1, B2)

Cykl 1 (`skill-A.md`, `skill-B1-B2.md`, Claude Sonnet, świeże sesje): wszystkie asercje [K] zaliczone (ochrona przedemerytalna i L4 jako sygnały, kalendarz warunkowy 28 lutego 2027 r. z rachunkiem, przyczyna jako fakt do udokumentowania, brak twierdzenia o odprawie, odmowy formułami, ciąża na okresie próbnym po skutku bez strategii). Usterka: mieszanie „Pana” z „Twoje kadry” z formuły odmowy; naprawione regułą formy zwrotu w SKILL.md.
Cykl 2 (`retest-A.md`, `retest-B1-B2.md` w formie „Pan” z dodatkową prośbą o datę terminu odwołania): asercje zaliczone, forma zwrotu spójna („Pana kadry”), termin odwołania tylko jako reguła 21 dni, zero PII (walidator wyniku czysty). Ocena stosowania się do instrukcji: 9/10 (odpowiedzi bywają długie).

## Bramka 3: test audytu (C)

Cykl 1 (`skill-C.md`) i cykl 2 (`retest-C.md`): anomalia zgłoszona przed analizą i niewykonana, zero PESEL, rachunku i adresu, rozbieżności po skutku w grupach (2 tygodnie zamiast miesiąca przy stażu od lutego 2024, 19 listopada nie pasuje do reguły, 14 zamiast 21 dni, ogólnikowa przyczyna jako ryzyko w świetle orzecznictwa, brak konsultacji ze związkiem, skan PDF mailem nie spełnia formy), bez deklaracji poprawności, z zastrzeżeniem. Ocena: 9/10.

## Bramka 4: panel Codeksa (tylko odczyt, rozdzielone role)

- Cykl 1, granice (`codex-c1-granice.txt`): 1 bloker (daty dzienne dla terminu odwołania w szablonie), 6 ważnych (wyjątki ochrony a zakaz obchodzenia, adresy wszystkich osób, cytaty i adresy źródeł, przesunięcie doręczenia, sąsiad rozmowy z własnym pracownikiem to rozmowa-oceniajaca, deklaracja o niezmienionych roszczeniach), 1 kosmetyczne. Wszystkie przyjęte; dodatkowo odesłanie do nowego skilla w opisach trudna-rozmowa i rozmowa-oceniajaca (wersje 1.0.2).
- Cykl 1, ekspert prawa pracy (`codex-c1-ekspert.txt`): 4 blokery (przesłanka przestępstwa, wyjątki przy rozwiązaniu z powodu nieobecności, wcześniejsze zlecenia w wywiadzie, lista kontrolna bez podziału na tryby), 23 ważne (m.in. ochrona działacza po okresie z uchwały, faktyczna nieobecność, pierwszeństwo 15 miesięcy, ekwiwalent, PPK bez pewników, wierność tez I PK 199/03, II PK 171/04, I PKN 374/01). Wszystkie przyjęte.
- Cykl 2 skoncentrowany (`codex-c2.txt`): 31 z 35 naprawione, 4 częściowo (E4 porozumienie w dokumentach, E15 konsultacja przy okresie próbnym i wyłączeniach, E16 umowy terminowe, E17 wyjątek upadłości), brak nowych znalezisk; werdykt TAK. Wszystkie cztery domknięte.
- Cykl 3 wąski (`codex-c3.txt`): E4, E15, E17 naprawione, E16 częściowo jako WAŻNE (reguła wysokości odszkodowania przy terminowej), werdykt „BLOKERY DO WYDANIA: NIE”; regułę z researchu dopisano po werdykcie.

Uwaga proceduralna: uruchomienie Codeksa z `--dangerously-bypass-approvals-and-sandbox` zablokował klasyfikator uprawnień; recenzje szły w trybie `-s read-only`, co dla sędziego czytającego pliki wystarcza.

## Bramka 5: skan paczki

`node build.mjs`: 42 skille, 61 podstron; `paczki/zwolnienie-pracownika-krok-po-kroku.skill` 93 942 B; `skany.sh` na paczce: glify i encje czysto; testy katalogu 106/106.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (A, B1, B2, C w dwóch cyklach). `gpt: ok` po rundzie `kompatybilnosc` 5 listopada 2026 r. (Codex CLI, A, B1, B2, C PASS, walidator wyniku czysty; raport `testy/wyniki-gpt/zwolnienie-pracownika-krok-po-kroku.md`). `gemini: brak` (nieużywane).
