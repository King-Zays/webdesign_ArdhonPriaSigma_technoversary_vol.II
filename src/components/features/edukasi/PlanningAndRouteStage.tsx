"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ClipboardCheck,
  Clock,
  MapPin,
  Scale,
  Truck,
} from "lucide-react";

type DepositModeKey = "setor-langsung" | "jemput-rumah";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RouteFlowStep {
  step: string;
  title: string;
  caption: string;
}

interface DepositModeSpec {
  id: DepositModeKey;
  number: string;
  tabLabel: string;
  badge: string;
  shortTitle: string;
  shortSummary: string;
  chips: string[];
  title: string;
  description: string;
  flowSteps: [RouteFlowStep, RouteFlowStep, RouteFlowStep];
  cards: {
    icon: "route" | "scale";
    title: string;
    detail: string;
  }[];
}

const DEPOSIT_MODES: Record<DepositModeKey, DepositModeSpec> = {
  "setor-langsung": {
    id: "setor-langsung",
    number: "01",
    tabLabel: "Titik Kumpul",
    badge: "OPSI 01 · SETOR LANGSUNG",
    shortTitle: "Setor ke titik kumpul",
    shortSummary:
      "Warga membawa sendiri PET atau kardus terpilah ke bank sampah / titik setoran terdekat.",
    chips: ["Titik Bank Sampah", "Jam Operasional", "Timbang di Tempat"],
    title: "Penyerahan langsung di titik kumpul",
    description:
      "Bawa botol PET atau kardus yang sudah terpilah langsung ke bank sampah, titik setoran, atau pengepul mitra terdekat sesuai jadwal penerimaan.",
    flowSteps: [
      {
        step: "01",
        title: "Bawa ke Titik Kumpul",
        caption: "Serahkan pada jam operasional mitra setempat",
      },
      {
        step: "02",
        title: "Pemeriksaan Fisik",
        caption: "Pastikan bersih, kering, & bebas kontaminan",
      },
      {
        step: "03",
        title: "Timbang Aktual",
        caption: "Dicatat langsung di timbangan digital mitra",
      },
    ],
    cards: [
      {
        icon: "route",
        title: "Jadwal bank sampah & titik setoran",
        detail:
          "Material diterima sesuai standar bersih dan kering pada jam operasional titik setoran setempat.",
      },
      {
        icon: "scale",
        title: "Timbang langsung bersama petugas",
        detail:
          "Ditimbang di tempat menggunakan timbangan digital mitra untuk memperoleh berat aktual transaksi.",
      },
    ],
  },
  "jemput-rumah": {
    id: "jemput-rumah",
    number: "02",
    tabLabel: "Jemput Rumah",
    badge: "OPSI 02 · RUTE PENGEPUL",
    shortTitle: "Penjemputan dari rumah",
    shortSummary:
      "Ajukan penjemputan dengan jenis material, perkiraan berat (kg), wilayah, dan tanggal usulan.",
    chips: ["Isi Form Jemput", "Rute Berjalan", "Timbang di Lokasi"],
    title: "Penjemputan mengikuti rute pengepul",
    description:
      "Isi pengajuan jemput dengan jenis material, perkiraan berat (kg), wilayah, dan tanggal usulan agar masuk ke rute pengepul yang sudah berjalan.",
    flowSteps: [
      {
        step: "01",
        title: "Ajukan Permintaan",
        caption: "Cantumkan material, estimasi kg, & wilayah",
      },
      {
        step: "02",
        title: "Masuk Rute Berjalan",
        caption: "Dijadwalkan searah rute pengepul mitra",
      },
      {
        step: "03",
        title: "Cek Fisik & Timbang",
        caption: "Petugas memeriksa & menimbang di rumah",
      },
    ],
    cards: [
      {
        icon: "route",
        title: "Terjadwal di rute pengepul berjalan",
        detail:
          "Mencantumkan jenis material, estimasi berat, wilayah, serta tanggal usulan agar penjemputan efisien.",
      },
      {
        icon: "scale",
        title: "Pemeriksaan fisik & timbang di lokasi",
        detail:
          "Petugas memastikan botol PET dan kardus bebas minyak/cairan sebelum dicatat timbangan digital.",
      },
    ],
  },
};

