# Nanoszenie wyników panelu (6 XI 2026)

Materiał: 12 raportów ekspertów (`ekspert-*.md` Claude, `codex-ekspert-*.md` Codex) i 6 raportów sędziów (`sedzia-*.md` Claude, `codex-sedzia-*.md` Codex) w tym katalogu. Zasady stylu i źródeł: `BRIEF.md`.

## Reguła decyzji dla każdej propozycji (ID ekspertów: E1-..E6-, C1-..C6-)

1. Policz werdykty 6 sędziów. NANIEŚ, gdy co najmniej 4 z 6 sędziów przyjęło (bez zmian albo ze zmianą). POMIŃ, gdy co najmniej 3 odrzuciło. Przy 3 do 3 rozstrzygasz sam po sprawdzeniu przepisu w pliku aktu i zapisujesz uzasadnienie.
2. Tekst: jeśli którykolwiek sędzia przyjął ze zmianą, bierzesz wersję zmienioną; przy kilku różnych wersjach wybierasz najostrożniejszą (ograniczenia i zastrzeżenia sędziego granic mają pierwszeństwo), a przy dublach Claude i Codex wstawiasz jeden tekst (bazowy wskazany przez sędziów).
3. Każdy przepis przed wstawieniem sprawdzasz w pliku aktu (`references/akty/<SKRÓT>.md`, wzorzec `^[\[<]?Art\. N\.`). Akt niewbudowany: pełna nazwa aktu bez skrótu przed „art.” i [WYMAGA WERYFIKACJI: gdzie], chyba że sam otworzysz oficjalny tekst (isap.sejm.gov.pl, api.sejm.gov.pl, dziennikustaw.gov.pl, gov.pl) i podasz adres. Orzeczenie nieotwarte w pełni: „do potwierdzenia”.
4. Styl modułów: reguła po skutku jednym-dwoma zdaniami + podstawa „KC art. 554” (skrót z `akty/SPIS.md` przy KAŻDEJ podstawie, także w listach: „KC art. 527, KC art. 534”), zero pauz i półpauz (także w zakresach: „8-16”), procenty ze spacją, po polsku. Pisma do sądu, wnioski o interpretację, odwołania do sądu od decyzji, umowy, uchwały, pełnomocnictwa, zawiadomienia o przestępstwie, zgłoszenia do organów w sprawach spornych: poziom B. Nie dopisuj nic, co przesądza wynik albo podaje szanse.
5. Nie rozdmuchuj: reguła ma pomóc w typowej sprawie firmy; szczegóły rzadkie pomijaj albo skracaj do jednego zdania z sygnałem „tylko prawnik”.

## Po zmianach (każdy agent)

- Z katalogu `C:/Users/CP24/AiXperts - projekty/katalog-skilli`: `PYTHONUTF8=1 python narzedzia/sprawdz-cytaty.py <twoje pliki>` (0 błędnych) i brak pauz (`LC_ALL=C grep -c "$(printf '\xe2\x80\x94')\|$(printf '\xe2\x80\x93')" <pliki>`).
- Rejestr: `naniesienie-<obszar>.md` w tym katalogu, jedna linia na ID: NANIESIONE / NANIESIONE ZE ZMIANĄ / POMINIĘTE, liczba głosów sędziów (np. 5/6), co zmieniono albo dlaczego pominięto.
- Propozycje dotyczące plików spoza twojego zakresu tylko wypisz w rejestrze w sekcji „Dla innych obszarów”.
