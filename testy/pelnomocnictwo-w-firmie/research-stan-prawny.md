# Pełnomocnictwo w firmie: stan prawny (research do references)

Stan na: 5 listopada 2026 r. Teksty ustaw pobrane z api.sejm.gov.pl (ELI) i przeczytane w PDF tekstu jednolitego albo aktu zmieniającego (pdftotext z kodowaniem UTF-8, wyszukiwanie po tekście). Zmiany po t.j. sprawdzone w metadanych ELI („Akty zmieniające”, „Inf. o tekście jednolitym”) i w tekstach ustaw zmieniających (lista zmienianych przepisów, przepis o wejściu w życie). Procesy legislacyjne z API Sejmu X kadencji (api.sejm.gov.pl/sejm/term10/processes). Orzecznictwo SN z API SAOS (saos.org.pl/api): sentencje uchwał otwarte i przeczytane; uzasadnień nie analizowano w całości. SAOS nie zwrócił uchwał SN nowszych niż 2016 r. dla zapytań o art. 210 KSH i prokurę, więc nowszego orzecznictwa nie ma w tym pliku, a sygnatur z pamięci nie dopisano. Rozporządzeń MF o wzorach pełnomocnictw (UPL-1, PPS-1, OPL-1), rozporządzenia o KSeF (uprawnienia, ZAW-FA), formularzy ZUS (PEL) i tekstu eIDAS **nie otwarto** (EUR-Lex zwrócił pustą odpowiedź); takie miejsca mają dopisek [NIEOTWARTE]. Teza bez potwierdzenia w źródle pierwotnym ma dopisek [NIEPOTWIERDZONE] albo [DO WERYFIKACJI]. Wnioski „po skutku” to interpretacja na potrzeby skilla, nie porada prawna.

Konwencja: „KC” = ustawa z 23 kwietnia 1964 r. Kodeks cywilny; „KSH” = ustawa z 15 września 2000 r. Kodeks spółek handlowych; „KPC” = ustawa z 17 listopada 1964 r. Kodeks postępowania cywilnego; „PPSA” = ustawa z 30 sierpnia 2002 r. Prawo o postępowaniu przed sądami administracyjnymi; „OP” = ustawa z 29 sierpnia 1997 r. Ordynacja podatkowa; „KPA” = ustawa z 14 czerwca 1960 r. Kodeks postępowania administracyjnego; „u.o.s.” = ustawa z 16 listopada 2006 r. o opłacie skarbowej; „u.KRS” = ustawa z 20 sierpnia 1997 r. o Krajowym Rejestrze Sądowym; „u.CEIDG” = ustawa z 6 marca 2018 r. o Centralnej Ewidencji i Informacji o Działalności Gospodarczej i Punkcie Informacji dla Przedsiębiorcy; „u.d.e.” = ustawa z 18 listopada 2020 r. o doręczeniach elektronicznych; „u.s.u.s.” = ustawa z 13 października 1998 r. o systemie ubezpieczeń społecznych; „u.VAT” = ustawa z 11 marca 2004 r. o podatku od towarów i usług; „u.inf.” = ustawa z 17 lutego 2005 r. o informatyzacji działalności podmiotów realizujących zadania publiczne; „u.d.o.” = ustawa z 6 sierpnia 2010 r. o dowodach osobistych; „u.z.s.” = ustawa z 5 lipca 2018 r. o zarządzie sukcesyjnym przedsiębiorstwem osoby fizycznej i innych ułatwieniach związanych z sukcesją przedsiębiorstw; „PU” = ustawa z 28 lutego 2003 r. Prawo upadłościowe; „CRPO” = Centralny Rejestr Pełnomocnictw Ogólnych (art. 138d § 4 OP); „PRS” = Portal Rejestrów Sądowych (system teleinformatyczny KRS); „KES” = kwalifikowany podpis elektroniczny; „PZ” = podpis zaufany; „PO” = podpis osobisty (e-dowód). W cytatach z Dz.U. półpauzę i pauzę zastąpiono dywizem, procent zapisano ze spacją („10 %”), indeksy górne zapisano znakami ¹ ² ³ (w PDF widnieją jako „1091” albo „109[1]”).

Granica skilla: skill **mówi, kto może podpisać co, jaką formę i jaki rodzaj umocowania wybrać, prowadzi teczkę i rejestr umocowań oraz sprawdza wklejone pełnomocnictwo pod kątem zakresu, formy i aktualności**. Nie pisze treści pełnomocnictw, prokury ani uchwał, nie przesądza ważności konkretnej czynności, nie wypełnia formularzy (UPL-1, PPS-1, PEL, ZAW-FA, wnioski KRS i CEIDG). Sąsiedzi: sprawdzanie umocowania **drugiej strony** umowy (odpis KRS, CEIDG, kto podpisuje za kontrahenta) to `sprawdz-kontrahenta`; konfiguracja skrzynki e-Doręczeń, administrator i osoby upoważnione do skrzynki w szczegółach to `e-doreczenia-w-firmie`; macierz uprawnień KSeF, certyfikaty, łańcuch biuro-pracownik i ZAW-FA w szczegółach to `ksef-procedury`; pismo do urzędu z pełnomocnictwem w załączniku to `pismo-urzedowe`; terminy zgłoszeń do KRS i CEIDG jako cykl obowiązków to `kalendarz-obowiazkow`; streszczenie umowy, którą podpisuje pełnomocnik, to `co-wlasciwie-podpisuje`; ryzyka w treści umowy (także klauzule o reprezentacji) to `czerwone-flagi-w-umowie`; pełnomocnictwa przy zamykaniu JDG to `zamkniecie-firmy-krok-po-kroku`.

Słownik pojęć dla skilla (ze źródeł powyżej, bez nowych tez):
- **Reprezentacja organowa**: działanie członka zarządu, wspólnika spółki osobowej albo likwidatora za firmę; źródło: ustawa, umowa spółki i wpis w rejestrze, nie dokument pełnomocnictwa.
- **Prokura**: pełnomocnictwo przedsiębiorcy z KRS albo CEIDG do czynności sądowych i pozasądowych związanych z prowadzeniem przedsiębiorstwa; samoistna (oddzielna), łączna, oddziałowa, łączna z członkiem zarządu.
- **Pełnomocnictwo ogólne / rodzajowe / szczególne**: zwykły zarząd / rodzaj czynności przekraczających zwykły zarząd / jedna czynność (art. 98 KC).
- **Pełnomocnictwo procesowe**: umocowanie przed sądem (KPC, PPSA), z ustawowym zakresem i wyłączeniami.
- **Pełnomocnictwo ogólne w OP**: inna instytucja niż ogólne z KC; dotyczy spraw podatkowych i działa przez CRPO.
- **Uprawnienie w systemie** (KSeF, skrzynka e-Doręczeń, bankowość): dostęp nadany w systemie, nie pełnomocnictwo w rozumieniu KC.
- **Forma pisemna / elektroniczna / dokumentowa**: podpis własnoręczny / KES / dowolny dokument z identyfikacją osoby (art. 77²-78¹ KC).
- **Rzekomy pełnomocnik (falsus procurator)**: działający bez umocowania albo ponad nie; umowa zależy od potwierdzenia (art. 103 KC), jednostronna czynność nieważna (art. 104 KC).

---

## 0. Akty prawne (tekst jednolity, data stanu)

| Akt | Tekst jednolity / akt | Przepisy czytane | Zmiany po t.j. istotne dla skilla |
|---|---|---|---|
| KC (Dz.U. 1964 poz. 93) | **Dz.U. 2026 poz. 795** (obwieszczenie z 27.05.2026) | art. 38, 39, 42, 60, 61, 65, 73, 75¹, 77¹-79, 95-109⁸, 158, 865-866 | **Dz.U. 2026 poz. 507** art. 2 (KC art. 860 § 3-4, umowa spółki cywilnej na wzorze w CEIDG) **od 1.11.2028** (art. 31 pkt 4 ustawy). Po t.j. brak innych zmian art. 95-109⁸ |
| KSH (Dz.U. 2000 poz. 1037) | **Dz.U. 2024 poz. 18** (obwieszczenie z 7.12.2023) | art. 17, 29-30, 96-97, 117-118, 137, 173, 180, 201-211, 228, 243, 300⁹⁵, 373, 379, 412¹ | **Dz.U. 2026 poz. 1440** (ogł. 2.11.2026, w życie **3.12.2026**): art. 243 § 2 i 300⁹⁵ § 2 (pełnomocnictwo na zgromadzenie w formie dokumentowej); **Dz.U. 2026 poz. 176** (od **18.02.2027**): akcje, SA i PSA, poza zakresem; 2026 poz. 187 i 644 poza zakresem; Dz.U. 2024 poz. 96 (wyrok TK K 29/23) poza zakresem |
| KPC (Dz.U. 1964 poz. 296) | **Dz.U. 2026 poz. 468** (obwieszczenie z 27.03.2026; obejmuje Dz.U. 2025 poz. 1172, w życie 1.03.2026) | art. 67, 86-97, 126 § 5, 694¹-694³ | Po t.j.: 2026 poz. 473, 830, 1003, 1046, 1296: sprawdzone wyszukiwaniem, nie dotyczą art. 86-97 ani 694³ |
| PPSA (Dz.U. 2002 poz. 1270) | **Dz.U. 2026 poz. 143** (obejmuje 2025 poz. 1427, w życie 5.11.2025) | art. 34-44 | Art. 37 § 1a i 37a w nowym brzmieniu („postać elektroniczna”) **od 1.10.2029** (odnośniki 13, 15 t.j.) |
| OP (Dz.U. 1997 poz. 926) | **Dz.U. 2026 poz. 622** (obwieszczenie z 22.04.2026) | art. 80a-80b, 138a-138o | **Dz.U. 2026 poz. 846** (od **1.10.2026**): art. 138a § 6, 138c § 1, 138d § 5-5a, 145 § 2, 151 § 1, 117ba § 3a. Inne zmiany po t.j. (2026 poz. 825, 875, 1098, 1154, 1206) poza zakresem |
| KPA (Dz.U. 1960 poz. 168) | Dz.U. 2025 poz. 1691 | art. 32-34 | nie badano zmian po t.j. w tym researchu (zob. research `decyzja-z-urzedu-co-dalej`: brak) |
| u.o.s. (Dz.U. 2006 poz. 1635) | **Dz.U. 2026 poz. 1395** (obwieszczenie z 9.10.2026) | art. 1, 2, 5, 6, 7, 12, załącznik część IV | t.j. obejmuje 2026 poz. 846 i 912; art. 1 ust. 3 (milczące załatwienie) od 1.01.2027 (2026 poz. 875), poza zakresem |
| u.KRS (Dz.U. 1997 poz. 769) | **Dz.U. 2025 poz. 869** (obwieszczenie z 26.06.2025) | art. 17-19, 19a ust. 5, 19e, 39 | Po t.j.: 2025 poz. 1556, 1792; 2026 poz. 119, 176, 252, 346, 644: nie czytano pod kątem art. 19-19e [DO WERYFIKACJI]. Projekt rządowy druk nr 3004 (w komisjach) |
| u.CEIDG (Dz.U. 2018 poz. 647) | **Dz.U. 2026 poz. 30** (obwieszczenie z 7.01.2026) | art. 8, 38-42 | **Dz.U. 2026 poz. 507** (ogł. 13.04.2026): art. 38 ust. 2a, 3, 3a w nowym brzmieniu od **14.10.2026**; art. 39 ust. 2 uchylony i rozdział 6a (spółka cywilna w CEIDG) od **1.11.2028**; 2026 poz. 734 poza zakresem |
| u.d.e. (Dz.U. 2020 poz. 2320) | **Dz.U. 2026 poz. 3** | art. 19, 20, 29 | 2026 poz. 507 art. 10 (od 14.10.2026), poza zakresem pełnomocnictw |
| u.s.u.s. (Dz.U. 1998 poz. 887) | **Dz.U. 2026 poz. 199** | art. 41 ust. 3-4, 46 ust. 4, 123 | zmiany po t.j. (m.in. 2025 poz. 1413 od 1.11.2026) nie dotyczą umocowań [NIEPOTWIERDZONE, czytano tylko tytuły] |
| u.VAT (Dz.U. 2004 poz. 535) | **Dz.U. 2026 poz. 1263** | art. 106nb, 106nd, 106r | szczegóły KSeF: research `ksef-procedury` |
| u.inf. (Dz.U. 2005 poz. 565) | **Dz.U. 2026 poz. 1241** | art. 3 pkt 14a, 20ae | brak zmian po t.j. w ELI |
| u.d.o. (Dz.U. 2010 poz. 1029) | Dz.U. 2025 poz. 1753 | art. 12d | po t.j. 2026 poz. 1206: nie sprawdzano, czy dotyczy art. 12d [DO WERYFIKACJI] |
| u.z.s. (Dz.U. 2018 poz. 1629) | czytano tekst pierwotny (ELI nie wskazuje t.j.) | art. 9, art. 62 (zmiana art. 109⁷ § 4 KC) | - |
| PU (Dz.U. 2003 poz. 535) | **Dz.U. 2026 poz. 913** (obwieszczenie z 12.06.2026) | art. 75, 102, 161, 216 | 2026 poz. 1206 (od 11.01.2027) poza zakresem |
| Ustawa z 16.12.2016 (Dz.U. 2016 poz. 2255) | akt zmieniający KC, w życie 1.01.2017 | art. 1: dodanie art. 109⁴ § 1¹, nowe art. 109⁴ § 2 i 109⁸ § 2 KC | - |
| Ustawa deregulacyjna (Dz.U. 2025 poz. 769) | akt zmieniający, w życie 13.07.2025 | art. 2: KC art. 709² (umowa leasingu w formie dokumentowej) | - |

