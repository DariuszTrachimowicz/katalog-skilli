---
nazwa: Faktura do tabeli
kategoria: Finanse
status: gotowy
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Przepisuje faktury z PDF-ów i skanów do jednej tabeli gotowej do księgowania, z rozbiciem na stawki VAT i kontrolą, czy sumy się zgadzają.
szukaj: faktura, faktury, PDF, skan, OCR, księgowość, biuro rachunkowe, excel, CSV, zestawienie, VAT, NIP, stawki, termin płatności, KSeF, koszty
tytulSeo: Jak przepisać faktury PDF do Excela, narzędzie AI po polsku
opisSeo: Wrzuć faktury PDF lub skany i dostań tabelę do księgowania: numery, daty, NIP-y, netto, VAT i brutto w rozbiciu na stawki. Po polsku, z kontrolą sum.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Bierze faktury, PDF-y z poczty, skany z kserokopiarki, zdjęcia zrobione telefonem, i układa z nich jedną tabelę: numer, data wystawienia, data sprzedaży, obie strony z NIP-ami, kwoty netto, VAT i brutto w rozbiciu na stawki, termin i sposób zapłaty, numer rachunku.

Przy każdej fakturze przelicza sumy. To, co się nie zgadza albo czego nie da się odczytać, ląduje w osobnej sekcji z nazwą pliku i opisem problemu, zamiast wejść po cichu do tabeli jako liczba, która wygląda dobrze.

## Dla kogo

Biura rachunkowe wprowadzające faktury kosztowe klientów. Właściciele małych firm, którzy raz w miesiącu siadają do teczki z fakturami. Kierownicy biur robiący zestawienia do przelewów. Wszyscy, którzy przepisują te same piętnaście pól z dokumentu do systemu.

## Ile Ci to oszczędza

Ręczne wprowadzenie jednej faktury to około trzech minut, przy nieczytelnym skanie pięć. Przy siedemdziesięciu fakturach miesięcznie to pół dnia pracy.

Ze skillem wprowadzanie zamienia się w sprawdzanie: tabela jest gotowa, a uwaga idzie tylko na te kilka pozycji, które sam oznaczył jako wątpliwe. Największa oszczędność nie leży jednak w czasie, tylko w wychwyconym duplikacie i w kwocie, która nie zgadzała się o sto osiemdziesiąt złotych.

## Przykład z życia

Marta prowadzi biuro rachunkowe w Kielcach. Za marzec dostaje od jednego klienta 74 faktury kosztowe, część w PDF, część jako zdjęcia zrobione w samochodzie.

Skill przepisuje 68 z nich do tabeli i odkłada 6. Wśród odłożonych: dwa pliki z tym samym numerem FV/118/03/2026 na 4 305,00 zł, czyli faktura, która przyszła mailem i została jeszcze raz zeskanowana z papieru. Faktura na 18 450,00 zł brutto za usługi budowlane z adnotacją „mechanizm podzielonej płatności”, którą trzeba zapłacić w określony sposób. I skan, na którym suma pozycji dawała 2 460,00 zł, a w polu „Razem do zapłaty” stało 2 640,00 zł, przestawione cyfry, których nie widać, dopóki się nie policzy.

Marta poświęca 50 minut zamiast trzech i pół godziny, a klient nie płaci dwa razy tej samej faktury.

## Jak po polsku

Zbudowany wyłącznie pod polskie dokumenty. Zna rzeczy, których zagraniczne narzędzia do faktur nie mają skąd znać:

- **Datę sprzedaży osobno od daty wystawienia**, łącznie z tym, że faktura z 10 kwietnia może dokumentować sprzedaż z 31 marca i że to normalne, a nie błąd do „poprawienia”.
- **Trzy strony zamiast dwóch.** Polska faktura ma Sprzedawcę, Nabywcę i często osobnego Odbiorcę. Do tabeli idzie Nabywca.
- **Zapis kwot z przecinkiem.** `1.234` na polskiej fakturze to tysiąc dwieście trzydzieści cztery, nie jeden i grosze. Zagraniczne narzędzia mylą się tu regularnie.
- **Kwotę słownie** jako kontrolę krzyżową brutto, pole, którego poza Polską praktycznie się nie spotyka, a które łapie przestawione cyfry na skanach.
- **Stawki `zw`, `np` i `oo` obok 23, 8, 5, 4 i 0.** Wszystkie dają zero w kolumnie podatku i wszystkie znaczą co innego, więc skill przepisuje je dosłownie zamiast sprowadzać do zera. Zna też rzadką stawkę 4 procent, którą widać na fakturach za przejazdy taksówką.
- **Sumę kontrolną NIP-u**, dziesięciocyfrowy numer sam się weryfikuje, więc pomyłkę OCR-u widać, zanim trafi do systemu.
- **Adnotacje, które zmieniają sposób zapłaty albo miesiąc ujęcia**: mechanizm podzielonej płatności (kwotę podatku przelewa się osobno), metoda kasowa (liczy się miesiąc zapłaty, nie data faktury), odwrotne obciążenie (podatek rozlicza kupujący, nie sprzedawca), samofakturowanie (fakturę wystawił kupujący w imieniu sprzedawcy), procedura marży (podatek liczony od marży, a nie od całej kwoty).
- **Numer KSeF**, 35 znaków, które pojawiły się na fakturach w 2026 roku. Skill wie, że to nie jest numer faktury, i nie wstawia go do kolumny z numerem. Wie też, że u najmniejszych dostawców tego numeru przez cały 2026 rok po prostu nie ma i że to normalne.
- **Notę korygującą z datą od lutego 2026** rozpoznaje jako anomalię do zgłoszenia, bo ten dokument wyszedł wtedy z obiegu. Notę wystawioną wcześniej traktuje jako zwykły dokument z tamtego okresu i nie zgłasza jej jako błędu.
- **Fakturę uproszczoną** (paragon z NIP do 450 zł) rozpoznaje po tym, że nie ma nazwy nabywcy, i nie zgłasza tego jako braku danych.

