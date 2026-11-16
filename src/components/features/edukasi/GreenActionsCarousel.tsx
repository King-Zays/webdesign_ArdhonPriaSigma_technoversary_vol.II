"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import {
  EVIDENCE_RULES,
  GREEN_ACTION_LIST,
  type GreenActionDefinition,
} from "@/config/green-actions";

const maxSizeMb = Math.round(EVIDENCE_RULES.maxBytes / (1024 * 1024));
const N = GREEN_ACTION_LIST.length;
const TRACK_SLIDES = [...GREEN_ACTION_LIST, ...GREEN_ACTION_LIST, ...GREEN_ACTION_LIST];
const AUTO_SWITCH_MS = 4500;
const PHASE_STEP_MS = 1500;

interface EvidenceSpecItem {
  id: string;
  label: string;
  summary: string;
  detail: string;
}

const EVIDENCE_SPECS_COL_1: EvidenceSpecItem[] = [
  {
    id: "format",
    label: "Format & Ukuran",
    summary: `JPEG/PNG/WebP · maks. ${maxSizeMb} MB`,
    detail: `Sistem menerima foto JPEG, PNG, atau WebP hingga ${maxSizeMb} MB per pengajuan.`,
  },
  {
    id: "resolution",
    label: "Resolusi Minimum",
    summary: `Min. ${EVIDENCE_RULES.minDimension}px`,
    detail: `Dimensi terpendek minimal ${EVIDENCE_RULES.minDimension}px agar bukti aksi terbaca jelas.`,
  },
];

const EVIDENCE_SPECS_COL_2: EvidenceSpecItem[] = [
  {
    id: "timing",
    label: "Usia Foto & Jeda",
    summary: `Maks. ${EVIDENCE_RULES.maxEvidenceAgeHours} jam · jeda ${EVIDENCE_RULES.minIntervalSeconds} detik`,
    detail: `Foto maksimal berusia ${EVIDENCE_RULES.maxEvidenceAgeHours} jam dengan jeda ${EVIDENCE_RULES.minIntervalSeconds} detik antar pengiriman.`,
  },
  {
    id: "hash",
    label: "Pemeriksaan Duplikasi",
    summary: "Hash SHA-256",
    detail: "Setiap berkas diperiksa dengan hash SHA-256 agar foto yang sama tidak diunggah ulang.",
  },
];

