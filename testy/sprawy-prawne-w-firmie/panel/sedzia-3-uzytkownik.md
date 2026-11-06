# Sędzia 3: użytkownik i spójność (Claude)

Perspektywa: właściciel firmy bez wiedzy prawniczej. Pytania kontrolne przy każdej propozycji: czy to sprawa, z którą mała firma przychodzi naprawdę; czy mapa skieruje ją we właściwe miejsce; czy tekst nie wydłuży każdej odpowiedzi (limit około 900 słów, SKILL.md:45); czy nie powstaje drugi tekst o tym samym w innym pliku. Przeczytane: BRIEF.md, 12 raportów ekspertów, SKILL.md, mapa-spraw.md, pisma.md, karta-dla-prawnika.md, wpis.md; punktowo moduły i kopie katalogu. Sprawdzone przy okazji w plikach aktów: AML art. 60 ust. 1a pkt 1 („a w przypadku zmian, dla których skuteczności nie jest wymagany wpis do Krajowego Rejestru Sądowego, w terminie 14 dni od dnia ich dokonania”), KK art. 115 § 12 („nie stanowi groźby zapowiedź spowodowania postępowania karnego (...) jeżeli ma ona jedynie na celu ochronę prawa naruszonego przestępstwem”).

Zasada dla dubli: gdy Claude i Codex proponują to samo, przyjmuję jeden tekst jako bazę (wskazany w werdykcie), a drugi tylko w części, która coś dodaje. Do jednego miejsca trafia jeden tekst.

## Werdykty propozycji ekspertów

### Ekspert 1, praca (Claude)

E1-01 | PRZYJĄĆ
E1-02 | PRZYJĄĆ
E1-03 | PRZYJĄĆ
E1-04 | PRZYJĄĆ
E1-05 | PRZYJĄĆ ZE ZMIANĄ (scalone z C1-19, jeden dopisek w A59, bez osobnego wpisu w pisma.md): „Na wniosek o sprostowanie pracodawca w 7 dni od jego otrzymania wydaje nowe świadectwo albo zawiadamia o odmowie (rozporządzenie w sprawie świadectwa pracy § 7 ust. 1, t.j. Dz.U. 2024 poz. 1016, odczyt api.sejm.gov.pl 6.11.2026); gdy nie zawiadomi o odmowie, pracownik idzie do sądu pracy bez czekania na odpowiedź (KP art. 97 § 2¹).”
E1-06 | PRZYJĄĆ
E1-L01 | PRZYJĄĆ ZE ZMIANĄ (baza dla C1-09, C1-10, C1-11; A29a, A29c, A29d i pytanie 13 bez zmian; A29b skrócić): „A29b. Firma może sama kontrolować wykorzystanie zwolnienia za okres, w którym płaci wynagrodzenie chorobowe; za okres zasiłku tylko wtedy, gdy sama wypłaca zasiłki (ponad 20 osób zgłoszonych do ubezpieczenia chorobowego), a mniejsza firma składa wniosek o kontrolę do ZUS. Kontrolujący ma upoważnienie i sporządza protokół, pracownik ma 7 dni na zastrzeżenia, a o skutkach rozstrzyga ZUS (ustawa zasiłkowa art. 61 ust. 1 pkt 1, art. 68 ust. 1a-1d, art. 68b, art. 68e ust. 2 i 4; t.j. Dz.U. 2026 poz. 854, odczyt api.sejm.gov.pl 6.11.2026).”
E1-L02 | PRZYJĄĆ ZE ZMIANĄ (baza dla C1-06, C1-07, E6-L04, C6-13; tekst A14a, A14b i sygnał bez zmian, na końcu A14a dopisać): „Zespół powypadkowy sporządza protokół najpóźniej w 14 dni od zawiadomienia o wypadku, a pracodawca zatwierdza go w 5 dni (rozporządzenie RM z 1.07.2009 r., § 9 ust. 1, § 13 ust. 1, Dz.U. 2009 poz. 870, odczyt api.sejm.gov.pl). Niezawiadomienie o wypadku w terminie albo niesporządzenie dokumentacji powypadkowej jest przestępstwem (KK art. 221), a ciężki wypadek: także `moduly/sprawy-karne-firmy.md`.” Fragment „[treść i terminy: WYMAGA WERYFIKACJI w ISAP]” przy rozporządzeniu usunąć, skoro terminy są odczytane.
E1-L03 | PRZYJĄĆ (baza dla C1-12, C1-13)
E1-L04 | PRZYJĄĆ (baza dla C1-14; dopisek z C1-15)
E1-L05 | PRZYJĄĆ ZE ZMIANĄ (baza; pierwsze zdanie z C1-16 na początek, zdanie o progu 50 osób i SYGN art. 58 usunąć, bo jest w `katalog/sygnalisci-procedura/`): na początku A50a dopisać „Nie każda skarga o pensję, mobbing albo BHP jest zgłoszeniem w rozumieniu ustawy o sygnalistach; sprawdź dziedzinę naruszenia i zakres procedury wewnętrznej (SYGN art. 3, SYGN art. 4).”
E1-L06 | PRZYJĄĆ
E1-L07 | PRZYJĄĆ ZE ZMIANĄ (baza dla C1-21): w A62a zamiast „[KPSW niewbudowany; dokładne przesłanki § 1b-1bc: WYMAGA WERYFIKACJI w ISAP]” wpisać: „; 10 000 zł przy ponownym wykroczeniu kodeksowym po co najmniej dwóch wcześniejszych ukaraniach, w 2 lata od ostatniego, a za wykroczenia z PRACACUDZ art. 84 mandat inspektora pracy albo Straży Granicznej do 10 000 zł bez tego warunku (KPSW art. 96 § 1af i § 1b, t.j. Dz.U. 2026 poz. 1336, odczyt api.sejm.gov.pl 6.11.2026)”. Wiersz w tabeli „Akty brakujące” zgodnie z tym źródłem. W `cudzoziemcy.md` przy C23 tylko odesłanie „mandat: `zatrudnienie-na-co-dzien.md`, A62a”.
E1-L08 | PRZYJĄĆ (baza dla C1-18)
E1-L09 | PRZYJĄĆ
E1-L10 | PRZYJĄĆ ZE ZMIANĄ: usunąć zdanie „Przy zwolnieniu dyscyplinarnym uznanym przez sąd za wadliwe wpisuje się wypowiedzenie przez pracodawcę (KP art. 97 § 3).” (rzadkie, a ostatnie zdanie punktu i tak kieruje sporny tryb do poziomu B).

