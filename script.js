// ============ Mobile nav toggle (with hamburger -> X animation) ============
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

// ============ Sticky header shadow on scroll ============
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  const onScroll = () => {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ============ Reveal-on-scroll ============
const revealSelectors = [
  '.section-head', '.expertise-item', '.value-item', '.team-card',
  '.touch-card', '.case-card', '.why-item', '.outcome', '.join-item',
  '.tl-row', '.stat', '.stat-hero', '.quote-block blockquote'
];
const revealTargets = document.querySelectorAll(revealSelectors.join(','));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  revealTargets.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => io.observe(el));
}

// ============ FAQ accordion ============
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  const setState = (open) => {
    if (open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    else { item.classList.remove('open'); a.style.maxHeight = 0; }
  };
  setState(item.classList.contains('open'));
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(other => setState(false));
    if (!isOpen) setState(true);
  });
});
window.addEventListener('resize', () => {
  faqItems.forEach(item => {
    if (item.classList.contains('open')) {
      const a = item.querySelector('.faq-a');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ============ Contact form -> mailto (with button feedback) ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (id) => (document.getElementById(id) ? document.getElementById(id).value.trim() : '');
    const subject = encodeURIComponent(`Contacto pelo site: ${val('service') || 'Pedido geral'}`);
    const body = encodeURIComponent(
      `Nome: ${val('firstName')} ${val('lastName')}\n` +
      `E-mail: ${val('email')}\nTelefone: ${val('phone')}\n` +
      `Serviço: ${val('service')}\nOrçamento previsto: ${val('budget')}\n` +
      `Assunto: ${val('subject')}\n\nMensagem:\n${val('message')}`
    );

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      const original = submitBtn.innerHTML;
      submitBtn.classList.add('is-sent');
      submitBtn.innerHTML = 'A abrir o seu e-mail…';
      setTimeout(() => {
        submitBtn.classList.remove('is-sent');
        submitBtn.innerHTML = original;
      }, 2500);
    }

    window.location.href = `mailto:comercial@bsolution.cc?subject=${subject}&body=${body}`;
  });
}

// ============ Footer year ============
document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());
