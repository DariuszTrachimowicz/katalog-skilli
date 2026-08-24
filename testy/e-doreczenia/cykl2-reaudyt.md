# Cykl 2: re-audyt skilla `e-doreczenia-w-firmie`

Data kontroli: 24 sierpnia 2026 r.

Zakres: `SKILL.md`, `references/procedura-firmowa.md`, `wpis.md` oraz porównanie
z blokerami opisanymi w trzech panelach cyklu 1.

Kontrola techniczna jest czysta: repozytoryjny `narzedzia/walidator.mjs` nie
zgłasza błędów blokujących, a `quick_validate.py` zwraca `Skill is valid!`.
Nie zastępuje to kontroli treści. Aktualny harmonogram potwierdziłem na
`https://www.gov.pl/web/e-doreczenia/harmonogram`, a fikcję doręczenia,
zawieszenie działalności oraz uprawnienia użytkowników na
`https://www.gov.pl/web/e-doreczenia/pytania-i-odpowiedzi`.

## Wynik punkt po punkcie

### 1. Brak obietnicy ustalenia lub orzeczenia obowiązku

**NIEZALICZONE, BLOKER.** Naprawa granicy jest poprawna: Krok 2 zakazuje
konkluzji „dotyczy / nie dotyczy”, a sekcja granic pozwala tylko pokazać ramę,
przypisać sytuację wstępnie do grupy i podać miejsce potwierdzenia
(`skille/e-doreczenia-w-firmie/SKILL.md:43`,
`skille/e-doreczenia-w-firmie/SKILL.md:46`,
`skille/e-doreczenia-w-firmie/SKILL.md:124`).

Jednocześnie obietnica nadal występuje w części wprowadzającej: skill
„pokazuje, jak sprawdzić, czy i od kiedy obowiązek dotyczy tej firmy”
(`skille/e-doreczenia-w-firmie/SKILL.md:16`). Powtarzają ją karta katalogowa
„od sprawdzenia, czy obowiązek Cię dotyczy”
(`skille/e-doreczenia-w-firmie/wpis.md:8`) oraz opis „Pokazuje, jak sprawdzić,
czy i od kiedy obowiązek dotyczy Twojej firmy”
(`skille/e-doreczenia-w-firmie/wpis.md:22`). To nadal rozjazd z zakazem
orzekania w `skille/e-doreczenia-w-firmie/SKILL.md:124` i deklaracją na karcie
w `skille/e-doreczenia-w-firmie/wpis.md:93`.

### 2. Robocza ściąga bez cech dokumentu wiążącego

**ZALICZONE.** Nazwa i wprowadzenie kilkakrotnie określają wynik jako roboczą
ściągę, nie dokument firmowy
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:1`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:3`). Szablon nie
ma pola „Obowiązuje od” ani podpisu przyjęcia. Kończy się neutralnym polem
„Notatkę prowadzi”
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:58`). Tę samą
granicę zachowuje Krok 4
(`skille/e-doreczenia-w-firmie/SKILL.md:87`,
`skille/e-doreczenia-w-firmie/SKILL.md:90`).

### 3. Jedno zdanie odmowy i domknięte furtki

**ZALICZONE.** Jest jedno dosłowne zdanie odmowy oraz nakaz powtarzania go przy
każdej próbie. Wprost wymieniono warianty „tak czy nie”, „typowo”, procenty,
odwołanie do prawnika i „napisz to za mnie”
(`skille/e-doreczenia-w-firmie/SKILL.md:119`,
`skille/e-doreczenia-w-firmie/SKILL.md:123`).

### 4. Dosłowne cytaty, brak zmyślonych adresów i puste pola

**ZALICZONE.** Skill każe cytować słowo w słowo, nie zgadywać podstron i
zostawiać niepodane pola puste
(`skille/e-doreczenia-w-firmie/SKILL.md:130`,
`skille/e-doreczenia-w-firmie/SKILL.md:133`). Ten sam nakaz pustych pól znajduje
się przy szablonie
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:12`).

### 5. Skrót i opisy bez absolutnych obietnic

