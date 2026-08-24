# Cykl 3 audytu merytorycznego: ksef-procedury

Audytor: audyt merytoryczny, cykl 3 (skoncentrowany).
Data: 24 sierpnia 2026.
Pliki przeczytane w całości: `SKILL.md`, `references/stan-prawny.md`,
`references/komponenty.md`, `references/granice.md`. Pomocniczo sprawdzono
wystąpienia w `assets/przyklady/macierz-odpowiedzialnosci.md` (nie jest to plik
z zakresu, ale powiela wzorce z komponentów).

Zakres: wyłącznie trzy obszary przepisane przez audytora cyklu 2. Nie otwierano
nowych frontów.

## Obszar 1. Przejścia między trybami szczególnymi

### Ustalenia

Reguła bazowa jest w obu plikach referencyjnych zapisana zgodnie ze stanem
przyjętym w tym wydaniu.

`references/stan-prawny.md`, linie 198-204:

> **Awaria całkowita zdejmuje obowiązek przesłania także z faktur wystawionych
> wcześniej:** faktury wystawionej w trybie offline24 przed ogłoszeniem awarii
> całkowitej, a jeszcze nieprzesłanej, NIE przesyła się do systemu; tak samo
> faktury z okresu niedostępności, której termin przesłania zbiega się z awarią
> całkowitą. Takie faktury pozostają bez numeru KSeF, co trzeba odnotować
> w rejestrze i uwzględnić przy zasadach płatności.

`references/komponenty.md`, linie 264-269:

> **Wyjątek awarii całkowitej działa też wstecz na nieprzesłane faktury:**
> faktury wystawionej w offline24 przed ogłoszeniem awarii całkowitej, a jeszcze
> nieprzesłanej, NIE przesyła się do systemu; tak samo faktury z okresu
> niedostępności, której termin przesłania zbiega się z awarią całkowitą.

Spójne są też dwa miejsca zależne, co warto odnotować na plus:

- zasady płatności, `references/komponenty.md` linie 750-752: „faktury bez
  numeru KSeF wskutek awarii całkowitej ten obowiązek nie obejmuje, bo nie ma
  czego podać”;
- `references/stan-prawny.md` linia 239: „(faktur pozostających bez numeru
  wskutek awarii całkowitej obowiązek nie obejmuje)”.

Nigdzie w czterech plikach nie znaleziono sformułowania wprost odwrotnego
(„po zakończeniu awarii całkowitej dosyła się zaległe faktury”). Problem jest
inny: reguła wsteczna żyje w dwóch akapitach, a co najmniej pięć miejsc
operacyjnych zostało w kształcie sprzed zmiany, w tym jedno pytanie kontrolne,
które wprost przeczy nowej regule.

`references/komponenty.md`, linie 663-664 (wariant B, przegląd wykonania
procedur):

> - Czy wszystkie faktury z trybów podlegających przesłaniu (offline24,
>   niedostępność, tryb awaryjny) mają nadane numery? Czy faktury z ewentualnej
>   awarii całkowitej zostały prawidłowo pozostawione bez przesłania?

Pierwsze pytanie jest starym brzmieniem: w scenariuszu, który to wydanie samo
nazywa realnym, faktura z offline24 zwolniona przez awarię całkowitą numeru NIE
ma i mieć nie będzie. Drugie pytanie tego nie ratuje, bo dotyczy tylko faktur
WYSTAWIONYCH w awarii całkowitej, a nie faktur wystawionych wcześniej i z
przesłania zwolnionych.

`references/komponenty.md`, linie 245-249 (część B, krok 6 lit. a):

> - **tryby 1 do 3:** po powrocie dostępu jedna wskazana osoba na każdą ścieżkę
>   wystawiania przesyła faktury do systemu i zapisuje nadane numery w karcie
>   zdarzenia

Krok jest bezwarunkowy; wyjątek pojawia się dopiero w osobnym akapicie kilka
linii dalej, a firma kopiuje do procedury listę kroków.

