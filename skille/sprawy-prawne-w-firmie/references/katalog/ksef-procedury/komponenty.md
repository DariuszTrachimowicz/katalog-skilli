<!-- Kopia z skille/ksef-procedury/references/komponenty.md, generowana: node narzedzia/katalog-do-firmy.mjs. Nie edytuj tutaj. -->
# Komponenty dokumentacji operacyjnej KSeF (szablony robocze)

Każdy dokument otwieraj metryczką i adnotacją (sekcja 0). Realia od użytkownika
albo `[UZUPEŁNIJ]`; wartości zmienne z `[WYMAGA WERYFIKACJI: ...; źródło: ...]`
wg `stan-prawny.md`, ze wskazaniem konkretnego adresu z rejestru źródeł. Zero
orzekania gotowości, zero podatków, zero sekretów.

Każda sekcja ma ten sam układ: **pytania wywiadu**, **szablon wyjścia**,
**pułapki praktyczne**. Pułapki to nie ozdobniki: to zdarzenia, które naprawdę
wywracają firmy, i każda z nich ma znaleźć odzwierciedlenie w budowanym
dokumencie, a nie tylko w rozmowie.

## Nazwy kanoniczne (używaj dosłownie, bez wariantów)

Jedna nazwa na artefakt w całym pakiecie: w opisie, w `SKILL.md`, w nagłówku
sekcji, w odwołaniach i w przykładzie. Zmiana nazwy w połowie dokumentu sprawia,
że firma szuka dwóch dokumentów zamiast jednego.

| Komponent | Nazwa kanoniczna artefaktu |
|---|---|
| 1 | macierz odpowiedzialności firma-biuro |
| 2 | karta postępowania przy braku dostępu do systemu; ślad pojedynczego zdarzenia: **karta zdarzenia** |
| 3 | matryca uprawnień i certyfikatów |
| 4 | rejestr odrzuceń |
| 5 | plan testów (wariant A) albo przegląd wykonania procedur (wariant B); wynik obu: **protokół stanu wdrożenia** |
| 6 | zasady płatności z numerem KSeF |
| 7 | notatka o kanale urzędowym |
| kontrola | lista kontrolna spójności kompletu |

Nie występują w tym pakiecie: „rejestr błędów”, „rejestr zdarzeń”, „matryca
nadań”, „checklista wdrożeniowa”, „przegląd zgodności operacyjnej”, „lista
odejścia”. Jeśli takie sformułowanie pojawi się w rozmowie użytkownika, przełóż
je na nazwę kanoniczną i powiedz, o którym dokumencie mówisz.

Nazwy czterech trybów pracy bez dostępu do systemu, także kanoniczne: **tryb
offline24**, **tryb offline przy niedostępności KSeF**, **tryb awaryjny przy
awarii KSeF**, **awaria całkowita KSeF**. Warunki i skutki każdego z nich są
inne, więc nie zbijaj ich w jedną kategorię „tryby awaryjne”.

## Rejestr językowy wzorców

Treść dokumentów piszesz w czasie teraźniejszym oznajmującym, z podmiotem
osobowym: „osoba wystawiająca sprawdza”, „biuro przekazuje”, „właściciel
dokumentu potwierdza”. Nie w trybie rozkazującym („sprawdź”, „wyślij”) i nie
w bezokoliczniku („odebrać uprawnienie”), bo procedura ma opisywać, jak firma
działa, a nie wydawać polecenia. Wzorce poniżej są napisane w tym rejestrze
celowo i kopiujesz je w tej formie.

## 0. Metryczka i adnotacja (na początku KAŻDEGO dokumentu)

```
Wersja: 1.0    Data: [UZUPEŁNIJ: data słownie, np. 24 sierpnia 2026]
Właściciel dokumentu: [UZUPEŁNIJ: imię i nazwisko, rola]
Zakres: [UZUPEŁNIJ: nazwa firmy, oddziały lub spółki objęte dokumentem]
Następny przegląd: [UZUPEŁNIJ: data; rekomendacja: co 12 miesięcy oraz po
każdej zmianie programu do fakturowania, zmianie biura rachunkowego, zmianie
osoby odpowiedzialnej i po każdym zdarzeniu awaryjnym]
Historia zmian: 1.0 utworzenie
Stan prawny na dzień: [data z references/stan-prawny.md]; terminy, tryby
i wymogi zweryfikuj przed wdrożeniem pod adresami z sekcji „Źródła”.

PROJEKT do zatwierdzenia przez właściciela firmy lub osobę zarządzającą.
Przed wdrożeniem uzgodnij treść z biurem rachunkowym i z dostawcą programu do
fakturowania. Dokument przygotowany narzędziem wspierającym; za treść, za jej
zgodność z przepisami i za faktyczne działanie odpowiada firma.
```

Na końcu KAŻDEGO dokumentu dokładasz sekcję **„Źródła i data sprawdzenia”**:
konkretne adresy z rejestru źródeł w `stan-prawny.md`, dobrane do tematów
poruszonych w tym dokumencie, plus data stanu prawnego. Sama domena nie
wystarcza, bo w chwili zdarzenia nikt nie będzie szukał podstrony.

## 1. Macierz odpowiedzialności firma-biuro

To fundament. Wszystkie pozostałe dokumenty odwołują się do ról ustalonych tutaj.

### Pytania wywiadu

1. Kto fizycznie wystawia faktury sprzedażowe: właściciel, konkretna osoba,
   dział handlowy, biuro rachunkowe? Czy zdarza się, że robi to ktoś inny
   „na zastępstwo” i czy ma do tego uprawnienie?
2. Kto sprawdza, czy faktura została przyjęta i dostała numer, i po czym to
   poznaje: powiadomienie w programie, ekran, raport dzienny, nic?
3. Kto i jak często pobiera faktury zakupowe z systemu, i co się z nimi dalej
   dzieje (do księgowania, do akceptacji, do zapłaty)? Obowiązek odbierania
   faktur w systemie działa od 1 lutego 2026 także w firmach, które
   z wystawianiem czekają dłużej.
4. Kto reaguje na odrzucenie faktury, w jakim czasie i kogo zawiadamia?
5. Kto opisuje przelewy numerem faktury z systemu i kto pilnuje płatności
   przychodzących opisanych źle albo wcale (komponent 6, obowiązek od
   1 stycznia 2027)?
6. Kto podejmuje decyzję przy braku dostępu do systemu: czy wystawiamy poza
   systemem, czy czekamy? Kto ma prawo tę decyzję podjąć w piątek o 17:00, gdy
   właściciela nie ma?
7. Kto prowadzi rejestr odrzuceń, kto go przegląda i jak często?
8. Kto pilnuje uprawnień: nadaje, odbiera przy odejściu pracownika, przegląda
   listę?
9. Co o tym wszystkim mówi umowa z biurem rachunkowym? Czy w ogóle wymienia
   Krajowy System e-Faktur, czy tylko „prowadzenie ksiąg”?
10. Kto jest zastępcą dla każdej z powyższych czynności na czas urlopu
    i choroby?
11. Jeśli firma korzysta z wyjątku epizodycznego do 10 tys. zł miesięcznie: kto
    sumuje wartość brutto faktur w trakcie miesiąca i rozpoznaje fakturę,
    którą limit zostaje przekroczony? To osobny wiersz macierzy, nie uwaga na
    marginesie: obowiązek powstaje od tej właśnie faktury, a nie od kolejnego
    miesiąca.

### Szablon wyjścia

Tabela, jeden wiersz na czynność. Kolumny są obowiązkowe wszystkie:

