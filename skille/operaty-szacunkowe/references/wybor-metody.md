# Wybór podejścia i metody: drzewo decyzyjne

Kolejność pytań w etapie 1. Wybór ZAWSZE z uzasadnieniem do rejestru
(typ: decyzja). Cel → rodzaj wartości → podejście → metoda (→ technika tam,
gdzie metoda ją rozróżnia). To wybór wstępny: po analizie rynku wolno go
zmienić nowym wpisem `decyzja` z uzasadnieniem.

## Krok 1: cel → rodzaj wartości i reżim

| Cel | Rodzaj wartości | Uwagi |
|---|---|---|
| zabezpieczenie kredytu | rynkowa (WR) | wymogi banku/AMRON; komentarz do odchyleń od statystyki |
| sprzedaż / negocjacje | rynkowa | brak uwag szczególnych |
| podział majątku / spadek / postępowania podatkowe | rynkowa | spodziewaj się wrogiego czytelnika, pełny ślad obowiązkowy |
| wywłaszczenie / ZRID | rynkowa; odtworzeniowa, gdy nieruchomości danego rodzaju nie występują w obrocie | REŻIM SZCZEGÓLNY (zasada korzyści, odrębne daty i tryb): poza pełnym wsparciem tego wydania |
| opłaty adiacenckie (podział, scalenie i podział, infrastruktura) | rynkowa "przed" i "po" | trzy ODRĘBNE przypadki, każdy z własnymi regułami dat i stanu: reżim szczególny poza tym wydaniem |
| opłata planistyczna | rynkowa "przed" i "po" | to NIE jest opłata adiacencka; reguły (w tym daty) z ustawy planistycznej: reżim szczególny poza tym wydaniem |
| aktualizacja opłaty za UW | rynkowa gruntu | co do zasady podejście porównawcze (z wyjątkami z rozporządzenia), grunt jak niezabudowany, stan i ceny na dzień aktualizacji: reżim szczególny poza tym wydaniem |
| sprawozdawczość finansowa | godziwa | odesłanie do MSR/MSSF, poza tym wydaniem |
| nieruchomość ze względu na rodzaj, obecne użytkowanie lub przeznaczenie nie jest lub nie może być przedmiotem obrotu (albo wymagają tego przepisy szczególne) | odtworzeniowa | podejście kosztowe |

Dla celów oznaczonych "reżim szczególny poza tym wydaniem": skill wspiera część
warsztatową (rejestr, próba, obliczenia cząstkowe), ale reguł szczególnych
(daty, stany, tryb) nie zna na pamięć; rzeczoznawca prowadzi je według
przepisów właściwych dla celu i zapisuje podstawę w rejestrze. Uwaga: sam brak
danych porównawczych NIE zmienia rodzaju wartości; dla nieruchomości mogącej
być przedmiotem obrotu nadal określa się wartość rynkową.

## Krok 2: podejście

- **Porównawcze**: gdy istnieją ceny transakcyjne nieruchomości podobnych
  (warunek ustawowy). Domyślne dla mieszkań, działek, typowych domów.
- **Dochodowe**: gdy nieruchomość przynosi lub może przynosić dochód
  (komercja, najem). Warunek: znajomość dochodów z nieruchomości podobnych.
- **Kosztowe**: gdy określa się wartość odtworzeniową (krok 1) albo cel tego wymaga.
- **Mieszane**: m.in. metoda pozostałościowa (rozwój/inwestycje), poza tym wydaniem.

## Krok 3: metoda (i technika, jeśli występuje) obsługiwane w tym wydaniu

**Porównawcze** (metody, bez podziału na techniki):
- *porównywanie parami*: mała, dobrze opisana próba (co najmniej 3 nieruchomości
  najbardziej podobne, praktycznie kilka-kilkanaście); → `porownywanie_parami.py`
- *korygowanie ceny średniej*: większa próba (kilkanaście+); poza tym wydaniem: jeśli
  rynek wymaga tej metody, skill prowadzi metodycznie (kryteria, rejestr,
  struktura), ale obliczeń nie wykonuje; rzeczoznawca liczy poza skillem
  i odnotowuje to w rejestrze
- *analiza statystyczna rynku*: duże zbiory; poza tym wydaniem

**Dochodowe**: metoda inwestycyjna, technika *kapitalizacji prostej* →
`kapitalizacja.py` (dochód stabilny, stopa przyjęta decyzją rzeczoznawcy);
metoda zysków oraz technika *dyskontowania (DCF)*: poza tym wydaniem.

**Kosztowe**: najpierw metoda (koszty odtworzenia ALBO koszty zastąpienia),
potem technika (szczegółowa / elementów scalonych / wskaźnikowa). Wskaźniki
wprowadza użytkownik (katalogi licencjonowane); zużycie → `zuzycie.py`;
pełny kalkulator kosztowy: poza tym wydaniem.

## Bramka wyjścia z kroku 3

Zanim przejdziesz do etapu 2, w rejestrze muszą być wpisy: cel, rodzaj wartości,
podejście i metoda (z techniką, jeśli metoda ją rozróżnia) z uzasadnieniem
odwołującym się do pełnych przesłanek wyboru: celu wyceny, rodzaju i położenia
nieruchomości, jej przeznaczenia, stanu oraz dostępnych danych o cenach
i dochodach (przesłanki ustawowe doboru sposobu wyceny). Metoda "bo zawsze tak robię"
nie jest uzasadnieniem.
