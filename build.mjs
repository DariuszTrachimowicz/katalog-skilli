#!/usr/bin/env node
// Generator serwisu. Czyta foldery ze skillami i produkuje gotowy katalog `public/`.
// Uruchomienie: node build.mjs
//
// Zasada: jeden folder skilla = jeden plik do pobrania + jedna podstrona.
// Nic nie da się rozjechać, bo obie rzeczy powstają z tego samego źródła.

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
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

// Wersja arkuszy w adresie (?v=skrót treści), arkusze mają tygodniowy cache,
// a bez tego zmiana stylu przy nowym HTML-u rozjeżdża strony u wracających.
const wersja = (p) => createHash("md5").update(readFileSync(join(KORZEN, "szablony", p))).digest("hex").slice(0, 8);
const W_STYL = wersja("styl.css");
const W_FONTY = wersja("fonty.css");

const MIESIACE = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
  "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];

function dataPoPolsku(d) {
  return `${d.getDate()} ${MIESIACE[d.getMonth()]} ${d.getFullYear()}`;
}

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
        console.warn(`  pomijam ${id}, brak pliku wpis.md`);
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
        wersja: dane.wersja || "",
        sekcje,
        sekcja: (t) => sekcje.find((s) => s.tytul.toLowerCase() === t.toLowerCase())?.html || "",
        pliki,
      };
    })
    .filter(Boolean);
}

/* ---------- szablon ---------- */

const klasaKat = (k) => "t-" + (k || "").toLowerCase().replace(/[ąĄ]/g, "a").replace(/[^a-z]/g, "");

// Płatny skill = wpis z `platny: true`. Jeśli ma `linkOferty`, karta prowadzi
// do zewnętrznej oferty; bez niego generujemy stronę oferty w katalogu.
const jestPlatny = (s) => String(s.platny) === "true";
const maStroneWKatalogu = (s) => !jestPlatny(s) || !s.linkOferty;

