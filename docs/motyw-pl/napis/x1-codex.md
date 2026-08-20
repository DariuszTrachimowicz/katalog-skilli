Reading additional input from stdin...
2026-08-20T15:16:35.871603Z ERROR codex_models_manager::manager: failed to load models cache: missing field `supports_parallel_tool_calls` at line 97 column 5
OpenAI Codex v0.147.0
--------
workdir: C:\Users\CP24\AiXperts - projekty\katalog-skilli
model: gpt-5.6-sol
provider: openai
approval: never
sandbox: read-only
reasoning effort: xhigh
reasoning summaries: none
session id: 01a01fbe-d8d1-7931-82b7-ed3ddf59c7cd
--------
user
Jestes szefem niezaleznego studia projektowego. NIE czytaj plikow, NIE uruchamiaj komend, NIE korzystaj z internetu; wszystko masz wklejone ponizej. Odpowiedz WYLACZNIE tekstem po polsku, bez dlugich myslnikow, bez emoji.

ZADANIE: Zwolaj panel 6 ekspertow o rolach: liternik/typograf, projektant identyfikacji, plastyk (materia, tusz, stempel), art director (hierarchia uwagi), projektant DTP/druku (skalowalnosc), znawca polskiej szkoly grafiki. Kazdy ekspert wypowiada sie OSOBNO (sekcja z naglowkiem roli): krotka diagnoza problemu + 1-2 wlasne koncepty wg formatu z briefu. Na koncu TY jako szef studia scalasz to w JEDEN rekomendowany koncept glowny + 1 wariant alternatywny, oba z pelna specyfikacja wykonawcza (HTML+CSS gotowe do wdrozenia w opisanym generatorze).

===== BRIEF =====
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

===== OBECNY GENERATOR (narzedzia/napis.mjs, do wgladu w architekture) =====
#!/usr/bin/env node
// Generator napisu motywu przewodniego ("Pisane od zera pod polskie realia.
// Nie tłumaczone.") jako grafiki brandowej w 4 wariantach: jasny, ciemny,
// przezroczysty z ciemnym tekstem i przezroczysty z jasnym tekstem.
// Uruchomienie: node narzedzia/napis.mjs   (wymaga Chrome na maszynie)
//
// Wynik trafia do szablony/napis/ i jest commitowany do repo. Render w 2x
// (--force-device-scale-factor=2), plik wychodzi ~3000 px szerokości.

import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), "..");
const CEL = join(KORZEN, "szablony", "napis");
const ROBOCZY = join(tmpdir(), "napis-roboczy");

const CHROME = [
  process.env.CHROME,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome",
].filter(Boolean).find((p) => existsSync(p));
if (!CHROME) { console.error("Nie znalazłem Chrome, ustaw zmienną CHROME."); process.exit(1); }

const fontUrl = (n) => pathToFileURL(join(KORZEN, "szablony", "fonty", n)).href;

// Kreska korektorska: lekko wygięty ślad flamastra, z małym przewieszeniem
// na końcach. Rysowana dwoma nakładającymi się pociągnięciami dla faktury.
const KRESKA = (kolor) => encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 14" preserveAspectRatio="none">` +
  `<path d="M3,9 C40,5.5 90,4 122,4.6 C155,5.2 185,6.8 197,6" fill="none" stroke="${kolor}" stroke-width="5.4" stroke-linecap="round"/>` +
  `<path d="M6,10.5 C50,7.5 105,6 140,6.4 C165,6.7 186,7.6 195,7.2" fill="none" stroke="${kolor}" stroke-width="2.6" stroke-linecap="round" opacity=".55"/>` +
  `</svg>`
);

// Pieczątka "ORYGINAŁ PL": okrągły stempel urzędowy z fakturą tuszu
// (feTurbulence wygryza drobne ubytki jak przy realnym odbiciu).
const STEMPEL = (kolor) => `
<svg class="pieczatka" viewBox="0 0 200 200" aria-hidden="true">
  <defs>
    <path id="krag" d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"/>
    <filter id="tusz" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="11" result="szum"/>
      <feColorMatrix in="szum" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.6 -0.25" result="maska"/>
      <feComposite in="SourceGraphic" in2="maska" operator="in"/>
    </filter>
  </defs>
  <g filter="url(#tusz)" fill="none" stroke="${kolor}">
    <circle cx="100" cy="100" r="94" stroke-width="4"/>
    <circle cx="100" cy="100" r="87" stroke-width="1.6"/>
    <circle cx="100" cy="100" r="50" stroke-width="1.6"/>
    <text fill="${kolor}" stroke="none" font-family="'IBM Plex Mono',monospace" font-size="13" font-weight="500" letter-spacing="2.6">
      <textPath href="#krag">ORYGINAŁ · PISANE OD ZERA · ORYGINAŁ ·</textPath>
    </text>
    <text x="100" y="110" fill="${kolor}" stroke="none" text-anchor="middle" font-family="'Instrument Serif',Georgia,serif" font-size="50">PL</text>
    <path d="M78,124 C90,120.5 112,120 122,122" stroke-width="3.2" stroke-linecap="round"/>
  </g>
</svg>`;

function napis({ tlo, atrament, atrament2, przygaszony, kolorKreski, dopisek, pieczatka }) {
  return `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"><style>
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')}
@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${fontUrl("instrument-serif-400-italic-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${fontUrl("instrument-serif-400-italic-latin.woff2")}) format('woff2')}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url(${fontUrl("ibm-plex-mono-500-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url(${fontUrl("ibm-plex-mono-500-latin.woff2")}) format('woff2')}
*{margin:0;box-sizing:border-box}
body{width:1460px;height:${dopisek ? 880 : 800}px;background:${tlo};display:flex;align-items:center;justify-content:center}
.blok{text-align:left;position:relative}
.pieczatka{position:absolute;width:250px;height:250px;right:-88px;bottom:-64px;transform:rotate(-12deg);opacity:.93}
.dopisek{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:27px;letter-spacing:.3em;
  text-transform:uppercase;color:${przygaszony};margin:0 0 44px 8px}
h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:152px;line-height:1.1;
  letter-spacing:-.025em;color:${atrament}}
h1 em{font-style:italic;color:${atrament2}}
.kr{position:relative;white-space:nowrap}
.kr i{position:absolute;left:-1.5%;right:-2%;bottom:-.02em;height:.12em;font-style:normal;
  background:url('data:image/svg+xml,${KRESKA("__KOLOR__")}') no-repeat center/100% 100%}
</style></head><body>
<div class="blok">${dopisek ? `<p class="dopisek">${dopisek}</p>` : ""}
<h1>Pisane od zera<br>pod <span class="kr">polskie realia<i></i></span>.<br><em>Nie tłumaczone.</em></h1>
${pieczatka ? STEMPEL(kolorKreski) : ""}
</div>
</body></html>`.replace("__KOLOR__", encodeURIComponent(kolorKreski));
}

