import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertCircle, Loader2, ArrowUpRight, Clock } from 'lucide-react'
import { FaGithub, FaTelegramPlane, FaInstagram } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import { LINKS } from '../links'
import { Reveal, EASE } from '../components/Motion'

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/contact`
const EMPTY = { name: '', email: '', message: '' }
const MAX_MESSAGE = 1000

const fieldCls =
  'peer w-full rounded-2xl border border-line-strong bg-bg/50 px-4 pb-2.5 pt-6 text-base text-text outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent)_18%,transparent)]'
const labelCls =
  'pointer-events-none absolute left-4 text-muted transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs'

function FloatInput({ id, label, ...props }) {
  return (
    <div className="relative">
      <input id={id} placeholder=" " className={fieldCls} {...props} />
      <label htmlFor={id} className={`${labelCls} top-1/2 -translate-y-1/2`}>
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [form, setForm] = useState(EMPTY)
  const [topic, setTopic] = useState(0)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (Object.values(form).some((v) => !v.trim())) {
      setError(c.errFields)
      return setStatus('error')
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError(c.errEmail)
      return setStatus('error')
    }
    setError('')
    setStatus('sending')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: c.topics[topic] }),
      })
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}))
        throw new Error(`${res.status} ${detail.error || 'Request failed'}`)
      }
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      // the visitor sees a friendly message; the real reason goes to the browser console
      console.error('Contact form:', err.message)
      setError(c.errSend)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={c.title} />
        <Reveal as="p" className="mt-6 max-w-2xl text-lg text-muted">{c.desc}</Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.35fr]">
          {/* Direct channels */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col gap-4"
          >
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-[32px] bg-lapis p-7 text-white md:p-8"
            >
              <FaTelegramPlane
                className="pointer-events-none absolute -bottom-8 -right-6 text-[12rem] text-white/10 transition-transform duration-700 group-hover:-translate-y-6 group-hover:translate-x-4 group-hover:rotate-[-12deg] group-hover:scale-110"
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl text-lapis">
                  <FaTelegramPlane />
                </span>
                <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <div className="relative mt-14">
                <p className="text-sm font-medium text-white/75">{c.fastest}</p>
                <p className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">{LINKS.telegramHandle}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm">
                  <Clock size={14} /> {c.reply}
                </p>
              </div>
            </a>

            <div className="grid grid-cols-2 gap-4">
              {[
                { href: LINKS.instagram, icon: FaInstagram, name: 'Instagram', handle: LINKS.instagramHandle },
                { href: LINKS.github, icon: FaGithub, name: 'GitHub', handle: 'MrDavlatovdev' },
              ].map(({ href, icon: Icon, name, handle }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="panel group flex flex-col gap-6 rounded-[28px] p-5 transition-colors hover:border-line-strong"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-text/5 text-lg">
                      <Icon />
                    </span>
                    <ArrowUpRight size={18} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{name}</p>
                    <p className="truncate text-sm text-muted">{handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="panel relative overflow-hidden rounded-[32px] p-6 md:p-9"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 18 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-accent text-on-accent shadow-[0_12px_40px_-10px_var(--color-accent)]"
                  >
                    <Check size={36} strokeWidth={2.5} />
                  </motion.span>
                  <h3 className="mt-6 text-3xl font-bold tracking-tight">{c.sentTitle}</h3>
                  <p className="mt-2 max-w-sm text-muted">{c.success}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold transition-colors hover:bg-text/5"
                  >
                    {c.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <fieldset>
                    <legend className="text-sm font-semibold text-muted">{c.topic}</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.topics.map((name, i) => (
                        <label key={name} className="cursor-pointer">
                          <input
                            type="radio"
                            name="topic"
                            className="peer sr-only"
                            checked={topic === i}
                            onChange={() => setTopic(i)}
                          />
                          <span className="block rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-text peer-checked:border-text peer-checked:bg-text peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-saffron">
                            {name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <FloatInput id="c-name" label={c.name} autoComplete="name" value={form.name} onChange={update('name')} />
                    <FloatInput id="c-email" label={c.email} type="email" autoComplete="email" value={form.email} onChange={update('email')} />
                  </div>

                  <div className="relative mt-4">
                    <textarea
                      id="c-message"
                      rows={6}
                      maxLength={MAX_MESSAGE}
                      placeholder=" "
                      value={form.message}
                      onChange={update('message')}
                      className={`${fieldCls} resize-none pt-7`}
                    />
                    <label htmlFor="c-message" className={`${labelCls} top-4`}>
                      {c.message}
                    </label>
                    <span className="pointer-events-none absolute bottom-3 right-4 text-xs tabular-nums text-muted">
                      {form.message.length}/{MAX_MESSAGE}
                    </span>
                  </div>

                  <div aria-live="polite">
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.p
                          key={error}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-start gap-2 overflow-hidden pt-4 text-sm text-[#ff7a7a]"
                        >
                          <AlertCircle size={18} className="shrink-0" /> {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-base font-semibold text-on-accent shadow-[0_12px_30px_-12px_var(--color-accent)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> {c.sending}
                      </>
                    ) : (
                      <>
                        {c.send} <Send size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
