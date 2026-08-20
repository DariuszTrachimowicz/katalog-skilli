# S1. Strateg konwersji (CRO): motyw "zbudowane na polskie realia"

Soczewka: skuteczność. Czy nowy hero nie zabije obecnych konwersji (test 6 pytań
i katalog to główne CTA, formularz mailowy to bramka pobrań), czy motyw wzmacnia
decyzję pobrania i zakupu zamiast być ozdobą, oraz co ze statami.

Stan faktyczny sprawdzony w repo (2026-08-20):
- hero: `build.mjs` linie 362-378 (eyebrow, h1 benefitowy, lede, 2 CTA, hero-note, 3 staty),
- lejek: hero -> `#test` (quiz 6 pytań) lub `#katalog` -> karta -> strona skilla -> formularz mailowy pobrania; płatne: karta -> `/skill/{id}/` (oferta) -> "Kup teraz" + trial za mail,
- runda Gemini z 20 sierpnia 2026 w danych: na 33 skille `gemini: ok` 17, `format` (działa z zastrzeżeniami) 13, `brak` (nietestowane) 3; ChatGPT `ok` 33/33; w aplikacji Gemini natywne skille nadal niedostępne w EOG (nota w `config.json`).

## Diagnoza CRO, zanim padnie propozycja

1. **Motyw to wyróżnik, nie korzyść.** "Pisane od zera na polskie realia" odpowiada
   na pytanie "dlaczego stąd, a nie skądinąd". Ale zimny ruch z Google/LinkedIn nie
   wie jeszcze, że chce jakiegokolwiek skilla, i nie wie, że istnieją angielskie repozytoria,
   z którymi się porównujemy. Jeśli h1 zacznie od wyróżnika, gubimy tych, którym trzeba
   najpierw sprzedać samą korzyść. Dlatego: **korzyść zostaje w h1, motyw wchodzi jako
   warstwa dowodu** (eyebrow, lede, staty). Tam pracuje na decyzję, a nie zamiast niej.
2. **Nie ruszać CTA.** "Dobierz skille dla siebie" + "Przeglądaj katalog" + hero-note
   o minucie i braku instalacji to obecny, działający rdzeń konwersji. Motyw nie może
   wcisnąć niczego między lede a przyciski (spycha CTA w dół) ani zmienić ich treści.
3. **Motyw najlepiej pracuje przy bramce mailowej, nie w nagłówku.** Mail to koszt.
   Użytkownik płaci nim w momencie kliknięcia "Pobierz", nie w hero. Największy zwrot
   z motywu jest więc przy formularzu pobrania i przy przycisku "Kup teraz", gdzie
   uzasadnia cenę (mail albo złotówki): "to nie jest darmowa kopia z internetu,
   to rzecz robiona i testowana ręcznie pod Twoje dokumenty".
4. **Uczciwość to nasz mechanizm konwersji, nie ozdoba.** Sekcje "Na czym się wywala",
   statusy per platforma i legenda w katalogu budują zaufanie, które domyka pobranie.
   Każde zdanie motywu musi być falsyfikowalne jednym kliknięciem w kartę. Dlatego
   żadnego "3 modele" na wyrost (patrz staty niżej).

## A. HERO/BANNER strony głównej

Zmiana chirurgiczna: h1 i CTA zostają w obecnym kształcie (przetestowany rdzeń),
motyw wchodzi w eyebrow, lede i staty. Kolejność informacji: kto (eyebrow),
co (h1), dowód (lede + staty), akcja (CTA bez zmian).

- **eyebrow:** `Pisane od zera pod polskie realia · aktualizacja <data>`
  (zamienia "Katalog kuratorowany", które nic nie obiecuje; zielona kropka
  z `.eyebrow::before` zostaje, teraz sygnalizuje żywy, aktualizowany katalog).
