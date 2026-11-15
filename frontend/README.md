# Frontend BONI

Antarmuka BONI memakai Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, dan font lokal Plus Jakarta Sans. Jalankan aplikasi dari akar repo dengan `npm ci` dan `npm run dev`. [Petunjuk lengkap](../README.md#instalasi-dan-cara-menjalankan)

## Halaman dan alur demo

| Halaman | Berkas | Isi |
| --- | --- | --- |
| `/` | [page.tsx](../src/app/page.tsx) | Beranda, cara kerja, dan pilihan portal |
| `/tentang` | [tentang/page.tsx](../src/app/tentang/page.tsx) | Profil BONI, ekosistem, dan rancangan setoran |
| `/edukasi` | [edukasi/page.tsx](../src/app/edukasi/page.tsx) | Panduan pilah, cek kesiapan, aksi hijau, dan galeri |
| `/kontak` | [kontak/page.tsx](../src/app/kontak/page.tsx) | FAQ dan simulasi form kontak |
| `/dashboard` | [dashboard/](../src/app/dashboard/) | Verifikasi Aksi, hadiah dan tantangan, laporan sampah, peta, serta profil |
| `/gov/dashboard` | [gov/dashboard/](../src/app/gov/dashboard/) | Pemantauan laporan, analitik, peta wilayah, dan pratinjau program |

Portal Warga memiliki akses cepat di `/login?role=warga`. Portal Pemkot dapat dibuka melalui `/gov/login`. Keduanya punya sesi demo terpisah. Rute `/pengepul` dan `/admin` mengarah ke pilihan portal di Beranda selama fitur setoran ditunda. [Serah terima demo](../docs/SERAH-TERIMA-TECHNO-VERSARY.md)

## Struktur dan data

- [src/components/layout/](../src/components/layout/) memuat navigasi publik, layout, dan sidebar. [src/config/navigation.ts](../src/config/navigation.ts) memuat daftar tautan.
- [src/components/features/](../src/components/features/) memuat komponen interaksi per fitur. [src/styles/globals.css](../src/styles/globals.css) dan [tailwind.config.ts](../tailwind.config.ts) memuat gaya bersama.
- [src/store/](../src/store/) memakai Zustand. Data demo yang dipersistenkan dibaca dari `localStorage` setelah hidrasi, antara lain dengan [useHydrated](../src/hooks/useHydrated.ts).
- Peta Leaflet memakai kanvas yang dimuat di browser. Data dasar demo serta definisi 31 kecamatan tersedia di [src/data/demo/](../src/data/demo/) dan [src/config/surabaya.ts](../src/config/surabaya.ts).
- Manifest dan ikon untuk mode instalasi aplikasi berada di [public/](../public/README.md). Build produksi menyiapkan service worker.
