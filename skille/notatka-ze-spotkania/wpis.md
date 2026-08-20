---
nazwa: Notatka ze spotkania
kategoria: Biuro
status: gotowy
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Zamienia transkrypcję albo notatki z kartki w ustalenia, zadania z odpowiedzialnymi i terminy. Nie dopisuje niczego, czego na spotkaniu nie było.
szukaj: notatka, spotkanie, transkrypcja, minutki, podsumowanie, zadania, ustalenia, terminy, Teams, Meet, notatka zamiast protokołu
tytulSeo: Notatka ze spotkania z transkrypcji, po polsku, za darmo
opisSeo: Wklej transkrypcję albo notatki i dostań ustalenia, zadania i terminy. Rozumie polskie skróty i zwroty typu „po majówce”. Nie robi protokołów formalnych.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Bierze surowy materiał ze spotkania, transkrypcję z Teams, Meet czy Zooma, notatki napisane na szybko, wklejony czat, i porządkuje go w cztery osobne rzeczy: co ustalono, kto co ma zrobić i do kiedy, co zostało bez rozstrzygnięcia i co było tylko pomysłem.

To rozdzielenie jest najważniejsze. W surowym zapisie „zróbmy tak” i „można by tak zrobić” wyglądają tak samo, a znaczą zupełnie co innego. Przy każdym zadaniu widzisz dosłowny cytat, z którego ono wynika, więc od razu wiadomo, czy ktoś je przyjął, czy dostał zaocznie.

Na końcu dostajesz skróconą wersję gotową do wklejenia w mail.

## Dla kogo

Kierownicy biur, właściciele małych firm, project managerowie, asystentki zarządu, zespoły projektowe, biura rachunkowe, agencje. Każdy, kto po spotkaniu zostaje z zapisem na 30 stron albo z kartką pełną skrótów.

## Ile Ci to oszczędza

Przepisanie godzinnego spotkania na czytelną notatkę zajmuje zwykle 30-45 minut i tak kończy się pytaniami w stylu „to kto miał wysłać tę ofertę?”. Ze skillem to kilka minut, a pytania są wypisane osobno, zamiast wracać na kolejnym spotkaniu.

Drugi zysk jest mniej widoczny: notatka pokazuje, ile z tego, co ludzie zapamiętali jako ustalenia, ustaleniami nie było.

## Przykład z życia

Marta prowadzi biuro w firmie produkcyjnej. Spotkanie trwało 70 minut, było dziewięć osób, transkrypcja z Teams ma 34 strony.

Skill wyciąga z tego sześć ustaleń, jedenaście zadań i cztery sprawy bez rozstrzygnięcia. Pokazuje, że zamówienie na 12 400 zł zostało zaakceptowane, ale nikt nie powiedział, czy to netto czy brutto, przy stawce 23% to różnica prawie 2 900 zł. Że zadanie „Marek przygotuje zestawienie” padło z ust prezesa, a Marek w tym momencie w ogóle się nie odezwał, więc trafia na listę z dopiskiem „wskazany zaocznie, brak potwierdzenia”, który zostaje w notatce także po skróceniu do maila. I że przy terminie „do końca tygodnia” ustalonym na spotkaniu 2 czerwca proponuje środę 3 czerwca do potwierdzenia, bo czwartek to Boże Ciało, a w piątek pół firmy bierze urlop, proponuje, nie rozstrzyga.

Trzy rzeczy, które wszyscy zapamiętali jako ustalone, trafiają do sekcji „Pomysły”, bo padły w trybie „można by”.

## Jak po polsku

Wartość siedzi w tym, jak naprawdę mówi się na polskich spotkaniach.

Skill czyta sygnały gramatyczne, których nie ma w narzędziach tłumaczonych z angielskiego: tryb przypuszczający („zrobiłoby się”, „warto byłoby”, „trzeba by”) prawie zawsze oznacza pomysł, nie decyzję. Wie, że „zobaczymy”, „pomyślimy” i „wrócimy do tematu” to w polskim biurze uprzejme odłożenie sprawy, a nie zgoda, automat obcojęzyczny zapisuje to jako decyzję.

Rozszyfrowuje polskie terminy nieostre: „po majówce”, „przed świętami”, „na dniach”, „do 15.”, „na koniec miesiąca”. Zna kalendarz dni wolnych na 2026 rok, w tym Wigilię, która jest dniem ustawowo wolnym, a wiele osób nadal umawia się „na 24 grudnia”. Wie, że w 2026 majówka jest krótka, a piątek po Bożym Ciele to dzień masowych urlopów. Datę zawsze podaje jako propozycję do potwierdzenia, nigdy jako rozstrzygnięcie.

Rozumie skróty, które w polskim biurze pisze się bez zastanowienia, FV (faktura VAT), WZ i PZ (wydanie i przyjęcie zewnętrzne), UoP (umowa o pracę), UZ (umowa zlecenia), JDG (jednoosobowa działalność gospodarcza), KSeF (krajowy system e-faktur), MPP (podzielona płatność), L4 (zwolnienie lekarskie), dot., ws., ds., br. (bieżącego roku), z-ca, p.o., DW (do wiadomości). Odmienia imiona z powrotem do mianownika, żeby „przekaż Ance”, „u Marka” i „dla Oli” nie zrobiły trzech różnych osób z jednej. I zawsze pyta o netto czy brutto, bo przy polskim VAT to nie jest szczegół redakcyjny.

