/* Skrypt strony głównej: filtrowanie katalogu, test doboru i narzędzia WebMCP.
   Wstrzykiwany przez build.mjs razem ze stałą SKILLE. */

const $ = (id) => document.getElementById(id);

/* ---------- katalog ---------- */

let kat = "";
let fraza = "";

function odmiana(n) {
  if (n === 1) return "1 skill";
  const d = n % 10, s = n % 100;
  return n + (d >= 2 && d <= 4 && !(s >= 12 && s <= 14) ? " skille" : " skilli");
}

function filtruj() {
  let razem = 0;
  document.querySelectorAll("#lista .grupa").forEach((g) => {
    let w = 0;
    g.querySelectorAll(".karta").forEach((k) => {
      const ok = (!kat || k.dataset.kat === kat) && (!fraza || k.dataset.szukaj.includes(fraza));
      k.hidden = !ok;
      if (ok) w++;
    });
    g.hidden = w === 0;
    razem += w;
  });
  $("pusto").hidden = razem > 0;
  $("licznik").textContent = odmiana(razem);
  document.querySelectorAll("#chipy .chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.kat === kat)));
}

function ustawKat(k) { kat = k; filtruj(); }

$("chipy").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (b) ustawKat(b.dataset.kat);
});
$("kafle").addEventListener("click", (e) => {
  const b = e.target.closest(".kafel");
  if (!b) return;
  ustawKat(b.dataset.kat);
  $("katalog").scrollIntoView();
});
$("q").addEventListener("input", (e) => { fraza = e.target.value.toLowerCase().trim(); filtruj(); });

// Wyszukiwanie tym samym kryterium co filtr kart, także dla agentów (WebMCP).
function szukaj(tekst) {
  const slowa = String(tekst || "").toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  if (!slowa.length) return SKILLE.slice(0, 10);
  return SKILLE.map((s) => ({ s, n: slowa.filter((w) => s.s.includes(w)).length }))
    .filter((x) => x.n > 0).sort((a, b) => b.n - a.n).slice(0, 10).map((x) => x.s);
}
const opisWyniku = (lista) => JSON.stringify(lista.map((s) => ({ nazwa: s.n, dziedzina: s.k, korzysc: s.o, adres: location.origin + "/skill/" + s.id + "/" })));

$("szukaj").addEventListener("submit", (e) => {
  e.preventDefault();
  fraza = $("q").value.toLowerCase().trim();
  filtruj();
  $("katalog").scrollIntoView();
  // Wywołanie przez agenta (WebMCP): zwracamy listę zamiast samego przewinięcia strony.
  if (e.agentInvoked && typeof e.respondWith === "function") e.respondWith(Promise.resolve(opisWyniku(szukaj($("q").value))));
});
filtruj();

/* ---------- test doboru ---------- */

/* Tagi punktują ranking (dokładne dopasowanie do pola `szukaj` skilli,
   dlatego brzmienia muszą istnieć w katalogu). */
