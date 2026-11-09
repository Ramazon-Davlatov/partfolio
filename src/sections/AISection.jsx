import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SiClaude, SiGooglegemini, SiDeepseek, SiX, SiGithubcopilot } from 'react-icons/si'
import { RiOpenaiFill } from 'react-icons/ri'
import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import { LINKS } from '../links'
import { Reveal, EASE } from '../components/Motion'

const QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=0&bgcolor=ffffff&color=0a0f2e&data=' +
  encodeURIComponent(LINKS.telegram)

// Brand marks, keyed by tool name in translations.
const BRAND = {
  Claude: { icon: SiClaude, color: '#d97757', url: 'https://claude.ai' },
  ChatGPT: { icon: RiOpenaiFill, color: 'var(--color-text)', url: 'https://chatgpt.com' },
  Gemini: { icon: SiGooglegemini, color: '#6f8cff', url: 'https://gemini.google.com' },
  DeepSeek: { icon: SiDeepseek, color: '#4d6bfe', url: 'https://chat.deepseek.com' },
  Grok: { icon: SiX, color: 'var(--color-text)', url: 'https://grok.com' },
  Copilot: { icon: SiGithubcopilot, color: '#a78bfa', url: 'https://github.com/features/copilot' },
}

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')

function Mark({ name, size = 'md' }) {
  const b = BRAND[name]
  if (!b) return null
  const Icon = b.icon
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl border border-line bg-bg/60 ${
        size === 'lg' ? 'h-16 w-16 text-3xl' : 'h-11 w-11 text-xl'
      }`}
      style={{ color: b.color }}
      aria-hidden="true"
    >
      <Icon />
    </span>
  )
}

export default function AISection() {
  const { t } = useLanguage()
  const [main, ...rest] = t.ai.tools

  return (
    <section id="ai" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={t.ai.title} />
        <Reveal as="p" className="mt-6 max-w-2xl text-lg text-muted">{t.ai.desc}</Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Featured: Claude + how I work with AI */}
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="panel relative overflow-hidden rounded-[32px] p-7 md:p-10 lg:col-span-2"
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
              style={{ background: '#d97757' }}
              aria-hidden="true"
            />
            <div className="relative flex flex-wrap items-start gap-5">
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Mark name={main.name} size="lg" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full bg-saffron/15 px-3 py-1 text-xs font-semibold text-saffron">
                  {t.ai.featured}
                </span>
                <h3 className="mt-2 text-3xl font-bold tracking-tight">
                  {main.name} <span className="text-lg font-medium text-muted">{main.by}</span>
                </h3>
                <p className="mt-2 max-w-md text-muted">{main.text}</p>
                {BRAND[main.name]?.url && (
                  <a
                    href={BRAND[main.name].url}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: '#d97757' }}
                  >
                    {t.ai.visit} · {host(BRAND[main.name].url)}
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="relative mt-10 border-t border-line pt-7">
              <h4 className="text-sm font-semibold text-muted">{t.ai.flowTitle}</h4>
              <ol className="mt-5 grid gap-5 sm:grid-cols-3">
                {t.ai.flow.map((step, i) => (
                  <li key={step.title} className="relative">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-text font-display text-sm font-bold text-bg">
                        {i + 1}
                      </span>
                      {i < t.ai.flow.length - 1 && (
                        <span className="hidden h-px flex-1 bg-gradient-to-r from-line-strong to-transparent sm:block" aria-hidden="true" />
                      )}
                    </div>
                    <p className="mt-3 font-display font-semibold tracking-tight">{step.title}</p>
                    <p className="mt-1 text-sm text-muted">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.article>

          {/* QR */}
          <motion.a
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            href={LINKS.telegram}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] bg-lapis p-7 text-white md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="max-w-[12rem] font-display text-lg font-semibold leading-snug">{t.ai.scan}</p>
              <ArrowUpRight className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
            <div className="mt-8 self-center rounded-3xl bg-white p-4 shadow-2xl transition-transform duration-500 group-hover:rotate-[-3deg] group-hover:scale-[1.04]">
              <img src={QR_URL} alt="" width="176" height="176" className="h-44 w-44" loading="lazy" />
            </div>
            <p className="mt-6 text-center font-semibold">{LINKS.telegramHandle}</p>
          </motion.a>
        </div>

        {/* The rest of the toolbox */}
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {rest.map((tool, i) => (
            <motion.li
              key={tool.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="panel group rounded-[28px] last:col-span-2 hover:border-line-strong lg:last:col-span-1"
            >
              <a
                href={BRAND[tool.name]?.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${tool.name} — ${t.ai.visit}`}
                className="flex h-full flex-col rounded-[inherit] p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Mark name={tool.name} />
                  </span>
                  <ArrowUpRight size={18} className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{tool.name}</h3>
                <p className="text-xs font-medium text-muted">{tool.by}</p>
                <p className="mt-3 flex-1 text-sm text-muted">{tool.text}</p>
                {BRAND[tool.name]?.url && (
                  <span className="mt-4 truncate text-xs font-semibold text-accent group-hover:underline">
                    {host(BRAND[tool.name].url)}
                  </span>
                )}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
