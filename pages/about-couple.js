import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function AboutCouple() {
  const router = useRouter()
  
  // Blurb text - you can customize this
  const blurb = `We met in 2019 and instantly knew we had found something special. 
  
After 7 years together, we decided to take the next step and build our future together. 
  
We are so excited to celebrate this special day with all of you!`

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="glass-card rounded-3xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-mono text-theme">About Us</h2>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('skipAnimation', 'true')
                }
                router.push('/')
              }} 
              className="glass-button px-4 py-2 rounded-full text-theme text-xs"
            >
              Home
            </button>
          </div>

          <div className="space-y-6">
            {/* Couple Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <div className="relative w-full h-64 md:h-96">
                <img
                  src="/CouplePhoto.png"
                  alt="Avyav and Taran"
                  className="w-full h-full object-contain object-top"
                />
              </div>
            </motion.div>

            {/* Blurb Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="glass-card rounded-xl p-6 md:p-8"
            >
              <div className="text-theme text-base md:text-lg leading-relaxed whitespace-pre-wrap font-mono">
                {blurb}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

