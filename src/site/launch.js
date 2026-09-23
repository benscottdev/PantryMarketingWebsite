// Where Pantry is in its release, and what every CTA on the site offers:
//   'waitlist' — pre-launch. Email form, "Join the waitlist" everywhere.
//   'beta'     — public beta. CTAs send people to BETA_URL (TestFlight).
//   'live'     — on the App Store. CTAs become App Store download buttons.
// Set BETA_URL below before switching to 'beta'; the build refuses to ship a
// beta with nowhere for the button to go.
export const LAUNCH_STAGE = "waitlist";

// Read through this rather than touching `import.meta.env.X` directly: the
// build-time CTA (scripts/lib/cta.mjs, reached from scripts/lib/posts.mjs)
// imports this module from plain Node, where `import.meta.env` is undefined
// and a direct property read would throw. Vite still substitutes the real
// env object for a bare `import.meta.env`, so the browser bundle is
// unchanged; Node falls through to process.env, which is what Vercel
// populates at build time.
const env = import.meta.env || globalThis.process?.env || {};

export const APP_STORE_URL = env.VITE_APP_STORE_URL || "https://apps.apple.com/";

// The public TestFlight invite, e.g. "https://testflight.apple.com/join/AbCd1234".
// Paste it here, or set VITE_BETA_URL in Vercel to override without a commit.
export const BETA_URL = env.VITE_BETA_URL || "";

export const APP_LIVE = LAUNCH_STAGE === "live";
export const APP_BETA = LAUNCH_STAGE === "beta";

if (!["waitlist", "beta", "live"].includes(LAUNCH_STAGE)) {
	throw new Error(`launch.js: unknown LAUNCH_STAGE "${LAUNCH_STAGE}"`);
}
if (APP_BETA && !BETA_URL) {
	throw new Error("launch.js: LAUNCH_STAGE is 'beta' but BETA_URL is empty — paste the TestFlight link first");
}

// The off-site call to action once there is something to install, shared by
// the header, site map and page headers. Null while the waitlist is the CTA.
export const INSTALL_CTA = APP_LIVE
	? { href: APP_STORE_URL, label: "Get the app" }
	: APP_BETA
		? { href: BETA_URL, label: "Join the beta" }
		: null;

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
	// The link at the foot of the waitlist welcome email (the waitlist-welcome
	// edge function in the app repo builds it). Change it there too.
	unsubscribe: "/unsubscribe",
};

export function articlePath(id) {
	return `${PATHS.resources}/${id}`;
}
