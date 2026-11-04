# Arkusz samooceny operatu (DEMO, wypełniony)

MATERIAŁ WARSZTATOWY. Samoocena warsztatowa projektu operatu DEMO/2026/01;
komplet odpowiedzi TAK nie jest orzeczeniem zgodności, ocena należy do
rzeczoznawcy i, w trybie ustawowym, do organizacji zawodowej.

## A. Zgodność z wymogami formalnymi
1. TAK. Elementy przepisów obecne; pozycje [praktyka] (strona tytułowa,
   wyciąg) uwzględnione lub pominięte świadomie (wyciągu zamawiający nie
   wymagał, NIE DOTYCZY w pkt zakresu).
2. TAK. Cel (kredyt), wartość rynkowa i podejście porównawcze spójne.
3. TAK. Daty w treści operatu kompletne i spójne; znaczniki czasu rejestru
   mają datę generacji pakietu (20 sierpnia 2026), co odnotowano w projekcie
   (materiał pokazowy); `rejestr.py check` bez ustaleń.
4. TAK. Klauzule obecne w wersji roboczej z adnotacją (projekt niepodpisany).
5. NIE DOTYCZY. Działy III i IV KW bez wpisów, komentarz bezprzedmiotowy;
   odnotowano w opisie [praktyka].

## B. Poprawność metodyczna
6. TAK. Decyzja o podejściu z uzasadnieniem pełnymi przesłankami (wpis nr 3).
7. TAK. Kryteria (wpis nr 5) przed pierwszą transakcją (wpis nr 6).
8. TAK. Odrzucenie T6 z uzasadnieniem (wpis nr 11).
9. TAK. Wagi 40/35/25 z uzasadnieniami rynkowymi, suma 100%, kierunki skal
   zadeklarowane.
10. NIE DOTYCZY. Outlierów nie oflagowano, rozstrzygnięcia bezprzedmiotowe;
    trend policzony przed porównaniem.

## C. Poprawność obliczeń
11. TAK. Wszystkie liczby z porownywanie_parami.py; ponowny przebieg daje ten
    sam wynik (sha256 wejścia w dane-porownywanie.wynik.json).
12. TAK. XLSX ze śladem wartości pośrednich i tablicą wiązań (liczby
    statyczne).
13. TAK. Zaokrąglenia kupieckie opisane w wyniku (polityka_zaokraglen);
    wartości w projekcie operatu zgodne z XLSX.

## D. Spójność wewnętrzna
14. TAK. Opis stanu (oceny 2/3/2 i 3/3) odpowiada ocenom w obliczeniach.
15. TAK. Odchylenie od mediany 0,19% poniżej progu 20%, bez obowiązku
    akapitu; wynik w przedziale cen próby.
16. TAK. Wrażliwość przywołana; maks. odchylenie scenariusza 0,38% poniżej
    10%, bez obowiązku komentarza.
17. TAK. Wnioski końcowe zgodne z częścią opisową.

## E. Kompletność dokumentacyjna
18. TAK. Protokół materiałów (wpis nr 4) zgodny z listą załączników; brak
    świadectwa energetycznego odnotowany z datą prośby.
19. TAK. `rejestr.py check`: OK; skrót końcowy łańcucha zanotowany
    w projekcie operatu (kotwica).
20. TAK. Każda transakcja w XLSX ze źródłem; danych ofertowych nie użyto.

Bilans: 18 TAK, 2 NIE DOTYCZY (pkt 5 i 10), pozycji NIE brak. Wyciąg
z operatu pominięto świadomie (zamawiający nie wymagał). Projekt gotowy do
weryfikacji i decyzji rzeczoznawcy.