`references/komponenty.md`, linia 123 (wiersz macierzy) oraz linie 327-328
(karta zdarzenia):

> | Przesłanie faktur wystawionych w trybie offline24, przy niedostępności albo
> w trybie awaryjnym | ... | nie dotyczy awarii całkowitej |

> Czy tryb wymaga przesłania do systemu: [UZUPEŁNIJ: tak przy offline24,
>   niedostępności i trybie awaryjnym; nie przy awarii całkowitej]

Oba miejsca dzielą świat według TRYBU WYSTAWIENIA, więc nie mieszczą kategorii
„wystawiona w offline24, zwolniona z przesłania przez późniejszą awarię
całkowitą”. Ten sam wzorzec powtarza `assets/przyklady/macierz-odpowiedzialnosci.md`
linia 67.

`references/stan-prawny.md`, linie 83-85 (katalog naruszeń objętych karą):

> nieprzesłanie w terminie do systemu faktury wystawionej w trybie offline24,
> w trybie awaryjnym albo w okresie niedostępności.

Bez zastrzeżenia o fakturach zwolnionych przez awarię całkowitą. To jest
miejsce, do którego firma zajrzy w panice, i które popchnie ją do wysyłki
wbrew regule z linii 198-204.

`SKILL.md` nie niesie reguły wstecznej w ogóle: zasada 6 (linie 82-84) mówi
tylko, że „faktur z tego trybu nie przesyła się do systemu”, a krok kontroli
(linia 209) sprawdza jedynie, czy karta „wyłącza awarię całkowitą z
przesyłania”. Lista kontrolna w `references/komponenty.md` linie 858-863 ma to
samo ograniczenie plus ogólne pytanie o termin wpadający w kolejne zdarzenie.

Wreszcie odesłanie „odnotować w rejestrze” (`stan-prawny.md` linia 202,
`komponenty.md` linia 269) wskazuje artefakt, którego w pakiecie nie ma:
jedynym rejestrem jest rejestr odrzuceń (`komponenty.md` linia 24 i linie
30-33, gdzie zakazuje się nazw „rejestr zdarzeń” i „rejestr błędów”), a faktura
zwolniona z przesłania nie została odrzucona.

### Usterki

**U1.1 - BLOKER - `references/komponenty.md`, linie 663-664.**
Pytanie kontrolne wariantu B niesie starą, odwrotną wersję reguły: każe uznać
brak numeru za lukę także tam, gdzie brak numeru jest stanem prawidłowym, i
popycha firmę do wysyłki faktur, których wysyłać nie wolno. Wynik trafia do
protokołu stanu wdrożenia jako pozycja „BRAKUJE (kto domyka, do kiedy)”.
Poprawka: „Czy faktury z trybów podlegających przesłaniu (offline24,
niedostępność, tryb awaryjny) mają nadane numery, a te, które zostały zwolnione
z przesłania przez ogłoszoną w międzyczasie awarię całkowitą, są w karcie
zdarzenia opisane jako pozostające bez numeru KSeF wraz z treścią ogłoszenia?”

**U1.2 - DROBNE - `references/komponenty.md`, linie 245-249.**
Krok 6 lit. a nakazuje przesłanie bezwarunkowo. Poprawka: dopisać na końcu
podpunktu „chyba że przed przesłaniem ogłoszono awarię całkowitą; wtedy
obowiązuje akapit o przejściach między trybami i faktur się nie przesyła”.

**U1.3 - DROBNE - `references/komponenty.md`, linia 123 i linie 327-328.**
Wiersz macierzy i pole karty zdarzenia nie mieszczą kategorii faktur
zwolnionych wstecz. Poprawka: w macierzy uwagę zmienić na „nie dotyczy awarii
całkowitej ani faktur zwolnionych z przesłania przez ogłoszoną awarię
całkowitą”; w karcie zdarzenia rozszerzyć podpowiedź o trzecią wartość:
„tak, ale zwolnione z przesłania przez awarię całkowitą ogłoszoną dnia
[UZUPEŁNIJ]”. Ten sam wzorzec poprawić w
`assets/przyklady/macierz-odpowiedzialnosci.md`, linia 67.

