import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // If you deploy to https://<username>.github.io/<repo-name>/ (a normal GitHub
  // Pages project site), set this to '/<repo-name>/'. If you deploy to a custom
  // domain or to https://<username>.github.io/ directly, leave it as '/'.
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5174',
    },
  },
})
