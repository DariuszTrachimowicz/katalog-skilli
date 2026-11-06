# Sędzia 1: praktyk, radca prawny obsługujący małe i średnie firmy (Claude)

Stan oceny: 6 listopada 2026. Ocenione wszystkie propozycje z 12 raportów (ekspert-1..6 Claude, codex-ekspert-1..6 Codex). Przepisy sprawdzane w plikach `skille/sprawy-prawne-w-firmie/references/akty/` (pełne artykuły, z konwencją [ ] i < >), m.in.: KP art. 25, 52, 63², 92, 92¹, 93, 97, 151⁷, 151⁸, 151¹⁰-151¹², 173¹-173³, 177, 178, 180, 182¹ᵃ, 182¹ᶜ, 182¹ᵈ, 182³, 186, 186⁴, 186⁷, 186⁸, 226, 229, 234, 237⁶, 237⁹, 237¹¹, 281, 283, 302¹; KSH art. 17, 18, 26, 31, 32, 58, 64, 67, 104, 112, 124, 173, 199, 210, 244, 255, 268, 270, 271, 277, 280-282, 285, 286, 295, 296, 300⁶⁷, 300¹³², 584, 584¹³; KC art. 71, 81, 118, 121, 357¹, 365¹, 442¹, 449²-449⁹, 451, 475, 505, 512-516, 543, 554, 563, 579, 646, 647¹, 649¹, 649⁴, 664, 675, 751, 764¹, 764³, 876, 881; KPC art. 130, 139, 165, 458², 458⁵, 458⁹, 477⁹, 505²⁸, 505³⁴, 1002, 1104, 1161, 1162, 1165, 1166; KPA art. 63; OP art. 56a, 81, 115, 169, 306a; KKS art. 16, 16a, 53, 77, 138, 140; KK art. 115 § 12, 191, 221, 296 § 5, 307; KPK art. 82, 88, 220, 236, 285; PODZB art. 7, 21, 27, 28; PU art. 11, 127, 373; PR art. 160; SUS art. 8, 24 ust. 5d, 29, 31; AML art. 41, 59, 60, 86; KSC art. 5, 73; PZP art. 139, 263, 274, 308, 453, 456, 465; PIP art. 11, 13, 34; PRACACUDZ art. 3, 5a, 59, 84, 85; CUDZ art. 121; SYGN art. 12-14, 16, 23, 24, 58; ZNK art. 23, 27; UOKIK art. 28; UPK art. 27, 30, 38, 43b, 43l; PWP art. 147, 152¹⁷; PRAUT art. 55; SDE art. 12-15 (uchylone od 6.11.2026); ZATORY art. 5, 10.

Zasada scalania: gdy dwaj eksperci proponują to samo, przyjmuję jedną wersję bazową, a drugą oznaczam „PRZYJĄĆ ZE ZMIANĄ (scalić z …)”; wdrażający nanosi jeden tekst, nie dwa.

## Werdykty propozycji ekspertów

### Ekspert 1, praca (Claude)

