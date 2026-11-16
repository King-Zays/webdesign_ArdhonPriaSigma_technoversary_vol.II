"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  FileCode2,
  ListChecks,
} from "lucide-react";
import LinearRuleColumns, { type LinearRuleTopic } from "./LinearRuleColumns";

type VerificationWindowKey = "queue" | "spec";

const AUTO_SWITCH_MS = 4800;

interface QueueTicket {
  id: string;
  title: string;
  tone: "emerald" | "amber" | "muted";
  tag: string;
}

interface QueueGroup {
  status: string;
  count: number;
  dotColor: string;
  items: QueueTicket[];
}

const QUEUE_GROUPS: QueueGroup[] = [
  {
    status: "Dalam Verifikasi",
    count: 3,
    dotColor: "text-[#1D9E75]",
    items: [
      {
        id: "VRF-01",
        title: "PET kode 1 & angka layar 3.45 kg dalam 1 frame",
        tone: "emerald",
        tag: "AI-01",
      },
      {
        id: "VRF-02",
        title: "Pembacaan berat aktual timbangan digital (OCR)",
        tone: "emerald",
        tag: "AI-02",
      },
      {
        id: "VRF-03",
        title: "Cek ketajaman, pencahayaan, & hash SHA-256",
        tone: "emerald",
        tag: "AI-03/04",
      },
    ],
  },
  {
    status: "Perlu Tinjauan",
    count: 2,
    dotColor: "text-amber-500",
    items: [
      {
        id: "VRF-04",
        title: "Foto timbangan buram atau tertutup bayangan",
        tone: "amber",
        tag: "Cek Ulang",
      },
      {
        id: "VRF-05",
        title: "Pengepul & admin lakukan verifikasi fisik manual",
        tone: "amber",
        tag: "Lapangan",
      },
    ],
  },
  {
    status: "Siap Dikonversi",
    count: 2,
    dotColor: "text-[#426352]",
    items: [
      {
        id: "VRF-06",
        title: "Uji verifikasi foto 5 Aksi Hijau di Portal Warga",
        tone: "muted",
        tag: "Demo Aktif",
      },
      {
        id: "VRF-07",
        title: "Siapkan konversi poin ke voucher UMKM mitra",
        tone: "muted",
        tag: "Rancangan",
      },
    ],
  },
];

interface SpecDiffLine {
  num: string;
  leftText: string;
  rightText: string;
  tone: "neutral" | "removed" | "added" | "dim";
}

const SPEC_DIFF_LINES: SpecDiffLine[] = [
  {
    num: "01",
    leftText: "frame: '1_bingkai_utuh'",
    rightText: "status: 'rancangan_setoran'",
    tone: "dim",
  },
  {
    num: "02",
    leftText: "resolusi_min >= 320px",
    rightText: "exif_lokasi: dihapus_otomatis",
    tone: "dim",
  },
  {
    num: "03",
    leftText: "- material & timbangan difoto terpisah",
    rightText: "- ditolak: wajib 1 frame sama",
    tone: "removed",
  },
  {
    num: "04",
    leftText: "+ PET kode 1 / kardus tampak utuh di pelat",
    rightText: "+ lolos_ai_01: jenis_material",
    tone: "added",
  },
  {
    num: "05",
    leftText: "- angka layar buram / tertutup bayangan",
    rightText: "- ditahan: tinjauan_manual",
    tone: "removed",
  },
  {
    num: "06",
    leftText: "+ angka digital 3.45 kg terbaca tajam",
    rightText: "+ lolos_ai_02: ocr_timbangan",
    tone: "added",
  },
  {
    num: "07",
    leftText: "hash: sha256(berkas_foto)",
    rightText: "anti_duplikasi: aktif",
    tone: "neutral",
  },
  {
    num: "08",
    leftText: "fallback: cek_fisik_pengepul()",
    rightText: "uji_demo: '/login?role=warga'",
    tone: "neutral",
  },
];