**U1.4 - DROBNE - `references/stan-prawny.md` linia 202 i
`references/komponenty.md` linia 269.**
Polecenie „odnotować w rejestrze” wskazuje artefakt spoza nazw kanonicznych.
Poprawka: „odnotować w karcie zdarzenia, a jeśli dokument trafił wcześniej do
rejestru odrzuceń, domknąć tam wpis adnotacją o zwolnieniu z przesłania”.

**U1.5 - DROBNE - `references/stan-prawny.md`, linie 83-85.**
Katalog naruszeń bez zastrzeżenia o fakturach zwolnionych przez awarię
całkowitą. Poprawka: dopisać po trzecim myślniku listy „z zastrzeżeniem faktur,
z których obowiązek przesłania zdjęła ogłoszona awaria całkowita (patrz
Przejścia między trybami)”.

**U1.6 - DROBNE - `SKILL.md` linie 82-84 i 209 oraz
`references/komponenty.md` linie 858-863.**
Reguła wsteczna nie ma śladu w pliku zawsze wczytywanym ani w bramkach
kontrolnych. Poprawka: w zasadzie 6 dopisać pół zdania („awaria całkowita
zdejmuje obowiązek przesłania także z faktur wystawionych wcześniej i jeszcze
nieprzesłanych”), a do listy kontrolnej dodać pozycję: „Czy dokument
rozstrzyga, co się dzieje z fakturami z offline24 i z niedostępności, których
przesłania nie zdążono wykonać przed ogłoszeniem awarii całkowitej?”

## Obszar 2. Kody QR po przesłaniu faktury awaryjnej

### Ustalenia

Sprawdzono KAŻDE wystąpienie „KOD”, „QR”, „kod”, „certyfikat typu 2”, „dwa
kody” i „dwóch kodów” w czterech plikach (oraz pomocniczo w przykładzie
macierzy). Reguła jest wszędzie podana z warunkiem momentu i nigdzie nie
występuje jako ogólna ani jako obowiązująca po przesłaniu.

`references/stan-prawny.md`, linie 151-156:

> **Certyfikat typu 2** służy do utworzenia KODU II na wizualizacji faktury
> z trybu offline udostępnianej poza systemem PRZED jej przesłaniem (czyli tam,
> gdzie obowiązuje reguła dwóch kodów). Po przesłaniu faktury wystarcza KOD I
> z numerem KSeF.

`references/stan-prawny.md`, linie 212-220, tabela momentów:

> - faktura **już przesłana** do systemu, wizualizacja udostępniana poza
>   systemem: **jeden kod (KOD I) z numerem KSeF**;
> - faktura z trybu awaryjnego udostępniana poza systemem **przed przesłaniem**
>   do systemu: **dwa kody** (po przesłaniu wizualizacja ma już jeden KOD I
>   z numerem KSeF).

To jest dokładnie punkt zakwestionowany w cyklu 2 i jest domknięty: wiersz
trybu awaryjnego sam niesie zastrzeżenie „po przesłaniu”.

`references/stan-prawny.md`, linie 227-229, wprost zakazuje reguły ogólnej:

> Nigdy nie pisz reguły „każda faktura wystawiona poza systemem wymaga dwóch
> kodów”. Jest za szeroka i prowadzi do uznania prawidłowej faktury z jednym
> kodem za wadliwą.

`references/komponenty.md`, linie 297-303, powiela tabelę bez rozjazdu, w tym
wiersz trybu awaryjnego z uwagą „jak wyżej; po przesłaniu wizualizacja ma już
jeden KOD I z numerem KSeF” oraz wiersz awarii całkowitej „reguła dwóch kodów
nie ma zastosowania”.

