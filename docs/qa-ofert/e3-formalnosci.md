# QA ofert płatnych skilli: spójność formalno-handlowa (E3)

Data audytu: 20 sierpnia 2026.
Zakres: sekcje pakietów, `pakiety-nota`, „Twoje ryzyko", „Formalności" na trzech stronach ofert.
Źródła prawdy: `skille-platne/docs/KONCEPCJA-LICENCJE.md` (zatwierdzona 19 sierpnia 2026) oraz `skille-platne/licencje/produkty.json`.

Badane pliki:

- `katalog-skilli/skille/polityka-ai/oferta.html`
- `katalog-skilli/skille/oferta-behawioralna/oferta.html`
- `katalog-skilli/skille/operaty-szacunkowe/oferta.html`

## 0. Rozstrzygnięcie licencyjne (kluczowe)

Koncepcja (pkt 1 i pkt 10) definiuje model jednoznacznie:

- licencja na kupioną wersję jest WIECZYSTA (wygaśnięcie okresu aktualizacji nie odbiera prawa do posiadanej wersji),
- klucz daje dostęp do AKTUALIZACJI przez 12 miesięcy od zakupu,
- po wygaśnięciu: posiadana wersja działa dalej, aktualizacje wymagają płatnego przedłużenia (propozycja 40-50% ceny pierwszego roku),
- sekcja „aktualizacje w cenie przez 12 miesięcy" ma być argumentem sprzedażowym na stronach ofert, nie drobnym drukiem (pkt 6).

Wnioski dla stron:

1. Hasło „kupujesz, nie wypożyczasz" (polityka-ai, oferta-behawioralna) NIE jest sprzeczne z koncepcją i może zostać, bo kupiona wersja jest bezterminowa. Musi jednak stać obok informacji o 12 miesiącach aktualizacji na klucz, której dziś na tych dwóch stronach w ogóle nie ma.
2. Sformułowanie „licencja roczna" (operaty-szacunkowe, dwukrotnie: pakiet „Sam system" i `pakiety-nota`/Formalności) JEST sprzeczne z koncepcją: sugeruje, że po roku narzędzie przestaje działać albo trzeba płacić za dalsze używanie. Roczny jest wyłącznie dostęp do aktualizacji. Do przeredagowania na model „wieczysta wersja + 12 miesięcy aktualizacji kluczem".
3. Kanoniczna formuła (patrz sekcja 5) obowiązuje wszystkie trzy strony; różni się tylko określeniem nabywcy (firma / stanowisko / rzeczoznawca lub kancelaria) i nazwą wyników pracy (dokumenty / oferty / operaty).

## 1. polityka-ai/oferta.html

Ceny i VAT: ZGODNE. 890 / 1490 / 2900 zł netto zgodne z produkty.json; brutto 1094,70 / 1832,70 / 3567,00 zł policzone poprawnie (VAT 23%). Pakiet wyróżniony i opisy „dla kogo" zgodne z produkty.json.

Niezgodności:

- [LICENCJA] Brak jakiejkolwiek wzmianki o 12 miesiącach aktualizacji i kluczu: ani w bullecie pakietu („Licencja na Twój użytek, kupujesz, nie wypożyczasz"), ani w `pakiety-nota`, ani w Formalnościach („Licencja: obejmuje sam plik skilla..."). Tymczasem CTA już mówi „klucz licencji i paczka przychodzą mailem", więc klient dostaje klucz, o którym strona nic nie wyjaśnia. Wymóg koncepcji pkt 6: sekcja o aktualizacjach jako argument sprzedażowy.
- [LICENCJA, drobne] Formalności nie mówią, co się dzieje po 12 miesiącach (wersja działa dalej, przedłużenie dotyczy tylko aktualizacji). Dodać wg kanonu.
- Poza tym bloki „Twoje ryzyko", odstąpienie, sprzedawca, płatność, reklamacje, wymagania techniczne: POPRAWNE i to one są wzorcem kanonicznym dla pozostałych stron. Wymagania techniczne bez Pythona: poprawnie (skill go nie wymaga).

## 2. oferta-behawioralna/oferta.html

Ceny i VAT: netto 490 / 990 / 1990 zł zgodne z produkty.json; pakiet wyróżniony zgodny. ALE:

