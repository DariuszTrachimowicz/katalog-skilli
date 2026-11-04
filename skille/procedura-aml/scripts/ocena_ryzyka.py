#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Punktacja oceny ryzyka klienta AML ze sladem obliczen.

Uzycie:
    python ocena_ryzyka.py plik.json          # ocena klienta wg modelu z pliku
    python ocena_ryzyka.py --selftest         # wbudowany test poprawnosci

Wejscie (JSON, wzor: assets/przyklady/ocena-klienta.json):
    model:
      skala: {min, max, opis: {"1": "...", ...}}
      czynniki: [{id, nazwa, grupa, waga, uzasadnienie_wagi}]  # wagi sumuja sie do 100
      grupy_nieuwzglednione: {"geografia": "dlaczego nieistotna..."}
                                   # kazda z grup (klient, geografia, produkty,
                                   # kanal) bez czynnika wymaga uzasadnienia
      progi:   [{poziom, od, do}]  # rosnaco, bez dziur; kazdy przedzial liczy
                                   # sie od 'od' wlacznie do 'do' wylacznie,
                                   # ostatni obejmuje tez gorna granice
      uzasadnienie_progow: "..."   # dlaczego granice leza wlasnie tam
    klient:
      oznaczenie: "klient-K-014"   # NEUTRALNE, bez danych osobowych
      oceny: [{czynnik, ocena, uzasadnienie}]
      flagi_krytyczne: ["..."]     # np. zgodnosc z wpisem na liscie sankcyjnej;
                                   # obsluga poza punktacja

Zasady (spina je SKILL.md):
    - kazda waga i kazda ocena wymaga niepustego uzasadnienia (skrypt pilnuje
      tylko minimalnej dlugosci; tresc uzasadnienia ocenia czlowiek);
    - wynik = suma(waga_i/100 * ocena_i), slad wkladu dla kazdego czynnika;
    - flaga krytyczna NIE zmienia punktow: wynik jest liczony, ale raport
      oznacza ocene jako ZABLOKOWANA do czasu obslugi flagi wg procedury;
    - zadne pole nie moze zawierac dlugiego ciagu cyfr (PESEL, numer rachunku);
      to filtr ostatniej szansy, usuniecie danych osobowych nalezy do
      uzytkownika.
