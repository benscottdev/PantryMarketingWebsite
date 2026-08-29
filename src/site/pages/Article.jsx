import { useEffect, useState } from 'react'
import Legal from '../Legal'
import { PATHS, articlePath } from '../launch'
import { getArticle, readingMins, articles } from '../content'
import { PRERENDER_BODY, PRERENDER_SLUG } from '../prerendered'

// Lazy on purpose: production always has the body inlined by
// scripts/prerender.mjs (see prerendered.js), so this glob only matters in
// `vite dev` and as a defensive fallback if the prerendered snapshot is ever
// missing for some reason.
const bodyModules = import.meta.glob('/content/posts/*.md')

function formatDisplayDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function useArticleHtml(slug) {
  const [html, setHtml] = useState(() => (PRERENDER_SLUG === slug ? PRERENDER_BODY : null))

  useEffect(() => {
    if (PRERENDER_SLUG === slug) return
    let cancelled = false
    const loader = bodyModules[`/content/posts/${slug}.md`]
    if (!loader) return undefined
    loader().then((mod) => {
      if (!cancelled) setHtml(mod.default)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  return html
}

export default function Article({ slug }) {
  const post = getArticle(slug)
  const html = useArticleHtml(slug)

  if (!post) {
    return (
      <Legal
        title="Article not found"
        eyebrow="Blog"
        updated={false}
        description="That article is not on the Pantry site."
      >
        <p>
          That piece isn’t here. Back to <a href={PATHS.resources}>Resources</a>.
        </p>
      </Legal>
    )
  }

  const mins = readingMins(post)
  const others = articles.filter((a) => a.id !== post.id).slice(0, 3)

  return (
    <Legal
      wide
      title={post.title}
      eyebrow={post.tag}
      updated={false}
      description={post.excerpt}
    >
      <p className="article-meta">
        <time dateTime={post.publishDate}>{formatDisplayDate(post.publishDate)}</time>
        <span aria-hidden="true"> · </span>
        {mins} min{mins === 1 ? '' : 's'} read
      </p>

      {html ? <div className="prose" dangerouslySetInnerHTML={{ __html: html }} /> : null}

      {others.length ? (
        <div className="article-more">
          <h2>More from the fridge</h2>
          <div className="article-more__list">
            {others.map((item) => (
              <a key={item.id} href={articlePath(item.id)} className="article-more__link">
                <span className="article-more__tag">{item.tag}</span>
                {item.title}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </Legal>
  )
}
