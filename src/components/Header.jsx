import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { APP_LIVE, APP_STORE_URL } from '../site/launch'
import NavMenu, { HOME_MENU_ITEMS } from '../site/components/NavMenu'

function jumpTo(lenis, target) {
  if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'instant' })
  else target.scrollIntoView({ behavior: 'instant', block: 'start' })
  ScrollTrigger.update()
}

export default function Header() {
  const lenis = useLenis()
  const veilEl = useRef(null)
  const fadeTl = useRef(null)

  // `position: fixed` is laid out against the layout viewport, and full-screen
  // sections are sized in `lvh` — the viewport with every bar hidden — so that
  // nothing re-lays-out while the URL bar slides. Both of those frames are
  // taller than what is actually visible whenever mobile chrome is showing. So
  // publish how much the chrome covers at each edge, and anything that has to
  // stay inside the live viewport (the header pill, the scene's scroll hint and
  // ticker) offsets by it. MDN's VisualViewport example does the same with `top`.
  useEffect(() => {
    const root = document.documentElement
    const vv = window.visualViewport

    const sync = () => {
      const top = vv?.offsetTop ?? 0
      // `clientHeight` is the layout viewport, which is the box `lvh` resolves
      // against; the visible strip inside it starts at `offsetTop`.
      const layout = root.clientHeight
      const visible = vv?.height ?? layout
      root.style.setProperty('--vv-top', `${top}px`)
      root.style.setProperty('--vv-bottom', `${Math.max(0, layout - top - visible)}px`)
    }

    sync()
    vv?.addEventListener('resize', sync)
    vv?.addEventListener('scroll', sync)
    window.addEventListener('resize', sync)

    return () => {
      vv?.removeEventListener('resize', sync)
      vv?.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      root.style.removeProperty('--vv-top')
      root.style.removeProperty('--vv-bottom')
      fadeTl.current?.kill()
    }
  }, [])

  const fadeTo = (href) => {
    const target = href === '#top' ? 0 : document.querySelector(href)
    const veil = veilEl.current
    if (target == null) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || !veil) {
      jumpTo(lenis, target)
      return
    }

    fadeTl.current?.kill()
    fadeTl.current = gsap
      .timeline()
      .set(veil, { pointerEvents: 'auto' })
      .to(veil, { autoAlpha: 1, duration: 0.32, ease: 'power2.in' })
      .add(() => jumpTo(lenis, target))
      .to(veil, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' })
      .set(veil, { pointerEvents: 'none' })
  }

  return (
    <>
      <div className="nav-veil" ref={veilEl} aria-hidden="true" />
      <header className="header">
        <nav className="nav" aria-label="Primary">
          <div className="nav__start">
            <NavMenu items={HOME_MENU_ITEMS} onHashNavigate={fadeTo} />
          </div>

          <a
            href="#top"
            className="nav__brand"
            aria-label="Pantry"
            data-nav-item
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              fadeTo('#top')
            }}
          >
            <span className="nav__logo" aria-hidden="true" />
          </a>

          {APP_LIVE ? (
            <a
              href={APP_STORE_URL}
              className="nav__cta"
              data-nav-cta
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nav__cta-label">
                Get the app
                <ArrowRight size={15} strokeWidth={2.5} />
              </span>
            </a>
          ) : (
            <a
              href="#waitlist"
              className="nav__cta"
              data-nav-cta
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                fadeTo('#waitlist')
              }}
            >
              <span className="nav__cta-label">
                Start saving
                <ArrowRight size={15} strokeWidth={2.5} />
              </span>
            </a>
          )}
        </nav>
      </header>
    </>
  )
}
