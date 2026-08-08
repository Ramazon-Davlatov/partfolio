import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/contact`

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [focused, setFocused] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      return t.contact.errFields
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return t.contact.errEmail
    }
    return ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setError(err)
      setStatus('error')
      return
    }
    setError('')
    setStatus('sending')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setError(t.contact.errSend)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-mono text-sm text-green"
        >
          {t.contact.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-center font-display text-3xl font-semibold md:text-4xl"
        >
          {t.contact.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 text-center text-muted"
        >
          {t.contact.desc}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          className="glass mt-12 rounded-[30px] p-8 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative">
              <label className="mb-2 block text-xs font-medium text-muted">{t.contact.name}</label>
              <input
                type="text"
                value={form.name}
                onChange={update('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                placeholder={t.contact.namePh}
                className={`w-full rounded-2xl border bg-surface/60 px-4 py-3 text-sm outline-none transition-all duration-300 ${
                  focused === 'name' ? 'border-green shadow-[0_0_0_4px_rgba(77,255,158,0.12)]' : 'border-line'
                }`}
              />
            </div>
            <div className="relative">
              <label className="mb-2 block text-xs font-medium text-muted">{t.contact.email}</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                placeholder={t.contact.emailPh}
                className={`w-full rounded-2xl border bg-surface/60 px-4 py-3 text-sm outline-none transition-all duration-300 ${
                  focused === 'email' ? 'border-green shadow-[0_0_0_4px_rgba(77,255,158,0.12)]' : 'border-line'
                }`}
              />
            </div>
          </div>

          <div className="relative mt-6">
            <label className="mb-2 block text-xs font-medium text-muted">{t.contact.subject}</label>
            <input
              type="text"
              value={form.subject}
              onChange={update('subject')}
              onFocus={() => setFocused('subject')}
              onBlur={() => setFocused('')}
              placeholder={t.contact.subjectPh}
              className={`w-full rounded-2xl border bg-surface/60 px-4 py-3 text-sm outline-none transition-all duration-300 ${
                focused === 'subject' ? 'border-green shadow-[0_0_0_4px_rgba(77,255,158,0.12)]' : 'border-line'
              }`}
            />
          </div>

          <div className="relative mt-6">
            <label className="mb-2 block text-xs font-medium text-muted">{t.contact.message}</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={update('message')}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused('')}
              placeholder={t.contact.messagePh}
              className={`w-full resize-none rounded-2xl border bg-surface/60 px-4 py-3 text-sm outline-none transition-all duration-300 ${
                focused === 'message' ? 'border-green shadow-[0_0_0_4px_rgba(77,255,158,0.12)]' : 'border-line'
              }`}
            />
          </div>

          {status === 'error' && (
            <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
              <FaExclamationCircle /> {error}
            </p>
          )}
          {status === 'success' && (
            <p className="mt-4 flex items-center gap-2 text-sm text-green">
              <FaCheckCircle /> {t.contact.success}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            data-cursor="magnetic"
            className="glow-green mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-green py-4 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {status === 'sending' ? t.contact.sending : (
              <>
                <FaPaperPlane /> {t.contact.send}
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
