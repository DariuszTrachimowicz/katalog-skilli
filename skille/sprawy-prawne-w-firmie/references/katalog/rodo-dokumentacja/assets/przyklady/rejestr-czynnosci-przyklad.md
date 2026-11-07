# WZÓR FORMY: Rejestr czynności przetwarzania

> **To jest wzór formy, nie dokument do podmiany nazw.** Pokazuje układ
> dokumentu, obowiązkowe elementy i sposób opisywania pól. Każde pole zależne od
> realiów firmy zawiera opis tego, co ma się w nim znaleźć, a nie gotową treść.
> Zrobiono tak celowo: wypełniony przykładowy rejestr z nazwiskami, systemami
> i okresami przechowywania trafiałby do dokumentów klientów w niezmienionej
> postaci i opisywał firmę, której nie ma.
>
> **W tym pliku nie ma ani jednej gotowej wartości do przeklejenia.** Komórki
> tabeli niosą opis tego, co ma się w nich znaleźć, i poziom szczegółowości,
> jakiego oczekujemy, a nie treść dla jakiejkolwiek firmy. Nie ma tu też ani
> jednej danej osobowej: osoby występują jako role, bez imion, nazwisk, numerów
> PESEL, adresów i danych kontaktowych. Do dokumentu klienta nie przenosisz
> z tego pliku niczego poza układem kolumn.
>
> Treść budujesz w rozmowie ze skillem, z wywiadu z sekcji 2
> `references/komponenty.md`, na podstawie zatwierdzonego dokumentu
> **Inwentaryzacja przetwarzań**. Czego firma nie podała, zostaje jako
> `[UZUPEŁNIJ: ...]`, wchodzi do braków i do dokumentu **Rejestr luk**, a nie
> znika i nie jest uzupełniane domysłem.

---

## Metryczka (obowiązkowa na początku dokumentu)

```
Wersja: 1.0    Data: [UZUPEŁNIJ: data słownie, np. 24 sierpnia 2026]
Właściciel dokumentu: [UZUPEŁNIJ LOKALNIE: imię i nazwisko, rola]
Zakres: [UZUPEŁNIJ LOKALNIE: nazwa firmy, oddziały lub spółki objęte dokumentem]
Następny przegląd: [UZUPEŁNIJ: data; rekomendacja: co 12 miesięcy oraz po każdej
zmianie zakresu przetwarzania, nowym systemie lub usłudze, zmianie biura
rachunkowego lub innego odbiorcy danych, zmianie osoby odpowiedzialnej
i po każdym zdarzeniu dotyczącym bezpieczeństwa danych]
Historia zmian: 1.0 utworzenie
Stan prawny na dzień: [data z references/stan-prawny.md]; treść materiałów
Urzędu Ochrony Danych Osobowych jest aktualizowana pod tymi samymi adresami,
więc przed zatwierdzeniem sprawdź adresy z sekcji „Źródła i data sprawdzenia”.

PROJEKT do zatwierdzenia przez właściciela firmy lub osobę zarządzającą.
Dokument opisuje stan zadeklarowany w rozmowie i wymaga potwierdzenia
z rzeczywistą praktyką firmy. Pola oznaczone [UZUPEŁNIJ] uzupełnia firma;
pola oznaczone [UZUPEŁNIJ LOKALNIE] firma wpisuje u siebie, poza czatem, bo są to
dane identyfikujące osoby lub firmę; pola dotyczące podstaw prawnych uzupełnia
się z prawnikiem lub inspektorem ochrony danych. Dokument przygotowany narzędziem
wspierającym; za treść, za jej zgodność z przepisami i za faktyczne działanie
odpowiada firma. Dokument nie jest oceną zgodności ani opinią prawną.
```

## Nagłówek rejestru (dane administratora, nie kolumna tabeli)

```
Administrator: [UZUPEŁNIJ LOKALNIE: nazwa, adres, dane kontaktowe]
Współadministratorzy (jeśli występują): [UZUPEŁNIJ LOKALNIE: nazwa i dane
  kontaktowe; w rejestrze każdego ze współadministratorów opisuje się procesy
  objęte współadministrowaniem]
Przedstawiciel administratora (jeśli dotyczy): [UZUPEŁNIJ LOKALNIE]
Inspektor ochrony danych: [UZUPEŁNIJ LOKALNIE: imię i nazwisko oraz dane
  kontaktowe, jeśli wyznaczono] / [UZUPEŁNIJ: nie wyznaczono; pytanie o obowiązek
  wyznaczenia jest pozycją Rejestru luk do rozstrzygnięcia ze specjalistą]

Pola [UZUPEŁNIJ LOKALNIE] wypełnia firma u siebie, poza rozmową z narzędziem.
W jednoosobowej działalności dane firmowe bywają danymi osobowymi, a adres
siedziby adresem zamieszkania.
```

