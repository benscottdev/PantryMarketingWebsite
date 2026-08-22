import { useMemo, useState } from 'react';
import { CalendarDays, Users, Wallet, ChevronDown, HeartHandshake } from 'lucide-react';
import WasteSwap from './WasteSwap';

// ---------------------------------------------------------------------------
// The model
// ---------------------------------------------------------------------------
//
// Everything below is derived from published Australian figures rather than
// invented, and every constant is cited in the <Sources> block at the bottom
// of the section so the number on screen can be traced back to its origin.

const FREQUENCIES = [
  { id: 'weekly', label: 'Weekly', shopsPerYear: 52, min: 40, max: 500, step: 5, initial: 180 },
  { id: 'twice', label: '2× a week', shopsPerYear: 104, min: 20, max: 300, step: 5, initial: 95 },
  { id: 'monthly', label: 'Monthly', shopsPerYear: 12, min: 150, max: 1600, step: 25, initial: 780 },
];

// Rabobank's Financial Health Barometer reports the share of groceries
// Australian households *say* they throw out, and that the share climbs with
// spend: ~11.1% on an average shop, and close to 17% for households spending
// over $300 a week. Anchored at those published points and interpolated
// between them, flat outside the range rather than extrapolated off the end
// of the evidence.
const RATE_ANCHORS = [
  [110, 9.0],
  [225, 11.1],
  [350, 16.8],
];

// Those are self-reported figures, and the Fight Food Waste CRC's headline
// finding is that households bin more than twice what they think they do.
// Run un-corrected, the anchors above put an average Australian household
// (~2.5 people, ~$200/week of groceries) at $1,096 a year — less than half
// the $2,500 measured national baseline this site quotes higher up the page,
// and 116kg against a measured 265kg. This factor is exactly the gap: it puts
// a typical household back on $2,500 and 265kg, and lands inside the "more
// than twice" the research describes.
const UNDERREPORTING = 2.28;

// Measured household waste rates in the low-20s are consistent with WRAP's UK
// weighed-bin work; the high-spend end corrected in full would run past 40%,
// which is well beyond anything published. Held here instead, the same way
// the anchors are held flat outside their range.
const MAX_RATE = 0.3;

// Directional adjustment only. WRAP's household research consistently finds
// smaller households waste a higher share of what they buy — pack sizes and
// portions don't scale down, so more of it spoils before it's used. Weighted
// across the ABS household-size distribution these average out to ~1.0, so
// they tilt the national rate rather than inflate it.
const HOUSEHOLD_FACTORS = { 1: 1.12, 2: 1.02, 3: 0.96, 4: 0.92, 5: 0.88, 6: 0.85 };

// FIAL's national baseline puts household food waste at 265kg a year against
// the $2,500 a year the Fight Food Waste CRC costs it at — roughly $9.43 per
// kilo binned. Both are measured figures, which is why the rate above has to
// be corrected onto a measured basis before this conversion is applied to it.
const KG_PER_DOLLAR = 265 / 2500;

function wasteRate(weeklySpend, people) {
  const [first] = RATE_ANCHORS;
  const last = RATE_ANCHORS[RATE_ANCHORS.length - 1];
  let base = last[1];
  if (weeklySpend <= first[0]) {
    base = first[1];
  } else {
    for (let i = 1; i < RATE_ANCHORS.length; i += 1) {
      const [x0, y0] = RATE_ANCHORS[i - 1];
      const [x1, y1] = RATE_ANCHORS[i];
      if (weeklySpend <= x1) {
        base = y0 + ((y1 - y0) * (weeklySpend - x0)) / (x1 - x0);
        break;
      }
    }
  }
  const corrected = (base / 100) * (HOUSEHOLD_FACTORS[people] ?? HOUSEHOLD_FACTORS[6]) * UNDERREPORTING;
  return Math.min(MAX_RATE, corrected);
}

const money = (n) =>
  n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });

const count = (n) => (n >= 10 ? Math.round(n).toLocaleString('en-AU') : n.toFixed(1));

// ---------------------------------------------------------------------------

