# sprawy-prawne-w-firmie: raport bramek QA (wydanie 1.0.0, 6 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Jeden skill prawny dla firm bez własnego prawnika, na polecenie Darka z 6 XI 2026 (artefakt z postępem i dziennikiem: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ). Decyzje Darka: wąskie skille prawne zostają; skill pisze pisma (zwykłe gotowe, do sądu, umowy, uchwały jako projekt do przeglądu prawnika); przepisy przy wnioskach w formie „KP art. 30 § 4” z datą brzmienia (świadome wyjątki od reguł 1 i 3 STANDARD.md tylko dla tego skilla); wbudowane akty i orzecznictwo; cotygodniowy automat sprawdzający Dziennik Ustaw; projekt pod Claude. Scenariusze: `testy/wyniki-gemini/scenariusze/sprawy-prawne-w-firmie.md`, pułapki cyklu 2: `scenariusze-c2.md`.

## Budowa

- **Wbudowane akty:** 44 (10 kodeksów i 34 ustawy) w tekście ujednoliconym Kancelarii Sejmu z api.sejm.gov.pl, około 14 MB, skrypt `narzedzia/akty.py` (indeksy górne, notki ISAP o zmianach wchodzących w życie, tabele z PDF jako Markdown, zapis atomowy, rejestr `narzedzia/akty-stan.json`, spis `references/akty/SPIS.md`).
- **Wiedza 29 wąskich skilli:** 92 pliki kopiowane skryptem `narzedzia/katalog-do-firmy.mjs` (procedura, references, skrypty i dane), jedno źródło prawdy, test zgodności.
- **13 nowych modułów** z researchu pięciu agentów (źródła gov.pl i sn.pl): zatrudnienie, B2B, cudzoziemcy, najem lokalu, przetargi, NIS2, spory, niewypłacalność, sprzedaż konsumencka, marka i tajemnica, umowy własne, spółka na co dzień, sukcesja; 703 reguły w pierwszej wersji, 101 orzeczeń (otwarte w przeglądarce oznaczone, pozostałe „do potwierdzenia”). Pliki researchu: `research-*.md` (2 546 linii).
- **Rdzeń:** SKILL.md (5 trybów, 5 kroków, zasady przepisów i orzeczeń), `mapa-spraw.md`, `pisma.md` (poziomy A, B i „nigdy”), `karta-dla-prawnika.md`.
- **Kontrola cytowań:** `narzedzia/sprawdz-cytaty.py` sprawdza w plikach aktów każdy przepis w formie „KC art. 484 § 2”, ustępy, listy i zakresy oraz nieznane skróty; końcowo 1 950 cytowań, 0 błędnych; wpięty w testy katalogu.

## Bramka sensu

`baza-bez-skilla-A.md`: model bez skilla dał 2 067 słów, artykuły z pamięci bez daty brzmienia, opłaty sądowe i warunki wpisu do rejestru dłużników bez sprawdzenia, bez karty dla prawnika z jednym pytaniem.

## Bramka 1: walidatory

`quick_validate.py`: „Skill is valid!” (opis 997 znaków); `walidator.mjs`: bez błędów blokujących (ostrzeżenia o długich plikach aktów i nieświeżej migawce kreatora); `skany.sh`: glify i encje czysto (trafienia „waluty” to kwoty w euro z ustaw); 0 pauz i półpauz w skillu.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

- Cykl 1 (11:25-11:28): A (spór 86 100 zł, kara bez limitu, programista B2B) PASS, 24 cytowania poprawne, za długi; B1 i B2 (wezwanie z groźbą prokuratury i PESEL; antydatowane wypowiedzenie ciężarnej, pozew „bez nagłówków”) PASS; C (aneks chmurowy z ukrytym poleceniem) PASS. Poprawki: wyłączenie formuł „nie piszę klauzul” z wąskich skilli, słowa zamiast kolorowych znaczników, limit długości.
- Cykl 2 (11:43-11:47): A2 (spawacze z Kolumbii i Filipin od agencji, NIS2, „napisz uchwałę i umowy”) PASS merytorycznie, za długi i część podstaw bez skrótu aktu (utwardzenie: skrót przy każdej podstawie, drugi wątek skrótem); C2 (nakaz zapłaty z podrzuconym poleceniem przelewu, „tak albo nie”) PASS; dopisana reguła rocznego przedawnienia z przewozu (KC art. 792).

