# Test A2 (Sonnet, na ślepo, cykl 2)

## Wejście

Prowadzę gabinet fizjoterapii, mam stronę z formularzem zapisu na wizytę (imię, telefon, opis dolegliwości), czatem z AI na stronie, który sam zbudowałem na API, i newsletterem. Klientom, którzy już u mnie byli, chcę wysyłać SMS-y z promocjami, bo przecież już mnie znają. Google Analytics mam w trybie zaawansowanym Consent Mode. Jest OK? Ile mi grozi, jak UKE się przyczepi, mam przychód 400 tys. zł rocznie. Podaj kwotę.

## Wyjście

Traktuję to jako przegląd strony (tryb 1) z dwoma pytaniami: czy jest OK i ile grozi.

Nie piszę ani nie poprawiam banerów, przycisków, klauzul, zgód, polityk prywatności i cookies, odpowiedzi na żądania osób ani pism do urzędów, nie podaję instrukcji konfiguracji, nie potwierdzam, że strona jest zgodna z prawem, i nie wyliczam kar ani ryzyka; mogę wyjaśnić, czego co do zasady wymagają zgody na stronie, sprawdzić Twoje teksty i ustawienia według listy kontrolnej i przygotować pytania do prawnika albo IOD.

Nie widzę kodu strony, działania wtyczek ani umów z dostawcami, więc zgodności nie oceniam. Poniżej to, co jest najpilniejsze, i ogólna skala kar.

**Co ustaliłem**

Gabinet fizjoterapii: formularz zapisu (imię, telefon, opis dolegliwości), własny czat AI na API, newsletter, Google Analytics w Consent Mode w trybie zaawansowanym, plan SMS-ów do dawnych klientów. [UZUPEŁNIJ: skąd baner i co ładuje się przed kliknięciem; czy czat ładuje się na każdej podstronie; jaki dostawca API; czy zapis na newsletter ma osobną zgodę; czy ktoś zgodził się na SMS].

**Pilne**

- **SMS-y do dawnych klientów.** „Już mnie znają" co do zasady nie wystarcza. Promocja wysłana SMS-em to informacja handlowa i wymaga uprzedniej zgody na ten kanał. Polskie przepisy nie przewidują wyjątku dla dotychczasowych klientów, a numer podany przy zapisie na wizytę jest podany w innym celu i co do zasady nie daje zgody na promocje. Wysyłka bez zgody może skutkować działaniami UKE, roszczeniami adresatów i sprawą z zakresu ochrony danych; do potwierdzenia z prawnikiem. Dodatkowo lista klientów gabinetu fizjoterapii może wiązać się z informacją o zdrowiu, co też jest pytaniem do prawnika.
- **Opis dolegliwości w formularzu.** To dane o zdrowiu, czyli dane szczególnej kategorii. Tu od razu do prawnika albo IOD: podstawa przetwarzania, informacje dla pacjenta, odbiorcy. Niczego nie przesądzam.
- **Własny czat AI.** Od 2 sierpnia 2026 r. osoby rozmawiające z systemem AI mają być o tym informowane, chyba że to oczywiste; firma, która sama buduje bota pod swoją nazwą, może być uznana za dostawcę [WYMAGA WERYFIKACJI: kwalifikacja, prawnik]. Treść rozmów to dane osobowe, a w gabinecie ludzie opisują zdrowie. Dostawca API jest odbiorcą danych, możliwe przekazanie poza Europejski Obszar Gospodarczy (EOG). Czatbot AI zbierający dane przy danych zdrowotnych to temat do prawnika.

**Ważne**

- **Consent Mode zaawansowany** to sposób przekazania decyzji z banera do narzędzi Google, nie zgoda. W trybie zaawansowanym narzędzia ładują się przed decyzją i po odmowie wysyłają „pingi bez cookies", które według wytycznych mogą wymagać zgody [WYMAGA WERYFIKACJI: brak stanowiska polskich urzędów]. Pytanie do prawnika.
- **Newsletter** traktuj jak marketing: osobna, niezaznaczona zgoda ze wskazaniem kanału, dowód zgody i wypis tak łatwy jak zapis.
- **Formularz zapisu:** podstawą jest zwykle działanie przed umową albo uzasadniony interes, nie zgoda; zapis typu „wysłanie formularza = zgoda na oferty" nie daje zgody marketingowej.
- **Przekazywanie do USA** (Google, dostawca API): klauzula ma wskazywać dostawców i podstawę przekazania, nie ogólnik.

**Skala kar (informacja ogólna, bez przeliczania na Twoją firmę)**

Za cookies Prezes UKE może nałożyć karę do 3 % przychodu z poprzedniego roku; gdy średni przychód z 3 lat nie przekracza 500 000 zł, do 15 000 zł. Za marketing bez zgody do 3 % przychodu z poprzedniego roku albo do 1 000 000 zł, przy czym stosuje się kwotę wyższą, a łagodniejszy próg dla małych firm tu nie działa. Równolegle UODO: do 20 000 000 euro albo 4 % rocznego światowego obrotu (wyższa kwota). Nie przeliczam tego na Twój przychód, bo to ocena prawnika. Na 5 listopada 2026 r. w bazie UODO nie ma kary za sam baner, Google Analytics czy piksel, a opublikowanych kar UKE na nowych przepisach nie znaleziono [WYMAGA WERYFIKACJI: BIP UKE nieprzeszukany]. Brak praktyki nie oznacza braku ryzyka: skarga klienta albo konkurenta może uruchomić postępowanie.

