# Pantry voice card

For anyone (human or agent) writing copy for usepantry.com.au, including blog
posts in `content/posts/`.

## Purpose: these posts sell Pantry

This is marketing content, not neutral journalism. Every post should make the
reader want Pantry specifically, not leave them equally informed about the
whole category. Lead with Pantry, keep it at the centre of the piece, and
write with confidence — not hedged, not apologetic, not "one option among
many." Cut anything that spends more words on how the category works in
general than on why Pantry is the one worth wanting.

## Two hard boundaries — non-negotiable, do not soften over time

These are not style preferences and they do not get revisited quarter to
quarter. They exist because the site is a real, public marketing page for a
real product, and both boundaries protect against exposure that a marketing
tone change cannot justify.

- **Never state or imply Pantry is available, launched, downloadable, or on
  the App Store.** Check `LAUNCH_STAGE` in `src/site/launch.js` — while it is
  `'waitlist'`, Pantry is pre-launch and waitlist-only; at `'beta'` it is a
  TestFlight public beta, which is still not "on the App Store" or "launched". Saying otherwise on a live
  public page is a false claim of fact to real consumers, and in Australia
  that is squarely what the Australian Consumer Law's misleading-conduct
  provisions are for. Write pre-launch copy with real energy — anticipation,
  urgency to join the waitlist, confidence about what's coming — without ever
  crossing into "it's here."
- **Never invent or imply a specific negative claim about a named competitor**
  — a bad review, a flaw, a complaint — that is not something we have
  independently verified. NoWaste, KitchenPal, Fridgely, and any other app a
  post names are real, currently-operating businesses. A fabricated "reviews
  say the scanning isn't great" is a false statement of fact about a real
  company, not a marketing flourish, and it carries real legal exposure
  (defamation / injurious falsehood), independent of how the rest of the
  sentence is worded.

## How to make Pantry the hero without either boundary

This is very much still possible, and it's most of the job:

- **Spend the words on Pantry, not the competition.** A competitor mention is
  a sentence or two of neutral, factual description (what they do, sourced
  from their own site or listing) — not a paragraph, not a feature-by-feature
  table that gives them equal billing.
- **Lead with what's actually different**, stated plainly and without
  hedging: Pantry starts from a photographed Australian receipt, not a
  barcode or manual entry — a whole basket becomes a list in one photo,
  reading Coles/Woolworths/Aldi-style abbreviations specifically. Household
  sharing (up to six people, one subscription) is built around the receipt
  entry point, not bolted on. Say this with confidence, not as "one of the
  things Pantry also does."
- **If a competitor genuinely lacks something Pantry has** (e.g. no receipt
  scanning, no built-in meal generation, iOS-only), say that factually — it's
  a comparison of features, not a claim about quality or reviews. "X requires
  scanning each item's barcode individually" is a fact; "X's scanning is
  clunky" is not, unless we have a specific, checkable source for it.
- **Close on Pantry, every time** — the waitlist, or another Pantry post —
  never end a post on a competitor's name.

## Mechanics

- **Australian English, AUD.** `-ise` not `-ize`, colour, flavour, kilos, °C.
- **Curly quotes and apostrophes** — `’ “ ”`, not straight `' "`.
- **Prefer expanded forms** — "do not", "it is", "cannot", not contractions.
- **Second person.** No exclamation marks. No emoji.

## Sentence shape

- Short, declarative sentences. Fragments are fine.
- Long compound sentences are not — if a sentence needs a semicolon, it is
  probably two sentences.
- Concrete kitchen scenes over abstraction. The house style is "the argument
  at 5:30pm", not "meal-planning friction". "The mince that turns tomorrow",
  not "perishable inventory".

## The opening paragraph answers the query

A post's first paragraph must contain the actual answer to the question in its
title — the number, the verdict, the rule — not a promise that the answer is
coming. This is the single highest-leverage line in the post: it is what
Google lifts into a featured snippet, and on a phone the snippet is most of
what sits above the fold on a "how long does X last" search.

The test is mechanical. Take the post's first keyword, read only the opening
paragraph, and check whether the reader now knows the answer. If they have to
scroll to a later section, the opener has failed, however well it reads.

- **Right** — `chicken-in-the-fridge-three-days`: "Raw chicken has the shortest
  fridge life of anything in a typical shopping trip. CSIRO's
  refrigerated-storage guide gives it three days." The number is in sentence
  two, with its source.
- **Right** — `what-temperature-should-your-fridge-be`: closes the opener on
  "5°C or below, everywhere food sits."
- **Wrong** — an opener that ends "here is the number behind it, what shortens
  it, and the signs worth trusting." That is a table of contents, not an
  answer.

This does not mean opening flat. Lead with the concrete kitchen scene if the
scene earns it, then land the number before the paragraph ends — the eggs post
takes three sentences to get to "three to six weeks" and still passes. What it
rules out is deferring the answer to a section below.

Two follow-on rules:

- **Match the H2 to the query.** Where a post targets a modifier people
  actually type — "after opening", "once opened", "in the fridge" — that
  phrasing needs its own H2 with a short, self-contained answer under it, not
  a clause buried mid-paragraph. A post whose title carries a modifier and
  whose body never repeats it is targeting a query it does not answer.
- **Answer the variants people search.** Full cream, skim and low fat are three
  separate searches even when the answer is identical. Say the answer is
  identical, in those words, rather than leaving the searcher to assume the
  page is not about their milk.

## What every claim needs

- **Every number carries its source in the sentence** — "per the Fight Food
  Waste CRC", not a bare figure. No unsourced statistics, ever. This applies
  to claims about Pantry's own dataset (CSIRO, Sustainability Victoria, NSW
  Food Authority) exactly as much as to claims about a competitor.
- Any new factual claim gets a row in [`COPY-SOURCES.md`](../COPY-SOURCES.md)
  before the post is finished.
- Where guidance gives a range (shelf life, savings estimates), take the
  cautious end and say so.

## Tone

- **Confident, not hedged.** Say what Pantry does and why it's the better
  choice — do not soften it with "we think" or "in our view" where a plain
  statement works.
- **Still explicit about Pantry's own real limits where they matter** — the
  site's established line on receipt-scanning accuracy ("we do not quote a
  number we cannot show you the workings for") stays, because overclaiming
  about our *own* product's accuracy is a different and separate risk from
  underselling it. Confidence about what Pantry is built to do is not the
  same as a specific, checkable performance claim we can't back up.
- **Not a lecture.** Pantry is a memory aid for groceries, not a
  sustainability sermon. No guilt, no moralising.
