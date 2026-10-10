import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // State Cart (Tiket yang terdaftar)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // State Wishlist (Bookmark)
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item) => {
    const isExist = cart.find((e) => e.id === item.id);
    if (!isExist) {
      setCart([...cart, item]);
      alert("Event berhasil didaftarkan!");
    } else {
      alert("Kamu sudah mendaftar event ini!");
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Toggle Bookmark / Wishlist
  const toggleWishlist = (item) => {
    const isBookmarked = wishlist.some((e) => e.id === item.id);
    if (isBookmarked) {
      setWishlist(wishlist.filter((e) => e.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, wishlist, toggleWishlist }}
    >
      {children}
    </CartContext.Provider>
  );
}