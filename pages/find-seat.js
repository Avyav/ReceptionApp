import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { createPortal } from 'react-dom'
import guestsData from '../public/guests.json'

export default function FindSeat() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const router = useRouter()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if(!q) return guestsData
    return guestsData.filter(g => g.name.toLowerCase().includes(q))
  }, [query])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selected])

  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div className="min-h-screen py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="glass-card rounded-3xl p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl md:text-4xl font-mono text-theme">Find Your Seat</h2>
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
            <p className="text-sm md:text-base text-theme opacity-80">Type your name to find your table</p>

            <div className="mt-6">
              <div className="flex gap-3 items-center">
                <input 
                  value={query} 
                  onChange={e => setQuery(e.target.value)} 
                  placeholder="Search by name..." 
                  className="glass-input flex-1 rounded-full px-5 py-3 focus:outline-none" 
                />
                <button 
                  onClick={() => { setQuery(''); setSelected(null) }} 
                  className="glass-button px-5 py-3 rounded-full text-theme text-sm font-medium text-center"
                >
                  Clear
                </button>
              </div>

              <div className="mt-6 grid gap-3">
                {results.length === 0 && <div className="text-sm text-theme opacity-70 text-center py-4">No matching guests.</div>}
                {results.map(g => (
                  <motion.button 
                    key={g.name} 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={() => setSelected(g)} 
                    className="glass-card w-full text-left p-5 rounded-xl"
                  >
                    <div>
                      <div className="font-medium text-theme text-lg">{g.name}</div>
                      <div className="text-xs text-theme opacity-60 mt-1">tap to view table</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal rendered via Portal to document body */}
      {mounted && createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
              style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                margin: 0,
                padding: '1.5rem'
              }}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div 
                className="glass-card max-w-sm w-full rounded-2xl p-8 shadow-2xl relative"
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="text-sm text-theme opacity-70">You're seated at</div>
                  <div className="mt-3 text-4xl font-mono text-gold">Table {selected.table}</div>
                  <div className="mt-2 text-base text-theme opacity-90">{selected.name}</div>

                  <div className="mt-8 flex gap-3 justify-center">
                    <button 
                      onClick={() => setSelected(null)} 
                      className="glass-button-primary px-5 py-2 rounded-full text-theme text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