---

## 1. Kto podpisuje za firmę z mocy prawa (organy i wspólnicy)

### 1.1. Osoba prawna działa przez organy (art. 38-39, 42 KC)
- **Art. 38 KC:** „Osoba prawna działa przez swoje organy w sposób przewidziany w ustawie i w opartym na niej statucie.”
- **Art. 39 § 1 KC:** „Jeżeli zawierający umowę jako organ osoby prawnej nie ma umocowania albo przekroczy jego zakres, ważność umowy zależy od jej potwierdzenia przez osobę prawną, w której imieniu umowa została zawarta.” § 3: w braku potwierdzenia działający zwraca otrzymane świadczenie i naprawia szkodę drugiej strony, która nie wiedziała o braku umocowania.
- **Art. 42 § 1 KC:** brak organu albo brak w składzie organu uprawnionego do reprezentacji: „sąd ustanawia dla niej kuratora”.
- **Po skutku:** członek zarządu nie jest pełnomocnikiem spółki, tylko organem (piastunem). Jego umocowanie wynika z KSH, umowy spółki i wpisu w KRS, a nie z dokumentu pełnomocnictwa. Pełnomocnictwo udziela spółka (działając przez zarząd), więc mocodawcą jest spółka, nie prezes.

### 1.2. Sp. z o.o.: zarząd (art. 201-208 KSH)
- **Art. 201 § 1 KSH:** „Zarząd prowadzi sprawy spółki i reprezentuje spółkę.”
- **Art. 204 KSH:** „§ 1. Prawo członka zarządu do prowadzenia spraw spółki i jej reprezentowania dotyczy wszystkich czynności sądowych i pozasądowych spółki. § 2. Prawa członka zarządu do reprezentowania spółki nie można ograniczyć ze skutkiem prawnym wobec osób trzecich.”
- **Art. 205 § 1 KSH:** „Jeżeli zarząd jest wieloosobowy, sposób reprezentowania określa umowa spółki. Jeżeli umowa spółki nie zawiera żadnych postanowień w tym przedmiocie, do składania oświadczeń w imieniu spółki wymagane jest współdziałanie dwóch członków zarządu albo jednego członka zarządu łącznie z prokurentem.” § 2: oświadczenia składane spółce i doręczenia „mogą być dokonywane wobec jednego członka zarządu lub prokurenta”. § 3: nie wyłącza prokury.
- **Art. 207 KSH:** „Wobec spółki członkowie zarządu podlegają ograniczeniom ustanowionym w niniejszym dziale, w umowie spółki oraz, jeżeli umowa spółki nie stanowi inaczej, w uchwałach wspólników.”
- **Art. 208 § 6-7 KSH:** „§ 6. Powołanie prokurenta wymaga zgody wszystkich członków zarządu. § 7. Odwołać prokurę może każdy członek zarządu.” (§ 9-10: w spółce z wzorca uchwała o prokurze na wzorcu w systemie, podpisana KES, PZ albo PO, „równoważna z uchwałą w formie pisemnej”).
- **Art. 17 KSH:** § 1: czynność bez uchwały wymaganej przez **ustawę** „jest nieważna”; § 2: zgoda może być wyrażona przed albo po oświadczeniu, „nie później jednak niż w terminie dwóch miesięcy”, z mocą wsteczną; § 3: czynność bez zgody wymaganej **wyłącznie przez umowę spółki** „jest ważna”, ale członkowie zarządu odpowiadają wobec spółki.
- **Art. 228 KSH** (uchwała wspólników wymagana m.in. do): „3) zbycie i wydzierżawienie przedsiębiorstwa lub jego zorganizowanej części oraz ustanowienie na nich ograniczonego prawa rzeczowego; 4) nabycie i zbycie nieruchomości, użytkowania wieczystego lub udziału w nieruchomości, jeżeli umowa spółki nie stanowi inaczej”.
- **Art. 202 § 1-4 KSH:** mandat wygasa z dniem zgromadzenia zatwierdzającego sprawozdanie finansowe za pierwszy (albo ostatni) pełny rok obrotowy pełnienia funkcji, a także „wskutek śmierci, rezygnacji albo odwołania ze składu zarządu”. § 6: rezygnacja, po której żaden mandat nie byłby obsadzony, składana wspólnikom ze zwołaniem zgromadzenia, skuteczna dzień po dniu zgromadzenia.
- **SN, uchwała 7 sędziów z 31.03.2016, III CZP 89/15** (SAOS, sentencja otwarta): „Oświadczenie członka zarządu spółki kapitałowej o rezygnacji z tej funkcji jest składane - z wyjątkiem przewidzianym w art. 210 § 2 i art. 379 § 2 k.s.h. - spółce reprezentowanej w tym zakresie zgodnie z art. 205 § 2 lub 373 § 2 k.s.h.” Uwaga: uchwała sprzed dodania art. 202 § 6 KSH; przy jednoosobowym zarządzie stosuje się dziś § 6.
- **SN, uchwała z 7.04.2016, III CZP 84/15** (SAOS, sentencja otwarta): „Nie jest skuteczne oświadczenie woli jedynego likwidatora spółki z ograniczoną odpowiedzialnością w likwidacji o rezygnacji z pełnionej funkcji złożone jedynemu wspólnikowi tej spółki.”
- **SN, uchwała z 23.08.2006, III CZP 68/06** (SAOS, sentencja otwarta): „Członek zarządu spółki z ograniczoną odpowiedzialnością, uprawniony umową spółki do jej reprezentowania łącznie z drugim członkiem zarządu, może być ustanowiony pełnomocnikiem do poszczególnych czynności.”
- **Po skutku:** sposób reprezentacji czyta się z działu 2 odpisu KRS (art. 39 pkt 1 u.KRS: „oznaczenie organu uprawnionego do reprezentowania podmiotu oraz osób wchodzących w jego skład, ze wskazaniem sposobu reprezentacji”). Jeśli umowa spółki milczy, przy zarządzie wieloosobowym podpisuje dwóch członków albo członek z prokurentem. Uchwała wspólników wymagana przez KSH (np. nieruchomość) to warunek ważności; wymagana tylko przez umowę spółki to sprawa wewnętrzna. Skill nie przesądza, czy konkretna czynność była ważna.

### 1.3. Umowa spółki z członkiem zarządu (art. 210, 209, 173 KSH)
- **Art. 210 § 1 KSH:** „W umowie między spółką a członkiem zarządu oraz w sporze z nim spółkę reprezentuje rada nadzorcza lub pełnomocnik powołany uchwałą zgromadzenia wspólników.”
- **Art. 210 § 2 KSH:** „W przypadku gdy wspólnik, o którym mowa w art. 173 § 1, jest zarazem jedynym członkiem zarządu, przepisu § 1 nie stosuje się. Czynność prawna między tym wspólnikiem a reprezentowaną przez niego spółką wymaga formy aktu notarialnego. O każdorazowym dokonaniu takiej czynności prawnej notariusz zawiadamia sąd rejestrowy za pośrednictwem systemu teleinformatycznego.” § 3: wymogu aktu notarialnego „nie stosuje się do czynności prawnej dokonywanej przy wykorzystaniu wzorca udostępnionego w systemie teleinformatycznym”.
- **Art. 173 § 1 KSH:** gdy wszystkie udziały ma jedyny wspólnik (albo jedyny wspólnik i spółka), jego oświadczenie składane spółce „wymaga formy pisemnej pod rygorem nieważności, chyba że ustawa stanowi inaczej”.
- **Art. 203¹ KSH (zdanie drugie):** „Wynagrodzenie członków zarządu zatrudnionych na podstawie umowy o pracę lub innej umowy określa organ albo osoba powołana uchwałą zgromadzenia wspólników do zawarcia umowy z członkiem zarządu.”
- **Art. 209 KSH:** przy sprzeczności interesów członek zarządu „powinien ujawnić sprzeczność interesów i wstrzymać się od udziału w rozstrzyganiu takich spraw”.
- **Art. 379 § 1-2 KSH:** to samo dla SA (rada nadzorcza albo pełnomocnik powołany uchwałą walnego zgromadzenia; jedyny akcjonariusz będący jedynym członkiem zarządu: akt notarialny).
- **SN, uchwała z 10.04.2013, II UZP 1/13** (SAOS, sentencja otwarta): „Członek zarządu spółki akcyjnej odwołujący się od decyzji stwierdzającej jego odpowiedzialność za zaległości składkowe nie może reprezentować tej spółki występującej w sprawie w charakterze zainteresowanej (art. 379 § 1 k.s.h.).”
- **Po skutku:** umowa o pracę, kontrakt menedżerski, pożyczka, najem auta od prezesa: po stronie spółki nie podpisuje zarząd, tylko rada nadzorcza albo pełnomocnik z uchwały wspólników. Akt notarialny dotyczy wyłącznie układu „jedyny wspólnik = jedyny członek zarządu”, a nie każdej spółki jednoosobowej. Gdy jest dwóch wspólników, a jeden jest jedynym członkiem zarządu, działa § 1 (pełnomocnik z uchwały), nie § 2.

### 1.4. Spółka akcyjna i prosta spółka akcyjna
- **Art. 373 § 1 KSH:** przy wieloosobowym zarządzie, gdy statut milczy, „wymagane jest współdziałanie dwóch członków zarządu albo jednego członka zarządu łącznie z prokurentem”. Dla PSA skill odsyła do umowy spółki i KRS (art. 300⁷¹ i nast. KSH nie czytano) [NIEOTWARTE].

