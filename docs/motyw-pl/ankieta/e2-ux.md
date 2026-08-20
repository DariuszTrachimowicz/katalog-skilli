# E2 (UX / projekt kwestionariusza): trafnosc doboru

Soczewka: czy pytania maja sygnaly odrozniajace nisze platnych od ogolu i czy scoring darmowych w ogole dziala tak, jak mysli wlasciciel.

## 1. DECYZJA: przebudowac

Ankieta jest glowna bramka mailowa lejka (zapis, double opt-in, lead w CRM z sekwencja ankieta-oferta), wiec usuniecie to utrata jedynego systematycznego zrodla zapisow bez zadnego planu zastepczego. Przebudowa jest tania: scoring to czysty JS z tagami w jednym pliku, a audyt pokazal, ze i tak wymaga naprawy niezaleznie od platnych, bo scoring robi DOKLADNE dopasowanie tekstowe tagu do pozycji z pola `szukaj` (strona.js: `s.t.reduce((a, t) => a + (punkty[t] || 0), 0)`), przez co 10 z 22 tagow przyznawanych w pytaniach nie pasuje do ZADNEGO darmowego skilla: firma, finanse, marketing, sprzedaz, tresci, biuro, pisma, komunikacja, maile, raporty. Martwe sa cale odpowiedzi: "Marketing i sprzedaz" (0 trafien w darmowych), "Maile i komunikacja" (0), "Do 10 osob" (0), a "Administracja i biuro" trafia tylko 1 skill przez "dokumenty". Nie ma pytania w calosci martwego, ale pytanie 6 (wielkosc firmy) dziala szczatkowo (tylko freelancer i kadry cos wnosza). Skoro trzeba naprawic tagi, w tym samym ruchu dokladamy czyste kotwice dla platnych.

## 2. PROJEKT rozwiazania

### Koncept

Dwa rownolegle tory scoringu w tym samym tescie. Tor darmowy zostaje jak dzis (top 6 z `daneQuizu`, platne nadal odfiltrowane). Tor platny liczy punkty WYLACZNIE po tagach-kotwicach, ktore nie wystepuja w zadnym darmowym skillu, wiec nie zaburzaja darmowego wyniku. Platny pokazuje sie tylko po przekroczeniu progu (2 punkty kotwiczne = dwie jednoznaczne deklaracje albo jedna autoidentyfikacja zawodowa), zawsze POD darmowa lista, w osobnym bloku z widoczna cena, maksymalnie jeden. Zero platnych w numerowanej liscie darmowych i w polu `wynik` wysylanym do API.

Kluczowa obserwacja z audytu tagow: kotwice sa czyste z natury. "sprzedaz" (dokladnie ten wyraz), "oferta B2B", "rzeczoznawca majatkowy", "operat szacunkowy", "polityka AI", "AI Act" wystepuja w `szukaj` wylacznie u platnych. Natomiast "finanse" u operatow to bomba z briefu: dopoki tor platny liczy po jawnej liscie kotwic (a nie po pelnym `szukaj`), ksiegowa od faktur nigdy nie zobaczy narzedzia rzeczoznawcy.

### Pytania i odpowiedzi (pelne brzmienia; zmiany wzgledem stanu obecnego)

Test rosnie z 6 do 7 pytan (limit 8 zachowany). Tagi w nawiasach; [K] = kotwica platna, nie liczy sie darmowym.

Pytanie 1. "Czym sie glownie zajmujesz?" (wiele odpowiedzi, jak dzis)
- "Prowadze wlasna firme" -> [mala firma, umowa, B2B] (bylo: firma, martwy)
- "Ksiegowosc i finanse" -> [ksiegowosc, faktury, VAT] (bylo: finanse, martwy w darmowych i grozny u platnego)
- "Kadry i rekrutacja" -> [kadry, rekrutacja] (bez zmian)
- "Marketing i sprzedaz" -> [copywriting, newsletter, sprzedaz[K]] (bylo: marketing, sprzedaz, tresci, wszystkie martwe)
- "Pracuje na wlasnej dzialalnosci" -> [freelancer, JDG, B2B] (bylo: umowa zamiast JDG; JDG pokrywa wycena-uslugi, rodo-w-malej-firmie, przygotowanie-do-ksiegowej)
- "Administracja i biuro" -> [pismo do urzedu, dokumenty, notatka] (bylo: biuro, pisma martwe)
- NOWA: "Wyceniam nieruchomosci jako rzeczoznawca majatkowy" -> [rzeczoznawca majatkowy[K], operat szacunkowy[K]]

