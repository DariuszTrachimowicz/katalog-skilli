# Moduł: Cyberbezpieczeństwo NIS2 (ustawa o krajowym systemie cyberbezpieczeństwa)

Wczytaj, gdy `mapa-spraw.md` wskazuje ten moduł. Reguły po skutku z podstawą w formie „KP art. 30 § 4”: każdą podstawę przed podaniem użytkownikowi sprawdź w `references/akty/<SKRÓT>.md` i podaj datę brzmienia z nagłówka aktu. Orzeczenia ze statusem „nieotwarte” podajesz tylko jako „do potwierdzenia”. Stan researchu: 6 listopada 2026; źródła: domeny gov.pl i sn.pl.

### C1. Typowe sprawy i pytania firmy

1. „Czy NIS2 nas dotyczy? Jesteśmy producentem maszyn, 120 osób.”
2. „Jesteśmy małą firmą IT obsługującą szpital. Czy musimy się rejestrować?”
3. „Termin na wpis minął 3 października. Co teraz?”
4. „Co to podmiot kluczowy, a co ważny, i co z tego wynika?”
5. „Prezes pyta, czy osobiście odpowiada i ile wynosi kara.”
6. „Jakie dokumenty i procedury musimy mieć do kwietnia 2027 r.?”
7. „Mieliśmy ransomware w nocy. Komu, w jakim czasie i co zgłaszamy?”
8. „Czy zgłoszenie do CSIRT zastępuje zgłoszenie naruszenia danych do UODO?”
9. „Czy musimy robić audyt i kto może go przeprowadzić?”
10. „Klient objęty NIS2 przysłał nam ankietę bezpieczeństwa i aneks do umowy. Czy musimy?”
11. „Czy możemy oddać całe cyberbezpieczeństwo firmie zewnętrznej?”
12. „Liczymy się z grupą kapitałową: czy wielkość liczymy razem ze spółką matką?”
13. „Używamy sprzętu dostawcy, o którym mówi się jako wysokiego ryzyka. Co grozi?”
14. „Byliśmy operatorem usługi kluczowej. Co się zmieniło?”

### C2. Reguły po skutku z podstawą

