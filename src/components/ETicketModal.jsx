export default function ETicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  const qrData = `EVENTHUB-${ticket.id}-${ticket.title}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFFDF9] border border-[#E8E1D5] max-w-md w-full p-6 shadow-2xl relative">
        {/* Tombol Close */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-[#7A736B] hover:text-[#2C2A29] font-bold text-lg"
        >
          ✕
        </button>

        {/* Tampilan Tiket */}
        <div id="e-ticket-content" className="border border-[#B88E4C] p-6 text-center space-y-4 bg-[#FFFDF9]">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B88E4C] font-semibold block">
            E-Ticket Resmi • EventHub
          </span>
          <h2 className="text-xl font-serif text-[#2C2A29] leading-tight">{ticket.title}</h2>
          
          <div className="text-xs text-[#7A736B] space-y-1 font-light border-y border-[#E8E1D5] py-3">
            <p>🗓️ <strong>Tanggal:</strong> {ticket.date}</p>
            <p>📍 <strong>Lokasi:</strong> Undiksha Central Campus</p>
            <p>🎟️ <strong>Kategori:</strong> {ticket.category}</p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center pt-2">
            <img src={qrUrl} alt="QR Code Tiket" className="w-36 h-36 border border-[#E8E1D5] p-2 bg-white" />
            <span className="text-[10px] font-mono text-[#7A736B] mt-2">ID: TKT-{ticket.id}-2026</span>
          </div>
        </div>

        {/* Aksi Cetak */}
        <button
          onClick={() => window.print()}
          className="mt-6 w-full bg-[#B88E4C] text-white py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#9A7336] transition-colors"
        >
          Cetak / Simpan PDF
        </button>
      </div>
    </div>
  );
}