# Spółka z o.o. przed rejestracją: stan prawny (research do references)

Stan na: 5 listopada 2026 r. Teksty ustaw pobrane z api.sejm.gov.pl (ELI) i przeczytane w PDF tekstu jednolitego albo aktu zmieniającego (pdftotext z kodowaniem UTF-8, wyszukiwanie po tekście, cytaty przepisane z tekstu). Zmiany po t.j. sprawdzone w metadanych ELI („Akty zmieniające”, „Inf. o tekście jednolitym”) i w tekstach ustaw zmieniających (lista zmienianych przepisów, przepis o wejściu w życie). Proces legislacyjny z API Sejmu X kadencji (druk nr 3004). Orzecznictwo SN z API SAOS (saos.org.pl/api): sentencje uchwał i fragmenty uzasadnień otwarte i przeczytane; SAOS nie zwrócił orzeczeń SN nowszych niż 2016 r. dla zapytań o KSH w części spółki z o.o., więc nowszego orzecznictwa w tym pliku nie ma, a sygnatur z pamięci nie dopisano. **Nie otwarto**: rozporządzenia MS o wzorcach umowy i uchwał w systemie S24 (delegacja art. 157¹ § 5 KSH), rozporządzenia o wysokości opłat za ogłoszenia w MSiG, formularzy NIP-8, CRBR, VAT-R, ZUS ZUA/ZZA i KRS (PRS), treści uzasadnienia druku nr 3004 poza pierwszymi stronami; takie miejsca mają dopisek [NIEOTWARTE]. Teza bez potwierdzenia w źródle pierwotnym ma dopisek [NIEPOTWIERDZONE] albo [DO WERYFIKACJI]. Wnioski „po skutku” to interpretacja na potrzeby skilla, nie porada prawna.

Konwencja: „KSH” = ustawa z 15 września 2000 r. Kodeks spółek handlowych; „KC” = ustawa z 23 kwietnia 1964 r. Kodeks cywilny; „KRO” = ustawa z 25 lutego 1964 r. Kodeks rodzinny i opiekuńczy; „u.KRS” = ustawa z 20 sierpnia 1997 r. o Krajowym Rejestrze Sądowym; „u.MSiG” = ustawa z 22 grudnia 1995 r. o wydawaniu Monitora Sądowego i Gospodarczego; „UKSC” = ustawa z 28 lipca 2005 r. o kosztach sądowych w sprawach cywilnych; „u.PCC” = ustawa z 9 września 2000 r. o podatku od czynności cywilnoprawnych; „taksa” = rozporządzenie MS z 28 czerwca 2004 r. w sprawie maksymalnych stawek taksy notarialnej; „u.o.s.” = ustawa z 16 listopada 2006 r. o opłacie skarbowej; „u.r.” = ustawa z 29 września 1994 r. o rachunkowości; „u.CIT” = ustawa z 15 lutego 1992 r. o podatku dochodowym od osób prawnych; „u.VAT” = ustawa z 11 marca 2004 r. o podatku od towarów i usług; „u.NIP” = ustawa z 13 października 1995 r. o zasadach ewidencji i identyfikacji podatników i płatników; „AML” = ustawa z 1 marca 2018 r. o przeciwdziałaniu praniu pieniędzy oraz finansowaniu terroryzmu; „CRBR” = Centralny Rejestr Beneficjentów Rzeczywistych; „u.s.u.s.” = ustawa z 13 października 1998 r. o systemie ubezpieczeń społecznych; „u.ś.o.z.” = ustawa z 27 sierpnia 2004 r. o świadczeniach opieki zdrowotnej finansowanych ze środków publicznych; „OP” = ustawa z 29 sierpnia 1997 r. Ordynacja podatkowa; „u.d.e.” = ustawa z 18 listopada 2020 r. o doręczeniach elektronicznych; „PKD 2025” = rozporządzenie Rady Ministrów z 18 grudnia 2024 r. w sprawie Polskiej Klasyfikacji Działalności; „S24” = zawarcie umowy przy wykorzystaniu wzorca w systemie teleinformatycznym (art. 157¹ KSH); „PRS” = Portal Rejestrów Sądowych; „KES / PZ / PO” = kwalifikowany podpis elektroniczny / podpis zaufany / podpis osobisty. W cytatach z Dz.U. półpauzę i pauzę zastąpiono dywizem, procent zapisano ze spacją („10 %”), indeksy górne zapisano znakami ¹ ² ³ (w PDF widnieją jako „1571” albo „157[1]”).

Granica skilla: skill **porządkuje decyzje wspólników przed rejestracją, prowadzi teczkę założycielską z listą pytań do zgodnej odpowiedzi, układa kalendarz obowiązków po wpisie i sprawdza wklejony projekt umowy spółki pod kątem kompletności (art. 157 KSH) i typowych pułapek**. Nie pisze umowy spółki, uchwał, umowy wspólników (inwestycyjnej) ani umów z członkami zarządu, nie wypełnia formularzy S24, PRS, NIP-8, CRBR, VAT-R ani ZUS, nie wybiera formy opodatkowania (CIT 9 %, estoński CIT tylko jako sygnał do doradcy), nie wycenia aportu, nie przesądza, czy konkretny zapis jest ważny. Sąsiedzi: kto podpisuje za spółkę, pełnomocnictwa na zgromadzenie, prokura w szczegółach i rejestr umocowań to `pelnomocnictwo-w-firmie` (gdy istnieje; dziś brak SKILL.md w katalogu, jest tylko research `testy/pelnomocnictwo-w-firmie`); cykliczne obowiązki po pierwszym roku (JPK, CIT-8, sprawozdanie co roku, ZUS co miesiąc) jako stały kalendarz to `kalendarz-obowiazkow`; konfiguracja skrzynki e-Doręczeń, administrator i osoby upoważnione to `e-doreczenia-w-firmie`; uprawnienia i procedury KSeF to `ksef-procedury`; sprawdzanie przyszłego wspólnika albo kontrahenta w rejestrach to `sprawdz-kontrahenta`; ryzyka w umowie najmu biura, umowie z dostawcą albo w umowie z członkiem zarządu jako umowie cywilnej to `czerwone-flagi-w-umowie`; streszczenie wklejonej umowy inwestycyjnej po ludzku to `co-wlasciwie-podpisuje`; wybór etat, zlecenie czy B2B dla członka zarządu albo pierwszych osób to `dzielo-zlecenie-czy-etat`; zamykanie JDG po przejściu do spółki to `zamkniecie-firmy-krok-po-kroku`.

Słownik pojęć dla skilla (ze źródeł poniżej, bez nowych tez):
- **Spółka w organizacji**: byt od zawarcia umowy spółki do wpisu do KRS (art. 161 § 1 KSH); działa pod firmą z dodatkiem „w organizacji” (art. 11 § 3).
- **Kapitał zakładowy / udział**: minimum 5 000 zł / minimum 50 zł nominalnie (art. 154 KSH).
- **Wkład pieniężny / niepieniężny (aport)**: pieniądze / rzecz albo zbywalne prawo; praca i usługi nie mogą być aportem (art. 14 § 1 KSH).
- **Udział uprzywilejowany**: szczególne prawo głosu (do 3 głosów na udział), dywidendy (do +50 %) albo przy likwidacji (art. 174, 196 KSH).
- **Prawo osobiste**: uprawnienie przyznane konkretnemu wspólnikowi w umowie (art. 159 KSH), np. prawo powoływania członka zarządu.
- **Dopłaty**: dodatkowe wpłaty wspólników do wysokości z umowy, równomierne do udziałów, nie zwiększają kapitału (art. 177-179 KSH).
- **Umorzenie udziału**: dobrowolne albo przymusowe, wyłącznie gdy umowa spółki je przewiduje (art. 199 KSH).
- **Wyłączenie wspólnika**: wyrok sądu z ważnych przyczyn na żądanie wspólników mających ponad połowę kapitału (art. 266 KSH).
- **Umowa wspólników (umowa inwestycyjna, SHA)**: osobna umowa cywilna między wspólnikami; nie jest uregulowana w KSH i nie wiąże spółki jak umowa spółki [interpretacja; brak przepisu KSH o takiej umowie].

---

## 0. Akty prawne (tekst jednolity, data stanu)

| Akt | Tekst jednolity / akt | Przepisy czytane | Zmiany po t.j. istotne dla skilla |
|---|---|---|---|
| KSH (Dz.U. 2000 poz. 1037) | **Dz.U. 2024 poz. 18** (obwieszczenie z 7.12.2023) | art. 11-14, 17, 18, 151-152, 154, 157-161, 163-167, 169, 173-183¹, 185, 187-188, 191, 193, 196-199, 201-206, 208-211, 213, 219¹-219², 227-228, 230-231, 233, 238, 242-243, 245-247, 266, 293, 299, 299¹ | **Dz.U. 2026 poz. 1440** (ogł. 2.11.2026, w życie **3.12.2026**): art. 238 § 1 (zgoda na zawiadomienia e-mailem w formie dokumentowej) i art. 243 § 2 (pełnomocnictwo na zgromadzenie w formie dokumentowej). **Dz.U. 2026 poz. 176** (od **18.02.2027**): akcje, SA i PSA, nie dotyczy sp. z o.o. (sprawdzono listę 30 zmian). 2026 poz. 187 (psychologowie) i 644 (ESAP) poza zakresem. Dz.U. 2024 poz. 96 (wyrok TK K 29/23, media publiczne) poza zakresem. **Brak zmian KSH w ustawie deregulacyjnej Dz.U. 2025 poz. 769** (KSH nie figuruje w jej spisie ustaw zmienianych) |
| KC (Dz.U. 1964 poz. 93) | **Dz.U. 2026 poz. 795** | art. 109¹-109⁷ (prokura) | bez zmian w części o prokurze (research `pelnomocnictwo-w-firmie`) |
| KRO (Dz.U. 1964 poz. 59) | **Dz.U. 2026 poz. 236** | art. 31, 33, 37 | po t.j. brak aktów zmieniających w ELI |
| u.KRS (Dz.U. 1997 poz. 769) | **Dz.U. 2025 poz. 869** | art. 6, 13, 19a, 19b, 19e, 20, 20a, 22 | **Dz.U. 2025 poz. 1556** (w życie **29.11.2025**): uchylony art. 13 (wpisy nie są już ogłaszane w MSiG), nowy art. 15; art. 1 pkt 3 i 7 (akta i wnioski tylko elektronicznie) od **1.04.2027**. 2025 poz. 1792 (REGON), 2026 poz. 119 (mObywatel), 252 (cyberbezpieczeństwo): poza zakresem. Projekt **druk nr 3004** (deregulacyjny, w komisjach) |
| u.MSiG (Dz.U. 1996 poz. 6) | **Dz.U. 2026 poz. 547** (obwieszczenie z 17.04.2026) | art. 1 ust. 3, 3a, 3b | t.j. obejmuje 2025 poz. 1556 (uchylony art. 1 ust. 3 pkt 1: wpisy do KRS) |
| UKSC (Dz.U. 2005 poz. 1398) | **Dz.U. 2025 poz. 1228** | art. 52 ust. 1-2 | po t.j.: 2025 poz. 1172, 2026 poz. 346, 473, 1003: sprawdzone, nie zmieniają art. 52 |
| u.PCC (Dz.U. 2000 poz. 959) | **Dz.U. 2026 poz. 191** (obwieszczenie z 17.02.2026, obejmuje 2025 poz. 1556) | art. 1 ust. 1 pkt 1 lit. k, ust. 3 pkt 2, ust. 5, art. 4 pkt 9, art. 6 ust. 1 pkt 8 lit. a, ust. 9, art. 7 ust. 1 pkt 9, art. 10 ust. 1-3 | **Dz.U. 2026 poz. 1354** (art. 3): zmiana art. 9 pkt 6 (kwota 1000 zł na 3000 zł, zwolnienie dla rzeczy ruchomych), poza zakresem umowy spółki |
| Taksa (Dz.U. 2004 poz. 1564) | **Dz.U. 2024 poz. 1566** | § 2-5, 7 ust. 2, 9, 13 | **Dz.U. 2026 poz. 1370** (w życie **5.11.2026**): nowy § 3 pkt 7-8 (powyżej 2 mln zł), protokół zgromadzenia wspólników 900 zł, pełnomocnictwo 100/200 zł, poświadczenie podpisu 60 zł i do 500 zł, wypisy 12/10/8 zł za stronę |
| u.o.s. (Dz.U. 2006 poz. 1635) | **Dz.U. 2026 poz. 1395** | art. 1 ust. 1 pkt 2, załącznik część IV | jak w research `pelnomocnictwo-w-firmie` |
| u.r. (Dz.U. 1994 poz. 591) | **Dz.U. 2026 poz. 522** | art. 3 ust. 1 pkt 9, art. 12 ust. 1-2, art. 52 ust. 1, art. 53 ust. 1, art. 69 ust. 1 | po t.j. 2026 poz. 640, 644, 1206 (od 11.01.2027): nie czytano pod kątem art. 3 i 12 [DO WERYFIKACJI] |
| u.CIT (Dz.U. 1992 poz. 86) | **Dz.U. 2026 poz. 554** | art. 4a pkt 10, art. 8 ust. 1-3, art. 19 ust. 1 pkt 1-2, ust. 1a-1e | art. 19 ust. 1 pkt 2 w brzmieniu z **Dz.U. 2025 poz. 1658** (od 1.01.2026). Po t.j.: 2026 poz. 779, 846, 912, 1123, 1287, 1371 (od 5.11.2026): sprawdzone wyszukiwaniem, nie zmieniają art. 8 ani 19 |
| u.VAT (Dz.U. 2004 poz. 535) | **Dz.U. 2026 poz. 1263** | art. 96 ust. 1 | KSeF: research `ksef-procedury`; 2026 poz. 1270 i 1446 poza zakresem |
| u.NIP (Dz.U. 1995 poz. 702) | **Dz.U. 2026 poz. 151** | art. 5 ust. 2a-2c, art. 6 ust. 1 | 2026 poz. 1270 (art. 2) i 1098 od 1.01.2027: nie dotyczą art. 5 ust. 2c (1270 sprawdzony; 1098 nie czytano [DO WERYFIKACJI]) |
| AML (Dz.U. 2018 poz. 723) | **Dz.U. 2025 poz. 644** | art. 58-61 | 2025 poz. 1669 zmienia tylko art. 72 (nieruchomości); 2026 poz. 875 i 1206 (od 2027) nie czytano [DO WERYFIKACJI] |
| u.s.u.s. (Dz.U. 1998 poz. 887) | **Dz.U. 2026 poz. 199** | art. 6 ust. 1 pkt 1, 4, 5, art. 8 ust. 6 pkt 4, art. 13 pkt 4a, art. 18a ust. 1, art. 36 ust. 4 | 2025 poz. 1413 (od 1.11.2026) i 2026 poz. 426, 473, 734: nie czytano pod kątem tych przepisów [DO WERYFIKACJI] |
| u.ś.o.z. (Dz.U. 2004 poz. 2135) | **Dz.U. 2025 poz. 1461** | art. 66 ust. 1 pkt 35a | liczne zmiany po t.j. (2025-2026) nie czytane pod kątem pkt 35a [DO WERYFIKACJI] |
| OP (Dz.U. 1997 poz. 926) | **Dz.U. 2026 poz. 622** | art. 116 § 1, 1a, 2 | po t.j. 2026 poz. 825, 846, 875, 1098, 1154, 1206: sprawdzone wyszukiwaniem, nie zmieniają art. 116 |
| u.d.e. (Dz.U. 2020 poz. 2320) | **Dz.U. 2026 poz. 3** | art. 9 ust. 1 pkt 8, art. 10, art. 11, art. 31 ust. 1, art. 151 ust. 1 | 2026 poz. 507 (od 14.10.2026) poza zakresem spółek z KRS |
| PKD 2025 (Dz.U. 2024 poz. 1936) | rozporządzenie bez t.j., w życie 1.01.2025 | § 1, § 2 ust. 1-3 | brak aktów zmieniających w ELI |
| Ustawa deregulacyjna (Dz.U. 2025 poz. 769) | akt zmieniający, w życie 13.07.2025 | spis 30 artykułów | zmienia m.in. u.NIP (art. 3), OP, u.s.u.s. (art. 18c), UKSC (art. 96); **nie zmienia KSH ani u.KRS** |

