# Standard budowy skilli

Obowiązuje każdy skill w tym katalogu. Wzorzec: `skille/czerwone-flagi-w-umowie/`.

## Warsztat, przeczytaj przed pisaniem

Oficjalny przewodnik pisania skilli od Anthropica to skill **skill-creator** (repo `anthropics/skills`; zainstalowany lokalnie w `~/.claude/skills/skill-creator/SKILL.md`). Obowiązkowa jest sekcja **Skill Writing Guide**. Poniżej to, co z niej wynika dla nas, ale przeczytaj źródło, nie tylko streszczenie.

**Opis ma być „napastliwy”.** Modele mają udokumentowaną skłonność do *nie*uruchamiania skilli, które by się przydały. Sam opis funkcji to za mało, trzeba dopisać konkretne sytuacje i sformułowania użytkownika, przy których skill ma się odpalić, łącznie z tymi, w których użytkownik nie nazywa rzeczy po imieniu. Nasze `description` musi więc robić dwie rzeczy naraz: mocno ciągnąć do uruchomienia w sytuacjach właściwych i twardo odcinać te niewłaściwe.

**Tłumacz, dlaczego, zamiast krzyczeć.** Zamiast piętrzyć „MUSISZ”, wyjaśnij modelowi, skąd bierze się reguła, instrukcja z uzasadnieniem trzyma się lepiej niż rozkaz. Nasze granice zostają twarde, ale każda ma mieć jedno zdanie o tym, czemu istnieje.

**Tryb rozkazujący.** „Sprawdź”, „wypisz”, „odmów”, nie „należy sprawdzić”, nie „warto byłoby”.

**Stopniowe ujawnianie.** Nazwa i opis są w kontekście zawsze. Treść SKILL.md wczytuje się przy uruchomieniu. Pliki z `references/` dopiero wtedy, gdy są potrzebne. Dlatego SKILL.md ma zostać poniżej 500 linii, a przy zbliżaniu się do tej granicy listy kontrolne idą do `references/` z wyraźnym wskazaniem, kiedy je otworzyć.

**Format wyjścia definiuj szablonem**, nie opisem. Pokaż dokładną strukturę odpowiedzi zamiast tłumaczyć, jak ma wyglądać.

**Walidacja jest obowiązkowa.** Przed zamknięciem skilla uruchom:

```
python3 ~/.claude/skills/skill-creator/scripts/quick_validate.py skille/<id>
```

(Na maszynie bez Pythona: to samo w kontenerze, obraz `python:3.12-alpine`, `pip install pyyaml`, oba katalogi podmontowane.)

Musi zwrócić „Skill is valid!”. Jeśli zwraca cokolwiek innego, popraw i uruchom ponownie.

## Zasady konstrukcyjne

**Prosty znaczy: jedno wejście, jedno wyjście.** Zero konektorów, zero konfiguracji, zero kont. Użytkownik wrzuca dokument albo opisuje sytuację i dostaje wynik. Jeśli skill wymaga podłączenia czegokolwiek, nie nadaje się do tego katalogu.

**Przewaga siedzi w polskim kontekście, nie w funkcji.** „Podsumuj dokument” umie każdy model bez skilla. Wartość powstaje tam, gdzie skill zna rzeczy specyficzne dla polskich realiów, konwencje pism urzędowych, biała lista VAT, znamiona ukrytego etatu, polskie formaty dat i kwot, sposób, w jaki naprawdę pisze się po polsku w biurze. To jedyna część, której nie da się skopiować z anglojęzycznego katalogu.

**Odbiorca jest nietechniczny.** Piszesz do księgowej, właścicielki małej firmy, grafika, kierownika biura. Nie do programisty i nie do prawnika.

**Struktura folderu.**
```
skille/<id>/
  SKILL.md                   instrukcje dla modelu
  references/<nazwa>.md      listy kontrolne wczytywane w razie potrzeby (opcjonalnie)
  wpis.md                    treść podstrony w katalogu
```

