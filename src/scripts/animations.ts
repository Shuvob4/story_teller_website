// animations.ts — GSAP scroll animations + hero entrance + page transitions

document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // If reduced motion is preferred, show everything immediately
  if (reducedMotion.matches) {
    showAll();
    return;
  }

  // Dynamically import GSAP (deferred, non-blocking)
  Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]).then(([{ gsap }, { ScrollTrigger }]) => {
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
        .fromTo(heroEyebrow, { opacity: 0, y: 24 }, { opacity: 1, y: 0 })
        .fromTo(heroHeadline, { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, '-=0.45')
        .fromTo(heroCta, { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, '-=0.3');
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

    // --- Page transition fade (for View Transitions API if available) ---
    const main = document.querySelector('main');
    if (main) {
      gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'linear' });
    }
  });

  function showAll() {
    // Remove GSAP hidden classes to reveal content immediately
    document.querySelectorAll('.gsap-hidden').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    // Also reveal hero elements
    document.querySelectorAll('.hero__eyebrow, .hero__headline, .hero__cta').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    // Reveal data-animate elements
    document.querySelectorAll('[data-animate]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
  }
});
