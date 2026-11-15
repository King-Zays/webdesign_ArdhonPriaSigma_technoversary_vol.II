# BONI — Bank Observasi Nol Emisi Kota, Warga Aktif Nikmati Insentif

**Web Design Competition · Techno Versary Vol. II**

**EcoDigital For Environment** · Bank sampah digital dan edukasi lingkungan

BONI membantu warga Surabaya memulai aksi lingkungan dari rumah. Warga dapat belajar memilah sampah, mencatat aksi hijau dengan bukti foto, menjelajahi simulasi EcoPoints dan voucher UMKM, serta melaporkan titik timbunan sampah. Portal Pemkot menampilkan contoh pemantauan laporan dan partisipasi per kecamatan.

## Halaman website

| Ketentuan guidebook | Halaman BONI | Isi |
| --- | --- | --- |
| Home | Beranda (`/`) | Masalah lingkungan, cara kerja BONI, dan pilihan portal demo |
| About | Tentang (`/tentang`) | Tujuan BONI, peran warga dan mitra, serta rancangan alur setoran |
| Konten/Artikel/Galeri | Edukasi (`/edukasi`) | Panduan botol PET dan kardus, cek kesiapan pilah, panduan aksi hijau, dan galeri ekosistem |
| Contact | Kontak (`/kontak`) | FAQ dan simulasi formulir kontak. Isian diproses di halaman. |

## Instalasi dan cara menjalankan

Siapkan **Git**, **Node.js 24**, dan **npm**, lalu jalankan perintah berikut.

```bash
git clone https://github.com/King-Zays/webdesign_ArdhonPriaSigma_technoversary_vol.II.git
cd webdesign_ArdhonPriaSigma_technoversary_vol.II
npm ci
npm run dev
```

Buka [BONI di localhost](http://localhost:3000). Demo standar siap digunakan setelah instalasi. Peta memuat ubin OpenStreetMap saat koneksi internet tersedia. Konfigurasi tambahan tersedia di [.env.example](.env.example) dan dijelaskan di [README backend](backend/README.md).

Untuk memeriksa hasil produksi, jalankan perintah berikut dari akar repo. Hentikan server pengembangan dahulu jika kedua server akan memakai port 3000.

```bash
npm run build
npm run start
```

## Mencoba demo

1. **Warga** — Buka `/login?role=warga` dan pilih **Masuk Cepat Demo**. Coba unggah foto contoh di **Verifikasi Aksi**, lalu lihat **Pusat Hadiah & Prestasi** atau **Laporan Sampah**.
2. **Pemkot** — Buka `/gov/login` dan pilih akses demo Pemkot. Coba lihat laporan warga, peta wilayah, dan pratinjau Pengelolaan Program.
3. **Status prototipe** — Data akun, laporan, dan EcoPoints demo tersimpan di browser. Voucher memakai data contoh. Setoran, penjemputan, penimbangan, Portal Pengepul, dan Pratinjau Admin merupakan rancangan tahap lanjutan.

## Struktur proyek

| Folder | Isi |
| --- | --- |
| [src/](src/README.md) | Aplikasi Next.js, rute website, komponen, data demo, dan penyimpanan lokal |
| [public/](public/README.md) | Logo, media, font, ikon, dan aset PWA |
| [frontend/](frontend/README.md) | Peta halaman dan arsitektur antarmuka |
| [backend/](backend/README.md) | Rute API, konfigurasi, dan cakupan server |
| [ai-model/](ai-model/README.md) | Model dan layanan lokal YOLO opsional |
| [scripts/](scripts/README.md) | Pengujian singkat terhadap server yang sedang berjalan |
| [docs/](docs/README.md) | Panduan demo, metodologi dampak, dan serah terima |

Pemeriksaan pengembangan tersedia melalui `npm run lint` dan `npm run typecheck`. Saat server aktif, jalankan `npm run test:smoke` di terminal terpisah. [Petunjuk pemeriksaan](scripts/README.md)

## Tim

**Ardhon Pria Sigma** · Universitas Pembangunan Nasional “Veteran” Jawa Timur

- **Firzan Syaroni** — Ketua
- **Muhammad Ananda Hariadi** — Anggota
- **Moch. Refi Febrian Alfani** — Anggota

## Panduan lomba dan atribusi

Guidebook menetapkan tema lingkungan, empat halaman minimum, serta pengumpulan proyek lengkap di GitHub melalui formulir lomba. Tenggat yang tercantum adalah **15 November 2026 pukul 23.59 WIB**. Ketentuannya mensyaratkan karya orisinal yang belum pernah dipublikasikan atau diikutsertakan dalam lomba lain. Komponen yang dipakai harus gratis, open-source, atau buatan sendiri sesuai ketentuan panitia. [Guidebook Web Design, hlm. 5–7](https://drive.google.com/file/d/1jEKjR6vvprnHxatESlAr4hnFazcPHQiD/view)

Kredit peta, video, dan ikon ada di [catatan sumber dan atribusi](README-SUMBER.md).
