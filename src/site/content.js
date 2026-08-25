// Editorial + product notes. Add a post to `articles` and it shows on
// /resources plus gets its own /resources/:id page. `minutes` is optional —
// omit it and we count ~200 words/min from `body`.

export const articles = [
	{
		id: "receipt-to-meals",
		tag: "PRODUCT",
		date: "18 August 2026",
		title: "From receipt to “what’s for dinner”",
		excerpt: "How Pantry turns a supermarket slip into a live fridge list, and why that beats typing every item by hand.",
		image: "/assets/blog/blog-receipt.jpg",
		imageAlt: "A grocery receipt on a cream counter next to spinach, tomatoes and milk",
		body: [
			"Most grocery apps ask you to build the list yourself. Pantry starts from the receipt you already have: snap it, confirm the odd line that came out wrong, and the household pantry updates.",
			"Shelf life comes from a storage guide grounded in Australian food-safety numbers, not one “use by” guess applied to everything. CSIRO's refrigerated-storage guide gives poultry three days, milk five to seven, and hard cheese one to three months. Leafy greens, milk and mince do not age the same way, so the app does not pretend they do. (csiro.au/en/research/production/food/refrigerating-foods)",
			"When something is turning, the morning digest and Pro meal nudges point at what to cook before it becomes waste. That is the whole loop: scan, track, use.",
			"Receipts are messy. Abbreviated names, faded thermal print, a random “PROD” code where a tomato should be. We do not claim a perfect read, and we do not quote an accuracy number we cannot show you the workings for. What we do promise is that fixing a line takes two taps, and that Pantry remembers that item the next time it sees it.",
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
		body: ["Pantry Pro unlocks a household of up to six. One person pays, and everyone else sees the same items, the same expiry dates, the same digest.", "That matters more than another shopping list. The argument at 5:30pm is never “what should we buy.” It is “what do we already have that is about to go.” A shared view kills the double-buy and the forgotten bag of spinach in one move.", "Invites are deliberate. Only let in people you would hand a house key to, because the fridge list is the same kind of trust.", "The morning digest lands on every phone in the household, not just the person who scanned the receipt. If the mince turns tomorrow, it is not a secret kept in one person’s lock screen.", "Leave a household, or remove someone, whenever the house changes. The list is a tool, not a group chat you can never mute."],
	},
	{
		id: "aussie-food-waste",
		tag: "WASTE",
		date: "4 August 2026",
		title: "Australia already bought the food. We just forget it.",
		excerpt: "A short look at the household food waste numbers, and why expiry tracking is the boring fix that works.",
		image: "/assets/blog/blog-waste.jpg",
		imageAlt: "Wilted spinach and leftover pasta left too long on a kitchen counter",
		body: [
			"The numbers are not vague. The Fight Food Waste CRC puts household food waste at about $2,500 a year, and FIAL's National Food Waste Strategy Feasibility Study puts Australian households at 265kg a year, 2.46 million tonnes nationally, close to a third of all the food this country wastes. Both are collected at endfoodwaste.com.au/fact-library.",
			"The same research found households bin more than twice as much as they believe they do, which is the part worth sitting with. Nobody is deciding to waste $2,500. They are forgetting a bag of spinach behind a container of leftovers.",
			"Pantry is not a diet app or a lecture. It is a memory aid for groceries. We publish shelf-life figures from CSIRO and Australian consumer guidance where they exist, and where guidance gives a range we take the cautious home-fridge end, so the app errs towards “cook it sooner.”",
			"The calculator on this site puts your own household through the same research, and shows its working. It is an estimate, not an audit, but it is built from published Australian figures rather than a number we liked the look of.",
			"None of this needs a lecture. It needs a list you can actually see on a Tuesday at 5:30pm, when the alternative is takeaway and a bag of spinach that had one more day in it.",
		],
	},
	{
		id: "free-vs-pro",
		tag: "PLANS",
		date: "28 July 2026",
		title: "What Free covers, and when Pro earns its keep",
		excerpt: "Receipt scans, meal generations, digests and household sharing, with the prices written down.",
		image: "/assets/blog/blog-plans.jpg",
		imageAlt: "A simple plate beside a fuller shared spread on a cream linen table",
		body: [
			"Free is a real plan, not a trial. One person, one receipt scan and two meal generations a week, full expiry tracking, and the morning digest. Enough to find out whether the habit sticks.",
			"Pro is for the shared household and the afternoon meal nudge, the “use this mince tonight” push that lands while you can still act on it. It is $4.99 a month or $49.99 a year, billed by Apple, with 7 days free first.",
			"Waitlist members get founding pricing at launch. You cannot buy Pro from this website; download the app when it ships, then upgrade there.",
			"One Pro subscription covers the household, up to six people, so nobody is stacking three plans to share one fridge. The person who pays is the admin, and everyone else joins by invite.",
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