### Ekspert 1, praca (Codex)

C1-01 | PRZYJĄĆ
C1-02 | PRZYJĄĆ
C1-03 | PRZYJĄĆ
C1-04 | PRZYJĄĆ
C1-05 | PRZYJĄĆ
C1-06 | ODRZUCIĆ (dubel E1-L02; jeden blok o wypadku w A14a)
C1-07 | PRZYJĄĆ ZE ZMIANĄ (jako jedno zdanie dopisane do A14a, tekst w werdykcie E1-L02)
C1-08 | PRZYJĄĆ
C1-09 | ODRZUCIĆ (dubel E1-L01, A29a i A29d)
C1-10 | ODRZUCIĆ (dubel E1-L01, A29b)
C1-11 | ODRZUCIĆ (dubel E1-L01, A29c, który mówi to samo konkretniej: „nie zlecaj osobie na zwolnieniu żadnej pracy”)
C1-12 | ODRZUCIĆ (dubel E1-L03, A22a i A22c)
C1-13 | ODRZUCIĆ (dubel E1-L03, A22b; tekst ogólniejszy i bez liczb)
C1-14 | ODRZUCIĆ (dubel E1-L04, A29f)
C1-15 | PRZYJĄĆ ZE ZMIANĄ: tylko zdanie o powrocie z urlopu, dopisane na końcu A29f: „Po urlopie macierzyńskim, ojcowskim, rodzicielskim albo wychowawczym pracodawca dopuszcza pracownika do dotychczasowego stanowiska, a gdy to niemożliwe do równorzędnego, na warunkach nie mniej korzystnych (KP art. 186⁴).” Uzupełniający urlop macierzyński przy hospitalizacji pominąć (rzadki, reguła długa).
C1-16 | PRZYJĄĆ ZE ZMIANĄ (pierwsze zdanie scalone z E1-L05; w module B2B wystarcza E1-L06)
C1-17 | ODRZUCIĆ (próg, terminy 7 dni i 3 miesięcy oraz poufność są w `katalog/sygnalisci-procedura/`, do którego kieruje mapa-spraw.md:29)
C1-18 | ODRZUCIĆ (dubel E1-L08, który ma też odprawę pośmiertną; jedna reguła w module zatrudnienia)
C1-19 | PRZYJĄĆ ZE ZMIANĄ (scalone z E1-05, tekst wyżej)
C1-20 | PRZYJĄĆ
C1-21 | PRZYJĄĆ ZE ZMIANĄ (scalone z E1-L07, tekst wyżej; bez osobnego bloku w cudzoziemcach)

### Ekspert 2, spółki (Claude)

E2-01 | PRZYJĄĆ ZE ZMIANĄ: w nowej regule 52 zamiast „zmiany wymagające wpisu do KRS liczy się od wpisu, pozostałe (np. sprzedaż udziałów) od dnia zmiany” wpisać „zmiany, których skuteczność zależy od wpisu do KRS, liczy się od wpisu, a pozostałe (np. sprzedaż udziałów) od dnia ich dokonania” (brzmienie AML art. 60 ust. 1a pkt 1). Reszta bez zmian, w tym usunięcie daty 10.11.2022 i przykładu „zmiana zarządu”.
E2-02 | PRZYJĄĆ
E2-03 | PRZYJĄĆ
E2-04 | PRZYJĄĆ
E2-05 | PRZYJĄĆ
E2-06 | PRZYJĄĆ (baza dla C2-14)
E2-07 | PRZYJĄĆ (baza dla C2-13)
E2-08 | PRZYJĄĆ
E2-L01 | PRZYJĄĆ ZE ZMIANĄ (baza dla C2-16): 77a skrócić do odesłania, bo ZUS zarządu opisuje już `niewyplacalnosc.md`, reguła 21: „77a. Za zaległe składki ZUS spółki członkowie zarządu odpowiadają jak za podatki (SUS art. 31); szczegóły: `moduly/niewyplacalnosc.md`, reguła 21.” 77b bez zmian.
E2-L02 | PRZYJĄĆ
E2-L03 | PRZYJĄĆ (baza dla C2-10)
E2-L04 | PRZYJĄĆ (baza dla C2-11)
E2-L05 | PRZYJĄĆ ZE ZMIANĄ (baza dla C2-15): zostawić 91a i dwa pierwsze zdania 91b; usunąć zdanie o nazwisku komandytariusza w firmie (KSH art. 104 § 4) i całe 91c o przekształceniu spółki osobowej w osobową (sprawy rzadkie).
E2-L06 | PRZYJĄĆ (baza dla C2-09; obok przyjęte C2-08)
E2-L07 | PRZYJĄĆ
E2-L08 | PRZYJĄĆ
E2-L09 | ODRZUCIĆ (przekształcenie spółki cywilnej w jawną jako plan sukcesji to sprawa rzadka i zawsze z prawnikiem; sygnał „tylko prawnik albo notariusz” w module sukcesji już ją obejmuje)

