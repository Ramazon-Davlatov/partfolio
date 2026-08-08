import { useEffect, useMemo, useRef } from 'react'

function seededParticles(count) {
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  return Array.from({ length: count }).map(() => ({
    top: rand() * 100,
    left: rand() * 100,
    size: 1 + rand() * 2.5,
    duration: 10 + rand() * 14,
    delay: rand() * -20,
  }))
}

export default function AmbientBackground() {
  const greenRef = useRef(null)
  const blueRef = useRef(null)
  const purpleRef = useRef(null)
  const particles = useMemo(() => seededParticles(36), [])

  useEffect(() => {
    let raf
    let target = { x: 0.5, y: 0.4 }
    let current = { x: 0.5, y: 0.4 }

    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth
      target.y = e.clientY / window.innerHeight
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04

      if (greenRef.current) {
        greenRef.current.style.transform = `translate(${current.x * 60 - 30}px, ${current.y * 60 - 30}px)`
      }
      if (blueRef.current) {
        blueRef.current.style.transform = `translate(${-current.x * 40 + 20}px, ${-current.y * 40 + 20}px)`
      }
      if (purpleRef.current) {
        purpleRef.current.style.transform = `translate(${current.y * 50 - 25}px, ${current.x * 50 - 25}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-bg">
      <div className="absolute inset-0 animate-aurora opacity-40 [background:conic-gradient(from_180deg_at_50%_40%,rgba(77,255,158,0.10),rgba(91,140,255,0.10),rgba(167,107,255,0.10),rgba(77,255,158,0.10))] blur-[80px]" />

      <div
        ref={greenRef}
        className="absolute -top-40 left-[8%] h-[34rem] w-[34rem] animate-drift-a rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--color-green), transparent 70%)' }}
      />
      <div
        ref={blueRef}
        className="absolute top-[20%] right-[4%] h-[30rem] w-[30rem] animate-drift-b rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle, var(--color-blue), transparent 70%)' }}
      />
      <div
        ref={purpleRef}
        className="absolute bottom-[-10%] left-[30%] h-[36rem] w-[36rem] animate-drift-c rounded-full opacity-20 blur-[140px]"
        style={{ background: 'radial-gradient(circle, var(--color-purple), transparent 70%)' }}
      />

      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-green/70"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="noise" />
    </div>
  )
}
