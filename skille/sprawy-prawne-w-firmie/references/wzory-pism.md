# Wzory pism i układ pisma

Wczytaj, gdy przygotowujesz pismo do sądu albo komornika (zawsze poziom B z `pisma.md`) i gdy oddajesz jakiekolwiek pismo jako plik. Wzór daje układ i kolejność elementów; o treści, poziomie i podstawach decydują `pisma.md`, plik modułu i wbudowane akty.

## Spis treści

1. Skąd są wzory i jak ich używać
2. Układ pisma i plik DOCX
3. Pismo procesowe w toku sprawy (wzór ogólny)
4. Pozew o zapłatę
5. Odpowiedź na pozew
6. Sprzeciw od nakazu zapłaty (postępowanie upominawcze)
7. Zarzuty od nakazu zapłaty (postępowanie nakazowe)
8. Sprzeciw od wyroku zaocznego
9. Wniosek o doręczenie wyroku z uzasadnieniem
10. Apelacja
11. Zażalenie
12. Skarga na orzeczenie referendarza sądowego
13. Skarga na czynności komornika
14. Wniosek o klauzulę wykonalności albo stwierdzenie prawomocności
15. Wniosek o sprostowanie oczywistej omyłki
16. Pismo do kontrahenta albo urzędu (układ)
17. Zawiadomienie o przestępstwie (firma pokrzywdzona)
18. Zażalenie na odmowę wszczęcia albo umorzenie postępowania
19. Sprzeciw od wyroku nakazowego
20. Wniosek o rozłożenie grzywny na raty

## 1. Skąd są wzory i jak ich używać

- **Źródło.** Wzory 4, 6-8 i 10-15 odtwarzają układ urzędowych wzorów z kart usług Ministerstwa Sprawiedliwości dla biur obsługi interesantów sądów (serwis wsoi.ms.gov.pl) i wzoru Sądu Okręgowego w Warszawie (wzór 15), pobranych 4 października 2026 r. Numer karty stoi przy wzorze. Wzory 3, 5, 16 i 17 są własne, ułożone z wymogów pisma procesowego (KPC art. 126 § 1 i 2, w sprawach karnych KPK art. 119 § 1), bo urzędowego wzoru nie ma. Wzory 18-20 odtwarzają układ kart usług dla spraw karnych.
- **Wzór to układ, nie lista wymogów.** Wymogi formalne każdorazowo sprawdź w pliku aktu (przy wzorze jest przepis, od którego zacząć). Urzędowy wzór mógł nie nadążyć za zmianą przepisu; gdy różni się od aktu, stosujesz akt.
- **Terminy, opłaty, sąd.** Termin podajesz jako regułę z podstawą i tylko warunkowo jako datę. Opłaty nie wpisujesz z pamięci: w sprawach cywilnych wskazujesz regułę z aktu KOSZTY (przepis i data brzmienia), a w sprawach karnych (wzory 17-20) koszty reguluje osobna ustawa, której skill nie ma, więc niczego nie wskazujesz; w obu przypadkach zawsze oznaczasz `[WYMAGA WERYFIKACJI: opłata według ustawy o kosztach sądowych, potwierdź w sądzie albo na gov.pl]`, także gdy kwotę odczytałeś z pliku aktu (`pisma.md`, punkt 5.4). Sąd, wydział i sygnaturę bierzesz z dokumentu użytkownika; gdy ich nie ma, `[UZUPEŁNIJ: …]`.
- **Formularz urzędowy.** Gdy pouczenie doręczone z orzeczeniem albo przepis wymaga urzędowego formularza (KPC art. 125 § 2), mówisz to wprost i przygotowujesz treść do przeniesienia do formularza; sam wzór go nie zastępuje. Skarga na czynności komornika może być wniesiona na urzędowym formularzu (KPC art. 767 § 3¹).
- **Kanał wniesienia.** Gdy pismo w tej sprawie musi iść przez system teleinformatyczny, wniesione inaczej nie wywołuje skutków (KPC art. 125 § 2¹); ustal to przed oddaniem pliku (`pisma.md`, punkt 5).
- **Fakty tylko od użytkownika.** Wzór nie dodaje żądań, zarzutów ani dowodów. Punkty wzoru, których użytkownik nie potwierdził, zostają jako `[UZUPEŁNIJ: …]` albo wypadają; nie zostawiasz w piśmie wariantów „w całości/w części” ani gwiazdek „niepotrzebne skreślić”.
- **Odpisy.** Do pisma procesowego dołącza się odpisy pisma i załączników dla pozostałych stron, a gdy załączników nie złożono w sądzie w oryginale, także po jednym odpisie każdego załącznika do akt (KPC art. 128 § 1); liczbę odpisów ustalasz z liczby stron w dokumentach użytkownika. Przy piśmie wnoszonym przez system teleinformatyczny załączniki dołącza się w postaci elektronicznej (KPC art. 128 § 2).

## 2. Układ pisma i plik DOCX

Każde pismo, także oddawane w oknie rozmowy, ma ten sam układ:

1. miejscowość i data: do prawej;
2. sąd z wydziałem i adresem (albo adresat): blok w prawej połowie strony, każda informacja w osobnej linii;
3. strony pod sobą po lewej: etykieta (Powód, Pozwany, Wnioskodawca), w kolejnych liniach adres i numery wymagane w pierwszym piśmie;
4. sygnatura akt i wartość przedmiotu sporu albo zaskarżenia: osobne linie po lewej;
5. tytuł pisma wersalikami na środku, pod nim ewentualne doprecyzowanie;
6. wnioski w ponumerowanych punktach, każdy punkt jedno żądanie;
7. „UZASADNIENIE” na środku, pod nim akapity: najpierw fakty w kolejności zdarzeń, przy każdym fakcie dowód, potem ocena;
8. podpis w prawej połowie: imię, nazwisko i funkcja osoby uprawnionej;
9. „Załączniki:” jako ponumerowana lista na końcu.

