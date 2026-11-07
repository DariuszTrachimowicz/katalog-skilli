# Grupa 7: twierdzenia bez oznaczeń weryfikacji (7.11.2026)

Zakres: procedura-aml, polityka-ai, sygnalisci-procedura, sprawdz-kontrahenta, e-doreczenia-w-firmie (wszystkie *.md poza wpis.md). Linia o PIP w sygnalisci-procedura/references/stan-prawny.md nieruszana. Linie z oznaczeniem `[WYMAGA WERYFIKACJI]` i `[stan na 6.11.2026 ...]` pominięte jako już sprawdzone.

### - | skille/sygnalisci-procedura/references/komponenty.md:111
Waga: NISKA
Źródło: skille/sprawy-prawne-w-firmie/references/akty/SYGN.md (art. 8 ust. 4) | odczyt 7.11.2026 | "Dane osobowe, które nie mają znaczenia dla rozpatrywania zgłoszenia, nie są zbierane, a w razie przypadkowego zebrania są niezwłocznie usuwane. Usunięcie tych danych osobowych następuje w terminie 14 dni od chwili ustalenia, że nie mają one znaczenia dla sprawy."
Uzasadnienie: Pole „[termin: IOD]” sugeruje, że termin usunięcia ustala IOD, a ustawa wyznacza go wprost (14 dni); niespójne też z § 9 tego samego pliku i ze stan-prawny.md, które podają 14 dni.
Nowa linia: Zasady do projektu: dostęp tylko dla upoważnionych w zakresie niezbędnym, osobne przechowywanie od akt osobowych, kopia zapasowa, usunięcie danych 3 lata po zakończeniu roku, w którym zakończono działania następcze lub postępowania; dane bez znaczenia dla sprawy usuwane niezwłocznie, najpóźniej w 14 dni od ustalenia, że nie mają znaczenia dla sprawy; kto prowadzi rejestr [DECYZJA]; numeracja [DECYZJA]. Dane osobowe konkretnych osób wpisuje firma, skill zostawia kolumny puste.

### - | skille/sygnalisci-procedura/references/komponenty.md:155
Waga: NISKA
Źródło: skille/sprawy-prawne-w-firmie/references/akty/SYGN.md (art. 8 ust. 4) | odczyt 7.11.2026 | "Usunięcie tych danych osobowych następuje w terminie 14 dni od chwili ustalenia, że nie mają one znaczenia dla sprawy."
Uzasadnienie: Jak wyżej: karta obsługi zostawia termin do ustalenia przez IOD, choć ustawa podaje 14 dni.
Nowa linia: 8. Przechowywanie: 3 lata po zakończeniu roku, w którym zakończono działania następcze lub postępowania; dane bez znaczenia dla sprawy usunięte niezwłocznie, najpóźniej w 14 dni od ustalenia, że nie mają znaczenia dla sprawy.

### - | skille/sprawdz-kontrahenta/references/gdzie-sprawdzic.md:32
Waga: ŚREDNIA
Źródło: skille/sprawy-prawne-w-firmie/references/akty/CEIDG.md (art. 38 ust. 1) | odczyt 7.11.2026 | "Przedsiębiorca wpisany do CEIDG może opublikować za pośrednictwem systemu teleinformatycznego CEIDG informację o swoim pełnomocniku lub prokurencie."
Uzasadnienie: Wpis pełnomocnika do CEIDG jest dobrowolny, więc „pełnomocnik podpisujący bez wpisu” nie jest wadą umowy; skill każe traktować brak wpisu jak wadę i może kierować użytkownika do fałszywego alarmu zamiast do sprawdzenia samego pełnomocnictwa.
Nowa linia: - **Pełnomocnicy.** CEIDG, w odróżnieniu od KRS, ma rubrykę pełnomocnika, jeśli umowę podpisuje ktoś inny niż właściciel, zajrzyj tam; wpis pełnomocnika do CEIDG jest jednak dobrowolny, więc jego brak sam nie jest wadą, tylko powodem, żeby poprosić o skan pełnomocnictwa.

### - | skille/procedura-aml/references/komponenty.md:47
Waga: NISKA
Źródło: skille/sprawy-prawne-w-firmie/references/akty/AML.md (art. 27 ust. 3) | odczyt 7.11.2026 | "Oceny ryzyka, o których mowa w ust. 1, instytucje obowiązane sporządzają w postaci papierowej lub elektronicznej i w razie potrzeby, nie rzadziej jednak niż co 2 lata, aktualizują"
Uzasadnienie: Szablon oceny ryzyka instytucji pomija ustawowe minimum aktualizacji (nie rzadziej niż co 2 lata); rekomendacja 12 miesięcy z metryczki je spełnia, ale sama sekcja nie mówi, że jest twardy limit.
Nowa linia: 6. **Zasady przeglądu oceny** (kiedy aktualizować; ustawa każe aktualizować ocenę w razie potrzeby, nie rzadziej niż co 2 lata).

