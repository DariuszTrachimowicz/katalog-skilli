---
nazwa: Karta rozmiarów
kategoria: E-commerce
status: gotowy
wersja: 1.0.0
poziom: Działa od razu
aktualizacja: 2026-11-15
skrot: Z tabeli wymiarów od producenta robi czytelną kartę rozmiarów i tekst „jak się zmierzyć”, sprawdza spójność tabeli i niczego nie dopisuje.
korzysc: Masz kartę rozmiarów, w której każdy wymiar pochodzi od producenta, i wiesz, co w tabeli się nie zgadza.
szukaj: tabela rozmiarów, karta rozmiarów, jak się zmierzyć, rozmiarówka, wymiary, odzież, bielizna, obuwie, długość wkładki, sklep internetowy, zwroty
tytulSeo: Tabela rozmiarów do sklepu i instrukcja jak się zmierzyć, narzędzie AI po polsku
opisSeo: "Wklej tabelę wymiarów od producenta, dostań czytelną kartę rozmiarów i instrukcję pomiaru. Bez zmyślonych wymiarów i przeliczeń, z listą niezgodności."
zgodnosc:
  claude: ok
  gpt: ok
  gemini: brak
---

## Co robi

Bierze tabelę wymiarów od producenta: wklejoną, z arkusza albo z karty katalogowej, dla odzieży damskiej, męskiej, dziecięcej, bielizny albo butów. Oddaje kartę rozmiarów do sklepu: rozmiar i wymiary w jednostkach z tabeli (zwykle w centymetrach), z wyraźnym podpisem, czy to wymiary ciała, czy wymiary rzeczy, oraz krótki tekst „jak się zmierzyć” tylko dla tych wymiarów, które są w tabeli.

Przed tym sprawdza tabelę skryptem: czy wymiary rosną razem z rozmiarem, czy zakresy sąsiednich rozmiarów nie nachodzą na siebie i nie zostawiają luki, czy skok jest równy, czy nie brakuje wartości i jednostek. Niezgodności nie poprawia sam, tylko pokazuje je jako pytania do producenta.

## Dla kogo

Dla sklepów internetowych z modą, bielizną i obuwiem, osób od e-commerce, które przepisują tabele od kilku dostawców, i sieci salonów, które chcą mieć jedną czytelną kartę w sklepie i na Allegro. Także dla małych marek szyjących własne kolekcje, które mają wymiary w arkuszu, ale nie mają ich w formie dla klientek.

## Ile Ci to oszczędza

Przepisanie i ujednolicenie jednej tabeli od producenta, z dopisaniem instrukcji pomiaru, zajmuje zwykle kilkanaście minut, a przy kilkudziesięciu modelach od różnych dostawców łatwo o przestawioną kolumnę albo literówkę. Skrypt sprawdza tabelę w sekundę, a karta za każdym razem ma ten sam układ.

Drugi zysk to sprawdzenie tabeli przed publikacją: nakładające się zakresy, wymiar, który maleje przy większym rozmiarze, czy kolumna bez jednostki wychodzą, zanim kartę zobaczy klientka.

## Przykład z życia

Kasia prowadzi sklep z sukienkami i dostała od szwalni tabelę: rozmiary 36 do 42, biust, talia, biodra i długość sukienki. Wkleja ją do rozmowy.

Skill pyta, w jakich jednostkach jest tabela i czy biust, talia i biodra to wymiary ciała, a długość to długość sukienki. Po odpowiedzi Kasi („centymetry, obwody ciała, długość sukienki”) dostaje kartę z każdą kolumną podpisaną osobno i instrukcję pomiaru biustu, talii i bioder. Skrypt wyłapuje między innymi: zakresy biustu dla 40 (92-96 cm) i 42 (95-100 cm) nachodzą na siebie, więc klientka z obwodem 95 cm pasuje do dwóch rozmiarów; przy talii skok między 40 a 42 wynosi 5 cm, a wcześniej 4 cm; dla rozmiaru 40 brakuje długości sukienki. Skill nie wpisuje „pewnie 106 cm”, tylko daje Kasi pytania do szwalni.

## Jak po polsku

Skill zna polskie oznaczenia: rozmiary damskie 34, 36, 38, męskie 48, 50, dziecięce według wzrostu (104, 98/104), staniki z obwodem pod biustem i miseczką. Wie, że normy rozmiarów odzieży są w Polsce dobrowolne, że opisują wymiary ciała, a nie ubrania, i że nie ma jednego sposobu oznaczania wielkości dla wszystkich marek, dlatego niczego nie przelicza.

