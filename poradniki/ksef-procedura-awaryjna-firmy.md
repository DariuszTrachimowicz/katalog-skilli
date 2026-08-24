---
tytul: Co musi zawierać firmowa procedura KSeF
opis: Składniki firmowej procedury KSeF: role, karta czterech trybów, matryca uprawnień, rejestr odrzuceń, zasady płatności od 2027 i protokół wdrożenia.
zajawka: Z czego składa się procedura KSeF, która działa w dniu awarii, i dlaczego pobrany wzór zwykle zawodzi.
data: 2026-08-24
dataSlownie: 24 sierpnia 2026
temat: KSeF
skill: ksef-procedury
kolejnosc: 9
---

Firma pobiera wzór procedury KSeF, wpisuje swoją nazwę i odkłada plik do segregatora. Cztery miesiące później system jest niedostępny, ktoś otwiera ten plik i okazuje się, że nie odpowiada on na żadne z pytań, które właśnie padły. Poniżej lista składników, bez których procedura jest dokumentem do pokazania, a nie do użycia.

## Dlaczego wzór z internetu się wywraca

Wzór opisuje system, a procedura ma opisywać firmę. Trzy rzeczy, których żaden wzór nie zna, rozstrzygają w praktyce wszystko: kto u was podejmuje decyzje, jak zachowuje się wasz program i jak podzieliliście się pracą z biurem rachunkowym.

Do tego dochodzi wada powtarzana w większości krążących szablonów: wspólny krok „po powrocie systemu wyślij wszystko i sprawdź numery”. Jest fałszywy dla jednego z czterech trybów i akurat dla tego, który zaskakuje najbardziej.

## Macierz ról: firma i biuro rachunkowe

Pierwszy składnik to podział pracy, spisany imiennie, nie stanowiskowo. Dla każdej czynności jedna kolumna wskazuje wykonawcę po stronie firmy, druga po stronie biura rachunkowego, trzecia zastępstwo.

Czynności, które muszą się w tej macierzy znaleźć: decyzja o wystawianiu w trybie offline24, sprawdzanie ogłoszeń o niedostępności i awarii, przesyłanie faktur po powrocie systemu, obsługa odrzuceń, nadawanie i odbieranie uprawnień, pilnowanie ważności certyfikatów. Bez zastępstw macierz działa do pierwszego urlopu.

Warto zapisać wprost: samo podpisanie umowy o księgowość nie tworzy uprawnienia do działania w systemie. Biuro działa w imieniu klienta dopiero po nadaniu mu uprawnienia.

## Karta postępowania na cztery tryby

Drugi składnik i serce całego dokumentu. Cztery tryby mają różne skutki, więc muszą mieć osobne ścieżki.

- **Tryb offline24.** Dobrowolny, decyzja wystawcy, bez ogłoszenia. Faktura według struktury FA(3), w postaci elektronicznej, przesłana do systemu nie później niż następnego dnia roboczego po dniu wystawienia.
- **Tryb offline przy niedostępności KSeF.** Niedostępność ogłasza Ministerstwo Finansów w Biuletynie Informacji Publicznej Ministerstwa Finansów oraz w oprogramowaniu interfejsowym. Przesłanie następnego dnia roboczego po zakończeniu okresu niedostępności.
- **Tryb awaryjny przy awarii KSeF.** Awarię ogłasza Ministerstwo Finansów tymi samymi kanałami. Przesłanie w terminie 7 dni roboczych od zakończenia awarii.
- **Awaria całkowita KSeF.** Ogłaszana odrębnie. Faktury poza systemem, bez obowiązku stosowania struktury FA(3), bez późniejszego przesyłania do systemu i bez numeru KSeF.

Do każdej ścieżki dopisuje się przykład liczenia terminu, na konkretnych dniach tygodnia. Firma Transportowa Kalina wystawia fakturę w trybie offline24 w piątek o osiemnastej: termin przesłania przypada w poniedziałek. Okres niedostępności kończy się w sobotę wieczorem: przesyła się w poniedziałek. Sam sposób liczenia dni roboczych, początek biegu terminu i wpływ świąt sprawdź na ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/ i zapisz wynik w procedurze.

Karta musi też rozstrzygać dwie sytuacje graniczne. Pierwsza: termin przesłania z trybu offline24 albo z okresu niedostępności przypada w czasie ogłoszonej awarii; obowiązuje wtedy reguła terminu trybu ogłoszonego w tym momencie. Druga: awaria całkowita zdejmuje obowiązek przesłania także z faktur wystawionych wcześniej i jeszcze nieprzesłanych. Takie faktury zostają bez numeru KSeF i wymagają adnotacji w karcie zdarzenia.

## Matryca uprawnień

Trzeci składnik. Musi być zbudowana poprawnie, bo błąd w modelu uniemożliwia audyt dostępów.

Uprawnienie właścicielskie jest systemowe. Przypisuje się je podatnikowi i wynika z jego numeru identyfikacji podatkowej. Nie nadaje się go drugiej osobie i nie odbiera się go w systemie; nie istnieje „druga osoba z uprawnieniem właścicielskim”. Można natomiast nadać zaufanej osobie szerokie uprawnienie do zarządzania uprawnieniami i do pracy w systemie, a to jest co innego.

Uprawnienie bezpośrednie nadaje się osobie fizycznej albo podmiotowi, na przykład biuru rachunkowemu. Uprawnienie pośrednie opisuje łańcuch: powstaje, gdy podmiot mający uprawnienie bezpośrednie z prawem dalszego przekazywania nadaje uprawnienie własnemu pracownikowi do pracy u swojego klienta.

