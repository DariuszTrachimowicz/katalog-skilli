# E1: Ekspertyza CRO, ankieta a płatne skille

Soczewka: konwersja lejka. Ankieta jest główną bramką mailową (zapis -> double opt-in -> mail z zestawem -> lead w CRM -> sekwencja ankieta-oferta). Każda zmiana oceniana pod dwie liczby naraz: współczynnik zapisu z wyniku testu oraz przejścia do ofert płatnych.

## 1. DECYZJA: PRZEBUDOWAĆ

Usunięcie ankiety to likwidacja najtańszego źródła potwierdzonych adresów i jedynego miejsca, gdzie użytkownik sam deklaruje swój profil (rola, faktury, umowy, wielkość firmy), czyli danych, na których działa sekwencja w CRM. Żaden plan zastępczy (formularz "zapisz się na nowości", pop-up) nie da ani tego wolumenu, ani tej segmentacji. Problem z płatnymi nie jest wadą ankiety, tylko wadą miejsca, w którym ktoś chciałby je wcisnąć: płatny skill z ceną wstawiony do głównej listy wyniku PRZED zapisem podnosi próg decyzji przy polu e-mail (obietnica "wyślemy Ci ten zestaw" przestaje być prawdziwa, bo części zestawu nie da się dostać) i obniży współczynnik zapisu. Dlatego przebudowa według zasady: darmowy zestaw pozostaje wabikiem i obietnicą bramki, płatny skill pracuje jako oddzielna, honestnie oznaczona rekomendacja premium, a sprzedaje głównie PO zapisie: w mailu z zestawem i w sekwencji CRM, gdzie zaufanie jest już zbudowane. Trial oferty-behawioralnej jest mostem i drugą bramką mailową zarazem.

## 2. PROJEKT: "Zestaw darmowy + jedna rekomendacja premium na twardej kotwicy"

### 2.1 Koncept

- Płatne skille NIGDY nie wchodzą do ogólnego scoringu tagów i do listy top 6. Lista i nagłówek ("Sześć umiejętności dobranych...") liczą wyłącznie darmowe. To zamyka pułapkę dopasowania (księgowa nie dostanie operatów za 890 zł).
- Płatny skill pojawia się wyłącznie na twardej kotwicy: jawnej regule opartej o konkretne odpowiedzi, nie o sumę punktów ogólnych tagów. Maksymalnie JEDNA rekomendacja premium na wynik.
- operaty-szacunkowe są świadomie WYŁĄCZONE z ankiety. Rzeczoznawca majątkowy nie jest person tej ankiety (żadne pytanie nie wykryje go uczciwie, a dodanie pytania "czy wyceniasz nieruchomości" spaliłoby jedno z maksymalnie ośmiu pytań na ułamek procenta odwiedzających). Kanał dla operatów to katalog, wyszukiwarka i SEO podstrony, nie test.
- Miejsca pracy płatnego skilla w lejku, od najsłabszego do najmocniejszego:
  1. Strona wyniku: tylko dyskretny boks pod listą darmowych, bez konkurencyjnego formularza. Tu płatny najłatwiej odstrasza, więc jest podporządkowany bramce mailowej.
  2. Mail z zestawem: osobna, uczciwie opisana sekcja płatna. Tu już nie ryzykujemy zapisu, bo zapis się dokonał.
  3. CRM: dobrany płatny skill trafia do opisu leada jako sygnał zakupowy i steruje sekwencją ankieta-oferta. To najlepsze miejsce sprzedaży.

### 2.2 Pytania i odpowiedzi (zmiany w PYTANIA, strona.js)

Test rośnie z 6 do 7 pytań (limit briefu: 8). Dwie zmiany:

ZMIANA A. Pytanie 2 ("Co zjada Ci najwięcej czasu?") dostaje piątą odpowiedź (kotwica dla oferty-behawioralnej):

- "Przygotowywanie ofert i wycen dla klientów" -> tagi: ["oferty", "sprzedaż", "dokumenty"]

