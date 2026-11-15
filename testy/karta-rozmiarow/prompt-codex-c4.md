Jesteś sędzią QA (tylko odczyt) skilla `karta-rozmiarow`, cykl 4, zakres wąski. Nie edytuj plików. Czytaj pliki powłoką (Get-Content -Raw -Encoding UTF8), katalog bieżący to katalog-skilli, cytuj plik:linia, po polsku, zwięźle.

Twój werdykt z cyklu 3: testy/karta-rozmiarow/codex-c3.txt (przeczytaj tylko ostatnie 30 linii, nie przepisuj go). Po nim poprawiono skille/karta-rozmiarow/scripts/tabela_rozmiarow.py (kolumny nazwane jak wymiar zawsze liczbowe, błędy arkusza #VALUE! jako złe dane, ścisły odczyt CSV i odrzucanie pól przez kilka linii, wzorzec „wygląda na liczbę” tylko dla czystych liczb, ucieczka znaku | w komórkach, kolejność sprawdzana parami znanych rozmiarów) oraz wpis.md (bez obietnic centymetrów).

Zadania:
1. Każdy punkt listy końcowej z cyklu 3: NAPRAWIONE / NIE / CZĘŚCIOWO z plik:linia.
2. Uruchom `python -X utf8 skille/karta-rozmiarow/scripts/tabela_rozmiarow.py --selftest` i przypadki z cyklu 3 oraz kilka nowych. Interesują mnie tylko realne błędy na danych, jakie sprzedawca może wkleić z arkusza producenta; nie szukaj błędów w danych celowo absurdalnych, jeśli skrypt kończy je kodem 2 albo uwagą.
3. Czy poprawki nie zepsuły poprawnych tabel: damska 34-46 z zakresami, męska S-XXL, dziecięca 98/104-134/140, staniki 70A-85D, buty 36-41 w mm z --na-cm, tabela z kolumną UK i US.

Kosmetyki nie podnoś do blokera. Na koniec lista z wagą i ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
