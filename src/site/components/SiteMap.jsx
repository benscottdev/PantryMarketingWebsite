import { articles } from '../content'
import { APP_LIVE, APP_STORE_URL, PATHS, SUPPORT_EMAIL, articlePath } from '../launch'

function homeHref(hash, home) {
  return home ? hash : `${PATHS.home}${hash}`
}

function ColLink({ href, children, external }) {
  return (
    <a
      href={href}
      className="footer__link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

function Col({ title, links }) {
  return (
    <nav className="footer__col" aria-label={title}>
      <h3 className="footer__col-title">{title}</h3>
      {links.map((item) => (
        <ColLink key={item.label} href={item.href} external={item.external}>
          {item.label}
        </ColLink>
      ))}
    </nav>
  )
}

export function SiteMap({ home = false, onBrandClick }) {
  const product = [
    { label: 'How it works', href: homeHref('#how', home) },
    { label: 'Features', href: homeHref('#features', home) },
    { label: 'Changelog', href: PATHS.changelog },
    APP_LIVE
      ? { label: 'Get the app', href: APP_STORE_URL, external: true }
      : { label: 'Join waitlist', href: homeHref('#waitlist', home) },
  ]

  const house = [
    { label: 'Shared household', href: homeHref('#household', home) },
    { label: 'Meal generation', href: homeHref('#meals', home) },
    { label: 'Waste calculator', href: PATHS.calculator },
    { label: 'FAQ', href: homeHref('#faq', home) },
  ]

  const company = [
    { label: 'Home', href: PATHS.home },
    { label: 'Resources', href: PATHS.resources },
    { label: 'Support', href: PATHS.support },
    { label: 'Email us', href: `mailto:${SUPPORT_EMAIL}` },
  ]

  return (
    <div className="footer__map">
      <div className="footer__brand-block">
        <a
          href={home ? '#top' : PATHS.home}
          className="footer__brand"
          aria-label="Pantry"
          onClick={onBrandClick}
        >
          <span className="footer__wordmark" aria-hidden="true" />
        </a>
        <p className="footer__tagline">
          The household fridge, on every phone, before groceries turn into waste.
        </p>
      </div>

      <Col title="Product" links={product} />
      <Col title="The house" links={house} />
      <Col title="Company" links={company} />

      {/* <nav className="footer__col footer__col--wide" aria-label="Notes">
        <h3 className="footer__col-title">
          Notes
          <a href={PATHS.resources} className="footer__all">
            All notes →
          </a>
        </h3>
        {articles.map((post) => (
          <ColLink key={post.id} href={articlePath(post.id)}>
            {post.title}
          </ColLink>
        ))}
      </nav> */}
    </div>
  )
}

export function FooterLegal({ onTop }) {
  return (
    <div className="footer__legal">
      <p className="footer__copy">
        © {new Date().getFullYear()} Pantry
        <span aria-hidden="true"> · </span>
        <a href={PATHS.privacy}>Privacy</a>
        <span aria-hidden="true"> · </span>
        <a href={PATHS.terms}>Terms</a>
      </p>

      {onTop ? (
        <button type="button" className="footer__top" onClick={onTop}>
          Back to top
        </button>
      ) : null}

      <p className="footer__locale">Made in Sydney, Australia</p>
    </div>
  )
}