## Kontekst (z wywiadu, przed tabelą)

Trzy do pięciu zdań o tym, czym firma się zajmuje, ile osób pracuje, kto
obsługuje jakie obszary, skąd pochodzi mapa danych i czy firma przetwarza dane
także dla kogoś innego. Bez tego akapitu tabela niżej jest zbiorem pustych
wierszy.

## Deklaracja firmy o zwolnieniu przy zatrudnieniu poniżej 250 osób

Ramka deklaracji mieszka w TYM dokumencie i tylko w nim. Inwentaryzacja
przetwarzań zawiera jednozdaniowe odesłanie do niego, żeby dwie kopie deklaracji
z osobnymi datami i podpisami nie rozjechały się przy pierwszej aktualizacji.

```
Liczba osób zatrudnionych na dzień [UZUPEŁNIJ]: [UZUPEŁNIJ]

Streszczenie wskazówek Urzędu Ochrony Danych Osobowych (pełny tekst wskazówek:
https://uodo.gov.pl/pl/file/708, strona zbiorcza https://uodo.gov.pl/pl/383/214):
obowiązek prowadzenia rejestru czynności i rejestru kategorii czynności nie
obejmuje przedsiębiorcy ani podmiotu zatrudniającego mniej niż 250 osób, chyba
że wykonywane czynności przetwarzania:
1) mogą powodować ryzyko naruszenia praw lub wolności osób, których dane
   dotyczą,
2) nie mają charakteru sporadycznego lub obejmują szczególne kategorie danych
   osobowych,
3) dotyczą wyroków skazujących i czynów zabronionych.
Wniosek ze wskazówek: wystarczy jedna z tych okoliczności, żeby zwolnienie
przestało działać. Rozstrzygnięcie, czy któraś zachodzi, należy do firmy i jej
specjalisty; narzędzie go nie wydaje.

Rozstrzygnięcie firmy co do każdej z trzech okoliczności: [UZUPEŁNIJ]
Kto rozstrzygnął i kiedy: [UZUPEŁNIJ LOKALNIE: imię i nazwisko, rola, data]
Czy rozstrzygnięcie konsultowano ze specjalistą: [UZUPEŁNIJ]

Narzędzie nie rozstrzyga, czy firma jest zwolniona. Powyższe jest deklaracją
firmy. Niezależnie od rozstrzygnięcia firma może prowadzić rejestr dobrowolnie,
jako uporządkowanie własnej wiedzy o przetwarzaniu.
```

## Do czego służy każda kolumna

| Kolumna | Co w niej wpisujesz | Status |
|---|---|---|
| Nazwa czynności | jedna czynność przetwarzania, czyli zespół powiązanych operacji, które można określić zbiorczo w związku z celem; nie pojedyncza operacja i nie cały dział | pomocnicza |
| Cel przetwarzania | po co firma to robi, językiem firmy, jedno zdanie | obowiązkowy |
| Kategorie osób | kogo dotyczą dane: klienci, pracownicy, kandydaci, subskrybenci, osoby wchodzące do obiektu; wyłącznie kategorie podane przez firmę | obowiązkowy |
| Kategorie danych | jakie dane, kategoriami, nie wartościami; szczególne kategorie danych oznacza się osobno | obowiązkowy |
| Kategorie odbiorców | komu dane są ujawniane, w tym odbiorcy w państwach trzecich i organizacjach międzynarodowych; osoby działające z upoważnienia wewnątrz firmy NIE są odbiorcami, podmioty przetwarzające są | obowiązkowy |
| Przekazanie do państwa trzeciego lub organizacji międzynarodowej | nazwa państwa lub organizacji, a w określonych przypadkach dokumentacja odpowiednich zabezpieczeń; „nie wiem” zapisuje się jako „nie wiem”, nie jako „nie występuje”; potocznego skrótu „poza Europejski Obszar Gospodarczy” używa się tylko w rozmowie i w pytaniach wywiadu, nigdy w nagłówku | obowiązkowy, gdy ma zastosowanie |
| Planowany termin usunięcia | okres podany przez firmę wraz z tym, skąd wynika; wpisywany, jeżeli jest to możliwe; gdy firma nie wie, zostaje `[UZUPEŁNIJ: okres i jego źródło; wartości wynikające z przepisów potwierdź ze specjalistą]` | obowiązkowy, jeżeli to możliwe |
| Ogólny opis środków bezpieczeństwa | najważniejsze założenia rozwiązań, z odesłaniem do dokumentacji szczegółowej; opis ma być ogólny, bez konfiguracji, nazw kont i wersji oprogramowania | obowiązkowy, jeżeli to możliwe |
| Właściciel procesu | osoba odpowiedzialna w firmie za tę czynność; spina rejestr z upoważnieniami | element dodatkowy, dopuszczony |
| Podstawa prawna | **zostaje pusta**, patrz adnotacja pod tabelą | element dodatkowy, dopuszczony |

