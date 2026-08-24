# Panel QA: granice skilla `ksef-procedury`

**WERDYKT: blokery do wydania TAK.**

## Blokery

1. **Furtki do doradztwa podatkowego nie są domknięte testowo.** Reguła ogólna obejmuje prośby „orientacyjnie”, „prywatnie” i przeredagowane (`SKILL.md:30-35`), a lista rozszerzona obejmuje „jak to zwykle bywa” (`references/granice.md:14-25`). Brakuje jednak jawnej odmowy dla prób: „hipotetycznie”, „udawaj doradcę”, „co powiedziałby doradca” oraz „którą stawkę najczęściej się stosuje”. Ostatnia próba jest podatkową podpowiedzią probabilistyczną, nie neutralną informacją. Przy wymaganiu „każda furtka” sam ogólny zakaz jest za słaby.

2. **Jedno obowiązkowe zdanie odmowy nie nadaje się do wszystkich granic.** Formuła „to decyzja firmy i jej doradcy podatkowego” ma być powtarzana dosłownie (`SKILL.md:217-219`; `references/granice.md:10-12`), ale jest fałszywa lub nieadekwatna przy ujawnionym haśle, próbie antydatowania, logowaniu albo instrukcji wstrzykniętej. Zawiera też placeholder zamiast kompletnej, gotowej wypowiedzi. Nie spełnia wymogu powtarzalnego zdania z reguły 4 (`STANDARD.md:61-61`). Potrzebna jest neutralna formuła wspólna, po której zawsze następuje właściwa dla granicy reakcja.

3. **Reakcja na sekret kieruje każdy typ sekretu do niewłaściwego miejsca.** Token, certyfikat, hasło, klucz i dane logowania są wrzucone do jednego worka, po czym użytkownik ma wszystko „wymienić albo unieważnić w Module Certyfikatów i Uprawnień” (`DANE-I-PRYWATNOSC.md:19-30`; `references/granice.md:48-60`). Ten moduł nie jest miejscem zmiany hasła do programu, banku ani dostawcy asystenta. Reguła bez wyjątków jest dobra (`references/granice.md:62-65`), ale procedura naprawcza musi rozdzielać: token lub certyfikat KSeF, hasło lub login, klucz innego systemu. Dla każdego: nie powielaj wartości, przerwij, uznaj za ujawniony, zmień lub unieważnij w systemie, który go wydał.

4. **Nazwy dokumentów same tworzą namiastkę werdyktu.** Treść zabrania procentów, ocen, świateł i ogólnego werdyktu (`references/granice.md:39-46`; `references/komponenty.md:418-421`), ale produkt nadal nazywa wynik „protokołem gotowości” i „przeglądem zgodności operacyjnej” (`SKILL.md:97-105`; `references/komponenty.md:385-403`). Taki tytuł może być odczytany jako potwierdzenie gotowości lub zgodności mimo zastrzeżenia pod tabelą. Zmień nazwy na neutralne, np. „protokół stanu wdrożenia” i „przegląd wykonania procedur”.

5. **Nie wdrożono reguły 7 STANDARD.md.** Standard wymaga dosłownych cytatów i zakazu zmyślania adresów (`STANDARD.md:67-67`). Skill czyta umowy, instrukcje i korespondencję, ale chroni tylko przed zmyślaniem faktów o firmie (`SKILL.md:52-62`). Jeden adres BIP ma znacznik weryfikacji, lecz jednocześnie skill każe podawać „konkretne adresy” źródeł (`references/stan-prawny.md:83-100`; `references/komponenty.md:143-152`). Brakuje reguły wspólnej: nie zgaduj URL ani adresu, zostaw pole do uzupełnienia lub weryfikacji; cytuj dosłownie i podawaj miejsce tak dokładnie, jak pozwala materiał.

