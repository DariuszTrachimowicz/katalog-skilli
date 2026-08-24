# Panel QA: język, polski rynek, opis i terytorium

Data kontroli: 24.08.2026

Zakres: `SKILL.md`, `references/procedura-firmowa.md`, `wpis.md` oraz porównanie opisów skilli `pismo-urzedowe`, `kalendarz-obowiazkow` i `rodo-w-malej-firmie`.

## Ocena ogólna

Walidator techniczny przechodzi bez błędów, ale pakiet nie jest jeszcze gotowy do wydania. Blokują go: zbyt szerokie terytorium opisu, niepełna rama terminów dla CEIDG i KRS, brak oznaczeń przy zmiennych wartościach prawnych, błędna reguła domen dla kwalifikowanych dostawców oraz niebezpieczna sugestia wspólnego loginu.

## 1. Opis, uruchamianie i kolizje

### Co działa

- Opis zawiera nazwy urzędowe i potoczne wejścia: e-Doręczenia, ADE, BAE, `jakaś skrzynka dla urzędu`, powiadomienie o piśmie, urlop i obawę przed przegapieniem korespondencji (`skille/e-doreczenia-w-firmie/SKILL.md:3`, `skille/e-doreczenia-w-firmie/SKILL.md:19-26`). To realnie obejmuje język właściciela małej firmy.
- Granica z `pismo-urzedowe` jest czytelna: ten skill ma obsłużyć skrzynkę i datę doręczenia, a napisanie odpowiedzi przekazuje do sąsiedniego skilla (`skille/e-doreczenia-w-firmie/SKILL.md:3`, `skille/e-doreczenia-w-firmie/SKILL.md:75-79`, `skille/pismo-urzedowe/SKILL.md:3`).
- Granica z `kalendarz-obowiazkow` także jest czytelna. Bieżący skill obejmuje jeden proces, czyli pilnowanie skrzynki, a kalendarz obejmuje cykliczne obowiązki całej firmy (`skille/e-doreczenia-w-firmie/SKILL.md:3`, `skille/kalendarz-obowiazkow/SKILL.md:3`).
- Rejestr opisu jest bardziej konkretny i potoczny niż w `rodo-w-malej-firmie`, ale nadal pasuje do tej samej grupy: właściciela lub osoby prowadzącej małą firmę (`skille/e-doreczenia-w-firmie/SKILL.md:3`, `skille/rodo-w-malej-firmie/SKILL.md:3`).

### BLOKER: opis uruchamia skill poza jego terytorium

Fraza `gdy ktoś pyta o e-Doręczenia` jest bezwarunkowa. Odpali skill także dla obywatela, urzędu, podmiotu publicznego albo dostawcy integrującego usługę, chociaż dalsza instrukcja zna tylko sytuację firmy z CEIDG lub KRS (`skille/e-doreczenia-w-firmie/SKILL.md:3`, `skille/e-doreczenia-w-firmie/SKILL.md:10-17`, `skille/e-doreczenia-w-firmie/SKILL.md:30-45`). Opis powinien ograniczyć wyzwalacz do przedsiębiorcy lub firmy z CEIDG albo rejestru przedsiębiorców KRS i wyłączyć skrzynkę osobistą, obsługę podmiotu publicznego oraz integrację dostawcy.

Brakuje też wyraźnej granicy dla prośby `mam pismo na e-Doręczeniach, wyjaśnij mi jego treść`. Obecny opis może przejąć taką prośbę przez samo słowo e-Doręczenia, choć `pismo-urzedowe` rozdziela napisanie odpowiedzi od samego zrozumienia treści (`skille/e-doreczenia-w-firmie/SKILL.md:3`, `skille/pismo-urzedowe/SKILL.md:3`). Należy dopisać, że ten skill wyjaśnia mechanikę odbioru i datę doręczenia, ale nie tłumaczy merytorycznej treści pisma.

### BLOKER: zmienna data w samym opisie

`1 października 2026` jest wpisane do `description` jako stały wyzwalacz bez oznaczenia `WYMAGA WERYFIKACJI` i bez dokładnego źródła (`skille/e-doreczenia-w-firmie/SKILL.md:3`). To ryzyko zarówno prawne, jak i ryzyko błędnego uruchamiania po kolejnej zmianie harmonogramu.

## 2. Warstwa językowa

### Kontrola znaków

Kontrola każdego z trzech plików dała po 0 wystąpień:

- U+2013, półpauza;
- U+2014, pauza;
- sekwencje UTF-8 `E2 80 93` i `E2 80 94`;
- encje HTML odpowiadające pauzie i półpauzie.

Kryterium długich myślników: ZALICZONE.

### Problemy do poprawy

