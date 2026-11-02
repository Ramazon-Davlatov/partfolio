// One place for every external link on the site.
export const LINKS = {
  github: 'https://github.com/MrDavlatovdev',
  telegram: 'https://t.me/MrDavlatovdev',
  telegramHandle: '@MrDavlatovdev',
  instagram: 'https://instagram.com/da.vlatov3061',
  instagramHandle: '@da.vlatov3061',
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}
