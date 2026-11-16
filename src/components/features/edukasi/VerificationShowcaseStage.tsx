"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Camera,
  Check,
  FileText,
  Link2,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

type VerificationTabKey = "frame" | "ai-checks" | "manual-review" | "active-demo";

interface DocSectionTab {
  key: VerificationTabKey;
  step: string;
  kicker: string;
  summary: string;
  breadcrumb: string;
  badgeText: string;
  badgeTone: "amber" | "emerald" | "neutral";
  docTitle: string;
  metaLine: string;
  actors: readonly { handle: string; tone: "teal" | "amber" | "emerald" }[];
}

const DOC_TABS: readonly DocSectionTab[] = [
  {
    key: "frame",
    step: "01",
    kicker: "STANDAR 1 FOTO TIMBANGAN",
    summary:
      "Material terpilah dan angka layar timbangan digital wajib terlihat tajam dalam satu bingkai foto transaksi.",
    breadcrumb: "Panduan foto timbangan",
    badgeText: "Ilustrasi 1 Frame",
    badgeTone: "amber",
    docTitle: "Posisi foto bukti saat penimbangan",
    metaLine: "Rancangan Alur Setor · Warga & Pengepul",
    actors: [
      { handle: "@warga", tone: "emerald" },
      { handle: "@pengepul", tone: "teal" },
    ],
  },
  {
    key: "ai-checks",
    step: "02",
    kicker: "PEMERIKSAAN AI (RANCANGAN)",
    summary:
      "Empat pemeriksaan berbantuan AI disiapkan untuk menyaring foto sebelum diverifikasi tim lapangan.",
    breadcrumb: "Tahapan penyaringan AI",
    badgeText: "Rancangan AI",
    badgeTone: "neutral",
    docTitle: "Empat langkah pemeriksaan foto setoran",
    metaLine: "AI-01 s.d. AI-04 · Pratinjau rancangan",
    actors: [
      { handle: "@vision-ai", tone: "teal" },
      { handle: "@ocr-timbang", tone: "amber" },
    ],
  },
  {
    key: "manual-review",
    step: "03",
    kicker: "PENINJAUAN MANUAL & FISIK",
    summary:
      "Bila bukti foto meragukan, transaksi tetap mengandalkan pengecekan fisik pengepul dan peninjauan admin.",
    breadcrumb: "Jika bukti meragukan",
    badgeText: "Kontrol Lapangan",
    badgeTone: "amber",
    docTitle: "Pemeriksaan fisik & mitigasi kesalahan",
    metaLine: "Pengepul Mitra & Admin Verifikator",
    actors: [
      { handle: "@pengepul", tone: "amber" },
      { handle: "@admin-boni", tone: "teal" },
    ],
  },
  {
    key: "active-demo",
    step: "04",
    kicker: "JALUR AKTIF DEMO WARGA",
    summary:
      "Berbeda dari OCR timbangan yang masih dirancang, verifikasi foto Aksi Hijau sudah dapat dicoba di Portal Warga.",
    breadcrumb: "Status demo saat ini",
    badgeText: "Demo Aktif",
    badgeTone: "emerald",
    docTitle: "Verifikasi Aksi Hijau aktif di demo Warga",
    metaLine: "Portal Warga · Pengujian interaktif terbuka",
    actors: [
      { handle: "@portal-warga", tone: "emerald" },
      { handle: "@sha-256", tone: "teal" },
    ],
  },
] as const;

const AI_QUEUE_STEPS = [
  {
    code: "AI-01",
    tag: "Klasifikasi",
    title: "Membaca jenis material",
    detail: "Mengenali kesesuaian visual botol plastik PET (kode 1) atau tumpukan kardus kering.",
  },
  {
    code: "AI-02",
    tag: "OCR Digital",
    title: "Membaca angka timbangan",
    detail: "Mengekstrak angka kilogram pada layar timbangan digital untuk dicocokkan dengan catatan.",
  },
  {
    code: "AI-03",
    tag: "Kelayakan Frame",
    title: "Memeriksa kualitas foto",
    detail: "Memastikan ketajaman gambar, pencahayaan cukup, serta material & layar dalam 1 frame.",
  },
  {
    code: "AI-04",
    tag: "Anti-Duplikasi",
    title: "Menandai indikasi duplikasi",
    detail: "Memeriksa sidik jari gambar (hash SHA-256) agar foto transaksi lama tidak diajukan ulang.",
  },
] as const;

