Reading additional input from stdin...
2026-08-20T15:48:11.524825Z ERROR codex_models_manager::manager: failed to load models cache: missing field `supports_parallel_tool_calls` at line 97 column 5
OpenAI Codex v0.147.0
--------
workdir: C:\Users\CP24\AiXperts - projekty\katalog-skilli
model: gpt-5.6-sol
provider: openai
approval: never
sandbox: read-only
reasoning effort: xhigh
reasoning summaries: none
session id: 01a01fdb-c5a1-7c50-aed8-9b545b41828b
--------
user
Jestes szefem niezaleznego zespolu produktowego. NIE czytaj plikow, NIE uruchamiaj komend, NIE korzystaj z internetu; wszystko masz wklejone ponizej. Odpowiedz WYLACZNIE tekstem po polsku, bez dlugich myslnikow, bez emoji.

ZADANIE: Zwolaj panel 5 ekspertow: CRO/lejki, badacz UX kwestionariuszy, strateg sprzedazy B2B, inzynier full-stack, copywriter PL. Kazdy wypowiada sie OSOBNO (sekcja z rola): diagnoza + stanowisko wg formatu z briefu. Na koncu TY scalasz w JEDNA decyzje (usunac/przebudowac) i JEDEN projekt wykonawczy: pelne brzmienia pytan i tekstow, regula doboru platnych, prezentacja wyniku, zmiany maila, minimalny diff kodu (opisowo, po fragmentach: strona.js / build.mjs / zapisy.mjs).

===== BRIEF =====
# Brief: test doboru (ankieta) a platne skille

## Problem (werdykt wlasciciela)

Test doboru na stronie glownej ("Nie wiesz, czego szukac? Nie musisz.", 6 pytan)
NIE UWZGLEDNIA platnych skilli. Wlasciciel: "albo trzeba usunac albo ustawic od
nowa". Zadanie zespolu: zdecydowac i zaprojektowac rozwiazanie do wdrozenia.

## Jak ankieta dziala DZIS (fakty z kodu)

- Zrodlo: szablony/strona.js (PYTANIA, scoring, wynik, capture) + build.mjs
  (daneQuizu) + serwer/zapisy.mjs (zapis, mail z zestawem, lead do CRM).
- daneQuizu w build.mjs: TYLKO darmowe skille (filtr `String(s.platny) !== "true"`).
  Kazdy skill ma: id, n (nazwa), o (skrot), t (tagi z pola `szukaj`), g (gotowy).
- 6 pytan (rola, pozeracz czasu, umowy, faktury, rekrutacja, wielkosc firmy).
  Kazda odpowiedz dodaje +1 do tagow, np. "Tak, duzo faktur" -> faktury,
  ksiegowosc, finanse. Tagi w uzyciu: firma, umowa, B2B, ksiegowosc, faktury,
  finanse, kadry, rekrutacja, marketing, sprzedaz, tresci, freelancer, biuro,
  pisma, dokumenty, dane, komunikacja, maile, kontrakt, ryzyko, prawnik, raporty.
- Wynik: suma punktow po tagach skilla, top 6, lista linkow + panel
  "Wyslac Ci ten zestaw na maila?" (glowna bramka mailowa lejka: double opt-in,
  potem lead w CRM z lista dobranych skilli i sekwencja ankieta->oferta).
- Mail z zestawem (zapisy.mjs, mailZZestawem): numerowana lista, link do
  podstrony kazdego skilla, instrukcja pobrania paczki .skill; skille spoza
  `gotowy` dostaja dopisek "(w przygotowaniu)". UWAGA: w public/dane/skille.json
  platne maja gotowy=false, wiec platny w wyniku dostalby dzis falszywy dopisek
  "(w przygotowaniu)" i instrukcje pobrania, ktora dla niego nie dziala.
- Umami: zdarzenia wynik-testu i zapis.

## Platne skille (3)

| id | nazwa | kategoria | cena | trial | tagi (szukaj) |
|---|---|---|---|---|---|
| polityka-ai | Polityka AI i rejestr zastosowan | Prawo | od 890 zl netto | NIE | polityka AI, AI Act, rejestr systemow AI, obowiazki AI Act, kompetencje AI, klauzula AI do umowy, praktyki zakazane AI, zasady korzystania z AI w firmie, dokumentacja AI, incydent AI, prawo |
| oferta-behawioralna | Oferta behawioralna | Marketing | od 490 zl | TAK (paczka trial) | oferta behawioralna, oferta B2B, pakiety, kotwica ceny, wabik, odwrocenie ryzyka, konwersja oferty, wycena, propozycja wspolpracy, premium, sprzedaz |
| operaty-szacunkowe | Operaty szacunkowe, warsztat rzeczoznawcy | Finanse | od 890 zl netto | NIE | operat szacunkowy, wycena nieruchomosci, rzeczoznawca majatkowy, podejscie porownawcze, podejscie dochodowe, stopa kapitalizacji, zuzycie techniczne, analiza rynku, ocena operatu, finanse |

PULAPKA DOPASOWANIA: proste wlaczenie platnych do scoringu daje bledy, np.
operaty-szacunkowe maja tag "finanse", wiec ksiegowa od faktur dostalaby
narzedzie rzeczoznawcy za 890 zl; polityka-ai nie ma zadnego tagu z pytan
(prawo nie jest przyznawane, prawnik nie wystepuje w jej tagach); tylko
oferta-behawioralna ma naturalny zaczep (sprzedaz). Rozwiazanie musi byc
madrzejsze niz "dopisac do listy": osobne sygnaly (nowe pytanie/odpowiedzi,
progi, twarde tagi-kotwice), osobna prezentacja, albo swiadoma rezygnacja.

## Decyzja do podjecia

Usunac ankiete czy przebudowac? Oceniaj uczciwie, ale pamietaj: ankieta jest
GLOWNA bramka mailowa lejka (zapis -> CRM -> sekwencja ofert), wiec usuniecie
to utrata zapisow; rekomendacja usuniecia wymaga mocnego uzasadnienia i planu
zastepczego dla lejka.

## Ograniczenia twarde

- Jezyk polski, zero dlugich myslnikow, zero emoji.
- Uczciwosc: platny skill nie moze byc przedstawiany jak darmowy; cena widoczna
  przy rekomendacji; zadnego sztucznego windowania platnych nad lepiej
  dopasowane darmowe; komunikaty o pobraniu nie moga klamac (platnego sie nie
  pobiera, kupuje sie licencje; trial ma tylko oferta-behawioralna).
- Copy zgody/RODO przy zapisie zostaje bez zmian.
- Minimalne ryzyko regresu dzialajacego lejka (double opt-in, mail, CRM).
- Wykonalnosc: czysty JS w strona.js (zero zaleznosci), dane z build.mjs,
  mail w zapisy.mjs (plain-ish text). Zadnych nowych uslug.
- Test ma zostac krotki (dzis 6 pytan; wiecej niz 8 to spadek ukonczen).

## Format odpowiedzi

1. DECYZJA: usunac / przebudowac (1 akapit uzasadnienia).
2. PROJEKT rozwiazania (koncept + szczegoly): pytania/odpowiedzi (pelne brzmienia,
   jesli zmieniasz), regula doboru platnych (kiedy sie pojawiaja, gdzie, prog),
   prezentacja w wyniku (dokladny uklad/teksty), zmiany w mailu z zestawem
   (dokladne brzmienia dla pozycji platnej), zmiany danych (daneQuizu, skille.json).
3. RYZYKA i jak je zamykasz (max 5).
4. Czego NIE ruszac (lista).

===== szablony/strona.js (CALOSC) =====
/* Skrypt strony głównej: filtrowanie katalogu + test doboru.
   Wstrzykiwany przez build.mjs razem ze stałymi SKILLE i KATEGORIE. */

const $ = (id) => document.getElementById(id);

/* ---------- katalog ---------- */

let kat = "Wszystkie";
let platnosc = "dowolne"; // dowolne | darmowe | platne
let fraza = "";

const PLATNOSC = [["Dowolne", "dowolne"], ["Darmowe", "darmowe"], ["Płatne", "platne"]];

