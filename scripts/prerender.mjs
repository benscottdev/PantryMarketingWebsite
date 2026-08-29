#!/usr/bin/env node
// Runs after `vite build`. This is the piece that makes the blog crawlable:
// for every published post it writes a real static HTML file with the
// article's title/description/canonical/OG/JSON-LD in <head> and the full
// article text inside <div id="root">, so a crawler that never runs
// JavaScript still gets a real page. React still takes over for visitors —
// see src/site/prerendered.js for why there's no flicker doing this.
//
// Also generates sitemap.xml, rss.xml and llms.txt from the same
// already-published-only post list, and rasterizes each post's OG image
// (this — not scripts/generate-blog-images.mjs — is where that happens,
// because `vite build` empties `dist/` by default; anything written to
// `dist/og/` before the build would just be wiped).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { getPublishedPosts, loadAllPosts, sydneyToday } from './lib/posts.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(root, 'dist')
// The apex domain 308-redirects here (Vercel project config) — every
// canonical/OG/sitemap URL must point at the domain that actually serves a
// 200, not the redirect stub, or crawlers see "canonical points to redirect"
// and treat the real page as missing from the sitemap.
const SITE_URL = 'https://www.usepantry.com.au'
const SITE_NAME = 'Pantry'

function readTemplate() {
	const templatePath = resolve(distDir, 'index.html')
	if (!existsSync(templatePath)) {
		throw new Error(`prerender: ${templatePath} not found — run \`vite build\` first`)
	}
	return readFileSync(templatePath, 'utf8')
}

// Literal single-occurrence replacement — never a blind regex over the whole
// document. Fails loudly if the template ever stops matching what this
// script expects, rather than silently no-op'ing.
function replaceOnce(html, needle, replacement, label) {
	const first = html.indexOf(needle)
	if (first === -1 || html.indexOf(needle, first + 1) !== -1) {
		const count = first === -1 ? 0 : html.split(needle).length - 1
		throw new Error(`prerender: expected exactly one "${label}" in dist/index.html, found ${count}`)
	}
	return html.slice(0, first) + replacement + html.slice(first + needle.length)
}

function escapeHtml(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

function escapeJsonForScriptTag(obj) {
	// </script> inside a JSON string would close the tag early; escape the
	// slash so it round-trips through JSON.parse unchanged.
	return JSON.stringify(obj).replace(/</g, '\\u003c')
}

function extractOriginalHead(html) {
	const titleMatch = html.match(/<title>[\s\S]*?<\/title>/)
	const descMatch = html.match(/<meta name="description" content="[^"]*"\s*\/?>/)
	if (!titleMatch) throw new Error('prerender: could not find <title> in dist/index.html')
	if (!descMatch) throw new Error('prerender: could not find meta description in dist/index.html')
	return { titleTag: titleMatch[0], descTag: descMatch[0] }
}

function breadcrumbJsonLd(crumbs) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map(([name, item], i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name,
			item,
		})),
	}
}

function postHead(original, post) {
	const url = `${SITE_URL}/resources/${post.slug}`
	const ogImage = `${SITE_URL}/og/${post.slug}.jpg`
	const title = `${post.title} | ${SITE_NAME}`

	const blogPostingLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.excerpt,
		image: ogImage,
		datePublished: post.publishDate,
		dateModified: post.updated,
		author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
		publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
		mainEntityOfPage: url,
		...(post.keywords.length ? { keywords: post.keywords.join(', ') } : {}),
	}

	const breadcrumbLd = breadcrumbJsonLd([
		['Home', `${SITE_URL}/`],
		['Resources', `${SITE_URL}/resources`],
		[post.title, url],
	])

	const extraTags = `
		<link rel="canonical" href="${url}" />
		<meta property="og:type" content="article" />
		<meta property="og:site_name" content="${SITE_NAME}" />
		<meta property="og:title" content="${escapeHtml(post.title)}" />
		<meta property="og:description" content="${escapeHtml(post.excerpt)}" />
		<meta property="og:url" content="${url}" />
		<meta property="og:image" content="${ogImage}" />
		<meta property="article:published_time" content="${post.publishDate}" />
		<meta property="article:modified_time" content="${post.updated}" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="${escapeHtml(post.title)}" />
		<meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />
		<meta name="twitter:image" content="${ogImage}" />
		<script type="application/ld+json">${escapeJsonForScriptTag(blogPostingLd)}</script>
		<script type="application/ld+json">${escapeJsonForScriptTag(breadcrumbLd)}</script>
	</head>`

	let html = replaceOnce(original.html, original.titleTag, `<title>${escapeHtml(title)}</title>`, 'title tag')
	html = replaceOnce(html, original.descTag, `<meta name="description" content="${escapeHtml(post.excerpt)}" />`, 'description tag')
	html = replaceOnce(html, '</head>', extraTags, 'head close tag')
	return html
}

