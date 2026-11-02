import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import { Reveal, CountUp, EASE } from '../components/Motion'

function Timeline({ title, items }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <div>
      <h3 className="text-sm font-semibold text-muted">{title}</h3>
      <ol ref={ref} className="relative mt-6">
        {/* track + the glowing line that fills as you scroll */}
        <span className="absolute bottom-5 left-[1.25rem] top-5 w-px bg-line-strong" aria-hidden="true" />
        <motion.span
          style={{ scaleY: fill }}
          className="absolute bottom-5 left-[calc(1.25rem-1px)] top-5 w-[3px] origin-top rounded-full bg-gradient-to-b from-accent via-lapis to-saffron shadow-[0_0_14px_var(--color-accent)]"
          aria-hidden="true"
        />
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-10 last:pb-0"
            >
              <span
                className={`relative z-10 grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold ${
                  last
                    ? 'bg-saffron text-[#0a0f2e] shadow-[0_0_0_6px_color-mix(in_oklab,var(--color-saffron)_20%,transparent)]'
                    : 'border border-line-strong bg-bg text-muted'
                }`}
              >
                {i + 1}
                {last && <span className="absolute inset-0 animate-ping rounded-full bg-saffron/40" aria-hidden="true" />}
              </span>
              <div className="pt-1.5">
                <p className="text-sm font-semibold text-accent">{item.year}</p>
                <h4 className="mt-1 font-display text-xl font-semibold tracking-tight">{item.title}</h4>
                <p className="mt-2 text-muted">{item.text}</p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={a.title} />

        <div className="mt-14 grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Reveal as="p" className="max-w-[36rem] text-lg leading-relaxed md:text-xl">
              {a.p1}
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-5 max-w-[36rem] leading-relaxed text-muted">
              {a.p2}
            </Reveal>

            <dl className="mt-12 grid grid-cols-3 gap-3">
              {a.stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={0.1 + i * 0.1}
                  className="panel flex flex-col-reverse rounded-3xl px-4 py-6 sm:px-6"
                >
                  <dt className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dt>
                  <dd className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                    <CountUp value={s.value} />
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Timeline title={a.pathTitle} items={a.timeline} />
        </div>
      </div>
    </section>
  )
}
