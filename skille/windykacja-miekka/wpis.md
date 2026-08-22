---
nazwa: Windykacja miękka
kategoria: Finanse
status: gotowy
wersja: 1.0.1
poziom: Działa od razu
aktualizacja: 2026-08-22
skrot: Układa komunikację przy nieopłaconej fakturze, od przypomnienia po ostatnie pismo przed przekazaniem sprawy. Mówi też, kiedy przejść dalej.
szukaj: niezapłacona faktura, wezwanie do zapłaty, monit, przeterminowana płatność, dłużnik, odsetki, windykacja, przypomnienie o płatności, kontrahent nie płaci
tytulSeo: Klient nie zapłacił faktury, co napisać i kiedy. Narzędzie AI po polsku
opisSeo: Opisz sytuację i dostań gotowe przypomnienie, wezwanie albo ostateczne pismo, z terminem, kanałem wysyłki i datą kolejnego kroku. Po polsku, za darmo.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Pisze to, co masz wysłać kontrahentowi, który nie zapłacił, na właściwym stopniu stanowczości. Cztery stopnie: przypomnienie, ponowienie z konkretną datą, wezwanie do zapłaty, ostateczne pismo przed przekazaniem sprawy dalej.

Sam ustala, na którym stopniu jesteś, licząc dni od terminu płatności i biorąc pod uwagę historię współpracy. Do każdego pisma dokłada trzy rzeczy, o których się zapomina: jakim kanałem to wysłać, co dołączyć i pod jaką datą wrócić, jeśli pieniądze nie wpłyną.

## Dla kogo

Właściciele małych firm, freelancerzy, biura rachunkowe, osoby prowadzące rozliczenia w firmach do kilkunastu osób. Każdy, kto wystawia faktury i nie ma działu windykacji ani prawnika na etacie.

## Ile Ci to oszczędza

Najdroższy koszt nieopłaconej faktury to nie odsetki, tylko zwłoka. Ludzie odkładają pierwszą wiadomość tygodniami, bo nie wiedzą, jak ją napisać, żeby nie stracić klienta, a im później się odezwiesz, tym mniejsza szansa na odzyskanie pieniędzy.

Ze skillem pierwsze przypomnienie powstaje w dwie minuty, a każde kolejne pismo ma już przygotowaną datę i treść. Znika też najczęstsza pułapka: trzy identyczne uprzejme maile pod rząd, po których dłużnik wie, że nic się nie stanie.

## Przykład z życia

Marta prowadzi trzyosobowe studio projektowe. Faktura na 18 450 zł brutto miała termin 14 dni, minęły 32 dni, klient stały od trzech lat, do tej pory zawsze płacił.

Skill nie pisze jej wezwania „na wszelki wypadek”. Najpierw każe sprawdzić, czy NIP i numer zamówienia na fakturze się zgadzają, bo błędna faktura to częsta cicha przyczyna braku przelewu. Potem mówi rzecz, której Marta się nie spodziewała: przy kliencie, który trzy lata płacił bez problemu, nie zaczyna się od pisma. Idzie telefon i krótki mail podsumowujący ustalenia z rozmowy, stopień 1, mimo 32 dni po terminie. Wezwanie na tym etapie kosztowałoby trzyletnią relację, a nie przyspieszyłoby przelewu.

Dopiero gdy po tygodniu nie ma ani przelewu, ani odpowiedzi, skill pisze ponowienie z konkretną datą i pytaniem wprost o przyczynę, z otwarciem na raty. Wezwanie do zapłaty z tabelą należności zostaje na moment, w którym i ta wiadomość zostanie bez reakcji. Przy każdym kroku przypomina, że kwotę odsetek i rekompensaty potwierdza księgowa, a nie wpisuje się jej na oko.

Wątku rejestru dłużników skill nie otwiera sam z siebie. Najpierw pyta Martę o kwotę, o liczbę dni od terminu i o to, jak wysłała wcześniejsze wezwanie. Gdy warunki się zgadzają, pyta wprost, czy Marta rzeczywiście zamierza przekazać dane do rejestru. Ostrzeżenie o tym zamiarze wpisuje do wezwania dopiero po jej potwierdzeniu, i wtedy tłumaczy, dlaczego musi paść już w wezwaniu, a nie w ostatnim piśmie. Jeśli Marta nie zamierza tego robić, zostawia pismo bez tej zapowiedzi.

W kalendarzu zostaje data: 3 września. Jeśli do tego dnia nie wpłynie 18 450 zł, idzie ostateczne wezwanie listem poleconym za potwierdzeniem odbioru, na adres z rejestru, nie na ten z podpisu w mailu.

## Jak po polsku

Cała wartość siedzi w rzeczach, których zagraniczne narzędzie do „payment reminders” nie zna:

