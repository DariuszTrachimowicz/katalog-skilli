"""Pobiera teksty aktów z API ELI Sejmu (tekst ujednolicony Kancelarii Sejmu albo tekst
ogłoszony) i zapisuje je jako Markdown do skilla sprawy-prawne-w-firmie.

Użycie (z katalogu katalog-skilli):
  python narzedzia/akty.py            # wszystkie akty z narzedzia/akty-lista.json
  python narzedzia/akty.py KP KC      # wybrane skróty
  python narzedzia/akty.py --sprawdz  # tylko porównanie z akty-stan.json (bez pobierania)

Wymaga: pymupdf. Źródło: api.sejm.gov.pl (ISAP, domena gov.pl).
"""
import json, re, sys, hashlib, datetime, urllib.request
from collections import Counter
from pathlib import Path

KORZEN = Path(__file__).resolve().parent.parent
LISTA = KORZEN / "narzedzia" / "akty-lista.json"
STAN = KORZEN / "narzedzia" / "akty-stan.json"
CEL = KORZEN / "skille" / "sprawy-prawne-w-firmie" / "references" / "akty"
API = "https://api.sejm.gov.pl/eli/acts/"

SUP = dict(zip("0123456789abcdefghijklmnoprstuvwxyz",
               "⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ"))
NAGLOWEK = re.compile(r"^(©\s*Kancelaria Sejmu|s\.\s*\d+/\d+|\d{4}-\d{2}-\d{2}|Dziennik Ustaw|[–-]\s*\d+\s*[–-]|Poz\.\s*\d+)$")
NOWY_AKAPIT = re.compile(r"^(> Notka|\| |[\[<]?Art\.\s|[\[<]?§\s|[\[<]?\d+[a-z]?[⁰¹²³⁴⁵⁶⁷⁸⁹]*\)\s|[a-z]{1,2}[⁰¹²³⁴⁵⁶⁷⁸⁹]*\)\s|[–-]\s|DZIAŁ|Dział\s|ROZDZIAŁ|Rozdział\s|Oddział\s|TYTUŁ|Tytuł\s|KSIĘGA|Księga\s)")
NAGLOWEK_MD = re.compile(r"^(DZIAŁ|Dział\s|ROZDZIAŁ|Rozdział\s|Oddział\s|TYTUŁ|Tytuł\s|KSIĘGA|Księga\s)")


def bez_pauz(t):
    # pauza i półpauza na dywiz (reguła katalogu: zero długich myślników w skillu)
    return t.replace(chr(0x2013), "-").replace(chr(0x2014), "-")


