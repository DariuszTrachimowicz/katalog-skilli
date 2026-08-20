# E4. Inżynier full-stack: wykonalność i regresy

Soczewka: co trzeba zmienić, żeby płatne weszły do testu doboru bez psucia lejka
(double opt-in, mail z zestawem, lead w CRM). Wszystkie ścieżki plików podane
względem korzenia repo.

## 1. DECYZJA: przebudować

Ankieta to główna bramka mailowa lejka (zapis w `strona.js` -> `/api/zapis` ->
double opt-in -> `mailZZestawem` -> lead w CRM -> sekwencja ofert). Usunięcie jej
to utrata jedynego stałego źródła zapisów bez żadnego planu zastępczego, a koszt
przebudowy jest mały: cała zmiana mieści się w czterech plikach, które już dziś
tworzą ten lejek (build.mjs, strona.js, zapisy.mjs, wpis.md płatnych), bez
nowych usług, zależności i bez dotykania walidacji, zgód i mechaniki opt-in.
Warunkiem jest jednak scoring płatnych po osobnych, deklaratywnych kotwicach,
a nie po tagach `szukaj`, bo pułapka "finanse -> operat za 890 zł" jest realna.

## 2. PROJEKT rozwiązania

### Koncept w jednym zdaniu

Darmowy scoring i top 6 zostają nietknięte; płatne dostają własny, osobny tor:
jedno nowe pytanie z twardymi kotwicami, osobną sekcję w wyniku z widoczną ceną
i osobną gałąź w mailu; wszystko sterowane danymi, które już płyną przez
istniejące kanały (daneQuizu, skille.json, wynik[]).

### Inwentarz miejsc do zmiany (kompletny)

1. `skille/{polityka-ai,oferta-behawioralna,operaty-szacunkowe}/wpis.md`
   nowy klucz frontmatter `kotwice:` (lista tagów-kotwic, patrz niżej).
2. `build.mjs`, `daneQuizu` (ok. linii 395-397): zdjąć filtr
   `String(s.platny) !== "true"`, dodać pola płatnych.
3. `build.mjs`, zapis `public/dane/skille.json` (ok. linii 645-656): dodać
   `cena` i `trial`, żeby mail znał cenę i wiedział o wersji trialowej.
4. `szablony/strona.js`: nowe pytanie w `PYTANIA`, osobny scoring płatnych i
   osobna sekcja w `pokazWynik()`, dopisanie płatnych id do `wynik` wysyłanego
   na `/api/zapis`, rozszerzone zdarzenia Umami, mały helper `esc()`.
5. `serwer/zapisy.mjs`: rozgałęzienie w `mailZZestawem` (płatny / trial /
   darmowy), znacznik "(PŁATNY)" w opisie leada w `zglosDoCrm`.

NIC więcej. W szczególności zero zmian w `/api/zapis` (regex
`/^[a-z0-9-]{1,64}$/` już akceptuje wszystkie trzy płatne id, limit `slice(0,12)`
wystarcza na 6 darmowych + 2 płatne), zero zmian w `/api/potwierdz`,
`/api/pobranie`, `/api/pobierz`, `/api/wypisz`, `/api/feedback` i w budowie
paczek (płatne dalej bez paczki w `paczki/`; trial dalej z `paczki-zewnetrzne/`,
`plikPaczki()` już go obsługuje).

### Pytanie 7 (jedyna zmiana w pytaniach, pełne brzmienie)

Dokładamy jedno pytanie wielokrotnego wyboru na końcu (7 z 7, poniżej progu
8 pytań). Kotwice mają prefiks `k-`, więc nie kolidują z darmowym scoringiem
(żaden darmowy skill nie ma tagu z prefiksem `k-` w `szukaj`).

```js
{ q: "Które z tych tematów są teraz u Ciebie na stole?",
  h: "Możesz zaznaczyć kilka albo żaden.", wiele: true,
  o: [["Ustalamy w firmie zasady korzystania z AI", ["k-ai-firma"]],
      ["Wysyłam klientom oferty i walczę o ich skuteczność", ["k-oferty-b2b", "sprzedaż"]],
      ["Wyceniam nieruchomości albo pracuję z operatami", ["k-operaty", "finanse"]],
      ["Żaden z powyższych", []]] }
```

Opcja "Żaden z powyższych" gwarantuje, że pytanie nie blokuje przejścia dalej
(walidacja `zaznaczone.length` zostaje bez zmian). Tagi `sprzedaż` i `finanse`
przy okazji zasilają darmowy scoring, co jest pożądane.

Kotwice we frontmatterze:

```yaml
# polityka-ai/wpis.md
kotwice: k-ai-firma
# oferta-behawioralna/wpis.md
kotwice: k-oferty-b2b
# operaty-szacunkowe/wpis.md
kotwice: k-operaty
```

