import { motion } from 'framer-motion'
import { LayoutTemplate, UserRound, Atom, Smartphone, Sparkles, PlugZap, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import { EASE } from '../components/Motion'
import { scrollToId } from '../links'

const ICONS = [LayoutTemplate, UserRound, Atom, Smartphone, Sparkles, PlugZap]

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={t.services.title} />

        <ul className="mt-14 border-t border-line">
          {t.services.items.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.06, ease: EASE }}
                className="border-b border-line"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId('contact')
                  }}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden px-2 py-6 md:grid-cols-[4rem_auto_1fr_auto] md:gap-8 md:px-6 md:py-8"
                >
                  {/* lapis fill sweeps up from below on hover */}
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 bg-lapis transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <span className="relative hidden font-display text-sm font-semibold text-muted transition-colors duration-300 group-hover:text-white/70 md:block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-lapis/15 text-lapis transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-saffron group-hover:text-[#0a0f2e]">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <span className="relative min-w-0 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center md:gap-8">
                    <span className="block font-display text-xl font-semibold tracking-tight transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-white md:text-3xl">
                      {s.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted transition-colors duration-300 group-hover:text-white/80 md:mt-0 md:text-base">
                      {s.text}
                    </span>
                  </span>
                  <span className="relative grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-lapis">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