### - | skille/e-doreczenia-w-firmie/SKILL.md:40
Waga: NISKA
Źródło: skille/sprawy-prawne-w-firmie/references/akty/DOREL.md (art. 152 ust. 2) | odczyt 7.11.2026 | "wpisane do Centralnej Ewidencji i Informacji o Działalności Gospodarczej do dnia 31 grudnia 2024 r., składające w okresie od dnia 1 lipca 2025 r. do dnia 30 września 2026 r. wniosek o zmianę wpisu (...), wniosek o wpis informacji o zawieszeniu wykonywania działalności gospodarczej lub wniosek o wpis informacji o wznowieniu"
Uzasadnienie: Wcześniejszy obowiązek uruchamiał nie tylko wniosek o zmianę wpisu, ale też wniosek o wpis zawieszenia albo wznowienia działalności; pytanie wywiadu je pomija (linia 41 „uruchamia obowiązek wcześniej), ...” pozostaje bez zmian).
Nowa linia: czy po 30 czerwca 2025 składano wniosek o ZMIANĘ wpisu w CEIDG albo o wpis zawieszenia lub wznowienia działalności (zmiana

## Statystyka
| Plik | Twierdzeń sprawdzonych | Potwierdzonych | Poprawek |
|---|---|---|---|
| procedura-aml/SKILL.md | 3 | 3 | 0 |
| procedura-aml/references/stan-prawny.md | 5 | 5 | 0 |
| procedura-aml/references/komponenty.md | 3 | 2 | 1 |
| procedura-aml/references/czynniki-ryzyka.md | 1 | 1 | 0 |
| procedura-aml/references/granice.md, DANE-I-PRYWATNOSC.md, INSTALACJA.md | 2 | 2 | 0 |
| polityka-ai/SKILL.md | 2 | 1 | 0 (1 do człowieka) |
| polityka-ai/references/granice.md | 1 | 0 | 0 (do człowieka, to samo) |
| polityka-ai/references/komponenty.md | 0 (twarde twierdzenia oznaczone) | 0 | 0 |
| sygnalisci-procedura/SKILL.md | 3 | 3 | 0 |
| sygnalisci-procedura/references/stan-prawny.md | 18 | 18 | 0 |
| sygnalisci-procedura/references/komponenty.md | 12 | 10 | 2 |
| sprawdz-kontrahenta/SKILL.md | 3 | 3 | 0 |
| sprawdz-kontrahenta/references/gdzie-sprawdzic.md | 12 | 10 | 1 (1 do człowieka) |
| sprawdz-kontrahenta/references/sygnaly-ostrzegawcze.md | 1 | 1 | 0 |
| e-doreczenia-w-firmie/SKILL.md | 7 | 6 | 1 |
| e-doreczenia-w-firmie/references/procedura-firmowa.md | 2 | 2 | 0 |
| **Razem** | **76** | **67** | **5** |

Potwierdzone m.in. cytatem z lokalnych aktów: AML art. 27, 49, 50 ust. 3, 54, 74, 86, 89; SYGN art. 8, 14, 15, 23-29, 32, 54-58; DOREL art. 19, 41, 42, 152; OP art. 117ba § 3 pkt 2 (zawiadomienie do własnego urzędu w 7 dni); PRPRZ art. 19 (15 000 zł dla całej transakcji); KSH art. 154 (5 000 zł). Terminy KSeF (luty i kwiecień 2026, odstępstwo do końca 2026, odbiór od lutego 2026) potwierdzone z wiedzy, bez cytatu ustawy o VAT (brak lokalnie).

## Do człowieka
| plik:linia | twierdzenie w skrócie | dlaczego nie rozstrzygnięte |
|---|---|---|
| polityka-ai/SKILL.md:41-42, :135; polityka-ai/references/granice.md:176-177 | „AI Act wymaga, żeby ludzie pracujący z AI rozumieli, czego używają” (obowiązek kompetencji AI jako obowiązek rezultatu) | Źródła wtórne (ki-campus.org, 28.07.2026; kilka blogów) podają, że omnibus cyfrowy ws. AI (rozporządzenie (UE) 2026/1744, Dz.Urz. L z 24.07.2026) zmienił art. 4: dostawcy i podmioty stosujące mają „take measures to support the development of AI literacy”, bez wymogu zapewnienia określonego poziomu. EUR-Lex zwrócił pustą stronę, brzmienia urzędowego nie potwierdziłem. Jeśli się potwierdzi, proponowane brzmienie: „AI Act wymaga, żeby firma podejmowała działania wspierające kompetencje AI osób, które z niego korzystają” (obowiązek zostaje, zmienia się jego miara). |
| sprawdz-kontrahenta/references/gdzie-sprawdzic.md:109 | Rejestr Zastawów: konto w PRS, informacja i zaświadczenie płatne „kilkanaście do dwudziestu kilku złotych” | Opłaty z rozporządzenia, nie sprawdziłem aktualnych stawek ani tego, czy samo wyszukiwanie jest bezpłatne. |
| sprawdz-kontrahenta/references/gdzie-sprawdzic.md:37 | Spółka cywilna: „Sprawdź każdego wspólnika osobno w CEIDG” | Wspólnikiem może być też spółka z KRS (SKILL.md:41 mówi „w CEIDG albo w KRS”); niespójność wewnętrzna, nie znalazłem cytatu z aktu do podparcia poprawki. Propozycja: „w CEIDG albo w KRS”. |
| e-doreczenia-w-firmie/SKILL.md:56-58 (linie oznaczone) | firmy z CEIDG sprzed 2025 „miały termin 1 października 2026” | Ustawa: obowiązek uzyskania wpisu „do dnia 30 września 2026 r.” (DOREL art. 152 ust. 3); różnica jednego dnia, skutek ten sam, linie z oznaczeniem, więc nie ruszam. Ta sama rama pomija zawieszenie i wznowienie jako zdarzenie przyspieszające (zob. poprawka do linii 40). |