Kolejność w modelu biura rachunkowego jest sztywna: najpierw klient nadaje biuru jako podmiotowi uprawnienie bezpośrednie, opcjonalnie z prawem dalszego przekazywania, a dopiero potem biuro nadaje swoim pracownikom uprawnienia pośrednie. Odwrócenie tej kolejności to typowy błąd, który psuje późniejszy audyt.

W matrycy trzeba opisać też przerwanie łańcucha. Odebranie uprawnienia biuru dezaktywuje możliwość pracy jego pracowników dla tego klienta, ale ich uprawnienia pośrednie pozostają zapisane w systemie. Przy zmianie biura firma widzi „odebrane” i nie sprawdza, którzy konkretni pracownicy tracą dostęp ani co zostaje w rejestrze.

Uwaga formalna: bezpośrednie i pośrednie opisują sposób nadania, właścicielskie opisuje źródło uprawnienia. To nie są trzy równorzędne pozycje jednej listy i nie należy ich tak zestawiać. Uprawnieniami i certyfikatami zarządza się w Aplikacji Podatnika KSeF 2.0 oraz przez API KSeF 2.0, czyli także w programach zintegrowanych. Tryb pierwszego zgłoszenia osoby uprawnionej w podmiocie niebędącym osobą fizyczną sprawdź na ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/.

## Rejestr odrzuceń

Czwarty składnik. Dokument odrzucony przez system w Krajowym Systemie e-Faktur nie istnieje: nie ma numeru KSeF i nie jest dostępny dla nabywcy w systemie. Rejestr odpowiada po miesiącu na pytanie, co się z nim stało.

Kolumny, które muszą być: data i godzina odrzucenia, dokument i kontrahent, komunikat z programu, ustalenie czy to błąd techniczny przy wysyłce, czy dokument już skutecznie wystawiony poza systemem, podjęta czynność, data skutecznego przesłania, numer KSeF oraz data wystawienia po przyjęciu. Ostatnia kolumna jest tą, o którą pyta księgowa na przełomie miesiąca.

## Zasady płatności od 2027 roku

Piąty składnik, pisany z datą i z zakresem. Obowiązek podawania numeru KSeF w tytule płatności zaczyna się 1 stycznia 2027 roku. Wcześniej go nie ma, także przy mechanizmie podzielonej płatności.

Zakres jest węższy, niż sugeruje potoczne „przy każdej płatności”. Dotyczy nabywcy będącego czynnym podatnikiem VAT, płacącego innemu czynnemu podatnikowi VAT za fakturę ustrukturyzowaną albo za fakturę z trybu offline24 lub z okresu niedostępności, która po przesłaniu otrzymała numer KSeF, przelewem albo innym instrumentem pozwalającym podać tytuł płatności. Obejmuje to również mechanizm podzielonej płatności oraz określone płatności dokonywane przez osoby trzecie i polecenie zapłaty. Faktur pozostających bez numeru wskutek awarii całkowitej obowiązek nie obejmuje.

Do tego dwie uwagi praktyczne: identyfikator zbiorczy generuje system dla zbioru faktur i nie jest to numer paczki z programu księgowego, a płatność zaliczki jeszcze nieudokumentowanej fakturą nie ma numeru KSeF do podania.

## Protokół stanu wdrożenia

Szósty składnik, jedyny dający obraz całości. Ma formę listy „domknięte” i „brakuje”, z datą sprawdzenia i osobą odpowiedzialną przy każdej pozycji. Nie ma formy werdyktu w rodzaju „firma jest zgodna”: takiego zdania nie postawi ani wzór, ani program, a jego obecność usypia czujność.

## Co z tym zrobić w firmie

- Zacznij od macierzy ról z imionami i zastępstwami; reszta bez niej pozostaje teorią.
- Zapisz w procedurze adres Biuletynu Informacji Publicznej Ministerstwa Finansów i kanał wsparcia dostawcy programu, zanim będą potrzebne.
- Sprawdź swoją matrycę uprawnień pod kątem kolejności nadań w relacji z biurem rachunkowym.
- Wyznacz datę przeglądu procedury przed 1 stycznia 2027 roku, ze względu na zasady płatności.
- Potwierdź u dostawcy programu zachowanie w każdym z czterech trybów, zamiast zakładać je z opisu systemu.

Złożenie tych sześciu składników w jeden spójny dokument z rolami, terminami i rejestrami to osobna praca, którą porządkuje się procedurą.

## Źródła i data sprawdzenia

- Cztery tryby szczególne, przejścia między trybami, liczenie terminów: ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/ (sprawdzono 24 sierpnia 2026)
- Tryb offline24: warunki, termin, udostępnianie faktury: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/ (sprawdzono 24 sierpnia 2026)
- Uprawnienia, certyfikaty, biuro jako podmiot uprawniony: ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/ (sprawdzono 24 sierpnia 2026)
- Numer KSeF i identyfikator zbiorczy w płatnościach: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/ (sprawdzono 24 sierpnia 2026)
- Odrzucenie pliku i status dokumentu wystawionego poza systemem: ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/ (sprawdzono 24 sierpnia 2026)
- Ogłoszenia o awarii i niedostępności: Biuletyn Informacji Publicznej Ministerstwa Finansów (sprawdzono 24 sierpnia 2026)
