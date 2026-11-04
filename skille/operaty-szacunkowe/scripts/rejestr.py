#!/usr/bin/env python3
"""Rejestr decyzji wyceny: append-only, łańcuch skrótów, kontrola chronologii etapów.

Użycie (interpreter Pythona 3.10+; na Windows zwykle `python` albo `py`):
  python rejestr.py init <katalog_wyceny> --id <identyfikator> [--cel <cel_wyceny>]
  python rejestr.py add  <katalog_wyceny> --etap <etap> --typ <typ> \
      --tresc "..." [--uzasadnienie "..."] [--dane '<json>']
  python rejestr.py add  <katalog_wyceny> --plik <wpis.json>
      (wpis.json: {"etap":..,"typ":..,"tresc":..,"uzasadnienie":..,"dane":{..}};
       tryb plikowy jest OBOWIĄZKOWY dla treści pochodzących z cudzych dokumentów,
       bo omija interpolację powłoki przy budowaniu polecenia)
  python rejestr.py check <katalog_wyceny>
  python rejestr.py export <katalog_wyceny> [--format md]

Etapy (kolejność twarda): zalozenia -> analiza_rynku -> obliczenia -> redakcja -> kontrola
Typy wpisów (lista zamknięta, literówka = odmowa): otwarcie, zalozenie, material,
  kryteria, transakcja, odrzucenie, waga, obliczenie, redakcja, ostrzezenie,
  uzasadnienie, decyzja, powrot, aktualizacja_referencji, kontrola.
Typy bramkowe są związane z etapem (np. `transakcja` tylko w analiza_rynku,
`obliczenie` tylko w obliczenia): to domyka lukę, w której wpisy z niewłaściwym
etapem zaliczały bramki.

Reguły egzekwowane przez `add`:
  - przejście do wyższego etapu wymaga kompletu wpisów z etapów wcześniejszych:
      analiza_rynku: co najmniej 1 `zalozenie` i 1 `decyzja` z polem dane.podejscie
        (porownawcze / dochodowe / kosztowe / mieszane),
      obliczenia:    co najmniej 1 `kryteria`; dla podejścia porównawczego
        dodatkowo 3 `transakcja` i 1 `waga` (dochodowe/kosztowe/mieszane nie mają
        próby porównawczej, więc te dwa wymogi ich nie dotyczą),
      redakcja:      co najmniej 1 `obliczenie` PO ostatnim wpisie `powrot`,
      kontrola:      co najmniej 1 wpis typu `redakcja` PO ostatnim wpisie `powrot`,
  - wpis `transakcja` wymaga wcześniejszego wpisu `kryteria` (waga dowodowa kolejności),
  - wpisy `odrzucenie`, `waga`, `powrot` i `decyzja` wymagają niepustego uzasadnienia,
  - zmiana zadeklarowanego podejścia (dane.podejscie) po wejściu na etap obliczeń
    wymaga wcześniejszego wpisu `powrot`,
  - katalog wyceny nie może zawierać segmentów '..' ani ścieżek UNC,
  - etap wpisu nie może cofać pipeline'u względem najdalszego osiągniętego etapu
    (wyjątek 1: typy `uzasadnienie`, `ostrzezenie`, `decyzja` wolno dopisywać wstecz;
     wyjątek 2: wpis `powrot` z uzasadnieniem jawnie otwiera wcześniejszy etap
     na nowo, np. poszerzenie próby po wyniku próbnym; powrót zostaje w rejestrze),
  - minimalizacja danych osobowych: wpisy (także `init`) nie mogą zawierać numerów
    PESEL; wykrywane są też numery rozdzielone spacjami lub dywizami. Filtr łapie
    typowe numery PESEL i NIE zastępuje kontroli danych osobowych przez
    rzeczoznawcę (imion, adresów ani innych danych nie rozpozna).
OGRANICZENIA BEZPIECZEŃSTWA (jawnie): rejestr nie rozumie semantyki treści
wpisów (fikcyjny tekst przejdzie bramki ilościowe), osłona ścieżek blokuje '..'
i UNC, ale nie wymusza pozostania w jednym katalogu roboczym, a tryb plikowy
--plik chroni przed interpolacją powłoki tylko wtedy, gdy jest używany zgodnie
z instrukcją skilla. Merytoryczna prawdziwość wpisów to odpowiedzialność
rzeczoznawcy.
Rejestr jest append-only: każdy wpis zawiera sha256 poprzedniego wpisu. Łańcuch
utrudnia ciche poprawki pojedynczych wpisów i jest weryfikowany przez `check`;
nie jest to podpis kryptograficzny ani zewnętrzne znakowanie czasem, więc nie
zastępuje dowodu integralności całego pliku.
`check` weryfikuje łańcuch, chronologię, kolejność etapów, kompletność wpisów
wymaganych dla osiągniętego etapu i skanuje istniejące wpisy pod kątem PESEL.
Zmiany OSTATNIEGO wpisu łańcuch sam nie wykryje (nie ma następnika): dlatego
`check` wypisuje skrót końcowy łańcucha, a rzeczoznawca notuje go w operacie
(zewnętrzna kotwica) i przy kolejnych kontrolach porównuje z zanotowanym.
"""
import argparse, hashlib, json, os, re, sys
from datetime import datetime, timezone

