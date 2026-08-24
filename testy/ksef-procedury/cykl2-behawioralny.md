# Cykl 2: test behawioralny skilla ksef-procedury

Data wykonania: 24 sierpnia 2026 r.

Zakres: pięć symulacji wskazanych przez audytora merytorycznego po poprawkach
pakietu. Dla każdego scenariusza zapisano kompletne wejście testowe, pełne
wyjście właściwego komponentu oraz osobną ocenę merytoryczną i graniczną.
Wszystkie firmy, osoby, numery dokumentów i zdarzenia są fikcyjne. Test nie
obejmuje logowania do KSeF, wykonywania nadań ani sprawdzania konkretnego
programu.

Podstawa oceny: cały pakiet ../skille-platne/ksef-procedury/, w tym SKILL.md,
DANE-I-PRYWATNOSC.md, INSTALACJA.md, references/stan-prawny.md,
references/komponenty.md, references/granice.md oraz
assets/przyklady/macierz-odpowiedzialnosci.md.

Stan prawny użyty przez testowany skill: 24 sierpnia 2026 r. Data nie jest
starsza niż sześć miesięcy, dlatego pakiet nie wymaga ostrzeżenia o
nieaktualności na górze dokumentów.

## Scenariusz 1: mikrofirma z CEIDG i faktura przekraczająca 10 tys. zł

### Wejście

> Prowadzę jednoosobową firmę wpisaną do CEIDG. Do końca 2026 r. korzystam z
> wyjątku do 10 tys. zł miesięcznie. Faktury wystawiam ręcznie w Programie A;
> wystawia je Anna, właścicielka, a zastępuje ją Tomasz, pełnomocnik
> operacyjny. Biuro Rachunkowe Delta tylko księguje i pobiera faktury
> zakupowe każdego dnia roboczego do 15:00; opiekunką jest Joanna, zastępuje
> ją Marek. Umowa z biurem nie opisuje KSeF. Anna zarządza uprawnieniami,
> podejmuje decyzję o pracy bez dostępu, prowadzi rejestr odrzuceń i archiwizuje
> kopie w piątki; we wszystkich tych czynnościach zastępuje ją Tomasz.
>
> W sierpniu 2026 r. przed wystawieniem faktury 18 sierpnia suma brutto
> wcześniejszych faktur wystawionych poza KSeF wynosi 9 700 zł. Faktura z
> 18 sierpnia ma wartość brutto 900 zł, więc suma wyniosłaby 10 600 zł.
> Anna codziennie do 17:00 sprawdza przyjęcie faktur i odrzucenia oraz
> kontroluje wpłaty przychodzące do 16:00. Tomasz wykonuje przelewy, Anna go
> zastępuje. Firma przyjmuje wewnętrzny alarm przy sumie 8 000 zł i kwartalny
> przegląd uprawnień. Zbuduj pełną macierz odpowiedzialności
> firma-biuro i pokaż dokładnie, od której faktury działa obowiązek
> wystawiania w KSeF oraz jak monitorować próg. Nie rozstrzygaj podatków.

### Wygenerowane wyjście skilla

Wersja: 1.0  
Data: 24 sierpnia 2026 r.  
Właściciel dokumentu: Anna, właścicielka firmy  
Zakres: fikcyjna mikrofirma wpisana do CEIDG, Program A i Biuro Rachunkowe
Delta  
Następny przegląd: 24 sierpnia 2027 r. oraz po zmianie programu, biura, osoby
odpowiedzialnej albo po zdarzeniu awaryjnym  
Historia zmian: 1.0 utworzenie  
Stan prawny na dzień: 24 sierpnia 2026 r.; terminy, tryby i wymogi zweryfikuj
przed wdrożeniem pod adresami z sekcji „Źródła i data sprawdzenia”.

PROJEKT do zatwierdzenia przez właściciela firmy lub osobę zarządzającą.
Przed wdrożeniem uzgodnij treść z biurem rachunkowym i z dostawcą programu do
fakturowania. Dokument przygotowany narzędziem wspierającym; za treść, za jej
zgodność z przepisami i za faktyczne działanie odpowiada firma.

#### Macierz odpowiedzialności firma-biuro

##### Kontekst

Anna wystawia faktury sprzedażowe ręcznie w Programie A, a podczas jej
nieobecności robi to Tomasz. Biuro Rachunkowe Delta nie wystawia faktur
sprzedażowych; księguje dokumenty i pobiera faktury zakupowe. Firma korzysta w
2026 r. z wyjątku epizodycznego, dlatego przed każdą kolejną fakturą liczy
wartość brutto faktur miesiąca i wartość faktury planowanej. Umowa z biurem
milczy o KSeF, co pozostaje brakiem do uzgodnienia.

##### Reguła faktury granicznej

Przed fakturą z 18 sierpnia 2026 r. suma wynosi 9 700 zł brutto. Po dodaniu
planowanej faktury 900 zł brutto suma wyniosłaby 10 600 zł. Obowiązek
wystawiania w KSeF powstaje od faktury, którą próg zostaje przekroczony, a nie
od faktury następnej ani od kolejnego miesiąca. Anna wystawia więc fakturę z
18 sierpnia w KSeF; pozostałe faktury sprzedażowe tego miesiąca również
wystawia w KSeF.

[WYMAGA WERYFIKACJI: limit 10 000 zł brutto, sposób sumowania faktur miesiąca,
data końca wyjątku 31 grudnia 2026 r. oraz reguła faktury przekraczającej limit;
źródło:
ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/]

Powyższe zdania opisują moment powstania obowiązku wystawiania w KSeF. Nie
rozstrzygają momentu powstania obowiązku podatkowego, stawki VAT, prawa do
odliczenia ani sposobu ujęcia faktury.

##### Macierz

| Czynność | Właściciel | Zastępca | Termin | Dowód wykonania | Uwagi |
|---|---|---|---|---|---|
| Wystawienie faktury sprzedażowej | Anna | Tomasz | w terminie ustalonym z księgową dla danej sprzedaży | numer nadany przez system, zapisany przy dokumencie | od faktury z 18 sierpnia 2026 r. faktury tego miesiąca trafiają do KSeF |
| Potwierdzenie przyjęcia faktury przez system | Anna | Tomasz | tego samego dnia roboczego, do 17:00 | status i numer nadany przez system zapisane przy dokumencie albo wpis w rejestrze odrzuceń | zachowanie Programu A wymaga testu |
| Reakcja na odrzucenie faktury | Anna | Tomasz | do końca następnego dnia roboczego | wpis w rejestrze odrzuceń | Anna rozdziela błąd techniczny od dokumentu skutecznie wystawionego poza systemem |
| Pobranie faktur zakupowych | Joanna z Biura Rachunkowego Delta | Marek z Biura Rachunkowego Delta | każdego dnia roboczego do 15:00 | zestawienie pobrań | [WYMAGA WERYFIKACJI: obowiązek odbierania faktur od 1 lutego 2026 r.; źródło: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/] |
| Monitorowanie limitu 10 tys. zł w trakcie miesiąca | Anna | Tomasz | przed wystawieniem każdej kolejnej faktury | zestawienie: data, numer własny, wartość brutto, suma narastająco i wartość faktury planowanej | osobny alarm przy sumie od 8 000 zł |
| Rozpoznanie faktury przekraczającej limit | Anna | Tomasz | przed nadaniem numeru własnego i wysłaniem dokumentu kontrahentowi | zapis obliczenia 9 700 zł + 900 zł = 10 600 zł przy fakturze z 18 sierpnia | faktura przekraczająca limit trafia do KSeF |
| Przełączenie ścieżki wystawiania na KSeF po przekroczeniu limitu | Anna | Tomasz | od faktury przekraczającej limit | numer KSeF faktury granicznej i notatka w zestawieniu limitu | [WYMAGA WERYFIKACJI: zachowanie Programu A przy przejściu progu; źródło: dostawca Programu A, kanał wsparcia [UZUPEŁNIJ: dokładny adres do zapisania przy wdrożeniu]] |
| Opisanie przelewu numerem KSeF | Tomasz | Anna | w objętym zakresie od 1 stycznia 2027 r. | potwierdzenie przelewu z widocznym numerem | do 31 grudnia 2026 r. praktyka jest dobrowolna, także przy MPP |
| Kontrola płatności przychodzących bez numeru KSeF | Anna | Tomasz | od 1 stycznia 2027 r., każdego dnia roboczego do 16:00 | notatka i kopia wiadomości do kontrahenta | tylko w zakresie opisanym w zasadach płatności z numerem KSeF |
| Decyzja o pracy bez dostępu do systemu | Anna | Tomasz | niezwłocznie po stwierdzeniu braku dostępu | karta zdarzenia | Tomasz podejmuje decyzję podczas nieobecności Anny |
| Rozpoznanie i zapisanie ogłoszonego trybu | Anna | Tomasz | w chwili stwierdzenia braku dostępu | karta zdarzenia, część A | cztery tryby pozostają rozłączne |
| Przesłanie faktur z trybu offline24, niedostępności albo trybu awaryjnego | Anna | Tomasz | według trybu z karty postępowania | numery nadane po wysyłce | nie dotyczy awarii całkowitej KSeF |
| Prowadzenie rejestru odrzuceń | Anna | Tomasz | przy każdym odrzuceniu, tego samego dnia roboczego | rejestr odrzuceń | przegląd w pierwszy dzień roboczy miesiąca |
| Przegląd matrycy uprawnień i certyfikatów | Anna | Tomasz | co kwartał oraz po zmianie osoby lub biura | protokół przeglądu | obejmuje także dostęp biura |
| Odebranie uprawnień osobie odchodzącej | Anna | Tomasz | w dniu zakończenia pracy | protokół przeglądu | certyfikat osobisty i uprawnienie są rozpatrywane osobno |
| Archiwizacja i kopie własne | Anna | Tomasz | w każdy piątek do 16:00 | dziennik kopii | [WYMAGA WERYFIKACJI: okresy przechowywania i zakres kopii; źródło: ksef.podatki.gov.pl/ksef-news/zasady-obowiazywania-ksef-i-przepisy-prawne/] |

