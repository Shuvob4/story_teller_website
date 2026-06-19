// cursor.ts — Custom cursor effect for desktop

(function initCursor() {
  // Don't initialize on touch devices or if reduced motion
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.innerWidth >= 1024;

  if (isTouch || reducedMotion || !isDesktop) return;

  // Create cursor element
  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  cursor.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    background: rgba(201, 168, 76, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  // Hide default cursor
  document.body.style.cursor = 'none';
  document.querySelectorAll('a, button').forEach((el) => {
    (el as HTMLElement).style.cursor = 'none';
  });

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow with rAF
  function followCursor() {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    requestAnimationFrame(followCursor);
  }
  requestAnimationFrame(followCursor);

  // Scale on hover over interactive elements
  document.addEventListener('mouseenter', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('a, button, [role="button"]')) {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
      cursor.style.background = 'rgba(201, 168, 76, 0.9)';
    }
  }, true);

  document.addEventListener('mouseleave', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('a, button, [role="button"]')) {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.background = 'rgba(201, 168, 76, 0.6)';
    }
  }, true);
})();