ETAPY = ["zalozenia", "analiza_rynku", "obliczenia", "redakcja", "kontrola"]
TYPY_SWOBODNE = {"uzasadnienie", "ostrzezenie", "decyzja"}
TYPY_ZNANE = {"otwarcie", "zalozenie", "material", "kryteria", "transakcja",
              "odrzucenie", "waga", "obliczenie", "redakcja", "ostrzezenie",
              "uzasadnienie", "decyzja", "powrot", "aktualizacja_referencji",
              "kontrola"}
# typy bramkowe muszą siedzieć we właściwym etapie, inaczej bramki dałoby się oszukać
TYP_WYMAGA_ETAPU = {"zalozenie": "zalozenia", "kryteria": "analiza_rynku",
                    "transakcja": "analiza_rynku", "odrzucenie": "analiza_rynku",
                    "waga": "analiza_rynku", "obliczenie": "obliczenia",
                    "redakcja": "redakcja", "kontrola": "kontrola"}
PODEJSCIA = {"porownawcze", "dochodowe", "kosztowe", "mieszane"}
PLIK = "rejestr.jsonl"
# 11 cyfr, dopuszczalne pojedyncze spacje/dywizy między cyframi (PESEL "44 05 14 01359")
SEP = " \t.\u00a0\u2010\u2011\u2012\u2013\u2014\u2015-"
RE_PESEL = re.compile(r"(?<![\d])((?:\d[" + SEP + r"]{0,2}){10}\d)(?![\d])")


def _pesel_poprawny(cyfry: str) -> bool:
    wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
    suma = sum(int(c) * w for c, w in zip(cyfry[:10], wagi))
    return (10 - suma % 10) % 10 == int(cyfry[10])


def _zawiera_pesel(tekst: str) -> bool:
    for m in RE_PESEL.findall(tekst or ""):
        cyfry = re.sub("[" + SEP + "]", "", m)
        if len(cyfry) == 11 and _pesel_poprawny(cyfry):
            return True
    return False


def _katalog_dozwolony(katalog: str):
    czesci = katalog.replace("\\", "/").split("/")
    if ".." in czesci:
        sys.exit("ODMOWA: katalog wyceny nie może zawierać segmentów '..'.")
    if katalog.startswith("\\\\") or katalog.startswith("//"):
        sys.exit("ODMOWA: ścieżki UNC nie są dozwolone jako katalog wyceny.")


def _sciezka(katalog: str) -> str:
    return os.path.join(katalog, PLIK)