function strona({ tytul, opis, tresc, sciezka, jsonld = null, skrypt = "", obrazek = "katalog.png" }) {
  const kanoniczny = BAZA + sciezka;
  const adresObrazka = `${BAZA}/og/${obrazek}`;
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
<meta property="og:site_name" content="${esc(cfg.nazwaSerwisu)}">
<meta property="og:image" content="${adresObrazka}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(tytul)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${adresObrazka}">
<link rel="stylesheet" href="/fonty.css?v=${W_FONTY}">
<link rel="stylesheet" href="/styl.css?v=${W_STYL}">
<link rel="icon" href="/ikona.png" type="image/png">
<link rel="apple-touch-icon" href="/ikona.png">
${cfg.analityka ? `<script defer src="${cfg.analityka.skrypt}" data-website-id="${cfg.analityka.idSerwisu}"></script>` : ""}
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>
<div class="ambient"><i></i><i></i></div>
<header>
  <div class="wrap nav">
    <a class="brand" href="/">
      <img src="/ikona.png" width="40" height="40" alt="" aria-hidden="true">
      <span class="brand-txt">${esc(cfg.nazwaSerwisu)}<img class="brand-wordmark" src="/logo-wordmark-czarny.png" width="42" height="10" alt="AI Xperts"></span>
    </a>
    <button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-linki"><i></i><i></i><i></i></button>
    <nav class="nav-links" id="nav-linki">
      <a href="https://aixperts.pl/">Strona główna</a>
      <a href="${cfg.linkSzkolenia}">Warsztaty</a>
      <a href="https://aixperts.pl/wiedza/">Wiedza</a>
      <a href="/#katalog">Skille</a>
      <a href="/#test" class="btn">Zacznij od testu</a>
    </nav>
  </div>
</header>
<script>(function(){var b=document.querySelector(".burger");if(!b)return;b.addEventListener("click",function(){var h=document.querySelector("header");var o=h.classList.toggle("otwarte");b.setAttribute("aria-expanded",o)});document.querySelectorAll(".nav-links a").forEach(function(a){a.addEventListener("click",function(){document.querySelector("header").classList.remove("otwarte");b.setAttribute("aria-expanded","false")})})})();</script>
${tresc}
<footer>
  <div class="wrap foot">
    <div>${esc(cfg.nazwaSerwisu)} &middot; <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a></div>
    <div>Twórca: ${esc(cfg.autor)} &middot; Skille na licencji <a href="${cfg.urlLicencji}" rel="license">${esc(cfg.licencja)}</a></div>
    <div><a href="/regulamin/">Regulamin</a> &middot; <a href="/prywatnosc/">Prywatność</a> &middot; Katalog nie jest powiązany z Anthropic, OpenAI ani Google.</div>
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

function sekcjaGdzieDziala(s) {
  return `
  <section class="blok"><h3>Gdzie działa</h3>
    <div class="gdzie">
      ${Object.entries(cfg.platformy).map(([k, p]) => {
        const st = s.zgodnosc[k] || "format";
        return `<div><span class="pf ${st}"><i></i>${esc(p.nazwa)}</span><div><strong>${esc(cfg.statusy[st])}</strong>, ${p.uwaga}</div></div>`;
      }).join("")}
    </div>
    <p style="margin-top:18px;font-size:14px;color:var(--muted)">Plik jest zgodny z otwartym standardem Agent Skills, więc ten sam folder działa w wielu narzędziach. „Działa z zastrzeżeniami” znaczy, że w naszym teście na tej platformie wynik był użyteczny, ale z odstępstwami opisanymi w raporcie testu; piszemy tylko o tym, co sprawdziliśmy.</p>
  </section>`;
}

/* ---------- nadawca: winietka i podpis (motyw, runda 2) ---------- */

// Winietka nadawcy na górze każdej podstrony (koncept D, docs/motyw-pl/napis/e2-brand.md).
const NADAWCA = `<div class="nadawca"><span class="n-nazwa">Skille <b>AI</b></span><i></i><span class="n-haslo">Pisane od zera pod polskie realia</span></div>`;

// Mała pieczątka do bloku podpisu na ofertach (koncept B, e4-artdirector.md).
const STEMPEL_OFERTY = `<svg class="p-stempel" viewBox="0 0 200 200" aria-hidden="true">
  <defs>
    <path id="pkrag" d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"/>
    <filter id="ptusz" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="11" result="szum"/>
      <feColorMatrix in="szum" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.6 -0.25" result="maska"/>
      <feComposite in="SourceGraphic" in2="maska" operator="in"/>
    </filter>
  </defs>
  <g filter="url(#ptusz)" fill="none" stroke="#9F2F2D">
    <circle cx="100" cy="100" r="94" stroke-width="4"/>
    <circle cx="100" cy="100" r="87" stroke-width="1.6"/>
    <circle cx="100" cy="100" r="50" stroke-width="1.6"/>
    <text fill="#9F2F2D" stroke="none" font-family="'IBM Plex Mono',monospace" font-size="13" font-weight="500" letter-spacing="2.6">
      <textPath href="#pkrag">ORYGINAŁ · PISANE OD ZERA · ORYGINAŁ ·</textPath>
    </text>
    <text x="100" y="110" fill="#9F2F2D" stroke="none" text-anchor="middle" font-family="'Instrument Serif',Georgia,serif" font-size="50">PL</text>
    <path d="M78,124 C90,120.5 112,120 122,122" stroke-width="3.2" stroke-linecap="round"/>
  </g>
</svg>`;

const PODPIS_OFERTY = `<div class="podpis-oferty"><span class="p-nazwa">Skille <b>AI</b></span>${STEMPEL_OFERTY}</div>`;

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
  ${NADAWCA}
  <p class="krusz"><a href="/">Katalog</a> &rarr; <a href="/#katalog">${esc(s.kategoria)}</a></p>
  <h1>${esc(s.nazwa)}</h1>
  <div class="meta">
    <span class="tag ${klasaKat(s.kategoria)}">${esc(s.kategoria)}</span>
    <span class="dot d-${gotowy ? "gotowy" : "wkrotce"}"><i></i>${gotowy ? "Gotowy" : "W przygotowaniu"}</span>
    <span class="dot"><i style="background:#C9C9C6"></i>${esc(s.poziom || "")}</span>
    ${s.wersja ? `<span class="dot" title="wersja skilla"><i style="background:#C9C9C6"></i>wersja ${esc(s.wersja)}</span>` : ""}
    ${s.sekcja("Jak po polsku")
      ? `<a class="pl-znak" href="#po-polsku" title="Pisany od zera pod polskie realia"><b>PL</b> na polskie realia</a>`
      : `<span class="pl-znak" title="Pisany od zera pod polskie realia"><b>PL</b> na polskie realia</span>`}
  </div>
  <p class="skrot">${esc(s.skrot)}</p>
  <h2 class="sr-only">Szczegóły umiejętności</h2>

  ${["Dla kogo", "Ile Ci to oszczędza", "Przykład z życia", "Jak po polsku", "Czego potrzebujesz"]
    .filter((t) => s.sekcja(t))
    .map((t) => `<section class="blok"${t === "Jak po polsku" ? ` id="po-polsku"` : ""}><h3>${t}</h3>${s.sekcja(t)}</section>`)
    .join("")}

  ${sekcjaGdzieDziala(s)}

  ${["Na czym się wywala", "Czego ten skill nie robi celowo"]
    .filter((t) => s.sekcja(t))
    .map((t) => `<section class="blok"><h3>${t}</h3>${s.sekcja(t)}</section>`)
    .join("")}

  <section class="blok"><h3>Instalacja</h3>
    <div class="steps">
      <div class="step"><b>1</b><div>Podaj e-mail w polu niżej, wyślemy link do pliku <kbd>${s.id}.skill</kbd>.</div></div>
      <div class="step"><b>2</b><div>${Object.values(cfg.platformy).slice(0, 2).map((p) => `<strong>${esc(p.nazwa)}:</strong> ${p.instalacja}`).join(" &nbsp;·&nbsp; ")}</div></div>
      <div class="step"><b>3</b><div>Otwórz nową rozmowę i opisz, czego potrzebujesz. Umiejętność uruchomi się sama, nie musisz jej wywoływać z nazwy.</div></div>
    </div>
  </section>

  ${gotowy
    ? `<p class="motyw-pasek">Pisany od zera pod polskie realia &middot; testowany przez nas${s.wersja ? ` &middot; wersja ${esc(s.wersja)}` : ""}</p>
  ${formularzPobrania(s.id, `${s.id}.skill`)}`
    : `<div class="dl"><div><b>W przygotowaniu</b><span>Zrób test doboru, napiszemy, gdy będzie gotowa</span></div>
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
    tytul: s.tytulSeo || `${s.nazwa}, ${cfg.nazwaSerwisu}`,
    opis: s.opisSeo || s.skrot,
    sciezka: `/skill/${s.id}/`,
    obrazek: existsSync(join(KORZEN, "szablony", "og", `${s.id}.png`)) ? `${s.id}.png` : "katalog.png",
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

/* ---------- bramka mailowa pobrań ---------- */

// Zamiast bezposredniego linku do .skill: e-mail -> mail z linkiem pobrania.
// Nic nie schodzi z katalogu bez adresu; link w mailu weryfikuje adres.
const SKRYPT_POBRANIA = `<script>window.poprosOPaczke||(window.poprosOPaczke=async function(f,skill){
var b=f.querySelector("button");b.disabled=true;b.textContent="Wysyłam…";
try{var o=await fetch("/api/pobranie",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:f.email.value,skill:skill})});
var d=await o.json().catch(function(){return{}});
if(o.ok){f.closest(".dl").outerHTML='<div class="dl dl-ok"><div><b>Sprawdź skrzynkę</b><span>Link do pobrania poleciał na Twój adres. Nie widzisz go po minucie? Zajrzyj do spamu.</span></div></div>';}
else{b.disabled=false;b.textContent="Wyślij link";f.querySelector("input").setCustomValidity(d.blad||"Nie udało się wysłać");f.reportValidity();setTimeout(function(){f.querySelector("input").setCustomValidity("")},2500);}
}catch(e){b.disabled=false;b.textContent="Spróbuj ponownie";}
return false;});</script>`;

function formularzPobrania(idPaczki, etykieta, { trial = false } = {}) {
  return `<div class="dl"><div><b>${esc(etykieta)}</b><span>Podaj e-mail, wyślemy link do pobrania${trial ? " wersji trialowej" : ""}</span></div>
    <form class="dl-form" onsubmit="return poprosOPaczke(this,'${idPaczki}')">
      <input type="email" name="email" required placeholder="twoj@adres.pl" autocomplete="email" aria-label="Adres e-mail do wysyłki linku">
      <button class="btn" data-umami-event="prosba-o-paczke" data-umami-event-skill="${idPaczki}">Wyślij link</button>
    </form></div>
  <p class="dl-rodo">Adres posłuży do dostarczenia pliku i odnotowania pobrania, szczegóły w <a href="/prywatnosc/">polityce prywatności</a>.</p>
  ${SKRYPT_POBRANIA}`;
}

/* ---------- strona oferty (płatny skill) ---------- */

// Strona oferty żyje w tej samej subdomenie i szablonie co strony skilli
// (ten sam nagłówek, stopka, styl). Treść oferty pochodzi z pliku
// `skille/<id>/oferta.html` (klasy katalogu). Dzięki temu płatny skill
// wygląda jak reszta katalogu, a nie jak osobny landing.
function stronaOferty(s) {
  const plik = join(KORZEN, "skille", s.id, "oferta.html");
  const cialo = existsSync(plik)
    ? readFileSync(plik, "utf8")
    : `<section class="blok"><p>${esc(s.skrot)}</p></section>`;

  const tresc = `
