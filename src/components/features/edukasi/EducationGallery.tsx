"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  MapPin,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SURABAYA_KECAMATAN } from "@/config/surabaya";
import { DEMO_REWARDS } from "@/data/demo/umkm-rewards";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 300, damping: 26 };

const CARD_W = 236;
const CARD_GAP = 20;
const SLOT_W = CARD_W + CARD_GAP; // 256px
const AUTO_SCROLL_MS = 4200;

interface FlowDeckCard {
  id: string;
  step: string;
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  floatingTag: string;
  /** Posisi tersebar asimetris terbuka (gaya Gambar 3). */
  scatter: { x: number; y: number; rotate: number; scale: number; zIndex: number };
  /** Slot relasi karousel saat menyatu (0 = tengah, +/-1 = samping, +/-2 = ujung). */
  assembledRel: number;
}

const FLOW_CARDS: readonly FlowDeckCard[] = [
  {
    id: "pilah",
    step: "01",
    kicker: "Pilah",
    title: "Pisahkan PET & kardus",
    description: "Simpan botol PET kode 1 dan kardus kering terpisah dari sampah basah.",
    ctaLabel: "Lihat kriteria",
    href: "#material-setoran",
    floatingTag: "PET Kode 1 & Kardus",
    scatter: { x: 225, y: -78, rotate: 1.5, scale: 1.03, zIndex: 30 },
    assembledRel: 0,
  },
  {
    id: "timbang",
    step: "02",
    kicker: "Setoran",
    title: "Foto material & angka timbang",
    description: "Satu bingkai foto memuat material sekaligus layar angka timbangan digital.",
    ctaLabel: "Panduan foto",
    href: "#setelah-ditimbang",
    floatingTag: "1 Bingkai · 3,45 kg",
    scatter: { x: -64, y: -112, rotate: 4.5, scale: 0.95, zIndex: 18 },
    assembledRel: 1,
  },
  {
    id: "verifikasi",
    step: "03",
    kicker: "Verifikasi",
    title: "Periksa bukti AI & lapangan",
    description: "AI menyaring kelayakan foto dulu, lalu pengepul cek fisik di lokasi.",
    ctaLabel: "Alur verifikasi",
    href: "#setelah-ditimbang",
    floatingTag: "AI + Cek Pengepul",
    scatter: { x: -6, y: 26, rotate: -2, scale: 0.97, zIndex: 22 },
    assembledRel: 2,
  },
  {
    id: "aksi",
    step: "04",
    kicker: "Demo Aktif",
    title: "Coba lima Aksi Hijau",
    description: "Uji foto pilah, jelantah, tanam pohon, hemat energi, atau transport hijau.",
    ctaLabel: "Lihat 5 kategori",
    href: "#aksi-hijau",
    floatingTag: "Demo Aktif · +30–80 pts",
    scatter: { x: -282, y: 86, rotate: -6, scale: 0.94, zIndex: 16 },
    assembledRel: 3,
  },
  {
    id: "voucher",
    step: "05",
    kicker: "Simulasi",
    title: "Tukar EcoPoints UMKM",
    description: "Gunakan poin terverifikasi untuk mencoba voucher katalog UMKM Surabaya.",
    ctaLabel: "Demo Warga",
    href: "/login?role=warga",
    floatingTag: "Voucher Katalog Demo",
    scatter: { x: 266, y: 98, rotate: 5.5, scale: 0.95, zIndex: 20 },
    assembledRel: -2,
  },
  {
    id: "peta",
    step: "06",
    kicker: "Pemkot",
    title: "Pantau wilayah Surabaya",
    description: "Portal merangkum aksi dan laporan per kecamatan sambil menjaga privasi.",
    ctaLabel: "Pilih portal",
    href: "/#gateway",
    floatingTag: `${SURABAYA_KECAMATAN.length} Kecamatan Terpetakan`,
    scatter: { x: -326, y: -74, rotate: -7.5, scale: 0.93, zIndex: 12 },
    assembledRel: -1,
  },
];

const N = FLOW_CARDS.length;
const TRACK_SLIDES = [...FLOW_CARDS, ...FLOW_CARDS, ...FLOW_CARDS];
const primaryReward = DEMO_REWARDS[0];

