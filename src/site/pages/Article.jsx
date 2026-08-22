import Legal from '../Legal'
import { PATHS, articlePath } from '../launch'
import { getArticle, readingMins, articles } from '../content'

export default function Article({ slug }) {
  const post = getArticle(slug)

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
        <time dateTime={post.date}>{post.date}</time>
        <span aria-hidden="true"> · </span>
        {mins} min{mins === 1 ? '' : 's'} read
      </p>

      <figure className="article-hero">
        <img src={post.image} alt={post.imageAlt || ''} />
      </figure>

      {post.body.map((para) => (
        <p key={para.slice(0, 56)}>{para}</p>
      ))}

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
