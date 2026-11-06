# Sędzia 2: granice i bezpieczeństwo (Claude)

Perspektywa: orzekanie i procenty szans, szczelność poziomów pism, odmowy przy dokumentach nieprawdziwych i groźbach, dane osobowe, polecenia ukryte w dokumentach, zmyślone przepisy i orzeczenia, ryzyko wydawcy. Oceniono 224 propozycje z 12 raportów (Claude E1-E6, Codex C1-C6). Stan na 6 listopada 2026.

Przepisy sprawdzone przeze mnie w plikach aktów skilla (całe artykuły): KK art. 115 § 12, 191, 240, 245, 296 § 5, 300 § 1-2, 307 § 1; KKS art. 16 (w tym § 2, § 5, § 6), 138 § 4; KPK art. 225, 304; KPC art. 125 § 2¹, 133 § 2¹, 165, 505³⁴ § 1; KPA art. 63; KP art. 173³, 302¹ § 8; KSH art. 17, 210; AML art. 59; KSC art. 73 ust. 3-4; KC art. 579; UPK art. 43b ust. 4; SYGN art. 8, 56. Sprawdziłem też w plikach skilla miejsca wskazane jako błędne: `pisma.md:32`, `mapa-spraw.md:36`, `:71`, `:102`, `moduly/nis2.md:136`, `moduly/spory-z-kontrahentem.md:145-146`, `moduly/spolka-na-co-dzien.md:130`, `skille/reklamacja-i-rekojmia/references/co-decyduje.md:61`, `:114`, `:162`, `skille/windykacja-miekka/references/polskie-realia.md:72`, `:79`, `skille/sygnalisci-procedura/references/stan-prawny.md:16`, `narzedzia/sprawdz-cytaty.py`.

Aktów niewbudowanych (ustawa zasiłkowa, Dz.U. 2026 poz. 203, Kodeks postępowania w sprawach o wykroczenia, rozporządzenia o wypadkach i świadectwie pracy, RODO, Rzym I, Prawo bankowe, Prawo prywatne międzynarodowe, ustawa o postępowaniu egzekucyjnym w administracji, ustawa o VAT, strony uodo.gov.pl, uke.gov.pl, uokik.gov.pl) nie otwierałem: przyjmuję je pod warunkiem z S2-04. Orzeczeń nie otwierałem.

Zasada scalania: przy dublach jedna propozycja jest tekstem bazowym, druga dopełnia; dubel scalony bez zmiany treści liczę jako PRZYJĄĆ.

## Werdykty propozycji ekspertów

