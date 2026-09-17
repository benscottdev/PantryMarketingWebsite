import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import WaitlistForm from './WaitlistForm'
import PhoneFrame from './PhoneFrame'
import homeShot from '../../static/home.png'
import { HERO_ART } from './heroFoodArt'

// Days left drives the ring colour, the same mint → amber → terracotta ramp the
// app puts on a fridge label. The orbs are decoration, but they may as well be
// decoration that says what the product does.
const toneFor = (days) => (days <= 0 ? 'expired' : days <= 4 ? 'urgent' : days <= 7 ? 'soon' : 'fresh')

// `days` is measured from today, whatever today is. The time slider walks
// forward through these; the last item goes at `MAX_DAYS`, so the slider ends
// on an empty fridge rather than a carrot that never dies.
const FOODS = [
  { id: 'apple', name: 'Apples', days: 5, price: 4.2, x: 9, y: 22 },
  { id: 'milk', name: 'Milk', days: 6, price: 3.1, x: 18, y: 58 },
  { id: 'egg', name: 'Eggs', days: 12, price: 6.5, x: 28, y: 8 },
  { id: 'fish', name: 'Salmon', days: 2, price: 12.9, x: 68, y: 9 },
  { id: 'greens', name: 'Spinach', days: 3, price: 3.5, x: 80, y: 54 },
  { id: 'carrot', name: 'Carrots', days: 14, price: 2.4, x: 82, y: 20 },
]
const MAX_DAYS = Math.max(...FOODS.map((f) => f.days))

const dateIn = (days) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })
}
const money = (n) => `$${n.toFixed(2)}`

function FoodArt({ id }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {HERO_ART[id]}
    </svg>
  )
}

function useFoodMotion(stageRef) {
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    // How far an orb may drift before it would leave the stage or collide with
    // the copy depends on the viewport, and so does whether there's a pointer
    // to react to at all. These are watched rather than sampled once, because a
    // window resized or a phone rotated after load used to keep running
    // whichever set of amplitudes happened to be true at mount.
    const tight = window.matchMedia('(max-width: 900px), (orientation: landscape) and (max-height: 520px)')
    const finePointer = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = [...stage.querySelectorAll('[data-landing-food]')]

    const start = () => {
      const narrow = tight.matches
      const travel = narrow ? 28 : 64
      const clamp = gsap.utils.clamp(-travel, travel)
      const orbs = elements.map((el, i) => ({
        el,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        phase: i * 1.15 + 0.2,
        amp: (narrow ? 8 : 18) + (i % 3) * (narrow ? 4 : 8),
      }))

      const mouse = { x: 0, y: 0, on: false }
      let raf = 0
      let last = performance.now()
      let inView = true

      const tick = (now) => {
        if (!inView) {
          raf = 0
          return
        }
        raf = requestAnimationFrame(tick)
        if (reduce.matches) return
        const dt = Math.min(2, (now - last) / 16.67)
        last = now

        for (const b of orbs) {
          const restX = Math.sin(now * 0.00055 + b.phase) * b.amp
          const restY = Math.cos(now * 0.0007 + b.phase * 1.2) * (b.amp * 0.85)
          if (mouse.on) {
            const r = b.el.getBoundingClientRect()
            const dx = r.left + r.width / 2 - mouse.x
            const dy = r.top + r.height / 2 - mouse.y
            const dist = Math.hypot(dx, dy) || 0.001
            const radius = 140
            if (dist < radius) {
              const force = (1 - dist / radius) ** 2 * 22 * dt
              b.vx += (dx / dist) * force
              b.vy += (dy / dist) * force
            }
          }
          b.vx += (restX - b.x) * 0.06 * dt
          b.vy += (restY - b.y) * 0.06 * dt
          b.vx *= 0.84 ** dt
          b.vy *= 0.84 ** dt
          b.x = clamp(b.x + b.vx * dt)
          b.y = clamp(b.y + b.vy * dt)
          gsap.set(b.el, { x: b.x, y: b.y, force3D: true })
        }
      }

      const onMove = (e) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
        mouse.on = true
      }
      const onLeave = () => {
        mouse.on = false
      }

      raf = requestAnimationFrame(tick)
      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting
        if (inView && !raf) {
          last = performance.now()
          raf = requestAnimationFrame(tick)
        }
      })
      io.observe(stage)
      if (finePointer.matches) {
        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('pointerleave', onLeave)
      }

      return () => {
        io.disconnect()
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerleave', onLeave)
        cancelAnimationFrame(raf)
        gsap.set(elements, { x: 0, y: 0 })
      }
    }

    let stop = start()
    const restart = () => {
      stop()
      stop = start()
    }

    const queries = [tight, finePointer, reduce]
    queries.forEach((q) => q.addEventListener('change', restart))

    return () => {
      queries.forEach((q) => q.removeEventListener('change', restart))
      stop()
    }
  }, [stageRef])
}