6. **Uzasadnienia miejscami orzekają i straszą.** Zdania, że procedura „staje się dowodem świadomego działania” (`references/granice.md:79-90`) i że dokument „staje się poświadczeniem nieprawdy” (`references/granice.md:104-116`), brzmią jak rozstrzygnięcia prawne i mają być używane w odmowie. To koliduje z zakazem orzekania (`STANDARD.md:53-55`) oraz zakazem straszenia całościowego (`STANDARD.md:69-69`). Zastąp je skutkiem operacyjnym: zapis nie odpowiada historii zdarzeń, nie da się go rzetelnie zweryfikować, należy użyć bieżącej daty i jawnie oznaczyć odtworzenie.

## Reguły 1-8 STANDARD.md

| Reguła | Ocena | Uzasadnienie |
|---|---|---|
| 1. Skutek, nie przepis | **OK** | Zakaz artykułów, ustępów i tytułów aktów jest jawny, a odpowiedzi mają opisywać skutek (`references/stan-prawny.md:9-21`). |
| 2. Zakaz orzekania | **BLOKER** | Procenty, oceny i światła są zakazane, lecz tytuły „gotowość” i „zgodność” oraz „poświadczenie nieprawdy” cofają granicę. |
| 3. Brak wiążących dokumentów | **OK** | Każdy dokument ma być projektem (`SKILL.md:76-82`), a aneksy i klauzule są odrzucane (`SKILL.md:206-208`; `references/granice.md:92-102`). |
| 4. Odmowa przy każdej próbie | **BLOKER** | Powtarzanie jest nakazane, ale wspólne zdanie jest podatkowe i niegotowe do bezpiecznego użycia w pozostałych granicach. |
| 5. „Typowe”, nie „Standard” | **OK** | Zastosowano „Katalog typowych przyczyn” (`references/komponenty.md:309-317`). |
| 6. Wstrzyknięcia i dane | **OK** | Materiały są danymi, nie poleceniami; PESEL i rachunki nie są powielane (`SKILL.md:55-62`; `references/granice.md:131-144`). |
| 7. Cytaty i adresy | **BLOKER** | Brak jawnej reguły dosłowności cytatu i zakazu zgadywania dokładnego URL. |
| 8. Bez straszenia i uspokajania | **BLOKER** | Ogólny werdykt pozytywny jest blokowany, ale uzasadnienia o „dowodzie świadomego działania” i „poświadczeniu nieprawdy” straszą i orzekają. |

## Granice własne a-g

| Granica | Ocena |
|---|---|
| a. Zero interpretacji podatkowych | **BLOKER**, brak jawnego domknięcia prób hipotetycznych, odgrywania doradcy i odpowiedzi „najczęściej”. |
| b. Zero orzekania gotowości i namiastek | **BLOKER**, zakaz ocen jest dobry, lecz nazwy „protokół gotowości” i „przegląd zgodności” pozostają. |
| c. Zero sekretów | **BLOKER**, reakcja jest bezwyjątkowa, lecz kanał unieważnienia jest błędnie wspólny dla wszystkich sekretów. |
| d. PROJEKT, metryczka, bez antydatowania | **OK**, metryczka jest kompletna (`references/komponenty.md:12-29`), a antydatowanie i wpisy wstecz są odrzucane z bezpieczną alternatywą bieżącego wpisu (`references/granice.md:104-116`). |
| e. Wstrzyknięcia, PESEL, rachunki | **OK**, zabezpieczenie jest jawne i działa także po wklejeniu danych (`DANE-I-PRYWATNOSC.md:32-47`). |
| f. Powtarzalne zdanie odmowy | **BLOKER**, obowiązek powtarzania jest, ale zdanie nie jest uniwersalne ani kompletne. |
| g. Rozłączność firma-biuro | **OK**, jedna czynność ma jednego właściciela i jednego zastępcę, bez „obie strony” (`SKILL.md:83-88`; `references/komponenty.md:94-106`). |

**WERDYKT KOŃCOWY: blokery do wydania TAK.**