---

## 1. Wspólnicy, kapitał i udziały

**Kto może założyć**
- Art. 151 § 1 KSH: „Spółka z ograniczoną odpowiedzialnością może być utworzona przez jedną albo więcej osób w każdym celu prawnie dopuszczalnym, chyba że ustawa stanowi inaczej.”
- Art. 151 § 2 KSH: „Spółka z ograniczoną odpowiedzialnością nie może być zawiązana wyłącznie przez inną jednoosobową spółkę z ograniczoną odpowiedzialnością.”
- Art. 151 § 3-4 KSH: „Wspólnicy są zobowiązani jedynie do świadczeń określonych w umowie spółki.” „Wspólnicy nie odpowiadają za zobowiązania spółki.”
- Po skutku: osoba fizyczna może sama; jednoosobowa sp. z o.o. sama nie może być jedynym założycielem, ale może być wspólnikiem obok kogoś innego. Brak odpowiedzialności wspólnika za długi spółki ma wyjątki: spółka w organizacji (art. 13 § 2), wspólnik w roli członka zarządu (art. 299), nienależne wypłaty (art. 198).

**Kapitał i udział**
- Art. 154 § 1-3 KSH: „Kapitał zakładowy spółki powinien wynosić co najmniej 5000 złotych.” „Wartość nominalna udziału nie może być niższa niż 50 złotych.” „Udziały nie mogą być obejmowane poniżej ich wartości nominalnej. Jeżeli udział jest obejmowany po cenie wyższej od wartości nominalnej, nadwyżkę przelewa się do kapitału zapasowego.”
- Art. 152 KSH: „Kapitał zakładowy spółki dzieli się na udziały o równej albo nierównej wartości nominalnej.”
- Art. 157 § 1 pkt 4 KSH: umowa musi określać, „czy wspólnik może mieć więcej niż jeden udział”.
- Art. 242 § 1-2 KSH: „Na każdy udział o równej wartości nominalnej przypada jeden głos, chyba że umowa spółki stanowi inaczej.” „Jeżeli umowa spółki nie stanowi inaczej, na każde 10 złotych wartości nominalnej udziału o nierównej wysokości przypada jeden głos.”
- Po skutku: „jeden wspólnik = jeden udział” (udziały nierówne) utrudnia późniejszą sprzedaż części; art. 181 § 1 pozwala na zbycie części udziału tylko, gdy umowa to dopuszcza. Wybór „więcej niż jeden udział” i równe udziały po 50 zł albo 100 zł to częsty wybór praktyczny [PRAKTYKA].

**Wkłady**
- Art. 14 § 1 KSH: „Przedmiotem wkładu niepieniężnego do spółki z ograniczoną odpowiedzialnością, spółki akcyjnej albo przeznaczonego na kapitał akcyjny prostej spółki akcyjnej nie może być prawo niezbywalne lub świadczenie pracy bądź usług.”
- Art. 14 § 4 KSH: „Wspólnik i akcjonariusz nie może potrącać swoich wierzytelności wobec spółki kapitałowej z wierzytelnością spółki względem wspólnika z tytułu należnej wpłaty na poczet udziałów albo akcji. Nie wyłącza to potrącenia umownego.”
- Art. 158 § 1 KSH: „Jeżeli wkładem do spółki w celu pokrycia udziału ma być w całości albo w części wkład niepieniężny (aport), umowa spółki powinna szczegółowo określać przedmiot tego wkładu oraz osobę wspólnika wnoszącego aport, jak również liczbę i wartość nominalną objętych w zamian udziałów.”
- Art. 158 § 2 KSH: „Wynagrodzenia za usługi świadczone przy powstaniu spółki nie można wypłacać ze środków wpłaconych na pokrycie kapitału zakładowego, jak również zaliczać na poczet wkładu wspólnika.”
- Art. 175 § 1-2 KSH: „Jeżeli wartość wkładów niepieniężnych została znacznie zawyżona w stosunku do ich wartości zbywczej w dniu zawarcia umowy spółki, wspólnik, który wniósł taki wkład, oraz członkowie zarządu, którzy, wiedząc o tym, zgłosili spółkę do rejestru, obowiązani są solidarnie wyrównać spółce brakującą wartość.” „Od obowiązku określonego w § 1 wspólnik oraz członkowie zarządu nie mogą być zwolnieni.”
- Art. 14 § 2 KSH (wady aportu): wspólnik „jest on zobowiązany do wyrównania spółce kapitałowej różnicy między wartością przyjętą w umowie albo statucie spółki a zbywczą wartością wkładu”.
- Po skutku: „wkład pracy” wspólnika nie pokryje udziału. Jeśli jeden daje pieniądze, a drugi pracę, trzeba to rozwiązać inaczej: obaj obejmują udziały za gotówkę, a praca jest wynagradzana albo rozliczana umową wspólników, vestingiem czy powtarzającymi się świadczeniami (art. 176) [interpretacja]. Aport (laptop, domena, znak towarowy, przedsiębiorstwo JDG) wymaga notariusza (zob. S24 niżej), opisu w umowie i realnej wyceny; zawyżenie obciąża wnoszącego i świadomy zarząd solidarnie, bez możliwości zwolnienia.

**Szczególne korzyści, obowiązki, uprzywilejowanie**
- Art. 159 KSH: „Jeżeli wspólnikowi mają być przyznane szczególne korzyści lub jeżeli na wspólników mają być nałożone, oprócz wniesienia wkładów na pokrycie udziałów, inne obowiązki wobec spółki, należy to pod rygorem bezskuteczności wobec spółki dokładnie określić w umowie spółki.”
- Art. 174 § 1-4 KSH: „Jeżeli ustawa lub umowa spółki nie stanowi inaczej, wspólnicy mają równe prawa i obowiązki w spółce.” (...) „Uprzywilejowanie może dotyczyć w szczególności prawa głosu, prawa do dywidendy lub sposobu uczestniczenia w podziale majątku w przypadku likwidacji spółki. Uprzywilejowanie w zakresie prawa głosu może dotyczyć tylko udziałów o równej wartości nominalnej.” „Uprzywilejowanie dotyczące prawa głosu nie może przyznawać uprawnionemu więcej niż trzy głosy na jeden udział.”
- Art. 196 KSH: dywidenda uprzywilejowana „przewyższa nie więcej niż o połowę dywidendę przysługującą udziałom nieuprzywilejowanym”.
- Art. 176 § 1 KSH: „Jeżeli wspólnik ma być zobowiązany do powtarzających się świadczeń niepieniężnych, w umowie spółki należy oznaczyć rodzaj i zakres takich świadczeń.” § 2: wynagrodzenie za nie wypłaca się „także w przypadku, gdy sprawozdanie finansowe nie wykazuje zysku”, nie wyżej niż ceny rynkowe; § 3: zbycie udziału wtedy wymaga zgody spółki, „chyba że umowa spółki stanowi inaczej”.
- Art. 191 § 2-3 KSH: „Umowa spółki może przewidywać inny sposób podziału zysku, z uwzględnieniem przepisów art. 192-197.” „Jeżeli umowa spółki nie stanowi inaczej, zysk przypadający wspólnikom dzieli się w stosunku do udziałów.”
- Po skutku: wszystko, co ma odbiegać od równości (więcej głosów, prawo powołania prezesa, inny podział zysku, obowiązek pracy na rzecz spółki), musi być w umowie spółki; zapis tylko w umowie wspólników nie działa wobec spółki (art. 159) [interpretacja co do umowy wspólników].

**Spółka jednoosobowa**
- Art. 173 § 1 KSH: „W przypadku gdy wszystkie udziały spółki przysługują jedynemu wspólnikowi albo jedynemu wspólnikowi i spółce, oświadczenie woli takiego wspólnika składane spółce wymaga formy pisemnej pod rygorem nieważności, chyba że ustawa stanowi inaczej.”
- Art. 166 § 2 KSH: zgłoszenie spółki jednoosobowej zawiera dane jedynego wspólnika „a także wzmiankę, że jest on jedynym wspólnikiem spółki”.
- Art. 210 § 2 KSH (jedyny wspólnik i jedyny członek zarządu): „Czynność prawna między tym wspólnikiem a reprezentowaną przez niego spółką wymaga formy aktu notarialnego. O każdorazowym dokonaniu takiej czynności prawnej notariusz zawiadamia sąd rejestrowy za pośrednictwem systemu teleinformatycznego.” § 3: wymogu aktu nie stosuje się do czynności na wzorcu w systemie teleinformatycznym.
- Po skutku: jedyny wspólnik będący jedynym członkiem zarządu każdą umowę ze sobą (pożyczka, najem lokalu od siebie, sprzedaż auta) zawiera u notariusza. To mocny argument za drugim członkiem zarządu albo innym układem [interpretacja].

---

## 2. Zawarcie umowy: S24 albo notariusz, spółka w organizacji

**Forma i treść**
- Art. 157 § 1 KSH: „Umowa spółki z ograniczoną odpowiedzialnością powinna określać: 1) firmę i siedzibę spółki; 2) przedmiot działalności spółki; 3) wysokość kapitału zakładowego; 4) czy wspólnik może mieć więcej niż jeden udział; 5) liczbę i wartość nominalną udziałów objętych przez poszczególnych wspólników; 6) czas trwania spółki, jeżeli jest oznaczony.”
- Art. 157 § 2 KSH: „Umowa spółki z ograniczoną odpowiedzialnością powinna być zawarta w formie aktu notarialnego.”
- Art. 157¹ § 1-3 KSH: „Umowa spółki z ograniczoną odpowiedzialnością może być zawarta również przy wykorzystaniu wzorca umowy.” „Zawarcie umowy (...) przy wykorzystaniu wzorca umowy wymaga wypełnienia formularza umowy udostępnionego w systemie teleinformatycznym i opatrzenia umowy kwalifikowanym podpisem elektronicznym, podpisem zaufanym albo podpisem osobistym.” „Umowa (...) zawarta jest po wprowadzeniu do systemu teleinformatycznego wszystkich danych koniecznych do jej zawarcia i z chwilą opatrzenia ich podpisem elektronicznym.”
- Treść wzorca S24 (które postanowienia są do wyboru, a których nie ma: np. umorzenie, dopłaty, uprzywilejowanie) określa rozporządzenie MS wydane na podstawie art. 157¹ § 5 KSH [NIEOTWARTE]. Skill nie powinien twierdzić, co dokładnie zawiera wzorzec; ma pytać, czy wspólnicy potrzebują postanowień spoza wzorca.

