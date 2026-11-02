// Injects the server-rendered HTML into dist/index.html after `vite build`.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const serverEntry = path.join(root, 'dist-server', 'entry-server.js')
const indexPath = path.join(root, 'dist', 'index.html')

const { render } = await import(pathToFileURL(serverEntry).href)
const appHtml = render()
const template = fs.readFileSync(indexPath, 'utf8')

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html')
}

fs.writeFileSync(indexPath, template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`))
fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true })
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} KB of HTML into dist/index.html`)
