// Newsletter przy pobraniu skilla: zgoda niezaznaczona domyślnie, osobny mail potwierdzający ze wspólnego
// rejestru z linkiem do bonusu, mail z paczką bez reklam, bonus tylko po potwierdzeniu i nadal po wypisie.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, copyFile, appendFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { TEXT } from '../serwer/subskrypcje.mjs';
import { komplet } from '../serwer/mail-design.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));

test('odmiana liczby skilli', () => {
  assert.equal(komplet(56), 'wszystkie 56 skilli');
  assert.equal(komplet(54), 'wszystkie 54 skille');
  assert.equal(komplet(12), 'wszystkie 12 skilli');
  assert.equal(komplet(22), 'wszystkie 22 skille');
});

test('formularz pobrania: pole newslettera z oficjalną treścią zgody, niezaznaczone; zaproszenie tylko na stronie', async () => {
  const html = await readFile(join(root, 'public', 'skill', 'sprawy-prawne-w-firmie', 'index.html'), 'utf8');
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  assert.ok(html.includes(`<input type="checkbox" name="zgodaEmail"> <span>${esc(TEXT.email)}</span>`));
  assert.doesNotMatch(html, /name="zgodaEmail"[^>]*checked/);
  assert.match(html, /Bonus dla zapisanych na newsletter/);
  assert.match(html, /href=\\?"\/#newsletter\\?"[^>]*>Zapisz się i odbierz bonus/, 'zaproszenie w stanie po wysłaniu formularza');
});

