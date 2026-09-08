/* =========================================================
   BSOLUTIONS — GSAP animations
   Requires gsap.min.js + ScrollTrigger.min.js loaded before this file.
   Fails silently (site stays fully visible/usable) if GSAP didn't load.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion) {
    // Respect the user's OS setting: skip motion, keep everything simply visible.
    gsap.set('body', { opacity: 1 });
    return;
  }

  const ease = 'power3.out';

  /* ---------- Page fade-in ---------- */
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: .4, ease: 'power1.out' });

  /* ---------- Header logo ---------- */
  gsap.from('.brand img', { opacity: 0, y: -12, duration: .6, ease, delay: .1 });

  /* ---------- Hero entrance (runs once, on load, not scroll-triggered) ---------- */
  const heroTl = gsap.timeline({ defaults: { ease }, delay: .15 });
  const heroHeading = document.querySelector('.page-hero h1, .hero h1');
  if (heroHeading) {
    heroTl
      .from(heroHeading, { opacity: 0, y: 34, duration: .8 })
      .from('.page-hero .subtitle, .hero .subtitle', { opacity: 0, y: 22, duration: .6 }, '-=0.45')
      .from('.hero-intro p', { opacity: 0, y: 18, duration: .6 }, '-=0.35')
      .from('.hero-intro .btn-row > *, .hero-cta > *', { opacity: 0, y: 14, stagger: .12, duration: .5 }, '-=0.3')
      .from('.hero-facts > *', { opacity: 0, y: 14, stagger: .1, duration: .5 }, '-=0.3');
  }

  /* ---------- Hero blob: gentle parallax drift while scrolling past ---------- */
  gsap.utils.toArray('.page-hero .blob, .hero .blob').forEach((blob) => {
    gsap.to(blob, {
      y: 70,
      ease: 'none',
      scrollTrigger: {
        trigger: blob.closest('.page-hero, .hero'),
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  });

  /* ---------- Hero gradient: infinite drift from one point to another ---------- */
  gsap.utils.toArray('.blob radialGradient').forEach((grad) => {
    gsap.to(grad, {
      attr: { cx: '68%', cy: '62%' },
      duration: 7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });

  /* ---------- Section headings ---------- */
  gsap.utils.toArray('.section-head, .touch-head').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 32, duration: .7, ease,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  /* ---------- Staggered card grids ---------- */
  const gridSelectors = [
    '.expertise-grid', '.values-grid', '.team-grid', '.touch-grid',
    '.join-grid', '.case-grid', '.why-grid', '.outcomes-grid',
  ];
  gridSelectors.forEach((sel) => {
    const grid = document.querySelector(sel);
    if (!grid) return;
    const items = Array.from(grid.children).filter((el) => !el.classList.contains('expertise-cta'));
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0, y: 40, duration: .65, stagger: .12, ease,
      scrollTrigger: { trigger: grid, start: 'top 85%' },
    });
  });

  /* CTA divider inside the expertise grid, if present */
  const expertiseCta = document.querySelector('.expertise-cta');
  if (expertiseCta) {
    gsap.from(expertiseCta, {
      opacity: 0, duration: .6,
      scrollTrigger: { trigger: expertiseCta, start: 'top 90%' },
    });
  }

  /* ---------- Pillars pills ---------- */
  const pillars = document.querySelector('.pillars-row');
  if (pillars) {
    gsap.from(pillars.children, {
      opacity: 0, y: 16, stagger: .06, duration: .5, ease,
      scrollTrigger: { trigger: pillars, start: 'top 90%' },
    });
  }

  /* ---------- Stats row ---------- */
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) {
    gsap.from(statsRow.children, {
      opacity: 0, y: 24, stagger: .1, duration: .6, ease,
      scrollTrigger: { trigger: statsRow, start: 'top 85%' },
    });
  }
  const statHero = document.querySelector('.stat-hero');
  if (statHero) {
    gsap.from(statHero, {
      opacity: 0, scale: .92, duration: .7, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: statHero, start: 'top 88%' },
    });
  }

  /* ---------- Timeline (About Us — six fronts) ---------- */
  gsap.utils.toArray('.tl-row').forEach((row) => {
    const badge = row.querySelector('.tl-mark .badge');
    const content = Array.from(row.querySelectorAll('.tl-content')).find((el) => el.querySelector('h4'));
    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 82%' } });
    if (badge) tl.from(badge, { opacity: 0, scale: .3, duration: .5, ease: 'back.out(2.2)' });
    if (content) {
      const fromLeft = content.classList.contains('side-left');
      tl.from(content, { opacity: 0, x: fromLeft ? -36 : 36, duration: .55, ease }, '-=0.25');
    }
  });
  gsap.utils.toArray('.timeline').forEach((tl) => {
    gsap.fromTo(tl, { '--tl-scale': 0 }, {
      '--tl-scale': 1, duration: 1, ease: 'none',
      scrollTrigger: { trigger: tl, start: 'top 75%', end: 'bottom 85%', scrub: .6 },
    });
  });

  /* ---------- Quote block ---------- */
  const quote = document.querySelector('.quote-block blockquote');
  if (quote) {
    gsap.from(quote, {
      opacity: 0, y: 26, duration: .8, ease,
      scrollTrigger: { trigger: quote, start: 'top 82%' },
    });
  }

  /* ---------- FAQ list ---------- */
  const faqList = document.querySelector('.faq-list');
  if (faqList) {
    gsap.from(faqList.children, {
      opacity: 0, y: 22, stagger: .08, duration: .55, ease,
      scrollTrigger: { trigger: faqList, start: 'top 85%' },
    });
  }

  /* ---------- Contact form fields ---------- */
  const formGrid = document.querySelector('.form-grid');
  if (formGrid) {
    gsap.from(formGrid.children, {
      opacity: 0, y: 20, stagger: .06, duration: .5, ease,
      scrollTrigger: { trigger: formGrid, start: 'top 85%' },
    });
  }

  /* ---------- WhatsApp float: pop in after page settles ---------- */
  const waFloat = document.querySelector('.wa-float');
  if (waFloat) {
    gsap.from(waFloat, { opacity: 0, scale: 0, duration: .5, ease: 'back.out(2)', delay: 1 });
  }
});
