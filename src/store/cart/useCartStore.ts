import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { CartState, CartItem } from "./types";

export const useCartStore = create<CartState>()(
  subscribeWithSelector((set) => ({
    items: {},

    addToCart: (product) =>
      set((state) => {
        const existing = state.items[product.id];
        if (existing !== undefined) {
          return {
            items: {
              ...state.items,
              [product.id]: { ...existing, quantity: existing.quantity + 1 },
            },
          };
        }
        const newItem: CartItem = {
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        };
        return { items: { ...state.items, [product.id]: newItem } };
      }),

    removeFromCart: (id) =>
      set((state) => {
        const next = { ...state.items };
        delete next[id];
        return { items: next };
      }),

    increaseQty: (id) =>
      set((state) => {
        const item = state.items[id];
        if (item === undefined) return state;
        return {
          items: { ...state.items, [id]: { ...item, quantity: item.quantity + 1 } },
        };
      }),

    decreaseQty: (id) =>
      set((state) => {
        const item = state.items[id];
        if (item === undefined) return state;
        if (item.quantity <= 1) {
          const next = { ...state.items };
          delete next[id];
          return { items: next };
        }
        return {
          items: { ...state.items, [id]: { ...item, quantity: item.quantity - 1 } },
        };
      }),

    clearCart: () => set({ items: {} }),
  }))
);

export const selectCartItem = (id: string) => (state: CartState): CartItem | undefined =>
  state.items[id];

export const selectCartItemCount = (state: CartState): number =>
  Object.values(state.items).reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: CartState): number =>
  Object.values(state.items).reduce((sum, item) => sum + item.price * item.quantity, 0);