Gdy środowisko pozwala uruchamiać kod, plik składasz dołączonym skryptem (na Windows `python` albo `py`, na Linux i macOS także `python3`): zapisujesz pismo jako tekst w zapisie ze wzorów niżej i uruchamiasz `python scripts/pismo_docx.py pismo.txt pismo.docx`. Skrypt daje format A4, marginesy 2,5 cm, Times New Roman 12, interlinię 1,5, tekst wyjustowany, numer strony w stopce i żółte podświetlenie pól `[UZUPEŁNIJ: …]` oraz `[WYMAGA WERYFIKACJI: …]`. Nie składasz pisma w domyślnych stylach edytora (nagłówki „Nagłówek 1”, wszystko do lewej, sąd i adres w jednej linii). Bez uruchamiania kodu oddajesz pismo w oknie rozmowy w tej samej kolejności elementów i mówisz, jak je ustawić w edytorze (punkty 1-9).

Zapis: linia `@projekt` daje ramkę „PROJEKT DO PRZEGLĄDU PRZEZ PRAWNIKA” (obowiązkowa w pismach poziomu B); `@data:`, `@sygnatura:`, `@wps:`, `@dotyczy:`, `@podtytul:` i `@naglowek:` to pojedyncze linie; `@nadawca:`, `@sad:`, `@adresat:`, `@strony:`, `@tytul:`, `@podpis:` i `@zalaczniki:` to bloki zakończone pustą linią. Punkty zaczynasz od `1. `, `a) ` albo `- `, pogrubienie zapisujesz w `**gwiazdkach**`. Pod plikiem zawsze dajesz to, czego wymaga `pisma.md` (kontrola wysyłki, termin, doręczenie, karta dla prawnika); tych części nie wkładasz do pliku pisma.

## 3. Pismo procesowe w toku sprawy (wzór ogólny)

Własny układ dla wniosków i oświadczeń, które nie mają osobnego wzoru (wniosek dowodowy, zmiana adresu, wniosek o odroczenie, usprawiedliwienie nieobecności, cofnięcie pozwu). Wymogi: KPC art. 126 § 1; odpisy: KPC art. 128 § 1.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd]
[UZUPEŁNIJ: wydział]
[UZUPEŁNIJ: adres sądu]

@strony:
Powód: [UZUPEŁNIJ: imię i nazwisko albo nazwa]
Pozwany: [UZUPEŁNIJ: imię i nazwisko albo nazwa]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura]

@tytul: [UZUPEŁNIJ: RODZAJ PISMA, NP. WNIOSEK DOWODOWY POWODA]

Działając w imieniu [UZUPEŁNIJ: strona], wnoszę o:

1. [UZUPEŁNIJ: wniosek albo oświadczenie].

# UZASADNIENIE

[UZUPEŁNIJ: fakty, na których strona opiera wniosek, i dowód na każdy z nich]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
odpis pisma dla strony przeciwnej
[UZUPEŁNIJ: dokumenty powołane w piśmie]
```

## 4. Pozew o zapłatę

Układ według kart 82/K/UU/SR (między przedsiębiorcami, do 100 000 zł, wydział gospodarczy) i odpowiednika dla spraw cywilnych. Wymogi: KPC art. 187 § 1 (żądanie, data wymagalności, fakty, informacja o próbie mediacji albo innego pozasądowego rozwiązania sporu z wyjaśnieniem przyczyn jej braku) i KPC art. 126 § 1 i 2 (dane stron w pierwszym piśmie). W sprawie gospodarczej powód powołuje wszystkie twierdzenia i dowody już w pozwie, a spóźnione sąd pomija, chyba że strona uprawdopodobni, że nie mogła ich powołać wcześniej albo że potrzeba wynikła później; wtedy ma na to dwa tygodnie od tej chwili (KPC art. 458⁵ § 1 i 4). Przewodniczący może też wyznaczyć stronie osobny termin na twierdzenia i dowody (KPC art. 458⁵ § 2 i 3). Wniosek o nakaz zapłaty w postępowaniu nakazowym tylko przy dokumentach z KPC art. 485. Sąd właściwy, wartość przedmiotu sporu i opłata: zagadnienia do karty dla prawnika.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd właściwy]
[UZUPEŁNIJ: wydział cywilny albo gospodarczy]
[UZUPEŁNIJ: adres sądu]

@strony:
Powód: [UZUPEŁNIJ: nazwa albo imię i nazwisko]
[UZUPEŁNIJ: adres siedziby albo adres do doręczeń z CEIDG]
[UZUPEŁNIJ: numer KRS, a przy osobie fizycznej PESEL albo NIP]
Pozwany: [UZUPEŁNIJ: nazwa albo imię i nazwisko]
[UZUPEŁNIJ: adres siedziby albo adres do doręczeń z CEIDG]
[UZUPEŁNIJ: numer KRS albo NIP, jeśli znany]

@wps: Wartość przedmiotu sporu: [UZUPEŁNIJ: kwota w pełnych złotych]

@tytul: POZEW O ZAPŁATĘ

Działając w imieniu powoda, wnoszę o:

1. zasądzenie od pozwanego na rzecz powoda kwoty [UZUPEŁNIJ: kwota] zł (słownie: [UZUPEŁNIJ: kwota słownie]) wraz z odsetkami [UZUPEŁNIJ: rodzaj odsetek] liczonymi od dnia [UZUPEŁNIJ: pierwszy dzień opóźnienia] do dnia zapłaty;
2. zasądzenie od pozwanego na rzecz powoda kosztów procesu według norm przepisanych;
3. przeprowadzenie dowodów z dokumentów wymienionych w uzasadnieniu na fakty tam wskazane;
4. rozpoznanie sprawy także pod nieobecność powoda i wydanie wyroku zaocznego, gdy zajdą do tego przesłanki.

Roszczenie stało się wymagalne w dniu [UZUPEŁNIJ: data wymagalności].

Strony [UZUPEŁNIJ: podjęły próbę mediacji albo innego pozasądowego rozwiązania sporu z wynikiem …; albo: nie podjęły takiej próby, ponieważ …].

# UZASADNIENIE

[UZUPEŁNIJ: umowa albo zamówienie, strony, przedmiot, data]

[UZUPEŁNIJ: wykonanie świadczenia przez powoda i dowód: protokół, dokument wydania, potwierdzenie dostawy]

[UZUPEŁNIJ: faktura, termin płatności, brak zapłaty, wezwanie do zapłaty i dowód jego doręczenia]

[UZUPEŁNIJ: wyliczenie odsetek i rekompensaty, jeśli powód ich dochodzi, z podstawą sprawdzoną w pliku aktu]

[UZUPEŁNIJ: fakty uzasadniające właściwość sądu, jeśli pozew nie idzie do sądu siedziby pozwanego]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji powoda]

@zalaczniki:
dowód uiszczenia opłaty od pozwu
[UZUPEŁNIJ: dokument wykazujący umocowanie osoby podpisującej]
[UZUPEŁNIJ: dowody wymienione w uzasadnieniu, każdy w osobnej linii]
odpis pozwu i załączników dla pozwanego
```

