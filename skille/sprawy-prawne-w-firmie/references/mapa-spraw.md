# Mapa spraw: który moduł i które pliki

Wczytaj zawsze przy kwalifikacji sprawy (krok 2 w SKILL.md). Sprawa często dotyka kilku obszarów: wybierz moduł główny (ten, w którym biegnie najbliższy termin albo leży największa stawka) i najwyżej dwa pomocnicze. Ścieżki są względem `references/`. Pliki z `katalog/<id>/` to wiedza wąskich skilli: `procedura.md` (kolejność kroków), `zasady.md` (reguły i stan prawny), `lista.md` (listy kontrolne i szablony), czasem dodatkowe pliki. Akty: `akty/SPIS.md`. Ten plik tylko kieruje: reguły merytoryczne są w modułach i plikach katalogu, nie pod tabelami tej mapy.

## 1. Umowy

| Sprawa | Moduł główny | Akty najczęściej |
|---|---|---|
| Cudza umowa do podpisu (B2B, współpraca, dostawa, usługa, agencja, franczyza) | `katalog/czerwone-flagi-w-umowie/` | KC |
| Streszczenie długiej umowy, aneksu, OWU, leasingu, polisy | `katalog/co-wlasciwie-podpisuje/` | KC |
| NDA, list intencyjny, poufność | `katalog/przed-podpisem-nda/` | KC, ZNK |
| Własne wzorce, ogólne warunki, kary umowne, ograniczenie odpowiedzialności, zadatek, forma umowy, umowy z dostawcą IT | `moduly/umowy-wlasne-firmy.md` | KC, UPK |
| Warunki usługi chmurowej albo platformy do akceptacji przez firmę | `katalog/regulamin-pod-lupa/` + `moduly/umowy-wlasne-firmy.md` | KC |
| Prawa do logo, kodu, zdjęć, tekstów od wykonawcy | `katalog/prawa-autorskie-w-zleceniu/` | PRAUT, KC |
| Sprawdzenie kontrahenta przed umową, zaliczką, przelewem | `katalog/sprawdz-kontrahenta/` | KSH, KRS, PRPRZ |
| Kto podpisze za firmę, prokura, pełnomocnictwo | `katalog/pelnomocnictwo-w-firmie/` | KC, KSH |
| Najem biura, lokalu użytkowego, magazynu | `moduly/najem-lokalu-firmowego.md` (z `katalog/najem-mieszkania-pod-lupa/` tylko reguły ogólne najmu) | KC |
| Remont albo budowa, gdy firma jest inwestorem | `katalog/remont-umowa-i-odbior/` + `moduly/umowy-wlasne-firmy.md` (spółka nie ma ochrony konsumenta; osoba fizyczna z jednoosobową firmą może ją mieć, gdy umowa nie ma dla niej charakteru zawodowego: KC art. 385⁵, UPK art. 7aa) | KC, UPK |

## 2. Zatrudnienie i współpraca

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Etat, zlecenie, dzieło czy B2B | `katalog/dzielo-zlecenie-czy-etat/` | KP, KC |
| Bieżące sprawy pracownicze: zatrudnienie, czas pracy, praca w nocy i w niedziele, urlopy, ciąża i urlopy rodzicielskie, zwolnienie lekarskie i jego kontrola, wypadek przy pracy i BHP, praca zdalna, regulaminy, monitoring pracowników, mobbing, dyskryminacja, kary porządkowe, zakaz konkurencji | `moduly/zatrudnienie-na-co-dzien.md` (ciężki, śmiertelny albo zbiorowy wypadek albo podejrzenie przestępstwa wobec pracownika: także `moduly/sprawy-karne-firmy.md`) | KP, PIP, MINWYN, PPK, SUS |
| Rozstanie z pracownikiem | `katalog/zwolnienie-pracownika-krok-po-kroku/` | KP, ZWGR |
| Współpraca B2B z osobą, ryzyko ukrytego etatu | `moduly/wspolpraca-b2b.md` + `katalog/dzielo-zlecenie-czy-etat/` | KP, KC, PIP, MINWYN |
| Zatrudnienie cudzoziemca | `moduly/cudzoziemcy.md` | PRACACUDZ, CUDZ, RYNEKPRACY, KP |
| Zgłoszenia sygnalistów, procedura wewnętrzna | `katalog/sygnalisci-procedura/` | SYGN |
| Zasady korzystania z AI w firmie | `katalog/polityka-ai/` | (AI Act: rozporządzenie UE, poza wbudowanymi aktami) |