Zero zaleznosci zewnetrznych. Wynik na stdout (raport tekstowy + JSON).
Raport jest PROJEKTEM oceny do zatwierdzenia wg procedury instytucji.
"""

import json
import re
import sys

# 11+ cyfr, takze rozdzielonych spacja, kropka, dywizem albo twarda spacja:
# lapie PESEL w kazdym typowym zapisie oraz numery rachunkow (26 cyfr).
CIAG_CYFR = re.compile("\\d(?:[ ./,\\-\\u00a0]?\\d){10,}")

# nazwy poziomow nie moga przemycac orzeczen (obejscie zakazu orzekania)
ZAKAZANE_W_POZIOMACH = ("zgodn", "podejrzan", "gwarant", "czyst", "bezpieczn",
                        "legaln", "zatwierdz")

# model musi udokumentowac rozwazenie wszystkich czterech grup czynnikow
GRUPY = ("klient", "geografia", "produkty", "kanal")


def blad(msg):
    print("BLAD: " + msg)
    sys.exit(1)


def sprawdz_pesel(obiekt, sciezka="dane"):
    """Filtr ostatniej szansy: dlugie ciagi cyfr (PESEL, rachunki) w KAZDYM
    polu, takze zapisane jako liczba JSON. Imion i adresow nie rozpozna;
    usuniecie danych osobowych z pliku nalezy do uzytkownika."""
    if isinstance(obiekt, dict):
        for k, v in obiekt.items():
            sprawdz_pesel(k, sciezka + " (nazwa pola)")
            sprawdz_pesel(v, sciezka + "." + str(k))
    elif isinstance(obiekt, list):
        for i, v in enumerate(obiekt):
            sprawdz_pesel(v, sciezka + "[%d]" % i)
    elif isinstance(obiekt, bool) or obiekt is None:
        return
    else:
        tekst = obiekt if isinstance(obiekt, str) else repr(obiekt)
        if CIAG_CYFR.search(tekst):
            blad("pole %s zawiera dlugi ciag cyfr wygladajacy na numer "
                 "PESEL albo numer rachunku. Usun dane osobowe i numery "
                 "z pliku (uzyj neutralnego oznaczenia, np. klient-K-014) "
                 "i uruchom ponownie" % sciezka)


def liczba_ok(x):
    """Skonczona liczba (odrzuca NaN, nieskonczonosci i inne typy)."""
    return (isinstance(x, (int, float)) and not isinstance(x, bool)
            and x == x and abs(x) != float("inf"))


def waliduj(dane):
    if not isinstance(dane, dict):
        blad("plik musi zawierac obiekt JSON z sekcjami 'model' i 'klient'")
    for klucz in ("model", "klient"):
        if not isinstance(dane.get(klucz), dict):
            blad("brak sekcji '%s' (albo nie jest obiektem)" % klucz)
    m, k = dane["model"], dane["klient"]

    skala = m.get("skala")
    if not isinstance(skala, dict):
        blad("model.skala: wymagany obiekt z polami min, max i opis "
             "(wzor: assets/przyklady/ocena-klienta.json)")
    if not isinstance(skala.get("min"), int) or not isinstance(skala.get("max"), int) \
            or skala["min"] >= skala["max"]:
        blad("model.skala wymaga calkowitych min < max")
    opis = skala.get("opis") or {}
    for s in range(skala["min"], skala["max"] + 1):
        if not str(opis.get(str(s), "")).strip():
            blad("model.skala.opis: brak opisu znaczenia stopnia %d "
                 "(skala bez opisow nie roznicuje ocen)" % s)

    czynniki = m.get("czynniki") or []
    if len(czynniki) < 3:
        blad("model wymaga co najmniej 3 czynnikow")
    suma_wag = 0.0
    idy = set()
    for c in czynniki:
        if not isinstance(c, dict):
            blad("model.czynniki: kazdy czynnik musi byc obiektem z polami "
                 "id, nazwa, grupa, waga, uzasadnienie_wagi")
        for pole in ("id", "nazwa", "grupa", "waga", "uzasadnienie_wagi"):
            if pole not in c or (isinstance(c[pole], str) and not c[pole].strip()):
                blad("czynnik %r: brak pola '%s'" % (c.get("id", "?"), pole))
        if c["id"] in idy:
            blad("powtorzone id czynnika: %s" % c["id"])
        idy.add(c["id"])
        if not liczba_ok(c["waga"]) or not c["waga"] > 0:
            blad("czynnik %s: waga musi byc dodatnia liczba" % c["id"])
        if len(str(c["uzasadnienie_wagi"]).strip()) < 15:
            blad("czynnik %s: uzasadnienie wagi za krotkie (min 15 znakow, "
                 "jedno konkretne zdanie)" % c["id"])
        suma_wag += float(c["waga"])
    if not (abs(suma_wag - 100.0) <= 0.01):
        blad("wagi sumuja sie do %.2f, wymagane 100" % suma_wag)

    pokryte = set()
    for c in czynniki:
        pokryte.update(t for t in re.split(
            u"[^0-9a-ząćęłńóśźż]+",
            str(c.get("grupa", "")).lower()) if t)
    pominiete = m.get("grupy_nieuwzglednione", {})
    if not isinstance(pominiete, dict):
        blad("model.grupy_nieuwzglednione: wymagany obiekt w formie "
             "{\"grupa\": \"uzasadnienie\"}, nie lista ani tekst")
    for grupa in GRUPY:
        if grupa in pokryte:
            continue
        if len(str(pominiete.get(grupa, "")).strip()) < 15:
            blad("model nie dokumentuje rozwazenia grupy '%s': dodaj czynnik "
                 "z ta grupa albo wpisz w model.grupy_nieuwzglednione.%s "
                 "uzasadnienie (min 15 znakow), dlaczego grupa jest "
                 "nieistotna dla tej instytucji" % (grupa, grupa))

    progi = m.get("progi") or []
    if len(progi) < 2:
        blad("model.progi: wymagane co najmniej 2 poziomy")
    for p in progi:
        if not isinstance(p, dict) or not liczba_ok(p.get("od")) \
                or not liczba_ok(p.get("do")):
            blad("model.progi: kazdy poziom wymaga pol 'poziom', 'od' i 'do' "
                 "z liczbami (wzor: assets/przyklady/ocena-klienta.json)")
    posort = sorted(progi, key=lambda p: p["od"])
    if abs(posort[0]["od"] - skala["min"]) > 1e-9 or abs(posort[-1]["do"] - skala["max"]) > 1e-9:
        blad("progi musza pokrywac caly zakres skali od %s do %s"
             % (skala["min"], skala["max"]))
    for a, b in zip(posort, posort[1:]):
        if abs(a["do"] - b["od"]) > 1e-9:
            blad("progi maja dziure albo zachodza na siebie: poziom '%s' konczy "
                 "sie na %s, a poziom '%s' zaczyna od %s. Popraw granice tak, "
                 "zeby kolejny poziom zaczynal sie tam, gdzie poprzedni konczy"
                 % (a["poziom"], a["do"], b["poziom"], b["od"]))
    for p in posort:
        nazwa = str(p.get("poziom", "")).strip()
        if not nazwa or len(nazwa) > 30:
            blad("model.progi: kazdy poziom wymaga krotkiej, neutralnej nazwy "
                 "(do 30 znakow)")
        nl = nazwa.lower()
        for zak in ZAKAZANE_W_POZIOMACH:
            if zak in nl:
                blad("nazwa poziomu '%s' brzmi jak orzeczenie, a poziom ryzyka "
                     "to nie werdykt. Uzyj neutralnej nazwy w rodzaju "
                     "niskie / standardowe / wysokie" % nazwa)

    if len(str(m.get("uzasadnienie_progow", "")).strip()) < 15:
        blad("model.uzasadnienie_progow: brak albo za krotkie (min 15 znakow). "
             "Progi bez uzasadnienia wygladaja na dobrane pod wynik; napisz, "
             "dlaczego granice poziomow leza wlasnie tam")

    if not str(k.get("oznaczenie", "")).strip():
        blad("klient.oznaczenie: wymagane neutralne oznaczenie (np. klient-K-014)")
    for o in (k.get("oceny") or []):
        if not isinstance(o, dict):
            blad("klient.oceny: kazda ocena musi byc obiektem z polami "
                 "czynnik, ocena, uzasadnienie")
    oceny = {o.get("czynnik"): o for o in (k.get("oceny") or [])}
    braki, poza_modelem = [], []
    for c in czynniki:
        o = oceny.get(c["id"])
        if o is None:
            braki.append(c["id"])
            continue
        w = o.get("ocena")
        if not isinstance(w, int) or w < skala["min"] or w > skala["max"]:
            blad("ocena czynnika %s poza skala %d-%d"
                 % (c["id"], skala["min"], skala["max"]))
        if len(str(o.get("uzasadnienie", "")).strip()) < 15:
            blad("czynnik %s: uzasadnienie oceny za krotkie (min 15 znakow). "
                 "Napisz jedno konkretne zdanie o faktach, ktore stoja za ta "
                 "ocena; ocena bez uzasadnienia wyglada na dobrana pod wynik"
                 % c["id"])
    for cid in oceny:
        if cid not in idy:
            poza_modelem.append(cid)
    if poza_modelem:
        blad("oceny czynnikow spoza modelu: %s" % ", ".join(map(str, poza_modelem)))
    if braki:
        blad("brak ocen czynnikow: %s. Uzupelnij oceny na podstawie faktow "
             "o kliencie i uruchom ponownie" % ", ".join(braki))
    return m, k, posort


def licz(dane):
    sprawdz_pesel(dane)
    m, k, progi = waliduj(dane)
    slad, wynik = [], 0.0
    oceny = {o["czynnik"]: o for o in k["oceny"]}
    for c in m["czynniki"]:
        o = oceny[c["id"]]
        wklad = float(c["waga"]) / 100.0 * o["ocena"]
        wynik += wklad
        slad.append({
            "czynnik": c["id"], "nazwa": c["nazwa"], "grupa": c["grupa"],
            "waga_procent": c["waga"], "ocena": o["ocena"],
            "wklad": round(wklad, 4), "uzasadnienie": o["uzasadnienie"],
        })
    wynik = round(wynik, 4)
    # przedzialy licza sie od 'od' wlacznie do 'do' wylacznie; ostatni poziom
    # obejmuje tez gorna granice. Wynik rowny wspolnej granicy trafia wiec
    # ZAWSZE do wyzszego poziomu (na granicy nie zaokraglamy ryzyka w dol).
    poziom = progi[-1]["poziom"]
    for p in progi[:-1]:
        if p["od"] - 1e-9 <= wynik < p["do"] - 1e-9:
            poziom = p["poziom"]
            break
    flagi = [str(f) for f in (k.get("flagi_krytyczne") or []) if str(f).strip()]
    return {
        "oznaczenie_klienta": k["oznaczenie"],
        "wynik": wynik,
        "poziom_wg_progow": poziom,
        "zablokowana_przez_flagi": bool(flagi),
        "flagi_krytyczne": flagi,
        "slad": slad,
        "zastrzezenie": ("Poziom wskazuje zestaw srodkow do rozwazenia wg "
                          "procedury instytucji; decyzje podejmuje osoba "
                          "odpowiedzialna za AML."),
    }


def raport(w):
    print("=" * 62)
    print("PROJEKT OCENY RYZYKA KLIENTA: %s" % w["oznaczenie_klienta"])
    print("  (do zatwierdzenia przez osobe odpowiedzialna za AML,")
    print("   wg procedury instytucji; data i podpis w dokumencie oceny)")
    print("=" * 62)
    for s in w["slad"]:
        print("  %-28s waga %5.1f%%  ocena %d  wklad %.3f"
              % (s["nazwa"][:28], s["waga_procent"], s["ocena"], s["wklad"]))
    print("-" * 62)
    print("  WYNIK: %.3f  ->  poziom: %s" % (w["wynik"], w["poziom_wg_progow"]))
    if w["zablokowana_przez_flagi"]:
        print("  UWAGA: OCENA ZABLOKOWANA przez flagi krytyczne:")
        for f in w["flagi_krytyczne"]:
            print("    - %s" % f)
        print("  Obsluga flagi wg procedury PRZED dalszymi krokami; punktacja")
        print("  nie zastepuje tej obslugi.")
    print("  %s" % w["zastrzezenie"])
    print("=" * 62)
    print(json.dumps(w, ensure_ascii=False, indent=2))


SELFTEST = {
    "model": {
        "skala": {"min": 1, "max": 4, "opis": {
            "1": "brak istotnych okolicznosci podnoszacych ryzyko",
            "2": "pojedyncze okolicznosci, typowe dla profilu instytucji",
            "3": "wyrazne okolicznosci wymagajace uwagi",
            "4": "nasilone okolicznosci, rozwazyc srodki wzmozone"}},
        "czynniki": [
            {"id": "gotowka", "nazwa": "Udzial gotowki", "grupa": "produkty",
             "waga": 40, "uzasadnienie_wagi": "Instytucja obsluguje branze gotowkowe, to dominujace ryzyko z oceny instytucji."},
            {"id": "struktura", "nazwa": "Przejrzystosc struktury", "grupa": "klient",
             "waga": 35, "uzasadnienie_wagi": "Klienci ze zlozona struktura utrudniaja ustalenie beneficjenta rzeczywistego."},
            {"id": "kanal", "nazwa": "Kanal nawiazania relacji", "grupa": "kanal",
             "waga": 25, "uzasadnienie_wagi": "Czesc relacji nawiazywana w pelni zdalnie, bez kontaktu osobistego."},
        ],
        "progi": [
            {"poziom": "niskie", "od": 1, "do": 2.0},
            {"poziom": "standardowe", "od": 2.0, "do": 3.0},
            {"poziom": "wysokie", "od": 3.0, "do": 4},
        ],
        "uzasadnienie_progow": "Progi przyjete tak, by poziom wysoki obejmowal gorna cwierc skali; testowe wartosci selftestu.",
        "grupy_nieuwzglednione": {
            "geografia": "Testowy model selftestu: klienci krajowi, grupa rozwazona i uznana za nieistotna."},
    },
    "klient": {
        "oznaczenie": "klient-TEST-001",
        "oceny": [
            {"czynnik": "gotowka", "ocena": 3, "uzasadnienie": "Klient deklaruje regularne wplaty gotowkowe blisko progow."},
            {"czynnik": "struktura", "ocena": 2, "uzasadnienie": "Prosta sp. z o.o. z jednym wspolnikiem ujawnionym w CRBR."},
            {"czynnik": "kanal", "ocena": 4, "uzasadnienie": "Relacja w pelni zdalna, dokumenty wylacznie skanem."},
        ],
        "flagi_krytyczne": [],
    },
}


def selftest():
    print("Uwaga: ponizsze komunikaty BLAD to celowe testy negatywne;")
    print("liczy sie koncowa linia SELFTEST OK.")
    w = licz(json.loads(json.dumps(SELFTEST)))
    oczekiwany = round(0.40 * 3 + 0.35 * 2 + 0.25 * 4, 4)  # = 2.9
    assert w["wynik"] == oczekiwany, (w["wynik"], oczekiwany)
    assert w["poziom_wg_progow"] == "standardowe", w["poziom_wg_progow"]
    zle = json.loads(json.dumps(SELFTEST))
    zle["klient"]["oceny"][0]["uzasadnienie"] = "krotko"
    try:
        licz(zle)
    except SystemExit:
        pass
    else:
        raise AssertionError("walidacja uzasadnien nie zadziala")
    granica = json.loads(json.dumps(SELFTEST))
    granica["klient"]["oceny"] = [
        {"czynnik": "gotowka", "ocena": 3, "uzasadnienie": "Test graniczny: wynik dokladnie na granicy progow."},
        {"czynnik": "struktura", "ocena": 3, "uzasadnienie": "Test graniczny: wynik dokladnie na granicy progow."},
        {"czynnik": "kanal", "ocena": 3, "uzasadnienie": "Test graniczny: wynik dokladnie na granicy progow."},
    ]
    wg = licz(granica)
    assert wg["wynik"] == 3.0 and wg["poziom_wg_progow"] == "wysokie", \
        (wg["wynik"], wg["poziom_wg_progow"])
    for wariant in ("Jan Kowalski 82041512857", "820415 128 57", "82-04-15-12857"):
        pesel = json.loads(json.dumps(SELFTEST))
        pesel["klient"]["oznaczenie"] = wariant
        try:
            licz(pesel)
        except SystemExit:
            pass
        else:
            raise AssertionError("filtr ciagow cyfr nie zadzialal: %r" % wariant)
    liczba = json.loads(json.dumps(SELFTEST))
    liczba["klient"]["flagi_krytyczne"] = [82041512857]
    try:
        licz(liczba)
    except SystemExit:
        pass
    else:
        raise AssertionError("filtr nie zadzialal na liczbie JSON")
    zly_poziom = json.loads(json.dumps(SELFTEST))
    zly_poziom["model"]["progi"][0]["poziom"] = "zgodne z ustawa"
    try:
        licz(zly_poziom)
    except SystemExit:
        pass
    else:
        raise AssertionError("walidacja nazwy poziomu nie zadzialala")
    klucz = json.loads(json.dumps(SELFTEST))
    klucz["klient"]["82041512857"] = "notatka"
    try:
        licz(klucz)
    except SystemExit:
        pass
    else:
        raise AssertionError("filtr nie sprawdza nazw pol")
    nan = json.loads(json.dumps(SELFTEST))
    nan["model"]["czynniki"][0]["waga"] = float("nan")
    try:
        licz(nan)
    except SystemExit:
        pass
    else:
        raise AssertionError("walidacja wag przepuscila NaN")
    bez_grupy = json.loads(json.dumps(SELFTEST))
    del bez_grupy["model"]["grupy_nieuwzglednione"]
    try:
        licz(bez_grupy)
    except SystemExit:
        pass
    else:
        raise AssertionError("walidacja pokrycia grup nie zadzialala")
    for podstep in ("produkty-antygeografia", "produkty geografia2",
                    "produkty geografiaz2"):
        podszyta = json.loads(json.dumps(SELFTEST))
        del podszyta["model"]["grupy_nieuwzglednione"]
        podszyta["model"]["czynniki"][0]["grupa"] = podstep
        try:
            licz(podszyta)
        except SystemExit:
            pass
        else:
            raise AssertionError(
                "pokrycie grup dalo sie obejsc nazwa: %r" % podstep)
    zly_typ = json.loads(json.dumps(SELFTEST))
    zly_typ["model"]["grupy_nieuwzglednione"] = []
    try:
        licz(zly_typ)
    except SystemExit:
        pass
    else:
        raise AssertionError("grupy_nieuwzglednione jako lista przeszlo")
    print("SELFTEST OK (wynik %.3f, poziom %s; granica progow, filtr cyfr "
          "w wartosciach i nazwach pol, NaN, nazwy poziomow i pokrycie grup: "
          "podstawowe przypadki przeszly)"
          % (w["wynik"], w["poziom_wg_progow"]))


def main():
    if len(sys.argv) == 2 and sys.argv[1] == "--selftest":
        selftest()
        return
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    try:
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            dane = json.load(f)
    except FileNotFoundError:
        blad("nie znaleziono pliku %s. Sprawdz sciezke i nazwe pliku"
             % sys.argv[1])
    except UnicodeDecodeError:
        blad("plik %s nie jest zapisany w kodowaniu UTF-8. Zapisz plik "
             "ponownie jako UTF-8 i sprobuj jeszcze raz" % sys.argv[1])
    except json.JSONDecodeError as e:
        blad("plik %s nie jest poprawnym JSON (linia %d): popraw skladnie "
             "albo popros asystenta o ponowne zbudowanie pliku"
             % (sys.argv[1], e.lineno))
    except OSError:
        blad("nie udalo sie odczytac pliku %s. Sprawdz, czy plik istnieje "
             "i czy masz do niego dostep" % sys.argv[1])
    raport(licz(dane))


if __name__ == "__main__":
    main()