// Sama pieczątka, na przezroczystym tle, do stemplowania dowolnych materiałów.
function stronaPieczatki(kolor) {
  return `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"><style>
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url(${fontUrl("ibm-plex-mono-500-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url(${fontUrl("ibm-plex-mono-500-latin.woff2")}) format('woff2')}
*{margin:0}body{width:560px;height:560px;background:transparent;display:grid;place-items:center}
.pieczatka{width:520px;height:520px}
</style></head><body>${STEMPEL(kolor)}</body></html>`;
}

const JASNY = { tlo: "#FBFBFA", atrament: "#1F2023", atrament2: "#4A4B4F", przygaszony: "#787774", kolorKreski: "#9F2F2D" };
const CIEMNY = { tlo: "#17181B", atrament: "#F4F2EC", atrament2: "#B7B6B1", przygaszony: "#8C8B87", kolorKreski: "#CE6B66" };
const WARIANTY = [
  { plik: "napis-jasny.png", ...JASNY },
  { plik: "napis-ciemny.png", ...CIEMNY },
  { plik: "napis-przezroczysty.png", ...JASNY, tlo: "transparent" },
  { plik: "napis-przezroczysty-bialy.png", ...CIEMNY, tlo: "transparent" },
  { plik: "napis-skille-ai-jasny.png", ...JASNY, dopisek: "Skille AI" },
  { plik: "napis-skille-ai-ciemny.png", ...CIEMNY, dopisek: "Skille AI" },
  { plik: "napis-skille-ai-przezroczysty.png", ...JASNY, tlo: "transparent", dopisek: "Skille AI" },
  { plik: "napis-skille-ai-przezroczysty-bialy.png", ...CIEMNY, tlo: "transparent", dopisek: "Skille AI" },
  { plik: "napis-pelny-jasny.png", ...JASNY, dopisek: "Skille AI", pieczatka: true },
  { plik: "napis-pelny-ciemny.png", ...CIEMNY, dopisek: "Skille AI", pieczatka: true },
  { plik: "napis-pelny-przezroczysty.png", ...JASNY, tlo: "transparent", dopisek: "Skille AI", pieczatka: true },
  { plik: "napis-pelny-przezroczysty-bialy.png", ...CIEMNY, tlo: "transparent", dopisek: "Skille AI", pieczatka: true },
  { plik: "pieczatka-pl.png", solo: JASNY.kolorKreski },
  { plik: "pieczatka-pl-rozjasniona.png", solo: CIEMNY.kolorKreski },
];

rmSync(ROBOCZY, { recursive: true, force: true });
mkdirSync(ROBOCZY, { recursive: true });
mkdirSync(CEL, { recursive: true });

for (const w of WARIANTY) {
  const html = join(ROBOCZY, w.plik.replace(/\.png$/, ".html"));
  const cel = join(CEL, w.plik);
  writeFileSync(html, w.solo ? stronaPieczatki(w.solo) : napis(w));
  // Ponawianie jak w grafiki.mjs: Chrome przy serii potrafi oddać pustą kartę.
  // Zapis PNG bywa domykany chwilę PO wyjściu procesu, stąd odczekanie.
  for (let proba = 1; proba <= 3; proba++) {
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=2", "--default-background-color=00000000",
      `--user-data-dir=${join(ROBOCZY, `profil-${w.plik}-${proba}`)}`,
      w.solo ? "--window-size=560,560" : (w.dopisek ? "--window-size=1460,880" : "--window-size=1460,800"),
      `--screenshot=${cel}`, pathToFileURL(html).href,
    ], { stdio: "ignore", timeout: 60000 });
    for (let i = 0; i < 20 && !(existsSync(cel) && statSync(cel).size > 20000); i++)
      execFileSync(process.execPath, ["-e", "setTimeout(()=>{},300)"]);
    if (existsSync(cel) && statSync(cel).size > 20000) break;
    if (proba === 3) { console.error(`Nie udało się wyrenderować ${w.plik}`); process.exit(1); }
  }
  console.log(`  napis  ${w.plik}  (${Math.round(statSync(cel).size / 1024)} KB)`);
}
console.log(`Gotowe: ${WARIANTY.length} grafiki w szablony/napis/`);
codex
# Panel ekspertów

## Liternik i typograf

Diagnoza: obecny napis „Skille AI” jest optycznie zbyt lekki. Rozstrzelone litery powiększają jego szerokość, ale nie budują masy, a połączenie 27 px i przygaszonej szarości ustawia nazwę na poziomie technicznego podpisu.

1. NAZWA: Sygnatura na czerwonej linii.

2. OPIS: „Skille AI” otrzymuje formę właściwego logotypu złożonego w Instrument Serif. Słowo „Skille” pozostaje atramentowe, „AI” jest czerwone, a krótka cienka linia wyrasta z prawej strony nazwy. Nadawca staje się zauważalny, ale zachowuje skalę około połowy wysokości liter hasła.

3. SPECYFIKACJA: Instrument Serif 400, 78 px, line-height 0.9, tracking -0.018em. Odstęp między „Skille” i „AI”: 18 px. Linia: 210 x 2 px, kolor #9F2F2D lub #CE6B66, odstęp od nazwy 28 px. Całość wyrównana 8 px od lewej krawędzi hasła, odstęp do hasła 42 px. Hasło pozostaje w rozmiarze 152 px.