const FEATURE_COL_1: LinearRuleTopic[] = [
  {
    id: "one-frame",
    label: "1 Bingkai Timbang",
    summary:
      "Material terpilah dan angka layar timbangan digital wajib terekam jelas dalam satu foto yang sama.",
  },
  {
    id: "ai-screening",
    label: "Penyaringan AI (01–04)",
    summary:
      "Membantu memeriksa jenis material, membaca angka timbangan (OCR), ketajaman foto, dan indikasi duplikasi.",
  },
  {
    id: "accept-reject",
    label: "Aturan Layak vs Tinjau",
    summary:
      "Foto yang buram, terpotong, atau diambil terpisah otomatis diarahkan ke pemeriksaan manual tanpa langsung gagal permanen.",
  },
];

const FEATURE_COL_2: LinearRuleTopic[] = [
  {
    id: "sha256-hash",
    label: "Pemeriksaan Hash SHA-256",
    summary:
      "Setiap berkas foto diperiksa sidik jarinya agar foto transaksi yang sama tidak diajukan berulang kali.",
  },
  {
    id: "manual-fallback",
    label: "Cek Fisik Pengepul",
    summary:
      "AI hanya menjadi penyaring awal; pengepul mitra dan admin tetap memeriksa fisik material di lapangan.",
  },
  {
    id: "active-demo",
    label: "Demo Aksi Hijau Aktif",
    summary:
      "Sambil menunggu alur setoran pengepul aktif, verifikasi foto 5 kebiasaan hijau sudah bisa dicoba langsung di Portal Warga.",
  },
];

/**
 * Showcase `#setelah-ditimbang` menyamai 1:1 mekanisme Switch Card 3D & tombol
 * `MaterialShowcaseStage.tsx` / `PlanningAndRouteStage.tsx`:
 * - Segmented glide switch (Antrean Verifikasi | Aturan Foto & Diff)
 * - Auto-switch halus (4,8 detik, terjeda hanya saat kursor menyentuh area kartu)
 * - Stepper `01/02 < >` pada jendela depan & indikator dot progres di bawah deck.
 */
