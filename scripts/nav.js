/* nav.js — Apple liquid-glass bottom pill nav */

(function () {
  'use strict';

  const nav      = document.getElementById('site-nav');
  const pill     = document.getElementById('nav-pill');
  const items    = Array.from(document.querySelectorAll('.nav-item[data-section]'));
  const indicator = document.getElementById('nav-indicator');

  if (!nav || !items.length) return;

  /* ── Sections list ──────────────────────────────── */
  const sections = items
    .map(i => document.getElementById(i.dataset.section))
    .filter(Boolean);

  /* ── Sliding indicator — glides to sit behind the active item ──
     Uses transform (translateX + scaleX) rather than animating left/width
     directly, so the browser can composite the slide instead of running
     layout on every frame. Base width is 1px, so scaleX(N) reads as Npx. */
  function moveIndicator(item) {
    if (!indicator || !pill || !item) return;
    const pillRect = pill.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const left = itemRect.left - pillRect.left;
    indicator.style.transform = `translateX(${left}px) scaleX(${itemRect.width})`;
    indicator.classList.add('nav-indicator--visible');
  }

  /* ── Active state ───────────────────────────────── */
  let activeId = '';

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    items.forEach(i => i.classList.toggle('nav-active', i.dataset.section === id));
    const activeItem = items.find(i => i.dataset.section === id);
    moveIndicator(activeItem);
  }

  /* Which section the viewport is currently "in":
     Walk sections; last one whose top is above the
     viewport midpoint wins.                          */
  function updateActive() {
    const mid = window.innerHeight * 0.5;
    let winner = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= mid) winner = s;
    }
    setActive(winner.id);
  }

  /* ── Scroll: compact / expand + active update ───── */
  let lastY   = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y         = window.scrollY;
      const goingDown = y > lastY;
      const wasCompact = nav.classList.contains('nav-compact');

      /* Compact when scrolling down past 60px */
      if (goingDown && y > 60) {
        nav.classList.add('nav-compact');
      } else if (!goingDown) {
        nav.classList.remove('nav-compact');
      }

      updateActive();

      /* Compact toggle resizes the items — re-track the indicator
         once that size transition has settled. */
      if (wasCompact !== nav.classList.contains('nav-compact')) {
        setTimeout(() => moveIndicator(items.find(i => i.dataset.section === activeId)), 320);
      }

      lastY   = y;
      ticking = false;
    });
  }, { passive: true });

  /* Keep the indicator aligned across viewport/orientation changes */
  window.addEventListener('resize', () => {
    moveIndicator(items.find(i => i.dataset.section === activeId));
  });

  /* Initial active state on load */
  updateActive();

  /* ── Direct scroll to a section ─────────────────────────────── */
  function scrollToId(id, behavior) {
    if (!id) return false;
    behavior = behavior || 'smooth';
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: behavior });
      return true;
    }
    const target = document.getElementById(id);
    if (!target) return false;
    /* Nav is at the bottom on all devices — small 20px clearance. */
    const top = target.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: Math.max(0, top), behavior: behavior });
    return true;
  }

  /* ── Per-section clean URLs (path-based, no hash) ────────────────
     Each section gets its own shareable path, e.g. /website-design. A
     Vercel rewrite serves index.html for these paths; here we scroll to
     the matching section on click, on scroll, on back/forward and on load. */
  const SLUGS = {
    'hero': '/',
    'website-design': '/web-design',
    'social-media': '/social-media',
    'graphic-design': '/graphic-design',
    'video-editing': '/video-editing',
    'book': '/book',
    'contact': '/contact',
    'careers': '/careers'
  };
  const PATH_TO_ID = { '/hero': 'hero' };
  Object.keys(SLUGS).forEach(id => { PATH_TO_ID[SLUGS[id]] = id; });

  function idFromPath(p) {
    p = (p || '/').replace(/\/+$/, '') || '/';
    return PATH_TO_ID[p] || null;
  }
  function setPath(id, replace) {
    const url = (SLUGS[id] || '/') + location.search;
    if (location.pathname + location.search === url && !location.hash) return;
    history[replace ? 'replaceState' : 'pushState'](null, '', url);
  }

  /* Nav pill items → scroll + push a per-section path. */
  items.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const id = item.dataset.section;
      scrollToId(id);
      setPath(id, false);
    });
  });

  /* Other internal links (e.g. hero CTAs) that point at a section path. */
  document.querySelectorAll('a[href^="/"]:not(.nav-item)').forEach(a => {
    const id = idFromPath(a.getAttribute('href'));
    if (!id) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      scrollToId(id);
      setPath(id, false);
    });
  });

  /* Back / forward → scroll to the section for the new path. */
  window.addEventListener('popstate', () => {
    if (location.hash && (location.hash.indexOf('#project=') === 0 || location.hash.indexOf('#design=') === 0)) return;   // a lightbox owns the URL
    const id = idFromPath(location.pathname);
    if (id) scrollToId(id);
  });

  /* Scroll-spy → keep the path in sync with the section in view. */
  let pathTick = false;
  window.addEventListener('scroll', () => {
    if (pathTick) return;
    pathTick = true;
    requestAnimationFrame(() => {
      pathTick = false;
      if (location.hash && (location.hash.indexOf('#project=') === 0 || location.hash.indexOf('#design=') === 0)) return;
      const mark = window.innerHeight * 0.4;
      let winner = sections[0];
      for (const s of sections) { if (s.getBoundingClientRect().top <= mark) winner = s; }
      if (winner) setPath(winner.id, true);
    });
  }, { passive: true });

  /* On load: if the path names a section, jump to it once layout settles. */
  const loadId = idFromPath(location.pathname);
  if (loadId && loadId !== 'hero') {
    window.addEventListener('load', () => { setTimeout(() => scrollToId(loadId, 'auto'), 60); });
  } else if (location.hash &&
             location.hash.indexOf('#project=') !== 0 &&
             location.hash.indexOf('#design=') !== 0) {
    history.replaceState(null, '', location.pathname + location.search);
  }

})();