### Ekspert 2, spółki (Codex)

C2-01 | PRZYJĄĆ ZE ZMIANĄ: w tekście komórki usunąć przykład „powołaniu członka zarządu”, bo skład zarządu nie jest danymi CRBR (AML art. 59): „14 dni, bez sobót i dni ustawowo wolnych od pracy: przy zmianie, której skuteczność zależy od wpisu do KRS, od tego wpisu, a przy zmianie skutecznej wcześniej, np. sprzedaży udziałów, od jej dokonania (AML art. 60 ust. 1a pkt 1 i ust. 2).” Poziom BLOKER zmienić na WAŻNE.
C2-02 | PRZYJĄĆ
C2-03 | PRZYJĄĆ
C2-04 | PRZYJĄĆ
C2-05 | PRZYJĄĆ
C2-06 | PRZYJĄĆ
C2-07 | PRZYJĄĆ
C2-08 | PRZYJĄĆ
C2-09 | ODRZUCIĆ (dubel E2-L06; bilans otwarcia i przechowawca ksiąg to szczegóły dla likwidatora z prawnikiem)
C2-10 | ODRZUCIĆ (dubel E2-L03)
C2-11 | ODRZUCIĆ (dubel E2-L04; zabezpieczenie przez zawieszenie praw udziałowych to decyzja prawnika w toczącej się sprawie)
C2-12 | ODRZUCIĆ (reprezentacja PSA przy radzie dyrektorów: forma rzadka wśród odbiorców skilla; E2-07 i E2-L07 wystarczą)
C2-13 | ODRZUCIĆ (dubel E2-L07)
C2-14 | ODRZUCIĆ (dubel E2-06)
C2-15 | ODRZUCIĆ (dubel E2-L05)
C2-16 | ODRZUCIĆ (dubel E2-L01, 77b)
C2-17 | PRZYJĄĆ
C2-18 | PRZYJĄĆ ZE ZMIANĄ: tylko w wąskim skillu `zamkniecie-firmy-krok-po-kroku`; w module sukcesji wystarcza E2-05.
C2-19 | PRZYJĄĆ
C2-20 | PRZYJĄĆ ZE ZMIANĄ (jedno zdanie po C2-19, bez powtarzania zasad pisma z E5-05): „Od decyzji ZUS o odpowiedzialności odwołanie do sądu wnosi się przez ZUS w miesiąc od doręczenia; to projekt poziomu B (SUS art. 83 ust. 2, KPC art. 477⁹ § 1).”
C2-21 | PRZYJĄĆ
C2-22 | PRZYJĄĆ

### Ekspert 3, umowy i spory (Claude)

E3-01 | PRZYJĄĆ (baza dla C3-01)
E3-02 | PRZYJĄĆ
E3-03 | PRZYJĄĆ
E3-04 | PRZYJĄĆ
E3-05 | PRZYJĄĆ
E3-06 | PRZYJĄĆ
E3-07 | PRZYJĄĆ
E3-08 | PRZYJĄĆ
E3-09 | PRZYJĄĆ
E3-L01 | PRZYJĄĆ ZE ZMIANĄ (baza dla C3-12; zostają punkty III, IV, V i VI oraz pytanie 8a, a punkty I, II i VII usunąć jako oczywiste albo opisane w pkt 20 i ZATORY): podrozdział „Cesja wierzytelności i faktoring” w czterech punktach, numeracja I-IV.
E3-L02 | PRZYJĄĆ ZE ZMIANĄ (baza dla C3-18): zostają punkty 1, 2, 3 i 5 oraz sygnał; usunąć punkt o szkodzie na mieniu z progiem 500 euro, punkt o przedawnieniu i punkt o dyrektywie z [WYMAGA WERYFIKACJI] (rozwiązuje to prawnik po sygnale). Z C3-18 dopisać na początku: „Szkodę wyrządzoną przez produkt oddziel od reklamacji samego towaru; zabezpiecz produkt i dokumenty zakupu.”
E3-L03 | PRZYJĄĆ ZE ZMIANĄ (baza dla C3-14): zostają punkty 1-3 i dopisek do listy elementów umowy; punkt o KC art. 121 pkt 4 usunąć; na końcu punktu 1 dopisać z C3-14: „Przy opóźnieniu w zapłacie siła wyższa nie zwalnia z odsetek, bo należą się bez względu na przyczynę opóźnienia (KC art. 481 § 1).”
E3-L04 | PRZYJĄĆ (baza dla C3-10)
E3-L05 | PRZYJĄĆ
E3-L06 | PRZYJĄĆ ZE ZMIANĄ: z tej propozycji tylko dopisek w module umów („prawo i sąd (...) wybór arbitrażu jako [DO DECYZJI PRAWNIKA]”); regułę w module sporów bierze się z krótszego C3-15.
E3-L07 | PRZYJĄĆ ZE ZMIANĄ (podstawą jest C3-17, z tej propozycji tylko jedno zdanie do sekcji o kontrahencie zagranicznym): „e-Sąd nie wyda nakazu, gdy doręczenie miałoby nastąpić za granicą (KPC art. 505²⁸ § 2); drogę (pozew w Polsce albo za granicą, europejski nakaz zapłaty) wybiera prawnik.” Pozostałe punkty z [WYMAGA WERYFIKACJI] o rozporządzeniach UE pominąć.
E3-L08 | PRZYJĄĆ ZE ZMIANĄ: punkt o gwarancji bankowej zastąpić tekstem C3-11 (Prawo bankowe odczytane w oficjalnym tekście); punkty o poręczeniu i wekslu bez zmian.
E3-L09 | PRZYJĄĆ
E3-L10 | PRZYJĄĆ

