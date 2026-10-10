export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-2">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#B88E4C] font-semibold block">
            Panel Administrator
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2C2A29] tracking-tight">
            Tentang Sistem EventHub
          </h1>
          <div className="w-12 h-px bg-[#B88E4C] mx-auto mt-3 opacity-70"></div>
        </div>

        {/* Card Utama */}
        <div className="bg-[#FFFDF9] border border-[#E8E1D5] p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Sekilas Aplikasi */}
          <div>
            <h2 className="text-xl font-serif text-[#2C2A29] mb-3 pb-2 border-b border-[#E8E1D5]">
              Sekilas Platform
            </h2>
            <p className="text-sm text-[#2C2A29]/80 leading-relaxed font-light">
              <strong className="font-semibold text-[#2C2A29]">EventHub</strong> adalah platform manajemen pendaftaran event dan workshop terpadu. Sistem ini dirancang untuk mempermudah publikasi agenda akademik, workshop teknologi, hingga otomatisasi pendataan kuota peserta secara modern dan efisien.
            </p>
          </div>
          {/* Card Info Ringkas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAF7F2] p-4 border border-[#E8E1D5]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#B88E4C] font-semibold block mb-1">
                Versi Sistem
              </span>
              <p className="text-base font-serif text-[#2C2A29]">v1.0.0 (Production)</p>
            </div>
            
            <div className="bg-[#FAF7F2] p-4 border border-[#E8E1D5]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#B88E4C] font-semibold block mb-1">
                Teknologi
              </span>
              <p className="text-base font-serif text-[#2C2A29]">React + Vite + Tailwind v4</p>
            </div>
            
            <div className="bg-[#FAF7F2] p-4 border border-[#E8E1D5]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#B88E4C] font-semibold block mb-1">
                Pengelola
              </span>
              <p className="text-base font-serif text-[#2C2A29]">Danvi Almasrazqi Suwatno</p>
            </div>
          </div>

          {/* Fitur Utama Admin */}
          <div>
            <h2 className="text-xl font-serif text-[#2C2A29] mb-3 pb-2 border-b border-[#E8E1D5]">
              Fungsi Control Panel
            </h2>
            <ul className="text-sm text-[#7A736B] space-y-2 font-light list-disc list-inside">
              <li>Manajemen data event & workshop secara *real-time*.</li>
              <li>Sistem kontrol kuota otomatis dan pembatasan pendaftaran.</li>
              <li>Sinkronisasi data keranjang peserta menggunakan penyimpanan lokal.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}