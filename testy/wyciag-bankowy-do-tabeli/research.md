# Research: wyciag-bankowy-do-tabeli

Stan na 15 listopada 2026 (wszystkie źródła odczytane 15.11.2026, wieczorem).
Oznaczenia:
- **[BANK]** dokument lub strona banku,
- **[URZĄD]** gov.pl, podatki.gov.pl, ZUS,
- **[PROGRAM]** pomoc producenta oprogramowania księgowego,
- **[UZUP.]** uzupełnienie: repozytoria społeczności, poradniki firm trzecich. Nie jest to źródło bankowe; nagłówki z tych źródeł pochodzą z plików wrzuconych przez użytkowników w danym roku i mogły się od tamtej pory zmienić.

Uwaga ogólna: banki publikują szczegółowe specyfikacje dla formatów firmowych (MT940, Elixir, camt.053, XML). Dla zwykłego eksportu CSV z bankowości detalicznej żaden z badanych banków nie publikuje oficjalnej listy kolumn. Nagłówki CSV podane niżej pochodzą wyłącznie z [UZUP.].

---

## 1. PKO BP

### iPKO (osobisty)
- Oficjalnej strony pomocy z listą formatów eksportu historii w iPKO osobistym **nie znaleziono**.
- [UZUP.] Nagłówek CSV z iPKO (plik `history_csv_20230608_080238.csv`, przecinek, cudzysłowy, data `RRRR-MM-DD`): `"Data operacji","Data waluty","Typ transakcji","Kwota","Waluta","Opis transakcji","","","",""`. Ostatnie cztery kolumny bez nazw zawierają dalsze części opisu (w konfiguracji importera: kolumna 7 = kontrahent, kolumna 9 = opis). Źródło: https://github.com/bank2ynab/bank2ynab/blob/HEAD/bank2ynab/data/bank2ynab.conf (sekcja `[PL PKO BP]`)
- [UZUP.] Freenance pisze o separatorze średnik dla iPKO, co jest sprzeczne z wpisem wyżej. Rozbieżność: nie rozstrzygnięto. https://freenance.io/integracje/pko/

### iPKO biznes
- [BANK] Historia rachunku: „Pobierz zestawienie operacji” w jednym z pięciu formatów: **PDF, XLS, CSV („plik tekstowy, rozdzielony przecinkami”), XML, HTML**. Obciążenia mają znak „-”, uznania „+”. Rozróżnienie dat: „Data operacji jest datą fizycznego wykonania operacji na rachunku. Natomiast data waluty to dzień, w którym transakcja została wykonana i wpłynęła na stan środków dostępnych na rachunku”. Wyciągi w menu „Wyciągi” w formacie PDF. iPKO biznes Przewodnik Użytkownika, wersja 17: https://www.pkobp.pl/media_files/72ef1739-0285-44af-a8e9-53a87b102e82.pdf
- [BANK] Raporty plikowe: menu „Rachunki” > „Raporty” > „Raporty standardowe”, cztery formaty: **Elixir, MT940, Kontakt, XML camt.053**. Raporty dostępne za maks. 1 rok, jednorazowo maks. 3 miesiące. „Struktura plików wyjściowych. Raporty plikowe iPKO biznes”, wersja 10 (daty w dokumencie: 2021-11): https://www.pkobp.pl/media_files/852587ef-40a5-4e83-a0bc-9980417782cb.pdf
  - MT940: plik `.txt`, **strona kodowa CP852**, kwoty z przecinkiem dziesiętnym, separator podpól `~`, puste podpole = znak ASCII 255 (w podglądzie widać `˙`). Podpola :86: ~20-~25 tytuł, ~30 bank kontrahenta, ~31 rachunek, ~32-~33 nazwa i adres, ~38 IBAN, ~60 data dokumentu, ~63 SWRK. Operacje z weekendu trafiają do pliku za kolejny dzień roboczy.
  - Elixir: **Windows-1250**, separator przecinek, brak nagłówka i stopki, daty `RRRRMMDD`, **kwoty w groszach**, pola tekstowe w cudzysłowach, separator linii w polu `|`.
  - Moduł Raportowy (własne szablony): typ pliku CSV, TXT, XLS, XML, PDF, HTML; do ustawienia strona kodowa, separator dziesiętny, format daty (RRRRMMDD, DDMMRRRR, MMDDRRRR, RRMMDD, DDMMRR, MMDDRR), separator daty, nagłówek z nazwami pól (opcjonalny), znak końca linii, separator pól, separator w polach wielowierszowych.
