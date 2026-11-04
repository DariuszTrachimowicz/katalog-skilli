---
nazwa: Raport miesięczny
kategoria: Dane
status: gotowy
wersja: 1.0.2
poziom: Działa od razu
aktualizacja: 2026-11-04
skrot: Z liczb za miesiąc albo kwartał pisze gotowy raport dla przełożonego, zarządu albo właściciela, z wyraźną granicą między tym, co pokazują liczby, a tym, co jest domysłem.
korzysc: Oszczędzasz godziny pisania raportu dla zarządu, a fakty masz w nim wyraźnie oddzielone od domysłów.
szukaj: raport miesięczny, raport kwartalny, podsumowanie miesiąca, raport dla zarządu, raport sprzedaży, wyniki miesiąca, jak poszedł miesiąc, materiał dla właściciela, jedna strona dla zarządu, podsumowanie dla szefa, jak opisać spadek, r/r, m/m, odchylenie, plan wykonanie, controlling
tytulSeo: Raport miesięczny dla zarządu, jak napisać z danych, po polsku
opisSeo: Wrzuć dane za miesiąc i dostań gotowy raport dla szefa albo zarządu. Polska struktura, oddziela fakty od interpretacji, nie zmyśla przyczyn.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Zamienia liczby za okres w tekst, który da się wysłać wyżej: co się wydarzyło, co się zmieniło względem poprzedniego okresu, względem roku temu i względem planu, co wymaga decyzji. Domyślnie chodzi o miesiąc, ale ten sam układ obsługuje kwartał i tydzień, zmienia się nazwa okresu i okres porównawczy, reszta raportu zostaje taka sama, więc kolejne wydania nadal da się zestawiać.

Najważniejsze jest to, czego nie robi po drodze. Raport ma osobną sekcję na liczby i osobną na hipotezy. Przyczyna spadku nigdy nie trafia do sekcji z faktami, bo przyczyny nie ma w danych, jest w głowie kierownika albo nigdzie.

## Dla kogo

Kierownicy działów, szefowie sprzedaży, kierownicy produkcji, właściciele małych firm, biura rachunkowe przygotowujące materiał dla zarządu spółki. Każdy, kto co miesiąc siada do tego samego dokumentu i pisze go od zera.

## Ile Ci to oszczędza

Pierwsza wersja raportu to zwykle dwie, trzy godziny: przeklejanie liczb, liczenie zmian, szukanie zdań, którymi opisze się słaby miesiąc. Ze skillem to kwadrans, z czego większość idzie na sprawdzenie, czy liczby się zgadzają.

Drugą oszczędnością jest powtarzalność. Kolejny miesiąc wychodzi w tym samym układzie, z tymi samymi wskaźnikami w tej samej kolejności, więc da się je porównać, zamiast czytać od nowa.

## Przykład z życia

Marek prowadzi sprzedaż w firmie z branży opakowań. Za lipiec ma eksport z systemu: przychód 612 400 zł wobec 748 900 zł w czerwcu.

Skill pisze w pierwszym zdaniu, że przychód spadł o 136 500 zł, czyli o 18 % m/m, bez „nieznacznego wyhamowania”. Pokazuje, że wobec lipca rok wcześniej spadek wynosi 4 %, więc obraz zależy od tego, do czego się porównuje. Zauważa, że lipiec 2026 miał 23 dni robocze, a czerwiec 21, więc na dzień roboczy przychód spadł o 25 %, głębiej niż na miesiąc. Wyłapuje, że jeden klient odpowiadał w czerwcu za 189 000 zł, i pokazuje sumę bez niego obok sumy z nim.

Czego nie pisze: że to sezon urlopowy. Zamiast tego w sekcji „Hipotezy” zapisuje to jako przypuszczenie Marka i dopisuje, co je zweryfikuje, porównanie lipców z trzech lat. Zarząd dostaje jedną stronę i trzy sprawy do rozstrzygnięcia.

## Jak po polsku

Struktura jest taka, jakiej oczekuje się w polskiej firmie: podsumowanie, liczby z porównaniem, zmiany, decyzje, braki. Nazewnictwo też, r/r, m/m, narastająco, plan i wykonanie, odchylenie, należności przeterminowane.

Skill pilnuje polskiego zapisu liczb: spacja w tysiącach, przecinek dziesiętny, kwoty w tys. zł albo mln zł konsekwentnie w całym dokumencie, daty w formacie 31.07.2026. Rozróżnia procent od punktu procentowego, bo to częsty błąd przy marży i wykonaniu planu.

Zna też polski kalendarz dni ustawowo wolnych, z Trzema Królami, Poniedziałkiem Wielkanocnym, majówką, Bożym Ciałem, 1 i 11 listopada oraz Wigilią, która jest dniem wolnym od 2025 roku. Miesiąc z 19 dniami roboczymi porównany z miesiącem, który ma 22, wygląda gorzej, niż był, a grudzień policzony bez Wigilii ma o jeden dzień roboczy za dużo. Liczbę dni roboczych obu porównywanych miesięcy skill wypisuje w raporcie, żeby dało się ją sprawdzić.

## Czego potrzebujesz

Dowolny płatny plan Claude i dane za miesiąc, arkusz, eksport z systemu, wklejona tabela albo własne notatki z liczbami. Przydają się dane porównawcze: poprzedni miesiąc, ten sam miesiąc rok wcześniej albo plan. Bez nich raport powstanie, ale będzie znacznie chudszy i skill to napisze.

## Na czym się wywala

