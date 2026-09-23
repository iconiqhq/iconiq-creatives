/* careers.js — toggle role chips (multi-select) and build the apply email.
   Selected roles go FIRST in the subject so applications are easy to filter. */

(function () {
  'use strict';

  const EMAIL = 'iconiqcreatives@gmail.com';
  const wrap = document.getElementById('careers-roles');
  const apply = document.getElementById('careers-apply');
  if (!wrap || !apply) return;

  function updateApply() {
    const roles = Array.from(wrap.querySelectorAll('.careers-role[aria-pressed="true"]'))
      .map(b => b.dataset.role);
    const subject = (roles.length ? roles.join(', ') + ' | ' : '') + 'Careers Application';
    const body = roles.length
      ? "Hi Iconiq Creatives,\n\nI'd like to apply for: " + roles.join(', ') +
        ".\n\nHere's my portfolio / work:\n"
      : "Hi Iconiq Creatives,\n\nI'd like to join the team. Here's my portfolio / work:\n";
    apply.href = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  wrap.addEventListener('click', function (e) {
    const btn = e.target.closest('.careers-role');
    if (!btn) return;
    const on = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', on ? 'false' : 'true');
    updateApply();
  });

  updateApply();
})();
