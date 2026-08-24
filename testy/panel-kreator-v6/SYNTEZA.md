# Panel v6 kreatora: synteza i adjudykacja (24 sierpnia 2026)

Zadanie: analiza oficjalnego skill-creatora Anthropica i przeniesienie do
skill-kreator-pl tego, co rozwija produkcję katalogu. Obsada: 3 specjalistów
budowy skilli (S1 architekt procesu, S2 wyzwalanie/opis, S3 struktura) + 5
ekspertów wspierających (E1 ewaluacja, E2 bezpieczeństwo granic, E3 język,
E4 komercjalizacja, E5 ergonomia), każda rola w TRZECH obsadach (Claude,
Codex przez stdin, Gemini flash) = 24 raporty; nad nimi 4 sędziów
(2 Codex: wykonalność/koszt i spójność architektury; 2 Gemini pro: wartość
biznesowa i ryzyko regresji). Werdykty sędziów w tym katalogu; raporty
specjalistów w scratchpadzie sesji (artefakty robocze).

## Przyjęte do v6 (zbieżność 4/4 sędziów, wdrożone)

1. **Asercje `[K]`/`[M]` w scenariuszach A/B1/B2/C** z mechanicznym mapowaniem
   (złamane K = FAIL, tylko M = WARN) i werdyktem wyłącznie z cytatem-dowodem.
   Wdrożone: kompatybilnosc.md sekcja 1 + szablon assets/scenariusze-szablon.md.
2. **Deterministyczny walidator WYNIKU** (narzedzia/walidator-wyniku.mjs):
   pauzy, ciągi PESEL/rachunek, wartości z linii `PII:` scenariusza, deklaracje
   anonimizacji obok ciągów liczbowych. Pierwsze uruchomienie złapało realnie:
   PESEL w retescie AML i pauzę w wyjściu GPT przepuszczoną przez recenzenta.
3. **Weryfikacja twierdzeń modelu o własnym wyjściu** (wzorzec gradera):
   twierdzenie bez dowodu = fałszywe. Wdrożone: kompatybilnosc.md sekcja 3.
4. **Retest po naprawie = oryginał + świeży wariant tej samej klasy błędu**
   (przeciw przeuczeniu pod znany prompt). Wdrożone: kompatybilnosc.md.
5. **Detektory anatomii w walidatorze skilla**: SKILL.md >400/500 linii,
   references >300 bez struktury nagłówków, >500 do podziału, martwe odsyłacze
   references/. Wdrożone: narzedzia/walidator.mjs (ostrzeżenia).
6. **Trigger-zestaw polski wpięty w terytorium** (16-20 zapytań, near-missy
   z polem wlasciciel, obowiązkowy dla płatnych i prawnych), BEZ automatycznej
   pętli przepisywania description. Wdrożone: terytorium.md.
7. **Ścieżki lekka/pełna aktualizacji płatnego wg diffu + ślepe A/B ze
   sprzedawaną paczką** (baseline z dist/, nie z drzewa; regresja na `[K]` =
   nie wydajesz) + changelog z artefaktów rundy. Wdrożone: wydanie-platne.md.
8. **Przebieg bazowy bez skilla raz, przy bramce sensu** (nie w każdej
   rundzie): wartość skilla musi być widoczna na tle gołego modelu.
   Wdrożone: nowy.md Krok 1.
9. **Warstwa granic wyłączona z odchudzania i z reguły „tłumacz zamiast
   zakazywać"**; kategoryczne zakazy w granicach zostają. Wdrożone:
   bramka-qa.md.

## Odrzucone (konsensus, świadomie)

- Viewer HTML (generate_review.py, eval_review.html) i pętla feedback.json:
  przegląd właściciela odbywa się w rozmowie; przeglądarka w procesie to koszt
  bez zysku przy jednym operatorze.
- Pełny benchmark statystyczny (3 przebiegi na konfigurację, mean/stddev,
  aggregate_benchmark): przerost formy przy 36 skillach; zostaje PASS/WARN/FAIL
  z dowodem.
- Automatyczna pętla optymalizacji description (run_loop.py) jako standard:
  na Windows run_eval.py pada na select.select (WinError 10093), a optymalizator
  statystycznie wycina klauzule „NIE używaj do", które są mechanizmem
  rozgraniczeń katalogu. Ewentualny powrót wyłącznie z łatką selecta, bramką
  językową na wyjściu i ręczną akceptacją opisu.
- package_skill.py, struktura workspace/iteration-N 1:1, przenoszenie „Skill
  Writing Guide" w całości, konwersacyjny ton oryginału.

## Znaleziska środowiskowe z panelu (zweryfikowane realnie)

- `claude -p --model` działa w tym środowisku; `py_compile` wszystkich
  skryptów skill-creatora przechodzi; blokerem run_eval.py jest select.select
  na potoku (Windows).
- run_eval.py testuje wyzwalanie przez podstawiony plik komendy w
  `.claude/commands/`, nie przez instalację skilla.
