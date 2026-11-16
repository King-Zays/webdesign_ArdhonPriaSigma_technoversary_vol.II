"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { EVIDENCE_RULES, GREEN_ACTION_LIST } from "@/config/green-actions";

const maxSizeMb = Math.round(EVIDENCE_RULES.maxBytes / (1024 * 1024));

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

/**
 * Horizontal Linear-style showcase carousel for BONI's five Green Action categories
 * paired with a compact 3-column Evidence Rules metadata strip underneath.
 */
export default function GreenActionsCarousel() {
  // Default to index 1 so Setor Minyak Jelantah & Tanam Pohon sit centered
  // while Pilah Sampah peeks on the left and Hemat Energi peeks on the right.
  const maxDesktopStart = Math.max(0, GREEN_ACTION_LIST.length - 2);
  const [desktopStart, setDesktopStart] = useState(1);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [openSpecId, setOpenSpecId] = useState<string | null>(null);

  const canPrevDesktop = desktopStart > 0;
  const canNextDesktop = desktopStart < maxDesktopStart;

  const handleDesktopCardClick = (index: number) => {
    if (index < desktopStart) {
      setDesktopStart(index);
    } else if (index > desktopStart + 1) {
      setDesktopStart(Math.min(maxDesktopStart, index - 1));
    }
  };

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
    <div>
      {/* Desktop & Tablet Horizontal Vignette Stage (md 768px+) */}
      <div className="hidden md:block">
        <div
          className="relative overflow-hidden py-3 [--card-w:288px] lg:[--card-w:312px]"
          role="region"
          aria-label="Katalog lima kategori Aksi Hijau"
        >
          {/* Centered two-card anchor slot matching Linear's 2-card crisp center + peeking edges */}
          <div className="mx-auto w-[calc(var(--card-w)*2+16px)]">
            <div
              className="flex items-stretch gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(${-desktopStart} * (var(--card-w) + 16px)))`,
              }}
            >
              {GREEN_ACTION_LIST.map((action, index) => {
                const isCentered = index === desktopStart || index === desktopStart + 1;
                return (
                  <article
                    key={action.type}
                    onClick={() => handleDesktopCardClick(index)}
                    className={`flex w-[var(--card-w)] shrink-0 flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-300 ${
                      isCentered
                        ? "border-emerald-950/[0.12] opacity-100 shadow-[0_14px_32px_-12px_rgba(15,61,46,0.12)]"
                        : "cursor-pointer border-emerald-950/[0.06] opacity-75 hover:opacity-95"
                    }`}
                  >
                    <div>
                      {/* Mini Linear-style card title bar */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: action.color }}
                            aria-hidden="true"
                          />
                          <h3 className="text-[13.5px] font-bold leading-snug text-[#0F3D2E]">
                            {action.labelId}
                          </h3>
                        </div>
                        <span className="shrink-0 whitespace-nowrap rounded-full bg-[#F0FAF4] px-2 py-0.5 text-[10.5px] font-bold tabular-nums text-[#0F3D2E]">
                          +{action.ecoPoints} EcoPoints
                        </span>
                      </div>

                      {/* Inset evidence requirement panel (echoes Linear prompt bubble) */}
                      <div className="mt-3.5 rounded-xl border border-emerald-950/[0.06] bg-[#FAFDFB] p-3.5">
                        <p className="text-xs leading-relaxed text-[#2D4F3E]">
                          {action.evidenceRequirement}
                        </p>
                      </div>

                      {/* Subtle status line */}
                      <p className="mt-3 text-[11px] font-medium leading-relaxed text-[#4D6D5B]">
                        Demo aktif · {action.impactMetric}
                      </p>
                    </div>

                    {/* Structured Linear-like sub-rows */}
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
              })}
            </div>
          </div>

          {/* Soft left & right vignette fade matching Linear's edge dissolve */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FAFDFB] via-[#FAFDFB]/85 to-transparent lg:w-36"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FAFDFB] via-[#FAFDFB]/85 to-transparent lg:w-36"
            aria-hidden="true"
          />

          {/* Subtle edge navigation arrows */}
          <button
            type="button"
            onClick={() => setDesktopStart((prev) => Math.max(0, prev - 1))}
            disabled={!canPrevDesktop}
            aria-label="Geser kategori Aksi Hijau ke kiri"
            className="absolute left-3 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.1] bg-white/95 text-[#0F3D2E] shadow-sm transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setDesktopStart((prev) => Math.min(maxDesktopStart, prev + 1))}
            disabled={!canNextDesktop}
            aria-label="Geser kategori Aksi Hijau ke kanan"
            className="absolute right-3 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.1] bg-white/95 text-[#0F3D2E] shadow-sm transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Minimal pair indicator dots below stage */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {Array.from({ length: maxDesktopStart + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setDesktopStart(idx)}
              aria-label={`Tampilkan kategori ${idx + 1} dan ${idx + 2}`}
              aria-pressed={desktopStart === idx}
              className={`h-1.5 rounded-full transition-all ${
                desktopStart === idx
                  ? "w-6 bg-[#0F3D2E]"
                  : "w-1.5 bg-emerald-950/20 hover:bg-emerald-950/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Compact Carousel (< 768px) */}
      <div className="md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {GREEN_ACTION_LIST.map((action) => (
              <div key={action.type} className="w-full shrink-0 px-0.5">
                <article className="rounded-2xl border border-emerald-950/[0.1] bg-white p-5 shadow-[0_12px_28px_-10px_rgba(15,61,46,0.08)]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: action.color }}
                        aria-hidden="true"
                      />
                      <h3 className="truncate text-base font-bold text-[#0F3D2E]">
                        {action.labelId}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#F0FAF4] px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-[#0F3D2E]">
                      +{action.ecoPoints} EcoPoints
                    </span>
                  </div>

                  <div className="mt-3.5 rounded-xl border border-emerald-950/[0.06] bg-[#FAFDFB] p-3.5">
                    <p className="text-xs leading-relaxed text-[#2D4F3E]">
                      {action.evidenceRequirement}
                    </p>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-emerald-950/[0.06] pt-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#4D6D5B]">Batas demo</span>
                      <span className="font-semibold text-[#0F3D2E]">
                        Maks. {action.dailyLimit}×/hari
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#4D6D5B]">SDGs</span>
                      <div className="flex flex-wrap justify-end gap-1">
                        {action.sdgs.map((goal) => (
                          <span
                            key={goal}
                            className="rounded-md border border-emerald-950/[0.08] bg-[#FAFDFB] px-1.5 py-0.5 text-[10px] font-semibold text-[#0F3D2E]"
                          >
                            SDG {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileIndex((prev) => Math.max(0, prev - 1))}
            disabled={mobileIndex === 0}
            aria-label="Kategori sebelumnya"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-[#0F3D2E] disabled:opacity-40"
          >
            <ChevronLeft size={15} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1.5">
            {GREEN_ACTION_LIST.map((action, idx) => (
              <button
                key={action.type}
                type="button"
                onClick={() => setMobileIndex(idx)}
                aria-label={`Pilih ${action.labelId}`}
                aria-pressed={mobileIndex === idx}
                className={`h-1.5 rounded-full transition-all ${
                  mobileIndex === idx ? "w-5 bg-[#0F3D2E]" : "w-1.5 bg-emerald-950/20"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileIndex((prev) => Math.min(GREEN_ACTION_LIST.length - 1, prev + 1))
            }
            disabled={mobileIndex === GREEN_ACTION_LIST.length - 1}
            aria-label="Kategori berikutnya"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-[#0F3D2E] disabled:opacity-40"
          >
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
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
