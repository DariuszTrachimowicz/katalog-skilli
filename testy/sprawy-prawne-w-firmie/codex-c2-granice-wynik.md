**BLOKER** · [references/moduly/spory-z-kontrahentem.md:151](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/references/moduly/spory-z-kontrahentem.md:151>): pozew w e-Sądzie, wniosek o klauzulę i zawiadomienie o przestępstwie trafiają do działań „bez prawnika”, a przegląd dotyczy „pozostałych pism”; przypisz tym dokumentom obowiązkowy poziom B zgodnie z `pisma.md:19`.

**WAŻNE** · [narzedzia/katalog-do-firmy.mjs:40](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/narzedzia/katalog-do-firmy.mjs:40>): generator kopiuje wyłącznie Markdown, pomijając wymagane przez procedurę AML `scripts/ocena_ryzyka.py` i `assets/przyklady/ocena-klienta.json`; dołącz zależności i popraw ścieżki, aby samodzielna paczka mogła wykonać ocenę.

**WAŻNE** · [narzedzia/sprawdz-cytaty.py:59](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/narzedzia/sprawdz-cytaty.py:59>): nowa kontrola ustępów uznaje numer paragrafu za ustęp, więc przepuszcza nieistniejące `KC art. 61 ust. 1`; rozpoznawaj strukturę jednostek i dodaj test odrzucający ten przykład.

**WAŻNE** · [narzedzia/akty.py:220](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/narzedzia/akty.py:220>): pobrany akt nadpisuje poprzedni plik przed kontrolą liczby artykułów w linii 276, więc nieudana konwersja pozostawia uszkodzoną bazę; sprawdzaj wynik przed zapisem i podmieniaj plik atomowo.

**WAŻNE** · [narzedzia/katalog-do-firmy.mjs:6](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/narzedzia/katalog-do-firmy.mjs:6>) i [Dockerfile:9](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/Dockerfile:9>): deklarowana kontrola kopii „przy każdym buildzie” nie działa automatycznie, ponieważ budowanie uruchamia wyłącznie generator strony; podłącz test kopii i cytowań jako bramkę przed publikacją.

**WAŻNE** · [references/pisma.md:30](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/references/pisma.md:30>) i [references/moduly/spory-z-kontrahentem.md:28](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/references/moduly/spory-z-kontrahentem.md:28>): reguła dla wiadomości elektronicznej pomija możliwość zapoznania się z treścią przez adresata, co grozi utożsamieniem wysłania ze skutecznym złożeniem oświadczenia; dopisz ten warunek z KC art. 61 § 2 ([UZP](https://www.gov.pl/attachment/6e823c95-88a2-4703-a35f-7d6d44670642)).

**WAŻNE** · [SKILL.md:74](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/SKILL.md:74>) i [references/pisma.md:28](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/references/pisma.md:28>): bezwzględny wymóg znalezienia każdego przepisu w pliku aktu przeczy dopuszczeniu sprawdzonych przepisów niewbudowanych w `SKILL.md:50`; ujednolić regułę źródeł, uwzględniając opracowania modułów i nowsze źródła urzędowe.

**WAŻNE** · [references/moduly/wspolpraca-b2b.md:27](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/references/moduly/wspolpraca-b2b.md:27>): PIP nadal oznaczono jako akt „poza plikami”, podobnie potraktowano MINWYN, PPK i SUS w modułach zatrudnienia; usuń nieaktualne oznaczenia i kieruj weryfikację do istniejących aktów.

**KOSMETYKA** · [wpis.md:14](<C:/Users/CP24/AiXperts - projekty/katalog-skilli/skille/sprawy-prawne-w-firmie/wpis.md:14>): `claude: brak` i `gpt: brak` oznaczają według README niedostępność funkcji, a nie brak testów; zastosuj `format` do czasu potwierdzenia działania.

Recenzja statyczna; uruchomienie testów zablokował `EPERM`, zachowania modelu nie sprawdzono.

**BLOKERY DO WYDANIA: TAK**