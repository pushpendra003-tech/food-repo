import { useCartStore } from '../../store/cartStore'
import { useOrderStore } from '../../store/orderStore'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ShoppingBag, MapPin, Clock, Package, Star, Truck, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const orderId = location.state?.orderId as string
  const currentOrder = useOrderStore(state => state.orders.find(o => o.id === orderId) || null)
  
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleTrack = () => {
    if (currentOrder) {
      useOrderStore.getState().setCurrentOrder(currentOrder)
      navigate('/orders')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-orange-50 flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 max-w-2xl w-full mx-auto"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl ring-8 ring-emerald-100/50"
        >
          <CheckCircle className="w-20 h-20 text-white drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-6"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-semibold text-gray-700 mb-12 max-w-md mx-auto leading-relaxed"
        >
          Your delicious food is on its way! 
          <span className="text-emerald-600 block font-bold mt-2">Order #{currentOrder?.orderNumber || 'ORD-XXXXX'}</span>
        </motion.p>

        {/* Order Summary */}
        {currentOrder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-b from-white/70 to-emerald-50/50 backdrop-blur-xl rounded-2xl p-8 mb-12 shadow-xl border border-emerald-100"
          >
            <div className="flex flex-col items-center p-6 bg-white/50 rounded-xl">
              <Truck className="w-16 h-16 text-emerald-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Delivery</h3>
              <p className="text-2xl font-black text-emerald-600">25-35 mins</p>
              <p className="text-sm text-gray-500">{currentOrder.estimatedDelivery}</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/50 rounded-xl">
              <MapPin className="w-16 h-16 text-orange-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Address</h3>
              <p className="text-lg">{currentOrder.deliveryAddress}</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/50 rounded-xl">
              <CreditCard className="w-16 h-16 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Payment</h3>
              <p className="text-xl font-bold text-emerald-600">₹{currentOrder.total}</p>
              <p className="text-sm capitalize">{currentOrder.paymentMethod}</p>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTrack}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-8 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
          >
            📦 Track Order
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-8 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            🍕 Order More
          </motion.button>
        </div>

        {countdown > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-lg font-semibold text-emerald-600"
          >
            Redirecting to Orders in {countdown}...
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}

