Jesteś sędzią QA (tylko odczyt) skilla `karta-rozmiarow`, cykl 5, zakres wąski. Nie edytuj plików. Czytaj pliki powłoką (Get-Content -Raw -Encoding UTF8), katalog bieżący to katalog-skilli, cytuj plik:linia, po polsku, zwięźle.

Twój werdykt z cyklu 4: testy/karta-rozmiarow/codex-c4.txt (przeczytaj tylko ostatnie 25 linii, nie przepisuj go). Po nim w skille/karta-rozmiarow/scripts/tabela_rozmiarow.py: ucieczka znaku | także w kolumnie rozmiarów i nagłówkach, błędy arkusza w kolumnie rozmiarów jako złe dane, siatka stanikowa (rozmiary typu 70A) bez sprawdzania wzrostu i nakładek, nierówny skok zgłaszany dopiero przy różnicy ponad 15 % (sztych butów 6,67 mm); w SKILL.md zdanie o siatce stanikowej.

Zadania:
1. Trzy punkty listy końcowej cyklu 4: NAPRAWIONE / NIE / CZĘŚCIOWO z plik:linia.
2. `python -X utf8 skille/karta-rozmiarow/scripts/tabela_rozmiarow.py --selftest` i próby na realnych tabelach producentów (damska z zakresami, męska literowa, dziecięca 98/104, staniki 70A-85D, buty w mm z --na-cm, kolumny UK i US). Zgłaszaj tylko realne błędy na danych, jakie sprzedawca wkleja z arkusza producenta; dane celowo absurdalne, które kończą się kodem 2 albo uwagą, nie są błędem.
3. Czy nowe wyjątki (siatka stanikowa, próg skoku) nie ukrywają realnych błędów w zwykłych tabelach odzieży.

Kosmetyki nie podnoś do blokera. Na koniec lista z wagą i ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
