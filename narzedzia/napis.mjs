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

function napis({ tlo, atrament, atrament2, kolorKreski }) {
  return `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"><style>
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')}
@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${fontUrl("instrument-serif-400-italic-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${fontUrl("instrument-serif-400-italic-latin.woff2")}) format('woff2')}
*{margin:0;box-sizing:border-box}
body{width:1460px;height:800px;background:${tlo};display:flex;align-items:center;justify-content:center}
h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:152px;line-height:1.1;
  letter-spacing:-.025em;color:${atrament};text-align:left}
h1 em{font-style:italic;color:${atrament2}}
.kr{position:relative;white-space:nowrap}
.kr i{position:absolute;left:-1.5%;right:-2%;bottom:-.02em;height:.12em;font-style:normal;
  background:url('data:image/svg+xml,${KRESKA("__KOLOR__")}') no-repeat center/100% 100%}
</style></head><body>
<h1>Pisane od zera<br>pod <span class="kr">polskie realia<i></i></span>.<br><em>Nie tłumaczone.</em></h1>
</body></html>`.replace("__KOLOR__", encodeURIComponent(kolorKreski));
}

const WARIANTY = [
  { plik: "napis-jasny.png",               tlo: "#FBFBFA",     atrament: "#1F2023", atrament2: "#4A4B4F", kolorKreski: "#9F2F2D" },
  { plik: "napis-ciemny.png",              tlo: "#17181B",     atrament: "#F4F2EC", atrament2: "#B7B6B1", kolorKreski: "#CE6B66" },
  { plik: "napis-przezroczysty.png",       tlo: "transparent", atrament: "#1F2023", atrament2: "#4A4B4F", kolorKreski: "#9F2F2D" },
  { plik: "napis-przezroczysty-bialy.png", tlo: "transparent", atrament: "#F4F2EC", atrament2: "#B7B6B1", kolorKreski: "#CE6B66" },
];

rmSync(ROBOCZY, { recursive: true, force: true });
mkdirSync(ROBOCZY, { recursive: true });
mkdirSync(CEL, { recursive: true });

for (const w of WARIANTY) {
  const html = join(ROBOCZY, w.plik.replace(/\.png$/, ".html"));
  const cel = join(CEL, w.plik);
  writeFileSync(html, napis(w));
  // Ponawianie jak w grafiki.mjs: Chrome przy serii potrafi oddać pustą kartę.
  // Zapis PNG bywa domykany chwilę PO wyjściu procesu, stąd odczekanie.
  for (let proba = 1; proba <= 3; proba++) {
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=2", "--default-background-color=00000000",
      `--user-data-dir=${join(ROBOCZY, `profil-${w.plik}-${proba}`)}`,
      "--window-size=1460,800", `--screenshot=${cel}`, pathToFileURL(html).href,
    ], { stdio: "ignore", timeout: 60000 });
    for (let i = 0; i < 20 && !(existsSync(cel) && statSync(cel).size > 20000); i++)
      execFileSync(process.execPath, ["-e", "setTimeout(()=>{},300)"]);
    if (existsSync(cel) && statSync(cel).size > 20000) break;
    if (proba === 3) { console.error(`Nie udało się wyrenderować ${w.plik}`); process.exit(1); }
  }
  console.log(`  napis  ${w.plik}  (${Math.round(statSync(cel).size / 1024)} KB)`);
}
console.log(`Gotowe: ${WARIANTY.length} grafiki w szablony/napis/`);
