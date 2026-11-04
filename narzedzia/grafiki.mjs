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

// Kolory dziedzin jak na stronie (szablony/styl.css, klasy k-*).
const KOLORY = {
  Prawo: ["#1f4fd1", "#e5edff"], Finanse: ["#0b7a52", "#e1f4ea"], Kadry: ["#a14a06", "#fdf0df"],
  Biuro: ["#6d36d9", "#efe8ff"], Marketing: ["#b53b0a", "#ffeae1"], Dane: ["#0d6b85", "#dff3f7"],
};

const fontUrl = (n) => pathToFileURL(join(KORZEN, "szablony", "fonty", n)).href;
const logoUrl = pathToFileURL(join(KORZEN, "szablony", "ai-xperts-sygnet-black.png")).href;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function karta({ kategoria, tytul, opis, stopka }) {
  const [c, cb] = KOLORY[kategoria] || ["#0047c2", "#eef3fd"];
  return `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"><style>
@font-face{font-family:"Red Hat Display";font-weight:500 900;src:url(${fontUrl("red-hat-display-latin-ext.woff2")}) format("woff2");unicode-range:U+0100-02BA}
@font-face{font-family:"Red Hat Display";font-weight:500 900;src:url(${fontUrl("red-hat-display-latin.woff2")}) format("woff2")}
@font-face{font-family:"Red Hat Text";font-weight:400 700;src:url(${fontUrl("red-hat-text-latin-ext.woff2")}) format("woff2");unicode-range:U+0100-02BA}
@font-face{font-family:"Red Hat Text";font-weight:400 700;src:url(${fontUrl("red-hat-text-latin.woff2")}) format("woff2")}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#fff;color:#0d2340;font-family:"Red Hat Text",sans-serif;
  padding:54px 64px;display:flex;flex-direction:column;position:relative;overflow:hidden}
.panel{position:absolute;right:-120px;top:-80px;width:520px;height:820px;background:#eef3fd;transform:skewX(-9deg);border-radius:0 0 0 60px}
.plama{position:absolute;right:-70px;bottom:-110px;width:300px;height:300px;border-radius:60px;background:linear-gradient(135deg,#005eff,#18b4f0);transform:rotate(28deg);opacity:.9}
.gora{display:flex;align-items:center;gap:18px;position:relative}
.gora img{width:64px;height:64px;border-radius:12px}
.marka{font-family:"Red Hat Display";font-size:28px;font-weight:800;letter-spacing:-.01em}
.marka span{display:block;font-family:"Red Hat Text";font-size:17px;font-weight:500;color:#56657c}
.tag{margin-left:auto;background:${cb};color:${c};border-radius:9999px;padding:10px 24px;font-family:"Red Hat Display";font-size:20px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.srodek{flex:1;display:flex;flex-direction:column;justify-content:center;position:relative;gap:20px;max-width:900px}
h1{font-family:"Red Hat Display";font-weight:800;font-size:72px;line-height:1.04;letter-spacing:-.02em;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.kreska{width:120px;height:8px;border-radius:8px;background:${c}}
.opis{font-size:30px;line-height:1.38;color:#3b4d68;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.dol{display:flex;align-items:center;gap:18px;position:relative;border-top:1px solid #dde5f1;padding-top:24px;font-size:22px;color:#56657c}
.dol b{color:#0d2340;font-weight:700}
</style></head><body>
<div class="panel"></div><div class="plama"></div>
<div class="gora">
  <img src="${logoUrl}" alt="">
  <div class="marka">${esc(cfg.nazwaSerwisu)}<span>darmowe skille AI pod polskie realia</span></div>
  ${kategoria ? `<div class="tag">${esc(kategoria)}</div>` : ""}
</div>
<div class="srodek"><div class="kreska"></div><h1>${esc(tytul)}</h1><p class="opis">${esc(opis)}</p></div>
<div class="dol"><span><b>${esc(cfg.domena)}</b> &nbsp;·&nbsp; ${esc(stopka)}</span></div>
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
  { plik: "katalog.png", html: karta({ tytul: "Skille AI pisane pod polskie realia", opis: "Umowy, faktury, KSeF, RODO, kadry i biuro. Wgrywasz do Claude albo ChatGPT i pracujesz po polsku.", stopka: `${skille.length} skilli · za darmo · licencja GPL` }) },
  { plik: "regulamin.png", html: karta({ tytul: "Regulamin", opis: "Zasady korzystania z katalogu, pobierania skilli i newslettera.", stopka: cfg.nazwaSerwisu }) },
  { plik: "prywatnosc.png", html: karta({ tytul: "Prywatność", opis: "Jakie dane zbiera katalog i co się z nimi dzieje. Bez śledzenia, bez profilowania.", stopka: cfg.nazwaSerwisu }) },
  ...skille.map((s) => ({
    plik: `${s.id}.png`,
    html: karta({ kategoria: s.kategoria, tytul: s.nazwa, opis: s.korzysc || s.skrot, stopka: "Darmowy skill · Claude i ChatGPT" }),
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
