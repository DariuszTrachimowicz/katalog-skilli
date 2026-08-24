# Panel QA: `ksef-procedury` — CYKL 2, re-audyt merytoryczny

**Rola panelu:** ekspert merytoryczny i praktyk wdrożeń KSeF  
**Data oceny:** 24 sierpnia 2026 r.  
**Zakres:** wszystkie 7 plików w `../skille-platne/ksef-procedury/`  
**Punkt odniesienia:** 12 warunków zdjęcia blokady z `testy/ksef-procedury/panel-merytoryka.md`, sekcja 14

## WERDYKT

**BLOKERY DO WYDANIA: TAK.**

Rewizja jest duża i naprawia większość problemów z cyklu 1, ale blokady nie można
jeszcze zdjąć. W pełni zaliczam 9 z 12 warunków. Warunek 5 pozostaje niespełniony,
a warunki 6 i 7 są spełnione tylko częściowo, ponieważ poprawne nowe reguły
współistnieją z innymi, sprzecznymi zdaniami w paczce.

Blokują trzy problemy:

1. **Błędne przejście do awarii całkowitej.** Skill twierdzi, że fakturę
   wystawioną wcześniej w offline24 trzeba mimo późniejszego ogłoszenia awarii
   całkowitej dosłać. Art. 106nha pkt 2 ustawy o VAT stanowi odwrotnie: jeśli
   komunikat o awarii całkowitej pojawił się po wystawieniu faktury offline24,
   a przed jej przesłaniem, podatnik tej faktury nie przesyła. Analogiczny skutek
   dla faktury z okresu niedostępności wynika z art. 106nh ust. 3 pkt 2.
   Błędne miejsca: `references/stan-prawny.md:189-196` oraz
   `references/komponenty.md:258-266`.
2. **Reguła QR nadal jest dwuznaczna dla trybu awaryjnego.** Ogólna reguła mówi
   prawidłowo o jednym kodzie po przesłaniu, lecz wiersz trybu awaryjnego nakazuje
   dwa kody bez warunku „przed przesłaniem”. Po przesłaniu faktury awaryjnej do
   KSeF wizualizacja ma jeden KOD I. Sprzeczne/niepełne miejsca:
   `references/stan-prawny.md:205-218` oraz
   `references/komponenty.md:294-305`.
3. **Pozostała fałszywa ogólna reguła statusu i daty wystawienia.** Zdanie
   „fakturę uznaje się za wystawioną dopiero po przyjęciu przez system” jest
   nieprawidłowe jako reguła ogólna i przeczy poprawionej sekcji o odrzuceniach.
   Dla faktury ustrukturyzowanej art. 106na ust. 1 wiąże datę wystawienia z dniem
   przesłania do KSeF, a w trybach offline i przy awarii całkowitej działają
   odrębne reguły. Błędne miejsce: `references/stan-prawny.md:11-14`.

## Podstawa ponownej weryfikacji

Stan sprawdzono ponownie 24 sierpnia 2026 r. w aktualnych materiałach urzędowych:

