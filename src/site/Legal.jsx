import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLenis } from 'lenis/react'
import SmoothScroll from '../components/SmoothScroll'
import NavMenu, { PAGE_MENU_ITEMS } from './components/NavMenu'
import Breadcrumbs from './components/Breadcrumbs'
import { FooterLegal, SiteMap } from './components/SiteMap'
import { APP_LIVE, APP_STORE_URL, LEGAL_UPDATED, PATHS } from './launch'

function LegalHeader() {
  return (
    <header className="header">
      <nav className="nav" aria-label="Primary">
        <div className="nav__start">
          <NavMenu items={PAGE_MENU_ITEMS} />
        </div>

        <a href={PATHS.home} className="nav__brand" aria-label="Pantry" data-nav-item>
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
          <a href="/#waitlist" className="nav__cta" data-nav-cta>
            <span className="nav__cta-label">
              Start saving
              <ArrowRight size={15} strokeWidth={2.5} />
            </span>
          </a>
        )}
      </nav>
    </header>
  )
}

function LegalFooter() {
  const lenis = useLenis()
  const toTop = (e) => {
    e.preventDefault()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer footer--legal">
      <div className="footer__inner">
        <SiteMap />
        <FooterLegal onTop={toTop} />
      </div>
    </footer>
  )
}

export function Section({ title, children }) {
  return (
    <section className="legal__section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default function Legal({
  title,
  heading,
  description,
  eyebrow,
  lede,
  updated = true,
  wide = false,
  children,
}) {
  useEffect(() => {
    const prev = document.title
    document.title = `${title} | Pantry`
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content')
    if (meta && description) meta.setAttribute('content', description)
    window.scrollTo(0, 0)
    return () => {
      document.title = prev
      if (meta && prevDesc != null) meta.setAttribute('content', prevDesc)
    }
  }, [title, description])

  return (
    <SmoothScroll>
      <div className={`legal${wide ? ' legal--wide' : ''}`}>
        <LegalHeader />
        <article className="legal__doc">
          <header className="legal__head">
            <Breadcrumbs />
            {eyebrow ? <div className="legal__eyebrow eyebrow">{eyebrow}</div> : null}
            <h1 className="legal__title">{heading ?? title}</h1>
            {lede ? <p className="legal__lede">{lede}</p> : null}
            {updated ? <p className="legal__updated">Last updated {LEGAL_UPDATED}</p> : null}
          </header>
          <div className="legal__body">{children}</div>
        </article>
        <LegalFooter />
      </div>
    </SmoothScroll>
  )
}
