Zgrupowałem zalecenia w 20 tematów. Poparcie liczę raz na raport specjalisty, niezależnie od liczby zaleceń Z dotyczących danego tematu.

## Temat T1: Asercje, dowody i jednoznaczne werdykty

**Poparcie:** 20/24 raportów, wszystkie obsady: Claude S1, E1, E2, E3, E4, E5; Codex S1, S3, E1, E2, E3, E4, E5; Gemini S1, S3, E1, E2, E3, E4, E5.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Mechanizm pasuje do orkiestratora, jeśli nie powstanie osobny system `grading.json`. Właścicielem ma być komenda `kompatybilnosc`, a jedynym miejscem definicji format asercji w `pl-kompatybilnosc.md`. Scenariusz dostaje maksymalnie 3 do 5 atomowych asercji `[K]` lub `[M]`, najlepiej z odwołaniem do numeru reguły ze `STANDARD.md`. Padnięcie `[K]` oznacza FAIL, padnięcie wyłącznie `[M]` oznacza WARN, komplet oznacza PASS. Każdy FAIL i WARN wymaga ścieżki oraz krótkiego dowodu, bez przepisywania PII. Recenzent sprawdza także materialne deklaracje typu „dane usunięto”, ale nie kataloguje wszystkich zdań ani nie tworzy nowego agenta Grader.

## Temat T2: Deterministyczna kontrola rzeczywistych wyjść

**Poparcie:** 19/24 raportów, wszystkie obsady: Claude S1, S3, E2, E3, E4, E5; Codex S1, S3, E1, E2, E3, E4, E5; Gemini S1, S3, E2, E3, E4, E5.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Komenda `audyt` powinna wywoływać jeden `narzedzia/walidator-wyniku.mjs`, oddzielony od walidatora źródeł. Skrypt ma sprawdzać zakazane glify, encje, znane wartości syntetyczne ze scenariusza C, wymagane sekcje oraz jednoznaczne elementy formatu. Nie powinien próbować automatycznie rozstrzygać prawa, naturalności języka ani wszystkich możliwych danych osobowych. Wspólne wyrażenia regularne należy wydzielić raz i współdzielić z `walidator.mjs`, aby nie powstały dwa sprzeczne zestawy kontroli.

## Temat T3: Baseline bez skilla przy bramce sensu

**Poparcie:** 10/24 raportów, wszystkie obsady: Claude S1, E1, E5; Codex S1, E1, E2, E3, E4, E5; Gemini S1.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Baseline bez skilla należy uruchamiać jeden raz w komendzie `nowy`, w `pl-nowy.md`, na realistycznym scenariuszu A. Nie wchodzi do każdego cyklu QA ani rundy kompatybilności. Porównanie ma odpowiadać wyłącznie na pytanie, czy skill wnosi konkretną wartość ponad goły model. Jeśli goły model spełnia te same wcześniej zapisane asercje, kandydat wraca do przeprojektowania albo scalenia.

## Temat T4: Baseline ostatniej wydanej wersji przy aktualizacji

**Poparcie:** 12/24 raportów, wszystkie obsady: Claude S1, E4, E5; Codex S1, E1, E2, E3, E4, E5; Gemini S1, E4, E5.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Procedura porównawcza powinna istnieć raz w `pl-bramka-qa.md`, pod komendą `audyt`, a `wydanie-platne` ma jedynie wymagać jej zaliczonego artefaktu. Dla płatnego baseline pochodzi z aktualnie sprzedawanej paczki `dist`, po sprawdzeniu wersji i zapisaniu hasha. Dla darmowego wystarczy ostatnia wydana wersja. Porównanie jest obowiązkowe przy zmianie zachowania, granic, szablonu wyjścia lub `description`, ale nie przy czystej korekcie redakcyjnej.

## Temat T5: Minimalny workspace, artefakty i przegląd właściciela

**Poparcie:** 17/24 raportów, wszystkie obsady: Claude S1, S3, E1, E4, E5; Codex S1, S3, E1, E2, E3, E4, E5; Gemini S1, E2, E3, E4, E5.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Komenda `audyt` powinna być właścicielem jednego lekkiego schematu: `testy/workspace/<id>/<cykl>/<scenariusz>/`, z wejściem, wyjściem, werdyktem i opcjonalnym logiem. Nie należy kopiować drzewa `iteration/eval/with_skill/outputs` ani wielu schematów JSON. Każdy cykl kończy `podsumowanie.md`, a przy wysokiej stawce także `uwagi-wlasciciela.md`. Właściciel dostaje jeden pakiet decyzji na cykl oraz obowiązkową bramkę przed wydaniem płatnego, nie serię drobnych pytań podczas całej rundy.

