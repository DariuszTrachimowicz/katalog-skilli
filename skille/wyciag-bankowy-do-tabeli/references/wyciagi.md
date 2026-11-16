# Wyciągi z polskich banków: formaty, pułapki, kategorie

Wczytaj zawsze przy rozpisywaniu wyciągu. Stan: 15 listopada 2026 (źródła odczytane tego
dnia, rejestr na końcu). Banki nie publikują oficjalnej listy kolumn zwykłego eksportu CSV
z bankowości detalicznej; nagłówki niżej pochodzą z plików użytkowników z lat 2019-2024
i mogą się różnić od aktualnych. Skrypt nie zależy od nazwy banku: rozpoznaje kolumny
po nazwach, więc gdy bank zmieni układ, zwykle nadal zadziała.

## 1. Co oferują banki

| Bank | Eksport historii | Co wiadomo o CSV |
|---|---|---|
| PKO BP iPKO biznes | PDF, XLS, CSV (przecinek), XML, HTML; raporty Elixir, MT940, camt.053 za najwyżej 3 miesiące naraz | obciążenia ze znakiem „-”, uznania „+”; „data operacji” i „data waluty” |
| PKO BP iPKO osobisty | CSV (plik użytkownika 2023: przecinek, cudzysłowy, data RRRR-MM-DD) | kolumny: Data operacji, Data waluty, Typ transakcji, Kwota, Waluta, Opis transakcji i cztery kolumny bez nazw z dalszym opisem; inne źródło podaje średnik, nie rozstrzygnięto |
| mBank osobisty | „Lista operacji” (bank: charakter nie księgowy) i „Zestawienie operacji” (zbliżone do wyciągu), PDF, HTML, CSV | średnik, Windows-1250, blok informacji o rachunku przed tabelą (zaczyna się od „mBank S.A.”), nagłówki z „#”: Data operacji, Data księgowania, Opis operacji, Tytuł, Nadawca/Odbiorca, Numer konta, Kwota, Saldo po operacji |
| mBank dla firm | MT940 (płatny raport), camt.053 zastępuje MT940 | historia w XML: Data księg., Kod transakcji, Kwota, Waluta, Opis transakcji |
| ING (Moje ING) | lista transakcji PDF i CSV, wyciągi PDF i MT940 | nazwy kolumn CSV niepotwierdzone; średnik według źródeł pośrednich |
| ING Business | MT940, camt.053 (rekomendowany) | opłata za przelew w opisie tej samej operacji („OPŁATA ZA PRZELEW 5,00”) |
| Santander | brak opisu banku; CSV z przecinkiem i datą d-m-r według konfiguracji importera (2022) | nazwy kolumn niepotwierdzone |
| Pekao (Pekao24) | PDF, TXT, CSV, najwyżej 1500 operacji w pliku | średnik, data dd.mm.rrrr: Data księgowania, Data waluty, Nadawca / Odbiorca, Adres nadawcy / odbiorcy, Rachunek źródłowy, Rachunek docelowy, Tytułem, Kwota operacji, Waluta, Numer referencyjny, Typ operacji |
| Millennium | CSV (osobne kolumny obciążeń i uznań według konfiguracji importera), MT940 | nazwy kolumn niepotwierdzone |
| Alior | CSV (średnik, dwa wiersze nagłówka, plik `.csv.CSV`), dla firm własne szablony eksportu | Data transakcji, Data księgowania, Nazwa nadawcy, Nazwa odbiorcy, Szczegóły transakcji, Kwota operacji, Waluta operacji, Kwota w walucie rachunku, Waluta rachunku, numery rachunków |

Pułapki wspólne: Excel otwierający CSV podwójnym kliknięciem psuje polskie znaki
(Windows-1250 wczytany jako UTF-8 albo odwrotnie), zamienia daty i gubi zera wiodące;
kwoty z przecinkiem bywają tekstem; dwie kolumny dat (operacji i księgowania albo waluty)
dają inny podział na miesiące (czy płatność kartą księguje się później niż data transakcji,
banki w źródłach nie opisują: niepotwierdzone). Bezpieczniej czytać plik skryptem albo w Excelu przez „Dane > Z pliku
tekstowego/CSV” z wyborem kodowania i separatora.

MT940 (wyciąg do programów księgowych): najczęściej kodowanie CP852 (PKO, ING Business,
Millennium, Alior), w mBanku dla firm ISO 8859-2; tytuł cięty na kawałki po 27 znaków.
Skrypt skilla go nie czyta: biuro importuje MT940 bezpośrednio do programu.

## 2. Podzielona płatność (split payment) w wyciągu

- Firma ma do rachunku rozliczeniowego osobny rachunek VAT z osobnym wyciągiem.
- Tytuł płatności: `/VAT/kwota VAT/IDC/NIP/INV/numer faktury/TXT/tekst`.
- Na rachunku rozliczeniowym jedna płatność daje kilka pozycji z tym samym tytułem.
  Przykłady pochodzą z dokumentacji formatów dla programów księgowych, nie ze zwykłego
  CSV, więc w CSV nazwy mogą brzmieć inaczej:
  - PKO (raporty plikowe iPKO biznes, pozycje S26-S29): przy płatności wychodzącej
    123 zł brutto z 23 zł VAT uznanie 23 zł (przelew podatku VAT z rachunku VAT)
    i obciążenie 123 zł; przy wpływie 246 zł z 46 zł VAT uznanie 246 zł i obciążenie
    46 zł (przeksięgowanie na rachunek VAT);
  - Alior (przykład MT940): najpierw operacja główna, potem przeksięgowanie VAT, między
    nimi może wejść opłata;
  - mBank (opis MT940, kody 368 i 369): „Przeksięgowanie na rach. VAT” i „z rach. VAT”.
