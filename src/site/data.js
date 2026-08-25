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
	{ name: "Greek yoghurt", price: "$6.80", days: 10, category: "dairy" }, // no CSIRO figure for yoghurt; 10 days is its cottage/ricotta/cream-cheese line, used as the nearest cultured-dairy proxy
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
	{ name: "Butter", location: "Fridge", price: 5.0, days: 30, category: "dairy", icon: "milk" }, // CSIRO gives butter 8 weeks; held at 30 days as the cautious home-fridge end
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
		note: "The one everyone gets. Free plan included.",
	},

	{
		time: "5:30pm",
		slot: "EVENING",
		plan: "PRO",
		planColor: "#8f6316",
		msg: "Your lean beef mince goes off tomorrow. Spaghetti bolognese tonight and it never sees the bin.",
		note: "Pro only. The nudge that arrives while you can still act on it.",
	},
];

// FAQ — add / edit / reorder entries. The section maps this list in order.
export const faqs = [
	{
		q: "Is Pantry actually free?",
		a: "Yes, and there is no trial clock on it. Free covers one person: one receipt scan and two meal generations a week, full expiry tracking, and the morning digest. You only need Pro when you want the rest of your household on the same pantry.",
	},
	{
		q: "Does everyone in the household need to pay for Pro?",
		a: "No. One person subscribes and Pro opens the shared household for everyone in it, up to six people. The others join free and get the same list and the same digest.",
	},
	{
		q: "How accurate is the scanning?",
		a: "Good, but not perfect, and we would rather say so than quote a number we cannot show you. Receipts are abbreviated, faded and inconsistent, so some lines come back wrong. Fixing one takes two taps, and Pantry remembers that item next time.",
	},
	{
		q: "Can I buy Pro from this site?",
		a: "No. Download the app and upgrade there, with 7 days free first. People on the waitlist get founding pricing when we launch.",
	},
	{
		q: "How much does Pro cost?",
		a: "$4.99 a month or $49.99 a year, billed by Apple, with a 7 day free trial either way. For scale, the yearly plan costs about what the average Australian household bins in a single week ($2,500 a year, per the Fight Food Waste CRC).",
	},
	{
		q: "Is Pantry available worldwide?",
		a: "Australia first. The receipt models are trained on Australian receipt data in English, so that is where they work properly. Other countries come after we have earned the right to say the same about them.",
	},
	{
		q: "Can I cancel anytime?",
		a: "Yes, from your Apple ID settings, in about four taps. No calls, no forms, no retention offers.",
	},
	{
		q: "How do you pick the expiry dates?",
		a: "A shelf-life database built on CSIRO's refrigerated-storage guidance for the foods it covers, and standard Australian food-safety advice for the rest, across fridge, pantry and freezer. Where guidance gives a range we take the cautious end. You confirm every list after a scan, so anything that looks off is yours to change.",
	},
	{
		q: "Morning digest or afternoon notifications?",
		a: "Every plan gets the morning digest: what is turning this week and what it is worth. The afternoon notification is Pro, and it names a specific meal for the thing that is about to go.",
	},
	{
		q: "Does Pantry track more than groceries?",
		a: "No. The receipt reader filters out non-food lines on purpose. Pantry is built for grocery shelf life, not for your whole shopping history.",
	},
	{
		q: "Can the rest of the house see the same pantry?",
		a: "That is Pro. One shared inventory, the digest on every phone, and a decent chance of nobody buying milk twice in one day.",
	},
	{
		q: "Which supermarkets does receipt scanning work with?",
		a: "Any Australian supermarket. Pantry reads the receipt itself rather than matching one chain's template, so Coles, Woolworths, IGA, Aldi and the corner grocer all go through the same way.",
	},
	{
		q: "Do I have to scan every receipt?",
		a: "No. Scanning is the fast way in, but you can add or edit items by hand whenever you grabbed something without a receipt, or cannot be bothered digging it out.",
	},
];
