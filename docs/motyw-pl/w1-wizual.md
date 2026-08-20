# W1. Wizual (art director): motyw "pisane pod polskie realia"

Soczewka: forma bannera, kodowanie polskości bez kiczu, miniaturyzacja znaku
na podstrony i oferty. Wszystko wykonalne w istniejacym styl.css (paleta,
Instrument Serif + Inter Tight + IBM Plex Mono), nowe klasy: `.pl-fryz`,
`.znak-pl` i warianty.

## Idea przewodnia: polskie znaki

Polskosc kodujemy typografia, nie symbolika panstwowa. Nosnikiem sa polskie
znaki diakrytyczne: ą ć ę ł ń ó ś ź ż. To jest dosłownie to, czego nie ma
w tlumaczonych szablonach z GitHuba, wiec ornament sam opowiada przewage
produktu. Gra slow dziala po polsku podwojnie: "polskie znaki" to i litery,
i znaki rozpoznawcze.

Znak glowny motywu: litera **ł** (jedyna taka w duzych alfabetach lacinskich),
zlozona kursywa Instrument Serif w malym kolku na tuszu (`--ink`). Wyglada jak
czcionka zecerska, nie jak godlo. Skaluje sie w trzech rozmiarach:

1. HERO: pelny fryz dziewieciu znakow nad h1 (ornament redakcyjny),
2. PODSTRONA: badge `[ł] pisane pod polskie realia` w wierszu meta,
3. STOPKA / DROBNICA: samo kolko z "ł", 16 px, obok jednego zdania.

Ta sama forma, trzy gestosci. Zero flag, zero orlow, zero czerwieni "narodowej"
(paleta zostaje bez zmian: tusz, papier, burszytn platnych).

---

## A. HERO / BANNER strony glownej

### Kompozycja

Hierarchia bez zmian wzgledem obecnej sekcji `.hero` (eyebrow, h1, lede, CTA,
stats), dochodzi jeden cichy element: fryz znakow miedzy eyebrow a h1. Fryz
jest wyszarzony (`--muted`, opacity), tylko "ł" stoi w pelnym tuszu i kursywie,
co robi punkt kontrastu i prowadzi oko do h1. Linia bazowa fryzu przechodzi
w cienka kreske (`--line`) do prawej krawedzi, wiec calosc czyta sie jak
naglowek rozdzialu w skladzie ksiazkowym, nie jak dekoracja.

Rytm: mono-eyebrow (drobny, techniczny), fryz serif (ornament), h1 serif
(glos glowny z kursywa w trzeciej linii), lede sans. Kontrast tworzy trzecia
linia h1: najkrotsza, kursywa, po kropce. To jest "puenta" bannera.

### Teksty

eyebrow:

    Pisane po polsku · aktualizacja <data>

h1 (3 linie):

    Pisane od zera
    pod polskie realia.
    Nie tłumaczone.

(trzecia linia w `<em>`, czyli kursywa serif w kolorze `--ink-2`)

lede (2-3 zdania, max jak dzis 660 px):

    Złotówki, VAT, NIP, polskie urzędy i polszczyzna, którą naprawdę pisze
    się w biurze. Każdą umiejętność napisaliśmy ręcznie i sami uruchomiliśmy
    na polskich dokumentach w Claude i ChatGPT. Jeśli coś gdzieś nie działa,
    piszemy o tym wprost.

Obecne pytanie "Co sztuczna inteligencja może zrobić za Ciebie" nie ginie:
schodzi nizej, do sekcji testu, gdzie i tak pelni funkcje pytania (patrz D).

### Staty

Zostaja trzy, ta sama siatka `.stats`, przepisane pod motyw:

    33          umiejętności pisane ręcznie pod polskie realia
    30          gotowych do pobrania, sprawdzonych na polskich dokumentach
    2 modele    każda działa w Claude i ChatGPT, trwa runda testów Gemini

(liczby podstawia build; "trwa runda testów Gemini" tylko dopoki nie ma
raportow, potem "3 modele")

### HTML (podmiana w build.mjs, sekcja hero)

```html
<section class="hero">
  <div class="wrap">
    <p class="eyebrow">Pisane po polsku &middot; aktualizacja <strong>${dataPoPolsku(new Date())}</strong></p>
    <div class="pl-fryz" aria-hidden="true">
      <span>ą</span><span>ć</span><span>ę</span><span class="akc">ł</span><span>ń</span><span>ó</span><span>ś</span><span>ź</span><span>ż</span>
    </div>
    <h1>Pisane od zera<br>pod polskie realia.<br><em>Nie tłumaczone.</em></h1>
    <p class="lede">Złotówki, VAT, NIP, polskie urzędy i polszczyzna, którą
    naprawdę pisze się w biurze. Każdą umiejętność napisaliśmy ręcznie i sami
    uruchomiliśmy na polskich dokumentach w Claude i ChatGPT. Jeśli coś gdzieś
    nie działa, piszemy o tym wprost.</p>
    ...CTA i stats jak dziś...
  </div>
</section>
```

### CSS (dopisac do styl.css)

