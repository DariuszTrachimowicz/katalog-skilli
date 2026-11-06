#!/usr/bin/env node
// Generator serwisu. Czyta foldery ze skillami i produkuje gotowy katalog `public/`.
// Uruchomienie: node build.mjs
//
// Zasada: jeden folder skilla = jeden plik do pobrania + jedna podstrona.
// Nic nie da się rozjechać, bo obie rzeczy powstają z tego samego źródła.
// Wygląd: system z 4 XI 2026 (szablony/styl.css), FAQ pod wyszukiwanie głosowe
// z sekcji „Najczęstsze pytania” w wpis.md i poradnikach, llms.txt i ARD dla agentów.

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { zbudujZip } from "./narzedzia/zip.mjs";
import { TEXT as TEKST_ZGODY } from "./serwer/subskrypcje.mjs";
import { komplet } from "./serwer/mail-design.mjs";
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
// Data ISO z wpisu (RRRR-MM-DD) słownie, bez przesunięć strefy czasowej.
function isoSlownie(iso) {
  const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${Number(m[3])} ${MIESIACE[Number(m[2]) - 1]} ${m[1]}` : "";
}

// Kotwica z polskiego nagłówka: „Co z tym zrobić w firmie” -> co-z-tym-zrobic-w-firmie
const PL = { ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z" };
const kotwica = (t) => String(t).toLowerCase().replace(/[ąćęłńóśźż]/g, (c) => PL[c])
  .replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Tekst odpowiedzi do danych strukturalnych: bez znaczników Markdown.
const czystyTekst = (md) => String(md).replace(/\*\*|`/g, "").replace(/(^|[^*])\*([^*]+)\*/g, "$1$2")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();

// Sekcja „## Tytuł” jako surowy Markdown (do FAQ i leadu poradnika).
function sekcjaMd(md, tytul) {
  const czesci = md.split(/^##\s+(.+)$/m);
  for (let i = 1; i < czesci.length; i += 2) if (czesci[i].trim().toLowerCase() === tytul.toLowerCase()) return czesci[i + 1] || "";
  return "";
}
// „### Pytanie?” + akapit odpowiedzi -> [{ q, a }]
function faqZ(md) {
  const czesci = String(md || "").split(/^###\s+(.+)$/m);
  const out = [];
  for (let i = 1; i < czesci.length; i += 2) {
    const a = (czesci[i + 1] || "").trim();
    if (a) out.push({ q: czesci[i].trim(), a });
  }
  return out;
}
const FAQ_TYTUL = "Najczęstsze pytania";

/* ---------- dziedziny ---------- */

const DZIEDZINY = [
  { k: "Prawo", klasa: "k-prawo", o: "Umowy, urzędy, RODO, procedury. Porządkują i tłumaczą, nie orzekają.", i: "<span>§</span>" },
  { k: "Finanse", klasa: "k-finanse", o: "Faktury, KSeF, terminy, wyceny i windykacja.", i: "<span>zł</span>" },
  { k: "Kadry", klasa: "k-kadry", o: "Od ogłoszenia o pracę po rozmowę oceniającą.", i: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2c2.4 0 4 1.5 4.5 4.3"/></svg>' },
  { k: "Biuro", klasa: "k-biuro", o: "Maile, notatki, prosty język, trudne rozmowy.", i: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg>' },
  { k: "Marketing", klasa: "k-marketing", o: "Oferty, opisy produktów, newsletter, LinkedIn.", i: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h3l6 4V6L7 10H4Z"/><path d="M16.5 9a4 4 0 0 1 0 6"/><path d="M19 7a7 7 0 0 1 0 10"/></svg>' },
  { k: "Dane", klasa: "k-dane", o: "Arkusze, ankiety i raporty z liczb.", i: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"/><rect x="5.5" y="11" width="3" height="6.5" rx="1"/><rect x="10.5" y="6.5" width="3" height="11" rx="1"/><rect x="15.5" y="9" width="3" height="8.5" rx="1"/></svg>' },
];
const dziedzina = (k) => DZIEDZINY.find((d) => d.k === k) || DZIEDZINY[0];
const ikona = (d) => `<span class="ik ${d.klasa}" aria-hidden="true">${d.i}</span>`;

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
        faq: faqZ(sekcjaMd(tresc, FAQ_TYTUL)),
        pliki,
      };
    })
    .filter(Boolean);
}

/* ---------- szablon strony ---------- */

const NAV = [
  ["katalog", "/#katalog", "Katalog"],
  ["poradniki", "/poradniki/", "Poradniki KSeF"],
  ["", cfg.linkSzkolenia, "Warsztaty"],
  ["", "https://aixperts.pl/wiedza/", "Wiedza"],
  ["wdrozenia", "/wdrozenia/", "Wdrożenia"],
];

function strona({ tytul, opis, tresc, sciezka, jsonld = null, skrypt = "", obrazek = "katalog.png", sekcja = "" }) {
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
<meta name="theme-color" content="#0d2340">
<link rel="preload" href="/fonty/red-hat-display-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonty/red-hat-text-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/fonty.css?v=${W_FONTY}">
<link rel="stylesheet" href="/styl.css?v=${W_STYL}">
<link rel="icon" href="/ikona.png" type="image/png">
<link rel="apple-touch-icon" href="/ikona.png">
<link rel="ard" href="/.well-known/ard.json" type="application/json">
<link rel="alternate" href="/llms.txt" type="text/plain" title="llms.txt">
<link rel="stylesheet" href="/subskrypcje-ui.css?v=${wersja("subskrypcje-ui.css")}">
<script defer src="/subskrypcje-ui.js?v=${wersja("subskrypcje-ui.js")}"></script>
${cfg.analityka ? `<script defer src="/ekosystem.js?v=${wersja("ekosystem.js")}"></script>
<script defer src="${cfg.analityka.skrypt}" data-website-id="${cfg.analityka.idSerwisu}" data-domains="${cfg.domena}" data-exclude-search="true" data-exclude-hash="true" data-do-not-track="true" data-before-send="aixEcosystemBeforeSend"></script>` : ""}
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, "\\u003c")}</script>` : ""}
</head>
<body>
<a class="skok" href="#tresc">Przejdź do treści</a>
<header>
  <div class="wrap nav">
    <a class="brand" href="/">
      <img src="/ikona.png" width="40" height="40" alt="">
      <span><b>${esc(cfg.nazwaSerwisu)}</b><small>AiXperts</small></span>
    </a>
    <button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-linki"><i></i><i></i><i></i></button>
    <nav class="nav-links" id="nav-linki" aria-label="Główna">
      ${NAV.map(([s, href, t]) => `<a href="${href}"${s && s === sekcja ? ' aria-current="page"' : ""}>${t}</a>`).join("\n      ")}
      <a href="/#test" class="btn">Dobierz skille</a>
    </nav>
  </div>
</header>
<script>(function(){var b=document.querySelector(".burger");if(!b)return;b.addEventListener("click",function(){var h=document.querySelector("header");var o=h.classList.toggle("otwarte");b.setAttribute("aria-expanded",o)});document.querySelectorAll(".nav-links a").forEach(function(a){a.addEventListener("click",function(){document.querySelector("header").classList.remove("otwarte");b.setAttribute("aria-expanded","false")})})})();</script>
<main id="tresc">
${tresc}
</main>
<footer>
  <div class="wrap">
    <div class="stopka">
      <div><b>${esc(cfg.nazwaSerwisu)}</b><p>Darmowe skille AI pod polskie realia, na licencji <a href="${cfg.urlLicencji}" rel="license">${esc(cfg.licencja)}</a>. Twórca: ${esc(cfg.autor)}. Kontakt: <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a></p><p style="margin-top:10px">AiXperts: narzędzia i edukacja AI. <a href="https://d-x.pl/szkolenia-i-wdrozenia-ai/">Pilotaże, integracje i rozwój rozwiązań z Digital Xperts</a>.</p></div>
      <div><b>Katalog</b><a href="/#katalog">Wszystkie skille</a><a href="/#test">Test dopasowania</a><a href="/poradniki/">Poradniki KSeF</a><a href="/sprawdzian-ksef/">Sprawdzian KSeF</a><a href="/github/">Kod na GitHubie</a></div>
      <div><b>AiXperts</b><a href="${cfg.linkSzkolenia}">Warsztaty</a><a href="https://aixperts.pl/wiedza/">Wiedza</a><a href="/wdrozenia/">Wdrożenia</a><a href="https://aixperts.pl/">aixperts.pl</a></div>
    </div>
    <p class="prawne"><a href="/regulamin/">Regulamin</a> · <a href="/prywatnosc/">Prywatność</a> · <a href="/llms.txt">llms.txt</a> · Katalog nie jest powiązany z Anthropic, OpenAI ani Google.</p>
  </div>
</footer>
${tresc.includes('class="polec"') ? SKRYPT_POLEC : ""}
${skrypt}
</body>
</html>`;
}

// Okruszki widoczne i w danych strukturalnych z jednej listy [nazwa, ścieżka].
const okruszkiHtml = (lista) => `<p class="okruszki">${lista.map(([n, u], i) => (i < lista.length - 1 ? `<a href="${u}">${esc(n)}</a>` : esc(n))).join(" › ")}</p>`;
const okruszkiLd = (lista) => ({
  "@type": "BreadcrumbList",
  itemListElement: lista.map(([n, u], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: BAZA + u })),
});

function faqHtml(faq, { naglowek = "Najczęstsze pytania", id = "pytania", klasa = "" } = {}) {
  if (!faq.length) return "";
  return `<section id="${id}" aria-labelledby="${id}-t"${klasa ? ` class="${klasa}"` : ""}>
    <h2 id="${id}-t">${naglowek}</h2>
    <div class="faq">${faq.map((f) => `<div class="faq-p"><h3>${esc(f.q)}</h3>${render(f.a).replace(/<p>/g, '<p class="faq-o">')}</div>`).join("")}</div>
  </section>`;
}
const faqLd = (faq) => ({
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: czystyTekst(f.a) } })),
});
const speakable = { "@type": "SpeakableSpecification", cssSelector: ["#lede", ".faq-o"] };

/* ---------- przyciski „Poleć” ---------- */

