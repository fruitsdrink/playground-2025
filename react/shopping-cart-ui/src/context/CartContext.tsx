/* eslint-disable react-refresh/only-export-components */
import React, { createContext, use, useEffect, useState } from "react";
import type { Product } from "../types";
import toast from "react-hot-toast";

export interface CartItem extends Product {
  quantity: number;
}
type CartContextProps = {
  cart: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};
const CartContext = createContext<CartContextProps>({
  cart: [],
  itemCount: 0,
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Added to cart");
  };

  const removeFromCart = (productId: number) => {
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex].quantity -= 1;
      if (newCart[itemIndex].quantity === 0) {
        newCart.splice(itemIndex, 1);
      }
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, itemCount, total, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = use(CartContext);
  if (context === undefined) {
    throw new Error("useCarts must be used within a CartProvider");
  }
  return context;
}
