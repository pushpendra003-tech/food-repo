import { useCartStore } from '../../store/cartStore'
import { useOrderStore } from '../../store/orderStore'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, CreditCard, User, Phone, ChevronDown, Loader2, Truck } from 'lucide-react'
import { useState } from 'react'

export default function Checkout() {
  const navigate = useNavigate()
  const cart = useCartStore(state => state.cart)
  const { subtotal, tax, delivery, grandTotal, clearCart } = useCartStore()
  const addOrder = useOrderStore(state => state.addOrder)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'address' | 'payment'>('address')
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod' as 'cod' | 'card' | 'upi'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const placeOrder = async () => {
    if (!formData.address || !formData.fullName || !formData.phone) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    addOrder({
      orderNumber: `#ORD${Date.now().toString().slice(-6)}`,
      items: cart,
      restaurant: 'Various Restaurants',
      total: grandTotal,
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      paymentMethod: formData.paymentMethod.toUpperCase(),
      estimatedDelivery: '30-45 mins',
      status: 'confirmed' as const,
      statusHistory: [{
        id: Date.now().toString(),
        label: 'Order Confirmed',
        icon: '✅',
        color: 'green',
        timestamp: new Date().toLocaleString()
      }],
      deliveryAddress: `${formData.address}, ${formData.city}`
    })

    clearCart()
    navigate('/order-success')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Truck className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to checkout</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 space-y-8"
        >
          {/* Steps */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step === 'address' ? 'bg-orange-500 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span>Address</span>
            </div>
            <div className="w-12 h-px bg-gray-200"></div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step === 'payment' ? 'bg-orange-500 text-white' : step === 'address' ? 'bg-orange-500 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span>Payment</span>
            </div>
          </div>

          {/* Step 1: Address */}
          {step === 'address' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Delivery Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm resize-none"
                  placeholder="House no, Street, Landmark"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                    placeholder="Tasty City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                    placeholder="123456"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('payment')}
                disabled={!formData.address || !formData.fullName || !formData.phone}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 mt-8"
              >
                Continue to Payment Securely →
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setStep('address')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  ← Back
                </motion.button>
                <div className="flex-1 border-b border-gray-200" />
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Secure Payment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                  <MapPin className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="font-semibold">{formData.fullName}</p>
                    <p className="text-sm text-gray-600">{formData.address}, {formData.city}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
                  <div>
                    <p className="font-semibold text-lg">Items: {cart.length}</p>
                    <p className="text-sm text-gray-600">Est. delivery 30 mins</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-emerald-600">₹{grandTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Payment Method
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'cod', label: 'Cash on Delivery', icon: '💰' },
                    { value: 'upi', label: 'UPI / Wallet', icon: '📱' },
                    { value: 'card', label: 'Credit/Debit Card', icon: '💳' }
                  ].map((method) => (
                    <motion.button
                      key={method.value}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all ${
                        formData.paymentMethod === method.value
                          ? 'border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-200'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => setFormData({ ...formData, paymentMethod: method.value as any })}
                    >
                      <span className="text-3xl">{method.icon}</span>
                      <p className="font-semibold text-gray-800">{method.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={placeOrder}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 text-white py-6 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mt-12"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-8 h-8 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-7 h-7" />
                    Place Secure Order - ₹{grandTotal.toFixed(2)}
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

