import {
  Popcorn,
  Music,
  Dumbbell,
  Shirt,
  Headphones,
  Glasses,
  Waves,
  Armchair,
  Gamepad2,
  BedDouble,
  Watch,
  Sparkles,
  CookingPot,
  Joystick,
  Bed,
  PlaneTakeoff,
  Mountain,
  Bike,
  Tablet,
  Tv,
  Laptop,
  Smartphone,
  Luggage,
  Palmtree,
  TvMinimal,
  Sofa,
  HeartPulse,
  Baby,
  Plane,
  TrainFront,
  House,
  CarFront,
  ChefHat,
  Globe,
  Coffee,
} from 'lucide-react';

// The counterfactual tail of the calculator — same charcoal, same card
// language as the controls panel, so it reads as the last row of the answer
// rather than a new argument.
//
// The four shown are always the four dearest things a single year of waste
// actually covers, so nothing on screen is ever more than twelve months away.
// That only stays interesting if the ladder is dense: the rungs below step up
// by roughly 13% each, which puts four consecutive items inside a 1.4x spread,
// so the cheapest card still lands well over half your annual waste instead of
// bottoming out at a pair of socks. Drag the spend slider and the whole ladder
// moves with it.
//
// Prices are indicative Australian retail as of 2026, chosen for scale rather
// than precision, and flagged as such in the calculator's sources block.
const THINGS = [
  ['streaming', Popcorn, 'A year of every streaming service', 'All of them, all at once', 129],
  ['spotify', Music, 'A year of Spotify Premium', '12 months, ad-free', 159],
  ['gym', Dumbbell, 'Three months at the good gym', 'The one with the pool', 189],
  ['wardrobe', Shirt, 'A whole new work wardrobe', 'A few good outfits, done properly', 219],
  ['airpods', Headphones, 'AirPods Pro', 'Noise cancelling', 249],
  ['sunnies', Glasses, 'A proper pair of sunglasses', 'Not the $20 servo ones', 289],
  ['spa', Waves, 'A full spa day, for two', 'Massage, facials, the lot', 329],
  ['chair', Armchair, 'A really good office chair', 'Your back, thanking you', 369],
  ['switch', Gamepad2, 'A Nintendo Switch 2', 'Plus a game', 409],
  ['weekend', BedDouble, 'A weekend away, for two', 'Blue Mountains, off-season', 459],
  ['watch', Watch, 'An Apple Watch', 'Series, 45mm', 519],
  ['vacuum', Sparkles, 'A really good cordless vacuum', 'Cleans stairs without complaining', 589],
  ['blender', CookingPot, 'A high-end blender and food processor', 'Smoothies, soups, no more chopping', 665],
  ['ps5', Joystick, 'A PlayStation 5', 'Plus a couple of games', 749],
  ['mattress', Bed, 'A really good mattress', 'You spend a third of your life on it', 849],
  ['bali', PlaneTakeoff, 'Return flights to Bali', 'One seat, shoulder season', 959],
  ['tassie', Mountain, 'Three nights in Tasmania, for two', 'Flights, car, cabin', 1085],
  ['bike', Bike, 'A really good bike', 'Not electric, just excellent', 1225],
  ['ipad', Tablet, 'An iPad Pro', '11-inch, 256GB', 1385],
  ['tv55', Tv, 'A 55-inch OLED TV', 'Properly good, not just big', 1565],
  ['coffee', Coffee, 'A daily coffee, all year', '365 flat whites at $4.85', 1765],
  ['laptop', Laptop, 'A MacBook Air', '13-inch, 512GB', 1999],
  ['phone', Smartphone, 'The newest iPhone Pro', '256GB, outright', 2199],
  ['london', Luggage, 'Return flight to London', 'Sydney, economy, off-peak', 2399],
  ['queensland', Palmtree, 'A week in Queensland, for two', 'Flights, resort, hire car', 2599],
  ['tv65', TvMinimal, 'A 65-inch OLED TV', 'The one you keep not buying', 2899],
  ['ebike', Bike, 'A very good e-bike', 'Never drive to work again', 3299],
  ['childcare', Baby, 'Six weeks of full-time childcare', 'For one kid, before subsidies', 3699],
  ['japan-solo', Mountain, 'Ten days in Japan', 'Flights, ryokans, rail pass', 4199],
  ['lounge', Sofa, 'A whole new lounge room', 'Sofa, rug, the lot', 4699],
  ['health', HeartPulse, 'A year of private health cover', 'For two, mid tier', 5299],
  ['japan', Plane, 'Two weeks in Japan, for two', 'Flights, hotels, trains', 5999],
  ['europe', TrainFront, 'A month across Europe', 'Flights, rail pass, rooms', 6799],
  ['mortgage', House, 'Three months of mortgage repayments', 'On a median Australian loan', 7699],
  ['car', CarFront, 'A very good secondhand car', 'Low kms, full service history', 8699],
  ['kitchen', ChefHat, 'A whole new kitchen', 'Benchtops, cabinetry, the lot', 9799],
  ['world', Globe, 'A round-the-world ticket, for two', 'Six stops, twelve months', 11000],
].map(([id, Icon, name, detail, price]) => ({ id, Icon, name, detail, price }));

const money = (n) =>
  n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });

// How long the bin takes to pay for something. Always inside a year, since
// everything on screen has already been filtered to what a year covers.
function payoff(price, wastePerYear) {
  const months = Math.round((price / wastePerYear) * 12);
  if (months <= 1) return 'Under a month';
  return months >= 12 ? 'A full year' : `${months} months`;
}

export default function WasteSwap({ wasteYear }) {
  // The four dearest things a year of waste covers. Ascending prices mean the
  // tail of the affordable list is exactly that, already cheapest-first.
  const shown = THINGS.filter((t) => t.price <= wasteYear).slice(-4);

  return (
    <div className="calc-swap">
      <div className="calc-swap__head">
        <h3 className="calc-swap__title">
          <span className="calc-swap__title-figure">{money(wasteYear)}</span> a year, spent on anything else
        </h3>
        <p className="calc-swap__lede">
          Same money, better ending. Every one of these is inside a single year of your waste, not a stretch goal, just the food already in your bin, priced up.
        </p>
      </div>

      <ul className="calc-swap__grid">
        {shown.map(({ id, Icon, name, detail, price }) => {
          // How much of your year the thing costs — the same fraction the
          // months figure states, drawn.
          const share = Math.min(100, (price / wasteYear) * 100);
          return (
            <li key={id} className="swap-card">
              <div className="swap-card__top">
                <span className="swap-card__icon">
                  <Icon size={19} strokeWidth={2} />
                </span>
                <span className="swap-card__price">{money(price)}</span>
              </div>

              <div className="swap-card__name">{name}</div>
              <div className="swap-card__detail">{detail}</div>

              <div className="swap-card__payoff">{payoff(price, wasteYear)}</div>
              <div className="swap-card__payoff-note">of binned food pays for it</div>

              <div className="swap-card__meter">
                <div className="swap-card__meter-track">
                  <div className="swap-card__meter-fill" style={{ width: `${share}%` }} />
                </div>
                <span className="swap-card__meter-label">{Math.round(share)}% of the year</span>
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
