# E1. Architektura i kolejność sekcji stron ofert (kanon)

Data: 20 sierpnia 2026. Zakres: wyłącznie szkielet (nazwy nagłówków h3/h4, kolejność sekcji, anatomia bloków), bez przepisywania treści.

Pliki objęte:

- `C:\Users\CP24\AiXperts - projekty\katalog-skilli\skille\polityka-ai\oferta.html`
- `C:\Users\CP24\AiXperts - projekty\katalog-skilli\skille\oferta-behawioralna\oferta.html`
- `C:\Users\CP24\AiXperts - projekty\katalog-skilli\skille\operaty-szacunkowe\oferta.html`

Podstawa: SKILL.md skilla oferta-behawioralna (krok 3, kolejność czytania) oraz `references/architektura-cen.md` (sekcja 2, kolejność prezentacji cen; sekcja 4, różnicowanie pakietów).

---

## 1. Kanoniczny szkielet sekcji

Kolejność jest częścią mechanizmu: rezultat i stawka na górze, cena dopiero po zbudowaniu punktu odniesienia, odwrócenie ryzyka i obiekcje przed CTA, formalności na samym dole.

| # | Nagłówek h3 | Status | Rola behawioralna |
|---|---|---|---|
| 1 | Jak rozumiemy Twoją sytuację | obowiązkowa | problem słowami klienta (diagnoza, stan PRZED) |
| 2 | Co Cię to kosztuje bez zmian | obowiązkowa | stawka, koszt bezczynności (awersja do straty) |
| 3 | Co dostajesz | obowiązkowa | rezultat przed metodą (stan PO) |
| 4 | Co wchodzi, a czego celowo nie robi | obowiązkowa | zakres z jawną granicą (awersja do niejednoznaczności) |
| 5 | Trzy sposoby, żeby to mieć | obowiązkowa | trzy pakiety, środek wyróżniony (efekt kompromisu) |
| 6 | Dlaczego tyle | obowiązkowa | reason-why ceny |
| 7 | Dlaczego możesz temu zaufać | obowiązkowa | dowód (uczciwy, bez zmyślonych referencji) |
| 8 | Twoje ryzyko | obowiązkowa | odwrócenie ryzyka, uczciwie o zwrocie |
| 9 | Jak to przebiega w czasie | warunkowa* | harmonogram po zakupie, domyka niepewność "co po płatności" |
| 10 | Pytania, które zwykle padają | obowiązkowa | FAQ, czyli amunicja rzecznika, zbija obiekcje przed CTA |
| 11 | Najbliższy krok | obowiązkowa | jedna akcja + formalności na dole |

\* Reguła warunkowości dla sekcji 9: sekcja jest wymagana, gdy przynajmniej jeden pakiet zawiera usługę po naszej stronie (sesja robocza, wdrożenie, przegląd) albo wsparcie rozłożone w czasie (np. 30 dni pytań). Wszystkie trzy obecne oferty ten warunek spełniają, więc w praktyce sekcja jest obowiązkowa na wszystkich trzech stronach. Warunkowość zadziała dopiero przy przyszłym skillu sprzedawanym wyłącznie jako plik, bez żadnej usługi, tam sekcję można pominąć.

### Anatomia sekcji (elementy stałe)

- **Sekcja 2 (stawka):** `stawka-box` z jednym mocnym zdaniem w `stawka-duze` + akapit rozwinięcia. Stawka nie musi być kwotą, może być ryzykiem (operaty: wrogi czytelnik; polityka-ai: obowiązki wchodzące etapami), ale nagłówek zawsze ramuje ją jako koszt braku zmiany.
- **Sekcja 4 (zakres):** dwie kolumny `zakres2`, nagłówki h4 kanonicznie: **"W zestawie"** i **"Czego celowo nie robi"**. Granica zakresu jest widoczna już w nagłówku h3 (człon "czego celowo nie robi"), bo to ona chroni cenę.
- **Sekcja 5 (pakiety):** kolejność kart **od najdroższej do najtańszej**: kotwica z lewej, środek wyróżniony (`wyroz` + badge) centralnie, dół z prawej. Uzasadnienie: pierwsza czytana kolumna kotwiczy (architektura-cen.md, sekcja 2, "Kolejność prezentacji"); na mobile karty składają się w pion i kotwica ląduje pierwsza, zgodnie z regułą układu pionowego. Każda karta: nazwa, wiersz "dla kogo" (samoselekcja), cena netto + brutto dla konsumenta, lista elementów z `powod`, przycisk zakupu pakietu. Pod pakietami `pakiety-nota` z licencją; jej rozszerzenie o zastrzeżenie "wdrożenie/przegląd to praca po naszej stronie, nie porada" jest warunkowe: tylko przy pakietach z usługą.
- **Sekcja 9 (harmonogram):** oś czasu `os` 3-4 kroki: od razu (paczka) -> pierwsze użycie -> krok usługowy/wsparcie (warunkowo, przy pakietach z usługą) -> najbliższy krok. Ostatni krok osi musi wskazywać **tę samą akcję** co sekcja 11 (reguła jednego kroku).
- **Sekcja 11 (CTA):** wewnętrzny h3 "Wybierz pakiet", jeden lead, jeden przycisk "Zamawiam", pod spodem blok **Formalności** o pełnej anatomii 8 pozycji: Ceny i podatek (z cenami brutto dla konsumenta), Sprzedawca, Płatność, Licencja, Wymagania techniczne, Charakter, Prawo odstąpienia (konsument), Reklamacje.

