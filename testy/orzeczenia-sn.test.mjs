import test from "node:test";
import assert from "node:assert/strict";
import { zapytanie, tekstZHtml, markdown, znajdz, pobierzOrzeczenie, ustawienia } from "../narzedzia/orzeczenia-sn.mjs";

test("orzeczenia-sn: zapytanie mapuje kryteria na parametry API SN i odrzuca złe wartości", () => {
  const q = zapytanie({ sygnatura: "III CZP 84/22", tresc: "zadatek", forma: "uchwała", od: "2020-01-01", limit: "200" });
  assert.equal(q.get("sygnatura"), "III CZP 84/22");
  assert.equal(q.get("tresc"), "zadatek");
  assert.equal(q.get("forma_orzeczenia"), "uchwała");
  assert.equal(q.get("data_wydania_od"), "2020-01-01");
  assert.equal(q.get("rozmiar_strony"), "200");
  assert.equal(q.get("strona"), "1");
  assert.throws(() => zapytanie({}), /co najmniej jedno kryterium/);
  assert.throws(() => zapytanie({ tresc: true }), /Brak wartości dla --tresc/);
  assert.throws(() => zapytanie({ tresc: "x", od: "1.01.2020" }), /RRRR-MM-DD/);
  for (const limit of ["0", "201", "1.5", "abc"]) assert.throws(() => zapytanie({ tresc: "x", limit }), /--limit/);
});

const linia = (left, top, tresc) => `<div class="txt" style="position:absolute; left:${left}px; top:${top}px;">${tresc}</div>`;
const sp = (t, v = "baseline", px = 12) => `<span class="f1" style="font-size:${px}px;vertical-align:${v};color:rgba(0,0,0,1);">${t}</span>`;
const strona = (...l) => `<div class='pg' style="x">${l.join("\n")}</div>`;

test("orzeczenia-sn: strony SN składają się w akapity, nagłówki i numery stron znikają, indeks górny zostaje", () => {
  const html = "<html><body>"
    + strona(linia(99, 38, sp("III CZP 1/24")), linia(99, 100, sp("Sąd stosuje art. 398") + sp("3 ", "super", 8) + sp("k.p.c. i sędziego-")),
      linia(99, 118, sp("komisarza &amp; skutek")), linia(140, 160, sp("UZASADNIENIE")), linia(99, 200, sp("Akapit ciągnie się")), linia(300, 800, sp("2")))
    + strona(linia(319, 37, sp("2")), linia(99, 87, sp("na następnej stronie.")), linia(140, 110, sp("Nowy akapit.")))
    + strona(linia(99, 38, sp("III CZP 1/243")), linia(99, 100, sp("Koniec.")))
    + "</body></html>";
  assert.equal(tekstZHtml(html, "III CZP 1/24"),
    "Sąd stosuje art. 398^3 k.p.c. i sędziego-komisarza & skutek\n\nUZASADNIENIE\n\nAkapit ciągnie się na następnej stronie.\n\nNowy akapit. Koniec.");
});

