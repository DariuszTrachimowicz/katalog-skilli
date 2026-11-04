# Komponenty, szablony i pytania

Otwórz sekcję komponentu, który akurat budujesz. W każdym szablonie realia firmy
wstawia użytkownik albo zostają jako `[UZUPEŁNIJ: ...]`, a fakty prawne zmienne jako
`[WYMAGA WERYFIKACJI: ... ; źródło: tekst AI Act / Komisja Europejska / polski organ
nadzoru / biznes.gov.pl]`. Nigdzie nie orzekaj.

## Wersjonowanie (dodaj do KAŻDEGO dokumentu)

Te dokumenty żyją: prawo się zmienia, firma dokłada narzędzia, po incydencie płyną
wnioski. Dokument bez wersji i daty przeglądu po roku nikt nie wie, czy jest aktualny.
Dlatego każdy generowany dokument (rejestr, polityka, ścieżka incydentu, komplet
klauzul) otwórz metryczką:

```
Wersja: 1.0    Data utworzenia: [UZUPEŁNIJ: RRRR-MM-DD]
Właściciel: [UZUPEŁNIJ: osoba/rola z rejestru]
Następny przegląd: [UZUPEŁNIJ: data, np. za 12 miesięcy albo po istotnej zmianie prawa/narzędzi]
Historia zmian: 1.0 utworzenie
```

Przy każdej aktualizacji podbij numer (1.0 do 1.1 przy drobnej zmianie, do 2.0 przy
gruntownej), dopisz datę i jedno zdanie do „Historii zmian". Datę zapisuj maszynowo
(RRRR-MM-DD) w metryczce; w treści dla ludzi data może być słowna. Nie wymyślaj dat,
zostaw `[UZUPEŁNIJ]`, jeśli użytkownik nie poda.

## 1. Rejestr systemów AI

Fundament, reszta się do niego odwołuje. To inwentarz: jakie AI firma używa, do czego,
na jakich danych, kto odpowiada. Buduj jako tabelę, jeden wiersz na narzędzie.

Pytania triażowe (zadaj po kolei dla każdego narzędzia):
- Jak się nazywa i do czego służy w firmie?
- Czy przetwarza dane osobowe? Czyje (pracownicy, klienci, kandydaci)?
- Czy wspiera albo podejmuje decyzje o ludziach (rekrutacja, ocena, zdolność, dostęp)?
- Nasza rola: tylko korzystamy z gotowego narzędzia, czy sami je tworzymy, istotnie
  modyfikujemy albo sprzedajemy pod swoją marką? (to różnicuje obowiązki pod AI Act,
  zostaw jako `[WYMAGA WERYFIKACJI: rola pod AI Act]`).
- Kto jest właścicielem po stronie firmy i jaki dostawca za tym stoi? Jeśli narzędzie
  przetwarza dane osobowe, czy z dostawcą jest umowa powierzenia? (gdy nie wiadomo,
  zostaw `[WYMAGA WERYFIKACJI: czy potrzebna umowa powierzenia z dostawcą; do prawnika
  lub inspektora ochrony danych]`, nie przesądzaj, że jest albo że nie jest potrzebna).

Jedno narzędzie w kilku różnych zastosowaniach albo z różnymi danymi rozpisz w osobnych
wierszach, bo wtedy różni się jego waga i właściciel.

Nad tabelą umieść metryczkę wersji (patrz „Wersjonowanie" na górze pliku): rejestr
zmienia się najczęściej, więc data i numer wersji są tu szczególnie ważne.

Szablon wiersza rejestru:

```
| Narzędzie | Do czego | Dane | Nasza rola | Właściciel | Dostawca | Umowa powierzenia | Flaga |
|---|---|---|---|---|---|---|---|
| [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ: osobowe/nie] | [WYMAGA WERYFIKACJI: rola] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ: jest/brak/sprawdzić] | [patrz niżej] |
```

Kolumna „Flaga" NIE orzeka kategorii ryzyka i nie przypisuje wag („niska/wysoka").
Wpisuj tylko, czy zastosowanie wymaga uwagi, i dlaczego, skutkiem: „decyzje o ludziach,
zwykle traktowane ostrzej, do weryfikacji" albo „zwykłe wsparcie, do potwierdzenia",
i dodaj `[WYMAGA WERYFIKACJI: kategoria ryzyka i rola pod AI Act; źródło: tekst AI Act
/ Komisja Europejska / polski organ]`. Zestaw rejestr z listą praktyk zakazanych
(sekcja 4), żeby wychwycić czerwone flagi.

## 2. Polityka AI dla pracowników

Wewnętrzny dokument: na jakich zasadach ludzie w firmie mogą używać AI. Krótki,
konkretny, do przeczytania przez nietechnicznego pracownika.

Szkielet (wypełnij realiami firmy):