| Czynność | Właściciel | Zastępca | Termin | Dowód wykonania | Uwagi |
|---|---|---|---|---|---|
| Wystawienie faktury sprzedażowej | [UZUPEŁNIJ] | [UZUPEŁNIJ] | wg zasad firmy | numer nadany przez system, zapisany przy dokumencie | |
| Potwierdzenie przyjęcia faktury przez system | | | tego samego dnia roboczego | wpis w rejestrze odrzuceń albo raport z programu | |
| Reakcja na odrzucenie faktury | | | do końca następnego dnia roboczego | wpis w rejestrze odrzuceń (komponent 4) | |
| Pobranie faktur zakupowych | | | [UZUPEŁNIJ: np. codziennie, w każdy poniedziałek] | zestawienie pobrań | obowiązek odbierania od 1 lutego 2026 |
| Monitorowanie limitu 10 tys. zł w trakcie miesiąca | | | na bieżąco, do każdej kolejnej faktury | zestawienie wartości brutto faktur miesiąca | tylko jeśli firma korzysta z wyjątku do końca 2026 |
| Opisanie przelewu numerem KSeF | | | w zakresie objętym obowiązkiem, od 1 stycznia 2027 | potwierdzenie przelewu z widocznym numerem | komponent 6, przesłanki zakresu tamże |
| Kontrola płatności przychodzących bez numeru KSeF | | | [UZUPEŁNIJ] | notatka i kontakt z kontrahentem | komponent 6 |
| Decyzja o pracy bez dostępu do systemu | | | niezwłocznie po stwierdzeniu braku dostępu | karta zdarzenia (komponent 2) | |
| Rozpoznanie i zapisanie ogłoszonego trybu | | | w chwili stwierdzenia braku dostępu | karta zdarzenia, część A | |
| Przesłanie faktur wystawionych w trybie offline24, przy niedostępności albo w trybie awaryjnym | | | wg trybu, patrz komponent 2 | numery nadane po wysyłce | nie dotyczy awarii całkowitej ani faktur zwolnionych z przesłania przez ogłoszoną awarię całkowitą |
| Prowadzenie rejestru odrzuceń | | | na bieżąco | sam rejestr | komponent 4 |
| Przegląd matrycy uprawnień i certyfikatów | | | [UZUPEŁNIJ: np. co kwartał] | protokół przeglądu | komponent 3 |
| Odebranie uprawnień osobie odchodzącej | | | w dniu zakończenia pracy | protokół przeglądu | komponent 3 |
| Archiwizacja i kopie własne | | | [UZUPEŁNIJ] | opis miejsca kopii | |

Pod tabelą trzy sekcje:

**Podział firma-biuro w skrócie.** Trzy do pięciu zdań prozą, kto za co
odpowiada, napisane tak, żeby dało się to wysłać do biura mailem i uzyskać
jedno zdanie potwierdzenia. Ten fragment jest ważniejszy niż tabela, bo to on
zostaje w pamięci obu stron.

**Punkty do uzgodnienia w umowie z biurem.** Lista pytań, nie gotowe klauzule.
Minimum: czy biuro działa jako podmiot uprawniony i jakie dokładnie uprawnienie
bezpośrednie ma dziś nadane; czy ma prawo dalszego przekazywania uprawnień
własnym pracownikom; kto odpowiada za terminowe przesłanie faktur wystawionych
poza systemem; komu biuro zgłasza odrzucenie i w jakim czasie; jak biuro
dokumentuje pobranie faktur zakupowych; co się dzieje z uprawnieniami biura po
rozwiązaniu umowy, kto je odbiera i którzy pracownicy biura tracą przez to
dostęp; jak wygląda dostęp w razie sporu. Zaznacz wprost, że treść zapisów
umownych układa prawnik, a to jest lista tematów do rozmowy.

**Braki.** Wszystkie `[UZUPEŁNIJ]` z tabeli wypisane jako lista z pytaniem, kto
je domknie i do kiedy. **Listę porządkujesz według pilności względem dzisiejszej
daty**, nie według kolejności w tabeli: najpierw pozycje dotyczące obowiązków już
wymagalnych na dziś (np. odbieranie faktur od 1 lutego 2026, limit 10 tys. zł
w bieżącym miesiącu), potem pozycje bez terminu ustawowego, a na końcu pozycje
dotyczące dat przyszłych (np. płatności od 1 stycznia 2027). Przy każdej pozycji
z terminem ustawowym dopisz tę datę i napisz wprost, czy termin już minął.

### Pułapki praktyczne

- **Biuro ma dostęp, a umowa milczy o Krajowym Systemie e-Faktur.** Bardzo
  częste: biuro pracuje w systemie na podstawie uprawnienia nadanego kiedyś
  „żeby działało”, a umowa mówi tylko o prowadzeniu ksiąg. Skutek: przy sporze
  nie wiadomo, kto miał pilnować odrzuceń, a przy rozstaniu nikt nie odbiera
  uprawnień. Zapisz to jako brak numer jeden i przenieś do punktów do
  uzgodnienia. Aneksu nie piszesz.
- **Czynność bez zastępcy.** Jeśli jedna osoba wystawia, sprawdza i reaguje,
  firma ma procedurę na papierze i lukę w praktyce od pierwszego urlopu.
  Wymuszaj wypełnienie kolumny „Zastępca” albo jawny wpis
  `[UZUPEŁNIJ: brak zastępcy, ryzyko przerwania wystawiania]`.
- **„Obie strony pilnują”.** Odpowiedzialność dzielona to odpowiedzialność
  niczyja. Rozbij czynność na dwie z osobnymi właścicielami albo wskaż jednego.
- **Kontrahent twierdzi, że nie dostał faktury.** Faktura może być w systemie
  i jednocześnie nieprzeczytana przez odbiorcę, bo nikt u niego nie pobiera
  faktur zakupowych. Wpisz do macierzy czynność „potwierdzenie wysyłki
  wizualizacji do kontrahenta”, jeśli firma taką praktykę stosuje, i odnotuj,
  że wizualizacja przesłana mailem to wygoda handlowa, a nie dowód wystawienia.
- **Przejście przez limit 10 tys. zł w trakcie miesiąca.** Firma korzystająca
  z wyjątku sumuje wartość brutto faktur i przestaje być poza obowiązkiem od tej
  faktury, którą limit przekracza. Bez przypisanego właściciela tego liczenia
  najmniejsza firma dowiaduje się o obowiązku po fakcie.
- **Załączniki i dokumenty okołofakturowe.** Specyfikacje, protokoły odbioru
  i zdjęcia często krążą poza systemem. Zapisz, gdzie one leżą i kto je łączy
  z fakturą, żeby po roku dało się odtworzyć komplet
  `[WYMAGA WERYFIKACJI: zasady dołączania załączników; źródło:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/]`.

## 2. Karta postępowania przy braku dostępu do systemu

### Pytania wywiadu

1. Czy firma może sobie pozwolić na wstrzymanie fakturowania na kilka godzin,
   czy faktura musi powstać natychmiast (wydanie towaru, kierowca, kasa)?
2. Czy program do fakturowania obsługuje wystawianie poza systemem i kolejkę do
   późniejszej wysyłki? To pytanie do dostawcy, nie do skilla.
3. Kto stwierdza brak dostępu i po czym: komunikat w programie, sprawdzenie
   Biuletynu Informacji Publicznej Ministerstwa Finansów, komunikat
   w oprogramowaniu interfejsowym, telefon do biura?
4. Kto ma prawo zdecydować o wystawianiu poza systemem poza godzinami pracy?
5. Czy firma drukuje albo wysyła wizualizacje faktur, komu je udostępnia i czy
   ma certyfikat KSeF typu 2 potrzebny do KODU II?
6. Kto po powrocie systemu sprawdza, że wszystkie faktury podlegające przesłaniu
   faktycznie poszły i dostały numery?

### Szablon wyjścia

Dokument „Karta postępowania przy braku dostępu do systemu”, cztery części.

**Część A. Rozpoznanie trybu.** Cztery tryby, cztery osobne wiersze. To
rozpoznanie przesądza o wszystkim, co dzieje się dalej, więc jest pierwszym
krokiem dokumentu.

| Tryb | Kto go ogłasza | Gdzie firma to sprawdza | Termin przesłania faktur do systemu |
|---|---|---|---|
| Tryb offline24 (dobrowolny, decyzja firmy, bez ogłoszenia) | nikt, decyzja własna firmy | nie dotyczy | nie później niż następnego dnia roboczego po dniu wystawienia `[WYMAGA WERYFIKACJI: warunki i termin; źródło: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/]` |
| Tryb offline przy niedostępności KSeF | Ministerstwo Finansów | Biuletyn Informacji Publicznej Ministerstwa Finansów `[UZUPEŁNIJ: adres zapisany przy wdrożeniu]` oraz komunikat w oprogramowaniu interfejsowym | następnego dnia roboczego po zakończeniu okresu niedostępności `[WYMAGA WERYFIKACJI: termin; źródło: ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]` |
| Tryb awaryjny przy awarii KSeF | Ministerstwo Finansów | Biuletyn Informacji Publicznej Ministerstwa Finansów `[UZUPEŁNIJ: adres zapisany przy wdrożeniu]` | 7 dni roboczych od zakończenia awarii `[WYMAGA WERYFIKACJI: termin; źródło: ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]` |
| Awaria całkowita KSeF | Ministerstwo Finansów, ogłoszenie w środkach społecznego przekazu | kanał wskazany w ogłoszeniu `[WYMAGA WERYFIKACJI: kanał ogłoszenia; źródło: ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]` | **faktur z tego trybu nie przesyła się do systemu i nie otrzymują one numeru KSeF** |

