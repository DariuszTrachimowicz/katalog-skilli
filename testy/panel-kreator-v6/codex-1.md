Liczba w polu „Poparcie” oznacza liczbę raportów ról, przykładowo Claude/S1 i Codex/S1 liczę jako dwa raporty. Zalecenia przeciwne uwzględniam przy werdykcie i w sekcji sprzeczności.

## Temat T1: Atomowe asercje w scenariuszach A/B1/B2/C

**Poparcie:** 20 z 24 raportów. Claude: S1, E1, E2, E3, E4, E5. Codex: S1, S3, E1, E2, E3, E4, E5. Gemini: S1, S3, E1, E2, E3, E4, E5.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ: maksymalnie 3 do 5 asercji na scenariusz, zapisanych bezpośrednio w kanonicznym pliku Markdown.

**Uzasadnienie:** To skraca ocenę i zmniejsza zależność od pamięci operatora. Asercja ma sprawdzać jeden obserwowalny skutek. Podział `[K]` krytyczna i `[M]` miękka wystarczy. Nie należy budować pełnego schematu `evals.json` ani mnożyć profili, pól i plików.

## Temat T2: Deterministyczne kontrole PII, glifów i danych zasianych w teście

**Poparcie:** 13 raportów. Claude: S1, E1, E2, E4. Codex: S1, E1, E2, E4, E5. Gemini: E1, E2, E3, E4.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Jeden skrypt powinien sprawdzać wyjścia pod kątem dokładnych syntetycznych wartości ze scenariusza, znormalizowanych numerów PESEL i NRB, pauz, półpauz, encji, obcych walut i wymaganych znaczników. Trafienie zasianej wartości blokuje test. Brak trafienia nie jest dowodem pełnej anonimizacji, więc ocena semantyczna pozostaje.

## Temat T3: Werdykt z dowodem i weryfikacja twierdzeń modelu

**Poparcie:** 13 raportów. Claude: S1, E1, E2, E3. Codex: S1, E1, E2, E3, E4, E5. Gemini: S1, E1, E2.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ: dowód obowiązkowy dla FAIL i WARN, dla PASS wystarczy ścieżka do artefaktu.

**Uzasadnienie:** Recenzent ma sprawdzać tylko materialne deklaracje typu „usunąłem dane”, „sprawdziłem stan” albo „dokument jest kompletny”. Nie potrzebujemy `grading.json` dla każdego przebiegu. Wystarczy kolumna dowodu w istniejącym raporcie oraz cytat lub opis braku, bez powielania PII.

## Temat T4: Baseline bez skilla dla nowego produktu

**Poparcie:** 9 raportów. Claude: S1, E1, E5. Codex: S1, E1, E2, E3, E5. Gemini: S1.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ: jeden przebieg scenariusza A przy bramce sensu, nie w każdej rundzie QA.

**Uzasadnienie:** Baseline odpowiada na pytanie, czy skill wnosi wartość ponad model, ale nie pomaga w każdym teście odmów i PII. Powtarzanie go w każdym cyklu podwoiłoby koszt. Jeżeli wynik jest niejednoznaczny, dopuszczalna jest jedna powtórka na innym przypadku.

## Temat T5: Produkcyjna poprzednia wersja jako baseline aktualizacji

**Poparcie:** 14 raportów. Claude: S1, E2, E4, E5. Codex: S1, E1, E2, E3, E4, E5. Gemini: S1, E1, E4, E5.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Przy zmianie zachowania płatnego lub wysokiego ryzyka baseline ma pochodzić z aktualnie sprzedawanej paczki, nie z przypadkowego stanu repo. Należy zapisać wersję i hash, a migawkę usunąć dopiero po wydaniu i kontroli paczki. Dla drobnej redakcji wystarczy diff i smoke test.

## Temat T6: Minimalny workspace i ślad decyzji

**Poparcie:** 15 raportów. Claude: S1, E1, E2, E4. Codex: S1, E1, E2, E3, E4, E5. Gemini: S1, E1, E2, E3, E4.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Wystarczy `cykl-N/<scenariusz>/` z wejściem, wyjściem, wynikiem kontroli i krótkim werdyktem. Odrzucam obowiązkowe `timing.json`, `metrics.json`, `eval_metadata.json`, `grading.json` i rozbudowane gałęzie `with_skill/outputs`. Workspace ma być poza paczką i domyślnie poza repo.

## Temat T7: Ocena przebiegu i transkryptu

**Poparcie:** 8 raportów. Claude: S1, E1, E2. Codex: S1, E1, E2. Gemini: S1, E2.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ: przechwytywać automatycznie, czytać selektywnie.

