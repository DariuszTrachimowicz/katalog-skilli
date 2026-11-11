#!/usr/bin/env node
// Usługa zapisów z testu doboru.
//
// Celowo bez frameworka i bez bazy danych. Lista adresowa katalogu to
// dopisywanie wierszy i sporadyczne czytanie całości, plik JSONL obsługuje
// to lepiej niż baza, którą trzeba utrzymywać, aktualizować i backupować
// osobno. Kopia zapasowa to skopiowanie jednego pliku.
//
// Uruchomienie: node serwer/zapisy.mjs
// W produkcji chodzi pod systemd, za nginx-em, tylko na localhost.

import { createServer } from "node:http";
import { createConnection } from "node:net";
import { connect as polaczTls } from "node:tls";
import { readFileSync, appendFileSync, existsSync, mkdirSync } from "node:fs";
import { randomBytes, timingSafeEqual, createHash, randomUUID } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {createSubscriptions, appendDurable, ORIGINS, TEXT as TEKST_ZGODY, VERSION as WERSJA_ZGODY} from './subskrypcje.mjs';
import {createEventInbox} from './crm-events.mjs';
import {newsletterConfirmation,mailMimeBody,htmlPaczki,htmlNowejWersji,htmlPotwierdzenia,htmlZestawu,komplet,escapeHtml} from './mail-design.mjs';
const MIESIACE = ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"];
const dataPl = (iso) => { const [r, m, d] = String(iso).split("-").map(Number); return r && m && d ? `${d} ${MIESIACE[m - 1]} ${r}` : String(iso); };
const WYGLAD = () => ({ baza: BAZA, nazwaSerwisu: cfg.nazwaSerwisu, domena: cfg.domena });
import {subscriptionPage,subscriptionForm,subscriptionResult,sendSubscriptionPage} from './subscription-pages.mjs';
import {odbiorcy,zmienione,wypisanyZWersji,TRESC_ZGODY_WERSJI,WERSJA_ZGODY_WERSJI} from './powiadomienia-wersji.mjs';
import {writeFileSync,renameSync} from 'node:fs';

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(KORZEN, "config.json"), "utf8"));
const C = cfg.zapisy;
// Nadpisania do testow lokalnych (produkcja: config.json bez zmian).
if (process.env.ZAPISY_PLIK) C.plikDanych = process.env.ZAPISY_PLIK;
if (process.env.ZAPISY_TRYB) C.wysylka = { ...C.wysylka, tryb: process.env.ZAPISY_TRYB };
if (process.env.ZAPISY_PORT) C.port = parseInt(process.env.ZAPISY_PORT, 10);
const BAZA = `https://${cfg.domena}`;
const BAZA_SUBSKRYPCJI = C.subskrypcjeBazaUrl || BAZA;

// Zachowujemy rzeczywisty wariant pokazany przy wyborze. Nie dopisujemy dowodów
// do historycznych zapisów, które nie zawierały takiej informacji.
const ZGODA_WERSJA = "2026-09-07";
const TRESCI_ZGOD = {
  "test-doboru": "Chcę też dostawać newsletter AiXperts z nowościami, szkoleniami i usługami (dobrowolne). Mogę wypisać się w każdej chwili.",
  newsletter: "Chcę dostawać newsletter AiXperts. Podany adres potwierdzę kliknięciem w link, mogę wypisać się w każdej chwili.",
  "pobranie-triala": "Chcę dostawać newsletter AiXperts (dobrowolne). Jako subskrybent dostaniesz kod rabatowy na wersję płatną.",
};
const dowodZgody = (zrodlo, udzielona, kiedy = new Date().toISOString()) => ({
  wersja: ZGODA_WERSJA, tresc: TRESCI_ZGOD[zrodlo], kiedy, zrodlo,
  udzielona: udzielona === true, kanal: "email",
});

const SKILLE = (() => {
  const p = join(KORZEN, "public", "dane", "skille.json");
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : [];
})();
const nazwaSkilla = (id) => SKILLE.find((s) => s.id === id) || { id, nazwa: id, skrot: "" };

// Paczki .skill NIE leza w public (nginx ich nie serwuje) - wydaje je ta usluga,
// wylacznie linkiem z maila. `paczki/` buduje build.mjs, `paczki-zewnetrzne/`
// to commitowane paczki spoza builda (np. triale platnych skilli).
const KATALOGI_PACZEK = [join(KORZEN, "paczki"), join(KORZEN, "paczki-zewnetrzne")];
function plikPaczki(id) {
  if (!/^[a-z0-9-]{1,64}$/.test(id)) return null;
  for (const kat of KATALOGI_PACZEK) {
    const p = join(kat, `${id}.skill`);
    if (existsSync(p)) return p;
  }
  return null;
}

mkdirSync(dirname(C.plikDanych), { recursive: true });
const DZIENNIK_MAILI = join(dirname(C.plikDanych), "wyslane-maile.log");
const subskrypcje = createSubscriptions(join(dirname(C.plikDanych), 'subskrypcje.jsonl'),{publicBase:BAZA_SUBSKRYPCJI});
const crmInbox=createEventInbox({dir:dirname(C.plikDanych),keyFile:process.env.AIX_CRM_EVENT_KEY_FILE||join(dirname(C.plikDanych),'crm-event.key')});

// Bonus dla zapisanych na newsletter: komplet wszystkich paczek (build.mjs). Każda paczka
// jest też osobno darmowa bez zgody; zachęta za zgodę to ryzyko oceny dobrowolności (EROD 05/2020 pkt 37, 46-54),
// przyjęte decyzją Darka 6.11.2026 (ocena w DOKUMENTACJA-PROJEKTU.md).
const KOMPLET = join(KORZEN, "paczki", "komplet-skilli.zip");
const liczbaKompletu = () => SKILLE.filter((s) => s.gotowy).length;

// Komplet skilli jest zachętą katalogu; zapis z Dewellux dotyczy innego produktu, więc bonusu nie proponujemy.
const zBonusem = (zrodlo) => zrodlo !== 'dewellux-newsletter' && existsSync(KOMPLET);
const blokBonusu = (confirmToken) => `<div class="note"><strong>Twój bonus:</strong> ${komplet(liczbaKompletu())} w jednym pliku ZIP. W środku osobne pliki .skill, każdy wgrywasz jak zwykle. Link działa także po wypisie.</div><a class="button" href="${BAZA}/api/komplet?t=${encodeURIComponent(confirmToken)}">Pobierz komplet skilli</a>`;

async function mailSubskrypcji(requestId) {
  const r=subskrypcje.reserveMail(requestId);
  if (!r) return;
  let accepted=false;
  try {
  // Link do bonusu jest w mailu potwierdzającym na stałe (zadziała dopiero po potwierdzeniu, także po wypisie).
  const bonus=zBonusem(r.source)?{url:`${BAZA}/api/komplet?t=${r.delivery.confirmToken}`,opis:komplet(liczbaKompletu())}:null;
  accepted=await wyslijMail({do:r.email,...newsletterConfirmation({base:BAZA_SUBSKRYPCJI,delivery:r.delivery,bonus})}); }
  finally { subskrypcje.finishMail(requestId,accepted); }
}
// Stan maila potwierdzającego dla interfejsu: wyslany, nieudany, niepewny (próba bez wyniku) albo brak.
// Wspólny rejestr nie ponawia potwierdzeń; przy nieudanym albo niepewnym strona proponuje zwykły formularz newslettera.
function stanPotwierdzenia(requestId) {
  const w = subskrypcje.rows().filter((x) => x.request_id === requestId);
  if (w.some((x) => x.type === "confirmation-mail-result" && x.accepted === true)) return "wyslany";
  if (w.some((x) => x.type === "confirmation-mail-result")) return "nieudany";
  return w.some((x) => x.type === "confirmation-mail-attempt") ? "niepewny" : "brak";
}

// Ta sama wersja arkuszy co na stronach z builda, bez niej wracający
// użytkownik dostaje stronę potwierdzenia ze starym CSS-em z cache.
const wersjaCss = (n) => {
  const p = join(KORZEN, "public", n);
  return existsSync(p) ? createHash("md5").update(readFileSync(p)).digest("hex").slice(0, 8) : "0";
};
const W_STYL = wersjaCss("styl.css");
const W_FONTY = wersjaCss("fonty.css");

