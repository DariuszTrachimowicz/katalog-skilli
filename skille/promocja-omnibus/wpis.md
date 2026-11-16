---
nazwa: Promocja i najniższa cena z 30 dni
kategoria: E-commerce
status: gotowy
wersja: 1.0.0
poziom: Działa od razu
aktualizacja: 2026-11-15
skrot: Sprawdza baner, plakat, newsletter albo kartę produktu z obniżką ceny, liczy obniżkę od najniższej ceny z 30 dni i wskazuje, czego brakuje i co może wprowadzać w błąd.
korzysc: Wiesz, czy obniżka jest liczona od właściwej ceny i czego brakuje przy cenie, zanim promocja wyjdzie.
szukaj: Omnibus, najniższa cena z 30 dni, obniżka, promocja, przecena, Black Friday, UOKiK, Inspekcja Handlowa, przekreślona cena, rabat, wyprzedaż, sklep internetowy
tytulSeo: Najniższa cena z 30 dni przy promocji, jak sprawdzić baner i obniżkę, narzędzie AI
opisSeo: "Wklej baner albo mail z obniżką i historię cen. Skill liczy obniżkę od najniższej ceny z 30 dni i pokazuje, czego brakuje przy cenie."
zgodnosc:
  claude: ok
  gpt: ok
  gemini: brak
---

## Co robi

Bierze gotowy komunikat o obniżce: baner na stronę, plakat i etykiety do salonu, newsletter, post, gazetkę albo kartę produktu z przekreśloną ceną, razem z historią cen z panelu sklepu. Liczy skryptem najniższą cenę z 30 dni przed obniżką i obniżkę od niej, porównuje z tym, co obiecuje komunikat, i wypisuje uwagi z wagą: pilne, ważne, do rozważenia.

Wskazuje też miejsca, które mogą wprowadzać klientów w błąd: „-50 % na wszystko” przy wyłączonej kolekcji, „do -70 %” przy kilku produktach, przekreślona „cena regularna” zamiast najniższej, podpis „najniższa cena z ostatnich 30 dni”, którego UOKiK nie uznaje, objaśnienie pod gwiazdką. Na końcu daje listę pól, które muszą być widoczne przy cenie, i pytania do prawnika.

## Dla kogo

Dla sklepów internetowych i sieci salonów, osób od marketingu i e-commerce, właścicielek małych sklepów, agencji, które przygotowują kampanie dla klientów. Dla każdego, kto przed Black Friday, wyprzedażą albo promocją klubową chce sprawdzić komunikat, zanim zobaczy go klient albo inspektor.

## Ile Ci to oszczędza

Ręczne ustalenie najniższej ceny z 30 dni dla kilkunastu produktów, z liczeniem okna od właściwego dnia i procentów, to zwykle kilkadziesiąt minut i łatwo o pomyłkę o jeden dzień. Skrypt robi to w kilka sekund dla każdego produktu, a lista uwag pokazuje od razu, co poprawić przed publikacją.

Drugi zysk to mniej poprawek po kontroli. Inspekcja Handlowa nakłada kary także za naruszenie usunięte po kontroli, a UOKiK w 2025 i 2026 roku karał i stawiał zarzuty dużym sieciom właśnie za obniżki liczone od innej ceny i brak najniższej ceny przy reklamie.

## Przykład z życia

Ewa prowadzi sklep z odzieżą lnianą i w piątek 27 listopada startuje z Black Week. Baner: „-50 % NA WSZYSTKO! Sukienka Wera: 399 zł przekreślone, 199 zł”. W panelu widać, że sukienka kosztowała od 20 października do 10 listopada 299 zł, a od 11 listopada 399 zł; w sprzedaży jest od marca. Płaszcz Mira wszedł do sprzedaży 12 listopada za 690 zł, w promocji ma 490 zł.

Skill liczy: najniższa cena sukienki z 30 dni przed obniżką to 299 zł, więc obniżka od niej wynosi 33,4 %, nie 50 %. Płaszcz jest w sprzedaży krócej niż 30 dni, więc ceną odniesienia jest najniższa od wprowadzenia, a obniżka to 29 %. Pilne: brak najniższej ceny przy obu produktach i przekreślona cena inna niż najniższa. Ważne: „na wszystko”, choć regulamin promocji wyłącza nową kolekcję zimową; skill pyta, czy płaszcz do niej należy. Gotowego banera nie pisze, za to Ewa wie, co poprawić i jakie liczby wstawić.

## Jak po polsku

Skill pracuje na polskich zasadach informowania o cenach i na wyjaśnieniach Prezesa UOKiK o obniżkach, z datą stanu i rejestrem źródeł, sprawdzonych 15 listopada 2026. Zna szczegóły z praktyki: 30 dni kalendarzowych kończących się dzień przed obniżką, osobna reguła dla towaru w sprzedaży krócej niż 30 dni i dla towaru szybko psującego się, stopniowe obniżki liczone za każdym razem od nowa, cena klubowa jako cena odniesienia dla wszystkich, aplikacja jako osobny kanał, „3 w cenie 2” bez obowiązku, ale „trzeci taki sam 50 % taniej” już z obowiązkiem.

