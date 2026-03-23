import { create } from 'zustand'

interface Order {
  id: number
  restaurant: string
  customer: string
  status: 'pending' | 'picked' | 'delivered' | 'cancelled'
  payout: number
  distance: number
  eta: number
}

interface DeliveryState {
  activeOrders: Order[]
  history: Order[]
  earnings: number
  rating: number
  acceptOrder: (id: number) => void
  completeOrder: (id: number) => void
  cancelOrder: (id: number) => void
}

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
  activeOrders: [
    { id: 1, restaurant: 'Pizza Palace', customer: 'John Doe', status: 'pending', payout: 85, distance: 2.4, eta: 12 },
    { id: 2, restaurant: 'Burger King', customer: 'Jane Smith', status: 'picked', payout: 65, distance: 1.8, eta: 8 },
  ],
  history: [],
  earnings: 3280,
  rating: 4.9,
  acceptOrder: (id) => set((state) => ({
    activeOrders: state.activeOrders.map(order => 
      order.id === id ? { ...order, status: 'picked' } : order
    )
  })),
  completeOrder: (id) => set((state) => ({
    activeOrders: state.activeOrders.filter(o => o.id !== id),
    history: [...state.history, state.activeOrders.find(o => o.id === id)!],
    earnings: state.earnings + 85
  })),
  cancelOrder: (id) => set((state) => ({
    activeOrders: state.activeOrders.filter(o => o.id !== id)
  }))
}))
