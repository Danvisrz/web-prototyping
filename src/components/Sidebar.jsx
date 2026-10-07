import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-64 bg-white shadow-md flex flex-col justify-between`}>
      <div>
        <div className="p-4 font-bold text-xl border-b">My Admin</div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/admin/dashboard" className="hover:bg-gray-200 p-2 rounded">Dashboard</Link>
          <Link to="/admin/about" className="hover:bg-gray-200 p-2 rounded">About</Link>
          
          {/* Tombol pembatas untuk memisahkan menu admin dan menu publik */}
          <hr className="my-2" />
          
          {/* Tombol kembali ke toko */}
          <Link to="/" className="text-blue-600 hover:bg-blue-50 p-2 rounded font-medium">
            ← Lihat Toko
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}