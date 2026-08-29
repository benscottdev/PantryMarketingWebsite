import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { REFRESH_PRIORITY } from '../scrollPriority';
import Problem from './components/Problem';
import HowItWorks from './components/HowItWorks';
import Household from './components/Household';
import Meals from './components/Meals';
import Features from './components/Features';
import Faq from './components/Faq';
import RecentPosts from './components/RecentPosts';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Media queries. Every branch is registered on one `gsap.matchMedia()`
// instance so a single `kill()` tears all of them down together — nesting a
// second matchMedia inside a branch (as this used to) leaves its triggers
// alive after the outer one reverts, and each hot reload or remount then
// stacks another full set of pins on the page.
const MOTION = '(prefers-reduced-motion: no-preference)';
const MOTION_WIDE = '(prefers-reduced-motion: no-preference) and (min-width: 901px)';
const MOTION_NARROW = '(prefers-reduced-motion: no-preference) and (max-width: 900px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

// Pin lengths as multiples of the pinned section's own height rather than fixed
// pixel counts, so the scrub rate is the same on a laptop and a tall monitor.
// Paired with `invalidateOnRefresh` these are re-measured on every refresh.
//
// The section, not the window: these sections are sized in `lvh`, while
// `window.innerHeight` on mobile reports whatever the URL bar has left of the
// viewport. Measuring the distance in one and the box in the other let a pin
// run out of timeline before it released.
const pinLength = (selector, n) => () => {
  const el = document.querySelector(selector);
  return `+=${(el?.offsetHeight || window.innerHeight) * n}`;
};

// Problem: pinned counter runs up to $2,500, then the stamp slams in.
function buildProblem() {
  const counter = { v: 0 };
  const cEl = document.querySelector('[data-counter]');
  const isMobile = window.innerWidth < 900;
  const tl = gsap.timeline({
    scrollTrigger: {
      id: 'problem',
      trigger: '[data-problem]',
      start: 'top top',
      end: pinLength('[data-problem]', 1.6),
      pin: true,
      // Lenis already eases the scroll on touch; scrub smoothing on top of it
      // eases towards a target that is itself still easing, and reversing
      // direction unwinds both. anticipatePin's velocity guess is unreliable
      // under smooth scrolling too, and shows up as a jump into the pin.
      scrub: true,
      anticipatePin: isMobile ? 0 : 1,
      invalidateOnRefresh: true,
      refreshPriority: REFRESH_PRIORITY.PROBLEM,
    },
  });

  tl.to(counter, {
    v: 2500,
    duration: 3,
    ease: 'power1.inOut',
    onUpdate: () => {
      if (cEl) cEl.textContent = '$' + Math.round(counter.v).toLocaleString('en-AU');
    },
  });

  // The stamp is currently commented out of Problem.jsx. Skipping the tween
  // rather than letting it run against an empty selector keeps the pin's own
  // length honest and the console clean.
  if (document.querySelector('[data-stamp]')) {
    tl.fromTo(
      '[data-stamp]',
      { scale: 3.5, opacity: 0, rotation: 10 },
      { scale: 1, opacity: 1, rotation: -6, duration: 0.5, ease: 'power4.in' }
    );
  }

  // Holds the finished counter on screen before the pin releases, so the
  // number isn't whipped away the instant it lands on $2,500.
  tl.to({}, { duration: 0.6 });
}

// The how-it-works phone showcase: an accordion of steps on the left whose
// active item opens, and a stack of screens in the phone on the right where
// each step's screen slides up over the one before it.
//
// Colours come off the section's own `--pill-*` / `--num-*` custom properties
// rather than being written here, so the dark and light themes stay a CSS
// concern — see the `.showcase` block in site.scss.
function readTheme(root) {
  const css = getComputedStyle(root);
  const tok = (name) => css.getPropertyValue(name).trim();
  return {
    off: { pill: tok('--pill-bg'), fg: tok('--pill-fg'), num: tok('--num-bg') },
    on: { pill: tok('--pill-bg-on'), fg: tok('--pill-fg-on'), num: tok('--num-bg-on') },
  };
}

