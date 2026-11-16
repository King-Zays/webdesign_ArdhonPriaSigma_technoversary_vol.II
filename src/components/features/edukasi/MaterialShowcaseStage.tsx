"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Info,
  Leaf,
  XCircle,
} from "lucide-react";

type MaterialKey = "botol-pet" | "kardus";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface VisualStep {
  step: string;
  title: string;
  caption: string;
}

interface MaterialGuideSpec {
  id: MaterialKey;
  number: string;
  code: string;
  tabLabel: string;
  shortTitle: string;
  shortSummary: string;
  chips: string[];
  title: string;
  focus: string;
  visualSteps: [VisualStep, VisualStep, VisualStep];
  accepted: string[];
  avoided: string[];
  note: string;
}

const MATERIAL_SPECS: Record<MaterialKey, MaterialGuideSpec> = {
  "botol-pet": {
    id: "botol-pet",
    number: "01",
    code: "MATERIAL 01 · PET (KODE 1)",
    tabLabel: "Botol PET",
    shortTitle: "Botol plastik PET",
    shortSummary: "Botol minuman bening/biru muda dengan simbol segitiga angka 1.",
    chips: ["Kode 1 (PET)", "Kosong & Kering", "0 Residu Cair"],
    title: "Standar fisik botol plastik PET",
    focus:
      "Kenali simbol segitiga angka 1, pastikan botol kosong dan ditiriskan kering, lalu pisahkan dari sampah dapur.",
    visualSteps: [
      {
        step: "01",
        title: "Cek Simbol PET 1",
        caption: "Segitiga kode 1 di dasar/label botol",
      },
      {
        step: "02",
        title: "Bilas & Tiriskan",
        caption: "Kosongkan cairan agar berat akurat",
      },
      {
        step: "03",
        title: "Simpan Terpisah",
        caption: "Jauhkan dari sachet & sisa makanan",
      },
    ],
    accepted: [
      "Botol air mineral & minuman bening/biru muda kode 1",
      "Kondisi bersih, sudah ditiriskan, dan tidak lengket",
      "Terpisah dari plastik lain dan sisa makanan",
    ],
    avoided: [
      "Plastik sachet berlapis foil atau kemasan berminyak",
      "Botol yang masih berisi cairan atau bercampur sampah dapur",
    ],
    note: "Tanyakan ke titik setoran atau bank sampah setempat apakah tutup dan label botol perlu dilepas.",
  },
  kardus: {
    id: "kardus",
    number: "02",
    code: "MATERIAL 02 · KARTON KERING",
    tabLabel: "Kardus",
    shortTitle: "Kardus dan karton",
    shortSummary: "Boks paket dan kemasan karton kering yang sudah dilipat rata.",
    chips: ["Lipat Rata", "Bebas Minyak", "Tanpa Plastik/Busa"],
    title: "Standar fisik kardus & karton",
    focus:
      "Jaga serat kardus tetap kering dan bebas minyak, keluarkan plastik/styrofoam isi, lalu lipat rata sebelum ditimbang.",
    visualSteps: [
      {
        step: "01",
        title: "Keluarkan Isi Non-Kertas",
        caption: "Lepas plastik, bubble wrap, & styrofoam",
      },
      {
        step: "02",
        title: "Pastikan Kering",
        caption: "Bebas rembesan air, minyak, & jamur",
      },
      {
        step: "03",
        title: "Lipat Rata",
        caption: "Ringkas diikat & mudah ditimbang",
      },
    ],
    accepted: [
      "Kardus paket, boks karton belanja, dan kemasan kering",
      "Sudah dilipat rata tanpa plastik, styrofoam, atau busa",
      "Bebas minyak, jamur, dan noda basah",
    ],
    avoided: [
      "Kardus bekas makanan berminyak atau basah kehujanan",
      "Karton yang masih berisi kemasan plastik atau residu",
    ],
    note: "Bagian karton yang terkena noda minyak makanan perlu dipotong atau dipisahkan ke wadah residu.",
  },
};

