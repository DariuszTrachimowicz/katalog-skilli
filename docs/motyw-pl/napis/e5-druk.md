# E5. Raport projektanta DTP i druku: nadawca, ktory przezyje zmniejszenie

Soczewka: skalowalnosc i warianty uzycia. Test kazdego konceptu: plansza pelna,
podglad 200 px szerokosci, awatar 64 px, stopka PDF, pieczatka gumowa i nadruk
w jednym kolorze (sito, tampon, grawer). Wszystko liczone od obecnej planszy
1460x880 px (render 2x).

## Diagnoza: co z obecnej kompozycji sypie sie przy zmniejszaniu

- Dopisek "SKILLE AI" (IBM Plex Mono 27 px, tracking .3em, #787774): przy
  zmniejszeniu planszy do 200 px szerokosci litera ma 3.7 px, czyli znika
  pierwsza. Rozstrzelenie .3em pogarsza sprawe: przy malych rozmiarach oko
  nie skleja liter w slowo. Prog czytelnosci wersalikow mono to ok. 8 px,
  wiec obecny dopisek wymaga planszy co najmniej 580 px szerokosci. Do tego
  #787774 na #FBFBFA to najnizszy kontrast w kompozycji, a w druku
  jednokolorowym szarosc staje sie rastrem ok. 55 procent, ktorego pieczatka
  gumowa i grawer nie oddadza wcale.
- Pieczatka okragla: na planszy zajmuje 250 px, przy 200 px szerokosci calosci
  ma 34 px srednicy. Tekst otoku (13 px w viewBox 200) ma wtedy rownowartosc
  2.2 px, a faktura feTurbulence (baseFrequency 0.55) zamienia sie w brudna
  plame. Filtr tuszu jest tez nie do oddania w druku: opacity .55 i .93 oraz
  wygryzienia szumem to efekty rastrowe, a realna pieczatka gumowa robi
  wlasna fakture sama z siebie. Do druku pieczec musi istniec w wersji
  czysto liniowej, bez filtra i bez opacity.
- Kreska korektorska: drugie pociagniecie (stroke 2.6, opacity .55) ginie
  ponizej ok. 400 px szerokosci planszy i nie istnieje w druku 1-bit.
  Pierwsze pociagniecie (5.4 w viewBox wysokosci 14, rozciagane non-uniform)
  przy 200 px ma ok. 1 px i zaczyna aliasowac.
- Haslo w Instrument Serif trzyma sie najlepiej (152 px skaluje sie do
  20.8 px przy 200 px szerokosci), ale to krój wysokokontrastowy: wlosowate
  kreski szeryfow pekaja w grawerze i na pieczatce gumowej ponizej ok.
  0.2 mm grubosci linii. Werdykt: przy 200 px z calej kompozycji zostaje
  samo haslo, nadawca i pieczec odpadaja. Dokladnie odwrotnie niz trzeba.

## Koncept 1: NADAWCA SERIFEM

Opis. Dopisek mono zostaje zastapiony pelnoprawnym logotypem w tym samym
kroju co haslo: "Skille AI" w Instrument Serif 72 px, "Skille" w atramencie,
"AI" w czerwieni serwisu. Nadawca dostaje dwa najsilniejsze aktywa
kompozycji: skale szeryfa i jedyna poza kreska czerwien, wiec przestaje
ginac, a proporcja 72/152 (ok. 0.47) nie pozwala mu konkurowac z haslem.
Z punktu widzenia druku to najbezpieczniejszy ruch: zero tekstury, zero
trackingu, zero szarosci ponizej progu, czysta typografia, ktora w jednym
kolorze po prostu robi sie cala atramentowa i dalej czyta sie jako nazwa.
Przy 200 px szerokosci planszy logotyp ma 9.9 px i pozostaje czytelny tam,
gdzie obecny dopisek znika trzykrotnie wczesniej.

Specyfikacja wykonawcza:

- Plansza bez zmian: 1460x880 px, tla #FBFBFA / #17181B / transparent.
- Nadawca: Instrument Serif 400, 72 px, letter-spacing -0.01em,
  margin 0 0 40px 4px (4 px koryguje optyczny lewy brzeg szeryfa wzgledem P).
  "Skille" #1F2023 (ciemne t3o: #F4F2EC), "AI" #9F2F2D (ciemne tlo: #CE6B66).
- Haslo bez zmian: 152 px, #1F2023 / #F4F2EC, linia 3 kursywa #4A4B4F / #B7B6B1.
- Kreska korektorska: w wariantach do druku i ponizej 400 px renderu tylko
  pierwsze pociagniecie, stroke-width podniesione do 6, bez opacity.
- Pieczatka na wariancie pelnym bez zmian pozycji (right -88px, bottom -64px,
  rotate -12deg), ale opacity zdjete z .93 do 1 w plikach do druku.
- Szkic: `<p class="nadawca">Skille&nbsp;<span class="ai">AI</span></p>`
  i `.nadawca{font:400 72px 'Instrument Serif';color:#1F2023}
  .nadawca .ai{color:#9F2F2D}`.

Ryzyka. Na wariancie pelnym czerwien wystepuje w trzech punktach (AI, kreska,
pieczec) i moze zaczac sie rozpraszac; w jednym kolorze "AI" traci
wyroznienie i hierarchia opiera sie wylacznie na rozmiarze.

## Koncept 2: RAMKA NADAWCY (pieczec prostokatna)

Opis. Nadawca zostaje zwiazany z jezykiem pieczeci, ale w formie prostokatnej
ramki, ktora skaluje sie nieporownanie lepiej niz okragly otok: tekst lezy
poziomo, bez textPath, wiec czytelnosc spada liniowo, a nie katastrofalnie.
Na planszy pelnej ramka "SKILLE AI / ORYGINAL · NIE TLUMACZONE" zastepuje
okragla pieczatke w prawym dolnym rogu (okragla zostaje osobnym aktywem do
stemplowania materialow), przez co nadawca dostaje forme i czerwien naraz.
Ta sama ramka dziala samodzielnie jako sygnatura: w stopce PDF, na wizytowce
przy danych firmy i jako naklejka, do szerokosci ok. 110 px.

Specyfikacja wykonawcza:

- SVG, viewBox 0 0 460 232, wszystko w jednym kolorze #9F2F2D
  (wariant na ciemne: #CE6B66; druk 1-kolor: currentColor):
  - rect x=8 y=8 width=444 height=216, rx=10, stroke-width 6, fill none;
  - "SKILLE AI": IBM Plex Mono 500, 58 px, letter-spacing 10, text-anchor
    middle, x=230, y=104;
  - linia pozioma: x1=64 x2=396 y=134, stroke-width 3;
  - "ORYGINAL · NIE TLUMACZONE": IBM Plex Mono 500, 26 px,
    letter-spacing 5, x=230, y=182.
- Na planszy: szerokosc 300 px, right -40px, bottom -28px, rotate -4deg.
  Litery "SKILLE AI" maja wtedy ok. 38 px, wiec ramka czyta sie nawet
  w miniaturze planszy 600 px.
- Filtr tuszu (feTurbulence) wolno wlaczyc tylko przy renderze ramki
  szerszym niz 280 px; ponizej i we wszystkich plikach do druku ramka jest
  czysto liniowa. Minimalna grubosc linii w druku 0.2 mm, wiec na wizytowce
  ramka nie moze byc wezsza niz ok. 24 mm.
- Prog degradacji: ramka pelna do 110 px szerokosci; ponizej zostaje sama
  gorna czesc (rect + SKILLE AI, bez wiersza dolnego).

Ryzyka. Dwie pieczecie na jednej planszy to parodia kancelarii, wiec ramka
musi zastapic okragla, nie stanac obok niej; przy 64 px awatara nawet ramka
jest juz nieczytelna, wiec koncept i tak wymaga osobnego monogramu.

## Koncept 3: DRABINKA SYGNATUROWA (lockup poziomy + monogram)

Opis. Zamiast jednej kompozycji, ktora ma przezyc wszystko, jawna drabinka
trzech stopni z twardymi progami przelaczania, jak w kazdej ksiedze znaku.
Stopien A to plansza pelna (haslo + nadawca wg konceptu 1). Stopien B to
lockup poziomy do naglowkow, stopek i pasków: "Skille AI" serifem, pionowa
czerwona belka jako separator, haslo jedna linijka w mono. Stopien C to
monogram do 64 px: uproszczone serce pieczatki, bo w tym rozmiarze nazwa
nadawcy i tak stoi obok awatara jako tekst profilu, a znak ma tylko byc
rozpoznawalny. Kazdy stopien jest osobnym plikiem, wiec nic nie jest
"pomniejszona plansza".

Specyfikacja wykonawcza:

- Stopien B, lockup poziomy, wysokosc 120 px, calosc ok. 1240 px:
  - "Skille AI": Instrument Serif 400, 76 px, "AI" #9F2F2D;
  - belka pionowa: 6x64 px, rx 3, #9F2F2D, odstepy 28 px z obu stron
    (prosty prostokat, bez tekstury, przezyje kazdy druk);
  - "PISANE OD ZERA POD POLSKIE REALIA": IBM Plex Mono 500, 20 px,
    letter-spacing .12em, #4A4B4F (ciemne tlo: #B7B6B1), wyrownanie do
    linii bazowej nazwy.
  - Progi: pelny lockup od 900 px; w zakresie 300-900 px bez czesci mono
    (sama nazwa "Skille AI"); ponizej 300 px monogram.
- Stopien C, monogram 512x512 (awatar, favicon):
  - okrag r=232, stroke-width 20, #9F2F2D;
  - "PL": Instrument Serif 400, 220 px, text-anchor middle, y=300;
  - kreska pod PL: path lukiem jak w pieczatce, stroke-width 16;
  - zadnego otoku tekstowego, zadnej turbulencji, zadnego opacity.
  - W 64 px linie maja odpowiednio 2.5 i 2 px, czyli sa nad progiem
    renderowania; obecna pieczatka w 64 px jest juz tylko rozowym kolkiem.

Ryzyka. Monogram niesie "ORYGINAL PL", nie nazwe nadawcy, wiec buduje znak
jakosci, a nie logo firmy; jesli wlasciciel chce nazwy w awatarze, jedyna
czytelna opcja to samo "AI" i to jest generyczne.

## Minimalny zestaw plikow wynikowych

Obecnie generator produkuje 14 PNG w trzech stopniach wtajemniczenia, z czego
srodkowa osemka (napis-* i napis-skille-ai-*) dubluje sie funkcjonalnie.
Warianty na tle solidnym sa potrzebne tylko tam, gdzie plik idzie w swiat
bez podkladu (OG image); wszedzie indziej wystarczy przezroczystosc.

1. plansza-pelna-przezroczysta.png i -biala.png (tekst ciemny / jasny): 2
2. plansza-og-jasna.png (1200x630, tlo #FBFBFA, do social/OG): 1
3. lockup-poziomy-przezroczysty.png i -bialy.png: 2
4. pieczatka-pl.png i pieczatka-pl-rozjasniona.png (z faktura, ekran): 2
5. pieczatka-pl-prosta.svg (liniowa, currentColor, bez filtra i opacity;
   jedyny plik, ktory idzie do drukarni i do wykonawcy pieczatki gumowej): 1
6. monogram-512.png + monogram.svg (awatar, favicon): 2

Razem 10 plikow zamiast 14, przy czym dochodza dwa, ktorych dzis brakuje
najbardziej: wektor do druku jednokolorowego i monogram. Warianty
napis-skille-ai-* do wycofania; goly claim bez nadawcy zostaje wylacznie
jako sekcja strony (HTML), nie jako osobne PNG.

## Rekomendacja

Rekomenduje koncept 1 (Nadawca serifem) jako zmiane planszy oraz stopnie
B i C z konceptu 3 jako uzupelnienie zestawu plikow, bo ta para rozwiazuje
oba problemy naraz: nadawca dostaje skale i czerwien na planszy, a kazdy
maly nosnik dostaje plik zaprojektowany w swoim rozmiarze zamiast
pomniejszonej planszy. Koncept 2 trzymam w zanadrzu jako sygnature do
stopki PDF i wizytowki, jesli po wdrozeniu K1 pieczec okragla okaze sie
zbyt slaba w materialach drukowanych.
