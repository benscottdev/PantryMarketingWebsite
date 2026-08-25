import { Plus } from 'lucide-react'
import Legal from '../Legal'
import { PATHS } from '../launch'
import { changelog, coming } from '../content'

function ReleaseList({ entries }) {
  return (
    <div className="changelog-path">
      {entries.map((entry, i) => (
        <details
          key={`${entry.version}-${entry.date}`}
          className="changelog-card"
          style={{ '--card-accent': entry.color }}
          open={i === 0}
        >
          <summary className="changelog-card__summary">
            <span className="changelog-card__version">{entry.version}</span>
            <time dateTime={entry.date}>{entry.date}</time>
            <span className="changelog-card__toggle" aria-hidden="true">
              <Plus size={16} strokeWidth={2.5} />
            </span>
          </summary>
          <div className="changelog-card__body">
            <h3 className="changelog-card__title">{entry.title}</h3>
            <ul className="changelog-card__changes">
              {entry.changes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  )
}

export default function Changelog() {
  const shipped = changelog.length > 0

  return (
    <Legal
      wide
      title="Every version."
      heading={
        <>
          Every <em>version.</em>
        </>
      }
      eyebrow="THE APP"
      updated={false}
      lede="What each release of the Pantry app put on your phone. Newest first."
      description="Release notes for the Pantry iOS app, and what is coming next."
    >
      {shipped ? (
        <ReleaseList entries={changelog} />
      ) : (
        <p className="changelog-empty">
          Nothing yet. Pantry has not reached the App Store, so there is no
          honest release history to show you. Version 1.0 will be the first
          entry on this page, and everything below it is what we are building
          towards.
        </p>
      )}

      <section className="changelog-block" aria-labelledby="coming-heading">
        <h2 className="changelog-block__title" id="coming-heading">
          What&rsquo;s <em>coming.</em>
        </h2>
        <p className="changelog-block__lede">
          Soonest first. These are windows we are aiming at, not dates we are promising.
        </p>
        <ReleaseList entries={coming} />
      </section>

      <p className="resource-footer-note">
        Questions about a release? See <a href={PATHS.support}>Support</a>. Longer
        write-ups live on <a href={PATHS.resources}>Resources</a>.
      </p>
    </Legal>
  )
}
