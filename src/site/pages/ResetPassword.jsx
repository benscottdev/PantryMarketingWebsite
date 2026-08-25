import { useEffect, useRef, useState } from 'react'
import { CircleCheck, Eye, EyeOff, KeyRound, TriangleAlert } from 'lucide-react'
import Legal from '../Legal'
import { APP_LIVE, APP_STORE_URL, PATHS, SUPPORT_EMAIL } from '../launch'
import {
  MIN_PASSWORD_LENGTH,
  RESET_STATUS,
  establishRecoverySession,
  passwordProblem,
  requestResetEmail,
  updatePassword,
} from '../lib/passwordReset'

const RESET_URL = `${window.location.origin}${PATHS.resetPassword}`

// Recovery links carry credentials, so this page must never be indexed or
// followed. The tag is added on mount and taken away on unmount, because the
// rest of the site very much does want to be indexed.
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
}

function Shell({ children }) {
  return (
    <Legal
      title="Reset your password"
      heading={
        <>
          Reset your <em>password.</em>
        </>
      }
      eyebrow="ACCOUNT"
      updated={false}
      description="Choose a new password for your Pantry account."
    >
      <div className="reset">{children}</div>
    </Legal>
  )
}

function Verifying() {
  return (
    <p className="reset__status" role="status">
      Checking your link…
    </p>
  )
}

function Done() {
  return (
    <div className="reset__panel reset__panel--good">
      <span className="reset__panel-icon" aria-hidden="true">
        <CircleCheck size={22} strokeWidth={2.25} />
      </span>
      <h2 className="reset__panel-title">Password changed.</h2>
      <p>
        You are signed out everywhere else. Open Pantry on your phone and sign
        in with the new one.
      </p>
      {APP_LIVE ? (
        <a
          className="reset__button reset__button--link"
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the App Store
        </a>
      ) : (
        <a className="reset__button reset__button--link" href={PATHS.home}>
          Back to Pantry
        </a>
      )}
    </div>
  )
}

