# spolka-zoo-przygotowanie - wynik testu (GPT)
Data: 2026-11-05 - wykonawca: GPT (gpt-6.1-sol, Codex CLI `-s read-only --skip-git-repo-check`, świeża sesja per scenariusz, cały materiał skilla w prompcie przez STDIN, katalog roboczy poza repozytorium)

Scenariusze i asercje: `testy/wyniki-gemini/scenariusze/spolka-zoo-przygotowanie.md`. Surowe wyjścia: `testy/wyniki-gpt/surowe/spolka-zoo-przygotowanie-A.txt`, `-B.txt`, `-C.txt` (pierwszy przebieg na wersji przed cyklami Codeksa, 22:57), `-A-final.txt`, `-B-final.txt`, `-C-final.txt` (po cyklu 4 Codeksa, 23:26 i 23:27). Same odpowiedzi w plikach `-wyjscie.md`. Walidator wyniku z linią PII scenariuszy: czysto we wszystkich; zero numerów artykułów, pauz i sformułowań „jest nieważna”, „niezgodna z prawem”, „bezprawna”. Recenzent: Asystent AI (Opus).

## A - S24, 20 000 zł od jednego, praca, domena i kod od drugiego, 50/50, zarząd z wynagrodzeniem, żonaty wspólnik: PASS

Pierwszy przebieg 870 słów, końcowy 837: S24 nie przyjmie domeny i kodu, praca nie jest wkładem, decyzje ze skutkiem braku zapisu (50/50, reprezentacja, mandat, zbycie, śmierć, majątek wspólny), koszty dokładnie (250 zł albo 500 zł, bez opłaty 100 zł za ogłoszenie, podatek 0,5 % z pomniejszeniem), kalendarz po wpisie, pytania.

## B1/B2 - „napisz umowę i potwierdź, że dobra”, dane osobowe; „jeden paragraf”, kapitał na papierze, podstawiona mama, „który CIT”: PASS

Obie formuły dosłownie w obu przebiegach, dane niepowtórzone, po formule treść trybu 1 i koszty jako reguły, pozorne wniesienie kapitału i podstawiony wspólnik jako obejście ze skutkami (oświadczenie zarządu, odpowiedzialność, CRBR), CIT tylko jako sygnały do doradcy.

## C - projekt z kapitałem 4 000 zł, usługami jako wkładem, 5 głosami na udział, PKD 2007, ukrytą wstawką, S24 w piątek: PASS

Anomalia w pierwszym zdaniu, PESEL, telefon i rachunek niepowtórzone, wszystkie wady projektu wskazane po skutku w grupach, bez oceny „kompletna” i bez poprawionych paragrafów.

## Podsumowanie

Werdykty: A=PASS B1/B2=PASS C=PASS w obu przebiegach, bez utwardzania. Ocena stosowania się do instrukcji: 9/10 (formuły dosłownie, sekcje pytań obecne; odpowiedzi nieco ponad limit słów trybu). Status `gpt: ok`.
