# Panel QA: język, polski rynek, opis i terytorium

Data kontroli: 24.08.2026

Zakres: cały pakiet `../skille-platne/ksef-procedury/` oraz porównanie opisów
skilli `faktura-do-tabeli`, `przygotowanie-do-ksiegowej`,
`kalendarz-obowiazkow`, `e-doreczenia-w-firmie` i `procedura-aml`.

## Ocena ogólna

**WERDYKT: blokery do wydania TAK.**

Opis ma dobre słowa urzędowe, potoczne wejścia i jawnie odcina pięć wskazanych
skilli. Pakiet nie jest jednak gotowy do sprzedaży. Zawiera nieaktualne reguły
rynku polskiego, sprzeczne nazwy komponentów i trybów, wzorce procedur w trybie
rozkazującym zamiast w czasie teraźniejszym oznajmującym oraz przykład, który
mimo ostrzeżenia jest prawie gotowym dokumentem do skopiowania.

## 1. Opis, uruchamianie i kolizje

### Co działa

- Opis łączy nazwy urzędowe i techniczne z mową potoczną: `KSeF`, `FA(3)`,
  `offline24`, „co robimy, jak KSeF padnie” i „faktura się odrzuciła”
  (`../skille-platne/ksef-procedury/SKILL.md:3`). To jest właściwy kierunek
  dla opisu wyzwalającego.
- Wszystkie pięć wskazanych sąsiednich terytoriów jest nazwanych w części
  negatywnej (`../skille-platne/ksef-procedury/SKILL.md:3`). Odpowiada to ich
  własnym zakresom: odczyt załączonych faktur
  (`skille/faktura-do-tabeli/SKILL.md:3`), paczka dokumentów za miesiąc
  (`skille/przygotowanie-do-ksiegowej/SKILL.md:3`), kalendarz cykliczny
  (`skille/kalendarz-obowiazkow/SKILL.md:3`), firmowe e-Doręczenia
  (`skille/e-doreczenia-w-firmie/SKILL.md:3`) i AML
  (`../skille-platne/procedura-aml/SKILL.md:3`).
- Granica z integracją, konfiguracją programu, doradztwem podatkowym
  i wykonywaniem czynności w systemie jest podana już w opisie, a następnie
  rozwinięta w instrukcji (`../skille-platne/ksef-procedury/SKILL.md:3`,
  `../skille-platne/ksef-procedury/SKILL.md:189-219`).

### BLOKER: część dodatnia opisu jest szersza niż terytorium procedur

Wyzwalacze `numer KSeF`, „kto ma u nas wystawiać faktury” i „biuro prosi
o dostęp do faktur” nie wymagają kontekstu budowy procedury
(`../skille-platne/ksef-procedury/SKILL.md:3`). Obejmują również pytanie
o odczyt numeru z pojedynczego załącznika, zwykły podział pracy poza KSeF albo
dostęp do dokumentów w innym systemie. To tworzy kolizję zwłaszcza z opisem,
który każe uruchamiać `faktura-do-tabeli` zawsze po załączeniu faktury
(`skille/faktura-do-tabeli/SKILL.md:3`). Sama negacja „nie do przepisywania”
nie rozstrzyga przypadku: „na tej fakturze znajdź numer KSeF”.

Opis powinien wiązać te frazy z porządkowaniem procesu, ról albo dokumentacji
w KSeF oraz wyłączyć sprawdzanie pojedynczej faktury i objaśnianie samego
formatu numeru. „Biuro prosi o dostęp do faktur” należy doprecyzować do „biuro
prosi o uprawnienie do faktur w KSeF”. Końcowe „nie przyjmuje certyfikatów”
powinno brzmieć „nie przyjmuje plików certyfikatów ani innych sekretów”, bo
wcześniej ten sam opis obiecuje pracę nad certyfikatami
(`../skille-platne/ksef-procedury/SKILL.md:3`).

### BLOKER: komponent 7 wchodzi w terytorium e-Doręczeń

