import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { frontmatter } from '../narzedzia/markdown.mjs';

// Od 4 listopada 2026 katalog nie sprzedaje skilli: wszystkie sa darmowe (GPL).
// Test pilnuje, zeby zaden wpis nie wrocil do trybu platnego bez swiadomej decyzji
// i zeby opis serwisu nie obiecywal platnych subskrypcji.
const cfg = JSON.parse(readFileSync(new URL('../config.json', import.meta.url), 'utf8'));
test('opis katalogu mówi o darmowych skillach i nie obiecuje płatnych subskrypcji', () => {
  assert.match(cfg.opisSerwisu, /darmo/);
  assert.doesNotMatch(cfg.opisSerwisu, /płatne/);
});
for (const id of readdirSync(new URL('../skille/', import.meta.url))) {
  const wpis = new URL(`../skille/${id}/wpis.md`, import.meta.url);
  if (!existsSync(wpis)) continue;
  const { dane } = frontmatter(readFileSync(wpis, 'utf8'));
  test(`${id} jest darmowy i ma pełną treść w katalogu`, () => {
    assert.notEqual(String(dane.platny), 'true', 'wpis oznaczony jako płatny');
    assert.notEqual(dane.status, 'platny', 'status platny');
    assert.equal(dane.cena, undefined, 'pole cena bez sprzedaży');
    assert.ok(existsSync(new URL(`../skille/${id}/SKILL.md`, import.meta.url)), 'brak SKILL.md w katalogu');
    assert.ok(!existsSync(new URL(`../skille/${id}/oferta.html`, import.meta.url)), 'została strona oferty');
    assert.ok(existsSync(new URL(`../szablony/og/${id}.png`, import.meta.url)), 'brak własnej grafiki OG (uruchom: node narzedzia/grafiki.mjs ' + id + ')');
    assert.match(String(dane.wersja), /^\d+\.\d+\.\d+$/, 'wersja x.y.z');
  });
}