- [BANK] Split payment w historii iPKO: strona produktu opisuje mechanizm i zlecanie, nie opisuje wyglądu w historii. https://www.pkobp.pl/bankowosc-elektroniczna/split-payment

## 2. mBank

### Osobisty (serwis transakcyjny)
- [BANK] Dwie ścieżki: **Finanse > Historia > Lista operacji** (eksport listy, dane mają „charakter nie księgowy”) oraz **Finanse > Historia > Zestawienie operacji** (operacje wg czasu księgowania, wartości „zbliżone do wyciągu bankowego”). Formaty: **PDF, HTML, CSV**. Kodowania, separatora i kolumn strona nie podaje. https://www.mbank.pl/indywidualny/aplikacja-i-serwis/pytania-i-odpowiedzi-serwis/historia-w-serwisie-transakcyjnym/
- [BANK] Artykuł o nowej historii (7.05.2019, aktualizacja 9.11.2026): eksport zaznaczonych operacji „Eksportuj listę”, formaty PDF i CSV. https://www.mbank.pl/artykuly/pokazemy-nowa-historie-operacji/
- [UZUP.] Nagłówek CSV (średnik, nazwy z `#`): `#Data operacji;#Data księgowania;#Opis operacji;#Tytuł;#Nadawca/Odbiorca;#Numer konta;#Kwota;#Saldo po operacji`. Domyślne kodowanie w importerze **cp1250**; plik zaczyna się blokiem metadanych (pierwsze linie zawierają „mBank S.A.”), importer przewija do wiersza nagłówka; przecinek dziesiętny; wiersze bez daty w `#Data operacji` są pomijane (stopka/podsumowania). Nazwa pliku `NUMER_RRMMDD_RRMMDD.csv`. https://github.com/lstrzepek/beancount-mbank/blob/HEAD/src/beancount_mbank/mbank.py (ostatnia zmiana repozytorium 2023-01)
- [UZUP.] Ten sam nagłówek (zapisany z tabulatorami, plik `eKonto_12345678_190801_190916`): https://github.com/bank2ynab/bank2ynab/blob/HEAD/bank2ynab/data/bank2ynab.conf (sekcja `[PL mBank]`)
- [UZUP.] Kod z 2011 r. przewija plik do wiersza zaczynającego się od `#Data operacji`, separator `;`: https://gist.github.com/jacbar/1178109
- [UZUP.] Freenance: mBank ma kilka wariantów CSV (różne separatory i nagłówki zależnie od typu konta). https://freenance.io/integracje/mbank

### Firmowy (mBank CompanyNet / serwis dla firm)
- [BANK] Raport MT940 dla firm: włączenie „Finanse > Historia > raport MT940 > Włącz Raport MT940”, opłata 50 zł miesięcznie za rachunek. https://www.mbank.pl/firmy/uslugi-serwis-transakcyjny/wyciagi-mt940/
- [BANK] MT940 CompanyNet, wersja 1.3 (12-11-2020): **strona kodowa ISO 8859-2**. https://www.mbank.pl/pdf/msp-korporacje/bankowosc-elektroniczna/mbank-companynet-opis-formatu-pliku-eksportu-wyciagow-dziennych-mt940-v-1.3.pdf
- [BANK] Raport „Historia rachunku” w XML (CompanyNet, wersja 1.00, 13-11-2017): `encoding="ISO-8859-2"`, kolumny: **„Data księg.”, „Kod transakcji”, „Kwota”, „Waluta”, „Opis transakcji”**, data `13.11.2017 09:57`, kwota `0,23`. https://mbank.pl/pdf/msp-korporacje/bankowosc-elektroniczna/mbank-companynet-struktura-raportu-historia-rachunku.pdf
- [BANK] Zasady opisów transakcji (Załącznik nr 2, wersja 1.08, 12-11-2020): słowa kodowe oddzielone „; ”, data `dd.mm.rrrr`, kwota `9999999,99`, kurs `9999999,9999`; pole :86: maks. 6x65 znaków. https://www.mbank.pl/pobierz/msp-korporacje/bankowosc-elektroniczna/Struktura_wyciagi_PL.pdf
- [BANK] Zmiana formatów: MT940 zastępowany przez **CAMT.053.001.08**, MT942 przez CAMT.052.001.08 (CompanyNet, MultiCash, SWIFTNET, od 2024 r.); brak ostatecznej daty wycofania MT940, ale po przejściu rozliczeń na ISO 20022 MT940 „nie będzie zawierać pełnych danych kontrahentów”. Aktualizacja 07.04.2026. https://www.mbank.pl/pomoc/akty-prawne/iso/wyciagi/
- mBiznes (mobilny/mały biznes): osobnej specyfikacji eksportu **nie znaleziono**.