def pobierz(url):
    req = urllib.request.Request(url, headers={"User-Agent": "katalog-skilli-akty/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()


def indeks(t):
    return "".join(SUP.get(c, "^" + c) for c in t.strip().replace("[", "").replace("]", ""))


def linie_strony(strona, rozmiar_tresci):
    """Zwraca listę wierszy tekstu strony; pomija przypisy, nagłówki i odnośniki przypisów."""
    # Tabele (np. załączniki z sektorami NIS2, stawki) jako wiersze Markdown; ich tekstu nie składamy w akapity.
    tabele = []
    try:
        for t in strona.find_tables().tables:
            wiersze_t = [[re.sub(r"\s+", " ", (c or "")).strip().replace("|", "/") for c in r] for r in t.extract()]
            wiersze_t = [r for r in wiersze_t if any(r)]
            if len(wiersze_t) >= 2 and max(len(r) for r in wiersze_t) >= 2:
                tabele.append((pymupdf_rect(t.bbox), wiersze_t))
    except Exception:
        tabele = []
    zwykle, gorne, margines = [], [], []
    for b in strona.get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            for s in l["spans"]:
                if not s["text"].strip() and not s["text"]:
                    continue
                sx, sy = (s["bbox"][0] + s["bbox"][2]) / 2, (s["bbox"][1] + s["bbox"][3]) / 2
                if any(r[0] <= sx <= r[2] and r[1] <= sy <= r[3] for r, _ in tabele):
                    continue
                if s["bbox"][0] > 480 and s["size"] < rozmiar_tresci - 0.9 and s["flags"] & 16 and strona.rect.width < 700:
                    margines.append(s)  # notka ISAP na marginesie (np. „Nowe brzmienie ... wejdzie w życie”)
                else:
                    (gorne if s["flags"] & 1 else zwykle).append(s)
    mw = []  # wiersze notek: [y, [spany]]
    for s in sorted(margines, key=lambda s: s["origin"][1]):
        y = s["origin"][1]
        for w in mw:
            if abs(w[0] - y) <= 4:
                w[1].append(s)
                break
        else:
            mw.append([y, [s]])
    notki = []  # [y, tekst, ostatnie_y]
    for y, sp in sorted(mw, key=lambda w: w[0]):
        t = ""
        for x in sorted(sp, key=lambda x: x["bbox"][0]):
            t += indeks(x["text"]) if x["flags"] & 1 else (" " if t else "") + x["text"].strip()
        if notki and y - notki[-1][2] < 16:
            notki[-1][1] += " " + t
            notki[-1][2] = y
        else:
            notki.append([y, t, y])
    wiersze = []  # [baseline, [spany]]
    for s in sorted(zwykle, key=lambda s: (round(s["origin"][1], 1), s["bbox"][0])):
        y = s["origin"][1]
        for w in wiersze:
            if abs(w[0] - y) <= 2.0:
                w[1].append(s)
                break
        else:
            wiersze.append([y, [s]])
    for s in gorne:
        y = s["origin"][1]
        cand = [w for w in wiersze if 0 <= w[0] - y <= 7 or abs(w[0] - y) <= 2]
        if cand:
            min(cand, key=lambda w: abs(w[0] - y))[1].append(s)
    wynik = []
    # Przypisy to blok drobnej czcionki na dole strony, zaczynający się od „N)”; drobna czcionka
    # wyżej (tabele w załącznikach, np. sektory NIS2) zostaje.
    def drobny(spany):
        t = [s for s in spany if not (s["flags"] & 1) and s["text"].strip()]
        return not t or max(s["size"] for s in t) < rozmiar_tresci - 0.9
    start_przypisow = strona.rect.height
    for y, spany in sorted(wiersze, key=lambda w: w[0]):
        tekst0 = "".join(s["text"] for s in sorted(spany, key=lambda s: s["bbox"][0])).strip()
        if y > strona.rect.height * 0.45 and drobny(spany) and re.match(r"^\d+[a-z]?\)", tekst0):
            start_przypisow = y
            break
    for y, spany in sorted(wiersze, key=lambda w: w[0]):
        spany.sort(key=lambda s: s["bbox"][0])
        tresc = [s for s in spany if not (s["flags"] & 1) and s["text"].strip()]
        if not tresc or (drobny(spany) and (y >= start_przypisow or y < 60 or y > strona.rect.height - 50)):
            continue  # przypis, nagłówek albo stopka strony drobną czcionką
        tekst, poprz = "", None
        for i, s in enumerate(spany):
            t = s["text"]
            if s["flags"] & 1:
                nast = spany[i + 1]["text"] if i + 1 < len(spany) else ""
                if re.fullmatch(r"\s*\d+\)\s*", t) or (nast.startswith(")") and re.fullmatch(r"\s*\d+\s*", t)):
                    poprz = s
                    continue  # odnośnik przypisu
                t = indeks(t)
            elif poprz is not None and poprz["flags"] & 1 and t.startswith(")") and re.fullmatch(r"\s*\d+\s*", poprz["text"]):
                t = t[1:]
            if poprz is not None and tekst and not tekst.endswith(" ") and not t.startswith(" ") \
                    and s["bbox"][0] - poprz["bbox"][2] > 1.2 and not (s["flags"] & 1):
                tekst += " "
            tekst += t
            poprz = s
        tekst = re.sub(r"\^B\^ł\^ą.*?\^\.\^\)", "", tekst)  # błąd zakładki Worda w źródłowym PDF
        tekst = re.sub(r"(?:[⁰¹²³⁴⁵⁶⁷⁸⁹]+\^\)(?:\^[,.])?\^?\s?)+", "", tekst)  # odnośniki przypisów
        tekst = re.sub(r"\s+", " ", tekst).strip()
        if tekst and not NAGLOWEK.match(tekst):
            wynik.append((y, tekst))
    for y, t, _ in notki:
        t = re.sub(r"\s+", " ", re.sub(r"(\d)\[(\w+)\]", lambda m: m.group(1) + indeks(m.group(2)), t)).strip()
        if t:
            wynik.append((y - 0.5, "> Notka ISAP: " + t))
    for r, wiersze_t in tabele:
        for i, w in enumerate(wiersze_t):
            wynik.append((r[1] + i * 0.001, "| " + " | ".join(w) + " |"))
    return [t for _, t in sorted(wynik, key=lambda w: w[0])]


def pymupdf_rect(b):
    return (b[0], b[1], b[2], b[3])


def na_markdown(pdf_bytes):
    import pymupdf
    doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
    rozm = Counter()
    for p in doc:
        for b in p.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                for s in l["spans"]:
                    if not s["flags"] & 1:
                        rozm[round(s["size"], 1)] += len(s["text"])
    rozmiar_tresci = rozm.most_common(1)[0][0]
    surowy = "".join(p.get_text() for p in doc[:3])
    akapity, notki = [], []
    for p in doc:
        for w in linie_strony(p, rozmiar_tresci):
            if w.startswith("> Notka"):
                notki.append(w)  # notkę wstawiamy po akapicie, w którym stoi
                continue
            if akapity and not NOWY_AKAPIT.match(w):
                pop = akapity[-1]
                if re.search(r"[a-ząćęłńóśźż]-$", pop) and re.match(r"[a-ząćęłńóśźż]", w):
                    akapity[-1] = pop[:-1] + w
                else:
                    akapity[-1] = pop + " " + w
            else:
                akapity += notki
                notki = []
                akapity.append(w)
    akapity += notki
    linie = []
    for a in akapity:
        a = bez_pauz(a)
        if NAGLOWEK_MD.match(a):
            linie += ["", "## " + a, ""]
        elif re.match(r"[\[<]?Art\. ", a):
            linie += ["", a]
        else:
            linie.append(a)
    tekst = re.sub(r"\n{3,}", "\n\n", "\n".join(linie)).strip() + "\n"
    return tekst, surowy, len(doc)


def przetworz(akt, dzis):
    meta = json.loads(pobierz(API + akt["eli"]))
    teksty = {t["type"]: t["fileName"] for t in meta.get("texts", [])}
    if "U" in teksty:
        rodzaj, url = "tekst ujednolicony Kancelarii Sejmu", f"{API}{akt['eli']}/text/U/{teksty['U']}"
    else:
        typ = next(t for t in ("T", "I", "O") if t in teksty)
        rodzaj, url = "tekst ogłoszony w Dzienniku Ustaw", f"{API}{akt['eli']}/text/{typ}/{teksty[typ]}"
    pdf = pobierz(url)
    tekst, surowy, stron = na_markdown(pdf)
    data_u = re.search(r"Kancelaria Sejmu\s*\n?\s*s\.\s*\d+/\d+\s*\n?\s*(\d{4}-\d{2}-\d{2})", surowy)
    podst = re.search(r"Opracowano\s+na\s+podstawie:\s*(.+?)(?:©|\n\s*\n)", surowy, re.S)
    podst = re.split(r"\s(?:Nowe|Dodan|Uchylon|Utrac|Zmian)", re.sub(r"\s+", " ", podst.group(1)))[0].strip().rstrip(".") if podst else ""
    m_podst = re.match(r"(.*?poz\.\s*[\d, ]+(?:,?\s*z \d{4} r\.\s*(?:poz\.\s*)?[\d, ]+)*)", podst)
    podst = m_podst.group(1).rstrip(" ,.") if m_podst else podst  # sama lista pozycji, bez śmieci z ramki ISAP
    zmiany = meta.get("references", {}).get("Akty zmieniające", [])
    przyszle = sorted((z["date"], z["id"]) for z in zmiany if z.get("date", "") > dzis)
    przyszle_txt = [f"Dz.U. {i.split('/')[1]} poz. {i.split('/')[2]}, wchodzi w życie {d}" for d, i in przyszle]
    nag = [f"# {akt['nazwa']} ({akt['skrot']})", "",
           f"- Akt: {meta['title'].rstrip('.')} (ELI {akt['eli']}).",
           f"- Brzmienie: {rodzaj}" + (f" z dnia {data_u.group(1)}" if data_u else "") + (f", opracowany na podstawie: {podst}" if podst else "") + ".",
           "- Brzmienie w nawiasach kwadratowych [ ] obowiązuje do dnia podanego w notce ISAP, brzmienie w nawiasach ostrych < > od tego dnia. Jeśli data z notki już minęła, stosuj brzmienie w < >.",
           "- Moc wiążącą ma tekst ogłoszony w Dzienniku Ustaw; to jest kopia robocza do wyszukiwania. Przypisy pominięte, półpauzy zamienione na dywiz, indeksy górne jako znaki indeksu (np. Art. 22¹).",
           f"- Pobrano z api.sejm.gov.pl {dzis}. Źródło: {url}",
           "- Zmiany z datą wejścia w życie po dniu pobrania (sprawdź, czy tekst już je uwzględnia): " + ("; ".join(przyszle_txt) if przyszle_txt else "brak w bazie ELI") + ".",
           "- Przy dostępie do sieci sprawdź aktualność na isap.sejm.gov.pl albo dziennikustaw.gov.pl.", ""]
    plik = CEL / f"{akt['skrot']}.md"
    # zapis atomowy: plik tymczasowy, podmiana dopiero po kontroli konwersji
    tmp = plik.with_suffix(".tmp")
    tmp.write_text(bez_pauz("\n".join(nag) + "\n" + tekst), encoding="utf-8")
    if len(re.findall(r"^[\[<]?Art\. ", tekst, re.M)) <= 5:
        tmp.unlink()
        raise RuntimeError(f"{akt['skrot']}: za mało artykułów po konwersji, plik nie został podmieniony")
    tmp.replace(plik)
    return {"skrot": akt["skrot"], "eli": akt["eli"], "nazwa": akt["nazwa"], "rodzaj": rodzaj,
            "data_tekstu": data_u.group(1) if data_u else None, "podstawa": podst,
            "changeDate": meta.get("changeDate"), "liczba_zmian": len(zmiany),
            "pobrano": dzis, "stron_pdf": stron, "bajty_md": plik.stat().st_size,
            "artykulow": len(re.findall(r"^[\[<]?Art\. ", tekst, re.M)),
            "sha256_pdf": hashlib.sha256(pdf).hexdigest()}


def sprawdz():
    stan = json.loads(STAN.read_text(encoding="utf-8"))
    roznice = []
    for s in stan:
        meta = json.loads(pobierz(API + s["eli"]))
        n = len(meta.get("references", {}).get("Akty zmieniające", []))
        if meta.get("changeDate") != s["changeDate"] or n != s["liczba_zmian"]:
            roznice.append(f"{s['skrot']}: zmian {s['liczba_zmian']} -> {n}, changeDate {s['changeDate']} -> {meta.get('changeDate')}")
    print(datetime.datetime.now().isoformat(timespec="minutes"), "\n".join(roznice) if roznice else "bez zmian")
    if roznice and "--mail" in sys.argv:
        powiadom(roznice)
    return 1 if roznice else 0


def powiadom(roznice):
    """E-mail do skrzynki kontaktowej katalogu (SMTP z config.json, hasło z .env obok repozytorium)."""
    import smtplib, ssl
    from email.message import EmailMessage
    cfg = json.loads((KORZEN / "config.json").read_text(encoding="utf-8"))
    w = next(v for v in cfg.values() if isinstance(v, dict) and "wysylka" in v)["wysylka"]
    env = dict(l.split("=", 1) for l in (KORZEN / ".env").read_text(encoding="utf-8").splitlines() if "=" in l and not l.startswith("#"))
    haslo = env.get(w.get("hasloZmienna", "SMTP_HASLO"), "").strip().strip('"')
    m = EmailMessage()
    m["From"], m["To"] = w["nadawca"], cfg["mailKontaktowy"]
    m["Subject"] = f"Zmiany w aktach skilla sprawy-prawne-w-firmie ({len(roznice)})"
    m.set_content("Cotygodniowe sprawdzenie bazy ELI Sejmu wykryło zmiany we wbudowanych aktach:\n\n"
                  + "\n".join(roznice)
                  + "\n\nDo zrobienia: python narzedzia/akty.py <SKRÓTY>, przegląd wpływu na moduły, nowa wersja skilla i wydanie.\n")
    with smtplib.SMTP(w["host"], int(w["port"]), timeout=30) as s:
        s.starttls(context=ssl.create_default_context())
        s.login(w["uzytkownik"], haslo)
        s.send_message(m)
    print("wysłano powiadomienie do", cfg["mailKontaktowy"])


def main():
    if "--sprawdz" in sys.argv:
        sys.exit(sprawdz())
    lista = json.loads(LISTA.read_text(encoding="utf-8"))
    wybrane = [a for a in sys.argv[1:] if not a.startswith("-")]
    if wybrane:
        lista = [a for a in lista if a["skrot"] in wybrane]
    CEL.mkdir(parents=True, exist_ok=True)
    dzis = datetime.date.today().isoformat()
    stan = {s["skrot"]: s for s in json.loads(STAN.read_text(encoding="utf-8"))} if STAN.exists() else {}
    for akt in lista:
        w = przetworz(akt, dzis)
        assert w["artykulow"] > 5, (akt["skrot"], "za mało artykułów, sprawdź konwersję")
        stan[akt["skrot"]] = w
        print(f"{w['skrot']:10} {w['artykulow']:5} art. {w['bajty_md']:9} B  {w['data_tekstu']}  {w['podstawa'][:60]}")
        zapisz_stan(stan)  # rejestr i spis po każdym akcie: błąd przy następnym nie zostawi rozjazdu


def zapisz_stan(stan):
    kolej = [a["skrot"] for a in json.loads(LISTA.read_text(encoding="utf-8"))]
    wiersze = [stan[k] for k in kolej if k in stan]
    STAN.write_text(json.dumps(wiersze, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    spis = ["# Spis wbudowanych aktów", "",
            "Plik aktu: `references/akty/<SKRÓT>.md`. Szukaj przepisu wzorcem `Art. 30.` albo `Art. 22³.` (także w nawiasach [ ] i < >, zob. nagłówek pliku). Data brzmienia to stan tekstu; nowsze zmiany sprawdź w sieci, jeśli możesz.", "",
            "| Skrót | Akt | Brzmienie z dnia | Podstawa (tekst jednolity) |", "|---|---|---|---|"]
    for w in wiersze:
        spis.append(f"| {w['skrot']} | {w['nazwa']} | {w['data_tekstu'] or w['pobrano']} | {w['podstawa'] or 'tekst ogłoszony'} |")
    (CEL / "SPIS.md").write_text(bez_pauz("\n".join(spis) + "\n"), encoding="utf-8")


if __name__ == "__main__":
    main()