**S24: tylko gotówka, krótkie terminy**
- Art. 158 § 1¹ KSH: „W przypadku spółki, której umowę zawarto przy wykorzystaniu wzorca umowy, na pokrycie kapitału zakładowego wnosi się wyłącznie wkłady pieniężne. Pokrycie kapitału zakładowego powinno nastąpić nie później niż w terminie siedmiu dni od dnia jej wpisu do rejestru.”
- Art. 167 § 5 KSH: zarząd spółki S24 „w terminie siedmiu dni od dnia jej wpisu do rejestru, składa do sądu rejestrowego: 1) oświadczenie wszystkich członków zarządu, że wkłady pieniężne na pokrycie kapitału zakładowego zostały przez wszystkich wspólników w całości wniesione, jeżeli oświadczenie takie nie zostało dołączone do zgłoszenia spółki.”
- Art. 169 § 1-2 KSH: „Jeżeli zawiązanie spółki nie zostało zgłoszone do sądu rejestrowego w terminie sześciu miesięcy od dnia zawarcia umowy spółki albo jeżeli postanowienie sądu odmawiające zarejestrowania stało się prawomocne, umowa spółki ulega rozwiązaniu.” „W przypadku spółki, której umowa została zawarta przy wykorzystaniu wzorca umowy, termin, o którym mowa w § 1, wynosi 7 dni.”
- Art. 206 § 1 pkt 4 KSH: spółka S24 na pismach i stronie podaje kapitał, „a dla spółki, której umowę zawarto przy wykorzystaniu wzorca umowy, do czasu pokrycia kapitału zakładowego, także informację, że wymagane wkłady na kapitał zakładowy nie zostały wniesione”.
- Art. 20a ust. 2 u.KRS: „Wniosek o wpis spółki, której umowa została zawarta przy wykorzystaniu wzorca umowy udostępnionego w systemie teleinformatycznym, sąd rejestrowy rozpoznaje w terminie jednego dnia od daty jego wpływu.” Ust. 1: zwykły wniosek „nie później niż w terminie 7 dni od daty jego wpływu do sądu”. Ust. 3: przy wezwaniu do usunięcia przeszkody 7 dni od jej usunięcia.
- Art. 158 § 1² KSH: podwyższenie kapitału w spółce S24 aportem możliwe, jeśli zmiany umowy dokonano „w formie aktu notarialnego”.
- Art. 161 § 4 KSH: „Zmiana umowy spółki z ograniczoną odpowiedzialnością w organizacji wymaga zawarcia umowy przez wspólników. Przepisu nie stosuje się do umowy spółki z ograniczoną odpowiedzialnością zawartej zgodnie z art. 157¹.”
- Po skutku: w S24 są **dwa terminy po 7 dni**: na zgłoszenie do sądu od podpisania umowy (inaczej umowa się rozwiązuje) i na wpłatę kapitału oraz oświadczenie zarządu od wpisu. Aport przy zakładaniu przez S24 jest niemożliwy. Sąd ma 1 dzień, ale to termin instrukcyjny; realny czas zależy od braków [interpretacja, brak danych statystycznych].

**Notariusz**
- Art. 167 § 1-2 KSH: do zgłoszenia dołącza się umowę, oświadczenie wszystkich członków zarządu, „że wkłady zostały wniesione w całości przez wszystkich wspólników”, dowód powołania organów (gdy nie ma go w akcie) i listę wspólników podpisaną przez wszystkich członków zarządu.
- Art. 163 KSH: do powstania spółki potrzebne są: umowa, wniesienie wkładów na cały kapitał (z wyjątkiem S24, art. 158 § 1¹), powołanie zarządu, rada nadzorcza lub komisja rewizyjna, gdy wymaga tego ustawa lub umowa, i wpis do rejestru.
- Po skutku: przy notariuszu kapitał wnosi się **przed** zgłoszeniem (oświadczenie zarządu jest załącznikiem); zarząd, który składa nieprawdziwe oświadczenie, ryzykuje odpowiedzialność [interpretacja; przepisów karnych KSH nie czytano w tym researchu].
- Sposób złożenia wniosku przy umowie notarialnej: zarząd składa wniosek przez PRS, a akt jest w Centralnym Repozytorium Elektronicznych Wypisów Aktów Notarialnych (art. 19e ust. 4 u.KRS wspomina Repozytorium) [DO WERYFIKACJI: przebieg praktyczny i ewentualna rola notariusza].

**Kto składa i co dołącza**
- Art. 164 § 1 KSH: „Zarząd zgłasza zawiązanie spółki do sądu rejestrowego właściwego ze względu na siedzibę spółki w celu wpisania spółki do rejestru. Wniosek o wpis spółki do rejestru podpisują wszyscy członkowie zarządu.”
- Art. 19a ust. 5 u.KRS: do wniosku o wpis członków zarządu i prokurentów dołącza się „oświadczenia tych osób obejmujące zgodę na ich powołanie oraz ich adresy do doręczeń”; zgody nie trzeba, gdy wniosek podpisuje sama ta osoba albo zgoda jest w protokole lub umowie spółki.
- Art. 19a ust. 5d u.KRS: „Do zgłoszenia spółki kapitałowej do Rejestru należy dołączyć listę obejmującą nazwisko i imię oraz adres do doręczeń albo firmę lub nazwę i siedzibę członków organów lub osób uprawnionych do powołania zarządu.” Gdy wspólnikiem jest osoba prawna, podaje się też członków jej organu reprezentującego.
- Art. 19b u.KRS: spółka w organizacji „we wniosku o wpis do Rejestru zamieszczają informację, że nie wystąpiły o uzyskanie NIP lub numeru identyfikacyjnego REGON, chyba że zgłaszają je do Rejestru”.
- Art. 22 u.KRS: zmiany po wpisie zgłasza się „nie później niż w terminie 7 dni od dnia zdarzenia uzasadniającego dokonanie wpisu, chyba że przepis szczególny stanowi inaczej”.

**Spółka w organizacji**
- Art. 161 § 1-2 KSH: „Z chwilą zawarcia umowy spółki z ograniczoną odpowiedzialnością powstaje spółka z ograniczoną odpowiedzialnością w organizacji.” „Spółka w organizacji jest reprezentowana przez zarząd albo pełnomocnika powołanego jednomyślną uchwałą wspólników.”
- Art. 11 § 1, 3 KSH: spółki kapitałowe w organizacji „mogą we własnym imieniu nabywać prawa, w tym własność nieruchomości i inne prawa rzeczowe, zaciągać zobowiązania, pozywać i być pozywane”; „Firma spółki kapitałowej w organizacji powinna zawierać dodatkowe oznaczenie »w organizacji«.”
- Art. 13 § 1-2 KSH: „Za zobowiązania spółki kapitałowej w organizacji odpowiadają solidarnie spółka i osoby, które działały w jej imieniu.” „Wspólnik albo akcjonariusz spółki kapitałowej w organizacji odpowiada solidarnie z podmiotami, o których mowa w § 1, za jej zobowiązania do wartości niewniesionego wkładu na pokrycie objętych udziałów lub akcji.”
- Art. 161 § 3 KSH: odpowiedzialność tych osób „ustaje wobec spółki z chwilą zatwierdzenia ich czynności przez zgromadzenie wspólników”.
- Art. 12 KSH: z chwilą wpisu spółka w organizacji „staje się spółką z ograniczoną odpowiedzialnością (...) i uzyskuje osobowość prawną. Z tą chwilą staje się ona podmiotem praw i obowiązków spółki w organizacji.”
- Po skutku: przed wpisem umowy (najem, leasing, zatrudnienie) podpisuje się jako spółka „w organizacji”, a kto je podpisuje, odpowiada osobiście solidarnie ze spółką. Zatwierdzenie przez zgromadzenie zwalnia wobec spółki, nie wobec wierzyciela [interpretacja art. 161 § 3: „wobec spółki”].

---

## 3. Zbywanie udziałów, śmierć, małżonkowie, dopłaty, umorzenie, wyjście

**Zbycie udziałów**
- Art. 180 § 1 KSH: „Zbycie udziału, jego części lub ułamkowej części udziału oraz jego zastawienie powinno być dokonane w formie pisemnej z podpisami notarialnie poświadczonymi.” § 2: w spółce S24 zbycie możliwe także na wzorcu w systemie z KES, PZ albo PO.
- Art. 182 § 1-3 KSH: „Zbycie udziału, jego części lub ułamkowej części udziału oraz zastawienie udziału umowa spółki może uzależnić od zgody spółki albo w inny sposób ograniczyć.” Gdy wymagana jest zgoda: „Zgody udziela zarząd w formie pisemnej. W przypadku gdy zgody odmówiono, sąd rejestrowy może pozwolić na zbycie, jeżeli istnieją ważne powody.” (§ 4-5: spółka może wskazać innego nabywcę, cenę ustala sąd).
- Art. 185 § 1 KSH: przy egzekucji z udziału z ograniczoną zbywalnością spółka może wskazać nabywcę za cenę ustaloną przez sąd rejestrowy.
- Art. 187 § 1 KSH: przejście udziału „jest skuteczne wobec spółki od chwili, gdy spółka otrzyma od jednego z zainteresowanych zawiadomienie o tym wraz z dowodem dokonania czynności”.
- Po skutku: bez zapisu w umowie spółki udział jest swobodnie zbywalny, także konkurentowi. Prawo pierwszeństwa, prawo pierwokupu, „tag-along” i „drag-along” KSH nie nazywa; art. 182 § 1 („w inny sposób ograniczyć”) jest podstawą do ograniczeń w umowie spółki, a reszta trafia do umowy wspólników [interpretacja]. Ograniczenie wymaga zgody spółki = zarządu (art. 182 § 3), co w małej spółce oznacza, że decyduje ten, kto jest w zarządzie, chyba że umowa wskaże zgromadzenie [interpretacja].

**Śmierć wspólnika**
- Art. 183 § 1-3 KSH: „Umowa spółki może ograniczyć lub wyłączyć wstąpienie do spółki spadkobierców na miejsce zmarłego wspólnika. W tym przypadku umowa spółki powinna określać warunki spłaty spadkobierców niewstępujących do spółki, pod rygorem bezskuteczności ograniczenia lub wyłączenia.” (§ 2-3: podział udziałów między spadkobierców może być wyłączony lub ograniczony; nie mogą powstać udziały niższe niż 50 zł).
- Po skutku: domyślnie spadkobiercy wchodzą do spółki. Wyłączenie bez warunków spłaty jest bezskuteczne. To jedno z pytań obowiązkowych w teczce.

**Małżonkowie**
- Art. 183¹ KSH: „Umowa spółki może ograniczyć lub wyłączyć wstąpienie do spółki współmałżonka wspólnika w przypadku, gdy udział lub udziały są objęte wspólnością majątkową małżeńską.”
- Art. 31 § 1 KRO: wspólność obejmuje „przedmioty majątkowe nabyte w czasie jej trwania przez oboje małżonków lub przez jednego z nich (majątek wspólny)”. Art. 33 pkt 10 KRO: do majątku osobistego należą przedmioty „nabyte w zamian za składniki majątku osobistego, chyba że przepis szczególny stanowi inaczej”.
- Art. 37 § 1 pkt 3 KRO: zgoda drugiego małżonka jest potrzebna m.in. do „czynności prawnej prowadzącej do zbycia, obciążenia, odpłatnego nabycia i wydzierżawienia gospodarstwa rolnego lub przedsiębiorstwa”; objęcie udziałów nie jest tam wymienione [interpretacja: brak wymogu zgody wprost w art. 37 KRO].
- SN, postanowienie z 3.12.2009, II CSK 273/09 (SAOS 91387, otwarte): „udziały nabyte przez jednego małżonka ze środków pochodzących z majątku wspólnego wchodzą w skład tego majątku, a wspólnikiem staje się tylko małżonek będący stroną czynności prowadzącej do nabycia udziałów”.
- SN, uchwała z 13.03.2008, III CZP 9/08 (SAOS 87594, otwarta), pkt 2: „Wartość nakładu z majątku wspólnego małżonków na nabycie należącego do jednego z nich udziału w spółce z ograniczoną odpowiedzialnością ustala się według ceny rynkowej tego udziału.”
- SN, postanowienie z 31.01.2013, II CSK 349/12 (SAOS 100497, otwarte): udziały należące do majątku wspólnego „co do zasady mogą być podzielone pomiędzy byłych małżonków, a więc także przypaść temu z współuprawnionych, który nie był wspólnikiem”.
- Po skutku: udziały kupione z pieniędzy wspólnych zwykle są w majątku wspólnym, choć wspólnikiem jest tylko ten, kto podpisał; przy rozwodzie albo śmierci współmałżonek (albo jego spadkobiercy) może sięgać po udziały, a art. 183¹ pozwala to ograniczyć w umowie spółki. Rozdzielność majątkowa, majątek osobisty i rozliczenie przy podziale majątku to pytania do prawnika [interpretacja].