## 3. ING Bank Śląski

### Moje ING
- [BANK] Komunikat dla użytkowników bankowości internetowej (obowiązuje od 13.10.2026): „Wyciągi i eksport wyciągów w formacie **PDF/MT940**”, „Pobranie listy transakcji w formacie **PDF, CSV**”. https://www.ing.pl/_fileserver/item/1112275
- [UZUP.] Ścieżka: Historia transakcji > ustawić rachunki i zakres > „Pobierz historię do pliku” > CSV. https://pomoc.fakturownia.pl/169614541-Import-platnosci-Moje-ING
- [UZUP.] Freenance: CSV ING rozdzielany średnikiem, kodowanie zwykle Windows-1250 lub UTF-8; eksport do 12 miesięcy naraz. https://freenance.io/integracje/ing
- Nagłówki kolumn CSV Moje ING: **nie potwierdzono**.

### ING Business
- [BANK] „Opis formatów plików importu i eksportu wykorzystywanych w ING Business”, wersja 1.51C, od 8 lipca 2026: eksport wyciągów **MT940, MT942, camt.053.001.02, camt.053.001.08 (rekomendowany)**, historia operacji **camt.052.001.02 i camt.052.001.08**. MT940: **CP852 (IBM852)**, separator podpól :86: `~`, ~20-~25 szczegóły płatności, ~29 NRB kontrahenta, ~32-~33 nazwa, ~38 IBAN, **~60 informacja o opłacie, np. „OPŁATA ZA PRZELEW 5,00”**, ~61 kurs, ~62-~63 adres. https://www.ing.pl/_fileserver/item/1122382
- [BANK] Starsza wersja tego dokumentu (1.20A, 2018) z tym samym opisem MT940: https://www.ing.pl/_fileserver/item/1122959

## 4. Santander Bank Polska

- Oficjalnej strony santander.pl o eksporcie historii (Santander internet ani iBiznes24) **nie znaleziono**.
- [UZUP.] Konfiguracja importera Firefly III dla Santander PL (2022): separator **przecinek**, data `d-m-Y`, 9 kolumn (kolumna 2 data, 3 opis, 4 nazwa kontrahenta, 5 IBAN kontrahenta, 6 kwota). Nazw kolumn brak. https://github.com/firefly-iii/import-configurations/blob/main/pl/santander/default.json
- [UZUP.] Freenance: eksport CSV maks. 3 miesiące na raz, warianty CSV różne dla konta osobistego, firmowego i karty. https://freenance.io/integracje/santander
- [PROGRAM] iBiznes24: Comarch Optima pobiera wyciągi przez „Santander WebService (standardowy)” od wersji 2022.6.1. https://pomoc.comarch.pl/optima/pl/2022_5/index.php/dokumentacja/opt090-szybki-import-i-eksport-przelewow-przez-bankowosc-internetowa-santander-bank-polska-ibiznes24/
- [PROGRAM] wFirma: import Santander „CSV (separator)”. https://pomoc.wfirma.pl/-bank

## 5. Bank Pekao

- [BANK] Pekao24 dla firm (przewodnik 2020-11): w Historii można „pobrać i zapisać historię operacji w formie pliku **PDF, TXT lub CSV**” dla rachunków, kart kredytowych, lokat i kredytów; **maks. 1500 transakcji w jednym dokumencie**. https://www.pekao24.pl/_usercontent/_file/202011_Przewodnik_po_Pekao24_dla_firm.PDF
- [BANK] To samo w przewodniku dla klientów indywidualnych (16.11.2021). https://www.pekao24.pl/_usercontent/_file/Pekao24_przewodnik_16_11_2021.pdf
- [UZUP.] Nagłówek CSV Pekao (plik `Lista_operacji_20240920_012205.csv`, średnik, data `dd.mm.rrrr`): `Data księgowania;Data waluty;Nadawca / Odbiorca;Adres nadawcy / odbiorcy;Rachunek źródłowy;Rachunek docelowy;Tytułem;Kwota operacji;Waluta;Numer referencyjny;Typ operacji`. https://github.com/bank2ynab/bank2ynab/blob/HEAD/bank2ynab/data/bank2ynab.conf (sekcja `[PL Bank Pekao]`)
- PekaoBiznes24: specyfikacji banku **nie znaleziono**. [PROGRAM] wFirma przyjmuje „PekaoBIZNES24 (MT940)”, „Pekao24 (MT940)” i „PEKAO S.A (CSV)”: https://pomoc.wfirma.pl/-bank ; Fakturownia ma import MT940 z PekaoBiznes24: https://fakturownia.pl/apps/new-pekao-mt940-import-app

