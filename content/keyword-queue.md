# Keyword queue

Standing backlog for the next batch of posts in `content/posts/`. Not read by
the build — `scripts/lib/posts.mjs` only scans `content/posts`, so this file
is a working document, safe to edit freely.

Add lines as ideas come up. Before writing a batch, the queue gets clustered
into posts, checked against the keywords already targeted, and the lines that
become posts get struck through rather than deleted, so the register shows
what has been covered.

## Format

One keyword per line:

```
keyword | TAG | priority | note
```

- **keyword** — as a person would type it into Google, lower case.
- **TAG** — the post tag it belongs under: `STORAGE`, `APPS`, `WASTE`, or a
  new one. Sets the voice register.
- **priority** — `high` / `med` / `low`. High means write it this batch.
- **note** — optional. Anything that changes how it gets written: an angle, a
  source, a post it should link to, whether it is a commercial keyword or
  top-of-funnel traffic.

Only the keyword is required. `spinach freezing | | | ` is a fine line — the
rest gets filled in during clustering.

## What is most useful to include

- **Which keywords are commercial** — someone likely to join the waitlist —
  versus pure traffic. The `APPS` cluster is commercial; the shelf-life
  cluster is top-of-funnel. Mixing them without marking which is which means
  guessing at how hard each post should push Pantry.
- **Anything deliberately out of scope**, so it does not get written by
  accident.
- **A GSC or Keyword Planner CSV** is better than a hand-typed list where you
  have one — impressions and position identify the queries the site already
  half-ranks for, which are cheaper wins than net-new topics. Drop the export
  anywhere in the repo and reference it here.

## Queue