### Ekspert 3, umowy i spory (Codex)

C3-01 | PRZYJĄĆ ZE ZMIANĄ (treść według E3-01, który podaje konkretne terminy zamiast samego odesłania do prawnika); z tej propozycji przyjąć tylko trzecie miejsce do poprawy: `skille/windykacja-miekka/SKILL.md:50`, gdzie warunek trzech lat zastąpić zdaniem z E3-01 („za towar albo usługi ponad rok od terminu płatności, za pozostałe ponad dwa lata: przestań pisać kolejne pisma i skieruj do prawnika”).
C3-02 | PRZYJĄĆ
C3-03 | PRZYJĄĆ
C3-04 | PRZYJĄĆ
C3-05 | PRZYJĄĆ
C3-06 | PRZYJĄĆ
C3-07 | PRZYJĄĆ
C3-08 | PRZYJĄĆ
C3-09 | PRZYJĄĆ ZE ZMIANĄ: tylko pierwsze zdanie (KC art. 505); zdanie o umocowaniu pełnomocnika procesowego pominąć (zasada wspólna pisma.md:29 już każe sprawdzić, kto podpisuje).
C3-10 | ODRZUCIĆ (dubel E3-L04)
C3-11 | PRZYJĄĆ (jako punkt o gwarancji w E3-L08)
C3-12 | ODRZUCIĆ (dubel E3-L01)
C3-13 | PRZYJĄĆ
C3-14 | PRZYJĄĆ ZE ZMIANĄ (tylko zdanie o KC art. 481 § 1, dopisane do E3-L03)
C3-15 | PRZYJĄĆ
C3-16 | ODRZUCIĆ (umowa dowodowa rzadko występuje w umowach małych firm; moduł sporów już ją wymienia)
C3-17 | PRZYJĄĆ ZE ZMIANĄ: tekst w module sporów i dopisek do punktu 4 karty bez zmian; dopisek do punktu 1 karty pominąć, bo E3-L10 dodaje tam kraj siedziby.
C3-18 | ODRZUCIĆ (dubel E3-L02; jedno zdanie przeniesione tam)
C3-19 | ODRZUCIĆ (najem nieruchomości ponad 2 lata przy licytacji komorniczej: sprawa rzadka, mapa i tak kieruje ją do prawnika)
C3-20 | PRZYJĄĆ
C3-21 | PRZYJĄĆ

### Ekspert 4, konsument i dane (Claude)

E4-01 | PRZYJĄĆ ZE ZMIANĄ (wiersz bez odesłania do „Reguł ramowych”, zob. E4-09): „| Mapa danych, wyciek albo inny incydent z danymi osobowymi, pismo z UODO, prośba klienta o dane | `katalog/rodo-w-malej-firmie/` (kolejność kroków) + `katalog/rodo-dokumentacja/stan-prawny.md`, część „Naruszenia” (termin, kto zgłasza, zawiadomienie osób); przy incydencie w systemach także `moduly/nis2.md` pkt 37 | UODO (RODO to rozporządzenie UE, poza wbudowanymi aktami) |”
E4-02 | PRZYJĄĆ
E4-03 | PRZYJĄĆ (zdanie z C4-17 o równoległej ścieżce RODO dopisać po nim)
E4-04 | PRZYJĄĆ
E4-05 | PRZYJĄĆ
E4-06 | PRZYJĄĆ
E4-07 | PRZYJĄĆ
E4-08 | PRZYJĄĆ
E4-09 | PRZYJĄĆ ZE ZMIANĄ: bez bloku w mapa-spraw.md (zob. S3-01). Termin 72 godzin, zawiadomienie osób i żądania osób trafiają do źródła wąskiego skilla `rodo-w-malej-firmie` przez C4-01, C4-10 i C4-11; reguła o kamerach (wytyczne EROD 3/2019, pkt 118 i 121, uodo.gov.pl/pl/file/3704) jako dopisek w `rodo-w-malej-firmie/references/pytania-po-obszarach.md` obok tekstu C4-12; marketing B2B jest już w `katalog/zgody-na-stronie-www/`, sekcja 5.
E4-10 | PRZYJĄĆ ZE ZMIANĄ (trzy wiersze, bez „Reguł ramowych”; wiersz o kamerach zastępuje wiersz z C4-12): „| Kamery obejmujące klientów albo przechodniów (sklep, salon, warsztat) | `katalog/rodo-w-malej-firmie/` (monitoring) + `katalog/rodo-dokumentacja/`; przy pracownikach także `moduly/zatrudnienie-na-co-dzien.md` | KP (art. 22² przy pracownikach); RODO poza wbudowanymi aktami |”, „| E-maile, SMS-y i telefony z ofertą do firm albo osób, kupione bazy, dawni klienci | `katalog/zgody-na-stronie-www/` (sekcja 5) | PKE |”, wiersz o wizerunku bez zmian.
E4-11 | PRZYJĄĆ ZE ZMIANĄ: tylko pytanie 15 do sekcji 1; regułę bierze się z C4-16 (oparta na wbudowanych UNPR i ZNK, bez rekomendacji UOKiK „do potwierdzenia”).
E4-12 | PRZYJĄĆ ZE ZMIANĄ: tylko dwa ostatnie punkty (VAT OSS do księgowej, karta przed nowym krajem) dopisane pod tekstem C4-14; punkty z [WYMAGA WERYFIKACJI] o rozporządzeniach pominąć, bo C4-14 podaje Rzym I z oficjalnego tekstu.
E4-13 | PRZYJĄĆ
E4-14 | PRZYJĄĆ
E4-15 | PRZYJĄĆ

