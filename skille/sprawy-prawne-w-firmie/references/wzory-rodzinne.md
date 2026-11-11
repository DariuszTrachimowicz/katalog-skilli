# Wzory pism rodzinnych

Wczytaj, gdy użytkownik prosi o pismo do sądu w sprawie rodzinnej (alimenty, rozwód, separacja, dzieci, majątek małżonków). To sprawy prywatne, poza modułami tego skilla: nie prowadzisz ich analizy i nie oceniasz szans. Układasz pismo z wzoru, z faktów użytkownika, zawsze jako poziom B z `pisma.md`; przepisy prawa rodzinnego sprawdzasz we wbudowanym Kodeksie rodzinnym i opiekuńczym (akt KRO).

## Spis treści

1. Zasady dla pism rodzinnych
2. Wspólny początek pisma
3. Pozew o alimenty
4. Pozew o podwyższenie albo obniżenie alimentów
5. Pozew o ustalenie wygaśnięcia obowiązku alimentacyjnego
6. Odpowiedź na pozew w sprawie rodzinnej
7. Pozew o rozwód albo separację
8. Wniosek o uregulowanie kontaktów z dzieckiem
9. Wnioski o władzę rodzicielską
10. Wniosek o rozstrzygnięcie w istotnej sprawie dziecka
11. Wniosek o zezwolenie na czynność przekraczającą zwykły zarząd majątkiem dziecka
12. Pozew o ustalenie albo zaprzeczenie ojcostwa
13. Pozew o ustanowienie rozdzielności majątkowej
14. Wniosek o podział majątku wspólnego
15. Wnioski o zezwolenie na zawarcie małżeństwa

## 1. Zasady dla pism rodzinnych

- **Powiedz to raz, na początku odpowiedzi:** sprawa rodzinna jest poza zakresem skilla dla firm, więc dostajesz projekt pisma ułożony z urzędowego wzoru i z Twoich faktów, z przepisami sprawdzonymi w tekście kodeksu, ale bez analizy sprawy i orzecznictwa. Przy rozwodzie i separacji wskaż skill `rozwod-za-porozumieniem`, jeśli jest dostępny.
- **Przepisy.** Kodeks rodzinny i opiekuńczy jest wbudowany (`akty/KRO.md`): każdy przepis prawa rodzinnego, który podajesz w odpowiedzi albo w piśmie, najpierw znajdujesz w tym pliku i czytasz cały artykuł, tak jak przepisy procedury w KPC; nic z pamięci. Skill nie ma modułu ani rejestru orzeczeń dla spraw rodzinnych, więc nie podajesz orzecznictwa, widełek kwot ani „typowych” rozstrzygnięć; czego w tekście kodeksu nie ma, oznaczasz `[WYMAGA WERYFIKACJI: co, gdzie]`.
- **Fakty tylko od użytkownika.** Nie dopisujesz kosztów utrzymania, zarobków, przyczyn rozpadu małżeństwa, zachowań drugiej strony ani dat. Kwot alimentów nie proponujesz i nie wyliczasz „typowych”; wpisujesz kwotę podaną przez użytkownika albo `[UZUPEŁNIJ: kwota]`.
- **Jedno żądanie na wybór.** Urzędowe wzory mają warianty („bez orzekania o winie/z winy pozwanego”, „pozbawienie/ograniczenie/zawieszenie”). O wybór pytasz użytkownika jednym pytaniem i wpisujesz jeden wariant; nie zostawiasz ukośników ani gwiazdek i nie wybierasz za niego.
- **Dane dzieci i zdrowie.** W piśmie są tylko dane, których to pismo wymaga i które podał użytkownik. W odpowiedzi obok pisma nie powtarzasz numerów PESEL, adresów ani informacji o zdrowiu.
- **Zagrożenie.** Gdy z opisu wynika przemoc, groźby albo zagrożenie dziecka, najpierw podajesz numer alarmowy 112 i mówisz, żeby nie czekać z pomocą na pismo; projekt przygotowujesz potem.
- **Kiedy prawnik.** Zawsze karta dla prawnika przy sporze o winę, o dzieci, o władzę rodzicielską, o ojcostwo i o majątek o dużej wartości oraz gdy druga strona ma pełnomocnika.
- **Źródło.** Układ według kart usług Ministerstwa Sprawiedliwości (serwis wsoi.ms.gov.pl), pobranych 4 października 2026 r.; numer karty stoi przy wzorze. Zasady użycia wzorów, układ strony i skrypt DOCX: `wzory-pism.md`, punkty 1 i 2.

## 2. Wspólny początek pisma

W procesie strony to powód i pozwany; numer PESEL w pierwszym piśmie podaje o sobie powód (KPC art. 126 § 2), numeru drugiej strony nie wpisujesz, jeśli użytkownik go nie podał. W postępowaniu nieprocesowym (wzory 8-11, 14 i 15) są to wnioskodawca i uczestnicy, a wniosek spełnia wymogi pozwu z tą zmianą, że zamiast pozwanego wymienia się zainteresowanych w sprawie (KPC art. 511 § 1). Wymogi pozwu i pierwszego pisma: KPC art. 187 § 1 i KPC art. 126 § 1 i 2.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd]
[UZUPEŁNIJ: wydział rodzinny i nieletnich albo cywilny]
[UZUPEŁNIJ: adres sądu]

