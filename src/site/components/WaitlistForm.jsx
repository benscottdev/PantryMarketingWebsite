import { useState } from 'react';
import { CircleCheck, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { APP_LIVE, APP_STORE_URL } from '../launch';

function AppleMark() {
  return (
    <svg viewBox="0 0 16 20" width="14" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.2 10.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 .9-3.7.9s-2-.9-3.3-.9c-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.9 1.2 1.9 2.5 3.3 2.5 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8 2.2-1.2 3.1-2.4c1-.1.9-2.6 2.4-3.8-.1 0-2.3-1-2.3-3.3zM11.2 3.4c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3.1 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.4-.6 3.1-1.5z"
      />
    </svg>
  )
}

function StoreButton({ variant }) {
  return (
    <a
      className={
        variant === 'cta'
          ? 'waitlist-form__store waitlist-form__store--cta'
          : variant === 'hero'
            ? 'waitlist-form__store waitlist-form__store--hero'
            : 'waitlist-form__store'
      }
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <AppleMark />
      <span>
        <small>Download on the</small>
        App Store
      </span>
    </a>
  )
}

export default function WaitlistForm({ variant = 'hero' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | done | error
  const [error, setError] = useState('');

  if (APP_LIVE) {
    return (
      <div
        className={
          variant === 'cta'
            ? 'waitlist-form waitlist-form--cta waitlist-form--live'
            : variant === 'hero'
              ? 'waitlist-form waitlist-form--hero waitlist-form--live'
              : 'waitlist-form waitlist-form--live'
        }
      >
        <StoreButton variant={variant} />
        {variant === 'hero' && (
          <p className="waitlist-form__prompt">Pantry is on the App Store. Free to start.</p>
        )}
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'saving') return;

    const value = email.trim().toLowerCase();
    if (!value.includes('@')) return;

    setStatus('saving');
    setError('');

    if (!supabase) {
      setError('Sign-ups are offline right now. Try again in a little while.');
      setStatus('error');
      return;
    }

    // No .select() on purpose: anon is granted INSERT only, so asking for the
    // row back would be refused by RLS and fail an otherwise good signup.
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email: value, source: variant });

    // 23505 is the unique violation on lower(email) — they're already on the
    // list, which is the outcome they wanted. Don't make them feel it failed.
    if (insertError && insertError.code !== '23505') {
      setError('Something went wrong. Please try again.');
      setStatus('error');
      return;
    }

    setStatus('done');
  };

  if (status === 'done') {
    return (
      <div
        className={
          variant === 'cta' ? 'waitlist-done waitlist-done--cta' : variant === 'hero' ? 'waitlist-done waitlist-done--hero' : 'waitlist-done'
        }
      >
        <CircleCheck size={18} strokeWidth={2.25} />
        You&apos;re on the list. We&apos;ll email you once, when it ships.
      </div>
    );
  }

  return (
    <form
      className={
        variant === 'cta' ? 'waitlist-form waitlist-form--cta' : variant === 'hero' ? 'waitlist-form waitlist-form--hero' : 'waitlist-form'
      }
      onSubmit={handleSubmit}
      noValidate={false}
    >
      <div className="waitlist-form__field">
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="waitlist-form__input"
          disabled={status === 'saving'}
          aria-invalid={status === 'error'}
          required
        />
        <button
          type="submit"
          className="waitlist-form__button"
          disabled={status === 'saving'}
          aria-label={variant === 'hero' ? 'Join waitlist' : undefined}
        >
          {variant === 'hero'
            ? status === 'saving'
              ? '…'
              : 'Join'
            : status === 'saving'
              ? 'Joining…'
              : 'Join Waitlist'}
          {variant !== 'hero' && <ArrowRight size={16} strokeWidth={2.5} />}
        </button>
      </div>
      {variant === 'hero' && (
        <p className="waitlist-form__prompt">One email when Pantry launches, plus founding pricing.</p>
      )}
      {error && (
        <p className="waitlist-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
