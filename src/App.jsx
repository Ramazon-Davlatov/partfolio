import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import Loader from './components/Loader'
import AmbientBackground from './components/AmbientBackground'
import FloatingWords from './components/FloatingWords'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Projects from './sections/Projects'
import AISection from './sections/AISection'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider>
    <LanguageProvider>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <AmbientBackground />
      <FloatingWords />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <AISection />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
    </ThemeProvider>
  )
}
