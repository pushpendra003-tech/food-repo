import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Restaurants(){

 const navigate=useNavigate()

 const restaurants=[
 {
 id:1,
 name:"Pizza Palace",
 img:"https://images.unsplash.com/photo-1513104890138-7c749659a591"
 },
 {
 id:2,
 name:"Burger House",
 img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
 },
 {
 id:3,
 name:"Biryani Center",
 img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
 }
 ]

 return(

 <div className="p-10 grid md:grid-cols-3 gap-6">

 {restaurants.map((r)=>(

 <motion.div
 key={r.id}
 initial={{opacity:0,y:40}}
 animate={{opacity:1,y:0}}
 whileHover={{scale:1.05}}
 transition={{duration:0.4}}

 onClick={()=>navigate(`/menu/${r.id}`)}

 className="bg-white shadow rounded-lg overflow-hidden cursor-pointer"
 >

 <img src={r.img} className="h-40 w-full object-cover"/>

 <div className="p-4">
 <h2 className="text-xl font-bold">{r.name}</h2>
 </div>

 </motion.div>

 ))}

 </div>

 )

}