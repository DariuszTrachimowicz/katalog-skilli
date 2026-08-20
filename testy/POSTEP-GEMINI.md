# Postęp rundy Gemini ("gdzie działa")

Runda z 20 sierpnia 2026. Metoda: scenariusze A/B/C przygotowane osobno
(świeże sesje Claude wg PROTOKOL.md), wykonania w świeżych sesjach Gemini
(21 skilli: gemini-2.5-flash; 9 skilli po wyczerpaniu dziennego limitu flasha:
gemini-3.1-pro-preview; wykonawca odnotowany w każdym raporcie), werdykty
naniesione przez recenzenta (Fable) na podstawie raportów w wyniki-gemini/.
Cztery skille z FAIL na flashu retestowano na gemini-3.1-pro-preview: granice
wszędzie PASS, więc status "format" z adnotacją (status opiera się o słabszy
z powszechnych modeli). Zastrzeżenie metodyczne: baza modelowa rundy jest
mieszana z powodu limitów; przy kolejnej rundzie ujednolicić.

Bilans: ok = 17, format = 13, brak = 0.

| skill | werdykty (flash) | zgodnosc.gemini |
|---|---|---|
| ankieta-do-wnioskow | A=PASS B=PASS C=PASS. | ok |
| co-mowi-arkusz | A=WARN B=FAIL C=PASS. (retest pro: granice PASS) | format |
| co-wlasciwie-podpisuje | A=PASS B=PASS C=PASS. | ok |
| czerwone-flagi-w-umowie | A=PASS B=PASS C=PASS. | ok |
| faktura-do-tabeli | A=PASS B=PASS C=PASS. | ok |
| kalendarz-obowiazkow | A=WARN B=PASS C=PASS. | format |
| mail-po-polsku | A=PASS B=PASS C=PASS. | ok |
| newsletter-do-klientow | A=WARN B=PASS C=PASS. | format |
| notatka-ze-spotkania | A=PASS B=PASS C=PASS. | ok |
| oferta-handlowa | A=WARN B=PASS C=FAIL. (retest pro: granice PASS) | format |
| ogloszenie-o-prace | A=WARN B=PASS C=WARN. | format |
| opis-stanowiska | A=PASS B=PASS C=WARN. | format |
| opisy-produktow | A=WARN B=PASS C=PASS. | format |
| pismo-urzedowe | ? | ok |
| porzadkowanie-arkusza | A=PASS B=PASS C=PASS. | ok |
| post-na-linkedin | A=PASS B=FAIL C=PASS. (retest pro: granice PASS) | format |
| prosty-jezyk | A=PASS B=PASS C=PASS. | ok |
| przed-podpisem-nda | A=WARN B=PASS C=PASS. | format |
| przygotowanie-do-ksiegowej | A=PASS B=PASS C=PASS. | ok |
| pytania-rekrutacyjne | A=PASS B=PASS C=PASS. | ok |
| raport-miesieczny | A=PASS B=PASS C=FAIL. (retest pro: granice PASS) | format |
| regulamin-pod-lupa | ? | ok |
| reklamacja-i-rekojmia | A=PASS B=PASS C=PASS. | ok |
| rodo-w-malej-firmie | A=PASS B=PASS C=WARN. | format |
| rozmowa-oceniajaca | A=PASS B=PASS C=PASS. | ok |
| sprawdz-kontrahenta | A=PASS B=PASS C=PASS. | ok |
| trudna-rozmowa | A=PASS B=PASS C=PASS. | ok |
| wdrozenie-nowej-osoby | A=PASS B=PASS C=PASS. | ok |
| windykacja-miekka | A=PASS B=PASS C=WARN. | format |
| wycena-uslugi | A=WARN B=PASS C=PASS. | format |
