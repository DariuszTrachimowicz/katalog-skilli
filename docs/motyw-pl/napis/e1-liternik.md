# Ekspertyza 1: liternik i typograf

Soczewka: relacje wielkości, kontrast krojów, tracking, interlinia, tożsamość
przez literę, nie przez dodatki.

Diagnoza na wstępie: obecny dopisek "SKILLE AI" (27 px, mono, #787774,
tracking .3em) ma wszystkie cztery parametry ustawione przeciw sobie naraz.
Mały stopień odbiera masę, przygaszony kolor odbiera kontrast, rozstrzelenie
rozprasza resztkę masy po linii, a mono w tej roli brzmi jak metadana, nie jak
nadawca. Hasło ma 152 px serifu, kreska ma jedyny nasycony kolor, pieczątka ma
zamkniętą formę kolistą. Dopisek nie przegrywa o włos, przegrywa o klasę.
Naprawa jednego parametru nie wystarczy; nadawca musi dostać własny mechanizm
typograficzny.

## Koncept 1: WINIETA

### Opis

"Skille AI" staje się winietą, jak tytuł gazety nad artykułem: pełnoprawny
logotyp w Instrument Serif, "Skille" w atramencie, "AI" kursywą w czerwieni,
pod spodem cienka pozioma linia oddzielająca winietę od hasła. Nadawca dostaje
to samo, co czyni hasło silnym (serif, skala), ale o stopień niżej: 66 px wobec
152 px daje stosunek około 1:2.3, więc hierarchia zostaje nienaruszona, bo hasło
ma dodatkowo masę trzech wierszy. Tożsamość niesie sama litera: kontrast
minuskuły "kille" z wersalikami "AI", jedyna czerwona LITERA w kompozycji
(kreska i pieczątka to czerwone FORMY, nie litery) oraz zmiana odmiany na
kursywę w "AI", która optycznie skleja te dwa znaki w logogram. Linia pozioma
domyka winietę i robi z góry kompozycji strefę nadawcy, a nie luźny dopisek.

### Specyfikacja wykonawcza

Plansza: 1460 x 920 px (dopisek jest wyższy niż obecnie, dodać 40 px wysokości).

Logotyp:

- font: Instrument Serif 400, font-size 66 px, line-height 1,
  letter-spacing -0.015em
- "Skille": kolor #1F2023 (ciemny wariant #F4F2EC)
- "AI": font-style italic, kolor #9F2F2D (ciemny wariant #CE6B66),
  margin-left .14em (powiększone światło wyrazowe, żeby "AI" czytało się jako
  osobny znak, nie końcówka słowa)
- wyrównanie do lewej krawędzi hasła z korektą optyczną: margin-left 5 px
  (owal "S" winiety i trzon "P" hasła mają się kryć optycznie, nie mechanicznie)

Linia:

- wysokość 1.5 px, kolor #787774 przy opacity .55 (jasny) / #8C8B87 przy
  opacity .5 (ciemny); zero nowych kolorów, tylko przezroczystość
- szerokość: szerokość logotypu + 24 px przewieszenia w prawo
  (inline-block na kontenerze winiety, border-bottom, padding-right 24 px)
- odstęp: 26 px pod logotypem, 56 px między linią a hasłem