E1-01 | PRZYJĄĆ ZE ZMIANĄ (nowy tekst końcówki A29: „urlop opiekuńczy 5 dni w roku kalendarzowym na osobistą opiekę lub wsparcie członka rodziny (syn, córka, matka, ojciec, małżonek) albo domownika z poważnych względów medycznych, na wniosek złożony najpóźniej 1 dzień przed (KP art. 173¹ § 1-4); przepisy nie przyznają za ten czas wynagrodzenia, więc urlop jest bezpłatny, ale wlicza się do stażu (KP art. 173²). Do pracownika na tym urlopie stosuje się odpowiednio ochronę jak przy ciąży: zakaz wypowiedzenia i rozwiązania umowy poza upadłością, likwidacją i rozwiązaniem z winy pracownika za zgodą związku (KP art. 173³ z KP art. 177 § 1, § 1¹, § 4, § 4¹); czy ochrona działa już od złożenia wniosku, wynika z odpowiedniego stosowania i przy planowanym zwolnieniu jest pytaniem do prawnika. Naruszenie przepisów o urlopie opiekuńczym to wykroczenie (KP art. 281 § 1 pkt 5b).” Powód: KP art. 173³ odsyła „odpowiednio”, a nie wprost do biegu ochrony od wniosku.)
E1-02 | PRZYJĄĆ (art. 41 ustawy Dz.U. 2026 poz. 203 odczytany przez eksperta z api.sejm.gov.pl; PRACACUDZ art. 3 ust. 1 pkt 12 i art. 5a zgodne z plikiem aktu; ustawa już jest w tabeli „Akty brakujące”, dopisać odczytane artykuły 40, 41, 54 i datę odczytu)
E1-03 | PRZYJĄĆ (KP art. 283 § 1: „kierując pracownikami lub innymi osobami fizycznymi”)
E1-04 | PRZYJĄĆ ZE ZMIANĄ (nowy tekst pierwszego punktu 4.9: „**Informacja o warunkach zatrudnienia:** zakres i terminy 7 oraz 30 dni z KP art. 29 § 3, odesłania z § 3¹ i dowód przekazania z § 3⁴ według `moduly/zatrudnienie-na-co-dzien.md`, A3 i tabela pism”. Powód: pełna treść już stoi w A3 i w tabeli modułu; w pisma.md wystarczy odesłanie, bez trzeciej kopii tej samej reguły.)
E1-05 | PRZYJĄĆ (KP art. 97 § 2¹ zd. 3 zgodne; scalić z C1-19)
E1-06 | PRZYJĄĆ (KP art. 281 § 2 dotyczy tylko dłużnika alimentacyjnego z KRZ; poprawka w wąskim skillu `kontrola-z-urzedu` i przegenerowanie kopii)
E1-L01 | PRZYJĄĆ ZE ZMIANĄ (wersja bazowa dla C1-09, C1-10, C1-11; zmiany: w A29a dopisać „chyba że przepisy u pracodawcy przewidują więcej” (KP art. 92 § 1 pkt 1); A29b i A29c tylko z wierszem w „Akty brakujące” (ustawa zasiłkowa, t.j. Dz.U. 2026 poz. 854, art. 17, 61, 68-68g, odczyt 6.11.2026); A29d bez zmian; pytanie 13 do sekcji 5 przyjąć. Dodatkowo sygnał z S1-07.)
E1-L02 | PRZYJĄĆ ZE ZMIANĄ (wersja bazowa jednego bloku „Wypadek przy pracy i służba BHP” razem z C1-06, C1-07 i E6-L04: do A14a dopisać „Zespół powypadkowy sporządza protokół najpóźniej w 14 dni od zawiadomienia o wypadku, a pracodawca zatwierdza go najpóźniej w 5 dni od sporządzenia (rozporządzenie RM z 1.07.2009 r., Dz.U. 2009 poz. 870, § 9 ust. 1, § 13 ust. 1, odczyt api.sejm.gov.pl 6.11.2026; aktualność rozporządzenia do potwierdzenia w ISAP). Niezawiadomienie w terminie albo niesporządzenie dokumentacji powypadkowej to przestępstwo (KK art. 221), a narażenie pracownika na bezpośrednie niebezpieczeństwo przez osobę odpowiedzialną za BHP podlega karze także przy nieumyślności (KK art. 220 § 1 i § 2).”; zastrzeżenie [WYMAGA WERYFIKACJI] przy rozporządzeniu zastąpić tym odczytem.)
E1-L03 | PRZYJĄĆ ZE ZMIANĄ (A22a i A22c bez zmian; A22b zastąpić: „Praca w niedziele i święta jest dozwolona tylko w przypadkach z KP art. 151¹⁰ (m.in. praca zmianowa, ruch ciągły, ochrona mienia, gastronomia, hotele, usługi dla ludności, transport); w handlu dochodzą ograniczenia z ustawy o ograniczeniu handlu w niedziele i święta (KP art. 151⁹ᵇ) [ustawa niewbudowana]. Za pracę w niedzielę pracodawca daje inny dzień wolny w 6 dni przed albo po niej, a gdy to niemożliwe, do końca okresu rozliczeniowego; za pracę w święto dzień wolny do końca okresu rozliczeniowego; dopiero gdy dnia wolnego nie da się udzielić w tych terminach, należy się dodatek 100 % za każdą godzinę (KP art. 151¹¹ § 1-3). Co najmniej jedna niedziela wolna na 4 tygodnie, poza systemem weekendowym (KP art. 151¹²).” Powód: wersja eksperta pomija pośredni termin „do końca okresu” przy niedzieli z KP art. 151¹¹ § 2; scalić z C1-12 i C1-13.)
E1-L04 | PRZYJĄĆ ZE ZMIANĄ (wersja bazowa z C1-14 i C1-15; zmiany: w A29e dopisać „Gdy wniosek o urlop złożono wcześniej niż wymaga ustawa, zakaz zaczyna się 14 dni przed częścią urlopu macierzyńskiego, 21 dni przed urlopem rodzicielskim albo uzupełniającym i 7 dni przed ojcowskim (KP art. 177 § 1¹)”; w A29f: „do 41 tygodni przy jednym dziecku i 43 przy porodzie mnogim (KP art. 182¹ᵃ § 1), najwyżej w 5 częściach do końca roku, w którym dziecko kończy 6 lat (KP art. 182¹ᶜ)”; na końcu A29g: „Po urlopach rodzicielskich i wychowawczym pracodawca dopuszcza pracownika do dotychczasowego stanowiska, a gdy to niemożliwe, do równorzędnego, na warunkach nie mniej korzystnych (KP art. 186⁴); uzupełniający urlop macierzyński przy hospitalizacji noworodka: KP art. 180².”)
E1-L05 | PRZYJĄĆ ZE ZMIANĄ (wersja bazowa dla C1-16; na początku A50a dopisać: „Nie każda skarga pracownicza jest zgłoszeniem w rozumieniu ustawy o sygnalistach: sprawdź dziedzinę naruszenia, ewentualne rozszerzenie procedury wewnętrznej i warunki ochrony (SYGN art. 3, SYGN art. 4, SYGN art. 6).” Zdanie o progu 50 osób zostaje, szczegóły procedury tylko odesłaniem do `katalog/sygnalisci-procedura/`.)
E1-L06 | PRZYJĄĆ (SYGN art. 13 ust. 1-2 pkt 1 zgodne)
E1-L07 | PRZYJĄĆ ZE ZMIANĄ (A62a zastąpić: „Inspektor pracy w postępowaniu mandatowym nakłada grzywnę co do zasady do 5 000 zł, a w przypadkach z KPSW art. 96 (m.in. ponowne wykroczenie przeciwko prawom pracownika, wykroczenia z PRACACUDZ art. 84) do 10 000 zł [KPSW niewbudowany: brzmienie po ustawie Dz.U. 2026 poz. 473 art. 6 i t.j. Dz.U. 2026 poz. 1336, odczyt api.sejm.gov.pl 6.11.2026; dokładne przesłanki do potwierdzenia, bo eksperci wskazują różne paragrafy]. Sąd wymierza grzywnę od 2 000 do 60 000 zł (KP art. 281-283), od 3 000 do 90 000 zł tylko przy pracowniku będącym dłużnikiem alimentacyjnym z KRZ (KP art. 281 § 2, KP art. 282 § 3). Niewykonanie nakazu w terminie i utrudnianie kontroli to osobne wykroczenia (KP art. 283 § 2 pkt 7-8).” A62b bez zmian; scalić z C1-21.)
E1-L08 | PRZYJĄĆ (KP art. 92¹ i art. 93 zgodne)
E1-L09 | PRZYJĄĆ (PRACACUDZ art. 59 ust. 1-4 i art. 84 ust. 8-9 zgodne)
E1-L10 | PRZYJĄĆ ZE ZMIANĄ (bez pierwszego zdania o terminach, które dubluje A59; zostaje treść świadectwa (KP art. 97 § 2), informacja z KP art. 94⁶, KP art. 97 § 3 i zdanie o poziomie B; dopisać z C1-19: „Na wniosek o sprostowanie pracodawca w 7 dni wydaje nowe świadectwo albo zawiadamia o odmowie (rozporządzenie w sprawie świadectwa pracy, t.j. Dz.U. 2024 poz. 1016, § 7 ust. 1, odczyt 6.11.2026); bez zawiadomienia pracownik może iść od razu do sądu (KP art. 97 § 2¹).”)

### Ekspert 1, praca (Codex)

C1-01 | PRZYJĄĆ (KP art. 25 § 2³ dotyczy wyłącznie okresów z § 2²; obecne A5 sugeruje wydłużenie także 3-miesięcznej próby)
C1-02 | PRZYJĄĆ (PIP art. 13 pkt 5 określa podmioty, nie okres badania; MINWYN art. 8c: 3 lata)
C1-03 | PRZYJĄĆ (PIP art. 34 ust. 2g wymienia wygaśnięcie bez warunku inicjatywy; poprawka w wąskich skillach dzielo-zlecenie-czy-etat i zwolnienie-pracownika-krok-po-kroku)
C1-04 | PRZYJĄĆ ZE ZMIANĄ (tekst eksperta, ale ostatnie zdanie: „Sprawdzenia wymagają zaświadczenie ZUS albo inne dokumenty (KP art. 302¹ § 11), nakładanie się okresów (KP art. 302¹ § 10) i przepisy przejściowe dla rozstań w okresie dostosowania; to ostatnie: DO WERYFIKACJI z prawnikiem.” Powód: podstawa w KP art. 302¹ § 8 jest wprost, niepewne zostają tylko przepisy przejściowe.)
C1-05 | PRZYJĄĆ (PRACACUDZ art. 85 pkt 2: „o ile obowiązek taki wynika z obowiązujących przepisów”)
C1-06 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L02)
C1-07 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L02, z wierszem w „Akty brakujące”)
C1-08 | PRZYJĄĆ (KP art. 226, art. 237⁶ § 1, art. 237⁹ § 1 zgodne; wstawić po A13)
C1-09 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L01, A29a i A29d)
C1-10 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L01, A29b)
C1-11 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L01, A29c)
C1-12 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L03, A22a i A22c)
C1-13 | PRZYJĄĆ ZE ZMIANĄ (struktura terminów z tej propozycji weszła do nowego A22b przy E1-L03)
C1-14 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L04; „Za życiem” wystarczy odesłanie do KP art. 182¹ᵃ § 2)
C1-15 | PRZYJĄĆ ZE ZMIANĄ (do A29g tylko zdanie o KP art. 186⁴ i odesłanie do KP art. 180²; wymiar uzupełniającego urlopu macierzyńskiego zbyt szczegółowy na moduł)
C1-16 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L05 i E1-L06)
C1-17 | ODRZUCIĆ (dubluje `katalog/sygnalisci-procedura/`: terminy 7 dni i 3 miesięcy oraz poufność z SYGN art. 25 i 27 są tam opisane; w module zatrudnienia wystarczy próg z SYGN art. 23 i odesłanie z E1-L05)
C1-18 | PRZYJĄĆ (KP art. 92¹ niezależny od progu 20 osób; dopisać w wąskim skillu zwolnienie-pracownika-krok-po-kroku)
C1-19 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-05 i E1-L10; rozporządzenie do tabeli „Akty brakujące”)
C1-20 | PRZYJĄĆ (CUDZ art. 121 ust. 1: cudzoziemiec, „15 dni roboczych”; rozdzielenie obowiązku firmy i cudzoziemca jest praktycznie ważne)
C1-21 | PRZYJĄĆ ZE ZMIANĄ (scalić z E1-L07)

