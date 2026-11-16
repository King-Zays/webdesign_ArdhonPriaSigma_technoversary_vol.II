"use client";

import { useState } from "react";
import { Check, Leaf, X } from "lucide-react";

type MaterialKey = "botol-pet" | "kardus";

interface MaterialGuideSpec {
  id: MaterialKey;
  code: string;
  tabLabel: string;
  title: string;
  focus: string;
  accepted: string[];
  avoided: string[];
  pillars: { value: string; caption: string }[];
}

const MATERIAL_SPECS: Record<MaterialKey, MaterialGuideSpec> = {
  "botol-pet": {
    id: "botol-pet",
    code: "MATERIAL 01 · PET (KODE 1)",
    tabLabel: "Botol PET",
    title: "Botol plastik PET.",
    focus:
      "Kenali simbol segitiga angka 1, pastikan botol kosong dan kering, lalu pisahkan dari sampah basah sebelum dicek pada checklist.",
    accepted: [
      "Botol air mineral & minuman bening/biru muda kode 1",
      "Kondisi bersih, sudah ditiriskan, dan tidak lengket",
      "Terpisah dari plastik lain dan sisa makanan",
    ],
    avoided: [
      "Plastik sachet berlapis foil atau kemasan berminyak",
      "Botol yang masih berisi cairan atau bercampur sampah dapur",
    ],
    pillars: [
      { value: "Kode 1", caption: "Simbol segitiga PET pada dasar atau label" },
      { value: "3 Syarat", caption: "Bersih, ditiriskan kering, dan terpisah" },
      { value: "0 Residu", caption: "Bebas cairan, sachet foil, dan sampah dapur" },
    ],
  },
  kardus: {
    id: "kardus",
    code: "MATERIAL 02 · KARTON KERING",
    tabLabel: "Kardus",
    title: "Kardus dan karton.",
    focus:
      "Jaga kardus tetap kering dan bersih dari isi non-kertas, lalu lipat rata agar mudah dibawa dan akurat saat ditimbang pengepul.",
    accepted: [
      "Kardus paket, boks karton belanja, dan kemasan kering",
      "Sudah dilipat rata tanpa plastik, styrofoam, atau busa",
      "Bebas minyak, jamur, dan noda basah",
    ],
    avoided: [
      "Kardus bekas makanan berminyak atau basah kehujanan",
      "Karton yang masih berisi kemasan plastik atau residu",
    ],
    pillars: [
      { value: "Lipat Rata", caption: "Ringkas dibawa & mudah ditimbang pengepul" },
      { value: "3 Syarat", caption: "Kering, bersih non-kertas, bebas jamur" },
      { value: "0 Minyak", caption: "Tanpa noda basah, plastik, atau styrofoam" },
    ],
  },
};

const SIDEBAR_FEATURES = [
  "Simbol Segitiga PET 1",
  "Botol Dibilas & Tiriskan Kering",
  "Kardus Dilipat Rata Tanpa Busa",
  "Terpisah dari Sachet & Residu Basah",
] as const;

/**
 * Vercel-inspired asymmetric 2-column showcase for #material-setoran:
 * left editorial context & standard list + right headline and centered app preview frame.
 */
