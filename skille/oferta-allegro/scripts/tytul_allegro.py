#!/usr/bin/env python3
"""Sprawdza tytuł oferty Allegro i kod EAN.

Użycie:
  python scripts/tytul_allegro.py "Kurtka puchowa damska Nordvik Selja zielona"
  python scripts/tytul_allegro.py --ean 5901234567893
  python scripts/tytul_allegro.py --selftest

Zasady według references/zasady-allegro.md (stan na 15 listopada 2026):
12-75 znaków ze spacjami, co najmniej 3 słowa, słowo do 30 znaków, & liczone jak 5 znaków.
BŁĄD to złamanie zasady, którą Allegro podaje w pomocy dla sprzedających.
UWAGA to nasza podpowiedź redakcyjna albo rzecz do ręcznego sprawdzenia, nie zasada Allegro.
Skrypt nie zna marek, więc cudzej marki w tytule nie wykryje: to sprawdzasz sam.
Skrypt nie łączy się z siecią i niczego nie zapisuje. Licznik w formularzu ma pierwszeństwo.
"""
import re
import sys
import unicodedata

MIN_ZNAKOW, MAX_ZNAKOW, MIN_SLOW, MAX_SLOWO = 12, 75, 3, 30
ENCJE = {"&": 5}  # potwierdzone przez Allegro; innych encji nie zakładamy
# Słowa i frazy wymienione w pomocy Allegro jako niedozwolone w tytule.
ZAKAZANE_ALLEGRO = ["tanio", "najtaniej", "okazja", "nowość", "nowosc", "promocja", "hit", "faktura"]
FRAZY_ALLEGRO = ["szybka wysyłka", "szybka wysylka"]
# Nazwy programów Allegro: przyznaje je Allegro, sprzedawca ich nie wpisuje.
PROGRAMY_ALLEGRO = ["allegro smart", "gwarancja najniższej ceny", "gwarancja najnizszej ceny"]
# Nasze podpowiedzi: słowa reklamowe i o dostawie, których Allegro nie wymienia wprost.
PODEJRZANE = ["tani", "tania", "tanie", "super", "mega", "wyprzedaż", "wyprzedaz", "gratis",
              "fv", "vat", "allegro"]
FRAZY_PODEJRZANE = ["wysyłka 24h", "wysylka 24h", "darmowa dostawa"]
POROWNANIA = ["typu", "typ", "w stylu", "podobny do", "podobne do", "podobna do",
              "lepszy niż", "lepsze niż", "lepsza niż", "jak", "nie jak", "zamiennik",
              "odpowiednik", "odzwierciedlenie", "inspirowany", "inspirowane"]
OZDOBNIKI_ALLEGRO = set("!@")  # wymienione przez Allegro (obok nawiasów kwadratowych)
OZDOBNIKI_INNE = set("$^*~|<>{}=_`\"")  # nasza podpowiedź; # zostaje (C#, nr)
ROZMIAR = re.compile(r"\d{1,3}([,.]\d)?( \d/\d)?([-/]\d{1,3}([,.]\d)?)?|\d?X{0,3}[SML]{1,2}([/-]\d?X{0,3}[SML]{1,2})?", re.I)


def dlugosc(t):
    return sum(ENCJE.get(z, 1) for z in t)


def ean_poprawny(kod):
    kod = kod.strip()
    if not re.fullmatch(r"\d{8}|\d{12}|\d{13}|\d{14}", kod):
        return False, "kod musi mieć 8, 12, 13 albo 14 cyfr"
    cyfry = [int(c) for c in kod]
    suma = sum(c * (3 if i % 2 == 0 else 1) for i, c in enumerate(reversed(cyfry[:-1])))
    kontrolna = (10 - suma % 10) % 10
    if kontrolna != cyfry[-1]:
        # celowo bez podawania „poprawnej” cyfry: pomyłka może być w innej cyfrze kodu
        return False, "zła cyfra kontrolna, kod jest błędny (sprawdź go na opakowaniu albo u dostawcy)"
    return True, "cyfra kontrolna się zgadza"