/* ---------- przechowywanie ---------- */

function wczytaj() {
  if (!existsSync(C.plikDanych)) return [];
  return readFileSync(C.plikDanych, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter(Boolean);
}

const dopisz = (rekord) => appendDurable(C.plikDanych, rekord);

// Stan wyliczamy z pełnej historii: ostatni wpis dla danego adresu wygrywa.
// Dzięki temu plik jest dziennikiem zdarzeń, a nie stanem do nadpisywania -
// nic się nie gubi i widać, co się kiedy działo.
function stan() {
  const mapa = new Map();
  for (const r of wczytaj()) {
    if (r.typ === "zapis") mapa.set(r.email, { ...r, potwierdzony: false });
    else if (r.typ === "potwierdzenie" && mapa.has(r.email)) mapa.get(r.email).potwierdzony = true;
    else if (r.typ === "wypisanie") mapa.delete(r.email);
  }
  return mapa;
}

function znajdzPoTokenie(token) {
  for (const [email, r] of stan()) {
    if (r.token && bezpieczneRowne(r.token, token)) return { email, ...r };
  }
  const historia = wczytaj();
  for (const r of historia) {
    if (r.typ === "wynik-prosba" && r.token && bezpieczneRowne(r.token, token)) {
      return { ...r, potwierdzony: historia.some((x) => x.typ === "wynik-potwierdzenie" && x.token === r.token) };
    }
  }
  // Tokeny z prosb o paczke tez identyfikuja adres (wypis, feedback z ankiety).
  for (const r of wczytaj()) {
    if (r.typ === "pobranie-prosba" && r.token && bezpieczneRowne(r.token, token)) {
      return { email: r.email, token: r.token, wynik: [], potwierdzony: false };
    }
  }
  return null;
}

function bezpieczneRowne(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

/* ---------- limit zapytań ---------- */

const licznik = new Map();
function przekroczonyLimit(ip) {
  const teraz = Date.now();
  const okno = 3600_000;
  const lista = (licznik.get(ip) || []).filter((t) => teraz - t < okno);
  lista.push(teraz);
  licznik.set(ip, lista);
  if (licznik.size > 5000) licznik.clear(); // proste zabezpieczenie przed puchnięciem pamięci
  return lista.length > C.limitNaGodzine;
}

/* ---------- wysyłka ---------- */

// Minimalny klient SMTP (STARTTLS + AUTH PLAIN) na czystej bibliotece Node -
// dokładnie tyle protokołu, ile potrzebuje ta usługa, i ani linijki zależności.
// Obsługuje wyłącznie nasz przypadek: jeden odbiorca, tekst, UTF-8.
function smtpWyslij({ host, port, uzytkownik, haslo, adresNadawcy, nazwaNadawcy, adresat, temat, tresc, html }) {
  return new Promise((zrobione, blad) => {
    let gniazdo = createConnection(port, host);
    let zakonczone = false;
    const koniec = (e) => {
      if (zakonczone) return;
      zakonczone = true;
      try { gniazdo.destroy(); } catch {}
      e ? blad(e) : zrobione();
    };
    gniazdo.setTimeout(20_000, () => koniec(new Error("SMTP: przekroczony czas")));
    gniazdo.on("error", koniec);
    // Serwer zamyka połączenie bez odpowiedzi: bez tego obietnica wisiałaby bez końca.
    gniazdo.on("close", () => koniec(new Error("SMTP: serwer zamknął połączenie")));

    // Odpowiedź SMTP jest kompletna, gdy ostatnia linia zaczyna się od "XXX " -
    // wcześniejsze linie wieloliniowej odpowiedzi mają "XXX-".
    const odpowiedz = () =>
      new Promise((ok, zle) => {
        let dane = "";
        const naDane = (c) => {
          dane += c.toString("utf8");
          const linie = dane.split("\r\n").filter(Boolean);
          if (linie.length && /^\d{3} /.test(linie[linie.length - 1])) {
            gniazdo.off("data", naDane);
            ok({ kod: parseInt(linie[linie.length - 1], 10), tekst: dane });
          }
        };
        gniazdo.on("data", naDane);
        gniazdo.once("error", zle);
      });

    const komenda = async (cmd, oczekiwany) => {
      gniazdo.write(cmd + "\r\n");
      const o = await odpowiedz();
      if (o.kod !== oczekiwany) throw new Error(`SMTP: "${cmd.split(" ")[0]}" → ${o.tekst.trim().slice(0, 120)}`);
      return o;
    };

    // Nagłówki z polskimi znakami idą jako RFC 2047, treść jako base64 -
    // to zdejmuje wszystkie problemy 8-bitowych znaków w protokole.
    const slowo = (t) => (/[^\x20-\x7E]/.test(t) ? `=?UTF-8?B?${Buffer.from(t, "utf8").toString("base64")}?=` : t);
    const mime = mailMimeBody(tresc,html);
    const cialo = mime.body;
    const naglowki = [
      `From: ${slowo(nazwaNadawcy)} <${adresNadawcy}>`,
      `To: <${adresat}>`,
      `Subject: ${slowo(temat)}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${randomBytes(12).toString("hex")}@${cfg.domena}>`,
      "MIME-Version: 1.0",
      ...mime.headers,
    ].join("\r\n");

    (async () => {
      const powitanie = await odpowiedz();
      if (powitanie.kod !== 220) throw new Error(`SMTP: powitanie → ${powitanie.tekst.trim().slice(0, 120)}`);
      await komenda(`EHLO ${cfg.domena}`, 250);
      await komenda("STARTTLS", 220);

      // Podmiana gniazda na szyfrowane, dalsze komendy idą już w TLS.
      await new Promise((ok, zle) => {
        const tls = polaczTls({ socket: gniazdo, servername: host }, () => { gniazdo = tls; ok(); });
        tls.once("error", zle);
      });
      gniazdo.setTimeout(20_000, () => koniec(new Error("SMTP: przekroczony czas (TLS)")));
      gniazdo.on("error", koniec);
      gniazdo.on("close", () => koniec(new Error("SMTP: serwer zamknął połączenie (TLS)")));

      await komenda(`EHLO ${cfg.domena}`, 250);
      await komenda("AUTH PLAIN " + Buffer.from(`\0${uzytkownik}\0${haslo}`, "utf8").toString("base64"), 235);
      await komenda(`MAIL FROM:<${adresNadawcy}>`, 250);
      await komenda(`RCPT TO:<${adresat}>`, 250);
      await komenda("DATA", 354);
      await komenda(naglowki + "\r\n\r\n" + cialo + "\r\n.", 250);
      gniazdo.write("QUIT\r\n");
      koniec();
    })().catch(koniec);
  });
}

async function wyslijMail({ do: adresat, temat, tresc, html }) {
  const w = C.wysylka;

  if (w.tryb === "smtp") {
    const haslo = process.env[w.hasloZmienna || "SMTP_HASLO"];
    if (!haslo) { console.error("Wysyłka SMTP: brak hasła w zmiennej środowiskowej", w.hasloZmienna || "SMTP_HASLO"); return false; }
    const [, nazwa = cfg.nazwaSerwisu, adres] = w.nadawca.match(/^\s*(.*?)\s*<([^>]+)>\s*$/) || [null, cfg.nazwaSerwisu, w.nadawca];
    try {
      await smtpWyslij({
        host: w.host, port: w.port || 587, uzytkownik: w.uzytkownik, haslo,
        adresNadawcy: adres, nazwaNadawcy: nazwa, adresat, temat, tresc, html,
      });
      return true;
    } catch (e) {
      console.error("Wysyłka SMTP nieudana:", e.message);
      return false;
    }
  }

  if (w.tryb === "log") {
    appendFileSync(
      DZIENNIK_MAILI,
      `\n=== ${new Date().toISOString()} ===\nDo: ${adresat}\nTemat: ${temat}\n\n${tresc}\n`
    );
    console.log(`[log] mail do ${adresat}: ${temat}`);
    return true;
  }

  const odp = await fetch(w.url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: w.naglowekAutoryzacji },
    body: JSON.stringify({ from: w.nadawca, to: [adresat], subject: temat, text: tresc, ...(html ? {html} : {}) }),
  });
  if (!odp.ok) {
    console.error(`Wysyłka nieudana (${odp.status}):`, await odp.text().catch(() => ""));
    return false;
  }
  return true;
}

