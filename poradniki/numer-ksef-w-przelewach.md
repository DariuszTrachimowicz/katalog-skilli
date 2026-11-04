---
tytul: Numer KSeF w przelewach od 2027 roku: kiedy i co wpisać
opis: Od kiedy podaje się numer KSeF w tytule przelewu, kogo obejmuje ten obowiązek, po co jest identyfikator zbiorczy i kiedy numeru nie ma.
zajawka: Od kiedy i przy jakich płatnościach trzeba podać numer KSeF w tytule przelewu oraz co ustalić w firmie zawczasu.
data: 2026-08-24
dataSlownie: 24 sierpnia 2026
temat: KSeF
skill: ksef-procedury
kolejnosc: 12
---

Po dziale księgowości i po forach krąży zdanie, że „do przelewów trzeba będzie wpisywać numer KSeF", i zwykle bez daty. Efekt jest taki, że jedne firmy zaczynają wpisywać go z wyprzedzeniem i przy wszystkim, a inne nie robią nic i zostawiają sobie tę zmianę na ostatni tydzień. Poniżej jest data, zakres tego obowiązku i lista ustaleń, które trzeba zrobić w firmie wcześniej, bo dotyczą programu i ludzi, a nie samego przelewu.

## Data jest jedna: 1 stycznia 2027 roku

Obowiązek podawania numeru KSeF w tytule płatności zaczyna się 1 stycznia 2027 roku. Wcześniej go nie ma. Dotyczy to również płatności realizowanych w mechanizmie podzielonej płatności: przed tą datą także tam obowiązku nie ma.

Jeżeli ktoś w firmie powołuje się na wcześniejszą datę w tym obszarze, na przykład na sierpień 2026 roku, to jest pomyłka i nie należy jej przenosić do żadnej instrukcji wewnętrznej. Pilne przerabianie tytułów przelewów w 2026 roku jest pracą wykonaną za wcześnie, a przy okazji utrwala złą regułę, bo firmy wpisujące numer „na próbę" zwykle wpisują go wszędzie.

To nie znaczy, że nie ma nic do zrobienia. Robota, którą warto wykonać wcześniej, jest po stronie ustaleń i programu, a nie po stronie wpisywania czegokolwiek w tytuł przelewu.

## Kogo i czego to dotyczy

Zakres obowiązujący od 1 stycznia 2027 roku ma kilka warunków, które muszą wystąpić razem.

- Płacący jest czynnym podatnikiem podatku od towarów i usług.
- Płaci innemu czynnemu podatnikowi tego podatku.
- Płaci za fakturę ustrukturyzowaną albo za fakturę wystawioną w trybie offline24 lub w okresie niedostępności systemu, która po przesłaniu otrzymała numer KSeF.
- Płaci przelewem albo innym instrumentem pozwalającym podać tytuł płatności.

Wtedy w tytule płatności podaje się numer KSeF. Obejmuje to również mechanizm podzielonej płatności oraz określone płatności dokonywane przez osoby trzecie i polecenie zapłaty.

Warto przeczytać tę listę od drugiej strony, bo tam leży najczęstszy błąd. Obowiązek nie obejmuje dosłownie każdej płatności, każdego nabywcy ani każdej faktury. Zdanie „przy każdej płatności podajemy numer KSeF", wpisane do instrukcji firmowej, jest błędem: rozciąga obowiązek na sytuacje, w których go nie ma, i zamienia go w regułę, której nie da się wykonać, na przykład tam, gdzie nie ma pola na tytuł płatności albo gdzie po drugiej stronie nie ma czynnego podatnika.

Jest też sytuacja, w której numeru KSeF po prostu nie ma i nie będzie. Faktury wystawione w czasie ogłoszonej awarii całkowitej systemu wystawia się poza systemem i nie przesyła się ich do niego później, więc nie otrzymują numeru KSeF. Obowiązek podawania numeru w tytule płatności takich faktur nie obejmuje. To nie jest scenariusz egzotyczny i instrukcja firmowa musi go rozstrzygać wprost, bo inaczej ktoś w dziale płatności zablokuje przelew, szukając numeru, którego nie ma.

Podobnie z zaliczką, która nie została jeszcze udokumentowana fakturą: nie ma numeru KSeF do podania, bo faktura jeszcze nie powstała.

## Identyfikator zbiorczy, czyli płatność za kilka faktur naraz

Firmy rzadko płacą kontrahentowi za jedną fakturę. Przy płatności za więcej niż jedną fakturę objętą tym zakresem stosuje się identyfikator zbiorczy.

Jedna rzecz jest tu kluczowa: identyfikator zbiorczy generuje system dla zbioru faktur. Nie jest to identyfikator wymyślony przez firmę, nie jest to numer paczki z programu księgowego ani numer zestawienia z arkusza. Jeżeli ktoś w firmie zaproponuje „własny format" na zbiorcze przelewy, jest to pomysł do odrzucenia na etapie ustalania zasad, a nie do odkrycia przy pierwszym przelewie w 2027 roku.

## Jak to wygląda w praktyce

