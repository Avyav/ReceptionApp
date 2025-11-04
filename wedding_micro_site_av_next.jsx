// PROJECT: av-wedding-nextjs
// Paste these files into a new Next.js repo (Cursor or local). Follow README at the end.



// FILE: next.config.js


// FILE: tailwind.config.js


// FILE: public/guests.json


// FILE: styles/globals.css

// FILE: components/Layout.js

// FILE: components/NavButton.js

// FILE: components/PrimaryButton.js

// FILE: components/SecondaryButton.js


// FILE: pages/_app.js


// FILE: pages/index.js


export default function Home() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <header className="w-full header-marble">
        <div className="h-28 md:h-36 max-w-4xl mx-auto px-6 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-gold bg-white text-gold text-xl md:text-2xl font-serif">AV</div>
            <div>
              <div className="text-sm md:text-base text-gray-700">Avyav & Partner</div>
              <div className="text-xs md:text-sm text-gray-500">12.12.2025</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center py-8">
            <h1 className="text-4xl md:text-5xl font-serif text-gold tracking-wide">AV</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-800">Avyav & Partner — 12.12.2025</p>
            <p className="mt-2 text-sm text-gray-500">Welcome — scan the QR at the entrance or use the buttons below.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => router.push('/find-seat')} className="px-6 py-3 rounded-full border border-gold bg-gold text-white shadow-md text-sm font-medium">Find Your Seat</button>
              <button onClick={() => router.push('/program')} className="px-6 py-3 rounded-full border border-gold bg-white text-gold text-sm">Program</button>
              <button onClick={() => router.push('/floorplan')} className="px-6 py-3 rounded-full border border-gold bg-white text-gold text-sm">Floor Plan</button>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="py-8 text-center text-xs text-gray-400">Made with ♥ — AV • 12.12.2025</footer>
    </div>
  )
}

// FILE: pages/find-seat.js
import { useState, useMemo } from 'react'
import guestsData from '../public/guests.json'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function FindSeat() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const router = useRouter()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if(!q) return guestsData
    return guestsData.filter(g => g.name.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-serif text-gold">Find Your Seat</h2>
      <p className="text-sm text-gray-500 mt-1">Type your name to find your table — QR codes point here directly.</p>

      <div className="mt-6">
        <div className="flex gap-2 items-center">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name..." className="flex-1 border-2 border-yellow-200 rounded-full px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200" />
          <button onClick={() => { setQuery(''); setSelected(null) }} className="px-4 py-2 rounded-full border border-gray-200">Clear</button>
        </div>

        <div className="mt-6 grid gap-3">
          {results.length === 0 && <div className="text-sm text-gray-500">No matching guests.</div>}
          {results.map(g => (
            <motion.button key={g.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} onClick={() => setSelected(g)} className="w-full text-left p-4 rounded-lg border border-yellow-100 bg-white shadow-sm flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">{g.name}</div>
                <div className="text-xs text-gray-500">tap to view table</div>
              </div>
              <div className="text-sm font-semibold text-gold">Table {g.table}</div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div className="fixed inset-0 z-40 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-white max-w-sm w-full rounded-2xl border border-yellow-200 p-6 shadow-2xl" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
                <div className="text-center">
                  <div className="text-sm text-gray-500">You're seated at</div>
                  <div className="mt-3 text-3xl font-serif text-gold">Table {selected.table}</div>
                  <div className="mt-2 text-sm text-gray-700">{selected.name}</div>

                  <div className="mt-6 flex gap-3 justify-center">
                    <button onClick={() => { router.push('/floorplan'); }} className="px-4 py-2 rounded-full border border-gold bg-white">Show on floor plan</button>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-full bg-gold text-white">Close</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex justify-between">
          <button onClick={() => router.push('/')} className="text-sm text-gray-500">Back</button>
          <button onClick={() => router.push('/program')} className="text-sm text-gold">Program</button>
        </div>
      </div>
    </div>
  )
}

// FILE: pages/program.js
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Program() {
  const router = useRouter()
  const items = [
    { time: '3:00 PM', title: 'Ceremony Begins' },
    { time: '3:45 PM', title: 'Photos' },
    { time: '5:00 PM', title: 'Reception Opens' },
    { time: '7:00 PM', title: 'First Dance' },
  ]

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-serif text-gold">Program</h2>
      <div className="mt-6">
        {items.map((it, i) => (
          <motion.div key={it.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="flex items-start gap-4 py-4">
            <div className="w-10 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center text-sm">{it.time.split(':')[0]}</div>
            </div>
            <div>
              <div className="font-medium text-gray-800">{it.title}</div>
              <div className="text-xs text-gray-500">{it.time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={() => router.push('/find-seat')} className="text-sm text-gray-500">Back</button>
        <button onClick={() => router.push('/floorplan')} className="text-sm text-gold">Floor Plan</button>
      </div>
    </div>
  )
}

// FILE: pages/floorplan.js
import { useRouter } from 'next/router'

export default function FloorPlan(){
  const router = useRouter()
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-serif text-gold">Floor Plan</h2>
      <p className="text-sm text-gray-500 mt-1">Pinch to zoom on mobile. Replace the placeholder with your floor plan image in /public/floorplan.jpg</p>

      <div className="mt-6 bg-white rounded-lg border border-yellow-100 p-4 shadow-sm">
        <div className="w-full h-72 md:h-96 bg-[url('/floorplan.jpg')] bg-cover bg-center rounded-lg flex items-center justify-center">
          {!false && <div className="text-gray-400">Replace /public/floorplan.jpg with your image</div>}
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={() => router.push('/find-seat')} className="px-4 py-2 rounded-full border border-gray-200">Back</button>
          <button onClick={() => alert('Highlighting not implemented — I can add interactive highlights if you want')} className="px-4 py-2 rounded-full bg-gold text-white">Highlight my table</button>
        </div>
      </div>
    </div>
  )
}

// FILE: public/floorplan.jpg
// -> (placeholder) Add your floor plan image here. If you don't add one, the page shows a prompt to upload.

// FILE: README.md
# AV Wedding — Next.js micro-site

This repo is a minimal Next.js project designed as a wedding micro-site. It includes a fast static guest lookup and pages for program and floor plan.

## Quick start
1. Paste these files into a new folder and run:

```bash
npm install
npm run dev
```

2. Open http://localhost:3000

## Deploy to Vercel
1. Push to GitHub.
2. Go to https://vercel.com → New Project → Import from GitHub and pick this repo.
3. Vercel will auto-detect Next.js and deploy.

## Customising
- Edit `public/guests.json` to update guest list.
- Replace `/public/floorplan.jpg` with your venue floor plan.
- Tweak colours in `tailwind.config.js`.

## Optional enhancements I can add
- Interactive floor plan with clickable/highlightable tables.
- Offline support / PWA.
- Custom domain + QR image.

---

// END OF PROJECT
