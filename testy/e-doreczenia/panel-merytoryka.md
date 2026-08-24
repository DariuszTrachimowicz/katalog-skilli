# Panel QA: merytoryka skilla `e-doreczenia-w-firmie`

Data weryfikacji: 24 sierpnia 2026 r. Ocena dotyczy błędów i ryzyk
merytorycznych, nie stylu.

## Ustalenia krytyczne i poważne

1. **BLOKER: fikcja doręczenia jest przedstawiona jako skutek niezałożenia
   skrzynki i jako reguła dla każdego pisma.** Tak nie jest. Brak ADE/skrzynki
   nie powoduje, że korespondencja wpływa do nieistniejącej skrzynki i po 14
   dniach zostaje doręczona elektronicznie. Reguła dotyczy korespondencji
   przesłanej przez podmiot publiczny na ADE podmiotu niepublicznego i
   nieodebranej w terminie. Ustawa wskazuje jako dzień doręczenia **dzień
   następujący po upływie 14 dni** od dnia wpłynięcia wskazanego w dowodzie
   otrzymania, a nie ogólnie „po 14 dniach”. Przepisy stosuje się odpowiednio
   także do ADE obsługiwanego przez kwalifikowanego dostawcę. Do poprawy:
   `skille/e-doreczenia-w-firmie/SKILL.md:10-13`,
   `skille/e-doreczenia-w-firmie/SKILL.md:69-73`,
   `skille/e-doreczenia-w-firmie/SKILL.md:102-104`,
   `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:42-46`,
   `skille/e-doreczenia-w-firmie/wpis.md:38-39` oraz
   `skille/e-doreczenia-w-firmie/wpis.md:49-51`. Trzeba osobno opisać:
   wpływ, faktyczne odebranie, fikcję doręczenia i sposób liczenia terminu z
   właściwej procedury.

2. **BLOKER: harmonogram jest niepełny, a Krok 1 nie zbiera danych potrzebnych
   do poprawnej odpowiedzi.** Dla CEIDG wpisanej do 31 grudnia 2024 r. termin
   1 października 2026 r. jest poprawną ramą, ale od 1 lipca 2025 r. obowiązek
   powstaje wcześniej przy składaniu wniosku o zmianę wpisu. Skill pyta tylko
   o rok wpisu, a nie o zmianę po 30 czerwca 2025 r. Pomija też podmioty wpisane
   do rejestru przedsiębiorców KRS przed 2025 r., objęte obowiązkiem od 1
   kwietnia 2025 r. Do poprawy:
   `skille/e-doreczenia-w-firmie/SKILL.md:29-31` i
   `skille/e-doreczenia-w-firmie/SKILL.md:34-42`. Ten sam błąd przechodzi do
   przykładu: sam wpis z 2011 r. nie wystarcza, aby bez pytania o późniejszą
   zmianę wskazać 1 października 2026 r. jako właściwy termin:
   `skille/e-doreczenia-w-firmie/wpis.md:43-46` oraz
   `skille/e-doreczenia-w-firmie/wpis.md:63-66`.

3. **BLOKER: jedna sekwencja miesza usługę publiczną z kwalifikowaną.** Wniosek
   przez Biznes.gov.pl jest ścieżką uzyskania publicznego ADE i skrzynki u
   operatora wyznaczonego. Jeżeli firma wybiera usługę kwalifikowaną, najpierw
   zawiera ją i zakłada ADE u wybranego KDU, a następnie zapewnia wpis tego ADE
   do BAE, np. przez dane przekazywane przez KDU albo właściwy wniosek
   rejestrowy. Nie można najpierw wykonać jednego wspólnego „wniosku o ADE”, a
   dopiero potem wybrać publiczną albo kwalifikowaną skrzynkę. Wpis do BAE nie
   jest też w obu wariantach identycznym ręcznym trzecim krokiem. Do przebudowy:
   `skille/e-doreczenia-w-firmie/SKILL.md:44-51` i opis skrócony w
   `skille/e-doreczenia-w-firmie/wpis.md:55-58`.

