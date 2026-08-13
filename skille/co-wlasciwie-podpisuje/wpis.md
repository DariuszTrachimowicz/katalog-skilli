---
nazwa: Co właściwie podpisuję
kategoria: Prawo
status: gotowy
poziom: Działa od razu
aktualizacja: 2026-08-10
skrot: Zamienia kilkadziesiąt stron umowy, polisy, leasingu albo aneksu w kilkanaście punktów: ile płacisz, jak długo, jak wyjść, co przy problemie.
szukaj: umowa, polisa, OWU, leasing, kredyt, abonament, aneks, harmonogram, najem, streszczenie, prosty język, RRSO
tytulSeo: Streszczenie umowy, polisy i leasingu po ludzku, darmowe narzędzie AI
opisSeo: Wgraj umowę, polisę, leasing albo aneks i zobacz w kilkunastu punktach, ile to kosztuje, jak długo trwa i jak z tego wyjść. Po polsku, za darmo.
zgodnosc:
  claude: ok
  gpt: ok
  gemini: brak
---

## Co robi

Czyta długi dokument i zamienia go w kilkanaście punktów ułożonych tak, jak myśli człowiek: ile to kosztuje, jak długo trwa, co masz robić, jak z tego wyjść, co się stanie przy problemie i co druga strona może zmienić bez pytania Ciebie.

Na koniec pokazuje, gdzie w tym konkretnym dokumencie schowano rzeczy, których normalny człowiek szukałby zupełnie gdzie indziej: koszt w tabeli opłat zamiast w umowie, kwotę wykupu na ostatniej stronie harmonogramu. Najwyżej pięć takich miejsc. Jeśli jest tylko jedno, pokaże jedno; jeśli nie ma żadnego, napisze to wprost, zamiast dopychać listę.

Obsługuje umowy z firmami i instytucjami, aneksy i harmonogramy, polisy i ogólne warunki ubezpieczenia (OWU), leasing, kredyty i pożyczki, umowy abonamentowe oraz umowy najmu. Regulaminy serwisów, sklepów i aplikacji ma osobny skill: **Regulamin pod lupą**. Umowy o zachowaniu poufności, **Przed podpisem NDA**.

## Dla kogo

Każdy, komu podsunięto kilkadziesiąt stron i powiedziano „to standardowa umowa”. Właścicielki małych firm, freelancerzy, kierownicy biur, osoby kupujące auto w leasingu, rodzice ubezpieczający mieszkanie, seniorzy podpisujący aneks od operatora.

Przydaje się też tam, gdzie dokument już podpisano i trzeba ustalić, na co się właściwie zgodziło.

## Ile Ci to oszczędza

Przeczytanie sześćdziesięciostronicowych OWU ze zrozumieniem to półtorej godziny i tak zwykle kończy się na przekartkowaniu. Umowa leasingu z tabelą opłat, podobnie. Ze skillem to kilka minut do listy punktów, w której widać kwoty i terminy.

Realny zysk nie polega na czasie, tylko na tym, że dowiadujesz się o opłacie za wcześniejsze zakończenie przed podpisaniem, a nie w dniu, w którym chcesz zakończyć.

## Przykład z życia

Marta bierze auto w leasingu konsumenckim. W ofercie widzi ratę 1 490 zł miesięcznie przez 48 miesięcy i uznaje, że koszt zna.

Skill wyciąga z dokumentów resztę: opłata wstępna 20 000 zł, wykup na koniec 22 140 zł, ubezpieczenie narzucone przez leasingodawcę i nie wliczone w ratę, limit 20 000 km rocznie i 0,45 zł za każdy kilometr powyżej. Do tego tabela opłat i prowizji, w której siedzi 250 zł za każdą zmianę harmonogramu, 350 zł za zgodę na wyjazd za granicę i 500 zł za cesję, czyli za przepisanie umowy na inną osobę. Kwota wykupu była na ostatniej stronie harmonogramu, nie w umowie.

Skill pokazuje działanie: 1 490 × 48 + 20 000 + 22 140 = 113 660 zł, i dopisuje, że w tej sumie nie ma ubezpieczenia ani opłat z tabeli, bo tych z dokumentu nie da się wyliczyć.

## Jak po polsku

Zbudowany pod dokumenty, które naprawdę krążą w Polsce, a nie pod abstrakcyjną „umowę”.

Wie, że w leasingu połowa kosztów siedzi w tabeli opłat i prowizji, a wartość wykupu bywa na ostatniej stronie harmonogramu.

