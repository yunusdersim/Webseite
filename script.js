/* AI Agents Workshop — Interactions */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Navbar */
  const nav = document.getElementById('nav');
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* Hamburger */
  const burger = document.getElementById('burger');
  const links  = document.querySelector('.nav__links');
  const cta    = document.querySelector('.nav__cta');

  if (burger) {
    burger.addEventListener('click', function () {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      if (!open) {
        links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(247,244,238,.98);backdrop-filter:blur(16px);padding:16px 28px 24px;border-top:1px solid #E2DDD4;box-shadow:0 20px 40px rgba(13,13,13,.1);gap:4px;';
        if (cta) cta.style.cssText = 'display:inline-flex;margin:12px 28px 0;';
      } else {
        links.removeAttribute('style');
        if (cta) cta.removeAttribute('style');
      }
    });
    links && links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.setAttribute('aria-expanded', 'false');
        links.removeAttribute('style');
        if (cta) cta.removeAttribute('style');
      });
    });
  }

  /* Scroll reveal */
  function checkReveals() {
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add('in');
      }
    });
  }
  checkReveals();
  window.addEventListener('scroll', checkReveals, { passive: true });

  /* Count-up */
  function countUp(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const dur = 1600;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = (Number.isInteger(target) ? Math.round(ease * target) : (ease * target).toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  const countEls = document.querySelectorAll('.count-up');
  if (countEls.length) {
    const co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    countEls.forEach(function (el) { co.observe(el); });
  }

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 76, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

})();
