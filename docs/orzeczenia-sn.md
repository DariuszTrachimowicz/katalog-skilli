# Orzeczenia sądów w researchu skilli

Stan: 6 listopada 2026. Zlecenie dla Michała (3 orzeczenia NSA): https://claude.ai/artifact/EMYUy9GGgRnNCLoau9ugcb

## Sąd Najwyższy: oficjalne API (źródło podstawowe)

SN udostępnia zanonimizowane orzeczenia przez API: https://repozytorium2.sn.pl (opis i warunki: https://www.sn.pl/pl/web-api, specyfikacja: https://repozytorium2.sn.pl/swagger/v1/swagger.json). Zakres: orzeczenia od lat 90. do bieżących, pełny tekst w HTML albo PDF, z uzasadnieniem, jeśli zostało sporządzone i opublikowane (część postanowień ma sam nagłówek „UZASADNIENIE”), wyszukiwanie po sygnaturze, treści, formie, izbie, dacie i składzie.

Warunki SN (stan 6 XI 2026, odczyt strony web-api): bez konta; limit zapytań (HTTP 429); obowiązek wskazania źródła: SN i repozytorium2.sn.pl; oznaczenie przetworzenia; nie sugerować aprobaty SN; dane weryfikować samodzielnie; dozwolone także zastosowania komercyjne.

Narzędzie: `narzedzia/orzeczenia-sn.mjs` (jedno zapytanie na sekundę, przedstawiający się User-Agent, metryka źródła w każdym pliku):

```
node narzedzia/orzeczenia-sn.mjs szukaj --tresc "zadatek" --forma "uchwała SN" --od 2020-01-01
node narzedzia/orzeczenia-sn.mjs sprawdz "III CZP 84/22" "I CSK 3442/24"
node narzedzia/orzeczenia-sn.mjs pobierz "III CZP 84/22" --plik testy/<skill>/orzeczenia/III-CZP-84-22.md
```

Strona www.sn.pl (wyszukiwarka dla ludzi) odrzuca programy blokadą Incapsula. Nie obchodzimy jej, bo API jest właściwym kanałem.

SAOS (saos.org.pl) ma orzeczenia SN tylko do czerwca 2016 r. i nie jest już potrzebny.

## Sygnatury „do weryfikacji” w skillach

Wszystkie 40 sygnatur SN oznaczonych w skillach jako „do weryfikacji” lub „do potwierdzenia” istnieje w API SN i ma tezy porównane z pełnym tekstem (6 XI 2026). Teksty: `docs/orzeczenia-sn/teksty/` (44 orzeczenia, plus II CSK 587/10 i II UKN 687/99 sprawdzone przy okazji). Oceny z cytatami: `docs/orzeczenia-sn/weryfikacja-2026-11-06/`.

Wynik (ok. 76 miejsc w skillach bez kopii): 4 tezy niezgodne z orzeczeniem (III CZP 30/06, IV CZ 7/09, I UK 231/14, I KS 27/23), kilkanaście nieprecyzyjnych, reszta zgodna. Poprawione w skillach razem z datami i formami, dopiski „do weryfikacji” usunięte tam, gdzie dotyczyły samej tezy. Sędzia: Codex, r1 i r2 DO POPRAWY, r3 PRZYJĘTE.

Typowe błędy, na które uważać przy nowych tezach: teza sądu niższej instancji albo strony przypisana SN; pominięty warunek (np. drugie wypowiedzenie, niewstąpienie syndyka); pogląd sprzed zmiany ustawy podany jako aktualny.

Druga tura tego samego dnia: 27 kolejnych sygnatur SN ze statusem „nieotwarte” (mobbing, B2B, najem lokalu, spory, niewypłacalność). Niezgodne 4: II CSKP 452/22 i II CSKP 1862/22 (nie dotyczą KC art. 673, pogląd sądu apelacyjnego albo inna sprawa), I PK 176/06 (SN odrzucił sztywne minimum czasu mobbingu), I PK 257/17 (pogląd sądu okręgowego uchylony przez SN); 9 nieprecyzyjnych poprawionych. Teraz żadna sygnatura SN w skillach nie ma statusu „nieotwarte”. Nowe orzeczenia: ta sama procedura (`pobierz`, porównanie z tekstem, poprawka w wąskim skillu, `node narzedzia/katalog-do-firmy.mjs`).

Cztery sygnatury mają w API po dwa orzeczenia (postanowienie i wyrok): II KK 429/22, II PK 224/17, III KK 193/23, V CSK 30/13. Tezy dotyczą wyroków.

## NSA: ręcznie

