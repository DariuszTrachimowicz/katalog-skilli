---
nazwa: Opisy produktów
kategoria: Marketing
status: gotowy
wersja: 1.0.0
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Z tabeli parametrów robi gotowy opis produktu po polsku. Pokazuje, skąd wzięło się każde zdanie oraz czego w danych brakuje.
szukaj: opis produktu, sklep internetowy, e-commerce, karta produktu, Allegro, copywriting, specyfikacja, hurtownia, parametry, marketplace
tytulSeo: Jak napisać opis produktu do sklepu, darmowe narzędzie AI po polsku
opisSeo: Wklej tabelę parametrów, dostań gotowy opis produktu po polsku. Bez zmyślonych cech, pokazuje, skąd wzięło się każde zdanie i czego w danych brakuje.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: format
---

## Co robi

Bierze to, co masz, tabelę parametrów, arkusz z hurtowni, kartę katalogową albo kilka suchych zdań od producenta, i robi z tego opis produktu: nazwę, krótki opis nad przyciskiem kupna, opis rozwinięty, tabelę parametrów i sekcję „warto wiedzieć przed zakupem”.

Do tego dwie rzeczy, których nie robi żaden generator tekstu: pokazuje tabelkę **zdanie z opisu → pole w danych, z którego wynika**, i wypisuje, czego w danych o produkcie brakuje. Jeśli czegoś nie ma, zostawia puste pole zamiast wymyślać.

Przy większych partiach tabelka jest krótsza: powyżej pięciu produktów nie powtarza wierszy dla parametrów przepisanych z arkusza jeden do jednego. Wiersze dla zdań, które coś z parametru wnioskują, i lista braków zostają przy każdym produkcie, skraca się prezentacja, nie kontrola.

## Dla kogo

Sklepy internetowe, producenci wystawiający towar na własnej stronie i na platformach, osoby, które w małych firmach piszą teksty, sprzedawcy na Allegro i innych platformach sprzedażowych. Każdy, kto ma listę produktów i ani czasu, ani cierpliwości na pisanie tego samego czterdzieści razy.

## Ile Ci to oszczędza

Napisanie jednego porządnego opisu od zera zajmuje 20-30 minut, a przy czterdziestu produktach robi się z tego dwa dni pracy, z których połowa schodzi na pilnowanie, żeby wszystkie brzmiały tak samo. Ze skillem pierwszy opis powstaje w kilka minut, reszta partii idzie tym samym torem.

Drugi zysk jest cichszy: lista braków. Wymiary opakowania, zawartość zestawu, kraj pochodzenia, to rzeczy, o które klienci piszą wiadomości albo z powodu których odsyłają towar. Łatwiej uzupełnić je raz w arkuszu niż odpowiadać na to samo pytanie przez rok.

## Przykład z życia

Marta prowadzi sklep z oświetleniem ogrodowym. 240 produktów, dane przychodzą z hurtowni w arkuszu z 26 kolumnami, w większości pustych.

Rok wcześniej zleciła opisy generatorowi AI. Wyszły ładne. Przy jednej lampie napisał „w pełni wodoodporna” i „5 lat gwarancji”, producent daje dwa lata, a lampa ma IP44, czyli jest odporna na zachlapanie, ale nie na zalanie. W trzy miesiące wróciło 11 sztuk zalanych po burzy, plus jedna reklamacja z powołaniem się dokładnie na to zdanie z opisu. Koszt: około 1 400 zł i tydzień korespondencji.

Teraz Marta wkleja wiersz z arkusza: `IP44, 3000 K, 12 W, aluminium, przewód 1,8 m`. Dostaje opis, w którym „odporna na zachlapanie” ma w tabelce podpięte `IP44`, a „ciepła barwa światła”, `3000 K`. I dostaje listę: nie ma informacji, czy żarówka jest w zestawie, nie ma wymiarów, nie ma nazwy i adresu producenta, a przewód 1,8 m oznacza, że gniazdko musi być blisko, i to powinno stać w opisie.

## Jak po polsku

Opis ma brzmieć jak polski opis, nie jak tłumaczenie. Skill wyłapuje kalki, po których najszybciej widać automat, „dedykowany dla”, „adresuje potrzeby”, „w oparciu o”, „rozwiązanie dostarczające wartość”, i odmienia nazwy produktów zamiast zostawiać je sztywno w mianowniku.

