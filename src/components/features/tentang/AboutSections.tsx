"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Gift,
  MapPin,
  QrCode,
  Scale,
  ShieldCheck,
  Ticket,
  Truck,
} from "lucide-react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const materialStandards = [
  {
    id: "pet",
    nama: "Botol Plastik PET (Kode 1)",
    syarat: "Kosongkan sisa cairan, bilas singkat bila lengket, dan remukkan agar hemat ruang simpan.",
    tujuan: "Disetorkan ke bank sampah / pengepul atau dicatat di Aksi Hijau (+40 pts).",
  },
  {
    id: "kardus",
    nama: "Kardus & Karton Lipat",
    syarat: "Lipat rata, lepaskan lakban berlebih, dan pastikan kering bebas noda minyak atau sisa makanan.",
    tujuan: "Ditimbang per kilogram pada jadwal setor langsung atau penjemputan.",
  },
  {
    id: "jelantah",
    nama: "Minyak Jelantah Rumah Tangga",
    syarat: "Saring ampas penggorengan dan simpan di jeriken atau botol tertutup rapat, jangan dituang ke selokan.",
    tujuan: "Disetor ke titik pengumpulan warga untuk diolah kembali (+50 pts).",
  },
] as const;

const ecosystemRoles = [
  {
    nomor: "01",
    peran: "Warga & Komunitas RW",
    tugas:
      "Memisahkan botol PET, kardus, dan minyak jelantah sejak dari dapur rumah, mengunggah foto bukti aksi kebersihan, serta melaporkan titik sampah liar.",
    fitur: "Aktif di Portal Warga (/dashboard/eco-action & /dashboard/laporan-sampah)",
    href: "/login?role=warga",
    cta: "Coba Portal Warga",
  },
  {
    nomor: "02",
    peran: "Pengepul & Bank Sampah",
    tugas:
      "Memeriksa kebersihan fisik material yang disetorkan warga dan mencatat berat aktual pada timbangan digital di rute pengumpulan yang sudah berjalan.",
    fitur: "Pratinjau alur setoran & timbangan (/pengepul & /edukasi#setor-atau-jemput)",
    href: "/edukasi#setor-atau-jemput",
    cta: "Lihat alur setoran",
  },
  {
    nomor: "03",
    peran: "Pemerintah Kota (DLH) & Pengelola",
    tugas:
      "Memantau agregasi partisipasi kebersihan di 31 kecamatan Surabaya tanpa membuka alamat rumah warga serta menugaskan regu penanganan laporan sampah.",
    fitur: "Aktif di Portal Pemkot (/gov/dashboard)",
    href: "/gov/login",
    cta: "Buka Portal Pemkot",
  },
] as const;

const depositStages = [
  {
    id: "pilah",
    nomor: "01",
    judul: "Pilah dari rumah",
    menuLabel: "Checklist Pilah",
    peran: "Warga",
    saldo: 500,
    status: "Aktif di Edukasi",
    rute: "boni.app/edukasi#cek-kesiapan",
    href: "/edukasi#cek-kesiapan",
    ringkasanBawah: "Botol PET (kode 1), kardus kering, & minyak jelantah",
  },
  {
    id: "setor",
    nomor: "02",
    judul: "Setor atau jemput & timbang",
    menuLabel: "Meja Timbang Mitra",
    peran: "Pengepul",
    saldo: 500,
    status: "Tahap Rancangan",
    rute: "boni.app/pengepul",
    href: "/edukasi#setor-atau-jemput",
    ringkasanBawah: "Setor ke titik kumpul atau penjemputan rute berjalan",
  },
  {
    id: "verifikasi",
    nomor: "03",
    judul: "Catat bukti & tinjau",
    menuLabel: "Verifikasi Aksi AI",
    peran: "Warga",
    saldo: 540,
    status: "Aktif di Demo",
    rute: "boni.app/dashboard/eco-action",
    href: "/dashboard/eco-action",
    ringkasanBawah: "Pemeriksaan foto AI 5 kategori & pembersihan EXIF GPS",
  },
  {
    id: "hadiah",
    nomor: "04",
    judul: "EcoPoints & voucher UMKM",
    menuLabel: "Pusat Hadiah UMKM",
    peran: "Warga",
    saldo: 390,
    status: "Aktif di Demo",
    rute: "boni.app/dashboard/marketplace",
    href: "/dashboard/marketplace",
    ringkasanBawah: "Tukar poin menjadi voucher QR di 8 UMKM Surabaya",
  },
] as const;

