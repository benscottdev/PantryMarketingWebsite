# Forbidden phrases

For anyone (human or agent) writing blog posts in `content/posts/`. Two
categories: generic AI writing tells that would make 20 posts read as one
voice instead of individual pieces, and Pantry-specific claims the project has
already decided against.

## Generic AI tells

Words: *honest, genuine(ly), actually, the messy reality, dive in, delve,
unlock, leverage, seamless, game-changer, revolutionise, elevate, empower,
robust, curated, ultimately, at the end of the day.*

Openers: *"let's be honest", "here's the thing", "in today's fast-paced
world", "we're excited to".*

Constructions: *"it's not just X, it's Y"*, *"whether you're X or Y"*, a
rule-of-three list in every single paragraph, a rhetorical question used as a
section opener more than once per post.

If a sentence could appear verbatim in a post about any other app, cut it —
see the voice card's instruction to reach for concrete kitchen scenes instead.

## Pantry-specific hard bans

These protect claims the project has already made a decision about. Getting
one of these wrong is a regression, not a style nitpick.

- **No accuracy percentage for receipt scanning.**
  [`COPY-SOURCES.md`](../COPY-SOURCES.md) records that a "97% accurate" claim
  was removed for being unverifiable. The correct framing is in
  `content/posts/receipt-to-meals.md`.
- **Never imply the app has shipped.** `APP_LIVE` is `false` in
  `src/site/launch.js`. Write "when the app ships" / "download it when it's
  live", not "download Pantry today".
- **Never say Pro can be bought on the website.** It cannot — see
  `content/posts/free-vs-pro.md`. Purchases happen in the App Store, after
  launch.
- **Never present supply-chain figures as household figures.**
  $36.6 billion and 7.6 million tonnes are *whole-of-supply-chain* numbers.
  $2,500 and 265kg are *household* numbers. `COPY-SOURCES.md` documents this
  as a bug that was already fixed once — do not reintroduce it.
- **Never state a shelf-life number that isn't in `src/site/data.js` or
  CSIRO's published guide.** Where guidance gives a range, take the cautious
  home-fridge end, matching the existing pattern in that file's comments.

## Before finishing a post

Add a row to `COPY-SOURCES.md` for every factual claim. A post whose claims
aren't in that register is not finished, regardless of how the prose reads.
