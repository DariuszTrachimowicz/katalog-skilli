Jesteś sędzią QA (tylko odczyt) skilla `oferta-allegro`, cykl 4, zakres wąski. Nie edytuj plików. Czytaj pliki powłoką (`Get-Content -Raw -Encoding UTF8 <plik>`), cytuj plik:linia, po polsku, zwięźle.

Twój werdykt z cyklu 3: testy/oferta-allegro/codex-c3.txt (dół pliku). Sprawdź wyłącznie:
1. Bloker cyklu 3: końcowy pomiar wyzwalania w testy/wyzwalanie/oferta-allegro-wynik.log (linia „Wynik:”, zestaw 20 zapytań, 3 powtórzenia, pełne tło).
2. Ważne i kosmetyczne punkty cyklu 3, naniesione w skille/oferta-allegro/SKILL.md, scripts/tytul_allegro.py, references/zasady-allegro.md: znaki ! i @ w markach („be quiet!”), & w nazwie własnej („H&M”), wyjątek wielkich liter dla marki i modelu, skutki braku kodu bez kategoryczności i rankingów, zakaz przypisywania intencji autorom pliku, neutralne pytanie o stan, każde pole [DO UZUPEŁNIENIA] na liście braków. Uruchom `python -X utf8 skille/oferta-allegro/scripts/tytul_allegro.py --selftest` oraz własne przypadki (np. „Zasilacz be quiet! Pure Power 12 M”, „Koszulka męska H&M bawełniana”, „SUPER KURTKA!!! hit”).
3. Czy poprawki wprowadziły nową sprzeczność albo długi myślnik.

Dla każdego punktu: NAPRAWIONE / NIE / CZĘŚCIOWO z plik:linia. Odstępstwa retestów cyklu 3 (zapisanych przed tymi poprawkami) już znasz; nie powtarzaj ich, chyba że instrukcja nadal ich nie zakazuje.

Na koniec lista z wagą (BLOKER / WAŻNE / KOSMETYKA) i ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
