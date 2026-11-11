// Skrypty na żywo w skillach prawnych (API SN i API Sejmu ELI): każda kopia identyczna ze źródłem
// w narzedzia/skrypty-skilli, każdy skill z kopią opisuje ją w SKILL.md, a test wbudowany przechodzi (bez sieci).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const SKRYPTY = [
  { plik: "orzeczenia_sn.py", sekcja: /## Orzeczenia SN na żywo/, adres: /repozytorium2\.sn\.pl/, min: 15 },
  { plik: "akty_eli.py", sekcja: /## Aktualność przepisów na żywo/, adres: /api\.sejm\.gov\.pl\/eli/, min: 20 },
  { plik: "pismo_docx.py", sekcja: /## Pismo jako plik/, adres: /references\/wzory-pism\.md/, min: 1 },
];
const PAUZY = new RegExp("[" + String.fromCharCode(0x2014, 0x2013) + "]");

for (const s of SKRYPTY) {
  const zrodlo = join("narzedzia", "skrypty-skilli", s.plik);
  const wzor = readFileSync(zrodlo, "utf8");
  const zKopia = readdirSync("skille").filter((k) => existsSync(join("skille", k, "scripts", s.plik)));

  test(`${s.plik}: co najmniej ${s.min} skilli ma kopię`, () => {
    assert.ok(zKopia.length >= s.min, `skilli ze skryptem: ${zKopia.length}`);
  });

  test(`${s.plik}: kopie identyczne ze źródłem`, () => {
    for (const k of zKopia) assert.equal(readFileSync(join("skille", k, "scripts", s.plik), "utf8"), wzor, `${k}: skopiuj ${zrodlo}`);
  });

  test(`${s.plik}: SKILL.md każdego skilla z kopią ma sekcję i adres API`, () => {
    for (const k of zKopia) {
      const t = readFileSync(join("skille", k, "SKILL.md"), "utf8");
      assert.match(t, s.sekcja, k);
      assert.ok(t.includes(`scripts/${s.plik}`), k);
      assert.match(t, s.adres, k);
    }
  });

  test(`${s.plik}: test wbudowany bez sieci`, (t) => {
    const proby = ["python", "python3", "py"].map((p) => spawnSync(p, [zrodlo, "--selftest"], { encoding: "utf8" }));
    const py = proby.find((r) => !r.error);
    if (!py) {
      // Brak interpretera to pominięcie; inny błąd uruchomienia (np. EPERM) to błąd testu.
      const inne = proby.filter((r) => r.error && r.error.code !== "ENOENT");
      assert.equal(inne.length, 0, "nie udało się uruchomić Pythona: " + inne.map((r) => r.error.code).join(", "));
      t.skip("brak interpretera Pythona");
      return;
    }
    assert.equal(py.status, 0, py.stdout + py.stderr);
    assert.match(py.stdout, /selftest OK/);
  });

  test(`${s.plik}: bez pauz i półpauz`, () => {
    assert.ok(!PAUZY.test(wzor));
  });
}

test("projekty-ustaw.py: test wbudowany bez sieci (etap, nowe procesy, pierwsze uruchomienie bez powiadomień)", (t) => {
  const proby = ["python", "python3", "py"].map((p) => spawnSync(p, ["narzedzia/projekty-ustaw.py", "--selftest"], { encoding: "utf8" }));
  const py = proby.find((r) => !r.error);
  if (!py) {
    const inne = proby.filter((r) => r.error && r.error.code !== "ENOENT");
    assert.equal(inne.length, 0, "nie udało się uruchomić Pythona: " + inne.map((r) => r.error.code).join(", "));
    t.skip("brak interpretera Pythona");
    return;
  }
  assert.equal(py.status, 0, py.stdout + py.stderr);
  assert.match(py.stdout, /selftest OK/);
});

test("akty-w-skillach.py: test wbudowany bez sieci (akt bazowy, stan po mailu, raport dat)", (t) => {
  const proby = ["python", "python3", "py"].map((p) => spawnSync(p, ["narzedzia/akty-w-skillach.py", "--selftest"], { encoding: "utf8" }));
  const py = proby.find((r) => !r.error);
  if (!py) {
    const inne = proby.filter((r) => r.error && r.error.code !== "ENOENT");
    assert.equal(inne.length, 0, "nie udało się uruchomić Pythona: " + inne.map((r) => r.error.code).join(", "));
    t.skip("brak interpretera Pythona");
    return;
  }
  assert.equal(py.status, 0, py.stdout + py.stderr);
  assert.match(py.stdout, /selftest OK/);
});
