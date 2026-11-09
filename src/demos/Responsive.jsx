import { useState } from 'react'
import { Smartphone, Tablet, Monitor, Menu, Search, Star, Heart, Wifi, Coffee, Car, Stethoscope, Calendar } from 'lucide-react'

const DEVICES = [
  ['phone', Smartphone, 360, 'Telefon'],
  ['tablet', Tablet, 620, 'Planshet'],
  ['desktop', Monitor, null, 'Kompyuter'],
]

/* Wraps a demo in a frame you can resize to phone / tablet / desktop width. */
function Shell({ children, bg = '#e5e7eb' }) {
  const [dev, setDev] = useState('phone')
  const [, , width] = DEVICES.find((d) => d[0] === dev)
  return (
    <div className="flex min-h-full flex-col font-sans" style={{ background: bg }}>
      <div className="sticky top-0 z-20 flex justify-center gap-1 bg-black/70 p-2 backdrop-blur">
        {DEVICES.map(([k, I, , l]) => (
          <button key={k} onClick={() => setDev(k)} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${dev === k ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}>
            <I size={14} /> <span className="hidden @md:inline">{l}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-1 justify-center p-4">
        <div
          className={`@container w-full overflow-hidden bg-white shadow-2xl transition-[max-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${dev === 'phone' ? 'rounded-[28px] border-[6px] border-black' : dev === 'tablet' ? 'rounded-2xl border-[6px] border-black' : 'rounded-lg'}`}
          style={{ maxWidth: width ?? '100%' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/* ── 1. Yangiliklar portali ──────────────────────────────── */
export function NewsResponsive() {
  const news = [
    ['Iqtisodiyot', 'Toshkentda yangi texnopark ochildi', 'from-[#0ea5e9] to-[#1e3a8a]'],
    ['Sport', 'Terma jamoa navbatdagi g‘alabani qo‘lga kiritdi', 'from-[#22c55e] to-[#14532d]'],
    ['Madaniyat', 'Samarqandda xalqaro musiqa festivali', 'from-[#f59e0b] to-[#7c2d12]'],
    ['Texnologiya', 'Yoshlar uchun bepul IT kurslari boshlandi', 'from-[#a855f7] to-[#3b0764]'],
  ]
  return (
    <Shell>
      <div className="text-[#111827]">
        <header className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-lg font-black">Kun<span className="text-[#dc2626]">.news</span></span>
          <nav className="hidden gap-4 text-sm @2xl:flex">{['Siyosat', 'Iqtisodiyot', 'Sport', 'Madaniyat'].map((x) => <a key={x}>{x}</a>)}</nav>
          <span className="flex gap-3"><Search size={18} /><Menu size={18} className="@2xl:hidden" /></span>
        </header>
        <div className="grid gap-4 p-4 @2xl:grid-cols-[2fr_1fr]">
          <article>
            <div className="h-36 rounded-xl bg-gradient-to-br from-[#dc2626] to-[#450a0a] @md:h-48" />
            <p className="mt-3 text-xs font-bold uppercase text-[#dc2626]">Asosiy</p>
            <h2 className="mt-1 text-xl font-bold leading-snug @md:text-2xl">Yangi metro liniyasi yil oxirigacha ishga tushadi</h2>
          </article>
          <div className="grid gap-3 @md:grid-cols-2 @2xl:grid-cols-1">
            {news.map(([c, t, g]) => (
              <article key={t} className="flex gap-3">
                <div className={`h-16 w-20 shrink-0 rounded-lg bg-gradient-to-br ${g}`} />
                <div><p className="text-[10px] font-bold uppercase text-[#6b7280]">{c}</p><p className="text-sm font-semibold leading-snug">{t}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* ── 2. Onlayn do‘kon ────────────────────────────────────── */
export function StoreResponsive() {
  const [liked, setLiked] = useState({})
  const items = [['Ko‘ylak', '189 000', '#fecaca'], ['Shim', '249 000', '#bfdbfe'], ['Krossovka', '599 000', '#bbf7d0'], ['Sumka', '329 000', '#fde68a'], ['Kepka', '89 000', '#ddd6fe'], ['Kurtka', '799 000', '#fbcfe8']]
  return (
    <Shell bg="#fce7f3">
      <div className="text-[#18181b]">
        <header className="flex items-center justify-between px-4 py-3">
          <span className="font-black tracking-tight">MODA</span>
          <div className="hidden flex-1 px-6 @xl:block"><div className="flex items-center gap-2 rounded-full bg-[#f4f4f5] px-3 py-1.5 text-xs text-[#71717a]"><Search size={14} /> Qidirish...</div></div>
          <Menu size={18} />
        </header>
        <div className="mx-4 rounded-2xl bg-[#18181b] p-5 text-white @xl:p-8">
          <p className="text-xs text-[#f472b6]">Kuzgi kolleksiya</p>
          <p className="mt-1 text-2xl font-black @xl:text-4xl">−40% chegirma</p>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4 @xl:grid-cols-3">
          {items.map(([n, p, c]) => (
            <div key={n}>
              <div className="relative h-28 rounded-xl @xl:h-36" style={{ background: c }}>
                <button onClick={() => setLiked({ ...liked, [n]: !liked[n] })} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white">
                  <Heart size={14} className={liked[n] ? 'fill-[#ec4899] text-[#ec4899]' : ''} />
                </button>
              </div>
              <p className="mt-1.5 text-sm font-semibold">{n}</p><p className="text-xs text-[#71717a]">{p} so‘m</p>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

/* ── 3. Mehmonxona bron ──────────────────────────────────── */
export function HotelResponsive() {
  const [room, setRoom] = useState(1)
  const rooms = [['Standart', 65], ['Lyuks', 110], ['Oilaviy', 140]]
  return (
    <Shell bg="#e7e5e4">
      <div className="text-[#1c1917]">
        <div className="relative h-40 bg-gradient-to-br from-[#0c4a6e] via-[#0369a1] to-[#fbbf24] @xl:h-56">
          <div className="absolute bottom-4 left-4 text-white"><p className="text-xs opacity-80">Buxoro · Eski shahar</p><p className="text-2xl font-bold @xl:text-3xl">Silk Road Hotel</p></div>
        </div>
        <div className="grid gap-4 p-4 @2xl:grid-cols-[1fr_260px]">
          <div>
            <p className="flex items-center gap-1 text-sm"><Star size={14} className="fill-[#f59e0b] text-[#f59e0b]" /> 4.8 · 640 sharh</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">{[[Wifi, 'Wi-Fi'], [Coffee, 'Nonushta'], [Car, 'Avtoturargoh']].map(([I, t]) => <span key={t} className="flex items-center gap-1.5 rounded-full bg-[#f5f5f4] px-3 py-1.5"><I size={13} />{t}</span>)}</div>
            <div className="mt-4 grid gap-2 @md:grid-cols-3">
              {rooms.map(([n, p], i) => (
                <button key={n} onClick={() => setRoom(i)} className={`rounded-xl border-2 p-3 text-left ${room === i ? 'border-[#0369a1] bg-[#f0f9ff]' : 'border-[#e7e5e4]'}`}><p className="font-semibold">{n}</p><p className="text-sm text-[#0369a1]">${p} / tun</p></button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#e7e5e4] p-4">
            <p className="flex items-center gap-2 text-sm"><Calendar size={15} /> 12 – 15 noyabr · 3 tun</p>
            <p className="mt-3 text-2xl font-bold">${rooms[room][1] * 3}</p>
            <button className="mt-3 w-full rounded-xl bg-[#0369a1] py-2.5 text-sm font-semibold text-white">Bron qilish</button>
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* ── 4. Tibbiyot klinikasi ───────────────────────────────── */
export function ClinicResponsive() {
  const docs = [['Dr. Nodira A.', 'Kardiolog', '#99f6e4'], ['Dr. Botir S.', 'Stomatolog', '#bae6fd'], ['Dr. Laylo K.', 'Pediatr', '#fecdd3']]
  return (
    <Shell bg="#ccfbf1">
      <div className="text-[#134e4a]">
        <header className="flex items-center justify-between px-4 py-3"><span className="flex items-center gap-2 font-bold"><Stethoscope size={18} /> SogʻlomMed</span><Menu size={18} className="@2xl:hidden" /><nav className="hidden gap-4 text-sm @2xl:flex"><a>Xizmatlar</a><a>Shifokorlar</a><a>Aloqa</a></nav></header>
        <section className="grid items-center gap-4 px-4 py-4 @2xl:grid-cols-2">
          <div>
            <h1 className="text-2xl font-bold leading-tight @xl:text-4xl">Sog‘lig‘ingiz — ishonchli qo‘llarda</h1>
            <p className="mt-2 text-sm text-[#0f766e]">Onlayn navbat, 20+ mutaxassis va zamonaviy laboratoriya.</p>
            <button className="mt-4 w-full rounded-xl bg-[#0d9488] py-3 text-sm font-semibold text-white @md:w-auto @md:px-6">Navbatga yozilish</button>
          </div>
          <div className="grid h-32 place-items-center rounded-3xl bg-gradient-to-br from-[#5eead4] to-[#0d9488] text-6xl @2xl:h-44">🩺</div>
        </section>
        <section className="grid gap-3 p-4 @md:grid-cols-3">
          {docs.map(([n, r, c]) => (
            <div key={n} className="flex items-center gap-3 rounded-2xl bg-[#f0fdfa] p-3 @md:flex-col @md:text-center">
              <span className="h-12 w-12 shrink-0 rounded-full" style={{ background: c }} />
              <div><p className="text-sm font-semibold">{n}</p><p className="text-xs text-[#0f766e]">{r}</p></div>
            </div>
          ))}
        </section>
      </div>
    </Shell>
  )
}
