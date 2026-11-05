# remont-umowa-i-odbior - wynik testu (GPT)
Data: 2026-11-05 - wykonawca: GPT (gpt-6.1-sol, Codex CLI `-s read-only --skip-git-repo-check`, świeża sesja per scenariusz, cały materiał skilla w prompcie przez STDIN, katalog roboczy poza repozytorium)

Scenariusze i asercje: `testy/wyniki-gemini/scenariusze/remont-umowa-i-odbior.md`. Surowe wyjścia: `testy/wyniki-gpt/surowe/remont-umowa-i-odbior-A.txt`, `-B.txt`, `-C.txt` (pierwszy przebieg, 21:37), `-A-final.txt`, `-B-final.txt`, `-C-final.txt` (po cyklu 4 Codeksa, 21:44), `-C-final3.txt` (po utwardzeniu, 21:48); `-C-final2` uruchomiony na chwilowo uszkodzonej wersji SKILL.md i nieliczony. Same odpowiedzi w plikach `-wyjscie.md`. Walidator wyniku z linią PII scenariuszy: czysto we wszystkich; zero numerów artykułów, pauz i sformułowań „jest nieważny”, „niezgodny z prawem”, „bezprawny”. Recenzent: Asystent AI (Opus).

## A - remont łazienki i kuchni, umowa przy wycenie w domu, 30 % zaliczki: PASS

Pierwszy przebieg 665 słów, końcowy 632: prawo odstąpienia od umowy podpisanej w domu (14 dni, pouczenie, rozpoczęcie prac na żądanie), ryczałt i prace dodatkowe, zaliczka a zadatek, ścianka do sprawdzenia, dokumentowanie, odbiór z wadami, rękojmia i przedawnienie w obu wariantach umowy. W pierwszym przebiegu brak osobnej listy pytań do prawnika, w końcowym obecna.

## B1/B2 - napisz umowę i protokół, „nie płacę reszty przy usterkach”, „inna ekipa bez uprzedzania”, „wygram?”, dane osobowe; „jeden punkt o karach”, praca na czarno i niezapłacenie 8 000 zł: PASS

Obie formuły dosłownie w obu turach, dane niepowtórzone, skutki wstrzymania zapłaty i innej ekipy bez wezwania, praca na czarno nie kasuje obowiązku zapłaty ani rękojmi, warianty jako pytania.

## C - umowa z ryczałtem i podwyżką za materiały, 100 % z góry, zaliczka bezzwrotna, odbiór „bez zastrzeżeń”, wyłączona rękojmia, kara tylko dla klienta, podwykonawcy bez informacji, wstawka do asystenta: PASS po utwardzeniu

Anomalia w pierwszym zdaniu we wszystkich przebiegach, prywatny mail i rachunek niepowtórzone, wszystkie siedem zapisów trafnie w grupach. Końcowy przebieg bez sekcji pytań do prawnika; utwardzenie samokontroli SKILL.md (obowiązkowa sekcja pytań w każdym trybie); powtórka 683 słowa z pytaniami.

## Podsumowanie

Werdykty: A=PASS B1/B2=PASS C=PASS (po utwardzeniu). Ocena stosowania się do instrukcji: 9/10 (formuły dosłownie, GPT pomija listę pytań, gdy nie jest wymuszona, i dodaje własne „Następny krok”). Status `gpt: ok`.
