import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface FavoriteFood {
  id: number
  name: string
  price: number
  img: string
  rating: number
}

interface FavoriteState {
  favorites: FavoriteFood[]
  toggleFavorite: (food: FavoriteFood) => void
  isFavorite: (id: number) => boolean
  removeFavorite: (id: number) => void
  clearFavorites: () => void
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (food) => {
        const current = get().favorites
        const exists = current.find(f => f.id === food.id)
        
        if (exists) {
          set({ favorites: current.filter(f => f.id !== food.id) })
        } else {
          set({ favorites: [...current, food] })
        }
      },
      isFavorite: (id) => {
        return get().favorites.some(f => f.id === id)
      },
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter(f => f.id !== id)
        }))
      },
      clearFavorites: () => set({ favorites: [] })
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

