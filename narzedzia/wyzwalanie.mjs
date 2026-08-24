#!/usr/bin/env node
// Miernik wyzwalania opisu skilla (trigger-zestaw z komendy terytorium), v2
// po recenzji metodologicznej. Windows-safe zamiennik run_eval.py ze
// skill-creatora (tamten pada na select.select).
//
// Mechanika: tymczasowy projekt z .claude/skills/ zawierajacym atrapy
// (opis realny, cialo zredukowane do markera) CALEGO katalogu: darmowe,
// platne i triale, zeby miernik mogl wykryc kolizje NIEPRZEWIDZIANA przez
// autora zestawu (waski pool z samych negatywow mierzy tylko to, co autor
// juz podejrzewa). `claude -p "<zapytanie>"` per przebieg; marker w stdout
// mowi, ktory opis wygral. Marker jest niepodrabialny w praktyce: zyje
// wylacznie w ciele atrapy, wiec model nie wypisze go bez jej wczytania
// (detekcja po zdarzeniu tool_use: odlozona, patrz terytorium.md).
//
// Uzycie:  node narzedzia/wyzwalanie.mjs <id> [plik-zestawu] [--waskie]
//              [--powtorzenia N]
//   plik domyslnie testy/wyzwalanie/<id>.md; uruchamiaj z katalog-skilli/
//   --waskie: tlo tylko z wlascicieli negatywow (szybki smoke, NIE do bramki)
//   --powtorzenia N: przebiegi na zapytanie (domyslnie 3; bramka wymaga >=3)
//
// Format zestawu (linia na zapytanie, puste i # pomijane):
//   + zapytanie, na ktore skill POWINIEN sie uruchomic
//   - zapytanie near-miss | wlasciciel: <id-sasiada>[,<id2>]
//   0 zapytanie, na ktore NIKT nie powinien sie uruchomic (za proste,
//     faktograficzne, bez zadania) - mierzy over-triggering
//
// Pelny zestaw do bramki: >=8 "+", >=8 "-", >=2 "0", razem 16-20.
// Zestaw mniejszy = status DYMNY (kod 3 przy czystym wyniku): narzedzie
// dziala, ale wynik NIE zalicza bramki terytorium.
//
// Kody wyjscia: 0 = pelny zestaw, bez rozjazdow; 1 = rozjazdy/NIESTABILNY/
// BLAD; 2 = zle wywolanie; 3 = czysto, ale zestaw DYMNY.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const argv = process.argv.slice(2);
const flagi = new Set(argv.filter((a) => a.startsWith("--")));
let powtorzenia = 3;
const poz = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--powtorzenia") { powtorzenia = Math.max(1, Number(argv[++i]) || 1); continue; }
  if (argv[i].startsWith("--")) continue;
  poz.push(argv[i]);
}
const id = poz[0];
if (!id) { console.error("Uzycie: node narzedzia/wyzwalanie.mjs <id> [plik-zestawu] [--waskie] [--powtorzenia N]"); process.exit(2); }
const zestawP = poz[1] || join("testy", "wyzwalanie", `${id}.md`);
if (!existsSync(zestawP)) { console.error(`Brak zestawu: ${zestawP}`); process.exit(2); }

