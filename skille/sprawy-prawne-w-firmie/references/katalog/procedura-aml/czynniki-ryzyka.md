<!-- Kopia z skille/procedura-aml/references/czynniki-ryzyka.md, generowana: node narzedzia/katalog-do-firmy.mjs. Nie edytuj tutaj. -->
# Katalog czynników ryzyka (do modelu oceny)

Katalog POMOCNICZY: podpowiada strukturę i typowe czynniki w czterech grupach,
którymi posługuje się podejście oparte na ryzyku. **Nie podpowiadaj wag ani
gotowych ocen**; wagi i progi ustala instytucja na bazie własnej oceny ryzyka,
a ten plik daje tylko listę kandydatów i kierunki. Kierunek to nie automat:
ryzyko podnosi nieprzejrzystość, nieweryfikowalność i brak gospodarczego
uzasadnienia, nie sam fakt (np. zagraniczny udziałowiec z przejrzystej
jurysdykcji, z udokumentowaną strukturą, nie podnosi ryzyka tak, jak łańcuch
podmiotów bez uzasadnienia). Lista państw wysokiego ryzyka jest zmienna:
zawsze `[WYMAGA WERYFIKACJI: aktualna lista; źródło: komunikaty GIIF / wykazy
unijne]`. Model oceny klienta musi dokumentować rozważenie WSZYSTKICH czterech
grup: grupę uznaną za nieistotną odnotuj z uzasadnieniem, nie pomijaj.

## Grupa 1: klient

| Czynnik | Kierunek (co zwykle podnosi ryzyko) |
|---|---|
| Forma prawna i przejrzystość struktury | łańcuchy właścicielskie bez gospodarczego uzasadnienia, struktury utrudniające ustalenie, kto kontroluje (w tym trusty i podmioty z jurysdykcji o niskiej przejrzystości) |
| Beneficjent rzeczywisty | trudny do ustalenia, niechęć do ujawnienia, rozbieżność między badaniem własnym a CRBR |
| Status PEP | klient albo beneficjent jest osobą zajmującą eksponowane stanowisko polityczne, członkiem rodziny PEP albo osobą znaną jako bliski współpracownik PEP `[WYMAGA WERYFIKACJI: definicje i obowiązki wobec PEP; źródło: ustawa AML]`; PEP wśród pełnomocników to dodatkowy czynnik ryzyka, nie automatyczny reżim PEP |
| Charakter działalności klienta | branże intensywnie gotówkowe, obrót używanymi dobrami wysokiej wartości, kryptoaktywa |
| Historia relacji | brak możliwości zweryfikowania klienta i jego profilu; sama długość znajomości NIE obniża ryzyka automatycznie (udokumentowana, spójna historia transakcji może być czynnikiem, sympatia nie) |
| Zachowanie przy nawiązaniu relacji | pośpiech, niechęć do podania danych, dokumenty budzące wątpliwości |

## Grupa 2: geografia

| Czynnik | Kierunek |
|---|---|
| Siedziba / rezydencja klienta i beneficjenta | państwa trzecie wysokiego ryzyka `[WYMAGA WERYFIKACJI: lista]` |
| Kierunki transakcji | przepływy z jurysdykcji i do jurysdykcji o podwyższonym ryzyku, gdy nie mają gospodarczego uzasadnienia w profilu klienta |

Uwaga: sprawdzenie list sankcyjnych NIE jest czynnikiem punktowym tej grupy.
Potwierdzone trafienie to reguła nadrzędna (flaga krytyczna) obsługiwana poza
punktacją, a samo podobieństwo nazwy trzeba najpierw rozstrzygnąć
(komponenty.md, sekcja 3.2).

## Grupa 3: produkty i usługi

| Czynnik | Kierunek |
|---|---|
| Gotówkowość usługi | wysoki udział gotówki, kwoty blisko progów |
| Podatność usługi na nadużycie | usługi ułatwiające anonimowość (np. adres wirtualny bez realnej działalności), szybkie przenoszenie wartości |
| Nietypowość względem profilu | usługi/transakcje bez ekonomicznego uzasadnienia w profilu klienta |

## Grupa 4: kanał dostawy

| Czynnik | Kierunek |
|---|---|
| Sposób nawiązania relacji | w pełni zdalne nawiązanie relacji bez wiarygodnej weryfikacji, w odróżnieniu od osobistego |
| Pośrednicy | relacja przez pośredników utrudniających identyfikację |

## Pułapki modelowania (ostrzegaj użytkownika)

1. **Wszystko na 3.** Skala, w której każdy klient dostaje środek skali, nie
   różnicuje niczego i wygląda na ocenę fasadową. Wymagaj opisów znaczeń dla
   każdego stopnia skali.
2. **Wagi z sufitu.** Suma 100% to za mało; każda waga potrzebuje jednego
   zdania uzasadnienia z odwołaniem do oceny ryzyka instytucji (np. wysoka
   waga gotówki, bo instytucja obsługuje branże gotówkowe).
3. **Progi dopasowane do klientów.** Progi poziomów ryzyka ustala się PRZED
   ocenami klientów, z uzasadnieniem w dokumencie modelu; przesuwanie progów
   tak, żeby ważny klient wypadł niżej, to dokładnie to, co skill ma
   uniemożliwiać (zasada 4 SKILL.md).
4. **Reguła nadrzędna jako punkt.** Potwierdzone trafienie sankcyjne, status
   PEP klienta albo beneficjenta, państwo trzecie wysokiego ryzyka, odmowa
   ujawnienia beneficjenta, niemożność zastosowania środka bezpieczeństwa
   czy powzięcie podejrzenia to nie "wysokie oceny w czynniku", tylko flagi
   krytyczne do natychmiastowej obsługi poza modelem punktowym; średnia
   ważona nie może ich rozcieńczyć.
5. **Ocena bez daty.** Ryzyko klienta się starzeje; model musi mieć zasadę
   przeglądu ocen (częstotliwość wg poziomu ryzyka), inaczej ewidencja traci
   aktualność.