@strony:
Powód: [UZUPEŁNIJ: imię i nazwisko; przy dziecku także: reprezentowany przez matkę albo ojca, imię i nazwisko]
[UZUPEŁNIJ: adres zamieszkania]
[UZUPEŁNIJ: PESEL]
Pozwany: [UZUPEŁNIJ: imię i nazwisko]
[UZUPEŁNIJ: adres zamieszkania]
[UZUPEŁNIJ: PESEL, jeśli znany]
```

Dalej idzie część właściwa wzoru (od `@wps` albo `@tytul`), a na końcu:

```
@podpis:
[UZUPEŁNIJ: imię i nazwisko osoby podpisującej]

@zalaczniki:
[UZUPEŁNIJ: załączniki z wzoru, każdy w osobnej linii]
```

W każdym pozwie i wniosku, po punktach żądania, stoi zdanie o mediacji: `Strony [UZUPEŁNIJ: podjęły próbę mediacji albo innego pozasądowego rozwiązania sporu z wynikiem …; albo: nie podjęły takiej próby, ponieważ …].` (KPC art. 187 § 1).

## 3. Pozew o alimenty

Karta 61/K/UU/SR, sąd rejonowy, wydział rodzinny i nieletnich. Podstawy: obowiązek rodziców wobec dziecka, które nie może jeszcze utrzymać się samodzielnie, chyba że dochody z majątku dziecka wystarczają na jego utrzymanie i wychowanie (KRO art. 133 § 1), zakres według usprawiedliwionych potrzeb uprawnionego i możliwości zarobkowych i majątkowych zobowiązanego (KRO art. 135 § 1), niezaspokojone potrzeby sprzed pozwu jako odpowiednia suma (KRO art. 137 § 2). Powództwo można wytoczyć według miejsca zamieszkania osoby uprawnionej (KPC art. 32). Wartość przedmiotu sporu to suma świadczeń za rok, a gdy świadczenia mają trwać krócej niż rok, za cały czas ich trwania (KPC art. 22). Wyrokowi zasądzającemu alimenty sąd nadaje rygor natychmiastowej wykonalności z urzędu w zakresie z KPC art. 333 § 1. Czy pozew podlega opłacie: `[WYMAGA WERYFIKACJI: akt KOSZTY]`.

```
@wps: Wartość przedmiotu sporu: [UZUPEŁNIJ: suma świadczeń za rok albo za krótszy okres żądania, w pełnych złotych]

@tytul: POZEW O ALIMENTY

Wnoszę o:

1. zasądzenie od pozwanego na rzecz powoda [UZUPEŁNIJ: imię i nazwisko uprawnionego, data urodzenia] alimentów w kwocie [UZUPEŁNIJ: kwota] zł (słownie: [UZUPEŁNIJ: kwota słownie]) miesięcznie, płatnych z góry do [UZUPEŁNIJ: dzień] dnia każdego miesiąca [UZUPEŁNIJ: do rąk przedstawiciela ustawowego albo na rachunek bankowy nr …], poczynając od dnia [UZUPEŁNIJ: data], z ustawowymi odsetkami za opóźnienie w razie opóźnienia w płatności którejkolwiek raty;
2. nadanie wyrokowi rygoru natychmiastowej wykonalności;
3. wydanie wyroku zaocznego, gdy zajdą do tego przesłanki;
4. zasądzenie od pozwanego kosztów procesu według norm przepisanych.

# UZASADNIENIE

[UZUPEŁNIJ: kim są strony dla siebie i z kim mieszka uprawniony]

[UZUPEŁNIJ: miesięczne koszty utrzymania uprawnionego, pozycja po pozycji, z dowodem]

[UZUPEŁNIJ: sytuacja rodzinna, zarobkowa i majątkowa każdego z rodziców albo zobowiązanego: praca, zarobki, majątek, zobowiązania, inne osoby na utrzymaniu, z dowodem]

[UZUPEŁNIJ: ile pozwany łoży dotychczas i od kiedy nie łoży]
```

Załączniki: odpis aktu urodzenia dziecka, dowody z uzasadnienia, odpis pozwu z załącznikami dla pozwanego.

## 4. Pozew o podwyższenie albo obniżenie alimentów

Karty 62/K/UU/SR (podwyższenie) i 63/K/UU/SR (obniżenie). Według kart usług w uzasadnieniu wykazuje się zmianę, która zaszła od poprzedniego wyroku albo ugody, po stronie potrzeb uprawnionego albo możliwości zarobkowych i majątkowych zobowiązanego. Podstawa: w razie zmiany stosunków można żądać zmiany orzeczenia albo umowy o alimentach (KRO art. 138), a zakres alimentów zależy od usprawiedliwionych potrzeb uprawnionego i od zarobkowych i majątkowych możliwości zobowiązanego (KRO art. 135 § 1). Opisujesz stan z dnia poprzedniego orzeczenia i stan obecny, oba z faktów użytkownika. Przy obniżeniu wartość przedmiotu sporu liczy się od różnicy kwot: `[WYMAGA WERYFIKACJI: sposób liczenia wartości przedmiotu sporu i opłata, akt KOSZTY i KPC art. 22]`.

```
@wps: Wartość przedmiotu sporu: [UZUPEŁNIJ: kwota w pełnych złotych]

@tytul: POZEW O [UZUPEŁNIJ: PODWYŻSZENIE albo OBNIŻENIE] ALIMENTÓW

Wnoszę o:

