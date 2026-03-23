import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  email: string
  role: 'user' | 'owner' | 'delivery'
  token: string
}

interface AuthState {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
  getRole: () => 'user' | 'owner' | 'delivery' | null
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (userData) => {
        set({ user: userData })
        localStorage.setItem('token', userData.token)
      },
      logout: () => {
        set({ user: null })
        localStorage.removeItem('token')
      },
      isAuthenticated: false,
      getRole: () => get().user?.role || null,
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Auth store rehydration error:', error)
          return
        }
        if (state) {
          state.isAuthenticated = !!state.user
        }
      },
    }
  )
)
