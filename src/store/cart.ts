// src/store/cart.ts
import { create } from 'zustand'

type Product = {
  id: number
  name: string
  price: number
  imageUrl: string
}

type CartItem = Product & { quantity: number }

type CartStore = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const { items } = get()
    const existing = items.find(item => item.id === product.id)
    if (existing) {
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },
  removeFromCart: (id) => {
    const { items } = get()
    set({ items: items.filter(item => item.id !== id) })
  },
  clearCart: () => set({ items: [] }),
}))
