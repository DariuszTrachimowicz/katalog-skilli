#!/usr/bin/env node
// Generator serwisu. Czyta foldery ze skillami i produkuje gotowy katalog `public/`.
// Uruchomienie: node build.mjs
//
// Zasada: jeden folder skilla = jeden plik do pobrania + jedna podstrona.
// Nic nie da się rozjechać, bo obie rzeczy powstają z tego samego źródła.

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { zbudujZip } from "./narzedzia/zip.mjs";
import { render, naglowkiPoziom2, frontmatter, lista, esc } from "./narzedzia/markdown.mjs";

const KORZEN = dirname(fileURLToPath(import.meta.url));
const WY = join(KORZEN, "public");
const cfg = JSON.parse(readFileSync(join(KORZEN, "config.json"), "utf8"));
const BAZA = `https://${cfg.domena}`;

const zapisz = (sciezka, tresc) => {
  mkdirSync(dirname(sciezka), { recursive: true });
  writeFileSync(sciezka, tresc);
};

/* ---------- wczytanie skilli ---------- */

function plikiRekurencyjnie(katalog, prefiks = "") {
  const wynik = [];
  for (const wpis of readdirSync(katalog).sort()) {
    if (wpis.startsWith(".") || wpis === "wpis.md") continue;
    const pelna = join(katalog, wpis);
    const wzgledna = prefiks ? `${prefiks}/${wpis}` : wpis;
    if (statSync(pelna).isDirectory()) wynik.push(...plikiRekurencyjnie(pelna, wzgledna));
    else wynik.push({ wzgledna, pelna });
  }
  return wynik;
}

function wczytajSkille() {
  const katalogSkilli = join(KORZEN, "skille");
  if (!existsSync(katalogSkilli)) return [];

  return readdirSync(katalogSkilli)
    .filter((d) => statSync(join(katalogSkilli, d)).isDirectory())
    .sort()
    .map((id) => {
      const folder = join(katalogSkilli, id);
      const sciezkaWpisu = join(folder, "wpis.md");
      if (!existsSync(sciezkaWpisu)) {
        console.warn(`  pomijam ${id} — brak pliku wpis.md`);
        return null;
      }
      const { dane, tresc } = frontmatter(readFileSync(sciezkaWpisu, "utf8"));
      const sekcje = naglowkiPoziom2(tresc);
      const pliki = plikiRekurencyjnie(folder).map((p) => ({
        nazwa: `${id}/${p.wzgledna}`,
        dane: readFileSync(p.pelna),
      }));

      return {
        id,
        ...dane,
        szukaj: lista(dane.szukaj),
        zgodnosc: dane.zgodnosc || {},
        sekcje,
        sekcja: (t) => sekcje.find((s) => s.tytul.toLowerCase() === t.toLowerCase())?.html || "",
        pliki,
      };
    })
    .filter(Boolean);
}

/* ---------- szablon ---------- */

const klasaKat = (k) => "t-" + (k || "").toLowerCase().replace(/[ąĄ]/g, "a").replace(/[^a-z]/g, "");

function strona({ tytul, opis, tresc, sciezka, jsonld = null, skrypt = "" }) {
  const kanoniczny = BAZA + sciezka;
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tytul)}</title>
<meta name="description" content="${esc(opis)}">
<link rel="canonical" href="${kanoniczny}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(tytul)}">
<meta property="og:description" content="${esc(opis)}">
<meta property="og:url" content="${kanoniczny}">
<meta property="og:locale" content="pl_PL">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styl.css">
<link rel="icon" href="/ikona.svg" type="image/svg+xml">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>
<div class="ambient"><i></i><i></i></div>
<header>
  <div class="wrap nav">
    <a class="brand" href="/">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="1.2" y="1.2" width="17.6" height="17.6" rx="4" stroke="#1F2023" stroke-width="1.6"/><path d="M6 10.2l2.6 2.6L14.2 7.2" stroke="#1F2023" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      ${esc(cfg.nazwaSerwisu)}
    </a>
    <nav class="nav-links">
      <a href="/#test">Dobierz skille</a>
      <a href="/#katalog">Katalog</a>
      <a href="${cfg.linkSzkolenia}">Szkolenia</a>
      <a href="/#test" class="btn">Zacznij od testu</a>
    </nav>
  </div>
