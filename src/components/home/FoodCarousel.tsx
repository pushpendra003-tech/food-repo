'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { foods } from '../../data/foods'
import { useCartStore } from '../../store/cartStore'
import { useFavoriteStore } from '../../store/favoriteStore'
import { Heart } from 'lucide-react'


interface FoodCarouselProps {
  foods: any[]
  title: string
}

export default function FoodCarousel({ foods, title }: FoodCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const addToCart = useCartStore((state) => state.addToCart)
  const { toggleFavorite: toggleFav, isFavorite: isFav } = useFavoriteStore()

  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === foods.length - 4 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? foods.length - 4 : prev - 1))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{title}</h2>
        <div className="flex gap-2">
          <button onClick={prevSlide} className="p-2 bg-white shadow-md rounded-full hover:shadow-lg transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="p-2 bg-white shadow-md rounded-full hover:shadow-lg transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {foods.map((food) => (
            <div key={food.id} className="min-w-[25%]">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={food.img} 
                    alt={food.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      food.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {food.isVeg ? 'VEG' : 'NON-VEG'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{food.name}</h3>
                    <Heart 
                      onClick={() => toggleFav(food)}
                      className={`cursor-pointer transition-all w-5 h-5 ${
                        isFav(food.id) ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-400 hover:text-red-500'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="font-semibold text-orange-500">₹{food.price}</span>
                    <span>•</span>
                    <span>{food.deliveryTime}</span>
                  </div>
                  <button
                    onClick={() => addToCart(food)}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 shadow-lg transition-all"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