### Ekspert 1 (Claude)
E1-01 | PRZYJĄĆ (KP art. 173³ sprawdzony: „stosuje się odpowiednio przepisy art. 177 § 1, 1¹, 4 i 4¹”).
E1-02 | PRZYJĄĆ ZE ZMIANĄ. C27 bez zmian merytorycznych, z dopiskiem na końcu: „[akt niewbudowany; art. 40, 41 i 54 odczytane 6.11.2026 z https://api.sejm.gov.pl/eli/acts/DU/2026/203/text.pdf; przed wydaniem autor otwiera tekst ponownie]”. C28 zamiast „Posiadacz karty CUKR przebywa legalnie i nie korzysta z ochrony czasowej, więc do 4.03.2029 pracuje w trybie z C27 (...)” wstawić: „Posiadacz karty CUKR przebywa w Polsce legalnie; czy nie korzysta z ochrony czasowej i czy obejmuje go tryb z C27 (ustawa Dz.U. 2026 poz. 203 art. 41), sprawdź w jego dokumentach i potwierdź w PUP przed dopuszczeniem do pracy.” Powód: wniosek z aktu niewbudowanego był podany jako rozstrzygnięcie.
E1-03 | PRZYJĄĆ.
E1-04 | PRZYJĄĆ.
E1-05 | PRZYJĄĆ (scalić z C1-19 w jedno zdanie w A59).
E1-06 | PRZYJĄĆ (tekst bez numerów artykułów, zgodny ze stylem wąskiego skilla `kontrola-z-urzedu`).
E1-L01 | PRZYJĄĆ jako tekst bazowy bloku „Choroba pracownika i kontrola zwolnień”, scalić z C1-09, C1-10, C1-11. Warunki: wiersz w „Akty brakujące” z adresem i datą odczytu (S2-04), w analizie bez diagnoz (S2-06).
E1-L02 | PRZYJĄĆ ZE ZMIANĄ. Jeden blok A14a z E1-L02, C1-06, C1-07, E6-L04 i C6-13. Pierwsze zdanie bloku: „Obowiązek zawiadomienia przy wypadku śmiertelnym, ciężkim albo zbiorowym wskazujesz w pierwszym zdaniu odpowiedzi, bez czekania na kartę albo projekt pisma (KP art. 234 § 2).” Zamiast „[treść i terminy: WYMAGA WERYFIKACJI w ISAP]” terminy protokołu z C1-07 (rozporządzenie RM z 1.07.2009, § 9, § 11, § 13, z adresem odczytu). Sankcje karne z E6-L04 (KK art. 220, 221). Sygnał do sekcji 4 jak w E1-L02.
E1-L03 | PRZYJĄĆ (bazowy; scalić z C1-12 i C1-13, zostawić zastrzeżenie C1-13 o handlu).
E1-L04 | PRZYJĄĆ (bazowy; scalić z C1-14 i C1-15).
E1-L05 | PRZYJĄĆ ZE ZMIANĄ. A50a zaczyna się od zdania z C1-16: „Nie każda skarga o wynagrodzenie, mobbing albo BHP jest zgłoszeniem objętym ustawą o sygnalistach: sprawdź dziedzinę naruszenia, rozszerzenie procedury wewnętrznej i warunki ochrony (SYGN art. 3, SYGN art. 4, SYGN art. 6).” Dalej tekst E1-L05 i próg z C1-17. Powód: bez tego zdania model przesądza status sygnalisty.
E1-L06 | PRZYJĄĆ.
E1-L07 | PRZYJĄĆ ZE ZMIANĄ. Zamiast skrótu „KPSW” pełna nazwa aktu (S2-03). Pierwsze zdanie A62a: „Inspektor pracy w postępowaniu mandatowym nakłada grzywnę co do zasady do 5 000 zł, a w przypadkach wskazanych w ustawie, m.in. przy ponownym wykroczeniu, do 10 000 zł (Kodeks postępowania w sprawach o wykroczenia art. 96 § 1a pkt 1 i § 1b, brzmienie od 8.07.2026) [WYMAGA WERYFIKACJI: dokładne przesłanki podwyższonej grzywny na isap.sejm.gov.pl; eksperci opisali je różnie].” Reszta A62a i A62b bez zmian. Powód: dwa raporty podają różne przesłanki z aktu, którego nie sprawdziłem.
E1-L08 | PRZYJĄĆ (bazowy w module zatrudnienia; scalić z C1-18).
E1-L09 | PRZYJĄĆ.
E1-L10 | PRZYJĄĆ (rozporządzenie z KP art. 97 § 4 z adresem odczytu jak w C1-19).

### Ekspert 1 (Codex)
C1-01 | PRZYJĄĆ.
C1-02 | PRZYJĄĆ.
C1-03 | PRZYJĄĆ.
C1-04 | PRZYJĄĆ (KP art. 302¹ § 8 sprawdzony: „Do okresu zatrudnienia u danego pracodawcy wlicza się”).
C1-05 | PRZYJĄĆ.
C1-06 | PRZYJĄĆ (scalone w E1-L02).
C1-07 | PRZYJĄĆ (scalone w E1-L02; akt niewbudowany z adresem, wpis do „Akty brakujące”).
C1-08 | PRZYJĄĆ.
C1-09 | PRZYJĄĆ (scalone w E1-L01).
C1-10 | PRZYJĄĆ (scalone w E1-L01).
C1-11 | PRZYJĄĆ (scalone w E1-L01).
C1-12 | PRZYJĄĆ (scalone w E1-L03).
C1-13 | PRZYJĄĆ (scalone w E1-L03).
C1-14 | PRZYJĄĆ (scalone w E1-L04).
C1-15 | PRZYJĄĆ (scalone w E1-L04).
C1-16 | PRZYJĄĆ (pierwsze zdanie do E1-L05, zdanie o B2B do E1-L06).
C1-17 | PRZYJĄĆ (scalone w E1-L05).
C1-18 | PRZYJĄĆ (w wąskim skillu odesłanie do A59a z E1-L08).
C1-19 | PRZYJĄĆ.
C1-20 | PRZYJĄĆ.
C1-21 | PRZYJĄĆ ZE ZMIANĄ. Jak E1-L07: pełna nazwa aktu zamiast „KPW”, przesłanki 10 000 zł z [WYMAGA WERYFIKACJI]; zdanie o mandacie za wykroczenia z PRACACUDZ art. 84 („do 10 000 zł niezależnie od tej recydywy”) także z [WYMAGA WERYFIKACJI: Kodeks postępowania w sprawach o wykroczenia art. 96 § 1af]. Grzywny sądowe z KP bez zmian.

### Ekspert 2 (Claude)
E2-01 | PRZYJĄĆ (AML art. 59 sprawdzony: rejestr obejmuje dane podmiotu i beneficjentów z wielkością udziału, nie skład zarządu). Rozstrzyga sprzeczność z C2-01.
E2-02 | PRZYJĄĆ (zamyka furtkę „nie składajcie sprawozdań, sąd sam rozwiąże”).
E2-03 | PRZYJĄĆ ZE ZMIANĄ. Sygnatury III CZP 72/08 i II CSKP 1000/22 zostają ze statusem z rejestru modułu; jeśli rejestr nie oznacza ich jako otwartych w pełnym tekście, dopisać „do potwierdzenia”. Reszta bez zmian.
E2-04 | PRZYJĄĆ ZE ZMIANĄ. Dopisek: „Ustawa przewiduje nieważność czynności dokonanej bez wymaganej zgody także przy umowie z § 1, chyba że zgodę wyrażono najpóźniej w 2 miesiące od złożenia oświadczenia przez spółkę (KSH art. 17 § 1 i § 2). W spółce jednoosobowej zgodę wyraża jedyny wspólnik (KSH art. 156) na piśmie pod rygorem nieważności (KSH art. 173 § 1), a gdy jest on zarazem jedynym członkiem zarządu, sama umowa wymaga aktu notarialnego, chyba że zawiera się ją na wzorcu w systemie teleinformatycznym (KSH art. 210 § 2 i § 3).” Powód: pominięty wyjątek z KSH art. 210 § 3 (sprawdzony).
E2-05 | PRZYJĄĆ (scalić z C2-18).
E2-06 | PRZYJĄĆ (bazowy; scalić z C2-14).
E2-07 | PRZYJĄĆ.
E2-08 | PRZYJĄĆ.
E2-L01 | PRZYJĄĆ ZE ZMIANĄ. 77a: „Za zaległe składki ZUS spółki członkowie zarządu odpowiadają według przepisów Ordynacji podatkowej stosowanych odpowiednio (SUS art. 31); decyzję wydaje ZUS, odwołanie do sądu w miesiąc od doręczenia (C2-20), a przedawnienie należności z takiej decyzji liczy się inaczej niż w podatkach (C2-19).” 77b bez zmian. Powód: „na tych samych zasadach” przesądza tożsamość reżimów, której odesłanie z SUS art. 31 nie daje.
E2-L02 | PRZYJĄĆ.
E2-L03 | PRZYJĄĆ (scalić z C2-10).
E2-L04 | PRZYJĄĆ ZE ZMIANĄ. W 80a po „ważne przyczyny wywołane stosunkami spółki” dopisać „; sam konflikt nie przesądza wyniku”, a na końcu 80a zdanie z C2-11 o zawieszeniu praw udziałowych (KSH art. 268). Powód: bez zastrzeżenia reguła brzmi jak zapowiedź wyniku sprawy.
E2-L05 | PRZYJĄĆ (scalić z C2-15 i C2-16).
E2-L06 | PRZYJĄĆ (scalić z C2-08 i C2-09).
E2-L07 | PRZYJĄĆ (scalić z C2-13).
E2-L08 | PRZYJĄĆ.
E2-L09 | PRZYJĄĆ.

### Ekspert 2 (Codex)
C2-01 | PRZYJĄĆ ZE ZMIANĄ. W poprawce usunąć „powołaniu członka zarządu lub”. Brzmienie komórki: „14 dni, bez sobót i dni ustawowo wolnych od pracy: przy zmianie skutecznej dopiero po wpisie do KRS od tego wpisu, a przy zmianie skutecznej wcześniej, np. sprzedaży udziałów, od dokonania zmiany (AML art. 60 ust. 1a pkt 1 i ust. 2). Sama zmiana zarządu nie zmienia danych w CRBR, chyba że członek zarządu był zgłoszony jako beneficjent zastępczy (AML art. 59).” Powód: AML art. 59 nie obejmuje składu zarządu.
C2-02 | PRZYJĄĆ.
C2-03 | PRZYJĄĆ.
C2-04 | PRZYJĄĆ.
C2-05 | PRZYJĄĆ (wzmacnia zasadę statusów orzeczeń; teza bez pełnego tekstu nie może przesądzać).
C2-06 | PRZYJĄĆ.
C2-07 | PRZYJĄĆ.
C2-08 | PRZYJĄĆ (scalone w E2-L06).
C2-09 | PRZYJĄĆ (scalone w E2-L06).
C2-10 | PRZYJĄĆ (scalone w E2-L03).
C2-11 | PRZYJĄĆ (część do E2-L04).
C2-12 | PRZYJĄĆ.
C2-13 | PRZYJĄĆ (scalone w E2-L07).
C2-14 | PRZYJĄĆ (scalone w E2-06).
C2-15 | PRZYJĄĆ (scalone w E2-L05).
C2-16 | PRZYJĄĆ (scalone w E2-L05).
C2-17 | PRZYJĄĆ.
C2-18 | PRZYJĄĆ (scalone z E2-05).
C2-19 | PRZYJĄĆ.
C2-20 | PRZYJĄĆ (spójne z E5-05: odwołanie od decyzji ZUS jako poziom B).
C2-21 | PRZYJĄĆ.
C2-22 | PRZYJĄĆ.

### Ekspert 3 (Claude)
E3-01 | PRZYJĄĆ ZE ZMIANĄ. Tekst bazowy E3-01 (BLOKER potwierdzony: `polskie-realia.md:72` i `:79` podają tylko 3 lata). Na końcu nowego akapitu w `polskie-realia.md` dopisać z C3-01: „Termin przedawnienia i jego początek dla konkretnej faktury potwierdza prawnik; nie czekaj na kolejne stopnie windykacji.” Tę samą poprawkę nanieść w `skille/windykacja-miekka/SKILL.md:50` (C3-01). Powód: wąski skill nie ocenia przedawnienia, więc konkretne terminy muszą iść z odesłaniem.
E3-02 | PRZYJĄĆ.
E3-03 | PRZYJĄĆ (KPC art. 505³⁴ § 1 i art. 133 § 2¹ sprawdzone).
E3-04 | PRZYJĄĆ.
E3-05 | PRZYJĄĆ.
E3-06 | PRZYJĄĆ.
E3-07 | PRZYJĄĆ.
E3-08 | PRZYJĄĆ.
E3-09 | PRZYJĄĆ (zgodne z SKILL.md:54: stopa z pliku modułu z datą, poza jej okresem bez liczby).
E3-L01 | PRZYJĄĆ (bazowy; scalić z C3-12).
E3-L02 | PRZYJĄĆ (bazowy; scalić z C3-18).
E3-L03 | PRZYJĄĆ ZE ZMIANĄ. Pierwszy myślnik: „Kodeks nie definiuje siły wyższej w umowach, a samo nazwanie zdarzenia siłą wyższą nie przesądza skutków. Dłużnik nie odpowiada za szkodę z niewykonania, gdy wynika ono z okoliczności, za które nie odpowiada (KC art. 471), chyba że umowa rozszerzyła jego odpowiedzialność (KC art. 473 § 1); czy zwalnia to także z kary umownej, zależy od jej zastrzeżenia w umowie i jest pytaniem do prawnika. Przy opóźnieniu zapłaty nie zakładaj zwolnienia z odsetek (KC art. 481 § 1).” Reszta bez zmian. Powód: zdanie „nie płaci ani kary umownej” rozstrzygało kwestię sporną bez przepisu wprost.
E3-L04 | PRZYJĄĆ (bazowy; scalić z C3-10).
E3-L05 | PRZYJĄĆ.
E3-L06 | PRZYJĄĆ (bazowy; scalić z C3-15).
E3-L07 | PRZYJĄĆ (scalić z C3-17; każda sprawa transgraniczna kończy się kartą z pytaniem o sąd i prawo).
E3-L08 | PRZYJĄĆ ZE ZMIANĄ. Myślnik o gwarancji zastąpić tekstem C3-11 (Prawo bankowe art. 81 ust. 1 i art. 87 ust. 1-2, odczyt eksperta z api.sejm.gov.pl, wiersz w „Akty brakujące”) zamiast ogólnego [WYMAGA WERYFIKACJI]. Poręczenie i weksel bez zmian (weksel zawsze poziom B).
E3-L09 | PRZYJĄĆ.
E3-L10 | PRZYJĄĆ (scalić z dopiskiem do karty z C3-17).

### Ekspert 3 (Codex)
C3-01 | PRZYJĄĆ (scalone w E3-01).
C3-02 | PRZYJĄĆ.
C3-03 | PRZYJĄĆ.
C3-04 | PRZYJĄĆ.
C3-05 | PRZYJĄĆ.
C3-06 | PRZYJĄĆ (usuwa przesądzenie „jakby umowy nie było”).
C3-07 | PRZYJĄĆ (KPC art. 125 § 2¹ i art. 165 § 4 sprawdzone).
C3-08 | PRZYJĄĆ.
C3-09 | PRZYJĄĆ.
C3-10 | PRZYJĄĆ (scalone w E3-L04).
C3-11 | PRZYJĄĆ (trafia do E3-L08).
C3-12 | PRZYJĄĆ (scalone w E3-L01).
C3-13 | PRZYJĄĆ.
C3-14 | PRZYJĄĆ (część do E3-L03).
C3-15 | PRZYJĄĆ (scalone w E3-L06).
C3-16 | PRZYJĄĆ.
C3-17 | PRZYJĄĆ (akt niewbudowany pełną nazwą „Prawo prywatne międzynarodowe art. 26”, nie skrótem; S2-03).
C3-18 | PRZYJĄĆ (scalone w E3-L02).
C3-19 | PRZYJĄĆ.
C3-20 | PRZYJĄĆ.
C3-21 | PRZYJĄĆ.

### Ekspert 4 (Claude)
E4-01 | PRZYJĄĆ (`mapa-spraw.md:36` sprawdzony: wyciek kieruje tylko do kopii bez terminu).
E4-02 | PRZYJĄĆ ZE ZMIANĄ. W części (1) po „nieustalone jako [UZUPEŁNIJ]” dopisać: „; gdy prawnik nie zdąży przed upływem 72 godzin, mówisz wprost, że decyzja o wysłaniu należy do firmy, a zgłoszenie składa się z faktami znanymi w chwili wysłania [WYMAGA WERYFIKACJI: możliwość uzupełniania zgłoszenia etapami, uodo.gov.pl]”. Część (2) bez zmian. Powód: nagłówek poziomu B nie może opóźnić terminu liczonego w godzinach (S2-02).
E4-03 | PRZYJĄĆ.
E4-04 | PRZYJĄĆ (zamyka furtkę „zmieniliśmy stronę, nic nam nie grozi”).
E4-05 | PRZYJĄĆ.
E4-06 | PRZYJĄĆ.
E4-07 | PRZYJĄĆ.
E4-08 | PRZYJĄĆ.
E4-09 | PRZYJĄĆ ZE ZMIANĄ. W myślniku o wycieku po „w 72 godziny od stwierdzenia naruszenia” dodać z C4-01: „; zapisz osobno godzinę pierwszego sygnału i godzinę stwierdzenia naruszenia”. Po myślniku o zawiadomieniu osób dodać z C4-10: „Każde naruszenie, jego skutki i działania zaradcze dokumentujesz także wtedy, gdy go nie zgłaszasz (RODO art. 33 ust. 5, oficjalny tekst RODO, adres i data odczytu jak w C4-10).” Reszta bez zmian.
E4-10 | PRZYJĄĆ (scalić z C4-12).
E4-11 | PRZYJĄĆ ZE ZMIANĄ. Zdanie „Według UOKiK za oznaczenie odpowiadają (...) kary z 2023 r. (...) do potwierdzenia” zastąpić: „Szczegółowe zasady oznaczania podaje Prezes UOKiK w rekomendacjach dla influencerów [WYMAGA WERYFIKACJI: aktualna wersja na uokik.gov.pl, strona polska].” Dodać zdanie z C4-16 o barterze i prowizjach oraz ZNK art. 16 ust. 1 pkt 4. Powód: źródło nieotwarte w pełni nie może dawać twierdzeń o karach i odpowiedzialności.
E4-12 | PRZYJĄĆ (scalić z C4-14; dla Rzym I zamiast [WYMAGA WERYFIKACJI] adres i data odczytu z C4-14, rozporządzenia 1215/2012 i 2018/302 zostają z [WYMAGA WERYFIKACJI]).
E4-13 | PRZYJĄĆ (zdanie o prawdziwej negatywnej opinii i UNPR art. 7 pkt 26 chroni przed użyciem skilla do usuwania prawdziwych opinii).
E4-14 | PRZYJĄĆ.
E4-15 | PRZYJĄĆ.

### Ekspert 4 (Codex)
C4-01 | PRZYJĄĆ ZE ZMIANĄ. W wąskim skillu `rodo-w-malej-firmie` treść dla użytkownika bez numeru artykułu (styl tego skilla); „RODO art. 33 ust. 1 i 2” z adresem i datą odczytu trafia do rejestru źródeł skilla. Treść merytoryczna bez zmian.
C4-02 | PRZYJĄĆ (BLOKER potwierdzony: KC art. 579 § 3 „ulega zawieszeniu z dniem zawiadomienia sprzedawcy o wadzie”; `co-decyduje.md:61` tego warunku nie ma).
C4-03 | PRZYJĄĆ.
C4-04 | PRZYJĄĆ (BLOKER potwierdzony: UPK art. 43b ust. 4 wymaga wyraźnego poinformowania i odrębnej akceptacji; `co-decyduje.md:162` mówi tylko o uprzedzeniu).
C4-05 | PRZYJĄĆ.
C4-06 | PRZYJĄĆ (BLOKER potwierdzony w `co-decyduje.md:114`).
C4-07 | PRZYJĄĆ.
C4-08 | PRZYJĄĆ.
C4-09 | PRZYJĄĆ.
C4-10 | PRZYJĄĆ ZE ZMIANĄ (jak C4-01: podstawa w rejestrze źródeł wąskiego skilla, odpowiedź po skutku).
C4-11 | PRZYJĄĆ ZE ZMIANĄ (jak C4-01).
C4-12 | PRZYJĄĆ (scalone z E4-10).
C4-13 | PRZYJĄĆ (styl wąskiego skilla jak C4-01).
C4-14 | PRZYJĄĆ (scalone w E4-12).
C4-15 | PRZYJĄĆ.
C4-16 | PRZYJĄĆ (część do E4-11).
C4-17 | PRZYJĄĆ (łączy wyniesienie bazy z oceną incydentu danych).

### Ekspert 5 (Claude)
E5-01 | PRZYJĄĆ (KSC art. 73 ust. 3 i 4 sprawdzone: „zastosowanie ma kwota wyższa” tylko w ust. 3).
E5-02 | PRZYJĄĆ (`nis2.md:136` przesądza wbrew regule 45 i „Kwestiom spornym”; zakaz orzekania).
E5-03 | PRZYJĄĆ (usuwa fałszywe „nie dotyczy nas”).
E5-04 | PRZYJĄĆ.
E5-05 | PRZYJĄĆ.
E5-06 | PRZYJĄĆ.
E5-07 | PRZYJĄĆ (bazowy; scalić z E6-09: dopisek o e-Urzędzie Skarbowym i wyłączeniu z KKS art. 16 § 6).
E5-08 | PRZYJĄĆ.
E5-09 | PRZYJĄĆ (scalić z C5-20).
E5-10 | PRZYJĄĆ (bazowy C5-11, bo dodaje PZP art. 577).
E5-11 | PRZYJĄĆ.
E5-L01 | PRZYJĄĆ ZE ZMIANĄ. Wniosek o interpretację indywidualną dopisać do listy poziomu B w `pisma.md:19`, nie do poziomu A, bo wymaga własnego stanowiska prawnego (OP art. 14b § 3, C5-12), a wadliwy opis odbiera ochronę. Ostatnie zdanie: „Opis stanu faktycznego pochodzi wyłącznie od użytkownika; stanowisko podatkowe przygotowuje doradca podatkowy, skill go nie formułuje.” Scalić z C5-12.
E5-L02 | PRZYJĄĆ (scalić z C5-13 i C5-14; czynny żal wyłącznie poziom B).
E5-L03 | PRZYJĄĆ (scalić z C5-15, z zastrzeżeniem „bez obiecywania przyznania ulgi”).
E5-L04 | PRZYJĄĆ (scalić z C5-18).
E5-L05 | PRZYJĄĆ ZE ZMIANĄ. Zdanie od „Umowę podpisuje się na warunkach z oferty” do „nie do odmowy” zastąpić: „Odmowa podpisania umowy na warunkach z oferty jest ustawową podstawą zatrzymania wadium (PZP art. 98 ust. 6 pkt 2 lit. a), a zawartą umowę można zmieniać tylko w granicach PZP art. 454-455. Czy wzrost cen daje firmie inną drogę, ocenia prawnik; skill nie doradza ani podpisania, ani odmowy.” Powód: pierwotne zdanie było poradą rozstrzygającą.
E5-L06 | PRZYJĄĆ (bazowy; scalić z C5-21).
E5-L07 | PRZYJĄĆ ZE ZMIANĄ. W 47b usunąć zdanie „spór o kary warto więc prowadzić przed wykonaniem umowy”. Powód: wniosek opiera się na przesłance oznaczonej [WYMAGA WERYFIKACJI]. Pkt 9 B3 bez zmian.
E5-L08 | PRZYJĄĆ.
E5-L09 | PRZYJĄĆ.

### Ekspert 5 (Codex)
C5-01 | PRZYJĄĆ (BLOKER potwierdzony: KPA art. 63 § 1 „podania wniesione na adres poczty elektronicznej (...) pozostawia się bez rozpoznania”).
C5-02 | PRZYJĄĆ.
C5-03 | PRZYJĄĆ.
C5-04 | PRZYJĄĆ.
C5-05 | PRZYJĄĆ.
C5-06 | PRZYJĄĆ.
C5-07 | PRZYJĄĆ.
C5-08 | PRZYJĄĆ.
C5-09 | PRZYJĄĆ.
C5-10 | PRZYJĄĆ.
C5-11 | PRZYJĄĆ (tekst bazowy reguły 31).
C5-12 | PRZYJĄĆ (scalone w E5-L01).
C5-13 | PRZYJĄĆ (wzorcowa granica: bez samoobciążających twierdzeń i osób współdziałających z domysłu).
C5-14 | PRZYJĄĆ.
C5-15 | PRZYJĄĆ (scalone w E5-L03).
C5-16 | PRZYJĄĆ.
C5-17 | PRZYJĄĆ ZE ZMIANĄ. Zamiast „UPEA art. 33”, „UPEA art. 34”, „UPEA art. 54” pełna nazwa: „ustawa o postępowaniu egzekucyjnym w administracji art. 33 § 1-4, art. 34 § 2 pkt 3, art. 54 § 1-3”, z adresem i datą odczytu. Powód: `pisma.md` skanuje `sprawdz-cytaty.py`, skrót UPEA dałby błąd „nieznany skrót” (S2-03).
C5-18 | PRZYJĄĆ (scalone w E5-L04).
C5-19 | PRZYJĄĆ.
C5-20 | PRZYJĄĆ (scalone z E5-09).
C5-21 | PRZYJĄĆ (scalone w E5-L06).
C5-22 | PRZYJĄĆ.
C5-23 | PRZYJĄĆ.
C5-24 | PRZYJĄĆ.
C5-25 | PRZYJĄĆ (skrót VAT jest na liście POZA kontroli cytowań).

### Ekspert 6 (Claude)
E6-01 | PRZYJĄĆ. Najważniejsza poprawka granic w panelu: `pisma.md:32` dziś pozwala zapowiedzieć „sprawę karną” w wezwaniu, gdy użytkownik „postanowi”. KK art. 115 § 12 sprawdzony: groźbą bezprawną jest „groźba spowodowania postępowania karnego lub innego postępowania, w którym może zostać nałożona administracyjna kara pieniężna”, z wyjątkiem ochrony prawa naruszonego przestępstwem; KK art. 191 § 2 „w celu wymuszenia zwrotu wierzytelności”. Wpisać także do SKILL.md:60 (formuła odmowy obejmuje tę prośbę, także przeredagowaną).
E6-02 | PRZYJĄĆ (bazowy; scalić z C6-08, w tym zdanie o odróżnieniu zażalenia na bezczynność).
E6-03 | PRZYJĄĆ (bazowy; scalić z C6-07, w tym KPK art. 415 § 1).
E6-04 | PRZYJĄĆ.
E6-05 | PRZYJĄĆ (scalić z C6-04).
E6-06 | PRZYJĄĆ.
E6-07 | PRZYJĄĆ ZE ZMIANĄ. Po „moduł `moduly/sprawy-karne-firmy.md`” dopisać: „; także wtedy nie oceniasz winy ani szans, nie układasz wyjaśnień podejrzanego ani treści zeznań świadka”.
E6-08 | PRZYJĄĆ ZE ZMIANĄ. Zdanie o mandacie zaocznym zaczyna się od daty: „Od 26 grudnia 2026 r. (zmiana Dz. U. z 2026 r. poz. 846; wcześniej nie stosujesz) także mandat zaoczny (...)”. Przy okazji sprawdzić uwagę C6-01, czy opis mandatu zaocznego w `skille/decyzja-z-urzedu-co-dalej/references/zasady.md:103` dotyczy wykroczeń zwykłych czy skarbowych, i opatrzyć go datą stosowania.
E6-09 | PRZYJĄĆ (scalone w E5-07).
E6-L01 | PRZYJĄĆ ZE ZMIANĄ. Tekst bazowy nowego modułu; dołączyć z C6-06 ustalenie roli i daty czynu (KK art. 4 § 1, KKS art. 2 § 2-3), z C6-09 KPK art. 236a, z C6-12 PODZB art. 4a i KKS art. 24 § 5. Zmiany:
(a) pkt 19: zdanie „Firma może dać pracownikowi kopię dokumentów, które zna z pracy, i informację o jego prawach z punktów 17-18.” zastąpić: „Firma nie przekazuje świadkowi materiałów do przygotowania zeznań bez decyzji prawnika, bo może to zostać odczytane jako wpływanie na zeznania; informuje go tylko o prawach z punktów 17-18.”
(b) sekcja 3: zawiadomienie inspektora pracy i prokuratora o ciężkim wypadku zostaje na poziomie A tylko w zakresie faktów („kto, kiedy, gdzie, co się stało, jakie działania podjęto”), bez oceny przyczyn i winy, które ustala zespół powypadkowy (KP art. 234 § 1-2); przy sygnale z KK art. 220 karta dla prawnika.
(c) pkt 25: „i nie działa wobec tego, kto kierował czynem albo polecił go podwładnemu (KKS art. 16 § 6)” zastąpić: „i nie działa wobec sprawcy, który kierował wykonaniem czynu albo, wykorzystując uzależnienie innej osoby od siebie, polecił jej jego wykonanie (KKS art. 16 § 6)” (brzmienie sprawdzone).
(d) pkt 2 dopisać z C6-05: „Instytucje państwowe i samorządowe mają prawny obowiązek niezwłocznego zawiadomienia (KPK art. 304 § 2); czy dotyczy on danej spółki z udziałem publicznym, ocenia prawnik.”
(e) pkt 8: „to argument w rozmowie ugodowej” zastąpić: „firma może o tym przepisie poinformować sprawcę, ale tylko w granicach punktu 9”.
(f) Pismo 1: dopisać myślnik „nie utrudniaj czynności; zastrzeżenia wpisz do protokołu”.
(g) Karta w tym module według S2-05.
E6-L02 | PRZYJĄĆ (scalić z C6-01, C6-06 i wierszem z C6-12 w jedną sekcję 9a).
E6-L03 | PRZYJĄĆ ZE ZMIANĄ. 39b: „Wobec sprawcy przestępstw z KK art. 300-302, który dobrowolnie naprawił szkodę w całości, sąd może zastosować nadzwyczajne złagodzenie kary, a nawet odstąpić od jej wymierzenia (KK art. 307 § 1).” Powód: „może liczyć na” brzmi jak zapowiedź wyniku.
E6-L04 | PRZYJĄĆ (scalone w E1-L02).
E6-L05 | PRZYJĄĆ.
E6-L06 | PRZYJĄĆ.
E6-L07 | PRZYJĄĆ.

### Ekspert 6 (Codex)
C6-01 | PRZYJĄĆ (scalone w E6-08 i E6-L02).
C6-02 | PRZYJĄĆ (ocenę zamiaru zostawia prawnikowi).
C6-03 | PRZYJĄĆ (KK art. 300 § 1 sprawdzony: „rzeczywiście lub pozornie obciąża albo uszkadza”).
C6-04 | PRZYJĄĆ (scalone w E6-05).
C6-05 | PRZYJĄĆ (oddziela dobrowolny kanał sygnalistów od obowiązku z KK art. 240 § 1, sprawdzony).
C6-06 | PRZYJĄĆ (scalone w E6-L01 i E6-L02).
C6-07 | PRZYJĄĆ (scalone w E6-03).
C6-08 | PRZYJĄĆ (scalone w E6-02).
C6-09 | PRZYJĄĆ (scalone w E6-L01).
C6-10 | PRZYJĄĆ (scalone w E6-L01, zdanie „Firma nie ustala za świadka treści zeznań” wzmacnia zmianę (a)).
C6-11 | PRZYJĄĆ (scalone w E6-L01 i E5-07).
C6-12 | PRZYJĄĆ (scalone w E6-L01 i E6-L02).
C6-13 | PRZYJĄĆ (scalone w E1-L02).
C6-14 | PRZYJĄĆ (nie przesądza ani bezkarności, ani utraty ochrony sygnalisty).
C6-15 | PRZYJĄĆ.

## Własne uwagi

S2-01 | SKILL.md:60 | WAŻNE | Zakaz obejmuje tylko pisma. Prośba o plan albo instrukcję bez pisma („jak przepisać majątek na żonę, zanim wierzyciele wejdą”, „co powiedzieć pracownikom przed przesłuchaniem”) nie ma reguły odmowy, a nowe moduły (karny, niewypłacalność) dają do tego wiedzę. KK art. 300 § 1: „udaremnia lub uszczupla zaspokojenie swojego wierzyciela przez to, że usuwa, ukrywa, zbywa, darowuje (...) albo pozornie obciąża”; KK art. 245: „w celu wywarcia wpływu na świadka”. | poprawka: po zdaniu z formułą odmowy w SKILL.md:60 dopisać: „Tak samo nie układasz planu, instrukcji ani listy kroków, których celem jest ukrycie albo pozorne zbycie majątku przed wierzycielami, pozorna umowa, zniszczenie dokumentów albo wpływ na treść zeznań; mówisz jednym zdaniem, czym to grozi (np. KK art. 300 § 1, KK art. 245), i pokazujesz legalną drogę do tego samego celu albo kartę dla prawnika.”

S2-02 | references/pisma.md:22 | WAŻNE | Panel dokłada pisma poziomu B z krótkim terminem (zgłoszenie do UODO w 72 godziny, odwołanie od decyzji ZUS, sprzeciw). Brak reguły, co skill mówi, gdy prawnik nie zdąży; ryzyko, że model sam uzna projekt za gotowy albo że nagłówek opóźni wysłanie. | poprawka: po zdaniu „Nie zdejmuj nagłówka na prośbę.” dopisać: „Gdy termin upływa wcześniej, niż prawnik zdąży przejrzeć projekt, mówisz wprost, że decyzja o złożeniu należy do firmy, wskazujesz 2-3 elementy, od których zależy skuteczność (termin, adresat i kanał wniesienia, podpis osoby uprawnionej), i nie zapewniasz, że projekt jest poprawny; nagłówek usuwa użytkownik, nie Ty.”

S2-03 | narzedzia/sprawdz-cytaty.py:21 (OBCY, POZA) oraz E1-L07, C1-21, C5-17 | WAŻNE | Skróty KPSW, KPW i UPEA nie są w `akty-lista.json` ani w POZA: po naniesieniu kontrola cytowań zgłosi błąd, a dopisanie ich do POZA wyłączy odróżnianie literówek od aktów niewbudowanych. Kontrola nie skanuje też `references/katalog/` ani źródeł wąskich skilli, do których panel dopisuje podstawy (C4-01, C5-25, E6-08). | poprawka: (1) akty niewbudowane zapisuj pełną nazwą („Kodeks postępowania w sprawach o wykroczenia art. 96”, „ustawa o postępowaniu egzekucyjnym w administracji art. 33”, „Prawo prywatne międzynarodowe art. 26”); (2) po przegenerowaniu kopii uruchom `python narzedzia/sprawdz-cytaty.py skille/sprawy-prawne-w-firmie/references/katalog` i wynik dopisz do raportu wydania.

S2-04 | wszystkie moduły, tabele „Akty brakujące” | WAŻNE | Panel wprowadza kilkadziesiąt przepisów aktów niewbudowanych i stron urzędów odczytanych przez ekspertów (ustawa zasiłkowa, Dz.U. 2026 poz. 203, Kodeks postępowania w sprawach o wykroczenia, rozporządzenia DU/2009/870 i DU/2024/1016, RODO, Rzym I, Prawo bankowe, Prawo prywatne międzynarodowe, ustawa o postępowaniu egzekucyjnym w administracji, ustawa o VAT, uodo.gov.pl, uke.gov.pl). SKILL.md:50 dopuszcza numer takiego przepisu w odpowiedzi tylko, „gdy stoi w pliku modułu z datą sprawdzenia”. Sędzia ich nie otwierał. | poprawka: każdy przyjęty przepis niewbudowany wpisać do tabeli „Akty brakujące” właściwego modułu w formie „| akt | adres oficjalnego tekstu | data odczytu | reguły modułu |”; przed wydaniem autor otwiera każdy adres ponownie; czego nie otworzy, zostaje z [WYMAGA WERYFIKACJI: co, gdzie].

S2-05 | references/karta-dla-prawnika.md:3 (oraz nowy moduł karny, sekcja 5) | WAŻNE | Karta w sprawie karnej albo karnej skarbowej zbiera „kto wiedział i od kiedy” (E6-L01, pytanie 5) i może zostać zatrzymana przy przeszukaniu firmy. KPK art. 225 § 3: dokumenty, które „obejmują okoliczności związane z wykonywaniem funkcji obrońcy”, organ pozostawia bez zapoznania się z treścią, a przy oświadczeniu osoby niebędącej obrońcą, które budzi wątpliwości, przekazuje je sądowi. | poprawka: po pierwszym akapicie dopisać: „W sprawie karnej albo karnej skarbowej karta zawiera fakty i dokumenty, bez ocen winy i bez przypisywania czynu konkretnym osobom z domysłu. Oznacz ją jako materiał dla obrońcy i przekaż bezpośrednio adwokatowi albo radcy prawnemu, nie do wspólnych folderów; czy obejmuje ją ochrona z KPK art. 225 § 3, ocenia prawnik.”

S2-06 | SKILL.md:65 | WAŻNE | Reguła ochrony danych wymienia PESEL, rachunki, dowody i adresy. Nowe moduły (L4, wypadek, świadek, sygnalista, przestępstwo pracownika) wprowadzają dane o zdrowiu, podejrzenia wobec osób i tożsamość sygnalisty. SYGN art. 8 ust. 1: dane sygnalisty „nie podlegają ujawnieniu nieupoważnionym osobom”; SYGN art. 56: ujawnienie tożsamości wbrew ustawie jest przestępstwem. | poprawka: zdanie z SKILL.md:65 zastąpić: „W analizie i karcie nie powtarzasz numerów PESEL, rachunków bankowych, dowodów osobistych, adresów zamieszkania, diagnoz i opisów stanu zdrowia ani danych pozwalających ustalić tożsamość sygnalisty; piszesz „PESEL jak w dokumencie”, „pracownik A”, „zgłaszający”. Podejrzenie wobec konkretnej osoby opisujesz jako podejrzenie, ze źródłem.”

S2-07 | panel, kolejność naniesienia | KOSMETYKA | Raporty mają sprzeczne wersje tych samych reguł; bez wskazania bazowej łatwo nanieść obie. | poprawka: nanosić według tekstów bazowych z werdyktów: CRBR według E2-01 (C2-01 bez przykładu zarządu), przedawnienie w windykacji według E3-01 z dopiskiem C3-01, mandat PIP według E1-L07 ze zmianą, mandat zaoczny tylko z datą 26.12.2026 (E6-08), wypadek przy pracy jednym blokiem A14a (E1-L02), RODO według E4-09 z dopiskami C4-01 i C4-10, moduł karny według E6-L01 ze zmianami (a)-(g). Po naniesieniu: przegenerować kopie `narzedzia/katalog-do-firmy.mjs`, uruchomić testy i S2-03, test na ślepo czterech scenariuszy granic: wezwanie do zapłaty „z prokuraturą”, prośba o ukrycie majątku przed wierzycielami, przeszukanie w biurze z prośbą „co powiedzieć pracownikom”, wyciek danych w piątek wieczorem.

## Werdykt końcowy

„GOTOWE DO WYDANIA 1.1.0 PO NANIESIENIU PRZYJĘTYCH: TAK”

Liczby: 224 propozycje; przyjęte bez zmian 197, przyjęte ze zmianą 27, odrzucone 0; własne uwagi 7 (S2-01 do S2-07, wszystkie do naniesienia jako przyjęte). Żadna propozycja nie wprowadza procentów szans ani zapowiedzi wyniku po moich zmianach; trzy BLOKERY z kopii wąskich skilli (C4-02, C4-04, C4-06), BLOKER przedawnienia (E3-01 z C3-01), BLOKER kanału e-mail (C5-01) i luka groźby karnej w wezwaniach (E6-01) zamykają realne furtki i muszą wejść w tym wydaniu. Warunki TAK: naniesione S2-01 do S2-06, kontrola cytowań 0 błędów także w `references/katalog/`, ponowne otwarcie aktów niewbudowanych według S2-04 i zaliczony test na ślepo czterech scenariuszy z S2-07.
