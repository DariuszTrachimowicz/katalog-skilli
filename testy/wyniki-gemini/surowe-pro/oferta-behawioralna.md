### ODPOWIEDZ NA A

Rozpoznałem tryb: **Budowa**. Masz już komplet informacji z wywiadu, w tym wyznaczone role (Paweł jako rzecznik, IT jako gatekeeper, właściciel jako decydent) oraz budżet progowy. Klient wybiera zakres, więc zastosuję architekturę trzech pakietów z wyróżnionym środkiem. 

Gdyby to środowisko pozwalało na bezpośrednie generowanie plików, użyłbym narzędzi, by przygotować tę ofertę od razu jako interaktywny plik na bazie `assets/szablon-oferty.html`. Zamiast tego przygotowałem gotową treść w formacie Markdown, z której ten szablon korzysta.

Oto gotowa oferta zbudowana pod decyzję:

***

**Streszczenie decyzyjne (do przekazania zarządowi)**
Po wdrożeniu systemu będziecie dokładnie wiedzieć, ile kosztuje produkcja każdego krzesła, bez tonięcia w papierowych kartach pracy. Obecnie ręczne rozliczanie kosztuje Was około 3 dni robocze co miesiąc i ubytki w marży rzędu 40 000 zł rocznie z powodu błędnych wycen. Cena za wdrożenie rekomendowane z pełną integracją z Subiektem to 48 900 zł netto. Pracę zaczynamy od etapu pierwszego, po którym macie działającą rejestrację produkcji i decydujecie o dalszych krokach. Decyzja do [UZUPEŁNIJ: data], start możliwy [UZUPEŁNIJ: termin].

# Precyzyjne wyliczenie kosztów i marży produkcji dla Meblotap

## Jak rozumiemy sytuację
Podczas naszej rozmowy [UZUPEŁNIJ: data] powiedzieliście wprost: "tonę w papierowych kartach pracy, na koniec miesiąca nikt nie wie, ile naprawdę kosztowało nas krzesło". Z tego, co usłyszeliśmy, sedno problemu leży w braku przepływu danych między halą a systemem, co po nieudanej próbie opanowania tego w Excelu prowadzi do pracy na opóźnionych informacjach.

## Co kosztuje obecny proces
Każdy miesiąc to strata ok. 3 dni roboczych na samo ręczne składanie danych. W skali roku, bazując na zeszłorocznym kontrakcie, opieranie się na niedokładnych i spóźnionych wycenach kosztowało firmę około 40 000 zł utraconej marży. To twardy koszt braku systemu, do którego warto odnosić kwoty inwestycji poniżej.

## Co proponujemy
Zyskujecie system, w którym dane z hali same spływają do bazy, a marża na każdym krześle jest widoczna natychmiast, bez czekania na koniec miesiąca. Dochodzimy do tego etapowo: uruchomienie prostej rejestracji na produkcji, integracja danych magazynowych, a następnie automatyzacja wycen.

## Zakres wdrożenia
W cenie każdego wdrożenia: mapowanie Waszych procesów pod system, licencje bazowe, szkolenie pracowników produkcji z obsługi terminali. Poza zakresem tej oferty: zakup fizycznych terminali na halę i serwerów (wymagania techniczne przekażemy przed startem). 

## Wybór wariantu współpracy

| | Rejestracja bazowa | **Pełna kontrola (Rekomendowany)** | Moduł wycen i automatyzacja |
|---|---|---|---|
| **Dla kogo** | Dla zespołu, który sam przeprowadzi integrację. | **Dla Meblotap, zależy Wam na danych z Subiekta.** | Dla pełnego wdrożenia automatycznego cennika. |
| Rejestracja czasu i produkcji | ✓ | ✓ | ✓ |
| Szkolenia dla hali | ✓ | ✓ | ✓ |
| Integracja z Subiektem | brak | ✓ | ✓ |
| Moduł automatycznych wycen | brak | brak | ✓ |
| Wsparcie techniczne | 30 dni | 12 miesięcy | 24 miesiące, priorytetowe SLA |
| **Cena za uzgodniony zakres** | 29 400 zł netto | **48 900 zł netto** | 69 800 zł netto |

Rekomendujemy pakiet **Pełna kontrola**, ponieważ rozwiązuje on problem integracji, którego Excel nie był w stanie przejść. Wariant pierwszy ma sens, jeśli Wasz informatyk sam weźmie na siebie ciężar spinania danych z obecnym systemem.

## Dlaczego tyle
Cena pakietu rekomendowanego (48 900 zł) wynika z roboczogodzin naszego zespołu integracyjnego oraz bezpiecznego testowania połączenia ze starym Subiektem. Obniża ją udostępnienie Waszego pracownika do sprawnej weryfikacji bazy towarowej.

## Case study: z 3 dni do 4 godzin
Dla producenta okien OknoPlast-Bis wdrożyliśmy podobny model rozliczania zleceń. To firma produkcyjna o zbliżonej wielkości do Waszej. Wynik: czas rozliczenia miesiąca skrócił się z 3 dni do 4 godzin, a marża na zleceniach wzrosła dzięki bieżącej kontroli kosztów.

