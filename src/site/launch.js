// Flip this when Pantry ships. Waitlist copy and forms become App Store
// download buttons across the landing, header, and footer.
export const APP_LIVE = false;

// Read through this rather than touching `import.meta.env.X` directly: the
// build-time CTA (scripts/lib/cta.mjs, reached from scripts/lib/posts.mjs)
// imports this module from plain Node, where `import.meta.env` is undefined
// and a direct property read would throw. Vite still substitutes the real
// env object for a bare `import.meta.env`, so the browser bundle is
// unchanged; Node falls through to process.env, which is what Vercel
// populates at build time.
const env = import.meta.env || globalThis.process?.env || {};

export const APP_STORE_URL = env.VITE_APP_STORE_URL || "https://apps.apple.com/";

export const SUPPORT_EMAIL = env.VITE_SUPPORT_EMAIL || "support@usepantry.com.au";

export const LEGAL_UPDATED = "22 August 2026";

export const PATHS = {
	home: "/",
	privacy: "/privacy",
	support: "/support",
	terms: "/terms",
	resources: "/resources",
	changelog: "/changelog",
	calculator: "/calculator",
	// Where Supabase sends a password recovery email. This exact URL has to be
	// in the project's Auth > URL Configuration redirect allow list, and it is
	// what the app passes as `redirectTo` when it calls
	// `resetPasswordForEmail()`. Change it here and you must change it there.
	resetPassword: "/reset-password",
};

export function articlePath(id) {
	return `${PATHS.resources}/${id}`;
}
