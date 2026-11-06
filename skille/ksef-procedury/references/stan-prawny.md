# Stan prawny i źródła (dla asystenta)

**Data stanu prawnego tego pliku: 24 sierpnia 2026.** Jeśli od tej daty minęło
więcej niż 6 miesięcy, ostrzeż użytkownika na starcie pracy i oznaczaj dokumenty
adnotacją o konieczności weryfikacji względem bieżących komunikatów Ministerstwa
Finansów. Krajowy System e-Faktur ma historię przesuwanych terminów i zmienianych
struktur, więc traktuj każdy termin jak wartość do sprawdzenia, nie jak stałą.

## Jak traktować prawo w tym skillu

Reguła pierwsza: **w treści dokumentów dla firmy pisz skutkiem, nie numerem
przepisu.** Zamiast tytułu ustawy i numeru artykułu podaj, co się z czego wynika
(„faktura ustrukturyzowana wysłana do systemu ma za datę wystawienia dzień
przesłania, a tryby szczególne mają własne zasady daty”, „od 1 stycznia 2027
numer KSeF podaje się w opisie przelewu w objętym zakresie”).
Numery artykułów przeciążają dokument operacyjny i starzeją się szybciej niż
opis skutku.

Reguła druga: **każdy dokument dostaje jednak rejestr źródeł.** Na końcu
dokumentu wypisujesz sekcję „Źródła i data sprawdzenia” z konkretnymi adresami
z tabeli poniżej i z datą stanu prawnego. Bez tego płatnego produktu nie da się
zweryfikować ani zaktualizować. Rejestr źródeł to nie to samo co cytowanie
przepisów w treści.

Reguła trzecia: **stan prawny to nie interpretacja podatkowa.** Wolno powiedzieć,
od kiedy obowiązuje wystawianie faktur w systemie. Nie wolno powiedzieć, jaką
stawkę zastosować, czy transakcja podlega opodatkowaniu ani czy przysługuje
odliczenie. Ta granica jest twarda i nie znika przy prośbie „tylko
orientacyjnie”.

Reguła czwarta: **oznaczaj `[WYMAGA WERYFIKACJI: ...; źródło: ...]` to, co jest
zmienne, a nie to, co jest znane.** Nadużycie tego znacznika jest równie szkodliwe
jak jego brak: dokument wygląda na ostrożny, a w chwili awarii nie da się według
niego działać. Poniższa sekcja zawiera fakty, które na dzień wydania są ustalone;
znacznika użyj do wskazania, że mogły się zmienić po tej dacie, a nie do
przerzucenia na użytkownika ustalenia podstaw modelu.

## Fakty przyjęte w tym wydaniu

Zweryfikowano 24 sierpnia 2026 na stronach wymienionych w sekcji „Rejestr źródeł”.
Podając je użytkownikowi, dopisuj adres źródła i datę sprawdzenia.

### Harmonogram i zakres obowiązku wystawiania

- **Od 1 lutego 2026** obowiązek wystawiania faktur w Krajowym Systemie e-Faktur
  obejmuje podatników, u których **wartość sprzedaży wraz z kwotą podatku
  (brutto) za 2024 rok przekroczyła 200 mln zł**. Rok bazowy i wartość brutto są
  częścią reguły: bez nich firma sama sobie przypisze złą datę.
- **Od 1 kwietnia 2026** obowiązek obejmuje pozostałych podatników.
- **Do 31 grudnia 2026 działa wyjątek epizodyczny dla najmniejszej sprzedaży
  fakturowanej.** Liczy się **wartość brutto faktur wystawionych w danym miesiącu**
  (papierowych i elektronicznych poza systemem), a nie ogólny obrót firmy.
  Dopóki w miesiącu suma nie przekracza 10 tys. zł, faktury można wystawiać poza
  systemem. **Obowiązek powstaje od tej faktury, którą limit zostaje
  przekroczony**, a nie od kolejnego miesiąca.
