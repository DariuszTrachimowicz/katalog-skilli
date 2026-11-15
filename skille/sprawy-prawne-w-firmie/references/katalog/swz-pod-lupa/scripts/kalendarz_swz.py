#!/usr/bin/env python3
"""Kalendarz przetargu z SWZ: terminy liczone według reguł Prawa zamówień publicznych.

Liczy (stan reguł: 15 listopada 2026):
- termin ustawowy na wniosek o wyjaśnienie treści SWZ z obowiązkiem odpowiedzi
  (metoda UZP: od daty składania ofert odjąć 14, 7 albo 4 dni; gdy wynik wypada w sobotę
  albo dzień ustawowo wolny, termin upływa następnego dnia roboczego) i zalecany dzień
  wysłania z zapasem,
- terminy na odwołanie wobec treści ogłoszenia i wobec treści SWZ (osobno),
- długość związania ofertą i limit,
- do kiedy musi działać wadium i czy kwota mieści się w limicie.

Użycie:
  python kalendarz_swz.py --skladanie "2026-12-04 10:00" --prog ponizej --ogloszenie 2026-11-12 \
      --swz 2026-11-12 --zwiazanie-do 2027-01-02 --wadium 4500 --wartosc 300000
  python kalendarz_swz.py --selftest

Kod wyjścia: 0 bez uwag, 1 wynik z uwagami, 2 złe dane.
"""
import argparse
import sys
from datetime import date, datetime, timedelta
from decimal import Decimal, InvalidOperation

MIESIACE = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca",
            "sierpnia", "września", "października", "listopada", "grudnia"]
DNI = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"]
ROK_MIN, ROK_MAX = 2000, 2100
KWOTA_MAX = Decimal("1000000000000")
PYTANIA = "Wniosek o wyjaśnienie treści SWZ z obowiązkiem odpowiedzi"
ZALECANE = "Zalecany dzień wysłania pytań"
ODW_OGL = "Odwołanie wobec treści ogłoszenia"
ODW_SWZ = "Odwołanie wobec treści SWZ"


class ZleDane(Exception):
    pass


def wielkanoc(rok):
    a = rok % 19
    b, c = divmod(rok, 100)
    d, e = divmod(b, 4)
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i, k = divmod(c, 4)
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    miesiac, dzien = divmod(h + l - 7 * m + 114, 31)
    return date(rok, miesiac, dzien + 1)


def swieta(rok):
    w = wielkanoc(rok)
    s = {date(rok, 1, 1), date(rok, 1, 6), w, w + timedelta(days=1), date(rok, 5, 1),
         date(rok, 5, 3), w + timedelta(days=49), w + timedelta(days=60), date(rok, 8, 15),
         date(rok, 11, 1), date(rok, 11, 11), date(rok, 12, 25), date(rok, 12, 26)}
    if rok >= 2025:  # Wigilia dniem wolnym od 2025 roku
        s.add(date(rok, 12, 24))
    return s


def roboczy(d):
    return d.weekday() < 5 and d not in swieta(d.year)


def nastepny_roboczy(d):
    while not roboczy(d):
        d += timedelta(days=1)
    return d


def poprzedni_roboczy(d):
    while not roboczy(d):
        d -= timedelta(days=1)
    return d


def slownie(d):
    return f"{d.day} {MIESIACE[d.month - 1]} {d.year} ({DNI[d.weekday()]})"


def sprawdz_rok(d, pole):
    if not ROK_MIN <= d.year <= ROK_MAX:
        raise ZleDane(f"{pole}: rok spoza zakresu {ROK_MIN}-{ROK_MAX}")
    return d


def data(t, pole):
    try:
        return sprawdz_rok(date.fromisoformat(t.strip()), pole)
    except ValueError:
        raise ZleDane(f"{pole}: oczekuję daty RRRR-MM-DD, dostałem „{t}”")


def termin_skladania(t):
    t = t.strip()
    try:
        if len(t) > 10:
            dt = datetime.strptime(t, "%Y-%m-%d %H:%M")
            return sprawdz_rok(dt.date(), "--skladanie"), dt.strftime("%H:%M")
        return sprawdz_rok(date.fromisoformat(t), "--skladanie"), None
    except ValueError:
        raise ZleDane(f"--skladanie: oczekuję „RRRR-MM-DD GG:MM” albo „RRRR-MM-DD”, dostałem „{t}”")