1. [UZUPEŁNIJ: podwyższenie albo obniżenie] alimentów ustalonych [UZUPEŁNIJ: wyrokiem albo ugodą] [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data], sygn. akt [UZUPEŁNIJ: sygnatura], od [UZUPEŁNIJ: zobowiązany] na rzecz [UZUPEŁNIJ: uprawniony], z kwoty [UZUPEŁNIJ: kwota] zł miesięcznie do kwoty [UZUPEŁNIJ: kwota] zł (słownie: [UZUPEŁNIJ: kwota słownie]) miesięcznie, płatnej z góry do [UZUPEŁNIJ: dzień] dnia każdego miesiąca, poczynając od dnia [UZUPEŁNIJ: data], z ustawowymi odsetkami za opóźnienie w razie opóźnienia w płatności którejkolwiek raty;
2. zasądzenie od pozwanego na rzecz powoda kosztów procesu według norm przepisanych;
3. rozpoznanie sprawy także pod nieobecność powoda.

# UZASADNIENIE

[UZUPEŁNIJ: poprzednie orzeczenie albo ugoda i sytuacja stron w tamtym czasie]

[UZUPEŁNIJ: co się zmieniło i od kiedy: potrzeby uprawnionego albo zarobki, zdrowie, praca i zobowiązania zobowiązanego, z dowodem]

[UZUPEŁNIJ: obecna sytuacja rodzinna, zarobkowa i majątkowa stron, z dowodem]
```

Załączniki: dowód uiszczenia opłaty od pozwu (jeśli wymagana), odpis poprzedniego wyroku albo ugody, dowody z uzasadnienia (np. zaświadczenie o zarobkach, zaświadczenie z urzędu pracy, rachunki, dokumentacja lekarska), odpis pozwu z załącznikami.

## 5. Pozew o ustalenie wygaśnięcia obowiązku alimentacyjnego

Karta 64/K/UU/SR. Według karty uzasadnienie pokazuje zmianę, z której powód wywodzi ustanie obowiązku (np. zakończenie nauki, podjęcie pracy), i dzień, od którego obowiązek ma być uznany za wygasły. Rodzice są obowiązani do alimentów wobec dziecka, które nie jest jeszcze w stanie utrzymać się samodzielnie, chyba że dochody z majątku dziecka wystarczają na jego utrzymanie i wychowanie; wobec dziecka pełnoletniego mogą się od nich uchylić, gdy są połączone z nadmiernym dla nich uszczerbkiem albo dziecko nie dokłada starań, żeby móc utrzymać się samodzielnie (KRO art. 133 § 1 i 3). Te przepisy nie podają wieku, w którym obowiązek ustaje (KRO art. 133 § 1 i 3), więc o wyniku decydują fakty i dowody. Roszczenia o alimenty przedawniają się z upływem trzech lat (KRO art. 137 § 1); to ważne przy zaległościach.

```
@wps: Wartość przedmiotu sporu: [UZUPEŁNIJ: kwota w pełnych złotych]

@tytul: POZEW O USTALENIE WYGAŚNIĘCIA OBOWIĄZKU ALIMENTACYJNEGO

Wnoszę o:

1. ustalenie, że obowiązek alimentacyjny powoda wobec pozwanego, ustalony [UZUPEŁNIJ: wyrokiem albo ugodą] [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data], sygn. akt [UZUPEŁNIJ: sygnatura], wygasł z dniem [UZUPEŁNIJ: data];
2. zasądzenie od pozwanego na rzecz powoda kosztów procesu według norm przepisanych;
3. rozpoznanie sprawy także pod nieobecność powoda.

# UZASADNIENIE

[UZUPEŁNIJ: poprzednie orzeczenie albo ugoda]

