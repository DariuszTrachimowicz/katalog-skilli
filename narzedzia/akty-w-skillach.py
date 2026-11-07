#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Cotygodniowy przegląd aktów cytowanych w skillach (Dziennik Ustaw, API Sejmu ELI).

Zbiera z plików skilli (SKILL.md i references, bez kopii w references/katalog i bez wbudowanych aktów
w references/akty, które pilnuje narzedzia/akty.py) każde wskazanie „Dz.U. RRRR poz. N”, ustala akt bazowy
(dla tekstu jednolitego: akt, którego dotyczy obwieszczenie) i porównuje z poprzednim przebiegiem:
nowe akty zmieniające i nowy tekst jednolity. Przy zmianie wypisuje, które skille i linie cytują akt.

Użycie (z katalogu katalog-skilli):
    python narzedzia/akty-w-skillach.py            # przebieg, wynik na ekran (stan zapisywany tylko bez zmian)
    python narzedzia/akty-w-skillach.py --mail     # przy zmianie e-mail na adres kontaktowy, potem zapis stanu
    python narzedzia/akty-w-skillach.py --raport   # jednorazowo: zmiany po dacie z tej samej linii cytatu (bez stanu)
    python narzedzia/akty-w-skillach.py --selftest # test bez sieci

Stan: dane/akty-w-skillach-stan.json (poza gitem). Pierwsze uruchomienie zapisuje stan bez powiadomienia.
Na VPS: cron w poniedziałki obok narzedzia/akty.py i narzedzia/projekty-ustaw.py.
"""
import datetime
import importlib.util
import json
import pathlib
import re
import sys

KORZEN = pathlib.Path(__file__).resolve().parent.parent
STAN = KORZEN / "dane" / "akty-w-skillach-stan.json"
_spec = importlib.util.spec_from_file_location("akty_eli", KORZEN / "narzedzia" / "skrypty-skilli" / "akty_eli.py")
akty_eli = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(akty_eli)

CYTAT = re.compile(r"Dz\.\s*U\.\s*(?:z\s*)?(\d{4})(?:\s*r\.)?\s*,?\s*(?:nr\s*\d+\s*,?\s*)?poz\.\s*(\d+)(?![\d\w]|[.,]\d)", re.I)
MIESIACE = {m: i for i, m in enumerate(["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia",
                                         "września", "października", "listopada", "grudnia"], 1)}
DATY = [
    (re.compile(r"\b(\d{4})-(\d{2})-(\d{2})\b"), lambda m: (int(m[1]), int(m[2]), int(m[3]))),
    (re.compile(r"\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b"), lambda m: (int(m[3]), int(m[2]), int(m[1]))),
    (re.compile(r"\b(\d{1,2}) (%s) (\d{4})" % "|".join(MIESIACE)), lambda m: (int(m[3]), MIESIACE[m[2]], int(m[1]))),
]


def cytaty(korzen=KORZEN):
    """{eli: [(skill, ścieżka:linia, linia)]} z plików skilli."""
    wynik = {}
    pliki = list((korzen / "skille").glob("*/SKILL.md")) + list((korzen / "skille").glob("*/references/**/*.md"))
    for p in sorted(pliki):
        rel = p.relative_to(korzen).as_posix()
        if "/references/katalog/" in rel or "/references/akty/" in rel:
            continue
        for nr, linia in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
            for m in CYTAT.finditer(linia):
                wynik.setdefault("DU/%s/%d" % (m[1], int(m[2])), []).append((rel.split("/")[1], "%s:%d" % (rel, nr), linia))
    return wynik


SLOWA_STANU = re.compile(r"(stan|sprawdz|odczyt|otwart|brzmieni|na dzień|wersj)[^\d]{0,25}$", re.I)


def data_linii(linia, dzis=None):
    """Data stanu sprawdzenia z linii rejestru (RRRR-MM-DD albo None).

    Najpierw najpóźniejsza data poprzedzona słowem o stanie lub sprawdzeniu; bez takiej daty
    najpóźniejsza data nie z przyszłości (przyszłe daty to zwykle terminy wejścia w życie)."""
    dzis = dzis or datetime.date.today().isoformat()
    przy_slowie, inne = [], []
    for wzor, f in DATY:
        for m in wzor.finditer(linia):
            try:
                d = datetime.date(*f(m)).isoformat()
            except ValueError:
                continue
            if d > dzis:
                continue
            (przy_slowie if SLOWA_STANU.search(linia[max(0, m.start() - 40):m.start()]) else inne).append(d)
    daty = przy_slowie or inne
    return max(daty) if daty else None


def baza_aktu(eli, pobierz):
    meta = pobierz(akty_eli.API + eli)
    ref = meta.get("references") or {}
    if meta.get("type") == "Obwieszczenie" and ref.get("Tekst jednolity dla aktu"):
        baza = ref["Tekst jednolity dla aktu"][0]["id"]
        return baza, pobierz(akty_eli.API + baza)
    return eli, meta


def stan_aktu(meta):
    ref = meta.get("references") or {}
    zm = sorted("%s@%s" % (z["id"], z.get("date") or "") for z in ref.get("Akty zmieniające") or [])
    tj = sorted((x["id"] for x in ref.get("Inf. o tekście jednolitym") or []), key=akty_eli._klucz)
    return {"tytul": (meta.get("title") or "").strip()[:200], "zmiany": zm, "tj": tj[-1] if tj else None,
            "obowiazuje": meta.get("inForce") == "IN_FORCE"}


def przeglad(cyt, pobierz):
    """{akt bazowy: stan} i {akt bazowy: [cytaty]}."""
    stany, gdzie, bazy = {}, {}, {}
    for eli in sorted(cyt):
        try:
            if eli not in bazy:
                bazy[eli] = baza_aktu(eli, pobierz)
        except akty_eli.BladApi as e:
            if "Nie ma takiego aktu" in str(e):
                stany.setdefault("BRAK:" + eli, {"tytul": "brak w bazie ELI", "zmiany": [], "tj": None, "obowiazuje": False})
                gdzie.setdefault("BRAK:" + eli, []).extend(cyt[eli])
                continue
            raise
        baza, meta = bazy[eli]
        stany[baza] = stan_aktu(meta)
        gdzie.setdefault(baza, []).extend(cyt[eli])
    return stany, gdzie


def roznice(stare, nowe, gdzie):
    wynik = []
    for akt, s in sorted(nowe.items()):
        skille = sorted({g[0] for g in gdzie.get(akt, [])})
        miejsca = ["    %s" % g[1] for g in gdzie.get(akt, [])]
        if akt not in stare:
            if akt.startswith("BRAK:"):
                naglowek = "Cytat wskazuje pozycję, której nie ma w bazie ELI: %s (sprawdź publikator)" % akty_eli.czytelny(akt[5:])
            else:
                naglowek = "Nowy akt w cytatach skilli: %s (%s), %s, zmian w ELI: %d" % (
                    s["tytul"], akty_eli.czytelny(akt), "obowiązuje" if s["obowiazuje"] else "NIE obowiązuje według ELI", len(s["zmiany"]))
            wynik.append("\n".join([naglowek, "  skille do przeglądu: %s" % ", ".join(skille)] + miejsca))
            continue
        nowe_zm = sorted(set(s["zmiany"]) - set(stare[akt]["zmiany"]))
        nowy_tj = s["tj"] if s["tj"] != stare[akt]["tj"] else None
        utrata = stare[akt]["obowiazuje"] and not s["obowiazuje"]
        if not (nowe_zm or nowy_tj or utrata):
            continue
        linie = ["%s (%s)" % (s["tytul"], akty_eli.czytelny(akt) if not akt.startswith("BRAK:") else akt)]
        for z in nowe_zm:
            id_, data = z.split("@")
            linie.append("  nowy akt zmieniający: %s, w życie %s" % (akty_eli.czytelny(id_), data or "brak daty"))
        if nowy_tj:
            linie.append("  nowy tekst jednolity: %s" % akty_eli.czytelny(nowy_tj))
        if utrata:
            linie.append("  akt przestał obowiązywać według ELI")
        linie.append("  skille do przeglądu: %s" % ", ".join(skille))
        linie += miejsca
        wynik.append("\n".join(linie))
    return wynik


def raport(cyt, pobierz, dzis=None):
    """Jednorazowo: dla linii z datą zmiany aktu wchodzące w życie po tej dacie."""
    dzis = dzis or datetime.date.today().isoformat()
    wynik, bazy = [], {}
    for eli in sorted(cyt):
        for skill, miejsce, linia in cyt[eli]:
            od = data_linii(linia, dzis)
            if not od:
                continue
            if eli not in bazy:
                try:
                    bazy[eli] = baza_aktu(eli, pobierz)
                except akty_eli.BladApi as e:
                    if "Nie ma takiego aktu" not in str(e):
                        raise
                    bazy[eli] = None
            if not bazy[eli]:
                wynik.append("%s | %s | %s: brak w bazie ELI, sprawdź publikator" % (skill, miejsce, akty_eli.czytelny(eli)))
                continue
            baza, meta = bazy[eli]
            zm = akty_eli.wybierz_zmiany((meta.get("references") or {}).get("Akty zmieniające") or [], od)
            if zm:
                opis = ", ".join("%s (%s %s)" % (akty_eli.czytelny(z["id"]), "wejdzie" if z["date"] > dzis else "od", z["date"]) for z in zm)
                wynik.append("%s | %s | %s po %s: %s" % (skill, miejsce, akty_eli.czytelny(baza), od, opis))
    return wynik


def powiadom(zmiany):
    """E-mail na adres kontaktowy katalogu (SMTP z config.json, hasło z .env), jak w narzedzia/akty.py."""
    import smtplib, ssl
    from email.message import EmailMessage
    cfg = json.loads((KORZEN / "config.json").read_text(encoding="utf-8"))
    w = next(v for v in cfg.values() if isinstance(v, dict) and "wysylka" in v)["wysylka"]
    env = dict(l.split("=", 1) for l in (KORZEN / ".env").read_text(encoding="utf-8").splitlines() if "=" in l and not l.startswith("#"))
    haslo = env.get(w.get("hasloZmienna", "SMTP_HASLO"), "").strip().strip('"')
    m = EmailMessage()
    m["From"], m["To"] = w["nadawca"], cfg["mailKontaktowy"]
    m["Subject"] = "Akty cytowane w skillach: zmiany (%d)" % len(zmiany)
    m.set_content("Cotygodniowy przegląd bazy ELI wykrył zmiany w aktach, które cytują skille katalogu:\n\n"
                  + "\n\n".join(zmiany)
                  + "\n\nDo zrobienia: sprawdzić, czy zmiana dotyczy przepisów, na których opiera się skill "
                    "(python narzedzia/skrypty-skilli/akty_eli.py zmiana ...), poprawka, testy, sędzia, nowa wersja i wydanie.\n")
    with smtplib.SMTP(w["host"], int(w["port"]), timeout=30) as s:
        s.starttls(context=ssl.create_default_context())
        s.login(w["uzytkownik"], haslo)
        s.send_message(m)
    print("wysłano powiadomienie do", cfg["mailKontaktowy"])


def zapisz(stany):
    STAN.parent.mkdir(parents=True, exist_ok=True)
    tymczasowy = STAN.with_suffix(".tmp")
    tymczasowy.write_text(json.dumps(stany, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    tymczasowy.replace(STAN)


def przebieg(cyt, stare, mail, pobierz, powiadom=powiadom, zapisz=zapisz):
    """Stan zapisujemy po skutecznym powiadomieniu (awaria poczty nie gubi zmiany); bez --mail tylko wypis."""
    nowe, gdzie = przeglad(cyt, pobierz)
    if stare is None:  # brak pliku stanu; pusty stan {} to zwykły przebieg
        zapisz(nowe)
        return [], "pierwsze uruchomienie: zapisano stan %d aktów bazowych z %d cytowanych pozycji, bez powiadomienia" % (len(nowe), len(cyt))
    zm = roznice(stare, nowe, gdzie)
    if not zm:
        zapisz(nowe)
        return [], "bez zmian (%d aktów)" % len(nowe)
    if mail:
        powiadom(zm)
        zapisz(nowe)
        return zm, "\n\n".join(zm)
    return zm, "\n\n".join(zm) + "\n\n(bez --mail stan nie został zapisany; automat powiadomi przy najbliższym przebiegu)"


def selftest():
    assert data_linii("| KP | Dz.U. 2026 poz. 1245 | 5.11.2026 | 2026-11-03 |") == "2026-11-05"
    assert data_linii("odczyt 7 listopada 2026 r.") == "2026-11-07"
    assert data_linii("bez daty") is None and data_linii("31.02.2026") is None
    assert data_linii("w życie 1.10.2029, sprawdzone 6.11.2026", "2026-11-07") == "2026-11-06"
    assert data_linii("stan na 1.10.2026, zmiana od 5.11.2026", "2026-11-07") == "2026-10-01"
    assert data_linii("stan prawny na 1 października 2026 r.; zmiana z 3.11.2026 bez znaczenia", "2026-11-07") == "2026-10-01"
    znalezione = lambda t: ["%s/%s" % (m[1], m[2]) for m in CYTAT.finditer(t)]
    assert znalezione("Dz. U. z 2025 r. poz. 1071, Dz.U. 1964 nr 16 poz. 93 i Dz.U. 2026 poz. 1296.") == ["2025/1071", "1964/93", "2026/1296"]
    assert znalezione("Dz.U. 2026 poz. 123abc i Dz.U. 2026 poz. 1.234") == []
    dane = {
        "DU/2026/1245": {"type": "Obwieszczenie", "references": {"Tekst jednolity dla aktu": [{"id": "DU/1974/141"}]}},
        "DU/1974/141": {"title": "Kodeks pracy", "inForce": "IN_FORCE", "references": {
            "Akty zmieniające": [{"id": "DU/2026/1046", "date": "2026-11-05"}], "Inf. o tekście jednolitym": [{"id": "DU/2026/1245"}]}},
        "DU/2025/1": {"title": "Ustawa X", "inForce": "IN_FORCE", "references": {}},
    }
    atrapa = lambda url, jako_tekst=False: dane[url.replace(akty_eli.API, "")]
    cyt = {"DU/2026/1245": [("zwolnienie", "skille/zwolnienie/references/zasady.md:5", "KP t.j. Dz.U. 2026 poz. 1245, odczyt 1.11.2026")],
           "DU/2025/1": [("spadek", "skille/spadek/SKILL.md:9", "Dz.U. 2025 poz. 1")]}
    zapisane, wyslane = [], []
    zm, t = przebieg(cyt, None, True, atrapa, wyslane.append, zapisane.append)
    assert zm == [] and len(zapisane) == 1 and wyslane == [] and "pierwsze" in t, t
    stare = zapisane[0]
    assert set(stare) == {"DU/1974/141", "DU/2025/1"}, stare
    zm, t = przebieg(cyt, stare, True, atrapa, wyslane.append, zapisane.append)
    assert zm == [] and wyslane == [] and "bez zmian" in t
    dane["DU/1974/141"]["references"]["Akty zmieniające"].append({"id": "DU/2026/1500", "date": "2026-12-01"})
    zapisane.clear()

    def zla_poczta(z):
        raise OSError("SMTP")
    try:
        przebieg(cyt, stare, True, atrapa, zla_poczta, zapisane.append)
        raise AssertionError("brak błędu poczty")
    except OSError:
        pass
    assert zapisane == []
    zm, t = przebieg(cyt, stare, True, atrapa, wyslane.append, zapisane.append)
    assert len(zm) == 1 and "Dz.U. 2026 poz. 1500" in zm[0] and "zwolnienie" in zm[0] and len(wyslane) == 1 and len(zapisane) == 1, zm
    zapisane.clear()
    zm, t = przebieg(cyt, stare, False, atrapa, wyslane.append, zapisane.append)
    assert len(zm) == 1 and zapisane == [] and "nie został zapisany" in t
    # nowy akt w cytatach po pierwszym przebiegu: powiadomienie
    stare2 = stare
    cyt2 = dict(cyt, **{"DU/2025/2": [("remont", "skille/remont/SKILL.md:3", "Dz.U. 2025 poz. 2")]})
    dane["DU/2025/2"] = {"title": "Ustawa Y", "inForce": "IN_FORCE", "references": {}}
    zm, t = przebieg(cyt2, stare2, False, atrapa, wyslane.append, lambda s: None)
    assert len(zm) == 2 and any("Nowy akt w cytatach" in z and "remont" in z for z in zm), zm
    # pozycja, której nie ma w ELI (404), po pierwszym przebiegu: powiadomienie, nie cicha zmiana stanu
    def atrapa404(url, jako_tekst=False):
        if url.endswith("DU/2025/1"):
            raise akty_eli.BladApi("Nie ma takiego aktu w bazie ELI (DU/2025/1).")
        return atrapa(url)
    zm, t = przebieg(cyt, stare2, False, atrapa404, wyslane.append, lambda s: None)
    assert any("nie ma w bazie ELI" in z and "spadek" in z for z in zm), zm
    # inny błąd API przerywa przebieg i raport bez zapisu stanu
    def atrapa429(url, jako_tekst=False):
        raise akty_eli.BladApi("API Sejmu: limit zapytań (429).")
    for f in (lambda: przebieg(cyt, stare2, True, atrapa429, wyslane.append, zapisane.append), lambda: raport(cyt, atrapa429, dzis="2026-11-07")):
        try:
            f()
            raise AssertionError("brak błędu przy 429")
        except akty_eli.BladApi:
            pass
    # pusty zapisany stan (wszystkie cytaty usunięte) to nie pierwszy przebieg: nowe akty idą do maila
    zm, t = przebieg(cyt, {}, False, atrapa, wyslane.append, lambda s: None)
    assert len(zm) == 2 and all("Nowy akt" in z for z in zm), zm
    # pełna lista miejsc w mailu, bez ucinania
    duzo = {"DU/2025/1": [("s%d" % i, "skille/s%d/SKILL.md:%d" % (i, i), "Dz.U. 2025 poz. 1") for i in range(20)]}
    zm, t = przebieg(duzo, {}, False, atrapa, wyslane.append, lambda s: None)
    assert zm[0].count("SKILL.md:") == 20, zm
    r = raport(cyt, atrapa, dzis="2026-11-07")
    assert len(r) == 1 and "Dz.U. 2026 poz. 1046 (od 2026-11-05)" in r[0] and "Dz.U. 2026 poz. 1500 (wejdzie 2026-12-01)" in r[0], r
    print("selftest OK")


def main():
    if "--selftest" in sys.argv:
        akty_eli.PAUZA = 0.0
        selftest()
        return 0
    cyt = cytaty()
    if "--raport" in sys.argv:
        r = raport(cyt, akty_eli.pobierz)
        print("Cytaty z datą, po której akt się zmienił: %d" % len(r))
        print("\n".join(r))
        return 0
    stare = json.loads(STAN.read_text(encoding="utf-8")) if STAN.exists() else None
    zm, tekst = przebieg(cyt, stare, "--mail" in sys.argv, akty_eli.pobierz)
    print(datetime.datetime.now().isoformat(timespec="minutes"), tekst)
    return 1 if zm else 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