- [Zakres obowiązkowego KSeF](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/);
- [Co warto wiedzieć przed startem II etapu](https://ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/);
- [Tryb offline24](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/);
- [Kody weryfikujące QR](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/);
- [Moduł Certyfikatów i Uprawnień](https://ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/)
  oraz Podręcznik KSeF 2.0, część I;
- [Certyfikaty KSeF](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/);
- [Numer KSeF i zbiorczy identyfikator](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/);
- [Najczęstsze pytania KSeF](https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/);
- [tekst jednolity ustawy o VAT, Kancelaria Sejmu, stan 20 lipca 2026 r.](https://api.sejm.gov.pl/eli/acts/DU/2004/535/text/U/D20040535Lj.pdf),
  w szczególności art. 106na, 106nda, 106nh, 106nha i 108g.

Wszystkie 10 konkretnych adresów `ksef.podatki.gov.pl` wpisanych do rejestru
źródeł paczki zwróciło HTTP 200 w dniu re-audytu.

## Weryfikacja 12 warunków po kolei

### 1. Data obowiązku numeru KSeF w płatności i zawężenie zakresu

**Ocena: ZALICZONY, z jednym doprecyzowaniem MAJOR.**

Naprawiono datę: skill mówi jednoznacznie o 1 stycznia 2027 r. i wyklucza
wcześniejszy obowiązek, także w MPP: `references/stan-prawny.md:222-226`,
`references/komponenty.md:735-741`. Cztery łączne przesłanki są zapisane osobno:
czynny podatnik VAT po stronie płacącego, inny czynny podatnik VAT po stronie
odbiorcy, właściwy rodzaj faktury oraz instrument pozwalający podać tytuł
płatności: `references/komponenty.md:741-752`. Usunięto też regułę „przy każdej
płatności”: `references/stan-prawny.md:227-238`,
`references/komponenty.md:753-755`,
`assets/przyklady/macierz-odpowiedzialnosci.md:61-63`.

Identyfikator zbiorczy jest prawidłowo opisany jako generowany przez KSeF dla
kilku faktur: `references/komponenty.md:761-766`.

Do poprawy jako MAJOR: trzecia przesłanka mówi tylko o „określonej fakturze
wystawionej w trybie offline” (`references/komponenty.md:745-752`). Dokument
operacyjny powinien nazwać znane przypadki: offline24 i niedostępność KSeF, oraz
dodać wyjątek, gdy takich faktur nie wprowadzono do KSeF wskutek komunikatu
o awarii lub awarii całkowitej. Obecne odesłanie do późniejszej weryfikacji nie
jest błędem przeciwnym do prawa, ale pozostawia użytkownikowi znany element
decyzji z art. 108g ust. 4.

### 2. Pełny model uprawnień i łańcuch biura rachunkowego

**Ocena: ZALICZONY.**

Proza prawidłowo oddziela źródło uprawnienia właścicielskiego od bezpośredniego
i pośredniego sposobu nadania: `references/stan-prawny.md:94-132` oraz
`references/komponenty.md:389-408`. Klient nadaje biuru uprawnienie bezpośrednie
z opcją dalszego przekazywania, a biuro nadaje pracownikom uprawnienia pośrednie:
`references/komponenty.md:404-420`. Skutek odebrania uprawnienia biuru —
przerwanie łańcucha, nieaktywność uprawnień pracowników przy pozostawieniu wpisów
w systemie — jest zapisany poprawnie: `references/stan-prawny.md:125-129`,
`references/komponenty.md:485-492`.

Naprawa nie odwraca modelu biura i nie wprowadza nowego błędu operacyjnego.
Pozostaje drobna niespójność nazewnicza: po zdaniu, że nie są to trzy
równorzędne pozycje (`references/komponenty.md:389-402`), tabela umieszcza je
w jednej kolumnie „Rodzaj uprawnienia” (`references/komponenty.md:414-420`).
Bezpieczniejsza nazwa kolumny to „Źródło / sposób uzyskania uprawnienia”, ale
pozostałe kolumny i objaśnienia zapobiegają błędnemu nadaniu lub odebraniu.

### 3. Usunięcie drugiej osoby z uprawnieniem właścicielskim

**Ocena: ZALICZONY.**

Skill stwierdza, że uprawnienie właścicielskie jest systemowe, nie jest nadawane
drugiej osobie i nie podlega odebraniu: `references/stan-prawny.md:99-104`,
`references/komponenty.md:393-396`. Wywiad pyta zamiast tego o drugą osobę
z szerokim uprawnieniem do zarządzania: `references/komponenty.md:371-375`.
W matrycy wiersz właścicielski ma „nie dotyczy” przy nadaniu oraz brak warunku
odebrania: `references/komponenty.md:414-420`. Rekomendacja zastępstwa jest
prawidłowo nazwana szerokim uprawnieniem bezpośrednim, nie drugim
właścicielskim: `references/komponenty.md:427-436`.

### 4. Kanały zarządzania uprawnieniami po 1 lutego 2026 r.

**Ocena: ZALICZONY.**

MCU opisano jako kanał przygotowawczy, a bieżące zarządzanie skierowano do
Aplikacji Podatnika KSeF 2.0 albo programu zintegrowanego z API:
`references/stan-prawny.md:134-145`, `references/komponenty.md:449-454`,
`references/granice.md:98-100`. To odpowiada aktualnej stronie MF.

Usterka MINOR: uprawnienie się nadaje albo odbiera, a certyfikat wydaje albo
unieważnia. Zwrot „certyfikat i uprawnienie KSeF unieważnia się” w
`DANE-I-PRYWATNOSC.md:24-29` i „certyfikat albo uprawnienie [...] unieważnia
i nadaje się” w `references/granice.md:79-87` miesza te operacje. Kanał jest
dobry, lecz czasowniki trzeba rozdzielić.

### 5. Cztery osobne tryby, w tym awaria całkowita bez dosyłania

**Ocena: NIEZALICZONY — BLOKER.**

Główne ścieżki naprawiono dobrze. Cztery tryby są osobnymi wierszami, a awaria
całkowita ma brak FA(3), brak późniejszej wysyłki i brak numeru KSeF:
`references/stan-prawny.md:163-187`,
`references/komponenty.md:204-230`. Kroki domknięcia rozdzielają tryby 1-3 od
awarii całkowitej: `references/komponenty.md:232-256`. To samo rozróżnienie
trafiło do wzoru macierzy: `assets/przyklady/macierz-odpowiedzialnosci.md:64-67`
i do testu „na sucho”: `references/komponenty.md:637-645`.

Naprawa wprowadziła jednak nową, przeciwną do ustawy regułę przejścia między
trybami. Skill twierdzi, że ogłoszenie awarii całkowitej nie zwalnia z przesłania
faktury wystawionej wcześniej w offline24:
`references/stan-prawny.md:189-196` i
`references/komponenty.md:258-266`. Art. 106nha pkt 2 przewiduje brak przesłania,
jeżeli komunikat o awarii całkowitej pojawił się po wystawieniu faktury
offline24, ale przed jej przesłaniem. Art. 106nh ust. 3 pkt 2 wyłącza obowiązek
przesłania także wtedy, gdy termin faktury z niedostępności zbiega się z awarią
całkowitą. To zmienia czynność operacyjną, status dokumentu, numer KSeF i później
również obowiązek płatniczy — dlatego jest to blocker.

Do poprawy jako MAJOR: aktualny materiał MF wskazuje dla trybu awaryjnego
ogłoszenie zarówno w BIP MF, jak i w oprogramowaniu interfejsowym. Skill wymienia
przy awarii tylko BIP: `references/stan-prawny.md:177-179` oraz
`references/komponenty.md:208-213`.

### 6. Reguła QR według trybu, momentu, odbiorcy i certyfikatu typu 2

**Ocena: CZĘŚCIOWO ZALICZONY — BLOKER POZOSTAJE.**

Dodano prawidłową strukturę decyzji: jeden KOD I po przesłaniu, dwa kody przed
przesłaniem w offline24/niedostępności dla odbiorcy z art. 106gb ust. 4, dwa
kody w trybie awaryjnym, wyłączenie awarii całkowitej oraz potwierdzenie
transakcji dla krajowego nabywcy z NIP: `references/stan-prawny.md:199-220` oraz
`references/komponenty.md:290-313`. KOD II prawidłowo powiązano z certyfikatem
typu 2: `references/stan-prawny.md:201-204`,
`references/komponenty.md:302-308`. Plan testów sprawdza oba warianty i sam
certyfikat: `references/komponenty.md:631-640`.

Nie domknięto jednak momentu dla trybu awaryjnego. Wiersz
`references/komponenty.md:298` oraz reguła
`references/stan-prawny.md:211` mówią o dwóch kodach przy fakturze awaryjnej
udostępnianej poza KSeF bez dopisku „przed przesłaniem”. Jednocześnie pierwszy
wiersz tabeli mówi o jednym kodzie po przesłaniu (`references/komponenty.md:296`).
Te dwa wiersze zachodzą na siebie. Aktualna strona MF rozstrzyga, że faktura
awaryjna używana poza KSeF **po przesłaniu** ma już tylko jeden KOD I z numerem
KSeF. W wierszu awaryjnym trzeba więc dopisać „przed przesłaniem do KSeF”.

To samo zawężenie trzeba przenieść do zdań o certyfikacie typu 2. Obecne
`references/stan-prawny.md:149-153` i
`references/komponenty.md:355-357` brzmią tak, jakby każda wizualizacja faktury
offline udostępniana poza systemem wymagała typu 2, także po przesłaniu. Typ 2
jest niezbędny do KODU II przed przesłaniem, w sytuacjach objętych regułą dwóch
kodów; po przesłaniu wystarcza KOD I.

### 7. Status odrzuconego dokumentu

**Ocena: CZĘŚCIOWO ZALICZONY — BLOKER POZOSTAJE.**

Sekcję właściwą naprawiono: odrzucony plik nie jest fakturą ustrukturyzowaną
przyjętą przez KSeF i nie ma numeru, ale z tego nie wynika automatycznie brak
faktury ani płatność bez podstawy: `references/stan-prawny.md:242-255`,
`references/komponenty.md:547-553`. Ścieżka reakcji rozróżnia błąd techniczny od
dokumentu skutecznie wystawionego poza systemem i nie każe bezwarunkowo
nadpisywać danych: `references/komponenty.md:555-573`. Pułapka zapłaconego
dokumentu jest opisana spójnie: `references/komponenty.md:591-599`.

W pliku stanu prawnego pozostał jednak przykład reguły: „fakturę uznaje się za
wystawioną dopiero po przyjęciu przez system”:
`references/stan-prawny.md:11-14`. Jest zbyt szeroki i merytorycznie błędny.
Art. 106na ust. 1 dla faktury ustrukturyzowanej wskazuje dzień przesłania do
KSeF, natomiast offline24, niedostępność, tryb awaryjny i awaria całkowita mają
własne zasady daty wystawienia. Zdanie może zostać skopiowane do dokumentu
klienta dokładnie dlatego, że stoi jako wzór „pisania skutkiem”. Trzeba je
usunąć albo zastąpić warunkową, poprawną regułą.

### 8. Harmonogram: brutto 2024, limit 10 tys. zł, faktura przekraczająca i odbiór

**Ocena: ZALICZONY.**

Próg 200 mln zł powiązano z wartością sprzedaży wraz z VAT w 2024 r.:
`references/stan-prawny.md:42-48`. Limit 10 tys. zł opisuje miesięczną wartość
brutto faktur poza KSeF i skutek od faktury przekraczającej limit:
`references/stan-prawny.md:49-54`. Zachowano stałe wyłączenia po 1 stycznia
2027 r.: `references/stan-prawny.md:55-59`. Obowiązek odbierania od 1 lutego
2026 r. jest wyraźny: `references/stan-prawny.md:60-64`, `SKILL.md:158-161`,
`references/komponenty.md:84-87`.

Monitorowanie progu dostało właściciela procesu w wywiadzie i osobny wiersz
macierzy: `references/komponenty.md:102-106`,
`references/komponenty.md:117-119`,
`assets/przyklady/macierz-odpowiedzialnosci.md:60-62`. Nie wprowadzono nowego
błędu dotyczącego nabywców zagranicznych ani kas rejestrujących:
`SKILL.md:167-177`, `references/stan-prawny.md:65-73`.

### 9. Plan testów z obowiązkową kolumną „Środowisko”

**Ocena: ZALICZONY.**

Kolumna jest obowiązkowa i ma wartości Demo/produkcja, a reguła zabrania
testowych faktur i odbierania realnych uprawnień na produkcji:
`references/komponenty.md:618-629`. Każdy wiersz tabeli ma przypisane środowisko,
w tym celowe odrzucenie wyłącznie w Demo, awarię całkowitą „na sucho” oraz
odebranie uprawnienia wyłącznie w Demo albo na uprawnieniu utworzonym do próby:
`references/komponenty.md:631-645`. Kontrola końcowa sprawdza tę kolumnę:
`SKILL.md:204-213`, `references/komponenty.md:872-873`.

Naprawa nie instruuje wystawienia fikcyjnego dokumentu produkcyjnego ani
odebrania realnego dostępu osobie pracującej.

### 10. Certyfikaty typu 1/2 oraz własny i cudzy certyfikat

**Ocena: ZALICZONY.**

Typ 1 przypisano uwierzytelnianiu, typ 2 KODOWI II:
`references/stan-prawny.md:147-153`,
`references/komponenty.md:382-384`, `references/komponenty.md:440-443`.
Matryca zawiera typ i identyfikator właściciela certyfikatu:
`references/komponenty.md:412-420`. Procedura odejścia poprawnie oddziela
certyfikat osobisty PESEL, którego firma nie unieważnia, od certyfikatu na NIP
podmiotu i każe ocenić wpływ unieważnienia na integracje oraz KOD II:
`references/komponenty.md:461-483`.

Zastrzeżenie z punktu 6 dotyczy zakresu sytuacji wymagających KODU II, nie samego
rozróżnienia typów certyfikatów. Terminologiczną korektę „odebrać uprawnienie / 
unieważnić certyfikat” wskazano przy warunku 4.

### 11. Konkretne źródła urzędowe i daty sprawdzenia

**Ocena: ZALICZONY.**

Każdy dokument ma otrzymać sekcję źródeł z konkretnymi adresami i datą:
`references/stan-prawny.md:18-22`, `SKILL.md:99-104`,
`references/komponenty.md:68-71`. Rejestr podaje tematy, konkretne podstrony MF
i datę 24 sierpnia 2026 r.: `references/stan-prawny.md:278-297`. Wzór formy
przenosi ten obowiązek do generowanego dokumentu:
`assets/przyklady/macierz-odpowiedzialnosci.md:119-126`.

Brak stałego adresu BIP pozostaje jawnym `[UZUPEŁNIJ]`, a instrukcja wymaga
zapisania go przy wdrożeniu: `references/stan-prawny.md:296-300`. To nie jest
udawany link. Warto jednak dodać do rejestru bezpośredni link do aktualnego
Podręcznika KSeF 2.0, część I, ponieważ sama strona MCU nie pokazuje całego
modelu uprawnień pośrednich.

### 12. Prawdziwa instrukcja ChatGPT albo usunięcie deklaracji kompatybilności

**Ocena: ZALICZONY.**

Autor wybrał drugą możliwość dopuszczoną w warunku z cyklu 1: usunął deklarację
działania w ChatGPT. Instrukcja mówi teraz wyraźnie, że skill zaprojektowano
i przetestowano na Claude, a działania w innych asystentach nie zweryfikowano
i nie obiecuje się: `INSTALACJA.md:1-6`. Dalej opisuje wyłącznie znany sposób
wgrania i test uruchomienia: `INSTALACJA.md:8-16`, `INSTALACJA.md:34-44`.

Nie ma już komercyjnej obietnicy ChatGPT bez pokrycia, więc osobna instrukcja dla
ChatGPT nie jest warunkiem tego wydania.

## Ocena czterech odrzuconych zaleceń

### A. Rejestr źródeł zamiast artykułów ustaw — decyzja akceptowalna

Cykl 1 nie wymagał obciążania każdej procedury numerami artykułów; wymagał
audytowalnej podstawy. Rejestr konkretnych stron MF z datą sprawdzenia spełnia
ten cel: `references/stan-prawny.md:9-22`,
`references/stan-prawny.md:278-300`. Dla dokumentu operacyjnego to lepsza forma
niż przypis przy każdym kroku. Numery przepisów pozostają potrzebne w samym
raporcie QA przy rozstrzyganiu sporu — dlatego ten re-audyt wskazuje art. 106nha
i 106nh — lecz nie muszą wejść do każdego dokumentu klienta.

### B. Zachowanie wyzwalacza „numer KSeF” z wyłączeniami — decyzja akceptowalna

Opis wiąże numer KSeF z zasadami płatności i porządkowaniem procesu, a zarazem
wyłącza sprawdzanie pojedynczej faktury oraz objaśnianie formatu numeru:
`SKILL.md:1-3`. Nie jest to już samodzielny, bezwarunkowy wyzwalacz. Granica
z `faktura-do-tabeli` jest czytelna, więc usunięcie każdej wzmianki o numerze
KSeF byłoby nadmierne i osłabiłoby prawidłowy trigger komponentu płatniczego.

### C. Usunięcie deklaracji ChatGPT zamiast pisania instrukcji — decyzja akceptowalna

Była to jedna z dwóch alternatyw wprost dopuszczonych w warunku 12. Aktualne
`INSTALACJA.md:3-6` nie obiecuje niezweryfikowanej kompatybilności. Nie ma powodu
wymuszać instrukcji dla produktu, którego autor nie obejmuje zakresem wydania.

### D. Przykład zamieniony na wzór formy — decyzja akceptowalna

To dokładnie bezpieczny wariant wskazany w cyklu 1. Plik jawnie wyjaśnia, że nie
jest dokumentem do podmiany nazw: `assets/przyklady/macierz-odpowiedzialnosci.md:1-11`.
Objaśnia funkcję kolumn: `assets/przyklady/macierz-odpowiedzialnosci.md:41-50`,
a komórki macierzy są placeholderami, nie fikcyjnymi faktami firmy:
`assets/przyklady/macierz-odpowiedzialnosci.md:52-73`. Ryzyko bezmyślnego
skopiowania danych z pozornej firmy zostało usunięte.

## Minimalny zakres poprawek przed CYKLEM 3

1. Przepisać regułę przejść między trybami zgodnie z art. 106nh ust. 3 i art.
   106nha: faktury offline24 lub z niedostępności niewysłane przed komunikatem
   o awarii całkowitej nie podlegają późniejszemu przesłaniu; osobno opisać
   przejście do zwykłej awarii i wynikający termin.
2. W obu tabelach QR dopisać „przed przesłaniem do KSeF” przy trybie awaryjnym
   oraz zawęzić ogólne zdania o certyfikacie typu 2 do sytuacji KODU II.
3. Usunąć albo poprawić zdanie `references/stan-prawny.md:13` o wystawieniu
   dopiero po przyjęciu przez system; zachować warunkowe reguły dla online,
   offline i awarii całkowitej.
4. Dopisać oprogramowanie interfejsowe jako drugi kanał komunikatu o zwykłej
   awarii KSeF.
5. W komponencie płatności nazwać offline24 i niedostępność oraz wyjątek dla
   faktur niewprowadzonych do KSeF wskutek komunikatu o awarii/awarii
   całkowitej; nie pozostawiać znanego zakresu jako ogólnego „określona faktura”.
6. Rozdzielić czasowniki: uprawnienie się nadaje/odbiera, certyfikat się
   wydaje/unieważnia.

Po tych zmianach potrzebny jest krótki CYKL 3 skoncentrowany na przejściach
między trybami, QR po przesłaniu faktury awaryjnej oraz statusie/dacie wystawienia
dokumentu odrzuconego.
