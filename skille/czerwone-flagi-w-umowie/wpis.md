---
nazwa: Czerwone flagi w umowie
kategoria: Prawo
status: gotowy
wersja: 1.0.2
poziom: Działa od razu
aktualizacja: 2026-11-05
skrot: Czyta umowę, którą masz podpisać, i mówi po ludzku, na co uważać. Na koniec daje gotowe pytania do prawnika.
korzysc: Wiesz, na co uważać w umowie, zanim ją podpiszesz, i idziesz do prawnika z gotowymi pytaniami.
szukaj: umowa, kontrakt, prawnik, ryzyko, kara umowna, zakaz konkurencji, freelancer, B2B, najem
tytulSeo: Na co uważać w umowie B2B, darmowe narzędzie AI po polsku
opisSeo: Wgraj umowę i zobacz prostym językiem, które zapisy są ryzykowne. Kary umowne, zakaz konkurencji, prawa autorskie, ukryty etat. Za darmo, po polsku.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Czyta umowę, którą masz podpisać, i mówi po ludzku, na co uważać, z podziałem na ryzyka poważne, warte negocjacji i po prostu typowe. Na koniec daje gotowe pytania do prawnika, które możesz skopiować w mail.

## Dla kogo

Właściciele małych firm, freelancerzy, graficy, programiści, kierownicy biur, kadrowe, biura rachunkowe. Każdy, kto regularnie dostaje umowy do podpisu, a nie ma pod ręką prawnika.

## Ile Ci to oszczędza

Pierwsze czytanie umowy zajmuje zwykle 40-60 minut i kończy się poczuciem, że i tak się czegoś nie zauważyło. Ze skillem to pięć minut do listy konkretnych punktów.

Nie zastępuje prawnika, ale sprawia, że rozmowa z nim trwa 20 minut zamiast dwóch godzin, bo przychodzisz z pytaniami zamiast z plikiem.

## Przykład z życia

Anna prowadzi jednoosobową działalność jako grafik. Dostaje dwunastostronicową umowę od agencji.

Skill w kilka minut pokazuje, że kara umowna wynosi 2 000 zł za każdy dzień opóźnienia i nie ma żadnego górnego limitu, przy wynagrodzeniu 9 800 zł miesięcznie pięć dni zwłoki kosztuje więcej niż cały miesiąc pracy. Że zakaz konkurencji obowiązuje 24 miesiące po zakończeniu współpracy, na terenie całej Unii, bez wynagrodzenia. I że umowa odsyła do Załącznika nr 1, którego nikt nie dołączył.

Anna idzie do prawnika z pięcioma pytaniami, nie z plikiem PDF.

## Jak po polsku

Zbudowany wyłącznie pod polskie realia. Lista ryzyk obejmuje rzeczy, których nie znajdziesz w żadnym zagranicznym narzędziu: weksel in blanco, dobrowolne poddanie się egzekucji, fikcja doręczenia, biała lista VAT, znamiona ukrytego etatu przy współpracy B2B.

Jeśli umowa podlega prawu obcemu, skill powie to w pierwszym zdaniu i uprzedzi, że jego lista może nie mieć zastosowania, zamiast udawać, że analizuje prawo, którego nie zna.

## Czego potrzebujesz

Dowolny płatny plan Claude i umowa w pliku PDF, w Wordzie albo wklejona jako zwykły tekst. Nic poza tym, żadnych konektorów ani konfiguracji.

## Na czym się wywala

- **Słaby skan.** Jeśli PDF to zdjęcie kartki, jakość analizy zależy od tego, ile da się odczytać. Skill powie, co widzi, ale przy złym skanie lepiej przekleić tekst ręcznie.
- **Brakujące załączniki.** Zgłosi, że ich nie ma, ale nie wymyśli, co w nich było. Umowa, która całą treść wypycha do załączników, przejdzie analizę powierzchownie i tak to zostanie zaznaczone.
- **Umowy konsumenckie i regulaminy.** Poza zakresem, tam obowiązują dodatkowe przepisy ochronne, których ten skill nie sprawdza. Powie o tym, zamiast udawać, że umie.
- **Prawo obce.** Rozpozna i uprzedzi, ale nie przeanalizuje.

## Czego ten skill nie robi celowo

