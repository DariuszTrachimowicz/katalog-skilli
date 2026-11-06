import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { odbiorcy, zmienione, wypisanyZWersji, TRESC_ZGODY_WERSJI } from '../serwer/powiadomienia-wersji.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const zgoda = { udzielona: true };
const prosba = (email, token, kiedy, extra = {}) => ({ typ: 'pobranie-prosba', email, skill: 'x', token, kiedy, powiadomWersje: zgoda, ...extra });

test('odbiorcy: tylko zgoda, kliknięty link, bez wypisu i bez powtórki', () => {
  const w = [
    prosba('a@e.invalid', 'ta', '2026-01-01'), { typ: 'pobranie', token: 'ta' },
    prosba('b@e.invalid', 'tb', '2026-01-01'), // bez kliknięcia linku
    prosba('c@e.invalid', 'tc', '2026-01-01', { powiadomWersje: null }), { typ: 'pobranie', token: 'tc' },
    prosba('d@e.invalid', 'td', '2026-01-01'), { typ: 'pobranie', token: 'td' }, { typ: 'wypis-wersji', email: 'd@e.invalid', skill: 'x', kiedy: '2026-02-01' },
    prosba('e@e.invalid', 'te', '2026-01-01'), { typ: 'pobranie', token: 'te' }, { typ: 'wypisanie', email: 'e@e.invalid', kiedy: '2026-02-01' },
    prosba('f@e.invalid', 'tf', '2026-01-01'), { typ: 'pobranie', token: 'tf' }, { typ: 'powiadomienie-wersji-proba', email: 'f@e.invalid', skill: 'x', wersja: '1.1.0' },
    prosba('g@e.invalid', 'tg', '2026-01-01', { skill: 'inny' }), { typ: 'pobranie', token: 'tg' },
  ];
  assert.deepEqual(odbiorcy(w, 'x', '1.1.0'), [{ email: 'a@e.invalid', token: 'ta' }]);
  // próba o innej wersji nie blokuje, wypis z wspólnych subskrypcji po prośbie blokuje
  assert.equal(odbiorcy([...w, { typ: 'powiadomienie-wersji-proba', email: 'a@e.invalid', skill: 'x', wersja: '1.0.9' }], 'x', '1.1.0').length, 1);
  assert.equal(odbiorcy(w, 'x', '1.1.0', new Map([['a@e.invalid', '2026-05-01T00:00:00.000Z']])).length, 0);
  assert.equal(odbiorcy(w, 'x', '1.1.0', new Map([['a@e.invalid', '2025-05-01T00:00:00.000Z']])).length, 1);
});

test('odbiorcy: niekliknięte ponowne zamówienie nie wyłącza potwierdzonego zapisu', () => {
  const w = [prosba('a@e.invalid', 't1', '2026-01-01'), { typ: 'pobranie', token: 't1' }, prosba('a@e.invalid', 't2', '2026-03-01')];
  assert.deepEqual(odbiorcy(w, 'x', '2.0.0'), [{ email: 'a@e.invalid', token: 't1' }]);
});

test('wypisanyZWersji: ponowny wypis nie jest potrzebny, nowa zgoda go znosi', () => {
  const w = [prosba('a@e.invalid', 't1', '2026-01-01'), { typ: 'wypis-wersji', email: 'a@e.invalid', skill: 'x', kiedy: '2026-02-01' }];
  assert.equal(wypisanyZWersji(w, 'a@e.invalid', 'x'), true);
  assert.equal(wypisanyZWersji([...w, prosba('a@e.invalid', 't2', '2026-03-01')], 'a@e.invalid', 'x'), false);
  assert.equal(wypisanyZWersji(w, 'a@e.invalid', 'inny'), false);
});

test('odbiorcy: nowsza prośba z zaznaczeniem wznawia po wypisie i daje najnowszy token', () => {
  const w = [
    prosba('a@e.invalid', 't1', '2026-01-01'), { typ: 'pobranie', token: 't1' },
    { typ: 'wypis-wersji', email: 'a@e.invalid', skill: 'x', kiedy: '2026-02-01' },
    prosba('a@e.invalid', 't2', '2026-03-01'), { typ: 'pobranie', token: 't2' },
  ];
  assert.deepEqual(odbiorcy(w, 'x', '2.0.0'), [{ email: 'a@e.invalid', token: 't2' }]);
});

