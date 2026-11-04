// Presentation only: confirmation HTML and MIME alternatives; no transport or storage.
import {randomBytes} from 'node:crypto';
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function newsletterConfirmation({base,delivery}) {
  const confirm=base+'/api/subskrypcje/potwierdz?t='+delivery.confirmToken;
  const unsubscribe=base+'/api/subskrypcje/wypisz?t='+delivery.unsubscribeToken;
  return {
    temat:'Potwierdź newsletter AiXperts i Digital Xperts',
    tresc:`Potwierdź wybrany newsletter e-mail, otwierając link i naciskając przycisk:\n${confirm}\n\nWypis i wybór kanałów:\n${unsubscribe}\n\nJeśli nie prosiłeś o zapis, zignoruj wiadomość. Link potwierdzenia jest ważny 7 dni. Wybrany SMS czeka osobno na potwierdzenie numeru.`,
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
