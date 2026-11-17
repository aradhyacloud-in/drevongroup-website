/* =====================================================
   DREVON GROUP - HOME PAGE SCRIPT
   Works with the new index.html + style.css
   ===================================================== */

(function () {
    'use strict';

    var body = document.body;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1. PRELOADER + HERO INTRO ---------- */
    var preloader = document.getElementById('preloader');
    var introDone = false;
    var startTime = Date.now();
    var MIN_SHOW = reduceMotion ? 0 : 1800; // logo intro stays at least this long (ms)

    body.classList.add('no-scroll');

    function finishIntro() {
        if (introDone) return;
        introDone = true;
        if (preloader) preloader.classList.add('hide');
        body.classList.remove('no-scroll');
        // small delay so the hero animation starts as the loader fades
        setTimeout(function () { body.classList.add('loaded'); }, 250);
        if (preloader) setTimeout(function () { preloader.style.display = 'none'; }, 1000);
    }

    window.addEventListener('load', function () {
        var wait = Math.max(0, MIN_SHOW - (Date.now() - startTime));
        setTimeout(finishIntro, wait);
    });
    // Safety net: never leave the visitor stuck on the loader
    setTimeout(finishIntro, 4500);

    /* ---------- 2. SCROLL: PROGRESS BAR + NAVBAR STATE ---------- */
    var navbar = document.getElementById('navbar');
    var progress = document.getElementById('scrollProgress');
    var ticking = false;

    function onScroll() {
        var y = window.scrollY || document.documentElement.scrollTop;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
        if (navbar) navbar.classList.toggle('scrolled', y > 40);
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    /* ---------- 3. MOBILE MENU ---------- */
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    function setMenu(open) {
        if (!navToggle || !navLinks) return;
        navLinks.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        body.classList.toggle('no-scroll', open);
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            setMenu(!navLinks.classList.contains('open'));
        });
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () { setMenu(false); });
        });
    }

    /* ---------- 4. SCROLL REVEAL (identical for every element) ---------- */
    var reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && !reduceMotion) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        reveals.forEach(function (el) { revealObserver.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---------- 5. CARD SPOTLIGHT (follows the cursor) ---------- */
    var zoomCards = document.querySelectorAll('.zoom-card');

    zoomCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
    });

    /* ---------- 6. EXPAND MODAL (Vision / Mission / Values / Divisions) ---------- */
    var modal = document.getElementById('premiumZoomModal');
    var modalBody = document.getElementById('zoomModalBody');
    var closeBtn = modal ? modal.querySelector('.close-modal') : null;
    var overlay = modal ? modal.querySelector('.zoom-modal-overlay') : null;
    var lastFocused = null;

    function openModal(card) {
        if (!modal || !modalBody) return;
        lastFocused = document.activeElement;
        modalBody.innerHTML = '';

        var source = card.querySelector('.product-content') || card;
        var clone = source.cloneNode(true);
        clone.removeAttribute('style');
        modalBody.appendChild(clone);

        modal.classList.add('active');
        body.classList.add('no-scroll');
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        if (!modal || !modal.classList.contains('active')) return;
        modal.classList.remove('active');
        body.classList.remove('no-scroll');
        if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    zoomCards.forEach(function (card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        card.addEventListener('click', function (e) {
            if (e.target.closest('a')) return; // let division buttons navigate normally
            openModal(card);
        });

        card.addEventListener('keydown', function (e) {
            if (e.target !== card) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
            setMenu(false);
        }
    });

    /* ---------- 7. HERO CANVAS: METAL PARTICLE NETWORK ---------- */
    var canvas = document.getElementById('heroCanvas');

    if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var width = 0, height = 0, dpr = 1;
        var mouse = { x: -9999, y: -9999 };
        var running = true;
        var rafId = null;

        var GOLD = '201, 163, 94';
        var STEEL = '127, 155, 184';

        function resize() {
            var rect = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            var count = Math.min(95, Math.max(28, Math.floor((width * height) / 15000)));
            particles = [];
            for (var i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.6 + 0.6,
                    gold: Math.random() > 0.72
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            var LINK = 140;

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                if (!reduceMotion) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > width) p.vx *= -1;
                    if (p.y < 0 || p.y > height) p.vy *= -1;

                    // gentle push away from the cursor
                    var mdx = p.x - mouse.x;
                    var mdy = p.y - mouse.y;
                    var md = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (md < 120 && md > 0) {
                        p.x += (mdx / md) * 1.1;
                        p.y += (mdy / md) * 1.1;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + (p.gold ? GOLD : STEEL) + ', 0.85)';
                ctx.fill();

                for (var j = i + 1; j < particles.length; j++) {
                    var q = particles[j];
                    var dx = p.x - q.x;
                    var dy = p.y - q.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < LINK) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = 'rgba(' + (p.gold && q.gold ? GOLD : STEEL) + ', ' + (0.22 * (1 - dist / LINK)) + ')';
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            if (running && !reduceMotion) rafId = requestAnimationFrame(draw);
        }

        resize();
        draw();

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () { resize(); if (reduceMotion) draw(); }, 150);
        });

        var hero = canvas.parentElement;
        hero.addEventListener('mousemove', function (e) {
            var rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        hero.addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });

        // Pause the animation when the hero is off-screen (saves battery / CPU)
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                var visible = entries[0].isIntersecting;
                if (visible && !running) {
                    running = true;
                    if (!reduceMotion) rafId = requestAnimationFrame(draw);
                } else if (!visible) {
                    running = false;
                    if (rafId) cancelAnimationFrame(rafId);
                }
            }, { threshold: 0 }).observe(hero);
        }
    }

})();
