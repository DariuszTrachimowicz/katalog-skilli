# E3. Sprzedaż i etyka rekomendacji: płatny skill w wyniku testu i w mailu

Rola: strateg sprzedaży B2B i etyki rekomendacji. Soczewka: jak płatny skill
wygląda w rekomendacji (wynik testu + mail), żeby sprzedawał bez niszczenia
zaufania do darmowego zestawu.

## 1. DECYZJA: przebudować

Ankieta jest główną bramką mailową lejka (zapis, double opt-in, lead w CRM,
sekwencja ankieta-oferta), więc usunięcie jej to oddanie zapisów bez planu
zastępczego. Z punktu widzenia sprzedaży ankieta jest też najtańszym momentem
kwalifikacji leada, jaki mamy: użytkownik sam mówi, czym się zajmuje i co go
boli, zanim zobaczy jakąkolwiek cenę. Przebudowa jest tania (czysty JS, jedna
sekcja w mailu, kilka pól w danych), a poprawnie zrobiona rekomendacja płatnego
przy darmowym zestawie podnosi wartość leada w CRM zamiast psuć konwersję
zapisu. Warunek brzegowy: płatny nigdy nie udaje darmowego i nigdy nie wypycha
lepiej dopasowanego darmowego z zestawu.

## 2. PROJEKT rozwiązania

### 2.1. Koncept: "Poza darmowym zestawem" (osobna sekcja, nie badge w liście)

Rozstrzygnięcie sporu "osobna sekcja vs wmieszanie z badge": **osobna sekcja,
zawsze poniżej darmowej listy, maksymalnie jedna pozycja płatna**.

Uzasadnienie sprzedażowo-etyczne:

- Wmieszanie płatnego w listę z badge zatruwa całą listę. Użytkownik, który
  zobaczy jedną pozycję płatną w środku rankingu, zaczyna podejrzewać, że cały
  ranking jest reklamą. Tracimy wtedy jedyny kapitał tego testu: wrażenie, że
  ktoś uczciwie dobrał narzędzia pod moją pracę. To ten sam mechanizm, który
  zabił zaufanie do "wyników sponsorowanych" w porównywarkach.
- Osobna sekcja z jawną etykietą działa odwrotnie: darmowa lista zostaje
  czysta, a płatna pozycja dostaje własną ramę, w której wolno jej mieć cenę,
  powód pokazania i CTA do oferty. Wprost powiedziane "to jest płatne i
  pokazujemy je dlatego, że..." jest spójne z tonem serwisu i buduje
  wiarygodność darmowej części.
- Jedna pozycja, nie trzy. Dwie lub trzy pozycje płatne pod wynikiem zamieniają
  rekomendację w witrynę sklepu. Jedna pozycja z powodem czyta się jak rada.
- Nagłówek wyniku ("Sześć umiejętności dobranych...") liczy wyłącznie darmowe.
  Płatna pozycja nigdy nie wlicza się do obiecanej liczby i nigdy nie zajmuje
  miejsca darmowej w top 6.

### 2.2. Pytania i odpowiedzi (pełne brzmienia zmian)

Test zostaje przy 6 pytaniach. Zmiany są punktowe i służą wyłącznie uczciwym
kotwicom dla płatnych (tagi-kotwice nie występują w tagach żadnego darmowego
skilla, więc nie zaburzają darmowego scoringu):

Pytanie 1 "Czym się głównie zajmujesz?" dostaje jedną nową odpowiedź (siódmą):

- "Wyceniam nieruchomości (rzeczoznawca)" z tagami `["operaty", "finanse"]`

Pytanie 6 "Jak duża jest Twoja firma?" dostaje dopisane tagi-kotwice do dwóch
istniejących odpowiedzi (brzmienia odpowiedzi bez zmian):

- "11-50 osób": `["firma", "kadry", "zatrudnia"]`
- "Więcej niż 50": `["kadry", "raporty", "zatrudnia"]`

Nic więcej w pytaniach się nie zmienia. Odpowiedź "Marketing i sprzedaż"
(tag `sprzedaż`) już dziś jest naturalną kotwicą dla oferty behawioralnej.

### 2.3. Reguła doboru płatnych (kiedy, gdzie, próg)