## 6. Millennium, Alior, Credit Agricole

### Millennium
- [BANK] MT940 dla przelewów VAT (wersja 2018-03-13): plik `.STA`, **CP852**, podpola :86: zaczynają się od `<`, puste podpola mogą być pominięte; kody 070 przelew przychodzący VAT, 071 wychodzący VAT, 072 przeksięgowanie VAT, 073 wewnętrzny VAT, 074 polecenie zapłaty VAT, 075 zwrot PZ VAT; tytuł `/VAT/10n,2n/IDC/14x/INV/35x/IDP/20x/TXT/33x`. https://www.bankmillennium.pl/documents/10184/112009/Format_pliku_wyciagi_+MT940_01_07-18.pdf/96471c2f-99e9-4881-aeaa-da5f205b1543
- [UZUP.] Ścieżka CSV w Millenecie: „Moje finanse > Wyciąg z historii transakcji”, wybór CSV. https://pomoc.fakturownia.pl/134308106-Import-platnosci-Bank-Millennium
- [UZUP.] Firefly III (2022): przecinek, data `Y-m-d`, 11 kolumn, **osobne kolumny obciążeń i uznań** (kolumny 8 i 9), kolumna 11 waluta. Nazw kolumn brak. https://github.com/firefly-iii/import-configurations/blob/main/pl/millenium/default.json

### Alior
- [BANK] Bankowość dla firm: Ustawienia > Eksport > „Dodaj szablon” > historia operacji; klient sam ustawia stronę kodową, separator danych, format daty, separator dziesiętny i separator daty oraz kolejność kolumn; można wyeksportować same uznania albo same obciążenia. https://WWW.ALIORBANK.PL/dam/jcr:858d1d42-37a4-4794-8bd2-dde4c8494fac/eksport_danych_instrukcja_dla_klientow_biznesowych.pdf
- [BANK] BusinessPro, plik STA (MT940): **CP852**. https://WWW.ALIORBANK.PL/dam/jcr:e003989d-142f-4da1-9dad-0ba9e8c2dc4f/BusinessPro_Opis_formatu_pliku_wyciagow_STA_MT940_SP.pdf
- [UZUP.] Nagłówek CSV Alior (plik `Historia_Operacji_2023-05-20_07-29-13.csv.CSV`, podwójne rozszerzenie, średnik, **2 wiersze nagłówka**, data `dd-mm-rrrr`): `Data transakcji;Data księgowania;Nazwa nadawcy;Nazwa odbiorcy;Szczegóły transakcji;Kwota operacji;Waluta operacji;Kwota w walucie rachunku;Waluta rachunku;Numer rachunku nadawcy;Numer rachunku odbiorcy`. https://github.com/bank2ynab/bank2ynab/blob/HEAD/bank2ynab/data/bank2ynab.conf (sekcja `[PL Alior Bank]`)

### Credit Agricole
- Oficjalnego opisu eksportu historii **nie znaleziono**. [PROGRAM] wFirma przyjmuje „Crédit Agricole (CSV)” i „Crédit Agricole Biznes (CSV)”: https://pomoc.wfirma.pl/-bank ; [UZUP.] Freenance: eksport CSV wymaga potwierdzenia kodem autoryzacyjnym i chwili oczekiwania na plik: https://freenance.io/integracje/credit-agricole

## 7. Kodowanie, separatory, Excel (zbiorczo)

