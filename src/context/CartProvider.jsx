import { useEffect, useState } from "react";
import { CartContext } from "./CartContext.js";

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
      const hasProductData = item && Number.isInteger(item.id) && item.id > 0;
      const hasQuantity = Number.isInteger(item.quantity) && item.quantity > 0;
      return hasProductData && hasQuantity;
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

  const items = cart.map(({ id, quantity, ...product }) => ({
    ...product,
    id,
    quantity,
  }));
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  function getQuantity(productId) {
    return cart.find((item) => item.id === Number(productId))?.quantity || 0;
  }

  function canAddToCart(product) {
    const stock = Number(product.estoque);
    if (!Number.isSafeInteger(stock) || stock < 0) return true;
    return stock > 0 && getQuantity(product.id) < stock;
  }

  function addToCart(product) {
    if (!canAddToCart(product)) return false;

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, ...product, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentCart, { ...product, id: product.id, quantity: 1 }];
    });
    return true;
  }

  function updateQuantity(productId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1) return;
    const product = cart.find((item) => item.id === productId);
    const stock = Number(product?.estoque);
    if (Number.isSafeInteger(stock) && stock >= 0 && quantity > stock) return;

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
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
      value={{
        items,
        totalItems,
        addToCart,
        canAddToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
