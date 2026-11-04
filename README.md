# Katalog skilli AI, serwis

Statyczny serwis generowany z folderów ze skillami, plus mała usługa obsługująca zapisy z testu doboru.

**Zero zależności zewnętrznych.** Nie ma `node_modules`, nie ma `npm install`, nie ma czego aktualizować. Wszystko, czego serwis używa, jest w standardowej bibliotece Node. Za trzy lata zbuduje się tak samo jak dziś.

Produkcja chodzi w Dockerze: dwa kontenery (nginx ze zbudowanym serwisem + usługa zapisów), zbudowane z jednego `Dockerfile`. Build stron dzieje się w obrazie, więc serwer nie potrzebuje Node.

Przed publikacją ze wspólnego katalogu AiXperts uruchom również
`node --test testy/spojnosc-oferty.test.mjs`. To kontrola wydania obejmująca
**dwa repozytoria**: wymaga sąsiedniego `../skille-platne/licencje/produkty.json`,
czyli kanonicznych cen zamówień. Nie jest częścią budowania obrazu katalogu.
Samodzielny klon katalogu bez drugiego repozytorium nie wystarcza do tej kontroli;
braku źródła cen nie traktujemy jako udanego testu.

Pomiar przejść jest w `szablony/ekosystem.js`; generator kopiuje go do `public`.
Portal korzysta z identycznej kopii `../portal-tymczasowy/ekosystem.js`.
Zmieniając ten moduł, aktualizuj obie kopie i wersje odwołań w HTML.
`aix_dx_click` oznacza wyjście do d-x.pl, a `zakup-klik` wyłącznie otwarcie
zamówienia. Liczbę opłaconych zamówień sprawdzaj w serwerze licencji.

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

Zanim zaczniesz pisać, przeczytaj **`STANDARD.md`**, obowiązuje każdy skill w katalogu: granice merytoryczne, struktura, język i walidacja.

1. Utwórz folder `skille/nazwa-skilla/`
2. Wrzuć do niego `SKILL.md` (i opcjonalnie `references/`, `scripts/`, `assets/`)
3. Dopisz `wpis.md`, nagłówek z metadanymi i sekcje opisowe
4. `node narzedzia/grafiki.mjs`, wygeneruje grafikę podglądu dla social mediów (wymaga Chrome; wynik commitujesz razem ze skillem)
5. `bash serwer/wdroz.sh`

Nawigacja, wyszukiwarka, sitemap i test doboru zaktualizują się same.

### Nagłówek pliku wpis.md

```yaml
---
nazwa: Czerwone flagi w umowie
kategoria: Prawo              # Biuro, Finanse, Kadry, Prawo, Marketing, Dane
status: gotowy                # gotowy | wkrotce
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Jedno zdanie o tym, co robi, pokazuje się na karcie i w wynikach testu.
szukaj: umowa, kontrakt, NDA  # słowa kluczowe po przecinku, zasilają wyszukiwarkę i test
tytulSeo: ...                 # opcjonalne, inaczej powstaje z nazwy
opisSeo: ...                  # opcjonalne, inaczej używany jest skrót
zgodnosc:
  claude: ok                  # ok | format | brak
  gpt: format
  gemini: brak
---
```

Sekcje `## Co robi`, `## Dla kogo`, `## Ile Ci to oszczędza`, `## Przykład z życia`, `## Jak po polsku`, `## Czego potrzebujesz`, `## Na czym się wywala`, `## Czego ten skill nie robi celowo` trafiają w ustalone miejsca szablonu. **Każda inna sekcja `##` wyląduje na dole strony**, tak dokłada się rzeczy nietypowe, na przykład historię powstania skilla.

Statusy zgodności znaczą dokładnie tyle:

| Status | Znaczenie |
|---|---|
| `ok` | uruchomiliśmy skill na tej platformie i sprawdziliśmy wynik |
| `format` | standard jest otwarty, więc powinno zadziałać, ale sami tego nie uruchomiliśmy |
| `brak` | platforma nie udostępnia tej funkcji w Polsce |

Nie wpisuj `ok` bez faktycznego uruchomienia. Cała przewaga tego katalogu nad katalogami scrapującymi GitHuba polega na tym, że tu ta różnica jest prawdziwa.

## Instalacja na serwerze

Serwer potrzebuje tylko Dockera i nginx-a (albo innego proxy), który skieruje domenę na port `8790`. Raz, w wybranym katalogu:

```bash
git clone git@github.com:DariuszTrachimowicz/katalog-skilli.git
cd katalog-skilli
mkdir -p dane && chown 1000:1000 dane   # usługa w kontenerze chodzi jako user "node" (uid 1000)
docker compose up -d --build
```

Bez `chown` usługa zapisów powie to wprost przy starcie i się zatrzyma, zamiast wywrócić się przy pierwszym zapisie, czyli wtedy, gdy ktoś już wypełnia formularz.

