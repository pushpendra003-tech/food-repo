import { create } from "zustand"
import { persist } from "zustand/middleware"

interface OrderItem {
  id: number
  name: string
  qty: number
  price: number
  image: string
}

interface OrderStatus {
  id: string
  label: string
  icon: string
  color: string
  timestamp: string
}

interface Order {
  id: string
  orderNumber: string
  items: OrderItem[]
  restaurant: string
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
  statusHistory: OrderStatus[]
  deliveryAddress: string
  estimatedDelivery: string
  paymentMethod: string
  rating?: number
}

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  addOrder: (order: Omit<Order, 'id'>) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  rateOrder: (orderId: string, rating: number) => void
  setCurrentOrder: (order: Order) => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: '1',
          orderNumber: '#ORD12345',
          items: [
            { id: 1, name: 'Butter Chicken', qty: 2, price: 250, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200' },
            { id: 2, name: 'Naan Bread', qty: 4, price: 50, image: 'https://images.unsplash.com/photo-1617096700796-f02844019a66?w=200' }
          ],
          restaurant: 'Spice Palace',
          total: 850,
          status: 'delivered',
          statusHistory: [
            { id: '1', label: 'Order Placed', icon: '📝', color: 'gray', timestamp: '2 hours ago' },
            { id: '2', label: 'Confirmed', icon: '✅', color: 'green', timestamp: '1.5 hours ago' },
            { id: '3', label: 'Preparing', icon: '🔥', color: 'orange', timestamp: '1 hour ago' },
            { id: '4', label: 'Out for Delivery', icon: '🚚', color: 'blue', timestamp: '30 mins ago' },
            { id: '5', label: 'Delivered', icon: '📦', color: 'green', timestamp: '5 mins ago' }
          ],
          deliveryAddress: '123 Food Street, Tasty City',
          estimatedDelivery: '30 mins',
          paymentMethod: 'Credit Card',
          rating: 5
        },
        {
          id: '2',
          orderNumber: '#ORD12346',
          items: [
            { id: 3, name: 'Veggie Pizza', qty: 1, price: 450, image: 'https://images.unsplash.com/photo-1574071318507-1cdbab79c9c5?w=200' }
          ],
          restaurant: 'Pizza Haven',
          total: 450,
          status: 'out_for_delivery',
          statusHistory: [
            { id: '1', label: 'Order Placed', icon: '📝', color: 'gray', timestamp: '45 mins ago' },
            { id: '2', label: 'Confirmed', icon: '✅', color: 'green', timestamp: '40 mins ago' },
            { id: '3', label: 'Preparing', icon: '🔥', color: 'orange', timestamp: '25 mins ago' },
            { id: '4', label: 'Out for Delivery', icon: '🚚', color: 'blue', timestamp: '5 mins ago' }
          ],
          deliveryAddress: '456 Delicious Ave, Flavor Town',
          estimatedDelivery: '15 mins',
          paymentMethod: 'UPI'
        }
      ],
      currentOrder: null,
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, { ...order, id: Date.now().toString() }]
      })),
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  status,
                  statusHistory: [...order.statusHistory, {
                    id: Date.now().toString(),
                    label: status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' '),
                    icon: status === 'delivered' ? '📦' : status === 'out_for_delivery' ? '🚚' : status === 'preparing' ? '🔥' : '✅',
                    color: status === 'delivered' || status === 'confirmed' ? 'green' : status === 'out_for_delivery' ? 'blue' : 'orange',
                    timestamp: new Date().toLocaleString()
                  }]
                }
              : order
          )
        }))
      },
      rateOrder: (orderId, rating) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, rating } : order
          )
        }))
      },
      setCurrentOrder: (order) => set({ currentOrder: order })
    }),
    {
      name: 'order-storage'
    }
  )
)

