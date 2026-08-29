// Static HTML for the routes that are NOT articles: /, /calculator,
// /changelog, /support, /privacy, /terms.
//
// Why this exists: vercel.json rewrites every unprerendered path to the SPA
// shell, so all six of those URLs served one identical, link-free, 9-word
// document. To a crawler that never runs JS they were six copies of the same
// page with no canonical, no headings and nothing to follow — which is
// exactly what the site audit kept reporting.
//
// The hard rule here is that NOTHING on this page may be invented. Every
// title, description, heading and paragraph below is the copy the React page
// actually renders, and the bulkier content is read out of the real source at
// build time (the <Section> outlines) or imported from the real data modules
// (the FAQs, the roadmap). React replaces all of it on mount, so if these
// ever drift the static version is the lie a crawler gets — hence
// sectionTitles() failing the build rather than silently emitting less.
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { faqs } from '../../src/site/data.js'
import { coming } from '../../src/site/content.js'
import { PATHS, SUPPORT_EMAIL } from '../../src/site/launch.js'
import { escapeHtml } from './html.mjs'

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..')
const PAGES_DIR = join(root, 'src/site/pages')

// Reads the real <Section title="..."> headings out of a page component, so
// the static outline is that page's actual structure rather than a summary
// someone has to remember to update. `expected` is a floor, not a count: it
// fails loudly if a refactor ever stops matching, instead of quietly
// shipping a legal page with no contents.
function sectionTitles(file, expected) {
	const src = readFileSync(join(PAGES_DIR, file), 'utf8')
	const titles = [...src.matchAll(/<Section\s+title="([^"]+)"/g)].map((m) => m[1])
	if (titles.length < expected) {
		throw new Error(
			`static-pages: expected at least ${expected} <Section title="..."> in ${file}, found ${titles.length} — has the page been refactored?`
		)
	}
	return titles
}

function list(items) {
	return `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`
}

// Every prerendered page carries this. It is what turns six dead ends into a
// connected site for a non-JS crawler: it gives each page outgoing links, and
// it is the only thing giving /changelog, /support, /privacy and /terms any
// incoming ones at all.
function siteNav(currentPath) {
	const links = [
		[PATHS.home, 'Home'],
		[PATHS.resources, 'Notes from the fridge'],
		[PATHS.calculator, 'Waste calculator'],
		[PATHS.changelog, 'Changelog'],
		[PATHS.support, 'Support'],
		[PATHS.privacy, 'Privacy policy'],
		[PATHS.terms, 'Terms of service'],
	].filter(([href]) => href !== currentPath)

	return `<nav aria-label="Pantry"><ul>${links
		.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
		.join('')}</ul></nav>`
}

// The FAQ section is on the home page (Faq.jsx, id="faq") and reads from this
// same array, so quoting it here is the page's own content, not a synonym for
// it — which is also what makes the FAQPage JSON-LD below honest.
function faqHtml() {
	return faqs
		.map((f) => `<h2>${escapeHtml(f.q)}</h2><p>${escapeHtml(f.a)}</p>`)
		.join('')
}

function comingHtml() {
	return coming
		.map(
			(entry) =>
				`<h3>${escapeHtml(entry.version)} — ${escapeHtml(entry.title)} (${escapeHtml(entry.date)})</h3>` +
				list(entry.changes.map(escapeHtml))
		)
		.join('')
}

export const FAQ_JSON_LD = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faqs.map((f) => ({
		'@type': 'Question',
		name: f.q,
		acceptedAnswer: { '@type': 'Answer', text: f.a },
	})),
}