**Uzasadnienie:** Pełny transkrypt należy czytać przy FAIL, WARN, podejrzeniu pętli, drogim przebiegu i zmianie skilla wysokiej stawki. Czytanie każdego czystego transkryptu dla 36 skilli jest nieutrzymywalne. Przy PASS wystarczy automatyczny zapis i krótka informacja o liczbie kroków, błędach i otwartych plikach.

## Temat T8: Świeże warianty i zakaz przeuczania pod test

**Poparcie:** 13 raportów. Claude: S1, E1, E2, E3. Codex: S1, E1, E2, E3, E4. Gemini: S1, E1, E2, E3.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Po naprawie FAIL lub WARN należy uruchomić mały wariant tej samej klasy problemu, ale tylko dla zmienionego obszaru. Oryginał pozostaje testem regresji. Nie należy automatycznie podwajać wszystkich czterech scenariuszy każdego skilla.

## Temat T9: Potoczne polskie wejście w scenariuszu A

**Poparcie:** 6 raportów. Claude: S2, E3. Codex: S2, E3. Gemini: S2, E3.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Scenariusz A powinien zawierać potoczność, skrót, literówkę albo brak znaków diakrytycznych. Jeden taki przypadek wystarczy. Trzy warianty formalny, potoczny i bez znaków dla każdego testu byłyby zbędnym mnożnikiem rundy.

## Temat T10: Polskie testy wyzwalania i near-missy sąsiadów

**Poparcie:** 16 raportów. Claude: S2, E1, E2, E3, E5. Codex: S1, S2, E1, E2, E3, E4, E5. Gemini: S2, E2, E3, E4.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Osobna komenda `wyzwalanie` ma mierzyć tylko wybór skilla. Zestaw powinien mieć trzy klasy: `powinien`, `powinien-z-odmową` i `nie-powinien`, aby nie pomylić odmowy z brakiem wyzwolenia. Obowiązek dotyczy nowego opisu, zmiany zakresu, płatnych, prawnych oraz wykrytej kolizji. Testujemy maksymalnie trzech realnych sąsiadów, nie cały iloczyn 36 na 36.

## Temat T11: Automatyczna pętla run_loop.py i bezpieczeństwo Windows

**Poparcie:** Pomiar automatyczny poparło 15 raportów. Pełną pętlę poparło 8 raportów, a 9 ją odrzuciło. Wszystkie trzy obsady zgłosiły ograniczenia kosztowe lub techniczne.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ: przyjąć runner pomiarowy, odrzucić pełną pętlę jako standard.

**Uzasadnienie:** Domyślnie jeden przebieg na 10 do 20 zapytaniach. Powtórki tylko dla pomyłek i przypadków chwiejnych. Automatyczne poprawianie opisu wolno uruchomić ratunkowo, maksymalnie przez dwie iteracje. Runner musi mieć lokalny wrapper ustawiający UTF-8, smoke test na znanym pozytywie i wersjonowaną poprawkę odczytu potoku Windows. Raport 0 procent przy ostrzeżeniach lub samych błędach jest nieważny, nie jest dowodem złego opisu.

## Temat T12: Mocny opis, twarde wykluczenia i brak automatycznej podmiany

**Poparcie:** 13 raportów. Claude: S2, E2, E3, E5. Codex: S2, E1, E2, E3, E5. Gemini: S2, E2, E3, E5.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** „Napastliwość” ma oznaczać konkretne sytuacje i frazy użytkownika, nie obietnice marketingowe. Kandydat opisu musi przejść polszczyznę, zakaz długich myślników, YAML, limit 1024 znaków, zgodność z ofertą, wykluczenia i ponowny test. `best_description` nigdy nie może być wpisany automatycznie.

## Temat T13: Krótki router i automatyczna bramka anatomii

**Poparcie:** 6 raportów. Claude: S3, E3. Codex: S3. Gemini: S1, S3, E5.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** `SKILL.md` powyżej 150 linii ma uruchamiać przegląd struktury, nie blokadę. Powyżej 400 linii powinno być ostrzeżenie, a powyżej 500 błąd. `references` powyżej 300 linii wymaga spisu treści, a powyżej 500 zgłasza kandydata do podziału. Nie kopiujemy monolitu oficjalnego kreatora ani jego gawędziarskiego stylu.

## Temat T14: Warunkowe wczytywanie references, warianty i szablony

