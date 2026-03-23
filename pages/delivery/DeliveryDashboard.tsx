import MainLayout from "../../src/components/layout/MainLayout";
import { useDeliveryStore } from "../../src/store/deliveryStore";
import { useAuthStore } from "../../src/store/authStore";
import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, DollarSign, Package, Star, MapPin 
} from 'lucide-react';
import { Download, Calendar } from 'lucide-react';

export default function DeliveryDashboard() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const role = useAuthStore((s: any) => s.user?.role);
  const delivery = useDeliveryStore();
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-12">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                Delivery Dashboard
              </h1>
              <p className="text-gray-600">Real-time orders, earnings & performance</p>
            </div>
            <div className="flex bg-white rounded-2xl shadow-lg border p-1">
              <button 
                onClick={() => setPeriod('week')} 
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${period === 'week' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setPeriod('month')} 
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${period === 'month' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="group bg-white p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Package className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-emerald-600">{delivery.activeOrders.length}</p>
                  <p className="text-sm uppercase tracking-wide font-semibold text-gray-600">Active Orders</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">47</p>
                  <p className="text-sm uppercase tracking-wide font-semibold text-gray-600">Delivered Today</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <DollarSign className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">₹{delivery.earnings}</p>
                  <p className="text-sm uppercase tracking-wide font-semibold text-gray-600">Today's Earnings</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <Star className="w-7 h-7 text-yellow-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-600">{delivery.rating}</p>
                  <p className="text-sm uppercase tracking-wide font-semibold text-gray-600">Avg Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Active Orders */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                  🚚
                </span>
                Active Deliveries (3)
              </h3>
              <div className="space-y-4">
{delivery.activeOrders.map((order: any) => (
                  <div key={order.id} className="group p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border-2 border-emerald-100 hover:border-emerald-200 hover:shadow-xl transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                          Order #{order.id}
                        </div>
                        <div>
                          <p className="font-bold text-lg text-gray-900">Pizza Palace → John Doe</p>
                          <p className="text-sm text-gray-600">2.4 km • Est: 12 min</p>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        Picked Up
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>📍 Restaurant</span>
                      <span className="w-20 bg-gray-200 h-1 rounded-full"></span>
                      <span>🏠 Customer</span>
                    </div>
                    <div className="flex gap-3 pt-4 border-t">
                      <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-lg transition-all">
                        Mark Delivered
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">
                        Navigate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  💰
                </span>
                Earnings
              </h3>
              <div className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100">
<p className="text-4xl font-bold text-green-600 mb-2">₹{delivery.earnings}</p>
                  <p className="text-lg text-gray-600">Today's Total</p>
                  <p className="text-sm text-green-600 font-semibold mt-2">+₹680 (12% ↑)</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Yesterday</span>
                    <span className="font-bold text-gray-900">₹2,600</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-bold text-xl mb-2 text-gray-900">Go Online</h4>
              <p className="text-gray-600 text-sm">Start accepting orders</p>
            </button>

            <button className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="font-bold text-xl mb-2 text-gray-900">View Profile</h4>
              <p className="text-gray-600 text-sm">Ratings & documents</p>
            </button>

            <button className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="font-bold text-xl mb-2 text-gray-900">Payouts</h4>
              <p className="text-gray-600 text-sm">Withdraw earnings</p>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

