const {test, before, after} = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const {chromium} = require('C:/Users/CP24/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
let browser;
const script = path.resolve(__dirname, '../szablony/subskrypcje-ui.js');
before(async () => { browser = await chromium.launch({headless:true, channel:'chrome'}); });
after(async () => { if(browser) await browser.close(); });
async function page() {
  const p = await browser.newPage();
  await p.route('https://aixperts.pl/', r => r.fulfill({contentType:'text/html', body:'<div data-aix-subskrypcje="aixperts-newsletter"></div>'}));
  await p.goto('https://aixperts.pl/');
  await p.addScriptTag({path:script});
  return p;
}
test('telefon pokazuje dobrowolny SMS i zmiana numeru zeruje wybor',async()=>{
  const p=await page();
  const sms=p.locator('[name=zgodaSms]');
  assert.equal(await sms.isVisible(),false);
  await p.locator('[name=telefon]').fill('+48500100200');
  assert.equal(await sms.isVisible(),true);
  assert.equal(await sms.isChecked(),false);
  await sms.check();
  await p.locator('[name=telefon]').fill('+48500100201');
  assert.equal(await sms.isChecked(),false);
  await sms.check(); await p.locator('[name=telefon]').fill('');
  assert.equal(await sms.isVisible(),false); assert.equal(await sms.isChecked(),false);
  await p.close();
});
test('wybor samego SMS nie dopisuje emaila ani nie obiecuje aktywnej wysylki',async()=>{
  const p=await page(); let body;
  await p.route('https://skille.aixperts.pl/api/subskrypcje',async r=>{
    body=r.request().postDataJSON();
    await r.fulfill({json:{ok:true,trwaleZapisano:true,requestId:body.requestId,email:'nie_wybrano',sms:'oczekuje_potwierdzenia_numeru'}});
  });
  await p.locator('[name=telefon]').fill('+48500100200');
  await p.locator('[name=zgodaSms]').check(); await p.getByRole('button',{name:'Zapisz wybór'}).click();
  await p.locator('[role=status]').filter({hasText:'potwierdzenie numeru'}).waitFor();
  assert.equal(body.zgodaEmail,false); assert.equal(body.zgodaSms,true); assert.equal(body.email,'');
  assert.equal(body.wersja,'2026-09-09');
  await p.close();
});
test('blad transportu zachowuje dane i ponowienie ma to samo ID',async()=>{
  const p=await page(); const calls=[];
  await p.route('https://skille.aixperts.pl/api/subskrypcje',r=>{
    calls.push(r.request().postDataJSON()); return r.fulfill({status:503,json:{ok:false}});
  });
  await p.locator('[name=email]').fill('test@example.invalid');
  await p.locator('[name=zgodaEmail]').check();
  await p.getByRole('button',{name:'Zapisz wybór'}).click();
  await p.getByRole('button',{name:'Spróbuj ponownie'}).click();
  await p.getByRole('button',{name:'Spróbuj ponownie'}).waitFor();
  assert.equal(calls.length,2); assert.equal(calls[0].requestId,calls[1].requestId);
  assert.equal(await p.locator('[name=email]').inputValue(),'test@example.invalid');
  assert.match(await p.locator('[role=status]').textContent(),/Nie potwierdzono/);
  await p.close();
});
