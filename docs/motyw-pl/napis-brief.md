# Brief: napis firmowy, druga runda konceptów

## Stan obecny (do obejrzenia: szablony/napis/, generator: narzedzia/napis.mjs)

Napis firmowy katalogu "Skille po polsku" (skille.aixperts.pl), trzy stopnie:

1. Haslo, 3 linie w Instrument Serif 152 px, sklad:
   "Pisane od zera / pod polskie realia. / Nie tlumaczone."
   Pod "polskie realia" czerwona kreska korektorska (#9F2F2D, dwa pociagniecia,
   lekkie wygiecie, przewieszenie poza slowa). Linia 3 kursywa, atrament o stopien cichszy.
2. Dopisek nadawcy "Skille AI" NAD haslem: IBM Plex Mono 500, 27 px,
   wersaliki, letter-spacing .3em, kolor przygaszony (#787774), wciecie 8 px.
3. Pieczatka "ORYGINAL PL" w prawym dolnym rogu: okragly stempel, w otoku
   "ORYGINAL · PISANE OD ZERA", w srodku PL z kreska, faktura tuszu, obrot -12 st.

## Problem (werdykt wlasciciela)

Dopisek "Skille AI" GINIE przy reszcie. Jest trzecim najslabszym elementem
kompozycji: haslo ma skale, kreska ma kolor, pieczatka ma forme, a nadawca
nie ma nic wlasnego. Nadawca ma byc widoczny od razu, ale nie moze
konkurowac z haslem.

## Zadanie

Zaproponuj 2-3 ROZNE koncepty. Kazdy moze byc:
- przeprojektowaniem samego elementu "Skille AI" (forma, miejsce, waga), albo
- inna kompozycja calego napisu (uklad, proporcje, relacje elementow),
o ile haslo zostaje tekstowo bez zmian.

Nie trzymaj sie obecnego ukladu "dopisek nad haslem". Wolno: przelamac szyk,
zwiazac nadawce z pieczatka, zrobic z nadawcy element graficzny, zmienic
proporcje. Nie wolno: oslabic hasla.

## Ograniczenia twarde

- Fonty TYLKO: Instrument Serif (regular + italic), IBM Plex Mono (400/500),
  Inter Tight (400/500/600). Wszystkie z polskimi znakami.
- Paleta serwisu: tlo #FBFBFA / #17181B, atrament #1F2023 / #F4F2EC,
  drugi plan #4A4B4F / #B7B6B1, przygaszony #787774 / #8C8B87,
  czerwien #9F2F2D / #CE6B66. Zadnych nowych kolorow.
- Wykonalne w HTML+CSS+SVG (render headless Chrome, jak teraz).
- Bez emoji, bez dlugich myslnikow, bez flag, orlow i folkloru:
  polskosc niesie forma i jezyk, nie symbole narodowe.
- "Skille AI" to nazwa nadawcy, pisownia dokladnie taka.

## Inspiracje od wlasciciela (projekt w Claude Design, obejrzane 20 sierpnia 2026)

Wlasciciel rownolegle eksplorowal logotyp z innym modelem. Kierunki, ktore mu sie
podobaja (traktuj jako inspiracje, nie gotowca):

- "Skille AI" jako PELNOPRAWNY logotyp: duzy Instrument Serif, "Skille" w atramencie,
  "AI" w czerwieni. Pod spodem cienka pozioma linia, nizej haslo JEDNA linijka
  w mono z rozstrzelonymi wersalikami: "PISANE OD ZERA POD POLSKIE REALIA".
- Pieczec dziala OSOBNO, w trzech formatach: okragla (otok ORYGINAL / NIE TLUMACZONE,
  srodek PL), prostokatna ramka ("ORYGINAL PL" + linia + "SKILLE AI · NIE TLUMACZONE"),
  pastylka "· ORYGINAL PL" (maly znaczek do stopek i przy cenach).
- Pasek naglowka na ciemnym tle: Skille AI (AI czerwone) + haslo mono w jednej linii
  + pastylka ORYGINAL PL z prawej.
- Teza tamtego projektu: nazwa + trzylinijkowe haslo + pieczatka W JEDNYM znaku
  to przesada; pelne trzyliniowe haslo zyje jako claim (nasza obecna plansza),
  a logo/lockup to nazwa + jedna linijka.
- Poziome lockupy hasla: "Pisane od zera" serif + PIONOWA czerwona kreska jako
  separator + "pod polskie realia." i mono "NIE TLUMACZONE".

Wolno te kierunki rozwijac, krzyzowac z nasza plansza albo zaproponowac cos
calkiem innego, byle nadawca przestal ginac.

## Format odpowiedzi (kazdy koncept)

1. NAZWA konceptu (krotka, robocza).
2. Opis 3-5 zdan: co sie zmienia i DLACZEGO to rozwiazuje problem ginacego nadawcy.
3. Specyfikacja wykonawcza: rozmiary px, kolory hex, pozycje, font, tracking;
   jesli trzeba, szkic markupu/CSS.
4. Ryzyka (1-2 zdania).

Na koncu raportu: ktory z Twoich konceptow rekomendujesz i dlaczego (2 zdania).
