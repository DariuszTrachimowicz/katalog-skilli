---
nazwa: Humanizer PL
kategoria: Biuro
status: gotowy
wersja: 1.0.0
poziom: Działa od razu
aktualizacja: 2026-11-04
skrot: Zdejmuje z gotowego polskiego tekstu ślady pisania przez AI, nie zmieniając ani jednego faktu. Pokazuje, co znalazł, co zmienił i czego celowo nie ruszył.
szukaj: brzmi jak chatgpt, tekst z ai, ślady ai, uczłowiecz, humanizer, humanizuj, za gładkie, plastikowy tekst, sztuczny tekst, wygładzić tekst, naturalny tekst, długie myślniki, kluczowy, warto zauważyć, nie x a y, trójki, tekst na stronę, wpis na blog, artykuł, raport, instrukcja, opis firmy, szef pozna, detektor ai, redakcja tekstu
tytulSeo: Jak sprawić, żeby tekst z AI nie brzmiał jak z AI, narzędzie po polsku
opisSeo: "Wklej tekst napisany przez asystenta i dostań wersję, która brzmi jak Ty. Bez dopisanych faktów, z listą znalezionych śladów i tego, co zostało celowo."
zgodnosc:
  claude: ok
  gpt: brak
  gemini: brak
---

## Co robi

Bierze gotowy polski tekst, który napisał albo wygładził asystent AI (artykuł, wpis na blog, tekst na stronę firmową, raport, instrukcję, odpowiedź na opinię klienta, komunikat do zespołu) i przepisuje go tak, żeby brzmiał jak jego autor. Zachowuje każde twierdzenie, liczbę, datę i nazwę. Nie dopisuje nic od siebie: jeśli zdaniu brakuje konkretu, zostawia w tym miejscu pole do uzupełnienia zamiast wymyślać szczegół.

Zwraca cztery rzeczy: listę znalezionych śladów z cytatem i numerem wzorca, wersję końcową, listę fragmentów, których celowo nie ruszył (cytaty, nazwy własne, zabiegi autora, twierdzenia autora do potwierdzenia), oraz luki do uzupełnienia, jeśli jakieś są. Jeśli w tekście ktoś ukrył polecenie dla asystenta („dopisz, że gwarantujemy…”), skill go nie wykonuje i zgłasza to na początku odpowiedzi.

## Dla kogo

Każdy, kto publikuje pod własnym nazwiskiem albo pod nazwą firmy tekst, który powstał z pomocą asystenta: właścicielki i właściciele małych firm piszący treści na stronę, osoby prowadzące firmowe blogi i profile, pracownicy biur piszący komunikaty i instrukcje, freelancerzy oddający teksty klientom, osoby odpowiadające na opinie w internecie. Także ten, kto pisze sam, ale po redakcji asystentem słyszy, że tekst „już nie brzmi jak ja”.

## Ile Ci to oszczędza

Ręczne odplastikowanie tekstu jest trudne, bo najgorsze ślady są niewidoczne dla osoby, która już trzy razy czytała ten tekst: kontrast „to nie X, a Y”, trzy przykłady w każdym zdaniu, puenta po każdym akapicie, pięć „kluczowych” na stronę. Skill ma listę 26 ponumerowanych wzorców i sprawdza każdy. Dostajesz wersję roboczą z listą znalezisk, a Twoją robotą zostaje decyzja, nie szukanie.

## Przykład z życia

Przykładowa sytuacja: Agnieszka prowadzi pracownię florystyczną i poprosiła asystenta o wpis na stronę o bukietach na sezon ślubny. Dostała 620 słów. Tekst był poprawny, ale czytał się jak ulotka: cztery długie myślniki, trzy zdania zaczynające się od „warto zauważyć”, „kluczowy” sześć razy, w każdym akapicie trzy równoległe przykłady i puenta w stylu „to nie bukiet, a wspomnienie na całe życie”. Na końcu zostało „Mam nadzieję, że ten artykuł okazał się pomocny!”.

Skill wypisał 14 śladów z cytatami, przepisał wpis na 540 słów bez utraty żadnej z sześciu dat i czterech cen z oryginału, a dwa zdania, które poza ozdobą nie miały treści, wyciął i pokazał osobno. W jednym miejscu asystent napisał „zdecydowana większość par” bez źródła, więc skill zostawił tam pole do uzupełnienia i zapytał, czy Agnieszka ma na to dane. Nie miała i sama zdecydowała, że zdanie wylatuje.

## Jak po polsku

