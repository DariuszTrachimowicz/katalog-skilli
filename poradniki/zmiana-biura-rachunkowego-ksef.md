---
tytul: Zmiana biura rachunkowego a KSeF: jak odciąć dostępy
opis: Co dzieje się z dostępami pracowników biura po odebraniu uprawnienia w KSeF, w jakiej kolejności robić czynności przy wypowiedzeniu i co zapisać w umowie.
zajawka: Kolejność czynności przy zmianie biura rachunkowego, żeby dostęp do faktur w KSeF skończył się wtedy, kiedy powinien.
data: 2026-08-24
dataSlownie: 24 sierpnia 2026
temat: KSeF
skill: ksef-procedury
kolejnosc: 8
---

Wypowiedzenie umowy biuru rachunkowemu wygląda dziś inaczej niż kiedyś, bo poza segregatorami i loginem do programu księgowego w grę wchodzą uprawnienia w Krajowym Systemie e-Faktur. Firmy robią zwykle jeden ruch, odbierają uprawnienie biuru, i uznają temat za zamknięty. Ten tekst pokazuje, co ten ruch faktycznie robi, czego nie robi i w jakiej kolejności ustawić czynności, żeby nie zostać bez dostępu do własnych dokumentów.

## Co dokładnie robi odebranie uprawnienia biuru

Współpraca z biurem opiera się w systemie na łańcuchu: klient nadaje biuru, jako podmiotowi, uprawnienie bezpośrednie do wystawiania faktur, do dostępu do faktur albo do obu tych rzeczy, a biuro nadaje swoim pracownikom uprawnienia pośrednie do pracy u tego klienta.

Odebranie uprawnienia biuru przerywa ten łańcuch. Możliwość pracy pracowników biura dla tego klienta zostaje dezaktywowana, chociaż ich uprawnienia pośrednie pozostają zapisane w systemie. Efekt praktyczny jest właściwy, ale sposób, w jaki jest osiągnięty, wprowadza w błąd przy czytaniu rejestru. W rejestrze uprawnień klienta widać jeden zamknięty wpis dotyczący biura, a nie listę nazwisk, które przestały mieć dostęp.

## Pułapka „odebrane biuru"

Firma patrzy na jedną linijkę w rejestrze, widzi, że biura już tam nie ma jako podmiotu uprawnionego, i nie zadaje trzech pytań, które trzeba zadać.

Pierwsze: którzy konkretni ludzie stracili przez to dostęp. Klient nie widzi w swoim rejestrze uprawnień pośrednich, które biuro nadało wewnątrz siebie. Jeżeli chce mieć to udokumentowane, musi o ten wykaz poprosić biuro, najlepiej zanim wypowie umowę.

Drugie: czy poza uprawnieniem dla biura jako podmiotu nie wisi gdzieś uprawnienie nadane imiennie. Zdarza się, że w trakcie współpracy ktoś w firmie nadał uprawnienie bezpośrednie konkretnej księgowej, na przykład żeby przyspieszyć jakąś jednorazową sprawę. Takiego wpisu odebranie uprawnienia biuru nie ruszy. Zostaje aktywny po zakończeniu współpracy i to jest najczęstsza realna dziura po zmianie biura.

Trzecie: co zostaje w rejestrze jako zapis. Uprawnienia pośrednie pozostają zapisane w systemie. Przy późniejszym audycie dostępów trzeba umieć odróżnić wpis historyczny od wpisu aktywnego, zamiast wpadać w panikę na widok nazwiska z poprzedniego biura.

Osobna sprawa to certyfikaty KSeF. Operacje wykonuje się wyłącznie na własnych certyfikatach. Firma nie unieważni certyfikatu wydanego na numer PESEL innej osoby, w tym księgowej ze starego biura. Może natomiast odebrać uprawnienia i zażądać, żeby właściciel unieważnił własny certyfikat. Certyfikat wydany na numer identyfikacji podatkowej samej firmy unieważnia osoba uprawniona po stronie firmy, ale przed tym trzeba ustalić, komu był udostępniony i co przestanie działać po unieważnieniu.

## Kolejność czynności przy wypowiedzeniu

Kolejność ma znaczenie, bo dwa najgorsze scenariusze są przeciwstawne: odciąć biuro za wcześnie i zostać z nierozliczonym miesiącem, albo odciąć za późno i zostawić dostęp osobom spoza firmy.

1. Zanim wypowiesz umowę, ustal datę graniczną: do kiedy stare biuro pracuje na dokumentach i od kiedy pracuje nowe. Bez tej daty nie da się ustawić ani nadania, ani odebrania uprawnień.
2. Poproś stare biuro o wykaz osób, które mają u niego nadane uprawnienia pośrednie do twojej firmy. Ten wykaz jest twoją listą kontrolną na później.
3. Sprawdź własny rejestr uprawnień pod kątem wpisów imiennych nadanych poza modelem biura. To ten krok wyłapuje dziurę opisaną wyżej.
4. Nadaj uprawnienie nowemu biuru, jako podmiotowi, w ustalonym zakresie i z decyzją o prawie dalszego przekazywania. Zrób to zanim odbierzesz uprawnienie staremu, żeby nie powstała luka, w której nikt nie może pracować.
5. W dacie granicznej odbierz uprawnienie staremu biuru i usuń ewentualne wpisy imienne jego pracowników.
6. Po odebraniu sprawdź rejestr jeszcze raz i porównaj go z wykazem z punktu drugiego. Kontrola ma odpowiedzieć na jedno pytanie: czy zostało tu cokolwiek, co należało zamknąć.

