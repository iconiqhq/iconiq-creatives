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

  /* ── Direct scroll to a section (no hash left in the URL) ──────── */
  function scrollToId(id) {
    if (!id) return false;
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }
    const target = document.getElementById(id);
    if (!target) return false;
    /* Nav is at the bottom on all devices — small 20px clearance. */
    const top = target.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    return true;
  }

  /* Nav pill items */
  items.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      scrollToId(item.dataset.section);
    });
  });

  /* Any other in-page anchor (e.g. hero "View Our Work") — scroll
     directly and keep the address bar clean, no # appended. */
  document.querySelectorAll('a[href^="#"]:not(.nav-item)').forEach(a => {
    a.addEventListener('click', e => {
      const id = (a.getAttribute('href') || '').slice(1);
      if (scrollToId(id)) e.preventDefault();
    });
  });

  /* A hash already in the URL on load? Clean it without jumping. */
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }

})();
