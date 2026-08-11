---
nazwa: Co mówi arkusz
kategoria: Dane
status: gotowy
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Czyta zestawienie z Excela i mówi po ludzku, co z niego wynika — bez formuł i tabel przestawnych, z wyraźnym podziałem na fakty i domysły.
szukaj: excel, arkusz, csv, analiza danych, zestawienie sprzedaży, zestawienie z Optimy, rejestr sprzedaży, wyciąg, co wynika z danych, spadek sprzedaży, Subiekt, trend
tytulSeo: Co wynika z tego zestawienia — analiza arkusza Excel po polsku
opisSeo: Wrzuć zestawienie z Excela i zobacz, co z niego wynika — kierunki, wartości do sprawdzenia. Oddziela fakty od domysłów. Po polsku, na Twoim planie Claude.
zgodnosc:
  claude: ok
  gpt: format
  gemini: brak
---

## Co robi

Czyta arkusz z danymi — sprzedaż, koszty, rejestr faktur, zestawienie z systemu księgowego — i mówi prostym językiem, co z niego wynika. Pokazuje kierunki, wartości, które się wyróżniają, i rzeczy warte sprawdzenia.

Każdą pozycję oznacza jednym z trzech znaczników: **[DANE]** to coś, co widać w komórkach; **[HIPOTEZA]** to możliwe wyjaśnienie, którego plik nie potwierdza; **[SPRAWDŹ]** to coś, co może psuć liczby. Dzięki temu nie da się pomylić ustalenia z domysłem — a to jest jedyny prawdziwy problem przy czytaniu danych przez model.

Nie buduje formuł, nie robi tabel przestawnych i nie rysuje wykresów.

## Dla kogo

Właściciele firm i kierownicy, którzy co miesiąc dostają zestawienie z księgowości albo z systemu sprzedażowego i odkładają je na później. Kierownicy sprzedaży, którzy mają raport z Optimy i pięć minut przed spotkaniem. Osoby prowadzące biuro, które muszą powiedzieć zarządowi, co się w tych liczbach dzieje.

Nie trzeba znać Excela. Trzeba mieć plik.

## Ile Ci to oszczędza

Rozebranie zestawienia na tyle, żeby coś z niego wynikało, zajmuje zwykle 1–2 godziny i wymaga umiejętności, których większość odbiorców tych plików nie ma. Efekt bywa taki, że plik leży nieotwarty do następnego miesiąca.

Zamiast tego dostajesz listę konkretnych punktów z liczbami i wskazanie, których wniosków dane po prostu nie unoszą — w czasie jednej rozmowy.

## Przykład z życia

Marek prowadzi hurtownię materiałów budowlanych. Dostaje z Optimy zestawienie sprzedaży za styczeń–lipiec 2026, 4 200 wierszy. Widzi, że w lipcu wyszło 312 000 zł wobec 268 000 zł w czerwcu, i zaczyna planować rozbudowę magazynu.

Skill pokazuje trzy rzeczy, wszystkie liczone na jednej podstawie — na dzień roboczy.

Lipiec ma 23 dni robocze, czerwiec 21. Po przeliczeniu to 13 565 zł na dzień wobec 12 762 zł, czyli wzrost o 6%, nie o 16%.

Jedna faktura dla jednego klienta to 41 000 zł — więcej niż cały wzrost, jaki po tej poprawce zostaje (803 zł na dzień × 23 dni to około 18 500 zł). Bez tej faktury lipiec to 271 000 zł, czyli 11 783 zł na dzień roboczy wobec 12 762 zł w czerwcu — po korekcie kalendarzowej lipiec jest nie wyżej, tylko o 8% niżej niż czerwiec.

A w całym pliku, od stycznia do lipca, jest 38 wierszy z kwotami ujemnymi na łącznie 24 300 zł — korekty, których podsumowanie Marka w ogóle nie odejmowało. Na sam lipiec przypada z nich 6 100 zł, więc lipcowe 312 000 zł stopnieje jeszcze bardziej, gdy je uwzględnić.

Skill nie mówi Markowi, żeby nie rozbudowywał magazynu. Mówi, na czym naprawdę stoi liczba, którą podjąłby tę decyzję, i pyta, czy ta jedna duża faktura była zdarzeniem jednorazowym.

## Jak po polsku

Cała wartość siedzi w tym, że skill zna polskie zestawienia, a nie tabelki z anglojęzycznego poradnika.

