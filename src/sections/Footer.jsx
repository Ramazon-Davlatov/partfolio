import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { FaGithub, FaTelegramPlane, FaInstagram } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { StarMark } from '../components/Navbar'
import { LINKS } from '../links'
import { SplitText, Magnetic } from '../components/Motion'
import Rosette from '../components/Rosette'

export default function Footer() {
  const { t } = useLanguage()
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <footer className="relative overflow-hidden px-5 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <a
          href={LINKS.telegram}
          target="_blank"
          rel="noreferrer"
          className="group relative block overflow-hidden rounded-[40px] bg-lapis px-7 py-12 text-white md:px-14 md:py-20"
        >
          {/* a big, slowly turning girih star sits behind the call to action */}
          <div className="pointer-events-none absolute -right-24 -top-24 w-[420px] opacity-40 mix-blend-screen md:-right-16 md:w-[520px]" aria-hidden="true">
            <Rosette />
          </div>
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="text-[clamp(2.6rem,8vw,6.5rem)] font-display font-bold leading-[0.95] tracking-[-0.045em]">
              <SplitText text={t.footer.cta} stagger={0.08} />
            </p>
            <Magnetic className="self-start md:self-auto">
            <span className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#0a0f2e] shadow-2xl transition-transform group-hover:scale-105">
              <FaTelegramPlane /> {t.footer.ctaLink}
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            </Magnetic>
          </div>
        </a>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <StarMark className="h-6 w-6" />
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} Ramazon Davlatov. {t.footer.rights}
            </p>
          </div>
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
                className="grid h-10 w-10 place-items-center rounded-full text-lg transition-colors hover:bg-text/5 hover:text-text"
              >
                <Icon />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
              className="ml-2 inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:bg-text/5 hover:text-text"
            >
              {t.footer.top} <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
