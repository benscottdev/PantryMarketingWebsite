import { Check } from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Free',
    kicker: 'Forever',
    desc: 'Scan a receipt, watch what is turning, and get one quiet nudge every morning. No card, no trial clock.',
    items: [
      { label: 'Receipt scans', note: '1 / week' },
      { label: 'Meal generations', note: '2 / week' },
      { label: 'Expiry tracking' },
      { label: 'Morning digest' },
      { label: 'Afternoon AI notifications', included: false },
      { label: 'Household members', included: false },
      { label: 'Priority support', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    kicker: 'Upgrade in the app',
    desc: 'Unlimited scans and meals, the evening nudge, and everyone you live with on the same pantry. One subscription covers the house.',
    featured: true,
    items: [
      { label: 'Receipt scans', note: 'Unlimited' },
      { label: 'Meal generations', note: 'Unlimited' },
      { label: 'Expiry tracking' },
      { label: 'Morning digest' },
      { label: 'Afternoon AI notifications' },
      { label: 'Household members' },
      { label: 'Priority support' },
    ],
  },
]

function PlanCard({ plan }) {
  return (
    <article
      className={`plan${plan.featured ? ' plan--pro' : ' plan--free'}`}
      data-feature-row
    >
      <header className="plan__head">
        <span className="plan__kicker">{plan.kicker}</span>
        <h3 className="plan__name">{plan.name}</h3>
        <p className="plan__desc">{plan.desc}</p>
      </header>

      <ul className="plan__list">
        {plan.items.map((item) => {
          const included = item.included !== false
          return (
            <li
              className={`plan__item${included ? '' : ' plan__item--out'}`}
              key={item.label}
            >
              <span className="plan__mark" aria-hidden="true">
                {included ? <Check size={14} strokeWidth={3} /> : null}
              </span>
              <span className="plan__label">{item.label}</span>
              {item.note && <span className="plan__note">{item.note}</span>}
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default function Features() {
  return (
    <section id="features" className="features" data-features>
      <div className="features__inner">
        <div className="features__copy">
          <div className="features__eyebrow eyebrow">PLANS</div>
          <h2 className="features__title">
            Free vs <em>Pro.</em>
          </h2>
          <p className="features__desc">
            Free is a real plan, not a countdown. Pro opens it up to the whole
            house: unlimited scans, the evening nudge, and one shared pantry for
            everyone who opens that fridge.
          </p>
          <p className="features__note">
            Pro is not sold on this site. Download the app, use Free as long as
            you like, and upgrade in-app if the house needs it.
          </p>
        </div>

        <div className="features__grid" data-feature-table>
          {plans.map((plan) => (
            <PlanCard plan={plan} key={plan.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