</header>
${tresc}
<footer>
  <div class="wrap foot">
    <div>${esc(cfg.nazwaSerwisu)} &middot; <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a></div>
    <div><a href="/prywatnosc/">Prywatność</a> &middot; Katalog nie jest powiązany z Anthropic, OpenAI ani Google.</div>
  </div>
</footer>
${skrypt}
</body>
</html>`;
}

function znacznikiZgodnosci(s) {
  return Object.entries(cfg.platformy)
    .map(([k, p]) => {
      const st = s.zgodnosc[k] || "format";
      return `<span class="pf ${st}" title="${esc(p.nazwa)}: ${esc(cfg.statusy[st])}"><i></i>${esc(p.nazwa)}</span>`;
    })
    .join("");
}

/* ---------- strona skilla ---------- */

function stronaSkilla(s) {
  const gotowy = s.status === "gotowy";
  const sekcjeDodatkowe = s.sekcje.filter(
    (x) => !["co robi", "dla kogo", "ile ci to oszczędza", "przykład z życia", "jak po polsku",
             "czego potrzebujesz", "na czym się wywala", "czego ten skill nie robi celowo"].includes(x.tytul.toLowerCase())
  );

  const tresc = `
<main class="wrap">
<article class="art">
  <p class="krusz"><a href="/">Katalog</a> &rarr; <a href="/#katalog">${esc(s.kategoria)}</a></p>
  <h1>${esc(s.nazwa)}</h1>
  <div class="meta">
    <span class="tag ${klasaKat(s.kategoria)}">${esc(s.kategoria)}</span>
    <span class="dot d-${gotowy ? "gotowy" : "wkrotce"}"><i></i>${gotowy ? "Gotowy" : "W przygotowaniu"}</span>
    <span class="dot"><i style="background:#C9C9C6"></i>${esc(s.poziom || "")}</span>
  </div>
  <p class="skrot">${esc(s.skrot)}</p>

  ${["Dla kogo", "Ile Ci to oszczędza", "Przykład z życia", "Jak po polsku", "Czego potrzebujesz"]
    .filter((t) => s.sekcja(t))
    .map((t) => `<section class="blok"><h3>${t}</h3>${s.sekcja(t)}</section>`)
    .join("")}

  <section class="blok"><h3>Gdzie działa</h3>
    <div class="gdzie">
      ${Object.entries(cfg.platformy).map(([k, p]) => {
        const st = s.zgodnosc[k] || "format";
        return `<div><span class="pf ${st}"><i></i>${esc(p.nazwa)}</span><div><strong>${esc(cfg.statusy[st])}</strong> &mdash; ${p.uwaga}</div></div>`;
      }).join("")}
    </div>
    <p style="margin-top:18px;font-size:14px;color:var(--muted)">Plik jest zgodny z otwartym standardem Agent Skills, więc ten sam folder działa w wielu narzędziach. „Format zgodny” znaczy, że powinien zadziałać, ale nie uruchomiliśmy go tam sami — a piszemy tylko o tym, co sprawdziliśmy.</p>
  </section>

  ${["Na czym się wywala", "Czego ten skill nie robi celowo"]
    .filter((t) => s.sekcja(t))
    .map((t) => `<section class="blok"><h3>${t}</h3>${s.sekcja(t)}</section>`)
    .join("")}

  <section class="blok"><h3>Instalacja</h3>
    <div class="steps">
      <div class="step"><b>1</b><div>Pobierz plik <kbd>${s.id}.skill</kbd>.</div></div>
      <div class="step"><b>2</b><div>${Object.values(cfg.platformy).slice(0, 2).map((p) => `<strong>${esc(p.nazwa)}:</strong> ${p.instalacja}`).join(" &nbsp;·&nbsp; ")}</div></div>
      <div class="step"><b>3</b><div>Otwórz nową rozmowę i opisz, czego potrzebujesz. Umiejętność uruchomi się sama — nie musisz jej wywoływać z nazwy.</div></div>
    </div>
  </section>

  ${gotowy
    ? `<div class="dl"><div><b>${s.id}.skill</b><span>Pobranie nie wymaga podawania adresu e-mail</span></div>
       <a class="btn" href="/pobierz/${s.id}.skill" download>Pobierz</a></div>`
    : `<div class="dl"><div><b>W przygotowaniu</b><span>Zrób test doboru — napiszemy, gdy będzie gotowa</span></div>
       <a class="btn ghost" href="/#test">Powiadom mnie</a></div>`}

  ${sekcjeDodatkowe.map((x) => `<section class="blok"><h3>${esc(x.tytul)}</h3>${x.html}</section>`).join("")}

  <p class="disc">Materiał informacyjny. Nie zastępuje porady prawnej, podatkowej ani kadrowej.</p>
  <div class="powrot">
    <a class="btn ghost" href="/#katalog">&larr; Wróć do katalogu</a>
    <a class="btn ghost" href="/#test">Dobierz skille dla siebie</a>
  </div>
