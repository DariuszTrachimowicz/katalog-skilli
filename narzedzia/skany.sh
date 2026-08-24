#!/usr/bin/env bash
# Wspolne skany skilla (jedno zrodlo zamiast kopii polecen w trzech miejscach
# kreatora): glify bajtowo (Git Bash `grep -P '\x{2014}'` daje FALSZYWE 0,
# stad byte-match), encje &mdash;/&ndash;, przeciek obcej waluty. Skan obejmuje
# WSZYSTKIE typy plikow (takze .html, .json, evals/*), nie tylko *.md.
# Uzycie:  bash narzedzia/skany.sh <katalog-albo-plik> [...]
#   Plik (np. zbudowana paczka .skill, zip typu store) skanowany bajtowo
#   wprost; katalog rekurencyjnie. Z wnetrza skille-platne wolaj:
#   bash ../katalog-skilli/narzedzia/skany.sh dist/<id>.skill
# Kod 1 = glify albo encje (blokujace; kazde trafienie encji ocen recznie:
# dokumentacja tez renderuje dlugi myslnik, wiec zwykle i tak do poprawy).
set -u
kod=0
PAUZA="$(printf '\xe2\x80\x94')"
POLPAUZA="$(printf '\xe2\x80\x93')"
WALUTA_RE="(\\\$|€|£)[ ]?[0-9]|[0-9][ ]?(\\\$|€|£)|\b(USD|EUR|GBP|CHF)[A-Za-z]{0,3}\b"
for cel in "$@"; do
  if [ -f "$cel" ]; then
    echo "== Skany (plik): $cel =="
    if LC_ALL=C grep -q "$PAUZA\|$POLPAUZA" "$cel" 2>/dev/null; then
      echo "GLIFY (pauza/polpauza) w bajtach pliku"; kod=1
    else echo "glify: czysto"; fi
    if LC_ALL=C grep -q '&mdash;\|&ndash;' "$cel" 2>/dev/null; then
      echo "ENCJE w bajtach pliku"; kod=1
    else echo "encje: czysto"; fi
    continue
  fi
  if [ ! -d "$cel" ]; then echo "BRAK SCIEZKI: $cel"; kod=1; continue; fi
  echo "== Skany: $cel =="
  g=$(LC_ALL=C grep -rl --exclude-dir=.git "$PAUZA\|$POLPAUZA" "$cel" 2>/dev/null || true)
  if [ -n "$g" ]; then echo "GLIFY (pauza/polpauza) w plikach:"; echo "$g"; kod=1; else echo "glify: czysto"; fi
  # Bez filtra wyjatkow: linia DOKUMENTUJACA encje tez ja renderuje, wiec
  # kazde trafienie ma trafic do oceny (filtr tresci maskowal realne encje
  # w liniach ze slowem "grep", zlapane w tescie regresji).
  e=$(LC_ALL=C grep -rn --exclude-dir=.git '&mdash;\|&ndash;' "$cel" 2>/dev/null || true)
  if [ -n "$e" ]; then echo "ENCJE renderujace dlugi myslnik (ocen kazda):"; echo "$e"; kod=1; else echo "encje: czysto"; fi
  w=$(LC_ALL=C grep -rInoE --exclude-dir=.git "$WALUTA_RE" "$cel" 2>/dev/null || true)
  if [ -n "$w" ]; then
    n=$(echo "$w" | wc -l)
    echo "WALUTA (nie blokuje; ocen recznie: cena obca = przeciek do naprawy,"
    echo "  nazwa funkcji / zmienna basha \$1 / '40 euro' z prawa PL = OK):"
    echo "$w" | head -12
    if [ "$n" -gt 12 ]; then echo "  ... pokazano 12 z $n trafien, reszta: uruchom grep sam"; fi
  else echo "waluta: czysto"; fi
done
if [ $kod -ne 0 ]; then echo; echo "SKANY: sa zlamania blokujace."; else echo; echo "SKANY: bez zlaman blokujacych."; fi
exit $kod
