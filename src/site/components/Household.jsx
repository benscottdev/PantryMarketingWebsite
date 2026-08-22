import { useLayoutEffect, useRef } from 'react'
import { Bell, ShoppingBasket, Users } from 'lucide-react'
import gsap from 'gsap'

const members = [
  {
    name: 'Dylan',
    role: 'Admin',
    emoji: '🥑',
    bg: '#184534',
    fg: '#b9ffa4',
    avatar: '#b9ffa4',
    activity: "Scanned tonight's Woolies run",
  },
  {
    name: 'Lily',
    role: 'Member',
    emoji: '🍓',
    bg: '#5c2430',
    fg: '#ffd6de',
    avatar: '#ffb3c1',
    activity: 'Marked the milk as opened',
  },
  {
    name: 'Grace',
    role: 'Member',
    emoji: '🥛',
    bg: '#163a52',
    fg: '#d5eef9',
    avatar: '#8ec8e8',
    activity: 'Used the baby spinach',
  },

]

const points = [
  {
    icon: Users,
    title: 'One shared pantry',
    desc: "Everyone sees the same list. No more guessing what's in the fridge from the other side of the house.",
  },
  {
    icon: Bell,
    title: 'Nudges on every phone',
    desc: "The morning digest lands for the whole household, so the thing that's turning actually gets cooked.",
  },
  {
    icon: ShoppingBasket,
    title: 'Stop buying it twice',
    desc: 'If someone already grabbed milk, the rest of the house can see it — before it happens again on the way home.',
  },
]

function HouseholdLinks({ members }) {
  const svgRef = useRef(null)

  useLayoutEffect(() => {
    const svg = svgRef.current
    const stage = svg?.closest('[data-household-stage]')
    if (!svg || !stage) return

    const landings = [0.26, 0.5, 0.74]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const clampX = gsap.utils.clamp(-52, 52)
    const clampY = gsap.utils.clamp(-40, 40)

    const floaters = [...stage.querySelectorAll('[data-household-float]')].map((el, i) => ({
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      phase: i * 1.85 + 0.35,
      amp: 8 + i * 2.2,
    }))

    const badge = stage.querySelector('[data-household-badge]')
    const cards = floaters.map((f) => f.el)
    const links = members.map((m) => ({
      track: stage.querySelector(`[data-link-track="${m.name}"]`),
      line: stage.querySelector(`[data-link-line="${m.name}"]`),
      dot: stage.querySelector(`[data-link-dot="${m.name}"]`),
    }))

    const mouse = { x: 0, y: 0, on: false }
    let raf = 0
    let last = performance.now()
    let inView = true
    let lastSw = 0
    let lastSh = 0

    const draw = () => {
      if (!badge || cards.length !== members.length) return

      const sr = stage.getBoundingClientRect()
      const br = badge.getBoundingClientRect()
      if (sr.width !== lastSw || sr.height !== lastSh) {
        lastSw = sr.width
        lastSh = sr.height
        svg.setAttribute('width', String(sr.width))
        svg.setAttribute('height', String(sr.height))
        svg.setAttribute('viewBox', `0 0 ${sr.width} ${sr.height}`)
      }

      cards.forEach((card, i) => {
        const cr = card.getBoundingClientRect()
        const x1 = cr.left + cr.width / 2 - sr.left
        const y1 = cr.bottom - sr.top - 4
        const x2 = br.left + br.width * landings[i] - sr.left
        const y2 = br.top - sr.top + 1
        const midY = y1 + (y2 - y1) * 0.58
        const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${x1.toFixed(1)} ${midY.toFixed(1)}, ${x2.toFixed(1)} ${midY.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`
        links[i].track?.setAttribute('d', d)
        links[i].line?.setAttribute('d', d)
        links[i].dot?.setAttribute('cx', String(x2))
        links[i].dot?.setAttribute('cy', String(y2))
      })
    }

    const tick = (now) => {
      if (!inView) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(tick)
      const dt = Math.min(2, (now - last) / 16.67)
      last = now

      if (!reduce) {
        for (const b of floaters) {
          const restX = Math.sin(now * 0.00085 + b.phase) * b.amp
          const restY = Math.cos(now * 0.00105 + b.phase * 1.25) * (b.amp * 0.72)
          if (mouse.on) {
            const r = b.el.getBoundingClientRect()
            const dx = r.left + r.width / 2 - mouse.x
            const dy = r.top + r.height / 2 - mouse.y
            const dist = Math.hypot(dx, dy) || 0.001
            const radius = 160
            if (dist < radius) {
              const force = (1 - dist / radius) ** 2 * 24 * dt
              b.vx += (dx / dist) * force
              b.vy += (dy / dist) * force
            }
          }
          b.vx += (restX - b.x) * 0.055 * dt
          b.vy += (restY - b.y) * 0.055 * dt
          b.vx *= 0.84 ** dt
          b.vy *= 0.84 ** dt
          b.x = clampX(b.x + b.vx * dt)
          b.y = clampY(b.y + b.vy * dt)
          gsap.set(b.el, { x: b.x, y: b.y, force3D: true })
        }
      }

      draw()
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
    const ro = new ResizeObserver(draw)
    ro.observe(stage)
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    })
    io.observe(stage)
    if (finePointer) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
    }

    return () => {
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [members])

  return (
    <svg ref={svgRef} className="household__links" data-household-links aria-hidden="true">
      {members.map((member) => (
        <g key={member.name}>
          <path className="household__links-track" data-link-track={member.name} />
          <path className="household__links-line" data-link-line={member.name} stroke={member.avatar} />
          <circle className="household__links-dot" data-link-dot={member.name} r="3.5" fill={member.avatar} />
        </g>
      ))}
    </svg>
  )
}

export default function Household() {
  return (
    <section id="household" className="household" data-household>
      <div className="household__inner">
        <div className="household__copy">
          <div className="household__eyebrow eyebrow">HOUSEHOLD</div>
          <h2 className="household__title">
            One pantry. <em>The whole house.</em>
          </h2>
          <p className="household__lede">
            Invite the people you actually live with. One fridge, one list, and
            the same quiet nudge on every phone — so dinner isn't a group chat
            about leftover mince.
          </p>

          <ul className="household__points">
            {points.map(({ icon: Icon, title, desc }) => (
              <li className="household__point" key={title} data-household-point>
                <span className="household__point-icon" aria-hidden="true">
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

        <div className="household__stage" data-household-stage>
          <HouseholdLinks members={members} />
          <div className="household__cluster">
            {members.map((member) => (
              <article className="household__card" data-household-card key={member.name}>
                <div className="household__floater" data-household-float>
                  <div
                    className="household__face"
                    style={{
                      '--card-bg': member.bg,
                      '--card-fg': member.fg,
                      '--avatar-bg': member.avatar,
                    }}
                  >
                    <div className="household__who">
                      <span className="household__avatar" aria-hidden="true">
                        {member.emoji}
                      </span>
                      <div>
                        <span className="household__name">{member.name}</span>
                        <span className="household__role">{member.role}</span>
                      </div>
                    </div>
                    <p className="household__activity">{member.activity}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="household__badge" data-household-badge>
            Our Humble Abode · 3 people
            <span>Pro</span>
          </div>
        </div>
      </div>
    </section>
  )
}
