'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, CartItem, ShoppingCart } from '@/types/data';

interface ShoppingCartContextType {
  cart: ShoppingCart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getCartItemQuantity: (productId: string) => number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: ShoppingCart };

function cartReducer(state: ShoppingCart, action: CartAction): ShoppingCart {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity }];
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        total,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.payload.productId);
      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        total,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { productId } });
      }
      
      const newItems = state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      
      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        total,
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        currency: 'CAD',
      };

    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
}

const initialCart: ShoppingCart = {
  items: [],
  total: 0,
  currency: 'CAD',
};

// Helper functions for localStorage
const CART_STORAGE_KEY = 'vivispa-shopping-cart';

const saveCartToStorage = (cart: ShoppingCart) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }
};

const loadCartFromStorage = (): ShoppingCart => {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate the parsed cart structure
        if (parsedCart && typeof parsedCart === 'object' && Array.isArray(parsedCart.items)) {
          return {
            items: parsedCart.items || [],
            total: parsedCart.total || 0,
            currency: parsedCart.currency || 'CAD',
          };
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }
  return initialCart;
};

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.items.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItemQuantity = (productId: string) => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const value: ShoppingCartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getCartItemQuantity,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
}