// Potwierdzony zapis zgłaszamy jako lead do naszego CRM (ten sam serwer, nie firma
// trzecia). Awaria CRM nie może zepsuć potwierdzenia, błąd tylko logujemy.
async function zglosDoCrm(rekord) {
  const crm = C.crm;
  if (!crm?.formularz) return;
  // Marker zrodla: n8n rozdziela to na newsletter (silnik) i odbicie do Perfexa
  // (grupa "Newsletter"). Test doboru i newsletter ida tym samym webhookiem,
  // rozroznione polem `zrodlo`.
  const newsletter = rekord.zrodlo === "newsletter";
  const opis = newsletter
    ? `Potwierdzony zapis do newslettera (${cfg.domena}).`
    : `Potwierdzony zapis z testu doboru (${cfg.domena}). Dobrane skille: ${
        (rekord.wynik || []).map((id) => nazwaSkilla(id).nazwa).join(", ") || "brak"
      }.${rekord.premium ? ` Dopasowanie premium (PŁATNY): ${nazwaSkilla(rekord.premium).nazwa}${nazwaSkilla(rekord.premium).cena ? `, ${nazwaSkilla(rekord.premium).cena}` : ""}.` : ""}`;
  const dane = new URLSearchParams({
    key: crm.formularz.split("/").pop(),
    name: rekord.nazwa || rekord.email,
    email: rekord.email,
    zrodlo: newsletter ? "newsletter" : "test-doboru",
    newsletter: newsletter ? "tak" : "nie",
    telefon: rekord.telefon || "",
    description: opis,
  });
  const odp = await fetch(crm.formularz, { method: "POST", body: dane, signal: AbortSignal.timeout(8000) });
  if (!odp.ok) throw new Error(`CRM odpowiedział ${odp.status}`);
}

const mailPotwierdzajacy = (token, zrodlo = "test", marketing = true) => {
  const newsletter = zrodlo === "newsletter";
  return {
  temat: newsletter ? "Potwierdź zapis na newsletter" : "Potwierdź zapis, zestaw umiejętności",
  tresc: `Cześć,

${newsletter
  ? `ktoś (mamy nadzieję, że Ty) zapisał ten adres na newsletter „${cfg.nazwaSerwisu}" na ${cfg.domena}.`
  : `ktoś (mamy nadzieję, że Ty) poprosił o zestaw umiejętności AI dobrany w teście na ${cfg.domena}.`}

Otwórz link i naciśnij przycisk, a ${newsletter ? "dopiszemy Cię do listy" : "wyślemy go od razu"}:
${BAZA}/api/potwierdz?t=${token}

Jeśli to nie Ty, po prostu zignoruj tę wiadomość. Bez potwierdzenia nie wyślemy nic więcej i nie zapiszemy Cię na żadną listę.
${marketing ? "\nPo potwierdzeniu zapiszemy Cię także na wybrany newsletter AiXperts. Wypis jest dostępny w każdej wiadomości." : "\nPotwierdzasz wyłącznie wysłanie wyniku testu. Nie zapisujemy Cię do newslettera."}

${cfg.nazwaSerwisu}
${BAZA}`,
  html: htmlPotwierdzenia({ ...WYGLAD(), potwierdz: `${BAZA}/api/potwierdz?t=${token}`, newsletter, marketing }),
  };
};

const mailZZestawem = (wynik, token, premium = null, marketing = true) => ({
  temat: "Twój zestaw umiejętności AI",
  html: htmlZestawu({ ...WYGLAD(), skille: wynik.map(nazwaSkilla), premium: premium && nazwaSkilla(premium).platny ? nazwaSkilla(premium) : null, wypis: marketing ? `${BAZA}/api/wypisz?t=${token}` : null }),
  tresc: `Oto zestaw dobrany na podstawie Twoich odpowiedzi.

${wynik
  .map((id, i) => {
    const s = nazwaSkilla(id);
    return `${i + 1}. ${s.nazwa}${s.gotowy ? "" : "  (w przygotowaniu)"}
   ${s.skrot}
   ${BAZA}/skill/${id}/`;
  })
  .join("\n\n")}
${(() => {
    // Dopasowanie premium: osobna sekcja, nigdy w numerowanej liście,
    // bez instrukcji pobierania (płatnego się nie pobiera, zamawia się licencję).
    if (!premium) return "";
    const s = nazwaSkilla(premium);
    if (!s.platny) return "";
    return `
POZA DARMOWYM ZESTAWEM

Twoje odpowiedzi wskazują też na jedną specjalizację. Mamy do niej płatny skill:

${s.nazwa}${s.cena ? ` (${s.cena})` : ""}
${s.skrot}
To płatny skill, nie pobiera się go jak pozycji wyżej; szczegóły i zamówienie licencji:
${BAZA}/skill/${premium}/${s.trial ? `
Najpierw możesz tam bezpłatnie pobrać wersję trial.` : ""}
`;
  })()}
JAK TO ZAINSTALOWAĆ

1. Wejdź na stronę wybranej umiejętności i pobierz plik .skill
2. Claude: Ustawienia → Umiejętności → Prześlij umiejętność
   ChatGPT: Skills → Upload from your computer (wymaga planu Business lub wyższego)
3. Otwórz nową rozmowę i opisz, czego potrzebujesz. Umiejętność uruchomi się sama.

${marketing ? `Będziemy pisać o nowościach w katalogu, a od czasu do czasu o naszych szkoleniach
i usługach. Wypisujesz się jednym kliknięciem:
${BAZA}/api/wypisz?t=${token}` : "To zamówiony przez Ciebie wynik testu. Ta prośba nie zapisuje Cię do newslettera."}

${cfg.nazwaSerwisu}
${BAZA}`,
});

/* ---------- pomocnicze ---------- */

const POPRAWNY_MAIL = /^[^@\s]{1,64}@[^@\s.]+(\.[^@\s.]+)+$/;

function odpowiedz(res, kod, dane) {
  const body = JSON.stringify(dane);
  res.writeHead(kod, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function stronaHtml(res, tytul, tresc) {
  const html = `<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${tytul}</title>
<meta name="robots" content="noindex"><meta name="referrer" content="no-referrer"><link rel="stylesheet" href="/fonty.css?v=${W_FONTY}"><link rel="stylesheet" href="/styl.css?v=${W_STYL}"></head><body>
<main class="wrap"><article class="art"><h1>${tytul}</h1>${tresc}
<div class="powrot"><a class="btn" href="/">Wróć do katalogu</a></div></article></main></body></html>`;
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" });
  res.end(html);
}

function czytajCialo(req, limit = 4096) {
  return new Promise((ok, blad) => {
    let dane = "";
    let rozmiar = 0, przekroczono = false;
    req.on("data", (c) => {
      if (przekroczono) return;
      rozmiar += c.length;
      dane += c;
      if (rozmiar > limit) { przekroczono = true; dane = ""; blad(new Error("za duże żądanie")); }
    });
    req.on("end", () => { if (!przekroczono) ok(dane); });
    req.on("error", blad);
  });
}

/* ---------- trasy ---------- */

// Stałe formularze publiczne. Klient nie wybiera URL, klucza CRM ani pól leada.
const FORMULARZE_CRM = new Map([
  ["/api/formularze/kontakt", "87e5882626066318a1a971647a7f5dd6"],
  ["/api/formularze/ankieta-warsztatowa", "c7149ad2caa50c335e10ebc746482192"],
]);
const POLA_CRM = { name: 200, email: 254, company: 200, phonenumber: 30, description: 8000, skad: 100, temat: 20, www: 200 };
// Temat wybierany w formularzu kontaktowym. Etykieta trafia do opisu leada jako linia „Temat: …”;
// po ostatniej CRM rozpoznaje ofertę wysłaną do nas (crm-centrum/lead_labels.py, OFFER_MARKER).
const TEMATY_KONTAKTU = { szkolenie: "szkolenie lub warsztat", wdrozenie: "wdrożenie AI w firmie", skille: "skille z katalogu",
  inne: "inna sprawa", oferta: "oferta usług dla AiXperts" };
// Skróty adresów nadawców oznaczonych w CRM jako Śmieci; plik co minutę zapisuje import Centrum.
const PLIK_BLOKADY = join(dirname(C.plikDanych), "blokada-formularzy.json");
function nadawcaZablokowany(email) {
  const adres = String(email || "").trim().toLowerCase();
  if (!adres) return false;
  try { return JSON.parse(readFileSync(PLIK_BLOKADY, "utf8")).sha256.includes(createHash("sha256").update(adres).digest("hex")); }
  catch { return false; } // brak albo uszkodzenie listy nie może zatrzymać formularza
}
const POLA_SUBSKRYPCJI={zgodaEmail:5,zgodaSms:5,wersjaZgodySms:10,requestId:36};
const BLAD_FORMULARZA = "Nie możemy potwierdzić przyjęcia formularza. Skontaktuj się z nami: kontakt@aixperts.pl.";
const potwierdzeniaWToku = new Map();

async function formularzDoCrm(req, res, klucz) {
  let pola;
  try { pola = new URLSearchParams(await czytajCialo(req, 16384)); }
  catch { return odpowiedz(res, 413, { ok: false, blad: "Formularz jest za duży." }); }
  const widziane = new Set();
  for (const [nazwa, wartosc] of pola) {
    if ((!Object.hasOwn(POLA_CRM, nazwa)&&!Object.hasOwn(POLA_SUBSKRYPCJI,nazwa)) || widziane.has(nazwa) || wartosc.length > (POLA_CRM[nazwa]??POLA_SUBSKRYPCJI[nazwa])) {
      return odpowiedz(res, 400, { ok: false, blad: "Nieprawidłowe pola formularza." });
    }
    widziane.add(nazwa);
  }
  // Pułapka na automaty: pole niewidoczne dla ludzi. Wypełnione zgłoszenie dostaje pozorny sukces i nigdzie nie trafia.
  if ((pola.get("www") || "") !== "") return odpowiedz(res, 200, { ok: true });
  pola.delete("www");
  const temat = pola.get("temat") || "";
  if (temat !== "" && !Object.hasOwn(TEMATY_KONTAKTU, temat)) return odpowiedz(res, 400, { ok: false, blad: "Nieprawidłowe pola formularza." });
  pola.delete("temat");
  // Ostatnią linię opisu z formularza kontaktowego zawsze ustala serwer: CRM ufa tylko jej, nie treści wiadomości.
  if (temat || klucz === FORMULARZE_CRM.get("/api/formularze/kontakt"))
    pola.set("description", `${(pola.get("description") || "").slice(0, POLA_CRM.description - 60)}\nTemat: ${TEMATY_KONTAKTU[temat] || "nie wybrano"}`);
  // Nadawca oznaczony w CRM jako Śmieci: bez kolejnego leada, zadania i zapisu na newsletter.
  if (nadawcaZablokowany(pola.get("email"))) return odpowiedz(res, 200, { ok: true });
  const wybor={email:pola.get('email'),telefon:pola.get('phonenumber'),zgodaEmail:pola.get('zgodaEmail')==='true',zgodaSms:pola.get('zgodaSms')==='true',wersjaZgodySms:pola.get('wersjaZgodySms'),requestId:pola.get('requestId')};
  for(const key of Object.keys(POLA_SUBSKRYPCJI))pola.delete(key);
  pola.set("key", klucz);
  try {
    const odp = await fetch(`https://crm.aixperts.pl/forms/wtl/${klucz}`, {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(8000),
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
      body: pola.toString(),
    });
    if (!odp.ok) return odpowiedz(res, odp.status === 422 ? 422 : odp.status === 429 ? 429 : 502,
      { ok: false, blad: odp.status === 422 ? "Uzupełnij wymagane pola formularza." : BLAD_FORMULARZA });
    let bajty = 0;
    const fragmenty = [];
    for await (const fragment of odp.body) {
      bajty += fragment.byteLength;
      if (bajty > 16384) throw new Error("Nieprawidłowa odpowiedź formularza");
      fragmenty.push(Buffer.from(fragment));
    }
    const wynik = JSON.parse(Buffer.concat(fragmenty).toString("utf8"));
    if (wynik?.success !== true) return odpowiedz(res, 502, { ok: false, blad: BLAD_FORMULARZA });
    const source=klucz===FORMULARZE_CRM.get('/api/formularze/kontakt')?'portal-kontakt':'portal-warsztaty';
    const subscriptions=subskrypcje.subscribeOptional(wybor,'https://aixperts.pl',source);
    if(subscriptions.requestId)try{await mailSubskrypcji(subscriptions.requestId);}catch{console.error('Nie potwierdzono maila subskrypcji formularza.');}
    return odpowiedz(res, 200, { ok: true,...(wybor.zgodaEmail||wybor.zgodaSms?{subskrypcje:subscriptions}:{}) });
  } catch (e) {
    return odpowiedz(res, e.name === "TimeoutError" || e.name === "AbortError" ? 504 : 502,
      { ok: false, blad: BLAD_FORMULARZA });
  }
}

