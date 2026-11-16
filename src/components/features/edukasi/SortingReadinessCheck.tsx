"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Layers,
  Package,
  PackageOpen,
  Recycle,
  RotateCcw,
  Scissors,
  ShieldCheck,
  Sparkles,
  Tag,
  XCircle,
} from "lucide-react";

type MaterialKey = "botol-pet" | "kardus";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const N = 4;
const AUTO_SCROLL_MS = 4500;
const PHASE_STEP_MS = 1500;

interface TutorialStepCard {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  correctCheck: string;
  avoidCheck: string;
  howToCheck: string;
  passCue: string;
  icon: "tag" | "droplets" | "shield" | "sparkles" | "package" | "layers" | "scissors";
}

interface MaterialTutorialSpec {
  id: MaterialKey;
  label: string;
  shortLabel: string;
  steps: [TutorialStepCard, TutorialStepCard, TutorialStepCard, TutorialStepCard];
}

const TUTORIAL_SPECS: Record<MaterialKey, MaterialTutorialSpec> = {
  "botol-pet": {
    id: "botol-pet",
    label: "Botol Plastik PET (Kode 1)",
    shortLabel: "Botol PET",
    steps: [
      {
        id: "pet-01",
        stepNumber: "01",
        badge: "Wajib · Kode 1",
        title: "Cek simbol segitiga angka 1",
        correctCheck: "Botol minum bening / biru muda (PET 1)",
        avoidCheck: "Gelas plastik PP (5) atau sachet foil",
        howToCheck:
          "Balik dasar botol atau periksa label kemasan untuk memastikan logo daur ulang segitiga berisi angka 1.",
        passCue: "Identifikasi kode kemasan tepat",
        icon: "tag",
      },
      {
        id: "pet-02",
        stepNumber: "02",
        badge: "0 Residu Cair",
        title: "Kosongkan & tiriskan kering",
        correctCheck: "Bagian dalam bersih & bebas genangan",
        avoidCheck: "Masih ada sisa air, teh, atau sirup",
        howToCheck:
          "Tuang habis sisa cairan, bilas ringan bila lengket, lalu balik botol beberapa detik hingga tuntas.",
        passCue: "Berat timbangan akurat tanpa air",
        icon: "droplets",
      },
      {
        id: "pet-03",
        stepNumber: "03",
        badge: "Wadah Terpisah",
        title: "Pisahkan dari sampah basah",
        correctCheck: "Disimpan di kantong material kering",
        avoidCheck: "Tercampur sisa dapur atau minyak",
        howToCheck:
          "Siapkan karung atau wadah kering tersendiri di rumah agar botol PET tidak terkontaminasi sisa makanan.",
        passCue: "Material bersih siap dikumpulkan",
        icon: "shield",
      },
      {
        id: "pet-04",
        stepNumber: "04",
        badge: "Siap Timbang",
        title: "Cek tutup & label kemasan",
        correctCheck: "Ikuti aturan bank sampah setempat",
        avoidCheck: "Menumpuk botol dengan barang asing",
        howToCheck:
          "Tanyakan ke titik setoran atau pengepul mitra apakah tutup botol (HDPE) dan label perlu dilepas dahulu.",
        passCue: "Lolos cek fisik di titik setor",
        icon: "sparkles",
      },
    ],
  },
  kardus: {
    id: "kardus",
    label: "Kardus & Karton Kering",
    shortLabel: "Kardus Kering",
    steps: [
      {
        id: "krd-01",
        stepNumber: "01",
        badge: "Wajib · Kering",
        title: "Raba kelayakan & kekeringan",
        correctCheck: "Serat karton kaku, kering & bersih",
        avoidCheck: "Kardus lembek kehujanan atau jamuran",
        howToCheck:
          "Periksa sisi bawah dan lipatan kardus memastikan kondisinya kering utuh dan tidak rusak oleh kelembapan.",
        passCue: "Mutu serat karton terjaga",
        icon: "shield",
      },
      {
        id: "krd-02",
        stepNumber: "02",
        badge: "Murni Karton",
        title: "Keluarkan plastik & lakban",
        correctCheck: "Isi boks & perekat plastik terlepas",
        avoidCheck: "Masih berisi bubble wrap atau busa",
        howToCheck:
          "Keluarkan ganjalan styrofoam/plastik di dalam paket lalu kelupas pita lakban berlebih sebelum ditimbang.",
        passCue: "100% material karton bersih",
        icon: "package",
      },
      {
        id: "krd-03",
        stepNumber: "03",
        badge: "Bebas Minyak",
        title: "Sisihkan bagian berminyak",
        correctCheck: "Bebas kuah & noda minyak makanan",
        avoidCheck: "Kardus bekas minyak masuk utuh",
        howToCheck:
          "Bila hanya sebagian sudut yang terkena minyak, gunting dan sisihkan bagian bernoda ke wadah residu.",
        passCue: "Bagian bersih tetap bernilai",
        icon: "scissors",
      },
      {
        id: "krd-04",
        stepNumber: "04",
        badge: "Siap Timbang",
        title: "Lipat pipih & ikat rapi",
        correctCheck: "Tumpukan rata mudah ditaruh di timbang",
        avoidCheck: "Boks dibiarkan mengembang makan tempat",
        howToCheck:
          "Lepas lipatan dasar boks, tekan hingga rata sejajar, lalu ikat ringan agar praktis dibawa atau dijemput.",
        passCue: "Hemat ruang saat penimbangan",
        icon: "layers",
      },
    ],
  },
};

