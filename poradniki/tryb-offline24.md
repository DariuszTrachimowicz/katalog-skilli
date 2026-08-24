---
tytul: Tryb offline24 w KSeF: kiedy wolno i jaki jest termin
opis: Tryb offline24 w praktyce: kiedy wolno go użyć, do kiedy przesłać fakturę, ile kodów QR na wizualizacji i czym różni się od niedostępności i awarii.
zajawka: Offline24 to decyzja wystawcy, nie awaria systemu, i rządzi się własnym terminem oraz własną regułą kodów QR.
data: 2026-08-24
dataSlownie: 24 sierpnia 2026
temat: KSeF
skill: ksef-procedury
kolejnosc: 5
---

Tryb offline24 jest w Krajowym Systemie e-Faktur najczęściej mylonym rozwiązaniem, bo bywa opisywany jako „tryb na wypadek awarii”. Nie jest. To dobrowolna decyzja wystawcy, którą można podjąć bez żadnego ogłoszenia i bez żadnej usterki po stronie systemu. Poniżej masz warunki, termin przesłania z przykładem na weekend, zasadę kodów QR na wizualizacji oraz granicę między offline24 a trzema pozostałymi trybami.

## Kiedy wolno skorzystać z offline24

Offline24 jest dobrowolny. Decyzja należy do wystawcy i nie wymaga żadnego ogłoszenia ani potwierdzenia. Nie ma ograniczenia co do kręgu podatników ani co do częstotliwości korzystania z tego trybu.

Warunki dotyczą samego dokumentu i są twarde:

- fakturę wystawia się **według struktury FA(3)**, obowiązującej od 1 lutego 2026 roku;
- fakturę wystawia się **w postaci elektronicznej**, a nie na papierze;
- fakturę **przesyła się do systemu nie później niż następnego dnia roboczego po dniu wystawienia**.

Warto to podkreślić, bo w rozmowach offline24 bywa rozumiany jako „wystawiam po staremu”. Tak nie jest: dokument powstaje w tej samej strukturze co faktura wysyłana wprost do systemu, tylko sama wysyłka jest przesunięta w czasie.

## Termin przesłania i weekend

Termin liczy się w dniach roboczych, więc dzień wystawienia i dzień przesłania nie zawsze sąsiadują w kalendarzu.

Przykład. Serwis maszyn „Wałek” kończy naprawę w piątek o 18:00 u klienta, na miejscu wystawia fakturę w trybie offline24 i wręcza wizualizację. Następny dzień roboczy po dniu wystawienia to poniedziałek, więc to poniedziałek jest dniem, w którym fakturę trzeba przesłać do systemu. Sobota i niedziela terminu nie konsumują, ale też go nie przedłużają: w poniedziałek dokument ma trafić do systemu, a nie „gdzieś na początku tygodnia”.

Praktyczna konsekwencja jest organizacyjna, nie prawna. Faktury wystawione w piątek po godzinach pracy biura zwykle wysyła w poniedziałek ktoś, kto ich nie wystawiał. Jeżeli nie ma miejsca, w którym takie dokumenty się odkłada, i osoby, która w poniedziałek rano to miejsce sprawdza, termin przechodzi niezauważony.

## Ile kodów QR na wizualizacji

To druga rzecz, którą przy offline24 robi się źle, i to w obie strony.

Zasada zależy od momentu, w którym udostępniasz wizualizację poza systemem:

- **przed przesłaniem faktury do systemu**, gdy udostępniasz ją poza systemem odbiorcy uprawnionemu do tego ustawowo: **dwa kody**;
- **po przesłaniu faktury do systemu**: wystarczy **jeden kod, KOD I, z numerem KSeF**.

KOD I umożliwia dostęp do faktury w systemie i weryfikację jej danych. KOD II potwierdza aktywność certyfikatu wystawcy i jego uprawnienie do wystawienia faktury w imieniu podatnika. Do utworzenia KODU II potrzebny jest **certyfikat KSeF typu 2**. To nie jest ten sam certyfikat, którym firma uwierzytelnia się w systemie, bo do uwierzytelniania służy certyfikat typu 1. Firma, która „ma certyfikat”, ale nie ma typu 2, nie wystawi prawidłowej wizualizacji tam, gdzie obowiązuje reguła dwóch kodów.

Nie działa natomiast odwrotny skrót, czyli reguła „każda faktura wystawiona poza systemem wymaga dwóch kodów”. Jest za szeroka i prowadzi do uznawania prawidłowych faktur z jednym kodem za wadliwe.

Osobno warto zapamiętać sytuację krajowego nabywcy z numerem identyfikacji podatkowej. Przy offline24 co do zasady odbiera on fakturę w systemie po jej przesłaniu. Przed przesłaniem można mu wydać potwierdzenie transakcji, a nie dowolną wizualizację faktury.

