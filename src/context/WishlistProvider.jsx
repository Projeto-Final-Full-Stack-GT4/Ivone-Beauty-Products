import { useEffect, useState } from 'react';
import products from '../data/products';
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

    return [...new Set(parsedWishlist.filter((id) =>
      Number.isInteger(id) && products.some((product) => product.id === id)
    ))];
  } catch (error) {
    console.error('Não foi possível carregar a wishlist salva.', error);
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState(readWishlist);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
    } catch (error) {
      console.error('Não foi possível salvar a wishlist no armazenamento local.', error);
    }
  }, [productIds]);

  const items = productIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  function toggleWishlist(product) {
    setProductIds((currentIds) =>
      currentIds.includes(product.id)
        ? currentIds.filter((id) => id !== product.id)
        : [...currentIds, product.id]
    );
  }

  function isInWishlist(productId) {
    return productIds.includes(productId);
  }

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
