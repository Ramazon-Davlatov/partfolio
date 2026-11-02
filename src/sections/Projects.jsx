import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import { StarMark } from '../components/Navbar'
import { LINKS } from '../links'
import { Magnetic, EASE } from '../components/Motion'

/* Small, hand-built previews so each project shows what it is. */

function BotPreview() {
  return (
    <div className="flex h-full flex-col justify-end gap-2.5 p-6 text-sm">
      <div className="max-w-[75%] self-end rounded-2xl rounded-br-md bg-lapis px-4 py-2.5 text-white">/start</div>
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 shadow-sm">
        Salom! 👋 Men Ramazonning yordamchi botiman. Qanday yordam bera olaman?
      </div>
      <div className="flex gap-2">
        {['Portfolio', 'Aloqa', 'Loyihalar'].map((b) => (
          <span key={b} className="rounded-xl border border-line-strong px-3 py-1.5 text-xs font-medium text-accent">
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}

function SitePreview() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full overflow-hidden rounded-xl border border-line-strong bg-bg shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-3 flex-1 rounded-full bg-text/5" />
        </div>
        <div className="grid grid-cols-[1.4fr_1fr] items-center gap-4 p-5">
          <div>
            <div className="font-display text-2xl font-bold leading-none tracking-tight">
              Ramazon
              <br />
              Davlatov<span className="text-saffron">.</span>
            </div>
            <div className="mt-3 h-1.5 w-3/4 rounded-full bg-text/10" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-text/10" />
            <div className="mt-3 h-4 w-16 rounded-full bg-accent" />
          </div>
          <StarMark className="spin-slow mx-auto h-16 w-16" />
        </div>
      </div>
    </div>
  )
}

function AppPreview() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[16rem] rounded-2xl border border-line-strong bg-bg p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="font-display font-semibold">useState()</span>
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">3</span>
        </div>
        {['Komponent yozish', 'Props uzatish', 'Hook ishlatish'].map((task, i) => (
          <div key={task} className="mt-2.5 flex items-center gap-2.5 rounded-xl bg-text/5 px-3 py-2 text-sm">
            <span className={`h-4 w-4 rounded-md border ${i < 2 ? 'border-accent bg-accent' : 'border-line-strong'}`} />
            <span className={i < 2 ? 'text-muted line-through' : ''}>{task}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const META = [
  { preview: BotPreview, demo: LINKS.telegram, github: LINKS.github, tint: 'from-lapis/25' },
  { preview: SitePreview, github: LINKS.github, tint: 'from-saffron/20' },
  { preview: AppPreview, github: LINKS.github, tint: 'from-accent/20' },
]

function ProjectCard({ p, m, i, total, labels, progress }) {
  const Preview = m.preview
  const flip = i % 2 === 1
  // cards further down the stack shrink a little as later ones slide over them
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.04])
  const dim = useTransform(progress, [i / total, 1], [0, (total - 1 - i) * 0.25])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 })
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 20 })
  const py = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className="[perspective:1400px] md:sticky" style={{ top: 110 + i * 28 }}>
      <motion.article
        style={{ scale, rotateX: rx, rotateY: ry, backgroundColor: 'var(--color-surface)' }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="panel group grid origin-top overflow-hidden rounded-[32px] shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.6)] md:grid-cols-2"
      >
        <motion.span style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-bg" aria-hidden="true" />
        <div
          className={`relative min-h-[260px] overflow-hidden bg-gradient-to-br ${m.tint} to-transparent md:min-h-[360px] ${flip ? 'md:order-2' : ''}`}
        >
          <motion.div style={{ x: px, y: py }} className="h-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
            <Preview />
          </motion.div>
        </div>

        <div className="relative flex flex-col justify-center p-7 md:p-10">
          <span className="font-display text-sm font-semibold text-muted">
            {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h3>
          <p className="mt-3 max-w-md text-muted">{p.text}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-text/5 px-3 py-1 text-xs font-medium text-muted">
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            {m.demo && (
              <Magnetic strength={0.25}>
                <a
                  href={m.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-text px-5 py-2.5 text-sm font-semibold text-bg"
                >
                  {labels.live} <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            )}
            <Magnetic strength={0.25}>
              <a
                href={m.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-text/5"
              >
                <FaGithub /> {labels.code}
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const stackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start 110px', 'end end'] })
  const items = t.projects.items

  return (
    <section id="projects" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={t.projects.title}>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-muted transition-colors hover:text-text md:self-auto"
          >
            <FaGithub className="text-lg" /> github.com/MrDavlatovdev
          </a>
        </SectionHead>

        <div ref={stackRef} className="mt-14 flex flex-col gap-6 md:gap-[18vh]">
          {items.map((p, i) => (
            <ProjectCard
              key={i}
              p={p}
              m={META[i]}
              i={i}
              total={items.length}
              progress={scrollYProgress}
              labels={{ live: t.projects.live, code: t.projects.code }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
