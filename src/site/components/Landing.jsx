import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import WaitlistForm from './WaitlistForm'
import PhoneFrame from './PhoneFrame'
import homeShot from '../../static/home.png'

const FOODS = [
  { id: 'apple', name: 'Apple', days: 5, x: 9, y: 22 },
  { id: 'milk', name: 'Milk', days: 6, x: 18, y: 58 },
  { id: 'egg', name: 'Eggs', days: 12, x: 28, y: 8 },
  { id: 'bread', name: 'Sourdough', days: 4, x: 74, y: 10 },
  { id: 'greens', name: 'Spinach', days: 3, x: 84, y: 48 },
  { id: 'carrot', name: 'Carrot', days: 14, x: 91, y: 18 },
]

function FoodArt({ id }) {
  if (id === 'apple') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="38" rx="18" ry="20" fill="#e25a4a" />
        <ellipse cx="26" cy="32" rx="6" ry="9" fill="#f08a78" opacity="0.45" />
        <path d="M32 18c1 7 7 11 12 10" fill="none" stroke="#3f6f38" strokeWidth="2.6" strokeLinecap="round" />
        <ellipse cx="40" cy="17" rx="8" ry="3.4" fill="#6db36a" transform="rotate(-28 40 17)" />
      </svg>
    )
  }
  if (id === 'milk') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M24 16h16l4 8v28a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6V24z" fill="#f7f4ea" stroke="#c9c3b2" strokeWidth="1.5" />
        <path d="M24 16h16l-2 6H26z" fill="#d9d3c4" />
        <rect x="22" y="28" width="20" height="12" rx="2" fill="#8ec8e8" />
        <circle cx="32" cy="34" r="3.2" fill="#fff" />
      </svg>
    )
  }
  if (id === 'egg') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="34" rx="16" ry="20" fill="#f6efd4" stroke="#e2d4a8" strokeWidth="1.4" />
        <ellipse cx="32" cy="38" rx="8" ry="8" fill="#f0c84a" />
        <ellipse cx="28" cy="28" rx="5" ry="7" fill="#fff" opacity="0.55" />
      </svg>
    )
  }
  if (id === 'bread') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="30" rx="22" ry="14" fill="#e2b06a" />
        <path d="M12 30c2 14 12 20 20 20s18-6 20-20" fill="#d4924a" />
        <path d="M22 24c2-2 4-1 5 1M32 22c2-2 4-1 5 1M42 24c2-2 3 0 4 2" fill="none" stroke="#c47d38" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'greens') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="24" cy="34" rx="14" ry="18" fill="#5ea35a" transform="rotate(-18 24 34)" />
        <ellipse cx="40" cy="32" rx="13" ry="17" fill="#7ec07a" transform="rotate(16 40 32)" />
        <ellipse cx="32" cy="38" rx="10" ry="14" fill="#3f7a3c" />
        <path d="M32 50V22" stroke="#2f5c2d" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M40 12c-2 10-8 16-16 18 8 1 16 8 18 22" fill="none" stroke="#2f7a38" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 48c10-2 18-10 22-22 2 14-4 26-16 30-8 2-12-2-6-8z" fill="#e67a32" />
      <path d="M28 44c4-1 8-5 10-10" fill="none" stroke="#f4c28a" strokeWidth="2" strokeLinecap="round" />
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
          Stop wasting the food <em>you already bought.</em>
        </h1>
        <WaitlistForm variant="hero" />
      </div>

      <div className="landing__stage" ref={stageRef}>
        {FOODS.map((food) => (
          <div
            key={food.id}
            className="landing__food-wrap"
            style={{ left: `${food.x}%`, top: `${food.y}%` }}
            data-food={food.id}
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
