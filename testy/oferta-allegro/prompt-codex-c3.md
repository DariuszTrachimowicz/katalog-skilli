Jesteś sędzią QA (tylko odczyt) skilla `oferta-allegro`, cykl 3. Nie edytuj plików. Czytaj pliki powłoką (`Get-Content -Raw -Encoding UTF8 <plik>`), cytuj plik:linia, po polsku, zwięźle.

Twoje werdykty z cykli 1 i 2: testy/oferta-allegro/codex-c1.txt i codex-c2.txt (końcowe znaleziska na dole każdego pliku). Po cyklu 2 naniesiono poprawki w skille/oferta-allegro/SKILL.md, scripts/tytul_allegro.py, testy/wyniki-gemini/scenariusze/oferta-allegro.md i testy/wyzwalanie/oferta-allegro.md (zestaw ma znów 20 zapytań). Retesty na OSTATNIEJ wersji skilla (zapisane po poprawkach): testy/oferta-allegro/retest3-A-B1-B2.md i retest3-C.md (wejście C jak w scenariuszu C pliku scenariuszy). Pomiar wyzwalania może jeszcze trwać: testy/wyzwalanie/oferta-allegro-wynik.log (jeśli nie ma linii „Wynik:”, napisz, że go nie oceniasz).

Zadania:
1. Każde znalezisko cyklu 2 (tabele i lista końcowa w codex-c2.txt): NAPRAWIONE / NIE / CZĘŚCIOWO z plik:linia.
2. Nowe sprzeczności po poprawkach (SKILL.md wewnętrznie, z references, z wpis.md, ze skryptem). Uruchom `python -X utf8 skille/oferta-allegro/scripts/tytul_allegro.py --selftest` i kilka własnych przypadków, w tym `--ean` bez kodu.
3. Retesty cyklu 3 względem asercji i reguł SKILL.md: wypisz odstępstwa.
4. Długie myślniki (pauza, półpauza) i proste albo mieszane cudzysłowy w SKILL.md, wpis.md, references.

Oceniaj krytycznie, ale nie podnoś do rangi blokera rzeczy kosmetycznych. Na koniec lista z wagą (BLOKER / WAŻNE / KOSMETYKA) i ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
