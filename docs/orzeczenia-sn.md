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

Wszystkie 40 sygnatur SN oznaczonych w skillach jako „do weryfikacji” lub „do potwierdzenia” istnieje w API SN (sprawdzone 6 XI 2026, `sprawdz`). To potwierdza sygnaturę, datę i formę, nie treść tezy. Następny krok: pobrać teksty i porównać tezy w skillach (`sprawy-prawne-w-firmie`, `upadlosc-konsumencka-przygotowanie`, `najem-mieszkania-pod-lupa`, `pelnomocnictwo-w-firmie`, `nakaz-zaplaty-co-dalej`, `kontrola-z-urzedu`).

Cztery sygnatury mają w API po dwa orzeczenia (postanowienie i wyrok): II KK 429/22, II PK 224/17, III KK 193/23, V CSK 30/13. Przy porównaniu wybrać to, którego dotyczy teza.

## NSA: ręcznie

Baza CBOSA (orzeczenia.nsa.gov.pl) nie ma API, a jej robots.txt zabrania robotom wyszukiwania. Orzeczenia NSA pobiera człowiek: I FSK 1239/24, II FSK 1301/25, II GSK 883/11 (zlecenie dla Michała, artefakt z 6 XI 2026).

## Wniosek do SN o ponowne wykorzystywanie: niepotrzebny

Podstawa byłaby w art. 39 ustawy z 11 sierpnia 2021 r. o otwartych danych i ponownym wykorzystywaniu informacji sektora publicznego (t.j. Dz.U. 2023 poz. 1524). Wniosek składa się, gdy informacje nie są udostępnione z określonymi warunkami albo potrzebne są inne warunki (art. 39 ust. 1). SN udostępnia orzeczenia przez API z określonymi warunkami, które nam wystarczają, więc wniosku nie składamy.

Rezerwa, gdyby API zniknęło albo warunki przestały wystarczać:

- Treść wniosku: elementy z art. 39 ust. 3 (SN, wnioskodawca i adres odpowiedzi, informacje i ich źródło, cel i rodzaj działalności, forma i format, sposób przekazania albo sposób i okres stałego dostępu). Forma papierowa albo elektroniczna (art. 39 ust. 4).
- Rozpatrzenie: niezwłocznie, najpóźniej 14 dni od otrzymania wniosku; dłużej tylko po zawiadomieniu o przyczynie i nowym terminie, najwyżej 2 miesiące od złożenia (art. 40).
- Braki formalne: 7 dni od otrzymania wezwania, inaczej wniosek zostaje bez rozpoznania (art. 39 ust. 5).
- Oferta przy zwykłym przekazaniu informacji (art. 41): 14 dni od otrzymania oferty na jej przyjęcie albo sprzeciw z powodu naruszenia ustawy; nieprzyjęcie w terminie oznacza wycofanie wniosku.
- Oferta przy stałym dostępie w czasie rzeczywistym (art. 42): 14 dni na przyjęcie, sprzeciw nie przysługuje; nieprzyjęcie w terminie oznacza wycofanie wniosku.
- Odmowa decyzją: odwołanie do ministra właściwego do spraw informatyzacji (art. 43 ust. 1), 14 dni od doręczenia, za pośrednictwem SN (art. 129 k.p.a.). Adres SN według strony kontaktowej: Plac Krasińskich 2/4/6, 00-951 Warszawa; sprawy informacji publicznej: inf.publ@sn.pl.
