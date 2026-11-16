"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Check,
  FileText,
  ShieldAlert,
  Sparkles,
  Wrench,
} from "lucide-react";
import WeighingPhotoIllustration from "./WeighingPhotoIllustration";

type VerificationTabKey = "frame" | "ai-checks" | "manual-review" | "active-demo";

interface DocSectionTab {
  key: VerificationTabKey;
  kicker: string;
  summary: string;
  breadcrumb: string;
  badgeText: string;
  badgeTone: "amber" | "emerald" | "neutral";
  docTitle: string;
  metaLine: string;
}

const DOC_TABS: DocSectionTab[] = [
  {
    key: "frame",
    kicker: "STANDAR 1 FOTO TIMBANGAN",
    summary:
      "Material terpilah dan angka layar timbangan digital wajib terlihat tajam dalam satu bingkai foto transaksi.",
    breadcrumb: "Panduan foto timbangan",
    badgeText: "Ilustrasi 1 Frame",
    badgeTone: "amber",
    docTitle: "Posisi foto bukti saat penimbangan",
    metaLine: "Rancangan Alur Setor · Warga & Pengepul",
  },
  {
    key: "ai-checks",
    kicker: "PEMERIKSAAN AI (RANCANGAN)",
    summary:
      "Empat pemeriksaan berbantuan AI disiapkan untuk menyaring foto sebelum diverifikasi tim lapangan.",
    breadcrumb: "Tahapan penyaringan AI",
    badgeText: "Rancangan",
    badgeTone: "neutral",
    docTitle: "Empat langkah pemeriksaan foto setoran",
    metaLine: "AI-01 s.d. AI-04 · Pratinjau rancangan",
  },
  {
    key: "manual-review",
    kicker: "PENINJAUAN MANUAL & FISIK",
    summary:
      "Bila bukti foto meragukan, transaksi tetap mengandalkan pengecekan fisik pengepul dan peninjauan admin.",
    breadcrumb: "Jika bukti meragukan",
    badgeText: "Kontrol Lapangan",
    badgeTone: "amber",
    docTitle: "Pemeriksaan fisik & mitigasi kesalahan",
    metaLine: "Pengepul Mitra & Admin Verifikator",
  },
  {
    key: "active-demo",
    kicker: "JALUR AKTIF DEMO WARGA",
    summary:
      "Berbeda dari OCR timbangan yang masih dirancang, verifikasi foto Aksi Hijau sudah dapat dicoba di Portal Warga.",
    breadcrumb: "Status demo saat ini",
    badgeText: "Demo Aktif",
    badgeTone: "emerald",
    docTitle: "Verifikasi Aksi Hijau aktif di demo Warga",
    metaLine: "Portal Warga · Pengujian interaktif terbuka",
  },
];

const AI_QUEUE_STEPS = [
  {
    code: "AI-01",
    title: "Membaca jenis material",
    detail: "Membantu mengenali apakah material di foto sesuai pengajuan botol PET atau kardus.",
  },
  {
    code: "AI-02",
    title: "Membaca angka timbangan (OCR)",
    detail: "Membaca angka berat pada layar timbangan digital untuk dicocokkan dengan catatan transaksi.",
  },
  {
    code: "AI-03",
    title: "Memeriksa kualitas foto",
    detail: "Mengecek ketajaman, pencahayaan, dan apakah material serta layar timbang berada dalam satu foto.",
  },
  {
    code: "AI-04",
    title: "Menandai indikasi duplikasi",
    detail: "Mendeteksi apabila foto transaksi yang sama berulang kali diajukan kembali.",
  },
] as const;

/**
 * Linear `/plan`-inspired collaborative specification showcase for #setelah-ditimbang:
 * left 4-topic selector rail paired with a clean spacious right document panel
 * showing weighing camera framing, AI verification checks, manual fallback, and demo status.
 */
