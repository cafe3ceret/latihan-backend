```md
# 🎮 Dashboard Manajemen Jasa Joki Game Berbasis Web

## 📘 Deskripsi Proyek
Proyek ini merupakan **aplikasi manajemen jasa joki game** berbasis web yang dikembangkan menggunakan **React.js (Frontend)** dan **Express.js + PostgreSQL (Backend)**.  
Sistem ini berfungsi untuk **mengelola pesanan joki**, mulai dari **autentikasi user (login/register)** hingga **monitoring progress joki** dalam satu dashboard yang responsif dan modern.

> 💡 Aplikasi ini cocok digunakan oleh penyedia jasa joki untuk memantau, memperbarui, dan mengelola order pelanggan dengan mudah.

---

## 🧩 Fitur Utama

### 🔐 Autentikasi Pengguna
- Register akun baru  
- Login menggunakan JWT Token  
- Logout otomatis jika token tidak valid  
- Middleware backend untuk memverifikasi token setiap request

### 📦 CRUD Pesanan Joki
- Tambah, edit, hapus, dan tampilkan daftar pesanan  
- Semua aksi dilakukan melalui **Modal Form** (popup interaktif)  
- Field data meliputi:
  - 🎮 Nama Game  
  - 🧾 Nickname Pemesan  
  - 🏷️ Jenis Joki (Adventure / Arena / Daily Farm, dll)  
  - ⚙️ Status Pesanan (Menunggu / Proses / Selesai)  
  - 📊 Progress (% penyelesaian)

### 🧠 Proteksi Route
- Halaman `/dashboard` hanya dapat diakses jika user sudah login  
- Menggunakan komponen `PrivateRoute` untuk validasi JWT

### 🎨 Tampilan Modern
- Desain **neon cyberpunk** yang elegan dan responsif  
- Menggunakan **React-Bootstrap** untuk layout clean dan konsisten  

---

## 🧰 Teknologi yang Digunakan

| Bagian | Teknologi |
|--------|------------|
| **Frontend** | React.js, React Router DOM, Axios, React-Bootstrap |
| **Backend** | Node.js, Express.js, JWT, BcryptJS, CORS |
| **Database** | PostgreSQL |
| **Styling** | Bootstrap 5 + Custom Neon CSS |
| **Environment** | dotenv |

---

## 🧪 Akun Demo (Login)
> Kamu bisa mencoba aplikasi tanpa mendaftar akun baru menggunakan data berikut:
```

📧 Email:    [cafeceret3@gmail.com](mailto:cafeceret3@gmail.com)
🔑 Password: 123456

````

---

## ⚙️ Cara Menjalankan Proyek

### 1️⃣ Jalankan Database PostgreSQL
Pastikan PostgreSQL aktif dan buat database:
```bash
createdb joki_dashboard
````

Atau jalankan script otomatis (jika sudah punya `dbSetup.js`):

```bash
node dbSetup.js
```

---

### 2️⃣ Jalankan Backend

Masuk ke folder backend:

```bash
cd backend
npm install
npm start   # atau nodemon server.js
```

Server berjalan di:

```
http://localhost:5000
```

---

### 3️⃣ Jalankan Frontend

Masuk ke folder frontend:

```bash
cd frontend
npm install
npm start
```

Frontend berjalan di:

```
http://localhost:3000
```

---

## 🔐 File .env (Backend)

Pastikan kamu membuat file `.env` di folder backend:

```env
DATABASE_URL=postgres://postgres:123@localhost:5432/joki_dashboard
JWT_SECRET=supersecretkey
CLIENT_ORIGIN=http://localhost:3000
PORT=5000
```

---

## ✅ Kriteria Tugas yang Terpenuhi

| Kriteria              | Status | Keterangan                                 |
| --------------------- | ------ | ------------------------------------------ |
| Autentikasi Berfungsi | ✅      | Register & Login berfungsi dengan JWT      |
| JWT Terintegrasi      | ✅      | Token diverifikasi di setiap CRUD          |
| CRUD Berjalan         | ✅      | Tambah, edit, hapus, tampil data pesanan   |
| Modal CRUD            | ✅      | Semua aksi CRUD melalui modal popup        |
| React Router          | ✅      | Navigasi login → dashboard berjalan lancar |
| UI Rapi               | ✅      | Menggunakan React-Bootstrap                |
| Kerapian Kode         | ✅      | Struktur folder rapi dan modular           |
| Validasi & Notifikasi | ✅      | Alert sukses/gagal di login & register     |

---

## 🗂️ Struktur Folder

### 📦 Frontend

```
src/
├── api/
│   └── api.js
├── components/
│   ├── PrivateRoute.js
│   ├── OrderForm.js
│   ├── OrderList.js
│   └── Navbar.js
├── pages/
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   └── NotFound.js
├── styles/
│   └── Dashboard.css
├── App.js
└── index.js
```

### ⚙️ Backend

```
backend/
├── server.js
├── dbSetup.js
├── .env
└── package.json
```

---

## 🖼️ Preview Tampilan (GIF)

> Letakkan file GIF di `frontend/public/preview/` lalu tambahkan ke README seperti ini:

```md
## 🖼️ Preview
<p align="center">
  <img src="./public/preview/login.gif" width="350" alt="Login" />
  <img src="./public/preview/register.gif" width="350" alt="Register" />
</p>

<p align="center">
  <img src="./public/preview/dashboard.gif" width="720" alt="Dashboard" />
</p>
```

---

## 👤 Pengembang

**Nama:** Aditya Arief
**NIM:** 21.11.4401
**Proyek:** Dashboard Jasa Joki Game
**Kampus:** STMIK Amikom Surakarta

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik dan pengembangan sistem joki.
Dilarang memperjualbelikan tanpa izin pembuat.

```

---

💡 **Langkah selanjutnya:**
1. Buka folder proyek kamu → `latihan-frontend`
2. Buat file baru bernama `README.md`
3. Tempel semua isi di atas, lalu simpan

---
