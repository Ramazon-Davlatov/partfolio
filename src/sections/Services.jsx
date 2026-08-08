import { motion } from 'framer-motion'
import { FaLayerGroup, FaMobileAlt, FaCode, FaPlug, FaMagic, FaObjectGroup } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const ICONS = [FaLayerGroup, FaObjectGroup, FaCode, FaMobileAlt, FaMagic, FaPlug]

export default function Services() {
  const { t } = useLanguage()
  const SERVICES = t.services.items.map((s, i) => ({ ...s, icon: ICONS[i] }))
  return (
    <section id="services" className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-green"
        >
          {t.services.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-3xl font-semibold md:text-4xl"
        >
          {t.services.title}
        </motion.h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glass rounded-[26px] p-7 transition-colors hover:border-green/30"
            >
              <s.icon className="text-2xl text-blue" />
              <h3 className="mt-5 font-display text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