**Kto jest objęty**
1. Podmiotem kluczowym jest firma z sektora z załącznika nr 1, która przekracza progi średniego przedsiębiorcy (czyli duża). (KSC art. 5 ust. 1 pkt 1)
2. Podmiotem ważnym jest średnia firma z sektora z załącznika nr 1 oraz średnia lub większa firma z sektora z załącznika nr 2. (KSC art. 5 ust. 2 pkt 1-2) Mikro i małe firmy z tych sektorów co do zasady nie są objęte, z wyjątkami niżej.
3. Niezależnie od wielkości objęci są m.in.: dostawcy usług DNS, kwalifikowani dostawcy usług zaufania, podmioty krytyczne, rejestry domen TLD i rejestratorzy domen (kluczowe); niekwalifikowani dostawcy usług zaufania będący mikro-, małymi lub średnimi przedsiębiorcami (ważni; duży niekwalifikowany dostawca z sektora z załącznika nr 1 jest kluczowy na zasadzie ogólnej); wszyscy przedsiębiorcy komunikacji elektronicznej (średni i więksi kluczowi, mikro i mali ważni). (KSC art. 5 ust. 1 pkt 1, 2 i 4, ust. 2 pkt 3-4)
4. Dostawca usług zarządzanych w zakresie cyberbezpieczeństwa (MSSP: SOC, obsługa incydentów, testy, audyty, doradztwo) jest podmiotem kluczowym już od wielkości małego przedsiębiorcy. (KSC art. 2 pkt 4j, art. 5 ust. 1 pkt 3)
5. Gdy firma spełnia kryteria obu kategorii, jest kluczowa. (KSC art. 5 ust. 4)
6. Organ może decyzją uznać za kluczowy lub ważny także mniejszy podmiot z załączników, jeżeli jest jedynym dostawcą krytycznej usługi albo jego awaria groziłaby bezpieczeństwu państwa, zdrowiu publicznemu lub innym sektorom; wtedy ma 12 miesięcy na obowiązki i 24 na pierwszy audyt od doręczenia decyzji. (KSC art. 7l ust. 1-7)
7. Wielkość liczy się według załącznika I do rozporządzenia Komisji 651/2014 (z przedsiębiorstwami powiązanymi i partnerskimi), według stanu na dzień sprawozdania finansowego; średni przedsiębiorca to mniej niż 250 osób i obrót do 50 mln euro albo suma bilansowa do 43 mln euro (gov.pl, materiał MC z 2026-04-27). (KSC art. 5 ust. 3 i 5) [Progi małego przedsiębiorcy (poniżej 50 osób, obrót lub suma bilansowa do 10 mln euro) z rozporządzenia 651/2014: spoza plików lokalnych, WYMAGA WERYFIKACJI.] Przy ustalaniu wielkości na potrzeby KSC nie stosuje się art. 3 ust. 4 załącznika I do rozporządzenia 651/2014 (reguła o przedsiębiorstwach kontrolowanych przez podmioty publiczne), więc sam udział publiczny nie przesądza wielkości firmy (KSC art. 5 ust. 3) [treść załącznika poza wbudowanymi aktami: WYMAGA WERYFIKACJI]. Spółkę wykonującą zadania użyteczności publicznej (np. gminną) sprawdź też jako podmiot ważny niezależnie od wielkości, gdy realizuje zadanie publiczne z wykorzystaniem systemów informacyjnych. (KSC art. 5 ust. 2 pkt 8)
8. Firma, która przekracza próg średniego przedsiębiorstwa tylko dzięki doliczeniu przedsiębiorstw powiązanych lub partnerskich, nie jest podmiotem kluczowym, jeżeli jej system informacyjny jest od nich niezależny **lub** nie świadczy z nimi usług wspólnie; wystarczy jedna z tych okoliczności. (KSC art. 5 ust. 6) Tak samo firma, która spełnia kryteria średniego przedsiębiorstwa tylko dzięki takiemu doliczeniu, nie jest podmiotem ważnym. (KSC art. 5 ust. 7) Wyłączenie statusu kluczowego nie wyłącza z ustawy: osobno sprawdź kategorię ważną, sektor i pozostałe podstawy objęcia (KSC art. 5 ust. 1-2); graniczne grupy kapitałowe: prawnik (C4).
9. Ustawa obejmuje podmioty z miejscem zamieszkania lub działalnością w Polsce (siedziba, oddział, działalność transgraniczna); dostawcy cyfrowi według głównego miejsca działalności w UE. (KSC art. 5a ust. 1 i 3)
10. Sektory kluczowe (załącznik nr 1, wg Dz. U. 2026 poz. 252 i KSC art. 41): energia (m.in. energia elektryczna, ciepło, ropa i paliwa, gaz, wodór, ładowanie pojazdów), transport (lotniczy, kolejowy, wodny, drogowy), bankowość i infrastruktura rynków finansowych, ochrona zdrowia (w tym produkcja leków; z producentów wyrobów medycznych tylko ci, których wyroby uznano za mające krytyczne znaczenie podczas stanu zagrożenia zdrowia publicznego), woda pitna, ścieki, infrastruktura cyfrowa (m.in. chmura, centra danych, CDN, DNS, punkty wymiany ruchu, usługi zaufania), zarządzanie usługami ICT (B2B), przestrzeń kosmiczna, podmioty publiczne, komunikacja elektroniczna. Sektory ważne (załącznik nr 2): usługi pocztowe i kurierskie, gospodarowanie odpadami, chemikalia, żywność (produkcja, przetwarzanie, dystrybucja), produkcja (pozostałe wyroby medyczne i wyroby do diagnostyki in vitro, komputery i elektronika, urządzenia elektryczne, maszyny, pojazdy, inny sprzęt transportowy), dostawcy usług cyfrowych (platformy handlowe, wyszukiwarki, platformy społecznościowe), badania naukowe. Pełne rodzaje podmiotów: tabele załączników nr 1 i 2 na końcu `akty/KSC.md`; status kluczowy albo ważny ustalaj z rodzaju podmiotu w tabeli, nie z samej nazwy sektora (KSC art. 5 ust. 1-2).
11. Kody PKD są pomocnicze; decyduje faktycznie prowadzona działalność (gov.pl, materiał MC o samoidentyfikacji z 2026-04-27).

**Wpis do wykazu**
12. Podmiot kluczowy lub ważny składa wniosek o wpis w 6 miesięcy od dnia spełnienia przesłanek; zmiany danych zgłasza w 14 dni. (KSC art. 7c ust. 1 i 3)
13. Firmy, które spełniały przesłanki w dniu wejścia nowelizacji (2026-04-03), składały wnioski według harmonogramu z komunikatu Ministra Cyfryzacji z 8 kwietnia 2026 r.: od 7 maja do 3 października 2026 r., w aplikacji Wykaz KSC (wykaz-ksc.gov.pl). (ustawa zmieniająca z 2026 r. (Dz.U. 2026 poz. 252), art. 33 ust. 3, art. 34 ust. 3; gov.pl/web/cyfryzacja z 2026-09-28)
14. Dotychczasowych operatorów usług kluczowych, przedsiębiorców telekomunikacyjnych, dostawców usług zaufania, podmioty publiczne i krytyczne minister wpisuje z urzędu; one nie składają wniosku, tylko uzupełniają dane w 6 miesięcy od wezwania. (KSC art. 7a ust. 2, art. 7b ust. 2; ustawa zmieniająca z 2026 r. (Dz.U. 2026 poz. 252), art. 34 ust. 2)
15. Wniosek zawiera m.in. dane rejestrowe, sektor i rodzaj działalności, adresy IP i domeny używane w sposób ciągły, osoby kontaktowe, deklarację wielkości, państwa UE działalności, informację o umowie z MSSP; podpisuje go kierownik (lub upoważniony) podpisem kwalifikowanym, zaufanym, osobistym albo pieczęcią, z oświadczeniem pod rygorem odpowiedzialności karnej. (KSC art. 7 ust. 2 pkt 1-18, art. 7c ust. 2, 5-7)
16. Wpis następuje z chwilą złożenia kompletnego wniosku i jest deklaratoryjny: obowiązki wynikają z ustawy, nie z wpisu. (KSC art. 7d ust. 1 i 5)
17. Spóźniona firma powinna złożyć wniosek niezwłocznie; organ może wpisać ją z urzędu i wezwać do uzupełnienia danych pod rygorem kary, a za brak wniosku w terminie może nałożyć karę, jeśli przemawia za tym waga naruszenia. (KSC art. 7j ust. 1 i 3, art. 73 ust. 1a pkt 1) [Kary dopiero od 2028-04-03, reguła 45.]
18. Firma, która przestała spełniać kryteria, składa wniosek o wykreślenie z uzasadnieniem; organ rozpatruje go w miesiąc. (KSC art. 7f ust. 3-4)

