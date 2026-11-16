"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Scale, Truck } from "lucide-react";

type DepositModeKey = "setor-langsung" | "jemput-rumah";

interface DepositModeSpec {
  id: DepositModeKey;
  tabLabel: string;
  badge: string;
  title: string;
  description: string;
  cards: {
    icon: "route" | "scale";
    title: string;
    detail: string;
  }[];
}

const DEPOSIT_MODES: Record<DepositModeKey, DepositModeSpec> = {
  "setor-langsung": {
    id: "setor-langsung",
    tabLabel: "Titik Kumpul",
    badge: "SETOR LANGSUNG",
    title: "Setor ke titik kumpul",
    description:
      "Bawa botol PET atau kardus yang sudah terpilah langsung ke bank sampah, titik setoran, atau pengepul mitra terdekat sesuai jadwal penerimaan.",
    cards: [
      {
        icon: "route",
        title: "Jadwal bank sampah",
        detail:
          "Material diterima sesuai standar bersih dan kering pada jam operasional titik setoran setempat.",
      },
      {
        icon: "scale",
        title: "Timbang di tempat",
        detail:
          "Ditimbang langsung bersama pengepul menggunakan timbangan digital mitra untuk berat aktual.",
      },
    ],
  },
  "jemput-rumah": {
    id: "jemput-rumah",
    tabLabel: "Jemput Rumah",
    badge: "RUTE PENGEPUL",
    title: "Penjemputan dari rumah",
    description:
      "Isi pengajuan jemput dengan jenis material, perkiraan berat (kg), wilayah, dan tanggal usulan agar masuk ke rute pengepul yang sudah berjalan.",
    cards: [
      {
        icon: "route",
        title: "Masuk rute berjalan",
        detail:
          "Mencantumkan jenis material, estimasi berat, wilayah, serta tanggal usulan penjemputan.",
      },
      {
        icon: "scale",
        title: "Cek fisik & timbang",
        detail:
          "Petugas memastikan botol PET dan kardus bebas minyak/cairan sebelum dicatat timbangan digital.",
      },
    ],
  },
};

const SIDEBAR_FEATURES = [
  "Setor Langsung ke Titik Kumpul",
  "Ajukan Penjemputan dari Rumah",
  "Pemeriksaan Fisik Bersih & Kering",
  "Berat Aktual Timbangan Digital",
] as const;

/**
 * Vercel/Mintlify-inspired asymmetric 2-column showcase for #setor-atau-jemput:
 * left headline + interactive doc-style route window, paired with a right
 * editorial summary and collector role list.
 */
