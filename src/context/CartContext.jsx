import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Cek agar tidak menduplikasi tiket yang sama
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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}