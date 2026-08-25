import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import WaitlistForm from './WaitlistForm'
import PhoneFrame from './PhoneFrame'
import homeShot from '../../static/home.png'

// Days left drives the ring colour, the same mint → amber → terracotta ramp the
// app puts on a fridge label. The orbs are decoration, but they may as well be
// decoration that says what the product does.
const toneFor = (days) => (days <= 4 ? 'urgent' : days <= 7 ? 'soon' : 'fresh')

const FOODS = [
  { id: 'apple', name: 'Apple', days: 5, x: 9, y: 22 },
  { id: 'milk', name: 'Milk', days: 6, x: 18, y: 58 },
  { id: 'egg', name: 'Eggs', days: 12, x: 28, y: 8 },
  { id: 'bread', name: 'Sourdough', days: 4, x: 74, y: 10 },
  { id: 'greens', name: 'Spinach', days: 3, x: 84, y: 48 },
  { id: 'carrot', name: 'Carrot', days: 14, x: 91, y: 18 },
]

// One flat style across the six: solid silhouettes that survive being shrunk to
// 40px, a single warm highlight each, and no stroke thinner than ~1.8 at the
// 64-unit scale. Anything finer disappeared at the size these actually render.
const ART = {
  apple: (
    <>
      <path
        d="M32 22.5c3.6-4.8 11.3-5.9 16-1.7 5 4.5 4.7 14.6-.5 23.4-3.5 5.9-8.3 10.8-12.7 10.8-1.5 0-2.1-.6-2.8-.6s-1.3.6-2.8.6c-4.4 0-9.2-4.9-12.7-10.8-5.2-8.8-5.5-18.9-.5-23.4 4.7-4.2 12.4-3.1 16 1.7z"
        fill="#c8503a"
      />
      <path d="M23.4 27.6c-2.6 2.6-3.2 8.2-1.4 13.1" fill="none" stroke="#f0a08c" strokeWidth="4.2" strokeLinecap="round" opacity=".55" />
      <path d="M32 22.5c-.4-4.2.6-7.6 2.6-9.9" fill="none" stroke="#7a5433" strokeWidth="3" strokeLinecap="round" />
      <path d="M36.6 15.6c2.6-4.4 8.6-6 11.5-3.6 2.6 2.2 1.3 8-3.4 10.4-4 2-7.6.6-8.8-1.7-.9-1.7-.6-3.5.7-5.1z" fill="#5b9c4d" />
      <path d="M39 20.4c1.9-2.3 4.6-3.9 7-4.4" fill="none" stroke="#3f7a3c" strokeWidth="1.7" strokeLinecap="round" opacity=".7" />
    </>
  ),
  milk: (
    <>
      <path d="M17 26h30v25.6a5.4 5.4 0 0 1-5.4 5.4H22.4a5.4 5.4 0 0 1-5.4-5.4z" fill="#f4edda" />
      <path d="M17 26 32 11.5V26z" fill="#e6dcc2" />
      <path d="M47 26 32 11.5V26z" fill="#d8ccad" />
      <path d="M38 26h9v25.6a5.4 5.4 0 0 1-5.4 5.4H38z" fill="#0f2619" opacity=".07" />
      <path d="M17 34.5h30v12H17z" fill="#2f7a4f" />
      <path d="M32 36.6c2.5 2.7 3.8 4.8 3.8 6.3a3.8 3.8 0 0 1-7.6 0c0-1.5 1.3-3.6 3.8-6.3z" fill="#f4edda" />
    </>
  ),
  egg: (
    <>
      <ellipse cx="24" cy="32.5" rx="11.5" ry="14.5" fill="#dfcda3" />
      {/* The white stroke is the gap between the two shells, not an outline. */}
      <ellipse cx="38" cy="39" rx="12.5" ry="15.5" fill="#f9edd0" stroke="#fff" strokeWidth="2.8" />
      <path d="M34 32.5c-2.4 2.2-3.7 5.4-3.6 8.6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".85" />
    </>
  ),
  bread: (
    <>
      <path d="M32 19c11.6 0 21 6.9 21 15.4 0 8.4-9.4 15.6-21 15.6s-21-7.2-21-15.6C11 25.9 20.4 19 32 19z" fill="#d9954f" />
      <path d="M11 34.4C11 25.9 20.4 19 32 19s21 6.9 21 15.4c0 2-3.6-3.4-21-3.4s-21 5.4-21 3.4z" fill="#eab473" />
      <path d="M22.5 28.5c3.4 1.7 6.2 4.5 7.9 8" fill="none" stroke="#b9793a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M31.5 26.4c3.4 1.7 6.2 4.5 7.9 8" fill="none" stroke="#b9793a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M40.5 27.6c2.6 1.5 4.8 3.7 6.2 6.3" fill="none" stroke="#b9793a" strokeWidth="2.4" strokeLinecap="round" opacity=".75" />
    </>
  ),
  greens: (
    <>
      <path
        d="M32 15c7 5.2 9.8 12.5 7.2 19.5-1.8 4.7-4.9 7.4-7.2 7.4s-5.4-2.7-7.2-7.4C22.2 27.5 25 20.2 32 15z"
        fill="#69ad57"
        transform="translate(-9 4) rotate(-36 32 30)"
      />
      <path
        d="M32 15c7 5.2 9.8 12.5 7.2 19.5-1.8 4.7-4.9 7.4-7.2 7.4s-5.4-2.7-7.2-7.4C22.2 27.5 25 20.2 32 15z"
        fill="#8cc472"
        transform="translate(9 4) rotate(36 32 30)"
      />
      <path d="M32 12c8 6 11.2 14.3 8.2 22.3-2 5.4-5.6 8.5-8.2 8.5s-6.2-3.1-8.2-8.5C20.8 26.3 24 18 32 12z" fill="#3f7f42" />
      <path d="M32 42.8V19" fill="none" stroke="#2c5c30" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 28.5c-2.6-1.7-4.6-3.9-5.6-6M32 34.5c2.6-1.7 4.6-3.9 5.6-6" fill="none" stroke="#2c5c30" strokeWidth="1.9" strokeLinecap="round" opacity=".6" />
    </>
  ),
  carrot: (
    <>
      <path d="M32 57c-4.6-4.4-10-14.6-10-22.9 0-6 4.4-10.1 10-10.1s10 4.1 10 10.1C42 42.4 36.6 52.6 32 57z" fill="#e0782c" />
      <path d="M32 57c-1.4-1.3-3-3.6-4.5-6.4 3.2-9.4 5-17.6 5.4-24.7 5.2.3 9.1 4.3 9.1 10.2C42 42.4 36.6 52.6 32 57z" fill="#0f2619" opacity=".08" />
      <path d="M26.6 33.5c1.8 1 3.6 1.7 5.4 2.1M28.8 42.5c1.6.9 3.2 1.5 4.8 1.9" fill="none" stroke="#bd5c18" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 25.5c-1.4-4.6-5-7.6-9.4-8 .6 4.6 4 8 9.4 8z" fill="#4f9448" />
      <path d="M32 25.5c1.4-4.6 5-7.6 9.4-8-.6 4.6-4 8-9.4 8z" fill="#61ad55" />
      <path d="M32 25.5c-.6-4.8 1-9 4-11.5 1.8 4.4 1.2 8.8-4 11.5z" fill="#3f7f42" />
    </>
  ),
}

