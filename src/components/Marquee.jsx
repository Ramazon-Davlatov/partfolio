import { StarMark } from './Navbar'

const ROW_A = ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Responsive', 'Vite']
const ROW_B = ['Landing sahifalar', 'Portfolio', 'Animatsiya', 'UI dizayn', 'API', 'Telegram bot']

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
  return (
    <div className="relative -my-6 overflow-hidden py-16" aria-hidden="true">
      <div className="-mx-[5vw] rotate-[-3deg]">
        <Band items={ROW_A} className="bg-lapis text-white shadow-[0_20px_60px_-20px_var(--color-lapis)]" />
      </div>
      <div className="-mx-[5vw] -mt-[72px] rotate-[2.5deg] md:-mt-[92px]">
        <Band items={ROW_B} reverse className="border-y border-line bg-bg-2/90 text-text backdrop-blur" />
      </div>
    </div>
  )
}
