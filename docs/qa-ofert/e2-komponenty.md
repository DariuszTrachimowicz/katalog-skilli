# E2. Spójność komponentów stron ofert (markup)

Zakres: `skille/polityka-ai/oferta.html` (dalej PA), `skille/oferta-behawioralna/oferta.html` (OB), `skille/operaty-szacunkowe/oferta.html` (OP).
Kontekst: `szablony/styl.css`, szablon `stronaOferty()` w `build.mjs` (wiersze 286-329).
Data: 20 sierpnia 2026. Ocena wyłącznie markupowa, bez oceny treści językowej.

## 1. Inwentarz komponentów per strona

| Komponent | PA | OB | OP |
|---|---|---|---|
| stawka-box + stawka-duze | jest | jest | jest |
| zakres2 (tak-lista / nie-lista) | jest (5/4 punktów) | jest (4/4) | jest (5/4) |
| pakiety (3x pakiet, wyroz w środku DOM) | jest | jest | jest |
| badge na wyroz | jest | jest | jest |
| pakiet-cena-sub z ceną brutto | jest | BRAK brutto | jest |
| li.nie w pakietach | brak | jest (2x) | brak |
| pakiety-nota | jest (rozbudowana) | jest (1 zdanie) | jest (rozbudowana) |
| kafle (dowód 11 do 0) | brak | jest | brak |
| ol.os (oś czasu) | brak | jest | brak |
| faq (details) | jest (5) | jest (4) | jest (6) |
| oferta-cta (h3 + p.lead + a.btn) | jest | jest | jest |
| formalnosci | jest (8 li) | jest (5 li) | jest (8 li) |

## 2. Rozbieżności markupu (każda znaleziona)

### R1. Kolejność pakietów: OB odwrócona
PA i OP: rosnąco po cenie (Sam system 890, wyroz System + wdrożenie 1 490, przegląd 2 900), wyroz to drugi div w DOM.
OB: malejąco (audyt 1 990, wyroz wdrożenie 990, Sam system 490); najdroższy pakiet stoi pierwszy, a jego punkt „Wszystko z pakietu «System + wdrożenie»" odwołuje się do pakietu, który w DOM pojawia się dopiero po nim (odwołanie w przód).

### R2. pakiet-cena-sub: OB bez ceny brutto
PA i OP: `netto, czyli X zł brutto dla konsumenta; płatność z góry` (we wszystkich trzech pakietach).
OB: tylko `netto, płatność z góry`. Brak informacji brutto dla konsumenta (spójność z formalnościami, patrz R7).

