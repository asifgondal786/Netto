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
})();