### 1.5. Spółki osobowe (art. 29-30, 96-97, 117-118, 137 KSH)
- **Spółka jawna, art. 29 KSH:** „§ 1. Każdy wspólnik ma prawo reprezentować spółkę. § 2. Prawo wspólnika do reprezentowania spółki dotyczy wszystkich czynności sądowych i pozasądowych spółki. § 3. Prawa reprezentowania spółki nie można ograniczyć ze skutkiem wobec osób trzecich.” **Art. 30 § 1:** umowa może pozbawić wspólnika reprezentacji albo przewidzieć reprezentację łączną „z innym wspólnikiem lub prokurentem”; § 2: pozbawienie wbrew wspólnikowi tylko „na mocy prawomocnego orzeczenia sądu”.
- **Spółka partnerska, art. 96 § 1:** „Każdy partner ma prawo reprezentować spółkę samodzielnie, chyba że umowa spółki stanowi inaczej.” Art. 97: umowa może powierzyć reprezentację zarządowi (wtedy art. 201-211 KSH odpowiednio).
- **Spółka komandytowa, art. 117:** reprezentują komplementariusze nieodsunięci od reprezentacji. **Art. 118 § 1:** „Komandytariusz może reprezentować spółkę jedynie jako pełnomocnik.” § 2: działając bez ujawnienia pełnomocnictwa albo bez umocowania, komandytariusz „odpowiada za skutki tej czynności wobec osób trzecich bez ograniczenia”.
- **SKA, art. 137 § 1:** reprezentują komplementariusze, których nie pozbawiono tego prawa statutem albo orzeczeniem.
- **Po skutku:** w spółce komandytowej komandytariusz podpisujący umowę bez pełnomocnictwa ryzykuje nieograniczoną odpowiedzialność; to częsty błąd w rodzinnych sp.k.

### 1.6. Spółka cywilna (art. 865-866 KC)
- **Art. 865 § 1-3 KC:** każdy wspólnik prowadzi sprawy; sprawy zwykłe bez uchwały, chyba że inny wspólnik się sprzeciwi; czynność nagła bez uchwały.
- **Art. 866 KC:** „W braku odmiennej umowy lub uchwały wspólników każdy wspólnik jest umocowany do reprezentowania spółki w takich granicach, w jakich jest uprawniony do prowadzenia jej spraw.”
- **Po skutku:** reprezentacja s.c. wynika z umowy, a przy jej braku z art. 866 KC; w czynnościach przekraczających zwykłe sprawy sam wspólnik nie ma umocowania bez uchwały. Spółka cywilna nie ma rejestru reprezentacji do 31.10.2028 (zob. 10.2: publikacja informacji o s.c. w CEIDG od 1.11.2028). Spółka cywilna nie jest przedsiębiorcą, przedsiębiorcami są wspólnicy (prokura w s.c. [DO WERYFIKACJI w komentarzu], art. 109¹ KC mówi o przedsiębiorcy wpisanym do CEIDG albo KRS).

### 1.7. Jednoosobowa działalność (CEIDG)
- Przedsiębiorca działa osobiście albo przez pełnomocnika lub prokurenta. **Art. 38 ust. 1 u.CEIDG:** „Przedsiębiorca wpisany do CEIDG może opublikować za pośrednictwem systemu teleinformatycznego CEIDG informację o swoim pełnomocniku lub prokurencie.” Szczegóły w pkt 10.

---

## 2. Prokura (art. 109¹-109⁸ KC)

- **Art. 109¹ KC:** „§ 1. Prokura jest pełnomocnictwem udzielonym przez przedsiębiorcę podlegającego obowiązkowi wpisu do Centralnej Ewidencji i Informacji o Działalności Gospodarczej albo do rejestru przedsiębiorców Krajowego Rejestru Sądowego, które obejmuje umocowanie do czynności sądowych i pozasądowych, jakie są związane z prowadzeniem przedsiębiorstwa. § 2. Nie można ograniczyć prokury ze skutkiem wobec osób trzecich, chyba że przepis szczególny stanowi inaczej.”
- **Art. 109² KC:** „§ 1. Prokura powinna być pod rygorem nieważności udzielona na piśmie. Przepisu art. 99 § 1 nie stosuje się. § 2. Prokurentem może być osoba fizyczna mająca pełną zdolność do czynności prawnych.”
- **Art. 109³ KC:** „Do zbycia przedsiębiorstwa, do dokonania czynności prawnej, na podstawie której następuje oddanie go do czasowego korzystania, oraz do zbywania i obciążania nieruchomości jest wymagane pełnomocnictwo do poszczególnej czynności.”
- **Art. 109⁴ KC:** „§ 1. Prokura może być udzielona kilku osobom łącznie (prokura łączna) lub oddzielnie. § 1¹. Prokura może obejmować umocowanie także albo wyłącznie do dokonywania czynności wspólnie z członkiem organu zarządzającego lub wspólnikiem uprawnionym do reprezentowania handlowej spółki osobowej. § 2. Kierowane do przedsiębiorcy oświadczenia lub doręczenia pism mogą być dokonywane wobec jednej z osób, którym udzielono prokury.”
- **Art. 109⁵ KC:** „Prokurę można ograniczyć do zakresu spraw wpisanych do rejestru oddziału przedsiębiorstwa (prokura oddziałowa).”
- **Art. 109⁶ KC:** „Prokura nie może być przeniesiona. Prokurent może ustanowić pełnomocnika do poszczególnej czynności lub pewnego rodzaju czynności.”
- **Art. 109⁷ KC:** „§ 1. Prokura może być w każdym czasie odwołana. § 2. Prokura wygasa wskutek wykreślenia przedsiębiorcy z Centralnej Ewidencji i Informacji o Działalności Gospodarczej albo z rejestru przedsiębiorców Krajowego Rejestru Sądowego, a także ogłoszenia upadłości, otwarcia likwidacji oraz przekształcenia przedsiębiorcy. § 3. Prokura wygasa ze śmiercią prokurenta. § 3¹. Prokura wygasa wskutek ustanowienia kuratora na podstawie art. 42 § 1. W okresie kurateli prokura nie może być ustanowiona. § 4. Utrata przez przedsiębiorcę zdolności do czynności prawnych nie powoduje wygaśnięcia prokury.”
- **Art. 109⁸ KC:** „§ 1. Udzielenie i wygaśnięcie prokury przedsiębiorca powinien zgłosić do Centralnej Ewidencji i Informacji o Działalności Gospodarczej albo rejestru przedsiębiorców Krajowego Rejestru Sądowego. § 2. Zgłoszenie o udzieleniu prokury powinno określać jej rodzaj, a w przypadku prokury łącznej oraz prokury, o której mowa w art. 109⁴ § 1¹, także sposób jej wykonywania.” Art. 109⁹: uchylony.
- **Historia § 1¹:** **SN, uchwała 7 sędziów z 30.01.2015, III CZP 34/14** (SAOS, sentencja otwarta): „Niedopuszczalny jest wpis do rejestru przedsiębiorców w Krajowym Rejestrze Sądowym jednego prokurenta z zastrzeżeniem, że może on działać tylko łącznie z członkiem zarządu.” Teza **nieaktualna** od 1.01.2017: ustawa z 16.12.2016 (Dz.U. 2016 poz. 2255, art. 1 pkt 1 lit. a) dodała art. 109⁴ § 1¹ KC (tzw. prokura łączna niewłaściwa).
- **Śmierć przedsiębiorcy (JDG):** u.z.s. art. 62 nadał art. 109⁷ § 4 KC obecne brzmienie (bez słowa o śmierci). Art. 9 ust. 1 u.z.s.: przedsiębiorca może „zastrzec, że z chwilą jego śmierci wskazany prokurent stanie się zarządcą sukcesyjnym”; art. 9 ust. 2: powołanie i zgoda „wymagają zachowania formy pisemnej pod rygorem nieważności”. Wniosek, że prokura w JDG wygasa ze śmiercią przedsiębiorcy (art. 101 § 2 KC przez art. 109¹ „prokura jest pełnomocnictwem”), to wykładnia [DO WERYFIKACJI w komentarzu]; u.CEIDG art. 39 ust. 7a: publikacja informacji o prokurencie kończy się z uwidocznieniem zgonu.
- **KSH:** art. 208 § 6-7 (powołanie prokurenta: zgoda wszystkich członków zarządu; odwołanie: każdy członek zarządu).
- **Po skutku:** prokura to najszerszy rodzaj pełnomocnictwa, ale tylko dla przedsiębiorcy z CEIDG albo KRS i tylko dla osoby fizycznej. Ograniczenia wewnętrzne (limit kwoty, zakaz kredytów) nie działają wobec kontrahenta, z wyjątkiem prokury łącznej, oddziałowej i z § 1¹, bo te ujawnia się w rejestrze. Nieruchomości i sprzedaż przedsiębiorstwa: prokurent potrzebuje osobnego pełnomocnictwa do tej czynności. Prokura wygasa z mocy prawa przy likwidacji, upadłości, przekształceniu (także JDG w spółkę) i kuratorze; trzeba ją wtedy ustanowić od nowa, jeśli jest dopuszczalna.

---

## 3. Pełnomocnictwo cywilne (art. 95-109 KC)

- **Art. 95 KC:** „§ 1. Z zastrzeżeniem wyjątków w ustawie przewidzianych albo wynikających z właściwości czynności prawnej, można dokonać czynności prawnej przez przedstawiciela. § 2. Czynność prawna dokonana przez przedstawiciela w granicach umocowania pociąga za sobą skutki bezpośrednio dla reprezentowanego.”
- **Art. 96 KC:** umocowanie „może opierać się na ustawie (przedstawicielstwo ustawowe) albo na oświadczeniu reprezentowanego (pełnomocnictwo)”.
- **Art. 98 KC:** „Pełnomocnictwo ogólne obejmuje umocowanie do czynności zwykłego zarządu. Do czynności przekraczających zakres zwykłego zarządu potrzebne jest pełnomocnictwo określające ich rodzaj, chyba że ustawa wymaga pełnomocnictwa do poszczególnej czynności.”
- **Art. 99 KC:** „§ 1. Jeżeli do ważności czynności prawnej potrzebna jest szczególna forma, pełnomocnictwo do dokonania tej czynności powinno być udzielone w tej samej formie. § 2. Pełnomocnictwo ogólne powinno być pod rygorem nieważności udzielone na piśmie.”
- **Art. 100 KC:** ograniczona zdolność pełnomocnika „nie ma wpływu na ważność czynności dokonanej przez niego w imieniu mocodawcy”.
- **Art. 106 KC:** „Pełnomocnik może ustanowić dla mocodawcy innych pełnomocników tylko wtedy, gdy umocowanie takie wynika z treści pełnomocnictwa, z ustawy lub ze stosunku prawnego będącego podstawą pełnomocnictwa.”
- **Art. 107 KC:** kilku pełnomocników z takim samym zakresem: „każdy z nich może działać samodzielnie, chyba że co innego wynika z treści pełnomocnictwa”.
- **Art. 108 KC:** „Pełnomocnik nie może być drugą stroną czynności prawnej, której dokonywa w imieniu mocodawcy, chyba że co innego wynika z treści pełnomocnictwa albo że ze względu na treść czynności prawnej wyłączona jest możliwość naruszenia interesów mocodawcy. Przepis ten stosuje się odpowiednio w wypadku, gdy pełnomocnik reprezentuje obie strony.”
- **Pełnomocnik bez umocowania, art. 103 KC:** „§ 1. Jeżeli zawierający umowę jako pełnomocnik nie ma umocowania albo przekroczy jego zakres, ważność umowy zależy od jej potwierdzenia przez osobę, w której imieniu umowa została zawarta. § 2. Druga strona może wyznaczyć osobie, w której imieniu umowa została zawarta, odpowiedni termin do potwierdzenia umowy; staje się wolna po bezskutecznym upływie wyznaczonego terminu.” § 3: zwrot i odszkodowanie od działającego.
- **Art. 104 KC:** „Jednostronna czynność prawna dokonana w cudzym imieniu bez umocowania lub z przekroczeniem jego zakresu jest nieważna.” (wyjątek: adresat zgodził się na działanie bez umocowania).
- **SN, uchwała z 14.03.2006, III CZP 7/06** (SAOS, sentencja otwarta): „Umowa poręczenia, w której poręczyciela reprezentował pełnomocnik, zawarta z przekroczeniem określonej kwotowo granicy umocowania, w razie odmowy jej potwierdzenia, jest w całości nieważna (art. 103 § 1 i 2 k.c.).”
- **SN, uchwała 7 sędziów z 14.09.2007, III CZP 31/07** (SAOS, sentencja otwarta): „Do umowy zawartej przez zarząd spółdzielni bez wymaganej do jej ważności uchwały walnego zgromadzenia lub rady nadzorczej ma zastosowanie w drodze analogii art. 103 § 1 i 2 k.c.” (spółdzielnia; dla spółek handlowych art. 17 § 2 KSH ma własny termin dwóch miesięcy).
- **Po skutku:** trzy szczeble: ogólne (zwykły zarząd, zawsze na piśmie), rodzajowe (rodzaj czynności przekraczających zwykły zarząd, np. „umowy najmu lokali”), szczególne (jedna czynność). Granicy „zwykłego zarządu” ustawa nie definiuje; skill nie przesądza jej w konkretnej sprawie, tylko sygnalizuje. Przekroczenie limitu kwoty nie daje umowy „do limitu”: bez potwierdzenia cała umowa nie wiąże (III CZP 7/06). Pełnomocnik, który sam chce kupić od firmy albo podpisać z nią umowę, potrzebuje wyraźnej zgody w treści pełnomocnictwa (art. 108).