const serwer = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket.remoteAddress || "?";

  try {
    if(url.pathname==='/api/crm-zdarzenia'){
      if(req.method!=='POST')return odpowiedz(res,405,{ok:false});
      if(!req.headers['content-type']?.startsWith('application/json'))return odpowiedz(res,415,{ok:false});
      let raw;try{raw=await czytajCialo(req,32768);}catch{return odpowiedz(res,413,{ok:false});}
      const result=crmInbox.accept(raw,req.headers);return odpowiedz(res,result.status,result.body);
    }
    if (url.pathname === "/api/zdrowie") return odpowiedz(res, 200, { ok: true, zapisow: stan().size });

    if (url.pathname === '/api/subskrypcje') {
      const origin=req.headers.origin;
      if (!Object.values(ORIGINS).includes(origin)) return odpowiedz(res,403,{ok:false,blad:'Niedozwolone źródło formularza.'});
      res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');
      if (req.method==='OPTIONS') {res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');res.writeHead(204);return res.end();}
      if(req.method!=='POST')return odpowiedz(res,405,{ok:false,blad:'Niedozwolona metoda.'});
      if(!/^application\/json(?:;|$)/i.test(req.headers['content-type']||''))return odpowiedz(res,415,{ok:false,blad:'Wymagany JSON.'});
      if(przekroczonyLimit(ip))return odpowiedz(res,429,{ok:false,blad:'Za dużo prób. Spróbuj później.'});
      let body;try{body=JSON.parse(await czytajCialo(req));}catch{return odpowiedz(res,400,{ok:false,blad:'Nieprawidłowe dane.'});}
      try {const accepted=subskrypcje.subscribe(body,origin);
        // Write-ahead attempt: an ambiguous SMTP outcome is never blindly retried.
        try {await mailSubskrypcji(accepted.result.requestId);}catch {console.error('Nie potwierdzono wysłania maila subskrypcji.');}
        return odpowiedz(res,200,accepted.result);
      }catch(e){return odpowiedz(res,e.status||503,{ok:false,blad:e.status?e.message:'Nie potwierdzono trwałego zapisu. Ponów z tym samym identyfikatorem.'});}
    }
    if(['/api/subskrypcje/potwierdz','/api/subskrypcje/wypisz'].includes(url.pathname)) {
      res.setHeader('Referrer-Policy','no-referrer');
      const confirm=url.pathname.endsWith('/potwierdz');
      if(!['GET','POST'].includes(req.method))return odpowiedz(res,405,{ok:false});
      try {
        const form=req.method==='POST'?new URLSearchParams(await czytajCialo(req)):url.searchParams;
        const token=form.get('t')||'';
        const preference=subskrypcje.find(token,confirm?'confirm_hash':'unsubscribe_hash');
        if(req.method==='GET')return sendSubscriptionPage(res,subscriptionForm({confirm,preference,token,statuses:{email:subskrypcje.status(preference.request_id,'email'),sms:subskrypcje.status(preference.request_id,'sms')}}));
        if(confirm){const status=subskrypcje.confirm(token);return sendSubscriptionPage(res,subscriptionResult({confirm:true,status,hasSms:!!preference.consent_sms,extra:status==='potwierdzona'&&zBonusem(preference.source)?blokBonusu(token):''}));}
        const channel=form.get('kanal');
        // Legacy guard reads this file immediately before SMTP. Persist its block first;
        // a failed second write returns 503 but cannot leave a fresh legacy permission.
        if(channel==='all'&&!preference.request_only&&preference.email)appendDurable(C.plikDanych,{typ:'wypisanie',email:preference.email,kiedy:new Date().toISOString(),zrodlo:'subskrypcje-calosc'});
        const r=subskrypcje.withdraw(token,channel);
        return sendSubscriptionPage(res,subscriptionResult({confirm:false,requestOnly:r.request_only,channel}));
      }catch(e){
        const message=e.status?e.message:'Nie potwierdzono zapisu. Spróbuj ponownie.';
        if((req.headers.accept||'').includes('text/html'))return sendSubscriptionPage(res,subscriptionPage({title:e.status===400||e.status===410?'Sprawdź link do subskrypcji':'Nie udało się zapisać zmiany',intro:message,body:'<div class="note">Otwórz pełny link z otrzymanej wiadomości. Jeśli problem się powtarza, skontaktuj się z nami: <a href="mailto:kontakt@aixperts.pl">kontakt@aixperts.pl</a>.</div><a class="button" href="https://aixperts.pl/">Przejdź do AiXperts</a>'}),e.status||503);
        return odpowiedz(res,e.status||503,{ok:false,blad:message});
      }
    }

    if (url.pathname.startsWith("/api/formularze/")) {
      if (!FORMULARZE_CRM.has(url.pathname) && url.pathname !== "/api/formularze/feedback")
        return odpowiedz(res, 404, { ok: false, blad: "Nie znaleziono formularza." });
      if (req.method !== "POST") return odpowiedz(res, 405, { ok: false, blad: "Niedozwolona metoda." });
      if (req.headers.origin !== "https://aixperts.pl") return odpowiedz(res, 403, { ok: false, blad: "Niedozwolone źródło formularza." });
      if (!/^application\/x-www-form-urlencoded(?:;|$)/i.test(req.headers["content-type"] || ""))
        return odpowiedz(res, 415, { ok: false, blad: "Nieprawidłowy format formularza." });
      if (Number(req.headers["content-length"] || 0) > 16384)
        return odpowiedz(res, 413, { ok: false, blad: "Formularz jest za duży." });
      if (FORMULARZE_CRM.has(url.pathname)) {
        if (przekroczonyLimit(ip)) return odpowiedz(res, 429, { ok: false, blad: "Za dużo prób z tego adresu." });
        return await formularzDoCrm(req, res, FORMULARZE_CRM.get(url.pathname));
      }
      // Ten sam trwały zapis feedbacku co w API katalogu, bez pętli HTTP.
      url.pathname = "/api/feedback";
    }

    /* zapis */
    if (url.pathname === "/api/zapis" && req.method === "POST") {
      if (przekroczonyLimit(ip)) return odpowiedz(res, 429, { blad: "Za dużo prób z tego adresu." });

      let ciało;
      try { ciało = JSON.parse(await czytajCialo(req)); }
      catch { return odpowiedz(res, 400, { blad: "Nieprawidłowe dane." }); }

      const email = String(ciało.email || "").trim().toLowerCase();
      if (!POPRAWNY_MAIL.test(email) || email.length > 254)
        return odpowiedz(res, 400, { blad: "Nieprawidłowy adres e-mail." });

      const wynik = Array.isArray(ciało.wynik)
        ? ciało.wynik.filter((x) => typeof x === "string" && /^[a-z0-9-]{1,64}$/.test(x)).slice(0, 12)
        : [];

      // Dopasowanie premium z testu: jedno id, przyjmowane tylko jeśli to
      // faktycznie płatny skill z katalogu; wszystko inne po cichu odpada.
      const premium = typeof ciało.premium === "string" && /^[a-z0-9-]{1,64}$/.test(ciało.premium)
        && SKILLE.some((s) => s.id === ciało.premium && s.platny)
        ? ciało.premium : null;

      const token = randomBytes(24).toString("hex");
      const kiedy = new Date().toISOString();
      const zgoda = dowodZgody("test-doboru", ciało.zgodaMarketing === true, kiedy);
      dopisz({ typ: "wynik-prosba", email, wynik, premium, token, kiedy, ip,
        zgodaMarketing: zgoda.udzielona, zgoda, zrodlo: "test-doboru" });
      if (!await wyslijMail({ do: email, ...mailPotwierdzajacy(token, "test", zgoda.udzielona) }))
        return odpowiedz(res, 502, { blad: "Nie udało się wysłać wiadomości potwierdzającej." });
      return odpowiedz(res, 200, { ok: true });
    }

    /* Zapis do newslettera z bannera: dedykowany opt-in, wymaga zgody. Podwojny
       opt-in (potwierdzenie mailem), ta sama sciezka potwierdzenia co test. */
    if (url.pathname === "/api/newsletter" && req.method === "POST") {
      if (przekroczonyLimit(ip)) return odpowiedz(res, 429, { blad: "Za dużo prób z tego adresu." });
      let ciało;
      try { ciało = JSON.parse(await czytajCialo(req)); }
      catch { return odpowiedz(res, 400, { blad: "Nieprawidłowe dane." }); }
      const email = String(ciało.email || "").trim().toLowerCase();
      if (!POPRAWNY_MAIL.test(email) || email.length > 254)
        return odpowiedz(res, 400, { blad: "Nieprawidłowy adres e-mail." });
      if (ciało.zgoda !== true) return odpowiedz(res, 400, { blad: "Zaznacz zgodę na newsletter." });
      const obecne = stan().get(email);
      if (obecne?.potwierdzony) return odpowiedz(res, 200, { ok: true });
      const token = randomBytes(24).toString("hex");
      const kiedy = new Date().toISOString();
      dopisz({ typ: "zapis", email, wynik: [], premium: null, zrodlo: "newsletter",
        token, kiedy, ip, zgoda: dowodZgody("newsletter", true, kiedy) });
      if (!await wyslijMail({ do: email, ...mailPotwierdzajacy(token, "newsletter") }))
        return odpowiedz(res, 502, { blad: "Nie udało się wysłać wiadomości potwierdzającej." });
      return odpowiedz(res, 200, { ok: true });
    }

    /* potwierdzenie */
    if (url.pathname === "/api/potwierdz") {
      const token = url.searchParams.get("t") || "";
      while (potwierdzeniaWToku.has(token)) await potwierdzeniaWToku.get(token);
      let zwolnij;
      potwierdzeniaWToku.set(token, new Promise((resolve) => { zwolnij = resolve; }));
      try {
      const rekord = znajdzPoTokenie(token);
      if (!rekord || !["wynik-prosba", "zapis"].includes(rekord.typ))
        return stronaHtml(res, "Link wygasł albo jest nieprawidłowy",
          "<p class='skrot'>Nie znaleźliśmy tego zapisu. Zrób test jeszcze raz, zajmie minutę.</p>");

      // GET niczego nie zmienia: skanery linków w poczcie otwierają adresy same, potwierdza dopiero POST przyciskiem.
      if (req.method !== "POST" && !rekord.potwierdzony) {
        const wynik = rekord.typ === "wynik-prosba";
        const marketing = !wynik || (rekord.zgodaMarketing === true && rekord.zgoda?.udzielona === true);
        return stronaHtml(res, wynik ? "Potwierdź wysłanie zestawu" : "Potwierdź zapis na newsletter",
          `<p class="skrot">${wynik ? "Naciśnij przycisk, a wyślemy dobrany zestaw skilli" : "Naciśnij przycisk, a dopiszemy Cię do newslettera"} na adres <strong>${escapeHtml(rekord.email)}</strong>.</p>
           <p>${marketing ? "Po potwierdzeniu zapiszemy Cię także na wybrany newsletter AiXperts. Wypis jest w każdej wiadomości." : "Potwierdzasz wyłącznie wysłanie wyniku testu. Nie zapisujemy Cię do newslettera."}</p>
           <form method="post" action="/api/potwierdz?t=${encodeURIComponent(rekord.token)}"><button class="btn" type="submit">${wynik ? "Potwierdź i wyślij zestaw" : "Potwierdzam zapis"}</button></form>`);
      }

      if (rekord.typ === "wynik-prosba") {
        const marketing = rekord.zgodaMarketing === true && rekord.zgoda?.udzielona === true;
        if (!rekord.potwierdzony) {
          if (!await wyslijMail({ do: rekord.email, ...mailZZestawem(rekord.wynik, rekord.token, rekord.premium, marketing) }))
            return stronaHtml(res, "Nie udało się wysłać zestawu", "<p class='skrot'>Spróbuj otworzyć ten link ponownie później albo napisz na kontakt@aixperts.pl.</p>");
          const kiedy = new Date().toISOString();
          dopisz({ typ: "wynik-potwierdzenie", email: rekord.email, token: rekord.token, kiedy, zrodlo: "test-doboru" });
          if (marketing) {
            dopisz({ ...rekord, typ: "zapis", zrodlo: "newsletter", potwierdzony: undefined });
            dopisz({ typ: "potwierdzenie", email: rekord.email, token: rekord.token, kiedy, zgoda: rekord.zgoda, zrodlo: "test-doboru" });
            // Both the result and optional consent are imported from this journal; no parallel lead producer.
          }
        }
        return stronaHtml(res, "Wynik testu wysłany", `<p class="skrot">Wysłaliśmy zamówiony zestaw na Twój e-mail.</p><p>${marketing ? "Potwierdziliśmy również wybrany newsletter. Wypis znajdziesz w wiadomościach." : "Nie zapisaliśmy Cię do newslettera. Ta prośba dotyczy tylko wyniku testu."}</p>`);
      }

      if (!rekord.potwierdzony) {
        dopisz({ typ: "potwierdzenie", email: rekord.email, kiedy: new Date().toISOString(),
          ...(rekord.zgoda ? { zgoda: rekord.zgoda, token: rekord.token, zrodlo: rekord.zgoda.zrodlo } : {}) });
        await wyslijMail({ do: rekord.email, ...mailZZestawem(rekord.wynik, rekord.token, rekord.premium) });
        zglosDoCrm(rekord).catch((e) => console.error("Zgłoszenie do CRM nieudane:", e.message));
      }
      return stronaHtml(res, "Potwierdzone",
        `<p class="skrot">Zestaw poleciał na <strong>${escapeHtml(rekord.email)}</strong>. Powinien być w skrzynce w ciągu minuty, jeśli go nie ma, zajrzyj do spamu.</p>
         <section class="blok"><h3>Co dalej</h3><p>Będziemy pisać o nowościach w katalogu, a od czasu do czasu o naszych szkoleniach i usługach. Wypisujesz się jednym kliknięciem ze stopki każdej wiadomości.</p><p>Twój kod dla subskrybentów: <strong>NEWSLETTER10</strong> to 10% rabatu na każdy płatny skill.</p></section>`);
      } finally {
        potwierdzeniaWToku.delete(token);
        zwolnij();
      }
    }

    /* feedback z ankiety, rozwiązuje token→e-mail, zapisuje do pliku dla automatu (n8n),
       forwarduje do CRM. Dzięki temu e-mail nie krąży w przeglądarce, a n8n czyta plik. */
    if (url.pathname === "/api/feedback" && req.method === "POST") {
      if (przekroczonyLimit(ip)) return odpowiedz(res, 429, { blad: "Za dużo prób z tego adresu." });

      let ciało;
      try { ciało = new URLSearchParams(await czytajCialo(req, 8192)); }
      catch { return odpowiedz(res, 400, { blad: "Nieprawidłowe dane." }); }

      const token = String(ciało.get("token") || "").trim();
      const rekord = token ? znajdzPoTokenie(token) : null;
      const email = rekord?.email || (POPRAWNY_MAIL.test(String(ciało.get("email") || "").trim().toLowerCase())
        ? String(ciało.get("email")).trim().toLowerCase() : null);

      const pomogl = String(ciało.get("pomogl") || "").slice(0, 60);
      const brakuje = String(ciało.get("brakuje") || "").slice(0, 2000);
      const branza = String(ciało.get("branza") || "").slice(0, 200);

      // plik czytany przez automat lejka (n8n), obok dziennika zapisów
      const PLIK_FEEDBACK = join(dirname(C.plikDanych), "feedback.jsonl");
      appendFileSync(PLIK_FEEDBACK, JSON.stringify({
        typ: "feedback", email, token: token || null, pomogl, brakuje, branza,
        kiedy: new Date().toISOString(),
      }) + "\n");

      // forward do CRM (lead „Feedback katalogu") z rozwiązanym adresem
      const crmUrl = C.crm?.feedback;
      if (crmUrl) {
        const opis = `Czy skill pomógł: ${pomogl || "brak odpowiedzi"}\nCzego brakuje / co pomogłoby: ${brakuje || "-"}\nBranża: ${branza || "brak odpowiedzi"}\nToken zapisu: ${token || "brak"}`;
        const dane = new URLSearchParams({ key: crmUrl.split("/").pop(), name: "Feedback z katalogu", description: opis });
        if (email) dane.set("email", email);
        fetch(crmUrl, { method: "POST", body: dane, signal: AbortSignal.timeout(8000) })
          .catch((e) => console.error("Feedback→CRM nieudane:", e.message));
      }
      return odpowiedz(res, 200, { ok: true });
    }

    /* prośba o paczkę: e-mail + id skilla -> mail z linkiem pobrania.
       Nic nie schodzi bez adresu; link w mailu weryfikuje adres z natury. */
    if (url.pathname === "/api/pobranie" && req.method === "POST") {
      if (przekroczonyLimit(ip)) return odpowiedz(res, 429, { blad: "Za dużo prób z tego adresu." });

      let ciało;
      try { ciało = JSON.parse(await czytajCialo(req)); }
      catch { return odpowiedz(res, 400, { blad: "Nieprawidłowe dane." }); }

      const email = String(ciało.email || "").trim().toLowerCase();
      if (!POPRAWNY_MAIL.test(email) || email.length > 254)
        return odpowiedz(res, 400, { blad: "Nieprawidłowy adres e-mail." });
      const skill = String(ciało.skill || "").trim();
      if (!plikPaczki(skill)) return odpowiedz(res, 404, { blad: "Nie ma takiej paczki." });

      // Trial to lead: pelne dane. Telefon opcjonalny, zgoda marketingowa
      // DOBROWOLNA (zero couplingu, pobranie dziala bez zgody). Osoba do
      // kontaktu, gdy podano nazwe firmy.
      const nazwa = String(ciało.nazwa || "").trim().slice(0, 200) || null;
      const osoba = String(ciało.osoba || "").trim().slice(0, 120) || null;
      const telefon = String(ciało.telefon || "").replace(/[^0-9+ ]/g, "").trim().slice(0, 20) || null;
      const kiedy = new Date().toISOString();
      const zgodaMarketing = ciało.zgodaMarketing === true ? kiedy : null;
      const powiadomWersje = ciało.powiadomWersje === true
        ? { udzielona: true, tresc: TRESC_ZGODY_WERSJI, wersja: WERSJA_ZGODY_WERSJI, kiedy, kanal: "email" } : null;

      // Idempotencja: ponowienie z tym samym requestId (np. po utracie odpowiedzi) odzyskuje tę samą prośbę
      // i jej token; paczkę wysyła ponownie tylko, gdy poprzednia wysyłka nie była udana. Inne dane: 409.
      const requestId = typeof ciało.requestId === "string" && /^[0-9a-f-]{36}$/i.test(ciało.requestId) ? ciało.requestId : null;
      const odcisk = createHash("sha256").update(JSON.stringify([email, skill, nazwa, osoba, telefon, !!zgodaMarketing, !!powiadomWersje, ciało.zgodaEmail === true, ciało.zgodaSms === true])).digest("hex");
      const poprzednia = requestId ? wczytaj().find((r) => r.typ === "pobranie-prosba" && r.requestId === requestId) : null;
      if (poprzednia && poprzednia.odcisk !== odcisk) return odpowiedz(res, 409, { blad: "Ten identyfikator został już użyty z innymi danymi. Odśwież stronę." });
      const token = poprzednia ? poprzednia.token : randomBytes(24).toString("hex");
      if (!poprzednia) dopisz({ typ: "pobranie-prosba", email, skill, nazwa, osoba, telefon,
        zgodaMarketing, token, kiedy, ip, zgoda: dowodZgody("pobranie-triala", ciało.zgodaMarketing === true, kiedy), powiadomWersje, zrodlo: "pobranie-paczki", requestId, odcisk });
      const dodatkoweSubskrypcje=subskrypcje.subscribeOptional({...ciało,email},'https://skille.aixperts.pl','katalog-pobranie');
      // Newsletter zaznaczony w formularzu: standardowy mail potwierdzający ze wspólnego rejestru, przed paczką
      // i niezależnie od niej (rezerwacja przed wysyłką jak w formularzu newslettera).
      let newsletterMail = null;
      if (dodatkoweSubskrypcje.email === "oczekuje_potwierdzenia" && dodatkoweSubskrypcje.requestId) {
        try { await mailSubskrypcji(dodatkoweSubskrypcje.requestId); } catch { console.error("Nie potwierdzono wysłania maila subskrypcji z pobrania."); }
        newsletterMail = stanPotwierdzenia(dodatkoweSubskrypcje.requestId);
      }
      // Rezerwacja paczki: sprawdzenie i zapis próby bez await pomiędzy, zawsze (także dla pierwszego żądania,
      // bo równoległe ponowienie mogło już zarezerwować wysyłkę w trakcie wysyłki potwierdzenia newslettera).
      // Ponowna wysyłka tylko, gdy każda wcześniejsza próba ma zapisany wynik nieudany.
      // shortcut: SMTP zgłasza każde zerwanie jako nieudane, więc rzadko możliwy drugi mail z tą samą paczką (nieszkodliwy).
      const historia = wczytaj().filter((r) => r.token === token);
      const proby = historia.filter((r) => r.typ === "pobranie-mail-proba").length, wyniki = historia.filter((r) => r.typ === "pobranie-mail");
      if (wyniki.some((r) => r.ok)) return odpowiedz(res, 200, { ok: true, paczka: "wyslana", subskrypcje: dodatkoweSubskrypcje, newsletterMail });
      // Próba w toku albo bez wyniku (np. awaria w trakcie): bez ponowienia na ślepo, uczciwy stan dla interfejsu.
      if (wyniki.length < proby) return odpowiedz(res, 200, { ok: true, paczka: "w_toku", subskrypcje: dodatkoweSubskrypcje, newsletterMail });
      dopisz({ typ: "pobranie-mail-proba", token, kiedy: new Date().toISOString() });

      // Centrum imports the durable request independently of optional marketing consent.


      const trial = skill.endsWith("-trial");
      const s = nazwaSkilla(trial ? skill.replace(/-trial$/, "") : skill);
      const wyslany = await wyslijMail({
        do: email,
        temat: `Twoja paczka: ${s.nazwa}${trial ? " (wersja trialowa)" : ""}`,
        html: htmlPaczki({ ...WYGLAD(), skill: s, pobierz: `${BAZA}/api/pobierz?t=${token}`, trial, wypisWersji: powiadomWersje ? `${BAZA}/api/wypisz-wersje?t=${token}` : null }),
        tresc: `Cześć,

ktoś (mamy nadzieję, że Ty) poprosił o paczkę „${s.nazwa}${trial ? ", wersja trialowa" : ""}" na ${cfg.domena}.

Pobierz ją tutaj (link jest Twój, działa też przy ponownym pobraniu):
${BAZA}/api/pobierz?t=${token}

JAK ZAINSTALOWAĆ
1. Pobierz plik .skill z linku wyżej
2. Claude: Ustawienia -> Umiejętności -> Prześlij umiejętność
   ChatGPT: Skills -> Upload from your computer (plan Business lub wyższy)
3. Otwórz nową rozmowę i opisz, czego potrzebujesz
${trial ? `
To wersja trialowa płatnego skilla. Pełna wersja i cennik:
${BAZA}/skill/${s.id}/
` : ""}
${powiadomWersje ? `Przy pobraniu zaznaczono prośbę o wiadomość, gdy wyjdzie nowa wersja tego skilla. Napiszemy tylko wtedy, a link pobrania wyżej zawsze da najnowszą wersję. Rezygnacja: ${BAZA}/api/wypisz-wersje?t=${token}
(powiadomienia zaczną działać po pierwszym pobraniu z linku wyżej)

` : ""}Jeśli to nie Ty prosiłeś o paczkę, po prostu zignoruj tę wiadomość.

${cfg.nazwaSerwisu}
${BAZA}`,
      }).catch((e) => { console.error("Wysyłka paczki: błąd transportu:", e.message); return false; });
      dopisz({ typ: "pobranie-mail", token, ok: wyslany, kiedy: new Date().toISOString() });
      if (!wyslany) return odpowiedz(res, 502, { blad: "Nie udało się wysłać maila, spróbuj za chwilę.",subskrypcje:dodatkoweSubskrypcje, newsletterMail });
      return odpowiedz(res, 200, { ok: true, paczka: "wyslana", subskrypcje:dodatkoweSubskrypcje, newsletterMail });
    }

    /* bonus: komplet skilli po potwierdzonym zapisie (token potwierdzenia); po wypisie dostęp zostaje */
    if (url.pathname === "/api/komplet") {
      const token = url.searchParams.get("t") || "";
      let zapis = null;
      try { zapis = subskrypcje.find(token, "confirm_hash"); } catch {}
      const wolno = zapis && existsSync(KOMPLET) && subskrypcje.rows().some((r) => r.type === "email-confirmed" && r.request_id === zapis.request_id);
      if (!wolno) return stronaHtml(res, "Najpierw potwierdź zapis",
        "<p class='skrot'>Komplet skilli pobierzesz po potwierdzeniu zapisu na newsletter. Otwórz link z maila i naciśnij przycisk potwierdzenia.</p>");
      const dane = readFileSync(KOMPLET);
      res.once("finish", () => { try { dopisz({ typ: "komplet-pobranie", email: zapis.email, request_id: zapis.request_id, kiedy: new Date().toISOString() }); } catch {} });
      res.writeHead(200, { "Content-Type": "application/zip", "Content-Disposition": 'attachment; filename="skille-po-polsku-komplet.zip"', "Content-Length": dane.length, "Cache-Control": "no-store" });
      return res.end(dane);
    }

    /* pobranie paczki z linku w mailu */
    if (url.pathname === "/api/pobierz") {
      const token = url.searchParams.get("t") || "";
      const wszystkie = wczytaj();
      const prosba = wszystkie.find((r) => r.typ === "pobranie-prosba" && r.token && bezpieczneRowne(r.token, token));
      const plik = prosba ? plikPaczki(prosba.skill) : null;
      if (!prosba || !plik) {
        return stronaHtml(res, "Link wygasł albo jest nieprawidłowy",
          "<p class='skrot'>Nie znaleźliśmy tej paczki. Wejdź na stronę skilla i poproś o link jeszcze raz.</p>");
      }

      const dane = readFileSync(plik);
      res.once('finish',()=>{
        try{
          if(!wczytaj().some(r=>r.typ==='pobranie'&&r.token===prosba.token))
            dopisz({typ:'pobranie',email:prosba.email,skill:prosba.skill,token:prosba.token,kiedy:new Date().toISOString()});
        }catch{console.error('Nie potwierdzono zapisu wydania paczki.');}
      });
      res.writeHead(200, {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${prosba.skill}.skill"`,
        "Content-Length": dane.length,
        "Cache-Control": "no-store",
      });
      return res.end(dane);
    }

    /* rezygnacja z powiadomień o nowych wersjach jednego skilla */
    if (url.pathname === "/api/wypisz-wersje") {
      const token = url.searchParams.get("t") || "";
      const prosba = wczytaj().find((r) => r.typ === "pobranie-prosba" && r.token && bezpieczneRowne(r.token, token));
      if (prosba && !wypisanyZWersji(wczytaj(), prosba.email, prosba.skill)) appendDurable(C.plikDanych, { typ: "wypis-wersji", email: prosba.email, skill: prosba.skill, token: prosba.token, kiedy: new Date().toISOString() });
      return stronaHtml(res, "Nie będziemy pisać o nowych wersjach",
        "<p class='skrot'>Wyłączyliśmy powiadomienia o nowych wersjach tego skilla na ten adres.</p><p>Najnowszą wersję zawsze znajdziesz na stronie skilla w katalogu. Gdy przy kolejnym pobraniu znów zaznaczysz powiadomienia, wrócą.</p>");
    }

    /* wypisanie */
    if (url.pathname === "/api/wypisz") {
      const rekord = znajdzPoTokenie(url.searchParams.get("t") || "");
      if (rekord) {
        appendDurable(C.plikDanych,{ typ: "wypisanie", email: rekord.email, kiedy: new Date().toISOString(), zrodlo: "link-wypisu" });
        subskrypcje.withdrawEmail(rekord.email);
      }
      // Odpowiadamy tak samo niezależnie od tego, czy adres był na liście.
      return stronaHtml(res, "Wypisane",
        "<p class='skrot'>Zakończyliśmy wysyłkę newslettera i wiadomości marketingowych na ten adres.</p><p>Wypis nie usuwa automatycznie danych zamówień ani historii. W sprawie usunięcia danych napisz na kontakt@aixperts.pl. Wiadomości potrzebne do obsługi zamówionej usługi mogą nadal przychodzić.</p>");
    }

    odpowiedz(res, 404, { blad: "Nie znaleziono." });
  } catch (e) {
    console.error("Błąd:", e);
    odpowiedz(res, 500, { blad: "Błąd serwera." });
  }
});

