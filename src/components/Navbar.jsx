import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  // Mengambil data cart dari CartContext
  const { cart } = useContext(CartContext);
  
  // Mengecek apakah ada status login
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <nav className="bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8E1D5] py-4 px-6 sm:px-12 flex justify-between items-center sticky top-0 z-50">
      {/* Logo / Nama Toko */}
      <div>
        <Link 
          to="/" 
          className="text-xl sm:text-2xl font-serif tracking-[0.2em] uppercase text-[#2C2A29] hover:text-[#B88E4C] transition-colors duration-300"
        >
          Event<span className="text-[#B88E4C] font-light">Hub</span>
        </Link>
      </div>
      
      {/* Menu Navigasi Pembeli */}
      <div className="flex gap-6 items-center text-xs tracking-[0.15em] uppercase font-medium">
        <Link 
          to="/" 
          className="text-[#7A736B] hover:text-[#B88E4C] transition-colors duration-300"
        >
          Dashboard
        </Link>

        {/* Menu Event Kamu + Indikator Dot Jumlah Event */}
        <Link 
          to="/cart" 
          className="relative text-[#7A736B] hover:text-[#B88E4C] transition-colors duration-300 flex items-center"
        >
          Event Kamu
          {cart && cart.length > 0 && (
            <span className="absolute -top-2 -right-3.5 bg-[#B88E4C] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-sans shadow-sm animate-pulse">
              {cart.length}
            </span>
          )}
        </Link>
        
        {/* Pembatas visual */}
        <span className="text-[#E8E1D5]">|</span>
        
        {/* Tombol Pintasan Login / Admin */}
        <Link 
          to={isLoggedIn ? "/admin/dashboard" : "/login"} 
          className="border border-[#B88E4C] text-[#B88E4C] hover:bg-[#B88E4C] hover:text-white px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 font-semibold"
        >
          {isLoggedIn ? "Admin Panel" : "Login Admin"}
        </Link>
      </div>
    </nav>
  );
}