**Terminy wdrożenia**
19. Firmy objęte w dniu 2026-04-03 wdrażają obowiązki z rozdziału 3 (zarządzanie ryzykiem, dokumentacja, incydenty, osoby kontaktowe) do **2026-04-03 + 12 miesięcy = 2027-04-03**, a podmioty kluczowe przeprowadzają pierwszy audyt do **2028-04-03**. (ustawa zmieniająca z 2026 r. (Dz.U. 2026 poz. 252), art. 33 ust. 1-2; KSC art. 16) Firmy, które staną się objęte później, mają 12 i 24 miesiące od spełnienia przesłanek. (KSC art. 16) Wyjątek: dawny operator usługi kluczowej, który przeprowadził już audyt z art. 15 ust. 1, nie korzysta z terminu pierwszego audytu w 24 miesiące; kolejny audyt liczy się w cyklu co najmniej raz na 3 lata od poprzedniego (art. 25 ustawy zmieniającej z 2026 r. (Dz.U. 2026 poz. 252), odczyt z api.sejm.gov.pl 6.11.2026; KSC art. 15 ust. 1).
20. Dawni operatorzy usług kluczowych są podmiotami kluczowymi od 2026-04-03 i zgłaszają incydenty według nowych zasad w 6 miesięcy od tej daty (do 2026-10-03); do wdrożenia nowego systemu zarządzania stosują dotychczasowy. (ustawa zmieniająca z 2026 r. (Dz.U. 2026 poz. 252), art. 22 ust. 1, art. 33 ust. 4 i 6)

**Obowiązki zarządzania ryzykiem**
21. Firma wdraża system zarządzania bezpieczeństwem informacji: systematyczne szacowanie ryzyka i proporcjonalne środki techniczne i organizacyjne, w tym polityki, bezpieczeństwo nabywania i utrzymania systemów, bezpieczeństwo fizyczne, kadrowe, łańcuch dostaw ICT, plany ciągłości działania i odtworzenia, monitorowanie w trybie ciągłym, ocena skuteczności, szkolenia, cyberhigiena, kryptografia, bezpieczna komunikacja z MFA, zarządzanie aktywami i kontrola dostępu; do tego zbieranie informacji o zagrożeniach, zarządzanie incydentami, aktualizacje i usuwanie podatności. (KSC art. 8 ust. 1 pkt 1-5)
22. Dostawcy cyfrowi (chmura, centra danych, CDN, usługi zarządzane, MSSP, platformy, wyszukiwarki, DNS, TLD) stosują szczegółowe środki z rozporządzenia wykonawczego Komisji (UE) 2024/2690. (KSC art. 8b ust. 1)
23. Firma prowadzi i aktualizuje dokumentację normatywną i operacyjną bezpieczeństwa, nadzoruje ją i przechowuje co najmniej 2 lata od wycofania z użytkowania albo zakończenia świadczenia usługi, licząc od 1 stycznia roku następującego po roku, w którym ten okres wygasa (nie dotyczy podmiotów objętych ustawą o narodowym zasobie archiwalnym i archiwach). Zniszczenie dokumentacji potwierdza protokół brakowania (data, oznaczenie dokumentacji, sposób zniszczenia, osoba zatwierdzająca), a protokoły przechowuje się trwale. (KSC art. 10 ust. 1-8)
24. Firma wyznacza co najmniej dwie osoby do kontaktów z krajowym systemem (mikro i mała: jedną), informuje użytkowników o zagrożeniach (może linkiem do CSIRT) i daje im kanał zgłaszania incydentów i podatności; po wpisie korzysta z systemu S46. (KSC art. 9 ust. 1-2 i 4)
25. Zadania można wykonywać przez wewnętrzną strukturę albo umowę z dostawcą usług zarządzanych w zakresie cyberbezpieczeństwa; odpowiedzialność zostaje przy kierowniku. (KSC art. 14, art. 8c ust. 3)
26. Osoby realizujące zadania bezpieczeństwa przedstawiają przed dopuszczeniem informację z KRK o niekaralności za przestępstwa przeciw ochronie informacji; informację zastępuje tylko ważne poświadczenie bezpieczeństwa upoważniające do dostępu do informacji niejawnych o klauzuli „poufne” lub wyższej (inne poświadczenie, np. „zastrzeżone”, nie wystarcza). (KSC art. 8f ust. 1 i 3)

