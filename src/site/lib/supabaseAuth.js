import { createClient } from '@supabase/supabase-js';

// A second client, separate from the one in `supabase.js` on purpose.
//
// That client is deliberately inert: no session, no token refresh, and no URL
// parsing, because a marketing site has no accounts and should never react to
// a stray `#access_token` in a shared link. Password recovery is the single
// exception, so it gets its own client rather than loosening that one.
//
// Still `persistSession: false`. The recovery session only has to live long
// enough to call `updateUser()`, so it stays in memory and never touches
// localStorage. Closing the tab ends it, and nothing is left behind on a
// shared or borrowed computer.
//
// `detectSessionInUrl` is off because we parse the link ourselves in
// `passwordReset.js` — Supabase has shipped three different recovery link
// shapes over the years and we want to handle all of them explicitly, and to
// scrub the tokens out of the address bar the moment they are redeemed.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseAuth =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    : null;
