---
nazwa: Sprawy prawne w firmie
kategoria: Prawo
status: gotowy
wersja: 1.0.0
poziom: Działa od razu
aktualizacja: 2026-11-06
skrot: Jeden skill prawny dla firmy bez prawnika na etacie. Sam dobiera moduł do sprawy (umowy, zatrudnienie i B2B, cudzoziemcy, RODO i NIS2, spółka, sukcesja, sprzedaż konsumencka, urzędy, spory, niewypłacalność, marka, najem lokalu, przetargi), sprawdza przepisy we wbudowanych kodeksach i ustawach, pokazuje drogi działania, pisze pisma i przygotowuje kartę sprawy dla prawnika.
korzysc: Firma wie, co zrobić sama i kiedy iść do prawnika, a prawnik dostaje sprawę gotową do decyzji.
szukaj: sprawy prawne w firmie bez prawnika, dział prawny w małej firmie, AI prawnik dla firmy, wezwanie do zapłaty wzór pisma, kara umowna miarkowanie, potrącenie wierzytelności, pismo do pracownika kara porządkowa, wypowiedzenie umowy z kontrahentem, odpowiedź na reklamację konsumenta 14 dni, odpowiedzialność zarządu za długi spółki, zatrudnienie cudzoziemca 2026, NIS2 czy moja firma podlega, najem lokalu użytkowego wypowiedzenie, przetarg odwołanie do KIO, znak towarowy zgłoszenie, karta sprawy dla prawnika, kodeks pracy 2026 mobbing
tytulSeo: Sprawy prawne w firmie: analiza, pisma i karta dla prawnika
opisSeo: "Skill AI po polsku dla firm bez prawnika: dobiera moduł do sprawy, sprawdza przepisy we wbudowanych kodeksach, pisze pisma i kartę dla prawnika."
zgodnosc:
  claude: ok
  gpt: ok
  gemini: brak
---

## Co robi

Prowadzi sprawę prawną firmy od pierwszego opisu do decyzji: pyta o biegnące terminy, zbiera fakty, czyta wklejone dokumenty, sam wybiera właściwy moduł (umowy, zatrudnienie i współpraca B2B, cudzoziemcy, dane osobowe i cyberbezpieczeństwo, spółka i sukcesja, sprzedaż do konsumentów, urzędy i kontrole, spory i windykacja, niewypłacalność, marka i tajemnica firmy, najem lokalu, przetargi), sprawdza przepisy we wbudowanych tekstach kodeksów i ustaw z datą ich brzmienia i pokazuje dwie do czterech dróg działania. Pisze pisma: zwykłe gotowe do wysłania, a pisma do sądu, umowy i uchwały jako projekt do przeglądu przez prawnika. Gdy sprawa wymaga specjalisty, przygotowuje jednostronicową kartę sprawy z konkretnym pytaniem do rozstrzygnięcia.

## Dla kogo

Dla właścicieli i zarządów małych i średnich firm, które nie zatrudniają prawnika, dla kadrowych, księgowych i menedżerów, którzy pierwsi dostają pismo, skargę albo umowę do podpisu, i dla większych firm, które chcą przygotować sprawę, zanim zapłacą za godzinę kancelarii.

## Ile Ci to oszczędza

Zamiast szukać przepisów po forach dostajesz regułę z podstawą sprawdzoną w tekście ustawy, termin liczony od właściwego zdarzenia, gotowe pismo z listą „przed wysłaniem sprawdź” i kartę, z którą prawnik od razu zajmuje się sednem, a nie zbieraniem faktów. Przy każdej sprawie sprawdza ryzyka, które w firmach kosztują najwięcej: biegnący termin, karę porządkową po dwóch tygodniach, wypowiedzenie bez sprawdzenia ochrony, wezwanie z groźbą, która szkodzi firmie. Jak dobrze je wychwyci, zależy od kompletności podanych faktów i daty brzmienia przepisów.

## Przykład z życia

Marta, prezes software house'u na 35 osób, opisuje klienta, który nie płaci trzech faktur na 86 100 zł i nalicza karę umowną bez limitu, oraz programistę na B2B, który odchodzi do tego klienta „z kodem”. Skill rozdziela sprawę na spór o zapłatę, karę umowną, prawa do kodu i ryzyko ukrytego etatu, podaje podstawy z datą brzmienia, proponuje wezwanie do zapłaty z odsetkami i rekompensatą, listę dokumentów do zabezpieczenia i kartę dla prawnika z pytaniem o potrącenie kary.

## Jak po polsku

Ma wbudowane 44 akty w brzmieniu z baz Sejmu (tekst ujednolicony z datą, od 2023 r. do 5 listopada 2026 r.): Kodeks cywilny, postępowania cywilnego, pracy, karny, postępowania karnego, karny skarbowy, spółek handlowych, postępowania administracyjnego, Ordynację podatkową, ustawę o postępowaniu przed sądami administracyjnymi oraz ustawy o prawach konsumenta, ochronie danych, zatorach płatniczych, upadłości i restrukturyzacji, zamówieniach publicznych, cyberbezpieczeństwie, cudzoziemcach, znakach towarowych, nieuczciwej konkurencji, inspekcji pracy, ZUS, rachunkowości, przeciwdziałaniu praniu pieniędzy, Prawo komunikacji elektronicznej i inne. Zna zmiany wchodzące w życie (na przykład nowe przepisy o mobbingu od 5 listopada 2026 r.), orzeczenia Sądu Najwyższego i sądów administracyjnych wybrane do modułów, polskie pisma i ich formę oraz wiedzę 29 wyspecjalizowanych skilli prawnych tego katalogu. Przy dostępie do internetu sprawdza zmiany na stronach gov.pl i sn.pl.