Nie pisze umów, nie proponuje poprawek, nie układa list rzeczy do wykreślenia, nie pisze maili do kontrahenta i nie odpowiada na pytanie „czy to jest zgodne z prawem”. Jeśli poprosisz, odmówi i wróci do wyjaśniania.

To granica postawiona świadomie. Narzędzie, które generuje klauzule, wchodzi w buty prawnika, a odpowiedzialność za skutki zostawia Tobie. To narzędzie robi coś innego i uczciwszego: sprawia, że rozumiesz, co podpisujesz, i wiesz, o co zapytać.

## Jak powstał

Pierwsza wersja zawierała błąd. Napisaliśmy w niej, że termin płatności powyżej 60 dni „wymaga szczególnego uzasadnienia”, co jest prawdą tylko w ogólnym przypadku. Przy kliencie publicznym granica jest inna, a w części układów 60 dni to limit twardy, którego nie da się negocjować. Skill podpowiadałby ludziom walkę o coś, czego wywalczyć się nie da.

Wyszło to przy teście, w którym osobny model dostał zadanie obalić każde twierdzenie w pliku. Ten sam test wykrył trzy miejsca, w których dało się obejść granicę „nie piszę klauzul”, wystarczyło poprosić drugi raz.

Stąd zasada, która obowiązuje teraz w całym katalogu: **skill uzasadnia skutkiem, nigdy przepisem.** Nie „przekracza ustawową granicę”, tylko „to bardzo długo jak na płatność między firmami, zapytaj prawnika, czy taki termin jest tu dopuszczalny”. Dzięki temu narzędzie nie dezaktualizuje się przy każdej nowelizacji i nie wkłada w usta użytkownika twierdzeń, których nie da się obronić.

## Najczęstsze pytania

### Czy AI sprawdzi mi umowę przed podpisaniem?

Tak, czyta umowę i dzieli ryzyka na poważne, warte negocjacji i typowe. Przy każdym podaje miejsce w dokumencie, krótki cytat, wyjaśnienie po ludzku i pytanie do zadania, a na samej górze odpowiedzi dostajesz 3-5 gotowych pytań do prawnika, które skopiujesz w mail.

### Czy napisze mi poprawki do umowy albo maila do kontrahenta?

Nie, nie pisze umów, klauzul ani poprawek, nie układa listy rzeczy do wykreślenia i nie pisze maili do kontrahenta, także gdy poprosisz drugi raz. Zamiast tego tłumaczy, co dany zapis oznacza w praktyce, i przygotowuje pytanie, które zadasz prawnikowi albo drugiej stronie.

### Jakie umowy mogę w ten sposób sprawdzić?

Umowy między firmami, w tym B2B, umowy zlecenia i o dzieło, umowy z freelancerami i najem. Umowy konsumenckie i regulaminy są poza zakresem, a samodzielne NDA obsługuje osobny skill „Przed podpisem NDA”. Umowę wgrywasz w PDF, w Wordzie albo wklejasz jako zwykły tekst.

### Czy sprawdzi umowę, która podlega prawu obcemu?

Nie przeanalizuje jej, ale rozpozna to i powie w pierwszym zdaniu. Lista ryzyk jest zbudowana pod polskie realia, takie jak weksel in blanco, dobrowolne poddanie się egzekucji czy znamiona ukrytego etatu przy współpracy B2B, więc przy innym prawie może nie mieć zastosowania.

### Co, jeśli umowa odsyła do załącznika, którego nie dostałem?

Skill zgłosi, że załącznika brakuje, ale nie wymyśli, co w nim było. Gdy umowa wypycha większość treści do załączników, analiza wyjdzie powierzchowna i zostanie to wprost zaznaczone. Przy słabym skanie, na przykład zdjęciu kartki, lepiej wkleić tekst ręcznie.

### Czy to darmowe i na jakim planie działa?

Tak, skill jest darmowy na licencji GPL, a plik `.skill` dostajesz linkiem na e-mail po podaniu adresu na karcie skilla. W Claude działa na dowolnym płatnym planie, w ChatGPT wymaga planu Business, Enterprise, Edu lub Healthcare, a w Gemini w Polsce instrukcje wkleja się do rozmowy albo Gema.