## 5. Odpowiedź na pozew

Wzór własny (urzędowej karty nie ma). Termin wyznacza przewodniczący w wezwaniu doręczonym z pozwem, nie krótszy niż dwa tygodnie, a odpowiedź złożona po terminie jest zwracana (KPC art. 205¹ § 1 i 2). Pozwany wypowiada się co do twierdzeń powoda o faktach i wyszczególnia fakty, którym zaprzecza (KPC art. 210 § 2); fakty, co do których się nie wypowie, sąd może uznać za przyznane (KPC art. 230). W sprawie gospodarczej wszystkie twierdzenia i dowody muszą być w odpowiedzi na pozew, a spóźnione sąd pomija, chyba że strona uprawdopodobni, że nie mogła ich powołać wcześniej albo że potrzeba wynikła później (KPC art. 458⁵ § 1 i 4); termin wyznaczony przez przewodniczącego w pouczeniu ma pierwszeństwo (KPC art. 458⁵ § 2 i 3). Świadka wskazujesz w piśmie imieniem, nazwiskiem i adresem do wezwania podanymi przez użytkownika; w analizie i karcie zostaje oznaczony funkcją. Gdy pozywa pracownik (np. o mobbing, nierówne traktowanie albo po wypowiedzeniu), reguły bierzesz z `moduly/zatrudnienie-na-co-dzien.md`: od 5 listopada 2026 r. obowiązuje nowa definicja mobbingu, wyższe minimum zadośćuczynienia i właściwość sądu rejonowego bez względu na wartość (punkty A46-A51 modułu); które przepisy stosować do zdarzeń zakończonych przed tą datą, wpisujesz jako pytanie w karcie. Zarzuty formalne (np. niewłaściwość sądu, zapis na sąd polubowny) i potrącenie: do karty dla prawnika, zanim pismo wyjdzie.

Wariant A, pozwany nie zgadza się z żądaniem:

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd z pozwu]
[UZUPEŁNIJ: wydział]
[UZUPEŁNIJ: adres sądu]

@strony:
Powód: [UZUPEŁNIJ: jak w pozwie]
Pozwany: [UZUPEŁNIJ: nazwa albo imię i nazwisko]
[UZUPEŁNIJ: adres siedziby albo adres do doręczeń z CEIDG]
[UZUPEŁNIJ: numer KRS, a przy osobie fizycznej PESEL albo NIP]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura z wezwania]

@tytul: ODPOWIEDŹ NA POZEW
@podtytul: w sprawie o [UZUPEŁNIJ: przedmiot sporu z pozwu, np. o zapłatę 48 700 zł]

W odpowiedzi na pozew doręczony pozwanemu w dniu [UZUPEŁNIJ: data doręczenia], w terminie wyznaczonym przez Sąd, wnoszę o:

1. oddalenie powództwa [UZUPEŁNIJ: w całości albo w części, z dokładnym zakresem];
2. zasądzenie od powoda na rzecz pozwanego kosztów procesu według norm przepisanych;
3. przeprowadzenie dowodów wymienionych w uzasadnieniu na fakty tam wskazane.

# UZASADNIENIE

**Fakty, które pozwany przyznaje.** [UZUPEŁNIJ: fakty z pozwu, których pozwany nie kwestionuje]

**Fakty, którym pozwany zaprzecza.** [UZUPEŁNIJ: każdy fakt z pozwu, któremu pozwany zaprzecza, osobno]

**Stanowisko pozwanego.** [UZUPEŁNIJ: przebieg zdarzeń według pozwanego w kolejności dat, przy każdym fakcie dowód]

**Zarzuty.** [UZUPEŁNIJ: zarzuty potwierdzone z prawnikiem, np. spełnienie świadczenia, wada, przedawnienie; każdy z faktami i dowodem]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji pozwanego]

@zalaczniki:
[UZUPEŁNIJ: dokument wykazujący umocowanie osoby podpisującej]
[UZUPEŁNIJ: dowody wymienione w uzasadnieniu, każdy w osobnej linii]
odpis odpowiedzi na pozew i załączników dla powoda
```

Wariant B, pozwany uznaje powództwo. Uznanie wiąże sąd, chyba że jest sprzeczne z prawem albo zasadami współżycia społecznego albo zmierza do obejścia prawa (KPC art. 213 § 2), więc najpierw mówisz użytkownikowi jednym zdaniem, że po uznaniu sąd co do zasady orzeknie zgodnie z żądaniem, i ustalasz zakres uznania. Zwrot kosztów mimo przegranej należy się pozwanemu tylko wtedy, gdy nie dał powodu do wytoczenia sprawy i uznał żądanie przy pierwszej czynności procesowej (KPC art. 101); fakty na to muszą pochodzić od użytkownika. Po uznaniu sąd może rozpoznać sprawę na posiedzeniu niejawnym (KPC art. 148¹ § 1). W wariancie B zmieniasz tylko wnioski i uzasadnienie:

```
W odpowiedzi na pozew doręczony pozwanemu w dniu [UZUPEŁNIJ: data doręczenia]:

1. uznaję powództwo [UZUPEŁNIJ: w całości albo w części, z dokładnym zakresem];
2. wnoszę o zasądzenie od powoda na rzecz pozwanego kosztów procesu albo o nieobciążanie pozwanego kosztami;
3. wnoszę o rozpoznanie sprawy na posiedzeniu niejawnym.

