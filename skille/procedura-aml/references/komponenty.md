# Komponenty dokumentacji AML (szablony robocze)

Każdy dokument otwieraj metryczką i adnotacją (sekcja 0). Realia od użytkownika
albo `[UZUPEŁNIJ]`; wartości prawne zmienne z `[WYMAGA WERYFIKACJI: ...; źródło:
...]` wg `stan-prawny.md`. Zero orzekania.

## 0. Metryczka i adnotacja (na początku KAŻDEGO dokumentu)

```
Wersja: 1.0    Data: [UZUPEŁNIJ: data słownie, np. 21 sierpnia 2026]
Właściciel dokumentu: [UZUPEŁNIJ: imię i nazwisko, rola]
Następny przegląd: [UZUPEŁNIJ: data; rekomendacja: co 12 miesięcy i po każdej
istotnej zmianie działalności lub przepisów]
Historia zmian: 1.0 utworzenie

PROJEKT do zatwierdzenia przez kadrę kierowniczą wyższego szczebla i osobę
odpowiedzialną za AML (w działalności jednoosobowej obie role pełni
przedsiębiorca; ustawa wymaga zatwierdzenia procedury przez kadrę kierowniczą,
zatwierdzanie pozostałych dokumentów to dobra praktyka organizacyjna).
Dokument przygotowany narzędziem wspierającym; za treść i zgodność
z przepisami odpowiada instytucja obowiązana.
```

## 1. Ocena ryzyka instytucji

Struktura dokumentu:

1. **Opis działalności** (usługi, klienci, kanały, skala) słowami użytkownika.
2. **Status instytucji obowiązanej**: w jakiej roli / dla jakich usług
   `[WYMAGA WERYFIKACJI: kwalifikacja wg katalogu ustawy; źródło: ustawa AML,
   biznes.gov.pl]`. Uwaga na usługi kwalifikowane warunkowo: np. pośrednictwo
   w najmie i dzierżawie wchodzi do katalogu dopiero od ustawowego progu
   miesięcznego czynszu `[WYMAGA WERYFIKACJI: próg i zakres wyłączenia;
   źródło: ustawa AML]`, więc zapytaj o rodzaj obsługiwanych umów.
3. **Czynniki ryzyka działalności** w 4 grupach (klient, geografia,
   produkty/usługi, kanał; katalog: `czynniki-ryzyka.md`): dla każdego opis,
   dlaczego dotyczy TEJ instytucji, i ocena opisowa (niskie/średnie/wysokie)
   z uzasadnieniem. Rozważ osobno pranie pieniędzy ORAZ finansowanie
   terroryzmu; jeśli dla którejś grupy albo dla FT ryzyko oceniasz jako
   nieistotne, odnotuj to z uzasadnieniem, nie pomijaj bez śladu.
4. **Końcowy poziom ryzyka działalności** (opisowy, z uzasadnieniem): jedno
   zdanie, jaki poziom ryzyka prania pieniędzy i finansowania terroryzmu
   instytucja przypisuje swojej działalności i dlaczego.
5. **Wnioski**: które ryzyka dominują i CO Z TEGO WYNIKA dla procedury
   (np. dominuje gotówka u klientów, więc procedura kładzie nacisk na progi
   i źródło środków). To zdanie łączące spina ocenę z procedurą.
6. **Zasady przeglądu oceny** (kiedy aktualizować; ustawa każe aktualizować ocenę w razie potrzeby, nie rzadziej niż co 2 lata).

Pytania pomocnicze do 3: patrz wywiad w SKILL.md; dopytuj TYLKO o grupy, których
brakuje.

## 2. Procedura wewnętrzna AML

Struktura projektu procedury (rozdziały):

1. Cel, zakres, definicje używane w instytucji (bez przepisywania ustawy).
2. **Role i odpowiedzialność**: kadra kierownicza, wyznaczony pracownik
   odpowiedzialny; zastępstwa `[UZUPEŁNIJ: osoby]`; w działalności
   jednoosobowej wprost: zadania wykonuje przedsiębiorca.
