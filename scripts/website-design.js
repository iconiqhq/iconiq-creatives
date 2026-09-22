/* website-design.js — Section 02: Iconiq Creatives website portfolio.
   Each card shows a full-page screenshot of the LIVE website. On hover the
   screenshot scrolls from top to bottom, previewing the whole page; the card
   links to the live site (new tab). A branded monogram sits behind as a
   fallback while the shot loads or if it can't be fetched. */

(function () {
  'use strict';

  /* Full-page screenshot service (no key needed). A local `thumb` in the
     JSON overrides it. width/1000 keeps files reasonable; fullpage captures
     the entire scroll height so there's a real page to scroll through. */
  function shotURL(site) {
    if (site.thumb) return site.thumb;
    if (/^https?:\/\//.test(site.url || '')) {
      return 'https://image.thum.io/get/width/1000/fullpage/' + site.url;
    }
    return '';
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

    /* Screenshot layer — removes itself on error so the fallback shows. */
    const img = shot
      ? '<img class="webd-shot" src="' + esc(shot) + '" alt="' + name + ' website" ' +
        'loading="lazy" decoding="async" draggable="false" onerror="this.remove()">'
      : '';

    return '' +
      '<div class="webd-card" style="--webd-accent:' + esc(accent) + '" data-idx="' + i + '">' +
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

  /* Once the shot loads, work out how far it scrolls (its rendered height
     minus the visible viewport) and set a duration for a steady speed. */
  function measure(img) {
    const card = img.closest('.webd-card');
    const vp = img.closest('.webd-card__viewport');
    if (!card || !vp) return;
    const travel = Math.max(0, img.clientHeight - vp.clientHeight);
    const dur = Math.min(16, Math.max(4, travel / 130));   // ~130px/sec
    card.style.setProperty('--webd-travel', travel + 'px');
    card.style.setProperty('--webd-scroll-dur', dur + 's');
    card.classList.add('is-live');
  }

  function buildGrid(sites) {
    const grid = document.getElementById('webd-grid');
    if (!grid) return;
    grid.innerHTML = sites.map(cardHTML).join('');
    grid.querySelectorAll('.webd-card').forEach((el, i) => {
      el.style.setProperty('--webd-delay', (i % 3) * 70 + 'ms');
    });

    grid.querySelectorAll('.webd-shot').forEach(img => {
      if (img.complete && img.naturalHeight) measure(img);
      else img.addEventListener('load', () => measure(img));
    });

    let raf = null;
    window.addEventListener('resize', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        grid.querySelectorAll('.webd-card.is-live .webd-shot').forEach(measure);
      });
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