// Zwykłe linki do okien udostępniania (bez skryptów i ciasteczek serwisów społecznościowych)
// plus natywne „Udostępnij” w telefonie i kopiowanie linku. Zdarzenie Umami: polec + kanał.
const REPO = "https://github.com/DariuszTrachimowicz/katalog-skilli";
function polec({ sciezka, tytul, naglowek = "Poleć ten skill", tekst = "" }) {
  const url = BAZA + sciezka;
  const e = encodeURIComponent;
  const kanal = (k, href, t) => `<a class="polec-b" href="${href}" target="_blank" rel="noopener" data-umami-event="polec" data-umami-event-kanal="${k}">${t}</a>`;
  return `<div class="polec" data-polec-url="${esc(url)}" data-polec-tytul="${esc(tytul)}">
    <p class="polec-t">${esc(naglowek)}</p>
    <div class="polec-l">
      <button type="button" class="polec-b polec-nat" hidden data-umami-event="polec" data-umami-event-kanal="natywny">Udostępnij</button>
      ${kanal("linkedin", `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`, "LinkedIn")}
      ${kanal("facebook", `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`, "Facebook")}
      ${kanal("whatsapp", `https://wa.me/?text=${e(`${tytul}: ${url}`)}`, "WhatsApp")}
      <a class="polec-b" href="mailto:?subject=${e(tytul)}&amp;body=${e(`${tekst ? tekst + "\n\n" : ""}${url}`)}" data-umami-event="polec" data-umami-event-kanal="email">E-mail</a>
      <button type="button" class="polec-b polec-kop" data-umami-event="polec" data-umami-event-kanal="kopiuj">Kopiuj link</button>
    </div>
    <p class="polec-s" role="status" aria-live="polite"></p>
  </div>`;
}
// Jeden skrypt na stronę: natywne udostępnianie tam, gdzie przeglądarka je ma, i kopiowanie linku.
const SKRYPT_POLEC = `<script>(function(){document.querySelectorAll(".polec").forEach(function(p){var u=p.dataset.polecUrl,t=p.dataset.polecTytul,s=p.querySelector(".polec-s"),n=p.querySelector(".polec-nat");
if(navigator.share&&n){n.hidden=false;n.addEventListener("click",function(){navigator.share({title:t,url:u}).catch(function(){})})}
p.querySelector(".polec-kop").addEventListener("click",function(){(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){s.textContent="Link skopiowany. Wklej go w wiadomości."},function(){s.textContent="Skopiuj adres: "+u})})})})();</script>`;

/* ---------- zgodność ---------- */

const KROTKO = {
  claude: "Działa na dowolnym płatnym planie.",
  gpt: "Wymaga planu Business, Enterprise, Edu lub Healthcare; na planie Plus i w wersji darmowej skille nie są dostępne.",
  gemini: "W Polsce instrukcje wkleja się do rozmowy albo Gema, bo wbudowana obsługa plików skill nie jest udostępniona w EOG.",
};
const zgOk = (s, k) => (s.zgodnosc[k] || "format") === "ok";

function gdzieDziala(s) {
  return `<div class="pudlo nieb">
    <h2>Gdzie działa</h2>
    <div class="gdzie">${Object.entries(cfg.platformy).map(([k, p]) => {
      const st = s.zgodnosc[k] || "format";
      return `<div><b class="${st === "ok" ? "ok" : "nie"}">${esc(p.nazwa)}</b><span>${esc(cfg.statusy[st])}. ${esc(KROTKO[k] || "")}</span></div>`;
    }).join("")}</div>
    <p class="dl-rodo">Plik jest zgodny z otwartym standardem Agent Skills. Piszemy tylko o tym, co sami sprawdziliśmy.</p>
  </div>`;
}

/* ---------- bramka mailowa pobrań ---------- */

// Zamiast bezposredniego linku do .skill: e-mail -> mail z linkiem pobrania.
// Nic nie schodzi z katalogu bez adresu; link w mailu weryfikuje adres.
const SKRYPT_POBRANIA = `<script>window.poprosOPaczke||(window.poprosOPaczke=async function(f,skill){
var b=f.querySelector("button");b.disabled=true;b.textContent="Wysyłam…";
var dane={email:f.email.value,skill:skill};
if(f.telefon)dane.telefon=f.telefon.value;
if(f.zgodaSms){dane.zgodaSms=f.zgodaSms.checked;dane.wersjaZgodySms="2026-09-09";}
if(f.zgodaEmail){dane.zgodaEmail=f.zgodaEmail.checked;dane.wersjaZgodySms="2026-09-09";}
if(f.powiadomWersje)dane.powiadomWersje=f.powiadomWersje.checked;
var podpis=JSON.stringify(dane);if(f._pobraniePodpis!==podpis){f._pobraniePodpis=podpis;f._pobranieId=crypto.randomUUID();}dane.requestId=f._pobranieId;
try{var o=await fetch("/api/pobranie",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(dane)});
var d=await o.json().catch(function(){return{}});
if(o.ok){var sms=dane.zgodaSms?(d.subskrypcje&&d.subskrypcje.sms==='oczekuje_potwierdzenia_numeru'?' Wybór SMS zapisany. Wysyłka reklam pozostaje nieaktywna do potwierdzenia numeru.':' Nie potwierdzono zapisu SMS. Możesz ponowić wybór w formularzu newslettera.') : '';var nm=d.newsletterMail,nl=dane.zgodaEmail?(nm==='wyslany'?' Potwierdzenie newslettera wysłaliśmy osobnym mailem, w nim jest też link do bonusu.':(d.subskrypcje&&d.subskrypcje.email==='oczekuje_potwierdzenia'?' Nie mamy pewności, że mail z potwierdzeniem newslettera wyszedł. Jeśli nie dotrze, zapisz się przyciskiem poniżej.':' Nie zapisano newslettera. Możesz zapisać się poniżej.')):'';var zapr=(!dane.zgodaEmail||nm!=='wyslany')&&f.dataset.bonus?'<div class="dl-news"><b>Bonus dla zapisanych na newsletter: '+f.dataset.bonus+' w jednym pliku</b><span>Piszemy o nowych skillach, aktualizacjach pod zmiany przepisów, czasem o naszych szkoleniach i usługach. To dobrowolne: każdy skill nadal pobierzesz osobno za darmo, a bonus zostaje po wypisie.</span><a class="btn line" href="/#newsletter" data-umami-event="newsletter-z-pobrania">Zapisz się i odbierz bonus</a></div>':'';f.closest(".dl").outerHTML='<div class="dl dl-ok" role="status"><b>Sprawdź skrzynkę</b><span>'+(d.paczka==='w_toku'?'Wysyłka linku do tego zgłoszenia już trwa albo jej wynik jest niepewny. Jeśli mail nie dotrze w ciągu kilku minut, odśwież stronę i poproś o link jeszcze raz.':'Link do pobrania wysłaliśmy na Twój adres. Nie widzisz go po minucie? Zajrzyj do spamu.')+nl+sms+'</span>'+zapr+'</div>';}
else{b.disabled=false;b.textContent="Wyślij link";var pole=f.querySelector("input");pole.setCustomValidity(d.blad||"Nie udało się wysłać");f.reportValidity();setTimeout(function(){pole.setCustomValidity("")},2500);}
}catch(e){b.disabled=false;b.textContent="Spróbuj ponownie";}
return false;});</script>`;

function formularzPobrania(idPaczki) {
  return `<div class="dl"><b>Pobierz za darmo</b><span>Podaj e-mail, wyślemy link do pobrania.</span>
    <p class="plik">${esc(idPaczki)}.skill</p>
    <form class="dl-form" data-bonus="${komplet(LICZBA_GOTOWYCH)}" onsubmit="event.preventDefault();poprosOPaczke(this,'${idPaczki}')">
      <label class="sr-only" for="dl-mail-${idPaczki}">Adres e-mail do wysyłki linku</label>
      <input type="email" name="email" id="dl-mail-${idPaczki}" required placeholder="twoj@adres.pl" autocomplete="email">
      <label class="sr-only" for="dl-phone-${idPaczki}">Telefon z prefiksem kraju, opcjonalnie</label>
      <input type="tel" name="telefon" id="dl-phone-${idPaczki}" placeholder="Telefon, np. +48 500 100 200 (opcjonalnie)" autocomplete="tel">
      <label class="dl-zgoda aix-sub-choice" data-aix-sms-phone="#dl-phone-${idPaczki}" hidden><input type="checkbox" name="zgodaSms" disabled> <span>Chcę otrzymywać od D-X.PL Michał Jaśkiewicz wiadomości SMS o ofertach, nowościach i promocjach AiXperts i Digital Xperts na podany numer telefonu. Zgodę mogę wycofać w każdej chwili.</span></label>
      <p class="dl-bonus"><b>Bonus dla zapisanych na newsletter:</b> ${komplet(LICZBA_GOTOWYCH)} w jednym pliku, mailem po potwierdzeniu zapisu.</p>
      <label class="dl-zgoda"><input type="checkbox" name="zgodaEmail"> <span>${esc(TEKST_ZGODY.email)}</span></label>
      <label class="dl-zgoda"><input type="checkbox" name="powiadomWersje"> <span>Napisz do mnie, gdy wyjdzie nowa wersja tego skilla (poprawki, zmiany przepisów). Tylko o tym skillu, bez reklam. Wypis jednym kliknięciem w każdej wiadomości.</span></label>
      <button class="btn" data-umami-event="prosba-o-paczke" data-umami-event-skill="${idPaczki}">Wyślij link</button>
    </form>
    <p class="dl-rodo">Dane posłużą do dostarczenia pliku i odnotowania pobrania, również w naszym CRM. Zapis do newslettera tylko za Twoją zgodą, szczegóły w <a href="/prywatnosc/">polityce prywatności</a>.</p>
  </div>
  ${SKRYPT_POBRANIA}`;
}

/* ---------- strona skilla ---------- */

const SEKCJE_STALE = ["co robi", "dla kogo", "ile ci to oszczędza", "przykład z życia", "jak po polsku",
  "czego potrzebujesz", "na czym się wywala", "czego ten skill nie robi celowo", FAQ_TYTUL.toLowerCase()];

function stronaSkilla(s, skille) {
  const gotowy = s.status === "gotowy";
  const d = dziedzina(s.kategoria);
  const dodatkowe = s.sekcje.filter((x) => !SEKCJE_STALE.includes(x.tytul.toLowerCase()));
  const zDziedziny = skille.filter((x) => x.kategoria === s.kategoria);
  const poz = zDziedziny.findIndex((x) => x.id === s.id);
  const podobne = [1, 2, 3].map((n) => zDziedziny[(poz + n) % zDziedziny.length]).filter((x) => x && x.id !== s.id)
    .filter((x, i, a) => a.findIndex((y) => y.id === x.id) === i);
  const sciezka = [["Katalog", "/"], [s.kategoria, "/#katalog"], [s.nazwa, `/skill/${s.id}/`]];
  const sek = (t, tresc, klasa = "", id = kotwica(t)) => (tresc ? `<section id="${id}"${klasa ? ` class="${klasa}"` : ""}><h2>${t}</h2>${tresc}</section>` : "");

  const tresc = `
