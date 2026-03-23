import MainLayout from "../../src/components/layout/MainLayout";
import { useOrderStore } from "../../src/store/orderStore";
import { Link } from "react-router-dom";

export default function OwnerOrders() {
  const orders = useOrderStore((s: {orders: OrderType[]}) => s.orders) as OrderType[];
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Orders Management
              </h1>
              <p className="text-xl text-gray-600 mt-2">Track all restaurant orders, update status & view details</p>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {orders.length} Orders
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-8 border border-gray-100">
            <div className="flex flex-wrap gap-4">
              <Link to="/owner/orders?status=all" className="px-6 py-2 bg-orange-100 text-orange-800 rounded-2xl font-semibold hover:bg-orange-200 transition-all">
                All
              </Link>
              <Link to="/owner/orders?status=pending" className="px-6 py-2 bg-blue-100 text-blue-800 rounded-2xl font-semibold hover:bg-blue-200 transition-all">
                Pending
              </Link>
              <Link to="/owner/orders?status=preparing" className="px-6 py-2 bg-yellow-100 text-yellow-800 rounded-2xl font-semibold hover:bg-yellow-200 transition-all">
                Preparing
              </Link>
              <Link to="/owner/orders?status=ready" className="px-6 py-2 bg-green-100 text-green-800 rounded-2xl font-semibold hover:bg-green-200 transition-all">
                Ready
              </Link>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {orders.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h3>
                <p className="text-gray-500">Your first order will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-gray-200">
                      <th className="p-6 text-left font-semibold text-gray-800">Order ID</th>
                      <th className="p-6 text-left font-semibold text-gray-800">Customer</th>
                      <th className="p-6 text-left font-semibold text-gray-800">Items</th>
                      <th className="p-6 text-right font-semibold text-gray-800">Total</th>
                      <th className="p-6 text-right font-semibold text-gray-800">Status</th>
                      <th className="p-6 text-right font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
{orders.filter(o => statusFilter === 'all' || o.status === statusFilter).map((order: OrderType) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-6 font-mono font-semibold text-lg text-gray-900">#{order.id}</td>
                        <td className="p-6">
                          <div>
                            <p className="font-semibold text-gray-900">{order.customerName || 'Customer'}</p>
                            <p className="text-sm text-gray-500">{order.phone || 'N/A'}</p>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between">
                                <span className="text-gray-700">{item.name}</span>
                                <span className="font-semibold">x{item.qty}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <span className="text-2xl font-bold text-orange-600">₹{order.total}</span>
                        </td>
                        <td className="p-6 text-right">
                          <span className="inline-flex px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg">
                            Preparing
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex gap-2 justify-end">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 shadow-lg transition-all">
                              View
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 shadow-lg transition-all">
                              Ready
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-gray-600">
              Showing 1 to {orders.length} of {orders.length} orders
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:shadow-md transition-all">
                Previous
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 shadow-lg transition-all">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
