# Kontrole przed wpisaniem wiersza do tabeli

Przejdź całą listę dla każdej faktury. Kontrola, która nie przechodzi, **nie kasuje wiersza** — wiersz zostaje z tym, co odczytałeś, a rozbieżność trafia do sekcji „Do sprawdzenia ręcznie” z pokazanym rachunkiem.

---

## 1. Rachunek w obrębie jednej faktury

- Netto + VAT = brutto **w każdej stawce osobno**.
- Suma wszystkich stawek = kwota „Razem do zapłaty”.
- VAT ≈ netto × stawka dla każdej stawki.

Tolerancja: **1 gr na stawkę**. Różnica bierze się z tego, że część programów liczy podatek od każdej pozycji, a część od sumy netto w stawce. Powyżej tego progu masz albo błąd odczytu, albo błąd na fakturze — i jednego od drugiego nie rozstrzygasz.

Gdy suma pozycji nie zgadza się z podsumowaniem VAT na dole dokumentu, **bierz podsumowanie** (to ono jest źródłem dla ewidencji) i zgłoś różnicę.

## 2. Kontrola krzyżowa brutto

Porównaj brutto z trzema źródłami, jeśli występują: kwota słownie, pole „Do zapłaty”, suma tabelki podsumowania. Kwota słownie łapie przestawione cyfry, których żadna inna kontrola nie widzi — `2 460,00` odczytane jako `2 640,00` przechodzi przez sprawdzenie netto + VAT, bo obie liczby są arytmetycznie spójne w swoim wierszu.

## 3. Poprawność identyfikatorów

- NIP: dziesięć cyfr, suma kontrolna się zgadza. Liczysz tak: **dziewięć pierwszych cyfr** mnożysz przez wagi 6, 5, 7, 2, 3, 4, 5, 6, 7 (waga na cyfrę, po kolei), sumujesz iloczyny i bierzesz resztę z dzielenia przez 11 — ma być równa **cyfrze dziesiątej**. Reszta równa 10 oznacza numer nieprawidłowy, a nie cyfrę kontrolną „10”.
- Rachunek: 26 cyfr.
- Nie mylisz NIP z REGON (9 lub 14 cyfr), KRS ani BDO.

Jeśli suma kontrolna NIP nie wychodzi, najczęstsze przyczyny to `0`↔`O`, `1`↔`7`, `5`↔`6`, `8`↔`B` oraz zamiana sąsiednich cyfr. **Nie zgaduj poprawnej wersji** — wpisz odczytaną i zgłoś.

## 4. Sensowność dat

- Data sprzedaży nie jest późniejsza niż data wystawienia o więcej niż **około dwa miesiące**.
- Data wystawienia nie jest z przyszłości i nie odbiega o lata od reszty partii (typowy błąd odczytu: `2026` jako `2020`, `2028` jako `2026`).
- Termin płatności nie jest wcześniejszy niż data wystawienia.

Faktura wystawiona w kolejnym miesiącu po sprzedaży to **normalna sytuacja**, nie błąd. Nie zrównuj dat.

Tak samo normalna jest sytuacja odwrotna: **faktura wystawiona z wyprzedzeniem, przed dostawą albo przed wykonaniem usługi**. Przy abonamentach, przedpłatach, czynszach płatnych z góry i zamówieniach składanych wcześniej to codzienność. Dlatego próg jest tu tak szeroki — kontrola z progiem kilku dni wstrzymywałaby dziesiątki poprawnych wierszy, a sekcja „Do sprawdzenia ręcznie” zasypana poprawnymi pozycjami przestaje być czytana i traci cały sens.

## 5. Kontrole na poziomie całej partii

- **Ten sam numer faktury dwa razy** — duplikat albo dwa pliki tego samego dokumentu. Podwójne zaksięgowanie jest jednym z najczęstszych i najdroższych błędów w biurze rachunkowym. Zgłoś zawsze, nawet gdy kwoty się różnią.
- **Ten sam kontrahent z różnymi numerami rachunku** — zgłoś jako rzecz do potwierdzenia telefonicznie, nie mailowo. Podmiana numeru w podrobionej fakturze to typowy sposób okradania firm.
- **Nietypowo wysoka kwota na tle reszty partii** — jedno zdanie w uwagach wystarczy.
- **Luka w numeracji** przy fakturach sprzedażowych od jednego wystawcy — może oznaczać brakujący plik.
- Faktura zaliczkowa i końcowa od tego samego kontrahenta w jednej partii — sprawdź, czy sumowanie ich obu nie podwaja kwoty.

## 6. Kiedy wstrzymujesz wiersz i pytasz

Nie wpisuj do tabeli, tylko zgłoś, gdy:

- rozbieżność sum przekracza tolerancję i nie widać, skąd się bierze,
- pole jest nieczytelne (pieczątka na kwocie, zagięcie, zbyt niska rozdzielczość, obrócony skan),
- na jednej stronie są dwa dokumenty,
- dokument jest w obcej walucie i użytkownik nie powiedział, jak ma być ujęty,
- to pro forma, duplikat, korekta, faktura zaliczkowa lub VAT RR,
- brakuje którejkolwiek z podstaw: numeru, daty wystawienia, kwoty brutto, NIP-u sprzedawcy.

Zgłoszenie ma zawsze cztery elementy: **nazwa pliku, czego dotyczy, co odczytałeś, co proponujesz obejrzeć**. Bez nazwy pliku informacja jest bezużyteczna przy partii kilkudziesięciu faktur.

## 7. Czego kontrola nie obejmuje — powiedz to użytkownikowi

- Nie sprawdzasz kontrahenta w wykazie podatników VAT ani rachunku w tym wykazie. Nie masz do niego dostępu.
- Nie sprawdzasz, czy stawka VAT jest właściwa dla danego towaru.
- Nie sprawdzasz, czy faktura w ogóle powinna była powstać ani czy dokumentuje rzeczywistą transakcję.
- Nie porównujesz faktury z zamówieniem, umową ani protokołem odbioru.

To granice narzędzia, nie jego wady — ale użytkownik musi je znać, zanim zaufa tabeli.
