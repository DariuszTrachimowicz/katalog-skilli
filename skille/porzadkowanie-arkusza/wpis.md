---
nazwa: Porządkowanie arkusza
kategoria: Dane
status: gotowy
wersja: 1.0.1
poziom: Działa od razu
aktualizacja: 2026-11-04
skrot: Doprowadza rozjechany arkusz do porządku i pokazuje dziennik każdej zmiany. Nic nie poprawia po cichu.
korzysc: Masz uporządkowany arkusz i dokładnie wiesz, co w nim zmieniono, bo nic nie dzieje się po cichu.
szukaj: excel, arkusz, csv, dane, krzaczki, kodowanie, polskie znaki, Windows-1250, daty, kwoty, duplikaty, NIP, scalone komórki, porządkowanie, sortowanie, łączenie plików, wiersz razem, suma się nie zgadza, import, kod pocztowy, zera, tabela przestawna, średnik
tytulSeo: Jak uporządkować rozjechany plik Excel, narzędzie AI po polsku
opisSeo: Scalone komórki, trzy formaty daty, kwoty jako tekst, krzaczki zamiast polskich znaków. Skill sprząta arkusz i pokazuje, co dokładnie zmienił.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Bierze arkusz, który przeszedł przez kilka rąk, i doprowadza go do stanu, w którym da się zrobić tabelę przestawną albo wgrać dane do innego programu. Rozłącza scalone komórki, wyrzuca nagłówki i sumy z wnętrza tabeli, ujednolica daty i kwoty, odzyskuje polskie znaki po złym kodowaniu, zbiera warianty tej samej nazwy kontrahenta.

Najważniejsze jest to, czego nie robi: nie zmienia niczego po cichu. Do pliku dokłada arkusz „Dziennik zmian”, w odpowiedzi podaje liczbę wierszy i sumę kwot przed i po, a wszystko, czego nie da się rozstrzygnąć z samego pliku, odkłada do Twojej decyzji zamiast zgadywać.

## Dla kogo

Kierowniczki biura, księgowe, koordynatorki projektów, właściciele małych firm. Każdy, kto raz w miesiącu dostaje pliki od kilku osób i musi je złożyć w jedno zestawienie.

## Ile Ci to oszczędza

Ręczne złożenie sześciu plików z różnymi układami kolumn to zwykle pół dnia, i tak kończy się pytaniem, czy na pewno nic nie wypadło. Skill robi rozpoznanie i część mechaniczną w kilka minut, a resztę czasu zabiera Ci odpowiedź na trzy, cztery pytania.

Największa oszczędność nie jest w czasie sprzątania, tylko w tym, że po fakcie widzisz, co zostało zmienione. Poprawianie zestawienia, w którym ktoś kiedyś „ujednolicił daty”, potrafi zająć więcej niż zrobienie go od nowa.

## Przykład z życia

Marta koordynuje szkolenia w firmie z sześcioma oddziałami. Co miesiąc dostaje sześć plików z listami uczestników i kosztami.

W tym miesiącu w 2 480 wierszach było: 214 dat zapisanych jako `12/3/2025` w plikach z jednego oddziału i `3.12.2025` w pozostałych, 96 kwot wpisanych jako tekst z dopiskiem `zł`, jeden plik w kodowaniu, po którym Łódź wyglądała jak `ĹĂłdĹş`, i 37 wariantów zapisu nazw 12 kontrahentów. Do tego wiersze z sumami: w każdym z sześciu plików „RAZEM” na dole, a w dwóch oddziałach dodatkowo po trzy sumy częściowe po kwartałach, razem dwanaście wierszy, które nie są danymi. Po sklejeniu suma kosztów wychodziła o 41 200 zł za wysoka.

Skill poprawił daty w plikach, w których dało się to rozstrzygnąć (w jednym z nich w kolumnie występował dzień 27, co przesądziło kolejność), odzyskał polskie znaki, przeliczył kwoty i podał sumę przed i po. Odłożył do decyzji trzy rzeczy: jeden oddział, w którym żadna data nie miała dnia powyżej 12, wariant „Delta Szkolenia Oddz. 2” występujący w dwóch wierszach oraz dwa numery NIP, w których ostatnia cyfra nie zgadza się z resztą numeru.

Marta odpowiedziała na trzy pytania i miała gotowe zestawienie z 2 468 wierszami, dwanaście usuniętych to wiersze z sumami, wypisane co do jednego i usunięte dopiero po jej potwierdzeniu.

## Jak po polsku

Cała wartość siedzi tutaj. Skill zna wzorce, które psują polskie arkusze i których nie ma w żadnym anglojęzycznym narzędziu:

