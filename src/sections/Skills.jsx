import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Check, MousePointerClick } from 'lucide-react'
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaMobileAlt } from 'react-icons/fa'
import { SiJavascript, SiTailwindcss, SiFramer, SiVite } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import { EASE, Reveal } from '../components/Motion'

const GROUPS = [
  [
    { name: 'HTML', icon: FaHtml5, color: '#e34f26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#2965f1' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f0d43a' },
    { name: 'React', icon: FaReact, color: '#4fd1ef', spin: true },
  ],
  [
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
    { name: 'Framer Motion', icon: SiFramer, color: '#c084fc' },
    { name: 'Responsive', icon: FaMobileAlt, color: '#46d6cb' },
  ],
  [
    { name: 'Git', icon: FaGitAlt, color: '#f05033' },
    { name: 'GitHub', icon: FaGithub, color: 'currentColor' },
    { name: 'Vite', icon: SiVite, color: '#a78bfa' },
  ],
]

// One flat list, so the dialog can step through every skill with prev / next.
const ALL = GROUPS.flatMap((items, gi) => items.map((s) => ({ ...s, group: gi })))

const tint = (color) => (color === 'currentColor' ? 'var(--color-text)' : color)

const card = {
  hidden: { opacity: 0, y: 50, rotateX: -12 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: EASE, staggerChildren: 0.07, delayChildren: 0.2 } },
}
const chip = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

function SkillDialog({ index, onClose, onStep }) {
  const { t } = useLanguage()
  const s = t.skills
  const skill = ALL[index]
  const info = s.details[skill.name]
  const Icon = skill.icon
  const color = tint(skill.color)
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onStep])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label={s.close}
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#050818]/60 backdrop-blur-md"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-dialog-title"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-line-strong bg-surface shadow-[0_40px_120px_-30px_rgb(0_0_0/0.7)]"
      >
        {/* brand glow */}
        <motion.div
          key={skill.name + '-glow'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: color }}
          aria-hidden="true"
        />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex items-center gap-4"
              >
                <motion.span
                  initial={{ rotate: -20, scale: 0.6 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-line bg-bg/60 text-4xl"
                  style={{ color }}
                  aria-hidden="true"
                >
                  <Icon />
                </motion.span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{s.groups[skill.group].name}</p>
                  <h3 id="skill-dialog-title" className="font-display text-3xl font-bold tracking-tight">
                    {skill.name}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={s.close}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-text/5 text-muted transition-colors hover:bg-text/10 hover:text-text"
            >
              <X size={18} />
            </button>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={skill.name + '-body'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h4 className="mt-7 text-sm font-semibold text-accent">{s.whatTitle}</h4>
              <p className="mt-2 leading-relaxed">{info.what}</p>

              <h4 className="mt-6 text-sm font-semibold text-accent">{s.useTitle}</h4>
              <ul className="mt-3 flex flex-col gap-2.5">
                {info.use.map((line, i) => (
                  <motion.li
                    key={line}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: EASE }}
                    className="flex items-start gap-3 text-muted"
                  >
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ background: `color-mix(in oklab, ${color} 20%, transparent)`, color }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {line}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* step through every skill */}
          <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
            <button
              type="button"
              onClick={() => onStep(-1)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-text/5 hover:text-text"
            >
              <ChevronLeft size={16} /> {s.prev}
            </button>
            <div className="flex gap-1.5" aria-hidden="true">
              {ALL.map((x, i) => (
                <span
                  key={x.name}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-accent' : 'w-1.5 bg-line-strong'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => onStep(1)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-text/5 hover:text-text"
            >
              {s.next} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(null)
  const lastTrigger = useRef(null)

  const openSkill = (name, e) => {
    lastTrigger.current = e.currentTarget
    setOpen(ALL.findIndex((s) => s.name === name))
  }
  const close = useRef(() => {
    setOpen(null)
    // give focus back to the chip that opened the dialog
    requestAnimationFrame(() => lastTrigger.current?.focus())
  }).current
  const step = useRef((d) => setOpen((i) => (i === null ? i : (i + d + ALL.length) % ALL.length))).current

  return (
    <section id="skills" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={t.skills.title} />
        <Reveal as="p" className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
          <MousePointerClick size={16} className="text-saffron" /> {t.skills.hint}
        </Reveal>

        <motion.div
          className="mt-10 grid gap-4 [perspective:1200px] md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {GROUPS.map((items, gi) => {
            const g = t.skills.groups[gi]
            return (
              <motion.div key={gi} variants={card} className="panel flex flex-col rounded-[28px] p-6 md:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{g.name}</h3>
                  <span className="font-display text-sm font-semibold text-muted">{String(items.length).padStart(2, '0')}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{g.note}</p>
                <ul className="mt-6 flex flex-col gap-2">
                  {items.map(({ name, icon: Icon, color, spin }) => (
                    <motion.li key={name} variants={chip}>
                      <button
                        type="button"
                        onClick={(e) => openSkill(name, e)}
                        aria-haspopup="dialog"
                        className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-line bg-bg/40 px-4 py-3 text-left transition-[border-color,transform] duration-300 hover:translate-x-1.5 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron active:scale-[0.98]"
                      >
                        {/* brand-colored wash slides in on hover */}
                        <span
                          className="absolute inset-0 origin-left scale-x-0 opacity-15 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                          style={{ background: `linear-gradient(90deg, ${tint(color)}, transparent)` }}
                          aria-hidden="true"
                        />
                        <Icon
                          className={`relative text-xl transition-transform duration-500 group-hover:scale-125 ${
                            spin ? 'group-hover:rotate-180' : 'group-hover:-rotate-12'
                          }`}
                          style={{ color }}
                          aria-hidden="true"
                        />
                        <span className="relative flex-1 font-medium">{name}</span>
                        <ChevronRight
                          size={16}
                          className="relative text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && <SkillDialog index={open} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  )
}
