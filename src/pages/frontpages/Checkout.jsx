import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // State local untuk mengelola data form
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="container mx-auto p-6 max-w-lg text-center">
        <p className="text-gray-600 mb-4">Tidak ada tiket yang siap dikonfirmasi.</p>
        <Link to="/" className="text-blue-600 hover:underline">Kembali ke Jadwal Event</Link>
      </div>
    );
  }

  // Tampilan Berhasil setelah submit form (Conditional Rendering)
  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6 max-w-lg text-center">
        <div className="bg-green-50 border border-green-200 p-8 rounded-xl shadow-sm">
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-sm text-gray-600 mb-4">
            E-voucher dan konfirmasi telah dikirimkan ke email <strong className="text-gray-800">{formData.email}</strong> atas nama <strong>{formData.name}</strong> ({formData.nim}).
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Selesai & Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Form Konfirmasi Pendaftaran</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-bold text-md mb-3 text-gray-700">Ringkasan Event yang Dipilih ({cart.length})</h2>
        <ul className="mb-6 divide-y divide-gray-100 bg-gray-50 p-3 rounded-lg">
          {cart.map((item) => (
            <li key={item.id} className="py-2 flex justify-between text-sm">
              <span className="font-medium text-gray-700">{item.title}</span>
              <span className="text-blue-600 font-bold">{item.price === 0 ? "Gratis" : `Rp ${item.price.toLocaleString("id-ID")}`}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIM Mahasiswa</label>
            <input
              type="text"
              name="nim"
              required
              value={formData.nim}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: 240001001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Aktif</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="email@student.undiksha.ac.id"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md mt-4"
          >
            Konfirmasi Pendaftaran
          </button>
        </form>
      </div>
    </div>
  );
}