export default function VerificationShowcaseStage() {
  const [activeKey, setActiveKey] = useState<VerificationTabKey>("frame");
  const current = DOC_TABS.find((tab) => tab.key === activeKey) ?? DOC_TABS[0];

  const badgeClass =
    current.badgeTone === "emerald"
      ? "border-emerald-200 bg-[#E6F8EE] text-[#0F3D2E]"
      : current.badgeTone === "amber"
        ? "border-amber-200 bg-amber-50 text-amber-900"
        : "border-emerald-950/10 bg-[#FAFDFB] text-[#4D6D5B]";

  return (
    <div className="rounded-2xl border border-emerald-900/12 bg-[#F2F8F4] p-4 shadow-[0_14px_34px_-16px_rgba(15,61,46,0.08)] sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center lg:gap-8">
        {/* Left Interactive Topic Selector Rail */}
        <div
          role="tablist"
          aria-label="Pilih detail verifikasi setelah ditimbang"
          className="space-y-2 md:col-span-5"
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
                className={`block w-full rounded-xl px-4 py-3.5 text-left transition-all ${
                  isActive
                    ? "border border-emerald-900/12 bg-white shadow-[0_10px_24px_-12px_rgba(15,61,46,0.12)]"
                    : "border border-transparent hover:bg-white/60"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                  {tab.kicker}
                </p>
                <p
                  className={`mt-1 text-xs leading-relaxed ${
                    isActive ? "text-[#2D5542]" : "text-[#426352]"
                  }`}
                >
                  {tab.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Spacious Document Frame */}
        <div
          role="tabpanel"
          className="flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-emerald-900/12 bg-white shadow-[0_20px_44px_-16px_rgba(15,61,46,0.12)] md:col-span-7"
        >
          {/* Clean Top Breadcrumb Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 bg-[#FAFDFB] px-5 py-3">
            <div className="flex items-center gap-2 text-xs text-[#426352]">
              <Wrench size={12} className="text-[#1D9E75]" aria-hidden="true" />
              <span className="font-bold text-[#0F3D2E]">verifikasi-boni</span>
              <span aria-hidden="true">›</span>
              <span>{current.breadcrumb}</span>
            </div>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}
            >
              {current.badgeText}
            </span>
          </div>

          {/* Document Content Body */}
          <div className="flex-1 p-5 sm:p-7">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-900/10 bg-[#F5FAF7] text-[#0F3D2E]">
              {activeKey === "frame" ? (
                <Camera size={15} aria-hidden="true" />
              ) : activeKey === "manual-review" ? (
                <ShieldAlert size={15} aria-hidden="true" />
              ) : activeKey === "active-demo" ? (
                <Sparkles size={15} className="text-[#1D9E75]" aria-hidden="true" />
              ) : (
                <FileText size={15} aria-hidden="true" />
              )}
            </div>

            <h3 className="mt-4 text-lg font-extrabold tracking-tight text-[#0F3D2E] sm:text-xl">
              {current.docTitle}
            </h3>
            <p className="mt-1 text-xs font-medium text-[#426352]">{current.metaLine}</p>

            {/* Tab-specific rich document body */}
            {activeKey === "frame" && (
              <div className="mt-4 space-y-4">
                <p className="text-[13px] leading-relaxed text-[#2D5542]">
                  Warga mengambil satu foto transaksi yang memastikan{" "}
                  <mark className="rounded bg-[#E8F5EE] px-1.5 py-0.5 font-semibold text-[#0F3D2E]">
                    material terpilah terlihat jelas
                  </mark>{" "}
                  di atas platform sekaligus{" "}
                  <mark className="rounded bg-amber-100/80 px-1.5 py-0.5 font-semibold text-amber-950">
                    angka timbang terbaca tajam
                  </mark>{" "}
                  tanpa tertutup bayangan.
                </p>

                <div className="overflow-hidden rounded-xl border border-emerald-900/10">
                  <WeighingPhotoIllustration compact />
                </div>
              </div>
            )}

            {activeKey === "ai-checks" && (
              <div className="mt-5 space-y-3">
                <p className="text-[13px] leading-relaxed text-[#2D5542]">
                  Pada alur setoran yang sedang dirancang, sistem AI membantu menyaring kualitas bukti transaksi sebelum pemeriksaan akhir pengepul:
                </p>
                <ul className="space-y-2.5">
                  {AI_QUEUE_STEPS.map((step) => (
                    <li
                      key={step.code}
                      className="rounded-xl border border-emerald-900/10 bg-[#FAFDFB] p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold tabular-nums text-[#1D9E75]">
                          {step.code}
                        </span>
                        <span className="text-xs font-bold text-[#0F3D2E]">
                          {step.title}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#426352]">
                        {step.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeKey === "manual-review" && (
              <div className="mt-5 space-y-4">
                <p className="text-[13px] leading-relaxed text-[#2D5542]">
                  Verifikasi AI berperan sebagai penyaring awal. Keputusan penerimaan material tetap mengandalkan{" "}
                  <mark className="rounded bg-amber-100/80 px-1.5 py-0.5 font-semibold text-amber-950">
                    pemeriksaan fisik &amp; manual
                  </mark>{" "}
                  bila bukti foto meragukan.
                </p>

                <ul className="space-y-2 text-xs leading-relaxed text-[#2D5542]">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                    <span>Pengepul memeriksa langsung kondisi bersih/kering botol PET dan kardus di lokasi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                    <span>Admin meninjau ulang transaksi bertanda ragu sebelum poin divalidasi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                    <span>Transaksi valid direncanakan menghasilkan EcoPoints untuk voucher mitra UMKM.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeKey === "active-demo" && (
              <div className="mt-5 space-y-4">
                <p className="text-[13px] leading-relaxed text-[#2D5542]">
                  Pengajuan setor, penjemputan, dan OCR timbangan tersimpan sebagai rancangan tahap lanjut, sedangkan{" "}
                  <mark className="rounded bg-[#E8F5EE] px-1.5 py-0.5 font-semibold text-[#0F3D2E]">
                    verifikasi foto Aksi Hijau sudah aktif
                  </mark>{" "}
                  untuk diuji langsung oleh warga.
                </p>

                <ul className="space-y-2 text-xs leading-relaxed text-[#2D5542]">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                    <span>Uji unggah foto 5 kebiasaan hijau dengan batas demo &amp; pemeriksaan hash SHA-256.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                    <span>Transaksi setoran PET/kardus serta konversi EcoPoints per kilogram ditetapkan pada tahap mitra berikutnya.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/dashboard/eco-action"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#18533F]"
                  >
                    <span>Coba Verifikasi Aksi Hijau</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/tentang#rencana-setoran"
                    className="text-xs font-bold text-[#0F3D2E] underline underline-offset-4 hover:text-[#1D9E75]"
                  >
                    Baca ringkasan rancangan
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bottom quick navigation bar inside document frame */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-emerald-900/10 bg-[#FAFDFB] px-5 py-3 text-xs">
            <span className="text-[#426352]">
              Alur setoran masih rancangan · Aksi Hijau aktif di demo
            </span>
            <Link
              href="/dashboard/eco-action"
              className="font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
            >
              Uji Aksi Hijau →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