**Dopłaty**
- Art. 177 § 1-2 KSH: „Umowa spółki może zobowiązywać wspólników do dopłat w granicach liczbowo oznaczonej wysokości w stosunku do udziału.” „Dopłaty powinny być nakładane i uiszczane przez wspólników równomiernie w stosunku do ich udziałów.”
- Art. 178 § 1 KSH: „Wysokość i terminy dopłat oznaczane są w miarę potrzeby uchwałą wspólników.” Art. 179 § 1: dopłaty „mogą być zwracane wspólnikom, jeżeli nie są wymagane na pokrycie straty wykazanej w sprawozdaniu finansowym”.
- SN, uchwała z 12.01.2010, III CZP 117/09 (SAOS 91622, otwarta): „Wspólnik spółki z ograniczoną odpowiedzialnością może potrącić swoją wierzytelność wobec spółki z wierzytelności spółki względem wspólnika z tytułu dopłat.”
- Art. 1 ust. 3 pkt 2 u.PCC: przy spółce kapitałowej za zmianę umowy uważa się m.in. „dopłaty” (podatek 0,5 % od kwoty dopłat, art. 6 ust. 1 pkt 8 lit. c).
- Po skutku: bez zapisu w umowie spółki nikogo nie da się zmusić do dopłat; zapis musi mieć górną granicę.

**Umorzenie**
- Art. 199 § 1 KSH: „Udział może być umorzony jedynie po wpisie spółki do rejestru i tylko w przypadku, gdy umowa spółki tak stanowi. Udział może być umorzony za zgodą wspólnika w drodze nabycia udziału przez spółkę (umorzenie dobrowolne) albo bez zgody wspólnika (umorzenie przymusowe). Przesłanki i tryb przymusowego umorzenia określa umowa spółki.”
- Art. 199 § 2 KSH: wynagrodzenie przy umorzeniu przymusowym „nie może być niższe od wartości przypadających na udział aktywów netto, wykazanych w sprawozdaniu finansowym za ostatni rok obrotowy, pomniejszonych o kwotę przeznaczoną do podziału między wspólników”; uchwała o umorzeniu przymusowym zawiera uzasadnienie.
- Art. 199 § 4 KSH: „Umowa spółki może stanowić, że udział ulega umorzeniu w razie ziszczenia się określonego zdarzenia bez powzięcia uchwały zgromadzenia wspólników.”
- Po skutku: umorzenie to główne narzędzie „wyjścia” albo usunięcia biernego wspólnika, ale działa tylko, jeśli umowa spółki z góry określa przesłanki. Dopisanie go później wymaga zmiany umowy (art. 246), a gdy uszczupla prawa wspólnika, jego zgody (art. 246 § 3).

**Wyłączenie wspólnika**
- Art. 266 § 1 KSH: „Z ważnych przyczyn dotyczących danego wspólnika sąd może orzec jego wyłączenie ze spółki na żądanie wszystkich pozostałych wspólników, jeżeli udziały wspólników żądających wyłączenia stanowią więcej niż połowę kapitału zakładowego.” § 3: udziały wyłączonego przejmują wspólnicy lub osoby trzecie; „Cenę przejęcia ustala sąd na podstawie rzeczywistej wartości w dniu doręczenia pozwu.”
- Po skutku: w spółce 50/50 żaden wspólnik nie wyłączy drugiego (potrzeba „więcej niż połowy”). Art. 266 § 2 pozwala w umowie dać to prawo mniejszej liczbie wspólników, ale nadal z większością kapitału. Spółka 50/50 bez mechanizmu wyjścia w umowie to klasyczny pat [interpretacja].

---

## 4. Zarząd, reprezentacja, prokura

- Art. 201 § 1-5 KSH: zarząd prowadzi sprawy i reprezentuje spółkę; „składa się z jednego albo większej liczby członków”; „Do zarządu mogą być powołane osoby spośród wspólników lub spoza ich grona.”; „Członek zarządu jest powoływany i odwoływany uchwałą wspólników, chyba że umowa spółki stanowi inaczej.”
- Art. 202 § 1 KSH: „Jeżeli umowa spółki nie stanowi inaczej, mandat członka zarządu wygasa z dniem odbycia zgromadzenia wspólników zatwierdzającego sprawozdanie finansowe za pierwszy pełny rok obrotowy pełnienia funkcji członka zarządu.” § 2: przy powołaniu na dłużej niż rok kadencję liczy się „w pełnych latach obrotowych, chyba że umowa spółki stanowi inaczej”.
- SN, uchwała z 21.07.2010, III CZP 23/10 (SAOS 92696, otwarta): „Jeżeli umowa spółki nie stanowi inaczej, mandat członka zarządu wygasa w terminie przewidzianym w art. 202 § 1 k.s.h. także wtedy, gdy według uchwały wspólników powołanie nastąpiło na czas nieokreślony.”
- Art. 203 § 1-2 KSH: członek zarządu „może być w każdym czasie odwołany uchwałą wspólników. Nie pozbawia go to roszczeń ze stosunku pracy lub innego stosunku prawnego dotyczącego pełnienia funkcji członka zarządu.”; umowa może ograniczyć odwołanie „do ważnych powodów”.
- Art. 202 § 5-6 KSH: do rezygnacji stosuje się przepisy o wypowiedzeniu zlecenia; jeśli po rezygnacji żaden mandat nie byłby obsadzony, rezygnację składa się wspólnikom, zwołując zgromadzenie, i jest skuteczna „z dniem następującym po dniu, na który zwołano zgromadzenie wspólników”.
- SN (7 sędziów), uchwała z 31.03.2016, III CZP 89/15 (SAOS 244997, otwarta): „Oświadczenie członka zarządu spółki kapitałowej o rezygnacji z tej funkcji jest składane - z wyjątkiem przewidzianym w art. 210 § 2 i art. 379 § 2 k.s.h. - spółce reprezentowanej w tym zakresie zgodnie z art. 205 § 2 lub 373 § 2 k.s.h.”
- Art. 204 § 1-2 KSH: prawo członka zarządu do reprezentacji „dotyczy wszystkich czynności sądowych i pozasądowych spółki” i nie można go ograniczyć „ze skutkiem prawnym wobec osób trzecich”.
- Art. 205 § 1 KSH: „Jeżeli zarząd jest wieloosobowy, sposób reprezentowania określa umowa spółki. Jeżeli umowa spółki nie zawiera żadnych postanowień w tym przedmiocie, do składania oświadczeń w imieniu spółki wymagane jest współdziałanie dwóch członków zarządu albo jednego członka zarządu łącznie z prokurentem.” § 2: oświadczenia i doręczenia wobec spółki można kierować do jednego członka zarządu lub prokurenta.
- Art. 208 § 4-6, 8 KSH: sprawy przekraczające zwykłe czynności i sprawy, którym sprzeciwił się choć jeden członek, wymagają uchwały zarządu; uchwały zapadają bezwzględną większością; „Powołanie prokurenta wymaga zgody wszystkich członków zarządu.” „Odwołać prokurę może każdy członek zarządu.”; umowa może przyznać głos rozstrzygający prezesowi przy równości głosów.
- Art. 109⁴ § 1¹ KC: „Prokura może obejmować umocowanie także albo wyłącznie do dokonywania czynności wspólnie z członkiem organu zarządzającego lub wspólnikiem uprawnionym do reprezentowania handlowej spółki osobowej.”
- Art. 209 KSH: przy sprzeczności interesów członek zarządu „powinien ujawnić sprzeczność interesów i wstrzymać się od udziału w rozstrzyganiu takich spraw”.
- Art. 210 § 1 KSH: „W umowie między spółką a członkiem zarządu oraz w sporze z nim spółkę reprezentuje rada nadzorcza lub pełnomocnik powołany uchwałą zgromadzenia wspólników.” (§ 1¹: w S24 uchwała o takim pełnomocniku może być na wzorcu).
- Art. 211 § 1-2 KSH: „Członek zarządu nie może bez zgody spółki zajmować się interesami konkurencyjnymi ani też uczestniczyć w spółce konkurencyjnej jako wspólnik spółki cywilnej, spółki osobowej lub jako członek organu spółki kapitałowej bądź uczestniczyć w innej konkurencyjnej osobie prawnej jako członek organu. Zakaz ten obejmuje także udział w konkurencyjnej spółce kapitałowej w przypadku posiadania przez członka zarządu co najmniej 10 % udziałów lub akcji tej spółki albo prawa do powołania co najmniej jednego członka zarządu.” „Jeżeli umowa spółki nie stanowi inaczej, zgody udziela organ uprawniony do powołania zarządu.”
- Art. 18 § 1-3 KSH: członkiem zarządu, rady nadzorczej, komisji rewizyjnej, likwidatorem „może być tylko osoba fizyczna mająca pełną zdolność do czynności prawnych”; nie może nim być ani prokurentem osoba „skazana prawomocnym wyrokiem za przestępstwo określone w art. 587-587², art. 590 i art. 591 ustawy oraz art. 228-231 i rozdziałach XXXIII-XXXVII ustawy z dnia 6 czerwca 1997 r. - Kodeks karny”; zakaz ustaje „z upływem piątego roku od dnia uprawomocnienia się wyroku skazującego, chyba że wcześniej nastąpiło zatarcie skazania”.
- Po skutku: (1) bez zapisu o reprezentacji dwuosobowy zarząd podpisuje tylko razem; (2) „na czas nieokreślony” w uchwale nie przedłuża mandatu; przy domyślnej regule mandat pierwszego zarządu wygasa po zgromadzeniu za pierwszy pełny rok obrotowy i łatwo to przeoczyć; (3) zakaz konkurencji z art. 211 dotyczy członków zarządu, **nie wspólników**: zakaz konkurencji wspólników trzeba ustanowić w umowie spółki (art. 159) albo w umowie wspólników [interpretacja]; (4) umowę o pracę albo kontrakt z członkiem zarządu podpisuje za spółkę pełnomocnik zgromadzenia albo rada nadzorcza, nie drugi członek zarządu.

---

## 5. Odpowiedzialność zarządu i ochrona kapitału

- Art. 299 § 1 KSH: „Jeżeli egzekucja przeciwko spółce okaże się bezskuteczna, członkowie zarządu odpowiadają solidarnie za jej zobowiązania.”
- Art. 299 § 2 KSH: członek zarządu uwalnia się, gdy wykaże, „że we właściwym czasie zgłoszono wniosek o ogłoszenie upadłości lub w tym samym czasie wydano postanowienie o otwarciu postępowania restrukturyzacyjnego albo o zatwierdzeniu układu w postępowaniu w przedmiocie zatwierdzenia układu, albo że niezgłoszenie wniosku o ogłoszenie upadłości nastąpiło nie z jego winy, albo że pomimo niezgłoszenia wniosku (...) wierzyciel nie poniósł szkody”.
- Odnośnik 12 do art. 299 w t.j.: przepis uznany za niezgodny z Konstytucją z dniem 19.04.2023 „w zakresie, w jakim nie przewiduje możliwości, aby pozwany były członek zarządu spółki z ograniczoną odpowiedzialnością uwolnił się od odpowiedzialności poprzez wykazanie, że wierzytelność, stwierdzona orzeczeniem, na podstawie którego wszczęto przeciwko spółce bezskuteczną egzekucję, nie istnieje, w sytuacji, w której orzeczenie zapadło w postępowaniu wszczętym po dacie utraty przez pozwanego statusu członka zarządu spółki” (wyrok TK z 12.04.2023, P 5/19, Dz.U. 2023 poz. 739).
- SN, uchwała z 17.02.2011, III CZP 129/10 (SAOS 94249, otwarta): członek zarządu pozwany z art. 299 § 1 „może bronić się zarzutem, że objęta tytułem wykonawczym wierzytelność uległa umorzeniu na skutek potrącenia z wierzytelności powoda, dokonanego po powstaniu tego tytułu”.
- Art. 116 § 1 OP: „Za zaległości podatkowe spółki z ograniczoną odpowiedzialnością, spółki z ograniczoną odpowiedzialnością w organizacji (...) odpowiadają solidarnie całym swoim majątkiem członkowie jej zarządu, jeżeli egzekucja z majątku spółki okazała się w całości lub w części bezskuteczna, a członek zarządu: 1) nie wykazał, że: a) we właściwym czasie zgłoszono wniosek o ogłoszenie upadłości lub w tym czasie zostało otwarte postępowanie restrukturyzacyjne (...) albo zatwierdzono układ (...), albo b) niezgłoszenie wniosku o ogłoszenie upadłości nastąpiło bez jego winy; 2) nie wskazuje mienia spółki, z którego egzekucja umożliwi zaspokojenie zaległości podatkowych spółki w znacznej części.”
- Art. 116 § 2 OP: odpowiedzialność obejmuje zaległości z zobowiązań, „których termin płatności upływał w czasie pełnienia przez nich obowiązków członka zarządu”.
- SN, uchwała z 4.12.2008, II UZP 6/08 (SAOS 89311, otwarta): przeniesienie odpowiedzialności za składki na członków zarządu sp. z o.o. „jest możliwe także po utracie bytu prawnego przez spółkę wskutek ukończenia postępowania upadłościowego i wykreślenia tego podmiotu z Krajowego Rejestru Sądowego (art. 116 (...) Ordynacja podatkowa)”.
- Art. 293 § 1, 3 KSH: odpowiedzialność wobec spółki za szkodę z działania sprzecznego z prawem lub umową, chyba że brak winy; członek zarządu nie narusza staranności, „jeżeli postępując w sposób lojalny wobec spółki, działa w granicach uzasadnionego ryzyka gospodarczego, w tym na podstawie informacji, analiz i opinii, które powinny być w danych okolicznościach uwzględnione przy dokonywaniu starannej oceny”.
- Art. 230 KSH: „Rozporządzenie prawem lub zaciągnięcie zobowiązania do świadczenia o wartości dwukrotnie przewyższającej wysokość kapitału zakładowego wymaga uchwały wspólników, chyba że umowa spółki stanowi inaczej. Przepisu art. 17 § 1 nie stosuje się.”
- Art. 17 § 1, 3 KSH: czynność bez uchwały wymaganej przez ustawę „jest nieważna”; bez zgody wymaganej wyłącznie przez umowę spółki „jest ważna, jednakże nie wyklucza to odpowiedzialności członków zarządu wobec spółki”.
- Art. 233 § 1 KSH: gdy bilans wykaże stratę przewyższającą sumę kapitałów zapasowego i rezerwowych „oraz połowę kapitału zakładowego”, zarząd „jest obowiązany niezwłocznie zwołać zgromadzenie wspólników w celu powzięcia uchwały dotyczącej dalszego istnienia spółki”.
- Art. 198 § 1 KSH: wspólnik, który wbrew prawu lub umowie otrzymał wypłatę, „obowiązany jest do jej zwrotu”, a odpowiedzialni członkowie organów odpowiadają solidarnie.
- Po skutku: przy kapitale 5 000 zł próg art. 230 to 10 000 zł, więc pierwsza większa umowa (leasing, najem na kilka lat) formalnie wymaga uchwały wspólników, chyba że umowa spółki to wyłącza; warto o tym zdecydować przed rejestracją [interpretacja co do wartości umów wieloletnich: DO WERYFIKACJI]. Członek zarządu ryzykuje własnym majątkiem za długi i podatki spółki przy bezskutecznej egzekucji; ochroną jest pilnowanie momentu niewypłacalności i wniosku o upadłość (szczegóły poza skillem).