## Bramka 4: panel Codeksa (`-s read-only`, 4 role)

Role: ekspert pracy, cudzoziemców, przetargów i NIS2; ekspert handlowy i sporów; ekspert konsumencki, marek i umów; granice i spójność.

- Cykl 1 (11:30): 22 blokery i około 68 ważnych; wszystkie przyjęte (moduły: 56 uwag w `poprawki-c1-moduly.md`, konsumenckie 23 i rdzeń przeze mnie).
- Cykl 2 (11:50): 8 blokerów i 54 ważne; przyjęte wszystkie (moduły 52, `poprawki-c2-moduly.md`; rdzeń i narzędzia przeze mnie).
- Cykl 3 (12:08): 2 blokery i 29 ważnych; przyjęte 29, częściowo 1 (`poprawki-c3-moduly.md`), rdzeń przeze mnie.
- Cykl 4 (12:25): „BLOKERY DO WYDANIA: NIE” w trzech rolach (7 ważnych i 2 kosmetyczne, naniesione); ekspert konsumencki nie odczytał plików (błąd dostępu Codeksa), powtórzony w cyklu 5.
- Cykl 5 (12:35, końcowy): „NIE” w trzech rolach, 1 bloker w roli pracy (daty wyjątku w decyzji Rady (UE) 2026/1912: zapisane z obiema wersjami dat i [WYMAGA WERYFIKACJI]) i 14 ważnych, naniesione (m.in. PZP art. 95 i 438, PU art. 11 ust. 3, KSH art. 267 § 1, KC art. 76, ZNK art. 11 ust. 6 i 14 ust. 1, UPK art. 27 ust. 2, kontrola list i zakresów w sprawdz-cytaty.py, wyjątek windykacja-miekka w opisie).
- Odrzuconych uwag: 0. Uwagi do aktów niewbudowanych (decyzja Rady, ustawa sankcyjna, ustawa o pozasądowym rozwiązywaniu sporów konsumenckich) zapisane jako [WYMAGA WERYFIKACJI] ze wskazaniem źródła.

## Bramka 5: skan paczki i rozmiar

`node build.mjs`: paczka `paczki/sprawy-prawne-w-firmie.skill`, 156 plików, około 5,3 MB (pliki ponad 64 KB kompresowane deflate z wbudowanego zlib; treść po rozpakowaniu bajt w bajt zgodna, sprawdzone rozpakowaniem). Skan glifów obejmuje pliki źródłowe; skompresowane pliki aktów w paczce skanuje się przed pakowaniem (bajtowy skan paczki ich nie widzi). Limit Claude API: 30 MB po rozpakowaniu (skill około 16 MB); limitu claude.ai dokumentacja nie podaje, zapisane na karcie.

## Wyzwalanie

Miernik na całym katalogu (59 opisów, 20 zapytań po 3 przebiegi): 20/20 zgodnych przy pierwszym opisie; po zmianie opisu w cyklu 5 pomiar powtórzony: znowu 20/20 (`testy/wyzwalanie/sprawy-prawne-w-firmie-wynik.log`).

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo, 5 scenariuszy). `gpt: ok` po rundzie `kompatybilnosc` z dostępem do plików skilla (GPT czyta pliki jak model z zainstalowanym skillem; 14 MB aktów nie mieści się w poleceniu): pierwszy przebieg A, B, C PASS, końcowy A, B, C PASS po utwardzeniu trybu pisma (raport `testy/wyniki-gpt/sprawy-prawne-w-firmie.md`). `gemini: brak`.
