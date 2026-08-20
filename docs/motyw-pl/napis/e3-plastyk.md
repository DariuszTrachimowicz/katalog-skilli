# Raport plastyka: nadawca "Skille AI" jako gest w materii tuszu

Perspektywa: plastyk i ilustrator. Patrzę na planszę jak na kartkę po korekcie
redakcyjnej: papier (#FBFBFA), skład serif, po nim ślady dwóch narzędzi.
Obecna materia dzieli się czysto na dwie rodziny:

- gesty mokrego pisaka: kreska korektorska (SVG, dwa pociągnięcia, bez filtra),
- odbicia stempla: pieczątka ORYGINAŁ PL (feTurbulence wygryza tusz).

Dopisek "SKILLE AI" nie należy do żadnej rodziny. Jest zecerski, nie ma ani
gestu, ani odbicia, dlatego ginie: haslo ma skalę, kreska ma kolor, pieczątka
ma formę, a nadawca ma tylko szary tracking. Wszystkie trzy koncepty poniżej
dają nadawcy własną materię zamiast dokładać obcy element.

## Koncept 1: PODPIS Z PARAFKĄ

### Opis

Deklaracje się podpisuje. Haslo czyta się jak oświadczenie, więc nadawca
schodzi POD nie, do prawego dolnego rejonu, jako podpis: "Skille AI"
w Instrument Serif italic, "AI" w czerwieni, a pod spodem parafka, czyli
zamaszyste pociągnięcie SVG zbudowane dokładnie tą samą techniką co kreska
korektorska (dwa nakładające się pociągnięcia, bez faktury, bo to rodzina
mokrego pisaka). Nadawca dostaje jedyną jakość, której nikt inny na planszy
nie ma: gest ręki złożony pod tekstem, czyli autorstwo. W wariancie pełnym
pieczątka zahacza brzegiem o ogon parafki, jak na prawdziwym dokumencie,
gdzie stempel przybija się na podpisie.

### Specyfikacja wykonawcza

Płótno 1460 x 900 px (wariant z podpisem), blok jak obecnie. Dopisek górny
znika całkowicie.

Markup po `h1`:

```html
<p class="podpis">Skille <b>AI</b><svg class="parafka" viewBox="0 0 360 34"
  preserveAspectRatio="none" aria-hidden="true">
  <path d="M4,22 C60,10 170,4 260,10 C310,13 340,9 356,5"
        fill="none" stroke="__ATRAMENT__" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M30,27 C130,30 260,24 350,12"
        fill="none" stroke="__ATRAMENT__" stroke-width="1.6" stroke-linecap="round" opacity=".45"/>
</svg></p>
```

CSS:

```css
.podpis{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;
  font-size:64px;letter-spacing:-.01em;color:#1F2023;position:relative;
  display:block;text-align:right;margin:56px 230px 0 0}
.podpis b{font-weight:400;color:#9F2F2D}
.podpis .parafka{position:absolute;right:-14px;bottom:-30px;width:340px;height:34px}
```

Wariant ciemny: tekst #F4F2EC, "AI" #CE6B66, parafka #F4F2EC. Wariant pełny:
pieczątka zostaje na `right:-88px; bottom:-64px`; margines 230 px od prawej
sprawia, że otok pieczątki nachodzi na końcówkę parafki o 20-40 px, co jest
zamierzone (odbicie na podpisie). Trzecia linia hasla ("Nie tłumaczone.")
jest italikiem w #4A4B4F, podpis odróżnia się od niej pełnym atramentem
#1F2023, czerwonym "AI", mniejszym stopniem (64 vs 152 px) i wyrównaniem
do prawej.

### Ryzyka

Dwa italiki serif na planszy (linia 3 hasla i podpis) mogą się zlewać przy
małych rozmiarach podglądu; ratuje to różnica stopnia, koloru i wyrównania,
ale trzeba to sprawdzić na renderze 50%. Parafka to gest bardzo osobisty,
źle narysowana krzywa wygląda jak ozdobnik z clipartu, więc krzywe trzeba
stroić na renderze, nie w głowie.

## Koncept 2: PIECZĘĆ NAGŁÓWKOWA NADAWCY

### Opis

Polski dokument ma zwykle dwa stemple: prostokątną pieczęć firmową nadawcy
u góry i okrągłą pieczęć poświadczającą przy podpisie. Katalog ma już tę
drugą, więc nadawca dostaje pierwszą: prostokątny stempel "SKILLE AI"
w miejscu obecnego dopisku, odbity atramentem (nie czerwienią, żeby nie
konkurował z pieczątką ORYGINAŁ PL), z tą samą fakturą feTurbulence, ale
innym ziarnem, żeby dwa odbicia nie wyglądały jak klony. Nadawca dostaje
dokładnie to, czego mu brakowało według werdyktu: formę, i to formę z tej
samej rodziny materii co najsilniejszy element graficzny planszy. Lekki
obrót -2.4 stopnia mówi "przybite ręką", nie "wyrysowane w edytorze".

### Specyfikacja wykonawcza

SVG stempla (kolor: #1F2023 jasny / #F4F2EC ciemny, opacity .92):

```html
<svg class="stempel-nadawcy" viewBox="0 0 380 112" aria-hidden="true">
  <defs>
    <filter id="tusz2" x="-12%" y="-12%" width="124%" height="124%">
      <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="7" result="szum"/>
      <feColorMatrix in="szum" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.6 -0.25" result="maska"/>
      <feComposite in="SourceGraphic" in2="maska" operator="in"/>
    </filter>
  </defs>
  <g filter="url(#tusz2)" fill="none" stroke="__KOLOR__">
    <rect x="3" y="3" width="374" height="106" rx="2" stroke-width="3.6"/>
    <rect x="12" y="12" width="356" height="88" stroke-width="1.4"/>
    <text x="190" y="57" fill="__KOLOR__" stroke="none" text-anchor="middle"
      font-family="'IBM Plex Mono',monospace" font-size="33" font-weight="500"
      letter-spacing="7">SKILLE AI</text>
    <path d="M40,72 L340,72" stroke-width="1.4"/>
    <text x="190" y="93" fill="__KOLOR__" stroke="none" text-anchor="middle"
      font-family="'IBM Plex Mono',monospace" font-size="12" font-weight="500"
      letter-spacing="3.2">SKILLE.AIXPERTS.PL</text>
  </g>
</svg>
```

CSS i układ: `.stempel-nadawcy{width:330px;height:auto;display:block;
transform:rotate(-2.4deg);transform-origin:left bottom;margin:0 0 46px 4px;
opacity:.92}`. Płótno 1460 x 920 px. Podwójna ramka (3.6 / 1.4) celowo
powtarza logikę podwójnego okręgu pieczątki (4 / 1.6), przez co oba odbicia
czytają się jako komplet z jednego biurka. Dolna linijka z adresem jest
treścią typową dla pieczęci firmowej; jeśli adres w znaku jest niechciany,
stempel działa też jako sama nazwa z ramkami (wtedy viewBox 380 x 84,
tekst y=52, bez linii i dolnego wiersza).

### Ryzyka

Dwa stemple na jednej planszy w wariancie pełnym to dużo odbić, plansza może
zacząć wyglądać jak podanie do urzędu, a nie znak firmowy; ratunkiem jest
różnica koloru (atrament vs czerwień) i przekątna kompozycji (lewy górny vs
prawy dolny róg). feTurbulence na tekście 12 px potrafi wygryźć litery do
nieczytelności, ziarno i próg maski trzeba dostroić na renderze 2x.

## Koncept 3: CZERWONA ADNOTACJA REDAKTORA

### Opis

Kreska korektorska ma autora, a autor korekty podpisuje się na marginesie
tym samym czerwonym cienkopisem. Nadawca zostaje u góry, ale zmienia materię:
"Skille AI" w Instrument Serif italic 46 px, w czerwieni kreski, lekko
przekrzywiony, z odręcznym zakreśleniem (owalna pętla SVG dwoma
pociągnięciami, rodzina mokrego pisaka, bez faktury). To najmocniej wiąże
nadawcę z istniejącą narracją: ten sam tusz, ta sama ręka, która podkreśliła
"polskie realia". Czerwień daje natychmiastową widoczność, a mały stopień
i pozycja marginesu nie pozwalają konkurować z haslem.

### Specyfikacja wykonawcza

Markup zamiast obecnego `.dopisek`:

```html
<p class="adnotacja">Skille AI<svg class="zakr" viewBox="0 0 320 96"
  preserveAspectRatio="none" aria-hidden="true">
  <path d="M34,78 C6,58 14,22 70,12 C140,1 268,4 300,26 C324,44 308,74 240,84 C170,93 66,92 40,80"
        fill="none" stroke="__CZERWIEN__" stroke-width="3" stroke-linecap="round"/>
  <path d="M52,84 C20,66 24,28 84,16"
        fill="none" stroke="__CZERWIEN__" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>
</svg></p>
```

CSS:

```css
.adnotacja{font-family:'Instrument Serif',Georgia,serif;font-style:italic;
  font-size:46px;color:#9F2F2D;display:inline-block;position:relative;
  transform:rotate(-2deg);margin:0 0 44px 10px}
.adnotacja .zakr{position:absolute;inset:-20px -30px -16px -24px;width:auto;height:auto}
```

Wariant ciemny: #CE6B66. Pierwsze pociągnięcie pętli celowo nie domyka się
(start M34,78, koniec C...40,80 z prześwitem), drugie, lżejsze pociągnięcie
przecina początek, jak przy szybkim obwiedzeniu słowa dwa razy. Płótno
1460 x 900 px.

### Ryzyka

W korekcie redakcyjnej zakreślenie słowa częściej oznacza błąd niż autora,
część odbiorców może odczytać "Skille AI w kółku" jako "to jest do
poprawy". Trzy czerwone elementy w wariancie pełnym (adnotacja, kreska,
pieczątka) to górna granica; czerwień przestaje być akcentem i staje się
drugim kolorem planszy.

## Rekomendacja

Rekomenduję koncept 1, PODPIS Z PARAFKĄ: werdykt właściciela wylicza, że
haslo ma skalę, kreska kolor, a pieczątka formę, więc jedyną wolną jakością
na planszy jest gest autorstwa i to on powinien należeć do nadawcy, tym
bardziej że podpis pod oświadczeniem domyka narrację dokumentu (deklaracja,
korekta, podpis, stempel) zamiast dokładać kolejny element dekoracji.
Koncept 2 trzymam jako rezerwę tam, gdzie potrzebny jest nadawca bez zmiany
wysokości bloku hasla, np. w wariantach bez pieczątki.
