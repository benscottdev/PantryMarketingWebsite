import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { renderPost } from './scripts/lib/posts.mjs'

const postsDir = resolve(import.meta.dirname, 'content/posts')

// Turns each content/posts/<slug>.md directly into a module exporting its
// rendered HTML, using the same renderPost() that scripts/prerender.mjs uses
// for the static article pages — so dev/preview bodies and prerendered
// bodies are never out of sync. Reached via a *lazy* import.meta.glob in
// Article.jsx; production always has the body inlined by the prerender step,
// so this transform is really a dev/fallback path, not the production one.
function markdownPosts() {
  return {
    name: 'pantry-markdown-posts',
    enforce: 'pre',
    transform(code, id) {
      if (!id.startsWith(postsDir) || !id.endsWith('.md')) return null
      const { html } = renderPost(id)
      return { code: `export default ${JSON.stringify(html)}`, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), markdownPosts()],
})
