// Article content lives in content/posts/*.md — this file is a thin facade
// over the generated, already-published-only index (see
// scripts/build-content.mjs), plus the release notes below which are
// unrelated to the blog and stay hand-maintained here.
import { posts } from './content/posts.index.generated.js'

// `id` is aliased to `slug` so existing callers (Resources.jsx, Article.jsx,
// articlePath()) keep working unchanged.
export const articles = posts.map((post) => ({ ...post, id: post.slug }))

export function readingMins(article) {
	return article.minutes
}

export function getArticle(id) {
	return articles.find((post) => post.id === id) ?? null
}

// App releases only, newest first. This is the Pantry iOS app's changelog:
// what a user's phone actually got. Website and marketing-site work does not
// belong here, no matter how much of it there was.
//
// Nothing has shipped to the App Store yet, so this is deliberately empty
// rather than padded. 1.0 is the first entry it will ever have. When a build
// goes live, add it in the same shape as the `coming` entries below:
//
//   { version: "1.0.0", date: "12 September 2026", title: "...",
//     color: "#b9ffa4", rotate: -5, changes: ["...", "..."] }
//
// `color` tints the version pill; `rotate` is the pill's tilt in degrees.
export const changelog = [];

// Roadmap accordion on /changelog, soonest first. `version` is the pill
// (a target number, or a label like Pro / Next). `date` is a window, not a
// ship day — these move, they are not promises.
export const coming = [
	{
		version: "1.0",
		date: "Soon",
		title: "App Store launch",
		color: "#b9ffa4",
		changes: [
			"Pantry on the App Store for iPhone",
			"Waitlist members get founding pricing",
			"Free forever: weekly scans, expiry tracking, and the morning digest",
		],
	},
	{
		version: "Pro",
		date: "At launch",
		title: "The whole house",
		color: "#8ec8e8",
		changes: [
			"Shared household of up to six, one subscription",
			"Unlimited receipt scans and meal generations",
			"Afternoon meal nudges when something is turning",
		],
	},
	{
		version: "Next",
		date: "After launch",
		title: "Smarter from the list",
		color: "#e2b06a",
		changes: [
			"Better names off messy Woolies and Coles slips",
			"Meals that lean harder on what is actually about to expire",
			"Whatever the first month of real kitchens tells us to fix",
		],
	},
];