Do każdego wiersza dopisz w dokumencie jedno zdanie po ludzku, co to znaczy dla
tej firmy, i **konkretny przykład liczenia daty** z realnym dniem tygodnia (patrz
sekcja „Przykłady liczenia terminów” niżej). Firma w panice nie liczy dni
roboczych od nowa.

**Różnice, które zapisujesz w dokumencie wprost, bo one decydują:**

- w trybie offline24 oraz przy niedostępności i w trybie awaryjnym faktura
  powstaje według struktury FA(3), w postaci elektronicznej, i **podlega
  przesłaniu do systemu**;
- **w awarii całkowitej struktura FA(3) nie obowiązuje, faktury nie przesyła się
  do systemu i nie ma dla niej numeru KSeF**; dokumentem zamykającym takie
  zdarzenie jest wyłącznie karta zdarzenia, bez wiersza „numery nadane”;
- brak dostępu wyłącznie po stronie firmy (padł internet, program nie łączy się
  z systemem) nie jest ogłoszoną niedostępnością ani awarią; to sytuacja
  z pierwszego wiersza, czyli decyzja o trybie offline24.

**Część B. Kroki, w kolejności.** Numerowana lista, każdy krok z właścicielem
z macierzy. Wzorzec brzmienia, w czasie teraźniejszym oznajmującym:

1. Osoba, która stwierdza brak dostępu, notuje datę i dokładną godzinę.
2. Ta sama osoba sprawdza kanały z części A i zapisuje w karcie zdarzenia,
   który z czterech trybów ogłoszono albo że nie ogłoszono żadnego.
3. Osoba wskazana w macierzy podejmuje decyzję o wystawianiu poza systemem
   i zapisuje ją w karcie zdarzenia.
4. Osoba wystawiająca wystawia faktury w programie w trybie przewidzianym przez
   dostawcę, właściwym dla rozpoznanego trybu.
5. Osoba wystawiająca oznacza każdą taką fakturę w karcie zdarzenia; przy
   trybach 1 do 3 oznacza ją jako oczekującą na przesłanie, a przy awarii
   całkowitej jako wystawioną poza systemem bez przesłania.
6. **Ścieżka domknięcia zależy od trybu:**
   - **tryby 1 do 3:** po powrocie dostępu jedna wskazana osoba na każdą ścieżkę
     wystawiania przesyła faktury do systemu i zapisuje nadane numery w karcie
     zdarzenia, chyba że przed przesłaniem ogłoszono awarię całkowitą (wtedy
     obowiązuje akapit o przejściach między trybami i faktur się nie przesyła);
     właściciel dokumentu potwierdza komplet; dopiero wtedy zdarzenie
     zostaje zamknięte;
   - **awaria całkowita:** faktur nie przesyła się i numerów nie ma; osoba
     prowadząca kartę zdarzenia zapisuje listę faktur wystawionych w tym trybie
     oraz treść ogłoszenia, na które się powołano, i właściciel dokumentu zamyka
     zdarzenie na tej podstawie.
7. Osoba prowadząca rejestr odrzuceń odnotowuje zdarzenie w rejestrze, jeśli
   przy przesyłaniu wystąpiły odrzucenia; samo zdarzenie awaryjne bez odrzuceń
   zostaje w karcie zdarzenia i nie dubluje się w rejestrze.

**Przejście między trybami, osobny akapit w dokumencie.** Jeśli termin
przesłania faktur z trybu offline24 albo z niedostępności przypada w czasie
kolejnego zdarzenia, firma nie liczy terminu od nowa z pamięci: sprawdza, jaki
tryb obowiązuje w dniu terminu, i zapisuje to w karcie zdarzenia
`[WYMAGA WERYFIKACJI: liczenie terminu przy nakładających się trybach; źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]`.
**Wyjątek awarii całkowitej działa też wstecz na nieprzesłane faktury:**
faktury wystawionej w offline24 przed ogłoszeniem awarii całkowitej, a jeszcze
nieprzesłanej, NIE przesyła się do systemu; tak samo faktury z okresu
niedostępności, której termin przesłania zbiega się z awarią całkowitą.
Takie faktury pozostają bez numeru KSeF; odnotowuje się je w karcie zdarzenia,
a jeśli dokument trafił wcześniej do rejestru odrzuceń, domyka się tam wpis
adnotacją o zwolnieniu z przesłania. Stan bez numeru uwzględnia się przy
zasadach płatności.

**Przykłady liczenia terminów** (wzorzec, każdy tryb dostaje własny, z realnymi
dniami tygodnia; daty podmieniasz na aktualne wobec dnia rozmowy):

- **Tryb offline24:** faktura wystawiona w czwartek; termin przesłania upływa
  z końcem piątku. Faktura wystawiona w piątek: termin upływa z końcem
  poniedziałku, bo sobota i niedziela nie są dniami roboczymi.
- **Tryb offline przy niedostępności KSeF:** niedostępność ogłoszona od
  poniedziałku wieczorem do wtorku rano; termin przesłania faktur wystawionych
  w tym oknie upływa z końcem środy.
- **Tryb awaryjny przy awarii KSeF:** awaria stwierdzona w piątek o 18:00,
  zakończona w sobotę. Pierwszym dniem roboczym jest poniedziałek; siedem dni
  roboczych upływa we wtorek za dziewięć dni kalendarzowych (poniedziałek,
  wtorek, środa, czwartek, piątek, przerwa na weekend, poniedziałek, wtorek).
  Święto w tym oknie przesuwa termin o kolejny dzień.
- **Awaria całkowita KSeF:** przykładu liczenia terminu nie ma, bo nie ma
  terminu przesłania. W dokumencie zapisujesz zamiast niego zdanie: „faktur
  wystawionych w tym trybie nie przesyła się do systemu”.

Regułę liczenia oznaczasz `[WYMAGA WERYFIKACJI: sposób liczenia terminu, w tym
wpływ świąt; źródło:
ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]`.

**Część C. Wizualizacje faktur wystawianych poza systemem.** Liczba kodów QR
zależy od trybu, momentu udostępnienia i odbiorcy. Wpisz do dokumentu tę tabelę,
a nie ogólną regułę:

| Sytuacja | Ile kodów | Uwaga |
|---|---|---|
| Faktura już przesłana do systemu, wizualizacja udostępniana poza systemem | jeden (KOD I), z numerem KSeF | to najczęstszy przypadek po powrocie dostępu |
| Faktura z trybu offline24 albo z niedostępności, udostępniana poza systemem PRZED przesłaniem, odbiorcy uprawnionemu do tego ustawowo | dwa (KOD I i KOD II) | KOD II wymaga certyfikatu KSeF typu 2 |
| Faktura z trybu awaryjnego udostępniana poza systemem PRZED przesłaniem do systemu | dwa (KOD I i KOD II) | jak wyżej; po przesłaniu wizualizacja ma już jeden KOD I z numerem KSeF |
| Faktura z awarii całkowitej | reguła dwóch kodów nie ma zastosowania | struktura FA(3) nie obowiązuje w tym trybie |
| Krajowy nabywca z numerem identyfikacji podatkowej, tryb offline24 albo niedostępność, przed przesłaniem | co do zasady odbiera fakturę w systemie po przesłaniu; przed przesłaniem można wydać potwierdzenie transakcji | nie jest to „wizualizacja faktury z dwoma kodami” |

Znaczenie kodów: **KOD I** daje odbiorcy dostęp do faktury w systemie
i weryfikację jej danych. **KOD II** potwierdza aktywność certyfikatu wystawcy
oraz jego uprawnienie do wystawienia faktury w imieniu podatnika; **do jego
utworzenia potrzebny jest certyfikat KSeF typu 2**, a nie „jakikolwiek
certyfikat”
`[WYMAGA WERYFIKACJI: wymogi wobec kodów; źródło:
ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/]`.

W dokumencie zapisz dwa zdania: kto sprawdza, że program umieszcza właściwą
liczbę kodów w każdej z powyższych sytuacji, oraz kto potwierdził, że firma ma
aktywny certyfikat typu 2 i kiedy. Oba to pytania do dostawcy programu i do
osoby zarządzającej certyfikatami, nie rzeczy do ustalenia w czacie.

**Część D. Karta zdarzenia** (wzór do wypełnienia przy każdym zdarzeniu):

