"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { teamConfig } from "@/config/site";
import { TeamFanSection } from "@/components/ui/team-fan";
import { useVideoPlayer } from "@/components/common/GlobalVideoPlayer";
import {
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Gift,
  MapPin,
  Play,
  QrCode,
  Scale,
  ShieldCheck,
  Ticket,
  Truck,
} from "lucide-react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleCode({ code, active }: { code: string; active: boolean }) {
  const [display, setDisplay] = useState(() =>
    code.replace(/[A-Z0-9]/g, "•")
  );

  useEffect(() => {
    if (!active) {
      setDisplay(code.replace(/[A-Z0-9]/g, "•"));
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(code);
      return;
    }

    let frame = 0;
    const totalFrames = 18;
    const id = setInterval(() => {
      frame += 1;
      const lockedCount = Math.floor((frame / totalFrames) * code.length);
      const next = code
        .split("")
        .map((ch, idx) => {
          if (ch === "-") return "-";
          if (idx < lockedCount) return ch;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      setDisplay(next);
      if (frame >= totalFrames) {
        clearInterval(id);
        setDisplay(code);
      }
    }, 45);

    return () => clearInterval(id);
  }, [active, code]);

  return (
    <span className="font-mono tracking-tight text-[#0F3D2E]" aria-label={code}>
      {display}
    </span>
  );
}

const materialStandards = [
  {
    id: "pet",
    nama: "Botol Plastik PET (Kode 1)",
    unit: "+40 EcoPoints",
    syarat: "Kosongkan sisa cairan, bilas singkat jika lengket, lalu remukkan sebelum disetor ke pengepul atau diunggah di Aksi Hijau.",
  },
  {
    id: "kardus",
    nama: "Kardus & Karton Lipat",
    unit: "Timbang per kg",
    syarat: "Lipat rata dan lepaskan lakban berlebih. Pastikan tetap kering serta bebas dari noda minyak maupun sisa makanan.",
  },
  {
    id: "jelantah",
    nama: "Minyak Jelantah Rumah Tangga",
    unit: "+50 EcoPoints",
    syarat: "Saring ampas penggorengan dan simpan di jeriken atau botol tertutup rapat untuk disetor ke titik pengumpulan warga.",
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
  const [showMaterialUnit, setShowMaterialUnit] = useState(false);
  const [stageStep, setStageStep] = useState(0);
  const { isPlaying: isVideoPlaying, startVideo, registerSlot } = useVideoPlayer();
  const [videoExpanded, setVideoExpanded] = useState(false);
  const flowFrameRef = useRef<HTMLDivElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const isFlowInView = useInView(flowFrameRef, { once: true, amount: 0.25 });
  const isVideoInView = useInView(videoStageRef, { once: true, amount: 0.8 });

  useEffect(() => {
    registerSlot(videoStageRef.current);
    return () => registerSlot(null);
  }, [registerSlot]);

  useEffect(() => {
    if (!isVideoInView) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVideoExpanded(true);
      return;
    }
    const timer = setTimeout(() => setVideoExpanded(true), 1250);
    return () => clearTimeout(timer);
  }, [isVideoInView]);

  useEffect(() => {
    if (!isFlowInView) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStageStep(3);
      return;
    }
    setStageStep(0);
    const t1 = setTimeout(() => setStageStep(1), 650);
    const t2 = setTimeout(() => setStageStep(2), 1550);
    const t3 = setTimeout(() => setStageStep(3), 2450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [aktifTahap, isFlowInView]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowMaterialUnit(true);
      return;
    }
    const id = setInterval(() => {
      setShowMaterialUnit((prev) => !prev);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isFlowInView) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setTimeout(() => {
      setAktifTahap((i) => (i + 1) % depositStages.length);
    }, 4000);
    return () => clearTimeout(id);
  }, [aktifTahap, isFlowInView]);

  const tahap = depositStages[aktifTahap];

  return (
    <>
      {/* 1. Masalah di Rumah & Standar Material Awal */}
      <section
        id="standar-material"
        aria-labelledby="mulai-dari-rumah-title"
        className="scroll-mt-20 bg-gradient-to-b from-[#FAFDFB] via-[#FAFDFB] via-[82%] to-[#F1F8F4] px-4 py-20 sm:px-6 sm:py-28"
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

            {/* Tabel Standar Kondisi Material */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-[0_20px_50px_-24px_rgba(15,61,46,0.12)]"
            >
              <div className="flex items-center justify-between border-b border-emerald-900/10 bg-[#F4F9F6] px-5 py-3.5 text-xs">
                <span className="font-bold text-[#0F3D2E]">Standar Kondisi Material</span>
                <span className="text-[#527362]">3 kategori awal rumah tangga</span>
              </div>
              <div className="divide-y divide-emerald-900/10">
                {materialStandards.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.12 + idx * 0.1, ease: EASE_OUT_EXPO }}
                    className="p-5"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-sm font-bold text-[#0F3D2E] sm:text-base">{m.nama}</h3>
                      <div className="relative flex h-5 min-w-[116px] shrink-0 items-center justify-end overflow-hidden">
                        <AnimatePresence mode="wait" initial={false}>
                          {showMaterialUnit ? (
                            <motion.span
                              key="unit"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.32, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                              className="inline-flex items-center text-xs font-semibold text-[#1D9E75]"
                            >
                              {m.unit}
                            </motion.span>
                          ) : (
                            <motion.span
                              key="accepted"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.32, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D9E75]"
                            >
                              <Check size={13} aria-hidden="true" />
                              <span>Diterima</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#426352]">{m.syarat}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Tiga Peran Ekosistem (Baris Hairline Editorial) */}
      <section
        id="peran-ekosistem"
        aria-labelledby="peran-ekosistem-title"
        className="scroll-mt-20 bg-gradient-to-b from-[#F1F8F4] via-[#F6FBF8] via-[82%] to-[#EAF4EE] px-4 py-20 sm:px-6 sm:py-28"
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
        className="scroll-mt-20 bg-gradient-to-b from-[#EAF4EE] via-[#EFF7F2] via-[82%] to-[#FAFDFB] px-4 py-20 text-[#0F3D2E] sm:px-6 sm:py-28"
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
            ref={flowFrameRef}
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.18 }}
            transition={{ duration: 1.1, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="mt-12 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_28px_70px_-24px_rgba(15,61,46,0.18)]"
          >
            {/* Window Chrome Titlebar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/80 bg-[#F8FAF9] px-4 py-2.5 text-xs">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-neutral-200" />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-neutral-200" />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-neutral-200" />
                <span className="ml-2 max-w-[175px] truncate rounded-md border border-neutral-200/80 bg-white px-2.5 py-0.5 font-mono text-[11px] text-neutral-500 sm:max-w-none">
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

                  <nav aria-label="Tahapan aplikasi BONI" className="mt-1.5 grid grid-cols-2 gap-1.5 lg:grid-cols-1 lg:gap-1">
                    {depositStages.map((s, idx) => {
                      const active = idx === aktifTahap;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setAktifTahap(idx)}
                          className={`relative flex items-start gap-2 rounded-lg px-2.5 py-2 text-left text-xs leading-snug transition-colors lg:items-center lg:gap-2.5 ${
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
                          <span className="relative z-10 shrink-0 font-mono text-[11px] font-bold text-[#1D9E75]">{s.nomor}</span>
                          <span className="relative z-10 min-w-0 break-words">{s.menuLabel}</span>
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
                        <motion.span
                          key={stageStep}
                          initial={{ scale: 0.92, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 380, damping: 24 }}
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold transition-colors duration-300 ${
                            stageStep >= 3
                              ? "bg-emerald-50 text-[#15803D]"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {stageStep}/3 Syarat Terpenuhi
                        </motion.span>
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-3">
                        {[
                          { label: "Botol Plastik PET (Kode 1)", berat: "1.2 kg", status: "Bersih & Diremukkan" },
                          { label: "Kardus & Karton Lipat", berat: "1.3 kg", status: "Dilipat Rata & Kering" },
                          { label: "Minyak Jelantah Saring", berat: "1.0 L", status: "Botol Tertutup Rapat" },
                        ].map((item, idx) => {
                          const checked = stageStep > idx;
                          return (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.55, delay: idx * 0.16, ease: EASE_OUT_EXPO }}
                              className={`rounded-xl border p-3.5 transition-colors duration-500 ${
                                checked
                                  ? "border-emerald-900/15 bg-white"
                                  : "border-neutral-200/70 bg-neutral-50/60"
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-mono text-[11px] font-bold text-[#1D9E75]">{item.berat}</span>
                                <motion.span
                                  initial={false}
                                  animate={{
                                    scale: checked ? 1 : 0.72,
                                    opacity: checked ? 1 : 0.22,
                                  }}
                                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                >
                                  <CheckCircle2
                                    size={14}
                                    className={checked ? "text-[#15803D]" : "text-neutral-300"}
                                  />
                                </motion.span>
                              </div>
                              <p className="mt-1.5 text-xs font-bold text-[#1A1A1A]">{item.label}</p>
                              <p className="mt-1 text-[11px] text-neutral-500">{item.status}</p>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/80 bg-white text-xs">
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: stageStep >= 1 ? 1 : 0.45, x: 0 }}
                          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                          className="flex items-center justify-between px-4 py-2.5"
                        >
                          <span className="text-neutral-700">Bebas sisa makanan basah &amp; minyak dapur</span>
                          <motion.span
                            animate={{ scale: stageStep >= 1 ? 1 : 0.9, opacity: stageStep >= 1 ? 1 : 0.35 }}
                            transition={{ type: "spring", stiffness: 380, damping: 24 }}
                            className="font-mono font-semibold text-[#15803D]"
                          >
                            ✓ Lolos
                          </motion.span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: stageStep >= 2 ? 1 : 0.45, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.08, ease: EASE_OUT_EXPO }}
                          className="flex items-center justify-between px-4 py-2.5"
                        >
                          <span className="text-neutral-700">Tutup botol &amp; lakban tebal sudah dilepas</span>
                          <motion.span
                            animate={{ scale: stageStep >= 2 ? 1 : 0.9, opacity: stageStep >= 2 ? 1 : 0.35 }}
                            transition={{ type: "spring", stiffness: 380, damping: 24 }}
                            className="font-mono font-semibold text-[#15803D]"
                          >
                            ✓ Lolos
                          </motion.span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: stageStep >= 3 ? 1 : 0.55, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.14, ease: EASE_OUT_EXPO }}
                          className="flex items-center justify-between px-4 py-2.5"
                        >
                          <span className="text-neutral-700">Status kesiapan pengajuan setoran warga</span>
                          <motion.span
                            animate={{ scale: stageStep >= 3 ? [1, 1.04, 1] : 1 }}
                            transition={{ duration: 0.35 }}
                            className={`font-mono font-bold transition-colors duration-300 ${
                              stageStep >= 3 ? "text-[#0F3D2E]" : "text-neutral-400"
                            }`}
                          >
                            {stageStep >= 3 ? "Siap Disetor (2.5 kg)" : "Memeriksa..."}
                          </motion.span>
                        </motion.div>
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
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                          className="rounded-xl border border-neutral-200/80 bg-white p-4"
                        >
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
                            <motion.span
                              animate={{ opacity: stageStep >= 1 ? 1 : 0.3, scale: stageStep >= 1 ? 1 : 0.94 }}
                              transition={{ type: "spring", stiffness: 280, damping: 22 }}
                              className="rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-[#15803D]"
                            >
                              ✓ Material Kering
                            </motion.span>
                            <motion.span
                              animate={{ opacity: stageStep >= 2 ? 1 : 0.3, scale: stageStep >= 2 ? 1 : 0.94 }}
                              transition={{ type: "spring", stiffness: 280, damping: 22 }}
                              className="rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-[#15803D]"
                            >
                              ✓ Bebas Kontaminasi
                            </motion.span>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.12, ease: EASE_OUT_EXPO }}
                          className="flex flex-col justify-between rounded-xl border border-emerald-900/15 bg-[#F0FAF4] p-4"
                        >
                          <div className="flex items-center justify-between text-[11px] text-[#426352]">
                            <span>Layar Timbangan Digital</span>
                            <motion.span
                              key={stageStep >= 3 ? "stabil" : "menimbang"}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                              className={`font-mono font-semibold ${
                                stageStep >= 3 ? "text-[#15803D]" : "text-amber-700"
                              }`}
                            >
                              {stageStep >= 3 ? "Stabil" : "Menimbang..."}
                            </motion.span>
                          </div>
                          <motion.p
                            key={stageStep >= 2 ? "2.45" : stageStep >= 1 ? "1.15" : "0.00"}
                            initial={{ opacity: 0.5, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 280, damping: 24 }}
                            className="my-1 font-mono text-2xl font-extrabold tracking-tight text-[#0F3D2E]"
                          >
                            {stageStep >= 2 ? "2.45" : stageStep >= 1 ? "1.15" : "0.00"}{" "}
                            <span className="text-sm font-normal text-[#426352]">kg</span>
                          </motion.p>
                          <p className="text-[11px] text-[#426352]">
                            1 foto memuat material + angka layar timbangan
                          </p>
                        </motion.div>
                      </div>

                      <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/80 bg-white text-xs">
                        <motion.div
                          animate={{ opacity: stageStep >= 1 ? 1 : 0.4, x: 0 }}
                          initial={{ opacity: 0.4, x: -6 }}
                          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                          className="flex items-center justify-between px-4 py-2.5"
                        >
                          <span className="text-neutral-700">Botol PET Bening · Berat Aktual</span>
                          <span className="font-mono font-bold text-[#0F3D2E]">
                            {stageStep >= 1 ? "1.15 kg" : "—"}
                          </span>
                        </motion.div>
                        <motion.div
                          animate={{ opacity: stageStep >= 2 ? 1 : 0.4, x: 0 }}
                          initial={{ opacity: 0.4, x: -6 }}
                          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                          className="flex items-center justify-between px-4 py-2.5"
                        >
                          <span className="text-neutral-700">Kardus Lipat Kering · Berat Aktual</span>
                          <span className="font-mono font-bold text-[#0F3D2E]">
                            {stageStep >= 2 ? "1.30 kg" : "—"}
                          </span>
                        </motion.div>
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
                        <motion.span
                          key={stageStep >= 3 ? "verified" : "checking"}
                          initial={{ scale: 0.92, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 320, damping: 24 }}
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold transition-colors duration-300 ${
                            stageStep >= 3
                              ? "bg-emerald-50 text-[#15803D]"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {stageStep >= 3 ? "✓ Terverifikasi · Skor 92%" : "Memeriksa EXIF & AI..."}
                        </motion.span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-[1.1fr_1fr]">
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                          className="rounded-xl border border-neutral-200/80 bg-white p-4"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="inline-flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                              <Camera size={13} className="text-[#2D5F3F]" />
                              <span>pilah-pet-kardus.jpg</span>
                            </span>
                            <span className="font-mono text-[11px] font-semibold text-[#1D9E75]">1.5 kg</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px]">
                            <motion.span
                              animate={{ opacity: stageStep >= 1 ? 1 : 0.25, scale: stageStep >= 1 ? 1 : 0.94 }}
                              transition={{ type: "spring", stiffness: 280, damping: 22 }}
                              className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[#0F3D2E]"
                            >
                              plastic bottle · 0.94
                            </motion.span>
                            <motion.span
                              animate={{ opacity: stageStep >= 2 ? 1 : 0.25, scale: stageStep >= 2 ? 1 : 0.94 }}
                              transition={{ type: "spring", stiffness: 280, damping: 22 }}
                              className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[#0F3D2E]"
                            >
                              cardboard · 0.91
                            </motion.span>
                          </div>
                          <motion.p
                            animate={{ opacity: stageStep >= 1 ? 1 : 0.45 }}
                            transition={{ duration: 0.35 }}
                            className="mt-3 text-[11px] text-neutral-500"
                          >
                            Koordinat GPS rumah warga telah dihapus otomatis sebelum unggah.
                          </motion.p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.12, ease: EASE_OUT_EXPO }}
                          className="flex flex-col justify-between rounded-xl border border-emerald-900/15 bg-[#F0FAF4] p-4 text-xs"
                        >
                          <span className="text-[#426352]">Hasil Pemeriksaan Sistem</span>
                          <motion.p
                            animate={{ opacity: stageStep >= 2 ? 1 : 0.45 }}
                            transition={{ duration: 0.35 }}
                            className="my-1 text-base font-bold text-[#0F3D2E]"
                          >
                            {stageStep >= 2 ? "Kategori: Pilah Sampah Rumah Tangga" : "Mencocokkan kategori..."}
                          </motion.p>
                          <div className="flex items-center justify-between border-t border-emerald-900/10 pt-2.5">
                            <span className="text-[#426352]">Poin Diterbitkan</span>
                            <motion.span
                              animate={{ scale: stageStep >= 3 ? [1, 1.06, 1] : 1, opacity: stageStep >= 3 ? 1 : 0.4 }}
                              transition={{ duration: 0.35 }}
                              className="font-mono font-extrabold text-[#15803D]"
                            >
                              {stageStep >= 3 ? "+40 EcoPoints" : "Menghitung..."}
                            </motion.span>
                          </div>
                        </motion.div>
                      </div>

                      <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/80 bg-white text-xs">
                        <motion.div
                          animate={{ opacity: stageStep >= 1 ? 1 : 0.4 }}
                          transition={{ duration: 0.35 }}
                          className="flex items-center justify-between px-4 py-2.5"
                        >
                          <span className="text-neutral-700">Pilah Sampah · 1.5 kg · Kec. Wonokromo</span>
                          <span className="font-mono font-bold text-[#15803D]">+40 pts</span>
                        </motion.div>
                        <motion.div
                          animate={{ opacity: stageStep >= 2 ? 1 : 0.4 }}
                          transition={{ duration: 0.35 }}
                          className="flex items-center justify-between px-4 py-2.5"
                        >
                          <span className="text-neutral-700">Transportasi Rendah Emisi · 4 km</span>
                          <span className="font-mono font-bold text-[#15803D]">+30 pts</span>
                        </motion.div>
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
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                          className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 text-xs transition-colors duration-500 ${
                            stageStep >= 1
                              ? "border-[#2D5F3F] bg-[#F0FAF4]"
                              : "border-neutral-200/80 bg-white"
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="font-bold leading-snug text-[#0F3D2E]">Gratis Kopi Susu (Bawa Tumbler)</p>
                            <p className="mt-0.5 text-[11px] leading-snug text-[#426352]">
                              Kopi Kampung Genteng · 150 pts
                            </p>
                          </div>
                          <motion.span
                            key={stageStep >= 1 ? "ditukar" : "tukar"}
                            initial={{ scale: 0.9, opacity: 0.7 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 320, damping: 24 }}
                            className={`shrink-0 rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold transition-colors duration-300 ${
                              stageStep >= 1
                                ? "bg-emerald-100 text-[#15803D]"
                                : "bg-[#0F3D2E] text-white"
                            }`}
                          >
                            {stageStep >= 1 ? "✓ Ditukar" : "Tukar"}
                          </motion.span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.14, ease: EASE_OUT_EXPO }}
                          className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200/80 bg-white p-3.5 text-xs"
                        >
                          <div className="min-w-0">
                            <p className="font-bold leading-snug text-[#1A1A1A]">Paket Sayur Segar Lokal, Diskon 15%</p>
                            <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">
                              Warung Sayur Bu Tini · 200 pts
                            </p>
                          </div>
                          <span className="shrink-0 rounded-lg bg-[#0F3D2E] px-2.5 py-1 text-[10px] font-bold text-white">
                            Tukar
                          </span>
                        </motion.div>
                      </div>

                      <motion.div
                        animate={{
                          opacity: stageStep >= 2 ? 1 : 0.35,
                          y: stageStep >= 2 ? 0 : 8,
                          borderColor: stageStep >= 3 ? "rgba(29, 158, 117, 0.35)" : "rgba(229, 229, 229, 0.8)",
                        }}
                        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <motion.span
                            animate={{ scale: stageStep >= 2 ? 1 : 0.8 }}
                            transition={{ type: "spring", stiffness: 320, damping: 22 }}
                          >
                            <QrCode size={16} className="text-[#2D5F3F]" />
                          </motion.span>
                          <div>
                            <p className="font-bold text-[#1A1A1A]">
                              Kupon Aktif: <ScrambleCode code="BONI-KPG-842" active={stageStep >= 2} />
                            </p>
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
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Ringkasan 4 Tahap dengan Garis Hairline Terbuka di Bawah Windowed App */}
          <ol className="mt-10 grid border-y border-emerald-900/15 sm:grid-cols-2 lg:grid-cols-4">
            {depositStages.map((s, idx) => {
              const active = idx === aktifTahap;
              const mobileBorder = idx < depositStages.length - 1 ? "border-b border-emerald-900/12" : "";
              const smBorder = idx < 2 ? "sm:border-b sm:border-emerald-900/12" : "sm:border-b-0";
              const smCols =
                idx % 2 === 1
                  ? "sm:border-l sm:border-emerald-900/15 sm:pl-6 sm:pr-0"
                  : "sm:pl-0 sm:pr-6";
              const lgCols = [
                "lg:border-b-0 lg:px-6",
                idx > 0 ? "lg:border-l lg:border-emerald-900/15" : "lg:pl-0",
                idx === depositStages.length - 1 ? "lg:pr-0" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <li
                  key={s.id}
                  onClick={() => setAktifTahap(idx)}
                  className={`cursor-pointer py-6 ${mobileBorder} ${smBorder} ${smCols} ${lgCols}`}
                >
                  <div className={`transition-opacity duration-200 ${active ? "opacity-100" : "opacity-55 hover:opacity-95"}`}>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-[#1D9E75]">{s.nomor}</span>
                      <span className="text-[11px] text-[#527362]">{s.status}</span>
                    </div>
                    <h3 className="mt-2.5 text-base font-bold text-[#0F3D2E]">{s.judul}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#426352]">{s.ringkasanBawah}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4. Peluang Kolaborasi & Kontak (#kolaborasi) */}
      <section id="kolaborasi" aria-labelledby="kolaborasi-title" className="scroll-mt-20 bg-[#FAFDFB] px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28">
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
                className="border-b border-emerald-900/10 py-8 last:border-b-0 md:border-b-0 md:px-5 md:first:pl-0 md:last:pr-0 lg:px-7"
              >
                <div className="flex items-start justify-between gap-3 text-xs">
                  <span className="shrink-0 font-mono font-bold text-[#1D9E75]">{nomor}</span>
                  <span className="text-right font-medium leading-snug text-[#527362]">{status}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#0F3D2E]">{partner}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#426352]">{detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Video Pengenalan BONI (gaya editorial Vercel Enterprise, sebelum section kutipan) */}
      <section
        id="video-boni"
        aria-labelledby="video-boni-title"
        className="scroll-mt-24 bg-gradient-to-b from-[#FAFDFB] via-[#F4FAF6] via-[18%] to-[#FAFDFB] px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          >
            {/* Baris Atas: Judul Display di Kiri + Narasi di Kanan */}
            <div className="grid gap-6 md:grid-cols-12 md:items-start md:gap-12">
              <div className="md:col-span-6">
                <h2
                  id="video-boni-title"
                  className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[#0F3D2E] sm:text-5xl"
                >
                  Gambaran singkat <br />
                  ekosistem BONI
                </h2>
              </div>
              <div className="md:col-span-6 md:pt-1">
                <p className="max-w-lg text-sm leading-relaxed text-[#2D5542] sm:text-base">
                  Lihat bagaimana kebiasaan pilah sampah dari rumah terhubung langsung dengan verifikasi foto berbasis
                  AI, rute pengumpulan warga, dan penukaran voucher di UMKM lokal Surabaya.
                </p>
              </div>
            </div>

            {/* Tengah: Stage Video dengan animasi lingkaran Play naik lalu meluas membuka thumbnail */}
            <div ref={videoStageRef} className="relative mt-10 aspect-video w-full sm:mt-12">
              {isVideoPlaying ? (
                <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0A2315] shadow-[0_32px_80px_-32px_rgba(15,61,46,0.28)]" />
              ) : (
                <button
                  type="button"
                  onClick={startVideo}
                  aria-label="Putar video pengenalan ekosistem BONI"
                  className="group relative flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
                >
                  {/* Thumbnail meluas dari lingkaran tengah */}
                  <motion.div
                    initial={{ clipPath: "circle(36px at 50% 50%)", opacity: 0 }}
                    animate={
                      videoExpanded
                        ? { clipPath: "circle(100% at 50% 50%)", opacity: 1 }
                        : { clipPath: "circle(36px at 50% 50%)", opacity: 0 }
                    }
                    transition={{
                      clipPath: { duration: 1.45, ease: EASE_OUT_EXPO },
                      opacity: { duration: 0.75, ease: EASE_OUT_EXPO },
                    }}
                    className="absolute inset-0 overflow-hidden rounded-2xl bg-[#0A2315] shadow-[0_32px_80px_-32px_rgba(15,61,46,0.28)]"
                  >
                    <Image
                      src="https://i.ytimg.com/vi/ZrTQqDXzVYQ/hqdefault.jpg"
                      alt="Pratinjau video pengenalan ekosistem BONI"
                      fill
                      unoptimized
                      className="scale-[1.14] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.17]"
                    />
                  </motion.div>

                  {/* Lingkaran Play muncul pelan dari bawah terlebih dahulu */}
                  <motion.span
                    initial={{ y: 160, opacity: 0, scale: 0.85 }}
                    animate={
                      isVideoInView
                        ? { y: 0, opacity: 1, scale: 1 }
                        : { y: 160, opacity: 0, scale: 0.85 }
                    }
                    transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#0F3D2E] shadow-2xl ring-8 ring-white/25 transition-colors duration-300 group-hover:scale-105 group-hover:bg-[#1D9E75] group-hover:text-white sm:h-20 sm:w-20"
                  >
                    <Play size={26} className="ml-1 fill-current" aria-hidden="true" />
                  </motion.span>
                </button>
              )}
            </div>

            {/* Baris Bawah: 3 Highlight Metrik Ekosistem (gaya Enterprise) */}
            <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-4xl">31</p>
                <p className="mt-1 text-sm font-bold text-[#0F3D2E]">Kecamatan Surabaya</p>
                <p className="mt-2 text-xs leading-relaxed text-[#426352] sm:text-sm">
                  Pemantauan agregat aksi bersih warga dan titik laporan sampah lintas wilayah kota.
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-4xl">5</p>
                <p className="mt-1 text-sm font-bold text-[#0F3D2E]">Kategori Aksi Hijau</p>
                <p className="mt-2 text-xs leading-relaxed text-[#426352] sm:text-sm">
                  Pilah sampah, jelantah, tanam pohon, hemat energi, dan transportasi rendah emisi.
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-4xl">8+</p>
                <p className="mt-1 text-sm font-bold text-[#0F3D2E]">Mitra UMKM Lokal</p>
                <p className="mt-2 text-xs leading-relaxed text-[#426352] sm:text-sm">
                  Penukaran EcoPoints langsung menjadi voucher belanja di warung serta usaha kampung.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Tim Pengembang BONI (Hero10 fanned portrait layout, sebelum section kutipan) */}
      <TeamFanSection
        id="tim-pengembang"
        title="Di balik ekosistem"
        titleLine2Prefix="Tim"
        titleHighlight={teamConfig.teamName}
        description={`Dirancang dan dibangun oleh tim ${teamConfig.teamName} dari ${teamConfig.institution}.`}
        footnote={`${teamConfig.institutionShort} · Tim Pengembang BONI`}
        animation="subtle"
        members={teamConfig.members.map((name) => {
          if (name === "Muhammad Ananda Hariadi") {
            return {
              name,
              role: `Tim ${teamConfig.teamName}`,
              image: "/images/team-ananda.png",
              mascot: {
                image: "/images/mascot-ananda.png",
                style: {
                  left: "-8%",
                  top: "-30%",
                  width: "66.31%",
                  height: "61.13%",
                },
              },
            };
          }
          if (name === "Firzan Syaroni") {
            return {
              name,
              role: `Tim ${teamConfig.teamName}`,
              image: "/images/team-firzan.png",
              popoutBox: {
                left: "-29.88%",
                top: "-39%",
                width: "139%",
                height: "162.82%",
                clipBottom: "25%",
              },
              mascot: {
                image: "/images/mascot-firzan.png",
                style: {
                  left: "37%",
                  top: "-22%",
                  width: "59.61%",
                  height: "59.7%",
                },
              },
            };
          }
          if (name === "Moch. Refi Febrian Alfani") {
            return {
              name,
              role: `Tim ${teamConfig.teamName}`,
              image: "/images/team-refi.png",
              popoutBox: {
                left: "-33%",
                top: "-67%",
                width: "176%",
                height: "210%",
                topOnlyPopout: true,
              },
              mascot: {
                image: "/images/mascot-refi.png",
                style: {
                  left: "56%",
                  top: "-26%",
                  width: "66.27%",
                  height: "60.61%",
                },
              },
            };
          }
          return {
            name,
            role: `Tim ${teamConfig.teamName}`,
          };
        })}
      />

      {/* 7. Kutipan Gerakan Warga Surabaya (paling bawah sebelum footer) */}
      <section
        aria-label="Semangat gerakan pilah dari rumah"
        className="bg-[#FAFDFB] px-6 pb-16 pt-20 text-center sm:pb-20 sm:pt-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
          className="mx-auto max-w-[920px]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1D9E75]">
            BERSAMA WARGA SURABAYA
          </p>
          <blockquote className="mt-6 text-2xl font-semibold leading-[1.22] tracking-[-0.03em] text-[#0F3D2E] sm:text-[32px] lg:text-[36px]">
            “Perubahan kota yang bersih tidak menunggu dari langkah yang besar, ia tumbuh dari satu botol terpilah dan satu aksi hijau yang kita mulai dari rumah.”
          </blockquote>
          <p className="mt-8 text-[13px] tracking-[-0.01em] text-[#527362]">
            <strong className="font-semibold text-[#0F3D2E]">Tim BONI</strong>
            <span className="ml-2.5">
              Gerakan Pilah Sampah &amp; Aksi Hijau Warga Surabaya
            </span>
          </p>
        </motion.div>
      </section>
    </>
  );
}
