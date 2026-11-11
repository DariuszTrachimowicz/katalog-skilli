#!/usr/bin/env python3
"""Składa pismo (procesowe, urzędowe, do kontrahenta) w pliku DOCX w polskim układzie pisma.

Użycie:
    python scripts/pismo_docx.py pismo.txt pismo.docx
    python scripts/pismo_docx.py --selftest

Plik wejściowy to zwykły tekst UTF-8. Linie zaczynające się od @ ustawiają elementy pisma:

    @projekt                     ramka "PROJEKT DO PRZEGLĄDU PRZEZ PRAWNIKA" (pisma poziomu B)
    @data: Łódź, dnia 12 listopada 2026 r.
    @nadawca:                    blok po lewej (pisma do kontrahenta i urzędu)
    @sad:  albo  @adresat:       blok po prawej: sąd z wydziałem i adresem albo adresat
    @strony:                     Powód: ..., Pozwany: ... (każda etykieta z dwukropkiem od nowej linii)
    @sygnatura: Sygn. akt: I C 123/26
    @wps: Wartość przedmiotu sporu: 86 100 zł
    @dotyczy: Dotyczy: faktury nr 12/2026
    @tytul: ODPOWIEDŹ NA POZEW
    @podtytul: z wnioskiem o oddalenie powództwa w całości
    @naglowek: UZASADNIENIE      (to samo robi linia "# UZASADNIENIE")
    @podpis:                     imię, nazwisko i funkcja podpisującego
    @zalaczniki:                 lista załączników, po jednym w linii

Blok (@nadawca, @sad, @adresat, @strony, @tytul, @podpis, @zalaczniki) kończy pusta linia.
Reszta to treść: akapity oddzielone pustą linią, punkty "1. ", "a) " albo "- " każdy w osobnej linii
(dwie spacje wcięcia dają drugi poziom), **pogrubienie** w gwiazdkach.
Pola [UZUPEŁNIJ: ...] i [WYMAGA WERYFIKACJI: ...] są w pliku podświetlone, żeby nie zostały w wysłanym piśmie.
Skrypt używa tylko biblioteki standardowej i nie łączy się z siecią.
"""
import re
import sys
import zipfile
from xml.sax.saxutils import escape

DYREKTYWY_LINIA = {"data", "sygnatura", "wps", "dotyczy", "podtytul", "naglowek"}
DYREKTYWY_BLOK = {"nadawca", "sad", "adresat", "strony", "tytul", "podpis", "zalaczniki"}
PRAWA_KOLUMNA = 4820  # 8,5 cm w twipach: tu zaczyna się blok sądu, adresata i podpisu
ADRES = re.compile(r"^(ul\.|al\.|pl\.|os\.|skr\.|\d\d-\d\d\d\b)", re.I)
PUNKT = re.compile(r"^(\s*)(\d+[.)]|[a-z]\)|-)\s+(.*)$")
ETYKIETA = re.compile(r"^([^:\[\]]{2,60}:)(.*)$")
POLE = re.compile(r"(\*\*.+?\*\*|\[(?:UZUPEŁNIJ|WYMAGA WERYFIKACJI)[^\]]*\])")
PROJEKT = "PROJEKT DO PRZEGLĄDU PRZEZ PRAWNIKA"
NIEDOZWOLONE = re.compile("[\x00-\x08\x0b\x0c\x0e-\x1f]")  # znaki sterujące, których XML 1.0 nie przyjmuje


def _biegi(tekst, pogrub=False, rozmiar=None):
    """Tekst -> biegi Worda: **pogrubienie** i podświetlone pola do uzupełnienia."""
    wyn = []
    for kawalek in POLE.split(tekst):
        if not kawalek:
            continue
        b, znacznik = pogrub, False
        if kawalek.startswith("**") and kawalek.endswith("**") and len(kawalek) > 4:
            wyn.append(_biegi(kawalek[2:-2], True, rozmiar))  # pole do uzupełnienia w pogrubieniu zostaje podświetlone
            continue
        if kawalek.startswith("["):
            znacznik = True
        rpr = ("<w:b/>" if b else "") + ('<w:highlight w:val="yellow"/>' if znacznik else "")
        if rozmiar:
            rpr += '<w:sz w:val="%d"/><w:szCs w:val="%d"/>' % (rozmiar, rozmiar)
        wyn.append('<w:r>%s<w:t xml:space="preserve">%s</w:t></w:r>'
                   % ("<w:rPr>%s</w:rPr>" % rpr if rpr else "", escape(kawalek)))
    return "".join(wyn)


