# Cykl 3: potwierdzenie skilla `e-doreczenia-w-firmie`

Data kontroli: 24 sierpnia 2026 r.

Zakres: pełna kontrola `SKILL.md`, `wpis.md` i
`references/procedura-firmowa.md`, ze szczególnym sprawdzeniem sześciu znalezisk
z cyklu 2 oraz regresji po poprawkach.

Kontrola techniczna jest czysta: repozytoryjny `narzedzia/walidator.mjs` nie
zgłasza błędów blokujących, a `quick_validate.py` zwraca `Skill is valid!`.
Kontrola treści została dodatkowo zestawiona z aktualnym harmonogramem na
`https://www.gov.pl/web/e-doreczenia/harmonogram` i opisem fikcji doręczenia na
`https://www.gov.pl/web/e-doreczenia/pytania-i-odpowiedzi`.

## Wynik sześciu potwierdzeń

### 1. Brak obietnicy rozstrzygnięcia, czy obowiązek dotyczy firmy

**NIEZALICZONE, BLOKER.** Główne miejsca zostały poprawione. Wprowadzenie
obiecuje ustalenie grupy harmonogramu i miejsca potwierdzenia terminu
(`skille/e-doreczenia-w-firmie/SKILL.md:16-18`), Krok 2 zabrania konkluzji
„dotyczy / nie dotyczy” (`skille/e-doreczenia-w-firmie/SKILL.md:44-49`), a
granica powtarza model: rama, wstępna grupa i miejsce potwierdzenia
(`skille/e-doreczenia-w-firmie/SKILL.md:130-132`). Tak samo brzmi skrót i główny
opis karty (`skille/e-doreczenia-w-firmie/wpis.md:8`,
`skille/e-doreczenia-w-firmie/wpis.md:20-24`). Pytania użytkownika w opisie
uruchamiania i sekcji „Kiedy się uruchamia” są przykładami wejścia, a nie
obietnicą odpowiedzi (`skille/e-doreczenia-w-firmie/SKILL.md:3`,
`skille/e-doreczenia-w-firmie/SKILL.md:28-33`).

Pozostała jednak obietnica w metadanych katalogowych: opis SEO zaczyna się od
„Czy Twoja firma musi mieć e-Doręczenia i jak je założyć krok po kroku”
(`skille/e-doreczenia-w-firmie/wpis.md:11`). W kontekście opisu zawartości karty
to zapowiedź odpowiedzi na pytanie „czy musi”, a nie zapowiedź wskazania grupy i
miejsca potwierdzenia. Jest to niespójne również z późniejszą deklaracją, że skill
nie orzeka „musisz / nie musisz” (`skille/e-doreczenia-w-firmie/wpis.md:89-95`).

### 2. Fikcja doręczenia tylko dla korespondencji od podmiotu publicznego

**NIEZALICZONE, BLOKER.** Trzy miejsca wskazane do poprawy są prawidłowe:

- Krok 5 ogranicza fikcję do korespondencji od urzędu lub podmiotu publicznego
  i nie przenosi 14 dni na korespondencję firma-firma u KDU, gdzie każe sprawdzić
  umowę (`skille/e-doreczenia-w-firmie/SKILL.md:108-115`).
- Sekcja 4 ściągi mówi wyłącznie o piśmie od urzędu
  (`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:51-56`).
- Sekcja „Jak po polsku” mówi o nieodebranych pismach od urzędu
  (`skille/e-doreczenia-w-firmie/wpis.md:58-66`).

Uogólnienie zostało jednak we wstępie `SKILL.md`. Po zdaniu obejmującym zarówno
kontakt z urzędami, jak i korespondencję z innymi firmami, tekst bez ograniczenia
stwierdza, że „pismo wysłane na ADE i nieodebrane uznaje się za doręczone”
(`skille/e-doreczenia-w-firmie/SKILL.md:10-17`). Czytelnik może więc odnieść
fikcję także do korespondencji firma-firma. To przeczy precyzyjnej regule z
Kroku 5 (`skille/e-doreczenia-w-firmie/SKILL.md:110-115`).