### Pozycja FAQ i CTA (rozstrzygnięcie)

FAQ jest **przedostatnia**, CTA **ostatnia**. SKILL.md w kroku 3 stawia harmonogram+krok (pkt 10) przed FAQ (pkt 11) i formalności na końcu (pkt 12); na stronie sprzedażowej łączymy to tak, że harmonogram zostaje przed FAQ, a "Najbliższy krok" schodzi na sam dół razem z formalnościami, bo po FAQ obiekcje są zbite i czytelnik ląduje na jednej akcji bez konieczności scrollowania z powrotem. Duplikowanie CTA wyżej nie jest potrzebne: karty pakietów mają własne przyciski zakupu (to akcja "wybierz wariant", ta sama transakcja, nie drugi krok).

---

## 2. Rozstrzygnięcia nazw (dlaczego tak)

**"Co jest na stole" vs "Co Cię to kosztuje bez zmian" -> wygrywa "Co Cię to kosztuje bez zmian".** To sekcja stawki, jej mechanizmem jest awersja do straty: czytelnik ma zobaczyć koszt bezczynności, zanim zobaczy cenę. "Co Cię to kosztuje bez zmian" nazywa dokładnie ten mechanizm, w drugiej osobie, ramą straty. "Co jest na stole" jest dwuznaczne: równie dobrze czyta się jako "co oferujemy" (czyli dublet sekcji "Co dostajesz") i nie niesie ramy straty.

**Nazwa sekcji zakresu -> "Co wchodzi, a czego celowo nie robi".** Trzy kandydatury: "Pięć rzeczy, które powstają" (polityka-ai) nazywa tylko połowę sekcji i jest produktowo-specyficzna (liczba "pięć" nie przenosi się na inne skille), "Co jest w środku" (operaty) też gubi drugą połowę. Kanon musi mieć granicę zakresu w nagłówku, bo jawne "czego NIE robi" to element budujący zaufanie i chroniący cenę, a przy tych produktach (dokumentacja AI, operaty) także element ramy "strukturyzuje, nie orzeka". Nagłówki h4 kolumn: "W zestawie" / "Czego celowo nie robi" (już obecne na dwóch z trzech stron).

**"Jak to przebiega w czasie" -> wchodzi do kanonu** (status warunkowy wg reguły z sekcji 1, w praktyce: na wszystkich trzech stronach). Powód: wszystkie trzy produkty łączą treść cyfrową "od razu" z usługą umawianą później (sesja, przegląd) i to jest dokładnie miejsce niepewności kupującego ("płacę dziś, a kiedy co się dzieje?"). Oś czasu domyka tę niepewność i wzmacnia odwrócenie ryzyka. Sekcja stoi między "Twoje ryzyko" a FAQ.

**"Jak rozumiemy Waszą sytuację" -> "Jak rozumiemy Twoją sytuację".** Dwie z trzech stron już mają liczbę pojedynczą, a pozostałe nagłówki kanonu są w drugiej osobie pojedynczej ("Co dostajesz", "Twoje ryzyko", "Co Cię to kosztuje bez zmian"). Ujednolicamy nagłówek; treść sekcji na polityka-ai może dalej mówić o firmie w liczbie mnogiej, to poziom treści, nie szkieletu.

**Bez zmian (już identyczne na wszystkich trzech):** "Co dostajesz", "Trzy sposoby, żeby to mieć", "Dlaczego tyle", "Dlaczego możesz temu zaufać", "Twoje ryzyko", "Pytania, które zwykle padają", "Najbliższy krok", wewnętrzne "Wybierz pakiet".

