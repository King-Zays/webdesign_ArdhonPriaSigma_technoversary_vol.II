# Skrip pemeriksaan BONI

[smoke-test.mjs](smoke-test.mjs) memeriksa rute publik, pembatasan akses Warga dan Pemkot, header keamanan, serta respons API verifikasi foto dan OCR. Skrip membuat gambar uji sintetis.

1. Jalankan `npm ci` dan `npm run dev` dari akar repo. Untuk pengujian hasil produksi, jalankan `npm run build` dan `npm run start`.
2. Dari terminal lain di akar repo, jalankan `npm run test:smoke`. Alamat default adalah `http://localhost:3000`.
3. Jika memakai alamat lain, isi `BASE_URL`. Contoh PowerShell: `$env:BASE_URL = 'http://127.0.0.1:3000'`, lalu jalankan skrip.

Jalankan pemeriksaan tipe dengan `npm run typecheck` dan lint dengan `npm run lint`. [Panduan demo manual](../docs/DEMO_GUIDE.md)
