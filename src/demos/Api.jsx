import { useEffect, useRef, useState } from 'react'
import { Send, Bot, RefreshCw, TrendingUp, TrendingDown, Search, MapPin, Users, BookMarked, Sun, Cloud, CloudRain, CloudSun } from 'lucide-react'

// Demos simulate network latency so loading states are visible. No real requests are made.
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function useMounted() {
  const ref = useRef(true)
  useEffect(() => () => { ref.current = false }, [])
  return ref
}

/* ── 1. Telegram bot ─────────────────────────────────────── */
const BOT = {
  '/start': ['Assalomu alaykum! 👋 Men buyurtma botiman. Nima qilamiz?', ['📋 Menyu', '🚚 Yetkazish', '📞 Aloqa']],
  '📋 Menyu': ['Bugungi menyu:\n🍚 Osh — 45 000\n🥟 Somsa — 12 000\n🍵 Choy — 5 000', ['🛒 Buyurtma', '⬅️ Orqaga']],
  '🚚 Yetkazish': ['Shahar bo‘ylab 40 daqiqada, 100 000 so‘mdan yuqori buyurtmaga bepul.', ['⬅️ Orqaga']],
  '📞 Aloqa': ['☎️ +998 90 000 00 00\n📍 Registon ko‘chasi, 12', ['⬅️ Orqaga']],
  '🛒 Buyurtma': ['✅ Buyurtmangiz qabul qilindi! Operator 2 daqiqada bog‘lanadi.', ['/start']],
  '⬅️ Orqaga': ['Asosiy menyu:', ['📋 Menyu', '🚚 Yetkazish', '📞 Aloqa']],
}
export function TelegramApi() {
  const [msgs, setMsgs] = useState([])
  const [typing, setTyping] = useState(false)
  const [text, setText] = useState('')
  const box = useRef(null)
  const alive = useMounted()
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight, behavior: 'smooth' }) }, [msgs, typing])
  const send = async (t) => {
    if (!t.trim() || typing) return
    setMsgs((m) => [...m, { me: true, t }])
    setText('')
    setTyping(true)
    await wait(700)
    if (!alive.current) return
    const [reply, btns] = BOT[t] || ['Kechirasiz, tushunmadim 🤔 Tugmalardan foydalaning.', ['/start']]
    setMsgs((m) => [...m, { me: false, t: reply, btns }])
    setTyping(false)
  }
  const last = msgs[msgs.length - 1]
  return (
    <div className="flex h-full min-h-[440px] flex-col bg-[#0e1621] font-sans text-white">
      <div className="flex items-center gap-3 bg-[#17212b] px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2b9bf4]"><Bot size={18} /></span>
        <div><p className="text-sm font-semibold">OshMarkaz Bot</p><p className="text-xs text-[#6c8196]">{typing ? 'yozmoqda...' : 'bot'}</p></div>
      </div>
      <div ref={box} className="flex-1 space-y-2 overflow-y-auto bg-[#0e1621] p-4">
        {msgs.length === 0 && <button onClick={() => send('/start')} className="mx-auto block rounded-full bg-[#2b9bf4] px-6 py-2 text-sm font-semibold">BOSHLASH</button>}
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm ${m.me ? 'ml-auto rounded-br-sm bg-[#2b5278]' : 'rounded-bl-sm bg-[#182533]'}`}>{m.t}</div>
        ))}
        {typing && <div className="w-14 rounded-2xl bg-[#182533] px-3 py-2 text-center tracking-widest text-[#6c8196]">•••</div>}
      </div>
      {last?.btns && !typing && (
        <div className="grid grid-cols-2 gap-1.5 bg-[#17212b] p-2">
          {last.btns.map((b) => <button key={b} onClick={() => send(b)} className="rounded-lg bg-[#2b5278]/60 py-2 text-xs font-medium hover:bg-[#2b5278]">{b}</button>)}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); send(text) }} className="flex gap-2 bg-[#17212b] p-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Xabar yozing..." className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" />
        <button className="grid h-9 w-9 place-items-center text-[#2b9bf4]"><Send size={18} /></button>
      </form>
    </div>
  )
}

/* ── 2. Valyuta kurslari ─────────────────────────────────── */
const BASE = [['USD', 'AQSh dollari', '🇺🇸', 12850], ['EUR', 'Yevro', '🇪🇺', 13940], ['RUB', 'Rossiya rubli', '🇷🇺', 142], ['GBP', 'Funt sterling', '🇬🇧', 16310], ['CNY', 'Xitoy yuani', '🇨🇳', 1790]]
export function RatesApi() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState('')
  const alive = useMounted()
  const load = async () => {
    setLoading(true)
    await wait(900)
    if (!alive.current) return
    setData(BASE.map(([c, n, f, r]) => { const ch = +(Math.random() * 2 - 1).toFixed(2); return { c, n, f, r: Math.round(r * (1 + ch / 100)), ch } }))
    setTime(new Date().toLocaleTimeString('ru-RU'))
    setLoading(false)
  }
  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="min-h-full bg-[#f8fafc] p-6 font-sans text-[#0f172a]">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold">Valyuta kurslari</h1><p className="text-xs text-[#64748b]">{time ? `Yangilandi: ${time}` : 'Yuklanmoqda...'}</p></div>
        <button onClick={load} disabled={loading} className="flex items-center gap-1.5 rounded-xl bg-[#0f172a] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"><RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Yangilash</button>
      </div>
      <ul className="mt-5 space-y-2">
        {(loading || !data ? BASE.map(() => null) : data).map((d, i) => d ? (
          <li key={d.c} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
            <span className="text-2xl">{d.f}</span>
            <div className="flex-1"><p className="font-bold">{d.c}</p><p className="text-xs text-[#64748b]">{d.n}</p></div>
            <div className="text-right"><p className="font-bold tabular-nums">{d.r.toLocaleString('ru-RU')}</p>
              <p className={`flex items-center justify-end gap-1 text-xs font-semibold ${d.ch >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>{d.ch >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{d.ch > 0 ? '+' : ''}{d.ch}%</p></div>
          </li>
        ) : (
          <li key={i} className="flex animate-pulse items-center gap-3 rounded-2xl bg-white p-3"><span className="h-8 w-8 rounded-full bg-[#e2e8f0]" /><span className="h-4 flex-1 rounded bg-[#e2e8f0]" /><span className="h-4 w-16 rounded bg-[#e2e8f0]" /></li>
        ))}
      </ul>
      <p className="mt-4 text-center text-[10px] text-[#94a3b8]">Namuna ma’lumotlar · haqiqiy loyihada Markaziy bank API’siga ulanadi</p>
    </div>
  )
}