### 3. Reguła antyphishingowa bez kategorycznej reguły domeny

**ZALICZONE.** Sama obecność `gov.pl` niczego nie dowodzi, a adres spoza
`gov.pl` również nie przesądza o fałszerstwie. Powiadomienie KDU jedynie może
pochodzić z domeny dostawcy, a właściwy kanał należy ustalać z umowy
(`skille/e-doreczenia-w-firmie/SKILL.md:96-105`). Bezpieczna weryfikacja polega
na ręcznym wejściu do znanej skrzynki, nie na klikaniu odnośnika z wiadomości
(`skille/e-doreczenia-w-firmie/SKILL.md:103-106`). Nie znaleziono drugiej,
sprzecznej reguły domenowej w pozostałych plikach.

### 4. Rama harmonogramu i konkretne miejsce weryfikacji

**ZALICZONE.** Bezpośrednio przed ramą znajduje się znacznik
`[WYMAGA WERYFIKACJI: https://www.gov.pl/web/e-doreczenia/harmonogram]`, który
obejmuje całą następującą ramę i datę 1 października 2026 r.
(`skille/e-doreczenia-w-firmie/SKILL.md:52-60`). Wcześniej Krok 2 nakazuje taki
znacznik przy każdej dacie i regule harmonogramu
(`skille/e-doreczenia-w-firmie/SKILL.md:44-51`). Przykład Marka podaje ten sam
konkretny adres przy terminie (`skille/e-doreczenia-w-firmie/wpis.md:44-50`), a
sekcja „Na czym się wywala” ponownie kieruje dokładnie na
`gov.pl/web/e-doreczenia/harmonogram`
(`skille/e-doreczenia-w-firmie/wpis.md:75-82`).

### 5. Spójny model dostępu i alternatywa dla działalności jednoosobowej

**ZALICZONE.** Domyślny wariant to imienne dostępy bez współdzielenia danych
logowania (`skille/e-doreczenia-w-firmie/SKILL.md:82-87`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:20-28`). Dla firmy
jednoosobowej alternatywa planu zdalnego reagowania występuje spójnie:

- w sekcji 2 szablonu zamiast osoby zastępującej
  (`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:30-38`),
- w sekcji 4 zamiast drugiej osoby
  (`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:57-61`),
- na liście kontrolnej
  (`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:66-74`),
- we wskazówce dla działalności jednoosobowej
  (`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:80-85`).

Nazwy ról u KDU są jawnie pozostawione do ustalenia według umowy
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:60-61`), a dalsza
wskazówka ponownie odsyła do umowy w sprawie ról, dostępów i powiadomień
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:91-93`).

### 6. Dostęp dla biura rachunkowego

**ZALICZONE.** Ściąga wyjaśnia, że biuro nie uzyskuje dostępu automatycznie.
Jeżeli ma pomagać, imienny dostęp otrzymuje konkretna osoba z biura, korzystająca
z własnego uwierzytelnienia, w ustalonym zakresie
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:86-90`). Jest to
spójne z ogólnym zakazem współdzielenia danych logowania
(`skille/e-doreczenia-w-firmie/SKILL.md:82-87`).

## Kontrola nowych sprzeczności po poprawkach

Nie znaleziono dodatkowej regresji w regule antyphishingowej, adresie źródła,
modelu dwóch osób, alternatywie dla działalności jednoosobowej, rolach KDU ani
dostępie biura rachunkowego. Poprawki w tych czterech obszarach są wzajemnie
spójne.

Pozostały natomiast dwa rozjazdy opisane wyżej: pytanie „czy musi” w opisie SEO
oraz nieograniczona fikcja doręczenia we wstępie. Oba są szczególnie mylące,
ponieważ dalsze sekcje zawierają już poprawne granice. Czysty wynik walidatorów
technicznych ich nie wykrywa.

## Podsumowanie bramki wydania

Z sześciu potwierdzeń zaliczono cztery. Punkty 1 i 2 pozostają niezaliczone i
blokują wydanie.

WERDYKT: blokery do wydania TAK
