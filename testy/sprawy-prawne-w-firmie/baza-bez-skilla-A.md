Macie dwie osobne sprawy, które łatwo pomieszać: **spór z klientem o pieniądze** (86 100 zł, wady, kara umowna) i **problem z programistą** (prawa do kodu, odejście do klienta). Zacznijcie od zabezpieczenia dokumentów, bo od nich zależy prawie wszystko. Poniżej ogólny plan, nie opinia prawna. Przy takiej kwocie i takim ryzyku wydajecie jedną konsultację u adwokata lub radcy od IT i umów (1-2 godziny pracy z umowami w ręku), zanim wyślecie cokolwiek do klienta.

## 1. Co zrobić w ciągu 48 godzin

- **Zbierzcie dokumenty w jednym miejscu:**
  - umowa z klientem z aneksami, załącznikami i specyfikacją,
  - protokoły odbioru (albo ich brak),
  - wszystkie zgłoszenia wad, maile i tickety klienta,
  - faktury (z KSeF) i potwierdzenia wysyłki,
  - umowa B2B z programistą, ewentualne NDA, regulamin dostępów,
  - jego wiadomość o odejściu (zachowajcie oryginał, zrzut ekranu to za mało).
- **Nie piszcie nic emocjonalnego** ani do klienta, ani do programisty. Każda wiadomość to potem dowód.
- **Nie blokujcie systemu klientowi** i nie wyłączajcie mu dostępu bez sprawdzenia umowy. To częsty błąd software house'ów i prosta droga do własnej odpowiedzialności.
- **Zabezpieczcie repozytorium:** pełna kopia, lista dostępów, kto ma uprawnienia administracyjne, zmiana haseł i kluczy, które zna programista (bez wyrzucania go z pracy dzisiaj, jeśli prowadzi coś krytycznego).

## 2. Spór z klientem

### Należności (86 100 zł brutto, czyli 70 000 zł netto)

- To **transakcja handlowa między przedsiębiorcami**, więc stosuje się ustawę o przeciwdziałaniu nadmiernym opóźnieniom w transakcjach handlowych. Bez żadnego zapisu w umowie należą się Wam:
  - **odsetki ustawowe za opóźnienie w transakcjach handlowych** od dnia po terminie każdej faktury (stawkę sprawdźcie w aktualnym obwieszczeniu Ministra Finansów),
  - **rekompensata za koszty odzyskiwania** za każdą fakturę: 40, 70 lub 100 euro zależnie od wartości faktury (do 5 000 zł, do 50 000 zł, powyżej), przeliczana na złote według zasad z ustawy. Przy trzech fakturach po ok. 28 700 zł wyjdzie 3 x 70 euro, ale zależy to od faktycznego podziału kwot.
- Terminy minęły 20 sierpnia, 20 września i 20 października 2026, więc wszystkie trzy faktury są wymagalne.
- **Przedawnienie** (zwykle 3 lata, liczone do końca roku kalendarzowego) Wam nie grozi. Nie ma pośpiechu prawnego, jest pośpiech finansowy.

### Zarzut wad systemu

- Samo "system ma wady" **nie zwalnia klienta z zapłaty**. Znaczenie mają fakty i umowa:
  - czy był **protokół odbioru** i czy klient zgłosił zastrzeżenia w terminie,
  - czy wady zgłaszał **wcześniej**, czy dopiero po terminie płatności (to ważny sygnał, że wada jest pretekstem),
  - czy wady są **istotne** (system nie działa) czy kosmetyczne (lista życzeń),
  - jak umowa nazywa się prawnie: **umowa o dzieło**, o świadczenie usług czy mieszana. Od tego zależą terminy zgłaszania wad i uprawnienia klienta (odstąpienie, obniżenie wynagrodzenia, usunięcie wad).
- Klient nie może jednostronnie "obniżyć" ceny bez podstawy w umowie lub w oświadczeniu zgodnym z przepisami. Może zgłosić **potrącenie**, więc spodziewajcie się oświadczenia o potrąceniu z karą umowną.
- Ruch dla Was: **pisemnie zażądajcie dokładnej listy wad** z opisem, datą stwierdzenia i krokami do odtworzenia, i zaproponujcie termin na naprawę. To buduje Waszą pozycję w sądzie: pokazujecie, że chcieliście usunąć wady, a klient nie chce płacić ani współpracować.

### Kara umowna 0,3 % dziennie z § 9 bez limitu

