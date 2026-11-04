# WZÓR FORMY: macierz odpowiedzialności firma-biuro

> **To jest wzór formy, nie dokument do podmiany nazw.** Każde pole zależne
> od realiów firmy zawiera opis tego, co ma się w nim znaleźć, a nie gotową
> treść. Zrobiono tak celowo:
> wypełniona przykładowa macierz z nazwiskami, godzinami i ścieżkami folderów
> trafiałaby do dokumentów klientów w niezmienionej postaci, opisując osoby,
> których u nich nie ma.
>
> Treść budujesz w rozmowie ze skillem, na podstawie wywiadu z sekcji 1
> `references/komponenty.md`. Czego użytkownik nie wie, zostaje jako
> `[UZUPEŁNIJ: ...]` i wchodzi na listę braków, a nie znika.

---

## Metryczka (obowiązkowa na początku dokumentu)

```
Wersja: 1.0    Data: [UZUPEŁNIJ: data słownie, np. 24 sierpnia 2026]
Właściciel dokumentu: [UZUPEŁNIJ: imię i nazwisko, rola]
Zakres: [UZUPEŁNIJ: nazwa firmy, oddziały lub spółki objęte dokumentem]
Następny przegląd: [UZUPEŁNIJ: data; rekomendacja: co 12 miesięcy oraz po
każdej zmianie programu do fakturowania, zmianie biura rachunkowego, zmianie
osoby odpowiedzialnej i po każdym zdarzeniu awaryjnym]
Historia zmian: 1.0 utworzenie
Stan prawny na dzień: [data z references/stan-prawny.md]; terminy, tryby
i wymogi zweryfikuj przed wdrożeniem pod adresami z sekcji „Źródła”.

PROJEKT do zatwierdzenia przez właściciela firmy lub osobę zarządzającą.
Przed wdrożeniem uzgodnij treść z biurem rachunkowym i z dostawcą programu do
fakturowania. Dokument przygotowany narzędziem wspierającym; za treść, za jej
zgodność z przepisami i za faktyczne działanie odpowiada firma.
```

## Kontekst (z wywiadu)

Trzy do pięciu zdań o tym, jak firma naprawdę pracuje: kto wystawia faktury
i w czym, ile ich jest miesięcznie, czy zdarzają się faktury wystawiane poza
biurem, co robi biuro rachunkowe i co o tym mówi umowa. Bez tego akapitu tabela
niżej jest zbiorem pustych ról.

## Do czego służy każda kolumna

| Kolumna | Co w niej wpisujesz |
|---|---|
| Czynność | jedna czynność, nie obszar; jeśli dwie osoby robią „to samo” na dwóch ścieżkach, to są dwa wiersze |
| Właściciel | imię i nazwisko jednej osoby albo nazwa jednego podmiotu; nigdy stanowisko, nigdy dwie osoby |
| Zastępca | imię i nazwisko; jeśli zastępcy nie ma, wpisujesz `[UZUPEŁNIJ: brak zastępcy, ryzyko ...]`, a nie zostawiasz pola pustego |
| Termin | konkretny rytm albo moment („codziennie do 16:00”, „do końca następnego dnia roboczego”), nie „na bieżąco” |
| Dowód wykonania | po czym za pół roku poznasz, że czynność wykonano: wpis, raport, zestawienie, podpisana karta |
| Uwagi | odesłanie do innego komponentu, data graniczna obowiązku, znane ryzyko |

## Macierz (wzór do wypełnienia)

