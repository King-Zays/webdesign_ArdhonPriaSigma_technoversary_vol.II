"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ecosystemRoles = [
  {
    badge: "Peran 01",
    name: "Warga & Komunitas RW",
    role: "Memilah botol PET, kardus, dan minyak jelantah sejak di rumah, mendokumentasikan 5 kategori Aksi Hijau berbantuan AI, melaporkan titik sampah berkoordinat, serta menukar EcoPoints menjadi voucher UMKM kampung.",
  },
  {
    badge: "Peran 02",
    name: "Pengepul & Bank Sampah",
    role: "Memeriksa kesesuaian material secara fisik dan mencatat berat aktual hasil timbangan digital pada rute pengumpulan yang sudah berjalan tanpa perlu armada baru.",
  },
  {
    badge: "Peran 03",
    name: "Pemerintah Kota (DLH) & Pengelola",
    role: "Memantau peta agregat partisipasi warga di 31 kecamatan Surabaya tanpa membuka alamat rumah, serta menindaklanjuti tiket laporan titik timbulan sampah dari warga.",
  },
] as const;

const depositSteps = [
  {
    step: "Tahap 01",
    status: "Aktif di demo",
    statusTone: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
    title: "Pilah dari rumah",
    description:
      "Warga menyiapkan botol plastik PET (kode 1) dan kardus dalam kondisi kering serta bebas residu, lalu memeriksa kesiapan lewat panduan pilah.",
    actionLabel: "Buka panduan pilah",
    actionHref: "/edukasi",
  },
  {
    step: "Tahap 02",
    status: "Tahap rancangan",
    statusTone: "border-white/15 bg-white/[0.06] text-emerald-100/75",
    title: "Setor atau jemput & timbang",
    description:
      "Warga memilih setor langsung atau penjemputan, sementara mitra pengepul memeriksa material fisik dan mencatat berat aktual pada timbangan.",
    actionLabel: "Pelajari panduan setor",
    actionHref: "/edukasi#setor-atau-jemput",
  },
  {
    step: "Tahap 03",
    status: "AI Aksi Hijau aktif",
    statusTone: "border-amber-400/35 bg-amber-500/15 text-amber-200",
    title: "Catat bukti & tinjau",
    description:
      "Pemeriksaan foto berbasis AI (5 kategori Aksi Hijau) dan pembersihan EXIF GPS sudah aktif di demo, sedangkan OCR angka timbangan sedang disiapkan.",
    actionLabel: "Coba verifikasi AI",
    actionHref: "/dashboard/eco-action",
  },
  {
    step: "Tahap 04",
    status: "Aktif di Pusat Hadiah",
    statusTone: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
    title: "EcoPoints & Voucher UMKM",
    description:
      "Aksi yang terverifikasi menghasilkan EcoPoints yang langsung dapat ditukarkan menjadi kupon QR Code di warung dan UMKM lokal Surabaya.",
    actionLabel: "Lihat katalog UMKM",
    actionHref: "/dashboard/marketplace",
  },
] as const;

const collaborationTracks = [
  {
    partner: "Komunitas & Warga Surabaya",
    status: "Terbuka untuk pendampingan",
    detail:
      "Mendampingi edukasi pemilahan botol PET, kardus, dan minyak jelantah dari rumah tangga serta menguji alur pelaporan titik sampah.",
  },
  {
    partner: "Pengepul & Bank Sampah",
    status: "Terbuka untuk uji coba rute",
    detail:
      "Menyusun jadwal setor langsung maupun penjemputan tanpa armada baru dan menguji pencatatan berat aktual di titik setor.",
  },
  {
    partner: "Pengelola Program & Mitra UMKM",
    status: "Tahap penjajakan",
    detail:
      "Meninjau rekap agregat partisipasi 31 kecamatan dan merumuskan skema insentif voucher diskon belanja bagi warga yang aktif memilah.",
  },
] as const;