---

## 4. Forma czynności i forma pełnomocnictwa

### 4.1. Przepisy o formie (art. 73, 77²-78¹ KC)
- **Art. 73 § 1 KC:** forma pisemna, dokumentowa albo elektroniczna zastrzeżona przez ustawę: czynność bez niej „jest nieważna tylko wtedy, gdy ustawa przewiduje rygor nieważności”. § 2: inna forma szczególna (akt notarialny, podpis poświadczony): bez niej czynność „jest nieważna”, chyba że forma jest zastrzeżona tylko dla określonych skutków.
- **Art. 77² KC:** „Do zachowania dokumentowej formy czynności prawnej wystarcza złożenie oświadczenia woli w postaci dokumentu, w sposób umożliwiający ustalenie osoby składającej oświadczenie.” **Art. 77³:** „Dokumentem jest nośnik informacji umożliwiający zapoznanie się z jej treścią.”
- **Art. 78 § 1 KC:** „Do zachowania pisemnej formy czynności prawnej wystarcza złożenie własnoręcznego podpisu na dokumencie obejmującym treść oświadczenia woli.” (§ 2 uchylony).
- **Art. 78¹ KC:** „§ 1. Do zachowania elektronicznej formy czynności prawnej wystarcza złożenie oświadczenia woli w postaci elektronicznej i opatrzenie go kwalifikowanym podpisem elektronicznym. § 2. Oświadczenie woli złożone w formie elektronicznej jest równoważne z oświadczeniem woli złożonym w formie pisemnej.”
- **eIDAS (rozporządzenie 910/2014) art. 25 ust. 2:** KES ma skutek prawny równoważny podpisowi własnoręcznemu [NIEOTWARTE, tekstu nie pobrano; teza zgodna z art. 78¹ § 2 KC].

### 4.2. Podpis zaufany i podpis osobisty
- **Art. 20ae u.inf.:** „1. Podpis zaufany wywołuje skutki prawne, jeżeli został utworzony lub złożony w okresie ważności środka identyfikacji elektronicznej [...]. 2. Dane w postaci elektronicznej opatrzone podpisem zaufanym są równoważne pod względem skutków prawnych dokumentowi opatrzonemu podpisem własnoręcznym, chyba że przepisy odrębne stanowią inaczej. [...] 3. Nie można odmówić ważności i skuteczności podpisowi zaufanemu tylko na tej podstawie, że istnieje w postaci elektronicznej.”
- **Art. 12d u.d.o.:** „1. Opatrzenie danych podpisem osobistym wywołuje w stosunku do podmiotu publicznego skutek prawny równoważny podpisowi własnoręcznemu. 2. Skutek, o którym mowa w ust. 1, wywołuje opatrzenie danych podpisem osobistym w stosunku do podmiotu innego niż podmiot publiczny, jeżeli obie strony wyrażą na to zgodę.”
- **Po skutku:** wobec urzędów i sądów PZ i PO wystarczą wprost (np. art. 89 § 1² KPC, art. 37a PPSA, art. 19e u.KRS, art. 8 ust. 4 u.CEIDG, art. 29 u.d.e.). W relacjach prywatnych (pełnomocnictwo ogólne do umów, pełnomocnictwo dla banku, kontrahenta) jedyną pewną elektroniczną postacią formy pisemnej jest **KES** (art. 78¹ KC). PO wobec kontrahenta działa tylko za zgodą obu stron. Czy PZ spełnia formę pisemną z art. 78 KC w obrocie prywatnym, jest sporne w doktrynie [DO WERYFIKACJI w komentarzu]; skill ma mówić „bezpiecznie: KES albo papier”.

### 4.3. Kiedy jaka forma pełnomocnictwa (art. 99 KC w praktyce)
- **Nieruchomość:** art. 158 KC: umowa zobowiązująca i przenosząca własność „w formie aktu notarialnego” → pełnomocnictwo w formie aktu notarialnego (art. 99 § 1). Prokurent nie wystarczy (art. 109³).
- **Udziały w sp. z o.o.:** art. 180 § 1 KSH: „Zbycie udziału, jego części lub ułamkowej części udziału oraz jego zastawienie powinno być dokonane w formie pisemnej z podpisami notarialnie poświadczonymi.” → pełnomocnictwo z podpisem notarialnie poświadczonym. § 2: w spółce z wzorca zbycie na wzorcu, oświadczenia opatrzone KES, PZ albo PO.
- **Przedsiębiorstwo:** art. 75¹ § 1 KC: zbycie, wydzierżawienie, użytkowanie „w formie pisemnej z podpisami notarialnie poświadczonymi” → takie pełnomocnictwo; prokurent potrzebuje osobnego (art. 109³).
- **Pełnomocnictwo ogólne:** zawsze na piśmie pod rygorem nieważności (art. 99 § 2), papier albo KES.
- **Prokura:** na piśmie pod rygorem nieważności, bez względu na formę czynności (art. 109² § 1 zdanie drugie wyłącza art. 99 § 1); w CEIDG publikacja informacji o prokurencie „jest równoznaczne w skutkach z ustanowieniem prokury” (art. 39 ust. 4 u.CEIDG).
- **Umowa w formie pisemnej lub dokumentowej bez rygoru nieważności:** art. 99 § 1 nie wymaga tej formy dla pełnomocnictwa (dotyczy formy „do ważności”). Przykład z deregulacji: art. 709² KC od 13.07.2025: „Umowa leasingu wymaga zachowania formy dokumentowej.” (bez rygoru nieważności, art. 73 § 1). Dla dowodu skill zaleca jednak co najmniej formę dokumentową.
- **Pełnomocnictwo na zgromadzenie wspólników sp. z o.o.:** art. 243 § 2 KSH dziś: „Pełnomocnictwo powinno być udzielone na piśmie pod rygorem nieważności.” **Od 3.12.2026** (Dz.U. 2026 poz. 1440): „Pełnomocnictwo powinno być udzielone w formie dokumentowej, chyba że umowa spółki przewiduje surowsze wymogi jego udzielenia.” Art. 3 ust. 2 tej ustawy: do pełnomocnictw udzielonych wcześniej stosuje się przepisy dotychczasowe. Art. 243 § 3: „Członek zarządu i pracownik spółki nie mogą być pełnomocnikami na zgromadzeniu wspólników.” PSA (art. 300⁹⁵ § 2): dziś forma dokumentowa pod rygorem nieważności, od 3.12.2026 forma dokumentowa z możliwością zaostrzenia w umowie. SA: art. 412¹ § 1: „forma pisemna pod rygorem nieważności” (bez zmian).

### 4.4. Macierz: czynność → kto może → forma umocowania (do references)
| Czynność | Kto może za firmę (poza organem) | Forma pełnomocnictwa | Podstawa |
|---|---|---|---|
| Zwykła umowa handlowa, zamówienie | prokurent; pełnomocnik ogólny (zwykły zarząd), rodzajowy, szczególny | jak dla czynności; bez formy szczególnej czynności dowolna, zalecana co najmniej dokumentowa | art. 98, 99 § 1, 109¹ KC |
| Pełnomocnictwo ogólne do zwykłego zarządu | - | pisemna pod rygorem nieważności (papier albo KES) | art. 99 § 2, 78¹ KC |
| Czynność przekraczająca zwykły zarząd (kredyt, poręczenie, ugoda) | prokurent; pełnomocnik rodzajowy albo szczególny | jak dla czynności | art. 98 KC |
| Kupno i sprzedaż nieruchomości | pełnomocnik szczególny (nie prokurent bez osobnego umocowania) | akt notarialny | art. 158, 99 § 1, 109³ KC |
| Obciążenie nieruchomości (hipoteka) | pełnomocnik do poszczególnej czynności | forma wymagana dla czynności [DO WERYFIKACJI: forma oświadczenia o ustanowieniu hipoteki, KW nie czytano] | art. 109³ KC |
| Zbycie, dzierżawa przedsiębiorstwa | pełnomocnik szczególny | pisemna z podpisem notarialnie poświadczonym | art. 75¹, 99 § 1, 109³ KC |
| Zbycie i zastaw udziałów sp. z o.o. | pełnomocnik szczególny | pisemna z podpisem notarialnie poświadczonym (wzorzec: KES, PZ, PO) | art. 180 KSH, 99 § 1 KC |
| Umowa leasingu | prokurent albo pełnomocnik | brak formy szczególnej (leasing: dokumentowa bez rygoru) | art. 709², 73 § 1 KC |
| Umowa spółki z członkiem zarządu | rada nadzorcza albo pełnomocnik z uchwały wspólników; jedyny wspólnik = jedyny członek zarządu: akt notarialny | uchwała wspólników | art. 210 KSH |
| Głos na zgromadzeniu wspólników | pełnomocnik (nie członek zarządu, nie pracownik) | pisemna pod rygorem nieważności; od 3.12.2026 dokumentowa | art. 243 KSH |
| Deklaracje i JPK | pełnomocnik do podpisu (UPL-1) | elektronicznie do Szefa KAS albo do US | art. 80a OP |
| Sprawy w US | osoba fizyczna: ogólne (CRPO) albo szczególne | ogólne tylko elektronicznie; szczególne na piśmie albo do protokołu | art. 138b-138e OP |
| Faktury w KSeF | osoba albo podmiot z uprawnieniem w KSeF | nadanie w systemie albo zawiadomienie (ZAW-FA) | art. 106nb, 106r u.VAT |
| ZUS | osoba fizyczna (KPA); podpis dokumentów rozliczeniowych: osoba upoważniona | na piśmie albo do protokołu | art. 33 KPA, art. 41, 46 u.s.u.s. |
| Wniosek do KRS | organ, prokurent, pełnomocnik z KPC | elektronicznie przez PRS (KES, PZ, PO), pełnomocnictwo w załączniku | art. 19 u.KRS, 694³ KPC |
| Sprawozdanie finansowe do KRS | reprezentant z PESEL w KRS, prokurent, adwokat, radca | KES, PZ, PO | art. 19e u.KRS |
| Wpisy w CEIDG (JDG) | przedsiębiorca, pełnomocnik albo prokurent opublikowany w CEIDG | publikacja w CEIDG = pełnomocnictwo pisemne | art. 38-39 u.CEIDG |
| Skrzynka e-Doręczeń | administrator skrzynki i osoby upoważnione | w systemie | art. 19 u.d.e. |
| Proces cywilny | adwokat, radca, pracownik, prokurent (jako osoba uprawniona) i inne z art. 87 | papier z podpisem albo elektronicznie KES, PZ, PO | art. 67, 87, 89 KPC |
| Skarga do WSA | adwokat, radca, doradca podatkowy (przepis szczególny), pracownik | jak wyżej | art. 35, 37, 37a PPSA |

---

## 5. Pracownik a umocowanie

