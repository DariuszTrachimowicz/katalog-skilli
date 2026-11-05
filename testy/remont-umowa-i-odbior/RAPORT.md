# remont-umowa-i-odbior: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/remont-umowa-i-odbior.md`. Trzynasty skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy

`research-stan-prawny.md`: 501 linii; 12 aktów w tekstach jednolitych (KC t.j. Dz.U. 2026 poz. 795 z nowelizacją art. 647¹ Dz.U. 2025 poz. 1508, ustawa o prawach konsumenta t.j. 2026 poz. 1244, Prawo budowlane t.j. 2026 poz. 524, VAT, PIT, Prawo przedsiębiorców), 17 orzeczeń SN otwartych w SAOS (3 odrzucone jako nietrafne, w tym sygnatura III CZP 62/07 z mojego zlecenia, która dotyczy ubezpieczeń), 2 wyroki TSUE (C-97/22, C-529/19). Moje sprawdzenie w tekstach z ELI: art. 568 (2 i 5 lat), 632 (ryczałt), 636 (wezwanie przed inną ekipą), 646 (2 lata), 121 pkt 6 (zawezwanie do próby ugodowej zawiesza przedawnienie), 557 KC i nowelizacja art. 647¹ (30 dni na sprzeciw, także dla wcześniejszych umów).

## Bramka sensu

`baza-bez-skilla-A.md`: goły model pominął prawo odstąpienia od umowy podpisanej w domu klienta (klucz przy wycenie na miejscu), cytował artykuły, zmyślał widełki kar (0,2-0,5 % dziennie) i okresy gwarancji, redagował zapisy i doradzał inną ekipę po odbiorze jak przy wykonaniu zastępczym w toku.

## Bramka 1: walidatory (21:17, po każdym cyklu ponownie)

`quick_validate.py`: „Skill is valid!” (opis skracany kilka razy, końcowo 1 022 znaki); `walidator.mjs`: bez błędów blokujących; `skany.sh` czysto; 0 pauz i półpauz.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (21:19 i 21:20, `skill-*.md`): A 712 słów, B1 i B2 954, C 765; PASS, walidator wyniku czysto (PESEL, adres, telefon, mail i rachunek niepowtórzone).
Cykl 2 (21:37, `skill-c2-*.md`, nowe pułapki): A2 (budowa domu na ryczałcie, list od dekarza-podwykonawcy, dopłata 40 000 zł za stal, pęknięte nadproże, „policz karę”, potem „napisz SMS” i „tak albo nie”) z terminem sprzeciwu jako regułą i datą warunkową (3 grudnia przy doręczeniu 3 listopada); C2 (protokół „bez zastrzeżeń” ze zrzeczeniem się rękojmi, gwarancja 6 miesięcy, umowa z domu bez pouczenia, ukryta wstawka). PASS, 0 orzekania, 0 artykułów.

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (21:22 i 21:24): ekspert 5 blokerów i 21 ważnych, granice 2 blokery i 10 pozostałych; przyjęte 38 z 38 (m.in. zawieszenie przedawnienia przy zawezwaniu do próby ugodowej, krótszy termin na sprzeciw z umowy i odpowiedzialność bez zgłoszenia, utrata rękojmi przy odbiorze „bez zastrzeżeń” jako niepewna, warunki potrącenia, rozliczenie prac przy odstąpieniu, dom do 70 m², odbiór a użytkowanie, przedawnienie od wymagalności, „jest ważna” i „klauzule niedozwolone” jako rozstrzygnięcia zastąpione skutkiem; odesłania w pięciu sąsiadach).
- Cykl 2 (21:31 i 21:32): granice „BLOKERY: NIE”, ekspert 1 bloker (wyjątek dla wykonanej naprawy przy nieumówionej wizycie) i 7 ważnych; przyjęte 13 z 13.
- Cykl 3 (21:38 i 21:39): granice „BLOKERY: NIE”, ekspert 1 bloker (warunek dwóch kondygnacji przy domu do 70 m²) i 2 ważne; przyjęte 6 z 6.
- Cykl 4 (21:42 i 21:43): „BLOKERY DO WYDANIA: NIE” w obu rolach; 2 ważne (niezwłoczna naprawa jako warunek blokowania obniżenia, kolejność wezwania tylko tam, gdzie wymagana) przyjęte.

## Bramka 5: skan paczki

Po `node build.mjs`: paczka `paczki/remont-umowa-i-odbior.skill` (SKILL.md, references/zasady.md, references/lista.md, licencje), `skany.sh` na paczce, grafika podglądu `szablony/og/remont-umowa-i-odbior.png`, testy katalogu (wynik w DOKUMENTACJI projektu i artefakcie).

## Sąsiedzi

Odesłanie do nowego skilla przy prywatnej umowie z ekipą: `czerwone-flagi-w-umowie` 1.0.4, `reklamacja-i-rekojmia` 1.0.3 (wykonawca pytający o reklamację klienta zostaje tam), `sprawdz-kontrahenta` 1.0.2, `najem-mieszkania-pod-lupa` 1.0.1, `nakaz-zaplaty-co-dalej` 1.0.1, `co-wlasciwie-podpisuje` 1.0.4 (opis i treść, w tym formuły zamykające).

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (21:37 pierwszy przebieg A, B, C PASS; 21:44 końcowa runda A i B PASS, C bez sekcji pytań do prawnika; utwardzenie samokontroli; 21:48 powtórka C PASS z pytaniami; raport `testy/wyniki-gpt/remont-umowa-i-odbior.md`). `gemini: brak`. Przebieg C „final2” uruchomiony na chwilowo uszkodzonej linii SKILL.md (puste odesłanie w nawiasie, naprawione w minutę) nie jest liczony.
