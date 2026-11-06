// Orzeczenia Sądu Najwyższego z oficjalnego API SN (https://repozytorium2.sn.pl, opis: https://www.sn.pl/pl/web-api).
// Warunki SN: bez konta; limit zapytań (HTTP 429); obowiązek wskazania źródła (SN i repozytorium2.sn.pl);
// oznaczenie przetworzenia; nie sugerować aprobaty SN; dane weryfikować samodzielnie.
// Dlatego: jedno zapytanie naraz, pauza między zapytaniami, przedstawiający się User-Agent, metryka źródła w każdym pliku.
//
// Użycie (z katalogu katalog-skilli):
//   node narzedzia/orzeczenia-sn.mjs szukaj [--sygnatura "III CZP 84/22"] [--tresc "zadatek"] [--forma "uchwała SN"]
//        [--izba "Izba Cywilna"] [--od 2020-01-01] [--do 2026-12-31] [--limit 20] [--json]
//   node narzedzia/orzeczenia-sn.mjs sprawdz "I CSK 3442/24" "III CZP 84/22" ...   (czy istnieją, data, forma, id)
//   node narzedzia/orzeczenia-sn.mjs pobierz <sygnatura albo id> [--plik sciezka.md]
//     Gdy sygnatura ma kilka orzeczeń (np. postanowienie i wyrok), narzędzie przerywa i podaje id do wyboru.
import { writeFileSync } from "node:fs";

const API = "https://repozytorium2.sn.pl/api/v1/orzeczenia";
const UA = "AiXperts-katalog-skilli/1.0 (+https://skille.aixperts.pl; kontakt@aixperts.pl)";
const ZRODLO = "Źródło: Sąd Najwyższy, https://repozytorium2.sn.pl (dane zanonimizowane). Przetworzono: tekst wyodrębniony automatycznie z pliku HTML SN, układ graficzny pominięty, indeksy górne zapisane jako ^ (np. art. 398^3).";
export const ustawienia = { pauzaMs: 1000 };

let ostatnie = 0;
export async function pobierzZApi(url, jakoTekst = false) {
  const czekaj = ostatnie + ustawienia.pauzaMs - Date.now();
  if (czekaj > 0) await new Promise((r) => setTimeout(r, czekaj));
  ostatnie = Date.now();
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: jakoTekst ? "text/html" : "application/json" }, signal: AbortSignal.timeout(30000) });
  if (r.status === 429) throw new Error("API SN: przekroczony limit zapytań (429). Odczekaj kilka minut i spróbuj ponownie.");
  if (!r.ok) throw new Error(`API SN odpowiedziało ${r.status} dla ${url}`);
  return jakoTekst ? r.text() : r.json();
}

export function zapytanie(o) {
  for (const k of ["sygnatura", "tresc", "forma", "izba", "od", "do", "limit"])
    if (o[k] === true) throw new Error(`Brak wartości dla --${k}.`);
  const limit = o.limit === undefined ? 20 : Number(o.limit);
  if (!Number.isInteger(limit) || limit < 1 || limit > 200) throw new Error("--limit musi być liczbą całkowitą od 1 do 200.");
  for (const k of ["od", "do"]) if (o[k] && !/^\d{4}-\d{2}-\d{2}$/.test(o[k])) throw new Error(`--${k} w formacie RRRR-MM-DD.`);
  if (!o.sygnatura && !o.tresc && !o.forma && !o.izba && !o.od && !o.do) throw new Error("Podaj co najmniej jedno kryterium, np. --sygnatura albo --tresc.");
  const q = new URLSearchParams({ strona: String(o.strona || 1), rozmiar_strony: String(limit) });
  const mapa = { sygnatura: "sygnatura", tresc: "tresc", forma: "forma_orzeczenia", izba: "izba", od: "data_wydania_od", do: "data_wydania_do" };
  for (const [k, p] of Object.entries(mapa)) if (o[k]) q.set(p, o[k]);
  return q;
}

const encje = (s) => s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

// HTML SN to strony z liniami pozycjonowanymi bezwzględnie (left, top). Składamy linie w kolejności czytania, a linie
// w akapity: większa przerwa pionowa albo wcięcie zaczyna nowy akapit, przejście na nową stronę kontynuuje akapit.
// Nagłówek strony (sygnatura albo sam numer strony u góry) i numer strony u dołu pomijamy.
// Łącznika na końcu linii nie usuwamy: nie da się odróżnić podziału wyrazu od wyrazu złożonego (sędziego-komisarza).
export function tekstZHtml(html, sygnatura = "") {
  const akapity = [];
  let poprzedni = null;
  for (const strona of html.split(/<div class='pg'/).slice(1)) {
    const linie = new Map();
    for (const m of strona.matchAll(/<div class="txt" style="[^"]*?left:(\d+)px; top:(\d+)px;[^"]*">([\s\S]*?)<\/div>/g)) {
      const top = Number(m[2]);
      const tekst = encje(m[3].replace(/<span[^>]*vertical-align:super[^>]*>([\s\S]*?)<\/span>/g, (_, x) => `^${x.trim()}${/\s$/.test(x) ? " " : ""}`).replace(/<[^>]+>/g, ""));
      if (!tekst.trim()) continue;
      const klucz = [...linie.keys()].find((t) => Math.abs(t - top) <= 3) ?? top;
      (linie.get(klucz) || linie.set(klucz, []).get(klucz)).push([Number(m[1]), tekst]);
    }
    const posortowane = [...linie.entries()].sort((a, b) => a[0] - b[0])
      .map(([top, cz]) => ({ top, left: Math.min(...cz.map((c) => c[0])), tekst: cz.sort((a, b) => a[0] - b[0]).map((c) => c[1]).join("").replace(/\s+/g, " ").trim() }))
      .filter((l, i, a) => !(i === 0 && l.top < 60 && (/^\d{1,3}$/.test(l.tekst) || (sygnatura && l.tekst.startsWith(sygnatura))))
        && !(i === a.length - 1 && /^\d{1,3}$/.test(l.tekst)));
    if (!posortowane.length) continue;
    const lewa = Math.min(...posortowane.map((l) => l.left));
    let pierwsza = true;
    for (const l of posortowane) {
      const nowy = !poprzedni || l.left > lewa + 15 || (!pierwsza && l.top - poprzedni.top > 26);
      if (nowy) akapity.push(l.tekst);
      else {
        const ost = akapity[akapity.length - 1];
        akapity[akapity.length - 1] = /-$/.test(ost) ? ost + l.tekst : ost + " " + l.tekst;
      }
      poprzedni = l;
      pierwsza = false;
    }
  }
  return akapity.join("\n\n");
}