```
POLITYKA KORZYSTANIA Z AI, [UZUPEŁNIJ: nazwa firmy]
[metryczka wersji, patrz „Wersjonowanie" na górze pliku]

1. Po co ta polityka i kogo dotyczy.
2. Z czego wolno korzystać: [UZUPEŁNIJ: dozwolone narzędzia z rejestru].
3. Czego nie wolno: dane szczególnie chronione i tajemnice firmy do narzędzi bez
   zgody firmy, decyzje o ludziach bez udziału i decyzji człowieka, praktyki z listy
   zakazanej.
4. Dane i poufność: co wolno wkleić, a czego nie; [UZUPEŁNIJ: reguły firmy].
5. Oznaczanie: kiedy ujawniamy, że treść albo kontakt powstał z udziałem AI. Ustal
   zasadę firmy, a osobno oznacz `[WYMAGA WERYFIKACJI: prawny obowiązek informowania
   o użyciu AI, np. przy chatbotach i treściach generowanych; źródło: AI Act]`, bo to
   nie tylko dobra praktyka, ale i możliwy obowiązek.
6. Człowiek odpowiada: AI jest narzędziem, decyzję i podpis bierze pracownik.
7. Zgłaszanie problemów: [odsyłacz do ścieżki incydentu, sekcja 5].
8. Kto pomaga i aktualizacja: właściciel i daty w metryczce wersji na górze dokumentu.
```

Nie wpisuj sankcji ani zapisów o charakterze regulaminu pracy bez adnotacji
`[WYMAGA WERYFIKACJI: powiązanie z regulaminem pracy i prawem pracy, do prawnika]`.

## 3. Klauzula AI do umów, obie strony, SZKIC DO PRAWNIKA

To NIE jest gotowa klauzula do podpisu. Układasz, co taka klauzula zwykle obejmuje,
w dwóch wariantach. Każdy szkic otwórz nagłówkiem:

```
SZKIC DO KONSULTACJI Z PRAWNIKIEM, NIE UŻYWAJ BEZ WERYFIKACJI PRAWNEJ.
```

Wariant A, gdy firma jest ZAMAWIAJĄCYM (kupuje usługę albo narzędzie): oczekiwania
wobec dostawcy, m.in. ujawnienie, czy i jak używa AI, ochrona danych firmy, prawa do
wyników, granice odpowiedzialności, zakaz praktyk zakazanych.

Wariant B, gdy firma jest DOSTAWCĄ (sprzedaje usługę z AI): co firma ujawnia klientowi,
zakres odpowiedzialności, udział i decyzja człowieka przy istotnych decyzjach, prawa
do danych wejściowych.

Każdą pozycję zostaw jako punkt do ustalenia z `[UZUPEŁNIJ]`, bez oświadczania, że
zapis jest wiążący, wystarczający albo zgodny z prawem. Treść prawna to zadanie
prawnika, skill tylko porządkuje zakres.

## 4. Lista praktyk zakazanych, do samokontroli

Materiał edukacyjny: opisane skutkiem, po ludzku, praktyki, których AI Act zakazuje,
żeby firma przejrzała rejestr pod ich kątem. Nie recytuj przepisu, tłumacz skutek.

Przykłady, do potwierdzenia aktualną listą `[WYMAGA WERYFIKACJI: pełna i aktualna lista
praktyk zakazanych; źródło: tekst AI Act / Komisja Europejska]`:
- ocenianie i „punktowanie" ludzi na podstawie zachowania w sposób prowadzący do
  krzywdzącego traktowania w niepowiązanych sytuacjach,
- manipulacja podprogowa albo żerowanie na słabości grup wrażliwych,
- masowe zbieranie i katalogowanie wizerunków twarzy w celu rozpoznawania ludzi,
- wnioskowanie o cechach szczególnie chronionych albo o emocjach tam, gdzie jest to
  zabronione.

Dla każdego narzędzia z rejestru zapytaj: czy któreś zastosowanie ociera się o
powyższe? Jeśli tak, oznacz czerwoną flagą i skieruj do weryfikacji, nie orzekaj.

## 5. Ścieżka reakcji na incydent

Wewnętrzna procedura: co robić, gdy AI zawiedzie. Rozróżnij trzy rodzaje zdarzeń, bo
prowadzą różnymi ścieżkami: błąd samego AI (zła decyzja albo wynik), możliwe naruszenie
danych osobowych (dane trafiły, gdzie nie trzeba), oraz problem kontraktowy (narzędzie
nie robi tego, co obiecał dostawca). Krótka, wykonalna.

Szkielet:

```
GDY COŚ PÓJDZIE NIE TAK Z AI, [UZUPEŁNIJ: nazwa firmy]
[metryczka wersji, patrz „Wersjonowanie" na górze pliku]

1. Zatrzymaj: wstrzymaj użycie narzędzia w tym procesie.
2. Zgłoś: komu i jak, [UZUPEŁNIJ: właściciel z rejestru, kanał].
3. Jeśli mogły wyciec dane osobowe, od razu włącz inspektora ochrony danych albo
   [UZUPEŁNIJ: osobę odpowiedzialną za dane], nie czekaj na dalsze kroki.
4. Zabezpiecz: co zapisać (co się stało, kogo dotyczy, jakie dane).
5. Oceń skutek: czy to błąd AI, naruszenie danych osobowych, czy sprawa kontraktowa.
6. Powiadom na zewnątrz, jeśli trzeba: [WYMAGA WERYFIKACJI: obowiązki i terminy
   zgłoszeń, m.in. wobec organu i osób, powiązanie z RODO; źródło: AI Act / RODO /
   polski organ]. To pole domyka prawnik albo inspektor ochrony danych.
7. Wnioski: co zmienić w rejestrze albo polityce, żeby się nie powtórzyło.
```

Nie wpisuj konkretnych terminów zgłoszeń jako pewnika, one zależą od rodzaju zdarzenia
i podstawy prawnej, zostaw je jako `[WYMAGA WERYFIKACJI]`.