### Reguła doboru płatnych

- Płatny liczy punkty WYŁĄCZNIE po swoich `kotwice` (nigdy po `szukaj`).
  To zamyka pułapkę "księgowa dostaje operat": tag `finanse` z pytania o faktury
  nie dotyka płatnych, bo nie jest kotwicą.
- Próg: suma punktów kotwic >= 1 (kotwicę można zdobyć tylko przez świadomą
  deklarację w pytaniu 7, więc 1 punkt to wystarczający sygnał).
- Maksymalnie 2 płatne w wyniku, sortowane po punktach kotwic.
- Płatne NIE wchodzą do top 6 darmowych i nie wypychają żadnej darmowej pozycji.
  Darmowa lista liczy się dokładnie tak jak dziś, na `SKILLE.filter(s => !s.p)`.

### Zmiany danych

`build.mjs`, `daneQuizu` (darmowe bez zmian pól, płatne z nowymi polami):

```js
const daneQuizu = skille.map((s) => ({
  id: s.id, n: s.nazwa, o: s.skrot, t: s.szukaj, g: s.status === "gotowy",
  ...(jestPlatny(s) && {
    p: 1, c: s.cena || "", k: lista(s.kotwice),
    tr: existsSync(join(KORZEN, "paczki-zewnetrzne", `${s.id}-trial.skill`)) ? 1 : 0,
  }),
}));
```

`build.mjs`, zapis `public/dane/skille.json`:

```js
skille.map((s) => ({
  id: s.id, nazwa: s.nazwa, skrot: s.skrot,
  gotowy: s.status === "gotowy" && String(s.platny) !== "true",
  platny: String(s.platny) === "true",
  cena: s.cena || "",
  trial: existsSync(join(KORZEN, "paczki-zewnetrzne", `${s.id}-trial.skill`)),
}))
```

Pole `gotowy` zostaje w obecnej semantyce (jest darmowa paczka w buildzie),
żeby nie ruszać żadnego istniejącego odbiorcy tego pliku.

### Prezentacja w wyniku (`pokazWynik()` w strona.js)

Darmowa lista i panel "Wysłać Ci ten zestaw na maila?" bez żadnych zmian.
Pod darmową listą, tylko gdy jakiś płatny przekroczył próg, osobny blok:

```
Pasuje do Twoich odpowiedzi, ale to płatny skill

01  Oferta behawioralna   od 490 zł
    Buduje ofertę B2B jak architekturę decyzji: pakiety, kotwica ceny, ...
    [Zobacz ofertę]  Jest darmowa wersja trialowa.
```

Zasady: cena zawsze widoczna obok nazwy (badge w stylu `d-platny` z kart
katalogu), przycisk prowadzi na `/skill/{id}/` (wszystkie trzy płatne mają
lokalne podstrony, żaden nie ma `linkOferty`), zdanie o trialu tylko gdy
`tr === 1`. Żadnego słowa "pobierz" przy płatnym. Kolejność sekcji (darmowe
nad płatnymi) gwarantuje brak windowania płatnych nad lepiej dopasowane darmowe.

Do `wynik` wysyłanego w `wyslij()` dokładamy id płatnych NA KOŃCU tablicy
(`[...darmowe, ...platne].map(s => s.id)`), żeby mail i lead CRM je znały,
a numeracja darmowych w mailu się nie przesunęła.

Nowe wstawki do innerHTML (nazwa, skrót, cena) przepuścić przez mały helper:

```js
const esc = (t) => String(t).replace(/[&<>"']/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[z]));
```

Dane są autorskie (frontmatter, nie input użytkownika), ale `daneQuizu` trafia
do `innerHTML` bez escapowania już dziś; skoro dokładamy pole `c`, tanio
domykamy całą klasę problemu i przy okazji zabezpieczamy `</script>` w treści.

### Zmiany w mailu z zestawem (`mailZZestawem` w zapisy.mjs)

Rozgałęzienie pozycji, test `platny` PRZED testem `gotowy`, żeby płatny nigdy
nie dostał fałszywego "(w przygotowaniu)" ani instrukcji pobrania:

```js
.map((id, i) => {
  const s = nazwaSkilla(id);
  if (s.platny) {
    return `${i + 1}. ${s.nazwa}  (płatny${s.cena ? `, ${s.cena}` : ", cennik na stronie"})
   ${s.skrot}
   Oferta i cennik: ${BAZA}/skill/${id}/${s.trial ? `
   Darmowa wersja trialowa: formularz na tej samej stronie` : ""}`;
  }
  return `${i + 1}. ${s.nazwa}${s.gotowy ? "" : "  (w przygotowaniu)"}
   ${s.skrot}
   ${BAZA}/skill/${id}/`;
})
```

Plus jedno zdanie między listą a sekcją "JAK TO ZAINSTALOWAĆ", dodawane tylko
gdy w wyniku jest płatny:

