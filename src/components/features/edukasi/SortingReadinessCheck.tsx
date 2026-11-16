"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";

type MaterialKey = "pet" | "cardboard";

const CHECKLISTS: Record<
  MaterialKey,
  {
    label: string;
    subtitle: string;
    items: { id: string; text: string; tip: string }[];
  }
> = {
  pet: {
    label: "Botol plastik PET (kode 1)",
    subtitle: "Centang ketiga kondisi berikut sebagai pemeriksaan mandiri sebelum mengajukan setoran botol PET.",
    items: [
      {
        id: "pet-code",
        text: "Kemasan berjenis PET (tanda segitiga angka 1) dan bukan plastik campuran/sachet",
        tip: "Periksa simbol segitiga angka 1 di bagian bawah atau label botol.",
      },
      {
        id: "pet-dry",
        text: "Isi botol sudah kosong, dibilas seperlunya, dan ditiriskan sampai kering",
        tip: "Sisa cairan membuat timbangan kurang akurat dan mengotori tumpukan material.",
      },
      {
        id: "pet-sep",
        text: "Disimpan terpisah dari sampah organik/basah serta kemasan non-PET",
        tip: "Tanyakan ke titik setoran setempat apakah tutup dan label perlu dilepas.",
      },
    ],
  },
  cardboard: {
    label: "Kardus dan karton",
    subtitle: "Centang ketiga kondisi berikut sebagai pemeriksaan mandiri sebelum mengajukan setoran kardus.",
    items: [
      {
        id: "cb-dry",
        text: "Kardus bersih, kering, dan bebas dari minyak atau sisa makanan",
        tip: "Bagian yang basah, berjamur, atau berminyak perlu disisihkan ke residu.",
      },
      {
        id: "cb-clean",
        text: "Plastik pembungkus, busa/styrofoam, lakban berlebih, dan isi sudah dikeluarkan",
        tip: "Pastikan hanya material karton/kardus yang tersisa saat ditimbang pengepul.",
      },
      {
        id: "cb-flat",
        text: "Kardus sudah dilipat rata agar ringkas disimpan dan mudah ditimbang",
        tip: "Melipat rata menghemat ruang angkut sekaligus mempercepat penimbangan.",
      },
    ],
  },
};

