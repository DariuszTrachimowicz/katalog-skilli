#!/usr/bin/env node
// Deterministyczny walidator skilla katalogu. Zero zaleznosci, bez modelu.
// Sprawdza to, co da sie sprawdzic regexem/struktura, czyli zamyka luke
// "bramka bez runtime". Wzorzec: 59 detektorow impeccable (patrz NOTICE.md).
//
// Uzycie:  node narzedzia/walidator.mjs skille/<id>
//          node narzedzia/walidator.mjs ../skille-platne/<id>   (platny SKILL.md)
// Zwraca kod 1, gdy jest choc jeden BLAD. Ostrzezenia nie blokuja.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const KATEGORIE = ["Biuro", "Finanse", "Kadry", "Prawo", "Marketing", "Dane"];
const ZGODNOSC = ["ok", "format", "brak"];
const POZIOMY = ["Działa od razu", "Wymaga ustawienia", "Zaawansowany", "Dla technicznych"];
const SEKCJE_OBOWIAZKOWE = ["Na czym się wywala", "Czego ten skill nie robi celowo", "Przykład z życia"];

const EMDASH = String.fromCharCode(0x2014), ENDASH = String.fromCharCode(0x2013);
const bledy = [], ostrzezenia = [];
const blad = (m) => bledy.push(m);
const ostrzez = (m) => ostrzezenia.push(m);

const cel = process.argv[2];
if (!cel || !existsSync(cel)) { console.error("Podaj istniejący katalog skilla."); process.exit(2); }
const id = basename(cel);

// --- pliki rekurencyjnie ---
function pliki(katalog) {
  const out = [];
  for (const w of readdirSync(katalog)) {
    if (w.startsWith(".")) continue;
    const p = join(katalog, w);
    if (statSync(p).isDirectory()) out.push(...pliki(p));
    else out.push(p);
  }
  return out;
}
const wszystkie = pliki(cel);
if (wszystkie.length > 200) blad(`Za dużo plików: ${wszystkie.length} (limit 200 dla paczki .skill)`);
if (wszystkie.filter((p) => basename(p) === "SKILL.md").length > 1) blad("Więcej niż jeden SKILL.md w folderze");