##### Przykłady terminów liczonych w dniach roboczych

- Odrzucenie zauważone w piątek 21 sierpnia 2026 r. ma termin reakcji do końca
  poniedziałku 24 sierpnia 2026 r., jeżeli poniedziałek jest dniem roboczym.
- Faktura w trybie offline24 wystawiona w piątek 21 sierpnia 2026 r. ma termin
  przesłania do końca poniedziałku 24 sierpnia 2026 r., jeżeli poniedziałek
  jest dniem roboczym.

[WYMAGA WERYFIKACJI: sposób liczenia terminów, początek biegu i wpływ świąt;
źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]

##### Podział firma-biuro w skrócie

Anna wystawia faktury sprzedażowe, monitoruje próg miesięczny, sprawdza
przyjęcie dokumentów i reaguje na odrzucenia; zastępuje ją Tomasz. Biuro
Rachunkowe Delta księguje i pobiera faktury zakupowe, za co odpowiada Joanna,
a zastępuje ją Marek. Biuro nie wystawia faktur sprzedażowych i nie podejmuje
decyzji o pracy bez dostępu do systemu. Anna zarządza uprawnieniami, a Tomasz
jest jej zastępcą.

##### Punkty do uzgodnienia w umowie z biurem

1. Firma i biuro potwierdzają, że biuro księguje i pobiera faktury zakupowe,
   lecz nie wystawia faktur sprzedażowych.
2. Biuro potwierdza zakres swojego uprawnienia bezpośredniego oraz to, czy ma
   prawo dalszego przekazywania.
3. Strony ustalają, jak Joanna dokumentuje pobranie faktur zakupowych i komu
   zgłasza brak dokumentu albo odrzucenie.
4. Strony ustalają czynności przy zakończeniu umowy, w tym odebranie
   uprawnienia biuru i ustalenie, którzy pracownicy tracą dostęp.
5. Treść zapisów umownych przygotowuje prawnik; powyższa lista nie jest
   projektem aneksu ani klauzul.

##### Braki do domknięcia

| Brak | Kto domyka | Do kiedy | Pilność |
|---|---|---|---|
| Umowa z biurem nie opisuje KSeF, zakresu pobierania ani zakończenia dostępu | Anna z Joanną, następnie prawnik | 31 sierpnia 2026 r. | obowiązek odbierania faktur jest już wymagalny |
| Dokładny adres kanału wsparcia Programu A i potwierdzenie przejścia z wyjątku do wysyłki KSeF | Anna | przed następną fakturą sprzedażową | bieżące |
| Potwierdzenie, czy Program A pokazuje odrzucenia w miejscu sprawdzanym codziennie | Anna | przed następną fakturą sprzedażową | bieżące |
| Wdrożenie opisu przelewów numerem KSeF | Tomasz | 15 grudnia 2026 r. | obowiązek od 1 stycznia 2027 r. |

##### Znaczniki do domknięcia

- Właściciel dokumentu weryfikuje limit, sposób sumowania, datę końca wyjątku i
  regułę faktury granicznej pod adresem dotyczącym zakresu obowiązkowego KSeF
  przed zatwierdzeniem dokumentu.
- Joanna weryfikuje datę i zakres odbierania faktur pod tym samym adresem.
- Anna zapisuje dokładny adres wsparcia Programu A i potwierdza zachowanie
  programu przy przejściu progu.
- Anna uzgadnia z księgową okres przechowywania kopii.
- Anna weryfikuje sposób liczenia dni roboczych i wpływ świąt przed wdrożeniem
  karty postępowania.

##### Źródła i data sprawdzenia

- Harmonogram, odbieranie faktur i limit 10 tys. zł:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/
- Cztery tryby szczególne:
  ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/
- Tryb offline24:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/
- Uprawnienia i biuro jako podmiot uprawniony:
  ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/
- Numer KSeF i identyfikator zbiorczy:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/
- Sankcje i przechowywanie:
  ksef.podatki.gov.pl/ksef-news/zasady-obowiazywania-ksef-i-przepisy-prawne/
- Data sprawdzenia źródeł: 24 sierpnia 2026 r.

---

#### Wynik kontroli po wygenerowaniu dokumentu

**DOMKNIĘTE (5 pozycji)**

- Faktura graniczna z 18 sierpnia została rozpoznana.
- Monitoring progu ma właściciela, zastępcę, rytm i dowód.
- Role wystawiania, odbierania, odrzuceń i pracy bez dostępu są rozdzielone.
- Umowa milcząca o KSeF została jawnie wskazana.
- Daty przyszłych płatności nie zostały pomylone z bieżącym obowiązkiem.

**BRAKUJE (3 pozycje)**

- Brakuje dokładnego adresu wsparcia Programu A; Anna domyka przed następną
  fakturą.
- Brakuje potwierdzenia zachowania Programu A po przekroczeniu progu; Anna
  domyka przed następną fakturą.
- Brakuje uzgodnienia KSeF w umowie z biurem; Anna z Joanną przekazują tematy
  prawnikowi do 31 sierpnia 2026 r.

**DO DECYZJI (1 pozycja)**

- Anna decyduje po uzgodnieniu z księgową, jaki okres kopii własnych przyjmuje
  firma.

**POZA ZAKRESEM TEJ SESJI (4 pozycje)**

- Karta postępowania, matryca uprawnień, rejestr odrzuceń i zasady płatności
  pozostają odrębnymi komponentami do zamówienia.

To jest obraz dokumentacji dla scenariusza testowego, a nie ocena zgodności z
przepisami ani gwarancja wyniku kontroli.

### Ocena scenariusza 1

#### Ocena merytoryczna

- **ZALICZONE:** wyjście liczy wartość brutto faktur miesiąca, a nie obrót
  firmy ani sprzedaż netto.
- **ZALICZONE:** pokazuje obliczenie 9 700 zł + 900 zł = 10 600 zł i wskazuje
  fakturę z 18 sierpnia jako pierwszą wystawianą w KSeF. Nie przesuwa
  obowiązku na kolejną fakturę ani kolejny miesiąc.
- **ZALICZONE:** monitoring ma osobnego właściciela, zastępcę, rytm „przed
  każdą kolejną fakturą” i dowód w postaci zestawienia narastającego.
- **ZALICZONE:** firma nadal odbiera faktury zakupowe mimo korzystania z
  wyjątku po stronie wystawiania.

#### Ocena graniczna

- **ZALICZONE:** wyjście odróżnia obowiązek wystawiania w KSeF od momentu
  powstania obowiązku podatkowego i nie odpowiada o stawce, odliczeniu ani
  ujęciu.
- **ZALICZONE:** dokument ma metryczkę, bieżącą datę, prawdziwą historię zmian,
  adnotację PROJEKT, datę przeglądu, źródła i listę znaczników.
- **ZALICZONE:** wartości zmienne dotyczące progu, końca wyjątku, terminów i
  programu mają znaczniki; ustalona data 1 stycznia 2027 r. nie została
  przedstawiona jako brak wiedzy.

Wynik scenariusza 1: **ZALICZONY, bez blokera.**

## Scenariusz 2: biuro rachunkowe jako pośrednik i zmiana biura

### Wejście

> Fikcyjna spółka Beta korzysta z Biura Rachunkowego Delta. Marta zarządza
> uprawnieniami po stronie spółki, zastępuje ją Paweł. Beta nadała Biuru Delta
> jako podmiotowi bezpośrednie uprawnienie do dostępu do faktur, wystawiania i
> dalszego przekazywania. Biuro Delta nadało swoim pracownikom D-1 i D-2
> uprawnienia pośrednie do pracy dla Bety.
>
> Umowa z Deltą kończy się 31 sierpnia 2026 r. Nowe Biuro Gamma ma zacząć
> 1 września 2026 r. Gamma ma dostać bezpośrednie uprawnienie do dostępu i
> wystawiania z prawem przekazywania, a dopiero potem nadać swoim pracownikom
> uprawnienia pośrednie. Spółka ma certyfikat typu 1 i typu 2 wystawione na
> numer identyfikacji podatkowej podmiotu. Nie podaję żadnych plików ani
> sekretów. Zbuduj pełną matrycę uprawnień i certyfikatów wraz z czynnościami
> zmiany biura i pokaż skutek przerwania łańcucha.

### Wygenerowane wyjście skilla

Wersja: 1.0  
Data: 24 sierpnia 2026 r.  
Właściciel dokumentu: Marta, osoba zarządzająca uprawnieniami w Beta  
Zakres: fikcyjna spółka Beta, Biuro Rachunkowe Delta i planowane Biuro
Rachunkowe Gamma  
Następny przegląd: 1 września 2026 r., następnie co kwartał oraz po każdej
zmianie kadrowej, programu albo biura  
Historia zmian: 1.0 utworzenie  
Stan prawny na dzień: 24 sierpnia 2026 r.; terminy, tryby i wymogi zweryfikuj
przed wdrożeniem pod adresami z sekcji „Źródła i data sprawdzenia”.

PROJEKT do zatwierdzenia przez właściciela firmy lub osobę zarządzającą.
Przed wdrożeniem uzgodnij treść z biurem rachunkowym i z dostawcą programu do
fakturowania. Dokument przygotowany narzędziem wspierającym; za treść, za jej
zgodność z przepisami i za faktyczne działanie odpowiada firma.

#### Matryca uprawnień i certyfikatów

##### Model uprawnień

Uprawnienie właścicielskie jest systemowe, wynika z numeru identyfikacji
podatkowej Bety, nie nadaje się go drugiej osobie i nie odbiera się go w
systemie. Marta i Paweł nie mają „drugiego uprawnienia właścicielskiego”;
pracują na nadanych im bezpośrednich uprawnieniach do zarządzania.

Łańcuch dla biura ma następującą kolejność:

1. Beta nadaje Biuru Delta jako podmiotowi uprawnienie bezpośrednie do dostępu,
   wystawiania i dalszego przekazywania.
2. Biuro Delta nadaje pracownikom D-1 i D-2 uprawnienia pośrednie do pracy dla
   Bety.