<main class="wrap">
<article class="art oferta">
  ${NADAWCA}
  <p class="krusz"><a href="/">Katalog</a> &rarr; <a href="/#katalog">${esc(s.kategoria)}</a></p>
  <h1>${esc(s.nazwa)}</h1>
  <div class="pl-pasek" role="presentation"></div>
  <div class="meta">
    <span class="tag ${klasaKat(s.kategoria)}">${esc(s.kategoria)}</span>
    <span class="dot d-platny"><i></i>${esc(s.cena || "Płatny")}</span>
    <span class="dot"><i style="background:#C9C9C6"></i>${esc(s.poziom || "")}</span>
    ${s.wersja ? `<span class="dot" title="wersja skilla"><i style="background:#C9C9C6"></i>wersja ${esc(s.wersja)}</span>` : ""}
    <span class="pl-znak" title="Pisany od zera pod polskie realia"><b>PL</b> na polskie realia</span>
  </div>
  <p class="skrot">${esc(s.skrot)}</p>
  <h2 class="sr-only">Oferta</h2>
  <div class="oferta-akcje">
    <a class="btn" href="https://licencje.aixperts.pl/zamow/${s.id}" data-umami-event="zakup" data-umami-event-skill="${s.id}">Kup teraz (${esc(s.cena || "cena w ofercie")})</a>
    <span class="dl-rodo">Skill napisany od zera pod polskie realia i audytowany po polsku. Płatność online (BLIK, przelew, karta) albo faktura proforma. Klucz licencji i paczka przychodzą mailem.</span>
  </div>
  ${existsSync(join(KORZEN, "paczki-zewnetrzne", `${s.id}-trial.skill`))
    ? formularzPobrania(`${s.id}-trial`, "Wypróbuj za darmo: wersja trialowa", { trial: true })
    : ""}
  ${cialo}
  ${sekcjaGdzieDziala(s)}
  ${PODPIS_OFERTY}
  <p class="disc">Materiał informacyjny. Nie zastępuje porady prawnej, podatkowej ani kadrowej.</p>
  <div class="powrot">
    <a class="btn ghost" href="/#katalog">&larr; Wróć do katalogu</a>
    <a class="btn ghost" href="/#test">Dobierz skille dla siebie</a>
  </div>