**ZALICZONE.** Usunięto obietnicę, że żadne pismo nie przepadnie. Skrót mówi o
przejściu przez proces i rytmie pilnowania
(`skille/e-doreczenia-w-firmie/wpis.md:8`), a opis SEO formułuje ograniczony cel
bez kwantyfikatora „żadne” lub gwarancji wyniku
(`skille/e-doreczenia-w-firmie/wpis.md:11`). Opis uruchamiania także nie
gwarantuje skutku
(`skille/e-doreczenia-w-firmie/SKILL.md:3`). Nie usuwa to osobnego błędu z
punktu 1, czyli nadal zbyt szerokiej obietnicy „sprawdzenia, czy”.

### 6. Poprawny opis fikcji doręczenia

**NIEZALICZONE, BLOKER.** Większość mechanizmu naprawiono. Jest pismo wysłane
na ADE i nieodebrane
(`skille/e-doreczenia-w-firmie/SKILL.md:14`), otwarcie równa się odebraniu, a
odebranie doręczeniu
(`skille/e-doreczenia-w-firmie/SKILL.md:105`), występuje 14 dni od wpłynięcia
oraz dowód otrzymania przy piśmie
(`skille/e-doreczenia-w-firmie/SKILL.md:107`,
`skille/e-doreczenia-w-firmie/SKILL.md:109`). Nie ma już twierdzenia, że fikcja
powstaje przez samo niezałożenie skrzynki.