function WindowDots() {
  return (
    <div aria-hidden="true" className="flex items-center gap-2 text-[11px] font-semibold text-[#426352]/40">
      <span>−</span>
      <span>↗</span>
      <span>×</span>
    </div>
  );
}

function StepIcon({ kind }: { kind: TutorialStepCard["icon"] }) {
  const cls = "h-3.5 w-3.5 text-[#1D9E75]";
  switch (kind) {
    case "tag":
      return <Tag className={cls} aria-hidden="true" />;
    case "droplets":
      return <Droplets className={cls} aria-hidden="true" />;
    case "package":
      return <PackageOpen className={cls} aria-hidden="true" />;
    case "scissors":
      return <Scissors className={cls} aria-hidden="true" />;
    case "layers":
      return <Layers className={cls} aria-hidden="true" />;
    case "sparkles":
      return <Sparkles className={cls} aria-hidden="true" />;
    default:
      return <ShieldCheck className={cls} aria-hidden="true" />;
  }
}

/**
 * Carousel tutorial pemeriksaan per langkah (`#cek-kesiapan`):
 * - Header lapang tanpa tumpukan kontrol
 * - Floating segmented tab (Botol PET | Kardus Kering) tepat di atas kartu
 * - Auto-scroll halus dimulai dari Langkah 01 (berhenti hanya saat kursor hover di trek/dot)
 * - Dukungan geser pointer/sentuh, tombol Prev/Next `<` `>`, dan dot progres interaktif
 */
