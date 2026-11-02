import { motion } from 'framer-motion'
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaMobileAlt } from 'react-icons/fa'
import { SiJavascript, SiTailwindcss, SiFramer, SiVite } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import { EASE } from '../components/Motion'

const GROUPS = [
  [
    { name: 'HTML', icon: FaHtml5, color: '#e34f26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#2965f1' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f0d43a' },
    { name: 'React', icon: FaReact, color: '#4fd1ef', spin: true },
  ],
  [
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
    { name: 'Framer Motion', icon: SiFramer, color: '#c084fc' },
    { name: 'Responsive', icon: FaMobileAlt, color: '#46d6cb' },
  ],
  [
    { name: 'Git', icon: FaGitAlt, color: '#f05033' },
    { name: 'GitHub', icon: FaGithub, color: 'currentColor' },
    { name: 'Vite', icon: SiVite, color: '#a78bfa' },
  ],
]

const card = {
  hidden: { opacity: 0, y: 50, rotateX: -12 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: EASE, staggerChildren: 0.07, delayChildren: 0.2 } },
}
const chip = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={t.skills.title} />

        <motion.div
          className="mt-14 grid gap-4 [perspective:1200px] md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {GROUPS.map((items, gi) => {
            const g = t.skills.groups[gi]
            return (
              <motion.div key={gi} variants={card} className="panel flex flex-col rounded-[28px] p-6 md:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{g.name}</h3>
                  <span className="font-display text-sm font-semibold text-muted">{String(items.length).padStart(2, '0')}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{g.note}</p>
                <ul className="mt-6 flex flex-col gap-2">
                  {items.map(({ name, icon: Icon, color, spin }) => (
                    <motion.li
                      key={name}
                      variants={chip}
                      className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-line bg-bg/40 px-4 py-3 transition-[border-color,transform] duration-300 hover:translate-x-1.5 hover:border-line-strong"
                    >
                      {/* brand-colored wash slides in on hover */}
                      <span
                        className="absolute inset-0 -z-0 origin-left scale-x-0 opacity-15 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                        style={{ background: `linear-gradient(90deg, ${color === 'currentColor' ? 'var(--color-text)' : color}, transparent)` }}
                        aria-hidden="true"
                      />
                      <Icon
                        className={`relative text-xl transition-transform duration-500 group-hover:scale-125 ${
                          spin ? 'group-hover:rotate-180' : 'group-hover:-rotate-12'
                        }`}
                        style={{ color }}
                        aria-hidden="true"
                      />
                      <span className="relative font-medium">{name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
