import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';import {join} from 'node:path';
import {createHmac,randomUUID} from 'node:crypto';
import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
import {createEventInbox} from './crm-events.mjs';

test('durable CRM queue: authenticated input, retry, conflict and commit acknowledgement',()=>{
 const dir=mkdtempSync(join(tmpdir(),'crm-events-')),secret='x'.repeat(64),key=join(dir,'key');writeFileSync(key,secret);
 const inbox=createEventInbox({dir,keyFile:key});
 const event={version:1,event_id:randomUUID(),kind:'kontakt.zamowiony',source:'dx-kontakt',occurred_at:new Date().toISOString(),email:'test@example.invalid',name:'Test',phone:'',topic:'Inny temat',message:'Zażółć gęślą jaźń. 📨\nSynthetic inquiry'};
 const accept=(data=event,sign=secret,time=String(Math.floor(Date.now()/1000)))=>{const raw=JSON.stringify(data);return inbox.accept(raw,{'x-aix-time':time,'x-aix-signature':createHmac('sha256',sign).update(time+'.'+raw).digest('hex')});};
 assert.equal(accept(event,'wrong').status,403);
 assert.equal(accept(event,secret,'1').status,403);
 assert.equal(accept({...event,source:'aixperts'}).status,422);
 assert.equal(accept().status,202);
 assert.equal(accept().status,202);
 const lines=readFileSync(join(dir,'crm-events.jsonl'),'utf8').trim().split('\n');assert.equal(lines.length,1);
 assert.equal(accept({...event,message:'Changed'}).status,409);
 const record=JSON.parse(lines[0]);
 const imported=spawnSync('python',['-c',"import sys,json;sys.path.insert(0,sys.argv[1]);import interests;rows=[json.loads(l) for l in open(sys.argv[2],encoding='utf-8') if l.strip()];ev,ack=interests.inbox_events(rows);assert len(ev)==1 and ev[0]['product']=='do-kwalifikacji' and ev[0]['details']['message']==rows[0]['event']['message'];assert ack[rows[0]['event']['event_id']]==rows[0]['payload_hash'];print('projection and ACK match')",fileURLToPath(new URL('../../skille-platne/crm-centrum',import.meta.url)),join(dir,'crm-events.jsonl')],{encoding:'utf8'});
 assert.equal(imported.status,0,imported.stderr);assert.match(imported.stdout,/projection and ACK match/);
 writeFileSync(join(dir,'crm-events-ack.json'),JSON.stringify({[event.event_id]:'wrong'}));assert.equal(accept().status,202);
 writeFileSync(join(dir,'crm-events-ack.json'),JSON.stringify({[event.event_id]:record.payload_hash}));
 assert.deepEqual(accept(),{status:200,body:{ok:true,eventId:event.event_id,crm:true}});
 // A restart must preserve both deduplication and the confirmed acknowledgement.
 assert.equal(createEventInbox({dir,keyFile:key}).accept(JSON.stringify(event),{'x-aix-time':String(Math.floor(Date.now()/1000)),'x-aix-signature':createHmac('sha256',secret).update(String(Math.floor(Date.now()/1000))+'.'+JSON.stringify(event)).digest('hex')}).status,200);
});
