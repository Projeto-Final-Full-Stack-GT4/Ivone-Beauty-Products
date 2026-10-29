import { useEffect, useState } from "react";
import { CartContext } from "./CartContext.js";
import products from "../data/products";

const STORAGE_KEY = "ivone-cart";

function readCart() {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = window.localStorage.getItem(STORAGE_KEY);
    if (!storedCart) return [];

    const parsedCart = JSON.parse(storedCart);
    if (!Array.isArray(parsedCart)) {
      throw new Error("Os dados salvos no carrinho não são uma lista.");
    }

    return parsedCart.filter((item) => {
      const productExists = products.some((product) => product.id === item.id);
      return productExists && Number.isInteger(item.quantity) && item.quantity > 0;
    });
  } catch (error) {
    console.error("Não foi possível carregar o carrinho salvo.", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Não foi possível salvar o carrinho no armazenamento local.", error);
    }
  }, [cart]);

  const items = cart.map(({ id, quantity }) => ({
    ...products.find((product) => product.id === id),
    quantity,
  }));
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentCart, { id: product.id, quantity: 1 }];
    });
  }

  function updateQuantity(productId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ items, totalItems, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
