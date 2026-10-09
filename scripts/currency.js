/* currency.js — show a live USD conversion beside each ₱ price on the pricing
   page. The USD/PHP rate moves daily, so we pull the current rate from a free,
   no-key API (open.er-api.com, CORS-enabled) once per day — cached in
   localStorage — and render "≈ $x–$y" beside every peso amount. If the network
   is unavailable we fall back to the last known rate, then a sane default, so a
   conversion always shows. Peso prices stay the source of truth; the dollar
   figure is an approximate, auto-updating convenience. */
(function () {
  'use strict';

  var API = 'https://open.er-api.com/v6/latest/USD';   // rates.PHP = pesos per $1
  var FALLBACK = 63;                                    // approx PHP per USD
  var KEY = 'iq_usdphp_v1';

  function todayKey() { return new Date().toISOString().slice(0, 10); }

  function cached() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  function store(rate) {
    try { localStorage.setItem(KEY, JSON.stringify({ d: todayKey(), r: rate })); } catch (e) {}
  }

  /* Give back today's rate: use the cached one if it's from today, otherwise
     fetch a fresh rate (and cache it). Any failure falls back gracefully. */
  function getRate(cb) {
    var c = cached();
    if (c && c.d === todayKey() && c.r) { cb(c.r); return; }
    fetch(API, { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var r = j && j.rates && j.rates.PHP;
        if (r && isFinite(r)) { store(r); cb(r); }
        else cb(c && c.r ? c.r : FALLBACK);
      })
      .catch(function () { cb(c && c.r ? c.r : FALLBACK); });
  }

  function toNumber(part) {
    var k = /k/i.test(part);
    var n = parseFloat(part.replace(/[^0-9.]/g, ''));
    if (!isFinite(n)) return null;
    return k ? n * 1000 : n;
  }

  /* Parse a peso label like "₱35,000–50,000", "₱30k–50k" or "₱60k–100k+" into
     its number(s); returns null for non-peso text such as "Let's talk". */
  function phpRange(text) {
    if (text.indexOf('₱') === -1) return null;
    var plus = /\+/.test(text);
    var parts = text.replace(/₱/g, '').split(/[–—-]/);
    var nums = [];
    for (var i = 0; i < parts.length; i++) { var n = toNumber(parts[i]); if (n != null) nums.push(n); }
    if (!nums.length) return null;
    return { nums: nums, plus: plus };
  }

  function round5(n) { return Math.round(n / 5) * 5; }
  function fmt(n) { return n.toLocaleString('en-US'); }
  function label(range, rate) {
    var a = round5(range.nums[0] / rate);
    if (range.nums.length > 1) {
      var b = round5(range.nums[range.nums.length - 1] / rate);
      return '≈ $' + fmt(a) + '–$' + fmt(b) + (range.plus ? '+' : '');
    }
    return '≈ $' + fmt(a) + (range.plus ? '+' : '');
  }

  function render(rate) {
    var nodes = document.querySelectorAll('.pr-web-amount, .pr-plan-amount, .pr-row-price');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.querySelector('.pr-usd') || el.nextElementSibling && el.nextElementSibling.classList && el.nextElementSibling.classList.contains('pr-usd')) continue;
      var range = phpRange(el.textContent || '');
      if (!range) continue;
      var span = document.createElement('span');
      span.className = 'pr-usd';
      span.textContent = label(range, rate);
      /* Per-project rows: stack the USD inside the price cell, under the peso.
         Plan/web amounts: drop it onto its own line in the flex price row. */
      if (el.classList.contains('pr-row-price')) el.appendChild(span);
      else el.parentNode.appendChild(span);
    }
  }

  function init() { getRate(render); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