### Ekspert 2, spółki (Claude)

E2-01 | PRZYJĄĆ (AML art. 59 nie obejmuje składu zarządu; AML art. 60 ust. 1-1a nie ma ograniczenia do spółek wpisanych po 10.11.2022; poprawić też odpowiedź na typowe pytanie 5)
E2-02 | PRZYJĄĆ (KRS art. 25a ust. 1: postępowanie wyłącznie z urzędu)
E2-03 | PRZYJĄĆ (KC art. 442¹ § 1: bieg od dowiedzenia się o szkodzie i osobie, nie od wezwania)
E2-04 | PRZYJĄĆ (KSH art. 17 § 1-2, art. 173 § 1, art. 210 § 2 zgodne; typowa pułapka jednoosobowej spółki)
E2-05 | PRZYJĄĆ (KSH art. 584¹³; scalić z C2-18)
E2-06 | PRZYJĄĆ (PU art. 11 ust. 2 i ust. 7; scalić z C2-14)
E2-07 | PRZYJĄĆ (KSH art. 300¹³² § 1-2 jak art. 299)
E2-08 | PRZYJĄĆ (KSH art. 202 § 6: „z dniem następującym po dniu, na który zwołano zgromadzenie”; poprawka w wąskim skillu pelnomocnictwo-w-firmie)
E2-L01 | PRZYJĄĆ ZE ZMIANĄ (77a zastąpić odesłaniem: „Odpowiedzialność za zaległe składki ZUS: `moduly/niewyplacalnosc.md`, reguły 21 i C2-19, C2-20.”, bo niewypłacalność reg. 21 już to mówi; 77b przyjąć i dopisać z C2-16: „Przesłanek uwolnienia się od odpowiedzialności członka zarządu (OP art. 116) nie przenosi się na wspólnika spółki osobowej (OP art. 115 § 1).”)
E2-L02 | PRZYJĄĆ (SUS art. 8 ust. 6 pkt 4 zgodne; bez wyliczania składek)
E2-L03 | PRZYJĄĆ ZE ZMIANĄ (bez ostatniego zdania o KSH art. 244, bo dubluje regułę 25; scalić z C2-10, z dopiskiem: „Absolutorium nie zastępuje przesłanek uwolnienia od odpowiedzialności wobec wierzycieli (KSH art. 299 § 2).”)
E2-L04 | PRZYJĄĆ ZE ZMIANĄ (scalić z C2-11: na końcu 80a dopisać „W sprawie o wyłączenie wspólnika sąd może z ważnych powodów zabezpieczyć powództwo przez zawieszenie jego praw udziałowych (KSH art. 268).”)
E2-L05 | PRZYJĄĆ (KSH art. 31-32, 102, 104 § 4, 111, 112, 584 zgodne; scalić z C2-15)
E2-L06 | PRZYJĄĆ ZE ZMIANĄ (scalić z C2-09 i C2-08: po zdaniu o zgłoszeniu do KRS dopisać „Likwidatorzy sporządzają bilans otwarcia likwidacji i przedstawiają go wspólnikom do zatwierdzenia (KSH art. 281 § 1).”, a na końcu „W planie zakończenia wskaż przechowawcę ksiąg i dokumentów rozwiązanej spółki (KSH art. 288 § 3).”)
E2-L07 | PRZYJĄĆ ZE ZMIANĄ (scalić z C2-13: dopisać „a gdy w PSA działa rada dyrektorów, odpowiadają dyrektorzy (KSH art. 4 § 2¹)”)
E2-L08 | PRZYJĄĆ (KSH art. 18 § 2-3 i PU art. 373 ust. 1 zgodne)
E2-L09 | PRZYJĄĆ (KSH art. 26 § 4-5, art. 58 pkt 4, art. 64 § 1 zgodne)

### Ekspert 2, spółki (Codex)

C2-01 | PRZYJĄĆ ZE ZMIANĄ (nowy tekst komórki: „14 dni, bez sobót i dni ustawowo wolnych od pracy: przy zmianie, której skuteczność wymaga wpisu do KRS, od wpisu; przy zmianie skutecznej bez wpisu, np. sprzedaży udziałów, od dnia zmiany (AML art. 60 ust. 1a pkt 1 i ust. 2). Sama zmiana zarządu nie zmienia danych w CRBR, chyba że członek zarządu był zgłoszony jako beneficjent zastępczy (AML art. 59).” Waga WAŻNE, nie BLOKER; przykład „powołanie członka zarządu” usunąć, bo przeczy E2-01.)
C2-02 | PRZYJĄĆ (KP art. 63² § 1 „z zastrzeżeniem § 3-11” i § 5; reguła 23 przeczy regule 24)
C2-03 | PRZYJĄĆ (KSH art. 255 § 4 i art. 270 pkt 2¹ dopuszczają wzorce S24)
C2-04 | PRZYJĄĆ (RACH art. 49 ust. 4-5 i KSH art. 231 § 2 pkt 2 zgodne)
C2-05 | PRZYJĄĆ (teza nieotwarta w pełni; zmiana statusu na „do potwierdzenia” zgodna z SKILL.md)
C2-06 | PRZYJĄĆ (KSH art. 67 § 1; poprawka w wąskim skillu zamkniecie-firmy-krok-po-kroku)
C2-07 | PRZYJĄĆ (KSH art. 295 § 1: „od dnia ujawnienia czynu wyrządzającego szkodę”)
C2-08 | PRZYJĄĆ (KSH art. 285 i art. 286 § 1 zgodne; scalić z E2-L06)
C2-09 | PRZYJĄĆ ZE ZMIANĄ (scalić z E2-L06)
C2-10 | PRZYJĄĆ ZE ZMIANĄ (scalić z E2-L03)
C2-11 | PRZYJĄĆ ZE ZMIANĄ (scalić z E2-L04)
C2-12 | PRZYJĄĆ ZE ZMIANĄ (zamiast całego akapitu jedno zdanie po regule 37: „W PSA reprezentację przy umowach z członkami zarządu regulują odrębne przepisy (KSH art. 300⁶⁷), a czynność między jedynym akcjonariuszem będącym członkiem zarządu a spółką wymaga aktu notarialnego (KSH art. 300⁶⁷ § 3); przy radzie dyrektorów: prawnik.” Powód: szczegóły rady dyrektorów są zbyt szczegółowe dla typowej firmy.)
C2-13 | PRZYJĄĆ ZE ZMIANĄ (scalić z E2-L07)
C2-14 | PRZYJĄĆ ZE ZMIANĄ (scalić z E2-06)
C2-15 | PRZYJĄĆ ZE ZMIANĄ (scalić z E2-L05)
C2-16 | PRZYJĄĆ ZE ZMIANĄ (scalić z E2-L01)
C2-17 | PRZYJĄĆ (KSH art. 124 § 1-2 zgodne)
C2-18 | PRZYJĄĆ ZE ZMIANĄ (w module sukcesji scalić z E2-05; zdanie o aporcie i sprzedaży przedsiębiorstwa przyjąć do wąskiego skilla zamkniecie-firmy-krok-po-kroku)
C2-19 | PRZYJĄĆ (SUS art. 24 ust. 5d; SUS art. 31 odsyła tylko do OP art. 118 § 1)
C2-20 | PRZYJĄĆ (SUS art. 83 ust. 2, KPC art. 477⁹ § 1; spójne z E5-05)
C2-21 | PRZYJĄĆ (PR art. 160 ust. 1: „wyłącznie rozłożenie na raty lub odroczenie”)
C2-22 | PRZYJĄĆ (PU art. 127 ust. 1 i 3 zgodne)