def _akapit(tekst, jc="both", lewy=0, wysuniecie=0, pogrub=False, rozmiar=None,
            przed=0, po=120, razem=False, ramka=False, biegi=None):
    ppr = ""
    if razem:
        ppr += "<w:keepNext/>"
    if ramka:
        ppr += "<w:pBdr>" + "".join('<w:%s w:val="single" w:sz="8" w:space="4" w:color="000000"/>' % s
                                    for s in ("top", "left", "bottom", "right")) + "</w:pBdr>"
    ppr += '<w:spacing w:before="%d" w:after="%d"/>' % (przed, po)
    if lewy or wysuniecie:
        ppr += '<w:ind w:left="%d"%s/>' % (lewy, ' w:hanging="%d"' % wysuniecie if wysuniecie else "")
    ppr += '<w:jc w:val="%s"/>' % jc
    return "<w:p><w:pPr>%s</w:pPr>%s</w:p>" % (ppr, biegi if biegi is not None else _biegi(tekst, pogrub, rozmiar))


def _etykieta(linia, **kw):
    """Linia "Etykieta: reszta" z pogrubioną etykietą; inne linie bez zmian."""
    m = ETYKIETA.match(linia)
    if not m:
        return _akapit(linia, **kw)
    return _akapit("", biegi=_biegi(m.group(1), True) + _biegi(m.group(2)), **kw)


def rozbierz(tekst):
    """Tekst wejściowy -> lista (rodzaj, wartość). Nieznana dyrektywa to ValueError."""
    elementy, blok, akapit = [], None, []

    def zamknij_akapit():
        if akapit:
            elementy.append(("akapit", " ".join(akapit)))
            akapit.clear()

    tekst = NIEDOZWOLONE.sub(" ", tekst.replace("\t", " "))
    for surowa in tekst.replace("\r\n", "\n").replace("\r", "\n").replace("﻿", "").split("\n"):
        linia = surowa.rstrip()
        if blok is not None:
            if linia.strip() and not linia.startswith("@"):
                blok[1].append(linia.strip())
                continue
            blok = None
            if not linia.strip():
                continue
        if not linia.strip():
            zamknij_akapit()
            continue
        if linia.startswith("@"):
            zamknij_akapit()
            nazwa, _, reszta = linia[1:].partition(":")
            nazwa, reszta = nazwa.strip().lower(), reszta.strip()
            if nazwa == "projekt":
                elementy.append(("projekt", reszta or PROJEKT))
            elif nazwa in DYREKTYWY_LINIA:
                elementy.append((nazwa, reszta))
            elif nazwa in DYREKTYWY_BLOK:
                blok = (nazwa, [reszta] if reszta else [])
                elementy.append(blok)
            else:
                raise ValueError("Nieznany element @%s. Dozwolone: projekt, %s."
                                 % (nazwa, ", ".join(sorted(DYREKTYWY_LINIA | DYREKTYWY_BLOK))))
            continue
        if linia.startswith("#"):
            zamknij_akapit()
            elementy.append(("naglowek", linia.lstrip("#").strip()))
            continue
        m = PUNKT.match(linia)
        if m:
            zamknij_akapit()
            elementy.append(("punkt", (2 if len(m.group(1)) >= 2 else 1, m.group(2), m.group(3))))
            continue
        if set(linia.strip()) <= {"-", "_", "*"}:
            continue  # linia pozioma z markdownu
        akapit.append(linia.strip())
    zamknij_akapit()
    return elementy


