import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const SECTION_IDS = ['home', 'about', 'skills', 'services', 'projects', 'ai', 'contact']

function ThemeToggle({ theme, toggleTheme, className = '' }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-cursor="magnetic"
      className={`relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line text-muted transition-colors hover:border-green/50 hover:text-green ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid place-items-center"
        >
          {theme === 'dark' ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const LINKS = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }))

  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setVisible(y < lastY || y < 80)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-[30px] px-5 py-3 transition-colors duration-300 ${
          scrolled ? 'glass' : 'border border-transparent'
        }`}
      >
        <button
          onClick={() => scrollTo('home')}
          className="font-display text-lg font-semibold tracking-tight"
          data-cursor="magnetic"
        >
          R<span className="text-green">.</span>D
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.id} className="relative">
              <button
                onClick={() => scrollTo(link.id)}
                data-cursor="magnetic"
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === link.id ? 'text-bg' : 'text-muted hover:text-text'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-green"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center rounded-full border border-line p-1 font-mono text-xs">
            {['uz', 'ru'].map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                data-cursor="magnetic"
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  lang === code ? 'bg-green text-bg' : 'text-muted hover:text-text'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={() => scrollTo('contact')}
            data-cursor="magnetic"
            className="rounded-full border border-green/40 px-5 py-2 text-sm font-medium text-green transition-colors hover:bg-green hover:text-bg"
          >
            {t.nav.hire}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            className="text-2xl"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute inset-x-4 top-20 flex flex-col gap-1 rounded-[24px] p-3 md:hidden"
          >
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`rounded-xl px-4 py-3 text-left text-sm ${
                  active === link.id ? 'bg-green text-bg' : 'text-muted'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-1 flex items-center gap-2 border-t border-line pt-3">
              {['uz', 'ru'].map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`rounded-full px-3 py-1.5 font-mono text-xs uppercase ${
                    lang === code ? 'bg-green text-bg' : 'border border-line text-muted'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
