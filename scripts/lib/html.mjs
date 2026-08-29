// Shared by every build script that writes HTML (cta.mjs, static-pages.mjs,
// prerender.mjs). Was copy-pasted into each of them; one copy means one place
// to be wrong.
export function escapeHtml(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

// </script> inside a JSON string would close the tag early; escape the slash
// so it round-trips through JSON.parse unchanged.
export function escapeJsonForScriptTag(obj) {
	return JSON.stringify(obj).replace(/</g, '\\u003c')
}
