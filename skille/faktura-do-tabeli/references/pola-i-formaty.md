# Pola polskiej faktury, warianty nazw i formaty

Ta lista mówi, **gdzie szukać i jak zapisać**. Nie jest treścią do przepisania do odpowiedzi.

---

## Typ dokumentu, ustal go pierwszy

Nagłówek bywa dowolny. Rozpoznawaj po treści, nie po samym tytule.

| Co widzisz | Co to znaczy dla tabeli |
|---|---|
| „Faktura”, „Faktura VAT”, „FV”, „Faktura nr” | zwykła faktura, wiersz normalny |
| „Faktura korygująca”, „Korekta”, „FK” | kwoty bywają ze znakiem minus albo w układzie „przed korektą / po korekcie”. Bierz wartości **po korekcie** lub różnicę, nigdy obu naraz. Zawsze do sekcji „Do sprawdzenia” z numerem faktury pierwotnej |
| „Faktura zaliczkowa”, „Faktura końcowa” | zaliczkowa dokumentuje wpłatę przed dostawą, końcowa rozlicza resztę. Zsumowanie obu podwaja kwotę, oznacz powiązanie i odłóż do decyzji |
| „Duplikat” | odtworzenie dokumentu, który już istnieje. Ryzyko podwójnego zaksięgowania, zawsze do „Do sprawdzenia”, z numerem oryginału |
| „Faktura pro forma”, „Proforma” | **to nie jest faktura.** Nie księguje się jej i nie wchodzi do sum. Wypisz osobno |
| „Faktura VAT RR” | zakup od rolnika ryczałtowego, inny układ pól i inne rozliczenie, oznacz i odłóż |
| „Nota korygująca” | patrz na datę wystawienia. Nota z datą **od 2026-02-01 wzwyż**, zgłoś jako anomalię, nie jako fakturę, bo ten dokument wyszedł wtedy z obiegu. Nota z datą wcześniejszą, w tym ze stycznia 2026, jest normalnym dokumentem z tamtego okresu i nie zgłaszasz jej jako błędu |
| „Nota księgowa”, „Nota obciążeniowa” | dokument bez VAT (np. kara umowna, odsetki). Nie wchodzi do rozbicia na stawki |
| „Rachunek” | wystawiany poza VAT, brak stawek jest normą, nie brakiem danych |
| „Faktura uproszczona” lub paragon z NIP do 450 zł | ma tylko NIP nabywcy, bez nazwy i adresu. **Brak nazwy nabywcy nie jest tu błędem**, nie oznaczaj go jako braku |

Rozstrzygnięcia z tej tabeli („pro formy się nie księguje”, „brak nazwy nabywcy nie jest tu błędem”) są kalibracją **dla Ciebie**, mówią, czego nie zgłaszać i czego nie sumować. Nie przepisujesz ich do odpowiedzi jako werdyktu o prawidłowości dokumentu. W tabeli i w uwagach piszesz, co to za dokument i co z nim zrobiłeś; ocena, czy jest prawidłowy, należy do księgowego. Efekt tej wiedzy ma być widoczny po tym, czego **nie** zgłaszasz.

## Numer faktury

Nagłówki: „Faktura VAT nr”, „Nr faktury”, „Nr dokumentu”, „Numer”.

Polskie numery zawierają ukośniki, miesiąc, rok i zera wiodące: `FV/00123/03/2026`, `123/03/2026`, `F 45/2026`, `2026/04/0087`. **Przepisz znak w znak.** Skrócenie do `123` uniemożliwia dopasowanie płatności i rozliczeń.

## Numer KSeF, nowe pole, którego nie ma na starszych fakturach

Obowiązek wystawiania e-faktur wchodzi **w trzech etapach**, nie w dwóch:

- **1 lutego 2026**, podatnicy o sprzedaży powyżej 200 mln zł,
- **1 kwietnia 2026**, pozostali,
- **1 stycznia 2027**, najmniejsi wystawcy, ze sprzedażą miesięczną do 10 000 zł.

Odbierać faktury z systemu muszą natomiast **wszyscy już od 1 lutego 2026**, obowiązek odbioru i obowiązek wystawiania to dwie różne daty.