## Czym offline24 różni się od niedostępności i awarii

Cztery tryby pracy bez dostępu do systemu mają różne wyzwalacze i różne terminy. Mylenie ich kończy się przekroczeniem terminu, bo firma stosuje regułę z niewłaściwego trybu.

| Tryb | Kto uruchamia | Termin przesłania do systemu |
|---|---|---|
| Tryb offline24 | decyzja wystawcy, bez ogłoszenia | następny dzień roboczy po dniu wystawienia |
| Tryb offline przy niedostępności KSeF | ogłoszenie Ministerstwa Finansów | następny dzień roboczy po zakończeniu okresu niedostępności |
| Tryb awaryjny przy awarii KSeF | ogłoszenie Ministerstwa Finansów | 7 dni roboczych od zakończenia awarii |
| Awaria całkowita KSeF | ogłoszenie odrębne | faktur nie przesyła się w ogóle |

Niedostępność i awarię Ministerstwo Finansów ogłasza w Biuletynie Informacji Publicznej Ministerstwa Finansów oraz w oprogramowaniu interfejsowym. Awarię całkowitą ogłasza się odrębnie, a kanał tego ogłoszenia potwierdź na stronie wskazanej w źródłach, bo to element zmienny.

Awaria całkowita jest jedynym z czterech trybów bez późniejszego dosyłania. Faktury wystawia się wtedy poza systemem, bez obowiązku stosowania struktury FA(3), i nie przesyła się ich później do systemu, więc nie otrzymują numeru KSeF. Skoro struktura FA(3) nie obowiązuje, nie ma tam też zastosowania reguła dwóch kodów.

Dwa przejścia dotykają wprost faktur z offline24. Po pierwsze, awaria całkowita zdejmuje obowiązek przesłania także z faktury wystawionej w trybie offline24 wcześniej, jeszcze nieprzesłanej: takiej faktury do systemu się nie przesyła i pozostaje ona bez numeru KSeF. Po drugie, jeżeli termin przesłania faktury z offline24 przypada w czasie ogłoszonej awarii, obowiązuje reguła terminu trybu ogłoszonego w tym momencie, a nie pierwotna. Sposób liczenia terminu przy nakładających się trybach sprawdź na stronie wskazanej w źródłach, bo to wartość, którą trzeba potwierdzać na bieżąco.

## Co z tym zrobić w firmie

1. **Zdecyduj, kiedy offline24 jest u Was dozwolony, i zapisz to.** Praca w terenie, wystawianie po godzinach pracy biura, wyjazdy serwisowe. Tryb dobrowolny bez wewnętrznej reguły oznacza, że każdy stosuje go inaczej.
2. **Wyznacz jedno miejsce na faktury czekające na przesłanie** i osobę, która sprawdza je pierwszego dnia roboczego rano, razem z zastępstwem.
3. **Sprawdź, czy firma ma certyfikat KSeF typu 2**, jeżeli zdarza się udostępniać wizualizację przed przesłaniem faktury. Bez niego nie utworzysz KODU II.
4. **Zapisz w jednym miejscu adres Biuletynu Informacji Publicznej Ministerstwa Finansów i kanał wsparcia dostawcy programu.** W chwili ogłoszonej niedostępności nikt nie będzie ich szukał.
5. **Rozdziel w dokumentacji cztery tryby, zwłaszcza awarię całkowitą.** Wspólny krok „po powrocie systemu wyślij wszystko i sprawdź numery” jest w tym jednym przypadku błędny.

Spisanie tych ról, wyzwalaczy i terminów w jeden dokument, według którego da się działać w piątek o 18:00, to osobna robota, którą porządkuje się firmową procedurą. To, jak konkretnie zachowuje się Wasz program do fakturowania w każdej z tych sytuacji, potwierdźcie u jego dostawcy.

## Źródła i data sprawdzenia

- Tryb offline24: warunki, termin, udostępnianie faktury: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/ (sprawdzono 24 sierpnia 2026)
- Cztery tryby szczególne, ich skutki i przejścia między nimi: ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/ (sprawdzono 24 sierpnia 2026)
- Kody QR: KOD I, KOD II, jeden albo dwa kody: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/ (sprawdzono 24 sierpnia 2026)
- Certyfikaty KSeF typu 1 i typu 2: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/ (sprawdzono 24 sierpnia 2026)
- Struktura logiczna FA(3): ksef.podatki.gov.pl/informacje-ogolne-ksef-20/struktura-logiczna-fa-3/ (sprawdzono 24 sierpnia 2026)
- Ogłoszenia o awarii i niedostępności: Biuletyn Informacji Publicznej Ministerstwa Finansów (sprawdzono 24 sierpnia 2026)