export default function Landing() {
  const stageRef = useRef(null)
  const [open, setOpen] = useState(null)
  // Days ahead of today the visitor has dragged the time slider.
  const [ahead, setAhead] = useState(0)
  useFoodMotion(stageRef)

  const onFood = (id) => {
    setOpen((cur) => (cur === id ? null : id))
  }

  const lost = FOODS.filter((f) => f.days - ahead <= 0).reduce((sum, f) => sum + f.price, 0)
  const whenLabel = ahead === 0 ? 'Today' : `In ${ahead} day${ahead === 1 ? '' : 's'}`

  return (
    <section className="landing" data-landing aria-label="Pantry">
      <div className="landing__copy">

        <h1 className="landing__title">
          Stop throwing out the
          <br />
          <em>food you already paid for.</em>
        </h1>
        <p className="landing__sub">
          Photograph your receipt. Pantry tracks<br />every expiry date and tells you what to
          <strong> cook first</strong>.
        </p>
        <WaitlistForm variant="hero" />
      </div>

      <div className="landing__stage" ref={stageRef}>
        {FOODS.map((food) => {
          const left = food.days - ahead
          const tone = toneFor(left)
          const gone = left <= 0
          return (
            <div
              key={food.id}
              className="landing__food-wrap"
              style={{ left: `${food.x}%`, top: `${food.y}%` }}
              data-food={food.id}
              data-tone={tone}
              data-hide-narrow={food.id === 'egg' || food.id === 'fish' ? '' : undefined}
            >
              <button
                type="button"
                className={`landing__food${open === food.id ? ' is-open' : ''}`}
                data-landing-food
                data-expired={gone ? '' : undefined}
                aria-expanded={open === food.id}
                aria-label={`${food.name}, ${gone ? 'expired' : `${left} days left`}. ${open === food.id ? 'Hide' : 'Show'} details.`}
                onClick={() => onFood(food.id)}
              >
                <FoodArt id={food.id} />
                <span className="landing__food-days" aria-hidden="true">
                  {gone ? 'Expired' : `${left}d`}
                </span>
                <span className="landing__food-tip">
                  {food.name}
                  <strong>{gone ? `Expired ${dateIn(food.days)}` : `Expires ${dateIn(food.days)}`}</strong>
                </span>
              </button>
            </div>
          )
        })}

        <div className="landing__time">
          <div className="landing__time-label" aria-live="polite">
            {whenLabel}
            <small>{dateIn(ahead)}</small>
          </div>
          <div className="landing__time-track">
            <input
              className="landing__time-range"
              type="range"
              min="0"
              max={MAX_DAYS}
              step="1"
              value={ahead}
              aria-label="Days from today"
              aria-valuetext={`${whenLabel}, ${dateIn(ahead)}`}
              onChange={(e) => setAhead(Number(e.target.value))}
            />
          </div>
          <div className={`landing__time-lost${lost > 0 ? ' is-on' : ''}`}>
            {lost > 0 ? <><strong>{money(lost)}</strong> binned</> : <>slide down ↓</>}
          </div>
        </div>

        <div className="landing__phone">
          <PhoneFrame variant="hero">
            <img className="landing__shot" src={homeShot} alt="Pantry home screen" draggable="false" />
          </PhoneFrame>
        </div>
      </div>
    </section>
  )
}