4. RYZYKA: Użycie tego samego kroju w nazwie i haśle wymaga wyraźnego odstępu pionowego. Poniżej 34 px oba poziomy mogą zacząć wyglądać jak jeden tekst.

## Projektant identyfikacji

Diagnoza: problem nie wynika tylko z małego rozmiaru. „Skille AI” nie ma obecnie własnej, powtarzalnej formy, którą można przenieść z planszy na nagłówek, stopkę, kartę produktu czy materiał drukowany.

1. NAZWA: Kaseta nadawcy.

2. OPIS: Nazwa zostaje zamknięta w prostej prostokątnej kasetce z czerwonym znacznikiem przy lewej krawędzi. Kaseta pełni funkcję systemowego podpisu i może działać niezależnie od hasła. Okrągła pieczęć zostaje wyłączona z głównego lockupu i zachowana jako osobny znak certyfikujący.

3. SPECYFIKACJA: Kaseta 390 x 88 px, obrys 2 px w kolorze atramentu, bez zaokrągleń. Czerwony pasek wewnętrzny 7 x 64 px, odsunięty 10 px od lewej krawędzi. „Skille AI” w Inter Tight 600, 44 px, tracking -0.02em, kolor atramentu, „AI” czerwone. Kaseta umieszczona 8 px od lewej osi hasła, z odstępem 38 px przed pierwszą linią.

4. RYZYKA: Prostokąt może wyglądać zbyt cyfrowo i produktowo. Nie należy stosować cienia, zaokrągleń ani wypełnienia, bo zmieniłoby to charakter w element interfejsu.

## Plastyk, materia, tusz i stempel

Diagnoza: kompozycja ma już wyrazisty język tuszu, ale nadawca pozostaje poza nim. Okrągła pieczęć mówi o oryginalności, lecz nie identyfikuje dostatecznie mocno autora.

1. NAZWA: Odbitka zecerska.

2. OPIS: Osobny dopisek i okrągła pieczęć zostają zastąpione jednym prostokątnym stemplem. W dużym polu widnieje „Skille AI”, a w węższej części „ORYGINAŁ PL” i „NIE TŁUMACZONE”. Nazwa zyskuje materialność, czerwony akcent i własną sylwetę, przy czym hasło zachowuje całą skalę.

3. SPECYFIKACJA: SVG 430 x 118 px, dwa lekko nierówne obrysy 3,2 i 1,2 px, obrót -2 stopnie. „Skille AI” w Instrument Serif 48 px. Teksty pomocnicze w IBM Plex Mono 500, 14 i 12,5 px, tracking 0.1em. Stempel umieszczony nad hasłem po prawej stronie, odstęp pionowy 28 px. Faktura obejmuje ramkę i separator, ale główna nazwa pozostaje prawie czysta.

4. RYZYKA: Zbyt silna turbulencja pogorszy czytelność w małym eksporcie. Tekst „Skille AI” nie powinien być wygryzany tak mocno jak obrys.

## Art director, hierarchia uwagi

Diagnoza: obecny układ ma jedną pionową oś, na której wszystkie elementy konkurują wyłącznie skalą i kolorem. Nadawca potrzebuje własnego pola kompozycyjnego, a nie tylko większego stopnia pisma.

1. NAZWA: Margines autorski.

2. OPIS: Plansza zostaje rozszerzona do układu dwukolumnowego. W lewej kolumnie znajduje się „Skille AI” na dwóch wierszach, a pionowa czerwona linia oddziela podpis od trzyliniowego hasła. Nadawca jest widoczny od początku skanowania, lecz hasło nadal zajmuje największą powierzchnię.

3. SPECYFIKACJA: Plansza 1680 x 920 px. Lewa kolumna 210 px, przerwa 54 px, pionowa linia 2 x 430 px. „Skille” i „AI” w Inter Tight 600, 52 px, line-height 0.9, „AI” czerwone. Hasło 152 px bez zmiany proporcji, wyrównane do górnej krawędzi kolumny nadawcy.

4. RYZYKA: To rozwiązanie jest mocno horyzontalne i trudniej przenosi się na węższe formaty. Wymaga osobnej wersji mobilnej ze składaniem kolumn jedna pod drugą.

## Projektant DTP i druku

Diagnoza: nadawca powinien być czytelny nie tylko na obrazie o szerokości około 3000 px, lecz również po zmniejszeniu do nagłówka, stopki i niewielkiego druku. Faktura nie może być jedynym nośnikiem rozpoznawalności.

1. NAZWA: Nagłówek modułowy.

2. OPIS: Nad hasłem powstaje poziomy masthead z nazwą, cienką linią i niewielkim oznaczeniem „ORYGINAŁ PL”. Elementy mają jasno określone minimalne rozmiary i można je redukować bez zmiany relacji. Pełne hasło pozostaje osobnym, największym modułem.

3. SPECYFIKACJA: „Skille AI” w Inter Tight 600, 56 px, „AI” czerwone. Linia elastyczna o wysokości 2 px i minimalnej długości 160 px. „ORYGINAŁ PL” w IBM Plex Mono 500, 18 px, tracking 0.12em. Cały nagłówek ma 74 px wysokości i odstęp 42 px od hasła. Przy szerokości poniżej 900 px znika linia, a oznaczenie przechodzi pod nazwę.

4. RYZYKA: Masthead jest bardzo funkcjonalny, ale mniej autorski niż rozwiązania oparte na stemplu lub ekspresyjnym składzie. W głównej planszy może wyglądać zbyt porządnie.

## Znawca polskiej szkoły grafiki

Diagnoza: kompozycja ma dobrą podstawę plakatową, lecz nadawca zachowuje się jak metadana. Potrzebny jest jeden kontrolowany kontrapunkt, który wprowadzi napięcie bez narodowej symboliki i dekoracyjnego folkloru.

1. NAZWA: Czerwony kontrapunkt AI.

