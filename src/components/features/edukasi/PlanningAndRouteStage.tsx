"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  MapPin,
  Scale,
  ShieldCheck,
  Truck,
} from "lucide-react";

type DeckCardKey = "titik-kumpul" | "rute-jemput";
type RouteFeatureKey =
  | "titik-kumpul"
  | "rute-jemput"
  | "cek-fisik"
  | "timbang-aktual";

const AUTO_SWITCH_MS = 4800;

interface ActionRow {
  id: "step-1" | "step-2" | "step-3";
  icon: "pin" | "form" | "route" | "check" | "scale" | "shield";
  label: string;
}

interface DeckCardSpec {
  id: DeckCardKey;
  indexLabel: string;
  badge: string;
  windowLabel: string;
  cardHeading: string;
  summary: string;
  actions: [ActionRow, ActionRow, ActionRow];
  contextChip: string;
  promptHint: string;
}

const DECK_CARDS: Record<DeckCardKey, DeckCardSpec> = {
  "titik-kumpul": {
    id: "titik-kumpul",
    indexLabel: "01",
    badge: "OPSI 01",
    windowLabel: "Setor Langsung",
    cardHeading: "Penyerahan langsung di titik kumpul",
    summary:
      "Bawa botol PET atau kardus yang sudah terpilah ke bank sampah atau titik setor mitra.",
    actions: [
      {
        id: "step-1",
        icon: "pin",
        label: "Bawa PET & kardus terpilah ke bank sampah terdekat",
      },
      {
        id: "step-2",
        icon: "check",
        label: "Petugas cek kondisi bersih, kering, & lipat rata",
      },
      {
        id: "step-3",
        icon: "scale",
        label: "Timbang di tempat & catat berat aktual digital",
      },
    ],
    contextChip: "Titik Kumpul",
    promptHint: "Mengikuti jam operasional bank sampah & mitra setempat",
  },
  "rute-jemput": {
    id: "rute-jemput",
    indexLabel: "02",
    badge: "OPSI 02",
    windowLabel: "Penjemputan Rutin",
    cardHeading: "Penjemputan rutin oleh pengepul",
    summary:
      "Ajukan penjemputan dari rumah agar masuk ke jadwal rute pengepul yang sudah berjalan.",
    actions: [
      {
        id: "step-1",
        icon: "form",
        label: "Isi jenis material, perkiraan berat (kg), & tanggal usulan",
      },
      {
        id: "step-2",
        icon: "route",
        label: "Terjadwal searah rute pengepul di wilayah Surabaya",
      },
      {
        id: "step-3",
        icon: "scale",
        label: "Cek fisik & timbang aktual langsung di lokasi rumah",
      },
    ],
    contextChip: "Rute Pengepul",
    promptHint: "Rancangan jemput · Menunggu jadwal pengepul aktif",
  },
};

const RIGHT_FEATURES: {
  key: RouteFeatureKey;
  label: string;
}[] = [
  { key: "titik-kumpul", label: "Setor Langsung Titik Kumpul" },
  { key: "rute-jemput", label: "Penjemputan Rutin Pengepul" },
  { key: "cek-fisik", label: "Pemeriksaan Fisik Material" },
  { key: "timbang-aktual", label: "Penimbangan Aktual Digital" },
];

function ActionGlyph({
  kind,
  active,
}: {
  kind: ActionRow["icon"];
  active?: boolean;
}) {
  const cls = `h-3.5 w-3.5 shrink-0 transition-colors ${
    active ? "text-[#1D9E75]" : "text-[#426352]"
  }`;
  switch (kind) {
    case "pin":
      return <MapPin className={cls} aria-hidden="true" />;
    case "form":
      return <ClipboardCheck className={cls} aria-hidden="true" />;
    case "route":
      return <Truck className={cls} aria-hidden="true" />;
    case "shield":
      return <ShieldCheck className={cls} aria-hidden="true" />;
    case "scale":
      return <Scale className={cls} aria-hidden="true" />;
    default:
      return <CheckCircle2 className={cls} aria-hidden="true" />;
  }
}