Rozpoznaje przecinek dziesiętny i spację w tysiącach — łącznie ze spacją nierozdzielającą, przez którą kolumna z kwotami cicho przestaje się sumować. Wie, że `03.04.2026` to 3 kwietnia, a nie 4 marca. Zna nagłówki z Optimy, Subiekta, WAPRO, Symfonii i wFirmy: różnicę między datą wystawienia a datą sprzedaży, między netto a brutto, między marżą a narzutem, między stroną Wn a Ma. Wie, że wiersz „Razem dla kontrahenta” w środku danych podwaja wynik, a faktura zaliczkowa policzona razem z końcową liczy tę samą sprzedaż dwa razy.

Zna też polski kalendarz. Lipiec 2026 ma 23 dni robocze, a styczeń, luty, maj, sierpień, listopad i grudzień po 20 — porównanie miesiąc do miesiąca bez tej poprawki myli o kilkanaście procent. Marzec do lutego wygląda na wzrost o 10%, choć różnią się wyłącznie liczbą dni. W handlu detalicznym dokłada niedziele handlowe: luty, maj, lipiec, wrzesień, październik i listopad nie mają w 2026 ani jednej, a grudzień ma trzy pod rząd.

W zestawieniach z 2026 roku rozpoznaje kolumnę z numerem z Krajowego Systemu e-Faktur (KSeF) — po myślnikach i literach, nie po długości — i wie, że wiersze bez niego z początku roku to nie luka w danych.

## Czego potrzebujesz

Dowolny płatny plan Claude i plik w formacie xlsx, csv albo tabela wklejona jako tekst. Żadnych konektorów.

Na starcie skill zada Ci kilka pytań — skąd jest plik, jaki okres obejmuje, czy ostatni miesiąc jest zamknięty i o którą kolumnę Ci chodzi, gdy netto i brutto stoją obok siebie. To nie jest konfiguracja, tylko rozmowa: bez tych odpowiedzi też policzy, ale wypisze na górze, na jakich założeniach pracował.

## Na czym się wywala

- **Plik z wieloma arkuszami i formułami między nimi.** Widzi wartości, nie logikę, która je wylicza. Jeśli kluczowa kolumna bierze się z odwołania do innego skoroszytu, którego nie ma, powie „nie widzę źródła tej liczby” — i tyle da się z tym zrobić.
- **Bardzo duże pliki.** Przy kilkudziesięciu tysiącach wierszy pracuje na podsumowaniach i próbkach, nie na każdym wierszu. Powie o tym wprost, ale pojedyncza anomalia w środku dużego zbioru może mu umknąć.
- **Zestawienie bez kontekstu.** Danych o kosztach zakupu, o zmianach cennika i o tym, co się w firmie działo, w arkuszu nie ma. Skill nie zgadnie przyczyn i celowo tego nie robi — więc na pytanie „dlaczego spadło” odpowie hipotezami do sprawdzenia, nie wyjaśnieniem.
- **Krótkie szeregi.** Przy trzech czy czterech miesiącach nie użyje słowa „trend”. To bywa frustrujące, ale trend z czterech punktów to zgadywanie z ładnym wykresem.
- **Wydruki i skany.** Tabela ze zdjęcia albo z PDF-u przeznaczonego do druku, ze scalonymi komórkami i nagłówkiem powtarzanym na każdej stronie, wczyta się częściowo. Lepiej wyeksportować dane ponownie do csv.

## Czego ten skill nie robi celowo

Nie prognozuje. Nie mówi, czy podnieść ceny, zrezygnować z klienta albo kogoś zwolnić. Nie podaje przyczyny zmiany jako faktu i nie pisze, że jedna rzecz „przełożyła się” na drugą, bo z arkusza tego nie widać — widać tylko, że zdarzyły się w tym samym czasie.

Nie nazywa też trendem czegoś, co ma cztery punkty, i nie podaje procentu bez liczb bezwzględnych obok. „Wzrost o 200%” przy dwóch sztukach to nie wzrost, to dwie sztuki.

To granica postawiona świadomie. Model, który dostaje tabelkę i pytanie „co z tego wynika”, potrafi napisać płynne, pewne siebie wyjaśnienie, którego w danych nie ma ani śladu — i to jest najdroższy błąd w tej kategorii, bo brzmi dokładnie tak samo jak prawda. Ten skill zamiast tego pokazuje, gdzie kończą się dane, i oddaje decyzję osobie, która zna firmę.