- MT940 w Polsce najczęściej **CP852**: PKO BP, ING Business, Millennium, Alior (źródła wyżej). Wyjątek: mBank CompanyNet **ISO 8859-2**.
- Elixir (PKO): Windows-1250. CSV: zależnie od banku; [UZUP.] mBank cp1250.
- [BANK] Przykład banku z wyborem kodowania przy eksporcie (BNP Paribas GOonline Biznes): Windows-1250, ISO-8859-2, CP 852, ANSI bez polskich znaków, UTF-8, UTF-8 z BOM. https://www.bnpparibas.pl/_fileserver/item/1543050
- [PROGRAM] Microsoft: Excel przy otwieraniu `.csv` „interpretuje sposób importowania poszczególnych kolumn danych przy użyciu bieżących domyślnych ustawień formatu danych”; daty mogą zmienić układ (MDY/YMD), zera wiodące giną, jeśli kolumny nie ustawi się jako tekst; separator listy zależy od ustawień regionu Windows. https://support.microsoft.com/pl-pl/Excel/get-started/import-or-export-text-txt-or-csv-files
- [UZUP.] Wybór kodowania i ogranicznika przy imporcie przez „Pobierz dane > Z pliku tekstowego/CSV”: https://zpe.gov.pl/a/przeczytaj/DPRHJSqZU
- Wielowierszowe opisy w cudzysłowach w CSV: w źródłach bankowych **nie potwierdzono** dla CSV detalicznych. Potwierdzone tylko pokrewne: PKO Elixir ma separator linii w polu `|`, Moduł Raportowy PKO ma osobny „separator w polach wielowierszowych”.
- Tytuł w MT940 jest cięty na podpola po 27 znaków (PKO, ING) i znaczniki MPP mogą być rozcięte w środku wartości, np. PKO: `~20/VAT/23,00/IDC/111333555888` + `~2199/INV/FV 016974/2018/TXT/T` + `~22EKST DOWOLNY` (NIP „11133355588899” rozcięty). Podpola trzeba sklejać bez spacji przed parsowaniem znaczników. https://www.pkobp.pl/media_files/852587ef-40a5-4e83-a0bc-9980417782cb.pdf

## 8. Daty i kwoty

- Dwie daty: PKO „Data operacji” i „Data waluty” (definicje wyżej); mBank [UZUP.] „#Data operacji” i „#Data księgowania”; Alior [UZUP.] „Data transakcji” i „Data księgowania”; Pekao [UZUP.] „Data księgowania” i „Data waluty”; MT940 :61: zawsze data waluty `RRMMDD` + data księgowania `MMDD`.
- Kwoty: PKO biznes znak „-”/„+”; MT940 kwota bez znaku z oznaczeniem C/D; Millennium [UZUP.] osobne kolumny obciążeń i uznań; Alior [UZUP.] kwota operacji i kwota w walucie rachunku osobno (operacje walutowe); PKO Elixir kwota w groszach.
- Saldo po operacji: mBank [UZUP.] kolumna „#Saldo po operacji”; w MT940 tylko salda :60F: (otwarcie), :62F: (zamknięcie), :64: (dostępne), nie po każdej operacji.
- Transakcje kartą: osobnej dokumentacji o różnicy daty transakcji i księgowania dla kart **nie znaleziono**; istnienie dwóch kolumn dat potwierdzają tylko źródła powyżej.

## 9. Split payment (MPP) w wyciągu

