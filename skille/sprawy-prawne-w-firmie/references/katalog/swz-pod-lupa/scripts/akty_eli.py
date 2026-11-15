#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aktualność ustaw z oficjalnego API Sejmu (ELI), na żywo, w trakcie pracy skilla.

Źródło: https://api.sejm.gov.pl/eli (baza ELI Kancelarii Sejmu, Dziennik Ustaw).
Skrypt robi jedno zapytanie naraz z pauzą, łączy się tylko przez HTTPS z api.sejm.gov.pl
(także po przekierowaniu) i niczego nie zapisuje. Tylko biblioteka standardowa Pythona 3.8+.

Użycie:
    python scripts/akty_eli.py sprawdz "Dz.U. 2026 poz. 795" [--od 2026-06-01]
        czy akt obowiązuje, najnowszy tekst jednolity i zmiany wchodzące w życie po dacie --od
        (domyślnie: data stanu prawnego podanego tekstu jednolitego; gdy jej brak, --od obowiązkowe); zmiany przyszłe oznaczone
    python scripts/akty_eli.py zmiana "Dz.U. 2026 poz. 184" --szukaj "art. 498"
        akapity aktu zmieniającego zawierające szukany zwrot (gdy Sejm udostępnia tekst HTML)
    python scripts/akty_eli.py --selftest
        test bez sieci (rozpoznanie adresu aktu, wybór zmian, przekierowania, błędy)