Pamiętaj przy tym, że obowiązek odbierania faktur zakupowych w Krajowym Systemie e-Faktur działa od 1 lutego 2026 roku i dotyczy wszystkich podatników. Luka w dostępie nie zawiesza tego obowiązku, więc przerwa między biurami nie jest neutralna operacyjnie.

## Jak to wygląda w praktyce

Piekarnia Zaczyn wypowiada umowę biuru z zachowaniem miesięcznego okresu. Właścicielka umawia się, że stare biuro rozlicza jeszcze bieżący miesiąc, a nowe przejmuje dokumenty od pierwszego dnia kolejnego. Uprawnienie dla nowego biura nadaje z tygodniowym wyprzedzeniem, żeby zdążyło skonfigurować program i nadać swoim ludziom uprawnienia pośrednie. Uprawnienie staremu biuru odbiera dopiero w dniu granicznym, po potwierdzeniu, że rozliczenie zostało zamknięte.

Przy kontroli rejestru okazuje się, że pół roku wcześniej, przy jednorazowej korekcie, nadano uprawnienie bezpośrednie imiennie jednej z księgowych starego biura. Odebranie uprawnienia biuru tego wpisu nie zamknęło. Właścicielka usuwa go osobno i dopiero wtedy zamyka listę kontrolną.

## Co z tym zrobić w firmie

- Wpisz do umowy z biurem punkt o dostępie w okresie przejściowym: do której daty biuro pracuje na dokumentach, kiedy przekazuje wykaz osób z uprawnieniami pośrednimi i w jakim terminie po zakończeniu współpracy potwierdza, że nie pozostawiło u siebie aktywnych dostępów.
- Zapisz w umowie także sposób wydania danych. Uprawnienie w systemie to nie to samo co przekazanie zestawień, plików i historii korespondencji, których biuro używało do pracy.
- Nigdy nie odbieraj uprawnienia staremu biuru, zanim nowe nie ma nadanego swojego. Luka kosztuje więcej niż jeden dzień nakładania się dostępów.
- Po każdej zmianie biura zrób przegląd wpisów imiennych, nie tylko wpisu podmiotu. To jedyny sposób na wychwycenie dostępów nadanych doraźnie w trakcie współpracy.
- Ustal u siebie, jak długo i gdzie trzymacie własną kopię dokumentów niezależnie od tego, kto prowadzi księgowość. Zasady przechowywania faktur w systemie i obowiązki archiwalne firmy poza nim sprawdź na ksef.podatki.gov.pl/ksef-news/zasady-obowiazywania-ksef-i-przepisy-prawne/, bo to obszar zmienny.

Ułożenie tego w jedną listę czynności z datami i osobami odpowiedzialnymi, tak żeby dało się ją wykonać także wtedy, gdy rozstanie z biurem jest nerwowe, to osobna robota, którą porządkuje się procedurą.

## Źródła i data sprawdzenia

- Model uprawnień, biuro jako podmiot uprawniony, przerwanie łańcucha uprawnień: ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/ (sprawdzono 24 sierpnia 2026)
- Certyfikaty KSeF i zasady operacji na certyfikatach: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/ (sprawdzono 24 sierpnia 2026)
- Obowiązek odbierania faktur w systemie: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/ (sprawdzono 24 sierpnia 2026)
- Przechowywanie faktur i obowiązki archiwalne: ksef.podatki.gov.pl/ksef-news/zasady-obowiazywania-ksef-i-przepisy-prawne/ (sprawdzono 24 sierpnia 2026)

## Najczęstsze pytania

### W jakiej kolejności zmienić biuro rachunkowe w KSeF?

Najpierw ustal datę graniczną i poproś stare biuro o wykaz osób z uprawnieniami pośrednimi do Twojej firmy. Potem sprawdź wpisy imienne w rejestrze, nadaj uprawnienie nowemu biuru i dopiero w dacie granicznej odbierz je staremu. Na końcu porównaj rejestr z wykazem, żeby nic nie zostało otwarte.

### Czy po odebraniu uprawnienia biuru jego pracownicy tracą dostęp do KSeF?

Tak, odebranie uprawnienia biuru dezaktywuje możliwość pracy jego pracowników dla tego klienta, choć ich uprawnienia pośrednie pozostają zapisane w systemie. Nie dotyczy to uprawnień nadanych przez firmę imiennie konkretnej księgowej. Takie wpisy zostają aktywne po zakończeniu współpracy i trzeba je usunąć osobno.

### Czy firma może unieważnić certyfikat KSeF księgowej ze starego biura?

Nie, firma nie unieważni certyfikatu wydanego na numer PESEL innej osoby, bo operacje wykonuje się wyłącznie na własnych certyfikatach. Może odebrać uprawnienia i zażądać, żeby właściciel certyfikatu sam go unieważnił. Certyfikat wydany na numer identyfikacji podatkowej firmy unieważnia osoba uprawniona po stronie firmy.

### Czy w przerwie między biurami trzeba odbierać faktury w KSeF?

Tak, obowiązek odbierania faktur zakupowych w KSeF działa od 1 lutego 2026 roku i dotyczy wszystkich podatników. Luka w dostępie między biurami nie zawiesza tego obowiązku. Dlatego uprawnienie nowemu biuru nadaje się przed odebraniem go staremu, żeby nie powstał okres, w którym nikt nie może pracować.