Tag "oferty" jest nowym tagiem-kotwicą: nie ma go żaden darmowy skill, służy wyłącznie regule premium. Tagi "sprzedaż" i "dokumenty" normalnie zasilają scoring darmowych, więc odpowiedź poprawia też dobór darmowego zestawu.

ZMIANA B. Nowe pytanie 7 (ostatnie, przed wynikiem), kotwica dla polityki-ai i wartościowa segmentacja do CRM:

- q: "Czy w Twojej firmie ktoś korzysta z AI, na przykład z ChatGPT albo Claude?"
- h: "" (jedna odpowiedź)
- odpowiedzi:
  - "Tak, więcej osób niż tylko ja" -> ["ai-firma"]
  - "Tak, głównie ja" -> ["ai-osobiste"]
  - "Jeszcze nie, dopiero się przymierzamy" -> []

Tagi "ai-firma" i "ai-osobiste" to kotwice, żaden darmowy skill ich nie ma, więc pytanie nie zaburza scoringu darmowych.

ZMIANA C (niewidoczna dla użytkownika). W pytaniu o wielkość firmy odpowiedzi "Do 10 osób", "11-50 osób" i "Więcej niż 50" dostają dodatkowo tag-kotwicę "zespol" (obok dotychczasowych tagów, które zostają bez zmian). "Pracuję sam" bez "zespol".

### 2.3 Reguła doboru płatnych (strona.js, po wyliczeniu punkty)

Reguły jawne, deterministyczne, liczone na obiekcie punkty:

- oferta-behawioralna pojawia się, gdy: punkty["oferty"] >= 1 LUB (punkty["sprzedaż"] >= 1 ORAZ punkty["B2B"] >= 1).
- polityka-ai pojawia się, gdy: punkty["ai-firma"] >= 1 ORAZ punkty["zespol"] >= 1 (firma używa AI szerzej niż jedna osoba i ma zespół, czyli jest komu narzucić politykę i rejestr).
- operaty-szacunkowe: nigdy z ankiety.
- Gdy odpalą obie reguły, pokazujemy JEDNĄ: tę z większą sumą punktów kotwic (oferty+sprzedaż+B2B vs ai-firma+zespol), a przy remisie oferta-behawioralna (ma trial, niższą cenę wejścia i mniejsze tarcie, więc jest lepszym mostem). Druga i tak trafi do sekwencji CRM, nic nie przepada.
- Wybrany płatny id dopisujemy na KONIEC tablicy wysyłanej do /api/zapis (wynik.map(id) + [platnyId]). Serwer już dziś przyjmuje do 12 idów, zero zmian w walidacji.

### 2.4 Prezentacja w wyniku (strona.js, pokazWynik)

Układ: nagłówek i lista top 6 darmowych bez zmian (nagłówek liczy tylko darmowe). Panel "Wysłać Ci ten zestaw na maila?" bez zmian, pozostaje głównym CTA. Boks premium wchodzi POD listę darmowych, w lewej kolumnie (pod .rlist), nigdy między listą a panelem zapisu, bez własnego formularza. Dokładny markup i teksty:

```
<div class="ritem-premium">
  <div class="p-head">
    <span class="p-label">Rekomendacja premium</span>
    <span class="p-cena">od 490 zł netto</span>
  </div>
  <b>Oferta behawioralna</b>
  <p>Skoro przygotowujesz oferty dla klientów, to narzędzie układa je tak,
  żeby klientowi łatwiej było powiedzieć tak. To skill płatny, dlatego nie
  wliczamy go do darmowego zestawu wyżej.</p>
  <div class="p-akcje">
    <a href="/skill/oferta-behawioralna/" class="link-btn">Najpierw wypróbuj za darmo (wersja trialowa)</a>
    <a href="/skill/oferta-behawioralna/" class="link-btn">Zobacz ofertę i cennik</a>
  </div>
</div>
```

Dla polityki-ai analogicznie, bez linku trialowego:

