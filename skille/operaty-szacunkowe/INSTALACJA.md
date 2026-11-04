# Pierwsze uruchomienie

Skill działa w asystencie AI (Claude, także GPT), a obliczenia wykonują dołączone
skrypty Pythona. Do skryptów potrzebujesz jednego: zainstalowanego Pythona 3.10
lub nowszego.

## 1. Python

- **Windows:** pobierz instalator z python.org i podczas instalacji zaznacz
  "Add python.exe to PATH". W terminalu (PowerShell) polecenia uruchamiasz przez
  `python` albo `py` (samo `python3` na Windows zwykle nie działa).
- **macOS / Linux:** zwykle Python już jest; polecenie `python3`.

Sprawdź: `python --version` (Windows) albo `python3 --version` ma wypisać
wersję 3.10 lub wyższą.

## 2. Biblioteka openpyxl (tylko do arkusza XLSX)

Potrzebna wyłącznie kalkulatorowi porównywania parami (generuje arkusz ze
śladem obliczeń). Pozostałe skrypty działają na czystym Pythonie.

```
python -m pip install -r requirements.txt
```

(na macOS/Linux odpowiednio `python3 -m pip ...`)

## 3. Szybki test

Z katalogu skilla:

```
python scripts/kalkulatory/porownywanie_parami.py assets/przyklady/dane-porownywanie.json
```

Ma powstać plik `assets/przyklady/dane-porownywanie.xlsx` oraz wynik JSON na
ekranie i w pliku `dane-porownywanie.wynik.json`. Jeśli tak, wszystko działa.

## 4. Praca ze skillem

Plików JSON nie piszesz ręcznie: asystent z tym skillem buduje je z danych,
które podasz (możesz wkleić tabelę albo CSV), i pokazuje do akceptacji przed
uruchomieniem. Wzory wejść: `assets/przyklady/`. Kompletna, fikcyjna wycena
pokazowa krok po kroku: `assets/przyklady/PRZYKLAD.md`.