| Czynność | Właściciel | Zastępca | Termin | Dowód wykonania | Uwagi |
|---|---|---|---|---|---|
| Wystawienie faktury sprzedażowej [UZUPEŁNIJ: ścieżka, np. program biurowy] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | numer nadany przez system, zapisany przy dokumencie | [UZUPEŁNIJ: liczba faktur miesięcznie] |
| Wystawienie faktury sprzedażowej [UZUPEŁNIJ: druga ścieżka, np. w terenie] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | numer nadany przez system | osobny wiersz, bo osobne ryzyko i osobny program |
| Potwierdzenie przyjęcia faktury przez system | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ: konkretna pora dnia] | [UZUPEŁNIJ: raport, zapis przeglądu] | jeśli dziś nikt tego nie robi, zapisz to wprost w Brakach |
| Reakcja na odrzucenie faktury | [UZUPEŁNIJ] | [UZUPEŁNIJ] | do końca następnego dnia roboczego | wpis w rejestrze odrzuceń | eskalacja po `[UZUPEŁNIJ: np. dwóch dniach roboczych]` |
| Pobranie faktur zakupowych | [UZUPEŁNIJ: firma czy biuro] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | zestawienie pobrań | obowiązek odbierania faktur w systemie od 1 lutego 2026 |
| Monitorowanie limitu 10 tys. zł w trakcie miesiąca | [UZUPEŁNIJ] | [UZUPEŁNIJ] | na bieżąco, przed każdą kolejną fakturą | zestawienie wartości brutto faktur miesiąca | tylko jeśli firma korzysta z wyjątku epizodycznego do końca 2026; obowiązek powstaje od faktury przekraczającej limit |
| Opisanie przelewu numerem KSeF | [UZUPEŁNIJ] | [UZUPEŁNIJ] | w zakresie objętym obowiązkiem | potwierdzenie przelewu z widocznym numerem | obowiązek od 1 stycznia 2027 i tylko przy spełnieniu przesłanek z komponentu 6; wcześniej praktyka dobrowolna |
| Kontrola płatności przychodzących bez numeru KSeF | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | notatka i kopia wiadomości do kontrahenta | wzór wiadomości w komponencie 6 |
| Decyzja o pracy bez dostępu do systemu | [UZUPEŁNIJ] | [UZUPEŁNIJ: kto decyduje po godzinach i w weekend] | niezwłocznie po stwierdzeniu braku dostępu | karta zdarzenia | brak osoby decyzyjnej po godzinach to najczęstsza luka |
| Rozpoznanie i zapisanie ogłoszonego trybu | [UZUPEŁNIJ] | [UZUPEŁNIJ] | w chwili stwierdzenia braku dostępu | karta zdarzenia, część A | cztery tryby, każdy z innym skutkiem |
| Przesłanie faktur z trybu offline24, niedostępności albo trybu awaryjnego | [UZUPEŁNIJ: jedna osoba na każdą ścieżkę] | [UZUPEŁNIJ] | wg trybu, patrz karta postępowania | numery nadane, wpisane do karty zdarzenia | **nie dotyczy awarii całkowitej ani faktur zwolnionych z przesłania przez ogłoszoną awarię całkowitą: tych faktur się nie przesyła i nie mają numerów KSeF** |
| Domknięcie zdarzenia w karcie zdarzenia | [UZUPEŁNIJ] | [UZUPEŁNIJ] | przed zamknięciem karty | podpisana karta zdarzenia | przy trybach z przesłaniem: po potwierdzeniu numerów; przy awarii całkowitej: po spisaniu listy faktur i treści ogłoszenia |
| Prowadzenie rejestru odrzuceń | [UZUPEŁNIJ] | [UZUPEŁNIJ] | na bieżąco | sam rejestr | przegląd raz na `[UZUPEŁNIJ]` |
| Przegląd matrycy uprawnień i certyfikatów | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ: np. co kwartał] | protokół przeglądu | obejmuje też pracowników biura pracujących na uprawnieniu pośrednim |
| Odebranie uprawnień osobie odchodzącej | [UZUPEŁNIJ] | [UZUPEŁNIJ] | w dniu zakończenia pracy | protokół przeglądu z datą | certyfikat na numer PESEL unieważnia jego właściciel, nie firma |
| Odebranie uprawnienia biuru przy rozwiązaniu umowy | [UZUPEŁNIJ] | [UZUPEŁNIJ] | w dniu rozwiązania umowy | protokół przeglądu | sprawdź i zapisz, którzy pracownicy biura tracą przez to dostęp |
| Sprawdzenie wizualizacji faktur u dostawcy programu | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | wydruki obu wariantów | jeden kod po przesłaniu, dwa kody przed przesłaniem w sytuacjach z karty postępowania |
| Archiwizacja i kopie własne faktur | [UZUPEŁNIJ] | [UZUPEŁNIJ] | [UZUPEŁNIJ] | opis miejsca kopii | zakres i okres do ustalenia z księgową |

