import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'portfolio-lang'
const TITLES = {
  uz: 'Ramazon Davlatov — Frontend dasturchi | React va Tailwind',
  ru: 'Рамазон Давлатов — Frontend-разработчик | React и Tailwind',
}

export function LanguageProvider({ children }) {
  // Always start in Uzbek (matches the prerendered HTML), then restore the saved choice.
  const [lang, setLang] = useState('uz')
  const [ready, setReady] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'uz' || saved === 'ru') setLang(saved)
    } catch {
      /* storage unavailable */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.lang = lang
    document.title = TITLES[lang]
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang, ready])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