```
  <span class="p-cena">od 890 zł netto</span>
  <b>Polityka AI i rejestr zastosowań</b>
  <p>Skoro w firmie z AI korzysta więcej osób, AI Act każe mieć zasady
  i rejestr. To narzędzie prowadzi przez zbudowanie własnej dokumentacji.
  Skill płatny, dlatego nie wliczamy go do darmowego zestawu wyżej.</p>
  <a href="/skill/polityka-ai/" class="link-btn">Zobacz ofertę i cennik</a>
```

Zasady CRO w tym boksie:

- Cena widoczna od razu (wymóg uczciwości), ale boks wizualnie podrzędny wobec panelu zapisu: mniejsza karta, bez przycisku klasy .btn, tylko linki.
- Dla oferty-behawioralnej pierwszym linkiem jest TRIAL, nie oferta. Trial to most: klik prowadzi na podstronę skilla, gdzie formularz trialowy sam zbiera e-mail przez /api/pobranie. Nawet jeśli użytkownik zignoruje panel zapisu zestawu, lejek ma drugą szansę na adres.
- Zdarzenia Umami: przy pokazaniu boksu `wynik-premium` z {skill: id}, przy kliknięciu `klik-premium` z {skill: id, cel: "trial" | "oferta"}. To da twarde liczby do oceny, czy boks obniża zapis (porównanie zapis/wynik-testu przed i po wdrożeniu).

### 2.5 Mail z zestawem (zapisy.mjs, mailZZestawem)

Funkcja dzieli przekazane idy na darmowe i płatne po polu platny ze skille.json. Darmowe renderują się jak dziś. Płatne NIE dostają numeru na liście, dopisku "(w przygotowaniu)" ani instrukcji pobrania. Dokładna struktura treści:

```
Oto zestaw dobrany na podstawie Twoich odpowiedzi.

1. ...            (tylko darmowe, jak dziś)
...

JAK TO ZAINSTALOWAĆ
                   (blok bez zmian, dotyczy pozycji z listy)

WARTE UWAGI: NARZĘDZIE PREMIUM

Z Twoich odpowiedzi wynika, że może Ci się przydać także nasz płatny skill:

Oferta behawioralna (od 490 zł netto)
   Buduje ofertę B2B jak architekturę decyzji: pakiety, kotwica ceny,
   odwrócenie ryzyka, kolejność czytania.
   Zanim zdecydujesz, możesz bezpłatnie pobrać wersję trialową,
   formularz znajdziesz na stronie oferty:
   https://{domena}/skill/oferta-behawioralna/
```

Wariant dla polityki-ai (bez zdania o trialu):

```
Polityka AI i rejestr zastosowań (od 890 zł netto)
   Prowadzi firmę przez dokumentację pod AI Act: rejestr systemów,
   politykę dla pracowników, klauzulę do umów, ścieżkę incydentu.
   Oferta i cennik:
   https://{domena}/skill/polityka-ai/
```

Gdy w wyniku nie ma płatnego, cała sekcja premium znika (mail identyczny z dzisiejszym). Nagłówek sekcji mówi wprost "premium" i podaje cenę w pierwszej linii pozycji, zero sugestii pobierania.

### 2.6 CRM (zapisy.mjs, zglosDoCrm)

Opis leada rozróżnia pozycje płatne, żeby sekwencja ankieta-oferta miała sygnał zakupowy bez parsowania:

- w mapowaniu nazw: `nazwaSkilla(id)` z dopiskiem ` [PŁATNY, sygnał zakupowy]` gdy skill ma platny=true w skille.json.
- Przykładowy opis: "Potwierdzony zapis z testu doboru (skille.aixperts.pl). Dobrane skille: Umowa pod lupą, Faktura bez błędów, Oferta behawioralna [PŁATNY, sygnał zakupowy]."

Sekwencja w CRM: lead z sygnałem płatnym dostaje po 2-3 dniach od maila z zestawem wiadomość ofertową o TYM konkretnym skillu (dla oferty-behawioralnej z trialem jako pierwszym CTA), zamiast ogólnej sekwencji nowości. Lead bez sygnału zostaje na sekwencji dotychczasowej.