# UZASADNIENIE

[UZUPEŁNIJ: czego dokładnie dotyczy uznanie i czego nie obejmuje]

[UZUPEŁNIJ: fakty pokazujące, że pozwany nie dał powodu do wytoczenia sprawy, np. brak wezwania przed pozwem, z dowodem]
```

## 6. Sprzeciw od nakazu zapłaty (postępowanie upominawcze)

Układ według karty 45/K/UU/SR. Termin jest oznaczony w nakazie: dwa tygodnie od doręczenia nakazu w kraju (KPC art. 480² § 2 pkt 1). Sprzeciw wnosi się do sądu, który wydał nakaz; pozwany wskazuje, czy zaskarża nakaz w całości czy w części, i przedstawia zarzuty, które pod rygorem ich utraty trzeba zgłosić przed wdaniem się w spór co do istoty sprawy (KPC art. 480³ § 1 i 2). Nakaz traci moc w części zaskarżonej (KPC art. 505 § 2). Reguły i pytania wstępne: `katalog/nakaz-zaplaty-co-dalej/`. Nakaz z elektronicznego postępowania upominawczego ma własny kanał wniesienia: ustal go z pouczenia.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd, który wydał nakaz]
[UZUPEŁNIJ: wydział]
[UZUPEŁNIJ: adres sądu]

@strony:
Powód: [UZUPEŁNIJ: jak w nakazie]
Pozwany: [UZUPEŁNIJ: nazwa albo imię i nazwisko]
[UZUPEŁNIJ: adres siedziby albo zamieszkania]
[UZUPEŁNIJ: numer KRS, a przy osobie fizycznej PESEL albo NIP]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura z nakazu]
@wps: Wartość przedmiotu zaskarżenia: [UZUPEŁNIJ: kwota w pełnych złotych]

@tytul: SPRZECIW OD NAKAZU ZAPŁATY
@podtytul: wydanego w postępowaniu upominawczym dnia [UZUPEŁNIJ: data nakazu]

Zaskarżam nakaz zapłaty wydany przez [UZUPEŁNIJ: sąd] dnia [UZUPEŁNIJ: data nakazu], doręczony pozwanemu dnia [UZUPEŁNIJ: data doręczenia], [UZUPEŁNIJ: w całości albo w części, z dokładnym zakresem] i wnoszę o:

1. oddalenie powództwa w zaskarżonym zakresie;
2. zasądzenie od powoda na rzecz pozwanego kosztów procesu według norm przepisanych;
3. przeprowadzenie dowodów wymienionych w uzasadnieniu na fakty tam wskazane.

# UZASADNIENIE

[UZUPEŁNIJ: zarzuty, fakty w kolejności dat i dowód na każdy z nich]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji pozwanego]

@zalaczniki:
[UZUPEŁNIJ: dowody wymienione w uzasadnieniu, każdy w osobnej linii]
odpis sprzeciwu i załączników dla powoda
```

## 7. Zarzuty od nakazu zapłaty (postępowanie nakazowe)

Układ według karty 47/K/UU/SR; różni się od wzoru 6 tytułem, opłatą i wymogami. Termin z nakazu: miesiąc od doręczenia, gdy doręczenie następuje na terytorium Unii Europejskiej (KPC art. 480² § 2 pkt 3). Poza elementami z KPC art. 480³ § 2 pozwany wymienia fakty, z których wywodzi żądania, i dowody na każdy z nich (KPC art. 493 § 2). Nakaz z chwilą wydania jest tytułem zabezpieczenia, wykonalnym bez klauzuli (KPC art. 492 § 1), więc wierzyciel może zabezpieczyć się na majątku firmy jeszcze przed rozpoznaniem zarzutów; wniosek o ograniczenie zabezpieczenia to pytanie do prawnika w karcie. Użyj zapisu wzoru 6 ze zmianami: tytuł `ZARZUTY OD NAKAZU ZAPŁATY`, podtytuł `wydanego w postępowaniu nakazowym dnia [UZUPEŁNIJ: data nakazu]`, wniosek 1 `uchylenie nakazu zapłaty i oddalenie powództwa w zaskarżonym zakresie`, w załącznikach pierwsza linia `dowód uiszczenia opłaty od zarzutów`.

## 8. Sprzeciw od wyroku zaocznego

Układ według karty 44/K/UU/SR. Termin: dwa tygodnie od doręczenia wyroku (KPC art. 344 § 1). W sprzeciwie pozwany przytacza zarzuty, które pod rygorem ich utraty trzeba zgłosić przed wdaniem się w spór co do istoty sprawy, oraz twierdzenia i dowody (KPC art. 344 § 2). Wyrok zaoczny uwzględniający powództwo ma z urzędu rygor natychmiastowej wykonalności (KPC art. 333 § 1), więc powód może prowadzić egzekucję mimo sprzeciwu; wniosek o zawieszenie rygoru (KPC art. 346 § 1) dopisujesz do sprzeciwu tylko z faktami od użytkownika i jako pytanie do prawnika w karcie. Użyj zapisu wzoru 6 ze zmianami: tytuł `SPRZECIW OD WYROKU ZAOCZNEGO`, podtytuł `wydanego dnia [UZUPEŁNIJ: data wyroku]`, zdanie wstępne o wyroku zaocznym, wniosek 1 `uchylenie wyroku zaocznego [UZUPEŁNIJ: w całości albo w części, z zakresem] i oddalenie powództwa w tym zakresie`, w załącznikach pierwsza linia `dowód uiszczenia opłaty od sprzeciwu`.

## 9. Wniosek o doręczenie wyroku z uzasadnieniem

Układ według karty 10A/K/UP/CiG. Termin: tydzień od ogłoszenia wyroku, a gdy wyrok doręcza się z urzędu, od jego doręczenia; we wniosku wskazuje się, czy uzasadnienie ma dotyczyć całości czy części wyroku (KPC art. 328 § 1-3). Wyrok z uzasadnieniem dostaje tylko strona, która złożyła wniosek (KPC art. 331 § 1), a termin apelacji liczy się od tego doręczenia (KPC art. 369 § 1), więc przy przegranej sprawie to pierwszy krok.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd, który wydał wyrok]
[UZUPEŁNIJ: wydział]
[UZUPEŁNIJ: adres sądu]

