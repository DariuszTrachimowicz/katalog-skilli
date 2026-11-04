---
nazwa: Ankieta do wniosków
kategoria: Dane
status: gotowy
wersja: 1.0.1
poziom: Działa od razu
aktualizacja: 2026-11-04
skrot: Czyta surowe wyniki ankiety razem z odpowiedziami otwartymi i mówi, co się powtarza, gdzie odpowiedzi się rozjeżdżają i czego z tych danych powiedzieć nie można.
korzysc: Wiesz, co naprawdę wynika z ankiety, i nie pokażesz zarządowi liczby, której nie da się obronić.
szukaj: ankieta, badanie satysfakcji, NPS, eNPS, CSAT, Google Forms, Webankieta, Microsoft Forms, pytania otwarte, ankieta pracownicza, badanie nastrojów, wyniki ankiety
tytulSeo: Wyniki ankiety, co z nich naprawdę wynika, po polsku
opisSeo: Wrzuć wyniki ankiety i zobacz, co się powtarza, gdzie odpowiedzi się rozjeżdżają i czego z nich nie wynika. Mówi wprost, kiedy próba jest za mała.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Czyta surowe wyniki ankiety, razem z odpowiedziami otwartymi, i zamienia je w krótkie podsumowanie: co powtarza się najczęściej, gdzie ludzie odpowiadają zupełnie inaczej i czego z tych danych powiedzieć się nie da.

Twardo oddziela fakt od domysłu. Liczby idą do sekcji z podaną podstawą („14 z 23 osób”), przypuszczenia do osobnej sekcji z podpisem, jak je sprawdzić. Jeśli próba jest za mała na procenty, skill powie to zamiast je podać.

## Dla kogo

Firmy badające satysfakcję klientów, działy HR i kierownicy, którzy sprawdzają nastroje w zespole, organizatorzy szkoleń i wydarzeń, marketing zbierający opinie o produkcie. Każdy, kto rozesłał ankietę i został z arkuszem, którego nie wie, jak czytać.

## Ile Ci to oszczędza

Przeczytanie dwustu odpowiedzi otwartych i pogrupowanie ich w tematy to popołudnie pracy. Ze skillem, kilka minut do listy motywów z liczbą osób i dosłownymi cytatami.

Więcej warte jest to, czego nie zrobisz: nie pokażesz zarządowi procentu policzonego z ośmiu odpowiedzi i nie napiszesz w raporcie zdania „oceny spadły, bo…”, którego nie da się obronić.

## Przykład z życia

Marta prowadzi HR w firmie zatrudniającej 58 osób. Rozesłała ankietę o nastrojach, wróciły 23 wypełnione. Narzędzie pokazało jej średnią 3,6 na 5 i eNPS na poziomie −4.

Skill mówi trzy rzeczy. Że ta średnia zasłania najważniejsze: 9 osób dało 5, a 8 osób dało 1 albo 2, to nie jest zespół przeciętnie zadowolony, tylko zespół podzielony na pół. Że eNPS z 23 odpowiedzi w ogóle nie zostanie policzony, bo jedna osoba przesuwa go o kilka punktów, a przy takim zwrocie nie wiadomo, co odpowiedziało 35 osób, które się nie odezwały. I że w odpowiedziach otwartych 11 z 23 osób napisało o tym samym, że o zmianach w firmie dowiadują się z korytarza, z cytatem, który Marta może pokazać zarządowi.

Prośbę o rozbicie wyników na działy skill wykonuje tylko dla dwóch największych. Przy czteroosobowej księgowości odmawia i tłumaczy dlaczego: taka tabela pokazałaby, kto co napisał.

## Jak po polsku

Zbudowany pod polskie realia badań i pod polskie pliki. Zna układ eksportów z Google Forms i Microsoft Forms co do nazw kolumn. Przy Webankiecie, Interankietach, Ankieteo, SurveyLabie, Survio i LimeSurvey wie, czego szukać, bloku metadanych, tokenu respondenta i odpowiedzi własnych przy „inne”, i pokazuje, co znalazł w Twoim pliku.

Zna pułapki polskiego CSV: średnik zamiast przecinka, polskie znaki zamienione w krzaki, przecinek dziesiętny wczytany jako liczba całkowita, numery oddziałów zamienione przez Excela na daty. I zna polskie skale, 1-5, szkolną 1-6 i 0-10 przy NPS, zamiast zakładać, że każda ocena to amerykańskie pięć gwiazdek.

Nie ocenia wyniku NPS według progów z zagranicznych poradników, bo nikt nie sprawdził, czy dotyczą polskiego rynku i tej branży.

## Czego potrzebujesz

Dowolny płatny plan Claude i wyniki ankiety: plik CSV, arkusz XLSX albo wklejona lista odpowiedzi. Przyda się informacja, ile zaproszeń wysłano, bez tego nie da się policzyć, ile ta ankieta waży. Żadnych konektorów ani konfiguracji.

## Na czym się wywala

