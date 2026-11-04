// Server-to-server inbox. 202 means durable transport; only a committed CRM ACK gives 200.
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHmac,createHash,timingSafeEqual} from 'node:crypto';
import {appendDurable} from './subskrypcje.mjs';

export function createEventInbox({dir,keyFile}) {
 const path=join(dir,'crm-events.jsonl'),ackPath=join(dir,'crm-events-ack.json');
 function accept(raw,headers) {
  const reply=(status,body)=>({status,body});
  const reject=status=>reply(status,{ok:false});
  if(Buffer.byteLength(raw)>32768)return reject(413);
  const time=headers['x-aix-time'],signature=headers['x-aix-signature'];
  if(headers.origin || !/^\d{10}$/.test(time||'') || Math.abs(Date.now()/1000-Number(time))>300 || !/^[a-f0-9]{64}$/.test(signature||''))return reject(403);
  let key;try{key=readFileSync(keyFile,'utf8').trim();}catch{return reject(503);}
  if(key.length<32)return reject(503);
  const expected=createHmac('sha256',key).update(time+'.'+raw).digest();
  if(!timingSafeEqual(expected,Buffer.from(signature,'hex')))return reject(403);
  let event;try{event=JSON.parse(raw);}catch{return reject(422);}
  const keys=['version','event_id','kind','source','occurred_at','email','name','phone','topic','message'];
  if(!event || typeof event!=='object' || Object.keys(event).length!==keys.length || !keys.every(k=>Object.hasOwn(event,k)))return reject(422);
  if(event.version!==1 || event.kind!=='kontakt.zamowiony' || event.source!=='dx-kontakt' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(event.event_id||''))return reject(422);
  for(const [k,max] of Object.entries({email:254,name:200,phone:50,topic:200,message:8000,occurred_at:30}))if(typeof event[k]!=='string'||event[k].length>max||event[k].includes('\0'))return reject(422);
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(event.email)||!event.name.trim()||!event.topic.trim()||!event.message.trim()||!/^\d{4}-\d\d-\d\dT/.test(event.occurred_at)||!Number.isFinite(Date.parse(event.occurred_at))||Date.parse(event.occurred_at)>Date.now()+300000)return reject(422);
  // Canonical key order makes a retry insensitive to JSON formatting; values remain immutable.
  event=Object.fromEntries(keys.map(k=>[k,event[k]]));
  const hash=createHash('sha256').update(JSON.stringify(event)).digest('hex');
  try {
   const records=existsSync(path)?readFileSync(path,'utf8').split('\n').filter(Boolean).map(JSON.parse):[];
   const old=records.find(r=>r.event?.event_id===event.event_id);
   if(old&&old.payload_hash!==hash)return reject(409);
   if(!old)appendDurable(path,{event,payload_hash:hash});
   let ack={};try{ack=JSON.parse(readFileSync(ackPath,'utf8'));}catch{}
   if(ack[event.event_id]===hash)return reply(200,{ok:true,eventId:event.event_id,crm:true});
   return reply(202,{ok:true,eventId:event.event_id,queued:true});
  }catch{return reject(503);}
 }
 return {accept};
}