**Odpowiedzialność kierownictwa**
27. Za wykonanie obowiązków odpowiada kierownik jednostki; przy zarządzie wieloosobowym bez wskazanej osoby odpowiadają wszyscy członkowie, także gdy zadania powierzono innej osobie. (KSC art. 2 pkt 8a, art. 8c ust. 1-3)
28. Kierownik decyduje o systemie bezpieczeństwa, planuje budżet, przydziela i nadzoruje zadania, dba o świadomość personelu i zgodność z prawem; raz w roku kalendarzowym przechodzi udokumentowane szkolenie. (KSC art. 8d, art. 8e ust. 1-3)

**Incydenty**
29. Incydent poważny to taki, który powoduje lub może spowodować poważne obniżenie jakości lub przerwanie usługi, straty finansowe albo poważną szkodę materialną lub niematerialną u innych. (KSC art. 2 pkt 7, art. 11 ust. 1 pkt 3)
30. Terminy: wczesne ostrzeżenie niezwłocznie, najpóźniej w 24 godziny od wykrycia; zgłoszenie incydentu poważnego najpóźniej w 72 godziny od wykrycia; sprawozdanie okresowe na wniosek CSIRT; sprawozdanie końcowe najpóźniej w miesiąc od zgłoszenia, a gdy obsługa trwa: sprawozdanie z postępu i końcowe w miesiąc od zakończenia obsługi. Dostawca usług zaufania zgłasza incydent poważny w 24 godziny. (KSC art. 11 ust. 1 pkt 4-4c, ust. 1a, art. 12b)
31. Zgłoszenia idą przez system teleinformatyczny S46 do właściwego CSIRT sektorowego; dopóki organ nie ogłosi gotowości CSIRT sektorowego (organ ma 18 miesięcy od 2026-04-03), zgłasza się do właściwego CSIRT MON, CSIRT NASK albo CSIRT GOV wskazanego w wykazie. (KSC art. 11 ust. 2, art. 7 ust. 2 pkt 21-22; ustawa zmieniająca z 2026 r. (Dz.U. 2026 poz. 252), art. 42 ust. 1-2, art. 44 ust. 1-2)
32. Treść wczesnego ostrzeżenia: dane podmiotu, osoby zgłaszającej i osoby do wyjaśnień, moment wystąpienia i wykrycia, czas trwania, czy działanie bezprawne lub w złej wierze, czy dotyczy innych państw UE. (KSC art. 12 ust. 1)
33. Treść zgłoszenia 72 h: wpływ na usługę (która usługa, liczba użytkowników, zasięg, wpływ na inne podmioty), przyczyny i przebieg, działania zapobiegawcze i naprawcze, aktualizacja danych; uzupełnia się w toku obsługi. (KSC art. 12 ust. 3 i 5)
34. Sprawozdanie końcowe: szczegółowy opis i szkody, rodzaj zagrożenia lub przyczyna, środki ograniczające ryzyko, skutki transgraniczne. (KSC art. 12a)
35. Przy poważnym cyberzagrożeniu firma informuje użytkowników, na których może ono wpłynąć, o środkach zapobiegawczych, a o samym zagrożeniu, jeśli nie zwiększy to ryzyka. (KSC art. 11 ust. 2a) O incydencie poważnym, który niekorzystnie wpływa na świadczenie usług, firma informuje użytkowników tych usług. (KSC art. 11 ust. 2b)
36. Inne incydenty, zagrożenia, podatności i zdarzenia potencjalne można zgłaszać dobrowolnie; tajemnice oznacza się. (KSC art. 13 ust. 1-3)
37. Zgłoszenie z KSC nie zastępuje zgłoszenia naruszenia ochrony danych osobowych do Prezesa UODO z RODO (osobny obowiązek). Najpierw ustal rolę firmy: administrator zgłasza bez zbędnej zwłoki, w miarę możliwości w 72 godziny od stwierdzenia naruszenia, chyba że naruszenie raczej nie powoduje ryzyka dla praw lub wolności osób (RODO art. 33 ust. 1); podmiot przetwarzający nie zgłasza do UODO, tylko bez zbędnej zwłoki zawiadamia administratora (RODO art. 33 ust. 2). [RODO niewbudowane; stan według uodo.gov.pl/pl/525/2584, odczyt 6.11.2026; `akty/UODO.md` to krajowa ustawa, nie RODO.]

