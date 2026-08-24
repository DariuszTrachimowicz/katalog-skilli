---
tytul: Jeden czy dwa kody QR na fakturze z KSeF
opis: KOD I i KOD II na wizualizacji faktury: kiedy wystarczy jeden kod, kiedy potrzebne są dwa i do czego naprawdę służy certyfikat KSeF typu 2.
zajawka: Kiedy wizualizacja faktury ma jeden kod QR, kiedy dwa i dlaczego reguła „dwa kody zawsze” szkodzi.
data: 2026-08-24
dataSlownie: 24 sierpnia 2026
temat: KSeF
skill: ksef-procedury
kolejnosc: 6
---

Program drukuje fakturę z jednym kodem QR, ktoś w firmie słyszał, że powinny być dwa, i zaczyna się szukanie winnego. Albo odwrotnie: dostawca przysyła wizualizację z dwoma kodami i kupujący odsyła ją jako błędną. Liczba kodów nie jest kwestią ustawień programu ani upodobań wystawcy. Wynika z tego, w jakim trybie faktura powstała i czy w momencie przekazania dokumentu została już przesłana do systemu.

## Dwa kody, dwie różne funkcje

**KOD I** umożliwia dostęp do faktury w Krajowym Systemie e-Faktur i weryfikację jej danych. To ten kod, który prowadzi do dokumentu w systemie.

**KOD II** potwierdza aktywność certyfikatu wystawcy i jego uprawnienie do wystawienia faktury w imieniu podatnika. Odpowiada więc na inne pytanie niż KOD I: nie „co jest w systemie”, tylko „czy ten, kto to wystawił, miał do tego prawo”. Do utworzenia KODU II potrzebny jest certyfikat KSeF typu 2.

Stąd bierze się cała reguła. Dopóki faktura jest w systemie, wystarczy wskazać do niej drogę. Dopóki jej tam nie ma, sam odsyłacz do systemu niczego nie potwierdza i potrzebne jest drugie potwierdzenie, po stronie wystawcy.

## Reguła momentu

Decyduje moment: czy faktura została już przesłana do systemu, zanim jej wizualizacja trafiła poza system.

- Faktura **już przesłana** do systemu, a jej wizualizacja udostępniana poza systemem: **jeden kod, KOD I, z numerem KSeF**.
- Faktura z trybu offline24 albo z okresu niedostępności, udostępniana poza systemem **przed przesłaniem** nabywcy, który jest do tego uprawniony na podstawie przepisów: **dwa kody**.
- Faktura z trybu awaryjnego udostępniana poza systemem **przed przesłaniem**: **dwa kody**. Po przesłaniu wizualizacja ma już jeden KOD I z numerem KSeF.
- **Awaria całkowita**: struktura FA(3) nie obowiązuje, więc reguła dwóch kodów nie ma tu zastosowania.

Osobno warto zapamiętać zasadę dotyczącą krajowego nabywcy posiadającego numer identyfikacji podatkowej. W trybie offline24 albo przy niedostępności co do zasady odbiera on fakturę w systemie po jej przesłaniu. Przed przesłaniem można mu wydać potwierdzenie transakcji, a nie dowolną wizualizację faktury. To rozróżnienie ginie w firmach najczęściej, bo przy ladzie i tak coś trzeba klientowi dać.

## Dlaczego „dwa kody zawsze” to zła reguła

Reguła „każda faktura wystawiona poza systemem wymaga dwóch kodów” brzmi bezpiecznie i dlatego trafia do firmowych instrukcji. Jest za szeroka i wyrządza konkretną szkodę: prowadzi do uznania prawidłowej faktury z jednym kodem za wadliwą.

Skutki są dwustronne. Po stronie sprzedawcy: dokładanie drugiego kodu tam, gdzie faktura poszła już do systemu i ma numer KSeF. Po stronie kupującego: odsyłanie poprawnych dokumentów do „poprawy”, wstrzymywanie płatności i spory z dostawcą o rzecz, która błędem nie jest. Awaria całkowita jest tu skrajnym przypadkiem, bo wtedy struktura FA(3) w ogóle nie obowiązuje, a mimo to instrukcja z regułą „zawsze dwa” każe szukać drugiego kodu.

