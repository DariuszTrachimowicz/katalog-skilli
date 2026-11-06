"""Tnie plik researchu (testy/sprawy-prawne-w-firmie/research-*.md) na moduły
skilla sprawy-prawne-w-firmie (references/moduly/<plik>.md).

Użycie: python narzedzia/research-do-modulow.py <research.md> A=plik-a B=plik-b ...
Sekcje modułu w researchu: „## MODUŁ A. Tytuł” i podsekcje „### A.1. …”.
Rejestr źródeł i akty brakujące z końca researchu trafiają do każdego modułu
(wspólna sekcja „Źródła”), bo moduł czyta się osobno.
"""
import re, sys
from pathlib import Path

KORZEN = Path(__file__).resolve().parent.parent
CEL = KORZEN / "skille" / "sprawy-prawne-w-firmie" / "references" / "moduly"


def main():
    src = Path(sys.argv[1]).read_text(encoding="utf-8").replace("\r\n", "\n")
    if re.search(r"(?m)^# MODUŁ", src):  # moduł jako nagłówek 1. stopnia: obniż wszystkie poziomy o jeden
        src = re.sub(r"(?m)^(#{1,3}) ", lambda m: "#" + m.group(1) + " ", src)
    mapa = dict(a.split("=", 1) for a in sys.argv[2:])
    czesci = re.split(r"(?m)^## ", src)
    moduly, wspolne = {}, []
    for c in czesci[1:]:
        m = re.match(r"MODUŁ ([A-Z])\.?\s*(.*)", c)
        if m:
            moduly[m.group(1)] = (m.group(2).splitlines()[0].strip(), c.split("\n", 1)[1])
        else:
            wspolne.append("## " + c.rstrip())
    data = re.search(r"(\d{1,2} (?:listopada|października) 2026|2026-1[01]-\d\d)", src)
    CEL.mkdir(parents=True, exist_ok=True)
    for lit, plik in mapa.items():
        tytul, tresc = moduly[lit]
        tresc = re.sub(rf"(?m)^### {lit}\.?(\d+)\.\s*", r"## \1. ", tresc)
        tresc = re.sub(r"(?m)^#### ", "### ", tresc)
        nag = (f"# Moduł: {tytul}\n\n"
               "Wczytaj, gdy `mapa-spraw.md` wskazuje ten moduł. Reguły po skutku z podstawą w formie „KP art. 30 § 4”: "
               "każdą podstawę przed podaniem użytkownikowi sprawdź w `references/akty/<SKRÓT>.md` i podaj datę brzmienia z nagłówka aktu. "
               "Orzeczenia ze statusem „nieotwarte” podajesz tylko jako „do potwierdzenia”. "
               f"Stan researchu: {data.group(1) if data else '6 listopada 2026'}; źródła: domeny gov.pl i sn.pl.\n\n")
        stopka = "\n\n## Źródła i akty spoza wbudowanych\n\n" + "\n\n".join(s.replace("\n## ", "\n### ").replace("## ", "### ", 1) for s in wspolne)
        (CEL / f"{plik}.md").write_text(nag + tresc.strip() + stopka + "\n", encoding="utf-8")
        print(f"{plik}.md: {len((nag + tresc).splitlines())} linii")


if __name__ == "__main__":
    main()
