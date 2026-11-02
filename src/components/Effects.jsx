import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion'

/* Thin saffron→turquoise bar that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-saffron via-accent to-lapis"
      aria-hidden="true"
    />
  )
}

/* Custom cursor: a dot plus a lagging ring that grows over anything clickable.
   Only on mouse devices, and never when reduced motion is requested. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHover(!!e.target.closest?.('a, button, label, [role="button"]'))
    }
    const leave = () => setVisible(false)
    const press = () => setDown(true)
    const release = () => setDown(false)

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute left-0 top-0 -ml-5 -mt-5 h-10 w-10"
      >
        <motion.div
          animate={{ scale: down ? 0.8 : hover ? 1.7 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`h-full w-full rounded-full border transition-colors duration-300 ${
            hover ? 'border-saffron bg-saffron/10' : 'border-text/40'
          }`}
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-saffron"
      />
    </div>
  )
}

/* Feeds the cursor position into every .panel so its spotlight follows the mouse. */
export function useSpotlight() {
  useEffect(() => {
    const onMove = (e) => {
      const el = e.target.closest?.('.panel')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--x', `${e.clientX - r.left}px`)
      el.style.setProperty('--y', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}