export default function AboutSections() {
  return (
    <>
      {/* 1. Masalah di Rumah & Akar Permasalahan */}
      <section aria-labelledby="mulai-dari-rumah-title" className="border-b border-emerald-900/10 bg-[#FAFDFB] px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
            className="grid gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:items-center"
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D9E75]">
                01 · Masalah di Rumah
              </span>
              <h2
                id="mulai-dari-rumah-title"
                className="mt-3 text-3xl font-extrabold leading-[1.14] tracking-tight text-[#0F3D2E] sm:text-5xl"
              >
                Mulai dari rumah: <span className="text-[#1D9E75]">pilah material bernilai</span> sejak awal.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#2D5542]">
                Ketika botol plastik dan kardus bercampur dengan sisa makanan atau sampah dapur basah, nilainya cepat
                rusak dan berakhir di TPA Benowo. Memulai dari material yang jelas—botol PET, kardus bersih, dan minyak
                jelantah—memudahkan keluarga membangun kebiasaan harian sebelum diperluas ke kategori lain.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-900/15 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,61,46,0.12)] sm:p-7">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
                Langkah Awal Warga
              </p>
              <h3 className="mt-2 text-lg font-bold text-[#0F3D2E]">Panduan Pilah &amp; Checklist Kesiapan</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#426352]">
                Pelajari syarat bersih-kering untuk botol PET (kode 1) dan kardus, serta cara menyimpan minyak jelantah
                sebelum disetorkan atau didokumentasikan di BONI.
              </p>
              <Link
                href="/edukasi"
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#18533F]"
              >
                <span>Baca panduan pilah</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Tiga Peran Ekosistem (Hairline Editorial Grid — selaras dengan Beranda) */}
      <section aria-labelledby="peran-ekosistem-title" className="border-b border-emerald-900/10 bg-white px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
            className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-end md:gap-12"
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D9E75]">
                02 · Ekosistem Terhubung
              </span>
              <h2
                id="peran-ekosistem-title"
                className="mt-3 text-3xl font-extrabold leading-[1.14] tracking-tight text-[#0F3D2E] sm:text-5xl"
              >
                Tiga peran utama <br />
                dalam ekosistem BONI
              </h2>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-[#2D5542]">
              BONI menghubungkan pemilahan warga, jaringan pengumpulan pengepul atau bank sampah yang sudah ada, dan
              pemantauan kota tanpa membangun armada baru.
            </p>
          </motion.div>

          <div className="mt-14 grid border-y border-emerald-900/12 md:grid-cols-3 md:divide-x md:divide-emerald-900/12">
            {ecosystemRoles.map(({ badge, name, role }, idx) => (
              <motion.article
                key={name}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.95, delay: idx * 0.14, ease: EASE_OUT_EXPO }}
                className="border-b border-emerald-900/10 py-8 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-mono text-xs font-bold text-[#1D9E75]">{badge}</span>
                <h3 className="mt-3 text-xl font-bold text-[#0F3D2E]">{name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#426352]">{role}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Rancangan Alur Setoran & Demo Aktif (Seksi Hijau Gelap #081C11 — selaras dengan Beranda) */}
      <section
        id="rencana-setoran"
        aria-labelledby="rencana-setoran-title"
        className="scroll-mt-24 border-b border-white/10 bg-[#081C11] px-4 py-20 text-white sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 34, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
            className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-start md:gap-12"
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#7AC74F]">
                03 · Alur &amp; Kesiapan Sistem
              </span>
              <h2
                id="rencana-setoran-title"
                className="mt-3 text-3xl font-extrabold leading-[1.14] tracking-tight text-white sm:text-5xl"
              >
                Empat tahap alur <br />
                dari rumah ke UMKM
              </h2>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-emerald-100/80 md:pt-7">
              Panduan edukasi dan simulasi <strong className="font-semibold text-white">Portal Warga &amp; Pemkot</strong>{" "}
              sudah dapat dicoba langsung di peramban ini, sedangkan transaksi penimbangan fisik di pengepul dan OCR
              timbangan berada pada tahap <strong className="font-semibold text-white">rancangan</strong>.
            </p>
          </motion.div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {depositSteps.map(({ step, status, statusTone, title, description, actionLabel, actionHref }, idx) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 34, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.95, delay: idx * 0.14, ease: EASE_OUT_EXPO }}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#0D281A] to-[#081C11] p-6"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#7AC74F]">{step}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold ${statusTone}`}>
                      {status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">{description}</p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <Link
                    href={actionHref}
                    className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#7AC74F] transition-colors hover:text-white"
                  >
                    <span>{actionLabel}</span>
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.95, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="mt-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7AC74F]">
                Jelajahi Fitur Demo yang Aktif
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-emerald-100/80">
                Coba Portal Warga (Verifikasi Aksi Hijau AI, Laporan Sampah, Pusat Hadiah UMKM) serta Portal Pemkot
                untuk 31 kecamatan Surabaya.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/edukasi"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/[0.12]"
              >
                Buka panduan edukasi
              </Link>
              <Link
                href="/#gateway"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1D9E75] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#23b385]"
              >
                <span>Pilih portal demo</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Peluang Kolaborasi & Kontak (#kolaborasi) */}
      <section id="kolaborasi" aria-labelledby="kolaborasi-title" className="scroll-mt-24 bg-[#FAFDFB] px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
            className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-end md:gap-12"
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D9E75]">
                04 · Peluang Kolaborasi
              </span>
              <h2
                id="kolaborasi-title"
                className="mt-3 text-3xl font-extrabold leading-[1.14] tracking-tight text-[#0F3D2E] sm:text-5xl"
              >
                Kolaborasi bertahap <br />
                sesuai peran
              </h2>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-[#2D5542]">
              Status di bawah mencerminkan kesiapan uji coba prototipe saat ini—kemitraan operasional ditetapkan bertahap
              bersama pihak yang bersedia menguji di lapangan.
            </p>
          </motion.div>

          <div className="mt-14 grid border-y border-emerald-900/12 md:grid-cols-3 md:divide-x md:divide-emerald-900/12">
            {collaborationTracks.map(({ partner, status, detail }, idx) => (
              <motion.article
                key={partner}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.95, delay: idx * 0.14, ease: EASE_OUT_EXPO }}
                className="border-b border-emerald-900/10 py-8 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-mono text-xs font-bold text-[#1D9E75]">{status}</span>
                <h3 className="mt-3 text-xl font-bold text-[#0F3D2E]">{partner}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#426352]">{detail}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.95, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="mt-10 flex flex-col gap-5 rounded-2xl border border-emerald-900/15 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="max-w-2xl">
              <p className="text-lg font-bold text-[#0F3D2E]">
                Ingin berdiskusi tentang uji coba atau kerja sama lokal di Surabaya?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#426352]">
                Kirim pertanyaan atau usulan kolaborasi melalui halaman Kontak BONI.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/kontak"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-all hover:-translate-y-0.5 hover:bg-[#18533F]"
              >
                <span>Lihat informasi kontak</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
