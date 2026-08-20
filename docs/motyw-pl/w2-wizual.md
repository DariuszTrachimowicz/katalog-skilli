# W2, soczewka wizualno-typograficzna: motyw "zbudowane na polskie realia"

Autor: ekspert od reklamy wizualnej (plakat polski, layout prasowy).
Zakres: hero jako kompozycja czysto typograficzna + motyw jako powtarzalny
element systemowy w trzech rozmiarach (duży: hero, średni: podstrona skilla,
mały: oferta płatna i pasek meta). Wszystko w ramach istniejącego styl.css.

## Idea w skrócie

Motywem nie jest ilustracja ani flaga, tylko KRESKA REDAKCYJNA: krótki czerwony
segment linii (kolor już istnieje w palecie: `--red-tx: #9F2F2D`), zachowujący
się jak podkreślenie korektorskie w składzie prasowym. W dużej wersji podkreśla
słowo-klucz w h1, w średniej staje się znacznikiem "PL" w wierszu meta skilla,
w małej jest dwusegmentową linią (czerwony odcinek + szara reszta), którą można
położyć pod dowolnym nagłówkiem bez dotykania layoutu. Czerwień jest użyta
oszczędnie i typograficznie, więc czyta się jako "polskie" bez machania flagą,
i nie gryzie się z bursztynem ofert płatnych, bo w ofertach występuje tylko
wersja mała, monochromatyczna poza jednym segmentem.