// Domyślnie tylko pętla zwrotna, przy instalacji na hoście nginx stoi obok
// i nikt z zewnątrz nie ma się tu dobijać.
//
// W kontenerze to jednak nie wystarcza: nginx siedzi w SĄSIEDNIM kontenerze,
// więc adres 127.0.0.1 oznacza dla niego coś innego niż dla nas i połączenie
// nie ma prawa dojść. Awaria jest przy tym cicha, kontrola stanu usługi
// odpytuje 127.0.0.1 od środka i przechodzi, więc kontener raportuje pełne
// zdrowie, a każde żądanie do /api/ kończy się błędem bramy. Stąd ZAPISY_HOST:
// w docker-compose ustawiamy 0.0.0.0, port i tak nie wychodzi poza sieć compose.
const HOST = process.env.ZAPISY_HOST || "127.0.0.1";

// Katalog na dane bywa podmontowany z hosta jako własność roota, a usługa
// chodzi na nieuprzywilejowanym użytkowniku. Lepiej powiedzieć to wprost przy
// starcie niż wywrócić się przy pierwszym zapisie, gdy ktoś już wypełnia formularz.
try {
  appendFileSync(C.plikDanych, "");
} catch (e) {
  console.error(`Nie mogę pisać do ${C.plikDanych} (${e.code}).`);
  console.error(`Nadaj prawa katalogowi: chown -R 1000:1000 ${dirname(C.plikDanych)}`);
  process.exit(1);
}