4. **POWAŻNE: wybór dostawcy oparto niemal wyłącznie na liczbie pism.** Liczba
   przesyłek nie jest głównym kryterium. Istotne są przede wszystkim strony
   korespondencji (urząd czy także firma-firma/osoby prywatne), integracja z
   obiegiem dokumentów, role i uprawnienia, archiwizacja, SLA, pojemność,
   dodatkowe powiadomienia i koszt. Mała firma może potrzebować KDU do
   korespondencji B2B, a duża może pozostać przy usłudze publicznej do kontaktu
   z urzędami. Do poprawy: `skille/e-doreczenia-w-firmie/SKILL.md:47-49` oraz
   obietnica rozróżnienia w `skille/e-doreczenia-w-firmie/wpis.md:35-37`.

5. **BLOKER: procedura dostępu sugeruje pełnomocnictwo lub współdzielony login
   zamiast imiennych uprawnień.** Pełnomocnik ani reprezentant nie dostaje
   dostępu automatycznie. W publicznej skrzynce administrator dodaje użytkownika
   i nadaje mu uprawnienia; użytkownik korzysta z własnego uwierzytelnienia.
   Samo pełnomocnictwo dla małżonka lub biura rachunkowego nie daje dostępu
   technicznego. Zapisanie „loginu i sposobu odzyskania dostępu” w miejscu
   znanym dwóm osobom zachęca do współdzielenia tożsamości i mechanizmu
   odzyskiwania. Zamiast tego trzeba ustanowić co najmniej dwie imiennie
   uprawnione osoby, jeśli model firmy na to pozwala. Do poprawy:
   `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:3-8`,
   `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:20-24`,
   `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:47-48` oraz
   `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:66-72`.
   Sama rada, że biuro rachunkowe **nie widzi skrzynki automatycznie**, jest
   trafna. Należy dopisać, że dostęp nadaje się imiennie, w uzgodnionym zakresie,
   a pełnomocnictwo do reprezentacji i uprawnienie w systemie to dwie różne
   rzeczy.

6. **POWAŻNE: brakuje wymagań dotyczących reprezentacji i administratora.**
   Wniosek może składać reprezentant albo pełnomocnik; zależnie od sytuacji
   potrzebny jest dokument umocowania, pełnomocnictwo i potwierdzenie opłaty.
   Podmiot niebędący osobą fizyczną, w tym spółka KRS, musi wyznaczyć
   administratora; przedsiębiorca CEIDG może zarządzać skrzynką sam albo go
   wyznaczyć. Aktywacji publicznej skrzynki dokonuje administrator. Ogólne
   „wyznaczenie osób” nie wystarcza jako instrukcja zakładania:
   `skille/e-doreczenia-w-firmie/SKILL.md:44-46` i
   `skille/e-doreczenia-w-firmie/SKILL.md:50-54`. Metody podpisu: profil
   zaufany, e-dowód albo podpis kwalifikowany są podane poprawnie.

7. **BLOKER: reguła antyphishingowa „nadawca spoza gov.pl” jest fałszywie
   kategoryczna.** Skill sam dopuszcza kwalifikowanych dostawców, których
   legalne powiadomienia i logowanie działają w domenach dostawcy, nie w
   `gov.pl`. Także sama obecność tekstu `gov.pl` nie potwierdza autentyczności
   linku lub nadawcy. Bezpieczna rada powinna brzmieć: dla skrzynki publicznej
   wejść ręcznie przez zapisany adres Biznes.gov.pl/e-Doręczeń, a dla KDU przez
   znaną z umowy stronę lub aplikację dostawcy; nie logować się przez link z
   podejrzanej wiadomości. Do poprawy:
   `skille/e-doreczenia-w-firmie/SKILL.md:61-68`. Obecna reguła może odrzucić
   prawdziwe powiadomienie KDU i jednocześnie dać fałszywe poczucie
   bezpieczeństwa wobec sprytnie spreparowanego linku.

8. **POWAŻNE: skill zgłasza fałszywe „sytuacje nietypowe” i odmawia odpowiedzi
   także w zwykłych przypadkach.** Zawieszenie działalności nie usuwa obowiązku;
   samo zawieszenie przez zmianę CEIDG po 30 czerwca 2025 r. może uruchomić
   wcześniejszy obowiązek. Zawody zaufania publicznego mają określony termin od
   1 stycznia 2025 r. i mogą wymagać odrębnego ADE od ADE firmy. Likwidacja
   wymaga sprawdzenia aktualnego wpisu i reprezentacji, ale nie uzasadnia
   ogólnej tezy, że „rozstrzyga urząd albo prawnik”. Prawnik nie wydaje
   wiążącego rozstrzygnięcia, a urząd nie jest uniwersalnym organem wydającym
   decyzję o podleganiu harmonogramowi. Do poprawy:
   `skille/e-doreczenia-w-firmie/SKILL.md:40-42` oraz
   `skille/e-doreczenia-w-firmie/wpis.md:72-76`.

