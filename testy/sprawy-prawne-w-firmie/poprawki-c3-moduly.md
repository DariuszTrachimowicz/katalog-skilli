# Poprawki modułów po recenzji Codeksa, cykl 3 (6.11.2026)

Zakres: wyłącznie `skille/sprawy-prawne-w-firmie/references/moduly/*.md`. Źródła uwag: codex-c3-ekspert1, ekspert2, ekspert3 i granice. Każdą uwagę sprawdzono w całym artykule w `references/akty/<SKRÓT>.md`; akty niewbudowane (RODO, ustawa z 4.11.2022 Dz.U. 2022 poz. 2337, komunikat UdSC) odczytane w sieci 6.11.2026. Numer linii to linia z recenzji, czyli stan przed poprawkami.

Wynik: 30 uwag do moduly/ (w tym 2 blokery i 3 kosmetyczne): PRZYJĘTE 29, CZĘŚCIOWO 1, ODRZUCONE 0.

`sprawdz-cytaty.py`: cytowań 1657, błędnych 0, plików 17. Pauzy i półpauzy w moduly/: 0 w każdym z 13 plików.

## Pominięte (pliki spoza moduly/, poza zakresem tego zlecenia)
- pisma.md:77 (odstępne umowne i jego zapłata, KC art. 396), pisma.md:85 i mapa-spraw.md:71 (odwołanie od decyzji UOKiK do SOKiK, UOKIK art. 81 ust. 1-2), pisma.md:65 (pierwszeństwo przepisów szczególnych przed terminem 14 dni).
- SKILL.md:52 (reguła „do potwierdzenia” także przy statusie „otwarte częściowo”; w module poprawiono tylko wiersz marka:138, zob. niżej).
- narzedzia/akty.py:281 (spójność `akty-stan.json` i `SPIS.md` przy błędzie pobrania kolejnego aktu).

## Blokery
- najem-lokalu-firmowego.md:58, PRZYJĘTA. Pkt 25: wypowiedzenie bez terminów wyłączone, gdy najemca znał wady przy zawarciu umowy, z odesłaniem do wyjątku zdrowotnego w pkt 26; wzór wezwania (pkt 3 w sekcji pism, :107): zapowiedź wypowiedzenia tylko przy wadzie nieznanej przy zawarciu, a przy znanej wyłącznie przy zagrożeniu zdrowia (KC art. 664 § 3: „uprawnienie do niezwłocznego wypowiedzenia najmu nie przysługuje najemcy, jeżeli w chwili zawarcia umowy wiedział o wadach”; KC art. 682: „chociażby w chwili zawarcia umowy wiedział o wadach”).
- umowy-wlasne-firmy.md:73, PRZYJĘTA. Dzieło: 2 lata od oddania, a gdy nie oddano, od dnia, w którym zgodnie z umową miało być oddane (KC art. 646: „a jeżeli dzieło nie zostało oddane - od dnia, w którym zgodnie z treścią umowy miało być oddane”). Sygnatura III CZP 19/24 nie dopisana (sn.pl blokuje automaty; reguła wynika wprost z przepisu).

