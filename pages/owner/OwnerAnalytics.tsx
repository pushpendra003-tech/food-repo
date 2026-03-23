import { useState } from 'react';
import { useOrderStore } from '../../src/store/orderStore';
///import { useOrderStore } from '@/store/orderStore';
import { useRestaurantStore } from '../../src/store/restaurantStore';
//import { useRestaurantStore } from '@/store/restaurantStore';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Download, Calendar, TrendingUp, Users, Percent, DollarSign } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function OwnerAnalytics() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [dateRange, setDateRange] = useState('This Week');
  const orders = useOrderStore((s: any) => s.orders);
  const { restaurants } = useRestaurantStore();
  const myRestaurant = restaurants[0];

  const filteredOrders = orders;

  const stats = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0),
    avgOrderValue: filteredOrders.length ? filteredOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0) / filteredOrders.length : 0,
    avgRating: myRestaurant?.rating || 4.8,
    conversionRate: '12.5%',
    monthlyGrowth: '+18.2%'
  };

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

  const topCustomers = [
    { name: 'John Doe', orders: 12, revenue: 4560 },
    { name: 'Jane Smith', orders: 8, revenue: 3120 },
    { name: 'Mike Johnson', orders: 7, revenue: 2890 },
    { name: 'Sarah Wilson', orders: 6, revenue: 2340 },
    { name: 'David Brown', orders: 5, revenue: 1980 },
  ];

  const handleExport = (format: 'csv' | 'pdf') => {
    alert(`Exporting analytics as ${format.toUpperCase()}`);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Detailed business insights and trends</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-1">
            <button onClick={() => setPeriod('week')} className={`px-4 py-2 rounded-xl font-semibold transition-all ${period === 'week' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Week
            </button>
            <button onClick={() => setPeriod('month')} className={`px-4 py-2 rounded-xl font-semibold transition-all ${period === 'month' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Month
            </button>
            <button onClick={() => setPeriod('year')} className={`px-4 py-2 rounded-xl font-semibold transition-all ${period === 'year' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Year
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold hover:shadow-xl shadow-lg transition-all">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
        </div>
      </div>

      {/* Revenue Highlight */}
      <div className="text-right">
        <p className="text-4xl lg:text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
          ₹{stats.totalRevenue.toLocaleString()}
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-400">Total Revenue {dateRange}</p>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">+18.2% from last period</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="group bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all col-span-1 md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
              <TrendingUp className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalOrders}</p>
              <p className="text-sm uppercase tracking-wide font-semibold text-gray-600 dark:text-gray-400">Orders</p>
            </div>
          </div>
        </div>

        <div className="group bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all col-span-1 md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              <DollarSign className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{stats.avgOrderValue.toFixed(0)}</p>
              <p className="text-sm uppercase tracking-wide font-semibold text-gray-600 dark:text-gray-400">Avg Order Value</p>
            </div>
          </div>
        </div>

        <div className="group bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all col-span-1 md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
              <Percent className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.conversionRate}</p>
              <p className="text-sm uppercase tracking-wide font-semibold text-gray-600 dark:text-gray-400">Conversion Rate</p>
            </div>
          </div>
        </div>

        <div className="group bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-2xl flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
              <Users className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.avgRating}</p>
              <p className="text-sm uppercase tracking-wide font-semibold text-gray-600 dark:text-gray-400">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Bar Chart - Sales */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl lg:text-2xl font-bold mb-6 flex items-center gap-2">
            📊 Weekly Sales
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="orders" fill="#f97316" name="Orders" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl lg:text-2xl font-bold mb-6 flex items-center gap-2">
            🥧 Category Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 xl:col-span-2">
          <h3 className="text-xl lg:text-2xl font-bold mb-6 flex items-center gap-2">
            📈 Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} activeDot={{ r: 8 }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            Top Customers
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
                <th className="p-6 text-left font-semibold text-gray-900 dark:text-gray-100">Customer</th>
                <th className="p-6 text-center font-semibold text-gray-900 dark:text-gray-100">Orders</th>
                <th className="p-6 text-right font-semibold text-gray-900 dark:text-gray-100">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="p-6 font-semibold text-gray-900 dark:text-gray-100">{customer.name}</td>
                  <td className="p-6 text-center font-semibold text-emerald-600 dark:text-emerald-400">{customer.orders}</td>
                  <td className="p-6 text-right font-bold text-xl text-blue-600 dark:text-blue-400">₹{customer.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => handleExport('csv')}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-lg"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
        <button 
          onClick={() => handleExport('pdf')}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-lg"
        >
          <Download className="w-5 h-5" />
          Export PDF Report
        </button>
      </div>
    </div>
  );
}