3. **Środki bezpieczeństwa finansowego**: kiedy stosowane (nawiązanie relacji,
   transakcje okazjonalne od progów `[WYMAGA WERYFIKACJI: progi]`,
   wątpliwości co do danych, podejrzenie), jak wygląda identyfikacja
   i weryfikacja klienta oraz osoby działającej w jego imieniu (tożsamość
   i umocowanie), ustalanie beneficjenta rzeczywistego z własnym badaniem
   struktury własności i kontroli (CRBR jako punkt porównania, nie jedyne
   źródło), postępowanie z rozbieżnościami CRBR (odnotowanie, wyjaśnienie,
   przekazanie potwierdzonej rozbieżności organowi właściwemu
   `[WYMAGA WERYFIKACJI: tryb; źródło: podatki.gov.pl/CRBR]`), status PEP
   (podejście oparte na ryzyku; oświadczenie to jedno ze źródeł, nie jedyna
   metoda), monitorowanie relacji; odesłanie do modelu oceny ryzyka klienta
   (komponent 3). Osobno: gdy instytucja NIE MOŻE zastosować
   któregoś z wymaganych środków, co do zasady nie nawiązuje relacji, nie
   przeprowadza transakcji okazjonalnej ani transakcji przez rachunek,
   a istniejącą relację rozwiązuje; osoba odpowiedzialna dokumentuje
   przeszkodę i ocenia, czy jest podstawa do zawiadomienia GIIF. Wyjątek
   ustawowy dotyczy prawników w zakresie związanym z postępowaniem sądowym
   i poradą co do jego wszczęcia lub uniknięcia `[stan na 6.11.2026; sprawdź
   aktualny tekst ustawy]`.
4. **Postępowanie z ryzykiem wyższym i niższym**: co instytucja robi inaczej
   przy poszczególnych poziomach (środki wzmożone / możliwość uproszczonych
   `[WYMAGA WERYFIKACJI: warunki dopuszczalności]`).
5. **Szczególne środki ograniczające (sankcje)**: sprawdzanie list przed
   nawiązaniem relacji i okresowo, rozstrzyganie zbieżności nazw (podobieństwo
   to nie trafienie), postępowanie po potwierdzonym trafieniu
   `[WYMAGA WERYFIKACJI: obowiązki, w tym zamrożenie wartości majątkowych;
   źródło: listy i komunikaty na gov.pl]`.
6. **Rozpoznawanie okoliczności podejrzanych**: katalog sygnałów DOPASOWANY do
   działalności (nie generyczny), droga wewnętrznego raportowania do osoby
   odpowiedzialnej; ZASADA POUFNOŚCI (zakaz ujawniania, tzw. tipping off)
   opisana wprost.
7. **Zgłoszenia i zawiadomienia**: kto, w jakim trybie i terminach; procedura
   NIE zawiera wypełnionych formularzy. Procedura rozdziela dwie ścieżki
   z różnymi zegarami: zawiadomienie o okolicznościach wskazujących na
   podejrzenie (niezwłocznie, najpóźniej w 2 dni robocze od potwierdzenia
   podejrzenia w instytucji) oraz niezwłoczne zawiadomienie o konkretnej
   podejrzanej transakcji lub wartościach majątkowych. Przy tej drugiej
   ścieżce odnotowuje się godzinę potwierdzenia przyjęcia zawiadomienia przez
   GIIF i nie przeprowadza transakcji do żądania albo zwolnienia, najdłużej
   przez 24 godziny od tego potwierdzenia; upływ 24 godzin nie uchyla dalszego
   żądania GIIF ani postanowienia prokuratora, więc przed wznowieniem
   transakcji sprawdza się wszystkie otrzymane rozstrzygnięcia
   `[stan na 6.11.2026; terminy i tryb sprawdź w aktualnym tekście ustawy
   i komunikatach GIIF]`.
8. **Wstrzymanie transakcji / blokada**: wewnętrzny obieg decyzji
   `[WYMAGA WERYFIKACJI: przesłanki i terminy ustawowe]`.
9. **Kontrola wewnętrzna**: kto i jak często sprawdza wykonywanie procedury
   (w małej instytucji choćby coroczny samoprzegląd z notatką).
10. **Przechowywanie dokumentacji** (co, gdzie, jak długo: co do zasady 5 lat od zakończenia
    relacji lub transakcji okazjonalnej, analizy 5 lat od ich przeprowadzenia `[stan na 6.11.2026; przedłużenie na żądanie GIIF sprawdź w ustawie]`), ochrona danych w zgodzie z RODO (bez rozstrzygania kwestii RODO,
    odesłanie do dokumentacji RODO instytucji).
