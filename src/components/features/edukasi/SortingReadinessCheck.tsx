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
  const doneCount = current.items.filter((item) => checked[item.id]).length;
  const allReady = doneCount === current.items.length;
  const missingItems = current.items.filter((item) => !checked[item.id]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section
      id="cek-kesiapan"
      aria-labelledby="cek-kesiapan-title"
      className="scroll-mt-24 rounded-3xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-5 sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
            Langkah 02 · Pemeriksaan Mandiri Interaktif
          </span>
          <h2 id="cek-kesiapan-title" className="mt-3 text-xl font-black text-[#0F3D2E] sm:text-2xl">
            Checklist kesiapan sebelum diajukan
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3B5B49]">
            {current.subtitle}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Pilih jenis material"
          className="inline-flex w-fit rounded-full border border-emerald-200 bg-white p-1"
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
                className={`rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
        <ul className="space-y-3">
          {current.items.map((item) => {
            const isChecked = Boolean(checked[item.id]);
            return (
              <li key={item.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border bg-white p-4 transition-colors ${
                    isChecked
                      ? "border-emerald-500/60 bg-emerald-50/40"
                      : "border-emerald-950/[0.08] hover:border-emerald-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(item.id)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-emerald-400 text-[#0F3D2E] focus:ring-emerald-600"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-[#0F3D2E]">
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
          className="flex flex-col justify-between rounded-2xl border border-emerald-950/[0.08] bg-white p-5 sm:p-6"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800">
                Hasil Pemeriksaan Mandiri
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-xs font-bold text-[#0F3D2E]">
                {doneCount}/{current.items.length} syarat
              </span>
            </div>

            {allReady ? (
              <div className="mt-4 flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="font-bold text-[#0F3D2E]">
                    {current.label} siap diajukan untuk diperiksa pengepul
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#4D6D5B]">
                    Pemeriksaan mandiri ini membantu memastikan kondisi awal dari rumah. Pemeriksaan fisik material dan penimbangan akhir tetap dilakukan oleh pengepul saat setor atau jemput.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                <div>
                  <p className="font-bold text-[#0F3D2E]">
                    Masih ada {missingItems.length} syarat yang perlu diperiksa mandiri
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#4D6D5B]">
                    Pastikan seluruh langkah persiapan di samping terpenuhi agar material tidak ditolak saat diperiksa pengepul.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-emerald-100 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard/eco-action"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#18533F]"
              >
                <span>Uji bukti foto di Aksi Hijau</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              {doneCount > 0 && (
                <button
                  type="button"
                  onClick={() => setChecked({})}
                  className="text-xs font-semibold text-slate-600 underline underline-offset-4 hover:text-[#0F3D2E]"
                >
                  Atur ulang
                </button>
              )}
            </div>
            <a
              href="#setor-atau-jemput"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-[#0F3D2E]"
            >
              <span>Lanjut ke Langkah 03: Setor atau jemput</span>
              <ArrowDown size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