---

## 6. Nadzór, zgromadzenie, głosowanie, impas

- Art. 213 § 1-2 KSH: „Umowa spółki może ustanowić radę nadzorczą lub komisję rewizyjną albo oba te organy.” „W spółkach, w których kapitał zakładowy przewyższa kwotę 500 000 złotych, a wspólników jest więcej niż dwudziestu pięciu, powinna być ustanowiona rada nadzorcza lub komisja rewizyjna.” § 3: przy radzie lub komisji umowa może wyłączyć albo ograniczyć indywidualną kontrolę wspólników.
- Art. 219² § 1 KSH: „Jeżeli umowa spółki tak stanowi, rada nadzorcza może podjąć uchwałę w sprawie zbadania na koszt spółki określonej sprawy dotyczącej działalności spółki lub jej majątku przez wybranego doradcę (doradca rady nadzorczej).” (art. 219¹: komitety rady).
- Art. 227 § 1-2 KSH: uchwały na zgromadzeniu; „Bez odbycia zgromadzenia wspólników mogą być powzięte uchwały, jeżeli wszyscy wspólnicy wyrażą na piśmie zgodę na postanowienie, które ma być powzięte, albo na głosowanie pisemne.”
- Art. 228 KSH: uchwały wymaga m.in. zatwierdzenie sprawozdań i absolutorium, zbycie przedsiębiorstwa, „nabycie i zbycie nieruchomości, użytkowania wieczystego lub udziału w nieruchomości, jeżeli umowa spółki nie stanowi inaczej”, zwrot dopłat.
- Art. 231 § 1 KSH: „Zwyczajne zgromadzenie wspólników powinno odbyć się w terminie sześciu miesięcy po upływie każdego roku obrotowego.”
- Art. 245 KSH: „Uchwały zapadają bezwzględną większością głosów, jeżeli przepisy niniejszego działu lub umowa spółki nie stanowią inaczej.”
- Art. 246 § 1, 3 KSH: zmiana umowy, rozwiązanie spółki, zbycie przedsiębiorstwa: „większością dwóch trzecich głosów”; istotna zmiana przedmiotu działalności: „większości trzech czwartych głosów”; „Uchwała dotycząca zmiany umowy spółki, zwiększająca świadczenia wspólników lub uszczuplająca prawa udziałowe bądź prawa przyznane osobiście poszczególnym wspólnikom, wymaga zgody wszystkich wspólników, których dotyczy.”
- Art. 238 § 1 KSH (do 2.12.2026): zgromadzenie zwołuje się listem poleconym lub kurierem co najmniej dwa tygodnie przed terminem; zamiast tego na ADE albo e-mail, „jeżeli uprzednio wyraził na to pisemną zgodę”. **Od 3.12.2026** (Dz.U. 2026 poz. 1440 art. 1 pkt 1): „jeżeli uprzednio wyraził na to zgodę w formie dokumentowej, podając adres, na który zawiadomienie powinno być wysłane. Umowa spółki może przewidywać surowsze warunki udzielenia zgody.” Zgody sprzed 3.12.2026 ocenia się według przepisów dotychczasowych (art. 3 ust. 1 tej ustawy).
- Art. 243 § 2 KSH: dziś pełnomocnictwo na zgromadzenie „na piśmie pod rygorem nieważności”; **od 3.12.2026**: „Pełnomocnictwo powinno być udzielone w formie dokumentowej, chyba że umowa spółki przewiduje surowsze wymogi jego udzielenia.” § 3 bez zmian: „Członek zarządu i pracownik spółki nie mogą być pełnomocnikami na zgromadzeniu wspólników.”
- Po skutku: (1) rada nadzorcza w typowej małej spółce nie jest obowiązkowa (oba warunki łącznie); (2) przy 50/50 każda uchwała wymaga zgody obu stron, więc bez mechanizmu rozstrzygania sporów spółka może stanąć; KSH nie zna „głosu rozstrzygającego” na zgromadzeniu, a dla zarządu przewiduje go tylko w art. 208 § 8 [interpretacja]; (3) umowy zawierane po 3.12.2026 mogą świadomie zostawić formę dokumentową albo wprowadzić surowszą.

---

## 7. ZUS i składka zdrowotna: zarząd i wspólnicy

- Art. 8 ust. 6 pkt 4 u.s.u.s.: za osobę prowadzącą pozarolniczą działalność uważa się „wspólnika jednoosobowej spółki z ograniczoną odpowiedzialnością oraz wspólników spółki jawnej, komandytowej lub partnerskiej”.
- Art. 13 pkt 4a u.s.u.s.: wspólnicy jednoosobowych sp. z o.o. podlegają ubezpieczeniom „od dnia wpisania spółki do Krajowego Rejestru Sądowego albo od dnia nabycia udziałów w spółce do dnia wykreślenia spółki z Krajowego Rejestru Sądowego albo zbycia wszystkich udziałów w spółce, z wyłączeniem okresu, na który wykonywanie działalności przez spółkę zostało zawieszone”.
- Art. 18a ust. 1 u.s.u.s.: preferencyjna podstawa (30 % minimalnego wynagrodzenia przez 24 miesiące) dotyczy ubezpieczonych „o których mowa w art. 8 ust. 6 pkt 1”, czyli nie wspólnika jednoosobowej spółki z pkt 4.
- Art. 6 ust. 1 pkt 1, 4 u.s.u.s.: obowiązkowo ubezpieczeni są m.in. pracownicy oraz zleceniobiorcy i osoby na „innej umowie o świadczenie usług, do której zgodnie z Kodeksem cywilnym stosuje się przepisy dotyczące zlecenia”.
- Art. 36 ust. 4 u.s.u.s.: zgłoszeń dokonuje się „w terminie 7 dni od daty powstania obowiązku ubezpieczenia”.
- Art. 66 ust. 1 pkt 35a u.ś.o.z.: ubezpieczeniu zdrowotnemu podlegają „osoby powołane do pełnienia funkcji na mocy aktu powołania oraz prokurenci, które z tego tytułu pobierają wynagrodzenie podlegające opodatkowaniu podatkiem dochodowym (...), z wyłączeniem osób uzyskujących przychody, o których mowa w art. 13 pkt 5 lub 6 tej ustawy, których roczne wynagrodzenie z tego tytułu nie przekracza kwoty 6000 zł”.
- SN, wyrok z 1.06.2010, II UK 34/10 (SAOS 92378, otwarty, fragment uzasadnienia): występowanie tej samej osoby jako jedynego wspólnika, członka zarządu i pracownika, którego obowiązki pokrywają się z zadaniami zarządu, „uniemożliwia nawiązanie stosunku pracy, gdyż jest on pozbawiony zasadniczych elementów konstrukcyjnych wymaganych od tego typu stosunku, w szczególności zaś brak jest w nim cechy szeroko rozumianego podporządkowania”.
- Po skutku, cztery warianty do rozmowy z księgową: (1) powołanie bez umowy i bez wynagrodzenia: brak tytułu do ZUS z samego powołania [interpretacja: u.s.u.s. nie wymienia powołania jako tytułu w art. 6 ust. 1]; (2) powołanie z wynagrodzeniem: składka zdrowotna z u.ś.o.z. (z wyjątkiem 6 000 zł), bez społecznych z tego tytułu [DO WERYFIKACJI w aktualnym brzmieniu u.ś.o.z.]; (3) umowa o pracę: pełny ZUS, ale jedyny wspólnik nie powinien być pracownikiem własnej spółki (linia SN); (4) kontrakt menedżerski jako umowa o świadczenie usług: tytuł jak zlecenie [DO WERYFIKACJI w orzecznictwie]. Wspólnik jednoosobowej spółki płaci ZUS jak przedsiębiorca od dnia wpisu, bez „małego ZUS-u”, niezależnie od tego, czy coś zarabia. Czy dwuosobowa spółka z wspólnikiem „symbolicznym” jest dla ZUS jednoosobowa, to pytanie do doradcy [NIEPOTWIERDZONE: brak otwartego orzeczenia].

---

## 8. Firma, siedziba, przedmiot działalności (PKD 2025), rok obrotowy

- Art. 160 § 1-2 KSH: „Firma spółki może być obrana dowolnie; powinna jednak zawierać dodatkowe oznaczenie »spółka z ograniczoną odpowiedzialnością«.” „Dopuszczalne jest używanie w obrocie skrótu »spółka z o.o.« lub »sp. z o.o.«.”
- Art. 157 § 1 pkt 1 i art. 166 § 1 pkt 1 KSH: umowa określa „firmę i siedzibę spółki”, a zgłoszenie „firmę, siedzibę i adres spółki”.
- Po skutku: w umowie siedziba to miejscowość, adres podaje się w zgłoszeniu; zmiana adresu w tej samej miejscowości nie wymaga zmiany umowy, zmiana miejscowości wymaga [interpretacja art. 157 i 166; w S24 zmiana adresu uchwałą zarządu na wzorcu, art. 208 § 11]. Unikalność firmy i kolizje ze znakami towarowymi: KSH w części czytanej tego nie reguluje [art. 43¹-43¹⁰ KC nie czytano, DO WERYFIKACJI].
- § 1 PKD 2025: wprowadza się PKD 2025 „do stosowania w statystyce, ewidencji i dokumentacji oraz rachunkowości, a także w urzędowych rejestrach i systemach informacyjnych administracji publicznej”.
- § 2 ust. 1 PKD 2025: równocześnie można stosować PKD 2007 „do działalności oznaczonej zgodnie z tą klasyfikacją przed dniem wejścia w życie niniejszego rozporządzenia, jednak nie dłużej niż do dnia 31 grudnia 2026 r.”
- § 2 ust. 3 PKD 2025: podmioty z KRS, które po 1.01.2025, a przed 31.12.2026 złożyły wniosek o zmianę przedmiotu działalności, „stosują klasyfikację PKD 2025”.
- Po skutku: nowa spółka w listopadzie 2026 r. podaje kody PKD 2025; kody PKD 2007 w starych wzorach umów to sygnał nieaktualnego projektu. Czy po 31.12.2026 trzeba będzie zmieniać wpis istniejących spółek, rozporządzenie nie mówi wprost [DO WERYFIKACJI: komunikaty GUS i MS].
- Art. 157 § 1 pkt 2 KSH: przedmiot działalności jest obowiązkowym elementem umowy; art. 246 § 1: „istotna zmiana przedmiotu działalności” wymaga 3/4 głosów.
- Art. 3 ust. 1 pkt 9 u.r.: rok obrotowy to „rok kalendarzowy lub inny okres trwający 12 kolejnych pełnych miesięcy kalendarzowych, stosowany również do celów podatkowych. Rok obrotowy lub jego zmiany określa statut lub umowa, na podstawie której utworzono jednostkę. Jeżeli jednostka rozpoczęła działalność w drugiej połowie przyjętego roku obrotowego, to można księgi rachunkowe i sprawozdanie finansowe za ten okres połączyć z księgami rachunkowymi i sprawozdaniem finansowym za rok następny.”
- Art. 12 ust. 1 pkt 1 u.r.: księgi otwiera się „na dzień rozpoczęcia działalności, którym jest dzień pierwszego zdarzenia wywołującego skutki o charakterze majątkowym lub finansowym”, „w ciągu 15 dni od dnia zaistnienia tych zdarzeń”.
- Art. 8 ust. 2 u.CIT: pierwszy rok podatkowy trwa od rozpoczęcia działalności do końca roku kalendarzowego albo wybranego roku, „niedłużej jednak niż dwanaście kolejnych miesięcy kalendarzowych”. Ust. 2a: przy rozpoczęciu w drugiej połowie roku kalendarzowego i roku podatkowym równym kalendarzowemu „pierwszy rok podatkowy może trwać od dnia rozpoczęcia działalności do końca roku kalendarzowego następującego po roku, w którym rozpoczęto działalność”.
- Po skutku: spółka zarejestrowana w listopadzie 2026 r. z rokiem kalendarzowym może mieć pierwszy rok obrotowy i podatkowy do 31.12.2027 r. (wydłużony), co przesuwa pierwsze sprawozdanie i wygaśnięcie mandatów zarządu z art. 202 § 1. Decyzja należy do księgowej; skill ma tylko zadać pytanie. Uwaga: pierwszy dzień „działalności” w u.r. to pierwsze zdarzenie majątkowe, które może nastąpić przed wpisem (spółka w organizacji) [interpretacja].

