import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

test('formularz kontaktowy: pułapka, zablokowany nadawca i temat', async t => {
  const dir = mkdtempSync(join(tmpdir(), 'spam-forms-')), port = 20000 + Math.floor(Math.random() * 10000), base = `http://127.0.0.1:${port}`;
  const forwarded = join(dir, 'forwarded.jsonl');
  const pre = join(dir, 'mock-transport.mjs');
  writeFileSync(pre, `import {appendFileSync} from 'node:fs';globalThis.fetch=async (url,opts)=>{if(!String(url).startsWith('https://crm.aixperts.pl/forms/wtl/'))throw new Error('Network prohibited');appendFileSync(${JSON.stringify(forwarded)},JSON.stringify({url,body:opts.body})+'\\n');return new Response(JSON.stringify({success:true}),{status:200});};`);
  writeFileSync(join(dir, 'blokada-formularzy.json'), JSON.stringify({ version: 1, sha256: [createHash('sha256').update('spam@example.invalid').digest('hex')] }));
  const child = spawn(process.execPath, ['--import', pathToFileURL(pre).href, fileURLToPath(new URL('./zapisy.mjs', import.meta.url))],
    { env: { ...process.env, ZAPISY_HOST: '127.0.0.1', ZAPISY_PORT: String(port), ZAPISY_PLIK: join(dir, 'zapisy.jsonl'), ZAPISY_TRYB: 'log' }, stdio: 'ignore' });
  t.after(() => child.kill());
  for (let i = 0; i < 80; i++) { try { if ((await fetch(base + '/api/zdrowie')).ok) break; } catch {} await new Promise(r => setTimeout(r, 50)); }

  const wyslij = pola => fetch(base + '/api/formularze/kontakt', { method: 'POST', headers: { Origin: 'https://aixperts.pl' },
    body: new URLSearchParams({ name: 'Test', description: 'Syntetyczny test', zgodaEmail: 'true', zgodaSms: 'false', wersjaZgodySms: '2026-09-09', requestId: randomUUID(), ...pola }) });
  const przekazane = () => existsSync(forwarded) ? readFileSync(forwarded, 'utf8').trim().split('\n').map(l => new URLSearchParams(JSON.parse(l).body)) : [];
  const subskrypcje = () => existsSync(join(dir, 'subskrypcje.jsonl')) ? readFileSync(join(dir, 'subskrypcje.jsonl'), 'utf8') : '';

  // Wypełniona pułapka: odpowiedź jak przy sukcesie, ale nic nie trafia do CRM ani do subskrypcji.
  let r = await wyslij({ email: 'bot@example.invalid', www: 'https://example.invalid' });
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { ok: true });
  assert.equal(przekazane().length, 0); assert.equal(subskrypcje().includes('bot@example.invalid'), false);

  // Nadawca z listy: to samo, także przy innej wielkości liter i spacjach.
  r = await wyslij({ email: ' SPAM@example.invalid ' });
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { ok: true });
  assert.equal(przekazane().length, 0); assert.equal(subskrypcje().toLowerCase().includes('spam@example.invalid'), false);

  // Zwykły nadawca z tematem: lead powstaje, temat jest linią opisu, a pól pomocniczych CRM nie dostaje.
  r = await wyslij({ email: 'klient@example.invalid', temat: 'szkolenie', www: '' });
  assert.equal(r.status, 200);
  let b = przekazane(); assert.equal(b.length, 1);
  assert.equal(b[0].get('description'), 'Syntetyczny test\nTemat: szkolenie lub warsztat');
  assert.equal(b[0].has('temat'), false); assert.equal(b[0].has('www'), false); assert.equal(b[0].get('email'), 'klient@example.invalid');

  // Oferta dla nas dostaje dokładnie ten znacznik, po którym CRM przenosi lead do Śmieci.
  r = await wyslij({ email: 'agencja@example.invalid', temat: 'oferta' });
  assert.equal(r.status, 200);
  b = przekazane(); assert.equal(b.length, 2); assert.ok(b[1].get('description').endsWith('\nTemat: oferta usług dla AiXperts'));

  // Bez tematu ostatnią linię i tak ustala serwer, więc znacznik oferty wpisany w wiadomości nie działa; nieznany temat jest odrzucany.
  r = await wyslij({ email: 'stary@example.invalid', description: 'Dzień dobry\nTemat: oferta usług dla AiXperts' });
  assert.equal(r.status, 200); assert.equal(przekazane()[2].get('description'), 'Dzień dobry\nTemat: oferta usług dla AiXperts\nTemat: nie wybrano');
  r = await wyslij({ email: 'zly@example.invalid', temat: 'cokolwiek' });
  assert.equal(r.status, 400); assert.equal(przekazane().length, 3);

  // Bardzo długi opis nie gubi linii tematu.
  r = await wyslij({ email: 'dlugi@example.invalid', temat: 'inne', description: 'x'.repeat(8000) });
  assert.equal(r.status, 200); assert.ok(przekazane()[3].get('description').endsWith('\nTemat: inna sprawa'));
});