function showcaseParts(scene) {
  const root = document.querySelector(`[data-showcase="${scene}"]`);
  if (!root) return null;
  const q = (sel) => gsap.utils.toArray(sel, root);
  const parts = {
    root,
    cards: q('[data-showcase-card]'),
    pills: q('[data-showcase-pill]'),
    nums: q('[data-showcase-num]'),
    titles: q('[data-showcase-step-title]'),
    reveals: q('[data-showcase-reveal]'),
  };
  return parts.cards.length > 1 ? parts : null;
}

// Parks the scene on its first step: first screen showing, first description
// open, everything else closed and waiting below.
function parkShowcase(parts) {
  const { cards, pills, nums, titles, reveals } = parts;
  const { off, on } = readTheme(parts.root);

  gsap.set(cards, { yPercent: 100 });
  gsap.set(cards[0], { yPercent: 0 });
  gsap.set(reveals, { height: 0 });
  gsap.set(reveals[0], { height: 'auto' });
  gsap.set(pills, { backgroundColor: off.pill });
  gsap.set(titles, { color: off.fg });
  gsap.set(nums, { backgroundColor: off.num });
  gsap.set(pills[0], { backgroundColor: on.pill });
  gsap.set(titles[0], { color: on.fg });
  gsap.set(nums[0], { backgroundColor: on.num });
}

function buildShowcase(scene, id, refreshPriority, holdFirstVh = 0) {
  const parts = showcaseParts(scene);
  if (!parts) return;
  const { cards, pills, nums, titles, reveals } = parts;
  const { off, on } = readTheme(parts.root);
  const steps = cards.length;

  parkShowcase(parts);

  // Only one description is open at a time, but each is a different length, so
  // the list's height changes as they swap — and with the copy column centred
  // in the grid, that would shunt the whole block up and down mid-scroll.
  // Reserving the tallest state up front keeps step 1 anchored where it is.
  // A function-based value so `invalidateOnRefresh` re-measures it on resize.
  const stepsList = parts.root.querySelector('.showcase__steps');
  const reserve = () => {
    const pillsHeight = pills.reduce((a, el) => a + el.offsetHeight, 0);
    const gaps = parseFloat(getComputedStyle(stepsList).rowGap || 0) * (steps - 1);
    const tallest = Math.max(...reveals.map((el) => el.scrollHeight));
    return pillsHeight + gaps + tallest;
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      id,
      trigger: `[data-showcase="${scene}"]`,
      start: 'top top',
      // One screen of scroll per transition, plus a little to hold the last
      // step before the pin lets go. `holdFirstVh` is extra dwell on step 1
      // (How it works: 50dvh) so the first screen can be read before it moves.
      // Desktop-only branch (MOTION_WIDE), so the window height is the section
      // height here — there is no mobile chrome to reconcile.
      end: () => `+=${window.innerHeight * (steps - 1 + 0.35 + holdFirstVh)}`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority,
    },
  });

  tl.set(stepsList, { minHeight: reserve }, 0);
  if (holdFirstVh > 0) tl.to({}, { duration: holdFirstVh });

  for (let i = 1; i < steps; i++) {
    const at = holdFirstVh + (i - 1);
    tl.to(cards[i], { yPercent: 0, duration: 0.7, ease: 'power3.inOut' }, at)
      // Close the step we're leaving and open the one we're arriving at, both
      // to measured pixel heights so the scrub stays smooth.
      .to(reveals[i - 1], { height: 0, duration: 0.45, ease: 'power2.inOut' }, at)
      .to(reveals[i], { height: () => reveals[i].scrollHeight, duration: 0.45, ease: 'power2.inOut' }, at)
      .to(pills[i - 1], { backgroundColor: off.pill, duration: 0.35 }, at)
      .to(titles[i - 1], { color: off.fg, duration: 0.35 }, at)
      .to(nums[i - 1], { backgroundColor: off.num, duration: 0.35 }, at)
      .to(pills[i], { backgroundColor: on.pill, duration: 0.35 }, at)
      .to(titles[i], { color: on.fg, duration: 0.35 }, at)
      .to(nums[i], { backgroundColor: on.num, duration: 0.35 }, at);
  }

  tl.to({}, { duration: 0.35 });
}

