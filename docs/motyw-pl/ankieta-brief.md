# Brief: test doboru (ankieta) a platne skille

## Problem (werdykt wlasciciela)

Test doboru na stronie glownej ("Nie wiesz, czego szukac? Nie musisz.", 6 pytan)
NIE UWZGLEDNIA platnych skilli. Wlasciciel: "albo trzeba usunac albo ustawic od
nowa". Zadanie zespolu: zdecydowac i zaprojektowac rozwiazanie do wdrozenia.

## Jak ankieta dziala DZIS (fakty z kodu)

- Zrodlo: szablony/strona.js (PYTANIA, scoring, wynik, capture) + build.mjs
  (daneQuizu) + serwer/zapisy.mjs (zapis, mail z zestawem, lead do CRM).
- daneQuizu w build.mjs: TYLKO darmowe skille (filtr `String(s.platny) !== "true"`).
  Kazdy skill ma: id, n (nazwa), o (skrot), t (tagi z pola `szukaj`), g (gotowy).
- 6 pytan (rola, pozeracz czasu, umowy, faktury, rekrutacja, wielkosc firmy).
  Kazda odpowiedz dodaje +1 do tagow, np. "Tak, duzo faktur" -> faktury,
  ksiegowosc, finanse. Tagi w uzyciu: firma, umowa, B2B, ksiegowosc, faktury,
  finanse, kadry, rekrutacja, marketing, sprzedaz, tresci, freelancer, biuro,
  pisma, dokumenty, dane, komunikacja, maile, kontrakt, ryzyko, prawnik, raporty.
- Wynik: suma punktow po tagach skilla, top 6, lista linkow + panel
  "Wyslac Ci ten zestaw na maila?" (glowna bramka mailowa lejka: double opt-in,
  potem lead w CRM z lista dobranych skilli i sekwencja ankieta->oferta).
- Mail z zestawem (zapisy.mjs, mailZZestawem): numerowana lista, link do
  podstrony kazdego skilla, instrukcja pobrania paczki .skill; skille spoza
  `gotowy` dostaja dopisek "(w przygotowaniu)". UWAGA: w public/dane/skille.json
  platne maja gotowy=false, wiec platny w wyniku dostalby dzis falszywy dopisek
  "(w przygotowaniu)" i instrukcje pobrania, ktora dla niego nie dziala.
- Umami: zdarzenia wynik-testu i zapis.

## Platne skille (3)

| id | nazwa | kategoria | cena | trial | tagi (szukaj) |
|---|---|---|---|---|---|
| polityka-ai | Polityka AI i rejestr zastosowan | Prawo | od 890 zl netto | NIE | polityka AI, AI Act, rejestr systemow AI, obowiazki AI Act, kompetencje AI, klauzula AI do umowy, praktyki zakazane AI, zasady korzystania z AI w firmie, dokumentacja AI, incydent AI, prawo |
| oferta-behawioralna | Oferta behawioralna | Marketing | od 490 zl | TAK (paczka trial) | oferta behawioralna, oferta B2B, pakiety, kotwica ceny, wabik, odwrocenie ryzyka, konwersja oferty, wycena, propozycja wspolpracy, premium, sprzedaz |
| operaty-szacunkowe | Operaty szacunkowe, warsztat rzeczoznawcy | Finanse | od 890 zl netto | NIE | operat szacunkowy, wycena nieruchomosci, rzeczoznawca majatkowy, podejscie porownawcze, podejscie dochodowe, stopa kapitalizacji, zuzycie techniczne, analiza rynku, ocena operatu, finanse |

PULAPKA DOPASOWANIA: proste wlaczenie platnych do scoringu daje bledy, np.
operaty-szacunkowe maja tag "finanse", wiec ksiegowa od faktur dostalaby
narzedzie rzeczoznawcy za 890 zl; polityka-ai nie ma zadnego tagu z pytan
(prawo nie jest przyznawane, prawnik nie wystepuje w jej tagach); tylko
oferta-behawioralna ma naturalny zaczep (sprzedaz). Rozwiazanie musi byc
madrzejsze niz "dopisac do listy": osobne sygnaly (nowe pytanie/odpowiedzi,
progi, twarde tagi-kotwice), osobna prezentacja, albo swiadoma rezygnacja.

## Decyzja do podjecia

Usunac ankiete czy przebudowac? Oceniaj uczciwie, ale pamietaj: ankieta jest
GLOWNA bramka mailowa lejka (zapis -> CRM -> sekwencja ofert), wiec usuniecie
to utrata zapisow; rekomendacja usuniecia wymaga mocnego uzasadnienia i planu
zastepczego dla lejka.

## Ograniczenia twarde

- Jezyk polski, zero dlugich myslnikow, zero emoji.
- Uczciwosc: platny skill nie moze byc przedstawiany jak darmowy; cena widoczna
  przy rekomendacji; zadnego sztucznego windowania platnych nad lepiej
  dopasowane darmowe; komunikaty o pobraniu nie moga klamac (platnego sie nie
  pobiera, kupuje sie licencje; trial ma tylko oferta-behawioralna).
- Copy zgody/RODO przy zapisie zostaje bez zmian.
- Minimalne ryzyko regresu dzialajacego lejka (double opt-in, mail, CRM).
- Wykonalnosc: czysty JS w strona.js (zero zaleznosci), dane z build.mjs,
  mail w zapisy.mjs (plain-ish text). Zadnych nowych uslug.
- Test ma zostac krotki (dzis 6 pytan; wiecej niz 8 to spadek ukonczen).

## Format odpowiedzi

1. DECYZJA: usunac / przebudowac (1 akapit uzasadnienia).
2. PROJEKT rozwiazania (koncept + szczegoly): pytania/odpowiedzi (pelne brzmienia,
   jesli zmieniasz), regula doboru platnych (kiedy sie pojawiaja, gdzie, prog),
   prezentacja w wyniku (dokladny uklad/teksty), zmiany w mailu z zestawem
   (dokladne brzmienia dla pozycji platnej), zmiany danych (daneQuizu, skille.json).
3. RYZYKA i jak je zamykasz (max 5).
4. Czego NIE ruszac (lista).
