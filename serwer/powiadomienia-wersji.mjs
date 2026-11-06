// Powiadomienia o nowej wersji skilla: tylko dla osób, które przy pobraniu same
// zaznaczyły taką prośbę i kliknęły link pobrania (adres potwierdzony).
// Czyste funkcje na wierszach dziennika zapisów; wysyłkę robi zapisy.mjs.

export const TRESC_ZGODY_WERSJI = "Napisz do mnie, gdy wyjdzie nowa wersja tego skilla (poprawki, zmiany przepisów). Tylko o tym skillu, bez reklam. Wypis jednym kliknięciem w każdej wiadomości.";
export const WERSJA_ZGODY_WERSJI = "2026-11-06";

const klucz = (email, skill) => `${email}\n${skill}`;
const pozniej = (mapa, k, kiedy) => { if (kiedy && !(mapa.get(k) >= kiedy)) mapa.set(k, kiedy); };

// Kto dostaje mail o wersji `wersja` skilla `skill`. Zwraca [{email, token}],
// token = najnowsza prośba danej osoby (link pobrania i wypisu z tej prośby).
// `wycofania` = adresy z ostatnim czasem wypisu z innych rejestrów (np. wspólne subskrypcje).
export function odbiorcy(wiersze, skill, wersja, wycofania = new Map()) {
  const pobrane = new Set(), proby = new Set(), wypisOgolny = new Map(), wypisSkilla = new Map(), osoby = new Map();
  for (const r of wiersze) if (r.typ === "pobranie" && r.token) pobrane.add(r.token);
  for (const r of wiersze) {
    if (r.typ === "pobranie") continue;
    // Rezerwacja przed wysyłką: kto już był próbowany, nie dostaje tej wersji drugi raz (także po niepewnym wyniku).
    else if (r.typ === "powiadomienie-wersji-proba" && r.skill === skill && r.wersja === wersja) proby.add(r.email);
    else if (r.typ === "wypisanie") pozniej(wypisOgolny, r.email, r.kiedy);
    else if (r.typ === "wypis-wersji") pozniej(wypisSkilla, klucz(r.email, r.skill), r.kiedy);
    // Liczy się najnowsza POTWIERDZONA prośba (kliknięty link), więc niekliknięte ponowne zamówienie nie wyłącza powiadomień.
    else if (r.typ === "pobranie-prosba" && r.skill === skill && r.powiadomWersje?.udzielona === true && pobrane.has(r.token)) {
      const dotad = osoby.get(r.email);
      if (!dotad || r.kiedy > dotad.kiedy) osoby.set(r.email, { email: r.email, token: r.token, kiedy: r.kiedy });
    }
  }
  const wynik = [];
  for (const o of osoby.values()) {
    // Wypis po ostatniej prośbie blokuje; nowa prośba z zaznaczeniem po wypisie wznawia.
    const wypis = [wypisOgolny.get(o.email), wypisSkilla.get(klucz(o.email, skill)), wycofania.get(o.email)].some((k) => k && k >= o.kiedy);
    if (!wypis && !proby.has(o.email)) wynik.push({ email: o.email, token: o.token });
  }
  return wynik;
}

// Czy aktualny wypis z wersji tego skilla już obowiązuje (żeby nie dopisywać kolejnych wierszy przy ponownym kliknięciu).
export function wypisanyZWersji(wiersze, email, skill) {
  let prosba = "", wypis = "";
  for (const r of wiersze) {
    if (r.email !== email) continue;
    if (r.typ === "pobranie-prosba" && r.skill === skill && r.powiadomWersje?.udzielona === true && r.kiedy > prosba) prosba = r.kiedy;
    if (r.typ === "wypis-wersji" && r.skill === skill && r.kiedy > wypis) wypis = r.kiedy;
  }
  return wypis !== "" && wypis >= prosba;
}

const liczby = (w) => String(w).split(".").map((x) => parseInt(x, 10) || 0);
export function nowsza(a, b) {
  const [x, y] = [liczby(a), liczby(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
  return false;
}

// Skille z wersją wyższą niż w stanie. Skill bez wpisu w stanie (nowy w katalogu
// albo pierwszy przebieg) i cofnięcie wydania tylko aktualizują stan, bez wysyłki.
export function zmienione(skille, stan) {
  return skille.filter((s) => s.wersja && stan[s.id] && nowsza(s.wersja, stan[s.id]));
}