## 3. Dane osobowe, strona www, bezpieczeństwo

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Wyciek albo inny incydent z danymi osobowymi (zgubiony laptop, mail do złego adresata, włamanie, wyniesiona baza klientów) | `moduly/dane-osobowe.md` + `katalog/rodo-w-malej-firmie/` (pierwsza godzina, kolejność kroków) + `katalog/rodo-dokumentacja/stan-prawny.md`, część „Naruszenia”; incydent w systemach: także `moduly/nis2.md` | UODO (RODO to rozporządzenie UE, poza wbudowanymi aktami) |
| Żądanie osoby dotyczące jej danych (dostęp, kopia, usunięcie, sprzeciw), pismo z UODO, mapa danych | `moduly/dane-osobowe.md` + `katalog/rodo-w-malej-firmie/` | UODO |
| Kamery obejmujące klientów albo przechodniów (sklep, salon, warsztat, recepcja) | `moduly/dane-osobowe.md` + `katalog/rodo-dokumentacja/`; gdy kamera obejmuje pracowników, także `moduly/zatrudnienie-na-co-dzien.md` | KP art. 22² (przy pracownikach); RODO poza wbudowanymi aktami |
| E-maile, SMS-y i telefony z ofertą do firm albo osób, kupione bazy, dawni klienci | `moduly/dane-osobowe.md` + `katalog/zgody-na-stronie-www/` (sekcja 5) | PKE |
| Zdjęcia albo nagrania klientów i pracowników w reklamie, na stronie, w mediach społecznościowych | `katalog/prawa-autorskie-w-zleceniu/zasady.md`, sekcja 12 (wizerunek) + `moduly/dane-osobowe.md` | PRAUT art. 81, KC art. 23, KC art. 24 |
| Rejestr czynności, upoważnienia, analiza ryzyka | `katalog/rodo-dokumentacja/` | UODO |
| Cookies, zgody marketingowe, formularze na stronie | `katalog/zgody-na-stronie-www/` | SDE, PKE |
| Cyberbezpieczeństwo, NIS2, incydent w systemach | `moduly/nis2.md` | KSC |

## 4. Firma i spółka

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Zakładanie sp. z o.o. | `katalog/spolka-zoo-przygotowanie/` | KSH, KRS |
| Spółka na co dzień: zgromadzenie, uchwały, zmiany w KRS, udziały, zarząd i jego odpowiedzialność, likwidacja | `moduly/spolka-na-co-dzien.md` | KSH, KRS, OP, RACH, AML (CRBR) |
| Zawieszenie albo zamknięcie jednoosobowej działalności | `katalog/zamkniecie-firmy-krok-po-kroku/` | PRPRZ, CEIDG |
| Śmierć przedsiębiorcy albo wspólnika, zarząd sukcesyjny | `moduly/sukcesja-firmy.md` | ZARSUK, KC, KSH |
| Firma nie płaci długów, wniosek o upadłość, restrukturyzacja | `moduly/niewyplacalnosc.md` | PU, PR, KSH, OP |
| Obowiązki cykliczne (co miesiąc, kwartał, rok) | `katalog/kalendarz-obowiazkow/` | RACH, SUS, OP, AML (CRBR) |
| e-Doręczenia | `katalog/e-doreczenia-w-firmie/` | DOREL |
| KSeF (procedury) | `katalog/ksef-procedury/` (tylko gdy dotyczy) | (ustawa o VAT poza wbudowanymi aktami) |
| AML, gdy firma jest instytucją obowiązaną | `katalog/procedura-aml/` (tylko gdy dotyczy) | AML |

## 5. Sprzedaż do konsumentów

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Odstąpienie, zwroty, informacje dla klienta, ceny i promocje, opinie, dostępność, pismo z UOKiK w sprawie praktyk wobec konsumentów | `moduly/sprzedaz-konsumencka.md` | UPK, UOKIK, UNPR, CENY, DOST, SDE |
| Niebezpieczny produkt, wypadek z produktem, wycofanie produktu od klientów | `moduly/sprzedaz-konsumencka.md` (tylko pierwsze kroki) i od razu prawnik: obowiązki z unijnego rozporządzenia o ogólnym bezpieczeństwie produktów (GPSR) nie są wbudowane [WYMAGA WERYFIKACJI: biznes.gov.pl] | KC (odpowiedzialność za produkt niebezpieczny) |
| Pismo UOKiK w sprawie zmowy (cenowej, przetargowej), ograniczeń w dystrybucji albo nadużywania pozycji dominującej | od razu prawnik (kara do 10 % obrotu); skill tylko zbiera fakty i robi kartę | UOKIK (art. 6 i 9) |
| Przejęcie kontroli nad inną firmą, zakup przedsiębiorstwa albo jego części, utworzenie wspólnej spółki z inną firmą (koncentracja) | prawnik przed podpisaniem umowy: przy przekroczeniu progów obrotu trzeba zgłosić zamiar UOKiK i wstrzymać się z transakcją do zgody; skill zbiera fakty (obroty grup, struktura transakcji) i robi kartę | UOKIK (art. 13, 14, 97) |
| Sprzedaż do konsumentów w innych państwach (oferta kierowana za granicę) | `moduly/sprzedaz-konsumencka.md` (część o sprzedaży za granicę); wybór prawa: prawnik | UPK (rozporządzenie Rzym I poza wbudowanymi aktami) |
| Blokada konta sprzedawcy, usunięcie oferty albo ograniczenie sprzedaży przez platformę (marketplace) | `moduly/umowy-wlasne-firmy.md` + `moduly/sprzedaz-konsumencka.md` (część o platformach) | KC, SDE |
| Regulamin własnego sklepu | `katalog/regulamin-sklepu-checklista/` | UPK, SDE |
| Reklamacja, rękojmia, gwarancja (po obu stronach) | `katalog/reklamacja-i-rekojmia/` | KC, UPK |