@strony:
Powód: [UZUPEŁNIJ: jak w wyroku]
Pozwany: [UZUPEŁNIJ: jak w wyroku]
Wnioskodawca: [UZUPEŁNIJ: powód albo pozwany, adres do doręczeń]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura]

@tytul: WNIOSEK O DORĘCZENIE WYROKU Z UZASADNIENIEM

Wnoszę o sporządzenie na piśmie uzasadnienia wyroku [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data wyroku], wydanego w sprawie o sygnaturze [UZUPEŁNIJ: sygnatura], [UZUPEŁNIJ: w całości albo w części, ze wskazaniem punktów wyroku], i o doręczenie odpisu wyroku z uzasadnieniem na adres wnioskodawcy.

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
dowód uiszczenia opłaty od wniosku
```

## 10. Apelacja

Układ według karty 42/K/UU/SR. Termin: dwa tygodnie od doręczenia stronie wyroku z uzasadnieniem, trzy tygodnie, gdy sąd przedłużył termin sporządzenia uzasadnienia; apelację wnosi się do sądu, który wydał zaskarżony wyrok (KPC art. 369 § 1 i 1¹). Wymogi: oznaczenie wyroku i zakresu zaskarżenia, zwięzłe zarzuty z uzasadnieniem, nowe fakty albo dowody tylko z uprawdopodobnieniem, że nie dało się ich powołać przed sądem pierwszej instancji albo że potrzeba ich powołania wynikła później, wniosek o zmianę albo uchylenie, a w sprawach majątkowych wartość przedmiotu zaskarżenia (KPC art. 368 § 1, 1¹, 1² i 2). Zarzuty apelacji formułuje prawnik: w projekcie wpisujesz fakty i zastrzeżenia użytkownika do wyroku, a dobór zarzutów zostawiasz jako pytanie w karcie.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd drugiej instancji]
[UZUPEŁNIJ: wydział]
za pośrednictwem
[UZUPEŁNIJ: sąd, który wydał wyrok]
[UZUPEŁNIJ: wydział]
[UZUPEŁNIJ: adres sądu, który wydał wyrok]

@strony:
Powód: [UZUPEŁNIJ: jak w wyroku]
Pozwany: [UZUPEŁNIJ: jak w wyroku]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura]
@wps: Wartość przedmiotu zaskarżenia: [UZUPEŁNIJ: kwota w pełnych złotych]

@tytul: APELACJA [UZUPEŁNIJ: POWODA albo POZWANEGO]
@podtytul: od wyroku [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data wyroku]

Zaskarżam wyrok [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data wyroku], sygn. akt [UZUPEŁNIJ: sygnatura], doręczony z uzasadnieniem dnia [UZUPEŁNIJ: data doręczenia], [UZUPEŁNIJ: w całości albo w części, z dokładnym zakresem].

Wyrokowi zarzucam:

1. [UZUPEŁNIJ: zarzut ustalony z prawnikiem; przy zarzucie co do faktów: fakt ustalony niezgodnie z rzeczywistym stanem rzeczy albo istotny fakt nieustalony].

Wnoszę o:

1. [UZUPEŁNIJ: zmianę wyroku przez … albo uchylenie wyroku w zakresie …];
2. zasądzenie od [UZUPEŁNIJ: strona przeciwna] kosztów procesu za obie instancje według norm przepisanych.

# UZASADNIENIE

[UZUPEŁNIJ: stan sprawy i uzasadnienie każdego zarzutu]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
dowód uiszczenia opłaty od apelacji
odpis apelacji dla strony przeciwnej
```

## 11. Zażalenie

Układ według karty 43/K/UU/SR. Termin: tydzień od doręczenia postanowienia z uzasadnieniem; gdy sąd odstąpił od uzasadnienia, od ogłoszenia albo doręczenia postanowienia (KPC art. 394 § 2). Zażalenie wskazuje zaskarżone postanowienie, zawiera wniosek o jego zmianę albo uchylenie i zwięzłe uzasadnienie (KPC art. 394 § 3). Który sąd rozpoznaje zażalenie i czy w ogóle przysługuje, ustalasz z pouczenia doręczonego z postanowieniem; bez pouczenia: pytanie do prawnika. Zapis:

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd rozpoznający zażalenie według pouczenia]
[UZUPEŁNIJ: wydział]
za pośrednictwem
[UZUPEŁNIJ: sąd, który wydał postanowienie]
[UZUPEŁNIJ: wydział]
[UZUPEŁNIJ: adres sądu, który wydał postanowienie]

@strony:
Skarżący: [UZUPEŁNIJ: nazwa albo imię i nazwisko, rola w sprawie]
Pozostali uczestnicy: [UZUPEŁNIJ: jak w postanowieniu]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura]
@wps: Wartość przedmiotu zaskarżenia: [UZUPEŁNIJ: kwota w pełnych złotych albo usuń linię, gdy nie dotyczy]

@tytul: ZAŻALENIE
@podtytul: na [UZUPEŁNIJ: postanowienie albo zarządzenie] [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data]

Zaskarżam [UZUPEŁNIJ: postanowienie albo zarządzenie] [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data], sygn. akt [UZUPEŁNIJ: sygnatura], doręczone dnia [UZUPEŁNIJ: data doręczenia], [UZUPEŁNIJ: w całości albo w części, z dokładnym zakresem], i wnoszę o:

1. [UZUPEŁNIJ: zmianę przez … albo uchylenie zaskarżonego rozstrzygnięcia w zakresie …].

# UZASADNIENIE