</article>
</main>`;

  return strona({
    tytul: s.tytulSeo || `${s.nazwa}, ${cfg.nazwaSerwisu}`,
    opis: s.opisSeo || s.skrot,
    sciezka: `/skill/${s.id}/`,
    obrazek: existsSync(join(KORZEN, "szablony", "og", `${s.id}.png`)) ? `${s.id}.png` : "katalog.png",
    tresc,
  });
}

/* ---------- strona główna ---------- */

function stronaGlowna(skille) {
  const gotowe = skille.filter((s) => s.status === "gotowy").length;

  const karty = skille
    .map((s) => {
      const platny = jestPlatny(s);
      const href = platny ? (s.linkOferty ? esc(s.linkOferty) : `/skill/${s.id}/`) : `/skill/${s.id}/`;
      const znacznik = platny
        ? `<span class="dot d-platny"><i></i>${esc(s.cena || "Płatny")}</span>`
        : `<span class="dot d-${s.status === "gotowy" ? "gotowy" : "wkrotce"}"><i></i>${s.status === "gotowy" ? "Gotowy" : "Wkrótce"}</span>`;
      const stopka = platny ? "Zobacz ofertę" : "Zobacz";
      return `<a class="card" href="${href}" data-kat="${esc(s.kategoria)}" data-platny="${platny ? "1" : "0"}" data-szukaj="${esc([s.nazwa, s.skrot, ...s.szukaj].join(" ").toLowerCase())}">
      <div class="card-top">
        <span class="tag ${klasaKat(s.kategoria)}">${esc(s.kategoria)}</span>
        ${znacznik}
      </div>
      <h3>${esc(s.nazwa)}</h3>
      <p>${esc(s.skrot)}</p>
      <div class="compat">${znacznikiZgodnosci(s)}</div>
      <div class="card-foot">${s.wersja ? `<span class="wer" title="wersja skilla">wer. ${esc(s.wersja)}</span>` : "<span></span>"}<em>${stopka} &rarr;</em></div>
    </a>`;
    })
    .join("");

  const daneQuizu = skille
    .filter((s) => String(s.platny) !== "true")
    .map((s) => ({ id: s.id, n: s.nazwa, o: s.skrot, t: s.szukaj, g: s.status === "gotowy" }));

  // Płatne w teście doboru: osobny tor po tagach-kotwicach z pola `kotwice:`
  // (NIE z `szukaj`, żeby np. tag "finanse" operatów nie łapał księgowych).
  // Pokazywane najwyżej jedna pozycja, pod darmowym wynikiem, z ceną.
  const danePremium = skille
    .filter(jestPlatny)
    .map((s) => {
      const kotwice = lista(s.kotwice);
      if (!kotwice.length || !s.cena) throw new Error(`płatny skill ${s.id} bez pola kotwice/cena, test doboru nie może go uczciwie pokazać`);
      return { id: s.id, n: s.nazwa, o: s.skrot, cena: s.cena, kotwice,
               trial: existsSync(join(KORZEN, "paczki-zewnetrzne", `${s.id}-trial.skill`)) };
    });

  const tresc = `
