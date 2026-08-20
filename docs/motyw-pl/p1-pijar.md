# P1 - Pijarowiec: narracja i pozycjonowanie motywu "zbudowane na polskie realia"

Soczewka: narracja marki, zaufanie, spójny język motywu. Bez atakowania konkurencji,
bez pustych sloganów, w ramach istniejącej estetyki redakcyjnej.

## Fraza-klucz motywu (decyzja narracyjna)

**"Nigdy nie było po angielsku."**

Dlaczego ta, a nie "zbudowane na polskie realia":

1. Jest sprawdzalna i uczciwa. To fakt o procesie produkcji, nie ocena jakości.
   Nikt nie musi nam wierzyć na słowo "lepsze", wystarczy zrozumieć, co znaczy
   "pisane od zera po polsku".
2. Opowiada różnicę bez wskazywania palcem. Nie pada słowo "konkurencja",
   "GitHub" ani "tłumaczenia". Czytelnik sam dopowiada sobie kontrast, a wniosek,
   do którego ktoś doszedł sam, jest trwalszy niż ten, który mu wmówiono.
3. Jest krótka, dziwna na tyle, żeby zostać w głowie, i odmienia się naturalnie:
   "ten skill nigdy nie był po angielsku", "ta oferta nigdy nie była po angielsku",
   "nic w tym katalogu nie było najpierw po angielsku".
4. Broni się na kartach. Sekcje "Jak po polsku" (Wójt/Burmistrz/Prezydent Miasta,
   nota księgowa, KSeF, dzień składek, e-Doręczenia) są dowodem tej frazy,
   nie ozdobą obok niej.

Fraza pomocnicza (dłuższa, do lede i ofert): **"pisane od zera pod polskie realia"**.
Fraza-klucz otwiera, fraza pomocnicza wyjaśnia. Te dwie wystarczą na cały serwis;
trzeciej nie wprowadzamy, bo motyw rozmyje się w synonimach.

Ryzyko i jak je gasimy: fraza jest przecząca, więc na stronie zawsze stoi obok
zdania twierdzącego, które mówi, co JEST (złotówki, VAT, NIP, urzędy, polszczyzna
biurowa). Negacja przyciąga uwagę, twierdzenie buduje zaufanie.

---

## A. HERO/BANNER strony głównej

### Eyebrow

```
Katalog kuratorowany · 33 umiejętności · aktualizacja <data>
```

Zostawiamy "katalog kuratorowany", to już jest język zaufania. Dokładamy liczbę,
bo liczba w eyebrow uwiarygadnia zdanie, które zaraz padnie w h1.

### H1 (2 linie, trzecia wolna na oddech)

```
Te skille nigdy
nie były po angielsku.
```

W wariancie z istniejącym wyróżnieniem typograficznym (em jak w obecnym h1):

```html
<h1>Te skille <em>nigdy</em><br>nie były po angielsku.</h1>
```

To jest hak narracyjny: zatrzymuje, bo brzmi jak wyznanie, a nie jak reklama.
I od razu ustawia całą kategorię: istnieją narzędzia tłumaczone i istnieją pisane.
My jesteśmy z tych drugich, nikogo nie wymieniliśmy, nikogo nie obraziliśmy.

### Lede (3 zdania)

```
Każdą umiejętność napisaliśmy od zera pod polskie realia: złotówki, VAT, NIP,
polskie urzędy i język, którym naprawdę pisze się w biurze. Nasze skille wiedzą,
czym jest nota księgowa, dzień składek i e-Doręczenia, i uczciwie mówią, czego
nie robią. Każdą uruchomiliśmy sami, w Claude i ChatGPT, a jeśli gdzieś nie
działa, piszemy o tym wprost.
```

Konstrukcja celowa: zdanie 1 to twierdzenie po negacji z h1 (co jest zamiast
czego nie ma), zdanie 2 to konkret-dowód wyjęty prosto z kart, zdanie 3 to
istniejący, dobrze pracujący motyw uczciwości, którego nie wolno zgubić.

