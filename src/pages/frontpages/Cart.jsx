import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tiket Saya</h1>
      
      {/* Conditional Rendering: Jika belum ada tiket */}
      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
          <p className="text-gray-500 mb-4">Kamu belum mendaftar event apa pun.</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Cari Event
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {cart.map((ticket) => (
              <li key={ticket.id} className="p-4 flex flex-col sm:flex-row items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img src={ticket.image} alt={ticket.title} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h3 className="font-bold text-gray-800">{ticket.title}</h3>
                    <p className="text-sm text-gray-500">📅 {ticket.date}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => removeFromCart(ticket.id)}
                  className="mt-4 sm:mt-0 text-red-500 hover:text-red-700 font-medium px-4 py-2 border border-red-200 rounded hover:bg-red-50 transition w-full sm:w-auto"
                >
                  Batalkan Pendaftaran
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}