Zasada systemowa: czerwony segment ma zawsze jedną rolę (wskazuje "to jest
zrobione pod Polskę") i nigdy nie jest ozdobą. Jeden element, trzy skale,
zero nowych kolorów w palecie.

---

## A. HERO/BANNER strony głównej

Kompozycja czysto typograficzna, jednokolumnowa jak dotąd: eyebrow ze
znacznikiem PL, trzy krótkie linie serifem z podkreśleniem korektorskim pod
słowem-kluczem i kursywą w ostatniej linii, potem lede i CTA bez zmian.
Rytm plakatowy: teza, doprecyzowanie, pointa.

### Teksty

Eyebrow:

```
PL · pisane w Polsce · aktualizacja 20 sierpnia 2026
```

(znacznik "PL" to element wizualny, patrz HTML niżej; reszta eyebrow w dotychczasowej konwencji mono)

h1, złamany na 3 linie:

```
Pisane od zera
pod polskie realia.
Nie tłumaczone.
```

Linia 2 niesie podkreślenie korektorskie pod "polskie realia" (duża wersja
motywu). Linia 3 idzie kursywą (`em`), zgodnie z istniejącym stylem `h1 em`,
i działa jak pointa plakatu: krótka, po kropce, bez wykrzyknika.

Lede (3 zdania):

```
Złotówki, VAT, NIP, polskie urzędy i polszczyzna biurowa są tu od pierwszej
linijki, a nie doklejone do cudzego szablonu. Każdą umiejętność uruchomiliśmy
sami: w Claude i ChatGPT, a od 20 sierpnia także w rundzie testów Gemini.
Tam, gdzie coś nie działa, piszemy o tym wprost przy skillu.
```

### Co ze statami

Staty zostają (dobrze kotwiczą dół hero), ale przechodzą na dowody motywu.
Środkowy stat "0" to typograficzny mocny punkt: zero jako liczba robi robotę,
której nie zrobi żaden przymiotnik.

```
33          umiejętności pisane ręcznie, każda z sekcją "Na czym się wywala"
0           tłumaczeń i szablonów: każdy skill budowany od zera pod zł, VAT i polskie pisma
3 modele    sprawdzone w Claude i ChatGPT, od 20 sierpnia także runda Gemini; status przy każdym skillu
```

### HTML hero (podmiana obecnej sekcji `.hero` w public/index.html)

```html
<section class="hero">
  <div class="wrap">
    <p class="eyebrow"><span class="pl-znak"><b>PL</b></span>pisane w Polsce &middot; aktualizacja <strong>20 sierpnia 2026</strong></p>
    <h1>Pisane od zera<br>pod <span class="pl-kreska">polskie realia</span>.<br><em>Nie tłumaczone.</em></h1>
    <p class="lede">Złotówki, VAT, NIP, polskie urzędy i polszczyzna biurowa są tu od pierwszej linijki, a nie doklejone do cudzego szablonu. Każdą umiejętność uruchomiliśmy sami: w Claude i ChatGPT, a od 20 sierpnia także w rundzie testów Gemini. Tam, gdzie coś nie działa, piszemy o tym wprost przy skillu.</p>
    <div class="hero-cta">
      <a href="#test" class="btn">Dobierz skille dla siebie</a>
      <a href="#katalog" class="btn ghost">Przeglądaj katalog</a>
    </div>
    <p class="hero-note">Test zajmuje minutę. Nie musisz nic instalować, żeby zobaczyć wynik.</p>
    <div class="stats">
      <div class="stat"><b>33</b><span>umiejętności pisane ręcznie, każda z sekcją "Na czym się wywala"</span></div>
      <div class="stat"><b>0</b><span>tłumaczeń i szablonów: każdy skill budowany od zera pod zł, VAT i polskie pisma</span></div>
      <div class="stat"><b>3 modele</b><span>sprawdzone w Claude i ChatGPT, od 20 sierpnia także runda Gemini; status przy każdym skillu</span></div>
    </div>
  </div>
</section>
```

Uwaga do eyebrow: obecny `.eyebrow::before` (zielona kropka) można zostawić,
znacznik PL stoi po niej; jeśli robi się tłoczno, kropkę wyłącza jedna linijka
`.eyebrow.z-pl::before{display:none}` i klasa `z-pl` na eyebrow.

### CSS motywu (dopisać na końcu styl.css, sekcja "motyw PL")

```css
/* ---------- motyw PL: kreska redakcyjna ---------- */
/* Duza wersja: podkreslenie korektorskie pod slowem-kluczem w h1. */
.pl-kreska{
  background:linear-gradient(transparent 86%, rgba(159,47,45,.55) 86%);
  padding-bottom:.05em;
  -webkit-box-decoration-break:clone;box-decoration-break:clone}

/* Srednia wersja: znacznik PL do wiersza meta / eyebrow. */
.pl-znak{display:inline-flex;align-items:center;gap:8px;
  font-family:var(--mono);font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-2)}
.pl-znak b{font-weight:600;color:var(--ink);background:var(--surface);
  border:1px solid var(--line);border-bottom:2px solid var(--red-tx);
  border-radius:4px;padding:2px 7px;line-height:1.4}

/* Mala wersja: linia dwusegmentowa (czerwony odcinek + reszta w --line). */
.pl-pasek{height:2px;border-radius:2px;
  background:linear-gradient(90deg,var(--red-tx) 0 36px,var(--line) 36px)}
.pl-pasek.duzy{background:linear-gradient(90deg,var(--red-tx) 0 72px,var(--line) 72px)}

/* Akcent bloku "Jak po polsku" na podstronie skilla. */
.blok.jak-pl{border-top:0;padding-left:20px;position:relative}
.blok.jak-pl::before{content:"";position:absolute;left:0;top:34px;bottom:28px;
  width:2px;border-radius:2px;background:var(--red-tx);opacity:.5}
.blok.jak-pl h3{color:var(--red-tx)}
```

Wszystko w istniejącej palecie: jedyny kolor motywu to `--red-tx`, używany
dotąd tylko w tagu "Prawo" i komunikacie błędu, więc kreska nie koliduje
z żadnym istniejącym znaczeniem na stronie głównej. Fonty bez zmian
(mono do znacznika, serif do h1).

---

## B. Motyw na podstronach skilli (wersja średnia)

Dwa punkty styku, oba bez przebudowy layoutu:

1. **Znacznik PL w wierszu `.meta`**, obok tagu kategorii i statusu, jako link
   kotwiczny do istniejącego bloku "Jak po polsku":

```html
<a class="pl-znak" href="#jak-po-polsku" title="Czym różni się od tłumaczonego szablonu"><b>PL</b>na polskie realia</a>
```

   (element `a` dziedziczy kolor, wystarczy `text-decoration:none` w linku
   albo dopisek `.pl-znak{text-decoration:none}` do CSS wyżej)

2. **Blok "Jak po polsku" dostaje akcent motywu**: `id="jak-po-polsku"` oraz
   klasę `jak-pl` (CSS wyżej). Efekt: cienka czerwona linia z lewej i nagłówek
   bloku w kolorze kreski. To ta sama kreska co w hero, obrócona do pionu,
   więc czytelnik, który przyszedł ze strony głównej, rozpoznaje sygnał
   "tu jest polska robota" bez jednego dodatkowego słowa.

```html
<section class="blok jak-pl" id="jak-po-polsku"><h3>Jak po polsku</h3> ... </section>
```

Nic więcej. Podstrona jest gęsta od treści, średnia wersja motywu ma być
drogowskazem do już istniejącej sekcji, a nie nową warstwą ozdób.

---

## C. Motyw w ofertach płatnych (wersja mała)

Oferta ma własny akcent bursztynowy (`--akc:#B5791E`) i strukturę 11 sekcji,
której nie ruszamy. Motyw wchodzi trzema drobinami:

1. **Znacznik PL w wierszu `.meta` oferty**, identyczny jak na podstronach
   darmowych (spójność systemu ważniejsza niż lokalny kolor; znacznik jest
   niemal monochromatyczny, więc nie kłóci się z bursztynem).

2. **Pasek `.pl-pasek` bezpośrednio pod h1 oferty** (jedna linia HTML):

```html
<div class="pl-pasek" style="margin:6px 0 24px;max-width:260px"></div>
```

   Dyskretny sygnał systemowy w miejscu, na które patrzy każdy, zanim zacznie
   czytać sekcje.

3. **Jedno zdanie w sekcji "Dlaczego możesz temu zaufać"** (tekst w D),
   bez zmiany kolejności ani liczby sekcji; sekcja formalności już mówi
   o cenach w złotych netto i VAT, więc tam nic nie dokładamy.

---

## D. Teksty gotowe do wklejenia

Hero (eyebrow, h1, lede, staty): w sekcji A powyżej, w wersji finalnej.

Znacznik na podstronie skilla (średni):

```
PL  na polskie realia
```

Zdanie do sekcji "Dlaczego możesz temu zaufać" w ofertach płatnych:

```
Ten skill nie jest tłumaczeniem cudzego szablonu: powstał w Polsce, od zera,
pod polskie prawo, polskie dokumenty i polszczyznę biurową, i przeszedł te
same testy, co darmowa część katalogu.
```

Podpis paska w stopce katalogu (opcjonalnie, mała wersja motywu w `.foot`):

```
Pisane w Polsce, od zera, pod polskie realia.
```

Meta description strony głównej (spójna z nowym hero):

```
Umiejętności AI pisane od zera pod polskie realia: zł, VAT, urzędy i polszczyzna
biurowa. Nie tłumaczenia. Każda sprawdzona przez nas, statusy testów przy skillu.
```

Tekst alternatywny łamania h1, gdyby wersja główna okazała się za długa na
wąskich ekranach (2 linie zamiast 3):

```
Pisane pod polskie realia.
Nie tłumaczone.
```

---

## Kontrola zgodności z briefem

- Tylko prawdziwe przewagi: ręczne pisanie, granice prawne (stat 33 wskazuje
  sekcję "Na czym się wywala"), testy 2 modeli + runda Gemini z datą 20 sierpnia,
  wersjonowanie nie w hero (jest na kartach), zero obietnic ponad stan.
- Zero długich myślników, zero emoji, zero pustych sloganów; "Nie tłumaczone"
  to fakt o procesie, nie epitet wobec nazwanej konkurencji (GitHub pada tylko
  tam, gdzie już pada dziś, w stacie; w nowej wersji statów zniknął w ogóle).
- Paleta i typografia bez zmian, nowe klasy: `.pl-kreska`, `.pl-znak`,
  `.pl-pasek`, `.blok.jak-pl`.
- Estetyka redakcyjna: kreska korektorska, znacznik składu, linia łamu;
  żadnych flag, konturów Polski ani ilustracji.