### Ekspert 3, umowy i spory (Claude)

E3-01 | PRZYJĄĆ ZE ZMIANĄ (tekst eksperta; zakres poprawki rozszerzyć o `skille/windykacja-miekka/SKILL.md:50` (C3-01) i dopisać w `polskie-realia.md`: „Przy dziele termin liczy się od oddania dzieła, nie od terminu płatności (KC art. 646).” Waga BLOKER potwierdzona: KC art. 554, 646, 751 pkt 1.)
E3-02 | PRZYJĄĆ
E3-03 | PRZYJĄĆ (KPC art. 505³⁴ § 1 wyłącza regułę PESEL, gdy działa KPC art. 139 § 2-3)
E3-04 | PRZYJĄĆ (KC art. 81 § 2 pkt 3; „śmierć podpisującego” usunąć)
E3-05 | PRZYJĄĆ (KC art. 663)
E3-06 | PRZYJĄĆ (KPC art. 458² § 1 pkt 1)
E3-07 | PRZYJĄĆ
E3-08 | PRZYJĄĆ (ZATORY art. 8 ust. 2)
E3-09 | PRZYJĄĆ
E3-L01 | PRZYJĄĆ (KC art. 509-516 i ZATORY art. 10 ust. 4 zgodne; wersja bazowa dla C3-12)
E3-L02 | PRZYJĄĆ ZE ZMIANĄ (scalić z C3-18: na początku bloku „Gdy produkt wyrządził szkodę osobie albo innemu mieniu, oddziel to od reklamacji samego towaru, zabezpiecz produkt i dokumentację (KC art. 449¹ § 1).”; zdanie o dyrektywie przenieść do tabeli „Zmiany w toku” modułu z [WYMAGA WERYFIKACJI], bo termin jej wdrożenia może przypadać na najbliższe tygodnie)
E3-L03 | PRZYJĄĆ ZE ZMIANĄ (dopisać z C3-14: „Siła wyższa nie zwalnia z odsetek za opóźnienie w zapłacie (KC art. 481 § 1).”)
E3-L04 | PRZYJĄĆ (KC art. 365¹, 746, 750, 764¹, 764³ zgodne; scalić z C3-10)
E3-L05 | PRZYJĄĆ (KC art. 492, 492¹)
E3-L06 | PRZYJĄĆ ZE ZMIANĄ (dopisać z C3-15: „Zapis nie wyłącza zabezpieczenia roszczenia przez sąd państwowy, także przy arbitrażu za granicą (KPC art. 1166 § 1-2).”)
E3-L07 | PRZYJĄĆ ZE ZMIANĄ (zostawić tylko: e-Sąd odpada przy doręczeniu za granicę (KPC art. 505²⁸ § 2), umowa jurysdykcyjna na piśmie (KPC art. 1104 § 1) i wdanie się w spór bez zarzutu (KPC art. 1104 § 2); rozporządzenia UE i Konwencję wiedeńską zastąpić zbieraniem danych z C3-17 i kartą dla prawnika. Powód: cztery akty niewbudowane z [WYMAGA WERYFIKACJI] w jednej regule to za dużo na moduł; praktyczny skutek daje zebranie danych.)
E3-L08 | PRZYJĄĆ ZE ZMIANĄ (poręczenie bez zmian (KC art. 876 § 2, 881, 883 § 1); zdanie o gwarancji zastąpić tekstem C3-11 z Prawem bankowym art. 81 ust. 1 i art. 87, odczytanym z api.sejm.gov.pl, z wierszem w „Akty brakujące”)
E3-L09 | PRZYJĄĆ ZE ZMIANĄ (na początku 34a: „Po zakończeniu najmu najemca musi zwrócić lokal (KC art. 675 § 1); wynajmujący, który jest właścicielem, może też żądać wydania (KC art. 222 § 1)…”, dalej bez zmian. Powód: wynajmujący nie zawsze jest właścicielem, a podstawa umowna działa zawsze.)
E3-L10 | PRZYJĄĆ ZE ZMIANĄ (scalić z C3-17 i S1-01: punkt 1 karty uzupełnić o kraj siedziby, cesję i dane do sprawdzenia konfliktu interesów)

### Ekspert 3, umowy i spory (Codex)

C3-01 | PRZYJĄĆ ZE ZMIANĄ (scalić z E3-01; z tej propozycji wchodzi trzecie miejsce poprawki, SKILL.md:50)
C3-02 | PRZYJĄĆ (KC art. 61 § 2; dowód doręczenia maila zależy od całości materiału)
C3-03 | PRZYJĄĆ (KC art. 664 § 2: „w chwili wydania najemcy rzecz miała wady”)
C3-04 | PRZYJĄĆ (KC art. 451 § 1: „może”, i tylko należności związane z tym długiem)
C3-05 | PRZYJĄĆ (ZATORY art. 5: „z wyłączeniem podmiotu publicznego będącego podmiotem leczniczym”)
C3-06 | PRZYJĄĆ (KC art. 491 § 2, art. 649⁴ § 1: skutek na dzień odstąpienia)
C3-07 | PRZYJĄĆ (KPC art. 125 § 2¹, art. 165 § 2 i § 4)
C3-08 | PRZYJĄĆ (KC art. 563 § 1-2)
C3-09 | PRZYJĄĆ (KC art. 505 pkt 1-4)
C3-10 | PRZYJĄĆ ZE ZMIANĄ (scalić z E3-L04)
C3-11 | PRZYJĄĆ ZE ZMIANĄ (scalić z E3-L08)
C3-12 | PRZYJĄĆ ZE ZMIANĄ (scalić z E3-L01)
C3-13 | PRZYJĄĆ (KC art. 66 § 1, 384 § 1, 385⁴ § 1; częsty spór o warunki zamówienia)
C3-14 | PRZYJĄĆ ZE ZMIANĄ (scalić z E3-L03)
C3-15 | PRZYJĄĆ ZE ZMIANĄ (scalić z E3-L06)
C3-16 | PRZYJĄĆ (KPC art. 458⁹ § 2 i § 4)
C3-17 | PRZYJĄĆ ZE ZMIANĄ (wersja bazowa dla zagranicy; Prawo prywatne międzynarodowe do tabeli „Akty brakujące” z adresem i datą odczytu; dopisek do karty scalić z E3-L10)
C3-18 | PRZYJĄĆ ZE ZMIANĄ (scalić z E3-L02)
C3-19 | PRZYJĄĆ (KPC art. 1002; data pewna nie chroni tak samo przy licytacji)
C3-20 | PRZYJĄĆ (KC art. 649¹ § 1¹, art. 649⁴ § 1: termin co najmniej 45 dni)
C3-21 | PRZYJĄĆ (KC art. 647¹ § 1, § 1¹, § 1², § 2)

