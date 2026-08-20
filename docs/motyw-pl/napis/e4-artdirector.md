# E4. Art director: hierarchia uwagi na planszy napisu

Perspektywa: zarządzanie uwagą odbiorcy. Co widzi w pierwszej sekundzie, co w trzeciej, co zapamięta.

## Diagnoza ścieżki oka (stan obecny)

Pierwsza sekunda: hasło. 152 px serifu na 1460 px planszy to bezdyskusyjna dominanta i tak ma być.
Trzecia sekunda: oko skacze do koloru. Czerwień jest jedynym chromatycznym akcentem planszy i występuje w dwóch miejscach naraz (kreska pod "polskie realia" i pieczątka), więc uwaga ląduje na kresce i zjeżdża do prawego dolnego rogu, gdzie kończy na stemplu. To on jest ostatnim, zapamiętanym obrazem.

Nadawca ginie z czterech powodów naraz:

1. Rozmiar: 27 px przy 152 px hasła to stosunek 1:5,6. Element poniżej progu "drugiego spojrzenia".
2. Kolor: #787774 na #FBFBFA to kontrast ok. 4:1, celowo przygaszony. Nadawca jest jedynym elementem planszy, ktory świadomie ścisza sam siebie.
3. Forma: rozstrzelone wersaliki mono (.3em) czytają się jak nadtytuł redakcyjny (kicker), czyli etykieta kategorii, nie nazwa własna. Dodatkowo ten sam krój i zapis co otok pieczątki, więc "SKILLE AI" zlewa się typograficznie z "ORYGINAŁ · PISANE OD ZERA".
4. Pozycja: lewy górny róg to punkt startu oka, ale oko startuje tam bez zatrzymania, bo nic go nie hamuje; cała grawitacja kompozycji (kreska, kursywa, stempel) ciągnie w dół i w prawo. Nadawca stoi tam, skąd uwaga natychmiast ucieka.

Wniosek: nadawca potrzebuje własnego atrybutu (skala, czerwień albo forma) i pozycji, w której oko KOŃCZY, a nie zaczyna. Poniżej trzy koncepty.

---

## Koncept 1: PODPIS I PIECZĘĆ

### Opis

Nadawca schodzi pod hasło i skleja się z pieczątką w jeden blok podpisu w prawym dolnym rogu, dokładnie tam, gdzie oko i tak kończy lekturę. "Skille AI" składamy dużym Instrument Serif, "AI" w czerwieni serwisu, a pomniejszony stempel odbija się tuż za nazwą, częściowo na nią nachodząc, jak pieczęć przybita na podpisie. Ścieżka oka robi się jednoznaczna: hasło (skala), kreska (kolor), podpis z pieczęcią (kolor + forma, punkt terminalny). Czerwone "AI" i czerwony stempel przestają konkurować, bo stają się jednym akcentem; górna krawędź planszy zostaje czysta, więc hasło zyskuje, a nie traci. Semantyka też pracuje: dokument z hasłem jest "podpisany i podstemplowany" przez nadawcę, co wprost wspiera narrację oryginału.

### Specyfikacja wykonawcza