// Reduced motion: no pin, so nothing opens the accordion or brings the screens
// in. Every description is shown and the last screen is put on top of the
// stack, so the phone shows the payoff rather than an empty frame. The pills
// are left on their CSS defaults — with all the copy visible there's no active
// step to point at.
function setShowcaseFinalState(scene) {
  const parts = showcaseParts(scene);
  if (!parts) return;
  gsap.set(parts.cards, { yPercent: 0 });
  gsap.set(parts.reveals, { height: 'auto' });
}

// Narrow-viewport stand-in for the pinned timeline: the screens cycle on a
// wall-clock loop instead of on scroll, so a phone-width visitor still sees
// every step's screen rather than just the last. Gated to the section being on
// screen so it isn't running — or draining battery — off-screen.
function buildMobileShowcaseLoop(scene) {
  const parts = showcaseParts(scene);
  if (!parts) return;
  const { cards } = parts;
  const steps = cards.length;

  const loop = gsap.timeline({
    repeat: -1,
    scrollTrigger: {
      trigger: `[data-showcase="${scene}"]`,
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play pause resume pause',
    },
  });

  // Re-parked at the top of every repeat so each cycle opens identically.
  loop.set(cards, { yPercent: 100 }).set(cards[0], { yPercent: 0 });

  for (let i = 1; i < steps; i++) {
    loop.to(cards[i], { yPercent: 0, duration: 0.7, ease: 'power3.inOut' }, i * 2.6);
  }
  // Holds the last screen, then drops the stack back for the restart.
  loop.to({}, { duration: 2.2 }).set(cards.slice(1), { yPercent: 100 });
}

// Household: the member cards fan in and the three points step up, no pin.
function buildHousehold() {
  gsap.from('[data-household-card]', {
    y: 48,
    opacity: 0,
    stagger: 0.12,
    scrollTrigger: {
      trigger: '[data-household]',
      start: 'top 80%',
      end: 'top 42%',
      scrub: true,
      refreshPriority: REFRESH_PRIORITY.HOUSEHOLD,
    },
  });

  gsap.from('[data-household-point]', {
    x: -18,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '[data-household]',
      start: 'top 78%',
      end: 'top 45%',
      scrub: true,
      refreshPriority: REFRESH_PRIORITY.HOUSEHOLD,
    },
  });

  gsap.from('[data-household-badge]', {
    y: 16,
    opacity: 0,
    scrollTrigger: {
      trigger: '[data-household]',
      start: 'top 62%',
      end: 'top 40%',
      scrub: true,
      refreshPriority: REFRESH_PRIORITY.HOUSEHOLD,
    },
  });

  gsap.from('[data-household-links]', {
    opacity: 0,
    scrollTrigger: {
      trigger: '[data-household]',
      start: 'top 62%',
      end: 'top 40%',
      scrub: true,
      refreshPriority: REFRESH_PRIORITY.HOUSEHOLD,
    },
  });
}

// Meals: copy points step in, phone rises — no pin, same pattern as household.
function buildMeals() {
  gsap.from('[data-meals-point]', {
    x: -18,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '[data-meals]',
      start: 'top 78%',
      end: 'top 45%',
      scrub: true,
      refreshPriority: REFRESH_PRIORITY.MEALS,
    },
  });

  gsap.from('[data-meals-stage]', {
    y: 48,
    opacity: 0,
    scrollTrigger: {
      trigger: '[data-meals]',
      start: 'top 80%',
      end: 'top 48%',
      scrub: true,
      refreshPriority: REFRESH_PRIORITY.MEALS,
    },
  });
}