### Ekspert 4, konsument i dane (Codex)

C4-01 | PRZYJĄĆ
C4-02 | PRZYJĄĆ
C4-03 | PRZYJĄĆ
C4-04 | PRZYJĄĆ
C4-05 | PRZYJĄĆ
C4-06 | PRZYJĄĆ
C4-07 | PRZYJĄĆ
C4-08 | PRZYJĄĆ
C4-09 | PRZYJĄĆ
C4-10 | PRZYJĄĆ
C4-11 | PRZYJĄĆ
C4-12 | PRZYJĄĆ (rozwinięcie w wąskim skillu; wiersz mapy według E4-10)
C4-13 | PRZYJĄĆ
C4-14 | PRZYJĄĆ
C4-15 | PRZYJĄĆ
C4-16 | PRZYJĄĆ
C4-17 | PRZYJĄĆ

### Ekspert 5, administracja i zamówienia (Claude)

E5-01 | PRZYJĄĆ
E5-02 | PRZYJĄĆ
E5-03 | PRZYJĄĆ
E5-04 | PRZYJĄĆ
E5-05 | PRZYJĄĆ
E5-06 | PRZYJĄĆ
E5-07 | PRZYJĄĆ ZE ZMIANĄ (baza dla E6-09): po „Czynny żal, czyli zawiadomienie organu o popełnionym czynie skarbowym,” dopisać „złożone na piśmie, ustnie do protokołu albo przez e-Urząd Skarbowy,” i do rejestru „art. 16 § 4a”.
E5-08 | PRZYJĄĆ
E5-09 | PRZYJĄĆ
E5-10 | ODRZUCIĆ (dubel C5-11, który ma też zakaz zawarcia umowy po odwołaniu)
E5-11 | PRZYJĄĆ (rozszerzyć według S3-05)
E5-L01 | PRZYJĄĆ ZE ZMIANĄ (tekst w pisma.md 4.8 według krótszego C5-12; z tej propozycji wiersz mapy i jedno zdanie): „Zastosowanie się do interpretacji przed jej zmianą nie może firmie szkodzić, ale nie chroni zdarzeń sprzed jej doręczenia; w sprawie składek ZUS wniosek o interpretację składa się do ZUS (OP art. 14k § 1, OP art. 14l, PRPRZ art. 34 ust. 1).”
E5-L02 | PRZYJĄĆ ZE ZMIANĄ: w pisma.md 4.8 zostaje tylko akapit „Korekta deklaracji” bez ostatniego zdania (KKS art. 16a); czynny żal i korekta jako podstawa niekaralności są w module karnym (E6-L01, punkty 24-25), a poziom B czynnego żalu daje E6-L06. Wiersz mapy: „| Błąd w deklaracji, korekta, czynny żal | pisma.md 4.8 (korekta) + `moduly/sprawy-karne-firmy.md` (czynny żal) + `katalog/kontrola-z-urzedu/` przy kontroli; wybór drogi: doradca podatkowy | OP, KKS |”.
E5-L03 | PRZYJĄĆ ZE ZMIANĄ (baza dla C5-15): ostatnie zdanie zastąpić tekstem: „Uzasadnienie wniosku tylko z faktów i dokumentów finansowych użytkownika, bez obiecywania ulgi; czy ulga u przedsiębiorcy nie jest pomocą publiczną, jest pomocą de minimis czy inną pomocą, ustala doradca, bo od tego zależą dokumenty (OP art. 67b § 1).”
E5-L04 | PRZYJĄĆ ZE ZMIANĄ: tylko wiersz mapy, bez reguł pod tabelą (zob. S3-01): „| Koncesja, zezwolenie, wpis do rejestru działalności regulowanej: czy potrzebne, odmowa, cofnięcie | PRPRZ art. 37-44 w pliku aktu; przy decyzji `katalog/decyzja-z-urzedu-co-dalej/`; ustawy branżowe poza wbudowanymi [WYMAGA WERYFIKACJI: lista na biznes.gov.pl] | PRPRZ |”.
E5-L05 | PRZYJĄĆ
E5-L06 | PRZYJĄĆ (zdanie z C5-21 dopisane)
E5-L07 | PRZYJĄĆ ZE ZMIANĄ: zostają 47a i pismo w B3 pkt 9; 47b (ogłoszenie o wykonaniu umowy z [WYMAGA WERYFIKACJI]) usunąć.
E5-L08 | ODRZUCIĆ (spółki komunalne rzadko są odbiorcą skilla dla firm bez prawnika; graniczne przypadki wielkości kieruje do prawnika reguła 8 i C4 modułu NIS2)
E5-L09 | PRZYJĄĆ

