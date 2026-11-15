# Backend BONI

API web berjalan pada runtime Node.js melalui Route Handlers Next.js. Jalankan aplikasi dari akar repo mengikuti [README utama](../README.md#instalasi-dan-cara-menjalankan). Mode demo menggunakan akun dan penyimpanan browser serta contoh respons API.

## Endpoint

| Rute | Fungsi |
| --- | --- |
| `GET /api/eco-action/verify` | Melaporkan mode dan ketersediaan pemeriksaan bukti foto |
| `POST /api/eco-action/verify` | Menerima `multipart/form-data` dengan `image`, `actionType`, dan `capturedAt` opsional. Memeriksa ukuran, format, duplikasi, serta jenis aksi dan mengembalikan hasil verifikasi. |
| `POST /api/ocr/scan-bill` | Menerima foto struk listrik dalam kolom `image`. Mengembalikan data hasil OCR atau data contoh pada mode demo. |

Lihat [handler verifikasi](../src/app/api/eco-action/verify/route.ts), [handler OCR](../src/app/api/ocr/scan-bill/route.ts), dan [jenis aksi](../src/config/green-actions.ts) untuk kontrak yang berlaku. [src/lib/server/](../src/lib/server/) memuat validasi gambar, pembatasan permintaan, dan integrasi Google Cloud Vision.

## Konfigurasi opsional

| Variabel | Penggunaan |
| --- | --- |
| `NEXT_PUBLIC_DEMO_MODE` | Mode akun dan data demo aktif secara bawaan. Nilai `false` mengarahkan layanan klien ke backend REST yang kompatibel. |
| `NEXT_PUBLIC_API_URL` | Alamat backend REST eksternal apabila mode demo klien dimatikan. |
| `AI_VERIFICATION_MODE` | `auto` memilih Google Cloud Vision jika kunci tersedia, lalu memakai simulasi jika tidak ada kunci. Nilai `demo` memilih jalur simulasi ketika layanan YOLO lokal tidak aktif. |
| `GOOGLE_VISION_API_KEY` | Kunci khusus server untuk pemeriksaan foto dan OCR. Simpan di `.env.local` jika memakai layanan ini. |
| `YOLO_SERVICE_URL` | Alamat layanan deteksi sampah opsional. Default `http://127.0.0.1:8000`. Handler verifikasi mencoba layanan lokal ini sebelum jalur Vision atau demo. |

Contoh konfigurasi tersedia di [.env.example](../.env.example). [Panduan layanan YOLO](../ai-model/README.md) menjelaskan cara menjalankan layanan terpisah. Pengujian rute dan respons API tersedia di [scripts/](../scripts/README.md).
