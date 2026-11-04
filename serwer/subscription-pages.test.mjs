import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtempSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {subscriptionPage,subscriptionForm,subscriptionResult} from './subscription-pages.mjs';

test('treść wyników odróżnia kanały, anulowanie zgłoszenia i wycofany zapis',()=>{
  assert.match(subscriptionResult({channel:'email'}),/Nie będziemy już wysyłać Ci newslettera e-mail/);
  assert.match(subscriptionResult({channel:'sms'}),/na numer objęty tym zgłoszeniem/);
  assert.match(subscriptionResult({channel:'all'}),/wszystkie zgody marketingowe.*powiązane z tym zapisem/);
  assert.match(subscriptionResult({requestOnly:true,channel:'all'}),/Wcześniejsze zgody pozostają niezależne/);
  assert.doesNotMatch(subscriptionResult({requestOnly:true,channel:'all'}),/Nie będziemy już wysyłać/);
  assert.match(subscriptionResult({confirm:true,status:'wycofana'}),/Nie zapisaliśmy Cię ponownie/);
  assert.doesNotMatch(subscriptionResult({confirm:true,status:'potwierdzona',hasSms:false}),/czeka na potwierdzenie numeru/);
  assert.match(subscriptionResult({confirm:true,status:'potwierdzona',hasSms:true}),/czeka na potwierdzenie numeru/);
  assert.doesNotMatch(subscriptionPage({title:'<script>alert(1)</script>',intro:'<img src=x>'}),/<script>|<img/);
  assert.doesNotMatch(subscriptionForm({confirm:false,preference:{consent_email:true},token:'"><script>x</script>'}),/<script>/);
});

test('HTTP: nowe formularze zachowują POST, zakres wypisu, potwierdzenie wyniku i brak zapisu przy GET',async t=>{
  const dir=mkdtempSync(join(tmpdir(),'subscription-page-')),port=30000+Math.floor(Math.random()*8000),base=`http://127.0.0.1:${port}`;
  const child=spawn(process.execPath,[fileURLToPath(new URL('./zapisy.mjs',import.meta.url))],{env:{...process.env,ZAPISY_HOST:'127.0.0.1',ZAPISY_PORT:String(port),ZAPISY_PLIK:join(dir,'zapisy.jsonl'),ZAPISY_TRYB:'log'},stdio:'ignore'});
  t.after(()=>child.kill());
  for(let i=0;i<80;i++){try{if((await fetch(base+'/api/zdrowie')).ok)break;}catch{}await new Promise(r=>setTimeout(r,50));}
  const rows=()=>readFileSync(join(dir,'subskrypcje.jsonl'),'utf8').trim().split('\n').map(JSON.parse);
  const register=await fetch(base+'/api/subskrypcje',{method:'POST',headers:{Origin:'https://d-x.pl','Content-Type':'application/json'},body:JSON.stringify({email:'page-test@example.invalid',telefon:'+48500600700',zgodaEmail:true,zgodaSms:true,wersja:'2026-09-09',zrodlo:'dx-newsletter',requestId:randomUUID()})});
  assert.equal(register.status,200);const signup=await register.json();
  const record=rows().find(r=>r.type==='subscription-request');
  const c=record.delivery.confirmToken,u=record.delivery.unsubscribeToken;
  const before=rows().length;
  let r=await fetch(base+'/api/subskrypcje/wypisz?t='+u),html=await r.text();
  assert.equal(r.status,200);assert.equal(r.headers.get('cache-control'),'no-store');assert.equal(r.headers.get('referrer-policy'),'no-referrer');
  for(const channel of ['email','sms','all'])assert.ok(html.includes(`name="kanal" value="${channel}"`));
  assert.match(html,/method="post" action="\/api\/subskrypcje\/wypisz"/);
  assert.doesNotMatch(html,/\/styl.css|Wróć do katalogu/);
  await fetch(base+'/api/subskrypcje/potwierdz?t='+c);
  assert.equal(rows().length,before,'GET must never change consent');
  r=await fetch(base+'/api/subskrypcje/potwierdz',{method:'POST',body:new URLSearchParams({t:c})});
  assert.match(await r.text(),/Zapis potwierdzony!/);
  r=await fetch(base+'/api/subskrypcje/wypisz',{method:'POST',body:new URLSearchParams({t:u,kanal:'email'})});
  html=await r.text();assert.equal(r.status,200);assert.match(html,/Gotowe. Zgoda wycofana./);assert.match(html,/newslettera e-mail/);
  assert.equal(rows().at(-1).channel,'email');assert.equal(rows().at(-1).request_only,false);
  html=await (await fetch(base+'/api/subskrypcje/wypisz?t='+u)).text();assert.match(html,/zgoda e-mail wycofana/);
  const requestToken=new URL(signup.wypisUrl).searchParams.get('t');
  r=await fetch(base+'/api/subskrypcje/wypisz',{method:'POST',body:new URLSearchParams({t:requestToken,kanal:'all'})});
  assert.match(await r.text(),/Wcześniejsze zgody pozostają niezależne/);assert.equal(rows().at(-1).request_only,true);
  const count=rows().length;
  r=await fetch(base+'/api/subskrypcje/wypisz',{headers:{Accept:'text/html'}});assert.equal(r.status,400);assert.match(await r.text(),/Sprawdź link do subskrypcji/);
  r=await fetch(base+'/api/subskrypcje/wypisz');assert.equal(r.status,400);assert.equal((await r.json()).ok,false);
  assert.equal(rows().length,count,'invalid links must not change consent');
});
