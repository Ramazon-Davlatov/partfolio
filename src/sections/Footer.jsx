import { FaGithub, FaTelegramPlane, FaInstagram, FaArrowUp } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="relative border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <h2 className="font-display text-[12vw] font-semibold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_var(--color-line)] md:text-[6vw]">
          {t.footer.cta}
        </h2>

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-5 text-xl text-muted">
            <a href="https://github.com/MrDavlatovdev" target="_blank" rel="noreferrer" className="transition-colors hover:text-green">
              <FaGithub />
            </a>
            <a href="https://t.me/MrDavlatovdev" target="_blank" rel="noreferrer" className="transition-colors hover:text-green">
              <FaTelegramPlane />
            </a>
            <a href="https://instagram.com/da.vlatov3061" target="_blank" rel="noreferrer" className="transition-colors hover:text-green">
              <FaInstagram />
            </a>
          </div>

          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Ramazon Davlatov. {t.footer.rights}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted transition-colors hover:text-green"
          >
            {t.footer.top} <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
