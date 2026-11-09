import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Lock, RotateCw, MousePointerClick } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { DEMOS } from '../demos'
import { scrollToId } from '../links'

const EASE = [0.16, 1, 0.3, 1]

export default function ServiceDialog({ index, icon: Icon, onClose }) {
  const { t, lang } = useLanguage()
  const s = t.services
  const item = s.items[index]
  const demos = DEMOS[index]
  const [cur, setCur] = useState(0)
  const [reload, setReload] = useState(0)
  const closeRef = useRef(null)
  const stageRef = useRef(null)
  const demo = demos[cur]
  const Demo = demo.C

  const step = (dir) => setCur((c) => (c + dir + demos.length) % demos.length)

  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      // arrows switch samples, unless the visitor is typing inside a sample
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return
      if (e.key === 'ArrowRight') setCur((c) => (c + 1) % demos.length)
      if (e.key === 'ArrowLeft') setCur((c) => (c - 1 + demos.length) % demos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, demos.length])

  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0 })
  }, [cur, reload])

  const order = () => {
    onClose()
    setTimeout(() => scrollToId('contact'), 50)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button type="button" aria-label={s.close} tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default bg-[#050818]/70 backdrop-blur-md" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-dialog-title"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
        className="relative flex h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] border border-line-strong bg-surface shadow-[0_40px_120px_-30px_rgb(0_0_0/0.7)] sm:h-[min(90svh,860px)] sm:rounded-[32px]"
      >
        {/* header */}
        <div className="flex items-start gap-4 px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lapis text-white">
            <Icon size={22} strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 id="service-dialog-title" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{item.title}</h3>
            <p className="mt-0.5 text-sm text-muted">{item.text}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={s.close} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-text/5 text-muted transition-colors hover:bg-text/10 hover:text-text">
            <X size={18} />
          </button>
        </div>

        {/* sample tabs */}
        <div className="px-5 sm:px-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
            {s.demosTitle} · {demos.length}
          </p>
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-3 [scrollbar-width:none]" role="tablist">
            {demos.map((x, i) => (
              <button
                key={x.url}
                role="tab"
                aria-selected={cur === i}
                onClick={() => setCur(i)}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cur === i ? 'text-on-accent' : 'text-muted hover:bg-text/5 hover:text-text'}`}
              >
                {cur === i && <motion.span layoutId="demo-tab" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
                <span className="relative font-display text-xs opacity-70">{String(i + 1).padStart(2, '0')}</span>
                <span className="relative whitespace-nowrap">{x.name[lang]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* browser frame */}
        <div className="mx-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-line-strong bg-bg sm:mx-7">
          <div className="flex items-center gap-3 border-b border-line bg-bg-2 px-3 py-2">
            <div className="hidden gap-1.5 sm:flex" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-text/5 px-3 py-1 text-xs text-muted">
              <Lock size={11} className="shrink-0" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={demo.url} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="truncate">
                  {demo.url}
                </motion.span>
              </AnimatePresence>
            </div>
            <button type="button" onClick={() => setReload((r) => r + 1)} aria-label="Reload" className="grid h-7 w-7 place-items-center rounded-full text-muted hover:bg-text/5 hover:text-text">
              <RotateCw size={14} />
            </button>
            <span className="hidden items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> {s.live}
            </span>
          </div>

          <div ref={stageRef} className="@container relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${index}-${cur}-${reload}`}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="h-full"
              >
                <Demo />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* footer */}
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-7">
          <p className="flex min-w-0 flex-1 items-start gap-2 text-sm text-muted">
            <MousePointerClick size={16} className="mt-0.5 shrink-0 text-saffron" />
            <span>{demo.desc[lang]}</span>
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => step(-1)} aria-label={s.prev} className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:bg-text/5 hover:text-text">
              <ChevronLeft size={18} />
            </button>
            <span className="w-10 text-center font-display text-sm font-semibold tabular-nums text-muted">
              {cur + 1}/{demos.length}
            </span>
            <button type="button" onClick={() => step(1)} aria-label={s.next} className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:bg-text/5 hover:text-text">
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={order} className="group ml-auto inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5 sm:ml-2">
              {s.order} <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