// Shown for an expired link, a broken one, and for someone who navigated here
// with no link at all. All three end the same way, needing a new email, so
// they share one form rather than three dead ends.
function NeedsNewLink({ status, message }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const headline =
    status === RESET_STATUS.EXPIRED
      ? 'That link has expired.'
      : status === RESET_STATUS.MISSING
        ? 'You need a link first.'
        : 'That link did not work.'

  const explainer =
    status === RESET_STATUS.EXPIRED
      ? 'Recovery links are short-lived on purpose. Put your email in below and we will send a fresh one.'
      : status === RESET_STATUS.MISSING
        ? 'This page only works from the link in a password reset email. Enter your address and we will send you one.'
        : 'It may have been opened already, or the address got cut off on the way. A new one will sort it.'

  const onSubmit = async (e) => {
    e.preventDefault()
    if (state === 'sending') return
    const value = email.trim()
    if (!value.includes('@')) return

    setState('sending')
    setError('')
    const result = await requestResetEmail(value, RESET_URL)
    if (!result.ok) {
      setError(result.message)
      setState('error')
      return
    }
    setState('sent')
  }

  if (state === 'sent') {
    return (
      <div className="reset__panel reset__panel--good">
        <span className="reset__panel-icon" aria-hidden="true">
          <CircleCheck size={22} strokeWidth={2.25} />
        </span>
        <h2 className="reset__panel-title">Check your email.</h2>
        <p>
          If there is a Pantry account on that address, a reset link is on its
          way. It is good for one hour, and only one use.
        </p>
      </div>
    )
  }

  return (
    <div className="reset__panel reset__panel--warn">
      <span className="reset__panel-icon" aria-hidden="true">
        <TriangleAlert size={22} strokeWidth={2.25} />
      </span>
      <h2 className="reset__panel-title">{headline}</h2>
      <p>{explainer}</p>
      {message ? <p className="reset__detail">{message}</p> : null}

      <form className="reset__form" onSubmit={onSubmit} noValidate>
        <label className="reset__label" htmlFor="reset-email">
          Email address
        </label>
        <input
          id="reset-email"
          className="reset__input"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === 'sending'}
        />
        <button className="reset__button" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send me a new link'}
        </button>
        {error ? (
          <p className="reset__error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  )
}

function ChoosePassword({ onDone, onExpired }) {
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState('idle') // idle | saving | error
  const [error, setError] = useState('')
  const fieldRef = useRef(null)

  useEffect(() => {
    fieldRef.current?.focus()
  }, [])

  // Only nag once they have actually typed something in the field in question.
  const liveProblem = password ? passwordProblem(password, confirmation) : null

  const onSubmit = async (e) => {
    e.preventDefault()
    if (state === 'saving') return

    const problem = passwordProblem(password, confirmation)
    if (problem) {
      setError(problem)
      setState('error')
      return
    }

    setState('saving')
    setError('')
    const result = await updatePassword(password)

    if (result.ok) {
      onDone()
      return
    }
    if (result.expired) {
      onExpired(result.message)
      return
    }
    setError(result.message)
    setState('error')
  }

  return (
    <>
      <p className="reset__lede">
        Pick something you have not used on Pantry before. At least{' '}
        {MIN_PASSWORD_LENGTH} characters, and longer beats cleverer.
      </p>

      <form className="reset__form reset__form--wide" onSubmit={onSubmit} noValidate>
        <label className="reset__label" htmlFor="reset-password">
          New password
        </label>
        <div className="reset__field">
          <span className="reset__field-icon" aria-hidden="true">
            <KeyRound size={16} strokeWidth={2.25} />
          </span>
          <input
            id="reset-password"
            ref={fieldRef}
            className="reset__input reset__input--icon"
            type={visible ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={state === 'saving'}
            aria-invalid={state === 'error'}
            aria-describedby="reset-hint"
          />
          <button
            type="button"
            className="reset__reveal"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff size={16} strokeWidth={2.25} /> : <Eye size={16} strokeWidth={2.25} />}
          </button>
        </div>

        <label className="reset__label" htmlFor="reset-confirm">
          Type it again
        </label>
        <div className="reset__field">
          <span className="reset__field-icon" aria-hidden="true">
            <KeyRound size={16} strokeWidth={2.25} />
          </span>
          <input
            id="reset-confirm"
            className="reset__input reset__input--icon"
            type={visible ? 'text' : 'password'}
            autoComplete="new-password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            disabled={state === 'saving'}
          />
        </div>

        <p className="reset__hint" id="reset-hint">
          {liveProblem ?? `${MIN_PASSWORD_LENGTH} characters or more.`}
        </p>

        <button
          className="reset__button"
          type="submit"
          disabled={state === 'saving' || Boolean(passwordProblem(password, confirmation))}
        >
          {state === 'saving' ? 'Saving…' : 'Set new password'}
        </button>

        {error ? (
          <p className="reset__error" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      <p className="reset__foot">
        Not you? Ignore this page and nothing changes. If you think someone else
        asked for this, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </>
  )
}

export default function ResetPassword() {
  useNoIndex()
  const [phase, setPhase] = useState('verifying')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    let live = true
    establishRecoverySession().then(({ status, message: detail }) => {
      if (!live) return
      setMessage(detail)
      setPhase(status)
    })
    return () => {
      live = false
    }
  }, [])

  return (
    <Shell>
      {phase === 'verifying' ? <Verifying /> : null}
      {phase === RESET_STATUS.READY ? (
        <ChoosePassword
          onDone={() => setPhase('done')}
          onExpired={(detail) => {
            setMessage(detail)
            setPhase(RESET_STATUS.EXPIRED)
          }}
        />
      ) : null}
      {phase === 'done' ? <Done /> : null}
      {phase === RESET_STATUS.EXPIRED || phase === RESET_STATUS.INVALID || phase === RESET_STATUS.MISSING ? (
        <NeedsNewLink status={phase} message={message} />
      ) : null}
    </Shell>
  )
}