Pilnuje polskiego zapisu liczb: `1,8 m` z przecinkiem, spacja przed jednostką, `199,99 zł`, wymiary zawsze podpisane, bo `40 × 30 × 25 cm` bez podpisu klient odczyta po swojemu i zamówi mebel, który nie wchodzi we wnękę.

Zna też listę rzeczy, które przy sprzedaży w Polsce powinny stać przy produkcie i o których arkusze z hurtowni milczą: kto jest producentem, pełna nazwa i adres, przy każdym produkcie, a przy towarze od producenta spoza Unii dodatkowo kto odpowiada za ten towar na terenie Unii, ostrzeżenia i instrukcja po polsku, co dokładnie obejmuje gwarancja i kto ją realizuje, informacja o najniższej cenie z ostatnich 30 dni przy przecenie. Nie orzeka, czy sklep „spełnia wymogi”, mówi, czego w danych nie widzi i co z tego zwykle wraca.

## Czego potrzebujesz

Dowolny płatny plan Claude i dane o produkcie: wklejona tabela, plik CSV albo XLSX z hurtowni, PDF karty katalogowej albo po prostu lista cech w punktach. Żadnych konektorów, żadnej integracji ze sklepem.

## Na czym się wywala

- **Nie wie, czy dane są prawdziwe.** Bierze arkusz na wiarę. Jeśli hurtownia pomyliła wagę albo wkleiła parametry innego wariantu, dostaniesz ładnie napisaną nieprawdę. Skill przypomina o tym przy każdym opisie, ale sam tego nie sprawdzi.
- **Nie rozszyfruje wewnętrznych kodów.** `MAT-3XL-CZ-02` albo kolumna nazwana `param_7` to dla niego znak zapytania. Zapyta albo zostawi puste pole, nie zgadnie, że „CZ” znaczy czarny.
- **Nie uzupełni braków z własnej wiedzy ani z internetu.** Nawet jeśli rozpozna markę i model, nie dopisze pojemności baterii, długości gwarancji ani wymiarów z karty producenta, bo nie wie, o który wariant i którą serię chodzi, a podpisuje się pod tym sprzedawca. Zapyta, zamiast wpisać.
- **Nie odróżni wymiaru produktu od wymiaru paczki**, jeśli arkusz tego nie mówi. To brzmi drobno, a wraca jako zwrot przy meblach i sprzęcie AGD: klient mierzy wnękę, a dostaje wymiar paczki. Zawsze o to dopyta, co przy stu produktach bywa męczące.
- **Nie zrobi SEO.** Nie widzi Twojego sklepu, nie wie, co już masz w innych opisach, nie sprawdzi, czego ludzie szukają i czy identyczny tekst wisi już u konkurencji. Napisze unikalny tekst z Twoich danych, dobór słów kluczowych zostaje po Twojej stronie.
- **Suplementy, wyroby medyczne i żywność obsługuje wąsko.** Przepisze skład i sposób użycia, ale nie napisze ani jednego zdania o działaniu na organizm i powie wprost, że treść w tej kategorii ustala się w firmie z osobą odpowiedzialną za produkt. Przy kosmetykach przepisze deklarowaną funkcję z danych („krem nawilżający”, „szampon do włosów farbowanych”), zatrzyma się dopiero tam, gdzie zaczyna się zdrowie i „wspomaganie”.

## Czego ten skill nie robi celowo

Nie dopisuje cech, których nie ma w danych. Żadnych „zwykle takie produkty mają”, żadnych prawdopodobnych parametrów, żadnych certyfikatów i gwarancji z głowy. Brak zostaje brakiem, oznaczonym w tekście i wypisanym na końcu.

Nie pisze też superlatywów, których nie da się pokazać palcem, „najlepszy na rynku”, „bezawaryjny”, „ekologiczny”, „polecany przez specjalistów”, i nie wymyśla opinii klientów ani liczby sprzedanych sztuk.

To granica postawiona świadomie i jest ważniejsza niż uroda tekstu. Opis produktu nie jest wypracowaniem, jest częścią oferty. Zdanie, które model dopisze z rozpędu, staje się obietnicą sprzedawcy i to sprzedawca tłumaczy się z niego przy zwrocie, reklamacji albo skardze. Generator, który pisze pewnie o rzeczach, których nie wie, przenosi ryzyko na osobę, która się pod tym podpisuje.