</article>
</main>`;

  return strona({
    tytul: s.tytulSeo || `${s.nazwa} — ${cfg.nazwaSerwisu}`,
    opis: s.opisSeo || s.skrot,
    sciezka: `/skill/${s.id}/`,
    tresc,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: s.nazwa,
      description: s.skrot,
      inLanguage: "pl-PL",
      dateModified: s.aktualizacja,
      step: [
        { "@type": "HowToStep", name: "Pobierz plik", text: `Pobierz plik ${s.id}.skill z katalogu.` },
        { "@type": "HowToStep", name: "Wgraj do asystenta", text: "Wgraj plik w ustawieniach umiejętności swojego asystenta AI." },
        { "@type": "HowToStep", name: "Opisz zadanie", text: "Otwórz nową rozmowę i opisz, czego potrzebujesz." },
      ],
    },
  });
}

/* ---------- strona główna ---------- */

function stronaGlowna(skille) {
  const gotowe = skille.filter((s) => s.status === "gotowy").length;

  const karty = skille
    .map(
      (s) => `<a class="card" href="/skill/${s.id}/" data-kat="${esc(s.kategoria)}" data-szukaj="${esc([s.nazwa, s.skrot, ...s.szukaj].join(" ").toLowerCase())}">
      <div class="card-top">
        <span class="tag ${klasaKat(s.kategoria)}">${esc(s.kategoria)}</span>
        <span class="dot d-${s.status === "gotowy" ? "gotowy" : "wkrotce"}"><i></i>${s.status === "gotowy" ? "Gotowy" : "Wkrótce"}</span>
      </div>
      <h3>${esc(s.nazwa)}</h3>
      <p>${esc(s.skrot)}</p>
      <div class="compat">${znacznikiZgodnosci(s)}</div>
      <div class="card-foot"><em>Zobacz &rarr;</em></div>
    </a>`
    )
    .join("");

  const daneQuizu = skille.map((s) => ({ id: s.id, n: s.nazwa, o: s.skrot, t: s.szukaj, g: s.status === "gotowy" }));

  const tresc = `
<section class="hero">
  <div class="wrap">
    <p class="eyebrow">Katalog kuratorowany &middot; aktualizacja ${new Date().toISOString().slice(0, 10)}</p>
    <h1>Co sztuczna inteligencja<br>może zrobić <em>za Ciebie</em><br>w Twojej pracy.</h1>
    <p class="lede">Gotowe umiejętności do pobrania, opisane językiem, którym mówi się w biurze — a nie w dokumentacji technicznej. Jeden plik działa w Claude i ChatGPT. Każdą uruchomiliśmy sami na polskich dokumentach, a jeśli gdzieś nie zadziała, piszemy o tym wprost.</p>
    <div class="hero-cta">
      <a href="#test" class="btn">Dobierz skille dla siebie</a>
      <a href="#katalog" class="btn ghost">Przeglądaj katalog</a>
    </div>
    <p class="hero-note">Test zajmuje minutę. Nie musisz nic instalować, żeby zobaczyć wynik.</p>
    <div class="stats">
      <div class="stat"><b>${skille.length}</b><span>umiejętności opisanych ręcznie — nie zescrapowanych z GitHuba</span></div>
      <div class="stat"><b>${gotowe}</b><span>gotowych do pobrania i sprawdzonych na polskich dokumentach</span></div>
      <div class="stat"><b>0 zł</b><span>za pobranie. Katalog jest i zostanie darmowy</span></div>
    </div>
  </div>
</section>

<section class="sec" id="test">
  <div class="wrap">
    <div class="sec-head">
      <h2>Nie wiesz, czego szukać? Nie musisz.</h2>
      <p>Sześć pytań o Twoją pracę. Na końcu dostajesz zestaw umiejętności dobranych pod to, co robisz na co dzień.</p>
    </div>
    <div class="quiz">
      <div class="quiz-top"><span id="qstep">Pytanie 1 z 6</span><div class="bar"><i id="qbar"></i></div></div>
      <div class="quiz-body" id="qbody"></div>
    </div>
  </div>