/**
 * Showcase `#setor-atau-jemput` menyamai 1:1 mekanisme Switch Card 3D & tombol
 * `MaterialShowcaseStage.tsx`:
 * - Segmented glide switch (Titik Kumpul | Penjemputan Rutin)
 * - Auto-switch halus (4,8 detik, terjeda hanya saat kursor menyentuh deck kartu)
 * - Stepper `01/02 < >` pada kartu depan & indikator dot progres di bawah deck.
 */
export default function PlanningAndRouteStage() {
  const [frontCard, setFrontCard] = useState<DeckCardKey>("titik-kumpul");
  const [highlightedFeature, setHighlightedFeature] =
    useState<RouteFeatureKey>("titik-kumpul");
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function switchToCard(target: DeckCardKey) {
    setFrontCard(target);
    setHighlightedFeature(target);
  }

  function toggleDeck() {
    const next: DeckCardKey =
      frontCard === "titik-kumpul" ? "rute-jemput" : "titik-kumpul";
    switchToCard(next);
  }

  function handleFeatureSelect(key: RouteFeatureKey) {
    setHighlightedFeature(key);
    if (key === "titik-kumpul" || key === "rute-jemput") {
      setFrontCard(key);
    }
  }

  // Auto-switch smoothly between Titik Kumpul & Penjemputan Rutin; reset timer on manual switch
  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    const id = setTimeout(() => {
      const next: DeckCardKey =
        frontCard === "titik-kumpul" ? "rute-jemput" : "titik-kumpul";
      setFrontCard(next);
      setHighlightedFeature((curr) =>
        curr === "titik-kumpul" || curr === "rute-jemput" ? next : curr,
      );
    }, AUTO_SWITCH_MS);
    return () => clearTimeout(id);
  }, [paused, shouldReduceMotion, frontCard]);

  const highlightedStepId =
    highlightedFeature === "cek-fisik"
      ? "step-2"
      : highlightedFeature === "timbang-aktual"
        ? "step-3"
        : null;

  const cardsOrder: DeckCardKey[] = ["titik-kumpul", "rute-jemput"];

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Subtle radial atmospheric wash behind the stacked deck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 left-1/2 h-[420px] w-[min(92vw,760px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.09),transparent_70%)] blur-2xl"
      />

      {/* Headline Section + Clean 2-Segment Gliding Switch matching MaterialShowcaseStage */}
      <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
            Setor langsung atau
            <br />
            <span className="text-[#1D9E75]">penjemputan rutin</span>
          </h2>
        </div>

        {/* Clean 2-Segment Gliding Switch */}
        <div
          role="tablist"
          aria-label="Pilih cara penyerahan setoran"
          className="inline-flex w-fit items-center gap-1 rounded-2xl border border-emerald-950/10 bg-[#F2F8F4] p-1 shadow-[inset_0_1px_2px_rgba(15,61,46,0.05)]"
        >
          {(["titik-kumpul", "rute-jemput"] as DeckCardKey[]).map((key) => {
            const isSelected = frontCard === key;
            const Icon = key === "titik-kumpul" ? MapPin : Truck;

            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => switchToCard(key)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] ${
                  isSelected
                    ? "text-white"
                    : "text-[#426352] hover:text-[#0F3D2E]"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="route-segmented-active"
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
                  <span>
                    {key === "titik-kumpul" ? "Titik Kumpul" : "Penjemputan Rutin"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 12-Col Stage: 3D Depth-Swapping Card Deck (Left 8 cols) + Right Copy (Right 4 cols) */}
      <div className="relative z-10 mt-10 grid grid-cols-1 items-center gap-10 md:mt-12 md:grid-cols-12 md:gap-8 lg:gap-12">
        {/* Left–Center Deck Stage + Bottom Dots Indicator */}
        <div className="relative md:col-span-8">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="w-full max-w-[660px]"
          >
            <div
              className="relative min-h-[465px] w-full [--front-x:12%] sm:min-h-[418px] sm:[--front-x:42%]"
              style={{ perspective: 1200 }}
            >
              {cardsOrder.map((cardKey) => {
                const spec = DECK_CARDS[cardKey];
                const isFront = frontCard === cardKey;
                const IconComp = cardKey === "titik-kumpul" ? MapPin : Truck;

                return (
                  <motion.div
                    key={cardKey}
                    initial={false}
                    animate={{
                      x: isFront ? "var(--front-x)" : "0%",
                      y: isFront ? 0 : 44,
                      scale: isFront ? 1 : 0.91,
                      opacity: isFront ? 1 : 0.78,
                      zIndex: isFront ? 20 : 10,
                    }}
                    whileHover={
                      isFront || shouldReduceMotion
                        ? undefined
                        : { y: 38, opacity: 0.94 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 230,
                            damping: 26,
                            mass: 0.9,
                          }
                    }
                    style={{ transformOrigin: "top left" }}
                    onClick={
                      isFront ? undefined : () => switchToCard(cardKey)
                    }
                    role={isFront ? undefined : "button"}
                    tabIndex={isFront ? undefined : 0}
                    aria-label={
                      isFront
                        ? undefined
                        : `Tampilkan kartu ${spec.windowLabel} ke depan`
                    }
                    onKeyDown={
                      isFront
                        ? undefined
                        : (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              switchToCard(cardKey);
                            }
                          }
                    }
                    className={`absolute left-0 top-0 w-[88%] rounded-2xl border p-5 transition-shadow duration-300 sm:w-[70%] sm:p-6 ${
                      isFront
                        ? "border-emerald-950/[0.12] bg-white shadow-[0_28px_64px_-22px_rgba(15,61,46,0.22)]"
                        : "cursor-pointer border-emerald-950/[0.09] bg-[#F4FAF6]/95 shadow-[0_14px_30px_-18px_rgba(15,61,46,0.16)]"
                    }`}
                  >
                    {/* Signature Overlapping Corner Emblem Badge on Back Card */}
                    <motion.div
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        opacity: isFront ? 0 : 1,
                        scale: isFront ? 0.75 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="pointer-events-none absolute -top-5 left-5 z-10 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#0F3D2E]/80 bg-white shadow-sm"
                    >
                      <IconComp className="h-5 w-5 text-[#0F3D2E]" />
                    </motion.div>

                    {/* Top Card Bar + Clean Stepper Arrows (`01/02 < >`) matching MaterialShowcaseStage */}
                    <div className="flex items-center justify-between gap-2 text-xs text-[#426352]">
                      <span className="inline-flex items-center gap-1.5 font-bold text-[#0F3D2E]">
                        <span className="rounded-md bg-[#EFF8F3] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#1D9E75]">
                          {spec.badge}
                        </span>
                        <span>{spec.windowLabel}</span>
                      </span>

                      {isFront ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold tabular-nums text-[#426352]/75">
                            {spec.indexLabel}/02
                          </span>
                          <button
                            type="button"
                            onClick={toggleDeck}
                            aria-label="Lihat opsi penyerahan sebelumnya"
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-950/12 bg-[#FAFDFB] text-[#0F3D2E] transition-colors hover:border-[#1D9E75]/40 hover:bg-[#EFF8F3]"
                          >
                            <ChevronLeft size={13} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={toggleDeck}
                            aria-label="Lihat opsi penyerahan berikutnya"
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

                    {/* Card Header & Icon */}
                    <div className="mt-4">
                      <div
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                          isFront
                            ? "border-emerald-950/[0.1] bg-[#F4FAF6] text-[#0F3D2E]"
                            : "border-emerald-950/[0.06] bg-white text-[#426352]"
                        }`}
                      >
                        <IconComp size={18} aria-hidden="true" />
                      </div>

                      <h3 className="mt-3 text-base font-extrabold tracking-tight text-[#0F3D2E] sm:text-[17px]">
                        {spec.cardHeading}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#426352]">
                        {spec.summary}
                      </p>
                    </div>

                    {/* 3 Action Rows */}
                    <ul className="mt-3.5 space-y-1.5">
                      {spec.actions.map((row) => {
                        const isStepHighlighted =
                          isFront && highlightedStepId === row.id;
                        return (
                          <li
                            key={row.label}
                            className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                              isStepHighlighted
                                ? "border-[#1D9E75]/45 bg-[#EFF8F3] text-[#0F3D2E]"
                                : "border-transparent text-[#2D5542]"
                            }`}
                          >
                            <ActionGlyph
                              kind={row.icon}
                              active={isStepHighlighted}
                            />
                            <span>{row.label}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Clean Bottom Context Pill Box matching MaterialShowcaseStage */}
                    <div className="mt-4 rounded-xl border border-emerald-950/[0.09] bg-[#FAFDFB] p-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-950/[0.08] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0F3D2E]">
                        <IconComp
                          size={11}
                          className="text-[#1D9E75]"
                          aria-hidden="true"
                        />
                        <span>{spec.contextChip}</span>
                      </span>

                      <p className="mt-1.5 px-0.5 text-[11px] text-[#527362]">
                        {spec.promptHint}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Carousel Dots Indicator matching MaterialShowcaseStage 1:1 */}
            <div
              role="tablist"
              aria-label="Navigasi titik kartu opsi setor"
              className="mt-5 flex items-center justify-center gap-2"
            >
              {cardsOrder.map((cardKey) => {
                const isActive = frontCard === cardKey;
                const spec = DECK_CARDS[cardKey];
                return (
                  <button
                    key={cardKey}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Tampilkan kartu ${spec.windowLabel}`}
                    onClick={() => switchToCard(cardKey)}
                    className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] ${
                      isActive
                        ? "w-8 bg-[#0F3D2E]/15"
                        : "w-2 bg-emerald-950/20 hover:bg-[#1D9E75]/60"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        key={`${frontCard}-${paused ? "paused" : "run"}`}
                        initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                        animate={{
                          scaleX: shouldReduceMotion ? 1 : paused ? 0.35 : 1,
                        }}
                        transition={
                          shouldReduceMotion || paused
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
        </div>

        {/* Right Column: Concise Statement + Vertical Feature Selector List */}
        <div className="space-y-6 md:col-span-4">
          <p className="text-base leading-relaxed text-[#426352] sm:text-[17px]">
            <strong className="font-bold text-[#0F3D2E]">
              BONI menghubungkan setoran warga
            </strong>{" "}
            ke rute pengepul dan bank sampah yang sudah berjalan.
          </p>

          <div>
            <p className="text-xs font-semibold text-[#527362]">
              Fitur Rancangan
            </p>
            <ul
              role="tablist"
              aria-label="Pilih rincian opsi setor atau jemput"
              className="mt-2.5 space-y-1.5"
            >
              {RIGHT_FEATURES.map((item) => {
                const isActive = highlightedFeature === item.key;
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleFeatureSelect(item.key)}
                      className={`group flex w-full items-center gap-2 text-left text-sm font-bold transition-colors ${
                        isActive
                          ? "text-[#1D9E75]"
                          : "text-[#0F3D2E]/85 hover:text-[#1D9E75]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                          isActive
                            ? "scale-100 bg-[#1D9E75]"
                            : "scale-0 bg-[#1D9E75]/50 group-hover:scale-100"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-emerald-950/[0.08] pt-4 text-xs font-bold">
            <a
              href="#setelah-ditimbang"
              className="group inline-flex items-center gap-1 text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
            >
              <span>Syarat bukti timbang</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <Link
              href="/login?role=warga"
              className="group inline-flex items-center gap-1 text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
            >
              <span>Uji Aksi Hijau</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
