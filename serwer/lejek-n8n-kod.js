const fs = require('fs');
const TRYB = 'live';
const CUTOFF = '2026-08-12';
const H_INVITE = 48 * 3600e3;
const H_OFFER  = 24 * 3600e3;
const H_FALL   = 72 * 3600e3;
const H_TRIAL  = 48 * 3600e3;
const H_PORZUC = 48 * 3600e3;
const PODGLAD_DO = 'admin@aixperts.pl';
const now = Date.now();

// ---- zapisy.jsonl: zapisy z testu, wypisy, prosby o paczki i pobrania ----
let stan = {};      // email -> { token, confirmedAt, unsub }
let pobrania = {};  // email -> { token, darmowe: [{skill,kiedy}], triale: [{skill,kiedy}] }
try {
  fs.readFileSync('/katalog/zapisy.jsonl', 'utf8').split('\n').filter(Boolean).forEach(function (l) {
    let r; try { r = JSON.parse(l); } catch (e) { return; }
    if (!r.email) return;
    if (!stan[r.email]) stan[r.email] = { token: null, confirmedAt: null, unsub: false };
    if (r.typ === 'zapis') stan[r.email].token = r.token || stan[r.email].token;
    else if (r.typ === 'potwierdzenie') stan[r.email].confirmedAt = r.kiedy;
    else if (r.typ === 'wypisanie') stan[r.email].unsub = true;
    else if (r.typ === 'pobranie-prosba') {
      (pobrania[r.email] = pobrania[r.email] || { token: null, darmowe: [], triale: [] }).token = r.token;
    } else if (r.typ === 'pobranie' && r.skill) {
      const p0 = (pobrania[r.email] = pobrania[r.email] || { token: null, darmowe: [], triale: [] });
      (/-trial$/.test(r.skill) ? p0.triale : p0.darmowe).push({ skill: r.skill, kiedy: r.kiedy });
    }
  });
} catch (e) { return [{ json: { to: PODGLAD_DO, subject: '[Lejek] BLAD odczytu dziennika', html: e.message, text: e.message } }]; }

let feedback = {};
try {
  fs.readFileSync('/katalog/feedback.jsonl', 'utf8').split('\n').filter(Boolean).forEach(function (l) {
    let r; try { r = JSON.parse(l); } catch (e) { return; }
    if (r.email) feedback[r.email] = r;
  });
} catch (e) {}

// ---- zamowienia.jsonl serwera licencji: porzucone i wykluczenie kupujacych ----
let zamowienia = {}; // email -> { kupil, otwarte: {id,produkt,pakiet,kiedy} | null }
try {
  const wgId = {};
  fs.readFileSync('/licencje/zamowienia.jsonl', 'utf8').split('\n').filter(Boolean).forEach(function (l) {
    let r; try { r = JSON.parse(l); } catch (e) { return; }
    if (r.typ === 'zamowienie') wgId[r.id] = r;
    else if (r.typ === 'zamowienie-usuniete') delete wgId[r.id];
    else if ((r.typ === 'zamowienie-oplacone' || r.typ === 'zamowienie-zrealizowane') && wgId[r.id]) wgId[r.id].zamkniete = true;
  });
  for (const id in wgId) {
    const z = wgId[id];
    const e = (zamowienia[z.email] = zamowienia[z.email] || { kupil: false, otwarte: null });
    if (z.zamkniete) { e.kupil = true; e.otwarte = null; }
    else if (!e.kupil && (!e.otwarte || z.kiedy > e.otwarte.kiedy)) {
      e.otwarte = { id: z.id, produkt: z.produkt, pakiet: z.pakiet, kiedy: z.kiedy };
    }
  }
} catch (e) {}

const LOG = TRYB === 'podglad' ? '/lejek/podglad-log.jsonl' : '/lejek/wyslane.jsonl';
let etapy = {};
try {
  fs.readFileSync(LOG, 'utf8').split('\n').filter(Boolean).forEach(function (x) {
    try { const r = JSON.parse(x); (etapy[r.email] = etapy[r.email] || {})[r.etap] = r.kiedy; } catch (e) {}
  });
} catch (e) {}