- **Od 1 stycznia 2027 kończy się ten wyjątek epizodyczny.** Nie znaczy to, że
  znikają wszystkie wyłączenia: stałe wyłączenia zostają, w tym faktury dla
  konsumentów oraz określone wyłączenia podmiotowe i przedmiotowe. Nigdy nie pisz
  „od 1 stycznia 2027 obowiązek obejmuje wszystkich”, bo to zdanie jest dosłownie
  fałszywe.
- **Obowiązek odbierania faktur w Krajowym Systemie e-Faktur działa od 1 lutego
  2026** i dotyczy wszystkich podatników, także tych, którzy z wystawianiem
  czekają dłużej. Mała firma korzystająca z wyjątku 10 tys. zł nadal musi
  odbierać faktury zakupowe w systemie. To jedna z najczęściej pomijanych dat
  operacyjnych.
- **Faktury dla nabywców zagranicznych nie są automatycznie poza systemem.**
  Sam zagraniczny nabywca tego nie przesądza: polski wystawca zwykle wystawia
  fakturę w systemie, a nabywcy udostępnia ją w sposób z nim uzgodniony. Zakres
  zależy m.in. od siedziby i stałego miejsca prowadzenia działalności oraz jego
  udziału w transakcji. Nie twórz kategorii „faktury zagraniczne = poza systemem”.
- **Faktury z kas rejestrujących oraz paragony z numerem identyfikacji podatkowej
  uznawane za faktury uproszczone to rozwiązanie przejściowe do końca 2026 roku.**
  Nie wpisuj ich do dokumentu jako trwałej kategorii poza systemem, tylko
  z datą graniczną.

### Sankcje

- Przepisy o karach **stosuje się do naruszeń dokonanych od 1 stycznia 2027 roku**;
  nie działają wstecz i nie obejmują naruszeń z 2026 roku. Formułuj to tak, a nie
  jako „stosowanie jest zawieszone”.
- Katalog naruszeń objętych karą, którym ma zapobiegać procedura: niewystawienie
  faktury w systemie mimo obowiązku; wystawienie faktury w okresie awarii albo
  niedostępności niezgodnie z udostępnionym wzorem; nieprzesłanie w terminie do
  systemu faktury wystawionej w trybie offline24, w trybie awaryjnym albo
  w okresie niedostępności, z zastrzeżeniem faktur, z których obowiązek
  przesłania zdjęła ogłoszona awaria całkowita (patrz sekcja o przejściach
  między trybami).
- Wysokość: do 100% kwoty podatku wykazanego na fakturze, a przy fakturze bez
  wykazanego podatku do 18,7% kwoty należności ogółem.

### Struktura faktury

- **FA(3) obowiązuje od 1 lutego 2026** i zastąpiła FA(2). To nie jest wartość
  nieznana. Do potwierdzenia u dostawcy programu jest gotowość konkretnej wersji
  programu i poprawność walidacji, a nie treść obowiązującego prawa.

### Uprawnienia w systemie

Ten model musi być podawany dokładnie, bo błąd w nim uniemożliwia rzetelny audyt
dostępów.

- **Uprawnienie właścicielskie jest systemowe.** Przypisuje się je podatnikowi
  i wynika z jego numeru identyfikacji podatkowej. **Nie nadaje się go drugiej
  osobie i nie odbiera się go w systemie.** Nie istnieje „druga osoba
  z uprawnieniem właścicielskim”. Można natomiast nadać zaufanej osobie szerokie
  uprawnienie do zarządzania uprawnieniami i do pracy w systemie, i to jest coś
  innego niż uprawnienie właścicielskie.
