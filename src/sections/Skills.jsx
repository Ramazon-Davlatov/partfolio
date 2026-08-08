import { motion } from 'framer-motion'
import {
  FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaMobileAlt,
} from 'react-icons/fa'
import { SiJavascript, SiTailwindcss } from 'react-icons/si'
import { useTilt } from '../hooks/useTilt'
import { useLanguage } from '../context/LanguageContext'

const SKILLS = [
  { name: 'React', level: 85, icon: FaReact },
  { name: 'JavaScript', level: 80, icon: SiJavascript },
  { name: 'HTML', level: 95, icon: FaHtml5 },
  { name: 'CSS', level: 90, icon: FaCss3Alt },
  { name: 'Tailwind CSS', level: 88, icon: SiTailwindcss },
  { name: 'Git', level: 75, icon: FaGitAlt },
  { name: 'GitHub', level: 78, icon: FaGithub },
  { name: 'Responsive Design', level: 90, icon: FaMobileAlt },
]

function SkillCard({ skill, index }) {
  const tilt = useTilt(10)
  const Icon = skill.icon

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="glass group relative overflow-hidden rounded-[26px] p-6 transition-[transform,box-shadow] duration-200 hover:shadow-[0_0_40px_rgba(77,255,158,0.12)]"
    >
      <div className="flex items-center justify-between">
        <Icon className="text-3xl text-green transition-transform duration-300 group-hover:scale-110" />
        <span className="font-mono text-xs text-muted">{skill.level}%</span>
      </div>
      <h3 className="mt-4 font-display text-base font-medium">{skill.name}</h3>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-green to-blue"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  return (
    <section id="skills" className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-green"
        >
          {t.skills.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-3xl font-semibold md:text-4xl"
        >
          {t.skills.title}
        </motion.h2>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
