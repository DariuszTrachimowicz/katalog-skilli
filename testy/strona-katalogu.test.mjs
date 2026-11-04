// Odbiór zbudowanego serwisu (wygląd z 4 XI 2026): FAQ zgodne z danymi
// strukturalnymi, pliki dla agentów (llms.txt, ARD), brak Pracowni i pauz.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const KORZEN = dirname(dirname(fileURLToPath(import.meta.url)));
const WY = join(KORZEN, "public");
// Czyta gotowy wynik `node build.mjs` (testy biegną równolegle, przebudowa tu kasowałaby public/ innym).
if (!existsSync(join(WY, "index.html"))) throw new Error("Najpierw: node build.mjs");

const czytaj = (...p) => readFileSync(join(WY, ...p), "utf8");
const skille = readdirSync(join(KORZEN, "skille")).filter((d) => existsSync(join(KORZEN, "skille", d, "wpis.md")));
const jsonld = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const wezly = (ld) => ld["@graph"] || [ld];

test("każda karta skilla: jeden H1, main, FAQ widoczne i zgodne z FAQPage", () => {
  for (const id of skille) {
    const html = czytaj("skill", id, "index.html");
    assert.equal(html.split("<h1>").length - 1, 1, `${id}: jeden H1`);
    assert.match(html, /<main id="tresc">/, `${id}: main`);
    const faq = wezly(jsonld(html)).find((n) => n["@type"] === "FAQPage");
    assert.ok(faq, `${id}: brak FAQPage`);
    assert.ok(faq.mainEntity.length >= 4 && faq.mainEntity.length <= 6, `${id}: 4-6 pytań`);
    for (const q of faq.mainEntity) assert.ok(html.includes(q.name.replace(/"/g, "&quot;")), `${id}: pytanie z FAQPage nie jest widoczne: ${q.name}`);
    assert.match(html, /class="faq-o"/, `${id}: odpowiedzi do speakable`);
    assert.match(html, /id="pobierz"/, `${id}: panel pobierania`);
  }
});

test("pliki dla agentów: llms.txt i ARD z każdym gotowym skillem", () => {
  const llms = czytaj("llms.txt");
  assert.match(llms, /^# /);
  for (const id of skille) assert.ok(llms.includes(`/skill/${id}/`), `llms.txt bez ${id}`);
  const ard = JSON.parse(czytaj(".well-known", "ard.json"));
  assert.ok(Array.isArray(ard.entries) && ard.entries.length === skille.length);
  for (const e of ard.entries) {
    assert.match(e.identifier, /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/);
    for (const pole of ["displayName", "type"]) assert.ok(e[pole], `${e.identifier}: brak ${pole}`);
    assert.ok(("url" in e) !== ("data" in e), `${e.identifier}: dokładnie jedno z url/data`);
    assert.ok(e.representativeQueries.length >= 2 && e.representativeQueries.length <= 5);
  }
  assert.equal(czytaj(".well-known", "ai-catalog.json"), czytaj(".well-known", "ard.json"));
  assert.match(czytaj("index.html"), /<link rel="ard" href="\/\.well-known\/ard\.json"/);
});

test("Pracownia zawieszona: brak strony, linków i wpisu w sitemapie; serwer przekierowuje", () => {
  assert.ok(!existsSync(join(WY, "pracownia")), "katalog public/pracownia nie powinien istnieć");
  assert.doesNotMatch(czytaj("sitemap.xml"), /\/pracownia/);
  assert.doesNotMatch(czytaj("index.html"), /href="\/pracownia/);
  const nginx = readFileSync(join(KORZEN, "serwer", "nginx-kontener.conf"), "utf8");
  assert.match(nginx, /location \^~ \/pracownia\/ \{ return 302 \/; \}/);
});

test("procenty ze spacją w źródłach treści (7 %, nie 7%)", () => {
  const zrodla = [...skille.map((id) => join(KORZEN, "skille", id, "wpis.md")), ...readdirSync(join(KORZEN, "poradniki")).filter((f) => f.endsWith(".md")).map((f) => join(KORZEN, "poradniki", f))];
  const bezSpacji = /\d%/;
  assert.ok(bezSpacji.test("7%") && !bezSpacji.test("7 %"), "samokontrola wzorca");
  assert.deepEqual(zrodla.filter((p) => bezSpacji.test(readFileSync(p, "utf8"))), []);
});

test("zero długich myślników i półpauz w opublikowanych plikach", () => {
  const zle = [];
  (function chodz(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) chodz(p);
      else if (/\.(html|txt|json|js|css)$/.test(f) && /[–—]/.test(readFileSync(p, "utf8"))) zle.push(p);
    }
  })(WY);
  assert.deepEqual(zle, []);
});