### 2.7 Zmiany danych

build.mjs, daneQuizu: filtr darmowych zostaje (SKILLE bez zmian). Obok powstaje druga stała wstrzykiwana do skryptu:

```
const PREMIUM = [
  { id: "oferta-behawioralna", n: "Oferta behawioralna",
    o: "...", c: "od 490 zł netto", trial: true },
  { id: "polityka-ai", n: "Polityka AI i rejestr zastosowań",
    o: "...", c: "od 890 zł netto", trial: false }
];
```

Budowana z wpisów platny=true z wykluczeniem operatów (najprościej: pole w danych skilla `ankieta: false` dla operatów, domyślnie płatny wchodzi do PREMIUM). Reguły kotwic mieszkają w strona.js, nie w danych.

skille.json (build.mjs, blok "dane dla usługi zapisów"): dodać pole `cena` (mail musi ją podać) i zostawić platny. Pole gotowy dla płatnych zostaje false, ale przestaje mieć znaczenie, bo płatne nie przechodzą przez gałąź z dopiskiem "(w przygotowaniu)".

## 3. RYZYKA I DOMKNIĘCIA

1. Spadek współczynnika zapisu przez cenę na stronie wyniku. Domknięcie: boks tylko przy odpaleniu kotwicy (szacunkowo mniejszość wyników), pod listą, bez formularza i bez przycisku pierwszego rzędu; pomiar zapis/wynik-testu w Umami tydzień przed i po; jeśli spadek przekroczy 10 procent względnych, boks na stronie wyniku wyłączamy (jedna flaga), a płatny zostaje tylko w mailu i CRM.
2. Fałszywy komunikat w mailu (dzisiejszy dopisek "(w przygotowaniu)" i instrukcja pobrania przy płatnym). Domknięcie: rozdział darmowe/płatne w mailZZestawem opisany w 2.5 plus pole cena w skille.json; test w trybie ZAPISY_TRYB=log z wynikiem zawierającym płatny id przed wdrożeniem.
3. Błędne dopasowanie płatnego (efekt "operaty dla księgowej"). Domknięcie: zero płatnych w ogólnym scoringu, wyłącznie twarde kotwice z 2.3, operaty całkowicie poza ankietą.
4. Dłuższy test obniży ukończenia. Domknięcie: jedno krótkie pytanie zamknięte (7 z limitu 8), na końcu, tematycznie oczywiste na stronie o AI; monitoring liczby zdarzeń wynik-testu względem wejść w test.
5. Regres działającego lejka przy zmianach w zapisy.mjs. Domknięcie: zmiany tylko w dwóch funkcjach (mailZZestawem, zglosDoCrm), walidacja /api/zapis bez zmian (limit 12 idów mieści dopisany płatny), double opt-in nietknięty, próba na środowisku z ZAPISY_TRYB=log i dopiero potem produkcja.

## 4. CZEGO NIE RUSZAĆ

- Copy zgody i RODO w panelu zapisu (p.consent) oraz na stronach potwierdzenia i wypisu.
- Mechanika double opt-in: mailPotwierdzajacy, /api/potwierdz, /api/wypisz, tokeny, bezpieczneRowne.
- Walidacja /api/zapis (regex idów, limit 12, limit prób na IP).
- Scoring i lista top 6 darmowych, nagłówek z liczebnikiem, panel "Wysłać Ci ten zestaw na maila?" i jego teksty.
- Formularze pobrań paczek i triali (/api/pobranie, /api/pobierz) oraz ich maile.
- Zdarzenia Umami wynik-testu i zapis (nowe zdarzenia premium tylko dochodzą).
- Sześć dotychczasowych pytań poza dwoma punktowymi zmianami z 2.2 (nowa odpowiedź w P2, niewidoczny tag "zespol" w pytaniu o wielkość firmy).
