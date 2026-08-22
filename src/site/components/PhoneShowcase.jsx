import PhoneFrame from './PhoneFrame'

// Pinned two-column scene: an accordion of numbered steps down the left, a
// phone on the right whose screen changes with the active step. Every step's
// screen is a card in a stack inside the screen hole, and the scroll timeline
// slides the next one up over the one before it — see `buildShowcase` in
// Site.jsx, which drives this off the `data-showcase-*` hooks below.
//
// `steps[].screen` is whatever should fill the phone for that step. Pass a
// `<ScreenShot>` once real app captures exist; until then the hand-built
// screens in this folder stand in for them.
export default function PhoneShowcase({
  id,
  // Keys this section's timeline, e.g. `data-showcase="how"`.
  scene,
  // `dark` on ink, `light` on cream — sets the palette the timeline tweens
  // between via the `--pill-*` / `--num-*` custom properties in site.scss.
  theme = 'dark',
  eyebrow,
  title,
  steps,
  variant = 'scan',
  // Anything that sits over the whole card stack rather than inside one card,
  // e.g. a status bar that should stay put as the screens change.
  overlay,
}) {
  return (
    <section id={id} className={`showcase showcase--${theme}`} data-showcase={scene}>
      <div className="showcase__grid">
        <div className="showcase__copy">
          <div className="showcase__eyebrow eyebrow">{eyebrow}</div>
          <h2 className="showcase__title">{title}</h2>

          <ol className="showcase__steps">
            {steps.map((step, i) => (
              <li className="showcase__step" key={step.title}>
                <div className="showcase__pill" data-showcase-pill={i}>
                  <span className="showcase__num" data-showcase-num={i}>
                    {i + 1}
                  </span>
                  <span className="showcase__step-title" data-showcase-step-title={i}>
                    {step.title}
                  </span>
                </div>

                {/* Collapsed to height 0 by the timeline and opened for the
                    active step, so only one description is ever on screen. */}
                <div className="showcase__reveal" data-showcase-reveal={i}>
                  <p className="showcase__desc">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="showcase__stage">
          <PhoneFrame variant={variant}>
            {steps.map((step, i) => (
              <div className="showcase__card" data-showcase-card={i} key={step.title}>
                {step.screen}
              </div>
            ))}
            {overlay}
          </PhoneFrame>
        </div>
      </div>
    </section>
  )
}

// Drop-in for `steps[].screen` once real captures exist: fills the screen hole
// edge to edge, so the frame image is the only thing shaping it.
export function ScreenShot({ src, alt = '' }) {
  return <img className="showcase__shot" src={src} alt={alt} draggable="false" />
}
