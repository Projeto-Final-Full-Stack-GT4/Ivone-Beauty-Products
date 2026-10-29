
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  function addToWishlist(productId) {
    setWishlistIds((currentIds) => {
      if (currentIds.includes(productId)) {
        return currentIds;
      }

      return [...currentIds, productId];
    });
  }

  function removeFromWishlist(productId) {
    setWishlistIds((currentIds) =>
      currentIds.filter((id) => id !== productId)
    );
  }

  function isInWishlist(productId) {
    return wishlistIds.includes(productId);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