Pytanie 2. "Co zjada Ci najwiecej czasu?" (jedna odpowiedz, jak dzis)
- "Pisanie i poprawianie dokumentow" -> [dokumenty, pismo do urzedu, prosty jezyk] (bylo: pisma, biuro martwe)
- "Przepisywanie danych miedzy plikami" -> [faktury, dane, excel] (bylo: ksiegowosc; excel pokrywa 3 skille arkuszowe)
- "Maile i komunikacja" -> [mail, e-mail, trudna rozmowa] (bylo: komunikacja, maile, oba martwe)
- "Czytanie dlugich dokumentow" -> [umowa, kontrakt, ryzyko] (bez zmian)
- NOWA: "Przygotowywanie ofert i wycen dla klientow" -> [oferta handlowa, wycena, oferta B2B[K]]

Pytania 3, 4, 5: brzmienia bez zmian. Korekta tagow w pytaniu 4:
- "Tak, duzo" -> [faktury, ksiegowosc, biuro rachunkowe] (bylo: finanse)
- "Kilka w miesiacu" -> [faktury, faktura] (bylo: finanse)

Pytanie 6. "Jak duza jest Twoja firma?" (brzmienie bez zmian)
- "Pracuje sam" -> [freelancer, JDG] (bylo: firma martwy)
- "Do 10 osob" -> [mala firma] (bylo: firma, odpowiedz w calosci martwa)
- "11-50 osob" -> [mala firma, kadry]
- "Wiecej niz 50" -> [kadry, raport miesieczny] (bylo: raporty martwy)

Pytanie 7 (NOWE, ostatnie). "Czy w Twojej firmie pracujecie z AI, na przyklad z Claude albo ChatGPT?" Podpowiedz: "Chodzi o realne uzycie w pracy, nie prywatne testy."
- "Tak, regularnie, i chce uporzadkowac zasady albo przygotowac firme pod AI Act" -> [polityka AI[K], AI Act[K]]
- "Tak, ale bez spisanych zasad" -> [polityka AI[K]]
- "Nie albo sporadycznie" -> []

### Regula doboru platnych

W build.mjs osobna stala `PREMIUM` (obok `daneQuizu`): tylko platne, kazdy z polami id, n (nazwa), o (skrot), cena, trial (true/false), kotwice, prog. Kotwice jawnie z nowego pola `kotwice:` we front matter wpis.md platnych, NIE z pola `szukaj` (to zamyka pulapke "finanse"):
- operaty-szacunkowe: kotwice [rzeczoznawca majatkowy, operat szacunkowy], prog 2 (spelnia go wylacznie autoidentyfikacja z pytania 1, ktora daje oba tagi naraz)
- polityka-ai: kotwice [polityka AI, AI Act], prog 2 (spelnia go wylacznie mocna odpowiedz z pytania 7; odpowiedz "bez spisanych zasad" daje 1 punkt i NIE wystarcza)
- oferta-behawioralna: kotwice [sprzedaz, oferta B2B], prog 2 (wymaga DWOCH sygnalow: "Marketing i sprzedaz" w pytaniu 1 ORAZ "Przygotowywanie ofert" w pytaniu 2; samo jedno z nich nie wystarcza, wiec zwykly sprzedawca dostanie darmowa oferte-handlowa, a platna zobaczy tylko ktos, kto zyje z ofert)

W pokazWynik: policz punkty kotwiczne dla kazdej pozycji PREMIUM, odrzuc ponizej progu, pokaz najwyzej JEDNA (najwyzszy wynik). Punkty kotwiczne nie wchodza do rankingu darmowych, tagi darmowe nie wchodza do progu platnych.

### Prezentacja w wyniku (uklad i teksty)

Blok premium renderuje sie w lewej kolumnie result-grid, POD lista rlist, wizualnie odrozniony (obwodka, bez numeru z sekwencji 01-06). Teksty:

Naglowek bloku: "Dopasowanie premium"
Wstep: "Poza darmowym zestawem Twoje odpowiedzi wskazuja na jedna specjalizacje. Mamy do niej platny skill:"
Karta: nazwa skilla, skrot (pole o), wyrazna etykieta ceny ("od 890 zl netto" / "od 490 zl"), przycisk "Zobacz oferte" linkujacy do /skill/{id}/.
Dopisek pod karta: "To platny skill z licencja roczna. Nie pobiera sie go jak darmowego zestawu, licencje zamawiasz na stronie oferty."
Tylko dla oferta-behawioralna dodatkowa linia: "Na stronie oferty pobierzesz najpierw bezplatna wersje trial."

Gdy prog nieosiagniety, blok w ogole sie nie renderuje i wynik wyglada dokladnie jak dzis.

