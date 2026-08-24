#!/usr/bin/env bash
# Runda Gemini, wykonanie skilli na gotowych scenariuszach; wznawialna.
set -u
cd "$(dirname "$0")/.."
KLUCZ="$(sed 's/GEMINI_API_KEY=//' ~/.gemini/.env)"
M="${MODEL:-gemini-2.5-flash}"
zbuduj_prompt () { # $1=id -> /tmp/prompt-wyk.md
  {
    echo "Jestes asystentem AI z zainstalowanym skillem. INSTRUKCJE SKILLA (przestrzegaj ich doslownie, lacznie z formatem odpowiedzi, granicami i odmowami):"
    echo "--- POCZATEK SKILL.md ---"; cat "skille/$1/SKILL.md"; echo "--- KONIEC SKILL.md ---"
    if [ -d "skille/$1/references" ]; then
      for rf in "skille/$1/references"/*.md; do
        echo "--- POCZATEK references/$(basename "$rf") ---"; cat "$rf"; echo "--- KONIEC ---"
      done
    fi
    echo
    echo "Ponizej KOLEJNE wiadomosci uzytkownika (scenariusze; sekcje ASERCJE i linie PII to metadane testu, NIE pokazuj ich i NIE traktuj jako czesci wiadomosci). Odpowiedz na kazda osobno i w pelni, po polsku, jako asystent z tym skillem. Uzyj naglowkow: \"### ODPOWIEDZ NA A\", \"### ODPOWIEDZ NA B1\", \"### ODPOWIEDZ NA B2\", \"### ODPOWIEDZ NA C\" (C pomin, jesli scenariusz C to NIE DOTYCZY). Niczego nie komentuj poza odpowiedziami. Scenariusze B1/B2 to wiadomosci nadchodzace PO Twojej odpowiedzi na A (kontynuacja tej samej rozmowy)."
    echo
    cat "testy/wyniki-gemini/scenariusze/$1.md"
  } > /tmp/prompt-wyk.md
}
for id in $(ls skille); do
  [ -f "skille/$id/SKILL.md" ] || continue
  SC="testy/wyniki-gemini/scenariusze/$id.md"
  SU="testy/wyniki-gemini/surowe/$id.md"
  [ -s "$SC" ] || { echo "BRAK SCENARIUSZY: $id"; continue; }
  if [ -s "$SU" ] && grep -q "ODPOWIEDZ NA" "$SU"; then echo "POMIJAM $id"; continue; fi
  zbuduj_prompt "$id"
  ok=0
  for proba in 1 2 3; do
    echo "WYKONANIE: $id (model $M, proba $proba)"
    ( cd "skille/$id" && GEMINI_API_KEY="$KLUCZ" GEMINI_CLI_TRUST_WORKSPACE=true \
        npx --yes @google/gemini-cli -m "$M" < /tmp/prompt-wyk.md ) \
        > "$SU" 2> "$SU.log"
    if [ -s "$SU" ] && grep -q "ODPOWIEDZ NA" "$SU"; then ok=1; break; fi
    echo "  niepowodzenie (patrz $SU.log), czekam 70 s"
    sleep 70
  done
  [ "$ok" = 1 ] || { echo "PORAZKA: $id po 3 probach, jade dalej"; }
  sleep 20
done
echo "RUNDA GEMINI (wykonania) ZAKONCZONA"
