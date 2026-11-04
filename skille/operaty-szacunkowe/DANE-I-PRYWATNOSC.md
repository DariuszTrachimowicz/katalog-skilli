# Dane klientów a praca z tym narzędziem

Krótko i konkretnie, dla kancelarii rzeczoznawcy z procedurami RODO. To materiał
informacyjny o architekturze narzędzia, nie porada prawna.

## Co działa lokalnie, a co idzie do modelu AI

- **Lokalnie, na Twoim komputerze:** wszystkie skrypty (`rejestr.py`,
  kalkulatory), rejestr decyzji, pliki wejściowe JSON, arkusze XLSX i wyniki.
  Skrypty nie łączą się z siecią i niczego nie wysyłają.
- **Do dostawcy asystenta AI (chmura):** treść rozmowy z asystentem, czyli to,
  co wkleisz w czacie, oraz instrukcje skilla. Retencję i przetwarzanie tych
  danych określa regulamin Twojego dostawcy asystenta (Anthropic, OpenAI itd.)
  i wybrany plan; sprawdź je przed pracą na danych zleceń.

## Zasady pracy wpisane w skill

- Minimalizacja: transakcje porównawcze opisuj bez danych stron; do wyceny nie
  są potrzebne PESEL-e, imiona ani adresy zamieszkania stron. Rejestr odmawia
  zapisu wpisów z typowym numerem PESEL (to filtr ostatniej szansy, nie pełna
  kontrola: imion i adresów nie rozpozna).
- Ocena poufności przed wprowadzeniem materiału zlecenia (zalecenia PFSRM dot.
  narzędzi AI): dane identyfikujące klienta i szczegóły umów wprowadzaj tylko
  w zakresie niezbędnym; identyfikator wyceny trzymaj neutralny.
- Anonimizacja przed wklejeniem: z odpisów i aktów przenoś treść merytoryczną
  (daty, kwoty, oznaczenia nieruchomości potrzebne do wyceny), nie dane osobowe
  stron.

## Przechowywanie i kopie

- Katalog wyceny (`wycena-<id>/`) to komplet śladu: rejestr, wejścia, XLSX,
  wyniki. Obejmij go firmową polityką kopii zapasowych i retencji tak, jak
  akta zlecenia.
- Usunięcie sprawy = usunięcie katalogu wyceny po stronie lokalnej; usunięciem
  historii rozmów rządzi panel Twojego dostawcy asystenta.
- Wynik `rejestr.py check` podaje skrót końcowy łańcucha; zanotowany w operacie
  pozwala później wykazać, że rejestr nie był zmieniany.