<!-- keyword | TAG | priority | note -->
<!-- The queue was empty when the September – October 2026 batch was
written. The ten struck-through lines below were chosen for it: five
CSIRO-sourced shelf-life queries carrying the "once opened" / "after opening"
/ "in the fridge" modifiers, and five app-focused queries. None was in the
Covered list. The unstruck lines are candidates held back or scrapped, with
the reason. -->
~~how long does cheese last in the fridge | STORAGE | high | CSIRO three cheese rows; once-opened H2; published 15 Sep 2026~~
~~is pantry app free | PLANS | high | commercial; Free vs Pro terms from the FAQ and plan cards; published 15 Sep 2026~~
~~app that suggests meals from what you have | PRODUCT | high | commercial; receipt-to-meals, carries the scanning-accuracy framing; 15 Sep 2026~~
~~how long does cream last after opening | STORAGE | high | CSIRO 5 days; thickened/pure/double variants; published 15 Sep 2026~~
~~how long does christmas ham last in the fridge | SEASONAL | high | whole ham 2-3 wks vs sliced 4-5 days, CSIRO deli section; published 15 Sep 2026~~
~~how long do prawns last in the fridge | SEASONAL | high | CSIRO crustaceans and molluscs 2 days; oysters variant H2; published 15 Sep 2026~~
~~freezer inventory app | APPS | high | commercial; date-frozen not defrost-by, FSIC; published 15 Sep 2026~~
~~how long does bacon last in the fridge | STORAGE | high | CSIRO cured meat 2-3 wks, held at 2; once-opened H2; published 15 Sep 2026~~
~~food waste tracking app australia | WASTE | high | commercial; digest counts waste before it happens, FFW CRC under-reporting; published 15 Sep 2026~~
~~fridge inventory spreadsheet | HOUSEHOLD | high | commercial; DIY-template searchers, why the sheet dies and what the receipt replaces; published 15 Sep 2026~~
<!-- Added 15 Sep 2026 from the first GSC pull (28 Aug – 13 Sep 2026: 396
impressions, 2 clicks, 12 pages with any impressions). Every visible query
was a shelf-life or storage query; no app-intent query had a single
impression, so the app-focused lines below carry no GSC number and are
ranked on commercial intent instead. Impressions are 28-day GSC figures
where one exists. Ordered by priority, app-focused first. -->
~~does pantry read coles woolworths aldi receipts | PRODUCT | high | commercial; written and published 15 Sep 2026; linked from receipt-scanning-apps-compared and how-pantry-reads-a-receipt on 15 Sep 2026~~
~~how to keep track of food in the fridge | APPS | high | commercial top-of-funnel; written and published 15 Sep 2026; linked from how-long-food-lasts and sharehouse-fridge-rule on 15 Sep 2026~~
~~what to cook with leftovers before they go off | COOKING | high | written and published 15 Sep 2026; linked from how-long-do-leftovers-keep and christmas-leftovers-what-keeps on 15 Sep 2026~~
~~shopping list app with expiry dates | APPS | high | written and published 15 Sep 2026; states plainly that Pantry has no shopping list; linked from shared-shopping-that-works and expiry-tracker-apps-what-to-look-for on 15 Sep 2026~~
~~app that reminds you of use by dates | APPS | med | written and published 15 Sep 2026; leads with the use-by / best-before split; linked from best-before-vs-use-by and why-the-nudge-lands-at-530 on 15 Sep 2026~~
~~how to store raw chicken in the fridge | STORAGE | med | done 19 Sep 2026 as an H2 on chicken-in-the-fridge-three-days, sourced to the NSW Food Authority poultry page (COPY-SOURCES row added); 8 impressions at pos 36–47 before the edit~~
~~how long does cooked chicken last in the fridge | STORAGE | med | written and published 15 Sep 2026; H2s stay chicken-specific; linked from chicken-in-the-fridge-three-days and how-long-do-leftovers-keep on 15 Sep 2026~~
<!-- Added 19 Sep 2026 from the second GSC pull (21 Aug – 17 Sep 2026: 751
impressions, 5 clicks, 36 pages with impressions). The queue had no unstruck
app-focused line, so the two posts this week came from commercial gaps the
site had not covered rather than from GSC rows; app-intent queries still
carry almost no impressions (pantry tracking app 1, coles receipt 1). -->
~~how to stop buying food you already have | HOUSEHOLD | high | commercial; the double-up angle (second bottle of milk), receipt-fed list on every phone; publishes 29 Sep 2026; when live, link to it from how-long-does-milk-last (Two bottles section), fridge-inventory-spreadsheet and shared-shopping-that-works~~
~~receipt scanning app privacy | PRODUCT | high | commercial trust; restates the /privacy receipt sections only (6-hour deletion, five fields, opt-out switch); publishes 1 Oct 2026; when live, link to it from how-pantry-reads-a-receipt, does-pantry-read-coles-woolworths-aldi-receipts and receipt-scanning-apps-compared~~
safest way to defrost a chicken | STORAGE | med | not a new post: H2 added to defrosting-chicken-safely on 19 Sep 2026 for the multiple-choice quiz query (37 impressions at pos 8); leave unless it stalls
how long does ham last in the fridge | STORAGE | low | the christmas ham post already carries this H2 and sits at pos 22 on 2 impressions; a non-seasonal ham post would cannibalise it, leave
pantry app android | PRODUCT | med | commercial FAQ-style candidate for a future week: iOS-first, what Android users on the waitlist get; source the answer from the FAQ and roadmap before writing
when does pantry launch | PRODUCT | med | commercial candidate: roadmap windows, founding pricing for waitlist members; write only with the roadmap page as the single source, no dates the site does not publish
how long does unopened milk last in the fridge | STORAGE | low | not a new post: covered by the once-opened / carton H2s added to how-long-does-milk-last on 15 Sep 2026; 7 impressions for the bare query at pos 20; revisit only if it does not move by mid October
how long does raw meat last in the fridge | STORAGE | low | drafted then scrapped 6 Sep 2026 as least likely; CSIRO meat 3-5 held at 3 if revived
how long does butter last in the fridge | STORAGE | low | drafted then scrapped 6 Sep 2026 as least likely; CSIRO 8 wks, data.js 30 days
how long does fresh fish last in the fridge | STORAGE | low | drafted then scrapped 6 Sep 2026; overlaps the prawns post; CSIRO seafood 3 days
how long does mince last in the fridge | STORAGE | low | drafted then scrapped 6 Sep 2026; competes with mince-going-off-tonight, which already carries the number
how long does baby spinach last in the fridge | STORAGE | low | drafted then scrapped 6 Sep 2026; competes with wilting-spinach-five-dinners, which already carries the number
how long do mushrooms last in the fridge | STORAGE | low | held back: Sustainability Victoria's page says 4-10 days, the site table says 2-3 — reconcile the attribution first (see COPY-SOURCES.md)
how long do fresh herbs last in the fridge | STORAGE | low | held back: Sustainability Victoria's page says 3-4 days for soft herbs, the site table says 7 — reconcile first
how long does yoghurt last after opening | STORAGE | low | held back: no CSIRO figure; data.js uses the 10-day cottage/ricotta line as a proxy — decide whether a proxy number gets published

