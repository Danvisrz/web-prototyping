import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Mengecek apakah ada status login di localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Jika tidak ada, tendang pengguna kembali ke halaman login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada, izinkan akses ke komponen anak (Outlet)
  return <Outlet />;
}