Na wizualizacji PDF pojawia się osobny **numer KSeF**: 35 znaków w układzie `NIP-RRRRMMDD-XXXXXXXXXXXX-CC`, dziesięć cyfr NIP-u sprzedawcy, ośmioznakowa data, dwanaście znaków części technicznej i dwa znaki sumy kontrolnej na końcu. Przykład: `5265877635-20250826-0100001AF629-AF`. Obok bywa kod QR.

Trzy rzeczy do zapamiętania:

- Numer KSeF **to nie jest numer faktury.** Numerem do księgowania pozostaje własny numer wystawcy. Jeśli użytkownik prosi o kolumnę z numerem KSeF, dodaj ją osobno.
- Data wystawienia i data przesłania do systemu mogą się różnić, gdy faktura powstała w trybie offline. Do kolumny „Data wystawienia” bierz **datę wystawienia z treści faktury**.
- Brak numeru KSeF na dokumencie z 2026 roku nie jest sam w sobie błędem (faktury dla konsumentów i część przypadków szczególnych zostają poza systemem). Nie komentuj tego jako nieprawidłowości, najwyżej odnotuj brak pola. U najmniejszych dostawców, tych ze sprzedażą miesięczną do 10 000 zł, brak numeru KSeF przez **cały 2026 rok jest normą**, bo ich obowiązek zaczyna się dopiero w 2027. Faktura od małego warsztatu czy jednoosobowej usługi z połowy 2026 roku bez numeru KSeF to sytuacja typowa, nie anomalia.

## Daty

| Pole tabeli | Warianty na dokumencie |
|---|---|
| Data wystawienia | „Data wystawienia”, „Miejscowość i data”, „Data i miejsce wystawienia”, „Wystawiono dnia” |
| Data sprzedaży | „Data sprzedaży”, „Data dostawy”, „Data wykonania usługi”, „Data zakończenia dostawy/usługi”, „Data dokonania dostawy” |

Formaty w obiegu: `2026-04-18`, `18.04.2026`, `18-04-2026`, `18/04/2026`, `18 kwietnia 2026`. Zapisuj zawsze `2026-04-18`.

**Data sprzedaży bywa podana samym miesiącem** („04.2026”, „kwiecień 2026”), to poprawne przy usługach ciągłych. Zapisz `2026-04` i nie dopisuj dnia.

Częsty i ważny przypadek: faktura wystawiona w kolejnym miesiącu po sprzedaży (np. sprzedaż 31.03, wystawienie 10.04). To normalne. **Nie „poprawiaj” daty sprzedaży na datę wystawienia**, od niej zależy, w którym miesiącu dokument trafia do ewidencji.

Przypadek odwrotny jest równie normalny: **fakturę wolno wystawić na długo przed dostawą lub wykonaniem usługi**, nawet około dwóch miesięcy wcześniej. Przy abonamentach, przedpłatach, czynszach z góry i zamówieniach składanych z wyprzedzeniem data sprzedaży późniejsza od daty wystawienia to codzienność, a nie błąd do zgłoszenia. Zgłaszasz dopiero różnicę wyraźnie większą, szczegóły w `kontrole.md`.

Gdy data sprzedaży nie występuje w ogóle, oznacza to zwykle, że jest równa dacie wystawienia. Możesz to zapisać, ale dopisz w uwagach, że pola nie było.

## Strony transakcji

Polska faktura ma często **trzy strony**, nie dwie: „Sprzedawca”, „Nabywca” i „Odbiorca”. Nabywca to ten, na kogo idzie faktura; Odbiorca to miejsce dostawy albo oddział. Do kolumny „Nabywca” bierz **Nabywcę**. Odbiorcę pomiń albo dodaj osobną kolumnę, jeśli użytkownik o to prosił.

Warianty nagłówków: „Sprzedawca” / „Wystawca” / „Dostawca”, „Nabywca” / „Kupujący” / „Płatnik”.

Nazwy firm: zachowaj formę prawną (sp. z o.o., S.A., sp.k., sp.j., P.P.H.U.) i nie rozwijaj skrótów. W grupach kapitałowych nazwy różnią się jednym słowem i pomyłka jest wtedy niewidoczna.

## NIP i inne numery

NIP to **dziesięć cyfr**. Na fakturach: `1234563218`, `123-456-32-18`, `123-45-63-218`, a przy transakcjach unijnych z prefiksem `PL1234563218`. Zapisuj same cyfry, prefiks kraju zachowaj tylko w osobnej kolumnie, jeśli użytkownik jej chce.