- **Art. 97 KC:** „Osobę czynną w lokalu przedsiębiorstwa przeznaczonym do obsługiwania publiczności poczytuje się w razie wątpliwości za umocowaną do dokonywania czynności prawnych, które zazwyczaj bywają dokonywane z osobami korzystającymi z usług tego przedsiębiorstwa.”
- **Po skutku:** art. 97 chroni klienta w sklepie, salonie, recepcji, i tylko w czynnościach typowych dla tego lokalu. Nie daje pracownikowi biura umocowania do podpisania umowy z dostawcą, aneksu, ugody ani do odbioru dużej gotówki poza kasą. Stanowisko („kierownik”, „dyrektor handlowy”) samo nie jest umocowaniem: potrzebne pełnomocnictwo albo prokura.
- **Sąd i urząd:** pracownik może być pełnomocnikiem przedsiębiorcy przed sądem cywilnym (art. 87 § 2 KPC) i administracyjnym (art. 35 § 2 PPSA); przed urzędem skarbowym i w KPA pełnomocnikiem może być każda osoba fizyczna z odpowiednią zdolnością (art. 138b § 1 OP, art. 33 § 1 KPA). Na zgromadzeniu wspólników pracownik pełnomocnikiem być nie może (art. 243 § 3 KSH).
- **ZUS:** u.s.u.s. przewiduje podpis dokumentów rozliczeniowych przez „płatnika składek lub osobę przez niego upoważnioną” (art. 41 ust. 3 pkt 9 i ust. 4; art. 46 ust. 4 pkt 9).

---

## 6. Urząd skarbowy (OP)

- **Art. 138a OP:** „§ 1. Strona może działać przez pełnomocnika, chyba że charakter czynności wymaga jej osobistego działania. § 2. Pełnomocnictwo może być ogólne, szczególne albo do doręczeń.” **§ 6 (od 1.10.2026):** „Osoba niebędąca stroną, wzywana na podstawie art. 155 § 1 do złożenia wyjaśnień lub przedłożenia dokumentów, może działać przez pełnomocnika ogólnego lub szczególnego. Przepis art. 138b § 1 stosuje się odpowiednio.”
- **Art. 138b § 1 OP:** „Pełnomocnikiem strony może być osoba fizyczna mająca pełną zdolność do czynności prawnych.”
- **Art. 138c § 1 OP (od 1.10.2026):** „Pełnomocnictwo wskazuje dane identyfikacyjne mocodawcy, w tym jego identyfikator podatkowy, dane identyfikacyjne pełnomocnika, w tym jego identyfikator podatkowy i adres pełnomocnika do doręczeń w kraju. [...]”
- **Art. 138d OP:** § 1: ogólne „upoważnia do działania we wszystkich sprawach podatkowych oraz w innych sprawach należących do właściwości organów podatkowych”; § 3: zgłasza mocodawca „wyłącznie na piśmie utrwalonym w postaci elektronicznej według wzoru [...] do Szefa Krajowej Administracji Skarbowej”, papier tylko przy problemach technicznych; § 4: wpis do CRPO; **§ 5 (od 1.10.2026):** „Adwokat, radca prawny oraz doradca podatkowy mogą sami zgłaszać udzielenie im pełnomocnictwa ogólnego.”; **§ 5a:** „Pełnomocnik może sam zawiadamiać o zmianie, odwołaniu lub wypowiedzeniu pełnomocnictwa ogólnego, ze wskazaniem daty zwolnienia z obowiązku reprezentacji.”
- **Art. 138e OP:** szczególne: „we wskazanej sprawie podatkowej lub innej wskazanej sprawie”; na piśmie albo ustnie do protokołu; papierowe składa się do akt „w oryginale lub jego notarialnie poświadczony odpis” (§ 3).
- **Art. 138i OP:** „§ 1. Ustanowienie, zmiana zakresu, odwołanie lub wypowiedzenie pełnomocnictwa ogólnego wywiera skutek od dnia wpływu do Centralnego Rejestru. § 2. [...] pełnomocnictwa szczególnego wywiera skutek od dnia zawiadomienia organu podatkowego.”
- **Art. 138g OP:** przy kilku pełnomocnikach o tym samym zakresie albo ogólnym i szczególnym w tej samej sprawie strona wskazuje jednego jako pełnomocnika do doręczeń. **Art. 145 § 2 OP (od 1.10.2026):** „Jeżeli ustanowiono pełnomocnika, pisma doręcza się pełnomocnikowi.”
- **Art. 138o OP:** w sprawach nieuregulowanych stosuje się KC i KPC.
- **Pełnomocnictwo do podpisywania deklaracji, art. 80a OP:** § 1: deklarację „może [...] podpisać także [...] pełnomocnik podatnika, płatnika lub inkasenta”; § 2a: przy e-deklaracjach pełnomocnictwo składa się naczelnikowi US właściwemu w sprawach ewidencji; § 2c: w postaci elektronicznej do Szefa KAS; § 3: gdy deklarację podpisuje kilka osób, pełnomocnictwo skuteczne, jeżeli udzieliły go wszystkie. Art. 80b: podpis pełnomocnika zwalnia podatnika z podpisu.
- **Wzory:** UPL-1 (deklaracje), PPS-1 (szczególne), PPD-1 (doręczenia), OPL-1 i OPL-1P / OPO-1 (ogólne) to wzory z rozporządzeń wydanych na podstawie art. 80a § 5 i 138j OP [NIEOTWARTE: nazwy z praktyki, rozporządzeń nie czytano].
- **Tabela umocowań w sprawach podatkowych:**

| Rodzaj | Do czego | Gdzie i jak | Skutek od | Opłata skarbowa |
|---|---|---|---|---|
| Ogólne (OPL-1) | wszystkie sprawy podatkowe i inne we właściwości organów podatkowych | elektronicznie do Szefa KAS, wpis do CRPO; papier tylko przy awarii | wpływu do CRPO | zwolnione |
| Szczególne (PPS-1) | wskazana sprawa | do akt sprawy: oryginał albo notarialny odpis, albo ustnie do protokołu | zawiadomienia organu | 17 zł |
| Do doręczeń (PPD-1) | odbiór pism; obowiązkowe w przypadkach z art. 138f | jak szczególne (art. 138f § 4) | zawiadomienia organu | 17 zł, chyba że zwolnienie [DO WERYFIKACJI] |
| Do podpisu deklaracji (UPL-1) | podpis deklaracji, także JPK z częścią deklaracyjną | naczelnik US ds. ewidencji albo elektronicznie Szef KAS | złożenia [DO WERYFIKACJI: art. 80a nie wskazuje daty skutku] | e-deklaracje zwolnione |

- **u.CEIDG art. 42:** „Przepisów art. 38-40 nie stosuje się w sprawach prowadzonych na podstawie przepisów ustawy z dnia 29 sierpnia 1997 r. - Ordynacja podatkowa [...] oraz ustawy z dnia 16 listopada 2016 r. o Krajowej Administracji Skarbowej”.
- **Po skutku:** pełnomocnikiem w US jest **konkretna osoba fizyczna**, nie biuro rachunkowe jako spółka. Pełnomocnik wpisany w CEIDG nie działa w sprawach podatkowych. Pełnomocnictwo ogólne zaczyna działać dopiero od wpływu do CRPO i tylko elektronicznie; odwołanie też dopiero od wpływu do CRPO. UPL-1 (podpis e-deklaracji) to coś innego niż pełnomocnictwo ogólne: do JPK i e-deklaracji potrzebne jest UPL-1 albo pełnomocnictwo ogólne, które je obejmuje [DO WERYFIKACJI: czy ogólne obejmuje podpis deklaracji, art. 138d nie mówi tego wprost].

---

## 7. KSeF (uprawnienia, nie pełnomocnictwo)

- **Art. 106nb u.VAT:** z KSeF korzystają m.in. „1) podatnik, 2) podmioty wskazane przez podatnika, [...] 5) osoby fizyczne wskazane w zawiadomieniu o nadaniu lub odebraniu uprawnień do korzystania z Krajowego Systemu e-Faktur, którym podatnik [...] nadali uprawnienia do korzystania z tego systemu, 6) podmioty inne [...] wskazane przez osoby fizyczne korzystające z Krajowego Systemu e-Faktur, jeżeli prawo do wskazywania innego podmiotu wynika z uprawnień nadanych tym osobom fizycznym”.
- **Art. 106nd ust. 2 pkt 1-3 u.VAT:** KSeF służy m.in. do „nadawania, zmiany lub odbierania uprawnień”, powiadamiania o nich i weryfikacji uprawnień.
- **Art. 106r u.VAT:** rodzaje uprawnień, sposoby nadawania i „wzór zawiadomienia o nadaniu oraz odebraniu tych uprawnień” określa rozporządzenie MF [NIEOTWARTE: rozporządzenie; ZAW-FA to ten wzór zawiadomienia według praktyki].
- **Harmonogram:** obowiązek od 1.02.2026 (najwięksi) i 1.04.2026 (pozostali), sankcje od 1.01.2027; szczegóły i źródła w `skille/ksef-procedury/references/stan-prawny.md` (stan na 24.08.2026, czytany w tym researchu jako źródło wtórne): uprawnienie właścicielskie jest systemowe, uprawnienia nadane (bezpośrednie, pośrednie) to osobna kategoria; od 1.02.2026 uprawnieniami zarządza się w Aplikacji Podatnika KSeF.
- **Po skutku:** uprawnienie w KSeF nie jest pełnomocnictwem z KC ani z OP. Pełnomocnictwo UPL-1 albo ogólne w CRPO nie daje dostępu do KSeF i odwrotnie. Skill wpisuje uprawnienia KSeF do rejestru umocowań jako osobną kolumnę i odsyła konfigurację do `ksef-procedury`.

---

## 8. ZUS

- **Art. 123 u.s.u.s.:** „W sprawach uregulowanych ustawą stosuje się przepisy Kodeksu postępowania administracyjnego, chyba że ustawa stanowi inaczej.” U.s.u.s. nie ma własnych przepisów o pełnomocnictwie (przeszukano t.j.).
- **Art. 32 KPA:** „Strona może działać przez pełnomocnika, chyba że charakter czynności wymaga jej osobistego działania.” **Art. 33 KPA:** „§ 1. Pełnomocnikiem strony może być osoba fizyczna posiadająca zdolność do czynności prawnych. § 2. Pełnomocnictwo powinno być udzielone na piśmie lub zgłoszone do protokołu.” § 3: oryginał albo urzędowo poświadczony odpis; adwokat, radca, rzecznik patentowy i doradca podatkowy uwierzytelniają odpis sami.
- **Opłata skarbowa:** art. 2 ust. 1 pkt 1 lit. b u.o.s.: sprawy „ubezpieczenia społecznego, ubezpieczenia zdrowotnego” nie podlegają opłacie, także od złożenia pełnomocnictwa.
- **PEL, PUE/eZUS:** formularz PEL i nadawanie dostępu w PUE to praktyka ZUS [NIEOTWARTE: zus.pl nie otwierano]. Czy ZUS przyjmuje biuro rachunkowe (osobę prawną) jako pełnomocnika na PEL, wobec art. 33 § 1 KPA [DO WERYFIKACJI na zus.pl].
- **Po skutku:** dla biura rachunkowego bezpiecznie wskazywać konkretne osoby fizyczne; pełnomocnictwo do ZUS jest wolne od opłaty skarbowej.

---

## 9. KRS i Portal Rejestrów Sądowych