- Podmiot niebędący osobą fizyczną, który nie dysponuje kwalifikowaną pieczęcią
  elektroniczną, wskazuje pierwszą osobę fizyczną uprawnioną zgłoszeniem ZAW-FA
  `[WYMAGA WERYFIKACJI: tryb i aktualność zgłoszenia ZAW-FA; źródło:
  ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/]`. Uprawnienia takiej
  osoby to nadal uprawnienia nadane, nie uprawnienie właścicielskie.
- **Uprawnienie bezpośrednie nadaje się osobie fizycznej ALBO podmiotowi**
  (na przykład biuru rachunkowemu). Zakresy obejmują m.in. wystawianie faktur,
  dostęp do faktur i zarządzanie uprawnieniami `[WYMAGA WERYFIKACJI: pełna lista
  zakresów i ich nazwy na ekranie; źródło:
  ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/]`.
- **Uprawnienie pośrednie opisuje łańcuch, a nie osobny zakres.** Powstaje wtedy,
  gdy podmiot, który sam ma uprawnienie bezpośrednie z prawem dalszego
  przekazywania, nadaje uprawnienie własnemu pracownikowi do pracy u swojego
  klienta.
- **Model biura rachunkowego, w tej kolejności:** klient nadaje biuru jako
  podmiotowi uprawnionemu **uprawnienie BEZPOŚREDNIE** do wystawiania i/lub
  dostępu, opcjonalnie z prawem dalszego przekazywania. Dopiero biuro nadaje
  swoim pracownikom **uprawnienia POŚREDNIE** do jednego, wybranych albo
  wszystkich swoich klientów. Odwrócenie tej kolejności (biuro jako „uprawnienie
  pośrednie od klienta”) jest błędem i uniemożliwia audyt dostępów.
- **Przerwanie łańcucha.** Odebranie uprawnienia biuru dezaktywuje możliwość
  pracy jego pracowników dla tego klienta, chociaż ich uprawnienia pośrednie
  pozostają zapisane w systemie. To pułapka przy zmianie biura: firma widzi
  „odebrane biuru” i nie sprawdza, którzy konkretni pracownicy biura tracą przez
  to dostęp ani co zostaje w rejestrze.
- Bezpośrednie i pośrednie opisują **sposób nadania**, właścicielskie opisuje
  **źródło uprawnienia**. Nie są trzema równorzędnymi pozycjami z jednej listy
  i nie wolno ich tak zestawiać w tabeli.

### Gdzie zarządza się uprawnieniami i certyfikatami

- **Moduł Certyfikatów i Uprawnień uruchomiono 1 listopada 2025 jako moduł
  przygotowawczy** przed startem KSeF 2.0. To fakt historyczny.
- **Od 1 lutego 2026 uprawnieniami i certyfikatami zarządza się w Aplikacji
  Podatnika KSeF 2.0 oraz przez API KSeF 2.0**, czyli także w programach
  zintegrowanych; odrębna strona modułu przestała być odrębnym miejscem pracy
  `[WYMAGA WERYFIKACJI: aktualne kanały zarządzania; źródło:
  ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/]`.
- Nie kieruj więc użytkownika „do MCU”. Kieruj do Aplikacji Podatnika KSeF 2.0
  albo do programu zintegrowanego przez API, w zależności od tego, jak firma
  pracuje.

### Certyfikaty KSeF

- **Certyfikat typu 1** służy do uwierzytelniania w systemie.
- **Certyfikat typu 2** służy do utworzenia KODU II na wizualizacji faktury
  z trybu offline udostępnianej poza systemem PRZED jej przesłaniem (czyli tam,
  gdzie obowiązuje reguła dwóch kodów). Po przesłaniu faktury wystarcza KOD I
  z numerem KSeF. Bez certyfikatu typu 2 firma nie wystawi prawidłowej
  wizualizacji w sytuacjach objętych regułą dwóch kodów, nawet jeśli
  „ma certyfikat”.
