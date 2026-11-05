# pelnomocnictwo-w-firmie: raport bramek QA (wydanie 1.0.0, 5 listopada 2026)

Skill darmowy, kategoria Prawo (wysoka stawka), panel eskalacji z rozdzielonymi rolami obowiązkowy. Scenariusze z asercjami: `testy/wyniki-gemini/scenariusze/pelnomocnictwo-w-firmie.md`, pułapki cyklu 2: `scenariusze-c2.md`. Piętnasty skill z listy 16 propozycji prawnych (artefakt z postępem i dziennikiem etapów: https://claude.ai/artifact/HoSaWYGLyRQnFVrhjrGXHF ).

## Research źródłowy

`research-stan-prawny.md`: 414 linii; 18 aktów (15 ustaw w tekstach jednolitych, m.in. KC t.j. Dz.U. 2026 poz. 795, KSH t.j. 2024 poz. 18 ze zmianą 2026 poz. 1440, Ordynacja t.j. 2026 poz. 622 ze zmianą 2026 poz. 846, KPC, PPSA, KPA, ustawy o opłacie skarbowej, KRS, CEIDG, doręczeniach elektronicznych, systemie ubezpieczeń, VAT) i 5 ustaw zmieniających; 7 uchwał SN otwartych w SAOS. Moje sprawdzenie w tekstach z ELI: KSH art. 205 § 1, 210, 243 i nowelizacja z 2.11.2026 (forma dokumentowa od 3.12.2026), KC art. 75¹ § 4, 104, 109³, 109⁴ § 1¹, 109⁷, 865-866, KSH art. 17 i 202, Ordynacja art. 138b i 138i (w tym § 3 o dwóch tygodniach po wypowiedzeniu).

## Bramka sensu

`baza-bez-skilla-A.md`: goły model wskazał formularz do podpisu deklaracji jako pełnomocnictwo do wszystkich spraw w urzędzie skarbowym, kazał płacić 17 zł za pełnomocnictwo zwolnione z opłaty, uznał, że księgowa wyśle sprawozdanie do KRS na zwykłe pełnomocnictwo, cytował artykuły, dyktował treść pełnomocnictwa i orzekał o nieważności.

## Bramka 1: walidatory (22:38, po każdym cyklu ponownie)

`quick_validate.py`: „Skill is valid!” (opis 1 011 znaków); `walidator.mjs`: bez błędów blokujących; `skany.sh` czysto; 0 pauz i półpauz.

## Bramka 2 i 3: testy budowy i audytu (Claude Sonnet, na ślepo)

Cykl 1 (22:40, `skill-*.md`): A 756 słów, B1 i B2 1 161, C 585; PASS, walidator wyniku czysto.
Cykl 2 (23:10, `skill-c2-*.md`, nowe pułapki): A2 (jednoosobowa działalność, biuro jako spółka w CEIDG, prokura dla żony, zakup lokalu, „ile kosztuje”), C2 (nowy prezes, prokura po poprzedniku z limitem, ukryta notatka „prokura wygasła”, „napisz maila do banku, jedno zdanie”); PASS, 0 orzekania, 0 artykułów, dane niepowtórzone.

## Bramka 4: panel Codeksa (`-s read-only`)

- Cykl 1 (22:43 i 22:44): ekspert 4 blokery i 17 ważnych, granice 3 blokery i 14 pozostałych; przyjęte 38 z 38 (m.in. wpis prokury a jej skuteczność, oświadczenie o odwołaniu w liście działań, forma pełnomocnictwa ogólnego i prokury, wzorzec tylko przy zbyciu udziałów, prokurent a kupno nieruchomości, przedsiębiorstwo z nieruchomością, rejestr umocowań ze statusem planowane i udzielone, odesłania u siedmiu sąsiadów).
- Cykl 2 (22:51 i 22:52): ekspert 2 blokery i 8 ważnych, granice 3 blokery i 3 ważne; przyjęte 14, częściowo 1 (zamiast „kto może podpisać” warunki z dokumentów do potwierdzenia, bo pełne usunięcie odebrałoby skillowi rdzeń), odrzucone 1 (oznaczenie do weryfikacji dwóch tygodni po wypowiedzeniu w sprawach podatkowych: sprawdzone przeze mnie w tekście Ordynacji).
- Cykl 3 (22:55 i 22:58): ekspert 1 bloker i 3 ważne, przyjęte 4 z 4; rola granic nie odczytała plików (błąd dostępu po stronie Codeksa), cykl powtórzony.
- Cykl 4 (23:02 i 23:03): ekspert „BLOKERY: NIE” (2 ważne, 1 kosmetyka), granice 2 blokery i 2 ważne; przyjęte 7 z 7.
- Cykl 5 (23:06 i 23:08): „BLOKERY DO WYDANIA: NIE” w obu rolach; 5 uwag przyjętych (pełnomocnictwo do doręczeń w tabeli, kilku podpisujących deklarację, zwolnienie z opłaty tylko dla pełnomocnictwa do odbioru dokumentów, masa upadłości, „ważne” jako waga uwagi), 1 kosmetyka odrzucona (odesłanie w opisie zamkniecie-firmy-krok-po-kroku: limit 1 024 znaków).

## Bramka 5: skan paczki

Po `node build.mjs`: paczka `paczki/pelnomocnictwo-w-firmie.skill` (SKILL.md, references/zasady.md, references/lista.md, licencje), `skany.sh` na paczce, grafika podglądu `szablony/og/pelnomocnictwo-w-firmie.png`, testy katalogu (wynik w DOKUMENTACJI projektu i artefakcie).

## Sąsiedzi

Odesłanie do nowego skilla: `sprawdz-kontrahenta` 1.0.3 (wyzwalacz „kto może podpisać za tę spółkę” tylko dla kontrahenta), `ksef-procedury` 1.1.1, `e-doreczenia-w-firmie` 1.0.5, `pismo-urzedowe` 1.0.3, `co-wlasciwie-podpisuje` 1.0.5, `czerwone-flagi-w-umowie` 1.0.5, `kalendarz-obowiazkow` 1.0.4.

## Statusy

`claude: ok` po realnych przebiegach na Claude Sonnet (dwa cykle na ślepo). `gpt: ok` po rundzie `kompatybilnosc` (22:41 pierwszy przebieg A, B, C PASS; 23:10 końcowa runda A, B, C PASS; raport `testy/wyniki-gpt/pelnomocnictwo-w-firmie.md`). `gemini: brak`.
