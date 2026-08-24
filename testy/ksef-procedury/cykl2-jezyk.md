# CYKL 2: re-audyt językowo-terytorialny skilla `ksef-procedury`

Data kontroli: 24.08.2026

Zakres: cały pakiet `../skille-platne/ksef-procedury/` oraz porównanie granic z:

- `skille/e-doreczenia-w-firmie/SKILL.md`;
- `skille/faktura-do-tabeli/SKILL.md`;
- `skille/kalendarz-obowiazkow/SKILL.md`.

Punkt odniesienia: 10 blokerów z `testy/ksef-procedury/panel-jezyk.md`.

## Werdykt

**WERDYKT: blokery do wydania TAK.**

Z 10 blokerów cyklu 1 zamknięto 7. Nadal otwarte są 3: pełny format
znaczników weryfikacji, spójność nazw artefaktów między wszystkimi plikami oraz
jedna taksonomia czterech trybów. Rewizja wprowadziła też nową istotną
niespójność terminologiczną: pakiet miejscami traktuje odebranie uprawnienia
i unieważnienie certyfikatu jak tę samą operację.

## Wynik kontroli 10 blokerów z cyklu 1

| # | Bloker z cyklu 1 | Wynik cyklu 2 |
|---|---|---|
| 1 | dodatnia część opisu szersza niż terytorium procedur | **ZAMKNIĘTY** |
| 2 | komponent 7 wchodzi w terytorium e-Doręczeń | **ZAMKNIĘTY** |
| 3 | wzorce procedur w trybie rozkazującym lub bezokoliczniku | **ZAMKNIĘTY** |
| 4 | błędna data numeru KSeF przy płatności | **ZAMKNIĘTY** |
| 5 | nieaktualna rola MCU | **ZAMKNIĘTY** |
| 6 | zbyt szeroka reguła dwóch kodów QR | **ZAMKNIĘTY** |
| 7 | niepełne znaczniki weryfikacji i niekonkretne źródła | **OTWARTY** |
| 8 | zmienne nazwy artefaktów | **OTWARTY** |
| 9 | niespójne nazwy czterech trybów | **OTWARTY** |
| 10 | przykład będący prawie gotowym dokumentem | **ZAMKNIĘTY** |

## 1. Opis i terytorium: bloker zamknięty

Opis wiąże dodatnie wyzwalacze z porządkowaniem procesu, ról albo dokumentacji
KSeF i doprecyzowuje uprawnienie biura jako uprawnienie do faktur w KSeF
(`../skille-platne/ksef-procedury/SKILL.md:3`). Wprost wyłącza sprawdzanie
pojedynczej faktury i objaśnianie formatu numeru. Jest to spójne z wyzwalaczem
`faktura-do-tabeli`, który przejmuje przypadek załączonej faktury
(`skille/faktura-do-tabeli/SKILL.md:3`).

Opis poprawnie wyłącza też kalendarz obowiązków i e-Doręczenia. Granice
odpowiadają zakresom skilli sąsiednich: cykliczny kalendarz należy do
`kalendarz-obowiazkow` (`skille/kalendarz-obowiazkow/SKILL.md:3`), a ustalanie,
kto i jak pilnuje skrzynki, do `e-doreczenia-w-firmie`
(`skille/e-doreczenia-w-firmie/SKILL.md:3`). Końcowa formuła o sekretach została
też poprawiona na „pliki certyfikatów ani inne sekrety”.

## 2. Komponent 7: bloker zamknięty

Komponent 7 jest teraz czystym odesłaniem. Tabela komponentów obiecuje jedno
zdanie kierujące do `e-doreczenia-w-firmie`
(`../skille-platne/ksef-procedury/SKILL.md:125`), a właściwa sekcja jawnie
zakazuje budowania własnego szablonu ról, częstotliwości i zastępstw
(`../skille-platne/ksef-procedury/references/komponenty.md:826-844`). To pokrywa
się z terytorium skilla e-Doręczeń i nie tworzy już konkurencyjnego dokumentu.

Granica z kalendarzem również została doprecyzowana: KSeF zapisuje zdarzenie,
właściciela i datę, ale cykliczny kalendarz przekazuje do
`kalendarz-obowiazkow`
(`../skille-platne/ksef-procedury/references/komponenty.md:444-447`).

## 3. Rejestr językowy wzorców: bloker zamknięty

