// Minimalny renderer Markdown pokrywający to, czego używają wpisy katalogowe:
// nagłówki, akapity, listy, pogrubienia, kursywa, kod, odnośniki, cytaty i tabele.
// Zero zależności — nie ma tu nic, co wymagałoby aktualizacji przy kolejnych latach.

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ESC[c]);

// Polskie cudzysłowy i półpauzy — drobiazg, ale odróżnia tekst złożony od wklejonego.
function typografia(s) {
  return s
    .replace(/(^|[\s(])"/g, "$1„")
    .replace(/"/g, "”")
    .replace(/(\s)-(\s)/g, "$1—$2");
}

function inline(s) {
  let t = esc(s);
  t = t.replace(/`([^`]+)`/g, (_, k) => `<code>${k}</code>`);
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, tekst, url) => `<a href="${url}">${tekst}</a>`);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  return typografia(t);
}

export function naglowkiPoziom2(md) {
  // Dzieli dokument na sekcje po nagłówkach "## " — na tym opiera się szablon wpisu.
  const sekcje = [];
  let biezaca = null;
  for (const linia of md.split("\n")) {
    const m = linia.match(/^##\s+(.+)$/);
    if (m) {
      if (biezaca) sekcje.push(biezaca);
      biezaca = { tytul: m[1].trim(), tresc: [] };
    } else if (biezaca) {
      biezaca.tresc.push(linia);
    }
  }
  if (biezaca) sekcje.push(biezaca);
  return sekcje.map((s) => ({ tytul: s.tytul, html: render(s.tresc.join("\n")) }));
}

export function render(md) {
  const linie = md.split("\n");
  const out = [];
  let i = 0;

  while (i < linie.length) {
    const l = linie[i];

    if (!l.trim()) { i++; continue; }

    // tabela
    if (l.trim().startsWith("|") && linie[i + 1] && /^\s*\|[\s|:-]+\|\s*$/.test(linie[i + 1])) {
      const kom = (w) => w.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const naglowki = kom(l);
      i += 2;
      const wiersze = [];
      while (i < linie.length && linie[i].trim().startsWith("|")) { wiersze.push(kom(linie[i])); i++; }
      out.push(
        `<div class="tabela"><table><thead><tr>${naglowki.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead>` +
        `<tbody>${wiersze.map((w) => `<tr>${w.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
      );
      continue;
    }

    // cytat
    if (l.startsWith(">")) {
      const blok = [];
      while (i < linie.length && linie[i].startsWith(">")) { blok.push(linie[i].replace(/^>\s?/, "")); i++; }
      out.push(`<blockquote>${render(blok.join("\n"))}</blockquote>`);
      continue;
    }

    // lista punktowana
    if (/^[-*]\s+/.test(l)) {
      const el = [];
      while (i < linie.length && /^[-*]\s+/.test(linie[i])) { el.push(linie[i].replace(/^[-*]\s+/, "")); i++; }
      out.push(`<ul>${el.map((e) => `<li>${inline(e)}</li>`).join("")}</ul>`);
      continue;
    }

    // lista numerowana
    if (/^\d+\.\s+/.test(l)) {
      const el = [];
      while (i < linie.length && /^\d+\.\s+/.test(linie[i])) { el.push(linie[i].replace(/^\d+\.\s+/, "")); i++; }
      out.push(`<ol>${el.map((e) => `<li>${inline(e)}</li>`).join("")}</ol>`);
      continue;
    }

    // nagłówek niższego rzędu
    const h = l.match(/^(#{3,4})\s+(.+)$/);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }

    // akapit
    const akapit = [];
    while (i < linie.length && linie[i].trim() && !/^([-*] |[>#|]|\d+\. )/.test(linie[i])) { akapit.push(linie[i]); i++; }
    if (akapit.length) out.push(`<p>${inline(akapit.join(" "))}</p>`);
    else i++;
  }

  return out.join("\n");
}

// Frontmatter celowo uproszczony do dwóch konstrukcji:
//   klucz: wartość                 → tekst
//   klucz:                         → mapa, której pola są wcięte o dwie spacje
//     podklucz: wartość
// Listy zapisujemy po przecinku (szukaj: umowy, prawo, firma).
// Rezygnacja z pełnego YAML-a jest świadoma: mniej sposobów na cichy błąd
// w pliku, który ktoś będzie edytować raz na kilka tygodni.
export function frontmatter(tekst) {
  const m = tekst.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { dane: {}, tresc: tekst };

  const dane = {};
  let mapa = null;

  for (const linia of m[1].split("\n")) {
    const t = linia.trim();
    if (!t || t.startsWith("#")) continue;

    const kv = t.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, surowa] = kv;
    const v = zdejmijCudzyslowy(surowa);
    const wciete = /^\s+/.test(linia);

    if (wciete && mapa) { dane[mapa][k] = v; continue; }

    if (v === "") { dane[k] = {}; mapa = k; }
    else { dane[k] = v; mapa = null; }
  }

  return { dane, tresc: m[2] };
}

export const lista = (v) =>
  !v ? [] : String(v).split(",").map((s) => s.trim()).filter(Boolean);

function zdejmijCudzyslowy(s) {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1);
  return t;
}
