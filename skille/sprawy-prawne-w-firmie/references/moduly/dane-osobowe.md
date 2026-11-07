# Moduł: Dane osobowe w firmie (RODO na co dzień)

Wczytaj, gdy `mapa-spraw.md` wskazuje ten moduł: wyciek albo inny incydent z danymi, żądanie osoby (dostęp, kopia, usunięcie, sprzeciw), kamery obejmujące klientów, oferty e-mailem, SMS-em i telefonem (także do firm), pismo albo kontrola UODO. Reguły po skutku z podstawą. Stan researchu: 6 listopada 2026.

RODO nie jest wbudowane w `references/akty/`. Jego przepisy piszesz pełną nazwą („rozporządzenie 2016/679 (RODO), art. 33 ust. 1”); te podane niżej sprawdzono 6.11.2026 w tekście urzędowym (adres w sekcji 6) i tylko te wolno przywołać z numerem. Ustawa o ochronie danych osobowych jest wbudowana jako UODO (`akty/UODO.md`). Moduł nie powtarza kopii wąskich skilli, tylko do nich kieruje:
- `katalog/rodo-w-malej-firmie/`: mapa danych, pierwsza godzina po incydencie (`gdy-cos-sie-stalo.md`), pytania po obszarach, w tym monitoring i żądania osób (`pytania-po-obszarach.md`);
- `katalog/rodo-dokumentacja/`: rejestr czynności, upoważnienia, analiza ryzyka i ocena skutków, część „Naruszenia” w `stan-prawny.md` (kanał zgłoszenia, adresy UODO);
- `katalog/zgody-na-stronie-www/zasady.md`: cookies, formularze, sekcja 5 o marketingu;
- `katalog/prawa-autorskie-w-zleceniu/zasady.md`, sekcja 12: zdjęcia i wizerunek.

## 1. Typowe sprawy i pytania firmy

1. Zginął laptop z bazą klientów albo poszedł mail z danymi do złej osoby. Czy i do kiedy zgłaszamy to do UODO?
2. Wyciekły skany dowodów i numery PESEL. Czy musimy zawiadomić klientów?
3. Obsługujemy dane klienta na jego zlecenie (biuro rachunkowe, IT, kadry) i u nas był incydent. Kogo zawiadamiamy?
4. Klient żąda kopii wszystkich swoich danych albo usunięcia konta. Ile mamy czasu i czy możemy odmówić?
5. Ktoś żąda danych, ale nie wiemy, czy to on.
6. Klient napisał, że nie chce więcej ofert. Co dalej z jego danymi?
7. Chcemy zawiesić kamery w sklepie albo salonie. Co z tabliczką i jak długo trzymać nagrania?
8. Rozsyłamy oferty mailem do firm z bazy CEIDG albo z kupionej listy. Czy to wolno?
9. Przyszło pismo z UODO albo zapowiedź kontroli.
10. Były pracownik wyniósł bazę klientów.

## 2. Reguły po skutku z podstawą

**Najpierw rola firmy**
- Ustal rolę firmy dla konkretnego przetwarzania: administrator (sam decyduje o celach i sposobach) albo podmiot przetwarzający (działa na zlecenie innej firmy, z umową powierzenia). Od roli zależy, kto zgłasza naruszenie, kto odpowiada na żądania i komu; zgłoszenie, zawiadomienie osób i odpowiedź na żądanie oceniasz osobno. Szczegóły ról: `katalog/rodo-dokumentacja/stan-prawny.md`.

