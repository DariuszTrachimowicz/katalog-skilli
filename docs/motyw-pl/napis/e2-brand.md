# E2, soczewka brandingowa: architektura znaku, w ktorej "Skille AI" nie ginie

Diagnoza z pozycji systemu: obecna plansza probuje byc trzema rzeczami naraz,
logo, claimem i stemplem. W takiej kompozycji nadawca zawsze przegra, bo eyebrow
27 px w kolorze przygaszonym (#787774) jest z definicji elementem serwisowym,
a nie tozsamosciowym. Rozwiazanie nie lezy w "pogrubieniu dopisku", tylko w
rozdaniu rol: co jest logo (nazwa), co jest claimem (haslo), co jest stemplem
(pieczec), i ktora rola gra na ktorej scenie (hero, naglowek, stopka, awatar).
Ponizej trzy koncepty, od najbardziej systemowego do najmniejszej ingerencji.

---

## Koncept 1: PODZIAL ROL (logotyp osobno, claim osobno)

### Opis

Realizuje wprost teze z inspiracji: "Skille AI" awansuje z dopisku na
pelnoprawny logotyp w Instrument Serif, z "AI" w czerwieni jako jedynym
akcentem kolorystycznym. Logo dostaje wlasny lockup: nazwa + cienka linia +
jedna linijka mono. Pelne trzyliniowe haslo przestaje byc "logo z dopiskiem"
i zyje dalej jako claim hero, czyli dokladnie obecna plansza, tylko BEZ
eyebrow (wariant napis-jasny/ciemny juz istnieje w generatorze). Nadawca nie
ginie, bo ma wlasna scene, na ktorej jest najwiekszym elementem, a na planszy
hero w ogole nie musi wystepowac, bo tam podpisem jest pieczec i kontekst
strony.

### Architektura znaku (co gdzie gra)

| Rola | Element | Sceny |
|---|---|---|
| Logo | lockup "Skille AI" + linia + linijka mono | naglowek strony, stopka maila, okladki PDF, awatar (sam skrot) |
| Claim | obecna plansza 3-linijkowa bez eyebrow, z kreska | hero, plansze social, banery |
| Stempel | pieczatka ORYGINAL PL (bez zmian) | naroznik hero, przy cenach, na dokumentach |
| Znaczek | pastylka "· ORYGINAL PL" | stopki, wiersze cennika, male przestrzenie |

### Specyfikacja wykonawcza

Lockup glowny (kanwa 1460x560 px, tlo #FBFBFA, blok wycentrowany, tekst do lewej):

- Nazwa: "Skille AI", Instrument Serif 400, 132 px, line-height 1,
  letter-spacing -0.02em. "Skille " w #1F2023, "AI" w #9F2F2D.
  Ciemne tlo #17181B: #F4F2EC i #CE6B66.
- Linia: 24 px pod baseline nazwy, wysokosc 2 px, kolor #B7B6B1
  (ciemne: #4A4B4F), szerokosc rowna szerokosci linijki mono pod nia.
- Linijka mono: 20 px pod linia, "PISANE OD ZERA POD POLSKIE REALIA",
  IBM Plex Mono 500, 23 px, uppercase, letter-spacing .27em, #787774
  (ciemne: #8C8B87). Szerokosc tej linijki przy .27em wypada ok. 1180 px,
  czyli krotko ponizej szerokosci nazwy, to jest poprawne optycznie.

```html
<div class="logo">
  <h1>Skille <span>AI</span></h1>
  <hr><p>Pisane od zera pod polskie realia</p>
</div>
<style>
.logo h1{font:400 132px/1 'Instrument Serif',Georgia,serif;
  letter-spacing:-.02em;color:#1F2023}
.logo h1 span{color:#9F2F2D}
.logo hr{border:0;height:2px;background:#B7B6B1;margin:24px 0 20px;width:100%}
.logo p{font:500 23px/1 'IBM Plex Mono',monospace;letter-spacing:.27em;
  text-transform:uppercase;color:#787774}
</style>
```

Wersja naglowkowa (pasek strony): nazwa 34 px, "AI" #9F2F2D, bez linii,
haslo mono 13 px letter-spacing .22em w tej samej linii po prawej,
pastylka "· ORYGINAL PL" (ramka 1.5 px #9F2F2D, radius 999 px,
padding 6px 14px, mono 12 px .18em) dosunieta do prawej krawedzi.

Claim hero: bez zmian wobec obecnych wariantow napis-jasny / napis-pelny,
tylko warianty "napis-skille-ai-*" (eyebrow) wychodza z uzycia.

### Ryzyka

Dwie plansze zamiast jednej: trzeba pilnowac, zeby claim hero nie funkcjonowal
nigdzie samotnie jako "logo" (np. udostepnienia social bez kontekstu strony),
wtedy nadawca znika calkowicie; na takich noskach musi isc wersja z logo w rogu.

---

## Koncept 2: PODPISANY DOKUMENT (nadawca jako sygnatura przy pieczeci)

### Opis

Plansza hero zostaje jednym znakiem, ale zmienia metafore: to dokument, ktory
ktos PODPISAL i podstemplowal. "Skille AI" schodzi z gory (gdzie bylo etykieta
serwisowa) na dol, jako odreczna ranga sygnatury zlozona obok pieczeci: duzy
kursywny podpis serif + mala czerwona kreska-zamaszysciecie pod nim. Nadawca
przestaje ginac, bo dostaje to samo, co pozostale elementy: forme (gest
podpisu), kolor (czerwone podkreslenie) i logiczne miejsce (podpis + pieczec
to naturalna para na polskim dokumencie, komplet "kto" i "czym reczy").
Czyta sie w naturalnej kolejnosci: haslo, potem kto to mowi.

### Specyfikacja wykonawcza

Kanwa 1460x920 px, blok jak obecnie, bez eyebrow (haslo startuje od gory bloku):

- Haslo: bez zmian, Instrument Serif 152 px, line-height 1.1,
  letter-spacing -.025em, #1F2023, linia 3 kursywa #4A4B4F,
  kreska pod "polskie realia" #9F2F2D jak w napis.mjs.
- Wiersz sygnatury: 72 px pod ostatnia linia hasla, wyrownany do prawej
  krawedzi bloku tekstu, flex, align-items center, gap 40 px:
  - Podpis: "Skille AI", Instrument Serif italic 400, 64 px, #1F2023
    (ciemne: #F4F2EC). Pod podpisem ta sama KRESKA co pod haslem
    (istniejacy SVG), szerokosc 105% szerokosci podpisu, wysokosc .1em,
    przesuniecie bottom -0.08em, kolor #9F2F2D (ciemne: #CE6B66).
  - Pieczec: obecny STEMPEL, 210 px, rotate(-12deg), opacity .93,
    nachodzaca gorna krawedzia ok. 40 px NAD linie bazowa wiersza,
    zeby nie stala sztywno w linii (position:relative; top:-28px).
- Pieczec znika z prawego dolnego rogu hasla (nie dubluje sie).

```html
<div class="sygnatura">
  <span class="podpis">Skille AI<i></i></span>
  <!-- STEMPEL 210px -->
</div>
<style>
.sygnatura{display:flex;justify-content:flex-end;align-items:center;
  gap:40px;margin-top:72px}
.podpis{position:relative;font:italic 400 64px/1 'Instrument Serif',serif;
  color:#1F2023}
.podpis i{position:absolute;left:-2%;right:-3%;bottom:-.08em;height:.1em;
  background:url("data:image/svg+xml,KRESKA(%239F2F2D)") no-repeat center/100% 100%}
</style>
```

### Ryzyka

Podpis kursywa serif sasiaduje stylistycznie z "Nie tlumaczone." (tez italic
serif); roznica skali 152 vs 64 px i przesuniecie w prawy dol powinny to
rozdzielic, ale trzeba sprawdzic na renderze. Dwie czerwone kreski na jednej
planszy to swiadome powtorzenie gestu, przy zlym wywazeniu moze jednak
rozproszyc akcent korektorski na hasle.

---

## Koncept 3: RAMKA NADAWCY (eyebrow dostaje forme stempla)

### Opis

Najmniejsza ingerencja: uklad zostaje, ale "Skille AI" przestaje byc golym
napisem i dostaje forme z rodziny pieczeci, prostokatna ramke odbita tuszem
atramentowym, z czerwonym kwadracikiem jako sygnalem koloru. To odpowiedz
wprost na diagnoze wlasciciela: haslo ma skale, kreska kolor, pieczatka forme,
wiec nadawca tez dostaje forme (ramka stempla) i szczypte koloru (czerwony
punkt), nie ruszajac skali hasla. Ramka wiaze nadawce z pieczatka w jedna
rodzine "znakow odbitych", wiec kompozycja dalej ma jedna logike.

### Specyfikacja wykonawcza

- Kontener: inline-block nad haslem, margin 0 0 48px 8px,
  border 2.5 px solid #1F2023 (ciemne: #F4F2EC), padding 12px 22px 12px 18px,
  transform rotate(-1.2deg), na calosc filtr tuszu z napis.mjs
  (feTurbulence baseFrequency .55, jak w STEMPEL, lzejsza maska: 1.6 -0.2),
  albo prosciej caly element jako maly SVG z tym samym filtrem.
- Tekst w ramce: "SKILLE AI", IBM Plex Mono 500, 27 px, uppercase,
  letter-spacing .3em, kolor PELNY atrament #1F2023 (koniec z #787774,
  to on byl glowna przyczyna giniecia).
- Czerwony punkt: kwadrat 10x10 px, #9F2F2D (ciemne: #CE6B66),
  w linii przed tekstem, margin-right 16 px, transform rotate(45deg)
  (romb, echo kropki z otoku pieczeci).
- Reszta planszy bez zmian (haslo 152 px, kreska, pieczatka w rogu).

```html
<p class="nadawca"><b></b>Skille AI</p>
<style>
.nadawca{display:inline-block;border:2.5px solid #1F2023;
  padding:12px 22px 12px 18px;transform:rotate(-1.2deg);
  font:500 27px/1 'IBM Plex Mono',monospace;letter-spacing:.3em;
  text-transform:uppercase;color:#1F2023;margin:0 0 48px 8px}
.nadawca b{display:inline-block;width:10px;height:10px;background:#9F2F2D;
  transform:rotate(45deg);margin-right:16px}
</style>
```

### Ryzyka

Na planszy pelnej sa wtedy dwa stemple (ramka u gory, kolo w dole), przy zlych
proporcjach zrobi sie "tablica ogloszen"; ramka musi zostac wyraznie mniejsza
i cichsza od pieczeci. Rotacja -1.2deg przy malych renderach moze wygladac jak
blad, nie jak zamiar, wtedy lepiej wyprostowac i zostawic sam filtr tuszu.

---

## Rekomendacja

Rekomenduje Koncept 1 (PODZIAL ROL): jako jedyny rozwiazuje problem
systemowo, nadawca dostaje wlasna scene, na ktorej jest gwiazda, zamiast
walczyc o uwage na cudzej, a obecna plansza hasla wchodzi do systemu bez
zmian jako claim. Koncept 3 warto potraktowac jako tania poprawke przejsciowa
dla istniejacych wariantow "napis-skille-ai-*", zanim lockup z Konceptu 1
wejdzie na strone.
