/* Public AiXperts pages only. No identifiers, query strings or form contents. */
(function () {
  'use strict';
  if (!['aixperts.pl', 'skille.aixperts.pl'].includes(location.hostname)) return;
  const products = ['polityka-ai', 'oferta-behawioralna', 'procedura-aml', 'ksef-procedury', 'rodo-dokumentacja', 'operaty-szacunkowe', 'pracownia', 'bezplatny-skill', 'brak'];
  const places = ['footer', 'navigation', 'content'];
  const publicHosts = ['aixperts.pl', 'skille.aixperts.pl', 'pracownia.aixperts.pl', 'licencje.aixperts.pl', 'd-x.pl'];
  function allowed() {
    return navigator.doNotTrack !== '1' && (typeof window.cmplz_has_consent !== 'function' || window.cmplz_has_consent('statistics') === true);
  }
  function origin(value) {
    try { const u = new URL(value); return /^https?:$/.test(u.protocol) ? u.origin : ''; } catch (_) { return ''; }
  }
  window.aixEcosystemBeforeSend = function (type, payload) {
    if (!allowed() || type !== 'event') return false;
    const clean = { ...payload };
    try { clean.url = new URL(payload.url || location.pathname, location.origin).pathname; } catch (_) { return false; }
    clean.referrer = origin(document.referrer);
    if (payload.name === 'aix_dx_click') {
      const data = payload.data || {};
      if (!places.includes(data.place) || !products.includes(data.product)) return false;
      clean.data = { place: data.place, product: data.product };
    }
    return clean;
  };
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');
    if (!link) return;
    let target;
    try { target = new URL(link.href, location.origin); } catch (_) { return; }
    if (target.protocol !== 'https:' || !publicHosts.includes(target.hostname)) return;
    // Only the public origin crosses domains, including sites with same-origin headers.
    link.referrerPolicy = 'origin';
    if (target.hostname !== 'd-x.pl' || !allowed() || !window.umami) return;
    const id = /^\/skill\/([^/]+)\/$/.exec(location.pathname)?.[1];
    const product = location.pathname === '/pracownia/' ? 'pracownia'
      : products.includes(id) ? id : id ? 'bezplatny-skill' : 'brak';
    const place = link.closest('footer') ? 'footer' : link.closest('nav, header') ? 'navigation' : 'content';
    window.umami.track('aix_dx_click', { place, product });
  }, true);
}());