[UZUPEŁNIJ: czego dotyczy rozstrzygnięcie, dlaczego jest wadliwe, w miarę potrzeby nowe fakty i dowody]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
dowód uiszczenia opłaty od zażalenia
odpis zażalenia dla pozostałych stron
```

## 12. Skarga na orzeczenie referendarza sądowego

Układ według karty 48/K/UU/SR. Skarga służy tam, gdzie na postanowienie sądu służyłoby zażalenie; wnosi się ją do sądu, w którym referendarz wydał orzeczenie, w terminie tygodnia od jego doręczenia, a gdy orzeczenie doręczono bez uzasadnienia i strona wniosła o jego sporządzenie, od doręczenia orzeczenia z uzasadnieniem (KPC art. 398²² § 1 i 2). Typowy przypadek w firmie: postanowienie referendarza o kosztach. Od nakazu zapłaty służy sprzeciw albo zarzuty (wzory 6 i 7), także gdy nakaz wydał referendarz. Przy postanowieniu co do klauzuli wykonalności termin biegnie inaczej (KPC art. 795 § 2 i 3): dla wierzyciela od wydania mu tytułu wykonawczego albo zawiadomienia go o utworzeniu tytułu w systemie teleinformatycznym, a przy odmowie od ogłoszenia postanowienia, gdy zaś ogłoszenia nie było, od jego doręczenia; dla dłużnika od doręczenia mu zawiadomienia o wszczęciu egzekucji; gdy strona zażądała uzasadnienia postanowienia o nadaniu klauzuli (KPC art. 794² § 2 i 3), od doręczenia jej uzasadnienia albo postanowienia z uzasadnieniem. Który przypadek zachodzi, ustalasz z dokumentów i podajesz warunkowo.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd, w którym referendarz wydał orzeczenie]
[UZUPEŁNIJ: wydział]
[UZUPEŁNIJ: adres sądu]

@strony:
Skarżący: [UZUPEŁNIJ: nazwa albo imię i nazwisko, rola w sprawie]
Pozostali uczestnicy: [UZUPEŁNIJ: jak w orzeczeniu]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura]

@tytul: SKARGA NA ORZECZENIE REFERENDARZA SĄDOWEGO

Zaskarżam [UZUPEŁNIJ: rodzaj orzeczenia] referendarza sądowego w [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data], sygn. akt [UZUPEŁNIJ: sygnatura], doręczone dnia [UZUPEŁNIJ: data doręczenia], [UZUPEŁNIJ: w całości albo w części, z dokładnym zakresem], i wnoszę o:

1. [UZUPEŁNIJ: żądanie, np. zmianę orzeczenia przez …].

# UZASADNIENIE

[UZUPEŁNIJ: czego dotyczy orzeczenie i dlaczego skarżący się z nim nie zgadza, z dowodem]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
dowód uiszczenia opłaty od skargi
odpis skargi dla pozostałych stron
```

## 13. Skarga na czynności komornika

Układ według karty 50/K/UU/SR. Skargę rozpoznaje sąd rejonowy właściwy ze względu na siedzibę kancelarii komornika, a wnosi się ją do komornika, który dokonał czynności albo jej zaniechał (KPC art. 767 § 1 i 5). Skarga określa zaskarżoną czynność albo czynność zaniechaną i zawiera wniosek o zmianę, uchylenie albo dokonanie czynności z uzasadnieniem (KPC art. 767 § 3). Termin: tydzień, liczony zależnie od tego, czy skarżący był przy czynności, był zawiadomiony o jej terminie albo o jej dokonaniu, czy dowiedział się o niej inaczej; przy zaniechaniu czynności tydzień biegnie od dnia, w którym skarżący dowiedział się, że czynność miała być dokonana (KPC art. 767 § 4). Dzień początkowy ustalasz z dokumentów i podajesz warunkowo.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd rejonowy właściwy dla siedziby kancelarii komornika]
[UZUPEŁNIJ: wydział]
za pośrednictwem
Komornika Sądowego [UZUPEŁNIJ: imię i nazwisko, sąd, przy którym działa]
[UZUPEŁNIJ: adres kancelarii]

@strony:
Skarżący: [UZUPEŁNIJ: nazwa albo imię i nazwisko, rola: dłużnik, wierzyciel albo osoba trzecia]
[UZUPEŁNIJ: adres]
[UZUPEŁNIJ: numer KRS, a przy osobie fizycznej PESEL albo NIP]
Wierzyciel: [UZUPEŁNIJ: jak w zawiadomieniu komornika]
Dłużnik: [UZUPEŁNIJ: jak w zawiadomieniu komornika]

@sygnatura: Sygn. akt komorniczych: [UZUPEŁNIJ: sygnatura sprawy egzekucyjnej]

@tytul: SKARGA NA CZYNNOŚCI KOMORNIKA

Zaskarżam [UZUPEŁNIJ: czynność komornika z datą albo zaniechanie czynności], o której skarżący dowiedział się dnia [UZUPEŁNIJ: data i sposób], i wnoszę o:

1. [UZUPEŁNIJ: zmianę, uchylenie albo dokonanie czynności, z dokładnym zakresem].

# UZASADNIENIE

