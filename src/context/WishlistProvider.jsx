import { useEffect, useState } from 'react';
import { WishlistContext } from './WishlistContext.jsx';

const STORAGE_KEY = 'ivone-wishlist';

function readWishlist() {
  if (typeof window === 'undefined') return [];

  try {
    const storedWishlist = window.localStorage.getItem(STORAGE_KEY);
    if (!storedWishlist) return [];

    const parsedWishlist = JSON.parse(storedWishlist);
    if (!Array.isArray(parsedWishlist)) {
      throw new Error('Os dados salvos na wishlist não são uma lista.');
    }

    return parsedWishlist.filter((product) => product && Number.isInteger(product.id) && product.id > 0);
  } catch (error) {
    console.error('Não foi possível carregar a wishlist salva.', error);
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readWishlist);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Não foi possível salvar a wishlist no armazenamento local.', error);
    }
  }, [items]);

  function toggleWishlist(product) {
    setItems((currentItems) => {
      const exists = currentItems.some((item) => item.id === product.id);
      if (exists) {
        return currentItems.filter((item) => item.id !== product.id);
      }

      return [...currentItems, { ...product, id: Number(product.id) }];
    });
  }

  function isInWishlist(productId) {
    return items.some((item) => item.id === productId);
  }

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