```
Data i godzina stwierdzenia braku dostępu: [UZUPEŁNIJ]
Rozpoznany tryb (offline24 / niedostępność / awaria / awaria całkowita)
  i miejsce sprawdzenia: [UZUPEŁNIJ]
Treść albo data ogłoszenia, na które się powołano: [UZUPEŁNIJ]
Kto podjął decyzję o wystawianiu poza systemem: [UZUPEŁNIJ]
Ile faktur wystawiono poza systemem i jakie mają numery własne: [UZUPEŁNIJ]
Czy tryb wymaga przesłania do systemu: [UZUPEŁNIJ: tak przy offline24,
  niedostępności i trybie awaryjnym; nie przy awarii całkowitej; „tak, ale
  zwolnione z przesłania przez awarię całkowitą ogłoszoną dnia...”, gdy
  ogłoszenie zapadło przed przesłaniem]
Data i godzina przesłania do systemu (jeśli dotyczy): [UZUPEŁNIJ]
Numery nadane przez system (jeśli dotyczy): [UZUPEŁNIJ]
Kto potwierdził domknięcie zdarzenia: [UZUPEŁNIJ]
Wnioski: [UZUPEŁNIJ]
```

### Pułapki praktyczne

- **Zdarzenie w piątek wieczorem.** Klasyk. Zaczyna się po godzinach, decyzję
  podejmuje ktoś, kto nie ma do niej upoważnienia, a termin liczony w dniach
  roboczych przesuwa się przez weekend i ewentualne święto. W procedurze
  zapisujesz konkretny przykład liczenia i wskazujesz osobę z prawem decyzji po
  godzinach.
- **Faktury wystawione poza systemem i nigdy nieprzesłane.** Najgroźniejszy błąd
  całego obszaru, bo nikt go nie zauważa: dostęp wraca, praca idzie dalej,
  a kolejka zaległych zostaje. Dlatego krok „wszystkie faktury podlegające
  przesłaniu dostały numery” ma osobnego właściciela i osobny wpis w karcie
  zdarzenia. **Ta reguła nie obejmuje awarii całkowitej**, w której przesłania
  nie ma; wpisanie jej tam tworzy nawyk odwrotny do prawidłowego.
- **„Padł nam internet, to awaria KSeF”.** Brak dostępu po stronie firmy to nie
  ogłoszona awaria ani niedostępność, a tryby i terminy się różnią. W procedurze
  rozdziel te sytuacje i każ zapisać, co konkretnie sprawdzono i gdzie.
- **Termin dosłania wpadający w kolejne zdarzenie.** Firma odkłada wysyłkę
  „bo i tak nie działa”, a termin biegnie. Osobny akapit o przejściach między
  trybami jest po to, żeby nikt nie liczył tego z pamięci.
- **Podwójna wysyłka.** Po powrocie dostępu program wysyła kolejkę, a ktoś
  równolegle wystawia te same faktury ręcznie. Skutek: duplikaty w obiegu
  i korekty. Zapisz zasadę, że w czasie zdarzenia wystawia wyłącznie osoba
  wskazana w karcie, a kolejkę przesyła jedna osoba na każdą ścieżkę.
- **Brak certyfikatu typu 2 odkryty w chwili zdarzenia.** Firma ma certyfikat,
  ale typu 1, więc nie utworzy KODU II i nie wystawi prawidłowej wizualizacji
  faktury offline udostępnianej poza systemem przed przesłaniem (sytuacje
  z regułą dwóch kodów). To sprawdza się przed pierwszym zdarzeniem, nie
  w jego trakcie.
- **Czego tu NIE ma: rzekomego zakazu regularnego offline24.** Tryb offline24
  jest dobrowolny i przepisy nie ograniczają ani kręgu podatników, ani
  częstotliwości korzystania z niego. Naganne jest „wyślemy, jak się uda”, czyli
  brak dotrzymania warunków i terminu, a nie sama regularność ani wygoda.
  Nie wpisuj do procedury ostrzeżenia, że regularne korzystanie z trybu jest
  nadużyciem, bo to blokowałoby prawidłowo zaprojektowany model pracy. Opisujesz
  warunki i termin, a decyzję o modelu podejmuje firma z doradcą.

## 3. Matryca uprawnień i certyfikatów

### Pytania wywiadu

1. Kto dziś ma jakikolwiek dostęp do systemu w imieniu firmy, łącznie z osobami,
   o których się zapomina (były pracownik, informatyk, poprzednie biuro)?
2. Kto zarządza uprawnieniami na co dzień i czy jest druga osoba z szerokim
   uprawnieniem do zarządzania? (Nie pytaj o „drugie uprawnienie właścicielskie”,
   bo takie nie istnieje.)
3. Czy biuro rachunkowe ma nadane uprawnienie bezpośrednie, w jakim zakresie
   i czy z prawem dalszego przekazywania swoim pracownikom
   `[WYMAGA WERYFIKACJI: zakresy uprawnień; źródło:
   ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/]`?
4. Czy program do fakturowania korzysta z osobnego uwierzytelnienia i kto nim
   zarządza?
5. Jakie certyfikaty ma firma i jakiego typu: typ 1 do uwierzytelniania, typ 2
   do KODU II? Na kogo są wystawione: na numer PESEL osoby fizycznej czy na
   numer identyfikacji podatkowej podmiotu?
6. Co się dzieje z uprawnieniami przy odejściu osoby, zmianie biura, zmianie
   właściciela firmy?
7. Kto i jak często przegląda listę uprawnień?

### Model uprawnień, który wpisujesz do dokumentu

Trzy pojęcia, ale nie trzy równorzędne pozycje jednej listy:

- **Uprawnienie właścicielskie** jest systemowe i wynika z numeru identyfikacji
  podatkowej podatnika. Nie nadaje się go drugiej osobie i nie odbiera się go
  w systemie. W matrycy występuje jako jeden wiersz opisujący podatnika, bez
  kolumny „warunek odebrania”.
- **Uprawnienie bezpośrednie** nadaje się osobie fizycznej **albo podmiotowi**
  (biuro rachunkowe, spółka powiązana). Zakres bywa różny: wystawianie, dostęp
  do faktur, zarządzanie uprawnieniami.
- **Uprawnienie pośrednie** opisuje łańcuch: podmiot z uprawnieniem
  bezpośrednim i prawem dalszego przekazywania nadaje je swojemu pracownikowi
  do pracy u konkretnego klienta.

**Biuro rachunkowe w tej kolejności:** klient nadaje biuru uprawnienie
**bezpośrednie** (wystawianie i/lub dostęp), opcjonalnie z prawem dalszego
przekazywania; biuro nadaje swoim pracownikom uprawnienia **pośrednie** do
jednego, wybranych albo wszystkich klientów. Nie wpisuj biura jako
„uprawnienie pośrednie wg umowy”, bo to odwraca model i uniemożliwia audyt.

### Szablon wyjścia

**Matryca uprawnień i certyfikatów.** Jeden wiersz na osobę albo podmiot:

| Osoba / podmiot | Rola | Rodzaj uprawnienia | Zakres | Kto nadał i kiedy | Certyfikat: typ i na kogo wystawiony | Data przeglądu | Warunek odebrania |
|---|---|---|---|---|---|---|---|
| [UZUPEŁNIJ] | podatnik | właścicielskie (systemowe, wynika z numeru identyfikacji podatkowej) | pełny z mocy systemu | nie dotyczy, nie jest nadawane | [UZUPEŁNIJ: typ 1 / typ 2 / brak] | [UZUPEŁNIJ] | nie podlega odebraniu w systemie |
| [UZUPEŁNIJ] | np. osoba wystawiająca faktury | bezpośrednie | wystawianie | [UZUPEŁNIJ] | [UZUPEŁNIJ: typ, na numer PESEL czy na numer podmiotu] | [UZUPEŁNIJ] | zakończenie pracy |
| [UZUPEŁNIJ] | np. osoba zarządzająca uprawnieniami | bezpośrednie | zarządzanie uprawnieniami i dostęp | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | zmiana zakresu obowiązków |
| [UZUPEŁNIJ] | biuro rachunkowe (podmiot uprawniony) | bezpośrednie, nadane podmiotowi | [UZUPEŁNIJ: wystawianie i/lub dostęp; czy z prawem dalszego przekazywania] | [UZUPEŁNIJ] | nie dotyczy podmiotu; certyfikaty po stronie biura | [UZUPEŁNIJ] | rozwiązanie umowy z biurem |
| [UZUPEŁNIJ] | pracownik biura rachunkowego | pośrednie, nadane przez biuro | [UZUPEŁNIJ] | biuro, data [UZUPEŁNIJ] | po stronie biura | [UZUPEŁNIJ] | odebranie uprawnienia biuru albo decyzja biura |

