# Lista kontrolna porządkowania

Idź po kolei. Każdy krok zakłada, że poprzedni się udał, ujednolicanie dat w pliku, w którym nagłówek jest w wierszu siódmym, kończy się poprawianiem tytułu tabeli.

## 1. Rozpoznanie

- Ile arkuszy. Które zawierają dane, a które są notatką, słownikiem albo starą wersją.
- Czy arkusze mają ten sam układ kolumn. Jeśli nie, nie łącz ich, dopóki nie ustalisz, która kolumna z jednego pliku odpowiada której z drugiego.
- Gdzie zaczynają się dane: pierwszy wiersz, w którym każda wypełniona komórka jest wartością, a nie opisem.
- Czy plik ma ukryte wiersze, ukryte kolumny albo ukryte arkusze. Ukryte zwykle znaczy „ktoś je wyłączył z liczenia”, pokaż i zapytaj.
- Czy są filtry, zamrożone panele, formatowanie warunkowe, komentarze. Kolor komórki bywa jedyną informacją o statusie i przy przepisywaniu ginie. Jeśli widzisz systematyczne kolorowanie, zapytaj, co oznacza, i zaproponuj przeniesienie tego do zwykłej kolumny.

## 2. Scalone komórki

Scalenie to formatowanie, nie dane. Po rozłączeniu wartość zostaje w lewej górnej komórce, reszta jest pusta.

- Scalenie w nagłówku (jeden podpis nad kilkoma kolumnami), rozłącz i zbuduj z dwóch poziomów jedną nazwę kolumny: `Sprzedaż 2025, I kwartał`.
- Scalenie w pierwszej kolumnie (nazwa kategorii obejmuje kilka wierszy), rozłącz i powiel wartość w dół. To jedyny przypadek uzupełniania pustych komórek, który wolno zrobić bez pytania, bo scalenie samo mówi, że wartość dotyczy całego bloku. Zapisz w dzienniku, ilu wierszy dotyczyło.
- Scalenie w środku danych, obejmujące różne wartości, zgłoś, nie rozstrzygaj.

## 3. Nagłówki

- Jeden wiersz nagłówka. Jeśli są dwa piętra, sklej w jeden.
- Nazwy kolumn niepuste i niepowtarzalne. Powtórzone (`Kwota`, `Kwota`) rozróżnij tak, żeby było widać, skąd pochodzą, i zgłoś.
- Nagłówki powtórzone w środku tabeli (bo ktoś wkleił drugi zestaw danych), oznacz, policz i wypisz z numerami wierszy i treścią, do potwierdzenia jednym „tak”. Nie usuwaj ich sam: wiersz danych, w którym wszystkie pola przypadkiem odpowiadają nazwom kolumn, wygląda identycznie. To jest miejsce, w którym najczęściej gubi się prawdziwy wiersz danych.
- Nagłówek nie może zawierać znaku końca linii ani spacji na końcu, to niewidoczne, a psuje wyszukiwanie.

## 4. Wiersze, które nie są danymi

Znajdź i oznacz, nie usuwaj bez zgody:

- puste wiersze rozdzielające sekcje,
- sumy częściowe i wiersz „RAZEM” w środku albo na końcu, po połączeniu plików sumy liczą się podwójnie, to najczęstsza przyczyna raportu z dwukrotnie zawyżoną kwotą,
- komentarze i notatki wpisane w kolumnę danych („uzgodnione z Kasią”, „do wyjaśnienia”),
- stopki, daty wydruku, nazwy systemu na dole eksportu,
- wiersze pomocnicze z formułą liczącą coś na boku.

Przedstaw je jako listę z numerami wierszy i treścią, żeby użytkownik potwierdził jednym „tak”.

## 5. Kolumny

- Kolumny całkowicie puste, zgłoś, zaproponuj usunięcie.
- Kolumna zawierająca dwie różne wielkości (kwota netto i brutto pomieszane), zgłoś, nie rozdzielaj samodzielnie.
- Dwie wielkości w jednej komórce (`Kowalski / 1200 zł`, `2025-03-01 do 2025-03-31`), rozdziel tylko przy jednoznacznym wzorcu i tylko wtedy, gdy obejmuje ponad 80 procent wierszy. Wiersze niepasujące do wzorca wypisz co do jednego.
- Kolumna z mieszanką tekstu i liczb, sprawdź, ile wierszy jest którego rodzaju, zanim uznasz jedną z form za błąd.

## 6. Formaty

Tutaj otwórz `polskie-formaty.md` i przejdź przez daty, kwoty, kodowanie znaków i numery identyfikacyjne.

Kolejność: najpierw kodowanie (bo bez niego nie rozpoznasz nazw), potem daty, potem kwoty, na końcu numery.

## 7. Powtórzenia

- Duplikat pełny (wszystkie kolumny identyczne), zgłoś z liczbą, zaproponuj usunięcie.
- Duplikat po kluczu (ten sam numer faktury, różne kwoty), **nigdy nie usuwaj automatycznie**. To zwykle korekta albo błąd wprowadzania i tylko użytkownik wie, która wersja jest właściwa. Pokaż obie obok siebie.
- Duplikat po zbliżonej nazwie, patrz sekcja o nazwach kontrahentów w `polskie-formaty.md`. To propozycja, nie zmiana.

Po połączeniu plików od kilku osób dopisz kolumnę z nazwą pliku źródłowego. Bez niej nie da się dojść, skąd wziął się sporny wiersz, a ktoś zapyta.

## 8. Kontrola przed oddaniem

Przejdź te punkty i wynik wpisz do sekcji „Liczby kontrolne”:

- liczba wierszy z danymi przed i po, z wyjaśnieniem każdej różnicy,
- suma każdej kolumny kwotowej przed i po,
- liczba pustych komórek w kolumnach kluczowych przed i po (nie powinna spaść, chyba że coś świadomie uzupełniałeś),
- zakres dat: najstarsza i najnowsza. Data w przyszłości albo sprzed 2000 roku w pliku z fakturami to sygnał, że konwersja poszła źle,
- liczba pozycji w arkuszu `Dziennik zmian`, musi się zgadzać z sumą liczb z tabeli „Co poprawiłem bez pytania”. Jeśli pliku nie udało się zapisać, liczysz pozycje w dzienniku oddanym jako tabela w odpowiedzi i mówisz wprost, że pliku nie ma.

Wszystkie te liczby policz na całym zbiorze. Próbka służy do rozpoznania struktury pliku, nie do liczb kontrolnych, liczba kontrolna z próbki nie jest liczbą kontrolną.

Jeśli którakolwiek liczba się nie zgadza, napisz o tym w pierwszym akapicie odpowiedzi. Cichy błąd w sprzątaniu danych jest gorszy niż brudny plik, bo brudnemu plikowi nikt nie ufa.
