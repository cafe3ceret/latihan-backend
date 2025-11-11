import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/api"; // ✅ sesuai struktur kamu
import { OrderList } from "../components/OrderList";
import { OrderForm } from "../components/OrderForm";
import "../styles/Dashboard.css";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders"); // ✅ pakai axios helper kamu
      setOrders(res.data);
    } catch (err) {
      setError(err.message || "Gagal memuat pesanan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleOrderSaved = () => {
    handleCloseForm();
    fetchOrders();
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pesanan ini?")) return;
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand">
            <i className="fas fa-gamepad"></i> Dashboard Joki Game
          </span>
          <div className="d-flex align-items-center">
            <span className="text-light me-3">
              Hai, <strong>{user?.fullname || "Joker"}</strong> 🎮
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm"
            >
              Keluar
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="m-0">Manajemen Pesanan Joki</h1>
          <button onClick={handleAddOrder} className="btn btn-success">
            <i className="fas fa-plus"></i> Tambah Pesanan
          </button>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        {showForm && (
          <OrderForm
            order={editingOrder}
            onClose={handleCloseForm}
            onSaved={handleOrderSaved}
          />
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Memuat...</span>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5 text-muted">
            Belum ada pesanan joki 😔
          </div>
        ) : (
          <OrderList
            orders={orders}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
