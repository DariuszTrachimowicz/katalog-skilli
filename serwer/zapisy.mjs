#!/usr/bin/env node
// Usługa zapisów z testu doboru.
//
// Celowo bez frameworka i bez bazy danych. Lista adresowa katalogu to
// dopisywanie wierszy i sporadyczne czytanie całości — plik JSONL obsługuje
// to lepiej niż baza, którą trzeba utrzymywać, aktualizować i backupować
// osobno. Kopia zapasowa to skopiowanie jednego pliku.
//
// Uruchomienie: node serwer/zapisy.mjs
// W produkcji chodzi pod systemd, za nginx-em, tylko na localhost.

import { createServer } from "node:http";
import { readFileSync, appendFileSync, existsSync, mkdirSync } from "node:fs";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(KORZEN, "config.json"), "utf8"));
const C = cfg.zapisy;
const BAZA = `https://${cfg.domena}`;

const SKILLE = (() => {
  const p = join(KORZEN, "public", "dane", "skille.json");
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : [];
})();
const nazwaSkilla = (id) => SKILLE.find((s) => s.id === id) || { id, nazwa: id, skrot: "" };

mkdirSync(dirname(C.plikDanych), { recursive: true });
const DZIENNIK_MAILI = join(dirname(C.plikDanych), "wyslane-maile.log");

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
// Dzięki temu plik jest dziennikiem zdarzeń, a nie stanem do nadpisywania —
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

async function wyslijMail({ do: adresat, temat, tresc }) {
  const w = C.wysylka;

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

const mailPotwierdzajacy = (token) => ({
  temat: "Potwierdź zapis — zestaw umiejętności",
  tresc: `Cześć,

ktoś (mamy nadzieję, że Ty) poprosił o zestaw umiejętności AI dobrany w teście na ${cfg.domena}.

Potwierdź kliknięciem, a wyślemy go od razu:
${BAZA}/api/potwierdz?t=${token}

Jeśli to nie Ty — po prostu zignoruj tę wiadomość. Bez potwierdzenia nie wyślemy nic więcej i nie zapiszemy Cię na żadną listę.

${cfg.nazwaSerwisu}
${BAZA}`,
});

const mailZZestawem = (wynik, token) => ({
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

JAK TO ZAINSTALOWAĆ

1. Wejdź na stronę wybranej umiejętności i pobierz plik .skill
2. Claude: Ustawienia → Umiejętności → Prześlij umiejętność
   ChatGPT: Skills → Upload from your computer (wymaga planu Business lub wyższego)
3. Otwórz nową rozmowę i opisz, czego potrzebujesz. Umiejętność uruchomi się sama.

Raz w miesiącu napiszemy, co nowego pojawiło się w katalogu. Nic poza tym.
Wypisanie jednym kliknięciem: ${BAZA}/api/wypisz?t=${token}

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
<meta name="robots" content="noindex"><link rel="stylesheet" href="/styl.css"></head><body>
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

      const obecne = stan().get(email);
      // Adres już potwierdzony — nie zakładamy nowego wpisu, ale odpowiadamy
      // tak samo jak przy nowym, żeby formularz nie zdradzał, kto jest na liście.
      if (obecne?.potwierdzony) {
        await wyslijMail({ do: email, ...mailZZestawem(wynik.length ? wynik : obecne.wynik, obecne.token) });
        return odpowiedz(res, 200, { ok: true });
      }

      const token = randomBytes(24).toString("hex");
      dopisz({ typ: "zapis", email, wynik, token, kiedy: new Date().toISOString(), ip });
      await wyslijMail({ do: email, ...mailPotwierdzajacy(token) });
      return odpowiedz(res, 200, { ok: true });
    }

    /* potwierdzenie */
    if (url.pathname === "/api/potwierdz") {
      const rekord = znajdzPoTokenie(url.searchParams.get("t") || "");
      if (!rekord)
        return stronaHtml(res, "Link wygasł albo jest nieprawidłowy",
          "<p class='skrot'>Nie znaleźliśmy tego zapisu. Zrób test jeszcze raz — zajmie minutę.</p>");

      if (!rekord.potwierdzony) {
        dopisz({ typ: "potwierdzenie", email: rekord.email, kiedy: new Date().toISOString() });
        await wyslijMail({ do: rekord.email, ...mailZZestawem(rekord.wynik, rekord.token) });
      }
      return stronaHtml(res, "Potwierdzone",
        `<p class="skrot">Zestaw poleciał na <strong>${rekord.email}</strong>. Powinien być w skrzynce w ciągu minuty — jeśli go nie ma, zajrzyj do spamu.</p>
         <section class="blok"><h3>Co dalej</h3><p>Raz w miesiącu napiszemy, co nowego pojawiło się w katalogu. Nic poza tym, a wypisujesz się jednym kliknięciem ze stopki wiadomości.</p></section>`);
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

// Domyślnie tylko localhost. W kontenerze ustawiamy ZAPISY_HOST=0.0.0.0 —
// tam granicę wyznacza sieć compose, nie adres nasłuchu.
const HOST = process.env.ZAPISY_HOST || "127.0.0.1";
serwer.listen(C.port, HOST, () => {
  console.log(`Usługa zapisów działa na http://${HOST}:${C.port}`);
  console.log(`Dane: ${C.plikDanych}`);
  console.log(`Wysyłka: tryb "${C.wysylka.tryb}"${C.wysylka.tryb === "log" ? ` (maile trafiają do ${DZIENNIK_MAILI}, nic nie wychodzi na zewnątrz)` : ""}`);
});
