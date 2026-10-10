import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CountdownTimer from "./CountdownTimer";

export default function ProductCard({ item }) {
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);

  // Pendaftaran ditutup jika kuota 0 ATAU status isOpen = false
  const isSoldOut = item.quota === 0;
  const isRegistrationClosed = item.isOpen === false;
  const isDisabled = isSoldOut || isRegistrationClosed;

  const isBookmarked = wishlist?.some((e) => e.id === item.id);

  // Label Tombol
  const getButtonLabel = () => {
    if (isSoldOut) return "Penuh";
    if (isRegistrationClosed) return "Ditutup";
    return "Daftar";
  };

  return (
    <div className="bg-[#FFFDF9] border border-[#E8E1D5] p-5 flex flex-col h-full hover:border-[#B88E4C] hover:shadow-lg transition-all duration-300 group relative">
      
      {/* Tombol Bookmark */}
      <button 
        onClick={() => toggleWishlist(item)}
        className="absolute top-7 right-7 z-10 bg-[#FFFDF9]/90 border border-[#E8E1D5] p-2 shadow-sm hover:border-[#B88E4C] transition-colors flex items-center justify-center"
        title={isBookmarked ? "Hapus dari Bookmark" : "Simpan Event"}
      >
        <svg 
          className="w-4 h-4 text-[#B88E4C]" 
          fill={isBookmarked ? "#B88E4C" : "none"} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>

      {/* Gambar Event */}
      <div className="overflow-hidden mb-4 bg-[#F4EFE6] aspect-video">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      
      {/* Kategori & Kuota */}
      <div className="flex justify-between items-center mb-3 text-[11px] tracking-wider uppercase">
        <span className="text-[#B88E4C] font-semibold bg-[#F7F2E8] px-2.5 py-1 border border-[#E8E1D5]">
          {item.category}
        </span>
        <span className="text-[#7A736B] border border-[#E8E1D5] px-2 py-1">
          Sisa Kuota: <strong className="text-[#2C2A29]">{item.quota}</strong>
        </span>
      </div>

      {/* Judul Event */}
      <h2 className="text-xl font-serif text-[#2C2A29] mb-2 line-clamp-2 leading-snug">
        {item.title}
      </h2>

      {/* Tanggal */}
      <p className="text-xs text-[#7A736B] mb-2 flex items-center gap-1.5 font-light">
        <span>🗓️</span> {item.date}
      </p>

      {/* Hitung Mundur */}
      <CountdownTimer targetDate={item.targetDate} />
      
      {/* Harga */}
      <p className="text-lg font-serif font-bold text-[#B88E4C] my-3">
        {item.price === 0 ? "Gratis" : `Rp ${item.price.toLocaleString("id-ID")}`}
      </p>
      
      {/* Tombol Aksi */}
      <div className="mt-auto flex gap-2 pt-2">
        <Link 
          to={`/product/${item.id}`} 
          className="flex-1 text-center py-2.5 px-3 text-xs tracking-widest uppercase border border-[#2C2A29] text-[#2C2A29] hover:bg-[#2C2A29] hover:text-[#FFFDF9] transition-colors font-medium"
        >
          Detail
        </Link>
        
        <button 
          onClick={() => addToCart(item)}
          disabled={isDisabled}
          className={`flex-1 py-2.5 px-3 text-xs tracking-widest uppercase transition-all font-medium border ${
            isDisabled 
              ? "bg-[#F2ECE4] text-[#A39B8E] border-[#E8E1D5] cursor-not-allowed" 
              : "bg-[#B88E4C] text-white border-[#B88E4C] hover:bg-[#9A7336]"
          }`}
        >
          {getButtonLabel()}
        </button>
      </div>
    </div>
  );
}