const PYTANIA = [
  { q: "Czym się głównie zajmujesz?", h: "Wybierz to, co najbliższe. Możesz zaznaczyć kilka.", wiele: true, k: "zajecia",
    o: [["Prowadzę własną firmę", ["mała firma", "umowa", "B2B"]],
        ["Księgowość i finanse", ["księgowość", "faktury", "VAT"]],
        ["Kadry i rekrutacja", ["kadry", "rekrutacja"]],
        ["Marketing i sprzedaż", ["copywriting", "newsletter", "oferta B2B"]],
        ["Pracuję na własnej działalności", ["freelancer", "JDG", "B2B"]],
        ["Administracja i biuro", ["pismo do urzędu", "dokumenty", "notatka"]],
        ["Wyceniam nieruchomości jako rzeczoznawca majątkowy", ["rzeczoznawca majątkowy", "operat szacunkowy"]]] },
  { q: "Co zjada Ci najwięcej czasu?", h: "Jedna odpowiedź, ta najbardziej dotkliwa.", wiele: false, k: "najwiecej_czasu",
    o: [["Pisanie i poprawianie dokumentów", ["dokumenty", "pismo do urzędu", "prosty język"]],
        ["Przepisywanie danych między plikami", ["faktury", "dane", "excel"]],
        ["Maile i komunikacja", ["mail", "e-mail", "trudna rozmowa"]],
        ["Czytanie długich dokumentów", ["umowa", "kontrakt", "ryzyko"]],
        ["Przygotowywanie ofert i wycen dla klientów", ["oferta handlowa", "wycena", "oferta B2B"]]] },
  { q: "Podpisujesz umowy z klientami albo dostawcami?", h: "", wiele: false, k: "umowy",
    o: [["Tak, regularnie", ["umowa", "kontrakt", "prawnik", "ryzyko", "B2B"]],
        ["Czasem, przy większych sprawach", ["umowa", "kontrakt"]],
        ["Rzadko albo wcale", []]] },
  { q: "Wystawiasz albo księgujesz faktury?", h: "", wiele: false, k: "faktury",
    o: [["Tak, dużo", ["faktury", "księgowość", "biuro rachunkowe"]],
        ["Kilka w miesiącu", ["faktury"]],
        ["Nie zajmuję się tym", []]] },
  { q: "Zatrudniasz albo rekrutujesz?", h: "", wiele: false, k: "rekrutacja",
    o: [["Tak, prowadzimy rekrutacje", ["kadry", "rekrutacja"]],
        ["Sporadycznie", ["kadry"]],
        ["Nie", []]] },
  { q: "Jak duża jest Twoja firma?", h: "", wiele: false, k: "wielkosc_firmy",
    o: [["Pracuję sam", ["freelancer", "JDG"]],
        ["Do 10 osób", ["mała firma"]],
        ["11-50 osób", ["mała firma", "kadry"]],
        ["Więcej niż 50", ["kadry", "raport miesięczny"]]] },
  { q: "Jak u Was wygląda korzystanie z AI w pracy?", h: "Chodzi o realne użycie w pracy, nie prywatne testy.", wiele: false, k: "ai_w_pracy",
    o: [["Korzystamy regularnie i chcę uporządkować zasady albo przygotować firmę pod AI Act", ["polityka AI", "AI Act"]],
        ["Korzystamy, ale bez spisanych zasad", ["polityka AI"]],
        ["Dopiero zaczynamy albo wcale", []]] },
];

// Ranking z odpowiedzi [[indeksy] na pytanie]: wspólny dla testu i narzędzia agenta.
function ranking(odp) {
  const pkt = {};
  odp.forEach((wybory, q) => (wybory || []).forEach((i) => PYTANIA[q].o[i][1].forEach((t) => (pkt[t] = (pkt[t] || 0) + 1))));
  return SKILLE.map((s) => ({ s, n: s.t.reduce((a, t) => a + (pkt[t] || 0), 0) }))
    .sort((a, b) => b.n - a.n || (b.s.g ? 1 : 0) - (a.s.g ? 1 : 0))
    .slice(0, 6).map((r) => r.s);
}

let nr = 0, zaznaczone = [], odpowiedzi = [], wynik = [];

function rysuj() {
  if (nr >= PYTANIA.length) return pokazWynik();
  const P = PYTANIA[nr];
  $("qstep").textContent = `Pytanie ${nr + 1} z ${PYTANIA.length}`;
  $("qbar").style.width = (nr / PYTANIA.length) * 100 + "%";
  $("qbody").innerHTML = `
    <h3 class="q-title" id="qtitle">${P.q}</h3>
    <p class="q-help" id="qhelp">${P.h || (P.wiele ? "Możesz zaznaczyć kilka." : "Wybierz jedną odpowiedź.")}</p>
    <div class="opts" role="group" aria-labelledby="qtitle">${P.o.map((o, i) => `<button type="button" class="opt" data-i="${i}" aria-pressed="false"><span class="box" aria-hidden="true"></span>${o[0]}</button>`).join("")}</div>
    <div class="quiz-foot">
      <button type="button" class="link-btn" id="wstecz"${nr === 0 ? " disabled" : ""}>← Wstecz</button>
      <button type="button" class="btn" id="dalej">${nr === PYTANIA.length - 1 ? "Pokaż wynik" : "Dalej"}</button>
    </div>`;
  zaznaczone = odpowiedzi[nr] ? [...odpowiedzi[nr]] : [];
  const odswiez = () => document.querySelectorAll(".opt").forEach((b) => {
    const on = zaznaczone.includes(+b.dataset.i);
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", String(on));
  });
  odswiez();
  document.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
    const i = +b.dataset.i;
    zaznaczone = P.wiele ? (zaznaczone.includes(i) ? zaznaczone.filter((x) => x !== i) : [...zaznaczone, i]) : [i];
    odswiez();
  }));
  $("dalej").addEventListener("click", () => {
    if (!zaznaczone.length) { $("qhelp").textContent = "Zaznacz przynajmniej jedną odpowiedź, żeby przejść dalej."; return; }
    odpowiedzi[nr] = [...zaznaczone];
    nr++;
    rysuj();
  });
  if (nr > 0) $("wstecz").addEventListener("click", () => { nr--; rysuj(); });
}

