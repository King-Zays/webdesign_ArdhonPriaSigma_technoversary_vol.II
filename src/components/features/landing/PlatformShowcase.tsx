"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gift,
  ImagePlus,
  ShieldCheck,
  Ticket,
  Trophy,
} from "lucide-react";
import { GreenActionIcon } from "@/components/common/icons";

/**
 * Section hijau gelap full-screen dengan carousel sliding kiri-kanan mulus
 * (infinite 3-copy track dengan CSS transition + silent wrap) serta animasi
 * mikro step-by-step di dalam tiap kartu layaknya Linear.
 */

function WindowControls() {
  return (
    <div aria-hidden="true" className="flex items-center gap-2.5 font-mono text-[11px] text-white/30">
      <span>−</span>
      <span>↗</span>
      <span>×</span>
    </div>
  );
}

interface SlideItem {
  id: string;
  label: string;
  render: (isActive: boolean, phase: number) => ReactNode;
}

const SLIDES: SlideItem[] = [
  {
    id: "dashboard",
    label: "Dashboard Warga",
    render: (isActive, phase) => {
      const updated = isActive && phase >= 1;
      const doneChallenge = isActive && phase === 2;
      const saldo = doneChallenge ? 550 : 500;
      const totalAksi = updated ? 3 : 2;

      return (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-white">BONI · Warga</span>
            </div>
            <WindowControls />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/[0.07] bg-white/[0.035] p-3">
              <p className="text-[10px] text-emerald-200/60">Saldo EcoPoints</p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={saldo}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-lg font-extrabold text-emerald-300"
                  >
                    {saldo}
                  </motion.span>
                </AnimatePresence>
                {doneChallenge && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-mono text-[10px] font-semibold text-[#7AC74F]"
                  >
                    +50
                  </motion.span>
                )}
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-white/[0.035] p-3">
              <p className="text-[10px] text-emerald-200/60">Aksi Terverifikasi</p>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={totalAksi}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-0.5 text-lg font-extrabold text-white"
                >
                  {totalAksi}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Sort-at-Home Challenge</span>
              <span className="font-mono text-[11px] text-emerald-300">
                {doneChallenge ? "3/3 Selesai" : "2/3"}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={false}
                animate={{ width: doneChallenge ? "100%" : "66%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-emerald-400"
              />
            </div>
          </div>

          <div className="divide-y divide-white/[0.05] overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs text-emerald-100/75">
            <AnimatePresence initial={false}>
              {updated && (
                <motion.div
                  key="new-jelantah"
                  initial={{ opacity: 0, height: 0, backgroundColor: "rgba(29,158,117,0.22)" }}
                  animate={{ opacity: 1, height: "auto", backgroundColor: "rgba(29,158,117,0.08)" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between px-3 py-2.5"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="rounded bg-emerald-400/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-emerald-300">
                      Baru
                    </span>
                    <span className="truncate text-white">Setor Jelantah · 1 L</span>
                  </div>
                  <span className="font-mono font-semibold text-emerald-300">+50 pts</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center justify-between px-3 py-2.5">
              <span>Pilah Sampah · 1.5 kg</span>
              <span className="font-mono text-emerald-300">+40 pts</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2.5">
              <span>Transportasi Rendah Emisi</span>
              <span className="font-mono text-emerald-300">+30 pts</span>
            </div>
            {!updated && (
              <div className="flex items-center justify-between px-3 py-2.5">
                <span>Jaringan Komunitas RW</span>
                <span className="font-mono text-emerald-200/60">Aktif</span>
              </div>
            )}
          </div>
        </>
      );
    },
  },
  {
    id: "eco-action",
    label: "Verifikasi Aksi",
    render: (isActive, phase) => {
      const stepPhase = isActive ? phase : 0;

      return (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck size={14} className="text-emerald-300" />
              <span className="font-semibold text-white">Verifikasi Aksi Hijau Berbasis AI</span>
            </div>
            <WindowControls />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/55">
              1. Pilih Kategori Aksi
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                { type: "waste_sorting" as const, title: "Pilah Sampah", pts: "+40 pts", active: true },
                { type: "used_cooking_oil" as const, title: "Jelantah", pts: "+50 pts", active: false },
                { type: "tree_planting" as const, title: "Tanam Pohon", pts: "+80 pts", active: false },
              ].map((item) => (
                <div
                  key={item.type}
                  className={` rounded-lg border p-2.5 text-left transition-colors duration-300 ${
                    item.active
                      ? "border-emerald-400/55 bg-emerald-500/15"
                      : "border-white/[0.07] bg-white/[0.03]"
                  }`}
                >
                  <GreenActionIcon type={item.type} size={16} />
                  <p className="mt-1.5 text-[11px] font-bold text-white">{item.title}</p>
                  <p className="text-[10px] font-semibold text-emerald-300">{item.pts}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/55">
              2. Unggah & Periksa Foto Bukti
            </p>
            <div className="mt-2 min-h-[78px] rounded-lg border border-dashed border-emerald-400/35 bg-white/[0.02] px-3 py-3 text-center">
              <AnimatePresence mode="wait" initial={false}>
                {stepPhase === 0 && (
                  <motion.div
                    key="upload-idle"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#1D9E75] px-2.5 py-1 text-[11px] font-semibold text-white">
                        <Camera size={12} />
                        <span>Ambil Foto</span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-emerald-100">
                        <ImagePlus size={12} />
                        <span>Pilih dari Galeri</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-200/45">
                      JPG, PNG, WebP · Metadata GPS dibersihkan otomatis
                    </p>
                  </motion.div>
                )}

                {stepPhase === 1 && (
                  <motion.div
                    key="upload-scanning"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-col justify-center gap-2 text-left"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-emerald-200">pilah-botol-pet.jpg · 1.5 kg</span>
                      <span className="font-mono text-[10px] text-amber-300">Memeriksa...</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: "12%" }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-[#7AC74F]"
                      />
                    </div>
                    <p className="text-[10px] text-emerald-200/55">
                      Mencocokkan kategori Pilah Sampah & menghapus EXIF GPS...
                    </p>
                  </motion.div>
                )}

                {stepPhase === 2 && (
                  <motion.div
                    key="upload-verified"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center justify-between gap-2 rounded-md bg-emerald-500/15 px-2.5 py-2 text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 size={15} className="shrink-0 text-[#7AC74F]" />
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-bold text-white">
                          Bukti Sesuai · Botol PET & Kardus
                        </p>
                        <p className="truncate text-[10px] text-emerald-200/70">
                          Metadata lokasi GPS telah dibersihkan
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded bg-[#1D9E75] px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                      +40 pts
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-emerald-200/60">Riwayat Aksi Hijau</p>
            <div className="mt-2 divide-y divide-white/[0.05] rounded-lg border border-white/[0.07] bg-[#081A10] text-xs">
              <div
                className={`flex items-center justify-between px-3.5 py-2.5 transition-colors duration-300 ${
                  stepPhase === 2 ? "bg-emerald-500/10" : ""
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Terverifikasi
                  </span>
                  <span className="truncate text-emerald-100/85">Pilah Sampah · 1.5 kg</span>
                </div>
                <span className="shrink-0 font-mono font-semibold text-emerald-300">+40 poin</span>
              </div>
              <div className="flex items-center justify-between px-3.5 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Terverifikasi
                  </span>
                  <span className="truncate text-emerald-100/85">Transportasi · 4 km</span>
                </div>
                <span className="shrink-0 font-mono font-semibold text-emerald-300">+30 poin</span>
              </div>
            </div>
          </div>
        </>
      );
    },
  },
  {
    id: "marketplace",
    label: "Pusat Hadiah",
    render: (isActive, phase) => {
      const stepPhase = isActive ? phase : 0;
      const redeemed = stepPhase === 2;
      const processing = stepPhase === 1;
      const points = redeemed || processing ? 350 : 500;

      return (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Gift size={14} className="text-emerald-300" />
              <span className="font-semibold text-white">Pusat Hadiah & Prestasi</span>
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={points}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 6, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-emerald-300"
              >
                {points} EcoPoints
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 gap-1 rounded-lg border border-white/[0.07] bg-white/[0.03] p-1 text-center text-[10px]">
            <span className="rounded bg-white/[0.12] py-1 font-semibold text-white">Tukar Kupon UMKM</span>
            <span className="py-1 text-emerald-100/60">Papan Peringkat</span>
            <span className="inline-flex items-center justify-center gap-1 py-1 text-emerald-100/60">
              <Trophy size={10} />
              <span>Lencana</span>
            </span>
          </div>

          <div className="space-y-2">
            <div
              className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-xs transition-colors duration-300 ${
                redeemed
                  ? "border-emerald-400/50 bg-emerald-500/15"
                  : "border-white/[0.07] bg-white/[0.035]"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">Gratis Kopi Susu (Bawa Tumbler)</p>
                <p className="truncate text-[10px] text-emerald-200/60">Kopi Kampung Genteng · 150 pts</p>
              </div>
              <span
                className={`shrink-0 rounded px-2 py-1 text-[10px] font-bold transition-all duration-200 ${
                  redeemed
                    ? "bg-emerald-400/20 text-[#7AC74F]"
                    : processing
                      ? "scale-95 bg-amber-500/30 text-amber-200"
                      : "bg-[#1D9E75] text-white"
                }`}
              >
                {redeemed ? "✓ Aktif" : processing ? "Memproses" : "Tukar"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-2.5 text-xs">
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">Paket Sayur Segar Lokal, Diskon 15%</p>
                <p className="truncate text-[10px] text-emerald-200/60">Warung Sayur Bu Tini · 200 pts</p>
              </div>
              <span className="shrink-0 rounded bg-[#1D9E75] px-2 py-1 text-[10px] font-bold text-white">Tukar</span>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-2.5 text-xs">
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">Sabun Batang Olahan Jelantah</p>
                <p className="truncate text-[10px] text-emerald-200/60">Sabun Jelantah Tambaksari · 180 pts</p>
              </div>
              <span className="shrink-0 rounded bg-[#1D9E75] px-2 py-1 text-[10px] font-bold text-white">Tukar</span>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={redeemed ? "qr-ready" : "qr-idle"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-xs ${
                redeemed
                  ? "border-emerald-400/40 bg-emerald-500/15"
                  : "border-white/[0.07] bg-[#081A10]"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Ticket size={13} className="shrink-0 text-emerald-300" />
                <span className="truncate text-emerald-100/90">
                  {redeemed ? "Kode: BONI-KPG-842 · Siap Pindai QR" : "Kupon terbit dengan QR Code"}
                </span>
              </div>
              <Link href="/login?role=warga" className="shrink-0 font-semibold text-emerald-300 hover:text-white">
                Buka →
              </Link>
            </motion.div>
          </AnimatePresence>
        </>
      );
    },
  },
  {
    id: "gov",
    label: "Portal Pemkot",
    render: (isActive, phase) => {
      const stepPhase = isActive ? phase : 0;
      const wonokromoStatus = stepPhase === 2 ? "Selesai" : "Ditindaklanjuti";
      const semampirStatus = stepPhase >= 1 ? "Ditindaklanjuti" : "Menunggu";
      const selesaiCount = stepPhase === 2 ? 3 : 2;

      const rows = [
        { nama: "Wonokromo", status: wonokromoStatus },
        { nama: "Semampir", status: semampirStatus },
        { nama: "Tambaksari", status: "Selesai" },
        { nama: "Rungkut", status: "Ditindaklanjuti" },
        { nama: "Bubutan", status: "Selesai" },
      ];

      return (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-amber-300/80" />
              <span className="font-semibold text-white/90">Portal Pemkot · DLH</span>
            </div>
            <WindowControls />
          </div>

          <div className="divide-y divide-white/[0.06] rounded-lg border border-white/[0.07] bg-white/[0.03] text-xs">
            <div className="flex items-center justify-between px-3 py-2 text-[11px] text-emerald-200/65">
              <span>Kecamatan</span>
              <span>Tiket Laporan</span>
            </div>
            {rows.map((r) => {
              const tone =
                r.status === "Selesai"
                  ? "text-emerald-300"
                  : r.status === "Ditindaklanjuti"
                    ? "text-amber-300"
                    : "text-sky-300";
              return (
                <div key={r.nama} className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-white">{r.nama}</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={r.status}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.22 }}
                      className={`font-mono ${tone}`}
                    >
                      {r.status === "Selesai" ? "✓ Selesai" : r.status}
                    </motion.span>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-[#081A10] px-3.5 py-2.5 text-xs">
            <span className="text-emerald-200/70">Rekap Penanganan Wilayah</span>
            <span className="font-mono text-emerald-300">{selesaiCount}/5 laporan tuntas</span>
          </div>
        </>
      );
    },
  },
];

// 3 salinan agar animasi geser ke kiri maupun ke kanan selalu berputar mulus tanpa batas
const TRACK_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES];
const N = SLIDES.length;

export default function PlatformShowcase() {
  // Indeks di salinan tengah (4..7). Default 5 = Verifikasi Aksi di tengah-kiri
  const [trackIdx, setTrackIdx] = useState(N + 1);
  const [animated, setAnimated] = useState(true);
  const [phase, setPhase] = useState(0);

  const activeIndex = ((trackIdx % N) + N) % N;

  function step(delta: number) {
    setAnimated(true);
    setPhase(0);
    setTrackIdx((i) => i + delta);
  }

  function jumpTo(targetIdx: number) {
    const diff = targetIdx - activeIndex;
    setAnimated(true);
    setPhase(0);
    setTrackIdx((i) => i + diff);
  }

  // Animasi internal sekali jalan (0 -> 1 -> 2) per box, lalu otomatis lanjut ke box berikutnya tanpa ngeloop
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 2900);
    const tNext = setTimeout(() => {
      setAnimated(true);
      setTrackIdx((i) => i + 1);
    }, 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tNext);
    };
  }, [activeIndex]);

  // Setelah animasi selesai, reset diam-diam ke salinan tengah (4..7) jika sudah keluar batas
  useEffect(() => {
    if (trackIdx >= N && trackIdx < 2 * N) return;
    const t = setTimeout(() => {
      setAnimated(false);
      setTrackIdx(((trackIdx % N) + N) % N + N);
    }, 1140);
    return () => clearTimeout(t);
  }, [trackIdx]);

  // Nyalakan kembali transition setelah silent snap selesai
  useEffect(() => {
    if (animated) return;
    const raf = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  // Lebar kartu desktop 370px + gap 20px = 390px per langkah; geser 1 kartu ke kanan agar slot [trackIdx-1] di pinggir kiri
  const stepPx = 390;
  const shiftPx = (trackIdx - 1) * stepPx;

  return (
    <section className="relative isolate flex min-h-[min(calc(100svh-5rem),820px)] flex-col justify-end overflow-hidden border-b border-white/10 bg-[#081C11] pt-16 pb-0 text-white sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(29,158,117,0.14)_0%,transparent_75%)]"
      />

      {/* Header + Carousel Controls */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        <div className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-start md:gap-12">
          <h2 className="text-3xl font-extrabold leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl">
            Dari pilah di rumah <br />
            hingga voucher kampung
          </h2>

          <div className="max-w-lg md:pt-1">
            <p className="text-base leading-relaxed text-emerald-100/75 sm:text-[17px]">
              Setiap layar di aplikasi BONI dirancang agar kebiasaan bersih warga langsung tercatat lewat verifikasi
              foto, terpantau per kecamatan, dan dapat ditukarkan di UMKM sekitar.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/login?role=warga"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-200/80 transition-colors hover:text-white"
              >
                <span>Buka aplikasi warga</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              {/* Carousel Navigation Bar */}
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-1.5 sm:flex">
                  {SLIDES.map((s, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => jumpTo(idx)}
                        aria-label={`Tampilkan ${s.label}`}
                        className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                          isActive ? "w-7 bg-white/20" : "w-1.5 bg-white/25 hover:bg-white/45"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            key={activeIndex}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: 5.4,
                              ease: "linear",
                            }}
                            style={{ transformOrigin: "left" }}
                            className="block h-full w-full rounded-full bg-[#7AC74F]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                <span className="ml-1 font-mono text-xs text-emerald-200/70">
                  {String(activeIndex + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Geser ke kiri"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-all hover:scale-105 hover:bg-white/[0.12] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AC74F]"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Geser ke kanan"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-all hover:scale-105 hover:bg-white/[0.12] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AC74F]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sliding Carousel Track (countdown tetap berjalan meski di-hover) */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.15, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-10 overflow-hidden sm:mt-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-[#081C11] via-[#081C11]/85 to-transparent"
        />

        {/* Mobile Sliding Track (< 768px) */}
        <div className="overflow-hidden px-4 pb-8 md:hidden">
          <div
            className="flex transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {SLIDES.map((s, idx) => (
              <div key={s.id} className="w-full shrink-0 px-0.5">
                <div className="rounded-t-2xl bg-gradient-to-b from-white/[0.20] via-white/[0.07] to-transparent pt-px px-px">
                  <div className="flex min-h-[380px] flex-col gap-4 rounded-t-[15px] bg-gradient-to-b from-[#0C2618] via-[#0A2115] to-[#081C11] p-5 pb-16">
                    {s.render(idx === activeIndex, phase)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Sliding 4-Card Window with Alpha Mask (>= 768px) */}
        <div className="mx-auto hidden w-full max-w-[1440px] md:block [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)]">
          <div className="relative left-1/2 w-[1540px] -translate-x-1/2 overflow-hidden">
            <div
              className={`flex min-h-[470px] gap-5 motion-reduce:transition-none xl:min-h-[500px] ${
                animated ? "transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
              }`}
              style={{ transform: `translateX(-${shiftPx}px)` }}
            >
              {TRACK_SLIDES.map((slide, idx) => {
                const isCenter = idx === trackIdx || idx === trackIdx + 1;
                const delta = idx - trackIdx;
                return (
                  <div
                    key={`${slide.id}-${idx}`}
                    onClick={() => !isCenter && step(delta > 1 ? 1 : -1)}
                    className={`w-[370px] shrink-0 rounded-t-2xl pt-px px-px ${
                      animated ? "transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
                    } ${
                      isCenter
                        ? "translate-y-0 scale-100 opacity-100 bg-gradient-to-b from-white/[0.22] via-white/[0.08] to-transparent shadow-[0_-18px_48px_-20px_rgba(122,199,79,0.16)]"
                        : "translate-y-3 scale-[0.96] opacity-70 cursor-pointer bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent hover:translate-y-1 hover:opacity-95 hover:from-white/[0.22]"
                    }`}
                  >
                    <div
                      className={`flex h-full flex-col gap-4 rounded-t-[15px] p-6 pb-20 ${
                        isCenter
                          ? "bg-gradient-to-b from-[#0C2618] via-[#0A2115] to-[#081C11]"
                          : "bg-gradient-to-b from-[#0B2316] via-[#0A2014] to-[#081C11]"
                      }`}
                    >
                      {slide.render(isCenter, phase)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
