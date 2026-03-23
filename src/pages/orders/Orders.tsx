import { useOrderStore } from '../../store/orderStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Package, Truck, CheckCircle, Star, ShoppingBag, MapPin, CreditCard, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const statusConfig = {
  pending: { label: 'Order Placed', icon: Clock, color: 'orange' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'blue' },
  preparing: { label: 'Preparing', icon: ShoppingBag, color: 'yellow' },
  'out_for_delivery': { label: 'Out for Delivery', icon: Truck, color: 'purple' },
  delivered: { label: 'Delivered', icon: Package, color: 'green' },
  cancelled: { label: 'Cancelled', icon: Clock, color: 'red' }
} as const

export default function Orders() {
  const orders = useOrderStore(state => state.orders)
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'past'>('all')
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return ['pending', 'confirmed', 'preparing', 'out_for_delivery'].includes(order.status)
    return activeTab === 'past' && ['delivered', 'cancelled'].includes(order.status)
  })

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <ShoppingBag className="w-32 h-32 text-gray-300 mx-auto mb-8" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            No Orders Yet
          </h2>
          <p className="text-xl text-gray-500 mb-8">Your orders will appear here once you place them</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
            Your Orders
          </h1>
          <p className="text-xl text-gray-600">Track and manage all your food orders</p>
          
          {/* Tabs */}
          <div className="flex bg-gray-100/50 rounded-2xl p-1 mt-8">
            {[
              { key: 'all' as const, label: 'All Orders' },
              { key: 'active' as const, label: 'Active' },
              { key: 'past' as const, label: 'Past' }
            ].map(tab => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all text-sm ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 group"
              >
                {/* Header */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-pink-50">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg ring-4 ring-orange-100"></div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{order.orderNumber}</h2>
                        <p className="text-gray-600">{order.restaurant}</p>
                      </div>
                    </div>
                    <div className="flex-1 lg:text-right">
                      <div className="flex items-center gap-2 text-xl font-bold text-emerald-600 mb-1">
                        ₹{order.total}
                      </div>
                      <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shadow-md" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                          <p className="text-sm text-gray-600">x{item.qty}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="col-span-3 flex items-center justify-center text-gray-500 p-6 border-dashed border-2 border-gray-200 rounded-2xl">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start gap-6">
                    {/* Timeline Steps */}
                    <div className="flex-1 space-y-6">
                      {order.statusHistory.slice(-5).map((step, stepIndex) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: stepIndex * 0.1 }}
                          className={`flex items-start gap-4 p-4 rounded-2xl ${
                            step.color === 'green' 
                              ? 'bg-emerald-50 border-emerald-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md ${
                            step.color === 'green' ? 'bg-emerald-500 text-white' : 'bg-white border text-gray-600'
                          }`}>
                            {step.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{step.label}</p>
                            <p className="text-sm text-gray-500">{step.timestamp}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="w-64 space-y-4 shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                        onClick={() => useCartStore.getState().clearCart()}
                      >
                        Reorder
                      </motion.button>
                      <button className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Track Order
                      </button>
                      {!order.rating && (
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <button key={star} className="text-2xl text-yellow-400 hover:text-yellow-500 transition-colors">
                              ★
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