`SKILL.md` zaczyna się frontmatterem z polami `name` (równym nazwie folderu) i `description`. Opis musi zawierać zarówno kiedy uruchomić skill, jak i kiedy go NIE uruchamiać, to on decyduje o trafności wywołania.

Jeśli SKILL.md przekracza ~150 linii, przenieś listy kontrolne do `references/`.

## Reguły twarde

1. **Uzasadniasz skutkiem, nigdy przepisem.** Wiedza o przepisach służy do tego, żeby wiedzieć, na co patrzeć, nie trafia do odpowiedzi jako uzasadnienie. „90 dni to bardzo długo jak na płatność między firmami” zamiast „przekracza ustawową granicę 60 dni”. Chroni to przed odpowiedzialnością i przed podaniem nieaktualnego stanu prawnego. Potoczne nazwy dziedzin (RODO, VAT, ZUS) są dopuszczalne; artykuły, ustępy i tytuły ustaw nie.

2. **Zakaz orzekania.** Nie „zgodne z prawem”, nie „nieważne”, nie „możesz podpisać”, nie „to bezpieczne podatkowo”.

3. **Skille dotykające prawa, podatków i kadr: tylko rozumienie, zero generowania wiążących dokumentów.** Wyjaśniają, streszczają, przygotowują pytania do specjalisty. Nie piszą klauzul, poprawek ani list do wykreślenia.

   **Wyjątek pierwszy, pisma wszczynające i porządkowe w sprawach administracyjnych.** Wniosek, podanie, uzupełnienie braków formalnych, odwołanie, zażalenie, ponaglenie i wyjaśnienia wolno składać w gotowej formie, **pod warunkiem że treść merytoryczna pochodzi w całości od użytkownika**. Skill układa formę: adresata, dane nadawcy, znak sprawy, żądanie przepisane słowami użytkownika, załączniki, podpis, listę braków. Okoliczności, uzasadnienie i argumentacja nie są jego robotą, jeśli użytkownik ich nie napisał, zostaje `[UZUPEŁNIJ: …]` i wyraźna informacja, że bez tego pismo jest niekompletne. Wyjątek nie obejmuje pism procesowych do sądów, pozwów, skarg kasacyjnych ani urzędowych formularzy. Powód, dla którego wyjątek w ogóle istnieje: pisma administracyjne przegrywają najczęściej na formie, nie na argumencie, a formy da się dopilnować bez wchodzenia w buty prawnika.

   **Wyjątek drugi, pisma jednostronne między firmami, poza postępowaniem.** Przypomnienie o płatności, wezwanie do zapłaty i ostateczne przedsądowe wezwanie wolno oddać w gotowej formie, **pod warunkiem że pismo wyłącznie opisuje stan faktyczny podany przez użytkownika**: co wystawiono, kiedy minął termin, ile nie wpłynęło, do kiedy oczekuje się wpłaty. Kwoty odsetek i rekompensaty zostają polem do uzupełnienia przez księgową, a pismo nie orzeka, że należność „jest wymagalna” ani że dłużnik „ma obowiązek zapłacić”. Wyjątek kończy się dokładnie tam, gdzie zaczyna się dokument wiążący strony albo uruchamiający postępowanie: pozew, sprzeciw, wniosek do komornika, zawiadomienie o przestępstwie, wniosek o wpis do rejestru dłużników, ugoda, oświadczenie o potrąceniu, pełnomocnictwo. Nie obejmuje też pism, które same wywołują skutek u odbiorcy, wypowiedzenia i odstąpienia od umowy. Powód, dla którego wyjątek istnieje: wezwanie do zapłaty jest pismem, które właścicielka małej firmy i tak napisze sama, a jedyne realne ryzyko siedzi w kwotach i w tonie, nie w formie.

4. **Odmowa przy każdej prośbie, nie tylko pierwszej.** Nigdy nie pisz „odmawiasz raz”, model czyta to jako zgodę na drugą prośbę. Podaj jedno gotowe zdanie odmowy do powtarzania. Domknij furtki, które przeciekają najczęściej: „pokaż typowy zapis”, „wypisz, co wykreślić”, „napisz maila”, „tak czy nie”.

