import { Link } from "react-router-dom";

export default function Navbar() {
  // Mengecek apakah ada status login
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo / Nama Toko */}
      <div>
        <Link to="/" className="text-xl font-bold">MyStore</Link>
      </div>
      
      {/* Menu Navigasi Pembeli */}
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/cart" className="hover:text-gray-300">Keranjang</Link>
        
        {/* Pembatas visual */}
        <span className="text-gray-500">|</span>
        
        {/* Tombol Pintasan Login / Admin */}
        <Link 
          to={isLoggedIn ? "/admin/dashboard" : "/login"} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          {isLoggedIn ? "Admin Panel" : "Login Admin"}
        </Link>
      </div>
    </nav>
  );
}