- **Mała próba.** Przy mniej niż 10 odpowiedziach nie dostaniesz żadnego procentu ani wykresu, tylko ułamki w rodzaju „6 z 9”. Przy mniej niż 30 odpowiedziach nie dostaniesz NPS ani eNPS, skill ich nie policzy, nawet jeśli narzędzie ankietowe już Ci jakąś liczbę pokazało.
- **Gotowe podsumowanie zamiast danych.** Jeśli wrzucisz wykresy albo raport wygenerowany przez narzędzie ankietowe, skill nie przeliczy nic od zera i nie odtworzy z wykresu rozkładu odpowiedzi, powie, że pracuje na cudzych liczbach, i tyle. Do policzenia potrzebuje surowych odpowiedzi.
- **Odwrócona skala.** Jeśli w ankiecie 1 znaczy najlepiej albo najważniejsze, a tak bywa w pytaniach rankingowych i w kwestionariuszach tłumaczonych z zagranicy, i nie widać tego w nagłówku, skill zatrzyma się i zapyta, zamiast liczyć. Napisz kierunek skali od razu, to oszczędzisz jedną rundę pytań.
- **Uszkodzony eksport.** Krzaki zamiast polskich znaków skill zwykle odzyska, bo wystarczy odczytać plik jako UTF-8, powie o tym zamiast zgadywać, co respondent napisał. Nie do odzyskania są wartości, które Excel trwale przeliczył przy zapisie: numery oddziałów zamienione na daty i długie identyfikatory zapisane wykładniczo. Skill to zgłosi i nie będzie ich odtwarzał domysłem.
- **Porównanie z poprzednim badaniem.** Zrobi je tylko wtedy, gdy masz poprzedni kwestionariusz i pytania brzmiały identycznie. Zmienione jedno słowo w pytaniu unieważnia porównanie, skill powie to zamiast porównać z zastrzeżeniem.
- **Testy statystyczne.** Nie liczy istotności, przedziałów ufności ani modeli. Pokazuje rozkłady, liczby osób i rozjazdy między grupami.

## Czego ten skill nie robi celowo

Nie nazywa przyczyn. Z ankiety wynika, co ludzie odpowiedzieli, nie dlaczego, zdanie „oceny spadły, bo zmieniliśmy dostawcę” byłoby wymyślone, nawet gdyby brzmiało sensownie. Przypuszczenia trafiają do osobnej sekcji, z instrukcją, jak je sprawdzić.

Nie wymyśla tematów. Kategoria z odpowiedzi otwartych powstaje tylko wtedy, gdy da się pod nią podpiąć dosłowny cytat. „Długo czekałem” nie zamieni się w „problem z wydajnością systemu”, bo tego nikt nie napisał.

Nie zaokrągla w górę i nie robi z ankiety wyniku, którego ona nie unosi. Jeśli poprosisz o jedno mocne zdanie do zarządu, odmówi i pokaże, czego brakuje, żeby takie zdanie dało się napisać.

Nie układa pytań do ankiety. Powie, które pytanie było wadliwe i jaki to ma skutek dla wyniku, ale poprawionej wersji nie napisze, to inna robota.

## Najczęstsze pytania

### Jak szybko podsumować wyniki ankiety z Google Forms?

Wrzuć surowy eksport, a skill pokaże, co powtarza się najczęściej, gdzie odpowiedzi się rozjeżdżają i czego z danych powiedzieć nie można. Odpowiedzi otwarte grupuje w motywy z liczbą osób i dosłownymi cytatami, a każdą liczbę podaje z podstawą, na przykład „14 z 23 osób”.

### Czy AI powie mi, dlaczego ludzie tak odpowiedzieli w ankiecie?

Nie, z ankiety wynika, co ludzie odpowiedzieli, a nie dlaczego. Przypuszczenia o przyczynach skill odkłada do osobnej sekcji z podpisem, jak je sprawdzić. Nie wymyśla też tematów, bo kategoria z odpowiedzi otwartych powstaje tylko wtedy, gdy stoi za nią dosłowny cytat.

### Ile odpowiedzi potrzeba, żeby policzyć NPS z ankiety?

Co najmniej 30, przy mniejszej liczbie skill nie policzy NPS ani eNPS, nawet jeśli narzędzie ankietowe już pokazało jakiś wynik. Przy mniej niż 10 odpowiedziach nie podaje też procentów, tylko ułamki w rodzaju „6 z 9”, bo pojedyncza osoba przesuwa wynik zbyt mocno.

### Czy rozbije wyniki ankiety pracowniczej na działy?

Tylko tam, gdzie grupa jest na tyle duża, że nie da się rozpoznać autorów odpowiedzi. Przy małym dziale skill odmówi i wyjaśni dlaczego: taka tabela pokazałaby, kto co napisał. Opisuje ten skutek, ale nie ocenia, czy coś jest zgodne z RODO.

### W jakiej postaci wrzucić wyniki ankiety?

W surowej: plik CSV, arkusz XLSX albo wklejona lista odpowiedzi. Przyda się też liczba wysłanych zaproszeń, bo bez niej nie da się policzyć, ile ankieta waży. Gotowe wykresy z narzędzia ankietowego nie wystarczą, bo skill nie odtworzy z nich rozkładu odpowiedzi.

### Ile kosztuje skill do analizy ankiet i na jakich platformach działa?

Nic, skill jest darmowy i udostępniony na licencji GPL, a plik .skill dostajesz linkiem na e-mail po podaniu adresu na karcie skilla. W Claude działa na dowolnym płatnym planie, w ChatGPT wymaga planu Business, Enterprise, Edu lub Healthcare, a w Gemini w Polsce instrukcje wkleja się do rozmowy albo Gema.
