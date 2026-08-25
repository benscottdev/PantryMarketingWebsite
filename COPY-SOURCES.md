# Copy source register

Every factual claim made in user-facing copy on this site, with where it came
from. If a claim is not in this table, it should not be on the site.

Last verified: 25 August 2026.

## National and household food waste

| Claim | Where it appears | Source |
| --- | --- | --- |
| $2,500 of food binned per Australian household per year | `Problem.jsx` counter, FAQ pricing answer, `content.js` (aussie-food-waste), Loader facts, `index.html` meta | Fight Food Waste CRC (2021), collected at [End Food Waste Australia fact library](https://endfoodwaste.com.au/fact-library/) |
| 265 kg per household per year | `content.js` (aussie-food-waste), Loader facts, `Calculator.jsx` sources | FIAL, *National Food Waste Strategy Feasibility Study* (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/fact-library/) |
| 7.6 million tonnes of food wasted nationally | `Problem.jsx` | FIAL (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/fact-library/) and [DCCEEW](https://www.dcceew.gov.au/environment/protection/waste/food-waste) |
| $36.6 billion a year, ~1.4% of GDP, across the whole food chain | `Problem.jsx` | FIAL (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/36-6-billion-a-year-wasted-food-waste-drains-1-4-of-australias-gdp-and-weakens-food-security/) |
| 2.46 Mt from households, almost a third of all Australian food waste | `Calculator.jsx` sources, `content.js` | FIAL (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/fact-library/) |
| Households bin more than twice what they think they do | `Calculator.jsx` sources, `content.js` | Fight Food Waste CRC (2021), via [End Food Waste Australia](https://endfoodwaste.com.au/fact-library/) |
| One grocery bag in five ends up in the bin | Loader facts | [DCCEEW food waste](https://www.dcceew.gov.au/environment/protection/waste/food-waste) |

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

## Date labels

`use by` is a safety date, `best before` is a quality date, and fresh milk in
Australia carries a **use-by** date. [FSANZ](https://www.foodstandards.gov.au/consumer/labelling/dates)
/ [NSW Food Authority](https://www.foodauthority.nsw.gov.au/food-labelling/stay-safe/date-marking-storage-labelling).

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
