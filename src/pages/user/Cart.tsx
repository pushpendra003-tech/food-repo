import { useCartStore } from '../../store/cartStore'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Minus, Plus, ShoppingBag, Package, CreditCard, BadgeCheck, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, totalItems, subtotal, tax, delivery, grandTotal, promoDiscount, removeFromCart, increaseQty, decreaseQty, clearCart, updatePromo } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoError, setPromoError] = useState('')


  const handlePromo = () => {
    if (promoCode === 'SAVE10') {
      useCartStore.getState().updatePromo(promoCode, 10)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Your cart is empty
          </h2>
          <p className="text-xl text-gray-500 mb-8">Looks like you haven't added anything yet</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Start Shopping
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12"
        >
          <div className="flex flex-col lg:flex-row gap-12 mb-12">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl">
                  {totalItems}
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                  Your Cart
                </h1>
              </div>

              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    className="flex items-center gap-6 p-6 mb-6 border border-gray-100 rounded-3xl hover:shadow-xl hover:border-orange-200 transition-all duration-300 group bg-white/50"
                  >
                    <img
                      src={item.image || '/api/placeholder/120/120'}
                      alt={item.name}
                      className="w-24 h-24 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-gray-800 mb-1 truncate">{item.name}</h3>
                      <p className="text-2xl font-bold text-orange-600 mb-4">₹{item.price * item.qty}</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-12 h-12 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-orange-50 text-gray-600 hover:text-orange-600 transition-all duration-200 flex items-center justify-center"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-12 text-center text-xl font-bold text-gray-800">{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-12 h-12 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-orange-50 text-gray-600 hover:text-orange-600 transition-all duration-200 flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-4 mt-12 p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl">
                <input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={handlePromo}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm mt-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {promoError}
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:w-80">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sticky top-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Package className="w-5 h-5" />
                      Delivery
                    </span>
                    <span>₹{delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <BadgeCheck className="w-5 h-5" />
                      Tax
                    </span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-6 border-gray-100">
                  <div className="flex justify-between text-2xl font-bold mb-6">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <CreditCard className="w-6 h-6" />
                    Proceed to Checkout
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearCart}
                    className="w-full mt-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Clear Cart
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