## Podział firma-biuro w skrócie

Trzy do pięciu zdań prozą, w czasie teraźniejszym oznajmującym, napisanych tak,
żeby dało się to wysłać biuru mailem i uzyskać jedno zdanie potwierdzenia.
Wzorzec konstrukcji, do wypełnienia realiami firmy:

> Faktury sprzedaży wystawia [UZUPEŁNIJ: firma czy biuro], odpowiada za to
> w firmie [UZUPEŁNIJ], zastępuje go [UZUPEŁNIJ]. Firma sprawdza
> [UZUPEŁNIJ: co i jak często] i reaguje na odrzucenia w terminie
> [UZUPEŁNIJ]. Biuro [UZUPEŁNIJ: nazwa] wykonuje [UZUPEŁNIJ: zakres],
> nie wykonuje [UZUPEŁNIJ] i nie odpowiada za [UZUPEŁNIJ]. Decyzję o pracy bez
> dostępu do systemu podejmuje [UZUPEŁNIJ], a po godzinach pracy [UZUPEŁNIJ].
> Uprawnieniami zarządza [UZUPEŁNIJ].

## Punkty do uzgodnienia w umowie z biurem rachunkowym

Lista tematów do rozmowy z biurem i do przekazania prawnikowi, nie gotowe
zapisy. Minimum:

1. Jakie uprawnienie bezpośrednie ma biuro nadane dziś i w jakim zakresie
   (wystawianie, dostęp do faktur).
2. Czy biuro ma prawo dalszego przekazywania uprawnień własnym pracownikom
   i którzy pracownicy z niego dziś korzystają.
3. Komu i w jakim czasie biuro zgłasza zauważone odrzucenie albo brak faktury.
4. Jak biuro dokumentuje pobranie faktur zakupowych i w jakiej formie przekazuje
   zestawienie.
5. Kto odpowiada za terminowe przesłanie do systemu faktur wystawionych
   w trybie offline24, przy niedostępności albo w trybie awaryjnym.
6. Kto i w jakim terminie odbiera uprawnienie biura po rozwiązaniu umowy, jak
   firma to potwierdza i którzy pracownicy biura tracą wtedy dostęp.
7. Jak wygląda dostęp do dokumentów w razie sporu albo nagłego zakończenia
   współpracy.
8. Kto po stronie biura zastępuje opiekuna firmy i na jakim uprawnieniu pracuje.

## Braki do domknięcia

Wypisujesz tu wszystkie `[UZUPEŁNIJ]` z tabeli, **uporządkowane według pilności
względem dzisiejszej daty**: najpierw obowiązki już wymagalne, potem pozycje bez
terminu ustawowego, na końcu daty przyszłe.

| Brak | Kto domyka | Do kiedy | Pilność |
|---|---|---|---|
| [UZUPEŁNIJ: opis braku] | [UZUPEŁNIJ: imię i nazwisko] | [UZUPEŁNIJ: data] | [UZUPEŁNIJ: obowiązek już wymagalny / bez terminu ustawowego / termin przyszły z datą] |

## Źródła i data sprawdzenia

Sekcja obowiązkowa na końcu dokumentu. Wpisujesz konkretne adresy z rejestru
źródeł w `references/stan-prawny.md`, dobrane do tematów poruszonych w tym
dokumencie, oraz datę stanu prawnego. Dla macierzy odpowiedzialności to zwykle:
zakres obowiązkowego KSeF (harmonogram, odbieranie faktur, limit 10 tys. zł),
cztery tryby szczególne, uprawnienia i podmiot uprawniony, numer KSeF
i identyfikator zbiorczy w płatnościach. Sama domena nie wystarcza.