- Polskie cudzysłowy są systematycznie niedomknięte. Tekst otwiera cytaty znakiem `„`, ale zamyka ASCII `"` zamiast `”` (`skille/e-doreczenia-w-firmie/SKILL.md:21-26`, `skille/e-doreczenia-w-firmie/SKILL.md:83-87`, `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:8-12`, `skille/e-doreczenia-w-firmie/wpis.md:29-30`, `skille/e-doreczenia-w-firmie/wpis.md:43-45`). To nie jest poprawna polska typografia.
- Nie znalazłem wyraźnej kalki składniowej z angielskiego, ale zostały dwa zbędne zapożyczenia: `Login` i `Checklista`. Dla tej grupy odbiorców naturalniej brzmią `nazwa użytkownika` oraz `lista kontrolna` (`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:48-49`, `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:54`).
- `wg ogłaszanej ramy` brzmi skrótowo i urzędowo, a nie jak tekst dla właściciela małej firmy. Lepsze jest pełne `według aktualnego harmonogramu` wraz z oznaczeniem weryfikacji (`skille/e-doreczenia-w-firmie/wpis.md:43-46`).
- Zdanie SEO `Plus procedura pilnowania skrzynki` jest urwanym dopowiedzeniem, a słowo `procedura` obiecuje więcej niż skill dostarcza (`skille/e-doreczenia-w-firmie/wpis.md:10-11`). Główna instrukcja i plik referencyjny celowo nazywają wynik roboczym planem, nie dokumentem firmowym (`skille/e-doreczenia-w-firmie/SKILL.md:59-64`, `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:1-5`). Ten sam rozjazd wraca w opisie oszczędności (`skille/e-doreczenia-w-firmie/wpis.md:33-39`). Rejestr i obietnica produktu nie są przez to jednolite.
- Sformułowanie `powiadomienia i logowanie do skrzynki żyją w domenie gov.pl` jest potoczne, ale w instrukcji bezpieczeństwa nieprecyzyjne i zbyt kategoryczne (`skille/e-doreczenia-w-firmie/SKILL.md:66-70`). Tu potrzebne jest jednoznaczne rozróżnienie skrzynki publicznej i wybranego dostawcy kwalifikowanego.

## 3. Polski rynek i wartości zmienne

### Co działa

- W trzech plikach nie ma kwot w USD, EUR, GBP, CHF ani symboli obcych walut. Kryterium walut: ZALICZONE.
- Użyte polskie nazwy systemowe są zasadniczo poprawne: ADE, BAE, profil zaufany, e-dowód, CEIDG i KRS (`skille/e-doreczenia-w-firmie/SKILL.md:30-57`, `skille/e-doreczenia-w-firmie/wpis.md:54-59`).

### BLOKER: niepełny harmonogram i za mało danych wejściowych

Skill pyta tylko o formę i rok wpisu, po czym sprowadza ramę do nowych wpisów oraz firm z CEIDG sprzed 2025 roku (`skille/e-doreczenia-w-firmie/SKILL.md:30-43`). Aktualny harmonogram gov.pl rozróżnia dodatkowo co najmniej:

- podmioty z rejestru przedsiębiorców KRS wpisane przed 1 stycznia 2025 roku;
- przedsiębiorców z CEIDG wpisanych do 31 grudnia 2024 roku, którzy zmieniali wpis po 30 czerwca 2025 roku;
- pozostałych przedsiębiorców z CEIDG wpisanych do 31 grudnia 2024 roku.

