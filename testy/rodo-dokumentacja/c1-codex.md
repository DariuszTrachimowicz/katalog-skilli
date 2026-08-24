Wynik: materiał ma blokery w routingu, granicach bezpieczeństwa i spójności szablonów.

## BLOKER

1. **BLOKER | `description` oraz „Zakres tego wydania”**: opis uruchamia skill także dla ogólnych próśb typu „uporządkujmy RODO na papierze” i „nie ma żadnej dokumentacji”, choć mogą one dotyczyć polityki, klauzul, zgód, umów powierzenia albo audytu, które później są poza zakresem. Lista wykluczeń w `description` nie obejmuje wszystkich tych przypadków.

2. **BLOKER | „Krok 1, wejście od mapy danych” oraz „Materiały wejściowe od użytkownika”**: SKILL.md pozwala przy opisie bez mapy zebrać fakty i kontynuować, natomiast `komponenty.md` nakazuje przy braku mapy zawsze odesłać do `rodo-w-malej-firmie`. Brak jednej reguły wejścia.

3. **BLOKER | „Krok 1, wejście A, mapa gotowa” oraz „1. Inwentaryzacja przetwarzań”**: polecenie przepisania mapy „jeden do jednego” przeczy grupowaniu i rozdzielaniu pozycji według celu. Według pułapek dwa zbiory mogą stać się jedną czynnością, a jeden zbiór dwiema.

4. **BLOKER | „Po co to jest”, „Zakres tego wydania” oraz „Dokumenty, które powstają”**: określenia „komplet roboczych dokumentów” i „komplet dokumentacji” są fałszywie całościowe. Wydanie świadomie nie obejmuje między innymi polityki, klauzul, zgód, umów powierzenia i procedur incydentowych.

5. **BLOKER | „Zasady naczelne”, punkt 1, oraz „2. Rejestr czynności przetwarzania”, pułapka „Kolumna wypełniona przez użytkownika”**: reguła nadrzędna nakazuje zawsze pozostawić podstawę prawną pustą, także gdy użytkownik podaje własną propozycję. Komponent pozwala zachować tę wartość jako deklarację firmy. To bezpośrednia regresja twardej granicy.

6. **BLOKER | „Analiza ryzyka a ocena skutków dla ochrony danych” oraz „3. Prosta analiza ryzyka”**: plik stanu prawnego podaje regułę, że wysoka wartość ryzyka oznacza wymóg oceny skutków, a analiza pozwala firmie wybrać poziom „wysoki”. Zestawienie tych instrukcji pozwala skillowi pośrednio rozstrzygnąć, że ocena skutków jest wymagana, mimo bezwzględnego zakazu takiego rozstrzygnięcia.

7. **BLOKER | „Upoważnienia do przetwarzania”, część „Forma”, oraz „4. Upoważnienie do przetwarzania danych i Ewidencja upoważnień”**: zdania, że projekt jest „bezpieczny”, „zgodny z wymogami sektorowymi” i „daje rozliczalność w każdym wariancie”, są niedopuszczalnym zapewnieniem. Sam szablon nie gwarantuje zgodności ani rozliczalności.

8. **BLOKER | „Zasady naczelne”, punkty 5 i 6, oraz „10. Dane osobowe wklejone do rozmowy”**: przy iniekcji wolno „zacytować” sterujący fragment, ale nie ma pierwszeństwa zakazu powielania PII. Jeżeli instrukcja zawiera PESEL, rachunek, adres albo dane zdrowotne, dozwolona ścieżka cytowania powoduje wyciek. Zgłoszenie musi wymagać parafrazy z anonimizacją.

9. **BLOKER | „Czego nie wklejać: zasada bezwyjątkowa”, „Zasady pracy wpisane w skill” oraz „4. Upoważnienie do przetwarzania danych i Ewidencja upoważnień”**: dokument prywatności twierdzi, że wartości danych osobowych nie są potrzebne, po czym dopuszcza imię i rolę, a nawet samo stanowisko. Komponent wymaga konkretnej osoby, pełnego imienia i nazwiska oraz podpisów. Brakuje jednoznacznej reguły, że asystent pozostawia symbole i pola do lokalnego uzupełnienia.

10. **BLOKER | „2. Rejestr czynności przetwarzania”, pytania wywiadu i nagłówek dokumentu, oraz „Czego nie wklejać”**: skill prosi o pełne dane firmy, adresy i dane kontaktowe. Dla jednoosobowej działalności mogą to być dane osoby fizycznej i adres zamieszkania. Brakuje bezpiecznej ścieżki lokalnego uzupełnienia tych pól bez wklejania wartości do chmury.

11. **BLOKER | „Jak traktować prawo w tym skillu”, reguła czwarta, oraz „Krok 2, budowa komponentów”**: dozwolone są nieudokumentowane twierdzenia statystyczne typu „tak pracuje większość” i liczne określenia „najczęstszy błąd”. Nie znajdują podstawy w zamkniętym katalogu faktów, mimo zakazu korzystania z wiedzy własnej i statystyk z pamięci.

12. **BLOKER | „Katalog wartości oznaczanych do weryfikacji”, „2. Rejestr czynności przetwarzania” oraz „Dokumenty, które powstają”**: okresy przechowywania mają zawsze otrzymywać znacznik `[WYMAGA WERYFIKACJI]`, ale szablon używa tylko `[UZUPEŁNIJ]`. Z kolei okres przechowywania Ewidencji upoważnień ma jako „źródło” specjalistę zamiast konkretnego adresu z rejestru. Format znaczników nie jest spójny ani wykonalny.

