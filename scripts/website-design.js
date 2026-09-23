/* website-design.js — Section 02: Iconiq Creatives website portfolio.
   Each card shows a full-page DESKTOP screenshot in a browser frame plus a
   MOBILE screenshot in an iPhone 17 Pro frame overlapping the corner. On hover
   both previews scroll from top to bottom; the card links to the live site. */

(function () {
  'use strict';

  function shotURL(site) {
    if (site.thumb) return site.thumb;
    if (/^https?:\/\//.test(site.url || '')) {
      return 'https://image.thum.io/get/width/1000/fullpage/' + site.url;
    }
    return '';
  }
  function mobileShotURL(site) {
    return site.mobileThumb || '';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function initials(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '★';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function hostLabel(site) {
    try {
      if (site.url && /^https?:\/\//.test(site.url)) {
        const h = new URL(site.url).hostname.replace(/^www\./, '');
        if (h) return h;
      }
    } catch (_) {}
    return String(site.id || site.name || 'website')
      .toLowerCase().replace(/[^a-z0-9]+/g, '') + '.com';
  }

  function cardHTML(site, i) {
    const accent = site.accent || '#41BDFE';
    const name = esc(site.name);
    const cat = esc(site.category || 'Website');
    const host = esc(hostLabel(site));
    const mono = esc(initials(site.name));
    const url = esc(site.url || '#');
    const shot = shotURL(site);
    const mshot = mobileShotURL(site);

    const img = shot
      ? '<img class="webd-shot" src="' + esc(shot) + '" alt="' + name + ' website" ' +
        'loading="lazy" decoding="async" draggable="false" onerror="this.remove()">'
      : '';

    /* iPhone 17 Pro mock overlapping the bottom-right corner. */
    const phone = mshot
      ? '<span class="webd-phone" aria-hidden="true">' +
          '<span class="webd-phone__island"></span>' +
          '<span class="webd-phone__screen">' +
            '<img class="webd-mshot" src="' + esc(mshot) + '" alt="" ' +
              'loading="lazy" decoding="async" draggable="false" onerror="this.remove()">' +
          '</span>' +
        '</span>'
      : '';

    return '' +
      '<div class="webd-card' + (mshot ? ' has-phone' : '') + '" style="--webd-accent:' + esc(accent) + '" data-idx="' + i + '">' +
        '<span class="webd-card__frame">' +
          '<span class="webd-card__bar" aria-hidden="true">' +
            '<span class="webd-card__dots"><i></i><i></i><i></i></span>' +
            '<span class="webd-card__url">' + host + '</span>' +
          '</span>' +
          '<span class="webd-card__viewport">' +
            '<span class="webd-card__fallback" aria-hidden="true">' +
              '<span class="webd-card__mono">' + mono + '</span>' +
            '</span>' +
            img +
            '<span class="webd-card__visit" aria-hidden="true">' +
              'Visit site ' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
                'stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>' +
            '</span>' +
          '</span>' +
        '</span>' +
        phone +
        '<span class="webd-card__meta">' +
          '<span class="webd-card__name">' + name + '</span>' +
          '<span class="webd-card__cat">' + cat + '</span>' +
        '</span>' +
        '<a class="webd-card__link" href="' + url + '" target="_blank" rel="noopener noreferrer" ' +
           'aria-label="' + name + ' — open live site in new tab"></a>' +
      '</div>';
  }

  function reveal(els) {
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in-view')); return; }
    const o = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); o.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => o.observe(e));
  }

  /* Work out how far each preview scrolls (rendered height − visible height)
     and set one hover duration so both finish together. */
  function measureCard(card) {
    if (!card) return;
    const shot = card.querySelector('.webd-shot');
    const vp = card.querySelector('.webd-card__viewport');
    let travel = 0;
    if (shot && vp) {
      travel = Math.max(0, shot.clientHeight - vp.clientHeight);
      card.style.setProperty('--webd-travel', travel + 'px');
    }
    const mshot = card.querySelector('.webd-mshot');
    const pscr = card.querySelector('.webd-phone__screen');
    let mtravel = 0;
    if (mshot && pscr) {
      mtravel = Math.max(0, mshot.clientHeight - pscr.clientHeight);
      card.style.setProperty('--webd-mtravel', mtravel + 'px');
    }
    /* One duration drives BOTH previews so they stay in sync (start and finish
       together). Based on the desktop travel — the longer of the two — so the
       desktop is a touch slower and the phone keeps pace. */
    const dur = Math.min(22, Math.max(6, travel / 115));
    card.style.setProperty('--webd-scroll-dur', dur + 's');
  }

  function buildGrid(sites) {
    const grid = document.getElementById('webd-grid');
    if (!grid) return;
    grid.innerHTML = sites.map(cardHTML).join('');
    grid.querySelectorAll('.webd-card').forEach((el, i) => {
      el.style.setProperty('--webd-delay', (i % 2) * 80 + 'ms');
    });

    grid.querySelectorAll('.webd-card').forEach(card => {
      const shot = card.querySelector('.webd-shot');
      const mshot = card.querySelector('.webd-mshot');
      const onShot = () => { card.classList.add('is-live'); measureCard(card); };
      const onM = () => { card.classList.add('is-live-m'); measureCard(card); };
      if (shot) { (shot.complete && shot.naturalHeight) ? onShot() : shot.addEventListener('load', onShot); }
      if (mshot) { (mshot.complete && mshot.naturalHeight) ? onM() : mshot.addEventListener('load', onM); }
    });

    let raf = null;
    window.addEventListener('resize', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => grid.querySelectorAll('.webd-card').forEach(measureCard));
    });

    reveal(grid.querySelectorAll('.webd-card'));
  }

  async function init() {
    if (!window.PortfolioData || !document.getElementById('webd-grid')) return;
    let data;
    try { data = await window.PortfolioData.loadWebsites(); } catch (e) { return; }
    const sites = (data && data.websites) || [];
    if (sites.length) buildGrid(sites);
  }
  document.addEventListener('DOMContentLoaded', init);
})();
