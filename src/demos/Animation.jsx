import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, Check, Loader2, Bell, Home, User, Settings, Sparkles, ArrowDown } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

/* ── 1. Skroll effektlari ────────────────────────────────── */
export function ScrollAnim() {
  const blocks = [
    ['Chapdan kirish', { x: -80 }, '#f43f5e'],
    ['O‘ngdan kirish', { x: 80 }, '#f59e0b'],
    ['Kattalashish', { scale: 0.6 }, '#10b981'],
    ['Aylanish', { rotate: -25, y: 40 }, '#3b82f6'],
    ['Pastdan ko‘tarilish', { y: 80 }, '#a855f7'],
  ]
  return (
    <div className="min-h-full bg-[#0a0a0a] px-6 py-10 font-sans text-white">
      <h1 className="text-center text-3xl font-black">Pastga skroll qiling</h1>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className="mt-3 flex justify-center text-white/50"><ArrowDown /></motion.div>
      <div className="mt-24 space-y-24 pb-24">
        {blocks.map(([t, from, c]) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, ...from }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto max-w-sm rounded-3xl p-8 text-center text-2xl font-black"
            style={{ background: c }}
          >
            {t}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── 2. Mikro-animatsiyalar ──────────────────────────────── */
export function MicroAnim() {
  const [liked, setLiked] = useState(false)
  const [on, setOn] = useState(false)
  const [state, setState] = useState('idle')
  const [bell, setBell] = useState(0)
  const send = () => {
    if (state !== 'idle') return
    setState('load')
    setTimeout(() => setState('done'), 1200)
    setTimeout(() => setState('idle'), 2600)
  }
  const tile = 'flex flex-col items-center justify-center gap-3 rounded-3xl bg-white p-6 shadow-sm'
  return (
    <div className="min-h-full bg-[#f1f5f9] p-6 font-sans text-[#0f172a]">
      <h1 className="text-xl font-bold">Har birini bosib ko‘ring</h1>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className={tile}>
          <motion.button whileTap={{ scale: 0.8 }} onClick={() => setLiked(!liked)} className="relative">
            <motion.span animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }} transition={{ duration: 0.4 }} className="block">
              <Heart size={40} className={liked ? 'fill-[#f43f5e] text-[#f43f5e]' : 'text-[#94a3b8]'} />
            </motion.span>
            <AnimatePresence>
              {liked && [0, 1, 2, 3, 4, 5].map((i) => (
                <motion.span key={i} initial={{ opacity: 1, x: 0, y: 0 }} animate={{ opacity: 0, x: Math.cos(i) * 34, y: Math.sin(i) * 34 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#f43f5e]" />
              ))}
            </AnimatePresence>
          </motion.button>
          <span className="text-xs text-[#64748b]">Yoqtirish</span>
        </div>
        <div className={tile}>
          <button onClick={() => setOn(!on)} className={`flex h-9 w-16 rounded-full p-1 transition-colors ${on ? 'justify-end bg-[#10b981]' : 'justify-start bg-[#cbd5e1]'}`}>
            <motion.span layout transition={{ type: 'spring', stiffness: 600, damping: 30 }} className="h-7 w-7 rounded-full bg-white shadow" />
          </button>
          <span className="text-xs text-[#64748b]">Kalit</span>
        </div>
        <div className={tile}>
          <motion.button layout onClick={send} className={`flex h-11 items-center justify-center rounded-full font-semibold text-white ${state === 'done' ? 'bg-[#10b981]' : 'bg-[#6366f1]'}`} style={{ width: state === 'idle' ? 120 : 44 }}>
            {state === 'idle' && 'Yuborish'}
            {state === 'load' && <Loader2 size={18} className="animate-spin" />}
            {state === 'done' && <Check size={18} />}
          </motion.button>
          <span className="text-xs text-[#64748b]">Tugma holatlari</span>
        </div>
        <div className={tile}>
          <motion.button key={bell} onClick={() => setBell(bell + 1)} animate={bell ? { rotate: [0, -20, 18, -12, 8, 0] } : {}} transition={{ duration: 0.6 }} className="relative">
            <Bell size={36} />
            {bell > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#f43f5e] text-[10px] font-bold text-white">{bell}</motion.span>}
          </motion.button>
          <span className="text-xs text-[#64748b]">Bildirishnoma</span>
        </div>
      </div>
    </div>
  )
}

/* ── 3. Sahifa o‘tishlari ────────────────────────────────── */
const PAGES = [
  { k: 'home', I: Home, t: 'Bosh sahifa', c: '#fb7185', body: 'Xush kelibsiz! Pastdagi menyudan sahifani almashtiring.' },
  { k: 'bell', I: Bell, t: 'Xabarlar', c: '#38bdf8', body: '3 ta yangi xabaringiz bor.' },
  { k: 'user', I: User, t: 'Profil', c: '#a3e635', body: 'Ramazon Davlatov · Frontend dasturchi' },
  { k: 'set', I: Settings, t: 'Sozlamalar', c: '#fbbf24', body: 'Til, mavzu va bildirishnomalar.' },
]
export function PageAnim() {
  const [[i, dir], setPage] = useState([0, 0])
  const go = (n) => setPage([n, n > i ? 1 : -1])
  const p = PAGES[i]
  return (
    <div className="grid min-h-full place-items-center bg-[#18181b] p-6 font-sans">
      <div className="relative flex h-[420px] w-full max-w-[280px] flex-col overflow-hidden rounded-[36px] border-[6px] border-black bg-white">
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={p.k}
              custom={dir}
              variants={{ enter: (d) => ({ x: d * 280, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d) => ({ x: d * -280, opacity: 0 }) }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 p-5"
            >
              <motion.div initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: 'spring' }} className="grid h-20 w-20 place-items-center rounded-3xl text-[#18181b]" style={{ background: p.c }}><p.I size={34} /></motion.div>
              <h2 className="mt-5 text-2xl font-black text-[#18181b]">{p.t}</h2>
              <p className="mt-2 text-sm text-[#52525b]">{p.body}</p>
              {[0, 1, 2].map((n) => (
                <motion.div key={n} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + n * 0.08 }} className="mt-3 h-10 rounded-xl bg-[#f4f4f5]" />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <nav className="flex justify-around border-t border-[#e4e4e7] py-2">
          {PAGES.map((x, n) => (
            <button key={x.k} onClick={() => go(n)} className="relative grid h-10 w-10 place-items-center text-[#18181b]">
              {n === i && <motion.span layoutId="page-pill" className="absolute inset-0 rounded-xl" style={{ background: x.c }} />}
              <x.I size={18} className="relative" />
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

/* ── 4. 3D karta va parallaks ────────────────────────────── */
export function TiltAnim() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 200, damping: 20 })
  const gx = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const glare = useTransform(gx, (v) => `radial-gradient(circle at ${v} 30%, rgb(255 255 255 / 0.45), transparent 50%)`)
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <div onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0) }} className="grid min-h-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_center,#312e81,#020617)] p-6 font-sans [perspective:900px]">
      {[...Array(14)].map((_, n) => (
        <motion.span key={n} className="absolute h-1.5 w-1.5 rounded-full bg-white/60" style={{ left: `${(n * 37) % 100}%`, top: `${(n * 53) % 100}%` }} animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3 + (n % 4), repeat: Infinity, delay: n * 0.2 }} />
      ))}
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative h-64 w-48 rounded-3xl bg-gradient-to-br from-[#f472b6] via-[#a855f7] to-[#3b82f6] p-5 text-white shadow-[0_30px_80px_-20px_#a855f7]">
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-3xl" />
        <div style={{ transform: 'translateZ(50px)' }}><Sparkles size={28} /></div>
        <p style={{ transform: 'translateZ(70px)' }} className="absolute bottom-12 left-5 text-2xl font-black">Premium</p>
        <p style={{ transform: 'translateZ(40px)' }} className="absolute bottom-5 left-5 text-xs opacity-80">Sichqonchani yurgizing</p>
      </motion.div>
    </div>
  )
}
