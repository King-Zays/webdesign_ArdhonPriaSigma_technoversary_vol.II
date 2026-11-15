# Aset publik BONI

Next.js menyajikan isi folder ini dari akar URL. Sebagai contoh, `public/logo.png` dapat diakses di `/logo.png`.

| Lokasi | Fungsi |
| --- | --- |
| `logo.png`, `logo-white.png`, dan `favicon-*` | Logo untuk latar terang dan gelap serta ikon tab |
| [fonts/](fonts/) | Font Plus Jakarta Sans yang dimuat oleh [root layout](../src/app/layout.tsx) |
| [media/](media/) | Media Beranda dan aset visual halaman Tentang |
| [images/3d/](images/3d/) | Ilustrasi fitur aplikasi |
| [icons/](icons/) dan [manifest.json](manifest.json) | Identitas aplikasi yang dapat dipasang |
| `sw.js`, `workbox-*.js`, dan `sw-push.js` | Service worker hasil build, pustaka Workbox, dan handler push |

[next.config.js](../next.config.js) mengatur pembuatan service worker pada build produksi. File di folder ini dapat dibaca pengunjung situs. [Kredit aset](../README-SUMBER.md)