- Płótno: 1460 x 880 px, tło #FBFBFA (ciemny wariant #17181B). Usunąć obecny `.dopisek` znad hasła.
- Hasło: bez zmian (Instrument Serif 400, 152 px, line-height 1.1, letter-spacing -.025em, #1F2023, linia 3 kursywa #4A4B4F, kreska #9F2F2D).
- Blok podpisu pod hasłem, wyrównany do prawej krawędzi hasła:
  - kontener: `display:flex; align-items:center; justify-content:flex-end; margin-top:56px; position:relative;`
  - linia prowadząca przed nazwą (jak linia na podpis w formularzu): pseudoelement `flex:1; height:1px; background:#B7B6B1; opacity:.55; margin-right:36px;` biegnie od lewej krawędzi bloku do nazwy;
  - nazwa: Instrument Serif 400, 72 px, letter-spacing -.02em; "Skille " w #1F2023, "AI" w #9F2F2D (ciemny wariant: #F4F2EC / #CE6B66); bez wersalików, pisownia dokładnie "Skille AI";
  - pieczątka: obecny SVG STEMPEL, 190 x 190 px, `transform:rotate(-9deg)`, opacity .9, ustawiona za nazwą z przesunięciem `margin-left:-34px; margin-bottom:-26px;` tak, by lewy łuk otoku nachodził na końcówkę "AI" o ok. 30 px i schodził ok. 26 px poniżej linii bazowej podpisu.
- Proporcje kontrolne: nazwa 72 px = 47% wysokości hasła. Wyraźnie podrzędna wobec hasła, wyraźnie nadrzędna wobec otoku stempla (13 px w viewBox).

Szkic markupu:

```html
<h1>Pisane od zera<br>pod <span class="kr">polskie realia<i></i></span>.<br><em>Nie tłumaczone.</em></h1>
<div class="podpis">
  <span class="nazwa">Skille <b>AI</b></span>
  [SVG pieczątki 190px, rotate -9deg]
</div>
```

```css
.podpis{display:flex;align-items:center;justify-content:flex-end;margin-top:56px}
.podpis::before{content:"";flex:1;height:1px;background:#B7B6B1;opacity:.55;margin-right:36px}
.nazwa{font-family:'Instrument Serif';font-size:72px;letter-spacing:-.02em;color:#1F2023}
.nazwa b{font-weight:400;color:#9F2F2D}
```

### Ryzyka

Nachodzenie stempla na "AI" wymaga strojenia co do piksela: za duży overlap zje czytelność nazwy, za mały rozklei blok na dwa elementy. W wariantach przezroczystych (do osadzania na stronach) blok podpisu podnosi wagę dołu grafiki, więc trzeba sprawdzić plansze, gdzie napis stoi nad przyciskiem CTA.

---

## Koncept 2: LOGOTYP NA CZELE

### Opis

Rozwinięcie kierunku z eksploracji właściciela: "Skille AI" przestaje być dopiskiem i staje się pełnoprawnym logotypem nad hasłem. Ten sam Instrument Serif co hasło, ale 80 px, z "AI" w czerwieni, pod spodem cienka linia oddzielająca nadawcę od claima. Nadawca zyskuje wszystkie trzy brakujące atrybuty naraz: skalę (80 px zamiast 27 px), kolor (jedyna czerwień w górnej połowie planszy) i formę (serif nazwy własnej zamiast mono etykiety). Ścieżka oka układa się w czerwony trójkąt: "AI" u góry, kreska w środku, stempel na dole, czyli oko wraca do nadawcy przy każdym obiegu planszy. Hasło nie słabnie, bo 152 px wobec 80 px utrzymuje czytelną dwustopniową hierarchię, a linia pozioma domyka logotyp, zanim zacznie się claim.

### Specyfikacja wykonawcza

- Płótno: 1460 x 940 px (o 60 px wyższe niż obecne 880 px, bo nagłówek jest wyższy niż stary dopisek), tło #FBFBFA / #17181B.
- Logotyp: Instrument Serif 400, 80 px, letter-spacing -.02em, wcięcie 6 px w lewo jak obecny dopisek; "Skille " #1F2023, "AI" #9F2F2D (ciemny: #F4F2EC / #CE6B66); `margin:0 0 22px 6px`.
- Linia pod logotypem: 2 px wysokości, szerokość 560 px (kończy się mniej więcej pod "od zera"), #B7B6B1, opacity .5, `margin:0 0 48px 8px`.
- Hasło: bez zmian (152 px, kolory jak obecnie).
- Pieczątka: zostaje w prawym dolnym rogu, ale schodzi do roli trzeciego głosu: 215 x 215 px (z 250), `right:-70px; bottom:-52px; rotate(-12deg); opacity:.85`. Mniejsza i cichsza, żeby czerwony trójkąt miał wierzchołek u góry (nadawca), a nie na dole (dowód).
- Kolejność uwagi do sprawdzenia na wydruku kontrolnym: hasło, potem "AI" w logotypie, potem kreska, potem stempel.

### Ryzyka

Trzy czerwone akcenty na jednej planszy to górna granica; jeśli render pokaże migotanie uwagi, pierwszy do ściszenia jest stempel (opacity .8), nie logotyp. Logotyp nad hasłem powtarza obecny schemat "nadawca na górze", więc w miniaturach (np. og:image skalowane do 400 px szerokości) trzeba sprawdzić, czy 80 px nie spada poniżej progu czytelności.

---

## Koncept 3: KONTRSYGNATA

### Opis

Nadawca wchodzi w formę, która już wygrywa uwagę: w pieczęć. Zamiast okrągłego stempla anonimowego dowodu, w prawym dolnym rogu stoi prostokątna pieczęć-ramka nadawcy: duże "SKILLE AI" w mono, pod spodem linia i "ORYGINAŁ PL", całość w czerwieni z fakturą tuszu i lekkim obrotem, jak ekslibris albo pieczęć firmowa na dokumencie. Problem konkurencji nadawcy z pieczątką znika, bo nadawca JEST pieczątką: jeden czerwony blok niesie i nazwę, i dowód. Ścieżka oka skraca się do dwóch kroków: hasło, potem czerwona sygnatura, i to nazwa nadawcy jest największym napisem wewnątrz tej sygnatury, więc to ją odbiorca zapamięta. Okrągła pieczątka nie ginie z systemu, żyje dalej jako samodzielny stempel (pieczatka-pl.png) do materiałów, tylko schodzi z tej planszy.

### Specyfikacja wykonawcza

- Płótno: 1460 x 880 px, tło #FBFBFA / #17181B. Usunąć `.dopisek` i okrągły STEMPEL z tej kompozycji.
- Hasło: bez zmian (152 px).
- Sygnatura (SVG, ten sam filtr feTurbulence co w STEMPEL, seed 11, baseFrequency 0.55): viewBox ok. 460 x 168;
  - ramka zewnętrzna: rect 452 x 160, stroke #9F2F2D (ciemny wariant #CE6B66), stroke-width 4, rx 6; ramka wewnętrzna: rect 436 x 144, stroke-width 1.6;
  - wiersz 1: "SKILLE AI", IBM Plex Mono 500, 44 px, letter-spacing .2em, fill #9F2F2D, wyśrodkowany, linia bazowa na ok. 40% wysokości ramki;
  - separator: pozioma linia stroke-width 1.6, długość ok. 70% szerokości ramki, wyśrodkowana;
  - wiersz 2: "ORYGINAŁ PL", IBM Plex Mono 500, 20 px, letter-spacing .34em, fill #9F2F2D, wyśrodkowany w dolnej strefie;
- osadzenie: `position:absolute; width:460px; right:-64px; bottom:-70px; transform:rotate(-4deg); opacity:.92;` górna krawędź ramki lekko nachodzi na wybieg kursywy "tłumaczone." (ok. 20 px), zachowując obecny efekt "przybite na tekście", ale bez zasłaniania kropki.
- Uwaga na duplikację treści: wewnątrz sygnatury NIE powtarzamy "pisane od zera" ani "nie tłumaczone", bo oba zdania stoją w haśle 30 px wyżej; ramka niesie wyłącznie nazwę i "ORYGINAŁ PL".

### Ryzyka

Nazwa zapisana wyłącznie stemplowanym mono w wersalikach może się kodować jako cecha produktu ("skille AI" jako kategoria), a nie nazwa własna; test: pokazać planszę osobie z zewnątrz na 5 sekund i spytać "kto to wydał". Czerwona ramka o tej masie jest mocniejsza niż okrągły stempel, więc na ciemnym tle (#CE6B66) trzeba skontrolować, czy nie przejmuje pierwszej sekundy kosztem hasła.

---

## Rekomendacja

Rekomenduję Koncept 1 (PODPIS I PIECZĘĆ): jako jedyny rozwiązuje jednocześnie oba konflikty planszy, bo daje nadawcy skalę, czerwień i pozycję terminalną, a przy tym redukuje dwa konkurujące czerwone punkty ciężkości do jednego bloku, w którym stempel uwierzytelnia nazwę zamiast ją zagłuszać. Koncept 2 trzymać jako wariant nagłówkowy do pasków i lockupów poziomych, gdzie układ "nazwa nad treścią" jest naturalny, ale na planszy claima to podpis, nie nagłówek, jest właściwym miejscem nadawcy.
