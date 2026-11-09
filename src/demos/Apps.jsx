import { useEffect, useMemo, useState } from 'react'
import { Plus, Trash2, ArrowDownUp, ShoppingBag, Minus, Play, Pause, RotateCcw } from 'lucide-react'

/* ── 1. Vazifalar ro‘yxati ───────────────────────────────── */
export function TodoApp() {
  const [items, setItems] = useState([
    { id: 1, t: 'Dizaynni tasdiqlash', done: true },
    { id: 2, t: 'Bosh sahifani yozish', done: false },
    { id: 3, t: 'Mijozga yuborish', done: false },
  ])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')
  const shown = items.filter((i) => (filter === 'all' ? true : filter === 'done' ? i.done : !i.done))
  const add = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setItems([...items, { id: Date.now(), t: text.trim(), done: false }])
    setText('')
  }
  return (
    <div className="grid min-h-full place-items-center bg-gradient-to-br from-[#e0e7ff] to-[#fce7f3] p-6 font-sans">
      <div className="w-full max-w-sm rounded-3xl bg-white p-5 text-[#1e1b4b] shadow-xl">
        <h1 className="text-xl font-bold">Bugungi ishlar</h1>
        <p className="text-xs text-[#6366f1]">{items.filter((i) => !i.done).length} ta qoldi</p>
        <form onSubmit={add} className="mt-4 flex gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Yangi vazifa..." className="min-w-0 flex-1 rounded-xl bg-[#f1f5f9] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6366f1]" />
          <button className="grid h-9 w-9 place-items-center rounded-xl bg-[#6366f1] text-white"><Plus size={18} /></button>
        </form>
        <div className="mt-3 flex gap-1 text-xs">
          {[['all', 'Hammasi'], ['todo', 'Qilinadi'], ['done', 'Bajarildi']].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-3 py-1 ${filter === k ? 'bg-[#1e1b4b] text-white' : 'bg-[#f1f5f9]'}`}>{l}</button>
          ))}
        </div>
        <ul className="mt-3 space-y-1.5">
          {shown.map((i) => (
            <li key={i.id} className="group flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-[#f8fafc]">
              <input type="checkbox" checked={i.done} onChange={() => setItems(items.map((x) => (x.id === i.id ? { ...x, done: !x.done } : x)))} className="h-4 w-4 accent-[#6366f1]" />
              <span className={`flex-1 text-sm ${i.done ? 'text-[#94a3b8] line-through' : ''}`}>{i.t}</span>
              <button onClick={() => setItems(items.filter((x) => x.id !== i.id))} className="text-[#f43f5e] opacity-0 group-hover:opacity-100"><Trash2 size={15} /></button>
            </li>
          ))}
          {shown.length === 0 && <li className="py-4 text-center text-xs text-[#94a3b8]">Bo‘sh</li>}
        </ul>
      </div>
    </div>
  )
}

/* ── 2. Valyuta konvertori ───────────────────────────────── */
const RATES = { UZS: 1, USD: 12850, EUR: 13940, RUB: 142, KZT: 26 }
export function ConverterApp() {
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('UZS')
  const result = useMemo(() => ((Number(amount) || 0) * RATES[from]) / RATES[to], [amount, from, to])
  const sel = 'rounded-xl bg-[#0f172a] px-3 py-2.5 text-sm font-bold text-white outline-none'
  return (
    <div className="grid min-h-full place-items-center bg-[#020617] p-6 font-sans text-white">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-6">
        <p className="text-xs uppercase tracking-widest text-[#34d399]">Valyuta kalkulyatori</p>
        <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))} className="mt-4 w-full bg-transparent text-4xl font-bold outline-none" inputMode="decimal" />
        <div className="mt-4 flex items-center gap-2">
          <select value={from} onChange={(e) => setFrom(e.target.value)} className={`${sel} flex-1`}>{Object.keys(RATES).map((c) => <option key={c}>{c}</option>)}</select>
          <button onClick={() => { setFrom(to); setTo(from) }} className="grid h-10 w-10 place-items-center rounded-full bg-[#34d399] text-[#020617] transition hover:rotate-180"><ArrowDownUp size={16} /></button>
          <select value={to} onChange={(e) => setTo(e.target.value)} className={`${sel} flex-1`}>{Object.keys(RATES).map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div className="mt-6 rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-white/50">Natija</p>
          <p className="mt-1 break-all text-3xl font-bold text-[#34d399]">{result.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} <span className="text-base">{to}</span></p>
          <p className="mt-2 text-xs text-white/40">1 {from} = {(RATES[from] / RATES[to]).toLocaleString('ru-RU', { maximumFractionDigits: 4 })} {to}</p>
        </div>
      </div>
    </div>
  )
}

/* ── 3. Do‘kon savatchasi ────────────────────────────────── */
const PRODUCTS = [
  { id: 1, n: 'Simsiz quloqchin', p: 450000, e: '🎧' },
  { id: 2, n: 'Aqlli soat', p: 890000, e: '⌚' },
  { id: 3, n: 'Ryukzak', p: 320000, e: '🎒' },
  { id: 4, n: 'Termos krujka', p: 120000, e: '☕' },
]
export function ShopApp() {
  const [cart, setCart] = useState({})
  const change = (id, d) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + d) }))
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = PRODUCTS.reduce((s, p) => s + p.p * (cart[p.id] || 0), 0)
  return (
    <div className="min-h-full bg-[#f8fafc] p-6 font-sans text-[#0f172a]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Gadjet.uz</h1>
        <span className="relative"><ShoppingBag />{count > 0 && <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#f97316] text-[10px] font-bold text-white">{count}</span>}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 @2xl:grid-cols-4">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="grid h-20 place-items-center rounded-xl bg-[#f1f5f9] text-4xl">{p.e}</div>
            <p className="mt-2 text-sm font-semibold">{p.n}</p>
            <p className="text-xs text-[#64748b]">{p.p.toLocaleString('ru-RU')} so‘m</p>
            {cart[p.id] ? (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-[#fff7ed] p-1">
                <button onClick={() => change(p.id, -1)} className="grid h-7 w-7 place-items-center rounded-md bg-white"><Minus size={14} /></button>
                <span className="text-sm font-bold">{cart[p.id]}</span>
                <button onClick={() => change(p.id, 1)} className="grid h-7 w-7 place-items-center rounded-md bg-white"><Plus size={14} /></button>
              </div>
            ) : (
              <button onClick={() => change(p.id, 1)} className="mt-2 w-full rounded-lg bg-[#0f172a] py-1.5 text-xs font-semibold text-white">Savatga</button>
            )}
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 mt-5 flex items-center justify-between rounded-2xl bg-[#0f172a] p-4 text-white">
        <div><p className="text-xs text-white/60">Jami ({count} ta)</p><p className="text-lg font-bold">{total.toLocaleString('ru-RU')} so‘m</p></div>
        <button disabled={!count} className="rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-bold disabled:opacity-40">Buyurtma</button>
      </div>
    </div>
  )
}

/* ── 4. Pomodoro taymer ──────────────────────────────────── */
const MODES = { focus: ['Diqqat', 25 * 60, '#ef4444'], short: ['Qisqa tanaffus', 5 * 60, '#10b981'], long: ['Uzun tanaffus', 15 * 60, '#3b82f6'] }
export function PomodoroApp() {
  const [mode, setMode] = useState('focus')
  const [left, setLeft] = useState(MODES.focus[1])
  const [run, setRun] = useState(false)
  useEffect(() => {
    if (!run) return
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [run])
  const pick = (m) => { setMode(m); setLeft(MODES[m][1]); setRun(false) }
  const [label, total, color] = MODES[mode]
  const pct = 1 - left / total
  const R = 80, C = 2 * Math.PI * R
  return (
    <div className="grid min-h-full place-items-center p-6 font-sans text-white transition-colors duration-500" style={{ background: color }}>
      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="flex gap-1 rounded-full bg-black/15 p-1 text-xs">
          {Object.entries(MODES).map(([k, [l]]) => (
            <button key={k} onClick={() => pick(k)} className={`rounded-full px-3 py-1.5 ${mode === k ? 'bg-white font-semibold' : ''}`} style={mode === k ? { color } : undefined}>{l}</button>
          ))}
        </div>
        <div className="relative mt-6">
          <svg width="200" height="200" className="-rotate-90">
            <circle cx="100" cy="100" r={R} fill="none" stroke="rgb(255 255 255 / 0.2)" strokeWidth="10" />
            <circle cx="100" cy="100" r={R} fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} className="transition-[stroke-dashoffset] duration-1000 ease-linear" />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center"><p className="text-5xl font-bold tabular-nums">{String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}</p><p className="text-xs opacity-75">{label}</p></div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setRun(!run)} className="flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold" style={{ color }}>{run ? <><Pause size={18} /> Pauza</> : <><Play size={18} /> Boshlash</>}</button>
          <button onClick={() => pick(mode)} className="grid h-12 w-12 place-items-center rounded-full bg-black/15"><RotateCcw size={18} /></button>
        </div>
      </div>
    </div>
  )
}
