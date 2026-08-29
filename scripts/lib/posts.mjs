// Shared by scripts/build-content.mjs, the markdown Vite plugin in
// vite.config.js, and scripts/prerender.mjs, so the three places that touch
// post content (index generation, lazy body chunks, and the prerendered
// static HTML) all parse and render exactly the same way — including the
// standard end-of-post CTA renderPost() appends to every body.
import { readFileSync, readdirSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { marked } from 'marked'
import { postCtaHtml } from './cta.mjs'

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..')
export const POSTS_DIR = join(root, 'content/posts')

// Locale-independent: assembled from named parts rather than trusting a
// locale string's shape. A `small-icu` Node build maps unknown locales like
// `en-CA` to `en-US`'s M/D/YYYY shape, which would then string-compare as
// "always in the past" and publish every future post immediately.
export function sydneyToday(now = new Date()) {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: 'Australia/Sydney',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).formatToParts(now)
	const get = (type) => parts.find((p) => p.type === type)?.value
	const iso = `${get('year')}-${get('month')}-${get('day')}`
	if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
		throw new Error(`sydneyToday(): unexpected Intl output ${JSON.stringify(iso)} — check ICU data`)
	}
	return iso
}

function wordsAndMinutes(html) {
	const text = html
		.replace(/<[^>]+>/g, ' ')
		.replace(/&[a-z0-9#]+;/gi, ' ')
		.trim()
	const words = text ? text.split(/\s+/).length : 0
	const minutes = Math.max(1, Math.round(words / 200))
	return { words, minutes }
}

// gray-matter's YAML parser auto-converts an unquoted YYYY-MM-DD scalar into
// a JS Date (YAML 1.1 timestamp coercion) — a landmine for hand-written
// frontmatter that isn't wrapped in quotes. Normalise back to an ISO date
// string regardless of which form the file used, rather than relying on
// every post (including future bulk-written ones) to quote it correctly.
function toIsoDateString(value, field, slugForError) {
	if (value instanceof Date) {
		return value.toISOString().slice(0, 10)
	}
	if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		throw new Error(`content/posts/${slugForError}.md: ${field} must be YYYY-MM-DD, got ${JSON.stringify(value)}`)
	}
	return value
}

function assertRequired(fields, slugForError) {
	const required = ['slug', 'title', 'excerpt', 'tag', 'publishDate', 'image', 'imageAlt']
	for (const key of required) {
		if (!fields[key]) {
			throw new Error(`content/posts/${slugForError}.md is missing required frontmatter field "${key}"`)
		}
	}
}

export function listPostFiles() {
	return readdirSync(POSTS_DIR)
		.filter((f) => f.endsWith('.md'))
		.map((f) => join(POSTS_DIR, f))
}

// Renders one post file. Returns full metadata + rendered HTML + derived
// reading time. Used by build-content.mjs (index) and prerender.mjs (bodies),
// and — via a thin wrapper — by the Vite markdown plugin for lazy dev chunks.
export function renderPost(filePath) {
	const raw = readFileSync(filePath, 'utf8')
	const { data, content } = matter(raw)
	const fileSlug = basename(filePath, '.md')
	assertRequired(data, fileSlug)
	if (data.slug !== fileSlug) {
		throw new Error(`content/posts/${fileSlug}.md: frontmatter slug "${data.slug}" must match filename`)
	}

	const articleHtml = marked.parse(content)
	// Reading time is measured on the author's words only — the CTA is the
	// same block on every post, so counting it would add a flat ~40 words to
	// every "x mins read" on the site.
	const { words, minutes } = wordsAndMinutes(articleHtml)
	// Appended here, not in Article.jsx, so the one copy of the CTA reaches
	// the prerendered HTML, the dev markdown chunks and the React page alike.
	// See scripts/lib/cta.mjs for why that matters.
	const html = articleHtml + postCtaHtml()
	const publishDate = toIsoDateString(data.publishDate, 'publishDate', fileSlug)
	const updated = data.updated ? toIsoDateString(data.updated, 'updated', fileSlug) : publishDate

	return {
		slug: data.slug,
		title: data.title,
		excerpt: data.excerpt,
		tag: data.tag,
		publishDate,
		updated,
		image: data.image,
		imageAlt: data.imageAlt,
		keywords: data.keywords || [],
		html,
		words,
		minutes,
	}
}

export function loadAllPosts() {
	return listPostFiles()
		.map(renderPost)
		.sort((a, b) => b.publishDate.localeCompare(a.publishDate))
}

export function getPublishedPosts(posts, today = sydneyToday()) {
	return posts.filter((p) => p.publishDate <= today)
}