function postBody(html, post) {
	// The nav/footer/breadcrumbs are all React-rendered, so a crawler that
	// never runs JS sees nothing linking a post page back to /resources or
	// home — every prerendered post was an "orphan page" by that measure.
	// This sibling link is outside [data-post-body] on purpose: it's not part
	// of what src/site/prerendered.js snapshots back into the live React
	// tree, which already has its own (JS-rendered) breadcrumb and related
	// posts once it mounts.
	const staticNav = `<p><a href="/resources">Notes from the fridge</a> · <a href="/">${escapeHtml(SITE_NAME)}</a></p>`
	const wrapper = `<div id="pantry-prerender" data-slug="${escapeHtml(post.slug)}">${staticNav}<div data-post-body>${post.html}</div></div>`
	return replaceOnce(html, '<div id="root"></div>', `<div id="root">${wrapper}</div>`, 'root div')
}

function writePostPage(original, post) {
	let html = postHead(original, post)
	html = postBody(html, post)
	const outDir = resolve(distDir, 'resources', post.slug)
	mkdirSync(outDir, { recursive: true })
	writeFileSync(resolve(outDir, 'index.html'), html)
}

function blogCardHtml(post) {
	const minsLabel = `${post.minutes} min${post.minutes === 1 ? '' : 's'} read`
	return `<a href="/resources/${post.slug}" class="blog-card">
			<span class="blog-card__media"><img src="${post.image}" alt="" /></span>
			<span class="blog-card__body">
				<span class="blog-card__meta">
					<span class="blog-card__tag">${escapeHtml(post.tag)}</span>
					<span>${minsLabel}</span>
				</span>
				<span class="blog-card__title">${escapeHtml(post.title)}</span>
			</span>
		</a>`
}

function writeIndexPage(original, posts) {
	const url = `${SITE_URL}/resources`
	const title = `Notes from the fridge. | ${SITE_NAME}`
	const description = 'Short reads on food waste, shared pantries, and how Pantry actually works. Every number we quote comes with the place it came from.'

	const breadcrumbLd = breadcrumbJsonLd([
		['Home', `${SITE_URL}/`],
		['Resources', url],
	])

	const extraTags = `
		<link rel="canonical" href="${url}" />
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="${SITE_NAME}" />
		<meta property="og:title" content="Notes from the fridge." />
		<meta property="og:description" content="${escapeHtml(description)}" />
		<meta property="og:url" content="${url}" />
		<meta name="twitter:card" content="summary" />
		<meta name="twitter:title" content="Notes from the fridge." />
		<meta name="twitter:description" content="${escapeHtml(description)}" />
		<script type="application/ld+json">${escapeJsonForScriptTag(breadcrumbLd)}</script>
	</head>`

	let html = replaceOnce(original.html, original.titleTag, `<title>${escapeHtml(title)}</title>`, 'title tag')
	html = replaceOnce(html, original.descTag, `<meta name="description" content="${escapeHtml(description)}" />`, 'description tag')
	html = replaceOnce(html, '</head>', extraTags, 'head close tag')

	const grid = `<div class="blog-grid">\n\t\t${posts.map(blogCardHtml).join('\n\t\t')}\n\t</div>`
	html = replaceOnce(html, '<div id="root"></div>', `<div id="root"><h1>Notes from the fridge.</h1>${grid}</div>`, 'root div')

	const outDir = resolve(distDir, 'resources')
	mkdirSync(outDir, { recursive: true })
	writeFileSync(resolve(outDir, 'index.html'), html)
}