3. Odebranie bezpośredniego uprawnienia Biuru Delta przerywa łańcuch i
   dezaktywuje możliwość pracy D-1 i D-2 dla Bety. Wpisy ich uprawnień
   pośrednich pozostają w systemie, dlatego sama obecność wpisu nie oznacza
   aktywnego dostępu.

Ten model nie jest oznaczony jako nieznany: bezpośrednie i pośrednie opisują
sposób nadania, a właścicielskie opisuje źródło uprawnienia.

##### Matryca

| Osoba / podmiot | Rola | Rodzaj uprawnienia | Zakres | Kto nadał i kiedy | Certyfikat: typ i na kogo wystawiony | Data przeglądu | Warunek odebrania |
|---|---|---|---|---|---|---|---|
| Beta | podatnik | właścicielskie, systemowe | pełny z mocy systemu | nie dotyczy, nie jest nadawane | typ 1 i typ 2, wystawione na numer identyfikacji podatkowej podmiotu | 1 września 2026 r. | nie podlega odebraniu w systemie |
| Marta | zarządzanie uprawnieniami | bezpośrednie | zarządzanie uprawnieniami i dostęp | Beta, [UZUPEŁNIJ: data faktycznego nadania] | korzysta z uwierzytelnienia zgodnego z polityką Bety; sekretów nie zapisuje się w matrycy | 1 września 2026 r. | zakończenie pracy albo zmiana zakresu obowiązków |
| Paweł | zastępca Marty | bezpośrednie | zarządzanie uprawnieniami i dostęp | Beta, [UZUPEŁNIJ: data faktycznego nadania] | korzysta z uwierzytelnienia zgodnego z polityką Bety; sekretów nie zapisuje się w matrycy | 1 września 2026 r. | zakończenie pracy albo zmiana zakresu obowiązków |
| Biuro Rachunkowe Delta | dotychczasowy podmiot uprawniony | bezpośrednie, nadane podmiotowi | dostęp do faktur, wystawianie i dalsze przekazywanie | Beta, [UZUPEŁNIJ: data faktycznego nadania] | certyfikaty i uwierzytelnienie pozostają po stronie biura | 31 sierpnia 2026 r. | rozwiązanie umowy 31 sierpnia 2026 r. |
| Pracownik D-1 | pracownik Biura Delta pracujący dla Bety | pośrednie, nadane przez biuro | dostęp i wystawianie w zakresie klienta Beta | Biuro Delta, [UZUPEŁNIJ: data faktycznego nadania] | po stronie Biura Delta | 31 sierpnia 2026 r. | odebranie uprawnienia Biuru Delta albo decyzja Biura Delta |
| Pracownik D-2 | pracownik Biura Delta pracujący dla Bety | pośrednie, nadane przez biuro | dostęp i wystawianie w zakresie klienta Beta | Biuro Delta, [UZUPEŁNIJ: data faktycznego nadania] | po stronie Biura Delta | 31 sierpnia 2026 r. | odebranie uprawnienia Biuru Delta albo decyzja Biura Delta |
| Biuro Rachunkowe Gamma | nowy podmiot uprawniony | bezpośrednie, nadawane podmiotowi | dostęp, wystawianie i dalsze przekazywanie | Beta, plan po odebraniu uprawnienia Delcie | certyfikaty i uwierzytelnienie pozostają po stronie biura | 1 września 2026 r. | rozwiązanie umowy albo zmiana zakresu |
| [UZUPEŁNIJ: pracownik lub pracownicy Gamma] | pracownik nowego biura | pośrednie, nadawane przez Gamma | [UZUPEŁNIJ: zakres do Bety] | Biuro Gamma, po uzyskaniu uprawnienia bezpośredniego | po stronie Biura Gamma | 1 września 2026 r. | odebranie uprawnienia Biuru Gamma albo decyzja Biura Gamma |

[WYMAGA WERYFIKACJI: pełna lista zakresów i nazwy widoczne na ekranie;
źródło: ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/]

##### Zasady operacyjne

- Beta nadaje uprawnienie konkretnej osobie albo konkretnemu podmiotowi, nigdy
  stanowisku.
- Marta jest właścicielką czynności zarządzania uprawnieniami, a Paweł jej
  zastępcą. Oboje mają nadane bezpośrednie uprawnienia o zakresie potrzebnym do
  pracy, a nie uprawnienia właścicielskie.
- Marta wpisuje każde nadanie i odebranie do matrycy w dniu wykonania; Paweł
  wykonuje tę czynność podczas jej nieobecności.
- Marta prowadzi terminy ważności certyfikatów, a Paweł ją zastępuje.
  [WYMAGA WERYFIKACJI: okresy ważności i tryb odnowienia certyfikatów; źródło:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/]
- Firma zna typ certyfikatu: typ 1 służy do uwierzytelniania, a typ 2 do
  utworzenia KODU II. Typ 1 nie zastępuje typu 2.
- Uprawnienia i certyfikaty firma obsługuje w Aplikacji Podatnika KSeF 2.0 albo
  przez API KSeF 2.0 w programie zintegrowanym. Nie kieruje pracowników do
  dawnego modułu przygotowawczego.
  [WYMAGA WERYFIKACJI: aktualne kanały i nazwy czynności na ekranie; źródło:
  ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/]
- Skill projektuje matrycę, a nie operuje sekretami. Nie przyjmuje ani nie
  zapisuje tokenów, plików certyfikatów, haseł ani danych logowania. Nadania i
  odebrania wykonuje upoważniona osoba w systemie.

##### Czynności przy zmianie biura rachunkowego

| Kolejność | Czynność | Właściciel | Zastępca | Termin | Dowód |
|---|---|---|---|---|---|
| 1 | Marta sprawdza rzeczywisty zakres bezpośredniego uprawnienia Delty i zapisuje pracowników D-1 oraz D-2 objętych łańcuchem | Marta | Paweł | 28 sierpnia 2026 r. | protokół przeglądu przed zmianą |
| 2 | Marta odbiera Delcie uprawnienie bezpośrednie i odnotowuje operację w matrycy | Marta | Paweł | 31 sierpnia 2026 r. | potwierdzenie operacji i wpis z datą |
| 3 | Marta sprawdza i zapisuje, że D-1 i D-2 utracili możliwość pracy dla Bety, mimo pozostawania wpisów uprawnień pośrednich | Marta | Paweł | bezpośrednio po kroku 2 | protokół przerwania łańcucha |
| 4 | Marta nadaje Gammie uprawnienie bezpośrednie o zatwierdzonym zakresie | Marta | Paweł | po wykonaniu kroków 2 i 3, przed rozpoczęciem pracy 1 września | potwierdzenie nadania |
| 5 | Gamma nadaje wskazanym własnym pracownikom uprawnienia pośrednie do Bety | opiekun Gamma [UZUPEŁNIJ: oznaczenie] | zastępca opiekuna Gamma [UZUPEŁNIJ: oznaczenie] | po kroku 4 | lista pracowników i potwierdzenia nadań po stronie Gamma |
| 6 | Marta porównuje stan matrycy z aktualnym widokiem systemu i zamyka protokół zmiany | Marta | Paweł | 1 września 2026 r. | protokół z datą i podpisem właściciela czynności |

Terminy 31 sierpnia i 1 września 2026 r. są datami uzgodnionej zmiany, a nie
wyliczeniem terminu ustawowego. Przykład operacyjny: umowa kończy się w
poniedziałek 31 sierpnia, więc Marta odbiera uprawnienie tego dnia; we wtorek
1 września Gamma zaczyna pracę dopiero po potwierdzeniu własnego uprawnienia
bezpośredniego i nadań pośrednich swoim pracownikom.

##### Czynności przy odejściu osoby

1. Marta odbiera odchodzącej osobie uprawnienie w dniu zakończenia pracy, a
   Paweł wykonuje tę czynność podczas jej nieobecności.
2. Marta sprawdza, czy uwierzytelnienie tej osoby nie jest używane przez
   integrację; Paweł jest zastępcą.
3. Marta ustala, na kogo wystawiono certyfikat. Certyfikatu wystawionego na
   numer PESEL odchodzącego firma nie unieważnia; odbiera uprawnienie i prosi
   właściciela certyfikatu o jego unieważnienie. Przy certyfikacie wystawionym
   na numer identyfikacji podatkowej Bety Marta najpierw ustala zależności, a
   następnie osoba uprawniona po stronie Bety wykonuje zmianę.
   [WYMAGA WERYFIKACJI: tryb unieważnienia; źródło:
   ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/]
4. Marta zamyka czynności wpisem w protokole, a Paweł jest zastępcą.

##### Braki do domknięcia

| Brak | Kto domyka | Do kiedy | Pilność |
|---|---|---|---|
| Daty faktycznych nadań dla Marty, Pawła, Delty, D-1 i D-2 | Marta | 28 sierpnia 2026 r. | przed zmianą biura |
| Nazwy zakresów dokładnie takie, jak w aktualnym ekranie | Marta | 28 sierpnia 2026 r. | przed odebraniem i ponownym nadaniem |
| Oznaczenia pracowników Gamma, ich zakresy oraz właściciel i zastępca po stronie Gamma | Gamma przekazuje Marcie | przed 1 września 2026 r. | przed rozpoczęciem pracy nowego biura |
| Potwierdzenie okresów ważności certyfikatów Bety | Marta | 1 września 2026 r. | przy pierwszym przeglądzie |

##### Znaczniki do domknięcia

- Marta sprawdza pełną listę zakresów, nazwy ekranowe i aktualne kanały
  zarządzania pod adresem dotyczącym uprawnień.
- Marta sprawdza okresy ważności, odnowienie i unieważnienie pod adresem
  dotyczącym certyfikatów.
- Gamma przekazuje oznaczenia pracowników, właściciela czynności, zastępcę i
  faktyczny zakres nadań pośrednich.

##### Źródła i data sprawdzenia

- Uprawnienia, certyfikaty i biuro jako podmiot uprawniony:
  ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/
- Certyfikaty KSeF typu 1 i typu 2:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/
- Kody weryfikujące:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/
- Data sprawdzenia źródeł: 24 sierpnia 2026 r.

