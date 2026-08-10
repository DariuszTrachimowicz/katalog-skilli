# Katalog skilli AI — serwis

Statyczny serwis generowany z folderów ze skillami, plus mała usługa obsługująca zapisy z testu doboru.

**Zero zależności zewnętrznych.** Nie ma `node_modules`, nie ma `npm install`, nie ma czego aktualizować. Wszystko, czego serwis używa, jest w standardowej bibliotece Node. Za trzy lata zbuduje się tak samo jak dziś.

---

## Jak to działa

Jeden folder skilla daje jednocześnie plik do pobrania i podstronę. Nie da się ich rozjechać, bo powstają z tego samego źródła.

```
skille/
  czerwone-flagi-w-umowie/
    SKILL.md                  ← pakowane do .skill
    references/lista-ryzyk.md ← pakowane do .skill
    wpis.md                   ← renderowane jako podstrona
```

`node build.mjs` produkuje katalog `public/`:

```
public/
  index.html                  strona główna + test doboru
  skill/<id>/index.html       podstrona każdego skilla
  pobierz/<id>.skill          paczka do pobrania
  prywatnosc/index.html
  dane/skille.json            używane przez usługę zapisów
  styl.css  sitemap.xml  robots.txt
```

## Dodanie nowego skilla

1. Utwórz folder `skille/nazwa-skilla/`
2. Wrzuć do niego `SKILL.md` (i opcjonalnie `references/`, `scripts/`, `assets/`)
3. Dopisz `wpis.md` — nagłówek z metadanymi i sekcje opisowe
4. `bash serwer/wdroz.sh`

Nawigacja, wyszukiwarka, sitemap i test doboru zaktualizują się same.

### Nagłówek pliku wpis.md

```yaml
---
nazwa: Czerwone flagi w umowie
kategoria: Prawo              # Biuro, Finanse, Kadry, Prawo, Marketing, Dane
status: gotowy                # gotowy | wkrotce
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Jedno zdanie o tym, co robi — pokazuje się na karcie i w wynikach testu.
szukaj: umowa, kontrakt, NDA  # słowa kluczowe po przecinku, zasilają wyszukiwarkę i test
tytulSeo: ...                 # opcjonalne, inaczej powstaje z nazwy
opisSeo: ...                  # opcjonalne, inaczej używany jest skrót
zgodnosc:
  claude: ok                  # ok | format | brak
  gpt: format
  gemini: brak
---
```

Sekcje `## Co robi`, `## Dla kogo`, `## Ile Ci to oszczędza`, `## Przykład z życia`, `## Jak po polsku`, `## Czego potrzebujesz`, `## Na czym się wywala`, `## Czego ten skill nie robi celowo` trafiają w ustalone miejsca szablonu. **Każda inna sekcja `##` wyląduje na dole strony** — tak dokłada się rzeczy nietypowe, na przykład historię powstania skilla.

Statusy zgodności znaczą dokładnie tyle:

| Status | Znaczenie |
|---|---|
| `ok` | uruchomiliśmy skill na tej platformie i sprawdziliśmy wynik |
| `format` | standard jest otwarty, więc powinno zadziałać — ale sami tego nie uruchomiliśmy |
| `brak` | platforma nie udostępnia tej funkcji w Polsce |

Nie wpisuj `ok` bez faktycznego uruchomienia. Cała przewaga tego katalogu nad katalogami scrapującymi GitHuba polega na tym, że tu ta różnica jest prawdziwa.

## Instalacja na serwerze

Raz, na czystym VPS-ie, jako root:

```bash
bash serwer/instalacja.sh twojadomena.pl
```

Skrypt instaluje Node i nginx, zakłada użytkownika `katalog`, buduje serwis, uruchamia usługę zapisów pod systemd i występuje o certyfikat SSL. Każdą aktualizację robi się potem jednym poleceniem:

```bash
bash /opt/katalog/serwer/wdroz.sh
```

Przy błędzie budowania nic nie jest podmieniane — stara wersja zostaje online.

## Zapisy z testu

Adresy trafiają do `/var/lib/katalog/zapisy.jsonl` na Twoim serwerze. Plik jest dziennikiem zdarzeń: zapis, potwierdzenie, wypisanie. Stan listy wylicza się z historii, więc nic się nie gubi i widać, co się kiedy działo. Kopia zapasowa to skopiowanie jednego pliku.

Zapis wymaga potwierdzenia kliknięciem w link z maila. Do tego czasu adres nie trafia na listę.

```bash
node narzedzia/eksport.mjs              # tylko potwierdzone, w formacie CSV
node narzedzia/eksport.mjs --wszystkie  # z niepotwierdzonymi, do diagnostyki
```

### Wysyłka maili

W `config.json`, w sekcji `zapisy.wysylka`:

- `"tryb": "log"` — maile lądują w `/var/lib/katalog/wyslane-maile.log` zamiast wychodzić. Tak zostaw, dopóki nie podepniesz dostawcy; wszystko inne działa normalnie i możesz przeklikać całą ścieżkę.
- `"tryb": "http"` — wysyłka przez API dostawcy poczty. Uzupełnij `url`, `naglowekAutoryzacji` i `nadawca`.

**Nie wysyłaj maili bezpośrednio z VPS-a.** Świeży adres IP nie ma reputacji i wiadomości będą lądować w spamie albo znikać. Trzymanie adresów u siebie jest łatwe, dostarczanie poczty nie jest — to dwie różne rzeczy i tylko drugą warto oddać na zewnątrz.

Po podpięciu dostawcy ustaw dla domeny rekordy SPF, DKIM i DMARC — bez nich nawet dobry dostawca nie uratuje dostarczalności.

## Sprawdzenie, czy żyje

```bash
systemctl status katalog-zapisy
journalctl -u katalog-zapisy -f
curl -s localhost:8788/api/zdrowie
```

## Czego tu celowo nie ma

Kont użytkowników, panelu administracyjnego, bazy danych, komentarzy, ocen, systemu wtyczek i automatycznej synchronizacji z GitHubem. Każde z nich to koszt utrzymania, który nie przekłada się na to, po co ten serwis powstał: żeby ktoś znalazł właściwą umiejętność, pobrał ją i został na szkoleniu.
