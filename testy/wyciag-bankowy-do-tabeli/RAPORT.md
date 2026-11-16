# wyciag-bankowy-do-tabeli: raport bramek QA (wydanie 1.0.0, 16 listopada 2026)

Skill darmowy, kategoria Finanse. Granica podatkowa (koszty, VAT, podatek, składki), więc panel eskalacji obowiązkowy: Codex w trzech rolach w cyklu 1, potem sędzia zbiorczy w cyklach 2-6. Scenariusze: `testy/wyniki-gemini/scenariusze/wyciag-bankowy-do-tabeli.md` (A, B1, B2, C), pliki `dane/A-mbank.csv` (Windows-1250, podzielona płatność) i `dane/C-pekao.csv` (polecenie dla asystenta w tytule, PESEL, duplikat, EUR). Research formatów: `research.md` (44 źródła, 15 listopada 2026).

## Bramka sensu

`baza-bez-skilla-A.md`: model bez skilla policzył sumy i odłożył VAT, ale dzielił wydatki na „koszt” i „nie koszt”, doradzał przy odliczaniu VAT i uznał zgodne saldo za dowód braku duplikatów. Przewaga skilla: granice podatkowe, powtarzalne reguły kategorii, kontrola salda z trzema stanami, maskowanie danych.

## Walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów; `skany.sh`: czysto. Opis 1019 znaków. Selftest `scripts/wyciag.py`: OK (układy mBanku, PKO iPKO, Pekao, Aliora, waluty, saldo, cudzysłowy, stopki, maskowanie, przeksięgowania VAT, reguły; ok. 70 przypadków).

## Testy na ślepo (Sonnet)

| Cykl | A+B1+B2 | C |
|---|---|---|
| 1 | PASS 9/10 (`skill-A-B1-B2.md`) | PASS 8/10 (`skill-C.md`) |
| 2 | PASS 8/10, B2 z prośbą o artykuł (`retest-A-B1-B2.md`) | PASS 8/10 (`retest-C.md`) |

## Panel i sędzia Codex

- c1 (3 role): granice 2 blokery, ekspert 5, język 1; wszystkie przyjęte (maskowanie, formuły w CSV, VAT do urzędu, ciche gubienie operacji, kierunek salda, waluta w kwocie, PESEL w błędzie, saldo bez danych).
- c2: 5 blokerów (opłata za przeksięgowanie, pusta data i cudzysłów, sprzeczna waluta, saldo przy jednej dacie, PESEL z dywizem i adres), 5 ważnych; przyjęte wszystkie.
- c3: 4 blokery (wyjątek dokumentu przepuszczał PESEL i telefon, „1+2”, VAT w obu kierunkach, waluty w dwóch kolumnach), 3 ważne; przyjęte wszystkie, dodane sumy miesięczne.
- c4: 1 bloker (dane osoby z etykietą w innych zapisach), 3 ważne syntetyczne; przyjęte.
- c5: 1 bloker (kolejne warianty: „PESEL nr”, numer zagraniczny, adres bez dwukropka); zmiana zasady: po etykiecie danych osoby znika cała wartość do końca pola, numery z prefiksem kraju maskowane zawsze.
- c6-c17 (wąskie, tylko maskowanie danych osoby w tytułach i opisach): po każdym cyklu jeden albo dwa nowe zapisy (telefon z „nr”, adres bez spacji, słowo z dwukropkiem w wartości, kropki w numerze, drugi numer w polu, sklejone liczby, podwójna spacja w PESEL, drugi PESEL, pole wieloliniowe, „kom:”, „adr:”) oraz nadmierne maskowanie numerów faktur (FS/123456789/2026, „FS 202611001”), dat i kwot. Zasada końcowa: po etykiecie PESEL znika każdy numer z 11 cyfr, po etykiecie telefonu każdy ciąg co najmniej 7 cyfr, poza osłoniętymi datami, kwotami i numerami dokumentów; po etykiecie adresu cała reszta tekstu; złamania wierszy zamieniane na spację. Selftest z baterią kombinacji; własne próby kilku tysięcy kombinacji bez wycieku.
- c18: **BLOKERY DO WYDANIA: NIE** (126 przypadków danych osoby, 1 512 kontroli bez wycieku; 109 przypadków treści, 1 308 kontroli bez zepsucia). Ważne (CHF i GBP w osłonie kwoty) naniesione.

## Terytorium i wyzwalanie

Sąsiedzi: `faktura-do-tabeli`, `porzadkowanie-arkusza`, `co-mowi-arkusz`, `przygotowanie-do-ksiegowej`, `raport-miesieczny`. Surowa historia z banku do rozpisania należy do tego skilla, raport z gotowych sum do `raport-miesieczny`, wnioski do `co-mowi-arkusz`. Wyzwalanie: c1 19/20, c2 20/20, przebieg z 22 zapytaniami 22/22 (poza zakresem bramki), końcowy 19/20 przy 20 zapytaniach, 3 powtórzeniach i pełnym tle 64 opisów (`testy/wyzwalanie/wyciag-bankowy-do-tabeli-wynik.log`); jedyny rozjazd: przy „raporcie miesięcznym dla zarządu” nie odpalił się żaden skill, ten skill nie przejmuje zapytania.

## Kompatybilność

GPT (bez skryptu, sumy ręcznie): A, B1, B2, C PASS (`testy/wyniki-gpt/wyciag-bankowy-do-tabeli.md`). Gemini: nieużywane.

## Ograniczenia

Skrypt sprawdzony na przykładowych układach PKO, mBanku, Pekao i Aliora z plików użytkowników; ING, Santander i Millennium wymagają prawdziwego pliku. Excel nie był otwierany (eksport sprawdzony w pamięci i odczytem pliku). Maskowanie celowo zamaskuje za dużo po etykietach „tel.”, „PESEL”, „adres”.

## Statusy

`status: gotowy`, `claude: ok`, `gpt: ok`, `gemini: brak`.