## Temat T6: Ocena przebiegu, nie tylko końcowej odpowiedzi

**Poparcie:** 9/24 raportów, wszystkie obsady: Claude S1, E1, E2; Codex S1, E1, E2; Gemini S1, E1, E2.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** W `pl-bramka-qa.md`, pod komendą `audyt`, należy dodać sprawdzenie obserwowalnych śladów: zbędnych kroków, błędów, otwartych references, pominiętych pytań i rozbieżności między deklaracją a artefaktem. Pełny transkrypt jest wymagany tylko wtedy, gdy runner go udostępnia albo wynik wskazuje anomalię. Samoopis modelu pozostaje poszlaką, nigdy dowodem.

## Temat T7: Świeży wariant po poprawce i ochrona przed przeuczeniem

**Poparcie:** 9/24 raportów, wszystkie obsady: Claude S1, E1, E2, E4; Codex S1, E2, E4; Gemini S1, E2.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Jedynym właścicielem ma być `pl-kompatybilnosc.md` i komenda `kompatybilnosc`. Po naprawie FAIL lub WARN w skillu wysokiej stawki trzeba powtórzyć scenariusz źródłowy jako regresję oraz uruchomić świeży wariant tej samej klasy błędu, z inną branżą, kwotą lub sformułowaniem. Wariant nie może być pisany przez autora poprawki. Nie ma potrzeby podwajać wszystkich czystych scenariuszy.

## Temat T8: Polski zestaw testów wyzwalania powiązany z terytorium

**Poparcie:** 16/24 raportów, wszystkie obsady: Claude S2, E1, E2, E3, E5; Codex S1, S2, E1, E2, E3, E4, E5; Gemini S2, E2, E3, E4.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Nie tworzyć nowej komendy `wyzwalanie`, ponieważ opis i kolizje już należą do komendy `terytorium`. `pl-terytorium.md` powinien obsługiwać plik `testy/trigger/<id>.json` z 16 do 20 polskimi zapytaniami. Negatywy wskazują maksymalnie trzech realnych sąsiadów i ich identyfikatory. Potrzebna jest także kategoria `powinien-z-odmowa`, aby nie mylić wyzwolenia z zachowaniem po uruchomieniu. Pełna macierz wszystkich 36 skilli byłaby zbyt droga, więc testowane są tylko wskazane kolizje.

## Temat T9: Automatyczna pętla optymalizacji description

**Poparcie:** Pełną pętlę jako MUST poparły 2/24 raportów, Claude S2 i Codex S2; użycie selektywne dopuściło 9/24 raportów ze wszystkich obsad; 10/24 raportów jawnie odrzuciło ją jako standard.

**Werdykt:** ODRZUCIĆ.

**Uzasadnienie:** `run_loop.py` z podziałem 60/40, trzema lub pięcioma powtórzeniami i wieloma iteracjami nie powinien wejść do architektury v6. Dublowałby komendę `terytorium`, generował setki sesji i optymalizował tekst pod metrykę, której nie zna `STANDARD.md`. V6 powinna mierzyć wyzwalanie na zatwierdzonym opisie, ale nie przepisywać go automatycznie. Jeżeli narzędzie wróci kiedyś jako eksperyment, wymaga własnego runnera Windows, smoke testu, UTF-8 i unieważnienia wyników przy serii samych zer.

## Temat T10: Bramka jakości każdej zmiany description

**Poparcie:** 9/24 raportów, wszystkie obsady: Claude S2, E2, E3; Codex S2, E2, E3; Gemini S2, E2, E3.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Jedno miejsce to `pl-terytorium.md`, komenda `terytorium`. Opis musi być po polsku, mieć bezpieczny YAML, nie przekraczać 1024 znaków, nie zawierać zakazanych glifów, zachować klauzulę „NIE uruchamiaj”, zgadzać się z ofertą i przejść test sąsiadów. Ostrzeżenie może pojawiać się od 900 znaków. „Napastliwość” należy definiować przez realne sytuacje i wypowiedzi użytkownika, nie przymiotniki ani obietnice. Żadna propozycja nie trafia do frontmattera bez akceptacji właściciela.

## Temat T11: Anatomia, limity i zachowanie krótkiego routera