export default function SortingReadinessCheck() {
  const [material, setMaterial] = useState<MaterialKey>("botol-pet");
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [trackIdx, setTrackIdx] = useState(N);
  const [animated, setAnimated] = useState(true);
  const [phase, setPhase] = useState(0);
  const [isTrackHovered, setIsTrackHovered] = useState(false);
  const [isDotsHovered, setIsDotsHovered] = useState(false);
  const [navTick, setNavTick] = useState(0);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const didSwipeRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const hasEnteredView = useInView(sectionRef, { once: true, amount: 0.15 });

  const currentSpec = TUTORIAL_SPECS[material];
  const steps = currentSpec.steps;
  const trackSlides = [...steps, ...steps, ...steps];
  const activeIndex = ((trackIdx % N) + N) % N;

  const doneCount = steps.filter((s) => Boolean(checkedMap[s.id])).length;
  const allDone = doneCount === N;
  const autoScrollPaused =
    Boolean(shouldReduceMotion) || !hasEnteredView || isTrackHovered || isDotsHovered;

  function stepCarousel(delta: number) {
    setAnimated(true);
    setPhase(0);
    setNavTick((t) => t + 1);
    setTrackIdx((i) => i + delta);
  }

  function jumpToStep(targetIdx: number) {
    const diff = targetIdx - activeIndex;
    setAnimated(true);
    setPhase(0);
    setNavTick((t) => t + 1);
    setTrackIdx((i) => i + diff);
  }

  function handleMaterialChange(nextMaterial: MaterialKey) {
    if (nextMaterial === material) return;
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    setMaterial(nextMaterial);
    setAnimated(false);
    setTrackIdx(N);
    setPhase(0);
    setNavTick((t) => t + 1);
  }

  function toggleStep(stepId: string, cardLogicalIndex: number) {
    const nextChecked = !checkedMap[stepId];
    setCheckedMap((prev) => ({
      ...prev,
      [stepId]: nextChecked,
    }));

    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (nextChecked) {
      const futureDoneCount = steps.filter((s) =>
        s.id === stepId ? true : Boolean(checkedMap[s.id]),
      ).length;
      if (cardLogicalIndex === activeIndex && futureDoneCount < N && activeIndex < N - 1) {
        advanceTimerRef.current = setTimeout(() => {
          stepCarousel(1);
        }, 420);
      }
    }
  }

  function resetCurrent() {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    setCheckedMap((prev) => {
      const next = { ...prev };
      for (const s of steps) {
        delete next[s.id];
      }
      return next;
    });
    jumpToStep(0);
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
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !hasEnteredView) return;
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, PHASE_STEP_MS);
    return () => clearInterval(id);
  }, [activeIndex, material, hasEnteredView, shouldReduceMotion]);

  // Auto-scroll otomatis dimulai dari Langkah 01 saat section masuk viewport; hanya berhenti saat hover
  useEffect(() => {
    if (autoScrollPaused) return;
    const id = setInterval(() => {
      setAnimated(true);
      setPhase(0);
      setTrackIdx((i) => i + 1);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [autoScrollPaused, activeIndex, material, navTick]);

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

  const stepPx = 390;
  const shiftPx = (trackIdx - 1) * stepPx;

  return (
    <section
      ref={sectionRef}
      id="cek-kesiapan"
      aria-labelledby="cek-kesiapan-title"
      className="scroll-mt-20 relative isolate flex flex-col justify-between overflow-hidden border-y border-emerald-950/[0.08] bg-gradient-to-b from-[#F5FAF7] via-[#FAFDFB] to-[#FAFDFB] py-16 text-[#0F3D2E] sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(29,158,117,0.08)_0%,transparent_75%)]"
      />

      {/* Top Editorial Header (Clean & Airy) + Floating Material Segmented Bar Right Above Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
        className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        {/* Asymmetric Header matching MaterialShowcaseStage: Title + Copy Left, Gliding Segmented Switch Right */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2
              id="cek-kesiapan-title"
              className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]"
            >
              Cek kesiapan pilah <br />
              <span className="text-[#1D9E75]">langkah demi langkah</span>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#426352] sm:text-[17px]">
              Ikuti tutorial per kartu dan tekan tombol cek satu per satu untuk memastikan material siap setor sebelum ditimbang pengepul.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 md:shrink-0 md:justify-end">
            {/* Minimal Reset Control (Appears quietly only after a step is checked) */}
            <AnimatePresence>
              {doneCount > 0 && (
                <motion.button
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  onClick={resetCurrent}
                  aria-label="Atur ulang semua langkah pengecekan"
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-950/[0.1] bg-white px-3.5 py-2 text-xs font-bold text-[#426352] shadow-xs transition-colors hover:border-[#1D9E75]/40 hover:text-[#0F3D2E]"
                >
                  <RotateCcw size={12} aria-hidden="true" />
                  <span>Ulangi cek</span>
                </motion.button>
              )}
            </AnimatePresence>

            <div
              role="tablist"
              aria-label="Pilih tutorial kesiapan material"
              className="inline-flex w-fit items-center gap-1 rounded-2xl border border-emerald-950/10 bg-[#F2F8F4] p-1 shadow-[inset_0_1px_2px_rgba(15,61,46,0.05)]"
            >
              {(["botol-pet", "kardus"] as MaterialKey[]).map((key) => {
                const isSelected = material === key;
                const Icon = key === "botol-pet" ? Recycle : Package;

                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleMaterialChange(key)}
                    className={`relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] ${
                      isSelected
                        ? "text-white"
                        : "text-[#426352] hover:text-[#0F3D2E]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="readiness-material-tab"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0.01 }
                            : { type: "spring", stiffness: 360, damping: 30 }
                        }
                        className="absolute inset-0 rounded-xl bg-[#0F3D2E] shadow-sm shadow-[#0F3D2E]/20"
                      />
                    )}
                    <Icon
                      size={13}
                      className={`relative z-10 ${isSelected ? "text-[#6EE7B7]" : "text-[#1D9E75]"}`}
                      aria-hidden="true"
                    />
                    <span className="relative z-10">{TUTORIAL_SPECS[key].shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Carousel Track with Hover-Pause Auto-Scroll, Swipe Gesture & Left/Right Arrows */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.15, delay: 0.12, ease: EASE_OUT_EXPO }}
        onMouseEnter={() => setIsTrackHovered(true)}
        onMouseLeave={() => {
          setIsTrackHovered(false);
          pointerStartXRef.current = null;
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative mt-8 touch-pan-y select-none sm:mt-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={material}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.34, ease: EASE_OUT_EXPO }}
          >
            {/* Mobile Sliding Track (< 768px) */}
            <div className="overflow-hidden px-4 pb-2 md:hidden">
              <div
                className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {steps.map((step, idx) => {
                  const isChecked = Boolean(checkedMap[step.id]);
                  return (
                    <div key={step.id} className="w-full shrink-0 px-0.5 py-2">
                      <div
                        className={`overflow-hidden rounded-2xl border bg-white shadow-[0_16px_38px_-18px_rgba(15,61,46,0.16)] transition-all duration-300 ${
                          isChecked ? "border-[#1D9E75]/45" : "border-emerald-950/[0.12]"
                        }`}
                      >
                        <TutorialCardSurface
                          step={step}
                          logicalIndex={idx}
                          isCenter={idx === activeIndex}
                          isChecked={isChecked}
                          phase={phase}
                          reducedMotion={Boolean(shouldReduceMotion)}
                          onToggle={() => toggleStep(step.id, idx)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Sliding Window with Flanking Side Prev/Next Arrows Outside Alpha Mask (>= 768px) */}
            <div className="relative mx-auto hidden w-full max-w-[1360px] md:block">
              {/* Desktop Left Edge Prev Button */}
              <button
                type="button"
                onClick={() => stepCarousel(-1)}
                aria-label="Geser kartu tutorial ke kiri"
                className="group/btn absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white/95 text-[#0F3D2E] shadow-[0_12px_28px_-10px_rgba(15,61,46,0.28)] backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-[#1D9E75]/50 hover:bg-white hover:text-[#1D9E75] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] lg:left-7"
              >
                <ChevronLeft
                  size={19}
                  className="transition-transform duration-200 group-hover/btn:-translate-x-0.5"
                />
              </button>

              {/* Desktop Right Edge Next Button */}
              <button
                type="button"
                onClick={() => stepCarousel(1)}
                aria-label="Geser kartu tutorial ke kanan"
                className="group/btn absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white/95 text-[#0F3D2E] shadow-[0_12px_28px_-10px_rgba(15,61,46,0.28)] backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-[#1D9E75]/50 hover:bg-white hover:text-[#1D9E75] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] lg:right-7"
              >
                <ChevronRight
                  size={19}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                />
              </button>

              {/* Alpha Masked Sliding Deck */}
              <div className="w-full [mask-image:linear-gradient(to_right,transparent_0%,black_17%,black_83%,transparent_100%)]">
                <div className="relative left-1/2 w-[1540px] -translate-x-1/2 overflow-hidden py-5">
                  <div
                    className={`flex gap-5 motion-reduce:transition-none ${
                      animated ? "transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
                    }`}
                    style={{ transform: `translateX(-${shiftPx}px)` }}
                  >
                    {trackSlides.map((step, idx) => {
                      const isCenter = idx === trackIdx || idx === trackIdx + 1;
                      const logicalIdx = ((idx % N) + N) % N;
                      const delta = idx - trackIdx;
                      const isChecked = Boolean(checkedMap[step.id]);

                      return (
                        <div
                          key={`${material}-${step.id}-${idx}`}
                          onClick={() => {
                            if (!isCenter && !didSwipeRef.current) {
                              stepCarousel(delta > 1 ? 1 : -1);
                            }
                          }}
                          className={`w-[370px] shrink-0 overflow-hidden rounded-2xl border ${
                            animated ? "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
                          } ${
                            isCenter
                              ? isChecked
                                ? "translate-y-0 scale-100 border-[#1D9E75]/45 bg-white opacity-100 shadow-[0_22px_48px_-20px_rgba(29,158,117,0.28)] hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-18px_rgba(29,158,117,0.32)]"
                                : "translate-y-0 scale-100 border-emerald-950/[0.12] bg-white opacity-100 shadow-[0_22px_48px_-20px_rgba(15,61,46,0.16)] hover:-translate-y-1.5 hover:border-[#1D9E75]/35 hover:shadow-[0_28px_56px_-18px_rgba(15,61,46,0.22)]"
                              : "translate-y-2 scale-[0.95] cursor-pointer border-emerald-950/[0.08] bg-[#F7FBF9] opacity-70 hover:translate-y-0 hover:scale-[0.98] hover:border-[#1D9E75]/30 hover:opacity-95"
                          }`}
                        >
                          <TutorialCardSurface
                            step={step}
                            logicalIndex={logicalIdx}
                            isCenter={isCenter}
                            isChecked={isChecked}
                            phase={phase}
                            reducedMotion={Boolean(shouldReduceMotion)}
                            onToggle={() => toggleStep(step.id, logicalIdx)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Centered Interactive Carousel Dots & Hover Step Previews BELOW the Cards */}
        <div
          onMouseEnter={() => setIsDotsHovered(true)}
          onMouseLeave={() => setIsDotsHovered(false)}
          className="mx-auto mt-3 flex max-w-6xl flex-col items-center gap-4 px-4 sm:mt-4 sm:px-6"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {/* Mobile Compact Prev Button Beside Bottom Stepper */}
            <button
              type="button"
              onClick={() => stepCarousel(-1)}
              aria-label="Geser kartu tutorial ke kiri"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white text-[#0F3D2E] shadow-xs transition-all active:scale-95 md:hidden"
            >
              <ChevronLeft size={15} />
            </button>

            <div
              role="group"
              aria-label="Indikator dan progres langkah pemilahan"
              className="flex items-center justify-center gap-2 py-2"
            >
              {steps.map((s, idx) => {
                const isActive = idx === activeIndex;
                const isDone = Boolean(checkedMap[s.id]);
                return (
                  <div key={s.id} className="group/dot relative flex items-center">
                    <button
                      type="button"
                      onClick={() => jumpToStep(idx)}
                      aria-label={`Langkah ${s.stepNumber}: ${s.title}${isDone ? " (sudah dicek)" : ""}`}
                      aria-pressed={isActive}
                      className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2 ${
                        isActive
                          ? "w-8 bg-[#0F3D2E]/15"
                          : isDone
                            ? "w-2.5 bg-[#1D9E75]/80 hover:scale-125 hover:bg-[#1D9E75]"
                            : "w-2 bg-emerald-950/20 hover:scale-125 hover:bg-[#1D9E75]/60"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          key={`${material}-${activeIndex}-${navTick}-${autoScrollPaused ? "paused" : "run"}`}
                          initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                          animate={{
                            scaleX: shouldReduceMotion ? 1 : autoScrollPaused ? 0.35 : 1,
                          }}
                          transition={
                            shouldReduceMotion || autoScrollPaused
                              ? { duration: 0.2 }
                              : { duration: AUTO_SCROLL_MS / 1000, ease: "linear" }
                          }
                          style={{ transformOrigin: "left" }}
                          className="block h-full w-full rounded-full bg-[#1D9E75]"
                        />
                      )}
                    </button>

                    {/* Floating Interactive Step Preview Pill on Dot Hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-950/10 bg-[#0F3D2E] px-2.5 py-0.5 text-[10px] font-bold text-white opacity-0 shadow-sm transition-all duration-200 group-hover/dot:-translate-y-0.5 group-hover/dot:opacity-100 sm:inline-flex"
                    >
                      {s.stepNumber} · {s.badge}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Compact Next Button Beside Bottom Stepper */}
            <button
              type="button"
              onClick={() => stepCarousel(1)}
              aria-label="Geser kartu tutorial ke kanan"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white text-[#0F3D2E] shadow-xs transition-all active:scale-95 md:hidden"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Inline Celebration Banner Below Stepper Once 4/4 Checked */}
          <AnimatePresence>
            {allDone && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#1D9E75]/35 bg-[#EBF7F1] px-4 py-3 text-xs shadow-xs sm:px-5"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="shrink-0 text-[#1D9E75]" />
                  <span className="font-bold text-[#0F3D2E]">
                    Semua 4 langkah pemeriksaan {currentSpec.label} terpenuhi!
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 font-bold">
                  <a
                    href="#setor-atau-jemput"
                    className="inline-flex items-center gap-1 text-[#0F3D2E] hover:text-[#1D9E75]"
                  >
                    <span>Lanjut ke opsi setor</span>
                    <ArrowRight size={13} />
                  </a>
                  <Link
                    href="/login?role=warga"
                    className="inline-flex items-center gap-1 text-[#1D9E75] underline underline-offset-4 hover:text-[#0F3D2E]"
                  >
                    <span>Uji Aksi Hijau</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

function TutorialCardSurface({
  step,
  logicalIndex,
  isCenter,
  isChecked,
  phase,
  reducedMotion,
  onToggle,
}: {
  step: TutorialStepCard;
  logicalIndex: number;
  isCenter: boolean;
  isChecked: boolean;
  phase: number;
  reducedMotion: boolean;
  onToggle: () => void;
}) {
  const highlightCheck = isCenter && phase >= 1;
  const highlightAvoid = isCenter && phase === 2 && !isChecked;

  return (
    <div
      className={`relative flex h-full flex-col justify-between gap-4 p-5 sm:p-6 ${
        isCenter ? "bg-white" : "bg-[#F7FBF9]"
      }`}
    >
      {/* Animated Top Completion Accent Strip */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
        transition={
          reducedMotion
            ? { duration: 0.01 }
            : { duration: 0.35, ease: EASE_OUT_EXPO }
        }
        style={{ transformOrigin: "left" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1D9E75] via-[#34D399] to-[#1D9E75]"
      />

      <div className="space-y-4">
        {/* Top Window Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <StepIcon kind={step.icon} />
            <span className="font-bold text-[#0F3D2E]">Langkah {step.stepNumber}</span>
            <span className="rounded bg-[#EFF8F3] px-2 py-0.5 text-[10px] font-bold text-[#1D9E75]">
              {step.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isChecked && (
                <motion.span
                  key="lolos-badge"
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.72 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, scale: 0.72 }}
                  transition={{ type: "spring", stiffness: 360, damping: 24 }}
                  className="inline-flex items-center gap-1 rounded-full border border-[#1D9E75]/30 bg-[#EBF7F1] px-2 py-0.5 text-[10px] font-bold text-[#1D9E75]"
                >
                  <Check size={10} strokeWidth={2.8} /> Lolos
                </motion.span>
              )}
            </AnimatePresence>
            <WindowDots />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold leading-snug text-[#0F3D2E] sm:text-[17px]">
          {step.title}
        </h3>

        {/* Animated Step-by-Step Inspection Comparison Visual inside Card */}
        <div className="space-y-2 rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-3 text-xs">
          <motion.div
            animate={{
              x: highlightCheck || isChecked ? 2 : 0,
            }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
            className={`flex items-start gap-2 rounded-lg px-2.5 py-2 transition-colors duration-300 ${
              isChecked || highlightCheck
                ? "bg-[#EBF7F1] text-[#0F3D2E] ring-1 ring-[#1D9E75]/35"
                : "text-[#2D5542]"
            }`}
          >
            <CheckCircle2
              size={14}
              className={`mt-0.5 shrink-0 text-[#1D9E75] transition-transform duration-300 ${
                highlightCheck || isChecked ? "scale-110" : "scale-100"
              }`}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <span className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-wider text-[#1D9E75]">
                <span>Benar</span>
                {highlightCheck && !isChecked && !reducedMotion && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1D9E75]" />
                )}
              </span>
              <span className="block text-[11.5px] font-semibold leading-snug">
                {step.correctCheck}
              </span>
            </div>
          </motion.div>

          <motion.div
            animate={{
              x: highlightAvoid ? 2 : 0,
            }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
            className={`flex items-start gap-2 rounded-lg px-2.5 py-2 transition-colors duration-300 ${
              highlightAvoid
                ? "bg-amber-50 text-amber-950 ring-1 ring-amber-300/70"
                : "text-[#426352]"
            }`}
          >
            <XCircle
              size={14}
              className={`mt-0.5 shrink-0 text-amber-600 transition-transform duration-300 ${
                highlightAvoid ? "scale-110" : "scale-100"
              }`}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <span className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-wider text-amber-800">
                <span>Hindari</span>
                {highlightAvoid && !reducedMotion && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                )}
              </span>
              <span className="block text-[11.5px] leading-snug">
                {step.avoidCheck}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Tutorial Explanation Box */}
        <div className="rounded-lg border border-emerald-950/[0.08] bg-white p-3 text-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#1D9E75]">
            Cara cek yang benar
          </p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-[#2D5542]">
            {step.howToCheck}
          </p>
        </div>
      </div>

      {/* Interactive One-by-One Button */}
      <div className="pt-1">
        <div className="mb-2 flex items-center justify-between text-[11px] text-[#426352]">
          <span>Standar: {step.passCue}</span>
          <span className="tabular-nums text-[10px] font-semibold text-[#426352]/75">
            {logicalIndex + 1}/{N}
          </span>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`group/cta flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] ${
            isChecked
              ? "border border-[#1D9E75]/40 bg-[#EBF7F1] text-[#0F3D2E] hover:bg-[#DDF2E7]"
              : "bg-[#0F3D2E] text-white shadow-sm shadow-[#0F3D2E]/15 hover:bg-[#18533F]"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isChecked ? (
              <motion.span
                key="checked"
                initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2"
              >
                <Check size={14} strokeWidth={2.6} className="text-[#1D9E75]" aria-hidden="true" />
                <span>Sudah Dicek · Lolos</span>
              </motion.span>
            ) : (
              <motion.span
                key="unchecked"
                initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2"
              >
                <span>Tandai Langkah {step.stepNumber}</span>
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
