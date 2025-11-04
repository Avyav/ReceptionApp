import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import tablePositions from '../public/tablePositions.json'

export default function FloorPlan(){
  const router = useRouter()
  const [highlightedTable, setHighlightedTable] = useState(null)
  const [showTableInput, setShowTableInput] = useState(false)
  const [tableInput, setTableInput] = useState('')
  
  useEffect(() => {
    // Get table number from URL query parameter
    const tableParam = router.query.table
    if (tableParam) {
      setHighlightedTable(parseInt(tableParam))
    }
  }, [router.query.table])

  const handleHighlightClick = () => {
    if (highlightedTable) {
      setHighlightedTable(null)
      // Remove query parameter from URL
      router.push('/floorplan', undefined, { shallow: true })
    } else {
      setShowTableInput(true)
    }
  }

  const handleTableSubmit = () => {
    const tableNumber = parseInt(tableInput)
    if (tableNumber && !isNaN(tableNumber)) {
      setHighlightedTable(tableNumber)
      setShowTableInput(false)
      setTableInput('')
    }
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="glass-card rounded-3xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-mono text-theme mb-2">Floor Plan</h2>
          <p className="text-sm md:text-base text-theme opacity-80">Pinch to zoom on mobile.</p>

          <div className="mt-6 glass-card rounded-xl p-4 md:p-6">
            <div className="relative w-full h-72 md:h-96 bg-[url('/floorplan.jpg')] bg-cover bg-center rounded-xl overflow-hidden shadow-xl">
              {/* SVG overlay for table highlights */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
                {tablePositions.map((table) => {
                  const isHighlighted = highlightedTable === table.table
                  return (
                    <g key={table.table}>
                      {table.type === 'circle' ? (
                        <circle
                          cx={`${table.x}%`}
                          cy={`${table.y}%`}
                          r={isHighlighted ? `${table.width * 1.5}%` : `${table.width}%`}
                          fill={isHighlighted ? 'rgba(0, 105, 148, 0.4)' : 'transparent'}
                          stroke={isHighlighted ? '#005577' : 'transparent'}
                          strokeWidth={isHighlighted ? '3' : '0'}
                          className="transition-all duration-300"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setHighlightedTable(table.table)}
                        />
                      ) : (
                        <rect
                          x={`${table.x}%`}
                          y={`${table.y}%`}
                          width={`${table.width}%`}
                          height={`${table.height}%`}
                          fill={isHighlighted ? 'rgba(0, 105, 148, 0.4)' : 'transparent'}
                          stroke={isHighlighted ? '#005577' : 'transparent'}
                          strokeWidth={isHighlighted ? '3' : '0'}
                          className="transition-all duration-300"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setHighlightedTable(table.table)}
                        />
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>

            <div className="mt-6 flex gap-3 justify-center">
              <button 
                onClick={() => router.push('/find-seat')} 
                className="glass-button px-5 py-2 rounded-full text-theme text-sm"
              >
                Back
              </button>
              <button 
                onClick={handleHighlightClick}
                className="glass-button-primary px-5 py-2 rounded-full text-theme text-sm"
              >
                {highlightedTable ? `Clear highlight (Table ${highlightedTable})` : 'Highlight my table'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Table Input Modal */}
      <AnimatePresence>
        {showTableInput && (
          <motion.div 
            className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowTableInput(false)
              setTableInput('')
            }}
          >
            <motion.div 
              className="glass-card max-w-sm w-full rounded-2xl p-8 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-mono text-theme mb-4">Enter Table Number</h3>
                <input
                  type="number"
                  value={tableInput}
                  onChange={(e) => setTableInput(e.target.value)}
                  placeholder="Table number..."
                  className="glass-input w-full rounded-full px-5 py-3 text-center text-theme text-lg font-medium focus:outline-none mb-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleTableSubmit()
                    } else if (e.key === 'Escape') {
                      setShowTableInput(false)
                      setTableInput('')
                    }
                  }}
                />
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => {
                      setShowTableInput(false)
                      setTableInput('')
                    }} 
                    className="glass-button px-5 py-2 rounded-full text-theme text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleTableSubmit}
                    className="glass-button-primary px-5 py-2 rounded-full text-theme text-sm"
                  >
                    Highlight
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
