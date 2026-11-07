#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Orzeczenia Sądu Najwyższego z oficjalnego API SN, na żywo, w trakcie pracy skilla.

Źródło: https://repozytorium2.sn.pl (warunki: https://www.sn.pl/pl/web-api).
Warunki SN: bez konta; limit zapytań (HTTP 429); wskazanie źródła (Sąd Najwyższy,
repozytorium2.sn.pl); oznaczenie przetworzenia (skrót, opis, analiza); nie sugerować aprobaty SN.
Skrypt robi jedno zapytanie naraz z pauzą, przedstawia się w nagłówku User-Agent,
łączy się tylko przez HTTPS z repozytorium2.sn.pl (także po przekierowaniu) i niczego nie zapisuje.
Tylko biblioteka standardowa Pythona 3.8+.

Użycie:
    python scripts/orzeczenia_sn.py sprawdz "III CZP 84/22" ["I CSK 3442/24" ...]
        czy sygnatura jest w API SN: data, forma, id (kilka orzeczeń = kilka wpisów)
    python scripts/orzeczenia_sn.py szukaj --tresc "zadatek" [--od 2020-01-01] [--do 2026-12-31] [--limit 10]
        lista orzeczeń SN z tym słowem w treści (kolejność według API; zawęź daty, gdy chcesz nowsze)
    python scripts/orzeczenia_sn.py tekst "III CZP 84/22" [--id ID] [--fragment "słowo"] [--znaki 1500]
        pełny tekst z metryką źródła; z --fragment tylko akapity z tym słowem
        (dłuższy akapit skrócony do okna wokół słowa, skrót oznaczony [skrócono])
    python scripts/orzeczenia_sn.py --selftest
        test bez sieci (składanie tekstu z HTML SN, parametry, stronicowanie, błędy)

