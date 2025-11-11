// =============================
// 🚀 SERVER EXPRESS + JWT + PostgreSQL
// =============================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(express.json());

// izinkan frontend React mengakses API
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: CLIENT_ORIGIN }));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

// =============================
// 🗃️ Koneksi PostgreSQL
// =============================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test koneksi
pool.connect()
  .then(() => console.log("✅ Terhubung ke PostgreSQL"))
  .catch((err) => console.error("❌ Gagal konek DB:", err));

// =============================
// 🧰 Helper Functions
// =============================
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, email }
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// =============================
// 👤 AUTH ROUTES
// =============================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Semua field wajib diisi" });

    const check = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (check.rows.length > 0)
      return res.status(409).json({ message: "Email sudah terdaftar" });

    const password_hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
      [name, email, password_hash]
    );

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "Email atau password salah" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: "Email atau password salah" });

    const token = createToken({ userId: user.id, email: user.email });
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// =============================
// 📦 CRUD ORDERS (Protected)
// =============================
app.get("/api/orders", authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const result = await pool.query(
    "SELECT * FROM orders WHERE owner_id=$1 ORDER BY id DESC",
    [userId]
  );
  res.json(result.rows);
});

app.post("/api/orders", authMiddleware, async (req, res) => {
  const { title, description, type, status, progress } = req.body;
  const { userId } = req.user;

  if (!title || !description)
    return res.status(400).json({ message: "Judul dan deskripsi wajib diisi" });

  const result = await pool.query(
    "INSERT INTO orders (title, description, type, status, progress, owner_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [title, description, type, status || "Menunggu", progress || "0%", userId]
  );

  res.status(201).json(result.rows[0]);
});

app.put("/api/orders/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, type, status, progress } = req.body;
  const { userId } = req.user;

  const result = await pool.query(
    "UPDATE orders SET title=$1, description=$2, type=$3, status=$4, progress=$5 WHERE id=$6 AND owner_id=$7 RETURNING *",
    [title, description, type, status, progress, id, userId]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: "Pesanan tidak ditemukan" });

  res.json(result.rows[0]);
});

app.delete("/api/orders/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const result = await pool.query(
    "DELETE FROM orders WHERE id=$1 AND owner_id=$2 RETURNING *",
    [id, userId]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: "Pesanan tidak ditemukan" });

  res.json({ message: "Pesanan berhasil dihapus" });
});

// =============================
// 🩺 Health Check
// =============================
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// =============================
// 🚀 Start Server
// =============================
app.listen(PORT, () => {
  console.log(`✅ API berjalan di http://localhost:${PORT}`);
});
