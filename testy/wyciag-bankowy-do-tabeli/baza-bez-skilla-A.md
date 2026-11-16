Cześć! Plik przeczytałem i policzyłem. Poniżej masz zestawienie do pokazania księgowej oraz kilka rzeczy, które trzeba wyjaśnić, zanim je wyślesz.

## 1. Krzaczki w Excelu

Plik z mBanku jest w kodowaniu Windows-1250, a Excel czyta go jako UTF-8. Dane są w porządku. Żeby zobaczyć polskie litery:

- Excel: Dane, Z tekstu/CSV, wybierz plik, a w polu "Pochodzenie pliku" ustaw "1250: Europa Środkowa (Windows)". Separator to średnik.
- Nie otwieraj pliku dwuklikiem i nie zapisuj go po otwarciu. Wtedy krzaczki zostają na stałe.

## 2. Najważniejsze: daty z przyszłości

Dziś jest 15 listopada 2026, a w pliku są operacje z 17, 20, 21, 25, 28 i 30 listopada (razem 6 pozycji). Bank nie mógł ich jeszcze zaksięgować. Możliwe, że to plik testowy albo ma błędne daty. Zanim pokażesz to księgowej, sprawdź to. Liczby poniżej są policzone z pliku tak, jak jest. Kompletną historię za listopad pobierz po 30 listopada.

## 3. Wynik miesiąca w skrócie

| Pozycja | Kwota |
|---|---:|
| Saldo początkowe (wyliczone z pierwszej operacji) | 5 000,00 zł |
| Wpływy | 4 130,00 zł |
| Wypływy | 7 554,38 zł |
| Saldo końcowe | 1 575,62 zł |

Saldo zgadza się z końcowym z pliku (1 575,62 zł), więc żadnej operacji nie brakuje i żadna nie jest zdublowana.

## 4. Na co poszły pieniądze

Wypływy podzieliłem na to, co jest kosztem pracowni, i na to, co kosztem nie jest, bo to podatki, składki, przesunięcia albo pieniądze prywatne. Ta różnica jest dla księgowej najważniejsza.

| Grupa | Kwota | Udział w wypływach |
|---|---:|---:|
| Koszty pracowni | 3 138,42 zł | 41,5 % |
| Składki i podatki (ZUS, PIT-5) | 2 185,96 zł | 28,9 % |
| Pieniądze prywatne (wypłata na własne konto) | 2 000,00 zł | 26,5 % |
| Przesunięcie na rachunek VAT (to nie wydatek) | 230,00 zł | 3,0 % |
| Razem | 7 554,38 zł | 100 % |

Koszty pracowni po kategoriach:

| Kategoria | Kwota |
|---|---:|
| Czynsz | 1 500,00 zł |
| Materiały (glina) | 842,10 zł |
| Energia | 319,87 zł |
| Paliwo | 260,00 zł |
| Zakupy spożywcze (do wyjaśnienia) | 187,45 zł |
| Opłata za prowadzenie rachunku | 29,00 zł |
| Razem | 3 138,42 zł |

## 5. Pełne zestawienie operacji (do księgowej)

