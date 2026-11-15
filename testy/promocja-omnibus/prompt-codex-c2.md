Jesteś sędzią QA (tylko odczyt) skilla `promocja-omnibus` (kategoria Prawo), cykl 2. Nie edytuj plików. Czytaj pliki powłoką (Get-Content -Raw -Encoding UTF8), katalog bieżący to katalog-skilli, cytuj plik:linia, po polsku, zwięźle.

W cyklu 1 panel w czterech rolach zgłosił znaleziska: testy/promocja-omnibus/codex-c1-granice.txt, codex-c1-ekspert.txt, codex-c1-jezyk.txt, codex-c1-behawior.txt (końcowe listy na dole każdego pliku). Naniesiono poprawki w: skille/promocja-omnibus/SKILL.md, references/zasady.md, scripts/obnizka.py (przepisany), wpis.md; skille/regulamin-sklepu-checklista/SKILL.md (opis); skille/sprawy-prawne-w-firmie (kopia w references/katalog/promocja-omnibus, mapa-spraw.md, wersja w wpis.md); testy/wyniki-gemini/scenariusze/promocja-omnibus.md; testy/wyzwalanie/promocja-omnibus.md. Zobacz `git diff` i nowe pliki.

Zadania:
1. Dla KAŻDEGO znaleziska z czterech plików cyklu 1: NAPRAWIONE / NIE / CZĘŚCIOWO z plik:linia.
2. Skrypt: uruchom `python -X utf8 skille/promocja-omnibus/scripts/obnizka.py --selftest` i własne przypadki (zaokrąglenia w obie strony, brzegi okna, niepełna historia z --oferowany-od i bez, towar szybko psujący się z --przed-pierwsza, złe dane). Wskaż każdy błędny wynik.
3. Nowe sprzeczności po poprawkach (SKILL.md wewnętrznie, z references, z wpis.md, z opisem regulamin-sklepu-checklista), reguły STANDARD.md 1-8, długie myślniki, procenty bez spacji w treści skilla.
4. Jeśli istnieją pliki testy/promocja-omnibus/retest-*.md (testy na ślepo na nowej wersji), oceń je względem asercji scenariuszy i reguł SKILL.md.

Oceniaj krytycznie, ale nie podnoś kosmetyki do blokera. Na koniec lista z wagą (BLOKER / WAŻNE / KOSMETYKA) i ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