- Skrypt uznaje pozycję za przeksięgowanie tylko po typie operacji na początku pola
  opisu i przy znaku kwoty zgodnym z kierunkiem; opłata za przeksięgowanie zostaje
  zwykłym wydatkiem.
- Skutek dla sum: przeksięgowania VAT to ruchy wewnętrzne. Liczone razem z płatnością
  brutto podwajają albo zerują VAT, więc skrypt wyłącza je z wpływów i wydatków, a płatność
  brutto zostawia w pełnej kwocie.

## 3. Urząd skarbowy, ZUS, opłaty

- Podatki PIT, CIT i VAT płaci się na indywidualny mikrorachunek podatkowy: numer zawiera
  stały ciąg „1010 0071 222” (generator na podatki.gov.pl). Skrypt rozpoznaje go
  w kolumnie rachunku i oznacza „US”.
- Składki ZUS płaci się na indywidualny numer rachunku składkowego: cyfry od 3. do 13. to
  „60000002026”. Skrypt oznacza takie przelewy „ZUS”.
- Opłaty banku: ING podaje opłatę w opisie tej samej operacji, Alior i mBank jako osobną
  pozycję („pobranie opłaty”, „prowizja”). Skrypt oznacza słowa „opłata”, „prowizja”.
- Rozpoznanie po numerze to podpowiedź, nie potwierdzenie: skrypt nie sprawdza, czy
  przelew dotyczy właściwego podatku, okresu i kwoty.

## 4. Kategorie

Kategorie opisują, na co poszły pieniądze. Nie przesądzają, czy wydatek jest kosztem
podatkowym. Użytkownik może je zmienić; trzymaj jedną listę w całej tabeli.

**Firma (mała działalność):** Wpływy od klientów (nazwa „przychód” zostaje dla księgowej, bo to pojęcie podatkowe); Inne wpływy (zwroty, dotacje,
odsetki); Przelewy własne; Podatki (US); ZUS; Wynagrodzenia i umowy z osobami; Towary
i materiały; Usługi obce (księgowość, IT, transport); Czynsz i media; Paliwo i auto;
Telefon i internet; Oprogramowanie i abonamenty; Reklama; Opłaty bankowe; Kredyty
i leasing; Do wyjaśnienia (wydatek, który wygląda na prywatny, wpływ bez opisu).

**Dom:** Wynagrodzenie i inne wpływy; Mieszkanie i media; Jedzenie i zakupy codzienne;
Transport; Zdrowie; Dzieci i edukacja; Ubrania; Rozrywka i wyjazdy; Subskrypcje;
Kredyty i raty; Oszczędności i przelewy własne; Opłaty bankowe; Inne.

## 5. Biuro rachunkowe

- Według poradnika ifirma (13 grudnia 2024) wyciąg bankowy jest dowodem księgowym w podatkowej księdze przychodów i rozchodów
  (dokumentuje m.in. prowizje i opłaty).
- Programy księgowe importują wyciągi: Comarch Optima ma wbudowane MT940 i własne formaty
  CSV (jeden wiersz nagłówka, bez stopki), wFirma ma listę banków (CSV i MT940) i import
  uniwersalny. Księguje się z oryginalnego wyciągu: tabela ze skilla jest pomocą dla
  właściciela i podstawą pytań, nie zastępuje oryginału (jakiej formy oczekują biura,
  źródła nie potwierdzają).
- Czego konkretnie chce dane biuro (PDF, MT940, CSV), `[WYMAGA WERYFIKACJI: zapytaj biuro]`.

## 6. Rejestr źródeł

Pełny research z 44 adresami: `testy/wyciag-bankowy-do-tabeli/research.md` w repozytorium
katalogu (odczyt 15.11.2026). Najważniejsze:

| Źródło | Co |
|---|---|
| PKO BP, iPKO biznes Przewodnik Użytkownika v17; „Struktura plików wyjściowych. Raporty plikowe iPKO biznes” v10 (pkobp.pl, media_files) | formaty, MT940 CP852, split payment S26-S29 |
| mBank: pytania i odpowiedzi „Historia w serwisie transakcyjnym”; MT940 CompanyNet v1.3; Załącznik nr 2 „Struktura wyciągów”; strona ISO wyciągi (aktualizacja 7.04.2026) | lista i zestawienie operacji, ISO 8859-2, kody 368 i 369, camt.053 |
| ING: komunikat dla użytkowników od 13.10.2026; „Opis formatów plików importu i eksportu ING Business” v1.51C | CSV i PDF w Moje ING, MT940 CP852, opłata w opisie |
| Pekao24: przewodnik dla firm 2020-11 | PDF, TXT, CSV, 1500 operacji |
| Millennium: format MT940 dla przelewów VAT (2018) | kody i tytuł MPP |
| Alior: instrukcja eksportu dla firm; opis MT940 BusinessPro; przykład MT940 AIB (2018) | szablony, CP852, kolejność przeksięgowania VAT |
| gov.pl, KAS: mikrorachunek podatkowy (30.10.2019) | ciąg 1010 0071 222 |
| mBank, materiał e-Składka (6.10.2017) | struktura numeru ZUS |
| pomoc.comarch.pl (Optima 2026.5), pomoc.wfirma.pl | import wyciągów |
| support.microsoft.com, import plików CSV | pułapki Excela |
| Uzupełnienia społeczności (bank2ynab, beancount-mbank, Firefly III; 2019-2024) | nagłówki CSV PKO, mBanku, Pekao, Alior; niepotwierdzone przez banki |