---

## 9. Koszty założenia (stan na 5.11.2026)

- Art. 52 ust. 1 UKSC: „Opłatę stałą w kwocie 500 złotych pobiera się od wniosku o zarejestrowanie podmiotu w rejestrze przedsiębiorców w Krajowym Rejestrze Sądowym, chyba że przepis szczególny stanowi inaczej.”
- Art. 52 ust. 2 UKSC: „Opłatę stałą w kwocie 250 złotych pobiera się od wniosku o zarejestrowanie w rejestrze przedsiębiorców w Krajowym Rejestrze Sądowym spółki jawnej, spółki komandytowej, spółki z ograniczoną odpowiedzialnością oraz prostej spółki akcyjnej, których umowy zostały zawarte przy wykorzystaniu wzorców umowy udostępnionych w systemie teleinformatycznym.”
- **MSiG**: Dz.U. 2025 poz. 1556 art. 1 pkt 4: „uchyla się art. 13” u.KRS (który brzmiał: „Wpisy do Rejestru podlegają obowiązkowi ogłoszenia w Monitorze Sądowym i Gospodarczym, chyba że ustawa stanowi inaczej.”); art. 3 tej ustawy uchyla w u.MSiG art. 1 ust. 3 pkt 1 (ogłoszenia wpisów do KRS); w życie **29.11.2025**. Nowy art. 15 ust. 1 u.KRS: „Od dnia dokonania wpisu w Rejestrze nikt nie może zasłaniać się nieznajomością ujawnionych wpisów.”
- Po skutku: od 29.11.2025 przy rejestracji spółki **nie ma opłaty 100 zł za ogłoszenie w MSiG**; płaci się tylko opłatę sądową 500 zł (notariusz) albo 250 zł (S24). MSiG zostaje dla ogłoszeń wymaganych przez KSH (np. zwrot dopłat, art. 179 § 2, gdy spółka nie ma innego pisma) [interpretacja art. 1 ust. 3 pkt 2 u.MSiG].
- **PCC**: art. 1 ust. 1 pkt 1 lit. k u.PCC: podatkowi podlegają „umowy spółki”; art. 4 pkt 9: obowiązek podatkowy „przy umowie spółki cywilnej - na wspólnikach, a przy pozostałych umowach spółki - na spółce”; art. 6 ust. 1 pkt 8 lit. a: podstawa „przy zawarciu umowy - (...) wartość kapitału zakładowego”; art. 7 ust. 1 pkt 9: stawka „od umowy spółki - 0,5 %”.
- Art. 6 ust. 9 u.PCC: od podstawy odlicza się „1) kwotę wynagrodzenia wraz z podatkiem od towarów i usług, pobraną przez notariusza za sporządzenie aktu notarialnego umowy spółki (...); 2) opłatę sądową związaną z wpisem spółki do rejestru przedsiębiorców (...)”. Pkt 3 (dawniej opłata za ogłoszenie w MSiG) uchylony przez Dz.U. 2025 poz. 1556 od 29.11.2025.
- Art. 10 ust. 1-3 u.PCC: podatnik składa deklarację i płaci „w terminie 14 dni od dnia powstania obowiązku podatkowego, z wyłączeniem przypadków, gdy podatek jest pobierany przez płatnika”; „Notariusze są płatnikami podatku od czynności cywilnoprawnych dokonywanych w formie aktu notarialnego.”
- Po skutku: przy kapitale 5 000 zł w S24 PCC wynosi 0,5 % × (5 000 zł - 250 zł) = 23,75 zł (zaokrąglenia według OP, nie czytano); spółka sama składa deklarację w 14 dni od zawarcia umowy [DO WERYFIKACJI: zaokrąglenie podstawy i podatku, formularz PCC-3]. Przy notariuszu podatek pobiera notariusz. Brak zwolnienia dla umowy spółki w 2025-2026 r. (w art. 2 i 9 u.PCC tylko wyłączenia dla łączenia, przekształceń i wnoszenia przedsiębiorstwa lub udziałów dających większość głosów, art. 2 pkt 6).
- **Taksa notarialna** (§ 2 ust. 2 taksy: wartość przedmiotu ustala się z uwzględnieniem zasad u.PCC, czyli przy umowie spółki od kapitału [interpretacja]); § 3 w brzmieniu od 5.11.2026: „1) do 3000 zł - 100 zł; 2) powyżej 3000 zł do 10 000 zł - 100 zł + 3 % od nadwyżki powyżej 3000 zł; 3) powyżej 10 000 zł do 30 000 zł - 310 zł + 2 % od nadwyżki powyżej 10 000 zł; 4) powyżej 30 000 zł do 60 000 zł - 710 zł + 1 % od nadwyżki powyżej 30 000 zł; 5) powyżej 60 000 zł do 1 000 000 zł - 1010 zł + 0,4 % od nadwyżki powyżej 60 000 zł; 6) powyżej 1 000 000 zł do 2 000 000 zł - 4770 zł + 0,2 % od nadwyżki powyżej 1 000 000 zł; 7) powyżej 2 000 000 zł do 5 000 000 zł - 6770 zł + 0,25 % od nadwyżki powyżej 2 000 000 zł; 8) powyżej 5 000 000 zł - 14 270 zł + 0,15 % od nadwyżki powyżej 5 000 000 zł, łącznie niewięcej jednak niż 25 000 zł”.
- Przykłady (maksimum netto, bez VAT i wypisów): kapitał 5 000 zł: 160 zł; 10 000 zł: 310 zł; 50 000 zł: 910 zł; 100 000 zł: 1 170 zł. Do tego VAT 23 % [PRAKTYKA] i wypisy: od 5.11.2026 „12 zł za każdą rozpoczętą stronę od 1 do 10” (§ 12 ust. 1). Taksa to maksimum, notariusz może wziąć mniej.
- Inne stawki od 5.11.2026 przydatne w teczce: protokół zgromadzenia wspólników sp. z o.o. 900 zł (§ 9 ust. 1 pkt 1); pełnomocnictwo w formie aktu 100 zł do jednej czynności, 200 zł do więcej (§ 8 pkt 8); poświadczenie podpisu na dokumencie z kwotą 1/10 stawki, nie więcej niż 500 zł, na pełnomocnictwie 60 zł (§ 13 pkt 1); akt oświadczenia o przystąpieniu do sp. z o.o. lub objęciu udziałów 1/10 stawki z § 3 (§ 7 ust. 2 pkt 1, bez zmian).
- **Opłata skarbowa**: art. 1 ust. 1 pkt 2 u.o.s.: opłacie podlega „złożenie dokumentu stwierdzającego udzielenie pełnomocnictwa lub prokury albo jego odpisu, wypisu lub kopii - w sprawie z zakresu administracji publicznej lub w postępowaniu sądowym”; załącznik część IV: 17 zł „od każdego stosunku pełnomocnictwa (prokury)”. Po skutku: gdy rejestrację składa pełnomocnik (np. biuro), dochodzi 17 zł [interpretacja co do postępowania rejestrowego].

---

## 10. Po wpisie: kalendarz obowiązków (do teczki)

| Obowiązek | Termin | Podstawa (cytat skrócony) |
|---|---|---|
| Wpłata kapitału i oświadczenie zarządu (tylko S24, gdy nie dołączono do zgłoszenia) | 7 dni od wpisu | art. 158 § 1¹, 167 § 5 KSH; wykreślenie wzmianki o niepokryciu: art. 38 pkt 8 lit. f i 20 ust. 1b u.KRS |
| Informacja „wkłady nie zostały wniesione” na pismach i stronie (S24) | do pokrycia kapitału | art. 206 § 1 pkt 4 KSH |
| PCC od umowy spółki (S24; przy notariuszu pobiera płatnik) | 14 dni od zawarcia umowy | art. 10 ust. 1-2 u.PCC |
| Dane uzupełniające do urzędu skarbowego (NIP-8) | 21 dni od wpisu | art. 5 ust. 2c u.NIP: „Podatnicy wpisani do Krajowego Rejestru Sądowego dokonują zgłoszenia identyfikacyjnego wyłącznie w zakresie danych uzupełniających (...), w terminie 21 dni od dnia dokonania wpisu podmiotu do Krajowego Rejestru Sądowego.” |
| Beneficjent rzeczywisty do CRBR | 14 dni od wpisu, bez sobót i świąt | art. 60 ust. 1 pkt 1 i ust. 2 AML: „w terminie 14 dni od dnia wpisu tych podmiotów do Krajowego Rejestru Sądowego”; „Do biegu terminów (...) nie wlicza się sobót i dni ustawowo wolnych od pracy.” Zgłasza „osoba ustawowo uprawniona do reprezentacji” (art. 61 ust. 1), z KES albo PZ (art. 61 ust. 4), nieodpłatnie |
| Aktualizacja CRBR | 14 dni od zmiany w KRS albo od zmiany niewymagającej wpisu | art. 60 ust. 1a pkt 1 AML |
| VAT-R (jeśli spółka ma być czynnym podatnikiem VAT) | przed pierwszą czynnością opodatkowaną | art. 96 ust. 1 u.VAT: „przed dniem wykonania pierwszej czynności określonej w art. 5 złożyć naczelnikowi urzędu skarbowego zgłoszenie rejestracyjne” |
| Adres do doręczeń elektronicznych | obowiązek od wpisu do KRS | art. 9 ust. 1 pkt 8 u.d.e. (obowiązany „podmiot niepubliczny wpisany do rejestru przedsiębiorców”); utworzenie automatycznie po danych z wniosku o wpis (art. 11 pkt 2 lit. a); adres trafia do KRS automatycznie (art. 31 ust. 1). Szczegóły: `e-doreczenia-w-firmie` [DO WERYFIKACJI: czy formularz rejestracyjny wymaga osobnego wniosku] |
| KSeF | od pierwszej faktury B2B (obowiązek od 1.04.2026; wyjątek do 10 000 zł do końca 2026 r.; odbiór od 1.02.2026) | research `ksef-procedury` (`references/stan-prawny.md`); skill tylko sygnalizuje |
| Zgłoszenie płatnika i ubezpieczonych do ZUS (pracownicy, zleceniobiorcy, kontrakt) | 7 dni od powstania obowiązku | art. 36 ust. 4 u.s.u.s. |
| Wspólnik jednoosobowej spółki: ZUS jak przedsiębiorca | od dnia wpisu | art. 13 pkt 4a u.s.u.s.; zgłoszenie 7 dni (art. 36 ust. 4) [formularz NIEOTWARTE] |
| Otwarcie ksiąg rachunkowych (pełna księgowość) | 15 dni od pierwszego zdarzenia majątkowego | art. 12 ust. 1 pkt 1 u.r. |
| Księga udziałów | od początku, bieżąco | art. 188 § 1 KSH: zarząd „jest obowiązany prowadzić księgę udziałów” (wspólnicy, adresy, liczba i wartość udziałów, zastawy, zmiany) |
| Nowa lista wspólników do KRS | po każdym wpisie zmiany do księgi | art. 188 § 3 KSH; w S24 na wzorcu, art. 188 § 4 |
| Zmiany danych w KRS | 7 dni od zdarzenia | art. 22 u.KRS |
| Oznaczenia na pismach, zamówieniach i stronie www | od początku działania | art. 206 § 1 KSH: firma, siedziba i adres; sąd rejestrowy i numer KRS; NIP; kapitał zakładowy; grupa spółek, jeśli dotyczy |
| Sprawozdanie finansowe: sporządzenie | 3 miesiące od dnia bilansowego | art. 52 ust. 1 u.r. |
| Zatwierdzenie sprawozdania i zwyczajne zgromadzenie | 6 miesięcy od końca roku obrotowego | art. 53 ust. 1 u.r.; art. 231 § 1 KSH |
| Złożenie sprawozdania do KRS (repozytorium) | po zatwierdzeniu, przez system | art. 69 ust. 1 u.r. i art. 19e ust. 1-2 u.KRS (podpis osoby z PESEL w KRS) [terminu art. 69 nie cytowano, DO WERYFIKACJI: 15 dni od zatwierdzenia] |
| Wygaśnięcie mandatu pierwszego zarządu (reguła domyślna) | dzień zgromadzenia za pierwszy pełny rok obrotowy | art. 202 § 1 KSH; ponowne powołanie i wpis (art. 22 u.KRS) |

