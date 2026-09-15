import Legal from '../Legal'
import { articlePath } from '../launch'
import { articles, formatDisplayDate, pickFeatured, readingMins } from '../content'

function minsLabel(post) {
  const mins = readingMins(post)
  return `${mins} min${mins === 1 ? '' : 's'} read`
}

export default function Resources() {
  const featured = pickFeatured()
  const rest = articles.filter((post) => post.id !== featured?.id)
  return (
    <Legal
      wide
      title="Food storage, shelf life and how the app works"
      heading={
        <>
          Notes from the <em>fridge.</em>
        </>
      }
      eyebrow="RESOURCES"
      updated={false}
      lede="Short reads on food waste, shared pantries, and how Pantry actually works. Every number we quote comes with the place it came from."
      description="How long food lasts in the fridge, what to cook before it turns, and how Pantry works, from receipt scan to dinner. Every number sourced."
    >
      {featured ? (
        <a href={articlePath(featured.id)} className="blog-featured">
          <span className="blog-featured__media">
            <img src={featured.image} alt="" />
          </span>
          <span className="blog-featured__body">
            <span className="blog-featured__meta">
              <span className="blog-featured__flag">Start here</span>
              <span className="blog-card__tag">{featured.tag}</span>
              <span>
                <time dateTime={featured.publishDate}>{formatDisplayDate(featured.publishDate)}</time>
                <span aria-hidden="true"> · </span>
                {minsLabel(featured)}
              </span>
            </span>
            <span className="blog-featured__title">{featured.title}</span>
            <span className="blog-featured__excerpt">{featured.excerpt}</span>
            <span className="blog-featured__author">
              <img className="blog-featured__avatar" src="/icon.png" alt="" />
              <span className="blog-featured__author-name">Ben Scott</span>
              <span className="blog-featured__author-role">Founder</span>
            </span>
          </span>
        </a>
      ) : null}
      <div className="blog-grid">
        {rest.map((post) => (
          <a key={post.id} href={articlePath(post.id)} className="blog-card">
            <span className="blog-card__media">
              <img src={post.image} alt="" />
            </span>
            <span className="blog-card__body">
              <span className="blog-card__meta">
                <span className="blog-card__tag">{post.tag}</span>
                <span>{minsLabel(post)}</span>
              </span>
              <span className="blog-card__title">{post.title}</span>
            </span>
          </a>
        ))}
      </div>
    </Legal>
  )
}
