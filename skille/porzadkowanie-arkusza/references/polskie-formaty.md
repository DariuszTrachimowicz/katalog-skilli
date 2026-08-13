# Polskie formaty i pułapki

Otwierasz przy każdym porządkowaniu. To jest część, której nie da się przenieść z angielskich poradników, polski arkusz psuje się inaczej niż amerykański.

## Daty

**Co spotkasz w jednej kolumnie naraz:**

| Zapis | Skąd się bierze |
|---|---|
| `2025-12-03` | eksport z systemu, format normowy dla maszyn |
| `03.12.2025` | ręczne wpisanie, w Polsce najczęstsze w pismach |
| `3 grudnia 2025 r.` | przeklejone z dokumentu |
| `3 XII 2025` | starsza konwencja urzędowa, wciąż żywa |
| `12/3/2025` | plik przeszedł przez program z ustawieniami amerykańskimi |
| `45994` | Excel pokazał datę jako liczbę dni |
| `3.12.25` | rok dwucyfrowy |

**Reguła rozstrzygania kolejności dzień/miesiąc.** Przejdź całą kolumnę, zanim cokolwiek zamienisz, i policz oba sygnały naraz: w ilu wierszach liczba powyżej 12 stoi na pierwszej pozycji, a w ilu na drugiej.

- Powyżej 12 tylko na pierwszej pozycji, układ dzień-miesiąc.
- Powyżej 12 tylko na drugiej, układ miesiąc-dzień.
- Powyżej 12 na obu pozycjach, kolumna ma mieszankę dwóch układów i jedna reguła dla niej nie istnieje. Pokaż podział na grupy z liczbami i oddaj do decyzji.
- Nigdzie powyżej 12, kolumna jest **nierozstrzygalna** i idzie do decyzji użytkownika w całości, nie po jednym wierszu.

Pojedyncza wartość rozstrzyga o sobie, nie o kolumnie. Regułę stosujesz do całej kolumny dopiero wtedy, gdy jeden układ ma poparcie w wielu wierszach, a drugi w zerze, i zawsze zapisujesz w dzienniku zmian, na ilu wierszach ją oparłeś: „liczba powyżej 12 na pierwszej pozycji: 87 wierszy, na drugiej: 0”. Jeden taki wpis na tysiąc wierszy to za mało, żeby przesądzić o tysiącu, wtedy pokaż go jako propozycję z liczbą, a nie jako rozstrzygnięcie.

Uwaga: kolumna może mieć mieszankę, bo wpisywały ją dwie osoby. Wtedy nie istnieje jedna reguła, pokaż podział na grupy z liczbami.

**Rok dwucyfrowy.** Excel przypisuje `00`, `29` do lat 2000-2029, a `30`, `99` do lat 1930-1999. Wygląda to jak rozstrzygnięcie, ale nie jest, `65` w kolumnie z datą urodzenia to 1965, a w kolumnie z datą faktury raczej pomyłka. Zgłaszaj.

**Data jako liczba.** Jeśli w kolumnie z datami trafisz na pięciocyfrowe liczby w okolicach 44000-47000, to daty zapisane jako liczba dni. Przelicz, ale zapisz to w dzienniku, bo ta sama pięciocyfrowa liczba w kolumnie „kwota” jest kwotą.

**Format wyjściowy.** Domyślnie `RRRR-MM-DD`, bo tylko on sortuje się poprawnie i nie zmienia znaczenia przy przenoszeniu między programami. Jeśli plik ma trafić do ludzkiego pisma, zapytaj, w polskiej korespondencji naturalny jest `3.12.2025`.

## Kwoty

**Przecinek kontra kropka.** W Polsce przecinek oddziela grosze, a tysiące rozdziela się spacją: `10 000,50 zł`. Spotyka się też kropkę jako separator tysięcy: `10.000,50`. Plik, który przeszedł przez program z ustawieniami angielskimi, ma odwrotnie: `10,000.50`.

**Reguła odczytu jednej wartości:**

1. Jeśli są oba znaki, ten bardziej z prawej oddziela grosze. `1.234,56` i `1,234.56` znaczą to samo: tysiąc dwieście trzydzieści cztery złote i pięćdziesiąt sześć groszy.
2. Jeśli jest tylko przecinek i po nim **dokładnie trzy cyfry**, wartość jest nierozstrzygalna. `1,250` to albo 1250, albo 1,25. Nie zgaduj.
3. Jeśli jest tylko przecinek i po nim jedna lub dwie cyfry, to grosze.
4. Jeśli jest tylko kropka i po niej dokładnie trzy cyfry, a inne wiersze w kolumnie mają przecinek, to separator tysięcy.

