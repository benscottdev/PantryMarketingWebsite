// Read at module-eval time. ES module evaluation always finishes before
// main.jsx calls createRoot(...).render() — and that call clears #root's
// contents in the very same (synchronous) commit it inserts React's tree —
// so this module still sees scripts/prerender.mjs's injected markup, and
// Article.jsx can re-insert the identical HTML with no flicker and no
// duplicated JSON payload.
const el = typeof document === 'undefined' ? null : document.getElementById('pantry-prerender')

export const PRERENDER_SLUG = el?.dataset.slug ?? null
export const PRERENDER_BODY = el?.querySelector('[data-post-body]')?.innerHTML ?? null
