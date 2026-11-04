import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { frontmatter } from '../narzedzia/markdown.mjs';

const cfg = JSON.parse(readFileSync(new URL('../config.json', import.meta.url), 'utf8'));
const produkty = JSON.parse(readFileSync(new URL('../../skille-platne/licencje/produkty.json', import.meta.url), 'utf8'));
test('opis katalogu rozróżnia darmowe i płatne produkty', () => {
  assert.match(cfg.opisSerwisu, /bezpłatne/);
  assert.match(cfg.opisSerwisu, /płatne/);
  assert.doesNotMatch(cfg.opisSerwisu, /każda do pobrania za darmo/i);
});
for (const id of readdirSync(new URL('../skille/', import.meta.url))) {
  const { dane } = frontmatter(readFileSync(new URL(`../skille/${id}/wpis.md`, import.meta.url), 'utf8'));
  if (String(dane.platny) !== 'true') continue;
  test(`cena miesięczna ${id} zgadza się z serwerem zamówień`, () => {
    assert.ok(produkty[id]?.subskrypcja?.miesiac > 0, 'brak ceny w źródle zamówień');
    const cena = /^od (\d+(?:[,.]\d{1,2})?) zł netto\/mies$/.exec(dane.cena);
    assert.ok(cena, 'nieobsługiwany zapis ceny; sprawdź ręcznie jednostkę i okres');
    assert.equal(Number(cena[1].replace(',', '.')), produkty[id].subskrypcja.miesiac);
  });
}