<section class="gora"><div class="wrap">
  ${okruszkiHtml(sciezka)}
  <h1>${esc(s.nazwa)}</h1>
  <p class="lede" id="lede">${esc(s.korzysc || s.skrot)}</p>
  <ul class="meta">
    <li class="pig kat ${d.klasa}">${esc(s.kategoria)}</li>
    ${s.poziom ? `<li class="pig ok">${esc(s.poziom)}</li>` : ""}
    ${s.wersja ? `<li class="pig">wersja ${esc(s.wersja)}</li>` : ""}
    ${s.aktualizacja ? `<li class="pig">aktualizacja ${isoSlownie(s.aktualizacja)}</li>` : ""}
    <li class="pig">darmowy, ${esc(cfg.licencja.split("-or-")[0])}</li>
  </ul>
  <div class="cta">
    ${gotowy ? `<a class="btn" href="#pobierz">Pobierz za darmo</a>` : `<a class="btn" href="/#test">Powiadom mnie o premierze</a>`}
    ${s.faq.length ? `<a class="btn line" href="#pytania">Pytania i odpowiedzi</a>` : `<a class="btn line" href="#instalacja">Jak zainstalować</a>`}
  </div>
</div></section>

<div class="wrap uklad">
  <article class="tresc">
    ${sek("Co robi", s.sekcja("Co robi") + (s.sekcja("Dla kogo") ? `<h3>Dla kogo</h3>${s.sekcja("Dla kogo")}` : ""))}
    ${sek("Przykład z życia", s.sekcja("Przykład z życia") && `<div class="przyklad">${s.sekcja("Przykład z życia")}</div>`)}
    ${sek("Ile Ci to oszczędza", s.sekcja("Ile Ci to oszczędza"))}
    ${sek("Jak po polsku", s.sekcja("Jak po polsku"), "", "po-polsku")}
    ${sek("Czego potrzebujesz", s.sekcja("Czego potrzebujesz"))}
    ${sek("Na czym się wywala", s.sekcja("Na czym się wywala") && `<div class="wywala">${s.sekcja("Na czym się wywala")}</div>`)}
    ${s.sekcja("Czego ten skill nie robi celowo") ? `<section id="czego-nie-robi"><div class="granica"><h2>Czego ten skill nie robi celowo</h2>${s.sekcja("Czego ten skill nie robi celowo")}</div></section>` : ""}
    <section id="instalacja"><h2>Jak zainstalować</h2>
      <ol class="kroki3">
        <li><span>Podaj e-mail w panelu „Pobierz za darmo”, wyślemy link do pliku <code>${s.id}.skill</code>.</span></li>
        <li><span>${Object.values(cfg.platformy).slice(0, 2).map((p) => `<strong>${esc(p.nazwa)}:</strong> ${p.instalacja.replace(/&rarr;/g, "›")}`).join(". ")}.</span></li>
        <li><span>Otwórz nową rozmowę i opisz, czego potrzebujesz. Umiejętność uruchomi się sama, nie musisz jej wywoływać z nazwy.</span></li>
      </ol>
    </section>
    ${faqHtml(s.faq)}
    ${dodatkowe.map((x) => sek(esc(x.tytul), x.html, x.tytul.toLowerCase() === "jak powstał" ? "historia-sek" : "")).join("")}
    ${podobne.length ? `<section id="z-tej-dziedziny"><h2>Z tej samej dziedziny</h2><div class="podobne">${podobne.map((x) => `<a class="mini ${d.klasa}" href="/skill/${x.id}/"><b>${esc(x.nazwa)}</b><span>${esc(x.korzysc || x.skrot)}</span></a>`).join("")}</div></section>` : ""}
    <section>
      <p class="zespol"><strong>Ten skill ma pracować w całym zespole?</strong> Jeśli zadanie powtarza się u kilku osób, warto uzgodnić dane wejściowe, sposób sprawdzania wyniku i odpowiedzialność. Digital Xperts pomoże ocenić, czy wystarczy wspólny szablon, czy potrzebne jest dopasowanie narzędzia albo integracja. <a href="https://d-x.pl/szkolenia-i-wdrozenia-ai/#dxaif-wdrozenie">Sprawdź możliwość wdrożenia w firmie z Digital Xperts</a></p>
      <p class="zastrz" style="margin-top:14px">Materiał informacyjny. Nie zastępuje porady prawnej, podatkowej ani kadrowej.</p>
      <div class="cta" style="margin-top:20px"><a class="btn line" href="/#katalog">Wróć do katalogu</a><a class="btn line" href="/#test">Dobierz skille dla siebie</a></div>
    </section>
  </article>
  <aside class="bok" aria-label="Pobieranie i zgodność">
    <div class="pudlo" id="pobierz">${gotowy ? formularzPobrania(s.id) : `<div class="dl"><b>W przygotowaniu</b><span>Zrób test doboru, napiszemy, gdy skill będzie gotowy.</span><a class="btn pelny" href="/#test">Powiadom mnie</a></div>`}</div>
    ${gdzieDziala(s)}
    <div class="pudlo">${polec({ sciezka: `/skill/${s.id}/`, tytul: `${s.nazwa}, darmowy skill AI po polsku`, tekst: s.korzysc || s.skrot })}</div>
  </aside>
</div>`;

  const url = `${BAZA}/skill/${s.id}/`;
  return strona({
    tytul: s.tytulSeo || `${s.nazwa}, ${cfg.nazwaSerwisu}`,
    opis: s.opisSeo || s.skrot,
    sciezka: `/skill/${s.id}/`,
    sekcja: "katalog",
    obrazek: existsSync(join(KORZEN, "szablony", "og", `${s.id}.png`)) ? `${s.id}.png` : "katalog.png",
    tresc,
    jsonld: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", "@id": url, url, name: s.nazwa, description: s.skrot, inLanguage: "pl-PL", dateModified: s.aktualizacja, speakable, breadcrumb: okruszkiLd(sciezka) },
        {
          "@type": "SoftwareApplication", name: s.nazwa, description: s.skrot, url, applicationCategory: "BusinessApplication",
          operatingSystem: "Claude, ChatGPT", inLanguage: "pl-PL", softwareVersion: s.wersja || undefined, dateModified: s.aktualizacja,
          isAccessibleForFree: true, license: cfg.urlLicencji, author: { "@type": "Person", name: cfg.autor },
          offers: { "@type": "Offer", price: "0", priceCurrency: "PLN" },
        },
        ...(s.faq.length ? [faqLd(s.faq)] : []),
      ],
    },
  });
}

/* ---------- Wdrożenia (referencje) ---------- */

function stronaWdrozen() {
  return strona({
    tytul: "Wdrożenia AiXperts, narzędzia AI szyte na miarę",
    opis: "Systemy łączące dane firmy z warstwą AI: analityka magazynowa z asystentem AI, portale wewnętrzne, obieg pracy zespołu. Dane zostają u klienta.",
    sciezka: "/wdrozenia/",
    sekcja: "wdrozenia",
    tresc: readFileSync(join(KORZEN, "szablony", "wdrozenia.html"), "utf8"),
    jsonld: { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", url: `${BAZA}/wdrozenia/`, name: "Wdrożenia AiXperts", inLanguage: "pl-PL", breadcrumb: okruszkiLd([["Katalog", "/"], ["Wdrożenia", "/wdrozenia/"]]) }] },
  });
}

/* ---------- repozytorium na GitHubie ---------- */

const FAQ_GITHUB = [
  { q: "Czy mogę używać skilli z GitHuba w swojej firmie?", a: "Tak. Skille są na licencji GPL w wersji 3 lub nowszej, która pozwala używać ich w dowolnym celu, także w firmie. Jeśli zmienione skille przekazujesz dalej, robisz to na tej samej licencji i z dostępem do ich treści." },
  { q: "Czy repozytorium to ta sama wersja, co strona i pliki do pobrania?", a: "Tak. Strona katalogu i pliki .skill powstają z tego samego repozytorium, z tych samych folderów skilli. Numer wersji skilla znajdziesz w pliku wpis.md i na jego karcie." },
  { q: "Czy muszę mieć konto na GitHubie?", a: "Nie. Repozytorium jest publiczne: przeglądasz je i pobierasz jako ZIP bez konta. Konto przydaje się dopiero wtedy, gdy chcesz zgłosić błąd w zakładce Issues albo zaproponować zmianę." },
  { q: "Jak najszybciej zainstalować jeden skill?", a: "Najprościej pobierz gotowy plik .skill linkiem z karty skilla w katalogu. Z GitHuba korzystasz, gdy chcesz przejrzeć instrukcje skilla, porównać wersje albo przygotować własną, zmienioną wersję." },
];

function stronaGithub(skille, poradniki) {
  const sciezka = [["Katalog", "/"], ["Skille na GitHubie", "/github/"]];
  const tresc = `
<section class="gora"><div class="wrap">
  ${okruszkiHtml(sciezka)}
  <h1>Skille po polsku na GitHubie</h1>
  <p class="lede" id="lede">Cały katalog jest otwarty: każdy skill, standard, według którego go piszemy, i generator tej strony. Możesz przeczytać, sprawdzić i zmienić każdą linijkę na licencji GPL.</p>
  <div class="cta"><a class="btn" href="${REPO}" rel="noopener" data-umami-event="github-wejscie">Otwórz repozytorium na GitHubie</a><a class="btn line" href="/#katalog">Pobierz skill z karty</a></div>
</div></section>