Reguła czasu teraźniejszego oznajmującego jest spójna w `SKILL.md`
(`../skille-platne/ksef-procedury/SKILL.md:196-202`) i w referencji
(`../skille-platne/ksef-procedury/references/komponenty.md:40-47`). Poprawiono
trzy główne wzorce wskazane w cyklu 1:

- kroki przy braku dostępu mają formy „notuje”, „sprawdza”, „podejmuje”,
  „wystawia”, „oznacza” i „zapisuje”
  (`../skille-platne/ksef-procedury/references/komponenty.md:232-256`);
- lista czynności przy odejściu osoby opisuje działania formami „odbiera”,
  „sprawdza”, „ustala” i „potwierdza”
  (`../skille-platne/ksef-procedury/references/komponenty.md:461-483`);
- ścieżka reakcji na odrzucenie używa form „zauważa”, „zapisuje”, „ustala”,
  „sprawdza” i „informuje”
  (`../skille-platne/ksef-procedury/references/komponenty.md:555-573`).

Tryb rozkazujący pozostaje w instrukcjach kierowanych do asystenta i czytelnika,
co nie łamie reguły dla treści procedur. Dwa imperatywy w komórkach instruktażowych
wzoru formy, „zapisz” i „sprawdź i zapisz”, warto dla pełnej czystości zastąpić
opisami pól, ale nie są one już gotowymi krokami procedury
(`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:58,71`).

## 4. Data płatności: bloker zamknięty

W całym pakiecie operacyjną datą jest 1 stycznia 2027, z warunkami zakresu,
a nie regułą „przy każdej płatności”
(`../skille-platne/ksef-procedury/references/stan-prawny.md:222-240`;
`../skille-platne/ksef-procedury/references/komponenty.md:735-766`). Data
1 sierpnia 2026 występuje tylko w zdaniu zakazującym jej użycia
(`../skille-platne/ksef-procedury/references/stan-prawny.md:224-226`).

Stan odpowiada stronie Ministerstwa Finansów:
`https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/`
(sprawdzono 24.08.2026).

## 5. MCU: bloker zamknięty

MCU jest opisany jako moduł przygotowawczy, a bieżące zarządzanie od 1 lutego
2026 jest kierowane do Aplikacji Podatnika KSeF 2.0 albo przez API KSeF 2.0
(`../skille-platne/ksef-procedury/references/stan-prawny.md:134-145`;
`../skille-platne/ksef-procedury/references/komponenty.md:449-454`;
`../skille-platne/ksef-procedury/references/granice.md:98-100`). Nie znaleziono
już instrukcji kierującej użytkownika do MCU jako aktualnego, odrębnego miejsca
pracy.

Stan odpowiada stronie Ministerstwa Finansów:
`https://ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/`
(sprawdzono 24.08.2026).

## 6. Kody QR: bloker zamknięty

Regułę rozpisano według momentu, odbiorcy i trybu. Tabela odróżnia jeden kod po
przesłaniu, dwa kody przed przesłaniem w ustawowo wskazanych sytuacjach, tryb
awaryjny, awarię całkowitą oraz potwierdzenie transakcji dla krajowego nabywcy
z NIP (`../skille-platne/ksef-procedury/references/komponenty.md:290-313`). Plan
testów odsyła do tych warunków, zamiast podawać samodzielną regułę „zawsze dwa”
(`../skille-platne/ksef-procedury/references/komponenty.md:631-640`).

Stan odpowiada stronom Ministerstwa Finansów:
`https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/`
oraz
`https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/`
(sprawdzono 24.08.2026).

## 7. Znaczniki weryfikacji: bloker nadal otwarty

Większość właściwych znaczników ma już pełny format i konkretną ścieżkę strony,
na przykład przy trybach, kodach QR, certyfikatach i płatnościach
(`../skille-platne/ksef-procedury/references/komponenty.md:210-213,307-308,442-454,751-766`).
Nie jest to jednak poprawione konsekwentnie:

- znacznik dotyczący wymiany klucza integracyjnego podaje jedynie „źródło:
  dostawca programu”, bez konkretnego adresu
  (`../skille-platne/ksef-procedury/references/granice.md:88-93`);
- znacznik dotyczący znaczenia kodów łączy konkretną stronę MF z ogólnym
  „oraz dostawca programu”, również bez adresu jego kanału wsparcia
  (`../skille-platne/ksef-procedury/references/komponenty.md:575-584`);