- **Operacje wykonuje się wyłącznie na własnych certyfikatach.** Firma nie
  unieważni certyfikatu wydanego na numer PESEL innej osoby. Może odebrać tej
  osobie uprawnienia i zażądać, by właściciel unieważnił własny certyfikat.
  Certyfikat wydany na numer identyfikacji podatkowej podmiotu unieważnia osoba
  uprawniona po stronie podmiotu, ale wtedy trzeba najpierw ustalić, komu był
  udostępniony i co przestanie działać po unieważnieniu.
- Certyfikaty mają okres ważności `[WYMAGA WERYFIKACJI: okresy ważności i tryb
  odnowienia; źródło: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/]`.

### Cztery tryby pracy bez dostępu do systemu

Nazwy poniżej są kanoniczne dla całego pakietu. Używaj ich dosłownie, bez
wariantów opisowych.

1. **Tryb offline24.** Dobrowolny, decyzja wystawcy, bez żadnego ogłoszenia.
   Fakturę wystawia się według struktury FA(3), w postaci elektronicznej,
   i przesyła do systemu nie później niż następnego dnia roboczego po dniu
   wystawienia. Ustawa nie ogranicza kręgu podatników ani częstotliwości
   korzystania z tego trybu.
2. **Tryb offline przy niedostępności KSeF.** Niedostępność ogłasza Ministerstwo
   Finansów **w Biuletynie Informacji Publicznej Ministerstwa Finansów oraz
   w oprogramowaniu interfejsowym**. Faktury przesyła się do systemu następnego
   dnia roboczego po zakończeniu okresu niedostępności.
3. **Tryb awaryjny przy awarii KSeF.** Awarię ogłasza Ministerstwo Finansów
   w Biuletynie Informacji Publicznej Ministerstwa Finansów oraz w oprogramowaniu
   interfejsowym. Faktury przesyła się w terminie 7 dni roboczych od zakończenia
   awarii.
4. **Awaria całkowita KSeF.** Ogłaszana odrębnie, w środkach społecznego przekazu
   `[WYMAGA WERYFIKACJI: kanał ogłoszenia awarii całkowitej; źródło:
   ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]`.
   **Faktury wystawia się poza systemem, bez obowiązku stosowania struktury
   FA(3), i NIE przesyła się ich później do systemu. Faktury z tego trybu nie
   otrzymują numeru KSeF.** To jest jedyny z czterech trybów, w którym nie ma
   późniejszego dosłania, więc trzeba go wyłączyć z każdego wspólnego kroku
   „po powrocie systemu wyślij wszystko i sprawdź numery”.

**Przejścia między trybami.** Jeśli termin przesłania faktury z trybu offline24
albo z okresu niedostępności przypada w czasie ogłoszonej awarii, obowiązuje
reguła terminu trybu ogłoszonego w tym momencie, a nie pierwotna
`[WYMAGA WERYFIKACJI: sposób liczenia terminu przy nakładających się trybach;
źródło: ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/]`.
**Awaria całkowita zdejmuje obowiązek przesłania także z faktur wystawionych
wcześniej:** faktury wystawionej w trybie offline24 przed ogłoszeniem awarii
całkowitej, a jeszcze nieprzesłanej, NIE przesyła się do systemu; tak samo
faktury z okresu niedostępności, której termin przesłania zbiega się z awarią
całkowitą. Takie faktury pozostają bez numeru KSeF, co trzeba odnotować
w karcie zdarzenia (a jeśli dokument trafił wcześniej do rejestru odrzuceń,
domknąć tam wpis adnotacją o zwolnieniu z przesłania) i uwzględnić przy
zasadach płatności. To jest realny scenariusz, nie egzotyka, i procedura
firmy musi go rozstrzygać wprost.

### Kody QR na wizualizacjach

- **KOD I** umożliwia dostęp do faktury w systemie i weryfikację jej danych.
- **KOD II** potwierdza aktywność certyfikatu wystawcy i jego uprawnienie do
  wystawienia faktury w imieniu podatnika. **Do jego utworzenia potrzebny jest
  certyfikat KSeF typu 2.**