**Wyciek i inne naruszenie ochrony danych**
- Administrator zgłasza naruszenie Prezesowi UODO bez zbędnej zwłoki, w miarę możliwości nie później niż w 72 godziny po stwierdzeniu naruszenia, chyba że jest mało prawdopodobne, by skutkowało ryzykiem dla praw lub wolności osób; zgłoszenie po 72 godzinach jest możliwe, z wyjaśnieniem przyczyn opóźnienia (rozporządzenie 2016/679 (RODO), art. 33 ust. 1). Zapisz osobno godzinę pierwszego sygnału i godzinę stwierdzenia naruszenia. Konkretnej godziny granicznej nie wyliczasz, dopóki nie wiadomo, kiedy firma stwierdziła naruszenie.
- Podmiot przetwarzający nie zgłasza naruszenia do UODO, tylko po jego stwierdzeniu bez zbędnej zwłoki zawiadamia administratora (rozporządzenie 2016/679 (RODO), art. 33 ust. 2). Sprawdź też termin w umowie powierzenia.
- Zgłoszenie opisuje co najmniej charakter naruszenia (kategorie i przybliżoną liczbę osób i wpisów), kontakt do inspektora albo innej osoby, możliwe konsekwencje i podjęte albo planowane środki (rozporządzenie 2016/679 (RODO), art. 33 ust. 3). Czego nie da się ustalić od razu, przekazuje się sukcesywnie bez zbędnej zwłoki (rozporządzenie 2016/679 (RODO), art. 33 ust. 4); brak części faktów nie jest powodem, żeby czekać z wymaganym zgłoszeniem. Kanał: e-usługa biznes.gov.pl/pl/portal/ou889 (`katalog/rodo-dokumentacja/stan-prawny.md`, część „Naruszenia”).
- Każde naruszenie, jego okoliczności, skutki i działania zaradcze firma dokumentuje także wtedy, gdy go nie zgłasza (rozporządzenie 2016/679 (RODO), art. 33 ust. 5).
- Gdy naruszenie może powodować wysokie ryzyko dla osób, administrator bez zbędnej zwłoki zawiadamia także te osoby, jasnym i prostym językiem, z opisem naruszenia, kontaktem, możliwymi konsekwencjami i środkami (rozporządzenie 2016/679 (RODO), art. 34 ust. 1 i 2). Zawiadomienie nie jest wymagane, gdy dane były skutecznie zabezpieczone (np. szyfrowanie), gdy później zastosowane środki wyeliminowały wysokie ryzyko albo gdy wymagałoby niewspółmiernego wysiłku, ale wtedy potrzebny jest publiczny komunikat albo podobny skuteczny środek (rozporządzenie 2016/679 (RODO), art. 34 ust. 3); Prezes UODO może zażądać zawiadomienia (rozporządzenie 2016/679 (RODO), art. 34 ust. 4). Przy wycieku numerów PESEL osoby mogą od razu zastrzec numer (`katalog/rodo-w-malej-firmie/gdy-cos-sie-stalo.md`, pierwsza godzina).
- Incydent w systemach informatycznych firmy objętej KSC: zgłoszenie z KSC nie zastępuje zgłoszenia do UODO (`moduly/nis2.md`, pkt 37).

**Żądania osób (dostęp, kopia, sprostowanie, usunięcie, sprzeciw)**
- Administrator informuje osobę o działaniach podjętych w związku z żądaniem bez zbędnej zwłoki, najpóźniej w miesiąc od otrzymania żądania; ze względu na skomplikowany charakter albo liczbę żądań termin można przedłużyć o kolejne dwa miesiące, informując o tym osobę w pierwszym miesiącu z podaniem przyczyn (rozporządzenie 2016/679 (RODO), art. 12 ust. 3). Termin liczysz od wpływu żądania do firmy (skrzynka, formularz, list), nie od chwili, gdy ktoś je przeczytał.
- Termin odpowiedzi nie oznacza obowiązku uwzględnienia żądania. Odmowę też trzeba przekazać najpóźniej w miesiąc, z powodami i informacją o skardze do UODO i drodze sądowej (rozporządzenie 2016/679 (RODO), art. 12 ust. 4).
- Przy uzasadnionych wątpliwościach co do tożsamości można zażądać dodatkowych informacji niezbędnych do jej potwierdzenia (rozporządzenie 2016/679 (RODO), art. 12 ust. 6); nie żądaj więcej danych, niż trzeba.
- Odpowiedź jest bezpłatna; przy żądaniach ewidentnie nieuzasadnionych albo nadmiernych (np. ustawicznych) można pobrać rozsądną opłatę albo odmówić, ale to firma musi to wykazać (rozporządzenie 2016/679 (RODO), art. 12 ust. 5).
- Sprzeciw wobec marketingu bezpośredniego można wnieść w każdej chwili, a po nim danych nie wolno już przetwarzać do tego celu (rozporządzenie 2016/679 (RODO), art. 21 ust. 2 i 3). Wpisz osobę na listę wykluczeń i zatrzymaj wszystkie kanały.

