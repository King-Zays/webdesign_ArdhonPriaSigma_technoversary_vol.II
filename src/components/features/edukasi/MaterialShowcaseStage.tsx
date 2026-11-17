"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Layers,
  Package,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type MaterialCardKey = "botol-pet" | "kardus";
type MaterialFeatureKey =
  | "botol-pet"
  | "kardus"
  | "bersih-kering"
  | "bebas-residu";

const AUTO_SWITCH_MS = 4800;

interface MaterialActionRow {
  id: "step-1" | "step-2" | "step-3";
  icon: "recycle" | "droplets" | "shield" | "package" | "layers" | "check";
  label: string;
}

interface MaterialCardSpec {
  id: MaterialCardKey;
  indexLabel: string;
  badge: string;
  windowLabel: string;
  cardHeading: string;
  summary: string;
  actions: [MaterialActionRow, MaterialActionRow, MaterialActionRow];
  contextChip: string;
  promptHint: string;
}

const MATERIAL_CARDS: Record<MaterialCardKey, MaterialCardSpec> = {
  "botol-pet": {
    id: "botol-pet",
    indexLabel: "01",
    badge: "MATERIAL 01",
    windowLabel: "Botol Plastik PET",
    cardHeading: "Standar botol plastik PET kode 1",
    summary:
      "Botol air mineral dan minuman bening/biru muda bertanda segitiga angka 1.",
    actions: [
      {
        id: "step-1",
        icon: "recycle",
        label: "Kenali simbol segitiga angka 1 (PET) di dasar botol",
      },
      {
        id: "step-2",
        icon: "droplets",
        label: "Kosongkan cairan, bilas seperlunya, & tiriskan kering",
      },
      {
        id: "step-3",
        icon: "shield",
        label: "Pisahkan dari sachet foil dan sisa makanan basah",
      },
    ],
    contextChip: "Kode 1 (PET) · 0 Residu Cair",
    promptHint: "Tanyakan ke mitra setempat soal aturan tutup & label botol",
  },
  kardus: {
    id: "kardus",
    indexLabel: "02",
    badge: "MATERIAL 02",
    windowLabel: "Kardus & Karton",
    cardHeading: "Standar kardus dan karton kering",
    summary:
      "Boks paket, karton belanja, dan kemasan kering yang bersih serta siap ditimbang.",
    actions: [
      {
        id: "step-1",
        icon: "package",
        label: "Keluarkan plastik, bubble wrap, styrofoam, & lakban",
      },
      {
        id: "step-2",
        icon: "check",
        label: "Pastikan serat karton kering, bebas minyak & jamur",
      },
      {
        id: "step-3",
        icon: "layers",
        label: "Lipat rata agar ringkas diangkut & mudah ditimbang",
      },
    ],
    contextChip: "Lipat Rata · Tanpa Busa",
    promptHint: "Bagian karton yang berminyak disisihkan ke kategori residu",
  },
};

const LEFT_FEATURES: {
  key: MaterialFeatureKey;
  label: string;
  anchorId?: MaterialCardKey;
}[] = [
  { key: "botol-pet", label: "Botol Plastik PET (Kode 1)", anchorId: "botol-pet" },
  { key: "kardus", label: "Kardus & Karton Kering", anchorId: "kardus" },
  { key: "bersih-kering", label: "Cek Kondisi Bersih & Kering" },
  { key: "bebas-residu", label: "Pisahkan dari Residu & Sachet" },
];

function MaterialActionGlyph({
  kind,
  active,
}: {
  kind: MaterialActionRow["icon"];
  active?: boolean;
}) {
  const cls = `h-3.5 w-3.5 shrink-0 transition-colors ${
    active ? "text-[#1D9E75]" : "text-[#426352]"
  }`;
  switch (kind) {
    case "recycle":
      return <Recycle className={cls} aria-hidden="true" />;
    case "droplets":
      return <Droplets className={cls} aria-hidden="true" />;
    case "shield":
      return <ShieldCheck className={cls} aria-hidden="true" />;
    case "package":
      return <Package className={cls} aria-hidden="true" />;
    case "layers":
      return <Layers className={cls} aria-hidden="true" />;
    default:
      return <CheckCircle2 className={cls} aria-hidden="true" />;
  }
}

