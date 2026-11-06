// Kopiuje wiedzę wąskich skilli prawnych do skilla sprawy-prawne-w-firmie
// (references/katalog/<id>/), żeby zmiana prawa była poprawiana w jednym miejscu:
// w wąskim skillu. Po każdej zmianie wąskiego skilla uruchom:
//   node narzedzia/katalog-do-firmy.mjs            (kopiuje)
//   node narzedzia/katalog-do-firmy.mjs --sprawdz  (kod 1, gdy kopie są nieaktualne)
// Test testy/sprawy-prawne-kopie.test.mjs pilnuje zgodności przy każdym uruchomieniu testów
// katalogu (obowiązkowo przed każdym wydaniem: node --test testy/*.test.mjs serwer/*.test.mjs).
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, renameSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), "..");
const CEL = join(KORZEN, "skille", "sprawy-prawne-w-firmie", "references", "katalog");

// Wąskie skille, z których korzysta skill firmowy (inwentaryzacja z 6 XI 2026).
export const ZRODLA = [
  "czerwone-flagi-w-umowie", "co-wlasciwie-podpisuje", "przed-podpisem-nda", "sprawdz-kontrahenta",
  "pelnomocnictwo-w-firmie", "dzielo-zlecenie-czy-etat", "zwolnienie-pracownika-krok-po-kroku",
  "prawa-autorskie-w-zleceniu", "rodo-dokumentacja", "rodo-w-malej-firmie", "zgody-na-stronie-www",
  "regulamin-sklepu-checklista", "regulamin-pod-lupa", "reklamacja-i-rekojmia", "pismo-urzedowe",
  "decyzja-z-urzedu-co-dalej", "kontrola-z-urzedu", "e-doreczenia-w-firmie", "sygnalisci-procedura",
  "polityka-ai", "windykacja-miekka", "kalendarz-obowiazkow", "ksef-procedury", "procedura-aml",
  "najem-mieszkania-pod-lupa", "remont-umowa-i-odbior", "nakaz-zaplaty-co-dalej",
  "zamkniecie-firmy-krok-po-kroku", "spolka-zoo-przygotowanie",
];

const NAGLOWEK_PROCEDURY = (id) =>
  `<!-- Kopia z skille/${id}/SKILL.md (bez frontmatter), generowana: node narzedzia/katalog-do-firmy.mjs. Nie edytuj tutaj. -->\n` +
  `> W skillu sprawy-prawne-w-firmie ten plik jest źródłem wiedzy i kolejności kroków. Ścieżki scripts/, assets/ i references/ z tego pliku są względem katalogu references/katalog/${id}/ (pliki z references/ leżą bezpośrednio w nim). Formuły odmowy, zakaz pisania pism i zakaz podawania artykułów z tego pliku NIE obowiązują: obowiązują zasady z nadrzędnego SKILL.md (poziomy pism, artykuły z wbudowanych aktów, karta dla prawnika).\n\n`;
const NAGLOWEK_REF = (id, plik) =>
  `<!-- Kopia z skille/${id}/references/${plik}, generowana: node narzedzia/katalog-do-firmy.mjs. Nie edytuj tutaj. -->\n`;

export function oczekiwane() {
  const out = new Map();
  for (const id of ZRODLA) {
    const dir = join(KORZEN, "skille", id);
    const skill = readFileSync(join(dir, "SKILL.md"), "utf8").replace(/\r\n/g, "\n").replace(/^---\n[\s\S]*?\n---\n/, "");
    out.set(`${id}/procedura.md`, NAGLOWEK_PROCEDURY(id) + skill.trimStart());
    const ref = join(dir, "references");
    if (existsSync(ref))
      for (const f of readdirSync(ref).filter((f) => f.endsWith(".md")).sort())
        out.set(`${id}/${f}`, NAGLOWEK_REF(id, f) + readFileSync(join(ref, f), "utf8").replace(/\r\n/g, "\n"));
    // Skrypty i dane, na które powołuje się procedura (np. ocena ryzyka AML), kopiowane bajt w bajt.
    for (const pod of ["scripts", "assets"])
      for (const rel of plikiRek(join(dir, pod))) out.set(`${id}/${pod}/${rel}`, readFileSync(join(dir, pod, rel)));
  }
  return out;
}

function plikiRek(k, pref = "") {
  if (!existsSync(k)) return [];
  const out = [];
  for (const w of readdirSync(k, { withFileTypes: true })) {
    if (w.name.startsWith(".") || w.name === "__pycache__") continue;
    if (w.isDirectory()) out.push(...plikiRek(join(k, w.name), `${pref}${w.name}/`));
    else out.push(`${pref}${w.name}`);
  }
  return out;
}

const rowne = (a, b) => (Buffer.isBuffer(b) ? Buffer.compare(a, b) === 0 : a.toString("utf8").replace(/\r\n/g, "\n") === b);

export function rozjazdy() {
  const exp = oczekiwane();
  const bledy = [];
  for (const [rel, tresc] of exp) {
    const p = join(CEL, rel);
    if (!existsSync(p)) bledy.push(`brak ${rel}`);
    else if (!rowne(readFileSync(p), tresc)) bledy.push(`nieaktualne ${rel}`);
  }
  if (existsSync(CEL))
    for (const id of readdirSync(CEL))
      for (const f of plikiRek(join(CEL, id)))
        if (!exp.has(`${id}/${f}`)) bledy.push(`zbędne ${id}/${f}`);
  return bledy;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (process.argv.includes("--sprawdz")) {
    const r = rozjazdy();
    console.log(r.length ? r.join("\n") : "kopie aktualne");
    process.exit(r.length ? 1 : 0);
  }
  // Najpierw komplet w katalogu tymczasowym, podmiana dopiero po udanym zapisie:
  // błąd odczytu źródła nie zostawi skilla bez wiedzy.
  const pliki = oczekiwane();
  const TMP = CEL + ".nowy";
  rmSync(TMP, { recursive: true, force: true });
  let n = 0;
  for (const [rel, tresc] of pliki) {
    mkdirSync(dirname(join(TMP, rel)), { recursive: true });
    writeFileSync(join(TMP, rel), tresc, "utf8");
    n++;
  }
  rmSync(CEL, { recursive: true, force: true });
  renameSync(TMP, CEL);
  console.log(`skopiowano ${n} plików z ${ZRODLA.length} skilli do ${CEL}`);
}