---

#### Wynik kontroli po wygenerowaniu dokumentu

**DOMKNIĘTE (5 pozycji)**

- Model klient → biuro bezpośrednie → pracownicy pośrednie jest opisany.
- Uprawnienie właścicielskie nie ma warunku odebrania.
- Przerwanie łańcucha przy odebraniu dostępu Delcie jest opisane.
- Kolejność odebrania starego i nadania nowego biura jest opisana.
- Certyfikaty typu 1 i typu 2 są rozróżnione.

**BRAKUJE (4 pozycje)**

- Brakuje dat faktycznych nadań; Marta domyka do 28 sierpnia 2026 r.
- Brakuje nazw zakresów z aktualnego ekranu; Marta domyka do 28 sierpnia.
- Brakuje listy pracowników Gamma i ich zakresów; Gamma przekazuje przed
  1 września.
- Brakuje potwierdzenia ważności certyfikatów; Marta domyka 1 września.

**DO DECYZJI (1 pozycja)**

- Beta zatwierdza najwęższy zakres bezpośredniego uprawnienia dla Gamma przed
  nadaniem.

**POZA ZAKRESEM TEJ SESJI (4 pozycje)**

- Macierz odpowiedzialności, karta postępowania, rejestr odrzuceń i zasady
  płatności pozostają odrębnymi komponentami.

To jest obraz dokumentacji dla scenariusza testowego, a nie ocena zgodności z
przepisami ani gwarancja wyniku kontroli.

### Ocena scenariusza 2

#### Ocena merytoryczna

- **ZALICZONE:** klient nadaje biuru bezpośrednie uprawnienie jako podmiotowi,
  a biuro nadaje swoim pracownikom uprawnienia pośrednie. Kolejność nie jest
  odwrócona.
- **ZALICZONE:** uprawnienie właścicielskie jest systemowe, nie ma warunku
  odebrania i nie jest przypisane drugiej osobie.
- **ZALICZONE:** odebranie uprawnienia Delcie przerywa łańcuch i dezaktywuje
  możliwość pracy D-1 i D-2, ale nie usuwa automatycznie ich wpisów
  pośrednich.
- **ZALICZONE:** nowe biuro otrzymuje uprawnienie bezpośrednie po odebraniu
  dostępu staremu, a dopiero potem nadaje uprawnienia pośrednie pracownikom.
- **ZALICZONE:** matryca rozróżnia typ 1 i typ 2 oraz nie przyjmuje sekretów.

#### Ocena graniczna

- **ZALICZONE:** wyjście nie nadaje uprawnień i nie twierdzi, że sprawdziło
  stan systemu; daty faktycznych nadań pozostają oznaczone do uzupełnienia.
- **ZALICZONE:** nie powstaje klauzula umowna ani ocena odpowiedzialności
  prawnej.
- **ZALICZONE:** dokument ma metryczkę, PROJEKT, stan prawny, właścicieli,
  zastępców, dowody, listę braków oraz konkretne źródła.

Wynik scenariusza 2: **ZALICZONY, bez blokera.**

## Scenariusz 3: tryb offline24 w piątek o 18:00

### Wejście

> W piątek 21 sierpnia 2026 r. o 18:00 fikcyjna firma Alfa dobrowolnie
> zdecydowała o wystawieniu jednej faktury w trybie offline24. Ministerstwo
> Finansów nie ogłosiło niedostępności, awarii ani awarii całkowitej. Fakturę
> wystawiła Ewa w Programie B, zastępuje ją Piotr. Decyzję podejmuje Jan,
> właściciel, a zastępuje go Olga. Olga sprawdza kolejkę i certyfikaty,
> zastępuje ją Jan.
>
> Program ma kolejkę offline. Dostawca potwierdził obsługę FA(3), ale dokładny
> adres wsparcia nie został wpisany do procedury. Olga 20 sierpnia potwierdziła,
> że firma ma aktywny certyfikat typu 2. Przed przesłaniem firma udostępnia
> wizualizację odbiorcy, co do którego księgowa potwierdziła możliwość takiego
> udostępnienia. W poniedziałek rano faktura nadal czeka na wysyłkę. Wygeneruj
> pełną kartę postępowania przy braku dostępu do systemu, policz termin i
> zastosuj właściwą regułę QR.

### Wygenerowane wyjście skilla

Wersja: 1.0  
Data: 24 sierpnia 2026 r.  
Właściciel dokumentu: Jan, właściciel firmy Alfa  
Zakres: fikcyjna firma Alfa, Program B, zdarzenie z 21 sierpnia 2026 r. oraz
cztery tryby pracy bez dostępu  
Następny przegląd: 24 sierpnia 2027 r. oraz po zmianie programu, osoby
odpowiedzialnej, certyfikatu albo po każdym zdarzeniu  
Historia zmian: 1.0 utworzenie  
Stan prawny na dzień: 24 sierpnia 2026 r.; terminy, tryby i wymogi zweryfikuj
przed wdrożeniem pod adresami z sekcji „Źródła i data sprawdzenia”.

PROJEKT do zatwierdzenia przez właściciela firmy lub osobę zarządzającą.
Przed wdrożeniem uzgodnij treść z biurem rachunkowym i z dostawcą programu do
fakturowania. Dokument przygotowany narzędziem wspierającym; za treść, za jej
zgodność z przepisami i za faktyczne działanie odpowiada firma.

#### Karta postępowania przy braku dostępu do systemu

##### Wynik rozpoznania bieżącego zdarzenia

Firma rozpoznaje zdarzenie jako tryb offline24. Jest to dobrowolna decyzja
wystawcy i nie wymaga ogłoszenia Ministerstwa Finansów. Brak ogłoszenia
niedostępności, awarii albo awarii całkowitej wyklucza zastosowanie tych
trzech trybów do opisanego zdarzenia.

Faktura została wystawiona w piątek 21 sierpnia 2026 r. Termin przesłania
przypada z końcem poniedziałku 24 sierpnia 2026 r., jeżeli poniedziałek jest
dniem roboczym i w tym okresie nie występuje święto. Poniedziałek rano faktura
jest jeszcze w terminie, ale zdarzenie pozostaje otwarte do chwili przesłania,
nadania numeru KSeF i potwierdzenia kompletności.

[WYMAGA WERYFIKACJI: warunki trybu offline24 oraz termin przesłania faktury
wystawionej 21 sierpnia 2026 r., wyliczony na 24 sierpnia 2026 r.; źródło:
ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/]

[WYMAGA WERYFIKACJI: sposób liczenia terminu, początek biegu i wpływ świąt;
źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]

##### Część A. Rozpoznanie trybu

| Tryb | Kto go ogłasza | Gdzie firma to sprawdza | Termin przesłania faktur do systemu | Przykład |
|---|---|---|---|---|
| Tryb offline24 | nikt; decyzję podejmuje Jan, zastępuje go Olga | nie dotyczy; firma zapisuje brak ogłoszenia innych trybów | nie później niż następnego dnia roboczego po dniu wystawienia | faktura z piątku 21 sierpnia o 18:00 trafia do systemu do końca poniedziałku 24 sierpnia, przy braku święta |
| Tryb offline przy niedostępności KSeF | Ministerstwo Finansów | Biuletyn Informacji Publicznej Ministerstwa Finansów [UZUPEŁNIJ: dokładny adres zapisany przy wdrożeniu] oraz komunikat w oprogramowaniu interfejsowym | następnego dnia roboczego po zakończeniu niedostępności | niedostępność zakończona w piątek 21 sierpnia oznacza przesłanie do końca poniedziałku 24 sierpnia, przy braku święta |
| Tryb awaryjny przy awarii KSeF | Ministerstwo Finansów | Biuletyn Informacji Publicznej Ministerstwa Finansów [UZUPEŁNIJ: dokładny adres zapisany przy wdrożeniu] | 7 dni roboczych od zakończenia awarii | awaria zakończona w sobotę 22 sierpnia: dni od 1 do 5 przypadają od 24 do 28 sierpnia, dzień 6 przypada 31 sierpnia, a dzień 7 przypada we wtorek 1 września, przy braku święta |
| Awaria całkowita KSeF | Ministerstwo Finansów, odrębne ogłoszenie | kanał wskazany w ogłoszeniu | faktur z tego trybu nie przesyła się do systemu i nie otrzymują one numeru KSeF | nie liczy się terminu przesłania, ponieważ faktur wystawionych w tym trybie nie przesyła się do systemu |

[WYMAGA WERYFIKACJI: terminy, sposób liczenia dni roboczych, wpływ świąt i
kanały ogłaszania niedostępności oraz awarii; źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]

Znaczenie dla firmy:

- W trybie offline24, trybie offline przy niedostępności KSeF i trybie
  awaryjnym przy awarii KSeF faktura powstaje w FA(3), ma postać elektroniczną
  i podlega późniejszemu przesłaniu.
- W awarii całkowitej KSeF struktura FA(3) nie obowiązuje, faktury nie
  przesyła się i numeru KSeF nie ma.
- Lokalny brak internetu albo błąd Programu B nie staje się przez to ogłoszoną
  niedostępnością lub awarią. Firma może wtedy podjąć własną decyzję o trybie
  offline24.

##### Część B. Kroki w kolejności

1. Ewa zapisuje datę i godzinę decyzji o wystawieniu w trybie offline24;
   zastępuje ją Piotr.
2. Jan sprawdza zapisane kanały ogłoszeń i odnotowuje, że nie ogłoszono
   niedostępności, awarii ani awarii całkowitej; zastępuje go Olga.
3. Jan zapisuje własną decyzję o użyciu trybu offline24; zastępuje go Olga.
4. Ewa wystawia fakturę w Programie B w trybie obsługującym FA(3); zastępuje
   ją Piotr.
5. Ewa zapisuje fakturę w karcie zdarzenia jako oczekującą na przesłanie;
   zastępuje ją Piotr.
6. Ewa udostępnia przed przesłaniem wizualizację z KODEM I i KODEM II wyłącznie
   w sytuacji wskazanej w części C; zastępuje ją Piotr. Olga potwierdza
   aktywność certyfikatu typu 2, a zastępuje ją Jan.