function esc(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
const cutoffTs = new Date(CUTOFF + 'T00:00:00Z').getTime();
const link = function (t) { return 'https://aixperts.pl/ankieta-feedback/?t=' + t; };
const kontakt = function (t, skad) { return 'https://aixperts.pl/popros-o-kontakt/?t=' + t + '&skad=' + skad; };
const wypisU = function (t) { return 'https://skille.aixperts.pl/api/wypisz?t=' + t; };

function przycisk(url, label) {
  return '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0;"><tr><td style="border-radius:9px;background:#5B54D6;">'
    + '<a href="' + url + '" style="display:inline-block;padding:13px 30px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:9px;">' + label + '</a>'
    + '</td></tr></table>';
}
function koperta(trescHtml, token, bezWypisu) {
  const stopka = bezWypisu
    ? 'Skille po polsku, katalog AI Xperts. To jednorazowe przypomnienie o rozpoczętym zamówieniu.'
    : 'Skille po polsku, katalog AI Xperts.<br>Nie chcesz takich wiadomości? <a href="' + wypisU(token) + '" style="color:#6b7280;">Wypisz się jednym kliknięciem</a>.';
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
    + '<body style="margin:0;padding:0;background:#f4f5f9;">'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f9;padding:24px 12px;"><tr><td align="center">'
    + '<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7e8f0;">'
    + '<tr><td style="height:4px;background:#5B54D6;font-size:0;line-height:0;">&nbsp;</td></tr>'
    + '<tr><td style="background:#0b1120;padding:18px 28px;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#ffffff;">AI <span style="color:#8fa6c9;">Xperts</span></td></tr>'
    + '<tr><td style="padding:28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.62;color:#1a2030;">' + trescHtml + '</td></tr>'
    + '<tr><td style="padding:18px 28px;background:#f5f6fb;border-top:1px solid #e7e8f0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;color:#6b7280;">'
    + stopka
    + '</td></tr></table></td></tr></table></body></html>';
}
const p = function (s) { return '<p style="margin:0 0 14px;">' + s + '</p>'; };
const naglowek = function (s) { return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;line-height:1.28;color:#12141c;margin:0 0 16px;">' + s + '</div>'; };

function tresc(etap, s, fb, ctx) {
  const t = s.token;
  const podpisSkille = p('Czytamy każdą odpowiedź. Dzięki!') + p('Zespół Skille po polsku');
  const podpisAX = p('Zespół AI Xperts');
  if (etap === 'trial') {
    const oferta = 'https://skille.aixperts.pl/skill/' + ctx.skill + '/';
    const temat = 'Jak poszło z wersją trialową?';
    const html = koperta(
      naglowek(temat) +
      p('Cześć,') +
      p('parę dni temu pobrałeś/aś <b>wersję trialową</b> płatnego skilla z naszego katalogu. Ciekawi nas, czy zdążyłeś/aś ją wypróbować.') +
      p('Trial celowo robi tylko wycinek. Pełna wersja to komplet: wszystkie tryby, szablony i mechanizmy, plus <b>rok aktualizacji</b> w cenie.') +
      p('Do końca miesiąca kod <b>TRIAL10</b> daje 10% zniżki przy zamówieniu.') +
      przycisk(oferta, 'Zobacz pełną wersję i pakiety') +
      p('Masz pytanie o to, czy pełna wersja pokryje Twój przypadek? Po prostu odpisz na tego maila.') + podpisAX, t);
    const text = 'Cześć,\n\nparę dni temu pobrałeś/aś wersję trialową płatnego skilla z naszego katalogu. Ciekawi nas, czy zdążyłeś/aś ją wypróbować.\n\nTrial celowo robi tylko wycinek. Pełna wersja to komplet: wszystkie tryby, szablony i mechanizmy, plus rok aktualizacji w cenie.\n\nKod TRIAL10 daje 10% zniżki przy zamówieniu.\nPełna wersja i pakiety: ' + oferta + '\n\nMasz pytanie? Odpisz na tego maila.\nZespół AI Xperts\n\nWypis: ' + wypisU(t);
    return { temat: temat, html: html, text: text };
  }
  if (etap === 'porzucone') {
    const wroc = 'https://licencje.aixperts.pl/zamow/' + ctx.produkt + (ctx.pakiet ? '?pakiet=' + ctx.pakiet : '');
    const temat = 'Twoje zamówienie ' + ctx.id + ' czeka dokończone w 2 minuty';
    const html = koperta(
      naglowek('Twoje zamówienie czeka') +
      p('Cześć,') +
      p('zacząłeś/aś zamawiać skill <b>' + esc(ctx.produkt) + '</b> (zamówienie ' + esc(ctx.id) + '), ale płatność nie została dokończona.') +
      p('Nic nie przepadło: dokończysz w 2 minuty, a klucz licencji i paczka przyjdą mailem od razu po opłacie.') +
      przycisk(wroc, 'Dokończ zamówienie') +
      p('Jeśli coś poszło nie tak przy płatności albo masz pytanie, po prostu odpisz na tego maila.') + podpisAX, t, true);
    const text = 'Cześć,\n\nzacząłeś/aś zamawiać skill ' + ctx.produkt + ' (zamówienie ' + ctx.id + '), ale płatność nie została dokończona.\n\nDokończysz w 2 minuty: ' + wroc + '\nKlucz licencji i paczka przyjdą mailem od razu po opłacie.\n\nPytania? Odpisz na tego maila.\nZespół AI Xperts';
    return { temat: temat, html: html, text: text };
  }
  if (etap === 'ankieta') {
    const temat = 'Jak poszło z pobranymi skillami?';
    const html = koperta(
      naglowek(temat) +
      p('Cześć,') +
      p('parę dni temu pobrałeś/aś skille z naszego katalogu. Mamy nadzieję, że się przydały.') +
      p('Mamy do Ciebie jedno pytanie, które realnie wpływa na to, co budujemy dalej: <b>czego jeszcze potrzebujesz? Jakiego skilla brakuje?</b> Odpowiedź zajmie 2 minuty.') +
      przycisk(link(t), 'Wypełnij ankietę') + podpisSkille, t);
    const text = 'Cześć,\n\nparę dni temu pobrałeś/aś skille z naszego katalogu. Mamy nadzieję, że się przydały.\n\nMamy do Ciebie jedno pytanie: czego jeszcze potrzebujesz? Jakiego skilla brakuje? Odpowiedź zajmie 2 minuty:\n' + link(t) + '\n\nCzytamy każdą odpowiedź. Dzięki!\nZespół Skille po polsku\n\nWypis: ' + wypisU(t);
    return { temat: temat, html: html, text: text };
  }
  if (etap === 'ofertaA') {
    const potrzeba = (fb.brakuje || '').trim();
    const temat = 'To, czego szukasz, możemy zbudować';
    const html = koperta(
      naglowek(temat) +
      p('Cześć,') +
      p('dzięki za wypełnienie ankiety. Napisałeś/aś, że przydałoby Ci się: „' + esc(potrzeba) + '”.') +
      p('Są dwie drogi, żeby to mieć:') +
      '<ol style="margin:0 0 14px;padding-left:20px;"><li style="margin-bottom:8px;"><b>Zrobimy ten skill pod Ciebie</b>, dokładnie pod Twój sposób pracy. Wycena indywidualna, zależnie od zakresu.</li><li><b>Nauczysz się budować takie rzeczy sam/a</b> na <a href="https://aixperts.pl/szkolenia/" style="color:#5B54D6;">warsztacie „Zbuduj z AI”</a> (3 h, do 5 osób, Claude albo ChatGPT). Wychodzisz z działającym narzędziem.</li></ol>' +
      p('Którą wolisz? Odpisz na tego maila albo kliknij:') +
      przycisk(kontakt(t, 'oferta-A'), 'Poproś o kontakt') + podpisAX, t);
    const text = 'Cześć,\n\ndzięki za wypełnienie ankiety. Napisałeś/aś, że przydałoby Ci się: „' + potrzeba + '”.\n\nSą dwie drogi:\n1. Zrobimy ten skill pod Ciebie. Wycena indywidualna, zależnie od zakresu.\n2. Nauczysz się budować takie rzeczy sam/a na warsztacie „Zbuduj z AI” (3 h, do 5 osób, Claude albo ChatGPT). Pakiety i ceny: https://aixperts.pl/szkolenia/\n\nKtórą wolisz? Odpisz na tego maila albo poproś o kontakt:\n' + kontakt(t, 'oferta-A') + '\n\nZespół AI Xperts\n\nWypis: ' + wypisU(t);
    return { temat: temat, html: html, text: text };
  }
  if (etap === 'ofertaB') {
    const temat = 'Dzięki za feedback. A gdybyś chciał/a umieć to sam/a?';
    const html = koperta(
      naglowek(temat) +
      p('Cześć,') +
      p('dzięki za odpowiedź w ankiecie. Bardzo nam pomaga.') +
      p('Jeśli kiedyś zechcesz nie tylko pobierać gotowe skille, ale <b>budować własne narzędzia z AI</b> pod swoją firmę, mamy na to warsztat „Zbuduj z AI” (Claude albo ChatGPT, do wyboru). W 3 godziny, bez znajomości programowania, wychodzisz z czymś, co realnie działa.') +
      przycisk(kontakt(t, 'oferta-B'), 'Poproś o kontakt') +
      p('Bez presji. Chcieliśmy tylko, żebyś wiedział/a, że jest taka możliwość. <a href="https://aixperts.pl/szkolenia/" style="color:#5B54D6;">Zobacz szczegóły warsztatu</a>.') +
      podpisAX, t);
    const text = 'Cześć,\n\ndzięki za odpowiedź w ankiecie. Bardzo nam pomaga.\n\nJeśli kiedyś zechcesz budować własne narzędzia z AI pod swoją firmę, mamy warsztat „Zbuduj z AI” (Claude albo ChatGPT, do wyboru). W 3 godziny, bez programowania, wychodzisz z czymś, co realnie działa.\n\nPoproś o kontakt: ' + kontakt(t, 'oferta-B') + '\nSzczegóły: https://aixperts.pl/szkolenia/\n\nBez presji.\nZespół AI Xperts\n\nWypis: ' + wypisU(t);
    return { temat: temat, html: html, text: text };
  }
  const temat = 'Gotowe skille to dobry początek. Zbuduj własne.';
  const html = koperta(
    naglowek(temat) +
    p('Cześć,') +
    p('pobrałeś/aś skille z naszego katalogu. Następny krok to umieć budować <b>własne</b> narzędzia z AI, pod swoją firmę.') +
    p('Na warsztacie „Zbuduj z AI” Twój zespół w 3 godziny tworzy realnie działającą rzecz: stronę, kalkulator albo wewnętrzne narzędzie, wyłącznie przez rozmowę z AI (Claude albo ChatGPT, do wyboru). Do 5 osób, bez programowania. Warsztat 3 h to 3 900 zł netto; wersja 6 h to 6 900 zł netto.') +
    przycisk(kontakt(t, 'fallback'), 'Poproś o kontakt') +
    p('Wolisz od razu? Zadzwoń: +48 737 748 919.') + podpisAX, t);
  const text = 'Cześć,\n\npobrałeś/aś skille z naszego katalogu. Następny krok to umieć budować własne narzędzia z AI, pod swoją firmę.\n\nNa warsztacie „Zbuduj z AI” Twój zespół w 3 godziny tworzy realnie działającą rzecz, wyłącznie przez rozmowę z AI (Claude albo ChatGPT). Do 5 osób, bez programowania. Warsztat 3 h to 3 900 zł netto; wersja 6 h to 6 900 zł netto.\n\nPoproś o kontakt: ' + kontakt(t, 'fallback') + '\nWolisz od razu? Zadzwoń: +48 737 748 919.\n\nZespół AI Xperts\n\nWypis: ' + wypisU(t);
  return { temat: temat, html: html, text: text };
}

// ---- kwalifikacja: jedna akcja na adres na przebieg ----
const items = [];
const doZapisu = [];
const adresy = {};
for (const e in stan) adresy[e] = true;
for (const e in pobrania) adresy[e] = true;
for (const e in zamowienia) adresy[e] = true;

for (const email in adresy) {
  const s = stan[email] || { token: null, confirmedAt: null, unsub: false };
  const pob = pobrania[email] || { token: null, darmowe: [], triale: [] };
  const zam = zamowienia[email] || { kupil: false, otwarte: null };
  const token = s.token || pob.token;
  if (s.unsub) continue;
  if (zam.kupil) continue; // klient: zadnych ofert z lejka
  const e = etapy[email] || {};
  const fb = feedback[email];
  let akcja = null, ctx = {};

  // 1. Porzucone zamowienie ma pierwszenstwo (najblizej pieniedzy).
  if (zam.otwarte && !e.porzucone) {
    if (now - new Date(zam.otwarte.kiedy).getTime() >= H_PORZUC) { akcja = 'porzucone'; ctx = zam.otwarte; }
  }
  // 2. Trial platnego skilla.
  if (!akcja && pob.triale.length && !e.trial && token) {
    const t0 = pob.triale[0];
    if (new Date(t0.kiedy).getTime() >= cutoffTs && now - new Date(t0.kiedy).getTime() >= H_TRIAL) {
      akcja = 'trial'; ctx = { skill: t0.skill.replace(/-trial$/, '') };
    }
  }
  // 3. Sciezka ankieta -> oferta -> fallback (zapis z testu ALBO pobranie darmowej paczki).
  if (!akcja && token) {
    let startTs = null;
    if (s.confirmedAt) startTs = new Date(s.confirmedAt).getTime();
    else if (pob.darmowe.length) startTs = new Date(pob.darmowe[0].kiedy).getTime();
    if (startTs !== null && startTs >= cutoffTs) {
      const invited = !!e.ankieta, offered = !!e.ofertaA || !!e.ofertaB, fellback = !!e.fallback;
      if (!invited) { if (now - startTs >= H_INVITE) akcja = 'ankieta'; }
      else if (fb && !offered) { if (now - new Date(fb.kiedy).getTime() >= H_OFFER) akcja = ((fb.brakuje || '').trim().length >= 12) ? 'ofertaA' : 'ofertaB'; }
      else if (!fb && !fellback && !offered) { if (now - new Date(e.ankieta).getTime() >= H_FALL) akcja = 'fallback'; }
    }
  }
  if (!akcja) continue;

  const tr = tresc(akcja, { token: token }, fb || {}, ctx);
  let to, subject, html, text;
  if (TRYB === 'podglad') {
    to = PODGLAD_DO;
    subject = '[PODGLAD ' + akcja + ' -> ' + email + '] ' + tr.temat;
    const baner = '<div style="background:#fff4e5;border:1px solid #f0b26b;border-radius:8px;padding:12px 16px;margin-bottom:18px;font-family:Arial,sans-serif;font-size:13px;color:#8a5a00;">TRYB PODGLĄDU. Ten mail poszedłby do: <b>' + esc(email) + '</b> (w trybie live trafi na adres subskrybenta).</div>';
    html = tr.html.replace('<tr><td style="padding:28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.62;color:#1a2030;">', '<tr><td style="padding:28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.62;color:#1a2030;">' + baner);
    text = 'TRYB PODGLĄDU. Poszedłby do: ' + email + '\n\n' + tr.text;
  } else { to = email; subject = tr.temat; html = tr.html; text = tr.text; }
  items.push({ json: { to: to, subject: subject, html: html, text: text } });
  doZapisu.push({ email: email, etap: akcja, tryb: TRYB, kiedy: new Date().toISOString() });
}
if (doZapisu.length) { try { fs.appendFileSync(LOG, doZapisu.map(function (x) { return JSON.stringify(x); }).join('\n') + '\n'); } catch (e) {} }
return items;
