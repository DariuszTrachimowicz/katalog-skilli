# Recenzja merytoryczna, cykl 1: rodo-dokumentacja

Perspektywa: inspektor ochrony danych obsługujący małe firmy (kilka do kilkudziesięciu osób, biura rachunkowe, sklepy, gabinety).

Źródło prawdy: `katalog-skilli/testy/rodo-dokumentacja/weryfikacja-zrodlowa.md` (przeczytane w całości, łącznie z sekcją „Niepotwierdzone", pozycje 1-8).

Przeczytane w całości: `skille-platne/rodo-dokumentacja/SKILL.md`, `references/stan-prawny.md`, `references/komponenty.md`, `references/granice.md`, `assets/przyklady/rejestr-czynnosci-przyklad.md`, `DANE-I-PRYWATNOSC.md`, `INSTALACJA.md`.

---

## 1. Co jest zrobione dobrze (żeby nie naprawiać tego, co działa)

Weryfikacja pokrycia poszczególnych bloków wypadła czysto i warto to zapisać, bo to jest trzon produktu:

- **Elementy obowiązkowe rejestru administratora**: `references/komponenty.md:313-325` i `references/stan-prawny.md:113-128` odtwarzają komplet siedmiu elementów z Faktu 3 (weryfikacja-zrodlowa.md:41-49), z zachowaniem zastrzeżeń „gdy ma to zastosowanie" i „jeżeli jest to możliwe". Otwartość katalogu i lista elementów dodatkowych (`stan-prawny.md:130-134`) pokrywa się z weryfikacja-zrodlowa.md:51.
- **Różnica rejestru kategorii czynności**: `komponenty.md:371-383` i `stan-prawny.md:171-192` wiernie oddają Fakt 4 (weryfikacja-zrodlowa.md:65-76), łącznie z twardym zakazem łączenia obu rejestrów w jedną tabelę (`komponenty.md:398-400`). To jest najczęstszy błąd konstrukcyjny u biur rachunkowych i skill go łapie.
- **Odbiorca a osoba upoważniona**: `stan-prawny.md:161-165`, `komponenty.md:258-261`, `przyklad:141-144` pokrywają Fakt 3 akapit ostatni (weryfikacja-zrodlowa.md:55). Rozróżnienie jest przeprowadzone konsekwentnie przez trzy dokumenty naraz.
- **Forma rejestru i brak obowiązku publikacji**: `stan-prawny.md:213-229`, `komponenty.md:276-287` pokrywają Fakt 5 (weryfikacja-zrodlowa.md:86-90). Odpowiedź na żądanie kontrahenta „przyślijcie rejestr" jest praktycznie przydatna i poprawnie zakotwiczona.
- **Ocena ryzyka a ocena skutków**: `stan-prawny.md:335-370`, `komponenty.md:436-451` odpowiadają Faktowi 10 (weryfikacja-zrodlowa.md:162-169). Szkielet czterech etapów jest wzięty ze źródła, a nie wymyślony, a skill wprost mówi, że metody nie narzuca przepis. To NIE jest udawanie metodyki: nie ma punktacji, nie ma iloczynów, nie ma progów, pole decyzji zostaje puste (`komponenty.md:495-503`). Zakaz „lżejszej oceny skutków" jest postawiony osobno (`granice.md:97-98`).
- **Adres i nazwa komunikatu o wykazie**: `stan-prawny.md:376-397` i `komponenty.md:508-517` zgodne z Faktem 11 (weryfikacja-zrodlowa.md:179-187), z twardym zakazem przenoszenia treści wykazu.
- **Terminy zgłoszeń**: `stan-prawny.md:409-426` zgodne z Faktem 12 (weryfikacja-zrodlowa.md:197-205), łącznie z tym, że podmiot przetwarzający zgłasza administratorowi, że dopuszczalne jest zgłoszenie sukcesywne i że termin podaje się REGUŁĄ, bez wyliczania daty dziennej.
- **Adresy**: wszystkie adresy występujące w skillu sprawdzone jeden po drugim wobec rejestru źródeł weryfikacji. Nie znalazłem ani jednego adresu spoza źródła (uwaga o dwóch adresach spoza własnej tabeli skilla: usterka D10, ale oba są potwierdzone w Fakcie 13).
- **Sekcja „Niepotwierdzone"**: pozycje 1, 2, 4, 5, 6, 7, 8 obsłużone poprawnie. Sprawdzone punktowo: reguła „co najmniej dwa kryteria" nie występuje w skillu nigdzie poza własnym zakazem (`stan-prawny.md:500-502`); nie ma twierdzenia o dedykowanym poradniku dla MŚP; nie ma twierdzenia o wykazie operacji niepodlegających ocenie skutków; „rejestr luk" jest wszędzie opisany jako nazwa robocza (`SKILL.md:156-158`, `komponenty.md:39-41`, `komponenty.md:711-714`); cztery wymagania funkcjonalne upoważnienia podane bez cudzysłowu, z jawnym zakazem cytowania (`stan-prawny.md:322-325`); pułapka deregulacyjna obsłużona znacznikiem, bez twierdzenia w którąkolwiek stronę (`stan-prawny.md:291-306`, `komponenty.md:560-575`).

---

## 2. Usterki BLOKER

### BLOKER 1. Upoważnienia przedstawione jako obowiązek, źródło mówi „może"

**Gdzie.** `references/komponenty.md:547-548` („Kto dostaje upoważnienie: osoby mające dostęp do danych wewnątrz firmy, w tym pracownicy, praktykanci i stażyści"), `references/komponenty.md:702-704` („Osoby mające dostęp do danych wewnątrz firmy obejmuje się upoważnieniem niezależnie od podstawy współpracy"), pośrednio `SKILL.md:140`.

**Rozjazd ze źródłem.** Fakt 7 (weryfikacja-zrodlowa.md:119) brzmi: „wydawanie upoważnień MOŻE BYĆ jednym ze środków organizacyjnych" oraz „Administrator MOŻE nadal wydawać upoważnienia osobom mającym dostęp do danych, w tym pracownikom, praktykantom i stażystom". Źródło opisuje upoważnienie jako jeden z możliwych środków organizacyjnych, nie jako obowiązek i nie jako jedyny sposób wykazania kontroli nad dostępem. Skill zamienia to na normę: sformułowanie „obejmuje się upoważnieniem" jest zdaniem o obowiązku, a nagłówek „Kto dostaje upoważnienie" domyka listę adresatów, jakby wynikała z przepisu.

**Dlaczego to bloker, a nie kosmetyka.** Po pierwsze, to rozjazd z Faktem 7 w tym samym miejscu, które recenzja miała sprawdzić (wymagania upoważnień). Po drugie, łamie zasadę naczelną nr 2 samego skilla (`SKILL.md:42-48`, zakaz orzekania o obowiązku) i regułę trzecią z `stan-prawny.md:28-34`. Po trzecie, konsekwencja praktyczna jest realna: firma, która wykazuje kontrolę nad dostępem inaczej (role w systemie, umowa o pracę z klauzulą poufności plus rejestr uprawnień w systemie), dostaje z dokumentu komunikat, że jest niezgodna, i produkuje stos papieru zamiast domknąć rzeczywisty dostęp. Uczy złego nawyku: papier zamiast kontroli.

**Propozycja.** W `komponenty.md:547` zmienić nagłówek na „Kogo obejmuje się upoważnieniem, jeżeli firma stosuje ten środek", a przed listą dopisać jedno zdanie ze źródła: wydawanie upoważnień jest jednym z możliwych środków organizacyjnych służących kontroli nad dostępem do danych, a nie osobnym obowiązkiem dokumentacyjnym; wybór tego środka należy do firmy. W `komponenty.md:702-704` zmienić „obejmuje się upoważnieniem" na „jeżeli firma prowadzi upoważnienia, obejmuje nimi wszystkie osoby mające dostęp, niezależnie od podstawy współpracy, bo inaczej ewidencja nie odpowiada stanowi faktycznemu". Zdanie o tym, że skill nie rozstrzyga, czy firma ma obowiązek nadawać upoważnienia, dołożyć do listy granic w `SKILL.md:303-337`.

### BLOKER 2. Wzór formy zawiera gotowy do przeklejenia wiersz dla sklepu, a `granice.md` twierdzi, że nie zawiera

**Gdzie.** `assets/przyklady/rejestr-czynnosci-przyklad.md:121` (wiersz 1: „Obsługa zamówień w sklepie internetowym", cel, kategorie osób, kategorie danych, trzej odbiorcy, pełny opis środków bezpieczeństwa, właściciel procesu) wobec `references/granice.md:211-213`: „Plik `assets/przyklady/rejestr-czynnosci-przyklad.md` jest wzorem FORMY: pokazuje układ kolumn i sens każdej z nich na fikcyjnej firmie, **celowo bez treści nadającej się do podmiany nazwy**". Podobnie `SKILL.md:229-230` i preambuła samego pliku (`przyklad:3-8`: „Każde pole zależne od realiów firmy zawiera opis tego, co ma się w nim znaleźć, a nie gotową treść").

**Na czym polega problem.** Trzy miejsca w skillu opisują ten plik nieprawdziwie. Wiersz 1 nie jest opisem pola, tylko kompletną, sensowną treścią dokładnie dla najczęstszego profilu klienta tego skilla: mikro sklep internetowy z kurierem i biurem rachunkowym. Sześć z jedenastu komórek da się przenieść bez jednej zmiany. To jest dokładnie ta „gotowa pozycja do podmiany nazwy", której odmawia `granice.md:203-208` (scenariusz 9). Model pod naciskiem („daj gotowy rejestr dla sklepu, dopasujemy sami") czyta odmowę i jej uzasadnienie, po czym w katalogu obok ma materiał, który tę odmowę unieważnia; użytkownik, któremu skill uczciwie pokaże wzór formy, ma jeszcze prościej.

**Dlaczego to bloker.** Skutek jest tożsamy z awarią, przed którą ten produkt ma chronić: rejestr opisujący firmę wymyśloną. Ryzyko dla klienta jest największe przy pierwszym pytaniu z zewnątrz, bo wiersz wygląda profesjonalnie i nikt go nie zweryfikuje. Dodatkowo `granice.md` to plik, który model czyta w chwili nacisku, więc nieprawdziwe zdanie o własnym zabezpieczeniu jest tam najgorzej ulokowane.

**Ocena bezpieczeństwa treści osobno: tu jest dobrze.** W całym pliku nie ma danych osobowych, osoby występują rolami („Osoba prowadząca sprzedaż"), firma jest fikcyjna i nazwana jako fikcyjna (`przyklad:61-65`), dwie komórki celowo pokazują `[UZUPEŁNIJ]` z uzasadnieniem (`przyklad:121`). Forma jest realistyczna: kolumny odpowiadają elementom obowiązkowym, poziom szczegółowości środków bezpieczeństwa jest właściwy dla małej firmy i nie ujawnia konfiguracji.

**Propozycja (tania, jedno z dwóch).** Wariant A, preferowany: zamienić treść komórek wiersza 1 na opisy poziomu szczegółowości zamiast gotowych zdań, na przykład w kolumnie celu „jedno zdanie: po co firma wykonuje tę czynność, językiem firmy, na przykład realizacja i dostarczenie zamówienia", a w kolumnie odbiorców „wymienione kategorie podmiotów zewnętrznych, po jednej frazie, bez nazw własnych". Wtedy zdanie z `granice.md:212` staje się prawdziwe. Wariant B, minimalny: usunąć zdanie „celowo bez treści nadającej się do podmiany nazwy" z `granice.md:212-213` i zastąpić je ostrzeżeniem, że wiersz ilustracyjny jest kompletny i dlatego jego przeniesienie do dokumentu klienta jest zakazane w każdej sytuacji, plus dołożyć tę pozycję do listy kontrolnej w `komponenty.md:807-853` („czy w dokumencie nie ma ani jednej wartości z pliku wzorca").

---

## 3. Usterki DROBNE

**D1. Inwentaryzacja gubi podpowierzenia.** `komponenty.md:193` (tabela inwentaryzacji) i `komponenty.md:340` (tabela wariantu A) nie mają kolumny o podpowierzeniu, a wywiad (`komponenty.md:152-182`) nie ma o nie pytania. Kolumna istnieje wyłącznie w wariancie B (`komponenty.md:385`). Tymczasem źródło wymienia „dane kontaktowe podmiotu przetwarzającego i podmiotów, którym podpowierzono przetwarzanie" jako dopuszczony element dodatkowy rejestru administratora (weryfikacja-zrodlowa.md:51, przeniesione poprawnie do `stan-prawny.md:133-134`, ale nigdzie niewykorzystane). Praktycznie: w małej firmie podpowierzenie jest regułą, nie wyjątkiem (biuro rachunkowe trzyma dokumenty w chmurze, dostawca sklepu u hostingodawcy, kurier korzysta z podwykonawcy), i to jest pierwsze pytanie audytora po „komu przekazujecie dane". Propozycja: dopisać pytanie 7a do wywiadu inwentaryzacji („czy firma wie, komu ci odbiorcy przekazują dane dalej i czy ma to spisane") oraz kolumnę „Podpowierzenie: czy wiadomo, komu dalej (dodatek)" w wariancie A, z domyślną wartością „nie ustalono" zamiast pustej, plus stała pozycja w Rejestrze luk.

**D2. Nagłówek kolumny podmienia nazwę elementu obowiązkowego.** `komponenty.md:340`, `przyklad:107`, `przyklad:119` używają nagłówka „Przekazanie poza Europejski Obszar Gospodarczy". Źródło (weryfikacja-zrodlowa.md:47, 69) mówi o przekazaniu „do państwa trzeciego lub organizacji międzynarodowej"; pojęcie Europejskiego Obszaru Gospodarczego nie pada w źródle ani razu, więc jest to wiedza własna wprowadzona wbrew regule czwartej z `stan-prawny.md:36-42`. Lista elementów obowiązkowych jest za to wierna (`komponenty.md:319-321`), więc to usterka nagłówka, nie brak elementu. Propozycja: nagłówek „Przekazanie do państwa trzeciego lub organizacji międzynarodowej", a wyrażenie „poza Europejskim Obszarem Gospodarczym" zostawić wyłącznie jako wyjaśnienie potoczne w pytaniach wywiadu.

**D3. Lista kontrolna zakazuje tego, co szablon nakazuje.** `komponenty.md:812-813` wymaga: „Czy w żadnym dokumencie nie ma numeru artykułu, ustępu ani **tytułu aktu prawnego**?", podczas gdy obowiązkowe odesłanie w Prostej analizie ryzyka (`komponenty.md:508-512`) zawiera pełną nazwę i miejsce publikacji komunikatu („Monitor Polski z 2019 r. poz. 666"), a `stan-prawny.md:279-284` wprost dopuszcza powoływanie się na ustawy z nazwy. Asystent przy kontroli albo wytnie wymagane odesłanie, albo obleje własną listę. Propozycja: zawęzić punkt listy do „numeru artykułu, ustępu ani innej jednostki redakcyjnej", z dopiskiem, że nazwa i miejsce publikacji aktu w sekcji odesłań i w rejestrze źródeł są dozwolone i wymagane.

**D4. „Wystarczy jedna z tych okoliczności" wchodzi do dokumentu klienta jako zdanie twarde.** `komponenty.md:224` i `przyklad:87` wpisują to zdanie do ramki deklaracji. W źródle to nie jest zdanie organu, tylko „praktyczny wniosek dla skilla" autora weryfikacji (weryfikacja-zrodlowa.md:29). `stan-prawny.md:104-106` sam to widzi i ostrożnie tłumaczy jako opis konstrukcji przepisu, ale ten kontekst nie trafia do dokumentu. W dokumencie, który firma pokaże specjaliście, płaskie zdanie o skutku przesłanek czyta się jak wykładnia narzędzia. Propozycja: w ramce zapisać „Z konstrukcji przesłanek wynika, że są to okoliczności rozłączne; rozstrzygnięcie, czy któraś zachodzi, należy do firmy i jej specjalisty", a samo zdanie o wystarczalności jednej okoliczności zostawić asystentowi do rozmowy.

**D5. Reguły upoważnień bez pokrycia w źródle wpisywane do dokumentu.** `komponenty.md:668-669`: „upoważnienie nadaje się konkretnej osobie, nigdy stanowisku ani zespołowi, i w zakresie najwęższym wystarczającym do pracy", w bloku „Zasady, które wpisujesz zawsze". Żadne z tych dwóch twierdzeń nie występuje w weryfikacji źródłowej. Merytorycznie są to dobre praktyki i podpisuję się pod nimi jako praktyk, ale w dokumencie klienta stoją jak norma prawna. Propozycja: poprzedzić blok zdaniem „zasady przyjęte w tym pakiecie dokumentów, służące rozliczalności" i przenieść je z rejestru zdań kategorycznych do rekomendacji.

**D6. Liczba 12 kategorii bez zastrzeżenia o pochodzeniu.** `stan-prawny.md:380-381` stwierdza, że wykaz obejmuje 12 kategorii. Niepotwierdzone pozycja 3 (weryfikacja-zrodlowa.md:276) mówi wprost, że liczba pochodzi ze stron opisowych UODO, a nie z odczytanego tekstu aktu. Zdanie żyje wyłącznie w pliku wewnętrznym i nie ma prawa trafić do dokumentu, więc szkoda jest mała, ale zastrzeżenie kosztuje pół linijki. Propozycja: „wykaz obejmuje kilkanaście kategorii rodzajów operacji; liczby i treści kategorii nie podajesz, odsyłasz pod adres".

**D7. Prosta analiza ryzyka oddawana z pustymi kolumnami ocen.** `komponenty.md:484-493`: obie kolumny ocen zostają jako `[UZUPEŁNIJ: ocena firmy]`. Powód jest słuszny (skill nie orzeka o poziomie ryzyka), ale efektem jest tabela, w której nie ma ani jednej oceny, czyli praca domowa, nie analiza. W praktyce takie dokumenty leżą niewypełnione latami i przy pierwszym pytaniu wyglądają gorzej niż brak dokumentu. Propozycja: dopisać do sekcji 3 instrukcję, żeby asystent przeszedł z firmą wiersz po wierszu w tej samej sesji, zapisał wypowiedzianą ocenę jako „ocena firmy z rozmowy z dnia [data], do potwierdzenia podpisem", a `[UZUPEŁNIJ]` zostawił tylko tam, gdzie firma świadomie odmówiła oceny. To nie jest orzekanie: ocenę nadal wypowiada firma, skill ją tylko protokołuje.

**D8. Ewidencja upoważnień bez pola na zwrot rzeczy i bez miejsca oryginału.** `komponenty.md:657-659`. Kolumna odebrania dostępów w systemach jest i to jest mocny punkt (najczęstsza rozbieżność praktyki z papierem). Brakuje jednak dwóch pól, które przy odejściu pracownika są potrzebne tego samego dnia: zwrotu nośników, kluczy do szafy i dokumentów papierowych (skill sam wymienia je w pułapce `komponenty.md:693-695`, ale bez kolumny nikt tego nie odnotuje) oraz miejsca przechowywania podpisanego oryginału upoważnienia, bez którego rozliczalność jest deklaracją. Propozycja: dwie kolumny, „Zwrot nośników, kluczy i dokumentów (data, kto przyjął)" oraz „Gdzie jest podpisany oryginał lub plik".

**D9. Deklaracja o zwolnieniu poniżej 250 osób w dwóch dokumentach naraz.** Identyczna ramka stoi w Inwentaryzacji (`komponenty.md:210-233`) i w Rejestrze czynności (`przyklad:74-96`), bez wskazania, który egzemplarz jest wiodący. Dwie kopie deklaracji z osobnymi datami i podpisami rozjeżdżają się przy pierwszej aktualizacji, a przy kontroli dwie różne deklaracje firmy w dwóch dokumentach to gorsza sytuacja niż jedna. Propozycja: ramka mieszka w Inwentaryzacji przetwarzań, a rejestr zawiera jednozdaniowe odesłanie „stanowisko firmy wobec zwolnienia zapisano w dokumencie Inwentaryzacja przetwarzań, wersja [x] z dnia [data]".

**D10. Dwa adresy poza własnym rejestrem źródeł.** `stan-prawny.md:449-450` odsyła pod https://uodo.gov.pl/pl/615 i https://uodo.gov.pl/pl/645, a reguła w tym samym pliku (`stan-prawny.md:523-525`) mówi, że adresów spoza tabeli się nie używa. Oba adresy są potwierdzone w źródle (weryfikacja-zrodlowa.md:224-225), więc to usterka porządkowa, nie faktograficzna. Propozycja: dopisać oba jako pozycje 28 i 29 tabeli rejestru źródeł.

**D11. Współadministrowanie ląduje w Rejestrze luk zamiast w rejestrze.** `komponenty.md:166-169` traktuje współadministrowanie wyłącznie jako pozycję do wyjaśnienia. Źródło (weryfikacja-zrodlowa.md:13, Fakt 1) mówi, że obowiązek ciąży na każdym ze współadministratorów, a w rejestrze każdego z nich powinien znaleźć się opis procesów objętych współadministrowaniem. W skillu jest tylko pole w nagłówku (`komponenty.md:331`, `przyklad:52-54`), więc nie widać, KTÓRE pozycje rejestru są objęte współadministrowaniem. Propozycja: dopisać do wariantu A wskazanie, żeby przy każdej takiej czynności odnotować współadministrowanie w kolumnie odbiorców lub osobnym oznaczeniem wiersza, niezależnie od pozycji w Rejestrze luk dotyczącej podziału odpowiedzialności.

---

## 4. Odpowiedzi na cztery pytania zadane recenzji

1. **Czy każde twierdzenie prawne ma pokrycie w źródle.** Elementy obu rejestrów, różnica zakresu rejestru kategorii, przesłanki upadku zwolnienia poniżej 250 osób, forma rejestru, brak obowiązku publikacji, rozgraniczenie oceny ryzyka i oceny skutków, terminy i kanał zgłoszeń oraz wszystkie adresy: pokrycie pełne. Rozjazdy: BLOKER 1 (upoważnienia jako obowiązek zamiast „może"), D2 (nazwa elementu obowiązkowego), D4, D5 (zdania bez pokrycia wpisywane do dokumentów klienta).
2. **Czy coś z sekcji „Niepotwierdzone" weszło jako fakt.** Nie. Wszystkie osiem pozycji obsłużonych, siedem bezbłędnie, jedna (liczba 12 kategorii, D6) bez zastrzeżenia o pochodzeniu i wyłącznie w pliku wewnętrznym.
3. **Użyteczność i złe nawyki.** Komponenty są użyteczne i nie udają metodyki, której nie ma. Gubione są podpowierzenia (D1) i część czynności przy odejściu pracownika (D8); analiza ryzyka wychodzi bez ani jednej oceny (D7); dwa dokumenty niosą tę samą deklarację (D9). Zły nawyk, który skill realnie może wytworzyć: przekonanie, że upoważnienie na papierze jest obowiązkiem samym w sobie (BLOKER 1).
4. **Przykład rejestru.** Formą realistyczny i dobrze zbudowany, treścią bezpieczny (zero danych osobowych, firma fikcyjna, role zamiast nazwisk, brak konfiguracji w opisie zabezpieczeń). Problemem nie jest bezpieczeństwo, tylko to, że wiersz ilustracyjny jest gotowy do przeklejenia, a dwa inne pliki twierdzą, że nie jest (BLOKER 2).

---

## 5. Rekomendacja

Dwa blokery, oba z tanią naprawą redakcyjną, bez potrzeby ruszania konstrukcji skilla ani wracania do źródeł. Jedenaście usterek drobnych, z czego D1, D7 i D8 podnoszą realną wartość produktu dla praktyka i warto je wziąć w tym samym cyklu, a D3 i D10 to sprzeczności wewnętrzne, które i tak wyjdą przy pierwszym użyciu.

WERDYKT cyklu 1: blokery do wydania TAK

---

# Weryfikacja cyklu 2

Data: 24 sierpnia 2026. Sprawdzone na aktualnych plikach w
`skille-platne/rodo-dokumentacja/` (SKILL.md, references/stan-prawny.md,
references/komponenty.md, references/granice.md,
assets/przyklady/rejestr-czynnosci-przyklad.md, DANE-I-PRYWATNOSC.md,
INSTALACJA.md) wobec `weryfikacja-zrodlowa.md` i dyspozycji z
`c1-adjudykacja.md` (T2, T4, T13, T14, T18, T19, T21, T23).

## Werdykt per znalezisko cyklu 1

**BLOKER 1 (upoważnienie jako obowiązek): ZAMKNIĘTY.** Naprawa jest głębsza niż
sama zamiana słów i idzie przez wszystkie warstwy: `references/stan-prawny.md:278-284`
dopisuje wprost, że źródło mówi „może", nie „musi", i zakazuje zamiany tego na
normę oraz sugerowania niezgodności firmy, która wykazuje kontrolę inaczej;
`references/komponenty.md:698-703` otwiera komponent 4 akapitem „środek
organizacyjny, którym firma MOŻE się posłużyć; ten skill go PROJEKTUJE";
`references/komponenty.md:705` zmienia nagłówek na warunkowy („Kogo obejmuje się
upoważnieniem, jeżeli firma stosuje ten środek"); `references/komponenty.md:887-891`
przerabia pułapkę o praktykancie na zdanie warunkowe („Jeżeli firma prowadzi
upoważnienia, obejmuje nimi..."); `references/granice.md:330-334` i `SKILL.md:379-382`
dokładają osobną granicę na pytanie „czy musimy nadawać upoważnienia";
`SKILL.md:179` niesie to samo w tabeli komponentów. Zgodne z Faktem 7
(weryfikacja-zrodlowa.md:119). Bez nowego rozjazdu.

**BLOKER 2 (wiersz gotowy do przeklejenia): ZAMKNIĘTY.** Wybrano wariant A,
mocniejszy: `assets/przyklady/rejestr-czynnosci-przyklad.md:130` to teraz wiersz
opisowy, w którym każda komórka niesie opis TYPU zawartości
(„[UZUPEŁNIJ: kategorie osób wymienione przez firmę, po jednej frazie...]"),
a nie treść dla sklepu; zniknął fikcyjny nagłówek z nazwą spółki, a poziom
szczegółowości przeniesiono do prozy pod tabelą (`przyklad:133-140`), żeby nie
stał w komórkach. Deklaracje o pliku są dziś prawdziwe: `przyklad:10-15`
i `references/granice.md:239-243`. Domknięte kontrolą: `references/komponenty.md:1061-1062`
(„Czy w żadnym dokumencie nie ma ani jednej wartości przeniesionej z pliku
przykładu"). Treść nadal bezpieczna: zero danych osobowych, osoby wyłącznie
rolami.

**D1 podpowierzenia: ZAMKNIĘTE.** Pytanie 7a w wywiadzie
(`references/komponenty.md:240-242`), kolumna „Dalsi podwykonawcy odbiorcy"
w tabeli inwentaryzacji (`komponenty.md:258-260`) z domyślnym „nie ustalono"
zamiast pustki, oraz stała pozycja w Rejestrze luk (`komponenty.md:968`).

**D2 nazwa elementu przekazań: ZAMKNIĘTE.** Nagłówek kolumny brzmi dziś
„Przekazanie do państwa trzeciego lub organizacji międzynarodowej"
(`komponenty.md:436`, `komponenty.md:517`, `przyklad:115`, `przyklad:128`),
a skrót EOG jest jawnie zdegradowany do rozmowy i pytań wywiadu
(`komponenty.md:440-443`, `przyklad:115`). Użycia EOG w wywiadzie
(`komponenty.md:243`, `komponenty.md:360`, `SKILL.md:262`) są zgodne z tą regułą.

**D3 sprzeczność listy kontrolnej: ZAMKNIĘTE.** `komponenty.md:1013-1018` zawęża
zakaz do jednostek redakcyjnych i dopisuje jeden wyjątek dla obowiązkowego
odesłania w sprawie oceny skutków (tytuł komunikatu i Monitor Polski) oraz dla
sekcji „Źródła i data sprawdzenia". Odesłanie z `komponenty.md:657-663` nie
koliduje już z własną kontrolą.

**D4 „wystarczy jedna z okoliczności": ZAMKNIĘTE.** Zdanie jest przypisane do
źródła i osadzone w streszczeniu wskazówek z adresem
(`stan-prawny.md:104-111`, `komponenty.md:411-423`, `przyklad:83-95`), a ramka
jest wprost oznaczona jako STRESZCZENIE wskazówek, nie brzmienie przepisu.
Uwaga marginalna, bez wagi: w źródle jest to „praktyczny wniosek dla skilla"
wyprowadzony z lektury wskazówek, więc najściślejsze byłoby „wniosek z lektury
wskazówek, przyjęty w tym dokumencie"; obecne „Wniosek ze wskazówek" mieści się
w granicy, bo nie przypisuje organowi zdania, którego organ nie napisał.

**D5 reguły upoważnień bez pokrycia: ZAMKNIĘTE.** `komponenty.md:846-849`
poprzedza blok zdaniem, że są to zasady przyjęte w tym pakiecie, a nie norma
prawna, i powtarza, że samo stosowanie upoważnień jest środkiem, o którym
decyduje firma.

**D6 liczba kategorii wykazu: ZAMKNIĘTE.** `stan-prawny.md:421-423` usuwa liczbę
i wprost mówi, że ani liczby, ani treści nie podajesz; `stan-prawny.md:546-549`
rozszerza pozycję zakazową o liczbę („zero liczb").

**D7 puste kolumny ocen: ZAMKNIĘTE.** `komponenty.md:626-636` wprowadza
propozycje wyprowadzone wyłącznie z faktów rozmowy, z uzasadnieniem i statusem
`[DO ZATWIERDZENIA przez firmę]`, oraz zdanie „dokument bez ani jednej oceny to
praca domowa, nie analiza"; kontrola dopilnowuje tego w `komponenty.md:1045-1047`.
Furtka odwrotna zamknięta osobno: poziom „wysoki" nie rozstrzyga o wymogu oceny
skutków (`komponenty.md:638-642`, `stan-prawny.md:385-393`, `granice.md:121-126`,
`SKILL.md:146-151`). Patrz jednak N2 niżej.

**D8 ewidencja upoważnień: ZAMKNIĘTE.** `komponenty.md:826-838` dokłada
„Obowiązuje do", „Status", „Zwrot nośników i kluczy (data, kto)" i „Miejsce
przechowywania oryginału", z uzasadnieniem obu ostatnich; kontrola w
`komponenty.md:1035-1037`.

**D9 zdublowana deklaracja poniżej 250 osób: ZAMKNIĘTE.** Ramka mieszka wyłącznie
w Rejestrze czynności (`komponenty.md:404-406`, `przyklad:76-78`), Inwentaryzacja
ma jednozdaniowe odesłanie z numerem wersji i datą (`komponenty.md:282-290`).

**D10 adresy spoza tabeli: ZAMKNIĘTE i sprawdzone maszynowo.** Wyciągnąłem
wszystkie adresy występujące w pakiecie (35 unikalnych) i zestawiłem z tabelą
`stan-prawny.md:577-612`: każdy ma swoją pozycję, żaden nie jest spoza tabeli,
wszystkie z przedrostkiem `https://`. Deklaracja kompletności z
`stan-prawny.md:614-618` jest prawdziwa.

**D11 współadministrowanie: ZAMKNIĘTE.** `komponenty.md:445-449` nakazuje
oznaczyć wiersz uwagą o pozycji objętej ewentualnym współadministrowaniem
i osobno wpisać ją do Rejestru luk, bez orzekania o podziale odpowiedzialności.
Zgodne z Faktem 1 (weryfikacja-zrodlowa.md:13).

## Kontrola nowych rozjazdów ze źródłem w miejscach przepisanych

**Rejestr źródeł, 34 pozycje.** Sprawdzone wyrywkowo siedem nowych adresów wobec
źródła prawdy, wszystkie potwierdzone: poz. 28 https://uodo.gov.pl/pl/615
(weryfikacja-zrodlowa.md:224), poz. 29 https://uodo.gov.pl/pl/645
(weryfikacja-zrodlowa.md:225), poz. 30
https://monitorpolski.gov.pl/MP/2019/666/M2019000066601.pdf
(weryfikacja-zrodlowa.md:183), poz. 31 https://archiwum.uodo.gov.pl, poz. 32
https://bip.uodo.gov.pl, poz. 33 https://orzeczenia.uodo.gov.pl i poz. 34
https://uodo.gov.pl (wszystkie cztery: weryfikacja-zrodlowa.md:217, Fakt 13).
Opisy w kolumnie „Źródło" nie przypisują tym adresom treści, których źródło nie
potwierdza. Zero adresów zmyślonych.

**Upoważnienie jako środek nieobowiązkowy.** Bez nadkorekty w drugą stronę:
nigdzie nie pojawiło się zdanie, że upoważnień nie trzeba wydawać ani że są
zbędne; skill nadal je projektuje i nadal odmawia rozstrzygania o obowiązku
(`granice.md:330-334`). Znacznik deregulacyjny nietknięty i nadal poprawny wobec
Niepotwierdzonego nr 1 (`stan-prawny.md:315-330`). Usunięto przy okazji
zapewnienia „bezpieczny", „zgodny z wymogami sektorowymi", „daje rozliczalność
w każdym wariancie" (`stan-prawny.md:334-339`, `komponenty.md:736-740`), co było
osobną dyspozycją i nie psuje pokrycia źródłowego.

**Propozycje ocen w Prostej analizie ryzyka.** Wobec źródła czysto: Fakt 10
(weryfikacja-zrodlowa.md:164) mówi, że każdy podmiot musi samodzielnie oceniać
ryzyko, a propozycja ze statusem do zatwierdzenia przez firmę tego nie narusza;
metody nadal nie udajemy (brak punktacji, brak iloczynów, pole decyzji puste).

**Relacje z odbiorcami bez klasyfikowania.** Wdrożone spójnie w sześciu miejscach
(`stan-prawny.md:169-173`, `komponenty.md:236-239`, `komponenty.md:707-714`,
`komponenty.md:868-872`, `przyklad:162-167`, kontrola `komponenty.md:1063-1065`).
Sprawdziłem, czy zdanie „odbiorcami są podmioty zewnętrzne" nie wykracza poza
źródło: nie wykracza, bo element obowiązkowy w brzmieniu źródłowym to „kategorie
odbiorców, którym dane zostały lub zostaną ujawnione"
(weryfikacja-zrodlowa.md:46), więc ujęcie wszystkich podmiotów zewnętrznych
w tej kolumnie jest wykonaniem elementu, a nie klasyfikacją relacji.

## Nowe usterki (wszystkie DROBNE, żadna nie blokuje wydania)

**N1. `SKILL.md:276` opisuje wzór nieaktualnie.** Zdanie „To wzór
z placeholderami i objaśnieniem każdej kolumny, **oparty na fikcyjnej firmie**"
zostało z poprzedniej wersji pliku; fikcyjnej firmy już w nim nie ma. To ten sam
gatunek usterki co BLOKER 2, tyle że nieszkodliwy (zdanie obok nadal zakazuje
przenoszenia wartości). Propozycja: „...objaśnieniem każdej kolumny; w każdej
komórce stoi opis typu zawartości, a nie treść jakiejkolwiek firmy".

**N2. Rozjazd wewnętrzny wokół propozycji ocen.** `stan-prawny.md:410-411` nadal
mówi „Nie orzekasz też o poziomie ryzyka za firmę. Wypełnia go firma", a
`SKILL.md:157-159` wymienia „czy ryzyko jest wysokie" wśród decyzji, przy których
„pole decyzji zostaje puste". Nowy mechanizm z `komponenty.md:626-636` każe te
komórki wypełnić propozycją. Plik stan-prawny czyta się na starcie każdej pracy,
więc asystent może zostawić tabelę pustą i cofnąć T19. Propozycja: w
`stan-prawny.md:410-411` dopisać rozdział poziomów, „poziom ryzyka proponujesz
wyłącznie z faktów rozmowy, ze statusem do zatwierdzenia przez firmę; werdyktu
nie wydajesz, a pole decyzji o postępowaniu z ryzykiem zostaje puste", i w
`SKILL.md:157-159` zawęzić przykład do decyzji o postępowaniu z ryzykiem.

**N3. „Osoby spoza firmy" wypycha zleceniobiorcę.** `granice.md:335` mówi
„Upoważnień nie nadaje się osobom spoza firmy", podczas gdy `komponenty.md:887-891`
każe objąć upoważnieniem zleceniobiorcę, praktykanta i osobę pomagającą w sezonie,
czyli osoby formalnie spoza etatu. Informatyk na własnej działalności to
najczęstszy przypadek graniczny w małej firmie i granice.md może go wypchnąć
z ewidencji. Propozycja: „upoważnień nie nadaje się podmiotom zewnętrznym ani
ich pracownikom; osoby współpracujące z firmą osobiście obejmuje się jak
w komponencie 4, niezależnie od podstawy współpracy".

**N4. `SKILL.md:285-287` nie dostał reguły nieklasyfikowania.** Zdanie „podmiot,
któremu firma powierza przetwarzanie, wpisujesz" przesądza charakter relacji,
czyli dokładnie to, czego zakazuje T21 wdrożony w pozostałych plikach.
Propozycja: „podmiot zewnętrzny, któremu dane są ujawniane, wpisujesz;
charakteru relacji, powierzenie czy odrębne administrowanie, nie klasyfikujesz".

**N5. Niedomknięta konwencja znaczników w dwóch listach braków.**
`SKILL.md:352-353` (punkt kontrolny 10) i `przyklad:181` wymieniają tylko
`[UZUPEŁNIJ]` i `[WYMAGA WERYFIKACJI]`, bez `[UZUPEŁNIJ LOKALNIE]`, choć
`komponenty.md:182-184` i `komponenty.md:1072-1074` obejmują wszystkie trzy.
Propozycja: dopisać trzeci znacznik w obu miejscach.

**N6. Kolejność kolumn ewidencji do sprawdzenia przy składzie.**
`komponenty.md:826-828` ma czternaście kolumn i wiersz przykładowy kończy się
czterema pustymi komórkami w środku tabeli. Merytorycznie poprawne, ale przy
wklejeniu do arkusza łatwo o przesunięcie; warto rozważyć podział na dwie tabele
(nadanie i zamknięcie) albo pozostawienie kresek zamiast pustek. To uwaga
redakcyjna, nie merytoryczna.

## Podsumowanie cyklu 2

Oba blokery merytoryczne zamknięte realnie, nie deklaratywnie; jedenaście usterek
drobnych zamkniętych w całości, część z naprawą szerszą niż proponowana (D7, D9,
D10). Nowe rozjazdy ze źródłem prawdy: brak. Sześć nowych usterek drobnych, z
czego N2 warto wziąć w tym samym wydaniu, bo dotyka mechanizmu wprowadzonego
w tym cyklu, a N1, N3 i N4 to trzy zdania do przeredagowania.

WERDYKT: blokery do wydania NIE