| Data | Kontrahent / opis | Wpływ | Wypływ | Kategoria | Co sprawdzić |
|---|---|---:|---:|---|---|
| 2 listopada | Kawiarnia Ziarno sp. z o.o., FV 21/2026, kubki | 1 230,00 | | Przychód (netto 1 000,00 + VAT 230,00) | Płatność w podzielonej płatności (MPP), VAT z tej faktury poszedł na rachunek VAT |
| 2 listopada | Przekazanie na rachunek VAT | | 230,00 | Przesunięcie własne | Nie jest kosztem. Pasuje do FV 21/2026 |
| 3 listopada | Glinka Hurt Toruń (karta) | | 842,10 | Materiały | Czy jest faktura z NIP-em. Bez niej nie ma odliczenia VAT |
| 5 listopada | Wspólnota Mieszkaniowa Lipowa 5, czynsz 11/2026 | | 1 500,00 | Czynsz | Czy jest faktura lub nota, czy w kwocie jest VAT |
| 7 listopada | Biedronka 1234 Warszawa (karta) | | 187,45 | Do wyjaśnienia | Co to było: firmowe (np. kawa na warsztaty) czy prywatne. Paragon bez NIP-u nie jest podstawą odliczenia VAT |
| 10 listopada | ZUS 10/2026 | | 1 773,96 | Składki ZUS | Nie koszt pracowni. Księgowa ujmuje to osobno (składki właściciela) |
| 12 listopada | Anna Prywatna, warsztaty ceramiczne 8.11 | 2 400,00 | | Przychód (warsztaty) | Kto to rozliczył: faktura, paragon z kasy fiskalnej albo rachunek. Jaka stawka VAT, czy kwota jest brutto |
| 17 listopada | Urząd Skarbowy, PIT-5 10/2026 | | 412,00 | Podatek (zaliczka) | Nie koszt. Data z przyszłości (patrz pkt 2) |
| 20 listopada | Wpływ bez tytułu i bez nadawcy | 500,00 | | Nieznany | Trzeba ustalić, od kogo i za co. Data z przyszłości |
| 21 listopada | Orlen Stacja 4411 (karta) | | 260,00 | Paliwo | Czy to auto firmowe i czy jest faktura z NIP-em. Odliczenie VAT zależy od tego, jak auto jest używane. Data z przyszłości |
| 25 listopada | Energa Obrót, FV 118/2026 energia | | 319,87 | Energia | Do którego miesiąca należy faktura. Data z przyszłości |
| 28 listopada | Katarzyna Testowa, "wypłata" | | 2 000,00 | Prywatne | Przelew na Twoje osobiste konto (inny numer niż firmowe). To nie koszt i nie pensja. Data z przyszłości |
| 30 listopada | Opłata za prowadzenie rachunku | | 29,00 | Opłata bankowa | Bez VAT. Data z przyszłości |

## 6. Co jest do wyjaśnienia (kolejność ważności)

1. Daty z przyszłości: sześć operacji z 17-30 listopada (pkt 2).
2. Wpływ 500,00 zł z 20 listopada bez nadawcy i tytułu. Księgowa nie może go ująć, dopóki nie wiadomo, co to jest.
3. Przychód 2 400,00 zł od osoby prywatnej. Przy sprzedaży osobom fizycznym zwykle potrzebna jest ewidencja na kasie fiskalnej albo faktura na życzenie. Upewnij się, że sprzedaż jest gdzieś udokumentowana.
4. Faktury kosztowe: glina, czynsz, paliwo, energia. Bez faktur z Twoim NIP-em księgowa nie odliczy VAT, a część wydatków może nie wejść w koszty.
5. Biedronka, 187,45 zł: firmowe czy prywatne.
6. Rachunek VAT: z pliku widać tylko, że 230,00 zł przeszło na VAT. Historii samego rachunku VAT tu nie ma. Żeby rozliczyć VAT, księgowa będzie potrzebowała osobnego wyciągu z tego rachunku.

## 7. Czego nie sprawdziłem i ryzyka

- Nie mam faktur, więc nie wiem, ile VAT naliczonego jest w kosztach. Podałem kwoty brutto z banku.
- Podział na "koszt" i "nie koszt" to moja propozycja porządkowa, a nie decyzja podatkowa. Ostateczne ujęcie (zwłaszcza ZUS, paliwo, Biedronka) ustali księgowa.
- Zakładam, że prowadzisz jednoosobową działalność (nazwa konta wskazuje na JDG), dlatego przelew "wypłata" traktuję jako wypłatę prywatną.
- Gdy pobierzesz pełny wyciąg po 30 listopada, mogę przeliczyć wszystko jeszcze raz i przygotować gotowy plik Excel.
