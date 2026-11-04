/* Wspólny formularz subskrypcji. Źródło: katalog-skilli/szablony.
   Dane formularza i identyfikator ponowienia żyją wyłącznie w pamięci karty. */
(function () {
  'use strict';
  if (window.AiXpertsSubskrypcje) return;
  const VERSION = '2026-09-09';
  const API = 'https://skille.aixperts.pl/api/subskrypcje';
  const SMS = 'Chcę otrzymywać od D-X.PL Michał Jaśkiewicz wiadomości SMS o ofertach, nowościach i promocjach AiXperts i Digital Xperts na podany numer telefonu. Zgodę mogę wycofać w każdej chwili.';
  const EMAIL = 'Chcę otrzymywać od D-X.PL Michał Jaśkiewicz newsletter e-mail o ofertach, nowościach i promocjach AiXperts i Digital Xperts. Zgodę mogę wycofać w każdej chwili.';
  let sequence = 0;

  function bindPhone(input, checkbox, row) {
    let previous = input.value;
    function sync() {
      if (input.value !== previous || !input.value.trim()) checkbox.checked = false;
      previous = input.value;
      row.hidden = !input.value.trim();
      checkbox.disabled = row.hidden;
    }
    input.addEventListener('input', sync);
    input.addEventListener('change', sync);
    input.form?.addEventListener('reset', () => setTimeout(sync, 0));
    sync();
    return sync;
  }

  function mount(target) {
    if (target.dataset.aixReady) return;
    target.dataset.aixReady = '1';
    const source = target.dataset.aixSubskrypcje;
    const id = 'aix-sub-' + (++sequence);
    target.classList.add('aix-sub');
    target.innerHTML = `<form class="aix-sub-form" novalidate>
      <fieldset><legend>Wybierz wiadomości dla siebie</legend>
      <p class="aix-sub-intro">Nowości, narzędzia i szkolenia AiXperts oraz Digital Xperts. Ty wybierasz kanał kontaktu.</p>
      <div class="aix-sub-fields">
        <label for="${id}-email">Adres e-mail <span>(dla newslettera)</span><input id="${id}-email" name="email" type="email" autocomplete="email" maxlength="254" placeholder="twoj@adres.pl"></label>
        <label for="${id}-phone">Telefon <span>(opcjonalnie)</span><input id="${id}-phone" name="telefon" type="tel" autocomplete="tel" maxlength="24" placeholder="np. +48 500 100 200" aria-describedby="${id}-phone-help"></label>
      </div>
      <p class="aix-sub-help" id="${id}-phone-help">Podaj numer z prefiksem kraju, jeśli chcesz wybrać SMS.</p>
      <label class="aix-sub-choice"><input type="checkbox" name="zgodaEmail"><span>${EMAIL}</span></label>
      <label class="aix-sub-choice" data-aix-sms-row hidden><input type="checkbox" name="zgodaSms" disabled><span>${SMS}</span></label>
      <p class="aix-sub-help">Wybory są dobrowolne. E-mail potwierdzisz linkiem. SMS wymaga osobnego potwierdzenia numeru przed rozpoczęciem wysyłki. <a href="https://skille.aixperts.pl/prywatnosc/" target="_blank" rel="noopener">Prywatność i kontakt</a>.</p>
      <button type="submit" class="aix-sub-button">Zapisz wybór</button>
      <p class="aix-sub-status" role="status" aria-live="polite" tabindex="-1"></p>
      </fieldset></form>`;
    const form = target.querySelector('form');
    const email = form.elements.email, phone = form.elements.telefon;
    const emailChoice = form.elements.zgodaEmail, smsChoice = form.elements.zgodaSms;
    const status = form.querySelector('[role=status]'), button = form.querySelector('button');
    bindPhone(phone, smsChoice, form.querySelector('[data-aix-sms-row]'));
    let lastPayload = '', requestId = '';
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (button.disabled) return;
      const payload = {email:email.value.trim(), telefon:phone.value.trim(), zgodaEmail:emailChoice.checked,
        zgodaSms:smsChoice.checked && !smsChoice.disabled, wersja:VERSION, zrodlo:source};
      status.textContent = '';
      if (!payload.zgodaEmail && !payload.zgodaSms) { status.textContent = 'Wybierz e-mail lub SMS, aby zapisać subskrypcję.'; return; }
      if (payload.zgodaEmail && (!payload.email || !email.validity.valid)) { status.textContent = 'Podaj poprawny adres e-mail dla newslettera.'; email.focus(); return; }
      if (payload.zgodaSms && !/^\+[1-9]\d{7,14}$/.test(payload.telefon.replace(/[\s()-]/g,''))) {
        status.textContent = 'Podaj telefon z prefiksem kraju, np. +48 500 100 200.'; phone.focus(); return;
      }
      const signature = JSON.stringify(payload);
      if (signature !== lastPayload) { requestId = crypto.randomUUID(); lastPayload = signature; }
      payload.requestId = requestId;
      button.disabled = true; button.textContent = 'Zapisuję…';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(),15000);
      try {
        const response = await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
        const data = await response.json();
        if (!response.ok || data.ok !== true || data.trwaleZapisano !== true || data.requestId !== requestId) throw new Error('not_confirmed');
        let message = 'Zapisaliśmy Twój wybór.';
        if (payload.zgodaEmail) message += ' Sprawdź e-mail i potwierdź zapis linkiem.';
        if (payload.zgodaSms) message += ' SMS: oczekiwanie na potwierdzenie numeru. Wiadomości reklamowe nie są jeszcze aktywne.';
        status.textContent = message;
        if (typeof data.wypisUrl === 'string') {
          const url = new URL(data.wypisUrl,API);
          if (url.origin === 'https://skille.aixperts.pl' && url.pathname.startsWith('/api/subskrypcje/')) {
            const link = document.createElement('a'); link.href = url.href; link.textContent = 'Zarządzaj tym zapisem lub wycofaj zgodę';
            link.referrerPolicy = 'no-referrer'; status.append(document.createElement('br'),link);
          }
        }
        button.textContent = 'Zapisano';
        form.querySelectorAll('input').forEach(input => { input.disabled = true; });
      } catch {
        status.textContent = 'Nie potwierdzono zapisu. Twoje dane pozostają w formularzu. Spróbuj ponownie.';
        button.disabled = false; button.textContent = 'Spróbuj ponownie';
      } finally { clearTimeout(timeout); }
    });
  }

  function init(root) {
    root.querySelectorAll('[data-aix-subskrypcje]').forEach(mount);
    root.querySelectorAll('[data-aix-sms-phone]').forEach(row => {
      if (row.dataset.aixBound) return;
      const phone = root.querySelector(row.dataset.aixSmsPhone), checkbox = row.querySelector('input[type=checkbox]');
      if (phone && checkbox) { row.dataset.aixBound = '1'; bindPhone(phone,checkbox,row); }
    });
  }
  window.AiXpertsSubskrypcje = {mount,init,bindPhone,version:VERSION,smsText:SMS,emailText:EMAIL};
  init(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',() => init(document),{once:true});
})();