11. **Szkolenia**: kto, jak często, jak dokumentowane.
12. **Zgłaszanie naruszeń (whistleblowing)**: kanał zgłoszeń (także
    anonimowych), kto przyjmuje, poufność i ochrona zgłaszającego, działania
    następcze, termin usunięcia danych osobowych ze zgłoszeń `[stan na 6.11.2026;
    sprawdź aktualny tekst ustawy]`.
13. Postanowienia końcowe: zatwierdzenie przez kadrę kierowniczą, wejście
    w życie, przegląd.

Zasada pisania: każdy rozdział ma brzmieć jak opis TEGO biura (nazwy ról,
realne usługi), nie jak ustawa. Wszędzie, gdzie użytkownik nie podał realiów:
`[UZUPEŁNIJ]`.

## 3. Model oceny ryzyka klienta + ocena

1. **Model** (dokument): czynniki wybrane pod instytucję z udokumentowanym
   rozważeniem WSZYSTKICH 4 grup (klient, geografia, produkty/usługi, kanał;
   grupa uznana za nieistotną = odnotowana z uzasadnieniem, nie pominięta;
   w pliku JSON pole `grupy_nieuwzglednione`, skrypt to wymusza),
   wagi sumujące się do 100% z uzasadnieniami, skala ocen (rekomendowana 1-4,
   parzysta, żeby unikać "wszystko na 3") z OPISEM znaczenia każdego stopnia
   (a tam, gdzie stopień znaczy co innego dla różnych czynników, doprecyzuj
   przy czynniku), progi poziomów (np. niskie/standardowe/wysokie)
   Z UZASADNIENIEM w dokumencie modelu; konwencja przedziałów jak w skrypcie:
   od dolnej granicy włącznie do górnej wyłącznie, ostatni poziom domknięty.
   Zasady przeglądu ocen.
2. **Reguły nadrzędne poza punktacją** (zamknięta lista w modelu; skutek:
   punktacja liczona, ale ocena ZABLOKOWANA do obsługi wg procedury):
   potwierdzone trafienie na liście sankcyjnej (samo podobieństwo nazwy to
   nie trafienie: najpierw rozstrzygnij), klient albo beneficjent o statusie
   PEP `[WYMAGA WERYFIKACJI: obowiązki wobec PEP]`, powiązanie z państwem
   trzecim wysokiego ryzyka `[WYMAGA WERYFIKACJI: lista]`, odmowa ujawnienia
   beneficjenta albo niemożność zastosowania środka bezpieczeństwa,
   powzięcie podejrzenia prania pieniędzy lub finansowania terroryzmu.
3. **Ocena klienta**: fakty od użytkownika, potem JSON wg
   `assets/przyklady/ocena-klienta.json`, akceptacja użytkownika,
   `python scripts/ocena_ryzyka.py plik.json`, wynik ze śladem do dokumentu
   oceny klienta (metryczka, fakty, tabela ocen z uzasadnieniami, wynik,
   poziom, rekomendowany zestaw środków WG PROCEDURY, podpis osoby
   odpowiedzialnej `[UZUPEŁNIJ]`).

## 4. Ewidencje i dowody wykonania obowiązków

Ustawa każe dokumentować oceny, zastosowane środki i analizy, ale nie narzuca
każdej instytucji identycznego zestawu tabel. Wzory niżej to sposób
udokumentowania obowiązków; przy każdym oznacz charakter i utrzymuj tylko te,
które u TEJ instytucji mają sens. Wzory tabel (Markdown) z jednozdaniową
instrukcją przy każdej kolumnie:

- **Ewidencja ocen ryzyka klientów** (obowiązkowa: dokumentuje wykonanie
  obowiązku oceny): oznaczenie klienta (neutralne), data oceny, wynik, poziom,
  data następnego przeglądu, osoba.
- **Ewidencja transakcji podlegających raportowaniu** (warunkowa: prowadź
  tylko, jeśli instytucja sama przeprowadza transakcje objęte raportowaniem
  `[WYMAGA WERYFIKACJI: czy i które transakcje Twojej instytucji podlegają;
  źródło: ustawa AML i komunikaty GIIF, w tym komunikat dla biur
  rachunkowych]`; samo księgowanie cudzych operacji zwykle nie tworzy tego
  obowiązku, zweryfikuj u źródła): data, oznaczenie stron, kwota, waluta,
  forma, uwagi.