- **Dane bez punktu odniesienia.** Same liczby za lipiec, bez czerwca, bez lipca rok temu i bez planu, dają raport, który stwierdza stan i nic więcej. Skill nie dopowie kontekstu, bo go nie ma, powie, czego brakuje.
- **Niepełny miesiąc.** Jeśli dane kończą się na 24 dniu, skill odmówi porównania z pełnym miesiącem i nie przeliczy „na cały”. To zawsze frustruje kogoś, kto potrzebuje raportu przed końcem okresu.
- **Arytmetyka na dużych plikach.** Im więcej wierszy, tym większa szansa pomyłki w sumie. Skill liczy sumy dwa razy, sprawdza, czy części dają całość, i podaje przy każdej liczbie, czy wzięta jest ze źródła, czy policzona z pliku, ale kontrolna suma po Twojej stronie jest konieczna, zwłaszcza gdy raport idzie na zarząd.
- **Dane rozbite na wiele arkuszy i eksporty z popsutym kodowaniem.** Jeśli miesiąc leży w pięciu zakładkach albo polskie znaki rozsypały się na „przychÃ³d”, skill zgłosi, czego nie umie połączyć i odczytać, zamiast zgadywać, która zakładka jest tą właściwą.
- **Bałagan w źródle.** Faktury korygujące, zaliczkowe, mieszane netto z brutto, kolumny nazwane raz tak, raz inaczej, skill część z tego wyłapie i zgłosi, ale nie posprząta pliku za Ciebie i nie zgadnie, która kolumna jest która.
- **Wykresy i tabele przestawne.** Nie robi ich. Produktem jest tekst.

## Czego ten skill nie robi celowo

Nie zgaduje przyczyn, nie prognozuje, nie rekomenduje decyzji i nie ocenia nazwanych osób. Nie pisze, że coś jest zgodne z przepisami ani prawidłowo rozliczone. Nie łagodzi złej liczby przez zmianę okresu porównania albo jednostki, może zmienić ton, nie może zmienić podstawy.

Nie uzupełnia też luk. Nie oszacuje brakującego miesiąca, nie przepisze poprzedniego „bo pewnie podobnie” i nie wypełni pustych komórek średnią, pusta komórka zostaje pusta i nie jest zerem, bo w gotowym raporcie liczba wstawiona wygląda dokładnie tak samo jak zmierzona. Nie wpisze również nazwiska ani terminu przy sprawie do decyzji, jeśli sam ich nie podasz; zostaje „do ustalenia”.

Jeśli znasz powód spadku, podaj go. Trafi do raportu z podpisem, że pochodzi od Ciebie, a nie z danych.

Raport, który wygląda mądrzej, niż pozwalają dane, jest gorszy niż brak raportu, bo ktoś na jego podstawie podejmie decyzję. Dlatego hipotezy stoją tu w osobnej sekcji, z własnym nagłówkiem, z zapisanym źródłem i ze zdaniem o tym, co je potwierdzi. Nie da się ich pomylić z ustaleniami, i to jest cała wartość tego narzędzia.

## Najczęstsze pytania

### Jak napisać raport miesięczny dla zarządu z danych sprzedaży?

Wrzuć dane za miesiąc, a skill napisze raport w układzie, jakiego oczekuje się w polskiej firmie: podsumowanie, liczby z porównaniem m/m, r/r i do planu, zmiany, sprawy do decyzji i braki. Liczby i hipotezy stoją w osobnych sekcjach, więc odbiorca nie pomyli ustalenia z przypuszczeniem.

### Czy AI dopisze do raportu przyczynę spadku?

Nie, przyczyny nie ma w danych, więc nie trafi do sekcji z faktami. Jeśli znasz powód, skill zapisze go z podpisem, że pochodzi od Ciebie, a domysły trafią do sekcji „Hipotezy” ze zdaniem, co je potwierdzi. Nie prognozuje też i nie rekomenduje decyzji.

### Czy przygotuje raport, gdy miesiąc jeszcze się nie skończył?

Tak, ale nie porówna niepełnego miesiąca z pełnym i nie przeliczy go „na cały”. Takie porównanie to najczęstszy sposób, w jaki raport wprowadza w błąd bez złej woli, więc skill wypisuje braki wprost, zamiast wypełniać je szacunkiem.

### Czy raport uwzględnia dni robocze przy porównaniu miesięcy?

Tak, skill zna polski kalendarz dni ustawowo wolnych i wypisuje w raporcie liczbę dni roboczych obu porównywanych miesięcy, żeby dało się ją sprawdzić. Bez tej poprawki miesiąc z mniejszą liczbą dni roboczych wygląda gorzej, niż był naprawdę.

### Jakie dane przygotować do raportu miesięcznego?

Wystarczą dane za okres: arkusz, eksport z systemu, wklejona tabela albo własne notatki z liczbami. Przydają się dane porównawcze, czyli poprzedni miesiąc, ten sam miesiąc rok wcześniej albo plan, bo bez nich raport stwierdza tylko stan, a skill napisze, czego brakuje.

### Ile kosztuje skill do raportów miesięcznych i na jakich platformach działa?

Nic, skill jest darmowy i udostępniony na licencji GPL, a plik .skill dostajesz linkiem na e-mail po podaniu adresu na karcie skilla. W Claude działa na dowolnym płatnym planie, w ChatGPT wymaga planu Business, Enterprise, Edu lub Healthcare, a w Gemini w Polsce instrukcje wkleja się do rozmowy albo Gema.