</section>

<section class="sec" id="katalog">
  <div class="wrap">
    <div class="sec-head"><h2>Katalog</h2><p>Podzielony według tego, czym się zajmujesz — nie według tego, jak działa od środka.</p></div>
    <div class="legend">
      <span><i style="background:#4F8A55"></i>przetestowane przez nas</span>
      <span><i style="background:#C79A2E"></i>format zgodny, nietestowane</span>
      <span><i style="background:#C0605E"></i>niedostępne w Polsce</span>
    </div>
    <div class="filters" id="filters"></div>
    <div class="searchrow">
      <div class="search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5.2" stroke="#1F2023" stroke-width="1.6"/><path d="M11 11l3.4 3.4" stroke="#1F2023" stroke-width="1.6" stroke-linecap="round"/></svg>
        <label for="q" class="sr-only" style="position:absolute;left:-9999px">Szukaj</label>
        <input id="q" type="text" placeholder="Wpisz, co chcesz zrobić — np. sprawdzić umowę, ogarnąć faktury">
      </div>
      <div class="count" id="count"></div>
    </div>
    <div class="grid" id="grid">${karty}</div>
  </div>
</section>

<section class="sec">
  <div class="wrap"><div class="cta">
    <h2>Możesz to wdrożyć sam. Albo zrobimy to razem.</h2>
    <p>Katalog jest darmowy i zostanie darmowy. Ale samo pobranie pliku to dopiero początek — najwięcej zmienia się wtedy, gdy zespół wie, kiedy tego użyć, a kiedy nie.</p>
    <a href="${cfg.linkSzkolenia}" class="btn">Zobacz terminy szkoleń</a>
  </div></div>
</section>`;

  const skrypt = `<script>
const SKILLE=${JSON.stringify(daneQuizu)};
const KATEGORIE=${JSON.stringify(["Wszystkie", ...cfg.kategorie])};
${readFileSync(join(KORZEN, "szablony", "strona.js"), "utf8")}
</script>`;

  return strona({
    tytul: `${cfg.nazwaSerwisu} — katalog umiejętności AI po polsku`,
    opis: cfg.opisSerwisu,
    sciezka: "/",
    tresc,
    skrypt,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: cfg.nazwaSerwisu,
      description: cfg.opisSerwisu,
      inLanguage: "pl-PL",
      url: BAZA + "/",
    },
  });
}

/* ---------- strona prywatności ---------- */

function stronaPrywatnosci() {
  const tresc = `<main class="wrap"><article class="art">
  <p class="krusz"><a href="/">Katalog</a> &rarr; Prywatność</p>
  <h1>Prywatność</h1>
  <p class="skrot">Krótko, bo naprawdę niewiele tu się dzieje.</p>
  <section class="blok"><h3>Co zbieramy</h3>
    <p>Wyłącznie adres e-mail, i tylko wtedy, gdy sam go podasz na końcu testu doboru. Razem z nim zapisujemy listę umiejętności, które wyszły Ci w wyniku — po to, żeby móc wysłać Ci właściwy zestaw.</p>
    <p>Pobranie pliku nie wymaga podania żadnych danych. Przeglądanie katalogu też nie.</p></section>
  <section class="blok"><h3>Gdzie to trafia</h3>
    <p>Na nasz własny serwer w Unii Europejskiej. Nie korzystamy z zewnętrznej platformy do zarządzania listą adresową, więc Twój adres nie jest przekazywany żadnej firmie trzeciej w celach marketingowych.</p>
    <p>Do samego wysłania wiadomości używamy dostawcy poczty — inaczej maile trafiałyby do spamu.</p></section>
  <section class="blok"><h3>Potwierdzenie zapisu</h3>
    <p>Po podaniu adresu dostajesz wiadomość z linkiem potwierdzającym. Dopóki w niego nie klikniesz, nie wyślemy Ci nic więcej. Jeśli ktoś wpisał Twój adres przez pomyłkę, wystarczy zignorować tę jedną wiadomość.</p></section>
  <section class="blok"><h3>Jak się wypisać</h3>
    <p>Link do wypisania jest w stopce każdej wiadomości i działa od razu, bez pytań i bez logowania. Możesz też napisać na <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a> — usuwamy adres wraz z całą historią.</p></section>
  <section class="blok"><h3>Ciasteczka</h3>
    <p>Nie używamy ciasteczek śledzących ani zewnętrznych narzędzi analitycznych. Wyniki testu trzymamy w pamięci Twojej przeglądarki, żeby nie znikały przy przewijaniu strony — nie wychodzą one nigdzie poza Twoje urządzenie, dopóki sam nie klikniesz „wyślij".</p></section>
  <div class="powrot"><a class="btn ghost" href="/">&larr; Wróć do katalogu</a></div>