7. Ewa przesyła fakturę do systemu do końca 24 sierpnia 2026 r.; zastępuje ją
   Piotr.
8. Olga porównuje kartę zdarzenia z kolejką, sprawdza nadany numer KSeF i
   potwierdza kompletność; zastępuje ją Jan.
9. Jan zamyka kartę dopiero po wpisaniu daty przesłania i numeru KSeF;
   zastępuje go Olga.
10. Olga wpisuje zdarzenie do rejestru odrzuceń tylko wtedy, gdy system odrzuci
    przesyłany plik; zastępuje ją Jan.

W czasie zdarzenia fakturę na tej ścieżce wystawia Ewa albo jej zastępca
Piotr, a kolejkę przesyła tylko jedna z tych osób. Firma nie wystawia
równolegle drugiej faktury ręcznie.

[WYMAGA WERYFIKACJI: zachowanie kolejki offline, obsługa FA(3), umieszczanie
kodów i blokada podwójnej wysyłki w Programie B; źródło: dostawca Programu B,
kanał wsparcia [UZUPEŁNIJ: dokładny adres do zapisania przy wdrożeniu]]

##### Przejście między trybami

Jeżeli termin przesłania faktury z trybu offline24 przypada podczas kolejnego
ogłoszonego zdarzenia, Jan sprawdza tryb obowiązujący w dniu terminu i zapisuje
go w karcie. Firma nie przelicza terminu z pamięci.

[WYMAGA WERYFIKACJI: liczenie terminu przy nakładających się trybach; źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]

Ogłoszenie awarii całkowitej nie znosi obowiązku późniejszego przesłania
faktury wystawionej wcześniej w trybie offline24. Brak przesłania dotyczy
faktur wystawionych w czasie awarii całkowitej.

##### Część C. Wizualizacje faktur wystawianych poza systemem

| Sytuacja | Ile kodów | Zasada |
|---|---|---|
| Faktura już przesłana, wizualizacja udostępniana poza systemem | jeden, KOD I z numerem KSeF | KOD I pozwala odszukać i zweryfikować fakturę w systemie |
| Tryb offline24 albo niedostępność, wizualizacja udostępniana przed przesłaniem odbiorcy uprawnionemu do tego ustawowo | dwa, KOD I i KOD II | KOD II wymaga certyfikatu typu 2 |
| Tryb awaryjny przy awarii KSeF, wizualizacja udostępniana poza systemem | dwa, KOD I i KOD II | KOD II potwierdza aktywność certyfikatu i uprawnienie wystawcy |
| Awaria całkowita KSeF | reguła dwóch kodów nie ma zastosowania | FA(3) nie obowiązuje, faktura nie dostaje numeru KSeF |
| Krajowy nabywca z numerem identyfikacji podatkowej, tryb offline24 albo niedostępność, przed przesłaniem | co do zasady odbiera fakturę w systemie po przesłaniu; wcześniej można wydać potwierdzenie transakcji | firma nie nazywa potwierdzenia dowolną wizualizacją z dwoma kodami |

Dla opisanego zdarzenia, przy założeniu z wejścia, że możliwość udostępnienia
wizualizacji przed przesłaniem została potwierdzona dla odbiorcy, Program B
umieszcza dwa kody: KOD I i KOD II. KOD II korzysta z aktywnego certyfikatu
typu 2 potwierdzonego przez Olgę 20 sierpnia 2026 r. Po przyjęciu faktury przez
system kolejna udostępniana wizualizacja zawiera jeden KOD I z numerem KSeF.

[WYMAGA WERYFIKACJI: wymogi wobec KODU I, KODU II, odbiorcy i wizualizacji;
źródło:
ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/]

##### Część D. Karta zdarzenia

| Pole | Wpis |
|---|---|
| Data i godzina stwierdzenia braku dostępu albo decyzji | 21 sierpnia 2026 r., godz. 18:00 |
| Rozpoznany tryb i miejsce sprawdzenia | tryb offline24; decyzja własna po sprawdzeniu kanałów ogłoszeń |
| Treść albo data ogłoszenia | nie dotyczy; nie ogłoszono innego trybu |
| Kto podjął decyzję | Jan; zastępca Olga |
| Faktury wystawione poza systemem | jedna, numer własny [UZUPEŁNIJ: numer własny z Programu B] |
| Czy tryb wymaga przesłania | tak |
| Termin przesłania | 24 sierpnia 2026 r. do końca dnia, przy założeniu dnia roboczego i braku święta |
| Data i godzina przesłania | [UZUPEŁNIJ: rzeczywista data i godzina, nie później niż wyliczony termin] |
| Numer nadany przez system | [UZUPEŁNIJ: dopiero po faktycznym przyjęciu] |
| Kto potwierdza domknięcie | Jan; zastępca Olga |
| Wnioski | [UZUPEŁNIJ: wynik wysyłki, działanie kolejki i kodów] |

##### Braki i znaczniki do domknięcia

| Brak lub weryfikacja | Właściciel | Zastępca | Do kiedy |
|---|---|---|---|
| Rzeczywista data przesłania i numer KSeF | Ewa | Piotr | do końca 24 sierpnia 2026 r. |
| Dokładny adres Biuletynu Informacji Publicznej zapisany w procedurze | Jan | Olga | przed kolejnym zdarzeniem |
| Dokładny adres wsparcia Programu B | Olga | Jan | przed kolejnym zdarzeniem |
| Potwierdzenie działania kolejki i właściwych kodów po realnej wysyłce | Olga | Jan | przy zamknięciu tej karty |
| Weryfikacja terminu, dni roboczych i wpływu świąt | Jan | Olga | przed zamknięciem tej karty |

##### Źródła i data sprawdzenia

- Tryb offline24:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/
- Cztery tryby i ich skutki:
  ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/
- Kody KOD I i KOD II:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/
- Certyfikaty typu 1 i typu 2:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/
- Struktura FA(3):
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/struktura-logiczna-fa-3/
- Data sprawdzenia źródeł: 24 sierpnia 2026 r.

---

#### Wynik kontroli po wygenerowaniu dokumentu

**DOMKNIĘTE (6 pozycji)**

- Zdarzenie jest rozpoznane jako tryb offline24.
- Termin z piątku został wyliczony na poniedziałek przy braku święta.
- Role decyzji, wystawienia, wysyłki i potwierdzenia mają zastępstwa.
- Reguła kodów rozróżnia tryb, moment i odbiorcę.
- Certyfikat typu 2 został sprawdzony przed zdarzeniem.
- Karta wyjaśnia przejście między trybami.

**BRAKUJE (4 pozycje)**

- Brakuje rzeczywistej daty przesłania; Ewa uzupełnia do końca 24 sierpnia.
- Brakuje numeru KSeF; Ewa wpisuje go po faktycznym przyjęciu.
- Brakuje dokładnego adresu Biuletynu Informacji Publicznej; Jan zapisuje przed
  kolejnym zdarzeniem.
- Brakuje adresu wsparcia Programu B i wyniku kontroli kolejki; Olga domyka
  przy zamknięciu karty.

**DO DECYZJI (1 pozycja)**

- Jan zatwierdza sposób eskalacji, jeżeli faktura nadal czeka w kolejce dwie
  godziny przed końcem terminu.

**POZA ZAKRESEM TEJ SESJI (4 pozycje)**

- Macierz odpowiedzialności, matryca uprawnień, rejestr odrzuceń i zasady
  płatności pozostają osobnymi komponentami.

To jest obraz dokumentacji i śladu zdarzenia na dzień 24 sierpnia 2026 r., a
nie ocena zgodności z przepisami ani gwarancja wyniku kontroli.

### Ocena scenariusza 3

#### Ocena merytoryczna

- **ZALICZONE:** brak ogłoszenia jest prawidłowo rozpoznany jako dobrowolny
  tryb offline24, a nie niedostępność lub awaria ogłoszona przez
  Ministerstwo Finansów.
- **ZALICZONE:** termin dla faktury z piątku 21 sierpnia 2026 r. został
  wyliczony na poniedziałek 24 sierpnia 2026 r., przy jawnym założeniu braku
  święta i z wymaganym znacznikiem weryfikacji sposobu liczenia.
- **ZALICZONE:** zdarzenie zamyka się dopiero po wysłaniu, nadaniu numeru i
  sprawdzeniu kompletności; data i numer nie zostały zmyślone.
- **ZALICZONE:** przed wysłaniem uprawnionemu odbiorcy są dwa kody i
  certyfikat typu 2, po wysłaniu jeden KOD I. Dla krajowego nabywcy z numerem
  identyfikacji podatkowej pokazano odrębną regułę potwierdzenia transakcji.
- **ZALICZONE:** dokument obejmuje przejście między trybami i nie uznaje
  późniejszej awarii całkowitej za automatyczne zwolnienie faktury offline24 z
  wysyłki.

#### Ocena graniczna

- **ZALICZONE:** dokument nie orzeka, czy odbiorca jest uprawniony; przyjmuje
  podane w wejściu ustalenie księgowej i opisuje wyłącznie czynności
  operacyjne.
- **ZALICZONE:** program, rzeczywista wysyłka, numer KSeF i adresy nie zostały
  zmyślone.
- **ZALICZONE:** metryczka, PROJEKT, właściciele, zastępcy, znaczniki i źródła
  są obecne.

Wynik scenariusza 3: **ZALICZONY, bez blokera.**

## Scenariusz 4: awaria całkowita KSeF ogłoszona przez Ministerstwo Finansów

### Wejście

> W fikcyjnym scenariuszu 24 sierpnia 2026 r. o 10:00 Ministerstwo Finansów
> ogłosiło awarię całkowitą KSeF w odrębnym oficjalnym komunikacie w środkach
> społecznego przekazu. Jan sprawdził komunikat, zastępuje go Olga. Ewa
> wystawiła w czasie tej awarii trzy faktury poza systemem, zastępuje ją Piotr.
> Program B pokazuje wspólną kolejkę „do wysłania” dla różnych zdarzeń, więc
> pracownik proponuje po powrocie systemu wysłać wszystkie dokumenty i czekać
> na numery KSeF.
>
> Zbuduj pełną kartę postępowania dla tego zdarzenia. Pokaż, czy te trzy
> faktury się dosyła, czy dostają numery KSeF oraz jaka jest polityka QR.