def kwota(t, pole):
    try:
        k = Decimal(t.replace(" ", "").replace(",", "."))
    except InvalidOperation:
        raise ZleDane(f"{pole}: to nie jest kwota: „{t}”")
    if not k.is_finite() or k < Decimal("0.01") or k > KWOTA_MAX:
        raise ZleDane(f"{pole}: kwota musi wynosić od 0,01 zł do {KWOTA_MAX} zł")
    if k != k.quantize(Decimal("0.01")):
        raise ZleDane(f"{pole}: kwota może mieć najwyżej dwa miejsca po przecinku")
    return k


def zl(k):
    k = k.quantize(Decimal("0.01"))
    calk, ulam = f"{k:.2f}".split(".")
    grupy = []
    while calk:
        grupy.insert(0, calk[-3:])
        calk = calk[:-3]
    return " ".join(grupy) + "," + ulam + " zł"


def proc(x):
    return f"{x:.2f}".replace(".", ",").rstrip("0").rstrip(",") + " %"


def odwolanie(nazwa, opublikowano, n_odw, d_skl, wiersze, uwagi, dzis):
    if opublikowano > d_skl:
        raise ZleDane(f"data publikacji ({nazwa}) jest późniejsza niż termin składania ofert")
    koniec = opublikowano + timedelta(days=n_odw)
    przes = nastepny_roboczy(koniec)
    opis = f"reguła: {n_odw} dni od zamieszczenia ({slownie(opublikowano)}); dnia publikacji nie liczy się"
    if przes != koniec:
        opis += f"; {slownie(koniec)} to dzień wolny albo sobota, więc termin upływa następnego dnia roboczego"
    opis += "; odwołanie wiąże się z wpisem i krótkim terminem, skonsultuj je z prawnikiem"
    wiersze.append((nazwa, przes, opis))
    if przes < dzis:
        uwagi.append(f"termin „{nazwa.lower()}” minął {slownie(przes)}, jeśli data publikacji jest właściwa")