Poprawne pytanie kontrolne nie brzmi „czy faktura powstała poza systemem”, tylko „czy w chwili przekazania wizualizacji faktura była już przesłana do systemu”.

## Pułapka „przecież mamy certyfikat”

To zdanie pada w firmach bardzo często i bywa prawdziwe, a mimo to nie rozwiązuje problemu. Certyfikaty KSeF występują bowiem w dwóch typach o różnym przeznaczeniu.

**Certyfikat typu 1** służy do uwierzytelniania w systemie. To on pozwala pracować: logować się, wysyłać, pobierać.

**Certyfikat typu 2** służy do utworzenia KODU II na wizualizacji faktury z trybu offline udostępnianej poza systemem przed jej przesłaniem, czyli dokładnie tam, gdzie obowiązuje reguła dwóch kodów.

Bez certyfikatu typu 2 firma nie wystawi prawidłowej wizualizacji w sytuacjach objętych regułą dwóch kodów, nawet jeśli „ma certyfikat”. Co gorsza, przekona się o tym w najgorszym momencie, bo braku certyfikatu typu 2 nie widać wtedy, gdy wszystko działa i faktury idą do systemu na bieżąco. Widać go dopiero w dniu, w którym trzeba wystawić dokument poza systemem i wydać go nabywcy przed przesłaniem.

Certyfikaty mają okres ważności. Okresy oraz tryb odnowienia sprawdź na ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/, bo to wartość, która zmienia się niezależnie od firmy, a wygasa zawsze w nieodpowiednim momencie.

## Jak to wygląda w praktyce

Pracownia Krawiecka Zorza wystawia fakturę w trybie offline24 w piątek o osiemnastej, dla klienta odbierającego zamówienie osobiście. Faktura nie jest jeszcze przesłana do systemu, a klient chce dokument od razu. To jest właśnie sytuacja, w której obowiązuje reguła dwóch kodów, o ile pracownia w ogóle wydaje w tym momencie wizualizację faktury. Jeżeli nie ma certyfikatu typu 2, KODU II nie utworzy, a rozwiązania nie znajdzie w sobotę.

Ta sama pracownia, inny piątek: faktura została przesłana do systemu i otrzymała numer KSeF, a klient prosi o wydruk. Wizualizacja ma wtedy jeden kod, KOD I. Jeśli program dokłada drugi, warto to zgłosić dostawcy programu, a nie traktować jako wersji ostrożniejszej.

Trzeci wariant: ogłoszono awarię całkowitą, faktury powstają poza systemem bez obowiązku stosowania struktury FA(3). Reguła dwóch kodów nie ma tu zastosowania, a szukanie w firmowej instrukcji punktu o kodach jest stratą czasu w chwili, gdy tego czasu jest najmniej.

## Co z tym zrobić w firmie

- Sprawdź, kto w firmie ma certyfikat KSeF i którego typu. Odpowiedź „mamy certyfikat” nie wystarcza, bo typ 1 i typ 2 służą do czego innego.
- Ustal, czy firma w ogóle wydaje wizualizacje faktur przed przesłaniem do systemu i komu. Jeśli tak, certyfikat typu 2 jest warunkiem, a nie opcją.
- Wyrzuć z firmowych materiałów zdanie „faktura poza systemem zawsze ma dwa kody” i zastąp je pytaniem o moment przesłania.
- Zapisz terminy ważności certyfikatów i osobę odpowiedzialną za ich odnowienie, tak samo jak pilnuje się terminów polis czy przeglądów.
- Sprawdź u dostawcy programu, jak generuje wizualizacje w każdym z trybów i czy potrafi utworzyć KOD II.

Zebranie tego w jedną kartę wraz z rolami i listą osób z certyfikatami to osobna praca, którą porządkuje się procedurą.

## Źródła i data sprawdzenia

- Kody QR: KOD I, KOD II, jeden albo dwa kody: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/kody-weryfikujace-qr/ (sprawdzono 24 sierpnia 2026)
- Certyfikaty KSeF, typ 1 i typ 2, ważność: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/ (sprawdzono 24 sierpnia 2026)
- Tryb offline24: warunki, termin, udostępnianie faktury: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/ (sprawdzono 24 sierpnia 2026)
- Cztery tryby szczególne i skutki awarii całkowitej: ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/ (sprawdzono 24 sierpnia 2026)