Przy butach odróżnia rozmiar europejski od długości wkładki i długości stopy. Instrukcje pomiaru opiera na praktyce polskich sklepów i norm, ze źródłami w rejestrze z datą. Zapis jest polski: `88 cm`, `24,5 cm`, zakresy `86-90 cm`.

## Czego potrzebujesz

Dowolny płatny plan Claude i tabelę wymiarów od producenta: wklejoną, jako plik CSV albo XLSX, albo przepisaną z karty katalogowej. Najlepiej z informacją, czy producent podaje wymiary ciała, czy wymiary rzeczy. Skill ma mały skrypt do sprawdzenia tabeli; gdy rozmowa nie pozwala uruchamiać kodu, sprawdza ręcznie i mówi o tym.

## Na czym się wywala

- **Nie wie, czy tabela jest prawdziwa.** Jeśli producent wkleił wymiary innego modelu albo pomylił kolumny w sposób, który nie łamie żadnej reguły, karta będzie spójna, ale błędna. Skill przypomina, żeby porównać ją z metką albo wzorem.
- **Nie odgadnie, co mierzy tabela.** Gdy z tabeli nie wynika, czy to wymiary ciała, czy rzeczy, pyta. Bez odpowiedzi karta zostaje z polem do uzupełnienia.
- **Nie poprawia niezgodności.** Nierówny skok może być zamierzony, a nakładające się zakresy mogą wynikać z kroju. Skill pokazuje je jako pytania, decyzja należy do sprzedawcy i producenta.
- **Instrukcje pomiaru są ogólne.** Opierają się na praktyce sklepów i norm i obejmują tylko wymiary ciała, które opisuje rejestr źródeł. Gdy producent mierzy po swojemu, na przykład rękaw od barku, albo podaje wymiar, którego rejestr nie opisuje, skill pyta zamiast zgadywać.

## Czego ten skill nie robi celowo

Nie dopisuje wymiarów, których nie ma w tabeli, ani wartości „typowych dla rozmiaru”. Nie przelicza rozmiarów na brytyjskie, amerykańskie czy włoskie, bo nie ma jednego sposobu oznaczania dla wszystkich marek. Nie podaje tolerancji, zapasu na buty ani rad „weź większy”, jeśli nie napisał ich producent. Nie łączy tabel różnych dostawców w jedną kartę. Każdy wymiar w karcie to obietnica sklepu, a zły wymiar wraca jako zwrot.

## Najczęstsze pytania

### Czy AI zrobi mi tabelę rozmiarów do sklepu internetowego?

Tak, z tabeli od producenta. Skill przepisuje wymiary do czytelnej karty w jednostkach z tabeli, podpisuje, czy to wymiary ciała, czy rzeczy, dodaje instrukcję pomiaru dla wymiarów z tabeli i sprawdza skryptem, czy liczby do siebie pasują. Wymiarów, których nie ma w danych, nie dopisuje.

### Czy skill przeliczy rozmiary na brytyjskie i amerykańskie?

Nie, chyba że przeliczenie jest w tabeli producenta. Nie ma jednego, wiążącego sposobu oznaczania rozmiarów dla wszystkich marek, a te same oznaczenia różnią się między producentami. Przeliczenie z pamięci mogłoby wprowadzić klientkę w błąd i skończyć się zwrotem.

### Jak klientka ma się zmierzyć?

Skill dopisuje do karty krótką instrukcję tylko dla wymiarów ciała, które są w tabeli: na przykład obwód biustu w najszerszym miejscu, talii w najwęższym, bioder w najszerszym, miarką krawiecką w bieliźnie. Przy butach opisuje pomiar stopy tylko wtedy, gdy producent podał, jak dobrać rozmiar.

### Co się stanie, jeśli tabela od producenta ma błąd?

Skill go pokaże, ale nie poprawi. Skrypt wyłapuje między innymi wymiar malejący przy większym rozmiarze, nakładające się zakresy, luki, nierówne skoki i brakujące wartości. Każdą niezgodność dostajesz jako pytanie do producenta, bo nie wiadomo, czy to pomyłka w tabeli, czy cecha kroju.

### Czy kartę mogę wkleić na Allegro, gdzie nie ma tabel?

Tak. Skill przygotuje tę samą kartę w punktach, na przykład „Rozmiar 38: biust 88-92 cm, talia 70-74 cm”, bez tabeli. Treść i liczby są te same co w wersji z tabelą, zmienia się tylko forma. Całą ofertę na Allegro robi osobny skill.

### Na czym działa ten skill?

Na Claude z dowolnym płatnym planem, bez konektorów i bez łączenia ze sklepem. Wklejasz tabelę, dostajesz kartę i listę uwag. Skrypt sprawdzający tabelę działa tam, gdzie Claude może uruchamiać kod; bez tego skill sprawdza tabelę ręcznie.
