import { supabaseAuth } from './supabaseAuth';

// Supabase has emitted recovery links in three different shapes depending on
// the project's flow type and how the email template is written. A link that
// works today should not stop working because a template got edited, so all
// three are handled:
//
//   1. `#access_token=...&refresh_token=...&type=recovery`
//      The implicit flow, and what `{{ .ConfirmationURL }}` produces once the
//      user has been bounced through `/auth/v1/verify`.
//   2. `?token_hash=...&type=recovery`
//      What `{{ .TokenHash }}` produces. Verified here rather than by the
//      redirect, which is the shape Supabase now recommends.
//   3. `?code=...`
//      PKCE. Only completes in the same browser that started the flow, so it
//      generally fails for a link opened from a mail app on another device.
//      Attempted anyway, because when it does apply it is the right path.
//
// Errors arrive in the URL too, and in either half of it: an expired link
// comes back as `error=access_denied&error_code=otp_expired`.

export const RESET_STATUS = {
  READY: 'ready',
  INVALID: 'invalid',
  EXPIRED: 'expired',
  MISSING: 'missing',
};

// The link is read once, at module load, before React mounts anything.
//
// It has to be a snapshot rather than a live read. Under StrictMode the mount
// effect runs twice, and the second pass would find an address bar we had
// already scrubbed and conclude the user arrived with no link at all. The same
// thing happens on any remount. Reading once and holding the result makes the
// page's behaviour independent of how many times it renders.
//
// Doing it this early is also the safer order: the credential is out of the
// address bar before the first paint, so it cannot leak into a screenshot, the
// back button, or the referrer of anything loaded afterwards.
const LINK = (() => {
  if (typeof window === 'undefined') return null;

  const query = new URLSearchParams(window.location.search);
  // The fragment is the implicit flow's carrier. `URLSearchParams` handles it
  // fine once the leading `#` is off.
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));

  const pick = (key) => hash.get(key) || query.get(key);

  const link = {
    accessToken: hash.get('access_token'),
    refreshToken: hash.get('refresh_token'),
    tokenHash: query.get('token_hash') || query.get('token'),
    code: query.get('code'),
    error: pick('error'),
    errorCode: pick('error_code'),
    errorDescription: pick('error_description'),
  };

  const carriedSomething = Object.values(link).some(Boolean);
  if (carriedSomething) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  return link;
})();

function readError() {
  const { error, errorCode, errorDescription } = LINK;
  if (!error && !errorCode && !errorDescription) return null;

  // `otp_expired` is by far the most common way a real user lands here: they
  // opened the email the next morning. It deserves its own message and its own
  // way out, rather than a generic failure.
  const expired = errorCode === 'otp_expired' || /expired/i.test(errorDescription || '');
  return {
    status: expired ? RESET_STATUS.EXPIRED : RESET_STATUS.INVALID,
    message: errorDescription ? errorDescription.replace(/\+/g, ' ') : null,
  };
}

async function redeem() {
  if (!supabaseAuth) return { status: RESET_STATUS.INVALID, message: null };

  const urlError = readError();
  if (urlError) return urlError;

  const { accessToken, refreshToken, tokenHash, code } = LINK;

  // No credential of any kind: somebody navigated here directly rather than
  // following an email. That is a different problem from a broken link, and
  // gets its own screen offering to send one.
  if (!accessToken && !tokenHash && !code) {
    return { status: RESET_STATUS.MISSING, message: null };
  }

  let error;

  if (accessToken && refreshToken) {
    ({ error } = await supabaseAuth.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    }));
  } else if (tokenHash) {
    ({ error } = await supabaseAuth.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'recovery',
    }));
  } else {
    ({ error } = await supabaseAuth.auth.exchangeCodeForSession(code));
  }

  if (error) {
    const expired = /expired|invalid/i.test(error.message || '');
    return {
      status: expired ? RESET_STATUS.EXPIRED : RESET_STATUS.INVALID,
      message: error.message ?? null,
    };
  }

  return { status: RESET_STATUS.READY, message: null };
}

// Recovery tokens are single use. Redeeming one twice burns it and the second
// call fails, which would show an error on a link that was perfectly good, so
// the in-flight promise is shared rather than the work being repeated.
let pending = null;

// Redeems whatever the link carried and leaves the client holding a recovery
// session. Resolves to a RESET_STATUS; never throws.
export function establishRecoverySession() {
  if (!pending) {
    pending = redeem().catch((err) => ({
      status: RESET_STATUS.INVALID,
      message: err?.message ?? null,
    }));
  }
  return pending;
}

// Supabase enforces its own minimum (6 by default). We ask for 8, because the
// floor is a project setting somebody can lower later and this page should not
// quietly get weaker if that happens.
export const MIN_PASSWORD_LENGTH = 8;

export function passwordProblem(password, confirmation) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (confirmation && password !== confirmation) {
    return 'Those two do not match.';
  }
  return null;
}

export async function updatePassword(password) {
  if (!supabaseAuth) {
    return { ok: false, message: 'Password resets are offline right now. Try again shortly.' };
  }

  const { error } = await supabaseAuth.auth.updateUser({ password });

  if (error) {
    // Supabase's own wording for these is serviceable but terse, and the
    // same-password one reads like a failure when it is really just a no-op.
    if (error.code === 'same_password') {
      return { ok: false, message: 'That is already your password. Pick a different one.' };
    }
    if (error.code === 'weak_password') {
      return { ok: false, message: 'That password is too easy to guess. Try a longer one.' };
    }
    if (/session|jwt|token/i.test(error.message || '')) {
      return { ok: false, message: 'This link has expired. Request a fresh one and try again.', expired: true };
    }
    return { ok: false, message: error.message || 'Something went wrong. Try again.' };
  }

  // The recovery session has done its one job. Scope is passed explicitly
  // rather than relying on supabase-js defaulting to 'global', because the
  // success screen tells the user they are signed out everywhere and that
  // claim should not quietly become false if a default changes.
  //
  // Global is the right scope for a *forgotten* password: whoever else knew
  // the old one loses their session too. It does mean the phone is signed out
  // and has to log back in with the new password, which is the behaviour you
  // want here.
  await supabaseAuth.auth.signOut({ scope: 'global' });
  return { ok: true };
}

// Used by the "send me a new one" path on the expired screen.
export async function requestResetEmail(email, redirectTo) {
  if (!supabaseAuth) {
    return { ok: false, message: 'Password resets are offline right now. Try again shortly.' };
  }

  const { error } = await supabaseAuth.auth.resetPasswordForEmail(email, { redirectTo });

  // Deliberately not surfacing "no such user": that turns this form into a way
  // of finding out who has a Pantry account. Every address gets the same reply.
  if (error && !/user not found/i.test(error.message || '')) {
    return { ok: false, message: 'Could not send that. Try again in a moment.' };
  }
  return { ok: true };
}
