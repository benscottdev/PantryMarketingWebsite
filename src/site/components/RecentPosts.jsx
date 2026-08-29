import { ArrowRight } from 'lucide-react'
import { PATHS, articlePath } from '../launch'
import { articles, readingMins } from '../content'

const MAX_CARDS = 6

// `articles` (from content.js) is already published-only and sorted newest
// first, so the first few are exactly "recent posts" with no extra filtering.
export default function RecentPosts() {
  const posts = articles.slice(0, MAX_CARDS)
  if (!posts.length) return null

  return (
    <section id="notes" className="recent-posts" data-recent-posts aria-labelledby="recent-posts-title">
      <div className="recent-posts__inner">
        <header className="recent-posts__head">
          <div>
            <div className="recent-posts__eyebrow eyebrow">RESOURCES</div>
            <h2 className="recent-posts__title" id="recent-posts-title">
              Notes from the <em>fridge.</em>
            </h2>
          </div>
          <a href={PATHS.resources} className="recent-posts__all">
            <span>See all</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </header>

        <div className="recent-posts__track" data-recent-posts-track>
          {posts.map((post) => {
            const mins = readingMins(post)
            return (
              <a key={post.id} href={articlePath(post.id)} className="recent-posts__card blog-card">
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
      </div>
    </section>
  )
}