### Ekspert 4, konsument i dane (Claude)

E4-01 | PRZYJĄĆ
E4-02 | PRZYJĄĆ ZE ZMIANĄ (w SKILL.md:32 dopisać: „wyciek albo inny incydent z danymi osobowymi (zgłoszenie do UODO w miarę możliwości w 72 godziny od stwierdzenia, gdy jest ryzyko dla osób; projekt zgłoszenia przygotowujesz od razu, a karta dla prawnika idzie równolegle i nie wstrzymuje zgłoszenia)”. Powód: sygnał „prawnik” nie może opóźnić zgłoszenia z krótkim terminem.)
E4-03 | PRZYJĄĆ (ZNK art. 23 ust. 2 i art. 27 ust. 1)
E4-04 | PRZYJĄĆ (UOKIK art. 28 ust. 4)
E4-05 | PRZYJĄĆ (SDE art. 12-15 uchylone od 6.11.2026 według notki ISAP w SDE.md)
E4-06 | PRZYJĄĆ (PWP art. 152¹⁷ ust. 1 zd. 2)
E4-07 | PRZYJĄĆ
E4-08 | PRZYJĄĆ (UPK art. 30 ust. 3-4)
E4-09 | PRZYJĄĆ ZE ZMIANĄ (wersja bazowa „Reguł ramowych obszaru 3”; dopisać z C4-10: „Każde naruszenie, jego skutki i działania zaradcze dokumentujesz także wtedy, gdy nie zgłaszasz go do UODO (RODO art. 33 ust. 5)”; z C4-11: odmowę spełnienia żądania też uzasadnia się w terminie miesiąca, z informacją o skardze i drodze sądowej (RODO art. 12 ust. 4); z C4-12: „systematyczne monitorowanie na dużą skalę miejsc dostępnych publicznie wymaga oceny skutków przed uruchomieniem (RODO art. 35 ust. 3 lit. c)”; z C4-13: dane z CEIDG albo kupionej bazy: informacja najpóźniej w miesiąc, a przy pierwszym kontakcie wcześniej (RODO art. 14 ust. 3). Źródło RODO z odczytem 6.11.2026 jak u ekspertów.)
E4-10 | PRZYJĄĆ (scalić z C4-12 w części mapy)
E4-11 | PRZYJĄĆ ZE ZMIANĄ (dopisać z C4-16: „Treść, która sprawia wrażenie neutralnej informacji, a jest reklamą, to także czyn nieuczciwej konkurencji wobec innych firm (ZNK art. 16 ust. 1 pkt 4).”; rekomendacje UOKiK z dopiskiem „do potwierdzenia”, jak u eksperta)
E4-12 | PRZYJĄĆ ZE ZMIANĄ (scalić z C4-14: pierwsze zdanie oprzeć na Rzym I art. 6 odczytanym przez Codex na arch-bip.ms.gov.pl, z adresem i datą; dodać „skalę sprzedaży traktuj jako fakt organizacyjny, nie warunek ochrony”; geoblokowanie i jurysdykcja zostają z [WYMAGA WERYFIKACJI])
E4-13 | PRZYJĄĆ (KC art. 23, 24, 43, ZNK art. 14, SDE art. 22zh zgodne; realna i częsta sprawa)
E4-14 | PRZYJĄĆ (KC art. 66¹, 71, 84, 88, 543 zgodne)
E4-15 | PRZYJĄĆ (UPK art. 38 ust. 1 pkt 6, 8, 14 i ust. 2 zgodne)

### Ekspert 4, konsument i dane (Codex)

C4-01 | PRZYJĄĆ (poprawka w wąskim skillu rodo-w-malej-firmie)
C4-02 | PRZYJĄĆ (KC art. 579 § 3: zawieszenie „z dniem zawiadomienia sprzedawcy o wadzie”; waga BLOKER potwierdzona, bo klient traci uprawnienia)
C4-03 | PRZYJĄĆ (wykreślenie JDG nie zwalnia osoby fizycznej z długu)
C4-04 | PRZYJĄĆ (UPK art. 43b ust. 4: wyraźne i odrębne zaakceptowanie; waga BLOKER potwierdzona)
C4-05 | PRZYJĄĆ (UPK art. 27 ust. 2: 30 dni)
C4-06 | PRZYJĄĆ (UPK art. 38 ust. 1 pkt 1; waga BLOKER potwierdzona)
C4-07 | PRZYJĄĆ (UPK art. 43l ust. 1: domniemanie roku dla treści cyfrowych)
C4-08 | PRZYJĄĆ (PRAUT art. 55 ust. 1 i 3)
C4-09 | PRZYJĄĆ (PWP art. 147 ust. 1-2)
C4-10 | PRZYJĄĆ ZE ZMIANĄ (w module scalić z E4-09; w wąskim skillu rodo-w-malej-firmie przyjąć tekst eksperta)
C4-11 | PRZYJĄĆ ZE ZMIANĄ (jak C4-10: scalić z E4-09, w wąskim skillu tekst eksperta)
C4-12 | PRZYJĄĆ ZE ZMIANĄ (wiersz mapy scalić z E4-10; zdanie o ocenie skutków do E4-09 i do wąskiego skilla)
C4-13 | PRZYJĄĆ (wąski skill zgody-na-stronie-www; RODO art. 14 ust. 3, PKE art. 398 ust. 1)
C4-14 | PRZYJĄĆ ZE ZMIANĄ (scalić z E4-12)
C4-15 | PRZYJĄĆ (SDE art. 15a ust. 1, art. 15b; spór sprzedawcy z platformą to częsta sprawa)
C4-16 | PRZYJĄĆ ZE ZMIANĄ (scalić z E4-11)
C4-17 | PRZYJĄĆ (wyniesiona baza klientów to zawsze także możliwy incydent RODO)

### Ekspert 5, administracja i zamówienia (Claude)

