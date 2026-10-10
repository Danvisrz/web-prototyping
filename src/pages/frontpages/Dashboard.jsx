import { useState, useContext } from "react";
import { EventContext } from "../../context/EventContext";
import ProductCard from "../../components/ProductCard";
import { CartContext } from "../../context/CartContext";

export default function Dashboard() {
  const { events } = useContext(EventContext); // Ambil data event dari Context
  const { wishlist } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(false);

  const categories = ["Semua", "Akademik", "Teknologi & Penalaran", "Kemahasiswaan", "IT & Developer"];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || event.category === selectedCategory;
    const matchesWishlist = !showOnlyWishlist || wishlist.some((w) => w.id === event.id);

    return matchesSearch && matchesCategory && matchesWishlist;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2C2A29] tracking-tight">
            Jadwal Event & Workshop
          </h1>
          <div className="w-16 h-px bg-[#B88E4C] mx-auto mt-4 opacity-70"></div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FFFDF9] border border-[#E8E1D5] p-6 mb-10 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <input
              type="text"
              placeholder="Cari nama event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 border border-[#E8E1D5] bg-[#FAF7F2]/50 p-3 text-xs text-[#2C2A29] focus:outline-none focus:border-[#B88E4C]"
            />
            <button
              onClick={() => setShowOnlyWishlist(!showOnlyWishlist)}
              className={`w-full md:w-auto px-4 py-3 text-xs tracking-[0.15em] uppercase font-semibold border transition-all flex items-center justify-center gap-2 ${
                showOnlyWishlist 
                  ? "bg-[#B88E4C] text-white border-[#B88E4C]" 
                  : "border-[#E8E1D5] text-[#7A736B] hover:border-[#B88E4C]"
              }`}
            >
              <svg className="w-4 h-4" fill={showOnlyWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Bookmark Saya ({wishlist.length})
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E8E1D5]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[11px] tracking-wider uppercase transition-all ${
                  selectedCategory === cat
                    ? "bg-[#2C2A29] text-[#FFFDF9]"
                    : "bg-[#FAF7F2] text-[#7A736B] border border-[#E8E1D5] hover:border-[#B88E4C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List Card Event */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-[#7A736B] text-sm">
            Tidak ada event yang sesuai.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <ProductCard key={event.id} item={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}