**Poparcie:** 8/24 raportów, wszystkie obsady: Claude S1, S3; Codex S3, E3; Gemini S1, S3, E3, E5.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** `pl-SKILL.md` pozostaje krótkim routerem. Najpierw trzeba ujednolicić `STANDARD.md`, a dopiero potem walidator: 150 linii jako sygnał przeglądu, 400 jako ostrzeżenie, 500 jako błąd. References powyżej 300 linii wymagają spisu treści, a powyżej 500 dostają ostrzeżenie o podziale. Walidator sprawdza istnienie odsyłaczy, lecz sens warunku „kiedy otworzyć” ocenia człowiek. Twardy limit 150 odrzucam, ponieważ przeczyłby zmierzonemu stanowi katalogu i zmuszał do sztucznego rozdrobnienia.

## Temat T12: Jedno źródło scenariuszy, bez evals w paczkach

**Poparcie:** Jedno źródło testów poparło 8/24 raportów ze wszystkich obsad: Claude S3, E1, E2, E4; Codex S1, E1, E5; Gemini E1. Przeciwna grupa 3/24 chciała obowiązkowego `evals/evals.json` w paczkach.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Kanonicznym źródłem pozostaje istniejący plik Markdown A/B1/B2/C z asercjami, obsługiwany przez komendę `kompatybilnosc`. Jeśli konkretne narzędzie potrzebuje JSON, ma go generować do workspace, bez ręcznej edycji. `evals/`, workspace i wewnętrzne prompty należy wykluczyć z paczek. Wysyłanie klientowi testów bezpieczeństwa byłoby duplikacją, przeciekiem procedury QA i drugim źródłem prawdy.

## Temat T13: Powtarzalne ustalenia trafiają do jednego źródła

**Poparcie:** 11/24 raportów, wszystkie obsady: Claude S1, S3, E5; Codex S1, S3, E3, E5; Gemini S1, S3, E3, E5.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** W `pl-nowy.md`, pod komendą `nowy`, należy zapisać krótki router decyzji: kontrola deterministyczna trafia do narzędzia, uniwersalna reguła zachowania do `STANDARD.md`, reguła językowa do `pl-jezyk-pl.md`, szablon do `assets/`, a wiedza domenowa do references konkretnego skilla. Nie wolno kopiować tej samej reguły do szablonu, komendy i każdego skilla. Awansowanie kontroli do blokera następuje dopiero po okresie działania jako ostrzeżenie.

## Temat T14: Zakres QA zależny od ryzyka, bez pełnego benchmarku

**Poparcie:** 10/24 raportów, wszystkie obsady: Claude S2, E2, E4, E5; Codex E1, E4, E5; Gemini E1, E4, E5.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Komenda `kompatybilnosc` powinna mieć poziom zwykły i wysoki. Domyślnie wystarcza jeden przebieg. Powtórzenia X/3 uruchamia się dla krytycznego scenariusza, który był niestabilny, wcześniej zawiódł albo dotyczy końcowego statusu płatnego skilla wysokiej stawki. Odrzucam obowiązkowe `benchmark.json`, średnie, odchylenia standardowe i ręczne `timing.json`. Wrapper może automatycznie zapisać czas, kod wyjścia i błąd, ale metryki nie są bramką ani materiałem marketingowym.

## Temat T15: Ślepe porównanie starej i nowej wersji

**Poparcie:** Obowiązek dla płatnych poparli wszyscy trzej E4; użycie selektywne poparło kolejnych 8 raportów ze wszystkich obsad; 8 raportów odrzuciło mechanizm jako stały etap.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Nie tworzyć osobnego Comparatora ani Analyzera. Ślepe A/B ma być wariantem istniejącego tie-breakera w `pl-bramka-qa.md`, uruchamianym tylko wtedy, gdy stara i nowa wersja przeszły wszystkie twarde asercje, ale panel nie rozstrzyga jakości użytkowej. Dla granic nie ma porównania względnego: wersja łamiąca granicę odpada automatycznie. Nie stosować A/B do korekt redakcyjnych ani jako obowiązkowego rytuału każdej aktualizacji.

## Temat T16: Ochrona twardych granic i scenariusze adversarial

**Poparcie:** Ochronę przed zmiękczaniem poparło 7/24 raportów ze wszystkich obsad: Claude E2, E3; Codex E2, E3, E5; Gemini E2, E3. Wszystkie trzy role E2 poparły rozszerzenie testów adversarial.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** `STANDARD.md` pozostaje jedynym źródłem twardych zakazów. Nie wolno ich usuwać przez odchudzanie promptu ani zastępować samym wyjaśnieniem. W `pl-kompatybilnosc.md` scenariusze B1, B2 i C mają testować ponawiany nacisk, iniekcję, fałszywy fakt oraz jawnie syntetyczne PII. Komendy jedynie wskazują reguły ze `STANDARD.md`, bez kopiowania ich treści. Skrypt wstępny nie zastępuje oceny semantycznej.

