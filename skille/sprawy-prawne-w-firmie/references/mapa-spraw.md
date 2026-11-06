# Mapa spraw: który moduł i które pliki

Wczytaj zawsze przy kwalifikacji sprawy (krok 2 w SKILL.md). Sprawa często dotyka kilku obszarów: wybierz moduł główny (ten, w którym biegnie najbliższy termin albo leży największa stawka) i najwyżej dwa pomocnicze. Ścieżki są względem `references/`. Pliki z `katalog/<id>/` to wiedza wąskich skilli: `procedura.md` (kolejność kroków), `zasady.md` (reguły i stan prawny), `lista.md` (listy kontrolne i szablony), czasem dodatkowe pliki. Akty: `akty/SPIS.md`.

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
| Bieżące sprawy pracownicze: zatrudnienie, czas pracy, urlopy, praca zdalna, regulaminy, monitoring, mobbing, dyskryminacja, kary porządkowe, zakaz konkurencji | `moduly/zatrudnienie-na-co-dzien.md` | KP, PIP, MINWYN, PPK, SUS |
| Rozstanie z pracownikiem | `katalog/zwolnienie-pracownika-krok-po-kroku/` | KP, ZWGR |
| Współpraca B2B z osobą, ryzyko ukrytego etatu | `moduly/wspolpraca-b2b.md` + `katalog/dzielo-zlecenie-czy-etat/` | KP, KC, PIP, MINWYN |
| Zatrudnienie cudzoziemca | `moduly/cudzoziemcy.md` | PRACACUDZ, CUDZ, RYNEKPRACY, KP |
| Zgłoszenia sygnalistów, procedura wewnętrzna | `katalog/sygnalisci-procedura/` | SYGN |
| Zasady korzystania z AI w firmie | `katalog/polityka-ai/` | (AI Act: rozporządzenie UE, poza wbudowanymi aktami) |

## 3. Dane osobowe, strona www, bezpieczeństwo

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Mapa danych, wyciek, pismo z UODO, prośba klienta o dane | `katalog/rodo-w-malej-firmie/` | UODO (RODO to rozporządzenie UE, poza wbudowanymi aktami) |
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
| Regulamin własnego sklepu | `katalog/regulamin-sklepu-checklista/` | UPK, SDE |
| Reklamacja, rękojmia, gwarancja (po obu stronach) | `katalog/reklamacja-i-rekojmia/` | KC, UPK |

## 6. Urzędy i kontrole

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Pismo do urzędu: wniosek, wyjaśnienia, odwołanie, ponaglenie | `katalog/pismo-urzedowe/` | KPA, OP |
| Decyzja, postanowienie, kara, mandat, upomnienie, egzekucja | `katalog/decyzja-z-urzedu-co-dalej/` | KPA, OP, PPSA |
| Decyzja Prezesa UOKiK (praktyki naruszające interesy konsumentów, klauzule, kara) | `moduly/sprzedaz-konsumencka.md` i od razu prawnik: odwołanie do sądu ochrony konkurencji i konsumentów w miesiąc od doręczenia, przez Prezesa UOKiK, poziom B | UOKIK (art. 81) |
| Kontrola ZUS, PIP, skarbowa, UODO, sanepid, Inspekcja Handlowa | `katalog/kontrola-z-urzedu/` | PRPRZ, OP |

## 7. Pieniądze i spory

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Klient nie płaci: przypomnienie, ponaglenie, wezwanie | `katalog/windykacja-miekka/` + `moduly/spory-z-kontrahentem.md` | KC, ZATORY |
| Spór z kontrahentem, przedawnienie, potrącenie, ugoda, mediacja, pozew, e-Sąd, komornik po stronie wierzyciela | `moduly/spory-z-kontrahentem.md` | KC, KPC, ZATORY, KOSZTY |
| Firma dostała nakaz zapłaty, pozew, pismo komornika | `katalog/nakaz-zaplaty-co-dalej/` | KPC |
| Kontrahent oszukał (podejrzenie przestępstwa) | `moduly/spory-z-kontrahentem.md` | KK, KPK |

## 8. Marka, nazwa, tajemnica

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Znak towarowy, nazwa, domena, ktoś kopiuje markę albo produkt, wyciek know-how | `moduly/marka-i-tajemnica.md` (przy kopiowaniu produktu także patenty, wzory i prawa autorskie: rzecznik patentowy) | PWP, ZNK, PRAUT |

## 9. Zamówienia publiczne

| Sprawa | Moduł główny | Akty |
|---|---|---|
| Udział w przetargu, wykluczenie, rażąco niska cena, odwołanie do KIO, umowa z zamawiającym | `moduly/przetargi.md` | PZP |

## 10. Poza zakresem tego skilla

- Ochrona środowiska, odpady, opakowania, rejestr BDO, sprawozdawczość środowiskowa i pozwolenia: skill rozpoznaje tylko, czy obowiązek może dotyczyć firmy (wprowadza opakowania albo produkty, wytwarza odpady), i kieruje do specjalisty od ochrony środowiska; przepisy nie są wbudowane [WYMAGA WERYFIKACJI: bdo.mos.gov.pl, biznes.gov.pl].

- Sprawy prywatne właściciela (rozwód, spadek poza firmą, upadłość konsumencka, najem własnego mieszkania): powiedz, że skill jest dla spraw firmy, i podaj, że w katalogu skille.aixperts.pl są do tego osobne skille (rozwód za porozumieniem, spadek krok po kroku, upadłość konsumencka, najem mieszkania pod lupą).
- Merytoryczne rozliczenia podatkowe (ile podatku, który wariant): doradca podatkowy albo księgowa; skill pomaga tylko w procedurze (pismo, termin, kontrola, decyzja).
- Obrona w sprawie karnej albo karnej skarbowej członka zarządu, pracownika albo firmy: od razu adwokat albo radca prawny; skill przygotowuje tylko kartę dla prawnika.
- Sprawy sądowe, które już się toczą z udziałem pełnomocnika drugiej strony, i sprawy o wysokie kwoty: analiza i karta tak, pismo do sądu tylko jako projekt do przeglądu.
