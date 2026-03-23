import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  qty: number
}

interface CartState {
  cart: CartItem[]
  totalItems: number
  subtotal: number
  tax: number
  delivery: number
  grandTotal: number
  promoDiscount: number
  addToCart: (item: Omit<CartItem, 'qty'>) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  updatePromo: (code: string, discount: number) => void
}

const createCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const updateTotals = () => {
        const state = get()
        const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
        const tax = subtotal * 0.1
        const grandTotal = subtotal + tax + state.delivery - state.promoDiscount

        set({
          subtotal,
          tax,
          totalItems: state.cart.reduce((sum, item) => sum + item.qty, 0),
          grandTotal
        })
      }

      return {
        cart: [],
        promoDiscount: 0,
        subtotal: 0,
        tax: 0,
        delivery: 50,
        totalItems: 0,
        grandTotal: 0,
        addToCart: (item) => {
          set((state) => {
            const exist = state.cart.find(i => i.id === item.id)
            const newCart = exist
              ? state.cart.map(i => 
                  i.id === item.id 
                    ? { ...i, qty: i.qty + 1 } 
                    : i
                )
              : [...state.cart, { ...item, qty: 1, image: item.image || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=120&h=120&fit=crop&crop=center' } as CartItem]
            return { cart: newCart }
          })
          updateTotals()
        },
        increaseQty: (id) => {
          set((state) => ({
            cart: state.cart.map(item =>
              item.id === id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          }))
          updateTotals()
        },
        decreaseQty: (id) => {
          set((state) => ({
            cart: state.cart.map(item =>
              item.id === id && item.qty > 1
                ? { ...item, qty: item.qty - 1 }
                : item
            ).filter(item => !(item.id === id && item.qty <= 0))
          }))
          updateTotals()
        },
        removeFromCart: (id) => {
          set((state) => ({
            cart: state.cart.filter(item => item.id !== id)
          }))
          updateTotals()
        },
        clearCart: () => {
          set({ cart: [] })
          updateTotals()
        },
        updatePromo: (code, discount) => {
          if (code === 'SAVE10') {
            set({ promoDiscount: discount })
            updateTotals()
          }
        }
      }
    },
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useCartStore = createCartStore