def tresc(elementy):
    """Elementy -> akapity Worda w układzie pisma."""
    x = []
    for rodzaj, w in elementy:
        if rodzaj == "projekt":
            x.append(_akapit(w, jc="center", pogrub=True, po=240, ramka=True))
        elif rodzaj == "data":
            x.append(_akapit(w, jc="right", po=360))
        elif rodzaj == "nadawca":
            for i, l in enumerate(w):
                x.append(_akapit(l, jc="left", pogrub=i == 0, po=360 if i == len(w) - 1 else 0))
        elif rodzaj in ("sad", "adresat"):
            adres = False
            for i, l in enumerate(w):
                adres = adres or bool(ADRES.match(l))
                gruby = not adres if rodzaj == "sad" else i == 0
                x.append(_akapit(l, jc="left", lewy=PRAWA_KOLUMNA, pogrub=gruby,
                                 po=360 if i == len(w) - 1 else 0))
        elif rodzaj == "strony":
            for i, l in enumerate(w):
                nowa = bool(ETYKIETA.match(l))
                x.append(_etykieta(l, jc="left", przed=120 if nowa and i else 0,
                                   po=240 if i == len(w) - 1 else 0))
        elif rodzaj in ("sygnatura", "wps"):
            x.append(_akapit(w, jc="left", pogrub=True, po=60))
        elif rodzaj == "dotyczy":
            x.append(_etykieta(w, jc="left", przed=120, po=240))
        elif rodzaj == "tytul":
            for i, l in enumerate(w):
                x.append(_akapit(l, jc="center", pogrub=True, rozmiar=28, razem=True,
                                 przed=480 if i == 0 else 0, po=120 if i == len(w) - 1 else 0))
        elif rodzaj == "podtytul":
            x.append(_akapit(w, jc="center", pogrub=True, razem=True, po=240))
        elif rodzaj == "naglowek":
            x.append(_akapit(w, jc="center", pogrub=True, razem=True, przed=360, po=180))
        elif rodzaj == "akapit":
            x.append(_akapit(w))
        elif rodzaj == "punkt":
            poziom, znak, t = w
            x.append(_akapit("", lewy=425 * poziom, wysuniecie=425,
                             biegi='<w:r><w:t xml:space="preserve">%s</w:t></w:r><w:r><w:tab/></w:r>%s'
                                   % (escape(znak), _biegi(t))))
        elif rodzaj == "podpis":
            for i, l in enumerate(w):
                x.append(_akapit(l, jc="center", lewy=PRAWA_KOLUMNA, przed=960 if i == 0 else 0, po=0))
        elif rodzaj == "zalaczniki":
            x.append(_akapit("Załączniki:", jc="left", pogrub=True, rozmiar=22, przed=480, po=60, razem=True))
            for i, l in enumerate(w, 1):
                m = PUNKT.match(l)
                znak, t = (m.group(2), m.group(3)) if m else ("%d." % i, l)
                x.append(_akapit("", jc="left", lewy=425, wysuniecie=425, po=0,
                                 biegi='<w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>%s</w:t></w:r><w:r><w:tab/></w:r>%s'
                                       % (escape(znak), _biegi(t, rozmiar=22))))
    return "".join(x)


W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"'
R = 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
NAGL = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
STYLE = (NAGL + '<w:styles %s><w:docDefaults><w:rPrDefault><w:rPr>'
         '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman" w:eastAsia="Times New Roman"/>'
         '<w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="pl-PL"/></w:rPr></w:rPrDefault>'
         '<w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="360" w:lineRule="auto"/></w:pPr></w:pPrDefault>'
         '</w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>'
         '</w:styles>') % W
STOPKA = (NAGL + '<w:ftr %s><w:p><w:pPr><w:jc w:val="center"/></w:pPr>'
          '<w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r>'
          '<w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r>'
          '<w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>') % W
TYPY = (NAGL + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
        '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
        '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>'
        '</Types>')
RELS = (NAGL + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
        '</Relationships>')
RELS_DOK = (NAGL + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>'
            '</Relationships>')


def dokument(tekst):
    """Tekst wejściowy -> XML głównej części dokumentu (A4, marginesy 2,5 cm, numer strony w stopce)."""
    return (NAGL + '<w:document %s %s><w:body>%s<w:sectPr><w:footerReference w:type="default" r:id="rId2"/>'
            '<w:pgSz w:w="11906" w:h="16838"/>'
            '<w:pgMar w:top="1418" w:right="1418" w:bottom="1418" w:left="1418" w:header="709" w:footer="709" w:gutter="0"/>'
            '</w:sectPr></w:body></w:document>') % (W, R, tresc(rozbierz(tekst)))


