import { PATHS } from '../launch'
import { getArticle } from '../content'

const PAGE_LABELS = {
  [PATHS.privacy]: 'Privacy Policy',
  [PATHS.support]: 'Support',
  [PATHS.terms]: 'Terms of Service',
  [PATHS.resources]: 'Resources',
  [PATHS.changelog]: 'Changelog',
}

const HOME = { label: 'Home', href: PATHS.home }

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export function crumbsForPath(path = currentPath()) {
  if (PAGE_LABELS[path]) {
    return [HOME, { label: PAGE_LABELS[path], href: path }]
  }

  if (path.startsWith(`${PATHS.resources}/`)) {
    const slug = path.slice(PATHS.resources.length + 1)
    const post = slug.includes('/') ? null : getArticle(slug)
    return [
      HOME,
      { label: 'Resources', href: PATHS.resources },
      {
        label: post?.title ?? 'Article not found',
        href: post ? path : undefined,
      },
    ]
  }

  return [HOME, { label: 'Page not found' }]
}

function absoluteUrl(href) {
  if (!href) return undefined
  try {
    return new URL(href, window.location.origin).href
  } catch {
    return undefined
  }
}

function BreadcrumbSchema({ crumbs }) {
  const items = crumbs
    .map((crumb, i) => {
      const item = absoluteUrl(crumb.href)
      if (!item) return null
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.label,
        item,
      }
    })
    .filter(Boolean)

  if (items.length < 2) return null

  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }).replace(/</g, '\\u003c')

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export default function Breadcrumbs({ crumbs }) {
  const trail = crumbs?.length ? crumbs : crumbsForPath()

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol className="crumbs__list">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1
            return (
              <li key={`${crumb.href ?? crumb.label}-${i}`} className="crumbs__item">
                {i > 0 ? (
                  <span className="crumbs__sep" aria-hidden="true">
                    &gt;
                  </span>
                ) : null}
                {last || !crumb.href ? (
                  <span className="crumbs__current" aria-current={last ? 'page' : undefined}>
                    {crumb.label}
                  </span>
                ) : (
                  <a className="crumbs__link" href={crumb.href}>
                    {crumb.label}
                  </a>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <BreadcrumbSchema crumbs={trail} />
    </>
  )
}
