'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from './types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  initializeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      initializeCart: () => {
        // This is called on the client side to recalculate totals
        const items = get().items;
        const totalItems = items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const totalPrice = items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        set({ totalItems, totalPrice });
      },

      addToCart: product => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === product.id);

        let newItems;

        if (existingItem) {
          // Increment quantity if item already exists
          newItems = currentItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          // Add new item with quantity 1
          newItems = [...currentItems, { ...product, quantity: 1 }];
        }

        const totalItems = newItems.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const totalPrice = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      removeFromCart: productId => {
        const newItems = get().items.filter(item => item.id !== productId);
        const totalItems = newItems.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const totalPrice = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          get().removeFromCart(productId);
          return;
        }

        const newItems = get().items.map(item =>
          item.id === productId ? { ...item, quantity } : item,
        );

        const totalItems = newItems.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const totalPrice = newItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'cart-storage',
      skipHydration: true, // We'll manually hydrate in the CartProvider
    },
  ),
);
