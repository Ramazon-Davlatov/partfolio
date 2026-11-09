import { useEffect, useState } from 'react'
import { Camera, X, Mail, ArrowUpRight, PenLine } from 'lucide-react'

/* ── 1. Dasturchi: terminal uslubi ───────────────────────── */
export function DevPortfolio() {
  const lines = [
    ['$ whoami', 'aziz — backend dasturchi, Toshkent'],
    ['$ cat skills.txt', 'Go · Node.js · PostgreSQL · Docker · Redis'],
    ['$ ls projects/', 'pay-gateway/  chat-server/  url-shortener/'],
    ['$ echo $STATUS', 'Yangi loyihalarga ochiq ✔'],
  ]
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (shown >= lines.length) return
    const id = setTimeout(() => setShown((n) => n + 1), 700)
    return () => clearTimeout(id)
  }, [shown, lines.length])
  return (
    <div className="min-h-full bg-[#0d1117] p-6 font-mono text-sm text-[#c9d1d9]">
      <div className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" /></div>
      <h1 className="mt-6 text-3xl font-bold text-white">Aziz Karimov<span className="animate-pulse text-[#3fb950]">_</span></h1>
      <div className="mt-6 space-y-3">
        {lines.slice(0, shown).map(([cmd, out]) => (
          <div key={cmd}><p className="text-[#3fb950]">{cmd}</p><p className="text-[#8b949e]">{out}</p></div>
        ))}
      </div>
      <div className="mt-8 grid gap-3 @xl:grid-cols-3">
        {[['pay-gateway', '⭐ 1.2k', 'To‘lov tizimlari uchun shlyuz'], ['chat-server', '⭐ 640', 'WebSocket chat serveri'], ['url-shortener', '⭐ 310', 'Qisqa havola xizmati']].map(([n, s, d]) => (
          <div key={n} className="rounded-lg border border-[#30363d] p-4 transition hover:border-[#3fb950]">
            <p className="font-bold text-[#58a6ff]">{n}</p><p className="mt-1 text-xs text-[#8b949e]">{d}</p><p className="mt-3 text-xs">{s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 2. Fotograf: galereya ───────────────────────────────── */
const PHOTOS = [
  ['Registon', 'from-[#f59e0b] to-[#7c2d12]', 'row-span-2'],
  ['Chimyon', 'from-[#38bdf8] to-[#1e3a8a]', ''],
  ['To‘y', 'from-[#f9a8d4] to-[#9d174d]', ''],
  ['Buxoro', 'from-[#fde68a] to-[#b45309]', ''],
  ['Orol', 'from-[#5eead4] to-[#134e4a]', 'row-span-2'],
  ['Portret', 'from-[#d4d4d8] to-[#27272a]', ''],
]
export function PhotoPortfolio() {
  const [open, setOpen] = useState(null)
  return (
    <div className="relative min-h-full bg-[#fafaf9] p-6 font-sans text-[#1c1917]">
      <nav className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em]"><Camera size={18} /> MALIKA·FOTO</span>
        <span className="text-xs text-[#78716c]">Ishlar · Narxlar · Aloqa</span>
      </nav>
      <h1 className="mt-8 font-serif text-4xl italic">Lahzalarni abadiy qilaman.</h1>
      <div className="mt-6 grid auto-rows-[90px] grid-cols-2 gap-2 @xl:auto-rows-[110px] @xl:grid-cols-3">
        {PHOTOS.map(([n, g, span], i) => (
          <button key={n} onClick={() => setOpen(i)} className={`group relative overflow-hidden rounded-lg bg-gradient-to-br ${g} ${span}`}>
            <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
            <span className="absolute bottom-2 left-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">{n}</span>
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/85 p-6" onClick={() => setOpen(null)}>
          <div className={`h-3/4 w-full max-w-md rounded-lg bg-gradient-to-br ${PHOTOS[open][1]}`} />
          <button className="absolute right-4 top-4 text-white"><X /></button>
          <p className="absolute bottom-6 font-serif text-xl italic text-white">{PHOTOS[open][0]}</p>
        </div>
      )}
    </div>
  )
}

/* ── 3. Dizayner: rang-barang ────────────────────────────── */
export function DesignerPortfolio() {
  const [hover, setHover] = useState(null)
  const works = [['Brending', '#ff5a36'], ['Mobil ilova', '#3b82f6'], ['Qadoq dizayni', '#16a34a'], ['Afisha', '#a855f7']]
  return (
    <div className="min-h-full bg-[#fff6e5] p-6 font-sans text-[#111]">
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-[#111] px-3 py-1 text-xs font-bold text-[#fff6e5]">Dilnoza.design</span>
        <span className="h-10 w-10 rounded-full bg-[#ff5a36]" />
      </div>
      <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight @xl:text-6xl">
        Men <span className="inline-block -rotate-3 rounded-xl bg-[#ffd23f] px-2">brendlarga</span><br />ovoz beraman.
      </h1>
      <div className="mt-8 flex flex-col">
        {works.map(([n, c], i) => (
          <a key={n} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="group flex items-center justify-between border-t-2 border-[#111] py-4 transition-all" style={{ background: hover === i ? c : 'transparent', paddingLeft: hover === i ? 16 : 0 }}>
            <span className="text-2xl font-black">{n}</span>
            <ArrowUpRight className="transition group-hover:rotate-45" />
          </a>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        {['#ff5a36', '#ffd23f', '#3b82f6', '#16a34a', '#a855f7'].map((c, i) => (
          <span key={c} className="h-8 flex-1 rounded-full transition hover:-translate-y-1" style={{ background: c, transitionDelay: `${i * 30}ms` }} />
        ))}
      </div>
    </div>
  )
}

/* ── 4. Yozuvchi / bloger ────────────────────────────────── */
export function WriterPortfolio() {
  const posts = [
    ['Nega har kuni 500 so‘z yozaman', '12-oktyabr', 4],
    ['Samarqand ko‘chalarida bir kun', '28-sentyabr', 7],
    ['Kitob o‘qish odatini qanday shakllantirdim', '3-sentyabr', 5],
  ]
  const [sub, setSub] = useState(false)
  return (
    <div className="min-h-full bg-white px-6 py-10 font-serif text-[#1f2937]">
      <div className="mx-auto max-w-lg">
        <PenLine className="text-[#9a3412]" />
        <h1 className="mt-4 text-4xl font-bold">Jasur Rahimov</h1>
        <p className="mt-3 text-lg leading-relaxed text-[#4b5563]">Hikoyalar, insholar va kundalik kuzatuvlar. Haftada bir marta yangi maqola.</p>
        <div className="mt-8 divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
          {posts.map(([t, d, m]) => (
            <a key={t} className="group block py-5">
              <p className="font-sans text-xs uppercase tracking-wider text-[#9ca3af]">{d} · {m} daqiqa</p>
              <p className="mt-1 text-xl font-semibold group-hover:text-[#9a3412] group-hover:underline">{t}</p>
            </a>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-[#fff7ed] p-5 font-sans">
          {sub ? <p className="text-sm font-semibold text-[#9a3412]">Obuna bo‘ldingiz — rahmat! ✉️</p> : (
            <form onSubmit={(e) => { e.preventDefault(); setSub(true) }} className="flex gap-2">
              <input required type="email" placeholder="Email manzilingiz" className="min-w-0 flex-1 rounded-lg border border-[#fed7aa] bg-white px-3 py-2 text-sm outline-none" />
              <button className="flex items-center gap-1.5 rounded-lg bg-[#9a3412] px-4 text-sm font-semibold text-white"><Mail size={14} /> Obuna</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