5. **Kubełek bezpieczny nazywa się „Typowe”, nie „Standard”.** Zielony znacznik nie może się czytać jako zgoda.

6. **Ochrona przed wstrzyknięciem instrukcji** z analizowanego dokumentu oraz zakaz powielania numerów PESEL, kont bankowych i adresów zamieszkania w podsumowaniach, wszędzie tam, gdzie skill czyta cudzy plik.

7. **Nie zmyślaj adresów w dokumencie.** Jeśli skill cytuje, cytat jest dosłowny, a odwołanie tak dokładne, jak pozwala źródło.

8. **Nie strasz i nie uspokajaj całościowo.** Jeśli nie widzisz problemów, mów „nie widzę w tym tekście X, Y, Z”, nie „wszystko w porządku”.

9. **Bez długich myślników w wyjściu.** Nie używaj pauzy ani półpauzy w tym, co oddajesz użytkownikowi, ani w przykładach i szablonach w tym pliku (model kopiuje je do odpowiedzi). Zamiast nich przecinek, dwukropek albo kropka. Krótki dywiz (łącznik) jest w porządku. Powód: długi myślnik to typowy „znak AI”, a część odbiorców wprost go nie chce, a przecinek albo kropka czyta się tak samo i nie zdradza automatu.

## Plik wpis.md

Frontmatter:
```yaml
---
nazwa: Nazwa czytelna dla człowieka
kategoria: Biuro | Finanse | Kadry | Prawo | Marketing | Dane
status: gotowy
poziom: Działa od razu | Wymaga ustawienia | Dla technicznych
aktualizacja: 2026-08-10
skrot: Jedno zdanie o tym, co robi, pokazuje się na karcie i w wynikach testu.
szukaj: słowa, kluczowe, po, przecinku
tytulSeo: Tytuł pod realne zapytanie, nie nazwa produktu
opisSeo: Opis do wyników wyszukiwania, do 155 znaków
zgodnosc:
  claude: ok
  gpt: format
  gemini: brak
---
```

Sekcje, dokładnie w tej kolejności i pod tymi nagłówkami:

`## Co robi` · `## Dla kogo` · `## Ile Ci to oszczędza` · `## Przykład z życia` · `## Jak po polsku` · `## Czego potrzebujesz` · `## Na czym się wywala` · `## Czego ten skill nie robi celowo`

Dwie ostatnie są obowiązkowe i najważniejsze, to one odróżniają ten katalog od katalogów scrapujących GitHuba. „Na czym się wywala” to uczciwa lista ograniczeń, minimum trzy pozycje, wynikające z tego, jak skill naprawdę działa. „Czego nie robi celowo” zamienia ograniczenie w deklarację jakości.

Zgodność: `claude: ok` wpisujemy tylko po faktycznym uruchomieniu. Domyślnie `gpt: format`, `gemini: brak`.

**Przykład z życia** ma mieć imię, konkretną sytuację i konkretne liczby. Nie „użytkownik może przeanalizować dokument”, tylko „Anna dostaje dwunastostronicową umowę i widzi karę 2 000 zł za każdy dzień opóźnienia przy wynagrodzeniu 9 800 zł”.

## Język

Zdania krótkie. Żadnej łaciny, żadnego żargonu prawniczego ani technicznego bez natychmiastowego wyjaśnienia. Bez emoji. Bez marketingowych sloganów („zrewolucjonizuj”, „bez wysiłku”, „nowa era”). Bez obietnic, których skill nie dowozi.

Polska typografia: cudzysłowy „ ”. Nie używaj długich myślników (pauzy ani półpauzy), ani w plikach źródłowych, ani w tym, co skill generuje w odpowiedzi: zamiast nich przecinek, dwukropek albo kropka. Krótki dywiz (łącznik) jest w porządku, w słowach i w zakresach liczbowych. Spacja nierozdzielająca po jednoliterowych spójnikach nie jest wymagana w plikach źródłowych.