<div class="wrap uklad">
  <article class="tresc">
    <section id="co-jest"><h2>Co jest w repozytorium</h2>
      <ul>
        <li><strong>Foldery skilli</strong> w <code>skille/</code>: ${skille.length} skilli, każdy z plikiem <code>SKILL.md</code> (instrukcje dla modelu), materiałami w <code>references/</code> i opisem karty w <code>wpis.md</code>.</li>
        <li><strong>Standard</strong> w <code>STANDARD.md</code>: reguły, według których piszemy każdy skill, od uzasadniania skutkiem zamiast przepisem po zakaz orzekania.</li>
        <li><strong>Poradniki KSeF</strong> w <code>poradniki/</code>: ${poradniki.length} tekstów ze źródłami i datą stanu.</li>
        <li><strong>Generator strony i paczek</strong> (<code>build.mjs</code>, <code>narzedzia/</code>): bez zależności zewnętrznych, sam Node.</li>
        <li><strong>Testy</strong> w <code>testy/</code>: między innymi zgodność FAQ z danymi strukturalnymi i brak długich myślników w tym, co trafia na stronę.</li>
      </ul>
    </section>
    <section id="jak-wziac"><h2>Jak wziąć skill z GitHuba</h2>
      <ol class="kroki3">
        <li><span>Otwórz folder <code>skille/</code> i wybierz skill; jego nazwa to adres karty w katalogu, np. <code>czerwone-flagi-w-umowie</code>.</span></li>
        <li><span>Pobierz całe repozytorium przyciskiem Code › Download ZIP albo sklonuj je poleceniem <code>git clone ${REPO}.git</code>.</span></li>
        <li><span>Gotowy plik do wgrania w Claude albo ChatGPT najprościej dostaniesz linkiem z karty skilla; folder z GitHuba przydaje się, gdy chcesz go przejrzeć albo zmienić.</span></li>
      </ol>
    </section>
    <section id="licencja"><h2>Licencja i zgłoszenia</h2>
      <p>Skille i generator są na licencji <a href="${cfg.urlLicencji}" rel="license">GPL-3.0-or-later</a>. Autor: ${esc(cfg.autor)}. Możesz używać ich w dowolnym celu, kopiować, zmieniać i rozpowszechniać; zmienione wersje przekazujesz dalej na tej samej licencji.</p>
      <p>Błąd w skillu albo pomysł na poprawkę zgłoś w zakładce <a href="${REPO}/issues">Issues</a> na GitHubie albo mailem na <a href="mailto:${cfg.mailKontaktowy}">${cfg.mailKontaktowy}</a>. Każdą zmianę skilla przepuszczamy przez ten sam standard i testy, zanim trafi do katalogu.</p>
    </section>
    <section id="dlaczego"><h2>Dlaczego katalog jest otwarty</h2>
      <p>Skill, który ma pomóc przy umowie, fakturze albo piśmie do urzędu, powinien dać się sprawdzić. W repozytorium widzisz dokładnie, co model dostaje w instrukcjach, czego ma odmówić i na czym się wywala, zamiast wierzyć opisowi na stronie.</p>
    </section>
    ${faqHtml(FAQ_GITHUB)}
  </article>
  <aside class="bok">
    <div class="pudlo">
      <h2>Repozytorium</h2>
      <ul class="gdzie" style="list-style:none">
        <li><div><b class="ok">Publiczne</b><span>przeglądasz i pobierasz bez konta</span></div></li>
        <li><div><b class="ok">Licencja</b><span>GPL-3.0-or-later</span></div></li>
        <li><div><b class="ok">Zawartość</b><span>${skille.length} skilli, ${poradniki.length} poradników, standard, generator i testy</span></div></li>
      </ul>
      <a class="btn pelny" style="margin-top:14px" href="${REPO}" rel="noopener" data-umami-event="github-wejscie">Otwórz na GitHubie</a>
    </div>
    <div class="pudlo">${polec({ sciezka: "/github/", tytul: "Skille po polsku na GitHubie", naglowek: "Poleć repozytorium", tekst: "Otwarty katalog skilli AI po polsku, licencja GPL." })}</div>
  </aside>
</div>`;
  return strona({
    tytul: "Skille po polsku na GitHubie: otwarte repozytorium skilli AI",
    opis: `Otwarte repozytorium katalogu: ${skille.length} skilli AI po polsku, standard pisania, poradniki KSeF i generator strony. Licencja GPL, bez konta do przeglądania.`,
    sciezka: "/github/",
    obrazek: "github.png",
    tresc,
    jsonld: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${BAZA}/github/`, name: "Skille po polsku na GitHubie", inLanguage: "pl-PL", speakable, breadcrumb: okruszkiLd(sciezka) },
        { "@type": "SoftwareSourceCode", name: "katalog-skilli", codeRepository: REPO, license: cfg.urlLicencji, programmingLanguage: ["JavaScript", "Markdown"], inLanguage: "pl-PL", author: { "@type": "Person", name: cfg.autor } },
        faqLd(FAQ_GITHUB),
      ],
    },
  });
}

/* ---------- strona główna ---------- */

const FAQ_GLOWNA = [
  { q: "Czym jest skill AI i do czego mi się przyda?", a: "Skill to plik z instrukcjami, który wgrywasz do asystenta AI, takiego jak Claude albo ChatGPT. Od tej chwili asystent wykonuje konkretne zadanie według sprawdzonej procedury, na przykład czyta umowę, przepisuje faktury do tabeli albo układa pismo do urzędu, i pilnuje przy tym polskich realiów." },
  { q: "Czy skille z tego katalogu są darmowe?", a: "Tak. Wszystkie skille są darmowe i udostępniamy je na licencji GPL. Podajesz adres e-mail na karcie skilla, a my wysyłamy link do pliku. Zapis do newslettera jest osobnym, dobrowolnym wyborem." },
  { q: "Jak zainstalować skill w Claude albo ChatGPT?", a: "Pobierasz plik .skill i wgrywasz go w ustawieniach asystenta. W Claude: Ustawienia, Umiejętności, Prześlij umiejętność. W ChatGPT: Skills, Upload from your computer. Potem otwierasz nową rozmowę i opisujesz zadanie, a skill uruchamia się sam." },
  { q: "Czy skille działają w darmowym ChatGPT?", a: "Nie. W ChatGPT skille wymagają planu Business, Enterprise, Edu lub Healthcare; na planie Plus i w wersji darmowej nie są dostępne. W Claude działają na dowolnym płatnym planie, a w Gemini w Polsce instrukcje wkleja się do rozmowy albo Gema." },
  { q: "Czy skill zastąpi prawnika albo księgową?", a: "Nie. Skille z dziedzin prawa, podatków i kadr pomagają zrozumieć dokument, uporządkować sprawę i przygotować pytania do specjalisty. Nie orzekają, czy coś jest zgodne z prawem, i nie piszą za Ciebie wiążących dokumentów." },
  { q: "Skąd mam wiedzieć, który skill wybrać?", a: "Zrób test dopasowania: siedem pytań o Twoją pracę, a na końcu dostajesz zestaw skilli dobranych pod to, co robisz na co dzień. Możesz też wpisać zadanie w wyszukiwarkę katalogu, na przykład „sprawdzić umowę” albo „ogarnąć faktury”." },
];