**Audyty i nadzór**
38. Podmiot kluczowy przeprowadza na własny koszt audyt bezpieczeństwa co najmniej raz na 3 lata i przekazuje kopię raportu organowi w 3 dni robocze od otrzymania. (KSC art. 15 ust. 1-1a)
39. Podmiotowi ważnemu organ może nakazać audyt zewnętrzny decyzją po incydencie poważnym lub innym naruszeniu; kluczowemu w każdym czasie. (KSC art. 15 ust. 1b) Decyzja nakazująca audyt podlega natychmiastowemu wykonaniu: po jej otrzymaniu równolegle zabezpiecz wykonanie audytu w wyznaczonym terminie i przekaż decyzję prawnikowi do oceny zaskarżenia; samo odwołanie nie odsuwa obowiązku audytu. (KSC art. 15 ust. 1b-1c)
40. Audyt przeprowadza akredytowana jednostka oceniająca zgodność albo co najmniej dwóch audytorów z certyfikatami z rozporządzenia albo z co najmniej trzyletnią praktyką w audycie bezpieczeństwa systemów informacyjnych, albo z dwuletnią praktyką i dyplomem studiów podyplomowych z audytu bezpieczeństwa z uprawnionej uczelni (praktyka: udokumentowane 3 audyty w ostatnich 3 latach albo co najmniej pół etatu takich audytów w określonych formach), albo CSIRT sektorowy z takimi audytorami, a nie osoba, która w ciągu roku realizowała zadania bezpieczeństwa w tej firmie. (KSC art. 15 ust. 2-3)
41. Nadzór sprawują organy właściwe dla sektora (np. minister energii, minister cyfryzacji dla ICT i usług cyfrowych, minister rolnictwa dla żywności, minister klimatu dla odpadów, UKE dla poczty i telekomunikacji, KNF dla banków). (KSC art. 41, art. 53 ust. 1)

**Kary**
42. Karze podlegają naruszenia wymienione w KSC art. 73 ust. 1. Dla podmiotu kluczowego ustawa określa maksimum 10 000 000 euro albo 2 % przychodów z działalności gospodarczej z roku obrotowego poprzedzającego wymierzenie kary, przy czym stosuje się kwotę wyższą, oraz minimum 20 000 zł. (KSC art. 73 ust. 3) Dla podmiotu ważnego wskazuje 7 000 000 euro albo 1,4 % takich przychodów i minimum 15 000 zł, bez formuły o kwocie wyższej; tej relacji nie rozstrzygaj sam, to pytanie do prawnika. (KSC art. 73 ust. 4) Przy działalności krótszej niż 12 miesięcy albo bez przychodu ustawa przyjmuje szczególną podstawę wymiaru: równowartość 500 000 euro (kluczowy) albo 250 000 euro (ważny); to podstawa wymiaru, nie gotowa kwota kary. (KSC art. 73 ust. 3a i 4)
43. Przy naruszeniu powodującym poważne cyberzagrożenie dla państwa lub życia albo zagrożenie poważnej szkody: kara do 100 000 000 zł. (KSC art. 73 ust. 5)
44. Kierownik może zostać ukarany osobiście, niezależnie od kary dla firmy, do 300 % otrzymywanego wynagrodzenia obliczanego według zasad ustalania ekwiwalentu pieniężnego za urlop. (KSC art. 73a ust. 1-4)
45. Kary z art. 73 ust. 1-4, art. 73a-73c i art. 76b można nałożyć po raz pierwszy po 2 latach od wejścia nowelizacji, czyli od **2026-04-03 + 2 lata = 2028-04-03**. (ustawa zmieniająca z 2026 r. (Dz.U. 2026 poz. 252), art. 35) [NIEPEWNE: art. 35 nie wymienia art. 73 ust. 5 (do 100 mln zł); czy ta kara działa wcześniej, wymaga oceny prawnika.]
46. Przy ustalaniu kary organ bierze pod uwagę kryteria z art. 53 ust. 12, przychód i możliwości finansowe; KSC wyłącza KPA art. 189a § 2, czyli regułę pierwszeństwa przepisów odrębnych w sprawach kar, więc obok KSC stosuje się ogólne przepisy KPA o karach administracyjnych. (KSC art. 76a ust. 1) Organ może odstąpić od kary, gdy waga naruszenia i znaczenie naruszonych przepisów są znikome, a firma lub kierownik zaprzestali naruszenia albo naprawili szkodę. (KSC art. 76a ust. 9) Odstąpienie i pouczenie z KPA art. 189f § 1-3 to argument w piśmie do organu, nie pewność.

**Dostawcy dla podmiotów objętych**
47. Podmiot objęty musi uwzględnić bezpieczeństwo łańcucha dostaw: podatności i jakość produktów dostawców, skoordynowane oceny UE i decyzje o dostawcach wysokiego ryzyka; dlatego przenosi wymagania na dostawców umowami, ankietami i audytami. (KSC art. 8 ust. 1 pkt 2 lit. e, ust. 2) Sam dostawca nie staje się przez to podmiotem objętym; obowiązki ma tylko z umowy, chyba że sam spełnia kryteria (np. MSSP, chmura, usługi zarządzane ICT) [wniosek z art. 5].
48. Minister może decyzją uznać dostawcę sprzętu lub oprogramowania za dostawcę wysokiego ryzyka; wtedy podmioty objęte nie wprowadzają jego wskazanych produktów i wycofują je w 7 lat (telekomy w 4 lata dla funkcji krytycznych), a zamawiający publiczni nie mogą ich kupować. (KSC art. 67b, art. 67c ust. 1-2 i 4; PZP art. 226 ust. 1 pkt 19)
49. Postanowienia umów obowiązujących 2026-04-03, które uniemożliwiają badanie produktu ICT przez CSIRT MON, NASK lub GOV, są nieważne. (ustawa zmieniająca z 2026 r. (Dz.U. 2026 poz. 252), art. 40 ust. 1; KSC art. 33 ust. 1b-1d)
50. Podmioty objęte i ich dostawcy mogą wymieniać informacje o zagrożeniach i podatnościach w celach ochronnych, oznaczając krąg odbiorców. (KSC art. 8h ust. 1-4)
51. Banki i infrastruktura rynków finansowych stosują DORA; z KSC tylko wskazane przepisy (wykaz, część obowiązków kierownika). (KSC art. 8i ust. 1-2)

