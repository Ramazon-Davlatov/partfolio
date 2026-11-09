import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In `npm run dev`, serve /api/contact with the same handler Vercel uses in production,
// so the contact form works locally. BOT_TOKEN and CHAT_ID are read from a local `.env`
// file (git-ignored) and never reach the browser bundle.
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      // loadEnv lets process.env win over the file, so forget the values this plugin set
      // on a previous start; otherwise an edited .env would keep the old token until a full restart.
      const injected = (globalThis.__devApiInjected ??= new Set())
      for (const key of injected) delete process.env[key]
      injected.clear()
      const env = loadEnv(server.config.mode, process.cwd(), '')
      for (const key of ['BOT_TOKEN', 'CHAT_ID']) {
        if (env[key] && !process.env[key]) {
          process.env[key] = env[key].trim()
          injected.add(key)
        }
      }

      server.middlewares.use('/api/contact', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        req.body = raw
        res.status = (code) => ((res.statusCode = code), res)
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
          return res
        }
        const { default: handler } = await server.ssrLoadModule('/api/contact.js')
        await handler(req, res)
      })
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), devApi()],
})
