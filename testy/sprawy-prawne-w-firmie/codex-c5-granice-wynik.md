1. **WAŻNE** · [narzedzia/sprawdz-cytaty.py:18](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/narzedzia/sprawdz-cytaty.py:18>): walidator sprawdza tylko pierwszy numer listy lub zakresu, więc próba z `KC art. 118, 999999`, `KP art. 25 § 2-999999` i `PU art. 11 ust. 4 i 999999` zwróciła zero błędów; rozszerz rozpoznawanie kolejnych numerów i dodaj test regresyjny.

2. **WAŻNE** · [SKILL.md:3](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/SKILL.md:3>): opis przyznaje temu skillowi pierwszeństwo przy piśmie firmowym, lecz [test wyzwalania:21](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/testy/wyzwalanie/sprawy-prawne-w-firmie.md:21>) przypisuje prosty monit do `windykacja-miekka`; dopisz w opisie ten wyjątek, aby granica odpowiadała testowanemu podziałowi.

W poprawkach cyklu 4 nie znalazłem nowego blokera w przypisanej roli.

Nie uruchamiałem scenariuszy na modelu; pełny test Node ograniczył błąd `EPERM`, natomiast osobny walidator Python sprawdził 1665 cytowań bez zgłoszonych błędów, z luką opisaną wyżej.

**BLOKERY DO WYDANIA: NIE**