**Kamery obejmujące klientów i inne osoby**
- Monitoring klientów to nie to samo co monitoring pracowników. Ustal cel, podstawę (zwykle prawnie uzasadniony interes, np. ochrona mienia, i to tylko wtedy, gdy nagrywanie jest niezbędne, a interes osób nie przeważa: rozporządzenie 2016/679 (RODO), art. 6 ust. 1 lit. f), zakres kadru i czas przechowywania. Sama tabliczka nie zastępuje podstawy.
- Informację podaje się przy zbieraniu danych (rozporządzenie 2016/679 (RODO), art. 13 ust. 1). W praktyce dwie warstwy: znak przy wejściu z najważniejszymi informacjami i pełna informacja dostępna na miejscu, np. przy kasie albo recepcji (Wytyczne EROD 3/2019, pkt 111-117).
- Czas przechowywania uzasadniasz celem i niezbędnością; wytyczne wskazują, że zwykle wystarcza kilka dni, a im dłużej ponad 72 godziny, tym mocniejszego uzasadnienia trzeba (Wytyczne EROD 3/2019, pkt 121). To przykład z wytycznych, nie ustawowy limit.
- Systematyczne monitorowanie na dużą skalę miejsc dostępnych publicznie wymaga oceny skutków przed uruchomieniem (rozporządzenie 2016/679 (RODO), art. 35 ust. 1 i ust. 3 lit. c); zwykły sklep z kilkoma kamerami zwykle tej skali nie osiąga, ale oceń to i zapisz (`katalog/rodo-dokumentacja/`, analiza ryzyka).
- Gdy kamera obejmuje też pracowników, dochodzą wymogi kodeksu pracy, m.in. cel, informacja 2 tygodnie przed uruchomieniem i najwyżej 3 miesiące przechowywania (KP art. 22² § 1, KP art. 22² § 3, KP art. 22² § 7; `moduly/zatrudnienie-na-co-dzien.md`, A42).

**Oferty e-mailem, SMS-em i telefonicznie**
- Informacja handlowa wysyłana e-mailem, SMS-em, komunikatorem albo telefonem wymaga uprzedniej zgody adresata (PKE art. 398 ust. 1). Przepis chroni każdego abonenta i użytkownika końcowego, więc zgoda jest potrzebna także na adresy firmowe; „B2B bez zgody” w Polsce się nie sprawdza (`katalog/zgody-na-stronie-www/zasady.md`, sekcja 5).
- Wysyłka bez zgody jest też czynem nieuczciwej konkurencji (PKE art. 398 ust. 4), a Prezes UKE może nałożyć karę do 3 % przychodu z poprzedniego roku albo do 1 000 000 zł, przy czym stosuje się kwotę wyższą (PKE art. 446 ust. 5).
- Dane osobowe pozyskane nie od osoby (CEIDG, strona firmy, kupiona baza): informację o przetwarzaniu podaje się najpóźniej w miesiąc od pozyskania, a gdy dane służą do komunikacji z osobą, najpóźniej przy pierwszym kontakcie (rozporządzenie 2016/679 (RODO), art. 14 ust. 3). Informacja nie zastępuje uprzedniej zgody na ofertę z PKE art. 398 ust. 1.

