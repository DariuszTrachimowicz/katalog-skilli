---
nazwa: Procedury AML dla instytucji obowiązanych
kategoria: Prawo
status: platny
wersja: 1.0.1
platny: true
kotwice: instytucja obowiązana AML, biuro rachunkowe AML
cena: od 890 zł netto
poziom: Zaawansowany
aktualizacja: 2026-08-22
skrot: Buduje z instytucją obowiązaną jej dokumentację AML dopasowaną do realnej działalności, ocenę ryzyka instytucji, procedurę wewnętrzną, ocenę ryzyka klienta liczoną skryptem ze śladem obliczeń, ewidencje i checklisty środków bezpieczeństwa finansowego.
szukaj: AML, pranie pieniędzy, instytucja obowiązana, GIIF, procedura wewnętrzna AML, ocena ryzyka klienta, środki bezpieczeństwa finansowego, beneficjent rzeczywisty, CRBR, biuro rachunkowe, pośrednik nieruchomości, biuro wirtualne, kontrola GIIF, skill płatny, prawo
tytulSeo: Procedura AML dla biura rachunkowego i instytucji obowiązanej, płatny skill
opisSeo: "Dokumentacja AML z realiów Twojej firmy: ocena ryzyka instytucji, procedura wewnętrzna, punktowa ocena ryzyka klienta ze śladem obliczeń, ewidencje i checklisty. Bez martwych wzorów PDF."
zgodnosc:
  claude: ok
  gpt: ok
  gemini: format
---

## Co robi

Prowadzi instytucję obowiązaną przez zbudowanie kompletu dokumentacji AML z jej
własnych realiów, nie z martwego wzoru. Pięć komponentów: ocena ryzyka instytucji
(czynniki działalności z uzasadnieniami, końcowy poziom ryzyka i wniosek, co
z nich wynika dla procedury), projekt procedury wewnętrznej dopasowany do usług
i klientów, model punktowej oceny ryzyka klienta z wagami, skalą i progami
ustalanymi przez instytucję plus oceny konkretnych klientów liczone skryptem ze
śladem obliczeń (wkład każdego czynnika widoczny liczba po liczbie), wzory
ewidencji (dowodów wykonania obowiązków) z instrukcją prowadzenia oraz
checklisty środków bezpieczeństwa finansowego na nawiązanie relacji, jej
trwanie i transakcje okazjonalne. Na koniec checklista spójności kompletu:
czy procedura wynika z oceny instytucji, czy ewidencje pokrywają obowiązki,
czego brakuje.

Każdy dokument wychodzi jako projekt z metryczką wersji i adnotacją do
zatwierdzenia przez kierownictwo i osobę odpowiedzialną za AML.

## Dla kogo

Biura rachunkowe i doradcy podatkowi, pośrednicy nieruchomości, biura wirtualne
i inne firmy ze statusem instytucji obowiązanej (albo podejrzewające, że go
mają), które chcą dokumentacji opisującej ich realną działalność, z
uzasadnieniami przy decyzjach, zamiast martwego wzoru. Także osoby wyznaczone
do AML, które dostały tę rolę "przy okazji" i nie wiedzą, od czego zacząć.

## Ile Ci to oszczędza

Dokumentacja z kancelarii kosztuje zwykle kilka tysięcy złotych i nierzadko
przychodzi jako szablon do samodzielnego dopasowania; wzory z internetu nie
opisują Twojej działalności, więc rozjeżdżają się z nią przy pierwszych
pytaniach o realia. Tu dokumenty powstają z odpowiedzi o Twoją firmę, ocenę
klienta liczy skrypt od ręki zamiast arkusza składanego ręcznie, a przy
zmianie działalności aktualizujesz komplet sam, bez wracania do kancelarii
z każdą poprawką.

## Przykład z życia