Opis KSeF wyłącza e-Doręczenia (`../skille-platne/ksef-procedury/SKILL.md:3`),
ale komponent „Gotowość komunikacyjna” każe ustalić, kto sprawdza
korespondencję urzędową, jak często i kto go zastępuje
(`../skille-platne/ksef-procedury/references/komponenty.md:522-538`). To jest
dokładnie jedna z sytuacji wyzwalających `e-doreczenia-w-firmie`, czyli
ustalanie, kto i jak pilnuje skrzynki
(`skille/e-doreczenia-w-firmie/SKILL.md:3`). Odesłanie do sąsiedniego skilla
jest dobre, lecz nie powinno być siódmym dokumentem wytwarzanym przez KSeF.
Bezpieczna granica to krótki komunikat przekazujący temat, bez własnego
szablonu ról i częstotliwości.

Podobne, mniejsze tarcie powstaje przy nakazie wpisania odnowienia certyfikatu
do kalendarza (`../skille-platne/ksef-procedury/references/komponenty.md:242-254`).
KSeF może wskazać zdarzenie i właściciela, ale sam cykliczny kalendarz powinien
zostać przekazany do `kalendarz-obowiazkow`, zgodnie z granicą opisu.

## 2. Warstwa językowa

### Kontrole zaliczone

Kontrola wszystkich plików pakietu dała:

- 0 znaków U+2013 i U+2014;
- 0 sekwencji bajtowych UTF-8 `E2 80 93` i `E2 80 94`;
- 0 encji HTML odpowiadających półpauzie albo pauzie, a także 0 innych encji
  HTML w plikach Markdown;
- wszystkie polskie cudzysłowy `„”` domknięte we właściwej kolejności;
- 0 cudzysłowów prostych ASCII w treści Markdown.

Kryteria długich myślników, encji i polskich cudzysłowów: **ZALICZONE**.

### BLOKER: wzorce procedur łamią własną regułę rejestru

Instrukcja poprawnie wymaga w procedurach czasu teraźniejszego oznajmującego,
na przykład „osoba wystawiająca sprawdza”
(`../skille-platne/ksef-procedury/SKILL.md:168-173`). Referencja, z której model
ma kopiować formę, podaje jednak ciąg rozkazów: „stwierdź”, „sprawdź”, „zapisz”,
„podejmij”, „wystawiaj”, „oznacz”, „wyślij” i „zamknij”
(`../skille-platne/ksef-procedury/references/komponenty.md:154-160`). Ten sam
rozjazd wraca w ścieżce reakcji: „zauważ, zapisz, ustal, popraw, wyślij”
(`../skille-platne/ksef-procedury/references/komponenty.md:319-322`) oraz w
bezokolicznikowej „liście odejścia”
(`../skille-platne/ksef-procedury/references/komponenty.md:263-270`).

Wzorce powinny brzmieć konsekwentnie: „osoba odpowiedzialna stwierdza brak
dostępu”, „sprawdza komunikat”, „zapisuje stan”, „podejmuje decyzję”. Inaczej
model dostaje silniejszy wzorzec do kopiowania niż ogólną regułę ze
`SKILL.md`.

### Pozostałe usterki językowe

- „Dokumenty powstają z odpowiedzi o realną organizację pracy” ma błędną
  łączliwość. Naturalnie: „Dokumenty powstają z odpowiedzi dotyczących realnej
  organizacji pracy” albo „z odpowiedzi na pytania o realną organizację pracy”
  (`../skille-platne/ksef-procedury/SKILL.md:16-20`).
- `checklista` jest zbędnym zapożyczeniem i występuje jako nazwa artefaktu oraz
  sekcji. W polskiej procedurze właściwa jest `lista kontrolna`
  (`../skille-platne/ksef-procedury/SKILL.md:103`,
  `../skille-platne/ksef-procedury/SKILL.md:142-145`,
  `../skille-platne/ksef-procedury/references/komponenty.md:540`).
- „Lista odejścia” brzmi jak kalka. W tym samym pliku istnieje naturalna nazwa
  „lista czynności przy odejściu osoby”
  (`../skille-platne/ksef-procedury/references/komponenty.md:263-270`,
  `../skille-platne/ksef-procedury/references/komponenty.md:550-553`).