Nazw pozycji widocznych na ekranie nie wymyślaj: użytkownik ma je potem
odnaleźć w Aplikacji Podatnika KSeF 2.0
`[WYMAGA WERYFIKACJI: nazwy zakresów na ekranie; źródło:
ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/]`.

**Zasady, które wpisujesz zawsze:**

- uprawnienie nadaje się konkretnej osobie fizycznej albo konkretnemu podmiotowi,
  nigdy stanowisku, i w zakresie najwęższym wystarczającym do pracy; szerokie
  uprawnienie „na wszelki wypadek” to trwałe ryzyko;
- firma ma co najmniej dwie osoby z szerokim uprawnieniem do zarządzania
  uprawnieniami, żeby wyjazd albo choroba jednej nie zablokowała pracy; to nie
  jest „drugie uprawnienie właścicielskie”, tylko nadane uprawnienie
  bezpośrednie o szerokim zakresie; w firmie jednoosobowej zapisuje się to jako
  świadomie przyjęte ryzyko wraz z planem awaryjnym;
- każde nadanie i odebranie odnotowuje się w matrycy w dniu wykonania;
- przegląd matrycy odbywa się w stałym rytmie `[UZUPEŁNIJ: np. co kwartał]`
  i dodatkowo po każdej zmianie kadrowej;
- firma zna typ każdego posiadanego certyfikatu, bo typ 1 nie zastąpi typu 2
  przy KODZIE II
  `[WYMAGA WERYFIKACJI: typy certyfikatów i ich zastosowanie; źródło:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/]`;
- terminy ważności certyfikatów mają w firmie jednego właściciela, który pilnuje
  odnowienia; sam cykliczny kalendarz obowiązków firmy prowadzi się osobno
  (do tego służy skill `kalendarz-obowiazkow`), a tutaj zapisuje się tylko
  zdarzenie, właściciela i datę.

**Miejsce wykonania.** Uprawnienia i certyfikaty firma nadaje, odbiera
i unieważnia **w Aplikacji Podatnika KSeF 2.0 albo przez API KSeF 2.0
w programie zintegrowanym**. Moduł Certyfikatów i Uprawnień był miejscem
przygotowawczym przed startem KSeF 2.0 i nie jest już odrębnym miejscem tej pracy
`[WYMAGA WERYFIKACJI: aktualne kanały; źródło:
ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/]`.

**ZASADA TWARDA, powtórz ją w dokumencie:** ten skill projektuje matrycę, a nie
operuje sekretami. Nie przyjmuje i nie zapisuje tokenów, plików certyfikatów,
haseł ani danych logowania. Nadania i odebrania wykonuje wyłącznie osoba
upoważniona, w systemie.

### Lista czynności przy odejściu osoby

Wzorzec w czasie teraźniejszym oznajmującym, do wpisania do dokumentu:

1. Osoba zarządzająca uprawnieniami odbiera odchodzącemu uprawnienia w systemie
   w dniu zakończenia pracy i odnotowuje to w matrycy.
2. Firma sprawdza, czy uwierzytelnienie odchodzącego nie jest zaszyte w programie
   do fakturowania ani w integracji; jeśli jest, właściciel integracji wymienia
   je u dostawcy programu.
3. Firma ustala, na kogo był wystawiony certyfikat, którym posługiwała się ta
   osoba, i postępuje zależnie od tego:
   - **certyfikat wystawiony na numer PESEL odchodzącego:** firma go nie
     unieważni, bo operacje wykonuje się wyłącznie na własnych certyfikatach.
     Firma odbiera uprawnienia (krok 1) i pisemnie zwraca się do tej osoby
     o unieważnienie własnego certyfikatu, a fakt zwrócenia się odnotowuje;
   - **certyfikat wystawiony na numer identyfikacji podatkowej firmy:** osoba
     uprawniona po stronie firmy najpierw ustala, komu ten certyfikat był
     udostępniony i co przestanie działać po unieważnieniu (integracje, wysyłka
     automatyczna, KOD II), a dopiero potem go unieważnia i wydaje nowy
     `[WYMAGA WERYFIKACJI: tryb unieważnienia; źródło:
     ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/]`.
4. Właściciel dokumentu potwierdza wykonanie kroków 1 do 3 wpisem w protokole
   przeglądu.

### Lista czynności przy zmianie biura rachunkowego

1. Firma odbiera biuru uprawnienie bezpośrednie w dniu rozwiązania umowy
   i odnotowuje to w matrycy.
2. Firma sprawdza i zapisuje, **którzy pracownicy biura tracą przez to
   możliwość pracy dla firmy**. Odebranie uprawnienia biuru przerywa łańcuch
   i dezaktywuje uprawnienia pośrednie jego pracowników, ale wpisy o tych
   uprawnieniach pozostają w systemie, więc sam widok listy bywa mylący.
3. Firma nadaje uprawnienie bezpośrednie nowemu biuru dopiero po kroku 1, żeby
   nie pracowały jednocześnie dwa biura o nieustalonym zakresie.
4. Właściciel dokumentu potwierdza obie operacje wpisem w protokole przeglądu
   z datą.

### Pułapki praktyczne

- **Pracownik z certyfikatem odchodzi z firmy.** Odebranie uprawnienia to jedno,
  a certyfikat to drugie i nie zawsze da się go unieważnić po stronie firmy.
  Ścieżka jest w liście czynności przy odejściu osoby, punkt 3. Bezwarunkowe
  „unieważnij certyfikat pracownika” jest instrukcją niewykonalną.
- **Firma jednoosobowa z jednym dostępem.** Właściciel wyjeżdża, choruje albo
  gubi telefon z uwierzytelnieniem i firma nie wystawia faktur. Nazwij to
  wprost, zaproponuj nadanie szerokiego uprawnienia bezpośredniego osobie
  zaufanej albo pisemny plan awaryjny z biurem rachunkowym.
- **Poprzednie biuro nadal ma dostęp.** Przy zmianie biura nikt nie odbiera
  uprawnień staremu, a łańcuch do jego pracowników pozostaje aktywny. Lista
  czynności przy zmianie biura rachunkowego jest dokładnie o tym.
- **Uprawnienie nadane „technicznie” przez informatyka.** Osoba wdrażająca
  program dostaje szeroki dostęp na czas wdrożenia i zostaje z nim na lata.
  Termin odebrania wpisuje się od razu przy nadaniu, w kolumnie „Warunek
  odebrania”.
- **„Mamy certyfikat”, ale nie ten.** Certyfikat typu 1 nie pozwala utworzyć
  KODU II. Firma dowiaduje się o tym przy pierwszym zdarzeniu offline, jeśli
  wcześniej nikt nie sprawdził typu.
- **Prośba o wklejenie tokenu.** Jeśli padnie, przerwij, każ uznać sekret za
  ujawniony i wymienić go w systemie, który go wydał, i wróć do matrycy. Nie ma
  wariantu „tylko fragment” ani „to token testowy”.

## 4. Rejestr odrzuceń

### Pytania wywiadu

1. Skąd firma dowiaduje się o odrzuceniu: komunikat w programie, raport, mail,
   nie dowiaduje się?
2. Czy zdarzały się już odrzucenia i co wtedy zrobiono?
3. Kto ma czas i uprawnienie, żeby poprawić i wysłać ponownie?
4. Czy zdarzyło się, że dokument odrzucony przez system został zapłacony albo
   zaksięgowany?

### Szablon wyjścia

**Rejestr odrzuceń** (tabela, prowadzona na bieżąco):

| Data i godzina | Numer własny faktury | Kontrahent (oznaczenie) | Kod / komunikat błędu | Przyczyna po ludzku | Tryb wystawienia | Co zrobiono | Data ponownej wysyłki | Numer nadany | Data wystawienia po przyjęciu | Kto |
|---|---|---|---|---|---|---|---|---|---|---|

Instrukcja przy kolumnach, po jednym zdaniu: „Kontrahent (oznaczenie)” wypełnia
się nazwą skróconą albo własnym oznaczeniem, bez numerów rachunków i danych
osobowych ponad potrzebę; „Przyczyna po ludzku” to jedno zdanie zrozumiałe za
rok, nie sam kod; „Tryb wystawienia” wskazuje, czy dokument powstał w wysyłce
zwykłej, czy w jednym z czterech trybów pracy bez dostępu; „Data wystawienia
po przyjęciu” to data wystawienia, jaką faktura ma po skutecznym przesłaniu
(zasada daty jest opisana przy źródłach w sekcji „Źródła i data sprawdzenia”);
„Kto” to imię i nazwisko osoby, nie nazwa działu.

