# E4. Ujednolicenie językowe stron ofert płatnych skilli

Data: 20 sierpnia 2026. Zakres: `skille/polityka-ai/oferta.html`, `skille/oferta-behawioralna/oferta.html`, `skille/operaty-szacunkowe/oferta.html`, z kartami `wpis.md` jako kontekstem. Standard: `STANDARD.md`, sekcja „Język" i „Reguły twarde".

## 1. Rozstrzygnięcie: forma adresata (Ty/Wy)

Stan zastany: oferta-behawioralna i operaty-szacunkowe mówią per „Ty". Polityka-ai miesza: nagłówek „Jak rozumiemy Waszą sytuację", w treści raz „Ty nie masz działu prawnego", raz „Sami decydujecie", w sekcji „Twoje ryzyko" bullet 1 i 3 per Ty, bullet 2 per Wy.

**Reguła przyjęta dla katalogu:**

> Do czytelnika-decydenta mówimy per „Ty". Formy „Wy/Wasze" są dozwolone wyłącznie tam, gdzie podmiotem czynności jest realnie firma lub zespół jako grupa: wspólna sesja robocza („wypełniamy Wasz rejestr", „wychodzicie z wypełnionym rejestrem"), własność dokumentów firmy („dokumenty są Wasze"), zachowanie zespołu („zespół używa narzędzi"). Nagłówki sekcji, pytania FAQ i sekcja „Twoje ryzyko" zawsze per „Ty". Nie mieszamy adresata w obrębie jednego wyliczenia ani jednej sekcji bez zmiany podmiotu.

Uzasadnienie: kupuje i czyta jedna osoba (właścicielka, menedżer), a standard katalogu każe pisać do konkretnego, nietechnicznego człowieka. „Wy" zostaje tylko jako odniesienie do firmy, nie jako drugi adresat.

Miejsca do zmiany wg tej reguły: wyłącznie w polityka-ai (lista w sekcji 6.1). Zostają bez zmian (dozwolone „Wy" o firmie/zespole): „do Waszych narzędzi i procesów", „przez Wasze realia", „czy jesteście zgodni", „wypełniamy Wasz rejestr... wychodzicie...", „widzicie, czego brakuje", „dokumenty... są Wasze i używacie ich", „układa Waszą dokumentację", „Dostajecie solidny szkielet" (odpowiedź na pytanie „czy to czyni NAS zgodnymi").

## 2. Długie myślniki (kontrola bajtowa)

Wykonano `LC_ALL=C grep -n` na bajtach `e2 80 94` (pauza) i `e2 80 93` (półpauza) na wszystkich trzech plikach.

Wynik: **0 wystąpień w każdym z trzech plików.** Czysto, bez poprawek.

## 3. Slogany, obietnice ponad stan, orzekanie, żargon

### Obietnice ponad stan
- **polityka-ai, badge pakietu środkowego: „Rekomendowany, najczęściej wybierany".** Nie mamy danych sprzedażowych, które to potwierdzają; strona oferta-behawioralna sama uczciwie przyznaje „Nie mamy jeszcze publicznych referencji kupujących". Zmienić na „Rekomendowany na start" (tak jak operaty).
- **polityka-ai i oferta-behawioralna: „kupujesz, nie wypożyczasz".** Sprzeczne z modelem licencji rocznej, który obowiązuje katalog (operaty-szacunkowe piszą wprost: „Licencja jest roczna, jak w całym katalogu"). Jeśli licencja tych dwóch skilli też jest roczna, ten zapis wprowadza w błąd; jeśli nie jest, to niespójny jest model. DO DECYZJI WYDAWCY, poprawka językowa proponowana w listach niżej.
- **oferta-behawioralna: „Twoja oferta staje się dokumentem, który czytający skanuje w kilkanaście sekund i od razu wie...".** Obiecuje zachowanie czytelnika. Przeformułować na mechanizm: „Układasz ofertę tak, żeby...".

