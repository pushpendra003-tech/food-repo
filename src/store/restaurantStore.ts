import { create } from 'zustand'

interface Restaurant {
  id: number
  name: string
  rating: number
  ordersToday: number
  revenue: number
  status: 'open' | 'closed' | 'busy'
}

interface RestaurantState {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  orders: any[]
  analytics: any
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => void
  updateRestaurant: (id: number, updates: Partial<Restaurant>) => void
  toggleStatus: (id: number) => void
  setSelected: (restaurant: Restaurant | null) => void
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurants: [
    { id: 1, name: 'Pizza Palace', rating: 4.8, ordersToday: 24, revenue: 12450, status: 'open' },
    { id: 2, name: 'Burger King', rating: 4.5, ordersToday: 18, revenue: 8560, status: 'busy' },
    { id: 3, name: 'Taco Bell', rating: 4.7, ordersToday: 32, revenue: 18900, status: 'closed' },
  ],
  selectedRestaurant: null,
  orders: [],
  analytics: {},
  addRestaurant: (restaurant) => set((state) => ({
    restaurants: [...state.restaurants, { ...restaurant, id: Date.now() }]
  })),
  updateRestaurant: (id, updates) => set((state) => ({
    restaurants: state.restaurants.map(r => r.id === id ? { ...r, ...updates } : r)
  })),
  toggleStatus: (id) => set((state) => ({
    restaurants: state.restaurants.map(r => 
      r.id === id ? { ...r, status: r.status === 'open' ? 'closed' : 'open' } : r
    )
  })),
  setSelected: (restaurant) => set({ selectedRestaurant: restaurant })
}))