// --- frontmatter (prosty parser linia po linii) ---
function frontmatter(tekst) {
  const m = tekst.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const dane = {}; let mapa = null;
  for (const linia of m[1].split("\n")) {
    const t = linia.trim();
    if (!t || t.startsWith("#")) continue;
    const kv = t.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let [, k, v] = kv;
    v = v.replace(/^["']|["']$/g, "");
    if (/^\s+/.test(linia) && mapa) { dane[mapa][k] = v; continue; }
    if (v === "") { dane[k] = {}; mapa = k; } else { dane[k] = v; mapa = null; }
  }
  return dane;
}

// --- wpis.md ---
const wpisP = join(cel, "wpis.md");
if (!existsSync(wpisP)) {
  // SKILL.md bez wpis.md = folder treści płatnej (skille-platne), wpis żyje w katalogu.
  if (!existsSync(join(cel, "SKILL.md"))) blad("Brak wpis.md i SKILL.md, to nie wygląda na folder skilla");
} else {
  const tekst = readFileSync(wpisP, "utf8");
  const fm = frontmatter(tekst);
  if (!fm) blad("wpis.md bez poprawnego frontmattera YAML");
  else {
    if (!fm.nazwa) blad("wpis.md: brak pola nazwa");
    if (!KATEGORIE.includes(fm.kategoria)) blad(`wpis.md: kategoria "${fm.kategoria}" spoza listy ${KATEGORIE.join("|")}`);
    if (!/^\d+\.\d+\.\d+$/.test(String(fm.wersja || ""))) ostrzez(`wpis.md: brak pola wersja w zapisie x.y.z`);
    if (fm.poziom && !POZIOMY.includes(fm.poziom)) ostrzez(`wpis.md: poziom "${fm.poziom}" spoza listy`);
    if (!fm.skrot) blad("wpis.md: brak pola skrot");
    for (const p of ["claude", "gpt", "gemini"]) {
      const v = fm.zgodnosc?.[p];
      if (v && !ZGODNOSC.includes(v)) blad(`wpis.md: zgodnosc.${p}="${v}" spoza ${ZGODNOSC.join("|")}`);
    }
    const platny = String(fm.platny) === "true";
    if (!platny) {
      // Sekcje obowiazkowe tylko dla wpisu z pelna trescia (darmowy).
      for (const s of SEKCJE_OBOWIAZKOWE) {
        if (!new RegExp(`^##\\s+${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "m").test(tekst))
          blad(`wpis.md: brak obowiązkowej sekcji "## ${s}"`);
      }
      // "Na czym sie wywala" min. 3 pozycje
      const mm = tekst.match(/##\s+Na czym się wywala\s*\n([\s\S]*?)(\n##\s|$)/);
      if (mm) {
        const punkty = (mm[1].match(/^\s*[-*]\s+/gm) || []).length;
        if (punkty < 3) blad(`wpis.md: "Na czym się wywala" ma ${punkty} pozycji, wymagane min. 3`);
      }
    }
  }
}

// --- SKILL.md (jesli jest) ---
const skillP = join(cel, "SKILL.md");
if (existsSync(skillP)) {
  const fm = frontmatter(readFileSync(skillP, "utf8"));
  if (!fm) blad("SKILL.md bez poprawnego frontmattera");
  else {
    if (fm.name && fm.name !== id) ostrzez(`SKILL.md: name="${fm.name}" != nazwa folderu "${id}"`);
    if (!fm.description) blad("SKILL.md: brak pola description");
    else {
      if (fm.description.length > 1024) blad(`SKILL.md: description ${fm.description.length} znaków (limit 1024)`);
      // Dwukropek ze spacja w niecytowanym opisie lamie YAML build.mjs.
      const surowy = readFileSync(skillP, "utf8").match(/^description:\s*(.*)$/m)?.[1] || "";
      if (!/^["']/.test(surowy.trim()) && /:\s/.test(surowy))
        ostrzez('SKILL.md: description ma dwukropek ze spacją i nie jest w cudzysłowie, może wywalić YAML');
    }
  }
}

// --- glify: dlugie myslniki + encje, we WSZYSTKICH plikach ---
for (const p of wszystkie) {
  let t; try { t = readFileSync(p, "utf8"); } catch { continue; }
  const b = basename(p);
  if (t.includes(EMDASH) || t.includes(ENDASH)) blad(`${b}: długi myślnik (pauza/półpauza) w treści`);
  if (/&mdash;|&ndash;/.test(t) && !/detekt|grep|encj|wzorz/i.test(t)) ostrzez(`${b}: encja &mdash;/&ndash; (renderuje długi myślnik)`);
  const waluta = t.match(/[$€£]\s?[0-9]|[0-9]\s?[$€£]|\bUSD\b|\bEUR\b|\bGBP\b|\bCHF\b/g);
  if (waluta) ostrzez(`${b}: możliwy przeciek obcej waluty (${[...new Set(waluta)].slice(0,4).join(", ")}), oceń ręcznie`);
}

// --- swiezosc migawki KONTEKST.md kreatora (ostrzezenie, nie blokuje) ---
// Migawka katalogu w ~/.claude/skills/skill-kreator-pl/KONTEKST.md deklaruje
// liczbe skilli; gdy rozjezdza sie z realnym stanem skille/, bramki terytorium
// i walidacja pracuja na nieaktualnych opisach. Odswiezenie: komenda `rejestr`.
try {
  const dom = process.env.USERPROFILE || process.env.HOME || "";
  const kontekstP = join(dom, ".claude", "skills", "skill-kreator-pl", "KONTEKST.md");
  const skilleP = existsSync("skille") ? "skille" : (existsSync(join("..", "katalog-skilli", "skille")) ? join("..", "katalog-skilli", "skille") : null);
  if (dom && existsSync(kontekstP) && skilleP) {
    const zadeklarowane = readFileSync(kontekstP, "utf8").match(/Skilli w katalogu:\s*(\d+)/)?.[1];
    const realne = readdirSync(skilleP).filter((w) => existsSync(join(skilleP, w, "wpis.md"))).length;
    if (zadeklarowane && Number(zadeklarowane) !== realne)
      ostrzez(`KONTEKST.md kreatora nieświeży: deklaruje ${zadeklarowane} skilli, katalog ma ${realne}; odśwież komendą rejestr`);
  }
} catch { /* kontrola pomocnicza, brak dostepu nie moze psuc walidacji */ }

// --- raport ---
console.log(`Walidator skilla: ${id}  (${wszystkie.length} plików)`);
for (const m of bledy) console.log(`  BŁĄD: ${m}`);
for (const m of ostrzezenia) console.log(`  ostrzeżenie: ${m}`);
if (!bledy.length && !ostrzezenia.length) console.log("  czysto");
console.log(bledy.length ? `\nNIEGOTOWE: ${bledy.length} błąd(ów) do naprawy.` : "\nWalidator: bez błędów blokujących.");
process.exit(bledy.length ? 1 : 0);
