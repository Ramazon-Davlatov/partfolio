import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const INITIALS = 'RD'
const TICK_COUNT = 36

export default function OrbitAvatar({ tools = [] }) {
  const containerRef = useRef(null)
  const [radius, setRadius] = useState(150)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => setRadius(el.offsetWidth / 2 - 46)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const items = tools.slice(0, 6)
  const count = items.length || 1

  return (
    <div
      ref={containerRef}
      className="group relative mx-auto aspect-square w-full max-w-[260px] select-none sm:max-w-[320px] md:max-w-[380px]"
    >
      {/* ambient glow behind everything */}
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-green/10 blur-[50px]" />
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-blue/10 blur-[60px]" />

      {/* radar grid background */}
      <div
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(77,255,158,0.10) 0%, transparent 65%), repeating-linear-gradient(0deg, rgba(140,150,180,0.08) 0px, transparent 1px 32px), repeating-linear-gradient(90deg, rgba(140,150,180,0.08) 0px, transparent 1px 32px)',
          maskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
        }}
      />

      {/* radar sweep beam, drifting the opposite way for depth */}
      <div
        className="absolute inset-0 animate-orbit-reverse rounded-full opacity-60"
        style={{
          background: 'conic-gradient(from 0deg, rgba(77,255,158,0.22), transparent 22%)',
          maskImage: 'radial-gradient(circle, transparent 44%, black 45%, black 96%, transparent 97%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 44%, black 45%, black 96%, transparent 97%)',
        }}
      />

      {/* precision tick ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
        <circle cx="100" cy="100" r="98" fill="none" stroke="var(--color-line)" strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-line)" strokeOpacity="0.45" strokeWidth="1" />
        <circle cx="100" cy="100" r="44" fill="none" stroke="var(--color-line)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 5" />
        {Array.from({ length: TICK_COUNT }).map((_, i) => {
          const major = i % 3 === 0
          return (
            <line
              key={i}
              x1="100"
              y1={major ? '4' : '7'}
              x2="100"
              y2="10"
              stroke="var(--color-muted)"
              strokeOpacity={major ? 0.55 : 0.28}
              strokeWidth={major ? 1.4 : 1}
              transform={`rotate(${(360 / TICK_COUNT) * i} 100 100)`}
            />
          )
        })}
      </svg>

      {/* rotating layer: orbit dot + tool badges (hover to pause) */}
      <div className="absolute inset-0 animate-orbit transition-[animation-play-state] group-hover:[animation-play-state:paused]">
        <span
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green shadow-[0_0_16px_3px_rgba(77,255,158,0.7)] ring-4 ring-green/15"
          style={{ transform: `translate(-50%, -50%) rotate(0deg) translateX(${radius + 22}px)` }}
        />

        {items.map((tool, i) => {
          const angle = (360 / count) * i
          return (
            <div
              key={tool.name}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px)` }}
            >
              <span
                className="glass block cursor-default whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] font-medium text-text shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-110 hover:border-green/50"
                style={{ transform: `rotate(${-angle}deg)`, display: 'inline-block' }}
              >
                {tool.name}
              </span>
            </div>
          )
        })}
      </div>

      {/* static center avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[38%] w-[38%] animate-ping rounded-full bg-green/20" style={{ animationDuration: '3s' }} />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glow-green relative flex h-[38%] w-[38%] items-center justify-center rounded-full bg-gradient-to-br from-green to-blue ring-4 ring-bg/80"
        >
          <span className="font-display text-2xl font-bold text-bg md:text-3xl">{INITIALS}</span>
        </motion.div>
      </div>
    </div>
  )
}