### C3. Co firma może zrobić sama i jakie pisma przygotuje skill

1. **Test samoidentyfikacji (lista)**: sektor i rodzaj działalności z załączników (faktyczna działalność, nie PKD); wielkość z powiązanymi i partnerskimi na dzień ostatniego sprawozdania; wyjątki niezależne od wielkości; niezależność systemów w grupie; wynik: kluczowy, ważny, nieobjęty; data spełnienia przesłanek i termin wniosku (6 miesięcy). Wsparcie: usługa „Pre-weryfikacja zgodności z zaleceniami NIS2” na biznes.gov.pl (wg MRiT, 2026-08-19).
2. **Dane do wniosku o wpis (lista)** z KSC art. 7 ust. 2 pkt 1-18: nazwa, sektor i rodzaj, adresy, ADE, e-mail, NIP, REGON, numer w rejestrze działalności regulowanej, zakresy IP i domeny, osoby kontaktowe (i PESEL administratora konta), telefon, deklaracja wielkości, państwa UE, główne miejsce działalności (dostawcy cyfrowi), umowa z MSSP, przedstawiciel, porozumienia z art. 8h ust. 6; oświadczenie kierownika z klauzulą z art. 7c ust. 5; podpis z art. 7c ust. 6.
3. **Zgłoszenie incydentu (lista danych)**:
   - wczesne ostrzeżenie do 24 h: dane firmy i numer w rejestrze, osoba zgłaszająca i osoba do wyjaśnień (telefony i e-maile służbowe), godzina wystąpienia i wykrycia, czas trwania, czy podejrzenie działania bezprawnego, czy dotyczy innych państw UE, ewentualna prośba o wsparcie CSIRT (KSC art. 12 ust. 1-2);
   - dostawca usług zaufania (kwalifikowany i niekwalifikowany): zgłoszenie incydentu poważnego do 24 h od wykrycia, bez okna 72 h (KSC art. 11 ust. 1a);
   - zgłoszenie do 72 h (pozostałe podmioty): usługa dotknięta, liczba użytkowników, zasięg geograficzny, wpływ na inne podmioty, przyczyny i przebieg, skutki dla systemów, działania zapobiegawcze i naprawcze, zmiany danych z ostrzeżenia (KSC art. 12 ust. 3);
   - sprawozdanie końcowe w miesiąc: szczegółowy opis i szkody, źródło, środki, skutki transgraniczne (KSC art. 12a);
   - dziennik incydentu z godzinami (do wyliczenia 24 h i 72 h od wykrycia), osobna ocena, czy doszło do naruszenia danych osobowych (UODO).
4. **Szkielet dokumentacji SZBI (lista)**: polityka bezpieczeństwa i polityki tematyczne, rejestr aktywów, szacowanie ryzyka i plan postępowania z ryzykiem, procedura zarządzania incydentami i klasyfikacji incydentu poważnego, plan ciągłości działania i odtworzenia z testami, polityka kontroli dostępu i MFA, polityka kryptografii, zarządzanie podatnościami i aktualizacjami, bezpieczeństwo dostawców (klauzule umowne, ankiety), szkolenia personelu i coroczne szkolenie kierownika, wyznaczenie osób kontaktowych, rejestr KRK osób, zasady przechowywania dokumentacji (2 lata od wycofania lub zakończenia usługi, liczone od 1 stycznia następnego roku) i wzór protokołu brakowania przechowywanego trwale. (KSC art. 8, 8e, 8f, 9, 10 ust. 7-8)
5. **Uchwała zarządu o podziale odpowiedzialności za cyberbezpieczeństwo** (wskazanie osoby odpowiedzialnej, budżet, harmonogram do 2027-04-03). (KSC art. 8c ust. 2, art. 8d)
6. **Klauzule i ankieta dla dostawców** (gdy firma jest objęta) albo **odpowiedź na ankietę klienta** (gdy firma jest dostawcą): zakres usług, zgłaszanie incydentów klientowi w określonych godzinach, dostęp do audytu, podwykonawcy, lokalizacja danych, zarządzanie podatnościami, ciągłość działania, zakaz klauzul blokujących badania CSIRT.
7. **Wniosek o wykreślenie z wykazu** z uzasadnieniem (zmiana działalności, spadek wielkości). (KSC art. 7f ust. 3)

### C4. Sygnały „tylko prawnik”