function pokazWynik() {
  $("qstep").textContent = "Twój zestaw";
  $("qbar").style.width = "100%";
  wynik = ranking(odpowiedzi);

  // Polski liczebnik rządzi przypadkiem: jedna dobrana, dwie do czterech dobrane, pięć i więcej dobranych.
  const SLOWNIE = ["Zero", "Jedna", "Dwie", "Trzy", "Cztery", "Pięć", "Sześć"];
  const n = wynik.length;
  const naglowek = n === 1 ? "Jedna umiejętność dobrana pod Twoją pracę"
    : n >= 2 && n <= 4 ? `${SLOWNIE[n]} umiejętności dobrane pod Twoją pracę`
    : `${SLOWNIE[n] || n} umiejętności dobranych pod Twoją pracę`;

  $("qbody").innerHTML = `
    <h3 class="q-title">${naglowek}</h3>
    <p class="q-help">${n > 1 ? "Kolejność nie jest przypadkowa, na górze to, co przy Twoich odpowiedziach zmieni najwięcej." : "To najlepsze dopasowanie do tego, co robisz."}</p>
    <div class="result-grid">
      <div class="rlist">${wynik.map((s, i) => `
        <a class="ritem" href="/skill/${s.id}/">
          <span class="rnum">${String(i + 1).padStart(2, "0")}</span>
          <span><b>${s.n}</b><p>${s.o}</p></span>
        </a>`).join("")}</div>
      <div class="capture" id="cap">
        <h3>Wysłać Ci ten zestaw na maila?</h3>
        <p>Dostaniesz go jako jedną kartkę, z instrukcją instalacji i krótkim opisem, kiedy której umiejętności użyć.</p>
        <div id="blad"></div>
        <label class="sr-only" for="mail">Adres e-mail do wysłania zestawu</label>
        <input type="email" id="mail" placeholder="twoj@adres.pl" autocomplete="email">
        <label class="consent" style="display:flex;gap:8px;align-items:flex-start;margin:4px 0 14px"><input type="checkbox" id="marketing" style="flex:none;width:18px;height:18px;margin:1px 0 0;accent-color:var(--accent)"><span>Chcę też dostawać newsletter AiXperts z nowościami, szkoleniami i usługami (dobrowolne). Mogę wypisać się w każdej chwili.</span></label>
        <button type="button" class="btn pelny" id="wyslij">Wyślij mi zestaw</button>
        <p class="consent" style="margin-top:12px">Wyślemy link potwierdzający adres, a po jego kliknięciu zamówiony zestaw. Otrzymasz go także bez zapisu do newslettera. Jeśli wybierzesz newsletter, to samo kliknięcie potwierdzi również ten dobrowolny zapis. Szczegóły: <a href="/regulamin/">regulamin</a> i <a href="/prywatnosc/">prywatność</a>.</p>
      </div>
    </div>
    <p class="q-help" style="margin-top:18px">Chcesz używać tych skilli z zespołem? <a href="https://d-x.pl/szkolenia-i-wdrozenia-ai/#dxaif-wdrozenie">Sprawdź możliwość wdrożenia z Digital Xperts</a>.</p>
    <div class="quiz-foot"><button type="button" class="link-btn" id="odnowa">← Zacznij test od nowa</button><span></span></div>`;

  $("wyslij").addEventListener("click", wyslij);
  $("mail").addEventListener("keydown", (e) => { if (e.key === "Enter") wyslij(); });
  $("odnowa").addEventListener("click", () => { nr = 0; odpowiedzi = []; rysuj(); });

  // Zdarzenie do statystyk (self-hosted, bez ciasteczek), sama liczba ukończeń, bez treści odpowiedzi.
  window.umami?.track("wynik-testu", { skilli: wynik.length });
}

