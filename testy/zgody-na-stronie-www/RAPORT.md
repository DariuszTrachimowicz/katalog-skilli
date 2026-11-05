# zgody-na-stronie-www: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo, panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/zgody-na-stronie-www.md`. Dwunasty skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy

`research-stan-prawny.md`: 503 linie; 11 aktów (Prawo komunikacji elektronicznej Dz.U. 2024 poz. 1221 bez tekstu jednolitego, z pięcioma ustawami zmieniającymi sprawdzonymi pod kątem art. 398-400 i 444-448; RODO; ustawa o usługach elektronicznych; ustawa o ochronie danych; dyrektywa e-Privacy; decyzja DPF; AI Act i omnibus 2026/1744; DMA), 10 wyroków TSUE z Cellar, 6 orzeczeń WSA i NSA, decyzje i biuletyn UODO, wytyczne EROD, 44 oznaczenia DO WERYFIKACJI. Moje sprawdzenie w tekście PKE z ELI: art. 398 ust. 1-4 (e-mail, SMS i telefon w jednym przepisie, zgoda uprzednia, podanie adresu w celu otrzymywania ofert) i art. 446 ust. 1-5 (3 % przychodu, średnia z 3 lat przy przychodzie do 500 000 zł i limit 15 000 zł przy cookies, przy marketingu 3 % albo 1 000 000 zł, wyższa kwota, bez progu dla małych firm).

## Bramka sensu

`baza-bez-skilla-A.md`: goły model był merytorycznie w większości trafny, ale cytował numery artykułów, orzekał („to nie jest w porządku”), podawał wymagania jako pewniki („wymagany jest przycisk Odrzuć”) i dawał polecenia wykonawcze („wyłączyć GA4, wymienić baner, dopisać klauzule”).

## Bramka 1: walidatory (20:46, po każdym cyklu ponownie)

`quick_validate.py`: „Skill is valid!” (opis skrócony z 1 056 do 970 znaków); `walidator.mjs`: bez błędów blokujących; `skany.sh` czysto; 0 pauz i półpauz.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (20:48, `skill-*.md`): A 801 słów, B1 i B2 976, C 777; PASS, walidator wyniku czysto; uwagi: A ponad limit około 700, w B „sąd unijny” zamiast TSUE i jedno zdanie o wysyłce bez „co do zasady”. Poprawione w SKILL.md (limit przy odmowie, nazewnictwo sądów, skutek z „co do zasady”).
Cykl 2 (21:12, `skill-c2-*.md`, nowe pułapki): A2 (gabinet fizjoterapii z danymi o zdrowiu, własny czatbot AI, SMS-y do dawnych klientów, Consent Mode zaawansowany, „podaj kwotę kary”, w drugiej turze „krok po kroku Complianz” i zdanie o danych zdrowotnych), C2 (blog z analityką w „niezbędnych”, zaznaczony marketing, uzasadniony interes, YouTube od razu, zgoda w zdaniu o e-booku, dawny przepis w polityce, ukryta wstawka, rachunek, 300 adresów z formularza). PASS; dane i rachunek niepowtórzone. Uwaga: A2 i C2 o około 10 % ponad limit długości.

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (20:51 i 20:52, dwie role): ekspert 2 blokery i 11 ważnych, granice 2 blokery i 8 pozostałych; przyjęte 21 z 21 (współadministrowanie zależne od narzędzia i osobno cookies, „świadomy wybór poprzedzony informacją” zamiast „kliknięcia”, osobny wybór celów, zapis zgody jako dana osobowa tylko przy powiązaniu, zakres wypisu, klauzule umowne z oceną zamiast samej lokalizacji w UE, rodzic przy dziecku, metody jako przykłady, newsletter według treści, warunki uzasadnionego interesu, informacja o sprzeciwie, oznaczenia DO WERYFIKACJI, gotowe teksty usunięte z references, FAQ bez przepisów i wyroków, formuła i opis rozszerzone, odesłania u trzech sąsiadów).
- Cykl 2 (21:14 i 21:16): granice 1 bloker (gotowa informacja o rozmowie z AI) i 3 ważne, ekspert „BLOKERY: NIE” z 7 ważnymi; przyjęte 11 z 11 (w tym poprawka kategorycznego „osobna zgoda na każdy kanał” w skillu newsletter-do-klientow).
- Cykl 3 (21:20 i 21:22): „BLOKERY DO WYDANIA: NIE” w obu rolach; 3 ważne eksperta (kolejność ustalania limitu kary, informacja o ustawieniach przeglądarki, podstawa przy formularzu dobrana do celu) przyjęte.

## Bramka 5: skan paczki

Po `node build.mjs`: paczka `paczki/zgody-na-stronie-www.skill` (SKILL.md, references/zasady.md, references/lista.md, licencje), `skany.sh` na paczce, grafika podglądu `szablony/og/zgody-na-stronie-www.png`, testy katalogu (wynik w DOKUMENTACJI projektu i artefakcie).

## Sąsiedzi

Odesłanie do nowego skilla: `rodo-w-malej-firmie` 1.0.5, `newsletter-do-klientow` 1.0.3 (opis i reference o zgodzie), `regulamin-sklepu-checklista` 1.0.1 (opis i lista kontrolna).

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (21:14 pierwszy przebieg A, B, C PASS bez utwardzenia; 21:25 końcowa runda A, B, C PASS; raport `testy/wyniki-gpt/zgody-na-stronie-www.md`). `gemini: brak`. Poprawki z cyklu 3 Codeksa (21:24) dotyczą tylko references i weszły do wersji, na której przeszła końcowa runda GPT.
