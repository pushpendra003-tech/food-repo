import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOrderStore } from '../../src/store/orderStore';
import { useRestaurantStore } from '../../src/store/restaurantStore';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend,
  LayoutDashboard, ShoppingCart, TrendingUp, Users 
} from 'recharts';
import { CalendarDays, TrendingUp as TrendIcon, Users as UsersIcon, DollarSign } from 'lucide-react';

const COLORS = ['#f97316', '#eab308', '#10b981', '#3b82f6', '#8b5cf6'];

const chartData = [
  { name: 'Mon', orders: 12, revenue: 12450 },
  { name: 'Tue', orders: 18, revenue: 18900 },
  { name: 'Wed', orders: 15, revenue: 15600 },
  { name: 'Thu', orders: 22, revenue: 23800 },
  { name: 'Fri', orders: 28, revenue: 31200 },
  { name: 'Sat', orders: 35, revenue: 38900 },
  { name: 'Sun', orders: 24, revenue: 26700 },
];

const categoryData = [
  { name: 'Pizza', value: 45 },
  { name: 'Burger', value: 32 },
  { name: 'Chinese', value: 28 },
  { name: 'Indian', value: 22 },
  { name: 'Dessert', value: 18 },
];

export default function OwnerDashboard() {
  const location = useLocation();
  const orders = useOrderStore((state) => state.orders);
  const { restaurants, selectedRestaurant } = useRestaurantStore();
  const myRestaurant = selectedRestaurant || restaurants[0];

  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
  const avgRating = myRestaurant?.rating || 4.8;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your restaurant today.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/owner/menu"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all shadow-lg"
          >
            ➕ Add Dish
          </Link>
          <Link
            to="/owner/orders"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all shadow-lg"
          >
            📋 Orders
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{orders.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-semibold">Today's Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-semibold">Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{myRestaurant?.ordersToday || 0}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-semibold">Busy Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center">
              <UsersIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{avgRating}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-semibold">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            Weekly Revenue
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-xs rounded-full text-green-800 dark:text-green-200 font-semibold">
              +18.2%
            </span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="transparent" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-6">Top Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            Recent Orders
            <Link to="/owner/orders" className="text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300">
              View all →
            </Link>
          </h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {orders.slice(0, 5).map((order: any) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  #{order.id.slice(-4)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{order.restaurant}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.items?.length || 0} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl text-emerald-600 dark:text-emerald-400">₹{order.total || 0}</p>
                <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                  (order.status || '') === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' 
                  : (order.status || '') === 'preparing' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                }`}>
                  {(order.status || 'pending').replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

