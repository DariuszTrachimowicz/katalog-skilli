Jesteś sędzią QA (tylko odczyt) skilla `karta-rozmiarow`, cykl 3. Nie edytuj plików. Czytaj pliki powłoką (Get-Content -Raw -Encoding UTF8), katalog bieżący to katalog-skilli, cytuj plik:linia, po polsku, zwięźle.

Twój werdykt z cyklu 2: testy/karta-rozmiarow/codex-c2.txt (przeczytaj tylko ostatnie 60 linii, nie przepisuj go). Po nim naniesiono poprawki w skille/karta-rozmiarow/SKILL.md, references/pomiary.md, scripts/tabela_rozmiarow.py (przepisany), wpis.md, testy/wyniki-gemini/scenariusze/karta-rozmiarow.md, testy/wyzwalanie/karta-rozmiarow.md. Retesty cyklu 2 (zachowanie modelu, poprawki cyklu 2 dotyczyły głównie skryptu): testy/karta-rozmiarow/retest-A-B1-B2.md i retest-C.md. Pomiar wyzwalania: testy/wyzwalanie/karta-rozmiarow-wynik.log (jeśli brak linii „Wynik:”, napisz, że go nie oceniasz).

Zadania:
1. Każde znalezisko z cyklu 2 (lista końcowa): NAPRAWIONE / NIE / CZĘŚCIOWO z plik:linia.
2. Skrypt: `python -X utf8 skille/karta-rozmiarow/scripts/tabela_rozmiarow.py --selftest` i własne pliki CSV, w tym przypadki z cyklu 1 (średnik z przecinkami dziesiętnymi, nadmiarowe pola, przerwy 80-84 i 85-89, ujemne i zero, NaN, pusty rozmiar, kolejność M przed S, kolumna literowa od producenta, --na-cm). Wskaż fałszywe alarmy i przepuszczone błędy.
3. Retesty względem asercji scenariuszy i reguł SKILL.md.
4. Nowe sprzeczności po poprawkach, długie myślniki.

Kosmetyki nie podnoś do blokera. Na koniec lista z wagą i ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