function GreenActionCardSurface({
  action,
  isLead,
  isCentered,
  phase,
  reducedMotion,
}: {
  action: GreenActionDefinition;
  isLead: boolean;
  isCentered: boolean;
  phase: number;
  reducedMotion: boolean;
}) {
  const highlightEvidence = isLead && phase >= 1;

  return (
    <article
      className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-colors duration-300 ${
        isCentered ? "bg-white" : "bg-[#F7FBF9]"
      } ${
        isLead
          ? "border-[#1D9E75]/25 shadow-[0_22px_48px_-20px_rgba(29,158,117,0.18)]"
          : isCentered
            ? "border-emerald-950/[0.12] shadow-[0_20px_42px_-20px_rgba(15,61,46,0.14)]"
            : "border-emerald-950/[0.08]"
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: action.color }}
              aria-hidden="true"
            />
            <h3 className="truncate text-[13.5px] font-bold leading-snug text-[#0F3D2E] sm:text-sm">
              {action.labelId}
            </h3>
          </div>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-[#F0FAF4] px-2.5 py-0.5 text-[10.5px] font-bold tabular-nums text-[#0F3D2E]">
            +{action.ecoPoints} EcoPoints
          </span>
        </div>

        {/* Inset evidence requirement panel with live focus highlight */}
        <motion.div
          animate={{ x: highlightEvidence ? 2 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
          className={`mt-3.5 rounded-xl border p-3.5 transition-colors duration-300 ${
            highlightEvidence
              ? "border-[#1D9E75]/35 bg-[#EFF8F3]"
              : "border-emerald-950/[0.06] bg-[#FAFDFB]"
          }`}
        >
          <p className="text-xs leading-relaxed text-[#2D4F3E]">
            {action.evidenceRequirement}
          </p>
        </motion.div>

        {/* Subtle status line */}
        <p className="mt-3 text-[11px] font-medium leading-relaxed text-[#4D6D5B]">
          Demo aktif · {action.impactMetric}
        </p>
      </div>

      {/* Structured bottom metadata rows */}
      <div className="mt-4 space-y-2 border-t border-emerald-950/[0.06] pt-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-[#4D6D5B]">Batas demo</span>
          <span className="font-semibold tabular-nums text-[#0F3D2E]">
            Maks. {action.dailyLimit}×/hari
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="shrink-0 font-medium text-[#4D6D5B]">SDGs</span>
          <div className="flex flex-wrap justify-end gap-1">
            {action.sdgs.map((goal) => (
              <span
                key={goal}
                className="rounded-md border border-emerald-950/[0.08] bg-[#FAFDFB] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[#0F3D2E]"
              >
                SDG {goal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Infinite-loop horizontal carousel untuk 5 kategori Aksi Hijau (`#aksi-hijau`)
 * dengan switch otomatis, pause saat hover, gestur geser, dot progres
 * interaktif, serta strip aturan bukti 3-kolom di bagian bawah.
 */
export default function GreenActionsCarousel() {
  const [trackIdx, setTrackIdx] = useState(N);
  const [animated, setAnimated] = useState(true);
  const [phase, setPhase] = useState(0);
  const [isTrackHovered, setIsTrackHovered] = useState(false);
  const [isDotsHovered, setIsDotsHovered] = useState(false);
  const [navTick, setNavTick] = useState(0);
  const [openSpecId, setOpenSpecId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const didSwipeRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const hasEnteredView = useInView(rootRef, { once: true, amount: 0.15 });

  const activeIndex = ((trackIdx % N) + N) % N;
  const autoSwitchPaused =
    Boolean(shouldReduceMotion) ||
    !hasEnteredView ||
    isTrackHovered ||
    isDotsHovered;

  function stepCarousel(delta: number) {
    setAnimated(true);
    setPhase(0);
    setNavTick((t) => t + 1);
    setTrackIdx((i) => i + delta);
  }

  function jumpToIndex(targetIdx: number) {
    let diff = targetIdx - activeIndex;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    setAnimated(true);
    setPhase(0);
    setNavTick((t) => t + 1);
    setTrackIdx((i) => i + diff);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    pointerStartXRef.current = e.clientX;
    didSwipeRef.current = false;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerStartXRef.current === null) return;
    const dx = e.clientX - pointerStartXRef.current;
    pointerStartXRef.current = null;
    if (Math.abs(dx) >= 44) {
      didSwipeRef.current = true;
      stepCarousel(dx < 0 ? 1 : -1);
      setTimeout(() => {
        didSwipeRef.current = false;
      }, 60);
    }
  }

  useEffect(() => {
    if (shouldReduceMotion || !hasEnteredView) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, PHASE_STEP_MS);
    return () => clearInterval(id);
  }, [activeIndex, hasEnteredView, shouldReduceMotion]);

  // Switch otomatis dari kategori 01; hanya terjeda ketika kursor hover di kartu atau dot
  useEffect(() => {
    if (autoSwitchPaused) return;
    const id = setInterval(() => {
      setAnimated(true);
      setPhase(0);
      setTrackIdx((i) => i + 1);
    }, AUTO_SWITCH_MS);
    return () => clearInterval(id);
  }, [autoSwitchPaused, activeIndex, navTick]);

  // Silent wrap back to the middle copy `[N .. 2N - 1]` after the slide transition finishes
  useEffect(() => {
    if (trackIdx >= N && trackIdx < 2 * N) return;
    const t = setTimeout(() => {
      setAnimated(false);
      setTrackIdx(((trackIdx % N) + N) % N + N);
    }, 1120);
    return () => clearTimeout(t);
  }, [trackIdx]);

  useEffect(() => {
    if (animated) return;
    const raf = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  const toggleSpec = (id: string) => {
    setOpenSpecId((prev) => (prev === id ? null : id));
  };

  const renderSpecGroup = (items: EvidenceSpecItem[]) => (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openSpecId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggleSpec(item.id)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-3 text-left text-[13px] transition-colors"
            >
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#0F3D2E] group-hover:text-[#1D9E75]">
                <span>{item.label}</span>
                {isOpen ? (
                  <Minus size={13} className="text-[#426352]" aria-hidden="true" />
                ) : (
                  <Plus size={13} className="text-[#426352]" aria-hidden="true" />
                )}
              </span>
              <span className="text-xs font-medium tabular-nums text-[#426352]">
                {item.summary}
              </span>
            </button>
            {isOpen && (
              <p className="mt-1.5 text-xs leading-relaxed text-[#426352]">
                {item.detail}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div ref={rootRef}>
      {/* Carousel Deck Stage (Hover Pause + Swipe + Infinite Wrap) */}
      <div
        onMouseEnter={() => setIsTrackHovered(true)}
        onMouseLeave={() => {
          setIsTrackHovered(false);
          pointerStartXRef.current = null;
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="touch-pan-y select-none"
      >
        {/* Mobile Sliding Track (< 768px) */}
        <div className="overflow-hidden px-0.5 py-2 md:hidden">
          <div
            className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {GREEN_ACTION_LIST.map((action, idx) => (
              <div key={action.type} className="w-full shrink-0 px-0.5">
                <GreenActionCardSurface
                  action={action}
                  isLead={idx === activeIndex}
                  isCentered={idx === activeIndex}
                  phase={phase}
                  reducedMotion={Boolean(shouldReduceMotion)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Infinite Carousel Stage with Flanking Arrows & Edge Dissolve Mask (>= 768px) */}
        <div
          className="relative hidden [--card-w:300px] lg:[--card-w:336px] md:block"
          role="region"
          aria-label="Katalog lima kategori Aksi Hijau"
        >
          <button
            type="button"
            onClick={() => stepCarousel(-1)}
            aria-label="Geser kategori Aksi Hijau ke kiri"
            className="group/btn absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white/95 text-[#0F3D2E] shadow-[0_12px_28px_-10px_rgba(15,61,46,0.28)] backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-[#1D9E75]/50 hover:bg-white hover:text-[#1D9E75] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] lg:left-4"
          >
            <ChevronLeft
              size={18}
              className="transition-transform duration-200 group-hover/btn:-translate-x-0.5"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={() => stepCarousel(1)}
            aria-label="Geser kategori Aksi Hijau ke kanan"
            className="group/btn absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white/95 text-[#0F3D2E] shadow-[0_12px_28px_-10px_rgba(15,61,46,0.28)] backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-[#1D9E75]/50 hover:bg-white hover:text-[#1D9E75] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] lg:right-4"
          >
            <ChevronRight
              size={18}
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            />
          </button>

          <div className="w-full [mask-image:linear-gradient(to_right,transparent_0%,black_17%,black_83%,transparent_100%)]">
            <div className="relative left-1/2 w-[calc(var(--card-w)*4+60px)] -translate-x-1/2 overflow-hidden py-4">
              <div
                className={`flex items-stretch gap-5 motion-reduce:transition-none ${
                  animated ? "transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
                }`}
                style={{
                  transform: `translateX(calc(${-(trackIdx - 1)} * (var(--card-w) + 20px)))`,
                }}
              >
                {TRACK_SLIDES.map((action, idx) => {
                  const isLead = idx === trackIdx;
                  const isCentered = idx === trackIdx || idx === trackIdx + 1;
                  const delta = idx - trackIdx;

                  return (
                    <div
                      key={`${action.type}-${idx}`}
                      onClick={() => {
                        if (!isLead && !didSwipeRef.current) {
                          stepCarousel(delta > 1 ? 1 : delta === 1 ? 1 : -1);
                        }
                      }}
                      className={`w-[var(--card-w)] shrink-0 ${
                        animated ? "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
                      } ${
                        isLead
                          ? "translate-y-0 scale-100 opacity-100 hover:-translate-y-1.5"
                          : isCentered
                            ? "translate-y-0 scale-100 cursor-pointer opacity-100 hover:-translate-y-1.5"
                            : "translate-y-2 scale-[0.95] cursor-pointer opacity-70 hover:translate-y-0 hover:scale-[0.98] hover:opacity-95"
                      }`}
                    >
                      <GreenActionCardSurface
                        action={action}
                        isLead={isLead}
                        isCentered={isCentered}
                        phase={phase}
                        reducedMotion={Boolean(shouldReduceMotion)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Animated Emerald Progress Dots (Mobile & Desktop Unified) */}
      <div
        onMouseEnter={() => setIsDotsHovered(true)}
        onMouseLeave={() => setIsDotsHovered(false)}
        className="mt-3 flex items-center justify-center gap-2 sm:mt-4"
      >
        <button
          type="button"
          onClick={() => stepCarousel(-1)}
          aria-label="Kategori sebelumnya"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white text-[#0F3D2E] shadow-xs transition-all active:scale-95 md:hidden"
        >
          <ChevronLeft size={15} aria-hidden="true" />
        </button>

        <div
          role="group"
          aria-label="Indikator kategori Aksi Hijau"
          className="flex items-center justify-center gap-2 py-2"
        >
          {GREEN_ACTION_LIST.map((action, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div key={action.type} className="group/dot relative flex items-center">
                <button
                  type="button"
                  onClick={() => jumpToIndex(idx)}
                  aria-label={`Tampilkan ${action.labelId}`}
                  aria-pressed={isActive}
                  className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2 ${
                    isActive
                      ? "w-8 bg-[#0F3D2E]/15"
                      : "w-2 bg-emerald-950/20 hover:scale-125 hover:bg-[#1D9E75]/60"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      key={`green-dot-${activeIndex}-${navTick}-${autoSwitchPaused ? "paused" : "run"}`}
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

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-950/10 bg-[#0F3D2E] px-2.5 py-0.5 text-[10px] font-bold text-white opacity-0 shadow-sm transition-all duration-200 group-hover/dot:-translate-y-0.5 group-hover/dot:opacity-100 sm:inline-flex"
                >
                  {action.labelId}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => stepCarousel(1)}
          aria-label="Kategori berikutnya"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white text-[#0F3D2E] shadow-xs transition-all active:scale-95 md:hidden"
        >
          <ChevronRight size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Bottom 3-Column Feature/Rule Strip matching Linear's bottom footer */}
      <div className="mt-10 grid grid-cols-1 gap-6 border-t border-emerald-950/[0.06] pt-8 md:grid-cols-12 md:gap-8">
        <div className="space-y-1.5 md:col-span-4">
          <p className="text-xs font-medium text-[#4D6D5B]">Syarat Bukti Foto</p>
          <p className="text-xs leading-relaxed text-[#4D6D5B]/90">
            Aturan umum untuk kelima kategori Aksi Hijau di demo Portal Warga.
          </p>
          <Link
            href="/login?role=warga"
            className="inline-flex items-center gap-1 pt-1 text-xs font-semibold text-[#0F3D2E] transition-colors hover:text-[#1F6A4A]"
          >
            <span>Uji di Portal Warga</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="md:col-span-4">{renderSpecGroup(EVIDENCE_SPECS_COL_1)}</div>
        <div className="md:col-span-4">{renderSpecGroup(EVIDENCE_SPECS_COL_2)}</div>
      </div>
    </div>
  );
}