- instrukcja nadal pokazuje skrócone `[WYMAGA WERYFIKACJI]` jako zapis w tekście,
  mimo że sama wymaga pełnej postaci
  (`../skille-platne/ksef-procedury/SKILL.md:183-190`;
  `../skille-platne/ksef-procedury/references/granice.md:131-134`).

To koliduje z zasadą, że nieznany adres ma zostać osobnym
`[UZUPEŁNIJ: adres do zapisania przy wdrożeniu]`, a nie niekonkretnym źródłem
(`../skille-platne/ksef-procedury/SKILL.md:99-104`), oraz z rejestrem źródeł,
który dla dostawcy przewiduje uzupełnienie kanału wsparcia
(`../skille-platne/ksef-procedury/references/stan-prawny.md:278-300`).

Minimalna poprawka: rozdzielić źródło urzędowe od zachowania konkretnego
programu, a przy dostawcy użyć jawnego placeholdera na dokładny adres kanału
wsparcia. W metainstrukcjach nie pokazywać skróconej postaci znacznika jako
wzorca do kopiowania.

## 8. Nazwy artefaktów między plikami: bloker nadal otwarty

Tabela nazw kanonicznych jest dobrym centrum taksonomii
(`../skille-platne/ksef-procedury/references/komponenty.md:13-38`), a stare nazwy
„rejestr błędów”, „matryca nadań”, „checklista wdrożeniowa”, „przegląd zgodności
operacyjnej” i „lista odejścia” występują już tylko jako przykłady zakazane.
Nazwy kanoniczne nadal nie są jednak stosowane dosłownie między wszystkimi
plikami:

- kanoniczna „karta postępowania przy braku dostępu do systemu” jest skracana do
  „karty postępowania” w przykładzie
  (`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:66,72`)
  i w liście kontrolnej
  (`../skille-platne/ksef-procedury/references/komponenty.md:850-859`);
- plik prywatności wylicza „macierz” i „kartę postępowania” zamiast pełnych nazw
  kanonicznych (`../skille-platne/ksef-procedury/DANE-I-PRYWATNOSC.md:51-58`);
- „matryca uprawnień i certyfikatów” skraca się do „matrycy uprawnień” w wariancie
  B (`../skille-platne/ksef-procedury/references/komponenty.md:650-672`);
- pojawia się niezdefiniowany w tabeli kanonicznej „protokół przeglądu”, obok
  kanonicznego „protokołu stanu wdrożenia”
  (`../skille-platne/ksef-procedury/references/komponenty.md:125-126,482-496`;
  `../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:69-71`).

Ostatni przypadek może sprawić, że użytkownik potraktuje „protokół przeglądu”
jako osobny dokument. Trzeba albo nadać mu jedną zdefiniowaną nazwę i dopisać do
taksonomii, albo zastąpić go dowodem w istniejącym artefakcie, na przykład
„wpisem w matrycy uprawnień i certyfikatów”.

## 9. Nazwy czterech trybów: bloker nadal otwarty

Pakiet prawidłowo definiuje cztery nazwy kanoniczne: „tryb offline24”, „tryb
offline przy niedostępności KSeF”, „tryb awaryjny przy awarii KSeF” i „awaria
całkowita KSeF” (`../skille-platne/ksef-procedury/references/komponenty.md:35-38`;
`../skille-platne/ksef-procedury/references/stan-prawny.md:163-187`). Jednocześnie
sam łamie polecenie używania ich dosłownie:

- opis skraca listę do „offline24, niedostępność, awaria, awaria całkowita”
  (`../skille-platne/ksef-procedury/SKILL.md:3`);
- wzór karty zdarzenia ponownie każe wybrać „offline24 / niedostępność / awaria /
  awaria całkowita”
  (`../skille-platne/ksef-procedury/references/komponenty.md:315-330`);
- wzór formy używa „trybu offline24, niedostępności albo trybu awaryjnego” oraz
  skrótu „awaria całkowita”
  (`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:64-72,101-103`);
- dalsze odwołania w referencji również używają „przy niedostępności” i „w trybie
  awaryjnym” zamiast pełnych nazw, na przykład w szablonie macierzy i ścieżce
  reakcji (`../skille-platne/ksef-procedury/references/komponenty.md:121-125,557-567`).

To nie jest wyłącznie skrót stylistyczny, ponieważ `komponenty.md:35-38` oraz
`stan-prawny.md:163-166` jawnie zabraniają wariantów opisowych. Najważniejsze do
poprawy są opis wyzwalający oraz pola wzorców, bo właśnie je model i użytkownik
kopiują.