Nie myl z sąsiednimi polami: **REGON** ma 9 lub 14 cyfr, **KRS** 10 cyfr z zerami wiodącymi, **BDO** 9 cyfr. Wszystkie potrafią stać obok NIP w stopce.

Zanim wpiszesz NIP, sprawdź jego sumę kontrolną: **pomnóż dziewięć pierwszych cyfr** przez wagi 6, 5, 7, 2, 3, 4, 5, 6, 7 (waga na cyfrę, po kolei), zsumuj iloczyny i weź resztę z dzielenia przez 11, musi być równa **cyfrze dziesiątej**. Reszta równa 10 oznacza, że numer jest nieprawidłowy: cyfra kontrolna nigdy nie jest dwucyfrowa, więc taki układ cyfr po prostu nie jest poprawnym NIP-em. Jeśli się nie zgadza, najczęściej OCR przestawił lub pomylił cyfrę (`0` z `O`, `1` z `7`, `5` z `6`). Wtedy: nie poprawiaj samodzielnie, wpisz to, co widzisz, i zgłoś w „Do sprawdzenia”.

## Kwoty

Polski zapis: przecinek dziesiętny, spacja lub kropka w tysiącach, `1 234,56`, `1.234,56`, `12 345,00 zł`. **Kropka w polskiej fakturze prawie nigdy nie jest przecinkiem dziesiętnym.** `1.234` to tysiąc dwieście trzydzieści cztery, nie jeden i 234 tysięczne.

Waluta: „zł”, „PLN”, rzadziej „EUR”, „USD”. Jeśli waluta jest inna niż złoty, przepisz kwoty w walucie oryginalnej i wpisz walutę do kolumny. **Nie przeliczaj po kursie**, właściwy kurs zależy od dnia i tabeli, a pomyłka tutaj przenosi się na całą deklarację. Faktura walutowa dla polskiego nabywcy ma zwykle dodatkowo kwotę VAT przeliczoną na złote; jeśli ją widzisz, wpisz do uwag jako wartość odczytaną.

Kwota słownie („słownie: dwa tysiące czterysta sześćdziesiąt złotych 00/100”) to najlepsza kontrola krzyżowa brutto, jaką daje polska faktura. Używaj jej zawsze, gdy jest.

## Stawki VAT i rozbicie

Stawki spotykane najczęściej: **23, 8, 5, 4, 0, zw, np, oo**. Na fakturze VAT RR pojawia się dodatkowo **7**, zryczałtowany zwrot podatku doliczany rolnikowi ryczałtowemu.

- `4`, usługi taksówek osobowych rozliczane ryczałtem. Stawka rzadka, ale realnie stoi na fakturach kosztowych małych firm. Przepisz ją tak, jak jest; nabywca rozlicza taką fakturę inaczej niż zwykłą, więc wciśnięcie jej w 8 albo w 23 psuje ewidencję.
- `7`, spotykana na fakturze VAT RR (zakup od rolnika ryczałtowego), nie jest zwykłą stawką sprzedaży.
- `0`, stawka zerowa (np. eksport, dostawa wewnątrzwspólnotowa). VAT wynosi zero, ale transakcja jest opodatkowana.
- `zw`, zwolnienie.
- `np`, nie podlega opodatkowaniu w kraju.
- `oo`, odwrotne obciążenie, podatek rozlicza nabywca.

Cztery ostatnie przypadki, `0`, `zw`, `np`, `oo`, dają zero w kolumnie VAT i **wyglądają identycznie w tabeli, choć znaczą co innego**. Dlatego stawkę przepisuje się dosłownie, a nie sprowadza do liczby.

**Ta lista nie jest zamknięta.** Jeśli na dokumencie stoi oznaczenie stawki spoza wyliczenia, przepisz je dosłownie i zgłoś pozycję w „Do sprawdzenia ręcznie”. Nie naginaj stawki do najbliższej znanej i nie traktuj jej automatycznie jako błędu odczytu, nieznana stawka to informacja dla księgowego, a podmieniona stawka to błąd w ewidencji.

Tabelka podsumowania na dole faktury („W tym”, „Podsumowanie VAT”, „Razem wg stawek”) to gotowe źródło rozbicia, bierz ją stamtąd, a nie z sumowania pozycji, jeśli obie są dostępne. Gdy się różnią, jest to rozbieżność do zgłoszenia.