- **Ile kodów, według trybu, momentu i odbiorcy:**
  - faktura **już przesłana** do systemu, wizualizacja udostępniana poza systemem:
    **jeden kod (KOD I) z numerem KSeF**;
  - faktura z trybu offline24 albo z okresu niedostępności, udostępniana poza
    systemem **przed przesłaniem** do systemu odbiorcy uprawnionemu do tego
    ustawowo: **dwa kody**;
  - faktura z trybu awaryjnego udostępniana poza systemem **przed przesłaniem**
    do systemu: **dwa kody** (po przesłaniu wizualizacja ma już jeden KOD I
    z numerem KSeF);
  - **awaria całkowita: struktura FA(3) nie obowiązuje, więc reguła dwóch kodów
    nie ma zastosowania**;
  - krajowy nabywca z numerem identyfikacji podatkowej w trybie offline24 albo
    przy niedostępności co do zasady odbiera fakturę w systemie po jej przesłaniu;
    przed przesłaniem można mu wydać potwierdzenie transakcji, a nie dowolną
    wizualizację faktury.
- Nigdy nie pisz reguły „każda faktura wystawiona poza systemem wymaga dwóch
  kodów”. Jest za szeroka i prowadzi do uznania prawidłowej faktury z jednym
  kodem za wadliwą.

### Numer KSeF i identyfikator zbiorczy w płatnościach

- **Obowiązek zaczyna się 1 stycznia 2027 roku. Wcześniej go nie ma, także przy
  mechanizmie podzielonej płatności.** Data 1 sierpnia 2026 nie występuje w tym
  obszarze i nie wolno jej wpisywać do żadnego dokumentu.
- Zakres od 1 stycznia 2027: nabywca będący **czynnym podatnikiem VAT**, płacący
  **innemu czynnemu podatnikowi VAT** za fakturę ustrukturyzowaną albo za
  fakturę z trybu offline24 lub z okresu niedostępności, która po przesłaniu
  otrzymała numer KSeF (faktur pozostających bez numeru wskutek awarii
  całkowitej obowiązek nie obejmuje), **przelewem albo innym
  instrumentem pozwalającym podać tytuł płatności**, podaje w tytule numer KSeF.
  Obejmuje to również mechanizm podzielonej płatności oraz określone płatności
  dokonywane przez osoby trzecie i polecenie zapłaty.
- Nie obejmuje więc dosłownie każdej płatności, każdego nabywcy ani każdej
  faktury. Zwrot „przy każdej płatności” w dokumencie firmy jest błędem.
- **Identyfikator zbiorczy generuje system** dla zbioru faktur i stosuje się go
  przy płatności za więcej niż jedną fakturę objętą tym zakresem. Nie jest to
  dowolny identyfikator wymyślony przez firmę ani numer paczki z programu
  księgowego.
- Płatność zaliczki jeszcze nieudokumentowanej fakturą nie ma numeru KSeF do
  podania, bo faktura jeszcze nie powstała.

### Odrzucenie pliku przez system

- Dokument odrzucony przez system **w Krajowym Systemie e-Faktur nie
  istnieje**: nie ma numeru KSeF, nie jest dostępny dla nabywcy w systemie i nie
  posługuje się nim jako fakturą ustrukturyzowaną. Odrzucenie jest zdarzeniem
  wymagającym reakcji, nie usterką informatyczną do zignorowania.
- **Nie wolno z braku numeru KSeF wyprowadzać wniosku, że „faktury nie ma” ani że
  „płatność jest bez podstawy”.** Dokument wystawiony poza systemem może nadal być
  fakturą w rozumieniu przepisów o podatku od towarów i usług, jeśli spełnia
  przesłanki materialne. Ocena tego należy do księgowej albo doradcy podatkowego,
  nie do tego skilla i nie do procedury.
