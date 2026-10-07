import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { events } from "../../utils/data";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  // Mencari data event berdasarkan parameter ID di URL
  const event = events.find((e) => e.id === parseInt(id));
  
  // Handling jika event tidak ditemukan
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-bold text-gray-700">Event tidak ditemukan</h2>
        <Link to="/" className="text-blue-500 mt-2 hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  const isSoldOut = event.quota === 0;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link to="/" className="text-blue-500 mb-6 inline-block hover:underline">
        &larr; Kembali ke Jadwal
      </Link>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full md:w-1/2 object-cover h-64 md:h-auto" 
        />
        
        <div className="p-8 md:w-1/2 flex flex-col">
          <div className="flex gap-2 mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
              {event.category}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
              Sisa Kuota: {event.quota}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-4 flex items-center gap-2">
            📅 {event.date}
          </p>
          
          <p className="text-2xl font-bold text-gray-900 mb-6">
            {event.price === 0 ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Deskripsi Kegiatan:</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
          
          <button 
            onClick={() => addToCart(event)}
            disabled={isSoldOut}
            className={`mt-auto w-full py-3 rounded-lg font-bold text-lg transition-colors ${
              isSoldOut 
                ? "bg-red-100 text-red-500 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
            }`}
          >
            {isSoldOut ? "Pendaftaran Penuh" : "Daftar Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}