9. **POWAŻNE: granica skilla przeczy jego podstawowej obietnicy.** Skill
   obiecuje powiedzieć, „czy i od kiedy” obowiązek dotyczy firmy, po czym każe
   zawsze odmawiać odpowiedzi również w prostym stanie faktycznym. Można podać
   niewiążący wniosek z aktualnego harmonogramu bez udawania indywidualnej
   opinii prawnej. Do ujednolicenia:
   `skille/e-doreczenia-w-firmie/SKILL.md:14-16`,
   `skille/e-doreczenia-w-firmie/SKILL.md:78-82`,
   `skille/e-doreczenia-w-firmie/wpis.md:20-25` i
   `skille/e-doreczenia-w-firmie/wpis.md:84-87`. Obecna treść jednocześnie
   obiecuje rezultat i programuje odmowę jego dostarczenia.

10. **POWAŻNE: „KRS” jest używane zbyt szeroko.** Obowiązek przedsiębiorców
    dotyczy podmiotów wpisanych do **rejestru przedsiębiorców KRS**, nie każdego
    podmiotu mającego jakikolwiek wpis w KRS. Fundacja lub stowarzyszenie tylko
    w rejestrze stowarzyszeń nie powinny zostać zakwalifikowane na podstawie
    samego hasła „KRS”. Do doprecyzowania:
    `skille/e-doreczenia-w-firmie/SKILL.md:10`,
    `skille/e-doreczenia-w-firmie/SKILL.md:29-31`,
    `skille/e-doreczenia-w-firmie/SKILL.md:38-39` oraz
    `skille/e-doreczenia-w-firmie/wpis.md:29-31`.

## Pozostałe miejsca mogące wprowadzić w błąd

11. **ADE, skrzynka i BAE nie są wprost utożsamione, ale opis jest za mało
    precyzyjny.** ADE jest adresem identyfikującym nadawcę lub adresata,
    skrzynka jest narzędziem obsługi usługi, a BAE jest rejestrem adresów.
    Ustawowa definicja „skrzynki doręczeń” dotyczy usługi publicznej; przy KDU
    bezpieczniej mówić o ADE i usłudze/interfejsie dostawcy. Sformułowanie
    „skrzynka prowadzona u: publiczna / dostawca kwalifikowany” narzuca obu
    wariantom ten sam model ról, choć KDU może mieć własny:
    `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:20-24`.

12. **Definicja jako listu „od urzędów” jest zbyt wąska.** e-Doręczenia służą
    także do wysyłania korespondencji do podmiotów publicznych, a usługa
    kwalifikowana również do korespondencji między podmiotami niepublicznymi.
    To uproszczenie zubaża wybór usługi i może sugerować, że skrzynka jest tylko
    bierną skrzynką odbiorczą: `skille/e-doreczenia-w-firmie/SKILL.md:3`,
    `skille/e-doreczenia-w-firmie/SKILL.md:8-16` oraz
    `skille/e-doreczenia-w-firmie/wpis.md:18-23`.

13. **Otwarcie pisma nie jest neutralnym podglądem.** Odebranie to działanie,
    dzięki któremu adresat może zapoznać się z dokumentem; chwila odebrania jest
    chwilą doręczenia. Procedura powinna kazać pobrać dowód otrzymania, zapisać
    dokładną datę i godzinę oraz od razu przekazać sprawę właściwej osobie.
    Obecne „otwiera się w dniu zauważenia” nie wyjaśnia skutku:
    `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:34-40`.

14. **Termin nie zawsze wynika wyłącznie z treści pisma.** Może wynikać z
    ustawy procesowej lub pouczenia, a błędne albo brakujące pouczenie nie zawsze
    oznacza brak terminu. Skill słusznie zabrania zgadywania, ale powinien mówić:
    „w piśmie nie widzę terminu; trzeba sprawdzić rodzaj sprawy, podstawę prawną
    i pouczenie”, zamiast sugerować, że wystarczy odczyt samej treści. Do
    doprecyzowania: `skille/e-doreczenia-w-firmie/SKILL.md:69-74`,
    `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:36-39` oraz
    `skille/e-doreczenia-w-firmie/wpis.md:79-80`.

