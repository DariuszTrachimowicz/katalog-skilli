// Presentation only: confirmation HTML and MIME alternatives; no transport or storage.
import {randomBytes} from 'node:crypto';
export const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function newsletterConfirmation({base,delivery,bonus=null}) {
  const confirm=base+'/api/subskrypcje/potwierdz?t='+delivery.confirmToken;
  const unsubscribe=base+'/api/subskrypcje/wypisz?t='+delivery.unsubscribeToken;
  return {
    temat:'Potwierdź newsletter AiXperts i Digital Xperts',
    tresc:`Potwierdź wybrany newsletter e-mail, otwierając link i naciskając przycisk:\n${confirm}\n\nWypis i wybór kanałów:\n${unsubscribe}\n\nJeśli nie prosiłeś o zapis, zignoruj wiadomość. Link potwierdzenia jest ważny 7 dni. Wybrany SMS czeka osobno na potwierdzenie numeru.${bonus?`

Bonus dla zapisanych: ${bonus.opis} w jednym pliku. Pobierzesz go tym linkiem po potwierdzeniu zapisu (działa też później, również po wypisie):
${bonus.url}`:''}`,
    html:`<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Potwierdź newsletter</title></head>
<body style="margin:0;padding:0;background:#f4f5f9;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Jeszcze jeden krok: potwierdź swój adres e-mail. Link jest ważny 7 dni.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f5f9;"><tr><td align="center" style="padding:28px 12px;">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e7e8f0;border-radius:12px;overflow:hidden;">
<tr><td style="height:4px;line-height:4px;font-size:4px;background:#5b54d6;">&nbsp;</td></tr>
<tr><td style="padding:24px 28px;background:#0b1120;">
<div style="font-size:25px;font-weight:700;letter-spacing:-0.6px;color:#ffffff;">AI <span style="color:#8fa6c9;">Xperts</span></div>
<div style="margin-top:8px;font-size:12px;line-height:1.5;color:#c2c9da;">Wspólnie z Digital Xperts</div>
</td></tr>
<tr><td style="padding:27px 28px 24px;background:#f5f5fd;border-bottom:1px solid #e7e8f0;">
<div style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1.4px;color:#5b54d6;">NEWSLETTER · POTWIERDZENIE ADRESU</div>
<h1 style="margin:0;font-size:27px;line-height:1.3;letter-spacing:-0.5px;color:#12141c;">Jeszcze jeden krok</h1>
<p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:#666b81;">Potwierdź swój adres e-mail.</p>
</td></tr>
<tr><td style="padding:28px;">
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#303649;">Dziękujemy za zapis do newslettera AiXperts i Digital Xperts.</p>
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#303649;">Otwórz stronę przyciskiem poniżej, a następnie potwierdź zapis. Dzięki temu wiemy, że adres należy do Ciebie.</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0 2px;"><tr><td bgcolor="#5b54d6" style="border-radius:9px;">
<a href="${escapeHtml(confirm)}" style="display:inline-block;padding:15px 24px;font-size:15px;font-weight:700;line-height:1.4;color:#ffffff;text-decoration:none;mso-padding-alt:15px 24px;">Potwierdź newsletter &nbsp; →</a>
</td></tr></table>
<p style="margin:14px 0 26px;font-size:12px;line-height:1.6;color:#666b81;">Link potwierdzenia jest ważny przez 7 dni.</p>
${bonus?`<p style="margin:0 0 18px;padding:14px 16px;background:#f5f5fd;border-radius:10px;font-size:14px;line-height:1.65;color:#303649;"><strong>Bonus dla zapisanych:</strong> ${escapeHtml(bonus.opis)} w jednym pliku. Po potwierdzeniu pobierzesz go <a href="${escapeHtml(bonus.url)}" style="color:#5b54d6;text-decoration:underline;">tym linkiem</a>. Link działa też później, również po wypisie.</p>`:''}
<p style="margin:0 0 18px;font-size:13px;line-height:1.7;color:#50566b;">Nie prosisz o ten newsletter? Zignoruj wiadomość. Jeśli wybrano również SMS, potwierdzenie numeru odbywa się osobno.</p>
</td></tr>
<tr><td style="padding:20px 28px;background:#f5f6fb;border-top:1px solid #e7e8f0;">
<p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:#50566b;font-weight:700;">AiXperts · Digital Xperts</p>
<p style="margin:0 0 12px;font-size:12px;line-height:1.65;color:#6b7280;">Otrzymujesz tę wiadomość w związku z prośbą o zapis do newslettera.</p>
<p style="margin:0;font-size:13px;line-height:1.7;"><a href="${escapeHtml(unsubscribe)}" style="color:#5b54d6;text-decoration:underline;">Wypis i wybór kanałów</a></p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`
  };
}

