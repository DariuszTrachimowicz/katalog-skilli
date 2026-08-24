# Recenzja JĘZYK I RYNEK, skill rodo-dokumentacja, cykl 1

Recenzent: panel eskalacji, rola językowo-rynkowa. Data: 24 sierpnia 2026.
Zakres: SKILL.md, references (stan-prawny.md, komponenty.md, granice.md),
INSTALACJA.md, DANE-I-PRYWATNOSC.md, assets/przyklady/rejestr-czynnosci-przyklad.md.
Reguły: skill-kreator-pl/references/jezyk-pl.md (całość), KONTEKST.md sekcja 3,
sekcja Język darmowego rodo-w-malej-firmie.

## 1. Rejestr, kalki, frazeologia

Rejestr jest jednolity i dobrze rozdzielony na warstwy: instrukcje dla asystenta
w drugiej osobie, dokumenty klienta w czasie teraźniejszym oznajmującym
z podmiotem osobowym (komponenty.md:49-53, zgodnie z jezyk-pl.md sekcja 3,
procedury), pliki dla klienta (INSTALACJA.md, DANE-I-PRYWATNOSC.md) per „Ty",
prosto i konsekwentnie. Reguła „Typowe, nigdy Standard" (SKILL.md:261-263) jest
wzorcowa i pilnuje języka w WYJŚCIU, nie tylko w treści. Potoczne wejścia
w description i w granice.md („uporządkujmy w końcu RODO na papierze", „ogarnij")
są rozumiane bez przenoszenia do dokumentów, zgodnie z jezyk-pl.md sekcja 4.

Skan czarnej listy kalk: jedno trafienie, stan-prawny.md:503 „Dedykowany
poradnik UODO" (kalka „dedykowany" z listy w jezyk-pl.md sekcja 2). Pozostałe
wystąpienia „standard/standardowe" to cytaty mowy użytkownika albo reguła
zakazująca, w porządku. „Adresowany do osób/obowiązek nie jest adresowany do"
(SKILL.md:337, granice.md:263, stan-prawny.md:76) uznaję za przyjęte w języku
prawniczym (adresat normy), nie za kalkę z listy.

## 2. Pojęcia RODO przy pierwszym użyciu, spójność z darmowym