Kontener `web` nasłuchuje na `127.0.0.1:8790`, z zewnątrz wystawia go dopiero reverse proxy na hoście, które też terminuje TLS. Na produkcji (VPS z CloudPanelem) robi to vhost typu reverse proxy dla `skille.aixperts.pl`.

Każdą aktualizację robi się potem jednym poleceniem:

```bash
bash serwer/wdroz.sh
```

Skrypt pobiera zmiany z GitHuba i przebudowuje kontenery. Przy błędzie budowania nic nie jest podmieniane, stara wersja zostaje online.

## Zapisy z testu

Adresy trafiają do `dane/zapisy.jsonl` w katalogu projektu na serwerze (w kontenerze widocznym jako `/var/lib/katalog`). Plik jest dziennikiem zdarzeń: zapis, potwierdzenie, wypisanie. Stan listy wylicza się z historii, więc nic się nie gubi i widać, co się kiedy działo. Kopia zapasowa to skopiowanie jednego pliku.

Zapis wymaga potwierdzenia kliknięciem w link z maila. Do tego czasu adres nie trafia na listę.

```bash
docker compose exec zapisy node narzedzia/eksport.mjs              # tylko potwierdzone, w formacie CSV
docker compose exec zapisy node narzedzia/eksport.mjs --wszystkie  # z niepotwierdzonymi, do diagnostyki
docker compose exec zapisy node narzedzia/wymaz.mjs adres@x.pl     # trwałe wymazanie adresu (żądanie RODO)
```

Wypisanie linkiem ukrywa adres ze stanu listy, ale dziennik jest append-only, na żądanie usunięcia danych uruchom `wymaz.mjs`, które usuwa też same bajty z dziennika i z logu maili.

### Wysyłka maili

W `config.json`, w sekcji `zapisy.wysylka`:

- `"tryb": "smtp"`, wysyłka własnym, minimalnym klientem SMTP (STARTTLS + AUTH, czysta biblioteka Node). Uzupełnij `host`, `port`, `uzytkownik`, `nadawca`, a hasło podaj w zmiennej środowiskowej wskazanej w `hasloZmienna`, w Dockerze przez plik `.env` obok `docker-compose.yml` (jest w `.gitignore`, nie trafia do repo).
- `"tryb": "http"`, wysyłka przez API dostawcy poczty (np. Resend). Uzupełnij `url`, `naglowekAutoryzacji` i `nadawca`.
- `"tryb": "log"`, maile lądują w `dane/wyslane-maile.log` zamiast wychodzić; do testów, wszystko inne działa normalnie.

**Nie wysyłaj maili bezpośrednio z VPS-a.** Świeży adres IP nie ma reputacji i wiadomości będą lądować w spamie albo znikać. Trzymanie adresów u siebie jest łatwe, dostarczanie poczty nie jest, to dwie różne rzeczy i tylko drugą warto oddać na zewnątrz.

Po podpięciu dostawcy ustaw dla domeny rekordy SPF, DKIM i DMARC, bez nich nawet dobry dostawca nie uratuje dostarczalności.

## Sprawdzenie, czy żyje

```bash
docker compose ps
docker compose logs -f zapisy
curl -s localhost:8790/api/zdrowie
```

## Czego tu celowo nie ma

Kont użytkowników, panelu administracyjnego, bazy danych, komentarzy, ocen, systemu wtyczek i automatycznej synchronizacji z GitHubem. Każde z nich to koszt utrzymania, który nie przekłada się na to, po co ten serwis powstał: żeby ktoś znalazł właściwą umiejętność, pobrał ją i został na szkoleniu.

## Licencja i twórca

Twórca: **Dariusz Trachimowicz**. Strona projektu: https://skille.aixperts.pl

Skille w tym katalogu są objęte licencją **GPL-3.0-or-later** (GNU General Public License w wersji 3 lub nowszej). Pełny tekst licencji jest w pliku [`LICENSE`](LICENSE), a jego oficjalna wersja pod adresem https://www.gnu.org/licenses/gpl-3.0.html

Co to oznacza w praktyce: możesz te skille pobierać, używać, kopiować i zmieniać za darmo, także w firmie i komercyjnie. Jeśli rozpowszechniasz je dalej (w oryginale albo zmienione), robisz to na tej samej licencji i zachowujesz informację o autorze oraz źródle. Skille są udostępniane bez jakiejkolwiek gwarancji.

Każda paczka `.skill` niesie tę informację ze sobą: metryczkę w nagłówku `SKILL.md` (autor, licencja, źródło), pełny tekst licencji w `LICENSE.txt` oraz krótką notkę po polsku w `LICENCJA.txt`. Dzięki temu licencja i autorstwo zostają przy pliku, nawet gdy krąży poza tą stroną.