<section class="hero">
  <div class="wrap">
    <div class="winieta-row">
      <p class="winieta">Skille <span>AI</span></p>
      <span class="winieta-data">aktualizacja <strong>${dataPoPolsku(new Date())}</strong></span>
    </div>
    <div class="winieta-linia" role="presentation"></div>
    <h1>Pisane od zera<br>pod <span class="pl-kreska">polskie realia</span>.<br><em>Nie tłumaczone.</em></h1>
    <p class="lede">Złotówki, VAT, NIP, polskie urzędy i biurowa polszczyzna są tu od pierwszej linijki, a nie doklejone do cudzego szablonu. Każdą umiejętność uruchomiliśmy sami na polskich dokumentach. Jeśli coś gdzieś nie działa, piszemy o tym wprost na karcie.</p>
    <div class="hero-cta">
      <a href="#test" class="btn">Dobierz skille dla siebie</a>
      <a href="#katalog" class="btn ghost">Przeglądaj katalog</a>
    </div>
    <p class="hero-note">Test zajmuje minutę. Nie musisz nic instalować, żeby zobaczyć wynik.</p>
    <div class="stats">
      <div class="stat"><b>${skille.length}</b><span>umiejętności napisanych od zera pod polskie dokumenty, żadna nie jest tłumaczeniem</span></div>
      <div class="stat"><b>${gotowe}</b><span>gotowych do pobrania, każda sprawdzona przez nas przed publikacją</span></div>
      <div class="stat"><b>3 platformy</b><span>w testach Claude i ChatGPT, wyniki rundy Gemini z 20 sierpnia przy każdym skillu</span></div>
    </div>
  </div>
</section>

<section class="sec" id="test">
  <div class="wrap">
    <div class="sec-head">
      <h2>Nie wiesz, czego szukać? Nie musisz.</h2>
      <p>Siedem pytań o Twoją pracę. Na końcu dostajesz zestaw umiejętności dobranych pod to, co robisz na co dzień.</p>
    </div>
    <div class="quiz">
      <div class="quiz-top"><span id="qstep">Pytanie 1 z 6</span><div class="bar"><i id="qbar"></i></div></div>
      <div class="quiz-body" id="qbody"></div>
    </div>
  </div>
</section>

<section class="sec" id="katalog">
  <div class="wrap">
    <div class="sec-head"><h2>Katalog</h2><p>Podzielony według tego, czym się zajmujesz, nie według tego, jak działa od środka.</p></div>
    <div class="legend">
      ${Object.entries(cfg.statusy)
        .map(([k, v]) => `<span><i style="background:${{ ok: "#4F8A55", format: "#C79A2E", brak: "#C0605E" }[k] || "#C9C9C6"}"></i>${esc(v)}</span>`)
        .join("\n      ")}
    </div>
    <div class="filters" id="filters"></div>
    <div class="searchrow">
      <div class="search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5.2" stroke="#1F2023" stroke-width="1.6"/><path d="M11 11l3.4 3.4" stroke="#1F2023" stroke-width="1.6" stroke-linecap="round"/></svg>
        <label for="q" class="sr-only" style="position:absolute;left:-9999px">Szukaj</label>
        <input id="q" type="text" placeholder="Wpisz, co chcesz zrobić, np. sprawdzić umowę, ogarnąć faktury">
      </div>
      <div class="count" id="count"></div>
    </div>
    <div class="grid" id="grid">${karty}</div>
  </div>
</section>

<section class="sec">
  <div class="wrap"><div class="cta">
    <h2>Możesz to wdrożyć sam. Albo zrobimy to razem.</h2>
    <p>Samo pobranie albo kupno skilla to dopiero początek. Najwięcej zmienia się wtedy, gdy zespół wie, kiedy go użyć, a kiedy nie.</p>
    <a href="${cfg.linkSzkolenia}" class="btn">Zobacz terminy szkoleń</a>
  </div></div>
</section>`;

  const skrypt = `<script>