Pozostałe wystąpienia sprawdzone pojedynczo i wszystkie warunkowe:
`komponenty.md` linia 196 (pytanie wywiadu, „certyfikat typu 2 potrzebny do
KODU II”), linie 305-311 (znaczenie kodów, bez liczby), linie 314-316 (kto
sprawdza liczbę kodów „w każdej z powyższych sytuacji”), linie 358-361
(pułapka: „wizualizacji faktury offline udostępnianej poza systemem przed
przesłaniem (sytuacje z regułą dwóch kodów)”), linia 642 (próba 6: „jeden kod
po przesłaniu i dwa kody przed przesłaniem”), linia 643 (próba 7), linia 670
(przegląd: „jeśli udostępnia faktury poza systemem przed przesłaniem”), linie
864-865 (lista kontrolna: „a nie jako ogólne »dwa kody zawsze«”).
`assets/przyklady/macierz-odpowiedzialnosci.md` linia 73 również: „jeden kod po
przesłaniu, dwa kody przed przesłaniem”. `SKILL.md` linia 75 mówi neutralnie
o „regule jednego i dwóch kodów”. `granice.md` tematu nie dotyka.

### Usterki

Brak. Obszar domknięty, poprawka z cyklu 2 weszła we wszystkie miejsca, łącznie
z planem testów, listą kontrolną i przykładem macierzy. Nic do zmiany.

## Obszar 3. Status i data wystawienia dokumentu odrzuconego

### Ustalenia

Status dokumentu odrzuconego opisują dwa miejsca.

`references/stan-prawny.md`, linie 255-266:

> - Plik odrzucony przez system **nie jest fakturą ustrukturyzowaną przyjętą
>   przez system** i nie ma numeru KSeF. Odrzucenie jest zdarzeniem wymagającym
>   reakcji, nie usterką informatyczną do zignorowania.
> - **Nie wolno z braku numeru KSeF wyprowadzać wniosku, że „faktury nie ma”
>   ani że „płatność jest bez podstawy”.**

`references/komponenty.md`, linie 551-557, powtarza to samo do wpisania
w dokument klienta, z tym samym sformułowaniem „nie jest fakturą
ustrukturyzowaną przyjętą przez system”.

Pierwsza część pytania z zakresu cyklu 3 jest więc pokryta tylko połowicznie:
pliki mówią jasno, że dokument odrzucony NIE ma numeru KSeF i nie jest
przyjęty przez system, ale świadomie nie mówią, że „nie jest fakturą”, bo
kwalifikację materialną oddają księgowej. To jest wybór obronny i sam w sobie
nie jest błędem; problemem jest okrężne brzmienie („nie jest fakturą
ustrukturyzowaną PRZYJĘTĄ przez system” to zdanie prawie tautologiczne),
które zostawia czytelnika bez prostego zdania o tym, czego na pewno nie ma:
dokumentu w KSeF, numeru KSeF i podstawy do posługiwania się nim jako fakturą
ustrukturyzowaną w obrocie.

Druga część pytania, o datę wystawienia po poprawieniu i ponownym przesłaniu,
NIE jest pokryta w ogóle. W całym pakiecie fraza „data wystawienia” występuje
jeden raz, w `references/stan-prawny.md` linie 13-14, i to nie jako fakt
przyjęty, tylko jako ilustracja stylu pisania:

> Zamiast tytułu ustawy i numeru artykułu podaj, co się z czego wynika
> („faktura ustrukturyzowana wysłana do systemu ma za datę wystawienia dzień
> przesłania, a tryby szczególne mają własne zasady daty”...)

Sekcja „Fakty przyjęte w tym wydaniu” tej reguły nie zawiera, sekcja
„Odrzucenie pliku przez system” do niej nie wraca, a szablon rejestru odrzuceń
(`references/komponenty.md`, linia 541) ma kolumny „Data i godzina”, „Numer
własny faktury”, „Data ponownej wysyłki” i „Numer nadany”, ale nie ma kolumny
na datę wystawienia po przyjęciu. Ścieżka reakcji (linie 559-577) mówi
o poprawieniu pliku i ponownej wysyłce, milczy o dacie.

