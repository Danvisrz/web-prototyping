import { useState } from "react";
import { events as initialEvents } from "../../utils/data";

export default function AdminDashboard() {
  const [eventList, setEventList] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: "", category: "Akademik", date: "", quota: 30 });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    const created = {
      id: Date.now(),
      title: newEvent.title,
      category: newEvent.category,
      date: newEvent.date,
      price: 0,
      quota: parseInt(newEvent.quota),
      description: "Event baru ditambahkan melalui admin.",
      image: "https://placehold.co/600x400?text=Event+Baru"
    };

    setEventList([...eventList, created]);
    setNewEvent({ title: "", category: "Akademik", date: "", quota: 30 });
    alert("Event berhasil ditambahkan!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard - Kelola Event</h1>

      {/* Form Tambah Event */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 max-w-2xl">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Tambah Event Baru</h2>
        <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Judul Event</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full border p-2 rounded text-sm"
              placeholder="Nama kegiatan"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label>
            <select
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              className="w-full border p-2 rounded text-sm"
            >
              <option value="Akademik">Akademik</option>
              <option value="Teknologi & Penalaran">Teknologi & Penalaran</option>
              <option value="Kemahasiswaan">Kemahasiswaan</option>
              <option value="IT & Developer">IT & Developer</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Tanggal</label>
            <input
              type="text"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full border p-2 rounded text-sm"
              placeholder="Contoh: 25 November 2026"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Kuota Peserta</label>
            <input
              type="number"
              value={newEvent.quota}
              onChange={(e) => setNewEvent({ ...newEvent, quota: e.target.value })}
              className="w-full border p-2 rounded text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700">
              + Simpan Event
            </button>
          </div>
        </form>
      </div>

      {/* Tabel Ringkasan Event */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 font-bold border-b">
            <tr>
              <th className="p-3">Judul Event</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Kuota</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {eventList.map((item) => (
              <tr key={item.id}>
                <td className="p-3 font-medium text-gray-800">{item.title}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.quota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}