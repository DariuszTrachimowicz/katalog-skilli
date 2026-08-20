# E6. Soczewka: polska szkoła plakatu i polska typografia XX wieku

Punkt wyjścia historyka: obecna plansza ma już trzy dobre polskie tropy. Skala hasła
to odwaga polskiego plakatu (jedno zdanie na całą płachtę, jak u Młodożeńca i Świerzego),
czerwona kreska to gest redaktorski i malarski zarazem (Tomaszewski robił znak jednym
pociągnięciem), pieczątka to estetyka obiegu dokumentów, urzędowa i drukarska.
Nadawca ginie, bo jako jedyny nie dostał żadnego z tych języków: jest złożony jak
metka techniczna, przygaszony i mały. Poniżej trzy koncepty, każdy daje nadawcy
jeden konkretny, historycznie zakorzeniony język formy.

---

## Koncept 1: WINIETA

**Nazwa robocza:** Winieta (trop: winieta czasopisma, "Przekrój" i polska tradycja
redakcyjna nagłówka pisma).

**Opis.** "Skille AI" przestaje być metką, a staje się winietą: nazwą pisma nad
tekstem numeru. Duży Instrument Serif, "Skille" w atramencie, "AI" w czerwieni,
pod spodem podwójna linia redakcyjna na całą szerokość bloku. Hasło zostaje bez
zmian jako "artykuł" pod winietą. Nadawca zyskuje to, czego mu brakowało: skalę
(trzykrotnie większy niż dziś), kolor (czerwone "AI" wiąże go z kreską i pieczątką)
i strukturę (linia daje mu własne terytorium, zamiast zawieszenia w powietrzu).
To jest też kierunek najbliższy inspiracjom właściciela (logotyp + linia), tylko
z zachowaniem trzyliniowego hasła naszej planszy.

**Specyfikacja wykonawcza.**