Bez pytania o zmianę wpisu po 30 czerwca 2025 roku skill może przypisać przedsiębiorcę do niewłaściwej gałęzi. Brakuje też użytecznej ramy dla starego KRS, mimo że opis obejmuje KRS. Źródło sprawdzone 24.08.2026: [Harmonogram e-Doręczeń na gov.pl](https://www.gov.pl/web/e-doreczenia/harmonogram).

### BLOKER: wartości prawne bez oznaczenia i dokładnego źródła

Jedyny jawny nakaz weryfikacji znajduje się przy ogólnym poleceniu dla modelu (`skille/e-doreczenia-w-firmie/SKILL.md:35-40`). Konkretne wartości są jednak wielokrotnie podane bez oznaczenia:

- data `1 października 2026` (`skille/e-doreczenia-w-firmie/SKILL.md:3`, `skille/e-doreczenia-w-firmie/SKILL.md:41-43`, `skille/e-doreczenia-w-firmie/wpis.md:43-47`);
- fikcja doręczenia po 14 dniach (`skille/e-doreczenia-w-firmie/SKILL.md:10-13`, `skille/e-doreczenia-w-firmie/SKILL.md:74-78`, `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:43-46`, `skille/e-doreczenia-w-firmie/wpis.md:49-52`, `skille/e-doreczenia-w-firmie/wpis.md:54-59`);
- reguła obowiązku przy nowych wpisach do KRS i CEIDG (`skille/e-doreczenia-w-firmie/SKILL.md:41-43`).

Każde miejsce, w którym skill ma wypowiedzieć zmienną datę albo regułę harmonogramu jako fakt, powinno wymuszać zapis w rodzaju `[WYMAGA WERYFIKACJI: https://www.gov.pl/web/e-doreczenia/harmonogram]`. Dla reguły 14 dni odpowiednim źródłem jest [FAQ e-Doręczeń na gov.pl](https://www.gov.pl/web/e-doreczenia/pytania-i-odpowiedzi).

### BLOKER: błędna reguła domen

Skill sam dopuszcza płatną skrzynkę u kwalifikowanego dostawcy (`skille/e-doreczenia-w-firmie/SKILL.md:50-52`), a następnie uznaje nadawcę spoza `gov.pl` za sygnał podszycia (`skille/e-doreczenia-w-firmie/SKILL.md:66-73`). To wewnętrzna sprzeczność. W polskim systemie działają kwalifikowani dostawcy niepubliczni, więc ich prawidłowe logowanie i powiadomienia nie muszą pochodzić z domeny `gov.pl`. Źródło: [Kwalifikowani dostawcy usług na gov.pl](https://www.gov.pl/web/e-doreczenia/kwalifikowani-dostawcy-uslug-kdu4).

Bezpieczna reguła powinna brzmieć: dla skrzynki publicznej wejdź ręcznie przez oficjalny serwis rządowy, a dla skrzynki kwalifikowanej przez adres dostawcy wcześniej wybranego i sprawdzonego w oficjalnym rejestrze. Sama domena spoza `gov.pl` nie jest wystarczającym sygnałem oszustwa.

### BLOKER: wspólny login zamiast osobnych uprawnień

Plan mówi, że login i sposób odzyskania dostępu mają być znane dwóm osobom (`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:48-49`). To może zachęcać do współdzielenia danych logowania. W innym miejscu ten sam plan poprawnie przewiduje role administratora i zastępstwa (`skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:21-25`). Należy zostawić osobne dostępy nadane przez administratora i plan odzyskiwania dostępu, bez wspólnego hasła lub loginu. Przykład z żoną także powinien mówić o jawnie nadanym dostępie i roli, nie tylko o tym, że `dostęp ma też żona` (`skille/e-doreczenia-w-firmie/wpis.md:48-50`). Oficjalne FAQ opisuje dodawanie użytkownika przez administratora i przypisywanie mu roli: [FAQ e-Doręczeń na gov.pl](https://www.gov.pl/web/e-doreczenia/pytania-i-odpowiedzi).

## 4. Obowiązkowe sekcje `wpis.md`

| Wymaganie | Wynik | Dowód |
| --- | --- | --- |
| `Na czym się wywala`, minimum 3 uczciwe pozycje | ZALICZONE | Są 4 konkretne ograniczenia: zmienność terminów, sytuacje nietypowe, brak dostępu do konta i zakaz zgadywania terminu z pisma (`skille/e-doreczenia-w-firmie/wpis.md:71-81`). |
| `Czego ten skill nie robi celowo` | ZALICZONE | Są 4 jasne granice: pisma urzędowe, orzekanie, KSeF oraz hasła i logowanie (`skille/e-doreczenia-w-firmie/wpis.md:83-93`). |
| `Przykład z życia` z imieniem i liczbami | FORMALNIE ZALICZONE | Jest pan Marek, rok 2011, data 1 października 2026, rytm cotygodniowy, urlop dwutygodniowy, odbiór po 2 dniach i reguła 14 dni (`skille/e-doreczenia-w-firmie/wpis.md:41-52`). |
| Uczciwość przykładu | NIEZALICZONE | Przykład stwierdza, że grupa Marka ma konkretny termin, nie pyta o zmianę wpisu po 30 czerwca 2025 roku, nie dodaje oznaczenia weryfikacji i nie wyjaśnia sposobu nadania żonie dostępu (`skille/e-doreczenia-w-firmie/wpis.md:43-50`). |

## 5. Minimalny zestaw poprawek przed wydaniem

1. Ograniczyć `description` do przedsiębiorców i firm z CEIDG albo rejestru przedsiębiorców KRS. Wyłączyć skrzynki osobiste, podmioty publiczne, integracje dostawców i tłumaczenie merytorycznej treści pisma.
2. Usunąć stałą datę z `description` albo oznaczyć ją jako wartość do bieżącej weryfikacji.
3. Rozbudować pytania i harmonogram o stare KRS oraz zmianę wpisu CEIDG po 30 czerwca 2025 roku.
4. Przy każdej zmiennej dacie i wartości prawnej wymusić `WYMAGA WERYFIKACJI` z dokładnym odnośnikiem gov.pl.
5. Rozdzielić reguły bezpieczeństwa dla skrzynki publicznej i kwalifikowanego dostawcy niepublicznego.
6. Usunąć sugestię wspólnego loginu. Zastępstwo ma mieć osobno nadaną rolę i własny dostęp.
7. Ujednolicić obietnicę `plan lub rytm`, poprawić polskie cudzysłowy, zastąpić `Login`, `Checklista` i `wg` naturalnymi polskimi formami.
8. Poprawić przykład Marka tak, aby nie wydawał konkluzji prawnej i jasno opisywał nadanie dostępu drugiej osobie.

WERDYKT: blokery do wydania TAK