Osobna reguła, całkowicie poza scoringiem darmowych. W `strona.js` stała
`PLATNE` (wstrzykiwana z build.mjs, patrz 2.6) i funkcja wybierająca po
tagach-kotwicach z `punkty`:

1. `operaty-szacunkowe`: pokazuj, gdy `punkty["operaty"] >= 1`
   (wyłącznie samodeklaracja zawodu w pytaniu 1).
2. `oferta-behawioralna`: pokazuj, gdy `punkty["sprzedaż"] >= 1`
   (wyłącznie odpowiedź "Marketing i sprzedaż" w pytaniu 1).
3. `polityka-ai`: pokazuj, gdy `punkty["zatrudnia"] >= 1`
   (firma 11+ osób; obowiązki AI Act, w tym kompetencje AI z art. 4, ciążą
   na pracodawcach, więc kotwica jest merytoryczna, nie pretekstowa).

Kolejność powyżej to priorytet: wygrywa pierwsza spełniona reguła, pokazujemy
maksymalnie jedną pozycję. Uzasadnienie priorytetu: operaty to najtwardszy
sygnał (deklaracja zawodu), sprzedaż to deklaracja obszaru pracy, rozmiar firmy
to sygnał najsłabszy i najszerszy, więc idzie na końcu. Gdy żadna reguła nie
gra, sekcji płatnej nie ma wcale i wynik wygląda dokładnie jak dziś.

Pułapka z briefu jest tym domknięta: księgowa od faktur nie ma tagu `operaty`,
więc nigdy nie zobaczy narzędzia rzeczoznawcy, mimo wspólnego tagu `finanse`
w katalogu; `finanse` w ogóle nie jest kotwicą.

Osoby, którym pasuje TYLKO płatny (rzeczoznawca, który zaznaczył wycenę
nieruchomości i neutralne odpowiedzi dalej): darmowej listy nie chowamy nigdy,
ale gdy płatna kotwica zagrała, a najlepszy darmowy wynik ma 0 punktów, sekcja
płatna renderuje się NAD listą darmowych z nagłówkiem mówiącym prawdę (tekst w
2.4, wariant B), a lista darmowych dostaje podpis "A z darmowych na początek,
najczęściej pobierane". Mail nadal wysyła darmowy zestaw, panel zapisu zostaje.
Nigdy nie wysyłamy maila, w którym jedyną treścią jest pozycja płatna.

### 2.4. Prezentacja w wyniku (dokładny układ i teksty)

Sekcja wstawiana w `pokazWynik()` po `.rlist`, przed panelem `capture`
(w kolumnie listy, żeby panel mailowy nie zjechał w dół). Układ:

```
<div class="rpaid">
  <div class="rpaid-label">Poza darmowym zestawem</div>
  <div class="rpaid-head"><b>{nazwa}</b> <span class="dot d-platny"><i></i>{cena}</span></div>
  <p>{skrot}</p>
  <p class="rpaid-why">{powód}</p>
  <a class="btn2" href="/skill/{id}/">Zobacz ofertę i cennik</a>
  {linia o trialu, tylko gdy trial}
</div>
```

Teksty stałe:

- Etykieta sekcji (wariant A, standardowy): "Poza darmowym zestawem"
- Nagłówek sekcji (wariant B, gdy darmowe mają 0 punktów, sekcja nad listą):
  "Najtrafniejsze dopasowanie jest płatne. Mówimy to wprost."

Teksty pozycji (skrot bierzemy z danych, cena z danych):

- oferta-behawioralna, cena "od 490 zł":
  - powód: "Pokazujemy ją przy odpowiedziach o marketingu i sprzedaży. To
    płatne narzędzie, nie część darmowego zestawu."
  - linia o trialu: "Zanim zapłacisz, na stronie oferty pobierzesz darmową
    wersję trialową i sprawdzisz ją na własnej ofercie."
- polityka-ai, cena "od 890 zł netto":
  - powód: "Pokazujemy ją firmom, które zatrudniają, bo AI Act nakłada
    obowiązki właśnie na pracodawców. To płatne narzędzie, nie część
    darmowego zestawu."
  - bez linii o trialu (trialu nie ma i nie sugerujemy, że jest).
