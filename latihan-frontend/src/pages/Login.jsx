import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Email atau password salah");
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
            <h4 className="neon-text">🎮 JOKI ZONE LOGIN 🎮</h4>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="neon-input"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="neon-input"
                required
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 neon-btn">
                {loading ? "Memproses..." : "Login"}
            </Button>
            </Form>

        <p className="text-center mt-3 mb-0 text-light">
            Belum punya akun?{" "}
            <Link to="/register" className="neon-link">
              Register
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
