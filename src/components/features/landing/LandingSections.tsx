"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { competitionConfig, sdgAlignment, teamConfig } from "@/config/site";
import HeroConsole from "./HeroConsole";
import PlatformShowcase from "./PlatformShowcase";
export { PlatformShowcase };

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── 1. Hero Section (Video Latar Belakang & Panggung Kaca Kristal) ── */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-emerald-900/10 bg-[#F5FAF7]">
      {/* Video latar merawat tanaman & lingkungan agar suasana hijau langsung terasa */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <video
          src="/media/hero-planting.mp4"
          poster="/media/hero-planting-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5FAF7]/90 via-[#F5FAF7]/80 to-[#F5FAF7]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 34, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F3D2E] sm:text-5xl lg:text-[54px]"
          >
            Jaga kebersihan dari rumah, <span className="text-[#1D9E75]">hidupkan lingkungan Surabaya.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, delay: 0.16, ease: EASE_OUT_EXPO }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-[#2D5542] sm:text-lg"
          >
            Pilah botol plastik dan kardus, simpan minyak jelantah, serta rawat tanaman pekarangan. Setiap kebiasaan
            baik warga dicatat transparan dan kembali menjadi voucher belanja UMKM kampung.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, delay: 0.32, ease: EASE_OUT_EXPO }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#18533F] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2"
            >
              <span>Mulai eksplorasi demo</span>
            </Link>
            <Link
              href="/#gateway"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
            >
              <span>Pilih portal peran</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Jendela Aplikasi Jurnal Aksi Lingkungan */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.42, ease: EASE_OUT_EXPO }}
          className="mt-12 sm:mt-14"
        >
          <HeroConsole />
        </motion.div>
      </div>
    </section>
  );
}

