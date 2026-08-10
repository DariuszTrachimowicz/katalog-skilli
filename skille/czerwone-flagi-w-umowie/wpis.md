---
nazwa: Czerwone flagi w umowie
kategoria: Prawo
status: gotowy
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Czyta umowę, którą masz podpisać, i mówi po ludzku, na co uważać. Na koniec daje gotowe pytania do prawnika.
szukaj: umowa, kontrakt, NDA, prawnik, ryzyko, kara umowna, zakaz konkurencji, freelancer, B2B, najem
tytulSeo: Na co uważać w umowie B2B — darmowe narzędzie AI po polsku
opisSeo: Wgraj umowę i zobacz prostym językiem, które zapisy są ryzykowne. Kary umowne, zakaz konkurencji, prawa autorskie, ukryty etat. Za darmo, po polsku.
zgodnosc:
  claude: ok
  gpt: format
  gemini: brak
---

## Co robi

Czyta umowę, którą masz podpisać, i mówi po ludzku, na co uważać — z podziałem na ryzyka poważne, warte negocjacji i po prostu typowe. Na koniec daje gotowe pytania do prawnika, które możesz skopiować w mail.

## Dla kogo

Właściciele małych firm, freelancerzy, graficy, programiści, kierownicy biur, kadrowe, biura rachunkowe. Każdy, kto regularnie dostaje umowy do podpisu, a nie ma pod ręką prawnika.

## Ile Ci to oszczędza

Pierwsze czytanie umowy zajmuje zwykle 40–60 minut i kończy się poczuciem, że i tak się czegoś nie zauważyło. Ze skillem to pięć minut do listy konkretnych punktów.

Nie zastępuje prawnika — ale sprawia, że rozmowa z nim trwa 20 minut zamiast dwóch godzin, bo przychodzisz z pytaniami zamiast z plikiem.

## Przykład z życia

Anna prowadzi jednoosobową działalność jako grafik. Dostaje dwunastostronicową umowę od agencji.

Skill w kilka minut pokazuje, że kara umowna wynosi 2 000 zł za każdy dzień opóźnienia i nie ma żadnego górnego limitu — przy wynagrodzeniu 9 800 zł miesięcznie pięć dni zwłoki kosztuje więcej niż cały miesiąc pracy. Że zakaz konkurencji obowiązuje 24 miesiące po zakończeniu współpracy, na terenie całej Unii, bez wynagrodzenia. I że umowa odsyła do Załącznika nr 1, którego nikt nie dołączył.

Anna idzie do prawnika z pięcioma pytaniami, nie z plikiem PDF.

## Jak po polsku

Zbudowany wyłącznie pod polskie realia. Lista ryzyk obejmuje rzeczy, których nie znajdziesz w żadnym zagranicznym narzędziu: weksel in blanco, dobrowolne poddanie się egzekucji, fikcja doręczenia, biała lista VAT, znamiona ukrytego etatu przy współpracy B2B.

Jeśli umowa podlega prawu obcemu, skill powie to w pierwszym zdaniu i uprzedzi, że jego lista może nie mieć zastosowania — zamiast udawać, że analizuje prawo, którego nie zna.

## Czego potrzebujesz

Dowolny płatny plan Claude i umowa w pliku PDF, w Wordzie albo wklejona jako zwykły tekst. Nic poza tym — żadnych konektorów ani konfiguracji.

## Na czym się wywala

- **Słaby skan.** Jeśli PDF to zdjęcie kartki, jakość analizy zależy od tego, ile da się odczytać. Skill powie, co widzi — ale przy złym skanie lepiej przekleić tekst ręcznie.
- **Brakujące załączniki.** Zgłosi, że ich nie ma, ale nie wymyśli, co w nich było. Umowa, która całą treść wypycha do załączników, przejdzie analizę powierzchownie i tak to zostanie zaznaczone.
- **Umowy konsumenckie i regulaminy.** Poza zakresem — tam obowiązują dodatkowe przepisy ochronne, których ten skill nie sprawdza. Powie o tym, zamiast udawać, że umie.
- **Prawo obce.** Rozpozna i uprzedzi, ale nie przeanalizuje.

## Czego ten skill nie robi celowo

Nie pisze umów, nie proponuje poprawek, nie układa list rzeczy do wykreślenia, nie pisze maili do kontrahenta i nie odpowiada na pytanie „czy to jest zgodne z prawem". Jeśli poprosisz — odmówi i wróci do wyjaśniania.

To granica postawiona świadomie. Narzędzie, które generuje klauzule, wchodzi w buty prawnika, a odpowiedzialność za skutki zostawia Tobie. To narzędzie robi coś innego i uczciwszego: sprawia, że rozumiesz, co podpisujesz, i wiesz, o co zapytać.

## Jak powstał

Pierwsza wersja zawierała błąd. Napisaliśmy w niej, że termin płatności powyżej 60 dni „wymaga szczególnego uzasadnienia" — co jest prawdą tylko w ogólnym przypadku. Przy kliencie publicznym granica jest inna, a w części układów 60 dni to limit twardy, którego nie da się negocjować. Skill podpowiadałby ludziom walkę o coś, czego wywalczyć się nie da.

Wyszło to przy teście, w którym osobny model dostał zadanie obalić każde twierdzenie w pliku. Ten sam test wykrył trzy miejsca, w których dało się obejść granicę „nie piszę klauzul" — wystarczyło poprosić drugi raz.

Stąd zasada, która obowiązuje teraz w całym katalogu: **skill uzasadnia skutkiem, nigdy przepisem.** Nie „przekracza ustawową granicę", tylko „to bardzo długo jak na płatność między firmami — zapytaj prawnika, czy taki termin jest tu dopuszczalny". Dzięki temu narzędzie nie dezaktualizuje się przy każdej nowelizacji i nie wkłada w usta użytkownika twierdzeń, których nie da się obronić.