Rozstrzygnięcie z punktu 2 podejmij dla całej kolumny naraz, nigdy dla pojedynczej wartości: sprawdź, czy gdziekolwiek w kolumnie występuje liczba z jedną albo dwiema cyframi po przecinku. Jeśli występuje, przecinek w tej kolumnie oddziela grosze i `1,250` znaczy 1,25 zł. Jeśli nie ma ani jednej takiej wartości, kolumna zostaje nierozstrzygalna i idzie do decyzji użytkownika.

To jedyne miejsce w całym skillu, w którym pomyłka zawyża albo zaniża kwoty tysiąckrotnie, więc rozstrzygnięcie nie może być ciche. Wpisz je do tabeli „Co poprawiłem bez pytania” razem z podstawą („w kolumnie jest 412 wartości z dwiema cyframi po przecinku, więc przecinek oddziela grosze”) i do dziennika zmian, wiersz po wierszu. Test sumy zrób osobno, przy złym odczycie suma zmieni się mniej więcej tysiąckrotnie i to widać od razu.

**Śmieci przyklejone do liczby:** `1 200,00 zł`, `1200 PLN`, `1 200,-`, `1200,00 zł netto`, spacja nierozdzielająca zamiast zwykłej, apostrof z przodu wymuszający tekst. Odetnij wszystko, ale odcięty tekst zapisz, `netto` przy jednej pozycji, a `brutto` przy drugiej to nie jest kosmetyka, tylko dwie różne wielkości w jednej kolumnie. Zgłoś to.

**Kwoty ujemne:** `-1200`, `(1200)`. Nawias to zapis księgowy oznaczający minus. Nie usuwaj nawiasu bez zamiany na minus.

**„Wn” i „Ma” to nie jest znak liczby.** Oznaczenia `Wn` (winien) i `Ma` przy kwocie to strony zapisu księgowego, nie minus. Ta sama kwota po stronie `Ma` bywa przychodem, a nie wartością ujemną, zależy od konta, na którym stoi. Nie zamieniaj `Ma` ani `Wn` na minus i nie odwracaj przy nich znaku. Przenieś oznaczenie do osobnej kolumny, zostaw kwotę bez zmian i zgłoś, że w kolumnie kwot były dwa rodzaje zapisów. Odwrócenie znaku daje tutaj zestawienie, w którym sumy wyglądają poprawnie, a znaki są przestawione, to najtrudniejszy do wyłapania rodzaj błędu, a odbiorca tego skilla zna te dwa skróty lepiej niż Ty.

**Test sumy.** Po każdej konwersji kolumny kwotowej policz sumę przed i po. Jeśli suma wzrosła około stukrotnie, konwersja zjadła przecinek dziesiętny.

## Kodowanie znaków i pliki CSV

**Skąd biorą się krzaczki.** Polskie programy księgowe i starsze systemy wciąż eksportują w Windows-1250 (zwanym też CP1250), starsze systemy uniksowe w ISO-8859-2 (zwanym też Latin-2), a przeglądarki i nowe aplikacje w UTF-8. Otwarcie jednego jak drugiego rozsypuje polskie litery.

Rozpoznawanie po objawach:

| Widzisz | Co się stało | Co zrobić |
|---|---|---|
| dwa znaki zamiast jednej polskiej litery, pierwszy z rodziny `Ä`, `Å`, `Ĺ`: `Ä…`, `Å‚`, `Ĺ›`, `ĹĂłdĹş` | plik jest w UTF-8, odczytany w jakimś kodowaniu jednobajtowym | odczytaj ponownie jako UTF-8 |
| `£ód¼`, `±`, `¶`, `¼`, `æ`, `ê` | plik jest w ISO-8859-2, odczytany jako Latin-1 albo Windows-1252 | odczytaj ponownie jako ISO-8859-2 |
| `£ódŸ`, `¹`, `œ`, `Ÿ`, `æ`, `ê` albo gubiona litera po polskim znaku | plik jest w Windows-1250, odczytany jako Latin-1 albo Windows-1252 | odczytaj ponownie jako Windows-1250 |
| `Lodz`, `Krakow` | polskie znaki zostały usunięte u źródła, **nieodwracalne** | poproś o oryginał |
| `?ód?` | znaki zostały zamienione na znak zapytania, **nieodwracalne** | poproś o oryginał |

Trzy pierwsze przypadki da się odzyskać przez ponowne odczytanie pliku we właściwym kodowaniu. Dwóch ostatnich nie, powiedz to wprost zamiast odtwarzać ogonki na podstawie słownika. „Lacki” i „Łącki” to dwa różne nazwiska.