export default function MaterialShowcaseStage() {
  const [selectedId, setSelectedId] = useState<MaterialKey>("botol-pet");
  const active = MATERIAL_SPECS[selectedId];

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
      {/* Left Sidebar Column (matches Vercel's left customer blurb + "Features" stack) */}
      <div className="order-2 space-y-7 md:order-1 md:col-span-4 md:pt-28">
        <p className="text-[15px] leading-relaxed text-[#426352]">
          <strong className="font-bold text-[#0F3D2E]">
            Dua material utama alur setoran BONI
          </strong>{" "}
          adalah botol plastik PET (kode 1) dan kardus kering sebelum ditimbang pengepul.
        </p>

        <div>
          <p className="text-xs font-bold text-[#1D9E75]">Standar Pemilahan</p>

          <div className="mt-3 flex flex-col items-start gap-2">
            {(["botol-pet", "kardus"] as MaterialKey[]).map((key, idx) => {
              const spec = MATERIAL_SPECS[key];
              const isActive = selectedId === key;
              return (
                <button
                  key={key}
                  id={spec.id}
                  type="button"
                  onClick={() => setSelectedId(key)}
                  aria-pressed={isActive}
                  className={`scroll-mt-24 text-left text-[13px] tabular-nums transition-colors ${
                    isActive
                      ? "font-bold text-[#0F3D2E]"
                      : "font-semibold text-[#426352] hover:text-[#0F3D2E]"
                  }`}
                >
                  0{idx + 1}. {key === "botol-pet" ? "Botol plastik PET" : "Kardus dan karton"}
                </button>
              );
            })}
          </div>

          <ul className="mt-4 space-y-1.5 border-t border-emerald-900/10 pt-3.5 text-[12.5px] font-semibold text-[#2D5542]">
            {SIDEBAR_FEATURES.map((feat) => (
              <li key={feat}>{feat}</li>
            ))}
          </ul>
        </div>

        <a
          href="#cek-kesiapan"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
        >
          <span>Lanjut ke checklist kesiapan</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* Right Showcase Column (matches Vercel's headline right above embedded app frame) */}
      <div className="order-1 md:order-2 md:col-span-8">
        <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
          Material layak setor:<br />PET dan kardus
        </h2>

        {/* Mockup Preview Frame */}
        <div className="mt-7 overflow-hidden rounded-2xl border border-emerald-900/12 bg-white shadow-[0_24px_48px_-16px_rgba(15,61,46,0.12)]">
          {/* Mini app navbar strip inside frame */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/10 bg-[#FAFDFB] px-5 py-3">
            <div className="flex items-center gap-4 text-[11px] font-semibold text-[#426352]">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#0F3D2E]">
                <Leaf size={13} className="text-[#1D9E75]" aria-hidden="true" />
                <span>standar-pilah</span>
              </span>
              <span className="hidden sm:inline">Material Wajib</span>
              <span className="hidden sm:inline">Kriteria Bersih</span>
            </div>

            <div
              role="tablist"
              aria-label="Pilih spesifikasi material"
              className="inline-flex items-center rounded-full border border-emerald-200 bg-white p-0.5"
            >
              {(["botol-pet", "kardus"] as MaterialKey[]).map((key) => {
                const isSelected = selectedId === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedId(key)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                      isSelected
                        ? "bg-[#0F3D2E] text-white"
                        : "text-[#426352] hover:text-[#0F3D2E]"
                    }`}
                  >
                    {MATERIAL_SPECS[key].tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Centered Inner App Hero (matches Vercel's centered "Your tools. Your rules. Any AI.") */}
          <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(29,158,117,0.06),transparent_65%)] px-6 py-9 text-center sm:px-8 sm:py-10">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
              {active.code}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-[30px]">
              {active.title}
            </h3>
            <p className="mx-auto mt-2.5 max-w-lg text-xs leading-relaxed text-[#426352] sm:text-[13.5px]">
              {active.focus}
            </p>

            {/* Two crisp comparison panels cleanly aligned */}
            <div className="mt-7 grid grid-cols-1 gap-3.5 text-left sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200/80 bg-[#F5FAF7] p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                  + Layak disetor
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

              <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-950">
                  − Hindari mencampur
                </p>
                <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-amber-950/90">
                  {active.avoided.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <X
                        size={13}
                        className="mt-0.5 shrink-0 text-amber-700"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom 3 Centered Pillars */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-emerald-900/10 pt-6 sm:grid-cols-3">
              {active.pillars.map((pillar) => (
                <div key={pillar.value}>
                  <p className="text-lg font-extrabold tracking-tight text-[#0F3D2E] sm:text-xl">
                    {pillar.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#426352]">
                    {pillar.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
