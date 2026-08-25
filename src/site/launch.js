// Flip this when Pantry ships. Waitlist copy and forms become App Store
// download buttons across the landing, header, and footer.
export const APP_LIVE = false;

export const APP_STORE_URL = import.meta.env.VITE_APP_STORE_URL || "https://apps.apple.com/";

export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || "support@usepantry.com.au";

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
