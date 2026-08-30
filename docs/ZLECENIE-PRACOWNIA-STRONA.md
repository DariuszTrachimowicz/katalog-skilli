# ZLECENIE: strona sprzedazowa Pracowni AiXperts w katalogu (/pracownia/)

Kontekst: katalog "Skille po polsku" (skille.aixperts.pl) to strona statyczna
generowana przez build.mjs (szablony/styl.css, strona() jako rama). Sprzedajemy
nowy produkt: Pracownia AiXperts (pracownia.aixperts.pl) - panel w
przegladarce, w ktorym klient przez ROZMOWE tworzy gotowe dokumenty. Zadnego
instalowania skilli, zadnych paczek: wchodzi, wkleja klucz, odpowiada na
pytania, dostaje dokument (docx, pdf, html). To inna forma tych samych
narzedzi, ktore katalog sprzedaje jako paczki.

## Zakres

### 1. Nowa strona /pracownia/ generowana w build.mjs

Zrodlo tresci: nowy plik `szablony/pracownia.html` (fragment article, jak
`skille/<id>/oferta.html` dla ofert) wczytywany przez build.mjs i owijany w
strona(). Sciezka /pracownia/, tytul "Pracownia AiXperts, dokumenty z rozmowy",
opis SEO wlasny. Obrazek og: katalog.png (fallback).

Struktura tresci (uzywaj istniejacych klas katalogu, obejrzyj
`skille/polityka-ai/oferta.html` i styl.css zanim cokolwiek napiszesz):

1. Naglowek: "Pracownia AiXperts" + zdanie prowadzace: dokument powstaje w
   rozmowie, w przegladarce, bez instalowania czegokolwiek.
2. "Jak to dziala" - trzy kroki: (1) zamawiasz dostep i dostajesz klucz
   mailem, (2) logujesz sie na pracownia.aixperts.pl, (3) wybierasz narzedzie
   i odpowiadasz na pytania; asystent prowadzi wywiad, pokazuje czego brakuje
   i sklada dokument do pobrania w docx, pdf i html.
3. "Siedem narzedzi na start" - tabela lub karty z DOKLADNIE tymi danymi
   (nazwa, kategoria, koszt w jednostkach, opis, link "Zobacz przyklad" do
   https://pracownia.aixperts.pl/public/przyklady/<slug>.html):
   - Oferta behawioralna | Sprzedaz | 1 | Prowadzi rozmowe krok po kroku i uklada kompletna oferte B2B.
   - Procedury KSeF | Zgodnosc | 3 | Porzadkuje role, dostepy, obieg faktur, odrzucenia i prace firmy podczas niedostepnosci KSeF.
   - Polityka AI | Zgodnosc | 5 | Porzadkuje zasady bezpiecznego korzystania z narzedzi AI, odpowiedzialnosc ludzi i reakcje na incydenty.
   - Procedura AML | Zgodnosc | 5 | Uklada robocza procedure AML dopasowana do dzialalnosci, klientow i transakcji.
   - Opisy produktow | Tresci | 1 | Tworzy lub sprawdza opisy produktow wylacznie na podstawie dostarczonych danych i jawnie pokazuje braki.
   - Pismo urzedowe | Urzedy | 1 | Uklada lub sprawdza pismo do urzedu, porzadkujac zadanie nadawcy i pilnujac elementow formalnych.
   - Ogloszenie o prace | HR | 1 | Pisze lub sprawdza ogloszenie rekrutacyjne, pilnujac warunkow i neutralnego jezyka.
   (Polskie znaki w tresci strony pisz NORMALNIE, powyzej sa zdarte tylko w zleceniu.)
4. "Cennik" - jeden plan: 99 zl netto miesiecznie (121,77 zl brutto),
   20 jednostek na miesiac. Wyjasnienie jednostek: prostsze narzedzia
   kosztuja 1 jednostke za dokument, bardziej zlozone 3-5; koszt widac przed
   uruchomieniem; poprawki i audyt w ramach tej samej sesji nie zuzywaja
   dodatkowych jednostek. CTA: "Zamow dostep (99 zl netto/mies)" ->
   https://licencje.aixperts.pl/zamow/pracownia?okres=miesiac
   z data-umami-event="zakup" data-umami-event-skill="pracownia".
5. "Pracownia czy paczka skilli?" - krotkie uczciwe porownanie: paczki z
   katalogu wgrywasz do wlasnego asystenta AI (Claude, ChatGPT, Gemini) i
   placisz za skill; Pracownia dziala w przegladarce bez wlasnego asystenta
   i konta u dostawcy AI, placisz jeden abonament za dostep do wszystkich
   siedmiu narzedzi. Link do katalogu paczek (/#katalog).
6. Blok zaufania: dokumenty porzadkuja i strukturyzuja, nie orzekaja
   zgodnosci z prawem (rama katalogu); dane z wywiadu sluza tylko do
   zlozenia dokumentu; platnosc BLIK, karta lub przelew (Montonio), faktura
   VAT automatycznie; przyklady na stronie sa wygenerowane naprawde, z
   fikcyjnymi danymi.
7. `<p class="disc">` jak na ofertach + powrot do katalogu.

### 2. Zapowiedz na stronie glownej i sitemap ZA FLAGA

W config.json nowy klucz `"pracowniaWKatalogu": false`. Gdy true:
- na stronie glownej, nad lub pod sekcja katalogu, pasek-zajawka (uzyj
  stylistyki istniejacych blokow CTA, np. por-cta): "Nie chcesz instalowac
  skilli? Pracownia robi te dokumenty w przegladarce, z rozmowy." +
  przycisk "Zobacz Pracownie" -> /pracownia/;
- /pracownia/ w sitemap.xml.
Gdy false: strona /pracownia/ i tak sie generuje (dostepna z linku), ale
strona glowna i sitemap bez zmian. Flagę zostaw na false.

### 3. Zasady

- Zero dlugich myslnikow (pauz) wszedzie; dywiz "-" wolno.
- Widoczne daty slownie, nie ISO.
- Zadnych danych firmowych D-X.PL w stopce (rama strona() juz to zalatwia).
- Nie zmieniaj wygladu ani tresci istniejacych stron przy fladze false
  (dopuszczalne: czysto techniczne dopiski w build.mjs).
- Po zmianach: `node build.mjs` przechodzi, public/pracownia/index.html
  istnieje, `git diff --stat public/` przy fladze false pokazuje TYLKO nowe
  pliki pracowni (zadnych zmian w istniejacych; jesli build stempluje daty,
  zglos to w raporcie zamiast maskowac).
- Raport: docs/RAPORT-PRACOWNIA-STRONA.md (co powstalo, jak sprawdzone).
