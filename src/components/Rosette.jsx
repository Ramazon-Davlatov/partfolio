import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll } from 'framer-motion'

// Builds a star polygon {n/k} as one continuous path, so it can be "drawn" with pathLength.
function starPath(n, k, r, rotate = 0) {
  const pts = []
  let i = 0
  for (let step = 0; step <= n; step++) {
    const a = ((i * 360) / n - 90 + rotate) * (Math.PI / 180)
    pts.push(`${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`)
    i = (i + k) % n
  }
  return `M${pts.join(' L')}Z`
}

// {8/2} is two overlapping squares — drawn as two closed paths.
function octagram(r, rotate = 0) {
  return [0, 1]
    .map((offset) => {
      const pts = [0, 2, 4, 6].map((j) => {
        const a = (((j + offset) * 45) - 90 + rotate) * (Math.PI / 180)
        return `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`
      })
      return `M${pts.join(' L')}Z`
    })
    .join(' ')
}

const OUTER_STAR = starPath(8, 3, 86)
const OUTER_STAR_B = starPath(8, 3, 86, 22.5)
const INNER = octagram(52, 22.5)
const DOTS = Array.from({ length: 16 }, (_, i) => {
  const a = ((i * 22.5) - 90) * (Math.PI / 180)
  return { x: Math.cos(a) * 95, y: Math.sin(a) * 95, major: i % 2 === 0 }
})

const draw = (delay, duration = 1.6) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] }, opacity: { delay, duration: 0.2 } },
})

export default function Rosette() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 })

  // scrolling down turns the star layers against each other
  const { scrollY } = useScroll()
  const spinA = useSpring(useTransform(scrollY, [0, 1200], [0, 120]), { stiffness: 60, damping: 20 })
  const spinB = useTransform(spinA, (v) => -v * 0.6)
  const lift = useTransform(scrollY, [0, 800], [1, 0.85])

  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[min(440px,80vw)] [perspective:1000px]"
      aria-hidden="true"
    >
      {/* soft glaze glow */}
      <div className="absolute inset-[12%] rounded-full bg-lapis/30 blur-[70px]" />
      <div className="absolute inset-[30%] rounded-full bg-accent/20 blur-[50px]" />

      <motion.div style={{ rotateX: rx, rotateY: ry, scale: lift }} className="absolute inset-0 [transform-style:preserve-3d]">
        {/* outer ring + dots, slow clockwise */}
        <motion.div style={{ rotate: spinB }} className="absolute inset-0">
        <div className="spin-slow absolute inset-0">
          <svg viewBox="-100 -100 200 200" className="h-full w-full overflow-visible">
            <motion.circle r="95" fill="none" stroke="var(--color-line-strong)" strokeWidth="0.6" {...draw(0.1, 1.4)} />
            {DOTS.map((d, i) => (
              <motion.circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={d.major ? 1.6 : 0.9}
                fill={d.major ? 'var(--color-saffron)' : 'var(--color-muted)'}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.03, duration: 0.4 }}
              />
            ))}
          </svg>
        </div>

        </motion.div>

        {/* interlaced 16-point star, slow counter-clockwise */}
        <motion.div style={{ rotate: spinA }} className="absolute inset-0">
        <div className="spin-slower absolute inset-0">
          <svg viewBox="-100 -100 200 200" className="h-full w-full overflow-visible">
            <motion.path
              d={OUTER_STAR_B}
              fill="color-mix(in oklab, var(--color-lapis) 12%, transparent)"
              stroke="var(--color-lapis)"
              strokeWidth="1"
              strokeLinejoin="round"
              {...draw(0.35)}
            />
            <motion.path
              d={OUTER_STAR}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              strokeLinejoin="round"
              {...draw(0.2)}
            />
          </svg>
        </div>

        </motion.div>

        {/* inner octagram + medallion, static so the monogram stays upright */}
        <svg viewBox="-100 -100 200 200" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path d={INNER} fill="none" stroke="var(--color-saffron)" strokeWidth="1" strokeLinejoin="round" {...draw(0.8, 1.2)} />
          <motion.circle
            r="30"
            fill="var(--color-bg-2)"
            stroke="var(--color-line-strong)"
            strokeWidth="0.6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.text
            x="0"
            y="1"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--color-text)"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.04em' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            RD
          </motion.text>
        </svg>
      </motion.div>
    </div>
  )
}