**UODO: pismo, kontrola, spór**
- Kontrolę prowadzi upoważniony pracownik Urzędu po okazaniu imiennego upoważnienia z podstawą, zakresem i terminem kontroli (UODO art. 79 ust. 1, UODO art. 81 ust. 1 i 2); sprawdź je przed udostępnieniem dokumentów. Przebieg kontroli: `katalog/kontrola-z-urzedu/`.
- W postępowaniu firma może zastrzec tajemnicę przedsiębiorstwa w dokumentach, przedstawiając też wersję bez zastrzeżonych informacji (UODO art. 65 ust. 1).
- Inspektora ochrony danych wyznacza się w przypadkach z rozporządzenia 2016/679 (UODO art. 8); po wyznaczeniu firma zawiadamia Prezesa UODO w 14 dni (UODO art. 10 ust. 1) i publikuje dane inspektora (UODO art. 11).
- Roszczenia osób z naruszenia ochrony danych rozpatruje sąd okręgowy, a w sprawach nieuregulowanych w RODO stosuje się KC (UODO art. 92, UODO art. 93).
- Przetwarzanie danych bez uprawnienia albo gdy jest niedopuszczalne jest przestępstwem (UODO art. 107 ust. 1); dotyczy to m.in. osoby, która wyniosła i wykorzystuje cudzą bazę. Przy wyniesieniu bazy równolegle: tajemnica przedsiębiorstwa (`moduly/marka-i-tajemnica.md`, ZNK art. 11) i ocena naruszenia u siebie (reguły wyżej).

## 3. Co firma może zrobić sama i jakie pisma przygotuje skill

Działania bez prawnika:
- Pierwsza godzina po incydencie według `katalog/rodo-w-malej-firmie/gdy-cos-sie-stalo.md`: przerwać wyciek, zabezpieczyć ślady, zapisać godziny sygnału i stwierdzenia, ustalić rolę firmy.
- Prowadzić wewnętrzny rejestr naruszeń (także niezgłoszonych) i kalendarz żądań osób z datą wpływu.
- Przygotować tabliczkę i pełną informację o kamerach, ustawić automatyczne nadpisywanie nagrań, zapisać uzasadnienie okresu.
- Uporządkować bazę marketingową: źródło każdego adresu, dowód zgody, lista sprzeciwów.
- Dokumentacja (rejestr czynności, upoważnienia, analiza ryzyka): `katalog/rodo-dokumentacja/`.

Pisma:
1. **Odpowiedź na żądanie osoby (poziom A).** Elementy: data wpływu, czego dotyczy żądanie, podjęte działania (kopia danych, usunięcie, sprostowanie, wpis na listę sprzeciwów), bez danych innych osób. Gdy firma choćby częściowo nie spełnia żądania (np. zachowuje dane z powodu obowiązku księgowego), to odmowa w tym zakresie: pismo poziomu B z punktu 4 z informacją o skardze do UODO i drodze sądowej. Wariant: informacja o przedłużeniu terminu z przyczynami, wysłana w pierwszym miesiącu.
2. **Notatka z naruszenia do rejestru (poziom A, dokument wewnętrzny).** Godzina sygnału i stwierdzenia, co się stało, jakie dane i ilu osób, ocena ryzyka z uzasadnieniem, decyzja o zgłoszeniu i zawiadomieniu, działania zaradcze, osoba odpowiedzialna.
3. **Zgłoszenie naruszenia do Prezesa UODO i zawiadomienie osób (poziom B, projekt przygotowany od razu).** Elementy z rozporządzenia 2016/679 (RODO), art. 33 ust. 3 i art. 34 ust. 2; fakty tylko od użytkownika, nieustalone jako [UZUPEŁNIJ] zamiast zapewnień o braku skutków. Przegląd prawnika albo inspektora idzie równolegle i nie przesuwa terminu; gdy prawnik nie zdąży, mówisz wprost, że decyzja o wysłaniu należy do firmy, a brakujące informacje można przekazać sukcesywnie (rozporządzenie 2016/679 (RODO), art. 33 ust. 4).
4. **Odmowa spełnienia żądania (poziom B).** Powody, informacja o skardze do UODO i drodze sądowej, termin miesiąca.
5. **Odpowiedź na pismo UODO w postępowaniu albo po kontroli (poziom B).** Odpowiedź na każde pytanie po kolei, dokumenty z wykazem, zastrzeżenie tajemnicy przedsiębiorstwa z wersją jawną.
6. **Umowa powierzenia przetwarzania (poziom B).** Jak każda umowa: projekt do przeglądu.

## 4. Sygnały „tylko prawnik”