## Czego potrzebujesz

Dowolny płatny plan Claude i materiał ze spotkania **w formie tekstu**, transkrypcja, plik tekstowy, PDF, zdjęcie notatek albo zwykły wklejony tekst. Nic poza tym: żadnych konektorów, żadnego podpinania kalendarza, żadnej konfiguracji.

Skill nie przyjmuje plików audio ani wideo. Nagranie z Teams, Meet czy dyktafonu trzeba najpierw przepisać na tekst, Teams i Meet robią to same, wystarczy pobrać transkrypcję i ją wkleić.

## Na czym się wywala

- **Transkrypcja automatyczna myli polskie nazwiska i liczby.** Skill nie ma nagrania i nie sprawdzi, czy „pani Kowalska” to na pewno Kowalska, ani czy padło „czternaście” czy „czterdzieści”. Fragmenty, które brzmią niepewnie, przepisze dosłownie i wypisze jako pytania, ale nie naprawi ich za Ciebie.
- **Nie odróżni ironii od zobowiązania.** „Jasne, zrobię to na wczoraj” w polskim biurze prawie zawsze znaczy coś przeciwnego. Skill wrzuci taką wypowiedź do pytań, zamiast zgadywać, czasem niepotrzebnie, czasem za późno.
- **Spotkanie bez decyzji da prawie pustą notatkę.** To jest poprawny wynik, ale użytkownicy przychodzą po listę zadań i bywają rozczarowani, gdy dostają zdanie „nie zapadło żadne rozstrzygnięcie”.
- **Nie rozwinie Twoich prywatnych skrótów.** „Zb., of. do pt.” zostanie tak, jak jest. Bez klucza nie ma jak zgadnąć, kto to Zb.
- **Rozmowa, w której wszyscy mówią naraz, gubi autorstwo.** W transkrypcji z przerywaniem często nie da się ustalić, kto komu przypisał zadanie. Skill to oznaczy, ale nie odtworzy.
- **Nie wie, co było wcześniej.** „Ten temat z zeszłego tygodnia” zostanie zapisany dosłownie, bez domyślania się, o co chodziło.
- **Nie przyjmie nagrania.** Plik audio ani wideo nie wejdzie, potrzebna jest transkrypcja albo tekst. Jeśli wrzucisz nagranie z Teams, skill poprosi o przepisanie go najpierw na tekst.
- **Kalendarz dni wolnych jest aktualny na 2026 rok.** Poza tym rokiem skill nie przelicza świąt ruchomych, Wielkanoc, Poniedziałek Wielkanocny, Zielone Świątki i Boże Ciało wypadają co roku kiedy indziej. Przy spotkaniu z innego roku poda datę z dopiskiem, że dni wolnych nie sprawdzał. Święta o stałej dacie (1 i 6 stycznia, 1 i 3 maja, 15 sierpnia, 1 i 11 listopada, 24-26 grudnia) sprawdza zawsze.
- **Dni wolne liczy po biurowemu.** Przy pracy zmianowej i w ruchu ciągłym Boże Ciało czy Wigilia bywają dniami roboczymi. Skill dopisze pytanie, ale nie zna Twojego grafiku.

## Czego ten skill nie robi celowo

Nie dopisuje ustaleń, których w materiale nie ma. Nie zamienia „zobaczymy” w decyzję, ani „no dobra”, „chyba tak” czy „jak nie ma innego wyjścia”; to wszystko ląduje w sprawach bez rozstrzygnięcia, z cytatem i pytaniem. Nie przypisuje zadania osobie, która go nie przyjęła, zapisuje je z adnotacją, że wskazano ją zaocznie, i ta adnotacja zostaje także w skróconej wersji do maila. Nie zamienia nieostrego terminu na konkretną datę bez pytania. Nie ocenia ludzi, ich przygotowania ani tonu wypowiedzi.

Nie dopisuje też do notatki reguł, których na spotkaniu nie było. Żadnego „uwagi do końca dnia, potem notatka obowiązuje”, termin na uwagi pojawia się wtedy i tylko wtedy, gdy ktoś go na spotkaniu wypowiedział. Dokument, o którym sam piszesz, że może zawierać błędy, nie może w tym samym zdaniu ogłaszać się wiążącym.

Nie pisze protokołów formalnych: rady pedagogicznej, zebrania wspólnoty mieszkaniowej, zgromadzenia wspólników, sesji rady gminy, protokołu odbioru. Przy tych pierwszych wymogi co do treści i podpisów są narzucone z góry, przy protokole odbioru biorą się z umowy, w obu wypadkach pomyłka ma skutki wykraczające poza nieporozumienie w zespole. Skill powie o tym wprost i zaproponuje notatkę roboczą, którą protokolant przepisze do własnego wzoru. Jeśli poprosisz drugi raz, o sam nagłówek, listę obecności albo miejsce na podpisy, odmówi tak samo.

Nie robi notatki służbowej opisującej zachowanie konkretnego pracownika. To inny dokument, który bywa używany w sporze, i nie powinien powstawać jako produkt uboczny podsumowania spotkania.

Powód jest jeden i praktyczny: notatka rozesłana po spotkaniu zaczyna żyć jak zapis zobowiązań. Narzędzie, które dla gładkości dopisuje jedno zdanie, tworzy komuś zadanie, na które ta osoba się nie umówiła, i wychodzi to dopiero przy terminie.
