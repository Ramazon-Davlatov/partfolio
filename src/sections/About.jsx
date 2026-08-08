import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const STAT_VALUES = [1, 6, 9]

function Counter({ value }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          const duration = 1000
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            setCount(Math.floor(p * value))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.6 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [started, value])

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-gradient md:text-5xl">
      {count}+
    </span>
  )
}

export default function About() {
  const { t } = useLanguage()
  const STATS = t.about.stats.map((s, i) => ({ ...s, value: STAT_VALUES[i] }))
  const TIMELINE = t.about.timeline

  return (
    <section id="about" className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-green"
        >
          {t.about.eyebrow}
        </motion.p>

        <div className="mt-6 grid gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              {t.about.title}
            </h2>
            <p className="mt-6 text-muted">{t.about.p1}</p>
            <p className="mt-4 text-muted">{t.about.p2}</p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <Counter value={s.value} />
                  <p className="mt-1 text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative flex flex-col gap-8 border-l border-line pl-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[2.6rem] top-1 h-3 w-3 rounded-full border-2 border-green bg-bg" />
                <p className="font-mono text-xs text-green">{item.year}</p>
                <h3 className="mt-1 font-display text-lg font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
