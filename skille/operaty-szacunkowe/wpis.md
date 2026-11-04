---
nazwa: Operaty szacunkowe, warsztat rzeczoznawcy
kategoria: Finanse
status: gotowy
wersja: 1.1.0
poziom: Zaawansowany
aktualizacja: 2026-11-04
skrot: Prowadzi rzeczoznawcę majątkowego przez wycenę nieruchomości etapami z twardymi bramkami, liczy skryptami ze śladem obliczeń w XLSX, pilnuje rejestru decyzji i samooceny operatu przed oddaniem.
szukaj: operat szacunkowy, wycena nieruchomości, rzeczoznawca majątkowy, podejście porównawcze, porównywanie parami, podejście dochodowe, stopa kapitalizacji, zużycie techniczne, analiza rynku, wagi cech, rejestr decyzji, ocena operatu, finanse
tytulSeo: Operat szacunkowy ze śladem obliczeń, darmowy skill dla rzeczoznawcy
opisSeo: "Warsztat rzeczoznawcy majątkowego: wycena etapami z bramkami, obliczenia skryptami ze śladem w XLSX, rejestr decyzji i samoocena operatu przed oddaniem."
zgodnosc:
  claude: ok
  gpt: ok
  gemini: ok
---

## Co robi

Prowadzi rzeczoznawcę majątkowego przez sporządzenie operatu szacunkowego w pięciu etapach z twardymi bramkami: założenia, analiza rynku, obliczenia, redakcja, kontrola. Każda decyzja (kryteria doboru próby, odrzucenie transakcji, rozstrzygnięcie outliera, wagi cech, wybór metody) trafia z uzasadnieniem do rejestru decyzji, w którym wpisy tworzą łańcuch skrótów, a powroty do wcześniejszych etapów wymagają jawnego wpisu z uzasadnieniem. Obliczenia wykonują skrypty, nie model: porównywanie parami z analizą wrażliwości (z arkuszem XLSX: liczby statyczne bez formuł, ślad do kontroli, nie arkusz roboczy; kluczowe wielkości mają w tablicy wiązań wskazane źródło i komórkę wyniku), zużycie techniczne i kapitalizacja prosta (obie z zapisem rachunku w wyniku) oraz statystyka próby. Na koniec skill przechodzi z Tobą arkusz samooceny operatu przed oddaniem.

Wspiera warsztat. Autorem operatu jest rzeczoznawca, który weryfikuje dane, założenia i wyniki i odpowiada za treść operatu.

## Dla kogo

Rzeczoznawcy majątkowi oraz kandydaci w praktykach pracujący pod opieką osoby uprawnionej. Nie dla osób bez uprawnień, które chciałyby "wycenić sobie mieszkanie": skill wprost odmawia takiej roli.

## Ile Ci to oszczędza

Godziny składania arkuszy obliczeniowych od zera i pilnowania, czy nic nie umknęło: trend przed porównaniem, suma wag, uzasadnienia odrzuceń, decyzje przy outlierach, komentarz do odchylenia wyniku. Przy sprawdzaniu cudzego lub starszego operatu dostajesz gotowy układ samooceny zamiast czytania na wyczucie.

## Przykład z życia

Marek wycenia mieszkanie 54 m2 pod kredyt. Skill nie pozwala mu wrzucić transakcji, zanim nie zadeklaruje kryteriów doboru próby, wychwytuje, że wagi cech sumują się do 105%, wstrzymuje obliczenia przy odstającej transakcji do czasu decyzji z uzasadnieniem, a po obliczeniach flaguje, że wynik odbiega od mediany próby o 24% i wymaga akapitu uzasadnienia. Do banku idzie operat z XLSX, w którym kluczowe wielkości mają wskazane źródło w tablicy wiązań.

## Jak po polsku

Zbudowany pod polski warsztat wyceny: podejścia i metody w układzie znanym z polskiej praktyki i standardów zawodowych, ceny w zł, dane transakcyjne w konwencji RCN i aktów notarialnych, samoocena w układzie, w jakim operaty zwykle czytają oceniający z organizacji zawodowych. Stan prawny referencji ma jawną datę i skill sam przypomina o jego weryfikacji po 6 miesiącach.

## Czego potrzebujesz

Własnych danych rynkowych (transakcje, stawki, stopy z Twojego badania rynku), dokumentów nieruchomości oraz komputera z Pythonem 3.10+ (na Windows polecenie `python` albo `py`); biblioteka openpyxl potrzebna tylko do arkusza XLSX z porównywania parami, reszta działa na czystym Pythonie. W pakiecie jest instrukcja "Pierwsze uruchomienie w 5 minut" (INSTALACJA.md), plik requirements.txt, wzory plików wejściowych i kompletna pokazowa wycena od A do Z (assets/przyklady). Plików JSON nie piszesz ręcznie: asystent buduje je z Twoich danych (możesz wkleić tabelę albo CSV) i pokazuje do akceptacji. Skill nie ma dostępu do żadnych baz transakcji i niczego z nich nie pobiera.

## Na czym się wywala

- Nie poda ani jednej liczby rynkowej: transakcje, czynsze, stopy i wskaźniki musisz mieć z własnego badania rynku, bez nich obliczenia nie ruszą; ceny ofertowe z portali wchodzą najwyżej jako materiał pomocniczy analizy, nigdy do próby.
- Faza 1 liczy porównywanie parami, zużycie, kapitalizację prostą i statystykę próby; korygowanie ceny średniej, DCF, metoda pozostałościowa i kalkulatory opłat są poza tym wydaniem, a cele o reżimach szczególnych (wywłaszczenia, opłaty, aktualizacja UW) prowadzisz według przepisów właściwych, skill wspiera tylko część warsztatową.
- Kalkulator porównywania parami rozkłada poprawki liniowo między stopniami skali ocen; przy cechach o nieliniowym wpływie korekty per stopień robisz poza skryptem i opisujesz w operacie.
- Skrypty wymagają Pythona 3.10+ (XLSX dodatkowo openpyxl); bez tego zostaje prowadzenie metodyczne bez obliczeń.
- Stan prawny referencji ma jawną datę i skill sam przypomina o weryfikacji po 6 miesiącach; nowsze wydania paczki pobierasz z katalogu, sam decydujesz, kiedy podmienić.
- Nie łączy się z księgami wieczystymi ani rejestrami: dane z KW wchodzą tylko jako pliki, które sam wgrasz.

## Czego ten skill nie robi celowo

Nie wymyśla transakcji ani wartości, nie dobiera wag pod oczekiwany wynik nawet na wyraźną prośbę, nie wybiera za Ciebie stopy kapitalizacji, nie podpisuje operatu i nie orzeka, że operat jest zgodny z przepisami: samoocena wskazuje punkty do poprawy, ocena należy do rzeczoznawcy i organizacji zawodowej. Każdy generowany fragment jest oznaczony jako materiał warsztatowy do weryfikacji. Robi tak, bo operat z dobranym wynikiem to ryzyko odpowiedzialności zawodowej autora, a wartość tego narzędzia siedzi w śladzie obliczeń, który da się sprawdzić liczba po liczbie.
