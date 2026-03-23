import { useFavoriteStore, type FavoriteFood } from '../../store/favoriteStore'
import { useCartStore } from '../../store/cartStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Trash2, ShoppingCart, Search, Filter, Grid, List } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Favorites() {
  const favorites = useFavoriteStore(state => state.favorites)
  const { toggleFavorite, removeFavorite, clearFavorites } = useFavoriteStore()
  const addToCart = useCartStore(state => state.addToCart)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteFood[]>([])

  useEffect(() => {
    const filtered = favorites.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredFavorites(filtered)
  }, [favorites, searchTerm])

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex flex-col items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <Heart className="w-32 h-32 text-gray-300 mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            No Favorites Yet
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Discover delicious foods and tap the ❤️ to save them here for quick access later.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all"
          >
            Explore Foods
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
                Your Favorites ❤️
              </h1>
              <p className="text-xl text-gray-600">({favorites.length}) saved items</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFavorites}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
                Clear All
              </motion.button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-center justify-between">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your favorites..."
                className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid gap-6 md:gap-8"
            style={{ gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr' }}
          >
            {filteredFavorites.map((food, index) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
                className="group bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 overflow-hidden hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={food.img}
                    alt={food.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFavorite(food)}
                    className={`absolute top-4 right-4 p-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
                      useFavoriteStore.getState().isFavorite(food.id)
                        ? 'bg-red-500 text-white shadow-red-500/25'
                        : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white shadow-white'
                    }`}
                  >
                    <Heart className="w-6 h-6" fill={useFavoriteStore.getState().isFavorite(food.id) ? 'currentColor' : 'none'} />
                  </motion.button>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`w-5 h-5 fill-current ${i < Math.floor(food.rating) ? 'text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                      <span className="text-sm font-bold text-white drop-shadow-md">{food.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 line-clamp-2">
                    {food.name}
                  </h3>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl font-black text-orange-600 drop-shadow-md">
                      ₹{food.price}
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
                      Popular
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(food)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-6 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredFavorites.length === 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No favorites match "{searchTerm}"</h3>
            <p className="text-gray-500">Try different keywords</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

