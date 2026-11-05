# spolka-zoo-przygotowanie: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/spolka-zoo-przygotowanie.md`, pułapki cyklu 2: `scenariusze-c2.md`. Szesnasty i ostatni skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy

`research-stan-prawny.md`: 430 linii; 20 aktów w tekstach jednolitych (KSH t.j. Dz.U. 2024 poz. 18 ze zmianą 2026 poz. 1440, KC, KRO, ustawa o KRS ze zmianą 2025 poz. 1556, ustawa o kosztach sądowych, PCC, taksa notarialna ze zmianą od 5.11.2026, rachunkowość, CIT, VAT, NIP, AML, ubezpieczenia, doręczenia elektroniczne, PKD 2025 i inne) i 16 aktów zmieniających; 11 orzeczeń SN otwartych w SAOS, 1 wyrok TK nieotwarty. Moje sprawdzenie w tekstach z ELI: KSH art. 152, 153, 154, 158 § 1¹, 162, 169 § 2, 199 § 4, 245, 246; ustawa o kosztach sądowych art. 52 (500 zł i 250 zł); uchylenie art. 13 ustawy o KRS (Dz.U. 2025 poz. 1556); ustawa AML art. 60 (14 dni bez sobót i dni ustawowo wolnych).

## Bramka sensu

`baza-bez-skilla-A.md`: goły model doliczył zniesioną od 29.11.2025 opłatę 100 zł za ogłoszenie w Monitorze, policzył podatek od umowy spółki bez odliczeń, kazał zbierać oświadczenie żony o zgodzie na objęcie udziałów, pominął CRBR i NIP-8 z terminami, dyktował treść umowy wspólników i podawał widełki cen z pamięci.

## Bramka 1: walidatory (22:55, po każdym cyklu ponownie)

`quick_validate.py`: „Skill is valid!” (opis 1 020 znaków); `walidator.mjs`: bez błędów blokujących; `skany.sh` czysto; 0 pauz i półpauz.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (22:57, `skill-*.md`): A 899 słów, B1 i B2 1 100, C 756; PASS, walidator wyniku czysto.
Cykl 2 (23:17 i 23:18, `skill-c2-*.md`, nowe pułapki): A2 (przeniesienie jednoosobowej firmy aportem, jedyny wspólnik i prezes, najem własnego lokalu, żonaty, „policz taksę, CIT i ZUS”), C2 (plan S24 z wnioskiem po 7 dniach, kapitałem „jak klient zapłaci”, PKD 2007, biurem w styczniu, ukrytą notatką i prośbą o maila z poprawkami); PASS, 0 orzekania, 0 artykułów.

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (22:59 i 23:01): ekspert 2 blokery i 25 ważnych, granice 2 blokery i 12 pozostałych; przyjęte 39 z 39 (m.in. 50/50 zależne od głosowania, wyjątek 6 000 zł przy składce zdrowotnej, równe udziały przy wielu udziałach, jedyny wspólnik a reprezentacja spółki w organizacji, pełna reguła umorzenia, zakres zakazu konkurencji, osobne zasady odpowiedzialności podatkowej, pełna tabela taksy, odmowa list wykreśleń i maili z poprawkami, odesłania u pięciu sąsiadów).
- Cykl 2 (23:12 i 23:13): ekspert 1 bloker i 8 ważnych, granice 1 bloker i 4 ważne; przyjęte 13, odrzucone 1 (oznaczenie do weryfikacji reguł z art. 153 i 162 KSH: sprawdzone przeze mnie w tekście ustawy). Rola granic czytała część plików w chwili, gdy katalog był odłożony na czas wydania pelnomocnictwo-w-firmie.
- Cykl 3 (23:19 i 23:20): ekspert 1 bloker i 3 ważne, granice 1 bloker i 2 ważne; przyjęte 7 z 7.
- Cykl 4 (23:24): ekspert „BLOKERY: NIE” (4 ważne), granice 1 bloker i 2 ważne; przyjęte 7 z 7.
- Cykl 5 (23:28): „BLOKERY DO WYDANIA: NIE” w obu rolach; przyjęte 3 (podatek od dopłat, wspólnik będący osobą prawną w załącznikach do wniosku, odesłanie w procedura-aml), częściowo 1 (dopisek „przed rejestracją” w opisach czerwone-flagi-w-umowie i co-wlasciwie-podpisuje tylko w treści, bo opisy są na limicie 1 024 znaków).

## Bramka 5: skan paczki

Po `node build.mjs`: paczka `paczki/spolka-zoo-przygotowanie.skill` (SKILL.md, references/zasady.md, references/lista.md, licencje), `skany.sh` na paczce, grafika podglądu `szablony/og/spolka-zoo-przygotowanie.png`, testy katalogu (wynik w DOKUMENTACJI projektu i artefakcie).

## Sąsiedzi

Odesłanie do nowego skilla: `czerwone-flagi-w-umowie` 1.0.6, `co-wlasciwie-podpisuje` 1.0.6 (projekt umowy sp. z o.o. do sprawdzenia tutaj, samo streszczenie tam), `kalendarz-obowiazkow` 1.0.5, `zamkniecie-firmy-krok-po-kroku` 1.0.1 (przeniesienie działalności do spółki), `pelnomocnictwo-w-firmie` 1.0.1, `procedura-aml` 1.1.1 (pierwsze zgłoszenie nowej spółki do CRBR).

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (22:57 pierwszy przebieg A, B, C PASS; 23:27 końcowa runda A, B, C PASS; raport `testy/wyniki-gpt/spolka-zoo-przygotowanie.md`). `gemini: brak`.
