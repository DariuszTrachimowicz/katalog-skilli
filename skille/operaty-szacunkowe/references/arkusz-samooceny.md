# Arkusz samooceny operatu (autorska lista kontrolna)

Etap 5. To autorska lista kontrolna w układzie, w jakim oceniający z organizacji
zawodowych typowo czytają operat (sama procedura oceny prawidłowości wynika
z UGN; przepis nie narzuca tej listy). Przejdź operat punkt po punkcie; wynik
zapisz jako `arkusz-samooceny.md` w katalogu wyceny z odpowiedziami TAK / NIE /
NIE DOTYCZY + komentarz. Każde NIE = wróć i popraw przed oddaniem.

WAŻNE: komplet odpowiedzi TAK to samoocena warsztatowa, nie orzeczenie.
Nie wyprowadzaj z niej stwierdzeń "operat zgodny z przepisami", "wartość
prawidłowa" ani "można podpisać"; wynik przedstawiaj jako listę punktów.
Punkty oznaczone [praktyka] dotyczą dobrej praktyki, ich "NIE" to punkt do
rozważenia, nie brak formalny.

## A. Zgodność z wymogami formalnymi

1. Czy operat zawiera elementy wymagane przepisami, a z pozycji praktyki te,
   które zamawiający wymaga (por. struktura-operatu.md, pkt 1-14 z oznaczeniami)?
2. Czy cel, rodzaj wartości i reżim prawny są spójne (wybor-metody.md, krok 1)?
3. Czy daty (sporządzenia / wartości / stanu / oględzin) są kompletne i spójne,
   a żadna czynność analityczna nie poprzedza pozyskania danych (rejestr: check)?
4. Czy klauzule są obecne, w tym warsztatowa, i czy żadna nie została w wersji
   roboczej bez zatwierdzenia przez rzeczoznawcę?
5. Czy każdy wpis działu III i IV KW został skomentowany w opisie stanu prawnego?

## B. Poprawność metodyczna

6. Czy wybór podejścia/metody jest uzasadniony celem i dostępnością danych
   (wpis w rejestrze typu decyzja; przy zmianie po analizie rynku: nowy wpis)?
7. Czy kryteria doboru próby zadeklarowano PRZED selekcją (rejestr: kryteria
   przed pierwszą transakcją)?
8. Czy każde odrzucenie transakcji (w tym outliera) ma uzasadnienie w rejestrze?
9. Czy wagi cech mają uzasadnienie rynkowe i sumują się do 100%?
10. Czy korekta trendu poprzedza porównanie; czy outliery flagowane przez skrypt
    zostały rozstrzygnięte decyzją z uzasadnieniem (bez decyzji skrypt nie liczy)?

## C. Poprawność obliczeń

11. Czy wszystkie liczby w operacie pochodzą ze skryptów (ponowne uruchomienie
    daje ten sam wynik)?
12. Czy XLSX zawiera ślad wartości pośrednich: dane → trend → statystyka →
    porównanie → wrażliwość → tablica wiązań (liczby statyczne, każda wielkość
    ze wskazaniem źródła)?
13. Czy polityka zaokrągleń jest jednolita i opisana; czy wartości w tekście
    operatu są identyczne z XLSX co do grosza/złotówki?

## D. Spójność wewnętrzna

14. Czy opis stanu nieruchomości odpowiada ocenom cech przyjętym w obliczeniach?
15. Czy wynik skomentowano względem statystyki próby (flaga odchylenia > progu →
    akapit uzasadnienia obecny; wynik poza przedziałem próby → wyjaśniony)?
16. Czy analiza wrażliwości jest przywołana, a odchylenie scenariusza > 10%
    od bazy skomentowane?
17. Czy wnioski końcowe nie przeczą żadnemu fragmentowi części opisowej?

## E. Kompletność dokumentacyjna

18. Czy protokół kompletności materiałów (rejestr: material) pokrywa się z listą
    załączników; braki odnotowane z datami próśb do zamawiającego?
19. Czy rejestr decyzji przechodzi `rejestr.py check` bez ustaleń (łańcuch,
    chronologia, kompletność etapów, jawne wpisy powrotów)?
20. Czy każda transakcja w XLSX ma wypełnione źródło (tablica wiązań bez
    "ŹRÓDŁO NIEPODANE"), a dane ofertowe, jeśli użyte, są oznaczone jako
    materiał pomocniczy?