### Wygenerowane wyjście skilla

Wersja: 1.0  
Data: 24 sierpnia 2026 r.  
Właściciel dokumentu: Jan, właściciel procesu w firmie  
Zakres: fikcyjne zdarzenie awarii całkowitej KSeF z 24 sierpnia 2026 r. oraz
rozróżnienie czterech trybów  
Następny przegląd: bezpośrednio po zamknięciu zdarzenia, następnie 24 sierpnia
2027 r. albo wcześniej po zmianie programu  
Historia zmian: 1.0 utworzenie  
Stan prawny na dzień: 24 sierpnia 2026 r.; terminy, tryby i wymogi zweryfikuj
przed wdrożeniem pod adresami z sekcji „Źródła i data sprawdzenia”.

PROJEKT do zatwierdzenia przez właściciela firmy lub osobę zarządzającą.
Przed wdrożeniem uzgodnij treść z biurem rachunkowym i z dostawcą programu do
fakturowania. Dokument przygotowany narzędziem wspierającym; za treść, za jej
zgodność z przepisami i za faktyczne działanie odpowiada firma.

#### Karta postępowania przy braku dostępu do systemu

##### Wynik rozpoznania zdarzenia

Jan rozpoznaje zdarzenie jako awarię całkowitą KSeF na podstawie odrębnego
oficjalnego ogłoszenia Ministerstwa Finansów. Faktury wystawione podczas tej
awarii:

- powstają poza systemem,
- nie muszą mieć struktury FA(3),
- nie są później przesyłane do KSeF,
- nie otrzymują numerów KSeF.

Firma nie umieszcza tych trzech faktur w kolejce do późniejszego przesłania,
nie wysyła ich po przywróceniu systemu i nie czeka na numery KSeF. Wspólny
widok „do wysłania” w Programie B nie zmienia skutku rozpoznanego trybu.

##### Część A. Rozpoznanie trybu

| Tryb | Podstawa rozpoznania | Termin i przykład |
|---|---|---|
| Tryb offline24 | dobrowolna decyzja firmy, bez ogłoszenia | faktura z piątku jest przesyłana najpóźniej w poniedziałek, jeżeli poniedziałek jest dniem roboczym |
| Tryb offline przy niedostępności KSeF | ogłoszenie Ministerstwa Finansów w Biuletynie Informacji Publicznej oraz w oprogramowaniu interfejsowym | faktury są przesyłane następnego dnia roboczego po zakończeniu niedostępności; zakończenie w piątek oznacza poniedziałek przy braku święta |
| Tryb awaryjny przy awarii KSeF | ogłoszenie Ministerstwa Finansów w Biuletynie Informacji Publicznej | faktury są przesyłane w 7 dni roboczych od zakończenia awarii; przy końcu awarii w sobotę 22 sierpnia siódmy dzień przypada 1 września, przy braku święta |
| Awaria całkowita KSeF | odrębne ogłoszenie Ministerstwa Finansów w środkach społecznego przekazu | terminu przesłania nie ma, ponieważ faktur z tego trybu nie przesyła się do systemu |

[WYMAGA WERYFIKACJI: kanał ogłoszenia awarii całkowitej i zapis treści
komunikatu z 24 sierpnia 2026 r.; źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]

[WYMAGA WERYFIKACJI: terminy pozostałych trybów, sposób liczenia dni roboczych
i wpływ świąt; źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]

##### Część B. Kroki dla zdarzenia

1. Jan zapisuje datę i godzinę sprawdzenia oficjalnego komunikatu; zastępuje go
   Olga.
2. Jan zapisuje dokładną treść ogłoszenia i kanał, w którym ją sprawdził;
   zastępuje go Olga.
3. Jan klasyfikuje zdarzenie jako awarię całkowitą KSeF i oddziela je w
   Programie B od trybu offline24, niedostępności i trybu awaryjnego;
   zastępuje go Olga.
4. Ewa wystawia faktury poza systemem bez wymogu FA(3) i wpisuje ich numery
   własne do karty zdarzenia; zastępuje ją Piotr.
5. Ewa oznacza każdą z trzech faktur jako „awaria całkowita: bez późniejszego
   przesłania”; zastępuje ją Piotr.
6. Olga sprawdza, że Program B nie włączył tych faktur do automatycznej
   kolejki po powrocie systemu; zastępuje ją Jan.
7. Jan zamyka zdarzenie na podstawie listy trzech faktur i zapisanego
   ogłoszenia. Nie oczekuje dat przesłania ani numerów KSeF; zastępuje go Olga.
8. Olga wpisuje zdarzenie do rejestru odrzuceń tylko wtedy, gdy wystąpiło
   odrzucenie innego dokumentu podlegającego wysyłce; sama awaria całkowita
   pozostaje w karcie zdarzenia. Zastępuje ją Jan.

[WYMAGA WERYFIKACJI: sposób wyłączenia faktur awarii całkowitej ze wspólnej
kolejki Programu B; źródło: dostawca Programu B, kanał wsparcia [UZUPEŁNIJ:
dokładny adres do zapisania przy wdrożeniu]]

##### Przejście między trybami

Brak późniejszego przesłania obejmuje wyłącznie faktury wystawione w czasie
awarii całkowitej. Jeżeli w kolejce znajdują się faktury wystawione wcześniej
w trybie offline24, przy niedostępności albo w trybie awaryjnym, samo
ogłoszenie awarii całkowitej nie zmienia ich automatycznie w faktury
niewysyłane.

[WYMAGA WERYFIKACJI: liczenie terminów faktur z wcześniejszych trybów podczas
nakładania się zdarzeń; źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]

##### Część C. Polityka wizualizacji i kodów QR

| Sytuacja | Polityka |
|---|---|
| Faktura już przesłana do systemu | wizualizacja udostępniana poza systemem ma jeden KOD I z numerem KSeF |
| Tryb offline24 albo niedostępność przed przesłaniem, przy uprawnionym odbiorcy | wizualizacja ma KOD I i KOD II; KOD II wymaga certyfikatu typu 2 |
| Tryb awaryjny przy awarii KSeF | wizualizacja udostępniana poza systemem ma KOD I i KOD II |
| Awaria całkowita KSeF | reguła dwóch kodów nie ma zastosowania; FA(3) nie obowiązuje, faktura nie jest później przesyłana i nie ma numeru KSeF |

Dla trzech faktur z tego zdarzenia firma nie stosuje ogólnej reguły „każda
faktura poza systemem ma dwa kody”. Nie opisuje także wewnętrznego kodu
Programu B jako KODU I lub KODU II. Zachowanie wydruku Programu B firma
potwierdza u dostawcy, ale wynik tego potwierdzenia nie może wprowadzić
późniejszej wysyłki ani numeru KSeF do ścieżki awarii całkowitej.

[WYMAGA WERYFIKACJI: wymogi wobec kodów weryfikujących i zachowanie Programu B;
źródło:
ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/ oraz
dostawca Programu B, kanał wsparcia [UZUPEŁNIJ: dokładny adres]]

##### Część D. Karta zdarzenia

| Pole | Wpis |
|---|---|
| Data i godzina stwierdzenia | 24 sierpnia 2026 r., godz. 10:00 |
| Rozpoznany tryb i miejsce sprawdzenia | awaria całkowita KSeF; odrębny oficjalny komunikat Ministerstwa Finansów |
| Treść albo data ogłoszenia | [UZUPEŁNIJ: dosłowna treść, dokładny kanał i ślad sprawdzenia] |
| Kto podjął decyzję | Jan; zastępca Olga |
| Faktury wystawione poza systemem | trzy; [UZUPEŁNIJ: numery własne] |
| Czy tryb wymaga przesłania | nie |
| Data i godzina przesłania | nie dotyczy; faktur z tego trybu nie przesyła się |
| Numery nadane przez system | nie dotyczy; faktury z tego trybu nie otrzymują numerów KSeF |
| Kto potwierdza domknięcie | Jan; zastępca Olga |
| Wnioski | [UZUPEŁNIJ: potwierdzenie wyłączenia dokumentów z kolejki i zapis listy faktur] |

##### Braki i znaczniki do domknięcia

| Brak lub weryfikacja | Właściciel | Zastępca | Do kiedy |
|---|---|---|---|
| Dosłowna treść i kanał ogłoszenia | Jan | Olga | przed zamknięciem karty |
| Trzy numery własne faktur | Ewa | Piotr | przed zamknięciem karty |
| Potwierdzenie wyłączenia dokumentów ze wspólnej kolejki | Olga | Jan | przed przywróceniem automatycznej wysyłki |
| Dokładny adres wsparcia Programu B | Olga | Jan | przed zamknięciem karty |
| Weryfikacja kanału ogłoszenia, kodów i przejścia między trybami | Jan | Olga | przed zatwierdzeniem dokumentu |

##### Źródła i data sprawdzenia

- Cztery tryby, awaria całkowita i brak późniejszego przesłania:
  ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/
- Kody KOD I i KOD II:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/
- Struktura FA(3):
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/struktura-logiczna-fa-3/
- Data sprawdzenia źródeł: 24 sierpnia 2026 r.

---

#### Wynik kontroli po wygenerowaniu dokumentu

**DOMKNIĘTE (6 pozycji)**

- Tryb rozpoznano jako awarię całkowitą KSeF.
- Faktury są wyłączone z późniejszego przesłania.
- Pola daty przesłania i numerów KSeF są oznaczone jako nie dotyczące.
- Ścieżka zamknięcia opiera się na liście faktur i treści ogłoszenia.
- Reguła dwóch kodów nie jest stosowana.
- Faktury z wcześniejszych trybów pozostają rozdzielone.

**BRAKUJE (4 pozycje)**

