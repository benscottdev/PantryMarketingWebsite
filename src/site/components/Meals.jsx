import { ChefHat, Clock, Wallet } from 'lucide-react'
import PhoneFrame from './PhoneFrame'
import mealShot from '../../static/mealGen.png'

const points = [
  {
    icon: ChefHat,
    title: 'Built from your pantry',
    desc: 'Every ingredient is something you already own. A green dot means it is in the house, not on another shopping list.',
  },
  {
    icon: Clock,
    title: "Whatever is turning first",
    desc: "Mince with two days left beats yoghurt with a week. Tracking expiry is only useful if it changes what you cook tonight.",
  },
  {
    icon: Wallet,
    title: 'Costed from the list',
    desc: "Each suggestion is priced from the receipts you scanned, so you can see dinner is already paid for.",
  },
]

export default function Meals() {
  return (
    <section id="meals" className="meals" data-meals>
      <div className="meals__inner">
        <div className="meals__copy">
          <div className="meals__eyebrow eyebrow">MEALS</div>
          <h2 className="meals__title">
            Dinner from what's <em>already there.</em>
          </h2>
          <p className="meals__lede">
            Pantry writes a suggestion from the shared list: what's in, what's
            closest to going off, and what it already cost. So the turkey mince becomes lunch,
            not landfill.
          </p>

          <ul className="meals__points">
            {points.map(({ icon: Icon, title, desc }) => (
              <li className="meals__point" key={title} data-meals-point>
                <span className="meals__point-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2.25} />
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="meals__stage" data-meals-stage>
          <PhoneFrame variant="meals">
            <img
              className="meals__shot"
              src={mealShot}
              alt="Pantry meal suggestion: turkey mince lettuce wraps, built from items already in the pantry"
              draggable="false"
            />
          </PhoneFrame>
        </div>
      </div>
    </section>
  )
}
