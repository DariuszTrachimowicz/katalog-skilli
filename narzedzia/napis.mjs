#!/usr/bin/env node
// Generator znaków motywu przewodniego. Po rundzie 2 konceptów (docs/motyw-pl/napis/)
// zestaw docelowy wybrany przez właściciela 20 sierpnia 2026:
//   napis-*     sam trzyliniowy claim (bez nadawcy), 4 tła
//   winieta-*   plansza główna, koncept A: winieta "Skille AI" + podwójna linia
//               redakcyjna + claim + pieczątka, 4 tła
//   logotyp-*   koncept D: samodzielny lockup nazwy (nazwa + linia + linijka mono), 4 tła
//   podpis-*    koncept B, wariant dokumentowy: claim + podpis "Skille AI" na linii
//               z przybitą pieczątką, 4 tła
//   pieczatka-* sama okrągła pieczęć ORYGINAŁ PL, 2 tusze
// Uruchomienie: node narzedzia/napis.mjs   (wymaga Chrome na maszynie)
// Wynik trafia do szablony/napis/ i jest commitowany do repo. Render w 2x.

import { writeFileSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
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

const FONTY = `
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')}
@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${fontUrl("instrument-serif-400-italic-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${fontUrl("instrument-serif-400-italic-latin.woff2")}) format('woff2')}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url(${fontUrl("ibm-plex-mono-500-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url(${fontUrl("ibm-plex-mono-500-latin.woff2")}) format('woff2')}
*{margin:0;box-sizing:border-box}`;

// Kreska korektorska: lekko wygięty ślad flamastra, z małym przewieszeniem.
const KRESKA = (kolor) => encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 14" preserveAspectRatio="none">` +
  `<path d="M3,9 C40,5.5 90,4 122,4.6 C155,5.2 185,6.8 197,6" fill="none" stroke="${kolor}" stroke-width="5.4" stroke-linecap="round"/>` +
  `<path d="M6,10.5 C50,7.5 105,6 140,6.4 C165,6.7 186,7.6 195,7.2" fill="none" stroke="${kolor}" stroke-width="2.6" stroke-linecap="round" opacity=".55"/>` +
  `</svg>`
);

// Pieczątka "ORYGINAŁ PL": okrągły stempel urzędowy z fakturą tuszu.
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

const HASLO = `<h1>Pisane od zera<br>pod <span class="kr">polskie realia<i></i></span>.<br><em>Nie tłumaczone.</em></h1>`;

const BAZA_CSS = (p) => `
body{background:${p.tlo};display:flex;align-items:center;justify-content:center}
.blok{text-align:left;position:relative}
h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:152px;line-height:1.1;
  letter-spacing:-.025em;color:${p.atrament}}
h1 em{font-style:italic;color:${p.atrament2}}
.kr{position:relative;white-space:nowrap}
.kr i{position:absolute;left:-1.5%;right:-2%;bottom:-.02em;height:.12em;font-style:normal;
  background:url('data:image/svg+xml,${KRESKA("__K__")}') no-repeat center/100% 100%}`
  .replace("__K__", encodeURIComponent(p.kolorKreski));

// Sam claim, bez nadawcy.
function stronaNapisu(p) {
  return `<style>${FONTY}${BAZA_CSS(p)}
body{width:1460px;height:800px}
</style><body><div class="blok">${HASLO}</div></body>`;
}

// Koncept A: winieta czasopisma (e1-liternik + e6-polska-szkola, wybór właściciela).
function stronaWiniety(p) {
  return `<style>${FONTY}${BAZA_CSS(p)}
body{width:1460px;height:940px}
.winieta{font-family:'Instrument Serif',Georgia,serif;font-size:78px;letter-spacing:-.015em;color:${p.atrament};margin:0 0 16px}
.winieta .ai{color:${p.kolorKreski}}
.linia{border-top:4px double ${p.atrament};margin:0 0 52px}
.pieczatka{position:absolute;width:225px;height:225px;right:-80px;bottom:-56px;transform:rotate(-12deg);opacity:.93}
</style><body><div class="blok">
<p class="winieta">Skille <span class="ai">AI</span></p><div class="linia"></div>
${HASLO}${STEMPEL(p.kolorKreski)}</div></body>`;
}

// Koncept D: samodzielny lockup nazwy (e2-brand).
function stronaLogotypu(p) {
  return `<style>${FONTY}
body{width:1460px;height:560px;background:${p.tlo};display:flex;align-items:center;justify-content:center}
.logo h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:132px;line-height:1;letter-spacing:-.02em;color:${p.atrament}}
.logo h1 span{color:${p.kolorKreski}}
.logo hr{border:0;height:2px;background:${p.linia};margin:24px 0 20px}
.logo p{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:23px;line-height:1;letter-spacing:.27em;
  text-transform:uppercase;color:${p.przygaszony}}
</style><body><div class="logo">
<h1>Skille <span>AI</span></h1><hr><p>Pisane od zera pod polskie realia</p>
</div></body>`;
}