### Orzekanie
- **oferta-behawioralna, zwrot: „to treść cyfrowa dostarczana od razu, więc po pobraniu nie podlega zwrotowi".** Orzeka o prawie konsumenta i to nieściśle: utrata prawa odstąpienia wymaga łącznie żądania, potwierdzenia i potwierdzenia zamówienia, co polityka-ai i operaty opisują już poprawnie. Przenieść tę nowszą konstrukcję (bullet „Uczciwie o zwrocie" i pozycja w Formalnościach).

### Żargon niewyjaśniony
- polityka-ai: „triaż" (odbiorca nietechniczny i nieprawniczy).
- oferta-behawioralna: „deale", „na własnym dealu", „blokerów", „Meta-dowód".
- operaty-szacunkowe: „Pipeline" (3 wystąpienia), „blokerów"; „kotwica skrótu" ma wyjaśnienie dopiero w FAQ, warto dać glosę przy pierwszym użyciu.

### Slogany
Brak sloganów typu „zrewolucjonizuj", „bez wysiłku", „nowa era". Mocne frazy („Operat czyta wrogi czytelnik", „Tego nie zostawia się na później") mają pokrycie w treści akapitu, zostają.

## 4. Spójność tonu i konstrukcji analogicznych sekcji

| Sekcja | polityka-ai | oferta-behawioralna | operaty-szacunkowe | Werdykt |
|---|---|---|---|---|
| Nagłówek otwarcia | „Jak rozumiemy Waszą sytuację" | „Jak rozumiemy Twoją sytuację" | „Jak rozumiemy Twoją sytuację" | Ujednolicić na „Twoją" |
| Stawka | „Co jest na stole" | „Co Cię to kosztuje bez zmian" | „Co jest na stole" | Ujednolicić na „Co jest na stole" |
| Zakres, podnagłówki | „W zestawie" / „Czego celowo nie robi" | „W zakresie" / „Poza zakresem" | „W zestawie" / „Czego celowo nie robi" | Ujednolicić na „W zestawie" / „Czego celowo nie robi" (z przepisaniem pozycji na czasowniki) |
| Pakiety | 3 pakiety, tanio > drogo, środek wyróżniony | 3 pakiety, DROGO > środek > tanio | 3 pakiety, tanio > drogo, środek wyróżniony | Odwrócona kolejność w oferta-behawioralna to świadome kotwiczenie (metoda tego skilla), zostaje; odnotowane |
| Ceny w pakietach | netto + brutto dla konsumenta | tylko netto | netto + brutto dla konsumenta | Dodać brutto w oferta-behawioralna |
| Nota pod pakietami | licencja + własność dokumentów + charakter usług | tylko licencja (1 zdanie) | licencja + własność + charakter usług | Rozbudować w oferta-behawioralna |
| „Dlaczego możesz temu zaufać" | kto prowadzi + 2 uczciwe dowody | TYLKO dowody, brak „kto prowadzi" | kto prowadzi + 2 uczciwe dowody | Dodać zdanie „kto prowadzi" w oferta-behawioralna |
| „Twoje ryzyko" | 3 bullety (bullet 2 per Wy) | 3 bullety | 3 bullety | Poprawić adresata w polityka-ai, zwrot w oferta-behawioralna |
| Oś czasu | brak | „Jak to przebiega w czasie" | brak | Dywergencja dopuszczalna (wynika z metody skilla), ale krok 4 osi („Napisz chcę pakiet") jest nieaktualny wobec formularza zamówień, poprawić |
| Formalności | 8 pozycji | 5 pozycji, w tym nieaktualne odstąpienie | 8 pozycji | Uzupełnić oferta-behawioralna do wzorca 8 pozycji |

## 5. FAQ o platformach vs stan „Gdzie działa"