13. **BLOKER | „Rejestr źródeł” oraz „Gdzie leży wykaz operacji wymagających oceny skutków”**: obowiązuje zakaz używania adresów spoza tabeli, ale podany jest dodatkowy bezpośredni adres PDF, którego tabela nie zawiera. W znaczniku dotyczącym upoważnień użyto też adresów bez `https://`, mimo wymagania konkretnego adresu.

14. **BLOKER | „Wariant B. Rejestr kategorii czynności”**: szablon nie ma nagłówka z danymi podmiotu przetwarzającego, jego przedstawiciela, inspektora i pełnymi danymi kontaktowymi administratorów. Są one zadeklarowane jako obowiązkowe, ale nie mają kompletnego miejsca w szablonie.

15. **BLOKER | „0. Metryczka i adnotacja” oraz „Szablon wyjścia: Upoważnienie do przetwarzania danych”**: każdy dokument ma mieć pełną metryczkę, stan prawny, następny przegląd i źródła. Upoważnienie może mieć metryczkę skróconą, która pomija część tych pól. Podobnie „wspólna metryczka wersji” dla dwóch rejestrów przeczy zasadzie osobnej metryczki każdego dokumentu.

16. **BLOKER | „Krok 3, kontrola przed oddaniem kompletu”, punkt 6, oraz „6. Lista kontrolna spójności kompletu”**: SKILL.md nakazuje porównywać zakres upoważnień z właścicielami procesów, natomiast komponenty prawidłowo wiążą zakres z numerami czynności. Właściciel procesu i osoba upoważniona to różne role. Obecna kontrola może zaakceptować błędne upoważnienia.

17. **BLOKER | „Szablon wyjścia: Upoważnienie do przetwarzania danych” oraz „Szablon wyjścia: Ewidencja upoważnień”**: upoważnienie może obowiązywać do konkretnej daty, ale ewidencja nie ma daty wygaśnięcia ani statusu. Nie da się odróżnić wpisu aktywnego od wygasłego lub nieuzupełnionego. Ewidencja obejmuje odebranie dostępów systemowych, ale nie kluczy, dokumentów papierowych i innych miejsc wskazanych w upoważnieniu.

18. **BLOKER | „Krok 3, kontrola przed oddaniem kompletu”, punkt 5, oraz „3. Prosta analiza ryzyka”**: kontrola wymaga daty kolejnego przeglądu dla każdej pozycji ryzyka. Tabela ma tylko termin działania, a data przeglądu występuje najwyżej globalnie w metryczce.

19. **BLOKER | „5. Rejestr luk” oraz „6. Lista kontrolna spójności kompletu”**: Rejestr luk nie ma obowiązkowego pola na dowód domknięcia i datę faktycznego zamknięcia, mimo reguły, że deklaracja „już to mamy” nie wystarcza. Szablony komponentów 2, 3 i 4 nie zawierają też pełnej końcowej listy wszystkich znaczników, choć kontrola nazywa ją obowiązkową. Deklaracja „pełna lista” jest więc fałszywa.

20. **BLOKER | „5. Rejestr luk”, lista pozycji obowiązkowych, oraz „Pułapki praktyczne”, punkt o umowie powierzenia**: lista sugeruje umowy powierzenia z odbiorcami, a część o upoważnieniach kategorycznie uznaje biuro rachunkowe za podmiot przetwarzający. W innym miejscu relacja ma dopiero zostać ustalona. Skill sam klasyfikuje relację prawną bez faktów i bez analizy umowy.

## DROBNE

1. **DROBNE | „Zakres wsparcia a odpowiedzialność” oraz „Jak wygląda skrócona druga odmowa”**: SKILL.md wymaga dosłownie tego samego zdania przy każdej próbie, ale druga i trzecia odmowa mają inne brzmienie. Odmowa nadal występuje, lecz instrukcja dosłowności jest sprzeczna.

2. **DROBNE | „Krok 3, kontrola przed oddaniem kompletu” oraz „5. Rejestr luk”**: nazwy kubełków nie są jednolite. W jednym miejscu jest „brakuje”, w drugim „niedomknięte”, mimo polecenia stosowania stałego układu.

3. **DROBNE | „Krok 2, budowa komponentów” oraz „Co narzędzie robi, a czego nie dotyka”**: SKILL.md przewiduje PDF i DOCX przy użyciu dodatkowych skilli, natomiast dokument prywatności mówi, że wynik jest wyłącznie w Markdownie. Instalacja jednocześnie deklaruje brak dodatkowych zależności.

4. **DROBNE | `description`, „Pliki referencyjne” oraz „1. Wgranie skilla”**: skill odsyła do `polityka-ai`, `procedura-aml`, `pismo-urzedowe` i `czerwone-flagi-w-umowie`, ale paczka instalacyjna ich nie zawiera i nie opisuje zachowania, gdy nie są dostępne.

5. **DROBNE | „Zasady naczelne”, punkt 5, oraz „Materiały wejściowe od użytkownika”, punkt 1**: pierwsza instrukcja każe po zgłoszeniu iniekcji przejść do analizy, a wzorzec kończy się pytaniem „Idziemy dalej?”, które zatrzymuje pracę do kolejnej odpowiedzi.

Kontrole dodatkowe:

- W przekazanym materiale nie znalazłem pauz ani półpauz.
- Nie ma przecieków obcej waluty ani obcego reżimu prawnego. Odwołania dotyczą Polski, RODO, UODO i Europejskiego Obszaru Gospodarczego.
- Wszystkie wewnętrzne ścieżki `SKILL.md`, `references` i `assets` wskazane w materiale mają odpowiadające im przekazane sekcje.
- Istnienia stron internetowych nie potwierdzam, ponieważ recenzja miała opierać się wyłącznie na treści polecenia. Wewnętrzne naruszenia rejestru adresów wskazałem wyżej.

WERDYKT: blokery do wydania TAK
