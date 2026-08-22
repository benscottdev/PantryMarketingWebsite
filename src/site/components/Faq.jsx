import { Plus } from 'lucide-react'
import { faqs } from '../data'

export default function Faq() {
  return (
    <section id="faq" className="faq" data-faq aria-labelledby="faq-title">
      <div className="faq__inner">
        <header className="faq__head">
          <div className="faq__eyebrow eyebrow">FAQ</div>
          <h2 className="faq__title" id="faq-title">
            Before you <em>ask.</em>
          </h2>
        </header>

        <div className="faq__list" data-faq-list>
          {faqs.map(({ q, a }) => (
            <details className="faq__item" name="pantry-faq" data-faq-item key={q}>
              <summary className="faq__q">
                <h3 className="faq__q-text">{q}</h3>
                <span className="faq__icon" aria-hidden="true">
                  <Plus size={16} strokeWidth={2.5} />
                </span>
              </summary>
              <div className="faq__a">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