function stronaGlowna(skille) {
  const ile = skille.length;
  const wszystkieOk = (k) => skille.every((s) => zgOk(s, k));
  const sprawdzone = ["claude", "gpt"].filter(wszystkieOk).map((k) => cfg.platformy[k].nazwa);

  const karta = (s, d) => `<a class="karta ${d.klasa}" href="/skill/${s.id}/" data-kat="${esc(s.kategoria)}" data-szukaj="${esc([s.nazwa, s.skrot, s.korzysc || "", ...s.szukaj].join(" ").toLowerCase())}">
        <h4>${esc(s.nazwa)}</h4><p>${esc(s.korzysc || s.skrot)}</p>
        <div class="dol"><span class="zg" aria-label="Sprawdzone platformy">${Object.entries(cfg.platformy).map(([k, p]) => `<span${zgOk(s, k) ? "" : ' class="nie"'}>${esc(p.nazwa)}</span>`).join("")}</span><span class="dalej">${s.wersja ? `wer. ${esc(s.wersja)} ` : ""}→</span></div>
      </a>`;

  const grupy = DZIEDZINY.map((d) => {
    const ls = skille.filter((s) => s.kategoria === d.k).sort((a, b) => a.nazwa.localeCompare(b.nazwa, "pl"));
    if (!ls.length) return "";
    return `<div class="grupa" data-kat="${d.k}">
      <div class="grupa-glowa">${ikona(d)}<div><h3>${d.k} <small>${ls.length}</small></h3><p>${d.o}</p></div></div>
      <div class="karty">${ls.map((s) => karta(s, d)).join("")}</div>
    </div>`;
  }).join("");

  const daneQuizu = skille.map((s) => ({ id: s.id, n: s.nazwa, o: s.korzysc || s.skrot, k: s.kategoria, t: s.szukaj, s: [s.nazwa, s.skrot, s.korzysc || "", ...s.szukaj].join(" ").toLowerCase(), g: s.status === "gotowy" }));

  const tresc = `
<section class="hero">
  <div class="wrap">
    <div>
      <p class="eyebrow">Darmowe skille AI dla polskich firm</p>
      <h1>Skille AI pisane pod <mark>polskie realia</mark>, nie tłumaczone.</h1>
      <p class="lede" id="lede">Złotówki, VAT, NIP, KSeF, urzędy i biurowa polszczyzna od pierwszej linijki. Wgrywasz skill do Claude albo ChatGPT i od razu pracujesz po polsku, a na każdej karcie piszemy wprost, czego skill nie zrobi.</p>
      <div class="cta">
        <a class="btn" href="#katalog">Przeglądaj katalog</a>
        <a class="btn line" href="#test">Dobierz w minutę</a>
      </div>
      <ul class="fakty">
        <li><b>${ile}</b>skilli</li>
        <li><b>${DZIEDZINY.length}</b>dziedzin pracy</li>
        <li><b>0 zł</b>licencja GPL</li>
        ${sprawdzone.length ? `<li><b>${sprawdzone.join(", ")}</b>sprawdzone</li>` : ""}
      </ul>
    </div>
    <figure>
      <div class="okno" role="img" aria-label="Przykład odpowiedzi skilla Czerwone flagi w umowie: trzy ustalenia i cztery pytania do prawnika">
        <div class="okno-bar"><i></i><i></i><i></i><span>skill: czerwone-flagi-w-umowie</span></div>
        <div class="okno-body">
          <div class="dymek">Umowa z drukarnią, 12 stron, podpisuję w piątek. Na co uważać?</div>
          <div class="wynik-okna">
            <p class="t">Do omówienia przed podpisem <small>3 ustalenia</small></p>
            <div class="flaga f-r"><b>Ryzyko</b><span>Kara 2 000 zł za każdy dzień opóźnienia przy wynagrodzeniu 9 800 zł. Po pięciu dniach kara przewyższa całe wynagrodzenie.</span></div>
            <div class="flaga f-a"><b>Uwaga</b><span>Umowa przedłuża się sama o 12 miesięcy, jeśli nie wypowiesz jej na 3 miesiące przed końcem.</span></div>
            <div class="flaga f-g"><b>Typowe</b><span>Płatność 14 dni od doręczenia faktury.</span></div>
          </div>
        </div>
        <div class="okno-stopka"><span>Na koniec: <b>4 pytania do prawnika</b></span><span>bez oceny, czy podpisać</span></div>
      </div>
      <figcaption class="podpis">Przykład ilustracyjny, skrócona odpowiedź skilla.</figcaption>
    </figure>
  </div>
</section>

<section class="dziedziny" aria-label="Dziedziny">
  <div class="wrap"><div class="kafle" id="kafle">
    ${DZIEDZINY.map((d) => `<button class="kafel ${d.klasa}" type="button" data-kat="${d.k}">${ikona(d)}<b>${d.k}</b><span>${d.o}</span><em>${skille.filter((s) => s.kategoria === d.k).length} skilli</em></button>`).join("\n    ")}
  </div></div>
</section>

<section class="katalog" id="katalog" aria-labelledby="kat-t">
  <div class="wrap">
    <div class="glowa">
      <h2 class="sek" id="kat-t">Katalog skilli</h2>
      <p class="sek-opis">Ułożony według tego, czym się zajmujesz. Każda karta mówi, co zyskujesz; szczegóły, przykład i ograniczenia są po kliknięciu.</p>
    </div>
    <div class="narzedzia">
      <form class="szukaj" id="szukaj" role="search" action="/#katalog" toolname="szukaj_skilli" tooldescription="Wyszukuje darmowe skille AI po polsku w katalogu skille.aixperts.pl według opisu zadania, na przykład sprawdzić umowę albo przepisać faktury do tabeli. Zwraca nazwy, krótkie opisy i adresy kart skilli.">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <label class="sr-only" for="q">Szukaj skilla</label>
        <input id="q" name="q" type="search" placeholder="Wpisz, co chcesz zrobić: sprawdzić umowę, ogarnąć faktury, napisać ogłoszenie" autocomplete="off" toolparamdescription="Opis zadania po polsku albo słowo kluczowe, np. umowa, faktura, RODO, rekrutacja.">
      </form>
      <div class="chipy" id="chipy" role="group" aria-label="Filtr dziedzin">
        <button class="chip" type="button" data-kat="" aria-pressed="true">Wszystkie <small>${ile}</small></button>
        ${DZIEDZINY.map((d) => `<button class="chip" type="button" data-kat="${d.k}" aria-pressed="false">${d.k} <small>${skille.filter((s) => s.kategoria === d.k).length}</small></button>`).join("\n        ")}
        <span class="licznik" id="licznik" aria-live="polite"></span>
      </div>
    </div>
    <div id="lista">${grupy}</div>
    <div class="pusto" id="pusto" hidden><b>Nic nie pasuje do tego hasła.</b>Spróbuj prostszego słowa albo <a href="#test">zrób test dopasowania</a>.</div>
  </div>
</section>

<section class="pas" aria-labelledby="kr-t">
  <div class="wrap">
    <p class="eyebrow">Jak zacząć</p>
    <h2 class="sek" id="kr-t">Jak zacząć korzystać ze skilli? Trzy kroki, bez konta i bez instalowania programów</h2>
    <ol class="kroki">
      <li><b>01.</b><h3>Pobierz plik</h3><p>Na karcie skilla podajesz e-mail, a my wysyłamy link do pliku <code>.skill</code>. Darmowo, na licencji GPL.</p></li>
      <li><b>02.</b><h3>Wgraj do asystenta</h3><p>W Claude albo ChatGPT dodajesz plik w ustawieniach umiejętności. Instrukcja krok po kroku jest przy każdym skillu.</p></li>
      <li><b>03.</b><h3>Pracuj na swoich dokumentach</h3><p>Wklejasz umowę, fakturę albo opis sytuacji. Skill pilnuje polskich realiów i mówi, czego nie zrobi.</p></li>
    </ol>
  </div>
</section>

<section class="banery" aria-label="Na skróty">
  <div class="wrap">
    <div class="baner b-test">
      <small>Test dopasowania</small>
      <h2>Nie wiesz, od czego zacząć?</h2>
      <p>Siedem pytań o Twoją pracę, wynik od razu: zestaw skilli pod to, co robisz na co dzień.</p>
      <a class="btn" href="#test">Zacznij test</a>
    </div>
    <div class="baner b-ksef">
      <small>Nowość: KSeF w praktyce</small>
      <h2>Poradniki KSeF i sprawdzian gotowości na awarię</h2>
      <p>Dwanaście konkretnych odpowiedzi (awaria, odrzucona faktura, uprawnienia biura, przelewy od 2027) i sprawdzian w 10 pytaniach.</p>
      <a class="btn hot" href="/sprawdzian-ksef/" data-umami-event="sprawdzian-wejscie">Zrób sprawdzian</a>
    </div>
  </div>
</section>

<section class="test" id="test" aria-labelledby="test-t">
  <div class="wrap">
    <h2 class="sek" id="test-t">Test dopasowania: siedem pytań, wynik od razu</h2>
    <p class="sek-opis" style="margin-bottom:24px">Odpowiadasz na pytania o swoją pracę, a na końcu dostajesz zestaw skilli dobranych pod to, co robisz na co dzień. Nie musisz nic instalować, żeby zobaczyć wynik.</p>
    <div class="quiz">
      <div class="quiz-top"><span id="qstep">Pytanie 1 z 7</span><div class="bar"><i id="qbar"></i></div></div>
      <div class="quiz-body" id="qbody"><noscript><p>Test wymaga włączonej obsługi JavaScript. Skille znajdziesz też w <a href="#katalog">katalogu</a>.</p></noscript></div>
    </div>
  </div>
</section>

<section class="faq-sek" aria-labelledby="pytania-t">
  <div class="wrap" id="pytania">
    <p class="eyebrow">Pytania i odpowiedzi</p>
    <h2 class="sek" id="pytania-t">Najczęstsze pytania o skille AI</h2>
    <div class="faq">${FAQ_GLOWNA.map((f) => `<div class="faq-p"><h3>${esc(f.q)}</h3><p class="faq-o">${esc(f.a)}</p></div>`).join("")}</div>
  </div>
</section>

<section class="news" id="newsletter" aria-labelledby="nw-t">
  <div class="wrap"><div class="news-in">
    <div class="tx">
      <p class="eyebrow">Newsletter</p>
      <h2 id="nw-t">Prawo się zmienia. Niech Twoje skille zmieniają się razem z nim.</h2>
      <p>Raz na jakiś czas jeden mail: nowy skill, aktualizacja pod zmianę przepisów (KSeF, AML, AI Act, RODO) albo konkretna porada. Wypiszesz się jednym kliknięciem w stopce.</p>
      <p><b>Bonus na start:</b> ${komplet(LICZBA_GOTOWYCH)} w jednym pliku, mailem po potwierdzeniu zapisu.</p>
    </div>
    <div data-aix-subskrypcje="katalog-newsletter"><p>Formularz zapisu wymaga JavaScript. Możesz też napisać do kontakt@aixperts.pl.</p></div>
  </div></div>
</section>

<div class="wrap dolny" id="digital-xperts">
  <div class="pudlo nieb" style="margin-bottom:22px">${polec({ sciezka: "/", tytul: `${cfg.nazwaSerwisu}: darmowe skille AI pod polskie realia`, naglowek: "Znasz firmę, której to oszczędzi czas? Poleć katalog", tekst: "Darmowe skille AI po polsku: umowy, faktury, KSeF, RODO, kadry i biuro." })}</div>
  <div class="ciemny">
    <div>
      <h2>Możesz wdrożyć to sam. Albo zrobimy to razem.</h2>
      <p>Samo pobranie skilla to dopiero początek. Najwięcej zmienia się wtedy, gdy zespół wie, kiedy go użyć, a kiedy nie.</p>
    </div>
    <a class="btn line" href="${cfg.linkSzkolenia}">Zobacz terminy warsztatów</a>
  </div>
  <p class="zespol" style="margin-top:22px;color:var(--ink-2)"><strong>Skille mają pracować w całym zespole?</strong> Jeśli zadanie powtarza się u kilku osób, warto uzgodnić dane wejściowe, sposób sprawdzania wyniku i odpowiedzialność. <a href="https://d-x.pl/szkolenia-i-wdrozenia-ai/#dxaif-wdrozenie" style="color:var(--accent-ink)">Sprawdź możliwość wdrożenia w firmie z Digital Xperts</a></p>
</div>
`;

  const skrypt = `<script>
const SKILLE=${JSON.stringify(daneQuizu).replace(/</g, "\\u003c")};
${readFileSync(join(KORZEN, "szablony", "strona.js"), "utf8")}
</script>`;

  return strona({
    tytul: `${cfg.nazwaSerwisu}: darmowe skille AI pod polskie realia`,
    opis: cfg.opisSerwisu,
    sciezka: "/",
    sekcja: "katalog",
    tresc,
    skrypt,
    jsonld: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", "@id": `${BAZA}/#witryna`, url: `${BAZA}/`, name: cfg.nazwaSerwisu, inLanguage: "pl-PL", publisher: { "@type": "Organization", name: "AiXperts", url: "https://aixperts.pl/" } },
        {
          "@type": "CollectionPage", url: `${BAZA}/`, name: cfg.nazwaSerwisu, description: cfg.opisSerwisu, inLanguage: "pl-PL", speakable,
          mainEntity: { "@type": "ItemList", numberOfItems: ile, itemListElement: skille.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${BAZA}/skill/${s.id}/`, name: s.nazwa })) },
        },
        faqLd(FAQ_GLOWNA),
      ],
    },
  });
}

/* ---------- strony prawne ---------- */

// Dokument z docs/prawne: <h1> idzie do górnej sekcji, pierwszy p.skrot do ramki wersji,
// każde <h2> dostaje kotwicę i trafia do spisu treści w panelu bocznym.
function stronaPrawna({ plik, sciezka, tytul, opis, obrazek, nazwa }) {
  let dok = readFileSync(join(KORZEN, "docs", "prawne", plik), "utf8");
  const h1 = (dok.match(/<h1>([\s\S]*?)<\/h1>/) || [, nazwa])[1];
  dok = dok.replace(/<h1>[\s\S]*?<\/h1>/, "");
  let wersjaHtml = "";
  dok = dok.replace(/<p class="skrot">([\s\S]*?)<\/p>/, (_, w) => { wersjaHtml = w; return ""; });
  const spis = [];
  // Istniejące kotwice (np. #odstapienie) zostają, bo prowadzą do nich linki z innych stron.
  const czesci = dok.split(/(?=<h2[\s>])/);
  const tresc = czesci.map((c) => {
    const m = c.match(/^<h2(?:\s+id="([^"]+)")?>([\s\S]*?)<\/h2>/);
    if (!m) return c.trim() ? `<section>${c}</section>` : "";
    const id = m[1] || kotwica(m[2]);
    spis.push([id, m[2].replace(/<[^>]+>/g, "")]);
    return `<section>${c.replace(/^<h2(?:\s+id="[^"]+")?>/, `<h2 id="${id}">`)}</section>`;
  }).join("");
  const sciezkaOkr = [["Katalog", "/"], [nazwa, sciezka]];
  return strona({
    tytul, opis, sciezka, obrazek,
    tresc: `<section class="gora"><div class="wrap">${okruszkiHtml(sciezkaOkr)}<h1>${h1}</h1></div></section>
<div class="wrap uklad">
  <article class="prawny">${wersjaHtml ? `<p class="wersja">${wersjaHtml}</p>` : ""}${tresc}
    <div class="cta" style="margin-top:24px"><a class="btn line" href="/">Wróć do katalogu</a></div>
  </article>
  <aside class="bok"><nav class="pudlo" aria-label="Spis treści"><h2>Spis treści</h2><ol class="spis">${spis.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join("")}</ol></nav></aside>
</div>`,
    jsonld: { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", url: BAZA + sciezka, name: nazwa, inLanguage: "pl-PL", breadcrumb: okruszkiLd(sciezkaOkr) }] },
  });
}

/* ---------- 404 ---------- */

function strona404() {
  return strona({
    tytul: `Nie ma takiej strony, ${cfg.nazwaSerwisu}`,
    opis: "Ta strona nie istnieje albo została przeniesiona.",
    sciezka: "/404.html",
    tresc: `<section class="gora"><div class="wrap">
  <h1>Nie ma takiej strony</h1>
  <p class="lede">Adres mógł się zmienić albo strona została wycofana. Skille, poradniki i test dopasowania są pod ręką.</p>
  <div class="cta"><a class="btn" href="/#katalog">Przejdź do katalogu</a><a class="btn line" href="/poradniki/">Poradniki KSeF</a></div>
</div></section>`,
  }).replace('<link rel="canonical" href="' + BAZA + '/404.html">', '<meta name="robots" content="noindex">');
}

/* ---------- build ---------- */

console.log("Buduję serwis...\n");
rmSync(WY, { recursive: true, force: true });
mkdirSync(WY, { recursive: true });

const skille = wczytajSkille();
const LICZBA_GOTOWYCH = skille.filter((s) => s.status === "gotowy").length;
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
  if (s.status !== "gotowy") continue;
  const pliki = s.pliki.map((p) => (p.nazwa === `${s.id}/SKILL.md` ? zMetryczka(p, s) : p));
  pliki.push({ nazwa: `${s.id}/LICENSE.txt`, dane: Buffer.from(TEKST_LICENCJI, "utf8") });
  pliki.push({ nazwa: `${s.id}/LICENCJA.txt`, dane: Buffer.from(notkaLicencyjna(s), "utf8") });
  const zip = zbudujZip(pliki);
  zapisz(join(KORZEN, "paczki", `${s.id}.skill`), zip);
  console.log(`  paczka  paczki/${s.id}.skill  (${pliki.length} plików, ${(zip.length / 1024).toFixed(1)} KB)`);
}
// Bonus dla zapisanych na newsletter: wszystkie paczki w jednym ZIP-ie (wydaje go usługa po potwierdzeniu zapisu).
{
  const gotowe = skille.filter((s) => s.status === "gotowy");
  const pliki = gotowe.map((s) => ({ nazwa: `skille-po-polsku/${s.id}.skill`, dane: readFileSync(join(KORZEN, "paczki", `${s.id}.skill`)) }));
  pliki.push({ nazwa: "skille-po-polsku/CZYTAJ-MNIE.txt", dane: Buffer.from(`${cfg.nazwaSerwisu}: komplet ${gotowe.length} skilli, stan z ${new Date().toISOString().slice(0, 10)}.

Każdy plik .skill wgrywasz osobno:
Claude: Ustawienia -> Umiejętności -> Prześlij umiejętność
ChatGPT: Skills -> Upload from your computer (plan Business lub wyższy)

Wgraj tylko te, których potrzebujesz. Opisy: https://${cfg.domena}/
Licencja: ${cfg.licencja}, szczegóły w pliku LICENSE.txt w każdej paczce.
`, "utf8") });
  const zip = zbudujZip(pliki);
  zapisz(join(KORZEN, "paczki", "komplet-skilli.zip"), zip);
  console.log(`  komplet paczki/komplet-skilli.zip  (${gotowe.length} skilli, ${(zip.length / 1048576).toFixed(1)} MB)`);
}

/* ---------- poradniki (klaster treści KSeF) ---------- */

const GRUPY_POR = [
  { g: "Terminy, progi i kary", o: "Od kiedy, kogo dotyczy i co grozi od 2027 roku.", s: ["ksef-od-kiedy", "wyjatek-10-tys-ksef", "sankcje-ksef-2027", "numer-ksef-w-przelewach"] },
  { g: "Awaria i tryby pracy", o: "Co robić, gdy system nie przyjmuje faktur albo je odrzuca.", s: ["awaria-ksef-co-robic", "tryb-offline24", "faktura-odrzucona-w-ksef", "kody-qr-ksef"] },
  { g: "Dostępy i organizacja", o: "Kto ma uprawnienia, jak je odciąć i jak to spisać.", s: ["uprawnienia-ksef-biuro-rachunkowe", "zmiana-biura-rachunkowego-ksef", "odejscie-pracownika-ksef", "ksef-procedura-awaryjna-firmy"] },
];
const grupaPor = (slug) => GRUPY_POR.find((g) => g.s.includes(slug)) || { g: "Pozostałe", o: "", s: [] };

function wczytajPoradniki() {
  const dir = join(KORZEN, "poradniki");
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    const { dane, tresc } = frontmatter(readFileSync(join(dir, f), "utf8"));
    const faq = faqZ(sekcjaMd(tresc, FAQ_TYTUL));
    const bezFaq = tresc.split(new RegExp(`^##\\s+${FAQ_TYTUL}\\s*$`, "m"))[0];
    out.push({ slug: f.replace(/\.md$/, ""), tresc: bezFaq, faq, ...dane });
  }
  out.sort((a, b) => Number(a.kolejnosc || 99) - Number(b.kolejnosc || 99));
  return out;
}

// Poradnik: wstęp (tekst przed pierwszym ##) idzie do górnej sekcji jako lead,
// każde ## to osobna sekcja z kotwicą; sekcje praktyki, listy działań i źródeł
// dostają własny wygląd po tytule.
function renderPoradnik(md) {
  const czesci = md.split(/^## (.+)$/m);
  const wstep = czesci[0].trim();
  const spis = [];
  let html = "";
  for (let i = 1; i < czesci.length; i += 2) {
    const t = czesci[i].trim();
    const id = kotwica(t);
    spis.push([id, t]);
    const klasa = /praktyce|przykład/i.test(t) ? "praktyka" : /zrobić|lista czynności|krok po kroku/i.test(t) ? "lista-kontr" : /źródła/i.test(t) ? "zrodla" : "";
    const cialo = render(czesci[i + 1] || "");
    html += `<section id="${id}"><h2>${esc(t)}</h2>${klasa === "praktyka" ? `<div class="praktyka">${cialo}</div>` : klasa ? `<div class="${klasa}">${cialo}</div>` : cialo}</section>\n`;
  }
  return { wstep, html, spis };
}

function ctaPoradnika(p, skille) {
  const s = skille.find((x) => x.id === p.skill);
  if (!s) return "";
  return `<div class="pudlo nieb">
    <p class="eyebrow">Narzędzie do tego tematu</p>
    <h2>${esc(s.nazwa)}</h2>
    <p class="pod" style="margin:6px 0 14px">${esc(s.korzysc || s.skrot)} Skill porządkuje pracę i buduje dokumenty z realiów Twojej firmy; nie orzeka zgodności z przepisami i nie zastępuje doradcy podatkowego.</p>
    <a class="btn pelny" href="/skill/${s.id}/" data-umami-event="poradnik-cta" data-umami-event-skill="${s.id}">Pobierz za darmo</a>
  </div>`;
}

function stronaPoradnika(p, poradniki) {
  const gr = grupaPor(p.slug);
  const zSerii = [...poradniki.filter((x) => x.slug !== p.slug && gr.s.includes(x.slug)), ...poradniki.filter((x) => x.slug !== p.slug && !gr.s.includes(x.slug))].slice(0, 3);
  const { wstep, html, spis } = renderPoradnik(p.tresc);
  const sciezka = [["Poradniki KSeF", "/poradniki/"], [p.tytul, `/poradniki/${p.slug}/`]];
  const url = `${BAZA}/poradniki/${p.slug}/`;
  const tresc = `
<section class="gora"><div class="wrap">
  ${okruszkiHtml([["Poradniki KSeF", "/poradniki/"], [gr.g, `/poradniki/#${kotwica(gr.g)}`], [p.tytul, ""]])}
  <h1>${esc(p.tytul)}</h1>
  ${wstep ? render(wstep).replace("<p>", '<p class="lede" id="lede">') : `<p class="lede" id="lede">${esc(p.opis || "")}</p>`}
  <p class="stan">Stan na ${esc(p.dataSlownie || isoSlownie(p.data))}. Terminy i progi weryfikuj u źródła, adresy na końcu tekstu.</p>
  <div class="cta"><a class="btn" href="/sprawdzian-ksef/" data-umami-event="sprawdzian-wejscie">Sprawdź gotowość firmy</a>${p.faq.length ? `<a class="btn line" href="#pytania">Krótkie odpowiedzi</a>` : ""}</div>
</div></section>

<div class="wrap uklad">
  <article class="tresc por-art">
    ${html}
    ${faqHtml(p.faq)}
    ${zSerii.length ? `<section id="z-tej-serii"><h2>Z tej serii</h2><div class="podobne">${zSerii.map((x) => `<a class="mini k-dane" href="/poradniki/${x.slug}/"><b>${esc(x.tytul)}</b><span>${esc(x.zajawka || x.opis || "")}</span></a>`).join("")}</div></section>` : ""}
    <section><p class="zastrz">Ten poradnik porządkuje wiedzę operacyjną i nie jest poradą podatkową ani prawną; w sprawach stawek, odliczeń i kwalifikacji transakcji decyduje Twoja księgowa albo doradca podatkowy.</p>
      <div class="cta" style="margin-top:20px"><a class="btn line" href="/poradniki/">Wszystkie poradniki</a><a class="btn line" href="/sprawdzian-ksef/">Sprawdzian gotowości</a></div></section>
  </article>
  <aside class="bok">
    <nav class="pudlo" aria-label="Spis treści"><h2>W tym poradniku</h2><ol class="spis">${spis.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join("")}${p.faq.length ? `<li><a href="#pytania">${FAQ_TYTUL}</a></li>` : ""}</ol></nav>
    ${ctaPoradnika(p, skille)}
    <div class="pudlo">${polec({ sciezka: `/poradniki/${p.slug}/`, tytul: p.tytul, naglowek: "Poleć ten poradnik", tekst: p.zajawka || p.opis || "" })}</div>
  </aside>
</div>`;
  return strona({
    tytul: p.tytul, opis: p.opis, tresc, sciezka: `/poradniki/${p.slug}/`, sekcja: "poradniki",
    jsonld: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Article", headline: p.tytul, description: p.opis, inLanguage: "pl-PL", datePublished: p.data, dateModified: p.aktualizacja || p.data, mainEntityOfPage: url, author: { "@type": "Person", name: cfg.autor }, publisher: { "@type": "Organization", name: "AiXperts", url: "https://aixperts.pl/" } },
        { "@type": "WebPage", "@id": url, url, name: p.tytul, inLanguage: "pl-PL", speakable, breadcrumb: okruszkiLd(sciezka) },
        ...(p.faq.length ? [faqLd(p.faq)] : []),
      ],
    },
  });
}

function stronaSpisuPoradnikow(poradniki) {
  let n = 0;
  const grupy = [...GRUPY_POR, { g: "Pozostałe", o: "", s: poradniki.map((p) => p.slug).filter((sl) => !GRUPY_POR.some((g) => g.s.includes(sl))) }]
    .map((g) => ({ ...g, ls: g.s.map((sl) => poradniki.find((p) => p.slug === sl)).filter(Boolean) }))
    .filter((g) => g.ls.length);
  const tresc = `
<section class="gora"><div class="wrap">
  <p class="eyebrow">Poradniki</p>
  <h1>KSeF w praktyce firmy</h1>
  <p class="lede" id="lede">Konkretne odpowiedzi na sytuacje, w których firmy naprawdę utykają: awaria systemu, odrzucona faktura, uprawnienia dla biura. Pisane od zera pod polskie realia, ze źródłami i datą stanu.</p>
  <div class="baner-spr">
    <div><small>Zacznij od narzędzia</small><h2>Sprawdzian gotowości na awarię KSeF</h2><p>10 pytań, wynik od razu w przeglądarce, luki z linkami do poradników.</p></div>
    <a class="btn hot" href="/sprawdzian-ksef/" data-umami-event="sprawdzian-wejscie">Zrób sprawdzian</a>
  </div>
</div></section>
<div class="wrap grupy-por">
  ${grupy.map((g) => `<section class="grupa-por" id="${kotwica(g.g)}" aria-labelledby="${kotwica(g.g)}-t"><h2 id="${kotwica(g.g)}-t">${esc(g.g)}</h2>${g.o ? `<p>${esc(g.o)}</p>` : ""}<div class="karty-por">${g.ls.map((p) => { n++; return `<a class="kp" href="/poradniki/${p.slug}/"><i>${String(n).padStart(2, "0")}</i><b>${esc(p.tytul)}</b><span>${esc(p.zajawka || p.opis)}</span></a>`; }).join("")}</div></section>`).join("\n  ")}
</div>
<div class="wrap dolny">
  <div class="ciemny"><div><h2>Chcesz mieć to spisane dla swojej firmy?</h2><p>Skill Procedury operacyjne KSeF buduje z Tobą macierz ról, kartę postępowania na cztery tryby pracy, matrycę uprawnień i rejestr odrzuceń. Za darmo.</p></div><a class="btn line" href="/skill/ksef-procedury/" data-umami-event="poradnik-cta" data-umami-event-skill="ksef-procedury">Zobacz skill</a></div>
</div>`;
  return strona({
    tytul: "Poradniki KSeF dla firm", sekcja: "poradniki",
    opis: "Awaria KSeF, odrzucona faktura, uprawnienia biura rachunkowego, numer KSeF w przelewach: praktyczne poradniki ze źródłami i datą stanu.",
    tresc, sciezka: "/poradniki/",
    jsonld: { "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", url: `${BAZA}/poradniki/`, name: "Poradniki KSeF dla firm", inLanguage: "pl-PL", speakable: { "@type": "SpeakableSpecification", cssSelector: ["#lede"] }, mainEntity: { "@type": "ItemList", itemListElement: poradniki.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${BAZA}/poradniki/${p.slug}/`, name: p.tytul })) } }] },
  });
}

