import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Hero(){
  const navigate = useNavigate()

  return(
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
        <motion.h1
          initial={{opacity:0,y:40}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.8}}
          className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent drop-shadow-2xl"
        >
          Food Delivered 
          <span className="block">To Your Door</span>
        </motion.h1>
        <motion.p
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.8, delay:0.2}}
          className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-95 leading-relaxed"
        >
          Order from 1000+ top-rated restaurants near you. 
          <span className="block font-semibold text-orange-100">30 min delivery • Fresh food</span>
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255,165,0,0.4)" }}
          whileTap={{ scale: 0.98 }}
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.6, delay:0.4}}
          onClick={()=>navigate("/restaurants")}
          className="bg-white text-orange-600 px-12 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300"
        >
          Order Now 🚀
        </motion.button>
      </div>
      {/* Floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 left-10 w-24 h-24 bg-white/20 rounded-full blur-xl"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-32 right-20 w-32 h-32 bg-orange-200/30 rounded-full blur-xl"
      />
    </div>
  )
}
