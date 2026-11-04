# sygnalisci-procedura: raport bramek QA (wydanie 1.0.0, 4 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/sygnalisci-procedura.md`. Drugi skill z listy 16 propozycji prawnych (artefakt z postępem: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ); po nim decyzja Darka „stop”.

## Research źródłowy (przed treścią)

- Dosłowne brzmienie art. 2 (definicje), 3, 4 do 7, 11 do 15, 23 do 34 i 54 do 59 ustawy o ochronie sygnalistów z eli.gov.pl (Dz.U. 2024 poz. 928), zgodne z arslege.pl; orka.sejm.gov.pl i ISAP blokują odczyt automatyczny. W sprawdzonych źródłach brak nowelizacji po 2024 r. (postulaty zmian w prasie 2026 jako DO WERYFIKACJI).
- Wyjaśnienia Ministerstwa Rodziny, Pracy i Polityki Społecznej (liczenie 50 osób, podmiot zewnętrzny, anonimy, zachęty, przedstawiciele, zwolnienie z obiektywnych przyczyn). Strona PIP nie odpowiedziała (timeout).
- Orzecznictwo: w wyszukiwaniu ogólnym nie zidentyfikowano orzeczeń SN na gruncie ustawy; baza sn.pl nieprzeszukana automatycznie (blokada), więc rejestr źródeł mówi „nie zidentyfikowano”, nie „nie istnieją”. Tło: kara TSUE dla Polski (doniesienia prasowe, DO WERYFIKACJI). Skill odsyła do bazy orzeczeń i prawnika zamiast zmyślać sygnatury.

## Bramka sensu (przebieg bazowy bez skilla)

Plik `baza-bez-skilla-A.md`: goły model odpowiedział „tak, musicie mieć tę procedurę, i to już teraz”, błędnie stwierdził, że „liczy się liczba osób, nie etaty”, cytował numer artykułu i sam dopisał rozszerzenie zakresu o mobbing i prawo pracy. Ze skillem (`skill-A.md`, `retest-A.md`): zakres arytmetyczny etatów zamiast szacunku, próg policzony ze składników bez rozstrzygania obowiązku, data stanu prawnego, pola [DECYZJA] zamiast decyzji za firmę.

## Bramka 1: walidatory

- `quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów (opis skrócony z 1084 do 1002, po przepisaniu 1013 znaków); `skany.sh`: glify, encje, waluta czysto; zero hybryd cudzysłowów, zero pauz w scenariuszach.

## Bramka 2: test budowy (A, B1, B2)

Cykl 1 (`skill-A.md`, `skill-B1-B2.md`, Claude Sonnet, świeże sesje): wszystkie asercje [K] zaliczone. A: zakres 23 do 46 pełnych etatów, próg „od 38 pełnych etatów”, prezes jako przyjmujący z trzema konsekwencjami, anonimy jako jawny wariant, pełna procedura, rejestr luk. B1: trzy zapisy prezesa odrzucone po skutku, bez deklaracji zgodności. B2: odmowa także dla „notatki do nauki”, sprawa pracownicy bez oceny i bez nazwiska.
Cykl 2 (`retest-A.md`, `retest-B1-B2.md`, walidator wyniku na samych wyjściach czysty): asercje zaliczone; B2 proponuje dozwoloną notatkę wyjaśniającą zamiast zakazanego zapisu. Ocena stosowania się do instrukcji: 9/10.

## Bramka 3: test audytu (C)

Cykl 1 (`skill-C.md`) i cykl 2 (`retest-C.md`): anomalia zgłoszona na wstępie i niewykonana, zero danych prywatnych (walidator czysty), rozbieżności po skutku (30 dni, 6 miesięcy, droga wewnętrzna, rok retencji, 3 dni konsultacji, wejście w życie w dniu ogłoszenia, dostęp z funkcji), w cyklu 2 w czterech grupach (braki treści / sprzeczne ze skutkiem / nie zweryfikowano / Typowe), „sam e-mail wystarcza”, „prawnik potwierdził” jako twierdzenie do potwierdzenia. Ocena: 9/10.

## Bramka 4: panel Codeksa (gpt-6.1-sol, tylko odczyt, rozdzielone role)

- Cykl 1, ekspert domeny (`codex-c1-ekspert.txt`): 4 blokery, 12 ważnych, werdykt TAK. Cykl 1, granice (`codex-c1-granice.txt`): 2 blokery, 16 ważnych, 4 kosmetyczne, werdykt TAK. Przyjęte m.in.: „ustnie lub pisemnie” jako wybór formy; działania następcze wewnątrz struktury; klauzula przy pozyskaniu danych; dokładne brzmienie przesłanki liczenia osób; sektory bez progu z zastrzeżeniem aktów unijnych; źródła DO WERYFIKACJI nie jako fakty; skill nie dobiera podstawy RODO; opis zawężony; kubełek „Typowe”; komponent 8 bez fałszywych alarmów; sankcje ze znamionami; przykład jako hipotetyczny. Odrzucone jako zbyt literalne: traktowanie nazwiska osoby przyjmującej jako wady.
- Cykl 2 skoncentrowany (`codex-c2.txt`): 8 z 11 punktów naprawionych, 3 częściowo (przykład „w potwierdzeniu odczytu” przy klauzuli, karta obsługi skracająca zasady dokumentowania i zmieniająca uprawnienie w obowiązek, rozszerzenie etyczne bez warunków) plus jeden nowy bloker (sprzeczność § 1 ust. 3 z „w każdym przypadku” w § 8). Werdykt TAK. Wszystkie cztery naprawione.
- Cykl 3 wąski (`codex-c3.txt`): [uzupełniane po zakończeniu]

## Bramka 5: skan paczki

[uzupełniane po zbudowaniu paczki]

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (A, B1, B2, C w dwóch cyklach). `gpt`: [po rundzie kompatybilnosc]. `gemini: brak` (nieużywane).