[UZUPEŁNIJ: co się zmieniło po stronie uprawnionego i od kiedy, z dowodem]
```

Załączniki: dowód uiszczenia opłaty od pozwu, odpis wyroku albo ugody, dowody z uzasadnienia, odpis pozwu z załącznikami.

## 6. Odpowiedź na pozew w sprawie rodzinnej

Użyj wzoru 5 z `wzory-pism.md` (wariant A albo B) z blokiem sądu i stron z pozwu. Termin wyznacza sąd w wezwaniu, a odpowiedź złożona po terminie jest zwracana (KPC art. 205¹ § 1 i 2). Zanim ułożysz uznanie powództwa (wariant B), ustal z użytkownikiem trzy rzeczy i zapisz je w piśmie wprost:

1. od jakiego dnia uznaje żądanie (np. dzień wniesienia pozwu) i czy uznaje je w całości;
2. czego uznanie nie obejmuje: świadczenia wymagalne przed tym dniem, w tym zaległości, zostają należne, jeśli użytkownik tak chce;
3. czy są fakty na to, że pozwany nie dał powodu do wytoczenia sprawy (np. powód nie zwrócił się do niego przed pozwem), bo od nich zależy wniosek o koszty (KPC art. 101).

Uznanie wiąże sąd w sprawie o alimenty i o wygaśnięcie obowiązku alimentacyjnego (KPC art. 213 § 2), a wyrok zasądzający roszczenie uznane przez pozwanego dostaje rygor natychmiastowej wykonalności z urzędu (KPC art. 333 § 1); mówisz to użytkownikowi przed oddaniem pisma. W sprawach o rozwód i separację, o ustanowienie rozdzielności majątkowej oraz o pochodzenie dziecka sąd nie może oprzeć rozstrzygnięcia wyłącznie na uznaniu powództwa ani na przyznaniu faktów (KPC art. 431, KPC art. 452, KPC art. 458 § 1), więc wariantu B tam nie używasz: pozwany przedstawia stanowisko i fakty (wariant A). Gdy sąd w wezwaniu zobowiązał pozwanego do złożenia dokumentów, nie piszesz, że są zbędne, bez decyzji użytkownika: zostawiasz to jako pytanie w karcie.

Odpowiedź z uznaniem powództwa w sprawie o wygaśnięcie albo obniżenie alimentów (strony są osobami fizycznymi, więc bez numerów rejestrowych; pozwany podaje adres):

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd z pozwu]
[UZUPEŁNIJ: wydział]
[UZUPEŁNIJ: adres sądu]

@strony:
Powód: [UZUPEŁNIJ: imię i nazwisko, adres jak w pozwie]
Pozwany: [UZUPEŁNIJ: imię i nazwisko]
[UZUPEŁNIJ: adres zamieszkania]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura z wezwania]

@tytul: ODPOWIEDŹ NA POZEW
@podtytul: w sprawie o [UZUPEŁNIJ: ustalenie wygaśnięcia obowiązku alimentacyjnego albo obniżenie alimentów]

W odpowiedzi na pozew doręczony mi w dniu [UZUPEŁNIJ: data doręczenia], działając we własnym imieniu:

1. uznaję powództwo [UZUPEŁNIJ: w całości albo w części] w ten sposób, że zgadzam się na [UZUPEŁNIJ: jeden wariant. Wygaśnięcie: ustalenie, że obowiązek alimentacyjny powoda wobec mnie, ustalony wyrokiem albo ugodą … z dnia …, sygn. akt …, wygasł z dniem …. Obniżenie: obniżenie alimentów ustalonych wyrokiem albo ugodą … z dnia …, sygn. akt …, z kwoty … zł do kwoty … zł miesięcznie, poczynając od dnia …];
2. oświadczam, że uznanie nie obejmuje świadczeń wymagalnych przed dniem [UZUPEŁNIJ: data], w tym zaległości w kwocie [UZUPEŁNIJ: kwota] zł za okres [UZUPEŁNIJ: okres];
3. wnoszę o [UZUPEŁNIJ: zasądzenie od powoda kosztów procesu albo nieobciążanie mnie kosztami procesu];
4. wnoszę o rozpoznanie sprawy na posiedzeniu niejawnym.

# UZASADNIENIE

[UZUPEŁNIJ: czego dotyczy uznanie i od jakiego dnia]

[UZUPEŁNIJ: czego uznanie nie obejmuje: zaległości, okres, kwota, dowód]

[UZUPEŁNIJ: fakty pokazujące, że pozwany nie dał powodu do wytoczenia sprawy, np. powód nie zwrócił się do pozwanego przed pozwem; uznanie następuje w pierwszym piśmie]

@podpis:
[UZUPEŁNIJ: imię i nazwisko pozwanego]

@zalaczniki:
[UZUPEŁNIJ: dokumenty, których zażądał sąd, i dowody z uzasadnienia]
odpis odpowiedzi na pozew i załączników dla powoda
```

## 7. Pozew o rozwód albo separację

Karty 31/K/UU/SO (rozwód) i 32/K/UU/SO (separacja), sąd okręgowy (KPC art. 17). Właściwy jest wyłącznie sąd, w którego okręgu małżonkowie mieli ostatnie miejsce zamieszkania, jeżeli choć jedno z nich nadal tam mieszka albo ma zwykły pobyt; przy braku tej podstawy sąd miejsca zamieszkania pozwanego, a gdy i tej nie ma, powoda (KPC art. 41). Przed projektem zadaj jedno pytanie o trzy wybory: orzekanie o winie (bez orzekania, z winy pozwanego, z winy obu stron), dzieci (władza rodzicielska, miejsce zamieszkania, kontakty, alimenty) i wspólne mieszkanie. Punkty o dzieciach wypadają, gdy małżonkowie nie mają wspólnych małoletnich dzieci.

```
@tytul: POZEW O [UZUPEŁNIJ: ROZWÓD albo SEPARACJĘ]

Wnoszę o:

1. [UZUPEŁNIJ: rozwiązanie przez rozwód małżeństwa albo orzeczenie separacji małżonków] [UZUPEŁNIJ: imię i nazwisko powoda] i [UZUPEŁNIJ: imię i nazwisko pozwanego], zawartego dnia [UZUPEŁNIJ: data] w Urzędzie Stanu Cywilnego w [UZUPEŁNIJ: miejscowość], nr aktu małżeństwa [UZUPEŁNIJ: numer], [UZUPEŁNIJ: jeden wariant: bez orzekania o winie; z winy pozwanego; z winy obu stron];
2. powierzenie wykonywania władzy rodzicielskiej nad małoletnim [UZUPEŁNIJ: imię i nazwisko, data urodzenia] [UZUPEŁNIJ: jeden wariant: obojgu rodzicom; powodowi; pozwanemu] i ustalenie miejsca zamieszkania dziecka przy [UZUPEŁNIJ: rodzic];
3. ustalenie kontaktów [UZUPEŁNIJ: rodzic] z dzieckiem w ten sposób: [UZUPEŁNIJ: forma, dni, godziny, miejsce, ferie, wakacje i święta];
4. zasądzenie od [UZUPEŁNIJ: rodzic] na rzecz małoletniego [UZUPEŁNIJ: imię i nazwisko] alimentów w kwocie [UZUPEŁNIJ: kwota] zł (słownie: [UZUPEŁNIJ: kwota słownie]) miesięcznie, płatnych z góry do [UZUPEŁNIJ: dzień] dnia każdego miesiąca [UZUPEŁNIJ: do rąk drugiego rodzica albo na rachunek nr …], z ustawowymi odsetkami za opóźnienie w razie opóźnienia w płatności którejkolwiek raty;
5. zasądzenie od pozwanego na rzecz powoda kosztów procesu.

# UZASADNIENIE

[UZUPEŁNIJ: data i miejsce zawarcia małżeństwa, dzieci, umowa majątkowa albo jej brak]

[UZUPEŁNIJ: od kiedy i dlaczego małżonkowie nie żyją razem; fakty, nie oceny, z dowodem]

[UZUPEŁNIJ: sytuacja dzieci: z kim mieszkają, kto się nimi zajmuje, koszty utrzymania]

[UZUPEŁNIJ: praca, zarobki i majątek każdego z małżonków]
```

