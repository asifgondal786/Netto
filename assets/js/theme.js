(() => {
  const root = document.documentElement;
  const storageKey = 'netto-theme';
  const preference = window.matchMedia('(prefers-color-scheme: dark)');

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function syncThemeControls() {
    const isDark = root.dataset.theme === 'dark';
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    document.querySelectorAll('.theme').forEach((button) => {
      button.textContent = isDark ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-label', label);
      button.setAttribute('aria-pressed', String(isDark));
      button.title = label;
    });

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#101820' : '#E8EDF2');
  }

  function setTheme(theme, persist = false) {
    root.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The current-page theme still works when storage is unavailable.
      }
    }
    syncThemeControls();
  }

  setTheme(getSavedTheme() || (preference.matches ? 'dark' : 'light'));

  function bindThemeControls() {
    syncThemeControls();
    document.querySelectorAll('.theme').forEach((button) => {
      button.addEventListener('click', () => {
        setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeControls, { once: true });
  } else {
    bindThemeControls();
  }

  preference.addEventListener('change', (event) => {
    if (!getSavedTheme()) setTheme(event.matches ? 'dark' : 'light');
  });
})();