# Copy source register

Every factual claim made in user-facing copy on this site, with where it came
from. If a claim is not in this table, it should not be on the site.

Last verified: 25 August 2026.

## National and household food waste

| Claim | Where it appears | Source |
| --- | --- | --- |
| $2,500 of food binned per Australian household per year | `Problem.jsx` counter, FAQ pricing answer, `content/posts/household-food-waste-by-the-numbers.md`, `content/posts/food-waste-in-australia-the-numbers.md`, Loader facts, `index.html` meta, `content/posts/how-to-keep-track-of-food-in-the-fridge.md`, `content/posts/what-to-cook-with-leftovers-before-they-go-off.md` | Fight Food Waste CRC (2021), collected at [End Food Waste Australia fact library](https://endfoodwaste.com.au/fact-library/) |
| 265 kg per household per year | `content/posts/household-food-waste-by-the-numbers.md`, `content/posts/food-waste-in-australia-the-numbers.md`, Loader facts, `Calculator.jsx` sources | FIAL, *National Food Waste Strategy Feasibility Study* (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/fact-library/) |
| 7.6 million tonnes of food wasted nationally | `Problem.jsx` | FIAL (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/fact-library/) and [DCCEEW](https://www.dcceew.gov.au/environment/protection/waste/food-waste) |
| $36.6 billion a year, ~1.4% of GDP, across the whole food chain | `Problem.jsx` | FIAL (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/36-6-billion-a-year-wasted-food-waste-drains-1-4-of-australias-gdp-and-weakens-food-security/) |
| 2.46 Mt from households, almost a third of all Australian food waste | `Calculator.jsx` sources, `content/posts/where-the-2500-goes.md`, `content/posts/food-waste-in-australia-the-numbers.md` | FIAL (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/fact-library/) |
| Households bin more than twice what they think they do | `Calculator.jsx` sources, `content/posts/household-food-waste-by-the-numbers.md`, `content/posts/how-to-keep-track-of-food-in-the-fridge.md` | Fight Food Waste CRC (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/fact-library/) |
| One grocery bag in five ends up in the bin | Loader facts, `content/posts/save-money-on-groceries-without-buying-less.md` | [DCCEEW food waste](https://www.dcceew.gov.au/environment/protection/waste/food-waste) |
| ~$48 a week | `content/posts/what-food-waste-costs-per-week.md` | Derived, and shown as derived in the post: $2,500 (Fight Food Waste CRC) ÷ 52 |
| ~$47 saved per 5 kg of food rescued | `content/posts/what-food-waste-costs-per-week.md` | Derived, and shown as derived in the post: 5 × the $9.43/kg figure below |

**Important distinction now respected in the copy:** $2,500 and 265 kg are
*household* figures. 7.6 Mt and $36.6 billion are *whole-of-supply-chain*
figures. The old `Problem.jsx` copy ran all four together in one sentence,
which read as though a household bins $36.6 billion worth. Fixed.

## Calculator model

Unchanged from what was already there, and already correctly cited in the
`<Sources>` block. Re-verified:

| Constant | Source |
| --- | --- |
| Reported waste 11.1% of groceries, ~17% for households spending $300+/week | [Rabobank Financial Health Barometer, 2021 Food Waste Report](https://www.rabobank.com.au/foodwaste) |
| ×2.28 under-reporting correction | Derived, and shown as derived: it is exactly the gap between the self-reported anchors and the measured $2,500 / 265 kg baseline. Justified against Fight Food Waste CRC's "more than twice" finding |
| Household-size tilt ×0.85–×1.12 | Directional only, and labelled as such. Pattern from [WRAP household food and drink waste research](https://www.wrap.ngo/resources/report/household-food-drink-waste-people-focus) |
| $9.43/kg | Derived from $2,500 ÷ 265 kg, both measured figures |
| $1 = 2 meals | [OzHarvest donor promise](https://www.ozharvest.org/donor-promise/) |
| Swap-card prices | Indicative 2026 Australian retail, flagged in copy as scale, not a quote |

Three of these now also appear in blog posts, cited inline the same way:
the Rabobank 11.1% / ~17% figures and the $9.43/kg derivation in
`content/posts/save-money-on-groceries-without-buying-less.md` and
`content/posts/what-food-waste-costs-per-week.md`, and the OzHarvest
$1 = 2 meals promise in `save-money-on-groceries-without-buying-less.md`.

## Shelf life

CSIRO's [*Refrigerated storage of perishable foods*](https://www.csiro.au/en/research/production/food/refrigerating-foods)
is the primary source. Verified against the published table:

- poultry 3 days, meat 3–5 days, mince/offal 2–3 days
- milk 5–7 days, cream 5 days
- hard cheese 1–3 months, soft cheese 2–3 weeks, cottage/ricotta/cream cheese 10 days
- eggs 3–6 weeks, butter 8 weeks

Two corrections made to `data.js` comments:

- **Greek yoghurt (10 days)** was commented "CSIRO: cultured dairy ~10 days".
  CSIRO's 10-day line is cottage/ricotta/cream cheese; it publishes nothing for
  yoghurt. The comment now says so and calls it a proxy.
- **Butter (30 days)** is below CSIRO's 8 weeks. That is a deliberate cautious
  choice, now written down rather than silently inconsistent with the header
  comment claiming CSIRO grounding.

Produce and bakery figures (spinach, mushrooms, tomatoes, bananas, sourdough)
have no CSIRO equivalent and rely on general Australian consumer storage
guidance. The file header already says this.

CSIRO figures from the list above also anchor dedicated posts: eggs 3–6 weeks
in `content/posts/how-long-do-eggs-last.md`, poultry 3 days (thawed handling)
in `content/posts/defrosting-chicken-safely.md`, and the guide as a whole in
`content/posts/where-pantrys-expiry-dates-come-from.md`.

### 15 September 2026: two app posts from the first GSC pull

`content/posts/does-pantry-read-coles-woolworths-aldi-receipts.md` and
`content/posts/how-to-keep-track-of-food-in-the-fridge.md` restate claims the
site already makes and add none: the receipt reader (Coles, Woolworths, IGA,
Aldi and the corner grocer through one reader; abbreviation differs between
chains and between stores; thermal fade; non-food lines filtered; confirm step
and two-tap fix; no accuracy number) from `how-pantry-reads-a-receipt.md` and
the scanning FAQ; "trained on Australian receipt data in English" from the
"Is Pantry available worldwide?" FAQ; poultry 3 days and milk 5–7 days from
the CSIRO list above; the 7:30am digest on every plan, the 5:30pm Pro nudge
and its standing mince example from `why-the-nudge-lands-at-530.md` and
`src/site/data.js`; the six-person household from the Pro FAQ. Neither post
says or implies the app has shipped.

Two more on the same day: `content/posts/what-to-cook-with-leftovers-before-they-go-off.md`
(NSW Food Authority 3 days / 2 days for rice, the reheating rule and the
two-hour/four-hour rule, all from the rows above; the five dinners are
directions, not claims, in the same shape as `mince-going-off-tonight.md`)
and `content/posts/shopping-list-app-with-expiry-dates.md` (states plainly
that Pantry has no shopping list — `HowItWorks.jsx` "you never type a shopping
list again" and `Meals.jsx` "not on another shopping list" are the site's own
line; marking items as used from `Household.jsx`; CSIRO poultry and milk from
the list above). Neither says or implies the app has shipped.

### September – October 2026 batch (5 shelf-life posts, 5 app posts)

Re-verified against the CSIRO page and the Sustainability Victoria page on
6 September 2026. Every shelf-life row below is a number or sentence that
appears on the cited page; where the source gives a range the post takes the
short end and says so in the same sentence. The app rows restate the site's
own commercial terms and feature descriptions (FAQ in `src/site/data.js`,
plan cards in `Features.jsx`, meals copy in `Meals.jsx`, household copy in
`Household.jsx`, roadmap in `content.js`) and claim nothing the site does not
already say. No post says or implies the app has shipped.

| Claim | Where it appears | Source |
| --- | --- | --- |
| Hard cheese 1–3 months, soft cheeses (camembert, brie) 2–3 weeks, cottage/ricotta/cream cheese 10 days; held at 1 month / 2 weeks / 10 days | `content/posts/how-long-does-cheese-last-in-the-fridge.md` | [CSIRO, *Refrigerated storage of perishable foods*](https://www.csiro.au/en/research/production/food/refrigerating-foods) |
| Haloumi on the 2–3 week soft/semi-hard line (the site's reading, per the `data.js` comment); feta has no CSIRO row, so no number is given | `content/posts/how-long-does-cheese-last-in-the-fridge.md` | `src/site/data.js` comment; CSIRO table |
| Cream 5 days, a single figure, not split by type; sour cream and crème fraîche are not on the table, so no number | `content/posts/how-long-does-cream-last-after-opening.md` | CSIRO |
| Cured meat 2–3 weeks. Verbatim: "Some of the fermented salamis, bacon and whole hams will keep for 2-3 weeks compared to sliced luncheon meats which will keep only 4-5 days after purchase." Held at 2 weeks / 4 days. Home-carved ham slices are read on the sliced line, stated in the post as the site's cautious reading | `content/posts/how-long-does-christmas-ham-last.md`, `content/posts/how-long-does-bacon-last-in-the-fridge.md` | CSIRO, "Delicatessen meats" section |
| Crustaceans and molluscs 2 days, single figure, not split raw/cooked; seafood 3 days ("one day less than fish") | `content/posts/how-long-do-prawns-last-in-the-fridge.md` | CSIRO |
| Meat 3–5 days (the pork before curing) | `content/posts/how-long-does-bacon-last-in-the-fridge.md` | CSIRO |
| The storage table is headed "Storage life of some chilled food in the coldest part of a refrigerator"; refrigeration tip to keep seafood and long-keep items in the coldest part | bacon, ham and prawns posts | CSIRO, table heading and "Refrigeration tips" |
| Whipped cream on a served dessert, ham slices that sat out through lunch, and prawns on a platter are on the NSW Food Authority leftovers/2h-4h rules, not the CSIRO raw-storage line | cream, ham and prawns posts | Existing rows below (NSW Food Authority leftovers 3 days; 2h/4h rule) |
| A use-by date is a safety date and overrides CSIRO's window where it lands earlier; a packet's own after-opening instruction is treated the same way | cheese, cream, ham and bacon posts | Existing "Date labels" row (FSANZ / NSW Food Authority) |
| Free: 1 receipt scan a week, 2 meal generations a week, expiry tracking, morning digest, no card, no trial clock. Pro: unlimited scans and meal generations, afternoon nudge, household of up to six on one subscription (one admin pays, others join free by invite), priority support | `content/posts/pantry-free-vs-pro.md`, `content/posts/receipt-to-meals.md`, `content/posts/freezer-inventory-app.md`, `content/posts/fridge-inventory-spreadsheet.md`, `content/posts/food-waste-tracking-app.md` | `Features.jsx` plan cards; FAQ in `src/site/data.js` |
| Pro $4.99/month or $49.99/year, billed by Apple, 7-day trial; not sold on the website; cancel from Apple ID settings in about four taps; waitlist members get founding pricing | `content/posts/pantry-free-vs-pro.md` | Existing "Product claims" rows; FAQ |
| Yearly Pro costs about what the average household bins in a week ($2,500 ÷ 52 ≈ $48) | `content/posts/pantry-free-vs-pro.md`, `content/posts/food-waste-tracking-app.md` | Existing ~$48/week derived row; FAQ pricing answer |
| The App Store launch is for iPhone; the launch date is a window, not a date; first post-launch roadmap item is meals that lean harder on what is about to expire | `content/posts/pantry-free-vs-pro.md`, `content/posts/receipt-to-meals.md` | `src/site/content.js` roadmap (`coming`) |
| Meal suggestion built only from items already in the house (green dot), prioritising what is turning first ("Mince with two days left beats yoghurt with a week"), costed from scanned receipts; example turkey mince lettuce wraps | `content/posts/receipt-to-meals.md` | `Meals.jsx` |
| Scanning accuracy: no percentage quoted; some lines come back wrong; the list is confirmed after every scan; a fix takes two taps; the correction is remembered | `content/posts/receipt-to-meals.md`, `content/posts/fridge-inventory-spreadsheet.md` | FAQ; existing "Product claims" row (97% removed) |
| Morning digest example "3 things expire this week. $37.47 potentially going to waste." at 7:30am on every plan; 5:30pm Pro nudge with the standing mince example | `content/posts/food-waste-tracking-app.md`, `content/posts/pantry-free-vs-pro.md`, `content/posts/receipt-to-meals.md` | `src/site/data.js` notifications |
| Pantry's list spans fridge, pantry and freezer; it records the date an item went into the freezer and gives no defrost-by countdown | `content/posts/freezer-inventory-app.md`, `content/posts/fridge-inventory-spreadsheet.md` | FAQ ("across fridge, pantry and freezer"); `freezer-times-explained.md`; `defrosting-chicken-safely.md` |
| Frozen food safe indefinitely, quality is the limit; fridge-freezer a few weeks, chest freezer at -18°C three months or more depending on fat | `content/posts/freezer-inventory-app.md` | Existing "Freezer storage" row (Food Safety Information Council) |
| Households under-report waste by more than half; $2,500 and 265 kg a year; Rabobank self-reported 11.1% | `content/posts/food-waste-tracking-app.md` | Existing rows above |
| Household members mark items as they go ("Marked the milk as opened", "Used the baby spinach"); one shared list on every phone; stop buying it twice | `content/posts/fridge-inventory-spreadsheet.md`, `content/posts/freezer-inventory-app.md`, `content/posts/shopping-list-app-with-expiry-dates.md` | `Household.jsx`; `six-phones-one-pantry.md` |
| The example receipt on the site runs to 18 items | `content/posts/fridge-inventory-spreadsheet.md` | `src/site/data.js` `receiptMeta.totalItems` |

**Open discrepancy found while verifying, deliberately not fixed in this
batch:** Sustainability Victoria's page currently gives mushrooms "4 to 10
days" in a paper bag, soft herbs (parsley, coriander) "3 to 4 days", tomatoes
"up to 2 weeks" in the fruit bowl and bananas "up to 1 week". The table in
`how-long-food-lasts.md` and the line in `where-the-2500-goes.md` attribute
mushrooms 2–3 days, herbs 7 days and tomatoes 5 days to Sustainability
Victoria, and `data.js` holds the same numbers. The site's numbers are at or
below the page's, so nothing published is optimistic, but the herb figure is
above it and the attribution does not match the page as it reads today. No
post in this batch uses those rows. Mushroom and herb posts were left out for
this reason and sit in `content/keyword-queue.md` as held back.

## Leftovers and the danger-zone clock

| Claim | Where it appears | Source |
| --- | --- | --- |
| Cooked leftovers keep 3 days refrigerated; cooked rice/pasta 2 days | `content/posts/how-long-do-leftovers-keep.md`, `content/posts/how-long-food-lasts.md`, `content/posts/christmas-leftovers-what-keeps.md`, `content/posts/how-to-keep-track-of-food-in-the-fridge.md`, `content/posts/what-to-cook-with-leftovers-before-they-go-off.md` | [NSW Food Authority, leftovers guidance](https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers) |
| Two-hour/four-hour rule for food held between 5°C and 60°C, cumulative across a day | `content/posts/how-long-do-leftovers-keep.md`, `content/posts/summer-fridge-food-safety.md`, `content/posts/christmas-leftovers-what-keeps.md`, `content/posts/what-to-cook-with-leftovers-before-they-go-off.md` | [NSW Food Authority, managing potentially hazardous foods](https://www.foodauthority.nsw.gov.au/help/managing-potentially-hazardous-foods) |
| Reheat leftovers to steaming hot, 60°C or above throughout | `content/posts/how-long-do-leftovers-keep.md`, `content/posts/christmas-leftovers-what-keeps.md`, `content/posts/what-to-cook-with-leftovers-before-they-go-off.md` | [NSW Food Authority, leftovers guidance](https://www.foodauthority.nsw.gov.au/consumer/special-care-foods/leftovers) |

These three were already live on the site via `how-long-do-leftovers-keep.md` and
`summer-fridge-food-safety.md` before this row existed; adding them here closes
a gap in the register rather than introducing a new claim.

## Date labels

`use by` is a safety date, `best before` is a quality date, and fresh milk in
Australia carries a **use-by** date. [FSANZ](https://www.foodstandards.gov.au/consumer/labelling/dates)
/ [NSW Food Authority](https://www.foodauthority.nsw.gov.au/food-labelling/stay-safe/date-marking-storage-labelling).

## Temperature danger zone and hot weather

| Claim | Where it appears | Source |
| --- | --- | --- |
| The food safety danger zone is 5°C to 60°C | `content/posts/summer-fridge-food-safety.md`, `content/posts/christmas-leftovers-what-keeps.md`, `content/posts/what-temperature-should-your-fridge-be.md`, `content/posts/defrosting-chicken-safely.md` | [FSANZ, keeping food at the right temperature](https://www.foodstandards.gov.au/business/food-safety/keeping-food-at-the-right-temperature) |
| A fridge should hold food at 5°C or below | `content/posts/what-temperature-should-your-fridge-be.md` | Same FSANZ page as the danger-zone row — 5°C is the cold boundary of that zone |
| The 2-hour/4-hour rule (0–2h: refrigerate or use immediately; 2–4h: use immediately; 4h+: discard), cumulative across a day | `content/posts/summer-fridge-food-safety.md`, `content/posts/christmas-leftovers-what-keeps.md`, `content/posts/how-long-do-leftovers-keep.md`, `content/posts/defrosting-chicken-safely.md` | [NSW Food Authority, managing potentially hazardous foods](https://www.foodauthority.nsw.gov.au/help/managing-potentially-hazardous-foods) |

## Fruit and vegetable storage (fridge vs bench vs pantry)

| Claim | Where it appears | Source |
| --- | --- | --- |
| Bananas, tomatoes, avocado (until ripe), garlic (unpeeled), onions, potatoes, whole pumpkin, whole pineapple and basil should not be refrigerated | `content/posts/fruit-veg-storage-guide.md`, `content/posts/how-long-food-lasts.md` | [Sustainability Victoria, guide for storing fresh produce](https://www.sustainability.vic.gov.au/recycling-and-reducing-waste-at-home/avoid-waste/food-waste/guide-for-storing-fresh-produce) |

## Freezer storage

| Claim | Where it appears | Source |
| --- | --- | --- |
| Frozen food is safe indefinitely from a bacterial standpoint; quality, not safety, is the practical limit. A standard fridge-freezer combination holds quality for a few weeks; a chest freezer at -18°C holds it for three months or more depending on fat content | `content/posts/freezer-times-explained.md`, `content/posts/how-long-food-lasts.md` | [Food Safety Information Council, freezer storage times](https://www.foodsafety.asn.au/freezer-storage-times/) |

No specific per-food freezer chart (e.g. "chicken freezes for N months") is
published on the site. We looked for an authoritative Australian source for
that kind of chart and could not find one — the same standard applied to the
receipt-scanning accuracy claim below.

## Competitor apps named in comparison posts

Every claim about a named competitor is a factual feature/pricing description
taken from that company's own site or app-store listing, not an independent
test — each post says so. No claim about a competitor's quality, reviews, or
performance appears anywhere on the site unless independently verified.

| App | Claim | Where it appears | Source |
| --- | --- | --- | --- |
| NoWaste | Barcode + photo-recognition entry, separate fridge/freezer/pantry lists, free tier covers 6 lists/500 items, iOS + Android | `content/posts/best-pantry-inventory-apps-australia.md`, `content/posts/expiry-tracker-apps-what-to-look-for.md` | [nowasteapp.com](https://www.nowasteapp.com/) |
| KitchenPal | Barcode entry, shared grocery lists, meal planning, family sharing; Premium $5.99/mo ($8.99/3mo, $22.99/yr), lifetime $49.99, family lifetime $59.99; 4.4★/95 ratings | `content/posts/best-pantry-inventory-apps-australia.md`, `content/posts/expiry-tracker-apps-what-to-look-for.md` | [App Store listing](https://apps.apple.com/au/app/kitchen-pal-food-pantry-app/id1084982489) |
| Fridgely | Barcode entry, iOS-only, shared access, expiry alerts, recipe suggestions, live since 2015 | `content/posts/best-pantry-inventory-apps-australia.md` | [fridgelyapp.com](https://fridgelyapp.com/) |
| Pantry Check | Manual entry only, no barcode/receipt scanning | `content/posts/best-pantry-inventory-apps-australia.md`, `content/posts/expiry-tracker-apps-what-to-look-for.md` | Own App Store listing, described per its stated feature set |
| Fango | Receipt photo scanning, ~34 countries/8 languages, reads PDF receipts, on-device data, Google Play + App Store | `content/posts/receipt-scanning-apps-compared.md` | [Fango's own blog/listing](https://fango.fi/en/blog/pantry-check-app-alternatives/) |
| Eatvora | Full kitchen inventory + AI recipe generation + "pantry health score", free tier includes AI features | `content/posts/receipt-scanning-apps-compared.md` | Own site, per search-result summary of its listing |
| Alydo | Receipt scanning tuned to Australian supermarket formats and abbreviations (Coles/Woolworths/Aldi/IGA/Costco) | `content/posts/receipt-scanning-apps-compared.md`, `content/posts/best-pantry-inventory-apps-australia.md` | [alydo.app](https://alydo.app/) |

## Product claims (unverifiable, handled accordingly)

| Old claim | What happened |
| --- | --- |
| "About 97% accurate" on receipt scanning (FAQ + article) | **Removed.** There is no published test set behind it, so it is a number the site cannot defend. Replaced with an honest statement about messiness plus the two-tap fix. To put a number back, you need a held-out set of real Australian receipts, a stated metric (line-level? item-name-only?), and a date, then quote it as "N% of lines on our M-receipt test set, measured [date]" |
| $4.99/mo, $49.99/yr, 7-day trial, household of six | Kept. These are your own commercial terms and they now match across FAQ, Terms and the articles. Terms already carries the "currently A$..." hedge |
| "Founding pricing for waitlist members" | Kept. A promise you can keep, but it is a promise, so it now appears consistently rather than in three different phrasings |

## Changelog scope

`/changelog` is the **Pantry iOS app's** release history and nothing else.
Website and marketing-site work is not a release the user's phone received, so
it does not appear there.

The four entries that were on the page (0.9.0 Website polish, 0.8.0 Fridge
story pass, 0.7.0 Marketing site foundation, 0.1.0 First public waitlist) were
all website work and have been removed. They are in git history if you want
them for a separate build log.

`changelog` in `content.js` is now empty on purpose. No build has reached the
App Store, so there is no app release history that can be honestly published,
and none has been invented to fill the page. The page renders an empty state
saying so, and flips to the normal release list the moment a real entry is
added. The shape to use is documented in the comment above the array.

The **What's coming** roadmap is unchanged and was already app-only (1.0 launch,
Pro, post-launch work). It stays labelled as windows rather than dates.
