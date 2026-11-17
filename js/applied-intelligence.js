/* ===== Drevon Technologies | applied-intelligence.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Scroll progress + sticky navbar ---------- */
  var bar = $('#scrollProgress'), nav = $('#navbar');
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = $('#navToggle'), menu = $('#mainNav');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  $$('#mainNav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Scroll reveal ---------- */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Count-up numbers ---------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.target) || 0, suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1800;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$('.count');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else { counters.forEach(countUp); }

  /* ---------- Typing effect ---------- */
  var typed = $('#typedText');
  if (typed) {
    var words = (typed.dataset.words || '').split(',').filter(Boolean), wi = 0, ci = 0, del = false;
    if (reduce || !words.length) { typed.textContent = words[0] || ''; }
    else (function tick() {
      var w = words[wi];
      typed.textContent = w.slice(0, ci);
      var delay = del ? 45 : 95;
      if (!del && ci === w.length) { del = true; delay = 1600; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; delay = 350; }
      else { ci += del ? -1 : 1; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Card tilt + cursor glow ---------- */
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduce) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        card.style.transitionDelay = '0s';
        card.style.transition = 'transform .12s ease-out, border-color .3s, box-shadow .3s';
      });
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect(),
            x = e.clientX - r.left, y = e.clientY - r.top,
            rx = ((y / r.height) - 0.5) * -8, ry = ((x / r.width) - 0.5) * 8;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .3s';
        card.style.transform = '';
      });
    });

    /* ---------- Magnetic buttons ---------- */
    $$('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
        btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------- Neural network canvas ---------- */
  var canvas = $('#neural-canvas');
  if (canvas && canvas.getContext && !reduce) {
    var ctx = canvas.getContext('2d'), W, H, dpr, pts = [], mouse = { x: -9999, y: -9999 }, running = true;
    var LINK = 140, COLORS = ['34,211,238', '59,130,246', '139,92,246'];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(Math.floor((W * H) / 16000), 90);
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.6 + 0.8, c: COLORS[i % 3]
        });
      }
    }
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        var mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 120) { p.x += (mdx / md) * 1.2; p.y += (mdy / md) * 1.2; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = 'rgba(' + p.c + ',.9)';
        ctx.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = 'rgba(' + p.c + ',' + (0.35 * (1 - d / LINK)) + ')';
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 200); });
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(draw);
    });
    resize();
    requestAnimationFrame(draw);
  }
})();