test('zmienione: pierwszy przebieg i nowe skille bez wysyłki', () => {
  const s = [{ id: 'a', wersja: '1.0.1' }, { id: 'b', wersja: '1.0.0' }, { id: 'c', wersja: '2.0.0' }];
  assert.deepEqual(zmienione(s, {}), []);
  assert.deepEqual(zmienione(s, { a: '1.0.0', b: '1.0.0' }).map((x) => x.id), ['a']);
  assert.deepEqual(zmienione(s, { a: '1.0.10', c: '2.0.0' }), [], 'cofnięcie wydania nie jest nową wersją');
  assert.deepEqual(zmienione([{ id: 'a', wersja: '1.0.10' }], { a: '1.0.9' }).map((x) => x.id), ['a']);
});

test('formularz pobrania pokazuje dokładnie zapisywaną treść zgody, domyślnie niezaznaczoną', async () => {
  const html = await readFile(join(root, 'public', 'skill', 'sprawy-prawne-w-firmie', 'index.html'), 'utf8');
  assert.ok(html.includes(`<input type="checkbox" name="powiadomWersje"> <span>${TRESC_ZGODY_WERSJI}</span>`));
  const dane = JSON.parse(await readFile(join(root, 'public', 'dane', 'skille.json'), 'utf8'));
  assert.match(dane.find((s) => s.id === 'sprawy-prawne-w-firmie').wersja, /^\d+\.\d+\.\d+$/);
});