## Płatność

| Pole tabeli | Warianty |
|---|---|
| Termin płatności | „Termin płatności”, „Płatne do”, „Zapłata do dnia”, „Termin zapłaty” |
| Sposób zapłaty | „Sposób zapłaty”, „Forma płatności”, „Sposób płatności”, „Płatność” |

Wartości typowe: „przelew”, „przelew 14 dni”, „przelew 30 dni”, „gotówka”, „za pobraniem”, „karta”, „kompensata”, „płatne przy odbiorze”, „zapłacono”, „zapłacono gotówką”.

Dwie pułapki:

- **„Zapłacono” i „Zapłacono gotówką” to nie jest termin płatności.** Taka faktura nie tworzy zobowiązania. Wpisanie jej do listy „do zapłaty” kończy się drugą zapłatą tej samej kwoty. Zaznacz w uwagach.
- Termin bywa podany jako liczba dni, nie jako data. Możesz wyliczyć datę od daty wystawienia, ale **oznacz, że to Twoje wyliczenie**, bo część wystawców liczy dni od daty sprzedaży albo od doręczenia.

Pola pokrewne, które łatwo pomylić z kwotą do zapłaty: „Zapłacono”, „Wpłacono”, „Zaliczka”, „Pozostało do zapłaty”. Do kolumny „Brutto” bierz wartość całej faktury, nie kwotę pozostałą.

## Rachunek bankowy

Polski numer to **26 cyfr**, zapisywany grupami: `12 3456 7890 1234 5678 9012 3456`. W obrocie zagranicznym poprzedzony `PL`. Zapisuj same cyfry bez spacji, prefiks zachowaj tylko przy rachunku zagranicznym.

Na fakturze bywa **kilka rachunków** (złotowy, walutowy, rachunek VAT, rachunek do split payment). Jeśli jest więcej niż jeden, nie wybieraj, wpisz ten opisany jako właściwy do zapłaty i zgłoś resztę w uwagach.

## Adnotacje, które zmieniają sposób zapłaty lub ujęcia

Nie oceniasz ich, nie tłumaczysz przepisów i nie powołujesz podstawy prawnej. Przepisujesz adnotację dosłownie do uwag, **dopisujesz jedno zdanie o tym, co z niej praktycznie wynika**, i kierujesz pozycję do sekcji „Do sprawdzenia”. Samo hasło przepisane bez skutku jest dla odbiorcy bezużyteczne: „mechanizm podzielonej płatności” nic nie mówi osobie, która robi przelewy, a „tę fakturę trzeba zapłacić w szczególny sposób” mówi wszystko, czego potrzebuje, żeby zapytać księgową. Skutek, tak; przepis, artykuł i nazwa ustawy, nigdy.

- **„mechanizm podzielonej płatności”**, dotyczy faktur **powyżej 15 000 zł** należności ogółem (faktura dokładnie na 15 000,00 zł jeszcze się nie łapie) za towary i usługi wrażliwe: usługi budowlane, stal i wyroby metalowe, elektronika, paliwa, części samochodowe. Skutek do dopisania: takiej faktury nie płaci się zwykłym przelewem, kwota podatku idzie osobno, na rachunek VAT sprzedawcy. Zawsze zgłaszaj.
- **„metoda kasowa”**, skutek: dokument rozlicza się w miesiącu zapłaty, nie w miesiącu wystawienia, więc sama data faktury nie wystarczy do ujęcia.
- **„odwrotne obciążenie”**, skutek: podatek rozlicza nabywca, sprzedawca nie dolicza go do kwoty.
- **„samofakturowanie”**, skutek: fakturę wystawił nabywca w imieniu sprzedawcy, więc numeracja i układ pól bywają inne niż u sprzedawcy.
- **„procedura marży”**, skutek: podatek liczony jest od marży, a nie od całej kwoty, więc rozbicie na stawki wygląda inaczej niż zwykle i nie zgadza się z prostym rachunkiem netto × stawka.
- **„WDT”, „wewnątrzwspólnotowa dostawa towarów”, „eksport”**, transakcja zagraniczna przy stawce 0.
- Oznaczenia **GTU_01 … GTU_13**, bywają drukowane na fakturze, ale nie są jej obowiązkową częścią. Jeśli są, przepisz do osobnej kolumny. **Sam ich nie przypisuj.**
