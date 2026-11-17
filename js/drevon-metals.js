(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* unlock scrolling after the intro screen lifts */
  setTimeout(function () { document.body.classList.remove('lock'); }, reduce ? 0 : 2600);

  /* navbar background + scroll progress bar */
  var nav = $('#nav'), prog = $('#prog');
  function onScroll() {
    var y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('solid', y > 40);
    prog.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
  }
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  /* mobile menu */
  var b = $('#burger'), l = $('#links');
  function closeMenu() {
    l.classList.remove('open');
    b.classList.remove('open');
    b.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock');
  }
  b.addEventListener('click', function () {
    var o = l.classList.toggle('open');
    b.classList.toggle('open', o);
    b.setAttribute('aria-expanded', o);
    document.body.classList.toggle('lock', o);
  });
  l.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });

  /* scroll reveal */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
    });
  }, { threshold: .15 });
  $$('.rv,.shot,.reveal-rows,#steps').forEach(function (e) { io.observe(e); });

  /* animated counters */
  var co = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (!x.isIntersecting) return;
      co.unobserve(x.target);
      var el = x.target, end = parseFloat(el.dataset.n), d = +(el.dataset.d || 0), t0 = null;
      (function f(ts) {
        t0 = t0 || ts;
        var p = Math.min((ts - t0) / 2000, 1), v = end * (1 - Math.pow(1 - p, 4));
        el.textContent = v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
        if (p < 1) requestAnimationFrame(f);
      })(performance.now());
    });
  }, { threshold: .6 });
  $$('[data-n]').forEach(function (e) { co.observe(e); });

  /* cursor spotlight on cards + 3D tilt on inventory boxes */
  $$('.card').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      c.style.setProperty('--mx', x + 'px');
      c.style.setProperty('--my', y + 'px');
      if (c.classList.contains('tilt') && !reduce && e.pointerType === 'mouse') {
        c.style.transform = 'rotateY(' + ((x / r.width - .5) * 12) + 'deg) rotateX(' + ((.5 - y / r.height) * 12) + 'deg) translateZ(10px)';
      }
    });
    c.addEventListener('pointerleave', function () {
      if (c.classList.contains('tilt')) c.style.transform = '';
    });
  });

  /* hero wire canvas */
  var cv = $('#cv'), ctx = cv.getContext('2d'), W, H, mx = -999, my = 0, t = 0, run = true;
  var dpr = Math.min(devicePixelRatio || 1, 2);
  function size() {
    var r = cv.getBoundingClientRect();
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  addEventListener('resize', size);
  $('#home').addEventListener('pointermove', function (e) {
    var r = cv.getBoundingClientRect();
    mx = e.clientX - r.left; my = e.clientY - r.top;
  });
  $('#home').addEventListener('pointerleave', function () { mx = -999; });

  var N = W < 700 ? 16 : 30;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < N; i++) {
      var k = i / N, base = H * (.35 + k * .5), amp = 40 + k * 60, ph = i * .45;
      ctx.beginPath();
      for (var x = 0; x <= W; x += 10) {
        var y = base + Math.sin(x * .004 + t * .7 + ph) * amp + Math.sin(x * .011 - t * .5 + ph * 2) * amp * .28;
        var dx = x - mx, g = Math.exp(-(dx * dx) / 45000);
        y += (my - y) * g * .22;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = i % 3 === 0
        ? 'rgba(255,224,138,' + (.1 + k * .3) + ')'
        : 'rgba(180,215,225,' + (.06 + k * .2) + ')';
      ctx.lineWidth = i % 3 === 0 ? 1.2 : .7;
      ctx.stroke();
    }
    t += .012;
    if (run && !reduce) requestAnimationFrame(draw);
  }
  draw();

  /* pause the canvas when the hero is off screen */
  new IntersectionObserver(function (e) {
    var v = e[0].isIntersecting;
    if (v && !run && !reduce) { run = true; draw(); }
    run = v;
  }).observe($('#home'));

  /* enquiry form: opens the visitor's email app with the details filled in */
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var g = function (i) { return document.getElementById(i).value.trim(); };
    if (!g('n') || !g('e')) { alert('Please enter your name and email.'); return; }
    var body = 'Name: ' + g('n') + '\nCompany: ' + g('c') + '\nEmail: ' + g('e') +
               '\nPhone: ' + g('p') + '\nMetal: ' + g('m') + '\n\n' + g('t');
    $('#ok').style.display = 'block';
    location.href = 'mailto:office@drevongroup.com?subject=' +
      encodeURIComponent('Business enquiry: ' + g('m')) + '&body=' + encodeURIComponent(body);
  });
})();
