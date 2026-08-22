// Shelf-life figures below are grounded in CSIRO's published "Refrigerated
// storage of perishable foods" guide (csiro.au/en/research/production/food/
// Refrigerating-foods), which gives expected home-fridge shelf life for:
// poultry 3 days · milk 5-7 days · cheese (hard) 1-3 months ·
// soft/semi-hard cheese 2-3 weeks · cottage/ricotta/cream cheese 10 days.
// CSIRO doesn't publish fresh-produce or bakery figures, so those (spinach,
// mushrooms, tomatoes, bananas, sourdough) use standard Australian food-safety
// guidance (Sustainability Victoria / FSANZ consumer storage advice) instead.
//
// Category keys map to icon + colour swatches defined in style.scss
// (--zone-*-bg / --zone-*-icon), mirroring the storage-zone system used
// throughout the Pantry+ app.

// Same thresholds as expiryToneFromDays() in public/pantry_ios_theme.ts,
// so every "days left" figure on the site maps to the same urgency colour
// the app itself would show.
function toneFromDays(days) {
	if (days <= 2) return "urgent";
	if (days <= 7) return "soon";
	return "fine";
}

function formatShelfLife(days) {
	if (days >= 30) {
		const months = Math.round(days / 30);
		return `${months} month${months > 1 ? "s" : ""}`;
	}
	if (days >= 14 && days % 7 === 0) {
		const weeks = days / 7;
		return `${weeks} wk${weeks > 1 ? "s" : ""}`;
	}
	return `${days} day${days > 1 ? "s" : ""}`;
}

const tickerBase = [
	{ name: "Baby spinach", price: "$3.50", days: 5, category: "produce" }, // leafy greens, 5-7 days (Sustainability Victoria)
	{ name: "Sourdough loaf", price: "$7.00", days: 4, category: "bakery" }, // crusty bread, room temp
	{ name: "Greek yoghurt", price: "$6.80", days: 10, category: "dairy" }, // CSIRO: cultured dairy ~10 days
	{ name: "Chicken thighs", price: "$8.20", days: 3, category: "meat" }, // CSIRO: poultry, 3 days
	{ name: "Tomatoes ×6", price: "$4.90", days: 5, category: "produce" }, // ripe, bench-stored
	{ name: "Cheddar block", price: "$9.50", days: 60, category: "dairy" }, // CSIRO: hard cheese, 1-3 months
	{ name: "Mushrooms 200g", price: "$3.80", days: 2, category: "produce" }, // loose mushrooms, 2-3 days
	{ name: "Milk 2L", price: "$3.10", days: 6, category: "dairy" }, // CSIRO: milk, 5-7 days
	{ name: "Haloumi", price: "$7.50", days: 21, category: "dairy" }, // CSIRO: soft/semi cheese, 2-3 weeks
	{ name: "Bananas ×5", price: "$2.90", days: 4, category: "produce" }, // room temp, before over-ripening
];

export const tickerItems = tickerBase.map((item) => ({
	...item,
	tag: formatShelfLife(item.days),
}));

// `icon` overrides the category's default glyph where lucide has a closer
// match (see components/CategoryIcon.jsx). Garlic has no real equivalent in
// the icon set, so it keeps the generic produce leaf.
const receiptBase = [
	{ name: "Chicken breast", location: "Fridge", price: 9.5, days: 3, category: "meat", icon: "drumstick" },
	{ name: "Garlic", location: "Pantry", price: 1.2, days: 30, category: "produce" },
	{ name: "Butter", location: "Fridge", price: 5.0, days: 30, category: "dairy", icon: "milk" },
	{ name: "Parsley", location: "Fridge", price: 2.5, days: 7, category: "produce", icon: "leafyGreen" },
	{ name: "Panko breadcrumbs", location: "Pantry", price: 3.2, days: 180, category: "pantry", icon: "croissant" },
	{ name: "Eggs", location: "Fridge", price: 5.5, days: 21, category: "dairy", icon: "egg" },
	{ name: "Plain flour", location: "Pantry", price: 2.0, days: 365, category: "pantry", icon: "wheat" },
];

