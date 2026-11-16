---
nazwa: Wyciąg bankowy do tabeli
kategoria: Finanse
status: gotowy
wersja: 1.0.0
poziom: Działa od razu
aktualizacja: 2026-11-16
skrot: Rozpisuje plik CSV z historią rachunku z polskiego banku na tabelę z kategoriami wpływów i wydatków, sumami i kontrolą salda, z oznaczeniem VAT, ZUS i urzędu.
korzysc: Widzisz, na co poszły pieniądze z konta, z sumami, które się zgadzają, i listą pytań do księgowej.
szukaj: wyciąg bankowy, historia rachunku, CSV z banku, eksport z banku, PKO, mBank, ING, Santander, Pekao, kategorie wydatków, budżet, split payment, zestawienie dla księgowej
tytulSeo: Wyciąg z banku do tabeli z kategoriami i sumami, CSV z PKO, mBanku, Pekao, narzędzie AI
opisSeo: "Wklej CSV z historią rachunku. Skill rozpisuje operacje na kategorie, liczy sumy, sprawdza saldo i oznacza VAT, ZUS i opłaty banku."
zgodnosc:
  claude: ok
  gpt: ok
  gemini: brak
---

## Co robi

Bierze plik CSV z historią rachunku pobrany z bankowości internetowej i układa z niego czytelną tabelę. Skrypt sam rozpoznaje, jak bank zapisał plik: kodowanie polskich znaków, średnik albo przecinek, blok informacji o rachunku nad tabelą, kwotę w jednej kolumnie albo osobno uznania i obciążenia. Potem liczy wpływy, wydatki i różnicę, przy dłuższym okresie także dla każdego miesiąca, i sprawdza, czy saldo po każdej operacji się zgadza. Operacji, których nie umie odczytać, nie pomija po cichu: wskazuje wiersze i ostrzega, że sumy są niepełne.

Kategorie przypisuje z jawnych reguł („ORLEN” to paliwo, „czynsz” to czynsz i media), a każdą pozycję bez reguły odkłada do decyzji zamiast zgadywać. Oznacza przelewy do urzędu skarbowego i ZUS, opłaty banku, duplikaty i operacje w walucie. Przy podzielonej płatności (split payment) wyłącza z sum przeksięgowania na rachunek VAT, które inaczej podwajają kwoty. Na końcu daje pytania do księgowej.

## Dla kogo

Dla właścicieli małych firm, którzy chcą wiedzieć, na co poszły pieniądze w miesiącu, zanim księgowa przyśle zestawienie. Dla osób, które prowadzą domowy budżet z historii konta. Dla każdego, komu CSV z banku otwiera się w Excelu z krzaczkami albo w jednej kolumnie.

## Ile Ci to oszczędza

Ręczne przepisanie i posortowanie stu operacji z wyciągu to godzina albo dwie, a sumy w Excelu i tak trzeba sprawdzać, bo kwoty z przecinkiem często wpadają jako tekst. Skrypt robi tabelę i sumy w kilka sekund. Gdy plik ma saldo po każdej operacji, kontrola od razu pokazuje miejsca, w których saldo się nie zgadza, co zwykle oznacza brakującą albo przestawioną operację. Zgodne saldo nie dowodzi jednak, że plik zawiera wszystkie operacje z okresu.

Reguły kategorii zostają w pliku, więc w kolejnym miesiącu ten sam układ powstaje od razu, a do decyzji trafiają tylko nowe pozycje.

## Przykład z życia

Kasia prowadzi pracownię ceramiki i ma firmowe konto w mBanku z rachunkiem VAT. Pobiera listopadową historię jako CSV: 87 operacji. W Excelu plik otwiera się z krzaczkami zamiast polskich liter.

Skill rozpoznaje kodowanie i blok informacji o rachunku nad tabelą, liczy wpływy 18 420,00 zł i wydatki 14 905,37 zł i wyłącza z sum 6 przeksięgowań VAT razem na 1 214,63 zł. Kategorie: materiały ceramiczne, czynsz, prąd, ZUS, urząd skarbowy, opłaty banku. Do przypisania zostają 4 pozycje, w tym wpływ 500 zł bez opisu i zakup w sklepie spożywczym kartą firmową. Skill nie mówi, czy zakupy są kosztem, ale wpisuje je do pytań do księgowej. Saldo zgadza się we wszystkich 87 operacjach.

## Jak po polsku