Załączniki: dowód uiszczenia opłaty od pozwu, odpis skrócony aktu małżeństwa, odpisy skrócone aktów urodzenia małoletnich dzieci, dowody z uzasadnienia, odpis pozwu i załączników dla pozwanego. Podstawy: rozwód wymaga zupełnego i trwałego rozkładu pożycia i nie jest dopuszczalny m.in. wtedy, gdy ucierpiałoby dobro wspólnych małoletnich dzieci (KRO art. 56 § 1 i 2); sąd orzeka o winie, chyba że małżonkowie zgodnie żądają zaniechania (KRO art. 57 § 1 i 2); w wyroku rozstrzyga o władzy rodzicielskiej nad wspólnym małoletnim dzieckiem, kontaktach i kosztach jego utrzymania oraz uwzględnia pisemne porozumienie rodziców zgodne z dobrem dziecka (KRO art. 58 § 1); o kontaktach nie orzeka na zgodny wniosek stron (KRO art. 58 § 1b), a o sposobie korzystania ze wspólnego mieszkania orzeka wtedy, gdy małżonkowie je zajmują (KRO art. 58 § 2). Separacja wymaga zupełnego rozkładu pożycia; nie jest dopuszczalna, gdy ucierpiałoby dobro wspólnych małoletnich dzieci albo byłaby sprzeczna z zasadami współżycia społecznego, a małżonkom bez wspólnych małoletnich dzieci sąd może ją orzec na zgodne żądanie (KRO art. 61¹ § 1-3); tryb takiego zgodnego wniosku: `[WYMAGA WERYFIKACJI: KPC, postępowanie nieprocesowe w sprawach o separację]`.

## 8. Wniosek o uregulowanie kontaktów z dzieckiem

Karta 68/K/UU/SR, postępowanie nieprocesowe. Rodzice i dziecko mają prawo i obowiązek utrzymywania kontaktów niezależnie od władzy rodzicielskiej (KRO art. 113 § 1); gdy dziecko mieszka stale u jednego z rodziców i rodzice nie mogą się porozumieć, o kontaktach rozstrzyga sąd opiekuńczy (KRO art. 113¹ § 1). Właściwy wyłącznie jest sąd opiekuńczy miejsca zamieszkania osoby, której postępowanie dotyczy, czyli dziecka, a przy braku miejsca zamieszkania miejsca jej pobytu (KPC art. 569 § 1). Strony: `Wnioskodawca:` i `Uczestnik:`.

```
@tytul: WNIOSEK O UREGULOWANIE KONTAKTÓW Z DZIECKIEM

Wnoszę o:

1. uregulowanie kontaktów wnioskodawcy z małoletnim [UZUPEŁNIJ: imię i nazwisko, data i miejsce urodzenia] w ten sposób, że wnioskodawca będzie się z nim spotykał: [UZUPEŁNIJ: dni tygodnia i godziny, miejsce, z obecnością albo bez obecności drugiego rodzica, ferie, wakacje i święta, kontakt przez telefon albo komunikator];
2. zasądzenie od uczestnika na rzecz wnioskodawcy kosztów postępowania według norm przepisanych.

# UZASADNIENIE

[UZUPEŁNIJ: kim jest wnioskodawca dla dziecka, z kim dziecko mieszka]

[UZUPEŁNIJ: jak wyglądały kontakty dotąd i dlaczego nie dochodzi do nich teraz, z dowodem]

[UZUPEŁNIJ: dlaczego proponowany sposób kontaktów jest wykonalny: praca, odległość, warunki]
```

Załączniki: dowód uiszczenia opłaty od wniosku, odpis aktu urodzenia dziecka, dowody z uzasadnienia, odpisy wniosku i załączników dla uczestników.

## 9. Wnioski o władzę rodzicielską

Karty 65/K/UU/SR (pozbawienie, ograniczenie albo zawieszenie) i 72/K/UU/SR (przywrócenie), postępowanie nieprocesowe, sąd jak we wzorze 8 (KPC art. 569 § 1). Podstawy różnią się przesłankami: zarządzenia przy zagrożeniu dobra dziecka (KRO art. 109 § 1 i 2), zawieszenie przy przemijającej przeszkodzie (KRO art. 110 § 1), pozbawienie przy trwałej przeszkodzie, nadużywaniu władzy albo rażącym zaniedbywaniu obowiązków i przywrócenie po ustaniu przyczyny (KRO art. 111 § 1 i 2); przeczytaj właściwy artykuł, zanim wpiszesz żądanie. To sprawy o najcięższych skutkach dla dziecka: zawsze karta dla prawnika, a przy opisie zagrożenia dziecka najpierw punkt „Zagrożenie” z zasad. Wybór między pozbawieniem, ograniczeniem a zawieszeniem należy do użytkownika po rozmowie z prawnikiem; nie podpowiadasz „mocniejszego” wariantu.

