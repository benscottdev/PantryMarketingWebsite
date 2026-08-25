# Password reset

The page lives at **`https://usepantry.com.au/reset-password`**, defined once as
`PATHS.resetPassword` in `src/site/launch.js`. Change it there and you must
change it in both places below.

## Files

| File | What it does |
| --- | --- |
| `src/site/pages/ResetPassword.jsx` | The page and its four states |
| `src/site/lib/passwordReset.js` | Link parsing, redemption, password rules |
| `src/site/lib/supabaseAuth.js` | Auth-capable Supabase client, separate from the inert marketing one |

## What you still need to do in Supabase

**1. Allow the redirect URL.** Dashboard → Authentication → URL Configuration →
Redirect URLs. Add both:

```
https://usepantry.com.au/reset-password
http://localhost:5173/reset-password
```

Supabase silently falls back to the Site URL if the redirect is not on this
list, so a missing entry looks like "the link goes to the homepage".

**2. Change where the app sends people.** This is the one that is currently
wrong. The email in production redirects to `pantry://reset-password`, a custom
scheme into an app screen that does not exist, so the link dead-ends today.
Find the `resetPasswordForEmail` call in the iOS app and change `redirectTo`:

```js
// before: redirectTo: 'pantry://reset-password'
await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://usepantry.com.au/reset-password',
})
```

If it is not set in app code, it is coming from Site URL in the dashboard.

Once the app grows its own reset screen you can move back to the deep link, but
not both: the token is single-use, so whichever side redeems it wins.

**3. The email template is fine as is.** It uses `{{ .ConfirmationURL }}`,
which sends the user through `/auth/v1/verify` and lands them on the redirect
target with `#access_token=...&type=recovery`. The page handles that shape.

Two notes on the template copy itself, unrelated to wiring:

- "This link expires in 60 minutes and can only be used once" matches what the
  page tells people. Keep them in sync if you change either.
- The footer line has an em dash in it ("safely ignore this email — your
  password won't change"), which the rest of the site no longer uses. Swap it
  for a full stop.

For reference, these are the shapes the page accepts:

- `{{ .ConfirmationURL }}` (the default) sends the user through
  `/auth/v1/verify` and lands them with `#access_token=...&type=recovery`
- `{{ .TokenHash }}` lands them with `?token_hash=...&type=recovery`

The page handles both, plus PKCE `?code=`, because which one you get depends on
template and client config and it should not matter to the user.

## The four states

| State | When | What the user gets |
| --- | --- | --- |
| Verifying | While the token is redeemed | "Checking your link…" |
| Ready | Valid recovery link | Password form, with confirmation field and reveal toggle |
| Expired / invalid | `otp_expired`, reused link, mangled URL | Explanation plus a form to send a fresh link |
| Missing | Navigated here directly, no token | "You need a link first", same send-a-link form |
| Done | Password updated | Confirmation, and the session is signed out |

## Security decisions worth knowing about

- **A second Supabase client.** `supabase.js` is deliberately inert (no session,
  no URL parsing) because a marketing site should never react to a stray
  `#access_token`. Rather than loosen it, recovery gets its own client.
- **`persistSession: false`.** The recovery session lives in memory only, long
  enough to call `updateUser()`. Nothing is written to localStorage, so closing
  the tab ends it and a borrowed laptop is not left signed in.
- **The URL is scrubbed before first paint.** Tokens are read at module load and
  removed with `history.replaceState` immediately, so they never reach a
  screenshot, the back button, or a referrer header.
- **`noindex, nofollow`** is added on mount and removed on unmount.
- **Signed out after success**, so a completed reset does not leave a live
  session on whatever machine the email was opened on.
- **The send-a-link form does not confirm whether an account exists.** Every
  address gets the same "if there is an account, it is on its way", so the form
  cannot be used to enumerate Pantry users.
- **8 character minimum**, enforced client-side on top of whatever the Supabase
  project's floor is, so lowering that setting later does not quietly weaken
  this page.

## Testing it end to end

The link-redemption path needs a real recovery email, which needs a real
account. Once you have one:

1. `npm run dev`
2. Trigger a reset for that account with `redirectTo` set to
   `http://localhost:5173/reset-password`
3. Open the emailed link

To see the failure states without an email, load these directly:

```
http://localhost:5173/reset-password
http://localhost:5173/reset-password#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired
```