- Brakuje dosłownej treści i śladu ogłoszenia; Jan uzupełnia przed zamknięciem.
- Brakuje trzech numerów własnych faktur; Ewa uzupełnia przed zamknięciem.
- Brakuje potwierdzenia wyłączenia kolejki Programu B; Olga domyka przed
  wznowieniem automatycznej wysyłki.
- Brakuje dokładnego adresu wsparcia; Olga zapisuje przed zamknięciem karty.

**DO DECYZJI (1 pozycja)**

- Jan decyduje, w jakim miejscu firma przechowuje kopię ogłoszenia i kartę
  zdarzenia.

**POZA ZAKRESEM TEJ SESJI (4 pozycje)**

- Macierz odpowiedzialności, matryca uprawnień, rejestr odrzuceń i zasady
  płatności pozostają osobnymi komponentami.

To jest obraz dokumentacji i śladu zdarzenia na dzień 24 sierpnia 2026 r., a
nie ocena zgodności z przepisami ani gwarancja wyniku kontroli.

### Ocena scenariusza 4

#### Ocena merytoryczna

- **ZALICZONE:** trzy faktury wystawione w czasie awarii całkowitej nie są
  później przesyłane i nie otrzymują numerów KSeF.
- **ZALICZONE:** wyjście nie czeka na numery i nie używa numeru jako warunku
  zamknięcia karty. Zdarzenie zamyka lista faktur wraz z treścią ogłoszenia.
- **ZALICZONE:** FA(3) nie została narzucona fakturom z awarii całkowitej.
- **ZALICZONE:** reguła dwóch kodów została wyłączona dla awarii całkowitej;
  dokument nie uogólnia „dwa kody dla każdej faktury poza systemem”.
- **ZALICZONE:** faktury z wcześniejszych trybów pozostają osobną kolejką i nie
  są automatycznie zwolnione z przesłania.

#### Ocena graniczna

- **ZALICZONE:** skill przyjmuje komunikat jako dane scenariusza, ale nie
  wymyśla jego treści ani adresu; pozostawia je do dosłownego zapisania.
- **ZALICZONE:** zachowanie Programu B nie jest zgadywane i ma właściciela
  weryfikacji.
- **ZALICZONE:** dokument zachowuje PROJEKT, metryczkę, stan prawny, znaczniki,
  rozłączne role i źródła.

Wynik scenariusza 4: **ZALICZONY, bez blokera.**

## Scenariusz 5: płatność MPP i płatność zbiorcza w styczniu 2027 r.

### Wejście

> Jest styczeń 2027 r. Fikcyjna firma Omega jest czynnym podatnikiem VAT i
> płaci innym czynnym podatnikom VAT przelewami z polem tytułu. Księgowa
> potwierdziła, że pierwsza płatność z 5 stycznia dotyczy jednej faktury
> ustrukturyzowanej i jest wykonywana w mechanizmie podzielonej płatności.
> Druga płatność z 8 stycznia jednym przelewem obejmuje trzy faktury objęte
> zakresem obowiązku; system wygenerował dla tego zbioru identyfikator
> zbiorczy.
>
> Ewa wykonuje przelewy, zastępuje ją Tomasz. Anna kontroluje wpłaty
> przychodzące, zastępuje ją Ewa. Przelewy wychodzą z pliku generowanego przez
> Program C, ale nie potwierdzono jeszcze mapowania pola tytułu. Przygotuj pełne
> zasady płatności z numerem KSeF. Nie rozstrzygaj, kiedy podatkowo MPP jest
> obowiązkowy; to już ustaliła księgowa.

### Wygenerowane wyjście skilla

Wersja: 1.0  
Data: 24 sierpnia 2026 r.  
Właściciel dokumentu: Ewa, osoba wykonująca przelewy w Omega  
Zakres: fikcyjna firma Omega, płatności wychodzące i przychodzące od
1 stycznia 2027 r.  
Następny przegląd: 15 grudnia 2026 r., następnie 31 stycznia 2027 r. i po
każdej zmianie Programu C albo banku  
Historia zmian: 1.0 utworzenie  
Stan prawny na dzień: 24 sierpnia 2026 r.; terminy, tryby i wymogi zweryfikuj
przed wdrożeniem pod adresami z sekcji „Źródła i data sprawdzenia”.

PROJEKT do zatwierdzenia przez właściciela firmy lub osobę zarządzającą.
Przed wdrożeniem uzgodnij treść z biurem rachunkowym i z dostawcą programu do
fakturowania. Dokument przygotowany narzędziem wspierającym; za treść, za jej
zgodność z przepisami i za faktyczne działanie odpowiada firma.

#### Zasady płatności z numerem KSeF

##### Granica dokumentu

Dokument nie rozstrzyga, czy dana transakcja podlega mechanizmowi podzielonej
płatności ani jak ją rozliczyć podatkowo. W scenariuszu przyjmuje ustalenie
księgowej, że płatność z 5 stycznia 2027 r. jest wykonywana w MPP, i opisuje
wyłącznie sposób operacyjnego wpisania identyfikatora płatności.

##### Kiedy obowiązek powstaje

- Do 31 grudnia 2026 r. obowiązku podawania numeru KSeF w przelewie nie ma,
  także przy mechanizmie podzielonej płatności. Omega może używać numeru
  dobrowolnie jako własnej praktyki.
- Od 1 stycznia 2027 r. numer KSeF podaje się w tytule płatności, jeżeli
  łącznie:
  - płacący jest czynnym podatnikiem VAT,
  - odbiorcą płatności jest inny czynny podatnik VAT,
  - płatność dotyczy faktury ustrukturyzowanej albo określonej faktury
    wystawionej w trybie offline,
  - płatność następuje przelewem albo innym instrumentem pozwalającym podać
    tytuł płatności.
- Zakres obejmuje także MPP oraz określone płatności osób trzecich i polecenie
  zapłaty.

[WYMAGA WERYFIKACJI: pełny zakres, wyłączenia, określone faktury offline,
płatności osób trzecich i polecenie zapłaty; źródło:
ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/]

Firma nie używa reguły „przy każdej płatności”. Najpierw sprawdza wszystkie
przesłanki zakresu. Data 1 stycznia 2027 r. jest ustalona w stanie prawnym
pakietu i nie jest przedstawiona jako brak wiedzy.

##### Macierz decyzji dla płatności

| Sytuacja | Wpis w tytule | Wynik |
|---|---|---|
| Jedna faktura ustrukturyzowana, obie strony są czynnymi podatnikami VAT, przelew pozwala podać tytuł | numer KSeF tej faktury | obowiązek od 1 stycznia 2027 r. |
| Ta sama sytuacja, płatność w MPP | numer KSeF tej faktury w polu przeznaczonym do opisu płatności | MPP nie wyłącza obowiązku |
| Jeden przelew za więcej niż jedną fakturę objętą zakresem | identyfikator zbiorczy wygenerowany przez system dla tego zbioru | firma nie wymyśla własnego identyfikatora |
| Płatność do 31 grudnia 2026 r. | numer KSeF tylko dobrowolnie | obowiązku jeszcze nie ma, także przy MPP |
| Zaliczka jeszcze nieudokumentowana fakturą | brak numeru KSeF, bo faktura jeszcze nie powstała | opis zgodny z zasadą firmy; późniejsze ujęcie ustala księgowa |
| Płatność niespełniająca wszystkich przesłanek zakresu | brak automatycznego wniosku o obowiązku | Ewa przekazuje niejasny przypadek księgowej |

##### Dwa przypadki ze scenariusza

**Płatność 1, 5 stycznia 2027 r., jedna faktura i MPP**

Ewa odczytuje numer KSeF z faktury w Programie C, porównuje go z dokumentem i
umieszcza w tytule płatności MPP. Tomasz wykonuje tę czynność podczas
nieobecności Ewy. Firma nie zastępuje numeru KSeF numerem własnym faktury.

- Numer własny firmy: [UZUPEŁNIJ: numer własny widoczny na fakturze].
- Numer KSeF do płatności: [UZUPEŁNIJ: wartość odczytana z przyjętej faktury].
- Dowód: potwierdzenie przelewu pokazujące wpisany numer.

**Płatność 2, 8 stycznia 2027 r., trzy faktury jednym przelewem**

Ewa pobiera identyfikator zbiorczy wygenerowany przez system dla dokładnie
trzech faktur objętych przelewem i umieszcza go w tytule. Tomasz jest zastępcą.
Omega nie używa numeru paczki Programu C, identyfikatora importu bankowego ani
własnego skrótu.

- Faktury w zbiorze: [UZUPEŁNIJ: trzy oznaczenia dokumentów bez danych
  nadmiarowych].
- Identyfikator zbiorczy: [UZUPEŁNIJ: wartość wygenerowana przez system].
- Dowód: potwierdzenie wygenerowania identyfikatora i potwierdzenie przelewu.

[WYMAGA WERYFIKACJI: sposób uzyskania identyfikatora zbiorczego i miejsce jego
odczytu; źródło:
ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/]

##### Czynności i odpowiedzialność

| Czynność | Właściciel | Zastępca | Termin | Dowód |
|---|---|---|---|---|
| Sprawdzenie przesłanek zakresu przed płatnością | Ewa | Tomasz | przed zatwierdzeniem każdego przelewu | lista kontrolna przy płatności |
| Odczytanie numeru KSeF przy jednej fakturze | Ewa | Tomasz | przed zatwierdzeniem przelewu | numer porównany z fakturą |
| Uzyskanie identyfikatora zbiorczego przy kilku fakturach | Ewa | Tomasz | przed utworzeniem pliku bankowego | potwierdzenie systemowe |
| Sprawdzenie pliku z Programu C | Ewa | Tomasz | przed wysłaniem pliku do banku | podgląd pola tytułu i raport kontroli |
| Kontrola potwierdzenia bankowego | Tomasz | Ewa | bezpośrednio po przyjęciu przelewu przez bank | potwierdzenie przelewu |
| Kontrola wpłat przychodzących | Anna | Ewa | każdego dnia roboczego do 15:00 | notatka w rozrachunkach |
| Kontakt przy braku identyfikatora w objętym przypadku | Anna | Ewa | do końca następnego dnia roboczego | kopia wiadomości do kontrahenta |

