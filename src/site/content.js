// Editorial + product notes. Add a post to `articles` and it shows on
// /resources plus gets its own /resources/:id page. `minutes` is optional —
// omit it and we count ~200 words/min from `body`.

export const articles = [
	{
		id: "receipt-to-meals",
		tag: "PRODUCT",
		date: "18 August 2026",
		title: "From receipt to “what’s for dinner”",
		excerpt: "How Pantry turns a supermarket slip into a live fridge list — and why that beats typing every item by hand.",
		image: "/assets/blog/blog-receipt.jpg",
		imageAlt: "A grocery receipt on a cream counter next to spinach, tomatoes and milk",
		body: [
			"Most grocery apps ask you to build the list yourself. Pantry starts from the receipt you already have: snap it, confirm the odd line that came out wrong, and the household pantry updates.",
			"Shelf life comes from a storage guide grounded in Australian food-safety numbers, not a single “use by” guess for everything. Leafy greens, milk, and mince do not age the same way — the app treats them that way.",
			"When something is turning, the morning digest and Pro meal nudges point at what to cook before it becomes waste. That is the whole loop: scan, track, use.",
			"Receipts are messy. Abbreviated item names, faded thermal print, a random “PROD” code where a tomato should be. We aim for about 97% on a typical Woolies or Coles slip, and we leave the last 3% in your hands — two taps to fix a line, and Pantry remembers that item next time.",
			"The point is not a perfect OCR demo. It is getting tonight’s shop onto the shared list before the bags are unpacked, so the food you already paid for has somewhere to live besides your memory.",
		],
	},
	{
		id: "household-one-list",
		tag: "HOUSEHOLD",
		date: "12 August 2026",
		title: "One fridge, one list, fewer “are we out of milk?” texts",
		excerpt: "Why a shared pantry beats three people guessing from the other side of the house.",
		image: "/assets/blog/blog-household.jpg",
		imageAlt: "An open fridge at night with milk, greens and leftovers on the shelves",
		body: ["Pantry Pro unlocks a household of up to six. One person pays; everyone else sees the same items, expiry dates, and digests.", "That matters more than another shopping list. The fight is not “what should we buy” — it is “what do we already have that is about to die.” A shared view kills the double-buy and the forgotten bag of spinach.", "Invites are intentional. Only people you trust into the fridge list should see it — same idea as handing someone a house key.", "The morning digest lands on every phone in the household, not just the person who scanned the receipt. If the mince turns tomorrow, it is not a secret kept in one person’s lock screen.", "Leave a household, or remove someone, whenever the house changes. The list is a tool, not a group chat you can never mute."],
	},
	{
		id: "aussie-food-waste",
		tag: "WASTE",
		date: "4 August 2026",
		title: "Australia already bought the food. We just forget it.",
		excerpt: "A short look at household food waste numbers — and why expiry tracking is the boring fix that works.",
		image: "/assets/blog/blog-waste.jpg",
		imageAlt: "Wilted spinach and leftover pasta left too long on a kitchen counter",
		body: [
			"End Food Waste Australia and related research keep showing the same pattern: a large share of household waste is food that was edible when we bought it, then lost to time, confusion, or a full fridge nobody can see into.",
			"Pantry is not a diet app. It is a memory aid for groceries. If the average household throws out hundreds of dollars a year, the win is using what is already paid for.",
			"We publish shelf-life figures from CSIRO and Australian consumer guidance where we can. When guidance is a range, we pick the cautious home-fridge end so the app errs on “cook it sooner.”",
			"The 3D fridge on this site is a story version of that: items age as you scroll, the green badge turns terracotta, and the dollars on the counter are the ones that never made it to a plate.",
			"None of this needs a lecture. It needs a list you can actually see on a Tuesday at 5:30pm, when the alternative is takeaway and a bag of spinach that had one more day in it.",
		],
	},
	{
		id: "free-vs-pro",
		tag: "PLANS",
		date: "28 July 2026",
		title: "What Free covers — and when Pro is worth it",
		excerpt: "Receipt scans, meal generations, digests, and household sharing, without the sales fog.",
		image: "/assets/blog/blog-plans.jpg",
		imageAlt: "A simple plate beside a fuller shared spread on a cream linen table",
		body: [
			"Free is real: one person, weekly receipt scans and meal generations, expiry tracking, and the morning digest. Enough to prove the habit.",
			"Pro is for the shared household and the afternoon meal nudges — the “use this mince tonight” push when the day gets away from you. It is billed through the App Store with a trial.",
			"Waitlist members get founding pricing at launch. You cannot buy Pro from this website; download the app when it ships, then upgrade there.",
			"One Pro subscription covers the household — up to six people — so you are not stacking three individual plans to share a fridge. The person who pays is the admin; everyone else is invited.",
			"If you live alone and scan once a week, Free may be the whole product. If you share a kitchen, Pro is the product we actually built the household for.",
		],
	},
];

export function readingMins(article) {
	if (article.minutes) return article.minutes;
	const words = article.body.join(" ").trim().split(/\s+/).length;
	return Math.max(1, Math.round(words / 200));
}

export function getArticle(id) {
	return articles.find((post) => post.id === id) ?? null;
}

// Changelog cards, newest first. Layout snakes left/right in CSS;
// `rotate` is a rest tilt, `color` paints the wire into the next card.
export const changelog = [
	{
		version: "0.9.0",
		date: "21 August 2026",
		title: "Website polish",
		color: "#b9ffa4",
		rotate: -5,
		changes: ["Floating fridge labels shift from mint to amber to terracotta as items age", "Hero background settles on greens and whites", "Legal, support, and waitlist flows tightened for launch prep"],
	},
	{
		version: "0.8.0",
		date: "8 August 2026",
		title: "Fridge story pass",
		color: "#8ec8e8",
		rotate: 6,
		changes: ["Scroll-driven 3D fridge with used / wasted popups", "Life-left pills above perishable extras", "Waste HUD totals dollars thrown out during the pin"],
	},
	{
		version: "0.7.0",
		date: "22 July 2026",
		title: "Marketing site foundation",
		color: "#e2b06a",
		rotate: -6,
		changes: ["Landing, how-it-works showcase, features, FAQ, and waitlist", "Household and calculator sections", "Privacy, terms, and support pages"],
	},
	{
		version: "0.1.0",
		date: "June 2026",
		title: "First public waitlist",
		color: "#e07a5f",
		rotate: 5,
		changes: ["Early landing and email capture", "Brand tokens aligned with the iOS app palette"],
	},
];
