import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah halaman refresh
    
    // Logika dummy login
    if (username === "admin" && password === "password") {
      localStorage.setItem("isLoggedIn", "true"); // Simpan status login
      navigate("/admin/dashboard"); // Arahkan ke dashboard admin
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-12">
      <div className="bg-[#FFFDF9] border border-[#E8E1D5] p-8 sm:p-10 shadow-sm w-full max-w-md">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#B88E4C] font-semibold block mb-1">
            Autentikasi Admin
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2C2A29] tracking-tight">
            Portal Akses
          </h2>
          <div className="w-12 h-px bg-[#B88E4C] mx-auto mt-3 opacity-70"></div>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-3 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C] transition-colors"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-3 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C] transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-[#B88E4C] text-white py-3 px-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#9A7336] transition-colors duration-300"
            >
              Masuk Panel
            </button>
          </div>
        </form>

        {/* Navigation Link Kembali */}
        <div className="mt-8 pt-6 border-t border-[#E8E1D5] text-center">
          <Link 
            to="/" 
            className="text-xs tracking-[0.15em] uppercase text-[#7A736B] hover:text-[#B88E4C] transition-colors duration-300 font-medium inline-flex items-center gap-2"
          >
            <span>&larr;</span> Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}