function CardAccent({ id, isActive }: { id: FlowDeckCard["id"]; isActive: boolean }) {
  switch (id) {
    case "pilah":
      return (
        <div className="relative h-20 w-full">
          <Image
            src="/images/edukasi/pilah.webp"
            alt="Botol PET dan kardus terpilah"
            fill
            sizes="140px"
            className="object-contain"
          />
        </div>
      );
    case "timbang":
      return (
        <div className="relative h-20 w-full">
          <Image
            src="/images/edukasi/bukti.webp"
            alt="Material dan angka timbangan 3,45 kg"
            fill
            sizes="140px"
            className="object-contain"
          />
        </div>
      );
    case "verifikasi":
      return (
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold ${
            isActive
              ? "border-[#1D9E75]/25 bg-[#EFF8F3] text-[#0F3D2E]"
              : "border-emerald-950/10 bg-white/75 text-[#2D5542]"
          }`}
        >
          <ShieldCheck size={15} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
          <span>OCR Layar + SHA-256 + Fisik</span>
        </div>
      );
    case "aksi":
      return (
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold ${
            isActive
              ? "border-[#1D9E75]/25 bg-[#EFF8F3] text-[#0F3D2E]"
              : "border-emerald-950/10 bg-white/75 text-[#2D5542]"
          }`}
        >
          <Leaf size={15} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
          <span>5 Kebiasaan Hijau · +30–80 pts</span>
        </div>
      );
    case "voucher":
      return (
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold ${
            isActive
              ? "border-[#1D9E75]/25 bg-[#EFF8F3] text-[#0F3D2E]"
              : "border-emerald-950/10 bg-white/75 text-[#2D5542]"
          }`}
        >
          <Ticket size={15} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
          <span className="truncate">
            {primaryReward ? `${primaryReward.merchant.name} · ${primaryReward.ecoPointsCost} pts` : "Voucher UMKM Demo"}
          </span>
        </div>
      );
    case "peta":
      return (
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold ${
            isActive
              ? "border-[#1D9E75]/25 bg-[#EFF8F3] text-[#0F3D2E]"
              : "border-emerald-950/10 bg-white/75 text-[#2D5542]"
          }`}
        >
          <MapPin size={15} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
          <span>Selatan, Timur, Barat, Utara, Pusat</span>
        </div>
      );
  }
}

