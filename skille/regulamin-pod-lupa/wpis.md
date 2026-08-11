---
nazwa: Regulamin pod lupą
kategoria: Prawo
status: gotowy
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Czyta regulamin, na który masz się zgodzić, i mówi po ludzku, na co się zgadzasz — od zmian cennika po to, co dzieje się z Twoimi danymi i treściami.
szukaj: regulamin, warunki korzystania, terms of service, subskrypcja, abonament, rezygnacja, automatyczne przedłużenie, polityka prywatności, konto, dane osobowe, sklep internetowy, aplikacja
tytulSeo: Co akceptujesz, klikając „Akceptuję regulamin” — sprawdź po polsku
opisSeo: Wklej regulamin sklepu, aplikacji albo subskrypcji i zobacz po ludzku, co firma może zmienić sama, co z Twoimi danymi, jak zrezygnować i kiedy się odnawia.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: brak
---

## Co robi

Czyta regulamin, na który masz się zgodzić — sklepu, aplikacji, platformy, narzędzia w chmurze, subskrypcji — i tłumaczy prostym językiem, na co właściwie klikasz „Akceptuję”. Pięć zdań na wejściu: co firma może zmienić sama, co dzieje się z Twoimi danymi i treściami, jak wyjść z umowy, ile to kosztuje i kiedy odnawia się automatycznie, gdzie zgłasza się reklamację.

Osobno wyciąga daty i liczby do kalendarza — termin rezygnacji, dzień odnowienia, cenę po odnowieniu. To zwykle najcenniejsze pięć wierszy całej analizy.

Działa też na maila „zmieniamy regulamin”: mówi, co się zmienia, od kiedy, co się stanie, jeśli nic nie zrobisz, i do kiedy możesz odejść.

## Dla kogo

Osoby i firmy, które podpisują regulaminy usług: właściciele małych firm kupujący narzędzia na abonament, freelancerzy publikujący pracę na platformach, kierownicy biur wybierający dostawcę, kadrowe i księgowe wgrywające do systemów dane innych ludzi. I każdy, kto właśnie zobaczył na koncie obciążenie za usługę, którą uważał za zakończoną.

## Ile Ci to oszczędza

Regulamin subskrypcji ma zwykle 10–20 stron i odsyła do dwóch–trzech innych dokumentów: cennika, polityki prywatności, regulaminu promocji. Przeczytanie tego ze zrozumieniem to 40–60 minut i tak zwykle umyka najdroższy zapis, bo jest jednym zdaniem w środku rozdziału o płatnościach.

Skill robi to w kilka minut i kończy tabelą dat, które trzeba wpisać do kalendarza. Nie zastępuje prawnika ani rzecznika konsumentów — sprawia, że wiesz, o co ich zapytać, i że pytasz przed terminem, a nie po nim.

## Przykład z życia

Marek prowadzi pracownię projektową na jednoosobowej działalności i pracuje z jednym stałym podwykonawcą. 12 kwietnia kupuje roczny dostęp do narzędzia do zarządzania projektami — 79 zł miesięcznie, płatne z góry, 948 zł za rok. Wkleja regulamin razem z cennikiem.

Skill pokazuje cztery rzeczy. Umowa odnawia się sama na kolejny rok, a rezygnację przyjmują najpóźniej 30 dni przed końcem okresu — okres kończy się 11 kwietnia, więc Marek wpisuje w kalendarz 12 marca. Cena promocyjna dotyczy tylko pierwszego roku; cennikowa to 119 zł miesięcznie, czyli 1 428 zł, o 480 zł więcej. Usunięcie konta w panelu nie kończy subskrypcji, bo to dwie osobne czynności. A ponieważ narzędzie do prowadzenia projektów jest w pracowni Marka sprzętem do pracy, a nie zakupem obok jego zawodu, rozdział „Postanowienia dotyczące Przedsiębiorców” wyłącza wobec niego część uprawnień, które regulamin daje klientom prywatnym — o tym rozstrzyga charakter zakupu, nie NIP na fakturze.