- **h1 (bez zmian):** `Co sztuczna inteligencja / może zrobić za Ciebie / w Twojej pracy.`
- **lede (2 zdania, motyw + dowód + uczciwość):**
  "Gotowe umiejętności do pobrania, pisane od zera pod polskie realia: złotówki, VAT,
  NIP, urzędy i język, którym naprawdę mówi się w biurze, a nie tłumaczone szablony.
  Każdą uruchomiliśmy sami na polskich dokumentach, a jeśli gdzieś się wywala,
  piszemy o tym wprost na karcie."
  (Zdanie "Jeden plik działa w Claude i ChatGPT" schodzi z lede do statów, żeby lede
  niosło jeden motyw, a nie trzy.)
- **CTA i hero-note: bez żadnych zmian.**
- **Element wizualny:** żaden nowy nad CTA. Jeśli motyw ma dostać kotwicę wizualną,
  to wyłącznie jako czwarta pozycja rytmu w statach albo cienki pasek monospace POD
  statami (klasa np. `.manifest`, `font-family:var(--mono)`, 12px, `var(--muted)`,
  `border-top:1px solid var(--line)`): `zł · VAT · NIP · KSeF · polskie urzędy · polszczyzna biurowa`.
  Elegancki, redakcyjny, zero nowych kolorów.

### Co ze statami (33 / gotowe / 2 modele)

- **Stat 1 (33):** zostaje liczbą, opis przechodzi na motyw pozytywnie sformułowany:
  "umiejętności napisanych od zera po polsku, nie tłumaczonych i nie zescrapowanych".
  ("z GitHuba" można zostawić, ale bez nazwy platformy zdanie jest równie ostre
  i nie starzeje się.)
- **Stat 2 (gotowe):** zostaje, opis doprecyzowany o konkret dokumentów:
  "gotowych do pobrania, sprawdzonych na polskich fakturach, umowach i pismach".
- **Stat 3 ("2 modele"): NIE podnosić do "3 modele".** Dane nie pozwalają: Gemini
  17/33 ok, 13 z zastrzeżeniami, 3 nietestowane, a natywne skille Gemini są
  niedostępne w EOG. "3 modele" w hero zderzy się z sekcją "Gdzie działa" dwa
  kliknięcia dalej i podważy dokładnie tę uczciwość, na której stoi cała strona.
  Zamiast tego stat mówi o programie testów, nie o gwarancji:
  `b: "3 modele"` + opis: "w testach: Claude i ChatGPT w każdym skillu, wyniki
  rundy Gemini z 20 sierpnia przy każdym skillu". Liczba rośnie (sygnał rozwoju),
  obietnica pozostaje pokryta w 100%.

### Ryzyka do pilnowania po wdrożeniu (checklista anty-regresji)

- Nie zmieniać: treści obu CTA, hero-note, nagłówka sekcji quizu, kolejności sekcji.
- Lede nie może przekroczyć ok. 320 znaków (obecna długość), żeby CTA nie spadło pod fold na laptopach.
- W Umami obserwować po wdrożeniu: klik "Dobierz skille dla siebie", klik "Przeglądaj katalog",
  wysłania formularza pobrania, zdarzenie "zakup". Spadek któregokolwiek o więcej niż
  kilkanaście procent tydzień do tygodnia = wrócić do poprzedniego lede (h1 i CTA i tak są bez zmian,
  więc pole regresu jest małe).

## B. Motyw na podstronach skilli

Jeden element, w miejscu decyzji, nie w nagłówku:

- **Pasek motywu nad formularzem pobrania** (i nad formularzem triala na ofertach),
  klasa np. `.motyw-pasek`: monospace 12px, `var(--muted)`, jedna linia:
  "Pisany od zera pod polskie realia · testowany przez nas · wersja {wersja}, aktualizowana".
  To ostatnie zdanie, które użytkownik czyta przed oddaniem maila, więc musi
  uzasadniać właśnie ten koszt. Wersja z frontmattera, zero nowych danych.
- **Nic nowego na kartach katalogu.** Karty już niosą kategorię, status, zgodność
  i wersję; kolejny znaczek rozmyje skanowanie. Motyw na poziomie katalogu robi hero.
- Sekcje "Na czym się wywala" i "Czego nie robi celowo" zostają bez zmian; to one są
  dowodem motywu, pasek tylko go nazywa.

