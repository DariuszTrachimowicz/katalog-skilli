// Prywatny dziennik transportowy. Jeden proces Node jest jedynym piszącym;
// CRM odczytuje dowody, a nie tokeny. Brak wykonawcy marketingu w tym module.
import {openSync,closeSync,writeSync,fsyncSync,readFileSync,mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {randomBytes,randomUUID,createHash} from 'node:crypto';
export const VERSION='2026-09-09';
export const SCOPE='aixperts-dx-marketing';
export const ORIGINS=Object.freeze({'aixperts-newsletter':'https://aixperts.pl','dx-newsletter':'https://d-x.pl','katalog-newsletter':'https://skille.aixperts.pl','pracownia-newsletter':'https://pracownia.aixperts.pl'});
const INTERNAL_ORIGINS=Object.freeze({'portal-kontakt':'https://aixperts.pl','portal-warsztaty':'https://aixperts.pl','katalog-pobranie':'https://skille.aixperts.pl'});
export const TEXT=Object.freeze({email:'Chcę otrzymywać od D-X.PL Michał Jaśkiewicz newsletter e-mail o ofertach, nowościach i promocjach AiXperts i Digital Xperts. Zgodę mogę wycofać w każdej chwili.',sms:'Chcę otrzymywać od D-X.PL Michał Jaśkiewicz wiadomości SMS o ofertach, nowościach i promocjach AiXperts i Digital Xperts na podany numer telefonu. Zgodę mogę wycofać w każdej chwili.'});
const hash=x=>createHash('sha256').update(x).digest('hex');
const fail=(status,message)=>{throw Object.assign(new Error(message),{status});};
export function normalizePhone(value){const p=String(value??'').trim().replace(/[ ()-]/g,'');return /^\+[1-9]\d{7,14}$/.test(p)?p:null;}
export function appendDurable(path,row){const fd=openSync(path,'a',0o600);try{const b=Buffer.from(JSON.stringify(row)+'\n');let n=0;while(n<b.length)n+=writeSync(fd,b,n,b.length-n);fsyncSync(fd);}finally{closeSync(fd);}if(process.platform!=='win32'){const d=openSync(dirname(path),'r');try{fsyncSync(d);}finally{closeSync(d);}}return row;}
export function createSubscriptions(path,{publicBase='https://skille.aixperts.pl'}={}){
  if(!['https://skille.aixperts.pl','https://newsletter.aixperts.pl'].includes(publicBase))throw new Error('Invalid subscription public base');
  mkdirSync(dirname(path),{recursive:true});
  function rows(){try{return readFileSync(path,'utf8').split('\n').filter(Boolean).map(JSON.parse);}catch(e){if(e.code==='ENOENT')return [];throw e;}}
  const append=row=>appendDurable(path,row);
  function base(type){const previous=rows().reduce((n,r)=>Math.max(n,r.occurred_at||0),0);return {schema_version:1,event_id:randomUUID(),type,scope:SCOPE,controller:'D-X.PL Michał Jaśkiewicz',occurred_at:Math.max(Date.now(),previous+1)};}
  function subscribe(body,origin,internal=false){
    if(!body||typeof body!=='object'||Array.isArray(body))fail(400,'Nieprawidłowy formularz.');
    const keys=['email','telefon','zgodaEmail','zgodaSms','wersja','zrodlo','requestId'];
    if(Object.keys(body).some(k=>!keys.includes(k)))fail(400,'Formularz zawiera niedozwolone pola.');
    const sources=internal?INTERNAL_ORIGINS:ORIGINS;
    if(!Object.hasOwn(sources,body.zrodlo)||sources[body.zrodlo]!==origin)fail(403,'Niedozwolone źródło formularza.');
    if(body.wersja!==VERSION||!/^([0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i.test(body.requestId||''))fail(400,'Odśwież formularz i ponów zapis.');
    if(typeof body.zgodaEmail!=='boolean'||typeof body.zgodaSms!=='boolean'||!(body.zgodaEmail||body.zgodaSms))fail(400,'Wybierz przynajmniej jeden kanał subskrypcji.');
    const email=String(body.email||'').trim().toLowerCase();
    if((body.zgodaEmail||email)&&(email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))fail(400,'Podaj poprawny adres e-mail.');
    const phone=normalizePhone(body.telefon);
    if(body.zgodaSms&&!phone)fail(400,'Podaj telefon z prefiksem kraju, np. +48.');
    const canonical={email,telefon:String(body.telefon??'').trim(),zgodaEmail:body.zgodaEmail,zgodaSms:body.zgodaSms,wersja:VERSION,zrodlo:body.zrodlo};
    const fingerprint=hash(JSON.stringify(canonical));
    const old=rows().find(r=>r.type==='subscription-request'&&r.request_id===body.requestId);
    if(old){if(old.fingerprint!==fingerprint)fail(409,'Ten identyfikator został już użyty z innymi danymi.');return {result:old.result,record:old,replayed:true,confirmToken:null,unsubscribeToken:null};}
    const confirmToken=body.zgodaEmail?randomBytes(32).toString('hex'):null,unsubscribeToken=randomBytes(32).toString('hex'),mailUnsubscribeToken=randomBytes(32).toString('hex');
    const r={...base('subscription-request'),request_id:body.requestId,fingerprint,email,phone:body.zgodaSms?phone:null,source:body.zrodlo,origin};
    const proof=channel=>({channel,granted:true,verified:false,version:VERSION,text:TEXT[channel],proof_at:r.occurred_at});
    r.consent_email=body.zgodaEmail?proof('email'):null;r.consent_sms=body.zgodaSms?proof('sms'):null;
    r.confirm_hash=confirmToken?hash(confirmToken):null;r.unsubscribe_hash=hash(mailUnsubscribeToken);r.request_unsubscribe_hash=hash(unsubscribeToken);
    // Recovery of an unattempted confirmation mail is possible after process restart.
    r.delivery=confirmToken?{confirmToken,unsubscribeToken:mailUnsubscribeToken}:null;
    r.result={ok:true,requestId:body.requestId,trwaleZapisano:true,email:body.zgodaEmail?'oczekuje_potwierdzenia':'nie_wybrano',sms:body.zgodaSms?'oczekuje_potwierdzenia_numeru':'nie_wybrano',wypisUrl:publicBase+'/api/subskrypcje/wypisz?t='+unsubscribeToken};
    append(r);return {result:r.result,record:r,replayed:false,confirmToken,unsubscribeToken};
  }
  function find(token,field){if(!/^[0-9a-f]{64}$/.test(token||''))fail(400,'Nieprawidłowy link.');const r=rows().find(r=>r.type==='subscription-request'&&(r[field]===hash(token)||(field==='unsubscribe_hash'&&r.request_unsubscribe_hash===hash(token))));if(!r)fail(400,'Nieprawidłowy link.');return {...r,request_only:field==='unsubscribe_hash'&&r.request_unsubscribe_hash===hash(token)};}
  function confirm(token){const r=find(token,'confirm_hash');if(!r.consent_email)fail(400,'Brak wyboru e-mail.');if(Date.now()-r.occurred_at>7*86400000)fail(410,'Link potwierdzenia wygasł. Zapisz się ponownie.');if(!rows().some(x=>x.type==='email-confirmed'&&x.request_id===r.request_id))append({...base('email-confirmed'),request_id:r.request_id,email:r.email,source:r.source,channel:'email'});return status(r.request_id,'email');}
  function withdraw(token,channel){if(!['email','sms','all'].includes(channel))fail(400,'Nieprawidłowy kanał.');const r=find(token,'unsubscribe_hash');if(channel!=='all'&&!r['consent_'+channel])fail(400,'Ten link nie obejmuje wybranego kanału.');const request_only=r.request_unsubscribe_hash===hash(token);append({...base('subscription-withdrawn'),request_only,request_id:r.request_id,email:r.email,phone:r.phone,channel,source:'public-unsubscribe',origin:r.origin});return {...r,request_only};}
  function status(id,channel){const all=rows(),r=all.find(x=>x.type==='subscription-request'&&x.request_id===id);if(!r?.['consent_'+channel])return 'nie_wybrano';const blocked=all.some(x=>x.type==='subscription-withdrawn'&&(!x.request_only||x.request_id===id)&&x.occurred_at>=r.occurred_at&&['all',channel].includes(x.channel)&&(channel==='email'?x.email===r.email:(x.channel==='all'&&r.email&&x.email===r.email)||x.phone===r.phone));if(blocked)return 'wycofana';if(channel==='sms')return 'oczekuje_potwierdzenia_numeru';return all.some(x=>x.type==='email-confirmed'&&x.request_id===id)?'potwierdzona':'oczekuje_potwierdzenia';}
  function reserveMail(id){const all=rows(),r=all.find(x=>x.type==='subscription-request'&&x.request_id===id);if(!r?.delivery||all.some(x=>x.type==='confirmation-mail-attempt'&&x.request_id===id))return null;append({...base('confirmation-mail-attempt'),request_id:id});return r;}
  function finishMail(id,accepted){append({...base('confirmation-mail-result'),request_id:id,accepted:accepted===true});}
  function withdrawEmail(email){append({...base('subscription-withdrawn'),email,phone:null,channel:'email',request_only:false,source:'legacy-unsubscribe'});}
  function subscribeOptional(body,origin,source){
    const result={email:'nie_wybrano',sms:'nie_wybrano'};
    const emailChosen=body.zgodaEmail===true,smsChosen=body.zgodaSms===true;
    if(!emailChosen&&!smsChosen)return result;
    const validVersion=body.wersjaZgodySms===VERSION;
    const validSms=validVersion&&!!normalizePhone(body.telefon);
    if(smsChosen&&!validSms){result.sms='odrzucona';result.powod='Nie zapisano SMS: podaj numer z prefiksem kraju i zaakceptuj aktualną treść zgody.';}
    if(emailChosen&&!validVersion){result.email='odrzucona';result.powod='Nie zapisano newslettera: odśwież treść zgody.';}
    if(!(emailChosen&&validVersion)&&!(smsChosen&&validSms))return result;
    try{const saved=subscribe({email:body.email,telefon:body.telefon||'',zgodaEmail:emailChosen&&validVersion,zgodaSms:smsChosen&&validSms,wersja:VERSION,zrodlo:source,requestId:body.requestId},origin,true);
      return {...saved.result,...(result.sms==='odrzucona'?{sms:result.sms,powod:result.powod}:{}),...(result.email==='odrzucona'?{email:result.email,powod:result.powod}:{})};
    }catch(e){return {...result,email:emailChosen?'nie_zapisano':result.email,sms:smsChosen?'nie_zapisano':result.sms,powod:e.status?e.message:'Nie potwierdzono trwałego zapisu subskrypcji. Ponów zapis newslettera z tym samym identyfikatorem.'};}
  }
  return {rows,subscribe,subscribeOptional,confirm,withdraw,withdrawEmail,status,reserveMail,finishMail,find};
}
