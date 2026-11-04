# Pierwsze uruchomienie

Skill działa w asystencie AI (Claude, także ChatGPT), a punktację oceny ryzyka
klienta liczy dołączony skrypt Pythona. Do skryptu potrzebujesz jednego:
zainstalowanego Pythona 3.10 lub nowszego. Żadnych bibliotek nie instalujesz,
skrypt działa na czystym Pythonie.

## 1. Python

- **Windows:** pobierz instalator z python.org i podczas instalacji zaznacz
  "Add python.exe to PATH". W terminalu (PowerShell) polecenia uruchamiasz przez
  `python` albo `py` (samo `python3` na Windows zwykle nie działa).
- **macOS / Linux:** zwykle Python już jest; polecenie `python3`.

Sprawdź: `python --version` (Windows) albo `python3 --version` ma wypisać
wersję 3.10 lub wyższą.

## 2. Szybki test

Z katalogu skilla:

```
python scripts/ocena_ryzyka.py --selftest
```

Ma wypisać na końcu `SELFTEST OK` (po drodze pokaże kilka komunikatów BLAD,
to celowe testy negatywne). Potem przykład od A do Z:

```
python scripts/ocena_ryzyka.py assets/przyklady/ocena-klienta.json
```

Ma powstać raport oceny klienta `klient-K-014` ze śladem obliczeń (wkład
każdego czynnika) i wynikiem JSON. Jeśli tak, środowisko jest gotowe do pracy.

## 3. Praca ze skillem

Plików JSON nie piszesz ręcznie: asystent z tym skillem buduje je z Twoich
odpowiedzi (model oceny z wagami i progami, potem oceny konkretnych klientów)
i pokazuje do akceptacji przed uruchomieniem. Wzór wejścia:
`assets/przyklady/ocena-klienta.json`.

Ważne: w plikach ocen używaj neutralnych oznaczeń klientów (np. `klient-K-014`),
nie imion, nazwisk ani numerów. Skrypt odmówi przetworzenia pliku, w którym
wykryje numer w formacie PESEL. Szczegóły: `DANE-I-PRYWATNOSC.md`.