const SKILLE=${JSON.stringify(daneQuizu)};
const PREMIUM=${JSON.stringify(danePremium)};
const KATEGORIE=${JSON.stringify(["Wszystkie", ...cfg.kategorie])};
${readFileSync(join(KORZEN, "szablony", "strona.js"), "utf8")}
</script>`;

  return strona({
    tytul: `${cfg.nazwaSerwisu}, katalog umiejętności AI po polsku`,
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

/* ---------- regulamin ---------- */

function stronaRegulaminu() {
  const tresc = `<main class="wrap"><article class="art">
  ${NADAWCA}
  <p class="krusz"><a href="/">Katalog</a> &rarr; Regulamin</p>
  <h1>Regulamin</h1>
  <p class="skrot">Krótko i po ludzku, bo w tym serwisie naprawdę niewiele się dzieje. Obowiązuje od 12 sierpnia 2026.</p>
  <h2 class="sr-only">Treść regulaminu</h2>
  <section class="blok"><h3>Kto prowadzi ten serwis</h3>
    <p>Serwis ${esc(cfg.nazwaSerwisu)} (${esc(cfg.domena)}) prowadzi <strong>D-X.PL Michał Jaśkiewicz</strong>, ul. Więckowskiego 32 lok. 8, 90-728 Łódź, NIP 7262533563, REGON 362247556. Kontakt: <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a>.</p></section>
  <section class="blok"><h3>Co oferuje serwis</h3>
    <p>Przeglądanie katalogu umiejętności AI oraz test doboru są bezpłatne i nie wymagają konta. Pobranie paczki .skill wymaga podania adresu e-mail, na który wysyłamy link do pliku. Część skilli pobierzesz za darmo na licencji GPL, część jest płatna, wtedy obowiązują warunki, licencja i cena podane w ofercie danego skilla; płatne skille mają też bezpłatne wersje trialowe pobierane tak samo, linkiem z maila.</p></section>
  <section class="blok"><h3>Newsletter</h3>
    <p>Zapis wymaga podania adresu e-mail i potwierdzenia go kliknięciem w link, bez potwierdzenia niczego więcej nie wysyłamy. Po potwierdzeniu dostajesz dobrany w teście zestaw umiejętności, a potem od czasu do czasu wiadomości o nowościach w katalogu oraz o szkoleniach i usługach prowadzącego serwis. Z listy wypisujesz się jednym kliknięciem w stopce każdej wiadomości, bez pytań i bez logowania.</p></section>
  <section class="blok"><h3>Pliki .skill</h3>
    <p>Darmowe umiejętności (licencja GPL) możesz używać w swojej pracy i w swojej firmie bez ograniczeń. Skille płatne obejmuje licencja komercyjna opisana w ich ofercie. Opisy są materiałem informacyjnym, nie zastępują porady prawnej, podatkowej ani kadrowej, a wyniki działania narzędzi AI zawsze warto sprawdzić przed użyciem.</p></section>
  <section class="blok"><h3>Warunki techniczne</h3>
    <p>Wystarczy przeglądarka internetowa z włączonym JavaScriptem, a do pobrania paczki i do newslettera, działający adres e-mail.</p></section>
  <section class="blok"><h3>Reklamacje</h3>
    <p>Coś nie działa albo masz zastrzeżenia? Napisz na <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a>, odpowiadamy najpóźniej w 14 dni.</p></section>
  <section class="blok"><h3>Dane osobowe</h3>
    <p>Wszystko o danych opisuje <a href="/prywatnosc/">polityka prywatności</a>, łącznie z tym, czego nie zbieramy.</p></section>
  <section class="blok"><h3>Zmiany regulaminu</h3>
    <p>O zmianach istotnych dla zapisanych na newsletter poinformujemy mailem. Data obowiązującej wersji jest zawsze na górze tej strony.</p></section>
  <div class="powrot"><a class="btn ghost" href="/">&larr; Wróć do katalogu</a></div>