/* ---------- sprawdzian gotowości na awarię KSeF ---------- */

function stronaSprawdzianu() {
  // Pytania mapuja sie 1:1 na obszary poradnikow; "tak" = obszar domkniety.
  // Wynik NIE jest ocena zgodnosci: liczy domkniete obszary wedlug deklaracji
  // odpowiadajacego i wskazuje luki z linkiem do wlasciwego poradnika.
  const PYTANIA = [
    { p: "Czy w firmie jest spisane, kto wystawia faktury w KSeF i kto go zastępuje podczas urlopu albo choroby?", luka: "Nie ma spisanego podziału ról przy wystawianiu.", por: "ksef-procedura-awaryjna-firmy" },
    { p: "Czy ktoś codziennie sprawdza, że wystawione faktury dostały numer KSeF (a odrzucone są wyłapywane)?", luka: "Nikt nie pilnuje statusów i odrzuceń na bieżąco.", por: "faktura-odrzucona-w-ksef" },
    { p: "Czy prowadzicie rejestr odrzuconych faktur (kto, kiedy, przyczyna, co zrobiono)?", luka: "Odrzucenia nie zostawiają śladu, po którym można działać.", por: "faktura-odrzucona-w-ksef" },
    { p: "Czy macie zapisane, gdzie sprawdza się ogłoszenia o awarii i niedostępności KSeF, i wiecie, że są cztery różne tryby pracy bez dostępu?", luka: "W dniu awarii nikt nie będzie wiedział, który tryb obowiązuje.", por: "awaria-ksef-co-robic" },
    { p: "Czy wiadomo, kto podejmuje decyzję o wystawianiu offline, także w piątek po godzinach?", luka: "Brak osoby decyzyjnej poza godzinami pracy to najczęstsza luka.", por: "awaria-ksef-co-robic" },
    { p: "Czy osoba wystawiająca wie, że fakturę z trybu offline24 trzeba przesłać do systemu najpóźniej następnego dnia roboczego, i jest wyznaczona do tego dosłania?", luka: "Termin dosłania offline24 nie ma właściciela.", por: "tryb-offline24" },
    { p: "Czy wiecie, kiedy wizualizacja faktury ma jeden kod QR, a kiedy dwa, i czy macie certyfikat właściwego typu?", luka: "Reguła kodów QR i certyfikat typu 2 są nierozpoznane.", por: "kody-qr-ksef" },
    { p: "Czy istnieje aktualny spis, kto ma jakie uprawnienia w KSeF, łącznie z biurem rachunkowym i jego pracownikami?", luka: "Nie wiadomo, kto naprawdę ma dostęp do faktur firmy.", por: "uprawnienia-ksef-biuro-rachunkowe" },
    { p: "Czy jest lista czynności na odejście osoby z dostępem do KSeF (odebranie uprawnień w dniu zakończenia pracy, los certyfikatu)?", luka: "Odejście pracownika zostawi otwarte dostępy.", por: "odejscie-pracownika-ksef" },
    { p: "Czy wiecie, co zmienia się w przelewach od 1 stycznia 2027 roku i kto w firmie będzie za to odpowiadał?", luka: "Numer KSeF w płatnościach nie ma jeszcze właściciela.", por: "numer-ksef-w-przelewach" },
  ];
  const sciezka = [["Poradniki KSeF", "/poradniki/"], ["Sprawdzian gotowości", "/sprawdzian-ksef/"]];
  const tresc = `
<section class="gora"><div class="wrap">
  ${okruszkiHtml(sciezka)}
  <h1>Sprawdzian gotowości na awarię KSeF</h1>
  <p class="lede" id="lede">10 pytań o to, jak Twoja firma naprawdę pracuje z KSeF. Wynik liczy się w Twojej przeglądarce i nigdzie nie jest wysyłany. To nie jest audyt ani ocena zgodności z przepisami: sprawdzasz sam siebie, według własnych odpowiedzi.</p>
</div></section>
<div class="wrap"><div class="spr-wrap">
  <div class="postep"><span id="spr-licz">0 z 10</span><span class="pas-p" aria-hidden="true"><i id="spr-pas"></i></span></div>
  <div id="spr-lista">${PYTANIA.map((q, i) => `<div class="pyt"><b>${String(i + 1).padStart(2, "0")}.</b><p id="spr-p${i}">${esc(q.p)}</p><div class="odp" role="group" aria-labelledby="spr-p${i}"><button type="button" class="t" data-i="${i}" data-v="1" aria-pressed="false">Tak</button><button type="button" class="n" data-i="${i}" data-v="0" aria-pressed="false">Nie / nie wiem</button></div></div>`).join("")}</div>
  <noscript><p>Sprawdzian wymaga włączonej obsługi JavaScript. Wszystkie tematy znajdziesz też w <a href="/poradniki/">poradnikach</a>.</p></noscript>
  <div class="wynik-spr" id="spr-wynik" aria-live="polite"><h2>Wynik pojawi się po dziesiątej odpowiedzi</h2><p>Każda odpowiedź „Nie / nie wiem” trafi tu jako obszar do domknięcia, z linkiem do poradnika.</p></div>
  <p class="zastrz" style="margin-top:18px">Sprawdzian porządkuje obszary operacyjne i nie jest poradą podatkową ani prawną; o stawkach, odliczeniach i kwalifikacji transakcji decyduje Twoja księgowa albo doradca podatkowy.</p>
  <div class="pudlo nieb" style="margin-top:22px">${polec({ sciezka: "/sprawdzian-ksef/", tytul: "Sprawdzian gotowości na awarię KSeF", naglowek: "Poleć sprawdzian księgowej albo wspólnikowi", tekst: "10 pytań o gotowość firmy na awarię KSeF, wynik od razu w przeglądarce." })}</div>
</div></div>`;
  const skrypt = `<script>
(function(){
  var PYT=${JSON.stringify(PYTANIA)};
  var lista=document.getElementById("spr-lista"),w=document.getElementById("spr-wynik");if(!lista)return;
  var odp=new Array(PYT.length).fill(null),start=false;
  function rys(){
    var n=odp.filter(function(x){return x!==null}).length;
    document.getElementById("spr-licz").textContent=n+" z "+PYT.length;
    document.getElementById("spr-pas").style.width=(n/PYT.length*100)+"%";
    lista.querySelectorAll("button").forEach(function(b){b.setAttribute("aria-pressed",String(odp[b.dataset.i]===Number(b.dataset.v)))});
    if(n<PYT.length){w.innerHTML='<h2>Wynik pojawi się po dziesiątej odpowiedzi</h2><p>Brakuje '+(PYT.length-n)+'. Każda odpowiedź „Nie / nie wiem” trafi tu jako obszar do domknięcia, z linkiem do poradnika.</p>';return}
    var tak=odp.reduce(function(a,b){return a+b},0),luki=PYT.filter(function(q,i){return odp[i]===0});
    var h='<h2>Domknięte obszary według Twoich odpowiedzi: '+tak+' z '+PYT.length+'</h2>';
    h+=luki.length?'<p>Obszary do domknięcia, każdy z poradnikiem:</p><ul>'+luki.map(function(q){return '<li><span>'+q.luka+'</span><a href="/poradniki/'+q.por+'/">Jak to domknąć →</a></li>'}).join("")+'</ul>':'<p>Na tej liście nie widać luk. To dobry moment, żeby spisane zasady przetestować na sucho: awaria sprawdzona w spokojny wtorek boli mniej niż w piątkowy szczyt.</p>';
    h+='<p style="margin-bottom:14px">Komplet do domknięcia całości (macierz ról, karta postępowania na cztery tryby, matryca uprawnień, rejestr odrzuceń) zbudujesz ze skillem Procedury operacyjne KSeF. Porządkuje pracę, nie orzeka zgodności z przepisami.</p><a class="btn" href="/skill/ksef-procedury/" data-umami-event="poradnik-cta" data-umami-event-skill="ksef-procedury">Zobacz skill Procedury operacyjne KSeF</a>';
    w.innerHTML=h;
    if(window.umami){try{umami.track("sprawdzian-wynik",{domkniete:tak})}catch(_){}}
  }
  lista.addEventListener("click",function(e){
    var b=e.target.closest("button[data-i]");if(!b)return;
    odp[Number(b.dataset.i)]=Number(b.dataset.v);
    if(!start&&window.umami){start=true;try{umami.track("sprawdzian-start")}catch(_){}}
    rys();
  });
})();
</script>`;
  return strona({
    tytul: "Sprawdzian gotowości na awarię KSeF",
    opis: "10 pytań o realną gotowość firmy: kto decyduje przy awarii KSeF, kto dosyła faktury offline24, kto pilnuje odrzuceń i uprawnień. Wynik w przeglądarce.",
    tresc, sciezka: "/sprawdzian-ksef/", skrypt, sekcja: "poradniki",
    jsonld: { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", url: `${BAZA}/sprawdzian-ksef/`, name: "Sprawdzian gotowości na awarię KSeF", inLanguage: "pl-PL", breadcrumb: okruszkiLd(sciezka) }] },
  });
}

/* ---------- zasoby dla agentów: llms.txt i ARD ---------- */

function llmsTxt(skille, poradniki) {
  const linie = [
    `# ${cfg.nazwaSerwisu} (${cfg.domena})`,
    "",
    `> ${cfg.opisSerwisu} Każdy skill to folder zgodny z otwartym standardem Agent Skills (SKILL.md + materiały), pisany od zera pod polskie realia i sprawdzony przez nas w Claude i ChatGPT.`,
    "",
    "Plik .skill wysyłamy linkiem na adres e-mail podany na karcie skilla; nie ma publicznego bezpośredniego pobrania. Karta skilla opisuje, co skill robi, czego celowo nie robi, na czym się wywala i gdzie działa. Skille z dziedzin prawa, podatków i kadr pomagają zrozumieć sprawę i przygotować pytania do specjalisty; nie orzekają i nie piszą wiążących dokumentów.",
    "",
  ];
  for (const d of DZIEDZINY) {
    const ls = skille.filter((s) => s.kategoria === d.k).sort((a, b) => a.nazwa.localeCompare(b.nazwa, "pl"));
    if (!ls.length) continue;
    linie.push(`## Skille: ${d.k}`, "");
    for (const s of ls) linie.push(`- [${s.nazwa}](${BAZA}/skill/${s.id}/): ${s.skrot}`);
    linie.push("");
  }
  if (poradniki.length) {
    linie.push("## Poradniki KSeF", "");
    for (const p of poradniki) linie.push(`- [${p.tytul}](${BAZA}/poradniki/${p.slug}/): ${p.zajawka || p.opis}`);
    linie.push("");
  }
  linie.push("## Narzędzia", "",
    `- [Test dopasowania skilli](${BAZA}/#test): siedem pytań o pracę, wynik z zestawem skilli w przeglądarce`,
    `- [Sprawdzian gotowości na awarię KSeF](${BAZA}/sprawdzian-ksef/): 10 pytań, wynik w przeglądarce, luki z linkami do poradników`,
    "", "## Informacje", "",
    `- [Regulamin](${BAZA}/regulamin/)`, `- [Prywatność](${BAZA}/prywatnosc/)`, `- [Wdrożenia AiXperts](${BAZA}/wdrozenia/)`,
    `- [Repozytorium na GitHubie (GPL)](${REPO}): treść wszystkich skilli, standard i generator; opis: ${BAZA}/github/`,
    `- [Katalog dla agentów (ARD)](${BAZA}/.well-known/ard.json)`, "");
  return linie.join("\n");
}

// ARD v0.91: wpis opisuje skill danymi wpisanymi wprost (`data`), bo sama paczka
// nie ma publicznego adresu (wydajemy ją linkiem z maila). Strona karty jest w `data.homepage`.
function ardManifest(skille) {
  return {
    specVersion: "1.0",
    host: { displayName: `${cfg.nazwaSerwisu} (AiXperts)`, identifier: `urn:air:${cfg.domena}:katalog` },
    entries: skille.filter((s) => s.status === "gotowy").map((s) => ({
      identifier: `urn:air:${cfg.domena}:skill:${s.id}`,
      displayName: s.nazwa,
      type: "application/agent-skills+json",
      description: s.skrot,
      tags: [s.kategoria, ...s.szukaj.slice(0, 6)],
      representativeQueries: s.faq.slice(0, 3).map((f) => f.q),
      version: s.wersja || undefined,
      updatedAt: s.aktualizacja ? `${s.aktualizacja}T00:00:00Z` : undefined,
      data: {
        name: s.id,
        description: s.skrot,
        language: "pl",
        license: cfg.licencja,
        homepage: `${BAZA}/skill/${s.id}/`,
        compatibility: Object.keys(cfg.platformy).filter((k) => zgOk(s, k)).map((k) => cfg.platformy[k].nazwa),
        distribution: "Plik .skill wysyłany linkiem na adres e-mail podany na stronie skilla (homepage).",
      },
    })),
  };
}

/* ---------- zapis stron ---------- */

zapisz(join(WY, "index.html"), stronaGlowna(skille));
console.log("  strona  /");
for (const s of skille) {
  zapisz(join(WY, "skill", s.id, "index.html"), stronaSkilla(s, skille));
  console.log(`  strona  /skill/${s.id}/`);
}
zapisz(join(WY, "wdrozenia", "index.html"), stronaWdrozen());
console.log("  strona  /wdrozenia/");
const poradniki = wczytajPoradniki();
if (poradniki.length) {
  zapisz(join(WY, "sprawdzian-ksef", "index.html"), stronaSprawdzianu());
  console.log("  strona  /sprawdzian-ksef/");
  zapisz(join(WY, "poradniki", "index.html"), stronaSpisuPoradnikow(poradniki));
  console.log("  strona  /poradniki/");
  for (const p of poradniki) {
    zapisz(join(WY, "poradniki", p.slug, "index.html"), stronaPoradnika(p, poradniki));
    console.log(`  strona  /poradniki/${p.slug}/`);
  }
}
zapisz(join(WY, "prywatnosc", "index.html"), stronaPrawna({ plik: "prywatnosc-tresc.html", sciezka: "/prywatnosc/", nazwa: "Prywatność", tytul: `Prywatność, ${cfg.nazwaSerwisu}`, opis: "Dane, odbiorcy, przechowywanie i prawa w serwisach AiXperts.", obrazek: "prywatnosc.png" }));
console.log("  strona  /prywatnosc/");
zapisz(join(WY, "regulamin", "index.html"), stronaPrawna({ plik: "regulamin-tresc.html", sciezka: "/regulamin/", nazwa: "Regulamin", tytul: `Regulamin, ${cfg.nazwaSerwisu}`, opis: "Zasady katalogu, pobierania skilli, newslettera, reklamacji i odstąpienia.", obrazek: "regulamin.png" }));
console.log("  strona  /regulamin/");
zapisz(join(WY, "404.html"), strona404());
zapisz(join(WY, "github", "index.html"), stronaGithub(skille, poradniki));
console.log("  strona  /github/");

// zasoby
for (const f of ["styl.css", "ekosystem.js", "subskrypcje-ui.js", "subskrypcje-ui.css", "ikona.png", "fonty.css"]) cpSync(join(KORZEN, "szablony", f), join(WY, f));
mkdirSync(join(WY, "fonty"), { recursive: true });
for (const f of readdirSync(join(KORZEN, "szablony", "fonty"))) if (f.startsWith("red-hat-") || f.startsWith("OFL")) cpSync(join(KORZEN, "szablony", "fonty", f), join(WY, "fonty", f));
if (existsSync(join(KORZEN, "szablony", "og"))) cpSync(join(KORZEN, "szablony", "og"), join(WY, "og"), { recursive: true });

// zasoby dla agentów AI
zapisz(join(WY, "llms.txt"), llmsTxt(skille, poradniki));
const ard = JSON.stringify(ardManifest(skille), null, 2);
zapisz(join(WY, ".well-known", "ard.json"), ard);
zapisz(join(WY, ".well-known", "ai-catalog.json"), ard); // starsza ścieżka, ta sama treść

// dane dla usługi zapisów, żeby maile (zestaw, pobrania paczek) znały nazwy i adresy skilli
zapisz(
  join(WY, "dane", "skille.json"),
  JSON.stringify(
    skille.map((s) => ({ id: s.id, nazwa: s.nazwa, skrot: s.skrot, gotowy: s.status === "gotowy", platny: false, cena: "", trial: false, wersja: s.wersja, aktualizacja: s.aktualizacja || "", ...(s.zmiany ? { zmiany: s.zmiany } : {}) })),
    null,
    2
  )
);

// sitemap i robots
const adresy = [["/", ""], ["/wdrozenia/", ""], ["/github/", ""], ["/prywatnosc/", ""], ["/regulamin/", ""],
  ...(poradniki.length ? [["/poradniki/", ""], ["/sprawdzian-ksef/", ""], ...poradniki.map((p) => [`/poradniki/${p.slug}/`, p.aktualizacja || p.data])] : []),
  ...skille.map((s) => [`/skill/${s.id}/`, s.aktualizacja])];
zapisz(
  join(WY, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    adresy.map(([u, d]) => `  <url><loc>${BAZA}${u}</loc>${/^\d{4}-\d{2}-\d{2}$/.test(d || "") ? `<lastmod>${d}</lastmod>` : ""}</url>`).join("\n") +
    `\n</urlset>\n`
);
zapisz(join(WY, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${BAZA}/sitemap.xml\n`);

console.log(`\nGotowe. ${skille.length} skilli, ${adresy.length} podstron, katalog public/`);
if (cfg.domena.includes("PODMIEN")) {
  console.log("\nUWAGA: w config.json nie ustawiono jeszcze domeny, sitemap i adresy kanoniczne są tymczasowe.");
}