def sprawdz(tytul):
    t = unicodedata.normalize("NFC", tytul.strip())
    bledy, uwagi = [], []
    n = dlugosc(t)
    slowa = t.split()
    if "  " in t:
        uwagi.append("podwójna spacja w środku")
    if n > MAX_ZNAKOW:
        bledy.append(f"za długi: {n} znaków, limit {MAX_ZNAKOW}")
    if n < MIN_ZNAKOW:
        bledy.append(f"za krótki: {n} znaków, minimum {MIN_ZNAKOW}")
    if len(slowa) < MIN_SLOW:
        bledy.append(f"za mało słów: {len(slowa)}, minimum {MIN_SLOW}")
    for s in slowa:
        if len(s) > MAX_SLOWO:
            bledy.append(f"słowo dłuższe niż {MAX_SLOWO} znaków: {s}")
    if "&" in t:
        uwagi.append("znak & liczy się jak 5 znaków; napisz „i”, chyba że & jest częścią nazwy własnej (np. marki)")
    male = [re.sub(r"[^\w-]", "", s.lower()) for s in slowa]
    licznik = {}
    for s in male:
        if len(s) > 2 and not s.isdigit():
            licznik[s] = licznik.get(s, 0) + 1
    powt = sorted(s for s, k in licznik.items() if k > 1)
    if powt:
        bledy.append("powtórzone słowa: " + ", ".join(powt))
    niskie = " " + " ".join(male) + " "
    for z in ZAKAZANE_ALLEGRO:
        if z in male:
            bledy.append(f"słowo niedozwolone w tytule według Allegro: {z}")
    for f in FRAZY_ALLEGRO:
        if " " + f + " " in niskie:
            bledy.append(f"fraza niedozwolona w tytule według Allegro: {f}")
    for z in PODEJRZANE:
        if z in male:
            uwagi.append(f"„{z}”: słowo reklamowe albo o warunkach sprzedaży; usuń, chyba że to część nazwy produktu")
    for f in PROGRAMY_ALLEGRO:
        if " " + f + " " in niskie:
            bledy.append(f"„{f}”: nazwa programu Allegro, przyznaje ją Allegro, nie wpisuje sprzedawca")
    for f in FRAZY_PODEJRZANE:
        if " " + f + " " in niskie:
            uwagi.append(f"„{f}”: warunki sprzedaży nie należą do tytułu")
    if "smart" in male:
        uwagi.append("„smart”: zostaw, jeśli to część nazwy produktu; usuń, jeśli chodzi o program dostaw Allegro")
    for f in POROWNANIA:
        if " " + f + " " in niskie:
            uwagi.append(f"„{f}”: dozwolone tylko jako opis cechy samego produktu, nigdy z cudzą marką")
    if re.search(r"[!@]{2,}", t):
        bledy.append("powtórzone ! albo @ jako ozdobnik")
    elif any(z in t for z in OZDOBNIKI_ALLEGRO):
        uwagi.append("znak ! albo @: dozwolony tylko jako część marki (np. „be quiet!”), inaczej usuń")
    inne = sorted({z for z in t if z in OZDOBNIKI_INNE})
    if inne:
        uwagi.append("nietypowe znaki: " + " ".join(inne) + " (usuń, jeśli to ozdobnik, a nie część nazwy)")
    glebokosc = 0
    for z in t:
        glebokosc += 1 if z == "[" else -1 if z == "]" else 0
        if glebokosc < 0 or glebokosc > 1:
            break
    if glebokosc != 0:
        bledy.append("niedomknięty, odwrócony albo zagnieżdżony nawias kwadratowy")
    for m in re.finditer(r"\[([^\]]*)\]", t):
        if not ROZMIAR.fullmatch(m.group(1).strip()):
            uwagi.append(f"nawias [{m.group(1)}]: Allegro dopuszcza go dla rozmiaru; jeśli to nie rozmiar, usuń nawias")
    for s in slowa:
        litery = [z for z in s if z.isalpha()]
        if len(litery) >= 4 and all(z.isupper() for z in litery) and not any(z.isdigit() for z in s):
            uwagi.append(f"całe słowo wielkimi literami: {s} (zostaw, jeśli tak brzmi marka albo model)")
    symbole = sorted({z for z in t if unicodedata.category(z) == "So" and z != "°"})
    if symbole:
        uwagi.append("symbol graficzny albo emotikona: " + " ".join(symbole) + " (usuń, jeśli to ozdobnik)")
    return n, bledy, uwagi