export default function SortingReadinessCheck() {
  const [material, setMaterial] = useState<MaterialKey>("pet");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const current = CHECKLISTS[material];
  const petDone = CHECKLISTS.pet.items.filter((item) => checked[item.id]).length;
  const cbDone = CHECKLISTS.cardboard.items.filter((item) => checked[item.id]).length;
  const doneCount = material === "pet" ? petDone : cbDone;
  const allReady = doneCount === current.items.length;
  const missingItems = current.items.filter((item) => !checked[item.id]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section
      id="cek-kesiapan"
      aria-labelledby="cek-kesiapan-title"
      className="scroll-mt-24 grid grid-cols-1 gap-6 lg:grid-cols-12"
    >
      {/* Left/Background Recessed Timeline Panel — mirrors Linear Planning roadmap */}
      <div className="order-2 flex flex-col justify-between rounded-2xl border border-emerald-950/[0.08] bg-white/95 p-5 shadow-[0_12px_28px_-12px_rgba(15,61,46,0.06)] sm:p-6 lg:order-1 lg:col-start-1 lg:col-end-7 lg:row-start-1">
        <div>
          <div className="grid grid-cols-4 border-b border-emerald-950/[0.07] pb-3 text-[10px] font-semibold uppercase tracking-wider tabular-nums text-[#4D6D5B]/75">
            <span>Tahap 01</span>
            <span>Tahap 02</span>
            <span>Tahap 03</span>
            <span className="text-right text-[#1D9E75]">Siap</span>
          </div>

          <div className="relative mt-6 space-y-5">
            {/* Timeline track: PET */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0F3D2E]">Botol PET (Kode 1)</span>
                <span className="tabular-nums text-[11px] font-medium text-[#4D6D5B]">
                  {petDone}/3 syarat
                </span>
              </div>
              <div className="h-7 rounded-lg border border-emerald-950/[0.08] bg-[#FAFDFB] p-1">
                <div
                  className="flex h-full items-center rounded-md bg-[#F0FAF4] px-2 text-[10px] font-semibold text-[#0F3D2E] transition-all duration-300"
                  style={{ width: `${Math.max(28, Math.round((petDone / 3) * 100))}%` }}
                >
                  <span className="truncate">
                    {petDone === 3 ? "Siap ditimbang" : "Pilah · Tiriskan"}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline track: Kardus */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0F3D2E]">Kardus &amp; Karton</span>
                <span className="tabular-nums text-[11px] font-medium text-[#4D6D5B]">
                  {cbDone}/3 syarat
                </span>
              </div>
              <div className="h-7 rounded-lg border border-emerald-950/[0.08] bg-[#FAFDFB] p-1">
                <div
                  className="flex h-full items-center rounded-md bg-[#F0FAF4] px-2 text-[10px] font-semibold text-[#0F3D2E] transition-all duration-300"
                  style={{ width: `${Math.max(28, Math.round((cbDone / 3) * 100))}%` }}
                >
                  <span className="truncate">
                    {cbDone === 3 ? "Siap ditimbang" : "Bersih · Lipat rata"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-xs text-xs leading-relaxed text-[#4D6D5B]/90">
          Progres pemeriksaan mandiri bersifat lokal untuk persiapan sebelum penimbangan fisik oleh pengepul.
        </p>
      </div>

      {/* Right/Foreground Elevated Interactive Checklist Panel — mirrors Linear Monitoring overlay */}
      <div className="order-1 relative z-10 rounded-2xl border border-emerald-950/[0.1] bg-white p-5 shadow-[0_24px_56px_-16px_rgba(15,61,46,0.16)] sm:p-6 lg:order-2 lg:col-start-5 lg:col-end-13 lg:row-start-1 lg:mt-14">
        <div className="flex flex-col gap-4 border-b border-emerald-950/[0.07] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3
              id="cek-kesiapan-title"
              className="text-base font-semibold tracking-tight text-[#0F3D2E] sm:text-lg"
            >
              Checklist kesiapan sebelum diajukan
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#4D6D5B] sm:text-[13px]">
              {current.subtitle}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Pilih jenis material"
            className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-emerald-200 bg-[#FAFDFB] p-1"
          >
            {(Object.keys(CHECKLISTS) as MaterialKey[]).map((key) => {
              const active = material === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMaterial(key)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-[#0F3D2E] text-white"
                      : "text-[#3B5B49] hover:text-[#0F3D2E]"
                  }`}
                >
                  {key === "pet" ? "Botol PET" : "Kardus"}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {current.items.map((item) => {
            const isChecked = Boolean(checked[item.id]);
            return (
              <li key={item.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                    isChecked
                      ? "border-emerald-500/60 bg-emerald-50/40"
                      : "border-emerald-950/[0.08] bg-[#FAFDFB] hover:border-emerald-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-emerald-400 text-[#0F3D2E] focus:ring-emerald-600"
                  />
                  <div className="min-w-0">
                    <span className="block text-[13px] font-semibold leading-snug text-[#0F3D2E]">
                      {item.text}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#4D6D5B]">
                      {item.tip}
                    </span>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>

        <div
          aria-live="polite"
          className="mt-5 flex flex-col gap-4 rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {allReady ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1D9E75]" aria-hidden="true" />
              ) : (
                <CircleAlert className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
              )}
              <span className="text-xs font-semibold text-[#0F3D2E]">
                {allReady
                  ? `${current.label} siap diajukan (${doneCount}/${current.items.length} syarat)`
                  : `Masih ada ${missingItems.length} syarat yang perlu diperiksa (${doneCount}/${current.items.length})`}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#4D6D5B]">
              {allReady
                ? "Pemeriksaan fisik dan penimbangan akhir tetap dilakukan pengepul saat setor atau jemput."
                : "Pastikan seluruh syarat di atas terpenuhi agar material tidak ditolak saat penimbangan."}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-4">
              <a
                href="#setor-atau-jemput"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F3D2E] hover:text-[#1D9E75]"
              >
                <span>Lanjut ke Langkah 03: Setor atau jemput</span>
                <ArrowDown size={12} aria-hidden="true" />
              </a>
              {doneCount > 0 && (
                <button
                  type="button"
                  onClick={() => setChecked({})}
                  className="text-xs font-semibold text-[#4D6D5B] underline underline-offset-4 hover:text-[#0F3D2E]"
                >
                  Atur ulang
                </button>
              )}
            </div>
          </div>

          <Link
            href="/dashboard/eco-action"
            className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#0F3D2E] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#18533F]"
          >
            <span>Uji bukti foto di Aksi Hijau</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