- Format komunikatu: `/VAT/kwota/IDC/NIP/INV/numer faktury/TXT/tekst`; kwota VAT z przecinkiem; /IDC/ do 14 znaków; /INV/ do 35; /TXT/ do 33, opcjonalny; /IDP/ tylko dla polecenia zapłaty; dla przeksięgowań między własnymi rachunkami VAT w /INV/ stała wartość „przekazanie własne”. Źródła: ING Business 1.51C https://www.ing.pl/_fileserver/item/1122382 ; mBank Załącznik nr 2 https://www.mbank.pl/pobierz/msp-korporacje/bankowosc-elektroniczna/Struktura_wyciagi_PL.pdf ; Millennium (wyżej).
- **Rachunek VAT ma osobny wyciąg**, a na rachunku rozliczeniowym widać kilka pozycji:
  - PKO BP, płatność wychodząca 123 zł brutto, 23 zł VAT: rachunek rozliczeniowy: (1) uznanie 23 zł kodem S27 „Przelew przychodzący podatku VAT”, (2) obciążenie 123 zł kodem S28 „Przelew wychodzący Split Payment”; rachunek VAT: (3) obciążenie 23 zł kodem S26. Płatność przychodząca 246 zł / 46 zł VAT: uznanie 246 zł (S29), obciążenie 46 zł (S26) na rozliczeniowym, uznanie 46 zł (S27) na VAT. Wszystkie pozycje mają ten sam tytuł. https://www.pkobp.pl/media_files/852587ef-40a5-4e83-a0bc-9980417782cb.pdf
  - Alior: „jako pierwsza księgowana jest operacja główna, następnie przeksięgowanie podatku VAT z/na rachunek VAT”; między nimi może wejść opłata za przelew; brak środków na VAT = różnica albo całość z rachunku bieżącego. W MT940: kwota VAT w podpolu `<20`, NIP w `<21`, faktura w `<22`-`<23`, tytuł w `<24`-`<25`. https://www.aliorBank.pl/dam/jcr:68d07146-cb4a-481a-a5eb-0de712dbce6a/przyklad_MT940_w_formacie_AIB.pdf (dokument z 5.11.2018)
  - mBank: kod 368 „Przeksięgowanie na rach. VAT”, kod 369 „Przeksięgowanie z rach. VAT”, oznaczenie „SP” w słowach kodowych; przykład: `368 Przeksięgowanie na rach. VAT; na rach.: 68114010100000400404003003; tyt.: /VAT/10,00/IDC/1234567890/INV/FV- 201701/TXT/tekst; TNR: ...`. https://www.mbank.pl/pobierz/msp-korporacje/bankowosc-elektroniczna/Struktura_wyciagi_PL.pdf
