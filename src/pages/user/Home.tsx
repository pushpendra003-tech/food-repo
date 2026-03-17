import Navbar from "../../components/layout/Navbar"
import { useCartStore } from "../../store/cartStore"
import { useFavStore } from "../../store/favoriteStore"
import { Heart, Star, Search } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Home(){

 const addToCart = useCartStore((s)=>s.addToCart)
 const toggleFav = useFavStore((s)=>s.toggleFav)

 const [category,setCategory] = useState("All")
 const [search,setSearch] = useState("")

 const foods = [

 {
 id:1,
 name:"Burger",
 price:120,
 rating:4.5,
 category:"Fast Food",
 img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
 },

 {
 id:2,
 name:"Pizza",
 price:250,
 rating:4.8,
 category:"Fast Food",
 img:"https://images.unsplash.com/photo-1513104890138-7c749659a591"
 },

 {
 id:3,
 name:"Pasta",
 price:180,
 rating:4.3,
 category:"Italian",
 img:"https://images.unsplash.com/photo-1525755662778-989d0524087e"
 },

 {
 id:4,
 name:"Sushi",
 price:350,
 rating:4.9,
 category:"Japanese",
 img:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351"
 }

 ]

 const filteredFoods = foods
  .filter(f => category==="All" || f.category===category)
  .filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

 return(

 <div className="bg-gray-100 min-h-screen">

 <Navbar/>

 {/* HERO SECTION */}

 <div className="bg-orange-500 text-white py-16 text-center">

 <h1 className="text-4xl font-bold mb-2">
 Delicious Food Delivered Fast
 </h1>

 <p className="opacity-90">
 Order your favorite meals from top restaurants
 </p>

 {/* SEARCH */}

 <div className="mt-6 flex justify-center">

 <div className="bg-white flex items-center px-4 py-2 rounded-lg shadow w-80">

 <Search size={18} className="text-gray-400"/>

 <input
 type="text"
 placeholder="Search food..."
 value={search}
 onChange={(e)=>setSearch(e.target.value)}
 className="ml-2 outline-none w-full text-black"
 />

 </div>

 </div>

 </div>

 {/* CATEGORY FILTER */}

 <div className="flex gap-4 justify-center mt-8 flex-wrap">

 {["All","Fast Food","Italian","Japanese"].map((cat)=>(

 <button
 key={cat}
 onClick={()=>setCategory(cat)}
 className={`px-5 py-2 rounded-full text-sm font-medium transition ${
 category===cat
 ? "bg-orange-500 text-white shadow"
 : "bg-white shadow hover:bg-orange-100"
 }`}
 >
 {cat}
 </button>

 ))}

 </div>

 {/* FOOD GRID */}

 <div className="max-w-6xl mx-auto py-12 grid md:grid-cols-3 gap-8 px-4">

 {filteredFoods.map((food)=>(

 <motion.div

 key={food.id}

 initial={{opacity:0,y:40}}
 animate={{opacity:1,y:0}}
 transition={{duration:0.4}}

 whileHover={{scale:1.05}}

 className="bg-white rounded-xl shadow-lg overflow-hidden"

 >

 <img
 src={food.img}
 className="h-48 w-full object-cover"
 />

 <div className="p-4">

 <div className="flex justify-between items-center">

 <h3 className="text-xl font-bold">
 {food.name}
 </h3>

 <Heart
 className="cursor-pointer text-gray-400 hover:text-red-500"
 onClick={()=>toggleFav(food)}
 />

 </div>

 {/* RATING */}

 <div className="flex items-center gap-1 text-yellow-500 mt-1">

 <Star size={16}/>
 <span className="text-sm text-gray-700">
 {food.rating}
 </span>

 </div>

 <p className="text-orange-500 font-semibold mt-2 text-lg">
 ₹{food.price}
 </p>

 <button
 onClick={()=>addToCart(food)}
 className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
 >
 Add to Cart
 </button>

 </div>

 </motion.div>

 ))}

 </div>

 </div>

 )

}