- [CENY, bloker konsumencki] Brak cen brutto w ogóle: przy pakietach tylko „netto, płatność z góry", w Formalnościach tylko „ceny w złotych netto, doliczamy VAT 23%". Strona dopuszcza sprzedaż konsumencką (sama pisze o prawie odstąpienia konsumenta), a konsument musi widzieć cenę brutto. Do dodania: 602,70 zł (Sam system), 1217,70 zł (System + wdrożenie), 2447,70 zł (System + audyt).
- [ODSTĄPIENIE, bloker] Blok sprzeczny z pozostałymi stronami i ze standardem z koncepcji (pkt 7.2, art. 38 pkt 13 ustawy o prawach konsumenta). Obecne brzmienie („to treść cyfrowa dostarczana od razu, więc po pobraniu nie podlega zwrotowi") przedstawia utratę prawa jako automatyczną. Prawidłowa mechanika (jak na polityka-ai i operatach): domyślnie 14 dni; prawo wygasa dopiero po łącznym spełnieniu: wyraźne żądanie udostępnienia przed pobraniem + potwierdzenie wiedzy o utracie prawa + nasze mailowe potwierdzenie zamówienia. Dodatkowo brak rozróżnienia: pakiety z wdrożeniem i audytem to usługa (wykonanie przed upływem terminu tylko za wyraźną zgodą), czego ten blok w ogóle nie adresuje. Do wymiany na kanon (sekcja 5) w obu miejscach: „Twoje ryzyko" i Formalności.
- [LICENCJA] Jak przy polityka-ai: brak informacji o 12 miesiącach aktualizacji i kluczu (bullet „kupujesz, nie wypożyczasz", nota „licencja jednostanowiskowa", Formalności bez słowa o aktualizacjach), a CTA wspomina „klucz licencji".
- [FORMALNOŚCI, braki całych pozycji] W Formalnościach brakuje trzech pozycji obecnych na obu pozostałych stronach: „Wymagania techniczne" (obowiązkowa informacja o interoperacyjności treści cyfrowej; tu wersja bez Pythona), „Charakter" oraz „Reklamacje". Do uzupełnienia wg kanonu.
- [SPRZEDAWCA, drobne] Wpis okrojony: brak „działalność wpisana do CEIDG" i braku kontaktu „kontakt@aixperts.pl". Ujednolicić do kanonu.
- [PAKIETY-NOTA, drobne] Nota nie zawiera zdania o charakterze usług (wdrożenie/audyt to praca po naszej stronie, nie porada; zakres przy zamówieniu), które mają obie pozostałe strony. Dodać.
- [POZA ZAKRESEM E3, odnotowane] Sekcja „Jak to przebiega w czasie", krok 4: „Napisz «chcę [pakiet]», a odeślemy link do płatności" to stary przepływ, sprzeczny z przyciskami „Zamawiam" prowadzącymi do formularza licencje.aixperts.pl. Do poprawy przy okazji.
- [OBSERWACJA, nie usterka] Kolejność pakietów na stronie (audyt, wdrożenie, sam system) jest odwrócona względem produkty.json; to celowe kotwiczenie ceny wg metodyki skilla, nie niezgodność.

## 3. operaty-szacunkowe/oferta.html

Ceny i VAT: ZGODNE. 890 / 1490 / 2900 zł netto zgodne z produkty.json; brutto 1094,70 / 1832,70 / 3567,00 zł poprawne. Pakiet wyróżniony i opisy „dla kogo" zgodne.

Niezgodności:

- [LICENCJA, bloker pojęciowy] „Licencja roczna z aktualizacjami paczki" (bullet pakietu), „Licencja jest roczna..." (`pakiety-nota`), „Licencja: roczna..." (Formalności). Sprzeczne z koncepcją: roczny jest dostęp do aktualizacji, licencja na kupioną wersję jest wieczysta. Obecne brzmienie zaniża wartość produktu (klient czyta: po roku przestaje działać) i przeczy zapisowi wymaganemu w EULA (pkt 10 koncepcji: „wygaśnięcie okresu aktualizacji nie odbiera prawa do posiadanej wersji"). Przeredagować wg kanonu; sama informacja „aktualizacje pobierane kluczem" jest dobra i zostaje.
- [ODSTĄPIENIE, kosmetyka] Mechanika poprawna i zgodna z polityka-ai; jedyna różnica słowna: „nie wysyłamy żadnej kopii na nośniku" vs „na płycie ani pendrivie". Ujednolicić do jednego brzmienia (proponuję krótsze: „na nośniku").
- [WYMAGANIA TECHNICZNE, kosmetyka] Klauzula o administratorze skrócona względem polityka-ai („funkcja umiejętności może wymagać włączenia" vs „funkcja umiejętności i przesłanie pliku mogą wymagać włączenia"). Ujednolicić do pełnej wersji. Python 3.10+ i openpyxl: obecne i poprawne (produkt faktycznie ich wymaga), spójnie w „Twoje ryzyko", FAQ i Formalnościach.

## 4. Wymagania techniczne per produkt (podsumowanie)

- polityka-ai: bez Pythona. Na stronie: obecne, poprawne.
- oferta-behawioralna: bez Pythona. Na stronie: BRAK pozycji w Formalnościach (do dodania, wersja kanoniczna bez Pythona).
- operaty-szacunkowe: wymaga Pythona 3.10+ (+ openpyxl do XLSX). Na stronie: obecne, poprawne, spójne w trzech miejscach.

## 5. Kanoniczne brzmienia bloków wspólnych

Nawiasy kwadratowe: miejsca podmiany per produkt. Mechanika ma być identyczna na trzech stronach.

### 5.1 Podcena pakietu (`pakiet-cena-sub`)

„netto, czyli [KWOTA_BRUTTO] zł brutto dla konsumenta; płatność z góry"

### 5.2 Bullet licencyjny w pakiecie „Sam system"

„Licencja na [Twój użytek / użytek jednej firmy] z aktualizacjami przez 12 miesięcy<span class=\"powod\">kupujesz wersję na zawsze, a przez rok pobierasz kluczem każdą nową wersję</span>"

### 5.3 `pakiety-nota`

„Licencja na użytek [jednej firmy albo konsumenta na własny użytek / jednego stanowiska / jednego rzeczoznawcy albo jednej kancelarii], bez prawa dalszej dystrybucji i odsprzedaży. Kupiona wersja jest Twoja bezterminowo; klucz licencji daje dostęp do aktualizacji paczki przez 12 miesięcy od zakupu, a po tym okresie posiadana wersja działa dalej. [Dokumenty / Oferty / Operaty i pliki], które zbudujesz narzędziem, są Twoje i używasz ich bez ograniczeń. Wdrożenie i [przegląd / audyt] to praca po naszej stronie, nie porada prawna [ani ocena zgodności / ani ocena operatu w rozumieniu przepisów]; zakres ustalamy przy zamówieniu."

### 5.4 Formalności: Ceny i podatek

„Ceny i podatek: ceny podane w złotych netto, doliczamy VAT 23%. Cena dla konsumenta jest ceną brutto (z VAT): [KWOTY BRUTTO KOLEJNYCH PAKIETÓW] za kolejne pakiety."

Kwoty brutto: polityka-ai i operaty: 1094,70 zł, 1832,70 zł, 3567,00 zł. Oferta-behawioralna: 602,70 zł, 1217,70 zł, 2447,70 zł (uwaga na odwróconą kolejność pakietów na tej stronie; wymienić kwoty z nazwami pakietów, żeby nie było dwuznaczności).

### 5.5 Formalności: Sprzedawca

„Sprzedawca: D-X.PL Michał Jaśkiewicz, działalność wpisana do CEIDG, NIP 7262533563, ul. Więckowskiego 32 lok. 8, 90-728 Łódź; kontakt: kontakt@aixperts.pl."

### 5.6 Formalności: Płatność

„Płatność: z góry, przelewem na podstawie faktury albo przez link do płatności; dostęp cyfrowy przekazujemy niezwłocznie po zaksięgowaniu."

(Już identyczne na trzech stronach; zostaje bez zmian.)

### 5.7 Formalności: Licencja

„Licencja: wieczysta na kupioną wersję, na użytek [jednej firmy albo konsumenta na własny użytek / jednego stanowiska / jednego rzeczoznawcy albo jednej kancelarii], bez prawa dalszej dystrybucji i odsprzedaży. Klucz licencji uprawnia do pobierania aktualizacji paczki przez 12 miesięcy od zakupu; po wygaśnięciu tego okresu posiadana wersja działa dalej, a przedłużenie dotyczy wyłącznie dostępu do aktualizacji i jest dodatkowo płatne. [Wyniki pracy narzędziem] są Twoje bez ograniczeń. Warunki licencji dołączamy do produktu (plik LICENSE.txt)."

### 5.8 Formalności: Wymagania techniczne

Wersja bez Pythona (polityka-ai, oferta-behawioralna):

„Wymagania techniczne: to treść cyfrowa (plik skilla), działa jako umiejętność w Claude na dowolnym płatnym planie albo w ChatGPT na planie Business, Enterprise, Edu lub Healthcare; w planach zespołowych funkcja umiejętności i przesłanie pliku mogą wymagać włączenia przez administratora obszaru roboczego. Nie wymaga instalacji dodatkowego oprogramowania ani nie stosujemy zabezpieczeń technicznych (DRM)."

Wersja operaty-szacunkowe: to samo pierwsze zdanie (z pełną klauzulą o administratorze), a zamiast ostatniego zdania:

„Kalkulatory wymagają komputera z Pythonem 3.10+ (do arkusza XLSX dodatkowo bezpłatna biblioteka openpyxl; instrukcja instalacji w paczce). Nie stosujemy zabezpieczeń technicznych (DRM)."

### 5.9 Formalności: Prawo odstąpienia (konsument)

„Prawo odstąpienia (konsument): co do zasady masz 14 dni na odstąpienie. Pakiet «Sam system» to treść cyfrowa (plik do pobrania). Samo pobranie nie odbiera Ci prawa odstąpienia. Wygasa ono dopiero, gdy łącznie: przed pobraniem wyraźnie zażądasz udostępnienia pliku, potwierdzisz, że wiesz, iż przez to tracisz prawo odstąpienia, a my wyślemy Ci mailowe potwierdzenie zamówienia (sam e-mail wystarcza, nie wysyłamy żadnej kopii na nośniku). Pakiety z [sesją albo przeglądem / wdrożeniem albo audytem] to usługa; jej wykonanie przed upływem 14 dni tylko na Twoją wyraźną zgodę. Zgodę i potwierdzenie realizujemy w procesie zamówienia; dokładne brzmienia potwierdzamy z prawnikiem."

Ten sam sens skrócony w „Twoje ryzyko" (kanon wg polityka-ai/operatów):

„Uczciwie o zwrocie: jako konsument masz co do zasady 14 dni na odstąpienie. Samo pobranie pliku (pakiet «Sam system») nie odbiera Ci tego prawa: tracisz je dopiero, gdy przed pobraniem wyraźnie zażądasz udostępnienia i potwierdzisz, że wiesz o utracie prawa, a my wyślemy Ci mailowe potwierdzenie zamówienia. Pakiety z [sesją albo przeglądem / wdrożeniem albo audytem] to usługa, wykonywana przed upływem terminu tylko za Twoją wyraźną zgodą."

### 5.10 Formalności: Reklamacje

„Reklamacje: zgłoszenia na kontakt@aixperts.pl; rozpatrujemy zgodnie z obowiązującymi przepisami i informujemy o wyniku mailem."

## 6. Priorytety napraw

1. oferta-behawioralna: blok odstąpienia (sprzeczny z prawem konsumenckim w obecnym brzmieniu) i brak cen brutto.
2. operaty-szacunkowe: „licencja roczna" na „wieczysta wersja + 12 miesięcy aktualizacji".
3. polityka-ai i oferta-behawioralna: dopisanie modelu aktualizacji (12 miesięcy, klucz) w pakietach, nocie i Formalnościach.
4. oferta-behawioralna: uzupełnienie Formalności (wymagania techniczne, charakter, reklamacje, pełny wpis sprzedawcy) i noty o zdanie o usługach.
5. Kosmetyka: ujednolicenie „na nośniku" i klauzuli o administratorze.