const collaborationTracks = [
  {
    nomor: "01",
    partner: "Komunitas & Warga Surabaya",
    status: "Pendampingan pemilahan rumah tangga",
    detail:
      "Mendampingi edukasi pemilahan botol PET, kardus, dan minyak jelantah di tingkat RT/RW serta menguji alur pelaporan titik sampah.",
  },
  {
    nomor: "02",
    partner: "Pengepul & Bank Sampah",
    status: "Uji coba rute & pencatatan timbangan",
    detail:
      "Menyelaraskan jadwal setor langsung maupun penjemputan tanpa armada baru dan menguji pencatatan berat aktual di titik kumpul.",
  },
  {
    nomor: "03",
    partner: "Pengelola Program & Mitra UMKM",
    status: "Penjajakan insentif voucher kampung",
    detail:
      "Meninjau rekap agregat partisipasi 31 kecamatan dan merumuskan skema penukaran EcoPoints di warung serta usaha warga setempat.",
  },
] as const;

export default function AboutSections() {
  const [aktifTahap, setAktifTahap] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => {
      setAktifTahap((i) => (i + 1) % depositStages.length);
    }, 5200);
    return () => clearInterval(id);
  }, [paused]);

  const tahap = depositStages[aktifTahap];

  return (
    <>
      {/* 1. Masalah di Rumah & Standar Material Awal */}
      <section
        aria-labelledby="mulai-dari-rumah-title"
        className="border-b border-emerald-900/10 bg-[#FAFDFB] px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 34, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
            className="grid gap-10 lg:grid-cols-[1.05fr_1.15fr] lg:items-start lg:gap-14"
          >
            <div>
              <h2
                id="mulai-dari-rumah-title"
                className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-5xl"
              >
                Mulai dari rumah, <br />
                pisahkan material bernilai sejak awal.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#2D5542]">
                Ketika botol plastik dan kardus bercampur dengan sisa makanan atau sampah dapur basah, nilainya cepat
                rusak dan berakhir di TPA Benowo. Memulai dari tiga material yang jelas memudahkan keluarga membangun
                kebiasaan harian sebelum diperluas ke kategori lain.
              </p>
              <div className="mt-6">
                <Link
                  href="/edukasi"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
                >
                  <span>Baca panduan pilah lengkap di Edukasi</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Tabel Standar Material Bersih & Kering */}
            <div className="overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-[0_20px_50px_-24px_rgba(15,61,46,0.12)]">
              <div className="flex items-center justify-between border-b border-emerald-900/10 bg-[#F4F9F6] px-5 py-3 text-xs">
                <span className="font-bold text-[#0F3D2E]">Standar Material Rumah Tangga</span>
                <span className="font-mono text-[11px] text-[#426352]">Bersih · Kering · Terpisah</span>
              </div>
              <div className="divide-y divide-emerald-900/10">
                {materialStandards.map((m) => (
                  <div key={m.id} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold text-[#0F3D2E] sm:text-base">{m.nama}</h3>
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#1D9E75]">
                        <Check size={14} aria-hidden="true" />
                        <span>Diterima</span>
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#426352]">{m.syarat}</p>
                    <p className="mt-2 font-mono text-xs text-[#527362]">{m.tujuan}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Tiga Peran Ekosistem (Baris Hairline Editorial) */}
      <section
        aria-labelledby="peran-ekosistem-title"
        className="border-b border-emerald-900/10 bg-white px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 34, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
            className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-end md:gap-12"
          >
            <h2
              id="peran-ekosistem-title"
              className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-5xl"
            >
              Tiga peran yang saling <br />
              menguatkan di Surabaya
            </h2>

            <p className="max-w-lg text-base leading-relaxed text-[#2D5542]">
              BONI menghubungkan pemilahan warga, jaringan pengumpulan pengepul atau bank sampah yang sudah ada, dan
              pemantauan kota tanpa membangun armada baru.
            </p>
          </motion.div>

          <div className="mt-12">
            <div className="hidden border-b border-emerald-900/15 pb-3 text-xs font-semibold text-[#527362] md:grid md:grid-cols-[220px_1.2fr_1fr] md:gap-8">
              <span>Peran Ekosistem</span>
              <span>Peran di Lapangan</span>
              <span>Ketersediaan di Aplikasi</span>
            </div>

            <ol className="divide-y divide-emerald-900/12 border-b border-emerald-900/12">
              {ecosystemRoles.map(({ nomor, peran, tugas, fitur, href, cta }, idx) => (
                <motion.li
                  key={peran}
                  initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.95, delay: idx * 0.14, ease: EASE_OUT_EXPO }}
                  className="grid gap-4 py-7 md:grid-cols-[220px_1.2fr_1fr] md:items-baseline md:gap-8"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#1D9E75]">{nomor}</span>
                    <h3 className="text-base font-bold text-[#0F3D2E]">{peran}</h3>
                  </div>

                  <p className="text-sm leading-relaxed text-[#426352]">{tugas}</p>

                  <div className="flex flex-col items-start justify-between gap-2">
                    <p className="text-sm font-medium text-[#0F3D2E]">{fitur}</p>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1 text-xs font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                    >
                      <span>{cta}</span>
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 3. Alur 4 Tahap (#rencana-setoran) — Windowed App Tema Terang Selaras */}
      <section
        id="rencana-setoran"
        aria-labelledby="rencana-setoran-title"
        className="scroll-mt-24 border-b border-emerald-900/10 bg-[#F2F8F4] px-4 py-20 text-[#0F3D2E] sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
            className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-start md:gap-12"
          >
            <h2
              id="rencana-setoran-title"
              className="text-3xl font-extrabold leading-[1.12] tracking-[-0.03em] text-[#0F3D2E] sm:text-5xl"
            >
              Empat tahap alur <br />
              dari rumah ke UMKM
            </h2>

            <div className="max-w-lg md:pt-1">
              <p className="text-base leading-relaxed text-[#2D5542] sm:text-[17px]">
                Panduan edukasi serta simulasi <strong className="font-bold text-[#0F3D2E]">Portal Warga &amp; Pemkot</strong>{" "}
                sudah dapat dicoba langsung di peramban ini, sedangkan penimbangan fisik di pengepul dan OCR timbangan
                berada pada tahap rancangan.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-6 text-sm">
                <Link
                  href="/edukasi"
                  className="group inline-flex items-center gap-1.5 font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
                >
                  <span>Buka panduan edukasi</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/#gateway"
                  className="group inline-flex items-center gap-1.5 font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Pilih portal demo</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Windowed App Frame (Titlebar + Left App Sidebar + Right App Workspace Canvas) */}
          <motion.div
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.18 }}
            transition={{ duration: 1.1, delay: 0.12, ease: EASE_OUT_EXPO }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="mt-12 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_28px_70px_-24px_rgba(15,61,46,0.18)]"
          >
            {/* Window Chrome Titlebar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/80 bg-[#F8FAF9] px-4 py-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                <span className="ml-2 rounded-md border border-neutral-200/80 bg-white px-2.5 py-0.5 font-mono text-[11px] text-neutral-500">
                  {tahap.rute}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-[11px] font-semibold text-[#1D9E75] sm:inline">
                  {tahap.status}
                </span>
                <Link
                  href={tahap.href}
                  className="font-semibold text-[#2D5F3F] transition-colors hover:text-[#0F3D2E]"
                >
                  Buka halaman →
                </Link>
              </div>
            </div>

            {/* Window App Body: Left Sidebar + Right Active Screen */}
            <div className="grid min-h-[390px] bg-[#F8FAF9] lg:grid-cols-[235px_1fr]">
              {/* Left App Sidebar */}
              <aside className="flex flex-col justify-between border-b border-neutral-200/80 bg-white p-4 lg:border-b-0 lg:border-r">
                <div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-base font-black tracking-tight text-[#0F3D2E]">BONI</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#2D5F3F]">
                      {tahap.peran}
                    </span>
                  </div>

                  {/* EcoPoints Pill inside App Sidebar */}
                  <div className="mt-3.5 flex items-center justify-between rounded-xl border border-emerald-900/10 bg-[#F0FAF4] px-3 py-2 text-xs">
                    <span className="font-medium text-[#2D5F3F]">EcoPoints</span>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={tahap.saldo}
                        initial={{ y: -6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 6, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="font-mono font-extrabold text-[#0F3D2E]"
                      >
                        {tahap.saldo} pts
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <p className="mt-4 px-1 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Alur Setoran &amp; Aksi
                  </p>

                  <nav aria-label="Tahapan aplikasi BONI" className="mt-1.5 grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">
                    {depositStages.map((s, idx) => {
                      const active = idx === aktifTahap;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setAktifTahap(idx)}
                          className={`relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                            active
                              ? "font-semibold text-[#0F3D2E]"
                              : "text-neutral-500 hover:bg-emerald-50/50 hover:text-[#0F3D2E]"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="tentang-window-sidebar-active"
                              transition={{ type: "spring", stiffness: 360, damping: 30 }}
                              className="pointer-events-none absolute inset-0 rounded-lg bg-[#E6F4EC]"
                            />
                          )}
                          <span className="relative z-10 font-mono text-[11px] font-bold text-[#1D9E75]">{s.nomor}</span>
                          <span className="relative z-10 truncate">{s.menuLabel}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="mt-4 hidden border-t border-neutral-100 pt-3 text-[11px] text-neutral-400 lg:block">
                  Kec. Wonokromo · Surabaya
                </div>
              </aside>

              {/* Right App Workspace Canvas */}
              <div className="p-5 sm:p-7">
                <AnimatePresence mode="wait" initial={false}>
                  {/* LAYAR 01: CHECKLIST KESIAPAN PILAH DARI RUMAH */}
                  {aktifTahap === 0 && (
                    <motion.div
                      key="screen-pilah"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3.5">
                        <div className="flex items-center gap-2">
                          <ClipboardCheck size={16} className="text-[#2D5F3F]" />
                          <h3 className="text-sm font-bold text-[#1A1A1A] sm:text-base">
                            Checklist Kesiapan Material Rumah Tangga
                          </h3>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#15803D]">
                          3/3 Syarat Terpenuhi
                        </span>
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-3">
                        {[
                          { label: "Botol Plastik PET (Kode 1)", berat: "1.2 kg", status: "Bersih & Diremukkan" },
                          { label: "Kardus & Karton Lipat", berat: "1.3 kg", status: "Dilipat Rata & Kering" },
                          { label: "Minyak Jelantah Saring", berat: "1.0 L", status: "Botol Tertutup Rapat" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-xl border border-neutral-200/80 bg-white p-3.5"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono text-[11px] font-bold text-[#1D9E75]">{item.berat}</span>
                              <CheckCircle2 size={14} className="text-[#15803D]" />
                            </div>
                            <p className="mt-1.5 text-xs font-bold text-[#1A1A1A]">{item.label}</p>
                            <p className="mt-1 text-[11px] text-neutral-500">{item.status}</p>
                          </div>
                        ))}
                      </div>

                      <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/80 bg-white text-xs">
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <span className="text-neutral-700">Bebas sisa makanan basah &amp; minyak dapur</span>
                          <span className="font-mono font-semibold text-[#15803D]">✓ Lolos</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <span className="text-neutral-700">Tutup botol &amp; lakban tebal sudah dilepas</span>
                          <span className="font-mono font-semibold text-[#15803D]">✓ Lolos</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <span className="text-neutral-700">Status kesiapan pengajuan setoran warga</span>
                          <span className="font-mono font-bold text-[#0F3D2E]">Siap Disetor (2.5 kg)</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* LAYAR 02: MEJA TIMBANG & RUTE MITRA PENGEPUL */}
                  {aktifTahap === 1 && (
                    <motion.div
                      key="screen-setor"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3.5">
                        <div className="flex items-center gap-2">
                          <Scale size={16} className="text-[#2D5F3F]" />
                          <h3 className="text-sm font-bold text-[#1A1A1A] sm:text-base">
                            Pencatatan Timbangan Mitra Pengepul &amp; Bank Sampah
                          </h3>
                        </div>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-amber-800">
                          Pratinjau Rancangan
                        </span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-[1.15fr_1fr]">
                        <div className="rounded-xl border border-neutral-200/80 bg-white p-4">
                          <div className="flex items-center justify-between text-xs text-neutral-500">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-[#0F3D2E]">
                              <Truck size={13} className="text-[#1D9E75]" />
                              <span>Tiket #SETOR-204</span>
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                              <MapPin size={11} className="text-[#2D5F3F]" />
                              <span>Wonokromo</span>
                            </span>
                          </div>
                          <p className="mt-2 text-xs font-bold text-[#1A1A1A]">
                            Penjemputan Rute RW 04 · Botol PET &amp; Kardus
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                            <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-[#15803D]">
                              ✓ Material Kering
                            </span>
                            <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-[#15803D]">
                              ✓ Bebas Kontaminasi
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl border border-emerald-900/15 bg-[#F0FAF4] p-4">
                          <div className="flex items-center justify-between text-[11px] text-[#426352]">
                            <span>Layar Timbangan Digital</span>
                            <span className="font-mono font-semibold text-[#15803D]">Stabil</span>
                          </div>
                          <p className="my-1 font-mono text-2xl font-extrabold tracking-tight text-[#0F3D2E]">
                            2.45 <span className="text-sm font-normal text-[#426352]">kg</span>
                          </p>
                          <p className="text-[11px] text-[#426352]">
                            1 foto memuat material + angka layar timbangan
                          </p>
                        </div>
                      </div>

                      <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/80 bg-white text-xs">
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <span className="text-neutral-700">Botol PET Bening · Berat Aktual</span>
                          <span className="font-mono font-bold text-[#0F3D2E]">1.15 kg</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <span className="text-neutral-700">Kardus Lipat Kering · Berat Aktual</span>
                          <span className="font-mono font-bold text-[#0F3D2E]">1.30 kg</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* LAYAR 03: VERIFIKASI BUKTI FOTO AI */}
                  {aktifTahap === 2 && (
                    <motion.div
                      key="screen-verifikasi"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3.5">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={16} className="text-[#2D5F3F]" />
                          <h3 className="text-sm font-bold text-[#1A1A1A] sm:text-base">
                            Verifikasi Aksi Hijau Berbasis AI &amp; Privasi EXIF
                          </h3>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#15803D]">
                          ✓ Terverifikasi · Skor 92%
                        </span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-[1.1fr_1fr]">
                        <div className="rounded-xl border border-neutral-200/80 bg-white p-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="inline-flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                              <Camera size={13} className="text-[#2D5F3F]" />
                              <span>pilah-pet-kardus.jpg</span>
                            </span>
                            <span className="font-mono text-[11px] font-semibold text-[#1D9E75]">1.5 kg</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px]">
                            <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[#0F3D2E]">
                              plastic bottle · 0.94
                            </span>
                            <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[#0F3D2E]">
                              cardboard · 0.91
                            </span>
                          </div>
                          <p className="mt-3 text-[11px] text-neutral-500">
                            Koordinat GPS rumah warga telah dihapus otomatis sebelum unggah.
                          </p>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl border border-emerald-900/15 bg-[#F0FAF4] p-4 text-xs">
                          <span className="text-[#426352]">Hasil Pemeriksaan Sistem</span>
                          <p className="my-1 text-base font-bold text-[#0F3D2E]">
                            Kategori: Pilah Sampah Rumah Tangga
                          </p>
                          <div className="flex items-center justify-between border-t border-emerald-900/10 pt-2.5">
                            <span className="text-[#426352]">Poin Diterbitkan</span>
                            <span className="font-mono font-extrabold text-[#15803D]">+40 EcoPoints</span>
                          </div>
                        </div>
                      </div>

                      <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/80 bg-white text-xs">
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <span className="text-neutral-700">Pilah Sampah · 1.5 kg · Kec. Wonokromo</span>
                          <span className="font-mono font-bold text-[#15803D]">+40 pts</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2.5">
                          <span className="text-neutral-700">Transportasi Rendah Emisi · 4 km</span>
                          <span className="font-mono font-bold text-[#15803D]">+30 pts</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* LAYAR 04: KATALOG VOUCHER UMKM & QR CODE */}
                  {aktifTahap === 3 && (
                    <motion.div
                      key="screen-hadiah"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3.5">
                        <div className="flex items-center gap-2">
                          <Gift size={16} className="text-[#2D5F3F]" />
                          <h3 className="text-sm font-bold text-[#1A1A1A] sm:text-base">
                            Pusat Hadiah &amp; Katalog Voucher UMKM Surabaya
                          </h3>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#15803D]">
                          8 Mitra UMKM Aktif
                        </span>
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-2">
                        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#2D5F3F] bg-[#F0FAF4] p-3.5 text-xs">
                          <div className="min-w-0">
                            <p className="truncate font-bold text-[#0F3D2E]">Gratis Kopi Susu (Bawa Tumbler)</p>
                            <p className="mt-0.5 truncate text-[11px] text-[#426352]">
                              Kopi Kampung Genteng · 150 pts
                            </p>
                          </div>
                          <span className="shrink-0 rounded-lg bg-emerald-100 px-2.5 py-1 font-mono text-[10px] font-bold text-[#15803D]">
                            ✓ Ditukar
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200/80 bg-white p-3.5 text-xs">
                          <div className="min-w-0">
                            <p className="truncate font-bold text-[#1A1A1A]">Paket Sayur Segar Lokal, Diskon 15%</p>
                            <p className="mt-0.5 truncate text-[11px] text-neutral-500">
                              Warung Sayur Bu Tini · 200 pts
                            </p>
                          </div>
                          <span className="shrink-0 rounded-lg bg-[#0F3D2E] px-2.5 py-1 text-[10px] font-bold text-white">
                            Tukar
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200/80 bg-white px-4 py-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <QrCode size={16} className="text-[#2D5F3F]" />
                          <div>
                            <p className="font-bold text-[#1A1A1A]">Kupon Aktif: BONI-KPG-842</p>
                            <p className="text-[11px] text-neutral-500">
                              Tunjukkan QR Code di kasir mitra UMKM tanpa kripto atau dompet rumit
                            </p>
                          </div>
                        </div>
                        <Link
                          href="/dashboard/marketplace"
                          className="inline-flex items-center gap-1 font-bold text-[#1D9E75] hover:text-[#0F3D2E]"
                        >
                          <Ticket size={13} />
                          <span>Lihat QR →</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Ringkasan 4 Tahap dengan Garis Hairline Terbuka di Bawah Windowed App */}
          <ol className="mt-10 grid border-y border-emerald-900/15 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-emerald-900/15">
            {depositStages.map((s, idx) => {
              const active = idx === aktifTahap;
              return (
                <li
                  key={s.id}
                  onClick={() => setAktifTahap(idx)}
                  className={`cursor-pointer border-b border-emerald-900/12 py-6 transition-opacity last:border-b-0 sm:px-6 sm:first:pl-0 sm:last:pr-0 lg:border-b-0 ${
                    active ? "opacity-100" : "opacity-55 hover:opacity-95"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#1D9E75]">{s.nomor}</span>
                    <span className="text-[11px] text-[#527362]">{s.status}</span>
                  </div>
                  <h3 className="mt-2.5 text-base font-bold text-[#0F3D2E]">{s.judul}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#426352]">{s.ringkasanBawah}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4. Peluang Kolaborasi & Kontak (#kolaborasi) */}
      <section id="kolaborasi" aria-labelledby="kolaborasi-title" className="scroll-mt-24 bg-[#FAFDFB] px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 34, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
            className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-end md:gap-12"
          >
            <h2
              id="kolaborasi-title"
              className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-5xl"
            >
              Kolaborasi bertahap <br />
              sesuai peran di lapangan
            </h2>

            <div className="max-w-lg">
              <p className="text-base leading-relaxed text-[#2D5542]">
                Status di bawah mencerminkan kesiapan uji coba prototipe saat ini—kemitraan operasional ditetapkan
                bertahap bersama pihak yang bersedia menguji di lapangan.
              </p>
              <div className="mt-4">
                <Link
                  href="/kontak"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
                >
                  <span>Hubungi tim BONI melalui halaman Kontak</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="mt-14 grid border-y border-emerald-900/12 md:grid-cols-3 md:divide-x md:divide-emerald-900/12">
            {collaborationTracks.map(({ nomor, partner, status, detail }, idx) => (
              <motion.article
                key={partner}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.95, delay: idx * 0.14, ease: EASE_OUT_EXPO }}
                className="border-b border-emerald-900/10 py-8 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#1D9E75]">{nomor}</span>
                  <span className="font-medium text-[#527362]">{status}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#0F3D2E]">{partner}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#426352]">{detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
