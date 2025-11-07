import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

function Typewriter({ onComplete }) {
  const [displayText, setDisplayText] = useState('')
  const [line2, setLine2] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
  const fullText = "Welcome to Avyav and Taran's Reception"
  const fullText2 = "This Website was Developed by Avyav"
  const bgImage = '/WebsiteBackroundBlack.jpg'
  const textColor = '#ffffff'
  
  useEffect(() => {
    let currentIndex = 0
    let lineIndex = 0
    
    const type = () => {
      if (lineIndex === 0) {
        // Typing first line
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.substring(0, currentIndex + 1))
          currentIndex++
          setTimeout(type, 100)
        } else {
          // Finished first line, start second line after a short pause
          setTimeout(() => {
            lineIndex = 1
            currentIndex = 0
            setTimeout(type, 300) // Short pause between lines
          }, 500) // Pause after completing first line
        }
      } else if (lineIndex === 1) {
        // Typing second line
        if (currentIndex < fullText2.length) {
          setLine2(fullText2.substring(0, currentIndex + 1))
          currentIndex++
          setTimeout(type, 50) // Faster typing for second line
        } else {
          // Finished both lines - wait then transition
          setTimeout(() => {
            setShowCursor(false)
            setTimeout(() => onComplete(), 500)
          }, 1500)
          return
        }
      }
    }
    
    type()
    
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    
    return () => clearInterval(cursorInterval)
  }, [onComplete])

  return (
    <div 
      className="w-full h-screen flex justify-center items-center fixed inset-0 z-[60]" 
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 800ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="text-center px-6">
        <h1 
          className="text-2xl md:text-3xl font-mono font-bold transition-colors duration-800" 
          style={{ color: textColor }}
        >
          {displayText}
          {displayText.length === fullText.length && line2.length === 0 && (
            <span className={showCursor ? 'opacity-100' : 'opacity-0'}>|</span>
          )}
        </h1>
        <h1 
          className="text-lg md:text-xl font-mono font-bold transition-colors duration-800 mt-8" 
          style={{ color: textColor }}
        >
          {line2}
          {line2.length > 0 && (
            <span className={showCursor ? 'opacity-100' : 'opacity-0'}>|</span>
          )}
        </h1>
      </div>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if animation should be skipped (when navigating from Home button)
    if (typeof window !== 'undefined') {
      const skipAnimation = sessionStorage.getItem('skipAnimation') === 'true'
      if (skipAnimation) {
        setShowContent(true)
        sessionStorage.removeItem('skipAnimation')
      }
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {!showContent && (
          <Typewriter onComplete={() => setShowContent(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen antialiased"
          >
            <main className="max-w-4xl mx-auto px-6 py-10">
              <motion.section 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center py-8">
                  <motion.div 
                    className="glass-card rounded-3xl p-8 md:p-12 mb-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h1 className="text-4xl md:text-6xl font-mono text-theme tracking-wide drop-shadow-lg">Avyav & Taran's Reception</h1>
                    <p className="mt-4 text-lg md:text-xl text-theme opacity-90">LUMINARE - 13.12.2025</p>
                    <p className="mt-3 text-sm md:text-base text-theme opacity-70">Welcome — scan the QR at the entrance and use the buttons below to find your seat</p>
                  </motion.div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button 
                      onClick={() => router.push('/find-seat')}
                      className="glass-button no-shine px-8 py-3 rounded-full text-theme text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Find Your Seat
                    </motion.button>
                    <motion.button 
                      onClick={() => router.push('/program')}
                      className="glass-button no-shine px-8 py-3 rounded-full text-theme text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Program
                    </motion.button>
                    <motion.button 
                      onClick={() => router.push('/menu')}
                      className="glass-button no-shine px-8 py-3 rounded-full text-theme text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Menu
                    </motion.button>
                    <motion.button 
                      onClick={() => router.push('/drinks')}
                      className="glass-button no-shine px-8 py-3 rounded-full text-theme text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Drinks
                    </motion.button>
                    <motion.button 
                      onClick={() => router.push('/leave-note')}
                      className="glass-button no-shine px-8 py-3 rounded-full text-theme text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Leave a Note
                    </motion.button>
                    <motion.button 
                      onClick={() => router.push('/about-couple')}
                      className="glass-button no-shine px-8 py-3 rounded-full text-theme text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      About Us
                    </motion.button>
                  </div>
                </div>
              </motion.section>
            </main>

            <footer className="py-8 text-center text-xs text-theme opacity-60">Made with Love - Developed by Avyav</footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
