import { CalendarDays, Check } from 'lucide-react'
import { receiptItems, receiptMeta, notifications } from '../data'
import CategoryIcon from './CategoryIcon'
import PhoneShowcase from './PhoneShowcase'

const variantClass = {
  urgent: 'receipt__chip receipt__chip--urgent',
  soon: 'receipt__chip receipt__chip--soon',
  fine: 'receipt__chip receipt__chip--fine',
}

const subtotal = receiptItems.reduce((sum, item) => sum + item.price, 0)

const morning = notifications.find((n) => n.slot === 'MORNING') ?? notifications[0]

// Ragged line lengths for the unreadable paper slip in the viewfinder. More
// lines than fit on purpose — the slip runs off the bottom of the frame, which
// is what makes it read as a long receipt rather than a card.
const paperLineWidths = [
  72, 54, 81, 63, 48, 76, 58, 68, 51, 79, 61, 45, 73, 56, 84, 66, 50, 77, 64, 47, 82, 59, 70, 53,
  75, 62, 49, 80, 57, 71,
]

// Step 01 — the camera viewfinder, framing the paper receipt it's reading.
function CaptureScreen() {
  return (
    <div className="capture">
      <div className="capture__frame">
        <span className="capture__corner capture__corner--tl" />
        <span className="capture__corner capture__corner--tr" />
        <span className="capture__corner capture__corner--bl" />
        <span className="capture__corner capture__corner--br" />

        <div className="capture__paper">
          <div className="capture__paper-head">{receiptMeta.store}</div>
          <div className="capture__paper-sub">{receiptMeta.date}</div>
          {paperLineWidths.map((width, i) => (
            <div className="capture__paper-line" key={i}>
              <span style={{ width: `${width}%` }} />
              <span />
            </div>
          ))}
        </div>

        <div className="capture__scan" />
      </div>
    </div>
  )
}

// Step 02 — the same receipt, parsed into the app's review list.
export function ReceiptScreen() {
  return (
    <div className="receipt">
      <div className="receipt__header">
        <div className="receipt__header-store">
          <strong>{receiptMeta.store}</strong>
          <span>
            <CalendarDays size={12.5} strokeWidth={2.5} />
            {receiptMeta.date}
          </span>
        </div>
        <div className="receipt__header-amount">
          <strong>${subtotal.toFixed(2)}</strong>
          <span>Receipt total · ${receiptMeta.total.toFixed(2)}</span>
          <span>{receiptMeta.totalItems} items</span>
        </div>
      </div>

      <div className="receipt__list">
        {receiptItems.map((item) => (
          <div className="receipt__row" key={item.name}>
            <span className="receipt__row-check">
              <Check size={11} strokeWidth={3} />
            </span>
            <CategoryIcon category={item.category} icon={item.icon} />
            <div className="receipt__row-text">
              <span className="receipt__row-name">{item.name}</span>
              <span className="receipt__row-meta">
                {item.location} · ${item.price.toFixed(2)}
              </span>
            </div>
            <span className={variantClass[item.variant]}>{item.tag}</span>
          </div>
        ))}
      </div>

      <button type="button" className="receipt__cta">
        Track {receiptItems.length} groceries
      </button>
    </div>
  )
}

function Banner({ item, behind = false }) {
  return (
    <div className={`notif-banner${behind ? ' notif-banner--behind' : ''}`}>
      <img src="/assets/icon.png" alt="" className="notif-banner__logo" />
      <div className="notif-banner__text">
        <div className="notif-banner__head">
          <span className="notif-banner__brand">Pantry</span>
          <span className="notif-banner__time">now</span>
        </div>
        <p className="notif-banner__msg">{item.msg}</p>
      </div>
    </div>
  )
}

// Step 03 — a lock screen with the day's nudges stacked the way iOS groups
// them: oldest peeking out behind, the latest on top.
function LockScreen({ time, items }) {
  const parsed = time.match(/^(\d+:\d+)\s*(am|pm)$/i)
  const clock = parsed?.[1] ?? time
  const meridiem = parsed?.[2] ?? ''

  return (
    <div className="lock-screen">
      <div className="lock-screen__head">
        <span className="lock-screen__clock">
          {clock}
          <span className="lock-screen__meridiem">{meridiem}</span>
        </span>
        <span className="lock-screen__date">Today</span>
      </div>

      <div className="lock-screen__stack">
        {items.map((item, i) => (
          <Banner key={item.slot} item={item} behind={i < items.length - 1} />
        ))}
      </div>
    </div>
  )
}

const steps = [
  {
    title: 'Photograph the receipt',
    desc: 'One photo, in the car park or on the bench. Pantry reads the store, the date, and every line item with its price, so you never type a shopping list again.',
    screen: <CaptureScreen />,
  },
  {
    title: 'Check it over',
    desc: 'Every item gets a shelf-life estimate, built on CSIRO refrigerated-storage guidance where it covers the food. Fix anything that looks wrong, then save the lot.',
    screen: <ReceiptScreen />,
  },
  {
    title: 'A nudge while it still counts',
    desc: "One digest each morning: what needs eating today, and what it cost you. Not a stream of alerts that arrive after the spinach has already turned.",
    screen: <LockScreen time={morning.time} items={[morning]} />,
  },
]

export default function HowItWorks() {
  return (
    <PhoneShowcase
      id="how"
      scene="how"
      theme="dark"
      eyebrow="HOW IT WORKS"
      title={
        <>
          Receipt in. <em>Dinner sorted.</em>
        </>
      }
      steps={steps}
      variant="scan"
    />
  )
}
