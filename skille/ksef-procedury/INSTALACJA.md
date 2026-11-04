# Pierwsze uruchomienie

Skill jest zestawem plików tekstowych, który wgrywa się do asystenta AI.
**Zaprojektowano go i przetestowano na Claude; działanie w innych asystentach
nie zostało przez nas zweryfikowane**, więc nie obiecujemy go i nie opisujemy
instalacji poza Claude.

Poza samym wgraniem paczki skill nie wymaga instalowania żadnej dodatkowej
aplikacji ani wtyczki. Nie łączy się z Krajowym Systemem e-Faktur, nie
potrzebuje dostępu do Twojego programu do fakturowania i nie prosi o żadne dane
logowania.

## 1. Wgranie skilla

Rozpakuj paczkę i wgraj cały katalog `ksef-procedury` do katalogu skilli
swojego asystenta (w Claude Code jest to zwykle `~/.claude/skills/`).
Struktura po rozpakowaniu:

```
ksef-procedury/
  SKILL.md
  INSTALACJA.md
  DANE-I-PRYWATNOSC.md
  references/
    stan-prawny.md
    komponenty.md
    granice.md
  assets/przyklady/
    macierz-odpowiedzialnosci.md
```

Nie zmieniaj nazw plików ani katalogów; asystent sięga po nie po ścieżkach.

## 2. Sprawdzenie, czy działa

Napisz do asystenta jedno z tych zdań:

- „Chcemy spisać, kto u nas odpowiada za co w KSeF, firma i biuro rachunkowe.”
- „Co robimy, kiedy KSeF nie działa? Potrzebujemy procedury.”
- „Kto ma jakie uprawnienia w KSeF, chcę to uporządkować.”

Skill powinien zacząć od pytań o Twoją firmę (kto wystawia faktury, w czym, co
robi biuro, kto pilnuje odrzuceń), a nie od wykładu o systemie. Jeśli
odpowiedział ogólnikami bez pytań, powiedz wprost: „użyj skilla ksef-procedury”.

## 3. Zanim zaczniesz pracę

Przygotuj sobie odpowiedzi na cztery pytania, resztę skill wyciągnie w rozmowie:

1. Kto wystawia faktury i w jakim programie?
2. Co dokładnie robi biuro rachunkowe i co o tym mówi umowa?
3. Kto sprawdza, czy faktura została przyjęta, i kto reaguje na odrzucenie?
4. Firma dopiero wdraża KSeF czy już w nim działa?

Nie potrzebujesz do tego żadnych plików ani zrzutów ekranu z systemu.

## 4. Czego skill nie zrobi

Nie zaloguje się do systemu, nie nada uprawnień, nie sprawdzi, czy Twoja
faktura przeszła, i nie skonfiguruje programu do fakturowania. Nie odpowie też
na pytania podatkowe (stawki, odliczenia, kwalifikacja transakcji), bo to praca
księgowej albo doradcy podatkowego. Nie wklejaj mu tokenów, certyfikatów ani
haseł: skill ich nie potrzebuje i odmówi pracy na nich. Szczegóły:
`DANE-I-PRYWATNOSC.md`.

## 5. Aktualizacje

Terminy, tryby awaryjne i wymogi techniczne KSeF zmieniały się już wielokrotnie.
Skill nosi w sobie datę stanu prawnego (plik `references/stan-prawny.md`)
i sam ostrzeże Cię, gdy zrobi się stara. Ten sam plik zawiera rejestr źródeł:
konkretne adresy stron Ministerstwa Finansów wraz z datą sprawdzenia, po tematach.
Kolejne wydania pobieraj z katalogu skille.aixperts.pl; niezależnie od tego
weryfikuj terminy pod adresami z rejestru źródeł przed wdrożeniem dokumentu.
