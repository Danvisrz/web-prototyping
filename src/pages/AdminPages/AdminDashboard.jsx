import { useState, useContext } from "react";
import { EventContext } from "../../context/EventContext";

export default function AdminDashboard() {
  const { events, addEvent, updateEvent, deleteEvent } = useContext(EventContext);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Akademik",
    date: "",
    price: 0,
    quota: 30,
    status: "Akan Datang",
    targetDate: "",
    isOpen: true, // Status Pendaftaran
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Berlangsung":
        return "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]";
      case "Selesai":
        return "bg-[#F1F3F4] text-[#5F6368] border-[#DADCE0]";
      default:
        return "bg-[#F7F2E8] text-[#B88E4C] border-[#E8E1D5]";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    if (editingId) {
      updateEvent({
        id: editingId,
        ...formData,
        price: parseInt(formData.price) || 0,
        quota: parseInt(formData.quota) || 0,
      });
      alert("Event berhasil diperbarui!");
      handleCancelEdit();
    } else {
      const created = {
        id: Date.now(),
        ...formData,
        price: parseInt(formData.price) || 0,
        quota: parseInt(formData.quota) || 0,
        description: "Event ditambahkan melalui admin panel.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
      };
      addEvent(created);
      alert("Event baru berhasil ditambahkan!");
      resetForm();
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      price: item.price ?? 0,
      quota: item.quota ?? 0,
      status: item.status || "Akan Datang",
      targetDate: item.targetDate || "",
      isOpen: item.isOpen ?? true,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus event ini?")) {
      deleteEvent(id);
    }
  };

  // Toggle Buka/Tutup Cepat dari Tabel
  const handleToggleRegistration = (item) => {
    updateEvent({ ...item, isOpen: !(item.isOpen ?? true) });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Akademik",
      date: "",
      price: 0,
      quota: 30,
      status: "Akan Datang",
      targetDate: "",
      isOpen: true,
    });
  };

  const totalEvents = events.length;
  const totalQuota = events.reduce((acc, curr) => acc + curr.quota, 0);
  const activeEvents = events.filter((e) => e.status !== "Selesai").length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#B88E4C] font-semibold block">
            Control Panel Administrator
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2C2A29] tracking-tight">
            Kelola Event & Workshop
          </h1>
          <div className="w-12 h-px bg-[#B88E4C] mx-auto mt-3 opacity-70"></div>
        </div>

        {/* Widget Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFFDF9] border border-[#E8E1D5] p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#7A736B] font-semibold block">
                Total Agenda
              </span>
              <p className="text-2xl font-serif text-[#2C2A29] mt-1">{totalEvents} Event</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F7F2E8] border border-[#E8E1D5] flex items-center justify-center text-[#B88E4C]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 022 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>

          <div className="bg-[#FFFDF9] border border-[#E8E1D5] p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#7A736B] font-semibold block">
                Event Aktif
              </span>
              <p className="text-2xl font-serif text-[#B88E4C] mt-1">{activeEvents} Kegiatan</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F7F2E8] border border-[#E8E1D5] flex items-center justify-center text-[#B88E4C]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="bg-[#FFFDF9] border border-[#E8E1D5] p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#7A736B] font-semibold block">
                Tersedia Kuota
              </span>
              <p className="text-2xl font-serif text-[#2C2A29] mt-1">{totalQuota} Kursi</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F7F2E8] border border-[#E8E1D5] flex items-center justify-center text-[#B88E4C]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Form Tambah / Edit Event */}
        <div className="bg-[#FFFDF9] border border-[#E8E1D5] p-6 sm:p-8 shadow-sm max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#E8E1D5]">
            <h2 className="text-lg font-serif text-[#2C2A29]">
              {editingId ? "Edit Informasi Event" : "Tambah Event Baru"}
            </h2>
            {editingId && (
              <button 
                onClick={handleCancelEdit}
                className="text-xs text-[#A84343] hover:underline uppercase tracking-wider font-semibold"
              >
                Batal Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
                Judul Event
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-2.5 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C]"
                placeholder="Nama kegiatan"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-2.5 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C]"
              >
                <option value="Akademik">Akademik</option>
                <option value="Teknologi & Penalaran">Teknologi & Penalaran</option>
                <option value="Kemahasiswaan">Kemahasiswaan</option>
                <option value="IT & Developer">IT & Developer</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
                Tanggal Tampilan
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-2.5 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C]"
                placeholder="Contoh: 25 November 2026"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
                Akses Pendaftaran
              </label>
              <select
                value={formData.isOpen ? "open" : "closed"}
                onChange={(e) => setFormData({ ...formData, isOpen: e.target.value === "open" })}
                className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-2.5 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C]"
              >
                <option value="open">Dibuka (Tombol Aktif)</option>
                <option value="closed">Ditutup (Tombol Mati)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
                Harga Tiket (Rp)
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-2.5 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C]"
                placeholder="0 untuk gratis"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
                Kuota Peserta
              </label>
              <input
                type="number"
                min="0"
                value={formData.quota}
                onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
                className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-2.5 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C]"
              />
            </div>

            {/* Input Target Datetime Countdown */}
            <div className="md:col-span-2">
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7A736B] font-semibold mb-2">
                Waktu Target Countdown
              </label>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  className="w-full border border-[#E8E1D5] bg-[#FAF7F2]/50 p-2.5 text-sm text-[#2C2A29] focus:outline-none focus:border-[#B88E4C]"
                />
                {formData.targetDate && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, targetDate: "" })}
                    className="px-3 text-xs text-[#A84343] border border-[#A84343]/40 hover:bg-[#A84343] hover:text-white uppercase font-semibold transition-all shrink-0"
                  >
                    Hapus Countdown
                  </button>
                )}
              </div>
            </div>

            <div className="md:col-span-2 pt-2">
              <button 
                type="submit" 
                className="w-full bg-[#B88E4C] text-white py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#9A7336] transition-colors"
              >
                {editingId ? "Perbarui Event" : "+ Simpan Event Baru"}
              </button>
            </div>
          </form>
        </div>

        {/* Tabel Manajemen Event */}
        <div className="bg-[#FFFDF9] border border-[#E8E1D5] shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm text-[#2C2A29]">
            <thead className="bg-[#FAF7F2] text-[#7A736B] text-[11px] tracking-[0.15em] uppercase border-b border-[#E8E1D5]">
              <tr>
                <th className="p-4 font-semibold">Judul Event</th>
                <th className="p-4 font-semibold">Kategori</th>
                <th className="p-4 font-semibold">Harga</th>
                <th className="p-4 font-semibold">Pendaftaran</th>
                <th className="p-4 font-semibold">Kuota</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E1D5]">
              {events.map((item) => {
                const isOpen = item.isOpen ?? true;
                return (
                  <tr key={item.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-4">
                      <p className="font-serif text-base text-[#2C2A29] leading-snug">{item.title}</p>
                      <span className="text-xs text-[#7A736B] font-light">🗓️ {item.date}</span>
                    </td>
                    <td className="p-4 text-xs">
                      <span className="text-[#B88E4C] font-semibold bg-[#F7F2E8] px-2.5 py-1 border border-[#E8E1D5] text-[10px] tracking-wider uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-serif font-bold text-[#B88E4C]">
                      {item.price === 0 ? "Gratis" : `Rp ${item.price.toLocaleString("id-ID")}`}
                    </td>
                    <td className="p-4 text-xs">
                      <button
                        onClick={() => handleToggleRegistration(item)}
                        title="Klik untuk mengubah status pendaftaran"
                        className={`px-2.5 py-1 border text-[10px] tracking-wider uppercase font-semibold transition-all ${
                          isOpen
                            ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6] hover:bg-[#d4edd9]"
                            : "bg-[#FCE8E6] text-[#A84343] border-[#F5C2C0] hover:bg-[#f8d7d4]"
                        }`}
                      >
                        {isOpen ? "● Dibuka" : "○ Ditutup"}
                      </button>
                    </td>
                    <td className="p-4 text-xs font-medium text-[#2C2A29]">{item.quota}</td>
                    <td className="p-4 text-right text-xs">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-[#B88E4C] border border-[#B88E4C] hover:bg-[#B88E4C] hover:text-white px-3 py-1.5 transition-all text-[10px] uppercase tracking-wider font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-[#A84343] border border-[#A84343]/40 hover:bg-[#A84343] hover:text-white px-3 py-1.5 transition-all text-[10px] uppercase tracking-wider font-semibold"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}