export function mailMimeBody(text,html) {
  const encode=t=>Buffer.from(t,'utf8').toString('base64').replace(/(.{76})/g,'$1\r\n');
  if(typeof html!=='string'||html==='')return {headers:['Content-Type: text/plain; charset=utf-8','Content-Transfer-Encoding: base64'],body:encode(text)};
  const boundary='aix_alternative_'+randomBytes(18).toString('hex');
  const part=(type,value)=>`--${boundary}\r\nContent-Type: ${type}; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${encode(value)}\r\n`;
  return {headers:[`Content-Type: multipart/alternative; boundary="${boundary}"`],body:part('text/plain',text)+part('text/html',html)+`--${boundary}--\r\n`};
}

// Maile katalogu skille.aixperts.pl: wygląd strony (granat, niebieski akcent, jasne panele).
// Tabele i style w linii, bo klienci poczty (Outlook, Gmail) nie czytają arkuszy.
const K={ink:'#0d2340',ink2:'#3b4d68',muted:'#56657c',accent:'#005eff',accentInk:'#0047c2',panel:'#eef3fd',line:'#dde5f1',bg:'#f3f6fb',stopka:'#f7f9fe'};
const FONT="'Segoe UI',Helvetica,Arial,sans-serif";
const akapit=(t,s='')=>`<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${K.ink2};${s}">${escapeHtml(t)}</p>`;
const drobny=t=>`<p style="margin:8px 0 0;font-size:13px;line-height:1.6;color:${K.muted};">${t}</p>`;
const przycisk=(tekst,url)=>`<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:8px 0 0;"><tr><td bgcolor="${K.accent}" style="border-radius:10px;">
<a href="${escapeHtml(url)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:16px;font-weight:700;line-height:1.3;color:#ffffff;text-decoration:none;border-radius:10px;mso-padding-alt:14px 26px;">${escapeHtml(tekst)}</a>
</td></tr></table>`;
const naglowekSekcji=t=>`<div style="margin:28px 0 12px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${K.muted};">${escapeHtml(t)}</div>`;
// Kroki: [tytuł, dopisek?]; numer w kółku jak na stronie katalogu.
const kroki=lista=>`<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${lista.map(([t,d],i)=>`<tr><td valign="top" width="36" style="padding:0 0 12px;"><div style="width:26px;height:26px;line-height:26px;border-radius:13px;background:${K.panel};color:${K.accentInk};font-size:13px;font-weight:700;text-align:center;">${i+1}</div></td><td valign="top" style="padding:3px 0 12px;font-size:15px;line-height:1.55;color:${K.ink};">${escapeHtml(t)}${d?`<br><span style="font-size:14px;color:${K.muted};">${escapeHtml(d)}</span>`:''}</td></tr>`).join('')}</table>`;
const skroc=t=>t.length>220?t.slice(0,t.lastIndexOf(' ',217))+'…':t;
const kartaSkilla=({nazwa,wersja,skrot,url,etykieta,opis})=>`<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:0 0 20px;background:${K.panel};border:1px solid ${K.line};border-radius:12px;"><tr><td style="padding:16px 18px;">
${etykieta?`<div style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:${K.accentInk};">${escapeHtml(etykieta)}</div>`:''}${nazwa?`<div style="font-size:17px;font-weight:700;line-height:1.4;color:${K.ink};">${url?`<a href="${escapeHtml(url)}" style="color:${K.ink};text-decoration:none;">${escapeHtml(nazwa)}</a>`:escapeHtml(nazwa)}${wersja?` <span style="font-size:13px;font-weight:600;color:${K.muted};white-space:nowrap;">wersja ${escapeHtml(wersja)}</span>`:''}</div>`:''}
${opis?`<div style="font-size:15px;line-height:1.6;color:${K.ink};">${escapeHtml(opis)}</div>`:""}${skrot?`<div style="margin-top:6px;font-size:14px;line-height:1.55;color:${K.muted};">${escapeHtml(skroc(skrot))}</div>`:''}
</td></tr></table>`;
const ramka=t=>`<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:22px 0 4px;"><tr><td style="padding:12px 16px;border-left:3px solid ${K.accent};background:${K.stopka};font-size:14px;line-height:1.6;color:${K.ink2};">${t}</td></tr></table>`;
const link=(t,url)=>`<a href="${escapeHtml(url)}" style="color:${K.accentInk};text-decoration:underline;">${escapeHtml(t)}</a>`;