**Status dokumentu odrzuconego, zapisz to w dokumencie dokładnie tak:**
dokument odrzucony w Krajowym Systemie e-Faktur nie istnieje: nie ma numeru
KSeF, nie jest dostępny dla nabywcy w systemie i nie posługuje się nim jako
fakturą ustrukturyzowaną. **Nie znaczy to, że „faktury nie ma” ani że płatność jest
„bez podstawy”**: dokument wystawiony poza systemem może być fakturą w rozumieniu
przepisów o podatku od towarów i usług, jeśli spełnia przesłanki materialne.
Ocenę tego oraz sposób ujęcia rozstrzyga księgowa albo doradca podatkowy, nie ten
rejestr i nie ten skill.

**Ścieżka reakcji** (wzorzec brzmienia w czasie teraźniejszym oznajmującym):

1. Osoba wskazana w macierzy zauważa odrzucenie i zapisuje je w rejestrze tego
   samego dnia roboczego.
2. Ta sama osoba ustala **przyczynę** oraz **tryb, w jakim dokument powstał**,
   i rozstrzyga, z którą z dwóch sytuacji ma do czynienia:
   - **błąd techniczny wysyłki** (dokument nie został skutecznie wprowadzony do
     obrotu poza systemem): poprawia plik i wysyła ponownie;
   - **dokument skutecznie wystawiony poza systemem** (trafił do kontrahenta,
     jest wystawiony w trybie offline24, przy niedostępności albo w trybie
     awaryjnym): zmiana danych może wymagać korekty, a nie nadpisania pliku, więc
     osoba wystawiająca przekazuje sprawę księgowej przed jakąkolwiek zmianą
     treści dokumentu.
3. Osoba wystawiająca sprawdza nadany numer po ponownej wysyłce i wpisuje go
   do rejestru razem z datą wystawienia po przyjęciu (kolumna „Data wystawienia
   po przyjęciu”).
4. Jeśli kontrahent otrzymał wizualizację, osoba wystawiająca informuje go
   o numerze faktury właściwym do jego ewidencji.
5. Właściciel firmy przejmuje wpis otwarty dłużej niż
   `[UZUPEŁNIJ: np. dwa dni robocze]`.

**Katalog typowych przyczyn** (uzupełniany o realne przypadki firmy; komunikaty
i kody bierze się z programu i z serwisu Ministerstwa Finansów
`[WYMAGA WERYFIKACJI: znaczenie kodów; źródło:
ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ oraz dostawca programu]`):
niezgodność z wymaganą strukturą faktury, błędny numer identyfikacji podatkowej
nabywcy, brak wymaganego pola, wysyłka bez ważnego uwierzytelnienia albo
z odebranym uprawnieniem, przekroczenie limitu technicznego wysyłki, próba
wysyłki dokumentu w niewłaściwej wersji struktury. Przy każdej przyczynie
dopisz, kto ją naprawia: część to praca osoby wystawiającej, część to zgłoszenie
do dostawcy programu.

**Przegląd okresowy:** raz na `[UZUPEŁNIJ: np. miesiąc]` osoba prowadząca rejestr
i właściciel firmy przeglądają go i odpowiadają na jedno pytanie: czy któryś błąd
się powtarza. Powtarzalny błąd to sprawa do dostawcy programu albo do zmiany
sposobu pracy, nie do poprawiania w nieskończoność.

### Pułapki praktyczne

- **Dokument odrzucony, a już zapłacony.** Kontrahent dostał wizualizację
  mailem, zapłacił, a plik nie przeszedł do systemu. To realny problem
  wymagający reakcji, ale **nie wolno pisać, że „faktury nie ma” ani że
  „płatność wisi bez podstawy”**. Procedura opisuje kolejność: ustalić tryb
  i przyczynę, rozstrzygnąć błąd techniczny kontra dokument skutecznie
  wystawiony, poprawić albo skorygować, sprawdzić numer, poinformować
  kontrahenta, przekazać sprawę księgowej do rozliczenia.
- **Nikt nie patrzy na komunikaty.** Program pokazuje odrzucenie w miejscu,
  w które nikt nie zagląda. Wpisz do macierzy konkretne „kto i o której
  sprawdza”, a nie „na bieżąco”.
- **Poprawka bez śladu.** Osoba poprawia i wysyła ponownie, ale nic nie
  zapisuje. Po trzech miesiącach nie wiadomo, czy błąd był jednorazowy, czy jest
  systematyczny. Wpis do rejestru jest częścią naprawy, nie dodatkiem.
- **Odrzucenie na przełomie miesiąca.** Datę wystawienia po ponownym
  przesłaniu wyznacza system (kolumna „Data wystawienia po przyjęciu”
  w rejestrze); ujęcie dokumentu w rozliczeniu miesiąca rozstrzyga księgowa.
  Skill odnotowuje fakty i kieruje pytanie o ujęcie do niej.
- **Rejestr jako zbiór danych osobowych.** Rejestr rośnie i zaczyna zawierać
  dane kontrahentów. Dopisz zdanie o minimalizacji i o tym, gdzie rejestr jest
  przechowywany oraz kto ma do niego dostęp.

## 5. Plan testów albo przegląd wykonania procedur

Dwa warianty jednego komponentu. Wybór zależy od odpowiedzi z wywiadu, punkt 4.
Wynik obu wariantów nazywa się **protokołem stanu wdrożenia**.

### Wariant A, firma dopiero wdraża: plan testów

Lista prób, każda z właścicielem, **środowiskiem**, datą wykonania i wynikiem
(wykonane / nie wykonane / wynik do wyjaśnienia). Nie stawiaj oceny ogólnej.

**Kolumna „Środowisko” jest obowiązkowa w każdym wierszu** i przyjmuje jedną
z dwóch wartości: **Demo** (środowisko testowe udostępnione przez Ministerstwo
Finansów) albo **produkcja**. Zasada twarda, którą wpisujesz do dokumentu:
**faktur na próbę nie wystawia się na produkcji i nie da się ich z systemu
usunąć; realnych uprawnień nie odbiera się „dla testu” na produkcji.** Na
produkcji wykonuje się wyłącznie próby na rzeczywistych, planowanych
dokumentach i operacjach, które firma i tak by wykonała.

| # | Próba | Środowisko | Kto wykonuje | Kto potwierdza | Dowód |
|---|---|---|---|---|---|
| 1 | Wystawienie i przyjęcie zwykłej faktury sprzedażowej, zapisanie nadanego numeru | Demo; na produkcji tylko na rzeczywistej fakturze | osoba wystawiająca na co dzień | [UZUPEŁNIJ] | numer nadany |
| 2 | Faktura dla nabywcy zagranicznego albo dla konsumenta, jeśli firma takie wystawia: jak program ją traktuje `[WYMAGA WERYFIKACJI: zakres faktur poza systemem; źródło: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/]` | Demo | [UZUPEŁNIJ] | | |
| 3 | Faktura korygująca i powiązanie z fakturą pierwotną | Demo | | | |
| 4 | Celowe wywołanie odrzucenia i przejście pełnej ścieżki naprawy z wpisem do rejestru odrzuceń | **wyłącznie Demo** | | | wpis w rejestrze |
| 5 | Tryb offline24: czy program pozwala wystawić, czy trzyma kolejkę, czy przesyła po powrocie dostępu | Demo | | | |
| 6 | Wizualizacja faktury: czy program umieszcza **jeden kod po przesłaniu i dwa kody przed przesłaniem** w sytuacjach z komponentu 2, część C | Demo | | | wydruki obu wariantów |
| 7 | Certyfikat typu 2 i KOD II: czy firma ma aktywny certyfikat typu 2, czy osoba wystawiająca ma uprawnienie do wystawiania, czy KOD II daje się utworzyć i zweryfikować | Demo | | | zrzut weryfikacji kodu |
| 8 | Scenariusz awarii całkowitej „na sucho”: kto rozpoznaje tryb, jak wystawia poza systemem i **czy nikt nie próbuje dosłać tych faktur po zdarzeniu** | omówienie przy dokumencie, bez wystawiania | | | podpisana karta zdarzenia próbna |
| 9 | Pobranie faktur zakupowych przez osobę, która ma to robić na co dzień, a nie przez wdrożeniowca | produkcja, na rzeczywistych fakturach | | | zestawienie pobrań |
| 10 | Dostęp zastępcy: czy naprawdę wejdzie i wystawi | Demo | | | |
| 11 | Przelew opisany numerem KSeF: czy bank przyjmuje pole w wymaganej formie (komponent 6) | produkcja, na rzeczywistym przelewie | | | potwierdzenie przelewu |
| 12 | Odtworzenie faktury sprzed miesiąca przez osobę, która jej nie wystawiała | produkcja, odczyt | | | |
| 13 | Odebranie uprawnienia i sprawdzenie utraty dostępu | **wyłącznie Demo albo na uprawnieniu utworzonym w tym celu**; nie odbiera się realnych uprawnień osobom pracującym | | | zrzut matrycy przed i po |

