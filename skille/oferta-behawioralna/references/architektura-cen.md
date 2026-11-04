# Architektura cen: pakiety, wabik, framing, negocjacje

Ten plik to mechanika praktyczna: jak policzyć i ułożyć ceny, żeby wybór klienta
padł tam, gdzie ma paść. Teoria stojąca za każdą regułą jest w `mechanizmy.md`, 
tu odwołujemy się do niej numerem sekcji, nie powtarzamy jej.

## Spis treści

1. [Proces projektowania trójki pakietów](#1-proces-projektowania-trójki-pakietów)
2. [Rozstaw cen](#2-rozstaw-cen)
3. [Wabik w praktyce](#3-wabik-w-praktyce)
4. [Różnicowanie jakościowe pakietów](#4-różnicowanie-jakościowe-pakietów)
5. [Framing ceny](#5-framing-ceny)
6. [Kiedy NIE robić trzech pakietów](#6-kiedy-nie-robić-trzech-pakietów)
7. [Przygotowanie na negocjacje](#7-przygotowanie-na-negocjacje)

---

## 1. Proces projektowania trójki pakietów

Projektuj w kolejności: **środek → góra → dół**. Nigdy od dołu. Pakiet środkowy
jest jedynym, który wynika z potrzeby klienta, pozostałe dwa są zbudowane
*względem niego*, jako układ odniesienia. Jeśli zaczniesz od dołu ("co najmniej
możemy dać"), środek stanie się "dołem plus dodatki" i klient będzie go czytał
jako dosprzedaż, a nie jako rozwiązanie.

### Krok 1: środek, cel sprzedażowy

Zbuduj go wyłącznie z wywiadu (`wywiad.md`): problem klienta jego słowami,
rezultat, którego potrzebuje, budżet, który jest w stanie obronić przed zarządem.
Środek to kompletna odpowiedź na zgłoszony problem, ani okrojona, ani dmuchana.
Cena środka wynika z odpowiedzi z sekcji „Ekonomia użytkownika" w `wywiad.md`,
zwłaszcza progu rentowności i twardych kosztów, nie z odejmowania od góry.

Test środka: gdyby to była **jedyna** opcja w ofercie, czy nadal byłaby dobrą
propozycją dla tego klienta? Jeśli nie, nie masz jeszcze oferty, masz cennik.

Dlaczego środek jest celem: awersja do skrajności (`mechanizmy.md` §1) sprawia,
że decydent często wybiera opcję najłatwiejszą do obronienia przed sobą i przed
szefem. Jest to środek, gdy spełnione są warunki działania efektu: opcji jest
dwie do trzech (nie więcej), a pakiety różnią się jakościowo, nie tylko liczbą
sztuk (`mechanizmy.md` §1, sekcja o granicach). Gdy te warunki nie są spełnione,
efekt słabnie lub znika i środek przestaje być "bezpiecznym kompromisem". Traktuj
umieszczenie celu w środku jako mocną domyślną regułę do sprawdzenia na tym
kliencie, nie jako prawo.

### Krok 2: góra, kotwica

Górny pakiet to pełna wersja "wszystko, szybciej, z większą opieką". Jako punkt
startu do przetestowania: **około 1.6-2.5× ceny środka**. To nie jest twarda
liczba, tylko widełki wyjściowe, koryguj je pod branżę, wielkość transakcji
i realne widełki użytkownika, a docelowo pod obserwowaną reakcję klientów.
Zadaniem góry jest ustawić skalę (`mechanizmy.md` §3): po zobaczeniu górnej ceny
środek czyta się jako rozsądny, nie jako wydatek. Górna granica działania jest
opisana w sekcji 2 ("Rozstęp za duży"): powyżej pewnego rozstępu kotwica wypada
z porównania.

Dwie twarde reguły:

- **Musi być dostarczalny.** Nie atrapa. Część klientów wybiera górę, jeśli
  użytkownik nie umie jej zrealizować, właśnie sprzedał coś, czego nie ma.
  Zapytaj wprost: "gdyby jutro ktoś zamówił górny pakiet, dowieziesz go
  z zyskiem?". Jeśli się waha, odchudź górę, aż odpowie "tak".
- **Musi mieć realnego adresata.** Zbuduj go pod konkretny profil: klient
  z presją czasu, z większą skalą, z potrzebą pełnego outsourcingu. Góra pisana
  "żeby było drogo" jest natychmiast czytelna jako rekwizyt i podważa pozostałe
  liczby.

### Krok 3: dół, punkt odniesienia

Jako hipoteza do przetestowania dolny pakiet może zaczynać się od **około
0.5-0.65× ceny środka**. To nie jest proporcja obowiązująca w każdej ofercie.
Jego zadaniem nie jest sprzedaż, tylko pokazanie, **z czego środek nie rezygnuje**:
klient patrzy na dół, widzi czego tam brakuje, i to braki dołu sprzedają środek.
Dlatego dół projektuje się przez odejmowanie od środka rzeczy *widocznych i
nazwanych*, nie przez pogarszanie jakości.

Reguły dołu:

- **Uczciwie użyteczny.** Musi istnieć klient, dla którego dół jest racjonalnym
  wyborem (mały budżet, chce sam wdrażać, testuje współpracę). Dół-straszak
  ("wersja, której nikt przy zdrowych zmysłach nie weźmie") działa jak
  przezroczysty wabik, obraża czytającego.
- **Rentowny.** Ktoś go w końcu kupi. Dół poniżej progu rentowności użytkownika
  to nie technika sprzedaży, to strata z odroczonym terminem.
- **Węższy, nie gorszy.** Mniej elementów, nie "to samo, ale byle jak". Klient,
  który kupi dół i dostanie tandetę, nie wróci po środek.

### Podsumowanie procesu

```
1. ŚRODEK  = rozwiązanie problemu z wywiadu, w budżecie klienta, rentowne
2. GÓRA    = środek + [czas/skala/opieka], hipoteza startowa: 1.6-2.5× środka, dostarczalna
3. DÓŁ     = środek - [nazwane, widoczne elementy], hipoteza startowa: 0.5-0.65× środka, uczciwy
4. Test całości: czy każdy pakiet ma realnego adresata?
```

---

## 2. Rozstaw cen

### Proporcje

Widełki wyjściowe do przetestowania, nie stałe współczynniki (koryguj pod branżę,
wielkość transakcji, widełki użytkownika i obserwowaną reakcję klientów):

| Pakiet | Mnożnik względem środka | Rola |
|---|---|---|
| Górny | 1.6-2.5×, hipoteza startowa | kotwica, przesuwa skalę |
| Środkowy | 1.0×, punkt odniesienia do testu | cel sprzedażowy |
| Dolny | 0.5-0.65×, hipoteza startowa | punkt odniesienia |

**Przykład domyślny (dół jako punkt odniesienia, bez wabika). Tak wygląda układ
bazowy, od niego zaczynaj:**

```
Sam audyt procesów z listą rekomendacji         18 000 zł   ← dół, 0,6× (punkt odniesienia)
Audyt + wdrożenie 3 kluczowych zmian            30 000 zł   ← cel, 1,0×
Audyt + wdrożenie całości + opieka 6 mies.      60 000 zł   ← kotwica, 2,0×
```

Dół jest wyraźnie tańszy od celu i uczciwie użyteczny (firma z własnym zespołem
weźmie sam audyt), a nie „prawie tyle co środek". Wariant z wabikiem (dół
podciągnięty cenowo bliżej środka) to osobna, opcjonalna hipoteza do testu z
sekcji 3, nie domyślny układ. Nie stosuj obu ról dołu naraz.

Dlaczego nie mniej i nie więcej:

- **Hipoteza: rozstęp może być za mały (np. góra +10-20% od środka).** Efekt kompromisu wymaga,
  żeby opcje były *odczuwalnie* różne. Przy 19 000 / 21 000 / 23 000 zł klient
  nie widzi trzech opcji, tylko jedną cenę z szumem, i zaczyna pytać, czym one
  się właściwie różnią, czyli negocjować. Środek przestaje być "bezpiecznym
  kompromisem", bo nie ma między czym być kompromisem.
- **Hipoteza: rozstęp może być za duży (np. góra 5× środka).** Kotwiczenie działa tylko między
  liczbami, które mózg trzyma w jednej kategorii wydatku (`mechanizmy.md` §14).
  Pakiet za 250 000 zł obok środka za 50 000 zł nie kotwiczy, jest księgowany
  jako inny produkt, dla innej firmy, i wypada z porównania. Zostają dwie opcje,
  czyli plebiscyt "tak/nie" wobec ceny środka.

### Ceny precyzyjne vs okrągłe

Domyślnie **precyzyjne**: 23 400 zł zamiast 25 000 zł. Cena precyzyjna czyta się
jako wynik kalkulacji, którą można obejrzeć; okrągła, jako liczba rzucona
"na oko", zapraszająca do targowania. Kontroferty wobec cen precyzyjnych są
bliższe punktowi wyjścia niż wobec okrągłych, precyzja sygnalizuje, że autor
wie, skąd wzięła się liczba.

Wyjątki:

- **Bardzo duże kwoty.** Przy 480 000 zł precyzja do stówki (481 700 zł) wygląda
  małostkowo. Zaokrąglaj do poziomu, na którym precyzja jeszcze niesie
  informację: 483 000 zł.
- **Nie udawaj kalkulacji, której nie było.** Jeśli cena to naprawdę "mniej
  więcej 20 tysięcy", 19 847 zł jest teatrem. Precyzja ma wynikać z sekcji
  "Dlaczego tyle" (`mechanizmy.md` §9), liczba i uzasadnienie muszą pasować.

### Progi psychologiczne

Ceny są czytane od lewej: 19 800 zł jest księgowane w kategorii "kilkanaście
tysięcy", 20 200 zł, "dwadzieścia parę". Jeśli cena wypada tuż nad okrągłym
progiem (10 000, 20 000, 50 000, 100 000), sprawdź, czy da się zejść pod próg
bez cięcia marży, różnica percepcyjna jest większa niż arytmetyczna.

Ale: **nie stosuj końcówek "99" w B2B.** 19 999 zł to rama promocyjna z
supermarketu; w ofercie dla firmy czyta się jako tania sztuczka i gryzie się
z tonem eksperckim. Schodź pod próg naturalnie: 19 400, 19 800.

### Kolejność prezentacji

W układzie pionowym (dokument, mail): **od najdroższej do najtańszej**.
Pierwsza zobaczona liczba kotwiczy (`mechanizmy.md` §3), gdy jest nią górna
cena, każda kolejna jest ulgą; gdy dolna, każda kolejna jest podwyżką.
W układzie kolumnowym (tabela, strona WWW) kotwiczy kolumna czytana pierwsza,
czyli lewa, górny pakiet z lewej albo, jeśli szablon wyróżnia środek
(jak `assets/szablon-oferty.html`), góra z lewej, środek wyróżniony centralnie,
dół z prawej.

---

## 3. Wabik w praktyce

Mechanizm i przykład The Economist: `mechanizmy.md` §2. Tu, jak go policzyć.

Wabik to opcja **zdominowana asymetrycznie**: kosztuje niewiele mniej niż cel,
daje wyraźnie mniej. Jako hipotezę do testu można zbudować wabik jako **dół
podciągnięty cenowo bliżej środka** (około 0.75-0.85× zamiast wyjściowego
0.5-0.65×), wtedy dopłata do środka może wyglądać na oczywistą okazję. Uwaga:
to zmienia rolę dołu z "punktu odniesienia" na "wabik", nie próbuj obu naraz
w jednym pakiecie.

### Przykład 1, usługa B2B (audyt procesów)

```
Audyt + raport rekomendacji                     24 000 zł   ← wabik
Audyt + raport + wdrożenie 3 kluczowych zmian   29 000 zł   ← cel
Audyt + wdrożenie całości + opieka 6 mies.      59 000 zł   ← kotwica
```

Wdrożenie trzech zmian "za 5 000 zł" przy audycie za 24 000 wygląda na okazję, 
i klient, który przyszedł "tylko po audyt", dopłaca. Wabik jest uczciwy: firma
z własnym zespołem wdrożeniowym racjonalnie weźmie sam raport.

### Przykład 2, SaaS (per user / miesiąc)

```
Starter ,  89 zł/user, 5 użytkowników max, bez API, bez SSO     ← wabik
Team    , 109 zł/user, bez limitu, API, SSO, priorytetowy support ← cel
Enterprise, 219 zł/user, + SLA 99.9%, dedykowany opiekun, audyt logów ← kotwica
```

Różnica 20 zł/user między Starter a Team jest mała na tle tego, co Starter
odbiera (limit użytkowników + API + SSO, rzeczy, których dół nie ma WCALE,
patrz sekcja 4). Firma powyżej 5 osób nie ma wyboru arytmetycznego, ale
mikrozespół 3-osobowy racjonalnie zostanie na Starterze, więc wabik przechodzi
test wiarygodności.

### Przykład 3, szkolenia

```
Szkolenie 2-dniowe (do 12 osób)                        14 500 zł  ← wabik
Szkolenie 2-dniowe + 3 warsztaty wdrożeniowe online    17 900 zł  ← cel
Program 3-miesięczny: szkolenie + warsztaty + audyt
efektów + indywidualne konsultacje dla liderów         39 000 zł  ← kotwica
```

Trzy warsztaty wdrożeniowe "za 3 400 zł" to jednostkowo ~1 130 zł za warsztat, 
klient, który wie, że samo szkolenie bez wdrożenia wyparowuje w dwa tygodnie,
dopłaca bez oporu. Samo szkolenie pozostaje racjonalne dla firmy, która ma
własny follow-up.

### Test wiarygodności wabika

Przed oddaniem oferty odpowiedz konkretnie na pytanie z `mechanizmy.md` §2:
**"opisz jednego realnego klienta, dla którego wabik jest racjonalnym
wyborem"**. Odpowiedź musi być profilem, nie wykrętem:

- "Firma z własnym zespołem wdrożeniowym", przechodzi.
- "Ktoś, kto ma mało pieniędzy", nie przechodzi (to powód, żeby nie kupić
  wcale, nie żeby kupić *tę* konfigurację).
- "Nikt, ale ma wyglądać tanio", usuń wabik. Rekwizyt wykryty przez klienta
  kosztuje zaufanie do wszystkich liczb w dokumencie, a to droższe niż
  przesunięcie kilku wyborów.

Drugi test: **odległość cenowa**. Wabik za 20 990 zł przy celu za 21 000 zł
jest przezroczysty. Jako punkt wyjścia do testu przyjmij około 0.75-0.9× ceny
celu, a potem sprawdź reakcję klientów. Bliżej, widać szwy; dalej, przestaje
dominować i staje się zwykłym dołem.

---

## 4. Różnicowanie jakościowe pakietów

Kluczowa reguła z `mechanizmy.md` §1: gdy pakiety różnią się tylko ilością
(te same rzeczy, więcej sztuk), klient liczy cenę jednostkową i wybiera po niej, 
efekt kompromisu gaśnie, bo nie ma czego być kompromisem. Środek musi zawierać
rzeczy, których dół **nie ma wcale**, nie tylko "ma mniej".

Dlaczego to działa: brak jest nieporównywalny. "5 vs 10 raportów" da się
przeliczyć na złotówki za raport i zbić cenę. "Brak dostępu do API vs API"
nie ma ceny jednostkowej, klient musi ocenić, czy tego *potrzebuje*, a to
przenosi rozmowę z arytmetyki na wartość. Dodatkowo brak uruchamia awersję do
straty (`mechanizmy.md` §4): rezygnacja z czegoś nazwanego boli bardziej niż
zmniejszenie liczby sztuk.

### Tabela wzorcowa

| Element | Dół | Środek | Góra | Typ różnicy |
|---|---|---|---|---|
| Rdzeń usługi (to, po co klient przyszedł) | ✓ | ✓ | ✓ | wspólny, buduje zaufanie do dołu |
| Warsztaty wdrożeniowe | brak | 3 | 6 | dół: WCALE; góra: więcej |
| Dedykowany opiekun / kanał kontaktu | brak | ✓ | ✓ | jakościowa |
| Czas reakcji supportu | 72 h | 24 h | 4 h | ilościowa, ale odczuwalna skokowo |
| Integracje / API | brak | ✓ | ✓ | jakościowa |
| Gwarancja / SLA | brak | poprawki 30 dni | SLA + kary umowne | jakościowa, rosnąca |
| Raportowanie | podstawowe | rozszerzone | + przegląd kwartalny na żywo | mieszana |

Zasady czytania tej tabeli przy budowie własnej:

- **Granica dół/środek: co najmniej dwie różnice typu "WCALE"**, to one
  sprzedają środek.
- **Granica środek/góra: dokładaj wygodę, tempo i bezpieczeństwo**, nie kolejne
  rdzenie usługi. Góra ma być "to samo, ale bez czekania i bez ryzyka", wtedy
  środek nie wygląda na okrojony.
- **Rdzeń wszędzie.** Jeśli dół nie rozwiązuje problemu w ogóle, nie jest
  opcją, tylko dekoracją, patrz test uczciwości dołu w sekcji 1.

### Nazwy pakietów

**Nie: Gold / Silver / Bronze, Basic / Pro / Premium.** Dwa powody:

1. Nazwy hierarchiczne komunikują wyłącznie "gorszy/lepszy", klient wybierający
   dół musi przyznać przed sobą (i przed szefem), że wziął "brązowy". To
   niepotrzebnie podnosi koszt psychiczny każdego wyboru poza górą, a decydent
   i tak minimalizuje ryzyko krytyki (`mechanizmy.md` §1).
2. Nic nie mówią o zawartości, nie pomagają w samoselekcji, więc klient musi
   przeczytać całą tabelę, żeby wiedzieć, gdzie pasuje. Każdy dodatkowy wysiłek
   poznawczy to podatek od decyzji (`mechanizmy.md` §10).

**Tak: nazwy od rezultatu albo profilu klienta.** Klient czyta nazwę i sam się
w niej rozpoznaje, wybór zaczyna się od identyfikacji, nie od porównywania cen:

| Zamiast | Użyj (rezultat) | Użyj (profil) |
|---|---|---|
| Basic | Diagnoza | Dla zespołu, który wdroży sam |
| Pro | Wdrożenie | Dla firm 10-50 osób |
| Premium | Wdrożenie + Opieka | Dla organizacji z wymogami SLA |

Nazwa profilowa ma dodatkową zaletę: zdanie "rekomendowany dla firm waszej
wielkości" przy środku (`mechanizmy.md` §6) przestaje być doklejoną etykietą, 
wynika z samej nazwy.

---

## 5. Framing ceny

Ta sama kwota w różnych ramach to różne decyzje (`mechanizmy.md` §14). Dobór
ramy jest częścią wyceny, nie kosmetyką.

### Dobór jednostki

Reguła: **jednostka ceny = jednostka, w której klient księguje tę kategorię
wydatku**. Nie ta, w której cena wygląda najmniejsza.

- **Miesięcznie**, subskrypcje, usługi ciągłe, wszystko, co konkuruje z innymi
  pozycjami miesięcznego budżetu operacyjnego (narzędzia, abonamenty).
- **Rocznie**, gdy klient budżetuje rocznie (korporacje, sektor publiczny)
  albo gdy chcesz zestawić cenę z rocznym kosztem problemu.
- **Za projekt**, przedsięwzięcia z początkiem i końcem. Klient kupuje
  rezultat, więc cena za rezultat; stawka godzinowa przy projekcie przenosi
  uwagę z "co dostanę" na "ile wam to zajmie" i zaprasza do audytowania godzin.
- **Per user**, SaaS i licencje, bo tak klient skaluje koszt w głowie. Przy
  dużych wolumenach pokaż też sumę, dyrektor finansowy i tak ją policzy,
  lepiej, żeby zobaczył ją z twoim komentarzem niż w swoim arkuszu bez niego.
- **Vs koszt etatu**, usługi zastępujące zatrudnienie ("mniej niż pół etatu
  specjalisty, bez rekrutacji i urlopów").

Nie mieszaj jednostek między pakietami, pakiety wyceniane w różnych jednostkach
są nieporównywalne, a nieporównywalność zabija cały układ trzech opcji.

### Partycjonowanie vs cena łączna

Reguła bazowa ze `SKILL.md` (krok 4): **straty razem, korzyści osobno**. Jedna
łączna cena; korzyści rozpisane w punktach. Trzy pozycje cenowe czytają się jak
trzy osobne ukłucia, nawet gdy suma jest identyczna.

Kiedy jednak partycjonować cenę:

- **Etapy z punktem wyjścia**, rozbicie na etapy jest tu odwróceniem ryzyka
  (`mechanizmy.md` §8): "etap 1: 12 000 zł, po nim decyzja o kontynuacji"
  zmniejsza kwotę decyzji z 47 000 do 12 000 zł. To nie trzy ukłucia, to jedno
  małe zamiast jednego dużego.
- **Pozycja, którą klient chce widzieć osobno**, np. licencje stron trzecich,
  które kupiłby i tak; oddzielenie ich pokazuje, że twoja praca kosztuje mniej,
  niż sugeruje suma.
- **Nigdy nie partycjonuj drobnicy.** "Zarządzanie projektem: 3 200 zł" jako
  osobna linia zaprasza do wykreślenia ("tym zajmie się nasz PM"). Drobne
  składniki chowaj w cenie łącznej, a w "Dlaczego tyle" pokaż strukturę bez
  przypisywania kwot pozycjom.

### Rabat roczny w SaaS: hipoteza porównania wielkości liczby

W punkcie wyjścia do testu prezentuj rabat za płatność roczną jednostką większą
optycznie:

- **Przy cenie poniżej około 100 zł/mies.: przetestuj rabat procentowo.**
  "-20%" może brzmieć lepiej niż "-22 zł/mies.".
- **Przy cenie powyżej około 100 zł/mies. i przy kwocie rocznej: przetestuj
  rabat kwotowo.** "Oszczędzasz 2 616 zł rocznie" może silniej wybrzmieć niż
  "-20%", ponieważ 2 616 > 20 w szybkim odbiorze wielkości liczby.

To nie jest „reguła 100", tylko hipoteza do sprawdzenia na własnej grupie
odbiorców i cenie. Ludzie mogą porównywać nominalne wielkości liczb, zanim
przetworzą jednostki. Przy okazji: rabat roczny zawsze z powodem
(`mechanizmy.md` §9), "płatność roczna zdejmuje z nas koszt obsługi 12 faktur
i ryzyko odejść, dzielimy się tą oszczędnością", inaczej uczy, że ceny są
miękkie (patrz sekcja 7).

### Zestawienie ceny z kosztem problemu

Cena nie może być pierwszą ani jedyną liczbą w dokumencie. Zanim czytający
do niej dotrze, musi mieć w głowie większą liczbę z sekcji "Stawka": koszt
bezczynności policzony z jego danych (`mechanizmy.md` §3 i §4). Przy samej
cenie domknij porównanie jednym zdaniem: "39 000 zł wobec ok. 340 000 zł
rocznie, które ten proces kosztuje dziś, zwraca się w drugim miesiącu".
Rama zwrotu ("zwraca się po X") przenosi cenę z kieszeni "wydatek" do kieszeni
"inwestycja", a inwestycji się nie zbija, inwestycję się ocenia.

### Cena wejściowa w prozie: „od X", nie „za X"

Gdy w tekście ciągłym (karta usługi, hero, akapit oferty, mail) przywołujesz
najniższą cenę jako punkt wejścia do oferty, pisz „od 3 900 zł", nie „za 3 900 zł".
„od X" kotwiczy próg, od którego zaczyna się rozmowa, i zostawia otwartą górę
drabinki, po której klient sam wędruje w górę. „za X" przykleja cenę do jednej
konkretnej rzeczy, gubi kotwicę dostępności i podpowiada, że to już cała oferta.
Reguła dotyczy zapowiedzi ceny w zdaniu; w samej tabeli pakietów każdy pakiet ma
swoją dokładną cenę bez „od" (wyjątek: pakiet z wyceną indywidualną, np.
„od 14 900 zł"). To ten sam podział co Test 2 w SKILL.md: „od X" tylko dla etapu
wejściowego albo wyceny zakresowej (przypadki B i C), nigdy dla pakietu o
uzgodnionym zakresie (przypadek A). Gdy piszesz kartę pakietu, obowiązuje reguła
tabeli, nie ta z prozy.

---

## 6. Kiedy NIE robić trzech pakietów

Trzy pakiety to narzędzie do sytuacji, w której klient ma swobodę wyboru
zakresu. Gdy jej nie ma, układ trzech opcji szkodzi. Nie stosuj go, gdy:

- **Przetarg / RFP / zamówienie publiczne.** Zamawiający oczekuje jednej ceny
  za wyspecyfikowany zakres; trzy pakiety to w najlepszym razie błąd formalny,
  w najgorszym, odrzucenie oferty (`mechanizmy.md` §5, wyjątek).
- **Klient przyszedł z gotową specyfikacją.** Proponowanie trzech wariantów
  komunikuje "nie przeczytaliśmy twojej specyfikacji". Wyceniaj to, o co prosi;
  wariant zaproponuj co najwyżej jako opcjonalne rozszerzenie po cenie głównej.
- **Bardzo małe zlecenie.** Przy zleceniu za 2 000 zł koszt przeczytania
  i porównania trzech opcji jest nieproporcjonalny do decyzji, architektura
  wyboru droższa niż wybór. Jedna cena, jedno zdanie uzasadnienia.
- **Kontynuacja współpracy.** Stały klient zamawiający kolejny etap ma już
  punkt odniesienia: poprzednie rozliczenia. Trzy pakiety wyglądają, jakbyś
  sprzedawał mu od nowa coś, co już kupił, i zapraszają do renegocjacji
  warunków, które były ustalone.

**Co zamiast tego: jedna cena z mocnym reason-why** (`mechanizmy.md` §9).
Cała siła, którą normalnie daje porównanie między pakietami, musi wtedy przyjść
z dwóch źródeł: uzasadnienia ceny (z czego się składa, co ją zmienia) oraz
zewnętrznego punktu odniesienia (koszt problemu, koszt alternatywy, poprzedni
etap). Sekcja "Dlaczego tyle" przestaje być opcjonalna, jest jedyną obroną
ceny. Do tego jedno opcjonalne rozszerzenie ("jeśli chcecie też X: +7 400 zł")
zachowuje odrobinę architektury wyboru bez mnożenia kolumn.

---

## 7. Przygotowanie na negocjacje

Negocjacje projektuje się **przed** wysłaniem oferty, nie w ich trakcie.
Dwie zasady i jedna lista.

### Zasada 1: cena nigdy nie spada bez wyjęcia zakresu

"Wersja tańsza = węższa, nie ta sama taniej." Gdy klient prosi o rabat,
odpowiedź brzmi: "możemy zejść do X, wyjmując z zakresu A i B; która wersja
lepiej pasuje?".

Dlaczego to żelazna reguła: rabat bez zmiany zakresu jest **dowodem, że
pierwsza cena była zawyżona**. Klient uczy się w jednej chwili trzech rzeczy:
że twoje ceny mają zapas, że zapas oddaje się temu, kto naciska, i że przy
następnym projekcie trzeba nacisnąć od razu. Jednym rabatem dewaluujesz
wszystkie przyszłe wyceny, łącznie z sekcją "Dlaczego tyle", która właśnie
okazała się fikcją. Cena związana z zakresem jest natomiast spójna z reason-why:
skoro cena wynika z zawartości, mniejsza zawartość = mniejsza cena, ta sama
zawartość = ta sama cena. Rozmowa schodzi z "czy zejdziecie" na "co wyjmujemy", 
a w tej rozmowie obie strony pracują na tym samym dokumencie, nie przeciw sobie.

Praktycznie: przygotuj z użytkownikiem **zawczasu** listę 2-3 elementów środka,
które da się wyjąć z wyraźną obniżką (i których wyjęcie boli klienta na tyle,
że często rezygnuje z rabatu). Zauważ, że dolny pakiet już jest taką
przygotowaną odpowiedzią, "jest wersja tańsza, nazywa się [dół], oto czego
w niej nie ma".

### Zasada 2: rabat wymienia się, nie oddaje

Jeśli ustępstwo cenowe jest strategicznie uzasadnione (logo otwierające rynek,
pierwszy projekt w nowej branży), nie może być darmowe, darmowe ustępstwo
uczy tego samego, co rabat bez powodu. Wymień je na coś o realnej wartości:

- **krótszy termin płatności**, przedpłata albo 7 dni zamiast 30/60; gotówka
  dziś ma policzalną wartość,
- **zgoda na referencję**, nazwa firmy i cytat do wykorzystania publicznie,
- **case study z liczbami**, zgoda na opisanie projektu z danymi przed/po
  (to zasypuje lukę dowodową z `mechanizmy.md` §7),
- **dłuższy kontrakt**, 12 miesięcy zamiast 3; niższa cena za niższe ryzyko
  pustych mocy jest uczciwym reason-why, nie rabatem,
- **większy wolumen / drugi projekt**, rabat wolumenowy ma wbudowane
  uzasadnienie,
- **elastyczny termin startu**, projekt "wypełniacz" między innymi projektami
  realnie kosztuje mniej.

Każdą wymianę nazwij wprost w rozmowie: "przy płatności z góry i zgodzie na
case study możemy zejść do X, ponieważ …". Ustępstwo z uzasadnieniem nie
podważa cennika, potwierdza go.

### Przygotuj to w ofercie, zanim padnie pytanie

Najtańsza obrona przed negocjacją to dokument, który ją uprzedza: sekcja
"Dlaczego tyle" z widoczną strukturą ceny, dolny pakiet jako gotowa "wersja
tańsza", oraz FAQ z wpisem w rodzaju "Czy cena podlega negocjacji?, Cena
wynika z zakresu; możemy dopasować zakres do budżetu". Klient, który to
przeczytał, wchodzi w rozmowę o zakresie, nie o rabacie, i o to chodziło.