Baza CBOSA (orzeczenia.nsa.gov.pl) nie ma API. robots.txt zabrania robotom wyszukiwarki (`/cbo/search`, `/cbo/find`, `/cbo/do/*`) i plików `.txt`, ale strony samych orzeczeń `/doc/<ID>` są dozwolone. Gdy adres `/doc/` jest znany (z researchu albo z odnośnika), pobieramy stronę pojedynczo z przerwą i przedstawiającym się User-Agentem; wyszukiwarki CBOSA nie używamy. 6 XI 2026 tak pobrano I FSK 1239/24, II FSK 1301/25 i II GSK 883/11 (teksty i zrodla.txt w `docs/orzeczenia-nsa/`; zlecenie dla Michała oznaczone jako wykonane). Tezy porównane: II GSK 883/11 zgodna, II FSK 1301/25 i I FSK 1239/24 doprecyzowane. Gdy adresu nie znamy, orzeczenie NSA wyszukuje człowiek.

## Wniosek do SN o ponowne wykorzystywanie: niepotrzebny

Podstawa byłaby w art. 39 ustawy z 11 sierpnia 2021 r. o otwartych danych i ponownym wykorzystywaniu informacji sektora publicznego (t.j. Dz.U. 2023 poz. 1524). Wniosek składa się, gdy informacje nie są udostępnione z określonymi warunkami albo potrzebne są inne warunki (art. 39 ust. 1). SN udostępnia orzeczenia przez API z określonymi warunkami, które nam wystarczają, więc wniosku nie składamy.

Rezerwa, gdyby API zniknęło albo warunki przestały wystarczać:

- Treść wniosku: elementy z art. 39 ust. 3 (SN, wnioskodawca i adres odpowiedzi, informacje i ich źródło, cel i rodzaj działalności, forma i format, sposób przekazania albo sposób i okres stałego dostępu). Forma papierowa albo elektroniczna (art. 39 ust. 4).
- Rozpatrzenie: niezwłocznie, najpóźniej 14 dni od otrzymania wniosku; dłużej tylko po zawiadomieniu o przyczynie i nowym terminie, najwyżej 2 miesiące od złożenia (art. 40).
- Braki formalne: 7 dni od otrzymania wezwania, inaczej wniosek zostaje bez rozpoznania (art. 39 ust. 5).
- Oferta przy zwykłym przekazaniu informacji (art. 41): 14 dni od otrzymania oferty na jej przyjęcie albo sprzeciw z powodu naruszenia ustawy; nieprzyjęcie w terminie oznacza wycofanie wniosku.
- Oferta przy stałym dostępie w czasie rzeczywistym (art. 42): 14 dni na przyjęcie, sprzeciw nie przysługuje; nieprzyjęcie w terminie oznacza wycofanie wniosku.
- Odmowa decyzją: odwołanie do ministra właściwego do spraw informatyzacji (art. 43 ust. 1), 14 dni od doręczenia, za pośrednictwem SN (art. 129 k.p.a.). Adres SN według strony kontaktowej: Plac Krasińskich 2/4/6, 00-951 Warszawa; sprawy informacji publicznej: inf.publ@sn.pl.

## Przegląd wszystkich oznaczeń „do weryfikacji” (6 XI 2026, wieczór)

Polecenie Darka: „sprawdź UD260 i sygnalistów, oraz wszystko co jeszcze nie jest dopracowane”. Około 900 oznaczeń w 21 skillach prawnych podzielono na: K1 instrukcje dla modelu, K2 wartości zmienne sprawdzane w chwili użycia, K3 fakty sprawdzalne w oficjalnych źródłach (176 linii sprawdzonych, około 100 poprawionych merytorycznie), K4 do sprawdzenia przez człowieka (lista: `docs/do-sprawdzenia-recznie.md`). Oceny z cytatami źródeł: `docs/orzeczenia-sn/weryfikacja-2026-11-06/dopracowanie/`.

- UD260 (projekt nowelizacji Prawa upadłościowego): druk sejmowy 3085, po pierwszym czytaniu, sprawozdanie komisji druk 3280 z 5 XI 2026; w wersji komisji wejście w życie po 6 miesiącach (projekt rządowy: 30 dni; prasa podawała 14 dni).
- Sygnaliści: w bazie SN brak orzeczeń merytorycznych na gruncie ustawy; I KK 142/25 i I PSK 80/26 o działaniu ustawy w czasie.
- Orzeczenia NSA pobierane pojedynczo ze stron `/doc/` (robots.txt pozwala; wyszukiwarka CBOSA zabroniona): razem 11 w `docs/orzeczenia-nsa/`.
- Źródła niedostępne automatycznie (EUR-Lex i curia przy wielu zapytaniach, portale sądów powszechnych, legislacja.gov.pl, część podatki.gov.pl) zostają w K4; blokad nie obchodzimy.