```
@tytul: WNIOSEK O [UZUPEŁNIJ: jeden wariant: POZBAWIENIE; OGRANICZENIE; ZAWIESZENIE; PRZYWRÓCENIE] WŁADZY RODZICIELSKIEJ

Wnoszę o:

1. [UZUPEŁNIJ: jeden wariant: pozbawienie uczestnika władzy rodzicielskiej; ograniczenie władzy rodzicielskiej uczestnika przez …; zawieszenie władzy rodzicielskiej uczestnika; przywrócenie wnioskodawcy władzy rodzicielskiej, której został pozbawiony albo która została ograniczona albo zawieszona orzeczeniem … z dnia …, sygn. akt …] nad małoletnim [UZUPEŁNIJ: imię i nazwisko, data i miejsce urodzenia].

# UZASADNIENIE

[UZUPEŁNIJ: fakty z datami, które uzasadniają wniosek, z dowodem na każdy: dokumenty, świadkowie, interwencje służb]
```

Załączniki: dowód uiszczenia opłaty od wniosku, odpis aktu urodzenia dziecka, przy przywróceniu odpis poprzedniego orzeczenia, dowody z uzasadnienia, odpisy wniosku i załączników dla uczestników.

## 10. Wniosek o rozstrzygnięcie w istotnej sprawie dziecka

Karta 67/K/UU/SR, gdy rodzice nie mogą się porozumieć (np. paszport, wyjazd za granicę, zmiana szkoły, zabieg medyczny, zmiana imienia albo nazwiska): gdy władza rodzicielska przysługuje obojgu rodzicom, o istotnych sprawach dziecka rozstrzygają wspólnie, a przy braku porozumienia sąd opiekuńczy (KRO art. 97 § 1 i 2); najpierw ustal więc, czy drugi rodzic ma władzę rodzicielską. Sąd jak we wzorze 8 (KPC art. 569 § 1).

```
@tytul: WNIOSEK O ROZSTRZYGNIĘCIE W ISTOTNEJ SPRAWIE DZIECKA

Wnoszę o:

1. zezwolenie wnioskodawcy na [UZUPEŁNIJ: dokładnie określona czynność, np. złożenie wniosku o wydanie paszportu] dla małoletniego [UZUPEŁNIJ: imię i nazwisko, data i miejsce urodzenia] bez zgody uczestnika.

# UZASADNIENIE

[UZUPEŁNIJ: czego dotyczy sprawa i dlaczego jest pilna albo potrzebna dziecku]

[UZUPEŁNIJ: kiedy i jak wnioskodawca próbował uzyskać zgodę drugiego rodzica i jaki był wynik, z dowodem]
```

Załączniki: dowód uiszczenia opłaty od wniosku, odpis aktu urodzenia dziecka, dowody z uzasadnienia, odpisy wniosku i załączników dla uczestników.

## 11. Wniosek o zezwolenie na czynność przekraczającą zwykły zarząd majątkiem dziecka

Karta 66/K/UU/SR (np. sprzedaż rzeczy albo nieruchomości dziecka, odrzucenie spadku w imieniu dziecka). Sąd jak we wzorze 8 (KPC art. 569 § 1), ale gdy czynnością jest proste przyjęcie albo odrzucenie spadku, a toczy się postępowanie o stwierdzenie nabycia spadku, zezwolenie wydaje sąd spadku (KPC art. 640¹ § 1). Rodzice nie mogą bez zezwolenia sądu dokonywać czynności przekraczających zwykły zarząd majątkiem dziecka (KRO art. 101 § 3). Wyjątek: gdy dziecko dziedziczy, bo spadek wcześniej odrzucił rodzic, odrzucenie spadku w imieniu dziecka nie wymaga zezwolenia, jeżeli dokonują go rodzice wspólnie albo jedno za zgodą drugiego (oboje z władzą rodzicielską w tym zakresie) i spadek odrzucają też inni zstępni rodziców tego dziecka; przy braku porozumienia rodziców zezwolenie jest potrzebne (KRO art. 101 § 4). Najpierw ustal więc, czy wniosek w ogóle jest potrzebny. Przy odrzuceniu spadku biegnie termin ustawowy: nie podajesz go z pamięci, kierujesz do skilla `spadek-krok-po-kroku`, jeśli jest dostępny, i do prawnika albo notariusza.

```
@tytul: WNIOSEK O ZEZWOLENIE NA DOKONANIE CZYNNOŚCI PRZEKRACZAJĄCEJ ZAKRES ZWYKŁEGO ZARZĄDU MAJĄTKIEM DZIECKA

Wnoszę o:

1. zezwolenie wnioskodawcy na dokonanie w imieniu małoletniego [UZUPEŁNIJ: imię i nazwisko, data i miejsce urodzenia] czynności polegającej na [UZUPEŁNIJ: dokładny opis czynności, przedmiot, cena albo wartość, rachunek dziecka, na który trafią środki].

# UZASADNIENIE

[UZUPEŁNIJ: skąd dziecko ma ten majątek albo spadek, dlaczego czynność jest dla dziecka korzystna, z dowodem]
```