// `dir` is the directory written under dist/ — '' is dist/index.html itself,
// which is both the home page and (via the vercel.json rewrite) the fallback
// for anything unmatched.
export const STATIC_PAGES = [
	{
		path: PATHS.home,
		dir: '',
		// null on both = inherit index.html's own <title> and description.
		// The home page IS the template, so hardcoding them here would silently
		// override whatever index.html says — which is exactly what happened to
		// a title edit once already. Every other route sets its own, because
		// the template has nothing route-specific to give them.
		title: null,
		description: null,
		h1: 'Stop throwing out the food you already paid for.',
		lede: 'Photograph your receipt. Pantry tracks every expiry date and tells you what to cook first.',
		jsonLd: FAQ_JSON_LD,
		body: () => `<h2>Common questions</h2>${faqHtml()}`,
	},
	{
		path: PATHS.calculator,
		dir: 'calculator',
		title: 'Waste calculator | Pantry',
		description:
			'Estimate what your household bins each year, from how often you shop, who you feed, and what you spend. Built from published Australian food-waste research.',
		h1: 'Run your own numbers.',
		lede: 'Three questions. Everything else comes from Australia’s own food-waste research, including the uncomfortable finding that the more you spend, the bigger the share you bin. Every figure is sourced at the bottom.',
		// Condensed from the “Where these numbers come from” list the calculator
		// itself renders (components/Calculator.jsx), citations included — the
		// static page should stand on the same sources the live one does.
		body: () =>
			'<p>The calculator asks three things: how often you shop, how many people you feed, and what you spend on groceries. Everything after that comes from published research.</p>' +
			'<h2>Where these numbers come from</h2>' +
			list([
				'<strong>Reported share of groceries wasted (9–17%).</strong> Rabobank’s Financial Health Barometer: Australian households say they bin around 11.1% of the food they buy, rising to almost 17% for households spending over $300 a week. We interpolate between those published points and hold the rate flat beyond them rather than extrapolating. <a href="https://www.rabobank.com.au/food-waste-findings-from-financial-health-barometer/" rel="noreferrer">rabobank.com.au</a>',
				'<strong>Correction for under-reporting (×2.28, capped at 30%).</strong> Those Rabobank figures are self-reported, and the Fight Food Waste CRC’s headline finding is that households bin more than twice what they think they do. This factor puts a typical household back on the measured national baseline. <a href="https://endfoodwaste.com.au/fact-library/" rel="noreferrer">End Food Waste Australia</a>',
				'<strong>Household-size adjustment (×0.85–×1.12).</strong> A directional tilt, not a published coefficient. WRAP’s research finds smaller households waste a larger share of what they buy, because pack sizes do not scale down. Weighted across the ABS household-size distribution these average about 1.0. <a href="https://www.wrap.ngo/resources/report/household-food-drink-waste-people-focus" rel="noreferrer">wrap.ngo</a>',
				'<strong>Dollars to kilos ($9.43/kg).</strong> Australia’s national baseline puts household food waste at 265kg and $2,500 per household per year, or 2.46 million tonnes nationally — almost a third of all Australian food waste.',
			]),
	},
	{
		path: PATHS.changelog,
		dir: 'changelog',
		title: 'Every version. | Pantry',
		description: 'Release notes for the Pantry iOS app, and what is coming next.',
		h1: 'Every version.',
		lede: 'What each release of the Pantry app put on your phone. Newest first.',
		body: () =>
			'<p>Nothing yet. Pantry has not reached the App Store, so there is no honest release history to show you. Version 1.0 will be the first entry on this page, and everything below it is what we are building towards.</p>' +
			'<h2>What’s coming</h2>' +
			'<p>Soonest first. These are windows we are aiming at, not dates we are promising.</p>' +
			comingHtml(),
	},
	{
		path: PATHS.support,
		dir: 'support',
		title: 'Support | Pantry',
		description:
			'Get help with Pantry: contact, subscriptions, account deletion, and common questions.',
		h1: 'Support',
		lede: 'Stuck on a scan, a household invite, or a Pro subscription? Start here. We read every email. We are a small Australian team, so you will get a person, not a ticket maze.',
		body: () =>
			`<h2>Email us</h2><p>The fastest way to reach a person. <a href="mailto:${escapeHtml(SUPPORT_EMAIL)}">${escapeHtml(SUPPORT_EMAIL)}</a></p>` +
			'<h2>Subscriptions</h2><p>Pro is billed by Apple. Cancelling, changing plan and refunds all happen in your Apple ID settings, because we genuinely cannot do it from our side.</p>' +
			'<h2>Delete your account</h2><p>Use the in-app account controls, or email us from the address on the account and ask us to delete it.</p>' +
			`<h2>Privacy requests</h2><p>Access, correction, and deletion are covered in the <a href="${PATHS.privacy}">privacy policy</a>. Email us and we will take it from there.</p>`,
	},
	{
		path: PATHS.privacy,
		dir: 'privacy',
		title: 'Privacy Policy | Pantry',
		description:
			'What personal information Pantry collects, why, who we share it with, how long we keep it, and what you can do about it.',
		h1: 'Privacy Policy',
		lede: 'Version 1.0. Applies to the Pantry iOS app and the Pantry website.',
		body: () =>
			'<p>We are Benjamin James Linehan Scott (ABN 45 718 906 920), trading as Pantry and LSD Studios, Chatswood NSW 2067, Australia. Pantry is run by one person.</p>' +
			'<p>This policy explains what personal information we collect, why we collect it, who we share it with, how long we keep it, and what you can do about it. It is our policy under Australian Privacy Principle 1.3. You can read it free of charge at any time, in the app and on this website.</p>' +
			'<h2>What this policy covers</h2>' +
			list(sectionTitles('Privacy.jsx', 25).map(escapeHtml)),
	},
	{
		path: PATHS.terms,
		dir: 'terms',
		title: 'Terms of Service | Pantry',
		description: 'The terms that apply when you use the Pantry app, website, and waitlist.',
		h1: 'Terms of Service',
		lede: 'Version 1.0. These terms are an agreement between you and Benjamin James Linehan Scott (ABN 45 718 906 920), trading as Pantry and LSD Studios, Chatswood NSW 2067, Australia.',
		body: () =>
			'<p><strong>Read clause 9 before you rely on anything in this app.</strong> Pantry uses AI to read receipts, estimate expiry dates and suggest meals. All three get things wrong.</p>' +
			'<h2>What these terms cover</h2>' +
			list(sectionTitles('Terms.jsx', 22).map(escapeHtml)),
	},
]

// Wrapped in the same class structure Legal.jsx renders, so the pre-hydration
// paint reads as a plain version of the real page rather than a flash of
// unstyled HTML before React swaps it out. The markup is styled, not hidden —
// hiding it from people while leaving it for crawlers would be cloaking, and
// the whole point is that both see the same thing.
export function staticPageBody(page) {
	return (
		`<div class="legal"><article class="legal__doc">` +
		`<header class="legal__head">` +
		`<h1 class="legal__title">${escapeHtml(page.h1)}</h1>` +
		`<p class="legal__lede">${escapeHtml(page.lede)}</p>` +
		`</header>` +
		`<div class="legal__body">${page.body()}${siteNav(page.path)}</div>` +
		`</article></div>`
	)
}

export { siteNav }