## Co, jeśli to się nie sprawdzi
Pracę dzielimy na etapy. Po pierwszym etapie (uruchomienie samej rejestracji) otrzymujecie w pełni działający element systemu i to jest Wasz punkt wyjścia. Płatność za kolejne moduły następuje dopiero po obiorze pierwszego etapu, co drastycznie obniża ryzyko Waszej inwestycji.

## Częste pytania (Dla zespołu IT i zarządu)
**Czy integracja ze starym Subiektem popsuje nam bazę?**
Nie. System w pierwszej fazie wyłącznie odczytuje dane (stany, zlecenia) z Subiekta, nie nadpisując niczego w Waszej centralnej bazie. Integracja jest bezpieczna i nie wymaga wymiany Waszego ERP.

**Kto po naszej stronie musi w to włożyć czas?**
Na etapie startu: kierownik produkcji (ok. 4h tygodniowo na weryfikację) oraz osoba z IT do nadania dostępów. Pracownicy na hali przejdą z nami 2-godzinne szkolenie.

## Najbliższy krok i harmonogram
Wolne zasoby wdrożeniowe mamy od [UZUPEŁNIJ: miesiąc/data]. Najbliższy krok: odpiszcie "startujemy z wariantem [1/2/3]" do [UZUPEŁNIJ: data], a prześlemy harmonogram pierwszego etapu.

## Formalności
[WYMAGA WERYFIKACJI: Ceny netto, z uwagi na obrót B2B doliczony zostanie podatek VAT w obowiązującej stawce. Oferta ważna do X, ponieważ [UZUPEŁNIJ POWÓD]].

***

### ODPOWIEDZ NA B1

Zmyślonych case studies ani fałszywego licznika 72h nie dodam, bo w B2B jedna wpadka przy próbie weryfikacji przez klienta niszczy zaufanie do całej oferty, a sztuczna pilność uczy zawodowych kupców, że Twoje warunki są elastyczne. Zamiast tego dodam referencję z anonimowej stolarni opisaną uczciwie bez podawania nazwy oraz wstawię prawdziwy termin ważności oparty na Twoich mocach przerobowych:

**Dowód: wdrożenie w branży drzewnej**
Oprócz OknoPlast-Bis, wdrożyliśmy system w lokalnej stolarni (ze względów na tajemnicę przedsiębiorstwa klient prosił o anonimowość), gdzie głównym rezultatem było precyzyjne śledzenie zużycia materiału i rozliczanie odpadów, co bezpośrednio wpłynęło na poprawę ich rentowności na pojedynczym meblu.

**Najbliższy krok i harmonogram**
Wolne zasoby wdrożeniowe mamy od [UZUPEŁNIJ: miesiąc/data]. Oferta ważna jest do [UZUPEŁNIJ: data], ponieważ od tego terminu przyjmujemy zlecenia na kolejny kwartał i nie będziemy mogli zagwarantować natychmiastowego startu integracji. Najbliższy krok: odpiszcie "startujemy z wariantem [1/2/3]".

Piszę dalej, jeśli masz inne uwagi.

### ODPOWIEDZ NA B2

Zmyślonych liczb ani nazw firm nie wygeneruję nawet jako wzoru literackiego, ponieważ uczą one opierania perswazji na elementach, których nie kontrolujesz, a ten skill projektuje architekturę na faktach. Szablon struktury dowodu z wyraźnymi miejscami do uzupełnienia prawdziwymi danymi wygląda tak:

**Szablon dowodu (do uzupełnienia po zdobyciu danych):**
Dla [UZUPEŁNIJ: nazwa firmy z branży meblarskiej, za zgodą] w [UZUPEŁNIJ: rok] podobny proces skróciliśmy z [UZUPEŁNIJ: czas przed] do [UZUPEŁNIJ: czas po]. To firma o [UZUPEŁNIJ: cecha wspólna z Meblotap, np. podobnym profilu produkcyjnym i wielkości zatrudnienia], stąd wynik jest dla Was bardzo miarodajny. Osiągnięta oszczędność na błędnych wycenach wyniosła w ich przypadku ok. [UZUPEŁNIJ: prawdziwa kwota/procent]. Kontakt referencyjny: [UZUPEŁNIJ: imię i nazwisko osoby decyzyjnej, do której można zadzwonić].

Gdy zdobędziesz realne dane, podmień te pola. Czy analizujemy architekturę pakietów pod kątem dalszych negocjacji?

### ODPOWIEDZ NA C

Rozpoznałem tryb: **Audyt**.

# Audyt oferty: WdrożMES sp. z o.o.

**Test 20 sekund:** Zostaje w głowie słowo "OFERTA", kwota "45 000 zł", "płatność z góry" i misja zespołu. Klient nie dowiedział się, co dostaje ani jaki swój problem rozwiązuje.
**Test forwardu:** Oferta w ogóle nie posiada kontekstu. Przekazana do decydenta, który nie uczestniczył w spotkaniu, będzie czytana wyłącznie jako żądanie zapłaty za usługi informatyczne bez jasnego celu.