SKILL.md:252-255 podaje brzmienia: administrator („ten, kto decyduje, po co dane
są zbierane") i podmiot przetwarzający („firma, która robi coś z danymi na Twoje
zlecenie") IDENTYCZNIE z darmowym rodo-w-malej-firmie (SKILL.md:124 darmowego).
Dodatkowo czynność przetwarzania ma własne, spójne brzmienie. To jest dobre.

Luka: komponenty.md:55-59 każe tłumaczyć przy pierwszym użyciu także kategorie
osób, kategorie danych, odbiorcę, powierzenie, upoważnienie i rozliczalność, ale
kanoniczne brzmienia dostały tylko trzy pojęcia. Powierzenie i naruszenie mają
w darmowym skillu ustalone brzmienia (powierzenie: „ustalenie na piśmie, kto za
co odpowiada"; naruszenie: „sytuacja, w której dane wypłynęły, zginęły albo
zobaczył je ktoś niepowołany") i płatny skill powinien ich używać dosłownie,
inaczej model za każdym razem improwizuje własną glosę i rozjeżdża się
z darmowym w obrębie jednej rodziny skilli.

## 3. Spójność terminologii między plikami (pary synonimów)

Wykryte pary do ujednolicenia:

1. **„brakuje" vs „NIEDOMKNIĘTE"** (nazwa kubełka Rejestru luk). SKILL.md:294
   i granice.md:112 mówią „domknięte / brakuje / do decyzji / poza zakresem tej
   sesji", a szablon w komponenty.md:749 nazywa ten kubełek „NIEDOMKNIĘTE
   ([liczba] pozycji)". Cały pakiet konsekwentnie mówi „pozycje domknięte
   i niedomknięte" (SKILL.md:48, granice.md:111, komponenty.md:712), więc
   ujednolicić na: „domknięte / niedomknięte / do decyzji / poza zakresem tej
   sesji" w SKILL.md:294 i granice.md:112.
2. **„odebranie upoważnienia" vs „odwołanie upoważnienia"**. Komponenty.md
   rozdziela te słowa celowo: upoważnienie się ODWOŁUJE (kolumny „Data
   odwołania", „Kto odwołał", komponenty.md:657; „zapis nadań i odwołań",
   komponenty.md:544; „z chwilą odwołania", komponenty.md:642-643), a ODBIERA
   się dostępy w systemach (osobna, obowiązkowa kolumna, komponenty.md:661-664).
   Tymczasem SKILL.md:140 mówi „ewidencja nadań i odebrań", a SKILL.md:281-282
   w kontroli spójności każe sprawdzić „kolumnę odebrania upoważnienia", czyli
   kolumnę, której szablon nie ma pod tą nazwą. Proponowane brzmienia:
   SKILL.md:140 „projekt treści upoważnienia oraz ewidencja nadań i odwołań";
   SKILL.md:281-282 „czy Ewidencja upoważnień ma kolumnę odwołania upoważnienia
   i osobną kolumnę odebrania dostępów w systemach oraz czynności przy odejściu
   osoby".
3. **„rolą i inicjałem albo symbolem" vs „rolą i symbolem"**. SKILL.md:84 dodaje
   „inicjałem", granice.md:231-232 i DANE-I-PRYWATNOSC.md:37 mówią „rolą
   i symbolem". W kilkuosobowej firmie inicjał bywa jednoznaczną identyfikacją,
   więc ujednolicić na „rolą i symbolem («osoba U-01, kadry»)" także
   w SKILL.md:84.
4. **Adnotacja pod kolumną podstawy prawnej** ma dwa „obowiązkowe" brzmienia:
   rejestr-czynnosci-przyklad.md:124-134 kończy się zdaniem „Narzędzie, którym
   przygotowano ten projekt, nie dobiera podstaw prawnych i nie potwierdza
   poprawności podstaw wpisanych przez firmę", którego nie ma w wersji
   w komponenty.md:347-353. Zdanie jest potrzebne (spina pułapkę „kolumna
   wypełniona przez użytkownika", komponenty.md:413-417), więc dopisać je także
   w komponenty.md.
5. **„ocena ryzyka" vs „analiza ryzyka"** w opisie komponentu 3. Nazwa
   kanoniczna to „Prosta analiza ryzyka", a SKILL.md:139 opisuje ją jako
   „ogólna, uproszczona ocena ryzyka po czynnościach". Rozumiem, że „ogólna
   ocena ryzyka" to poziom z materiałów UODO (stan-prawny.md:337), ale w tabeli
   komponentów lepiej „ogólna, uproszczona analiza ryzyka po czynnościach",
   żeby jedna linia nie mieszała obu słów z nazwą artefaktu obok.

Poza tym dyscyplina nazw kanonicznych (komponenty.md:16-45) jest bardzo dobra
i konsekwentnie przestrzegana w wszystkich siedmiu plikach.

## 4. Description

Długość: 923 znaki, w limicie 1024 (KONTEKST.md sekcja 2). Furtki NIE-używaj są
jednoznaczne i imienne: mapowanie od zera i incydent (rodo-w-malej-firmie),
dobór podstaw i oceny zgodności (odmowa plus specjalista), DPIA (poza zakresem),
polityka-ai, procedura-aml, pismo-urzedowe, czerwone-flagi-w-umowie. Kolizje
z katalogiem wg KONTEKST.md sekcja 3: brak. Rozgraniczenie z darmowym
rodo-w-malej-firmie jest czyste (mapa danych jako granica przekazania),
z procedura-aml rozłączne (tamten opis sam wyklucza „ogólne RODO"), pisma do
urzędu odesłane do pismo-urzedowe zgodnie z konwencją katalogu. Uwaga poza
plikami tego skilla, do rundy katalogowej: opis darmowego rodo-w-malej-firmie
w katalogu nie wspomina, że rejestr czynności to terytorium płatnego skilla;
warto rozważyć anty-wyzwalacz po tamtej stronie.

## 5. Daty słownie i skan bajtowy pauz

Skan bajtowy wszystkich 7 plików (U+2014 pauza, U+2013 półpauza): ZERO
wystąpień. Skan dat ISO (RRRR-MM-DD): ZERO wystąpień. Wszystkie widoczne daty
słownie („24 sierpnia 2026", „12 września 2025", metryczka z placeholderem
„data słownie, np. 24 sierpnia 2026"). Cudzysłowy typograficzne „ " stosowane
konsekwentnie. Zgodne z regułą dat po polsku i STANDARD „Język".

## Lista usterek

### BLOKERY

- B1. Niespójna nazwa kubełka Rejestru luk: „brakuje" (SKILL.md:294,
  granice.md:112) vs „NIEDOMKNIĘTE" (komponenty.md:749). Ujednolicić na
  „domknięte / niedomknięte / do decyzji / poza zakresem tej sesji".
- B2. „Odebranie upoważnienia" (SKILL.md:140, SKILL.md:281-282) vs „odwołanie
  upoważnienia" plus osobne „odebranie dostępów w systemach" (komponenty.md:544,
  657, 661-664); kontrola spójności w SKILL.md odwołuje się do kolumny, której
  szablon nie ma pod tą nazwą. Proponowane brzmienia w sekcji 3, punkt 2.

### DROBNE

- D1. Kalka „Dedykowany poradnik UODO" (stan-prawny.md:503); proponowane
  brzmienie: „Osobny poradnik UODO wyłącznie dla małych i średnich firm".
- D2. Brak kanonicznych brzmień tłumaczeń „powierzenia" i „naruszenia" spójnych
  z darmowym skillem; dopisać w SKILL.md:252-255 albo w komponenty.md:55-59
  brzmienia z darmowego (powierzenie: „ustalenie na piśmie, kto za co
  odpowiada"; naruszenie: „sytuacja, w której dane wypłynęły, zginęły albo
  zobaczył je ktoś niepowołany"), a przy okazji krótkie glosy dla odbiorcy
  i rozliczalności (ta ostatnia jest już zdefiniowana w komponenty.md:563,
  wystarczy wskazać ją jako brzmienie kanoniczne).
- D3. „Rolą i inicjałem albo symbolem" (SKILL.md:84) ujednolicić do „rolą
  i symbolem" jak w granice.md:231 i DANE-I-PRYWATNOSC.md:37.
- D4. Adnotacja pod kolumną podstawy prawnej: dopisać w komponenty.md:347-353
  końcowe zdanie o niepotwierdzaniu podstaw wpisanych przez firmę, obecne
  w rejestr-czynnosci-przyklad.md:124-134.
- D5. SKILL.md:139: „ogólna, uproszczona ocena ryzyka" zamienić na „ogólna,
  uproszczona analiza ryzyka", spójnie z nazwą kanoniczną artefaktu.

Werdykt roli: dwa blokery są czysto terminologiczne i szybkie do naprawy; poza
nimi warstwa językowa skilla jest na wysokim poziomie, z wzorcową dyscypliną
rejestru i nazw.

WERDYKT: blokery do wydania TAK

## Weryfikacja cyklu 2

Data: 24 sierpnia 2026. Zweryfikowano na aktualnych plikach skilla po naprawie
wg adjudykacji (temat T22 i pokrewne). Werdykt per znalezisko:

- **B1 NAPRAWIONE.** Kubełki wszędzie „DOMKNIĘTE / NIEDOMKNIĘTE / DO DECYZJI /
  POZA ZAKRESEM TEJ SESJI": SKILL.md:355-356, granice.md:140-141,
  komponenty.md:933-944 (szablon Rejestru luk) i komponenty.md:1079-1080
  (wynik kontroli). Dawne „brakuje" i „DO DECYZJI FIRMY LUB SPECJALISTY" nie
  występują (skan grep czysty; dopisek „firmy albo specjalisty" żyje w nawiasie
  za liczbą, nie w nazwie kubełka).
- **B2 NAPRAWIONE.** Kanon rozdzielony i nazwany wprost: „upoważnienie się
  ODWOŁUJE (dokument), dostępy się ODBIERA (systemy)" (komponenty.md:841-844).
  SKILL.md:179 „ewidencja nadań i odwołań", SKILL.md:341-342 kontrola sprawdza
  „kolumnę odwołania upoważnienia, osobną kolumnę odebrania dostępów
  w systemach". Fraza „odebranie upoważnienia" nie występuje w żadnym pliku.
- **D1 NAPRAWIONE.** stan-prawny.md:553 „Osobny poradnik UODO wyłącznie dla
  małych i średnich firm"; skan czarnej listy kalk w całej paczce: zero trafień.
- **D2 NAPRAWIONE.** Brzmienia kanoniczne tłumaczeń w SKILL.md:299-305
  i komponenty.md:64-74; powierzenie („ustalenie na piśmie, kto za co
  odpowiada") i naruszenie („sytuacja, w której dane wypłynęły, zginęły albo
  zobaczył je ktoś niepowołany") IDENTYCZNE z darmowym rodo-w-malej-firmie,
  do tego odbiorca i rozliczalność z jednym brzmieniem w obu plikach.
- **D3 NAPRAWIONE.** Wszędzie „bez imion, nazwisk i inicjałów" (SKILL.md:106,
  komponenty.md:121, granice.md:262-263, DANE-I-PRYWATNOSC.md:43); reguła
  wzmocniona konwencją U-XX plus [UZUPEŁNIJ LOKALNIE], spójną w pięciu plikach.
- **D4 NAPRAWIONE.** Adnotacja pod kolumną podstawy prawnej ma jedno, dłuższe
  brzmienie (ze zdaniem o niepotwierdzaniu podstaw) identyczne
  w komponenty.md:454-462 i rejestr-czynnosci-przyklad.md:144-152, plus jawna
  reguła „jedno brzmienie w całym pakiecie" (komponenty.md:464-466).
- **D5 NAPRAWIONE.** SKILL.md:178 „ogólna, uproszczona analiza ryzyka po
  czynnościach"; nazwa kanoniczna „Prosta analiza ryzyka" konsekwentna.

Kontrola zmienionych fragmentów pod kątem NOWYCH usterek (zasady naczelne
SKILL.md, sekcje 0/2/3/4/5 komponenty.md, przepisany przykład, granice,
DANE-I-PRYWATNOSC, INSTALACJA):

- Skan bajtowy wszystkich 7 plików: zero pauz (U+2014), zero półpauz (U+2013),
  zero dat ISO; daty słownie zachowane w nowych fragmentach.
- Description po zmianie T5/T24: 1019/1024 znaków, w limicie (blisko sufitu:
  każda kolejna zmiana description wymaga ponownego pomiaru); skrót DPIA raz,
  przy pełnej nazwie, spójnie z wyjątkiem opisanym w komponenty.md:43-47.
- Nowe terminy wprowadzone naprawą są spójne między plikami: [UZUPEŁNIJ
  LOKALNIE] (SKILL, komponenty, przykład, granice, DANE-I-PRYWATNOSC), nazwa
  kolumny „Przekazanie do państwa trzeciego lub organizacji międzynarodowej"
  (komponenty:436 i 517, przykład:115 i 128), nowe kolumny Ewidencji i Rejestru
  luk zgodne między szablonem a listą kontrolną. Kalk w nowych fragmentach nie
  znalazłem.
- NOWE DROBNE (jedno): rejestr-czynnosci-przyklad.md:181 zdanie wprowadzające
  sekcji „Braki do domknięcia" wymienia tylko `[UZUPEŁNIJ]`
  i `[WYMAGA WERYFIKACJI]`, bez `[UZUPEŁNIJ LOKALNIE]`, niespójnie
  z komponenty.md:181-183 i z listą kontrolną komponenty.md:1072-1074;
  proponowane brzmienie: „Wypisujesz tu wszystkie [UZUPEŁNIJ], [UZUPEŁNIJ
  LOKALNIE] i [WYMAGA WERYFIKACJI] z dokumentu". Wiersz tabeli i lista
  kontrolna i tak wymuszają właściwe zachowanie, więc to nie bloker.

Wszystkie znaleziska cyklu 1 tej roli są naprawione w całości; naprawa nie
wprowadziła blokerów językowych.

WERDYKT: blokery do wydania TAK