const filtry = $("filters");
filtry.innerHTML =
  KATEGORIE.map((c) => `<button class="chip${c === kat ? " on" : ""}" data-c="${c}">${c}</button>`).join("") +
  `<span class="chip-sep" aria-hidden="true"></span>` +
  PLATNOSC.map(([label, v]) => `<button class="chip chip-p${v === platnosc ? " on" : ""}" data-p="${v}">${label}</button>`).join("");

filtry.addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  if (b.dataset.c !== undefined) {
    kat = b.dataset.c;
    [...filtry.querySelectorAll("[data-c]")].forEach((x) => x.classList.toggle("on", x.dataset.c === kat));
  } else if (b.dataset.p !== undefined) {
    platnosc = b.dataset.p;
    [...filtry.querySelectorAll("[data-p]")].forEach((x) => x.classList.toggle("on", x.dataset.p === platnosc));
  }
  filtruj();
});

$("q").addEventListener("input", (e) => {
  fraza = e.target.value.toLowerCase().trim();
  filtruj();
});

function odmiana(n) {
  if (n === 1) return "1 umiejętność";
  const d = n % 10, s = n % 100;
  if (d >= 2 && d <= 4 && !(s >= 12 && s <= 14)) return n + " umiejętności";
  return n + " umiejętności";
}

function filtruj() {
  let widoczne = 0;
  for (const karta of document.querySelectorAll("#grid .card")) {
    const platnaKarta = karta.dataset.platny === "1";
    const pasuje =
      (kat === "Wszystkie" || karta.dataset.kat === kat) &&
      (platnosc === "dowolne" || (platnosc === "platne" ? platnaKarta : !platnaKarta)) &&
      (!fraza || karta.dataset.szukaj.includes(fraza));
    karta.style.display = pasuje ? "" : "none";
    if (pasuje) widoczne++;
  }
  $("count").textContent = odmiana(widoczne);
}
filtruj();

/* ---------- test doboru ---------- */

const PYTANIA = [
  { q: "Czym się głównie zajmujesz?", h: "Wybierz to, co najbliższe. Możesz zaznaczyć kilka.", wiele: true,
    o: [["Prowadzę własną firmę", ["firma", "umowa", "B2B"]],
        ["Księgowość i finanse", ["księgowość", "faktury", "finanse"]],
        ["Kadry i rekrutacja", ["kadry", "rekrutacja"]],
        ["Marketing i sprzedaż", ["marketing", "sprzedaż", "treści"]],
        ["Pracuję na własnej działalności", ["freelancer", "umowa", "B2B"]],
        ["Administracja i biuro", ["biuro", "pisma", "dokumenty"]]] },
  { q: "Co zjada Ci najwięcej czasu?", h: "Jedna odpowiedź, ta najbardziej dotkliwa.", wiele: false,
    o: [["Pisanie i poprawianie dokumentów", ["dokumenty", "pisma", "biuro"]],
        ["Przepisywanie danych między plikami", ["faktury", "dane", "księgowość"]],
        ["Maile i komunikacja", ["komunikacja", "maile"]],
        ["Czytanie długich dokumentów", ["umowa", "kontrakt", "ryzyko"]]] },
  { q: "Podpisujesz umowy z klientami albo dostawcami?", h: "", wiele: false,
    o: [["Tak, regularnie", ["umowa", "kontrakt", "prawnik", "ryzyko", "B2B"]],
        ["Czasem, przy większych sprawach", ["umowa", "kontrakt"]],
        ["Rzadko albo wcale", []]] },
  { q: "Wystawiasz albo księgujesz faktury?", h: "", wiele: false,
    o: [["Tak, dużo", ["faktury", "księgowość", "finanse"]],
        ["Kilka w miesiącu", ["faktury", "finanse"]],
        ["Nie zajmuję się tym", []]] },
  { q: "Zatrudniasz albo rekrutujesz?", h: "", wiele: false,
    o: [["Tak, prowadzimy rekrutacje", ["kadry", "rekrutacja"]],
        ["Sporadycznie", ["kadry"]],
        ["Nie", []]] },
  { q: "Jak duża jest Twoja firma?", h: "", wiele: false,
    o: [["Pracuję sam", ["freelancer", "firma"]],
        ["Do 10 osób", ["firma"]],
        ["11-50 osób", ["firma", "kadry"]],
        ["Więcej niż 50", ["kadry", "raporty"]]] },
];

let nr = 0, zaznaczone = [], punkty = {}, wynik = [];

function rysuj() {
  if (nr >= PYTANIA.length) return pokazWynik();
  const P = PYTANIA[nr];
  $("qstep").textContent = `Pytanie ${nr + 1} z ${PYTANIA.length}`;
  $("qbar").style.width = (nr / PYTANIA.length) * 100 + "%";
  $("qbody").innerHTML = `
    <div class="q-title">${P.q}</div>
    <div class="q-help" id="qhelp">${P.h || (P.wiele ? "Możesz zaznaczyć kilka." : "Wybierz jedną odpowiedź.")}</div>
    <div class="opts">${P.o.map((o, i) => `<button class="opt" data-i="${i}"><span class="box"></span>${o[0]}</button>`).join("")}</div>
    <div class="quiz-foot">
      <button class="link-btn" id="wstecz"${nr === 0 ? " disabled" : ""}>&larr; Wstecz</button>
      <button class="btn" id="dalej">${nr === PYTANIA.length - 1 ? "Pokaż wynik" : "Dalej"}</button>
    </div>`;
  zaznaczone = [];

  document.querySelectorAll(".opt").forEach((b) => {
    b.addEventListener("click", () => {
      const i = +b.dataset.i;
      if (P.wiele) {
        b.classList.toggle("on");
        zaznaczone = zaznaczone.includes(i) ? zaznaczone.filter((x) => x !== i) : [...zaznaczone, i];
      } else {
        document.querySelectorAll(".opt").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        zaznaczone = [i];
      }
    });
  });

  $("dalej").addEventListener("click", () => {
    if (!zaznaczone.length) {
      $("qhelp").textContent = "Zaznacz przynajmniej jedną odpowiedź, żeby przejść dalej.";
      return;
    }
    zaznaczone.forEach((i) => P.o[i][1].forEach((t) => (punkty[t] = (punkty[t] || 0) + 1)));
    nr++;
    rysuj();
  });

  if (nr > 0) $("wstecz").addEventListener("click", () => { nr--; rysuj(); });
}