Zna też podpisy, które UOKiK uznaje i których nie uznaje, oraz uchybienia opisane w decyzjach i zarzutach z lat 2025-2026. Przy aktach prawnych umie sprawdzić w oficjalnej bazie Sejmu, czy coś się zmieniło od daty stanu.

## Czego potrzebujesz

Dowolny płatny plan Claude, treść komunikatu (tekst, zrzut ekranu albo plik) i historię cen każdego produktu z ostatnich 30 dni przed obniżką, na przykład z panelu sklepu. Bez konektorów i bez łączenia ze sklepem. Skill ma dwa małe skrypty: kalkulator obniżki i sprawdzanie aktualności przepisów; gdy rozmowa nie pozwala uruchamiać kodu, liczy ręcznie i pokazuje rachunek.

## Na czym się wywala

- **Liczy tylko z danych o cenach, które dostanie.** Jeśli w panelu brakuje dnia z inną ceną albo cena w aplikacji różniła się od ceny na stronie, wynik będzie błędny. Skill pyta o luki, ale nie sprawdzi panelu sam.
- **Nie widzi całej kampanii.** Ocenia komunikat, który dostał. Gwiazdki, karty produktów, gazetki i etykiety w salonie, których nie wkleisz, zostają poza oceną.
- **Nie rozstrzyga przypadków granicznych.** Nietypowe zestawy, programy z punktami czy promocje w sieci franczyzowej oznacza do sprawdzenia z prawnikiem, zamiast zgadywać.
- **Stan reguł ma datę.** Jeśli UOKiK zmieni wyjaśnienia albo zapadną nowe decyzje, skill będzie je znał dopiero po aktualizacji, a przepisy sprawdza na żywo tylko tam, gdzie może uruchomić kod z dostępem do sieci.

## Czego ten skill nie robi celowo

Nie pisze banerów, haseł, maili ani regulaminów promocji, nawet „na szybko”: w tekście promocyjnym każde słowo jest obietnicą sklepu, a ta należy do sprzedawcy. Nie mówi, że promocja jest zgodna z prawem albo że UOKiK się nie przyczepi, bo ocenia tylko to, co widzi. Nie wylicza kary dla Twojej firmy. Nie pomaga pokazać obniżki większej, niż wychodzi od najniższej ceny z 30 dni, ani schować tej ceny pod gwiazdką.

## Najczęstsze pytania

### Czy w newsletterze z promocją trzeba podawać najniższą cenę z 30 dni?

Tak, jeśli newsletter pokazuje obniżkę konkretnego produktu z ceną. Reguła obejmuje także reklamę z ceną, więc mail, post i baner z przekreśloną ceną albo procentem potrzebują ceny odniesienia: zwykle najniższej z 30 dni przed obniżką, a przy towarze krócej w sprzedaży albo szybko psującym się według osobnych reguł. Samo hasło bez produktu i ceny jej nie wymaga.

### Od jakiej ceny liczyć procent obniżki?

Zwykle od najniższej ceny z 30 dni przed obniżką, a nie od ceny regularnej czy sugerowanej; przy towarze w sprzedaży krócej niż 30 dni od najniższej ceny od wprowadzenia, a przy szybko psującym się od ceny sprzed pierwszej obniżki. Skill liczy to skryptem z historii cen i pokazuje, ile wynosi obniżka naprawdę, gdy komunikat podaje inny procent.

### Jaki podpis dać przy najniższej cenie?

UOKiK wymienia „najniższa cena z 30 dni przed obniżką” albo równoważny podpis, a przy towarze w sprzedaży krócej niż 30 dni „najniższa cena od wprowadzenia towaru”. Za niedopuszczalne uznaje między innymi „cena referencyjna”, „cena omnibus”, „było” i „najniższa cena z ostatnich 30 dni”. Skill wskazuje podpis, ale banera nie pisze.

### Czy skill powie mi, że promocja jest zgodna z prawem?

Nie. Skill liczy obniżkę, wskazuje braki i miejsca, które mogą wprowadzać w błąd, z wagą i skutkiem, oraz przygotowuje pytania do prawnika. Zgodności całej promocji nie przesądza, bo widzi tylko to, co dostał, a ocenę wydaje inspekcja, UOKiK albo sąd.

### Ile może wynosić kara za brak najniższej ceny?

Inspekcja Handlowa może nałożyć do 20 000 zł, a przy trzech naruszeniach w roku do 40 000 zł; UOKiK przy praktyce wobec wielu klientów do 10 % rocznego obrotu. To ogólne maksima według stanu z 15 listopada 2026. Kary dla konkretnej firmy skill nie wylicza.

### Na czym działa ten skill?

Na Claude z dowolnym płatnym planem, bez konektorów i bez łączenia ze sklepem. Wklejasz komunikat i historię cen, dostajesz rachunek i listę uwag. Skrypty działają tam, gdzie Claude może uruchamiać kod; bez tego skill liczy ręcznie i pokazuje rachunek.
