import { useEffect, useState } from 'react'
import { Coffee, Star, ArrowRight, Check, Dumbbell, Flame, Clock, GraduationCap, Users, Award, Zap, Shield, BarChart3, MapPin, Phone } from 'lucide-react'

/* ── 1. Qahvaxona ─────────────────────────────────────────── */
export function CoffeeLanding() {
  const menu = [
    { n: 'Kapuchino', p: '28 000', d: 'Yumshoq sut ko‘pigi bilan' },
    { n: 'Latte', p: '30 000', d: 'Vanil yoki karamel bilan' },
    { n: 'Espresso', p: '18 000', d: 'Klassik, kuchli ta’m' },
    { n: 'Raf', p: '34 000', d: 'Qaymoqli va shirin' },
  ]
  return (
    <div className="min-h-full bg-[#f6efe6] font-serif text-[#3b2417]">
      <nav className="flex items-center justify-between px-6 py-4">
        <span className="flex items-center gap-2 text-lg font-bold"><Coffee size={20} /> Bodom Coffee</span>
        <span className="hidden gap-5 text-sm @lg:flex"><a>Menyu</a><a>Biz haqimizda</a><a>Manzil</a></span>
      </nav>
      <section className="px-6 pb-10 pt-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#a0704a]">Samarqand · 2019 yildan</p>
        <h1 className="mx-auto mt-3 max-w-md text-4xl font-bold leading-tight @xl:text-5xl">Har bir qultumda iliqlik</h1>
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm text-[#7a5a44]">Yangi qovurilgan donlar, uyday shinam muhit va eng mazali shirinliklar.</p>
        <button className="mt-6 rounded-full bg-[#3b2417] px-6 py-3 font-sans text-sm font-semibold text-[#f6efe6] transition hover:scale-105">Stol band qilish</button>
        <div className="mx-auto mt-8 grid h-40 max-w-md place-items-center rounded-[40px] bg-gradient-to-br from-[#c8916a] via-[#8b5a3c] to-[#3b2417] text-7xl shadow-xl">☕</div>
      </section>
      <section className="bg-white/60 px-6 py-8">
        <h2 className="text-center text-2xl font-bold">Menyu</h2>
        <div className="mt-5 grid gap-3 font-sans @xl:grid-cols-2">
          {menu.map((m) => (
            <div key={m.n} className="flex items-center justify-between rounded-2xl bg-[#f6efe6] p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <div><p className="font-semibold">{m.n}</p><p className="text-xs text-[#7a5a44]">{m.d}</p></div>
              <span className="font-bold text-[#a0704a]">{m.p}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-wrap items-center justify-center gap-6 px-6 py-8 font-sans text-sm text-[#7a5a44]">
        <span className="flex items-center gap-1.5"><Star size={16} className="fill-[#e0a64b] text-[#e0a64b]" /> 4.9 · 1 200+ sharh</span>
        <span className="flex items-center gap-1.5"><MapPin size={16} /> Registon ko‘chasi, 12</span>
        <span className="flex items-center gap-1.5"><Clock size={16} /> 08:00 – 23:00</span>
      </section>
    </div>
  )
}

/* ── 2. Fintech / SaaS ───────────────────────────────────── */
export function SaasLanding() {
  const [yearly, setYearly] = useState(true)
  const plans = [
    { n: 'Start', m: 0, f: ['1 ta hisob', 'Asosiy hisobotlar'] },
    { n: 'Biznes', m: 19, f: ['10 ta hisob', 'Tahlil paneli', 'Eksport'], hot: true },
    { n: 'Korporativ', m: 49, f: ['Cheksiz hisob', 'API kirish', 'Shaxsiy menejer'] },
  ]
  return (
    <div className="relative min-h-full overflow-hidden bg-[#07071a] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-[30rem] -translate-x-1/2 rounded-full bg-[#7c3aed]/40 blur-[90px]" />
      <nav className="relative flex items-center justify-between px-6 py-4 text-sm">
        <span className="flex items-center gap-2 font-bold"><Zap size={18} className="text-[#a78bfa]" /> Hisobchi</span>
        <button className="rounded-full border border-white/20 px-4 py-1.5">Kirish</button>
      </nav>
      <section className="relative grid items-center gap-8 px-6 py-8 @2xl:grid-cols-2">
        <div>
          <span className="rounded-full border border-[#a78bfa]/40 bg-[#a78bfa]/10 px-3 py-1 text-xs text-[#c4b5fd]">✦ Yangi: AI tahlil</span>
          <h1 className="mt-4 text-4xl font-bold leading-tight">Biznes moliyasi <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">bir oynada</span></h1>
          <p className="mt-3 text-sm text-white/60">Daromad, xarajat va soliqlarni avtomatik hisoblang. 5 daqiqada ulanish.</p>
          <div className="mt-6 flex gap-3">
            <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#07071a]">Bepul boshlash</button>
            <button className="rounded-xl border border-white/20 px-5 py-2.5 text-sm">Demo</button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <div className="flex justify-between text-xs text-white/50"><span>Oylik daromad</span><BarChart3 size={14} /></div>
          <p className="mt-1 text-2xl font-bold">$48 290 <span className="text-sm text-[#4ade80]">+12%</span></p>
          <div className="mt-4 flex h-24 items-end gap-1.5">
            {[40, 65, 45, 80, 60, 90, 75, 100].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#7c3aed] to-[#22d3ee]" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </section>
      <section className="relative px-6 py-8">
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className={yearly ? 'text-white/50' : ''}>Oylik</span>
          <button onClick={() => setYearly(!yearly)} className="relative h-6 w-11 rounded-full bg-white/15">
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-[#a78bfa] transition-all ${yearly ? 'left-6' : 'left-1'}`} />
          </button>
          <span className={yearly ? '' : 'text-white/50'}>Yillik <span className="text-[#4ade80]">−20%</span></span>
        </div>
        <div className="mt-6 grid gap-3 @2xl:grid-cols-3">
          {plans.map((p) => (
            <div key={p.n} className={`rounded-2xl border p-5 ${p.hot ? 'border-[#a78bfa] bg-[#a78bfa]/10' : 'border-white/10'}`}>
              <p className="text-sm text-white/60">{p.n}</p>
              <p className="mt-1 text-3xl font-bold">${yearly ? Math.round(p.m * 0.8) : p.m}<span className="text-sm font-normal text-white/50">/oy</span></p>
              <ul className="mt-4 space-y-2 text-sm">{p.f.map((f) => <li key={f} className="flex items-center gap-2"><Check size={14} className="text-[#4ade80]" />{f}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ── 3. Fitness zal ──────────────────────────────────────── */
export function GymLanding() {
  const days = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh']
  const [day, setDay] = useState(0)
  const classes = [
    [['07:00', 'CrossFit'], ['18:00', 'Boks'], ['20:00', 'Yoga']],
    [['08:00', 'Pilates'], ['19:00', 'HIIT']],
    [['07:00', 'CrossFit'], ['18:30', 'Stretching'], ['20:00', 'Boks']],
    [['09:00', 'Zumba'], ['19:00', 'Kuch mashqi']],
    [['07:00', 'HIIT'], ['18:00', 'Yoga'], ['20:00', 'CrossFit']],
    [['10:00', 'Oilaviy mashg‘ulot']],
  ]
  return (
    <div className="min-h-full bg-[#0b0b0b] font-sans text-white">
      <nav className="flex items-center justify-between px-6 py-4">
        <span className="flex items-center gap-2 text-lg font-black italic"><Dumbbell size={20} className="text-[#c6ff00]" /> TEMIR</span>
        <button className="bg-[#c6ff00] px-4 py-1.5 text-xs font-black uppercase text-black">A’zo bo‘lish</button>
      </nav>
      <section className="px-6 py-8">
        <h1 className="text-5xl font-black uppercase italic leading-[0.9] @xl:text-7xl">Kuchingni<br /><span className="text-[#c6ff00]">kashf et.</span></h1>
        <p className="mt-4 max-w-sm text-sm text-white/60">24/7 ochiq zal, 15+ trener va har kuni guruh mashg‘ulotlari.</p>
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          {[['2 500+', 'a’zo'], ['15', 'trener'], ['24/7', 'ochiq']].map(([a, b]) => (
            <div key={b} className="border border-white/10 py-3"><p className="text-2xl font-black text-[#c6ff00]">{a}</p><p className="text-xs uppercase text-white/50">{b}</p></div>
          ))}
        </div>
      </section>
      <section className="bg-[#c6ff00] px-6 py-8 text-black">
        <h2 className="flex items-center gap-2 text-2xl font-black uppercase italic"><Flame size={22} /> Jadval</h2>
        <div className="mt-4 flex gap-1.5">
          {days.map((d, i) => (
            <button key={d} onClick={() => setDay(i)} className={`flex-1 py-2 text-xs font-bold ${day === i ? 'bg-black text-[#c6ff00]' : 'bg-black/10'}`}>{d}</button>
          ))}
        </div>
        <ul className="mt-3 space-y-1.5">
          {classes[day].map(([t, n]) => (
            <li key={t + n} className="flex justify-between bg-black/10 px-4 py-3 text-sm font-bold"><span>{t}</span><span>{n}</span></li>
          ))}
        </ul>
      </section>
      <section className="px-6 py-8">
        <div className="border-2 border-[#c6ff00] p-5">
          <p className="text-xs uppercase text-[#c6ff00]">Oylik abonement</p>
          <p className="mt-1 text-4xl font-black">350 000 <span className="text-base">so‘m</span></p>
          <p className="mt-1 text-sm text-white/60">Birinchi mashg‘ulot — bepul</p>
        </div>
      </section>
    </div>
  )
}

/* ── 4. IT kurs ──────────────────────────────────────────── */
export function CourseLanding() {
  const [left, setLeft] = useState(3 * 86400 + 7 * 3600 + 25 * 60)
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const d = Math.floor(left / 86400), h = Math.floor((left % 86400) / 3600), m = Math.floor((left % 3600) / 60), s = left % 60
  const [sent, setSent] = useState(false)
  return (
    <div className="min-h-full bg-[#eef4ff] font-sans text-[#0f1e3d]">
      <nav className="flex items-center justify-between px-6 py-4">
        <span className="flex items-center gap-2 font-bold"><GraduationCap size={20} className="text-[#2563eb]" /> KodAkademiya</span>
        <span className="text-xs text-[#2563eb]">+998 90 000 00 00</span>
      </nav>
      <section className="px-6 py-6">
        <span className="rounded-full bg-[#2563eb]/10 px-3 py-1 text-xs font-semibold text-[#2563eb]">Frontend kursi · 6 oy</span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight @xl:text-4xl">Noldan <span className="text-[#2563eb]">frontend dasturchi</span>gacha</h1>
        <p className="mt-3 text-sm text-[#475a80]">HTML, CSS, JavaScript va React. Real loyihalar, mentor va ishga joylashishda yordam.</p>
        <div className="mt-5 flex gap-2">
          {[[d, 'kun'], [h, 'soat'], [m, 'daq'], [s, 'son']].map(([v, l]) => (
            <div key={l} className="w-16 rounded-xl bg-white py-2 text-center shadow-sm">
              <p className="text-xl font-extrabold tabular-nums text-[#2563eb]">{String(v).padStart(2, '0')}</p>
              <p className="text-[10px] uppercase text-[#475a80]">{l}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-[#475a80]">Chegirma tugashiga qoldi</p>
      </section>
      <section className="grid gap-3 px-6 py-4 @xl:grid-cols-3">
        {[[Users, '1 800+', 'bitiruvchi'], [Award, '87%', 'ishga joylashgan'], [Star, '4.9', 'o‘rtacha baho']].map(([I, a, b]) => (
          <div key={b} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <I className="text-[#2563eb]" size={22} /><div><p className="font-extrabold">{a}</p><p className="text-xs text-[#475a80]">{b}</p></div>
          </div>
        ))}
      </section>
      <section className="px-6 py-6">
        <div className="rounded-3xl bg-[#2563eb] p-6 text-white">
          {sent ? (
            <p className="flex items-center gap-2 font-semibold"><Check /> Rahmat! Tez orada qo‘ng‘iroq qilamiz.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-2">
              <p className="font-bold">Bepul sinov darsiga yoziling</p>
              <input required placeholder="Ismingiz" className="w-full rounded-xl px-4 py-2.5 text-sm text-[#0f1e3d] outline-none" />
              <input required placeholder="Telefon raqam" className="w-full rounded-xl px-4 py-2.5 text-sm text-[#0f1e3d] outline-none" />
              <button className="w-full rounded-xl bg-[#facc15] py-2.5 text-sm font-bold text-[#0f1e3d]">Yozilish</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

/* ── 5. Osh markazi ──────────────────────────────────────── */
export function PlovLanding() {
  const [qty, setQty] = useState(2)
  return (
    <div className="min-h-full bg-[#fffaf0] font-sans text-[#2a1a0a]">
      <nav className="flex items-center justify-between bg-[#0f5c4a] px-6 py-4 text-[#fde9b8]">
        <span className="font-serif text-xl font-bold">Ko‘hna Osh</span>
        <a className="flex items-center gap-1.5 text-xs"><Phone size={14} /> 1234</a>
      </nav>
      <section className="relative overflow-hidden bg-[#0f5c4a] px-6 pb-12 pt-4 text-[#fde9b8]">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border-[18px] border-dashed border-[#e0a43a]/30" />
        <h1 className="relative font-serif text-4xl font-bold leading-tight @xl:text-5xl">To‘y oshi —<br />har kuni, issiq holda</h1>
        <p className="relative mt-3 max-w-xs text-sm text-[#fde9b8]/75">Qozonda, o‘tinda, ustozlar retsepti bo‘yicha. 40 daqiqada yetkazib beramiz.</p>
      </section>
      <section className="-mt-6 px-6">
        <div className="relative rounded-3xl bg-white p-5 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e0a43a] to-[#b45309] text-4xl">🍚</div>
            <div className="flex-1"><p className="font-serif text-lg font-bold">Samarqand oshi</p><p className="text-xs text-[#7a6040]">Bir porsiya · 450 g</p><p className="mt-1 font-bold text-[#0f5c4a]">45 000 so‘m</p></div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 rounded-full bg-[#fffaf0] px-2 py-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-8 w-8 rounded-full bg-white font-bold shadow">−</button>
              <span className="w-4 text-center font-bold tabular-nums">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-8 w-8 rounded-full bg-white font-bold shadow">+</button>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-[#0f5c4a] px-5 py-2.5 text-sm font-semibold text-white">
              {(qty * 45000).toLocaleString('ru-RU')} so‘m <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
      <section className="grid gap-3 px-6 py-8 @xl:grid-cols-3">
        {[[Flame, 'O‘tinda pishiriladi'], [Clock, '40 daqiqada yetkazish'], [Shield, 'Halol va toza']].map(([I, t]) => (
          <div key={t} className="flex items-center gap-3 rounded-2xl border border-[#e0a43a]/30 p-4 text-sm font-semibold"><I size={20} className="text-[#b45309]" />{t}</div>
        ))}
      </section>
    </div>
  )
}
