import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Hero(){

 const navigate = useNavigate()

 return(

 <div className="bg-orange-500 text-white py-24">

 <div className="max-w-6xl mx-auto text-center px-6">

 <motion.h1
 initial={{opacity:0,y:40}}
 animate={{opacity:1,y:0}}
 transition={{duration:0.6}}
 className="text-5xl font-bold mb-6"
 >
 Delicious Food Delivered To Your Door
 </motion.h1>

 <motion.p
 initial={{opacity:0}}
 animate={{opacity:1}}
 transition={{delay:0.3}}
 className="text-lg mb-8"
 >
 Order from the best restaurants near you
 </motion.p>

 <button
 onClick={()=>navigate("/restaurants")}
 className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold"
 >
 Explore Restaurants
 </button>

 </div>

 </div>

 )

}