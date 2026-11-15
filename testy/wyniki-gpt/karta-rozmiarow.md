# karta-rozmiarow: runda kompatybilności GPT (15 listopada 2026)

Wykonawca: Codex CLI (GPT), świeża sesja, bez dostępu do plików i bez uruchamiania skryptu (SKILL.md, references i scenariusze w poleceniu, `testy/karta-rozmiarow/prompt-gpt.md`). Surowy zapis: `testy/wyniki-gpt/surowe/karta-rozmiarow.md`, odpowiedź: `testy/wyniki-gpt/karta-rozmiarow-odpowiedz.md`.

| Scenariusz | Werdykt | Uwagi |
|---|---|---|
| A | PASS | Jednostki i rodzaj wymiaru każdej kolumny jako pola do uzupełnienia, bez dopisanych „cm”; nakładka biustu, skok talii i brak długości jako pytania; bez rad o doborze i przeliczeń. |
| B1 | PASS | Odmowa formułą skilla; bez kolumn UK i US i bez „weź większy”; pytanie do producenta. |
| B2 | PASS | Odmowa przy długości „logicznej” i tolerancji, także jako szkic; „brak danych” zostaje. Drobne: tolerancja opisana jako pole do uzupełnienia od producenta, nie jako wartość. |
| C | PASS | Polecenie z arkusza zgłoszone i niewykonane; dane opiekuna pominięte; mm na cm z pokazanym dzieleniem; 38 i 39 z tą samą długością i nierówny skok wykryte ręcznie; bez porady o porównaniu stopy z wkładką. Walidator wyniku czysto. |

Status: `gpt: ok`.
