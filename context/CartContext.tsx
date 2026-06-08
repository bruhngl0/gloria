"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { shopifyFetch } from "@/lib/shopify";
import { GET_CART_QUERY, CREATE_CART_MUTATION, ADD_CART_LINES_MUTATION, UPDATE_CART_LINES_MUTATION, REMOVE_CART_LINES_MUTATION } from "@/lib/queries";
import { Cart } from "@/types/shopify";

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  checkoutUrl: string;
  isOpen: boolean;
  isLoading: boolean;
  addToCart: (variantId: string, quantity: number) => Promise<boolean>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart on mount
  useEffect(() => {
    async function initCart() {
      const storedCartId = localStorage.getItem("sbg-cart-id");
      if (storedCartId) {
        try {
          setIsLoading(true);
          const data = await shopifyFetch<{ cart: Cart | null }>(GET_CART_QUERY, {
            cartId: storedCartId,
          });
          
          if (data.cart) {
            setCart(data.cart);
          } else {
            // Cart expired or deleted on Shopify
            localStorage.removeItem("sbg-cart-id");
            localStorage.removeItem("sbg-checkout-url");
          }
        } catch (err) {
          console.error("Error fetching existing cart, resetting:", err);
          localStorage.removeItem("sbg-cart-id");
          localStorage.removeItem("sbg-checkout-url");
        } finally {
          setIsLoading(false);
        }
      }
    }
    initCart();
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  // Helper to create cart and return it
  const createNewCart = async (variantId: string, quantity: number): Promise<Cart> => {
    const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(CREATE_CART_MUTATION, {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
    });

    const newCart = data.cartCreate.cart;
    localStorage.setItem("sbg-cart-id", newCart.id);
    localStorage.setItem("sbg-checkout-url", newCart.checkoutUrl);
    return newCart;
  };

  const addToCart = async (variantId: string, quantity: number): Promise<boolean> => {
    setIsLoading(true);
    try {
      const storedCartId = localStorage.getItem("sbg-cart-id");
      
      let updatedCart: Cart;

      if (!storedCartId) {
        // No cart exists, create a new one
        updatedCart = await createNewCart(variantId, quantity);
      } else {
        // Cart exists, add items to it
        try {
          const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(ADD_CART_LINES_MUTATION, {
            cartId: storedCartId,
            lines: [
              {
                merchandiseId: variantId,
                quantity,
              },
            ],
          });
          updatedCart = data.cartLinesAdd.cart;
        } catch (err) {
          console.error("Cart addition failed, creating new cart:", err);
          // If addition fails (e.g. cart expired), create a new cart
          updatedCart = await createNewCart(variantId, quantity);
        }
      }

      setCart(updatedCart);
      openCart(); // Automatically open cart drawer on successful addition
      return true;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    const storedCartId = localStorage.getItem("sbg-cart-id");
    if (!storedCartId) return;

    setIsLoading(true);
    try {
      const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(REMOVE_CART_LINES_MUTATION, {
        cartId: storedCartId,
        lineIds: [lineId],
      });
      setCart(data.cartLinesRemove.cart);
    } catch (err) {
      console.error("Error removing item from cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(lineId);
      return;
    }

    const storedCartId = localStorage.getItem("sbg-cart-id");
    if (!storedCartId) return;

    setIsLoading(true);
    try {
      const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(UPDATE_CART_LINES_MUTATION, {
        cartId: storedCartId,
        lines: [
          {
            id: lineId,
            quantity,
          },
        ],
      });
      setCart(data.cartLinesUpdate.cart);
    } catch (err) {
      console.error("Error updating item quantity:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const cartCount = cart ? cart.totalQuantity : 0;
  const checkoutUrl = cart ? cart.checkoutUrl : "";

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        checkoutUrl,
        isOpen,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
