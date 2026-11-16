import { Camera, CheckCircle2, Scale, ShieldCheck } from "lucide-react";

interface WeighingPhotoIllustrationProps {
  compact?: boolean;
}

/**
 * Clean UI specification card depicting a single transaction photo frame
 * that captures both sorted material (PET bottles & folded cardboard) and
 * the digital scale readout (3.45 kg) simultaneously.
 */
export default function WeighingPhotoIllustration({
  compact = false,
}: WeighingPhotoIllustrationProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0D3528] text-white ${
        compact
          ? "rounded-xl p-3.5"
          : "rounded-2xl border border-emerald-900/15 p-4 sm:p-5"
      }`}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(52,211,153,0.16),transparent_60%)]"
      />

      {/* Top Camera Viewfinder Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#34D399]" />
          <Camera className="h-3.5 w-3.5 shrink-0 text-[#6EE7B7]" aria-hidden="true" />
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-100">
            Kamera Bukti BONI
          </span>
        </div>
        <span className="whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[9.5px] font-bold text-[#6EE7B7]">
          1 Frame Wajib
        </span>
      </div>

      {/* Dual Inspection Zones inside 1 Frame */}
      <div
        className={`relative z-10 mt-3 grid gap-2.5 ${
          compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-12"
        }`}
      >
        {/* Zone 1: Sorted Material on Platform */}
        <div
          className={`flex flex-col justify-between rounded-xl border border-dashed border-emerald-400/35 bg-white/[0.06] p-3 ${
            compact ? "" : "sm:col-span-7"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              1. Material Terpilah
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[10px] font-semibold text-[#6EE7B7]">
              <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Utuh
            </span>
          </div>

          <div className="my-2 space-y-1.5">
            <div className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.07] px-2.5 py-1.5 text-[11px]">
              <span className="font-semibold text-white">Botol PET (Kode 1)</span>
              <span className="shrink-0 whitespace-nowrap text-[10px] text-emerald-200/85">
                Bening &amp; kering
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.07] px-2.5 py-1.5 text-[11px]">
              <span className="font-semibold text-white">Kardus Terlipat</span>
              <span className="shrink-0 whitespace-nowrap text-[10px] text-emerald-200/85">
                Diikat rapi
              </span>
            </div>
          </div>

          <p className="text-[10px] text-emerald-100/75">
            Tampak jelas di atas pelat timbangan
          </p>
        </div>

        {/* Zone 2: Digital Scale Readout */}
        <div
          className={`rounded-xl border border-emerald-400/40 bg-[#072219] p-3 ${
            compact
              ? "flex flex-wrap items-center justify-between gap-3"
              : "flex flex-col justify-between sm:col-span-5"
          }`}
        >
          <div className={compact ? "space-y-1" : "flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-300"}>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <Scale className="h-3 w-3 text-[#6EE7B7]" aria-hidden="true" />
              <span>2. Layar Timbang</span>
            </div>
            {compact && (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10px] text-emerald-100/80">
                <span className="inline-flex items-center gap-1 font-medium text-[#6EE7B7]">
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" /> Angka tajam
                </span>
                <span>Bebas bayangan</span>
              </div>
            )}
          </div>

          <div
            className={`rounded-lg border border-emerald-400/30 bg-[#041710] px-3 py-1.5 text-center ${
              compact ? "shrink-0" : "my-2 py-2"
            }`}
          >
            <span className="block text-[9px] font-bold uppercase tracking-widest text-emerald-300/75">
              Berat Aktual
            </span>
            <span className="mt-0.5 block whitespace-nowrap text-xl font-extrabold tabular-nums tracking-tight text-[#6EE7B7] sm:text-2xl">
              3.45 <span className="text-xs font-bold">kg</span>
            </span>
          </div>

          {!compact && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-emerald-100/80">
              <span className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-[#6EE7B7]">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" /> Angka tajam
              </span>
              <span className="whitespace-nowrap">Bebas bayangan</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
