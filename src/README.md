# Kode aplikasi BONI

Aplikasi memakai Next.js App Router. Perintah instalasi dan pengujian dijalankan dari [akar repo](../README.md#instalasi-dan-cara-menjalankan).

| Folder atau berkas | Tanggung jawab |
| --- | --- |
| [app/](app/) | Rute publik, autentikasi demo, Portal Warga, Portal Pemkot, dan handler API |
| [components/](components/) | Komponen tampilan bersama, layout, peta, dan modul fitur |
| [config/](config/) | Identitas proyek, navigasi, jenis aksi, aturan EcoPoints, dan wilayah Surabaya |
| [data/](data/) | Baseline dan katalog UMKM untuk demo |
| [hooks/](hooks/) dan [store/](store/) | Interaksi klien, hidrasi, dan state demo |
| [lib/](lib/) dan [services/](services/) | Verifikasi, perhitungan dampak, layanan klien, dan integrasi server |
| [styles/](styles/), [types/](types/), dan [utils/](utils/) | Gaya global, tipe data, dan utilitas |
| [middleware.ts](middleware.ts) | Pemeriksaan sesi untuk rute Warga dan Pemkot |

Identitas situs dan tim disimpan di [config/site.ts](config/site.ts). Status fitur demo dan alur setoran ada di [dokumen serah terima](../docs/SERAH-TERIMA-TECHNO-VERSARY.md).
