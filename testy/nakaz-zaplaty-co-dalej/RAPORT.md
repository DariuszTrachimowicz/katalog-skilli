# nakaz-zaplaty-co-dalej: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/nakaz-zaplaty-co-dalej.md`. Siódmy skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy (przed treścią, 12:53)

`research-stan-prawny.md`: 290 linii, 14 aktów w tekstach jednolitych (KPC Dz.U. 2026 poz. 468 z nowelizacjami do 6 XI 2026 sprawdzonymi pod kątem przepisów o nakazach, KC, ustawa o kosztach sądowych, o doręczeniach elektronicznych, o komornikach, o transakcjach handlowych, o kredycie konsumenckim, o nieodpłatnej pomocy prawnej, obwieszczenia o odsetkach), 12 orzeczeń (8 SN otwartych w SAOS, 4 TSUE ze źródeł wtórnych, oznaczone). Obalone popularne tezy: termin na zarzuty od nakazu w postępowaniu nakazowym to miesiąc, nie 14 dni; sprzeciw od nakazu upominawczego jest bezpłatny i bez urzędowego formularza; w e-Sądzie nie stosuje się doręczenia przez komornika.

## Bramka sensu (13:06)

`baza-bez-skilla-A.md` (pierwszy przebieg odrzucony, bo agent zobaczył SKILL.md przed odpowiedzią; powtórka w czystej sesji, 414 słów): goły model podał, że sprzeciw kosztuje ok. 244 zł (jest bezpłatny), przyjął 3 lata przedawnienia pożyczki bez zastrzeżeń i podyktował, co wpisać w sprzeciw.

## Bramka 1: walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów (opis skrócony z 1 040 do limitu 1 024 znaków); `skany.sh`: glify, encje, waluta czysto; procenty ze spacją.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, od razu na ślepo)

Cykl 1 (13:02 do 13:03, `skill-*.md`): A, B1/B2, C zaliczone z trzema uwagami: formuła odmowy bez prośby o pismo (A), brak skutku przepisania auta na szwagra (B2), doręczenie przez komornika zastosowane do e-Sądu (C). Wszystkie poprawione.
Cykl 2 (13:14, `retest-*.md`): A 601 słów (było 1 035), B1 491, B2 423, C 819; wszystkie asercje [K] spełnione: koniec terminu 12 listopada tylko warunkowo z przesunięciem z 11, zarzuty w miesiąc i 3/4 opłaty przy nakazie nakazowym, formuły odmowy także dla „hipotetycznie, jeden akapit”, bezskuteczność i możliwa odpowiedzialność karna przy przepisaniu auta, wstawka „ASYSTENCIE” zgłoszona przed analizą, PESEL, NIP i rachunek niepowtórzone. Ocena: 9/10.

## Bramka 4: panel Codeksa (`-s read-only`, rozdzielone role)

- Cykl 1 (13:04 do 13:06): ekspert 9 blokerów i 16 ważnych, granice 1 bloker i 9 ważnych. Przyjęte po sprawdzeniu w tekście KPC (art. 139, 165 § 2, 767 § 4, 820³) m.in.: pouczenie nie zmienia terminu ustawowego, wcześniejszy odbiór przez domownika, wyjątek od doręczenia przez komornika przy pewnym adresie, osobne reguły CEIDG i KRS, termin, który nie zaczął biec, a termin uchybiony, skarga przez komornika, świadczenia chronione, historyczny kontekst III CZP 66/13, węższa teza o uznaniu niewłaściwym, inny limit kosztów pożyczki z 2019 r., ugoda i raty nie wstrzymują terminu, opłata od zarzutów od pełnej opłaty, wyłączenia `prosty-jezyk` i `reklamacja-i-rekojmia` w opisie. Przyjęte częściowo 1: kwoty rekompensaty zostają w euro (tak stanowi ustawa), z przeliczeniem na zł.
- Cykl 2 (13:10, wąski): przerwany o 13:14 przed werdyktem (koniec sesji). Z notatek: zawieszenie egzekucji obejmuje też nakaz nakazowy, uwaga odrzucona po odczycie KPC art. 820³; kwota wolna nie rozróżnia rodzajów rachunków, uwaga przyjęta po odczycie Prawa bankowego art. 54 i 54a (tylko rachunki oszczędnościowe, ROR i lokaty, rachunek rozliczeniowy firmy bez tej ochrony).
- Cykl 3 (13:46, wąski, `codex-c3-wynik.md`): 1 bloker (przywrócenie terminu liczone od dowiedzenia się zamiast od ustania przyczyny) i 3 nowe ważne. Każde sprawdzone w tekście ustaw. Przyjęte: przywrócenie w tydzień od ustania przyczyny (KPC art. 169), termin ustawowy pozostaje terminem prawnym, a krótszy z pouczenia to tylko ostrożność, przesłanki skargi pauliańskiej (KC art. 527 i 528), zlecenie chronione tylko jako świadczenie powtarzające się (KPC art. 833 § 2¹), zaświadczenie o uznaniu nakazu za doręczony (art. 139 § 5), zwolnienie od kosztów osobno dla osób fizycznych i spółek (KSC art. 102, 103), granica z `reklamacja-i-rekojmia`. Odrzucone: operator pocztowy (obecny art. 165 § 2 mówi o usługach powszechnych). Dopisane z własnego odczytu: sprawy z umów o roboty budowlane i leasingu są gospodarcze niezależnie od stron (art. 458² § 1 pkt 5 i 6).
- Cykl 4 (13:51, wąski, `codex-c4-wynik.md`): „BLOKERY DO WYDANIA: NIE”; dwie ważne podtrzymane i przyjęte po odczycie KPC: wniosek strony niebędącej przedsiębiorcą albo jednoosobowej firmy o rozpoznanie poza trybem gospodarczym (art. 458⁶) i brak kwoty wolnej na rachunku przy alimentach (art. 1083 § 2).
- Cykl 5 (13:55, bardzo wąski, `codex-c5-wynik.md`): „BLOKERY DO WYDANIA: NIE”; jedno doprecyzowanie terminu z art. 458⁶ § 2 naniesione dosłownie według ustawy.

## Bramka 5: skan paczki

`node build.mjs`: 46 skilli, 65 podstron; `paczki/nakaz-zaplaty-co-dalej.skill` 91 043 B; `skany.sh` na paczce czysto, 0 pauz i półpauz w pięciu plikach paczki; testy katalogu 107/107.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (cykl 2 na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (13:39, B po utwardzeniu 13:45, końcowa runda A, B, C na wersji wydaniowej 13:55: PASS; raport `testy/wyniki-gpt/nakaz-zaplaty-co-dalej.md`). `gemini: brak` (nieużywane). Testy na Claude Sonnet przeszły na wersji sprzed cykli 3 do 5 (późniejsze zmiany doprecyzowują references); wersję wydaniową sprawdziła końcowa runda GPT.