Marek zostaje przy narzędziu. Ale ustawia przypomnienie i wie, że w marcu podejmuje decyzję o kwocie 1 428 zł, a nie o 79 zł.

## Jak po polsku

Zbudowany pod polskie realia, nie przetłumaczony z angielskiego poradnika. Skill wie, że w polskich regulaminach najważniejsze rzeczy siedzą w rozdziale „Postanowienia dotyczące Przedsiębiorców”, i że o uprawnieniach osoby na jednoosobowej działalności decyduje to, czy zakup wiąże się z jej zawodem — a nie NIP wpisany na fakturze. Sprawdza, czy dokument w ogóle przewiduje przedsiębiorcę kupującego poza swoją specjalnością.

Zna checkbox „chcę mieć dostęp od razu”, który przy kursach i e-bookach zamyka drogę do zwrotu — i wie, że przy abonamencie na narzędzie to samo kliknięcie działa inaczej. Wie, jak wyglądają zapisy o automatycznym przedłużeniu w umowach na internet, telefon i telewizję i czego w nich szukać. Rozpoznaje odesłanie do unijnej platformy ODR — wygaszonej w połowie 2025 roku — jako sygnał, że regulaminu nikt od tego czasu nie przeglądał. Na koniec kieruje tam, gdzie w Polsce naprawdę można zapytać za darmo: do miejskiego lub powiatowego rzecznika konsumentów.

## Czego potrzebujesz

Dowolny płatny plan Claude i regulamin — wklejony jako tekst, w PDF albo w Wordzie. Jeśli masz też cennik i politykę prywatności, dorzuć je od razu; bez nich analiza obejmuje tylko część umowy i skill to zaznaczy. Żadnych konektorów ani konfiguracji.

## Na czym się wywala

- **Regulamin to zwykle rodzina dokumentów.** Cennik, polityka prywatności, regulaminy promocji, warunki licencji. Skill przeczyta to, co dostanie, a brakujące dokumenty wypisze — ale nie zgadnie, co w nich było.
- **Nie sprawdzi, jak firma zachowuje się naprawdę.** Z tekstu nie widać, czy rezygnacja przez formularz faktycznie działa, czy dane znikają po deklarowanym terminie i ile trwa odpowiedź na reklamację.
- **Widzi jedną wersję, z jednego dnia.** Regulaminy zmieniają się w tle. Jeśli nie dostanie poprzedniej wersji, nie porówna — powie, że porównanie jest niemożliwe, zamiast wymyślać, co było wcześniej.
- **Nie orzeka, czy zapis jest niedozwolony.** Może najwyżej powiedzieć, że zapisy tego rodzaju bywają kwestionowane i że to pytanie do rzecznika konsumentów. Rozstrzyga się to w konkretnej sprawie, nie z lektury tekstu.
- **Bardzo długie regulaminy dużych platform** odsyłają do kilkunastu dokumentów zewnętrznych. Skill przejdzie przez to, co ma, a resztę odnotuje jako nieprzeczytane — zamiast udawać, że objął całość.

## Czego ten skill nie robi celowo

Nie pisze regulaminów ani polityk prywatności dla Twojej firmy. Nie pisze rezygnacji, odstąpień, reklamacji ani maili do obsługi. Nie proponuje, jak zapis „powinien brzmieć”. Nie odpowiada na pytanie „czy to jest legalne” i nie mówi „możesz spokojnie akceptować”. Jeśli poprosisz — odmówi i wróci do wyjaśniania.

Powód jest prosty. Pismo do firmy uruchamia terminy, a zdanie „to jest nieważne” brzmi jak rozstrzygnięcie, którego nikt w tej rozmowie nie może wydać — a to Ty poniesiesz skutki, jeśli okaże się nietrafione. To narzędzie robi rzecz węższą i uczciwszą: sprawia, że rozumiesz, na co się zgadzasz, i wiesz, kiedy zareagować.