- CIT (tylko sygnał do doradcy): art. 19 ust. 1 pkt 2 u.CIT (od 1.01.2026): 9 % „w przypadku podatników, u których przychody osiągnięte w roku podatkowym nie przekroczyły (...) równowartości 2 000 000 euro”; ust. 1d: stosują ją, „jeżeli posiadają status małego podatnika”; ust. 1e: warunek małego podatnika „nie dotyczy podatników rozpoczynających prowadzenie działalności, z zastrzeżeniem ust. 1a i 1c, w roku rozpoczęcia tej działalności”; ust. 1a pkt 2-3: wyłączenie 9 % w roku rozpoczęcia i następnym m.in. dla spółki powstałej z przekształcenia JDG albo gdy wspólnik wniósł przedsiębiorstwo lub składniki majątku przedsiębiorstwa o wartości ponad 10 000 euro. Po skutku: przeniesienie JDG do nowej spółki aportem może odebrać 9 % na dwa lata; to pytanie do doradcy podatkowego przed decyzją o aporcie. Estoński CIT (art. 28c i nast. u.CIT) nie czytano [poza zakresem, tylko sygnał].

---

## 11. Pytania, na które wspólnicy odpowiadają zgodnie przed rejestracją (materiał do teczki)

Kolejność odpowiada skutkom: najpierw to, czego nie da się łatwo zmienić bez zgody wszystkich (art. 246 § 3 KSH).

1. Kto jest wspólnikiem i za co obejmuje udziały: tylko gotówka (S24 możliwe) czy aport (tylko notariusz, wycena, art. 175)? [art. 14 § 1, 158 KSH]
2. Jaki kapitał i ile udziałów: minimum 5 000 zł, udział od 50 zł; czy wspólnik może mieć więcej niż jeden udział? [art. 154, 157 § 1 pkt 4]
3. Podział udziałów: czy 50/50 (ryzyko pata), czy przewaga jednej strony; co się dzieje przy remisie? [art. 245, 246, 266]
4. Wkład pracy a wkład kapitału: jak rozliczyć wspólnika, który pracuje, a nie wnosi pieniędzy (praca nie może być aportem)? Wynagrodzenie, powtarzające się świadczenia z art. 176, umowa wspólników, vesting? [art. 14 § 1, 176]
5. Uprzywilejowanie: czy ktoś ma mieć więcej głosów (do 3 na udział) albo większą dywidendę (do +50 %)? Czy ktoś ma osobiste prawo powoływania członka zarządu? [art. 174, 196, 159]
6. Zarząd: kto, ilu członków, sposób reprezentacji (każdy sam czy dwóch łącznie), kadencja, czy prezes ma głos rozstrzygający? [art. 201, 202, 205, 208 § 8]
7. Wynagrodzenie zarządu i forma: powołanie bez umowy, uchwała o wynagrodzeniu, umowa o pracę, kontrakt; kto podpisuje umowę za spółkę (pełnomocnik zgromadzenia)? ZUS i zdrowotna w każdym wariancie do księgowej. [art. 210 § 1; u.s.u.s.; u.ś.o.z. art. 66 ust. 1 pkt 35a]
8. Czy potrzebna prokura i jaka (samodzielna, łączna, łączna z członkiem zarządu)? Powołanie wymaga zgody wszystkich członków zarządu. [art. 208 § 6 KSH, art. 109⁴ KC]
9. Jakie decyzje wymagają uchwały wspólników ponad ustawę (np. kredyt, zatrudnienie, budżet), a z jakich zwalniamy (art. 230 przy niskim kapitale, nieruchomości z art. 228 pkt 4)? [art. 228, 230]
10. Zbywanie udziałów: zgoda spółki (czyja: zarządu czy zgromadzenia), prawo pierwszeństwa pozostałych, cena i wycena, zakaz sprzedaży konkurentowi? [art. 182]
11. Wyjście wspólnika: dobrowolne odkupienie, umorzenie dobrowolne i przymusowe (przesłanki w umowie), zasady wyceny, „dobry i zły leaver” w umowie wspólników? [art. 199, 266]
12. Śmierć wspólnika: czy spadkobiercy wchodzą; jeśli nie, warunki spłaty (inaczej ograniczenie bezskuteczne)? [art. 183]
13. Małżonkowie: czy udziały będą w majątku wspólnym; czy wyłączyć wstąpienie współmałżonka? [art. 183¹ KSH; art. 31 KRO]
14. Dopłaty: czy wspólnicy mogą być zobowiązani i do jakiej kwoty na udział? [art. 177]
15. Zakaz konkurencji wspólników (KSH obejmuje tylko zarząd) i poufność: w umowie spółki czy w umowie wspólników? [art. 211, 159]
16. Własność intelektualna i aktywa: domena, znak, kod, logo, konta w mediach społecznościowych: przeniesienie na spółkę (aport, sprzedaż, licencja) czy zostaje u wspólnika? [interpretacja; szczegóły praw autorskich poza skillem]
17. Impas decyzyjny: mediacja, opcja kupna i sprzedaży („shotgun”), arbiter, termin? KSH tego nie reguluje, więc to umowa wspólników [interpretacja].
18. Rok obrotowy, pierwszy wydłużony rok, kto prowadzi księgi, czy spółka będzie czynnym podatnikiem VAT od początku? [art. 3 ust. 1 pkt 9 u.r., art. 8 ust. 2a u.CIT, art. 96 u.VAT]
19. Firma, siedziba (miejscowość), adres, PKD 2025, przedmiot działalności. [art. 157, 160, 166; PKD 2025]
20. Rada nadzorcza albo komisja rewizyjna (dobrowolnie) i czy ograniczyć indywidualną kontrolę wspólników. [art. 213]
21. Spółka w organizacji: kto podpisuje umowy przed wpisem i czy zgromadzenie je zatwierdzi? [art. 13, 161]
22. S24 czy notariusz: czy potrzebne postanowienia spoza wzorca (umorzenie, uprzywilejowanie, ograniczenia zbycia)? Czy wszyscy mają KES, PZ albo PO? [art. 157¹; wzorzec NIEOTWARTE]
23. Forma zawiadomień o zgromadzeniu (list, ADE, e-mail za zgodą) i forma pełnomocnictwa na zgromadzenie po 3.12.2026. [art. 238 § 1, 243 § 2 w brzmieniu z Dz.U. 2026 poz. 1440]
24. Umowa wspólników (umowa inwestycyjna) jako osobny dokument: co trafia tam, a co musi być w umowie spółki, żeby działało wobec spółki? [art. 159; interpretacja]

---

## 12. Obalone tezy i częste błędy (goły model)

- **„Rejestracja kosztuje 600 zł (500 zł + 100 zł MSiG)” albo „S24: 250 zł + 100 zł”.** Nieaktualne od 29.11.2025: art. 13 u.KRS uchylony (Dz.U. 2025 poz. 1556), wpisów nie ogłasza się w MSiG, z u.PCC usunięto odliczenie opłaty za ogłoszenie. Opłata sądowa: 500 zł albo 250 zł (art. 52 UKSC).
- **„Na zgłoszenie spółki masz 6 miesięcy.”** Tylko przy umowie notarialnej. Przy S24 termin wynosi **7 dni** od zawarcia umowy, inaczej umowa ulega rozwiązaniu (art. 169 § 2 KSH).
- **„W S24 kapitał wpłacasz przed rejestracją.”** Można, ale nie trzeba: art. 158 § 1¹ daje 7 dni od wpisu; jeśli oświadczenia nie dołączono do zgłoszenia, zarząd składa je w 7 dni od wpisu (art. 167 § 5), a do pokrycia na pismach widnieje informacja o niewniesieniu wkładów (art. 206 § 1 pkt 4).
- **„W S24 można wnieść aport.”** Nie: przy zakładaniu przez S24 tylko wkłady pieniężne (art. 158 § 1¹); aport dopiero przy podwyższeniu kapitału aktem notarialnym (art. 158 § 1²).
- **„Wspólnik może wnieść jako wkład swoją pracę / know-how w postaci usług.”** Art. 14 § 1 KSH wyklucza świadczenie pracy i usług oraz prawa niezbywalne.
- **„Członek zarządu powołany na czas nieokreślony jest w zarządzie, dopóki go nie odwołają.”** Przy braku odmiennej umowy mandat wygasa po zgromadzeniu za pierwszy pełny rok obrotowy (art. 202 § 1; SN III CZP 23/10).
- **„Zakaz konkurencji z KSH obowiązuje wspólników.”** Art. 211 dotyczy członków zarządu; wspólników wiąże tylko to, co wpisano w umowie spółki albo umowie wspólników.
- **„Prokura łączna z członkiem zarządu jest niedopuszczalna” (z powołaniem na SN III CZP 34/14).** Uchwała 7 sędziów z 30.01.2015 (SAOS 168062) dotyczyła stanu sprzed 2017 r.; dziś art. 109⁴ § 1¹ KC wprost pozwala na prokurę do działania „wspólnie z członkiem organu zarządzającego”.
- **„Wspólnik nie odpowiada za długi spółki w żadnej sytuacji.”** Przed wpisem odpowiada do wartości niewniesionego wkładu (art. 13 § 2), a osoby działające w imieniu spółki w organizacji solidarnie (art. 13 § 1); wspólnik w zarządzie odpowiada z art. 299 KSH i art. 116 OP.
- **„Rada nadzorcza jest obowiązkowa powyżej 500 000 zł kapitału.”** Potrzebne są łącznie: kapitał ponad 500 000 zł **i** więcej niż 25 wspólników (art. 213 § 2).
- **„Jedyny wspólnik może być zatrudniony w swojej spółce na umowę o pracę jako prezes, żeby mieć ZUS pracowniczy.”** Linia SN (II UK 34/10) wyklucza stosunek pracy przy braku podporządkowania; wspólnik jednoosobowej spółki i tak podlega ZUS jako przedsiębiorca od wpisu (art. 13 pkt 4a u.s.u.s.) i nie korzysta z ulg z art. 18a.
- **„Udziały kupione przez męża z pieniędzy wspólnych należą tylko do niego.”** Wspólnikiem jest on, ale udziały co do zasady wchodzą do majątku wspólnego (II CSK 273/09); art. 183¹ KSH pozwala ograniczyć wstąpienie współmałżonka.
- **„9 % CIT przysługuje każdej nowej spółce w pierwszym roku.”** Nie, jeśli spółka powstała z przekształcenia JDG albo wspólnik wniósł przedsiębiorstwo lub jego składniki ponad 10 000 euro (art. 19 ust. 1a u.CIT); od 2026 r. limit liczony do przychodów roku podatkowego (art. 19 ust. 1 pkt 2 w brzmieniu Dz.U. 2025 poz. 1658).
- **„Do umowy spółki wpisuje się kody PKD 2007.”** Dla nowych wpisów stosuje się PKD 2025; PKD 2007 tylko przejściowo dla działalności oznaczonej przed 1.01.2025 i najdłużej do 31.12.2026 (§ 2 PKD 2025).
- **„CRBR: 7 dni.”** 14 dni od wpisu do KRS, bez sobót i dni ustawowo wolnych (art. 60 ust. 1-2 AML). **„NIP-8: 7 dni.”** 21 dni od wpisu (art. 5 ust. 2c u.NIP).
- **„Pełnomocnictwo na zgromadzenie wspólników zawsze na piśmie.”** Do 2.12.2026 tak (pod rygorem nieważności); od 3.12.2026 wystarcza forma dokumentowa, chyba że umowa spółki wymaga więcej (Dz.U. 2026 poz. 1440).
- **„Taksa za umowę spółki to stała kwota.”** Zależy od kapitału według § 3 taksy (przy 5 000 zł maksymalnie 160 zł netto); zmiana z 5.11.2026 nie podniosła stawek w niskich progach, dodała próg powyżej 5 mln zł i maksimum 25 000 zł.
- **„Umowa wspólników zastąpi zapisy w umowie spółki.”** Szczególne korzyści i obowiązki wspólników wobec spółki są skuteczne wobec spółki tylko po dokładnym określeniu w umowie spółki (art. 159), a umorzenie przymusowe wymaga podstawy w umowie spółki (art. 199 § 1).

---

## 13. Zmiany 2024-2026 i projekty

