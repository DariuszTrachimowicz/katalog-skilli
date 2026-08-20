Oto ostateczny werdykt wykonawczy dla motywu "zbudowane na polskie realia", łączący najlepsze wnioski z raportów ekspertów.

### 1. HERO (Strona główna)
Nagłówek H1 zostaje wymieniony zgodnie z warunkiem właściciela, ale ściśle zachowujemy restrykcje CRO (s1) dotyczące nienaruszalności przycisków CTA.

*   **Eyebrow:** `PL · pisane od zera pod polskie realia · aktualizacja <data>` (połączenie wniosków z c1 i w2)
*   **H1 (3 linie z twardym łamaniem):**
    Pisane od zera
    pod <span class="pl-kreska">polskie realia</span>.
    <em>Nie tłumaczone.</em> (źródło: w2 i c1)
*   **Lede:** Złotówki, VAT, NIP, polskie urzędy i biurowa polszczyzna są tu od pierwszej linijki, a nie doklejone do cudzego szablonu. Każdą umiejętność uruchomiliśmy sami na polskich dokumentach. Jeśli coś gdzieś nie działa, piszemy o tym wprost na karcie. (źródło: optymalny kompromis w2, c1 i p2)
*   **CTA i hero-note:** Zostają dokładnie w obecnej formie. Pomiędzy lede a CTA nie umieszczamy absolutnie żadnego nowego elementu wizualnego, aby nie spychać przycisków poza widoczny ekran (źródło: s1).
*   **Staty (dokładnie 3 pozycje):** Zgodnie z zaleceniami s1 i f1 unikamy deklaracji bez pokrycia, opierając się na faktach z testów.
    1. **33**: umiejętności napisanych od zera pod polskie dokumenty, żadna nie jest tłumaczeniem.
    2. **<gotowe>**: gotowych do pobrania, każda sprawdzona przez nas przed publikacją.
    3. **3 platformy**: w testach Claude i ChatGPT, wyniki rundy Gemini z 20 sierpnia przy każdym skillu.

### 2. NOŚNIK WIZUALNY MOTYWU
*   **Wybór:** Kreska korektorska (z raportu w2).
*   **Uzasadnienie:** Kreska korektorska dyskretnie nawiązuje do rzemieślniczej pracy z tekstem, co idealnie wspiera argument o ręcznym pisaniu skilli od podstaw i odrzuceniu maszynowych tłumaczeń. Element ten skaluje się naturalnie w interfejsie, bazuje na już istniejącym w systemie kolorze i unika patetycznej symboliki narodowej.
*   **Trzy skale:**
    *   **Główna (strona główna):** Typograficzne podkreślenie pod słowami "polskie realia" w nagłówku H1 (`.pl-kreska`).
    *   **Podstrona skilla:** Mały znacznik w wierszu meta z drobnym, czerwonym akcentem u dołu (`.pl-znak`).
    *   **Oferta płatna:** Bardzo cienka, systemowa linia pod tytułem, gdzie tylko krótki początkowy odcinek jest czerwony, a reszta wyszarzona (`.pl-pasek`).

### 3. MOTYW NA PODSTRONACH SKILLI
Używamy dwóch precyzyjnych punktów styku (mix w2 i s1), aby motyw wspierał decyzję, a nie powielał główne treści:
1.  **Góra strony:** Znacznik `.pl-znak` (z tekstem "PL na polskie realia") umieszczony bezpośrednio w wierszu `.meta` pod tytułem, pełniący jednocześnie rolę linku do istniejącej już sekcji "Jak po polsku" (źródło: w2, f1).
2.  **Dół strony (strategia CRO):** Tekstowy pasek `.motyw-pasek` wklejony bezpośrednio nad formularzem bramki mailowej do pobrania. Tekst: "Pisany od zera pod polskie realia · testowany przez nas · wersja {wersja}" (źródło: s1).

### 4. MOTYW W OFERTACH PŁATNYCH
Aby nie uszkodzić struktury 11 zweryfikowanych sekcji, motyw aplikujemy z poziomu szablonu (mix s1, p2, w2):
1.  **Góra strony:** Ten sam identyfikator `.pl-znak` w wierszu `.meta` pod głównym nagłówkiem H1 (utrzymanie spójności).
2.  **Pod nagłówkiem H1:** Wdrożenie linii `.pl-pasek` tuż poniżej tytułu oferty.
3.  **Sekcja zakupowa:** W bloku `oferta-akcje`, tuż pod przyciskiem "Kup teraz", dodajemy jedno zdanie zabezpieczające obiekcje: "Skill napisany od zera pod polskie realia i audytowany po polsku. Płatność online (BLIK, przelew, karta) albo faktura proforma." (źródło: s1 i p2).

### 5. FRAZA-KLUCZ MOTYWU
*   **"Pisane od zera pod polskie realia."** (wersja plastyczna i łatwo odmienna, np. "skill pisany pod polskie realia", "zbudowany na polskie realia" - wywiedziona z c1).

### 6. LISTA RYZYK DO PILNOWANIA PRZY WDROŻENIU (MAX 5)
1.  **Nienaruszalność lejka hero:** Bezwzględny zakaz wprowadzania jakichkolwiek ozdobników wizualnych, pasków czy tekstu pomiędzy lede a CTA na stronie głównej, aby zapobiec spadkowi klikalności.
2.  **Utrzymanie zwięzłości lede:** Kontrolowanie długości tekstu lede, aby całość mieściła się w limitach widocznego ekranu (fold) na mniejszych ekranach laptopów.
3.  **Precyzja komunikacji testów AI:** Unikanie obietnicy "wszystko działa w 3 modelach"; przekaz musi ściśle mówić o fakcie trwających testów (runda Gemini) i kierować do szczegółowych statusów na konkretnych kartach.
4.  **Czystość arkusza CSS:** Pilnowanie, by implementacja nośnika (kreski i znaczniki) bazowała w 100% na już funkcjonujących zmiennych kolorystycznych (jak `--red-tx` czy `--line`), bez wprowadzania niepotrzebnych odcieni.
5.  **Higiena typograficzna:** Kategoryczne powstrzymanie się przed używaniem niedozwolonych emoji oraz długich pauz i półpauz w nowych partiach tekstu w celu zachowania spójnego, redakcyjnego charakteru.