// Koncept B: podpis na linii z przybitą pieczątką (e4-artdirector), wariant dokumentowy.
function stronaPodpisu(p) {
  return `<style>${FONTY}${BAZA_CSS(p)}
body{width:1460px;height:940px}
.podpis{display:flex;align-items:center;justify-content:flex-end;margin-top:56px}
.podpis::before{content:"";flex:1;height:1px;background:${p.przygaszony};opacity:.55;margin-right:36px}
.nazwa{font-family:'Instrument Serif',Georgia,serif;font-size:72px;letter-spacing:-.02em;color:${p.atrament}}
.nazwa b{font-weight:400;color:${p.kolorKreski}}
.pieczatka{width:190px;height:190px;transform:rotate(-9deg);opacity:.9;margin-left:-34px;margin-bottom:-26px;flex:0 0 auto}
</style><body><div class="blok">
${HASLO}
<div class="podpis"><span class="nazwa">Skille <b>AI</b></span>${STEMPEL(p.kolorKreski)}</div>
</div></body>`;
}

// Sama pieczątka, na przezroczystym tle.
function stronaPieczatki(kolor) {
  return `<style>${FONTY}
body{width:560px;height:560px;background:transparent;display:grid;place-items:center}
.pieczatka{width:520px;height:520px}
</style><body>${STEMPEL(kolor)}</body>`;
}

const JASNY = { tlo: "#FBFBFA", atrament: "#1F2023", atrament2: "#4A4B4F", przygaszony: "#787774", linia: "#B7B6B1", kolorKreski: "#9F2F2D" };
const CIEMNY = { tlo: "#17181B", atrament: "#F4F2EC", atrament2: "#B7B6B1", przygaszony: "#8C8B87", linia: "#4A4B4F", kolorKreski: "#CE6B66" };

const WARIANTY = [];
for (const [rdzen, budowa, w, h] of [
  ["napis", stronaNapisu, 1460, 800],
  ["winieta", stronaWiniety, 1460, 940],
  ["logotyp", stronaLogotypu, 1460, 560],
  ["podpis", stronaPodpisu, 1460, 940],
]) {
  WARIANTY.push(
    { plik: `${rdzen}-jasny.png`, html: budowa(JASNY), w, h },
    { plik: `${rdzen}-ciemny.png`, html: budowa(CIEMNY), w, h },
    { plik: `${rdzen}-przezroczysty.png`, html: budowa({ ...JASNY, tlo: "transparent" }), w, h },
    { plik: `${rdzen}-przezroczysty-bialy.png`, html: budowa({ ...CIEMNY, tlo: "transparent" }), w, h },
  );
}
WARIANTY.push(
  { plik: "pieczatka-pl.png", html: stronaPieczatki(JASNY.kolorKreski), w: 560, h: 560 },
  { plik: "pieczatka-pl-rozjasniona.png", html: stronaPieczatki(CIEMNY.kolorKreski), w: 560, h: 560 },
);

rmSync(ROBOCZY, { recursive: true, force: true });
rmSync(CEL, { recursive: true, force: true });
mkdirSync(ROBOCZY, { recursive: true });
mkdirSync(CEL, { recursive: true });

for (const w of WARIANTY) {
  const html = join(ROBOCZY, w.plik.replace(/\.png$/, ".html"));
  const cel = join(CEL, w.plik);
  writeFileSync(html, `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8">${w.html}</html>`);
  // Ponawianie jak w grafiki.mjs; zapis PNG bywa domykany chwilę PO wyjściu procesu.
  for (let proba = 1; proba <= 3; proba++) {
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=2", "--default-background-color=00000000",
      `--user-data-dir=${join(ROBOCZY, `profil-${w.plik}-${proba}`)}`,
      `--window-size=${w.w},${w.h}`, `--screenshot=${cel}`, pathToFileURL(html).href,
    ], { stdio: "ignore", timeout: 60000 });
    for (let i = 0; i < 20 && !(existsSync(cel) && statSync(cel).size > 20000); i++)
      execFileSync(process.execPath, ["-e", "setTimeout(()=>{},300)"]);
    if (existsSync(cel) && statSync(cel).size > 20000) break;
    if (proba === 3) { console.error(`Nie udało się wyrenderować ${w.plik}`); process.exit(1); }
  }
  console.log(`  napis  ${w.plik}  (${Math.round(statSync(cel).size / 1024)} KB)`);
}
console.log(`Gotowe: ${WARIANTY.length} grafik w szablony/napis/`);
