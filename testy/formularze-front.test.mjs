import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const fixtures = [
  { dir:'popros-o-kontakt', id:'kontakt', route:'/api/formularze/kontakt' },
  { dir:'ankieta', id:'ankieta', route:'/api/formularze/ankieta-warsztatowa' },
  { dir:'ankieta-feedback', id:'ankieta', route:'/api/formularze/feedback' },
];

function prepare(fixture, reply) {
  const html=readFileSync(fileURLToPath(new URL(`../../portal-tymczasowy/${fixture.dir}/index.html`,import.meta.url)),'utf8');
  const nodes=new Map();
  const node=id=>{if(!nodes.has(id))nodes.set(id,{value:'',style:{display:''},checked:false,disabled:false,textContent:'',innerHTML:'',href:'',classList:{add(){},remove(){}},addEventListener(type,fn){this[type]=fn;},scrollIntoView(){},focus(){}});return nodes.get(id);};
  for(const id of ['imie','email','telefon','firma','rola','cel','uwagi','wiadomosc','brakuje','branza'])node(id).value=id==='email'?'synthetic@example.invalid':id==='telefon'?'+48123456789':'Dane fikcyjne';
  node('temat').value='inne';
  node('podziekowanie').style.display='none';
  const form=node(fixture.id);
  for(const id of ['imie','email','firma','rola','cel','uwagi','wiadomosc','brakuje','branza','token'])form[id]=node(id);
  form.checkValidity=()=>true;
  form.reportValidity=()=>{};
  form.querySelector=selector=>selector.includes(':checked')?{value:'synthetic'}:null;
  let request,completion;
  const window={location:{search:''},scrollTo(){}};
  const context={window,document:{getElementById:node,querySelectorAll:()=>[]},URLSearchParams,AbortController,setTimeout,clearTimeout,console,crypto,
    fetch:(url,opts)=>{request={url,opts}; const p=reply instanceof Error?Promise.reject(reply):Promise.resolve(reply);completion=p;return p;}};
  const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
  const code=scripts.find(x=>x.includes('var ADRES ='));
  assert.ok(code,'brak kodu formularza w HTML');
  runInNewContext(code,context);
  return {nodes,node,form,request:()=>request,async submit(){form.submit({preventDefault(){},target:form}); await completion?.catch(()=>{}); await new Promise(r=>setTimeout(r,15));}};
}

for(const fixture of fixtures) {
  test(`${fixture.dir}: sukces dopiero po aplikacyjnym potwierdzeniu z same-origin`,async()=>{
    const state=prepare(fixture,{ok:true,json:async()=>({ok:true})});
    await state.submit();
    assert.equal(state.request().url,fixture.route);
    assert.notEqual(state.request().opts.mode,'no-cors');
    assert.equal(state.node('podziekowanie').style.display,'block');
    assert.equal(state.form.style.display,'none');
    assert.equal(new URLSearchParams(state.request().opts.body).has('key'),false);
  });
  for(const [name,reply] of [
    ['błąd HTTP',{ok:false,json:async()=>({ok:true})}],
    ['odmowa aplikacji',{ok:true,json:async()=>({ok:false})}],
    ['niepoprawny JSON',{ok:true,json:async()=>{throw Error('not json');}}],
    ['utrata połączenia',new Error('network error')],
  ]) test(`${fixture.dir}: ${name} zachowuje wypełniony formularz bez podziękowania`,async()=>{
    const state=prepare(fixture,reply);
    const originalEmail=state.node('email').value;
    await state.submit();
    assert.notEqual(state.node('podziekowanie').style.display,'block');
    assert.notEqual(state.form.style.display,'none');
    assert.equal(state.node('wyslij').disabled,false);
    assert.equal(state.node('email').value,originalEmail);
    assert.equal(state.node('blad').style.display,'block');
  });
}

test('popros-o-kontakt: temat jest wymagany, a pułapka i temat idą do usługi formularzy',async()=>{
  const fixture=fixtures[0];
  let state=prepare(fixture,{ok:true,json:async()=>({ok:true})});
  state.node('temat').value='';
  await state.submit();
  assert.equal(state.request(),undefined);
  assert.equal(state.node('blad').style.display,'block');
  assert.notEqual(state.node('podziekowanie').style.display,'block');
  state=prepare(fixture,{ok:true,json:async()=>({ok:true})});
  state.node('temat').value='oferta';
  await state.submit();
  const body=new URLSearchParams(state.request().opts.body);
  assert.equal(body.get('temat'),'oferta');
  assert.equal(body.get('www'),'');
});
