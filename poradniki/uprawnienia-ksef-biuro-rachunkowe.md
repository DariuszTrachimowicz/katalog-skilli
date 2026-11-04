---
tytul: Uprawnienia KSeF dla biura rachunkowego: kto komu je nadaje
opis: Właścicielskie, bezpośrednie i pośrednie uprawnienia w KSeF. Prawidłowa kolejność nadania biuru rachunkowemu i jego pracownikom oraz najczęstszy błąd.
zajawka: Jak ułożyć uprawnienia w KSeF między firmą, biurem rachunkowym i jego pracownikami, żeby dostępy dały się później skontrolować.
data: 2026-08-24
dataSlownie: 24 sierpnia 2026
temat: KSeF
skill: ksef-procedury
kolejnosc: 7
---

Umowa z biurem rachunkowym jest podpisana, biuro prosi o „dostęp do KSeF", a w firmie nikt nie wie, co dokładnie kliknąć i w jakiej kolejności. Poniżej jest model uprawnień w Krajowym Systemie e-Faktur opisany tak, żeby dało się według niego nadać dostęp i po roku sprawdzić, kto go ma. Zaczynamy od rozróżnienia, którego pominięcie psuje całą resztę.

## Trzy pojęcia, które nie leżą na jednej półce

Największe nieporozumienie wokół uprawnień w KSeF polega na zestawianiu trzech nazw w jednej tabelce, jakby były trzema opcjami do wyboru. Nie są. Uprawnienie właścicielskie opisuje źródło uprawnienia, a uprawnienia bezpośrednie i pośrednie opisują sposób jego nadania. To dwie różne osie, nie trzy pozycje z jednej listy.

Uprawnienie właścicielskie jest systemowe. Przypisuje się je podatnikowi i wynika z jego numeru identyfikacji podatkowej. Nie nadaje się go drugiej osobie i nie odbiera się go w systemie. Nie istnieje coś takiego jak „druga osoba z uprawnieniem właścicielskim", więc prośba pracownika albo biura o „takie samo uprawnienie jak właściciel" nie ma odpowiednika w systemie. Można natomiast nadać zaufanej osobie szerokie uprawnienie do zarządzania uprawnieniami i do pracy w systemie, i to jest coś zupełnie innego.

Podmiot, który nie jest osobą fizyczną i nie dysponuje kwalifikowaną pieczęcią elektroniczną, wskazuje pierwszą osobę fizyczną uprawnioną odrębnym zgłoszeniem. Tryb i aktualność tego zgłoszenia sprawdź na ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/, bo to element proceduralny, który bywa modyfikowany. Uprawnienia takiej osoby są nadal uprawnieniami nadanymi, a nie uprawnieniem właścicielskim.

## Bezpośrednie: dla osoby fizycznej albo dla podmiotu

Uprawnienie bezpośrednie nadaje się osobie fizycznej albo podmiotowi. Ta druga możliwość jest kluczowa dla współpracy z księgowością: biuro rachunkowe dostaje uprawnienie jako podmiot, nie jako zbiór nazwisk. Zakresy obejmują między innymi wystawianie faktur, dostęp do faktur i zarządzanie uprawnieniami. Pełną listę zakresów i ich nazwy widoczne na ekranie sprawdź pod tym samym adresem, bo nazewnictwo na ekranie bywa zmieniane i przepisywanie go z pamięci prowadzi do sporu, czy dostęp faktycznie obejmuje to, co miał obejmować.

## Pośrednie: to łańcuch, a nie kolejny zakres

Uprawnienie pośrednie nie jest osobnym zakresem obok wystawiania i dostępu. Opisuje układ, w którym podmiot mający uprawnienie bezpośrednie z prawem dalszego przekazywania nadaje uprawnienie własnemu pracownikowi do pracy u swojego klienta. Innymi słowy: pośrednie mówi, skąd wzięło się uprawnienie danej osoby, a nie co jej wolno.

## Model biura rachunkowego w prawidłowej kolejności

Kolejność jest jedna i nie jest kwestią wygody:

1. Klient nadaje biuru, jako podmiotowi uprawnionemu, uprawnienie bezpośrednie do wystawiania faktur, do dostępu do faktur albo do obu tych rzeczy. Opcjonalnie z prawem dalszego przekazywania.
2. Dopiero biuro nadaje swoim pracownikom uprawnienia pośrednie do jednego klienta, do wybranych klientów albo do wszystkich swoich klientów.

Klient nie nadaje uprawnień pracownikom biura z osobna i nie musi znać ich nazwisk, żeby biuro mogło pracować. Samo podpisanie umowy o księgowość nie tworzy natomiast żadnego uprawnienia w systemie: dopóki krok pierwszy nie zostanie wykonany, biuro nie wystawi ani nie pobierze faktury.

Odwrócenie tej kolejności, czyli próba potraktowania biura jako „uprawnienia pośredniego od klienta", jest błędem. Nie chodzi o formalizm. Po takim ustawieniu nie da się rzetelnie odpowiedzieć na pytanie, kto dziś ma dostęp do faktur firmy, bo rejestr przestaje pokazywać, gdzie kończy się odpowiedzialność klienta, a zaczyna odpowiedzialność biura.

Osobno warto zapamiętać, gdzie się te operacje wykonuje. Od 1 lutego 2026 roku uprawnieniami i certyfikatami zarządza się w Aplikacji Podatnika KSeF 2.0 oraz przez interfejs programistyczny KSeF 2.0, czyli także w programie księgowym zintegrowanym z systemem. Wcześniejszy moduł przygotowawczy, uruchomiony 1 listopada 2025 roku, przestał być odrębnym miejscem pracy.

