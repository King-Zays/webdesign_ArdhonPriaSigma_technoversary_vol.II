# Serah terima BONI untuk Techno Versary

## Jalur demo yang aktif

- **Situs publik:** Beranda (`/`), Tentang (`/tentang`), Edukasi (`/edukasi` + galeri), dan Kontak & FAQ (`/kontak`).
- **Portal Warga (`/dashboard`):** Aksi Hijau + pemeriksaan bukti foto AI (`/dashboard/eco-action`), Pusat Hadiah & Prestasi (`/dashboard/marketplace`), dan Peta Laporan Sampah (`/dashboard/laporan-sampah`).
- **Portal Pemkot (`/gov/dashboard`):** Pusat kendali, manajemen tiket laporan warga, analisis AI, peta spasial, sirkulasi ekonomi, dan tab **Pengelolaan Program** (memakai [`ProgramPreviewList`](../src/components/features/program-preview/ProgramPreviewList.tsx) dengan `variant="gov"`).

## Fitur yang ditunda sementara (Portal Pengepul & Pratinjau Admin)

Untuk memfokuskan versi demo pada jalur **Warga** dan **Pemkot**, komponen berikut dinonaktifkan sementara dari antarmuka tanpa menghapus kode atau penyimpanan browser:

- **Portal Pengepul ([`src/app/pengepul/page.tsx`](../src/app/pengepul/page.tsx)):** diarahkan sementara ke `/#gateway`. Kode tampilan antrean, jadwal, timbang, dan simulasi verifikasi tetap tersimpan di `CollectorDepositDemo` ([`DepositDemo.tsx`](../src/components/features/deposit-demo/DepositDemo.tsx)).
- **Pratinjau Admin ([`src/app/admin/page.tsx`](../src/app/admin/page.tsx)):** diarahkan sementara ke `/#gateway`. Sepuluh modul pratinjau tersimpan di [`AdminPreviewModules.tsx`](../src/components/features/deposit-demo/AdminPreviewModules.tsx) dan [`AdminDepositPreview.tsx`](../src/components/features/deposit-demo/AdminDepositPreview.tsx). Kata/peran `admin` pada logika akses Pemkot tetap dipertahankan sesuai fungsi yang berjalan.
- **Panel Simulasi Setoran Sampah di Dashboard Warga ([`src/app/dashboard/page.tsx`](../src/app/dashboard/page.tsx)):** `<CitizenDepositDemo />` dilepas sementara karena pengajuannya memerlukan pemrosesan di Portal Pengepul. Komponen dan penyimpanan lokal ([`deposit-demo.store.ts`](../src/store/deposit-demo.store.ts)) tetap utuh.
- **Blok Dampak Setoran & navigasi pratinjau portal di Beranda ([`src/app/page.tsx`](../src/app/page.tsx)):** `<DepositImpact />` dan tautan `/pengepul` + `/admin` di bawah `/#gateway` ditunda sementara hingga penimbangan dan verifikasi setoran diaktifkan kembali. Component [`DepositImpact.tsx`](../src/components/features/deposit-demo/DepositImpact.tsx) tetap tersimpan.

### Cara mengaktifkan kembali

1. Pulihkan `<DepositImpact />` dan tautan `/pengepul` + `/admin` di [`src/app/page.tsx`](../src/app/page.tsx).
2. Pulihkan `<CitizenDepositDemo />` di [`src/app/dashboard/page.tsx`](../src/app/dashboard/page.tsx).
3. Ganti redirect di [`src/app/pengepul/page.tsx`](../src/app/pengepul/page.tsx) agar me-render `<CollectorDepositDemo />` dalam `<PublicContentPage>`, dan di [`src/app/admin/page.tsx`](../src/app/admin/page.tsx) agar me-render `<AdminPreviewModules />` dalam `<PublicContentPage>`.
4. Perbarui kembali CTA di `CaraKerjaDemo` ([`LandingSections.tsx`](../src/components/features/landing/LandingSections.tsx)), [`tentang/page.tsx`](../src/app/tentang/page.tsx), [`edukasi/page.tsx`](../src/app/edukasi/page.tsx), [`SortingReadinessCheck.tsx`](../src/components/features/edukasi/SortingReadinessCheck.tsx), dan [`kontak/page.tsx`](../src/app/kontak/page.tsx).

## Pekerjaan berikutnya untuk fase lanjutan

1. **Alur P0 setoran & pengepul.** Tentukan data yang diperlukan untuk setor dan jemput, aturan penugasan, jadwal, serta status batal dan ditolak. Tetapkan akses akun pengepul dan penyimpanan transaksi server sebelum menerima data warga.
2. **Validasi & EcoPoints setoran.** Jadikan hasil timbang yang diperiksa sebagai dasar transaksi. Bukti foto, OCR timbangan, dan pemeriksaan AI membantu peninjauan. Simpan alasan penolakan dan hubungkan transaksi valid dengan penerbitan EcoPoints satu kali.
3. **Konten dan pemeriksaan akhir.** Lengkapi foto dokumentasi asli untuk galeri, kanal kontak resmi, dan rincian kolaborasi yang terkonfirmasi.

## Pemeriksaan sebelum rilis

- Jalur aktif (Beranda, Tentang, Edukasi, Kontak, Portal Warga, Portal Pemkot) dapat dibuka di ponsel dan desktop; rute lama `/pengepul` dan `/admin` mengarah ke `/#gateway`.
- Jalankan `npm run lint`, `npm run typecheck`, dan `npm run build` tanpa error.
