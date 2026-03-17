import { foods } from "../data/foods"

export default function TrendingFoods(){

 return(

 <div className="max-w-6xl mx-auto py-16 px-6">

 <h2 className="text-3xl font-bold mb-10 text-center">
 Trending Foods 🔥
 </h2>

 <div className="grid md:grid-cols-3 gap-8">

 {foods.slice(0,3).map((food)=>(

 <div
 key={food.id}
 className="bg-white shadow rounded-lg overflow-hidden hover:scale-105 transition"
 >

 <img
 src={food.img}
 className="h-48 w-full object-cover"
 />

 <div className="p-4">

 <h3 className="text-xl font-bold mb-2">
 {food.name}
 </h3>

 <p className="text-orange-500 font-semibold">
 ₹{food.price}
 </p>

 </div>

 </div>

 ))}

 </div>

 </div>

 )

}