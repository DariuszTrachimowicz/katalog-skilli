#!/usr/bin/env node
// Generator grafik podglądu (Open Graph, 1200×630), po jednej na skill + karta katalogu.
// Uruchomienie: node narzedzia/grafiki.mjs   (wymaga Chrome na maszynie)
//
// Wynik trafia do szablony/og/ i jest commitowany do repo, build tylko kopiuje
// gotowe PNG, więc serwer nie potrzebuje Chrome. Po dodaniu skilla uruchom ponownie.

import { readFileSync, readdirSync, writeFileSync, mkdirSync, statSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { frontmatter } from "./markdown.mjs";

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(KORZEN, "config.json"), "utf8"));
const CEL = join(KORZEN, "szablony", "og");
const ROBOCZY = join(tmpdir(), "og-robocze");

const CHROME = [
  process.env.CHROME,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome",
].filter(Boolean).find((p) => existsSync(p));
if (!CHROME) { console.error("Nie znalazłem Chrome, ustaw zmienną CHROME."); process.exit(1); }

// Kolory kategorii jak na stronie, dobrane pod ciemne tło karty.
const KOLORY = {
  Prawo: "#E8938F", Biuro: "#7FC4EE", Finanse: "#8FC493",
  Kadry: "#E3B65C", Marketing: "#C9C9C6", Dane: "#C9C9C6", Pracownia: "#8FC493",
};

const fontUrl = (n) => pathToFileURL(join(KORZEN, "szablony", "fonty", n)).href;
const logoUrl = pathToFileURL(join(KORZEN, "szablony", "logo-sygnet.png")).href;
const wordmarkUrl = pathToFileURL(join(KORZEN, "szablony", "logo-wordmark.png")).href;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function karta({ kategoria, tytul, opis, stopka }) {
  const akcent = KOLORY[kategoria] || "#C9C9C6";
  return `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"><style>
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:normal;font-weight:400;src:url(${fontUrl("instrument-serif-400-latin.woff2")}) format('woff2')}
@font-face{font-family:'Inter Tight';font-weight:400;src:url(${fontUrl("inter-tight-400-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Inter Tight';font-weight:400;src:url(${fontUrl("inter-tight-400-latin.woff2")}) format('woff2')}
@font-face{font-family:'Inter Tight';font-weight:500;src:url(${fontUrl("inter-tight-500-latin-ext.woff2")}) format('woff2');unicode-range:U+0100-02BA}
@font-face{font-family:'Inter Tight';font-weight:500;src:url(${fontUrl("inter-tight-500-latin.woff2")}) format('woff2')}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#17181B;color:#F4F2EC;font-family:'Inter Tight',sans-serif;
  padding:56px 64px;display:flex;flex-direction:column;position:relative;overflow:hidden}
.blask{position:absolute;width:900px;height:900px;right:-300px;top:-420px;border-radius:50%;
  background:radial-gradient(circle,rgba(31,108,159,.32),transparent 65%)}
.gora{display:flex;align-items:center;gap:20px;position:relative}
.gora img{width:76px;height:76px}
.marka{font-size:28px;font-weight:500;letter-spacing:-.01em}
.marka span{display:block;font-size:17px;font-weight:400;color:#9B9A96;letter-spacing:.01em}
.tag{margin-left:auto;border:1.5px solid ${akcent};color:${akcent};border-radius:9999px;
  padding:9px 22px;font-size:19px;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.srodek{flex:1;display:flex;flex-direction:column;justify-content:center;position:relative;gap:22px}
h1{font-family:'Instrument Serif',serif;font-weight:400;font-size:76px;line-height:1.06;letter-spacing:-.01em;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.opis{font-size:29px;line-height:1.42;color:#B9B8B4;max-width:960px;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.dol{display:flex;align-items:center;justify-content:space-between;position:relative;
  border-top:1px solid #2E2F33;padding-top:26px;font-size:22px;color:#9B9A96}
.dol b{color:#F4F2EC;font-weight:500}
.dol img{height:44px;margin:-8px 0}
</style></head><body>
<div class="blask"></div>
<div class="gora">
  <img src="${logoUrl}" alt="">
  <div class="marka">${esc(cfg.nazwaSerwisu)}<span>katalog umiejętności AI po polsku</span></div>
  ${kategoria ? `<div class="tag">${esc(kategoria)}</div>` : ""}
</div>
<div class="srodek"><h1>${esc(tytul)}</h1><p class="opis">${esc(opis)}</p></div>
<div class="dol"><span><b>${esc(cfg.domena)}</b> &nbsp;·&nbsp; ${esc(stopka)}</span><img src="${wordmarkUrl}" alt="AI Xperts"></div>
</body></html>`;
}