Testy potwierdzane ustnie nie istnieją, dlatego kolumny „Kto potwierdza”
i „Dowód” są obowiązkowe.

### Wariant B, firma już działa: przegląd wykonania procedur

Zestaw pytań kontrolnych, na które odpowiada się faktami z ostatnich trzech
miesięcy, nie deklaracjami:

- Ile dokumentów odrzucono i czy każde odrzucenie ma wpis w rejestrze odrzuceń?
- Czy zdarzył się brak dostępu do systemu i czy ma kartę zdarzenia z rozpoznanym
  trybem?
- Czy faktury z trybów podlegających przesłaniu (offline24, niedostępność,
  tryb awaryjny) mają nadane numery, a te, które zostały zwolnione z przesłania
  przez ogłoszoną w międzyczasie awarię całkowitą, są w karcie zdarzenia opisane
  jako pozostające bez numeru KSeF wraz z treścią ogłoszenia? Czy faktury
  wystawione w awarii całkowitej zostały prawidłowo pozostawione bez przesłania?
- Czy matryca uprawnień zgadza się ze stanem kadrowym na dziś, łącznie
  z pracownikami biura rachunkowego?
- Czy ktoś odszedł z firmy i czy wykonano wszystkie kroki listy czynności przy
  odejściu osoby, w tym ustalenie typu i właściciela certyfikatu?
- Czy zastępca którejkolwiek czynności wykonał ją realnie choć raz?
- Czy firma ma aktywny certyfikat typu 2, jeśli udostępnia faktury poza systemem
  przed przesłaniem?
- Czy przelewy wychodzące zawierają numer KSeF tam, gdzie jest to wymagane
  (obowiązek od 1 stycznia 2027), i kto to sprawdza?
- Czy któryś kontrahent płaci bez wymaganego numeru i czy ktoś to wyłapuje?
- Czy program został zaktualizowany do struktury FA(3) i kto to potwierdził?
- Czy dokumenty operacyjne mają datę przeglądu, która jeszcze nie minęła?

### Protokół stanu wdrożenia: format wyniku

Wynik zawsze w trzech kubełkach i zawsze z liczbami pozycji:

```
DOMKNIĘTE ([liczba] pozycji)
- ...

BRAKUJE ([liczba] pozycji)
- ... (kto domyka, do kiedy)

DO DECYZJI ([liczba] pozycji)
- ... (kto decyduje, na jakiej podstawie)

POZA ZAKRESEM TEJ SESJI ([liczba] pozycji)
- ... (świadomy wybór zakresu, kiedy wraca do pracy)
```

Czwarty kubełek jest obowiązkowy, gdy użytkownik zamówił część kompletu.
Komponentu, którego nikt nie zamawiał, nie raportuje się jako braku, bo to
sugeruje niedopatrzenie wykonawcy. Piszesz wprost, że pozycja pozostaje poza
zakresem tej sesji, i podajesz, kto i kiedy może ją zamówić.

Pod spodem jedno zdanie, zawsze to samo w duchu: „To jest obraz dokumentacji
i wykonanych prób na dzień [data], a nie ocena zgodności z przepisami ani
gwarancja wyniku kontroli.” Nie wystawiaj procentów, ocen ani świateł
sygnalizacyjnych, bo każda taka forma czyta się jak werdykt.

### Pułapki praktyczne

- **Testy na produkcji.** Najkosztowniejszy błąd planu testów: faktura wystawiona
  „na próbę” zostaje w systemie, a odebrane „testowo” uprawnienie blokuje pracę
  realnej osoby. Kolumna „Środowisko” jest po to, żeby nikt nie musiał tego
  rozstrzygać w biegu.
- **Zmiana programu do fakturowania w trakcie.** Firma migruje i cała
  dokumentacja przestaje pasować: inne komunikaty, inna kolejka offline, inne
  miejsce powiadomień. Wpisz zmianę programu jako zdarzenie wymuszające przegląd
  wszystkich komponentów i powtórzenie planu testów.
- **Testy robił wdrożeniowiec.** Wszystko działa, dopóki próbuje osoba, która
  program zna. Każdą próbę wykonuje osoba, która robi to na co dzień, i to jej
  nazwisko trafia do kolumny.
- **Testy tylko na fakturach idealnych.** Bez celowego odrzucenia, bez próby
  trybu offline24 i bez sprawdzenia certyfikatu typu 2 plan testów sprawdza
  pogodę, nie procedurę.
- **Prośba o werdykt.** „Czyli jesteśmy gotowi?” wraca po każdym protokole.
  Odpowiedź: liczby w kubełkach i zdanie z zasady 2. Za każdym razem.

## 6. Zasady płatności z numerem KSeF

### Pytania wywiadu

1. Czy firma i jej kontrahenci są czynnymi podatnikami VAT? Od tego zaczyna się
   zakres obowiązku, nie od samego faktu wystawienia faktury.
2. Czy firma stosuje mechanizm podzielonej płatności i przy jakich transakcjach?
3. Kto wykonuje przelewy i skąd bierze numer KSeF?
4. Czy przelewy robi się ręcznie, importem z programu, czy w banku z pliku?
5. Czy zdarza się płacenie jednym przelewem za kilka faktur?
6. Kto sprawdza płatności przychodzące i czy ktoś wyłapuje brakujące numery?

### Szablon wyjścia

**Kiedy obowiązek w ogóle powstaje.** Wpisz do dokumentu wprost:

- **Do 31 grudnia 2026 roku obowiązku podawania numeru KSeF w przelewie nie ma**,
  także przy mechanizmie podzielonej płatności. Firma może podawać numer
  dobrowolnie, dla porządku w rozliczeniach, i wtedy zapisuje to jako własną
  praktykę, a nie jako wymóg.
- **Od 1 stycznia 2027 roku** numer KSeF podaje się w tytule płatności, gdy
  spełnione są łącznie przesłanki:
  - płacący jest **czynnym podatnikiem VAT**,
  - odbiorcą płatności jest **inny czynny podatnik VAT**,
  - płatność dotyczy **faktury ustrukturyzowanej** albo faktury z trybu
    offline24 lub z okresu niedostępności, która po przesłaniu otrzymała numer
    KSeF (faktury bez numeru KSeF wskutek awarii całkowitej ten obowiązek nie
    obejmuje, bo nie ma czego podać),
  - płatność następuje **przelewem albo innym instrumentem pozwalającym podać
    tytuł płatności**.
  Zakres obejmuje również mechanizm podzielonej płatności oraz określone
  płatności dokonywane przez osoby trzecie i polecenie zapłaty
  `[WYMAGA WERYFIKACJI: pełny zakres i wyłączenia; źródło:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/]`.
- **Nie pisz „przy każdej płatności”.** Zwrot ten tworzy obowiązek szerszy niż
  rzeczywisty i sprawia, że dokument jest nieprawdziwy w obie strony: przed 2027
  rokiem w ogóle, a po nim co do zakresu.

**Zasady opisywania przelewów wychodzących:**

- Osoba wykonująca przelew ustala, czy dana płatność mieści się w zakresie
  opisanym wyżej; jeśli tak, podaje numer KSeF w tytule.
- **Przy zapłacie jednym przelewem za kilka faktur objętych zakresem osoba
  płacąca podaje identyfikator zbiorczy**, który generuje system dla zbioru
  faktur. Nie jest to numer nadany przez firmę ani numer paczki z programu
  księgowego
  `[WYMAGA WERYFIKACJI: sposób uzyskania identyfikatora zbiorczego; źródło:
  ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/]`.
- Numer bierze się z faktury, nie z pamięci i nie z numeru własnego firmy.
  W dokumencie wskaż konkretne miejsce, z którego osoba płacąca ma go odczytać
  w używanym programie `[UZUPEŁNIJ]`.
- Płatność zaliczki jeszcze nieudokumentowanej fakturą nie ma numeru KSeF do
  podania. Osoba płacąca opisuje taki przelew zgodnie z zasadą firmy i łączy go
  z fakturą po jej wystawieniu; sposób ujęcia rozstrzyga księgowa.

**Zasady dla płatności przychodzących:** kto sprawdza opisy wpłat, co robi, gdy
kontrahent zapłacił bez wymaganego numeru, i w jakiej formie się z nim
kontaktuje.