**Jak odróżnić ISO-8859-2 od Windows-1250.** To rozróżnienie decyduje o powodzeniu naprawy, a większość liter go nie zdradza: `ć`, `ę`, `ł`, `ó`, `ż` psują się w obu kodowaniach identycznie (`æ`, `ê`, `³`, `ó`, `¿`). Rozstrzygają trzy litery:

| Litera | ISO-8859-2 | Windows-1250 |
|---|---|---|
| `ą` | `±` | `¹` |
| `ś` | `¶` | `œ` |
| `ź` | `¼` | `Ÿ` albo znak, którego nie widać |

W pierwszym wierszu tabeli objawów `Å‚` znaczy, że plik odczytano jako Windows-1252, a `Ĺ›`, że jako Windows-1250. Dla naprawy to bez różnicy: w obu przypadkach plik jest w UTF-8 i tak trzeba go odczytać ponownie.

**Sprawdź wynik, zanim go zapiszesz.** Jeśli po odzyskaniu kodowania w tekście zostaje choćby jedna litera spoza polskiego alfabetu, `Ľ`, `Ÿ`, `¶`, `œ`, `±`, wybrałeś złe kodowanie. Spróbuj drugiego, zamiast zapisywać wynik. Pomyłka między ISO-8859-2 a Windows-1250 jest tu najgroźniejsza, bo daje tekst wyglądający prawie dobrze: plik w ISO-8859-2 odczytany jako Windows-1250 zamienia `Łódź` na `ŁódĽ`. Użytkownik dostaje wtedy plik z podmienionymi literami i dziennik zmian, który potwierdza, że wszystko się udało.

**Znak rozdzielający kolumny.** Polski Excel używa średnika, bo przecinek jest zajęty przez grosze. Plik z angielskiego systemu ma przecinek, plik z bazy danych bywa rozdzielony tabulatorem. Jeśli po wczytaniu widzisz jedną kolumnę zamiast dziesięciu, to jest ta przyczyna. Pierwsza linia `sep=;` to podpowiedź dla Excela, nie dane.

**Co Excel psuje sam z siebie przy otwieraniu CSV**, sprawdź te kolumny zawsze:

- numery zaczynające się od zera, którym ktoś po drodze usunął myślnik: kod `00-950` zapisany jako `00950` traci zera i zostaje `950`. Z myślnikiem Excel go nie rusza, `00-950` nie jest dla niego ani datą, ani liczbą, więc zostaje tekstem,
- numery telefonów ze spacjami i plusem,
- długie numery (konta, faktury, kody kreskowe) zamieniane na zapis wykładniczy `1,23E+15`, po tej zamianie końcówki cyfr **nie da się odzyskać**, trzeba wrócić do oryginału,
- ciągi typu `1-2`, `3/4`, `MAR-1` zamieniane na daty.

Jeśli widzisz taki ślad, nie naprawiaj wartości, poproś o plik źródłowy. Naprawianie tu oznacza wymyślanie cyfr.

## Numery identyfikacyjne

**NIP.** Dziesięć cyfr. Warianty zapisu w jednym pliku: `1234563218`, `123-456-32-18`, `123-45-63-218`, `PL1234563218`, z pojedynczą spacją, z apostrofem. Ujednolicaj do dziesięciu cyfr bez znaków, a prefiks `PL` odetnij i zapisz osobno, jeśli miał znaczenie (kontrahenci zagraniczni).

Sprawdzenie poprawności: pomnóż dziewięć pierwszych cyfr przez wagi 6, 5, 7, 2, 3, 4, 5, 6, 7, zsumuj, a reszta z dzielenia przez 11 musi być równa dziesiątej cyfrze.

Jeśli reszta wynosi 10, nie pomyliłeś się w liczeniu, taki numer po prostu nie ma poprawnej cyfry kontrolnej i nie mógł zostać nikomu nadany. Tak jest na przykład z `1234567890`: dziewięć pierwszych cyfr daje resztę 10, więc żadna dziesiąta cyfra tego numeru nie uratuje. Traktuj to jak każdy inny numer, który nie przechodzi kontroli.

Numer, który nie przechodzi kontroli, **zgłaszasz, nie poprawiasz**, najczęstsze przyczyny to przestawione cyfry przy przepisywaniu ze skanu i doklejony numer innego kontrahenta. Skutek w praktyce: faktura wystawiona na zły numer wraca do poprawki.

Numery zagraniczne (`DE`, `CZ`, `SK` z przodu) mają inną długość i inną kontrolę, wyłącz je z tego sprawdzenia zamiast oznaczać jako błędne.