- **Przecinek kontra kropka.** `1 200,50` to u nas kwota, ale plik po podróży przez angielski system wygląda jak `1,200.50`. Skill ma regułę rozstrzygania i sprawdza sumę kolumny przed i po, żeby wyłapać zjedzony przecinek.
- **Kodowanie.** Polskie programy księgowe wciąż eksportują w Windows-1250, starsze systemy w ISO-8859-2, reszta świata w UTF-8. Skill rozpoznaje po objawach, który to przypadek, a te dwa pierwsze różnią się tylko trzema literami, więc pomyłka podmienia litery w gotowym pliku. Wie też, kiedy ogonków **nie da się** już odzyskać, i wtedy mówi to zamiast zgadywać, czy „Lacki” to „Łącki”.
- **Średnik zamiast przecinka** jako znak rozdzielający kolumny w polskim Excelu.
- **Daty.** `2025-12-03`, `03.12.2025`, `3 XII 2025`, `3 grudnia 2025 r.` i amerykańskie `12/3/2025` w jednej kolumnie. Kolejność dzień-miesiąc rozstrzyga na podstawie całej kolumny, nie pojedynczego wiersza.
- **NIP, REGON, KRS, PESEL, numer konta, kod pocztowy.** Zna warianty zapisu (`123-456-32-18`, `PL1234563218`), sprawdza cyfrę kontrolną NIP, czyli ostatnią cyfrę NIP-u, wyliczaną z dziewięciu poprzednich; jeśli się nie zgadza, numer został gdzieś przekręcony, i długość numeru konta. Wie, że PESEL zaczyna się od zera tylko w rocznikach 2000-2009 i 1900-1909, więc nie „naprawia” numerów, którym nic nie brakuje. Nigdy nie poprawia, zgłasza.
- **Nazwy firm.** `sp. z o.o.`, `Sp. z o. o.`, `SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ` i `spzoo` to ta sama firma. `Oddz. 2` to niekoniecznie.
- **Sortowanie z ogonkami.** Przy sortowaniu po kodzie znaku wyrazy zaczynające się od `Ą`, `Ć`, `Ł`, `Ó`, `Ś`, `Ź`, `Ż` lądują za całym alfabetem, Łódź po Zabrzu, Ćma po Żabie. W polskiej kolejności `ą` stoi zaraz po `a`, a `ł` zaraz po `l`.

## Czego potrzebujesz

Dowolny płatny plan Claude i plik: XLSX, CSV albo arkusz wyeksportowany z Arkuszy Google. Żadnych konektorów, żadnej konfiguracji.

Na starcie skill zadaje jedno zbiorcze pytanie: co ma być efektem, czy pliki łączyć w jeden i która kolumna identyfikuje wiersz. Bez odpowiedzi na to ostatnie nie wie, co jest duplikatem. To jedno pytanie, nie ustawienia, odpowiadasz na nie w zdaniu i skill rusza.

## Na czym się wywala

- **Nieodwracalne uszkodzenia z przeszłości.** Jeśli ktoś wcześniej otworzył CSV w Excelu i zapisał, długie numery kont mogły zamienić się w `1,23E+15`, a kod pocztowy zapisany bez myślnika (`00950`) stracić zera i zostać jako `950`. Tych cyfr nie ma już w pliku. Skill to rozpozna i poprosi o oryginał, odtwarzanie ich byłoby wymyślaniem danych.
- **Stary format XLS.** Binarne pliki `.xls` bywają nieczytelne bez wcześniejszej konwersji. Skill powie, że nie umie ich otworzyć, i poprosi o zapisanie pliku jako XLSX, nie zgadnie zawartości, której nie odczytał.
- **Nierozstrzygalne daty.** Kolumna, w której każdy dzień jest mniejszy niż 13, nie daje się rozstrzygnąć na podstawie zawartości. Skill nie wybierze za Ciebie i odda całą kolumnę do decyzji, nawet jeśli to setki wierszy.
- **Formuły, makra i formatowanie.** Skill pracuje na wartościach. Formuły, formatowanie warunkowe, kolory komórek i makra nie przechodzą do kopii. Jeśli kolor komórki był u Was jedyną informacją o statusie, powie o tym i zaproponuje przeniesienie do zwykłej kolumny, ale sam tego nie odgadnie.
- **Bardzo duże pliki.** Liczby kontrolne, liczba wierszy i sumy kolumn przed i po, skill liczy zawsze na całości, bo inaczej nie byłyby dowodem na nic. Na próbkach ogląda co najwyżej strukturę pliku: gdzie zaczynają się dane i jakie formaty w nim występują. Przy kilkudziesięciu tysiącach wierszy rozpoznanie wariantów nazw bywa więc niepełne i skill to zaznaczy.
- **Skany, zdjęcia tabel i PDF-y.** Arkusz będący zdjęciem albo PDF-em to inne zadanie, tu poza zakresem. To samo dotyczy przepisywania faktur do zestawienia.
- **Arkusze o różnych układach kolumn.** Skill nie zgadnie, że „Wartość netto” w jednym pliku i „Kwota” w drugim to to samo. Zapyta.