/* ── 2. Tantangan Nyata Lingkungan Kota Surabaya ── */
export function Problem() {
  const tantangan = [
    {
      nomor: "01",
      kategori: "Dapur Rumah Tangga",
      judul: "Sampah dapur tercampur sejak dari rumah",
      info: "Sisa makanan basah dan kemasan plastik dibuang ke satu wadah yang sama.",
      akibat: "Material daur ulang ikut terkontaminasi dan langsung menjadi beban residu di TPA Benowo.",
    },
    {
      nomor: "02",
      kategori: "Saluran Air Kampung",
      judul: "Minyak jelantah dibuang ke selokan",
      info: "Minyak sisa penggorengan dituang ke wastafel dan mengalir ke got permukiman.",
      akibat: "Lemak membeku menjadi kerak penyumbat saluran dan memicu genangan saat hujan tinggi.",
    },
    {
      nomor: "03",
      kategori: "Kebiasaan Harian Warga",
      judul: "Semangat warga cepat padam",
      info: "Kerja bakti atau lomba kebersihan sering ramai sesaat tanpa timbal balik harian bagi keluarga.",
      akibat: "Partisipasi berhenti begitu acara usai dan belum terbentuk menjadi kebiasaan mandiri.",
    },
    {
      nomor: "04",
      kategori: "Kebersihan Sudut Kota",
      judul: "Titik tumpukan sampah tersebar liar",
      info: "Tumpukan liar di sudut jalan sulit terpantau cepat tanpa laporan berkoordinat dari warga.",
      akibat: "Penanganan petugas kebersihan menjadi terlambat dan mencemari lingkungan sekitar.",
    },
  ];

  const ringkasanKota = [
    {
      label: "Timbulan Harian Kota",
      angka: "1.800 ton / hari",
      judul: "Dimulai dari dapur keluarga",
      deskripsi: "Volume sampah harian Surabaya yang bisa dikurangi drastis bila plastik dan kardus dipilah sejak dari rumah.",
    },
    {
      label: "Beban Lahan Akhir",
      angka: "37,5 Hektar",
      judul: "Menjaga usia TPA Benowo",
      deskripsi: "Fasilitas pengolahan akhir kota tetap membutuhkan pemilahan warga agar tidak kelebihan residu basah.",
    },
    {
      label: "Gotong Royong Wilayah",
      angka: "31 Kecamatan",
      judul: "Lingkungan bersih merata",
      deskripsi: "Partisipasi kebersihan dipetakan di seluruh kecamatan Surabaya dengan tetap menjaga privasi rumah warga.",
    },
  ];

  return (
    <section id="tantangan" className="scroll-mt-16 border-b border-emerald-900/10 bg-[#FAFDFB] px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
          className="max-w-3xl text-2xl font-bold leading-[1.3] tracking-tight text-[#0F3D2E] sm:text-3xl"
        >
          <span>Kebersihan kota berawal dari kebiasaan kecil di rumah.</span>{" "}
          <span className="font-normal text-[#426352]">
            Ketika botol plastik, kardus, dan minyak jelantah dipisahkan dari sampah basah, beban lingkungan Surabaya
            berkurang dan berubah menjadi manfaat bagi warga.
          </span>
        </motion.h2>

        {/* 3 Pilar Angka Lingkungan (Gambar 1) */}
        <div className="mt-12 grid border-y border-emerald-900/12 sm:grid-cols-3 sm:divide-x sm:divide-emerald-900/12">
          {ringkasanKota.map(({ label, angka, judul, deskripsi }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 36, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.0, delay: idx * 0.18, ease: EASE_OUT_EXPO }}
              className="border-b border-emerald-900/10 py-7 last:border-b-0 sm:border-b-0 sm:px-7 sm:first:pl-0 sm:last:pr-0"
            >
              <span className="text-xs font-semibold text-[#1D9E75]">{label}</span>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-3xl">
                {angka}
              </p>
              <h3 className="mt-2 text-base font-bold text-[#0F3D2E]">{judul}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#426352]">{deskripsi}</p>
            </motion.div>
          ))}
        </div>

        {/* Opsi 1: Baris Sebab–Akibat Terbuka (Editorial Hairline Rows — Menyatu dengan Gambar 1) */}
        <div className="mt-12">
          <div className="hidden border-b border-emerald-900/15 pb-3 text-xs font-semibold text-[#527362] md:grid md:grid-cols-[200px_1.15fr_1fr] md:gap-8">
            <span>Titik Masalah</span>
            <span>Kondisi di Hulu</span>
            <span>Dampak di Kota</span>
          </div>

          <ol className="divide-y divide-emerald-900/12 border-b border-emerald-900/12">
            {tantangan.map(({ nomor, kategori, judul, info, akibat }, idx) => (
              <motion.li
                key={nomor}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.95, delay: idx * 0.15, ease: EASE_OUT_EXPO }}
                className="group grid gap-3 py-6 transition-colors hover:bg-emerald-950/[0.015] md:grid-cols-[200px_1.15fr_1fr] md:items-baseline md:gap-8"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#1D9E75]">{nomor}</span>
                  <span className="text-xs font-semibold text-[#527362]">{kategori}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F3D2E]">{judul}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#426352]">{info}</p>
                </div>

                <div className="flex items-baseline gap-2.5 pt-1 md:pt-0">
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs font-bold text-[#1D9E75] transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-[#0F3D2E]">{akibat}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
/* ── 2b. Cara Kerja Demo BONI (Alur Pilah → Setor/Jemput → Timbang → Verifikasi) ── */
export function CaraKerjaDemo() {
  const kolomLaporan = [
    {
      status: "Menunggu",
      jumlah: "3 laporan",
      dot: "bg-blue-600",
      tiket: [
        {
          id: "wr-demo-02",
          judul: "Sampah plastik tersangkut di bantaran sungai",
          lokasi: "Semampir",
          kategori: "Sampah sungai",
          keparahan: "Kritis",
        },
        {
          id: "wr-demo-05",
          judul: "Lahan terbuka berubah menjadi pembuangan liar",
          lokasi: "Gayungan",
          kategori: "TPS/TPA liar",
          keparahan: "Berat",
        },
      ],
    },
    {
      status: "Ditindaklanjuti",
      jumlah: "3 laporan",
      dot: "bg-amber-600",
      tiket: [
        {
          id: "wr-demo-01",
          judul: "Tumpukan sampah meluber di pinggir jalan",
          lokasi: "Wonokromo",
          kategori: "Tim Truk Pengangkut Sampah DLH",
          keparahan: "Berat",
        },
        {
          id: "wr-demo-10",
          judul: "Sampah jajanan berserakan di gerbang sekolah",
          lokasi: "Sukolilo",
          kategori: "Kelompok Relawan Lingkungan Warga",
          keparahan: "Ringan",
        },
      ],
    },
    {
      status: "Selesai",
      jumlah: "3 laporan",
      dot: "bg-[#15803D]",
      tiket: [
        {
          id: "wr-demo-07",
          judul: "Saluran drainase tersumbat tumpukan sampah",
          lokasi: "Tambaksari",
          kategori: "Satuan Saluran & Drainase Dinas SDA",
          keparahan: "Selesai dikeruk",
        },
        {
          id: "wr-demo-08",
          judul: "Bak sampah meluber di pintu pasar tradisional",
          lokasi: "Bubutan",
          kategori: "Tim Truk Pengangkut Sampah DLH",
          keparahan: "Ritase ditambah",
        },
      ],
    },
  ];

  const langkah = [
    {
      nomor: "Langkah 1",
      judul: "Pilah dari rumah",
      deskripsi: "Pisahkan botol PET dan kardus bersih dari sampah dapur basah.",
      status: "Panduan di Edukasi",
      href: "/edukasi",
    },
    {
      nomor: "Langkah 2",
      judul: "Setor atau jemput",
      deskripsi: "Warga memilih cara menyerahkan sampah yang sudah dipilah.",
      status: "Dalam rancangan",
      href: "/tentang#rencana-setoran",
    },
    {
      nomor: "Langkah 3",
      judul: "Timbang & cek material",
      deskripsi: "Pengepul memeriksa kebersihan material dan mencatat beratnya.",
      status: "Dalam rancangan",
      href: "/tentang#rencana-setoran",
    },
    {
      nomor: "Langkah 4",
      judul: "Verifikasi & EcoPoints",
      deskripsi: "Coba verifikasi foto dan tukarkan poin di katalog UMKM.",
      status: "Bisa dicoba di demo",
      href: "/login?role=warga",
    },
  ];

  const [sorotStatus, setSorotStatus] = useState<string | null>(null);

  return (
    <section id="cara-kerja" className="scroll-mt-24 border-b border-emerald-900/10 bg-[#F2F8F4] px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 38, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
          className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-start md:gap-12"
        >
          <h2 className="text-3xl font-extrabold leading-[1.14] tracking-tight text-[#0F3D2E] sm:text-5xl">
            Pelaporan warga <br />
            dan tindak lanjut kota
          </h2>

          <div className="max-w-lg md:pt-1">
            <p className="text-base leading-relaxed text-[#2D5542] sm:text-[17px]">
              Laporan titik sampah berkoordinat di portal Warga langsung terhubung dengan antrean tindak lanjut petugas
              di portal Pemkot Surabaya.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <Link
                href="/gov/login"
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
              >
                <span>Buka pratinjau portal Pemkot</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Pratinjau Papan Tiket Laporan Sampah Asli (/dashboard/laporan-sampah & /gov/dashboard) */}
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.18 }}
          transition={{ duration: 1.15, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="mt-12 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_20px_50px_-24px_rgba(15,61,46,0.14)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 bg-[#F8FAF9] px-4 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="ml-2 rounded-md border border-neutral-200/80 bg-white px-2.5 py-0.5 font-mono text-[11px] text-neutral-500">
                boni.app/gov/dashboard · Tiket Laporan Sampah
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {["Semua", "Menunggu", "Ditindaklanjuti", "Selesai"].map((st) => {
                const aktif = (st === "Semua" && sorotStatus === null) || sorotStatus === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSorotStatus(st === "Semua" ? null : st)}
                    className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                      aktif
                        ? "bg-[#0F3D2E] text-white"
                        : "bg-white text-neutral-500 hover:bg-emerald-50 hover:text-[#0F3D2E]"
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid divide-y divide-neutral-200/80 md:grid-cols-3 md:divide-x md:divide-y-0">
            {kolomLaporan.map((kol, colIdx) => {
              const redup = sorotStatus !== null && sorotStatus !== kol.status;
              return (
                <motion.div
                  key={kol.status}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.95, delay: 0.18 + colIdx * 0.16, ease: EASE_OUT_EXPO }}
                  className={`p-4 transition-opacity duration-300 sm:p-5 ${redup ? "opacity-45" : "opacity-100"}`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                      <span className={`h-2 w-2 rounded-full ${kol.dot}`} />
                      <span>{kol.status}</span>
                    </div>
                    <span className="font-mono text-[11px] text-neutral-500">{kol.jumlah}</span>
                  </div>

                  <div className="mt-3.5 space-y-2.5">
                    {kol.tiket.map((t) => (
                      <motion.div
                        key={t.id}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                        className="rounded-xl border border-neutral-200/80 bg-[#FAFDFB] p-3.5 transition-all hover:border-[#2D5F3F]/35 hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500">
                          <span>{t.id}</span>
                          <span>{t.lokasi}</span>
                        </div>
                        <p className="mt-1 text-xs font-bold leading-snug text-[#1A1A1A] sm:text-[13px]">
                          {t.judul}
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                          <span className="truncate text-neutral-600">{t.kategori}</span>
                          <span className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-medium text-[#2D5F3F]">
                            {t.keparahan}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 4 Langkah Alur */}
        <ol className="mt-10 grid border-t border-emerald-900/15 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-emerald-900/15">
          {langkah.map(({ nomor, judul, deskripsi, status, href }, idx) => (
            <motion.li
              key={nomor}
              initial={{ opacity: 0, y: 34, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.95, delay: idx * 0.16, ease: EASE_OUT_EXPO }}
              className="flex flex-col justify-between border-b border-emerald-900/10 py-6 last:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0 lg:border-b-0"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#1D9E75]">
                  <span>{nomor}</span>
                  <span className="text-[#527362]">{status}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-[#0F3D2E]">{judul}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#426352]">{deskripsi}</p>
              </div>
              <Link
                href={href}
                className="group mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
              >
                <span>Buka halaman</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
/* ── 3. Flagship Interactive Showcase — 3 Panggung Solusi Nyata Berbasis UI Mockup ── */
export function FlagshipShowcase() {
  return (
    <section id="features" className="scroll-mt-16 bg-[#F8FAF9] px-4 py-20 sm:px-6 sm:py-28 border-t border-gray-100">
      <div id="how-it-works" className="scroll-mt-24 mx-auto max-w-6xl">
        {/* Header Bagian Terstruktur & Elegan */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F3D2E] sm:text-4xl lg:text-[44px] leading-snug sm:leading-tight">
            Solusi Nyata di Tangan Warga, <br className="hidden sm:inline" />
            <span className="text-[#1D9E75]">Dampak Terukur</span> di Seluruh Kota.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#3B5B49] max-w-2xl mx-auto">
            Bukan sekadar konsep di atas kertas. Tiga instrumen digital terintegrasi yang mengubah kebiasaan memilah sampah rumah tangga menjadi perputaran daya beli warung dan transparansi geospasial kota.
          </p>
        </div>

        {/* 3 Showcase Bento Cards dengan Visual Mockup Nyata */}
        <div className="mt-14 space-y-8 lg:space-y-10">
          {/* Showcase 1: Vision AI Engine */}
          <div className="grid items-center gap-8 rounded-[2.5rem] border border-emerald-950/[0.08] bg-white p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 shadow-[0_16px_40px_-10px_rgba(15,61,46,0.08)]">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-black text-[#0F3D2E] tracking-tight">
                Verifikasi Bukti Aksi Otomatis & Objektif
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4D6D5B]">
                Warga cukup memotret aksi pemilahan sampah atau setor minyak jelantah. Model machine learning Google Cloud Vision menganalisis keaslian foto, mencocokkan label wadah, mencegah duplikasi hash SHA-256, dan seketika menerbitkan EcoPoints tanpa antrean birokrasi.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#0F3D2E]">
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">Anti-Duplikasi SHA-256</span>
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">Multi-Label Detection</span>
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">Batas Usia Bukti 72 Jam</span>
              </div>
              <div className="mt-7">
                <Link
                  href="/dashboard/eco-action"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#0F3D2E]/20 transition-all hover:bg-[#18533F] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Coba Verifikasi Foto di Demo</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Visual Mockup 1: Simulated Camera Scanner UI */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-emerald-950/20 bg-gradient-to-br from-[#0A2015] via-[#0E2E1E] to-[#06140D] p-5 text-white shadow-2xl">
                {/* Viewfinder Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs tracking-wider">
                    VISION SCANNER
                  </div>
                  <span className="font-mono text-[11px] text-white/60">ID: ACC-2026-SBY</span>
                </div>

                {/* Simulated Photo Frame with Bounding Box */}
                <div className="relative mt-4 h-48 sm:h-56 w-full overflow-hidden rounded-2xl bg-[#0F3320] border border-white/15">
                  <Image
                    src="/media/hero-planting-poster.jpg"
                    alt="Simulasi Foto Aksi Hijau"
                    fill
                    className="object-cover opacity-60"
                  />
                  {/* Neon Bounding Box */}
                  <div className="absolute inset-x-8 inset-y-6 rounded-xl border-2 border-[#7AC74F] bg-[#7AC74F]/10 shadow-[0_0_15px_rgba(122,199,79,0.3)] flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-[#0F3D2E] px-2 py-0.5 font-mono text-[10px] font-bold text-[#7AC74F]">
                        [✓] Botol PET Bersih Terdeteksi
                      </span>
                      <span className="rounded-md bg-[#7AC74F] px-1.5 py-0.5 text-[10px] font-black text-[#082011]">
                        99.4%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-white/80">
                      <span>Integritas: Lolos Anti-Spoof</span>
                      <span className="font-mono text-emerald-300">GPS: Surabaya</span>
                    </div>
                  </div>
                </div>

                {/* Result Pill */}
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/15">
                  <div>
                    <p className="text-xs font-bold text-white">Status: Terverifikasi Otomatis</p>
                    <p className="text-[11px] text-emerald-200/70">Reduksi: 0.42 kg CO₂e</p>
                  </div>
                  <span className="rounded-full bg-[#7AC74F] px-3.5 py-1 text-xs font-black text-[#082011] shadow-md shadow-[#7AC74F]/30">
                    +25 EcoPoints
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase 2: Pasar Hijau Digital Voucher */}
          <div className="grid items-center gap-8 rounded-[2.5rem] border border-emerald-950/[0.08] bg-white p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 shadow-[0_16px_40px_-10px_rgba(15,61,46,0.08)]">
            {/* Visual Mockup 2: Perforated Digital Voucher */}
            <div className="order-2 lg:order-1 lg:col-span-6">
              <div className="relative mx-auto max-w-md">
                {/* Perforated Coupon Card */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-6 sm:p-7 shadow-xl">
                  {/* Decorative Notch Circles */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#F8FAF9] border-r-2 border-dashed border-emerald-300" />
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#F8FAF9] border-l-2 border-dashed border-emerald-300" />

                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0F3D2E] text-white font-bold text-xs">
                        P
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#0F3D2E]">Kupon Belanja UMKM</p>
                        <p className="text-[10px] text-gray-500">Mitra Resmi Surabaya</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                      100% Non-Kripto
                    </span>
                  </div>

                  <div className="my-5 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Nilai Potongan Belanja</span>
                    <p className="text-3xl sm:text-4xl font-black text-[#0F3D2E] mt-1">
                      Rp 15.000
                    </p>
                    <p className="text-xs font-semibold text-[#1D9E75] mt-1">
                      Warung Kopi & Sembako Bu Siti · Wonokromo
                    </p>
                  </div>

                  {/* Simulated Barcode */}
                  <div className="border-t border-gray-200 pt-4 flex flex-col items-center">
                    <div className="h-9 w-48 bg-[repeating-linear-gradient(90deg,#0F3D2E,#0F3D2E_2px,transparent_2px,transparent_4px,#0F3D2E_4px,#0F3D2E_7px,transparent_7px,transparent_9px)] rounded-xs opacity-75" />
                    <span className="mt-1 font-mono text-[10px] font-bold tracking-widest text-gray-500">
                      SBY-2026-BONI-7789
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-black text-[#0F3D2E] tracking-tight">
                Poin Lingkungan yang Menghidupkan Ekonomi Warung
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4D6D5B]">
                EcoPoints dirancang sebagai instrumen ekonomi sirkular riil, bukan instrumen spekulasi. Poin aksi hijau ditukarkan langsung menjadi potongan harga belanja di warung kopi, sembako, dan bengkel sekitar tempat tinggal warga.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#0F3D2E]">
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">Kupon Digital Perforasi</span>
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">Mitra Warung Tetangga</span>
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">Proteksi Pembatalan Aman</span>
              </div>
              <div className="mt-7">
                <Link
                  href="/dashboard/marketplace"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#0F3D2E]/20 transition-all hover:bg-[#18533F] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Buka Bursa Voucher UMKM</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* Showcase 3: Geospasial Surabaya & Laporan GPS */}
          <div className="grid items-center gap-8 rounded-[2.5rem] border border-emerald-950/[0.08] bg-white p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 shadow-[0_16px_40px_-10px_rgba(15,61,46,0.08)]">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-black text-[#0F3D2E] tracking-tight">
                Peta Dampak Terbuka & Respon Armada Presisi
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4D6D5B]">
                Warga dapat melaporkan timbulan sampah liar publik lengkap dengan koordinat GPS real-time, sementara peta agregasi spasial 31 kecamatan menyajikan data transparan tanpa membuka privasi rumah tangga, memandu armada kebersihan kota bekerja lebih efisien.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#0F3D2E]">
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">GPS Koordinat Real-Time</span>
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">31 Kecamatan Terpetakan</span>
                <span className="rounded-xl bg-gray-100 px-3 py-1.5">Privasi Alamat Terlindungi</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/dashboard/map"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#0F3D2E]/20 transition-all hover:bg-[#18533F] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Buka Peta Dampak</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/dashboard/laporan-sampah"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-900/20 bg-emerald-50/60 px-5 py-3 text-sm font-bold text-[#0F3D2E] hover:bg-emerald-100/60 transition-all"
                >
                  <span>Simulasi Lapor Sampah</span>
                </Link>
              </div>
            </div>

            {/* Visual Mockup 3: Geospasial Radar Display */}
            {/* Visual Mockup 3: Real Civic Data Dashboard for Surabaya DLH */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-emerald-950/20 bg-gradient-to-br from-[#0A2214] via-[#0E301D] to-[#06170D] p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                      DLH SURABAYA · SISTEM AGREGASI WILAYAH
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">Sebaran Partisipasi 31 Kecamatan</h4>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#7AC74F] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    ● Aktif
                  </span>
                </div>

                {/* Civic District Stats List */}
                <div className="my-4 space-y-2.5">
                  {[
                    { nama: "Wonokromo", aksi: 342, status: "Terkelola Optimal", pct: 86, tag: "Bank Sampah Aktif" },
                    { nama: "Rungkut", aksi: 289, status: "Partisipasi Tinggi", pct: 74, tag: "Setor Jelantah" },
                    { nama: "Gubeng", aksi: 215, status: "Terkelola Optimal", pct: 60, tag: "Kompos Mandiri" },
                    { nama: "Tegalsari", aksi: 178, status: "Armada Siaga", pct: 50, tag: "Laporan Tuntas" },
                  ].map((row) => (
                    <div key={row.nama} className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">Kec. {row.nama}</span>
                          <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                            {row.tag}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#7AC74F]">{row.aksi} Aksi</span>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#7AC74F]" style={{ width: `${row.pct}%` }} />
                        </div>
                        <span className="text-[10px] text-white/60 font-mono">{row.pct}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-white/70 border-t border-white/10 pt-3">
                  <span className="font-medium">Privasi: Agregasi Tingkat RW / Wilayah</span>
                  <span className="font-mono font-bold text-[#7AC74F]">Armada DLH: 14 Unit Siaga</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Kompatibilitas alias untuk mempertahankan kelancaran import lama
export const HowItWorks = FlagshipShowcase;
export const Features = FlagshipShowcase;

/* ── 5. Kearifan Lokal Gotong Royong Surabaya ── */
export function BuiltForSurabaya() {
  const pilar = [
    {
      kode: "01",
      judul: "Warga Berdaya",
      info: "Dokumentasikan aksi peduli lingkungan langsung dari ponsel tanpa birokrasi rumit.",
    },
    {
      kode: "02",
      judul: "Respon Sampah Presisi",
      info: "Catat lokasi timbulan sampah dan lihat cara laporan dikelola di portal demo.",
    },
    {
      kode: "03",
      judul: "Ekonomi Kampung Berputar",
      info: "Gunakan EcoPoints dalam simulasi katalog voucher UMKM lokal.",
    },
    {
      kode: "04",
      judul: "Peta Demo 31 Kecamatan",
      info: "Lihat contoh ringkasan wilayah dan partisipasi warga dengan privasi terjaga.",
    },
  ];

  return (
    <section id="surabaya" className="scroll-mt-16 border-b border-white/10 bg-gradient-to-br from-[#0B2618] via-[#0F3623] to-[#092014] px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 38, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
          className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-start md:gap-12"
        >
          <h2 className="text-3xl font-extrabold leading-[1.14] tracking-tight text-white sm:text-5xl">
            Melengkapi semangat <br />
            bank sampah & gotong royong
          </h2>

          <p className="max-w-lg text-base leading-relaxed text-emerald-100/85 sm:text-[17px] md:pt-1">
            Warga Surabaya sudah lama mandiri menjaga kebersihan kampungnya. BONI hadir memperkuat tradisi ini agar
            setiap kebaikan tercatat rapi dan memberi manfaat timbal balik bagi keluarga.
          </p>
        </motion.div>

        <div className="mt-14 grid border-y border-white/15 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
          {pilar.map(({ kode, judul, info }, idx) => (
            <motion.div
              key={judul}
              initial={{ opacity: 0, y: 36, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.0, delay: idx * 0.16, ease: EASE_OUT_EXPO }}
              className="border-b border-white/15 py-7 transition-colors hover:bg-white/[0.02] last:border-b-0 sm:px-6 sm:first:pl-0 sm:last:pr-0 lg:border-b-0"
            >
              <span className="text-xs font-bold text-[#7AC74F]">{kode}</span>
              <h3 className="mt-3 text-base font-bold text-white">{judul}</h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-100/80">{info}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. SDGs Alignment (100% Bahasa Indonesia) ── */
export function Alignment() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-5 py-2 text-xs sm:text-sm font-bold text-[#0F3D2E] shadow-2xs">
            Komitmen Keberlanjutan ESG
          </span>
          <h2 className="mt-5 text-xl font-black text-[#0F3D2E] sm:text-3xl leading-snug sm:leading-[1.35]">
            Keselarasan Komitmen <br className="hidden sm:inline" />
            Pembangunan Berkelanjutan (SDGs)
          </h2>
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#4D6D5B]">
            Kontribusi nyata BONI terhadap target keberlanjutan perkotaan dan iklim global.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sdgAlignment.map((s) => (
            <div
              key={s.goal}
              className="flex flex-col justify-between rounded-3xl border border-emerald-950/[0.06] bg-[#FAFCFB] p-6 shadow-xs transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <span
                  className="inline-block rounded-xl px-2.5 py-1 text-xs font-black text-white shadow-xs"
                  style={{ backgroundColor: s.color }}
                >
                  SDG {s.goal}
                </span>
                <h3 className="mt-4 text-sm font-bold text-[#0F3D2E]">{s.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4D6D5B]">{s.link}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Privasi & Keamanan Data (Privacy by Design) ── */
export function Privacy() {
  const proteksi = [
    { judul: "Data Minimal", info: "Hanya butuh nama dan email tanpa meminta identitas KTP atau dokumen sensitif." },
    { judul: "Lokasi Tersamarkan", info: "Koordinat GPS warga dibatasi sebatas batas wilayah kecamatan." },
    { judul: "Peta Agregat", info: "Menyajikan total statistik kecamatan tanpa membuka titik alamat rumah." },
    { judul: "EXIF Scrubbing", info: "Metadata foto otomatis dibersihkan langsung di browser ponsel sebelum diunggah." },
    { judul: "Kunci AI Aman", info: "Kunci server Google Cloud Vision tersimpan aman di environment server-side." },
    { judul: "Sesi Mandiri", info: "Sesi warga dan portal petugas dinas terpisah secara fisik dengan token independen." },
  ];

  return (
    <section id="privacy" className="scroll-mt-16 bg-[#FAFDFB] px-4 py-16 sm:px-6 sm:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-5 py-2 text-xs sm:text-sm font-bold text-[#0F3D2E] shadow-2xs">
            Privacy by Design
          </span>
          <h2 className="mt-5 text-xl font-black text-[#0F3D2E] sm:text-3xl leading-snug sm:leading-[1.35]">
            Menghormati Privasi Seluruh Warga
          </h2>
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#4D6D5B]">
            Arsitektur keamanan data yang menjamin partisipasi warga tetap aman, anonim, dan terlindungi.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proteksi.map((p, idx) => (
            <div
              key={p.judul}
              className="flex items-start gap-4 rounded-3xl border border-emerald-950/[0.06] bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100/80 text-[#0F3D2E] text-[11px] font-mono font-bold">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F3D2E]">{p.judul}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#4D6D5B]">{p.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8. Profil Tim Inovasi Mahasiswa ── */
export function Team() {
  return (
    <section id="team" className="scroll-mt-16 bg-white px-4 py-16 sm:px-6 sm:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-5 py-2 text-xs sm:text-sm font-bold text-[#0F3D2E] shadow-2xs">
            Tim Inovasi Mahasiswa
          </span>
          <h2 className="mt-4 text-xl font-black tracking-tight text-[#0F3D2E] sm:text-3xl">
            {teamConfig.teamName}
          </h2>
          <p className="mt-2 text-xs text-gray-500">
            {teamConfig.institution} · {competitionConfig.name}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {teamConfig.members.map((m) => (
            <div key={m} className="flex items-center gap-3.5 rounded-3xl border border-gray-200/80 bg-[#FAFCFB] p-5 shadow-2xs">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F3D2E] text-xs font-bold text-white shadow-xs">
                {m.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </span>
              <div>
                <p className="text-xs font-bold text-[#0F3D2E]">{m}</p>
                <p className="text-[10px] text-gray-400">{teamConfig.institutionShort}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 9. Call to Action Eksekutif — Dua Gerbang Eksplorasi Interaktif ── */
export function FinalCta() {
  const gerbang = [
    {
      kode: "Peran Warga & UMKM",
      judul: "Simulasi Aksi Warga & UMKM",
      deskripsi: "Coba unggah bukti aksi kebersihan, kumpulkan EcoPoints, dan simulasikan penukaran voucher UMKM.",
      butir: [
        "Pemeriksaan contoh foto berbantuan AI",
        "Katalog voucher diskon belanja warung & UMKM Surabaya",
        "Pelaporan titik timbulan sampah berkoordinat GPS",
      ],
      href: "/login?role=warga",
      tombol: "Mulai demo Warga",
      utama: true,
    },
    {
      kode: "Peran Pemerintah Kota",
      judul: "Simulasi Portal Pemkot",
      deskripsi: "Jelajahi contoh pemantauan aksi lingkungan dan penanganan laporan kebersihan per wilayah.",
      butir: [
        "Peta agregasi spasial terbuka 31 kecamatan",
        "Contoh tiket laporan timbulan sampah",
        "Ringkasan partisipasi kebersihan warga",
      ],
      href: "/gov/login",
      tombol: "Buka portal Pemkot",
      utama: false,
    },
  ];

  return (
    <section id="gateway" className="scroll-mt-16 bg-[#FAFDFB] px-4 py-20 sm:px-6 sm:py-28">
      <div id="team" className="scroll-mt-20 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 38, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
          className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-end md:gap-12"
        >
          <h2 className="text-3xl font-extrabold leading-[1.14] tracking-tight text-[#0F3D2E] sm:text-5xl">
            Mulai jelajahi <br />
            ekosistem BONI
          </h2>
          <p className="max-w-md text-base leading-relaxed text-[#2D5542]">
            Uji coba sistem interaktif warga atau akses portal pemerintah kota langsung di peramban tanpa instalasi
            aplikasi.
          </p>
        </motion.div>

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-sm md:grid-cols-2 md:divide-x md:divide-emerald-900/12">
          {gerbang.map(({ kode, judul, deskripsi, butir, href, tombol, utama }, idx) => (
            <motion.div
              key={judul}
              initial={{ opacity: 0, y: 38, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.05, delay: idx * 0.18, ease: EASE_OUT_EXPO }}
              className="flex flex-col justify-between gap-8 border-b border-emerald-900/10 p-7 transition-colors hover:bg-[#FAFDFB] last:border-b-0 sm:p-9 md:border-b-0"
            >
              <div>
                <span className="text-xs font-bold text-[#1D9E75]">{kode}</span>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-[#0F3D2E]">{judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#426352]">{deskripsi}</p>

                <ul className="mt-6 divide-y divide-emerald-900/10 border-y border-emerald-900/10 text-sm text-[#1F3F2F]">
                  {butir.map((item) => (
                    <li key={item} className="py-2.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={href}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2 ${
                  utama
                    ? "bg-[#0F3D2E] text-white hover:bg-[#18533F]"
                    : "border border-[#0F3D2E]/25 text-[#0F3D2E] hover:bg-emerald-50/70"
                }`}
              >
                <span>{tombol}</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