</article></main>`;
  return strona({ tytul: `Prywatność — ${cfg.nazwaSerwisu}`, opis: "Jakie dane zbiera katalog i co się z nimi dzieje.", sciezka: "/prywatnosc/", tresc });
}

/* ---------- build ---------- */

console.log("Buduję serwis...\n");
rmSync(WY, { recursive: true, force: true });
mkdirSync(WY, { recursive: true });

const skille = wczytajSkille();
if (!skille.length) {
  console.error("Nie znaleziono żadnych skilli w katalogu skille/. Przerywam.");
  process.exit(1);
}

// Metryczka pochodzenia — wstrzykiwana do frontmattera SKILL.md przy pakowaniu.
// Pole `metadata` jest częścią standardu Agent Skills (platformy je ignorują,
// walidator dopuszcza), a paczka niesie swoje źródło, gdy krąży poza katalogiem.
function zMetryczka(plik, s) {
  const tekst = plik.dane.toString("utf8");
  const koniec = tekst.indexOf("\n---", 3);
  if (koniec === -1 || tekst.includes("\nmetadata:")) return plik;
  const metryczka = `metadata:
  katalog: "${cfg.nazwaSerwisu}"
  autor: "${cfg.autor}"
  zrodlo: "${BAZA}/skill/${s.id}/"
  kontakt: "${cfg.mailKontaktowy}"
  aktualizacja: "${s.aktualizacja}"
`;
  return { ...plik, dane: Buffer.from(tekst.slice(0, koniec + 1) + metryczka + tekst.slice(koniec + 1), "utf8") };
}

// paczki .skill
for (const s of skille) {
  if (s.status !== "gotowy") continue;
  const zip = zbudujZip(s.pliki.map((p) => (p.nazwa === `${s.id}/SKILL.md` ? zMetryczka(p, s) : p)));
  zapisz(join(WY, "pobierz", `${s.id}.skill`), zip);
  console.log(`  paczka  /pobierz/${s.id}.skill  (${s.pliki.length} plików, ${(zip.length / 1024).toFixed(1)} KB)`);
}

// strony
zapisz(join(WY, "index.html"), stronaGlowna(skille));
console.log("  strona  /");
for (const s of skille) {
  zapisz(join(WY, "skill", s.id, "index.html"), stronaSkilla(s));
  console.log(`  strona  /skill/${s.id}/`);
}
zapisz(join(WY, "prywatnosc", "index.html"), stronaPrywatnosci());
console.log("  strona  /prywatnosc/");

// zasoby
cpSync(join(KORZEN, "szablony", "styl.css"), join(WY, "styl.css"));
cpSync(join(KORZEN, "szablony", "ikona.svg"), join(WY, "ikona.svg"));

// dane dla usługi zapisów — żeby mail z zestawem znał nazwy i adresy skilli
zapisz(
  join(WY, "dane", "skille.json"),
  JSON.stringify(
    skille.map((s) => ({ id: s.id, nazwa: s.nazwa, skrot: s.skrot, gotowy: s.status === "gotowy" })),
    null,
    2
  )
);

// sitemap i robots
const adresy = ["/", "/prywatnosc/", ...skille.map((s) => `/skill/${s.id}/`)];
zapisz(
  join(WY, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    adresy.map((u) => `  <url><loc>${BAZA}${u}</loc></url>`).join("\n") +
    `\n</urlset>\n`
);
zapisz(join(WY, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${BAZA}/sitemap.xml\n`);

console.log(`\nGotowe. ${skille.length} skilli, ${adresy.length} podstron, katalog public/`);
if (cfg.domena.includes("PODMIEN")) {
  console.log("\nUWAGA: w config.json nie ustawiono jeszcze domeny — sitemap i adresy kanoniczne są tymczasowe.");
}