Hurtownia Rzepień płaci swojemu dostawcy raz w tygodniu, w piątek, za wszystkie faktury z danego tygodnia. W styczniu 2027 roku w tygodniowej paczce są cztery faktury: trzy ustrukturyzowane z numerami KSeF i jedna wystawiona przez dostawcę w trybie offline24, przesłana do systemu następnego dnia roboczego i również z nadanym numerem.

Wszystkie cztery mieszczą się w zakresie, więc płatność jednym przelewem wymaga identyfikatora zbiorczego wygenerowanego przez system, a nie wypisania czterech numerów w tytule ani numeru zestawienia z programu.

Miesiąc później trafia się piąta faktura, wystawiona przez dostawcę w czasie ogłoszonej awarii całkowitej. Ta faktura nie ma numeru KSeF i nigdy go nie dostanie. Osoba realizująca przelewy wie z instrukcji, że taką fakturę wyłącza się z tej reguły, opłaca osobno i odnotowuje powód, zamiast wstrzymywać płatność do wyjaśnienia.

## Co ustalić w firmie zawczasu

- Ustal, kto w firmie realizuje przelewy i skąd bierze numer KSeF faktury. To pytanie o przepływ danych między programem księgowym a bankowością, nie o dobrą wolę osoby płacącej.
- Zapytaj dostawcę programu księgowego i bank, jak u nich wygląda przenoszenie numeru KSeF do tytułu płatności i jak generuje się oraz pobiera identyfikator zbiorczy przy płatności za kilka faktur. Zachowanie konkretnego programu potwierdza się u dostawcy, bo to kwestia jego implementacji, a nie treści przepisów.
- Napisz regułę w formie warunków, nie w formie „zawsze". Instrukcja ma odpowiadać na pytanie, kiedy numer się podaje, a kiedy nie, i wskazywać przypadki bez numeru: faktury pozostające bez numeru wskutek awarii całkowitej oraz zaliczki jeszcze nieudokumentowane fakturą.
- Ustal, co robi osoba płacąca, gdy numeru nie ma na dokumencie: do kogo się zgłasza, w jakim terminie i czy wstrzymuje płatność. Brak tej ścieżki jest głównym źródłem opóźnionych przelewów w pierwszych tygodniach po zmianie.
- Nie wprowadzaj tej reguły wcześniej niż od 1 stycznia 2027 roku, ale przetestuj przepływ danych wcześniej, na dokumentach, które numer KSeF już mają.

Sprawy ujęcia płatności w rozliczeniu, stawek i odliczeń zostaw księgowej albo doradcy podatkowemu, bo to osobna decyzja niż sposób opisania przelewu. Spisanie samych zasad opisywania płatności jako listy warunków i wyjątków, z osobami odpowiedzialnymi, to osobna robota, którą porządkuje się procedurą.

## Źródła i data sprawdzenia

- Numer KSeF i identyfikator zbiorczy w płatnościach, zakres obowiązku od 1 stycznia 2027 roku: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/ (sprawdzono 24 sierpnia 2026)
- Tryby pracy bez dostępu do systemu i skutki awarii całkowitej: ksef.podatki.gov.pl/wyjasnienia/co-warto-wiedziec-przed-startem-ii-etapu-wdrozenia-krajowego-systemu-e-faktur/ (sprawdzono 24 sierpnia 2026)
- Tryb offline24 i termin przesłania faktury do systemu: ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/ (sprawdzono 24 sierpnia 2026)
- Zachowanie programu do fakturowania i bankowości: dostawca programu, kanał wsparcia (potwierdź u dostawcy)

## Najczęstsze pytania

### Od kiedy trzeba wpisywać numer KSeF w tytule przelewu?

Obowiązek podawania numeru KSeF w tytule płatności zaczyna się 1 stycznia 2027 roku. Wcześniej go nie ma, także przy mechanizmie podzielonej płatności. Przed tą datą warto przygotować ustalenia i przepływ danych między programem księgowym a bankowością, zamiast wpisywać numer w przelewy na próbę.

### Czy numer KSeF trzeba podawać przy każdym przelewie?

Nie, obowiązek dotyczy płatności, w których kilka warunków występuje razem. Czynny podatnik VAT płaci innemu czynnemu podatnikowi VAT za fakturę ustrukturyzowaną albo za fakturę z trybu offline24 lub okresu niedostępności, która dostała numer KSeF, przelewem albo innym instrumentem pozwalającym podać tytuł płatności.

### Jak zapłacić jednym przelewem za kilka faktur z KSeF?

Przy płatności za więcej niż jedną fakturę objętą obowiązkiem stosuje się identyfikator zbiorczy. Generuje go system dla zbioru faktur, więc nie jest to numer paczki z programu księgowego ani własny format firmy. Jak program i bank przenoszą taki identyfikator do przelewu, potwierdź u ich dostawców.

### Co zrobić z przelewem, gdy faktura nie ma numeru KSeF?

Faktury bez numeru KSeF wskutek ogłoszonej awarii całkowitej nie są objęte obowiązkiem podawania numeru w tytule płatności. Podobnie zaliczka jeszcze nieudokumentowana fakturą nie ma numeru do podania. Instrukcja firmowa powinna wskazywać takie przypadki wprost, żeby nikt nie wstrzymywał przelewu w poszukiwaniu numeru, którego nie ma.
