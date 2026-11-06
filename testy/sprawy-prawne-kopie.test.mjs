import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { rozjazdy } from '../narzedzia/katalog-do-firmy.mjs';

// Skill sprawy-prawne-w-firmie korzysta z wiedzy wąskich skilli przez kopie w
// references/katalog/. Zmiana wąskiego skilla bez odświeżenia kopii = rozjazd
// stanu prawnego w dwóch miejscach. Naprawa: node narzedzia/katalog-do-firmy.mjs
const SKILL = new URL('../skille/sprawy-prawne-w-firmie/', import.meta.url);

test('kopie wąskich skilli w sprawy-prawne-w-firmie są aktualne', { skip: !existsSync(SKILL) }, () => {
  assert.deepEqual(rozjazdy(), []);
});

test('każdy przepis cytowany w skillu istnieje we wbudowanym akcie', { skip: !existsSync(SKILL) }, () => {
  const r = spawnSync('python', ['narzedzia/sprawdz-cytaty.py'], { cwd: fileURLToPath(new URL('..', import.meta.url)), encoding: 'utf8', env: { ...process.env, PYTHONUTF8: '1' } });
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test('każdy wbudowany akt ma nagłówek z datą brzmienia i źródłem', { skip: !existsSync(SKILL) }, () => {
  const stan = JSON.parse(readFileSync(new URL('../narzedzia/akty-stan.json', import.meta.url), 'utf8'));
  const pliki = readdirSync(new URL('references/akty/', SKILL)).filter((f) => f.endsWith('.md') && f !== 'SPIS.md');
  assert.equal(pliki.length, stan.length, 'liczba plików aktów = wpisy w akty-stan.json');
  for (const s of stan) {
    const t = readFileSync(new URL(`references/akty/${s.skrot}.md`, SKILL), 'utf8');
    assert.match(t, /^# .+\(/, `${s.skrot}: tytuł`);
    const brzmienie = t.match(/^- Brzmienie: (.+)$/m)?.[1] || '';
    if (s.data_tekstu) assert.ok(brzmienie.includes(s.data_tekstu), `${s.skrot}: data brzmienia w pliku ≠ akty-stan.json (${s.data_tekstu})`);
    assert.match(t, new RegExp(`Pobrano z api\\.sejm\\.gov\\.pl ${s.pobrano}`), `${s.skrot}: data pobrania`);
    const artykulow = (t.match(/^[[<]?Art\. /gm) || []).length;
    assert.equal(artykulow, s.artykulow, `${s.skrot}: liczba artykułów w pliku ≠ akty-stan.json`);
    assert.ok(artykulow > 5, `${s.skrot}: za mało artykułów`);
  }
});
