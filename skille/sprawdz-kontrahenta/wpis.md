---
nazwa: Sprawdź kontrahenta
kategoria: Prawo
status: gotowy
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Prowadzi krok po kroku przez sprawdzenie nowej firmy przed umową i pierwszą płatnością, rejestry, kto może podpisać, biała lista VAT, zgodność danych.
szukaj: kontrahent, weryfikacja firmy, KRS, CEIDG, biała lista VAT, NIP, zaliczka, reprezentacja spółki, oszustwo na fakturę, nowy klient
tytulSeo: Jak sprawdzić kontrahenta przed umową, lista kroków po polsku
opisSeo: Nowa firma chce zaliczkę? Zobacz, co sprawdzić i gdzie. KRS, CEIDG, biała lista VAT, kto może podpisać za spółkę. Lista do odklikania, po polsku.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: brak
---

## Co robi

Prowadzi Cię przez sprawdzenie nowej firmy, zanim podpiszesz z nią umowę albo wyślesz pierwsze pieniądze. Mówi, w którym rejestrze kliknąć, czego dokładnie tam szukać i z czym to porównać w umowie i na fakturze.

Kiedy wrócisz z wynikami, wklejonym odpisem, zrzutem ekranu z białej listy, fakturą, zestawia to z Twoimi dokumentami i wypisuje rozbieżności oraz pytania do zadania kontrahentowi.

Nie sprawdza za Ciebie i nie wyszukuje firmy na własną rękę, wynik z wyszukiwarki nie jest odpisem z rejestru i nie da Ci identyfikatora zapytania z białej listy, czyli jedynej rzeczy, którą można potem komuś pokazać. Klikanie zostaje po Twojej stronie, a skill mówi to w pierwszym zdaniu, zamiast pozwolić Ci założyć coś innego.

## Dla kogo

Właściciele małych firm, freelancerzy, biura rachunkowe, kierownicy biur, osoby prowadzące zakupy w małej firmie. Każdy, kto co jakiś czas zaczyna współpracę z firmą, której nie zna, i nie ma za sobą działu ryzyka.

## Ile Ci to oszczędza

Sprawdzenie nowego kontrahenta to zwykle 30-45 minut szukania i klikania po sześciu różnych stronach, z których każda pokazuje co innego, i tak z poczuciem, że pewnie się czegoś nie zauważyło. Klikanie zostaje po Twojej stronie i skill go nie skraca. Skraca resztę: nie szukasz, w którym rejestrze jest dana rzecz, nie zastanawiasz się, na które pole patrzeć, i nie porównujesz danych z umowy ręcznie. Zostaje kwadrans i lista, na której widać, co się nie zgadza.

Największa oszczędność jest gdzie indziej: w tym, że sprawdzasz w ogóle. Weryfikacja nowego kontrahenta najczęściej nie jest robiona źle, najczęściej nie jest robiona wcale, bo nikt nie wie, od czego zacząć.

## Przykład z życia

Marek prowadzi warsztat stolarski. Dzwoni do niego nowa spółka z zamówieniem na zabudowę biura za 48 000 zł brutto. Marek ma dostać 20 000 zł zaliczki przed startem, resztę po odbiorze.

Skill układa listę i Marek przechodzi przez nią w kwadrans. Wychodzą trzy rzeczy. Spółka jest wpisana do rejestru sześć tygodni temu, z kapitałem 5 000 zł, przy 28 000 zł, które mają wpłynąć dopiero po pracy, ta proporcja coś znaczy. W rejestrze stoi, że reprezentować mogą tylko dwaj członkowie zarządu razem, a umowę przysłano podpisaną przez jednego. A nazwa spółki na umowie różni się jednym słowem od tej, którą podano w zamówieniu, i NIP też jest inny, to dwa różne podmioty, więc nie wiadomo, komu Marek ma wystawić fakturę i od kogo miałby dochodzić zapłaty.

Marek nie wie, czy to oszustwo, i skill mu tego nie powie. Wysyła trzy pytania mailem. Odpowiedź na pierwsze przychodzi po tygodniu, na dwa pozostałe nie przychodzi wcale.

## Jak po polsku

Zbudowany wyłącznie pod polskie rejestry i polskie sposoby, w jakie takie transakcje się psują. Zagraniczne narzędzia do weryfikacji dostawców nie znają żadnej z tych rzeczy:

- **biała lista VAT**, sprawdzanie rachunku na dzień zlecenia przelewu, identyfikator zapytania jako dowód, granica 15 000 zł liczona dla całej transakcji, a nie dla pojedynczej faktury, oraz to, że rachunków osobistych w wykazie nie ma, a rachunek wirtualny wprawdzie nie jest tam osobną pozycją, ale po wpisaniu numeru wyszukiwarka pokaże, do jakiej firmy jest podpięty,
- **sposób reprezentacji z KRS**, reprezentacja łączna, czyli podpisać muszą co najmniej dwie osoby naraz, prokura samoistna i łączna, czyli czy prokurent (osoba z szerokim, wpisanym do rejestru pełnomocnictwem) podpisuje sam, czy tylko z kimś, komplementariusz kontra komandytariusz, czyli wspólnik, który prowadzi spółkę, kontra ten, który tylko włożył w nią pieniądze, i to, że pełnomocnictw w KRS nie ma wcale,
- **podział KRS, CEIDG, spółka cywilna**, w której stroną umowy są wspólnicy, a nie spółka,
- **Krajowy Rejestr Zadłużonych** (upadłości, restrukturyzacje i sprawy, w których komornik nie miał z czego ściągnąć długu), **Repozytorium Dokumentów Finansowych** (miejsce, gdzie spółki składają sprawozdania), **CRBR** (rejestr osób, które naprawdę stoją za spółką), **VIES** (unijna wyszukiwarka numerów VAT), **wyszukiwarka REGON** (dane statystyczne firmy i to, czym się zajmuje), z informacją, co każdy z nich naprawdę pokazuje,
- **limit gotówki 15 000 zł między firmami** i to, co się dzieje z kosztem po jego przekroczeniu,
- **kontekst 2026**, faktury w KSeF (rządowy system, przez który krążą faktury) i to, dlaczego literówka w NIP-ie przestała być drobiazgiem, oraz adresy do e-Doręczeń (urzędowy adres elektroniczny firmy) przy ustalaniu, gdzie wysyłać pisma.

## Czego potrzebujesz

Dowolny płatny plan Claude. Umowa, faktura albo sama nazwa i NIP firmy, wystarczy wpisać w rozmowie. Żadnych konektorów, kont ani konfiguracji.

Przeglądarka po Twojej stronie, bo klikanie po rejestrach zostaje do zrobienia Tobie.

## Na czym się wywala

- **Nie ma dostępu do rejestrów i niczego nie potwierdzi.** To nie jest wywiadownia gospodarcza. Skill mówi, gdzie kliknąć i czego szukać, oraz czyta to, co mu wkleisz. Jeśli szukasz narzędzia, które samo pobierze odpis z KRS, to nie to.
- **Wynik jest ważny tylko na dzień sprawdzenia.** Zarząd, status VAT i numer rachunku potrafią się zmienić z tygodnia na tydzień. Przy współpracy rozłożonej na miesiące jedno sprawdzenie na starcie nie wystarcza, a skill nie przypomni Ci o kolejnym.
- **Nie widzi tego, czego w rejestrach nie ma.** Pełnomocnictw tam nie ma. Tego, czy firma płaci w terminie, też nie. Kontrahent czysty we wszystkich rejestrach może po prostu nie zapłacić, a to jest najczęstszy sposób, w jaki małe firmy tracą pieniądze.
- **Nie oceni wiarygodności i nie postawi diagnozy.** Nie napisze „to oszust” ani „można im ufać”. Wypisuje rozbieżności i pytania, decyzja zostaje po Twojej stronie. Część osób oczekuje jednoznacznej odpowiedzi i jej nie dostanie.
- **Wiedza o rejestrach i terminach jest z dnia budowy skilla.** Adresy stron, zakres wykazów i harmonogram KSeF potrafią się zmienić, a skill sam się nie zaktualizuje, przy dużej transakcji potwierdź z księgową, czy nic się nie przesunęło.
- **Słaby zrzut ekranu.** Jeśli wgrasz nieczytelne zdjęcie odpisu, przeczyta tylko to, co widać, i powie, czego nie widzi.
- **Kontrahent zagraniczny.** Poza sprawdzeniem numeru VAT w unijnej wyszukiwarce VIES nie ma czym pomóc. Rejestry innych krajów są poza zakresem i skill to przyzna, zamiast zgadywać.

## Czego ten skill nie robi celowo

Nie wystawia werdyktu o firmie. Nie pisze pełnomocnictw, umów ani wezwań do zapłaty. Nie rozstrzyga, czy umowa podpisana przez daną osobę jest ważna. Nie mówi „możesz zapłacić”. Jeśli poprosisz o którąkolwiek z tych rzeczy, odmówi i wróci do listy.

To granica postawiona świadomie. Narzędzie, które na podstawie kilku pól z rejestru orzeka „firma wiarygodna”, produkuje fałszywe poczucie bezpieczeństwa, a ono kosztuje więcej niż brak sprawdzenia, bo wyłącza czujność. To narzędzie robi coś skromniejszego i uczciwszego: pilnuje, żebyś przeszedł przez bezpłatne rejestry, w kwadrans i po kolei, i pokazuje, co się nie zgadza. Tam, gdzie sprawdzenie kosztuje, raporty biur informacji gospodarczej, Rejestr Zastawów, powie o tym z góry i podpowie, przy jakiej kwocie w ogóle warto.

Nie zbiera też i nie zapisuje danych kontrahenta. W podsumowaniach nie przepisuje pełnych numerów rachunków, PESEL-i ani adresów zamieszkania, bo takie podsumowanie zwykle ląduje wklejone w mail.