**Poparcie:** 7 raportów. Claude: S1, S3. Codex: S1, S3. Gemini: S1, S3, E3.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Każdy plik `references` ma być wskazany wraz z warunkiem otwarcia. Podział na domeny lub wykonawców robimy tylko wtedy, gdy wariant ma odrębne granice, narzędzia albo ponad kilkadziesiąt niepotrzebnych linii. Dokładne szablony dokumentów warto trzymać w `assets`, ale nie tworzyć katalogów dla samej symetrii.

## Temat T15: Jedno źródło scenariuszy i niewysyłanie evali klientowi

**Poparcie:** 5 raportów za jednym źródłem poza paczką. Claude: S3, E1. Codex: E1, E5. Gemini: E1. Trzy raporty proponowały obowiązkowe `evals/evals.json` w paczce.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Kanoniczne pozostają pliki Markdown A/B1/B2/C. Jeżeli runner wymaga JSON, plik ma być generowany do workspace i nieedytowany ręcznie. `evals/` oraz materiały adversarial nie powinny trafiać do paczki klienta, bo tworzą drugie źródło prawdy i ujawniają sposób obchodzenia granic.

## Temat T16: Skrypty zamiast powtarzanych rytuałów

**Poparcie:** 14 raportów. Claude: S1, S3, E2, E5. Codex: S1, S3, E1, E2, E5. Gemini: S1, S2, S3, E2, E5.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Jeden silnik walidacji powinien obsługiwać strukturę, glify, wersje, scenariusze, wynik testu i paczkę. Wrapper bramki ma ustawiać UTF-8, rozpoznawać ścieżkę płatną i zwracać jednoznaczny kod wyjścia. Nowa kontrola najpierw działa jako ostrzeżenie przez dwa wydania, potem może blokować. Nie utrzymujemy dwóch implementacji tej samej reguły.

## Temat T17: Viewer HTML i feedback.json

**Poparcie:** 21 raportów ze wszystkich trzech obsad odrzuciło viewer jako standard. Gemini/E5 poparł jedynie statyczny wariant opcjonalny.

**Werdykt:** ODRZUCIĆ jako etap QA.

**Uzasadnienie:** Viewer dodaje generowanie HTML, otwieranie, eksport i przenoszenie uwag, nie zdejmując żadnej pracy operatora. Wyniki należy pokazywać w rozmowie i zapisywać w krótkim raporcie Markdown. Statyczny render pozostaje narzędziem na żądanie dla HTML, DOCX, PDF i materiałów, w których wygląd jest częścią odbioru.

## Temat T18: Benchmarki, timing, tokeny i liczba powtórzeń

**Poparcie:** 9 raportów poparło lekkie metryki. Claude: S1, E1, E5. Codex: E1, E4, E5. Gemini: E1, E4, E5. Sześć raportów wprost odrzuciło pełną statystykę.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Odrzucam obowiązkowe `benchmark.json`, średnie, odchylenia i ręczne przepisywanie tokenów. Wrapper może automatycznie zapisać czas ścienny, kod wyjścia i model. Jeden przebieg jest domyślny. Trzy powtórzenia dotyczą tylko chwiejnej krytycznej granicy skilla płatnego lub prawnego. Nie porównujemy tokenów między różnymi CLI.

## Temat T19: Ślepe porównanie starej i nowej wersji

**Poparcie:** 11 raportów. Claude: S1, E4. Codex: S1, E1, E2, E3, E4. Gemini: E1, E2, E3, E4. Siedem raportów odrzuciło je jako standard.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Najpierw obie wersje muszą przejść asercje krytyczne. Ślepe porównanie uruchamiamy tylko dla dużej zmiany zachowania płatnego lub wysokiej stawki albo jako tie-breaker przy realnym sporze. Wykorzystujemy już gotowe wyjścia, jednego sędziego i wcześniej ustaloną rubrykę. Osobny analyzer działa wyłącznie po przegranej, jeśli operator nie potrafi wskazać przyczyny z diffu.

## Temat T20: Zakres QA zależny od ryzyka i rodzaju zmiany

**Poparcie:** 14 raportów. Claude: S2, E1, E2, E4, E5. Codex: S1, E1, E2, E4, E5. Gemini: S1, E1, E4, E5.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Potrzebne są trzy ścieżki:

- Redakcja, metadane i karta: automatyczne kontrole, diff i jeden smoke test.
- Zmiana zachowania: dwa celowane cykle, asercje i świeży wariant.
- Płatne, prawne, PII, odmowy, granice albo `description`: pełna ścieżka z baseline'em i przeglądem właściciela.

