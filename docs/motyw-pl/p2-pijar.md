# P2. Pijar (komunikacja produktowa B2B, odbiorca nietechniczny)

Soczewka: właścicielka małej firmy i księgowa nie wiedzą, co to GitHub, i nie muszą
wiedzieć. Dla nich "nie kopia z GitHuba" znaczy jedno: "to nie jest tłumaczenie
z angielskiego, ktoś napisał to pod moje faktury i moje urzędy". Zaufanie budują
konkrety, które rozpoznają z własnego biurka (VAT, NIP, proforma, pismo do urzędu,
numer wersji, data), oraz przyznanie się do ograniczeń. Alarm "marketing" odpalają:
"rewolucja", "oszczędź X godzin", "inteligentny asystent", wykrzykniki, obietnice
bez podmiotu ("gwarantujemy rezultaty"). Słowo "AI" w nagłówku jest bezpieczne,
"sztuczna inteligencja, która rozumie Ciebie" już nie, bo brzmi jak reklama banku.

Zasada nadrzędna dla całego motywu: Polskość komunikujemy przez PRZEDMIOTY
(faktura, umowa, urząd, złotówki), nie przez PRZYMIOTNIKI ("polski", "lokalny",
"dostosowany"). Przymiotnik deklaruje, przedmiot dowodzi.

---

## A. HERO/BANNER strony głównej

### Eyebrow
"Katalog kuratorowany" to język galerii sztuki, nie biura rachunkowego. Zamiana:

```
Katalog prowadzony ręcznie · aktualizacja <data słownie>
```

"Prowadzony ręcznie" mówi to samo co "kuratorowany", ale językiem, którym księgowa
opisuje własną pracę. Data słownie zostaje, bo świeża data to najtańszy dowód, że
po drugiej stronie ktoś żyje.

### H1 (3 linie)

```
AI, która zna
polskie faktury,
umowy i urzędy.
```

Dlaczego tak: obecny h1 ("Co sztuczna inteligencja może zrobić za Ciebie") jest
dobry, ale mógłby wisieć nad każdym narzędziem AI na świecie. Nowy h1 robi dwie
rzeczy naraz: niesie motyw przewodni (polskie realia) i korzyść (nie będę tłumaczyć
maszynie, czym jest NIP). "Zna" jest mocne, ale pokryte briefem: skille są pisane
pod zł, VAT, NIP i konwencje pism, a lede zaraz to uziemia. Celowo "AI", nie
"sztuczna inteligencja": krócej, a odbiorca i tak mówi "ej-aj".

Wariant ostrożniejszy, gdyby "zna" uznano za zbyt osobowe:

```
Umiejętności AI
pisane pod polskie
faktury, umowy i urzędy.
```

### Lede (3 zdania)

```
Każdą umiejętność w tym katalogu napisaliśmy od zera po polsku: pod złotówki,
VAT, NIP i sposób, w jaki naprawdę pisze się do polskich urzędów. To nie są
tłumaczone gotowce z internetu. Każdą sprawdziliśmy sami w Claude i ChatGPT,
a tam, gdzie coś nie działa, piszemy o tym wprost na karcie skilla.
```

Zwroty nośne i dlaczego działają na nietechnicznego odbiorcę:
- "napisaliśmy od zera po polsku" zamiast "nie kopia z GitHuba": ten sam sens,
  zero technikaliów, jest podmiot ("my"), co buduje odpowiedzialność;
- "tłumaczone gotowce z internetu" to jedyne dopuszczalne odniesienie do
  konkurencji: bez nazw, a każda księgowa wie, jak wygląda "gotowiec";
- "piszemy o tym wprost" to obietnica behawioralna, nie jakościowa; takich
  obietnic odbiorca nie klasyfikuje jako marketing, bo da się je sprawdzić
  jednym kliknięciem.

### Element wizualny: linia zobowiązań

Zamiast obrazka: cienka pozioma linia pod statsami z trzema krótkimi
zobowiązaniami w kapitalikach. Redakcyjne, ciche, a niesie motyw dalej niż
niejeden banner. Koncept (w ramach istniejącej palety, jedna nowa klasa):

```html
<div class="hero-zasady" aria-label="Zasady katalogu">
  <span>pisane od zera po polsku</span>
  <span>testowane przez nas, nie "powinno działać"</span>
  <span>wersjonowane i aktualizowane</span>
</div>
```

```css
.hero-zasady{display:flex;gap:28px;flex-wrap:wrap;margin-top:26px;
  padding-top:18px;border-top:1px solid var(--line, #E4E2DC)}
.hero-zasady span{font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;
  color:var(--muted)}
```

### Co ze statami

Zostają trzy, ale każda ma nieść motyw, nie tylko liczbę. Uwaga pijarowa: dzisiejsza
fraza "nie zescrapowanych z GitHuba" jest podwójnie techniczna ("zescrapowane" +
"GitHub"); dla księgowej to szum. Zamiana:

```
33          umiejętności napisane od zera po polsku, żadna nie jest tłumaczeniem
<gotowe>    sprawdzone przez nas na polskich dokumentach, z raportem testu
2 modele    każdy skill testujemy w Claude i w ChatGPT; trwa runda testów Gemini
```

Trzeci stat celowo mówi "trwa runda testów Gemini" zamiast "3 modele": obietnica
w toku podana uczciwie buduje więcej zaufania niż zaokrąglona w górę liczba.
Po zakończeniu rundy stat zmienia się na "3 modele" bez przepisywania reszty.

---

## B. MOTYW NA PODSTRONACH SKILLI

