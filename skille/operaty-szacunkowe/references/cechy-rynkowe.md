# Cechy rynkowe i wagi: materiał pomocniczy do etapu 2

**Zastrzeżenie nadrzędne:** wagi cech wyprowadza się z badania rynku lokalnego
(analiza wpływu cech na ceny w próbie), nie z tego pliku. Ten plik podaje
pułapki i typowe ZESTAWY cech do rozmowy z użytkownikiem; celowo nie podaje
liczbowych widełek wag, żeby nie kotwiczyć na wartościach bez podstawy
rynkowej. Każda przyjęta waga = wpis do rejestru z uzasadnieniem rynkowym.

## Pułapki metodyczne (sprawdzaj zawsze)

- **Współliniowość cech**: "standard wykończenia" i "rok budowy/stan budynku"
  często mierzą to samo, nie liczyć podwójnie; jeśli obie, uzasadnić rozdzielność.
- **Cechy stałe w próbie**: cecha o identycznej ocenie we wszystkich transakcjach
  nie różnicuje i nie dostaje wagi; może zostać w operacie jako kryterium
  segmentacji rynku albo element opisu.
- **Skala ocen**: zadeklarować z góry (np. 1-3 lub 1-5) i stosować jednolicie;
  opisać, co znaczy każdy stopień.
- **Trend PRZED porównaniem**: przy stwierdzonej w analizie rynku zmianie poziomu
  cen korekta czasowa poprzedza porównywanie parami (skrypt liczy ją zawsze;
  przy stabilnym rynku parametr trendu = 0 z uzasadnieniem w rejestrze).

## Ceny ofertowe (portale, biura nieruchomości): tylko kontekst, nigdy próba

Ceny z portali ogłoszeniowych i biur to ceny ofertowe, nie transakcyjne, więc
NIE wchodzą do próby porównawczej i nie zastępują danych z RCN ani aktów
notarialnych. Wolno je wykorzystać wyłącznie jako materiał pomocniczy analizy
rynku, wklejony przez użytkownika: kierunek trendu, czas ekspozycji ofert,
relacja cen ofertowych do transakcyjnych w segmencie, test rozsądności wyniku.
W operacie oznaczaj je wprost jako materiał pomocniczy z podaniem źródła i daty,
a w rejestrze zapisz wpis `typ: material`. Skill sam niczego z portali nie
pobiera; dane ofertowe wprowadza użytkownik.

## Lokale mieszkalne: typowe zestawy cech

lokalizacja i sąsiedztwo; położenie w budynku (kondygnacja, winda); powierzchnia
i funkcjonalność; standard wykończenia; stan budynku; przynależności (balkon,
piwnica, miejsce postojowe). Które cechy naprawdę różnicują ceny i jak mocno,
pokazuje wyłącznie analiza próby z rynku lokalnego.

## Grunty niezabudowane

lokalizacja; przeznaczenie i możliwości zabudowy; powierzchnia i kształt;
uzbrojenie; dojazd; otoczenie/sąsiedztwo. Na części rynków (zwłaszcza
podmiejskich) przeznaczenie różnicuje ceny mocniej niż lokalizacja; rozstrzyga
analiza rynku, nie reguła.

## Komercja (lokale użytkowe, biura, handel)

lokalizacja i ekspozycja; dostępność (parking, komunikacja); stan techniczny
i standard; potencjał dochodowy / obecne umowy najmu; elastyczność aranżacji.
Przy podejściu dochodowym część cech przechodzi do parametrów dochodu, nie wag.

## Test rozsądności przed obliczeniami

1. Suma wag = 100% (skrypt odmówi, jeśli nie).
2. Czy waga dominująca ma pokrycie w analizie rynku opisanej w operacie?
3. Czy różnice ocen między transakcjami odpowiadają opisom w źródłach?
4. Po obliczeniach: czy analiza wrażliwości nie pokazuje, że wynik "wisi" na
   jednej wadze (odchylenie scenariusza > 10% od bazy → komentarz w operacie
   obowiązkowy).