```css
/* ---------- motyw "polskie realia": fryz i znak ---------- */
.pl-fryz{display:flex;align-items:baseline;gap:16px;font-family:var(--serif);
  font-size:clamp(18px,2.2vw,24px);line-height:1;color:var(--muted);
  margin-bottom:20px;user-select:none}
.pl-fryz span{opacity:.45}
.pl-fryz .akc{opacity:1;color:var(--ink);font-style:italic;
  transform:translateY(-1px)}
.pl-fryz::after{content:"";flex:1;height:1px;background:var(--line);
  align-self:center;margin-left:8px}
@media(max-width:520px){.pl-fryz{gap:11px;font-size:17px}}

/* znak-badge: [ł] + podpis; wersja bazowa na podstrony skilli */
.znak-pl{display:inline-flex;align-items:center;gap:8px;
  border:1px solid var(--line);border-radius:9999px;background:var(--surface);
  padding:3px 12px 3px 3px;font-family:var(--mono);font-size:10.5px;
  letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);
  white-space:nowrap}
.znak-pl b{width:20px;height:20px;border-radius:50%;background:var(--ink);
  color:#fff;font-family:var(--serif);font-style:italic;font-weight:400;
  font-size:13px;display:grid;place-items:center;line-height:1;flex:0 0 auto}
/* wariant na strony ofert: kolko w bursztynie platnych, reszta bez zmian */
.oferta .znak-pl b{background:var(--akc)}
/* miniatura do stopki: samo kolko + zwykly tekst obok */
.znak-pl.mini{border:0;background:none;padding:0;text-transform:none;
  letter-spacing:0;font-family:var(--sans);font-size:13px;color:var(--muted)}
.znak-pl.mini b{width:16px;height:16px;font-size:11px}
```

Fryz jest `aria-hidden` (czysty ornament); badge niesie tekst, wiec czyta go
tez czytnik ekranu. Zadnych nowych fontow, kolorow ani zaleznosci.

## B. MOTYW NA PODSTRONACH skilli

Jeden element, jedno miejsce: badge `.znak-pl` w istniejacym wierszu
`.art .meta`, obok tagu kategorii i znacznika statusu (pierwszy z lewej,
zeby ustanawial kontekst zanim padnie kategoria):

```html
<div class="meta">
  <span class="znak-pl"><b>ł</b>pisane pod polskie realia</span>
  <span class="tag t-prawo">Prawo</span>
  <span class="dot d-gotowy"><i></i>Gotowy</span>
</div>
```

Celowo NIE dodajemy badge na karty katalogu (33 powtorzenia to szum; z tego
samego powodu z kart wylecialo pole "poziom"). Katalog dziedziczy motyw
z hero, ktory jest ekran wyzej.

Do stopki calego serwisu (footer, obok istniejacych linkow) miniatura:

```html
<span class="znak-pl mini"><b>ł</b>Każdy skill pisany od zera po polsku</span>
```

## C. MOTYW W OFERTACH platnych

Struktura 11 sekcji nietknieta. Trzy szwy:

1. Wiersz meta pod h1 oferty: ten sam badge co na podstronach; kolko
   automatycznie przejmuje bursztyn platnych przez regule `.oferta .znak-pl b`
   (spojnosc ze znacznikiem `.d-platny` i pakietami). Tekst wariantu
   ofertowego: `pisane i audytowane po polsku`.
2. Jedno zdanie w lede oferty (nie nowa sekcja, doklejka do akapitu
   otwierajacego): "Skill pisany od zera pod polskie realia i audytowany
   po polsku, nie tłumaczony z cudzego szablonu."
3. W sekcji "Formalności" jedna pozycja listy (patrz D), bo to miejsce,
   gdzie kupujacy szuka twardych faktow.

## D. Teksty gotowe do wklejenia

Eyebrow (strona glowna):

    Pisane po polsku · aktualizacja 20 sierpnia 2026

H1 (strona glowna):

    Pisane od zera pod polskie realia. Nie tłumaczone.

Lede (strona glowna):

    Złotówki, VAT, NIP, polskie urzędy i polszczyzna, którą naprawdę pisze
    się w biurze. Każdą umiejętność napisaliśmy ręcznie i sami uruchomiliśmy
    na polskich dokumentach w Claude i ChatGPT. Jeśli coś gdzieś nie działa,
    piszemy o tym wprost.

Staty (strona glowna):

    33 | umiejętności pisane ręcznie pod polskie realia
    30 | gotowych do pobrania, sprawdzonych na polskich dokumentach
    2 modele | każda działa w Claude i ChatGPT, trwa runda testów Gemini

Naglowek sekcji testu (przejmuje dawne pytanie hero):

    Co AI może zrobić za Ciebie w Twojej pracy? Sprawdź w minutę.

Badge (podstrona skilla):

    pisane pod polskie realia

Badge (oferta platna):

    pisane i audytowane po polsku

Zdanie do lede oferty:

    Skill pisany od zera pod polskie realia i audytowany po polsku,
    nie tłumaczony z cudzego szablonu.

Pozycja listy w "Formalnościach" oferty:

    Skill pisany od zera po polsku: ceny w zł, VAT, polskie konwencje
    dokumentów. Wersjonowany i aktualizowany.

Miniatura w stopce serwisu:

    Każdy skill pisany od zera po polsku

## Uwagi wykonawcze

- Zmiany w `build.mjs`: hero (linie ok. 361-378), szablon podstrony skilla
  (wiersz `.meta`), szablon oferty (meta + lede + formalnosci), footer.
- `narzedzia/grafiki.mjs` tez zawiera stary tekst hero (OG-grafiki?);
  po zatwierdzeniu motywu zaktualizowac spojnie: fryz znakow dobrze
  przenosi sie na obrazek OG (serif na papierze `--bg`).
- Fonty juz maja podzbiory latin-ext, wiec fryz nie dociaga niczego nowego.
- Zero emoji, zero dlugich myslnikow, zadnych nowych kolorow poza paleta.
