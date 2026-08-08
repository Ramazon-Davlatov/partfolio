import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&bgcolor=060810&color=4dff9e&data=' + encodeURIComponent('https://t.me/MrDavlatovdev')

export default function AISection() {
  const { t } = useLanguage()

  return (
    <section id="ai" className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-green"
        >
          {t.ai.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-display text-3xl font-semibold md:text-4xl"
        >
          {t.ai.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 max-w-xl text-muted"
        >
          {t.ai.desc}
        </motion.p>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {t.ai.tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="glass rounded-[22px] p-5"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-base font-medium">{tool.name}</h3>
                  <span className="font-mono text-[10px] text-muted">{tool.by}</span>
                </div>
                <p className="mt-2 text-xs text-muted">{tool.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass flex flex-col items-center justify-center gap-4 rounded-[30px] p-8 text-center"
          >
            <p className="font-mono text-xs text-muted">{t.ai.scan}</p>
            <img
              src={qrUrl}
              alt="QR code linking to Ramazon's Telegram profile"
              className="h-40 w-40 rounded-2xl border border-line"
              loading="lazy"
            />
            <p className="text-sm text-muted">@MrDavlatovdev</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