def licz(skladanie, prog, ogloszenie=None, swz=None, zwiazanie_do=None, wadium=None, wartosc=None,
         pilnosc=False, czesc_wartosci=False, pierwotny=None, dzis=None):
    """Zwraca (wiersze, uwagi). Daty jako obiekty date."""
    dzis = dzis or date.today()
    if prog not in ("ponizej", "powyzej"):
        raise ZleDane("--prog: „ponizej” albo „powyzej”")
    if pilnosc and prog != "powyzej":
        raise ZleDane("--pilnosc dotyczy tylko przetargu powyżej progów unijnych ze skróconym terminem z powodu pilności")
    d_skl, godz = skladanie
    if pierwotny and pierwotny > d_skl:
        raise ZleDane("--pierwotny jest późniejszy niż aktualny termin składania ofert")
    wiersze, uwagi = [], []

    if not roboczy(d_skl):
        uwagi.append(f"termin składania ofert z dokumentów wypada w dzień wolny albo sobotę ({slownie(d_skl)}); "
                     f"przy terminie na czynność w taki dzień co do zasady upływa on następnego dnia roboczego, "
                     f"ale przy ofertach składanych na platformie trzeba to wyjaśnić z zamawiającym; "
                     f"terminów zależnych od daty składania ofert nie liczę, dopóki data nie zostanie potwierdzona")
        if ogloszenie:
            odwolanie(ODW_OGL, ogloszenie, 5 if prog == "ponizej" else 10, d_skl, wiersze, uwagi, dzis)
        if swz:
            odwolanie(ODW_SWZ, swz, 5 if prog == "ponizej" else 10, d_skl, wiersze, uwagi, dzis)
        kontrola_wadium(prog, wadium, wartosc, czesc_wartosci, wiersze, uwagi)  # nie zależy od daty
        return wiersze, uwagi

    # 1. pytania: liczone od PIERWOTNEGO terminu ofert (przedłużenie go nie przesuwa)
    baza = pierwotny or d_skl
    n = 4 if prog == "ponizej" else (7 if pilnosc else 14)
    wprost = baza - timedelta(days=n)
    ustawowy = nastepny_roboczy(wprost)
    od_czego = (f"pierwotnego terminu składania ofert ({slownie(baza)}), bo przedłużenie terminu ofert nie przesuwa terminu na pytania"
                if pierwotny and pierwotny != d_skl else "składania ofert")
    opis = (f"metoda UZP: od daty {od_czego} odjąć {n} dni"
            + (f"; {slownie(wprost)} to dzień wolny albo sobota, więc termin upływa następnego dnia roboczego" if ustawowy != wprost else "")
            + "; wniosek ma do tego dnia wpłynąć do zamawiającego")
    wiersze.append((PYTANIA, ustawowy, opis))
    zalecany = poprzedni_roboczy(ustawowy - timedelta(days=2))
    if zalecany >= dzis:
        wiersze.append((ZALECANE, zalecany, "zapas dwóch dni na wypadek kłopotów z platformą; najlepiej wysłać od razu"))
    if ustawowy < dzis:
        uwagi.append(f"termin na pytania z obowiązkiem odpowiedzi minął {slownie(ustawowy)}; zamawiający może nie odpowiedzieć na nowe pytania")

    # 2. odwołania wobec ogłoszenia i SWZ
    n_odw = 5 if prog == "ponizej" else 10
    if ogloszenie:
        odwolanie(ODW_OGL, ogloszenie, n_odw, d_skl, wiersze, uwagi, dzis)
    if swz:
        odwolanie(ODW_SWZ, swz, n_odw, d_skl, wiersze, uwagi, dzis)
    if not ogloszenie and not swz:
        uwagi.append("bez --ogloszenie i --swz nie liczę terminów odwołania")
    elif not swz:
        uwagi.append("bez --swz nie liczę osobno terminu odwołania wobec treści SWZ (liczy się od zamieszczenia SWZ na stronie postępowania)")

    # 3. składanie
    wiersze.append(("Składanie ofert", d_skl, (f"godz. {godz}" if godz else "godzina nieznana, sprawdź w SWZ")))

    # 4. związanie ofertą
    limit = 30 if prog == "ponizej" else 90
    if zwiazanie_do:
        if zwiazanie_do < d_skl:
            raise ZleDane("--zwiazanie-do jest wcześniejsze niż termin składania ofert")
        dni = (zwiazanie_do - d_skl).days + 1
        opis = f"{dni} dni, licząc dzień składania ofert jako pierwszy; limit {limit} dni"
        if prog == "powyzej":
            opis += " (120 dni przy robotach od 20 mln euro i dostawach albo usługach od 10 mln euro)"
        wiersze.append(("Związanie ofertą do", zwiazanie_do, opis))
        if dni > limit:
            uwagi.append(f"związanie ofertą {dni} dni przekracza limit {limit} dni"
                         + (" (chyba że to zamówienie z limitem 120 dni)" if prog == "powyzej" and dni <= 120 else "")
                         + "; do wyjaśnienia z zamawiającym")
    else:
        uwagi.append("bez --zwiazanie-do nie sprawdzam związania ofertą ani ważności wadium")

    # 5. wadium
    if wadium is not None and zwiazanie_do:
        wiersze.append(("Wadium ważne co najmniej do", zwiazanie_do,
                        "wniesione przed terminem składania ofert i działające bez przerwy do końca związania ofertą"))
    kontrola_wadium(prog, wadium, wartosc, czesc_wartosci, wiersze, uwagi)
    return wiersze, uwagi


def kontrola_wadium(prog, wadium, wartosc, czesc_wartosci, wiersze, uwagi):
    if wadium is not None:
        if wartosc is not None:
            p = Decimal("1.5") if prog == "ponizej" else Decimal("3")
            limit_dokladny = wartosc * p / 100  # porównanie bez zaokrąglenia
            udzial = wadium / wartosc * 100
            if czesc_wartosci:
                uwagi.append("wartość podana dla części zamówienia: limit wadium liczę dla tej części")
            if wadium > limit_dokladny:
                uwagi.append(f"wadium {zl(wadium)} to {proc(udzial)} wartości {zl(wartosc)}, więcej niż limit {proc(p)} "
                             f"({zl(limit_dokladny.quantize(Decimal('0.01'), rounding='ROUND_DOWN'))}); do wyjaśnienia, "
                             f"sprawdź, czy wartość jest netto i dla całego zamówienia albo tej części")
            else:
                wiersze.append(("Kwota wadium", None,
                                f"{zl(wadium)} = {proc(udzial)} wartości {zl(wartosc)}; limit {proc(p)}"))


