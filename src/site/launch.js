// Flip this when Pantry ships. Waitlist copy and forms become App Store
// download buttons across the landing, header, and footer.
export const APP_LIVE = false

export const APP_STORE_URL =
  import.meta.env.VITE_APP_STORE_URL || 'https://apps.apple.com/'

export const SUPPORT_EMAIL =
  import.meta.env.VITE_SUPPORT_EMAIL || 'hello@pantry.app'

export const LEGAL_UPDATED = '21 August 2026'

export const PATHS = {
  home: '/',
  privacy: '/privacy',
  support: '/support',
  terms: '/terms',
  resources: '/resources',
  changelog: '/changelog',
}

export function articlePath(id) {
  return `${PATHS.resources}/${id}`
}