function RouteStepGraphic({
  mode,
  index,
}: {
  mode: DepositModeKey;
  index: number;
}) {
  if (index === 0) {
    return mode === "setor-langsung" ? (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/10 bg-[#EFF8F3] text-[#1D9E75]">
        <MapPin size={17} aria-hidden="true" />
      </span>
    ) : (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/10 bg-[#EFF8F3] text-[#1D9E75]">
        <ClipboardCheck size={17} aria-hidden="true" />
      </span>
    );
  }
  if (index === 1) {
    return mode === "setor-langsung" ? (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/10 bg-[#EFF8F3] text-[#1D9E75]">
        <CheckCircle2 size={17} aria-hidden="true" />
      </span>
    ) : (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/10 bg-[#EFF8F3] text-[#1D9E75]">
        <Truck size={17} aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/10 bg-[#EFF8F3] text-[#1D9E75]">
      <Scale size={17} aria-hidden="true" />
    </span>
  );
}

/**
 * Showcase cara penyerahan material (#setor-atau-jemput) yang selaras dengan
 * ritme bagian Edukasi lainnya:
 * - Header 5/6 kolom sejajar di bagian atas
 * - Panggung terpadu dengan pemilih 2 opsi di kiri dan papan alur 3-langkah +
 *   rincian operasional di kanan.
 */
export default function PlanningAndRouteStage() {
  const [activeMode, setActiveMode] = useState<DepositModeKey>("setor-langsung");
  const current = DEPOSIT_MODES[activeMode];

  return (
    <div>
      {/* Balanced Section Header matching Sections 01, 02, 04, and 05 */}
      <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
            Setor langsung atau<br />
            <span className="text-[#1D9E75]">penjemputan rutin</span>
          </h2>
        </div>

        <div className="space-y-4 md:col-span-6 md:col-start-7">
          <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
            BONI dirancang terhubung dengan rute pengepul dan bank sampah yang sudah berjalan. Pilih cara penyerahan di bawah untuk melihat tahapan pemeriksaan hingga penimbangan.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#setelah-ditimbang"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
            >
              <span>Lihat syarat bukti timbang</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <Link
              href="/login?role=warga"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
            >
              <span>Uji verifikasi foto di Aksi Hijau</span>
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

      {/* Unified Interactive Showcase Container */}
      <div className="rounded-2xl border border-emerald-900/12 bg-[#F2F8F4] p-4 shadow-[0_14px_34px_-16px_rgba(15,61,46,0.08)] sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-stretch lg:gap-7">
          {/* Left Column: Clean Mode Selector Rail + Prototype Status Callout */}
          <div className="flex flex-col justify-between gap-4 md:col-span-4">
            <div
              role="tablist"
              aria-label="Pilih cara penyerahan material"
              className="space-y-3"
            >
              {(["setor-langsung", "jemput-rumah"] as DepositModeKey[]).map(
                (key) => {
                  const spec = DEPOSIT_MODES[key];
                  const isActive = activeMode === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveMode(key)}
                      className={`group relative block w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] ${
                        isActive
                          ? "border-emerald-900/15 bg-white shadow-[0_12px_28px_-14px_rgba(15,61,46,0.16)]"
                          : "border-transparent bg-white/55 hover:bg-white/85"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="route-active-bar"
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
                          {spec.badge}
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
                },
              )}
            </div>

            {/* Prototype status callout */}
            <div className="rounded-xl border border-emerald-900/10 bg-white/80 p-3.5 text-xs leading-relaxed text-[#2D5542]">
              <div className="flex items-start gap-2.5">
                <Clock
                  size={15}
                  className="mt-0.5 shrink-0 text-[#1D9E75]"
                  aria-hidden="true"
                />
                <p>
                  <strong className="font-bold text-[#0F3D2E]">
                    Status pengembangan:{" "}
                  </strong>
                  Pengajuan setor, jadwal penjemputan, dan Portal Pengepul masih dalam rancangan tahap lanjut.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Route Flow & Operational Details Board */}
          <div
            role="tabpanel"
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-900/12 bg-white shadow-[0_20px_44px_-16px_rgba(15,61,46,0.12)] md:col-span-8"
          >
            {/* Top Window Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 bg-[#FAFDFB] px-5 py-3">
              <div className="flex items-center gap-2 text-xs text-[#426352]">
                <Truck size={13} className="text-[#1D9E75]" aria-hidden="true" />
                <span className="font-bold text-[#0F3D2E]">rute-pengepul</span>
                <span aria-hidden="true">›</span>
                <span className="font-medium text-[#2D5542]">
                  {current.tabLabel}
                </span>
              </div>

              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10.5px] font-bold text-amber-900">
                Rancangan Alur Setoran
              </span>
            </div>

            {/* Animated Panel Content */}
            <div className="flex-1 p-5 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                  className="space-y-5"
                >
                  {/* Header inside right board */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
                      {current.badge}
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-2xl">
                      {current.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#426352] sm:text-[13px]">
                      {current.description}
                    </p>
                  </div>

                  {/* 3-Step Route Flow Strip */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {current.flowSteps.map((fs, idx) => (
                      <div
                        key={fs.step}
                        className="flex items-center gap-3 rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-3.5 sm:flex-col sm:items-start sm:gap-2.5"
                      >
                        <div className="flex w-full items-center justify-between">
                          <RouteStepGraphic mode={activeMode} index={idx} />
                          <span className="hidden font-mono text-[10.5px] font-bold text-[#1D9E75]/80 sm:inline">
                            TAHAP {fs.step}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0F3D2E]">
                            {fs.title}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-snug text-[#426352]">
                            {fs.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 2 Operational Detail Cards */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    {current.cards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-xl border border-emerald-200/75 bg-[#F4FAF6] p-4"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1D9E75] shadow-sm ring-1 ring-emerald-900/10">
                            {card.icon === "route" ? (
                              <MapPin size={15} aria-hidden="true" />
                            ) : (
                              <Scale size={15} aria-hidden="true" />
                            )}
                          </span>
                          <p className="text-xs font-bold text-[#0F3D2E]">
                            {card.title}
                          </p>
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-[#2D5542]">
                          {card.detail}
                        </p>
                      </div>
                    ))}
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