function FoodArt({ id }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {ART[id]}
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
  useFoodMotion(stageRef)

  const onFood = (id) => {
    setOpen((cur) => (cur === id ? null : id))
  }

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
        {FOODS.map((food) => (
          <div
            key={food.id}
            className="landing__food-wrap"
            style={{ left: `${food.x}%`, top: `${food.y}%` }}
            data-food={food.id}
            data-tone={toneFor(food.days)}
            data-hide-narrow={food.id === 'egg' || food.id === 'bread' ? '' : undefined}
          >
            <button
              type="button"
              className={`landing__food${open === food.id ? ' is-open' : ''}`}
              data-landing-food
              aria-expanded={open === food.id}
              aria-label={`${food.name}, ${food.days} days left. ${open === food.id ? 'Hide' : 'Show'} details.`}
              onClick={() => onFood(food.id)}
            >
              <FoodArt id={food.id} />
              <span className="landing__food-tip">
                {food.name}
                <strong>{food.days}d left</strong>
              </span>
            </button>
          </div>
        ))}

        <div className="landing__phone">
          <PhoneFrame variant="hero">
            <img className="landing__shot" src={homeShot} alt="Pantry home screen" draggable="false" />
          </PhoneFrame>
        </div>
      </div>
    </section>
  )
}