function StepIllustration({
  material,
  index,
}: {
  material: MaterialKey;
  index: number;
}) {
  if (material === "botol-pet") {
    if (index === 0) {
      return (
        <svg viewBox="0 0 64 48" className="h-11 w-14" fill="none" aria-hidden="true">
          <rect x="8" y="6" width="48" height="36" rx="8" fill="#EFF8F3" stroke="#1D9E75" strokeOpacity="0.3" />
          <path d="M32 13L42 30H22L32 13Z" fill="#FFFFFF" stroke="#0F3D2E" strokeWidth="1.6" strokeLinejoin="round" />
          <text x="32" y="27.5" textAnchor="middle" fill="#1D9E75" fontSize="9.5" fontWeight="800">
            1
          </text>
          <text x="32" y="38" textAnchor="middle" fill="#0F3D2E" fontSize="6.5" fontWeight="700" letterSpacing="0.08em">
            PET
          </text>
        </svg>
      );
    }
    if (index === 1) {
      return (
        <svg viewBox="0 0 64 48" className="h-11 w-14" fill="none" aria-hidden="true">
          <rect x="8" y="6" width="48" height="36" rx="8" fill="#EFF8F3" stroke="#1D9E75" strokeOpacity="0.3" />
          <rect x="27" y="10" width="10" height="4" rx="1.5" fill="#1D9E75" />
          <rect x="23" y="14" width="18" height="23" rx="4" fill="#FFFFFF" stroke="#0F3D2E" strokeWidth="1.5" />
          <path d="M26 23H38M26 28H35" stroke="#1D9E75" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2" />
          <circle cx="45" cy="16" r="4.5" fill="#1D9E75" />
          <path d="M43.2 16L44.5 17.3L47 14.7" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 64 48" className="h-11 w-14" fill="none" aria-hidden="true">
        <rect x="8" y="6" width="48" height="36" rx="8" fill="#EFF8F3" stroke="#1D9E75" strokeOpacity="0.3" />
        <rect x="15" y="14" width="14" height="21" rx="3" fill="#FFFFFF" stroke="#0F3D2E" strokeWidth="1.4" />
        <rect x="35" y="14" width="14" height="21" rx="3" fill="#FFFFFF" stroke="#1D9E75" strokeWidth="1.4" />
        <path d="M32 12V36" stroke="#1D9E75" strokeWidth="1.2" strokeDasharray="2.5 2.5" />
      </svg>
    );
  }

  if (index === 0) {
    return (
      <svg viewBox="0 0 64 48" className="h-11 w-14" fill="none" aria-hidden="true">
        <rect x="8" y="6" width="48" height="36" rx="8" fill="#EFF8F3" stroke="#1D9E75" strokeOpacity="0.3" />
        <rect x="18" y="16" width="28" height="19" rx="2.5" fill="#FFFFFF" stroke="#0F3D2E" strokeWidth="1.5" />
        <path d="M18 22H46" stroke="#1D9E75" strokeWidth="1.3" />
        <path d="M29 12L32 9L35 12M32 9V15" stroke="#1D9E75" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 64 48" className="h-11 w-14" fill="none" aria-hidden="true">
        <rect x="8" y="6" width="48" height="36" rx="8" fill="#EFF8F3" stroke="#1D9E75" strokeOpacity="0.3" />
        <rect x="19" y="14" width="26" height="20" rx="2.5" fill="#FFFFFF" stroke="#0F3D2E" strokeWidth="1.5" />
        <path d="M24 21H40M24 26H36" stroke="#1D9E75" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="44" cy="15" r="4.5" fill="#1D9E75" />
        <path d="M42.2 15L43.5 16.3L46 13.7" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 48" className="h-11 w-14" fill="none" aria-hidden="true">
      <rect x="8" y="6" width="48" height="36" rx="8" fill="#EFF8F3" stroke="#1D9E75" strokeOpacity="0.3" />
      <rect x="16" y="18" width="32" height="4.5" rx="1.5" fill="#FFFFFF" stroke="#0F3D2E" strokeWidth="1.3" />
      <rect x="16" y="24.5" width="32" height="4.5" rx="1.5" fill="#FFFFFF" stroke="#0F3D2E" strokeWidth="1.3" />
      <rect x="16" y="31" width="32" height="4.5" rx="1.5" fill="#FFFFFF" stroke="#1D9E75" strokeWidth="1.3" />
    </svg>
  );
}

/**
 * Showcase spesifikasi material #material-setoran yang selaras dengan
 * ritme bagian Edukasi lainnya:
 * - Header 5/6 kolom konsisten di atas
 * - Panggung interaktif terpadu dengan pemilih kartu di kiri dan
 *   diagram 3-langkah + perbandingan layak/hindari di kanan.
 */
export default function MaterialShowcaseStage() {
  const [selectedId, setSelectedId] = useState<MaterialKey>("botol-pet");
  const active = MATERIAL_SPECS[selectedId];

  return (
    <div>
      {/* Section Header matching Sections 02, 04, and 05 of Edukasi */}
      <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
            Material layak setor:<br />
            <span className="text-[#1D9E75]">PET dan kardus</span>
          </h2>
        </div>

        <div className="space-y-4 md:col-span-6 md:col-start-7">
          <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
            Dua material utama alur setoran BONI adalah botol plastik PET (kode 1) dan kardus kering. Pilih jenis material di bawah untuk melihat standar fisik sebelum ditimbang pengepul.
          </p>
          <a
            href="#cek-kesiapan"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
          >
            <span>Lanjut ke checklist kesiapan</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Unified Interactive Showcase Container */}
      <div className="rounded-2xl border border-emerald-900/12 bg-[#F2F8F4] p-4 shadow-[0_14px_34px_-16px_rgba(15,61,46,0.08)] sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-stretch lg:gap-7">
          {/* Left Column: Clean Material Selector Rail + Field Note */}
          <div className="flex flex-col justify-between gap-4 md:col-span-4">
            <div
              role="tablist"
              aria-label="Pilih material utama setoran"
              className="space-y-3"
            >
              {(["botol-pet", "kardus"] as MaterialKey[]).map((key) => {
                const spec = MATERIAL_SPECS[key];
                const isActive = selectedId === key;
                return (
                  <button
                    key={key}
                    id={spec.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedId(key)}
                    className={`group relative block w-full scroll-mt-24 overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] ${
                      isActive
                        ? "border-emerald-900/15 bg-white shadow-[0_12px_28px_-14px_rgba(15,61,46,0.16)]"
                        : "border-transparent bg-white/55 hover:bg-white/85"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="material-active-bar"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-[#1D9E75]"
                      />
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
                        {spec.code}
                      </span>
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                          isActive
                            ? "bg-[#0F3D2E] text-white"
                            : "bg-emerald-950/[0.06] text-[#426352]"
                        }`}
                      >
                        {spec.number}
                      </span>
                    </div>

                    <p className="mt-1.5 text-base font-extrabold tracking-tight text-[#0F3D2E]">
                      {spec.shortTitle}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#426352]">
                      {spec.shortSummary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {spec.chips.map((chip) => (
                        <span
                          key={chip}
                          className={`rounded-md px-2 py-0.5 text-[10.5px] font-semibold transition-colors ${
                            isActive
                              ? "border border-emerald-900/10 bg-[#F2F8F4] text-[#0F3D2E]"
                              : "bg-emerald-950/[0.04] text-[#426352]"
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Practical non-redundant note at bottom of left rail */}
            <div className="rounded-xl border border-emerald-900/10 bg-white/80 p-3.5 text-xs leading-relaxed text-[#2D5542]">
              <div className="flex items-start gap-2.5">
                <Info
                  size={15}
                  className="mt-0.5 shrink-0 text-[#1D9E75]"
                  aria-hidden="true"
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedId}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                  >
                    <strong className="font-bold text-[#0F3D2E]">
                      Catatan lapangan:{" "}
                    </strong>
                    {active.note}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Inspection Board & Comparison */}
          <div
            role="tabpanel"
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-900/12 bg-white shadow-[0_20px_44px_-16px_rgba(15,61,46,0.12)] md:col-span-8"
          >
            {/* Top Window Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 bg-[#FAFDFB] px-5 py-3">
              <div className="flex items-center gap-2 text-xs text-[#426352]">
                <Leaf size={13} className="text-[#1D9E75]" aria-hidden="true" />
                <span className="font-bold text-[#0F3D2E]">standar-pilah</span>
                <span aria-hidden="true">›</span>
                <span className="font-medium text-[#2D5542]">
                  {active.tabLabel}
                </span>
              </div>

              <span className="rounded-full border border-emerald-200 bg-[#E8F8F0] px-2.5 py-0.5 text-[10.5px] font-bold text-[#0F3D2E]">
                3 Syarat Utama · Siap Timbang
              </span>
            </div>

            {/* Animated Panel Content */}
            <div className="flex-1 p-5 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                  className="space-y-5"
                >
                  {/* Compact Header inside right board */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
                      {active.code}
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-2xl">
                      {active.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#426352] sm:text-[13px]">
                      {active.focus}
                    </p>
                  </div>

                  {/* 3-Step Visual Anatomy Strip */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {active.visualSteps.map((vs, idx) => (
                      <div
                        key={vs.step}
                        className="flex items-center gap-3 rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-3 sm:flex-col sm:items-start sm:gap-2"
                      >
                        <div className="flex w-full items-center justify-between">
                          <StepIllustration material={selectedId} index={idx} />
                          <span className="hidden font-mono text-[10.5px] font-bold text-[#1D9E75]/80 sm:inline">
                            {vs.step}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0F3D2E]">
                            {vs.title}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-snug text-[#426352]">
                            {vs.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Side-by-Side Comparison Panels */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div className="rounded-xl border border-emerald-200/80 bg-[#F4FAF6] p-4">
                      <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                        <CheckCircle2
                          size={13}
                          className="text-[#1D9E75]"
                          aria-hidden="true"
                        />
                        <span>Layak disetor</span>
                      </p>
                      <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#2D5542]">
                        {active.accepted.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check
                              size={13}
                              className="mt-0.5 shrink-0 text-[#1D9E75]"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-amber-200/80 bg-amber-50/75 p-4">
                      <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-950">
                        <XCircle
                          size={13}
                          className="text-amber-700"
                          aria-hidden="true"
                        />
                        <span>Hindari mencampur</span>
                      </p>
                      <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-amber-950/90">
                        {active.avoided.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
