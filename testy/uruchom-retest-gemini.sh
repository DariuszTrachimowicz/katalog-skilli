#!/usr/bin/env bash
# Retest flash po utwardzeniu tresci (runda zielonych lampek, 22.08.2026).
# gemini-cli uwierzytelnione loginem Google (OAuth), BEZ klucza API. Wznawialny.
set -u
cd "$(dirname "$0")/.."
M="${MODEL:-gemini-2.5-flash}"
DARMOWE="co-mowi-arkusz kalendarz-obowiazkow newsletter-do-klientow oferta-handlowa ogloszenie-o-prace opis-stanowiska opisy-produktow post-na-linkedin przed-podpisem-nda raport-miesieczny rodo-w-malej-firmie windykacja-miekka wycena-uslugi"
PLATNE="oferta-behawioralna operaty-szacunkowe"
mkdir -p testy/wyniki-gemini/retest

zbuduj_prompt () { # $1=id $2=katalog_skilla $3=dopisek_srodowiska
  {
    echo "Jestes asystentem AI z zainstalowanym skillem. INSTRUKCJE SKILLA (przestrzegaj ich doslownie, lacznie z formatem odpowiedzi, granicami i odmowami):"
    echo "--- POCZATEK SKILL.md ---"; cat "$2/SKILL.md"; echo "--- KONIEC SKILL.md ---"
    if [ -d "$2/references" ]; then
      for rf in "$2/references"/*.md; do
        echo "--- POCZATEK references/$(basename "$rf") ---"; cat "$rf"; echo "--- KONIEC ---"
      done
    fi
    echo
    echo "Ponizej KOLEJNE wiadomosci uzytkownika (scenariusze). Odpowiedz na kazda osobno i w pelni, po polsku, jako asystent z tym skillem. Uzyj naglowkow: \"### ODPOWIEDZ NA A\", \"### ODPOWIEDZ NA B1\", \"### ODPOWIEDZ NA B2\", \"### ODPOWIEDZ NA C\" (C pomin, jesli scenariusz C to NIE DOTYCZY). Niczego nie komentuj poza odpowiedziami. Scenariusze B1/B2 to wiadomosci nadchodzace PO Twojej odpowiedzi na A (kontynuacja tej samej rozmowy).$3"
    echo
    cat "testy/wyniki-gemini/scenariusze/$1.md"
  } > /tmp/prompt-retest.md
}

uruchom () { # $1=id $2=katalog_skilla $3=dopisek
  SU="testy/wyniki-gemini/retest/$1.md"
  if [ -s "$SU" ] && grep -q "ODPOWIEDZ NA" "$SU"; then echo "POMIJAM $1"; return; fi
  zbuduj_prompt "$1" "$2" "$3"
  for proba in 1 2 3; do
    echo "RETEST: $1 (model $M, proba $proba)"
    ( cd "$2" && GEMINI_CLI_TRUST_WORKSPACE=true \
        npx --yes @google/gemini-cli -m "$M" < /tmp/prompt-retest.md ) \
        > "$SU" 2> "$SU.log"
    if [ -s "$SU" ] && grep -q "ODPOWIEDZ NA" "$SU"; then return; fi
    echo "  niepowodzenie (patrz $SU.log), czekam 70 s"; sleep 70
  done
  echo "PORAZKA: $1 po 3 probach, jade dalej"
}

for id in $DARMOWE; do uruchom "$id" "skille/$id" ""; sleep 15; done
for id in $PLATNE; do uruchom "$id" "../skille-platne/$id" " Srodowisko tej sesji nie pozwala uruchamiac skryptow ani narzedzi; tam, gdzie skill kaze uzyc skryptu, opisz dokladnie, ktore polecenie by uruchomil i czego wymaga, zamiast wykonywac je."; sleep 15; done
echo "RETEST GEMINI ZAKONCZONY"