```
Pozycje oznaczone (płatny) kupujesz jako licencję roczną, nie pobierasz ich
z katalogu. Instrukcja poniżej dotyczy pozycji darmowych.
```

Świadomie NIE generujemy w tym mailu tokenu pobrania triala: trial schodzi
wyłącznie istniejącą ścieżką `/api/pobranie` ze strony skilla, żeby nie
duplikować logiki wydawania paczek i nie tworzyć drugiego źródła leadów
"pobranie".

### Lead w CRM (`zglosDoCrm` w zapisy.mjs)

Jedna linijka: nazwy płatnych w opisie z dopiskiem, żeby handlowiec od razu
widział gorący sygnał:

```js
(rekord.wynik || []).map((id) => { const s = nazwaSkilla(id); return s.platny ? `${s.nazwa} (PŁATNY)` : s.nazwa; }).join(", ")
```

### Zdarzenia Umami (strona.js)

- `wynik-testu`: rozszerzyć payload do `{ skilli: wynik.length, platnych: platne.length }`.
- Nowe zdarzenie na kliku w przycisk oferty w wyniku:
  `umami.track("oferta-z-testu", { skill: s.id })` (listener, nie atrybut
  data-umami-event, bo HTML wyniku jest wstrzykiwany dynamicznie).
- `zapis` bez zmian.

## 3. RYZYKA i jak je zamykam

1. Regres maila z zestawem (stare rekordy, brakujące id). `nazwaSkilla()` dla
   nieznanego id zwraca obiekt bez pól `platny`/`cena`/`trial`, więc wpada
   w gałąź darmową z dotychczasowym zachowaniem; stare wpisy w `zapisy.jsonl`
   mają w `wynik` tylko darmowe id i renderują się identycznie jak dziś
   (dotyczy też ponownej wysyłki dla potwierdzonego adresu, która bierze
   `obecne.wynik`). Przed wdrożeniem test na `ZAPISY_TRYB=log` z trzema
   wynikami: sam darmowy, darmowy+płatny, płatny z trialem.
2. Rozjazd strona vs usługa zapisów. `zapisy.mjs` czyta `skille.json` RAZ przy
   starcie, a `daneQuizu` jest zainlinowane w index.html; wdrożenie częściowe
   (nowa strona, stary serwer) dałoby mail bez ceny. Zamknięcie: deploy
   kontenera jest atomowy (build i restart usługi w jednym wydaniu), a gałąź
   płatna w mailu ma fallback "cennik na stronie" przy braku `cena`.
3. Cache strony. HTML nie ma nagłówka Cache-Control (nginx-kontener.conf nadaje
   go tylko CSS/fontom/og), więc przeglądarki rewalidują po ETag; ryzyko
   starego quizu jest małe, a nawet stary quiz wysyła na `/api/zapis` wyłącznie
   darmowe id, które nowy serwer obsługuje bez zmian. Nic do roboty poza
   świadomością; NIE dodawać nowych nagłówków cache w tym wydaniu.
4. Fałszywe dopasowanie płatnych (pułapka "finanse"). Zamknięte konstrukcyjnie:
   scoring płatnych wyłącznie po kotwicach `k-*` zdobywanych jedną świadomą
   deklaracją w pytaniu 7, próg >= 1, osobna sekcja, zero wpływu na top 6
   darmowych.
5. Spadek ukończeń po 7. pytaniu i XSS przy nowych polach. Pytanie 7 jest
   jedno, wielokrotnego wyboru, z wyjściem "Żaden z powyższych"; ukończenia
   monitorujemy istniejącym `wynik-testu` (porównanie tygodnia przed i po).
   XSS domknięty helperem `esc()` na wszystkim, co idzie do innerHTML wyniku.

## 4. Czego NIE ruszać

- Copy zgody/RODO przy zapisie (`.consent` w strona.js) i treść
  `mailPotwierdzajacy`.
- Cała mechanika double opt-in: `/api/zapis` (w tym regex id i walidacja
  e-maila), `/api/potwierdz`, `/api/wypisz`, tokeny, `stan()`.
- Format i semantyka `zapisy.jsonl` (dziennik zdarzeń, ostatni wpis wygrywa).
- Ścieżka paczek: `/api/pobranie`, `/api/pobierz`, `plikPaczki()`,
  `paczki-zewnetrzne/`, budowa paczek w build.mjs (płatne dalej pomijane).
- Darmowy scoring, top 6, nagłówki liczebnikowe i panel capture w
  `pokazWynik()`.
- `/api/feedback`, limit zapytań, klient SMTP.
- Nagłówki cache w nginx-kontener.conf.
- Pole `gotowy` w `skille.json` (obecna semantyka zostaje, tylko dochodzą
  `cena` i `trial`).