- „Po naszej stronie odpowiada za to...” można skrócić do naturalnego „W firmie
  odpowiada za to...”
  (`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:62-64`).
- Zdanie „to jedyny sposób, żeby to zapadło” wymaga dopełnienia „w pamięć”
  (`../skille-platne/ksef-procedury/references/komponenty.md:511-514`).

## 3. Polski rynek i wartości zmienne

### Kontrole zaliczone

- W pakiecie nie ma USD, EUR, GBP, CHF ani obcych symboli walut. Kwoty są
  podane w złotych (`../skille-platne/ksef-procedury/references/stan-prawny.md:28-41`;
  `../skille-platne/ksef-procedury/references/komponenty.md:476-490`).
- Nie znaleziono odesłań do obcego prawa ani obcych organów. Pakiet pozostaje
  przy KSeF, Ministerstwie Finansów, KAS, BIP i polskich realiach firmy.

### BLOKER: błędna data numeru KSeF przy płatności

Plik stanu prawnego twierdzi, że numer KSeF w komunikacie przelewu MPP jest
obowiązkowy od 1 sierpnia 2026 roku
(`../skille-platne/ksef-procedury/references/stan-prawny.md:50-55`). Ta sama
reguła trafia do gotowego szablonu i pułapki praktycznej
(`../skille-platne/ksef-procedury/references/komponenty.md:451-464`,
`../skille-platne/ksef-procedury/references/komponenty.md:501-507`). Aktualny
serwis Ministerstwa Finansów podaje 1 stycznia 2027 roku zarówno dla płatności
między czynnymi podatnikami VAT objętych wskazanym zakresem, jak i dla MPP:
[Numer KSeF i zbiorczy identyfikator](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/).

Sformułowanie „obowiązek staje się powszechny” jest dodatkowo za szerokie,
bo oficjalny opis wymienia warunki dotyczące stron płatności i użytego
instrumentu (`../skille-platne/ksef-procedury/references/komponenty.md:456-460`).
Etykieta `[WYMAGA WERYFIKACJI]` nie naprawia instrukcji, która już podaje
błędną datę jako podstawę procedury.

### BLOKER: nieaktualna rola Modułu Certyfikatów i Uprawnień

