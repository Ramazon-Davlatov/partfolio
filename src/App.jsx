import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import { Cursor, ScrollProgress, useSpotlight } from './components/Effects'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Projects from './sections/Projects'
import AISection from './sections/AISection'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  useSpotlight()

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <div className="backdrop" aria-hidden="true" />
          <ScrollProgress />
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
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
    </MotionConfig>
  )
}