**Wzory krótkiej wiadomości do kontrahenta** (rejestr rzeczowy, mail służbowy
na zewnątrz, bez straszenia i bez oceniania). Dwa warianty, bo sytuacje są
różne: w pierwszym firma sama przypisała wpłatę do faktury i prosi tylko
o potwierdzenie, w drugim nie wie, czego wpłata dotyczy, więc o numerze
faktury nie może nic napisać.

Wariant A, wpłata przypisana do faktury:

```
Dzień dobry,

dziękujemy za wpłatę z dnia [UZUPEŁNIJ] na kwotę [UZUPEŁNIJ] zł.
W opisie przelewu nie było numeru faktury nadanego w Krajowym Systemie
e-Faktur. Przypisaliśmy wpłatę do faktury [UZUPEŁNIJ: numer własny faktury],
której numer w systemie to [UZUPEŁNIJ: numer KSeF]. Prosimy o krótkie
potwierdzenie, że to właściwa faktura.

Przy kolejnych płatnościach prosimy o podanie numeru z systemu w opisie
przelewu, ułatwi to nam rozliczenie wpłaty.

W razie pytań jestem do dyspozycji.

Pozdrawiam
[UZUPEŁNIJ: imię i nazwisko, firma]
```

Wariant B, wpłaty nie da się przypisać:

```
Dzień dobry,

dziękujemy za wpłatę z dnia [UZUPEŁNIJ] na kwotę [UZUPEŁNIJ] zł.
W opisie przelewu nie było numeru faktury nadanego w Krajowym Systemie
e-Faktur i nie potrafimy przypisać wpłaty do konkretnej faktury. Prosimy
o wskazanie, której faktury dotyczy płatność.

Przy kolejnych płatnościach prosimy o podanie numeru faktury z systemu
w opisie przelewu, ułatwi to nam rozliczenie wpłaty.

W razie pytań jestem do dyspozycji.

Pozdrawiam
[UZUPEŁNIJ: imię i nazwisko, firma]
```

Wiadomość opisuje wyłącznie stan faktyczny i prośbę; nie orzeka o obowiązkach
kontrahenta ani o skutkach ich niedopełnienia, bo to nie jest rola firmy
wystawiającej fakturę.

**Informacja dla kontrahentów** (jednorazowa, do wysłania przy wdrożeniu):
krótka notatka, gdzie na fakturze znajdą numer z systemu i o co firma prosi
w opisie przelewu. Trzy zdania wystarczą, dłuższej nikt nie przeczyta.

### Pułapki praktyczne

- **Wpisanie obowiązku przed czasem.** Dokument twierdzący, że numer KSeF trzeba
  podawać już dziś, tworzy w firmie fałszywy obowiązek i podważa zaufanie do
  reszty procedury. Data to 1 stycznia 2027 i nic wcześniej.
- **Klient płaci bez numeru po 1 stycznia 2027.** Firma nie ma narzędzia, żeby go
  zmusić, i nie jest jej rolą pouczanie kontrahenta o jego obowiązkach.
  Procedura opisuje, kto to zauważa, jak się kontaktuje i jak odnotowuje sprawę.
  Konsekwencje po stronie płacącego to jego sprawa i sprawa jego doradcy.
- **Płatność za kilka faktur bez identyfikatora zbiorczego.** Rozliczenie wpłaty
  robi się ręcznie i mnożą się pomyłki. Zapisz, kto ustala, których faktur
  dotyczy wpłata, i gdzie to notuje.
- **Numer własny firmy zamiast numeru KSeF.** Osoba płacąca wpisuje numer
  z pieczątki albo z programu, bo tak robiła zawsze. W dokumencie pokaż różnicę
  na przykładzie dwóch numerów obok siebie, to jedyny sposób, żeby to zapadło
  w pamięć.
- **Import przelewów z programu.** Jeśli firma wysyła przelewy plikiem, pole
  z numerem musi się w nim znaleźć. To pytanie do dostawcy programu i do banku,
  wpisz je jako punkt do potwierdzenia, nie rozstrzygaj.

## 7. Notatka o kanale urzędowym (odesłanie, nie komponent własny)

Ten komponent jest odesłaniem i celowo nie ma własnego szablonu ról,
częstotliwości ani obowiązków.

Faktury idą jednym kanałem, ale pisma z urzędów idą innym. Firma, która
uporządkowała Krajowy System e-Faktur, a nie ma ustalonego, kto zagląda do
skrzynki do doręczeń elektronicznych, przegapi pismo, nie fakturę.

**Do dokumentu wpisujesz wyłącznie jedno zdanie odesłania**, na przykład:
„Doręczenia elektroniczne prowadzi się osobno; ustawienie skrzynki, obowiązki,
terminy i podział ról w tym obszarze obsługuje skill `e-doreczenia-w-firmie`
z katalogu.”

Nie ustalasz w tym skillu, kto sprawdza korespondencję urzędową, jak często ani
kto go zastępuje, i nie budujesz dla tego tabeli. To jest terytorium skilla
`e-doreczenia-w-firmie` i dublowanie go tutaj tworzy dwa rozjeżdżające się
dokumenty. Na pytania o zakładanie adresu do doręczeń, terminy i skutki
odbierania pism nie odpowiadasz, tylko odsyłasz.

## 8. Lista kontrolna spójności kompletu (krok kontroli ze SKILL.md)

- Czy każda czynność w macierzy odpowiedzialności ma właściciela i zastępcę, bez
  pól pustych i bez „obie strony”?
- Czy karta postępowania wskazuje te same osoby co macierz i czy ktoś ma prawo
  decyzji poza godzinami pracy?
- Czy karta postępowania rozróżnia wszystkie cztery tryby i czy przy awarii
  całkowitej NIE ma kroku przesłania faktur ani oczekiwania na numery?
- Czy przy każdym terminie jest konkretny przykład liczenia daty z dniem
  tygodnia, a przy awarii całkowitej zdanie o braku terminu przesłania?
- Czy dokument rozstrzyga, co się dzieje, gdy termin przesłania wpada w kolejne
  zdarzenie?
- Czy dokument rozstrzyga, co się dzieje z fakturami z offline24 i z okresu
  niedostępności, których przesłania nie zdążono wykonać przed ogłoszeniem
  awarii całkowitej?
- Czy zasady kodów QR są zapisane według trybu, momentu i odbiorcy, a nie jako
  ogólne „dwa kody zawsze”, i czy jest pozycja o certyfikacie typu 2?
- Czy karta zdarzenia zawiera pole rozpoznanego trybu oraz pole „czy tryb wymaga
  przesłania do systemu”?
- Czy matryca uprawnień i certyfikatów pokrywa wszystkie role z macierzy, w tym
  biuro rachunkowe jako uprawnienie bezpośrednie i jego pracowników jako
  pośrednie, i czy uprawnienie właścicielskie NIE ma warunku odebrania?
- Czy matryca rozróżnia certyfikaty typu 1 i typu 2 oraz to, na kogo są
  wystawione?
- Czy opisana jest lista czynności przy odejściu osoby i lista czynności przy
  zmianie biura rachunkowego, w tym skutek przerwania łańcucha uprawnień?
- Czy rejestr odrzuceń ma przypisaną osobę prowadzącą, próg eskalacji, rytm
  przeglądu i rozróżnienie błędu technicznego od dokumentu skutecznie
  wystawionego poza systemem?
- Czy plan testów ma wypełnioną kolumnę „Środowisko” w każdym wierszu, a próby
  odrzucenia i odebrania uprawnień są przypisane do środowiska Demo?
- Czy zasady płatności podają datę 1 stycznia 2027 i przesłanki zakresu, a nie
  „przy każdej płatności”?
- Czy w dokumentach nie ma powielonych danych osobowych ani numerów, których
  procedura nie potrzebuje (numery PESEL, numery rachunków, adresy
  zamieszkania), i czy kontrahenci występują jako oznaczenia?
- Czy każdy dokument ma metryczkę, adnotację PROJEKT, stan prawny, datę
  przeglądu oraz sekcję „Źródła i data sprawdzenia” z konkretnymi adresami?
- Czy wszystkie `[UZUPEŁNIJ]` i `[WYMAGA WERYFIKACJI]` są wypisane na końcu jako
  lista do domknięcia, uporządkowana według pilności względem dzisiejszej daty,
  z przypisaniem kto i do kiedy?

Wynik podawaj w czterech kubełkach (domknięte / brakuje / do decyzji / poza
zakresem tej sesji) z liczbami, nigdy jako werdykt gotowości i nigdy jako
procent.