/* ── 3. Ob-havo ──────────────────────────────────────────── */
const CITIES = {
  Toshkent: [18, Sun, 'Quyoshli', '#f59e0b'],
  Samarqand: [15, CloudSun, 'Qisman bulutli', '#0ea5e9'],
  Buxoro: [20, Sun, 'Ochiq osmon', '#f97316'],
  Nukus: [9, Cloud, 'Bulutli', '#64748b'],
  'Farg‘ona': [12, CloudRain, 'Yomg‘ir', '#3b82f6'],
}
export function WeatherApi() {
  const [city, setCity] = useState('Toshkent')
  const [data, setData] = useState(null)
  const alive = useMounted()
  useEffect(() => {
    setData(null)
    wait(700).then(() => { if (alive.current) setData(CITIES[city]) })
  }, [city, alive])
  const [temp, Icon, desc, color] = data || [0, Sun, '', '#94a3b8']
  return (
    <div className="min-h-full p-6 font-sans text-white transition-colors duration-700" style={{ background: `linear-gradient(160deg, ${color}, #0f172a)` }}>
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(CITIES).map((c) => <button key={c} onClick={() => setCity(c)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${city === c ? 'bg-white text-[#0f172a]' : 'bg-white/15 hover:bg-white/25'}`}>{c}</button>)}
      </div>
      <div className="mt-8 text-center">
        <p className="flex items-center justify-center gap-1.5 text-sm opacity-80"><MapPin size={14} />{city}</p>
        {data ? (
          <>
            <Icon size={72} className="mx-auto mt-4" />
            <p className="mt-2 text-7xl font-black tabular-nums">{temp}°</p>
            <p className="opacity-80">{desc}</p>
          </>
        ) : <RefreshCw size={36} className="mx-auto mt-16 animate-spin opacity-70" />}
      </div>
      <div className="mt-8 grid grid-cols-5 gap-2">
        {['Du', 'Se', 'Ch', 'Pa', 'Ju'].map((d, i) => (
          <div key={d} className="rounded-2xl bg-white/10 py-3 text-center text-xs backdrop-blur">
            <p className="opacity-70">{d}</p><p className="mt-1 text-base font-bold">{data ? temp + ((i * 3) % 5) - 2 : '–'}°</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 4. GitHub profil qidiruv ────────────────────────────── */
const PROFILES = {
  mrdavlatovdev: { n: 'Ramazon Davlatov', b: 'Frontend dasturchi · React', r: 24, f: 58, l: 'O‘zbekiston', c: '#46d6cb' },
  torvalds: { n: 'Linus Torvalds', b: 'Linux yaratuvchisi', r: 8, f: 230000, l: 'Portland', c: '#f59e0b' },
  gaearon: { n: 'Dan Abramov', b: 'React jamoasi (sobiq)', r: 270, f: 90000, l: 'London', c: '#61dafb' },
}
export function GithubApi() {
  const [q, setQ] = useState('MrDavlatovdev')
  const [state, setState] = useState({ s: 'idle' })
  const alive = useMounted()
  const search = async (e) => {
    e?.preventDefault()
    setState({ s: 'load' })
    await wait(800)
    if (!alive.current) return
    const p = PROFILES[q.trim().toLowerCase()]
    setState(p ? { s: 'ok', p, u: q.trim() } : { s: 'err' })
  }
  return (
    <div className="min-h-full bg-[#0d1117] p-6 font-sans text-[#e6edf3]">
      <form onSubmit={search} className="flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#30363d] bg-[#010409] px-3"><Search size={16} className="text-[#7d8590]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="GitHub login" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none" />
        </div>
        <button className="rounded-lg bg-[#238636] px-4 text-sm font-semibold">Qidirish</button>
      </form>
      <p className="mt-2 text-xs text-[#7d8590]">Sinab ko‘ring: MrDavlatovdev, torvalds, gaearon</p>
      <div className="mt-6">
        {state.s === 'load' && <div className="animate-pulse rounded-xl border border-[#30363d] p-5"><div className="h-16 w-16 rounded-full bg-[#21262d]" /><div className="mt-4 h-4 w-1/2 rounded bg-[#21262d]" /><div className="mt-2 h-3 w-3/4 rounded bg-[#21262d]" /></div>}
        {state.s === 'err' && <p className="rounded-xl border border-[#f85149]/40 bg-[#f85149]/10 p-4 text-sm text-[#f85149]">404 — foydalanuvchi topilmadi</p>}
        {state.s === 'ok' && (
          <div className="rounded-xl border border-[#30363d] p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-full text-2xl font-black text-[#0d1117]" style={{ background: state.p.c }}>{state.p.n[0]}</span>
              <div><p className="text-lg font-bold">{state.p.n}</p><p className="text-sm text-[#7d8590]">@{state.u}</p></div>
            </div>
            <p className="mt-3 text-sm">{state.p.b}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#7d8590]">
              <span className="flex items-center gap-1"><Users size={14} /><b className="text-[#e6edf3]">{state.p.f.toLocaleString('ru-RU')}</b> kuzatuvchi</span>
              <span className="flex items-center gap-1"><BookMarked size={14} /><b className="text-[#e6edf3]">{state.p.r}</b> repo</span>
              <span className="flex items-center gap-1"><MapPin size={14} />{state.p.l}</span>
            </div>
          </div>
        )}
        {state.s === 'idle' && <p className="py-10 text-center text-sm text-[#7d8590]">Login kiriting va “Qidirish”ni bosing</p>}
      </div>
    </div>
  )
}