### Element wizualny: cicha listwa realiów

Pod lede (nad CTA albo nad statami) wąski, typograficzny pasek pojęć, które
zagraniczne narzędzie musiałoby dopiero tłumaczyć. Bez ikon, bez kolorów alarmowych,
skład jak z żywej paginy w gazecie:

```html
<p class="hero-realia">zł · VAT · NIP · KSeF · ZUS · e-Doręczenia · nota księgowa · biała lista</p>
```

```css
.hero-realia{
  font-size:.8rem;
  letter-spacing:.06em;
  text-transform:uppercase;
  opacity:.65;
  margin-top:.75rem;
}
```

To jest motyw-sygnatura: ta sama listwa (krótsza, 3-4 pojęcia właściwe dla skilla)
może wracać na podstronach i w ofertach, i wtedy czytelnik rozpoznaje ją jak
element identyfikacji, nie jak ozdobę.

### Staty

Zostają trzy, korekta treści pod motyw i pod stan faktyczny (runda Gemini trwa,
statusy per skill):

```
33            umiejętności pisanych ręcznie, od pierwszego zdania po polsku
<gotowe>      gotowych do pobrania, sprawdzonych na polskich dokumentach
2 modele      Claude i ChatGPT na każdej karcie, trwa runda Gemini
```

Uwaga narracyjna: obecne "nie zescrapowanych z GitHuba" schodzi ze strony głównej.
To zdanie robi tę samą robotę co h1, ale językiem zaczepki, a motyw ma być
tożsamością, nie przytykiem. Po tej zmianie na stronie nie ma ani jednego zdania
o kimkolwiek innym, i to jest pozycja, której łatwo bronić publicznie.

---

## B. Motyw na podstronach skilli

Jeden element, konsekwentnie w jednym miejscu: **zdanie-sygnatura nad sekcją
"Jak po polsku"** (albo jako jej pierwsza linia, złożona drobniej, jak motto):

```
Ten skill nigdy nie był po angielsku.
```

```html
<p class="motyw-pl">Ten skill nigdy nie był po angielsku.</p>
<h2>Jak po polsku</h2>
```

Dlaczego tam, a nie badge przy tytule: sekcja "Jak po polsku" to najmocniejszy
materiał dowodowy w całym serwisie (znak sprawy w KIS, rekompensata notą księgową,
paragony z NIP do 450 zł). Fraza postawiona bezpośrednio nad dowodem czyta się
jak teza, którą sekcja natychmiast udowadnia. Badge przy tytule byłby ozdobą;
tu fraza jest twierdzeniem procesowym.

Do tego dyskretna wersja listwy realiów pod tytułem skilla, per skill 3-4 pojęcia
(np. windykacja: "zł · odsetki · nota księgowa · KSeF"), tą samą klasą co w hero.
Numer wersji i "Gdzie działa" zostają, jak są, one już niosą wiarygodność.

Czego nie robić: nie powtarzać frazy drugi raz na tej samej stronie (np. przy
przycisku pobierania). Motyw działa, kiedy pojawia się raz i w tym samym miejscu
na każdej karcie, rytm ważniejszy niż częstotliwość.

---

## C. Motyw w ofertach płatnych

Bez zmian w strukturze 11 sekcji. Motyw wchodzi w trzech kroplach:

1. **Sekcja otwierająca / kontekst** - jedno zdanie wplecione w istniejący akapit:

   ```
   Jak wszystko w tym katalogu, <nazwa skilla> nigdy nie był po angielsku:
   powstał od zera pod polskie prawo, polskie dokumenty i polski rytm pracy.
   ```

2. **Okolice ceny lub gwarancji/ryzyka** - motyw jako uzasadnienie zaufania,
   nie jako slogan:

   ```
   Płacisz za narzędzie pisane od zera pod polskie realia i utrzymywane:
   każda wersja ma numer, a to, czego skill nie robi, jest opisane wprost.
   ```