test('usługa: newsletter przy pobraniu, mail z paczką bez reklam, bonus po potwierdzeniu', async (t) => {
  const dir = await mkdtemp(join(tmpdir(), 'aix-newsletter-'));
  const mails = [];
  let odrzuc = false, odrzucDoi = false, opoznij = false;
  const upstream = createServer(async (req, res) => {
    let b = ''; for await (const c of req) b += c;
    const m = JSON.parse(b); mails.push(m);
    if (opoznij) await new Promise((r) => setTimeout(r, 300));
    if (odrzuc === 'zerwij' && /Twoja paczka/.test(m.subject)) return req.socket.destroy();
    if (odrzuc && /Twoja paczka/.test(m.subject)) { res.writeHead(500); return res.end('{}'); }
    if (odrzucDoi && /Potwierdź newsletter/.test(m.subject)) { res.writeHead(500); return res.end('{}'); }
    res.end('{"ok":true}');
  });
  await new Promise((r) => upstream.listen(0, '127.0.0.1', r));
  t.after(() => upstream.close());
  for (const d of ['serwer', 'paczki', 'data', 'public/dane']) await mkdir(join(dir, d), { recursive: true });
  for (const m of ['zapisy.mjs', 'subskrypcje.mjs', 'crm-events.mjs', 'mail-design.mjs', 'subscription-pages.mjs', 'powiadomienia-wersji.mjs']) await copyFile(join(root, 'serwer', m), join(dir, 'serwer', m));
  await writeFile(join(dir, 'paczki', 'x.skill'), 'synthetic');
  await writeFile(join(dir, 'paczki', 'komplet-skilli.zip'), 'synthetic-komplet');
  await writeFile(join(dir, 'public', 'dane', 'skille.json'), JSON.stringify([{ id: 'x', nazwa: 'Iks', gotowy: true, wersja: '1.0.0' }]));
  const port = 20000 + Math.floor(Math.random() * 20000);
  await writeFile(join(dir, 'config.json'), JSON.stringify({ domena: 'skille.aixperts.pl', nazwaSerwisu: 'Synthetic', zapisy: { port, limitNaGodzine: 10000, plikDanych: join(dir, 'data', 'zapisy.jsonl'), wysylka: { tryb: 'http', url: `http://127.0.0.1:${upstream.address().port}/mail`, nadawca: 'synthetic@example.invalid', naglowekAutoryzacji: 'synthetic-test-only' }, crm: {} } }));
  const base = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [join(dir, 'serwer', 'zapisy.mjs')], { env: { ...process.env, ZAPISY_PORT: String(port) }, stdio: 'ignore' });
  t.after(() => child.kill());
  for (let n = 0; n < 100; n++) { try { if ((await fetch(base + '/api/zdrowie')).ok) break; } catch {} await new Promise((r) => setTimeout(r, 30)); }
  const sub = async () => (await readFile(join(dir, 'data', 'subskrypcje.jsonl'), 'utf8').catch(() => '')).trim().split('\n').filter(Boolean).map(JSON.parse);
  const zapisy = async () => (await readFile(join(dir, 'data', 'zapisy.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
  const post = (dane) => fetch(base + '/api/pobranie', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ skill: 'x', requestId: crypto.randomUUID(), ...dane }) });
  const linki = (m) => m.text.match(/https:\/\/\S+\/api\/\S+/g) || [];
  const t64 = (u) => new URL(u).searchParams.get('t');
  const potwierdzPost = (u) => fetch(base + '/api/subskrypcje/potwierdz', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'text/html' }, body: new URLSearchParams({ t: t64(u) }) });
  const reklama = /newsletter|bonus|szkoleni/i;

  // 1. Bez zaznaczenia: jeden mail z paczką, bez treści reklamowych, bez zapisu.
  assert.equal((await post({ email: 'nie@example.invalid', zgodaEmail: 'true', wersjaZgodySms: '2026-09-09' })).status, 200);
  assert.equal(mails.length, 1);
  assert.doesNotMatch(mails[0].text, reklama, 'mail usługowy bez reklamy');
  assert.doesNotMatch(mails[0].html, reklama);
  assert.ok(!(await sub()).some((r) => r.email === 'nie@example.invalid'), 'tylko boolean true jest zgodą');

  // 2. Zaznaczony newsletter: standardowy mail potwierdzający (z linkiem do bonusu) i mail z paczką bez reklam.
  mails.length = 0;
  const id2 = crypto.randomUUID();
  const dane2 = { email: 'tak@example.invalid', zgodaEmail: true, wersjaZgodySms: '2026-09-09', requestId: id2 };
  const r2 = await post(dane2);
  const j2 = await r2.json();
  assert.equal(j2.subskrypcje.email, 'oczekuje_potwierdzenia');
  assert.equal(j2.newsletterMail, 'wyslany');
  assert.deepEqual(mails.map((m) => m.subject).sort(), ['Potwierdź newsletter AiXperts i Digital Xperts', 'Twoja paczka: Iks']);
  const paczka2 = mails.find((m) => /Twoja paczka/.test(m.subject)), doi = mails.find((m) => /Potwierdź/.test(m.subject));
  assert.doesNotMatch(paczka2.text, reklama);
  const s2 = (await sub()).find((r) => r.type === 'subscription-request' && r.email === 'tak@example.invalid');
  assert.equal(s2.source, 'katalog-pobranie');
  assert.equal(s2.consent_email.text, TEXT.email);
  const potwierdz = linki(doi).find((u) => u.includes('/api/subskrypcje/potwierdz?t='));
  const kompletUrl = linki(doi).find((u) => u.includes('/api/komplet?t='));
  assert.ok(kompletUrl && doi.html.includes(kompletUrl), 'link bonusu w obu wersjach maila potwierdzającego');
  const pobierzKomplet = () => fetch(base + new URL(kompletUrl).pathname + new URL(kompletUrl).search);
  // Ponowienie po utracie odpowiedzi: ten sam requestId nie wysyła drugiej paczki ani drugiego potwierdzenia.
  mails.length = 0;
  assert.equal((await post(dane2)).status, 200);
  assert.equal(mails.length, 0, 'bez duplikatów po ponowieniu');
  assert.equal((await zapisy()).filter((r) => r.typ === 'pobranie-prosba' && r.requestId === id2).length, 1);
  assert.equal((await post({ ...dane2, skill: 'x', email: 'inny@example.invalid' })).status, 409, 'ten sam ID z innymi danymi');
  // Przed potwierdzeniem: bonus nie działa; GET strony potwierdzenia nie potwierdza (skanery linków).
  assert.doesNotMatch((await pobierzKomplet()).headers.get('content-type'), /zip/);
  await (await fetch(base + '/api/subskrypcje/potwierdz?t=' + t64(potwierdz))).text();
  assert.ok(!(await sub()).some((r) => r.type === 'email-confirmed' && r.request_id === s2.request_id));
  // Potwierdzenie przyciskiem: strona z bonusem, link z maila działa.
  assert.match(await (await potwierdzPost(potwierdz)).text(), /Pobierz komplet skilli/);
  const zip = await pobierzKomplet();
  assert.match(zip.headers.get('content-type'), /zip/);
  assert.equal(await zip.text(), 'synthetic-komplet');
  // Zapis z Dewellux: ten sam rejestr, ale bez bonusu katalogu w mailu i na stronie potwierdzenia.
  const przedDx = mails.length;
  const dx = await fetch(base + '/api/subskrypcje', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://dewellux.pl' }, body: JSON.stringify({ email: 'dewellux@example.com', telefon: '', zgodaEmail: true, zgodaSms: false, wersja: '2026-09-09', zrodlo: 'dewellux-newsletter', requestId: crypto.randomUUID() }) });
  assert.equal(dx.status, 200);
  const mailDx = mails.slice(przedDx).find((m) => /Potwierdź newsletter/.test(m.subject));
  assert.ok(mailDx, 'mail potwierdzający dla zapisu z Dewellux');
  assert.doesNotMatch(mailDx.text + mailDx.html, /api\/komplet|Bonus/);
  assert.doesNotMatch(await (await potwierdzPost(linki(mailDx).find((u) => u.includes('/potwierdz')))).text(), /Pobierz komplet skilli/);
  assert.ok((await zapisy()).some((r) => r.typ === 'komplet-pobranie' && r.email === 'tak@example.invalid'));

  // 3. Po wypisie bonus z maila potwierdzającego nadal działa (wypis bez szkody).
  const wypis = linki(doi).find((u) => u.includes('/api/subskrypcje/wypisz?t='));
  const w = await fetch(base + '/api/subskrypcje/wypisz', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'text/html' }, body: new URLSearchParams({ t: t64(wypis), kanal: 'all' }) });
  assert.equal(w.status, 200);
  assert.match((await pobierzKomplet()).headers.get('content-type'), /zip/, 'bonus działa po wypisie');

  // 4. Odrzucona paczka (500) i zerwane połączenie przy paczce: potwierdzenie newslettera i tak wychodzi.
  for (const [email, tryb] of [['blad@example.invalid', '500'], ['zerwane@example.invalid', 'zerwij']]) {
    mails.length = 0; odrzuc = tryb;
    const r = await post({ email, zgodaEmail: true, wersjaZgodySms: '2026-09-09' });
    odrzuc = false;
    assert.equal(r.status, 502);
    assert.ok(mails.some((m) => /Potwierdź newsletter/.test(m.subject) && m.to.includes(email)), 'potwierdzenie mimo błędu paczki: ' + tryb);
  }

  // 5. Odrzucony mail potwierdzający: jawny stan „nieudany”, bez ponowień (wspólny rejestr), paczka bez duplikatu.
  mails.length = 0; odrzucDoi = true;
  const dane5 = { email: 'doi@example.invalid', zgodaEmail: true, wersjaZgodySms: '2026-09-09', requestId: crypto.randomUUID() };
  assert.equal((await (await post(dane5)).json()).newsletterMail, 'nieudany');
  odrzucDoi = false; mails.length = 0;
  assert.equal((await (await post(dane5)).json()).newsletterMail, 'nieudany', 'stan jawny także przy ponowieniu');
  assert.equal(mails.length, 0, 'bez ponowienia potwierdzenia i bez drugiej paczki');

  // 5b. Dwa równoległe żądania z tym samym ID (z newsletterem, wolne potwierdzenie i wolna paczka): jedna paczka.
  for (const zNewsletterem of [false, true]) {
    mails.length = 0; opoznij = true;
    const dane5b = { email: `rown${zNewsletterem}@example.invalid`, requestId: crypto.randomUUID(), ...(zNewsletterem ? { zgodaEmail: true, wersjaZgodySms: '2026-09-09' } : {}) };
    const [p1, p2] = await Promise.all([post(dane5b), post(dane5b)]);
    opoznij = false;
    assert.deepEqual([p1.status, p2.status], [200, 200]);
    assert.equal(mails.filter((m) => /Twoja paczka/.test(m.subject)).length, 1, 'równoległe ponowienie bez duplikatu, newsletter: ' + zNewsletterem);
    assert.deepEqual([(await p1.json()).paczka, (await p2.json()).paczka].sort(), ['w_toku', 'wyslana'], 'drugie żądanie nie ogłasza sukcesu w trakcie');
  }

  // 5b'. Równoległe żądanie dostaje w_toku, a pierwsza wysyłka potem zawodzi: 502 i jedna próba.
  mails.length = 0; opoznij = true; odrzuc = '500';
  const dane5d = { email: 'rownblad@example.invalid', requestId: crypto.randomUUID() };
  const [q1, q2] = await Promise.all([post(dane5d), post(dane5d)]);
  opoznij = false; odrzuc = false;
  assert.deepEqual([q1.status, q2.status].sort(), [200, 502]);
  assert.equal((await (q1.status === 200 ? q1 : q2).json()).paczka, 'w_toku');
  assert.equal(mails.filter((m) => /Twoja paczka/.test(m.subject)).length, 1, 'jedna próba wysyłki');

  // 5c. Pozostawiona rezerwacja (awaria w trakcie wysyłki): ponowienie nie wysyła na ślepo i nie ogłasza sukcesu.
  mails.length = 0;
  const dane5c = { email: 'awaria@example.invalid', requestId: crypto.randomUUID() };
  odrzuc = 'zerwij';
  assert.equal((await post(dane5c)).status, 502);
  odrzuc = false;
  const tok5c = (await zapisy()).find((r) => r.typ === 'pobranie-prosba' && r.email === 'awaria@example.invalid').token;
  await appendFile(join(dir, 'data', 'zapisy.jsonl'), JSON.stringify({ typ: 'pobranie-mail-proba', token: tok5c, kiedy: new Date().toISOString() }) + String.fromCharCode(10));
  mails.length = 0;
  assert.equal((await (await post(dane5c)).json()).paczka, 'w_toku');
  assert.equal(mails.length, 0);

  // 6. Zły token bonusu; stara ścieżka zapisu z tokenu pobrania nie istnieje.
  assert.doesNotMatch((await fetch(base + '/api/komplet?t=zly')).headers.get('content-type'), /zip/);
  const prosba = (await zapisy()).find((r) => r.typ === 'pobranie-prosba' && r.email === 'nie@example.invalid');
  const stara = await fetch(base + '/api/newsletter-z-pobrania', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ t: prosba.token, zgoda: 'tak' }) });
  assert.notEqual(stara.status, 200);
  assert.ok(!(await sub()).some((r) => r.email === 'nie@example.invalid'));
});
