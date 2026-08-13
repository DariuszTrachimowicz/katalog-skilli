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