Scenariusz fikcyjny, ale liczby prawdziwe: pochodzą z przykładowego modelu
dołączonego do paczki, możesz je przeliczyć sam. Pani Iwona prowadzi biuro
rachunkowe: część klientów działa w branżach gotówkowych, dwie spółki mają
złożoną strukturę właścicielską, nowe relacje coraz częściej zawiera zdalnie.
Skill najpierw buduje z nią ocenę ryzyka biura, potem procedurę, w której
katalog sygnałów dotyczy usług księgowych, a nie generycznego banku. Model
oceny klienta dostaje trzy czynniki z wagami 40/35/25 i uzasadnieniami; dla
klienta z regularnymi wpłatami gotówkowymi i w pełni zdalną relacją skrypt
wylicza 2,90 pkt na skali 1-4 (poziom standardowy, tuż pod progiem wysokiego),
a ślad pokazuje, że największy wkład, 1,20 pkt, wnosi gotówka. Na prośbę
"dajmy stałemu klientowi niskie bez liczenia" odmawia i tłumaczy, dlaczego
ocena dobrana pod wynik jest nic niewarta.

## Jak po polsku

W całości pod polską ustawę AML i polskie instytucje: GIIF, CRBR i realia
biura rachunkowego czy pośrednika. Wartości zmienne (progi kwotowe,
terminy, lista państw wysokiego ryzyka, kary) nie są zaszyte w treści jako
pewnik, tylko jawnie oznaczone do weryfikacji ze wskazaniem źródła na gov.pl,
więc dokument nie starzeje się po cichu. Stan prawny referencji ma jawną datę,
a skill sam przypomina o weryfikacji po 6 miesiącach.

## Czego potrzebujesz

Wiedzy o własnej firmie (usługi, klienci, przepływy, kto odpowiada za AML) i
komputera z Pythonem 3.10+ do skryptu punktacji (na Windows polecenie `python`
albo `py`; skrypt działa na czystym Pythonie, bez bibliotek). Plików JSON nie
piszesz ręcznie: asystent buduje je z Twoich odpowiedzi i pokazuje do
akceptacji. Skill nie łączy się z żadnymi rejestrami (KRS, CRBR, listy
sankcyjne): mówi, co i gdzie sprawdzić, wyniki wpisujesz sam.

## Na czym się wywala

- Nie rozstrzygnie, czy Twoja firma jest instytucją obowiązaną: pomoże to
  ustalić pytaniami o usługi, ale kwalifikację oznacza jako wymagającą
  weryfikacji z ustawą, bo o statusie rozstrzyga katalog ustawowy, nie skill.
- Progi kwotowe, terminy zgłoszeń, lista państw wysokiego ryzyka i kary są w
  dokumentach oznaczane do weryfikacji u źródła, nie wpisane na sztywno;
  jeśli oczekujesz gotowca z wpisanymi progami, ten skill celowo tak nie robi.
- Nie generuje zawiadomień do GIIF ani żadnych pism do klienta o wstrzymaniu
  czy zgłoszeniu (ustawowy zakaz ujawniania ma wyjątki, ale ich ocena to
  praca dla prawnika, więc odmowa skilla jest bezwyjątkowa); z okoliczności
  podejrzanych robi najwyżej wewnętrzną notatkę stanu faktycznego.
- Skrypt punktacji wymaga Pythona 3.10+; bez niego zostaje budowa dokumentów
  bez liczenia ocen.
- Kupiona wersja jest Twoja bezterminowo, a klucz licencji daje dostęp do
  aktualizacji paczki (w tym referencji stanu prawnego) przez 12 miesięcy od
  zakupu.
- Nie obsługuje grup kapitałowych i procedur grupowych w tym wydaniu.

## Czego ten skill nie robi celowo

Nie orzeka zgodności z ustawą ani "gotowości na kontrolę", nie ocenia, czy
transakcja jest podejrzana (strukturyzuje przesłanki, decyzję podejmuje osoba
odpowiedzialna), nie dobiera ocen i wag pod oczekiwany poziom ryzyka nawet na
prośbę, nie pisze klientom wyjaśnień, które ujawniałyby zgłoszenie albo
analizę, i nie wypełnia formularzy GIIF. Robi tak, bo dokumentacja AML ma
chronić instytucję przy kontroli, a każdy z tych skrótów zamienia ją w dowód
przeciwko niej; wartość narzędzia siedzi w uzasadnieniach i śladzie obliczeń,
które da się obronić.