- **Art. 19 ust. 2 u.KRS:** „Wnioski dotyczące podmiotu podlegającego wpisowi do rejestru przedsiębiorców składa się wyłącznie za pośrednictwem systemu teleinformatycznego.” Ust. 5-6: wniosek z opłatą; nieopłacony elektroniczny „nie wywołuje skutków”.
- **Art. 694³ § 1 KPC:** „Wniosek do sądu rejestrowego prowadzącego Krajowy Rejestr Sądowy składa podmiot podlegający wpisowi do tego rejestru, jeżeli przepisy szczególne nie stanowią inaczej.” **§ 3²:** „Do wniosku złożonego przez pełnomocnika za pośrednictwem systemu teleinformatycznego pełnomocnik dołącza pełnomocnictwo lub jego odpis.” (zdanie drugie uchylone od 1.03.2026, odnośnik 77 t.j.).
- **Art. 126 § 5 KPC:** pismo przez system teleinformatyczny „opatruje się kwalifikowanym podpisem elektronicznym, podpisem zaufanym albo podpisem osobistym”.
- **Art. 19a ust. 5 u.KRS:** do wniosku o wpis członków organu, likwidatorów i prokurentów dołącza się ich zgodę i adresy do doręczeń, chyba że wniosek podpisała osoba wpisywana „albo która udzieliła pełnomocnictwa do złożenia wniosku o wpis”.
- **Art. 19e ust. 2 u.KRS (sprawozdania finansowe):** zgłoszenie podpisuje (KES, PZ, PO) „co najmniej jedna osoba fizyczna, której numer PESEL jest ujawniony w Rejestrze, wpisana jako uprawniona samodzielnie lub łącznie z innymi osobami do reprezentowania podmiotu, prokurent, syndyk, zarządca w postępowaniu restrukturyzacyjnym albo likwidator”; ust. 3a: także adwokat, radca prawny albo prawnik zagraniczny umocowany do zgłoszenia.
- **Art. 17 u.KRS:** „1. Domniemywa się, że dane wpisane do Rejestru są prawdziwe.” Ust. 2: wpis niezgodny ze zgłoszeniem: podmiot nie może się zasłaniać wobec osoby trzeciej w dobrej wierze, jeśli zaniedbał wniosek o sprostowanie.
- **Pełnomocnik w postępowaniu rejestrowym:** z czytanych przepisów nie wynika ograniczenie do pełnomocnika profesjonalnego przy wnioskach o wpis; zastosowanie ma art. 87 KPC (w tym pracownik, art. 87 § 2) [NIEPOTWIERDZONE: teza zlecenia „pełnomocnik profesjonalny w KRS od 2021” nie znalazła oparcia w t.j.; ograniczenie do adwokata, radcy i prawnika zagranicznego dotyczy zgłoszeń dokumentów finansowych z art. 19e ust. 3a].
- **Po skutku:** sprawozdanie finansowe do KRS może wysłać członek zarządu z PESEL w KRS, prokurent albo adwokat/radca, a nie księgowa z biura na podstawie zwykłego pełnomocnictwa. Zmiana zarządu albo prokury: wniosek w terminie 7 dni od zdarzenia (art. 22 u.KRS, odsyłacz do `kalendarz-obowiazkow`). Zwykłych pełnomocników nie wpisuje się do KRS (art. 39 u.KRS wymienia organ i prokurentów).

---

## 10. CEIDG

### 10.1. Stan obecny (t.j. Dz.U. 2026 poz. 30 ze zmianami od 14.10.2026)
- **Art. 38 ust. 2 u.CEIDG:** informacja o pełnomocniku lub prokurencie zawiera m.in. dane osoby, adres do doręczeń, „8) zakres pełnomocnictwa lub rodzaj i sposób wykonywania prokury; 9) datę udzielenia pełnomocnictwa lub ustanowienia prokury”.
- **Art. 38 ust. 2a (od 14.10.2026):** „W przypadku prokurenta [...] wskazuje się, czy prokurent został powołany na zarządcę sukcesyjnego.” **Ust. 3 (od 14.10.2026):** pełnomocnikiem w CEIDG może być także osoba prawna „lub jednostka organizacyjna niebędąca osobą prawną, której przepisy szczególne przyznają zdolność prawną”. **Ust. 3a (od 14.10.2026):** „W przypadku opublikowania przez przedsiębiorcę informacji o więcej niż jednym pełnomocniku, może on wskazać, któremu z nich doręcza się pisma.”
- **Art. 39 u.CEIDG:** „3. Opublikowanie za pośrednictwem systemu teleinformatycznego CEIDG informacji o pełnomocniku jest równoznaczne w skutkach z udzieleniem pełnomocnictwa na piśmie. 4. Opublikowanie [...] informacji o prokurencie jest równoznaczne w skutkach z ustanowieniem prokury.” Ust. 5: oświadczenie, że pełnomocnik lub prokurent przyjął umocowanie (pod rygorem odpowiedzialności karnej). Ust. 7: zakończenie publikacji na wniosek przedsiębiorcy, pełnomocnika lub prokurenta; ust. 7a: z uwidocznieniem zgonu.
- **Po skutku:** w JDG wpis pełnomocnika w CEIDG sam tworzy pełnomocnictwo pisemne, a wpis prokurenta tworzy prokurę. Zakres trzeba wpisać precyzyjnie, bo obcy czytają go z CEIDG. Nie działa w sprawach podatkowych (art. 42).

### 10.2. Zmiany od 1.11.2028 (Dz.U. 2026 poz. 507)
- Rozdział 6a: publikacja informacji o spółce cywilnej w CEIDG, w tym „dane dotyczące wspólników spółki cywilnej, w tym informację o wspólnikach uprawnionych do reprezentacji tej spółki” (art. 42a ust. 2 pkt 4); domniemanie prawdziwości (art. 42a ust. 7); wniosek składa wspólnik uprawniony do reprezentacji, w jego imieniu także „pełnomocnik lub prokurent, o których mowa w art. 38 ust. 1, o ile zakres ich umocowania wskazany w CEIDG przewiduje takie uprawnienie” (art. 42c ust. 2); umowa s.c. na wzorze w CEIDG (art. 42d) i KC art. 860 § 3-4. Uchylenie art. 39 ust. 2 (papierowy wniosek o publikację pełnomocnictwa do wpisów) też od 1.11.2028.

---

## 11. e-Doręczenia (administrator skrzynki, osoby upoważnione)

- **Art. 19 u.d.e.:** „1. Podmiot publiczny oraz podmiot niepubliczny niebędący osobą fizyczną są obowiązane do wyznaczenia administratora skrzynki doręczeń. 2. Podmiot niepubliczny będący osobą fizyczną jest uprawniony do wyznaczenia administratora skrzynki doręczeń.” Ust. 6 pkt 2: zarządzanie skrzynką obejmuje „wskazywanie osób fizycznych upoważnionych do dokonywania na skrzynce doręczeń operacji”; ust. 7: „Upoważnienie [...] nie obejmuje prawa wskazania dalszych osób upoważnionych”.
- **Art. 29 ust. 3-4 u.d.e.:** wniosek o adres dla spółki podpisuje osoba uprawniona (KES, PZ, PO) albo pieczęć kwalifikowana; dołącza się kopię dokumentu reprezentacji i „pełnomocnictwa do złożenia wniosku w imieniu podmiotu niepublicznego, jeżeli pełnomocnik został ustanowiony”.
- **Po skutku:** administrator skrzynki i osoba upoważniona w skrzynce nie są pełnomocnikami w sprawie; odbiór pisma w skrzynce to doręczenie stronie. Konfiguracja: `e-doreczenia-w-firmie`. W rejestrze umocowań skill zapisuje administratora i upoważnionych jako osobną pozycję.

---

## 12. Bank (praktyka, nie przepis)
- Pełnomocnictwa do rachunku firmowego i bankowości elektronicznej udziela się zwykle na formularzu banku, często w oddziale albo w systemie banku, z kartą wzorów podpisów. Wymogi formy i zakresu wynikają z umowy rachunku i regulaminu banku, nie z ustawy [przepisów Prawa bankowego o pełnomocnictwie do rachunku nie szukano; teza praktyczna].
- **Po skutku:** zmiana zarządu albo odwołanie pełnomocnika nie zmienia uprawnień w banku, dopóki bank nie dostanie dyspozycji; to pierwsza pozycja listy „po zmianie składu zarządu” w teczce.

---

## 13. Opłata skarbowa od pełnomocnictwa (u.o.s.)

- **Art. 1 ust. 1 pkt 2 u.o.s.:** opłacie podlega „złożenie dokumentu stwierdzającego udzielenie pełnomocnictwa lub prokury albo jego odpisu, wypisu lub kopii - w sprawie z zakresu administracji publicznej lub w postępowaniu sądowym”.
- **Załącznik, część IV:** **17 zł** „od każdego stosunku pełnomocnictwa (prokury)”. Zwolnione (kolumna 4): dokument „poświadczony notarialnie lub przez uprawniony organ, upoważniające do odbioru dokumentów”; sprawy karne, karne skarbowe, dyscyplinarne, o wykroczenia; sprawy cywilne ze zwolnieniem od kosztów; pełnomocnictwo dla małżonka, wstępnego, zstępnego, rodzeństwa; mocodawca z art. 7 pkt 1-5; pełnomocnictwo do podpisywania deklaracji składanych elektronicznie; „pełnomocnictwa ogólnego w rozumieniu [...] Ordynacja podatkowa”; pełnomocnictwo szczególne z u.d.o.
- **Art. 2 ust. 1 pkt 1 u.o.s.:** pełnomocnictwo nie podlega opłacie m.in. w sprawach ubezpieczenia społecznego i zdrowotnego (lit. b), zatrudnienia i wynagrodzeń za pracę (lit. f).
- **Art. 5 ust. 1-2 u.o.s.:** obowiązek ciąży „na mocodawcy, pełnomocniku, przedsiębiorcy lub prokurencie”, solidarnie. **Art. 6 ust. 1 pkt 4:** powstaje „z chwilą złożenia dokumentu w organie administracji publicznej, sądzie lub podmiocie, o którym mowa w art. 1 ust. 2”. **Art. 12 ust. 1 pkt 2-3:** organ właściwy: wg miejsca złożenia; przy złożeniu elektronicznym: wg miejsca zamieszkania albo siedziby mocodawcy.
- **Po skutku:** 17 zł płaci się przy złożeniu dokumentu w urzędzie lub sądzie, nie przy podpisaniu. Nie płaci się za pełnomocnictwo w umowie z kontrahentem, w banku, w ZUS, za ogólne w CRPO i UPL-1 elektroniczne. Szczególne PPS-1 w US: 17 zł. Czy wpis pełnomocnika lub prokurenta w CEIDG albo wniosek o wpis prokury do KRS rodzi opłatę skarbową [DO WERYFIKACJI w objaśnieniach MF].

---

## 14. Sądy

### 14.1. Sąd cywilny i gospodarczy (KPC)
- **Art. 67 § 1 KPC:** osoby prawne „dokonują czynności procesowych przez swoje organy albo przez osoby uprawnione do działania w ich imieniu” (tu mieści się prokurent).
- **Art. 87 § 1 KPC:** pełnomocnikiem może być adwokat, radca prawny, w sprawach IP rzecznik patentowy, w restrukturyzacji i upadłości doradca restrukturyzacyjny, „a ponadto osoba sprawująca zarząd majątkiem lub interesami strony oraz osoba pozostająca ze stroną w stałym stosunku zlecenia, jeżeli przedmiot sprawy wchodzi w zakres tego zlecenia, współuczestnik sporu, jak również małżonek, rodzeństwo, zstępni lub wstępni strony oraz osoby pozostające ze stroną w stosunku przysposobienia”. **§ 2:** „Pełnomocnikiem osoby prawnej lub przedsiębiorcy, w tym nieposiadającego osobowości prawnej, może być również pracownik tej jednostki albo jej organu nadrzędnego.” Art. 87¹: przymus adwokacko-radcowski przed SN.
- **Art. 88 KPC:** procesowe ogólne, do poszczególnych spraw albo do niektórych czynności; § 2: pełnomocnik do doręczeń.
- **Art. 89 KPC:** § 1: pełnomocnictwo „z podpisem mocodawcy lub wierzytelny odpis” przy pierwszej czynności; nie jest wymagane, gdy sąd stwierdzi umocowanie z rejestru dostępnego elektronicznie. **§ 1² (od 1.03.2026):** „Pełnomocnictwo udzielone w postaci elektronicznej opatruje się kwalifikowanym podpisem elektronicznym, podpisem zaufanym albo podpisem osobistym.” § 2: ustnie do protokołu.
- **Art. 91 KPC:** procesowe obejmuje z mocy prawa m.in. ugodę, zrzeczenie się roszczenia i uznanie powództwa, „jeżeli czynności te nie zostały wyłączone w danym pełnomocnictwie”, oraz dalsze pełnomocnictwo dla adwokata lub radcy.
- **Art. 94 § 1 KPC:** wypowiedzenie przez mocodawcę skutkuje wobec sądu „z chwilą zawiadomienia go o tym”. **Art. 96:** śmierć strony: pełnomocnictwo wygasa, ale pełnomocnik działa do zawieszenia postępowania. **Art. 97:** tymczasowe dopuszczenie bez pełnomocnictwa z terminem na doniesienie.