- operaty-szacunkowe, cena "od 890 zł netto":
  - powód: "Pokazujemy je przy odpowiedzi o wycenie nieruchomości. To płatne
    narzędzie, nie część darmowego zestawu."
  - bez linii o trialu.

Zasady twarde tej sekcji: cena widoczna od razu (badge, ten sam wzorzec
`d-platny` co w katalogu, więc użytkownik już zna to oznaczenie), powód
pokazania zawsze obecny (to jest nasza szczepionka na wrażenie reklamy),
zero słów "polecamy", "promocja", "okazja", zero wykrzykników.

Panel zapisu bez zmian ("Wysłać Ci ten zestaw na maila?" dotyczy darmowego
zestawu i tak zostaje). Umami: do zdarzenia `wynik-testu` dochodzi pole
`platny: id albo "brak"` (bez treści odpowiedzi).

### 2.5. Zmiany w mailu z zestawem (dokładne brzmienia)

Dziś `mailZZestawem` skłamałby dwa razy: dopiskiem "(w przygotowaniu)" (bo w
skille.json płatne mają gotowy=false) i instrukcją pobrania, która płatnego
nie dotyczy. Naprawa:

1. Numerowana lista zestawu zawiera WYŁĄCZNIE darmowe. Serwer filtruje
   `wynik` po fladze `platny` z skille.json (obrona w głąb: nawet gdyby
   front przysłał id płatnego albo stary rekord w stanie go miał, płatny
   nigdy nie renderuje się jak darmowy).
2. Front wysyła rekomendację płatną osobnym polem `platny` w POST /api/zapis
   (walidacja serwera: id istnieje w skille.json i ma platny=true, inaczej
   pole jest ignorowane). Pole trafia do rekordu zapisu obok `wynik`.
3. Nagłówek instrukcji dostaje doprecyzowanie:
   "JAK TO ZAINSTALOWAĆ (dotyczy darmowego zestawu powyżej)"
4. Po instrukcji, przed stopką o nowościach, sekcja płatna (tylko gdy rekord
   ma `platny`):

Brzmienie dla oferta-behawioralna:

```
POZA DARMOWYM ZESTAWEM

Do Twoich odpowiedzi pasuje też jedno płatne narzędzie. Piszemy o nim osobno,
bo nie pobiera się go jak pozostałych: kupujesz licencję.

Oferta behawioralna, od 490 zł
   Buduje ofertę B2B jak architekturę decyzji: pakiety, kotwica ceny,
   odwrócenie ryzyka, kolejność czytania.
   Zanim zapłacisz, pobierzesz darmową wersję trialową i sprawdzisz ją
   na własnej ofercie.
   Oferta, cennik i trial: {BAZA}/skill/oferta-behawioralna/
```

Brzmienie dla polityka-ai (analogicznie operaty-szacunkowe, ze swoim skrótem
i powodem):

```
POZA DARMOWYM ZESTAWEM

Do Twoich odpowiedzi pasuje też jedno płatne narzędzie. Piszemy o nim osobno,
bo nie pobiera się go jak pozostałych: kupujesz licencję.

Polityka AI i rejestr zastosowań, od 890 zł netto
   Prowadzi firmę przez zbudowanie własnej dokumentacji AI pod obowiązki
   AI Act. Strukturyzuje, nie orzeka zgodności.
   Pokazujemy, bo zatrudniasz ludzi, a AI Act nakłada obowiązki właśnie
   na pracodawców.
   Oferta i cennik: {BAZA}/skill/polityka-ai/
```

Techniczne brzmienie generatora: nazwa i cena z skille.json, skrót z pola
`skrot`, linia o trialu tylko przy `trial=true`, etykieta linku "Oferta,
cennik i trial" przy trialu, "Oferta i cennik" bez triala. Zero słowa
"pobierz" przy płatnym bez triala.

5. Lead w CRM: do `description` dochodzi na końcu "Pokazany płatny: {nazwa}."
   albo nic, gdy brak. Handlowiec od razu wie, którą ofertą domykać sekwencję.

### 2.6. Zmiany danych

