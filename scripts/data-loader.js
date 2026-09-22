/* data-loader.js — Fetches JSON data files and provides to section renderers */

(function () {
  'use strict';

  /* ── Live follower counts from a Google Sheet ─────────────────────────
     In Google Sheets: File → Share → Publish to web → choose the sheet →
     "Comma-separated values (.csv)" → Publish, then paste that URL below.
     Sheet columns (header row required, any order):  brand_id | platform | followers
     Only the `followers` value is used; it overrides that platform's count on
     the site (Total Reach re-sums automatically). Growth charts stay from JSON.
     Leave this empty to just use the numbers in data/projects.json. */
  const FOLLOWERS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1HAW9MtQebfYVGBfl2Pt9bJc_HZmA3I2kK7n4zD_52As/gviz/tq?tqx=out:csv';

  async function loadJSON(path) {
    /* Revalidate so edits to the /data JSON show up without a stale cache. */
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load: ' + path);
    return res.json();
  }

  /* Minimal CSV parser (handles quoted fields + embedded commas/quotes). */
  function parseCSV(text) {
    const rows = [];
    let row = [], cell = '', inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { cell += '"'; i++; }   // escaped quote
          else inQuotes = false;
        } else cell += c;
      } else if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
      else if (c !== '\r') cell += c;
    }
    if (cell.length || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  /* Fetch the sheet → { brand_id: { platform: followers } } (lower-cased keys). */
  async function loadFollowerOverrides() {
    if (!FOLLOWERS_CSV_URL) return null;
    try {
      const res = await fetch(FOLLOWERS_CSV_URL, { cache: 'no-cache' });
      if (!res.ok) return null;
      const rows = parseCSV(await res.text());
      if (rows.length < 2) return null;
      const head = rows[0].map(h => h.trim().toLowerCase());
      const iBrand = head.indexOf('brand_id');
      const iPlat  = head.indexOf('platform');
      const iFoll  = head.indexOf('followers');
      if (iBrand < 0 || iPlat < 0 || iFoll < 0) return null;
      const map = {};
      for (let r = 1; r < rows.length; r++) {
        const cells = rows[r];
        const brand = (cells[iBrand] || '').trim().toLowerCase();
        const plat  = (cells[iPlat]  || '').trim().toLowerCase();
        const num   = parseInt(String(cells[iFoll] || '').replace(/[^0-9]/g, ''), 10);
        if (!brand || !plat || isNaN(num)) continue;   // blank/invalid → keep the JSON value
        (map[brand] || (map[brand] = {}))[plat] = num;
      }
      return map;
    } catch (_) { return null; }   // offline / not published yet → fall back to JSON
  }

  /* Override each platform's currentFollowers with the sheet value (matched by
     brand_id + platform name). Unmatched rows are ignored; missing values keep
     the JSON number. */
  function mergeFollowers(data, overrides) {
    if (!overrides || !data || !data.projects) return data;
    data.projects.forEach(p => {
      const byPlat = overrides[String(p.id || '').toLowerCase()];
      if (!byPlat || !p.platforms) return;
      p.platforms.forEach(pl => {
        const v = byPlat[String(pl.name || '').toLowerCase()];
        if (typeof v === 'number') pl.currentFollowers = v;
      });
    });
    return data;
  }

  /* Expose loader globally for section scripts */
  window.PortfolioData = {
    loadProjects: async () => {
      const [data, overrides] = await Promise.all([
        loadJSON('data/projects.json'),
        loadFollowerOverrides(),
      ]);
      return mergeFollowers(data, overrides);
    },
    loadWebsites:    () => loadJSON('data/websites.json'),
    loadDesign:      () => loadJSON('data/design.json'),
    loadVideos:      () => loadJSON('data/videos.json'),
  };
})();
