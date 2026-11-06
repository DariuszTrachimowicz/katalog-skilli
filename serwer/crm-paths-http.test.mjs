import test from 'node:test';import assert from 'node:assert/strict';import {spawn} from 'node:child_process';
import {mkdtempSync,readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';import {join} from 'node:path';import {pathToFileURL,fileURLToPath} from 'node:url';
test('quiz and download preserve business facts; CRM offline does not block result or create a parallel lead',async t=>{
 const dir=mkdtempSync(join(tmpdir(),'crm-paths-')),root=fileURLToPath(new URL('../',import.meta.url)),port=20000+Math.floor(Math.random()*15000),base=`http://127.0.0.1:${port}`,journal=join(dir,'zapisy.jsonl');
 const guard=join(dir,'guard.mjs');writeFileSync(guard,`import {appendFileSync} from 'node:fs';globalThis.fetch=async()=>{appendFileSync(${JSON.stringify(join(dir,'external-calls'))},'call\\n');throw new Error('External requests are blocked in this test');};`);
 const child=spawn(process.execPath,['--import',pathToFileURL(guard).href,join(root,'serwer/zapisy.mjs')],{env:{...process.env,ZAPISY_HOST:'127.0.0.1',ZAPISY_PORT:String(port),ZAPISY_PLIK:journal,ZAPISY_TRYB:'log'},stdio:'ignore'});t.after(()=>child.kill());
 for(let i=0;i<100;i++){try{if((await fetch(base+'/api/zdrowie')).ok)break;}catch{}await new Promise(r=>setTimeout(r,50));}
 const rows=()=>readFileSync(journal,'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
 const post=(url,data)=>fetch(base+url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
 const skills=JSON.parse(readFileSync(join(root,'public/dane/skille.json'),'utf8')),premium=skills.find(s=>s.platny)?.id,// od 4 XI 2026 brak płatnych: tor premium opcjonalny
 free=skills.find(s=>!s.platny).id;
 for(const consent of [false,true]){
  const email=`quiz-${consent}@example.invalid`;
  assert.equal((await post('/api/zapis',{email,wynik:[free],premium,zgodaMarketing:consent})).status,200);
  const request=rows().find(r=>r.typ==='wynik-prosba'&&r.email===email);
  assert.equal((await fetch(base+'/api/potwierdz?t='+request.token)).status,200);
  assert.equal(rows().filter(r=>r.typ==='wynik-potwierdzenie'&&r.token===request.token).length,0,'GET nie potwierdza');
  assert.equal((await fetch(base+'/api/potwierdz?t='+request.token,{method:'POST'})).status,200);
  await fetch(base+'/api/potwierdz?t='+request.token,{method:'POST'});
  assert.equal(rows().filter(r=>r.typ==='wynik-potwierdzenie'&&r.token===request.token).length,1);
  assert.deepEqual(request.wynik,[free]);assert.equal(request.premium??undefined,premium);
 }
 const pack=readdirSync(join(root,'paczki')).find(n=>n.endsWith('.skill')).replace(/\.skill$/,'');
 assert.equal((await post('/api/pobranie',{email:'pack@example.invalid',skill:pack,osoba:'Anna',telefon:'+48500600700',zgodaMarketing:false})).status,200);
 const request=rows().find(r=>r.typ==='pobranie-prosba');
 const first=await fetch(base+'/api/pobierz?t='+request.token);assert.equal(first.status,200);assert.ok((await first.arrayBuffer()).byteLength>0);
 const second=await fetch(base+'/api/pobierz?t='+request.token);await second.arrayBuffer();
 assert.equal(rows().filter(r=>r.typ==='pobranie').length,1);
 assert.equal(request.osoba,'Anna');
 assert.equal(existsSync(join(dir,'external-calls')),false,'no WTL/native-lead producer outside the collector');
 const mail=readFileSync(join(dir,'wyslane-maile.log'),'utf8');assert.ok(mail.includes('quiz-false@example.invalid')&&mail.includes('pack@example.invalid'));
});