[UZUPEŁNIJ: przebieg zdarzeń, na czym polega naruszenie praw skarżącego, dowód na każdy fakt]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
dowód uiszczenia opłaty od skargi
[UZUPEŁNIJ: dowody wymienione w uzasadnieniu, każdy w osobnej linii]
odpisy skargi dla pozostałych stron postępowania
```

## 14. Wniosek o klauzulę wykonalności albo stwierdzenie prawomocności

Układ według karty 10/K/UP/CiG. Klauzulę wykonalności tytułowi pochodzącemu od sądu nadaje sąd pierwszej instancji, w którym sprawa się toczyła albo toczy, a dopóki akta są w sądzie drugiej instancji, co do zasady ten sąd (KPC art. 781 § 1). Prawomocność orzeczenia stwierdza na wniosek strony sąd pierwszej instancji, a dopóki akta są w sądzie drugiej instancji, ten sąd (KPC art. 364 § 1). W bloku stron wpisujesz obie strony sprawy i wnioskodawcę. Użyj zapisu wzoru 9 ze zmianami: tytuł `WNIOSEK O NADANIE KLAUZULI WYKONALNOŚCI` albo `WNIOSEK O STWIERDZENIE PRAWOMOCNOŚCI ORZECZENIA`, treść `Wnoszę o nadanie klauzuli wykonalności [UZUPEŁNIJ: wyrokowi, nakazowi zapłaty albo postanowieniu] z dnia [UZUPEŁNIJ: data] [UZUPEŁNIJ: w całości albo co do punktów …] i doręczenie tytułu wykonawczego na adres wnioskodawcy` albo `Wnoszę o stwierdzenie prawomocności [UZUPEŁNIJ: orzeczenie] z dnia [UZUPEŁNIJ: data] i wydanie odpisu orzeczenia ze stwierdzeniem prawomocności`. Opłata: `[WYMAGA WERYFIKACJI: opłata kancelaryjna według aktu KOSZTY]`.

## 15. Wniosek o sprostowanie oczywistej omyłki

Układ według wzoru nr 5 Sądu Okręgowego w Warszawie. Sąd może sprostować w wyroku niedokładności, błędy pisarskie albo rachunkowe i inne oczywiste omyłki (KPC art. 350 § 1); sprostowanie nie służy do zmiany rozstrzygnięcia. Użyj zapisu wzoru 9 ze zmianami: tytuł `WNIOSEK O SPROSTOWANIE OCZYWISTEJ OMYŁKI`, treść `Wnoszę o sprostowanie oczywistej omyłki w [UZUPEŁNIJ: wyroku albo postanowieniu] z dnia [UZUPEŁNIJ: data] przez zastąpienie zapisu „[UZUPEŁNIJ: błędny zapis]” zapisem „[UZUPEŁNIJ: prawidłowy zapis]”`, w załącznikach `odpis wniosku dla strony przeciwnej`.

## 16. Pismo do kontrahenta albo urzędu (układ)

Własny układ dla pism poziomu A z `pisma.md` (wezwanie do zapłaty, wypowiedzenie, odpowiedź na reklamację, pismo do urzędu). Bez linii `@projekt`, chyba że pismo jest poziomu B.

```
@nadawca:
[UZUPEŁNIJ: firma]
[UZUPEŁNIJ: adres siedziby]
NIP: [UZUPEŁNIJ: NIP]

@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@adresat:
[UZUPEŁNIJ: adresat]
[UZUPEŁNIJ: adres z umowy albo rejestru]

@dotyczy: Dotyczy: [UZUPEŁNIJ: umowa, faktura albo znak sprawy]

@tytul: [UZUPEŁNIJ: TYTUŁ, NP. WEZWANIE DO ZAPŁATY]

[UZUPEŁNIJ: treść według punktu 4 pliku pisma.md]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
[UZUPEŁNIJ: załączniki albo usuń ten blok]
```

## 17. Zawiadomienie o przestępstwie (firma pokrzywdzona)

Wzór własny (urzędowej karty nie ma), zawsze poziom B i zawsze po lekturze `moduly/sprawy-karne-firmy.md`. Każdy, kto dowiedział się o przestępstwie ściganym z urzędu, ma społeczny obowiązek zawiadomić prokuratora albo Policję (KPK art. 304 § 1). Zawiadomienie opisuje fakty i dowody; kwalifikację prawną czynu zostawiasz organowi i prawnikowi. Nie łączysz zawiadomienia z wezwaniem do zapłaty ani z zapowiedzią wycofania go po zapłacie (`pisma.md`, punkt 2.7). Wymogi pisma, w tym dane kontaktowe albo oświadczenie o ich braku w pierwszym piśmie w sprawie: KPK art. 119 § 1.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@adresat:
[UZUPEŁNIJ: prokuratura rejonowa albo jednostka Policji właściwa dla miejsca czynu]
[UZUPEŁNIJ: adres]

@strony:
Zawiadamiający: [UZUPEŁNIJ: firma, adres siedziby, numer KRS albo NIP]
reprezentowany przez: [UZUPEŁNIJ: imię, nazwisko i funkcja]
[UZUPEŁNIJ: numer telefonu, telefaksu i adres e-mail albo oświadczenie, że ich nie ma]

@tytul: ZAWIADOMIENIE O PODEJRZENIU POPEŁNIENIA PRZESTĘPSTWA

Zawiadamiam o podejrzeniu popełnienia przestępstwa na szkodę [UZUPEŁNIJ: firma] i wnoszę o wszczęcie postępowania oraz o zawiadomienie mnie o jego wszczęciu albo odmowie wszczęcia.

# UZASADNIENIE

[UZUPEŁNIJ: co się stało, kiedy i gdzie, w kolejności zdarzeń; same fakty]

[UZUPEŁNIJ: kto mógł to zrobić i skąd to przypuszczenie; przy braku wiedzy: sprawca nieznany]

[UZUPEŁNIJ: szkoda: kwota i sposób jej wyliczenia]

[UZUPEŁNIJ: dowody: dokumenty, korespondencja, zapisy z systemów, świadkowie z imieniem, nazwiskiem i adresem do wezwania]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
[UZUPEŁNIJ: dokument wykazujący umocowanie osoby podpisującej]
[UZUPEŁNIJ: dowody wymienione w uzasadnieniu, każdy w osobnej linii]
```

## 18. Zażalenie na odmowę wszczęcia albo umorzenie postępowania

