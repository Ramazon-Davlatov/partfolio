import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function Loader({ onDone }) {
  const { t } = useLanguage()
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1400
    let raf

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setLeaving(true), 250)
        setTimeout(onDone, 950)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <motion.span
              className="font-display text-sm tracking-[0.4em] text-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              R. DAVLATOV
            </motion.span>
            <div className="font-display text-6xl font-semibold tabular-nums md:text-8xl">
              <span className="text-gradient">{count}</span>
              <span className="text-muted">%</span>
            </div>
            <div className="h-px w-40 overflow-hidden bg-line md:w-64">
              <motion.div
                className="h-full bg-gradient-to-r from-green to-blue"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
