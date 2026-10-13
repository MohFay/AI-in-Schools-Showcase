(function () {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const storedTheme = (() => { try { return localStorage.getItem('ai-schools-theme'); } catch (_) { return null; } })();
  const preferredTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function applyTheme(theme) {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = normalized;
    if (themeButton) {
      themeButton.setAttribute('aria-label', normalized === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeButton.setAttribute('title', normalized === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      const sun = themeButton.querySelector('[data-icon-sun]');
      const moon = themeButton.querySelector('[data-icon-moon]');
      if (sun) sun.hidden = normalized !== 'dark';
      if (moon) moon.hidden = normalized === 'dark';
    }
    try { localStorage.setItem('ai-schools-theme', normalized); } catch (_) { /* Storage may be disabled. */ }
  }

  applyTheme(storedTheme || preferredTheme);
  if (themeButton) themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
    }));
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealElements.forEach(element => observer.observe(element));
  }
})();
