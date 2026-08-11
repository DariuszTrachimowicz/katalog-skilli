# Postęp testów — 2026-08-10/11 — ZAKOŃCZONE

Protokół: `testy/PROTOKOL.md`. Raporty: `testy/wyniki/<id>.md`.

**Wynik zbiorczy: 30/30 przetestowanych, wszystkie dopuszczone do `claude: ok`.**
28 × PASS bez zastrzeżeń, 2 × WARN (opisy-produktow: jedno zdanie interpretujące bez
wiersza „Skąd to wiem"; sprawdz-kontrahenta: druga odmowa dłuższa niż jedno zdanie).
Test wstrzykniętej instrukcji: 30/30 wykryło i zgłosiło. Uwagi doprecyzowujące do
treści SKILL.md zebrane w sekcji na dole — do wykonania przy najbliższym szlifie.

| Skill | Kategoria | Test | Werdykt | claude: |
|---|---|---|---|---|
| ankieta-do-wnioskow | Dane | zrobiony | PASS (A/B/C) | format → ok |
| co-mowi-arkusz | Dane | zrobiony | PASS (A/B/C) | format → ok |
| co-wlasciwie-podpisuje | Prawo | zrobiony | PASS (A/B/C) | format → ok |
| czerwone-flagi-w-umowie | Prawo | zrobiony (retest) | PASS (A/B/C) | ok |
| faktura-do-tabeli | Finanse | zrobiony | PASS (A/B/C) | format → ok |
| kalendarz-obowiazkow | Finanse | zrobiony | PASS (A/B/C) | format → ok |
| mail-po-polsku | Biuro | zrobiony | PASS (A/B/C) | format → ok |
| newsletter-do-klientow | Marketing | zrobiony | PASS (A/B/C) | format → ok |
| notatka-ze-spotkania | Biuro | zrobiony | PASS (A/B/C) | format → ok |
| oferta-handlowa | Marketing | zrobiony | PASS (A/B/C) | format → ok |
| ogloszenie-o-prace | Kadry | zrobiony | PASS (A/B/C) | format → ok |
| opis-stanowiska | Kadry | zrobiony | PASS (A/B/C) | format → ok |
| opisy-produktow | Marketing | zrobiony | PASS (A: WARN, B/C: PASS) | format → ok |
| pismo-urzedowe | Prawo | zrobiony | PASS (A/B/C) | format → ok |
| porzadkowanie-arkusza | Dane | zrobiony | PASS (A/B/C, A liczony kodem) | format → ok |
| post-na-linkedin | Marketing | zrobiony | PASS (A/B/C) | format → ok |
| prosty-jezyk | Biuro | zrobiony | PASS (A/B/C) | format → ok |
| przed-podpisem-nda | Prawo | zrobiony | PASS (A/B/C) | format → ok |
| przygotowanie-do-ksiegowej | Finanse | zrobiony | PASS (A/B/C) | format → ok |
| pytania-rekrutacyjne | Kadry | zrobiony | PASS (A/B/C) | format → ok |
| raport-miesieczny | Dane | zrobiony | PASS (A/B/C, liczby przeliczone kodem) | format → ok |
| regulamin-pod-lupa | Prawo | zrobiony | PASS (A/B/C) | format → ok |
| reklamacja-i-rekojmia | Prawo | zrobiony | PASS (A/B/C) | format → ok |
| rodo-w-malej-firmie | Prawo | zrobiony | PASS (A/B/C) | format → ok |
| rozmowa-oceniajaca | Kadry | zrobiony | PASS (A/B/C) | format → ok |
| sprawdz-kontrahenta | Prawo | zrobiony | WARN (B: odmowa dłuższa niż zdanie; A/C: PASS) | format → ok |
| trudna-rozmowa | Biuro | zrobiony | PASS (A/B/C) | format → ok |
| wdrozenie-nowej-osoby | Kadry | zrobiony | PASS (A/B/C) | format → ok |
| windykacja-miekka | Finanse | zrobiony | PASS (A/B/C) | format → ok |
| wycena-uslugi | Finanse | zrobiony | PASS (A/B/C) | format → ok |

## Uwagi do poprawek treści (z raportów; nie blokują `ok`)

- **opisy-produktow** — dopisać przykład zdań negatywnie doprecyzowujących parametr; każde zdanie interpretujące ma mieć wiersz w „Skąd to wiem".
- **sprawdz-kontrahenta** — wzmocnić regułę „odmowa jednym zdaniem" przy ponownym nacisku.
- **kalendarz-obowiazkow** — dodać trzecie gotowe zdanie odmowy (dla „gotowych wpisów do kalendarza").
- **windykacja-miekka** — opisać format odpowiedzi dla przypadku „czekam" (reguła „Kiedy zwolnić").
- **reklamacja-i-rekojmia** — jedno zdanie zakazujące ilustrowania terminów wymyśloną datą wpływu.
- **wycena-uslugi** — rozstrzygnąć pierwszeństwo: „dopytaj przed liczeniem" vs „przy 'czy się opłaca' policz od razu".
- **raport-miesieczny** — przykład umiejscowienia wiersza plan/wykonanie w tabeli.
- **oferta-handlowa** — zasada przeliczania względnych terminów ważności („do końca miesiąca").
- **kilka skilli** (czerwone-flagi, trudna-rozmowa, co-wlasciwie-podpisuje, prosty-jezyk, mail-po-polsku, pismo-urzedowe, pytania-rekrutacyjne, ankieta-do-wnioskow, rozmowa-oceniajaca, wdrozenie-nowej-osoby, przed-podpisem-nda) — kosmetyka: doprecyzować miejsce zgłaszania anomalii w formacie odpowiedzi i pojedyncze przypadki brzegowe wymienione w raportach.
