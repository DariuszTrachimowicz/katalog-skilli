# Pierwsze uruchomienie

Skill jest zestawem plików tekstowych, który wgrywa się do asystenta AI.
**Zaprojektowano go i przetestowano na Claude; działanie w innych asystentach
nie zostało przez nas zweryfikowane**, więc nie obiecujemy go i nie opisujemy
instalacji poza Claude.

Poza samym wgraniem paczki skill nie wymaga instalowania żadnej dodatkowej
aplikacji ani wtyczki. Nie łączy się z żadnym systemem urzędowym, nie potrzebuje
dostępu do Twoich programów i nie prosi o dane logowania.

Dokumenty wychodzą w Markdownie, czyli jako zwykły tekst z tabelami, gotowy do
wklejenia do edytora. Konwersję do PDF albo DOCX robisz u siebie; skill nie
potrzebuje do tego żadnego dodatku i żadnego nie wymaga.

## 1. Wgranie skilla

Rozpakuj paczkę i wgraj cały katalog `rodo-dokumentacja` do katalogu skilli
swojego asystenta (w Claude Code jest to zwykle `~/.claude/skills/`).
Struktura po rozpakowaniu:

```
rodo-dokumentacja/
  SKILL.md
  INSTALACJA.md
  DANE-I-PRYWATNOSC.md
  references/
    stan-prawny.md
    komponenty.md
    granice.md
  assets/przyklady/
    rejestr-czynnosci-przyklad.md
```

Nie zmieniaj nazw plików ani katalogów; asystent sięga po nie po ścieżkach.

## 2. Sprawdzenie, czy działa

Napisz do asystenta jedno z tych zdań:

- „Mam mapę danych z rodo-w-malej-firmie, zróbmy z niej rejestr czynności
  przetwarzania."
- „Potrzebuję upoważnień do przetwarzania danych dla trzech osób z biura."
- „Kontrahent każe pokazać rejestr, a my nie mamy nic na papierze."

Skill powinien zacząć od pytań o Twoją firmę i o to, co już masz spisane
(czynności, właściciele procesów, okresy przechowywania), a nie od wykładu
o przepisach. Jeśli odpowiedział ogólnikami bez pytań, powiedz wprost:
„użyj skilla rodo-dokumentacja".

## 3. Zanim zaczniesz pracę

Ten skill zaczyna tam, gdzie kończy darmowy `rodo-w-malej-firmie`: od MAPY
DANYCH. Mapa nie musi być piękna, wystarczy lista: czyje dane, co konkretnie,
po co, gdzie leżą, kto ma dostęp, komu jeszcze trafiają, jak długo są trzymane.
Jeśli takiej listy nie masz, skill i tak zacznie pracę: zada pytania i zbuduje
mapę roboczą w zakresie potrzebnym tym pięciu dokumentom. Do darmowego skilla
odeśle Cię w dwóch sytuacjach: gdy właśnie doszło do incydentu z danymi oraz gdy
chcesz pełnej mapy danych jako osobnego produktu.

Przygotuj sobie odpowiedzi na cztery pytania, resztę skill wyciągnie w rozmowie:

1. Kto w firmie odpowiada za kadry, sprzedaż, marketing i monitoring?
2. Czy robicie coś na cudzych danych na zlecenie (księgowość, serwis, agencja,
   archiwizacja)? To przesądza, czy powstanie także rejestr kategorii czynności.
3. Jak długo trzymacie poszczególne rodzaje dokumentów i skąd to wiecie?
4. Kto ma dostęp do których danych i czy ktoś to kiedykolwiek spisał?

Nie potrzebujesz do tego żadnych plików z systemów ani zrzutów ekranu. Jeśli
wklejasz stare dokumenty, usuń z nich numery PESEL, numery dowodów, numery
rachunków i adresy zamieszkania: skill ich nie potrzebuje.

## 4. Czego skill nie zrobi

Nie dobierze podstaw prawnych do czynności w rejestrze, nie wykona oceny skutków
dla ochrony danych ani jej szkicu i nie rozstrzygnie, czy jest wymagana, nie
napisze, że firma jest zgodna z RODO, nie rozstrzygnie, czy musicie prowadzić
rejestr ani czy musicie nadawać upoważnienia, nie napisze polityki ochrony
danych, klauzuli informacyjnej, treści zgody, umowy powierzenia ani procedury
postępowania przy incydencie, nie przygotuje pisma do urzędu i nie zgłosi
naruszenia. Te rzeczy należą do prawnika, inspektora ochrony danych albo do
osobnych skilli, a skill wprost wskaże, do kogo z czym pójść. Odesłania do innych
skilli katalogu (`pismo-urzedowe`, `czerwone-flagi-w-umowie`,
`rodo-w-malej-firmie`) działają wtedy, gdy je masz; sama ta paczka ich nie
zawiera i bez nich skill po prostu wskaże, kto ma się tym zająć. Szczegóły:
`DANE-I-PRYWATNOSC.md` i `references/granice.md`.

## 5. Aktualizacje

Wskazówki i poradniki organu nadzorczego bywają aktualizowane, a wymogi formy
niektórych dokumentów zmieniały się już wraz z przepisami sektorowymi. Skill
nosi w sobie datę stanu prawnego (plik `references/stan-prawny.md`) i sam
ostrzeże Cię, gdy zrobi się stara. Ten sam plik zawiera rejestr źródeł:
konkretne adresy stron urzędowych wraz z datą sprawdzenia, po tematach. Kolejne wydania pobieraj z katalogu skille.aixperts.pl; niezależnie od tego
weryfikuj stan pod adresami z rejestru źródeł przed wdrożeniem dokumentu.
