---
nazwa: Pismo do urzędu
kategoria: Prawo
status: gotowy
wersja: 1.0.1
poziom: Działa od razu
aktualizacja: 2026-11-04
skrot: Układa pismo do urzędu we właściwej formie i mówi, czego w nim brakuje, zanim urząd wezwie Cię do uzupełnienia braków.
szukaj: pismo do urzędu, wniosek, podanie, odwołanie od decyzji, znak sprawy, braki formalne, e-Doręczenia, ZUS, urząd skarbowy, ponaglenie
tytulSeo: Jak napisać pismo do urzędu, wzór i kontrola braków formalnych
opisSeo: Wklej wezwanie z urzędu albo opisz sprawę, a dostaniesz gotowe pismo z poprawnym adresatem, znakiem sprawy i listą załączników. Za darmo, po polsku.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Układa pismo do polskiego urzędu tak, żeby nie wróciło: organ w adresie zamiast nazwy budynku, komplet danych nadawcy, znak sprawy przepisany dokładnie, żądanie w pierwszym zdaniu, numerowana lista załączników, podpis. Wszystko, czego nie wie na pewno, nazwę urzędu, numer konta, liczbę dni, zostawia jako pole do uzupełnienia i mówi, gdzie to sprawdzić. Na koniec wyliczy, czego jeszcze brakuje i jak wysłać pismo, żeby dało się udowodnić, że wpłynęło w terminie.

Działa też w drugą stronę: możesz wkleić własne pismo albo wezwanie z urzędu i dostać listę braków zamiast gotowego tekstu.

## Dla kogo

Właściciele małych firm, osoby prowadzące jednoosobową działalność, kierownicy biur, kadrowe, biura rachunkowe i wszyscy, którzy załatwiają sprawę urzędową bez pełnomocnika, a dostali wezwanie, decyzję albo muszą coś złożyć w terminie.

## Ile Ci to oszczędza

Samo wezwanie do uzupełnienia braków formalnych kosztuje zwykle od dwóch do czterech tygodni: pismo idzie do Ciebie, Ty odpisujesz, sprawa wraca na biurko. Skill wyłapuje te braki, zanim pismo wyjdzie z domu.

Napisanie pisma od zera zajmuje godzinę i kończy się przeglądaniem cudzych wzorów, które nie pasują do Twojej sprawy. Tu jest to kilka minut do tekstu z Twoimi danymi i Twoim znakiem sprawy.

## Przykład z życia

Marta prowadzi jednoosobową firmę sprzątającą. 14 lipca odbiera decyzję ze znakiem `GK.6233.412.2026.KJ`, w której pouczenie daje jej **14 dni** na odwołanie. Marta pisze pismo i adresuje je wprost do urzędu, który ma je rozpatrzyć.

Skill pokazuje dwie rzeczy. Po pierwsze: odwołanie składa się za pośrednictwem urzędu, który decyzję wydał, a nazwę urzędu odwoławczego przepisuje się z pouczenia, a nie zgaduje, pismo wysłane od razu pod zły adres wędruje między urzędami **3-4 tygodnie**, czyli dwa razy dłużej, niż wynosi cały termin, a ten w tym czasie biegnie. Po drugie: w piśmie Marty brakuje trzech rzeczy, znaku sprawy w nagłówku, NIP-u i listy załączników. A dołączona jest kopia decyzji, o której w treści nie ma słowa.

Okoliczności Marta opisuje sama, swoimi słowami, skill zostawia na nie puste pole i mówi wprost, że tego za nią nie napisze. Nadaje pismo **25 lipca**, trzy dni przed końcem terminu, w placówce Poczty Polskiej i zachowuje dowód nadania.

## Jak po polsku

Zbudowany wyłącznie pod polskie urzędy. Zna rzeczy, których nie ma w żadnym zagranicznym narzędziu do pism: różnicę między Wójtem, Burmistrzem a Prezydentem Miasta w adresie i to, że nie da się jej rozstrzygnąć po wielkości miasta, więc trzeba tę nazwę sprawdzić; formaty znaku sprawy w gminie, w Krajowej Informacji Skarbowej i w ZUS; wymóg podania NIP-u albo PESEL-u w sprawach podatkowych; pieczątkę wpływu na Twojej kopii jako dowód złożenia.