15. **Cotygodniowe sprawdzanie i jedno przypomnienie pięć dni przed końcem są
    za słabym wzorcem operacyjnym.** Nie jest to błąd ustawowy, ale może zabrać
    znaczną część krótkiego terminu. Bezpieczny wzorzec to kontrola w każdy dzień
    roboczy lub co najmniej procedura reagowania codziennie na powiadomienia,
    zastępstwo i eskalacja tego samego dnia; przypomnienia należy dopasować do
    długości terminu. Miejsca ryzyka:
    `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:27-32`,
    `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:38-39`,
    `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:43-46` oraz
    `skille/e-doreczenia-w-firmie/wpis.md:47-50`.

16. **Marketingowa obietnica ochrony jest zbyt mocna.** Procedura zmniejsza
    ryzyko, ale nie „chroni” sama z siebie przed przegapieniem pisma, awarią
    powiadomień ani błędem człowieka. Do złagodzenia:
    `skille/e-doreczenia-w-firmie/wpis.md:33-39`.

## Elementy merytorycznie trafne

- Data 1 października 2026 r. jest nadal właściwa dla podmiotów wpisanych do
  CEIDG do 31 grudnia 2024 r., o ile obowiązek nie powstał wcześniej przy
  zmianie wpisu. Ostrożność z powodu wcześniejszych przesunięć terminów jest
  zasadna.
- Podane metody podpisu wniosku publicznego są poprawne:
  `skille/e-doreczenia-w-firmie/SKILL.md:45-46`.
- Publiczna usługa jest co do zasady bezpłatna dla firmy, a usługa KDU
  komercyjna; ADE musi być wpisany do BAE, aby realizował ustawowy obowiązek.
- Rada, aby nie zakładać automatycznego dostępu biura rachunkowego, jest dobra:
  `skille/e-doreczenia-w-firmie/references/procedura-firmowa.md:70-72`.
- Zakaz przekazywania haseł skillowi i ręczne wejście na znaną stronę zamiast
  klikania podejrzanego linku są prawidłowe.

## Źródła weryfikacyjne

- [Ustawa o doręczeniach elektronicznych, tekst jednolity Dz.U. 2026 poz. 3](https://eli.gov.pl/eli/DU/2026/3/ogl)
  - w szczególności art. 2, 19, 28, 41-44 i 151-152.
- [Aktualny harmonogram e-Doręczeń](https://www.gov.pl/web/e-doreczenia/harmonogram).
- [E-Doręczenia dla przedsiębiorców, Biznes.gov.pl](https://biznes.gov.pl/pl/portal/004495).
- [CEIDG: obowiązek przy zmianach od 1 lipca 2025 r.](https://www.gov.pl/web/cyfryzacja/kolejny-etap-wdrazania-e-doreczen--adres-potrzebny-przy-zmianach-w-ceidg).
- [Zakładanie i aktywacja publicznej skrzynki](https://www.gov.pl/web/e-doreczenia/jak-zalozyc-adres-i-skrzynke-do-e-doreczen2).
- [FAQ e-Doręczeń: zawieszenie, administrator i dostęp](https://www.gov.pl/web/e-doreczenia/pytania-i-odpowiedzi).
- [Kwalifikowani dostawcy usług](https://www.gov.pl/web/e-doreczenia/kwalifikowani-dostawcy-uslug-kdu).
- [Projekt nowelizacji z lipca 2026 r.](https://www.gov.pl/web/e-doreczenia/projekt-nowelizacji-przepisow-o-e-doreczeniach--najnowsze-zmiany)
  - na dzień oceny jest projektem, nie podstawą do pomijania obowiązującego
  harmonogramu.

## WERDYKT

Przed wydaniem trzeba co najmniej poprawić zakres i moment fikcji doręczenia,
pełny harmonogram CEIDG/KRS, rozdzielić ścieżkę publiczną od KDU, zastąpić
współdzielanie loginu imiennymi uprawnieniami oraz usunąć fałszywą regułę, że
każdy nadawca lub sposób logowania spoza `gov.pl` jest podejrzany.

**WERDYKT: blokery do wydania TAK.**
