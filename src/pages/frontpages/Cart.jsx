import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import ETicketModal from "../../components/ETicketModal";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#B88E4C] font-semibold block">
            Pendaftaran Event
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2C2A29] tracking-tight">
            Tiket Saya
          </h1>
          <div className="w-12 h-px bg-[#B88E4C] mx-auto mt-3 opacity-70"></div>
        </div>
        
        {cart.length === 0 ? (
          <div className="bg-[#FFFDF9] p-10 text-center border border-[#E8E1D5] shadow-sm">
            <p className="text-[#7A736B] mb-6 font-light text-sm tracking-wide">
              Kamu belum mendaftar event apa pun.
            </p>
            <Link 
              to="/" 
              className="inline-block border border-[#B88E4C] text-[#B88E4C] hover:bg-[#B88E4C] hover:text-white px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300"
            >
              Cari Event
            </Link>
          </div>
        ) : (
          <div className="bg-[#FFFDF9] border border-[#E8E1D5] shadow-sm overflow-hidden">
            <ul className="divide-y divide-[#E8E1D5]">
              {cart.map((ticket) => (
                <li key={ticket.id} className="p-5 flex flex-col sm:flex-row items-center justify-between hover:bg-[#FAF7F2] transition-colors">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img 
                      src={ticket.image} 
                      alt={ticket.title} 
                      className="w-16 h-16 object-cover bg-[#F4EFE6] border border-[#E8E1D5]" 
                    />
                    <div>
                      <h3 className="font-serif text-lg text-[#2C2A29] leading-snug">{ticket.title}</h3>
                      <p className="text-xs text-[#7A736B] mt-1 font-light">🗓️ {ticket.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                    <button 
                      onClick={() => setSelectedTicket(ticket)}
                      className="flex-1 sm:flex-initial text-[11px] tracking-[0.15em] uppercase text-[#B88E4C] border border-[#B88E4C] hover:bg-[#B88E4C] hover:text-white px-4 py-2 transition-all font-medium"
                    >
                      E-Tiket
                    </button>
                    <button 
                      onClick={() => removeFromCart(ticket.id)}
                      className="flex-1 sm:flex-initial text-[11px] tracking-[0.15em] uppercase text-[#A84343] border border-[#A84343]/40 hover:bg-[#A84343] hover:text-white px-4 py-2 transition-all font-medium"
                    >
                      Batal
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal E-Tiket */}
        <ETicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      </div>
    </div>
  );
}