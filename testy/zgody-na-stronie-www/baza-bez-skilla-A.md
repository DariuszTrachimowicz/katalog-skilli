# Bramka sensu: goły model (Sonnet), scenariusz A

## Wejście

Mam stronę firmową biura rachunkowego na WordPressie: formularz kontaktowy, zapis na newsletter z darmowym e-bookiem, Google Analytics 4, piksel Facebooka, osadzona mapa Google i filmy z YouTube, czat na stronie. Baner cookies mam z wtyczki: jeden przycisk „OK, rozumiem”. Czy to jest w porządku i co muszę sprawdzić w 2026 roku?

## Wyjście

**Krótko: nie, w obecnym kształcie to nie jest w porządku.** Baner z jednym przyciskiem „OK, rozumiem” jest informacją, a nie zgodą. Przy GA4, pikselu Facebooka, mapie, YouTube i czacie zgoda jest potrzebna, a Pani/Pana strona prawdopodobnie ładuje te narzędzia jeszcze przed kliknięciem.

## 1. Dlaczego ten baner nie wystarcza

- Podstawa: art. 399 Prawa komunikacji elektronicznej (od 10.11.2024, zastąpił art. 173 Prawa telekomunikacyjnego) oraz RODO (art. 4 pkt 11, art. 6 ust. 1 lit. a, art. 7).
- Zgoda musi być dobrowolna, konkretna, świadoma i jednoznaczna. Samo „rozumiem” albo dalsze przeglądanie strony nią nie jest.
- Cookies i podobne technologie inne niż niezbędne wolno uruchomić dopiero po zgodzie. Jeśli GA4 i piksel odpalają się przy wejściu na stronę, to zgoda przychodzi za późno.
- Wymagany jest przycisk „Odrzuć” na tym samym poziomie co „Akceptuj” (podobny rozmiar, kolor i widoczność), bez ciemnych wzorców.
- Zgody powinny być rozdzielone na kategorie (analityka, marketing, funkcjonalne), bez zaznaczonych z góry pól.
- Musi być możliwość łatwej zmiany lub wycofania zgody w dowolnym momencie (np. link w stopce albo ikona).

## 2. Przegląd Państwa narzędzi

| Narzędzie | Zgoda? | Co zrobić |
|---|---|---|
| Google Analytics 4 | Tak (analityka) | Blokować do czasu zgody. Wdrożyć Google Consent Mode v2 (wymóg Google dla EOG), skrócone przechowywanie danych, wyłączone udostępnianie danych Google. |
| Piksel Facebooka | Tak (marketing) | Blokować do czasu zgody, najlepiej ładować przez menedżer tagów dopiero po zgodzie. Rozważyć, czy w ogóle jest potrzebny. |
| Mapa Google | Tak, jeśli ładuje się od razu | Ładować dopiero po kliknięciu („wczytaj mapę”) albo po zgodzie. Alternatywa: statyczny obrazek z linkiem. |
| YouTube | Tak, jeśli ładuje się od razu | Tryb youtube-nocookie.com i wczytywanie po kliknięciu (miniatura zastępcza). To nie zastępuje zgody, ale ogranicza ryzyko. |
| Czat | Zależy od dostawcy | Jeśli czat ustawia identyfikatory lub przekazuje dane dostawcy, ładować po zgodzie (kategoria funkcjonalna). Sprawdzić, gdzie są przechowywane rozmowy. |
| Formularz kontaktowy | Nie na samo przetwarzanie | Podstawa to zwykle art. 6 ust. 1 lit. b lub f RODO. Potrzebna klauzula informacyjna (art. 13) przy formularzu, bez wymuszonych zgód marketingowych. |
| Newsletter + e-book | Tak, osobna zgoda | Zgoda marketingowa na wysyłkę informacji handlowych (art. 398 PKE, RODO), osobny niezaznaczony checkbox, najlepiej double opt-in. Nie warunkować e-booka zgodą na dodatkowe cele, których nie opisano. Odnośnik do polityki prywatności i informacja, jak się wypisać. |

## 3. Co sprawdzić w 2026 roku (lista kontrolna)

1. **Realny test, a nie wiara we wtyczkę.** Otworzyć stronę w oknie incognito z narzędziami deweloperskimi (zakładka Sieć/Aplikacja) i sprawdzić, co się ładuje przed jakimkolwiek kliknięciem i po „Odrzuć”. Wtyczki często tylko pokazują baner, a skrypty działają dalej.
2. **Nowy baner**: trzy przyciski lub tryb Akceptuj / Odrzuć / Ustawienia, kategorie zgód, lista cookies z opisem celu, okresu i dostawcy.
3. **Consent Mode v2** dla Google (GA4, ewentualnie reklamy). Bez niego nie ma poprawnego pomiaru ani remarketingu w EOG.
4. **Dowód zgody**: zapis, kiedy i na co użytkownik się zgodził (wiele wtyczek ma logi), oraz wersja baneru.
5. **Polityka prywatności i polityka cookies**: aktualne, zgodne z faktycznymi narzędziami, z informacją o odbiorcach i o przekazywaniu danych poza EOG (Google, Meta, dostawca czatu).
6. **Umowy powierzenia (art. 28 RODO)** z dostawcą newslettera, czatu, hostingu i innymi podmiotami przetwarzającymi dane. Sprawdzić też, czy dostawca z USA jest w Data Privacy Framework i czy to nadal Państwa podstawa transferu.
7. **Rejestr czynności przetwarzania** i ocena, czy dane z formularza, newslettera i czatu są w nim ujęte.
8. **Double opt-in w newsletterze** i działający link do wypisu. Stare zapisy bez dowodu zgody: rozważyć ponowne pozyskanie zgody.
9. **Specyfika biura rachunkowego**: dane klientów są objęte tajemnicą zawodową i poufnością. Nie umieszczać pikseli i skryptów śledzących w podstronach z logowaniem lub z danymi klientów. Uprzedzić w czacie, żeby nie podawano danych finansowych i numerów PESEL/NIP.
10. **Aktualizacja wtyczek WordPressa** i ograniczenie liczby zewnętrznych skryptów. Każdy kolejny to ryzyko i spowolnienie strony.
11. **Przegląd co kilka miesięcy**: dostawcy zmieniają sposób działania narzędzi, a przepisy i wytyczne UODO oraz EROD się zmieniają. Warto zapisać datę ostatniego przeglądu.

## 4. Ryzyko

- Kary UODO za naruszenia RODO do 20 mln euro lub 4 % obrotu (w praktyce dla małych firm znacznie niższe), a na gruncie PKE kary nakłada Prezes UKE.
- Dla biura rachunkowego równie ważne jest ryzyko reputacyjne i skarga klienta lub konkurenta.

## 5. Co zrobić najpierw (kolejność)

1. Wyłączyć GA4, piksel, mapę, YouTube i czat do czasu zgody.
2. Wymienić baner na zgodny (z przyciskiem „Odrzuć”).
3. Dopisać klauzule przy formularzu i newsletterze oraz poprawić politykę prywatności.
4. Przetestować na incognito i zachować zrzuty ekranu jako dowód należytej staranności.

To jest ogólna informacja, a nie porada prawna. Przy wątpliwościach co do transferów danych do USA lub konkretnych umów warto skonsultować się z prawnikiem lub inspektorem ochrony danych.

*Nie sprawdzałem Państwa strony na żywo ani aktualnego stanu orzecznictwa (np. dot. transferów do USA), więc powyższe wymaga weryfikacji na realnym ruchu sieciowym.*
