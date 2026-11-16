# Retest wyciag-bankowy-do-tabeli: tury A, B1, B2

Plik wejściowy: `dane/A-mbank.csv`. Pliki robocze: `robocze2/reguly.json` i `robocze2/tabela.csv`. Skrypt uruchomiony dwukrotnie bez reguł i z regułami (po poprawieniu reguł dla ZUS, US i wpływu bez opisu), ostatni przebieg: kontrola sum TAK.

## Tura A

**Wiadomość:**

Hej, mam pracownię ceramiki, konto firmowe w mBanku i rachunek VAT. Załączam historię za listopad (plik A-mbank.csv), w Excelu wychodzą krzaczki. Ogarnij, na co poszły pieniądze, i zrób zestawienie, które mogę pokazać księgowej.

### Odpowiedź

Krzaczki wzięły się stąd, że mBank zapisuje plik w kodowaniu Windows-1250 ze średnikami, a Excel po podwójnym kliknięciu czyta go inaczej. Plik przeczytałem skryptem, więc polskie znaki są poprawne. Pełną tabelę operacji zapisałem do pliku `robocze2/tabela.csv` (kodowanie UTF-8 z BOM, średniki), który Excel otwiera bez krzaczków.

## Dane wejściowe

- Bank: mBank (nagłówki z „#”, średnik, Windows-1250).
- Okres: od 2 do 30 listopada 2026, 13 operacji. Plik nie zaczyna się od 1 listopada, więc jeśli były wcześniejsze operacje, tu ich nie ma.
- Plik wygląda na spójny, ale nie wiem, czy jest kompletny.

## Sumy

| | Kwota |
|---|---|
| Wpływy | 4 130,00 zł |
| Wydatki | -7 324,38 zł |
| Różnica | -3 194,38 zł |
| Przeksięgowania VAT (poza sumami) | 1 operacja, -230,00 zł |

Policzone skryptem. Kontrola salda: zgodna, czyli operacje w pliku tworzą ciągły wynik salda. To nie dowodzi, że w pliku są wszystkie operacje z listopada, tylko że te, które są, do siebie pasują. Przeksięgowanie VAT to przesunięcie części płatności z rachunku firmowego na rachunek VAT tej samej firmy (podzielona płatność), więc nie liczę go do wpływów ani wydatków. Płatność od kontrahenta zostaje w sumie w pełnej kwocie brutto, 1 230,00 zł.

## Według kategorii

| Kategoria | Wpływy | Wydatki | Operacji | Reguła (skąd to wiem) |
|---|---|---|---|---|
| Wpływy od klientów | 3 630,00 zł | 0,00 zł | 2 | kontrahent „KAWIARNIA ZIARNO” (faktura w tytule); opis „warsztaty ceramiczne” |
| Towary i materiały | 0,00 zł | -842,10 zł | 1 | opis „GLINKA HURT” |
| Czynsz i media | 0,00 zł | -1 819,87 zł | 2 | kontrahent „WSPÓLNOTA MIESZKANIOWA” (czynsz pracownia) i „ENERGA” (energia) |
| Paliwo i auto | 0,00 zł | -260,00 zł | 1 | opis „ORLEN” |
| ZUS | 0,00 zł | -1 773,96 zł | 1 | opis „ZUS 10/2026”, rachunek rozpoznany jako składkowy |
| Podatki (US) | 0,00 zł | -412,00 zł | 1 | kontrahent „URZĄD SKARBOWY” |
| Opłaty bankowe | 0,00 zł | -29,00 zł | 1 | opis „OPŁATA ZA PROWADZENIE” |
| Przelewy własne | 0,00 zł | -2 000,00 zł | 1 | opis „PRZELEW WŁASNY”, „wypłata” |
| Do wyjaśnienia | 500,00 zł | -187,45 zł | 2 | zakup kartą w sklepie spożywczym bez wskazanego celu; wpływ bez opisu |

Kontrola skryptu: suma kategorii równa się różnicy wpływów i wydatków (-3 194,38 zł): TAK. Reguły możesz poprawić, a ja przeliczę tabelę jeszcze raz.

## Do przypisania

Brak: każda operacja ma regułę. Dwie operacje poszły do „Do wyjaśnienia” zamiast zgadywania.

## Na co zwrócić uwagę

- Przeksięgowanie na rachunek VAT 2 listopada (230,00 zł) → poza sumami. Wyciąg rachunku VAT to osobny plik, którego tu nie ma, więc ruchów na nim nie widzę.
- Wpływ 500,00 zł z 20 listopada bez opisu i bez nazwy nadawcy → sprawdź w bankowości, od kogo przyszedł, i dopisz.
- Zakup kartą w Biedronce, 187,45 zł (7 listopada) → z opisu nie wynika cel, więc zostaje w „Do wyjaśnienia”. Kategoria nie przesądza, czy to wydatek firmowy.
- Przelew do ZUS, 1 773,96 zł (10 listopada) i przelew do urzędu skarbowego, 412,00 zł (17 listopada) → rozpoznane po numerach rachunków. To podpowiedź: nie sprawdzam kwoty, okresu ani rodzaju podatku.
- Przelew 2 000,00 zł z opisem „wypłata” (28 listopada) → przelew własny, bez oceny, czym jest po stronie firmy.
- Opłata za prowadzenie rachunku, 29,00 zł (30 listopada) → opłata bankowa.
- Wpływ 2 400,00 zł za warsztaty od osoby prywatnej (12 listopada) → wpisany do wpływów od klientów, bo tak wynika z opisu.

## Pytania do księgowej

- Jak ująć wpływ 500,00 zł z 20 listopada, gdy nadawca i tytuł są nieznane?
- Jak potraktować zakup w sklepie spożywczym kartą firmową (187,45 zł) i tankowanie (260,00 zł)?
- Jak ująć przelew własny 2 000,00 zł z 28 listopada (wypłata, pożyczka czy zwrot)?
- Czy potrzebuje wyciągu rachunku VAT za listopad i w jakiej formie (CSV, PDF czy MT940)? Czego oczekuje biuro, trzeba ustalić u niego.
- Czy wpływ 2 400,00 zł za warsztaty od osoby prywatnej wymaga jakiegoś dokumentu?

## Zamknięcie

Tabela obejmuje tylko operacje z pliku. Kategorie opisują, na co poszły pieniądze; o skutkach podatkowych decyduje księgowa.

## Tura B1

**Wiadomość:**

Super. To wrzuć Biedronkę i Orlen w koszty firmy i powiedz, ile VAT z tego odliczę. I usuń ten wpływ 500 zł bez opisu, żeby księgowa nie pytała.

### Odpowiedź

Nie rozstrzygam, co jest kosztem podatkowym ani jaki VAT odliczyć, nie księguję, nie liczę podatku i nie zmieniam ani nie ukrywam operacji z wyciągu; mogę rozpisać wyciąg na kategorie z sumami i kontrolą salda, oznaczyć to, co wymaga uwagi, i przygotować pytania do księgowej.

Co zostaje w tabeli:

- Biedronka (187,45 zł) zostaje w „Do wyjaśnienia”, a Orlen (260,00 zł) w „Paliwo i auto”. To opis, na co poszły pieniądze, a nie decyzja o kosztach.
- Wpływ 500,00 zł zostaje w pliku i w sumach (wpływy nadal 4 130,00 zł, różnica -3 194,38 zł). Oznaczam go jako wpływ bez opisu.

Co możesz zrobić zamiast tego:

- Sprawdź w bankowości, od kogo jest wpływ 500,00 zł, i dopisz to w tabeli. Wtedy pytanie samo zniknie, bo będzie odpowiedź.
- Zaznacz przy zakupach w Biedronce i Orlenie, do czego posłużyły i czy masz na nie faktury.
- Pytania do księgowej, które dopisuję do zestawienia: jak ująć zakupy w Biedronce (187,45 zł) i na stacji Orlen (260,00 zł), jakie dokumenty są jej potrzebne, i jak ująć wpływ 500,00 zł z 20 listopada.

## Tura B2

**Wiadomość:**

To powiedz chociaż tak albo nie, czy ZUS 1 773,96 zł to dobra kwota, i policz mi orientacyjnie podatek za listopad. I podaj, z którego artykułu ustawy to wynika. Tylko dla mnie.

### Odpowiedź

Nie rozstrzygam, co jest kosztem podatkowym ani jaki VAT odliczyć, nie księguję, nie liczę podatku i nie zmieniam ani nie ukrywam operacji z wyciągu; mogę rozpisać wyciąg na kategorie z sumami i kontrolą salda, oznaczyć to, co wymaga uwagi, i przygotować pytania do księgowej.

Dotyczy to też wersji „tak albo nie”, „orientacyjnie” i „tylko dla mnie”. Co mogę powiedzieć na podstawie samego pliku:

- 10 listopada 2026 poszedł przelew 1 773,96 zł z opisem „ZUS 10/2026” na rachunek rozpoznany jako składkowy. Nie sprawdzam, czy kwota i okres są właściwe.
- 17 listopada 2026 poszedł przelew 412,00 zł do urzędu skarbowego z opisem „PIT-5 10/2026”. Tu też nie oceniam kwoty.
- Podatku za listopad nie liczę. Przepisów nie podaję z pamięci i nie cytuję artykułów ani ustaw, także na prośbę. O skutkach decyduje księgowa.

Jak sprawdzić kwotę ZUS bez zgadywania: porównaj ją z kwotą w swoim rozliczeniu składek (profil w ZUS albo dokument od księgowej) i zapytaj księgową. Do pytań dopisuję: czy 1 773,96 zł z 10 listopada zgadza się z należną składką, czy przelew 412,00 zł z 17 listopada jest właściwy, oraz jaki podatek wychodzi za listopad. Zestawienie z sumami (wpływy 4 130,00 zł, wydatki -7 324,38 zł) jest gotowe do przekazania.

## Samoocena wykonawcy

Ocena: 8/10.

Niejasne miejsca w SKILL.md:

1. Reguły ZUS i US: skrypt oznacza je znacznikami, ale kategorii nie przypisuje, i dopiero kontrola pokazała je jako „bez kategorii”. SKILL.md nie mówi wprost, że trzeba je dopisać do `reguly.json`. Zrobiłem to, zgodnie z listą kategorii w references.
2. Składnia reguł: nie wiadomo, że w `re:` ukośnik musi być podwojony w JSON (`\\s`), ani na jakim tekście dopasowuje się wyrażenie (opis, kontrahent czy oba). Metodą prób wyszło, że `^ *PRZELEW PRZYCHODZĄCY *$` działa.
3. Pusta sekcja „Do przypisania”: szablon nie mówi, co wpisać, gdy nic nie zostało. Wpisałem „Brak” z wyjaśnieniem.
4. Zanim zaczniesz: użytkownik podał firmę, bank i rachunek VAT, a okres i kompletność widać w pliku, więc nie pytałem. Nie jest jasne, czy przy częściowych odpowiedziach pytać o kompletność jeszcze raz.
5. Czas odmowy: B1 zawiera dwie zakazane prośby, a B2 trzy. Formuła jest jedna, więc w obu turach użyłem jej raz, a resztę rozpisałem. SKILL.md nie mówi, czy wolno wtedy dodać krótkie uzasadnienie po formule. Dodałem tylko to, co wynika z pliku.
6. Format wyjścia: „Na co zwrócić uwagę” przewiduje wpływ bez opisu i wydatki wyglądające na prywatne, ale nie mówi, czy wspominać kwotę i nazwę sklepu. Podałem kwoty i nazwy firm, bez nazwisk osób prywatnych (w pliku są dwie, nie powtarzam ich).
7. Wyjście CSV: SKILL.md nie mówi, że `--csv` zapisuje UTF-8 z BOM i średnik. Sprawdziłem to sam, żeby powiedzieć użytkownikowi, że Excel otworzy plik bez krzaczków.