### Zmiany w mailu z zestawem (zapisy.mjs)

Pole `wynik` w POST /api/zapis zostaje bez zmian (tylko darmowe id). Frontend dosyla NOWE, opcjonalne pole `premium` (jedno id albo brak); serwer waliduje je po liscie platnych ze skille.json i ignoruje wartosci spoza niej. W mailZZestawem, PO numerowanej liscie darmowych, osobna sekcja (brzmienie dla pozycji platnej):

"Dopasowanie premium (platny skill):
{Nazwa} ({cena}) - {skrot}.
To platny skill z licencja roczna. Nie pobiera sie go jak pozycji powyzej, szczegoly i zamowienie: https://skille.aixperts.pl/skill/{id}/"

Dla oferta-behawioralna dodatkowe zdanie: "Mozesz najpierw bezplatnie pobrac wersje trial na stronie oferty."

Dzieki temu platny NIGDY nie przechodzi przez galaz z dopiskiem "(w przygotowaniu)" ani przez instrukcje pobrania paczki, bo nie ma go w `wynik`.

### Zmiany danych

- build.mjs: `daneQuizu` bez zmian (filtr platnych zostaje); nowa stala `PREMIUM` wstrzykiwana do skryptu strony obok SKILLE.
- wpis.md platnych: nowe pole front matter `kotwice:` (lista jak `szukaj`).
- public/dane/skille.json: dopisac pole `cena` przy pozycjach platnych (do sekcji premium w mailu); `gotowy` i `platny` bez zmian.
- strona.js: nowa tablica PYTANIA (wyzej), scoring kotwic i blok premium w pokazWynik, pole `premium` w wyslij().
- zapisy.mjs: walidacja `premium`, sekcja premium w mailZZestawem.
- Umami: do zdarzenia wynik-testu dodac pole `premium: id albo "brak"` (bez tresci odpowiedzi), zeby zmierzyc, jak czesto prog w ogole pada.

## 3. RYZYKA i jak je zamykam

1. Platny pokazuje sie zbyt czesto i podwaza zaufanie do "darmowego testu". Zamkniecie: kotwice wystepuja wylacznie w odpowiedziach jednoznacznych (autoidentyfikacja zawodowa, deklaracja pracy z AI, podwojny sygnal sprzedazowy), prog 2, maksymalnie jedna pozycja, zawsze pod darmowa lista; monitoring czestosci przez pole premium w Umami.
2. Regres lejka (zapis, double opt-in, CRM). Zamkniecie: kontrakt pola `wynik` nietkniety, `premium` jest opcjonalne i walidowane, brak pola dziala jak dzis; wdrozenie testowane na pelnej sciezce zapis-potwierdzenie-mail przed publikacja.
3. Naprawa martwych tagow zmienia rozklad darmowych wynikow (ktos moze dostac inny zestaw niz wczoraj). Zamkniecie: przed wdrozeniem przejsc scoring na personach (ksiegowa, freelancer, kadrowa, sprzedawca, rzeczoznawca, wlasciciel z AI) i sprawdzic, ze top 6 jest sensowne; to zmiana na lepsze, bo dzis czesc odpowiedzi nie robi nic.
4. Pytanie 7 o AI wydluza test i moze obnizyc ukonczenia. Zamkniecie: pytanie ostatnie, trzy krotkie odpowiedzi, limit 8 niezlamany (7); porownac liczbe zdarzen wynik-testu przed i po wdrozeniu.
5. Falszywy komunikat przy platnym w mailu (dopisek "(w przygotowaniu)", instrukcja pobrania). Zamkniecie: platny nie wchodzi do `wynik` ani do numerowanej listy, ma wylacznie wlasna sekcje z cena i linkiem do oferty; trial wymieniony tylko przy oferta-behawioralna.

## 4. Czego NIE ruszac

- Copy zgody i RODO przy zapisie (consent pod formularzem) - zostaje co do znaku.
- Przeplyw double opt-in, endpoint /api/zapis i struktura pola `wynik`.
- Integracja z CRM i sekwencja ankieta-oferta.
- Mechanizm dokladnego dopasowania tagow w scoringu (naprawiamy tagi, nie silnik; zadnego dopasowania czesciowego).
- Filtr platnych w `daneQuizu` (platne nadal poza torem darmowym).
- Nazwy zdarzen Umami (wynik-testu, zapis) - tylko dodatkowe pole, zadnych zmian nazw.
- Budowa paczek .skill i galaz pobierania darmowych.
- Brzmienia pytan 3, 4, 5 i 6 (poza korektami tagow opisanymi wyzej).