// Po każdym wdrożeniu (start kontenera) mail do osób, które przy pobraniu poprosiły
// o powiadomienie, gdy skill ma nową wersję. Pierwszy start tylko zapisuje stan.
const PLIK_WERSJI = join(dirname(C.plikDanych), "wersje-powiadomione.json");
// Wypisy z rejestru wspólnych subskrypcji (strony wypisu newslettera) też blokują powiadomienia.
function wycofaniaSubskrypcji() {
  const m = new Map();
  // Tylko wypis z e-maila albo z całości; wypis z samego SMS i anulowanie pojedynczego zgłoszenia nie dotyczą tych wiadomości.
  for (const r of subskrypcje.rows()) if (r.type === "subscription-withdrawn" && r.email && ["email", "all"].includes(r.channel) && !r.request_only) {
    const kiedy = new Date(r.occurred_at).toISOString();
    if (!(m.get(r.email) >= kiedy)) m.set(r.email, kiedy);
  }
  return m;
}
async function powiadomONowychWersjach() {
  const skille = SKILLE.filter((s) => s.wersja && s.gotowy);
  const stan = existsSync(PLIK_WERSJI) ? JSON.parse(readFileSync(PLIK_WERSJI, "utf8")) : {};
  for (const s of zmienione(skille, stan)) {
    let wyslane = 0, nieudane = 0;
    for (const o of odbiorcy(wczytaj(), s.id, s.wersja, wycofaniaSubskrypcji())) {
      // Ponowna kontrola tuż przed wysyłką: wypis kliknięty w trakcie kolejki ma pierwszeństwo.
      // shortcut: każda kontrola czyta oba dzienniki (koszt odbiorcy × wiersze), przy setkach odbiorców przejść na indeks przyrostowy
      if (!odbiorcy(wczytaj(), s.id, s.wersja, wycofaniaSubskrypcji()).some((x) => x.email === o.email)) continue;
      // Trwała rezerwacja przed wysyłką: bez ponowień, więc nigdy dwa maile o tej samej wersji.
      appendDurable(C.plikDanych, { typ: "powiadomienie-wersji-proba", email: o.email, skill: s.id, wersja: s.wersja, kiedy: new Date().toISOString() });
      // Wyjątek transportu = nieudana próba tego adresu, kolejka idzie dalej.
      const ok = await wyslijMail({
        do: o.email,
        temat: `Nowa wersja skilla: ${s.nazwa} (${s.wersja})`,
        html: htmlNowejWersji({ ...WYGLAD(), skill: s, data: s.aktualizacja ? dataPl(s.aktualizacja) : "", pobierz: `${BAZA}/api/pobierz?t=${o.token}`, wypis: `${BAZA}/api/wypisz-wersje?t=${o.token}` }),
        tresc: `Cześć,

wyszła nowa wersja skilla „${s.nazwa}”: ${s.wersja}${s.aktualizacja ? ` z ${dataPl(s.aktualizacja)}` : ""}. Piszemy, bo przy pobraniu tego skilla zaznaczono prośbę o taką wiadomość.
${s.zmiany ? `
Co nowego: ${s.zmiany}
` : ""}
Pobierz nową wersję (Twój link, zawsze daje najnowszą):
${BAZA}/api/pobierz?t=${o.token}

JAK PODMIENIĆ
1. Claude: Ustawienia -> Umiejętności, usuń starą wersję i prześlij nowy plik
   ChatGPT: Skills, usuń starą wersję i wgraj nowy plik
2. Otwórz nową rozmowę

Opis skilla: ${BAZA}/skill/${s.id}/

Nie chcesz więcej takich wiadomości o tym skillu? Kliknij:
${BAZA}/api/wypisz-wersje?t=${o.token}

${cfg.nazwaSerwisu}
${BAZA}`,
      }).catch((e) => { console.error("Powiadomienie o wersji: błąd wysyłki:", e.message); return false; });
      appendDurable(C.plikDanych, { typ: "powiadomienie-wersji", email: o.email, skill: s.id, wersja: s.wersja, ok, kiedy: new Date().toISOString() });
      if (ok) wyslane++; else nieudane++;
    }
    console.log(`Powiadomienia o wersji ${s.id} ${s.wersja}: wysłano ${wyslane}, nieudane ${nieudane} (bez ponowień, adresy w dzienniku jako ok:false)`);
  }
  const nowy = Object.fromEntries(skille.map((s) => [s.id, s.wersja]));
  writeFileSync(PLIK_WERSJI + ".tmp", JSON.stringify(nowy, null, 2));
  renameSync(PLIK_WERSJI + ".tmp", PLIK_WERSJI);
}

serwer.listen(C.port, HOST, () => {
  powiadomONowychWersjach().catch((e) => console.error("Powiadomienia o wersjach nieudane:", e.message));
  console.log(`Usługa zapisów działa na http://${HOST}:${C.port}`);
  console.log(`Dane: ${C.plikDanych}`);
  console.log(`Wysyłka: tryb "${C.wysylka.tryb}"${C.wysylka.tryb === "log" ? ` (maile trafiają do ${DZIENNIK_MAILI}, nic nie wychodzi na zewnątrz)` : ""}`);
});