- `build.mjs`, `daneQuizu`: BEZ ZMIAN (nadal tylko darmowe; darmowy scoring
  nie widzi płatnych). Obok, do wstrzyknięcia w strona.js, nowa stała
  `PLATNE`: filtr `jestPlatny`, mapowanie
  `{ id, n: nazwa, o: skrot, c: cena, trial: existsSync(paczki-zewnetrzne/{id}-trial.skill) }`.
- `public/dane/skille.json` (dane serwera): do każdego wpisu dochodzą pola
  `cena` i `trial` (jak wyżej). Pole `gotowy` zostaje, ale przestaje być
  używane do dopisku przy płatnych, bo płatne mają własny render.
- `strona.js`: reguły kotwic z 2.3 (mała mapa id -> warunek na `punkty`),
  render sekcji `rpaid`, pole `platny` w body POST, prop w Umami.
- `zapisy.mjs`: walidacja i zapis pola `platny` w rekordzie, filtr darmowych
  w liście, sekcja płatna w `mailZZestawem`, dopisek w CRM.
- `styl.css`: klasy `rpaid`, `rpaid-label`, `rpaid-head`, `rpaid-why`
  (wizualnie spokojniejsze niż lista, cieńsza ramka, bez wyróżnień kolorem
  poza istniejącym badge ceny).

## 3. RYZYKA i jak je zamykam

1. Wynik testu zaczyna wyglądać jak reklama i spada konwersja zapisu.
   Zamknięcie: maksymalnie jedna pozycja płatna, domyślnie pod listą, zawsze
   z ceną i powodem, nigdy nie wliczana do nagłówka; monitorować w Umami
   stosunek `zapis` do `wynik-testu` osobno dla `platny: brak` i dla
   pokazanych płatnych, próg alarmowy: spadek konwersji zapisu w grupie z
   płatnym o więcej niż kilka punktów procentowych.
2. Regres działającego lejka przez zmianę kontraktu API.
   Zamknięcie: pole `platny` jest opcjonalne i ignorowane przy złej wartości,
   stare rekordy w stanie nie mają go wcale i renderują mail jak dziś (tylko
   z filtrem darmowych, który dla starych, czysto darmowych wyników niczego
   nie zmienia); double opt-in i copy zgody nietknięte.
3. Fałszywy dopisek "(w przygotowaniu)" albo instrukcja pobrania przy płatnym
   (dzisiejsze kłamstwo maila).
   Zamknięcie: filtr po fladze `platny` po stronie serwera przy każdym
   renderze maila, niezależnie od tego, co przyszło z frontu lub siedzi w
   stanie; płatny ma własny szablon bez słowa "pobierz" (poza trialem).
4. Błędne dopasowanie płatnego (księgowa dostaje narzędzie rzeczoznawcy).
   Zamknięcie: płatne w ogóle nie wchodzą do scoringu tagów; działają
   wyłącznie trzy tagi-kotwice z samodeklaracji (zawód, obszar sprzedaży,
   zatrudnianie), z których żaden nie występuje w darmowych skillach.
5. Test się wydłuża i spada ukończenie.
   Zamknięcie: zero nowych pytań; jedna nowa odpowiedź w pytaniu 1 i dwa
   niewidoczne tagi w pytaniu 6; liczba kroków bez zmian.

## 4. Czego NIE ruszać

- Copy zgody i RODO przy zapisie (wymóg twardy briefu).
- Przepływ double opt-in: mail potwierdzający, token, /api/potwierdz,
  /api/wypisz.
- Scoring i kolejność darmowych skilli (top 6, tie-break po `g`).
- Filtr `daneQuizu` (darmowe only); płatne idą osobną stałą.
- Liczba i kolejność pytań (6), brzmienia istniejących odpowiedzi poza
  dopisaniem tagów w pytaniu 6.
- Nagłówek wyniku i odmiana liczebników (liczy tylko darmowe, jak dziś).
- Panel "Wysłać Ci ten zestaw na maila?" (teksty bez zmian).
- Formularze pobrań paczek i triali na podstronach skilli (osobny obieg,
  działa).
- Nazwy istniejących zdarzeń Umami (`wynik-testu`, `zapis`); dochodzi tylko
  nieinwazyjny prop.
