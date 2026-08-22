import { createClient } from '@supabase/supabase-js';

// Same project as the Pantry app — the values are copied from its
// EXPO_PUBLIC_SUPABASE_* pair into .env here under Vite's VITE_ prefix.
// Only ever the anon key: anything with VITE_ in front of it is compiled
// into the bundle and is public, so the service_role key must never appear
// in this project.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// A marketing site has no accounts, so skip the auth machinery entirely:
// no session to persist, and no URL parsing that could react to a stray
// `#access_token` in a shared link.
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      })
    : null;