test('usługa: zapis zgody, wysyłka po zmianie wersji przy starcie, rezygnacja', async (t) => {
  const dir = await mkdtemp(join(tmpdir(), 'aix-wersje-'));
  const mails = [];
  let base, tokenWKolejce;
  const upstream = createServer(async (req, res) => {
    let b = ''; for await (const c of req) b += c;
    const m = JSON.parse(b); mails.push(m);
    if (/Nowa wersja/.test(m.subject) && m.to.includes('blad@example.invalid')) { res.writeHead(500); return res.end('{}'); }
    if (/Nowa wersja/.test(m.subject) && m.to.includes('zerwane@example.invalid')) return req.socket.destroy();
    // Wypis klikniety w trakcie kolejki: przy mailu do pierwszej osoby druga wypisuje się.
    if (/Nowa wersja/.test(m.subject) && m.to.includes('tak@example.invalid')) await (await fetch(base + '/api/wypisz-wersje?t=' + tokenWKolejce)).text();
    res.end('{"ok":true}');
  });
  await new Promise((r) => upstream.listen(0, '127.0.0.1', r));
  const upPort = upstream.address().port;
  for (const d of ['serwer', 'paczki', 'data', 'public/dane']) await mkdir(join(dir, d), { recursive: true });
  for (const m of ['zapisy.mjs', 'subskrypcje.mjs', 'crm-events.mjs', 'mail-design.mjs', 'subscription-pages.mjs', 'powiadomienia-wersji.mjs']) await copyFile(join(root, 'serwer', m), join(dir, 'serwer', m));
  await writeFile(join(dir, 'paczki', 'x.skill'), 'synthetic');
  const skille = (w) => writeFile(join(dir, 'public', 'dane', 'skille.json'), JSON.stringify([{ id: 'x', nazwa: 'Iks', gotowy: true, wersja: w, aktualizacja: '2026-11-06', zmiany: 'Nowe brzmienie KP.' }]));
  await skille('1.0.0');
  const port = 20000 + Math.floor(Math.random() * 20000);
  await writeFile(join(dir, 'config.json'), JSON.stringify({ domena: 'skille.aixperts.pl', nazwaSerwisu: 'Synthetic', zapisy: { port, limitNaGodzine: 10000, plikDanych: join(dir, 'data', 'zapisy.jsonl'), wysylka: { tryb: 'http', url: `http://127.0.0.1:${upPort}/mail`, nadawca: 'synthetic@example.invalid', naglowekAutoryzacji: 'synthetic-test-only' }, crm: {} } }));
  base = `http://127.0.0.1:${port}`;
  const events = async () => (await readFile(join(dir, 'data', 'zapisy.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
  const uruchom = async () => {
    const child = spawn(process.execPath, [join(dir, 'serwer', 'zapisy.mjs')], { env: { ...process.env, ZAPISY_PORT: String(port) }, stdio: 'ignore' });
    for (let n = 0; n < 100; n++) { try { if ((await fetch(base + '/api/zdrowie')).ok) break; } catch {} await new Promise((r) => setTimeout(r, 30)); }
    await new Promise((r) => setTimeout(r, 150));
    return child;
  };
  t.after(() => upstream.close());
  let child = await uruchom();
  try {
    assert.deepEqual(JSON.parse(await readFile(join(dir, 'data', 'wersje-powiadomione.json'), 'utf8')), { x: '1.0.0' }, 'pierwszy start zapisuje stan bez wysyłki');
    const post = (body) => fetch(base + '/api/pobranie', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ skill: 'x', requestId: crypto.randomUUID(), ...body }) });
    assert.equal((await post({ email: 'tak@example.invalid', powiadomWersje: true })).status, 200);
    assert.equal((await post({ email: 'nie@example.invalid', powiadomWersje: 'true' })).status, 200);
    assert.equal((await post({ email: 'wypis@example.invalid', powiadomWersje: true })).status, 200);
    assert.equal((await post({ email: 'blad@example.invalid', powiadomWersje: true })).status, 200);
    assert.equal((await post({ email: 'kolejka@example.invalid', powiadomWersje: true })).status, 200);
    assert.equal((await post({ email: 'zerwane@example.invalid', powiadomWersje: true })).status, 200);
    assert.equal((await post({ email: 'sms@example.invalid', powiadomWersje: true })).status, 200);
    assert.equal((await post({ email: 'mailwyp@example.invalid', powiadomWersje: true })).status, 200);
    const ev = await events();
    const tak = ev.find((r) => r.email === 'tak@example.invalid');
    assert.equal(tak.powiadomWersje.udzielona, true);
    assert.equal(tak.powiadomWersje.tresc, TRESC_ZGODY_WERSJI);
    assert.equal(ev.find((r) => r.email === 'nie@example.invalid').powiadomWersje, null, 'tylko boolean true jest zgodą');
    const paczka = mails.find((m) => m.to.includes('tak@example.invalid'));
    assert.match(paczka.text, /wypisz-wersje/);
    // Wersja HTML niesie te same linki co tekst (pobranie i wypis), nie tylko wygląd.
    for (const u of paczka.text.match(/https:\/\/\S+\/api\/\S+/g)) assert.ok(paczka.html.includes(u), 'link z tekstu w HTML: ' + u);
    assert.doesNotMatch(mails.find((m) => m.to.includes('nie@example.invalid')).html, /wypisz-wersje/, 'bez zgody bez ramki powiadomień');
    for (const r of ev.filter((r) => r.typ === 'pobranie-prosba')) await (await fetch(base + '/api/pobierz?t=' + r.token)).arrayBuffer();
    const wypis = ev.find((r) => r.email === 'wypis@example.invalid');
    assert.equal((await fetch(base + '/api/wypisz-wersje?t=' + wypis.token)).status, 200);
    assert.equal((await fetch(base + '/api/wypisz-wersje?t=' + wypis.token)).headers.get('referrer-policy'), 'no-referrer');
    assert.equal((await events()).filter((r) => r.typ === 'wypis-wersji').length, 1, 'ponowne kliknięcie nie dopisuje wiersza');
    assert.equal((await fetch(base + '/api/wypisz-wersje?t=zly')).status, 200, 'ta sama odpowiedź dla złego linku');
    tokenWKolejce = (await events()).find((r) => r.email === 'kolejka@example.invalid').token;
    // Wspólne subskrypcje: wypis z samego SMS nie blokuje, wypis z e-maila blokuje.
    const wyc = (email, channel) => JSON.stringify({ type: 'subscription-withdrawn', email, channel, request_only: false, occurred_at: Date.now() + 1000 }) + String.fromCharCode(10);
    await writeFile(join(dir, 'data', 'subskrypcje.jsonl'), wyc('sms@example.invalid', 'sms') + wyc('mailwyp@example.invalid', 'email'));
  } finally { child.kill(); }
  await new Promise((r) => setTimeout(r, 100));
  await skille('1.1.0');
  mails.length = 0;
  child = await uruchom();
  try {
    assert.deepEqual(mails.map((m) => m.to).flat(), ['tak@example.invalid', 'blad@example.invalid', 'zerwane@example.invalid', 'sms@example.invalid'], 'bez wypisanych (także w trakcie kolejki i z e-maila), zerwane połączenie nie zatrzymuje kolejki');
    const ev = await events();
    assert.equal(ev.find((r) => r.typ === 'powiadomienie-wersji' && r.email === 'blad@example.invalid').ok, false);
    assert.equal(ev.find((r) => r.typ === 'powiadomienie-wersji' && r.email === 'zerwane@example.invalid').ok, false);
    assert.match(mails[0].subject, /Iks \(1\.1\.0\)/);
    assert.match(mails[0].text, /Co nowego: Nowe brzmienie KP\./);
    assert.match(mails[0].text, /api\/pobierz\?t=[0-9a-f]{48}/);
    assert.match(mails[0].text, /z 6 listopada 2026/);
    for (const u of mails[0].text.match(/https:\/\/\S+\/api\/\S+/g)) assert.ok(mails[0].html.includes(u), 'link z tekstu w HTML: ' + u);
    assert.match(mails[0].html, /Co nowego[\s\S]*Nowe brzmienie KP\./);
    assert.deepEqual(JSON.parse(await readFile(join(dir, 'data', 'wersje-powiadomione.json'), 'utf8')), { x: '1.1.0' });
  } finally { child.kill(); }
  await new Promise((r) => setTimeout(r, 100));
  mails.length = 0;
  child = await uruchom();
  try { assert.equal(mails.length, 0, 'restart nic nie wysyła, nieudany adres też nie dostaje powtórki'); } finally { child.kill(); }
  await new Promise((r) => setTimeout(r, 100));
  await skille('1.0.5');
  child = await uruchom();
  try {
    assert.equal(mails.length, 0, 'cofnięcie wydania nie wysyła maila');
    assert.deepEqual(JSON.parse(await readFile(join(dir, 'data', 'wersje-powiadomione.json'), 'utf8')), { x: '1.0.5' });
  } finally { child.kill(); }
});