async function rasterizeOg(post) {
	const heroPath = resolve(root, 'public', post.image.replace(/^\//, ''))
	if (!existsSync(heroPath)) {
		console.warn(`[prerender] skip OG image for ${post.slug}: ${heroPath} not found`)
		return
	}
	const ogDir = resolve(distDir, 'og')
	mkdirSync(ogDir, { recursive: true })
	await sharp(heroPath, { density: 300 })
		.resize(1200, 630, { fit: 'cover', position: 'centre' })
		.flatten({ background: '#f4f0e4' })
		.jpeg({ quality: 82 })
		.toFile(resolve(ogDir, `${post.slug}.jpg`))
}

function rfc822(iso) {
	return new Date(`${iso}T00:00:00Z`).toUTCString()
}

function writeSitemap(posts) {
	const staticUrls = [
		{ loc: `${SITE_URL}/` },
		{ loc: `${SITE_URL}/resources` },
		{ loc: `${SITE_URL}/calculator` },
		{ loc: `${SITE_URL}/changelog` },
		{ loc: `${SITE_URL}/support` },
		{ loc: `${SITE_URL}/privacy` },
		{ loc: `${SITE_URL}/terms` },
	]
	const postUrls = posts.map((p) => ({ loc: `${SITE_URL}/resources/${p.slug}`, lastmod: p.updated }))

	const urls = [...staticUrls, ...postUrls]
		.map((u) => `\t<url>\n\t\t<loc>${u.loc}</loc>${u.lastmod ? `\n\t\t<lastmod>${u.lastmod}</lastmod>` : ''}\n\t</url>`)
		.join('\n')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
	writeFileSync(resolve(distDir, 'sitemap.xml'), xml)
}

function writeRss(posts) {
	const items = posts
		.map(
			(p) => `\t\t<item>
			<title>${escapeHtml(p.title)}</title>
			<link>${SITE_URL}/resources/${p.slug}</link>
			<guid>${SITE_URL}/resources/${p.slug}</guid>
			<pubDate>${rfc822(p.publishDate)}</pubDate>
			<description>${escapeHtml(p.excerpt)}</description>
		</item>`
		)
		.join('\n')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
	<title>${SITE_NAME} — Notes from the fridge</title>
	<link>${SITE_URL}/resources</link>
	<description>Short reads on food waste, shared pantries, and how Pantry actually works.</description>
	<language>en-AU</language>
${items}
</channel>
</rss>
`
	writeFileSync(resolve(distDir, 'rss.xml'), xml)
}

function writeLlmsTxt(posts) {
	const lines = [
		`# ${SITE_NAME}`,
		'',
		'> Pantry reads your grocery receipt, tracks every expiry date, and tells you what to cook before it goes off.',
		'',
		'## Product',
		`- [Home](${SITE_URL}/): what Pantry does and who it's for`,
		`- [Waste calculator](${SITE_URL}/calculator): estimate a household's food waste from published Australian research`,
		'',
		'## Resources',
		...posts.map((p) => `- [${p.title}](${SITE_URL}/resources/${p.slug}): ${p.excerpt}`),
		'',
	]
	writeFileSync(resolve(distDir, 'llms.txt'), lines.join('\n'))
}

async function main() {
	const template = readTemplate()
	const original = { html: template, ...extractOriginalHead(template) }

	const all = loadAllPosts()
	const includeDrafts = process.env.PANTRY_DRAFTS === '1'
	const today = sydneyToday()
	const posts = includeDrafts ? all : getPublishedPosts(all, today)

	for (const post of posts) {
		writePostPage(original, post)
		await rasterizeOg(post)
	}
	writeIndexPage(original, posts)
	writeSitemap(posts)
	writeRss(posts)
	writeLlmsTxt(posts)

	console.log(`[prerender] wrote ${posts.length}/${all.length} post page(s), sitemap.xml, rss.xml, llms.txt`)
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
