import { StarMark } from './Navbar'
import { useLanguage } from '../context/LanguageContext'

const ROW_A = ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Responsive', 'Vite']

function Band({ items, reverse, className }) {
  const loop = [...items, ...items]
  return (
    <div className={`flex overflow-hidden py-5 ${className}`}>
      <div className={`marquee flex w-max shrink-0 items-center gap-10 pr-10 ${reverse ? '[animation-direction:reverse]' : ''}`}>
        {loop.map((word, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`whitespace-nowrap font-display text-3xl font-bold tracking-tight md:text-5xl ${
                i % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_currentColor]' : ''
              }`}
            >
              {word}
            </span>
            <StarMark className="h-7 w-7 shrink-0 md:h-9 md:w-9" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* Two crossing ribbons of tech and services, scrolling in opposite directions. */
export default function Marquee() {
  const { t } = useLanguage()
  return (
    <div className="relative -my-6 overflow-hidden py-20" aria-hidden="true">
      {/* two ribbons tilted against each other, scrolling in opposite directions */}
      <div className="-mx-[5vw] rotate-[1deg]">
        <Band items={t.marquee} reverse className="border-y border-line bg-bg-2/90 text-text backdrop-blur" />
      </div>
      <div className="relative z-10 -mx-[5vw] mt-2 rotate-[-1deg]">
        <Band items={ROW_A} className="bg-lapis text-white shadow-[0_20px_60px_-20px_var(--color-lapis)]" />
      </div>
    </div>
  )
}