export default function Calculator() {
  const [frequencyId, setFrequencyId] = useState('weekly');
  const [people, setPeople] = useState(2);
  const [spendPerShop, setSpendPerShop] = useState(180);

  const frequency = FREQUENCIES.find((f) => f.id === frequencyId);

  // Switching how often you shop shouldn't quietly change how much you spend
  // — carry the annual total across and re-express it as a per-shop figure,
  // so the results only move when you actually move the slider.
  const changeFrequency = (next) => {
    const annual = spendPerShop * frequency.shopsPerYear;
    const raw = annual / next.shopsPerYear;
    const snapped = Math.round(raw / next.step) * next.step;
    setSpendPerShop(Math.min(next.max, Math.max(next.min, snapped)));
    setFrequencyId(next.id);
  };

  const r = useMemo(() => {
    const spendYear = spendPerShop * frequency.shopsPerYear;
    const spendMonth = spendYear / 12;
    const rate = wasteRate(spendYear / 52, people);
    const wasteYear = spendYear * rate;

    return {
      rate,
      spendMonth,
      spendYear,
      wasteMonth: wasteYear / 12,
      wasteYear,
      kgYear: wasteYear * KG_PER_DOLLAR,
      perPersonYear: wasteYear / people,
    };
  }, [spendPerShop, frequency, people]);

  const sliderFill = ((spendPerShop - frequency.min) / (frequency.max - frequency.min)) * 100;

  return (
    <section className="calc" id="calculator">
      <div className="calc__inner">
        <header className="calc__head">
          <div className="calc__eyebrow eyebrow">THE MATHS — WHAT YOUR BIN ACTUALLY COSTS</div>
          <h2 className="calc__title">Run your own numbers.</h2>
          <p className="calc__lede">
            Three questions. The rest comes from Australia&apos;s own food-waste research, including the awkward
            finding that the more you spend, the bigger the share you bin.
          </p>
        </header>

        <div className="calc__grid">
          {/* ---------------------------------------------------------- */}
          {/* Controls                                                    */}
          {/* ---------------------------------------------------------- */}
          <div className="calc-panel">
            <fieldset className="calc-field">
              <legend className="calc-field__label">
                <CalendarDays size={15} strokeWidth={2.25} />
                How often do you shop?
              </legend>
              <div className="calc-pills">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`calc-pills__pill${f.id === frequencyId ? ' is-active' : ''}`}
                    aria-pressed={f.id === frequencyId}
                    onClick={() => changeFrequency(f)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="calc-field">
              <label className="calc-field__label" htmlFor="calc-people">
                <Users size={15} strokeWidth={2.25} />
                People in your household
              </label>
              <div className="calc-select">
                <select
                  id="calc-people"
                  className="calc-select__input"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n === 6 ? '6 or more people' : `${n} ${n === 1 ? 'person' : 'people'}`}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} strokeWidth={2.25} className="calc-select__chevron" />
              </div>
            </div>

            <div className="calc-field">
              <label className="calc-field__label" htmlFor="calc-spend">
                <Wallet size={15} strokeWidth={2.25} />
                How much do you spend per shop?
              </label>
              <output className="calc-field__value" htmlFor="calc-spend">
                {money(spendPerShop)}
              </output>
              <input
                id="calc-spend"
                type="range"
                className="calc-slider"
                min={frequency.min}
                max={frequency.max}
                step={frequency.step}
                value={spendPerShop}
                style={{ '--fill': `${sliderFill}%` }}
                onChange={(e) => setSpendPerShop(Number(e.target.value))}
              />
              <div className="calc-field__scale">
                <span>{money(frequency.min)}</span>
                <span>{money(frequency.max)}+</span>
              </div>
            </div>

            <p className="calc-panel__note">
              That&apos;s <strong>{money(r.spendYear)}</strong> of groceries a year for a household of {people}.
            </p>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Results                                                     */}
          {/* ---------------------------------------------------------- */}
          <div className="calc-result">
            <div className="calc-result__lead">
              <div className="calc-result__lead-label">Straight in the bin, every year</div>
              <div className="calc-result__lead-value">{money(r.wasteYear)}</div>
              <div className="calc-result__lead-sub">
                <span className="calc-result__tag">{(r.rate * 100).toFixed(1)}% of your shop</span>
                <span>{money(r.wasteMonth)} a month · {money(r.perPersonYear)} per person</span>
              </div>
            </div>

            {/* One bar, split at the waste rate — the whole argument in a
                single glance before the numbers underneath back it up. */}
            <div className="calc-split">
              <div className="calc-split__bar">
                <div className="calc-split__eaten" style={{ width: `${(1 - r.rate) * 100}%` }} />
                <div className="calc-split__wasted" style={{ width: `${r.rate * 100}%` }} />
              </div>
              <div className="calc-split__key">
                <span className="calc-split__key-item calc-split__key-item--eaten">
                  Eaten · {money(r.spendYear - r.wasteYear)}
                </span>
                <span className="calc-split__key-item calc-split__key-item--wasted">
                  Binned · {money(r.wasteYear)}
                </span>
              </div>
            </div>

            <div className="calc-table" role="table" aria-label="Spend and waste breakdown">
              <div className="calc-table__row calc-table__row--head" role="row">
                <span role="columnheader" />
                <span role="columnheader">Month</span>
                <span role="columnheader">Year</span>
              </div>
              <div className="calc-table__row" role="row">
                <span role="rowheader">Grocery spend</span>
                <span role="cell">{money(r.spendMonth)}</span>
                <span role="cell">{money(r.spendYear)}</span>
              </div>
              <div className="calc-table__row calc-table__row--bad" role="row">
                <span role="rowheader">Food you bin</span>
                <span role="cell">{money(r.wasteMonth)}</span>
                <span role="cell">{money(r.wasteYear)}</span>
              </div>
              <div className="calc-table__row calc-table__row--bad" role="row">
                <span role="rowheader">Weight binned</span>
                <span role="cell">{count(r.kgYear / 12)} kg</span>
                <span role="cell">{count(r.kgYear)} kg</span>
              </div>
            </div>

            <p className="calc-result__foot">
              <HeartHandshake size={18} strokeWidth={2.1} />
              <span>
                That&apos;s <strong>{Math.round(r.wasteYear * 2).toLocaleString('en-AU')} meals</strong> delivered to
                people who need them — OzHarvest turns every $1 into two.
              </span>
            </p>
          </div>
        </div>

        <WasteSwap wasteYear={r.wasteYear} />

        <details className="calc-sources">
          <summary className="calc-sources__summary">
            Where these numbers come from
            <ChevronDown size={16} strokeWidth={2.25} />
          </summary>
          <div className="calc-sources__body">
            <ul className="calc-sources__list">
              <li>
                <strong>Reported share of groceries wasted (9–17%).</strong> Rabobank Financial Health Barometer —
                Australian households <em>say</em> they bin ~11.1% of the food they buy, rising to almost 17% for
                households spending over $300 a week. We interpolate between those published points and hold the rate
                flat beyond them rather than extrapolating.{' '}
                <a
                  href="https://www.rabobank.com.au/food-waste-findings-from-financial-health-barometer/"
                  target="_blank"
                  rel="noreferrer"
                >
                  rabobank.com.au
                </a>
              </li>
              <li>
                <strong>Correction for under-reporting (×2.28, capped at 30%).</strong> The single biggest number here,
                and the reason your result is larger than you&apos;d guess. Those Rabobank figures are self-reported,
                and the Fight Food Waste CRC&apos;s headline finding is that households bin <em>more than twice</em>{' '}
                what they think they do. Uncorrected, the rates above put an average Australian household (~2.5 people,
                ~$200 a week of groceries) at $1,096 and 116kg a year — against the measured national baseline of
                $2,500 and 265kg quoted higher up this page. This factor is exactly that gap: it puts a typical
                household back on the measured baseline, and sits inside the &ldquo;more than twice&rdquo; the research
                describes. Corrected rates land in the low 20s, consistent with WRAP&apos;s weighed-bin studies; the
                top of the spend range is held at 30% rather than run past anything published.{' '}
                <a href="https://endfoodwaste.com.au/fact-library/" target="_blank" rel="noreferrer">
                  End Food Waste Australia
                </a>
              </li>
              <li>
                <strong>Household-size adjustment (×0.85–×1.12).</strong> A directional tilt, not a published
                coefficient. WRAP&apos;s household research finds smaller households waste a larger share of what they
                buy, because pack sizes and portions don&apos;t scale down. Weighted across the ABS household-size
                distribution these factors average ~1.0, so they redistribute the national rate rather than raise it.{' '}
                <a
                  href="https://www.wrap.ngo/resources/report/household-food-drink-waste-people-focus"
                  target="_blank"
                  rel="noreferrer"
                >
                  wrap.ngo
                </a>
              </li>
              <li>
                <strong>Dollars to kilos ($9.43/kg).</strong> Australia&apos;s national baseline puts household food
                waste at 265kg and $2,500 per household per year — 2.46 million tonnes nationally, almost a third of
                all Australian food waste.{' '}
                <a href="https://endfoodwaste.com.au/fact-library/" target="_blank" rel="noreferrer">
                  End Food Waste Australia
                </a>{' '}
                (FIAL 2021; Karunasena &amp; Pearson / Fight Food Waste CRC 2021)
              </li>
              <li>
                <strong>Meals delivered.</strong> OzHarvest delivers two meals for every $1 donated.{' '}
                <a href="https://www.ozharvest.org/donor-promise/" target="_blank" rel="noreferrer">
                  ozharvest.org
                </a>
              </li>
              <li>
                <strong>The things you could have bought instead.</strong> Indicative Australian retail prices as of
                2026 — flights, phones and TVs all move, so treat them as a sense of scale rather than a quote.
              </li>
            </ul>
            <p className="calc-sources__caveat">
              An estimate, not an audit. Real waste swings hard on how you cook, shop and store — which is rather the
              point of Pantry.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