Skill zna polskie eksporty bankowe w stanie z 15 listopada 2026 (układy kolumn sprawdzone na przykładowych plikach PKO, mBanku, Pekao i Aliora): średnik i przecinek dziesiętny, kodowanie Windows-1250, blok informacji o rachunku przed tabelą w mBanku, osobne kolumny uznań i obciążeń, dwie daty (operacji i księgowania). Zna podzieloną płatność z rachunkiem VAT i jej zapis w tytule przelewu, mikrorachunek podatkowy i numer rachunku składkowego ZUS. Kategorie są dopasowane do małej polskiej firmy (ZUS, urząd, czynsz, paliwo, księgowość) albo do domowego budżetu.

## Czego potrzebujesz

Dowolny płatny plan Claude i plik CSV z historią rachunku z bankowości internetowej. Gdy firma ma rachunek VAT, jego wyciąg to osobny plik. Bez konektorów i bez logowania do banku. Skill ma skrypt do odczytu wyciągu; gdy rozmowa nie pozwala uruchamiać kodu, czyta plik ręcznie i pokazuje działania przy sumach.

## Na czym się wywala

- **Pliki MT940, XML i Excel.** Skrypt czyta CSV. Wyciąg MT940 z bankowości firmowej trzeba pobrać jeszcze raz jako CSV albo oddać biuru do importu w programie księgowym.
- **Nietypowy układ kolumn.** Banki zmieniają eksporty bez zapowiedzi. Gdy skrypt nie znajdzie kolumny daty albo kwoty, mówi o tym i prosi o kilka pierwszych wierszy pliku, ale nie zgaduje.
- **Kategorie z opisu.** Opis „PRZELEW” bez nazwy odbiorcy nie mówi, na co poszły pieniądze. Takie pozycje zostają do przypisania, więc przy ubogich opisach będzie ich sporo.
- **Rozpoznanie urzędu i ZUS po numerze rachunku.** Skrypt widzi, że przelew poszedł do urzędu albo ZUS, ale nie sprawdza, czy za właściwy okres i w dobrej kwocie.

## Czego ten skill nie robi celowo

Nie rozstrzyga, co jest kosztem podatkowym ani ile VAT można odliczyć, nie księguje i nie liczy podatku ani składek: to decyzje księgowej, a kategoria w tabeli mówi tylko, na co poszły pieniądze. Nie zmienia kwot i nie usuwa operacji, żeby sumy się zgadzały: rozjazd zostaje opisany. Nie pomaga ukryć wydatków prywatnych ani wpływów.

## Najczęstsze pytania

### Dlaczego CSV z banku otwiera się w Excelu z krzaczkami?

Bank zapisał plik w innym kodowaniu polskich znaków (najczęściej Windows-1250), niż zakłada Excel przy podwójnym kliknięciu. Skill rozpoznaje kodowanie sam. W Excelu pomaga import przez „Dane > Z pliku tekstowego/CSV” z wyborem kodowania i separatora.

### Czy skill powie, co mogę wrzucić w koszty?

Nie. Kategorie opisują, na co poszły pieniądze, na przykład „paliwo i auto”, ale o tym, czy wydatek jest kosztem i ile VAT da się odliczyć, decyduje księgowa. Skill wypisze wątpliwe pozycje i przygotuje do niej pytania.

### Co z podzieloną płatnością i rachunkiem VAT?

Przy split payment bank księguje płatność brutto i osobno przeksięgowanie VAT między rachunkiem firmy a rachunkiem VAT. Gdyby liczyć wszystko, VAT podwoiłby się w sumach. Skrypt rozpoznaje przeksięgowania i liczy je osobno, poza wpływami i wydatkami.

### Które banki obsługuje?

Plik CSV, w którym skrypt rozpozna nazwy kolumn daty i kwoty (albo uznań i obciążeń); szuka ich po nazwach, a nie po banku. Sprawdzony na przykładowych układach PKO, mBanku, Pekao i Aliora; dla ING, Santandera i Millennium układ trzeba sprawdzić na prawdziwym pliku. MT940, XML i pliki Excela trzeba pobrać jako CSV.

### Czy mogę oddać tę tabelę księgowej zamiast wyciągu?

Lepiej oddać oba: oryginalny wyciąg z banku (PDF albo plik do importu) i tabelę jako pomoc. Księgowa księguje z oryginału, a tabela z pytaniami skraca wyjaśnianie wątpliwych pozycji.

### Na czym działa ten skill?

Na Claude z dowolnym płatnym planem, bez konektorów i bez dostępu do banku. Wklejasz albo załączasz plik CSV, dostajesz tabelę, sumy i pytania. Skrypt działa tam, gdzie Claude może uruchamiać kod; bez tego skill liczy ręcznie i pokazuje działania.