## codex-c3-ekspert1-wynik.md (zatrudnienie, B2B, cudzoziemcy, przetargi, NIS2)
- zatrudnienie-na-co-dzien.md:42, PRZYJĘTA. A13: okazjonalna praca zdalna (do 24 dni) nie odbiera zwolnienia biurowych ze szkoleń okresowych (KP art. 67³³ § 2: „nie stosuje się przepisów art. 67¹⁹-67²⁴ oraz art. 67³¹ § 3”).
- zatrudnienie-na-co-dzien.md:76, PRZYJĘTA. A39: brak obowiązku regulaminu, gdy sprawy reguluje układ zbiorowy (KP art. 104 § 1¹, § 2, § 3: „chyba że w zakresie przewidzianym w § 1 obowiązują postanowienia układu zbiorowego pracy”).
- wspolpraca-b2b.md:28, PRZYJĘTA. B4: wypłata kwoty ze stawki minimalnej w pieniądzu i co najmniej raz w miesiącu przy umowie dłuższej niż miesiąc (MINWYN art. 8a ust. 5 i 6: „dokonuje się co najmniej raz w miesiącu”).
- cudzoziemcy.md:40, PRZYJĘTA. C10: zezwolenie najwyżej na rok przy działalności krótszej niż rok albo pracy do 1/2 etatu lub 20 godzin tygodniowo (PRACACUDZ art. 34 ust. 1 pkt 1-2: „na czas określony, nie dłuższy niż 1 rok, jeżeli”).
- cudzoziemcy.md:65, PRZYJĘTA. C27: wymóg obowiązków wojskowych od 5.08.2026, wyjątek dla osób z ochroną przed 4.08.2026 albo w tym dniu, zachowujących ją nieprzerwanie; źródło zmienione na komunikat UdSC z 6.08.2026 (gov.pl/web/udsc, odczyt 6.11.2026: „Przepis ten ma zastosowanie już od 5 sierpnia 2026 r.”).
- przetargi.md:51, PRZYJĘTA. Pkt 20 rozdzielony na trzy przesłanki: warunek braku możliwości wyboru tylko w pkt 1, odmowa podpisania i brak zabezpieczenia (pkt 2) oraz niemożliwość zawarcia (pkt 3) bez tego warunku (PZP art. 98 ust. 6 pkt 1: „co spowodowało brak możliwości wybrania oferty”; pkt 2 lit. a-b bez takiego zastrzeżenia).
- przetargi.md:103 (razem z granice przetargi.md:57 i :103), PRZYJĘTA. Pkt 24 i wzór B3 pkt 5: wyjaśnienie faktów i okoliczności przy aktywnej współpracy z właściwymi organami, w tym ścigania, albo z zamawiającym, z dowodami tej współpracy (PZP art. 110 ust. 2 pkt 2: „aktywnie współpracując odpowiednio z właściwymi organami, w tym organami ścigania, lub zamawiającym”).
- nis2.md:34, PRZYJĘTA. Załącznik nr 1 obejmuje tylko producentów wyrobów medycznych o krytycznym znaczeniu podczas stanu zagrożenia zdrowia publicznego; pozostali producenci wyrobów medycznych i IVD w załączniku nr 2 (KSC.md, tabela załącznika nr 1: „Podmioty produkujące wyroby medyczne uznane za mające krytyczne znaczenie podczas danego stanu zagrożenia zdrowia publicznego”; załącznik nr 2, sektor Produkcja).
- nis2.md:56, PRZYJĘTA. Pkt 26: informację z KRK zastępuje tylko ważne poświadczenie bezpieczeństwa do klauzuli „poufne” lub wyższej (KSC art. 8f ust. 3: „o klauzuli „poufne” lub wyższej”).

## codex-c3-ekspert2-wynik.md (najem, spółka, sukcesja, spory, niewypłacalność)
- najem-lokalu-firmowego.md:42, PRZYJĘTA. Pkt 13: przy najmie do miesiąca czynsz z góry za cały czas najmu (KC art. 669 § 2: „gdy najem ma trwać niedłużej niż miesiąc - za cały czas najmu”).
- spolka-na-co-dzien.md:83, PRZYJĘTA. Pkt 45: najpierw sprawdzenie umowy spółki, bo przy radzie nadzorczej lub komisji rewizyjnej kontrola indywidualna może być wyłączona albo ograniczona (KSH art. 213 § 3).
- sukcesja-firmy.md:82, PRZYJĘTA. Pkt 39: obecnie sąd przedłuża ZS przed dniem wygaśnięcia, sam wniosek nie wystarcza; reguła z ust. 1a dopiero od 1.11.2028 (ZARSUK art. 60 ust. 1: „może przed dniem wygaśnięcia zarządu sukcesyjnego przedłużyć”; Notka ISAP: ust. 1a od 1.11.2028); postanowienie SR opisane jako pojedyncze, nie reguła, z poleceniem pilnego prawnika. Podręcznika biznes.gov.pl nie otwierano, teza wynika z przepisu.
- spory-z-kontrahentem.md:65, PRZYJĘTA. Pkt 28: przy wymagalności zależnej od wezwania bieg od najwcześniej możliwego terminu wezwania (KC art. 120 § 1 zdanie drugie: „gdyby uprawniony podjął czynność w najwcześniej możliwym terminie”). Sygnatura V CSK 340/07 nie dopisana (sn.pl blokuje automaty).
- spory-z-kontrahentem.md:89, PRZYJĘTA. Pkt 46: zwrot 3/4 opłaty minus opłata minimalna, czyli 60 zł albo 195 zł (KOSZTY art. 79 ust. 3: „Opłatę zwracaną na podstawie ... pkt 2 ... obniża się o kwotę równą opłacie minimalnej”; KOSZTY art. 14 ust. 3: 30 zł).
- niewyplacalnosc.md:28, PRZYJĘTA. Pkt 3: wyłączenie tylko zobowiązań przyszłych i pożyczek wspólników z kategorii czwartej (5 lat przed upadłością, z wyjątkami PU art. 342 ust. 5), oddzielone od bilansowego domniemania z PU art. 11 ust. 5 (PU art. 11 ust. 4: „o których mowa w art. 342 ust. 1 pkt 4”).
- niewyplacalnosc.md:61 (uwaga 8), PRZYJĘTA. Pkt 24: ochrona najmu nie działa przy wypowiedzeniu za niewykonywanie po obwieszczeniu zobowiązań nieobjętych układem (PR art. 256 ust. 3 w zw. z PR art. 226e: „przepisów ust. 1 i 2 nie stosuje się”).
- niewyplacalnosc.md:61 (uwaga 9), PRZYJĘTA. Pkt 24: uchylenie skutków obwieszczenia przez sąd na wniosek wierzyciela, dłużnika lub nadzorcy (PR art. 226f: „jeżeli prowadzą one do pokrzywdzenia wierzycieli lub jeżeli zostaną ujawnione okoliczności, o których mowa w art. 226a ust. 2”).