---

## 3. Zmiany do wykonania per strona

### polityka-ai/oferta.html

1. **Przemianuj** h3 "Jak rozumiemy Waszą sytuację" -> "Jak rozumiemy Twoją sytuację" (treść bez zmian).
2. **Przemianuj** h3 "Co jest na stole" -> "Co Cię to kosztuje bez zmian" (treść bez zmian).
3. **Przemianuj** h3 "Pięć rzeczy, które powstają" -> "Co wchodzi, a czego celowo nie robi"; liczbę "pięć dokumentów" zostawić w treści (już jest w sekcji "Co dostajesz"), h4 kolumn już kanoniczne.
4. **Przestaw karty pakietów** na kolejność od najdroższej: "System + przegląd Waszej dokumentacji" (2 900 zł) z lewej, "System + wdrożenie z nami" (1 490 zł, wyróżniony) w środku, "Sam system" (890 zł) z prawej. Sama zawartość kart bez zmian.
5. **Dodaj sekcję** "Jak to przebiega w czasie" między "Twoje ryzyko" a FAQ, na wzór osi z oferta-behawioralna: od razu (paczka z kluczem) -> budujesz dokumentację w swoim narzędziu -> sesja robocza / przegląd (krok warunkowy, opisany jako "przy pakietach z wdrożeniem/przeglądem") -> najbliższy krok wskazujący formularz zamówienia.

### oferta-behawioralna/oferta.html (najbliższa kanonowi, wzorzec kolejności)

1. **Przemianuj** h4 w sekcji zakresu: "W zakresie" -> "W zestawie", "Poza zakresem" -> "Czego celowo nie robi" (h3 tej sekcji już kanoniczny).
2. **Popraw ostatni krok osi czasu** w "Jak to przebiega w czasie": obecnie każe napisać maila "chcę [pakiet]", a sekcja "Najbliższy krok" prowadzi do formularza zamówienia online. To dwie różne akcje, czyli złamana reguła jednego kroku; krok osi ma wskazywać ten sam formularz.
3. **Uzupełnij anatomię cen i formalności do kanonu:** w `pakiet-cena-sub` dodaj ceny brutto dla konsumenta (pozostałe dwie strony je mają, wymóg informacyjny B2C), a blok Formalności rozszerz z 5 do 8 pozycji (brakuje: Wymagania techniczne, Charakter, Reklamacje) i ujednolić brzmienie pozycji "Prawo odstąpienia" z wersją używaną na polityka-ai i operaty (obecna wersja "po pobraniu nie podlega zwrotowi" jest skrótowa i mniej bezpieczna prawnie niż kanoniczna, opisująca warunki wygaśnięcia prawa).
4. **Kolejność sekcji i kolejność kart pakietów: bez zmian** (już zgodne z kanonem: kotwica 1 990 zł z lewej, środek 990 zł wyróżniony, dół 490 zł z prawej).

### operaty-szacunkowe/oferta.html

1. **Przemianuj** h3 "Co jest na stole" -> "Co Cię to kosztuje bez zmian" (treść, w tym "Operat czyta wrogi czytelnik", bez zmian).
2. **Przemianuj** h3 "Co jest w środku" -> "Co wchodzi, a czego celowo nie robi" (h4 kolumn już kanoniczne).
3. **Przestaw karty pakietów** na kolejność od najdroższej: "System + warsztatowy przegląd Twojej wyceny" (2 900 zł) z lewej, "System + wdrożenie z nami" (1 490 zł, wyróżniony) w środku, "Sam system" (890 zł) z prawej.
4. **Dodaj sekcję** "Jak to przebiega w czasie" między "Twoje ryzyko" a FAQ: od razu (paczka z kluczem) -> pierwsze uruchomienie (instalacja Pythona wg instrukcji, pokazowa wycena) -> sesja robocza / przegląd (krok warunkowy przy pakietach z usługą) -> najbliższy krok wskazujący formularz zamówienia.

---

## 4. Co celowo zostaje różne (treść, nie szkielet)

- Ceny i nazwy pakietów (różne produkty, różne widełki; oferta-behawioralna ma inny układ ról pakietów: audyt jako góra).
- Rodzaj dowodu w "Dlaczego możesz temu zaufać" (kafle 11->0 vs pokazowa wycena vs osoba prowadzącego). Kanon wymaga sekcji, nie formy dowodu.
- Treść stawki (kwota vs ryzyko) i wszystkie akapity merytoryczne.
- Zestaw pytań FAQ (wspólny jest tylko wpis o działaniu w Claude/ChatGPT).