E5-01 | PRZYJĄĆ (KSC art. 73 ust. 3, 3a, 4: formuła „kwota wyższa” tylko przy podmiocie kluczowym)
E5-02 | PRZYJĄĆ (sprzeczność wewnętrzna z regułą 45; zakaz przesądzania z SKILL.md)
E5-03 | PRZYJĄĆ (KSC art. 5 ust. 6 i ust. 7 są odrębne)
E5-04 | PRZYJĄĆ (PZP art. 109 ust. 1 pkt 7)
E5-05 | PRZYJĄĆ (SUS art. 83 ust. 2, KPC art. 477⁹ § 1, PIP art. 34 ust. 5a, OP art. 222; to realne ryzyko utraty terminu)
E5-06 | PRZYJĄĆ (PPSA art. 54 § 1a w [ ] obowiązuje do 1.10.2029; art. 53 § 4)
E5-07 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-09 w jeden tekst: wersja E5-07 plus z E6-09 „na piśmie, ustnie do protokołu albo przez e-Urząd Skarbowy (KKS art. 16 § 4a)” i „nie działa wobec tego, kto kierował czynem albo polecił go podwładnemu (KKS art. 16 § 6)”)
E5-08 | PRZYJĄĆ ZE ZMIANĄ (kolumna „Akty” jak u eksperta; w kolumnie modułu dodatkowo rozdzielenie mandatu z C6-01 i E6-08)
E5-09 | PRZYJĄĆ (KC art. 484 § 2; scalić z C5-20)
E5-10 | PRZYJĄĆ ZE ZMIANĄ (scalić z C5-11: „gdy złożono tylko jedną ofertę w przetargu nieograniczonym albo w trybie podstawowym, umowę można zawrzeć wcześniej (PZP art. 264 ust. 2 pkt 1 lit. a, PZP art. 308 ust. 3 pkt 1 lit. a); po wniesieniu odwołania obowiązuje zakaz zawarcia umowy (PZP art. 577)”)
E5-11 | PRZYJĄĆ (bloki o najmie w modułach przetargów i NIS2 mogą trafić do karty jako fałszywe pytania)
E5-L01 | PRZYJĄĆ ZE ZMIANĄ (scalić z C5-12: dopisać „wniosek wymaga własnego stanowiska wnioskodawcy (OP art. 14b § 3); stanowisko przy sporze o wykładnię przygotowuje doradca podatkowy”)
E5-L02 | PRZYJĄĆ ZE ZMIANĄ (scalić z C5-13 i C5-14; dopisać z C5-13: „czynny żal przygotowujesz tylko jako poziom B, bez dopisywania przyznania i osób współdziałających z domysłu”, oraz z C6-11: „korekta albo czynny żal jednej osoby nie chronią automatycznie innych osób związanych z rozliczeniem (KKS art. 9 § 2 i § 3)”)
E5-L03 | PRZYJĄĆ ZE ZMIANĄ (scalić z C5-15: dopisać „przy przedsiębiorcy ustal z doradcą, czy ulga nie jest pomocą publiczną, jest pomocą de minimis czy inną pomocą (OP art. 67b § 1)”; SUS art. 29 ust. 1 zgodny)
E5-L04 | PRZYJĄĆ ZE ZMIANĄ (scalić z C5-18: pierwsze zdanie z C5-18 „sam wpis do CEIDG albo KRS nie zastępuje koncesji, zezwolenia ani wpisu do rejestru działalności regulowanej (PRPRZ art. 43 ust. 1)”, dalej reguły eksperta)
E5-L05 | PRZYJĄĆ ZE ZMIANĄ (scalić z C5-19: dopisać „umowa wymaga formy pisemnej pod rygorem nieważności (PZP art. 432); przed podpisaniem sprawdź zgodność dokumentu z ofertą i warunkami zamówienia”)
E5-L06 | PRZYJĄĆ ZE ZMIANĄ (scalić z C5-21: dopisać „umowa podwykonawcza nie może ustalać kar ani warunków zapłaty mniej korzystnie niż umowa wykonawcy z zamawiającym (PZP art. 463)”; PZP art. 465 zgodny)
E5-L07 | PRZYJĄĆ ZE ZMIANĄ (47a i pismo 9 przyjąć; w 47b skreślić zdanie „spór o kary warto więc prowadzić przed wykonaniem umowy”, bo to rada taktyczna oparta na przepisie oznaczonym [WYMAGA WERYFIKACJI])
E5-L08 | PRZYJĄĆ (KSC art. 5 ust. 3 wyłącza art. 3 ust. 4 załącznika I)
E5-L09 | PRZYJĄĆ ZE ZMIANĄ (zamiast „może wyznaczyć na dokumenty tylko 5 dni”: „termin na podmiotowe środki dowodowe może wynosić tylko 5 dni (PZP art. 274 ust. 1: niekrótszy niż 5 dni)”; reszta bez zmian, OP art. 306a § 3 i § 5 zgodne)

### Ekspert 5, administracja i zamówienia (Codex)

C5-01 | PRZYJĄĆ (KPA art. 63 § 1: podania na zwykły e-mail „pozostawia się bez rozpoznania”; OP art. 169 § 1b: bez zawiadamiania; waga BLOKER potwierdzona, bo pisma.md 2 pkt 5 kieruje formę pism do urzędu właśnie do tej kopii)
C5-02 | PRZYJĄĆ (KPA art. 63 § 2, OP art. 169 § 1a)
C5-03 | PRZYJĄĆ (KPA art. 65 § 2, OP art. 170 § 2)
C5-04 | PRZYJĄĆ (OP art. 141 § 1 ma własną drogę ponaglenia)
C5-05 | PRZYJĄĆ
C5-06 | PRZYJĄĆ (PPSA art. 49)
C5-07 | PRZYJĄĆ (DOREL art. 41 ust. 2, art. 42 ust. 2)
C5-08 | PRZYJĄĆ (KPA art. 189k § 3)
C5-09 | PRZYJĄĆ (PZP art. 139 ust. 1-2: procedura odwrócona)
C5-10 | PRZYJĄĆ (PZP art. 453 ust. 1-2)
C5-11 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-10)
C5-12 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-L01)
C5-13 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-L02)
C5-14 | PRZYJĄĆ (OP art. 81 § 2b; wąski skill kontrola-z-urzedu)
C5-15 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-L03)
C5-16 | PRZYJĄĆ (PPSA art. 46-47, 57, 57a; skarga do WSA ma inne wymogi niż podanie)
C5-17 | PRZYJĄĆ ZE ZMIANĄ (UPEA niewbudowana: wiersz w „Akty brakujące” z Dz.U. 2026 poz. 1311 i datą odczytu; pismo poziomu B przy kwocie zagrażającej płynności)
C5-18 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-L04)
C5-19 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-L05)
C5-20 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-09; zdanie o odszkodowaniu ponad karę (KC art. 484 § 1) dopisać do reguły 43)
C5-21 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-L06)
C5-22 | PRZYJĄĆ (KSC art. 15 ust. 1c: natychmiastowa wykonalność nakazu audytu)
C5-23 | PRZYJĄĆ (AML art. 41 ust. 1; wąski skill procedura-aml)
C5-24 | PRZYJĄĆ (AML art. 74 i 86; dwa różne tryby i terminy)
C5-25 | PRZYJĄĆ (ustawa o VAT art. 112aa odczytana z api.sejm.gov.pl; wąski skill ksef-procedury)

### Ekspert 6, karne (Claude)