function pokazWynik() {
  $("qstep").textContent = "Twój zestaw";
  $("qbar").style.width = "100%";

  wynik = SKILLE.map((s) => ({ s, n: s.t.reduce((a, t) => a + (punkty[t] || 0), 0) }))
    .sort((a, b) => b.n - a.n || (b.s.g ? 1 : 0) - (a.s.g ? 1 : 0))
    .slice(0, 6)
    .map((r) => r.s);

  // Nagłówek musi mówić prawdę o liczbie pozycji, przy małym katalogu
  // obietnica "sześć umiejętności" nad jedną kartą wygląda na awarię.
  // Polski liczebnik rządzi przypadkiem: jedna dobrana, dwie, cztery dobrane,
  // pięć i więcej dobranych. Bez tego nagłówek zgrzyta przy każdym wyniku.
  const SLOWNIE = ["Zero", "Jedna", "Dwie", "Trzy", "Cztery", "Pięć", "Sześć"];
  const n = wynik.length;
  const liczba = SLOWNIE[n] || n;
  const naglowek =
    n === 1 ? "Jedna umiejętność dobrana pod Twoją pracę"
    : n >= 2 && n <= 4 ? `${liczba} umiejętności dobrane pod Twoją pracę`
    : `${liczba} umiejętności dobranych pod Twoją pracę`;

  $("qbody").innerHTML = `
    <div class="q-title">${naglowek}</div>
    <div class="q-help">${wynik.length > 1 ? "Kolejność nie jest przypadkowa, na górze to, co przy Twoich odpowiedziach zmieni najwięcej." : "To najlepsze dopasowanie do tego, co robisz. Katalog rośnie, resztę przyślemy, gdy będzie gotowa."}</div>
    <div class="result-grid">
      <div class="rlist">${wynik.map((s, i) => `
        <a class="ritem" href="/skill/${s.id}/">
          <div class="rnum">${String(i + 1).padStart(2, "0")}</div>
          <div><b>${s.n}</b><p>${s.o}</p></div>
        </a>`).join("")}</div>
      <div class="capture" id="cap">
        <h3>Wysłać Ci ten zestaw na maila?</h3>
        <p>Dostaniesz go jako jedną kartkę, z instrukcją instalacji i krótkim opisem, kiedy której umiejętności użyć.</p>
        <div id="blad"></div>
        <input type="email" id="mail" placeholder="twoj@adres.pl" autocomplete="email">
        <button class="btn" id="wyslij" style="width:100%;justify-content:center">Wyślij mi zestaw</button>
        <p class="consent">Wyślemy jedną wiadomość z prośbą o potwierdzenie, dopiero po kliknięciu linku dopiszemy Cię do listy. Potem będziemy pisać o nowościach w katalogu i od czasu do czasu o naszych szkoleniach. Wypisujesz się jednym kliknięciem. Szczegóły: <a href="/regulamin/">regulamin</a> i <a href="/prywatnosc/">prywatność</a>.</p>
      </div>
    </div>
    <div class="quiz-foot"><button class="link-btn" id="odnowa">&larr; Zacznij test od nowa</button><span></span></div>`;

  $("wyslij").addEventListener("click", wyslij);
  $("mail").addEventListener("keydown", (e) => { if (e.key === "Enter") wyslij(); });
  $("odnowa").addEventListener("click", () => { nr = 0; punkty = {}; rysuj(); });

  // Zdarzenie do statystyk (self-hosted, bez ciasteczek), sama liczba ukończeń,
  // bez treści odpowiedzi. Gdy analityka jest wyłączona, nic się nie dzieje.
  window.umami?.track("wynik-testu", { skilli: wynik.length });
}

async function wyslij() {
  const pole = $("mail");
  const adres = pole.value.trim();
  const blad = $("blad");
  blad.innerHTML = "";

  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(adres)) {
    blad.innerHTML = '<div class="blad">To nie wygląda na poprawny adres. Sprawdź, czy nie brakuje kropki albo małpy.</div>';
    pole.focus();
    return;
  }

  const btn = $("wyslij");
  btn.disabled = true;
  btn.textContent = "Wysyłam...";

  try {
    const odp = await fetch("/api/zapis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: adres, wynik: wynik.map((s) => s.id) }),
    });
    const dane = await odp.json().catch(() => ({}));

    if (!odp.ok) throw new Error(dane.blad || "Nie udało się zapisać.");

    window.umami?.track("zapis"); // sam fakt zapisu, adres nie trafia do statystyk
    $("cap").innerHTML = `<div class="sent"><strong>Sprawdź skrzynkę.</strong><br>
      Wysłaliśmy wiadomość na <strong>${adres}</strong> z linkiem potwierdzającym. Kliknij go, a zestaw przyjdzie od razu.
      Jeśli nic nie widzisz w ciągu kilku minut, zajrzyj do spamu.</div>`;
  } catch (e) {
    blad.innerHTML = `<div class="blad">${e.message} Spróbuj jeszcze raz za chwilę.</div>`;
    btn.disabled = false;
    btn.textContent = "Wyślij mi zestaw";
  }
}

rysuj();

===== build.mjs: daneQuizu i skille.json (fragmenty) =====
    .join("");

  const daneQuizu = skille
    .filter((s) => String(s.platny) !== "true")
    .map((s) => ({ id: s.id, n: s.nazwa, o: s.skrot, t: s.szukaj, g: s.status === "gotowy" }));

  const tresc = `
<section class="hero">
  <div class="wrap">
--

  const skrypt = `<script>
