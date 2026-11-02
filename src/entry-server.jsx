// Used only at build time: renders the page to static HTML so search engines
// see the full content without running JavaScript.
import { renderToString } from 'react-dom/server'
import App from './App'

export function render() {
  return renderToString(<App />)
}