// Platne PRZED darmowymi: karta platnego w skille/ to zajawka bez description
// sterujacego, wiec odwrotna kolejnosc podmienilaby testowany opis po cichu.
const KORZENIE = [join("..", "skille-platne"), "skille", "paczki-zewnetrzne"];
function opisSkilla(sid) {
  for (const k of KORZENIE) {
    const p = join(k, sid, "SKILL.md");
    if (!existsSync(p)) continue;
    const fm = readFileSync(p, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || "";
    const linie = fm.split("\n");
    const start = linie.findIndex((l) => l.startsWith("description:"));
    if (start < 0) continue;
    let d = linie[start].replace(/^description:\s*/, "");
    for (let i = start + 1; i < linie.length; i++) {
      if (/^[\w-]+:/.test(linie[i])) break;
      d += " " + linie[i].trim();
    }
    return d.replace(/^['"]|['"]$/g, "").trim();
  }
  return null;
}
function wszystkieSkille() {
  const ids = new Set();
  for (const k of KORZENIE) {
    if (!existsSync(k)) continue;
    for (const w of readdirSync(k)) {
      if (existsSync(join(k, w, "SKILL.md"))) ids.add(w);
    }
  }
  return [...ids];
}

// --- zestaw ---
const przypadki = [];
let nPlus = 0, nMinus = 0, nZero = 0;
for (const linia of readFileSync(zestawP, "utf8").split("\n")) {
  const t = linia.trim();
  if (!t || t.startsWith("#")) continue;
  if (t.startsWith("+ ")) { przypadki.push({ zapytanie: t.slice(2).trim(), oczekiwani: [id] }); nPlus++; }
  else if (t.startsWith("0 ")) { przypadki.push({ zapytanie: t.slice(2).trim(), oczekiwani: ["ZADEN"] }); nZero++; }
  else if (t.startsWith("- ")) {
    const [q, meta] = t.slice(2).split("|");
    const wl = meta?.match(/wlasciciel:\s*([\w,\s-]+)/)?.[1];
    if (!wl) { console.error(`Negatyw bez pola wlasciciel: ${t}`); process.exit(2); }
    przypadki.push({ zapytanie: q.trim(), oczekiwani: wl.split(",").map((x) => x.trim()).filter(Boolean) });
    nMinus++;
  }
}
if (!przypadki.length) { console.error("Zestaw pusty."); process.exit(2); }
const pelny = nPlus >= 8 && nMinus >= 8 && nZero >= 2 && przypadki.length >= 16 && przypadki.length <= 20 && powtorzenia >= 3 && !flagi.has("--waskie");

// --- tlo ---
const tlo = flagi.has("--waskie")
  ? [...new Set(przypadki.flatMap((p) => p.oczekiwani).concat(id).filter((x) => x !== "ZADEN"))]
  : wszystkieSkille().concat(id);
const uczestnicy = [...new Set(tlo)];

// --- tymczasowy projekt ---
const proj = join(tmpdir(), `wyzwalanie-${id}-${Date.now()}`);
let zbudowani = 0;
for (const sid of uczestnicy) {
  const opis = opisSkilla(sid);
  if (!opis) {
    if (sid === id || przypadki.some((p) => p.oczekiwani.includes(sid))) {
      console.error(`Brak SKILL.md/description dla wymaganego skilla: ${sid}`); process.exit(2);
    }
    continue; // skill tla bez opisu pomijamy z ostrzezeniem zbiorczym
  }
  const dir = join(proj, ".claude", "skills", sid);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "SKILL.md"),
    `---\nname: ${sid}\ndescription: '${opis.replace(/'/g, "''")}'\n---\n\n` +
    `To atrapa do pomiaru wyzwalania. Odpowiedz WYLACZNIE jednym wierszem:\n[URUCHOMIONY:${sid}]\n`);
  zbudowani++;
}

console.log(`Miernik wyzwalania: ${id}`);
console.log(`Zestaw: ${przypadki.length} zapytan (+${nPlus} / -${nMinus} / 0:${nZero}), powtorzenia: ${powtorzenia}, tlo: ${zbudowani} opisow${flagi.has("--waskie") ? " (WASKIE)" : ""}`);
if (!pelny) console.log("UWAGA: zestaw/tryb DYMNY, wynik nie zalicza bramki terytorium (pelny: >=8 plus, >=8 minus, >=2 zero, 16-20 zapytan, >=3 powtorzenia, pelne tlo).");

// --- przebiegi ---
let zgodne = 0; const problemy = [];
for (const [i, p] of przypadki.entries()) {
  const glosy = [];
  for (let r = 0; r < powtorzenia; r++) {
    const w = spawnSync("claude", ["-p", p.zapytanie, "--max-turns", "6"],
      { cwd: proj, encoding: "utf8", timeout: 240000 });
    if (w.error || w.status !== 0 || !w.stdout) { glosy.push("BLAD"); continue; }
    const trafienia = [...new Set([...w.stdout.matchAll(/\[URUCHOMIONY:([\w-]+)\]/g)].map((m) => m[1]))];
    glosy.push(trafienia.length === 0 ? "ZADEN" : trafienia.length === 1 ? trafienia[0] : `WIELE(${trafienia.join(",")})`);
  }
  const liczniki = {}; for (const g of glosy) liczniki[g] = (liczniki[g] || 0) + 1;
  const [zwyciezca, ile] = Object.entries(liczniki).sort((a, b) => b[1] - a[1])[0];
  const wiekszosc = ile > powtorzenia / 2;
  let status;
  if (glosy.includes("BLAD") && !wiekszosc) status = "BLAD";
  else if (!wiekszosc) status = "NIESTABILNY";
  else if (zwyciezca === "BLAD") status = "BLAD";
  else status = p.oczekiwani.includes(zwyciezca) ? "OK" : "ROZJAZD";
  if (status === "OK") zgodne++; else problemy.push({ ...p, glosy, status });
  console.log(`${status.padEnd(11)} [${i + 1}/${przypadki.length}] oczekiwani=${p.oczekiwani.join("/")} glosy=${glosy.join(",")} :: ${p.zapytanie.slice(0, 60)}`);
}

try { rmSync(proj, { recursive: true, force: true }); }
catch { console.log(`(sprzatanie: zostal katalog tymczasowy ${proj})`); }

console.log(`\nWynik: ${zgodne}/${przypadki.length} zgodnych${pelny ? "" : " (DYMNY)"}.`);
for (const r of problemy) console.log(`  ${r.status}: oczekiwani=${r.oczekiwani.join("/")}, glosy=${r.glosy.join(",")} :: ${r.zapytanie.slice(0, 80)}`);
if (problemy.some((r) => r.status === "ROZJAZD")) console.log("\nKolizje do rozstrzygniecia ruchami z komendy terytorium.");
if (problemy.some((r) => r.status === "NIESTABILNY")) console.log("Wyniki NIESTABILNE: zapytanie na granicy opisow, doprecyzuj description albo zapytanie.");
if (problemy.some((r) => r.status === "BLAD")) console.log("Przebiegi z BLEDEM nie wchodza do werdyktu: powtorz po sprawdzeniu srodowiska.");
process.exit(problemy.length ? 1 : (pelny ? 0 : 3));
