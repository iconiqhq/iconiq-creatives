/* careers.js — role picker (multi-select) + name, gated apply.
   Can't send without at least one role AND a name. Selected roles go FIRST in
   the subject (easy to filter), followed by the applicant's name. */

(function () {
  'use strict';

  const EMAIL = 'iconiqcreatives@gmail.com';
  const wrap  = document.getElementById('careers-roles');
  const apply = document.getElementById('careers-apply');
  const nameInput = document.getElementById('careers-name');
  const note  = document.getElementById('careers-note');
  if (!wrap || !apply || !nameInput) return;

  function selectedRoles() {
    return Array.from(wrap.querySelectorAll('.careers-role[aria-pressed="true"]'))
      .map(b => b.dataset.role);
  }

  function buildMailto(roles, name) {
    const subject = roles.join(', ') + ' | ' + name + ' | Careers Application';
    const body = 'Hi Iconiq Creatives,\n\nMy name is ' + name +
      " and I'd like to apply for: " + roles.join(', ') +
      ".\n\nHere's my portfolio / work:\n";
    return 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  function isReady() {
    return selectedRoles().length > 0 && nameInput.value.trim().length > 0;
  }

  function refresh() {
    const ready = isReady();
    apply.classList.toggle('is-disabled', !ready);
    apply.setAttribute('aria-disabled', ready ? 'false' : 'true');
    if (ready) {
      apply.href = buildMailto(selectedRoles(), nameInput.value.trim());
      if (note) note.textContent = '';
    }
  }

  wrap.addEventListener('click', function (e) {
    const btn = e.target.closest('.careers-role');
    if (!btn) return;
    btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    refresh();
  });

  nameInput.addEventListener('input', refresh);

  apply.addEventListener('click', function (e) {
    const roles = selectedRoles();
    const name = nameInput.value.trim();
    if (!roles.length) {
      e.preventDefault();
      if (note) note.textContent = 'Please pick at least one role first.';
      wrap.querySelector('.careers-role').focus();
      return;
    }
    if (!name) {
      e.preventDefault();
      if (note) note.textContent = 'Please add your name.';
      nameInput.focus();
      return;
    }
    apply.href = buildMailto(roles, name);   // valid → let the mailto open
  });

  refresh();
})();
