import { lazy, Suspense } from 'react'
import Privacy from './site/pages/Privacy'
import Support from './site/pages/Support'
import Terms from './site/pages/Terms'
import Resources from './site/pages/Resources'
import Article from './site/pages/Article'
import Changelog from './site/pages/Changelog'
import NotFound from './site/pages/NotFound'
import { PATHS } from './site/launch'
import './styles/style.scss'
import './styles/site.scss'

const Home = lazy(() => import('./Home'))

const pages = {
  [PATHS.privacy]: Privacy,
  [PATHS.support]: Support,
  [PATHS.terms]: Terms,
  [PATHS.resources]: Resources,
  [PATHS.changelog]: Changelog,
}

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function App() {
  const path = currentPath()
  const Page = pages[path]

  if (Page) return <Page />

  if (path.startsWith(`${PATHS.resources}/`)) {
    const slug = path.slice(PATHS.resources.length + 1)
    if (slug && !slug.includes('/')) return <Article slug={slug} />
  }

  if (path !== PATHS.home) return <NotFound />

  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  )
}
