// animations.ts — GSAP scroll animations + hero entrance

document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // If reduced motion is preferred, ensure everything is visible and skip
  if (reducedMotion.matches) {
    showAll();
    return;
  }

  // Hide hero elements via JS immediately (before GSAP loads)
  // This way: if GSAP fails to load, a fallback timeout reveals them
  const heroElements = document.querySelectorAll<HTMLElement>('[data-hero-animate]');
  heroElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
  });

  // Safety net: if GSAP doesn't load within 3 seconds, show everything
  const fallbackTimer = setTimeout(() => {
    showAll();
  }, 3000);

  // Dynamically import GSAP (deferred, non-blocking)
  Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]).then(([{ gsap }, { ScrollTrigger }]) => {
    clearTimeout(fallbackTimer);
    gsap.registerPlugin(ScrollTrigger);

    // Listen for reduced motion change mid-session
    reducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        showAll();
      }
    });

    // --- Hero entrance animation ---
    const heroEyebrow = document.querySelector('.hero__eyebrow');
    const heroHeadline = document.querySelector('.hero__headline');
    const heroCta = document.querySelector('.hero__cta');

    if (heroEyebrow && heroHeadline && heroCta) {
      const heroTl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } });
      heroTl
        .to(heroEyebrow, { opacity: 1, y: 0 })
        .to(heroHeadline, { opacity: 1, y: 0 }, '-=0.45')
        .to(heroCta, { opacity: 1, y: 0 }, '-=0.3');
    } else {
      // No hero on this page, clear any hidden state
      heroElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }

    // --- Scroll-triggered fade-up for [data-animate] elements ---
    const animateEls = document.querySelectorAll('[data-animate]');
    animateEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

  }).catch(() => {
    // If GSAP fails to load entirely, show everything
    clearTimeout(fallbackTimer);
    showAll();
  });

  function showAll() {
    document.querySelectorAll<HTMLElement>('.gsap-hidden, [data-hero-animate], [data-animate]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});
