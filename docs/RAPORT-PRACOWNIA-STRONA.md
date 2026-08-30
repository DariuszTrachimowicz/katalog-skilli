# Raport wykonania: strona Pracowni AiXperts

Data weryfikacji: 30 sierpnia 2026.

## Co powstało

- Nowa strona sprzedażowa pod adresem `/pracownia/`, generowana zawsze, niezależnie od flagi ekspozycji.
- Nowy fragment treści `szablony/pracownia.html`, wczytywany przez `build.mjs` i osadzany w istniejącej ramie `strona()` oraz klasach katalogu.
- Tytuł strony `Pracownia AiXperts, dokumenty z rozmowy`, osobny opis SEO, canonical `/pracownia/` i grafika OG `katalog.png` jako fallback.
- Sekcje wymagane w zleceniu: nagłówek, trzy kroki działania, siedem narzędzi z kosztami i linkami do przykładów, jeden plan cenowy, porównanie z paczkami skilli, blok zaufania, disclaimer i powrót do katalogu.
- CTA zakupu do `https://licencje.aixperts.pl/zamow/pracownia?okres=miesiac` z atrybutami Umami `zakup` i `pracownia`.
- Flaga `pracowniaWKatalogu` w `config.json`, pozostawiona na `false`.
- Warunkowa zajawka Pracowni przed sekcją katalogu na stronie głównej.
- Warunkowy wpis `/pracownia/` w `sitemap.xml`.
- Test integracyjny `testy/pracownia-strona.test.mjs`, który uruchamia generator dla `false`, następnie dla `true`, po czym przywraca `false` i ponownie buduje serwis.

Nie dodano zależności ani nowych reguł CSS. Istniejący wygląd katalogu został wykorzystany bez zmian.

## Jak sprawdzono

### Test automatyczny obu stanów flagi

Polecenie:

```text
node --test --test-isolation=none testy/pracownia-strona.test.mjs
```

Wynik: PASS, 1 test, 0 błędów.

Test potwierdza:

- generowanie `public/pracownia/index.html` przy `false`;
- brak zajawki i brak wpisu sitemap przy `false`;
- obecność zajawki i dokładnie jednego wpisu sitemap przy `true`;
- ponowne ustawienie i zbudowanie stanu końcowego `false`;
- tytuł, opis SEO, canonical, jeden H1, siedem narzędzi, siedem linków do przykładów, koszty jednostek, ceny, zasady jednostek, CTA i blok zaufania;
- brak znaków U+2013 i U+2014 w wynikowej stronie.

Przed wdrożeniem ten sam test został uruchomiony w fazie czerwonej. Zawiódł na `actual: undefined, expected: false`, czyli dokładnie z powodu brakującej flagi.

### Wymagany build

Polecenie:

```text
node build.mjs
```

Wynik: kod wyjścia 0. Generator wypisał `strona  /pracownia/` i zakończył pracę komunikatem `Gotowe. 37 skilli, 54 podstron, katalog public/` przy fladze `false`.

Plik `public/pracownia/index.html` istnieje po buildzie.

### Brak regresji w `public/` przy `false`

Przed zmianami wykonano build bazowy i zapisano SHA-256 wszystkich plików `public/`. Po końcowym buildzie przy `false` porównano całe drzewo ponownie.

Wynik porównania:

- plików bazowych: 112;
- plików końcowych: 113;
- dodane: tylko `pracownia/index.html`;
- zmienione istniejące pliki: 0;
- usunięte pliki: 0.

Polecenie `git diff --stat -- public/` nie pokazuje żadnego wyniku, ponieważ cały katalog `public/` jest wpisany do `.gitignore` i nie jest śledzony przez Git. Dlatego właściwym dowodem regresji jest porównanie hashy. Generator nie zmienił żadnego istniejącego artefaktu i nie wystąpiła różnica od stemplowania daty.

### QA w przeglądarce

Stronę sprawdzono przez lokalny serwer statyczny w Chrome na dwóch szerokościach.

Desktop, viewport 1440 px:

- szerokość klienta i dokumentu: 1425 px, bez poziomego przepełnienia;
- 1 H1, 7 wierszy narzędzi i 7 linków do przykładów;
- CTA widoczne;
- wszystkie zadeklarowane obrazy załadowane;
- arkusz CSS i fonty załadowane poprawnie.

Telefon, viewport 320 px:

- szerokość klienta i dokumentu: 305 px, bez poziomego przepełnienia strony;
- tabela ma 239 px szerokości widocznej i 546 px zawartości, więc przewija się poziomo wyłącznie we własnym kontenerze;
- CTA mieści się w ekranie, od 54 px do 251 px;
- menu mobilne jest widoczne;
- 1 H1, 7 wierszy narzędzi i brak uszkodzonych obrazów.

W konsoli strony nie było błędów pochodzących z serwisu. Pojawił się jeden błąd skryptu rozszerzenia Chrome, niezwiązany z lokalnym HTML-em.

### Kontrole końcowe

- `git diff --check`: bez błędów.
- Skan znaków U+2013 i U+2014 w nowych plikach i nowych liniach: brak dopasowań.
- `config.json`: `pracowniaWKatalogu` ma końcowo wartość `false`.
- Nie zmieniono `szablony/styl.css` ani treści istniejących stron.
- Nie wykonano wdrożenia, publikacji ani zakupu. Praca objęła wyłącznie to repozytorium i lokalną weryfikację wygenerowanej strony.