## Rejestr (wzór do wypełnienia)

Wiersz 1 jest **wierszem opisowym**: w każdej komórce stoi opis TYPU zawartości
i poziomu szczegółowości, a nie treść dla jakiejkolwiek firmy. Wiersz 2 pokazuje
ten sam układ w postaci pustej. Z żadnego z nich nie przenosisz do dokumentu
klienta ani jednego słowa poza nagłówkami kolumn.

| # | Nazwa czynności | Cel przetwarzania | Kategorie osób | Kategorie danych | Kategorie odbiorców | Przekazanie do państwa trzeciego lub organizacji międzynarodowej | Planowany termin usunięcia | Ogólny opis środków bezpieczeństwa | Właściciel procesu | Podstawa prawna |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 (WIERSZ OPISOWY, nie treść) | [UZUPEŁNIJ: nazwa jednej czynności podana przez firmę, kilka słów wokół jednego celu; nie pojedyncza operacja i nie cały dział] | [UZUPEŁNIJ: jedno zdanie, po co firma to robi, językiem firmy] | [UZUPEŁNIJ: kategorie osób wymienione przez firmę, po jednej frazie; nie dopisujesz grup, o których firma nie mówiła] | [UZUPEŁNIJ: kategorie danych, nie wartości; szczególne kategorie oznacz osobno] | [UZUPEŁNIJ: kategorie podmiotów zewnętrznych, po jednej frazie; charakteru relacji nie klasyfikujesz, pytanie o nią idzie do Rejestru luk] | [UZUPEŁNIJ: nie występuje / państwo lub organizacja + dokumentacja zabezpieczeń / nie ustalono] | [UZUPEŁNIJ: okres i jego źródło; wartości wynikające z przepisów potwierdź ze specjalistą] | [UZUPEŁNIJ: najważniejsze założenia rozwiązań podane przez firmę; bez konfiguracji, nazw kont i wersji oprogramowania] | [UZUPEŁNIJ: rola osoby odpowiedzialnej za tę czynność] | [UZUPEŁNIJ: do ustalenia ze specjalistą] |
| 2 | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ: nie występuje / państwo lub organizacja + dokumentacja zabezpieczeń / nie ustalono] | [UZUPEŁNIJ: okres i jego źródło; wartości wynikające z przepisów potwierdź ze specjalistą] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ: do ustalenia ze specjalistą] |

**Poziom szczegółowości, prozą pod tabelą, żeby nie stał w komórkach gotowych do
skopiowania.** Nazwa czynności ma być na tyle konkretna, żeby dało się wskazać
osobę, która ją wykonuje, i na tyle zbiorcza, żeby nie rozpaść się na pojedyncze
kliknięcia. Cel to jedno zdanie bez ozdobników. Kategorie osób i danych to
krótkie frazy, po jednej na grupę. Opis środków bezpieczeństwa to trzy do pięciu
najważniejszych założeń plus odesłanie do dokumentacji szczegółowej, jeśli firma
ją ma. Każdą z tych wartości bierzesz od firmy; czego firma nie powiedziała,
zostaje jako `[UZUPEŁNIJ]` z pytaniem.

**Adnotacja pod tabelą, obowiązkowa, w tym brzmieniu albo bardzo blisko niego:**