### Ekspert 5, administracja i zamówienia (Codex)

C5-01 | PRZYJĄĆ
C5-02 | PRZYJĄĆ
C5-03 | PRZYJĄĆ
C5-04 | PRZYJĄĆ
C5-05 | PRZYJĄĆ
C5-06 | PRZYJĄĆ
C5-07 | PRZYJĄĆ
C5-08 | PRZYJĄĆ
C5-09 | PRZYJĄĆ
C5-10 | PRZYJĄĆ
C5-11 | PRZYJĄĆ (baza dla E5-10)
C5-12 | PRZYJĄĆ (baza dla E5-L01)
C5-13 | PRZYJĄĆ ZE ZMIANĄ: tylko zdanie ochronne, dopisane do punktu 25 modułu karnego (E6-L01): „Przy czynnym żalu nie dopisuj przyznania się, osób współdziałających ani okoliczności z domysłu; opis tylko z faktów i dokumentów użytkownika.”
C5-14 | ODRZUCIĆ (dubel E5-L02, akapit „Korekta deklaracji” z OP art. 81 § 2b)
C5-15 | PRZYJĄĆ ZE ZMIANĄ (scalone z E5-L03, tekst wyżej)
C5-16 | ODRZUCIĆ (skarga do WSA jest już poziomem B przeglądanym przez prawnika, a pisma.md:97 każe sprawdzić wymogi formalne w pliku aktu; osobna lista wydłuża pisma.md)
C5-17 | ODRZUCIĆ (zarzut i skargę na czynność egzekucyjną rozróżnia już `katalog/decyzja-z-urzedu-co-dalej/`, do którego kieruje mapa-spraw.md:71)
C5-18 | ODRZUCIĆ (dubel E5-L04; koncesja to nie pismo, więc nie do pisma.md 4.8)
C5-19 | ODRZUCIĆ (dubel E5-L05)
C5-20 | PRZYJĄĆ ZE ZMIANĄ (pierwsza przesłanka jest w E5-09): tylko zdanie „Sprawdź też klauzulę o odszkodowaniu ponad karę, bo limit kar nie musi ograniczać całej odpowiedzialności (KC art. 484 § 1).” dopisane do reguły 43.
C5-21 | PRZYJĄĆ ZE ZMIANĄ: tylko zdanie o PZP art. 463, dopisane do 50a z E5-L06: „Umowa podwykonawcza nie może ustalać kar ani warunków zapłaty mniej korzystnie dla podwykonawcy niż umowa wykonawcy z zamawiającym (PZP art. 463).”
C5-22 | PRZYJĄĆ
C5-23 | PRZYJĄĆ
C5-24 | PRZYJĄĆ
C5-25 | PRZYJĄĆ

### Ekspert 6, karne (Claude)

E6-01 | PRZYJĄĆ
E6-02 | PRZYJĄĆ ZE ZMIANĄ: zdanie „Gdy po dwukrotnym zaskarżeniu prokurator nadrzędny utrzyma kolejną odmowę albo umorzenie, firma może w miesiąc (...)” zastąpić tekstem z C6-08 (dokładniejszy opis drogi): „Po ponownej odmowie albo umorzeniu, wydanych po uchyleniu wcześniejszego postanowienia przez sąd, zażalenie przysługuje tylko do prokuratora nadrzędnego; dopiero po spełnieniu warunków ustawy firma może w miesiąc od zawiadomienia wnieść własny akt oskarżenia, sporządzony i podpisany przez adwokata albo radcę prawnego, więc sprawę od razu przekaż prawnikowi (KPK art. 330 § 2 i § 2a, KPK art. 55 § 1 i § 2).”
E6-03 | PRZYJĄĆ
E6-04 | PRZYJĄĆ
E6-05 | PRZYJĄĆ (baza dla C6-04)
E6-06 | PRZYJĄĆ
E6-07 | PRZYJĄĆ
E6-08 | PRZYJĄĆ ZE ZMIANĄ: dopisek do wąskiego skilla `decyzja-z-urzedu-co-dalej` bez zmian; w mapie zamiast nawiasu w istniejącym wierszu osobny wiersz według C6-01.
E6-09 | ODRZUCIĆ (dubel E5-07; e-Urząd Skarbowy dopisany tam)
E6-L01 | PRZYJĄĆ ZE ZMIANĄ (nowy moduł jest potrzebny: KKS i PODZB są wbudowane, a pierwsze godziny przy przelewie na rachunek oszusta, przeszukaniu i mandacie skarbowym to sprawy typowe). Skrócić: usunąć punkty 35-36 (sygnaliści i AI są w `katalog/sygnalisci-procedura/` i `katalog/polityka-ai/`), w punkcie 32 zostawić tylko pierwsze zdanie do „(...) większość przestępstw skarbowych podatkowych” bez wyliczania numerów z PODZB art. 16, z tabeli w sekcji 7 usunąć wiersze o KPK art. 180 § 2 (2028) i KPK art. 55 § 1 (2029). Dopisać: do punktu 25 zdanie z C5-13 i na końcu punktu 24 zdanie z C6-11: „Korekta albo czynny żal złożone przez jedną osobę nie chronią automatycznie pozostałych osób odpowiedzialnych za rozliczenie (KKS art. 9 § 2 i § 3, KKS art. 16 § 6).”
E6-L02 | PRZYJĄĆ ZE ZMIANĄ: cztery wiersze zamiast sześciu; wiersz „Ciężki wypadek” usunąć (kieruje do niego wiersz zatrudnienia, S3-04), wiersz „Zgłoszenie sygnalisty opisuje możliwe przestępstwo” usunąć (mapa-spraw.md:29 kieruje do sygnalistów, a reguła 35 wypada); wiersz o mandacie skarbowym według C6-01.
E6-L03 | PRZYJĄĆ ZE ZMIANĄ: zostają 39a i 39b; 39c usunąć (PODZB opisuje moduł karny, punkt 30-33).
E6-L04 | PRZYJĄĆ ZE ZMIANĄ (dubel E1-L02): tylko zdanie o KK art. 221 dopisane do A14a, tekst w werdykcie E1-L02; sygnał z E1-L02.
E6-L05 | PRZYJĄĆ ZE ZMIANĄ: „(termin krótszy niż 7 dni, sąd, komornik, trwająca kontrola, przeszukanie albo żądanie wydania dokumentów, wezwanie na przesłuchanie, przelew na rachunek oszusta, ciężki wypadek przy pracy, wyciek danych osobowych)”; „propozycję mandatu” pominąć, bo sam mandat nie ma terminu liczonego w godzinach, a „wyciek” dodać przez 72 godziny (E4-02).
E6-L06 | PRZYJĄĆ
E6-L07 | PRZYJĄĆ