Stan kanoniczny: Claude przetestowane; ChatGPT wymaga planu Business, Enterprise, Edu albo Healthcare (w planach zespołowych włączenie przez administratora); Gemini: funkcja nieudostępniona w EOG (nie tylko „w Polsce").

Brzmienie kanoniczne odpowiedzi FAQ (pytanie zawsze „Zadziała u mnie, w ChatGPT czy w Claude?"):

> W Claude na dowolnym płatnym planie (przetestowane). W ChatGPT funkcja umiejętności wymaga planu Business, Enterprise, Edu albo Healthcare; w planach zespołowych może wymagać włączenia przez administratora obszaru roboczego. W aplikacji Gemini funkcja nie jest udostępniona w EOG, w tym w Polsce.

Rozbieżności:
- polityka-ai: pytanie per „u nas"; brak „(przetestowane)"; Gemini „w Polsce" zamiast EOG.
- oferta-behawioralna: zaczyna od „Tak.", co zawyża obietnicę (na ChatGPT działa tylko od planu Business); brak „(przetestowane)"; brak klauzuli o administratorze; Gemini „w Polsce".
- operaty-szacunkowe: najbliżej kanonu; brak klauzuli o administratorze w FAQ (jest w Formalnościach); Gemini „w Polsce". Zdanie „instrukcje narzędzia przeszły test wykonania na GPT" zostaje, jest zgodne z `zgodnosc.gpt: format` w karcie i uczciwie węższe niż „ok".
- Karty wpis.md: `zgodnosc` (claude: ok wszędzie; gpt: ok / ok / format) spójne z powyższym.

## 6. Poprawki per plik (fraza -> fraza)

### 6.1 polityka-ai/oferta.html (9 poprawek)

1. (Ty/Wy) „Jak rozumiemy Waszą sytuację" -> „Jak rozumiemy Twoją sytuację"
2. (żargon) „nie kwalifikuje kategorii ryzyka systemu, prowadzi triaż i wskazuje, co zweryfikować" -> „Nie kwalifikuje kategorii ryzyka systemu, wstępnie porządkuje narzędzia i wskazuje, co zweryfikować"
3. (obietnica) badge „Rekomendowany, najczęściej wybierany" -> „Rekomendowany na start"
4. (licencja, DO DECYZJI) „Licencja na Twój użytek / kupujesz, nie wypożyczasz" -> jeśli model roczny: „Licencja roczna z aktualizacjami paczki / aktualne wydanie pobierasz kluczem przez okres licencji" (wtedy też pozycja „Licencja" w Formalnościach i nota pod pakietami)
5. (styl) „i pilnuje granic, żeby nie wpisać sobie fałszywego poczucia zgodności" -> „i pilnuje granic, żeby nie skończyć z fałszywym poczuciem zgodności"
6. (Ty/Wy) „To chroni Was, nie sprzedawcę." -> „To chroni Ciebie, nie sprzedawcę."
7. (Ty/Wy) bullet 2 w „Twoje ryzyko": „Sami decydujecie, co komu przekazujecie. W pakiecie „Sam system" budujecie dokumentację w swoim narzędziu AI, na własnych realiach, a wynik zostaje u Was, nam nic nie przesyłacie. Przy pakietach ze wspólną sesją albo przeglądem przekazujecie nam tylko to, co potrzebne do tej pracy, na zasadach poufności ustalanych przy zamówieniu. I pamiętajcie: to, co wpisujecie do samego narzędzia AI, trafia do jego dostawcy na Waszych zasadach, właśnie po to jest ta polityka." -> „Sam decydujesz, co komu przekazujesz. W pakiecie „Sam system" budujesz dokumentację w swoim narzędziu AI, na realiach swojej firmy, a wynik zostaje u Ciebie, nam nic nie przesyłasz. Przy pakietach ze wspólną sesją albo przeglądem przekazujesz nam tylko to, co potrzebne do tej pracy, na zasadach poufności ustalanych przy zamówieniu. I pamiętaj: to, co Twój zespół wpisuje do samego narzędzia AI, trafia do jego dostawcy, właśnie po to jest ta polityka."
8. (FAQ platformy) pytanie „Zadziała u nas, w ChatGPT czy w Claude?" -> „Zadziała u mnie, w ChatGPT czy w Claude?"
9. (FAQ platformy) odpowiedź „W Claude na dowolnym płatnym planie. W ChatGPT... W aplikacji Gemini funkcja nie jest udostępniona w Polsce." -> brzmienie kanoniczne z sekcji 5 (dodane „(przetestowane)" i „w EOG, w tym w Polsce")

### 6.2 oferta-behawioralna/oferta.html (17 poprawek)

1. (język neutralny) „w którą włożyłeś realną robotę" -> „w którą poszła realna robota"
2. (spójność nagłówków) „Co Cię to kosztuje bez zmian" -> „Co jest na stole"
3. (żargon) „Przegrane deale, których nie widać na fakturze" -> „Przegrane kontrakty, których nie widać na fakturze"
4. (obietnica) „Twoja oferta staje się dokumentem, który czytający skanuje w kilkanaście sekund i od razu wie „ile i co dostaję", zamiast odkładać ją na potem." -> „Układasz ofertę tak, żeby czytający zeskanował ją w kilkanaście sekund i od razu wiedział „ile i co dostaję", zamiast odkładać ją na potem."
5. (spójność podnagłówków) „W zakresie" -> „W zestawie"
6. (spójność podnagłówków) „Poza zakresem" -> „Czego celowo nie robi", z przepisaniem pozycji:
   - „Obietnica, że sprzedasz więcej, to zależy od Twojego produktu i rynku" -> „Nie obiecuje, że sprzedasz więcej, to zależy od Twojego produktu i rynku"
   - „Doradztwo prawne i podatkowe, pola VAT i statusu zostawiamy Tobie" -> „Nie doradza prawnie ani podatkowo, pola VAT i statusu zostawia Tobie"
   - „Pisanie treści wywołującej skutek prawny (wypowiedzenia, wezwania)" -> „Nie pisze treści wywołującej skutek prawny (wypowiedzenia, wezwania)"
   - „Wsparcie techniczne platform, to po stronie Claude i ChatGPT" -> „Nie zastępuje wsparcia technicznego platform, to po stronie Claude i ChatGPT"
7. (ceny) „netto, płatność z góry" (3 pakiety) -> „netto, czyli 2447,70 zł brutto dla konsumenta; płatność z góry" / „...1217,70 zł brutto..." / „...602,70 zł brutto..." (1990, 990, 490 zł)
8. (licencja, DO DECYZJI) „Licencja na Twój użytek / kupujesz, nie wypożyczasz" -> jak w 6.1 poz. 4, jeśli model roczny obowiązuje
9. (nota pod pakietami) „Licencja jednostanowiskowa, na Twój użytek, bez prawa dalszej dystrybucji i odsprzedaży." -> „Licencja jednostanowiskowa, na Twój użytek, bez prawa dalszej dystrybucji i odsprzedaży. Oferty, które zbudujesz narzędziem, są Twoje bez ograniczeń. Wdrożenie i audyt to praca po naszej stronie, nie porada prawna ani podatkowa; zakres ustalamy przy zamówieniu."
10. (żargon) „po domknięciu wszystkich blokerów" -> „po domknięciu wszystkich usterek blokujących"
11. (konstrukcja „zaufania") przed „Nie mamy jeszcze publicznych referencji kupujących..." dodać: „Prowadzi to Dariusz Trachimowicz, trener AI, w ramach D-X.PL (sprzedawca, dane w formalnościach niżej)."
12. (żargon) kafel „0 / blokerów, dopiero wtedy werdykt „gotowy"" -> „0 / usterek blokujących, dopiero wtedy werdykt „gotowy""
13. (żargon) „Meta-dowód, który trzymasz w ręku" -> „Dowód, który trzymasz w ręku"
14. (orzekanie o zwrocie) bullet „Uczciwie o zwrocie: to treść cyfrowa dostarczana od razu, więc po pobraniu nie podlega zwrotowi (przy zakupie potwierdzasz zgodę na natychmiastowe dostarczenie i rezygnację z prawa odstąpienia). Zamiast obiecywać zwrot, pokazujemy wartość zawczasu." -> „Uczciwie o zwrocie: jako konsument masz co do zasady 14 dni na odstąpienie. Samo pobranie pliku (pakiet „Sam system") nie odbiera Ci tego prawa: tracisz je dopiero, gdy przed pobraniem wyraźnie zażądasz udostępnienia i potwierdzisz, że wiesz o utracie prawa, a my wyślemy Ci mailowe potwierdzenie zamówienia. Pakiety z wdrożeniem albo audytem to usługa, wykonywana przed upływem terminu tylko za Twoją wyraźną zgodą."
15. (żargon + oś czasu) „układasz pierwszą ofertę na własnym dealu" -> „układasz pierwszą ofertę na realnym zapytaniu od klienta"; krok „Napisz „chcę [pakiet]", a odeślemy link do płatności i instrukcję dalej." -> „Kliknij „Zamawiam ten pakiet": zamówienie i płatność przechodzą online, klucz licencji i paczka przychodzą mailem."
16. (FAQ platformy) odpowiedź „Tak. W Claude na dowolnym płatnym planie. W ChatGPT... W aplikacji Gemini funkcja nie jest udostępniona w Polsce." -> brzmienie kanoniczne z sekcji 5 (bez „Tak.", z „(przetestowane)", klauzulą o administratorze i „w EOG, w tym w Polsce")
17. (Formalności) uzupełnić do wzorca pozostałych stron: brutto dla konsumenta w „Ceny i podatek"; „działalność wpisana do CEIDG" i „kontakt: kontakt@aixperts.pl" w „Sprzedawca"; dodać pozycje „Wymagania techniczne", „Charakter" i „Reklamacje"; „Prawo odstąpienia" przepisać na konstrukcję z poz. 14

### 6.3 operaty-szacunkowe/oferta.html (6 poprawek)

1. (żargon) „Pipeline pięciu etapów z bramkami: założenia..." -> „Pięć etapów z bramkami: założenia..."
2. (żargon) „pipeline, rejestr i kalkulatory od pierwszej wyceny" -> „etapy, rejestr i kalkulatory od pierwszej wyceny"
3. (żargon) „przejście Twojej pierwszej wyceny przez pipeline" -> „przejście Twojej pierwszej wyceny przez wszystkie etapy"
4. (żargon) „werdykt końcowy bez blokerów" -> „werdykt końcowy bez usterek blokujących"
5. (żargon, glosa) „kotwica skrótu do operatu" -> „kotwica skrótu do operatu (krótki kod końcowy do zanotowania w operacie)"
6. (FAQ platformy) odpowiedź: dodać klauzulę o administratorze i zmienić „W aplikacji Gemini funkcja nie jest udostępniona w Polsce." -> „...w EOG, w tym w Polsce."; zdanie o Pythonie 3.10+ oraz o teście wykonania na GPT zostają

## 7. Sprawy do decyzji wydawcy (poza czystą redakcją)

1. **Model licencji:** operaty deklarują licencję roczną „jak w całym katalogu", a polityka-ai i oferta-behawioralna sprzedają zapisem „kupujesz, nie wypożyczasz" bez terminu. Trzeba wyrównać w jedną stronę; poprawki 6.1/4 i 6.2/8 zakładają model roczny.
2. **Prawo odstąpienia w oferta-behawioralna:** obecny zapis („po pobraniu nie podlega zwrotowi") jest starszą, ostrzejszą wersją; proponowana konstrukcja to ta uzgodniona już na dwóch pozostałych stronach.
3. **Kolejność pakietów** w oferta-behawioralna (od najdroższego) zostaje jako świadome kotwiczenie, wynika z metody tego skilla.