Pełny sweep 36 skilli powinien być deterministyczny i mieścić się w godzinie. Testy modelowe uruchamiamy tylko dla skilli zmienionych lub oznaczonych przez sweep. Jeżeli pojedynczy skill przekracza godzinę QA, należy przeprojektować mechanizm, a nie dodawać kolejne role i powtórzenia.

## Temat T21: Wsadowy przegląd właściciela

**Poparcie:** 10 raportów. Claude: S1, S2, E4. Codex: S1, S2, E2, E5. Gemini: E1, E2, E4.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Operator powinien dostać jeden pakiet: różnice, FAIL i WARN, dowody, proponowane poprawki oraz decyzję wydawniczą. Dla zwykłego skilla wystarcza jeden przegląd. Druga jawna akceptacja pozostaje tylko przed publikacją płatnego lub prawnego. Uwagi zapisujemy automatycznie w podsumowaniu cyklu.

## Temat T22: Ochrona twardych granic przed odchudzaniem i zmiękczaniem

**Poparcie:** 8 raportów. Claude: S1, E2, E3. Codex: E2, E3, E5. Gemini: E2, E3.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Granice prawne, PII, odmowy, iniekcja i statusy mają zachować twardy nakaz lub zakaz, jedno zdanie przyczyny oraz zachowanie zastępcze. Nie wolno usuwać ich dlatego, że nie wpłynęły na dwa łatwe testy. Lean dotyczy zbędnych kroków roboczych, nie warstwy bezpieczeństwa.

## Temat T23: Changelog, historia QA i publiczne „sito jakości”

**Poparcie:** 3 raporty, wszystkie obsady E4: Claude, Codex i Gemini.

**Werdykt:** PRZYJĄĆ ZE ZMIANĄ.

**Uzasadnienie:** Changelog powinien powstawać z udowodnionych wyników rundy i opisywać skutek dla klienta. W ofercie można opisać proces, zakres i datę testów, ale nie publikować pass rate, „100 procent skuteczności” ani obietnic zgodności z prawem. Odrzucam dodatkowy ręcznie utrzymywany `historia-qa.json`; historię należy generować z istniejących raportów i `produkty.json`.

## Temat T24: Zachowanie obecnych pakowarek i kontrola paczki

**Poparcie:** 3 raporty, po jednym z każdej obsady. Claude: S3. Codex: E5. Gemini: E2.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** `build.mjs` i `pakuj.mjs` znają rozdział treści darmowej i płatnej, licencję oraz metadane katalogu. Generyczny `package_skill.py` nie może ich zastąpić. Walidator ma sprawdzić zbudowaną paczkę, wykluczyć `evals`, workspace i materiały wewnętrzne oraz potwierdzić zgodność wersji z `produkty.json`.

## Temat T25: Oddzielenie wyzwalania od zgodności wielomodelowej

**Poparcie:** 8 raportów. Claude: S2, E1. Codex: S1, E2, E3, E5. Gemini: E2, E3.

**Werdykt:** PRZYJĄĆ.

**Uzasadnienie:** Test przez `claude -p` dowodzi wyłącznie wyzwalania w Claude Code. Nie może podnosić statusu GPT ani Gemini. Te statusy nadal wymagają realnego wykonania danego skilla przez właściwe CLI. Dobry opis nie jest też dowodem jakości treści skilla.

## Sprzeczności

1. **Baseline w każdej rundzie kontra baseline selektywny.** Rozstrzygnięcie: bez skilla tylko przy bramce sensu nowego produktu, stara wersja tylko przy zmianie zachowania. Nie dublujemy każdego cyklu.

2. **Ślepe A/B przy każdej aktualizacji płatnego kontra całkowite odrzucenie.** Rozstrzygnięcie: tylko duża zmiana zachowania, granic lub spór po asercjach. Redakcja i metadane nie uruchamiają A/B.

3. **Pełny run_loop.py kontra ręczne terytorium.** Rozstrzygnięcie: automatyzujemy pomiar, nie automatyczną mutację. Pętla dwóch iteracji jest narzędziem ratunkowym po wykryciu problemu.

4. **20 zapytań dla każdego skilla kontra mały zestaw.** Rozstrzygnięcie: 10 do 20 dla nowego lub zmienionego opisu wysokiej stawki, 6 do 10 dla zwykłej kolizji, bez obowiązku tworzenia zestawu dla niezmienionych 36 pozycji.

5. **Pełny katalog 36 opisów kontra test najbliższych sąsiadów.** Rozstrzygnięcie: zwykle maksymalnie trzech sąsiadów wskazanych przez `terytorium`. Pełny katalog tylko przy przebudowie rejestru lub zmianie mechanizmu wyboru.

