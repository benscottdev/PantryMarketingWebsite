import { useEffect, useState } from 'react'
import { CircleCheck, MailX, TriangleAlert } from 'lucide-react'
import Legal from '../Legal'
import { PATHS, SUPPORT_EMAIL } from '../launch'
import { supabase } from '../lib/supabase'

// The link at the foot of the waitlist welcome email lands here with ?u=<token>.
// It asks for a click rather than unsubscribing on load, because mail scanners
// open every link in a message and would otherwise unsubscribe people who never
// asked to leave. The one-click path mail apps use (List-Unsubscribe-Post) goes
// straight to the waitlist-welcome edge function instead.
const TOKEN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
}

function Panel({ tone, icon: Icon, title, children }) {
  return (
    <div className={`reset__panel reset__panel--${tone}`}>
      <span className="reset__panel-icon" aria-hidden="true">
        <Icon size={22} strokeWidth={2.25} />
      </span>
      <h2 className="reset__panel-title">{title}</h2>
      {children}
    </div>
  )
}

export default function Unsubscribe() {
  useNoIndex()
  const token = new URLSearchParams(window.location.search).get('u') || ''
  const [state, setState] = useState(TOKEN.test(token) ? 'idle' : 'invalid') // idle | saving | done | invalid | error

  const onConfirm = async () => {
    if (state === 'saving') return
    if (!supabase) {
      setState('error')
      return
    }
    setState('saving')
    const { data, error } = await supabase.rpc('waitlist_unsubscribe', { p_token: token })
    if (error) setState('error')
    else setState(data ? 'done' : 'invalid')
  }

  const contact = (
    <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
  )

  return (
    <Legal
      title="Unsubscribe"
      heading={
        <>
          Leave the <em>list.</em>
        </>
      }
      eyebrow="WAITLIST"
      updated={false}
      description="Stop emails from the Pantry waitlist."
    >
      <div className="reset">
        {state === 'done' ? (
          <Panel tone="good" icon={CircleCheck} title="You are off the list.">
            <p>
              No more waitlist emails, including the launch one. If you change
              your mind, join again from the <a href={PATHS.home}>home page</a>.
            </p>
          </Panel>
        ) : state === 'invalid' ? (
          <Panel tone="warn" icon={TriangleAlert} title="That link did not work.">
            <p>
              It may have been cut short on the way. Email {contact} from the
              address you signed up with and we will take you off by hand.
            </p>
          </Panel>
        ) : state === 'error' ? (
          <Panel tone="warn" icon={TriangleAlert} title="Something went wrong.">
            <p>
              Try again in a minute, or email {contact} and we will take you off
              by hand.
            </p>
            <button className="reset__button" type="button" onClick={onConfirm}>
              Try again
            </button>
          </Panel>
        ) : (
          <Panel tone="warn" icon={MailX} title="Stop waitlist emails?">
            <p>
              You will not hear from Pantry about the beta or the launch.
            </p>
            <button
              className="reset__button"
              type="button"
              onClick={onConfirm}
              disabled={state === 'saving'}
            >
              {state === 'saving' ? 'Unsubscribing…' : 'Unsubscribe'}
            </button>
          </Panel>
        )}
      </div>
    </Legal>
  )
}