def raport(tytul):
    n, bledy, uwagi = sprawdz(tytul)
    print(f"Tytuł: {tytul.strip()}")
    print(f"Znaki: {n} z {MAX_ZNAKOW} (zostało {MAX_ZNAKOW - n})")
    print(f"Słowa: {len(tytul.split())}")
    for b in bledy:
        print(f"BŁĄD: {b}")
    for u in uwagi:
        print(f"UWAGA: {u}")
    if not bledy:
        print("Wynik: bez błędów formalnych. Cudze marki, treść i dopasowanie do produktu oceń sam.")
    return 1 if bledy else 0


def selftest():
    przypadki = [  # (tytuł, oczekiwana liczba znaków albo None, czy ma być BŁĄD)
        ("Kurtka puchowa damska zimowa Nordvik Selja z kapturem zielona", 61, False),
        ("Kurtka puchowa damska zimowa Nordvik Selja kaptur butelkowa zieleń S-XL", 71, False),
        ("SUPER KURTKA PUCHOWA!!! NORDVIK HIT SEZONU zimowa ciepła", None, True),
        ("Etui do iPhone 15 Pro silikonowe czarne", 39, False),
        ("Kubek & spodek", 18, False),
        ("Buty sportowe damskie [38] białe", None, False),
        ("Bluza damska bawełniana [2XL] granatowa", None, False),
        ("Kozaki damskie skórzane [42 2/3] czarne", None, False),
        ("Krem do twarzy SPF 50+ 50 ml", None, False),
        ("Kurtka zimowa 100% poliester czarna", None, False),
        ("Lampa ścienna obrót 90° czarna", None, False),
        ("Zasilacz Chieftec Smart GPS-500A8 500 W", None, False),
        ("Klocki LEGO Classic 11717 kreatywne", None, False),
        ("Klocki hamulcowe Brembo P 85 020 przód", None, False),
        ("Lampa ogrodowa solarna [", None, True),
        ("Lampa ogrodowa solarna ][", None, True),
        ("Książka programowanie C# dla początkujących", None, False),
        ("Lampa solarna Allegro Smart ogrodowa", None, True),
        ("Lampa solarna tanio tanio", None, True),
        ("Lampa ogrodowa solarna!!", None, True),
        ("Zasilacz be quiet! Pure Power 12 M", None, False),
        ("Koszulka męska H&M bawełniana", None, False),
        ("Lampa lampa ogrodowa solarna", None, True),
        ("ab cd", 5, True),
        ("x" * 76 + " a b", None, True),
    ]
    zle = 0
    for tytul, oczek_n, ma_blad in przypadki:
        n, bledy, _ = sprawdz(tytul)
        if (oczek_n is not None and n != oczek_n) or bool(bledy) != ma_blad:
            zle += 1
            print(f"NIE: {tytul} -> {n}, {bledy}")
    assert ean_poprawny("5901234567893")[0] and not ean_poprawny("5901234567890")[0]
    assert ean_poprawny("96385074")[0] and not ean_poprawny("12345")[0]
    print("selftest: OK" if not zle else f"selftest: {zle} błędów")
    return 1 if zle else 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    argv = sys.argv[1:]
    if argv == ["--selftest"]:
        sys.exit(selftest())
    if argv and argv[0] == "--ean":
        if len(argv) != 2:
            print("Użycie: python scripts/tytul_allegro.py --ean <kod>")
            sys.exit(2)
        ok, opis = ean_poprawny(argv[1])
        print(f"EAN {argv[1]}: {opis}")
        sys.exit(0 if ok else 1)
    if not argv or argv[0].startswith("--"):
        print(__doc__)
        sys.exit(2)
    sys.exit(max(raport(t) for t in argv))