## Covered

Already targeted across the 30 published posts — do not re-target without a
reason, since two posts aiming at one query compete with each other:

australia food waste statistics · australian household food waste statistics ·
average household food waste cost · barcode scanner pantry app vs receipt ·
best before vs use by date difference · best expiry date tracker app · best
pantry inventory app australia · boxing day leftovers food safety · can you
refreeze defrosted chicken · chicken expiry days · christmas leftovers how long
do they last · cost of food waste per week · couples family grocery shopping
app · cut grocery bill · defrost chicken on the bench · do eggs expire australia
· expiry alert app design · food budget household · food expiry reminder app
notifications · food expiry tracker app · food safety hot weather australia ·
food shelf life data · food waste categories australia · food waste money ·
freezer storage times · fridge storage times australia · fridge temperature food
safety · fruit bowl vs fridge storage · grocery budget tips · grocery prices
australia save · grocery receipt ocr · grocery tracking app how to add items ·
household grocery app multiple users · how do expiry tracking apps estimate
dates · how long can groceries sit in a hot car · how long can you keep cooked
food · how long do eggs last in the fridge · how long do leftovers last in the
fridge · how long does food last in the fridge · how long does frozen food last
· how long does milk last in the fridge · how long does raw chicken last in the
fridge · how much does food waste cost australia · how much food does australia
waste per year · how much food waste per year australia · how to defrost chicken
safely · how to save money on groceries australia · how to wilt spinach · is my
fridge cold enough · meal reminder notification timing · milk expiry after
opening · mince recipes use it up · pantry app expiry dates source · receipt
scanning app grocery · receipt scanning how it works · receipt vs barcode
scanning · reduce food waste save money · scan receipt to list app · scan
receipt track pantry app · share fridge inventory app · shared flat food waste ·
shared grocery list household · shared pantry app family · sharehouse fridge
organisation · shelf life chart · spinach going off recipes · stop ordering
takeaway weeknight dinner plan · sunday meal planning tips · use by date meaning
australia · weekly grocery waste · what fruit vegetables should not be
refrigerated · what temperature should a fridge be australia · what to cook with
mince before it goes off · what to do with wilting spinach · what to look for in
a food tracking app · where does household food waste come from
Added in the September – October 2026 batch (40 posts total):

how long does cheese last in the fridge · how long does cheese last once
opened · is pantry app free · pantry app free vs pro · app that suggests
meals from what you have · what can i make with what is in my fridge app ·
how long does cream last after opening · how long does thickened cream last
in the fridge · how long does christmas ham last in the fridge · how long
does ham last in the fridge · how long do prawns last in the fridge · how
long do oysters last in the fridge · freezer inventory app · app to track
what is in my freezer · how long does bacon last in the fridge · how long
does bacon last once opened · food waste tracking app australia · how to
track food waste at home · fridge inventory spreadsheet · pantry inventory
spreadsheet template

Added 15 September 2026 (46 posts total):

does pantry read coles woolworths aldi receipts · coles receipt scanner app ·
woolworths receipt scanning app · aldi receipt app · how to keep track of
food in the fridge · how to keep track of what is in your fridge · fridge
food tracker app · keep track of expiry dates · what to cook with leftovers
before they go off · what to do with leftovers · leftover dinner ideas · how
to use up leftovers · shopping list app with expiry dates · grocery list app
that tracks expiry · app that reminds you of use by dates · use by date reminder
app · expiry date reminder app australia · how long does cooked chicken last
in the fridge · how long does roast chicken last in the fridge · how long is
cooked chicken good for

Added 19 September 2026 (48 posts total):

how to stop buying food you already have · how to stop buying duplicate
groceries · app that shows what is in my fridge while shopping · buying food
you already have at home · receipt scanning app privacy · is it safe to scan
receipts with an app · what happens to receipt photos in an app · pantry app
privacy receipt · how to store raw chicken in the fridge · safest way to
defrost a chicken · how long do cooked prawns last in the fridge · how long do
raw prawns last in the fridge · how long does deli bacon last in the fridge