async function wyslij() {
  const pole = $("mail");
  const adres = pole.value.trim();
  const blad = $("blad");
  blad.innerHTML = "";
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(adres)) {
    blad.innerHTML = '<div class="blad" role="alert">To nie wygląda na poprawny adres. Sprawdź, czy nie brakuje kropki albo małpy.</div>';
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
      body: JSON.stringify({ email: adres, wynik: wynik.map((s) => s.id), zgodaMarketing: $("marketing").checked === true }),
    });
    const dane = await odp.json().catch(() => ({}));
    if (!odp.ok || dane.ok !== true) throw new Error(dane.blad || "Nie udało się potwierdzić przyjęcia prośby.");
    window.umami?.track("zapis"); // sam fakt zapisu, adres nie trafia do statystyk
    const sent = document.createElement("div");
    sent.className = "sent";
    sent.setAttribute("role", "status");
    sent.innerHTML = "<strong>Sprawdź skrzynkę.</strong><br>Wysłaliśmy wiadomość na <strong></strong> z linkiem potwierdzającym. Kliknij go, a zestaw przyjdzie od razu. Jeśli nic nie widzisz w ciągu kilku minut, zajrzyj do spamu.";
    sent.querySelectorAll("strong")[1].textContent = adres;
    $("cap").replaceChildren(sent);
  } catch (e) {
    blad.innerHTML = '<div class="blad" role="alert"></div>';
    blad.firstChild.textContent = e.message + " Spróbuj jeszcze raz za chwilę.";
    btn.disabled = false;
    btn.textContent = "Wyślij mi zestaw";
  }
}

rysuj();

/* ---------- WebMCP: test doboru jako narzędzie agenta ---------- */
// Tylko odczyt: liczy ranking z odpowiedzi agenta, niczego nie wysyła i nie zapisuje.
// Formularze z adresem e-mail celowo nie są wystawione agentom.
// Chrome dokumentuje document.modelContext; starsze wersje specyfikacji używały navigator.modelContext.
const kontekstModelu = document.modelContext || navigator.modelContext;
if (kontekstModelu && typeof kontekstModelu.registerTool === "function") {
  const wlasciwosci = {};
  PYTANIA.forEach((P) => {
    const wartosci = P.o.map((o) => o[0]);
    wlasciwosci[P.k] = P.wiele
      ? { type: "array", items: { type: "string", enum: wartosci }, description: P.q }
      : { type: "string", enum: wartosci, description: P.q };
  });
  try {
    kontekstModelu.registerTool({
      name: "dobierz_skille",
      description: "Dobiera do sześciu darmowych skilli AI po polsku z katalogu skille.aixperts.pl na podstawie odpowiedzi o pracy użytkownika (ten sam test co na stronie). Zwraca nazwy, dziedziny, korzyści i adresy kart skilli.",
      inputSchema: { type: "object", properties: wlasciwosci, required: ["zajecia"] },
      annotations: { readOnlyHint: true },
      execute: async (arg) => {
        const odp = PYTANIA.map((P) => {
          const v = arg && arg[P.k];
          const lista = Array.isArray(v) ? v : v ? [v] : [];
          return lista.map((t) => P.o.findIndex((o) => o[0] === t)).filter((i) => i >= 0);
        });
        return opisWyniku(ranking(odp));
      },
    });
  } catch (_) { /* przeglądarka bez WebMCP albo bez zgody: strona działa normalnie */ }
}