/**
 * Showcase `#material-setoran` dengan mekanisme auto-switch & tumpukan kartu 3D:
 * - Segmented glide switch (Botol PET | Kardus) dengan indikator timer halus
 * - Auto-switch hidup antar material (berhenti sementara saat diarahkan kursor/fokus)
 * - Kontrol langkah bulat `<` `>` di sudut kartu selaras carousel Edukasi lainnya.
 */
export default function MaterialShowcaseStage() {
  const [frontCard, setFrontCard] = useState<MaterialCardKey>("botol-pet");
  const [highlightedFeature, setHighlightedFeature] =
    useState<MaterialFeatureKey>("botol-pet");
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function switchToCard(target: MaterialCardKey) {
    setFrontCard(target);
    setHighlightedFeature(target);
  }

  function toggleDeck() {
    const next: MaterialCardKey =
      frontCard === "botol-pet" ? "kardus" : "botol-pet";
    switchToCard(next);
  }

  function handleFeatureSelect(key: MaterialFeatureKey) {
    setHighlightedFeature(key);
    if (key === "botol-pet" || key === "kardus") {
      setFrontCard(key);
    }
  }

  // Auto-switch smoothly between Botol PET & Kardus; reset timer on manual switch
  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    const id = setTimeout(() => {
      const next: MaterialCardKey =
        frontCard === "botol-pet" ? "kardus" : "botol-pet";
      setFrontCard(next);
      setHighlightedFeature((curr) =>
        curr === "botol-pet" || curr === "kardus" ? next : curr,
      );
    }, AUTO_SWITCH_MS);
    return () => clearTimeout(id);
  }, [paused, shouldReduceMotion, frontCard]);

  const highlightedStepId =
    highlightedFeature === "bersih-kering"
      ? "step-2"
      : highlightedFeature === "bebas-residu"
        ? "step-3"
        : null;

  const cardsOrder: MaterialCardKey[] = ["botol-pet", "kardus"];

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Subtle radial atmospheric wash behind the right card deck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 right-0 h-[420px] w-[min(92vw,720px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.09),transparent_70%)] blur-2xl"
      />

      {/* Headline Section + Clean 2-Segment Gliding Switch */}
      <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
            Botol PET dan kardus
            <br />
            <span className="text-[#1D9E75]">yang layak disetor</span>
          </h2>
        </div>

        {/* Clean 2-Segment Gliding Switch (pauses auto-switch only when card deck is hovered, zero timer indicator) */}
        <div
          role="tablist"
          aria-label="Pilih material utama setoran"
          className="inline-flex w-fit items-center gap-1 rounded-2xl border border-emerald-950/10 bg-[#F2F8F4] p-1 shadow-[inset_0_1px_2px_rgba(15,61,46,0.05)]"
        >
          {(["botol-pet", "kardus"] as MaterialCardKey[]).map((key) => {
            const isSelected = frontCard === key;
            const Icon = key === "botol-pet" ? Recycle : Package;

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
                    layoutId="material-segmented-active"
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
                    {key === "botol-pet" ? "Botol PET" : "Kardus Kering"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 12-Col Stage: Text Left (4 cols) + Stacked Switch Card Deck Right (8 cols) */}
      <div className="relative z-10 mt-10 grid grid-cols-1 items-center gap-10 md:mt-12 md:grid-cols-12 md:gap-8 lg:gap-12">
        {/* Left Column: Concise Statement + Vertical Standard Selector List */}
        <div className="space-y-6 md:col-span-4">
          <p className="text-base leading-relaxed text-[#426352] sm:text-[17px]">
            <strong className="font-bold text-[#0F3D2E]">
              Dua material utama alur setoran BONI
            </strong>{" "}
            adalah botol plastik PET (kode 1) dan kardus kering sebelum ditimbang pengepul.
          </p>

          <div>
            <p className="text-xs font-semibold text-[#527362]">
              Standar Pemilahan
            </p>
            <ul
              role="tablist"
              aria-label="Pilih detail standar material"
              className="mt-2.5 space-y-1.5"
            >
              {LEFT_FEATURES.map((item) => {
                const isActive = highlightedFeature === item.key;
                return (
                  <li key={item.key}>
                    <button
                      id={item.anchorId}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleFeatureSelect(item.key)}
                      className={`group flex w-full scroll-mt-24 items-center gap-2 text-left text-sm font-bold transition-colors ${
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
              href="#cek-kesiapan"
              className="group inline-flex items-center gap-1 text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
            >
              <span>Lanjut ke checklist kesiapan</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#setor-atau-jemput"
              className="group inline-flex items-center gap-1 text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
            >
              <span>Lihat opsi setor</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Depth-Swapping Card Deck + Bottom Carousel Dots */}
        <div className="relative md:col-span-8">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="w-full max-w-[660px] md:ml-auto"
          >
            <div
              className="relative grid w-full pb-6 [--back-x:12%] sm:[--back-x:42%]"
              style={{ perspective: 1200 }}
            >
            {cardsOrder.map((cardKey) => {
              const spec = MATERIAL_CARDS[cardKey];
              const isFront = frontCard === cardKey;
              const IconComp = cardKey === "botol-pet" ? Recycle : Package;

              return (
                <motion.div
                  key={cardKey}
                  initial={false}
                  animate={{
                    x: isFront ? "0%" : "var(--back-x)",
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
                  style={{ transformOrigin: "top right" }}
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
                  className={`relative col-start-1 row-start-1 w-[88%] self-start rounded-2xl border p-5 transition-shadow duration-300 sm:w-[70%] sm:p-6 ${
                    isFront
                      ? "border-emerald-950/[0.12] bg-white shadow-[0_28px_64px_-22px_rgba(15,61,46,0.22)]"
                      : "cursor-pointer border-emerald-950/[0.09] bg-[#F4FAF6]/95 shadow-[0_14px_30px_-18px_rgba(15,61,46,0.16)]"
                  }`}
                >
                  {/* Overlapping Corner Emblem Badge on Back Card (top-right edge) */}
                  <motion.div
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      opacity: isFront ? 0 : 1,
                      scale: isFront ? 0.75 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="pointer-events-none absolute -top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#0F3D2E]/80 bg-white shadow-sm"
                  >
                    <IconComp className="h-5 w-5 text-[#0F3D2E]" />
                  </motion.div>

                  {/* Top Card Bar + Clean Stepper Arrows (`01/02 < >`) matching Edukasi UI */}
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
                          aria-label="Lihat material sebelumnya"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-950/12 bg-[#FAFDFB] text-[#0F3D2E] transition-colors hover:border-[#1D9E75]/40 hover:bg-[#EFF8F3]"
                        >
                          <ChevronLeft size={13} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={toggleDeck}
                          aria-label="Lihat material berikutnya"
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

                  {/* 3 Standard Rules Rows */}
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
                          <MaterialActionGlyph
                            kind={row.icon}
                            active={isStepHighlighted}
                          />
                          <span>{row.label}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Bottom Context Pill Box */}
                  <div className="mt-4 rounded-xl border border-emerald-950/[0.09] bg-[#FAFDFB] p-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-950/[0.08] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0F3D2E]">
                      <Sparkles
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

            {/* Bottom Carousel Dots Indicator */}
            <div
              role="tablist"
              aria-label="Navigasi titik kartu material"
              className="mt-6 flex items-center justify-center gap-2"
            >
              {cardsOrder.map((cardKey) => {
                const isActive = frontCard === cardKey;
                const spec = MATERIAL_CARDS[cardKey];
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
      </div>
    </div>
  );
}
