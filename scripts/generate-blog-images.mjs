#!/usr/bin/env node
// Runs before `vite build`. For any post whose frontmatter `image` points at
// a file that doesn't exist yet in public/, generates a deterministic
// abstract SVG hero — seeded by the slug, palette keyed by tag — and writes
// it there. Generated once and committed like any other asset, so a new post
// never blocks on design. Existing hand-picked photos (the 4 migrated posts)
// are left alone.
//
// OG image rasterization is a separate, build-derived step that happens in
// scripts/prerender.mjs (after `vite build`, not here) — `vite build` empties
// `dist/` by default, so anything written into `dist/og/` before the build
// would just be wiped.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAllPosts } from './lib/posts.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Matches the brand tokens in src/styles/site.scss :root — kept as plain hex
// here since this script runs standalone in Node, outside the SCSS pipeline.
const PALETTES = {
	PRODUCT: { bg: '#ecfeee', ink: '#14382a', accent: '#1f5c43' },
	HOUSEHOLD: { bg: '#ddeef9', ink: '#123a52', accent: '#1a6ea8' },
	WASTE: { bg: '#f7e3de', ink: '#5e2317', accent: '#bd402a' },
	PLANS: { bg: '#f5eeda', ink: '#4a3710', accent: '#8f6316' },
	STORAGE: { bg: '#e7f7dc', ink: '#14382a', accent: '#1f5c43' },
	COOKING: { bg: '#f5e2d8', ink: '#5c2c10', accent: '#b6551f' },
	APPS: { bg: '#ecebfa', ink: '#2a2350', accent: '#4c39b5' },
	SEASONAL: { bg: '#fbe9df', ink: '#5c2a12', accent: '#c2571f' },
	DEFAULT: { bg: '#e7f7dc', ink: '#14382a', accent: '#1f5c43' },
}

// Tiny deterministic PRNG (mulberry32) seeded from a string hash, so the same
// slug always produces the same composition — no randomness, no dependency.
function hashSeed(str) {
	let h = 1779033703 ^ str.length
	for (let i = 0; i < str.length; i++) {
		h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
		h = (h << 13) | (h >>> 19)
	}
	return () => {
		h = Math.imul(h ^ (h >>> 16), 2246822507)
		h = Math.imul(h ^ (h >>> 13), 3266489909)
		h ^= h >>> 16
		return (h >>> 0) / 4294967296
	}
}

const WIDTH = 1200
const HEIGHT = 675 // 16:9, matches .article-hero img { aspect-ratio: 16/9 }

function buildSvg(slug, tag) {
	const palette = PALETTES[tag] || PALETTES.DEFAULT
	const rand = hashSeed(slug)
	const blobs = Array.from({ length: 4 }, () => {
		const r = 140 + rand() * 220
		const cx = rand() * WIDTH
		const cy = rand() * HEIGHT
		const opacity = (0.14 + rand() * 0.16).toFixed(2)
		return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${palette.accent}" opacity="${opacity}" />`
	}).join('\n\t\t')

	return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
	<rect width="${WIDTH}" height="${HEIGHT}" fill="${palette.bg}" />
	<g style="mix-blend-mode:multiply">
		${blobs}
	</g>
	<rect width="${WIDTH}" height="${HEIGHT}" fill="none" stroke="${palette.ink}" stroke-opacity="0.06" stroke-width="2" />
</svg>
`
}

const posts = loadAllPosts()
let generated = 0

for (const post of posts) {
	if (!post.image.endsWith('.svg')) continue // hand-picked photo — leave it
	const outPath = resolve(root, 'public', post.image.replace(/^\//, ''))
	if (existsSync(outPath)) continue

	mkdirSync(dirname(outPath), { recursive: true })
	writeFileSync(outPath, buildSvg(post.slug, post.tag))
	generated++
	console.log(`[generate-blog-images] wrote ${post.image}`)
}

console.log(`[generate-blog-images] ${generated} new hero(es), ${posts.length - generated} already present`)