### 14.2. Sąd administracyjny (PPSA)
- **Art. 35 § 1 PPSA:** pełnomocnikiem może być adwokat, radca, inny skarżący lub uczestnik, małżonek, rodzeństwo, wstępni, zstępni, przysposobieni, „a także inne osoby, jeżeli przewidują to przepisy szczególne”. **§ 2:** pracownik osoby prawnej lub przedsiębiorcy.
- **Art. 36 PPSA:** ogólne, do poszczególnych spraw, do niektórych czynności. **Art. 37 § 1:** jak w KPC, z możliwością stwierdzenia umocowania z rejestru (od 5.11.2025). **Art. 37a:** pełnomocnictwo elektroniczne podpisuje się KES, PZ albo PO. **Art. 39:** obejmuje m.in. cofnięcie skargi, jeśli nie wyłączono. **Art. 42-44:** wypowiedzenie skuteczne od zawiadomienia sądu; śmierć strony; tymczasowe dopuszczenie.
- **Po skutku:** pełnomocnictwo procesowe daje z mocy prawa prawo do ugody i cofnięcia skargi; jeśli firma tego nie chce, musi to wyłączyć w treści. Księgowa z biura nie jest w KPC osobą z art. 87 § 1, chyba że biuro jest w „stałym stosunku zlecenia” obejmującym przedmiot sprawy [DO WERYFIKACJI w orzecznictwie].

---

## 15. Odwołanie, wygaśnięcie, skuteczność wobec osób trzecich

- **Art. 101 KC:** „§ 1. Pełnomocnictwo może być w każdym czasie odwołane, chyba że mocodawca zrzekł się odwołania pełnomocnictwa z przyczyn uzasadnionych treścią stosunku prawnego będącego podstawą pełnomocnictwa. § 2. Umocowanie wygasa ze śmiercią mocodawcy lub pełnomocnika, chyba że w pełnomocnictwie inaczej zastrzeżono z przyczyn uzasadnionych treścią stosunku prawnego będącego podstawą pełnomocnictwa.”
- **Art. 102 KC:** „Po wygaśnięciu umocowania pełnomocnik obowiązany jest zwrócić mocodawcy dokument pełnomocnictwa. Może żądać poświadczonego odpisu tego dokumentu; wygaśnięcie umocowania powinno być na odpisie zaznaczone.”
- **Art. 105 KC:** „Jeżeli pełnomocnik po wygaśnięciu umocowania dokona w imieniu mocodawcy czynności prawnej w granicach pierwotnego umocowania, czynność prawna jest ważna, chyba że druga strona o wygaśnięciu umocowania wiedziała lub z łatwością mogła się dowiedzieć.”
- **Zmiana składu zarządu:** pełnomocnictwo udzielone przez spółkę nie wygasa z powodu odwołania członka zarządu, który je podpisał, bo mocodawcą jest spółka (wniosek z art. 38, 95 § 2, 101 KC: przepisy nie wymieniają takiej przyczyny wygaśnięcia) [wniosek własny, bez orzeczenia otwartego w tym researchu]. Prokura też trwa (art. 109⁷ nie wymienia zmiany zarządu), ale każdy członek zarządu może ją odwołać (art. 208 § 7 KSH).
- **Likwidacja, upadłość, przekształcenie:** prokura wygasa (art. 109⁷ § 2 KC). Upadłość: „Z dniem ogłoszenia upadłości upadły traci prawo zarządu oraz możliwość korzystania z mienia wchodzącego do masy upadłości i rozporządzania nim.” (art. 75 ust. 1 PU); umowy zlecenia, w których upadły jest dającym zlecenie, „wygasają z dniem ogłoszenia upadłości” (art. 102 ust. 1 PU); syndyk sam udziela pełnomocnictw (art. 161 ust. 1 PU). Wniosek, że pełnomocnictwa cywilne do mienia masy przestają działać z ogłoszeniem upadłości [DO WERYFIKACJI w komentarzu]. Otwarcie likwidacji a zwykłe pełnomocnictwa: przepis nie przewiduje wygaśnięcia [DO WERYFIKACJI].
- **Kurator spółki:** prokura wygasa (art. 109⁷ § 3¹ KC).
- **OP i sądy:** odwołanie skuteczne wobec US od wpływu do CRPO albo zawiadomienia organu (art. 138i OP), wobec sądu od zawiadomienia (art. 94 KPC, art. 42 PPSA).
- **Tabela zdarzeń (do references):**

| Zdarzenie | Prokura | Pełnomocnictwo cywilne | Pełnomocnictwo w OP | Pełnomocnictwo procesowe |
|---|---|---|---|---|
| Odwołanie przez firmę | w każdym czasie (art. 109⁷ § 1 KC); zgłosić do KRS/CEIDG | w każdym czasie, chyba że zrzeczenie z art. 101 § 1; wobec kontrahenta w dobrej wierze ryzyko art. 105 | od wpływu do CRPO (ogólne) albo zawiadomienia organu (szczególne) | od zawiadomienia sądu (art. 94 KPC, 42 PPSA) |
| Śmierć pełnomocnika lub prokurenta | wygasa (§ 3) | wygasa (art. 101 § 2) | wygasa (art. 138o OP odsyła do KC) [wniosek] | - |
| Śmierć przedsiębiorcy JDG | zob. pkt 2 i u.z.s. [DO WERYFIKACJI] | wygasa, chyba że zastrzeżono inaczej (art. 101 § 2) | jw. | wygasa, pełnomocnik działa do zawieszenia (art. 96 KPC, 43 PPSA) |
| Zmiana składu zarządu | trwa | trwa | trwa | trwa |
| Otwarcie likwidacji | wygasa (§ 2) | przepis nie przewiduje wygaśnięcia [DO WERYFIKACJI] | jw. | jw. |
| Ogłoszenie upadłości | wygasa (§ 2) | upadły traci zarząd masą (art. 75 PU) [skutek dla pełnomocnictw: DO WERYFIKACJI] | jw. | jw. |
| Przekształcenie (np. JDG w spółkę) | wygasa (§ 2) | [DO WERYFIKACJI: sukcesja przy przekształceniu, KSH art. 553 nie czytano] | jw. | jw. |
| Ustanowienie kuratora (art. 42 KC) | wygasa (§ 3¹) | - | - | - |
| Wykreślenie z KRS albo CEIDG | wygasa (§ 2) | - | - | - |

- **Po skutku:** odwołanie bez powiadomienia kontrahentów, banku, US i sądu i bez odebrania dokumentu (art. 102) zostawia ryzyko z art. 105: kontrahent w dobrej wierze może skutecznie zawrzeć umowę z byłym pełnomocnikiem. Lista „przy odwołaniu”: odebrać oryginał, zawiadomić znanych kontrahentów na piśmie, bank, CRPO/US, sąd w toczących się sprawach, CEIDG lub KRS (prokura), KSeF, skrzynka e-Doręczeń.

---

## 16. Rejestr umocowań w firmie (dobra praktyka, nie przepis)
- Żaden czytany przepis nie nakazuje firmie prowadzić wewnętrznego rejestru pełnomocnictw. Rejestr wynika z potrzeby dowodu (art. 74 KC: forma dla dowodu), z art. 102 i 105 KC (kontrola zwrotu dokumentów i dobrej wiary) i z rozproszenia umocowań po systemach (CRPO, CEIDG, KRS, KSeF, e-Doręczenia, bank, ZUS).
- Proponowane pola: kto, dla kogo (spółka, oddział), rodzaj (prokura, ogólne, rodzajowe, szczególne, procesowe, OP ogólne/szczególne/UPL-1, uprawnienie KSeF, skrzynka e-Doręczeń, bank), zakres, limit, łączność, forma, data udzielenia, termin, gdzie zgłoszone (CRPO, KRS, CEIDG, KSeF, bank), opłata skarbowa, gdzie oryginał, data odwołania, komu zawiadomiono, data zwrotu dokumentu.

---

## 17. Umocowanie drugiej strony (tylko sygnał)
- Kontrahent-spółka: sposób reprezentacji z działu 2 KRS (art. 39 pkt 1 u.KRS), domniemanie prawdziwości wpisu (art. 17 u.KRS); prokura łączna, oddziałowa i z art. 109⁴ § 1¹ widoczna w KRS; pełnomocnik zwykły nie jest w KRS, więc trzeba zobaczyć dokument i porównać zakres z czynnością. Brak umocowania drugiej strony: art. 103 KC (prawo wyznaczenia terminu do potwierdzenia, § 2). Pełna procedura: `sprawdz-kontrahenta`.

---

## 18. Obalone tezy i częste błędy (do pułapek w references)
1. **„Prezes może podpisać wszystko sam.”** Nie, jeśli zarząd jest wieloosobowy, a umowa spółki milczy: dwóch członków albo członek z prokurentem (art. 205 § 1 KSH). Zawsze czytać dział 2 KRS.
2. **„W jednoosobowej spółce każda umowa z prezesem wymaga notariusza.”** Akt notarialny tylko gdy jedyny wspólnik jest zarazem jedynym członkiem zarządu (art. 210 § 2 KSH), z wyjątkiem czynności na wzorcu (§ 3). W pozostałych przypadkach spółkę reprezentuje rada nadzorcza albo pełnomocnik z uchwały (§ 1).
3. **„Prokurent może sprzedać nieruchomość firmy.”** Nie: potrzebne pełnomocnictwo do tej czynności (art. 109³ KC), a w sp. z o.o. zwykle także uchwała wspólników (art. 228 pkt 4 KSH).
4. **„Prokura nie może być łączna z członkiem zarządu.”** Mogła tak twierdzić uchwała III CZP 34/14, ale od 1.01.2017 art. 109⁴ § 1¹ KC wprost na to pozwala.
5. **„Limit kwoty w prokurze chroni firmę wobec kontrahenta.”** Nie (art. 109¹ § 2 KC); działa tylko wewnętrznie. W zwykłym pełnomocnictwie limit działa, a przekroczenie bez potwierdzenia daje nieważność całej umowy (III CZP 7/06).
6. **„Biuro rachunkowe sp. z o.o. będzie naszym pełnomocnikiem w US.”** Pełnomocnikiem w OP może być tylko osoba fizyczna (art. 138b § 1 OP); podobnie w KPA (art. 33 § 1).
7. **„Mam pełnomocnika w CEIDG, więc załatwi sprawę w skarbówce.”** Nie: art. 42 u.CEIDG wyłącza sprawy z OP i KAS.
8. **„Skan pełnomocnictwa szczególnego wystarczy w US.”** Papierowe składa się w oryginale albo notarialnie poświadczonym odpisie (art. 138e § 3 OP).
9. **„Podpis zaufany zawsze zastępuje podpis odręczny.”** Wobec urzędów tak (art. 20ae u.inf.), w obrocie prywatnym pewny jest tylko KES (art. 78¹ KC); podpis osobisty wobec prywatnego podmiotu wymaga zgody obu stron (art. 12d ust. 2 u.d.o.).
10. **„Odwołałem pełnomocnika mailem, więc jestem bezpieczny.”** Czynność byłego pełnomocnika z kontrahentem w dobrej wierze jest ważna (art. 105 KC); trzeba odebrać dokument (art. 102) i zawiadomić. W US skutek dopiero od wpływu do CRPO (art. 138i § 1 OP).
11. **„Po zmianie zarządu wszystkie pełnomocnictwa wygasają.”** Nie wygasają (mocodawcą jest spółka); trzeba je przejrzeć i odwołać świadomie.
12. **„Pełnomocnictwo zawsze kosztuje 17 zł.”** Tylko przy złożeniu w urzędzie lub sądzie; ZUS, CRPO (ogólne), UPL-1 elektroniczne, rodzina i dokument notarialny są zwolnione.
13. **„Pracownik w biurze może podpisać umowę, bo jest u nas zatrudniony.”** Art. 97 KC chroni tylko klientów w lokalu obsługi publiczności i w czynnościach zwyczajnych.
14. **„Komandytariusz może podpisywać jak wspólnik.”** Tylko jako pełnomocnik; bez ujawnienia pełnomocnictwa odpowiada bez ograniczenia (art. 118 KSH).
15. **„Pełnomocnictwo na zgromadzenie wspólników mailem.”** Do 2.12.2026 forma pisemna pod rygorem nieważności; od 3.12.2026 forma dokumentowa (mail z identyfikacją wystarcza), dla pełnomocnictw udzielonych wcześniej stare przepisy (Dz.U. 2026 poz. 1440 art. 3 ust. 2). Członek zarządu i pracownik pełnomocnikiem na zgromadzeniu być nie mogą (art. 243 § 3).
16. **„Księgowa wyśle sprawozdanie do KRS na swoim koncie.”** Zgłoszenie podpisuje osoba z PESEL w KRS jako reprezentant, prokurent albo adwokat/radca (art. 19e ust. 2 i 3a u.KRS).
17. **„Prokura przetrwa przekształcenie JDG w spółkę.”** Wygasa z przekształceniem (art. 109⁷ § 2 KC).

