import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="auth-card p-4">
          <div className="text-center mb-4">
            <img
              src="/logo192.png"
              alt="Logo"
              width="70"
              className="mb-3 neon-logo"
            />
            <h4 className="neon-text">🚀 REGISTER JOKI ZONE 🚀</h4>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="name"
                placeholder="Nama Lengkap"
                value={form.name}
                onChange={handleChange}
                className="neon-input"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="neon-input"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password (min. 6 karakter)"
                value={form.password}
                onChange={handleChange}
                className="neon-input"
                minLength={6}
                required
              />
            </Form.Group>

            <Button
              disabled={loading}
              type="submit"
              className="w-100 neon-btn"
            >
              {loading ? "Memproses..." : "Daftar"}
            </Button>
          </Form>

          <p className="text-center mt-3 mb-0 text-light">
            Sudah punya akun?{" "}
            <Link to="/login" className="neon-link">
              Login
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