Szkic markupu:

    <div class="winieta">Skille<span class="ai">AI</span></div>
    <h1>...haslo bez zmian...</h1>

    .winieta{display:inline-block;font:400 66px 'Instrument Serif',Georgia,serif;
      letter-spacing:-.015em;color:#1F2023;margin:0 0 56px 5px;
      padding:0 24px 26px 0;border-bottom:1.5px solid rgba(120,119,116,.55)}
    .winieta .ai{font-style:italic;color:#9F2F2D;margin-left:.14em}

Reszta (hasło 152 px, kreska, pieczątka) bez zmian.

### Ryzyka

Dwa stopnie tego samego serifu wymagają pilnowania proporcji: poniżej stosunku
1:2 winieta zacznie konkurować z hasłem, więc przy skalowaniu kadru trzymać
66/152 sztywno. W kompozycji będą trzy czerwone elementy (AI, kreska,
pieczątka); to działa jako trójkąt akcentów, ale gdyby pieczątka stała tuż pod
"AI" w wąskim kadrze, czerwień się zlewa i trzeba pieczątkę odsunąć.

## Koncept 2: ŚWIATŁO I ZBITKA

### Opis

Zachowawczy wariant: dopisek zostaje w mono nad hasłem, ale przestaje być
metadaną, bo dostaje pełny atrament, większy stopień i wewnętrzny kontrast
negatywnego światła. "SKILLE" jest mocno rozstrzelone (.48em), a "AI" po
odbiciu w czerwieni jest niemal zbite (.04em): rozrzedzona nazwa i gęsty,
czerwony skrót obok siebie tworzą rytm, którego żaden inny element planszy nie
ma. To tożsamość zbudowana wyłącznie ze światła międzyliterowego i koloru,
zero dodatków graficznych. Podniesienie stopnia z 27 do 34 px i koloru z
#787774 do #1F2023 przywraca masę, a mono w wersalikach nadal wyraźnie
kontrastuje gatunkowo z serifem hasła, więc o konkurencji nie ma mowy.

### Specyfikacja wykonawcza

Plansza: 1460 x 880 px (bez zmian).

Dopisek:

- font: IBM Plex Mono 500, font-size 34 px, text-transform uppercase,
  line-height 1
- "SKILLE": letter-spacing .48em, kolor #1F2023 (ciemny #F4F2EC)
- odstęp między członami: margin-left .55em na spanie "AI" (rozstrzelenie
  "SKILLE" zostawia po sobie .48em za ostatnią literą, więc łączna przerwa
  wyniesie około 1em i wyraźnie rozdzieli człony)
- "AI": letter-spacing .04em, kolor #9F2F2D (ciemny #CE6B66)
- margin: 0 0 46px 6px (wcięcie optyczne do trzonu "P")

Szkic markupu:

    <p class="dopisek">Skille<span class="ai">AI</span></p>

    .dopisek{font:500 34px 'IBM Plex Mono',monospace;text-transform:uppercase;
      line-height:1;letter-spacing:.48em;color:#1F2023;margin:0 0 46px 6px}
    .dopisek .ai{letter-spacing:.04em;color:#9F2F2D;margin-left:.55em}

Reszta planszy bez zmian.

### Ryzyka

Mono jest gatunkowo cichszy od serifu, więc zapas jest mały: jeśli 34 px w
testach nadal ginie, powyżej około 40 px tekstura mono zaczyna z kolei
konkurować z hasłem i koncept nie ma dokąd rosnąć. Kontrast rozstrzelenie/zbitka
działa dopiero od pewnej skali; w miniaturach (podgląd karty, favicon-strefa)
efekt zniknie i zostanie zwykły napis.

## Koncept 3: SYGNATURA

### Opis

Zmiana kompozycji całości według metafory dokumentu: hasło jest treścią pisma,
a nadawca schodzi na dół i staje się PODPISEM z przystawioną obok pieczęcią,
wyrównanym do prawej krawędzi kolumny. "Skille AI" w Instrument Serif 58 px
("AI" w czerwieni) plus pieczątka nachodząca z lewej na podpis dają nadawcy
własną strefę, w której z niczym nie konkuruje: dolna prawa ćwiartka należy
wyłącznie do niego. Dopisek znad hasła znika całkowicie, więc hasło zyskuje,
a nadawca zamiast ginąć w cieniu 152 px dostaje rolę, w której małe może być
mocne, bo podpis z pieczęcią to kulturowo najsilniejszy znak autorstwa na
dokumencie. Kierunek czytania jest naturalny: teza, potem kto się pod nią
podpisuje.

### Specyfikacja wykonawcza

Plansza: 1460 x 960 px.

Hasło: bez dopisku u góry, 152 px jak obecnie, wyrównane do lewej.

Blok sygnatury (pozycjonowany względem bloku hasła):

- kontener: position absolute, right -20 px, bottom -150 px względem .blok
  (podpis wychodzi pod ostatni wiersz hasła, wyrównany do prawej krawędzi
  wiersza "pod polskie realia.")
- podpis: Instrument Serif 400, font-size 58 px, letter-spacing -0.01em;
  "Skille" #1F2023 (ciemny #F4F2EC), "AI" #9F2F2D (ciemny #CE6B66),
  margin-left .14em
- pieczątka: 200 px, transform rotate(-9deg), position absolute,
  left -170 px, top -70 px względem podpisu (odbita częściowo NA lewym
  skraju podpisu, zachodzi na literę "S" około 30 px, opacity .9);
  to celowe: pieczęć przystawiona przy podpisie, jak na dokumencie
- odstęp pionowy między ostatnim wierszem hasła a linią bazową podpisu:
  minimum 88 px, żeby kursywa "Nie tłumaczone." nie gryzła się z podpisem

Szkic markupu:

    <div class="blok">
      <h1>...haslo bez zmian...</h1>
      <div class="sygnatura">
        ${STEMPEL(kolor)}
        <span class="podpis">Skille<span class="ai">AI</span></span>
      </div>
    </div>

    .sygnatura{position:absolute;right:-20px;bottom:-150px}
    .podpis{font:400 58px 'Instrument Serif',Georgia,serif;
      letter-spacing:-.01em;color:#1F2023}
    .podpis .ai{color:#9F2F2D;margin-left:.14em}
    .sygnatura .pieczatka{position:absolute;width:200px;height:200px;
      left:-170px;top:-70px;transform:rotate(-9deg);opacity:.9}

### Ryzyka

Nadawca jest czytany jako ostatni, co stoi w lekkim napięciu z wymogiem
"widoczny od razu"; czerwone "AI" i pieczęć łagodzą to przyciąganiem oka, ale
nie usuwają. W ciasnych kadrach (banery poziome, wycinki) blok podpisu z
pieczęcią łatwo wypada poza kadr i nadawca znika w całości, więc koncept
wymaga dyscypliny przy kadrowaniu pochodnych formatów.

## Rekomendacja

Rekomenduję WINIETĘ: jako jedyna daje nadawcy mechanizm z tej samej ligi co
hasło (skala plus serif plus czerwona litera), zamiast podkręcać słabszy
gatunkowo mono, i wprost rozwija kierunek logotypu, który właścicielowi już
się podoba. ŚWIATŁO I ZBITKA zostawiłbym jako wariant minimalny, gdyby winieta
okazała się za ciężka w testach na stronie.
