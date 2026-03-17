import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "../../store/cartStore"

export default function FoodCard({id,name,price,img}:any){

 const addToCart=useCartStore((s)=>s.addToCart)

 const [fav,setFav]=useState(false)

 return(

 <motion.div

 initial={{opacity:0,y:40}}
 animate={{opacity:1,y:0}}
 whileHover={{scale:1.05}}
 transition={{duration:0.4}}

 className="bg-white shadow rounded-lg overflow-hidden"

 >

 <img src={img} className="h-40 w-full object-cover"/>

 <div className="p-4">

 <div className="flex justify-between">

 <h2 className="font-bold">{name}</h2>

 <Heart
 className={`cursor-pointer ${fav?"text-red-500":"text-gray-400"}`}
 onClick={()=>setFav(!fav)}
 />

 </div>

 <p className="text-orange-500 mt-2">
 ₹{price}
 </p>

 <motion.button

 whileTap={{scale:0.9}}

 onClick={()=>addToCart({id,name,price,img})}

 className="mt-3 bg-orange-500 text-white px-4 py-2 rounded"

 >
 Add to Cart
 </motion.button>

 </div>

 </motion.div>

 )
}