# Formaty eksportu i praca z plikiem

Otwórz przy każdym pliku CSV lub XLSX z wynikami ankiety.

## Zanim policzysz, sprawdź plik

1. **Ile wierszy to odpowiedzi.** Pierwszy wiersz zwykle zawiera pełną treść pytań, czasem w dwóch wierszach (pytanie i podpytanie). Czasem pod tabelą siedzi wiersz z sumami, wyrzuć go, bo policzony jako respondent zniekształci wszystko.
2. **Które kolumny to nie odpowiedzi.** Identyfikator wypełnienia, data rozpoczęcia i zakończenia, czas wypełniania, adres IP, przeglądarka, urządzenie, token respondenta, punkty w teście. To metadane, nie licz ich jako pytań i nie przepisuj do odpowiedzi.
3. **Wypełnienia porzucone.** Wiersz z datą rozpoczęcia i bez zakończenia to zwykle ankieta przerwana. Policz je, powiedz ile było, i zdecyduj świadomie, czy wchodzą do N, a decyzję zapisz w opisie danych.
4. **Duplikaty.** Ten sam adres e-mail albo bardzo podobne wiersze wypełnione w odstępie minuty to zwykle jedna osoba, która wysłała dwa razy.
5. **Czas wypełniania.** Ankieta na dwadzieścia pytań wypełniona w czterdzieści sekund to klikanie w kratki. Jeśli takich wierszy jest sporo, zgłoś to i podaj wynik z nimi i bez nich.

## Polski CSV, gdzie pęka

- **Separator.** W polskich ustawieniach Windows przecinek jest separatorem dziesiętnym, więc pliki eksportowane pod Excela używają średnika. Plik z Google Forms używa przecinka. Jeśli wszystkie dane siedzą w jednej kolumnie, przyczyną jest zły separator, a nie zepsuty eksport.
- **Kodowanie.** Eksport w UTF-8 otwarty w polskim Excelu bez wskazania kodowania zamienia polskie znaki w krzaki („Łódź” na „ĹĂłdĹş”). Jeśli widzisz taki tekst, czytaj plik jako UTF-8, zamiast zgadywać, co respondent miał na myśli. Nigdy nie „poprawiaj” zniekształconego słowa domysłem.
- **Przecinek dziesiętny.** Ocena zapisana jako „4,5” bywa wczytana jako tekst albo jako 45. Sprawdź zakres wartości w kolumnie ocen, zanim policzysz medianę.
- **Zamiana na daty.** Excel zamienia na daty ciągi typu „1-5”, „01-05”, „3/4”, czyli numery oddziałów, kody przedziałów i pozycje kafeterii zapisane z myślnikiem albo ukośnikiem. Polski kod pocztowy 01-234 zostaje tekstem, bo 234 nie jest ani miesiącem, ani dniem. Osobno: długie numery Excel zapisuje wykładniczo. Jeśli w kolumnie metryczkowej widzisz daty tam, gdzie powinny być numery oddziałów albo przedziały, powiedz o tym użytkownikowi, te wartości Excel przeliczył przy zapisie i nie da się ich odzyskać zgadywaniem.
- **Wiodące zera.** Znikają przy imporcie, ale tylko przy wartościach czysto liczbowych: numer oddziału 007 wczytuje się jako 7, identyfikator sklepu 0123 jako 123. Kodu pocztowego to nie dotyczy, 01-234 z myślnikiem zostaje tekstem i zer nie traci.

## Jak wygląda wielokrotny wybór

Trzy warianty, każdy liczy się inaczej:

- **Jedna kolumna, odpowiedzi sklejone.** Wartości oddzielone przecinkiem albo średnikiem w jednej komórce. Rozbij je, zanim policzysz, inaczej każda kombinacja stanie się osobną „odpowiedzią” i dostaniesz trzydzieści kategorii po jednej osobie.
- **Kolumna na każdą opcję**, z 1 i 0 albo z tekstem i pustką. Podstawą jest liczba respondentów, nie liczba zaznaczeń.
- **Matryca pytań** rozpisana na kolumny „Pytanie [Wiersz]”. Każda kolumna to osobne pytanie z tą samą skalą.

Przy wielokrotnym wyborze udziały nie sumują się do 100%, napisz to przy tabeli, bo odbiorca odruchowo sprawdza sumę.

## Odpowiedzi własne przy „inne”

Narzędzia zapisują je albo w osobnej kolumnie („odpowiedź własna”, „pogłębienie”), albo doklejają do tej samej komórki. Przejrzyj je zawsze, bardzo często zawierają odpowiedź, której zabrakło w kafeterii, i to jest realne znalezisko. Jeśli kilkanaście osób wpisało w „inne” to samo, powiedz to wprost.

## Skąd pochodzi plik

Rozpoznanie narzędzia pomaga zrozumieć układ, ale nie zmienia reguł liczenia:

- **Webankieta, Interankiety, Ankieteo, SurveyLab, Survio, LimeSurvey**, eksport surowych danych z blokiem metadanych, często z tokenem respondenta i adresem IP. Token łamie anonimowość nawet przy ankiecie ogłoszonej jako anonimowa.
- **Google Forms**, arkusz z sygnaturą czasu w pierwszej kolumnie, nagłówki równe pełnej treści pytań, przecinek jako separator w CSV. Jeśli włączono zbieranie adresów, e-maile są w drugiej kolumnie.
- **Microsoft Forms**, eksport do Excela z kolumnami „Identyfikator”, „Godzina rozpoczęcia”, „Godzina ukończenia”, „Adres e-mail”, „Nazwa”. Przy ankiecie firmowej w organizacji imię i nazwisko bywa dopisywane automatycznie, choć autor ankiety był przekonany, że zbiera anonimowo. Sprawdź to i powiedz użytkownikowi.
- **Arkusz zbierany ręcznie**, najczęściej ma niespójne wartości w tej samej kolumnie („tak”, „Tak”, „T”, „x”). Ujednolicaj i napisz, co ujednoliciłeś.

## Czego z pliku nie przepisujesz

Imion i nazwisk, adresów e-mail, numerów telefonów, adresów IP, tokenów respondenta, nazw stanowisk, które w małej firmie zajmuje jedna osoba. Jeśli musisz odwołać się do konkretnego wiersza, użyj numeru odpowiedzi bez danych osobowych.