Pozostał jednak istotny błąd zakresu. Oficjalne FAQ ogranicza tę fikcję do
korespondencji od podmiotu publicznego, która wpłynęła na ADE podmiotu
niepublicznego. Krok 5 mówi ogólnie o każdym piśmie w skrzynce
(`skille/e-doreczenia-w-firmie/SKILL.md:105`,
`skille/e-doreczenia-w-firmie/SKILL.md:108`), szablon mówi bez wyjątku „Pismo
nieodebrane”
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:51`), a wpis
katalogowy o wszystkich „nieodebranych pismach”
(`skille/e-doreczenia-w-firmie/wpis.md:62`). Ponieważ skill obejmuje też
korespondencję firma-firma u dostawcy kwalifikowanego
(`skille/e-doreczenia-w-firmie/SKILL.md:12`), uogólnienie może przypisać fikcję
doręczenia korespondencji prywatnej.

### 7. Harmonogram i dane wejściowe

**ZALICZONE.** Skill używa precyzyjnego pojęcia „rejestr przedsiębiorców KRS”
i oddziela fundacje lub stowarzyszenia bez takiego wpisu
(`skille/e-doreczenia-w-firmie/SKILL.md:36`,
`skille/e-doreczenia-w-firmie/SKILL.md:38`). Krok 1 pyta o zmianę wpisu CEIDG
po 30 czerwca 2025 r.
(`skille/e-doreczenia-w-firmie/SKILL.md:39`), a rama wyjaśnia jej wcześniejszy
skutek
(`skille/e-doreczenia-w-firmie/SKILL.md:54`,
`skille/e-doreczenia-w-firmie/SKILL.md:56`). Stary rejestr przedsiębiorców KRS,
zawieszenie działalności i zawody zaufania publicznego są ujęte osobno
(`skille/e-doreczenia-w-firmie/SKILL.md:53`,
`skille/e-doreczenia-w-firmie/SKILL.md:58`). Przykład Marka również zadaje
pytanie o zmianę po czerwcu 2025 r.
(`skille/e-doreczenia-w-firmie/wpis.md:44`,
`skille/e-doreczenia-w-firmie/wpis.md:47`).

### 8. Rozdzielenie ścieżki publicznej i kwalifikowanej

**ZALICZONE.** Wariant publiczny zawiera wniosek przez biznes.gov.pl,
administratora, aktywację i automatyczny wpis do BAE
(`skille/e-doreczenia-w-firmie/SKILL.md:65`,
`skille/e-doreczenia-w-firmie/SKILL.md:72`). Wariant kwalifikowany zaczyna się
od umowy i utworzenia ADE u dostawcy, a dopiero potem przechodzi do wpisu w BAE
(`skille/e-doreczenia-w-firmie/SKILL.md:73`,
`skille/e-doreczenia-w-firmie/SKILL.md:75`). Kryteria wyboru obejmują strony
korespondencji, integrację, role, archiwizację i nie sprowadzają się do liczby
pism
(`skille/e-doreczenia-w-firmie/SKILL.md:76`,
`skille/e-doreczenia-w-firmie/SKILL.md:78`).

### 9. Imienne dostępy bez współdzielenia danych logowania

**ZALICZONE z nową uwagą opisaną niżej.** Główna instrukcja wymaga imiennych
uprawnień nadawanych przez administratora w skrzynce publicznej, własnego
uwierzytelnienia każdej osoby, zakazuje współdzielenia danych logowania i
odróżnia pełnomocnictwo papierowe od dostępu technicznego
(`skille/e-doreczenia-w-firmie/SKILL.md:82`,
`skille/e-doreczenia-w-firmie/SKILL.md:85`). Szablon powtarza zasadę własnego
profilu lub konta
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:24`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:26`).

### 10. Reguła antyphishingowa

**NIEZALICZONE, BLOKER.** Kolejność i główna ścieżka są dobre: najpierw są
sygnały, sama obecność napisu `gov.pl` niczego nie rozstrzyga, a ręczne wejście
jest rozdzielone na usługę publiczną i stronę lub aplikację KDU znaną z umowy
(`skille/e-doreczenia-w-firmie/SKILL.md:94`,
`skille/e-doreczenia-w-firmie/SKILL.md:103`).

Naprawa wprowadziła jednak nową kategoryczność: „prawdziwe powiadomienia
dostawcy kwalifikowanego przychodzą z jego domeny”
(`skille/e-doreczenia-w-firmie/SKILL.md:98`,
`skille/e-doreczenia-w-firmie/SKILL.md:99`). Oficjalny wykaz potwierdza, kto
jest KDU, ale nie ustanawia jednej reguły domeny nadawczej dla wszystkich
powiadomień. Sam plik referencyjny poprawnie każe sprawdzić dodatkowe
powiadomienia w umowie konkretnego dostawcy
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:83`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:85`). Bezpieczna
reguła z `SKILL.md:100-103` wystarcza i nie potrzebuje kategorycznego zdania z
`SKILL.md:99`.

### 11. Zawężony `description` i wyłączenia

**ZALICZONE.** Opis ogranicza uruchamianie do przedsiębiorców z CEIDG albo
podmiotów z rejestru przedsiębiorców KRS. Wyłącza skrzynkę prywatną, podmiot
publiczny, integracje dostawcy, `pismo-urzedowe`, `prosty-jezyk`, KSeF i zwykłą
pocztę e-mail
(`skille/e-doreczenia-w-firmie/SKILL.md:3`).

### 12. Oznaczanie zmiennych dat i źródło gov.pl

**NIEZALICZONE, BLOKER.** Instrukcja operacyjna została naprawiona: wymaga, aby
każdą datę i regułę harmonogramu podawać z dosłownym oznaczeniem oraz konkretnym
adresem gov.pl
(`skille/e-doreczenia-w-firmie/SKILL.md:46`,
`skille/e-doreczenia-w-firmie/SKILL.md:50`). Pakiet nie stosuje jednak tej
reguły konsekwentnie do własnej treści. Konkretna data i reguły harmonogramu są
wypisane bez oznaczenia bezpośrednio przy nich
(`skille/e-doreczenia-w-firmie/SKILL.md:51`,
`skille/e-doreczenia-w-firmie/SKILL.md:57`). W przykładzie data 1 października
2026 r. ma tylko ogólne zastrzeżenie „na gov.pl”, bez wymaganego znacznika i bez
konkretnego adresu źródła
(`skille/e-doreczenia-w-firmie/wpis.md:47`,
`skille/e-doreczenia-w-firmie/wpis.md:50`). Sekcja ograniczeń odsyła z kolei
ogólnie do biznes.gov.pl
(`skille/e-doreczenia-w-firmie/wpis.md:77`,
`skille/e-doreczenia-w-firmie/wpis.md:79`).

### 13. Polska typografia, myślniki i kalki

**ZALICZONE.** Kontrola znaków wykazała równe liczby znaków `„` i `”` w każdym
z trzech plików, zero pauz U+2014, zero półpauz U+2013 oraz zero osobnych słów
`login`, `checklista` i `checklist`. Polskie domknięcia widać między innymi w
`skille/e-doreczenia-w-firmie/SKILL.md:27` i
`skille/e-doreczenia-w-firmie/SKILL.md:123`. Zamiast zapożyczenia występuje
„Lista kontrolna”
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:61`), a dostęp
opisano jako dane logowania
(`skille/e-doreczenia-w-firmie/SKILL.md:84`).