## Czego potrzebujesz

Dowolny płatny plan Claude i pliki faktur: PDF, JPG, PNG albo skan. Nic więcej nie trzeba podłączać.

Przy pierwszej paczce skill zada jedno pytanie o trzy rzeczy: jakie kolumny mają zostać, czy kwoty mają być z przecinkiem, czy z kropką, i czy to faktury kosztowe, sprzedażowe, czy pomieszane. Odpowiedź zajmuje chwilę i wystarcza na wszystkie kolejne partie w tej rozmowie. Bez niej też zadziała, tylko według własnego układu kolumn, nie trzeba niczego ustawiać ani podłączać.

Jeśli poprosisz o plik, dostaniesz CSV, polski Excel otwiera go bez ustawiania czegokolwiek, wystarczy kliknąć dwa razy. Tabelę widzisz też od razu w odpowiedzi, więc do samego przejrzenia plik nie jest potrzebny.

## Na czym się wywala

- **Słaby skan i zdjęcie pod kątem.** Przy niskiej rozdzielczości mylą się `0` z `O`, `1` z `7`, `5` z `6`, a przecinek dziesiętny znika. Pieczątka położona na kwocie potrafi ją zasłonić całkowicie. Skill zgłosi takie pole zamiast zgadywać, ale przy teczce zdjęć zrobionych w pośpiechu odsetek pozycji do ręcznego sprawdzenia rośnie wyraźnie.
- **Faktury, których suma się nie zgadza.** Skill wykryje różnicę i pokaże rachunek, ale **nie rozstrzygnie, czy to jego błąd odczytu, czy błąd na samej fakturze**. Ta decyzja zawsze zostaje po stronie człowieka.
- **Korekty, zaliczki i duplikaty.** Rozpozna je i odłoży, ale nie zdecyduje, jak je ująć. Faktura korygująca w układzie „przed korektą / po korekcie” i para faktura zaliczkowa plus końcowa to miejsca, gdzie automat nie zastąpi księgowego.
- **Waluty obce.** Przepisze kwoty i walutę, ale nie przeliczy na złote. Kurs zależy od dnia i od tabeli, a pomyłka w tym miejscu przechodzi na całą deklarację, więc skill tego nie dotyka.
- **Nietypowe układy graficzne.** Dwie faktury na jednej stronie, tabela wstawiona jako obrazek, wydruk z kasy fiskalnej, faktura na kilkanaście stron z pozycjami, te przypadki przechodzą gorzej i skill to zgłasza.
- **Nie widzi kontekstu.** Nie wie, czy faktura już została zapłacona, czy jest w systemie, czy dotyczy rzeczywistej transakcji. Widzi wyłącznie to, co jest na kartce.
- **Wielkość partii.** Skill przetwarza tyle plików, ile mieści się w jednej rozmowie. Przy kilkudziesięciu skanach trzeba podzielić teczkę na partie i scalić wyniki samodzielnie, a kolejna partia nie widzi już faktur z poprzedniej, więc duplikat rozrzucony między dwie partie nie zostanie wychwycony. Skoro to właśnie duplikaty są tu główną korzyścią, przy dużych paczkach lepiej zrobić na koniec jedno sortowanie po numerze faktury we własnym arkuszu.

## Czego ten skill nie robi celowo

Nie dekretuje, czyli nie decyduje, na które konto w księgach trafia faktura, i nie przypisuje kodów GTU, oznaczeń grup towarów i usług, które księgowa wpisuje w ewidencji VAT. Nie ocenia, czy z faktury da się odliczyć VAT i czy wydatek jest kosztem. Nie sprawdza kontrahenta ani rachunku w wykazie podatników VAT. Nie wystawia, nie koryguje i nie wysyła faktur, nie tworzy plików dla KSeF.

I najważniejsze: **nie wpisuje pola, którego nie widzi.** Puste miejsce z adnotacją „do sprawdzenia” jest uczciwe. Wiarygodnie wyglądająca liczba wzięta z domysłu wchodzi do ksiąg i wychodzi z nich dopiero przy kontroli.

To granica postawiona świadomie. Narzędzie, które uzupełnia braki i wygładza niezgodne sumy, daje ładniejszą tabelę i gorszą księgowość. To narzędzie robi odwrotnie: pokazuje dokładnie tam, gdzie trzeba spojrzeć własnymi oczami.
