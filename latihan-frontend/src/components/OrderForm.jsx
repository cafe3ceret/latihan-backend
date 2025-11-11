import React, { useState, useEffect } from "react";
import api from "../api/api"; // ✅ ganti ke helper api yang kamu punya

export const OrderForm = ({ order, onClose, onSaved }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    status: "Menunggu",
    progress: "0%",
  });

  useEffect(() => {
    if (order) setForm(order);
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (order) {
        // Edit data
        await api.put(`/orders/${order.id}`, form);
      } else {
        // Tambah data baru
        await api.post("/orders", form);
      }

      onSaved();
    } catch (err) {
      alert(err?.response?.data?.message || "Gagal menyimpan pesanan");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container neon-modal">
        <h4 className="mb-3">
          {order ? "Edit Pesanan Joki" : "Tambah Pesanan Baru"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Game</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nickname</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tipe Joki</label>
            <select
              name="type"
              className="form-select"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Pilih Tipe</option>
              <option value="Adventure">Adventure</option>
              <option value="Arena">Arena</option>
              <option value="Daily Farm">Daily Farm</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Menunggu">Menunggu</option>
              <option value="Proses">Proses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Progress (%)</label>
            <input
              type="text"
              name="progress"
              className="form-control"
              value={form.progress}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
