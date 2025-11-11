-- 1️⃣ Buat database
CREATE DATABASE tugascrud;

-- 2️⃣ Pindah ke database tersebut
\c tugascrud;

-- 3️⃣ Buat tabel users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4️⃣ Buat tabel orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,           -- Nama game
  description TEXT,                      -- Nickname / detail akun
  type VARCHAR(50),                      -- Adventure / Arena / Daily Farm
  status VARCHAR(20) DEFAULT 'Menunggu', -- Status pesanan
  progress VARCHAR(20) DEFAULT '0%',     -- Progress joki
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5️⃣ Buat tabel jokers (opsional)
CREATE TABLE IF NOT EXISTS jokers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  game_specialty VARCHAR(100),
  rating DECIMAL(3,2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6️⃣ Relasikan orders dengan jokers (optional kolom tambahan)
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS joker_id INTEGER REFERENCES jokers(id);

-- 7️⃣ Buat tabel payments (opsional)
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  method VARCHAR(50),
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8️⃣ Tambahkan contoh data dummy user (optional)
INSERT INTO users (name, email, password_hash)
VALUES
  ('Admin Test', 'admin@example.com', '$2a$10$0fEufI3K5Y4rD9O6qJtqgeR3fZbBgdWxA3sHDPwAt6cGIDWQslrYO') -- password: admin123
ON CONFLICT DO NOTHING;

-- 9️⃣ Tambahkan contoh data order dummy
INSERT INTO orders (title, description, type, status, progress, owner_id)
VALUES
  ('Genshin Impact', 'Traveler Lv.55', 'Adventure', 'Proses', '50%', 1),
  ('Honkai Star Rail', 'Trailblazer Lv.60', 'Daily Farm', 'Menunggu', '0%', 1)
ON CONFLICT DO NOTHING;

-- 10️⃣ Cek hasil tabel
\dt

-- 11️⃣ Cek data awal
SELECT * FROM users;
SELECT * FROM orders;

-- Selesai ✅
