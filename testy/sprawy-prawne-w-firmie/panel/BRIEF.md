# Panel ekspertów i sędziów: skill `sprawy-prawne-w-firmie` 1.0.0 (6 XI 2026)

## Co oceniasz

Skill AI dla polskich firm bez własnego prawnika, wydany w katalogu skille.aixperts.pl. Katalog: `C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/`.

- `SKILL.md`: 5 trybów, 5 kroków prowadzenia sprawy, zasady przepisów i orzeczeń, pisma, bezpieczeństwo.
- `references/mapa-spraw.md`: które sprawy trafiają do którego modułu.
- `references/pisma.md`: poziom A (gotowe pisma), poziom B (projekt do przeglądu przez prawnika), „nigdy”.
- `references/karta-dla-prawnika.md`: jednostronicowa karta sprawy z jednym pytaniem.
- `references/moduly/*.md`: 13 modułów (zatrudnienie-na-co-dzien, wspolpraca-b2b, cudzoziemcy, najem-lokalu-firmowego, przetargi, nis2, spory-z-kontrahentem, niewyplacalnosc, sprzedaz-konsumencka, marka-i-tajemnica, umowy-wlasne-firmy, spolka-na-co-dzien, sukcesja-firmy).
- `references/katalog/<id>/`: kopie wiedzy 29 wąskich skilli katalogu (generowane skryptem; błędy w nich zgłaszaj jako dotyczące wąskiego skilla `skille/<id>/`).
- `references/akty/*.md`: 44 wbudowane akty w tekście ujednoliconym Kancelarii Sejmu (spis: `references/akty/SPIS.md`). Nie czytaj ich w całości; szukaj przepisu wzorcem `^[\[<]?Art\. N\.` i czytaj cały artykuł. Konwencja: brzmienie w [ ] obowiązuje do daty z „Notka ISAP”, brzmienie w < > od tej daty.

Stan prawny na 6 listopada 2026. Świadome decyzje właściciela (NIE zgłaszaj ich jako błędu): skill podaje przepisy przy wnioskach w formie „KP art. 30 § 4” z datą brzmienia; pisze pisma (zwykłe gotowe, do sądu, umowy, uchwały jako projekt do przeglądu prawnika); wąskie skille zostają w katalogu; nie wylicza podatków; nie orzeka i nie podaje procentów szans.

Raport poprzedniego QA (5 cykli Codeksa, testy Claude i GPT): `C:/Users/CP24/AiXperts - projekty/katalog-skilli/testy/sprawy-prawne-w-firmie/RAPORT.md`. Nie powtarzaj uwag już naniesionych; szukaj tego, czego tamten przegląd nie złapał, i luk.

## Zasady pracy

1. Niczego nie zmieniasz w katalogu `skille/`. Wynik zapisujesz tylko do swojego pliku w `testy/sprawy-prawne-w-firmie/panel/`.
2. Każdy przepis, na który się powołujesz, sprawdzasz w pliku aktu i podajesz w formie „KC art. 484 § 2” z krótkim cytatem. Akty niewbudowane: tylko z oficjalnego tekstu (isap.sejm.gov.pl, api.sejm.gov.pl, dziennikustaw.gov.pl, gov.pl); orzeczenia tylko z sn.pl, orzeczenia.nsa.gov.pl, orzeczenia.ms.gov.pl, orzeczenia.uzp.gov.pl, z sygnaturą i adresem, a jeśli ich nie otworzysz w pełni: „do potwierdzenia”. Nie podawaj niczego z pamięci jako pewnika.
3. Po polsku, bez pauz i półpauz (tylko dywiz), procenty ze spacją („10 %”).
4. Propozycja uzupełnienia ma być gotowym tekstem w stylu modułu: reguła po skutku jednym-dwoma zdaniami + podstawa w nawiasie, z dokładnym miejscem wstawienia (plik i po jakim zdaniu albo punkcie).

## Format pliku eksperta

```
# Ekspert <nr>: <dziedzina> (<Claude albo Codex>)
## Błędy
<ID np. E3-01> | <plik:linia> | BLOKER / WAŻNE / KOSMETYKA | co jest źle | przepis z cytatem | poprawka: dokładny nowy tekst
## Luki (czego brakuje)
<ID> | <plik i miejsce> | dlaczego to typowa sprawa firmy | gotowy tekst do wstawienia
## Ocena
Ocena 1-10 dla twojej dziedziny, trzy najważniejsze rzeczy do zmiany.
```

## Format pliku sędziego

```
# Sędzia <nr>: <perspektywa> (<Claude albo Codex>)
## Werdykty propozycji ekspertów
<ID> | PRZYJĄĆ / PRZYJĄĆ ZE ZMIANĄ (nowy tekst) / ODRZUCIĆ (powód z przepisem albo z zasadą skilla)
## Własne uwagi
<ID np. S2-01> | plik:linia | waga | uwaga | poprawka
## Werdykt końcowy
„GOTOWE DO WYDANIA 1.1.0 PO NANIESIENIU PRZYJĘTYCH: TAK” albo „NIE” z powodem.
```
