// Skrypt API SN w skillach prawnych: każda kopia identyczna ze źródłem w narzedzia/skrypty-skilli,
// każdy skill z kopią opisuje ją w SKILL.md, a test wbudowany skryptu przechodzi (bez sieci).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const ZRODLO = "narzedzia/skrypty-skilli/orzeczenia_sn.py";
const wzor = readFileSync(ZRODLO, "utf8");
const zKopia = readdirSync("skille").filter((s) => existsSync(join("skille", s, "scripts", "orzeczenia_sn.py")));

test("co najmniej 15 skilli prawnych ma skrypt API SN", () => {
  assert.ok(zKopia.length >= 15, `skilli ze skryptem: ${zKopia.length}`);
});

test("kopie skryptu API SN są identyczne ze źródłem", () => {
  for (const s of zKopia) assert.equal(readFileSync(join("skille", s, "scripts", "orzeczenia_sn.py"), "utf8"), wzor, `${s}: uruchom kopię z ${ZRODLO}`);
});

test("SKILL.md każdego skilla ze skryptem ma sekcję o orzeczeniach SN na żywo", () => {
  for (const s of zKopia) {
    const t = readFileSync(join("skille", s, "SKILL.md"), "utf8");
    assert.match(t, /## Orzeczenia SN na żywo/, s);
    assert.match(t, /scripts\/orzeczenia_sn\.py/, s);
    assert.match(t, /repozytorium2\.sn\.pl/, s);
  }
});

test("skrypt API SN: test wbudowany bez sieci (składanie tekstu, parametry, stronicowanie, 429, brak sieci, przekierowania)", (t) => {
  const proby = ["python", "python3", "py"].map((p) => spawnSync(p, [ZRODLO, "--selftest"], { encoding: "utf8" }));
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

test("skrypt API SN bez pauz i półpauz w treści", () => {
  assert.ok(!new RegExp("[" + String.fromCharCode(0x2014, 0x2013) + "]").test(wzor));
});
