import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Legal from '../Legal'
import { PATHS } from '../launch'
import { changelog } from '../content'

function ChangelogWires({ entries }) {
  const svgRef = useRef(null)

  useLayoutEffect(() => {
    const svg = svgRef.current
    const stage = svg?.closest('[data-changelog-stage]')
    if (!svg || !stage) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clampX = gsap.utils.clamp(-22, 22)
    const clampY = gsap.utils.clamp(-16, 16)

    const nodes = [...stage.querySelectorAll('[data-change-card]')].map((card, i) => ({
      face: card.querySelector('[data-change-face]'),
      float: card.querySelector('[data-change-float]'),
      side: card.dataset.changeSide,
      x: 0,
      y: 0,
      phase: i * 1.7 + 0.4,
      amp: 5 + (i % 3) * 1.6,
    }))

    const segs = [...stage.querySelectorAll('[data-change-seg]')].map((el) => ({
      track: el.querySelector('[data-change-track]'),
      line: el.querySelector('[data-change-line]'),
      from: el.querySelector('[data-change-from]'),
      to: el.querySelector('[data-change-to]'),
    }))

    let raf = 0
    let last = performance.now()
    let inView = true
    let lastSw = 0
    let lastSh = 0

    const dock = (node, sr, t) => {
      const r = node.face.getBoundingClientRect()
      const into = 36
      return {
        x: (node.side === 'start' ? r.right - into : r.left + into) - sr.left,
        y: r.top + r.height * t - sr.top,
      }
    }

    const draw = () => {
      if (nodes.length !== entries.length) return
      const sr = stage.getBoundingClientRect()
      if (sr.width !== lastSw || sr.height !== lastSh) {
        lastSw = sr.width
        lastSh = sr.height
        svg.setAttribute('width', String(sr.width))
        svg.setAttribute('height', String(sr.height))
        svg.setAttribute('viewBox', `0 0 ${sr.width} ${sr.height}`)
      }

      for (let i = 0; i < segs.length; i += 1) {
        const a = dock(nodes[i], sr, 0.72)
        const b = dock(nodes[i + 1], sr, 0.28)
        const midY = a.y + (b.y - a.y) * 0.52
        const d = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} C ${a.x.toFixed(1)} ${midY.toFixed(1)}, ${b.x.toFixed(1)} ${midY.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
        segs[i].track?.setAttribute('d', d)
        segs[i].line?.setAttribute('d', d)
        segs[i].from?.setAttribute('cx', String(a.x))
        segs[i].from?.setAttribute('cy', String(a.y))
        segs[i].to?.setAttribute('cx', String(b.x))
        segs[i].to?.setAttribute('cy', String(b.y))
      }
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
        for (const n of nodes) {
          n.x += (Math.sin(now * 0.0008 + n.phase) * n.amp - n.x) * 0.06 * dt
          n.y += (Math.cos(now * 0.001 + n.phase * 1.2) * (n.amp * 0.7) - n.y) * 0.06 * dt
          gsap.set(n.float, { x: clampX(n.x), y: clampY(n.y), force3D: true })
        }
      }

      draw()
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

    return () => {
      ro.disconnect()
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [entries])

  return (
    <svg ref={svgRef} className="changelog-path__links" aria-hidden="true">
      {entries.slice(0, -1).map((entry, i) => (
        <g key={entry.version} data-change-seg>
          <path className="changelog-path__track" data-change-track />
          <path className="changelog-path__line" data-change-line stroke={entry.color} />
          <circle className="changelog-path__dot" data-change-from r="3.5" fill={entry.color} />
          <circle className="changelog-path__dot" data-change-to r="3.5" fill={entries[i + 1].color} />
        </g>
      ))}
    </svg>
  )
}

export default function Changelog() {
  return (
    <Legal
      wide
      title="What shipped."
      heading={
        <>
          What <em>shipped.</em>
        </>
      }
      eyebrow="VERSIONS"
      updated={false}
      lede="Newest first. Each release sits opposite the last, wired as one path down the page."
      description="What changed in Pantry — app and website version notes, newest first."
    >
      <div className="changelog-path" data-changelog-stage>
        <ChangelogWires entries={changelog} />

        {changelog.map((entry, i) => {
          const side = i % 2 === 0 ? 'start' : 'end'
          const inset = i % 4 >= 2
          return (
            <article
              key={entry.version}
              className={`changelog-card changelog-card--${side}${inset ? ' changelog-card--inset' : ''}`}
              data-change-card
              data-change-side={side}
              style={{
                '--card-rot': `${entry.rotate}deg`,
                '--card-accent': entry.color,
              }}
            >
              <div className="changelog-card__float" data-change-float>
                <div className="changelog-card__face" data-change-face>
                  <div className="changelog-card__head">
                    <span className="changelog-card__version">{entry.version}</span>
                    <time dateTime={entry.date}>{entry.date}</time>
                  </div>
                  <h2 className="changelog-card__title">{entry.title}</h2>
                  <ul className="changelog-card__changes">
                    {entry.changes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <p className="resource-footer-note">
        Questions about a release? See <a href={PATHS.support}>Support</a>. Longer
        write-ups live on <a href={PATHS.resources}>Resources</a>.
      </p>
    </Legal>
  )
}