## 6. Urzędy i kontrole

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Pismo do urzędu: wniosek, wyjaśnienia, odwołanie, ponaglenie | `katalog/pismo-urzedowe/` (odwołanie od decyzji ZUS albo decyzji inspektora pracy o stosunku pracy rozpoznaje sąd: poziom B, `pisma.md` punkt 4.8) | KPA, OP, SUS, PIP |
| Decyzja, postanowienie, kara administracyjna, upomnienie, mandat za wykroczenie inne niż skarbowe (np. drogowe) | `katalog/decyzja-z-urzedu-co-dalej/` | KPA, OP, PPSA (mandat: Kodeks postępowania w sprawach o wykroczenia poza wbudowanymi aktami) |
| Mandat karny skarbowy (np. z urzędu skarbowego), wezwanie w sprawie o przestępstwo albo wykroczenie skarbowe | `moduly/sprawy-karne-firmy.md`: pierwsza reakcja i karta dla prawnika; reguły mandatu sprawdzaj w KKS według daty czynności | KKS |
| Egzekucja administracyjna: upomnienie, tytuł wykonawczy, zajęcie rachunku, zarzut, skarga na czynność | `moduly/urzedy-i-podatki-procedura.md` + `katalog/decyzja-z-urzedu-co-dalej/` | OP (ustawa o postępowaniu egzekucyjnym w administracji poza wbudowanymi aktami) |
| Interpretacja indywidualna (podatki, składki ZUS) przed rozliczeniem albo transakcją | `moduly/urzedy-i-podatki-procedura.md` + `katalog/pismo-urzedowe/`; stanowisko podatkowe: doradca podatkowy | OP, PRPRZ |
| Błąd w deklaracji, korekta, zaległy podatek, czynny żal | `moduly/urzedy-i-podatki-procedura.md` (korekta) + `moduly/sprawy-karne-firmy.md` (czynny żal); przy kontroli także `katalog/kontrola-z-urzedu/`; wybór drogi: doradca podatkowy | OP, KKS |
| Brak środków na podatek albo składki: odroczenie, raty, umorzenie (także przed decyzją i upomnieniem) | `moduly/urzedy-i-podatki-procedura.md` | OP, SUS |
| Koncesja, zezwolenie, wpis do rejestru działalności regulowanej: czy potrzebne, odmowa, cofnięcie | `moduly/urzedy-i-podatki-procedura.md`; przy decyzji `katalog/decyzja-z-urzedu-co-dalej/`; ustawy branżowe poza wbudowanymi aktami [WYMAGA WERYFIKACJI: lista na biznes.gov.pl] | PRPRZ |
| Decyzja Prezesa UOKiK (praktyki naruszające interesy konsumentów, klauzule, kara) | `moduly/sprzedaz-konsumencka.md` i od razu prawnik: odwołanie do sądu ochrony konkurencji i konsumentów w miesiąc od doręczenia, przez Prezesa UOKiK, poziom B | UOKIK (art. 81) |
| Kontrola ZUS, PIP, skarbowa, UODO, sanepid, Inspekcja Handlowa | `katalog/kontrola-z-urzedu/` | PRPRZ, OP, PIP, SUS, UODO (ustawa o Krajowej Administracji Skarbowej poza wbudowanymi aktami) |