Jedyne miejsce, które ociera się o temat, spycha go w całości do księgowej,
`references/komponenty.md` linie 610-612:

> - **Odrzucenie na przełomie miesiąca.** Dokument odrzucony ostatniego dnia
>   miesiąca i poprawiony pierwszego to sprawa dla księgowej. Skill odnotowuje
>   fakt i kieruje pytanie do niej, nie rozstrzyga ujęcia.

To jest dwuznaczne: ujęcie księgowe rzeczywiście należy do księgowej, ale sama
data wystawienia faktury ustrukturyzowanej jest faktem systemowym tej samej
rangi co brak numeru KSeF przy awarii całkowitej, a wydanie zakazuje oznaczania
faktów ustalonych jako niewiadomych (`SKILL.md` zasada 5, linie 74-77). W
efekcie firma dostaje procedurę, z której nie wynika, czy poprawiony i ponownie
przesłany dokument zachowuje pierwotną datę wystawienia, czy dostaje nową.

### Usterki

**U3.1 - BLOKER - `references/stan-prawny.md` sekcja „Odrzucenie pliku przez
system” (linie 253-266) oraz `references/komponenty.md` sekcja 4 (linie
539-577).**
Brak jakiegokolwiek rozstrzygnięcia daty wystawienia po poprawieniu i ponownym
przesłaniu, mimo że rejestr odrzuceń jest jednym z siedmiu komponentów, a
pułapka „odrzucenie na przełomie miesiąca” jest opisana. Poprawka: w
`stan-prawny.md` przenieść regułę z linii 13-14 do „Faktów przyjętych w tym
wydaniu” i dopisać w sekcji o odrzuceniu zdanie w rodzaju: „dokument odrzucony
nie ma daty wystawienia nadanej przez system; po poprawieniu i skutecznym
przesłaniu za datę wystawienia faktury ustrukturyzowanej przyjmuje się dzień
przesłania do systemu, a tryby szczególne mają własne zasady daty
`[WYMAGA WERYFIKACJI: zasada daty wystawienia przy ponownym przesłaniu; źródło:
ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/]`”. W `komponenty.md` dodać
do rejestru odrzuceń kolumnę „Data wystawienia po przyjęciu” oraz jedno zdanie
w instrukcji przy kolumnach; w ścieżce reakcji, krok 3, dopisać, że osoba
wystawiająca zapisuje tę datę razem z numerem.

**U3.2 - DROBNE - `references/stan-prawny.md` linie 255-256 i
`references/komponenty.md` linie 551-553.**
Sformułowanie „nie jest fakturą ustrukturyzowaną przyjętą przez system” jest
okrężne i nie daje czytelnikowi prostego zdania o skutku. Poprawka: rozbić na
dwa poziomy: „w Krajowym Systemie e-Faktur taki dokument nie istnieje: nie ma
numeru KSeF, nie jest dostępny dla nabywcy w systemie i nie posługuje się nim
jako fakturą ustrukturyzowaną” oraz zachowane już zastrzeżenie, że ocena, czy
dokument jest fakturą w rozumieniu przepisów o podatku od towarów i usług,
należy do księgowej albo doradcy podatkowego.

**U3.3 - DROBNE - `references/komponenty.md` linie 610-612.**
Pułapka „odrzucenie na przełomie miesiąca” oddaje księgowej całość, w tym
element będący faktem systemowym. Poprawka: rozdzielić wprost: „datę wystawienia
po ponownym przesłaniu wyznacza system (patrz sekcja 4, kolumna „Data
wystawienia po przyjęciu”); ujęcie w rozliczeniu miesiąca rozstrzyga księgowa”.