E6-01 | PRZYJĄĆ (KK art. 115 § 12 i art. 191 § 2: zapowiedź zawiadomienia prokuratury jako nacisk na zapłatę zwykłej faktury jest groźbą bezprawną; obecne „jeśli użytkownik tego nie postanowił” to furtka, którą trzeba zamknąć)
E6-02 | PRZYJĄĆ ZE ZMIANĄ (pełny tekst przenieść do nowego modułu `sprawy-karne-firmy.md`, sekcja „Firma pokrzywdzona”, i dopisać z C6-08: „Po ponownej odmowie albo umorzeniu najpierw zażalenie do prokuratora nadrzędnego (KPK art. 330 § 2 i § 2a)”; w pkt 82 modułu sporów zostawić dwa zdania: zażalenie w 7 dni od doręczenia (KPK art. 460, art. 306 § 1-1a) i pełnomocnik tylko adwokat albo radca (KPK art. 88 § 1) z odesłaniem do nowego modułu)
E6-03 | PRZYJĄĆ (KK art. 46 § 1 i § 3, KPK art. 49a, art. 291 § 1 pkt 4, KK art. 234 i 238)
E6-04 | PRZYJĄĆ
E6-05 | PRZYJĄĆ ZE ZMIANĄ (scalić z C6-04: „nową jednostkę gospodarczą” zamiast „nową spółkę albo inną jednostkę”, zgodnie z KK art. 301 § 1)
E6-06 | PRZYJĄĆ
E6-07 | PRZYJĄĆ ZE ZMIANĄ (scalić z C6-06: dopisać „Przed przekazaniem sprawy wczytaj `moduly/sprawy-karne-firmy.md`, aby rozpoznać pilną czynność, rolę użytkownika i potrzebę zabezpieczenia dowodów.”)
E6-08 | PRZYJĄĆ ZE ZMIANĄ (scalić z C6-01; zdanie o mandacie zaocznym w KKS sformułować warunkowo: „dla mandatów nakładanych od 26.12.2026 r. (KKS art. 138 § 1 pkt 3 w < >, Dz.U. 2026 poz. 846)”; do tej daty nie stosować)
E6-09 | PRZYJĄĆ ZE ZMIANĄ (scalić z E5-07)
E6-L01 | PRZYJĄĆ ZE ZMIANĄ (nowy moduł na bazie tej propozycji, uzupełniony o C6-06 do C6-13; zmiany: (1) z pkt 19 usunąć zdanie „Firma może dać pracownikowi kopię dokumentów, które zna z pracy, i informację o jego prawach” i wstawić „Firma może przekazać pracownikowi informację o jego prawach z punktów 17-18; dokumentów do przygotowania zeznań mu nie kompletuje, a pytania o dokumenty kieruje do prawnika.” (ryzyko zarzutu wpływania na świadka, KK art. 245, i ujawnienia tajemnicy); (2) w sekcji 1 dodać ustalenie roli i daty czynu z C6-06 (KK art. 4 § 1, KKS art. 2 § 2); (3) w pkt 8 dodać z C6-07 ostrzeżenie z KPK art. 415 § 1; (4) w pkt 15 dodać pokwitowanie (KPK art. 228 § 3) i dane z poczty (KPK art. 236a) z C6-09; (5) w pkt 26 mandat zaoczny tylko od 26.12.2026; (6) w pkt 22 dodać KKS art. 24 § 5 i w pkt 31 PODZB art. 4a z C6-12; (7) w pkt 29 dodać KK art. 218 § 3 z C6-13; (8) do „Akty brakujące”: rozporządzenie o usprawiedliwianiu nieobecności; (9) dopisać moduł do SKILL.md według S1-04.)
E6-L02 | PRZYJĄĆ ZE ZMIANĄ (scalić z C6-06 i C6-12: dodać wiersz „Odpowiedzialność podmiotu zbiorowego albo odpowiedzialność posiłkowa za grzywnę skarbową | `moduly/sprawy-karne-firmy.md`, od razu prawnik | PODZB, KKS”)
E6-L03 | PRZYJĄĆ (KKS art. 77 § 4-5, KK art. 307 § 1, PODZB art. 7 zgodne)
E6-L04 | PRZYJĄĆ ZE ZMIANĄ (regułę scalić z E1-L02 w jeden A14a; sygnał do sekcji 4 przyjąć bez zmian)
E6-L05 | PRZYJĄĆ
E6-L06 | PRZYJĄĆ
E6-L07 | PRZYJĄĆ (podszycie pod dostawcę i zmiana rachunku to dziś jedna z najczęstszych strat małej firmy)

### Ekspert 6, karne (Codex)

C6-01 | PRZYJĄĆ ZE ZMIANĄ (podział wiersza mapy przyjąć, scalić z E6-08; teza, że kopia `decyzja-z-urzedu-co-dalej/zasady.md:103` przedwcześnie opisuje mandat zaoczny, jest błędna: sekcja 10 tej kopii dotyczy mandatów z prawa wykroczeń, nie KKS, więc tej części nie nanosić)
C6-02 | PRZYJĄĆ (KK art. 286 § 1: „wyzyskania błędu lub niezdolności”)
C6-03 | PRZYJĄĆ (KK art. 300 § 1: „rzeczywiście lub pozornie obciąża”)
C6-04 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-05)
C6-05 | PRZYJĄĆ (KK art. 240, KPK art. 304 § 2; poprawka w wąskim skillu sygnalisci-procedura)
C6-06 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-L01, E6-L02 i E6-07)
C6-07 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-L01, pkt 1, 7 i 8)
C6-08 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-02)
C6-09 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-L01, pkt 11-15)
C6-10 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-L01, pkt 17-19)
C6-11 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-L01, pkt 24-26, i z E5-L02)
C6-12 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-L01, pkt 22 i 30-34, oraz z E6-L02)
C6-13 | PRZYJĄĆ ZE ZMIANĄ (scalić z E6-L01, pkt 28-29)
C6-14 | PRZYJĄĆ (SYGN art. 16 ust. 1 i 3; wąski skill sygnalisci-procedura)
C6-15 | PRZYJĄĆ ZE ZMIANĄ (bez powołania KK art. 1 § 3, które nie wnosi nic do ścieżki incydentu; zostają KK art. 270 § 1, art. 286 § 1, KPK art. 304 § 1 i część o poufności zgłoszeń (SYGN art. 27, art. 56))

## Własne uwagi

S1-01 | references/karta-dla-prawnika.md:10 (pkt 1 „Kto”) | WAŻNE | Karta nie podaje danych, bez których prawnik nie przyjmie sprawy: pełnej nazwy (firmy) i NIP albo KRS drugiej strony, jej pełnomocnika i innych uczestników. Pierwszą czynnością każdej kancelarii jest sprawdzenie konfliktu interesów, a karta ma pozwolić zrobić to od razu. Reguła z SKILL.md o niepowtarzaniu PESEL, rachunków i adresów zamieszkania nie obejmuje danych rejestrowych firm. | poprawka: w pkt 1 po „druga strona (rodzaj podmiotu, czy ma pełnomocnika)” dopisać: „, z pełną nazwą (firmą) i NIP albo numerem KRS, nazwą kancelarii jej pełnomocnika, jeśli jest, oraz pozostałymi uczestnikami sprawy (poręczyciel, podwykonawca, były pracownik z imienia i nazwiska); prawnik potrzebuje tych danych do sprawdzenia konfliktu interesów przed przyjęciem sprawy.”