Tu jest najwięcej do sprawdzenia, bo opis "kara za opóźniony odbiór" brzmi dziwnie. Odbiór to zazwyczaj obowiązek **klienta**, a nie Wasz. Sprawdźcie:

- **kto jest zobowiązany** według § 9 (Wy za opóźnienie w wydaniu do odbioru, czy klient za zwłokę w odbiorze),
- **od czego liczona jest kara** (od wartości całej umowy, od faktury, od wynagrodzenia za etap),
- **co dokładnie jest zdarzeniem** (przekroczenie terminu dostarczenia, a nie odbioru),
- **czy opóźnienie nastąpiło z Waszej winy**, czy z powodu klienta (brak danych, brak dostępów, niezgłoszone zmiany zakresu, odwlekanie testów akceptacyjnych). Kara umowna należy się tylko, gdy dłużnik odpowiada za niewykonanie lub nienależyte wykonanie,
- **czy klient w ogóle wezwał Was do zapłaty** i jak to wyliczył (nota obciążeniowa to nie jest podstawa prawna sama w sobie).

Argumenty obronne, jeśli kara jednak ma podstawę:

- **Miarkowanie kary (art. 484 § 2 Kodeksu cywilnego)**: sąd może ją zmniejszyć, gdy jest rażąco wygórowana albo zobowiązanie zostało w znacznej części wykonane. 0,3 % dziennie to ok. 110 % w skali roku. Przykład skali: przy wartości 100 000 zł to 300 zł dziennie, po 30 dniach 9 000 zł, a po ok. 333 dniach kara dochodzi do 100 % wartości, i to **bez żadnego limitu**. To klasyczny argument o rażącym wygórowaniu. Miarkowania sąd dokonuje na **Wasz wniosek**, więc trzeba o nie wyraźnie wnosić w odpowiedzi na wezwanie i w sądzie.
- **Brak szkody** to nie jest argument sam w sobie (kara umowna należy się niezależnie od szkody), ale jest argumentem **przy miarkowaniu**.
- **Zwłoka po stronie klienta** (art. 476 i 483 KC): jeśli sam ją spowodował, nie może jej karać.

**Nie przyznawajcie nic na piśmie.** Odpowiedź na naliczenie kary powinna brzmieć: "Zakwestionowaliśmy zasadność, wymagamy szczegółowego wyliczenia i wskazania podstawy, a w razie konieczności wnosimy o miarkowanie".

## 3. Wezwanie do zapłaty (pierwszy konkretny krok)

Jedno pismo zbiorcze, wysłane **listem poleconym i mailem** (na adres z umowy i z KRS), z:

- wyszczególnieniem trzech faktur, kwot i terminów,
- żądaniem zapłaty w **7 dni** (ew. 5 dni roboczych),
- doliczeniem **odsetek za opóźnienie w transakcjach handlowych** i **rekompensaty** za każdą fakturę,
- **odrzuceniem zarzutu wad** (lub wskazaniem, że procedura zgłaszania wad wg umowy nie została zachowana) i **prośbą o szczegółową listę**,
- **odrzuceniem kary umownej** oraz zastrzeżeniem o miarkowaniu,
- **zapowiedzią kroków**: pozew, ewentualnie wpis do rejestru dłużników,
- **ostrzeżeniem** o wstrzymaniu dalszych prac na podstawie art. 490 KC (wstrzymanie własnego świadczenia, gdy druga strona nie płaci), o ile umowa nie mówi inaczej. Najpierw sprawdźcie umowę: SLA i utrzymanie mogą ograniczać prawo wstrzymania.

Bez gróźb karnych i bez publicznego "pranie brudów". Groźba ujawnienia długu albo wszczęcia postępowania karnego w celu wymuszenia zapłaty może obrócić się przeciwko Wam.

## 4. Co dalej, jeśli klient nie zapłaci

- **Rejestr dłużników (BIG, KRD):** zgłoszenie możliwe, gdy dług ma co najmniej 500 zł, jest wymagalny co najmniej 30 dni i dłużnik dostał wezwanie z ostrzeżeniem co najmniej 14 dni wcześniej. **Uwaga:** wierzytelność musi być **bezsporna**. Skoro klient twierdzi, że są wady i nalicza karę, zgłoszenie może okazać się bezpodstawne i narazić Was na roszczenia za naruszenie dóbr osobistych. Zdecydujcie to z prawnikiem.
- **Pozew:** sprawa gospodarcza o zapłatę.
  - **E-sąd (elektroniczne postępowanie upominawcze)** jest tańszy (opłata ok. 1,25 % wartości, czyli ok. 1 100 zł), ale klient po zgłoszeniu sprzeciwu i tak prowadzi sprawę w zwykłym trybie. Przy zarzutach wad sprzeciw jest niemal pewny.
  - **Zwykłe postępowanie:** opłata ok. 5 % wartości sporu, czyli ok. 4 300 zł. Wygrywający odzyskuje koszty, w tym zastępstwo procesowe według stawek minimalnych. To ok. 5 400 zł przy takiej wartości, ale kwoty sprawdźcie, bo zależą od aktualnych rozporządzeń i opłat.