W polisie szuka słów, które decydują o tym, ile naprawdę wypłacą. Franszyza integralna to próg, przy szkodzie niższej nie dostajesz nic. Udział własny to kwota albo procent odejmowany od każdej wypłaty. Karencja to czas po zawarciu umowy, w którym dane zdarzenie jeszcze nie jest objęte. A zasada proporcji przy niedoubezpieczeniu działa tak: jeśli mieszkanie warte 600 000 zł ubezpieczysz na 300 000 zł, to przy szkodzie na 40 000 zł dostaniesz 20 000 zł. Każde z tych pojęć skill tłumaczy w miejscu, w którym go użyje.

Wie, że do umowy telekomunikacyjnej dołącza się krótkie podsumowanie warunków i to w nim najszybciej znajdziesz cenę oraz prędkość, i że po automatycznym przedłużeniu zmienia się zarówno cena, jak i sposób wypowiedzenia. Wie, że przy kredycie ze zmiennym oprocentowaniem rata zależy od wskaźnika z rynku, liczby, na którą ani Ty, ani bank nie macie wpływu, że wskaźniki są właśnie zmieniane na nowe i że umowa powinna mówić, co się stanie, gdy dotychczasowy przestanie być publikowany.

Zna polskie pułapki językowe: „nie później niż”, „dni robocze”, „do 30 dni”, „opłata według aktualnego cennika”, różnica między netto a brutto zależna od tego, czy dokument jest konsumencki czy między firmami. Kwoty i daty przepisuje w polskim zapisie, 1 234,56 zł, 14.03.2026.

## Czego potrzebujesz

Dowolny płatny plan Claude i dokument w PDF, w Wordzie albo wklejony jako zwykły tekst. Im więcej załączników wgrasz naraz, umowa plus tabela opłat plus harmonogram, tym pełniejsze streszczenie. Żadnych konektorów ani konfiguracji.

## Na czym się wywala

- **Streszcza tylko to, co dostanie.** Polskie dokumenty konsumenckie wypychają koszty do osobnych plików: tabela opłat i prowizji, cennik, OWU, karta produktu, harmonogram. Skill zgłosi, że dokument się na nie powołuje, ale ich nie wymyśli. Umowa leasingu bez tabeli opłat da streszczenie z dziurą w najdroższym miejscu, i tak to zostanie napisane.
- **Nie policzy kwot zależnych od zmiennych.** Rata przy zmiennym oprocentowaniu, czynsz waloryzowany, „opłata według aktualnego cennika”, świadczenie zależne od wyceny rzeczoznawcy. Poda regułę zmiany i powie, że tej pozycji z dokumentu wyliczyć się nie da. Nie zgadnie liczby.
- **Nie wejdzie na stronę po załącznik.** Dokumenty odsyłają do cennika „dostępnego na stronie dostawcy”, skill tam nie zajrzy i nie sprawdzi, czy wersja, którą czyta, jest tą, którą podpisujesz.
- **Dwukolumnowe OWU i słabe skany.** Ubezpieczyciele składają warunki w dwóch kolumnach drobnym drukiem, często ze znakiem wodnym. Przy skanie kolejność czytania potrafi się rozjechać i część wyłączeń wypadnie. Skill powie, czego nie odczytał, ale przy złym skanie lepiej wkleić tekst ręcznie.
- **Jest zbudowany pod polskie dokumenty.** Umowę po angielsku streści, ale bez znajomości tego, gdzie w niej zwykle chowa się koszty. Przy wersji dwujęzycznej pokaże, że dokument wskazuje język rozstrzygający, i nie wybierze za Ciebie, która wersja obowiązuje.

## Czego ten skill nie robi celowo

Nie ocenia. Nie powie, czy zapis jest ryzykowny, czy warunki są uczciwe, ani czy to „standardowa umowa”. Nie odpowie na pytanie „czy mogę to podpisać”. Nie napisze wypowiedzenia, odstąpienia, reklamacji ani maila do drugiej strony, także wtedy, gdy poprosisz drugi raz. Nie ułoży listy zapisów do wykreślenia ani do dopytania przed podpisem.

Nie porówna też dwóch ofert. Streszcza jeden dokument, bo zestawienie dwóch propozycji obok siebie sprowadza się do wskazania, która jest korzystniejsza, a to już ocena.

Do oceny ryzyk służy osobny skill: **Czerwone flagi w umowie**. Ten podział jest celowy. Streszczenie i ocena to dwie różne prace, a narzędzie, które robi obie naraz, kończy jednym zdaniem w rodzaju „w sumie wygląda w porządku”, czyli dokładnie tym, po czym ludzie podpisują rzeczy, których nie przeczytali.

Tutaj dostajesz coś węższego i uczciwszego: pewność, że wiesz, co w dokumencie jest.
