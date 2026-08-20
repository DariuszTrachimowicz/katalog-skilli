# E5: soczewka SŁOWA (copywriter)

## 1. DECYZJA

Przebudować. Ankieta jest główną bramką mailową lejka i działa, a problem z płatnymi
skillami to nie problem mechanizmu, tylko problem słów: nie mamy dziś ani jednego
zdania, którym uczciwie pokazalibyśmy płatną pozycję w wyniku i w mailu. Usunięcie
testu to wylanie zapisów z kąpielą. Zamiast tego dokładamy jedno naturalne pytanie
i dwie naturalne odpowiedzi (sygnały-kotwice), a płatne pokazujemy w osobnej,
jasno nazwanej sekcji z ceną wprost. Ton bez zmian: język, którym mówi się w biurze,
zero nachalności, cena podana jak w rozmowie, nie jak w banerze.

## 2. PROJEKT

Koncept słowny w jednym zdaniu: płatne skille nie "wygrywają" w teście, tylko
dostają własną półkę z podpisem, kto i za ile. Darmowy wynik zostaje nietknięty,
płatna pozycja pojawia się pod nim wyłącznie wtedy, gdy odpowiedź użytkownika
wskazała ją wprost (tag-kotwica), maksymalnie dwie pozycje.

### 2a. Zmiany w pytaniach (pełne brzmienia)

Nowe pytanie 7 (ostatnie, po "Jak duża jest Twoja firma?"). Naturalne na stronie
o skillach AI, nikt nie poczuje ankiety urzędowej. Kotwica dla polityka-ai:

```
q: "Jak u Was wygląda korzystanie z AI w pracy?"
h: ""
wiele: false
o: [["Każdy używa po swojemu, bez wspólnych zasad", [KOTWICA: polityka-ai]],
    ["Mamy już spisane zasady i pilnujemy ich", []],
    ["Dopiero się przymierzamy", []],
    ["U nas się z AI nie pracuje", []]]
```

Nowa odpowiedź w pytaniu 1 "Czym się głównie zajmujesz?" (dopisana po
"Administracja i biuro"). Kotwica dla operaty-szacunkowe, bez słowa
"rzeczoznawca" w pytaniu, rzeczoznawca i tak wybierze ją bez wahania:

```
["Wyceny nieruchomości", ["dokumenty", KOTWICA: operaty-szacunkowe]]
```

Nowa odpowiedź w pytaniu 2 "Co zjada Ci najwięcej czasu?" (dopisana po
"Czytanie długich dokumentów"). Kotwica dla oferta-behawioralna:

```
["Przygotowywanie ofert dla klientów", ["sprzedaż", "marketing", KOTWICA: oferta-behawioralna]]
```

Zmiana w sekcji na stronie głównej (build.mjs), bo liczba pytań rośnie do siedmiu:

- podtytuł sekcji: "Siedem pytań o Twoją pracę. Na końcu dostajesz zestaw
  umiejętności dobranych pod to, co robisz na co dzień."
- licznik startowy: "Pytanie 1 z 7" (dalej i tak liczy się dynamicznie w strona.js).
- nagłówek sekcji "Nie wiesz, czego szukać? Nie musisz." zostaje bez zmian.

### 2b. Reguła doboru płatnych

- Płatne skille NIE wchodzą do zwykłego scoringu po tagach. Liczą się dla nich
  wyłącznie tagi-kotwice z powyższych trzech miejsc (osobne pole w daneQuizu).
- Płatny pojawia się tylko przy trafionej kotwicy (próg: co najmniej 1 punkt
  kotwicy). Bez kotwicy zero płatnych w wyniku, choćby tagi ogólne pasowały.
- Maksymalnie 2 płatne pozycje (np. wyceny nieruchomości + brak zasad AI),
  sortowane po liczbie punktów kotwicy.
- Prezentacja zawsze POD pełną listą darmowych, nigdy pomieszana z nią.

### 2c. Prezentacja w wyniku (dokładne teksty)

Sekcja płatna pod listą darmowych, ten sam układ wiersza co darmowe, bez numeracji
(numeracja zostaje tylko przy darmowych, żeby nie sugerować rankingu łączonego):

Nagłówek sekcji (stały, działa dla 1 i 2 pozycji):

```
Z płatnej półki pasuje jeszcze to
```

Zdanie pod nagłówkiem:

```
Pokazujemy, bo Twoje odpowiedzi wskazują na to wprost. Cena stoi obok, decyzja jest Twoja.
```

Etykieta przy każdej płatnej pozycji (zamiast numeru, cena z danych skilla):

```
Płatna, licencja roczna od 890 zł netto
Płatna, licencja roczna od 490 zł
```

Odnośnik w wierszu płatnej pozycji (spójnie z kartami katalogu):

```
Zobacz ofertę
```

Zdanie o trialu (tylko przy oferta-behawioralna, pod skrótem pozycji):

```
Zanim zapłacisz, możesz bezpłatnie pobrać wersję próbną i sprawdzić ją na własnej ofercie.
```

Komunikat, gdy pasują TYLKO płatne (zero darmowych z punktami). Tytuł wyniku
(zamiast "X umiejętności dobranych..."):

```
Twoje odpowiedzi wskazują na płatne narzędzie
```

