#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Śledzenie projektów ustaw, o których mówią skille katalogu (API Sejmu, kadencja X).

Użycie (z katalogu katalog-skilli):
    python narzedzia/projekty-ustaw.py            # sprawdzenie i zapis stanu, wynik na ekran
    python narzedzia/projekty-ustaw.py --mail     # to samo, przy zmianie e-mail na adres kontaktowy katalogu
    python narzedzia/projekty-ustaw.py --selftest # test bez sieci

Lista: narzedzia/projekty-ustaw.json (procesy po numerze druku i frazy w tytułach nowych procesów).
Stan: dane/projekty-ustaw-stan.json (poza gitem). Pierwsze uruchomienie zapisuje stan bez powiadomienia.
Na VPS: cron w poniedziałki obok narzedzia/akty.py --sprawdz --mail.
"""
import datetime
import json
import pathlib
import sys
import time
import urllib.parse
import urllib.request

KORZEN = pathlib.Path(__file__).resolve().parent.parent
LISTA = KORZEN / "narzedzia" / "projekty-ustaw.json"
STAN = KORZEN / "dane" / "projekty-ustaw-stan.json"
API = "https://api.sejm.gov.pl/sejm/term10/"
UA = "AiXperts-katalog-skilli/1.0 (+https://skille.aixperts.pl)"


def pobierz(url):
    time.sleep(0.5)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def plaskie_etapy(proces):
    """Etapy główne i podetapy (children) w kolejności przebiegu."""
    wynik = []
    for e in proces.get("stages") or []:
        wynik.append(e)
        wynik.extend(e.get("children") or [])
    return wynik


def etap(proces):
    """Ostatni etap z datą (przy tej samej dacie późniejszy w przebiegu), uchwalenie, publikacja i liczba wszystkich etapów."""
    wszystkie = plaskie_etapy(proces)
    z_data = [(e["date"], i, e) for i, e in enumerate(wszystkie) if e.get("date")]
    ost = max(z_data)[2] if z_data else {}
    return {"etap": ost.get("stageName"), "data": ost.get("date"), "uchwalono": bool(proces.get("passed")),
            "eli": proces.get("ELI"), "liczba_etapow": len(wszystkie)}


def opis(nazwa, s):
    pub = ("ogłoszono: %s" % s["eli"]) if s.get("eli") else ("uchwalono przez Sejm, nieogłoszona" if s.get("uchwalono") else "w toku")
    return "%s: %s (%s), %s" % (nazwa, s.get("etap") or "brak etapu z datą", s.get("data") or "-", pub)


def sprawdz(lista, stan, pobierz=pobierz):
    nowy, zmiany = {}, []
    for p in lista["procesy"]:
        klucz = "proces:" + p["nr"]
        s = etap(pobierz(API + "processes/" + urllib.parse.quote(p["nr"])))
        nowy[klucz] = s
        if klucz in stan and stan[klucz] != s:
            zmiany.append("%s\n  było: %s\n  skille do przeglądu: %s" % (opis(p["nazwa"], s), opis("", stan[klucz]).lstrip(": "), ", ".join(p["skille"])))
    for f in lista["szukaj"]:
        klucz = "fraza:" + f["fraza"]
        wyniki = pobierz(API + "processes?" + urllib.parse.urlencode({"title": f["fraza"], "limit": 200}))
        numery = sorted({str(x.get("number")) for x in wyniki if x.get("number")})
        nowy[klucz] = numery
        if klucz in stan:
            dodane = [x for x in wyniki if str(x.get("number")) not in stan[klucz]]
            for x in dodane:
                zmiany.append("%s: nowy proces w Sejmie, druk %s, %s (%s)\n  skille do przeglądu: %s" % (
                    f["nazwa"], x.get("number"), (x.get("title") or "")[:200], x.get("processStartDate") or "-", ", ".join(f["skille"])))
    return nowy, zmiany


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
    m["Subject"] = "Projekty ustaw w skillach: zmiany (%d)" % len(zmiany)
    m.set_content("Cotygodniowe sprawdzenie API Sejmu wykryło zmiany w projektach ustaw, o których mówią skille katalogu:\n\n"
                  + "\n\n".join(zmiany)
                  + "\n\nDo zrobienia: przegląd wskazanych skilli, poprawka, testy, sędzia, nowa wersja i wydanie.\n")
    with smtplib.SMTP(w["host"], int(w["port"]), timeout=30) as s:
        s.starttls(context=ssl.create_default_context())
        s.login(w["uzytkownik"], haslo)
        s.send_message(m)
    print("wysłano powiadomienie do", cfg["mailKontaktowy"])


def selftest():
    proces = {"passed": True, "ELI": None, "stages": [{"stageName": "Projekt wpłynął", "date": "2026-09-04"},
                                                      {"stageName": "III czytanie", "date": "2026-10-08"}, {"stageName": "Uchwalono", "date": None}]}
    s = etap(proces)
    assert s == {"etap": "III czytanie", "data": "2026-10-08", "uchwalono": True, "eli": None, "liczba_etapow": 3}, s
    lista = {"procesy": [{"nr": "1", "nazwa": "A", "skille": ["x"]}], "szukaj": [{"fraza": "f", "nazwa": "F", "skille": ["y"]}]}
    odp = {"processes/1": proces, "processes?title=f&limit=200": [{"number": "10", "title": "T10"}]}
    atrapa = lambda url: odp[url.replace(API, "")]
    nowy, zmiany = sprawdz(lista, {}, atrapa)
    assert zmiany == [] and nowy["fraza:f"] == ["10"], (nowy, zmiany)  # pierwsze uruchomienie: bez powiadomień
    proces2 = dict(proces, ELI="DU/2026/1500")
    odp["processes/1"] = proces2
    odp["processes?title=f&limit=200"] = [{"number": "10", "title": "T10"}, {"number": "11", "title": "T11", "processStartDate": "2026-11-20"}]
    nowy2, zmiany2 = sprawdz(lista, nowy, atrapa)
    assert len(zmiany2) == 2 and "ogłoszono: DU/2026/1500" in zmiany2[0] and "druk 11" in zmiany2[1], zmiany2
    _, zmiany3 = sprawdz(lista, nowy2, atrapa)
    assert zmiany3 == [], zmiany3
    # awaria poczty: stan bez zmian, powiadomienie wraca w kolejnym przebiegu
    zapisane = []

    def zla_poczta(z):
        raise OSError("SMTP niedostępny")
    try:
        przebieg(lista, nowy, True, atrapa, zla_poczta, zapisane.append)
        raise AssertionError("brak błędu poczty")
    except OSError:
        pass
    assert zapisane == [], zapisane
    wyslane = []
    _, z4, _ = przebieg(lista, nowy, True, atrapa, wyslane.append, zapisane.append)
    assert len(z4) == 2 and len(wyslane) == 1 and len(zapisane) == 1, (z4, wyslane, zapisane)
    # bez --mail: wypis, stan nietknięty
    zapisane.clear()
    _, z5, t5 = przebieg(lista, nowy, False, atrapa, wyslane.append, zapisane.append)
    assert len(z5) == 2 and zapisane == [] and "stan nie został zapisany" in t5, (z5, zapisane)
    # podetapy komisji i remis dat: zmiana w children wykrywana, przy tej samej dacie późniejszy etap
    p3 = {"stages": [{"stageName": "Praca w komisjach po I czytaniu", "date": "2026-10-19",
                      "children": [{"stageName": "Sprawozdanie podkomisji", "date": "2026-10-19"}]}]}
    p3b = {"stages": [{"stageName": "Praca w komisjach po I czytaniu", "date": "2026-10-19",
                       "children": [{"stageName": "Sprawozdanie podkomisji", "date": "2026-10-19"}, {"stageName": "Sprawozdanie komisji", "date": "2026-10-21"}]}]}
    assert etap(p3) != etap(p3b) and etap(p3b)["etap"] == "Sprawozdanie komisji", (etap(p3), etap(p3b))
    p4 = {"stages": [{"stageName": "Praca w komisjach po II czytaniu", "date": "2026-11-06"}, {"stageName": "III czytanie na posiedzeniu Sejmu", "date": "2026-11-06"}]}
    assert etap(p4)["etap"] == "III czytanie na posiedzeniu Sejmu", etap(p4)
    print("selftest OK")


def zapisz(nowy):
    STAN.parent.mkdir(parents=True, exist_ok=True)
    tymczasowy = STAN.with_suffix(".tmp")
    tymczasowy.write_text(json.dumps(nowy, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    tymczasowy.replace(STAN)


def przebieg(lista, stan, mail, pobierz=pobierz, powiadom=powiadom, zapisz=zapisz):
    """Stan zapisujemy dopiero po skutecznym powiadomieniu: awaria poczty nie gubi zmiany (wróci w kolejnym przebiegu).
    Bez --mail zmiany tylko wypisujemy, stanu nie ruszamy, żeby ręczne uruchomienie nie połknęło powiadomienia."""
    nowy, zmiany = sprawdz(lista, stan, pobierz)
    if not stan:
        zapisz(nowy)
        return nowy, [], "pierwsze uruchomienie: zapisano stan %d pozycji, bez powiadomienia" % len(nowy)
    if not zmiany:
        zapisz(nowy)
        return nowy, [], "bez zmian"
    if mail:
        powiadom(zmiany)
        zapisz(nowy)
        return nowy, zmiany, "\n\n".join(zmiany)
    return nowy, zmiany, "\n\n".join(zmiany) + "\n\n(bez --mail stan nie został zapisany; automat powiadomi przy najbliższym przebiegu)"


def main():
    if "--selftest" in sys.argv:
        selftest()
        return 0
    lista = json.loads(LISTA.read_text(encoding="utf-8"))
    stan = json.loads(STAN.read_text(encoding="utf-8")) if STAN.exists() else {}
    nowy, zmiany, tekst = przebieg(lista, stan, "--mail" in sys.argv)
    print(datetime.datetime.now().isoformat(timespec="minutes"), tekst)
    if not stan:
        for k, v in nowy.items():
            print(" ", k, v if isinstance(v, list) else opis("", v).lstrip(": "))
    return 1 if zmiany else 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