def zapisz(tekst, sciezka):
    xml = dokument(tekst)
    with zipfile.ZipFile(sciezka, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", TYPY)
        z.writestr("_rels/.rels", RELS)
        z.writestr("word/document.xml", xml)
        z.writestr("word/styles.xml", STYLE)
        z.writestr("word/footer1.xml", STOPKA)
        z.writestr("word/_rels/document.xml.rels", RELS_DOK)


def selftest():
    import io
    import xml.dom.minidom
    probka = """@projekt
@data: Łódź, dnia 12 listopada 2026 r.
@sad:
Sąd Rejonowy dla Łodzi-Widzewa w Łodzi
V Wydział Rodzinny i Nieletnich
ul. Kopcińskiego 56
90-032 Łódź

@strony:
Powód: Adam Przykładowy
ul. Długa 1, 00-001 Miasto
Pozwana: Firma <A&B> sp. z o.o.

@sygnatura: Sygn. akt: V RC 1/26
@tytul: ODPOWIEDŹ NA POZEW

W odpowiedzi na pozew doręczony [UZUPEŁNIJ: data doręczenia]
wnoszę o:

1. oddalenie powództwa **w całości**;
  a) także co do odsetek;
- zasądzenie kosztów.

# UZASADNIENIE

Akapit pierwszy.

@podpis:
Jan Kowalski
prezes zarządu

@zalaczniki:
odpis pisma dla powoda
2. pełnomocnictwo
"""
    el = rozbierz(probka)
    rodzaje = [r for r, _ in el]
    assert rodzaje == ["projekt", "data", "sad", "strony", "sygnatura", "tytul", "akapit", "punkt", "punkt",
                       "punkt", "naglowek", "akapit", "podpis", "zalaczniki"], rodzaje
    assert el[6][1].endswith("doręczenia] wnoszę o:"), el[6]          # linie akapitu sklejone
    assert el[8][1][0] == 2 and el[7][1][0] == 1                        # poziomy punktów
    assert el[2][1][-1] == "90-032 Łódź" and len(el[13][1]) == 2
    xml_dok = dokument(probka)
    xml.dom.minidom.parseString(xml_dok.encode("utf-8"))                # poprawny XML mimo < i &
    assert "&lt;A&amp;B&gt;" in xml_dok
    assert '<w:highlight w:val="yellow"/>' in xml_dok and "<w:pBdr>" in xml_dok
    assert xml_dok.count('<w:jc w:val="right"/>') == 1                  # tylko data do prawej
    assert '<w:ind w:left="%d"/>' % PRAWA_KOLUMNA in xml_dok            # sąd i podpis w prawej kolumnie
    assert "<w:b/></w:rPr><w:t xml:space=\"preserve\">Powód:</w:t>" in xml_dok
    assert "<w:b/></w:rPr><w:t xml:space=\"preserve\">w całości</w:t>" in xml_dok
    sad = xml_dok.split("Kopcińskiego")[0].rsplit("<w:p>", 1)[1]
    assert "<w:b/>" not in sad                                          # adres sądu bez pogrubienia
    try:
        rozbierz("@nieznane: x")
        raise AssertionError("brak błędu dla nieznanej dyrektywy")
    except ValueError:
        pass
    assert rozbierz("﻿@data: x\r\n\r\ntekst\r\n") == [("data", "x"), ("akapit", "tekst")]
    brudny = dokument("a\x0bb\x00c **[UZUPEŁNIJ: data]** d")
    xml.dom.minidom.parseString(brudny.encode("utf-8"))               # znaki sterujące nie psują XML
    assert '<w:b/><w:highlight w:val="yellow"/>' in brudny              # pole w pogrubieniu nadal podświetlone
    bufor = io.BytesIO()
    zapisz(probka, bufor)
    with zipfile.ZipFile(bufor) as z:
        assert z.testzip() is None
        for nazwa in z.namelist():
            xml.dom.minidom.parseString(z.read(nazwa))
        assert set(z.namelist()) >= {"[Content_Types].xml", "word/document.xml", "word/styles.xml", "word/footer1.xml"}
    print("selftest OK")


def main(argv):
    if "--selftest" in argv:
        selftest()
        return 0
    if len(argv) != 2:
        print(__doc__)
        return 2
    try:
        with open(argv[0], encoding="utf-8") as f:
            tekst = f.read()
        zapisz(tekst, argv[1])
    except (OSError, ValueError) as e:
        print("Błąd: %s" % e)
        return 2
    print("Zapisano %s" % argv[1])
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