S1-02 | references/pisma.md:22 (akapit „Gdy użytkownik nalega…”) oraz SKILL.md:30 (krok 5, „termin krótszy niż 3 dni robocze przy piśmie poziomu B”) | WAŻNE | Skill kieruje pismo procesowe do przeglądu, ale nie mówi, co robić, gdy termin upływa, a prawnika nie ma. Firma, która czeka na przegląd, traci sprzeciw albo odpowiedź na pozew; pisma niewniesionego w terminie nie da się naprawić, a braki formalne pisma strony działającej samodzielnie sąd co do zasady każe uzupełnić. | KPC art. 130 § 1: „przewodniczący wzywa stronę, pod rygorem zwrócenia pisma, do poprawienia, uzupełnienia lub opłacenia go w terminie tygodniowym”; KPC art. 458⁵ § 1 i § 4: twierdzenia i dowody spóźnione „podlegają pominięciu” | poprawka: na końcu akapitu dopisać: „Gdy do końca terminu na pismo do sądu zostały mniej niż 3 dni robocze, a firma nie ma jeszcze prawnika, powiedz wprost, że pismo wniesione w terminie jest bezpieczniejsze niż żadne: braki formalne pisma strony bez pełnomocnika sąd co do zasady wzywa do uzupełnienia w tygodniu (KPC art. 130 § 1), a w sprawie gospodarczej projekt musi zawierać wszystkie twierdzenia i dowody, bo spóźnione sąd pomija (KPC art. 458⁵ § 1 i § 4). Decyzję o wniesieniu bez przeglądu podejmuje firma.” Czy wersja do wniesienia ma mieć nagłówek „PROJEKT…”, rozstrzyga właściciel skilla (obecna zasada „nie zdejmuj nagłówka” w tej sytuacji zmusza firmę do ręcznej edycji pisma sądowego).

S1-03 | wszystkie przyjęte uzupełnienia z aktami niewbudowanymi | WAŻNE (warunek wdrożenia) | Przyjęte propozycje powołują numery przepisów aktów niewbudowanych: ustawa zasiłkowa (Dz.U. 2026 poz. 854), ustawa Dz.U. 2026 poz. 203, KPSW art. 96, rozporządzenia o wypadkach przy pracy (Dz.U. 2009 poz. 870) i o świadectwie pracy (Dz.U. 2024 poz. 1016), RODO, Rzym I, Prawo bankowe, Prawo prywatne międzynarodowe, UPEA (Dz.U. 2026 poz. 1311), ustawa o VAT, DSA. SKILL.md („Nigdy z pamięci”) pozwala podać taki numer tylko wtedy, gdy stoi w pliku modułu z datą sprawdzenia. | poprawka: każde takie uzupełnienie nanosi się razem z wierszem w tabeli „Akty brakujące” właściwego modułu (akt, ELI albo adres, data odczytu, punkty modułu). Gdzie ekspert sam napisał, że tekstu nie otworzył (DSA art. 4-6, 16-17, rozporządzenia 1215/2012 i 2018/302, rozporządzenie o ogłoszeniach PZP, ustawa o KAS), zostaje [WYMAGA WERYFIKACJI]. Bez tego reguły będą w modułach, ale model nie będzie mógł z nich legalnie skorzystać.

S1-04 | SKILL.md:3 (description) i :26 (krok 2); BRIEF i lista 13 modułów | WAŻNE (warunek wdrożenia) | Przyjęty nowy moduł `moduly/sprawy-karne-firmy.md` (E6-L01) nie zadziała bez wpięcia: description wymienia obszary i nie zna spraw karnych firmy, a kwalifikacja idzie przez mapę. | poprawka: w description po „marka, najem lokalu, przetargi” dopisać „, sprawy karne firmy (firma pokrzywdzona, przeszukanie, świadek, mandat karny skarbowy)”; w mapie sekcja 9a (E6-L02) i nowe brzmienie sekcji 10 (E6-07); przed wydaniem test co najmniej trzech scenariuszy: przeszukanie w biurze, odmowa wszczęcia po zawiadomieniu, propozycja mandatu karnego skarbowego.

S1-05 | references/karta-dla-prawnika.md:19 (pkt 10 „Pytanie do rozstrzygnięcia”) | KOSMETYKA | Prawnik oprócz pytania potrzebuje zakresu zlecenia i terminu odpowiedzi: od tego zależy wycena i to, czy w ogóle zdąży. Dziś karta tego nie zbiera. | poprawka: na końcu pkt 10 dopisać: „Zakres, o który firma prosi: opinia, przegląd projektu pisma albo prowadzenie sprawy; do kiedy potrzebna jest odpowiedź (z najbliższego terminu z pkt 4).”

S1-06 | kopie `references/katalog/` i wąskie skille źródłowe | BLOKER (kolejność wydania) | Część przyjętych poprawek, w tym wszystkie potwierdzone BLOKERY poza E6-01, dotyczy wąskich skilli, których kopie ten skill ładuje: windykacja-miekka (E3-01, C3-01, C3-02), reklamacja-i-rekojmia (C4-02, C4-04, C4-06), pismo-urzedowe (C5-01 do C5-06), a także decyzja-z-urzedu-co-dalej, kontrola-z-urzedu, rodo-w-malej-firmie, zwolnienie-pracownika-krok-po-kroku, dzielo-zlecenie-czy-etat, spolka-zoo-przygotowanie, pelnomocnictwo-w-firmie, zamkniecie-firmy-krok-po-kroku, czerwone-flagi-w-umowie, nakaz-zaplaty-co-dalej, sygnalisci-procedura, polityka-ai, e-doreczenia-w-firmie, procedura-aml, ksef-procedury, prawa-autorskie-w-zleceniu, zgody-na-stronie-www. Wydanie 1.1.0 bez przegenerowania kopii zostawi w skillu błędy, które firma odczuje najmocniej (przedawnienie faktury, e-mail do urzędu, gwarancja a rękojmia). | poprawka: kolejność: (1) poprawki w wąskich skillach i ich nowe wersje w katalogu, (2) przegenerowanie kopii `narzedzia/katalog-do-firmy.mjs`, (3) porównanie kopii ze źródłem, (4) dopiero wtedy wydanie 1.1.0.

S1-07 | references/moduly/zatrudnienie-na-co-dzien.md, sekcja 4 („Sygnały tylko prawnik”) | WAŻNE | Po dopisaniu kontroli zwolnień lekarskich (E1-L01) najczęstsze następne pytanie brzmi „czy mogę go zwolnić dyscyplinarnie, bo pracował na L4”. To decyzja o wysokim ryzyku: termin miesiąca od uzyskania wiadomości, ocena „ciężkiego naruszenia”, a zwykłe wypowiedzenie w czasie zwolnienia jest zakazane. | KP art. 52 § 2: „nie może nastąpić po upływie 1 miesiąca od uzyskania przez pracodawcę wiadomości o okoliczności uzasadniającej rozwiązanie umowy”; KP art. 41: „nie może wypowiedzieć umowy o pracę (…) w czasie innej usprawiedliwionej nieobecności” | poprawka: dopisać sygnał: „- Zamiar rozwiązania umowy z powodu zachowania na zwolnieniu lekarskim albo wyniku kontroli L4: termin miesiąca od uzyskania wiadomości (KP art. 52 § 2), a wypowiedzenie w czasie zwolnienia jest niedopuszczalne (KP art. 41); karta dla prawnika przed jakimkolwiek pismem.”

## Werdykt końcowy

„GOTOWE DO WYDANIA 1.1.0 PO NANIESIENIU PRZYJĘTYCH: TAK”, przy czym do „przyjętych” należą moje uwagi S1-03, S1-04 i S1-06 jako warunki wdrożenia: najpierw poprawione wąskie skille i przegenerowane kopie (bez tego zostają BLOKERY E3-01, C4-02, C4-04, C4-06, C5-01), numery przepisów aktów niewbudowanych tylko z wierszem w „Akty brakujące”, a nowy moduł spraw karnych wpięty w description i mapę oraz sprawdzony na trzech scenariuszach. Bilans werdyktów (224 propozycje): 122 przyjęte, 101 przyjętych ze zmianą (w tym scalenia dubli), 1 odrzucona (C1-17), 7 własnych uwag.