## WERDYKT

Obszar 2 jest czysty i nie wymaga już żadnej zmiany. Obszar 1 ma poprawnie
zapisaną regułę bazową, ale w co najmniej sześciu miejscach operacyjnych została
konstrukcja sprzed zmiany, w tym jedno pytanie kontrolne, które wprost przeczy
przyjętemu stanowi prawnemu i w protokole stanu wdrożenia wygeneruje fałszywą
lukę. Obszar 3 nie rozstrzyga daty wystawienia dokumentu poprawionego i
przesłanego ponownie, co przy istniejącej pułapce „na przełomie miesiąca” jest
luką merytoryczną, nie stylistyczną.

Blokery: U1.1 i U3.1. Drobne: U1.2, U1.3, U1.4, U1.5, U1.6, U3.2, U3.3.

WERDYKT (cykl 3): blokery do wydania TAK

## Weryfikacja poprawek (cykl 3b)

Data: 24 sierpnia 2026. Podstawa: ponowny Read aktualnych plików
(`SKILL.md`, `references/stan-prawny.md`, `references/komponenty.md`,
`references/granice.md`) plus `assets/przyklady/macierz-odpowiedzialnosci.md`.

### 1. Czy każda z 9 poprawek weszła

| Usterka | Miejsce po zmianie | Stan |
|---|---|---|
| U1.1 | `komponenty.md` linie 673-677 | weszła, brzmienie zgodne z propozycją; pytanie rozbite na dwa: numery dla faktur przesłanych oraz opis faktur zwolnionych wstecz w karcie zdarzenia wraz z treścią ogłoszenia, a osobno faktury wystawione w awarii całkowitej |
| U1.2 | `komponenty.md` linie 246-251 | weszła: „chyba że przed przesłaniem ogłoszono awarię całkowitą (wtedy obowiązuje akapit o przejściach między trybami i faktur się nie przesyła)” |
| U1.3 | `komponenty.md` linia 123 oraz linie 331-334 | weszła w obu miejscach; karta zdarzenia ma trzecią wartość pola z datą ogłoszenia; ten sam wzorzec poprawiony w przykładzie macierzy, linia 67 |
| U1.4 | `stan-prawny.md` linie 204-206, `komponenty.md` linie 270-273 | weszła: karta zdarzenia jako miejsce właściwe, rejestr odrzuceń tylko do domknięcia istniejącego wpisu |
| U1.5 | `stan-prawny.md` linie 85-87 | weszła: „z zastrzeżeniem faktur, z których obowiązek przesłania zdjęła ogłoszona awaria całkowita” |
| U1.6 | `SKILL.md` linie 82-85 i 209-211, `komponenty.md` linie 902-904 | weszła we wszystkich trzech miejscach |
| U3.1 | `stan-prawny.md` linie 272-279, `komponenty.md` linia 547, 554-557, 581-583 | weszła: nowy punkt „Data wystawienia po poprawieniu i ponownym przesłaniu”, nowa kolumna rejestru, zdanie w instrukcji kolumn, krok 3 ścieżki reakcji |
| U3.2 | `stan-prawny.md` linie 259-262, `komponenty.md` linie 559-562 | weszła: proste zdanie o skutku („w Krajowym Systemie e-Faktur nie istnieje: nie ma numeru KSeF, nie jest dostępny dla nabywcy w systemie...”) |
| U3.3 | `komponenty.md` linie 620-623 | weszła: fakt systemowy (data) rozdzielony od ujęcia (księgowa) |

Wszystkie dziewięć poprawek jest obecnych, w brzmieniu zgodnym z propozycjami
z cyklu 3.

### 2. Czy któraś zepsuła sąsiedni tekst albo wprowadziła sprzeczność

