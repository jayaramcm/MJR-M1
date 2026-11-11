/* 12-15. About, FAQ, Enquiry, Closing and Footer
   1. [data-rise] elements slide up as they enter the viewport, staggered
      within each group.
   2. About stats count up once.
   3. FAQ: one answer open at a time, with a smooth height animation.
   4. Enquiry form: validation and an on-screen thank-you.
   5. Closing photo drifts slowly behind the line as it scrolls past. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Rise-in reveal
  const risers = [...document.querySelectorAll('[data-rise]')];
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-rise');
    // Stagger siblings that share a parent
    const groups = new Map();
    risers.forEach((el) => {
      const list = groups.get(el.parentElement) || [];
      list.push(el);
      groups.set(el.parentElement, list);
    });
    groups.forEach((list) => list.forEach((el, i) => el.style.setProperty('--rd', (i * 0.09).toFixed(2) + 's')));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    risers.forEach((el) => io.observe(el));
  }

  // 2. Stats count up
  const counters = [...document.querySelectorAll('[data-count]')];
  const format = (n, plain) => (plain ? String(n) : n.toLocaleString('en-IN'));
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countIo.unobserve(entry.target);
        const el = entry.target;
        const to = Number(el.dataset.count);
        const plain = 'plain' in el.dataset;
        const from = plain ? to - 14 : 0;
        const start = performance.now();
        const DURATION = 1600;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = format(Math.round(from + (to - from) * eased), plain);
          if (t < 1) requestAnimationFrame(tick);
        };
        el.textContent = format(from, plain);
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => countIo.observe(el));
  }

  // 3. FAQ accordion
  const items = [...document.querySelectorAll('.qa')];
  items.forEach((item) => {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.qa__a');
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const opening = !item.open;
      if (opening) items.forEach((other) => { if (other !== item && other.open) toggle(other, false); });
      toggle(item, opening);
    });

    function toggle(el, open) {
      const body = el.querySelector('.qa__a');
      if (reduceMotion || !body.animate) { el.open = open; return; }
      if (open) el.open = true;
      const h = body.scrollHeight;
      const anim = body.animate(
        { height: open ? ['0px', h + 'px'] : [h + 'px', '0px'], opacity: open ? [0, 1] : [1, 0] },
        { duration: 450, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' }
      );
      anim.onfinish = () => { if (!open) el.open = false; };
    }
    void answer;
  });

  // 4. Enquiry form
  const form = document.getElementById('leadForm');
  if (form) {
    const name = document.getElementById('ldName');
    const phone = document.getElementById('ldPhone');
    const done = document.getElementById('leadDone');
    phone.addEventListener('input', () => { phone.value = phone.value.replace(/\D/g, '').slice(0, 10); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const checks = [
        [name, document.getElementById('ldNameErr'), name.value.trim().length >= 2],
        [phone, document.getElementById('ldPhoneErr'), /^[6-9]\d{9}$/.test(phone.value)],
      ];
      let firstBad = null;
      checks.forEach(([input, err, ok]) => {
        input.setAttribute('aria-invalid', String(!ok));
        err.hidden = ok;
        if (!ok && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); return; }

      const submit = document.getElementById('leadSubmit');
      submit.setAttribute('aria-busy', 'true');
      submit.textContent = 'Sending...';
      // TODO: connect to the MJR sales CRM / lead endpoint. Until then the request is only acknowledged on screen.
      setTimeout(() => {
        form.hidden = true;
        done.hidden = false;
        done.focus();
      }, 700);
    });
  }

  // 5. Closing photo drift
  const closingBg = document.querySelector('.closing__bg');
  if (closingBg && !reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(closingBg, { yPercent: -6 }, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: '.closing', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
