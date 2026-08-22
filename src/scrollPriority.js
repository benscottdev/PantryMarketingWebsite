/**
 * Refresh order for every ScrollTrigger on the page, top to bottom.
 *
 * ScrollTrigger measures each trigger with the pins *above* it already
 * applied, and it does that in refresh order — which defaults to the order the
 * triggers were created, not the order they appear on the page. Ours are
 * unavoidably created out of page order:
 *
 *   - The 3D fridge (after the landing, pinned for several screens) sets its pin
 *     up inside a passive effect, which React runs *after* the layout effect
 *     that builds the marketing site's triggers.
 *   - Within the site, the desktop-only pins live in their own `matchMedia`
 *     branch, so they're created after triggers for sections below them.
 *
 * Without explicit priorities that means a trigger can be measured as though a
 * pin above it doesn't exist, and its start lands thousands of pixels too high
 * — pins fire early, scrubs run against the wrong range, and sections appear
 * to jump. Higher numbers refresh first, so these descend down the page.
 *
 * Anything new goes in at the position it occupies on the page; the gaps are
 * there so a section can be slotted in between two of these without renumbering.
 */
export const REFRESH_PRIORITY = {
  FRIDGE: 40,
  PROBLEM: 20,
  HOW: 10,
  HOUSEHOLD: 5,
  FEATURES: 0,
  FAQ: -5,
};
