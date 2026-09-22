/* clock.js — Live Philippine Standard Time clock (UTC+8), updates every second */

(function () {
  'use strict';

  const formatter = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    hour:     '2-digit',
    minute:   '2-digit',
    second:   '2-digit',
    hour12:   true
  });

  function tick() {
    const el = document.getElementById('clock');
    if (!el) return;
    el.textContent = formatter.format(new Date()) + ' PHT';
  }

  document.addEventListener('DOMContentLoaded', function () {
    tick();
    setInterval(tick, 1000);
  });
})();