Układ według karty 59/K/UU/SR. Na postanowienie o odmowie wszczęcia śledztwa zażalenie przysługuje m.in. pokrzywdzonemu, a na postanowienie o umorzeniu stronom (KPK art. 306 § 1 i 1a). Termin: 7 dni od doręczenia postanowienia (KPK art. 460); to termin zawity, a czynność po jego upływie jest bezskuteczna (KPK art. 122 § 1 i 2). Kto rozpoznaje zażalenie, zależy od trybu: co do zasady sąd właściwy do rozpoznania sprawy (KPK art. 465 § 2); gdy postanowienie wydał prowadzący postępowanie inny niż prokurator i prokurator go nie zatwierdził, prokurator sprawujący nadzór (KPK art. 465 § 3); postanowienie Policji o odmowie wszczęcia albo umorzeniu zatwierdza jednak prokurator (KPK art. 305 § 3, KPK art. 325e § 2), a wtedy co do zasady rozpoznaje je sąd; przy umorzeniu dochodzenia z wpisaniem sprawy do rejestru przestępstw zażalenie wnosi się do prokuratora nadzorującego dochodzenie, który kieruje je do sądu, jeśli się do niego nie przychyli (KPK art. 325e § 4); w sprawie z oskarżenia prywatnego umorzonej albo niewszczętej z braku interesu społecznego prokurator nadrzędny (KPK art. 465 § 2a); a gdy to już ponowna odmowa albo umorzenie po wcześniejszym uchyleniu postanowienia przez sąd, tylko prokurator nadrzędny (KPK art. 330 § 2). Adresata i pośrednika przepisujesz z pouczenia pod postanowieniem; bez pouczenia zadajesz jedno pytanie o rodzaj postanowienia, organ, który je wydał, i o to, czy zatwierdził je prokurator. Skarżący wskazuje zaskarżone rozstrzygnięcie i to, czego się domaga (KPK art. 427 § 1).

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd albo prokurator wskazany w pouczeniu jako rozpoznający zażalenie]
[UZUPEŁNIJ: wydział albo jednostka]
za pośrednictwem
[UZUPEŁNIJ: organ wskazany w pouczeniu, zwykle ten, który wydał postanowienie; usuń dwie linie, jeśli pouczenie nie wskazuje pośrednika]
[UZUPEŁNIJ: adres]

@strony:
Skarżący: [UZUPEŁNIJ: firma, adres siedziby, numer KRS albo NIP], pokrzywdzony
reprezentowany przez: [UZUPEŁNIJ: imię, nazwisko i funkcja]
[UZUPEŁNIJ: numer telefonu, telefaksu i adres e-mail albo oświadczenie, że ich nie ma]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura z postanowienia]

@tytul: ZAŻALENIE
@podtytul: na postanowienie o [UZUPEŁNIJ: odmowie wszczęcia albo umorzeniu] [UZUPEŁNIJ: śledztwa albo dochodzenia] z dnia [UZUPEŁNIJ: data]

Zaskarżam w całości postanowienie [UZUPEŁNIJ: organ] z dnia [UZUPEŁNIJ: data], doręczone dnia [UZUPEŁNIJ: data doręczenia], i wnoszę o jego uchylenie oraz przekazanie sprawy do dalszego prowadzenia.

# UZASADNIENIE

[UZUPEŁNIJ: czego organ nie ustalił albo nie sprawdził: pominięty dowód, nieprzesłuchany świadek, niezbadany dokument]

[UZUPEŁNIJ: fakty i dowody, które przemawiają za prowadzeniem postępowania]

@podpis:
[UZUPEŁNIJ: imię, nazwisko i funkcja osoby uprawnionej do reprezentacji]

@zalaczniki:
[UZUPEŁNIJ: dowody wymienione w uzasadnieniu, każdy w osobnej linii]
```

## 19. Sprzeciw od wyroku nakazowego

Układ według karty 60/K/UU/SR. Oskarżony i oskarżyciel mogą wnieść sprzeciw do sądu, który wydał wyrok nakazowy, w terminie zawitym 7 dni od doręczenia wyroku; sprzeciw wniesiony po terminie nie zostanie przyjęty (KPK art. 506 § 1 i 2). Po sprzeciwie wyrok traci moc i sprawa idzie na zasadach ogólnych, a sąd nie jest związany treścią wyroku nakazowego, więc kara może być inna, także surowsza (KPK art. 506 § 3 i 6); mówisz to użytkownikowi przed oddaniem pisma. Sprzeciw dotyczy osoby oskarżonej, nie firmy, a obronę prowadzi prawnik: skill układa tylko pismo, żeby termin nie upadł, i od razu kieruje do obrońcy. Uzasadnienie nie jest obowiązkowe (tak karta usługi), więc przy braku czasu wystarcza sam sprzeciw.

```
@projekt
@data: [UZUPEŁNIJ: miejscowość], dnia [UZUPEŁNIJ: data]

@sad:
[UZUPEŁNIJ: sąd, który wydał wyrok nakazowy]
[UZUPEŁNIJ: wydział karny]
[UZUPEŁNIJ: adres sądu]

@strony:
Oskarżony: [UZUPEŁNIJ: imię i nazwisko]
[UZUPEŁNIJ: adres]
[UZUPEŁNIJ: numer telefonu, telefaksu i adres e-mail albo oświadczenie, że ich nie ma]

@sygnatura: Sygn. akt: [UZUPEŁNIJ: sygnatura z wyroku]

@tytul: SPRZECIW OD WYROKU NAKAZOWEGO

Wnoszę sprzeciw od wyroku nakazowego [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data wyroku], sygn. akt [UZUPEŁNIJ: sygnatura], doręczonego mi dnia [UZUPEŁNIJ: data doręczenia].

@podpis:
[UZUPEŁNIJ: imię i nazwisko oskarżonego]
```

## 20. Wniosek o rozłożenie grzywny na raty

Układ według karty 57/K/UU/SR. Podstawa i warunki (okres rat, przesłanki) są w Kodeksie karnym wykonawczym, który nie jest wbudowany: `[WYMAGA WERYFIKACJI: Kodeks karny wykonawczy, isap.sejm.gov.pl]`. Wniosek składa skazany do sądu, który wydał wyrok; fakty o sytuacji majątkowej i rodzinnej tylko od użytkownika, z dokumentami. Użyj zapisu wzoru 19 ze zmianami: strona `Skazany:`, tytuł `WNIOSEK O ROZŁOŻENIE GRZYWNY NA RATY`, treść `Wnoszę o rozłożenie na [UZUPEŁNIJ: liczba] rat grzywny w kwocie [UZUPEŁNIJ: kwota] zł orzeczonej wyrokiem [UZUPEŁNIJ: sąd] z dnia [UZUPEŁNIJ: data], sygn. akt [UZUPEŁNIJ: sygnatura]`, dodaj `# UZASADNIENIE` z polem `[UZUPEŁNIJ: dochody, koszty utrzymania, osoby na utrzymaniu, dlaczego jednorazowa zapłata nie jest możliwa, z dowodem]` i blok załączników z dowodami.