- **Nowy punkt o dacie wystawienia wobec zasady „nie oznaczaj faktów
  ustalonych”** (`SKILL.md` zasada 5, linie 74-77): bez sprzeczności. Reguła
  bazowa („po poprawieniu i skutecznym przesłaniu faktura ustrukturyzowana ma za
  datę wystawienia dzień przesłania do systemu”) jest podana płasko, bez
  znacznika, a znacznik `[WYMAGA WERYFIKACJI]` obejmuje wyłącznie wartość węższą
  i realnie zmienną: zasadę daty przy ponownym przesłaniu w konkretnym trybie.
  To jest dokładnie ten sposób użycia znacznika, którego wymaga zasada 5.
- **Nowy punkt wobec sekcji o czterech trybach** (`stan-prawny.md` linie
  171-208): bez sprzeczności. Zdanie „a tryby szczególne mają własne zasady daty”
  nie koliduje z awarią całkowitą, w której przesłania nie ma, bo reguła dnia
  przesłania jest tam z definicji bezprzedmiotowa i nie została rozciągnięta na
  ten tryb.
- **Status dokumentu odrzuconego**: zdanie o nieistnieniu w systemie i zakaz
  wyprowadzania wniosku „faktury nie ma” stoją obok siebie na dwóch różnych
  poziomach (system a przepisy o podatku od towarów i usług) i są tak nazwane
  w obu plikach. Bez sprzeczności.
- **Krok 6 lit. a**: wtrącenie nie rozbiło zdania, dalszy ciąg („właściciel
  dokumentu potwierdza komplet; dopiero wtedy zdarzenie zostaje zamknięte”)
  pozostał czytelny i nadal domyka obie ścieżki.
- **Obszar 2 nietknięty**: tabele kodów QR w `stan-prawny.md` (linie 216-229)
  i `komponenty.md` (linie 301-307) są w brzmieniu sprzed poprawek, bez
  ubocznych zmian.
- **Długie myślniki**: zero wystąpień pauzy i półpauzy w `SKILL.md` i w plikach
  `references/` (sprawdzone maszynowo).

### 3. Tabela rejestru odrzuceń

Nagłówek: 11 kolumn (Data i godzina, Numer własny faktury, Kontrahent
(oznaczenie), Kod / komunikat błędu, Przyczyna po ludzku, Tryb wystawienia,
Co zrobiono, Data ponownej wysyłki, Numer nadany, Data wystawienia po przyjęciu,
Kto). Separator: 11 kolumn. Zgodność potwierdzona maszynowo (11 = 11).

### Nowe usterki

**N1 - DROBNE - `references/komponenty.md`, linie 554-557.**
Zdanie instrukcji kolumny brzmi: „«Data wystawienia po przyjęciu» to data
wystawienia, jaką faktura ma po skutecznym przesłaniu (zasadę daty opisuje plik
stanu prawnego w sekcji o odrzuceniu)”. Cała ta instrukcja jest tekstem
przeznaczonym do dokumentu klienta, a nawias odsyła do wewnętrznego pliku
skilla, którego klient nigdy nie zobaczy. Poprawka: skreślić nawias albo
zastąpić go odesłaniem do sekcji „Źródła i data sprawdzenia” w dokumencie.
Nie blokuje wydania.

**Obserwacja bez wagi usterki.** Wiersz rejestru odrzuceń dotyczący dokumentu,
który został zwolniony z przesłania przez awarię całkowitą, będzie miał kolumnę
„Data wystawienia po przyjęciu” pustą (nie było przyjęcia). Wynika to
z brzmienia instrukcji i z adnotacji o zwolnieniu z przesłania, więc nie wymaga
zmiany; przy kolejnym wydaniu można to dopowiedzieć jednym półzdaniem.

### Wynik

Oba blokery cyklu 3 (U1.1 i U3.1) są usunięte, siedem drobnych też. Nie
znaleziono nowej sprzeczności ani uszkodzenia sąsiedniego tekstu; jedyne nowe
znalezisko (N1) ma wagę DROBNE i nie wstrzymuje wydania.

WERDYKT: blokery do wydania NIE