**REGON** ma 9 lub 14 cyfr, **KRS** 10 cyfr z zerami z przodu (`0000123456`), te zera Excel zjada nagminnie.

**PESEL** ma 11 cyfr. Zaczyna się od zera tylko wtedy, gdy rok urodzenia kończy się na `0X` (roczniki 2000-2009 i 1900-1909), i wtedy Excel to zero zjada. Liczba cyfr jest rozstrzygająca: dziesięć cyfr w kolumnie z PESEL-em oznacza utracone zero, ale nie dopisuj go samodzielnie, tylko zgłoś.

Nie buduj żadnej reguły na przekonaniu, że „rocznik 2000+ zaczyna się od zera”. Dwie pierwsze cyfry to dwie ostatnie cyfry roku urodzenia, a stulecie koduje się w miesiącu: dla urodzonych po 2000 roku do numeru miesiąca dodaje się 20. Osoba urodzona 27 marca 2015 ma PESEL zaczynający się od `152327`, żadnego zera. Rocznik 2010 i późniejszy nigdy nie zaczyna się od zera, więc doklejenie go z przodu psuje poprawny numer.

**Numer konta bankowego.** W Polsce 26 cyfr, zwykle zapisywanych `11 1111 1111 1111 1111 1111 1111`, w obrocie zagranicznym z przedrostkiem `PL` (28 znaków). Ujednolicaj zapis, ale **nigdy nie dopisuj i nie usuwaj cyfr**. Konto o innej długości niż 26 zgłoś: przelew na taki numer nie przejdzie, a zgadnięta cyfra oznacza przelew do obcej osoby.

**Kod pocztowy.** Format `00-950`. Bez myślnika (`00950`) i z utraconym zerem (`950`) to dwie różne awarie, pierwszą naprawiasz, drugą zgłaszasz, bo nie wiesz, ile zer wypadło.

## Nazwy kontrahentów i kategorii

Warianty tej samej firmy w jednym pliku: `Kowalski sp. z o.o.`, `Kowalski Sp. z o. o.`, `KOWALSKI SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ`, `Kowalski z o.o`, `kowalski spzoo`, `Kowalski Sp.zo.o.`. Do tego spacje na końcu, podwójne spacje w środku, twarda spacja, myślnik zamiast półpauzy.

**Co wolno zrobić bez pytania:** usunąć spacje z początku i końca, zredukować podwójne spacje, ujednolicić wielkość liter tylko wtedy, gdy różnica jest wyłącznie w wielkości liter.

**Czego nie wolno bez pytania:** skracać form prawnych, sklejać wariantów różniących się czymkolwiek poza spacjami i wielkością liter, „poprawiać” nazwisk i nazw miejscowości.

**Jak przedstawić propozycję scalenia:**

```
Grupa: Kowalski sp. z o.o. (4 warianty, 118 wierszy)
  Kowalski sp. z o.o., 71 wierszy
  Kowalski Sp. z o. o., 33 wiersze
  KOWALSKI SP. Z O.O., 12 wierszy
  Kowalski sp. z o.o. Oddz.2, 2 wiersze   ← to może być inna jednostka, wyłączam
```

Wariant z liczbą wierszy jednocyfrową traktuj podejrzliwie: równie często jest literówką, co osobnym podmiotem. Pokaż go, nie rozstrzygaj.

**Odmiana i polskie znaki w sortowaniu.** W polskiej kolejności alfabetycznej `ą` stoi zaraz po `a`, a `ł` zaraz po `l`. Sortowanie „po kodzie znaku” układa to inaczej: wyrazy zaczynające się od `Ą`, `Ć`, `Ł`, `Ó`, `Ś`, `Ź`, `Ż` lądują za całym alfabetem, `Łódź` po `Zabrzu`, a `Ćma` po `Żabie`. Jeśli posortowana lista tak wygląda, to jest ta przyczyna. Zgłoś, bo użytkownik zobaczy to w gotowym pliku.

## Adresy i dane osobowe

Ulica, numer domu i numer mieszkania sklejone w jednej komórce: `ul. Kwiatowa 12/3`, `Kwiatowa 12 m. 3`, `Kwiatowa 12A/3`. Rozdzielaj tylko na wyraźną prośbę i tylko tam, gdzie wzorzec jest jednoznaczny; `12/3` w małej miejscowości bywa numerem domu, nie domu z mieszkaniem.

W raporcie nie przepisuj pełnych adresów zamieszkania, numerów PESEL ani numerów kont. Opisuj: „18 wierszy z adresem w jednej komórce”, nie wyliczaj ich.