// Feature comparison rows step in one at a time.
function buildFeatures() {
  gsap.from('[data-feature-row]', {
    x: -24,
    opacity: 0,
    stagger: 0.08,
    scrollTrigger: {
      trigger: '[data-feature-table]',
      start: 'top 85%',
      end: 'top 35%',
      scrub: true,
      refreshPriority: REFRESH_PRIORITY.FEATURES,
    },
  });
}

function buildFaq() {
  gsap.from('[data-faq-item]', {
    y: 18,
    opacity: 0,
    stagger: 0.06,
    scrollTrigger: {
      trigger: '[data-faq-list]',
      start: 'top 88%',
      end: 'top 50%',
      scrub: true,
      refreshPriority: REFRESH_PRIORITY.FAQ,
    },
  });
}

export default function Site() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      // Mobile browsers resize the viewport when the address bar collapses.
      // Without this, that counts as a resize and re-measures every pin
      // mid-scroll, which reads as the whole page jumping.
      ScrollTrigger.config({ ignoreMobileResize: true });

      const mm = gsap.matchMedia();

      mm.add(MOTION, () => {
        buildProblem();
        buildHousehold();
        buildMeals();
        buildFeatures();
        buildFaq();
      });

      mm.add(MOTION_WIDE, () => {
        buildShowcase('how', 'how', REFRESH_PRIORITY.HOW, 0.5);
      });

      mm.add(MOTION_NARROW, () => {
        // No pin down here, so the accordion is left open by CSS and the loop
        // owns the card stack. On top of that, a light non-pinned reveal (the
        // same pattern the feature-table rows use) plays as each block scrolls
        // into view, so the sections still have some life without ever
        // scroll-jacking the page.
        buildMobileShowcaseLoop('how');

        gsap.from('[data-showcase="how"] .showcase__step', {
          x: -20,
          opacity: 0,
          stagger: 0.12,
          scrollTrigger: {
            scrub: true,
            trigger: '[data-showcase="how"]',
            start: 'top 75%',
            end: 'top 35%',
          },
        });
        gsap.from('[data-showcase="how"] .showcase__stage', {
          y: 40,
          opacity: 0,
          scrollTrigger: {
            scrub: true,
            trigger: '[data-showcase="how"] .showcase__stage',
            start: 'top 88%',
            end: 'top 55%',
          },
        });
      });

      // Respect prefers-reduced-motion: show the finished state, skip pinning
      // and scrubbing entirely instead of just disabling easing.
      mm.add(REDUCED, () => {
        const cEl = document.querySelector('[data-counter]');
        if (cEl) cEl.textContent = '$2,500';
        gsap.set('[data-stamp]', { scale: 1, opacity: 1, rotation: -6 });
        setShowcaseFinalState('how');
        gsap.set('[data-household-card], [data-household-point], [data-household-badge], [data-household-links]', {
          x: 0,
          y: 0,
          opacity: 1,
        });
        gsap.set('[data-meals-point], [data-meals-stage]', { x: 0, y: 0, opacity: 1 });
        gsap.set('[data-feature-row], [data-faq-item]', { x: 0, y: 0, opacity: 1 });
      });

      // Custom web fonts and late-decoding images can resize text and boxes
      // after ScrollTrigger's first measurement pass, which desyncs every
      // pinned/scrubbed start and end position. Re-measure once, after
      // everything has actually settled.
      //
      // Deliberately *not* a ResizeObserver on the page: pinning adds
      // pin-spacers, so every refresh changes the page's height, which would
      // trip the observer and refresh again — an endless loop that leaves the
      // triggers permanently mid-remeasure.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      if (document.readyState === 'complete') refresh();
      else window.addEventListener('load', refresh, { once: true });

      return () => {
        window.removeEventListener('load', refresh);
        mm.kill(true);
      };
    },
    { scope: rootRef }
  );

  return (
    <>
      <div className="page" ref={rootRef}>
        <Problem />
        <HowItWorks />
        <Household />
        <Meals />
        <Features />
        <Faq />
        <RecentPosts />
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}