Obowiązujące albo uchwalone:
- **Dz.U. 2025 poz. 1556** (ustawa z 26.09.2025 o zmianie u.KRS): od **29.11.2025** koniec ogłaszania wpisów KRS w MSiG (uchylony art. 13 i 16 u.KRS, nowy art. 15), uchylone odliczenie opłaty MSiG w PCC (art. 6 ust. 9 pkt 3), dostęp do KRS przez usługi sieciowe dla podmiotów publicznych; od **1.04.2027** akta i wnioski dla rejestru przedsiębiorców wyłącznie w systemie teleinformatycznym (art. 1 pkt 3 i 7).
- **Dz.U. 2026 poz. 1440** (ustawa z 4.09.2026 o zmianie KSH): od **3.12.2026** forma dokumentowa zgody na zawiadomienia e-mailem albo na ADE (art. 238 § 1) i pełnomocnictwa na zgromadzenie wspólników (art. 243 § 2) oraz w PSA (art. 300⁹⁵ § 2); dawne zgody i pełnomocnictwa według przepisów dotychczasowych.
- **Dz.U. 2026 poz. 176** (KSH, od **18.02.2027**): rejestry akcjonariuszy i akcje; dla sp. z o.o. bez znaczenia, dla porównania z PSA tylko wzmianka.
- **Dz.U. 2026 poz. 1370** (taksa, od **5.11.2026**): nowe progi powyżej 2 mln zł z limitem 25 000 zł, wyższe stawki stałe (protokół zgromadzenia 900 zł, pełnomocnictwo 100/200 zł, poświadczenie podpisu 60 zł, wypisy 12 zł za stronę).
- **Dz.U. 2025 poz. 1658** (u.CIT, od **1.01.2026**): nowe brzmienie art. 19 ust. 1 pkt 2 (9 % do przychodów 2 mln euro w roku podatkowym) i nowe stawki dla banków.
- **PKD 2025** (Dz.U. 2024 poz. 1936, od 1.01.2025): okres równoległego stosowania PKD 2007 kończy się **31.12.2026**.
- **e-Doręczenia**: obowiązek ADE dla podmiotów z rejestru przedsiębiorców KRS (art. 9 ust. 1 pkt 8 u.d.e.); dla podmiotów wpisanych przed dniem z komunikatu z art. 155 ust. 10 termin 3 miesięcy od tego dnia (art. 151 ust. 1) [data z komunikatu NIEOTWARTE; zob. `e-doreczenia-w-firmie`].
- **KSeF**: obowiązek od 1.02.2026 (najwięksi) i 1.04.2026 (pozostali), z przejściowym wyjątkiem do 10 000 zł do końca 2026 r. (research `ksef-procedury`, nie weryfikowano tu ponownie).
- **Deregulacja (Dz.U. 2025 poz. 769)**: KSH i u.KRS bez zmian; zmiany w u.NIP, OP, u.s.u.s. (art. 18c) i Prawie przedsiębiorców nie dotyczą zakładania sp. z o.o. [sprawdzono spis artykułów, treści zmian w u.NIP nie analizowano].

Projekty:
- **Druk nr 3004** (rządowy projekt ustawy o zmianie ustawy o KRS oraz niektórych innych ustaw, wpłynął 6.08.2026, I czytanie 18.09.2026, praca w komisjach od 22.10.2026; projekt „ma charakter deregulacyjny”): m.in. konto podmiotu w systemie teleinformatycznym (art. 19 ust. 2a-2b u.KRS w projekcie) i zwrot pism złożonych z naruszeniem tego trybu (ust. 8a). **To projekt**; skill może tylko wspomnieć, że procedura KRS się zmienia. Pełnej treści nie analizowano [NIEOTWARTE poza pierwszymi stronami].
- Prosta spółka akcyjna (art. 300¹ i nast. KSH) jako alternatywa dla start-upów z wkładem pracy (w PSA wkładem może być praca lub usługi, a art. 14 § 1 KSH wyklucza to tylko dla kapitału akcyjnego) [przepisów PSA nie czytano poza art. 14 § 1; tylko wzmianka].

---

## 14. Rejestr źródeł

Akty (ELI, tekst pobrany z https://api.sejm.gov.pl/eli/acts/DU/<rok>/<poz>/text.pdf):
- KSH t.j. DU/2024/18; zmiany DU/2026/1440, DU/2026/176 (sprawdzony spis zmian), DU/2024/96 (wyrok TK K 29/23, poza zakresem).
- KC t.j. DU/2026/795 (art. 109¹-109⁷).
- KRO t.j. DU/2026/236.
- u.KRS t.j. DU/2025/869; zmiany DU/2025/1556 (pełny tekst), DU/2025/1792, DU/2026/119, DU/2026/252 (sprawdzone fragmenty).
- u.MSiG t.j. DU/2026/547.
- UKSC t.j. DU/2025/1228; zmiany DU/2025/1172, DU/2026/473, DU/2026/1003 (sprawdzone pod kątem art. 52).
- u.PCC t.j. DU/2026/191; zmiana DU/2026/1354.
- Taksa t.j. DU/2024/1566; zmiana DU/2026/1370 (pełny tekst).
- u.o.s. t.j. DU/2026/1395.
- u.r. t.j. DU/2026/522.
- u.CIT t.j. DU/2026/554; zmiany po t.j. DU/2026/779, 846, 912, 1123, 1287, 1371 (wyszukiwanie zmian art. 8 i 19).
- u.VAT t.j. DU/2026/1263.
- u.NIP t.j. DU/2026/151; zmiana DU/2026/1270.
- AML t.j. DU/2025/644; zmiana DU/2025/1669.
- u.s.u.s. t.j. DU/2026/199.
- u.ś.o.z. t.j. DU/2025/1461.
- OP t.j. DU/2026/622; zmiany DU/2026/825, 846, 875, 1098, 1154, 1206 (wyszukiwanie art. 116).
- u.d.e. t.j. DU/2026/3.
- PKD 2025 DU/2024/1936.
- Ustawa deregulacyjna DU/2025/769 (spis artykułów).
- Druk Sejmu X kadencji nr 3004 (api.sejm.gov.pl/sejm/term10/prints/3004, processes/3004), pierwsze strony PDF.

Orzecznictwo (SAOS, saos.org.pl/api/judgments/<id>):

| Sygnatura | Data, rodzaj | Teza dla skilla | Status |
|---|---|---|---|
| III CZP 89/15 (SAOS 244997) | 31.03.2016, uchwała 7 sędziów | rezygnację członka zarządu składa się spółce (art. 205 § 2), z wyjątkiem art. 210 § 2 | otwarte (sentencja) |
| III CZP 34/14 (SAOS 168062) | 30.01.2015, uchwała 7 sędziów | niedopuszczalny wpis prokury łącznej z członkiem zarządu; **nieaktualne** wobec art. 109⁴ § 1¹ KC | otwarte (sentencja) |
| III CZP 23/10 (SAOS 92696) | 21.07.2010, uchwała | powołanie „na czas nieokreślony” nie wyłącza art. 202 § 1 | otwarte (sentencja) |
| III CZP 129/10 (SAOS 94249) | 17.02.2011, uchwała | obrona z art. 299 zarzutem potrącenia po powstaniu tytułu | otwarte (sentencja) |
| II UZP 6/08 (SAOS 89311) | 4.12.2008, uchwała | odpowiedzialność za składki z art. 116 OP także po wykreśleniu spółki | otwarte (sentencja) |
| III CZP 117/09 (SAOS 91622) | 12.01.2010, uchwała | potrącenie wierzytelności wspólnika z wierzytelności o dopłaty dopuszczalne | otwarte (sentencja) |
| III CZP 9/08 (SAOS 87594) | 13.03.2008, uchwała | nakład z majątku wspólnego na udział jednego małżonka według ceny rynkowej | otwarte (sentencja i fragmenty) |
| II CSK 273/09 (SAOS 91387) | 3.12.2009, postanowienie | udziały z majątku wspólnego wchodzą do niego, wspólnikiem jest małżonek-strona czynności | otwarte (fragmenty uzasadnienia) |
| II CSK 349/12 (SAOS 100497) | 31.01.2013, postanowienie | udziały z majątku wspólnego mogą przypaść małżonkowi, który nie był wspólnikiem | otwarte (fragmenty uzasadnienia) |
| II UK 34/10 (SAOS 92378) | 1.06.2010, wyrok | jedyny wspólnik i zarząd jako pracownik: brak podporządkowania | otwarte (fragmenty uzasadnienia) |
| III CZP 61/09 (SAOS 91142) | 29.10.2009, uchwała | wady aportu, art. 14 § 2 KSH; termin 10 lat dotyczy dawnego brzmienia, obecny § 2 nie zawiera terminu | otwarte (sentencja); do references tylko jako tło [DO WERYFIKACJI aktualności] |
| P 5/19 (TK) | 12.04.2023, wyrok TK, Dz.U. 2023 poz. 739 | art. 299 a były członek zarządu i nieistniejąca wierzytelność | treść z odnośnika 12 t.j. KSH; wyroku nie otwierano [NIEOTWARTE] |

Nie otwarto: rozporządzenie MS o wzorcach S24, rozporządzenie o opłatach za ogłoszenia w MSiG, komunikat z art. 155 ust. 10 u.d.e., formularze NIP-8, CRBR, VAT-R, ZUS, PCC-3, KRS (PRS), art. 28c i nast. u.CIT, przepisy karne KSH (art. 587 i nast.), art. 43¹-43¹⁰ KC (firma), art. 69 u.r. w części o terminie.

---

## 15. Sugestie do references (co skill ma mówić po skutku)

- `references/stan-prawny.md`: data stanu (5.11.2026), lista aktów z t.j., trzy zmiany ostatnich miesięcy (koniec MSiG od 29.11.2025, taksa od 5.11.2026, forma dokumentowa od 3.12.2026), PKD 2025 do 31.12.2026, projekt druk 3004 jako projekt. Sygnatury tylko na pytanie o źródło.
- Zawsze najpierw: **S24 czy notariusz**. Skutki: S24 = tylko gotówka, 7 dni na zgłoszenie od podpisu, 7 dni na kapitał i oświadczenie od wpisu, 250 zł, wzorzec bez swobody; notariusz = dowolne postanowienia, aport, 500 zł plus taksa od kapitału plus VAT plus wypisy, PCC pobiera notariusz.
- Koszty podawać jako reguły z przykładami, nie jako „stała cena”: opłata sądowa 500/250 zł, brak opłaty MSiG, PCC 0,5 % od kapitału pomniejszonego o taksę z VAT i opłatę sądową, taksa według progu (przy 5 000 zł maksymalnie 160 zł netto).
- Teczka: lista 24 pytań z sekcji 11 jako formularz zgodnej odpowiedzi; przy każdym pytaniu „domyślnie w KSH dzieje się X”, żeby wspólnicy widzieli skutek braku zapisu (np. brak zapisu o reprezentacji = dwóch członków razem; brak zapisu o zbyciu = swobodna sprzedaż; brak zapisu o śmierci = spadkobiercy wchodzą; brak zapisu o umorzeniu = nie da się umorzyć).
- Sprawdzenie projektu umowy (tryb sprawdzający): sześć elementów obowiązkowych z art. 157 § 1; firma z dodatkiem z art. 160; PKD 2025; aport opisany zgodnie z art. 158 § 1 (i brak aportu w S24); uprzywilejowanie w granicach art. 174 i 196; umorzenie z przesłankami (art. 199); ograniczenie zbycia (art. 182) z jasnym organem zgody; art. 183 z warunkami spłaty; art. 183¹; dopłaty z limitem (art. 177); reprezentacja i kadencja; art. 230 i 228 pkt 4; forma zawiadomień i pełnomocnictw po 3.12.2026; rok obrotowy. Wynik jako „brakuje / do decyzji / ryzyko”, bez orzekania o ważności.
- Pułapki do zaznaczania wprost: 50/50 bez mechanizmu impasu; wkład pracy zamiast kapitału; jedyny wspólnik i jedyny członek zarządu (umowy ze sobą u notariusza, art. 210 § 2); zakaz konkurencji wspólników tylko umownie; pierwszy mandat zarządu wygasa szybciej niż się wydaje; spółka w organizacji i osobista odpowiedzialność podpisujących; aport JDG a utrata 9 % CIT.
- Kalendarz po wpisie z sekcji 10 jako tabela z „kto” (zarząd, księgowa, wspólnik): 7 dni (S24 kapitał), 14 dni (PCC w S24), 14 dni roboczych (CRBR), 21 dni (NIP-8), przed pierwszą sprzedażą (VAT-R), 7 dni (ZUS), 15 dni (księgi), 3 i 6 miesięcy po roku obrotowym (sprawozdanie, zgromadzenie). Daty kalendarzowe tylko warunkowo, gdy użytkownik poda datę podpisu i wpisu.
- ZUS i zdrowotna: zawsze cztery warianty i przekazanie do księgowej; nigdy nie liczyć składek.
- Granice: przy prośbie „napisz umowę spółki”, „zrób uchwałę o powołaniu”, „wypełnij S24” skill odmawia redakcji i oddaje listę decyzji oraz pytań do notariusza lub prawnika; przy „który CIT” oddaje sygnały do doradcy podatkowego.
- Pytania do prawnika lub notariusza (sekcja obowiązkowa w wyniku): aport i jego wycena; umorzenie przymusowe i wycena; wyłączenie wstąpienia spadkobierców i małżonków; umowa wspólników a umowa spółki; jedyny wspólnik w zarządzie; postanowienia spoza wzorca S24.