const SKILLE=${JSON.stringify(daneQuizu)};
const KATEGORIE=${JSON.stringify(["Wszystkie", ...cfg.kategorie])};
${readFileSync(join(KORZEN, "szablony", "strona.js"), "utf8")}
</script>`;

  return strona({
    tytul: `${cfg.nazwaSerwisu}, katalog umiejętności AI po polsku`,

// dane dla usługi zapisów, żeby maile (zestaw, pobrania paczek i triali)
// znały nazwy i adresy wszystkich skilli, także płatnych
zapisz(
  join(WY, "dane", "skille.json"),
  JSON.stringify(
    skille.map((s) => ({
      id: s.id, nazwa: s.nazwa, skrot: s.skrot,
      gotowy: s.status === "gotowy" && String(s.platny) !== "true",
      platny: String(s.platny) === "true",
    })),
    null,
    2
  )
);

// sitemap i robots

===== serwer/zapisy.mjs: mailZZestawem + /api/zapis + potwierdzenie + lead CRM (fragmenty) =====

// Potwierdzony zapis zgłaszamy jako lead do naszego CRM (ten sam serwer, nie firma
// trzecia). Awaria CRM nie może zepsuć potwierdzenia — błąd tylko logujemy.
async function zglosDoCrm(rekord) {
  const crm = C.crm;
  if (!crm?.formularz) return;
  const dane = new URLSearchParams({
    key: crm.formularz.split("/").pop(),
    name: rekord.email,
    email: rekord.email,
    description: `Potwierdzony zapis z testu doboru (${cfg.domena}). Dobrane skille: ${
      (rekord.wynik || []).map((id) => nazwaSkilla(id).nazwa).join(", ") || "brak"
    }.`,
  });
  const odp = await fetch(crm.formularz, { method: "POST", body: dane, signal: AbortSignal.timeout(8000) });
  if (!odp.ok) throw new Error(`CRM odpowiedział ${odp.status}`);
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

Będziemy pisać o nowościach w katalogu, a od czasu do czasu o naszych szkoleniach
i usługach. Nic częściej, niż trzeba, i zawsze z wypisem jednym kliknięciem:
${BAZA}/api/wypisz?t=${token}

${cfg.nazwaSerwisu}
${BAZA}`,
});

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
        zglosDoCrm(rekord).catch((e) => console.error("Zgłoszenie do CRM nieudane:", e.message));
      }
      return stronaHtml(res, "Potwierdzone",
        `<p class="skrot">Zestaw poleciał na <strong>${rekord.email}</strong>. Powinien być w skrzynce w ciągu minuty — jeśli go nie ma, zajrzyj do spamu.</p>
         <section class="blok"><h3>Co dalej</h3><p>Będziemy pisać o nowościach w katalogu, a od czasu do czasu o naszych szkoleniach i usługach. Wypisujesz się jednym kliknięciem ze stopki każdej wiadomości.</p></section>`);
    }

    /* feedback z ankiety — rozwiązuje token→e-mail, zapisuje do pliku dla automatu (n8n),
       forwarduje do CRM. Dzięki temu e-mail nie krąży w przeglądarce, a n8n czyta plik. */
    if (url.pathname === "/api/feedback" && req.method === "POST") {
codex
PANEL EKSPERTÓW

### Ekspert CRO i lejków

Diagnoza: Ankieta pełni ważniejszą funkcję niż samo rekomendowanie skilli. Dostarcza użytkownikowi pierwszą wartość, zbiera zapis, uruchamia double opt-in i przekazuje lead do CRM. Usunięcie jej bez gotowej bramki zastępczej oznaczałoby przerwanie głównego lejka.

Stanowisko: Przebudować. Najpierw należy pokazać sześć najlepiej dopasowanych darmowych skilli, a dopiero później, w osobnej sekcji, najwyżej jedną płatną rekomendację. Płatna pozycja nie może zajmować miejsca darmowej ani pojawiać się wyłącznie dlatego, że użytkownik zaznaczył finanse, marketing lub umowy.

Ryzyko: Dwa dodatkowe pytania mogą obniżyć ukończenia. Osiem pytań jest jeszcze dopuszczalne, ale trzeba mierzyć rozpoczęcia, wyniki i zapisy.

Czego nie ruszać: Formularza e-mail, treści zgody, double opt-in, wypisu i obecnego przekazywania potwierdzonego leada do CRM.

### Badacz UX kwestionariuszy

Diagnoza: Obecne pytania rozpoznają ogólny obszar pracy, ale nie wykrywają trzech specjalistycznych potrzeb. Tag „finanse” nie jest dowodem potrzeby operatu szacunkowego, a „marketing i sprzedaż” nie oznacza automatycznie potrzeby przebudowy oferty B2B.

Stanowisko: Przebudować przez dodanie dwóch pytań. Pierwsze ma wskazywać jedno konkretne zadanie. Drugie ma pytać, czy użytkownik chce zobaczyć osobno płatne rozwiązanie z ceną. Odpowiedź „tak” bez konkretnego zadania nie może uruchamiać rekomendacji.

Ryzyko: Pytanie o płatną ofertę może wyglądać jak próba sprzedaży. Dlatego musi pojawić się na końcu, mieć neutralną odpowiedź odmowną i jasno mówić o osobnej prezentacji z ceną.

Czego nie ruszać: Pierwszych sześciu pytań, ich odpowiedzi i obecnego scoringu darmowych skilli.

### Strateg sprzedaży B2B

Diagnoza: Płatna rekomendacja będzie wiarygodna tylko wtedy, gdy odpowiada zadaniu deklarowanemu przez użytkownika. Pokazanie operatów księgowej od faktur zaszkodziłoby nie tylko konwersji, ale również zaufaniu do całego katalogu.

Stanowisko: Przebudować. Płatna karta ma być opcjonalnym kolejnym krokiem po dostarczeniu darmowego wyniku. Należy pokazać cenę, brak lub obecność trialu oraz informację o osobnej licencji. Do CRM warto przekazać osobno darmowy zestaw i identyfikator płatnej rekomendacji.

Ryzyko: Należy unikać automatycznego uruchamiania agresywnej sekwencji sprzedażowej. Identyfikator płatnej rekomendacji powinien służyć do dopasowania dalszej komunikacji, nie do zmiany udzielonej zgody.

Czego nie ruszać: Obecnej ścieżki potwierdzenia zapisu oraz zasady, że awaria CRM nie blokuje potwierdzenia i wysłania zestawu.

### Inżynier full-stack

Diagnoza: Nie można po prostu usunąć filtra darmowych skilli w `build.mjs`. Płatne skille weszłyby wtedy do wspólnego rankingu, dostałyby błędny status „w przygotowaniu”, a wiadomość instruowałaby użytkownika, żeby pobrał niedostępną paczkę.

Dodatkowo obecny mechanizm nalicza punkty przy każdym kliknięciu „Dalej”. Cofnięcie się i ponowne przejście przez pytanie może dodać punkty drugi raz. Przy rozbudowie ankiety trzeba zastąpić mutacyjne naliczanie zapisem odpowiedzi i jednorazowym obliczeniem wyniku.

Stanowisko: Przebudować, zachowując osobne zbiory danych dla darmowych i płatnych skilli. Do istniejącego pola `wynik` można przesłać sześć darmowych identyfikatorów i opcjonalnie jeden płatny. Serwer rozdzieli je na podstawie `platny`, więc nie trzeba zmieniać endpointu ani formatu rekordu zapisu.

Ryzyko: Najważniejsze testy regresji dotyczą przycisku „Wstecz”, ponownego wysłania zestawu potwierdzonemu adresowi, potwierdzenia nowego zapisu oraz poprawnego podziału wiadomości.

Czego nie ruszać: Tras API, tokenów, limitu identyfikatorów, obsługi istniejącego potwierdzonego adresu i mechanizmu wypisu.

### Copywriter PL

Diagnoza: Płatna pozycja nie może być numerem 07 na liście darmowego zestawu. Takie przedstawienie sugerowałoby, że jest to ten sam rodzaj produktu i że można go pobrać według wspólnej instrukcji.

Stanowisko: Przebudować. W wyniku i wiadomości trzeba konsekwentnie używać określeń „darmowy zestaw”, „opcjonalna rekomendacja płatna”, „cena”, „licencja” i „trial”. Należy zrezygnować z komunikatów sugerujących instalację płatnej pozycji.

Ryzyko: Samo oznaczenie „Płatne” jest niewystarczające. Cena i sposób uzyskania produktu muszą być widoczne bez wchodzenia na podstronę.

Czego nie ruszać: Copy zgody oraz spokojnego, pomocnego tonu obecnego testu.

# DECYZJA ZESPOŁU I PROJEKT WYKONAWCZY

## 1. DECYZJA: przebudować

Ankietę należy przebudować, nie usuwać. Jej darmowa część nadal ma sens i jest główną bramką zapisu do lejka. Problemem nie jest sam test, tylko brak specjalistycznych sygnałów potrzebnych do uczciwego doboru płatnych skilli. Rozwiązaniem jest zachowanie rankingu darmowych pozycji oraz dodanie osobnej, maksymalnie jednej rekomendacji płatnej, uruchamianej wyłącznie przez jednoznaczne wskazanie zadania i zgodę użytkownika na jej pokazanie.

## 2. PROJEKT rozwiązania

### Pytania i odpowiedzi

Pytania od 1 do 6 pozostają bez zmian.

1. „Czym się głównie zajmujesz?”

Pomoc: „Wybierz to, co najbliższe. Możesz zaznaczyć kilka.”

Odpowiedzi:

1. „Prowadzę własną firmę”
2. „Księgowość i finanse”
3. „Kadry i rekrutacja”
4. „Marketing i sprzedaż”
5. „Pracuję na własnej działalności”
6. „Administracja i biuro”

2. „Co zjada Ci najwięcej czasu?”

Pomoc: „Jedna odpowiedź, ta najbardziej dotkliwa.”

Odpowiedzi:

1. „Pisanie i poprawianie dokumentów”
2. „Przepisywanie danych między plikami”
3. „Maile i komunikacja”
4. „Czytanie długich dokumentów”

3. „Podpisujesz umowy z klientami albo dostawcami?”

Odpowiedzi:

1. „Tak, regularnie”
2. „Czasem, przy większych sprawach”
3. „Rzadko albo wcale”

4. „Wystawiasz albo księgujesz faktury?”

Odpowiedzi:

1. „Tak, dużo”
2. „Kilka w miesiącu”
3. „Nie zajmuję się tym”

5. „Zatrudniasz albo rekrutujesz?”

Odpowiedzi:

1. „Tak, prowadzimy rekrutacje”
2. „Sporadycznie”
3. „Nie”

6. „Jak duża jest Twoja firma?”

Odpowiedzi:

1. „Pracuję sam”
2. „Do 10 osób”
3. „11-50 osób”
4. „Więcej niż 50”

Nowe pytanie 7:

„Które z tych konkretnych zadań chcesz rozwiązać jako pierwsze?”

Pomoc: „Wybierz jedno zadanie. Jeśli żadne nie pasuje, zaznacz ostatnią odpowiedź.”

Odpowiedzi:

1. „Ustalić zasady korzystania z AI w firmie i przygotować rejestr lub dokumentację AI”
2. „Zbudować albo poprawić ofertę B2B, pakiety, ceny i propozycję współpracy”
3. „Przygotować albo ocenić operat szacunkowy w pracy rzeczoznawcy majątkowego”
4. „Żadne z powyższych”

Nowe pytanie 8:

„Czy w wyniku chcesz zobaczyć także płatne rozwiązanie, ale tylko wtedy, gdy dokładnie pasuje do zadania wskazanego w poprzednim pytaniu?”

Pomoc: „Płatną rekomendację pokażemy osobno, razem z ceną. Nie zastąpi żadnej darmowej pozycji.”

Odpowiedzi:

1. „Tak, pokaż je osobno z ceną”
2. „Nie, pokaż tylko darmowe umiejętności”

### Reguła doboru darmowych skilli

Darmowe skille nadal otrzymują punkty wyłącznie z odpowiedzi na pytania od 1 do 6. Zachowane zostają dotychczasowe tagi, wagi, sortowanie i limit sześciu pozycji.

Pytania 7 i 8 nie dodają żadnych punktów do darmowego rankingu.

### Reguła doboru płatnych skilli

Obowiązuje próg 2 z 2:

1. Użytkownik wskazał w pytaniu 7 konkretne zadanie.
2. Użytkownik wybrał w pytaniu 8 odpowiedź „Tak, pokaż je osobno z ceną”.

Mapowanie jest bezpośrednie:

1. Zasady i dokumentacja AI: `polityka-ai`.
2. Oferta B2B, pakiety i ceny: `oferta-behawioralna`.
3. Operat w pracy rzeczoznawcy: `operaty-szacunkowe`.
4. „Żadne z powyższych”: brak płatnej rekomendacji.

Dodatkowe zasady:

1. Można pokazać najwyżej jeden płatny skill.
2. Tagi `finanse`, `sprzedaż`, `prawo`, rola i wielkość firmy nie uruchamiają płatnej rekomendacji.
3. Płatna pozycja nie uczestniczy w rankingu darmowych skilli.
4. Nie zastępuje żadnej z sześciu darmowych pozycji.
5. Jeśli w danych brakuje ceny albo informacji o trialu, karta nie może zostać wyświetlona. Najlepiej przerwać build z czytelnym błędem danych.

### Prezentacja wyniku

Układ:

1. Nagłówek darmowego wyniku.
2. Lista maksymalnie sześciu darmowych skilli.
3. Opcjonalna, wyraźnie oddzielona karta płatna.
4. Formularz wysłania zestawu na e-mail.

Nagłówek przy sześciu pozycjach:

„Sześć darmowych umiejętności dobranych pod Twoją pracę”

Tekst bez płatnej rekomendacji:

„Kolejność wynika z Twoich odpowiedzi. Wszystkie pozycje poniżej są darmowe.”

Tekst z płatną rekomendacją:

„Kolejność darmowych pozycji wynika z Twoich odpowiedzi. Płatną rekomendację pokazujemy osobno i nie zajmuje ona miejsca w tym zestawie.”

Płatna karta nie dostaje numeru 07.

Treść sekcji:

„Opcjonalnie: płatne rozwiązanie do wskazanego zadania”

„Nie jest częścią darmowego zestawu. Pokazujemy je osobno, ponieważ odpowiada dokładnie zadaniu wskazanemu w teście.”

Zawartość karty:

1. Etykieta: „PŁATNE”
2. Nazwa skilla.
3. Obecny skrót skilla.
4. Cena.
5. Informacja o trialu.
6. Informacja o osobnej licencji.
7. Link do podstrony.

Dla `polityka-ai`:

„Cena: od 890 zł netto”

„Brak wersji trial. Tego rozwiązania nie pobiera się jak darmowej umiejętności. Licencję kupuje się osobno.”

Przycisk: „Zobacz zakres i warunki zakupu”

Dla `oferta-behawioralna`:

„Cena: od 490 zł”

„Dostępna paczka trial. Pełną wersję kupuje się na osobnej licencji.”

Przycisk: „Zobacz trial i warunki licencji”

Dla `operaty-szacunkowe`:

„Cena: od 890 zł netto”

„Brak wersji trial. Tego rozwiązania nie pobiera się jak darmowej umiejętności. Licencję kupuje się osobno.”

Przycisk: „Zobacz zakres i warunki zakupu”

Tekst formularza bez płatnej rekomendacji:

„Dostaniesz darmowy zestaw w jednej wiadomości, z instrukcją instalacji i krótkim opisem, kiedy której umiejętności użyć.”

Tekst formularza z płatną rekomendacją:

„Dostaniesz darmowy zestaw z instrukcją instalacji. Płatną rekomendację, jej cenę i link do warunków zakupu pokażemy w osobnej sekcji tej samej wiadomości.”

Nagłówek „Wysłać Ci ten zestaw na maila?”, przycisk „Wyślij mi zestaw” oraz cała treść zgody pozostają bez zmian.

### Mail z zestawem

Temat wiadomości pozostaje bez zmian:

„Twój zestaw umiejętności AI”

Początek:

„Oto darmowy zestaw dobrany na podstawie Twoich odpowiedzi.

DARMOWE UMIEJĘTNOŚCI”

Darmowe pozycje zachowują numerację i dotychczasowy format. Pozycje niedostępne nadal otrzymują dopisek „(w przygotowaniu)”.

Jeżeli występuje rekomendacja płatna, po darmowej liście należy dodać:

„OPCJONALNA REKOMENDACJA PŁATNA

Zgodnie z Twoim wyborem w teście pokazujemy jedno płatne rozwiązanie dopasowane do wskazanego zadania. Nie zastępuje ono żadnej pozycji z darmowego zestawu.”

Dokładne bloki płatnych pozycji:

Dla `polityka-ai`:

„Polityka AI i rejestr zastosowań

[skrót skilla]

Cena: od 890 zł netto

Rozwiązanie płatne. Brak wersji trial. Tego rozwiązania nie pobiera się jak darmowej paczki .skill. Licencję kupuje się osobno.

Zakres i warunki zakupu:
${BAZA}/skill/polityka-ai/”

Dla `oferta-behawioralna`:

„Oferta behawioralna

[skrót skilla]

Cena: od 490 zł

Rozwiązanie płatne. Dostępna jest paczka trial. Pełną wersję kupuje się na osobnej licencji.

Trial i warunki licencji:
${BAZA}/skill/oferta-behawioralna/”

Dla `operaty-szacunkowe`:

„Operaty szacunkowe, warsztat rzeczoznawcy

[skrót skilla]

Cena: od 890 zł netto

Rozwiązanie płatne. Brak wersji trial. Tego rozwiązania nie pobiera się jak darmowej paczki .skill. Licencję kupuje się osobno.

Zakres i warunki zakupu:
${BAZA}/skill/operaty-szacunkowe/”

Nagłówek instrukcji należy zmienić z „JAK TO ZAINSTALOWAĆ” na:

„JAK ZAINSTALOWAĆ DOSTĘPNE DARMOWE UMIEJĘTNOŚCI”

Po instrukcji należy dodać:

„Pozycje oznaczone jako „w przygotowaniu” nie mają jeszcze pliku do pobrania. Instrukcja instalacji nie dotyczy płatnej rekomendacji.”

### Zmiany danych

W rekordach źródłowych trzech płatnych skilli należy utrzymywać jedno źródło prawdy dla:

1. `cena`
2. `trial`
3. `platny`
4. nazwy i skrótu

`daneQuizu` pozostaje zbiorem wyłącznie darmowych skilli.

Obok niego należy utworzyć osobny zbiór płatnych danych, zawierający:

1. `id`
2. `n`
3. `o`
4. `cena`
5. `trial`

Nie należy przekazywać tagów płatnych skilli do wspólnego scoringu.

W `public/dane/skille.json` należy dodać pola:

1. `cena`, puste dla darmowych.
2. `trial`, wartość logiczna.
3. Zachować `platny`.
4. Zachować dotychczasowe znaczenie `gotowy`, czyli gotowość darmowej paczki do pobrania.

### Minimalny diff: `szablony/strona.js`

1. Dodać pytania 7 i 8.
2. Odpowiedzi pytania 7 powiązać bezpośrednio z identyfikatorem płatnego skilla, nie z tagami.
3. Odpowiedź pytania 8 przechowywać jako zgodę na wyświetlenie płatnej rekomendacji.
4. Zastąpić dodawanie punktów przy kliknięciu „Dalej” tablicą odpowiedzi.
5. Po zakończeniu testu jednorazowo obliczyć punkty darmowych skilli z pytań 1-6.
6. Na podstawie pytań 7 i 8 wyznaczyć `rekomendacjaPlatna`.
7. Przy cofnięciu przywracać wcześniejsze zaznaczenia. Nie naliczać punktów ponownie.
8. Renderować darmową listę i płatną kartę w osobnych kontenerach.
9. Do `wynik` wysyłanego przez `/api/zapis` dopisać identyfikator płatnego skilla tylko wtedy, gdy rekomendacja faktycznie została pokazana.
10. Przy „Zacznij test od nowa” wyczyścić również zapisane odpowiedzi i płatną rekomendację.
11. Zachować zdarzenia `wynik-testu` i `zapis`. `wynik-testu` można rozszerzyć o pole `platny: 0` albo `platny: 1`.
12. Kliknięcie płatnej karty można rejestrować jako `klik-rekomendacja-platna` z samym identyfikatorem skilla, bez odpowiedzi i adresu e-mail.

### Minimalny diff: `build.mjs`

1. Zachować filtr darmowych skilli w `daneQuizu`.
2. Zbudować osobną tablicę płatnych skilli.
3. Wstrzyknąć ją jako drugą stałą, na przykład `PLATNE`.
4. Nie umieszczać tagów płatnych skilli w mechanizmie scoringu.
5. Do `skille.json` dopisać `cena` i `trial`.
6. Dodać prostą walidację, że każdy płatny rekord ma nazwę, cenę i wartość `trial`.

### Minimalny diff: `serwer/zapisy.mjs`

1. W `mailZZestawem` rozdzielić przekazane identyfikatory na darmowe i płatne na podstawie `s.platny`.
2. Numerować tylko darmowe pozycje.
3. Dopisek „(w przygotowaniu)” stosować tylko do darmowych pozycji.
4. Płatne pozycje renderować według osobnego szablonu z ceną, trialem i licencją.
5. Instrukcję instalacji opisać jednoznacznie jako dotyczącą darmowych skilli.
6. Nie zmieniać `/api/zapis`, tokenów, potwierdzenia ani sposobu przechowywania `wynik`.
7. W opisie leada CRM rozdzielić dane:

„Potwierdzony zapis z testu doboru (${cfg.domena}). Darmowy zestaw: [nazwy]. Rekomendacja płatna: [id i nazwa albo brak].”

## 3. RYZYKA I JAK JE ZAMKNĄĆ

1. Błędna płatna rekomendacja. Zamknięcie: twarde mapowanie zadania, próg 2 z 2, brak scoringu po szerokich tagach i maksymalnie jedna pozycja.

2. Spadek ukończeń po wydłużeniu testu. Zamknięcie: osiem pytań jako limit, pomiar rozpoczęć, wyników i zapisów. Po minimum 200 rozpoczęciach porównać ukończenia i zapisy z wcześniejszym okresem.

3. Podwójne naliczanie po użyciu „Wstecz”. Zamknięcie: przechowywanie odpowiedzi i obliczanie całego wyniku dopiero na końcu.

4. Nieprawdziwa instrukcja w mailu. Zamknięcie: osobne szablony darmowe i płatne, cena zawsze widoczna, trial tylko dla `oferta-behawioralna`, brak dopisku „w przygotowaniu” przy płatnych.

5. Regres double opt-in lub CRM. Zamknięcie: test nowego adresu, ponownego testu potwierdzonego adresu, potwierdzenia tokenem, wiadomości wynikowej, wypisu i niedostępnego CRM.

## 4. CZEGO NIE RUSZAĆ

1. Treści zgody i odnośników do regulaminu oraz prywatności.
2. Double opt-in i wiadomości potwierdzającej.
3. Tras `/api/zapis`, `/api/potwierdz` i `/api/wypisz`.
4. Zasady, że awaria CRM nie blokuje potwierdzenia.
5. Pierwszych sześciu pytań i wag darmowego scoringu.
6. Limitu sześciu darmowych rekomendacji.
7. Filtrów katalogu: kategorie, darmowe, płatne i wyszukiwarka.
8. Dotychczasowych podstron skilli i adresów `/skill/{id}/`.
9. Istniejących zdarzeń Umami oraz zasady niewysyłania do analityki adresu i treści odpowiedzi.
tokens used
33 064
PANEL EKSPERTÓW

### Ekspert CRO i lejków

Diagnoza: Ankieta pełni ważniejszą funkcję niż samo rekomendowanie skilli. Dostarcza użytkownikowi pierwszą wartość, zbiera zapis, uruchamia double opt-in i przekazuje lead do CRM. Usunięcie jej bez gotowej bramki zastępczej oznaczałoby przerwanie głównego lejka.

Stanowisko: Przebudować. Najpierw należy pokazać sześć najlepiej dopasowanych darmowych skilli, a dopiero później, w osobnej sekcji, najwyżej jedną płatną rekomendację. Płatna pozycja nie może zajmować miejsca darmowej ani pojawiać się wyłącznie dlatego, że użytkownik zaznaczył finanse, marketing lub umowy.

Ryzyko: Dwa dodatkowe pytania mogą obniżyć ukończenia. Osiem pytań jest jeszcze dopuszczalne, ale trzeba mierzyć rozpoczęcia, wyniki i zapisy.

Czego nie ruszać: Formularza e-mail, treści zgody, double opt-in, wypisu i obecnego przekazywania potwierdzonego leada do CRM.

### Badacz UX kwestionariuszy

Diagnoza: Obecne pytania rozpoznają ogólny obszar pracy, ale nie wykrywają trzech specjalistycznych potrzeb. Tag „finanse” nie jest dowodem potrzeby operatu szacunkowego, a „marketing i sprzedaż” nie oznacza automatycznie potrzeby przebudowy oferty B2B.

Stanowisko: Przebudować przez dodanie dwóch pytań. Pierwsze ma wskazywać jedno konkretne zadanie. Drugie ma pytać, czy użytkownik chce zobaczyć osobno płatne rozwiązanie z ceną. Odpowiedź „tak” bez konkretnego zadania nie może uruchamiać rekomendacji.

Ryzyko: Pytanie o płatną ofertę może wyglądać jak próba sprzedaży. Dlatego musi pojawić się na końcu, mieć neutralną odpowiedź odmowną i jasno mówić o osobnej prezentacji z ceną.

Czego nie ruszać: Pierwszych sześciu pytań, ich odpowiedzi i obecnego scoringu darmowych skilli.

### Strateg sprzedaży B2B

Diagnoza: Płatna rekomendacja będzie wiarygodna tylko wtedy, gdy odpowiada zadaniu deklarowanemu przez użytkownika. Pokazanie operatów księgowej od faktur zaszkodziłoby nie tylko konwersji, ale również zaufaniu do całego katalogu.

Stanowisko: Przebudować. Płatna karta ma być opcjonalnym kolejnym krokiem po dostarczeniu darmowego wyniku. Należy pokazać cenę, brak lub obecność trialu oraz informację o osobnej licencji. Do CRM warto przekazać osobno darmowy zestaw i identyfikator płatnej rekomendacji.

Ryzyko: Należy unikać automatycznego uruchamiania agresywnej sekwencji sprzedażowej. Identyfikator płatnej rekomendacji powinien służyć do dopasowania dalszej komunikacji, nie do zmiany udzielonej zgody.

Czego nie ruszać: Obecnej ścieżki potwierdzenia zapisu oraz zasady, że awaria CRM nie blokuje potwierdzenia i wysłania zestawu.

### Inżynier full-stack

Diagnoza: Nie można po prostu usunąć filtra darmowych skilli w `build.mjs`. Płatne skille weszłyby wtedy do wspólnego rankingu, dostałyby błędny status „w przygotowaniu”, a wiadomość instruowałaby użytkownika, żeby pobrał niedostępną paczkę.

Dodatkowo obecny mechanizm nalicza punkty przy każdym kliknięciu „Dalej”. Cofnięcie się i ponowne przejście przez pytanie może dodać punkty drugi raz. Przy rozbudowie ankiety trzeba zastąpić mutacyjne naliczanie zapisem odpowiedzi i jednorazowym obliczeniem wyniku.

Stanowisko: Przebudować, zachowując osobne zbiory danych dla darmowych i płatnych skilli. Do istniejącego pola `wynik` można przesłać sześć darmowych identyfikatorów i opcjonalnie jeden płatny. Serwer rozdzieli je na podstawie `platny`, więc nie trzeba zmieniać endpointu ani formatu rekordu zapisu.

Ryzyko: Najważniejsze testy regresji dotyczą przycisku „Wstecz”, ponownego wysłania zestawu potwierdzonemu adresowi, potwierdzenia nowego zapisu oraz poprawnego podziału wiadomości.

Czego nie ruszać: Tras API, tokenów, limitu identyfikatorów, obsługi istniejącego potwierdzonego adresu i mechanizmu wypisu.

### Copywriter PL

Diagnoza: Płatna pozycja nie może być numerem 07 na liście darmowego zestawu. Takie przedstawienie sugerowałoby, że jest to ten sam rodzaj produktu i że można go pobrać według wspólnej instrukcji.

Stanowisko: Przebudować. W wyniku i wiadomości trzeba konsekwentnie używać określeń „darmowy zestaw”, „opcjonalna rekomendacja płatna”, „cena”, „licencja” i „trial”. Należy zrezygnować z komunikatów sugerujących instalację płatnej pozycji.

Ryzyko: Samo oznaczenie „Płatne” jest niewystarczające. Cena i sposób uzyskania produktu muszą być widoczne bez wchodzenia na podstronę.

Czego nie ruszać: Copy zgody oraz spokojnego, pomocnego tonu obecnego testu.

# DECYZJA ZESPOŁU I PROJEKT WYKONAWCZY

## 1. DECYZJA: przebudować

Ankietę należy przebudować, nie usuwać. Jej darmowa część nadal ma sens i jest główną bramką zapisu do lejka. Problemem nie jest sam test, tylko brak specjalistycznych sygnałów potrzebnych do uczciwego doboru płatnych skilli. Rozwiązaniem jest zachowanie rankingu darmowych pozycji oraz dodanie osobnej, maksymalnie jednej rekomendacji płatnej, uruchamianej wyłącznie przez jednoznaczne wskazanie zadania i zgodę użytkownika na jej pokazanie.

## 2. PROJEKT rozwiązania

### Pytania i odpowiedzi

Pytania od 1 do 6 pozostają bez zmian.

1. „Czym się głównie zajmujesz?”

Pomoc: „Wybierz to, co najbliższe. Możesz zaznaczyć kilka.”

Odpowiedzi:

1. „Prowadzę własną firmę”
2. „Księgowość i finanse”
3. „Kadry i rekrutacja”
4. „Marketing i sprzedaż”
5. „Pracuję na własnej działalności”
6. „Administracja i biuro”

2. „Co zjada Ci najwięcej czasu?”

Pomoc: „Jedna odpowiedź, ta najbardziej dotkliwa.”

Odpowiedzi:

1. „Pisanie i poprawianie dokumentów”
2. „Przepisywanie danych między plikami”
3. „Maile i komunikacja”
4. „Czytanie długich dokumentów”

3. „Podpisujesz umowy z klientami albo dostawcami?”

Odpowiedzi:

1. „Tak, regularnie”
2. „Czasem, przy większych sprawach”
3. „Rzadko albo wcale”

4. „Wystawiasz albo księgujesz faktury?”

Odpowiedzi:

1. „Tak, dużo”
2. „Kilka w miesiącu”
3. „Nie zajmuję się tym”

5. „Zatrudniasz albo rekrutujesz?”

Odpowiedzi:

1. „Tak, prowadzimy rekrutacje”
2. „Sporadycznie”
3. „Nie”

6. „Jak duża jest Twoja firma?”

Odpowiedzi:

1. „Pracuję sam”
2. „Do 10 osób”
3. „11-50 osób”
4. „Więcej niż 50”

Nowe pytanie 7:

„Które z tych konkretnych zadań chcesz rozwiązać jako pierwsze?”

Pomoc: „Wybierz jedno zadanie. Jeśli żadne nie pasuje, zaznacz ostatnią odpowiedź.”

Odpowiedzi:

1. „Ustalić zasady korzystania z AI w firmie i przygotować rejestr lub dokumentację AI”
2. „Zbudować albo poprawić ofertę B2B, pakiety, ceny i propozycję współpracy”
3. „Przygotować albo ocenić operat szacunkowy w pracy rzeczoznawcy majątkowego”
4. „Żadne z powyższych”

Nowe pytanie 8:

„Czy w wyniku chcesz zobaczyć także płatne rozwiązanie, ale tylko wtedy, gdy dokładnie pasuje do zadania wskazanego w poprzednim pytaniu?”

Pomoc: „Płatną rekomendację pokażemy osobno, razem z ceną. Nie zastąpi żadnej darmowej pozycji.”

Odpowiedzi:

1. „Tak, pokaż je osobno z ceną”
2. „Nie, pokaż tylko darmowe umiejętności”

### Reguła doboru darmowych skilli

Darmowe skille nadal otrzymują punkty wyłącznie z odpowiedzi na pytania od 1 do 6. Zachowane zostają dotychczasowe tagi, wagi, sortowanie i limit sześciu pozycji.

Pytania 7 i 8 nie dodają żadnych punktów do darmowego rankingu.

### Reguła doboru płatnych skilli

Obowiązuje próg 2 z 2:

1. Użytkownik wskazał w pytaniu 7 konkretne zadanie.
2. Użytkownik wybrał w pytaniu 8 odpowiedź „Tak, pokaż je osobno z ceną”.

Mapowanie jest bezpośrednie:

1. Zasady i dokumentacja AI: `polityka-ai`.
2. Oferta B2B, pakiety i ceny: `oferta-behawioralna`.
3. Operat w pracy rzeczoznawcy: `operaty-szacunkowe`.
4. „Żadne z powyższych”: brak płatnej rekomendacji.

Dodatkowe zasady:

1. Można pokazać najwyżej jeden płatny skill.
2. Tagi `finanse`, `sprzedaż`, `prawo`, rola i wielkość firmy nie uruchamiają płatnej rekomendacji.
3. Płatna pozycja nie uczestniczy w rankingu darmowych skilli.
4. Nie zastępuje żadnej z sześciu darmowych pozycji.
5. Jeśli w danych brakuje ceny albo informacji o trialu, karta nie może zostać wyświetlona. Najlepiej przerwać build z czytelnym błędem danych.

### Prezentacja wyniku

Układ:

1. Nagłówek darmowego wyniku.
2. Lista maksymalnie sześciu darmowych skilli.
3. Opcjonalna, wyraźnie oddzielona karta płatna.
4. Formularz wysłania zestawu na e-mail.

Nagłówek przy sześciu pozycjach:

„Sześć darmowych umiejętności dobranych pod Twoją pracę”

Tekst bez płatnej rekomendacji:

„Kolejność wynika z Twoich odpowiedzi. Wszystkie pozycje poniżej są darmowe.”

Tekst z płatną rekomendacją:

„Kolejność darmowych pozycji wynika z Twoich odpowiedzi. Płatną rekomendację pokazujemy osobno i nie zajmuje ona miejsca w tym zestawie.”

Płatna karta nie dostaje numeru 07.

Treść sekcji:

„Opcjonalnie: płatne rozwiązanie do wskazanego zadania”

„Nie jest częścią darmowego zestawu. Pokazujemy je osobno, ponieważ odpowiada dokładnie zadaniu wskazanemu w teście.”

Zawartość karty:

1. Etykieta: „PŁATNE”
2. Nazwa skilla.
3. Obecny skrót skilla.
4. Cena.
5. Informacja o trialu.
6. Informacja o osobnej licencji.
7. Link do podstrony.

Dla `polityka-ai`:

„Cena: od 890 zł netto”

„Brak wersji trial. Tego rozwiązania nie pobiera się jak darmowej umiejętności. Licencję kupuje się osobno.”

Przycisk: „Zobacz zakres i warunki zakupu”

Dla `oferta-behawioralna`:

„Cena: od 490 zł”

„Dostępna paczka trial. Pełną wersję kupuje się na osobnej licencji.”

Przycisk: „Zobacz trial i warunki licencji”

Dla `operaty-szacunkowe`:

„Cena: od 890 zł netto”

„Brak wersji trial. Tego rozwiązania nie pobiera się jak darmowej umiejętności. Licencję kupuje się osobno.”

Przycisk: „Zobacz zakres i warunki zakupu”

Tekst formularza bez płatnej rekomendacji:

„Dostaniesz darmowy zestaw w jednej wiadomości, z instrukcją instalacji i krótkim opisem, kiedy której umiejętności użyć.”

Tekst formularza z płatną rekomendacją:

„Dostaniesz darmowy zestaw z instrukcją instalacji. Płatną rekomendację, jej cenę i link do warunków zakupu pokażemy w osobnej sekcji tej samej wiadomości.”

Nagłówek „Wysłać Ci ten zestaw na maila?”, przycisk „Wyślij mi zestaw” oraz cała treść zgody pozostają bez zmian.

### Mail z zestawem

Temat wiadomości pozostaje bez zmian:

„Twój zestaw umiejętności AI”

Początek:

„Oto darmowy zestaw dobrany na podstawie Twoich odpowiedzi.

DARMOWE UMIEJĘTNOŚCI”

Darmowe pozycje zachowują numerację i dotychczasowy format. Pozycje niedostępne nadal otrzymują dopisek „(w przygotowaniu)”.

Jeżeli występuje rekomendacja płatna, po darmowej liście należy dodać:

„OPCJONALNA REKOMENDACJA PŁATNA

Zgodnie z Twoim wyborem w teście pokazujemy jedno płatne rozwiązanie dopasowane do wskazanego zadania. Nie zastępuje ono żadnej pozycji z darmowego zestawu.”

Dokładne bloki płatnych pozycji:

Dla `polityka-ai`:

„Polityka AI i rejestr zastosowań

[skrót skilla]

Cena: od 890 zł netto

Rozwiązanie płatne. Brak wersji trial. Tego rozwiązania nie pobiera się jak darmowej paczki .skill. Licencję kupuje się osobno.

Zakres i warunki zakupu:
${BAZA}/skill/polityka-ai/”

Dla `oferta-behawioralna`:

„Oferta behawioralna

[skrót skilla]

Cena: od 490 zł

Rozwiązanie płatne. Dostępna jest paczka trial. Pełną wersję kupuje się na osobnej licencji.

Trial i warunki licencji:
${BAZA}/skill/oferta-behawioralna/”

Dla `operaty-szacunkowe`:

„Operaty szacunkowe, warsztat rzeczoznawcy

[skrót skilla]

Cena: od 890 zł netto

Rozwiązanie płatne. Brak wersji trial. Tego rozwiązania nie pobiera się jak darmowej paczki .skill. Licencję kupuje się osobno.

Zakres i warunki zakupu:
${BAZA}/skill/operaty-szacunkowe/”

Nagłówek instrukcji należy zmienić z „JAK TO ZAINSTALOWAĆ” na:

„JAK ZAINSTALOWAĆ DOSTĘPNE DARMOWE UMIEJĘTNOŚCI”

Po instrukcji należy dodać:

„Pozycje oznaczone jako „w przygotowaniu” nie mają jeszcze pliku do pobrania. Instrukcja instalacji nie dotyczy płatnej rekomendacji.”

### Zmiany danych

W rekordach źródłowych trzech płatnych skilli należy utrzymywać jedno źródło prawdy dla:

1. `cena`
2. `trial`
3. `platny`
4. nazwy i skrótu

`daneQuizu` pozostaje zbiorem wyłącznie darmowych skilli.

Obok niego należy utworzyć osobny zbiór płatnych danych, zawierający:

1. `id`
2. `n`
3. `o`
4. `cena`
5. `trial`

Nie należy przekazywać tagów płatnych skilli do wspólnego scoringu.

W `public/dane/skille.json` należy dodać pola:

1. `cena`, puste dla darmowych.
2. `trial`, wartość logiczna.
3. Zachować `platny`.
4. Zachować dotychczasowe znaczenie `gotowy`, czyli gotowość darmowej paczki do pobrania.

### Minimalny diff: `szablony/strona.js`

1. Dodać pytania 7 i 8.
2. Odpowiedzi pytania 7 powiązać bezpośrednio z identyfikatorem płatnego skilla, nie z tagami.
3. Odpowiedź pytania 8 przechowywać jako zgodę na wyświetlenie płatnej rekomendacji.
4. Zastąpić dodawanie punktów przy kliknięciu „Dalej” tablicą odpowiedzi.
5. Po zakończeniu testu jednorazowo obliczyć punkty darmowych skilli z pytań 1-6.
6. Na podstawie pytań 7 i 8 wyznaczyć `rekomendacjaPlatna`.
7. Przy cofnięciu przywracać wcześniejsze zaznaczenia. Nie naliczać punktów ponownie.
8. Renderować darmową listę i płatną kartę w osobnych kontenerach.
9. Do `wynik` wysyłanego przez `/api/zapis` dopisać identyfikator płatnego skilla tylko wtedy, gdy rekomendacja faktycznie została pokazana.
10. Przy „Zacznij test od nowa” wyczyścić również zapisane odpowiedzi i płatną rekomendację.
11. Zachować zdarzenia `wynik-testu` i `zapis`. `wynik-testu` można rozszerzyć o pole `platny: 0` albo `platny: 1`.
12. Kliknięcie płatnej karty można rejestrować jako `klik-rekomendacja-platna` z samym identyfikatorem skilla, bez odpowiedzi i adresu e-mail.

### Minimalny diff: `build.mjs`

1. Zachować filtr darmowych skilli w `daneQuizu`.
2. Zbudować osobną tablicę płatnych skilli.
3. Wstrzyknąć ją jako drugą stałą, na przykład `PLATNE`.
4. Nie umieszczać tagów płatnych skilli w mechanizmie scoringu.
5. Do `skille.json` dopisać `cena` i `trial`.
6. Dodać prostą walidację, że każdy płatny rekord ma nazwę, cenę i wartość `trial`.

### Minimalny diff: `serwer/zapisy.mjs`

1. W `mailZZestawem` rozdzielić przekazane identyfikatory na darmowe i płatne na podstawie `s.platny`.
2. Numerować tylko darmowe pozycje.
3. Dopisek „(w przygotowaniu)” stosować tylko do darmowych pozycji.
4. Płatne pozycje renderować według osobnego szablonu z ceną, trialem i licencją.
5. Instrukcję instalacji opisać jednoznacznie jako dotyczącą darmowych skilli.
6. Nie zmieniać `/api/zapis`, tokenów, potwierdzenia ani sposobu przechowywania `wynik`.
7. W opisie leada CRM rozdzielić dane:

„Potwierdzony zapis z testu doboru (${cfg.domena}). Darmowy zestaw: [nazwy]. Rekomendacja płatna: [id i nazwa albo brak].”

## 3. RYZYKA I JAK JE ZAMKNĄĆ

1. Błędna płatna rekomendacja. Zamknięcie: twarde mapowanie zadania, próg 2 z 2, brak scoringu po szerokich tagach i maksymalnie jedna pozycja.

2. Spadek ukończeń po wydłużeniu testu. Zamknięcie: osiem pytań jako limit, pomiar rozpoczęć, wyników i zapisów. Po minimum 200 rozpoczęciach porównać ukończenia i zapisy z wcześniejszym okresem.

3. Podwójne naliczanie po użyciu „Wstecz”. Zamknięcie: przechowywanie odpowiedzi i obliczanie całego wyniku dopiero na końcu.

4. Nieprawdziwa instrukcja w mailu. Zamknięcie: osobne szablony darmowe i płatne, cena zawsze widoczna, trial tylko dla `oferta-behawioralna`, brak dopisku „w przygotowaniu” przy płatnych.

5. Regres double opt-in lub CRM. Zamknięcie: test nowego adresu, ponownego testu potwierdzonego adresu, potwierdzenia tokenem, wiadomości wynikowej, wypisu i niedostępnego CRM.

## 4. CZEGO NIE RUSZAĆ

1. Treści zgody i odnośników do regulaminu oraz prywatności.
2. Double opt-in i wiadomości potwierdzającej.
3. Tras `/api/zapis`, `/api/potwierdz` i `/api/wypisz`.
4. Zasady, że awaria CRM nie blokuje potwierdzenia.
5. Pierwszych sześciu pytań i wag darmowego scoringu.
6. Limitu sześciu darmowych rekomendacji.
7. Filtrów katalogu: kategorie, darmowe, płatne i wyszukiwarka.
8. Dotychczasowych podstron skilli i adresów `/skill/{id}/`.
9. Istniejących zdarzeń Umami oraz zasady niewysyłania do analityki adresu i treści odpowiedzi.
