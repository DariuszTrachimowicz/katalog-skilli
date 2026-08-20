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
