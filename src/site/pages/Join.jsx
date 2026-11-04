import { useEffect, useState } from 'react'
import { Check, Copy, TriangleAlert, UsersRound } from 'lucide-react'
import Legal from '../Legal'
import { APP_STORE_URL, INSTALL_CTA } from '../launch'

// Where a household invite link lands when Pantry isn't installed. With the app
// installed, iOS opens /join/CODE in the app and this page never loads, which is
// what public/.well-known/apple-app-site-association is for. A link can't survive
// an install, so the code has to be carried across by hand, and everything here is
// about getting it into the household step of the app's onboarding.
//
// index.html keeps analytics off this path, because the code is in the URL.
const CODE = /^[A-Z0-9]{8}$/

/** Same rule as normalizeInviteCode in the app repo's src/lib/inviteShare.ts. */
function inviteCode() {
  const raw = window.location.pathname.split('/')[2] ?? ''
  const code = raw.toUpperCase().replace(/[^A-Z0-9]/g, '')
  return CODE.test(code) ? code : null
}

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

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      // Clipboard access can be refused. The code is selectable on the page.
    }
  }

  return (
    <button className="reset__button join__copy" type="button" onClick={onCopy}>
      {copied ? <Check size={16} strokeWidth={2.5} aria-hidden="true" /> : <Copy size={16} strokeWidth={2.25} aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy code'}
    </button>
  )
}

export default function Join() {
  useNoIndex()
  const code = inviteCode()
  const install = INSTALL_CTA ?? { href: APP_STORE_URL, label: 'Get the app' }

  return (
    <Legal
      title="Household invite"
      heading={
        <>
          Share a <em>pantry.</em>
        </>
      }
      eyebrow="HOUSEHOLD INVITE"
      updated={false}
      description="Someone has invited you to their Pantry household."
    >
      <div className="reset">
        {code ? (
          <>
            <Panel tone="good" icon={UsersRound} title="Your invite code">
              <p className="join__code">{code}</p>
              <CopyButton code={code} />
            </Panel>

            <ol className="join__steps">
              <li>
                <a href={install.href}>{install.label}</a> and open it.
              </li>
              <li>Sign up, then choose to join a household when you are asked.</li>
              <li>Enter the code above.</li>
            </ol>

            <p className="join__note">
              Already have Pantry? <a href={`pantry://join/${code}`}>Open it here</a>.
            </p>
            <p className="join__note">
              Codes last 7 days and work once. If yours has stopped working, ask
              for a new one.
            </p>
          </>
        ) : (
          <Panel tone="warn" icon={TriangleAlert} title="That link did not work.">
            <p>
              It may have been cut short on the way. Ask the person who invited
              you to send it again, or to read you the code.
            </p>
          </Panel>
        )}
      </div>
    </Legal>
  )
}