## codex-c3-ekspert3-wynik.md (sprzedaż konsumencka, umowy, marka)
- sprzedaz-konsumencka.md:64, PRZYJĘTA. Rozdział 5a UPK tylko do umów od 1.01.2023; dla wcześniejszych dawne przepisy, w tym rękojmia z KC (art. 4 ust. 1 ustawy z 4.11.2022, Dz.U. 2022 poz. 2337, api.sejm.gov.pl: „Do umów zobowiązujących do przeniesienia własności towaru zawartych przed dniem wejścia w życie niniejszej ustawy stosuje się przepisy dotychczasowe”; art. 5: wejście w życie 1.01.2023).
- sprzedaz-konsumencka.md:67, PRZYJĘTA. Aktualizacje przez zasadnie oczekiwany czas także po 2 latach i odpowiedzialność za ich brak (UPK art. 43k ust. 3 pkt 2; UPK art. 43l ust. 4: „w zakresie uregulowanym w art. 43k ust. 3, który wystąpił w czasie określonym w tym przepisie”).
- sprzedaz-konsumencka.md:68, PRZYJĘTA. Zmiana bez kosztów dla klienta, wypowiedzenie w 30 dni od zmiany albo późniejszego poinformowania, brak prawa przy zachowaniu niezmienionej wersji (UPK art. 43p ust. 2, art. 43q ust. 1-3).
- umowy-wlasne-firmy.md:67, PRZYJĘTA. Potwierdzenie umowy: sprzeciw na piśmie wobec pisma, w dokumencie wobec dokumentu; „drobne uzupełnienia” zastąpione „niezmieniającymi istotnie treści” (KC art. 77¹ § 1: „sprzeciwiła na piśmie”; § 2: „sprzeciwiła w dokumencie”).
- umowy-wlasne-firmy.md:73 (kosmetyka), PRZYJĘTA. Hotel przeniesiony z KC art. 751 pkt 1 do KC art. 851 (należności hotelowe i gastronomiczne, 2 lata).
- marka-i-tajemnica.md:85, PRZYJĘTA. Wynagrodzenie zamiast zakazu tylko na wniosek pozwanego i przy łącznych przesłankach: niewiedza mimo należytej staranności, niewspółmierna szkoda, brak naruszenia interesu powoda; publikacja wyroku osobno (ZNK art. 18 ust. 3 i ust. 4 pkt 1-3).

## codex-c3-granice-wynik.md
- przetargi.md:57 i :103: zob. wyżej (wspólnie z ekspert1 przetargi:103), PRZYJĘTA.
- nis2.md:71, PRZYJĘTA. Pkt 37: rola administratora i podmiotu przetwarzającego, 72 godziny od stwierdzenia naruszenia „w miarę możliwości”, wyjątek braku ryzyka; usunięte błędne odesłanie do `UODO.md` (krajowa ustawa), źródło uodo.gov.pl/pl/525/2584, odczyt 6.11.2026 (RODO art. 33 ust. 1-2).
- marka-i-tajemnica.md:138, CZĘŚCIOWO. W wierszu II GSK 883/11 (status „otwarte częściowo”) dopisano, że teza wychodzi tylko z „do potwierdzenia”. Ogólna reguła dla wszystkich tez niepotwierdzonych w odczytanym uzasadnieniu należy do SKILL.md:52 (poza zakresem, w pominiętych).
- niewyplacalnosc.md:124, spory-z-kontrahentem.md:229, umowy-wlasne-firmy.md:98 (kosmetyka), PRZYJĘTA. `upadlosc-konsumencka` zastąpione `upadlosc-konsumencka-przygotowanie` (nazwa katalogu w `skille/`); „moduł B” zastąpiony ścieżką `moduly/niewyplacalnosc.md`, część „Perspektywa wierzyciela niewypłacalnej firmy”; „sekcja C2” zastąpiona częścią „Umowy z dostawcami IT i chmury, powierzenie danych” w sekcji 2.
- nis2.md:34 (kosmetyka), PRZYJĘTA. Usunięta nieaktualna nota o niewyodrębnionych tabelach; odesłanie do tabel załączników nr 1 i 2 na końcu `akty/KSC.md` i do KSC art. 5 ust. 1-2.
- cudzoziemcy.md:65 (kosmetyka), PRZYJĘTA. „w życiu od 5.08.2026” zastąpione „obowiązuje od 5.08.2026”.