3. **Stopka oferty** - ta sama listwa realiów co w hero, w wariancie skróconym
   dla danego skilla, bez dodatkowego tekstu.

Zasada: w ofercie fraza-klucz pada dokładnie raz (kropla 1). Kropla 2 używa już
tylko frazy pomocniczej. Oferta sprzedaje konkret, motyw ma jej dodać tożsamości,
nie przejąć głosu.

---

## D. Teksty gotowe do wklejenia

### D1. Hero (komplet)

```html
<p class="eyebrow">Katalog kuratorowany &middot; 33 umiejętności &middot; aktualizacja <strong><data></strong></p>
<h1>Te skille <em>nigdy</em><br>nie były po angielsku.</h1>
<p class="lede">Każdą umiejętność napisaliśmy od zera pod polskie realia: złotówki, VAT, NIP, polskie urzędy i język, którym naprawdę pisze się w biurze. Nasze skille wiedzą, czym jest nota księgowa, dzień składek i e-Doręczenia, i uczciwie mówią, czego nie robią. Każdą uruchomiliśmy sami, w Claude i ChatGPT, a jeśli gdzieś nie działa, piszemy o tym wprost.</p>
<p class="hero-realia">zł · VAT · NIP · KSeF · ZUS · e-Doręczenia · nota księgowa · biała lista</p>
```

CTA i hero-note bez zmian ("Dobierz skille dla siebie" / "Przeglądaj katalog" /
"Test zajmuje minutę...").

### D2. Staty

```html
<div class="stat"><b>33</b><span>umiejętności pisanych ręcznie, od pierwszego zdania po polsku</span></div>
<div class="stat"><b><gotowe></b><span>gotowych do pobrania, sprawdzonych na polskich dokumentach</span></div>
<div class="stat"><b>2 modele</b><span>Claude i ChatGPT na każdej karcie, trwa runda Gemini</span></div>
```

### D3. Podstrona skilla (nad "Jak po polsku")

```html
<p class="motyw-pl">Ten skill nigdy nie był po angielsku.</p>
```

Wariant dla skilli, gdzie liczba mnoga brzmi lepiej w kontekście (np. pakiety):

```
Nic z tego nie było najpierw po angielsku.
```

### D4. Oferty płatne

Zdanie do sekcji otwierającej:

```
Jak wszystko w tym katalogu, <nazwa skilla> nigdy nie był po angielsku: powstał od zera pod polskie prawo, polskie dokumenty i polski rytm pracy.
```

Zdanie do sekcji ceny lub gwarancji:

```
Płacisz za narzędzie pisane od zera pod polskie realia i utrzymywane: każda wersja ma numer, a to, czego skill nie robi, jest opisane wprost.
```

### D5. Zapas (opisy meta, posty, mailing - ten sam głos motywu)

```
Skille po polsku. Nie tłumaczone, pisane. 33 umiejętności zbudowane od zera pod polskie realia: zł, VAT, NIP, urzędy i język biura. Sprawdzone w Claude i ChatGPT.
```

```
Większość narzędzi AI mówi po polsku z tłumaczenia. Te skille nigdy nie były po angielsku.
```

(Drugie zdanie zapasu tylko do kanałów własnych, np. post; na stronę nie wchodzi,
bo zawiera porównanie "większość narzędzi", a strona ma mówić wyłącznie o nas.)

---

## Odrzucone warianty (żeby nie wracały)

- "Zbudowane na polskie warunki" jako fraza-klucz: poprawne, ale bez haka,
  brzmi jak każda deklaracja lokalizacji; zostaje w wersji "pisane od zera pod
  polskie realia" jako fraza pomocnicza.
- "Nie ze scrapera, z głowy" i pochodne: język zaczepki, motyw traci elegancję
  i wciąga nas w porównania, których publicznie nie chcemy bronić.
- "Mówią Twoim językiem": pusty slogan, mógłby wisieć nad każdym produktem
  w każdym kraju.
