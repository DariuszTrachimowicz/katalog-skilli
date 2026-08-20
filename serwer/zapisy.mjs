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
import { randomBytes, timingSafeEqual, createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(KORZEN, "config.json"), "utf8"));
const C = cfg.zapisy;
// Nadpisania do testow lokalnych (produkcja: config.json bez zmian).
if (process.env.ZAPISY_PLIK) C.plikDanych = process.env.ZAPISY_PLIK;
if (process.env.ZAPISY_TRYB) C.wysylka = { ...C.wysylka, tryb: process.env.ZAPISY_TRYB };
if (process.env.ZAPISY_PORT) C.port = parseInt(process.env.ZAPISY_PORT, 10);
const BAZA = `https://${cfg.domena}`;

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

const dopisz = (rekord) => appendFileSync(C.plikDanych, JSON.stringify(rekord) + "\n");

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
function smtpWyslij({ host, port, uzytkownik, haslo, adresNadawcy, nazwaNadawcy, adresat, temat, tresc }) {
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
    const cialo = Buffer.from(tresc, "utf8").toString("base64").replace(/(.{76})/g, "$1\r\n");
    const naglowki = [
      `From: ${slowo(nazwaNadawcy)} <${adresNadawcy}>`,
      `To: <${adresat}>`,
      `Subject: ${slowo(temat)}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${randomBytes(12).toString("hex")}@${cfg.domena}>`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset=utf-8',
      "Content-Transfer-Encoding: base64",
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

async function wyslijMail({ do: adresat, temat, tresc }) {
  const w = C.wysylka;

  if (w.tryb === "smtp") {
    const haslo = process.env[w.hasloZmienna || "SMTP_HASLO"];
    if (!haslo) { console.error("Wysyłka SMTP: brak hasła w zmiennej środowiskowej", w.hasloZmienna || "SMTP_HASLO"); return false; }
    const [, nazwa = cfg.nazwaSerwisu, adres] = w.nadawca.match(/^\s*(.*?)\s*<([^>]+)>\s*$/) || [null, cfg.nazwaSerwisu, w.nadawca];
    try {
      await smtpWyslij({
        host: w.host, port: w.port || 587, uzytkownik: w.uzytkownik, haslo,
        adresNadawcy: adres, nazwaNadawcy: nazwa, adresat, temat, tresc,
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
    body: JSON.stringify({ from: w.nadawca, to: [adresat], subject: temat, text: tresc }),
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
  const dane = new URLSearchParams({
    key: crm.formularz.split("/").pop(),
    name: rekord.email,
    email: rekord.email,
    description: `Potwierdzony zapis z testu doboru (${cfg.domena}). Dobrane skille: ${
      (rekord.wynik || []).map((id) => nazwaSkilla(id).nazwa).join(", ") || "brak"
    }.${rekord.premium ? ` Dopasowanie premium (PŁATNY): ${nazwaSkilla(rekord.premium).nazwa}${nazwaSkilla(rekord.premium).cena ? `, ${nazwaSkilla(rekord.premium).cena}` : ""}.` : ""}`,
  });
  const odp = await fetch(crm.formularz, { method: "POST", body: dane, signal: AbortSignal.timeout(8000) });
  if (!odp.ok) throw new Error(`CRM odpowiedział ${odp.status}`);
}

const mailPotwierdzajacy = (token) => ({
  temat: "Potwierdź zapis, zestaw umiejętności",
  tresc: `Cześć,

ktoś (mamy nadzieję, że Ty) poprosił o zestaw umiejętności AI dobrany w teście na ${cfg.domena}.

Potwierdź kliknięciem, a wyślemy go od razu:
${BAZA}/api/potwierdz?t=${token}

Jeśli to nie Ty, po prostu zignoruj tę wiadomość. Bez potwierdzenia nie wyślemy nic więcej i nie zapiszemy Cię na żadną listę.

${cfg.nazwaSerwisu}
${BAZA}`,
});

const mailZZestawem = (wynik, token, premium = null) => ({
  temat: "Twój zestaw umiejętności AI",
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

Będziemy pisać o nowościach w katalogu, a od czasu do czasu o naszych szkoleniach
i usługach. Nic częściej, niż trzeba, i zawsze z wypisem jednym kliknięciem:
${BAZA}/api/wypisz?t=${token}

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
<meta name="robots" content="noindex"><link rel="stylesheet" href="/fonty.css?v=${W_FONTY}"><link rel="stylesheet" href="/styl.css?v=${W_STYL}"></head><body>
<main class="wrap"><article class="art"><h1>${tytul}</h1>${tresc}
<div class="powrot"><a class="btn" href="/">Wróć do katalogu</a></div></article></main></body></html>`;
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end(html);
}

function czytajCialo(req, limit = 4096) {
  return new Promise((ok, blad) => {
    let dane = "";
    req.on("data", (c) => {
      dane += c;
      if (dane.length > limit) { blad(new Error("za duże żądanie")); req.destroy(); }
    });
    req.on("end", () => ok(dane));
    req.on("error", blad);
  });
}

/* ---------- trasy ---------- */

const serwer = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket.remoteAddress || "?";

  try {
    if (url.pathname === "/api/zdrowie") return odpowiedz(res, 200, { ok: true, zapisow: stan().size });

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

      const obecne = stan().get(email);
      // Adres już potwierdzony, nie zakładamy nowego wpisu, ale odpowiadamy
      // tak samo jak przy nowym, żeby formularz nie zdradzał, kto jest na liście.
      if (obecne?.potwierdzony) {
        await wyslijMail({ do: email, ...mailZZestawem(wynik.length ? wynik : obecne.wynik, obecne.token, premium ?? obecne.premium) });
        return odpowiedz(res, 200, { ok: true });
      }

      const token = randomBytes(24).toString("hex");
      dopisz({ typ: "zapis", email, wynik, premium, token, kiedy: new Date().toISOString(), ip });
      await wyslijMail({ do: email, ...mailPotwierdzajacy(token) });
      return odpowiedz(res, 200, { ok: true });
    }

    /* potwierdzenie */
    if (url.pathname === "/api/potwierdz") {
      const rekord = znajdzPoTokenie(url.searchParams.get("t") || "");
      if (!rekord)
        return stronaHtml(res, "Link wygasł albo jest nieprawidłowy",
          "<p class='skrot'>Nie znaleźliśmy tego zapisu. Zrób test jeszcze raz, zajmie minutę.</p>");

      if (!rekord.potwierdzony) {
        dopisz({ typ: "potwierdzenie", email: rekord.email, kiedy: new Date().toISOString() });
        await wyslijMail({ do: rekord.email, ...mailZZestawem(rekord.wynik, rekord.token, rekord.premium) });
        zglosDoCrm(rekord).catch((e) => console.error("Zgłoszenie do CRM nieudane:", e.message));
      }
      return stronaHtml(res, "Potwierdzone",
        `<p class="skrot">Zestaw poleciał na <strong>${rekord.email}</strong>. Powinien być w skrzynce w ciągu minuty, jeśli go nie ma, zajrzyj do spamu.</p>
         <section class="blok"><h3>Co dalej</h3><p>Będziemy pisać o nowościach w katalogu, a od czasu do czasu o naszych szkoleniach i usługach. Wypisujesz się jednym kliknięciem ze stopki każdej wiadomości.</p></section>`);
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

      const token = randomBytes(24).toString("hex");
      dopisz({ typ: "pobranie-prosba", email, skill, token, kiedy: new Date().toISOString(), ip });

      const trial = skill.endsWith("-trial");
      const s = nazwaSkilla(trial ? skill.replace(/-trial$/, "") : skill);
      const wyslany = await wyslijMail({
        do: email,
        temat: `Twoja paczka: ${s.nazwa}${trial ? " (wersja trialowa)" : ""}`,
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
Jeśli to nie Ty prosiłeś o paczkę, po prostu zignoruj tę wiadomość.

${cfg.nazwaSerwisu}
${BAZA}`,
      });
      if (!wyslany) return odpowiedz(res, 502, { blad: "Nie udało się wysłać maila, spróbuj za chwilę." });
      return odpowiedz(res, 200, { ok: true });
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

      // Pierwsze pobranie z tego linku: odnotuj i zgłoś lead (raz na token).
      if (!wszystkie.some((r) => r.typ === "pobranie" && r.token === prosba.token)) {
        dopisz({ typ: "pobranie", email: prosba.email, skill: prosba.skill, token: prosba.token, kiedy: new Date().toISOString() });
        if (C.crm?.formularz) {
          const trial = prosba.skill.endsWith("-trial");
          const s = nazwaSkilla(trial ? prosba.skill.replace(/-trial$/, "") : prosba.skill);
          const dane = new URLSearchParams({
            key: C.crm.formularz.split("/").pop(),
            name: prosba.email,
            email: prosba.email,
            description: `Pobranie paczki „${s.nazwa}${trial ? ", TRIAL płatnego skilla" : ""}" z ${cfg.domena}.`,
          });
          fetch(C.crm.formularz, { method: "POST", body: dane, signal: AbortSignal.timeout(8000) })
            .catch((e) => console.error("Pobranie→CRM nieudane:", e.message));
        }
      }

      const dane = readFileSync(plik);
      res.writeHead(200, {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${prosba.skill}.skill"`,
        "Content-Length": dane.length,
        "Cache-Control": "no-store",
      });
      return res.end(dane);
    }

    /* wypisanie */
    if (url.pathname === "/api/wypisz") {
      const rekord = znajdzPoTokenie(url.searchParams.get("t") || "");
      if (rekord) dopisz({ typ: "wypisanie", email: rekord.email, kiedy: new Date().toISOString() });
      // Odpowiadamy tak samo niezależnie od tego, czy adres był na liście.
      return stronaHtml(res, "Wypisane",
        "<p class='skrot'>Twój adres został usunięty razem z całą historią. Nie wyślemy Ci już nic.</p>");
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

serwer.listen(C.port, HOST, () => {
  console.log(`Usługa zapisów działa na http://${HOST}:${C.port}`);
  console.log(`Dane: ${C.plikDanych}`);
  console.log(`Wysyłka: tryb "${C.wysylka.tryb}"${C.wysylka.tryb === "log" ? ` (maile trafiają do ${DZIENNIK_MAILI}, nic nie wychodzi na zewnątrz)` : ""}`);
});
