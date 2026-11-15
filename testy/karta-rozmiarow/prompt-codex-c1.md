Jesteś sędzią QA (tylko odczyt) nowego skilla `karta-rozmiarow` (kategoria Marketing) w darmowym katalogu skilli po polsku. Nie edytuj plików. Czytaj pliki powłoką (Get-Content -Raw -Encoding UTF8), katalog bieżący to katalog-skilli, cytuj plik:linia, po polsku, zwięźle, nie chwal, szukaj dziur.

Pliki: skille/karta-rozmiarow/SKILL.md, references/pomiary.md (rejestr źródeł, research 15.11.2026), scripts/tabela_rozmiarow.py, wpis.md (publiczna karta), STANDARD.md (reguły twarde), testy/wyniki-gemini/scenariusze/karta-rozmiarow.md, testy/wyzwalanie/karta-rozmiarow.md, testy na ślepo: testy/karta-rozmiarow/skill-A-B1-B2.md i skill-C.md (część uwag z nich już naniesiono w SKILL.md i skrypcie), baza bez skilla: testy/karta-rozmiarow/baza-bez-skilla-A.md.

Sprawdź:
1. Reguła źródła: czy żadna liczba, przeliczenie (UK, US, literowe), tolerancja, zapas na buty ani rada o doborze nie może trafić do karty bez danych producenta; czy odmowa jest przy każdej prośbie jednym zdaniem; czy instrukcje pomiaru nie wychodzą poza references i poza wymiary z tabeli.
2. Merytoryka: czy references/pomiary.md oddaje źródła wiernie, czy SKILL.md i wpis.md nie twierdzą więcej niż references (normy, brak urzędowych przeliczeń, obuwie, staniki, dzieci).
3. Skrypt: uruchom `python -X utf8 skille/karta-rozmiarow/scripts/tabela_rozmiarow.py --selftest` i własne pliki CSV (zakresy, wspólne granice, nakładki, luki, malejące wartości, puste pola, rozmiary literowe, przecinki dziesiętne, kolumny w mm z --na-cm, średnik i przecinek jako separator, kolumna tekstowa, BOM). Wskaż fałszywe alarmy i przepuszczone błędy.
4. Terytorium: opis (description) wobec opisy-produktow, oferta-allegro, reklamacja-i-rekojmia, promocja-omnibus, porzadkowanie-arkusza; zestaw wyzwalania (właściciele near-missów).
5. Ochrona przed poleceniami z pliku i danymi osobowymi; język (cm ze spacją, przecinek, cudzysłowy, zero pauz i półpauz, bez kalk); FAQ 4-6 pytań po 25-60 słów.

Na koniec lista znalezisk z wagą (BLOKER / WAŻNE / KOSMETYKA), każde z plik:linia i proponowaną zmianą, i ostatnia linia dokładnie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