Załączniki: dowód uiszczenia opłaty od wniosku, odpis aktu urodzenia dziecka, dokumenty dotyczące majątku albo spadku, odpisy wniosku i załączników dla uczestników.

## 12. Pozew o ustalenie albo zaprzeczenie ojcostwa

Karty 69/K/UU/SR i 70/K/UU/SR, sąd rejonowy (KPC art. 17), przy ustaleniu można według miejsca zamieszkania osoby uprawnionej (KPC art. 32). Ustalenia ojcostwa mogą żądać dziecko, matka i domniemany ojciec; matka i domniemany ojciec nie mogą pozwać po osiągnięciu przez dziecko pełnoletności, a gdy dziecko zmarło wcześniej, mogą to zrobić do dnia, w którym osiągnęłoby pełnoletność (KRO art. 84 § 1 i 2). Dziecko albo matka pozywa domniemanego ojca, a gdy ten nie żyje, kuratora ustanowionego przez sąd opiekuńczy; domniemany ojciec pozywa dziecko i matkę, gdy matka nie żyje samo dziecko, a gdy dziecko nie żyje kuratora (KRO art. 84 § 3 i 4); po śmierci dziecka, które wytoczyło powództwo, ustalenia mogą dochodzić jego zstępni (KRO art. 84 § 5). Zaprzeczenie ojcostwa: mąż matki i matka mają rok od dnia, w którym dowiedzieli się, że dziecko nie pochodzi od męża matki, nie później niż do pełnoletności dziecka (KRO art. 63, KRO art. 69 § 1), a dziecko rok od dowiedzenia się, liczony najwcześniej od pełnoletności (KRO art. 70 § 1); kogo pozwać, czytasz w tych samych przepisach (KRO art. 69 § 2, KRO art. 70 § 2). Terminy roczne mają wyjątki przy ubezwłasnowolnieniu całkowitym albo chorobie psychicznej uprawnionego, stosowane też odpowiednio do matki i dziecka (KRO art. 64, KRO art. 65, KRO art. 69 § 3, KRO art. 70 § 3). Dzień początkowy terminu ustalasz z faktów użytkownika i podajesz warunkowo; przy zaprzeczeniu ojcostwa od razu karta dla prawnika.

```
@tytul: POZEW O [UZUPEŁNIJ: USTALENIE albo ZAPRZECZENIE] OJCOSTWA

Wnoszę o:

1. ustalenie, że [UZUPEŁNIJ: przy ustaleniu: pozwany, imię i nazwisko, jest ojcem; przy zaprzeczeniu: mąż matki, imię i nazwisko, nie jest ojcem] małoletniego [UZUPEŁNIJ: imię i nazwisko, data i miejsce urodzenia], którego akt urodzenia sporządzono w Urzędzie Stanu Cywilnego w [UZUPEŁNIJ: miejscowość] pod numerem [UZUPEŁNIJ: numer];
2. [UZUPEŁNIJ: przy ustaleniu, jeśli użytkownik tego chce: nadanie dziecku nazwiska …; rozstrzygnięcie o władzy rodzicielskiej; zasądzenie alimentów w kwocie … zł miesięcznie; albo usuń punkt];
3. zasądzenie od pozwanego na rzecz powoda kosztów procesu według norm przepisanych.

# UZASADNIENIE

[UZUPEŁNIJ: fakty z datami i dowody; wnioski dowodowe, w tym o badanie genetyczne, jeśli użytkownik tego chce]
```

Załączniki: dowód uiszczenia opłaty od pozwu (jeśli wymagana), odpis aktu urodzenia dziecka, dowody z uzasadnienia, odpisy pozwu i załączników dla pozwanych.

## 13. Pozew o ustanowienie rozdzielności majątkowej

Karta 71/K/UU/SR, sąd rejonowy (KPC art. 17). Częsty przypadek w firmie: małżonek przedsiębiorcy albo wspólnika chce oddzielić majątek od ryzyka działalności. Rozdzielności można żądać z ważnych powodów (KRO art. 52 § 1). Powstaje ona z dniem oznaczonym w wyroku, a z dniem wcześniejszym niż wytoczenie powództwa sąd może ją ustanowić tylko w wyjątkowych wypadkach, w szczególności gdy małżonkowie żyli w rozłączeniu (KRO art. 52 § 2); przy takim żądaniu karta usługi każe dołączyć dodatkowy odpis pozwu dla prokuratora. Co rozdzielność oznacza dla długów sprzed tej daty i dla wierzycieli, nie przesądzasz: to pytanie do prawnika w karcie. Sąd nie może oprzeć wyroku wyłącznie na uznaniu powództwa ani przyznaniu faktów (KPC art. 452), więc uzasadnienie musi mieć dowody także przy zgodzie małżonka.

```
@tytul: POZEW O USTANOWIENIE ROZDZIELNOŚCI MAJĄTKOWEJ

Wnoszę o:

1. ustanowienie rozdzielności majątkowej między powodem [UZUPEŁNIJ: imię i nazwisko] a pozwanym [UZUPEŁNIJ: imię i nazwisko], pozostającymi w małżeństwie zawartym dnia [UZUPEŁNIJ: data], z dniem [UZUPEŁNIJ: data albo: wytoczenia powództwa];
2. zasądzenie od pozwanego na rzecz powoda kosztów procesu według norm przepisanych.

# UZASADNIENIE

[UZUPEŁNIJ: ważne powody żądania: fakty z datami i dowody, np. separacja faktyczna, zadłużanie się małżonka, brak współdziałania w zarządzie majątkiem]
```