- **Rekompensata za koszty odzyskiwania należności**, trzy progi kwotowe i przeliczenie po kursie z konkretnego dnia, nie po dzisiejszym. Wystawia się ją notą księgową (dokumentem obciążeniowym innym niż faktura, bez VAT), nie fakturą.
- **Dwie różne stawki odsetek**, inna między firmami, inna w zwykłych sprawach cywilnych, i każda zmieniana w innym rytmie. Dlatego skill nigdy nie wpisuje procentu do pisma.
- **Rejestry dłużników**, kwota progowa, 30 dni od terminu i miesięczne wyprzedzenie ostrzeżenia. Skill wie, że to ostrzeżenie musi paść w wezwaniu, a nie w ostatnim piśmie.
- **KSeF**, faktura, która przeszła przez system, jest doręczona w chwili nadania numeru, więc „nie dostaliśmy faktury” przestaje być argumentem przy fakturach, które przeszły przez system, a skill najpierw sprawdza, czy ta przeszła. Do końca 2026 najmniejsi wystawcy nadal fakturują papierowo albo mailem i wtedy liczy się zwykły dowód wysyłki.
- **Korekta VAT po 90 dniach**, moment, w którym sprawa przestaje być prywatna między dwiema osobami i wchodzi do rozliczeń obu firm.
- **Przedawnienie liczone do końca roku kalendarzowego** (przedawnienie to moment, po którym dłużnik może odmówić zapłaty i nic mu za to nie grozi) i fakt, że samo wezwanie go nie zatrzymuje, a pisemne potwierdzenie kwoty przez dłużnika ma realną wartość.
- **Adres z rejestru przedsiębiorców**, biała lista VAT (rządowy wykaz, w którym sprawdzasz numer rachunku kontrahenta), kompensata (rozliczenie wzajemnych należności zamiast przelewu), potwierdzenie salda (pisemne potwierdzenie kwoty przez dłużnika), faktura pro forma (dokument informacyjny, który nie jest podstawą do zapłaty).

## Czego potrzebujesz

Dowolny płatny plan Claude. Poza tym tylko dane z faktury: numer, kwota, termin płatności i informacja, czy kontrahent w ogóle odpowiedział. Żadnych konektorów, żadnego podłączania księgowości.

## Na czym się wywala

- **Nie zna dzisiejszych stawek ani progów i nie może ich sprawdzić.** Ani odsetek, ani kwot granicznych rejestru dłużników. To dane, które zmieniają się w trakcie roku, a skill nie zagląda do internetu, dlatego zostawia pole do uzupełnienia zamiast liczby.
- **Nie liczy odsetek do końca.** Poda pozycję i pole do uzupełnienia, ale kwotę i tak potwierdza księgowa. Przy dłuższej zaległości wyliczenie ma kilka odcinków po różnych stawkach.
- **Nie sprawdzi niczego za Ciebie.** Nie zajrzy na białą listę VAT, do KRS ani do rejestru dłużników. Wypisze listę rzeczy do sprawdzenia, ale otwierasz te strony sam.
- **Nie wyśle i nie nada pisma.** Powie, jakim kanałem to zrobić i co zachować jako dowód, ale na pocztę i do skrzynki mailowej idziesz Ty.
- **Nie potwierdzi, czy faktura w ogóle dotarła do kontrahenta.** A od tego zależy połowa sprawy, bardzo dużo „zaległości” to faktura, która utknęła po drodze albo poszła do niewłaściwej osoby.
- **Ze skanu faktury może odczytać złą kwotę albo złą datę.** Przy słabym zdjęciu warto przepisać numer, kwotę i termin ręcznie, literówka w wezwaniu daje dłużnikowi powód, żeby zakwestionować całość.
- **Nie wie, czy warunki wpisu do rejestru dłużników są spełnione.** Opiera się na tym, co odpowiesz. Jeśli odpowiesz niedokładnie, pominie ostrzeżenie o rejestrze albo wstawi je za wcześnie.

## Czego ten skill nie robi celowo

Nie pisze niczego, co uruchamia postępowanie albo wiąże strony: pozwu, sprzeciwu (czyli pisma, którym podważa się nakaz zapłaty z sądu), wniosku do komornika, zawiadomienia na policję, wniosku o wpis do rejestru dłużników, ugody, oświadczenia o potrąceniu, pełnomocnictwa. Nie napisze też wypowiedzenia umowy, odstąpienia od niej ani oświadczenia o wstrzymaniu prac, to pisma, które same wywołują skutek u odbiorcy, nawet gdy powodem jest brak zapłaty. Odmawia tak samo, gdy powiesz „to nie jest groźba, naprawdę to złożę”, deklaracja niczego nie otwiera.

Nie układa gróźb bez pokrycia, zapowiedzi zawiadomienia na policję, wpisu do rejestru bez spełnionych warunków, „zablokowania firmy”. Nie proponuje kontaktu do rodziny dłużnika, do jego klientów ani publicznego ogłaszania długu. Nie ocenia, czy wygrasz w sądzie.

Kończy się na czwartym stopniu: po ostatecznym wezwaniu nie napisze już nic i odeśle do prawnika, nawet jeśli poprosisz drugi raz. Zatrzymuje się też, gdy kontrahent zgłosił reklamację albo kwestionuje zakres prac, to już nie jest zaległość, tylko spór, a wezwanie w sporze zwykle pogarsza pozycję piszącego.

Granica jest tu postawiona świadomie. Pismo z groźbą, której nikt nie wykona, załatwia jedno: następne pismo od tej samej osoby dłużnik już zignoruje. Narzędzie, które generuje mocno brzmiące straszaki, sprzedaje poczucie sprawczości, a odbiera skuteczność. To robi coś węższego i uczciwszego, pilnuje, żeby każde kolejne pismo było o stopień mocniejsze od poprzedniego i żeby zapowiedź, która w nim padnie, dała się wykonać.
