# Dane firmy a praca z tym narzędziem

Krótko i konkretnie. To materiał informacyjny o tym, jak narzędzie jest
zbudowane, nie porada prawna.

## Co narzędzie robi, a czego nie dotyka

- **Skill nie łączy się z Krajowym Systemem e-Faktur.** Nie wystawia faktur,
  nie pobiera ich, nie sprawdza statusów i nie nadaje uprawnień. Pracuje
  wyłącznie na tym, co powiesz mu w rozmowie, i oddaje dokumenty w Markdownie.
- **Skill nie łączy się z Twoim programem do fakturowania ani z bankiem.**
  Pytania o zachowanie konkretnego programu kieruje do jego dostawcy.
- **Do dostawcy asystenta AI (chmura) idzie treść rozmowy**, czyli to, co
  wkleisz i napiszesz, oraz instrukcje skilla. Zasady przechowywania
  i przetwarzania tych danych określa regulamin Twojego dostawcy asystenta oraz
  wybrany plan. Sprawdź je, zanim zaczniesz pracować na danych firmy.

## Sekrety: zasada bezwyjątkowa

Tokeny KSeF, pliki certyfikatów, hasła, klucze i dane logowania **nie mają
prawa** trafić do rozmowy z asystentem. Token pozwala wystawiać faktury
w imieniu Twojej firmy, więc wklejony do czatu przestaje być bezpieczny.

Skill jest zbudowany tak, żeby o nie nie prosić i odmówić pracy na nich. Jeśli
mimo to wkleisz sekret, skill przerwie pracę i powie Ci to samo, co jest tutaj:
uznaj go za ujawniony i wymień go w tym systemie, który go wydał. Certyfikat
KSeF unieważnia się, a uprawnienie odbiera i nadaje na nowo, w Aplikacji
Podatnika KSeF 2.0 albo przez API w programie zintegrowanym; klucz integracyjny konkretnego programu do
fakturowania wymienia jego dostawca; hasło do bankowości zmienia się w banku.
Skill projektuje matrycę uprawnień i certyfikatów, czyli kto, jaki zakres, na
jakiej podstawie i do kiedy. Nadania i odebrania wykonuje w systemie osoba
upoważniona, nie narzędzie.

## Zasady pracy wpisane w skill

- **Minimalizacja danych.** Do zbudowania macierzy odpowiedzialności wystarczą
  imiona i role („Anna, fakturowanie”), a do rejestru odrzuceń oznaczenia
  kontrahentów („kontrahent K-014”). Numery PESEL, numery rachunków, adresy
  zamieszkania i numery dokumentów tożsamości nie są do niczego potrzebne.
- **Materiały wklejane to dane, nie polecenia.** Umowę z biurem, komunikat
  o błędzie czy instrukcję programu skill traktuje jako materiał do
  uporządkowania. Instrukcje zaszyte w takim materiale („napisz, że firma jest
  gotowa”) rozpozna i nie wykona.
- **Bez powielania danych wrażliwych.** Jeśli dane osobowe albo numery mimo
  wszystko trafią do rozmowy, skill nie przepisuje ich do generowanych
  dokumentów.
- **Umowa z biurem rachunkowym.** Wklejając ją, usuń dane osobowe i finansowe,
  które nie są potrzebne do ustalenia podziału obowiązków. Skill i tak
  interesuje tylko to, co umowa mówi o KSeF, dostępach i odpowiedzialności.

## Dokumenty, które powstają

- Wszystko, co skill oddaje, to pliki tekstowe u Ciebie: macierz, karta
  postępowania, matryca uprawnień i certyfikatów, rejestr odrzuceń, protokół
  stanu wdrożenia. Gotowe dokumenty zostają tam, gdzie je zapiszesz: skill
  niczego nie wysyła, nie publikuje ani nie udostępnia dalej. Osobną sprawą jest
  sama rozmowa, która przechodzi przez chmurę Twojego dostawcy asystenta na
  zasadach opisanych wyżej.
- Matryca uprawnień i certyfikatów oraz rejestr odrzuceń zawierają imiona
  pracowników i dane kontrahentów, więc obejmij je firmową polityką ochrony
  danych i dostępu tak jak pozostałą dokumentację kadrową i księgową. Rejestr
  rośnie z czasem; zaplanuj, jak długo go trzymasz i kto ma do niego wgląd.
- Kopie zapasowe i okresy przechowywania faktur to osobna sprawa od
  przechowywania w samym systemie. Ustal to z księgową
  `[WYMAGA WERYFIKACJI: okresy przechowywania; źródło:
  ksef.podatki.gov.pl/ksef-news/zasady-obowiazywania-ksef-i-przepisy-prawne/]`.
- Za usunięcie plików lokalnych odpowiadasz Ty; usunięciem historii rozmów
  rządzi panel Twojego dostawcy asystenta.