</article></main>`;
  return strona({ tytul: `Regulamin, ${cfg.nazwaSerwisu}`, opis: "Zasady korzystania z katalogu, pobierania skilli i newslettera.", sciezka: "/regulamin/", obrazek: "regulamin.png", tresc });
}

/* ---------- strona prywatności ---------- */

function stronaPrywatnosci() {
  const tresc = `<main class="wrap"><article class="art">
  ${NADAWCA}
  <p class="krusz"><a href="/">Katalog</a> &rarr; Prywatność</p>
  <h1>Prywatność</h1>
  <p class="skrot">Krótko, bo naprawdę niewiele tu się dzieje.</p>
  <h2 class="sr-only">Treść polityki prywatności</h2>
  <section class="blok"><h3>Kto odpowiada za Twoje dane</h3>
    <p>Administratorem danych jest <strong>D-X.PL Michał Jaśkiewicz</strong>, ul. Więckowskiego 32 lok. 8, 90-728 Łódź, NIP 7262533563. W każdej sprawie dotyczącej danych napisz na <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a>.</p></section>
  <section class="blok"><h3>Co zbieramy</h3>
    <p>Wyłącznie adres e-mail, w dwóch sytuacjach: gdy podasz go na końcu testu doboru (razem z listą umiejętności z wyniku, żeby wysłać Ci właściwy zestaw) oraz gdy prosisz o pobranie paczki .skill (razem z informacją, o którą paczkę chodzi, żeby wysłać Ci link do pliku i odnotować pobranie).</p>
    <p>Samo przeglądanie katalogu nie wymaga podania żadnych danych.</p></section>
  <section class="blok"><h3>Gdzie to trafia</h3>
    <p>Na nasz własny serwer w Unii Europejskiej. Nie korzystamy z zewnętrznej platformy do zarządzania listą adresową, więc Twój adres nie jest przekazywany żadnej firmie trzeciej w celach marketingowych. Po potwierdzeniu zapisu adres trafia też do naszego systemu CRM, działającego na tym samym serwerze, u tego samego administratora.</p>
    <p>Do samego wysłania wiadomości używamy dostawcy poczty, inaczej maile trafiałyby do spamu.</p></section>
  <section class="blok"><h3>Potwierdzenie zapisu</h3>
    <p>Po podaniu adresu dostajesz wiadomość z linkiem potwierdzającym. Dopóki w niego nie klikniesz, nie wyślemy Ci nic więcej. Jeśli ktoś wpisał Twój adres przez pomyłkę, wystarczy zignorować tę jedną wiadomość.</p></section>
  <section class="blok"><h3>Jak się wypisać</h3>
    <p>Link do wypisania jest w stopce każdej wiadomości i działa od razu, bez pytań i bez logowania. Możesz też napisać na <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a>, usuwamy adres wraz z całą historią.</p></section>
  <section class="blok"><h3>Twoje prawa</h3>
    <p>Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i sprzeciwu, wystarczy mail na adres wyżej, bez formalności. Masz też prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych, gdyby coś tu było nie tak.</p></section>
  <section class="blok"><h3>Ciasteczka i statystyki</h3>
    <p>Nie używamy ciasteczek śledzących ani narzędzi analitycznych firm trzecich. Wyniki testu trzymamy w pamięci Twojej przeglądarki, żeby nie znikały przy przewijaniu strony, nie wychodzą one nigdzie poza Twoje urządzenie, dopóki sam nie klikniesz „wyślij".</p>
    <p>Oglądalność mierzymy własnym narzędziem (Umami) uruchomionym na tym samym serwerze co strona. Działa bez ciasteczek i nie buduje profilu: widzimy, które podstrony są odwiedzane, skąd przychodzą wejścia i ile osób kończy test lub pobiera plik, nie wiemy, kim jesteś, a dane nie są nikomu przekazywane. Dlatego nie wyświetlamy banera zgody: nie ma tu nic, na co trzeba by jej udzielać.</p></section>
  <div class="powrot"><a class="btn ghost" href="/">&larr; Wróć do katalogu</a></div>
</article></main>`;
  return strona({ tytul: `Prywatność, ${cfg.nazwaSerwisu}`, opis: "Jakie dane zbiera katalog i co się z nimi dzieje.", sciezka: "/prywatnosc/", obrazek: "prywatnosc.png", tresc });
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

// Metryczka pochodzenia, wstrzykiwana do frontmattera SKILL.md przy pakowaniu.
// Pole `metadata` jest częścią standardu Agent Skills (platformy je ignorują,
// walidator dopuszcza), a paczka niesie swoje źródło i licencję, gdy krąży poza katalogiem.
function zMetryczka(plik, s) {
  const tekst = plik.dane.toString("utf8");
  const koniec = tekst.indexOf("\n---", 3);
  if (koniec === -1 || tekst.includes("\nmetadata:")) return plik;
  const metryczka = `metadata:
  katalog: "${cfg.nazwaSerwisu}"
  autor: "${cfg.autor}"
  licencja: "${cfg.licencja}"
  stronaProjektu: "${BAZA}/"
  zrodlo: "${BAZA}/skill/${s.id}/"
  kontakt: "${cfg.mailKontaktowy}"
  aktualizacja: "${s.aktualizacja}"
`;
  return { ...plik, dane: Buffer.from(tekst.slice(0, koniec + 1) + metryczka + tekst.slice(koniec + 1), "utf8") };
}

// Pełny tekst licencji GPL, dołączany do każdej paczki (jedno źródło: plik LICENSE w repo).
const TEKST_LICENCJI = readFileSync(join(KORZEN, "LICENSE"), "utf8");

// Krótka notka licencyjna po polsku, wskazuje autora, wersję licencji i pełny tekst.
function notkaLicencyjna(s) {
  return `Skill „${s.nazwa || s.id}" z katalogu ${cfg.nazwaSerwisu}
Copyright (C) ${cfg.rok} ${cfg.autor}

