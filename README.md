# PORTAL PENGAWAS SEKOLAH
> **Informasi, Pendampingan, Dokumentasi dan Pengembangan Mutu Satuan Pendidikan**

Portal resmi berbasis web untuk Pengawas Sekolah TK/SD yang menyajikan profil pengawas, pendampingan sekolah binaan, direktori kepala sekolah dan guru, catatan prestasi, dokumentasi kegiatan, warta berita, serta dashboard administrator komprehensif.

---

## 1. Fitur Utama

- **Profil Lengkap Pengawas:** Biodata resmi, NIP, gelar, riwayat pendidikan, pengalaman, kompetensi, tugas & fungsi, peran transformatif supervisi, dan cetak dokumen.
- **Sekolah Binaan (12 Modul):**
  1. Identitas Lengkap & Peta Koordinat
  2. Visi, Misi, Tujuan & Program Unggulan
  3. Sambutan Kepala Sekolah
  4. Struktur Organisasi Interaktif
  5. Fasilitas Sarana Prasarana (Kondisi & Jumlah)
  6. Keunggulan Satuan Pendidikan
  7. Riwayat Kepala Sekolah
  8. Direktori Guru & Tendik (Filter, Search, Visibilitas Publik)
  9. Prestasi Satuan Pendidikan (Tingkat Sekolah s/d Internasional)
  10. Galeri Media Foto & Video (Lightbox Viewer)
  11. Berita & Kegiatan Sekolah
  12. Peta Wilayah Kerja (Google Maps)
- **Pencarian Global Terpadu (Cmd+K / Ctrl+K):** Pencarian instan ter-debounce di seluruh entitas sekolah, guru, prestasi, berita, dan galeri.
- **Dashboard Administrator:**
  - Panel statistik & analitik data
  - CRUD lengkap untuk 16 modul
  - Manajemen keamanan & ganti kata sandi
  - Konfigurasi identitas dinamis (White-label: dapat digunakan oleh pengawas mana pun tanpa ubah kode)
- **Otentikasi & Keamanan:**
  - Enkripsi password menggunakan `bcryptjs`
  - JSON Web Token (JWT) session
  - Protected API routes
- **Siap Deployment ke Railway & Cloud:**
  - Health check endpoint: `GET /api/health`
  - Dukungan database PostgreSQL melalui Prisma ORM
  - Automatic fallback penyimpanan lokal saat inisiasi/development

---

## 2. Tumpukan Teknologi (Tech Stack)

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React Icons
- **Backend:** Node.js, Express.js, TypeScript (tsx)
- **Database & ORM:** PostgreSQL, Prisma ORM
- **Keamanan:** bcryptjs, JSON Web Token (JWT)
- **Deployment:** Railway (Nixpacks / Dockerfile)

---

## 3. Struktur Direktori Proyek

```text
├── Dockerfile                   # Konfigurasi container production
├── railway.json                 # Konfigurasi deployment Railway
├── .env.example                 # Panduan variabel lingkungan
├── package.json                 # Skrip & dependensi proyek
├── server.ts                    # Server Express terpadu (Vite middlewares dev + static prod)
├── server/
│   ├── auth.ts                  # Layanan otentikasi JWT & bcrypt
│   ├── db.ts                    # Lapisan repositori data presisten
│   ├── routes.ts                # Endpoint RESTful API
│   ├── types.ts                 # Antarmuka TypeScript model
│   └── upload.ts                # Handler unggah berkas (Multer/Cloud)
├── prisma/
│   ├── schema.prisma            # Schema database PostgreSQL Prisma
│   └── seed.ts                  # Seeding data awal admin & sekolah
├── public/                      # Aset publik statis
└── src/
    ├── components/common/       # Navbar, Footer, GlobalSearch, Lightbox, Toast
    ├── context/                 # AuthContext & SettingsContext
    ├── pages/public/            # Beranda, Profil, Sekolah, Berita, Guru, Prestasi, Kontak
    ├── pages/admin/             # Dashboard, CRUD Sekolah, Guru, Berita, Settings, Security
    ├── services/                # Klien API frontend
    ├── types/                   # Definisi tipe TypeScript
    ├── App.tsx                  # Root router & handler status
    └── main.tsx                 # Entry point React
```