## Czego potrzebujesz

Krótki opis sprawy: kim jest firma (forma prawna, wielkość), co się stało i kiedy, druga strona, kwoty, czego chcesz. Dokumenty (umowa, pismo, decyzja, mail) wklejone albo dołączone, z zamaskowanymi danymi prywatnymi (PESEL, adresy domowe, numery rachunków), jeśli pismo ich nie wymaga. Najlepiej działa w Claude z dostępem do plików, bo przeszukuje teksty aktów.

## Na czym się wywala

- Teksty aktów mają datę brzmienia; zmiany po tej dacie wychwytuje tylko wtedy, gdy model ma dostęp do internetu, a bez niego mówi, na jaki dzień jest stan.
- Nie ma wbudowanych rozporządzeń ani aktów unijnych (RODO, AI Act) w pełnym brzmieniu; opiera się na opracowaniach w modułach i oznacza resztę do sprawdzenia.
- Orzeczeń Sądu Najwyższego nie zawsze może otworzyć automatycznie; takie oznacza jako „do potwierdzenia”, a sprawy, które zależą od orzecznictwa, kieruje do prawnika.
- Paczka jest duża (około 5 MB, około 16 MB po rozpakowaniu, przez wbudowane teksty ustaw). Mieści się w limicie Claude API (30 MB po rozpakowaniu); limitu wgrywania w claude.ai dokumentacja nie podaje, więc przy komunikacie o zbyt dużym pliku napisz na kontakt@aixperts.pl.
- Nie zna faktów, których nie podasz; pismo z lukami oddaje z polami do uzupełnienia, a wynik analizy zmienia się, gdy dojdą nowe dokumenty.

## Czego ten skill nie robi celowo

Nie zastępuje prawnika w sprawach z sygnałem „tylko prawnik” (sąd, sprawa karna, niewypłacalność, szczególna ochrona pracownika, akt notarialny), nie przesądza, kto wygra, i nie podaje procentów szans. Pism do sądu, umów i uchwał nie oddaje jako gotowych, tylko jako projekt do przeglądu. Nie wylicza podatków, składek ani opłat z pamięci, nie pisze antydatowanych ani pozornych dokumentów i pism z groźbą, nie zajmuje się sprawami prywatnymi właściciela (rozwód, spadek poza firmą, upadłość konsumencka), do których katalog ma osobne skille.

## Najczęstsze pytania

### Czy ten skill zastąpi firmie prawnika?

Nie. Prowadzi sprawy, które firma może załatwić sama: wyjaśnia przepisy, pokazuje drogi działania, pisze zwykłe pisma. Gdy sprawa wymaga decyzji specjalisty, mówi to wprost i przygotowuje kartę sprawy, dzięki której prawnik szybciej przechodzi do sedna sprawy.

### Skąd skill bierze przepisy i czy są aktualne?

Ma wbudowane teksty 44 kodeksów i ustaw pobrane z bazy aktów prawnych Sejmu, każdy z datą brzmienia. Przy każdej podstawie podaje tę datę, a jeśli ma dostęp do internetu, sprawdza na stronach gov.pl i sn.pl, czy po niej coś się zmieniło.

### Jakie pisma skill przygotuje?

Gotowe do wysłania: wezwanie do zapłaty, oświadczenie o potrąceniu, odpowiedź na reklamację, wypowiedzenie umowy, pisma do kontrahenta, urzędu i pracownika. Pozew, sprzeciw, umowę, uchwałę czy pełnomocnictwo przygotuje jako projekt z dopiskiem, że przed użyciem powinien go przejrzeć prawnik.

### Co to jest karta sprawy dla prawnika?

To jedna strona z faktami, osią czasu, biegnącymi terminami, kluczowymi dokumentami, podstawą prawną do potwierdzenia, ryzykami i jednym konkretnym pytaniem do rozstrzygnięcia. Prawnik nie musi zbierać faktów od nowa, więc konsultacja może być krótsza.

### Czy skill nadaje się dla większej firmy?

Tak. Obejmuje także sprawy większych firm: cyberbezpieczeństwo i NIS2, przetargi publiczne, cudzoziemców, regulaminy pracy, sygnalistów, odpowiedzialność zarządu. Przy złożonych sprawach pomaga uporządkować materiał i przygotować pytania dla kancelarii albo działu prawnego grupy.

### Czy skill jest darmowy?

Tak, jest darmowy, na licencji GPL. Plik dostajesz linkiem na e-mail z karty skilla. Działa w Claude i w innych narzędziach obsługujących umiejętności, a w każdym z nich odpowiedź zależy od podanych faktów i daty brzmienia przepisów.
