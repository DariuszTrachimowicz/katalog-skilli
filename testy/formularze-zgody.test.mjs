import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, copyFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://aixperts.pl';
const start = server => new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server.address().port)));
const close = server => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); });

test('formularze i zgody: rzeczywisty lokalny HTTP, dziennik i fikcyjne odbiorniki', async t => {
  const dir = await mkdtemp(join(tmpdir(), 'aix-formularze-'));
  const received = [];
  const mails = [];
  const upstream = createServer(async (req, res) => {
    let body = '';
    for await (const c of req) body += c;
    if(req.url==='/mail') { mails.push(JSON.parse(body)); await new Promise(r=>setTimeout(r,25)); return res.end('{"ok":true}'); }
    const fields = Object.fromEntries(new URLSearchParams(body));
    received.push({ path: req.url, fields, headers: req.headers });
    if (fields.name === 'HTTP_500') { res.writeHead(500); return res.end('{"success":true}'); }
    if (fields.name === 'REJECT') return res.end('{"success":false,"message":"rejected"}');
    if (fields.name === 'STRING_TRUE') return res.end('{"success":"true"}');
    if (fields.name === 'HTML') return res.end('<html>Formularz</html>');
    if (fields.name === 'REDIRECT') { res.writeHead(302, { Location: '/never-follow' }); return res.end(); }
    if (fields.name === 'LARGE_RESPONSE') return res.end('x'.repeat(20000));
    if (fields.name === 'TIMEOUT') return;
    res.setHeader('Content-Type', 'application/json');
    return res.end('{"success":true}');
  });
  const upPort = await start(upstream);
  const reserve = createServer();
  const port = await start(reserve);
  await close(reserve);
  await mkdir(join(dir, 'serwer'));
  await mkdir(join(dir, 'paczki'));
  await mkdir(join(dir, 'data'));
  await copyFile(join(root, 'serwer', 'zapisy.mjs'), join(dir, 'serwer', 'zapisy.mjs'));
  await copyFile(join(root, 'serwer', 'subskrypcje.mjs'), join(dir, 'serwer', 'subskrypcje.mjs'));
  for (const m of ['crm-events.mjs', 'mail-design.mjs', 'subscription-pages.mjs', 'powiadomienia-wersji.mjs']) await copyFile(join(root, 'serwer', m), join(dir, 'serwer', m));
  await writeFile(join(dir, 'paczki', 'sample-trial.skill'), 'synthetic package');
  await writeFile(join(dir, 'config.json'), JSON.stringify({ domena:'skille.aixperts.pl', nazwaSerwisu:'Synthetic', zapisy:{port,limitNaGodzine:10000,plikDanych:join(dir,'data','zapisy.jsonl'),wysylka:{tryb:'http',url:`http://127.0.0.1:${upPort}/mail`,nadawca:'synthetic@example.invalid',naglowekAutoryzacji:'synthetic-test-only'},crm:{formularz:`http://127.0.0.1:${upPort}/crm`,feedback:`http://127.0.0.1:${upPort}/feedback`}} }));
  await writeFile(join(dir, 'network.mjs'), `const f=globalThis.fetch; globalThis.fetch=(url,opts)=>{const u=new URL(url); if(u.hostname==='crm.aixperts.pl'){return f('http://127.0.0.1:${upPort}'+u.pathname,opts);} if(u.origin==='http://127.0.0.1:${upPort}')return f(url,opts); throw new Error('External network forbidden');};`);
  const child = spawn(process.execPath, ['--import',pathToFileURL(join(dir,'network.mjs')).href,join(dir,'serwer','zapisy.mjs')], {env:{...process.env,ZAPISY_PORT:String(port)},stdio:['ignore','pipe','pipe']});
  let output=''; child.stdout.on('data',c=>output+=c); child.stderr.on('data',c=>output+=c);
  const base=`http://127.0.0.1:${port}`;
  const json = (path, data) => fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const form = (path,data,opts={}) => fetch(base+path,{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',...(opts.headers||{})},body:new URLSearchParams(data),...opts});
  const events = async () => (await readFile(join(dir,'data','zapisy.jsonl'),'utf8').catch(()=>'' )).trim().split('\n').filter(Boolean).map(JSON.parse);
  const waitRecords = async () => { await new Promise(r=>setTimeout(r,30)); };
  try {
    for(let n=0;n<100;n++){try{if((await fetch(base+'/api/zdrowie')).ok)break;}catch{} await new Promise(r=>setTimeout(r,30)); if(n===99)throw Error(output);}
    await t.test('wynik testu bez zgody nie tworzy subskrypcji także po potwierdzeniu',async()=>{
      assert.equal((await json('/api/zapis',{email:'quiz@example.invalid',wynik:['sample']})).status,200);
      const record=(await events()).find(x=>x.email==='quiz@example.invalid');
      assert.equal(record?.typ,'wynik-prosba');
      await fetch(base+'/api/potwierdz?t='+record.token);
      const saved=(await events()).filter(x=>x.email==='quiz@example.invalid');
      assert.equal(saved.some(x=>x.typ==='zapis'||x.typ==='potwierdzenie'),false);
      assert.equal(saved.filter(x=>x.typ==='wynik-potwierdzenie').length,1);
      const logs=mails.filter(m=>m.to.includes('quiz@example.invalid')).map(m=>m.subject+'\n'+m.text).join('\n');
      assert.match(logs,/Twój zestaw/);
      assert.doesNotMatch(logs,/Będziemy pisać|NEWSLETTER10/);
      const before=saved.length;
      await fetch(base+'/api/potwierdz?t='+record.token);
      assert.equal((await events()).filter(x=>x.email==='quiz@example.invalid').length,before);
    });
    await t.test('dobrowolny marketing testu ma dowód treści i powstaje dopiero po kliknięciu',async()=>{
      const email='optin@example.invalid';
      assert.equal((await json('/api/zapis',{email,wynik:['sample'],zgodaMarketing:true})).status,200);
      const record=(await events()).find(x=>x.email===email);
      assert.equal(record?.typ,'wynik-prosba');
      assert.equal(record.zgoda?.udzielona,true);
      assert.equal(record.zgoda?.zrodlo,'test-doboru');
      assert.equal(record.zgoda?.kanal,'email');
      assert.ok(record.zgoda?.wersja && record.zgoda?.tresc && record.zgoda?.kiedy);
      await fetch(base+'/api/potwierdz?t='+record.token);
      const saved=(await events()).filter(x=>x.email===email);
      assert.equal(saved.filter(x=>x.typ==='zapis').length,1);
      assert.equal(saved.filter(x=>x.typ==='potwierdzenie').length,1);
      assert.deepEqual(saved.find(x=>x.typ==='zapis').zgoda,record.zgoda);
    });
    await t.test('tekst false nie jest zgodą newslettera',async()=>{
      const r=await json('/api/newsletter',{email:'false@example.invalid',zgoda:'false'});
      assert.equal(r.status,400);
      assert.equal((await events()).some(x=>x.email==='false@example.invalid'),false);
    });
    await t.test('newsletter ma snapshot źródła, czasu, treści i wersji',async()=>{
      await json('/api/newsletter',{email:'news@example.invalid',zgoda:true});
      const r=(await events()).find(x=>x.email==='news@example.invalid');
      assert.equal(r.zgoda?.udzielona,true);
      assert.equal(r.zgoda?.zrodlo,'newsletter');
      assert.ok(r.zgoda?.wersja&&r.zgoda?.tresc&&r.zgoda?.kiedy);
    });
    await t.test('równoległe potwierdzenia wyniku nie wysyłają zestawu ponownie',async()=>{
      const email='race@example.invalid';
      await json('/api/zapis',{email,wynik:['sample'],zgodaMarketing:false});
      const r=(await events()).find(x=>x.email===email);
      await Promise.all(Array.from({length:4},()=>fetch(base+'/api/potwierdz?t='+r.token)));
      assert.equal((await events()).filter(x=>x.email===email&&x.typ==='wynik-potwierdzenie').length,1);
      assert.equal(mails.filter(m=>m.to.includes(email)).length,2,'jedna prośba o potwierdzenie i jeden zestaw');
    });
    await t.test('trial traktuje tylko boolean true jako zgodę',async()=>{
      await json('/api/pobranie',{email:'trialfalse@example.invalid',skill:'sample-trial',zgodaMarketing:'false'});
      assert.equal((await events()).find(x=>x.email==='trialfalse@example.invalid').zgodaMarketing,null);
      await json('/api/pobranie',{email:'trialtrue@example.invalid',skill:'sample-trial',zgodaMarketing:true});
      const r=(await events()).find(x=>x.email==='trialtrue@example.invalid');
      assert.equal(r.zgoda?.zrodlo,'pobranie-triala');
      assert.equal(r.zgoda?.udzielona,true);
      assert.equal(r.zgoda?.kiedy,r.zgodaMarketing);
    });
    await t.test('token pobrania bez zgody nie może stać się potwierdzeniem newslettera',async()=>{
      const r=(await events()).find(x=>x.email==='trialfalse@example.invalid');
      await fetch(base+'/api/potwierdz?t='+r.token);
      assert.equal((await events()).some(x=>x.email===r.email&&x.typ==='potwierdzenie'),false);
    });
    await t.test('wypis zachowuje zdarzenia, a komunikat nie obiecuje skasowania historii',async()=>{
      const record=(await events()).find(x=>x.email==='news@example.invalid');
      const r=await fetch(base+'/api/wypisz?t='+record.token);
      const html=await r.text();
      assert.doesNotMatch(html,/usunięty razem z całą historią|Nie wyślemy Ci już nic/);
      assert.match(html,/marketing|newsletter/);
      assert.equal((await events()).some(x=>x.email==='news@example.invalid'&&x.typ==='wypisanie'),true);
      assert.equal((await events()).some(x=>x.email==='news@example.invalid'&&x.typ==='zapis'),true);
    });
    for(const path of ['/api/formularze/kontakt','/api/formularze/ankieta-warsztatowa']) await t.test(path+' normalizuje potwierdzenie i używa stałego formularza',async()=>{
      const r=await form(path,{name:'Synthetic',email:'form@example.invalid',description:'Fikcyjna treść',company:'Firma'});
      assert.equal(r.status,200);
      assert.deepEqual(await r.json(),{ok:true});
      const got=received.at(-1);
      assert.equal(got.path,path.endsWith('kontakt')?'/forms/wtl/87e5882626066318a1a971647a7f5dd6':'/forms/wtl/c7149ad2caa50c335e10ebc746482192');
      assert.equal(got.fields.key,got.path.split('/').pop());
      assert.equal(got.headers.authorization,undefined);
      assert.equal(got.headers.cookie,undefined);
    });
    for(const name of ['REJECT','STRING_TRUE','HTML','HTTP_500','REDIRECT','LARGE_RESPONSE']) await t.test('CRM '+name+' nie staje się sukcesem formularza',async()=>{
      const r=await form('/api/formularze/kontakt',{name,description:'Fikcyjna treść'});
      assert.equal(r.status,502);
      assert.notEqual((await r.json()).ok,true);
    });
    await t.test('niedozwolony origin, metoda i droga nie wywołują CRM',async()=>{
      await waitRecords(); const before=received.length;
      assert.equal((await form('/api/formularze/kontakt',{name:'Synthetic'},{headers:{Origin:'https://evil.invalid','Content-Type':'application/x-www-form-urlencoded'}})).status,403);
      assert.equal((await fetch(base+'/api/formularze/kontakt',{headers:{Origin:origin}})).status,405);
      assert.equal((await form('/api/formularze/elsewhere',{name:'Synthetic'})).status,404);
      assert.equal(received.length,before);
    });
    await t.test('nie można przekazać obcej ścieżki, pól administracyjnych ani zbyt dużego body',async()=>{
      const before=received.length;
      assert.equal((await form('/api/formularze/kontakt',{name:'Synthetic',url:'https://evil.invalid',status:'1'})).status,400);
      assert.equal((await form('/api/formularze/kontakt',{name:'Synthetic',description:'x'.repeat(18000)})).status,413);
      assert.equal(received.length,before);
    });
    await t.test('feedback same-origin potwierdza rzeczywisty zapis JSONL',async()=>{
      const r=await form('/api/formularze/feedback',{email:'feedback@example.invalid',brakuje:'Fikcyjny wniosek',pomogl:'bardzo',branza:'test',token:''});
      assert.equal(r.status,200); assert.deepEqual(await r.json(),{ok:true});
      const records=(await readFile(join(dir,'data','feedback.jsonl'),'utf8')).trim().split('\n').map(JSON.parse);
      assert.equal(records.at(-1).brakuje,'Fikcyjny wniosek');
    });
    await t.test('limit czasu CRM nie daje potwierdzenia i nie ponawia wysyłki',async()=>{
      const before=received.filter(x=>x.fields.name==='TIMEOUT').length;
      const begin=Date.now(); const r=await form('/api/formularze/kontakt',{name:'TIMEOUT'});
      assert.equal(r.status,504); assert.ok(Date.now()-begin<11000);
      assert.equal(received.filter(x=>x.fields.name==='TIMEOUT').length,before+1);
    });
  } finally {
    if(child.exitCode===null)await new Promise(r=>{child.once('exit',r);child.kill();});
    await close(upstream); await rm(dir,{recursive:true,force:true});
  }
});