Pakiet podaje, że od 1 listopada 2025 roku uprawnienia nadaje się wyłącznie
w MCU i nadal kieruje tam nadawanie, odbieranie oraz unieważnianie
(`../skille-platne/ksef-procedury/references/stan-prawny.md:46-49`,
`../skille-platne/ksef-procedury/references/komponenty.md:226-240`,
`../skille-platne/ksef-procedury/references/komponenty.md:256-267`,
`../skille-platne/ksef-procedury/references/granice.md:48-59`,
`../skille-platne/ksef-procedury/DANE-I-PRYWATNOSC.md:19-30`). Według serwisu
MF MCU służył do przygotowania przed uruchomieniem KSeF 2.0, a od lutego 2026
roku zarządzanie jest dostępne w Aplikacji Podatnika KSeF 2.0 albo przez API.
Źródła: [Moduł Certyfikatów i Uprawnień](https://ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/)
oraz [Certyfikaty KSeF](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/).

To jest szczególnie poważne, bo plik deklaruje stan prawny dokładnie na dzień
kontroli (`../skille-platne/ksef-procedury/references/stan-prawny.md:3-7`,
`../skille-platne/ksef-procedury/references/stan-prawny.md:23-26`).

### BLOKER: reguła dwóch kodów QR jest zbyt szeroka

Szablon mówi, że każda faktura wystawiona poza systemem i przekazywana
kontrahentowi na wydruku albo w pliku wymaga dwóch kodów QR
(`../skille-platne/ksef-procedury/references/komponenty.md:162-175`). Bez
warunku odbiorcy i chwili udostępnienia reguła jest nieprawidłowa. Oficjalna
instrukcja wiąże dwa kody z udostępnieniem poza KSeF przed przesłaniem faktury
do systemu określonym odbiorcom. Po przesłaniu stosuje się jeden kod, a dla
krajowego nabywcy z NIP przed przesłaniem przewidziano potwierdzenie transakcji:
[Tryb offline24](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/).

Ten sam skrót trafia do planu testów i przykładu
(`../skille-platne/ksef-procedury/references/komponenty.md:367-377`,
`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:108-117`).
Trzeba opisać warunki, nie tylko dopisać ogólną etykietę weryfikacyjną.

### BLOKER: oznaczenia weryfikacji i źródła nie spełniają własnej reguły

`SKILL.md` wymaga formatu `[WYMAGA WERYFIKACJI: ...; źródło: ...]`
(`../skille-platne/ksef-procedury/SKILL.md:63-70`), a referencja powtarza ten
wymóg (`../skille-platne/ksef-procedury/references/komponenty.md:3-5`). Mimo
to tabela trybów używa skróconych oznaczeń bez źródła, w tym
`[WYMAGA WERYFIKACJI: adres]` i samych `[WYMAGA WERYFIKACJI]`
(`../skille-platne/ksef-procedury/references/komponenty.md:138-148`). Data
1 sierpnia wraca później bez żadnego oznaczenia
(`../skille-platne/ksef-procedury/references/komponenty.md:501-507`).

Jest też sprzeczność jakości źródeł. Plik stanu prawnego każe podawać konkretny
adres, nie samą domenę (`../skille-platne/ksef-procedury/references/stan-prawny.md:83-100`),
lecz prawie wszystkie znaczniki podają wyłącznie `ksef.podatki.gov.pl`, na
przykład przy progach, karach, strukturze, MCU i płatnościach
(`../skille-platne/ksef-procedury/references/stan-prawny.md:28-55`). Źródło
powinno wskazywać dokładną stronę tematyczną i datę jej sprawdzenia.

## 4. Spójność nazw, komponentów, sekcji i trybów

### BLOKER: nazwy artefaktów zmieniają się między plikami

- Opis obiecuje `rejestr odrzuceń`, tabela komponentów `rejestr błędów
  i odrzuceń`, a późniejsze skróty mówią ponownie o `rejestrze błędów` albo
  `rejestrze odrzuceń` (`../skille-platne/ksef-procedury/SKILL.md:3`,
  `../skille-platne/ksef-procedury/SKILL.md:97-105`,
  `../skille-platne/ksef-procedury/SKILL.md:175-181`,
  `../skille-platne/ksef-procedury/references/komponenty.md:287-303`).
- Opis obiecuje `matrycę uprawnień i certyfikatów`, tabela `matrycę nadań
  i odbioru uprawnień`, referencja `Matrycę nadań`, a kontrola znowu `matrycę
  uprawnień` (`../skille-platne/ksef-procedury/SKILL.md:3`,
  `../skille-platne/ksef-procedury/SKILL.md:97-103`,
  `../skille-platne/ksef-procedury/SKILL.md:175-181`,
  `../skille-platne/ksef-procedury/references/komponenty.md:224-232`).
- Komponent 5 raz nazywa wariant A `checklistą wdrożeniową`, a w referencji
  `planem testów`. Wariant B to `przegląd zgodności operacyjnej`, lecz checklista
  końcowa skraca nazwę do `przeglądu operacyjnego`
  (`../skille-platne/ksef-procedury/SKILL.md:97-105`,
  `../skille-platne/ksef-procedury/SKILL.md:142-145`,
  `../skille-platne/ksef-procedury/references/komponenty.md:351-385`,
  `../skille-platne/ksef-procedury/references/komponenty.md:555-556`).

Każdy komponent powinien mieć jedną nazwę kanoniczną używaną w opisie,
`SKILL.md`, nagłówku referencji, odwołaniach i przykładzie.

### BLOKER: nazwy trybów szczególnych nie tworzą jednej taksonomii

Opis wymienia `offline24`, `niedostępność` i `awarię`, pomijając awarię
całkowitą (`../skille-platne/ksef-procedury/SKILL.md:3`). Referencja rozróżnia
cztery stany, ale nazywa je częściowo opisowo
(`../skille-platne/ksef-procedury/references/komponenty.md:136-148`), a plik
stanu prawnego stosuje jeszcze inne warianty nazw
(`../skille-platne/ksef-procedury/references/stan-prawny.md:61-65`).

Potrzebna jest jedna, powtarzana dosłownie lista, zgodna z aktualną terminologią
MF: tryb offline24, tryb offline przy niedostępności KSeF, tryb awaryjny przy
awarii KSeF oraz awaria całkowita KSeF. Przy każdej pozycji trzeba zachować
jej osobne warunki i skutki.

Dodatkowo część B tworzy niezdefiniowany `rejestr zdarzeń`, po czym każe
zamknąć zdarzenie w `rejestrze błędów`, chociaż odrębnym artefaktem tej części
jest `karta zdarzenia`
(`../skille-platne/ksef-procedury/references/komponenty.md:154-180`). Trzeba
wybrać jeden ślad zdarzenia awaryjnego i stosować tę nazwę w całym pakiecie.

## 5. Przykład macierzy

### Co działa

Nagłówek bardzo wyraźnie mówi, że firma, osoby, program i terminy są fikcyjne,
a przykład nie służy do podmiany nazwy. Pozostawia też dwa jawne braki
`[UZUPEŁNIJ]`
(`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:1-9`).
To jest dobra intencja i zgadza się z regułą w `SKILL.md`
(`../skille-platne/ksef-procedury/SKILL.md:164-166`) oraz w granicach
(`../skille-platne/ksef-procedury/references/granice.md:118-129`).

### BLOKER: treść przykładu nadal jest gotowa do bezmyślnego skopiowania

Po ostrzeżeniu znajduje się kompletny, realistyczny dokument: firma, nazwiska,
role, godziny, cykle kontroli, ścieżki folderów, terminy eskalacji, zasady
uprawnień i opis podziału z biurem
(`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:30-78`).
Na końcu są gotowe daty domknięcia oraz twierdzenia o dwóch „wymaganych” kodach
QR i przenoszeniu numeru przy imporcie przelewów
(`../skille-platne/ksef-procedury/assets/przyklady/macierz-odpowiedzialnosci.md:100-117`).
To nie jest wzór samej formy. Jest to gotowa procedura, w której wystarczy
zamienić nazwy osób i firmy.

Przed wydaniem należy wybrać jeden z dwóch bezpiecznych wariantów:

1. wzór formy z placeholderami w każdej komórce i krótką instrukcją, jaką
   informację wpisać;
2. skrócony przykład szkoleniowy z dwoma albo trzema wierszami, bez kompletu
   ról, terminów i ścieżek, z komentarzem wyjaśniającym funkcję każdej kolumny.

W obu wariantach wartości prawne pozostają jawnie oznaczone dokładnym źródłem,
a terminy organizacyjne pochodzą od użytkownika albo mają `[UZUPEŁNIJ]`.

## 6. Minimalny zestaw poprawek przed wydaniem

1. Poprawić datę i zakres obowiązku numeru KSeF w płatnościach na podstawie
   aktualnej strony MF, we wszystkich wystąpieniach.
2. Usunąć MCU jako bieżące, wyłączne miejsce zarządzania. Rozdzielić aktualne
   ścieżki Aplikacji Podatnika KSeF 2.0 i API oraz właściwe miejsce zmiany
   każdego rodzaju sekretu.
3. Doprecyzować warunki dwóch kodów QR według odbiorcy, sposobu i chwili
   udostępnienia faktury.
4. Każdą wartość zmienną oznaczyć pełnym znacznikiem z dokładnym źródłem,
   zgodnie z własnym formatem pakietu.
5. Zawęzić dodatnie wyzwalacze opisu do budowy procedur i usunąć własny zakres
   e-Doręczeń. Doprecyzować granicę pojedynczej faktury oraz kalendarza.
6. Przepisać wszystkie wzorce procedur na czas teraźniejszy oznajmujący
   i poprawić wskazane kalki oraz usterki językowe.
7. Ustalić jedną nazwę każdego komponentu, wariantu, rejestru i trybu, następnie
   zastosować ją dosłownie w całym pakiecie.
8. Zastąpić wypełnioną macierz wzorem formy z placeholderami albo mocno
   skróconym przykładem szkoleniowym.

**WERDYKT KOŃCOWY: blokery do wydania TAK.**
