import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Program() {
  const router = useRouter()
  const items = [
    { time: '6:00 PM', title: 'Welcome Drinks' },
    { time: '6:30 PM', title: 'Canapes' },
    { time: '7:00 PM', title: 'Bridal Party Entrances' },
    { time: '7:20 PM', title: 'Avyav and Taran' },
    { time: '7:30 PM', title: 'Entre Service' },
    { time: '7:45 PM', title: 'Speeches |' },
    { time: '8:00 PM', title: 'Next Day Edit' },
    { time: '8:10 PM', title: 'Mains' },
    { time: '8:20 PM', title: 'Speeches ||' },
    { time: '8:40 PM', title: 'Dancefloor Opens' },
    { time: '10:00 PM', title: 'Dessert Service' },
    { time: '11:30 PM', title: 'Event Concludes' }
  ]

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
            <h2 className="text-3xl md:text-4xl font-mono text-theme">Program</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => router.push('/find-seat')} 
                className="glass-button px-4 py-2 rounded-full text-theme text-xs"
              >
                Back
              </button>
              <button 
                onClick={() => router.push('/floorplan')} 
                className="glass-button px-4 py-2 rounded-full text-theme text-xs"
              >
                Floor Plan
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {items.map((it, i) => (
              <motion.div 
                key={it.title} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-gray-500/80 backdrop-blur-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-theme font-semibold text-lg">{i + 1}</span>
                </div>
                <div className="flex-grow">
                  <div className="font-semibold text-theme text-lg">{it.title}</div>
                  <div className="text-sm text-theme opacity-70 mt-1">{it.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