### Ekspert 6, karne (Codex)

C6-01 | PRZYJĄĆ ZE ZMIANĄ: osobny wiersz mapy z tej propozycji przyjąć; zdanie, że kopia `decyzja-z-urzedu-co-dalej/zasady.md:103` przedwcześnie opisuje mandat zaoczny, odrzucić: ta kopia opisuje mandat zaoczny z prawa wykroczeń, który już obowiązuje, a zaoczny mandat karny skarbowy od 26.12.2026 podaje z datą E6-08.
C6-02 | PRZYJĄĆ
C6-03 | PRZYJĄĆ
C6-04 | ODRZUCIĆ (dubel E6-05)
C6-05 | PRZYJĄĆ
C6-06 | ODRZUCIĆ (dubel E6-L01, E6-L02 i E6-07; zdanie o ustawie względniejszej to ocena dla obrońcy, nie dla firmy)
C6-07 | ODRZUCIĆ (dubel E6-L01, punkty 1, 6-8, oraz E6-02 i E6-03)
C6-08 | PRZYJĄĆ ZE ZMIANĄ (drugi akapit zastępuje zdanie w E6-02, tekst wyżej; pierwszy akapit to dubel E6-02)
C6-09 | ODRZUCIĆ (dubel E6-L01, punkty 11-16 i Pismo 1)
C6-10 | ODRZUCIĆ (dubel E6-L01, punkty 17-20 i Pismo 2)
C6-11 | PRZYJĄĆ ZE ZMIANĄ (tylko zdanie o tym, że korekta i czynny żal jednej osoby nie chronią pozostałych, tekst w werdykcie E6-L01)
C6-12 | ODRZUCIĆ (dubel E6-L01, punkty 22 i 30-34)
C6-13 | ODRZUCIĆ (dubel E6-L01, punkty 28-29, i E1-L02)
C6-14 | ODRZUCIĆ (sposób zdobycia informacji przez sygnalistę to sprawa rzadka i zawsze dla prawnika; nie zmienia kroków firmy)
C6-15 | PRZYJĄĆ ZE ZMIANĄ: tylko pierwszy akapit (czwarta ścieżka: podejrzenie przestępstwa z użyciem AI, z odesłaniem do `moduly/sprawy-karne-firmy.md`, punkt 10 w wersji pakietu dla tego skilla); akapit o zgłoszeniach sygnalistów w narzędziach AI pominąć (niszowy).

## Własne uwagi

S3-01 | references/mapa-spraw.md:3 | WAŻNE | Mapa jest wczytywana przy każdej sprawie (SKILL.md:26). Propozycje E4-09 i E5-L04 dopisują pod tabelami reguły merytoryczne, przez co każda rozmowa wczytuje dziesiątki zbędnych linii, a ta sama reguła ma dwa źródła. | poprawka: na końcu akapitu w mapa-spraw.md:3 dopisać „Ten plik tylko kieruje: reguły merytoryczne są w modułach i plikach katalogu, nie pod tabelami tej mapy.”

S3-02 | SKILL.md:28 | WAŻNE | Po przyjęciu luk moduły urosną (zatrudnienie o L4, wypadek, noc i niedziele, rodzicielstwo, PIP; nowy moduł karny). Bez wyraźnej reguły model przenosi do odpowiedzi więcej reguł z modułu, a limit około 900 słów (SKILL.md:45) zaczyna wypychać terminy i kroki. | poprawka: w kroku 3 po „Reguły bierz z plików modułu” dopisać „i przenoś do odpowiedzi tylko te, które zmieniają decyzję w tej sprawie (zwykle 3-8); modułu nie streszczasz”.