const MANUAL_STEPS = [
  {
    step: "01",
    role: "Pengepul Mitra",
    title: "Pemeriksaan fisik langsung di titik setor / jemput",
    detail: "Memastikan botol PET bebas cairan dan kardus tidak basah sebelum ditimbang.",
  },
  {
    step: "02",
    role: "Admin Verifikator",
    title: "Peninjauan manual untuk foto berstatus ragu",
    detail: "Bukti foto yang buram atau angka timbangan terhalang ditinjau ulang secara manual.",
  },
  {
    step: "03",
    role: "Pencatatan Sah",
    title: "Konversi berat aktual ke rencana EcoPoints",
    detail: "Hanya transaksi yang lolos cek fisik & validasi yang masuk rekap insentif UMKM.",
  },
] as const;

/**
 * Linear `/plan`-inspired collaborative specification showcase for #setelah-ditimbang:
 * left 4-topic selector rail paired with a docked, fixed-height right specification sheet
 * so switching tabs never causes layout jumps.
 */
export default function VerificationShowcaseStage() {
  const [activeKey, setActiveKey] = useState<VerificationTabKey>("frame");
  const activeIndex = DOC_TABS.findIndex((tab) => tab.key === activeKey);
  const current = DOC_TABS[activeIndex >= 0 ? activeIndex : 0];

  const badgeClass =
    current.badgeTone === "emerald"
      ? "border-emerald-300/80 bg-[#E6F8EE] text-[#0F3D2E]"
      : current.badgeTone === "amber"
        ? "border-amber-300/80 bg-amber-50 text-amber-900"
        : "border-emerald-950/12 bg-[#F2F8F4] text-[#2D5542]";

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-900/12 bg-gradient-to-b from-[#F2F8F4] to-[#EBF5EF] px-4 pt-5 pb-5 shadow-[0_16px_40px_-18px_rgba(15,61,46,0.10)] sm:px-7 sm:pt-8 md:pb-0 lg:px-10 lg:pt-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center lg:gap-9">
        {/* Left Interactive Topic Selector Rail */}
        <div
          role="tablist"
          aria-label="Pilih detail verifikasi setelah ditimbang"
          className="space-y-2.5 md:col-span-5 md:pb-10"
        >
          {DOC_TABS.map((tab) => {
            const isActive = tab.key === activeKey;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveKey(tab.key)}
                className={`group relative block w-full rounded-2xl px-4 py-3.5 text-left transition-all duration-200 ${
                  isActive
                    ? "border border-emerald-900/12 bg-white shadow-[0_12px_28px_-14px_rgba(15,61,46,0.16)]"
                    : "border border-transparent opacity-75 hover:bg-white/60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3.5 w-1 rounded-full transition-colors ${
                        isActive ? "bg-[#1D9E75]" : "bg-emerald-950/15 group-hover:bg-[#1D9E75]/50"
                      }`}
                    />
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#0F3D2E]">
                      {tab.kicker}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold tabular-nums text-[#426352]/70">
                    {tab.step}
                  </span>
                </div>
                <p
                  className={`mt-1.5 pl-3 text-xs leading-relaxed ${
                    isActive ? "text-[#2D5542]" : "text-[#426352]"
                  }`}
                >
                  {tab.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Docked Document Specification Sheet */}
        <div
          role="tabpanel"
          className="flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-900/12 bg-white shadow-[0_20px_48px_-18px_rgba(15,61,46,0.14)] md:col-span-7 md:min-h-[464px] md:rounded-b-none md:border-b-0"
        >
          {/* Top Document Chrome Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 bg-[#FAFDFB] px-5 py-3 sm:px-6">
            <div className="flex items-center gap-2 text-xs text-[#426352]">
              <Wrench size={12} className="text-[#1D9E75]" aria-hidden="true" />
              <span className="font-bold text-[#0F3D2E]">verifikasi-boni</span>
              <span aria-hidden="true" className="text-[#426352]/50">›</span>
              <span className="font-medium text-[#2D5542]">{current.breadcrumb}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}
              >
                {current.badgeText}
              </span>
              <div className="hidden items-center gap-1.5 text-[#426352]/60 sm:flex" aria-hidden="true">
                <Bell size={13} />
                <Link2 size={13} />
              </div>
            </div>
          </div>

          {/* Animated Document Body */}
          <div className="flex flex-1 flex-col justify-between p-5 sm:px-7 sm:py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 flex-col justify-between gap-4"
              >
                {/* Header & Narrative Block */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-900/10 bg-[#F4FAF6] text-[#1D9E75]">
                        {activeKey === "frame" ? (
                          <Camera size={15} aria-hidden="true" />
                        ) : activeKey === "manual-review" ? (
                          <ShieldAlert size={15} aria-hidden="true" />
                        ) : activeKey === "active-demo" ? (
                          <Sparkles size={15} aria-hidden="true" />
                        ) : (
                          <FileText size={15} aria-hidden="true" />
                        )}
                      </span>
                      <div>
                        <h3 className="text-lg font-extrabold tracking-tight text-[#0F3D2E] sm:text-xl">
                          {current.docTitle}
                        </h3>
                        <p className="text-[11.5px] font-medium text-[#426352]">
                          {current.metaLine}
                        </p>
                      </div>
                    </div>

                    {/* Collaborator chips like Linear /plan */}
                    <div className="flex items-center gap-1.5">
                      {current.actors.map((actor) => (
                        <span
                          key={actor.handle}
                          className={`rounded-md px-2 py-0.5 text-[10.5px] font-bold ${
                            actor.tone === "amber"
                              ? "bg-amber-100/90 text-amber-900"
                              : actor.tone === "teal"
                                ? "bg-[#E2F5EC] text-[#0F3D2E]"
                                : "bg-[#1D9E75] text-white"
                          }`}
                        >
                          {actor.handle}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tab-specific Inline Highlighted Paragraph */}
                  {activeKey === "frame" && (
                    <p className="mt-3.5 text-[13px] leading-relaxed text-[#2D5542]">
                      Warga mengambil satu foto transaksi yang memastikan{" "}
                      <mark className="rounded bg-[#E6F6EE] px-1.5 py-0.5 font-semibold text-[#0F3D2E]">
                        material terpilah terlihat jelas
                      </mark>{" "}
                      di atas pelat timbang sekaligus{" "}
                      <mark className="rounded bg-amber-100/85 px-1.5 py-0.5 font-semibold text-amber-950">
                        angka timbang terbaca tajam
                      </mark>{" "}
                      tanpa tertutup bayangan.
                    </p>
                  )}

                  {activeKey === "ai-checks" && (
                    <p className="mt-3.5 text-[13px] leading-relaxed text-[#2D5542]">
                      Pada alur setoran yang sedang dirancang,{" "}
                      <mark className="rounded bg-[#E6F6EE] px-1.5 py-0.5 font-semibold text-[#0F3D2E]">
                        empat pemeriksaan AI otomatis
                      </mark>{" "}
                      menyaring kelayakan bukti foto sebelum{" "}
                      <mark className="rounded bg-amber-100/85 px-1.5 py-0.5 font-semibold text-amber-950">
                        validasi akhir pengepul
                      </mark>{" "}
                      di lapangan.
                    </p>
                  )}

                  {activeKey === "manual-review" && (
                    <p className="mt-3.5 text-[13px] leading-relaxed text-[#2D5542]">
                      Verifikasi AI berperan sebagai penyaring awal. Keputusan penerimaan material tetap mengandalkan{" "}
                      <mark className="rounded bg-amber-100/85 px-1.5 py-0.5 font-semibold text-amber-950">
                        pemeriksaan fisik &amp; manual
                      </mark>{" "}
                      oleh pengepul mitra dan admin bila foto meragukan.
                    </p>
                  )}

                  {activeKey === "active-demo" && (
                    <p className="mt-3.5 text-[13px] leading-relaxed text-[#2D5542]">
                      Pengajuan setor dan OCR timbangan disiapkan untuk tahap mitra berikutnya, sedangkan{" "}
                      <mark className="rounded bg-[#E6F6EE] px-1.5 py-0.5 font-semibold text-[#0F3D2E]">
                        verifikasi foto 5 Aksi Hijau sudah aktif
                      </mark>{" "}
                      untuk diuji langsung di Portal Warga.
                    </p>
                  )}
                </div>

                {/* Tab-specific Structured Visual Block (Compact & Height-Matched) */}
                {activeKey === "frame" && (
                  <div className="rounded-2xl border border-emerald-950/15 bg-[#0D3528] p-3.5 text-white">
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-12">
                      {/* Left Zone: Material */}
                      <div className="flex flex-col justify-between rounded-xl border border-dashed border-emerald-400/35 bg-white/[0.06] p-3 sm:col-span-7">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          <span>Zona A · Objek Material</span>
                          <span className="text-[#6EE7B7]">✓ Utuh</span>
                        </div>
                        <div className="my-2 grid grid-cols-2 gap-2">
                          <div className="rounded-lg bg-white/[0.08] px-2.5 py-1.5">
                            <p className="text-[11px] font-bold text-white">Botol PET 1</p>
                            <p className="text-[10px] text-emerald-200/80">Bening &amp; kering</p>
                          </div>
                          <div className="rounded-lg bg-white/[0.08] px-2.5 py-1.5">
                            <p className="text-[11px] font-bold text-white">Kardus Lipat</p>
                            <p className="text-[10px] text-emerald-200/80">Rata &amp; diikat</p>
                          </div>
                        </div>
                        <p className="text-[10px] text-emerald-100/75">
                          Berada di atas pelat timbangan yang sama
                        </p>
                      </div>

                      {/* Right Zone: Scale LCD */}
                      <div className="flex flex-col justify-between rounded-xl border border-emerald-400/40 bg-[#062118] p-3 sm:col-span-5">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          <span>Zona B · Layar LCD</span>
                          <Scale className="h-3 w-3 text-[#6EE7B7]" aria-hidden="true" />
                        </div>
                        <div className="my-1.5 rounded-lg border border-emerald-400/30 bg-[#041610] py-2 text-center">
                          <span className="block text-[9px] font-bold uppercase tracking-widest text-emerald-300/75">
                            Berat Aktual
                          </span>
                          <span className="text-2xl font-extrabold tabular-nums tracking-tight text-[#6EE7B7]">
                            3.45 <span className="text-xs font-bold">kg</span>
                          </span>
                        </div>
                        <p className="text-center text-[10px] text-emerald-100/80">
                          <span className="font-semibold text-[#6EE7B7]">Angka tajam</span>
                          <span className="mx-1.5 text-emerald-400/50">·</span>
                          <span>Bebas bayangan</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5 text-[10.5px] text-emerald-100/85">
                      <span className="inline-flex items-center gap-1.5">
                        <Check size={12} className="text-[#6EE7B7]" />
                        <span>1 bingkai memuat material &amp; layar angka</span>
                      </span>
                      <span className="text-emerald-300/90">EXIF lokasi rumah dibersihkan</span>
                    </div>
                  </div>
                )}

                {activeKey === "ai-checks" && (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {AI_QUEUE_STEPS.map((step) => (
                      <div
                        key={step.code}
                        className="flex flex-col justify-between rounded-xl border border-emerald-900/10 bg-[#FAFDFB] p-3 transition-colors hover:border-[#1D9E75]/35"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded bg-[#E6F6EE] px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums text-[#0F3D2E]">
                              {step.code}
                            </span>
                            <span className="text-[10px] font-semibold text-[#1D9E75]">
                              {step.tag}
                            </span>
                          </div>
                          <p className="mt-2 text-xs font-bold text-[#0F3D2E]">
                            {step.title}
                          </p>
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#426352]">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeKey === "manual-review" && (
                  <div className="space-y-2">
                    {MANUAL_STEPS.map((item) => (
                      <div
                        key={item.step}
                        className="flex items-start gap-3 rounded-xl border border-emerald-900/10 bg-[#FAFDFB] p-3"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#E6F6EE] text-[11px] font-extrabold tabular-nums text-[#0F3D2E]">
                          {item.step}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <p className="text-xs font-bold text-[#0F3D2E]">{item.title}</p>
                            <span className="rounded-full border border-emerald-900/10 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#1D9E75]">
                              {item.role}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#426352]">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeKey === "active-demo" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      <div className="rounded-xl border border-emerald-300/60 bg-[#F2FAF6] p-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D9E75]">
                            Aktif Dicoba
                          </span>
                          <ShieldCheck size={14} className="text-[#1D9E75]" />
                        </div>
                        <p className="mt-1.5 text-xs font-bold text-[#0F3D2E]">
                          Verifikasi Foto 5 Aksi Hijau
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#2D5542]">
                          Unggah foto aksi, cek hash SHA-256, dan peroleh simulasi EcoPoints di Portal Warga.
                        </p>
                      </div>

                      <div className="rounded-xl border border-emerald-900/10 bg-[#FAFDFB] p-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                            Tahap Rancangan
                          </span>
                          <Scale size={14} className="text-amber-700" />
                        </div>
                        <p className="mt-1.5 text-xs font-bold text-[#0F3D2E]">
                          Setor, Jemput &amp; OCR Timbangan
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#426352]">
                          Pencatatan berat pengepul &amp; konversi poin per kg disiapkan untuk uji lapangan.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-900/10 bg-[#FAFDFB] px-4 py-2.5">
                      <span className="text-xs font-semibold text-[#0F3D2E]">
                        Ingin mencoba simulasi unggah foto sekarang?
                      </span>
                      <div className="flex items-center gap-3">
                        <Link
                          href="/tentang#rencana-setoran"
                          className="text-xs font-bold text-[#426352] underline underline-offset-4 hover:text-[#0F3D2E]"
                        >
                          Rencana setoran
                        </Link>
                        <Link
                          href="/login?role=warga"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#0F3D2E] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#18533F]"
                        >
                          <span>Masuk Portal Warga</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Consistent Bottom Document Status Line */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-900/10 pt-3 text-[11px] text-[#426352]">
              <span>
                Bagian {current.step} dari 04 · Alur setoran masih rancangan, Aksi Hijau aktif di demo
              </span>
              <Link
                href="/login?role=warga"
                className="font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
              >
                Uji Aksi Hijau <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