Na Windows `python` albo `py`, na Linux i macOS także `python3`.
Bez dostępu do sieci skrypt kończy się komunikatem; skill mówi wtedy o stanie z rejestru źródeł.
"""
import html
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

HOST = "repozytorium2.sn.pl"
API = "https://%s/api/v1/orzeczenia" % HOST
UA = "AiXperts-skill/1.0 (+https://skille.aixperts.pl)"
ZRODLO = ("Źródło: Sąd Najwyższy, https://repozytorium2.sn.pl (dane zanonimizowane). "
          "Przetworzono: tekst wyodrębniony automatycznie z pliku HTML SN, układ graficzny pominięty, "
          "indeksy górne zapisane jako ^ (np. art. 398^3); fragmenty wybrane według słowa, skróty oznaczone [skrócono].")
PAUZA = 1.0
_ostatnie = [0.0]


class BladApi(Exception):
    pass


def _dozwolony(url):
    u = urllib.parse.urlsplit(url)
    return u.scheme == "https" and u.hostname == HOST


class _TylkoSN(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if not _dozwolony(newurl):
            raise BladApi("API SN przekierowało poza https://%s; przerwano." % HOST)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


_otwieracz = urllib.request.build_opener(_TylkoSN())


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
        if e.code == 429:
            raise BladApi("API SN: limit zapytań (429). Przerwij i spróbuj za kilka minut.")
        raise BladApi("API SN odpowiedziało %s." % e.code)
    except (urllib.error.URLError, OSError) as e:
        raise BladApi("Brak połączenia z API SN (%s). Użyj stanu z rejestru źródeł skilla i podaj datę sprawdzenia." % getattr(e, "reason", e))
    if jako_tekst:
        return dane
    try:
        return json.loads(dane)
    except ValueError:
        raise BladApi("API SN zwróciło odpowiedź, której nie da się odczytać.")


def zapytanie(sygnatura=None, tresc=None, od=None, do=None, limit=20, strona=1):
    if not (sygnatura or tresc or od or do):
        raise ValueError("Podaj sygnaturę albo --tresc.")
    for v in (od, do):
        if v and not re.match(r"^\d{4}-\d{2}-\d{2}$", str(v)):
            raise ValueError("Daty w formacie RRRR-MM-DD.")
    try:
        limit = int(limit)
    except (TypeError, ValueError):
        raise ValueError("--limit musi być liczbą od 1 do 200.")
    if not 1 <= limit <= 200:
        raise ValueError("--limit od 1 do 200.")
    q = {"strona": str(strona), "rozmiar_strony": str(limit)}
    for k, v in (("sygnatura", sygnatura), ("tresc", tresc), ("data_wydania_od", od), ("data_wydania_do", do)):
        if v:
            q[k] = v
    return urllib.parse.urlencode(q)


def _norm(s):
    return re.sub(r"\s+", " ", str(s or "")).strip().upper()


def znajdz(sygnatura):
    wynik, strona = [], 1
    while True:
        j = pobierz("%s?%s" % (API, zapytanie(sygnatura=sygnatura, limit=200, strona=strona)))
        wynik += [x for x in j.get("strona_wyniki") or [] if _norm(x.get("sygnatura_sprawy")) == _norm(sygnatura)]
        if strona >= (j.get("liczba_stron") or 1):
            return wynik
        strona += 1


_LINIA = re.compile(r'<div class="txt" style="[^"]*?left:(\d+)px; top:(\d+)px;[^"]*">([\s\S]*?)</div>')
_SUP = re.compile(r'<span[^>]*vertical-align:super[^>]*>([\s\S]*?)</span>')


def tekst_z_html(h, sygnatura=""):
    """HTML SN to strony z liniami pozycjonowanymi bezwzględnie; składamy je w akapity."""
    akapity, poprzedni = [], None
    for strona in h.split("<div class='pg'")[1:]:
        linie = {}
        for m in _LINIA.finditer(strona):
            top = int(m.group(2))
            t = _SUP.sub(lambda x: "^" + x.group(1).strip() + (" " if x.group(1).endswith(" ") else ""), m.group(3))
            t = html.unescape(re.sub(r"<[^>]+>", "", t))
            if not t.strip():
                continue
            klucz = next((k for k in linie if abs(k - top) <= 3), top)
            linie.setdefault(klucz, []).append((int(m.group(1)), t))
        pos = []
        for top in sorted(linie):
            cz = sorted(linie[top])
            pos.append({"top": top, "left": min(c[0] for c in cz), "tekst": re.sub(r"\s+", " ", "".join(c[1] for c in cz)).strip()})
        pos = [l for i, l in enumerate(pos)
               if not (i == 0 and l["top"] < 60 and (re.match(r"^\d{1,3}$", l["tekst"]) or (sygnatura and l["tekst"].startswith(sygnatura))))
               and not (i == len(pos) - 1 and re.match(r"^\d{1,3}$", l["tekst"]))]
        if not pos:
            continue
        lewa = min(l["left"] for l in pos)
        pierwsza = True
        for l in pos:
            nowy = poprzedni is None or l["left"] > lewa + 15 or (not pierwsza and l["top"] - poprzedni["top"] > 26)
            if nowy:
                akapity.append(l["tekst"])
            else:
                akapity[-1] = akapity[-1] + l["tekst"] if akapity[-1].endswith("-") else akapity[-1] + " " + l["tekst"]
            poprzedni, pierwsza = l, False
    return "\n\n".join(akapity).replace(chr(0x2014), "-").replace(chr(0x2013), "-")


def okno(akapit, slowo, znaki):
    """Akapit z dopasowaniem; dłuższy niż `znaki` skrócony do okna wokół pierwszego dopasowania."""
    if len(akapit) <= znaki:
        return akapit
    i = akapit.lower().find(slowo.lower())
    start = max(0, i - znaki // 2)
    koniec = min(len(akapit), start + znaki)
    start = max(0, koniec - znaki)
    return ("[skrócono] " if start > 0 else "") + akapit[start:koniec] + (" [skrócono]" if koniec < len(akapit) else "")


def metryka(d):
    return "\n".join([
        "%s z %s, %s" % (d.get("forma_orzeczenia"), d.get("data_wydania"), d.get("sygnatura_sprawy")),
        "Izba: %s" % (", ".join(d.get("izby_sn") or []) or d.get("jednostka_obslugujaca_sprawe") or "brak w danych SN"),
        ZRODLO,
        "Plik źródłowy: %s/%s/plik/html" % (API, d.get("id")),
        "Odczyt: %s" % time.strftime("%Y-%m-%d"),
    ])


def tekst(sygnatura, id_=None, fragment=None, znaki=1500):
    if not id_:
        w = znajdz(sygnatura)
        if not w:
            return "Brak %s w API SN (sprawdź pisownię sygnatury; API obejmuje tylko Sąd Najwyższy)." % sygnatura
        if len(w) > 1:
            return "Sygnatura %s ma %d orzeczenia; wybierz --id:\n%s" % (sygnatura, len(w), "\n".join(
                "  %s | %s | id %s" % (x.get("data_wydania"), x.get("forma_orzeczenia"), x.get("id")) for x in w))
        id_ = w[0]["id"]
    q = urllib.parse.quote(str(id_), safe="")
    d = pobierz("%s/%s" % (API, q))
    t = tekst_z_html(pobierz("%s/%s/plik/html" % (API, q), True), d.get("sygnatura_sprawy", ""))
    if not t.strip():
        return metryka(d) + "\n\nPlik SN nie ma treści; tezy nie da się porównać."
    if fragment:
        akap = [a for a in t.split("\n\n") if fragment.lower() in a.lower()]
        t = "\n\n".join(okno(a, fragment, znaki) for a in akap) or "(brak akapitów ze słowem: %s)" % fragment
    return metryka(d) + "\n\n" + t


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
    h = ("<div class='pg'><div class=\"txt\" style=\"left:100px; top:40px;\">III CZP 1/99</div>"
         "<div class=\"txt\" style=\"left:100px; top:100px;\">UCHWA&#321;A</div>"
         "<div class=\"txt\" style=\"left:80px; top:160px;\">art. 398<span style=\"vertical-align:super\">3</span> KPC i dalszy</div>"
         "<div class=\"txt\" style=\"left:80px; top:180px;\">ci&#261;g zdania.</div>"
         "<div class=\"txt\" style=\"left:300px; top:900px;\">2</div></div>")
    t = tekst_z_html(h, "III CZP 1/99")
    assert "III CZP 1/99" not in t and t.startswith("UCHWAŁA"), t
    assert "art. 398^3 KPC i dalszy ciąg zdania." in t, t
    assert "\n\n2" not in t, t
    q = zapytanie(sygnatura="III CZP 84/22", limit=5)
    assert "sygnatura=III+CZP+84%2F22" in q and "rozmiar_strony=5" in q, q
    for zle in ({}, {"tresc": "x", "od": "2020/01/01"}, {"tresc": "x", "limit": 0}, {"tresc": "x", "limit": "abc"}):
        try:
            zapytanie(**zle)
            raise AssertionError("brak błędu dla %s" % zle)
        except ValueError:
            pass
    for argv in (["szukaj", "--tresc", "x", "--od"], ["tekst", "--id", "a", "--fragment"]):
        try:
            _argumenty(argv)
            raise AssertionError("brak błędu dla %s" % argv)
        except ValueError:
            pass
    # okno wokół słowa z oznaczeniem skrótu
    a = "x" * 3000 + " zadatek " + "y" * 3000
    w = okno(a, "zadatek", 200)
    assert "zadatek" in w and w.startswith("[skrócono] ") and w.endswith(" [skrócono]"), w[:80]
    assert okno("krótki akapit z zadatkiem", "zadatek", 200) == "krótki akapit z zadatkiem"
    # tylko https://repozytorium2.sn.pl
    assert _dozwolony(API + "?x=1") and not _dozwolony("http://repozytorium2.sn.pl/a") and not _dozwolony("https://zly.example/a")
    try:
        _TylkoSN().redirect_request(None, None, 302, "", {}, "https://zly.example/x")
        raise AssertionError("przekierowanie poza SN przepuszczone")
    except BladApi:
        pass
    # stronicowanie i wiele orzeczeń z tą samą sygnaturą (odpowiedzi API z atrapy)
    oryginal = pobierz
    strony = {1: {"liczba_stron": 2, "strona_wyniki": [{"sygnatura_sprawy": "I CSK 1/20", "id": "a"}, {"sygnatura_sprawy": "I CSK 1/200", "id": "z"}]},
              2: {"liczba_stron": 2, "strona_wyniki": [{"sygnatura_sprawy": "i csk  1/20", "id": "b"}]}}
    pobierz = lambda url, jako_tekst=False: strony[int(urllib.parse.parse_qs(urllib.parse.urlsplit(url).query)["strona"][0])]
    try:
        assert [x["id"] for x in znajdz("I CSK 1/20")] == ["a", "b"]
        assert "ma 2 orzeczenia" in tekst("I CSK 1/20")
    finally:
        pobierz = oryginal
    # 429 i brak sieci jako czytelne komunikaty
    oryginal_http = globals()["_http"]
    try:
        for wyjatek, oczekiwane in ((urllib.error.HTTPError(API, 429, "x", {}, None), "429"),
                                    (urllib.error.URLError("offline"), "Brak połączenia")):
            def _rzuc(url, jako_tekst, w=wyjatek):
                raise w
            globals()["_http"] = _rzuc
            _ostatnie[0] = 0.0
            try:
                pobierz(API + "?x=1")
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
            for s in r[1:]:
                w = znajdz(s)
                print("%s | %s" % (s, "; ".join("%s %s id %s" % (x.get("data_wydania"), x.get("forma_orzeczenia"), x.get("id")) for x in w) if w else "BRAK w API SN"))
            print("Źródło: Sąd Najwyższy, repozytorium2.sn.pl")
            return 0
        if kom == "szukaj" and o.get("tresc"):
            j = pobierz("%s?%s" % (API, zapytanie(tresc=o["tresc"], od=o.get("od"), do=o.get("do"), limit=o.get("limit", 10))))
            lista = j.get("strona_wyniki") or []
            print("Znaleziono: %s (pokazuję %d). Źródło: Sąd Najwyższy, repozytorium2.sn.pl" % (j.get("liczba_wynikow", len(lista)), len(lista)))
            for x in lista:
                print("%s | %s | %s | id %s" % (x.get("data_wydania"), x.get("sygnatura_sprawy"), x.get("forma_orzeczenia"), x.get("id")))
            return 0
        if kom == "tekst" and (len(r) > 1 or o.get("id")):
            znaki = o.get("znaki", "1500")
            if not str(znaki).isdigit() or int(znaki) < 100:
                raise ValueError("--znaki musi być liczbą co najmniej 100.")
            print(tekst(" ".join(r[1:]), o.get("id"), o.get("fragment"), int(znaki)))
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
