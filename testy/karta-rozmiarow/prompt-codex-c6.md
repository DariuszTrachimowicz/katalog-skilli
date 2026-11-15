Jesteś sędzią QA (tylko odczyt) skilla `karta-rozmiarow`, cykl 6, zakres bardzo wąski. Nie edytuj plików. Czytaj pliki powłoką (Get-Content -Raw -Encoding UTF8), katalog bieżący to katalog-skilli, cytuj plik:linia, po polsku, zwięźle.

Twój werdykt z cyklu 5: testy/karta-rozmiarow/codex-c5.txt (ostatnie 20 linii, nie przepisuj). Jedyny bloker: oznaczenia odzieży 34R, 36S brane za siatkę stanikową. Poprawka: skille/karta-rozmiarow/scripts/tabela_rozmiarow.py, funkcja siatka_stanikowa wymaga nagłówka z obwodem pod biustem, miseczką, stanikiem albo biustonoszem oraz rozmiarów z literami A-K; zdanie w SKILL.md.

Zadania: 1) bloker cyklu 5: NAPRAWIONE / NIE; 2) `python -X utf8 skille/karta-rozmiarow/scripts/tabela_rozmiarow.py --selftest`; 3) czy poprawka nie psuje realnych tabel biustonoszy (70A-85D z kolumną obwodu pod biustem) ani zwykłej odzieży; zgłaszaj tylko realne błędy na danych z arkuszy producentów.

Na koniec ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
