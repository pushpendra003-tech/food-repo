import Hero from "../../components/home/Hero"
import CategoryTabs from "../../components/home/CategoryTabs"
import RestaurantRow from "../../components/home/RestaurantRow"
import FoodCarousel from "../../components/home/FoodCarousel"
import SkeletonLoader from "../../components/home/SkeletonLoader"
import TrendingFoods from "../../components/TrendingFoods"
import { foods } from "../../data/foods"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { useCartStore } from "../../store/cartStore"
const categories = ["All", "Pizza", "Burger", "Biryani", "Noodles", "Pasta", "Veg", "Fast Food"]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("Your Location")
  const [loading, setLoading] = useState(false)
  
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesCategory = activeCategory === "All" || food.category.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularFoods = foods.filter((food) => food.isPopular)
  const trendingFoods = foods.slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />
      
      {/* Search & Location Bar */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for restaurant, cuisine or dish"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-2xl font-semibold cursor-pointer hover:shadow-lg transition-all">
              📍 <span>{location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      )}

      {/* Restaurants */}
      {!loading && (
        <>
          <RestaurantRow title="Restaurants Near You" />
          
          {/* Food Carousels */}
          <FoodCarousel foods={popularFoods} title="Popular Items" />
          {filteredFoods.length > 0 && (
            <FoodCarousel foods={filteredFoods} title={`Filtered Foods (${filteredFoods.length})`} />
          )}
          <FoodCarousel foods={trendingFoods} title="Trending Now" />
          
          {/* Deals Section */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-3xl p-12 text-center shadow-2xl">
      <h2 className="text-4xl font-bold text-black mb-4">Hungry? Get ₹150 OFF!</h2>
              <p className="text-xl mb-8 opacity-90">Order above ₹299 to unlock amazing deals</p>
              <button className="bg-white text-orange-500 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
                View All Deals
              </button>
            </div>
          </div>

          {/* Old Trending - Keep as fallback */}
          <TrendingFoods />
        </>
      )}
    </div>
  )
}
