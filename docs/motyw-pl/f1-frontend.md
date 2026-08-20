# F1: soczewka WYKONALNOŚĆ (front-end wdrożeniowy)

Propozycja implementacji motywu "zbudowane na polskie realia". Wszystko w istniejącej
palecie i typografii (styl.css), bez nowego JS, responsywne z istniejących wzorców
(pigułki jak `.pf`/`.eyebrow`, siatka `.stats`). Każdy fragment jest gotowy do wklejenia.

Fakty użyte w tekstach pochodzą wyłącznie z briefu i z config.json (statusy, platformy).

---

## A. HERO strony głównej

Miejsce: `build.mjs`, funkcja `stronaGlowna()`, blok `<section class="hero">`
(obecnie linie ok. 362-378). Podmiana całego bloku.

### HTML (dokładny, do podmiany w template stringu)

```html
<section class="hero">
  <div class="wrap">
    <p class="eyebrow">Katalog pisany po polsku &middot; aktualizacja <strong>${dataPoPolsku(new Date())}</strong></p>
    <h1>Skille budowane od zera<br>pod <em>polskie</em> realia,<br>nie tłumaczone z szablonów.</h1>
    <p class="lede">Złotówki, VAT, NIP, polskie pisma urzędowe i biurowa polszczyzna są tu punktem wyjścia, a nie doklejonym tłumaczeniem. Każdą umiejętność uruchomiliśmy sami na polskich dokumentach, a wynik testu, także to, na czym się wywala, opisujemy wprost na jej karcie.</p>
    <ul class="pl-dowody">
      <li>zł &middot; VAT &middot; NIP &middot; faktury</li>
      <li>polskie urzędy i pisma</li>
      <li>granice prawne opisane wprost</li>
      <li>wersjonowane i aktualizowane</li>
    </ul>
    <div class="hero-cta">
      <a href="#test" class="btn">Dobierz skille dla siebie</a>
      <a href="#katalog" class="btn ghost">Przeglądaj katalog</a>
    </div>
    <p class="hero-note">Test zajmuje minutę. Nie musisz nic instalować, żeby zobaczyć wynik.</p>
    <div class="stats">
      <div class="stat"><b>${skille.length}</b><span>umiejętności napisanych ręcznie pod polskie dokumenty, żadna nie jest kopią z GitHuba</span></div>
      <div class="stat"><b>${gotowe}</b><span>gotowych do pobrania, każda przetestowana przez nas przed publikacją</span></div>
      <div class="stat"><b>${Object.keys(cfg.platformy).length} platformy</b><span>${Object.values(cfg.platformy).map((p) => p.nazwa).join(", ")}; status testu każdego skilla jest na jego stronie</span></div>
    </div>
  </div>
</section>
```

Uwagi wykonawcze:

- `em` w h1 dziedziczy istniejący styl `h1 em` (kursywa serif, `--ink-2`), zero nowego CSS.
- Trzeci stat liczy się z `cfg.platformy`, więc dojście Gemini (runda z 20 sierpnia 2026)
  już jest w nim widoczne, a przyszła czwarta platforma wejdzie sama. Znika też
  nieaktualna obietnica "każdy skill działa i w Claude, i w ChatGPT" (statusy per skill
  bywają "działa z zastrzeżeniami" / "nie testowane", stat mówi teraz prawdę z configu).
- Pasek `pl-dowody` to element wizualny motywu: cztery pigułki w języku wizualnym
  `.eyebrow`/`.pf` (mono, zielona kropka), flex z zawijaniem, więc na mobile układa się
  w 2 rzędy bez media query.

### CSS (dopisać w styl.css, po bloku `.stats`, ok. linii 64)

