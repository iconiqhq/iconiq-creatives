/* website-design.js — Section 02: Iconiq Creatives website portfolio.
   Grid of browser-mockup cards → each links to the live site (new tab).
   Missing screenshots fall back to a branded gradient panel. */

(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Two-letter monogram from the site name (fallback panel). */
  function initials(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '★';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  /* Pretty host label for the mock browser bar, e.g. radicalrevolution.com */
  function hostLabel(site) {
    try {
      if (site.url && /^https?:\/\//.test(site.url)) {
        const h = new URL(site.url).hostname.replace(/^www\./, '');
        if (h && !/instagram\.com$/.test(h)) return h;
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

    /* Screenshot layer — hides itself on error so the fallback shows through. */
    const shot = site.thumb
      ? '<img class="webd-shot" src="' + esc(site.thumb) + '" alt="' + name + ' website" ' +
        'loading="lazy" decoding="async" draggable="false" ' +
        'onerror="this.remove()">'
      : '';

    return '' +
      '<a class="webd-card" href="' + esc(site.url || '#') + '" ' +
         'target="_blank" rel="noopener noreferrer" ' +
         'style="--webd-accent:' + esc(accent) + '" ' +
         'data-idx="' + i + '" aria-label="' + name + ' — open live site in new tab">' +
        '<span class="webd-card__frame">' +
          '<span class="webd-card__bar" aria-hidden="true">' +
            '<span class="webd-card__dots"><i></i><i></i><i></i></span>' +
            '<span class="webd-card__url">' + host + '</span>' +
          '</span>' +
          '<span class="webd-card__viewport">' +
            '<span class="webd-card__fallback" aria-hidden="true">' +
              '<span class="webd-card__mono">' + mono + '</span>' +
            '</span>' +
            shot +
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
      '</a>';
  }

  function reveal(els) {
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in-view')); return; }
    const o = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); o.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => o.observe(e));
  }

  function buildGrid(sites) {
    const grid = document.getElementById('webd-grid');
    if (!grid) return;
    grid.innerHTML = sites.map(cardHTML).join('');
    grid.querySelectorAll('.webd-card').forEach((el, i) => {
      el.style.setProperty('--webd-delay', (i % 3) * 70 + 'ms');
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
