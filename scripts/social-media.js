/* social-media.js — Section 02: brand cards, story rings, Chart.js growth charts */

(function () {
  'use strict';

  /* ── Platform SVG icons ─────────────────────────── */
  const PLATFORM_ICONS = {
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    youtube:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    tiktok:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>`,
    facebook:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    threads:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></svg>`,
    twitter:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    linkedin:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  };

  function platformIcon(name) {
    const key = (name || '').toLowerCase();
    return PLATFORM_ICONS[key] || PLATFORM_ICONS[key === 'x' ? 'twitter' : key] || '';
  }

  /* ── Status ring colours ────────────────────────── */
  const STATUS = {
    active:   { from: '#22c55e', to: '#86efac', label: 'Active'    },
    inactive: { from: '#f59e0b', to: '#fde68a', label: 'On Hold'   },
    past:     { from: '#ef4444', to: '#fca5a5', label: 'Completed' },
  };

  function statusOf(s) { return STATUS[s] || STATUS.active; }

  /* Carousel dot sizing (shared look site-wide): the active dot is biggest and
     dots shrink toward the edges — like TikTok's pager. */
  function dotScale(dist) { dist = Math.abs(dist); return dist === 0 ? 1.4 : Math.max(0.5, 1 - dist * 0.22); }

  /* ── Formatting ─────────────────────────────────── */
  function fmt(n) {
    if (n === null || n === undefined || n === 0) return '—';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  function fmtFull(n) {
    if (!n) return '—';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M';
    if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  function fmtPeriod(project) {
    if (project.status === 'active') return '';
    const from = project.managedFrom || '';
    const to   = project.managedTo   || 'Present';
    return from ? `${from} – ${to}` : '';
  }

  /* ── Helpers ────────────────────────────────────── */
  function totalReach(platforms) {
    return platforms.reduce((s, p) => s + (p.currentFollowers || 0), 0);
  }

  /* Escape HTML, then turn @handles into links to the matching X profile.
     Opens in a new tab per the project's external-link rule. */
  function escHTML(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  function linkifyBio(text) {
    return escHTML(text).replace(
      /@([A-Za-z0-9_]{1,15})/g,
      '<a class="sm-bio-link" href="https://x.com/$1" target="_blank" rel="noopener noreferrer">@$1</a>'
    );
  }

  /* ── Silver Play Button achievement card ─────────── */
  function buildAchievementCard() {
    return `
      <article class="sm-card sm-achievement-card" role="listitem" aria-label="YouTube Silver Play Button Achievement">
        <div class="sm-achievement-photo" aria-hidden="true">
          <img src="assets/images/profile/silver-play-button.jpg" alt="Joshua holding the YouTube Silver Play Button" loading="lazy">
        </div>
        <div class="sm-achievement-body">
          <div class="sm-achievement-yt" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <span class="sm-achievement-label">Achievement Unlocked</span>
          <h3 class="sm-achievement-title">YouTube Silver Play Button</h3>
          <p class="sm-achievement-milestone">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            100,000 Subscribers
          </p>
          <span class="sm-achievement-hover-hint" aria-hidden="true">Hover to reveal</span>
        </div>
      </article>`;
  }

  /* ── Card builder ───────────────────────────────── */
  function buildCard(project) {
    const st      = statusOf(project.status);
    const initial = (project.brandName || '?').charAt(0).toUpperCase();
    const hasLogo = project.logo && !project.logo.includes('example') && !project.logo.includes('brand-02');

    const logoHTML  = hasLogo
      ? `<img class="sm-ring-logo" src="${project.logo}" alt="" loading="lazy"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const initStyle = hasLogo ? 'style="display:none"' : '';

    const reach = totalReach(project.platforms);

    /* Per-profile banner: an image path, or a solid "#hex" colour.
       Falls back to the brand-tinted gradient placeholder when absent. */
    const bannerStyle = project.banner
      ? (project.banner.charAt(0) === '#'
          ? ` style="background:${project.banner}"`
          : ` style="background-image:url('${project.banner}')"`)
      : '';
    const bioHTML = project.bio
      ? `<p class="sm-bio">${linkifyBio(project.bio)}</p>`
      : '';

    return `
      <article class="sm-card status-${project.status || 'active'}" data-id="${project.id}"
               style="--ring-from:${st.from};--ring-to:${st.to};--brand:${project.brandColor || '#41BDFE'}"
               role="listitem">

        <div class="sm-banner"${bannerStyle}></div>

        <div class="sm-body">
          <div class="sm-ring">
            <div class="sm-ring-inner">
              ${logoHTML}
              <span class="sm-ring-initial" ${initStyle}>${initial}</span>
            </div>
          </div>

          <h3 class="sm-brand-name">
            ${project.brandName}${project.verified ? '<svg class="sm-verified-badge" viewBox="0 0 22 22" fill="none" aria-label="Verified" role="img"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.275.213-1.815.568s-.972.854-1.247 1.44c-.606-.222-1.262-.268-1.897-.14-.634.132-1.218.437-1.687.882-.445.47-.749 1.054-.88 1.688-.13.633-.085 1.29.139 1.896-.587.274-1.087.705-1.441 1.246-.354.54-.551 1.17-.569 1.816.018.647.215 1.276.569 1.817.354.54.854.972 1.441 1.246-.224.606-.269 1.262-.14 1.896.131.634.436 1.218.881 1.688.469.443 1.053.748 1.687.879.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.606.22 1.262.267 1.897.137.634-.132 1.218-.437 1.687-.882.445-.469.749-1.053.881-1.687.13-.633.086-1.29-.136-1.897.587-.274 1.087-.706 1.441-1.246.354-.54.551-1.17.569-1.816z" fill="#1D9BF0"/><path d="M6.5 11.5l2.8 2.8 5.7-5.6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
          </h3>
          <span class="sm-brand-industry">${project.industry}</span>

          ${bioHTML}

          <div class="sm-total-reach">
            <span class="sm-reach-value">${fmtFull(reach)}</span>
            <span class="sm-reach-label">Total Reach</span>
          </div>

          <div class="sm-status-tag" aria-hidden="true">
            <span class="sm-status-dot"></span>
            <span class="sm-status-text">${st.label}</span>
          </div>
        </div>

      </article>`;
  }


  /* ── Aggregate stats ────────────────────────────── */
  function computeStats(projects) {
    let total = 0, platformCount = 0;
    projects.forEach(p => {
      platformCount += p.platforms.length;
      p.platforms.forEach(pl => { total += pl.currentFollowers || 0; });
    });
    return { total, activeBrands: projects.length, platformCount };
  }

  /* ── Counter animation ──────────────────────────── */
  function countUp(el, target, duration) {
    if (!el) return;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ── Featured wheel — ported 1:1 from Artsons' buildWheel ──────────────
     Motion is copied exactly from the Artsons featured wheel: native smooth
     horizontal scroll, click-drag with absolute start-position mapping, snap to
     the nearest card on release / after a scroll settles, a seamless infinite
     clone loop, and the 3D coverflow (cards spin + scale + fade in from the
     right and out to the left). No auto-scroll — the wheel moves only when the
     user drags, scrolls, or taps a dot. Only the card UI + data are ours. */
  function throttle(fn, wait) {
    let last = 0, t = null;
    return function () {
      const now = Date.now(), rem = wait - (now - last);
      if (rem <= 0) { clearTimeout(t); t = null; last = now; fn(); }
      else if (!t) { t = setTimeout(() => { last = Date.now(); t = null; fn(); }, rem); }
    };
  }

  function initCarousel(track, dots, opts) {
    opts = opts || {};
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const real = Array.from(track.children);
    const n = real.length;
    if (!n) return;
    const CLONES = Math.min(n, 4);   // cloned cards each side → the scroll never hits an edge (seamless loop)

    function prepClone(node) {
      node.classList.add('sm-clone');
      node.setAttribute('aria-hidden', 'true');
      node.tabIndex = -1;
      node.querySelectorAll('a').forEach(a => { a.tabIndex = -1; });
    }
    /* [ last CLONES ] + [ real cards ] + [ first CLONES ] → seamless loop */
    const head = document.createDocumentFragment();
    for (let a = 0; a < CLONES; a++) {
      const c = real[(n - CLONES + a) % n].cloneNode(true); prepClone(c); head.appendChild(c);
    }
    track.insertBefore(head, track.firstChild);
    for (let b = 0; b < CLONES; b++) {
      const c = real[b].cloneNode(true); prepClone(c); track.appendChild(c);
    }

    const kids = () => Array.from(track.children);

    /* Geometry from the DOM (base = first real card's offset; step = per-card
       advance = card width + gap) so snapping is pixel-exact for our layout. */
    let base = 0, stepPx = 360;
    function measure() {
      const items = kids();
      const first = items[CLONES], second = items[CLONES + 1];
      base = first ? first.offsetLeft : 0;
      stepPx = (first && second) ? (second.offsetLeft - first.offsetLeft)
                                 : (first ? first.offsetWidth + 16 : 360);
      if (!stepPx) stepPx = first ? first.offsetWidth + 16 : 360;
    }
    function step() { return stepPx; }
    function realStart() { return base; }                                         // rest scrollLeft for the first real card
    function realWidth() { return n * stepPx; }
    function snapTarget() { return base + Math.round((track.scrollLeft - base) / stepPx) * stepPx; } // nearest clean rest
    function setInstant(x) {
      const sb = track.style.scrollBehavior; track.style.scrollBehavior = 'auto';
      track.scrollLeft = x; track.style.scrollBehavior = sb;
    }
    function realIndex() { return ((Math.round((track.scrollLeft - base) / stepPx) % n) + n) % n; }

    /* Dots — one per real card. Click glides (CSS scroll-behavior:smooth). */
    const dotBtns = [];
    if (dots) {
      dots.innerHTML = '';
      for (let j = 0; j < n; j++) {
        const d = document.createElement('button');
        d.type = 'button';
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-label', 'Go to brand ' + (j + 1));
        d.setAttribute('aria-current', j === 0 ? 'true' : 'false');
        d.addEventListener('click', () => { track.scrollLeft = realStart() + j * step(); });
        dots.appendChild(d);
        dotBtns.push(d);
      }
    }
    function syncDots() {
      const active = realIndex();
      dotBtns.forEach((d, k) => {
        d.setAttribute('aria-current', k === active ? 'true' : 'false');
        d.style.transform = 'scale(' + dotScale(k - active) + ')';   // TikTok: outer dots smaller
      });
    }

    /* Seamless wrap: jump by one real set only when the rounded index lands on a
       clone (outside 0..n-1). Rounded-index compare (not raw pixels) is immune to
       sub-pixel drift, so the first/last card never oscillates at the boundary. */
    function normalize() {
      const k = Math.round((track.scrollLeft - base) / stepPx);
      if (k < 0) setInstant(track.scrollLeft + realWidth());
      else if (k >= n) setInstant(track.scrollLeft - realWidth());
    }

    /* Coverflow (exact Artsons formula): a card spins + scales + fades in from
       the right and out to the left, driven by how much of it is off-screen.
       A deadzone keeps the fully-shown cards perfectly flat. */
    let cfMeta = [], cfTick = false;
    function cfMeasure() { measure(); cfMeta = kids().map(c => ({ el: c, left: c.offsetLeft, w: c.offsetWidth })); }
    function coverflow() {
      cfTick = false;
      if (REDUCED) return;
      const sl = track.scrollLeft, vw = track.clientWidth;
      const mobile = window.innerWidth < 640;
      for (let k = 0; k < cfMeta.length; k++) {
        const m = cfMeta[k];
        let d, op;
        let scale;
        if (mobile) {
          /* Mobile 2-up: the snapped (left) card is full size; cards to its right
             shrink + fade a touch — a smaller preview of what's next. Scale from
             the card's LEFT edge (transform-origin) so shrinking doesn't widen the
             gap between cards — same as the creators carousel. */
          const left = m.left - sl;
          d = Math.min(1, Math.max(0, left / vw));
          scale = 1 - 0.12 * d;
          op = 1 - 0.18 * d;
          m.el.style.transformOrigin = 'left center';
        } else {
          /* Desktop: scale by distance from the viewport CENTRE — middle cards
             full size, cards toward the sides a bit smaller (and slightly faded). */
          const cardCentre = (m.left + m.w / 2) - sl;
          const off = (cardCentre - vw / 2) / vw;
          d = Math.min(1, Math.abs(off) * 2);
          scale = 1 - 0.17 * d;
          op = 1 - 0.45 * d;
          m.el.style.transformOrigin = '';
        }
        m.el.style.transform = 'scale(' + scale.toFixed(3) + ')';
        m.el.style.opacity = op.toFixed(3);
        m.el.classList.add('sm-cf');
      }
    }

    /* Snap after a scroll settles → glide to the nearest clean rest so a card
       always fits (CSS scroll-behavior:smooth animates the small correction). */
    /* Mobile uses native CSS scroll-snap (scroll-snap-type: x mandatory). Any JS
       re-snap on top of it fights the browser's own snap/momentum and shows up as
       a shake at the loop boundary — so, like Artsons, on mobile we trust the
       native snap and only keep the infinite loop + dots in sync. */
    const isMobile = () => window.innerWidth < 640;
    let dotTick = false, settleTimer, wrapTimer, animating = false;
    function settle() {
      if (isMobile() || animating || track.classList.contains('sm-dragging')) return;
      const t = snapTarget();
      if (Math.abs(t - track.scrollLeft) > 2) track.scrollLeft = t;
    }
    track.addEventListener('scroll', () => {
      /* Desktop: wrap the loop immediately (the teleport is invisible). Mobile:
         DEFER the wrap — teleporting mid-fling interrupts the browser's momentum
         and shows up as a shake, so we wrap only after the swipe settles (140ms
         debounce) + on scrollend. This is exactly what the Artsons wheel does. */
      if (!isMobile() && !animating) normalize();
      if (!cfTick) { cfTick = true; requestAnimationFrame(coverflow); }
      if (!dotTick) { dotTick = true; requestAnimationFrame(() => { dotTick = false; syncDots(); }); }
      clearTimeout(settleTimer); settleTimer = setTimeout(settle, 90);
      if (isMobile()) { clearTimeout(wrapTimer); wrapTimer = setTimeout(() => { normalize(); syncDots(); }, 140); }
    }, { passive: true });
    /* Re-center once scrolling FULLY stops (after momentum). */
    if ('onscrollend' in window) {
      track.addEventListener('scrollend', () => {
        if (animating || track.classList.contains('sm-dragging')) return;
        if (isMobile()) { normalize(); syncDots(); return; }   // trust native snap on mobile
        const t = snapTarget();
        if (Math.abs(t - track.scrollLeft) > 0.5) setInstant(t);
      });
    }

    /* Edge arrows (optional, if present in the markup) — glide one card. */
    function nudge(dir) { track.scrollLeft = snapTarget() + dir * step(); }
    const prev = document.getElementById('sm-prev'), next = document.getElementById('sm-next');
    if (prev) prev.addEventListener('click', () => nudge(-1));
    if (next) next.addEventListener('click', () => nudge(1));

    /* Custom eased glide (easeOutCubic) — used instead of the browser's default
       snap so a release carries momentum and settles smoothly. Runs its own rAF
       so it can glide across several cards on a flick; `animating` pauses the
       loop-wrap + settle handlers so they don't fight it, then we normalize once
       at the end (the teleport is invisible — the clone matches). */
    let glideRAF = null;
    function glideTo(target, dur) {
      if (glideRAF) { cancelAnimationFrame(glideRAF); glideRAF = null; }
      track.style.scrollBehavior = '';           // reset any leftover inline state
      const startSL = track.scrollLeft;
      const dist = target - startSL;
      if (Math.abs(dist) < 1) { const t = snapTarget(); if (Math.abs(t - track.scrollLeft) > 1) track.scrollLeft = t; animating = false; return; }
      const t0 = performance.now();
      track.style.scrollBehavior = 'auto';       // we animate frame-by-frame ourselves
      animating = true;
      const ease = p => 1 - Math.pow(1 - p, 3);  // easeOutCubic — fast start, soft landing
      (function frame(now) {
        const p = Math.min((now - t0) / dur, 1);
        track.scrollLeft = startSL + dist * ease(p);   // fires scroll → coverflow + dots stay live
        if (p < 1) { glideRAF = requestAnimationFrame(frame); }
        else {
          glideRAF = null;
          track.style.scrollBehavior = '';       // hand control back to the CSS default (smooth)
          animating = false;
          normalize(); syncDots(); coverflow();
        }
      })(t0);
    }

    /* Click-drag (desktop / mouse): follow the cursor 1:1, then release with
       velocity-based momentum — a quick flick advances further; a slow drag just
       settles to the nearest card. */
    if (window.matchMedia('(pointer: fine)').matches) {
      let down = false, startX = 0, startScroll = 0, moved = false;
      let vel = 0, lastT = 0;                    // vel = scrollLeft px per ms (smoothed)
      track.addEventListener('mousedown', e => {
        if (e.target.closest('a')) return;      // let bio @mention links click through
        if (glideRAF) { cancelAnimationFrame(glideRAF); glideRAF = null; animating = false; }   // .sm-dragging (below) sets scroll-behavior:auto
        down = true; moved = false; startX = e.clientX; startScroll = track.scrollLeft;
        vel = 0; lastT = performance.now();
        track.classList.add('sm-dragging');
        e.preventDefault();                     // block native image/text drag
      });
      window.addEventListener('mousemove', e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        const prev = track.scrollLeft;
        track.scrollLeft = startScroll - dx;    // follow the cursor 1:1
        const now = performance.now(), dt = now - lastT;
        if (dt > 0) { vel = vel * 0.6 + ((track.scrollLeft - prev) / dt) * 0.4; lastT = now; }
      });
      const end = () => {
        if (!down) return; down = false;
        track.classList.remove('sm-dragging');
        /* Project the release velocity forward, clamp the throw to 3 cards, then
           snap that projection to the nearest clean card position. */
        const maxThrow = 3 * step();
        let projected = track.scrollLeft + vel * 150;
        projected = Math.max(track.scrollLeft - maxThrow, Math.min(track.scrollLeft + maxThrow, projected));
        const target = base + Math.round((projected - base) / step()) * step();
        const cards = Math.abs(target - track.scrollLeft) / step();
        const dur = Math.max(300, Math.min(680, cards * 240 + 220));
        glideTo(target, dur);
      };
      window.addEventListener('mouseup', end);
      window.addEventListener('mouseleave', end);
      track.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    }

    /* Auto-advance: glide to the next card every 2s (the arrow nudge on a timer,
       so it reuses the same smooth glide + snap + seamless loop). Right → left
       (scrollLeft grows, content drifts left). Pauses on hover, drag, or a hidden
       tab; resumes on its own. Skipped entirely under reduced-motion. */
    if (!REDUCED && opts.autoScroll !== false) {
      let hovering = false;
      track.addEventListener('mouseenter', () => { hovering = true; });
      track.addEventListener('mouseleave', () => { hovering = false; });
      setInterval(() => {
        if (hovering || track.classList.contains('sm-dragging') || document.hidden ||
            document.body.classList.contains('sm-lb-open')) return;
        nudge(1);
      }, 2000);
    }

    /* Start on the first real card. */
    cfMeasure();
    setInstant(realStart());
    syncDots();   // apply dot sizes immediately (don't wait for the first rAF)
    requestAnimationFrame(() => { cfMeasure(); setInstant(realStart()); coverflow(); syncDots(); });
    window.addEventListener('load', () => { cfMeasure(); coverflow(); });
    window.addEventListener('resize', throttle(() => {
      const i = realIndex();                    // keep the CURRENT card, not reset to the first
      cfMeasure(); setInstant(realStart() + i * step()); coverflow(); syncDots();
    }, 150));
  }

  /* ── Project analytics lightbox ─────────────────────
     Click a project → an overlay shows that project's per-platform analytics
     videos as a carousel. Platform buttons on the right switch the carousel;
     a description slot (placeholder for now) and the social links sit below. */
  const VERIFIED_SVG = '<svg class="sm-verified-badge" viewBox="0 0 22 22" fill="none" aria-label="Verified" role="img"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.275.213-1.815.568s-.972.854-1.247 1.44c-.606-.222-1.262-.268-1.897-.14-.634.132-1.218.437-1.687.882-.445.47-.749 1.054-.88 1.688-.13.633-.085 1.29.139 1.896-.587.274-1.087.705-1.441 1.246-.354.54-.551 1.17-.569 1.816.018.647.215 1.276.569 1.817.354.54.854.972 1.441 1.246-.224.606-.269 1.262-.14 1.896.131.634.436 1.218.881 1.688.469.443 1.053.748 1.687.879.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.606.22 1.262.267 1.897.137.634-.132 1.218-.437 1.687-.882.445-.469.749-1.053.881-1.687.13-.633.086-1.29-.136-1.897.587-.274 1.087-.706 1.441-1.246.354-.54.551-1.17.569-1.816z" fill="#1D9BF0"/><path d="M6.5 11.5l2.8 2.8 5.7-5.6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  let lbEl = null;
  let lbState = { slides: [], videos: [], descs: [], idx: 0 };
  let allProjects = [];          // set in init(), used by deep-link handlers
  let currentProjectId = null;   // which project's lightbox is open
  let preLbHash = '';            // URL hash before the lightbox opened (to restore on close)

  function buildLightboxShell() {
    const el = document.createElement('div');
    el.className = 'sm-lb';
    el.id = 'sm-lb';
    el.hidden = true;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Project analytics');
    el.innerHTML =
      '<div class="sm-lb__backdrop" data-close></div>' +
      '<div class="sm-lb__panel" role="document">' +
        '<button class="sm-lb__close" type="button" aria-label="Close">&times;</button>' +
        '<div class="sm-lb__stage">' +
          '<div class="sm-lb__track"></div>' +
          '<button class="sm-lb__nav sm-lb__prev" type="button" aria-label="Previous">&#8249;</button>' +
          '<button class="sm-lb__nav sm-lb__next" type="button" aria-label="Next">&#8250;</button>' +
        '</div>' +
        '<aside class="sm-lb__side">' +
          '<div class="sm-lb__head">' +
            '<div class="sm-lb__ring"><div class="sm-lb__ring-inner"><img class="sm-lb__logo" alt=""><span class="sm-lb__initial"></span></div></div>' +
            '<div class="sm-lb__head-text">' +
              '<h3 class="sm-lb__name"></h3>' +
              '<span class="sm-lb__industry"></span>' +
            '</div>' +
          '</div>' +
          '<div class="sm-lb__tabs" role="tablist" aria-label="Platform"></div>' +
          '<div class="sm-lb__desc"></div>' +
          '<div class="sm-lb__socials-wrap">' +
            '<span class="sm-lb__socials-label">Follow</span>' +
            '<div class="sm-lb__socials"></div>' +
          '</div>' +
        '</aside>' +
      '</div>';
    document.body.appendChild(el);
    el.querySelector('.sm-lb__close').addEventListener('click', () => closeLightbox());
    el.querySelector('[data-close]').addEventListener('click', () => closeLightbox());
    el.querySelector('.sm-lb__prev').addEventListener('click', () => goTo(lbState.idx - 1));
    el.querySelector('.sm-lb__next').addEventListener('click', () => goTo(lbState.idx + 1));
    document.addEventListener('keydown', e => {
      if (el.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') goTo(lbState.idx - 1);
      else if (e.key === 'ArrowRight') goTo(lbState.idx + 1);
    });
    return el;
  }

  function goTo(i) {
    const n = lbState.slides.length;
    if (!n) return;
    i = Math.max(0, Math.min(n - 1, i));
    lbState.idx = i;
    lbEl.querySelector('.sm-lb__track').style.transform = 'translateX(' + (-i * 100) + '%)';
    lbState.videos.forEach((v, k) => {
      if (!v) return;
      if (k === i) { try { v.currentTime = 0; } catch (e) {} v.play().catch(() => {}); }
      else v.pause();
    });
    lbEl.querySelectorAll('.sm-lb__tab').forEach((t, k) => t.setAttribute('aria-selected', k === i ? 'true' : 'false'));
    const d = lbState.descs[i] || lbState.fallbackDesc;
    const foll = lbState.followers ? lbState.followers[i] : undefined;
    const platName = String((lbState.slides[i] && lbState.slides[i].platform) || '').toLowerCase();
    const follLabel = platName === 'youtube' ? 'subscribers' : 'followers';
    const follHTML = (typeof foll === 'number')
      ? '<p class="sm-lb__followers"><strong>' + foll.toLocaleString('en-US') + '</strong> ' + follLabel + '</p>'
      : '';
    let html = follHTML;
    if (d) html += '<p>' + escHTML(d) + '</p>';
    else if (!follHTML) html = '<p class="sm-lb__desc-empty">Description coming soon.</p>';
    lbEl.querySelector('.sm-lb__desc').innerHTML = html;
    lbEl.querySelector('.sm-lb__prev').hidden = i <= 0;
    lbEl.querySelector('.sm-lb__next').hidden = i >= n - 1;
  }

  function openProjectLightbox(project, fromHistory) {
    if (!lbEl) lbEl = buildLightboxShell();
    currentProjectId = String(project.id);
    const st = statusOf(project.status);

    lbEl.querySelector('.sm-lb__name').innerHTML = escHTML(project.brandName) + (project.verified ? VERIFIED_SVG : '');
    lbEl.querySelector('.sm-lb__industry').textContent = project.industry || '';

    const ring = lbEl.querySelector('.sm-lb__ring');
    ring.style.setProperty('--ring-from', st.from);
    ring.style.setProperty('--ring-to', st.to);
    const logo = lbEl.querySelector('.sm-lb__logo'), initial = lbEl.querySelector('.sm-lb__initial');
    const hasLogo = project.logo && !project.logo.includes('example') && !project.logo.includes('brand-02');
    if (hasLogo) { logo.src = project.logo; logo.style.display = ''; initial.style.display = 'none'; }
    else { logo.removeAttribute('src'); logo.style.display = 'none'; initial.style.display = ''; initial.textContent = (project.brandName || '?').charAt(0).toUpperCase(); }

    const analytics = project.analytics || [];
    const track = lbEl.querySelector('.sm-lb__track');
    const tabs = lbEl.querySelector('.sm-lb__tabs');
    track.innerHTML = ''; tabs.innerHTML = '';
    lbState = { slides: [], videos: [], descs: [], followers: [], idx: 0, fallbackDesc: project.analyticsDescription || '' };

    /* Per-platform follower counts (from the sheet-merged data), keyed by name. */
    const followersByPlat = {};
    (project.platforms || []).forEach(pl => {
      followersByPlat[String(pl.name || '').toLowerCase()] = pl.currentFollowers;
    });
    const follOf = (name) => followersByPlat[String(name || '').toLowerCase()] || 0;

    /* Decide which tabs to build:
       - showAllPlatforms: one tab per platform — its analytics video when we
         have one, else a "coming soon" placeholder (mixed / partial analytics).
       - otherwise analytics only (each analytics entry), or a placeholder tab
         per platform when there are no analytics yet.
       Tabs are always ordered by follower count — biggest platform first. */
    const analyticsByPlat = {};
    analytics.forEach(a => { analyticsByPlat[String(a.platform || '').toLowerCase()] = a; });
    const platforms = project.platforms || [];

    let entries = [];
    if (project.showAllPlatforms && platforms.length) {
      entries = platforms.map(pl => {
        const a = analyticsByPlat[String(pl.name || '').toLowerCase()];
        return { platform: pl.name, video: (a && a.video) || null, description: (a && a.description) || '' };
      });
    } else if (analytics.length) {
      entries = analytics.map(a => ({ platform: a.platform, video: a.video, description: a.description || '' }));
    } else if (platforms.length) {
      entries = platforms.map(pl => ({ platform: pl.name, video: null, description: '' }));
    }

    if (entries.length) {
      entries.sort((a, b) => follOf(b.platform) - follOf(a.platform)).forEach((entry, i) => {
        const slide = document.createElement('div');
        slide.className = 'sm-lb__slide' + (entry.video ? '' : ' sm-lb__slide--empty');
        if (entry.video) {
          slide.innerHTML = '<video class="sm-lb__video" src="' + entry.video + '" muted loop playsinline controls preload="' + (i === 0 ? 'auto' : 'metadata') + '"></video>';
        } else {
          slide.innerHTML = '<div class="sm-lb__soon"><span aria-hidden="true">📊</span><p>Analytics coming soon</p></div>';
        }
        track.appendChild(slide);
        lbState.slides.push(entry);
        lbState.videos.push(entry.video ? slide.querySelector('video') : null);
        lbState.descs.push(entry.description || '');   // '' falls back to the project's analyticsDescription
        lbState.followers.push(followersByPlat[String(entry.platform || '').toLowerCase()]);

        if (i > 0) {
          const sep = document.createElement('span');
          sep.className = 'sm-lb__tab-sep';
          sep.setAttribute('aria-hidden', 'true');
          sep.textContent = '|';
          tabs.appendChild(sep);
        }
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'sm-lb__tab';
        tab.setAttribute('role', 'tab');
        tab.textContent = entry.platform;
        tab.addEventListener('click', () => goTo(i));
        tabs.appendChild(tab);
      });
      tabs.hidden = false;
    } else {
      const slide = document.createElement('div');
      slide.className = 'sm-lb__slide sm-lb__slide--empty';
      slide.innerHTML = '<div class="sm-lb__soon"><span aria-hidden="true">📊</span><p>Analytics coming soon</p></div>';
      track.appendChild(slide);
      lbState.slides.push({}); lbState.videos.push(null); lbState.descs.push(''); lbState.followers.push(undefined);
      tabs.hidden = true;
    }

    const soc = lbEl.querySelector('.sm-lb__socials');
    soc.innerHTML = '';
    (project.platforms || []).forEach(p => {
      if (!p.url) return;
      const a = document.createElement('a');
      a.className = 'sm-lb__social';
      a.href = p.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', p.name);
      a.innerHTML = platformIcon(p.icon || p.name);
      soc.appendChild(a);
    });
    lbEl.querySelector('.sm-lb__socials-wrap').hidden = soc.children.length === 0;

    lbEl.hidden = false;
    document.body.classList.add('sm-lb-open');
    document.body.style.overflow = 'hidden';
    goTo(0);
    lbEl.querySelector('.sm-lb__close').focus();

    /* Give the open project its own shareable URL (#project=<id>), Artsons-style.
       pushState so Back closes it and restores the section you came from. */
    if (!fromHistory) {
      preLbHash = location.hash;   // remember the section we came from
      history.pushState({ smProject: currentProjectId }, '',
        '#project=' + encodeURIComponent(currentProjectId));
    }
  }

  function closeLightbox(fromHistory) {
    if (!lbEl || lbEl.hidden) return;
    lbState.videos.forEach(v => v && v.pause());
    lbEl.hidden = true;
    document.body.classList.remove('sm-lb-open');
    document.body.style.overflow = '';
    currentProjectId = null;
    // Restore the address bar to the section we came from (button/backdrop/Esc).
    if (!fromHistory && location.hash.indexOf('#project=') === 0) {
      history.replaceState(null, '', preLbHash || (location.pathname + location.search));
    }
  }

  /* Back/forward + shared links: sync the lightbox to the URL. */
  window.addEventListener('popstate', () => {
    const m = location.hash.match(/^#project=(.+)$/);
    if (m) {
      const id = decodeURIComponent(m[1]);
      const proj = allProjects.find(p => String(p.id) === id);
      if (proj && (!lbEl || lbEl.hidden || currentProjectId !== id)) openProjectLightbox(proj, true);
    } else if (lbEl && !lbEl.hidden) {
      closeLightbox(true);
    }
  });

  /* ── Main ───────────────────────────────────────── */
  async function init() {
    if (!window.PortfolioData) return;
    let data;
    try { data = await window.PortfolioData.loadProjects(); } catch (e) { return; }
    const projects = (data && data.projects) || [];
    if (!projects.length) return;
    allProjects = projects;

    const row = document.getElementById('sm-cards-row');
    if (row) {
      row.innerHTML = projects.map(buildCard).join('');
      initCarousel(row, document.getElementById('sm-dots'));

      /* Click a project card → open its analytics lightbox. The carousel's
         capture-phase handler already swallows the click after a drag, and we
         ignore clicks on bio @mention links. */
      row.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        const card = e.target.closest('.sm-card');
        if (!card || !card.dataset.id) return;
        const proj = projects.find(p => String(p.id) === card.dataset.id);
        if (proj) openProjectLightbox(proj);
      });

      /* Deep link: opened with #project=<id> → open that project's lightbox. */
      const m = location.hash.match(/^#project=(.+)$/);
      if (m) {
        const proj = projects.find(p => String(p.id) === decodeURIComponent(m[1]));
        if (proj) openProjectLightbox(proj, true);
      }
    }

    const section = document.getElementById('social-media');
    if (!section) return;

    const stats = computeStats(projects);
    let statsOk = false;

    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!statsOk) {
          statsOk = true;
          countUp(document.getElementById('sm-total-followers'), stats.total,         1400);
          countUp(document.getElementById('sm-active-brands'),   stats.activeBrands,  900);
          countUp(document.getElementById('sm-platform-count'),  stats.platformCount, 900);
        }
      });
    }, { threshold: 0.15 }).observe(section);
  }

  /* Share the carousel engine so other sections (e.g. Creators) can use the
     exact same swipe/drag/snap/coverflow/loop. */
  window.__jlCarousel = initCarousel;

  document.addEventListener('DOMContentLoaded', init);
})();