- Przed reakcją rozdziel dwie sytuacje: **błąd techniczny** przy wysyłce pliku
  (poprawia się plik i wysyła ponownie) oraz **dokument już skutecznie wystawiony
  poza systemem** (tu zmiana danych może wymagać korekty, a nie nadpisania pliku).
  Nigdy nie instruuj „popraw i wyślij ponownie” bez tego rozróżnienia.
- **Data wystawienia po poprawieniu i ponownym przesłaniu.** Dokument odrzucony
  nie ma daty wystawienia nadanej przez system. Po poprawieniu i skutecznym
  przesłaniu faktura ustrukturyzowana ma za datę wystawienia dzień przesłania
  do systemu, a tryby szczególne mają własne zasady daty `[WYMAGA WERYFIKACJI:
  zasada daty wystawienia przy ponownym przesłaniu w konkretnym trybie; źródło:
  ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/]`. Tę datę wpisuje się do
  rejestru odrzuceń w kolumnie „Data wystawienia po przyjęciu”; ujęcie
  w rozliczeniu miesiąca rozstrzyga księgowa.

### Przechowywanie faktur w systemie i poza nim

- Faktury przyjęte do KSeF są w nim przechowywane przez 10 lat od końca roku
  wystawienia; jeżeli zobowiązanie podatkowe nie przedawniło się do końca tego
  okresu, firma zapewnia dalsze przechowywanie poza systemem.
- Przechowywanie w systemie nie obejmuje faktur pozostających poza KSeF, w tym
  wystawionych w awarii całkowitej i niedosyłanych do systemu. Procedura
  wskazuje właściciela i miejsce archiwum takich faktur oraz osobę, która przed
  upływem okresu przechowywania w systemie sprawdza potrzebę zachowania faktur
  poza nim `[stan na 6.11.2026; sprawdź okres w aktualnym tekście ustawy
  o podatku od towarów i usług]`.

## Katalog wartości oznaczanych do weryfikacji

Poniższe zmieniają się najczęściej i zawsze idą ze znacznikiem
`[WYMAGA WERYFIKACJI: ...; źródło: ...]` z adresem z rejestru źródeł:

- daty wejścia obowiązków, progi kwotowe i sposób liczenia limitu miesięcznego;
- sposób liczenia terminów (dni robocze, początek biegu, wpływ świąt);
- kanały ogłaszania niedostępności, awarii i awarii całkowitej oraz ich adresy;
- pełne listy zakresów uprawnień i ich nazwy widoczne na ekranie;
- okresy ważności certyfikatów i tryb ich odnowienia oraz unieważnienia;
- zasady dołączania załączników do faktury i limity techniczne;
- okresy przechowywania faktur w systemie i obowiązki archiwalne firmy poza nim;
- zachowanie konkretnego programu do fakturowania w każdej z tych sytuacji.

**Czego NIE oznaczasz jako brak wiedzy** (bo jest ustalone i opisane wyżej):
skutków czterech trybów, w tym braku dosłania przy awarii całkowitej; reguły
jednego i dwóch kodów oraz wymogu certyfikatu typu 2; modelu uprawnień
właścicielskich, bezpośrednich i pośrednich oraz roli biura; daty obowiązywania
FA(3); daty 1 stycznia 2027 dla płatności. U dostawcy programu potwierdza się
implementację w programie, a nie treść prawa.

## Rejestr źródeł (adresy do wpisywania w dokumentach)

Podawaj konkretny adres, nie samą domenę, wraz z datą sprawdzenia. Adresów spoza
tej tabeli nie zmyślaj: jeśli dokument potrzebuje adresu, którego tu nie ma,
zostaw `[UZUPEŁNIJ: adres do zapisania przy wdrożeniu]`.