## C. Motyw w ofertach płatnych (bez ruszania struktury 11 sekcji)

Zero nowych sekcji. Trzy wpięcia w istniejące elementy szablonu `stronaOferty`:

1. **Linia pod "Kup teraz"** (obecny `.dl-rodo` w `.oferta-akcje`), rozszerzona o jedno
   zdanie uzasadniające cenę: "Zbudowany od zera pod polskie realia i audytowany
   przed wydaniem. Płatność online (BLIK, przelew, karta) albo faktura proforma.
   Klucz licencji i paczka przychodzą mailem."
2. **Nagłówek formularza triala:** zamiast samego "Wypróbuj za darmo: wersja trialowa"
   dodać podtytuł jednym zdaniem: "Ta sama robota na polskich dokumentach, w węższym
   zakresie. Zobaczysz styl pracy skilla, zanim zapłacisz."
3. **Pasek motywu jak w punkcie B** nad formularzem triala (ten sam komponent,
   spójność katalog-oferta).

Nic w treści `oferta.html` (11 sekcji po audytach QA) nie ruszamy; kanoniczne
brzmienia FAQ o platformach już niosą uczciwą wersję motywu.

## D. Teksty gotowe do wklejenia

**Hero (`build.mjs`, linie 364-376), wersja rekomendowana:**

```html
<p class="eyebrow">Pisane od zera pod polskie realia &middot; aktualizacja <strong>${dataPoPolsku(new Date())}</strong></p>
<h1>Co sztuczna inteligencja<br>może zrobić <em>za Ciebie</em><br>w Twojej pracy.</h1>
<p class="lede">Gotowe umiejętności do pobrania, pisane od zera pod polskie realia: złotówki, VAT, NIP, urzędy i język, którym naprawdę mówi się w biurze, a nie tłumaczone szablony. Każdą uruchomiliśmy sami na polskich dokumentach, a jeśli gdzieś się wywala, piszemy o tym wprost na karcie.</p>
<div class="hero-cta">
  <a href="#test" class="btn">Dobierz skille dla siebie</a>
  <a href="#katalog" class="btn ghost">Przeglądaj katalog</a>
</div>
<p class="hero-note">Test zajmuje minutę. Nie musisz nic instalować, żeby zobaczyć wynik.</p>
<div class="stats">
  <div class="stat"><b>${skille.length}</b><span>umiejętności napisanych od zera po polsku, nie tłumaczonych i nie zescrapowanych</span></div>
  <div class="stat"><b>${gotowe}</b><span>gotowych do pobrania, sprawdzonych na polskich fakturach, umowach i pismach</span></div>
  <div class="stat"><b>3 modele</b><span>w testach: Claude i ChatGPT w każdym skillu, wyniki rundy Gemini z 20 sierpnia przy każdym skillu</span></div>
</div>
```

**Wariant h1 pod ewentualny test A/B (dopiero gdy Umami pokaże bazę), motyw w nagłówku:**

```html
<h1>Skille AI zbudowane<br>pod <em>polskie</em> realia.<br>Od zera, nie z tłumaczenia.</h1>
```

**Pasek motywu na podstronach (nad formularzem pobrania i triala):**

```html
<p class="motyw-pasek">Pisany od zera pod polskie realia &middot; testowany przez nas &middot; wersja ${esc(s.wersja)}, aktualizowana</p>
```

```css
.motyw-pasek{font-family:var(--mono);font-size:12px;letter-spacing:.06em;color:var(--muted);border-top:1px solid var(--line);padding-top:12px;margin:20px 0 10px}
```

**Linia pod "Kup teraz" (oferty płatne, zamiast obecnego `.dl-rodo`):**

```html
<span class="dl-rodo">Zbudowany od zera pod polskie realia i audytowany przed wydaniem. Płatność online (BLIK, przelew, karta) albo faktura proforma. Klucz licencji i paczka przychodzą mailem.</span>
```

**Podtytuł formularza triala:**

```
Ta sama robota na polskich dokumentach, w węższym zakresie. Zobaczysz styl pracy skilla, zanim zapłacisz.
```
