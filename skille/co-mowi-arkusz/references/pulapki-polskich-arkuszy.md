# Pułapki polskich arkuszy — lista kontrolna

Otwórz przy pierwszym kontakcie z plikiem, przed policzeniem czegokolwiek. Każda pozycja to błąd, który daje wynik pewnie wyglądający i nieprawdziwy.

## 1. Liczby, które nie są liczbami

- **Przecinek dziesiętny.** W polskich ustawieniach `1 250,50` to tysiąc dwieście pięćdziesiąt złotych i pięćdziesiąt groszy. Jeśli plik przeszedł przez system anglojęzyczny, ta sama wartość bywa `1,250.50` — i wtedy przecinek jest separatorem tysięcy. Sprawdź kilka wartości z różnych rzędów wielkości, zanim uznasz, który to format. Pomylenie zmienia wynik tysiąckrotnie.
- **Spacja jako separator tysięcy.** `128 450,30` to jedna liczba. Bardzo często jest to spacja nierozdzielająca (znak niewidoczny, inny niż zwykła spacja) i wtedy arkusz trzyma to jako tekst, a suma pokazuje zero albo pomija te wiersze.
- **Złotówka w komórce.** `1 250,50 zł` z jednostką wpisaną ręcznie to tekst. Kolumna, w której część wierszy ma „zł”, a część nie, prawie na pewno sumuje się źle.
- **Minus po liczbie albo w nawiasie.** `1 200-` i `(1 200)` to wartości ujemne. Systemy księgowe eksportują je na oba sposoby.
- **Kropka jako separator tysięcy.** W eksportach z niektórych systemów `1.250` znaczy tysiąc dwieście pięćdziesiąt, nie jeden i ćwierć. Rozstrzygaj po kontekście kolumny, nie po pojedynczej komórce.
- **Zaokrąglenia na poziomie grosza.** Suma pozycji faktury bywa o 1–2 grosze różna od kwoty faktury. To normalne. Nie zgłaszaj tego jako anomalii i nie buduj na tym wniosku.

## 2. Daty

- **Format dwuznaczny.** `03.04.2026` po polsku to 3 kwietnia. Jeśli plik przeszedł przez narzędzie z ustawieniami amerykańskimi, ta sama komórka bywa 4 marca. Sprawdź, czy w kolumnie występuje dzień powyżej 12 — jeśli tak i stoi na pierwszym miejscu, format jest polski.
- **Daty jako tekst.** Eksport z ERP często daje datę tekstem (`2026-03-12`, `12-03-2026`, `12/03/2026`). Sortowanie takiej kolumny układa marzec przed lutym.
- **Polskie nazwy i skróty miesięcy** w nagłówkach: styczeń, luty, marzec…, skróty `sty lut mar kwi maj cze lip sie wrz paź lis gru`. Kolumny nazwane skrótami układaj po kolejności miesięcy, nie alfabetycznie.
- **Odmiana w nagłówkach.** „za styczeń”, „I kwartał”, „I półrocze”, „narastająco”. „Narastająco” znaczy sumę od początku roku — nie sumuj takich kolumn ponownie, bo policzysz to samo wielokrotnie.
- **Dwie różne daty na fakturze.** Data wystawienia i data sprzedaży to nie to samo i potrafią wpaść w różne miesiące. Ustal, po której kolumnie liczysz okres, i napisz to w odpowiedzi.
- **Termin płatności i data zapłaty** to jeszcze inne kolumny. Sprzedaż liczona po dacie zapłaty daje inną liczbę niż po dacie sprzedaży. To najczęstsze źródło rozjazdu między „sprzedażą” a „wpływami”.

## 3. Kodowanie i nagłówki

- **Krzaki zamiast polskich znaków** (`Ĺódĺş`, `Å‚`, `?ód?`) — plik zapisany w jednym kodowaniu, otwarty w innym. Nazwy z krzakami traktuj jako nierozpoznane, nie jako różne wartości. Ta sama firma może występować jako dwa różne wpisy.
- **Zera wiodące.** Kod pocztowy `01-234` potrafi stracić zero albo zamienić się w datę. W kolumnie z NIP-em wartość dziewięcioznakowa jest sygnałem, że coś jest nie tak — to bywa REGON zamiast NIP-u (REGON ma dokładnie dziewięć cyfr), ucięte zero wiodące albo zwykła literówka. Zgłoś to jako [SPRAWDŹ] i napisz, ilu wierszy dotyczy. **Nigdy nie dopisuj brakującej cyfry ani nie zgaduj poprawnego numeru** — „przywrócone” zero tworzy numer istniejącej albo nieistniejącej firmy, a w odpowiedzi wygląda dokładnie tak samo jak odczyt z komórki.
- **Numer dokumentu zamieniony na datę.** `5/03` albo `12/2026` bywa wczytane jako data. Kolumna z numerami dokumentów, w której są daty, jest uszkodzona.
- **Nagłówek nie w pierwszym wierszu.** Eksporty z polskich systemów wstawiają nad tabelą nazwę firmy, zakres raportu i datę wydruku. Prawdziwe nagłówki są w wierszu 4–8.
- **Wiersze podsumowań w środku danych.** „Razem”, „Suma”, „Ogółem”, „Razem dla kontrahenta” — wciągnięte do obliczeń podwajają wynik. Szukaj ich także pod grupami, nie tylko na końcu.
- **Scalone komórki i puste wiersze rozdzielające grupy** — typowe w wydrukach, psują odczyt kolumn.