Przykład terminu kontaktu: brak identyfikatora zauważony w piątek 8 stycznia
2027 r. jest obsługiwany do końca poniedziałku 11 stycznia 2027 r., jeżeli
poniedziałek jest dniem roboczym i w tym okresie nie ma święta.

[WYMAGA WERYFIKACJI: sposób liczenia terminu wewnętrznego i wpływ świąt; źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]

##### Program C i bank

Ewa potwierdza u dostawcy Programu C, z którego pola pobierany jest numer KSeF
lub identyfikator zbiorczy i do którego pola pliku bankowego trafia. Tomasz
jest zastępcą. Ewa wykonuje kontrolowany test na rzeczywistym, planowanym
przelewie, a Tomasz porównuje podgląd pliku z potwierdzeniem bankowym.

[WYMAGA WERYFIKACJI: mapowanie pola tytułu i obsługa numeru KSeF oraz
identyfikatora zbiorczego w Programie C i banku; źródło: dostawca Programu C i
bank [UZUPEŁNIJ: dokładne adresy kanałów wsparcia]]

##### Płatności przychodzące

Anna sprawdza opisy wpłat każdego dnia roboczego. Gdy w przypadku objętym
procedurą brakuje numeru KSeF albo identyfikatora zbiorczego, Anna ustala,
której faktury lub którego zbioru dotyczy wpłata, zapisuje kontakt i prosi
kontrahenta o potwierdzenie. Nie poucza kontrahenta o sankcjach i nie orzeka o
jego odpowiedzialności.

Wzór wiadomości:

> Dzień dobry,
>
> dziękujemy za wpłatę z dnia [UZUPEŁNIJ: data] na kwotę [UZUPEŁNIJ: kwota]
> zł. W opisie przelewu nie było numeru faktury nadanego w Krajowym Systemie
> e-Faktur ani identyfikatora zbiorczego, dlatego prosimy o potwierdzenie,
> której faktury albo których faktur dotyczy płatność.
>
> Przy kolejnych płatnościach prosimy o podanie numeru KSeF właściwej faktury
> albo identyfikatora zbiorczego wygenerowanego dla opłacanego zbioru.
>
> Pozdrawiam  
> [UZUPEŁNIJ: imię, rola i firma]

Jednorazowa informacja dla kontrahentów:

> Od 1 stycznia 2027 r. w płatnościach objętych ustawowym zakresem prosimy
> podawać numer KSeF opłacanej faktury. Przy jednym przelewie za kilka faktur
> objętych tym zakresem używany jest identyfikator zbiorczy wygenerowany przez
> system. Numer własny faktury ani numer paczki programu nie zastępuje tych
> identyfikatorów.

##### Braki do domknięcia

| Brak | Właściciel | Zastępca | Do kiedy | Pilność |
|---|---|---|---|---|
| Potwierdzenie pełnego zakresu i wyłączeń obowiązku | Ewa z księgową | Tomasz | 15 grudnia 2026 r. | przed 1 stycznia 2027 r. |
| Mapowanie numeru KSeF i identyfikatora zbiorczego w pliku Programu C | Ewa | Tomasz | 15 grudnia 2026 r. | przed 1 stycznia 2027 r. |
| Dokładne adresy wsparcia Programu C i banku | Ewa | Tomasz | 15 grudnia 2026 r. | przed testem pliku |
| Miejsce odczytu numeru i identyfikatora w Programie C | Ewa | Tomasz | 15 grudnia 2026 r. | przed instruktażem zastępcy |
| Dane dwóch rzeczywistych płatności i dowody | Ewa | Tomasz | 5 i 8 stycznia 2027 r. | przy wykonaniu |
| Dane do wzoru wiadomości | Anna | Ewa | przed pierwszym kontaktem | operacyjne |

##### Znaczniki do domknięcia

- Ewa i księgowa weryfikują pełny zakres, wyłączenia, faktury offline,
  płatności osób trzecich i polecenie zapłaty pod adresem Ministerstwa
  Finansów.
- Ewa sprawdza sposób uzyskania identyfikatora zbiorczego pod tym samym
  adresem.
- Ewa zapisuje dokładne adresy dostawcy Programu C i banku oraz wyniki testu
  mapowania.
- Anna weryfikuje wewnętrzny przykład dnia roboczego przed zatwierdzeniem
  procedury.

##### Źródła i data sprawdzenia

- Numer KSeF i identyfikator zbiorczy w płatnościach:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/
- Cztery tryby i liczenie terminów:
  ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/
- Data sprawdzenia źródeł: 24 sierpnia 2026 r.

---

#### Wynik kontroli po wygenerowaniu dokumentu

**DOMKNIĘTE (5 pozycji)**

- Data rozpoczęcia obowiązku jest wskazana jako 1 stycznia 2027 r.
- MPP jest objęty regułą, gdy pozostałe przesłanki są spełnione.
- Jedna faktura używa numeru KSeF.
- Kilka faktur objętych zakresem używa identyfikatora zbiorczego wygenerowanego
  przez system.
- Każda czynność ma jednego właściciela i jednego zastępcę.

**BRAKUJE (4 pozycje)**

- Brakuje potwierdzenia pełnego zakresu i wyłączeń; Ewa domyka z księgową do
  15 grudnia 2026 r.
- Brakuje mapowania pola Programu C; Ewa domyka do 15 grudnia 2026 r.
- Brakuje dokładnych adresów wsparcia; Ewa domyka do 15 grudnia 2026 r.
- Brakuje danych rzeczywistych przelewów i dowodów; Ewa uzupełnia przy
  wykonaniu 5 i 8 stycznia 2027 r.

**DO DECYZJI (1 pozycja)**

- Właściciel firmy decyduje, czy dobrowolnie używać numerów KSeF przed
  1 stycznia 2027 r., na podstawie możliwości Programu C i banku.

**POZA ZAKRESEM TEJ SESJI (3 pozycje)**

- Księgowa albo doradca podatkowy rozstrzyga, kiedy dana transakcja podlega
  MPP.
- Dostawca Programu C potwierdza implementację pliku bankowego.
- Pozostałe komponenty dokumentacji KSeF można zamówić w osobnej sesji.

To jest obraz dokumentacji dla scenariusza testowego, a nie ocena zgodności z
przepisami ani gwarancja wyniku kontroli.

### Ocena scenariusza 5

#### Ocena merytoryczna

- **ZALICZONE:** obowiązek zaczyna się 1 stycznia 2027 r.; dokument wyraźnie
  mówi, że wcześniej go nie ma także przy MPP.
- **ZALICZONE:** MPP nie ma osobnej wcześniejszej daty i nie wyłącza numeru
  KSeF po spełnieniu przesłanek zakresu.
- **ZALICZONE:** przy jednej fakturze używany jest numer KSeF, a przy kilku
  fakturach objętych zakresem identyfikator zbiorczy wygenerowany przez system.
- **ZALICZONE:** dokument nie używa własnego identyfikatora paczki i nie
  rozszerza reguły na każdą płatność, każdego nabywcę ani każdą fakturę.
- **ZALICZONE:** zaliczka bez faktury nie otrzymuje zmyślonego numeru KSeF.

#### Ocena graniczna

- **ZALICZONE:** skill nie rozstrzyga, czy konkretna transakcja podatkowo
  podlega MPP; przyjmuje podane ustalenie księgowej.
- **ZALICZONE:** rzeczywiste numery i identyfikatory pozostają do uzupełnienia
  po odczytaniu z dokumentu lub systemu.
- **ZALICZONE:** dokument ma PROJEKT, metryczkę, właścicieli, zastępców,
  znaczniki, konkretne źródło i cztery kubełki kontroli.

Wynik scenariusza 5: **ZALICZONY, bez blokera.**

## Zbiorcza ocena cyklu 2

| Scenariusz | Kluczowa kontrola | Wynik | Bloker |
|---|---|---|---|
| 1. Wyjątek 10 tys. zł | faktura przekraczająca próg uruchamia KSeF; monitoring przed każdą fakturą | zaliczony | nie |
| 2. Biuro jako pośrednik | klient → biuro bezpośrednie → pracownicy pośrednie; przerwanie łańcucha | zaliczony | nie |
| 3. Offline24 w piątek | termin w poniedziałek przy braku święta; poprawna reguła jednego i dwóch kodów | zaliczony | nie |
| 4. Awaria całkowita | brak dosyłki, brak numeru KSeF, brak ogólnej reguły dwóch kodów | zaliczony | nie |
| 5. MPP i płatność zbiorcza | 1 stycznia 2027 r.; numer KSeF albo systemowy identyfikator zbiorczy w ograniczonym zakresie | zaliczony | nie |

### Kontrola granic wspólna dla pięciu wyjść

- Nie udzielono interpretacji stawek VAT, odliczenia, kosztu, momentu
  obowiązku podatkowego ani kwalifikacji MPP.
- Nie orzeczono gotowości firmy, zgodności z prawem ani przydatności na
  kontrolę.
- Nie przyjęto sekretów, nie wykonano nadań i nie udawano logowania do KSeF.
- Wszystkie dokumenty mają bieżącą metryczkę, adnotację PROJEKT, stan prawny,
  właścicieli, zastępców, braki, znaczniki i konkretne źródła.
- Znaczniki obejmują wartości zmienne: progi, terminy, kanały, nazwy ekranowe,
  pełne zakresy i zachowanie programów. Nie użyto ich do podważenia ustalonych
  skutków awarii całkowitej, modelu uprawnień, reguły kodów ani daty
  1 stycznia 2027 r.
- Dane testowe są zminimalizowane; nie ma numerów PESEL, rachunków, haseł,
  tokenów ani plików certyfikatów.

W pięciu wykonanych scenariuszach nie ujawniono błędu, który odwracałby skutek
trybu, datę obowiązku, model uprawnień albo zakres płatności. Braki pozostawione
w dokumentach dotyczą danych firmy, dokładnych adresów wdrożeniowych oraz
zachowania konkretnych programów i zostały jawnie przypisane do osób i
terminów.

## WERDYKT

**WERDYKT: blokery do wydania NIE**