## Temat T17: Realistyczny język polski w triggerach i scenariuszu A

**Poparcie:** 6/24 raportów, dokładnie role S2 i E3 we wszystkich trzech obsadach.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Bank polskich cech wejścia ma jedno źródło w `pl-jezyk-pl.md`. Komenda `kompatybilnosc` wymaga, aby scenariusz A zawierał potoczne sformułowanie, skrót, literówkę albo brak znaków diakrytycznych, a skill normalizował je bez pouczania użytkownika. Komenda `terytorium` korzysta z tego samego banku przez odwołanie, nie przez kopię. Test ma obejmować również wejście formalne, aby nie przechylić całego zestawu w stronę slangu.

## Temat T18: Rygor aktualizacji płatnych i changelog oparty na dowodach

**Poparcie:** Główne zalecenia poparli wszyscy trzej E4, czyli Claude, Codex i Gemini; mechanizmy pomocnicze popierały także role S1, S2 i E1.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Właścicielem jest `pl-wydanie-platne.md` i komenda `wydanie-platne`. Zakres testów wynika z diffu: poprawka redakcyjna dostaje lekką ścieżkę, zmiana zachowania, granic, assets lub `description` pełną. Pole `zmiany` powstaje z dowodów rundy i opisuje skutek dla klienta. Nie tworzyć osobnego `historia-qa.json`, jeśli te same dane są już w raporcie QA i `produkty.json`. Oferta może opisywać proces sita jakości z datą i zakresem, ale nie może publikować „100% jakości”, surowych pass rate ani nieudowodnionych obietnic. Sztywny limit kosztu 5% ceny także odrzucam, ponieważ bezpieczeństwa nie wolno uzależniać od chwilowej marży.

## Temat T19: Viewer HTML i feedback przez Downloads

**Poparcie dla odrzucenia lub degradacji do wyjątku:** 21/24 raportów, wszystkie obsady: Claude 7/8, Codex 8/8, Gemini 6/8.

**Werdykt:** ODRZUCIĆ.

**Uzasadnienie:** Standardowym interfejsem pozostaje rozmowa oraz krótki raport Markdown z linkami do artefaktów. Dynamiczny serwer, `feedback.json`, pobieranie z Downloads i osobny schemat danych dublują istniejący kanał decyzji. Statyczny HTML może być tworzony ręcznie dla dużej rundy albo materiału wymagającego oceny wizualnej, ale nie powinien być elementem routera ani bramką wydania.

## Temat T20: Pakowanie przez istniejące narzędzia katalogu

**Poparcie:** Jawne odrzucenie `package_skill.py` poparły 3/24 raportów, po jednym z każdej obsady: Claude S3, Codex E5, Gemini E2.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Zachować `build.mjs` i `pakuj.mjs`, ponieważ znają rozdział darmowe kontra płatne, metryczkę, licencję i `produkty.json`. `package_skill.py` nie wchodzi do v6. Należy jedynie wykluczyć z paczek `evals/`, workspace i inne artefakty testowe oraz nadal skanować gotową paczkę, nie tylko źródła. Darmowe wydanie pozostaje w `pl-nowy.md`, płatne w `pl-wydanie-platne.md`.

## Sprzeczności

1. **Nowa komenda `wyzwalanie` kontra rozwinięcie `terytorium`:** Claude S2 i Codex S2 proponowali nową komendę, Gemini S2 pozostawiał test w `terytorium`; rozstrzygnięcie: nie mnożyć routera, właścicielem całej mechaniki description zostaje `terytorium`.

2. **Baseline w każdej rundzie kontra baseline selektywny:** część S1 chciała porównań zawsze, role ergonomiczne wskazywały podwojenie kosztu; rozstrzygnięcie: bez skilla tylko raz przy bramce sensu, stara wersja tylko przy zmianie zachowania.

3. **Pełny workspace i schematy JSON kontra lekkie artefakty Markdown:** S1 popierali historię iteracji, S3 i E5 odrzucali rozbudowane drzewo; rozstrzygnięcie: jedno minimalne drzewo, bez `benchmark.json`, `metrics.json` i `grading.json`.

4. **`evals/evals.json` w każdej paczce kontra zewnętrzne scenariusze:** Codex S3, Gemini S3 i Gemini E2 chcieli testów w produkcie, pozostałe raporty wskazywały na duplikację i przeciek; rozstrzygnięcie: Markdown jest źródłem, JSON jest generowany wyłącznie w workspace.