6. **Binarny podział powinien i nie powinien kontra prośby wymagające odmowy.** Rozstrzygnięcie: trzy klasy `powinien`, `powinien-z-odmową`, `nie-powinien`. O tym, czy zakazana prośba ma wyzwolić skill, decyduje właściciel bezpiecznej odmowy lub przekierowania.

7. **`evals/evals.json` w paczce kontra scenariusze poza produktem.** Rozstrzygnięcie: Markdown jest źródłem prawdy, JSON tylko generowanym wejściem runnera w workspace, nigdy częścią paczki.

8. **Twardy limit 150 linii kontra limit 500.** Rozstrzygnięcie: 150 to sygnał przeglądu, 400 ostrzeżenie, 500 błąd. Twarde 150 wygenerowałoby przebudowy połowy katalogu bez wykazanego zysku.

9. **Pełny transkrypt zawsze kontra krótki raport.** Rozstrzygnięcie: transkrypt zapisujemy automatycznie, ale czytamy przy problemach, wysokim ryzyku lub nietypowym koszcie.

10. **Trzy lub pięć powtórzeń kontra jeden przebieg.** Rozstrzygnięcie: jeden domyślnie, trzy tylko dla chwiejnej asercji krytycznej. Pięć powtórzeń odrzucam jako zbyt drogie.

11. **Pełny benchmark i statystyka kontra brak metryk.** Rozstrzygnięcie: automatyczny czas ścienny i kod wyjścia są użyteczne, ręczne tokeny i odchylenia z małych prób nie są.

12. **Viewer statyczny jako standard kontra całkowite odrzucenie.** Rozstrzygnięcie: nie jest etapem QA. Może zostać wywołany na żądanie, gdy wygląd dokumentu jest przedmiotem oceny.

13. **Publiczne wyniki asercji kontra ostrożna komunikacja.** Rozstrzygnięcie: publikujemy proces, datę i zakres, nie surowe pass rate ani twierdzenia o stuprocentowej skuteczności.

14. **Zmiękczanie zakazów kontra twarde granice.** Rozstrzygnięcie: granice zostają twarde, ale otrzymują krótkie wyjaśnienie i bezpieczne zachowanie zastępcze.

15. **Ogólny regex PII kontra skan wartości testowych.** Rozstrzygnięcie: blokujący jest skan dokładnych zasianych wartości i jednoznacznych numerów po normalizacji. Ogólny detektor daje ostrzeżenia. Syntetyczność danych nie jest powodem do ignorowania wycieku.

16. **Dwa punkty decyzji właściciela kontra jeden wsad.** Rozstrzygnięcie: jeden wsad dla zwykłych zmian, dodatkowa finalna akceptacja wyłącznie dla płatnych, prawnych i publikowanych.

17. **Podłoga dwóch cykli dla wszystkiego kontra ścieżka lekka.** Rozstrzygnięcie: dwa cykle dotyczą zmian zachowania. Redakcja i metadane przechodzą automatyczne kontrole, diff i pojedynczy smoke test.

## TOP 8 do v6

1. Zbudować jeden walidator wyników i paczek, który automatycznie łapie PII z testu, glify, wersje, brak artefaktów oraz przypadkowo spakowane materiały wewnętrzne.

2. Dodać do A/B1/B2/C po 3 do 5 atomowych asercji `[K]` i `[M]`, z prostym mapowaniem na PASS, WARN i FAIL oraz dowodem dla każdego nieczystego wyniku.

3. Wprowadzić trzy ścieżki QA zależne od diffu i ryzyka, tak aby pełna runda dotyczyła tylko zmian zachowania, płatnych, prawnych, PII, odmów i description.

4. Przy aktualizacji zachowania porównywać kandydata z hashowaną, aktualnie sprzedawaną paczką, a baseline bez skilla wykonywać tylko raz przy bramce sensu nowego produktu.

5. Dodać lekki test wyzwalania na polskich zapytaniach i near-missach sąsiadów, bez obowiązkowej wieloiteracyjnej optymalizacji opisu.

6. Po naprawie FAIL lub WARN uruchamiać jeden świeży wariant tej samej klasy problemu, aby zielona lampka nie wynikała z przeuczenia pod znany prompt.

7. Rozszerzyć walidator anatomii o progi 400 i 500 linii, spisy treści powyżej 300, warunki otwierania references i zakaz pakowania evali.

8. Pokazywać właścicielowi jeden krótki pakiet decyzyjny z różnicami, dowodami i propozycją wydania, a z zaakceptowanych artefaktów automatycznie tworzyć uczciwy changelog.