## 4. Nazwy kolumn w polskich systemach

Typowe nagłówki w eksportach z Comarch ERP Optima, Subiekta, WAPRO, Symfonii, enovy, wFirmy i ifirmy:

`Lp.` · `Numer dokumentu` · `Nr faktury` · `Data wystawienia` · `Data sprzedaży` · `Data zapłaty` · `Termin płatności` · `Kontrahent` · `Nabywca` · `NIP` · `Netto` · `Wartość netto` · `VAT` · `Stawka VAT` · `Brutto` · `Wartość brutto` · `Waluta` · `Kurs` · `Magazyn` · `Indeks` · `Symbol` · `Nazwa towaru` · `Ilość` · `JM` · `Cena netto` · `Rabat` · `Marża` · `Zysk` · `Handlowiec` · `Opiekun` · `Kategoria` · `MPK` · `Konto` · `Wn` · `Ma` · `Saldo` · `Status` · `Uwagi`

Rzeczy, które mylą najczęściej:

- **Netto i brutto** stoją obok siebie i różnią się o VAT. Suma kolumny „Brutto” nie jest przychodem firmy — zawiera podatek. Zapytaj, o którą liczbę chodzi, zamiast wybierać.
- **Marża i narzut to nie to samo.** Marża liczy zysk od ceny sprzedaży, narzut od ceny zakupu. Ta sama transakcja to marża 20% i narzut 25%. Jeśli kolumna nazywa się „Marża”, a wartości wyglądają na policzone od zakupu, powiedz o wątpliwości zamiast liczyć dalej.
- **`Wn` i `Ma`** to strony księgowania, nie przychód i koszt. Nie sumuj ich razem i nie interpretuj bez pytania.
- **`MPK`** to miejsce powstawania kosztów, czyli dział lub projekt, na który koszt jest przypisany.
- **`Saldo`** bywa liczone narastająco. Sumowanie kolumny salda prawie zawsze nie ma sensu.

## 5. Co psuje sumę sprzedaży

- **Faktury korygujące** mają kwoty ujemne (korekta „in minus”) albo dodatnie (korekta „in plus”). Jeśli w pliku są ujemne wiersze, a użytkownik podaje sumę bez nich, jego liczba jest zawyżona. Sprawdź, ile wierszy ma wartości ujemne i ile to razem.
- **Faktura zaliczkowa i faktura końcowa** dotyczą tej samej sprzedaży. Zsumowane razem liczą ją dwa razy.
- **Duplikaty faktury** (ten sam numer wystawiony powtórnie) i faktury anulowane bywają w eksporcie. Policz powtórzenia w kolumnie z numerem dokumentu.
- **Faktury proforma** to nie sprzedaż. Jeśli w numerze albo statusie widać „PRO”, odłóż je osobno.
- **Sprzedaż w walucie obcej.** Kolumny `Waluta` i `Kurs` znaczą, że część wierszy jest w euro. Suma kolumny netto bez przeliczenia jest bezwartościowa.
- **Sprzedaż paragonowa zbiorczo.** Jeden wiersz „raport dobowy” na kilkaset transakcji zaburza liczenie średniej wartości transakcji.

## 6. Rok 2026: numer KSeF w zestawieniach

W zestawieniach z 2026 roku pojawia się nowa kolumna z numerem faktury z Krajowego Systemu e-Faktur (KSeF).

**Jak ten numer wygląda.** To kilkadziesiąt znaków rozdzielonych myślnikami: NIP wystawcy, data w układzie RRRRMMDD, człon techniczny nadany przez system i dwuznakowa suma kontrolna. Z grubsza tak: `1234567890-20260418-ABCDEF-GHIJKL-42` (to schemat, nie prawdziwy numer). Człon techniczny i suma kontrolna zawierają zarówno cyfry, jak i litery, więc arkusz trzyma całość jako tekst. **To nie jest uszkodzona kolumna liczbowa i nie zgłaszaj tego jako [SPRAWDŹ].** Nie szukaj też „kolumny z długim ciągiem cyfr” — po myślnikach i literach rozpoznasz ją szybciej niż po długości.

Największe firmy zaczęły mieć tę kolumnę od lutego, reszta rynku od kwietnia; najmniejsi wystawcy mogą jej w ogóle nie mieć jeszcze w tym roku. **Tych dat nie przenosisz do odpowiedzi.** Służą Ci wyłącznie do tego, żeby nie uznać braku numeru KSeF za lukę w danych — powiedziane użytkownikowi, zabrzmią jak informacja o jego własnych obowiązkach, a tego nie wiesz i nie oceniasz.

Praktyczne skutki dla odczytu arkusza:

- W pliku obejmującym cały rok część wierszy ma numer KSeF, a część nie. **To nie jest błąd w danych i nie jest anomalią sprzedażową.** Nie opisuj tego jako luki.
- Numeracja i format numerów dokumentów potrafią zmienić się w połowie roku. Nie licz tego jako zmiany wolumenu.
- Może się pojawić skok liczby dokumentów w miesiącu przejścia, wynikający z porządkowania wystawiania, nie ze sprzedaży. Oznacz to jako [SPRAWDŹ], nie jako wzrost.

Nie orzekaj, czy firma ma obowiązek wystawiania faktur w tym systemie, czy nie, i nie doradzaj w tej sprawie. To pytanie do księgowej.