- Płótno: 1460 x 940 px (o 60 px wyższe niż obecne 880, winieta potrzebuje oddechu).
- Winieta: Instrument Serif regular, 78 px, letter-spacing -0.015em, bez wersalików,
  pisownia dokładnie "Skille AI". "Skille" kolor #1F2023, "AI" kolor #9F2F2D
  (ciemny wariant: #F4F2EC i #CE6B66). Wcięcie 0, wyrównanie do lewej krawędzi hasła.
- Linia redakcyjna: pod winietą, szerokość 100% bloku tekstu, `border-top: 4px double #1F2023`
  (podwójna linia 1.5/1/1.5, klasyka winiet gazetowych; ciemny wariant #F4F2EC).
  Odstęp winieta-linia 16 px, linia-hasło 52 px.
- Hasło: bez zmian (Instrument Serif 152 px, line-height 1.1, letter-spacing -0.025em,
  kreska #9F2F2D pod "polskie realia", linia 3 kursywą w #4A4B4F).
- Pieczątka: zostaje w prawym dolnym rogu, zmniejszona z 250 do 225 px
  (winieta dodała czerwieni u góry, stempel może o pół tonu ustąpić), rotate -12deg,
  right -80px, bottom -56px, opacity .93.
- Szkic markupu:

```html
<div class="blok">
  <p class="winieta">Skille <span class="ai">AI</span></p>
  <div class="linia"></div>
  <h1>...haslo bez zmian...</h1>
  <!-- pieczatka -->
</div>
<style>
.winieta{font-family:'Instrument Serif',Georgia,serif;font-size:78px;
  letter-spacing:-.015em;color:#1F2023;margin:0 0 16px}
.winieta .ai{color:#9F2F2D}
.linia{border-top:4px double #1F2023;margin:0 0 52px}
</style>
```

**Ryzyka.** Dwa czerwone akcenty w pionie (AI, kreska) plus pieczątka to trzy plamy
czerwieni; trzeba pilnować, żeby "AI" nie było większe optycznie niż kreska
(stąd 78 px, nie 96). Winieta formalizuje kompozycję: plansza robi się bardziej
"pismo firmowe", mniej "plakat".

---

## Koncept 2: PODPIS KOREKTORA

**Nazwa robocza:** Podpis korektora (trop: marginalium redakcyjne i sygnatura
jednym gestem, jak sygnowanie plakatu przez autora; korekta w polskim obiegu
wydawniczym zawsze miała autora).

**Opis.** Kreska korektorska jest dziś najsilniejszym mikroelementem planszy,
ale jest anonimowa. W tym koncepcie to nadawca ją postawił: "Skille AI" staje się
podpisem korektora na prawym marginesie, tuż za końcem kreski, złożonym kursywą
Instrument Serif w tej samej czerwieni i lekko przekręconym, jak dopisek na
szczotce drukarskiej. Górny dopisek znika całkowicie, więc hasło zyskuje jeszcze
więcej powietrza, a nadawca zyskuje najcenniejsze miejsce planszy: koniec gestu,
tam gdzie oko kończy czytać "polskie realia". Nadawca przestaje być etykietą,
a staje się autorem poprawki, co jest dokładnie komunikatem marki: to my
poprawiamy "tłumaczone" na "pisane od zera".

**Specyfikacja wykonawcza.**

- Płótno: wraca do 1460 x 800 px (dopisek górny usunięty).
- Kreska: bez zmian geometrii, przewieszenie prawe zwiększone z -2% do -3.5%,
  żeby gest wyraźniej "wybiegał" w margines w stronę podpisu.
- Podpis: w markupie wewnątrz `.kr`, `position:absolute; left:calc(100% + 26px);
  bottom:-0.06em; white-space:nowrap; transform:rotate(-5deg)`.
  Font: Instrument Serif italic, 46 px, letter-spacing 0, kolor #9F2F2D
  (ciemny wariant #CE6B66), pisownia dokładnie "Skille AI".
  Szerokość napisu ok. 185 px; prawa krawędź wypada ok. x=1375, mieści się
  w płótnie 1460 z marginesem.
- Pod podpisem krótka kreska odręczna (ten sam SVG co KRESKA, przeskalowany):
  szerokość 120 px, wysokość 8 px, offset 4 px pod tekstem podpisu, opacity .85;
  to "podkreślenie parafki", wiąże podpis z językiem dużej kreski.
- Pieczątka: bez zmian (250 px, prawy dolny róg, rotate -12deg); podpis siedzi
  wyżej (na wysokości linii 2), więc nie koliduje.
- Wariant bez pieczątki (napis-skille-ai-*): podpis zostaje jedynym znakiem
  nadawcy, kompozycja nadal kompletna.

**Ryzyka.** 46 px czerwonej kursywy to element czytelny na planszy, ale na
miniaturach (np. og-image przeskalowany do 400 px szerokości) podpis ma ok. 13 px
wysokości i może się zlewać; wymaga testu w małym rozmiarze. Trzy czerwone
elementy po prawej stronie (kreska, podpis, pieczątka) mogą przeciążyć prawą
połowę kompozycji.

---

## Koncept 3: PION NEONOWY

**Nazwa robocza:** Pion neonowy (trop: liternictwo polskich neonów miejskich,
napisy montowane pionowo na masztach i narożach kamienic; oś pionowa to też
klasyczny chwyt polskiego plakatu przy tytułach).

**Opis.** Nadawca dostaje własną oś: pionowa belka po lewej stronie hasła,
"SKILLE AI" czytane od dołu do góry wzdłuż cienkiego masztu, jak neon na
elewacji. Zero konkurencji z hasłem, bo nadawca żyje na innym kierunku czytania;
jednocześnie jest pierwszym elementem od lewej krawędzi, więc fizycznie nie może
zginąć. Rozstrzelone wersaliki Inter Tight na cienkiej linii niosą charakter
powojennego liternictwa ulicznego bez jednego piksela folkloru: to polskość
miasta, nie skansenu. Kompozycja zyskuje konstrukcję dwuosiową, bardzo plakatową:
pion nadawcy, poziom hasła, stempel jako kontrapunkt w rogu.

**Specyfikacja wykonawcza.**

- Płótno: 1460 x 800 px. Blok hasła przesunięty w prawo o 110 px względem środka.
- Maszt: pionowa linia 3 px, kolor #9F2F2D (ciemny #CE6B66), wysokość równa
  wysokości bloku h1 (ok. 500 px), pozycja 96 px na lewo od lewej krawędzi hasła.
- Napis: w kontenerze przylegającym do masztu od lewej,
  `writing-mode:vertical-rl; transform:rotate(180deg)` (czytanie od dołu do góry),
  wyrównanie do dołu masztu. Font: Inter Tight 600, 40 px,
  `letter-spacing:.34em; text-transform:uppercase` (w źródle pisownia dokładnie
  "Skille AI", wersaliki robi CSS, jak w obecnym dopisku). Kolor #9F2F2D.
  Odstęp napis-maszt 18 px.
- Na szczycie masztu kropka 9 x 9 px, border-radius 50%, #9F2F2D: "żarówka"
  neonowa sprowadzona do typograficznego punktu, spina pion.
- Hasło i kreska: bez zmian. Linia 3 kursywą #4A4B4F jak dotąd.
- Pieczątka: bez zmian (prawy dolny róg); układ przekątniowy lewy-górny pion
  czerwony kontra prawy-dolny stempel czerwony daje planszy równowagę.
- Szkic CSS:

```css
.pion{position:absolute;left:-136px;top:6px;bottom:auto;height:500px;
  display:flex;align-items:flex-end;gap:18px}
.pion::before{content:"";width:3px;height:100%;background:#9F2F2D}
.pion b{writing-mode:vertical-rl;transform:rotate(180deg);
  font:600 40px 'Inter Tight';letter-spacing:.34em;text-transform:uppercase;
  color:#9F2F2D}
```

**Ryzyka.** Tekst pionowy czyta się wolniej i na bardzo małych podglądach bywa
pomijany, więc "widoczny od razu" jest tu widocznością formy, nie natychmiastową
czytelnością nazwy. Koncept najmocniej zmienia kompozycję ze wszystkich trzech
i najtrudniej go przenieść na wąskie formaty (np. pasek nagłówka).

---

## Rekomendacja

Rekomenduję koncept 1, WINIETĘ: rozwiązuje problem wprost (nadawca dostaje skalę,
kolor i własną strukturę), jest zbieżny z kierunkiem, który właścicielowi już się
podoba w równoległej eksploracji logotypu, i najlepiej skaluje się na inne nośniki
(pasek nagłówka, stopka, og-image). Podpis korektora zachowałbym jako wariant
specjalny do materiałów "redakcyjnych", bo koncepcyjnie jest najciekawszy, ale
winieta jest bezpieczniejsza jako główny znak firmowy.
