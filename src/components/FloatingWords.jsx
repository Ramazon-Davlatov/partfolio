import { motion } from 'framer-motion'

const WORDS = [
  'Salom', 'Hello', 'Привет', 'Bonjour', 'Hola', 'Ciao',
  'こんにちは', '안녕하세요', '你好', 'مرحبا', 'Namaste', 'Hallo',
  'Olá', 'Merhaba', 'Witaj', 'Sawubona',
]

function seededLayout(count) {
  let seed = 42
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  return Array.from({ length: count }).map((_, i) => ({
    word: WORDS[i % WORDS.length],
    top: 6 + rand() * 88,
    left: 4 + rand() * 90,
    size: 0.85 + rand() * 1.6,
    duration: 14 + rand() * 16,
    delay: rand() * -20,
    drift: 20 + rand() * 40,
  }))
}

const ITEMS = seededLayout(16)

export default function FloatingWords() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {ITEMS.map((item, i) => (
        <motion.span
          key={i}
          className="absolute select-none whitespace-nowrap font-display font-medium text-text/[0.05]"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}rem`,
          }}
          animate={{
            y: [0, -item.drift, 0],
            x: [0, item.drift * 0.4, 0],
            opacity: [0.03, 0.09, 0.03],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  )
}