```css
/* motyw: zbudowane na polskie realia */
.pl-dowody{list-style:none;display:flex;gap:8px;flex-wrap:wrap;margin:-10px 0 34px}
.pl-dowody li{display:inline-flex;align-items:center;gap:7px;font-family:var(--mono);
  font-size:11.5px;letter-spacing:.04em;color:var(--ink-2);background:var(--surface);
  border:1px solid var(--line);border-radius:9999px;padding:6px 13px}
.pl-dowody li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--green-tx);flex:none}
```

(Ujemny górny margines dociąga pasek do lede, którego `margin-bottom:36px` zostaje bez zmian.)

---

## B. Motyw na podstronach skilli

Zasada: NIE dublujemy treści. Sekcja "Jak po polsku" już niesie motyw w treści każdej
karty (markdown w `wpis.md`), więc element motywu to mała klikalna pigułka w pasku
`.meta` pod tytułem, która kotwiczy do tej sekcji.

Miejsce 1: `build.mjs`, `stronaSkilla()`, blok `<div class="meta">` (ok. linia 191-196).
Po znaczniku wersji dopisać:

```js
${s.sekcja("Jak po polsku") ? `<a class="znak-pl" href="#po-polsku"><i></i>od zera po polsku</a>` : ""}
```

Miejsce 2: ta sama funkcja, pętla sekcji górnych (ok. linia 200-203), dodanie kotwicy
tylko sekcji "Jak po polsku":

```js
${["Dla kogo", "Ile Ci to oszczędza", "Przykład z życia", "Jak po polsku", "Czego potrzebujesz"]
  .filter((t) => s.sekcja(t))
  .map((t) => `<section class="blok"${t === "Jak po polsku" ? ' id="po-polsku"' : ""}><h3>${t}</h3>${s.sekcja(t)}</section>`)
  .join("")}
```

CSS (styl.css, obok bloku `.dot`/`.pf`):

```css
.znak-pl{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);
  font-size:11.5px;letter-spacing:.04em;color:var(--ink-2);background:var(--surface);
  border:1px solid var(--line);border-radius:9999px;padding:4px 11px;text-decoration:none;
  transition:border-color .2s,color .2s}
.znak-pl i{width:7px;height:7px;border-radius:50%;background:var(--green-tx);flex:none}
.znak-pl:hover{border-color:#D6D6D4;color:var(--ink)}
```

Dlaczego tak: pigułka jest w tym samym języku co `.pf` i `.eyebrow` (mono + kropka),
`html{scroll-behavior:smooth}` już jest, więc klik płynnie zjeżdża do sekcji. Skille
bez sekcji "Jak po polsku" po prostu nie dostają znaczka (warunek na `s.sekcja(...)`),
zero pustych kotwic.

---

## C. Motyw na stronach ofert płatnych

Struktura 11 sekcji w `skille/<id>/oferta.html` zostaje nietknięta; motyw wchodzi na
poziomie szablonu, czyli w `stronaOferty()` w build.mjs, więc obejmie wszystkie trzy
oferty (i każdą przyszłą) bez edycji plików ofert.

Miejsce: `stronaOferty()`, między blokiem triala a `${cialo}` (ok. linia 311-312):

```js
${existsSync(join(KORZEN, "paczki-zewnetrzne", `${s.id}-trial.skill`))
  ? formularzPobrania(`${s.id}-trial`, "Wypróbuj za darmo: wersja trialowa", { trial: true })
  : ""}
<p class="pl-nota">Jak wszystko w tym katalogu: napisany od zera pod polskie realia, w złotówkach i pod polskie prawo, z wprost opisanymi granicami tego, czego celowo nie robi.</p>
${cialo}
```

CSS (styl.css, w części "strona oferty"):

```css
.pl-nota{font-size:14px;color:var(--ink-2);line-height:1.6;border-left:2px solid var(--green-tx);
  padding:2px 0 2px 14px;margin:6px 0 26px}
```

