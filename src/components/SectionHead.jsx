import { motion } from 'framer-motion'
import { SplitText, EASE } from './Motion'

export default function SectionHead({ title, children, className = '' }) {
  return (
    <div className={`relative flex flex-col gap-4 pt-8 md:flex-row md:items-end md:justify-between ${className}`}>
      {/* the rule draws itself across when the section arrives */}
      <motion.span
        className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: EASE }}
        aria-hidden="true"
      />
      <h2 className="max-w-3xl text-[clamp(2.1rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.035em]">
        <SplitText text={title} />
      </h2>
      {children}
    </div>
  )
}