test('SMTP: serwer zamykający połączenie daje błąd, nie zawieszenie', async (t) => {
  const { createServer: tcp } = await import('node:net');
  const smtp = tcp((s) => s.destroy());
  await new Promise((r) => smtp.listen(0, '127.0.0.1', r));
  t.after(() => smtp.close());
  const dir = await mkdtemp(join(tmpdir(), 'aix-smtp-'));
  for (const d of ['serwer', 'paczki', 'data']) await mkdir(join(dir, d), { recursive: true });
  for (const m of ['zapisy.mjs', 'subskrypcje.mjs', 'crm-events.mjs', 'mail-design.mjs', 'subscription-pages.mjs', 'powiadomienia-wersji.mjs']) await copyFile(join(root, 'serwer', m), join(dir, 'serwer', m));
  await writeFile(join(dir, 'paczki', 'x.skill'), 'synthetic');
  const port = 20000 + Math.floor(Math.random() * 20000);
  await writeFile(join(dir, 'config.json'), JSON.stringify({ domena: 'skille.aixperts.pl', nazwaSerwisu: 'Synthetic', zapisy: { port, limitNaGodzine: 10000, plikDanych: join(dir, 'data', 'zapisy.jsonl'), wysylka: { tryb: 'smtp', host: '127.0.0.1', port: smtp.address().port, uzytkownik: 'u', nadawca: 'Synthetic <synthetic@example.invalid>' }, crm: {} } }));
  const child = spawn(process.execPath, [join(dir, 'serwer', 'zapisy.mjs')], { env: { ...process.env, ZAPISY_PORT: String(port), SMTP_HASLO: 'synthetic' }, stdio: 'ignore' });
  t.after(() => child.kill());
  const base = `http://127.0.0.1:${port}`;
  for (let n = 0; n < 100; n++) { try { if ((await fetch(base + '/api/zdrowie')).ok) break; } catch {} await new Promise((r) => setTimeout(r, 30)); }
  const odp = await fetch(base + '/api/pobranie', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'a@example.invalid', skill: 'x', requestId: crypto.randomUUID() }), signal: AbortSignal.timeout(5000) });
  assert.equal(odp.status, 502);
});

test('szablon HTML maili katalogu escapuje dane i nie ma pauz', async () => {
  const { htmlNowejWersji, htmlPaczki } = await import('../serwer/mail-design.mjs');
  const baza = 'https://skille.aixperts.pl';
  const html = htmlNowejWersji({ baza, nazwaSerwisu: 'S', skill: { id: 'x', nazwa: '<img src=x onerror=alert(1)>', wersja: '1.0.1', zmiany: 'a & "b"' }, data: '', pobierz: baza + '/api/pobierz?t=ab', wypis: baza + '/api/wypisz-wersje?t=ab' });
  assert.doesNotMatch(html, /<img src=x/);
  assert.match(html, /&lt;img src=x/);
  assert.match(html, /a &amp; &quot;b&quot;/);
  const p = htmlPaczki({ baza, nazwaSerwisu: 'S', domena: 'skille.aixperts.pl', skill: { id: 'x', nazwa: 'X', skrot: 'y' }, pobierz: baza + '/api/pobierz?t=ab', trial: false, wypisWersji: null });
  for (const h of [html, p]) assert.ok(![...h].some((c) => c === String.fromCharCode(0x2014) || c === String.fromCharCode(0x2013)), 'bez pauz i półpauz');
});
