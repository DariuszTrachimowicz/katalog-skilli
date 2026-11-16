---
nazwa: Oferta na Allegro
kategoria: E-commerce
status: gotowy
wersja: 1.0.0
poziom: Działa od razu
aktualizacja: 2026-11-15
skrot: Z danych produktu układa ofertę na Allegro, tytuł do 75 znaków, parametry, opis w sekcjach edytora i dane do pól formularza, bez zmyślonych cech i cudzych marek.
korzysc: Masz tytuł, parametry i opis oferty na Allegro z Twoich danych oraz listę tego, czego w nich brakuje.
szukaj: allegro, oferta allegro, tytuł oferty, aukcja, parametry allegro, opis allegro, wyszukiwarka allegro, sprzedaż na allegro, GPSR, e-commerce, hurtownia
tytulSeo: Jak napisać tytuł i opis oferty na Allegro, darmowe narzędzie AI po polsku
opisSeo: "Wklej dane produktu, dostań tytuł do 75 znaków, parametry i opis w sekcjach edytora Allegro. Bez zmyślonych cech i cudzych marek, z listą braków."
zgodnosc:
  claude: ok
  gpt: ok
  gemini: brak
---

## Co robi

Bierze to, co masz o produkcie: tabelę od producenta, wiersz z arkusza hurtowni, kartę katalogową albo starą ofertę, która słabo się sprzedaje. Oddaje ofertę ułożoną tak, jak wygląda formularz Allegro: tytuł z policzonymi znakami, tabelę parametrów, opis podzielony na sekcje edytora (tekst, zdjęcie, tekst ze zdjęciem) i listę rzeczy, które idą do osobnych pól, a nie do opisu: dane producenta, informacje o bezpieczeństwie produktu, warunki zwrotów i reklamacji.

Do tego tabela „zdanie z oferty, pole w danych, z którego wynika”, sprawdzenie cyfry kontrolnej kodu EAN i lista braków. Czego w danych nie ma, tego w ofercie nie będzie: zostaje puste pole z opisem, co w nie wpisać.

## Dla kogo

Dla osób sprzedających na Allegro: małych firm, sklepów, które wchodzą na Allegro obok własnej strony, rękodzielniczek, osób z towarem z hurtowni i tych, które sprzedają rzecz używaną. Także dla kogoś, kto przejmuje cudze oferty i chce je uporządkować.

## Ile Ci to oszczędza

Ułożenie jednej oferty od zera, z szukaniem zasad w pomocy Allegro, liczeniem znaków tytułu i przepisywaniem parametrów, zajmuje zwykle kilkadziesiąt minut. Ze skillem pierwsza wersja powstaje w kilka minut, a przy partii produktów każda kolejna idzie tym samym układem.

Drugi zysk to mniej poprawek po fakcie. Tytuł z „HIT” albo cudzą marką, numer telefonu w opisie, rada o ofercie wielowariantowej, której Allegro już nie przyjmuje: takie rzeczy wychodzą przy moderacji albo w pytaniach kupujących. Skill zna aktualne zasady z datą i źródłem, więc ich nie proponuje.

## Przykład z życia

Paweł sprzedaje na Allegro oświetlenie ogrodowe z hurtowni, 40 produktów. Stara oferta lampy solarnej miała tytuł „SUPER LAMPA SOLARNA HIT!!! mocna wodoodporna tania czujnik” i opis przepisany z kolumny hurtowni: „w pełni wodoodporna, 5 lat gwarancji, działa 3 tygodnie bez słońca”. W parametrach od producenta stało jednak IP44 i 24 miesiące gwarancji.

Paweł wkleja wiersz z arkusza. Dostaje tytuł „Lampa solarna ścienna z czujnikiem ruchu Solaris 120 LED 5 W” (60 znaków), parametry przepisane jeden do jednego, opis w czterech sekcjach i zdanie „odporna na zachlapanie” z podpiętym polem IP44. Dostaje też trzy sygnały: hasło hurtowni przeczy polom o szczelności i gwarancji, „3 tygodnie bez słońca” nie ma pokrycia w parametrach, a w arkuszu była notatka handlowca z prośbą o wpisanie telefonu i adresu sklepu do opisu, czego skill nie zrobił.

## Jak po polsku

Skill pracuje na zasadach Allegro sprawdzonych 15 listopada 2026 w pomocy dla sprzedających i dokumentacji Allegro, z datą i źródłem przy każdej regule. Wie na przykład, że tytuł ma od 12 do 75 znaków i co najmniej 3 słowa, że znak „&” liczy się jak pięć znaków, że wyszukiwarka Allegro czyta tytuły, parametry i kategorie, ale nie opisy, że oferty wielowariantowe wyłączono w kwietniu 2026, a oferta łączy się z produktem z katalogu po kodzie EAN albo kodzie producenta.

Pilnuje polskiego zapisu: jednostki ze spacją (`78 cm`, `2400 mAh`), przecinek dziesiętny, cena `459 zł`, przymiotniki w tytule w kolejności, w jakiej ludzie wpisują frazę („kurtka puchowa damska”). Odróżnia opis od pól formularza: dane producenta i osoby odpowiedzialnej w UE, ostrzeżenia, zwroty i reklamacje wpisuje się osobno, nie w opisie.