export function markdown(d, tekst, teraz = new Date()) {
  if (!tekst.trim()) throw new Error(`Orzeczenie ${d.sygnatura_sprawy} nie ma treści w pliku SN; tezy nie da się z nim porównać.`);
  const metryka = [
    `# ${d.forma_orzeczenia} z ${d.data_wydania}, ${d.sygnatura_sprawy}`,
    "",
    `- Izba: ${(d.izby_sn || []).join(", ") || d.jednostka_obslugujaca_sprawe || "brak w danych SN"}`,
    d.rodzaj_skladu_orzekajacego ? `- Skład: ${d.rodzaj_skladu_orzekajacego}` : "",
    `- ${ZRODLO}`,
    `- Plik źródłowy: ${API}/${d.id}/plik/html`,
    `- Pobrano: ${teraz.toISOString().slice(0, 10)}. Przed powołaniem się w skillu potwierdź aktualność linii orzeczniczej.`,
    "",
  ].filter(Boolean);
  // Pauzy i półpauzy na dywiz (reguła domu: zero długich myślników w materiałach skilli).
  return (metryka.join("\n") + "\n\n" + tekst.trim() + "\n").replace(/[\u2014\u2013]/g, "-");
}

const norm = (s) => String(s || "").replace(/\s+/g, " ").trim().toUpperCase();

// Wszystkie dokładne dopasowania sygnatury (API szuka też podobnych), ze wszystkich stron wyników.
export async function znajdz(sygnatura) {
  const wynik = [];
  for (let strona = 1; ; strona++) {
    const j = await pobierzZApi(`${API}?${zapytanie({ sygnatura, limit: 200, strona })}`);
    wynik.push(...(j.strona_wyniki || []).filter((x) => norm(x.sygnatura_sprawy) === norm(sygnatura)));
    if (strona >= (j.liczba_stron || 1)) return wynik;
  }
}

export async function pobierzOrzeczenie(cel, teraz = new Date()) {
  let id = cel;
  if (/\s/.test(cel) || cel.includes("/")) {
    const w = await znajdz(cel);
    if (!w.length) throw new Error(`Brak „${cel}” w API SN.`);
    if (w.length > 1) throw new Error(`Sygnatura ${cel} ma ${w.length} orzeczenia. Wybierz to, którego dotyczy teza, i pobierz po id:\n`
      + w.map((x) => `  ${x.data_wydania} | ${x.forma_orzeczenia} | id ${x.id}`).join("\n"));
    id = w[0].id;
  }
  const d = await pobierzZApi(`${API}/${encodeURIComponent(id)}`);
  const html = await pobierzZApi(`${API}/${encodeURIComponent(id)}/plik/html`, true);
  return markdown(d, tekstZHtml(html, d.sygnatura_sprawy), teraz);
}

function argumenty(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) { const k = argv[i].slice(2); o[k] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true; }
    else o._.push(argv[i]);
  }
  return o;
}

async function main() {
  const o = argumenty(process.argv.slice(2));
  const [komenda, ...reszta] = o._;
  if (komenda === "szukaj") {
    const j = await pobierzZApi(`${API}?${zapytanie(o)}`);
    const lista = j.strona_wyniki || [];
    if (o.json) return console.log(JSON.stringify(lista, null, 2));
    console.log(`Znaleziono: ${j.liczba_wynikow ?? lista.length} (pokazuję ${lista.length}).`);
    for (const x of lista) console.log(`${x.data_wydania} | ${x.sygnatura_sprawy} | ${x.forma_orzeczenia} | id ${x.id}`);
    return;
  }
  if (komenda === "sprawdz" && reszta.length) {
    for (const s of reszta) {
      const w = await znajdz(s);
      console.log(`${s} | ${w.length ? w.map((x) => `${x.data_wydania} ${x.forma_orzeczenia} id ${x.id}`).join("; ") : "BRAK w API SN"}`);
    }
    return;
  }
  if (komenda === "pobierz" && reszta[0]) {
    const md = await pobierzOrzeczenie(reszta.join(" "));
    if (o.plik) { writeFileSync(o.plik, md); console.log(`Zapisano ${o.plik} (${md.length} znaków).`); }
    else process.stdout.write(md);
    return;
  }
  console.log("Użycie: node narzedzia/orzeczenia-sn.mjs szukaj --sygnatura ... | --tresc ... ; sprawdz <sygnatura> ... ; pobierz <sygnatura|id> [--plik x.md]");
  process.exitCode = 1;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop())) {
  main().catch((e) => { console.error(e.message); process.exitCode = 1; });
}