export default function PlanningAndRouteStage() {
  const [activeMode, setActiveMode] = useState<DepositModeKey>("setor-langsung");
  const current = DEPOSIT_MODES[activeMode];

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
      {/* Left Wide Showcase Column: Headline directly above doc-style preview frame */}
      <div className="md:col-span-8">
        <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
          Setor langsung atau<br />penjemputan rutin
        </h2>

        {/* Documentation-style App Frame mirroring Vercel's Mintlify preview */}
        <div className="mt-7 overflow-hidden rounded-2xl border border-emerald-900/12 bg-white shadow-[0_24px_48px_-16px_rgba(15,61,46,0.12)]">
          {/* Mini Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/10 bg-[#FAFDFB] px-5 py-3">
            <div className="flex items-center gap-4 text-[11px] font-semibold text-[#426352]">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#0F3D2E]">
                <Truck size={13} className="text-[#1D9E75]" aria-hidden="true" />
                <span>rute-pengepul</span>
              </span>
              <span className="hidden sm:inline">Panduan Setor</span>
              <span className="hidden sm:inline">Rute Mitra</span>
            </div>

            <div
              role="tablist"
              aria-label="Pilih cara penyerahan material"
              className="inline-flex items-center rounded-full border border-emerald-200 bg-white p-0.5"
            >
              {(["setor-langsung", "jemput-rumah"] as DepositModeKey[]).map((key) => {
                const isSelected = activeMode === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveMode(key)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                      isSelected
                        ? "bg-[#0F3D2E] text-white"
                        : "text-[#426352] hover:text-[#0F3D2E]"
                    }`}
                  >
                    {DEPOSIT_MODES[key].tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Pane Frame Body: Left Doc Nav + Right Content */}
          <div className="grid grid-cols-1 sm:grid-cols-12">
            {/* Inner Left Nav Sidebar (echoes Mintlify docs navigation) */}
            <aside className="border-b border-emerald-900/10 bg-[#FAFDFB]/80 p-4 text-xs sm:col-span-4 sm:border-b-0 sm:border-r">
              <div className="space-y-4">
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#1D9E75]">
                    Opsi Setoran
                  </p>
                  <div className="mt-2 space-y-1">
                    {(["setor-langsung", "jemput-rumah"] as DepositModeKey[]).map((key) => {
                      const isActive = activeMode === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setActiveMode(key)}
                          className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-colors ${
                            isActive
                              ? "bg-[#E8F5EE] font-bold text-[#0F3D2E]"
                              : "font-medium text-[#426352] hover:bg-white hover:text-[#0F3D2E]"
                          }`}
                        >
                          {key === "setor-langsung" ? (
                            <MapPin size={12} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
                          ) : (
                            <Truck size={12} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
                          )}
                          <span>{DEPOSIT_MODES[key].tabLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-emerald-900/10 pt-3">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#527362]">
                    Di Lapangan
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[11px] font-medium text-[#426352]">
                    <li>Pemeriksaan Fisik</li>
                    <li>Bebas Minyak &amp; Cairan</li>
                    <li>Timbangan Digital</li>
                  </ul>
                </div>

                <div className="hidden border-t border-emerald-900/10 pt-3 sm:block">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#527362]">
                    Status Demo
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#426352]">
                    Formulir setor &amp; Portal Pengepul masih rancangan.
                  </p>
                </div>
              </div>
            </aside>

            {/* Inner Right Content Stage (centered title + 2 crisp sub-cards) */}
            <div className="flex flex-col justify-between bg-[radial-gradient(ellipse_at_50%_0%,rgba(29,158,117,0.06),transparent_65%)] p-6 sm:col-span-8 sm:p-7">
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
                  {current.badge}
                </span>
                <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-2xl">
                  {current.title}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#426352] sm:text-[13px]">
                  {current.description}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {current.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-emerald-900/10 bg-[#F5FAF7] p-4 text-left"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1D9E75] ring-1 ring-emerald-900/10">
                      {card.icon === "route" ? (
                        <MapPin size={15} aria-hidden="true" />
                      ) : (
                        <Scale size={15} aria-hidden="true" />
                      )}
                    </span>
                    <p className="mt-3 text-xs font-bold text-[#0F3D2E]">{card.title}</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-[#426352]">
                      {card.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Column (matches Vercel's right customer blurb + "Features" stack) */}
      <div className="space-y-7 md:col-span-4 md:pt-28">
        <p className="text-[15px] leading-relaxed text-[#426352]">
          <strong className="font-bold text-[#0F3D2E]">
            BONI terhubung dengan rute pengepul dan bank sampah
          </strong>{" "}
          yang sudah berjalan. Alur setor, jemput, dan penimbangan masih dalam tahap rancangan pengembangan.
        </p>

        <div>
          <p className="text-xs font-bold text-[#1D9E75]">Peran Pengepul &amp; Rute</p>
          <ul className="mt-3 space-y-2 text-[13px] font-bold text-[#0F3D2E]">
            {SIDEBAR_FEATURES.map((feat) => (
              <li key={feat}>{feat}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-2 pt-1">
          <a
            href="#setelah-ditimbang"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
          >
            <span>Lihat syarat bukti timbang</span>
            <span aria-hidden="true">→</span>
          </a>
          <Link
            href="/dashboard/eco-action"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
          >
            <span>Uji verifikasi foto di Aksi Hijau</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