- Wyciek danych o zdrowiu, dzieci, danych finansowych, dowodów osobistych albo PESEL w większej skali; ransomware albo wyciek u dostawcy obsługującego wielu klientów.
- Postanowienie o wszczęciu postępowania przez Prezesa UODO, kontrola, decyzja z karą: terminy odwołań są krótkie.
- Pozew albo wezwanie osoby z żądaniem odszkodowania za naruszenie ochrony danych.
- Były pracownik albo wspólnik wyniósł bazę (możliwe przestępstwo z UODO art. 107 i czyn z ZNK art. 11).
- Żądanie dostępu do danych składane w trakcie sporu z firmą (np. pracownik przed procesem) albo żądanie dotyczące nagrań z innymi osobami w kadrze.
- Monitoring na dużą skalę w miejscach publicznych, rozpoznawanie twarzy, nagrywanie dźwięku, kamery w miejscach wrażliwych.
- Przekazywanie danych poza Europejski Obszar Gospodarczy.

## 5. Fakty, które zmieniają ocenę

- Rola firmy: administrator czy podmiot przetwarzający (i co mówi umowa powierzenia).
- Godzina pierwszego sygnału i godzina stwierdzenia naruszenia; kto i jak to ustalił.
- Jakie dane, ilu osób, czy dane szczególne albo PESEL; czy były zaszyfrowane; czy dane odzyskano albo usunięto u odbiorcy.
- Data i kanał wpływu żądania, czego dokładnie dotyczy, czy tożsamość jest pewna.
- Czy kamera obejmuje pracowników, jaki ma kadr, czy nagrywa dźwięk, jak długo trzyma nagrania.
- Źródło danych do marketingu (formularz, CEIDG, kupiona baza) i dowód uprzedniej zgody.

## 6. Źródła (odczyt 6.11.2026)

| Źródło | Co potwierdza |
|---|---|
| Rozporządzenie 2016/679 (RODO), tekst urzędowy Dz. Urz. UE L 119 z 4.5.2016: https://www.gov.pl/attachment/6ad1668e-e043-4c47-8455-870a6dd1ea80 | art. 6 ust. 1 lit. f, 12 ust. 3-6, 13 ust. 1, 14 ust. 3, 21 ust. 2 i 3, 33 ust. 1-5, 34 ust. 1-4, 35 ust. 1 i 3 (otwarte i przeczytane 6.11.2026; plik to wydanie z 2016 r.; sprostowanie polskiej wersji, Dz.U. UE L 127 z 23.5.2018, otwarte w eur-lex.europa.eu 7.11.2026, z tych przepisów zmienia tylko art. 13 ust. 1 lit. f (informacja o sposobach uzyskania kopii zabezpieczeń) i art. 35 ust. 3 lit. b („czynów zabronionych” zamiast „naruszeń prawa”)) |
| akty/UODO.md (t.j. Dz.U. 2019 poz. 1781 ze zm.) | art. 8, 10, 11, 65, 79, 81, 92, 93, 107 |
| akty/PKE.md, akty/KP.md, akty/ZNK.md | PKE art. 398 ust. 1 i 4, art. 446 ust. 5; KP art. 22²; ZNK art. 11 |
| Wytyczne EROD 3/2019 w sprawie przetwarzania danych osobowych przez urządzenia wideo, wersja 2.0, polska wersja: https://uodo.gov.pl/pl/file/3704 | pkt 111-117 (dwie warstwy informacji), pkt 121 (kilka dni, uzasadnienie ponad 72 godziny); otwarte 6.11.2026 |
| https://uodo.gov.pl/pl/525 | sekcja UODO o zgłaszaniu naruszeń |
| https://www.biznes.gov.pl/pl/portal/ou889 | e-usługa zgłoszenia naruszenia (według `katalog/rodo-dokumentacja/stan-prawny.md`) |

Akty brakujące (spoza plików akty/):

| Akt | ELI / adres | Do czego |
|---|---|---|
| Rozporządzenie (UE) 2016/679 (RODO) | gov.pl, adres wyżej; tekst w eur-lex: CELEX 32016R0679 | wszystkie reguły z numerem RODO w sekcjach 2 i 3 |