Subtelnie (jedna linia, cienka zielona linia zamiast ramki), spójnie z `.blok blockquote`,
nie konkuruje z bursztynowym akcentem ofert (`--akc`). Opcjonalnie ten sam znaczek
`.znak-pl` można dodać w `.meta` oferty, ale bez `href` (oferty nie mają sekcji
"Jak po polsku"), więc rekomendacja: tylko `pl-nota`, bez znaczka, żeby nie tworzyć
martwej pigułki.

---

## D. Teksty gotowe do wklejenia (zbiorczo)

- Eyebrow: `Katalog pisany po polsku · aktualizacja <data>`
- H1: `Skille budowane od zera / pod polskie realia, / nie tłumaczone z szablonów.`
  ("polskie" kursywą przez `<em>`)
- Lede: `Złotówki, VAT, NIP, polskie pisma urzędowe i biurowa polszczyzna są tu punktem
  wyjścia, a nie doklejonym tłumaczeniem. Każdą umiejętność uruchomiliśmy sami na
  polskich dokumentach, a wynik testu, także to, na czym się wywala, opisujemy wprost
  na jej karcie.`
- Pigułki hero: `zł · VAT · NIP · faktury` / `polskie urzędy i pisma` /
  `granice prawne opisane wprost` / `wersjonowane i aktualizowane`
- Staty: `33: umiejętności napisanych ręcznie pod polskie dokumenty, żadna nie jest
  kopią z GitHuba` / `<gotowe>: gotowych do pobrania, każda przetestowana przez nas
  przed publikacją` / `3 platformy: Claude, ChatGPT, Gemini; status testu każdego
  skilla jest na jego stronie`
- Znaczek na podstronie skilla: `od zera po polsku` (link do sekcji "Jak po polsku")
- Nota w ofercie: `Jak wszystko w tym katalogu: napisany od zera pod polskie realia,
  w złotówkach i pod polskie prawo, z wprost opisanymi granicami tego, czego celowo
  nie robi.`

---

## (d) Legenda katalogu z cfg.statusy

Problem: legenda w `stronaGlowna()` (ok. linie 396-400) ma zaszyte stare etykiety
("format zgodny, nietestowane", "niedostępne w Polsce"), a config mówi już
"przetestowane / działa z zastrzeżeniami / nie testowane". Kolory kropek legendy to
te same wartości co statusowe kropki `.pf.ok/.pf.format/.pf.brak`.

Podmiana w build.mjs:

```js
<div class="legend">
  ${Object.entries(cfg.statusy).map(([k, et]) => `<span><i class="${k}"></i>${esc(et)}</span>`).join("\n      ")}
</div>
```

Dopisek w styl.css (obok istniejącego bloku `.legend`, kolory identyczne z `.pf i`):

```css
.legend i.ok{background:#4F8A55}
.legend i.format{background:#C79A2E}
.legend i.brak{background:#C0605E}
```

Efekt: legenda zawsze zgodna 1:1 z etykietami w dymkach `.pf` i w sekcji "Gdzie działa"
(oba już czytają `cfg.statusy`), przyszła zmiana etykiety to edycja jednego pola
w config.json. Inline'owe `style="background:..."` znikają z legendy.

---

## Lista plików i miejsc do zmiany

1. `build.mjs`
   - `stronaGlowna()`: podmiana bloku hero (A) i legendy (d).
   - `stronaSkilla()`: znaczek `.znak-pl` w `.meta` + `id="po-polsku"` na sekcji
     "Jak po polsku" (B).
   - `stronaOferty()`: `p.pl-nota` przed `${cialo}` (C).
2. `szablony/styl.css`
   - nowe klasy: `.pl-dowody` (A), `.znak-pl` (B), `.pl-nota` (C), `.legend i.ok/.format/.brak` (d).
3. Zero zmian w `skille/*/wpis.md`, `skille/*/oferta.html`, `szablony/strona.js`
   i w usłudze zapisów. Wersjonowanie arkusza (`?v=` z md5) załatwi cache samo.
