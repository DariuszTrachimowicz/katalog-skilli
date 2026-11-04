# Dane klientów a praca z tym narzędziem

Krótko i konkretnie, dla instytucji obowiązanej z procedurami RODO. To materiał
informacyjny o architekturze narzędzia, nie porada prawna.

## Co działa lokalnie, a co idzie do modelu AI

- **Lokalnie, na Twoim komputerze:** skrypt punktacji (`ocena_ryzyka.py`),
  pliki wejściowe JSON i wyniki ocen. Skrypt nie łączy się z siecią i niczego
  nie wysyła.
- **Do dostawcy asystenta AI (chmura):** treść rozmowy z asystentem, czyli to,
  co wkleisz w czacie, oraz instrukcje skilla. Zasady przechowywania
  i przetwarzania tych danych określa regulamin Twojego dostawcy asystenta
  (Anthropic, OpenAI itd.) i wybrany plan; sprawdź je, zanim zaczniesz
  pracować na danych klientów.

## Zasady pracy wpisane w skill

- Minimalizacja: klientów w plikach ocen oznaczasz neutralnie
  (np. `klient-K-014`, spójnie z Twoją ewidencją), a uzasadnienia ocen opisujesz
  okolicznościami, nie tożsamością ("klient deklaruje regularne wpłaty gotówkowe",
  nie kto nim jest). Do policzenia ryzyka nie są potrzebne numery PESEL,
  imiona ani adresy zamieszkania.
- Skrypt odmawia przetworzenia pliku, w którym wykryje długi ciąg cyfr
  wyglądający na numer PESEL albo numer rachunku (to filtr ostatniej szansy,
  nie pełna kontrola: imion i adresów nie rozpozna; usunięcie danych przed
  wklejeniem należy do Ciebie).
- Dokumenty AML z natury opisują ryzyka i klientów, więc rozmowę z asystentem
  prowadź na poziomie kategorii i okoliczności; konkretne dane identyfikacyjne
  (numery dokumentów, rachunki) trzymaj w swoich aktach, poza czatem.
- Notatki dotyczące okoliczności podejrzanych traktuj ze szczególną ostrożnością:
  skill tworzy je wyłącznie jako wewnętrzne projekty, a obowiązuje Cię ustawowy
  zakaz ujawniania (także wobec osób postronnych i narzędzi, którym nie musisz
  nic przekazywać).

## Przechowywanie i kopie

- Komplet dokumentacji (ocena instytucji, procedura, model, oceny klientów,
  ewidencje) obejmij firmową polityką kopii zapasowych i okresów
  przechowywania tak, jak pozostałą dokumentację AML; ustawa wyznacza okresy
  przechowywania, zweryfikuj je u źródła.
- Usunięcie plików lokalnych to Twoja strona; usunięciem historii rozmów
  rządzi panel Twojego dostawcy asystenta.
