// dbSetup.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pkg;

async function setupDatabase() {
  const connectionString = process.env.DATABASE_URL;

  const client = new Client({
    connectionString,
  });

  try {
    console.log("🚀 Menghubungkan ke PostgreSQL...");
    await client.connect();

    // === BUAT TABEL USERS ===
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // === BUAT TABEL ORDERS ===
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        type VARCHAR(50),
        status VARCHAR(20) DEFAULT 'Menunggu',
        progress VARCHAR(20) DEFAULT '0%',
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // === BUAT TABEL JOKERS (optional) ===
    await client.query(`
      CREATE TABLE IF NOT EXISTS jokers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        game_specialty VARCHAR(100),
        rating DECIMAL(3,2) DEFAULT 0,
        total_orders INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // === TAMBAH KOLOM RELASI ANTARA ORDERS DAN JOKERS ===
    await client.query(`
      ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS joker_id INTEGER REFERENCES jokers(id);
    `);

    // === BUAT TABEL PAYMENTS (optional) ===
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        amount NUMERIC(12,2) NOT NULL,
        method VARCHAR(50),
        status VARCHAR(20) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Semua tabel berhasil dibuat!");
  } catch (err) {
    console.error("❌ Gagal membuat database:", err);
  } finally {
    await client.end();
    console.log("🔌 Koneksi PostgreSQL ditutup.");
  }
}

setupDatabase();