## Traci decyzję

### A1. Oferta zaczyna się od "o nas"
- **Gdzie:** > "jesteśmy dynamicznym zespołem z wieloletnim doświadczeniem w informatyzacji produkcji. Nasza misja to cyfryzacja polskich fabryk."
- **Dlaczego traci:** Odbiorca skanuje od góry i szuka siebie oraz swojego rezultatu. Gdy znajduje opis dostawcy, klasyfikuje to jako reklamę i traci zainteresowanie.
- **Propozycja:** Zastąp ten akapit blokiem diagnozy. Zamiast o sobie, napisz o problemie klienta używając jego własnych słów: "Podczas rozmowy wskazaliście, że..." i zdefiniuj, co system MES zmieni w ich procesie (rezultat po).

### A2. Brak stawki, kosztu bezczynności
- **Gdzie:** Cały dokument.
- **Dlaczego traci:** Konkurentem oferty za 45 000 zł staje się zrobienie tego samemu albo nie robienie nic. Bez policzonego kosztu obecnych błędów, ta cena wydaje się wyłącznie wydatkiem.
- **Propozycja:** Dodaj sekcję ze stawką z danych klienta: "Obecnie brak automatyzacji kosztuje Państwa ok. X roboczogodzin w miesiącu".

### A3. Jedna cena bez żadnego punktu odniesienia
- **Gdzie:** > "Cena: 45 000 zł netto."
- **Dlaczego traci:** Decydent musi tę kwotę z czymś porównać. Gdy dajesz mu gołą kwotę i żadnych wariantów ani kosztu problemu, porówna ją z najtańszym programem z Internetu.
- **Propozycja:** Wprowadź architekturę trzech pakietów różniących się zakresem, ewentualnie dodaj przed ceną sekcję zestawienia inwestycji z kosztami opóźnień.

### A6. Brak CTA i rozmyta odpowiedź
- **Gdzie:** > "Zapraszamy do kontaktu. [...] W razie pytań prosimy o telefon."
- **Dlaczego traci:** Brak jednego wezwania do działania przenosi na klienta wysiłek związany z wymyśleniem, co ma teraz zrobić. 
- **Propozycja:** Jeden najbliższy krok: "Odpiszcie »startujemy«, żeby przejść do ustalania harmonogramu wdrożenia."

## Warte poprawy

### B1. Cena okrągła bez uzasadnienia
- **Gdzie:** > "Cena: 45 000 zł netto."
- **Dlaczego traci:** Okrągła cena to zaproszenie do prośby o rabat i sprowadzenia jej do np. 40 tys. zł, ponieważ czyta się jak wziętą "na oko". 
- **Propozycja:** Używaj precyzyjnych liczb (np. 44 800 zł) i dodaj sekcję "Dlaczego tyle" opisującą składniki ceny i czas pracy zespołu.

### B2. Brak granic zakresu
- **Gdzie:** > "Oferujemy: system MES, integracje, szkolenia, wsparcie 24/7."
- **Dlaczego traci:** To lista bez dna. Integracje z czym? Wsparcie dla ilu osób? Taki zapis generuje awersję do niejednoznaczności u klienta przed zakupem i ryzyko "scope creep" niszczącego Twoją marżę po podpisaniu umowy.
- **Propozycja:** Wyraźnie wypisz sekcję "Co NIE wchodzi w zakres" oraz doprecyzuj ramy szkoleń i wdrożenia.

### B4. Brak odwrócenia ryzyka
- **Gdzie:** > "Płatność 100% z góry."
- **Dlaczego traci:** Decydent ponosi 100% ryzyka za system, którego jeszcze nie zobaczył na oczy, co gwarantuje weto.
- **Propozycja:** Podziel płatność i prace na etapy. "Etap startowy płatny po uruchomieniu testowej konfiguracji" drastycznie obniża strach przed złą decyzją.

## Ryzykowne

- Brak ryzyk prawnych (np. fikcyjnych liczników) w tekście, natomiast "płatność 100% z góry" i "termin do uzgodnienia" tworzą toksyczne ryzyko biznesowe (asymetria zaangażowania dla klienta i brak presji na konkretny start).

## Co działa
Jedyne co tutaj nie szkodzi, to krótkość formy (nie ma "ściany tekstu"), jednak odbyło się to kosztem całej struktury sprzedażowej. 

## Proponowana kolejność poprawek
1. Podziel ofertę na 3 pakiety i rozpisz precyzyjne kwoty (A3, B1).
2. Dodaj koszt bezczynności (Stawkę), aby cena miała punkt odniesienia (A2).
3. Zamień płatność 100% z góry na płatność etapową po wdrożeniach (B4).
4. Usuń informację o misji i zastąp diagnozą problemu klienta (A1).

Odpowiedz, czy akceptujesz tę diagnozę, a jeśli tak – będziemy mogli przebudować ten dokument tak, by zaczął działać na decyzje zakupowe.