test("orzeczenia-sn: Markdown ma metrykę źródła SN, odrzuca pustą treść i nie ma pauz", () => {
  const d = { id: "abc", sygnatura_sprawy: "III CZP 1/24", data_wydania: "2024-05-01", forma_orzeczenia: "uchwała SN", izby_sn: ["Izba Cywilna"] };
  const md = markdown(d, "Teza \u2014 uzasadnienie \u2013 koniec", new Date("2026-11-06"));
  assert.match(md, /^# uchwała SN z 2024-05-01, III CZP 1\/24/);
  assert.match(md, /Źródło: Sąd Najwyższy, https:\/\/repozytorium2\.sn\.pl/);
  assert.match(md, /Przetworzono:/);
  assert.match(md, /Pobrano: 2026-11-06/);
  assert.doesNotMatch(md, /[\u2014\u2013]/);
  assert.throws(() => markdown(d, "   "), /nie ma treści/);
});

// Atrapa API: bez sieci. Odpowiedzi według ścieżki i strony wyników.
function atrapa(trasy) {
  const zapytania = [];
  const oryginal = globalThis.fetch;
  globalThis.fetch = async (url, opcje) => {
    zapytania.push({ url: String(url), czas: Date.now(), ua: opcje?.headers?.["User-Agent"] });
    const u = new URL(url);
    const odp = trasy(u);
    if (odp instanceof Error) throw odp;
    const { status = 200, json, text } = odp;
    return { ok: status < 400, status, json: async () => (json === "zly" ? JSON.parse("{") : json), text: async () => text };
  };
  return { zapytania, przywroc: () => { globalThis.fetch = oryginal; } };
}

test("orzeczenia-sn: kilka orzeczeń z tą samą sygnaturą przerywa pobieranie i podaje id do wyboru", async () => {
  ustawienia.pauzaMs = 0;
  const a = atrapa(() => ({ json: { liczba_stron: 1, strona_wyniki: [
    { sygnatura_sprawy: "V CSK 30/13", data_wydania: "2013-10-17", forma_orzeczenia: "postanowienie SN", id: "p1" },
    { sygnatura_sprawy: "V CSK 30/13", data_wydania: "2013-12-05", forma_orzeczenia: "wyrok SN", id: "w1" },
    { sygnatura_sprawy: "V CSK 30/131", data_wydania: "2014-01-01", forma_orzeczenia: "wyrok SN", id: "inny" }] } }));
  try {
    await assert.rejects(pobierzOrzeczenie("V CSK 30/13"), (e) => /ma 2 orzeczenia/.test(e.message) && /id p1/.test(e.message) && /id w1/.test(e.message) && !/inny/.test(e.message));
    assert.equal(a.zapytania.length, 1, "bez pobierania treści");
    assert.match(a.zapytania[0].ua, /kontakt@aixperts\.pl/);
  } finally { a.przywroc(); }
});

test("orzeczenia-sn: znajdz przegląda wszystkie strony wyników i znosi brak listy", async () => {
  ustawienia.pauzaMs = 0;
  const a = atrapa((u) => ({ json: u.searchParams.get("strona") === "1"
    ? { liczba_stron: 2, strona_wyniki: [{ sygnatura_sprawy: "I CSK 1/20X", id: "x" }] }
    : { liczba_stron: 2, strona_wyniki: [{ sygnatura_sprawy: "i csk  1/20", id: "y", data_wydania: "2020-01-01" }] } }));
  try { assert.deepEqual((await znajdz("I CSK 1/20")).map((x) => x.id), ["y"]); } finally { a.przywroc(); }
  const b = atrapa(() => ({ json: { liczba_stron: 1, strona_wyniki: null } }));
  try { assert.deepEqual(await znajdz("I CSK 1/20"), []); await assert.rejects(pobierzOrzeczenie("I CSK 1/20"), /Brak „I CSK 1\/20” w API SN/); }
  finally { b.przywroc(); }
});

test("orzeczenia-sn: 429, 503, błąd sieci i zły JSON przerywają z czytelnym komunikatem", async () => {
  ustawienia.pauzaMs = 0;
  for (const [odp, wzor] of [[{ status: 429 }, /limit zapytań \(429\)/], [{ status: 503 }, /odpowiedziało 503/], [new Error("ECONNRESET"), /ECONNRESET/], [{ json: "zly" }, /JSON|Expected/]]) {
    const a = atrapa(() => odp);
    try { await assert.rejects(znajdz("I CSK 1/20"), wzor); } finally { a.przywroc(); }
  }
});

test("orzeczenia-sn: między zapytaniami jest pauza", async () => {
  ustawienia.pauzaMs = 60;
  const a = atrapa((u) => (u.pathname.endsWith("/plik/html")
    ? { text: strona(linia(99, 100, sp("Treść orzeczenia."))) }
    : { json: { id: "abc", sygnatura_sprawy: "I CSK 1/20", data_wydania: "2020-01-01", forma_orzeczenia: "wyrok SN" } }));
  try {
    const md = await pobierzOrzeczenie("abc", new Date("2026-11-06"));
    assert.match(md, /Treść orzeczenia\./);
    assert.equal(a.zapytania.length, 2);
    assert.ok(a.zapytania[1].czas - a.zapytania[0].czas >= 55, "co najmniej pauza między zapytaniami");
  } finally { a.przywroc(); ustawienia.pauzaMs = 1000; }
});
