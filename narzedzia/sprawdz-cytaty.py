"""Sprawdza, czy każdy przepis cytowany w plikach skilla sprawy-prawne-w-firmie
istnieje we wbudowanym tekście aktu (references/akty/<SKRÓT>.md).

Rozpoznaje zapisy „KC art. 484 § 2”, „ZATORY art. 10 ust. 1”, „KP art. 94³”,
„KSH art. 299” (skrót aktu z akty-lista.json przed „art.”).
Użycie: python narzedzia/sprawdz-cytaty.py [plik_albo_katalog ...]
Domyślnie: SKILL.md i references/*.md oraz references/moduly/*.md skilla.
Kod 1, gdy któryś przepis albo paragraf nie istnieje.
"""
import json, re, sys
from pathlib import Path

KORZEN = Path(__file__).resolve().parent.parent
SKILL = KORZEN / "skille" / "sprawy-prawne-w-firmie"
AKTY = SKILL / "references" / "akty"
SKROTY = [a["skrot"] for a in json.loads((KORZEN / "narzedzia" / "akty-lista.json").read_text(encoding="utf-8"))]
IDX = "⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ"
CYT = re.compile(r"\b(" + "|".join(sorted(SKROTY, key=len, reverse=True)) + r")\s+art\.\s*(\d+[" + IDX + r"]*[a-z]?)(?:\s*§\s*(\d+[" + IDX + r"]*))?(?:\s*ust\.\s*(\d+[a-z]?))?")
# Skrót wielkimi literami przed „art.”, którego nie ma w akty-lista.json: literówka albo akt niewbudowany.
OBCY = re.compile(r"\b([A-ZĄĆĘŁŃÓŚŹŻ]{2,12})\s+art\.\s*\d")
POZA = {"WERYFIKACJI", "UZUPEŁNIJ", "RODO", "DSA", "TSUE", "UE", "AI", "GPSR", "VAT", "PIT", "CIT", "KIO", "UZP", "SN", "NSA", "WSA", "TK"}  # akty i organy spoza wbudowanych, pisane świadomie
# shortcut: nie sprawdza punktów, liter ani wersji [ ] / < > na konkretny dzień; przy sporze o brzmienie decyduje odczyt pliku aktu

_cache = {}


def artykuly(skrot):
    if skrot not in _cache:
        t = (AKTY / f"{skrot}.md").read_text(encoding="utf-8")
        bloki, klucz, buf = {}, None, []
        for linia in t.splitlines():
            m = re.match(r"^[\[<]?Art\.\s+(\d+[" + IDX + r"]*[a-z]?)\.", linia)
            if m:
                if klucz:
                    bloki[klucz] = bloki.get(klucz, "") + "\n".join(buf)
                klucz, buf = m.group(1), [linia]
            elif klucz:
                buf.append(linia)
        if klucz:
            bloki[klucz] = bloki.get(klucz, "") + "\n".join(buf)
        _cache[skrot] = bloki
    return _cache[skrot]


def sprawdz(plik):
    bledy, n = [], 0
    for nr, linia in enumerate(plik.read_text(encoding="utf-8").splitlines(), 1):
        for m in OBCY.finditer(linia):
            if m.group(1) not in SKROTY and m.group(1) not in POZA:
                bledy.append(f"{plik.name}:{nr}: nieznany skrót aktu „{m.group(1)}” przed art. (użyj skrótu z akty/SPIS.md albo pełnej nazwy)")
        for m in CYT.finditer(linia):
            n += 1
            skrot, art, par, ust = m.groups()
            blok = artykuly(skrot).get(art)
            if blok is None:
                bledy.append(f"{plik.name}:{nr}: {skrot} art. {art} nie istnieje w {skrot}.md")
            elif par and not re.search(r"(^|[\s\[<])§\s*" + re.escape(par) + r"\.", blok):
                bledy.append(f"{plik.name}:{nr}: {skrot} art. {art} § {par}: brak paragrafu w {skrot}.md")
            elif ust and re.search(r"§\s*1\.", blok):
                bledy.append(f"{plik.name}:{nr}: {skrot} art. {art} ma paragrafy (§), nie ustępy")
            elif ust and not re.search(r"(^|[\s\[<.])" + re.escape(ust) + r"\.\s", blok):
                bledy.append(f"{plik.name}:{nr}: {skrot} art. {art} ust. {ust}: brak ustępu w {skrot}.md")
            elif re.match(r"^[\[<]?Art\.\s+\S+\s*\(uchylony\)", blok):
                bledy.append(f"{plik.name}:{nr}: {skrot} art. {art} jest uchylony")
            # Dalsze numery w liście albo zakresie („art. 118, 120”, „§ 2-4”, „ust. 4 i 5”): ta sama jednostka co ostatnia.
            ogon = re.match(r"((?:\s*(?:,|-|\bi\b|\boraz\b)\s*\d+[" + IDX + r"]*[a-z]?\b(?!\s*(?:r\.|zł|dni|lat|%)))+)", linia[m.end():])
            if ogon and blok is not None:
                for nr2 in re.findall(r"\d+[" + IDX + r"]*[a-z]?", ogon.group(1)):
                    n += 1
                    if ust:
                        ok = re.search(r"(^|[\s\[<.])" + re.escape(nr2) + r"\.\s", blok)
                    elif par:
                        ok = re.search(r"(^|[\s\[<])§\s*" + re.escape(nr2) + r"\.", blok)
                    else:
                        ok = artykuly(skrot).get(nr2)
                    if not ok:
                        jedn = "ust." if ust else ("§" if par else "art.")
                        bledy.append(f"{plik.name}:{nr}: {skrot} {jedn} {nr2} (z listy przy art. {art}) nie istnieje w {skrot}.md")
    return n, bledy


def main():
    cele = [Path(a) for a in sys.argv[1:]] or [SKILL / "SKILL.md", *sorted((SKILL / "references").glob("*.md")), *sorted((SKILL / "references" / "moduly").glob("*.md"))]
    pliki = []
    for c in cele:
        pliki += sorted(c.rglob("*.md")) if c.is_dir() else [c]
    razem, wszystkie = 0, []
    for p in pliki:
        n, b = sprawdz(p)
        razem += n
        wszystkie += b
    print("\n".join(wszystkie) if wszystkie else "")
    print(f"cytowań: {razem}, błędnych: {len(wszystkie)}, plików: {len(pliki)}")
    sys.exit(1 if wszystkie else 0)


if __name__ == "__main__":
    main()