- Spór, czy firma jest objęta (graniczne sektory, grupa kapitałowa, działalność w kilku państwach UE).
- Decyzja organu o uznaniu za podmiot kluczowy lub ważny, nakaz audytu, kontrola, postępowanie o karę (droga administracyjna i sądowoadministracyjna).
- Incydent z wyciekiem danych osobowych, okupem, podejrzeniem przestępstwa, skutkami dla klientów lub w innych państwach UE.
- Decyzja o dostawcy wysokiego ryzyka dotycząca sprzętu firmy.
- Podmioty finansowe (DORA) i telekomunikacyjne (Prawo komunikacji elektronicznej, PKE).
- Odpowiedzialność osobista członków zarządu, ubezpieczenie D&O, wewnętrzny podział odpowiedzialności.
- Negocjacje umów z dużymi klientami objętymi NIS2 (kary, nieograniczona odpowiedzialność, audyty).

### C5. Fakty, które zmieniają ocenę

- Faktyczna działalność i sektor (nie samo PKD); czy usługi świadczone są B2B (zarządzanie usługami ICT).
- Liczba pracowników, obrót, suma bilansowa z ostatniego sprawozdania, z powiązanymi i partnerskimi.
- Niezależność systemów informacyjnych od grupy.
- Czy firma jest przedsiębiorcą telekomunikacyjnym, dostawcą usług zaufania, MSSP, dostawcą chmury lub centrum danych (objęcie niezależnie od wielkości lub od małej).
- Data spełnienia przesłanek (przed czy po 2026-04-03), czy złożono wniosek, czy był wpis z urzędu.
- Czy firma była operatorem usługi kluczowej.
- Godzina wykrycia incydentu, wpływ na usługę i użytkowników, czy dotyczy danych osobowych.
- Czy CSIRT sektorowy dla sektora ogłosił gotowość (do kogo zgłaszać).
- Czy firma jest tylko dostawcą podmiotu objętego (obowiązki umowne, nie ustawowe).

### C6. Orzecznictwo

| Sygnatura | Data | Organ | Teza własnymi słowami | URL | Status |
|---|---|---|---|---|---|
| II SA/Wa 846/23 | 2024-02-05 | WSA w Warszawie (wyrok nieprawomocny; skargę kasacyjną rozpoznał NSA wyrokiem z 2026-10-06, III OSK 1538/24, którego treści nie otwarto) | Prezes UODO, nakazując bankowi wydanie kopii danych (RODO art. 15 ust. 3), musi rozważyć obowiązki banku jako operatora usługi kluczowej (KSC art. 8 w brzmieniu sprzed 2026-04-03), tajemnicę bankową (Prawo bankowe art. 104) i wymóg silnego uwierzytelnienia; żądanie weryfikacji tożsamości w oddziale przy szerokim wniosku złożonym kanałem bez silnego uwierzytelnienia to podejście oparte na ryzyku, a nie utrudnianie praw (RODO art. 11 ust. 2, art. 12 ust. 6, art. 24 ust. 1). WSA uchylił pkt 1 decyzji z przyczyn proceduralnych (KPA art. 7, art. 77 § 1, art. 107 § 3). | https://orzeczenia.nsa.gov.pl/doc/8C17F5BC71 | otwarte (pełny tekst, CBOSA 6.11.2026) |

Orzecznictwa do znowelizowanej ustawy (od 2026-04-03) nie znalazłem w orzeczenia.nsa.gov.pl ani w sn.pl; kary z art. 73 ust. 1-4 i art. 73a-73c można nakładać dopiero od 2028-04-03 (art. 35 ustawy zmieniającej nie wymienia kary z KSC art. 73 ust. 5; czy może być nałożona przed 2028-04-03, to pytanie do prawnika, reguła 45), decyzje organów i wyroki WSA dopiero się pojawią. Minimum 5 pozycji dla tego modułu jest nieosiągalne bez źródeł spoza listy (TSUE, wytyczne ENISA, Komisji Europejskiej).

### C7. Zmiany w toku i świeże (2025-2026)

