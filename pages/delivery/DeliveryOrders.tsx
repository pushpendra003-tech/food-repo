import MainLayout from "../../src/components/layout/MainLayout";
import { useDeliveryStore } from "../../src/store/deliveryStore";
import { Button } from "../../src/components/ui/Button";

interface Order {
  id: number;
  restaurant: string;
  customer: string;
  status: 'pending' | 'picked' | 'delivered' | 'cancelled';
  payout: number;
  distance: number;
  eta: number;
}

export default function DeliveryOrders() {
  const {
    activeOrders,
    history,
    acceptOrder,
    completeOrder,
    cancelOrder
  } = useDeliveryStore();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Delivery Orders
              </h1>
              <p className="text-xl text-gray-600 mt-2">Manage active deliveries and delivery history</p>
            </div>
            <div className="flex gap-4 text-2xl">
              <span className="px-6 py-3 bg-emerald-100 text-emerald-800 rounded-2xl font-bold">
                Active: {activeOrders.length}
              </span>
              <span className="px-6 py-3 bg-gray-100 text-gray-800 rounded-2xl font-bold">
                History: {history.length}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-3xl p-1 shadow-xl mb-8 border border-gray-100">
            <div className="flex bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-1">
              <Link to="/delivery/orders" className="flex-1 py-3 px-6 text-center font-semibold text-emerald-800 bg-white rounded-xl shadow-lg">
                Active ({activeOrders.length})
              </Link>
              <Link to="/delivery/history" className="flex-1 py-3 px-6 text-center font-semibold text-gray-600 hover:text-gray-800">
                History ({history.length})
              </Link>
            </div>
          </div>

          {/* Active Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {activeOrders.map((order: Order) => (
              <div key={order.id} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-emerald-100 hover:border-emerald-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                      #{order.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 capitalize">{order.restaurant}</h3>
                      <p className="text-2xl font-bold text-emerald-600">₹{order.payout}</p>
                      <p className="text-sm text-gray-600">{order.distance}km • {order.eta}min</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 text-xs font-bold rounded-full ${
                    order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    order.status === 'picked' ? 'bg-blue-100 text-blue-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                      📍
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Pickup</p>
                      <p className="text-sm text-gray-600">Pizza Palace, Main St</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                      🏠
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Dropoff</p>
                      <p className="text-sm text-gray-600">{order.customer}, {order.distance}km away</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  {order.status === 'pending' && (
                    <Button 
                      onClick={() => acceptOrder(order.id)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold shadow-lg"
                    >
                      ✅ Accept
                    </Button>
                  )}
                  {order.status === 'picked' && (
                    <Button 
                      onClick={() => completeOrder(order.id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg"
                    >
                      ✅ Delivered
                    </Button>
                  )}
                  <Button 
                    onClick={() => cancelOrder(order.id)}
                    className="px-6 bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg transition-all"
                  >
                    ✕ Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {activeOrders.length === 0 && (
            <div className="text-center py-24">
              <div className="w-32 h-32 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-5xl">🚚</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">No Active Deliveries</h3>
              <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
                Go online to start accepting delivery orders from nearby restaurants
              </p>
              <Button className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-xl">
                Go Online Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
