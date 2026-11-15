Jesteś recenzentem QA (sędzią, tylko odczyt) nowego skilla `oferta-allegro` do darmowego katalogu skilli po polsku. Nie edytuj plików. Czytaj pliki powłoką (`Get-Content -Raw -Encoding UTF8 <plik>`), nie zgaduj, cytuj plik:linia, po polsku, zwięźle, nie chwal, szukaj dziur.

Pliki (katalog bieżący to katalog-skilli):
- skille/oferta-allegro/SKILL.md, skille/oferta-allegro/references/zasady-allegro.md, skille/oferta-allegro/scripts/tytul_allegro.py, skille/oferta-allegro/wpis.md (wpis idzie na publiczną stronę),
- STANDARD.md (standard katalogu, reguły twarde 1-9 i wymagania wpis.md),
- skille/opisy-produktow/SKILL.md i wpis.md (sąsiad; diff: `git diff skille/opisy-produktow`), rozgraniczony w tym wydaniu,
- testy/wyniki-gemini/scenariusze/oferta-allegro.md (scenariusze z asercjami), testy/wyzwalanie/oferta-allegro.md (zestaw wyzwalania),
- testy/oferta-allegro/skill-*.md, jeśli istnieją (wyniki testów na ślepo).

Fakty o Allegro w references/zasady-allegro.md pochodzą z researchu 15.11.2026 ze stron pomocy i dokumentacji Allegro (adresy w rejestrze źródeł na końcu pliku). Nie masz obowiązku ich sprawdzać w sieci; jeśli znasz sprzeczny stan albo twierdzenie w SKILL.md lub wpis.md wychodzi poza to, co stoi w references, wskaż to.

Sprawdź:
1. Opis (description): czy odpala skill we właściwych sytuacjach i odcina niewłaściwe, bez kolizji z opisy-produktow, reklamacja-i-rekojmia, regulamin-pod-lupa, co-mowi-arkusz, wycena-uslugi, newsletter-do-klientow. Czy opisy-produktow po zmianie nie łapie już oferty na Allegro, a dalej łapie opisy do sklepu.
2. Spójność: żadna sekcja SKILL.md nie przeczy innej ani references; wpis.md nie obiecuje więcej, niż robi SKILL.md; FAQ zgodne z treścią; „Przykład z życia” zgodny z zachowaniem skilla (np. liczba znaków tytułu).
3. Granice STANDARD.md 1-8 w zakresie, który dotyczy tego skilla: brak orzekania (2), odmowa przy KAŻDEJ prośbie z jednym zdaniem odmowy i domknięte furtki (4), odporność na polecenia ukryte w pliku i niepowielanie danych osobowych, telefonów, adresów, cen zakupu (6), brak zmyślonych cytatów i adresów (7), brak całościowego „wszystko w porządku” (8). Czy reguła źródła (zero cech spoza danych) jest szczelna: ozdobniki, liczby, dane producenta, rozpoznany model, „pewnie jest”, usuwanie znaczników.
4. Merytoryka Allegro: czy SKILL.md i wpis.md nie podają jako zasady Allegro czegoś, czego references nie potwierdza (references sekcja 8 wymienia rzeczy niepotwierdzone); czy rady nie są przestarzałe (warianty, wyszukiwanie w opisach); czy nie ma obietnic pozycji w wynikach.
5. Skrypt tytul_allegro.py: poprawność liczenia (& = 5), fałszywe alarmy i przepuszczone błędy na realistycznych tytułach (marki z wielkimi literami jak „LEGO”, rozmiary, modele z cyframi, słowo „do”, nazwy z „Smart” w nazwie produktu, polskie znaki), czy komunikaty nie podają naszych reguł jako reguł Allegro.
6. Polski rynek i język: zero obcej waluty, polskie jednostki, rejestr, brak kalk, zero długich myślników (pauzy, półpauzy) w treści i szablonach.

Na koniec: lista znalezisk z wagą (BLOKER / WAŻNE / KOSMETYKA), każde z plik:linia i proponowaną zmianą, i ostatnia linia dokładnie w formie:
BLOKERY DO WYDANIA: TAK
albo
BLOKERY DO WYDANIA: NIE
