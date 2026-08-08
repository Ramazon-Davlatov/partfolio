import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaTelegramPlane } from 'react-icons/fa'
import { useTilt } from '../hooks/useTilt'
import { useLanguage } from '../context/LanguageContext'

const META = [
  { demo: 'https://t.me/MrDavlatovdev', github: 'https://github.com/MrDavlatovdev', featured: true, icon: FaTelegramPlane },
  { demo: '#home', github: 'https://github.com/MrDavlatovdev' },
  { demo: '#', github: 'https://github.com/MrDavlatovdev' },
]

function ProjectCard({ project, index, labels }) {
  const tilt = useTilt(8)

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`glass relative overflow-hidden rounded-[30px] p-8 transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(77,255,158,0.12)] ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      {project.featured && (
        <span className="absolute right-6 top-6 rounded-full border border-green/40 px-3 py-1 font-mono text-[10px] text-green">
          {labels.featured}
        </span>
      )}

      <div className="flex h-40 items-center justify-center rounded-[22px] bg-gradient-to-br from-surface-2 to-surface text-5xl text-green/70">
        {project.icon ? <project.icon /> : <FaGithub />}
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-muted">{project.text}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          data-cursor="magnetic"
          className="flex items-center gap-2 text-sm font-medium text-green"
        >
          <FaExternalLinkAlt /> {labels.live}
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="magnetic"
          className="flex items-center gap-2 text-sm font-medium text-muted hover:text-text"
        >
          <FaGithub /> {labels.code}
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const PROJECTS = t.projects.items.map((p, i) => ({ ...p, ...META[i] }))

  return (
    <section id="projects" className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-green"
        >
          {t.projects.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-3xl font-semibold md:text-4xl"
        >
          {t.projects.title}
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              labels={{ featured: t.projects.featured, live: t.projects.live, code: t.projects.code }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
