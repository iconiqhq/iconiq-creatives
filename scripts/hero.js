/* hero.js — Canvas gradient mesh + rotating subtitle animation */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════
     GRADIENT MESH CANVAS
     Four radial orbs (blue + pink) drift with sinusoidal
     wobble and react subtly to mouse cursor position.
     Uses screen blend mode so colours mix like light.
  ═══════════════════════════════════════════════════ */

  class HeroCanvas {
    constructor() {
      this.canvas = document.getElementById('hero-canvas');
      if (!this.canvas) return;

      this.ctx   = this.canvas.getContext('2d');
      this.time  = 0;
      this.raf   = null;
      this.alive = true;

      /* Smoothed mouse position (normalised 0–1) */
      this.mouse  = { x: 0.5, y: 0.5 };
      this.target = { x: 0.5, y: 0.5 };

      /*
        Orb definitions — base position, radius, and colour in normalised coords.
        speed  : how fast the orb oscillates
        phase  : offset so orbs don't move in sync
        mx/my  : mouse influence multiplier (slight variation per orb)
      */
      this.orbs = [
        { bx: 0.18, by: 0.38, r: 0.62, rgb: [65, 189, 254],  speed: 0.88, phase: 0.00, mx: 0.055, my: 0.048 },
        { bx: 0.82, by: 0.62, r: 0.58, rgb: [225, 17,  251], speed: 0.72, phase: 1.30, mx: 0.042, my: 0.060 },
        { bx: 0.58, by: 0.16, r: 0.46, rgb: [65, 189, 254],  speed: 1.05, phase: 2.50, mx: 0.060, my: 0.040 },
        { bx: 0.32, by: 0.84, r: 0.42, rgb: [225, 17,  251], speed: 0.80, phase: 3.80, mx: 0.050, my: 0.055 },
      ];

      this._init();
    }

    _init() {
      this._resize();
      window.addEventListener('resize', () => this._resize());

      document.addEventListener('mousemove', (e) => {
        this.target.x = e.clientX / window.innerWidth;
        this.target.y = e.clientY / window.innerHeight;
      });

      /* Pause animation when tab is hidden — saves battery */
      document.addEventListener('visibilitychange', () => {
        this.alive = !document.hidden;
        if (this.alive) this._loop();
      });

      this._loop();
    }

    _resize() {
      this.canvas.width  = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    _loop() {
      if (!this.alive) return;

      this.time += 0.00065;

      /* Lerp mouse toward target — smooth follow, not instant */
      this.mouse.x += (this.target.x - this.mouse.x) * 0.042;
      this.mouse.y += (this.target.y - this.mouse.y) * 0.042;

      const w   = this.canvas.width;
      const h   = this.canvas.height;
      const ctx = this.ctx;
      const t   = this.time;
      const mx  = this.mouse.x;
      const my  = this.mouse.y;

      /* Fill black */
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      /* Screen blend — colours add like coloured light */
      ctx.globalCompositeOperation = 'screen';

      this.orbs.forEach((orb) => {
        /* Sinusoidal drift around base position */
        const wobX = Math.sin(t * orb.speed + orb.phase)        * 0.092;
        const wobY = Math.cos(t * orb.speed * 0.63 + orb.phase) * 0.072;

        /* Mouse nudge — each orb responds slightly differently */
        const nudX = (mx - 0.5) * orb.mx;
        const nudY = (my - 0.5) * orb.my;

        const x = (orb.bx + wobX + nudX) * w;
        const y = (orb.by + wobY + nudY) * h;
        const r = orb.r * Math.max(w, h);

        /* Radial gradient: bright core, soft falloff */
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0.00, `rgba(${orb.rgb[0]},${orb.rgb[1]},${orb.rgb[2]},0.24)`);
        g.addColorStop(0.30, `rgba(${orb.rgb[0]},${orb.rgb[1]},${orb.rgb[2]},0.10)`);
        g.addColorStop(0.65, `rgba(${orb.rgb[0]},${orb.rgb[1]},${orb.rgb[2]},0.03)`);
        g.addColorStop(1.00, `rgba(${orb.rgb[0]},${orb.rgb[1]},${orb.rgb[2]},0.00)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      this.raf = requestAnimationFrame(() => this._loop());
    }
  }


  /* ═══════════════════════════════════════════════════
     ROTATING SUBTITLE
     Cycles the Iconiq Creatives services.
     Transition: fade-out up 8px → swap text → fade-in from 8px below
  ═══════════════════════════════════════════════════ */

  const TITLES = [
    'Website Design',
    'Social Media Management',
    'Graphic Design',
    'Video Editing',
  ];

  let titleIndex = 0;
  let titleEl    = null;

  function initRotatingTitle() {
    titleEl = document.getElementById('hero-rotating-title');
    if (!titleEl) return;

    /* Wait for hero entry animations to finish before starting */
    setTimeout(startRotation, 2200);
  }

  function startRotation() {
    setInterval(rotateTitleNext, 2900);
  }

  function rotateTitleNext() {
    if (!titleEl) return;

    /* Step 1: fade out and slide up */
    titleEl.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
    titleEl.style.opacity    = '0';
    titleEl.style.transform  = 'translateY(-8px)';

    setTimeout(function () {
      /* Step 2: advance index, set entry position below (no transition) */
      titleIndex = (titleIndex + 1) % TITLES.length;
      titleEl.textContent = TITLES[titleIndex];

      titleEl.style.transition = 'none';
      titleEl.style.opacity    = '0';
      titleEl.style.transform  = 'translateY(8px)';

      /* Step 3: force reflow so browser registers the "from" state */
      void titleEl.offsetHeight;

      /* Step 4: fade in and slide to resting position */
      titleEl.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
      titleEl.style.opacity    = '1';
      titleEl.style.transform  = 'translateY(0)';
    }, 400);
  }


  /* ═══════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', function () {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      new HeroCanvas();
    }

    initRotatingTitle();
  });

})();
