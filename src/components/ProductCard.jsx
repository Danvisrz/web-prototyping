import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ item }) {
  const { addToCart } = useContext(CartContext);

  // Cek apakah kuota event habis
  const isSoldOut = item.quota === 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-40 object-cover rounded-lg mb-4" 
      />
      
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
          {item.category}
        </span>
        <span className="text-xs text-gray-500 font-medium border px-2 py-1 rounded">
          Sisa Kuota: {item.quota}
        </span>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h2>
      <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
        📅 {item.date}
      </p>
      
      <p className="text-md font-bold text-gray-900 mb-4">
        {item.price === 0 ? "Gratis" : `Rp ${item.price.toLocaleString("id-ID")}`}
      </p>
      
      <div className="mt-auto flex gap-2">
        <Link 
          to={`/product/${item.id}`} 
          className="flex-1 bg-gray-100 text-center text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Detail
        </Link>
        
        {/* Conditional Rendering: Tombol berubah style dan disable jika kuota habis */}
        <button 
          onClick={() => addToCart(item)}
          disabled={isSoldOut}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            isSoldOut 
              ? "bg-red-100 text-red-500 cursor-not-allowed" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSoldOut ? "Penuh" : "Daftar"}
        </button>
      </div>
    </div>
  );
}