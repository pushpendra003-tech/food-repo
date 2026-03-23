import MainLayout from "../../src/components/layout/MainLayout";
import { useDeliveryStore } from "../../src/store/deliveryStore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';


const payoutData = [
  { day: 'Mon', amount: 850 },
  { day: 'Tue', amount: 1200 },
  { day: 'Wed', amount: 950 },
  { day: 'Thu', amount: 1650 },
  { day: 'Fri', amount: 2100 },
  { day: 'Sat', amount: 2850 },
  { day: 'Sun', amount: 1980 },
];

export default function DeliveryEarnings() {
  const { earnings, history, rating } = useDeliveryStore();
  const totalDeliveries = history.length + 10; // mock
  const avgPayout = earnings / totalDeliveries;

  const paymentMethods = [
    { name: 'UPI', value: 65 },
    { name: 'Card', value: 25 },
    { name: 'Cash', value: 10 },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Earnings Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your delivery earnings, payouts, and performance metrics
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <span className="text-xl font-bold">₹</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-emerald-600">{earnings.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Total Earnings</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <span className="text-xl font-bold">📦</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-blue-600">{totalDeliveries}</p>
                  <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Total Deliveries</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <span className="text-xl font-bold">₹</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-green-600">{avgPayout.toFixed(0)}</p>
                  <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Avg Payout</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-yellow-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <span className="text-xl font-bold">⭐</span>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-yellow-600">{rating}</p>
                  <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Avg Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Weekly Earnings */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  📊
                </span>
                Weekly Earnings
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={payoutData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
  <Tooltip formatter={(value: any) => [`₹${value as number}`, 'Earnings']} />
                  <Bar dataKey="amount" fill="#10b981" name="Earnings" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  💳
                </span>
                Payment Methods
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b'][index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payout History */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-12">
            <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-blue-50">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <span className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    💰
                  </span>
                  Payout History
                </h3>
<button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg px-6 py-3 rounded-xl font-bold text-white transition-all">
                  Request Payout
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-6 text-left font-semibold text-gray-800">Date</th>
                    <th className="p-6 text-left font-semibold text-gray-800">Deliveries</th>
                    <th className="p-6 text-right font-semibold text-gray-800">Earnings</th>
                    <th className="p-6 text-right font-semibold text-gray-800">Status</th>
                    <th className="p-6 text-right font-semibold text-gray-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[1,2,3,4,5].map((i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-6">2024-01-{24-i}</td>
                      <td className="p-6 font-semibold text-gray-900">{12 + i * 2}</td>
                      <td className="p-6 text-right">
                        <span className="text-xl font-bold text-emerald-600">₹{1200 + i * 300}</span>
                      </td>
                      <td className="p-6 text-right">
                        <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-xl">
                          Paid
                        </span>
                      </td>
                      <td className="p-6 text-right">
<button className="text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold">
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<button className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 h-full w-full text-left">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-bold text-xl mb-2 text-gray-900 text-center">Export Report</h4>
              <p className="text-gray-600 text-sm text-center">Download monthly CSV</p>
            </button>

<button className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 h-full w-full text-left">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="font-bold text-xl mb-2 text-gray-900 text-center">Ratings Analysis</h4>
              <p className="text-gray-600 text-sm text-center">Customer feedback trends</p>
            </button>

<button className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 h-full w-full text-left">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="font-bold text-xl mb-2 text-gray-900 text-center">Tax Report</h4>
              <p className="text-gray-600 text-sm text-center">Generate tax documents</p>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