| Temat | Adres | Sprawdzono |
|---|---|---|
| Harmonogram, odbieranie faktur, limit 10 tys. zł, wyłączenia | ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/ | 24 sierpnia 2026 |
| Sankcje, katalog naruszeń, okres przejściowy, przechowywanie | ksef.podatki.gov.pl/ksef-news/zasady-obowiazywania-ksef-i-przepisy-prawne/ | 24 sierpnia 2026 |
| Okres przechowywania faktur w systemie i dalsze przechowywanie poza nim (ustawa o podatku od towarów i usług, art. 112, 112a, 112aa, brzmienie z 16.10.2026) | api.sejm.gov.pl/eli/acts/DU/2004/535/text/U/D20040535Lj.pdf | 6 listopada 2026 (przegląd panelu) |
| Pytania i odpowiedzi, status dokumentu wystawionego poza systemem | ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ | 24 sierpnia 2026 |
| Cztery tryby szczególne i ich skutki | ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/ | 24 sierpnia 2026 |
| Tryb offline24: warunki, termin, udostępnianie faktury | ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/ | 24 sierpnia 2026 |
| Kody QR: KOD I, KOD II, jeden albo dwa kody | ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/ | 24 sierpnia 2026 |
| Uprawnienia, certyfikaty, biuro jako podmiot uprawniony | ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/ | 24 sierpnia 2026 |
| Certyfikaty KSeF, typ 1 i typ 2 | ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/ | 24 sierpnia 2026 |
| Numer KSeF i identyfikator zbiorczy w płatnościach | ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/ | 24 sierpnia 2026 |
| Struktura logiczna FA(3) | ksef.podatki.gov.pl/informacje-ogolne-ksef-20/struktura-logiczna-fa-3/ | 24 sierpnia 2026 |
| Ogłoszenia o awarii i niedostępności | Biuletyn Informacji Publicznej Ministerstwa Finansów `[UZUPEŁNIJ: dokładny adres zapisany przy wdrożeniu]` | 24 sierpnia 2026 |
| Zachowanie programu do fakturowania | dostawca programu, kanał wsparcia `[UZUPEŁNIJ]` | nie dotyczy |

Adres Biuletynu Informacji Publicznej i adres kanału wsparcia dostawcy każ firmie
zapisać w procedurze przy wdrożeniu. W chwili awarii nikt nie będzie ich szukał.

Uwaga do adresu z nazwą „modul-certyfikatow-i-uprawnien-mcu”: to strona
informacyjna Ministerstwa Finansów, której adres zachował dawną nazwę modułu
przygotowawczego. Służy do weryfikacji treści o uprawnieniach i certyfikatach,
nie jest panelem operacyjnym podatnika. Operacje wykonuje się w Aplikacji
Podatnika KSeF 2.0 albo w programie zintegrowanym przez API.

## Fakty stabilne, które wolno przywoływać bez zastrzeżenia

- Istnieje Krajowy System e-Faktur prowadzony przez Ministerstwo Finansów;
  faktura ustrukturyzowana ma określony format i po przyjęciu dostaje nadany
  przez system numer.
- Uprawnienia do działania w systemie nadaje się osobom fizycznym i podmiotom;
  bez nadanego uprawnienia nikt nie wystawi ani nie pobierze faktury.
- Przewidziane są tryby pracy na wypadek braku dostępu do systemu; w trzech
  z czterech faktury trzeba przesłać do systemu w wyznaczonym terminie,
  a w awarii całkowitej nie.
- Biuro rachunkowe może działać w systemie w imieniu klienta po nadaniu mu
  uprawnienia; samo podpisanie umowy o księgowość takiego uprawnienia nie tworzy.

## Czego ten plik nie robi

Nie jest streszczeniem przepisów o Krajowym Systemie e-Faktur i nie zastępuje
serwisu Ministerstwa Finansów. Służy dyscyplinie asystenta: co wolno powiedzieć
wprost, co idzie ze znacznikiem, jaki adres wpisać i gdzie odesłać użytkownika po
rozstrzygnięcie.