- **Ugoda** jest często najlepszym wyjściem: naprawa konkretnych wad w terminie, zapłata (ew. w ratach), wzajemne zrzeczenie się kary umownej i dalszych roszczeń. W ugodzie uregulujcie też **prawa do kodu** i **zakaz podbierania pracowników**.
- **Mediacja** przy sądzie jest tania i często skuteczna.

## 5. Księgowość i podatki (zapytajcie księgową teraz)

- **Ulga na złe długi (VAT i CIT):** po 90 dniach od terminu płatności faktury można, przy spełnieniu warunków, skorygować podstawę opodatkowania i podatek należny. Dla pierwszej faktury (termin 20 sierpnia) 90 dni upływa około 18 listopada 2026. Warunki (m.in. status dłużnika jako czynnego podatnika VAT, brak zbycia wierzytelności) sprawdzi księgowa. Jeśli klient później zapłaci, trzeba to odkręcić.
- **Rezerwa / odpis** na nieściągalną wierzytelność: też do księgowej.
- Ustawcie **monitoring**: kto, kiedy i jak pilnuje terminów płatności w przyszłości.

## 6. Programista na B2B

### Prawa autorskie do kodu (najważniejsze)

- **Prawa majątkowe do kodu pisanego przez współpracownika B2B NIE przechodzą na Was automatycznie.** Automatycznie przechodzą tylko przy **umowie o pracę** (art. 74 ustawy o prawie autorskim). Przy B2B potrzebna jest **pisemna umowa przenosząca prawa** (pod rygorem nieważności), z **wymienionymi polami eksploatacji**.
- Sprawdźcie umowę z nim:
  - czy jest klauzula o przeniesieniu praw autorskich majątkowych (a nie samej licencji),
  - czy wymienia pola eksploatacji,
  - czy obejmuje **cały kod** powstały w trakcie współpracy,
  - czy ma **prawa zależne** i **zgodę na zmiany**,
  - czy jest wyłączenie jego wcześniejszych własnych bibliotek (preexisting IP), które mogą być jego,
  - czy są kary za naruszenie i NDA.
- **Jeśli takiej klauzuli nie ma**, to realne ryzyko, że autorem i właścicielem praw jest on, a Wy macie najwyżej licencję dorozumianą, niewyłączną. To bardzo osłabia Waszą pozycję wobec klienta, bo Wy z kolei musicie przenieść prawa **na klienta** (łańcuch praw).
- Co zrobić w takim przypadku: **spokojna rozmowa i podpisanie aneksu** (cesja praw za wynagrodzeniem albo uregulowaniem rozliczenia), zanim odejdzie. Po odejściu jego pozycja negocjacyjna jest silniejsza.
- "Zabiera swój kod" bywa **pustą groźbą** (jeśli macie cesję) albo **realnym problemem** (jeśli nie). To trzeba sprawdzić w pierwszej kolejności.

### Ryzyko przekwalifikowania na stosunek pracy

- Pracuje u Was 3 lata, codziennie 8-16, w biurze, na Waszym sprzęcie, tylko dla Was. To **klasyczne cechy stosunku pracy** (podporządkowanie, miejsce, czas, narzędzia). Ryzyko, że sąd lub PIP uzna umowę za pozorną, jest istotne (składki ZUS, podatki, urlopy, kary).
- To działa w obie strony. Jeśli doszłoby do przekwalifikowania, argumentowalibyście, że prawa do kodu przeszły na Was z mocy ustawy, ale **nie budujcie na tym strategii** i nie piszcie o tym do niego. Taka linia obrony oznacza przyznanie, że umowa B2B jest pozorna, z wszystkimi skutkami.
- Przy tej sytuacji **nie wyciągajcie wniosków na piśmie** i omówcie to z prawnikiem.

### Odejście do klienta

