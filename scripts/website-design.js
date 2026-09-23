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
    /* One duration drives BOTH previews so they start and finish together
       (in sync). Slower pace so the desktop doesn't outrun the phone. */
    const dur = Math.min(26, Math.max(9, travel / 90));
    card.style.setProperty('--webd-scroll-dur', dur + 's');
  }

  /* Map the phone's scroll fraction (steady) to the desktop's fraction via the
     site's syncPoints, so the desktop slows on sections that run longer on
     mobile. Falls back to 1:1 (linear) when no points are given. */
  function desktopFrac(card, p) {
    const pts = card.__sync;
    if (!pts || pts.length < 2) return p;
    for (let i = 1; i < pts.length; i++) {
      if (p <= pts[i][0]) {
        const a = pts[i - 1], b = pts[i];
        const span = (b[0] - a[0]) || 1;
        return a[1] + (b[1] - a[1]) * ((p - a[0]) / span);
      }
    }
    return 1;
  }

  /* Hover scroll driven by rAF (not a CSS transition) so the two previews stay
     locked frame-by-frame. The phone is the steady driver; the desktop follows
     the mapping. On leave it eases back to the top a few times faster. */
  function bindScroller(card) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const shot = card.querySelector('.webd-shot');
    const mshot = card.querySelector('.webd-mshot');
    let raf = null, dir = 0, prog = 0, last = 0;

    function apply() {
      const travel = parseFloat(getComputedStyle(card).getPropertyValue('--webd-travel')) || 0;
      const mtravel = parseFloat(getComputedStyle(card).getPropertyValue('--webd-mtravel')) || 0;
      if (shot) shot.style.transform = 'translateY(' + (-travel * desktopFrac(card, prog)) + 'px)';
      if (mshot) mshot.style.transform = 'translateY(' + (-mtravel * prog) + 'px)';
    }
    function tick(now) {
      const dt = (now - last) / 1000; last = now;
      const dur = parseFloat(getComputedStyle(card).getPropertyValue('--webd-scroll-dur')) || 18;
      prog += dir * dt / (dir > 0 ? dur : dur / 3.5);   // return ~3.5x faster
      if (prog > 1) prog = 1; else if (prog < 0) prog = 0;
      apply();
      if ((dir > 0 && prog < 1) || (dir < 0 && prog > 0)) raf = requestAnimationFrame(tick);
      else raf = null;
    }
    function run(d) { dir = d; last = performance.now(); if (!raf) raf = requestAnimationFrame(tick); }
    card.addEventListener('mouseenter', () => run(1));
    card.addEventListener('mouseleave', () => run(-1));
    card.addEventListener('focusin', () => run(1));
    card.addEventListener('focusout', () => run(-1));
  }

  function buildGrid(sites) {
    const grid = document.getElementById('webd-grid');
    if (!grid) return;
    grid.innerHTML = sites.map(cardHTML).join('');
    const cards = grid.querySelectorAll('.webd-card');
    cards.forEach((el, i) => {
      el.style.setProperty('--webd-delay', (i % 2) * 80 + 'ms');
      el.__sync = (sites[i] && sites[i].syncPoints) || null;
      bindScroller(el);
    });

    cards.forEach(card => {
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
      raf = requestAnimationFrame(() => cards.forEach(measureCard));
    });

    reveal(cards);
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