S3-03 | SKILL.md:3 i wpis.md:8, 10, 21 | WAŻNE | Pole description ma 997 znaków przy limicie 1024 dla skilli; dopisanie nazwy nowego modułu karnego go przekroczy. Jednocześnie wpis.md wymienia moduły bez spraw karnych, więc karta w katalogu nie mówi o nowej możliwości. | poprawka: description bez zmian (wyzwalanie zapewnia „co robić w tej sprawie”, a kierowanie mapa). W wpis.md:21 po „przetargi” dopisać „, pierwsza reakcja w sprawach karnych i karnych skarbowych (przeszukanie, świadek, mandat skarbowy, czynny żal, firma pokrzywdzona oszustwem)”; w wpis.md:8 po „przetargi” dopisać „, pierwsza reakcja w sprawach karnych”; w wpis.md:10 dopisać „, zwolnienie lekarskie kontrola pracodawcy, wypadek przy pracy co robić, czynny żal korekta deklaracji, przeszukanie w firmie”. Wersja w wpis.md:5 na 1.1.0.

S3-04 | references/mapa-spraw.md:25 | WAŻNE | Model kieruje sprawę po słowach z kolumny „Sprawa”. Wiersz zatrudnienia nie wymienia spraw, które panel dopisuje do modułu, a ogólne „monitoring” kieruje kamery w sklepie do modułu pracowniczego (C4-12). | poprawka: wiersz zastąpić tekstem: „| Bieżące sprawy pracownicze: zatrudnienie, czas pracy, praca w nocy i w niedziele, urlopy, ciąża i urlopy rodzicielskie, zwolnienie lekarskie i jego kontrola, wypadek przy pracy i BHP, praca zdalna, regulaminy, monitoring pracowników, mobbing, dyskryminacja, kary porządkowe, zakaz konkurencji | `moduly/zatrudnienie-na-co-dzien.md` (ciężki, śmiertelny albo zbiorowy wypadek: także `moduly/sprawy-karne-firmy.md`) | KP, PIP, MINWYN, PPK, SUS |”.

S3-05 | references/moduly/*.md, sekcja „Źródła i akty spoza wbudowanych” | WAŻNE | E5-11 wykrył wspólny blok researchu w przetargach i NIS2, ale problem jest szerszy: ten sam blok (identyczna suma kontrolna) stoi w czterech grupach modułów: najem, NIS2 i przetargi (28 linii, z „Kwestiami spornymi” o najmie); spory i niewypłacalność (53 linie, z dopiskiem „Materiał roboczy dla autora skilla, nie treść do odpowiedzi”, spory-z-kontrahentem.md:286, niewyplacalnosc.md:177); sprzedaż konsumencka, marka i umowy własne (27 linii); zatrudnienie i B2B (44 linie). Każde wczytanie modułu dociąga wiedzę z innego obszaru, a model może przenieść cudze „kwestie sporne” do karty. | poprawka: w każdym module w tej sekcji zostawić tylko wiersze aktów i kwestie dotyczące tego modułu; usunąć zdania „Materiał roboczy dla autora skilla, nie treść do odpowiedzi” i akapity „Podział z innymi skillami” (podział robi mapa-spraw.md). Dla przetargów i NIS2 według E5-11.

S3-06 | references/pisma.md:18 | WAŻNE | Wiersz poziomu A obejmuje „pismo do urzędu (wniosek, wyjaśnienia, odwołanie, zażalenie, ponaglenie, uzupełnienie braków)” bez wyjątków, a po E5-05 i E6-L06 część odwołań i zażaleń (ZUS, decyzja PIP o stosunku pracy, karne skarbowe, karne) jest poziomem B. Tabela i punkt 4.8 będą sobie przeczyć. | poprawka: w pisma.md:18 zamiast „pismo do urzędu (wniosek, wyjaśnienia, odwołanie, zażalenie, ponaglenie, uzupełnienie braków)” wpisać „pismo do urzędu w postępowaniu administracyjnym albo podatkowym (wniosek, wyjaśnienia, odwołanie, zażalenie, ponaglenie, uzupełnienie braków; wyjątki poziomu B w punkcie 4.8)”.

## Werdykt końcowy

GOTOWE DO WYDANIA 1.1.0 PO NANIESIENIU PRZYJĘTYCH: TAK.

Bilans: 224 propozycje; 132 przyjęte, 53 przyjęte ze zmianą, 39 odrzuconych (w większości duble Claude i Codex albo sprawy rzadkie); 6 własnych uwag. Warunki, bez których nie wydawałbym 1.1.0:
1. Blokery z wąskich skilli (E3-01 i C3-01 przedawnienie w `windykacja-miekka`, C4-02, C4-04 i C4-06 w `reklamacja-i-rekojmia`, C5-01 w `pismo-urzedowe`) poprawić w źródłach `skille/<id>/`, podnieść ich wersje i przegenerować kopie `narzedzia/katalog-do-firmy.mjs`; kopii w `references/katalog/` nie poprawiać ręcznie.
2. Do jednego miejsca jeden tekst: przy dublach wstawiać bazę wskazaną w werdykcie.
3. Po naniesieniu: `narzedzia/sprawdz-cytaty.py` bez błędów, test zgodności kopii i 3 scenariusze kontrolne długości (L4 z wypadkiem, przelew na rachunek oszusta, wyciek danych w sklepie): odpowiedź w trybie 1 nadal do około 900 słów, najpilniejsze na górze.
