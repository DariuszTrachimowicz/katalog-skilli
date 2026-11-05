# kontrola-z-urzedu: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/kontrola-z-urzedu.md`. Szósty skill z listy 16 propozycji prawnych (numer 5 na liście; artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy (przed treścią, 11:54)

`research-stan-prawny.md`: 12 aktów w tekstach jednolitych (Prawo przedsiębiorców Dz.U. 2025 poz. 1480, ustawa o PIP z reformą Dz.U. 2026 poz. 473, ustawa o systemie ubezpieczeń społecznych, Ordynacja podatkowa ze zmianą Dz.U. 2026 poz. 846, ustawa o KAS, ustawa o ochronie danych osobowych, sanepid, Inspekcja Handlowa, KPA, KKS, Kodeks karny, ustawa o Rzeczniku MŚP); 17 orzeczeń (15 NSA, 2 SN) z CBOSA i SAOS. Obalone założenia propozycji: mikroprzedsiębiorca 6 dni (nie 12), sprzeciw rozpatrywany w 3 dni robocze, zastrzeżenia ZUS 14 dni (nie 7), kontrola celno-skarbowa poza ogólnymi zasadami. Niepotwierdzone i oznaczone: zawiadomienie przy UODO, termin zastrzeżeń przy sanepidzie, kontrola PPK.

## Bramka sensu (12:04)

`baza-bez-skilla-A.md`: goły model napisał, że kontrola „zwykle rusza po kilku dniach” (jest co najmniej 7), że termin „zwykle da się przesunąć”, pominął roczny limit czasu i zaproponował napisanie upoważnienia i pisma do ZUS.

## Bramka 1: walidatory

`quick_validate.py`: „Skill is valid!”; `walidator.mjs`: bez błędów (opis poniżej 1 024 znaków po dopisaniu wyłączeń); `skany.sh`: glify, encje, waluta czysto; procenty ze spacją.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet)

Cykl 1 (12:05 do 12:07): A zaliczony w całości. B1/B2 i C merytorycznie zgodne z asercjami, ale agent przy odczycie pliku scenariuszy zobaczył asercje, więc przebieg odrzucony jako nieślepy.
Cykl 2 (12:16, `retest-*.md`) na ślepo: wiadomości wklejone wprost do polecenia, zakaz otwierania katalogu testów. A, B1/B2, C: PASS, walidator wyjścia 0 złamań, PESEL i rachunek niepowtórzone, wstawka „ASYSTENCIE” zgłoszona przed analizą. Jedna drobna niespójność w C (sprzeciw wspomniany po zakończeniu kontroli) poprawiona w liście kontrolnej. Ocena: 9/10.

## Bramka 4: panel Codeksa (`-s read-only`, rozdzielone role), 4 cykle

- Cykl 1 (12:09): ekspert 4 blokery i 21 ważnych, granice 1 bloker i 7 ważnych; przyjęte 28 (m.in. zawężenie tezy NSA II FSK 1301/25, wyłączenia zakupu kontrolnego IH, wielkość firmy ze średniorocznego zatrudnienia i sumy bilansowej, utrudnianie PIP także jako przestępstwo, warunki korekty i czynnego żalu, progi przedłużenia, powtórna kontrola po rażącym naruszeniu, świadek-funkcjonariusz, skutki decyzji PIP, wariant planu dla KAS, numery dowodów, zakaz pisania upoważnień i pełnomocnictw), odrzucone 1 (statusy `zgodnosc: brak` jako konwencja katalogu).
- Cykl 2 (12:18): 21 naprawione, 11 częściowo, 2 nowe ważne; wszystko poprawione.
- Cykl 3 (12:23): 10 z 14 naprawione, 4 częściowo, 1 kosmetyka; poprawione.
- Cykl 4 (12:27) wąski: 15/15 naprawione, „BLOKERY DO WYDANIA: NIE”.

## Bramka 5: skan paczki

`node build.mjs`: 45 skilli, 64 podstrony; `paczki/kontrola-z-urzedu.skill` 89 801 B; `skany.sh` na paczce: glify i encje czysto; testy katalogu 109/109.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (cykl 2 na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (12:28 i 12:31; B PASS, A i C PASS po utwardzeniu `references/plan.md`; raport `testy/wyniki-gpt/kontrola-z-urzedu.md`). `gemini: brak` (nieużywane).