Jeden element, konsekwentnie w tym samym miejscu: dodatkowy znacznik w istniejącym
wierszu `.meta` (obok kategorii, statusu i wersji), na każdej podstronie skilla
i w przyszłości na kartach w katalogu:

```html
<span class="dot d-pl"><i></i>pisany od zera po polsku</span>
```

(kropka w kolorze z istniejącej palety, np. ton zieleni "przetestowane"; bez
nowych kolorów). Dlaczego meta, a nie osobny pasek: odbiorca nietechniczny czyta
wiersz meta jak metkę na produkcie; tam szuka ceny, wersji, statusu. Motyw
umieszczony w metce jest odbierany jako cecha produktu, ten sam tekst w osobnym
banerze byłby odebrany jako reklama.

Drugi ruch, bez dodawania czegokolwiek: sekcje "Na czym się wywala" i "Czego ten
skill nie robi celowo" to najsilniejszy aktyw zaufania na stronie i trzeba je
podpisać jako standard, nie jako ciekawostkę. Jedno zdanie nad pierwszą z tych
sekcji (stały tekst szablonu, nie per skill):

```
Standard katalogu: przy każdej umiejętności piszemy wprost, na czym się wywala
i czego celowo nie robi. Wolimy, żebyś wiedział to przed pobraniem, nie po.
```

---

## C. MOTYW W OFERTACH PŁATNYCH

Bez ruszania 11 sekcji. Dwa punkty wpięcia w szablon `stronaOferty` (build.mjs),
czyli raz, dla wszystkich trzech ofert naraz:

1. Ten sam znacznik `d-pl` w wierszu `.meta` co na darmowych podstronach.
   Spójność darmowe/płatne jest tu kluczowa: klientka, która zaufała darmowemu
   skillowi, ma rozpoznać tę samą metkę na płatnym.

2. Jedno zdanie w bloku `oferta-akcje`, pod istniejącym opisem płatności
   (obok "Płatność online... Klucz licencji i paczka przychodzą mailem."):

```
Skill napisany od zera pod polskie realia i sprawdzony przed sprzedażą przez
panel ekspertów. Aktualizacje przez rok w cenie licencji.
```

Zdanie stoi przy przycisku "Kup teraz", bo to moment, w którym odbiorca
nietechniczny szuka ostatniego powodu, żeby nie kupić. "Panel ekspertów" i
"aktualizacje w cenie" odpowiadają na dwa najczęstsze niewypowiedziane
zastrzeżenia: "kto to sprawdził" i "czy za rok będzie działać". Wewnątrz
11 sekcji nic nie dodajemy; jeśli któraś oferta ma sekcję o gwarancji lub
ryzyku, motyw wpleciony jest tam naturalnie już przez treść, nie przez baner.

---

## D. TEKSTY GOTOWE DO WKLEJENIA

### D1. Hero (komplet)

```
eyebrow:  Katalog prowadzony ręcznie · aktualizacja 20 sierpnia 2026

h1:       AI, która zna
          polskie faktury,
          umowy i urzędy.

lede:     Każdą umiejętność w tym katalogu napisaliśmy od zera po polsku: pod
          złotówki, VAT, NIP i sposób, w jaki naprawdę pisze się do polskich
          urzędów. To nie są tłumaczone gotowce z internetu. Każdą sprawdziliśmy
          sami w Claude i ChatGPT, a tam, gdzie coś nie działa, piszemy o tym
          wprost na karcie skilla.

hero-note (bez zmian intencji, lekki szlif):
          Test zajmuje minutę. Niczego nie instalujesz, żeby zobaczyć wynik.

stats:
          33        umiejętności napisane od zera po polsku, żadna nie jest tłumaczeniem
          <gotowe>  sprawdzone przez nas na polskich dokumentach, z raportem testu
          2 modele  każdy skill testujemy w Claude i w ChatGPT; trwa runda testów Gemini

linia zobowiązań (pod statsami):
          pisane od zera po polsku · testowane przez nas, nie "powinno działać" ·
          wersjonowane i aktualizowane
```

### D2. Podstrony skilli

```
badge w .meta:            pisany od zera po polsku

zdanie nad "Na czym się wywala" (stałe w szablonie):
          Standard katalogu: przy każdej umiejętności piszemy wprost, na czym
          się wywala i czego celowo nie robi. Wolimy, żebyś wiedział to przed
          pobraniem, nie po.
```

### D3. Oferty płatne

```
badge w .meta:            pisany od zera po polsku

zdanie w oferta-akcje:
          Skill napisany od zera pod polskie realia i sprawdzony przed sprzedażą
          przez panel ekspertów. Aktualizacje przez rok w cenie licencji.
```

### D4. Słownik motywu (do trzymania spójności w przyszłych tekstach)

Mówimy:
- "napisane od zera po polsku", "pod polskie realia", "pod polskie dokumenty"
- "tłumaczone gotowce z internetu" (jedyne odniesienie do alternatyw, bez nazw)
- "sprawdziliśmy sami", "z raportem testu", "piszemy o tym wprost"
- konkrety-przedmioty: faktura, VAT, NIP, proforma, pismo do urzędu, złotówki

Nie mówimy:
- "GitHub", "scrapowane", "prompt", "model językowy" (na stronach dla odbiorcy)
- "rewolucja", "przełom", "inteligentny asystent", "oszczędź X godzin"
- "dostosowane do polskiego rynku" (przymiotnik zamiast dowodu; zawsze zamieniać
  na przedmiot: "pod polskie faktury i urzędy")
- niczego o "rozumieniu prawa" ani "wiedzy prawniczej"; skille rozumieją
  dokumenty, nie orzekają, i to zdanie może padać dosłownie