2. OPIS: „Skille” jest składane dużym Instrument Serif, a „AI” trafia do niewielkiego czerwonego kwadratu lekko obróconego względem linii bazowej. Powstaje świadoma, plakatowa nierówność i zapamiętywalna sylweta. Hasło nadal dominuje skalą i zajmuje całą szerokość kompozycji.

3. SPECYFIKACJA: „Skille” w Instrument Serif 68 px, tracking -0.025em. Pole „AI” 72 x 72 px, tło #9F2F2D lub #CE6B66, litery w kolorze tła planszy, IBM Plex Mono 500, 30 px. Obrót pola 2,5 stopnia, zakładka 7 px na końcówkę słowa „Skille”. Odstęp do hasła 38 px.

4. RYZYKA: Czerwony kwadrat może zostać odczytany jako ikona produktu. Nie należy go powiększać ani dodawać podobnych pól w innych częściach kompozycji.

# Decyzja szefa studia

## Koncept główny: Sygnatura autorska

Scalam propozycję typografa z systemowym rozdzieleniem logo, claimu i pieczęci. „Skille AI” staje się pełnoprawną sygnaturą, ale nie otrzymuje ramki ani ciężkiego pola, które mogłoby rywalizować z hasłem. Czerwone „AI” daje natychmiastowy punkt rozpoznawczy, a cienka linia buduje własną formę nadawcy. Okrągła pieczęć znika z pełnej planszy i pozostaje osobnym zasobem do stosowania przy cenach, kartach oraz materiałach certyfikujących.

Specyfikacja:

- Plansza CSS: 1460 x 920 px.
- Eksport przy skali 2x: 2920 x 1840 px.
- „Skille AI”: Instrument Serif 400, 78 px, line-height 0.9, tracking -0.018em.
- „Skille”: #1F2023 na jasnym tle, #F4F2EC na ciemnym.
- „AI” i linia: #9F2F2D na jasnym tle, #CE6B66 na ciemnym.
- Linia przy nazwie: 210 x 2 px.
- Odstęp między nazwą i linią: 28 px.
- Odstęp sygnatury od hasła: 42 px.
- Hasło: bez zmiany treści, 152 px, line-height 1.1.
- Trzecia linia: Instrument Serif italic, kolor drugiego planu.
- Okrągła pieczęć: nie występuje w tym lockupie.

Kod do wstawienia do `napis.mjs`, korzystający z istniejących funkcji `fontUrl` i `KRESKA`:

```js
function napisSygnatura({
  tlo,
  atrament,
  atrament2,
  kolorKreski
}) {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<style>
@font-face{
  font-family:'Instrument Serif';
  font-style:normal;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'Instrument Serif';
  font-style:normal;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')
}
@font-face{
  font-family:'Instrument Serif';
  font-style:italic;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-italic-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'Instrument Serif';
  font-style:italic;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-italic-latin.woff2")}) format('woff2')
}

*{
  margin:0;
  box-sizing:border-box
}

html,
body{
  width:1460px;
  height:920px
}

body{
  overflow:hidden;
  display:grid;
  place-items:center;
  background:${tlo};
  font-synthesis:none;
  text-rendering:geometricPrecision
}

.blok{
  position:relative;
  width:max-content;
  text-align:left
}

.sygnatura{
  display:flex;
  align-items:center;
  margin:0 0 42px 8px;
  white-space:nowrap
}

.sygnatura__nazwa{
  display:flex;
  align-items:baseline;
  gap:18px;
  font-family:'Instrument Serif',Georgia,serif;
  font-size:78px;
  font-weight:400;
  line-height:.9;
  letter-spacing:-.018em;
  color:${atrament}
}

.sygnatura__ai{
  color:${kolorKreski}
}

.sygnatura__linia{
  flex:0 0 210px;
  width:210px;
  height:2px;
  margin-left:28px;
  background:${kolorKreski};
  transform:translateY(6px);
  opacity:.94
}

h1{
  font-family:'Instrument Serif',Georgia,serif;
  font-size:152px;
  font-weight:400;
  line-height:1.1;
  letter-spacing:-.025em;
  color:${atrament}
}

h1 em{
  font-style:italic;
  color:${atrament2}
}

.kr{
  position:relative;
  white-space:nowrap
}

.kr i{
  position:absolute;
  left:-1.5%;
  right:-2%;
  bottom:-.02em;
  height:.12em;
  font-style:normal;
  background:url('data:image/svg+xml,${KRESKA("__KOLOR__")}')
    no-repeat center / 100% 100%
}
</style>
</head>
<body>
<main class="blok">
  <div class="sygnatura" aria-label="Skille AI">
    <div class="sygnatura__nazwa">
      <span>Skille</span>
      <span class="sygnatura__ai">AI</span>
    </div>
    <span class="sygnatura__linia" aria-hidden="true"></span>
  </div>

  <h1>
    Pisane od zera<br>
    pod <span class="kr">polskie realia<i aria-hidden="true"></i></span>.<br>
    <em>Nie tłumaczone.</em>
  </h1>
</main>
</body>
</html>`.replace("__KOLOR__", encodeURIComponent(kolorKreski));
}
```

Dla wszystkich czterech odmian należy użyć `--window-size=1460,920`. Funkcję wywołuje się z istniejącymi obiektami `JASNY`, `CIEMNY` oraz ich wersjami z `tlo: "transparent"`.

## Wariant alternatywny: Odbitka nadawcy

Ten wariant łączy nazwę z funkcją obecnej pieczęci. Prostokątny stempel zastępuje zarówno słaby dopisek, jak i okrągłą pieczęć w prawym dolnym rogu. Dzięki temu kompozycja nadal ma trzy poziomy informacji: czerwony znak nadawcy, dominujące hasło oraz korektorską kreskę. Tekstura jest ograniczona do konstrukcji stempla, aby „Skille AI” pozostało czytelne również po zmniejszeniu.

Specyfikacja:

- Plansza CSS: 1460 x 920 px.
- Stempel: 430 x 118 px, wyrównany do prawej strony bloku hasła.
- Obrót: -2 stopnie.
- Dwa obrysy: 3,2 i 1,2 px.
- „Skille AI”: Instrument Serif 400, 48 px.
- „ORYGINAŁ PL”: IBM Plex Mono 500, 14 px, tracking 1,4 px.
- „NIE TŁUMACZONE”: IBM Plex Mono 500, 12,5 px, tracking 1,1 px.
- Odstęp między stemplem i hasłem: 28 px.
- Kolor całego stempla: #9F2F2D albo #CE6B66.
- Okrągła pieczęć zostaje usunięta z tego lockupu.
- Hasło i korektorska kreska zachowują obecne parametry.

Kod do wstawienia do `napis.mjs`:

```js
const STEMPEL_NADAWCY = (kolor) => `
<svg
  class="stempel-nadawcy"
  viewBox="0 0 430 118"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <filter
      id="tusz-nadawcy"
      x="-5%"
      y="-10%"
      width="110%"
      height="120%"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.62"
        numOctaves="2"
        seed="17"
        result="szum"
      />
      <feColorMatrix
        in="szum"
        type="matrix"
        values="
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 1.35 -0.12
        "
        result="maska"
      />
      <feComposite
        in="SourceGraphic"
        in2="maska"
        operator="in"
      />
    </filter>
  </defs>

  <g
    fill="none"
    stroke="${kolor}"
    filter="url(#tusz-nadawcy)"
  >
    <rect
      x="4"
      y="4"
      width="422"
      height="110"
      stroke-width="3.2"
    />
    <rect
      x="10"
      y="10"
      width="410"
      height="98"
      stroke-width="1.2"
      opacity=".68"
    />
    <path
      d="M238 13 L238 105"
      stroke-width="1.8"
    />
  </g>

  <text
    x="24"
    y="72"
    fill="${kolor}"
    font-family="'Instrument Serif', Georgia, serif"
    font-size="48"
    font-weight="400"
    letter-spacing="-1"
  >Skille AI</text>

  <text
    x="257"
    y="49"
    fill="${kolor}"
    font-family="'IBM Plex Mono', monospace"
    font-size="14"
    font-weight="500"
    letter-spacing="1.4"
  >ORYGINAŁ PL</text>

  <text
    x="257"
    y="76"
    fill="${kolor}"
    font-family="'IBM Plex Mono', monospace"
    font-size="12.5"
    font-weight="500"
    letter-spacing="1.1"
  >NIE TŁUMACZONE</text>
</svg>`;