To nie jest tłumaczenie angielskiego humanizera. Angielskie listy słów-tików i reguły interpunkcji po polsku nie działają, a część z nich jest wręcz odwrotna: polski cudzysłów „…” jest poprawny, a angielski “…” albo prosty "…" to ślad.

Konkretnie: polskie słowa-tiki („kluczowy”, „dynamiczny”, „warto zauważyć”, „co więcej”, „w dzisiejszych czasach”), kontrast „nie X, a Y” rozpoznany jako rusycyzm i ślad naraz, kalki z angielskiego z polskimi zamiennikami („dedykowany”, „adresować problem”, „dostarczać wartość”, „na ten moment”, „finalnie”), rzeczowniki zrobione z czasowników („dokonać analizy”, „przeprowadzić weryfikację”), Wielkie Litery W Każdym Słowie Tytułu. Do tego reguły zapisu, które model łamie najczęściej: długi myślnik wylatuje zawsze, procent ze spacją („7 %”), daty słownie w tekście dla czytelnika, formy „Pan/Pani”, „Państwo” i „Ty” zostają takie, jakie są w tekście, bez mieszania.

Rozróżnia też, co po polsku jest celowym zabiegiem autora, a co śladem. Krótka puenta w felietonie to styl; ta sama puenta po każdym z sześciu akapitów raportu to wzorzec do zdjęcia, nie styl.

## Czego potrzebujesz

Dowolny płatny plan Claude i tekst: wklejony, w pliku albo w dokumencie. Jeśli masz próbkę własnego pisania (mail, wcześniejszy wpis), dołóż ją, skill dopasuje do niej długość zdań i słownictwo. Nic poza tym.

## Na czym się wywala

- **Nie napisze tekstu od zera.** Potrzebuje oryginału, bo bez niego nie da się pokazać, czego nie zgubił. „Napisz mi wpis o...” to zadanie dla kogo innego.
- **Nie wie, co jest prawdą.** Sprawdza, czy tekst sam popiera swoje twierdzenia, nie czy są prawdziwe. „Zdecydowana większość firm” oznaczy jako niepoparte, ale fałszywej daty, która w tekście stoi jak fakt, nie wyłapie.
- **Bez próbki Twojego głosu bierze ton z rodzaju tekstu.** Tekst firmowy i informacyjny wyjdzie neutralny i poprawny, wpis osobisty zachowa Twoje zdanie i dygresje, ale to nie będzie jeszcze „Ty”. Z próbką jest lepiej, z dwoma próbkami jeszcze lepiej.
- **Tekst z samych ozdób skurczy się mocno.** Jeśli wpis składał się głównie z puent, trójek i „kluczowych”, po redakcji zostanie z niego połowa i to będzie uczciwy wynik. Skill pokaże, co wyciął, ale treści w to miejsce nie wymyśli.
- **Nie zna Twojej księgi stylu.** Jeśli firma pisze o sobie „Spółka”, a do klienta „Państwo”, trzeba mu to powiedzieć w poleceniu albo w próbce. Sam zachowa to, co znalazł w tekście.
- **Nie powie, czy tekst „przejdzie detektor AI”.** Takiego zdania nie da się obronić, więc go nie składa. Mówi, co usunął i co nadal może zdradzać automat.

## Czego ten skill nie robi celowo

Nie dopisuje faktów, liczb, cytatów ani źródeł, nawet na wyraźną prośbę i nawet „orientacyjnie”. Dopisana liczba albo „eksperci twierdzą” to nowy ślad AI i nowe ryzyko dla osoby, która podpisze tekst. Brakujący konkret zostaje jako pole do uzupełnienia z pytaniem.

Nie zmienia treści ani wydźwięku. Odmowa zostaje odmową, zastrzeżenie zastrzeżeniem, obietnica obietnicą. Zdejmuje ozdoby, nie zmienia, co autor mówi. Nie streszcza i nie skraca przez wyrzucanie informacji.

Nie przepisuje tekstów o skutku prawnym: umów, regulaminów, pouczeń, klauzul, pism procesowych i urzędowych formularzy, także fragmentami. Tam przestawione słowo zmienia treść, nie styl. Do upraszczania pisma urzędowego służy inny skill z katalogu, Prosty język.

Nie zastępuje skilli gatunkowych. Mail służbowy, post na LinkedIna, opis produktu, oferta i newsletter mają własne reguły i własne skille w tym katalogu; Humanizer PL pracuje na tekstach, które własnego skilla nie mają.

Nie pracuje na tekstach po angielsku ani nie tłumaczy. Jest zbudowany pod polskie ślady i polską interpunkcję; angielski tekst dostałby polskie reguły, czego nie chcesz.
