import { Check, Camera, Scale, Recycle, PackageCheck, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function EducationPillarsGrid() {
  return (
    <div className="relative border-y border-emerald-950/[0.08]">
      {/* Architectural corner crosshair ticks */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1.5 -top-1.5 hidden h-3 w-3 items-center justify-center text-[11px] font-light leading-none text-[#1D9E75]/60 md:flex"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1.5 -top-1.5 hidden h-3 w-3 items-center justify-center text-[11px] font-light leading-none text-[#1D9E75]/60 md:flex"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 -left-1.5 hidden h-3 w-3 items-center justify-center text-[11px] font-light leading-none text-[#1D9E75]/60 md:flex"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 -right-1.5 hidden h-3 w-3 items-center justify-center text-[11px] font-light leading-none text-[#1D9E75]/60 md:flex"
      >
        +
      </span>

      <div className="grid grid-cols-1 divide-y divide-emerald-950/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
        {/* ── Column 1: FIG 0.1 — Pilah material ── */}
        <ScrollReveal
          delay={0}
          className="group relative flex flex-col justify-between py-9 transition-colors duration-300 hover:bg-[#F5FAF7]/60 md:px-7 md:py-10 md:first:pl-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums text-[#4D6D5B]/85">
              FIG 0.1
            </span>
            <span className="text-[11px] font-semibold text-[#1D9E75]">
              2 Material Utama
            </span>
          </div>

          {/* Open Floating UI Vignette 01: Layered Material Classification Cards */}
          <div className="relative my-7 flex h-52 items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 inset-y-2 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,158,117,0.10),transparent_70%)]"
            />

            <div className="relative w-full max-w-[268px] space-y-2">
              {/* Card 1: Botol PET */}
              <div className="flex items-center justify-between rounded-xl border border-emerald-950/[0.09] bg-white px-3 py-2 shadow-[0_10px_24px_-14px_rgba(15,61,46,0.18)] transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EBF7F1] text-[#0F3D2E]">
                    <Recycle className="h-3.5 w-3.5 text-[#1D9E75]" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#0F3D2E]">Botol Plastik PET</p>
                    <p className="truncate text-[10.5px] text-[#4D6D5B]">Kode 1 · Bening &amp; kering</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-[#1D9E75]/25 bg-[#F2FAF6] px-2 py-0.5 text-[10px] font-bold text-[#1D9E75]">
                  Diterima
                </span>
              </div>

              {/* Card 2: Kardus Kering */}
              <div className="flex items-center justify-between rounded-xl border border-emerald-950/[0.09] bg-white px-3 py-2 shadow-[0_10px_24px_-14px_rgba(15,61,46,0.18)] transition-transform duration-300 delay-75 motion-safe:group-hover:-translate-y-0.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EBF7F1] text-[#0F3D2E]">
                    <PackageCheck className="h-3.5 w-3.5 text-[#1D9E75]" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#0F3D2E]">Kardus &amp; Karton</p>
                    <p className="truncate text-[10.5px] text-[#4D6D5B]">Dilipat rata · Bebas minyak</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-[#1D9E75]/25 bg-[#F2FAF6] px-2 py-0.5 text-[10px] font-bold text-[#1D9E75]">
                  Diterima
                </span>
              </div>

              {/* Card 3: Separated Organic/Wet Residue */}
              <div className="flex items-center justify-between rounded-xl border border-dashed border-emerald-950/[0.12] bg-[#F7FAF8]/90 px-3 py-1.5 opacity-75">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500/80" />
                  <p className="truncate text-[10.5px] font-medium text-[#4D6D5B]">
                    Sisa makanan &amp; basah
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-semibold text-[#4D6D5B]">
                  Dipisahkan
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight text-[#0F3D2E]">
              Pilah material
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#426352]">
              Pisahkan botol plastik PET (kode 1) dan kardus kering dari sisa makanan atau sampah dapur yang mudah membusuk.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Column 2: FIG 0.2 — Cek kesiapan ── */}
        <ScrollReveal
          delay={0.08}
          className="group relative flex flex-col justify-between py-9 transition-colors duration-300 hover:bg-[#F5FAF7]/60 md:px-7 md:py-10"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums text-[#4D6D5B]/85">
              FIG 0.2
            </span>
            <span className="text-[11px] font-semibold text-[#1D9E75]">
              3 Syarat Mandiri
            </span>
          </div>

          {/* Open Floating UI Vignette 02: Interactive-style Readiness Checklist Card */}
          <div className="relative my-7 flex h-52 items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 inset-y-2 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,158,117,0.10),transparent_70%)]"
            />

            <div className="relative w-full max-w-[268px] rounded-2xl border border-emerald-950/[0.09] bg-white p-3.5 shadow-[0_14px_30px_-16px_rgba(15,61,46,0.18)] transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5">
              {/* Top progress header */}
              <div className="mb-3 flex items-center justify-between border-b border-emerald-950/[0.06] pb-2.5">
                <span className="text-[11px] font-bold text-[#0F3D2E]">
                  Kesiapan Material
                </span>
                <span className="rounded-full bg-[#0F3D2E] px-2 py-0.5 text-[10px] font-bold tabular-nums text-white">
                  3/3 Siap
                </span>
              </div>

              {/* 3 Checklist Rows */}
              <div className="space-y-2">
                {[
                  "Sisa cairan dikosongkan & dibilas",
                  "Tutup botol & lakban dilepas",
                  "Kardus dilipat pipih & diikat rapi",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg bg-[#F5FAF7] px-2.5 py-1.5"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1D9E75] text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                    <span className="text-[11.5px] font-medium text-[#0F3D2E]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight text-[#0F3D2E]">
              Cek kesiapan
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#426352]">
              Gunakan checklist interaktif untuk memastikan botol kering, lakban berlebih lepas, dan kardus sudah terlipat rata.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Column 3: FIG 0.3 — Siapkan bukti foto ── */}
        <ScrollReveal
          delay={0.16}
          className="group relative flex flex-col justify-between py-9 transition-colors duration-300 hover:bg-[#F5FAF7]/60 md:px-7 md:py-10 md:last:pr-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums text-[#4D6D5B]/85">
              FIG 0.3
            </span>
            <span className="text-[11px] font-semibold text-[#1D9E75]">
              1 Bingkai Bukti
            </span>
          </div>

          {/* Open Floating UI Vignette 03: Camera Viewfinder + Digital Scale Readout */}
          <div className="relative my-7 flex h-52 items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 inset-y-2 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,158,117,0.10),transparent_70%)]"
            />

            <div className="relative w-full max-w-[268px] overflow-hidden rounded-2xl border border-emerald-950/15 bg-[#0F3D2E] p-3.5 text-white shadow-[0_14px_30px_-14px_rgba(15,61,46,0.28)] transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5">
              {/* Viewfinder top bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-emerald-300">
                  <Camera className="h-3 w-3" />
                  <span>FRAME BUKTI SETOR</span>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-200">
                  EXIF Aman
                </span>
              </div>

              {/* Dual-target capture preview */}
              <div className="mt-2.5 grid grid-cols-12 gap-2">
                <div className="col-span-7 flex flex-col justify-between rounded-xl border border-emerald-400/25 bg-white/[0.06] p-2.5">
                  <span className="text-[9.5px] font-medium text-emerald-200/80">
                    Objek Terpilah
                  </span>
                  <p className="mt-1 text-xs font-bold text-white">
                    PET &amp; Kardus Utuh
                  </p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[9.5px] font-semibold text-emerald-300">
                    <ShieldCheck className="h-3 w-3" /> Terbaca Jelas
                  </span>
                </div>

                <div className="col-span-5 flex flex-col justify-between rounded-xl border border-emerald-400/35 bg-[#09271D] p-2.5">
                  <div className="flex items-center justify-between text-[9.5px] text-emerald-300/80">
                    <span>Timbangan</span>
                    <Scale className="h-2.5 w-2.5" />
                  </div>
                  <p className="mt-1 text-base font-extrabold tabular-nums tracking-tight text-[#6EE7B7]">
                    3.45 <span className="text-[10px] font-bold">kg</span>
                  </p>
                  <span className="mt-1 text-[9px] font-medium text-emerald-200/75">
                    Layar Tajam
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight text-[#0F3D2E]">
              Siapkan bukti foto
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#426352]">
              Pahami syarat satu foto material bersama angka timbangan serta uji pemeriksaan foto AI yang aktif di demo Warga.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