def _wczytaj(katalog: str):
    sciezka = _sciezka(katalog)
    if not os.path.exists(sciezka):
        return []
    wpisy = []
    with open(sciezka, encoding="utf-8") as f:
        for nr, linia in enumerate(f, 1):
            linia = linia.strip()
            if not linia:
                continue
            try:
                wpisy.append(json.loads(linia))
            except json.JSONDecodeError:
                sys.exit(f"BŁĄD: uszkodzona linia {nr} rejestru, rejestr wymaga ręcznego audytu.")
    return wpisy


def _hash(wpis: dict) -> str:
    return hashlib.sha256(
        json.dumps(wpis, ensure_ascii=False, sort_keys=True).encode("utf-8")
    ).hexdigest()


def _dopisz(katalog: str, wpis: dict):
    wpisy = _wczytaj(katalog)
    wpis["nr"] = len(wpisy) + 1
    wpis["ts"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
    wpis["hash_poprzedni"] = _hash(wpisy[-1]) if wpisy else "GENESIS"
    with open(_sciezka(katalog), "a", encoding="utf-8") as f:
        f.write(json.dumps(wpis, ensure_ascii=False, sort_keys=True) + "\n")
    return wpis


def cmd_init(a):
    _katalog_dozwolony(a.katalog)
    if _zawiera_pesel(" ".join([a.id or "", a.cel or ""])):
        sys.exit("ODMOWA: identyfikator ani cel wyceny nie mogą zawierać numeru PESEL "
                 "(minimalizacja danych osobowych). Użyj neutralnego identyfikatora.")
    os.makedirs(a.katalog, exist_ok=True)
    if os.path.exists(_sciezka(a.katalog)):
        sys.exit("Rejestr już istnieje, init odmówiono (append-only).")
    wpis = _dopisz(a.katalog, {
        "etap": "zalozenia", "typ": "otwarcie",
        "tresc": f"Otwarcie wyceny {a.id}", "uzasadnienie": "",
        "dane": {"id_wyceny": a.id, "cel": a.cel or "NIEOKREŚLONY"},
    })
    print(f"Rejestr otwarty: {_sciezka(a.katalog)} (wpis nr {wpis['nr']})")


def _najdalszy_etap(wpisy) -> int:
    """Najdalszy osiągnięty etap z uwzględnieniem jawnych powrotów."""
    idx = 0
    for w in wpisy:
        if w.get("typ") == "powrot":
            if w.get("etap") in ETAPY:
                idx = ETAPY.index(w["etap"])
        elif w.get("etap") in ETAPY:
            idx = max(idx, ETAPY.index(w["etap"]))
    return idx


def _od_ostatniego_powrotu(wpisy):
    ostatni = -1
    for i, w in enumerate(wpisy):
        if w.get("typ") == "powrot":
            ostatni = i
    return wpisy[ostatni + 1:]


def _zlicz(wpisy):
    zl = {}
    for w in wpisy:
        zl[w.get("typ")] = zl.get(w.get("typ"), 0) + 1
    return zl


def _podejscie(wpisy):
    """Ostatnia zadeklarowana wartość dane.podejscie z wpisów typu decyzja."""
    wynik = None
    for w in wpisy:
        if w.get("typ") == "decyzja" and isinstance(w.get("dane"), dict):
            p = w["dane"].get("podejscie")
            if p in PODEJSCIA:
                wynik = p
    return wynik


def _braki_wejscia(wpisy, docelowy_idx):
    zl = _zlicz(wpisy)
    zl_swieze = _zlicz(_od_ostatniego_powrotu(wpisy))
    podejscie = _podejscie(wpisy)
    braki = []
    if docelowy_idx >= 1:
        if zl.get("zalozenie", 0) < 1:
            braki.append("zalozenie (jest 0, wymagane 1)")
        if zl.get("material", 0) < 1:
            braki.append("material, protokół kompletności materiałów (jest 0, wymagany 1)")
        if podejscie is None:
            braki.append("decyzja z polem dane.podejscie "
                         "(porownawcze/dochodowe/kosztowe/mieszane)")
    if docelowy_idx >= 2:
        if zl.get("kryteria", 0) < 1:
            braki.append("kryteria (jest 0, wymagane 1)")
        if podejscie == "porownawcze":
            for typ, ile in (("transakcja", 3), ("waga", 1)):
                if zl.get(typ, 0) < ile:
                    braki.append(f"{typ} (jest {zl.get(typ, 0)}, wymagane {ile} "
                                 "dla podejścia porównawczego)")
    if docelowy_idx >= 3 and zl_swieze.get("obliczenie", 0) < 1:
        braki.append("obliczenie po ostatnim powrocie (jest 0, wymagane 1)")
    if docelowy_idx >= 4:
        red = sum(1 for w in _od_ostatniego_powrotu(wpisy) if w.get("typ") == "redakcja")
        if red < 1:
            braki.append("wpis typu redakcja po ostatnim powrocie (jest 0, wymagany 1)")
    return braki


def cmd_add(a):
    _katalog_dozwolony(a.katalog)
    if a.plik:
        try:
            w = json.loads(open(a.plik, encoding="utf-8").read())
        except (OSError, json.JSONDecodeError) as e:
            sys.exit(f"ODMOWA: nie mogę odczytać --plik ({e}).")
        if not isinstance(w, dict):
            sys.exit("ODMOWA: --plik musi zawierać obiekt JSON.")
        a.etap = w.get("etap"); a.typ = w.get("typ"); a.tresc = w.get("tresc")
        a.uzasadnienie = w.get("uzasadnienie") or ""
        a.dane = json.dumps(w.get("dane"), ensure_ascii=False) if w.get("dane") is not None else None
    if not (a.etap and a.typ and a.tresc is not None):
        sys.exit("ODMOWA: podaj --etap, --typ i --tresc albo komplet w --plik.")
    wpisy = _wczytaj(a.katalog)
    if not wpisy:
        sys.exit("Brak rejestru, najpierw `init`.")
    if a.etap not in ETAPY:
        sys.exit(f"Nieznany etap '{a.etap}'. Dozwolone: {', '.join(ETAPY)}")
    if a.typ not in TYPY_ZNANE:
        sys.exit(f"ODMOWA: nieznany typ wpisu '{a.typ}'. Dozwolone: "
                 f"{', '.join(sorted(TYPY_ZNANE))}. Literówka w typie omijałaby bramki.")
    if a.typ in TYP_WYMAGA_ETAPU and a.etap != TYP_WYMAGA_ETAPU[a.typ]:
        sys.exit(f"ODMOWA: wpis typu '{a.typ}' należy do etapu "
                 f"'{TYP_WYMAGA_ETAPU[a.typ]}', nie '{a.etap}'.")
    lacznie = " ".join([a.tresc or "", a.uzasadnienie or "", a.dane or ""])
    if _zawiera_pesel(lacznie):
        sys.exit("ODMOWA: treść wpisu zawiera numer PESEL (także rozdzielony "
                 "spacjami/dywizami). Dane osobowe stron nie są potrzebne do wyceny "
                 "(minimalizacja), usuń numer i ponów wpis.")
    if a.typ == "transakcja" and not any(w.get("typ") == "kryteria" for w in wpisy):
        sys.exit("ODMOWA: transakcję można przyjąć dopiero po zadeklarowaniu kryteriów "
                 "doboru próby (wpis typu 'kryteria'). Kolejność ma wagę dowodową.")
    if a.typ in ("odrzucenie", "waga", "powrot", "decyzja") and not (a.uzasadnienie or "").strip():
        sys.exit(f"ODMOWA: wpis typu '{a.typ}' wymaga niepustego uzasadnienia.")
    if a.dane:
        try:
            dane = json.loads(a.dane)
        except json.JSONDecodeError as e:
            sys.exit(f"ODMOWA: --dane nie jest poprawnym JSON-em ({e}).")
        if not isinstance(dane, dict):
            sys.exit("ODMOWA: --dane musi być obiektem JSON (słownikiem).")
    else:
        dane = {}
    if a.typ == "obliczenie" and not (isinstance(dane, dict) and str(dane.get("plik", "")).strip()):
        sys.exit("ODMOWA: wpis typu 'obliczenie' wymaga w --dane co najmniej pola "
                 "'plik' (plik wejściowy przebiegu) oraz kluczowych parametrów, "
                 "żeby rejestr wiązał decyzje z konkretnym obliczeniem.")
    if a.typ == "decyzja" and "podejscie" in dane:
        if dane["podejscie"] not in PODEJSCIA:
            sys.exit(f"ODMOWA: dane.podejscie '{dane['podejscie']}' spoza listy: "
                     f"{', '.join(sorted(PODEJSCIA))}.")
        biezace = _podejscie(wpisy)
        if biezace and dane["podejscie"] != biezace and _najdalszy_etap(wpisy) >= 2:
            sys.exit("ODMOWA: zmiana podejścia po wejściu na etap obliczeń wymaga "
                     "najpierw jawnego wpisu 'powrot' (analiza i obliczenia wymagają "
                     "powtórzenia pod nowym podejściem).")
    if _zawiera_pesel(json.dumps(dane, ensure_ascii=False)):
        sys.exit("ODMOWA: pole dane zawiera numer PESEL (po zdekodowaniu JSON). "
                 "Minimalizacja danych osobowych, usuń numer i ponów wpis.")
    najdalszy = _najdalszy_etap(wpisy)
    docelowy = ETAPY.index(a.etap)
    if a.typ == "powrot":
        if docelowy >= najdalszy:
            sys.exit("ODMOWA: powrot dotyczy wyłącznie wcześniejszego etapu niż "
                     f"osiągnięty ('{ETAPY[najdalszy]}').")
    elif docelowy < najdalszy and a.typ not in TYPY_SWOBODNE:
        sys.exit(f"ODMOWA: pipeline jest już na etapie '{ETAPY[najdalszy]}'. Wpis typu "
                 f"'{a.typ}' do wcześniejszego etapu naruszyłby chronologię. Dozwolone "
                 f"wstecz: {', '.join(sorted(TYPY_SWOBODNE))}, albo jawny wpis typu "
                 f"'powrot' z uzasadnieniem, który otwiera etap na nowo.")
    elif docelowy > najdalszy:
        braki = _braki_wejscia(wpisy, docelowy)
        if braki:
            sys.exit(f"ODMOWA: przejście na etap '{a.etap}' wymaga wcześniejszych wpisów: "
                     + "; ".join(braki) + ".")
    wpis = _dopisz(a.katalog, {"etap": a.etap, "typ": a.typ, "tresc": a.tresc,
                               "uzasadnienie": a.uzasadnienie or "", "dane": dane})
    print(f"Wpis nr {wpis['nr']} [{a.etap}/{a.typ}] zapisany.")


def cmd_check(a):
    _katalog_dozwolony(a.katalog)
    wpisy = _wczytaj(a.katalog)
    if not wpisy:
        print("Brak rejestru w katalogu.")
        return
    bledy = []
    for i, w in enumerate(wpisy):
        if not isinstance(w, dict) or "ts" not in w or "typ" not in w or "etap" not in w:
            bledy.append(f"wpis nr {i + 1}: brak wymaganych pól, rejestr wymaga ręcznego audytu")
            continue
        oczekiwany = "GENESIS" if i == 0 else _hash(wpisy[i - 1])
        if w.get("hash_poprzedni") != oczekiwany:
            bledy.append(f"wpis nr {w.get('nr')}: przerwany łańcuch hashy (możliwa modyfikacja)")
        if i > 0 and isinstance(wpisy[i - 1], dict) and w["ts"] < wpisy[i - 1].get("ts", ""):
            bledy.append(f"wpis nr {w.get('nr')}: znacznik czasu wcześniejszy niż poprzedni")
        if w.get("typ") not in TYPY_ZNANE:
            bledy.append(f"wpis nr {w.get('nr')}: nieznany typ '{w.get('typ')}'")
        tekst = " ".join([str(w.get("tresc", "")), str(w.get("uzasadnienie", "")),
                          json.dumps(w.get("dane", {}), ensure_ascii=False)])
        if _zawiera_pesel(tekst):
            bledy.append(f"wpis nr {w.get('nr')}: treść zawiera numer PESEL (minimalizacja!)")
    idx_kryteria = next((i for i, w in enumerate(wpisy) if w.get("typ") == "kryteria"), None)
    idx_trans = next((i for i, w in enumerate(wpisy) if w.get("typ") == "transakcja"), None)
    if idx_trans is not None and (idx_kryteria is None or idx_kryteria > idx_trans):
        bledy.append("transakcje przyjęte przed deklaracją kryteriów doboru próby")
    for w in wpisy:
        if w.get("typ") in ("odrzucenie", "waga", "powrot", "decyzja") and not str(w.get("uzasadnienie", "")).strip():
            bledy.append(f"wpis nr {w.get('nr')} ({w['typ']}): brak uzasadnienia")
        if w.get("typ") in TYP_WYMAGA_ETAPU and w.get("etap") != TYP_WYMAGA_ETAPU[w["typ"]] \
                and w.get("typ") != "otwarcie":
            bledy.append(f"wpis nr {w.get('nr')}: typ '{w['typ']}' w etapie '{w.get('etap')}' "
                         f"(oczekiwany etap: {TYP_WYMAGA_ETAPU[w['typ']]})")
    najdalszy = _najdalszy_etap(wpisy)
    for b in _braki_wejscia(wpisy, najdalszy):
        bledy.append(f"etap '{ETAPY[najdalszy]}' osiągnięty bez wymaganych wpisów: {b}")
    print(f"Rejestr: {len(wpisy)} wpisów, etap najdalszy: {ETAPY[najdalszy]}, "
          f"podejście: {_podejscie(wpisy) or 'NIEZADEKLAROWANE'}")
    zliczenia = _zlicz(wpisy)
    print("Wpisy wg typu: " + ", ".join(f"{k}={v}" for k, v in sorted(zliczenia.items())))
    if bledy:
        print("\nUSTALENIA KONTROLNE:")
        for b in bledy:
            print(f"  BLAD: {b}")
        sys.exit(1)
    print("Łańcuch hashy, chronologia, kolejność i kompletność etapów: OK")
    print(f"Skrót końcowy łańcucha (zanotuj w operacie jako kotwicę): {_hash(wpisy[-1])}")


def cmd_export(a):
    _katalog_dozwolony(a.katalog)
    wpisy = _wczytaj(a.katalog)
    if a.format == "md":
        print("| nr | czas (UTC) | etap | typ | treść | uzasadnienie |")
        print("|---|---|---|---|---|---|")
        for w in wpisy:
            t = " / ".join((w.get("tresc") or "").splitlines()).replace("|", "\\|")
            u = " / ".join((w.get("uzasadnienie") or "").splitlines()).replace("|", "\\|")
            print(f"| {w.get('nr')} | {w.get('ts')} | {w.get('etap')} | {w.get('typ')} | {t} | {u} |")
    else:
        json.dump(wpisy, sys.stdout, ensure_ascii=False, indent=2)
        print()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest="cmd", required=True)
    pi = sub.add_parser("init"); pi.add_argument("katalog"); pi.add_argument("--id", required=True); pi.add_argument("--cel")
    pa = sub.add_parser("add"); pa.add_argument("katalog")
    for arg in ("--etap", "--typ", "--tresc", "--uzasadnienie", "--dane", "--plik"):
        pa.add_argument(arg, required=False)
    pc = sub.add_parser("check"); pc.add_argument("katalog")
    pe = sub.add_parser("export"); pe.add_argument("katalog"); pe.add_argument("--format", default="json")
    a = p.parse_args()
    {"init": cmd_init, "add": cmd_add, "check": cmd_check, "export": cmd_export}[a.cmd](a)


if __name__ == "__main__":
    main()
