import Legal from '../Legal'
import { articlePath } from '../launch'
import { articles, readingMins } from '../content'

export default function Resources() {
  return (
    <Legal
      wide
      title="Notes from the fridge."
      heading={
        <>
          Notes from the <em>fridge.</em>
        </>
      }
      eyebrow="RESOURCES"
      updated={false}
      lede="Short reads on food waste, household pantries, and how Pantry works. Add a post to the articles array — it lands here and gets its own page."
      description="Notes on food waste, household pantries, and how Pantry works — from receipt scan to dinner."
    >
      <div className="blog-grid">
        {articles.map((post) => {
          const mins = readingMins(post)
          return (
            <a key={post.id} href={articlePath(post.id)} className="blog-card">
              <span className="blog-card__media">
                <img src={post.image} alt="" />
              </span>
              <span className="blog-card__body">
                <span className="blog-card__meta">
                  <span className="blog-card__tag">{post.tag}</span>
                  <span>
                    {mins} min{mins === 1 ? '' : 's'} read
                  </span>
                </span>
                <span className="blog-card__title">{post.title}</span>
              </span>
            </a>
          )
        })}
      </div>
    </Legal>
  )
}
