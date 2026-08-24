# Panel QA: `ksef-procedury` — recenzja merytoryczna

**Rola panelu:** ekspert merytoryczny, praktyk wdrożeń KSeF w firmach i biurach rachunkowych  
**Data oceny:** 24 sierpnia 2026 r.  
**Zakres:** komplet plików w `../skille-platne/ksef-procedury/`  
**Metoda:** kontrola treści linia po linii oraz porównanie z aktualnymi materiałami Ministerstwa Finansów/KSeF.

## WERDYKT

**BLOKERY DO WYDANIA: TAK.**

Wersja 1.0.0 nie powinna być wydana odpłatnie w obecnej postaci. Rdzeń organizacyjny jest wartościowy, a część faktów jest poprawna, ale skill może wygenerować procedurę prowadzącą użytkownika do działania niezgodnego z aktualnymi zasadami albo technicznie niemożliwego. Najpoważniejsze problemy to:

1. błędna data obowiązku numeru KSeF w MPP — wpisano 1 sierpnia 2026 r., podczas gdy aktualne MF wskazuje 1 stycznia 2027 r.;
2. błędny model uprawnień: uprawnienia bezpośrednie, pośrednie i właścicielskie opisano jako trzy równorzędne „rodzaje nadań”, a biuru rachunkowemu przypisano uprawnienie pośrednie;
3. niemożliwe „drugie uprawnienie właścicielskie”, mimo że uprawnienie właścicielskie jest systemowe i nie można go ani nadać drugiej osobie, ani odebrać;
4. nieaktualna instrukcja, że w sierpniu 2026 r. uprawnienia nadaje się „wyłącznie” w MCU;
5. nieprawidłowa obsługa awarii całkowitej — ogólny krok każe po powrocie systemu dosłać wszystkie faktury i uzyskać numery KSeF, choć faktur z awarii całkowitej nie dosyła się do KSeF;
6. zbyt szeroka reguła dwóch kodów QR dla każdej faktury wystawionej poza systemem;
7. fałszywe stwierdzenie, że po odrzuceniu „faktury formalnie nie ma” i że płatność jest „bez podstawy”;
8. plan testów nie oddziela konsekwentnie środowiska Demo od produkcji i może doprowadzić do utworzenia rzeczywistych dokumentów testowych albo odebrania realnych uprawnień;
9. niepełna i częściowo myląca instrukcja instalacji dla ChatGPT.

## Podstawa weryfikacji

Najważniejsze aktualne źródła urzędowe użyte przy ocenie:

- [Zakres obowiązkowego KSeF](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/) — harmonogram, odbieranie faktur, limit 10 000 zł, wyłączenia;
- [Zasady obowiązywania KSeF i przepisy prawne](https://ksef.podatki.gov.pl/ksef-news/zasady-obowiazywania-ksef-i-przepisy-prawne/) — sankcje, ich katalog, okres przejściowy, zaliczki, przechowywanie;
- [Najczęstsze pytania](https://ksef.podatki.gov.pl/ksef-news/najczestsze-pytania/) — wysokość kar i status dokumentu wystawionego poza KSeF;
- [Co warto wiedzieć przed startem II etapu](https://ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/) — cztery tryby szczególne i ich skutki;
- [Tryb offline24](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/) — termin, odbiór, kody QR;
- [Kody weryfikujące QR](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/) — KOD I, KOD II i przypadki jednego/dwóch kodów;
- [Moduł Certyfikatów i Uprawnień](https://ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/) oraz [Podręcznik KSeF 2.0, część I](https://ksef.podatki.gov.pl/media/sthoiadq/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-25032026.pdf) — uprawnienia właścicielskie, bezpośrednie, pośrednie, biuro jako pośrednik/podmiot uprawniony;
- [Numer KSeF i zbiorczy identyfikator](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/) — zakres i data obowiązków płatniczych;
- [Struktura logiczna FA(3)](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/struktura-logiczna-fa-3/) — obowiązywanie FA(3) od 1 lutego 2026 r.;
- [OpenAI API — tworzenie skilla](https://developers.openai.com/api/reference/python/resources/skills/methods/create) — oficjalny mechanizm przesłania katalogu/ZIP skilla po stronie OpenAI; paczka nie opisuje tego ani instalacji pluginu w ChatGPT.

## 1. Harmonogram i zakres obowiązku

### Co jest poprawne

- Daty 1 lutego 2026 r. i 1 kwietnia 2026 r. są podane we właściwej kolejności: `references/stan-prawny.md:28-31`.
- Przejściowy limit 10 000 zł do końca 2026 r. oraz wejście obowiązku dla tej grupy od 1 stycznia 2027 r. są rozpoznane: `references/stan-prawny.md:32-36`.

### Błędy i braki

**[BLOKER] Próg 200 mln zł opisano za szeroko i bez danych decydujących o kwalifikacji.** „Obrót powyżej 200 mln zł” nie wystarcza. Chodzi o wartość sprzedaży wraz z podatkiem, osiągniętą w 2024 r. Brak roku bazowego i wskazania wartości brutto może przypisać firmie złą datę obowiązku: `references/stan-prawny.md:28-31`.

**[BLOKER] Limit 10 000 zł opisano jak zwolnienie podmiotowe, a nie regułę dotyczącą sprzedaży udokumentowanej fakturami.** Należy wskazać wartość brutto faktur papierowych/elektronicznych wystawionych w danym miesiącu oraz skutek przekroczenia limitu — obowiązek powstaje od faktury, którą limit przekroczono. Obecne zdanie „z obowiązku wyłączeni są podatnicy o sprzedaży...” jest za szerokie: `references/stan-prawny.md:32-36`.

**[BLOKER] „Od 1 stycznia 2027 obowiązek obejmuje wszystkich” jest dosłownie fałszywe.** Koniec wyjątku 10 000 zł nie znosi stałych wyłączeń, m.in. faktur konsumenckich ani części wyłączeń podmiotowych i przedmiotowych. Trzeba napisać, że od tej daty kończy się wyjątek epizodyczny dla sprzedaży do 10 000 zł, a nie że znika każdy wyjątek: `references/stan-prawny.md:33-36`.

**[MAJOR] Brakuje ważnej daty operacyjnej: obowiązek odbierania faktur w KSeF działa od 1 lutego 2026 r.** Skill pyta, kto pobiera faktury zakupowe, ale nie utrwala tej reguły w stanie prawnym ani w procedurach. To istotne zwłaszcza dla małych firm, które do końca 2026 r. mogą jeszcze nie mieć obowiązku wystawiania, ale muszą odbierać faktury w KSeF: `references/stan-prawny.md:23-55`, `SKILL.md:138-149`, `references/komponenty.md:42-43`.

**[BLOKER] „Faktury zagraniczne” potraktowano zbiorczo jako faktury poza KSeF.** Sam zagraniczny nabywca nie oznacza, że polski wystawca nie wystawia faktury w KSeF; często wystawia ją w KSeF, a nabywcy udostępnia w sposób uzgodniony. Zakres zależy m.in. od siedziby/stałego miejsca prowadzenia działalności i udziału tego miejsca w transakcji. Obecne brzmienie wywiadu i katalogu faktur „poza KSeF” tworzy fałszywą kategorię: `SKILL.md:146-149`, `references/stan-prawny.md:76-77`, `references/komponenty.md:360-365`.

**[MAJOR] Faktury z kasy fiskalnej również opisano bez daty granicznej.** Możliwość wystawiania faktur z kas i uznawania paragonów z NIP za faktury uproszczone jest rozwiązaniem przejściowym do końca 2026 r. Nie można ich stale wrzucać do worka „poza KSeF”: `SKILL.md:146-149`, `references/stan-prawny.md:76-77`.

## 2. Sankcje

### Ocena

**Poprawne merytorycznie:**

- stosowanie kar od 1 stycznia 2027 r.;
- brak kar za naruszenia KSeF dokonane w 2026 r.;
- kara do 100% VAT wykazanego na fakturze;
- przy fakturze bez wykazanego VAT — do 18,7% należności ogółem.

Dowód w skillu: `references/stan-prawny.md:37-41`.

### Co wymaga doprecyzowania

**[MAJOR] Katalog naruszeń jest sprowadzony do ogólnego „naruszenia obowiązków związanych z systemem”.** Aktualne MF wymienia konkretnie: niewystawienie faktury w KSeF mimo obowiązku, wystawienie podczas awarii/niedostępności niezgodnie z udostępnionym wzorem oraz niedosłanie w terminie faktury z offline24/awarii/niedostępności. Skill zna potrzebę weryfikacji katalogu, ale nie przekazuje go do procedury, mimo że to właśnie procedura ma zapobiegać tym zdarzeniom: `references/stan-prawny.md:37-41`, `references/stan-prawny.md:57-81`.

**[MINOR] „Stosowanie jest zawieszone” jest mniej precyzyjne niż „przepisy o karach stosuje się do naruszeń dokonanych od 1 stycznia 2027 r.; bez działania wstecz”.** Obecne zdanie nie prowadzi do błędnego wyniku, ale warto użyć języka MF: `references/stan-prawny.md:37-41`.

## 3. Tryby szczególne

### Co jest poprawne

- offline24 — wysyłka nie później niż następnego dnia roboczego po dniu wystawienia: `references/komponenty.md:143-145`;
- niedostępność — wysyłka następnego dnia roboczego po zakończeniu okresu niedostępności: `references/komponenty.md:143-146`;
- awaria ogłoszona w BIP i oprogramowaniu interfejsowym — 7 dni roboczych od zakończenia awarii: `references/komponenty.md:143-147`;
- awaria całkowita została przynajmniej odróżniona jako osobny stan: `references/komponenty.md:148`.

### Błędy i ryzyka

**[BLOKER] Awaria całkowita nie jest opisana operacyjnie.** Skill mówi tylko „tryb odrębny, sprawdź w ogłoszeniu”, choć podstawowa reguła jest znana: faktury wystawia się poza KSeF, bez obowiązku stosowania FA(3), i nie dosyła się ich później do KSeF. Bez tej informacji karta awaryjna nie nadaje się do użycia: `references/komponenty.md:148`.

**[BLOKER] Wspólny krok po „powrocie systemu” jest sprzeczny z awarią całkowitą.** Polecenie wysłania wszystkich zaległych faktur i sprawdzenia nadanych numerów oraz zamykanie zdarzenia dopiero po uzyskaniu numerów nie może obejmować awarii całkowitej. W tym trybie numerów KSeF dla tych dokumentów nie będzie: `references/komponenty.md:154-160`, `references/komponenty.md:177-180`, `references/komponenty.md:191-195`, `assets/przyklady/macierz-odpowiedzialnosci.md:51-52`, `assets/przyklady/macierz-odpowiedzialnosci.md:72-75`.

**[MAJOR] Niedostępność ma niepełny kanał rozpoznania.** Aktualne MF wskazuje zapowiedzianą niedostępność w BIP MF i w oprogramowaniu interfejsowym. W tabeli skill kieruje jedynie do komunikatów na `ksef.podatki.gov.pl`, a BIP rezerwuje dla awarii. To może doprowadzić do błędnego zaklasyfikowania zdarzenia: `references/komponenty.md:143-148`, `references/stan-prawny.md:61-65`.

**[MAJOR] Brak reguł przejścia między trybami.** Jeżeli termin dosłania z offline24 lub niedostępności przypada podczas awarii albo awarii całkowitej, skutek się zmienia. Skill wspomina o czterech stanach, lecz nie opisuje przełączenia terminu/obowiązku, a procedura każe po prostu wysłać „po powrocie”: `references/komponenty.md:143-160`.

**[MAJOR] Przykład liczenia daty jest niekompletny i nie realizuje własnej obietnicy skilla.** Zdanie „pierwszym dniem jest poniedziałek” nie wskazuje daty granicznej dla 7 dni roboczych, a dla offline24 i niedostępności nie ma żadnych konkretnych przykładów. Tymczasem skill obiecuje przykład przy każdym terminie: `SKILL.md:71-75`, `references/komponenty.md:184-190`, `references/komponenty.md:540-547`.

**[MAJOR — fałszywa pułapka] Offline24 przedstawiono jako tryb, którego nie wolno używać regularnie „bo wygodniej”.** Ustawa nie ogranicza kręgu podatników ani częstotliwości użycia offline24; wymaga zachowania FA(3), postaci elektronicznej i terminu wysyłki. Naganne jest „wyślemy jak się uda”, nie sama regularność lub wygoda. Obecne brzmienie może bez podstawy blokować prawidłowo zaprojektowany model offline24: `references/komponenty.md:203-206`, `SKILL.md:212-215`, `references/granice.md:79-90`.

## 4. Kody QR

### Co jest poprawne

- rozpoznano KOD I jako kod dostępu/weryfikacji faktury;
- rozpoznano KOD II jako kod związany z certyfikatem wystawcy faktury offline;
- odróżniono dwie funkcje kodów.

Dowód: `references/komponenty.md:162-171`, `references/stan-prawny.md:67-69`.

### Błędy

**[BLOKER] Reguła „faktura wystawiona poza systemem przekazywana na wydruku albo w pliku wymaga dwóch kodów” jest za szeroka.** Dwa kody dotyczą:

- faktury offline24 lub z niedostępności, udostępnianej poza KSeF uprawnionemu ustawowo odbiorcy przed przesłaniem do systemu;
- faktury z trybu awaryjnego udostępnianej poza KSeF.

Po przesłaniu faktury do KSeF wizualizacja ma jeden kod z numerem KSeF. Przy awarii całkowitej nie obowiązuje FA(3) i ta reguła dwóch kodów nie działa. Dla krajowego nabywcy z NIP w offline24/niedostępności co do zasady fakturę odbiera się w KSeF; przed wysyłką można wydać potwierdzenie transakcji, nie dowolną „wizualizację faktury”: `references/komponenty.md:162-175`, `references/stan-prawny.md:67-69`.

**[BLOKER] KOD II opisano bez koniecznego certyfikatu KSeF typu 2.** Ogólne „posiada certyfikat” jest niewystarczające. KOD II potwierdza aktywność certyfikatu oraz uprawnienie jego właściciela do wystawienia faktury w imieniu podatnika; do utworzenia kodu potrzebny jest certyfikat typu 2: `references/komponenty.md:169-175`.

**[BLOKER] Plan testu i przykład każą sprawdzać dwa kody bez warunku odbiorcy, momentu i trybu.** Test może uznać prawidłową fakturę z jednym kodem za wadliwą albo oczekiwać dwóch kodów przy awarii całkowitej: `references/komponenty.md:367-372`, `assets/przyklady/macierz-odpowiedzialnosci.md:108`.

## 5. MCU, uprawnienia i certyfikaty

### MCU

**[BLOKER] Historyczna data uruchomienia MCU jest poprawna, ale opis stanu na sierpień 2026 r. jest nieaktualny.** MCU uruchomiono 1 listopada 2025 r. jako moduł przygotowawczy. Od 1 lutego 2026 r. zarządzanie uprawnieniami i certyfikatami jest dostępne w Aplikacji Podatnika KSeF 2.0 oraz przez API KSeF 2.0/programy zintegrowane, a odrębna strona MCU miała przestać być dostępna. Zdania „to w nim nadaje się i odbiera” oraz „od 1 listopada 2025 nadaje się je wyłącznie tam” prowadzą użytkownika w nieaktualne miejsce: `references/stan-prawny.md:46-49`, `references/komponenty.md:234-240`, `references/komponenty.md:256-259`, `DANE-I-PRYWATNOSC.md:25-30`, `references/granice.md:56-59`.

### Rodzaje uprawnień

**[BLOKER] Bezpośrednie, pośrednie i właścicielskie nie są trzema równorzędnymi „rodzajami nadań”.** Właścicielskie jest przypisywane systemowo podatnikowi. „Bezpośrednio” i „pośrednio” opisuje sposób/łańcuch nadania uprawnień operacyjnych (wystawianie, dostęp), a nie równorzędne zakresy takie jak „właścicielskie”: `references/komponenty.md:226-240`.

**[BLOKER] Uprawnienie bezpośrednie może być nadane osobie albo podmiotowi.** Zapis „bezpośrednie (konkretnej osobie)” oraz zasada „uprawnienie nadaje się osobie, nie stanowisku” pomijają podmioty, choć sam skill ma obsługiwać biura rachunkowe: `references/komponenty.md:231`, `references/komponenty.md:234-245`.

**[BLOKER] Biuru rachunkowemu błędnie przypisano „uprawnienie pośrednie”.** Klient nadaje biuru jako pośrednikowi/podmiotowi uprawnionemu uprawnienie bezpośrednie do wystawiania i/lub dostępu, opcjonalnie z prawem dalszego przekazywania. Dopiero biuro nadaje swoim pracownikom uprawnienia w sposób pośredni do jednego, wybranych lub wszystkich klientów. Obecna matryca odwraca ten model: `references/komponenty.md:215-217`, `references/komponenty.md:228-237`, `SKILL.md:132-137`.

**[MAJOR] Nie opisano skutku przerwania łańcucha pośredniego.** Odebranie uprawnień biuru dezaktywuje możliwość pracy jego pracowników dla klienta, choć ich uprawnienia pośrednie pozostają zapisane w systemie. To ważna pułapka praktyczna przy zmianie biura i w audycie dostępów: `references/komponenty.md:276-278`, `assets/przyklady/macierz-odpowiedzialnosci.md:94-98`.

### Uprawnienia właścicielskie

**[BLOKER] Skill pyta o „drugą osobę” z uprawnieniem właścicielskim i rekomenduje dwie takie osoby.** Uprawnienie właścicielskie jest automatyczne/systemowe, przypisane do NIP podatnika, i nie można nadać drugiego takiego uprawnienia osobie. Można nadać zaufanej osobie szerokie uprawnienie do zarządzania i pracy, ale nie jest to drugie uprawnienie właścicielskie: `references/komponenty.md:212-215`, `references/komponenty.md:242-248`.

**[BLOKER] W matrycy wpisano warunek odebrania uprawnienia właścicielskiego („zbycie firmy”), chociaż kilka linii dalej skill twierdzi, że jest ono nie do odebrania.** To wewnętrzna sprzeczność i obietnica operacji, której system nie umożliwia: `references/komponenty.md:228-237`.

**[MAJOR] „Właścicielskie (pełne, trwałe)” upraszcza zakres.** Trzeba opisać je jako systemowe uprawnienie podatnika wynikające z NIP i oddzielić je od uprawnień osoby z ZAW-FA oraz od szerokich uprawnień nadanych elektronicznie: `references/komponenty.md:228-240`.

### Certyfikaty i odejście pracownika

**[BLOKER] Procedura bezwarunkowo każe firmie unieważnić certyfikat pracownika.** Użytkownik może wykonywać operacje tylko na własnych certyfikatach. Firma nie może unieważnić certyfikatu wydanego na PESEL innej osoby; może odebrać tej osobie uprawnienia i zażądać, aby właściciel unieważnił własny certyfikat. Inaczej wygląda certyfikat wydany na NIP firmy — wtedy trzeba ocenić, komu był udostępniony i jaki będzie wpływ unieważnienia. Skill nie rozróżnia tych przypadków: `references/komponenty.md:263-271`, `assets/przyklady/macierz-odpowiedzialnosci.md:55`, `DANE-I-PRYWATNOSC.md:25-30`.

**[MAJOR] Nie rozróżniono certyfikatów typu 1 i typu 2 w matrycy.** Typ 1 służy do uwierzytelniania, typ 2 do podpisania KODU II dla faktury offline. Bez tej kolumny procedura może wykazać „certyfikat jest”, mimo że firma nie ma środka potrzebnego do wystawienia faktury offline z KODEM II: `references/komponenty.md:208-254`.

## 6. Rola biura rachunkowego jako podmiotu uprawnionego

### Co jest dobre

- Skill poprawnie podkreśla, że sama umowa z biurem nie tworzy uprawnienia KSeF: `references/stan-prawny.md:110-115`.
- Pytania o zakres biura, wystawianie, pobieranie, odrzucenia, tryby szczególne, rozwiązanie umowy i spór są trafne: `SKILL.md:132-137`, `references/komponenty.md:83-89`, `assets/przyklady/macierz-odpowiedzialnosci.md:80-98`.
- Pułapka „biuro ma dostęp, a umowa milczy o KSeF” jest realna i dobrze opisana: `references/komponenty.md:94-100`.

### Co blokuje wydanie

Model techniczny jest jednak błędny: biuro nie jest po prostu pozycją „pośrednie: wg umowy”. Umowa jest podstawą organizacyjną, ale uprawnienie powstaje w KSeF. Klient nadaje biuru uprawnienie do wystawiania/dostępu, z opcją dalszego przekazywania; biuro następnie nadaje pracownikom dostęp pośredni. Błędna matryca uniemożliwia rzetelny audyt, kto rzeczywiście ma dostęp: `references/komponenty.md:228-237`, `assets/przyklady/macierz-odpowiedzialnosci.md:85-88`.

## 7. Płatności, numer KSeF i identyfikator zbiorczy

**[BLOKER — błąd daty] Obowiązek podania numeru KSeF w komunikacie MPP nie działa od 1 sierpnia 2026 r.** Aktualna informacja MF wskazuje 1 stycznia 2027 r. — tę samą datę co dla szerszego obowiązku płatniczego. Błąd występuje wielokrotnie: `references/stan-prawny.md:50-55`, `references/komponenty.md:451-460`, `references/komponenty.md:501-507`.

**[BLOKER] „Od 1 stycznia 2027 obowiązek staje się powszechny” jest za szerokie.** Reguła dotyczy nabywcy będącego czynnym podatnikiem VAT, płacącego innemu czynnemu podatnikowi VAT za fakturę ustrukturyzowaną lub określoną fakturę offline, przez przelew/instrument pozwalający podać tytuł. Obejmuje też określone płatności przez osoby trzecie i polecenie zapłaty. Nie obejmuje dosłownie każdej płatności, każdego nabywcy ani każdej faktury: `references/komponenty.md:456-460`.

**[BLOKER] Przykładowa macierz nakazuje numer KSeF „przy każdej płatności” już w dokumencie datowanym 24 sierpnia 2026 r.** To nie jest opis aktualnego obowiązku, a nawet po 1 stycznia 2027 r. jest zbyt szerokie: `assets/przyklady/macierz-odpowiedzialnosci.md:14-21`, `assets/przyklady/macierz-odpowiedzialnosci.md:47`, `assets/przyklady/macierz-odpowiedzialnosci.md:109`.

**[MAJOR] Szablon macierzy także wpisuje „przy każdej płatności” bez daty i przesłanek.** W efekcie skill może wygenerować fałszywy obowiązek przed 2027 r.: `references/komponenty.md:61-68`.

**[MAJOR] Identyfikator zbiorczy jest opisany zasadniczo dobrze, ale za mało precyzyjnie.** Powinien być generowany w KSeF dla zbioru faktur i używany przy płatności za więcej niż jedną e-fakturę w objętym zakresie; nie jest dowolnym identyfikatorem utworzonym przez firmę: `references/stan-prawny.md:50-55`, `references/komponenty.md:461-464`.

**[MINOR] Pułapka zaliczek jest realna i poprawnie oddzielona od rozstrzygnięcia podatkowego.** Do płatności zaliczki jeszcze nieudokumentowanej fakturą nie podaje się numeru, którego nie ma: `references/komponenty.md:515-517`.

## 8. Struktura FA(3)

**Ocena: poprawna.** Skill wskazuje FA(3) jako aktualną strukturę i słusznie każe potwierdzić obsługę po stronie programu: `references/stan-prawny.md:42-45`.

Do dopisania: FA(3) zastąpiła FA(2) od 1 lutego 2026 r. Nie trzeba przedstawiać aktualnej struktury jako nieznanej, natomiast trzeba sprawdzić wersję programu i poprawność walidacji. Polecenie „wersję zawsze każ potwierdzić dostawcy” powinno dotyczyć gotowości konkretnego programu, nie ustalania obowiązującego prawa: `references/stan-prawny.md:42-45`, `references/stan-prawny.md:97-100`.

## 9. Odrzucenia i status faktury

**[BLOKER] „Pieniądze są, faktury formalnie nie ma, a płatność wisi bez podstawy” jest nieprawdziwe.** Odrzucony plik nie jest fakturą ustrukturyzowaną przyjętą przez KSeF, ale dokument wystawiony poza KSeF może nadal być fakturą w rozumieniu VAT i podstawą rozliczenia, jeśli spełnia przesłanki materialne. Nie wolno z braku numeru KSeF wyprowadzać automatycznie wniosku o „braku faktury” ani „płatności bez podstawy”: `references/komponenty.md:329-337`.

**[MAJOR] Stan prawny formułuje węższą, poprawniejszą regułę, ale komponent ją rozszerza.** „Nie jest fakturą wystawioną w tym systemie” jest czym innym niż „faktury formalnie nie ma”. Te dwa fragmenty są niespójne: `references/stan-prawny.md:102-109`, `references/komponenty.md:331-337`.

**[MAJOR] Automatyczna instrukcja „popraw i wyślij ponownie” wymaga rozdzielenia błędu technicznego od sytuacji, w której dokument został już skutecznie wystawiony poza KSeF.** Procedura powinna najpierw ustalić tryb wystawienia, status dokumentu i przyczynę odrzucenia; nie każda zmiana danych może być wykonana przez nadpisanie pliku bez oceny, czy potrzebna jest korekta: `references/komponenty.md:319-327`, `references/komponenty.md:331-337`.

## 10. Fałszywe braki i nadmierne „WYMAGA WERYFIKACJI”

Oznaczanie zmiennych prawnych jest dobrą praktyką, ale obecna konstrukcja przenosi na użytkownika lub dostawcę programu ustalanie faktów, które na dzień wydania są znane. To tworzy dokument pozornie ostrożny, lecz niewykonalny w zdarzeniu awaryjnym.

**Fałszywe lub źle przypisane braki:**

- dokładne podstawowe skutki czterech trybów, w tym brak późniejszej wysyłki przy awarii całkowitej, są znane — nie powinny pozostać jako „sprawdź w ogłoszeniu”: `references/komponenty.md:138-160`;
- zasady jednego/dwóch kodów i wymaganie certyfikatu typu 2 są znane — dostawca potwierdza implementację programu, nie treść prawa: `references/komponenty.md:162-175`;
- model uprawnień bezpośrednich, pośrednich, właścicielskich i rola biura są znane — do potwierdzenia jest faktycznie nadany zakres danej firmy, nie definicje modelu: `references/stan-prawny.md:70-72`, `references/komponenty.md:212-240`;
- data FA(3) jest znana — dostawca potwierdza zgodność jego wersji programu: `references/stan-prawny.md:42-45`;
- daty płatności są znane, lecz wpisana data MPP jest błędna: `references/stan-prawny.md:50-55`, `references/komponenty.md:451-464`.

**[MAJOR] Wewnętrzna sprzeczność źródłowa.** Plik stanu prawnego wymaga podawania konkretnego źródła, a nie samej domeny, lecz wszystkie szablony używają ogólnego `ksef.podatki.gov.pl`. W sytuacji awaryjnej procedura nie powinna odsyłać użytkownika do szukania strony: `references/stan-prawny.md:83-100`, `SKILL.md:63-75`, `references/komponenty.md:138-152`.

**[MAJOR] Zakaz podawania tytułu aktu i numeru przepisu utrudnia audyt płatnego produktu.** Nie trzeba przeciążać dokumentów artykułami, ale rejestr podstaw prawnych lub konkretne źródło urzędowe z datą aktualizacji powinny istnieć. Całkowity zakaz osłabia możliwość weryfikacji i aktualizacji: `references/stan-prawny.md:9-15`.

## 11. Obietnice niemożliwe lub nieudowodnione

**[BLOKER WYDANIA KOMERCYJNEGO] Instrukcja nie opisuje realnej instalacji w ChatGPT.** Deklaruje działanie „w Claude, także ChatGPT”, po czym podaje wyłącznie przykładową ścieżkę Claude Code. W ekosystemie OpenAI katalog/ZIP skilla można przesłać mechanizmem API albo dostarczyć jako część pluginu, ale ta paczka nie zawiera instrukcji API, manifestu pluginu ani kroków instalacji w ChatGPT. Nie wolno sprzedawać kompatybilności jako gotowej bez testu i instrukcji dla wskazanego produktu/planu: `INSTALACJA.md:1-10`, `INSTALACJA.md:13-26`.

**[MAJOR] „Nie wymaga instalowania niczego” jest sprzeczne z następną sekcją „Wgranie skilla”.** Można napisać, że nie wymaga dodatkowej aplikacji ani połączenia z KSeF, ale wymaga instalacji/importu paczki do zgodnego asystenta: `INSTALACJA.md:1-10`.

**[MAJOR] Skill obiecuje, że każdy zmienny fakt zostanie oznaczony, ale przykład zawiera nieoznaczone, za szerokie obowiązki płatnicze.** `SKILL.md:16-20`, `SKILL.md:63-70`, `assets/przyklady/macierz-odpowiedzialnosci.md:47`.

**[MINOR] Stwierdzenie, że nic nie jest „nigdzie publikowane”, powinno wyraźniej oddzielać zapis lokalnego wyniku od przetwarzania rozmowy w chmurze.** Następne akapity częściowo to wyjaśniają, więc nie jest to blocker, ale zdanie może być zrozumiane zbyt szeroko: `DANE-I-PRYWATNOSC.md:49-60`, w zestawieniu z `DANE-I-PRYWATNOSC.md:13-17`.

## 12. Pułapki praktyczne — ocena

### Realne i dobrze opisane

- brak zastępcy i koncentracja procesu u jednej osoby: `references/komponenty.md:101-104`;
- „obie strony pilnują”, więc faktycznie nie pilnuje nikt: `references/komponenty.md:105-106`;
- umowa z biurem milczy o KSeF mimo technicznego dostępu: `references/komponenty.md:94-100`;
- lokalny brak internetu mylony z awarią KSeF: `references/komponenty.md:196-198`;
- zaległe faktury offline nigdy nie trafiają do KSeF: `references/komponenty.md:191-195` — z wyjątkiem awarii całkowitej, którą trzeba wyłączyć z tej reguły;
- podwójna wysyłka/kolejka plus ręczne ponowienie: `references/komponenty.md:199-202`;
- poprzednie biuro lub wdrożeniowiec nadal mają dostęp: `references/komponenty.md:276-282`;
- komunikaty o odrzuceniu pozostają bez właściciela: `references/komponenty.md:338-340`;
- zmiana programu unieważnia instrukcje ekranowe i testy: `references/komponenty.md:425-428`;
- test wykonany tylko przez wdrożeniowca nie potwierdza gotowości użytkownika końcowego: `references/komponenty.md:429-431`;
- import przelewów może zgubić wymagane pole: `references/komponenty.md:518-520`.

### Realne, ale opisane wadliwie

- regularny offline24 nie jest sam w sobie nadużyciem; naruszeniem jest niedotrzymanie warunków i terminu: `references/komponenty.md:203-206`;
- odrzucony plik jest problemem wymagającym reakcji, lecz „faktury formalnie nie ma/płatność bez podstawy” jest za daleko idącym skutkiem: `references/komponenty.md:331-337`;
- odejście pracownika wymaga odebrania uprawnień, ale firma nie zawsze może unieważnić jego osobisty certyfikat: `references/komponenty.md:263-271`;
- płatność bez numeru jest realnym problemem dopiero w objętym ustawą zakresie od 1 stycznia 2027 r., nie od 1 sierpnia 2026 r.: `references/komponenty.md:501-507`.

### Brakujące pułapki praktyczne

**[BLOKER] Brak bezpiecznego rozdzielenia Demo/produkcja w planie testów.** Tylko test celowego odrzucenia wspomina środowisko testowe. Pozostałe próby — zwykła faktura, offline, korekta, odebranie uprawnienia — mogą zostać zinterpretowane jako polecenie wykonania na produkcji. Faktur produkcyjnych nie wystawia się „na próbę” i nie usuwa z KSeF: `references/komponenty.md:351-383`.

**[MAJOR] Brak testu certyfikatu typu 2 i KODU II przed pierwszym zdarzeniem offline.** Samo sprawdzenie „czy są dwa kody” nie weryfikuje, czy certyfikat jest właściwego typu, aktywny, przypisany do właściwego kontekstu i czy osoba ma uprawnienie wystawiania: `references/komponenty.md:367-372`.

**[MAJOR] Brak scenariusza awarii całkowitej, który zabrania późniejszego dosłania dokumentu.** Obecny plan testów wzmacnia przeciwny nawyk: `references/komponenty.md:370-372`, `references/komponenty.md:154-160`.

**[MAJOR] Brak kontroli daty przejścia przez próg 10 000 zł w trakcie miesiąca.** Procedura powinna wskazywać osobę monitorującą sumę i moment faktury przekraczającej próg, inaczej najmniejsza firma może błędnie pozostać poza KSeF do końca miesiąca: `SKILL.md:127-149`, `references/komponenty.md:31-75`.

**[MAJOR] Brak rozróżnienia: odebranie uprawnienia biuru a unieważnienie dostępów jego pracowników.** Trzeba sprawdzić przerwanie łańcucha i udokumentować, którzy pracownicy biura tracą możliwość pracy dla klienta: `references/komponenty.md:276-278`, `references/komponenty.md:540-552`.

**[MAJOR] Brak obsługi faktury offline, której termin dosłania wpada w awarię albo awarię całkowitą.** To typowy scenariusz, a nie egzotyczny wyjątek: `references/komponenty.md:138-160`.

## 13. Ocena plików pomocniczych i przykładu

**`assets/przyklady/macierz-odpowiedzialnosci.md` jest dobry jako forma**, bo jasno oznacza fikcyjność, braki i potrzebę zatwierdzenia: `assets/przyklady/macierz-odpowiedzialnosci.md:1-9`, `assets/przyklady/macierz-odpowiedzialnosci.md:21-27`.

Do poprawy przed wydaniem:

- „w dniu wykonania usługi lub wg umowy” może fałszywie sugerować, że umowa swobodnie ustala termin faktury; termin wystawienia należy opisać zgodnie z właściwą regułą podatkową ustaloną z księgową/doradcą: `assets/przyklady/macierz-odpowiedzialnosci.md:43`;
- „przy każdej płatności” jest błędne czasowo i zakresowo: `assets/przyklady/macierz-odpowiedzialnosci.md:47`;
- wszystkie faktury z trybów szczególnych nie zawsze dostają później numer — wyjątek to awaria całkowita: `assets/przyklady/macierz-odpowiedzialnosci.md:51-52`, `assets/przyklady/macierz-odpowiedzialnosci.md:72-75`;
- sprawdzenie „obu wymaganych kodów” wymaga warunków odbiorcy, momentu i trybu: `assets/przyklady/macierz-odpowiedzialnosci.md:108`.

## 14. Warunki zdjęcia blokady wydania

Przed wydaniem 1.0.0 należy co najmniej:

1. poprawić datę obowiązku numeru KSeF w MPP na 1 stycznia 2027 r. i zawęzić zakres płatności;
2. przepisać cały model uprawnień: właścicielskie, bezpośrednie, pośrednie, podmiot uprawniony/pośrednik, pracownik biura, przerwanie łańcucha;
3. usunąć „drugą osobę z uprawnieniem właścicielskim” oraz warunek odebrania tego uprawnienia;
4. zaktualizować kanały zarządzania uprawnieniami po 1 lutego 2026 r.;
5. rozpisać cztery osobne ścieżki trybów szczególnych, w tym brak FA(3), brak późniejszej wysyłki i brak numeru KSeF przy awarii całkowitej;
6. przepisać regułę QR według: tryb, moment przed/po wysłaniu, typ odbiorcy, jeden/dwa kody, certyfikat typu 2;
7. poprawić status odrzuconego dokumentu i usunąć stwierdzenie o płatności „bez podstawy”;
8. doprecyzować harmonogram: 2024, sprzedaż brutto, sposób liczenia 10 000 zł, faktura przekraczająca limit, odbieranie od 1 lutego 2026 r., stałe wyłączenia;
9. dodać do planu testów obowiązkową kolumnę „środowisko” i twardy zakaz testowych faktur/operacji na produkcji poza kontrolowanym, rzeczywistym scenariuszem;
10. rozróżnić certyfikaty typu 1 i 2 oraz możliwość unieważnienia własnego i cudzego certyfikatu;
11. wstawić konkretne linki urzędowe i daty aktualizacji zamiast samej domeny;
12. przygotować i zweryfikować osobną, prawdziwą instrukcję instalacji dla ChatGPT albo usunąć deklarację kompatybilności.

Po tych zmianach potrzebny jest ponowny panel merytoryczny oraz test behawioralny na co najmniej pięciu scenariuszach: mikrofirmie przekraczającej próg 10 000 zł, firmie z biurem jako pośrednikiem, offline24 w piątek, awarii całkowitej oraz płatności MPP/płatności zbiorczej od 1 stycznia 2027 r.