### 14. Odczytywanie terminów z treści i pouczenia

**ZALICZONE.** Skill każe czytać termin z treści i pouczenia, a gdy go nie
widać, zaznaczyć, że może wynikać z rodzaju sprawy i wymaga potwierdzenia
(`skille/e-doreczenia-w-firmie/SKILL.md:109`,
`skille/e-doreczenia-w-firmie/SKILL.md:112`). Karta katalogowa zachowuje to
zastrzeżenie
(`skille/e-doreczenia-w-firmie/wpis.md:85`,
`skille/e-doreczenia-w-firmie/wpis.md:87`). Szablon nie udaje, że brak terminu w
treści oznacza brak terminu, używa dopisku „jeśli jest”
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:43`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:45`).

## Nowe usterki i rozjazdy po naprawach

### A. Uniwersalny wymóg dwóch osób przeczy wariantowi jednoosobowemu

**BLOKER.** Główna instrukcja mówi, że w jednoosobowej działalności plan ma być
rytmem reagowania i planem nieobecności, a nie rozdzielnikiem osób
(`skille/e-doreczenia-w-firmie/SKILL.md:91`,
`skille/e-doreczenia-w-firmie/SKILL.md:92`). Wprowadzenie do ściągi potwierdza
uproszczenie bez rozdzielnika
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:6`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:8`).

Mimo to wzór wymaga osoby zastępującej
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:36`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:37`), ustanawia
bezwarunkową zasadę „zawsze co najmniej dwoje”
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:55`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:56`) i powtarza ją
w liście kontrolnej
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:67`). Na końcu
ten sam plik dopuszcza dla jednoosobowej działalności alternatywę w postaci
świadomie zaplanowanego zdalnego zaglądania
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:75`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:78`). Nie da się
jednocześnie spełnić zasady „zawsze dwie osoby” i alternatywy bez drugiej osoby.

Ten rozjazd rozszerza się na usługę kwalifikowaną. Ściąga uniwersalnie nazywa
parę „administrator + zastępstwo”
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:55`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:67`), po czym sama
przyznaje, że role i sposób nadawania dostępów u KDU mogą wyglądać inaczej
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:83`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:85`).

### B. „Imienny dostęp dla biura” nie wskazuje osoby

**POWAŻNE.** Wskazówka mówi, aby nadać imienny dostęp „biuru rachunkowemu”
(`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:79`,
`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:81`). Podmiot
zbiorowy nie jest osobą z imiennym dostępem. Powinno być wskazane, że dostęp
dostaje konkretna osoba w biurze, na własne uwierzytelnienie i w ustalonym
zakresie. Obecne zdanie osłabia poprawną regułę z
`skille/e-doreczenia-w-firmie/SKILL.md:82-85`.

## Podsumowanie bramki wydania

Z 14 wskazanych punktów zaliczono 10. Niezaliczone są punkty 1, 6, 10 i 12.
Dodatkowo wykryto nowy bloker w modelu zastępstwa dla jednoosobowej działalności
oraz poważny rozjazd przy dostępie dla biura rachunkowego. Czysty wynik
walidatorów technicznych nie usuwa tych problemów treściowych.

WERDYKT: blokery do wydania TAK
