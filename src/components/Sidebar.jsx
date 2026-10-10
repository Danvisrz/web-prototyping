import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <aside className={`${sidebarOpen ? "block" : "hidden"} md:block w-64 bg-[#FFFDF9] border-r border-[#E8E1D5] flex flex-col justify-between min-h-screen shrink-0 transition-all duration-300`}>
      <div>
        {/* Header Admin Sidebar */}
        <div className="p-6 border-b border-[#E8E1D5]">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#B88E4C] font-semibold block mb-1">
            Control Panel
          </span>
          <h2 className="text-xl font-serif tracking-[0.15em] uppercase text-[#2C2A29]">
            My Admin
          </h2>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col p-4 space-y-1.5">
          <Link 
            to="/admin/dashboard" 
            className="text-xs tracking-[0.15em] uppercase text-[#7A736B] hover:text-[#B88E4C] hover:bg-[#FAF7F2] p-3 transition-all duration-200 font-medium"
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/about" 
            className="text-xs tracking-[0.15em] uppercase text-[#7A736B] hover:text-[#B88E4C] hover:bg-[#FAF7F2] p-3 transition-all duration-200 font-medium"
          >
            About
          </Link>

          {/* Pembatas Visual */}
          <div className="my-3 border-t border-[#E8E1D5]"></div>

          {/* Tombol Kembali ke Toko / Tampilan Publik */}
          <Link 
            to="/" 
            className="text-xs tracking-[0.15em] uppercase text-[#B88E4C] hover:bg-[#F7F2E8] p-3 transition-all duration-200 font-semibold flex items-center gap-2"
          >
            <span>&larr;</span> Lihat Toko
          </Link>
        </nav>
      </div>

      {/* Tombol Logout */}
      <div className="p-6 border-t border-[#E8E1D5]">
        <button 
          onClick={handleLogout}
          className="w-full text-[11px] tracking-[0.2em] uppercase text-[#A84343] border border-[#A84343]/40 hover:bg-[#A84343] hover:text-white py-2.5 transition-all duration-300 font-semibold"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}