5. **Twarde 150 linii kontra granica 500:** Gemini S1 i E5 chcieli twardego limitu 150, Claude S3 wykazał, że połowa katalogu przekracza go bez szkody; rozstrzygnięcie: 150 to sygnał, 400 ostrzeżenie, 500 błąd, po wcześniejszej aktualizacji `STANDARD.md`.

6. **Pełna automatyczna optymalizacja description kontra ręczna kontrola:** dwaj S2 poparli pełny `run_loop`, większość ról bezpieczeństwa i ergonomii go odrzuciła; rozstrzygnięcie: zachować empiryczny test triggerów, odrzucić automatyczne przepisywanie opisu.

7. **Test całego katalogu kontra test sąsiadów:** Codex S2 proponował macierz 36 skilli, inne raporty ograniczały test do par lub kategorii; rozstrzygnięcie: maksymalnie trzech nazwanych sąsiadów plus przypadki graniczne.

8. **Ślepe A/B jako obowiązek płatnego kontra narzędzie awaryjne:** wszyscy E4 chcieli obowiązku, role S1, E1 i E5 ostrzegały przed kosztem oraz premiowaniem dłuższych odpowiedzi; rozstrzygnięcie: A/B tylko po przejściu granic i wyłącznie przy nierozstrzygniętym sporze jakościowym.

9. **Trzy powtórzenia i statystyka kontra pojedynczy przebieg:** część E1, E2 i E4 chciała wieloprzebiegów, inni odrzucali mało wiarygodne średnie z `n=3`; rozstrzygnięcie: X/3 tylko dla niestabilnych lub krytycznych scenariuszy, bez odchylenia standardowego.

10. **Odchudzanie i miękkie wyjaśnienia kontra twarde granice:** część zaleceń S1 przejmowała filozofię „lean”, role E2 i E3 ostrzegały przed regresją; rozstrzygnięcie: granice, odmowy i utwardzenia są wyłączone z automatycznego odchudzania, a wzór pozostaje „twarda reguła, powód, zachowanie zastępcze”.

11. **Publiczne metryki jakości kontra uczciwy opis procesu:** Gemini E4 proponował publikowanie wyników ilościowych, Claude E4 i Codex E4 ostrzegali przed małą próbą i obietnicami; rozstrzygnięcie: publikować zakres oraz proces testów, nie procent skuteczności.

12. **Pełny transkrypt zawsze kontra ślady tylko przy potrzebie:** S1 chcieli obowiązkowego czytania całości, E5 wskazywali koszt; rozstrzygnięcie: zawsze badać dostępne ślady procesu, pełny transkrypt czytać przy anomalii, sporze lub wysokiej stawce.

13. **Generyczne wykrywanie PII kontra znane wartości testowe:** część raportów proponowała szerokie regexy, inne ostrzegały przed fałszywkami; rozstrzygnięcie: blokujące sprawdzenie dotyczy wartości zasianych w scenariuszu po normalizacji separatorów, a reszta pozostaje oceną semantyczną.

14. **Osobni Grader, Comparator i Analyzer kontra istniejący panel:** część raportów chciała wyspecjalizowanych agentów, S3 i E5 wskazywali dublowanie ról; rozstrzygnięcie: przejąć ich pytania kontrolne i format dowodu, ale wykonywać je w istniejącym `audyt`, panelu oraz tie-breakerze.

## TOP 8 do v6

1. Dodać do scenariuszy po 3 do 5 asercji `[K]` i `[M]` z jednoznacznym mapowaniem na PASS, WARN i FAIL oraz obowiązkowym dowodem.

2. Wdrożyć `walidator-wyniku.mjs`, który automatycznie łapie zakazane glify, znane syntetyczne PII i jednoznaczne regresje formatu.

3. Ustanowić scenariusze Markdown A/B1/B2/C jako jedyne źródło testów, a JSON generować tylko tymczasowo dla narzędzi.

4. Po każdej naprawie krytycznej uruchamiać oryginalny scenariusz regresyjny i jeden świeży wariant tej samej klasy błędu.

5. Dodać do walidatora progi anatomii 400/500 linii, spis treści dla dużych references oraz kontrolę wszystkich odsyłaczy.

6. Rozszerzyć `terytorium` o polski zestaw 16 do 20 triggerów z nazwanymi sąsiadami, bez automatycznego przepisywania description.

7. Przy zmianie zachowania płatnego porównywać kandydata z faktycznie sprzedawaną paczką, której wersja i hash zostały zapisane przed edycją.

8. Wprowadzić lekką i pełną ścieżkę aktualizacji płatnego na podstawie diffu, z changelogiem wyprowadzonym wyłącznie z artefaktów QA.