def drukuj(wiersze, uwagi):
    print("| Co | Kiedy | Uwagi |")
    print("|---|---|---|")
    for co, kiedy, opis in wiersze:
        print(f"| {co} | {slownie(kiedy) if kiedy else ''} | {opis} |")
    if uwagi:
        print("\nUWAGI:")
        for u in uwagi:
            print("- " + u)
    print("\nDaty według reguł ze stanu na 15 listopada 2026. Licz z zapasem; przy wątpliwości zapytaj prawnika.")


def selftest():
    D = date(2026, 11, 15)
    assert wielkanoc(2026) == date(2026, 4, 5) and wielkanoc(2027) == date(2027, 3, 28)
    assert not roboczy(date(2026, 12, 24)) and not roboczy(date(2026, 11, 11)) and not roboczy(date(2026, 6, 4))

    def tab(*a, **k):
        wi, uw = licz(*a, dzis=D, **k)
        return {co: kiedy for co, kiedy, _ in wi}, uw

    # poniżej progów: 4.12 (pt) - 4 = 30.11 (pn) roboczy
    d, _ = tab((date(2026, 12, 4), "10:00"), "ponizej", ogloszenie=date(2026, 11, 12), swz=date(2026, 11, 16))
    assert d[PYTANIA] == date(2026, 11, 30), d
    assert d[ZALECANE] == date(2026, 11, 27), d  # 30.11 - 2 = 28.11 (sob) -> pt 27.11
    assert d[ODW_OGL] == date(2026, 11, 17) and d[ODW_SWZ] == date(2026, 11, 23), d  # 21.11 sob -> pn 23.11
    # UZP: 14 dni, wynik w sobotę -> następny dzień roboczy; 18.12.2026 (pt) - 14 = 4.12 (pt)
    d, _ = tab((date(2026, 12, 18), "09:00"), "powyzej")
    assert d[PYTANIA] == date(2026, 12, 4), d
    d, _ = tab((date(2027, 1, 16 + 2), None), "powyzej")  # 18.01.2027 (pn) - 14 = 4.01 (pn)
    assert d[PYTANIA] == date(2027, 1, 4), d
    d, _ = tab((date(2027, 1, 20), None), "powyzej")  # 20.01 - 14 = 6.01 (święto) -> 7.01
    assert d[PYTANIA] == date(2027, 1, 7), d
    # pilność: 7 dni
    d, _ = tab((date(2027, 1, 29), None), "powyzej", pilnosc=True)
    assert d[PYTANIA] == date(2027, 1, 22), d
    # przedłużenie: pytania od pierwotnego
    d, _ = tab((date(2026, 12, 18), None), "ponizej", pierwotny=date(2026, 12, 4))
    assert d[PYTANIA] == date(2026, 11, 30), d
    # odwołanie: święto i Wigilia
    d, _ = tab((date(2026, 12, 4), None), "ponizej", ogloszenie=date(2026, 11, 6))
    assert d[ODW_OGL] == date(2026, 11, 12), d
    d, _ = tab((date(2027, 1, 29), None), "powyzej", ogloszenie=date(2026, 12, 14))
    assert d[ODW_OGL] == date(2026, 12, 28), d
    # termin ofert w sobotę: zależnych nie liczę
    d, uw = tab((date(2026, 12, 5), None), "ponizej", zwiazanie_do=date(2027, 1, 3), ogloszenie=date(2026, 11, 20))
    assert PYTANIA not in d and "Związanie ofertą do" not in d and ODW_OGL in d and any("dzień wolny" in u for u in uw)
    # związanie 30 i 31 dni
    _, uw = tab((date(2026, 12, 4), None), "ponizej", zwiazanie_do=date(2027, 1, 2))
    assert not any("przekracza" in u for u in uw), uw
    _, uw = tab((date(2026, 12, 4), None), "ponizej", zwiazanie_do=date(2027, 1, 3))
    assert any("31 dni przekracza" in u for u in uw), uw
    # wadium: bez zaokrąglania limitu
    _, uw = tab((date(2026, 12, 4), None), "ponizej", wadium=Decimal("2550.02"), wartosc=Decimal("170001"))
    assert any("więcej niż limit" in u for u in uw), uw
    _, uw = tab((date(2026, 12, 4), None), "ponizej", wadium=Decimal("4500"), wartosc=Decimal("300000"))
    assert not any("więcej niż limit" in u for u in uw), uw
    # sobota: daty wstrzymane, ale kontrola kwoty wadium działa
    _, uw = tab((date(2026, 12, 5), None), "ponizej", wadium=Decimal("4600"), wartosc=Decimal("300000"))
    assert any("więcej niż limit" in u for u in uw), uw
    # termin na pytania minął
    _, uw = licz((date(2026, 12, 4), None), "ponizej", dzis=date(2026, 12, 1))
    assert any("minął" in u for u in uw), uw
    _, uw = licz((date(2026, 12, 4), None), "ponizej", dzis=date(2026, 11, 30))
    assert not any("minął" in u for u in uw), uw
    # złe dane
    for zle in [lambda: licz((date(2026, 12, 4), None), "inne"),
                lambda: licz((date(2026, 12, 4), None), "ponizej", pilnosc=True),
                lambda: licz((date(2026, 12, 4), None), "ponizej", pierwotny=date(2026, 12, 5)),
                lambda: licz((date(2026, 12, 4), None), "ponizej", ogloszenie=date(2026, 12, 5)),
                lambda: licz((date(2026, 12, 4), None), "ponizej", zwiazanie_do=date(2026, 12, 3)),
                lambda: kwota("-5", "x"), lambda: kwota("abc", "x"), lambda: kwota("nan", "x"),
                lambda: kwota("1e100", "x"), lambda: kwota("1e-1000000", "x"), lambda: kwota("0.005", "x"), lambda: kwota("1.001", "x"), lambda: data("0001-01-01", "x"),
                lambda: termin_skladania("4.12.2026"), lambda: data("2026-13-01", "x")]:
        try:
            zle()
        except ZleDane:
            continue
        raise AssertionError("złe dane przeszły")
    assert zl(Decimal("1234567.5")) == "1 234 567,50 zł"
    print("selftest: OK")


