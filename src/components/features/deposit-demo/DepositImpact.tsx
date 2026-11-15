"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDepositDemoRecords } from "@/hooks/useDepositDemoRecords";
import { getDepositTotals } from "@/store/deposit-demo.store";

const number = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 });

export default function DepositImpact() {
  const { deposits, hydrated } = useDepositDemoRecords();
  const totals = getDepositTotals(deposits);
  const pendingCount = deposits.length - totals.count;

  const metrics = [
    {
      tag: "Transaksi",
      tagColor: "text-emerald-700",
      label: "Setoran terverifikasi",
      value: number.format(totals.count),
      unit: "Simulasi",
      detail: "Hanya setoran berstatus Terverifikasi (simulasi) berdasarkan berat aktual timbang.",
    },
    {
      tag: "PET · Kode 1",
      tagColor: "text-teal-700",
      label: "Botol PET terverifikasi",
      value: number.format(totals.byMaterial.pet),
      unit: "kg",
      detail: "Akumulasi berat aktual botol plastik PET yang lolos pemeriksaan material.",
    },
    {
      tag: "Kardus",
      tagColor: "text-amber-700",
      label: "Kardus terverifikasi",
      value: number.format(totals.byMaterial.cardboard),
      unit: "kg",
      detail: "Akumulasi berat aktual kardus bersih dan kering setelah penimbangan pengepul.",
    },
  ];

  let statusNote = "Memuat ringkasan simulasi dari browser ini…";
  if (hydrated) {
    if (deposits.length === 0) {
      statusNote =
        "Belum ada pengajuan setoran di browser ini. Ajukan setoran di Dashboard Warga, catat berat aktual di Portal Pengepul, lalu simulasikan verifikasi untuk memperbarui metrik.";
    } else if (totals.count === 0) {
      statusNote = `Ada ${number.format(deposits.length)} pengajuan simulasi yang menunggu penimbangan atau verifikasi. Selesaikan tahap tersebut di Portal Pengepul agar terhitung di sini.`;
    } else {
      const pendingText =
        pendingCount > 0 ? ` (${number.format(pendingCount)} pengajuan lain masih dalam proses)` : "";
      statusNote = `Menampilkan ${number.format(totals.count)} setoran terverifikasi dengan total ${number.format(totals.kg)} kg berat aktual di browser ini${pendingText}.`;
    }
  }

  return (
    <section
      id="dampak-lingkungan"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-emerald-950/[0.06] bg-[#FAFDFB]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_450px_at_50%_15%,rgba(29,158,117,0.06)_0%,transparent_80%)]" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px] leading-snug sm:leading-tight lg:leading-[1.22]">
            Dampak lingkungan{" "}
            <span className="text-[#1D9E75]">dalam simulasi</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#2D5542] sm:text-base">
            Ringkasan ini dihitung dari setoran demo di browser ini yang telah ditimbang dan berstatus terverifikasi—bukan data produksi atau klaim pengurangan emisi tanpa dasar pengukuran.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-emerald-950/[0.08] bg-white/80 p-3 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(15,61,46,0.08)] sm:p-4">
          <dl className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {metrics.map(({ tag, tagColor, label, value, unit, detail }) => (
              <div
                key={label}
                className="flex flex-col justify-between rounded-2xl border border-emerald-950/[0.05] bg-gradient-to-br from-white to-emerald-50/40 p-4 transition-all hover:bg-white hover:shadow-sm"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <dd className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F3D2E]">
                        {hydrated ? value : "—"}
                      </dd>
                      <span className={`text-[11px] font-mono font-bold uppercase ${tagColor}`}>
                        {unit}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3B5B49]">
                      {tag}
                    </span>
                  </div>
                  <dt className="mt-1 text-xs font-semibold text-[#2D5542]">{label}</dt>
                </div>
                <p className="mt-3 border-t border-gray-100 pt-2.5 text-xs leading-relaxed text-[#4D6D5B]">
                  {detail}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 rounded-3xl border border-emerald-950/[0.08] bg-white p-6 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                Status Data Browser Ini
              </p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#2D5542] sm:text-sm">
                {statusNote}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/pengepul"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#0F3D2E]/20 bg-white/95 px-6 py-3 text-sm font-bold text-[#0F3D2E] shadow-sm backdrop-blur-sm transition-all hover:border-[#0F3D2E]/40 hover:bg-emerald-50/60"
              >
                Buka Portal Pengepul
              </Link>
              <Link
                href="/dashboard#setoran-sampah"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0F3D2E]/20 transition-all hover:-translate-y-0.5 hover:bg-[#18533F] hover:shadow-xl active:scale-[0.98]"
              >
                <span>Coba alur setoran</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