Uwzględnia zmianę, która weszła na początku 2026 roku: e-Doręczenia zamiast ePUAP-u jako podstawowy kanał kontaktu z urzędem, adres w formacie `AE:PL-…`, dowód wysłania i dowód otrzymania zamiast pieczątki. Wie też, że nadanie listu u kuriera nie działa tak samo jak nadanie na poczcie, gdy termin mija tego samego dnia.

## Czego potrzebujesz

Dowolny płatny plan Claude. Do pracy wystarczy opis sprawy, a jeśli masz pismo z urzędu, jego treść wklejona, w PDF-ie albo w Wordzie. Żadnych konektorów, kont ani konfiguracji.

## Na czym się wywala

- **Nie ustali za Ciebie, który urząd jest właściwy.** Zna nazewnictwo organów, ale nie wie, pod którą gminę podlega Twój adres ani który wydział prowadzi ten typ spraw. Zostawi pole do uzupełnienia i wskaże, gdzie sprawdzić, nie zgadnie.
- **Nie zna aktualnych kwot opłat ani numerów kont.** Różnią się między gminami i zmieniają się w czasie, więc skill konsekwentnie ich nie podaje. To bywa irytujące i jest zrobione celowo, zmyślony numer konta kosztuje więcej niż jedna wizyta na stronie BIP.
- **Nie zna urzędowych formularzy.** W wielu sprawach urząd wymaga własnego wzoru i pismo napisane od siebie go nie zastąpi. Skill o tym uprzedzi, ale formularza nie pobierze i nie odtworzy z pamięci, numery pól zmieniają się między latami.
- **Terminy liczy tylko z tego, co mu podasz.** Nie wie, kiedy list do Ciebie dotarł, więc opiera się na dacie doręczenia i pouczeniu, które sam przepiszesz. Pomyłka w tej dacie przechodzi przez skill niezauważona.
- **Nieczytelny skan.** Jeśli znaku sprawy nie da się odczytać ze zdjęcia, skill go nie zgadnie, powie, że go nie widzi.
- **Opis okoliczności piszesz sam.** Skill ułoży całą formę, ale środek pisma, co się stało, kiedy i czego nie dostałeś, zostawi jako puste pole. Przy odwołaniu, zażaleniu i ponagleniu to jest uzasadnienie, a uzasadnień skill nie pisze. Bez Twojego akapitu pismo jest niekompletne i skill powie to wprost.
- **Organu odwoławczego nie wskaże.** Od decyzji tego samego urzędu odwołanie idzie raz w jedno miejsce, raz w drugie, zależnie od rodzaju sprawy. Skill każe przepisać nazwę z pouczenia na końcu decyzji, zamiast ją obstawiać.

## Czego ten skill nie robi celowo

Kończy się na urzędzie. Skargi do sądu administracyjnego, pozwu ani żadnego pisma procesowego nie napisze, tam błąd formalny nie kończy się wezwaniem do uzupełnienia, tylko odrzuceniem pisma. Nie napisze też pełnomocnictwa ani upoważnienia: to dokument, który daje innej osobie prawo działania w Twojej sprawie, a źle zakreślony zakres oznacza cudze decyzje na Twoje konto, powie za to, czego urząd przy nim wymaga i gdzie szukać wzoru.

Nie ocenia, czy masz rację ani jakie są Twoje szanse. Nie buduje uzasadnienia prawnego, nie powołuje przepisów i nie tłumaczy, co decyzja „znaczy prawnie”. Nie pisze za Ciebie opisu okoliczności, bo w odwołaniu to właśnie on jest uzasadnieniem. Nie mówi, czy urząd postąpił słusznie. Jeśli o to poprosisz, odmówi, także za drugim i trzecim razem, i wróci do pracy nad formą.

To granica postawiona świadomie. Pismo przegrywa najczęściej nie dlatego, że argument był słaby, tylko dlatego, że poszło do złego organu, bez podpisu albo bez znaku sprawy, i wróciło po trzech tygodniach. Tę część da się zrobić rzetelnie bez prawnika. Ocena sprawy to już inna robota i inna odpowiedzialność.