function napisOdbitkaNadawcy({
  tlo,
  atrament,
  atrament2,
  kolorKreski
}) {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<style>
@font-face{
  font-family:'Instrument Serif';
  font-style:normal;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'Instrument Serif';
  font-style:normal;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')
}
@font-face{
  font-family:'Instrument Serif';
  font-style:italic;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-italic-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'Instrument Serif';
  font-style:italic;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-italic-latin.woff2")}) format('woff2')
}
@font-face{
  font-family:'IBM Plex Mono';
  font-style:normal;
  font-weight:500;
  src:url(${fontUrl("ibm-plex-mono-500-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'IBM Plex Mono';
  font-style:normal;
  font-weight:500;
  src:url(${fontUrl("ibm-plex-mono-500-latin.woff2")}) format('woff2')
}

*{
  margin:0;
  box-sizing:border-box
}

html,
body{
  width:1460px;
  height:920px
}

body{
  overflow:hidden;
  display:grid;
  place-items:center;
  background:${tlo};
  font-synthesis:none;
  text-rendering:geometricPrecision
}

.blok{
  position:relative;
  width:max-content;
  text-align:left
}

.pas-nadawcy{
  display:flex;
  justify-content:flex-end;
  padding-right:38px;
  margin-bottom:28px
}

.stempel-nadawcy{
  display:block;
  width:430px;
  height:118px;
  overflow:visible;
  transform:rotate(-2deg);
  transform-origin:center
}

h1{
  font-family:'Instrument Serif',Georgia,serif;
  font-size:152px;
  font-weight:400;
  line-height:1.1;
  letter-spacing:-.025em;
  color:${atrament}
}

h1 em{
  font-style:italic;
  color:${atrament2}
}

.kr{
  position:relative;
  white-space:nowrap
}

.kr i{
  position:absolute;
  left:-1.5%;
  right:-2%;
  bottom:-.02em;
  height:.12em;
  font-style:normal;
  background:url('data:image/svg+xml,${KRESKA("__KOLOR__")}')
    no-repeat center / 100% 100%
}
</style>
</head>
<body>
<main class="blok">
  <div class="pas-nadawcy" aria-label="Skille AI">
    ${STEMPEL_NADAWCY(kolorKreski)}
  </div>

  <h1>
    Pisane od zera<br>
    pod <span class="kr">polskie realia<i aria-hidden="true"></i></span>.<br>
    <em>Nie tłumaczone.</em>
  </h1>
</main>
</body>
</html>`.replace("__KOLOR__", encodeURIComponent(kolorKreski));
}
```

Rekomenduję „Sygnaturę autorską”, ponieważ naprawia hierarchię najprostszymi środkami, zachowuje siłę hasła i daje „Skille AI” formę możliwą do konsekwentnego używania w całej identyfikacji. „Odbitkę nadawcy” wybrałbym jako wariant bardziej ekspresyjny do kampanii, okładek i materiałów, w których drukarska materia może odgrywać większą rolę.
tokens used
31 539
# Panel ekspertów

## Liternik i typograf

Diagnoza: obecny napis „Skille AI” jest optycznie zbyt lekki. Rozstrzelone litery powiększają jego szerokość, ale nie budują masy, a połączenie 27 px i przygaszonej szarości ustawia nazwę na poziomie technicznego podpisu.

1. NAZWA: Sygnatura na czerwonej linii.

2. OPIS: „Skille AI” otrzymuje formę właściwego logotypu złożonego w Instrument Serif. Słowo „Skille” pozostaje atramentowe, „AI” jest czerwone, a krótka cienka linia wyrasta z prawej strony nazwy. Nadawca staje się zauważalny, ale zachowuje skalę około połowy wysokości liter hasła.

3. SPECYFIKACJA: Instrument Serif 400, 78 px, line-height 0.9, tracking -0.018em. Odstęp między „Skille” i „AI”: 18 px. Linia: 210 x 2 px, kolor #9F2F2D lub #CE6B66, odstęp od nazwy 28 px. Całość wyrównana 8 px od lewej krawędzi hasła, odstęp do hasła 42 px. Hasło pozostaje w rozmiarze 152 px.

4. RYZYKA: Użycie tego samego kroju w nazwie i haśle wymaga wyraźnego odstępu pionowego. Poniżej 34 px oba poziomy mogą zacząć wyglądać jak jeden tekst.

## Projektant identyfikacji

Diagnoza: problem nie wynika tylko z małego rozmiaru. „Skille AI” nie ma obecnie własnej, powtarzalnej formy, którą można przenieść z planszy na nagłówek, stopkę, kartę produktu czy materiał drukowany.

1. NAZWA: Kaseta nadawcy.

2. OPIS: Nazwa zostaje zamknięta w prostej prostokątnej kasetce z czerwonym znacznikiem przy lewej krawędzi. Kaseta pełni funkcję systemowego podpisu i może działać niezależnie od hasła. Okrągła pieczęć zostaje wyłączona z głównego lockupu i zachowana jako osobny znak certyfikujący.

3. SPECYFIKACJA: Kaseta 390 x 88 px, obrys 2 px w kolorze atramentu, bez zaokrągleń. Czerwony pasek wewnętrzny 7 x 64 px, odsunięty 10 px od lewej krawędzi. „Skille AI” w Inter Tight 600, 44 px, tracking -0.02em, kolor atramentu, „AI” czerwone. Kaseta umieszczona 8 px od lewej osi hasła, z odstępem 38 px przed pierwszą linią.

4. RYZYKA: Prostokąt może wyglądać zbyt cyfrowo i produktowo. Nie należy stosować cienia, zaokrągleń ani wypełnienia, bo zmieniłoby to charakter w element interfejsu.

## Plastyk, materia, tusz i stempel

Diagnoza: kompozycja ma już wyrazisty język tuszu, ale nadawca pozostaje poza nim. Okrągła pieczęć mówi o oryginalności, lecz nie identyfikuje dostatecznie mocno autora.

1. NAZWA: Odbitka zecerska.

2. OPIS: Osobny dopisek i okrągła pieczęć zostają zastąpione jednym prostokątnym stemplem. W dużym polu widnieje „Skille AI”, a w węższej części „ORYGINAŁ PL” i „NIE TŁUMACZONE”. Nazwa zyskuje materialność, czerwony akcent i własną sylwetę, przy czym hasło zachowuje całą skalę.

3. SPECYFIKACJA: SVG 430 x 118 px, dwa lekko nierówne obrysy 3,2 i 1,2 px, obrót -2 stopnie. „Skille AI” w Instrument Serif 48 px. Teksty pomocnicze w IBM Plex Mono 500, 14 i 12,5 px, tracking 0.1em. Stempel umieszczony nad hasłem po prawej stronie, odstęp pionowy 28 px. Faktura obejmuje ramkę i separator, ale główna nazwa pozostaje prawie czysta.

4. RYZYKA: Zbyt silna turbulencja pogorszy czytelność w małym eksporcie. Tekst „Skille AI” nie powinien być wygryzany tak mocno jak obrys.

## Art director, hierarchia uwagi

Diagnoza: obecny układ ma jedną pionową oś, na której wszystkie elementy konkurują wyłącznie skalą i kolorem. Nadawca potrzebuje własnego pola kompozycyjnego, a nie tylko większego stopnia pisma.

1. NAZWA: Margines autorski.

2. OPIS: Plansza zostaje rozszerzona do układu dwukolumnowego. W lewej kolumnie znajduje się „Skille AI” na dwóch wierszach, a pionowa czerwona linia oddziela podpis od trzyliniowego hasła. Nadawca jest widoczny od początku skanowania, lecz hasło nadal zajmuje największą powierzchnię.

3. SPECYFIKACJA: Plansza 1680 x 920 px. Lewa kolumna 210 px, przerwa 54 px, pionowa linia 2 x 430 px. „Skille” i „AI” w Inter Tight 600, 52 px, line-height 0.9, „AI” czerwone. Hasło 152 px bez zmiany proporcji, wyrównane do górnej krawędzi kolumny nadawcy.

4. RYZYKA: To rozwiązanie jest mocno horyzontalne i trudniej przenosi się na węższe formaty. Wymaga osobnej wersji mobilnej ze składaniem kolumn jedna pod drugą.

## Projektant DTP i druku

Diagnoza: nadawca powinien być czytelny nie tylko na obrazie o szerokości około 3000 px, lecz również po zmniejszeniu do nagłówka, stopki i niewielkiego druku. Faktura nie może być jedynym nośnikiem rozpoznawalności.

1. NAZWA: Nagłówek modułowy.

2. OPIS: Nad hasłem powstaje poziomy masthead z nazwą, cienką linią i niewielkim oznaczeniem „ORYGINAŁ PL”. Elementy mają jasno określone minimalne rozmiary i można je redukować bez zmiany relacji. Pełne hasło pozostaje osobnym, największym modułem.

3. SPECYFIKACJA: „Skille AI” w Inter Tight 600, 56 px, „AI” czerwone. Linia elastyczna o wysokości 2 px i minimalnej długości 160 px. „ORYGINAŁ PL” w IBM Plex Mono 500, 18 px, tracking 0.12em. Cały nagłówek ma 74 px wysokości i odstęp 42 px od hasła. Przy szerokości poniżej 900 px znika linia, a oznaczenie przechodzi pod nazwę.

4. RYZYKA: Masthead jest bardzo funkcjonalny, ale mniej autorski niż rozwiązania oparte na stemplu lub ekspresyjnym składzie. W głównej planszy może wyglądać zbyt porządnie.

## Znawca polskiej szkoły grafiki

Diagnoza: kompozycja ma dobrą podstawę plakatową, lecz nadawca zachowuje się jak metadana. Potrzebny jest jeden kontrolowany kontrapunkt, który wprowadzi napięcie bez narodowej symboliki i dekoracyjnego folkloru.

1. NAZWA: Czerwony kontrapunkt AI.

2. OPIS: „Skille” jest składane dużym Instrument Serif, a „AI” trafia do niewielkiego czerwonego kwadratu lekko obróconego względem linii bazowej. Powstaje świadoma, plakatowa nierówność i zapamiętywalna sylweta. Hasło nadal dominuje skalą i zajmuje całą szerokość kompozycji.

3. SPECYFIKACJA: „Skille” w Instrument Serif 68 px, tracking -0.025em. Pole „AI” 72 x 72 px, tło #9F2F2D lub #CE6B66, litery w kolorze tła planszy, IBM Plex Mono 500, 30 px. Obrót pola 2,5 stopnia, zakładka 7 px na końcówkę słowa „Skille”. Odstęp do hasła 38 px.

4. RYZYKA: Czerwony kwadrat może zostać odczytany jako ikona produktu. Nie należy go powiększać ani dodawać podobnych pól w innych częściach kompozycji.

# Decyzja szefa studia

## Koncept główny: Sygnatura autorska

Scalam propozycję typografa z systemowym rozdzieleniem logo, claimu i pieczęci. „Skille AI” staje się pełnoprawną sygnaturą, ale nie otrzymuje ramki ani ciężkiego pola, które mogłoby rywalizować z hasłem. Czerwone „AI” daje natychmiastowy punkt rozpoznawczy, a cienka linia buduje własną formę nadawcy. Okrągła pieczęć znika z pełnej planszy i pozostaje osobnym zasobem do stosowania przy cenach, kartach oraz materiałach certyfikujących.

Specyfikacja:

- Plansza CSS: 1460 x 920 px.
- Eksport przy skali 2x: 2920 x 1840 px.
- „Skille AI”: Instrument Serif 400, 78 px, line-height 0.9, tracking -0.018em.
- „Skille”: #1F2023 na jasnym tle, #F4F2EC na ciemnym.
- „AI” i linia: #9F2F2D na jasnym tle, #CE6B66 na ciemnym.
- Linia przy nazwie: 210 x 2 px.
- Odstęp między nazwą i linią: 28 px.
- Odstęp sygnatury od hasła: 42 px.
- Hasło: bez zmiany treści, 152 px, line-height 1.1.
- Trzecia linia: Instrument Serif italic, kolor drugiego planu.
- Okrągła pieczęć: nie występuje w tym lockupie.

Kod do wstawienia do `napis.mjs`, korzystający z istniejących funkcji `fontUrl` i `KRESKA`:

```js
function napisSygnatura({
  tlo,
  atrament,
  atrament2,
  kolorKreski
}) {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<style>
@font-face{
  font-family:'Instrument Serif';
  font-style:normal;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'Instrument Serif';
  font-style:normal;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')
}
@font-face{
  font-family:'Instrument Serif';
  font-style:italic;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-italic-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'Instrument Serif';
  font-style:italic;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-italic-latin.woff2")}) format('woff2')
}

*{
  margin:0;
  box-sizing:border-box
}

html,
body{
  width:1460px;
  height:920px
}

body{
  overflow:hidden;
  display:grid;
  place-items:center;
  background:${tlo};
  font-synthesis:none;
  text-rendering:geometricPrecision
}

.blok{
  position:relative;
  width:max-content;
  text-align:left
}

.sygnatura{
  display:flex;
  align-items:center;
  margin:0 0 42px 8px;
  white-space:nowrap
}

.sygnatura__nazwa{
  display:flex;
  align-items:baseline;
  gap:18px;
  font-family:'Instrument Serif',Georgia,serif;
  font-size:78px;
  font-weight:400;
  line-height:.9;
  letter-spacing:-.018em;
  color:${atrament}
}

.sygnatura__ai{
  color:${kolorKreski}
}

.sygnatura__linia{
  flex:0 0 210px;
  width:210px;
  height:2px;
  margin-left:28px;
  background:${kolorKreski};
  transform:translateY(6px);
  opacity:.94
}

h1{
  font-family:'Instrument Serif',Georgia,serif;
  font-size:152px;
  font-weight:400;
  line-height:1.1;
  letter-spacing:-.025em;
  color:${atrament}
}

h1 em{
  font-style:italic;
  color:${atrament2}
}

.kr{
  position:relative;
  white-space:nowrap
}

.kr i{
  position:absolute;
  left:-1.5%;
  right:-2%;
  bottom:-.02em;
  height:.12em;
  font-style:normal;
  background:url('data:image/svg+xml,${KRESKA("__KOLOR__")}')
    no-repeat center / 100% 100%
}
</style>
</head>
<body>
<main class="blok">
  <div class="sygnatura" aria-label="Skille AI">
    <div class="sygnatura__nazwa">
      <span>Skille</span>
      <span class="sygnatura__ai">AI</span>
    </div>
    <span class="sygnatura__linia" aria-hidden="true"></span>
  </div>

  <h1>
    Pisane od zera<br>
    pod <span class="kr">polskie realia<i aria-hidden="true"></i></span>.<br>
    <em>Nie tłumaczone.</em>
  </h1>
</main>
</body>
</html>`.replace("__KOLOR__", encodeURIComponent(kolorKreski));
}
```

Dla wszystkich czterech odmian należy użyć `--window-size=1460,920`. Funkcję wywołuje się z istniejącymi obiektami `JASNY`, `CIEMNY` oraz ich wersjami z `tlo: "transparent"`.

## Wariant alternatywny: Odbitka nadawcy

Ten wariant łączy nazwę z funkcją obecnej pieczęci. Prostokątny stempel zastępuje zarówno słaby dopisek, jak i okrągłą pieczęć w prawym dolnym rogu. Dzięki temu kompozycja nadal ma trzy poziomy informacji: czerwony znak nadawcy, dominujące hasło oraz korektorską kreskę. Tekstura jest ograniczona do konstrukcji stempla, aby „Skille AI” pozostało czytelne również po zmniejszeniu.

Specyfikacja:

- Plansza CSS: 1460 x 920 px.
- Stempel: 430 x 118 px, wyrównany do prawej strony bloku hasła.
- Obrót: -2 stopnie.
- Dwa obrysy: 3,2 i 1,2 px.
- „Skille AI”: Instrument Serif 400, 48 px.
- „ORYGINAŁ PL”: IBM Plex Mono 500, 14 px, tracking 1,4 px.
- „NIE TŁUMACZONE”: IBM Plex Mono 500, 12,5 px, tracking 1,1 px.
- Odstęp między stemplem i hasłem: 28 px.
- Kolor całego stempla: #9F2F2D albo #CE6B66.
- Okrągła pieczęć zostaje usunięta z tego lockupu.
- Hasło i korektorska kreska zachowują obecne parametry.

Kod do wstawienia do `napis.mjs`:

```js
const STEMPEL_NADAWCY = (kolor) => `
<svg
  class="stempel-nadawcy"
  viewBox="0 0 430 118"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <filter
      id="tusz-nadawcy"
      x="-5%"
      y="-10%"
      width="110%"
      height="120%"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.62"
        numOctaves="2"
        seed="17"
        result="szum"
      />
      <feColorMatrix
        in="szum"
        type="matrix"
        values="
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 1.35 -0.12
        "
        result="maska"
      />
      <feComposite
        in="SourceGraphic"
        in2="maska"
        operator="in"
      />
    </filter>
  </defs>

  <g
    fill="none"
    stroke="${kolor}"
    filter="url(#tusz-nadawcy)"
  >
    <rect
      x="4"
      y="4"
      width="422"
      height="110"
      stroke-width="3.2"
    />
    <rect
      x="10"
      y="10"
      width="410"
      height="98"
      stroke-width="1.2"
      opacity=".68"
    />
    <path
      d="M238 13 L238 105"
      stroke-width="1.8"
    />
  </g>

  <text
    x="24"
    y="72"
    fill="${kolor}"
    font-family="'Instrument Serif', Georgia, serif"
    font-size="48"
    font-weight="400"
    letter-spacing="-1"
  >Skille AI</text>

  <text
    x="257"
    y="49"
    fill="${kolor}"
    font-family="'IBM Plex Mono', monospace"
    font-size="14"
    font-weight="500"
    letter-spacing="1.4"
  >ORYGINAŁ PL</text>

  <text
    x="257"
    y="76"
    fill="${kolor}"
    font-family="'IBM Plex Mono', monospace"
    font-size="12.5"
    font-weight="500"
    letter-spacing="1.1"
  >NIE TŁUMACZONE</text>
</svg>`;

function napisOdbitkaNadawcy({
  tlo,
  atrament,
  atrament2,
  kolorKreski
}) {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<style>
@font-face{
  font-family:'Instrument Serif';
  font-style:normal;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'Instrument Serif';
  font-style:normal;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')
}
@font-face{
  font-family:'Instrument Serif';
  font-style:italic;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-italic-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'Instrument Serif';
  font-style:italic;
  font-weight:400;
  src:url(${fontUrl("instrument-serif-400-italic-latin.woff2")}) format('woff2')
}
@font-face{
  font-family:'IBM Plex Mono';
  font-style:normal;
  font-weight:500;
  src:url(${fontUrl("ibm-plex-mono-500-latin-ext.woff2")}) format('woff2');
  unicode-range:U+0100-02BA
}
@font-face{
  font-family:'IBM Plex Mono';
  font-style:normal;
  font-weight:500;
  src:url(${fontUrl("ibm-plex-mono-500-latin.woff2")}) format('woff2')
}

*{
  margin:0;
  box-sizing:border-box
}

html,
body{
  width:1460px;
  height:920px
}

body{
  overflow:hidden;
  display:grid;
  place-items:center;
  background:${tlo};
  font-synthesis:none;
  text-rendering:geometricPrecision
}

.blok{
  position:relative;
  width:max-content;
  text-align:left
}

.pas-nadawcy{
  display:flex;
  justify-content:flex-end;
  padding-right:38px;
  margin-bottom:28px
}

.stempel-nadawcy{
  display:block;
  width:430px;
  height:118px;
  overflow:visible;
  transform:rotate(-2deg);
  transform-origin:center
}

h1{
  font-family:'Instrument Serif',Georgia,serif;
  font-size:152px;
  font-weight:400;
  line-height:1.1;
  letter-spacing:-.025em;
  color:${atrament}
}

h1 em{
  font-style:italic;
  color:${atrament2}
}

.kr{
  position:relative;
  white-space:nowrap
}

.kr i{
  position:absolute;
  left:-1.5%;
  right:-2%;
  bottom:-.02em;
  height:.12em;
  font-style:normal;
  background:url('data:image/svg+xml,${KRESKA("__KOLOR__")}')
    no-repeat center / 100% 100%
}
</style>
</head>
<body>
<main class="blok">
  <div class="pas-nadawcy" aria-label="Skille AI">
    ${STEMPEL_NADAWCY(kolorKreski)}
  </div>

  <h1>
    Pisane od zera<br>
    pod <span class="kr">polskie realia<i aria-hidden="true"></i></span>.<br>
    <em>Nie tłumaczone.</em>
  </h1>
</main>
</body>
</html>`.replace("__KOLOR__", encodeURIComponent(kolorKreski));
}
```

Rekomenduję „Sygnaturę autorską”, ponieważ naprawia hierarchię najprostszymi środkami, zachowuje siłę hasła i daje „Skille AI” formę możliwą do konsekwentnego używania w całej identyfikacji. „Odbitkę nadawcy” wybrałbym jako wariant bardziej ekspresyjny do kampanii, okładek i materiałów, w których drukarska materia może odgrywać większą rolę.
