// Thin wrapper over the gtag snippet in index.html. Safe to call when the tag
// is blocked or absent — every event is a no-op then.
export function track(name, params) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// One delegated listener instead of wiring every CTA by hand: the App Store
// button appears in the header, footer, waitlist form, reset-password page
// and the prerendered post CTA, and the waitlist anchor in most of the same
// places. `location` is the nearest data-analytics-location, falling back to
// the pathname, so the report shows where the click came from.
export function initAnalytics() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const location = a.closest('[data-analytics-location]')?.dataset.analyticsLocation || window.location.pathname;
    if (href.includes('testflight.apple.com')) {
      track('beta_click', { location });
    } else if (href.includes('apps.apple.com')) {
      track('app_store_click', { location });
    } else if (href.endsWith('#waitlist')) {
      track('waitlist_cta_click', { location });
    }
  });
}
