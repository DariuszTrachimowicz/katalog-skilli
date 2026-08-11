#!/usr/bin/env node
// Trwale wymazuje adres z dziennika zapisów i z logu maili — pokrycie obietnicy
// z polityki prywatności („usuwamy adres wraz z całą historią"). Wypisanie przez
// link ukrywa adres ze stanu listy; to narzędzie usuwa też same bajty z plików.
//
// Użycie:   node narzedzia/wymaz.mjs adres@example.com
// W Dockerze: docker compose exec zapisy node narzedzia/wymaz.mjs adres@example.com

import { readFileSync, writeFileSync, existsSync, renameSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(KORZEN, "config.json"), "utf8"));

const adres = (process.argv[2] || "").trim().toLowerCase();
if (!adres.includes("@")) {
  console.error("Użycie: node narzedzia/wymaz.mjs adres@example.com");
  process.exit(1);
}

// Podmiana przez plik tymczasowy i rename — czytelnik nigdy nie zobaczy pliku w połowie zapisu.
const podmien = (sciezka, tresc) => {
  writeFileSync(sciezka + ".tmp", tresc);
  renameSync(sciezka + ".tmp", sciezka);
};

const dziennik = cfg.zapisy.plikDanych;
let wpisy = 0;
if (existsSync(dziennik)) {
  const linie = readFileSync(dziennik, "utf8").split("\n").filter(Boolean);
  const zostaja = linie.filter((l) => {
    try { if (JSON.parse(l).email === adres) { wpisy++; return false; } } catch {}
    return true;
  });
  podmien(dziennik, zostaja.map((l) => l + "\n").join(""));
}

const logMaili = join(dirname(dziennik), "wyslane-maile.log");
let maile = 0;
if (existsSync(logMaili)) {
  const bloki = readFileSync(logMaili, "utf8").split(/(?=\n=== \d{4})/);
  const zostaja = bloki.filter((b) => {
    if (b.includes(`Do: ${adres}`)) { maile++; return false; }
    return true;
  });
  podmien(logMaili, zostaja.join(""));
}

console.log(`Wymazano dla ${adres}: ${wpisy} wpisów dziennika, ${maile} maili z logu.`);
if (!wpisy && !maile) console.log("(adresu nie było w żadnym pliku)");