export const receiptItems = receiptBase.map((item) => ({
	...item,
	tag: `${item.days}d`,
	variant: toneFromDays(item.days),
}));

// Mirrors the app's "Review items" flow: this batch is a slice of a bigger
// scanned receipt, so the totals/item-count intentionally cover more items
// than are rendered below.
export const receiptMeta = {
	store: "Generic Supermarket",
	date: "18th January",
	total: 74.7,
	totalItems: 18,
};

export const notifications = [
	{
		time: "7:30am",
		slot: "MORNING",
		plan: "ALL PLANS",
		planColor: "#1f5c43",
		msg: "3 things expire this week. $37.47 potentially going to waste.",
		note: "Plan the day before it runs away from you.",
	},

	{
		time: "5:30pm",
		slot: "EVENING",
		plan: "PRO",
		planColor: "#8f6316",
		msg: "Your Lean Beef Mince goes bad tomorrow. Why not make Spaghetti Bolognese and save it from the bin.",
		note: "The one everyone gets. Free tier included.",
	},
];

// FAQ — add / edit / reorder entries. The section maps this list in order.
export const faqs = [
	{
		q: "Is Pantry actually free?",
		a: "Yes, forever. Free covers one person, one receipt scan and two meal generations a week, expiry tracking, and the morning digest. To connect with the rest of your household on a shared pantry, that's when you upgrade to Pro.",
	},
	{
		q: "Does everyone in the household need to pay for Pro?",
		a: "No. One person subscribes, and Pro unlocks the shared household for everyone in it, up to six people. Invite the rest for free, they get the same list and the same digest without their own subscription.",
	},
	{
		q: "How accurate is the scanning?",
		a: "About 97% right now. Receipts are messy, abbreviated item names, weird formatting, the odd faded thermal print, so 100% isn't realistic. When something's off, you fix it in a couple of taps and Pantry gets better at that item next time.",
	},
	{
		q: "Can I buy Pro from this site?",
		a: "You can't buy Pro here, but download the app, then upgrade and you get 7 days free.  Waitlist members get founding member pricing at launch.",
	},
	{
		q: "How much does Pro cost?",
		a: "$4.99 a month, or $49.99 a year if you're committing to not wasting money on wasted food. Either way, you get a 7 day free trial first.",
	},
	{
		q: "Is Pantry available world wide?",
		a: "Australian only first. We have trained the models specifically on Australian receipt data, in English. We are looking to expand to the rest of the world down the road.",
	},
	{
		q: "Can I cancel anytime?",
		a: "Yes, whenever. No calls, no forms, no guilt trips.",
	},
	{
		q: "How do you pick the expiry dates?",
		a: "A shelf life database built on standard Australian food safety guidance, covering fridge, pantry, and freezer storage. You confirm the list after each scan, so anything that looks off is yours to change.",
	},
	{
		q: "Morning digest vs afternoon notifications?",
		a: "Every plan gets one quiet morning digest: what's turning this week, and what it's worth. Afternoon AI notifications are Pro, a specific meal idea for the thing that's about to go.",
	},
	{
		q: "Does Pantry track more than groceries?",
		a: "No, the system we designed to extract grocery data from your receipts, filters out any non-edible items. Pantry is specifically designed for grocery expiry times.",
	},
	{
		q: "Can the rest of the house see the same pantry?",
		a: "That's Pro! One shared inventory, the digest on every phone, and a decent chance of not buying milk twice.",
	},
	{
		q: "Which supermarkets does receipt scanning work with?",
		a: "Any Australian supermarket. Pantry reads the receipt itself rather than matching a specific chain's format, so Coles, Woolworths, IGA, Aldi, whatever's in your bag, all scan the same way.",
	},
	{
		q: "Do I have to scan every receipt?",
		a: "No. Scanning's the fast way in, but you can always add or edit items by hand if you grabbed something without a receipt, or just can't be bothered digging it out.",
	},
];
