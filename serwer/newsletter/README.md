# Newsletter AiXperts: host i utrzymanie

`https://newsletter.aixperts.pl` obsluguje potwierdzenia i wypisy wspolnej uslugi subskrypcji. Root jest strona informacyjna; aktualny formularz pozostaje na d-x.pl. Nie tworzy drugiej bazy, nowego kanalu zgody ani kolejki.

## Routing produkcyjny (10 IX 2026)

DNS autorytatywny to dhosting (ns1/ns2.dhosting.pl). Istniejacy wildcard CNAME wskazuje aixperts.pl -> 92.112.180.69. Nie dodano rekordu w Hostinger i nie zmieniono DNS.

CloudPanel: osobna witryna newsletter.aixperts.pl, uzytkownik techniczny newsletter, bez zmian hasel istniejacych kont. Vhost `/etc/nginx/sites-enabled/newsletter.aixperts.pl.conf`, root `/home/newsletter/htdocs/newsletter.aixperts.pl`. Certyfikat Let's Encrypt i odnawianie natywne CloudPanel.

Dokladnie cztery sciezki proxy: `/api/subskrypcje`, `/api/subskrypcje/potwierdz`, `/api/subskrypcje/wypisz` oraz `/api/wypisz` (alias dawnych potwierdzonych zapisow, dodany z kampaniami CRM 1.4.0, 10 IX). Dodatkowo dozwolone CSS i fonty istniejacych stron potwierdzenia. Pozostale API/strony 404. Backend: 127.0.0.1:8790 -> katalog-skilli-web-1 -> zapisy:8788. Stare linki skille.aixperts.pl pozostaja wazne. Legacy GET `/api/wypisz` z prawdziwym tokenem wycofuje zgode: nie otwierac go w testach odczytowych. Kontrole routingu wykonywac bez tokenu.

Konfiguracja aplikacji `subskrypcjeBazaUrl` wskazuje nowy host; pole `domena` katalogu pozostaje bez zmian. Prawdziwe source/origin zapisu pozostaja zachowane. Brak samodzielnego nowego formularza na root.

## Prywatnosc i wdrozenie

Nowy host nie loguje URL. Potwierdzenia/wypisy nie loguja URL takze w starym vhoscie skille i wewnetrznym nginx. Odpowiedzi nowego hosta: no-store, no-referrer, noindex, CSP form-action self. Nie dodawac zewnetrznych skryptow/statystyk na stronach z tokenami.

Wspolna blokada wdrozen: `/run/lock/aixperts-newsletter-deploy.lock`. Przed zapisem porownac pliki i runtime, zrobic prywatna kopie, `nginx -t`, lagodny reload, potem sprawdzenie HTTPS i obu starych/nowych tras. Zmiana wewnetrznego nginx musi trafic do `serwer/nginx-kontener.conf` i obrazu web; sama zmiana runtime zniknie przy rebuild.

Kopie wydania: `/opt/aixperts-deployments/20260910-newsletter-domain`. Brak tokenow, hasel i danych odbiorcow w lokalnych wynikach. Odbior hosta nie jest dowodem otrzymania e-maila ani zakonczonego wypisu: te kroki odbiera oddzielnie pilot CRM.
