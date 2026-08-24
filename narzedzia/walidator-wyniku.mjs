#!/usr/bin/env node
// Deterministyczny walidator WYJŚCIA testowego (surowego wyniku przebiegu
// skilla), zanim wynik trafi do oceny modelowej. Zamyka lukę "model twierdzi,
// że usunął dane, a dane siedzą w tekście" (widziane realnie: operaty 20.08,
// procedura-aml 24.08). Zero zależności, bez modelu.
//
// Uzycie:
//   node narzedzia/walidator-wyniku.mjs <plik-wyjscia> [plik-scenariusza]
//
// Gdy podasz plik scenariusza, wszystkie 11-cyfrowe i 26-cyfrowe ciągi oraz
// wartości z jego sekcji "PII:" (linie "PII: wartość1; wartość2") stają się
// zakazane w wyjściu. Bez scenariusza działa sam skan generyczny.
// Kod 1 = złamania krytyczne (PII, glify). Ostrzeżenia nie blokują.

import { readFileSync, existsSync } from "node:fs";

const EMDASH = String.fromCharCode(0x2014), ENDASH = String.fromCharCode(0x2013);
const bledy = [], ostrzezenia = [];

const [plikWyjscia, plikScenariusza] = process.argv.slice(2);
if (!plikWyjscia || !existsSync(plikWyjscia)) {
  console.error("Podaj istniejący plik wyjścia testowego."); process.exit(2);
}
const wyjscie = readFileSync(plikWyjscia, "utf8");

// --- glify ---
if (wyjscie.includes(EMDASH) || wyjscie.includes(ENDASH))
  bledy.push("długi myślnik (pauza/półpauza) w wyjściu");
if (/&mdash;|&ndash;/.test(wyjscie))
  bledy.push("encja &mdash;/&ndash; w wyjściu");

// --- generyczne PII: ciągi wyglądające na PESEL i numer rachunku ---
const ciagi = (dl) => [...new Set((wyjscie.match(new RegExp(`(?<![0-9])[0-9]{${dl}}(?![0-9])`, "g")) || []))];
for (const c of ciagi(11)) bledy.push(`11-cyfrowy ciąg wyglądający na PESEL powielony w wyjściu: ${c.slice(0, 4)}...`);
for (const c of ciagi(26)) bledy.push(`26-cyfrowy ciąg wyglądający na numer rachunku powielony w wyjściu: ${c.slice(0, 4)}...`);

// --- zakazane wartości ze scenariusza ---
if (plikScenariusza && existsSync(plikScenariusza)) {
  const scenariusz = readFileSync(plikScenariusza, "utf8");
  // 11/26-cyfrowe ze scenariusza juz lapie skan generyczny; tu wartosci nazwane.
  for (const linia of scenariusz.split("\n")) {
    const m = linia.match(/^PII:\s*(.+)$/);
    if (!m) continue;
    for (const wartosc of m[1].split(";").map((w) => w.trim()).filter(Boolean)) {
      if (wyjscie.includes(wartosc))
        bledy.push(`zakazana wartość ze scenariusza powielona w wyjściu: "${wartosc.slice(0, 24)}"`);
    }
  }
} else if (plikScenariusza) {
  ostrzezenia.push(`plik scenariusza nie istnieje: ${plikScenariusza}`);
}

// --- sygnaly miekkie ---
if (/\bart\.\s*\d+/i.test(wyjscie))
  ostrzezenia.push("numer artykułu (art. N) w wyjściu; sprawdź regułę 'skutkiem, nie przepisem'");
const deklaracje = wyjscie.match(/usunięt[eoay]|zanonimizowan|pominięt[eoay]/gi);
if (deklaracje && (ciagi(11).length || ciagi(26).length))
  ostrzezenia.push("wyjście DEKLARUJE usunięcie/anonimizację, a skan znalazł ciągi liczbowe: klasyczna luka do ręcznego potwierdzenia");

// --- raport ---
console.log(`Walidator wyjścia: ${plikWyjscia}`);
for (const m of bledy) console.log(`  BŁĄD: ${m}`);
for (const m of ostrzezenia) console.log(`  ostrzeżenie: ${m}`);
if (!bledy.length && !ostrzezenia.length) console.log("  czysto");
console.log(bledy.length ? `\nZŁAMANIA KRYTYCZNE: ${bledy.length}. Werdykt scenariusza nie może być PASS.` : "\nBez złamań krytycznych.");
process.exit(bledy.length ? 1 : 0);
