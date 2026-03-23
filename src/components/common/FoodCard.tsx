import { Heart, Star } from "lucide-react"
import { useFavoriteStore } from '../../store/favoriteStore'
import { useCallback } from 'react'

export default function FoodCard({food, addToCart}: {food: any, addToCart: (food: any) => void}) {
  const { toggleFavorite: toggleFav, isFavorite: isFav } = useFavoriteStore()


 return(

 <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">

  <div className="relative">

   <img src={food.img} className="h-48 w-full object-cover"/>

   <Heart
    onClick={()=>toggleFav(food)}
    className={`absolute top-3 right-3 cursor-pointer ${
     isFav(food.id)
     ? "text-red-500 fill-red-500"
     : "text-white"
    }`}
   />

  </div>

  <div className="p-4">

   <div className="flex justify-between">

   <h2 className="font-bold text-black text-lg mb-2 line-clamp-1">{food.name}</h2>

    <div className="flex text-yellow-500">
     <Star size={16}/>
     {food.rating}
    </div>

   </div>

   <p className="text-orange-500">₹{food.price}</p>

   <button
    onClick={()=>addToCart(food)}
    className="mt-3 w-full bg-orange-500 text-white py-2 rounded"
   >
    Add to Cart
   </button>

  </div>

 </div>

 )
}