/* main.js — Global init: scroll reveal, shared utilities */

(function () {
  'use strict';

  /* IntersectionObserver — animates [data-reveal] elements as they enter viewport */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -72px 0px', threshold: 0.08 }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
  }

  /* Footer rotating title — same animation as hero */
  const FOOTER_TITLES = ['Website Design', 'Social Media Management', 'Graphic Design', 'Video Editing'];
  let footerTitleIndex = 0;
  let footerTitleEl = null;

  function rotateFoterTitle() {
    if (!footerTitleEl) return;
    footerTitleEl.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
    footerTitleEl.style.opacity    = '0';
    footerTitleEl.style.transform  = 'translateY(-8px)';

    setTimeout(function () {
      footerTitleIndex = (footerTitleIndex + 1) % FOOTER_TITLES.length;
      footerTitleEl.textContent = FOOTER_TITLES[footerTitleIndex];
      footerTitleEl.style.transition = 'none';
      footerTitleEl.style.opacity    = '0';
      footerTitleEl.style.transform  = 'translateY(8px)';
      void footerTitleEl.offsetHeight;
      footerTitleEl.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
      footerTitleEl.style.opacity    = '1';
      footerTitleEl.style.transform  = 'translateY(0)';
    }, 400);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();

    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    footerTitleEl = document.getElementById('footer-rotating-title');
    if (footerTitleEl) setInterval(rotateFoterTitle, 2900);
  });
})();