## Jak to wygląda w praktyce

Firma Kotwica sp. z o.o. współpracuje z biurem rachunkowym Liczydło. Właściciel nadaje biuru uprawnienie bezpośrednie do wystawiania i do dostępu do faktur, z prawem dalszego przekazywania. Biuro nadaje pośrednie uprawnienia dwóm swoim pracownicom: jedna obsługuje sprzedaż, druga zakupy. W rejestrze uprawnień Kotwicy widnieje jeden wpis: biuro Liczydło. Kto konkretnie z biura pracuje na dokumentach Kotwicy, wynika z uprawnień pośrednich nadanych po stronie biura.

Pół roku później Kotwica zmienia biuro i odbiera uprawnienie Liczydłu. Możliwość pracy obu pracownic dla Kotwicy zostaje dezaktywowana, chociaż ich uprawnienia pośrednie pozostają zapisane w systemie. Tu jest pułapka: firma widzi w rejestrze „odebrane biuru" i uznaje sprawę za zamkniętą, nie sprawdzając, którzy konkretni ludzie stracili przez to dostęp ani co dokładnie zostaje w rejestrze jako zapis historyczny.

Drugi wariant tego samego problemu jest gorszy: jeżeli ktoś w Kotwicy równolegle nadał uprawnienie bezpośrednie imiennie jednej z pracownic biura, odebranie uprawnienia samemu biuru tego wpisu nie ruszy. Dostęp zostaje, mimo że współpraca się skończyła.

## Co z tym zrobić w firmie

- Ustal jedną osobę po stronie firmy, która nadaje i odbiera uprawnienia, i zapisz, kto ją zastępuje. Uprawnienia właścicielskiego nikomu nie „przekażesz", więc zastępstwo trzeba zbudować z nadanych uprawnień do zarządzania uprawnieniami.
- Przed nadaniem uprawnienia biuru rozstrzygnij dwie rzeczy na piśmie: jaki zakres biuro dostaje i czy dostaje prawo dalszego przekazywania. Bez tego drugiego biuro nie obsadzi zastępstwa u siebie w czasie urlopu.
- Prowadź własną listę: komu i kiedy nadano uprawnienie, w jakim zakresie, kto to zatwierdził. System pokaże stan bieżący, ale nie odpowie na pytanie, dlaczego ktoś ten dostęp w ogóle dostał.
- Raz na kwartał przejrzyj rejestr uprawnień i porównaj go z listą aktywnych umów oraz z listą pracowników. Pytanie kontrolne brzmi: czy jest tu ktoś, kto już nie powinien tu być.
- Przy każdej zmianie po stronie biura, także zmianie osoby prowadzącej firmę, potwierdź u biura, kogo wpisało po swojej stronie. Klient nie widzi w systemie pośrednich uprawnień nadanych wewnątrz biura.

Spisanie tego jako ról, kroków i terminów, żeby działało niezależnie od tego, kto akurat jest w pracy, to osobna robota, którą porządkuje się procedurą.

## Źródła i data sprawdzenia

- Model uprawnień, biuro jako podmiot uprawniony, zakresy uprawnień, zgłoszenie pierwszej osoby uprawnionej: ksef.podatki.gov.pl/modul-certyfikatow-i-uprawnien-mcu/ (sprawdzono 24 sierpnia 2026)
- Zakres obowiązku i daty wejścia obowiązków: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/ (sprawdzono 24 sierpnia 2026)

## Najczęstsze pytania

### Jak nadać biuru rachunkowemu dostęp do KSeF?

Klient nadaje biuru jako podmiotowi uprawnienie bezpośrednie do wystawiania faktur, do dostępu do faktur albo do obu, opcjonalnie z prawem dalszego przekazywania. Dopiero potem biuro nadaje swoim pracownikom uprawnienia pośrednie. Robi się to w Aplikacji Podatnika KSeF 2.0 albo w programie księgowym zintegrowanym z KSeF.

### Czy trzeba nadawać uprawnienia KSeF każdej księgowej z biura osobno?

Nie, klient nie nadaje uprawnień pracownikom biura z osobna i nie musi znać ich nazwisk. Biuro dostaje uprawnienie jako podmiot, a swoim ludziom nadaje uprawnienia pośrednie, jeśli ma prawo dalszego przekazywania. Klient nie widzi w systemie uprawnień pośrednich nadanych wewnątrz biura, więc warto o nie pytać.

### Czy można dać komuś takie samo uprawnienie jak właściciel w KSeF?

Nie, uprawnienie właścicielskie jest systemowe, wynika z numeru identyfikacji podatkowej podatnika i nie nadaje się go drugiej osobie. Zaufanej osobie można natomiast nadać szerokie uprawnienie do zarządzania uprawnieniami i do pracy w systemie. Z takich nadanych uprawnień buduje się zastępstwo w firmie.

### Czy umowa z biurem rachunkowym wystarczy do pracy w KSeF?

Nie, samo podpisanie umowy o księgowość nie tworzy żadnego uprawnienia w KSeF. Dopóki klient nie nada biuru uprawnienia bezpośredniego, biuro nie wystawi ani nie pobierze faktury. Przed nadaniem warto ustalić na piśmie zakres uprawnienia i to, czy biuro dostaje prawo dalszego przekazywania.
