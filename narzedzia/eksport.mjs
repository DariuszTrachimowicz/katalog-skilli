#!/usr/bin/env node
// Eksport listy adresowej do CSV. Uruchomienie: node narzedzia/eksport.mjs > lista.csv
// Domyślnie wypisuje wyłącznie adresy potwierdzone — czyli te, które wolno wykorzystać.
// Flaga --wszystkie pokazuje też niepotwierdzone, do celów diagnostycznych.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(KORZEN, "config.json"), "utf8"));
const plik = cfg.zapisy.plikDanych;
const wszystkie = process.argv.includes("--wszystkie");

if (!existsSync(plik)) {
  console.error(`Brak pliku z danymi: ${plik}`);
  process.exit(1);
}

const mapa = new Map();
for (const linia of readFileSync(plik, "utf8").split("\n").filter(Boolean)) {
  let r;
  try { r = JSON.parse(linia); } catch { continue; }
  if (r.typ === "zapis") mapa.set(r.email, { ...r, potwierdzony: false });
  else if (r.typ === "potwierdzenie" && mapa.has(r.email)) {
    mapa.get(r.email).potwierdzony = true;
    mapa.get(r.email).potwierdzonyKiedy = r.kiedy;
  } else if (r.typ === "wypisanie") mapa.delete(r.email);
}

const pole = (v) => {
  const s = String(v ?? "");
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

console.log("email;data_zapisu;potwierdzony;data_potwierdzenia;wynik_testu");
let n = 0;
for (const [email, r] of mapa) {
  if (!wszystkie && !r.potwierdzony) continue;
  n++;
  console.log([email, r.kiedy, r.potwierdzony ? "tak" : "nie", r.potwierdzonyKiedy || "", (r.wynik || []).join(" ")].map(pole).join(";"));
}
console.error(`\nWyeksportowano ${n} ${wszystkie ? "wszystkich zapisów" : "potwierdzonych adresów"}.`);