Załączniki: dowód uiszczenia opłaty od pozwu, odpis aktu małżeństwa, dowody z uzasadnienia, odpis pozwu i załączników dla pozwanego.

## 14. Wniosek o podział majątku wspólnego

Karta 36/K/UU/SR, postępowanie nieprocesowe, wydział cywilny. Właściwy jest sąd miejsca położenia majątku, a gdy wspólność ustała przez śmierć jednego z małżonków, sąd spadku (KPC art. 566). W tym postępowaniu sąd rozstrzyga także o nierównych udziałach oraz o zwrocie wydatków i nakładów między majątkiem wspólnym a osobistym (KPC art. 567 § 1), więc pytasz użytkownika, czy zgłasza takie żądania. Wartości składników podaje użytkownik; nie szacujesz ich. Udziały w spółce, przedsiębiorstwo i nieruchomość firmy w majątku wspólnym: karta dla prawnika.

```
@wps: Wartość przedmiotu sprawy: [UZUPEŁNIJ: łączna wartość majątku w pełnych złotych]

@tytul: WNIOSEK O PODZIAŁ MAJĄTKU WSPÓLNEGO

Wnoszę o:

1. ustalenie, że w skład majątku wspólnego wnioskodawcy i uczestnika wchodzą:
  a) [UZUPEŁNIJ: składnik, opis pozwalający go zidentyfikować, wartość];
  b) [UZUPEŁNIJ: kolejny składnik, wartość];
2. podział majątku wspólnego przez [UZUPEŁNIJ: komu który składnik];
3. zasądzenie od [UZUPEŁNIJ: kto] na rzecz [UZUPEŁNIJ: komu] [UZUPEŁNIJ: spłaty albo dopłaty] w kwocie [UZUPEŁNIJ: kwota] zł, płatnej [UZUPEŁNIJ: termin];
4. [UZUPEŁNIJ: żądanie ustalenia nierównych udziałów albo rozliczenia nakładów, albo usuń punkt].

# UZASADNIENIE

[UZUPEŁNIJ: kiedy i jak ustała wspólność majątkowa: rozwód, separacja, umowa albo wyrok, z dowodem]

[UZUPEŁNIJ: skąd pochodzi każdy składnik i dowód własności]

[UZUPEŁNIJ: dlaczego proponowany podział: kto korzysta ze składnika, możliwości spłaty]
```

Załączniki: dowód uiszczenia opłaty od wniosku, dokument, z którego wynika ustanie wspólności majątkowej (np. odpis wyroku rozwodowego), dowody własności składników, pozostałe dowody z uzasadnienia, odpisy wniosku i załączników dla uczestników.

## 15. Wnioski o zezwolenie na zawarcie małżeństwa

Karty 73/K/UU/SR (zwolnienie cudzoziemca od złożenia dokumentu stwierdzającego możność zawarcia małżeństwa) i 74/K/UU/SR (zezwolenie dla małoletniej, która ukończyła 16 lat), postępowanie nieprocesowe, wydział rodzinny i nieletnich. Sąd opiekuńczy może z ważnych powodów zezwolić na zawarcie małżeństwa kobiecie, która ukończyła 16 lat, gdy z okoliczności wynika, że małżeństwo będzie zgodne z dobrem założonej rodziny (KRO art. 10 § 1). Przesłanki zwolnienia cudzoziemca od złożenia dokumentu: `[WYMAGA WERYFIKACJI: Prawo o aktach stanu cywilnego i KPC, akty niewbudowane w tym zakresie]`. Część właściwa (jeden z dwóch tytułów i jedno z dwóch żądań):

```
@tytul: [UZUPEŁNIJ: WNIOSEK O ZWOLNIENIE OD OBOWIĄZKU PRZEDSTAWIENIA DOKUMENTU POTRZEBNEGO DO ZAWARCIA MAŁŻEŃSTWA albo WNIOSEK O ZEZWOLENIE NA ZAWARCIE MAŁŻEŃSTWA]

Wnoszę o:

1. [UZUPEŁNIJ: zwolnienie wnioskodawcy, imię i nazwisko, data i miejsce urodzenia, obywatelstwo, od obowiązku złożenia kierownikowi urzędu stanu cywilnego dokumentu stwierdzającego możność zawarcia małżeństwa według prawa ojczystego z uczestnikiem, imię i nazwisko, data i miejsce urodzenia; albo: zezwolenie wnioskodawczyni, imię i nazwisko, data i miejsce urodzenia, na zawarcie małżeństwa z uczestnikiem, imię i nazwisko, data i miejsce urodzenia].

# UZASADNIENIE

[UZUPEŁNIJ: stan cywilny obojga, okoliczności wniosku, dowody; przy cudzoziemcu: dlaczego nie może uzyskać dokumentu i czy potrzebny jest tłumacz, jakiego języka]
```

Załączniki: dowód uiszczenia opłaty od wniosku, odpisy aktów urodzenia (z tłumaczeniem przysięgłym, gdy są obcojęzyczne), dowody z uzasadnienia, odpisy wniosku i załączników dla uczestników.
