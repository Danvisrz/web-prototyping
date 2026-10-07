import { createContext, useState } from "react";

export const CartContext = createContext(); // Tetap gunakan nama CartContext agar tidak error di file lain

export function CartProvider({ children }) {
  // Kita anggap cart = daftar tiket yang didaftarkan
  const [cart, setCart] = useState([]);

  const addToCart = (event) => {
    // Cek apakah user sudah daftar event ini
    const isRegistered = cart.find((ticket) => ticket.id === event.id);
    
    if (isRegistered) {
      alert("Kamu sudah terdaftar di event ini!");
      return;
    }

    setCart([...cart, event]);
    alert("Berhasil mendaftar event!");
  };

  const removeFromCart = (eventId) => {
    setCart(cart.filter((ticket) => ticket.id !== eventId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}