Jesteś sędzią QA (tylko odczyt) skilla `promocja-omnibus` (Prawo), cykl 3, zakres wąski. Nie edytuj plików. Czytaj pliki powłoką (Get-Content -Raw -Encoding UTF8), katalog bieżący to katalog-skilli, cytuj plik:linia, po polsku, zwięźle.

Twój werdykt z cyklu 2: testy/promocja-omnibus/codex-c2.txt (lista do wydania na dole; przeczytaj tylko ostatnie 40 linii, nie przepisuj go). Po nim naniesiono poprawki w skille/promocja-omnibus/scripts/obnizka.py, SKILL.md, references/zasady.md, wpis.md (zobacz `git diff` i bieżące pliki; skill jest nowy, więc porównuj z treścią). Retesty na WERSJI KOŃCOWEJ (zapisane po poprawkach): testy/promocja-omnibus/retest3-A-B1-B2.md i retest3-C.md (C to właściwy scenariusz z pliku scenariuszy: newsletter, kurtka Ola). Pomiar wyzwalania po zmianie opisu: testy/wyzwalanie/promocja-omnibus-wynik.log.

Zadania:
1. Każdy punkt listy do wydania z cyklu 2: NAPRAWIONE / NIE / CZĘŚCIOWO z plik:linia.
2. Skrypt: `python -X utf8 skille/promocja-omnibus/scripts/obnizka.py --selftest` i przypadki, które w cyklu 2 dawały zły wynik (procent abc/NaN/-20/120, oferowanie od dnia obniżki, historia sprzed rozpoczęcia sprzedaży, --obnizka bez --historia).
3. Retesty cyklu 3 względem asercji scenariuszy i reguł SKILL.md (zwłaszcza zakaz orzekania, odmowy, dane osobowe, brak dopisanych danych w wywołaniach skryptu).
4. Nowe sprzeczności po poprawkach i długie myślniki.

Kosmetyki nie podnoś do blokera. Na koniec lista z wagą i ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