/* ---------- dane ---------- */

const skille = readdirSync(join(KORZEN, "skille"))
  .filter((d) => statSync(join(KORZEN, "skille", d)).isDirectory())
  .map((id) => {
    const p = join(KORZEN, "skille", id, "wpis.md");
    if (!existsSync(p)) return null;
    return { id, ...frontmatter(readFileSync(p, "utf8")).dane };
  })
  .filter(Boolean);

/* ---------- render ---------- */

rmSync(ROBOCZY, { recursive: true, force: true });
mkdirSync(ROBOCZY, { recursive: true });
mkdirSync(CEL, { recursive: true });

const zadania = [
  { plik: "katalog.png", html: karta({ tytul: "Pisane od zera pod polskie realia. Nie tłumaczone.", opis: cfg.opisSerwisu, stopka: `${skille.length} umiejętności · za darmo · Claude i ChatGPT` }) },
  { plik: "regulamin.png", html: karta({ tytul: "Regulamin", opis: "Zasady korzystania z katalogu, pobierania skilli i newslettera.", stopka: cfg.nazwaSerwisu }) },
  { plik: "prywatnosc.png", html: karta({ tytul: "Prywatność", opis: "Jakie dane zbiera katalog i co się z nimi dzieje. Bez śledzenia, bez profilowania.", stopka: cfg.nazwaSerwisu }) },
  { plik: "pracownia.png", html: karta({ kategoria: "Pracownia", tytul: "Dokument firmowy z rozmowy. Bez instalowania.", opis: "Odpowiadasz na pytania, a Pracownia składa gotowy plik: DOCX, PDF i HTML. Siedem narzędzi na start.", stopka: "99 zł netto/mies · 20 jednostek na dokumenty" }) },
  ...skille.map((s) => ({
    plik: `${s.id}.png`,
    html: karta({ kategoria: s.kategoria, tytul: s.nazwa, opis: s.skrot, stopka: "Do pobrania za darmo · Claude i ChatGPT" }),
  })),
];

const filtr = process.argv[2];
const doZrobienia = filtr ? zadania.filter((z) => z.plik.startsWith(filtr)) : zadania;
for (const z of doZrobienia) {
  const html = join(ROBOCZY, z.plik.replace(/\.png$/, ".html"));
  writeFileSync(html, z.html);

  // Osobny profil na wywołanie, bez tego przy szybkiej serii Chrome oddaje
  // zadanie już działającej instancji i wraca od razu, a spóźniony renderer
  // trafia potem na posprzątany katalog roboczy i nadpisuje kartę stroną błędu.
  const cel = join(CEL, z.plik);
  const czekaj = (ms) => new Promise((r) => setTimeout(r, ms));

  // Dwie pułapki Chrome'a w trybie headless: proces potrafi wrócić przed
  // dokończeniem zapisu zrzutu (stąd odpytywanie zamiast natychmiastowej oceny),
  // a deterministyczna nazwa profilu koliduje z singletonem po padzie
  // (stąd profil unikalny per uruchomienie i próba).
  let udane = false;
  for (let proba = 1; proba <= 3 && !udane; proba++) {
    const profil = join(ROBOCZY, `profil-${process.pid}-${z.plik}-${proba}`);
    rmSync(cel, { force: true });
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      `--user-data-dir=${profil}`, "--no-first-run",
      "--window-size=1200,630", `--screenshot=${cel}`, pathToFileURL(html).href,
    ], { stdio: "pipe" });
    for (let i = 0; i < 20; i++) {
      if (existsSync(cel) && statSync(cel).size > 30_000) { udane = true; break; }
      await czekaj(250);
    }
  }
  if (!udane) { console.error(`  BŁĄD: og/${z.plik} nie chce się wyrenderować`); process.exit(1); }
  console.log(`  grafika  og/${z.plik}`);
}

// Kontrola całości przed sprzątaniem: żadna karta nie może być stroną błędu.
const zepsute = doZrobienia.filter((z) => statSync(join(CEL, z.plik)).size <= 30_000);
if (zepsute.length) { console.error(`BŁĄD: uszkodzone karty: ${zepsute.map((z) => z.plik).join(", ")}`); process.exit(1); }

rmSync(ROBOCZY, { recursive: true, force: true });
console.log(`\nGotowe: ${zadania.length} grafik w szablony/og/`);
