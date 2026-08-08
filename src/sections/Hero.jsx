import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaTelegramPlane, FaInstagram, FaArrowDown } from 'react-icons/fa'
import { useTilt } from '../hooks/useTilt'
import { useLanguage } from '../context/LanguageContext'
import OrbitAvatar from '../components/OrbitAvatar'

const NAME = 'Ramazon Davlatov'

function useTypewriter(words, speed = 70, pause = 1400) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = setTimeout(() => {
        setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)))
      }, deleting ? speed / 2 : speed)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

const letterVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.5 + i * 0.03, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const { t } = useLanguage()
  const typed = useTypewriter(t.hero.roles)
  const tilt = useTilt(6)

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center px-6 pt-32 pb-16 md:px-12">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
      <div className="flex w-full flex-col gap-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-sm text-green"
        >
          {t.hero.available}
        </motion.p>

<h1 className="font-display text-[8vw] font-semibold leading-none tracking-[-0.05em] md:text-[4.5vw]">          <span className="block overflow-hidden">
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </h1>

        <div className="font-display text-2xl text-muted md:text-4xl">
          {t.hero.iBuild}{' '}
          <span className="text-gradient">
            {typed}
            <span className="animate-pulse text-green">_</span>
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="max-w-xl text-muted"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            data-cursor="magnetic"
            className="glow-green rounded-full bg-green px-7 py-3 text-sm font-semibold text-bg transition-transform hover:scale-105"
          >
            {t.hero.talk}
          </a>
          <a
            href="https://github.com/MrDavlatovdev"
            target="_blank"
            rel="noreferrer"
            data-cursor="magnetic"
            className="rounded-full border border-line px-7 py-3 text-sm font-medium transition-colors hover:border-green/50 hover:text-green"
          >
            {t.hero.resume}
          </a>

          <div className="ml-2 flex items-center gap-3 text-lg text-muted">
            <a href="https://github.com/MrDavlatovdev" target="_blank" rel="noreferrer" data-cursor="magnetic" className="transition-colors hover:text-green">
              <FaGithub />
            </a>
            <a href="https://t.me/MrDavlatovdev" target="_blank" rel="noreferrer" data-cursor="magnetic" className="transition-colors hover:text-green">
              <FaTelegramPlane />
            </a>
            <a href="https://instagram.com/da.vlatov3061" target="_blank" rel="noreferrer" data-cursor="magnetic" className="transition-colors hover:text-green">
              <FaInstagram />
            </a>
          </div>
        </motion.div>

        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="glass mt-4 flex w-full max-w-md items-center justify-between rounded-[30px] px-6 py-5 transition-transform duration-200"
        >
          <div>
            <p className="font-mono text-xs text-muted">{t.hero.status}</p>
            <p className="text-sm font-medium text-green">{t.hero.openTo}</p>
          </div>
          <div className="h-2 w-2 animate-ping rounded-full bg-green" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="order-first md:order-none"
      >
        <OrbitAvatar tools={t.ai.tools} />
      </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <span className="font-mono text-[10px] tracking-widest">{t.hero.scroll}</span>
        <FaArrowDown />
      </motion.a>
    </section>
  )
}
