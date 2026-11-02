import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { scrollToId } from '../links'

const SECTION_IDS = ['about', 'skills', 'services', 'projects', 'ai', 'contact']

export function StarMark({ className = '' }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden="true">
      <path
        d="M0-11 3.2-3.2 11 0 3.2 3.2 0 11-3.2 3.2-11 0-3.2-3.2Z"
        fill="var(--color-saffron)"
      />
      <path
        d="M-7.8-7.8 0-4.6 7.8-7.8 4.6 0 7.8 7.8 0 4.6-7.8 7.8-4.6 0Z"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  return (
    <button
      onClick={toggleTheme}
      aria-label={t.nav.theme}
      title={t.nav.theme}
      className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-text/5 hover:text-text"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid place-items-center"
        >
          {theme === 'dark' ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function LangSwitch({ size = 'sm' }) {
  const { lang, setLang, t } = useLanguage()
  return (
    <div role="group" aria-label={t.nav.lang} className="relative flex rounded-full bg-text/5 p-1">
      {['uz', 'ru'].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`relative rounded-full font-semibold uppercase transition-colors ${
            size === 'lg' ? 'px-5 py-2 text-sm' : 'px-3 py-1 text-xs'
          } ${lang === code ? 'text-on-accent' : 'text-muted hover:text-text'}`}
        >
          {lang === code && (
            <motion.span
              layoutId={`lang-pill-${size}`}
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative">{code}</span>
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['home', ...SECTION_IDS].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <header className="anim-fade fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${
            scrolled ? 'panel shadow-[0_10px_40px_-20px_rgb(0_0_0/0.5)]' : 'border border-transparent'
          }`}
        >
          <a href="#home" onClick={go('home')} className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
            <StarMark className="h-6 w-6" />
            Ramazon
          </a>

          <ul className="hidden items-center lg:flex">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={active === id ? 'true' : undefined}
                  className={`relative block px-3.5 py-2 text-sm font-medium transition-colors ${
                    active === id ? 'text-text' : 'text-muted hover:text-text'
                  }`}
                >
                  {t.nav[id]}
                  {active === id && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-saffron"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:block">
              <LangSwitch />
            </div>
            <ThemeToggle />
            <a
              href="#contact"
              onClick={go('contact')}
              className="hidden rounded-full bg-text px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 sm:block"
            >
              {t.nav.cta}
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full text-text hover:bg-text/5 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg/95 px-6 pb-10 pt-6 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-display text-lg font-bold">
                <StarMark className="h-6 w-6" /> Ramazon
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label={t.nav.close}
                className="grid h-10 w-10 place-items-center rounded-full bg-text/5"
                autoFocus
              >
                <X size={20} />
              </button>
            </div>
            <ul className="mt-12 flex flex-col gap-1">
              {SECTION_IDS.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    className={`block py-2 font-display text-4xl font-semibold tracking-tight ${
                      active === id ? 'text-text' : 'text-muted'
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between">
              <LangSwitch size="lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