- Sprawdźcie umowę B2B:
  - **okres wypowiedzenia** i formę (czy jego wiadomość jest skutecznym wypowiedzeniem),
  - **zakaz konkurencji** (w trakcie współpracy jest uzasadniony, po jej zakończeniu ważność zależy od zapisów i wynagrodzenia, więc trzeba to ocenić indywidualnie),
  - **zakaz podbierania** lub nawiązywania współpracy z klientami,
  - **NDA** i tajemnica przedsiębiorstwa.
- Wykorzystanie Waszej tajemnicy przedsiębiorstwa (kod, architektura, ceny, know-how) przy przejściu do klienta może być **czynem nieuczciwej konkurencji** (ustawa o zwalczaniu nieuczciwej konkurencji). To podstawa do roszczeń, ale wymaga dowodów, że coś zabrał lub wykorzystał.
- **Teraz zróbcie:**
  - ustalcie datę końca współpracy (na piśmie),
  - **protokół przekazania** prac, dostępów, dokumentacji,
  - **zwrot sprzętu** i odebranie dostępów w dniu zakończenia,
  - **oświadczenie o braku kopii kodu i danych** oraz o usunięciu danych klientów,
  - **audyt repozytoriów** (ostatnie commity, nietypowe klonowania i eksporty, które mogły się zdarzyć) bez oskarżeń.
- **RODO:** jeśli miał dostęp do danych osobowych (Waszych albo Waszych klientów), potrzebne jest zobowiązanie do poufności i usunięcie kopii. Przy przejściu do klienta (który może mieć dane w tym samym systemie) szczególnie ważne.
- **Bądźcie ostrożni z podejrzeniami o zmowę** (klient nie płaci, a Wasz programista do niego odchodzi). Zachowajcie fakty i daty, ale oskarżeń nie formułujcie bez dowodów. Zapytajcie prawnika, jak ułożyć kolejność działań wobec obu stron.

## 7. Kolejność działań

1. **Dzień 1-2:** zebranie dokumentów, sprawdzenie umowy z klientem (§ 9, odbiór, wady, prawa autorskie, warunek przejścia praw po zapłacie) i umowy z programistą (cesja, NDA, wypowiedzenie), zabezpieczenie repozytorium.
2. **Dzień 2-3:** konsultacja z prawnikiem (umowy w ręku, lista pytań z tego dokumentu).
3. **Dzień 3-5:** rozmowa z programistą i aneks o przeniesieniu praw (jeśli brakuje), ustalenie daty odejścia i przekazania.
4. **Dzień 5-7:** wezwanie do zapłaty do klienta z żądaniem listy wad, odrzuceniem kary i zastrzeżeniem miarkowania.
5. **Po 7-14 dniach:** rozmowy ugodowe albo pozew, ewentualnie wpis do rejestru dłużników (tylko po ocenie, czy dług jest bezsporny).
6. **Równolegle:** księgowa (ulga na złe długi, termin ok. 18 listopada).

## 8. Czego nie robić

- Nie przyznawać wad ani kary na piśmie ("przepraszamy za opóźnienie").
- Nie wyłączać klientowi systemu bez analizy umowy i uprzedzenia.
- Nie grozić klientowi ani programiście karnie.
- Nie publikować informacji o długu ani sporze (dobra osobiste, nieuczciwa konkurencja).
- Nie kasować wiadomości, logów ani commitów.
- Nie zostawiać sprawy programisty "na później": każdy dzień po jego odejściu pogarsza Waszą pozycję.

## 9. Co musicie ustalić, żeby ruszyć dalej

- Co dokładnie mówi **§ 9** umowy (kto płaci karę, od czego, za co) i czy była dostawa, odbiór lub brak odbioru z datą.
- Czy są **protokoły odbioru** i **zgłoszenia wad** z datami.
- Jak brzmią zapisy o **prawach autorskich**, **warunku zapłaty** przed przejściem praw, **SLA** i wstrzymaniu usług.
- Czy umowa z programistą ma **cesję praw**, **NDA**, **zakaz konkurencji**, **okres wypowiedzenia**.
- Czy klient wysłał formalne **oświadczenie o potrąceniu** albo notę obciążeniową.

Jeśli przyślecie mi fragmenty tych umów (bez danych wrażliwych), mogę wskazać konkretne zapisy do sprawdzenia i zredagować wezwanie do zapłaty. Pamiętajcie, że ostatecznie ocenę umów i strategię sporu powinien potwierdzić prawnik.
