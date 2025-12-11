import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Drinks() {
  const router = useRouter()
  
  // Drink items - you can customize these
  const drinkCategories = [
    { category: 'Welcome Drinks', items: ['Garden Party Mocktail', 'Spicy Margarita Cocktail'] },
    { category: 'Beverages', items: ['Tatachilla Sparkling', 'Multi Regional', 'Hartogs Plate Sauvignon Blanc Semillon', 'Western Australia Hartogs Plate Cabernet Merlot', 'Western Australia Carlton Draught', 'Great Northern Super Crisp Lager (Mid Strength beer)', 'Asahi Zero', 'Altina La Vie En Rose Sparkling Rose with Rosella & Hibiscus'] },
    { category: 'Soft Drinks', items: ['Orange Juice', 'Apple Juice', 'Coke', 'Coke No Sugar', 'Lemonade', 'Squash Still Water'] },
    { category: 'Spirits', items: ['Absolut Vodka', 'Beefeater Gin', 'Havana 3 Year Old Rum', 'Olemeca Blanco Tequila', 'Chivas Regal 12 Year Old Blended Malt Whiskey', 'Fireball'] }
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
            <h2 className="text-3xl md:text-4xl font-mono text-theme">Drinks</h2>
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
          <div className="mt-6 space-y-6">
            {drinkCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: categoryIndex * 0.1, duration: 0.4 }}
                className="glass-card rounded-xl p-5"
              >
                <h3 className="text-2xl font-mono text-theme font-semibold mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05), duration: 0.3 }}
                      className="text-theme opacity-90 pl-4 border-l-2 border-theme/30"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