## 7. Pieniądze i spory

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Klient nie płaci: przypomnienie, ponaglenie, wezwanie | `katalog/windykacja-miekka/` + `moduly/spory-z-kontrahentem.md` | KC, ZATORY |
| Spór z kontrahentem, przedawnienie, potrącenie, ugoda, mediacja, pozew, e-Sąd, komornik po stronie wierzyciela | `moduly/spory-z-kontrahentem.md` | KC, KPC, ZATORY, KOSZTY |
| Firma dostała nakaz zapłaty, pozew, pismo komornika | `katalog/nakaz-zaplaty-co-dalej/` | KPC |
| Kontrahent oszukał (podejrzenie przestępstwa) | `moduly/spory-z-kontrahentem.md` + `moduly/sprawy-karne-firmy.md` | KK, KPK |

## 8. Marka, nazwa, tajemnica

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Znak towarowy, nazwa, domena, ktoś kopiuje markę albo produkt, wyciek know-how albo bazy klientów, nieprawdziwa opinia albo wpis o firmie w internecie | `moduly/marka-i-tajemnica.md` (przy kopiowaniu produktu także patenty, wzory i prawa autorskie: rzecznik patentowy; przy wyniesionych danych osobowych równolegle `moduly/dane-osobowe.md`) | PWP, ZNK, PRAUT, KC, SDE |

## 9. Zamówienia publiczne

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Udział w przetargu, wykluczenie, rażąco niska cena, odwołanie do KIO, umowa z zamawiającym | `moduly/przetargi.md` | PZP |

## 9a. Sprawy karne związane z firmą

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Firma pokrzywdzona: pracownik ukradł albo przywłaszczył, podszycie pod prezesa albo dostawcę i przelew na rachunek oszusta, wyłudzenie towaru, zniesławienie firmy, odmowa wszczęcia albo umorzenie po zawiadomieniu | `moduly/sprawy-karne-firmy.md` (+ `moduly/spory-z-kontrahentem.md` przy kontrahencie) | KK, KPK |
| Przeszukanie, żądanie wydania dokumentów albo danych, pracownik albo członek zarządu wezwany na świadka | `moduly/sprawy-karne-firmy.md` | KPK |
| Postępowanie karne skarbowe: wezwanie, zarzut, niewpłacone podatki pobrane jako płatnik (mandat karny skarbowy i czynny żal: sekcja 6) | `moduly/sprawy-karne-firmy.md` (+ `katalog/kontrola-z-urzedu/` przy kontroli) | KKS |
| Czy spółka odpowiada za przestępstwo członka zarządu albo pracownika (podmiot zbiorowy), odpowiedzialność posiłkowa za grzywnę skarbową | `moduly/sprawy-karne-firmy.md`, od razu prawnik | PODZB, KKS |

## 10. Poza zakresem tego skilla

- Ochrona środowiska, odpady, opakowania, rejestr BDO, sprawozdawczość środowiskowa i pozwolenia: skill rozpoznaje tylko, czy obowiązek może dotyczyć firmy (wprowadza opakowania albo produkty, wytwarza odpady), i kieruje do specjalisty od ochrony środowiska; przepisy nie są wbudowane [WYMAGA WERYFIKACJI: bdo.mos.gov.pl, biznes.gov.pl].

- Sprawy prywatne właściciela (rozwód, spadek poza firmą, upadłość konsumencka, najem własnego mieszkania): powiedz, że skill jest dla spraw firmy, i podaj, że w katalogu skille.aixperts.pl są do tego osobne skille (rozwód za porozumieniem, spadek krok po kroku, upadłość konsumencka, najem mieszkania pod lupą).
- Merytoryczne rozliczenia podatkowe (ile podatku, który wariant): doradca podatkowy albo księgowa; skill pomaga tylko w procedurze (pismo, termin, kontrola, decyzja). Korekta, czynny żal i mandat karny skarbowy to nie rozliczenie: sekcje 6 i 9a.
- Obrona w sprawie karnej albo karnej skarbowej członka zarządu, pracownika albo firmy (zarzuty, przesłuchanie w charakterze podejrzanego, odpowiedzialność podmiotu zbiorowego): od razu adwokat albo radca prawny; skill nie prowadzi obrony, nie ocenia winy ani szans, nie układa wyjaśnień podejrzanego ani treści zeznań świadka i przygotowuje kartę dla prawnika. Przed przekazaniem wczytaj `moduly/sprawy-karne-firmy.md`, żeby rozpoznać pilną czynność, rolę użytkownika (pokrzywdzony, reprezentant firmy, świadek, podejrzany) i potrzebę zabezpieczenia dowodów, bez wstrzymywania pierwszej pomocy, zabezpieczenia dowodów ani wymaganego zawiadomienia. Odesłanie do modułu nie zmienia poziomów pism; sprawy, w których firma działa sama i szybko: sekcja 9a.
- Sprawy sądowe, które już się toczą z udziałem pełnomocnika drugiej strony, i sprawy o wysokie kwoty: analiza i karta tak, pismo do sądu tylko jako projekt do przeglądu.
