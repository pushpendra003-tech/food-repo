import { useCartStore } from "../../store/cartStore"
import { motion } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {

 const cart = useCartStore((state)=>state.cart)

 const total = cart.reduce((sum,item)=>sum + item.price,0)

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: open ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed top-0 right-0 h-full w-96 bg-white/95 backdrop-blur-xl shadow-2xl z-50 border-l border-gray-200"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Your Cart
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X className="w-6 h-6 text-gray-500" />
          </motion.button>
        </div>

        {cart.length === 0 ? (

    {cart.map((item, index) => (

     <div
     key={index}
     className="flex justify-between mb-3 border-b pb-2"
     >

      <p>{item.name}</p>

      <p className="text-orange-500">
      ₹{item.price}
      </p>

     </div>

    ))}

    {cart.length > 0 && (

    <div className="mt-6">

     <div className="flex justify-between font-bold text-lg mb-4">

      <p>Total</p>
      <p>₹{total}</p>

     </div>

     <button
     className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
     >
     Checkout
     </button>

    </div>

    )}

   </div>

  </div>

 )
}