- **Ewidencja wewnętrznych raportów o okolicznościach podejrzanych**
  (obowiązkowa: dokumentuje drogę raportowania z procedury): data,
  zgłaszający, krótki opis, decyzja osoby odpowiedzialnej, dalsze kroki
  (bez danych, których nie wolno ujawniać szerzej).
- **Ewidencja szkoleń** (obowiązkowa: dokumentuje wykonanie obowiązku
  szkoleniowego): data, zakres, uczestnicy, prowadzący, materiał.
- **Ewidencja weryfikacji sankcyjnych** (pomocnicza): data sprawdzenia, listy,
  wynik, rozstrzygnięcie zbieżności nazw.

Przy ewidencjach przypomnij o minimalizacji danych osobowych i okresach
przechowywania `[WYMAGA WERYFIKACJI]`.

## 5. Checklisty środków bezpieczeństwa finansowego

Listy czynności na kolejne etapy relacji, dopasowane do usług instytucji:

- **Nawiązanie relacji**: identyfikacja i weryfikacja klienta (dokumenty,
  źródło weryfikacji odnotowane), identyfikacja osoby działającej w imieniu
  klienta (tożsamość + umocowanie), beneficjent rzeczywisty: własne badanie
  struktury własności i kontroli, porównanie z CRBR (rozbieżność = odnotuj
  i postępuj wg procedury; nie opieraj się wyłącznie na CRBR), status PEP
  (podejście oparte na ryzyku, źródła odnotowane), sprawdzenie list
  sankcyjnych (wynik i rozstrzygnięcie zbieżności odnotowane), cel
  i charakter relacji, ocena ryzyka (komponent 3), decyzja o nawiązaniu
  relacji: osoba odpowiedzialna. Gdy któregoś środka nie da się zastosować:
  co do zasady nie nawiązuj relacji ani nie przeprowadzaj transakcji, istniejącą relację rozwiąż, odnotuj przeszkodę i oceń podstawę zawiadomienia GIIF wg procedury `[stan na 6.11.2026; sprawdź aktualny tekst ustawy]`.
- **W trakcie relacji**: monitorowanie transakcji względem profilu,
  aktualizacja danych i oceny wg terminów z modelu, okresowe sprawdzenia
  sankcyjne, reagowanie na sygnały z katalogu procedury.
- **Transakcja okazjonalna od progu** `[WYMAGA WERYFIKACJI: próg]`: środki
  bezpieczeństwa finansowego w zakresie adekwatnym do ryzyka tej transakcji
  (uproszczenie możliwe TYLKO po potwierdzeniu niższego ryzyka na warunkach
  z procedury, nie automatycznie) + wpis do właściwej ewidencji.

Każdy punkt checklisty w formie "sprawdź / odnotuj gdzie", bez rozstrzygnięć
"możesz przyjąć".

## 6. Checklista spójności kompletu (krok kontroli ze SKILL.md)

- Procedura odwołuje się do oceny ryzyka instytucji (wnioski z 1 widoczne
  w rozdziałach procedury)?
- Ocena instytucji rozważa 4 grupy czynników ORAZ finansowanie terroryzmu
  i ma końcowy poziom ryzyka z uzasadnieniem?
- Model klienta używa czynników spójnych z oceną instytucji i dokumentuje
  rozważenie wszystkich 4 grup?
- Procedura obejmuje sankcje, rozbieżności CRBR, kontrolę wewnętrzną
  i pełną procedurę zgłaszania naruszeń?
- Ewidencje pokrywają obowiązki opisane w procedurze (nic w procedurze nie
  wisi bez ewidencji i odwrotnie), a warunkowe mają rozstrzygnięcie,
  czy dotyczą tej instytucji?
- Wyznaczono osoby (odpowiedzialny, zastępstwa) i są w metryczkach?
- Jest plan szkoleń i procedura zgłoszeń wewnętrznych?
- Każdy dokument ma metryczkę, adnotację PROJEKT i datę przeglądu?
- Wszystkie `[UZUPEŁNIJ]` wypisane na końcu jako lista do domknięcia?

Wynik podawaj jako listę (jest / brakuje / do decyzji), nigdy jako werdykt.
