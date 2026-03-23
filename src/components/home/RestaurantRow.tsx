import { restaurants } from '../../data/restaurants'
import { Star } from 'lucide-react'

interface RestaurantRowProps {
  title: string
}

export default function RestaurantRow({ title }: RestaurantRowProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src={restaurant.img} 
              alt={restaurant.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 line-clamp-1">{restaurant.name}</h3>
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{restaurant.rating}</span>
                </div>
                <span>•</span>
                <span>{restaurant.deliveryTime}</span>
              </div>
              <p className="text-orange-500 font-semibold text-sm">{restaurant.cuisines.join(', ')}</p>
              {restaurant.discount && (
                <div className="mt-2 bg-gradient-to-r from-orange-100 to-yellow-100 p-2 rounded-lg">
                  <span className="text-orange-600 font-semibold text-xs">{restaurant.discount}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