---

## 4. Instalasi & Menjalankan Secara Lokal

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm

### Langkah Instalasi
1. Clone repositori ini atau buka di direktori proyek Anda:
   ```bash
   npm install
   ```

2. Salin environment variable:
   ```bash
   cp .env.example .env
   ```

3. Jalankan server pengembangan (Full-stack):
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan pada `http://localhost:3000`.

---

## 5. Basis Data Cloud (Google Firebase Firestore) & Autentikasi

Aplikasi telah terintegrasi secara bawaan dengan **Google Firebase Firestore** dan **Firebase Authentication**:

- **Firebase Firestore:** Database cloud NoSQL terkelola penuh dengan aturan keamanan (`firestore.rules`) yang telah dideploy secara otomatis.
- **Firebase Authentication:** Autentikasi administrator terpusat menggunakan ID Token Google yang aman tanpa memerlukan manajemen kunci rahasia manual.
- **DATABASE_URL & JWT_SECRET:** **Tidak lagi diperlukan.** Konfigurasi proyek tersimpan aman dan terkelola melalui `firebase-applet-config.json`.

---

## 6. Kredensial Administrator Awal

- **Email:** `admin@pengawassekolah.id`
- **Kata Sandi:** `Admin123!`

> ⚠️ **PENTING:** Kredensial ini digunakan untuk masuk ke Dashboard Admin. Anda dapat mengubah kata sandi kapan saja melalui menu **Keamanan Akun** di dashboard administrator.

---

## 7. Build & Deployment

### Konfigurasi Variabel Lingkungan
Karena database dan autentikasi telah menggunakan Firebase, konfigurasi environment menjadi sangat sederhana:

| Variabel | Keterangan | Wajib? | Nilai Bawaan |
| :--- | :--- | :--- | :--- |
| `API_URL` | Endpoint basis API backend (hanya jika frontend di-host di domain terpisah) | Opsional | `/api` |

> 💡 **Kemandirian Aplikasi:**
> Aplikasi tidak memerlukan variabel `DATABASE_URL` ataupun `JWT_SECRET`. Seluruh layanan database Firestore dan autentikasi aktif otomatis.

### Perintah Build & Start
- **Build Command:** `npm run build`
- **Start Command:** `npm run start`

Aplikasi telah dilengkapi health check endpoint pada `GET /api/health` yang otomatis diverifikasi oleh sistem monitoring cloud.

---

## 8. Panduan Penggantian Konfigurasi Tanpa Koding

Portal ini dirancang modular agar dapat digunakan kembali oleh pengawas sekolah lainnya:
1. Masuk ke **Dashboard Admin** (`/admin/login`)
2. Pilih menu **Pengaturan Website**
3. Anda dapat memperbarui:
   - Nama Portal & Subjudul
   - Nama & NIP Pengawas Pembina
   - Foto Profil Pengawas
   - Wilayah Kerja, Kecamatan, Kabupaten, Provinsi
   - Nomor WhatsApp, Telepon, dan Email
   - Alamat Kantor & Peta Google Maps
   - Tautan Media Sosial (Facebook, Instagram, YouTube, TikTok)
   - Teks Catatan Kaki (Footer)
4. Klik **Simpan Perubahan**. Seluruh halaman publik akan langsung tersinkronisasi secara otomatis.

---

## 9. Lisensi & Hak Cipta
© 2026 Portal Pengawas Sekolah. Seluruh hak cipta dilindungi.
Informasi, Pendampingan, Dokumentasi dan Pengembangan Mutu Satuan Pendidikan TK/SD.