function FlowCardBody({
  card,
  isFocused,
  showFloatingTag,
  reducedMotion,
}: {
  card: FlowDeckCard;
  isFocused: boolean;
  showFloatingTag: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div
      className={`relative flex h-[306px] w-[236px] flex-col justify-between rounded-2xl border p-5 transition-colors duration-300 ${
        isFocused
          ? "border-[#1D9E75]/30 bg-white text-[#0F3D2E] shadow-[0_26px_58px_-18px_rgba(15,61,46,0.22)]"
          : "border-emerald-950/[0.08] bg-[#EAF4EE]/95 text-[#0F3D2E] shadow-[0_14px_30px_-18px_rgba(15,61,46,0.14)]"
      }`}
    >
      {/* Top clean editorial numeral + micro kicker */}
      <div>
        <div className="flex items-baseline gap-2.5">
          <span
            className={`font-mono text-4xl font-light leading-none tracking-tight tabular-nums ${
              isFocused ? "text-[#1D9E75]" : "text-[#1D9E75]/75"
            }`}
          >
            {card.step}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#426352]">
            {card.kicker}
          </span>
        </div>

        <h3 className="mt-3.5 text-base font-extrabold leading-snug tracking-tight text-[#0F3D2E]">
          {card.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#365548]">{card.description}</p>
      </div>

      {/* Compact visual cue */}
      <div className="my-2">
        <CardAccent id={card.id} isActive={isFocused} />
      </div>

      {/* Bottom rounded CTA pill */}
      <div>
        <Link
          href={card.href}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
            isFocused
              ? "bg-[#EFF8F3] text-[#0F3D2E] hover:bg-[#1D9E75] hover:text-white"
              : "bg-white/80 text-[#365548] hover:bg-white hover:text-[#0F3D2E]"
          }`}
        >
          <span>{card.ctaLabel}</span>
          <ArrowRight size={11} aria-hidden="true" />
        </Link>
      </div>

      {/* Floating protruding pill tag matching Ref 2 & Ref 3 */}
      <AnimatePresence>
        {showFloatingTag && (
          <motion.span
            initial={reducedMotion ? false : { opacity: 0, scale: 0.85, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.85, x: -6 }}
            transition={SPRING_SNAPPY}
            className="pointer-events-none absolute -right-7 bottom-14 z-30 hidden whitespace-nowrap rounded-full border border-white/25 bg-[#1D9E75] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-[0_12px_24px_-8px_rgba(15,61,46,0.35)] md:inline-flex"
          >
            {card.floatingTag}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Kartu fase scroll-scatter bebas di ruang terbuka (Gambar 3 -> menyatu menjadi Gambar 2).
 */
function ScatterMorphCard({
  card,
  assembleProgress,
  onSelect,
}: {
  card: FlowDeckCard;
  assembleProgress: MotionValue<number>;
  onSelect: () => void;
}) {
  const rel = card.assembledRel;
  const targetX = rel * SLOT_W;
  const targetY = rel === 0 ? -16 : Math.abs(rel) === 1 ? 10 : 16;
  const targetScale = rel === 0 ? 1.07 : Math.abs(rel) === 1 ? 0.94 : 0.86;
  const targetOpacity = Math.abs(rel) <= 2 ? (rel === 0 ? 1 : Math.abs(rel) === 1 ? 0.94 : 0.62) : 0;

  const x = useTransform(assembleProgress, [0, 1], [card.scatter.x, targetX]);
  const y = useTransform(assembleProgress, [0, 1], [card.scatter.y, targetY]);
  const rotate = useTransform(assembleProgress, [0, 1], [card.scatter.rotate, 0]);
  const scale = useTransform(assembleProgress, [0, 1], [card.scatter.scale, targetScale]);
  const opacity = useTransform(assembleProgress, [0, 0.85, 1], [1, 1, targetOpacity]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: rel === 0 ? 30 : Math.abs(rel) === 1 ? 20 : card.scatter.zIndex,
      }}
      className="absolute left-1/2 top-1/2 -ml-[118px] -mt-[153px]"
    >
      <motion.div
        whileHover={{ scale: 1.045, transition: { duration: 0.2 } }}
        onClick={onSelect}
        className="cursor-pointer"
      >
        <FlowCardBody
          card={card}
          isFocused={rel === 0}
          showFloatingTag={rel === 0}
          reducedMotion={false}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Galeri Alur Dokumentasi & Demo (`#galeri`) tanpa kontainer kotak kaku:
 * 1. Tersebar bebas penuh layar di atas latar halaman (gaya Gambar 3).
 * 2. Menyatu mulus seiring scroll ke satu baris carousel terfokus di tengah (gaya Gambar 2).
 * 3. Carousel berputar otomatis dari kartu 01 (jeda hanya saat hover) beserta dot di bawah.
 */
export default function EducationGallery() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const didSwipeRef = useRef(false);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const [isAssembled, setIsAssembled] = useState(shouldReduceMotion);
  const [trackIdx, setTrackIdx] = useState(N);
  const [animated, setAnimated] = useState(true);
  const [isStageHovered, setIsStageHovered] = useState(false);
  const [isDotsHovered, setIsDotsHovered] = useState(false);
  const [navTick, setNavTick] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 90%", "start 30%"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.65,
  });
  const assembleProgress = useTransform(smoothScroll, [0, 0.85], [0, 1], { clamp: true });

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    if (shouldReduceMotion) return;
    if (latest >= 0.86 && !isAssembled) {
      setIsAssembled(true);
    } else if (latest < 0.72 && isAssembled) {
      setIsAssembled(false);
      setAnimated(false);
      setTrackIdx(N);
    }
  });

  const activeIndex = ((trackIdx % N) + N) % N;
  const autoPaused = shouldReduceMotion || !isAssembled || isStageHovered || isDotsHovered;

  function stepCarousel(delta: number) {
    setAnimated(true);
    setNavTick((t) => t + 1);
    setTrackIdx((i) => i + delta);
  }

  function jumpToStep(targetIdx: number) {
    let diff = targetIdx - activeIndex;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    setAnimated(true);
    setNavTick((t) => t + 1);
    setTrackIdx((i) => i + diff);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || !isAssembled) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    pointerStartXRef.current = e.clientX;
    didSwipeRef.current = false;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerStartXRef.current === null || !isAssembled) return;
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

  // Auto-scroll carousel dimulai dari kartu 01 setelah kartu menyatu; berhenti hanya saat hover
  useEffect(() => {
    if (autoPaused) return;
    const id = setInterval(() => {
      setAnimated(true);
      setTrackIdx((i) => i + 1);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [autoPaused, activeIndex, navTick]);

  // Silent wrap kembali ke salinan tengah `[N .. 2N - 1]`
  useEffect(() => {
    if (trackIdx >= N && trackIdx < 2 * N) return;
    const t = setTimeout(() => {
      setAnimated(false);
      setTrackIdx(((trackIdx % N) + N) % N + N);
    }, 980);
    return () => clearTimeout(t);
  }, [trackIdx]);

  useEffect(() => {
    if (animated) return;
    const raf = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  return (
    <div id="galeri-kartu" ref={stageRef} className="scroll-mt-24">
      {/* Open Full-Bleed Atmospheric Space (NO rigid outer box container) */}
      <div
        onMouseEnter={() => setIsStageHovered(true)}
        onMouseLeave={() => {
          setIsStageHovered(false);
          pointerStartXRef.current = null;
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative left-1/2 w-screen -translate-x-1/2 select-none touch-pan-y"
      >
        {/* Subtle fading blueprint grid & radial mint wash dissolving cleanly into page background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_72%_49%_at_50%_50%,black_24%,transparent_100%)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 48%, rgba(29,158,117,0.08), transparent 65%), linear-gradient(to right, rgba(15,61,46,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,61,46,0.045) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 36px 36px, 36px 36px",
          }}
        />

        {/* ── Desktop Open Scatter (Ref 3) -> Centered Free-Flow Carousel (Ref 2) ── */}
        <div className="relative hidden h-[520px] w-full items-center justify-center md:flex">
          {!isAssembled && !shouldReduceMotion ? (
            <div className="relative h-full w-full">
              {FLOW_CARDS.map((card, cardIdx) => (
                <ScatterMorphCard
                  key={card.id}
                  card={card}
                  assembleProgress={assembleProgress}
                  onSelect={() => {
                    setIsAssembled(true);
                    setAnimated(false);
                    setTrackIdx(N + cardIdx);
                    setNavTick((t) => t + 1);
                    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="w-full [mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_86%,transparent_100%)]">
                <div className="relative left-1/2 w-[calc(236px*5+80px)] -translate-x-1/2 overflow-visible py-12">
                  <div
                    className={`flex items-center gap-[20px] motion-reduce:transition-none ${
                      animated
                        ? "transition-transform duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        : ""
                    }`}
                    style={{
                      transform: `translateX(calc(${-(trackIdx - 2)} * ${SLOT_W}px))`,
                    }}
                  >
                    {TRACK_SLIDES.map((card, idx) => {
                      const rel = idx - trackIdx;
                      const isFocused = rel === 0;
                      const isNeighbor = Math.abs(rel) === 1;
                      const isVisibleSlot = Math.abs(rel) <= 2;

                      return (
                        <div
                          key={`${card.id}-${idx}`}
                          onClick={() => {
                            if (!isFocused && isVisibleSlot && !didSwipeRef.current) {
                              stepCarousel(rel > 0 ? 1 : -1);
                            }
                          }}
                          className={`shrink-0 ${
                            animated
                              ? "transition-all duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                              : ""
                          } ${
                            isFocused
                              ? "z-30 -translate-y-4 scale-[1.07] opacity-100"
                              : isNeighbor
                                ? "z-20 translate-y-2.5 scale-[0.94] cursor-pointer opacity-95 hover:translate-y-1 hover:opacity-100"
                                : isVisibleSlot
                                  ? "z-10 translate-y-4 scale-[0.86] cursor-pointer opacity-60 hover:opacity-85"
                                  : "pointer-events-none z-0 translate-y-5 scale-[0.8] opacity-0"
                          }`}
                        >
                          <FlowCardBody
                            card={card}
                            isFocused={isFocused}
                            showFloatingTag={isFocused && isAssembled}
                            reducedMotion={shouldReduceMotion}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Clean floating edge prev/next buttons matching light Edukasi aesthetic */}
              <button
                type="button"
                onClick={() => stepCarousel(-1)}
                aria-label="Tahap sebelumnya"
                className="group/btn absolute left-6 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white/95 text-[#0F3D2E] shadow-[0_12px_28px_-10px_rgba(15,61,46,0.28)] backdrop-blur-sm transition-all hover:scale-110 hover:border-[#1D9E75]/50 hover:text-[#1D9E75] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] lg:left-12"
              >
                <ChevronLeft
                  size={19}
                  className="transition-transform group-hover/btn:-translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => stepCarousel(1)}
                aria-label="Tahap berikutnya"
                className="group/btn absolute right-6 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white/95 text-[#0F3D2E] shadow-[0_12px_28px_-10px_rgba(15,61,46,0.28)] backdrop-blur-sm transition-all hover:scale-110 hover:border-[#1D9E75]/50 hover:text-[#1D9E75] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] lg:right-12"
              >
                <ChevronRight
                  size={19}
                  className="transition-transform group-hover/btn:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>

        {/* ── Mobile Open Carousel (< 768px) ── */}
        <div className="px-4 py-8 md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {FLOW_CARDS.map((card, idx) => (
                <div key={card.id} className="flex w-full shrink-0 justify-center px-2">
                  <FlowCardBody
                    card={card}
                    isFocused={idx === activeIndex}
                    showFloatingTag={false}
                    reducedMotion={shouldReduceMotion}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Auto-Running Carousel Progress Dots Underneath Stage ── */}
      <motion.div
        initial={false}
        animate={
          isAssembled || shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0.45, y: 4 }
        }
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        onMouseEnter={() => setIsDotsHovered(true)}
        onMouseLeave={() => setIsDotsHovered(false)}
        className="mt-2 flex items-center justify-center gap-2.5"
      >
        <button
          type="button"
          onClick={() => stepCarousel(-1)}
          aria-label="Tahap sebelumnya"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white text-[#0F3D2E] shadow-sm transition-all hover:border-[#1D9E75]/45 active:scale-95 md:hidden"
        >
          <ChevronLeft size={15} aria-hidden="true" />
        </button>

        <div
          role="group"
          aria-label="Progres alur dokumentasi dan demo"
          className="flex items-center justify-center gap-2 py-1"
        >
          {FLOW_CARDS.map((card, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div key={card.id} className="group/dot relative flex items-center">
                <button
                  type="button"
                  onClick={() => jumpToStep(idx)}
                  aria-label={`Tahap ${card.step}: ${card.title}`}
                  aria-pressed={isActive}
                  className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2 ${
                    isActive
                      ? "w-8 bg-[#0F3D2E]/15"
                      : "w-2 bg-emerald-950/20 hover:scale-125 hover:bg-[#1D9E75]/65"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      key={`galeri-dot-${activeIndex}-${navTick}-${autoPaused ? "paused" : "run"}`}
                      initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                      animate={{
                        scaleX: shouldReduceMotion ? 1 : autoPaused ? 0.35 : 1,
                      }}
                      transition={
                        shouldReduceMotion || autoPaused
                          ? { duration: 0.2 }
                          : { duration: AUTO_SCROLL_MS / 1000, ease: "linear" }
                      }
                      style={{ transformOrigin: "left" }}
                      className="block h-full w-full rounded-full bg-[#1D9E75]"
                    />
                  )}
                </button>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0F3D2E] px-2.5 py-0.5 text-[10px] font-bold text-white opacity-0 shadow-sm transition-all duration-200 group-hover/dot:-translate-y-0.5 group-hover/dot:opacity-100 sm:inline-flex"
                >
                  {card.step} · {card.kicker}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => stepCarousel(1)}
          aria-label="Tahap berikutnya"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/[0.12] bg-white text-[#0F3D2E] shadow-sm transition-all hover:border-[#1D9E75]/45 active:scale-95 md:hidden"
        >
          <ChevronRight size={15} aria-hidden="true" />
        </button>
      </motion.div>
    </div>
  );
}