> Kolumna „Podstawa prawna” jest elementem dodatkowym rejestru, dopuszczonym,
> ale nieobowiązkowym; jej brak nie czyni rejestru wadliwym. Pozostaje pusta
> celowo. Przypisanie podstawy prawnej do konkretnej czynności jest decyzją
> prawną firmy: błędnie przypisana podstawa czyni wadliwą całą pozycję rejestru
> oraz wszystko, co się na niej opiera, w tym informacje przekazywane osobom
> i sposób realizacji ich żądań. Kolumnę uzupełnia prawnik lub inspektor ochrony
> danych, na podstawie tego, jak firma naprawdę pracuje. Narzędzie, którym
> przygotowano ten projekt, nie dobiera podstaw prawnych i nie potwierdza
> poprawności podstaw wpisanych przez firmę.

**Uwaga do kolumny terminów.** Okres przechowywania wpisuje się taki, jaki podała
firma, wraz z tym, skąd wynika. Jeśli firma nie wie, pole zostaje jako
`[UZUPEŁNIJ: okres i jego źródło; wartości wynikające z przepisów potwierdź ze
specjalistą]` i trafia do Rejestru luk; znacznika `[WYMAGA WERYFIKACJI]` do
okresów nie używa się, bo to fakt o firmie, a nie zmienna wartość prawna. Do tego
dokumentu nie wpisuje się okresów z wiedzy ogólnej ani zdań o tym, że jakiegoś
dokumentu „nie wolno usunąć”.

**Uwaga do kolumny odbiorców.** Pracownik firmy działający z upoważnienia nie
jest odbiorcą i nie wpisuje się go tutaj; jego dostęp opisują dokumenty
**Upoważnienie do przetwarzania danych** i **Ewidencja upoważnień**. Odbiorcami są
podmioty zewnętrzne. Tego, czy konkretny odbiorca jest podmiotem przetwarzającym,
czy odrębnym administratorem, w tym dokumencie się nie przesądza: to pozycja
**Rejestru luk** do ustalenia ze specjalistą.

## Jeżeli firma przetwarza dane także dla kogoś innego

Powstaje **osobny** dokument: **Rejestr kategorii czynności**, prowadzony przez
podmiot przetwarzający. Nie dokłada się kolumn do tej tabeli i nie łączy się obu
rejestrów w jeden plik. Rejestr kategorii czynności NIE zawiera celów
przetwarzania, opisu kategorii osób i kategorii danych ani kategorii odbiorców,
bo określenie tych okoliczności należy do administratora, w imieniu którego
podmiot przetwarzający działa. Układ tego drugiego dokumentu jest w sekcji 2,
wariant B, w `references/komponenty.md`.

## Braki do domknięcia

Wypisujesz tu wszystkie `[UZUPEŁNIJ]`, `[UZUPEŁNIJ LOKALNIE]`
i `[WYMAGA WERYFIKACJI]` z dokumentu,
z przypisaniem właściciela i terminu. Ta sama lista trafia do **Rejestru luk**,
żeby firma miała jedno miejsce zamiast kilku list na końcach dokumentów.

| Brak | Kto domyka | Do kiedy | Uwagi |
|---|---|---|---|
| [UZUPEŁNIJ: opis braku] | [UZUPEŁNIJ: rola; imię i nazwisko UZUPEŁNIJ LOKALNIE] | [UZUPEŁNIJ: data] | [UZUPEŁNIJ: czy wymaga decyzji specjalisty] |

## Źródła i data sprawdzenia

Sekcja obowiązkowa na końcu dokumentu. Wpisujesz konkretne adresy z rejestru
źródeł w `references/stan-prawny.md`, dobrane do tematów tego dokumentu, oraz
datę stanu prawnego. Sama domena nie wystarcza. Dla Rejestru czynności
przetwarzania są to zwykle:

- Rejestrowanie czynności przetwarzania, strona zbiorcza UODO:
  https://uodo.gov.pl/pl/383/214
- Wskazówki i wyjaśnienia dotyczące obowiązku rejestrowania czynności i kategorii
  czynności przetwarzania: https://uodo.gov.pl/pl/file/708
- Szablon rejestru czynności przetwarzania, przykłady dla szkoły:
  https://uodo.gov.pl/pl/file/1491
- Czy rejestr czynności musi być udostępniany publicznie:
  https://uodo.gov.pl/pl/676/4244

Stan prawny na dzień: [data z `references/stan-prawny.md`].

Zdanie do dopisania pod adresami: szablony udostępniane przez Urząd Ochrony
Danych Osobowych nie są jedynymi prawidłowymi wzorami; istotne jest, żeby
wymagane elementy dało się przedstawić dla wszystkich procesów w sposób czytelny
i przejrzysty.