## 10. Wzór formy z placeholderami: bloker zamknięty

Usunięto fikcyjną firmę, nazwiska, program, godziny, foldery i gotowe terminy
organizacyjne. Plik jest teraz wyraźnie nazwany wzorem formy, objaśnia funkcję
kolumn i ma placeholdery w polach zależnych od realiów firmy
(`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:1-11,41-73`).
Nie da się go wdrożyć przez prostą podmianę nazw; wymaga wywiadu i uzupełnienia
właścicieli, zastępców, terminów oraz dowodów.

Drobna niespójność bez samodzielnej wagi blokera: zdanie „Każda komórka zawiera
opis” jest zbyt absolutne, bo część komórek zawiera ustalone elementy formy lub
reguły, a nie placeholder. Warto zmienić je na „Każde pole zależne od realiów
firmy zawiera placeholder” (`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:3-7`).

## Nowa niespójność wprowadzona przez rewizję: uprawnienie a certyfikat

**BLOKER NOWY.** Pakiet poprawnie rozróżnia odebranie uprawnienia od
unieważnienia certyfikatu w części merytorycznej, ale w tekstach bezpieczeństwa
ponownie skleja te operacje:

- „Certyfikat i uprawnienie KSeF unieważnia się”
  (`../skille-platne/ksef-procedury/DANE-I-PRYWATNOSC.md:24-32`);
- „certyfikat KSeF albo uprawnienie w systemie: unieważnia i nadaje się je”
  (`../skille-platne/ksef-procedury/references/granice.md:79-93`).

W innych miejscach pakiet sam ustala poprawną terminologię: uprawnienie się
nadaje i odbiera, a certyfikat unieważnia
(`../skille-platne/ksef-procedury/references/komponenty.md:449-459,461-481`).
To nie jest kosmetyka: błędne czasowniki stoją właśnie w instrukcji reakcji na
ujawnienie sekretu. Trzeba rozdzielić zdanie na dwie operacje i zachować to samo
brzmienie również w `SKILL.md:46-56`.

## Kontrola bajtowa i cudzysłowy

Kontrolą objęto wszystkie 7 plików pakietu. Wynik:

- U+2013: 0;
- U+2014: 0;
- sekwencja UTF-8 `E2 80 93`: 0;
- sekwencja UTF-8 `E2 80 94`: 0;
- encje półpauzy i pauzy: 0;
- proste cudzysłowy ASCII w Markdown: 0;
- polskie cudzysłowy `„”`: wszystkie domknięte i w prawidłowej kolejności.

Kontrola długich myślników i cudzysłowów: **ZALICZONA**.

## Nowe kalki i usterki językowe

Nie wróciły „checklista”, „lista odejścia”, „po naszej stronie odpowiada” ani
„żeby to zapadło” w roli zalecanych brzmień. Znalazła się natomiast nowa kalka:

- „Usunięcie plików lokalnych to Twoja strona” jest nienaturalnym przeniesieniem
  konstrukcji „your side”. Naturalnie: „Za usunięcie plików lokalnych
  odpowiadasz Ty” (`../skille-platne/ksef-procedury/DANE-I-PRYWATNOSC.md:67-68`).

Sama kalka nie przesądza o werdykcie, ale powinna zostać poprawiona przed
sprzedażą. Blokują natomiast niespójne operacje na uprawnieniach i certyfikatach,
bo mogą zmienić znaczenie instrukcji bezpieczeństwa.

## Minimalny zestaw poprawek przed wydaniem

1. Zastąpić niekonkretne „źródło: dostawca programu” placeholderem na dokładny
   adres kanału wsparcia i usunąć skrócone znaczniki pokazywane jako wzorce.
2. Zastosować pełne nazwy kanoniczne artefaktów w opisie, pliku prywatności,
   przykładzie, wariancie B i liście kontrolnej; zdefiniować albo usunąć „protokół
   przeglądu”.
3. W opisie oraz we wszystkich wzorach użyć dosłownie czterech kanonicznych nazw
   trybów.
4. Rozdzielić operacje: uprawnienie się nadaje i odbiera, certyfikat się wydaje
   i unieważnia. Poprawić tekst reakcji na ujawniony sekret w `SKILL.md`,
   `DANE-I-PRYWATNOSC.md` i `references/granice.md`.
5. Poprawić kalkę „to Twoja strona” i pomocniczo ujednolicić instruktażowe
   komórki wzoru formy.

**WERDYKT KOŃCOWY: blokery do wydania TAK.**
