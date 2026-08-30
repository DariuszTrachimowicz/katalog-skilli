import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const KORZEN = dirname(dirname(fileURLToPath(import.meta.url)));
const CONFIG = join(KORZEN, "config.json");
const STRONA = join(KORZEN, "public", "pracownia", "index.html");
const GLOWNA = join(KORZEN, "public", "index.html");
const SITEMAP = join(KORZEN, "public", "sitemap.xml");
const OPIS_SEO = "Twórz gotowe dokumenty w rozmowie, bez instalowania skilli. Pracownia AiXperts prowadzi wywiad i przygotowuje pliki DOCX, PDF i HTML.";
const ADRES_PRACOWNI = "https://skille.aixperts.pl/pracownia/";

let numerBuildu = 0;

async function zbuduj() {
  numerBuildu += 1;
  await import(`${pathToFileURL(join(KORZEN, "build.mjs")).href}?test=${numerBuildu}`);
}

function policz(tekst, fragment) {
  return tekst.split(fragment).length - 1;
}

test("publikuje Pracownię, ale pokazuje ją w katalogu i sitemapie tylko za flagą", async () => {
  const oryginalnyConfig = readFileSync(CONFIG, "utf8");
  const config = JSON.parse(oryginalnyConfig);
  assert.equal(config.pracowniaWKatalogu, false, "flaga ma pozostać wyłączona w repo");

  try {
    await zbuduj();
    const strona = readFileSync(STRONA, "utf8");
    const glownaFalse = readFileSync(GLOWNA, "utf8");
    const sitemapFalse = readFileSync(SITEMAP, "utf8");

    assert.match(strona, /<title>Pracownia AiXperts, dokumenty z rozmowy<\/title>/);
    assert.match(strona, new RegExp(`<meta name="description" content="${OPIS_SEO}">`));
    assert.match(strona, new RegExp(`<link rel="canonical" href="${ADRES_PRACOWNI}">`));
    assert.equal(policz(strona, "<h1>"), 1, "strona ma dokładnie jeden nagłówek H1");
    assert.match(strona, /dokument powstaje w rozmowie, w przeglądarce, bez instalowania czegokolwiek/i);
    assert.match(strona, /DOCX, PDF i HTML/);

    const narzedzia = [
      ["Oferta behawioralna", "Sprzedaż", "1 jednostka", "oferta-behawioralna"],
      ["Procedury KSeF", "Zgodność", "3 jednostki", "ksef-procedury"],
      ["Polityka AI", "Zgodność", "5 jednostek", "polityka-ai"],
      ["Procedura AML", "Zgodność", "5 jednostek", "procedura-aml"],
      ["Opisy produktów", "Treści", "1 jednostka", "opisy-produktow"],
      ["Pismo urzędowe", "Urzędy", "1 jednostka", "pismo-urzedowe"],
      ["Ogłoszenie o pracę", "HR", "1 jednostka", "ogloszenie-o-prace"],
    ];

    for (const [nazwa, kategoria, koszt, slug] of narzedzia) {
      assert.ok(strona.includes(nazwa), `brakuje narzędzia: ${nazwa}`);
      assert.ok(strona.includes(kategoria), `brakuje kategorii: ${kategoria}`);
      assert.ok(strona.includes(koszt), `brakuje kosztu: ${koszt}`);
      assert.ok(
        strona.includes(`https://pracownia.aixperts.pl/public/przyklady/${slug}.html`),
        `brakuje przykładu: ${slug}`,
      );
    }
    assert.equal(policz(strona, ">Zobacz przykład</a>"), 7);

    for (const fragment of [
      "99 zł netto miesięcznie",
      "121,77 zł brutto",
      "20 jednostek",
      "Poprawki i audyt w ramach tej samej sesji nie zużywają dodatkowych jednostek",
      "https://licencje.aixperts.pl/zamow/pracownia?okres=miesiac",
      "data-umami-event=\"zakup\"",
      "data-umami-event-skill=\"pracownia\"",
      "href=\"/#katalog\"",
      "BLIK, kartą lub przelewem",
      "Montonio",
      "Faktura VAT jest wystawiana automatycznie",
      "fikcyjnymi danymi",
      "class=\"disc\"",
      "Wróć do katalogu",
    ]) {
      assert.ok(strona.includes(fragment), `brakuje treści lub atrybutu: ${fragment}`);
    }

    const niedozwoloneZnaki = new RegExp(`[${String.fromCodePoint(0x2013)}${String.fromCodePoint(0x2014)}]`);
    assert.doesNotMatch(strona, niedozwoloneZnaki);
    assert.doesNotMatch(glownaFalse, /href="\/pracownia\/"/);
    assert.doesNotMatch(glownaFalse, /Nie chcesz instalować skilli\?/);
    assert.doesNotMatch(sitemapFalse, /\/pracownia\//);

    writeFileSync(CONFIG, `${JSON.stringify({ ...config, pracowniaWKatalogu: true }, null, 2)}\n`, "utf8");
    await zbuduj();

    const glownaTrue = readFileSync(GLOWNA, "utf8");
    const sitemapTrue = readFileSync(SITEMAP, "utf8");
    assert.match(glownaTrue, /Nie chcesz instalować skilli\? Pracownia robi te dokumenty w przeglądarce, z rozmowy\./);
    assert.match(glownaTrue, /<a class="btn" href="\/pracownia\/">Zobacz Pracownię<\/a>/);
    assert.equal(policz(sitemapTrue, ADRES_PRACOWNI), 1);
  } finally {
    writeFileSync(CONFIG, oryginalnyConfig, "utf8");
    await zbuduj();
  }
});