### R3. li.nie tylko w OB
OB używa `<li class="nie">` („czego ten pakiet nie ma, jest wyżej") w pakietach wdrożenie i Sam system. PA i OP nie używają tego wzorca wcale, mimo że `.pakiet li.nie` jest zdefiniowane w styl.css. Skutek: w PA/OP pakiety różnicuje tylko lista „na tak".

### R4. Sekcja kafle (dowód liczbowy) tylko w OB
Blok „Dlaczego możesz temu zaufać" w OB zawiera `div.kafle > div.kafel + div.kafel.po` (kafel-et, kafel-liczba, kafel-opis). PA i OP mają w tej sekcji wyłącznie akapity. Klasy kafle/kafel/po/kafel-et/kafel-liczba/kafel-opis są w styl.css, na PA i OP nieużyte.

### R5. Oś czasu (ol.os) tylko w OB
OB ma sekcję „Jak to przebiega w czasie": `ol.os > li > span.os-czas + b + span.o` (4 kroki). PA i OP nie mają tej sekcji w ogóle. Klasy os/os-czas/o zdefiniowane w styl.css, na PA i OP nieużyte.

### R6. Nagłówki kolumn zakres2 niespójne
PA i OP: `W zestawie` / `Czego celowo nie robi`. OB: `W zakresie` / `Poza zakresem`. Struktura (div.zakres2 > 2x div > h4 + ul) identyczna, różnią się etykiety h4.

### R7. formalnosci: OB ma 5 pozycji, PA i OP po 8
PA i OP (identyczny zestaw): Ceny i podatek (z cenami brutto), Sprzedawca (z CEIDG i mailem kontaktowym), Płatność, Licencja, Wymagania techniczne, Charakter, Prawo odstąpienia (konsument, model 3 warunków wygaśnięcia), Reklamacje.
OB: tylko Ceny (bez brutto), Sprzedawca (bez CEIDG i bez maila), Płatność, Licencja, Prawo odstąpienia. Brakuje: Wymagania techniczne, Charakter, Reklamacje. Dodatkowo pozycja „Prawo odstąpienia" w OB opisuje stary model (utrata prawa od razu przy zakupie), podczas gdy PA i OP mają nowszy, warunkowy model; to samo rozjechanie jest w sekcji „Twoje ryzyko" (punkt o zwrocie).

### R8. Sekcja „Twoje ryzyko": różny model zwrotu
Struktura identyczna (ul, 3x li ze strong), ale punkt o odstąpieniu w OB jest w starym brzmieniu (natychmiastowa utrata prawa), w PA i OP w nowym. Markup zgodny, komponent informacyjny niespójny między stronami.

### R9. p.lead w oferta-cta: różna druga część
Wszystkie trzy: `Zamów online: płatność BLIK, przelewem albo kartą, klucz licencji i paczka przychodzą mailem.` Dalej PA i OP: zdanie o fakturze proforma; OB: zdanie o trialu na górze strony. Struktura zgodna, wariant końcówki zależny od tego, czy skill ma trial (OB ma formularz trialowy wstawiany przez build.mjs).

### R10. Nagłówki sekcji stawki i zakresu inne per strona
h3 sekcji ze stawka-box: PA i OP `Co jest na stole`, OB `Co Cię to kosztuje bez zmian`. h3 sekcji z zakres2: trzy różne (`Pięć rzeczy, które powstają` / `Co wchodzi, a czego celowo nie robi` / `Co jest w środku`). To etykiety komponentów, nie treść perswazyjna, więc odnotowane jako niespójność nawigacyjna.

### R11. Liczba pozycji w pakietach
PA: 3/3/3. OP: 3/3/3. OB: 3/4/4 (z li.nie). Po przyjęciu kanonu z li.nie (R3) różnica zniknie albo stanie się zamierzona.

### R12. Format kwot
Netto wszędzie ze spacją tysięcy (`1 490 zł`), brutto w PA i OP bez spacji (`1094,70 zł`, `3567,00 zł`). Drobna niespójność zapisu wewnątrz tych samych stron; OB brutto nie podaje wcale (R2).

## 3. Elementy zgodne (bez uwag)

- Przycisk pakietu: `a.btn.pakiet-kup` z `href=".../zamow/<id>?pakiet=<slug>"`, `data-umami-event="zakup-pakiet"`, `data-umami-event-skill="<id>"`, tekst `Zamawiam ten pakiet`. Identyczny wzorzec na wszystkich trzech.
- Główny CTA: `a.btn` z `href=".../zamow/<id>"`, `data-umami-event="zakup"`, `data-umami-event-skill="<id>"`, tekst `Zamawiam`. Identyczny.
- Slugi pakietów wg schematu `sam-system` / `system-wdrozenie` / `system-<rozszerzenie>`. Spójne.
- badge: zawsze `span.badge` jako pierwsze dziecko `.pakiet.wyroz`, zawsze zaczyna się od `Rekomendowany`. Spójne.
- FAQ: `section.blok.faq > h3 + details(summary + p)`. Struktura identyczna, różna liczba pytań (5/4/6), co jest akceptowalne.
- oferta-cta: `div.oferta-cta > h3 + p.lead + a.btn + div.formalnosci(div.naglowek-f + ul)`. Struktura identyczna.
- Podwójne h3 w sekcji „Najbliższy krok" (h3 bloku + h3 wewnątrz oferta-cta) występuje na wszystkich trzech tak samo; styl.css stylizuje oba osobno, więc to świadomy wzorzec, nie błąd.

## 4. Klasy sieroty (użyte w plikach, brak w styl.css)

Brak. Wszystkie klasy użyte w trzech plikach mają definicje w `szablony/styl.css`:
blok, stawka-box, stawka-duze, zakres2, tak-lista, nie-lista, pakiety, pakiet, wyroz, badge, pakiet-nazwa, pakiet-dla, pakiet-cena, pakiet-cena-sub, powod, nie (jako `.pakiet li.nie`), pakiety-nota, btn, pakiet-kup, kafle, kafel, po, kafel-et, kafel-liczba, kafel-opis, os, os-czas, o (jako `.os span.o`), faq, oferta-cta, lead, formalnosci, naglowek-f.

Odwrotnie: klasy ofertowe zdefiniowane w styl.css a nieużyte na PA i OP: `kafle` z rodziną oraz `os` z rodziną oraz `.pakiet li.nie` (używa ich tylko OB). Nie kasować ze styl.css; docelowo użyć wszędzie (kanon niżej).

## 5. Kanon komponentów (jeden wzór)

1. **Kolejność sekcji:** sytuacja, stawka-box, co dostajesz, zakres2, pakiety, dlaczego tyle, zaufanie (z kaflami), ryzyko, oś czasu (ol.os), FAQ, oferta-cta z formalnościami. Wzorcem układu jest PA/OP plus dwa komponenty z OB (kafle, os), których tam brakuje.
2. **Pakiety:** rosnąco po cenie, wyroz zawsze drugi w DOM (środkowy). Odwołania „Wszystko z pakietu X" tylko wstecz. Slugi: `sam-system`, `system-wdrozenie`, `system-<rozszerzenie>`.
3. **pakiet-cena-sub:** zawsze `netto, czyli X zł brutto dla konsumenta; płatność z góry`. Zapis kwot ujednolicić: spacja tysięcy także w brutto (`1 094,70 zł`).
4. **Lista w pakiecie:** 3 pozycje „na tak" (li ze span.powod przy każdej) plus opcjonalnie 1 pozycja `li.nie` wskazująca, co jest w wyższym pakiecie; li.nie stosować konsekwentnie na wszystkich trzech stronach albo wcale (rekomendacja: stosować, wzorzec z OB).
5. **badge:** `span.badge` jako pierwsze dziecko `.pakiet.wyroz`, tekst zaczyna się od `Rekomendowany`.
6. **zakres2:** h4 kolumn ujednolicić do `W zestawie` / `Czego celowo nie robi` (wariant PA/OP, bo nazywa intencję, i już jest w dwóch plikach na trzy).
7. **Zaufanie:** akapit wstępny plus `div.kafle` z dwoma kaflami (kafel przed / kafel.po) tam, gdzie istnieje liczbowy dowód QA; każdy z trzech skilli taki dowód ma (audyty, panele, blokery do zera).
8. **Oś czasu:** `ol.os` z 4 krokami (os-czas + b + span.o): Od razu, Ten sam dzień, Pierwsze dni z pakietem wdrożeniowym, Najbliższy krok. Dodać do PA i OP.
9. **FAQ:** `section.blok.faq`, 4-6 pozycji `details > summary + p`; zawsze obecne pytanie o działanie w Claude/ChatGPT i o licencję lub granice narzędzia.
10. **oferta-cta:** `h3 Wybierz pakiet` + `p.lead` (część wspólna o płatności BLIK/przelew/karta i kluczu mailem; końcówka: proforma, a przy skillach z trialem zdanie o trialu) + `a.btn Zamawiam` + formalnosci.
11. **formalnosci:** pełny zestaw 8 pozycji jak w PA/OP: Ceny i podatek (z brutto), Sprzedawca (z CEIDG i mailem), Płatność, Licencja, Wymagania techniczne, Charakter, Prawo odstąpienia (model warunkowy: żądanie + potwierdzenie + mail), Reklamacje. OB uzupełnić o 3 brakujące pozycje i nowy model odstąpienia (także w sekcji „Twoje ryzyko").
12. **Zdarzenia Umami (już kanoniczne, utrzymać):** pakiet `data-umami-event="zakup-pakiet"` + `data-umami-event-skill`, główny CTA `data-umami-event="zakup"` + `data-umami-event-skill`. Opcjonalne wzmocnienie: dodać `data-umami-event-pakiet="<slug>"` na przyciskach pakietów, żeby raporty Umami rozróżniały pakiety bez parsowania URL; wtedy na wszystkich trzech stronach naraz.

## 6. Priorytet napraw

1. OB: formalnosci (3 brakujące pozycje, model odstąpienia) i brutto w pakiet-cena-sub; to rozjazd informacyjno-prawny, nie tylko wizualny (R2, R7, R8).
2. OB: kolejność pakietów rosnąco, wyroz w środku (R1).
3. PA i OP: dodać oś czasu i kafle; ujednolicić li.nie (R3, R4, R5).
4. Kosmetyka: nagłówki h4 zakres2, etykiety h3 sekcji, zapis kwot brutto (R6, R10, R12).
