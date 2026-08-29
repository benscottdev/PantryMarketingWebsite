// The one definition of the call to action that closes every article.
//
// It is emitted as HTML and appended to the rendered post body in
// renderPost() (scripts/lib/posts.mjs) rather than rendered by Article.jsx,
// which buys three things at once:
//
//   1. It lands *inside* [data-post-body], so it is in the static HTML
//      scripts/prerender.mjs writes — a crawler that never runs JS sees the
//      CTA and its link, the same as the body copy.
//   2. src/site/prerendered.js snapshots that same node back into the React
//      tree, so the live page shows it with no second implementation and
//      nothing to keep in sync.
//   3. The Vite markdown plugin (vite.config.js) calls the same renderPost(),
//      so `vite dev` shows exactly what production ships.
//
// Consequence worth knowing: this is post *body* HTML, not a component, so
// there is no lucide import here — the icons are inlined SVG, drawn to match
// the ones the header and waitlist form use.
import { APP_LIVE, APP_STORE_URL } from '../../src/site/launch.js'

// Written to sit under any article on the site: it re-states the product in
// one line rather than referring back to whatever the post happened to be
// about, so a post added later never needs its own variant.
const HEADING = 'Know what’s in your fridge before it goes off.'
const BODY =
	'Pantry reads your shopping receipt, dates every item in it, and tells you what needs eating first. The average Australian household bins $2,500 of food a year — start with yours.'

// Pre-launch the CTA points at the home page's waitlist footer; once
// APP_LIVE flips it becomes a real App Store link, matching what the header
// and waitlist form already do off the same flag.
export const POST_CTA = {
	heading: HEADING,
	body: BODY,
	label: APP_LIVE ? 'Download on the App Store' : 'Join the waitlist',
	href: APP_LIVE ? APP_STORE_URL : '/#waitlist',
	// An off-site App Store link opens in a new tab; the in-page anchor must
	// not, or the waitlist opens in a window with no history behind it.
	external: APP_LIVE,
}

// lucide's arrow-right, inlined. Same 2.5 stroke weight the header CTA uses.
const ARROW_SVG =
	'<svg class="post-cta__icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'

// The same Apple mark src/site/components/WaitlistForm.jsx draws.
const APPLE_SVG =
	'<svg class="post-cta__icon" viewBox="0 0 16 20" width="14" height="17" aria-hidden="true"><path fill="currentColor" d="M13.2 10.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 .9-3.7.9s-2-.9-3.3-.9c-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.9 1.2 1.9 2.5 3.3 2.5 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8 2.2-1.2 3.1-2.4c1-.1.9-2.6 2.4-3.8-.1 0-2.3-1-2.3-3.3zM11.2 3.4c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3.1 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.4-.6 3.1-1.5z"/></svg>'

function escapeHtml(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

export function postCtaHtml() {
	const { heading, body, label, href, external } = POST_CTA
	// Icon order follows what the rest of the site already does: the Apple
	// mark leads the label (as in WaitlistForm's store button), the arrow
	// trails it (as in the header's "Start saving →").
	const labelHtml = `<span>${escapeHtml(label)}</span>`
	const inner = external ? `${APPLE_SVG}${labelHtml}` : `${labelHtml}${ARROW_SVG}`
	const rel = external ? ' target="_blank" rel="noopener noreferrer"' : ''

	// <aside> rather than <section>: it is complementary to the article, not
	// another part of it, so it stays out of the document outline a screen
	// reader reads the post from.
	return `
<aside class="post-cta" aria-label="Get Pantry">
	<p class="post-cta__title">${escapeHtml(heading)}</p>
	<p class="post-cta__body">${escapeHtml(body)}</p>
	<a class="post-cta__button" href="${escapeHtml(href)}"${rel}>${inner}</a>
</aside>
`
}
