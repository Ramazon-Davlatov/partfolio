import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { FaGithub, FaTelegramPlane, FaInstagram } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import Rosette from '../components/Rosette'
import { LINKS, scrollToId } from '../links'
import { Magnetic } from '../components/Motion'

const EASE = [0.16, 1, 0.3, 1]

function RotatingRole({ roles }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    setI(0)
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles])

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* invisible copies reserve the width of the longest role */}
      {roles.map((r) => (
        <span key={r} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {r}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap text-accent"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Line({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <span className="anim-rise block" style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  // a soft light that follows the cursor across the hero
  const gx = useSpring(useMotionValue(-999), { stiffness: 80, damping: 20 })
  const gy = useSpring(useMotionValue(-999), { stiffness: 80, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(520px circle at ${gx}px ${gy}px, color-mix(in oklab, var(--color-accent) 13%, transparent), transparent 60%)`
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    gx.set(e.clientX - r.left)
    gy.set(e.clientY - r.top)
  }

  return (
    <section id="home" onPointerMove={onMove} className="relative flex flex-col justify-center px-5 pb-20 pt-32 md:px-10 md:pt-36 lg:min-h-[min(100svh,1000px)]">
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p style={{ animationDelay: '0.05s' }} className="anim-fade text-lg text-muted md:text-xl">
            {t.hero.hello}
          </p>

          <h1 className="mt-2 text-[clamp(3.4rem,11vw,8.25rem)] font-bold leading-[0.92] tracking-[-0.045em] [font-variation-settings:'opsz'_96]">
            <Line delay={0.1}>Ramazon</Line>
            <Line delay={0.2}>
              Davlatov<span className="text-saffron">.</span>
            </Line>
          </h1>

          <p style={{ animationDelay: '0.3s' }} className="anim-fade mt-6 font-display text-2xl font-medium tracking-tight md:text-3xl">
            <RotatingRole roles={t.hero.roles} />
          </p>

          <p className="mt-5 max-w-[34rem] text-base text-muted md:text-lg">
            {t.hero.lead}
          </p>

          <div style={{ animationDelay: '0.45s' }} className="anim-fade mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('projects')
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent shadow-[0_10px_30px_-10px_var(--color-accent)] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.primary}
              <ArrowDownRight size={18} className="transition-transform group-hover:rotate-[-45deg]" />
            </a>
            </Magnetic>
            <Magnetic>
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-text/5"
            >
              <FaTelegramPlane /> {t.hero.secondary}
            </a>
            </Magnetic>
          </div>

          <div style={{ animationDelay: '0.55s' }} className="anim-fade mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="inline-flex items-center gap-2.5 text-sm text-muted">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              {t.hero.status}
            </span>
            <span className="hidden h-4 w-px bg-line-strong sm:block" />
            <div className="flex items-center gap-1 text-muted">
              {[
                { href: LINKS.github, icon: FaGithub, label: 'GitHub' },
                { href: LINKS.telegram, icon: FaTelegramPlane, label: 'Telegram' },
                { href: LINKS.instagram, icon: FaInstagram, label: 'Instagram' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full text-lg transition-colors hover:bg-text/5 hover:text-text"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="order-first mx-auto w-[64vw] max-w-[440px] sm:w-[48vw] lg:order-none lg:w-full">
          <Rosette />
        </div>
      </div>
    </section>
  )
}
