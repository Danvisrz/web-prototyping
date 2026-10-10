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
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif text-[#2C2A29] mb-2">Event tidak ditemukan</h2>
        <Link 
          to="/" 
          className="text-xs tracking-[0.2em] uppercase text-[#B88E4C] hover:underline font-semibold"
        >
          &larr; Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const isSoldOut = event.quota === 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Tombol Kembali */}
        <Link 
          to="/" 
          className="text-xs tracking-[0.2em] uppercase text-[#7A736B] hover:text-[#B88E4C] mb-6 inline-flex items-center gap-2 transition-colors duration-300 font-medium"
        >
          <span>&larr;</span> Kembali ke Jadwal
        </Link>
        
        {/* Container Card Utama */}
        <div className="bg-[#FFFDF9] border border-[#E8E1D5] shadow-sm flex flex-col md:flex-row overflow-hidden">
          
          {/* Format Gambar Sesuai Dashboard (Aspect Video & Frame Background) */}
          <div className="w-full md:w-1/2 bg-[#F4EFE6] aspect-video md:aspect-auto overflow-hidden">
            <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover" 
          />
          </div>
          
          {/* Informasi Event */}
          <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              {/* Category & Quota Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] tracking-wider uppercase">
                <span className="text-[#B88E4C] font-semibold bg-[#F7F2E8] px-2.5 py-1 border border-[#E8E1D5]">
                  {event.category}
                </span>
                <span className="text-[#7A736B] border border-[#E8E1D5] px-2.5 py-1">
                  Sisa Kuota: <strong className="text-[#2C2A29]">{event.quota}</strong>
                </span>
              </div>
              
              {/* Judul & Tanggal */}
              <h1 className="text-2xl sm:text-3xl font-serif text-[#2C2A29] mb-2 leading-snug">
                {event.title}
              </h1>
              <p className="text-xs text-[#7A736B] mb-4 flex items-center gap-1.5 font-light">
                <span>🗓️</span> {event.date}
              </p>
              
              {/* Harga */}
              <p className="text-2xl font-serif font-bold text-[#B88E4C] mb-6">
                {event.price === 0 ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}
              </p>
              
              {/* Deskripsi */}
              <div className="mb-8 border-t border-[#E8E1D5] pt-4">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
                  Deskripsi Kegiatan
                </h3>
                <p className="text-sm text-[#2C2A29]/80 leading-relaxed font-light">
                  {event.description}
                </p>
              </div>
            </div>
            
            {/* Tombol Pendaftaran */}
            <button 
              onClick={() => addToCart(event)}
              disabled={isSoldOut}
              className={`w-full py-3 px-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-semibold border ${
                isSoldOut 
                  ? "bg-[#F2ECE4] text-[#A39B8E] border-[#E8E1D5] cursor-not-allowed" 
                  : "bg-[#B88E4C] text-white border-[#B88E4C] hover:bg-[#9A7336] hover:border-[#9A7336]"
              }`}
            >
              {isSoldOut ? "Pendaftaran Penuh" : "Daftar Sekarang"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}