## Czego potrzebujesz

Dowolny płatny plan Claude i dane produktu: wklejona tabela, wiersz z arkusza, plik CSV albo XLSX, PDF karty katalogowej albo stara oferta. Najlepiej z kodem EAN i z listą pól, które pokazuje formularz wystawiania w Twojej kategorii. Skill ma mały skrypt do liczenia znaków tytułu; gdy rozmowa nie pozwala uruchamiać kodu, liczy ręcznie i mówi o tym.

## Na czym się wywala

- **Nie widzi formularza Allegro.** Listy parametrów zależą od kategorii, a skill jej nie zna, dopóki jej nie wkleisz. Bez niej układa parametry z Twoich danych i każe sprawdzić wymagane pola w formularzu.
- **Zasady Allegro się zmieniają.** Skill ma je ze stanem na dzień sprawdzenia. Jeśli Allegro zmieni limit albo zakaz, a Ty tego nie zgłosisz, skill będzie radził według starego stanu. Formularz i komunikaty Allegro mają zawsze pierwszeństwo.
- **Nie zna wyszukiwań.** Nie wie, ile osób wpisuje daną frazę ani jak wysoko oferta się pokaże. Układa tytuł ze słów opisujących produkt, a o pozycji decydują też cena, dostawa i oceny sprzedającego.
- **Bierze dane na wiarę.** Jeśli hurtownia pomyliła parametr albo wkleiła dane innego wariantu, oferta będzie starannie ułożoną nieprawdą. Skill wyłapuje sprzeczności między kolumnami, ale nie sprawdzi produktu na półce.

## Czego ten skill nie robi celowo

Nie wpisuje cudzych marek do tytułu, opisu ani parametrów, także w formie „typu” czy „w stylu”: Allegro uznaje to za manipulację słowami kluczowymi, a kupujący za obietnicę. Nie dopisuje cech, wymiarów, rodzaju puchu, szczelności ani gwarancji spoza danych, nawet gdy „pewnie tak jest”. Nie uzupełnia danych producenta ani ostrzeżeń z pamięci, bo za te pola odpowiada sprzedawca. Nie obiecuje miejsca w wynikach. Nie wpisuje telefonu, linków do sklepu ani informacji o innych ofertach, bo opis Allegro na to nie pozwala. Nie ustala ceny i nie przesądza, czy oferta spełnia wszystkie wymogi.

## Najczęstsze pytania

### Ile znaków może mieć tytuł oferty na Allegro?

Od 12 do 75 znaków ze spacjami i co najmniej trzy słowa, według zasad sprawdzonych 15 listopada 2026. Skill liczy znaki skryptem, bo modele językowe często mylą się przy liczeniu, i podaje liczbę przy każdym tytule. Znak „&” Allegro liczy jak pięć znaków, więc skill pisze zamiast niego „i”.

### Czy słowa w opisie pomagają w wyszukiwarce Allegro?

Nie. Wyszukiwarka Allegro przeszukuje tytuły, parametry, kategorie i sekcję „Pasuje do”, a opisów nie czyta. Listy słów wpisane do opisu „pod wyszukiwarkę” są do tego zakazane. Skill wkłada słowa kupujących do tytułu i parametrów, a opis układa dla człowieka, który już otworzył ofertę.

### Czy skill wpisze do tytułu nazwę znanej marki, żeby oferta częściej się wyświetlała?

Nie, przy żadnej formie prośby. Cudza marka w tytule, także z dopiskiem „typu” albo „w stylu”, to według zasad Allegro manipulacja słowami kluczowymi. Wyjątek to zgodność z urządzeniem, którą masz w danych: wtedy skill pisze „do” i model, na przykład etui do konkretnego telefonu.

### Gdzie wpisać dane producenta i informacje o bezpieczeństwie produktu?

W osobnych polach formularza Allegro, w sekcji o produktach w ofercie albo w ustawieniach sprzedaży, nie w tytule i nie w opisie. Skill wypisuje, które z tych danych masz, a których brakuje, ale ich nie uzupełnia z pamięci. Sprzedawca przepisuje je z etykiety, instrukcji albo od dostawcy.

### Czy mogę wystawić kilka rozmiarów w jednej ofercie?

Nie w dawnej formie oferty wielowariantowej, bo Allegro wyłączyło ją 14 kwietnia 2026. Kupujący widzą teraz warianty produktu, a sprzedawca sprawdza je w zakładce „Mój asortyment”. Skill nie radzi łączenia rozmiarów w jedną ofertę i układa treść tak, żeby każda oferta opisywała jeden wariant.

### Na czym działa ten skill?

Na Claude z dowolnym płatnym planem, bez konektorów i bez łączenia z kontem Allegro. Wklejasz dane, dostajesz treść do przeniesienia do formularza. Skill nie publikuje oferty sam, więc to Ty decydujesz, co trafia na Allegro.