- Wniosek dla sum: przeksięgowania VAT na rachunku rozliczeniowym to ruchy wewnętrzne. Liczone razem z płatnością brutto podwajają lub zerują część VAT, więc trzeba je rozpoznać po kodzie/opisie i wyłączyć z kosztów i przychodów.
- KSeF w komunikacie MPP: [URZĄD] obowiązek podawania numeru KSeF (lub 35-znakowego identyfikatora zbiorczego) w przelewach, także MPP, dla płatności **od 1 stycznia 2027 r.** Strona nie podaje, w którym znaczniku. Zmodyfikowano 10.11.2026. https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/ (Źródła prywatne podają inne daty, np. 1.02.2026: https://www.pit.pl/aktualnosci/stosowanie-mechanizmu-podzielonej-platnosci-w-2026-r-1011868 ; przyjąć datę z ksef.podatki.gov.pl.)

## 10. ZUS, urząd skarbowy, opłaty

- [URZĄD] Mikrorachunek podatkowy: od 1.01.2020 PIT, CIT i VAT wyłącznie na indywidualny rachunek; numer zawiera PESEL albo NIP i stały ciąg **„1010 0071 222”**; generator na podatki.gov.pl. Publikacja 30.10.2019. https://www.gov.pl/web/kas/mikrorachunek-podatkowy-od-1-stycznia--mozesz-go-sprawdzic-juz-od-dzis
- [BANK] ZUS: od 2018 jeden przelew na indywidualny numer rachunku składkowego (NRS); struktura `NN 60000002 026 NNNNNNNNNNNNN` (cyfry 3-13 = **60000002026**, ostatnie 13 cyfr z NIP płatnika). mBank, materiał e-Składka (6.10.2017): https://www.mbank.pl/pdf/msp-korporacje/e-skladka-6-10-2017.pdf
- Rozpoznawanie przelewów do US i ZUS po numerze rachunku (fragmenty `10100071222` i `60000002026`) wynika z powyższych struktur numerów; to wniosek, nie zapis banku.
- Opłaty bankowe: ING MT940 podaje opłatę w podpolu ~60 tej samej operacji („OPŁATA ZA PRZELEW 5,00”); Alior pokazuje opłatę jako osobną operację (`POBRANIE OPŁATY/PROWIZJI`, kod 8090); mBank ma osobne kody prowizji (np. 994 „MONTHLY FEE FOR MT940”). Źródła wyżej.
- [UZUP.] ifirma (13.12.2024): wyciąg bankowy jest dowodem księgowym i podstawą zapisu w KPiR, dokumentuje prowizje, opłaty i odsetki; odsetki od rachunku rozliczeniowego to przychód z działalności, od lokaty mogą być przychodem z kapitałów (art. 14 ust. 2 pkt 5 i art. 17 ust. 1 pkt 2 ustawy o PIT). https://www.ifirma.pl/blog/dokumentowanie-kosztow-i-przychodow-z-firmowego-rachunku-bankowego/

## 11. Biuro rachunkowe i programy księgowe

- [PROGRAM] Comarch ERP Optima: wbudowane MT940 (standard, BGŻ, BRE, PBS, Citi MT940/MT942), nieedytowalne; CSV/TXT/PLI przez format użytkownika (separator, ogranicznik tekstu, format daty, separator dziesiętny i tysięcy, kolejność i typ kolumn). **Tylko jedna linia nagłówka i bez stopki**; wymagane pola „Data dokumentu” i „Kwota płatności”. Kodowania: Windows 1250, Latin II, ISO-8859-2, Mazovia, UTF8. Pobieranie przez WebService dla wielu banków. https://pomoc.comarch.pl/optima/pl/2026_5/dokumentacja/opt070-formaty-elektronicznej-wymiany-danych-z-bankiem-eksport-import-przelewow/
- [PROGRAM] Comarch Optima w przeglądarce: Kasa/Bank > Zapisy kasowe/bankowe > Importuj; przy MT940 wybór strony kodowej; kontrola duplikatów. https://pomoc.comarch.pl/optima-online/pl/?p=2967
- [PROGRAM] wFirma: import CSV i MT940 z listy banków (PKO BP CSV, PKO Biznes CSV, mBank CSV, mBank CompanyNet MT940 od 03.10.2022, ING CSV i MT940, Pekao24 MT940, PekaoBIZNES24 MT940, Santander CSV, Millennium MT940, Alior CSV i MT940, Crédit Agricole CSV) plus import uniwersalny; automatyczne parowanie po numerze konta, kwocie i numerze dokumentu; powtórzone transakcje „Zignorowane”. https://pomoc.wfirma.pl/-bank
- [BANK] Banki piszą wprost, że MT940 służy do importu do systemów finansowo-księgowych (PKO, mBank, ING, Millennium, źródła wyżej). mBank odróżnia „Listę operacji” (charakter nie księgowy) od „Zestawienia operacji” (zbliżone do wyciągu).
- Co biuro „zwykle chce dostać”: w źródłach branżowych tylko ogólnie (miesięczne wyciągi z rachunku firmowego + dokumenty źródłowe). Konkretnej listy oczekiwań biur (PDF czy plik do importu) **nie potwierdzono**.

---

## Niepotwierdzone

1. Oficjalne nagłówki kolumn CSV dla iPKO, mBanku, Moje ING, Santandera, Pekao, Millennium, Alior, Credit Agricole (dla PKO, mBanku, Pekao, Alior są tylko nagłówki z repozytoriów społeczności z lat 2019-2024; dla ING, Santandera, Millennium i CA brak nawet tego).
2. Kodowanie i BOM w CSV detalicznych: ING, Santander, Pekao, Millennium, Alior (detal), CA, iPKO. mBank cp1250 tylko z [UZUP.].
3. Separator w CSV iPKO: przecinek (bank2ynab 2023) vs średnik (Freenance).
4. Dokładna treść bloku informacji o rachunku przed tabelą w CSV mBanku (potwierdzono tylko, że jest i zaczyna się od „mBank S.A.”) oraz stopki.
5. Wielowierszowe opisy w cudzysłowach w CSV któregokolwiek banku detalicznego.
6. Kwoty zapisane jako tekst (spacje tysięcy, sufiks „PLN”) w CSV.
7. Data transakcji kartą vs data księgowania w opisie kart; czy rezerwacje/blokady trafiają do eksportu.
8. Jak MPP i rachunek VAT wyglądają w CSV detalicznych (potwierdzono tylko MT940 PKO, Alior, mBank, Millennium).
9. Santander internet i iBiznes24: formaty eksportu, limit 3 miesięcy, MT940 (brak źródła bankowego).
10. PekaoBiznes24: formaty i specyfikacja MT940 (tylko pośrednio przez wFirma i Fakturownię).
11. Credit Agricole: formaty i kolumny.
12. mBiznes (aplikacja mBanku dla firm): osobne formaty eksportu.
13. Moje ING: limit okresu eksportu (12 miesięcy wg Freenance, 90 dni wg zrzutu Fakturowni).
14. Znacznik, w którym od 1.01.2027 ma się znaleźć numer KSeF w komunikacie MPP.
15. Konkretne oczekiwania biur rachunkowych co do formy wyciągu.