Adres aktu: "Dz.U. 2026 poz. 795", "Dz. U. z 2026 r. poz. 795" albo "DU/2026/795".
Na Windows `python` albo `py`, na Linux i macOS także `python3`.
Bez dostępu do sieci skrypt kończy się komunikatem; skill mówi wtedy o stanie z rejestru źródeł.
"""
import datetime
import html
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

HOST = "api.sejm.gov.pl"
API = "https://%s/eli/acts/" % HOST
UA = "AiXperts-skill/1.0 (+https://skille.aixperts.pl)"
ZRODLO = "Źródło: baza ELI Kancelarii Sejmu, https://api.sejm.gov.pl/eli (Dziennik Ustaw)."
PAUZA = 0.5
MAKS_ZMIAN = 8
_ostatnie = [0.0]


class BladApi(Exception):
    pass


def _dozwolony(url):
    u = urllib.parse.urlsplit(url)
    return u.scheme == "https" and u.hostname == HOST


class _TylkoSejm(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if not _dozwolony(newurl):
            raise BladApi("API Sejmu przekierowało poza https://%s; przerwano." % HOST)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


_otwieracz = urllib.request.build_opener(_TylkoSejm())


def _http(url, jako_tekst):
    if not _dozwolony(url):
        raise BladApi("Dozwolone są tylko adresy https://%s." % HOST)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html" if jako_tekst else "application/json"})
    with _otwieracz.open(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def pobierz(url, jako_tekst=False):
    czekaj = _ostatnie[0] + PAUZA - time.time()
    if czekaj > 0:
        time.sleep(czekaj)
    _ostatnie[0] = time.time()
    try:
        dane = _http(url, jako_tekst)
    except BladApi:
        raise
    except urllib.error.HTTPError as e:
        if e.code == 404:
            raise BladApi("Nie ma takiego aktu w bazie ELI (%s)." % url.replace(API, ""))
        if e.code == 429:
            raise BladApi("API Sejmu: limit zapytań (429). Przerwij i spróbuj za kilka minut.")
        raise BladApi("API Sejmu odpowiedziało %s." % e.code)
    except (urllib.error.URLError, OSError) as e:
        raise BladApi("Brak połączenia z API Sejmu (%s). Użyj stanu z rejestru źródeł skilla i podaj jego datę." % getattr(e, "reason", e))
    if jako_tekst:
        return dane
    try:
        return json.loads(dane)
    except ValueError:
        raise BladApi("API Sejmu zwróciło odpowiedź, której nie da się odczytać.")


def eli(adres):
    """'Dz.U. 2026 poz. 795', 'Dz. U. z 2026 r. poz. 795' albo 'DU/2026/795' -> 'DU/2026/795'."""
    a = str(adres).strip()
    m = re.match(r"^DU/(\d{4})/(\d+)$", a, re.I)
    if not m:
        m = re.search(r"Dz\.\s*U\.\s*(?:z\s*)?(\d{4})(?:\s*r\.)?\s*,?\s*(?:nr\s*\d+\s*,?\s*)?poz\.\s*(\d+)", a, re.I)
    if not m:
        raise ValueError("Nie rozpoznaję adresu aktu: %s (podaj np. \"Dz.U. 2026 poz. 795\")." % adres)
    return "DU/%s/%s" % (m.group(1), int(m.group(2)))


def czytelny(id_):
    r, p = id_.split("/")[1:]
    return "Dz.U. %s poz. %s" % (r, p)


def _klucz(id_):
    _, r, p = id_.split("/")
    return (int(r), int(p))


def wybierz_zmiany(zmiany, od):
    """Zmiany z datą wejścia w życie po `od` (RRRR-MM-DD), rosnąco według daty."""
    wynik = [z for z in zmiany if z.get("date") and z["date"] > od]
    return sorted(wynik, key=lambda z: (z["date"], _klucz(z["id"])))


def sprawdz(adres, od=None, dzis=None):
    dzis = dzis or datetime.date.today().isoformat()
    id_ = eli(adres)
    meta = pobierz(API + id_)
    linie = []
    baza, meta_tj = id_, None
    if meta.get("type") == "Obwieszczenie" and (meta.get("references") or {}).get("Tekst jednolity dla aktu"):
        meta_tj = meta
        baza = meta["references"]["Tekst jednolity dla aktu"][0]["id"]
        meta = pobierz(API + baza)
        linie.append("Podany adres to tekst jednolity (obwieszczenie z %s) aktu %s." % (meta_tj.get("announcementDate"), czytelny(baza)))
    if not od and meta_tj and meta_tj.get("legalStatusDate"):
        # stan prawny tekstu jednolitego (legalStatusDate), nie data ogłoszenia obwieszczenia
        od = meta_tj["legalStatusDate"]
        linie.append("Data stanu przyjęta z tekstu jednolitego: %s. Gdy rejestr skilla podaje inną datę brzmienia, uruchom ponownie z --od." % od)
    if not od:
        raise ValueError("Podaj --od RRRR-MM-DD (data brzmienia z rejestru źródeł): podany adres nie jest tekstem jednolitym albo baza ELI nie podaje jego daty stanu.")
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", od):
        raise ValueError("--od w formacie RRRR-MM-DD.")
    try:
        od = datetime.date.fromisoformat(od).isoformat()
    except ValueError:
        raise ValueError("--od musi być prawdziwą datą w formacie RRRR-MM-DD.")
    ref = meta.get("references") or {}
    linie.insert(0, "%s (%s)" % (meta.get("title", "").strip(), czytelny(baza)))
    linie.append("Status: %s; %s." % (meta.get("status", "brak danych"), "obowiązuje" if meta.get("inForce") == "IN_FORCE" else "NIE obowiązuje albo brak danych o mocy (sprawdź)"))
    tj = sorted((x["id"] for x in ref.get("Inf. o tekście jednolitym") or []), key=_klucz)
    if tj:
        linie.append("Najnowszy tekst jednolity: %s%s." % (czytelny(tj[-1]), "" if not meta_tj or tj[-1] == id_ else " (nowszy niż podany %s)" % czytelny(id_)))
    zm = wybierz_zmiany(ref.get("Akty zmieniające") or [], od)
    if not zm:
        linie.append("Zmian wchodzących w życie po %s w bazie ELI nie ma." % od)
    else:
        linie.append("Zmiany wchodzące w życie po %s: %d (wszystkie poniżej; tytuły dla %d najnowszych)" % (od, len(zm), min(len(zm), MAKS_ZMIAN)))
        z_tytulem = {z["id"] for z in zm[-MAKS_ZMIAN:]}
        for z in zm:
            tytul = ""
            if z["id"] in z_tytulem:
                try:
                    tytul = pobierz(API + z["id"]).get("title", "").strip()
                except BladApi:
                    tytul = "(tytuł niedostępny)"
            kiedy = "wejdzie w życie" if z["date"] > dzis else "obowiązuje od"
            linie.append("  %s %s | %s%s" % (kiedy, z["date"], czytelny(z["id"]), " | " + tytul[:160] if tytul else ""))
        linie.append("Treść zmiany: python scripts/akty_eli.py zmiana \"<Dz.U. zmiany>\" --szukaj \"art. ...\"")
    linie.append(ZRODLO + " Odczyt: %s." % dzis)
    return "\n".join(linie)


def akapity_html(h):
    t = re.sub(r"(?is)<(script|style)[^>]*>.*?</\1>", " ", h)
    t = re.sub(r"(?i)<br\s*/?>|</(p|div|li|tr|h\d)>", "\n", t)
    t = html.unescape(re.sub(r"<[^>]+>", " ", t))
    return [re.sub(r"\s+", " ", a).strip() for a in t.split("\n") if a.strip()]


def zmiana(adres, szukaj):
    id_ = eli(adres)
    meta = pobierz(API + id_)
    naglowek = "%s (%s)" % (meta.get("title", "").strip(), czytelny(id_))
    if not meta.get("textHTML"):
        return naglowek + "\nSejm udostępnia ten akt tylko jako PDF: https://%s/eli/acts/%s/text.pdf . Treść zmiany oznacz [WYMAGA WERYFIKACJI] z tym adresem.\n%s" % (HOST, id_, ZRODLO)
    akap = akapity_html(pobierz(API + id_ + "/text.html", True))
    traf = [a[:1200] + (" [skrócono]" if len(a) > 1200 else "") for a in akap if szukaj.lower() in a.lower()]
    return naglowek + "\n" + ("\n\n".join(traf) if traf else "(brak akapitów ze zwrotem: %s)" % szukaj) + "\n" + ZRODLO


def _argumenty(argv):
    o, reszta, i = {}, [], 0
    while i < len(argv):
        if argv[i].startswith("--"):
            k = argv[i][2:]
            if i + 1 < len(argv) and not argv[i + 1].startswith("--"):
                o[k] = argv[i + 1]
                i += 1
            else:
                o[k] = True
        else:
            reszta.append(argv[i])
        i += 1
    for k, v in o.items():
        if v is True and k != "selftest":
            raise ValueError("Brak wartości dla --%s." % k)
    return o, reszta


def selftest():
    global pobierz
    assert eli("Dz.U. 2026 poz. 795") == "DU/2026/795"
    assert eli("Dz. U. z 2025 r. poz. 1071") == "DU/2025/1071"
    assert eli("du/2024/0928") == "DU/2024/928"
    assert eli("Dz.U. 1964 nr 16 poz. 93") == "DU/1964/93"
    for zle in ("KC", "Dz.U. poz. 5", ""):
        try:
            eli(zle)
            raise AssertionError("brak błędu dla %r" % zle)
        except ValueError:
            pass
    z = [{"id": "DU/2025/769", "date": "2025-07-13"}, {"id": "DU/2026/507", "date": "2028-11-01"},
         {"id": "DU/2026/184", "date": "2026-05-19"}, {"id": "DU/1982/147", "date": "1983-01-01"}, {"id": "DU/2026/9"}]
    assert [x["id"] for x in wybierz_zmiany(z, "2026-01-01")] == ["DU/2026/184", "DU/2026/507"]
    assert _dozwolony(API + "DU/2026/795") and not _dozwolony("http://api.sejm.gov.pl/eli") and not _dozwolony("https://zly.example/")
    try:
        _TylkoSejm().redirect_request(None, None, 302, "", {}, "https://zly.example/x")
        raise AssertionError("przekierowanie poza Sejm przepuszczone")
    except BladApi:
        pass
    for argv in (["sprawdz", "Dz.U. 2026 poz. 1", "--od"], ["zmiana", "x", "--szukaj"]):
        try:
            _argumenty(argv)
            raise AssertionError("brak błędu dla %s" % argv)
        except ValueError:
            pass
    assert akapity_html("<p>Art. 1. W ustawie <b>z dnia</b></p><p>2) art. 498 otrzymuje</p>") == ["Art. 1. W ustawie z dnia", "2) art. 498 otrzymuje"]
    # obwieszczenie -> akt bazowy, zmiany po dacie ogłoszenia, zmiana przyszła oznaczona (odpowiedzi z atrapy)
    dane = {
        "DU/2025/1071": {"type": "Obwieszczenie", "announcementDate": "2025-07-25", "legalStatusDate": "2025-07-20", "title": "Obwieszczenie", "references": {"Tekst jednolity dla aktu": [{"id": "DU/1964/93"}]}},
        "DU/1964/93": {"title": "Kodeks cywilny", "status": "akt posiada tekst jednolity", "inForce": "IN_FORCE",
                       "references": {"Inf. o tekście jednolitym": [{"id": "DU/2025/1071"}, {"id": "DU/2026/795"}],
                                      "Akty zmieniające": [{"id": "DU/2025/1172", "date": "2025-11-27"}, {"id": "DU/2026/507", "date": "2028-11-01"}, {"id": "DU/2025/769", "date": "2025-07-13"}, {"id": "DU/2025/900", "date": "2025-07-22"}]}},
        "DU/2025/1172": {"title": "Ustawa A"}, "DU/2026/507": {"title": "Ustawa B"}, "DU/2025/900": {"title": "Ustawa C"},
    }
    oryginal = pobierz
    pobierz = lambda url, jako_tekst=False: dane[url.replace(API, "")]
    try:
        w = sprawdz("Dz.U. 2025 poz. 1071", dzis="2026-11-07")
        assert "Dz.U. 2026 poz. 795 (nowszy niż podany Dz.U. 2025 poz. 1071)" in w, w
        assert "obowiązuje od 2025-11-27 | Dz.U. 2025 poz. 1172 | Ustawa A" in w, w
        assert "wejdzie w życie 2028-11-01 | Dz.U. 2026 poz. 507 | Ustawa B" in w, w
        assert "obowiązuje od 2025-07-22 | Dz.U. 2025 poz. 900" in w, w  # po dacie stanu, przed ogłoszeniem
        assert "2025-07-13" not in w, w
        for zla in ("2026-99-99", "20260519", "2026-W01-1"):
            try:
                sprawdz("Dz.U. 2025 poz. 1071", od=zla)
                raise AssertionError("brak błędu dla daty %s" % zla)
            except ValueError:
                pass
        bez_stanu = dict(dane["DU/2025/1071"])
        del bez_stanu["legalStatusDate"]
        dane["DU/2024/1"] = bez_stanu
        try:
            sprawdz("Dz.U. 2024 poz. 1")
            raise AssertionError("brak błędu bez daty stanu")
        except ValueError:
            pass
        globals()["MAKS_ZMIAN"] = 1
        w = sprawdz("Dz.U. 2025 poz. 1071", dzis="2026-11-07")
        assert "Dz.U. 2025 poz. 1172" in w and "Ustawa A" not in w and "Ustawa B" in w, w  # wszystkie pozycje, tytuł tylko najnowszej
        globals()["MAKS_ZMIAN"] = 8
        try:
            sprawdz("Dz.U. 1964 poz. 93")
            raise AssertionError("brak błędu bez --od")
        except ValueError:
            pass
    finally:
        pobierz = oryginal
    oryginal_http = globals()["_http"]
    try:
        for wyjatek, oczekiwane in ((urllib.error.HTTPError(API, 429, "x", {}, None), "429"),
                                    (urllib.error.HTTPError(API, 404, "x", {}, None), "Nie ma takiego aktu"),
                                    (urllib.error.URLError("offline"), "Brak połączenia")):
            def _rzuc(url, jako_tekst, w=wyjatek):
                raise w
            globals()["_http"] = _rzuc
            _ostatnie[0] = 0.0
            try:
                pobierz(API + "DU/2026/1")
                raise AssertionError("brak błędu")
            except BladApi as e:
                assert oczekiwane in str(e), str(e)
    finally:
        globals()["_http"] = oryginal_http
    print("selftest OK")


def main(argv):
    try:
        o, r = _argumenty(argv)
    except ValueError as e:
        print(str(e))
        return 2
    if o.get("selftest"):
        global PAUZA
        PAUZA = 0.0
        selftest()
        return 0
    kom = r[0] if r else ""
    try:
        if kom == "sprawdz" and len(r) > 1:
            print(sprawdz(" ".join(r[1:]), o.get("od")))
            return 0
        if kom == "zmiana" and len(r) > 1 and o.get("szukaj"):
            print(zmiana(" ".join(r[1:]), o["szukaj"]))
            return 0
    except (BladApi, ValueError) as e:
        print(str(e))
        return 2
    print(__doc__)
    return 1


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main(sys.argv[1:]))