export default function VerificationShowcaseStage() {
  const [frontWindow, setFrontWindow] = useState<VerificationWindowKey>("spec");
  const [isStageHovered, setIsStageHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const hasEnteredView = useInView(stageRef, { once: true, amount: 0.2 });

  const isQueueFront = frontWindow === "queue";
  const autoSwitchPaused =
    Boolean(shouldReduceMotion) || !hasEnteredView || isStageHovered;

  useEffect(() => {
    if (autoSwitchPaused) return;
    const id = setTimeout(() => {
      setFrontWindow((prev) => (prev === "spec" ? "queue" : "spec"));
    }, AUTO_SWITCH_MS);
    return () => clearTimeout(id);
  }, [autoSwitchPaused, frontWindow]);

  function switchTo(target: VerificationWindowKey) {
    setFrontWindow(target);
  }

  function toggleWindow() {
    switchTo(frontWindow === "spec" ? "queue" : "spec");
  }

  const windowsOrder: { key: VerificationWindowKey; label: string }[] = [
    { key: "queue", label: "Antrean Verifikasi" },
    { key: "spec", label: "Aturan Foto & Diff" },
  ];

  return (
    <div>
      {/* Clean 2-Segment Gliding Switch matching MaterialShowcaseStage & PlanningAndRouteStage */}
      <div className="mb-5 flex justify-end">
        <div
          role="tablist"
          aria-label="Pilih tampilan spesifikasi verifikasi"
          className="inline-flex w-fit items-center gap-1 rounded-2xl border border-emerald-950/10 bg-white p-1 shadow-[inset_0_1px_2px_rgba(15,61,46,0.05)]"
        >
          {windowsOrder.map(({ key, label }) => {
            const isSelected = frontWindow === key;
            const Icon = key === "queue" ? ListChecks : FileCode2;

            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => switchTo(key)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] ${
                  isSelected
                    ? "text-white"
                    : "text-[#426352] hover:text-[#0F3D2E]"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="verification-segmented-active"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.01 }
                        : { type: "spring", stiffness: 360, damping: 30 }
                    }
                    className="absolute inset-0 rounded-xl bg-[#0F3D2E] shadow-sm shadow-[#0F3D2E]/20"
                  />
                )}

                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <Icon
                    size={13}
                    className={isSelected ? "text-[#6EE7B7]" : "text-[#1D9E75]"}
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overlapping Two-Window Linear Stage with Hover-Only Pause & Bottom Dots */}
      <div
        ref={stageRef}
        onMouseEnter={() => setIsStageHovered(true)}
        onMouseLeave={() => setIsStageHovered(false)}
      >
        <div
          className="relative min-h-[415px] w-full overflow-hidden rounded-2xl pt-2 [--qa-x:0%] [--qb-back-x:8%] [--qb-front-x:8%] md:min-h-[380px] md:[--qa-x:5%] md:[--qb-back-x:53%] md:[--qb-front-x:51%]"
          style={{ perspective: 1200 }}
        >
        {/* Window A: Left Verification Queue / Status List (mirrors Linear "In Review / In Progress / Todo") */}
        <motion.div
          initial={false}
          animate={{
            x: isQueueFront ? "var(--qa-x)" : "0%",
            y: isQueueFront ? 0 : 26,
            scale: isQueueFront ? 1 : 0.94,
            opacity: isQueueFront ? 1 : 0.76,
            zIndex: isQueueFront ? 20 : 10,
          }}
          whileHover={
            isQueueFront || shouldReduceMotion
              ? undefined
              : { y: 20, opacity: 0.94 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 230, damping: 26, mass: 0.9 }
          }
          style={{ transformOrigin: "top left" }}
          onClick={isQueueFront ? undefined : () => switchTo("queue")}
          role={isQueueFront ? undefined : "button"}
          tabIndex={isQueueFront ? undefined : 0}
          aria-label={
            isQueueFront
              ? undefined
              : "Tampilkan kartu Antrean Verifikasi ke depan"
          }
          onKeyDown={
            isQueueFront
              ? undefined
              : (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    switchTo("queue");
                  }
                }
          }
          className={`absolute left-0 top-0 w-[92%] rounded-2xl border p-4 transition-shadow duration-300 sm:p-5 md:w-[58%] ${
            isQueueFront
              ? "border-emerald-950/15 bg-white shadow-[0_28px_64px_-20px_rgba(15,61,46,0.22)]"
              : "cursor-pointer border-emerald-950/10 bg-[#FAFDFB] shadow-[0_14px_32px_-18px_rgba(15,61,46,0.16)]"
          }`}
        >
          <div className="mb-3 flex items-center justify-between border-b border-emerald-950/[0.07] pb-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0F3D2E]">
              <ListChecks size={13} className="text-[#1D9E75]" aria-hidden="true" />
              <span>antrean-verifikasi</span>
            </span>
            {isQueueFront ? (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold tabular-nums text-[#426352]/75">
                  01/02
                </span>
                <button
                  type="button"
                  onClick={toggleWindow}
                  aria-label="Lihat tampilan sebelumnya"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-950/12 bg-[#FAFDFB] text-[#0F3D2E] transition-colors hover:border-[#1D9E75]/40 hover:bg-[#EFF8F3]"
                >
                  <ChevronLeft size={13} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={toggleWindow}
                  aria-label="Lihat tampilan berikutnya"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-950/12 bg-[#FAFDFB] text-[#0F3D2E] transition-colors hover:border-[#1D9E75]/40 hover:bg-[#EFF8F3]"
                >
                  <ChevronRight size={13} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <span className="text-[11px] font-semibold text-[#1D9E75]">
                Klik kartu →
              </span>
            )}
          </div>

          <div className="space-y-3.5 text-xs">
            {QUEUE_GROUPS.map((group) => (
              <div key={group.status}>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className={`inline-flex items-center ${group.dotColor}`}>
                    {group.status === "Dalam Verifikasi" ? (
                      <CheckCircle2 size={12} aria-hidden="true" />
                    ) : group.status === "Perlu Tinjauan" ? (
                      <Clock size={12} aria-hidden="true" />
                    ) : (
                      <Circle size={11} aria-hidden="true" />
                    )}
                  </span>
                  <span className="text-[11.5px] font-bold text-[#0F3D2E]">
                    {group.status}
                  </span>
                  <span className="font-mono text-[11px] text-[#527362]">
                    {group.count}
                  </span>
                </div>

                <div className="space-y-1 pl-1">
                  {group.items.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[11.5px] hover:bg-[#F2F8F4]/70"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="shrink-0 font-mono text-[10.5px] text-[#527362]">
                          {ticket.id}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            ticket.tone === "emerald"
                              ? "bg-[#1D9E75]"
                              : ticket.tone === "amber"
                                ? "bg-amber-500"
                                : "bg-emerald-950/25"
                          }`}
                        />
                        <span className="truncate font-medium text-[#0F3D2E]">
                          {ticket.title}
                        </span>
                      </div>
                      <span className="shrink-0 whitespace-nowrap rounded border border-emerald-950/[0.08] bg-[#FAFDFB] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#426352]">
                        {ticket.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Window B: Right Diff / Spec Inspection Window (mirrors Linear code/diff panel) */}
        <motion.div
          initial={false}
          animate={{
            x: isQueueFront ? "var(--qb-back-x)" : "var(--qb-front-x)",
            y: isQueueFront ? 26 : 0,
            scale: isQueueFront ? 0.94 : 1,
            opacity: isQueueFront ? 0.76 : 1,
            zIndex: isQueueFront ? 10 : 20,
          }}
          whileHover={
            !isQueueFront || shouldReduceMotion
              ? undefined
              : { y: 20, opacity: 0.94 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 230, damping: 26, mass: 0.9 }
          }
          style={{ transformOrigin: "top right" }}
          onClick={!isQueueFront ? undefined : () => switchTo("spec")}
          role={!isQueueFront ? undefined : "button"}
          tabIndex={!isQueueFront ? undefined : 0}
          aria-label={
            !isQueueFront
              ? undefined
              : "Tampilkan kartu Aturan Foto dan Diff ke depan"
          }
          onKeyDown={
            !isQueueFront
              ? undefined
              : (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    switchTo("spec");
                  }
                }
          }
          className={`absolute left-0 top-0 w-[92%] overflow-hidden rounded-2xl border transition-shadow duration-300 md:w-[66%] ${
            !isQueueFront
              ? "border-emerald-950/15 bg-white shadow-[0_28px_64px_-20px_rgba(15,61,46,0.24)]"
              : "cursor-pointer border-emerald-950/10 bg-[#FAFDFB] shadow-[0_14px_32px_-18px_rgba(15,61,46,0.16)]"
          }`}
        >
          {/* Diff Window Chrome Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-emerald-950/[0.08] bg-[#F7FBF9] px-4 py-2.5 text-xs">
            <div className="flex min-w-0 items-center gap-2">
              <FileCode2
                size={13}
                className="shrink-0 text-[#1D9E75]"
                aria-hidden="true"
              />
              <span className="truncate text-[11px] font-bold text-[#0F3D2E]">
                boni-verifikasi/foto-timbangan.spec
              </span>
            </div>

            {!isQueueFront ? (
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="text-[11px] font-semibold tabular-nums text-[#426352]/75">
                  02/02
                </span>
                <button
                  type="button"
                  onClick={toggleWindow}
                  aria-label="Lihat tampilan sebelumnya"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-950/12 bg-white text-[#0F3D2E] transition-colors hover:border-[#1D9E75]/40 hover:bg-[#EFF8F3]"
                >
                  <ChevronLeft size={13} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={toggleWindow}
                  aria-label="Lihat tampilan berikutnya"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-950/12 bg-white text-[#0F3D2E] transition-colors hover:border-[#1D9E75]/40 hover:bg-[#EFF8F3]"
                >
                  <ChevronRight size={13} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <span className="shrink-0 text-[11px] font-semibold text-[#1D9E75]">
                Klik kartu →
              </span>
            )}
          </div>

          {/* 2-Column Diff/Inspection Code Lines (matching Linear diff view) */}
          <div className="divide-y divide-emerald-950/[0.04] py-2 font-mono text-[11px] leading-relaxed">
            {SPEC_DIFF_LINES.map((line) => {
              const rowBg =
                line.tone === "removed"
                  ? "bg-rose-500/[0.08] text-rose-950"
                  : line.tone === "added"
                    ? "bg-emerald-500/[0.11] text-[#0F3D2E]"
                    : line.tone === "dim"
                      ? "text-[#426352]/65"
                      : "text-[#0F3D2E]";

              const statusBadgeColor =
                line.tone === "removed"
                  ? "text-rose-700"
                  : line.tone === "added"
                    ? "text-[#15803D] font-semibold"
                    : "text-[#426352]/80";

              return (
                <div
                  key={line.num}
                  className={`grid grid-cols-[26px_1fr] gap-2 px-3.5 py-1.5 sm:grid-cols-[26px_1.35fr_1fr] sm:px-4 ${rowBg}`}
                >
                  <span className="select-none text-[10px] tabular-nums text-[#527362]/55">
                    {line.num}
                  </span>
                  <span className="truncate font-medium">{line.leftText}</span>
                  <span
                    className={`hidden truncate sm:block ${statusBadgeColor}`}
                  >
                    {line.rightText}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

          {/* Soft bottom dissolve vignette matching Linear "Build, review, and ship" */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-20 bg-gradient-to-t from-[#F2F8F4] via-[#F2F8F4]/75 to-transparent"
          />
        </div>

        {/* Bottom Carousel Dots Indicator matching MaterialShowcaseStage & PlanningAndRouteStage */}
        <div
          role="tablist"
          aria-label="Navigasi titik jendela verifikasi"
          className="mt-4 flex items-center justify-center gap-2"
        >
          {windowsOrder.map(({ key, label }) => {
            const isActive = frontWindow === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Tampilkan kartu ${label}`}
                onClick={() => switchTo(key)}
                className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] ${
                  isActive
                    ? "w-8 bg-[#0F3D2E]/15"
                    : "w-2 bg-emerald-950/20 hover:bg-[#1D9E75]/60"
                }`}
              >
                {isActive && (
                  <motion.span
                    key={`${frontWindow}-${autoSwitchPaused ? "paused" : "run"}`}
                    initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                    animate={{
                      scaleX: shouldReduceMotion ? 1 : autoSwitchPaused ? 0.35 : 1,
                    }}
                    transition={
                      shouldReduceMotion || autoSwitchPaused
                        ? { duration: 0.2 }
                        : { duration: AUTO_SWITCH_MS / 1000, ease: "linear" }
                    }
                    style={{ transformOrigin: "left" }}
                    className="block h-full w-full rounded-full bg-[#1D9E75]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom 3-Column Feature Strip (mirrors Linear "Features | 3 + 3 expandable items") */}
      <LinearRuleColumns
        defaultOpenId="one-frame"
        leftColumn={
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-[#0F3D2E]">
              Pemeriksaan &amp; Validasi
            </p>
            <p className="text-xs leading-relaxed text-[#426352]">
              Kombinasi 1 bingkai foto timbang, penyaringan AI, cek hash SHA-256, dan pemeriksaan fisik mitra.
            </p>
          </div>
        }
        col1={FEATURE_COL_1}
        col2={FEATURE_COL_2}
      />
    </div>
  );
}
