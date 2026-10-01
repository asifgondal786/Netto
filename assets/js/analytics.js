(() => {
  window.plausible = window.plausible || function (...args) {
    (window.plausible.q = window.plausible.q || []).push(args);
  };

  window.nettoTrack = (eventName, props = {}) => {
    window.plausible(eventName, { props });
  };

  window.nettoPageview = () => {
    window.plausible('pageview', { u: `${window.location.origin}${window.location.pathname}` });
  };

  window.nettoPageview();

  let scriptAdded = false;
  function loadPlausible() {
    if (scriptAdded) return;
    scriptAdded = true;
    const script = document.createElement('script');
    script.src = 'https://plausible.io/js/script.manual.js';
    script.dataset.domain = 'shimmering-crumble-b2abe8.netlify.app';
    script.async = true;
    document.head.append(script);
  }

  function schedulePlausible() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadPlausible, { timeout: 2000 });
    } else {
      window.setTimeout(loadPlausible, 0);
    }
  }

  if (document.readyState === 'complete') {
    schedulePlausible();
  } else {
    window.addEventListener('load', schedulePlausible, { once: true });
  }
})();