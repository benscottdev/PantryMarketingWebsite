// The "Sources" list that closes every article, generated from the article
// itself: every number a post quotes carries its source link in the sentence
// (docs/voice-card.md), so the outbound links in the body ARE the post's
// bibliography. Collecting them into one labelled block at the foot does two
// things the inline links alone do not: it puts the publisher's name next to
// the claim in a form an answer engine can attribute ("per CSIRO", not "per a
// link"), and it gives a reader one place to check the working.
//
// Only recognised research, government and food-safety publishers are listed.
// A comparison post also links the apps it compares — those are the source for
// what each app says about itself, but a block headed "Sources" that ends on
// three competitor names is not the last thing a Pantry post should say, and
// the inline links already give them their due. Unknown hosts are skipped.
//
// Appended in renderPost() (scripts/lib/posts.mjs) after the reading time is
// measured and before the CTA, for the same reasons the CTA lives there: it
// reaches the prerendered HTML, the dev chunks and the React page from one
// definition, and it does not inflate every post's "x mins read".
import { escapeHtml } from './html.mjs'

// host (without www.) -> the name the site already uses for that publisher.
const PUBLISHERS = {
	'csiro.au': 'CSIRO',
	'foodauthority.nsw.gov.au': 'NSW Food Authority',
	'foodstandards.gov.au': 'FSANZ',
	'sustainability.vic.gov.au': 'Sustainability Victoria',
	'foodsafety.asn.au': 'Food Safety Information Council',
	'endfoodwaste.com.au': 'End Food Waste Australia',
	'dcceew.gov.au': 'DCCEEW',
	'rabobank.com.au': 'Rabobank',
	'wrap.ngo': 'WRAP',
	'ozharvest.org': 'OzHarvest',
	'abs.gov.au': 'Australian Bureau of Statistics',
}

function publisherFor(url) {
	let host
	try {
		host = new URL(url).hostname.replace(/^www\./, '')
	} catch {
		return null
	}
	// Match the registered domain, so a deep subdomain still resolves.
	const key = Object.keys(PUBLISHERS).find((k) => host === k || host.endsWith(`.${k}`))
	return key ? PUBLISHERS[key] : null
}

function stripTags(html) {
	return html
		.replace(/<[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim()
}

// Returns [{ href, publisher, label }] in first-appearance order, one per URL.
export function collectSources(articleHtml) {
	const seen = new Set()
	const out = []
	const re = /<a\s+[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi
	let m
	while ((m = re.exec(articleHtml))) {
		const href = m[1]
		if (seen.has(href)) continue
		const publisher = publisherFor(href)
		if (!publisher) continue
		seen.add(href)
		const text = stripTags(m[2]).replace(/^(the|our)\s+/i, '')
		// "CSIRO’s refrigerated-storage guide" already names the publisher;
		// do not print "CSIRO — CSIRO’s …".
		const label = text.toLowerCase().includes(publisher.toLowerCase()) ? text : `${publisher} — ${text}`
		out.push({ href, publisher, label })
	}
	return out
}

export function postSourcesHtml(articleHtml) {
	const sources = collectSources(articleHtml)
	if (!sources.length) return ''
	const items = sources
		.map((s) => `\t<li><a href="${escapeHtml(s.href)}" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`)
		.join('\n')
	// A <section> with its own heading: it is part of the article's content
	// (the reader is meant to read it), unlike the CTA <aside> that follows.
	return `
<section class="post-sources" aria-label="Sources">
<h2 class="post-sources__title">Sources</h2>
<ul class="post-sources__list">
${items}
</ul>
</section>
`
}