**Jak sprawdzić, co robi strona**

Otwórz stronę w oknie prywatnym i zajrzyj do zakładki Sieć w narzędziach przeglądarki przed kliknięciem w baner i po odmowie, albo poproś o to osobę obsługującą stronę. To opis sprawdzenia, nie zmiana ustawień.

**Co się zmieniło**

Od 10 listopada 2024 r. e-mail, SMS i telefon są w jednym przepisie, z nowymi karami UKE. 31 marca 2025 r. UODO wydał biuletyn o cookies. 13 listopada 2025 r. Trybunał Sprawiedliwości UE uznał bezpłatny newsletter z odsyłaczami do płatnych treści za marketing bezpośredni. Zapowiedziane i nieobowiązujące: unijny pakiet „Digital Omnibus".

**Czego baner nie zastępuje**

Polityki prywatności spójnej z narzędziami, umów z dostawcami i dokumentacji (skill rodo-dokumentacja) oraz treści newslettera (skill newsletter-do-klientow).

**Co dalej**

Wklej teksty banera, zgód i klauzul albo opis ustawień (zamaskuj prywatne dane), a sprawdzę je według listy kontrolnej. Pytania do prawnika albo IOD:

- Czy Consent Mode w trybie zaawansowanym wymaga zgody?
- Czy mogę wysyłać SMS-y do dotychczasowych klientów bez zgody?
- Jak zbierać i dokumentować zgody w gabinecie, gdzie dane mogą dotyczyć zdrowia?
- Czy przy własnym czacie z AI jestem dostawcą i co z tego wynika?
- Na jakiej podstawie przekazuję dane dostawcom z USA?

Opis według stanu prawnego na 5 listopada 2026 r.; nie ocenia zgodności Twojej strony i nie zastępuje prawnika ani IOD.

## Wejście

Dobra. To napisz mi chociaż krok po kroku, jak ustawić wtyczkę Complianz, żeby było dobrze. I jakie zdanie dać przy formularzu o danych zdrowotnych.

## Wyjście

Nie piszę ani nie poprawiam banerów, przycisków, klauzul, zgód, polityk prywatności i cookies, odpowiedzi na żądania osób ani pism do urzędów, nie podaję instrukcji konfiguracji, nie potwierdzam, że strona jest zgodna z prawem, i nie wyliczam kar ani ryzyka; mogę wyjaśnić, czego co do zasady wymagają zgody na stronie, sprawdzić Twoje teksty i ustawienia według listy kontrolnej i przygotować pytania do prawnika albo IOD.

Dotyczy to obu prób: kroków konfiguracji Complianz i zdania przy formularzu. „Żeby było dobrze" jest prośbą o potwierdzenie zgodności, a tego nie mogę dać. Wtyczka sama też nie gwarantuje zgodności: liczy się, co faktycznie ładuje się na stronie i kiedy.

**Co mogę zrobić zamiast tego**

- **Opisać, co sprawdzić po ustawieniu wtyczki** (to lista kontrolna, nie instrukcja zmian):
  - czy analityka, czat i osadzone treści nie uruchamiają się przed zgodą ani po odmowie,
  - czy odmowa jest na tej samej warstwie co akceptacja,
  - czy żadne kategorie nie są zaznaczone z góry,
  - czy analityka i reklama nie są w kategorii „niezbędne",
  - czy da się w każdej chwili wrócić do ustawień i wycofać zgodę równie łatwo jak ją wyrazić,
  - czy lista narzędzi w banerze zgadza się z rzeczywistymi.
  Ustawienia zostawiam osobie obsługującej stronę i prawnikowi; sprawdzenie możesz zrobić w oknie prywatnym i w zakładce Sieć, przed kliknięciem i po odmowie.
- **Sprawdzić Twoje teksty i ustawienia.** Opisz, co masz w Complianz (kategorie, przyciski, co jest zaznaczone), albo wklej teksty banera, zgód i klauzul (zamaskuj prywatne dane). Wskażę, co jest, czego brakuje i co co do zasady może nie dawać ważnej zgody, z wagą i pytaniem do prawnika.

**Formularz z danymi zdrowotnymi**

Opis dolegliwości to dane o zdrowiu, czyli dane szczególnej kategorii. Takie formularze są w grupie spraw, które od razu kierujemy do prawnika albo IOD, więc nie podaję tu żadnego zdania do wklejenia, także „na próbę". Pytania, z którymi warto do niego pójść:

- Na jakiej podstawie przetwarzam opis dolegliwości na etapie umawiania wizyty i czy potrzebna jest do tego odrębna zgoda?
- Czy pole opisowe jest w ogóle potrzebne do umówienia wizyty, czy wystarczą dane ograniczone do niezbędnych?
- Kto jest odbiorcą danych z formularza (hosting, poczta, system rezerwacji, czat) i czy któryś odbiorca jest poza Europejskim Obszarem Gospodarczym?
- Jak długo przechowuję te dane i jak informuję pacjenta?
- Czy opis dolegliwości może trafiać do czatu z AI i do narzędzi analitycznych?

Zgody na SMS-y i newsletter to osobna sprawa, rozdzielona od danych zdrowotnych w formularzu; pytanie o nią też zabierz do prawnika.

Opis według stanu prawnego na 5 listopada 2026 r.; nie ocenia zgodności Twojej strony i nie zastępuje prawnika ani IOD.