Tekst pomocniczy pod tytułem:

```
W darmowej części katalogu nie mamy jeszcze nic, co pasowałoby do Twoich odpowiedzi.
Jest za to dopasowanie z płatnej półki, z ceną podaną wprost. Jeśli zostawisz maila,
napiszemy, gdy w Twojej działce pojawi się coś darmowego.
```

Panel "Wysłać Ci ten zestaw na maila?" zostaje bez zmian brzmienia (także w
wariancie "tylko płatne", bo obietnica z tekstu pomocniczego wyżej ją uzasadnia).

### 2d. Zmiany w mailu z zestawem (dokładne brzmienia)

Pozycja płatna w numerowanej liście dostaje własny wzór zamiast dopisku
"(w przygotowaniu)" i zamiast domyślnego linku:

```
4. Oferta behawioralna  (płatna, licencja roczna od 490 zł)
   {skrot}
   Tego skilla nie pobierzesz z katalogu. Kupujesz licencję roczną, szczegóły
   i zamówienie znajdziesz tu: {BAZA}/skill/oferta-behawioralna/
   Wersję próbną możesz pobrać bezpłatnie na tej samej stronie.
```

Dla płatnych bez triala (polityka-ai, operaty-szacunkowe) ostatnia linijka
o wersji próbnej po prostu znika, reszta wzoru identyczna:

```
5. Operaty szacunkowe, warsztat rzeczoznawcy  (płatna, licencja roczna od 890 zł netto)
   {skrot}
   Tego skilla nie pobierzesz z katalogu. Kupujesz licencję roczną, szczegóły
   i zamówienie znajdziesz tu: {BAZA}/skill/operaty-szacunkowe/
```

Pod nagłówkiem "JAK TO ZAINSTALOWAĆ" dopisujemy jedną linijkę (tylko gdy w
zestawie jest pozycja płatna):

```
Instrukcja dotyczy pozycji darmowych. Płatne mają opis zamówienia na swojej stronie.
```

Gdy zestaw składa się WYŁĄCZNIE z płatnych, sekcję "JAK TO ZAINSTALOWAĆ"
pomijamy w całości, a pierwsze zdanie maila brzmi:

```
Oto dopasowanie na podstawie Twoich odpowiedzi. Tym razem z płatnej półki,
w darmowej części katalogu nie mieliśmy nic, co by tu pasowało.
```

### 2e. Zmiany danych

- build.mjs, daneQuizu: zdjąć filtr wykluczający płatne; płatne wchodzą z polami:
  cena (pełny string, np. "od 890 zł netto"), trial (true/false), kotwice
  (lista tagów-kotwic) i znacznikiem platny. Darmowe bez zmian.
- Płatne w daneQuizu NIE dostają zwykłych tagów t do scoringu (albo dostają
  pustą listę), żeby ogólne tagi typu "finanse" nie robiły fałszywych dopasowań.
- skille.json: upewnić się, że płatne mają pole ceny w brzmieniu nadającym się
  do etykiety ("od 490 zł", "od 890 zł netto") i flagę triala; pole gotowy
  przestaje sterować dopiskiem w mailu dla płatnych (płatna ścieżka ma własny wzór).
- zapisy.mjs, nazwaSkilla: musi znać płatne id (cena, trial, platny), żeby mail
  złożył wzór z 2d; wynik z ankiety przekazuje płatne id tak samo jak darmowe,
  dzięki czemu lead w CRM od razu pokazuje handlowy sygnał.

## 3. RYZYKA i jak je zamykam

1. Fałszywe dopasowanie (księgowa dostaje operaty za 890 zł): płatne liczą się
   wyłącznie z kotwic, nigdy z tagów ogólnych; bez kotwicy nie istnieją w wyniku.
2. Wrażenie naciągania na zakup: osobna półka pod darmowymi, nagłówek mówi
   wprost "z płatnej półki", cena w etykiecie, zero mieszania z rankingiem darmowych.
3. Mail kłamiący o pobraniu: płatna pozycja ma własny wzór ("Tego skilla nie
   pobierzesz z katalogu..."), dopisek przy instrukcji instalacji, trial tylko
   tam, gdzie naprawdę jest.
4. Dłuższy test obniża ukończenia: rośnie o jedno pytanie (7, poniżej progu 8),
   a nowe pytanie o AI jest najbardziej "na temat" z całego testu i lekkie w formie.
5. Pusty wynik darmowy wygląda na awarię: dedykowany tytuł i tekst wariantu
   "tylko płatne" z obietnicą powiadomienia o darmowych nowościach, capture działa dalej.

## 4. Czego NIE ruszać

- Copy zgody/RODO przy zapisie (blok "consent") i teksty regulaminu/prywatności.
- Mail potwierdzający (mailPotwierdzajacy) w całości.
- Scoring i kolejność darmowych, próg top 6, nagłówek wyniku ze wzorcem SLOWNIE
  (liczy nadal wyłącznie darmowe pozycje).
- Nagłówek sekcji "Nie wiesz, czego szukać? Nie musisz." i hero-note o minucie.
- Kontrakt /api/zapis (email + lista id), double opt-in, wypis jednym kliknięciem.
- Zdarzenia Umami (wynik-testu, zapis) i zasada "bez treści odpowiedzi w statystykach".