---

## 19. Zmiany 2024-2026 i projekty
- **Od 1.01.2017** (Dz.U. 2016 poz. 2255): prokura łączna z członkiem zarządu (art. 109⁴ § 1¹ KC). Tło, nie nowość.
- **13.07.2025** (Dz.U. 2025 poz. 769, deregulacja): leasing w formie dokumentowej (art. 709² KC).
- **5.11.2025** (Dz.U. 2025 poz. 1427): PPSA art. 37 § 1 zdanie czwarte, umocowanie z rejestru bez składania dokumentu.
- **1.02.2026 / 1.04.2026:** obowiązkowy KSeF i uprawnienia w KSeF 2.0 (zob. pkt 7 i `ksef-procedury`); sankcje od 1.01.2027.
- **1.03.2026** (Dz.U. 2025 poz. 1172): KPC art. 89 § 1² (pełnomocnictwo elektroniczne: KES, PZ, PO), uchylony § 1¹; art. 694³ § 3² zdanie drugie uchylone.
- **1.10.2026** (Dz.U. 2026 poz. 846): OP art. 138a § 6, 138c § 1, 138d § 5-5a (pełnomocnik sam zawiadamia o zmianie i wypowiedzeniu ogólnego), 145 § 2, 151 § 1 (doręczenie spółce: osobie upoważnionej do odbioru korespondencji lub prokurentowi), 117ba § 3a (UPL-1 obejmuje zawiadomienie z art. 117ba § 3 pkt 2).
- **14.10.2026** (Dz.U. 2026 poz. 507): u.CEIDG art. 38 ust. 2a, 3 i 3a (pełnomocnik w CEIDG także jednostka z przepisów szczególnych; wskazanie pełnomocnika do doręczeń).
- **3.12.2026** (Dz.U. 2026 poz. 1440, ogłoszona 2.11.2026): KSH art. 243 § 2 i 300⁹⁵ § 2, forma dokumentowa pełnomocnictwa na zgromadzenie. **Uchwalone, jeszcze nie w życiu w dniu stanu.**
- **18.02.2027** (Dz.U. 2026 poz. 176): zmiany KSH dotyczące akcji, SA i PSA; poza zakresem umocowań.
- **1.11.2028** (Dz.U. 2026 poz. 507): spółka cywilna w CEIDG z informacją o wspólnikach uprawnionych do reprezentacji; umowa s.c. na wzorze w CEIDG (KC art. 860 § 3-4).
- **1.10.2029:** PPSA art. 37 § 1a i 37a w brzmieniu „postać elektroniczna” (zmiana terminologiczna).
- **Projekt:** rządowy projekt zmiany u.KRS, druk nr 3004 (wpłynął 6.08.2026; etap: praca w komisjach po I czytaniu): konta w PRS, automatyczna aktualizacja danych z PESEL, uproszczenia sprawozdań finansowych. **Projekt, nie prawo.** Treści nie czytano [NIEOTWARTE].
- **Nie znaleziono** w procesach Sejmu X kadencji projektu zmiany art. 95-109⁸ KC (forma pełnomocnictwa) ani art. 138a-138o OP poza uchwalonymi zmianami powyżej (przeszukanie tytułów, 1785 procesów).

---

## 20. Orzecznictwo (rejestr)
| Sygnatura | Data, skład | Teza (sentencja) | Status |
|---|---|---|---|
| III CZP 34/14 | 30.01.2015, 7 sędziów | niedopuszczalny wpis jednego prokurenta działającego tylko z członkiem zarządu | otwarte (SAOS id 168062); **nieaktualne** od 1.01.2017 |
| III CZP 89/15 | 31.03.2016, 7 sędziów | rezygnacja członka zarządu składana spółce (art. 205 § 2 KSH) | otwarte (SAOS id 244997); por. art. 202 § 6 KSH |
| III CZP 84/15 | 7.04.2016 | rezygnacja jedynego likwidatora złożona jedynemu wspólnikowi nieskuteczna | otwarte (SAOS id 245052) |
| III CZP 68/06 | 23.08.2006 | członek zarządu z reprezentacją łączną może być pełnomocnikiem do poszczególnych czynności | otwarte (SAOS id 84522) |
| III CZP 7/06 | 14.03.2006 | przekroczenie kwotowej granicy umocowania: bez potwierdzenia umowa nieważna w całości | otwarte (SAOS id 84182) |
| III CZP 31/07 | 14.09.2007, 7 sędziów | brak uchwały w spółdzielni: art. 103 KC per analogiam | otwarte (SAOS id 86552) |
| II UZP 1/13 | 10.04.2013 | członek zarządu SA nie reprezentuje spółki w swojej sprawie (art. 379 § 1 KSH) | otwarte (SAOS id 101349) |
Razem: 7 otwartych (sentencje), 0 nieotwartych. Nowszych orzeczeń (po 2016) nie wyszukano skutecznie: luka do uzupełnienia na sn.pl [DO WERYFIKACJI].

---

## 21. Rejestr źródeł
- ELI: DU/2026/795 (KC t.j.), DU/2024/18 (KSH t.j.), DU/2026/1440, DU/2026/176, DU/2026/468 (KPC t.j.), DU/2026/143 (PPSA t.j.), DU/2026/622 (OP t.j.), DU/2026/846, DU/2025/1691 (KPA t.j.), DU/2026/1395 (u.o.s. t.j.), DU/2025/869 (u.KRS t.j.), DU/2026/30 (u.CEIDG t.j.), DU/2026/507, DU/2026/3 (u.d.e. t.j.), DU/2026/199 (u.s.u.s. t.j.), DU/2026/1263 (u.VAT t.j.), DU/2026/1241 (u.inf. t.j.), DU/2025/1753 (u.d.o. t.j.), DU/2018/1629 (u.z.s.), DU/2026/913 (PU t.j.), DU/2016/2255, DU/2025/769, DU/2025/1508 (zmiana KC, art. 647¹, poza zakresem), DU/2026/1296 (sprawdzone: art. 97 KC tylko jako odesłanie w przepisach o kontroli).
- Metadane: https://api.sejm.gov.pl/eli/acts/DU/<rok>/<poz>; teksty: .../text.pdf; procesy: https://api.sejm.gov.pl/sejm/term10/processes (druk 3004).
- SAOS: https://www.saos.org.pl/api/judgments/<id> dla id 168062, 244997, 245052, 84522, 84182, 86552, 101349.
- Źródło wtórne: `skille/ksef-procedury/references/stan-prawny.md` (stan na 24.08.2026).
- Nieotwarte: rozporządzenia MF o wzorach UPL-1, PPS-1, OPL-1, PPD-1; rozporządzenie MF o KSeF (ZAW-FA); zus.pl (PEL, PUE/eZUS); eIDAS (EUR-Lex); regulaminy banków; art. 300⁷¹ i nast. KSH (PSA).

---

## 22. Sugestie do references (co skill ma mówić po skutku)
1. **Mapa „kto podpisuje”**: najpierw rodzaj firmy (JDG, s.c., jawna, partnerska, komandytowa, sp. z o.o., SA, PSA), potem źródło umocowania (organ i KRS, wspólnik i umowa, prokura, pełnomocnictwo). Zawsze prosić o dział 2 KRS albo wpis CEIDG, nie zgadywać sposobu reprezentacji.
2. **Drzewko „jakie umocowanie”**: stała, szeroka obsługa firmy przez osobę zaufaną → prokura (osoba fizyczna, wpis do KRS/CEIDG, ograniczenia niewidoczne dla kontrahenta); powtarzalny rodzaj umów → rodzajowe z limitem; jedna transakcja → szczególne; nieruchomość, udziały, przedsiębiorstwo → szczególne w formie czynności (akt notarialny albo podpis poświadczony); urząd skarbowy → ogólne w CRPO albo PPS-1 (osoba fizyczna) i osobno UPL-1; KSeF → uprawnienie w systemie; sąd → procesowe z wyłączeniami (ugoda, cofnięcie).
3. **Tabela formy** (pkt 4.3) z kolumną „czego NIE robić”: nie skan zamiast oryginału w US, nie PZ w obrocie prywatnym, gdy potrzebna forma pisemna, nie zwykłe pismo do zbycia udziałów.
4. **Kontrola wklejonego pełnomocnictwa** (lista pytań, bez werdyktu o ważności): kto jest mocodawcą (spółka czy osoba), czy podpisali właściwi reprezentanci wg KRS, rodzaj i zakres a planowana czynność, limit, łączność, prawo do dalszego pełnomocnictwa (art. 106), zgoda na czynność z samym sobą (art. 108), forma a forma czynności (art. 99), data i termin, czy nie wygasło (śmierć, likwidacja, upadłość, przekształcenie, odwołanie), czy przy US jest osoba fizyczna, czy przy sądzie wyłączono ugodę. Wynik: „zgodne / do wyjaśnienia / poza zakresem” z odesłaniem do prawnika przy wątpliwości.
5. **Umowy z członkiem zarządu**: zawsze sygnał „art. 210 KSH: kto podpisuje po stronie spółki”, z rozróżnieniem jedyny wspólnik = jedyny członek zarządu (notariusz).
6. **Teczka umocowań i rejestr** (pkt 16) z rytuałem przeglądu: po każdej zmianie zarządu, odejściu pracownika, zmianie biura rachunkowego, raz w roku.
7. **Lista „przy odwołaniu”** (pkt 15) jako stała sekcja wyjścia, z datami skuteczności: kontrahent od dowiedzenia się (art. 105), US od CRPO, sąd od zawiadomienia, KRS/CEIDG prokura do zgłoszenia.
8. **Opłata skarbowa** jako krótka reguła: 17 zł tylko przy złożeniu w urzędzie lub sądzie, z listą zwolnień.
9. **Daty warunkowe**: art. 243 § 2 KSH (3.12.2026), s.c. w CEIDG (1.11.2028), projekt KRS (druk 3004) opisywać jako „uchwalone, wchodzi w życie” albo „projekt”, nigdy jako obowiązujące.
10. **Granice wyjścia**: skill nie pisze pełnomocnictwa ani uchwały, nie wypełnia formularzy i nie orzeka o ważności czynności; przy nieruchomościach, udziałach, upadłości, sporze sądowym i umowie z członkiem zarządu dopisuje „do notariusza albo prawnika”.