def main():
    p = argparse.ArgumentParser(description="Kalendarz przetargu z SWZ")
    p.add_argument("--skladanie", help="aktualny termin składania ofert „RRRR-MM-DD GG:MM”")
    p.add_argument("--prog", choices=["ponizej", "powyzej"], help="poniżej albo powyżej progów unijnych")
    p.add_argument("--ogloszenie", help="dzień zamieszczenia ogłoszenia (BZP) albo publikacji w Dz.Urz. UE RRRR-MM-DD")
    p.add_argument("--swz", help="dzień zamieszczenia SWZ albo jej zmiany na stronie postępowania RRRR-MM-DD")
    p.add_argument("--zwiazanie-do", help="data końca związania ofertą z SWZ RRRR-MM-DD")
    p.add_argument("--wadium", help="kwota wadium w zł")
    p.add_argument("--wartosc", help="wartość zamówienia netto w zł, gdy podana w dokumentach")
    p.add_argument("--czesc", action="store_true", help="wadium i wartość dotyczą jednej części zamówienia")
    p.add_argument("--pilnosc", action="store_true", help="powyżej progów: termin ofert skrócony z powodu pilności")
    p.add_argument("--pierwotny", help="pierwotny termin składania ofert RRRR-MM-DD, gdy zamawiający go przedłużył")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args()
    if a.selftest:
        selftest()
        return 0
    try:
        if not a.skladanie or not a.prog:
            raise ZleDane("podaj --skladanie i --prog")
        wi, uw = licz(termin_skladania(a.skladanie), a.prog,
                      ogloszenie=data(a.ogloszenie, "--ogloszenie") if a.ogloszenie else None,
                      swz=data(a.swz, "--swz") if a.swz else None,
                      zwiazanie_do=data(a.zwiazanie_do, "--zwiazanie-do") if a.zwiazanie_do else None,
                      wadium=kwota(a.wadium, "--wadium") if a.wadium else None,
                      wartosc=kwota(a.wartosc, "--wartosc") if a.wartosc else None,
                      pilnosc=a.pilnosc, czesc_wartosci=a.czesc,
                      pierwotny=data(a.pierwotny, "--pierwotny") if a.pierwotny else None)
    except ZleDane as e:
        print("BŁĄD DANYCH: " + str(e))
        return 2
    drukuj(wi, uw)
    istotne = [u for u in uw if not u.startswith("bez --")]
    return 1 if istotne else 0


if __name__ == "__main__":
    sys.exit(main())