## Czego ten skill nie robi celowo

Nie analizuje danych, nie wyciąga wniosków, nie rysuje wykresów i nie odpowiada na pytanie „dlaczego w marcu było mniej”. Sprzątanie i interpretacja to dwie różne prace i mieszanie ich jest niebezpieczne, narzędzie, które w trakcie porządkowania dorzuca wyjaśnienia, brzmi równie pewnie, gdy zna przyczynę, i gdy ją wymyśla.

Nie uzupełnia braków, nie usuwa wierszy bez zgody, nie scala podobnych nazw z automatu i nie poprawia numerów, które nie przechodzą kontroli. Wszystko, co nie wynika jednoznacznie z pliku, trafia na listę „Do Twojej decyzji”, nawet gdy poprosisz, żeby nie pytać, i nawet gdy poprosisz drugi raz.

Pustej komórki nie wypełni ani średnią, ani wartością z wiersza wyżej, ani niczym znalezionym poza plikiem. Jeśli podasz konkretną wartość i konkretne wiersze, wpisze ją w nowej kolumnie „Uzupełnione ręcznie”, obok pustej komórki, nie zamiast niej. Po trzech miesiącach nikt już nie odróżni wstawionej średniej od prawdziwej liczby i to jest cały powód tej reguły.

Nie orzeka też, czy dane są poprawne w rozumieniu przepisów. Mówi, co się stanie w praktyce: że przelew na numer o 25 cyfrach nie przejdzie, a faktura z błędnym NIP wróci do poprawki.

## Najczęstsze pytania

### Jak uporządkować rozjechany plik Excel?

Wrzuć plik, a skill rozłączy scalone komórki, oddzieli nagłówki i sumy ze środka tabeli od danych, ujednolici daty i kwoty, odzyska polskie znaki i zbierze warianty nazw kontrahentów. Do pliku dokłada arkusz „Dziennik zmian”, a w odpowiedzi podaje liczbę wierszy i sumę kwot przed i po.

### Czy AI samo poprawi błędne NIP-y i uzupełni puste komórki?

Nie, skill nie poprawia numerów, które nie przechodzą kontroli, tylko je zgłasza. Pustej komórki nie wypełni średnią ani wartością z wiersza wyżej, a wierszy nie usunie bez Twojej zgody. Wszystko, czego nie da się rozstrzygnąć z samego pliku, trafia na listę „Do Twojej decyzji”.

### Jak naprawić krzaczki zamiast polskich znaków w pliku CSV?

Skill rozpoznaje po objawach, czy plik jest w kodowaniu Windows-1250, ISO-8859-2 czy UTF-8, i odzyskuje polskie znaki. Gdy ogonków nie da się już odzyskać, mówi to wprost, zamiast zgadywać, czy „Lacki” to „Łącki”.

### Czy połączy pliki od kilku osób w jedno zestawienie?

Tak, i pilnuje przy tym liczb kontrolnych, czyli liczby wierszy i sumy kwot przed sklejeniem i po nim. Nie zgadnie jednak, że „Wartość netto” w jednym pliku i „Kwota” w drugim to to samo, więc zapyta. Na starcie musi też wiedzieć, która kolumna identyfikuje wiersz, bo inaczej nie rozpozna duplikatów.

### Co zrobi z datami zapisanymi w kolumnie na różne sposoby?

Ujednolici je tam, gdzie da się to rozstrzygnąć na podstawie całej kolumny, na przykład gdy pojawia się dzień większy niż 12. Jeśli każdy dzień w kolumnie jest mniejszy niż 13, nie wybierze za Ciebie kolejności dnia i miesiąca, tylko odda całą kolumnę do Twojej decyzji.

### Ile kosztuje skill do porządkowania arkuszy i gdzie działa?

Nic, skill jest darmowy i udostępniony na licencji GPL, a plik .skill dostajesz linkiem na e-mail po podaniu adresu na karcie skilla. W Claude działa na dowolnym płatnym planie, w ChatGPT wymaga planu Business, Enterprise, Edu lub Healthcare, a w Gemini w Polsce instrukcje wkleja się do rozmowy albo Gema.