// Wspólny układ: logo, karta z nadtytułem, tytułem i treścią (już w HTML), stopka z powodem wiadomości i linkami.
export function ukladMaila({baza,nazwaSerwisu,zajawka,nadtytul,tytul,tresc,powod,linkiStopki=[]}) {
  return `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${escapeHtml(tytul)}</title></head>
<body style="margin:0;padding:0;background:${K.bg};font-family:${FONT};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(zajawka)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${K.bg};"><tr><td align="center" style="padding:28px 12px;">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;">
<tr><td style="padding:0 4px 16px;"><a href="${escapeHtml(baza)}/" style="text-decoration:none;color:${K.ink};"><table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
<td valign="middle" style="padding-right:10px;"><img src="${escapeHtml(baza)}/ikona.png" width="36" height="36" alt="" style="display:block;border:0;border-radius:9px;"></td>
<td valign="middle" style="font-family:${FONT};"><div style="font-size:16px;font-weight:800;line-height:1.2;color:${K.ink};">${escapeHtml(nazwaSerwisu)}</div><div style="font-size:12px;line-height:1.3;color:${K.muted};">AiXperts</div></td>
</tr></table></a></td></tr>
<tr><td style="background:#ffffff;border:1px solid ${K.line};border-radius:14px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
<tr><td style="height:4px;line-height:4px;font-size:4px;background:${K.accent};border-radius:13px 13px 0 0;">&nbsp;</td></tr>
<tr><td style="padding:26px 30px 28px;font-family:${FONT};">
<div style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${K.accentInk};">${escapeHtml(nadtytul)}</div>
<h1 style="margin:0 0 18px;font-size:26px;line-height:1.25;letter-spacing:-0.4px;font-weight:800;color:${K.ink};">${escapeHtml(tytul)}</h1>
${tresc}
</td></tr>
<tr><td style="padding:18px 30px 22px;background:${K.stopka};border-top:1px solid ${K.line};border-radius:0 0 13px 13px;font-family:${FONT};">
<p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:${K.muted};">${escapeHtml(powod)}</p>
<p style="margin:0;font-size:13px;line-height:1.8;">${[...linkiStopki,{tekst:'skille.aixperts.pl',url:baza+'/'}].map(l=>link(l.tekst,l.url)).join(' &nbsp;·&nbsp; ')}</p>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:16px 4px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${K.muted};">${escapeHtml(nazwaSerwisu)}: darmowe skille AI pod polskie realia. Wiadomość wysłana automatycznie, odpowiedź trafi do zespołu AiXperts.</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
}

const INSTALACJA=[['Pobierz plik .skill'],['Wgraj go w Claude albo ChatGPT','Claude: Ustawienia → Umiejętności → Prześlij umiejętność. ChatGPT: Skills → Upload from your computer (plan Business lub wyższy).'],['Otwórz nową rozmowę i opisz, czego potrzebujesz','Skill uruchomi się sam.']];

// Odmiana: 2-4 skille (bez 12-14), poza tym skilli.
export const komplet=n=>`wszystkie ${n} ${n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'skille':'skilli'}`;


export function htmlPaczki({baza,nazwaSerwisu,domena,skill,pobierz,trial,wypisWersji}) {
  return ukladMaila({baza,nazwaSerwisu,zajawka:`Link do pobrania skilla „${skill.nazwa}” i instalacja w 3 krokach.`,
    nadtytul:trial?'Paczka do pobrania · wersja trialowa':'Paczka do pobrania',tytul:'Twój skill jest gotowy',
    tresc:akapit(`Ktoś (mamy nadzieję, że Ty) poprosił na ${domena} o ten skill:`)
      +kartaSkilla({nazwa:skill.nazwa+(trial?' (trial)':''),wersja:skill.wersja,skrot:skill.skrot,url:`${baza}/skill/${skill.id}/`})
      +przycisk('Pobierz skill',pobierz)+drobny('Link jest Twój i działa też przy ponownym pobraniu.')
      +naglowekSekcji('Jak zainstalować')+kroki(INSTALACJA)
      +(trial?ramka(`To wersja trialowa płatnego skilla. Pełna wersja i cennik: ${link('karta skilla',`${baza}/skill/${skill.id}/`)}.`):'')
      +(wypisWersji?ramka(`<b style="color:${K.ink};">Powiadomienia o nowej wersji są włączone.</b> Napiszemy tylko wtedy, gdy wyjdzie nowa wersja tego skilla. Zaczną działać po pierwszym pobraniu z linku wyżej. ${link('Wyłącz powiadomienia',wypisWersji)}`):'')
      +drobny('Jeśli to nie Ty prosiłeś o paczkę, zignoruj tę wiadomość.'),
    powod:'Dostajesz tę wiadomość, bo na stronie katalogu poproszono o paczkę na ten adres.',
    linkiStopki:wypisWersji?[{tekst:'Wyłącz powiadomienia o wersjach',url:wypisWersji}]:[]});
}

export function htmlNowejWersji({baza,nazwaSerwisu,skill,data,pobierz,wypis}) {
  return ukladMaila({baza,nazwaSerwisu,zajawka:`${skill.nazwa}: wersja ${skill.wersja}.${skill.zmiany?' '+skill.zmiany:''}`,
    nadtytul:'Nowa wersja skilla',tytul:`${skill.nazwa}: wersja ${skill.wersja}`,
    tresc:akapit(`Wyszła nowa wersja skilla${data?` (${data})`:''}. Piszemy, bo przy pobraniu zaznaczono prośbę o taką wiadomość.`)
      +(skill.zmiany?kartaSkilla({etykieta:'Co nowego',opis:skill.zmiany}):'')
      +przycisk(`Pobierz wersję ${skill.wersja}`,pobierz)+drobny('Twój link zawsze daje najnowszą wersję.')
      +naglowekSekcji('Jak podmienić')+kroki([['Usuń starą wersję skilla','Claude: Ustawienia → Umiejętności. ChatGPT: Skills.'],['Wgraj nowy plik w tym samym miejscu'],['Otwórz nową rozmowę']])
      +drobny(`Opis skilla: ${link('karta na skille.aixperts.pl',`${baza}/skill/${skill.id}/`)}`),
    powod:'Dostajesz tę wiadomość, bo przy pobraniu tego skilla poproszono o powiadomienie o nowej wersji. Piszemy tylko o tym skillu, bez reklam.',
    linkiStopki:[{tekst:'Nie chcę więcej wiadomości o tym skillu',url:wypis}]});
}

export function htmlPotwierdzenia({baza,nazwaSerwisu,domena,potwierdz,newsletter,marketing}) {
  return ukladMaila({baza,nazwaSerwisu,zajawka:newsletter?'Potwierdź adres, a dopiszemy Cię do listy.':'Potwierdź adres, a wyślemy Twój zestaw skilli.',
    nadtytul:newsletter?'Newsletter · potwierdzenie adresu':'Test doboru · potwierdzenie adresu',tytul:'Potwierdź swój adres',
    tresc:akapit(newsletter?`Ktoś (mamy nadzieję, że Ty) zapisał ten adres na newsletter „${nazwaSerwisu}” na ${domena}.`:`Ktoś (mamy nadzieję, że Ty) poprosił o zestaw skilli AI dobrany w teście na ${domena}.`)
      +przycisk(newsletter?'Potwierdzam zapis':'Potwierdź i wyślij zestaw',potwierdz)
      +drobny(newsletter?'Na otwartej stronie naciśnij jeszcze przycisk potwierdzenia, wtedy dopiszemy Cię do listy.':'Na otwartej stronie naciśnij jeszcze przycisk potwierdzenia, wtedy wyślemy zestaw od razu.')
      +ramka(marketing?'Po potwierdzeniu zapiszemy Cię także na wybrany newsletter AiXperts. Wypis jest w każdej wiadomości.':'Potwierdzasz wyłącznie wysłanie wyniku testu. Nie zapisujemy Cię do newslettera.')
      +drobny('Jeśli to nie Ty, zignoruj tę wiadomość. Bez potwierdzenia nie wyślemy nic więcej i nie zapiszemy Cię na żadną listę.'),
    powod:'Dostajesz tę wiadomość, bo ktoś podał ten adres w formularzu katalogu.'});
}

export function htmlZestawu({baza,nazwaSerwisu,skille,premium,wypis}) {
  return ukladMaila({baza,nazwaSerwisu,zajawka:`Twój zestaw: ${skille.map(s=>s.nazwa).join(', ')}.`,
    nadtytul:'Wynik testu doboru',tytul:'Twój zestaw skilli AI',
    tresc:akapit('Oto skille dobrane na podstawie Twoich odpowiedzi. Każdy pobierzesz ze swojej karty w katalogu.')
      +skille.map(s=>kartaSkilla({nazwa:s.nazwa,skrot:s.skrot+(s.gotowy?'':' (w przygotowaniu)'),url:`${baza}/skill/${s.id}/`})).join('')
      +(premium?naglowekSekcji('Poza darmowym zestawem')+akapit('Twoje odpowiedzi wskazują też na jedną specjalizację. Mamy do niej płatny skill, zamawiany jako licencja:')
        +kartaSkilla({nazwa:premium.nazwa+(premium.cena?` (${premium.cena})`:''),skrot:premium.skrot,url:`${baza}/skill/${premium.id}/`})
        +(premium.trial?drobny('Na jego karcie możesz najpierw bezpłatnie pobrać wersję trial.'):''):'')
      +naglowekSekcji('Jak zainstalować')+kroki([['Wejdź na kartę skilla i pobierz plik .skill'],...INSTALACJA.slice(1)])
      +(wypis?ramka(`Będziemy pisać o nowościach w katalogu, a od czasu do czasu o naszych szkoleniach i usługach. ${link('Wypisz mnie',wypis)}`):''),
    powod:wypis?'Dostajesz tę wiadomość, bo potwierdzono prośbę o wynik testu i zapis na newsletter.':'To zamówiony wynik testu. Ta prośba nie zapisuje Cię do newslettera.',
    linkiStopki:wypis?[{tekst:'Wypisz mnie',url:wypis}]:[]});
}