- Ustawa z 23 stycznia 2026 r. o zmianie KSC (Dz. U. 2026 poz. 252), wdrożenie dyrektywy NIS2, w życie od 2026-04-03. Kluczowe daty: wpis 2026-05-07 do 2026-10-03 (komunikat MC z 2026-04-08); wpis z urzędu do 2026-05-06; dostęp nowych podmiotów do S46 od 2026-06-12 (wg UKE, z wyników wyszukiwania, strony nie otwierałem); obowiązki do 2027-04-03; pierwszy audyt kluczowych do 2028-04-03 (poza dawnymi operatorami usług kluczowych, którzy audyt już wykonali, reguła 19); kary z art. 73 ust. 1-4, art. 73a-73c i art. 76b od 2028-04-03 (art. 35 ustawy zmieniającej nie wymienia kary z KSC art. 73 ust. 5; skutek do oceny prawnika, reguła 45); CSIRT sektorowe do 2027-10-03 (18 miesięcy).
- Ustawa z 25 czerwca 2025 r. o krajowym systemie certyfikacji cyberbezpieczeństwa (Dz. U. 2025 poz. 1017), w życie 2025-08-28, zmienia KSC.
- Ustawa z 25 czerwca 2025 r. o operacyjnej odporności cyfrowej sektora finansowego (DORA; Dz. U. 2025 poz. 1069), w życie 2025-08-07.
- Ustawa z 29 maja 2026 r. o zmianie ustawy o zarządzaniu kryzysowym (Dz. U. 2026 poz. 815), w życie 2026-07-04 (podmioty krytyczne, dyrektywa CER).
- Ustawa z 3 lipca 2026 r. o systemach sztucznej inteligencji (Dz. U. 2026 poz. 1003): od 2026-10-28 CSIRT współpracują z Komisją Rozwoju i Bezpieczeństwa SI (KSC art. 26 ust. 3 pkt 24).
- Ustawa z 31 lipca 2026 r. o zmianie Prawa bankowego (Dz. U. 2026 poz. 1206), zmiana KSC od 2027-01-11 (art. 35 w zw. z art. 57): w załączniku nr 1, sektor „Bankowość i infrastruktura rynków finansowych”, „oddział banku zagranicznego” zastąpiony „oddziałem z państwa trzeciego” w rozumieniu Prawa bankowego art. 4 ust. 1 pkt 20a; innych zmian KSC ustawa nie wprowadza (tekst z api.sejm.gov.pl, odczyt 2026-11-06).
- Rozporządzenie Rady Ministrów o szczegółowych wymaganiach SZBI dla rodzajów działalności (KSC art. 8a, przepis fakultatywny: „może określić”): do 2026-11-06 nie wydane (wyszukiwanie tytułów aktów DU z 2025 i 2026 r. w api.sejm.gov.pl). Wykaz certyfikatów audytorów (KSC art. 15 ust. 8, obowiązkowe „określi”): nowego rozporządzenia brak, ELI pokazuje jako obowiązujące rozporządzenie Ministra Cyfryzacji z 12.10.2018 w sprawie wykazu certyfikatów uprawniających do przeprowadzenia audytu (DU/2018/1999) [czy stosuje się do audytów według obecnego art. 15: WYMAGA WERYFIKACJI].

### C8. Rejestr źródeł (moduł C)

- Plik lokalny: KSC.md (odczyt 2026-11-06).
- https://api.sejm.gov.pl/eli/acts/DU/2026/252/text.pdf (ustawa zmieniająca KSC, przepisy przejściowe art. 22-48 i załączniki, 2026-11-06)
- https://api.sejm.gov.pl/eli/acts/DU/2026/252 (metadane: ogłoszenie 2026-03-02, 2026-11-06)
- https://api.sejm.gov.pl/eli/acts/DU/2018/1560/references (akty zmieniające KSC z datami wejścia, 2026-11-06)
- https://www.gov.pl/web/cyfryzacja/ostatnie-dni-na-samorejestracje-w-wykazie-ksc-termin-mija-3-pazdziernika (publikacja 2026-09-28, odczyt 2026-11-06)
- https://www.gov.pl/web/cyfryzacja/nowelizacja-ustawy-o-krajowym-systemie-cyberbezpieczenstwa-ksc---jak-dokonac-samoidentyfikacji (publikacja 2026-04-27, odczyt 2026-11-06)
- https://www.gov.pl/web/rozwoj-technologia/sprawdz-czy-twoja-firma-podlega-ksc-zyskaj-czas-na-przygotowanie-do-nadchodzacych-zmian (publikacja 2026-08-19, odczyt 2026-11-06)
- https://www.gov.pl/attachment/a3b63395-503b-426c-9913-6d0b6d3c205d (Dziennik Urzędowy MC z 2026-04-08, komunikat o harmonogramie; z wyników wyszukiwania, nie otwierałem)
- https://www.uke.gov.pl/akt/wdrazanie-przepisow-znowelizowanej-ustawy-ksc-przygotowanie-do-realizacji-obowiazkow-przez-podmioty-kluczowe-i-podmioty-wazne,682.html (z wyników wyszukiwania, nie otwierałem)
- https://orzeczenia.nsa.gov.pl/doc/8C17F5BC71 (próba 2026-11-06, brak odpowiedzi)

---

## Źródła i akty spoza wbudowanych

### Akty spoza plików lokalnych potrzebne skillowi

| Akt | ELI / publikator | Po co |
|---|---|---|
| Ustawa z 23 stycznia 2026 r. o zmianie ustawy o KSC oraz niektórych innych ustaw | DU/2026/252 | przepisy przejściowe NIS2 (art. 22-48), tabele załączników nr 1 i 2 |
| Rozporządzenie Komisji (UE) nr 651/2014, załącznik I | Dz. Urz. UE L 187 z 26.06.2014 | progi mikro, małego, średniego przedsiębiorcy |
| Rozporządzenie wykonawcze Komisji (UE) 2024/2690 | Dz. Urz. UE (17.10.2024) | środki i progi incydentu poważnego dla dostawców cyfrowych |
| RODO (rozporządzenie 2016/679) art. 33 | Dz. Urz. UE L 119 z 4.05.2016 | zgłoszenie naruszenia danych równolegle do incydentu |

### Kwestie sporne i niepewne (przedstawiaj jako pytania do prawnika, nie jako regułę)

1. Czy kara z KSC art. 73 ust. 5 (do 100 mln zł) jest objęta 2-letnim odroczeniem z art. 35 ustawy zmieniającej.
2. Relacja limitów kary dla podmiotu ważnego (KSC art. 73 ust. 4): ustawa nie powtarza formuły o kwocie wyższej.