Licencja: ${cfg.licencja}
(GNU General Public License w wersji 3 lub dowolnej nowszej.)

Pełny tekst licencji znajdziesz w pliku LICENSE.txt obok tego pliku
oraz pod adresem ${cfg.urlLicencji}

Projekt: ${BAZA}/
Źródło i aktualizacje tego skilla: ${BAZA}/skill/${s.id}/
Kontakt: ${cfg.mailKontaktowy}

Ten skill jest wolny: możesz go używać, kopiować i zmieniać na warunkach
licencji GPL. Rozpowszechniany bez jakiejkolwiek gwarancji.
`;
}

// paczki .skill
// Paczki laduja POZA public: nginx ich nie serwuje, wydaje je wylacznie
// usluga zapisow linkiem z maila (nic nie schodzi bez adresu e-mail).
rmSync(join(KORZEN, "paczki"), { recursive: true, force: true });
for (const s of skille) {
  if (String(s.platny) === "true") continue;
  if (s.status !== "gotowy") continue;
  const pliki = s.pliki.map((p) => (p.nazwa === `${s.id}/SKILL.md` ? zMetryczka(p, s) : p));
  pliki.push({ nazwa: `${s.id}/LICENSE.txt`, dane: Buffer.from(TEKST_LICENCJI, "utf8") });
  pliki.push({ nazwa: `${s.id}/LICENCJA.txt`, dane: Buffer.from(notkaLicencyjna(s), "utf8") });
  const zip = zbudujZip(pliki);
  zapisz(join(KORZEN, "paczki", `${s.id}.skill`), zip);
  console.log(`  paczka  paczki/${s.id}.skill  (${pliki.length} plików, ${(zip.length / 1024).toFixed(1)} KB)`);
}

// strony
zapisz(join(WY, "index.html"), stronaGlowna(skille));
console.log("  strona  /");
for (const s of skille) {
  if (jestPlatny(s)) {
    if (s.linkOferty) continue; // oferta hostowana zewnętrznie, karta linkuje wprost
    zapisz(join(WY, "skill", s.id, "index.html"), stronaOferty(s));
    console.log(`  oferta  /skill/${s.id}/`);
  } else {
    zapisz(join(WY, "skill", s.id, "index.html"), stronaSkilla(s));
    console.log(`  strona  /skill/${s.id}/`);
  }
}
zapisz(join(WY, "prywatnosc", "index.html"), stronaPrywatnosci());
console.log("  strona  /prywatnosc/");
zapisz(join(WY, "regulamin", "index.html"), stronaRegulaminu());
console.log("  strona  /regulamin/");

// zasoby
cpSync(join(KORZEN, "szablony", "styl.css"), join(WY, "styl.css"));
cpSync(join(KORZEN, "szablony", "ikona.png"), join(WY, "ikona.png"));
cpSync(join(KORZEN, "szablony", "logo-wordmark-czarny.png"), join(WY, "logo-wordmark-czarny.png"));
cpSync(join(KORZEN, "szablony", "fonty.css"), join(WY, "fonty.css"));
cpSync(join(KORZEN, "szablony", "fonty"), join(WY, "fonty"), { recursive: true });
if (existsSync(join(KORZEN, "szablony", "og"))) cpSync(join(KORZEN, "szablony", "og"), join(WY, "og"), { recursive: true });

// dane dla usługi zapisów, żeby maile (zestaw, pobrania paczek i triali)
// znały nazwy i adresy wszystkich skilli, także płatnych
zapisz(
  join(WY, "dane", "skille.json"),
  JSON.stringify(
    skille.map((s) => ({
      id: s.id, nazwa: s.nazwa, skrot: s.skrot,
      gotowy: s.status === "gotowy" && String(s.platny) !== "true",
      platny: String(s.platny) === "true",
      cena: s.cena || "",
      trial: existsSync(join(KORZEN, "paczki-zewnetrzne", `${s.id}-trial.skill`)),
    })),
    null,
    2
  )
);

// sitemap i robots
const adresy = ["/", "/prywatnosc/", "/regulamin/", ...skille.filter(maStroneWKatalogu).map((s) => `/skill/${s.id}/`)];
zapisz(
  join(WY, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    adresy.map((u) => `  <url><loc>${BAZA}${u}</loc></url>`).join("\n") +
    `\n</urlset>\n`
);
zapisz(join(WY, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${BAZA}/sitemap.xml\n`);

console.log(`\nGotowe. ${skille.length} skilli, ${adresy.length} podstron, katalog public/`);
if (cfg.domena.includes("PODMIEN")) {
  console.log("\nUWAGA: w config.json nie ustawiono jeszcze domeny, sitemap i adresy kanoniczne są tymczasowe.");
}
