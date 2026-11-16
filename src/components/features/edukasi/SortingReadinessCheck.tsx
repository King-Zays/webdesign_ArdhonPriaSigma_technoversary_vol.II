"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  CircleAlert,
  Hash,
  RotateCcw,
} from "lucide-react";
import LinearRuleColumns, { type LinearRuleTopic } from "./LinearRuleColumns";

type MaterialKey = "pet" | "cardboard";

const CHECKLISTS: Record<
  MaterialKey,
  {
    codePrefix: string;
    label: string;
    subtitle: string;
    items: { id: string; code: string; shortTitle: string; text: string; tip: string }[];
  }
> = {
  pet: {
    codePrefix: "PET",
    label: "Botol plastik PET (kode 1)",
    subtitle:
      "Centang ketiga kondisi berikut sebagai pemeriksaan mandiri sebelum mengajukan setoran botol PET.",
    items: [
      {
        id: "pet-code",
        code: "PET-01",
        shortTitle: "Verifikasi simbol PET segitiga angka 1",
        text: "Kemasan berjenis PET (tanda segitiga angka 1) dan bukan plastik campuran/sachet",
        tip: "Periksa simbol segitiga angka 1 di bagian bawah atau label botol.",
      },
      {
        id: "pet-dry",
        code: "PET-02",
        shortTitle: "Botol kosong, dibilas, & ditiriskan kering",
        text: "Isi botol sudah kosong, dibilas seperlunya, dan ditiriskan sampai kering",
        tip: "Sisa cairan membuat timbangan kurang akurat dan mengotori tumpukan material.",
      },
      {
        id: "pet-sep",
        code: "PET-03",
        shortTitle: "Terpisah dari sampah organik/basah",
        text: "Disimpan terpisah dari sampah organik/basah serta kemasan non-PET",
        tip: "Tanyakan ke titik setoran setempat apakah tutup dan label perlu dilepas.",
      },
    ],
  },
  cardboard: {
    codePrefix: "KRD",
    label: "Kardus dan karton",
    subtitle:
      "Centang ketiga kondisi berikut sebagai pemeriksaan mandiri sebelum mengajukan setoran kardus.",
    items: [
      {
        id: "cb-dry",
        code: "KRD-01",
        shortTitle: "Kardus bersih, kering, & bebas minyak",
        text: "Kardus bersih, kering, dan bebas dari minyak atau sisa makanan",
        tip: "Bagian yang basah, berjamur, atau berminyak perlu disisihkan ke residu.",
      },
      {
        id: "cb-clean",
        code: "KRD-02",
        shortTitle: "Bebas plastik, busa, & lakban berlebih",
        text: "Plastik pembungkus, busa/styrofoam, lakban berlebih, dan isi sudah dikeluarkan",
        tip: "Pastikan hanya material karton/kardus yang tersisa saat ditimbang pengepul.",
      },
      {
        id: "cb-flat",
        code: "KRD-03",
        shortTitle: "Kardus dilipat rata & ringkas diangkut",
        text: "Kardus sudah dilipat rata agar ringkas disimpan dan mudah ditimbang",
        tip: "Melipat rata menghemat ruang angkut sekaligus mempercepat penimbangan.",
      },
    ],
  },
};

const READINESS_TOPICS_COL_1: LinearRuleTopic[] = [
  {
    id: "pet-rule",
    label: "Checklist Botol PET",
    summary:
      "Pastikan simbol segitiga PET angka 1, botol bersih/kering ditiriskan, dan terpisah dari sampah basah atau sachet.",
  },
  {
    id: "cap-label",
    label: "Tutup & Label Botol",
    summary:
      "Tanyakan terlebih dahulu ke bank sampah atau titik setoran setempat apakah tutup dan label kemasan perlu dilepas.",
  },
];

const READINESS_TOPICS_COL_2: LinearRuleTopic[] = [
  {
    id: "cardboard-rule",
    label: "Checklist Kardus Kering",
    summary:
      "Kardus harus bebas minyak atau jamur, bersih dari plastik/busa pengisi, lalu dilipat rata sebelum ditimbang.",
  },
  {
    id: "next-step",
    label: "Setelah 3/3 Terpenuhi",
    summary:
      "Material siap diajukan ke opsi setor titik kumpul atau penjemputan rutin; pengecekan fisik akhir tetap dilakukan pengepul.",
  },
];

/**
 * Linear "Intake and integrations"-inspired interactive readiness stage for #cek-kesiapan:
 * left overlapping Thread-style checklist card live-synced with a right Kanban status board,
 * anchored by a 3-column metadata strip underneath.
 */
export default function SortingReadinessCheck() {
  const [material, setMaterial] = useState<MaterialKey>("pet");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const current = CHECKLISTS[material];
  const petDone = CHECKLISTS.pet.items.filter((item) => checked[item.id]).length;
  const cbDone = CHECKLISTS.cardboard.items.filter((item) => checked[item.id]).length;
  const doneItems = current.items.filter((item) => checked[item.id]);
  const missingItems = current.items.filter((item) => !checked[item.id]);
  const doneCount = doneItems.length;
  const totalCount = current.items.length;
  const allReady = doneCount === totalCount;
  const progressPercent = Math.round((doneCount / totalCount) * 100);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div id="cek-kesiapan" aria-labelledby="cek-kesiapan-title" className="scroll-mt-24">
      {/* Overlapping Intake Thread (Left Front) + Readiness Board (Right Back) */}
      <div className="relative grid grid-cols-1 gap-5 md:grid-cols-12 md:items-start">
        {/* Left/Front Card: Interactive Checklist Thread */}
        <div className="relative z-10 rounded-2xl border border-emerald-950/[0.12] bg-white p-4 shadow-[0_24px_48px_-14px_rgba(15,61,46,0.16)] sm:p-5 md:col-span-5 md:col-start-1 md:row-start-1">
          {/* Header Row resembling Linear's "Thread #product" */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 pb-3.5">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#F0FAF4] text-[#1D9E75]">
                <Hash size={13} aria-hidden="true" />
              </span>
              <h3
                id="cek-kesiapan-title"
                className="truncate text-xs font-bold text-[#0F3D2E]"
              >
                Checklist <span className="font-medium text-[#426352]">#pilah-mandiri</span>
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Pilih jenis material"
              className="inline-flex shrink-0 items-center rounded-full border border-emerald-200 bg-[#FAFDFB] p-0.5"
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
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      active
                        ? "bg-[#0F3D2E] text-white"
                        : "text-[#426352] hover:text-[#0F3D2E]"
                    }`}
                  >
                    {key === "pet" ? "Botol PET" : "Kardus"}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-[#426352]">
            {current.subtitle}
          </p>

          {/* 3 Checkable Message-like Rows */}
          <ul className="mt-3 space-y-2.5">
            {current.items.map((item) => {
              const isChecked = Boolean(checked[item.id]);
              return (
                <li key={item.id}>
                  <label
                    className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-colors ${
                      isChecked
                        ? "border-emerald-500/50 bg-[#F2F8F4]"
                        : "border-emerald-900/10 bg-[#FAFDFB] hover:border-emerald-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(item.id)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-emerald-400 text-[#0F3D2E] focus:ring-emerald-600"
                    />
                    <div className="min-w-0">
                      <span className="block text-xs font-bold leading-snug text-[#0F3D2E]">
                        {item.text}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-relaxed text-[#426352]">
                        {item.tip}
                      </span>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>

          {/* Bottom Compose/Prompt Bar echoing Linear's "@Linear create issues..." */}
          <div
            aria-live="polite"
            className="mt-3.5 rounded-xl border border-emerald-900/10 bg-[#FAFDFB] p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 rounded-md bg-[#E8F5EE] px-1.5 py-0.5 text-[10px] font-bold text-[#0F3D2E]">
                  @BONI
                </span>
                <span className="truncate text-xs font-semibold tabular-nums text-[#2D5542]">
                  {allReady
                    ? `${current.label} siap setor (${doneCount}/3)`
                    : `${missingItems.length} syarat tersisa (${doneCount}/3)`}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {(petDone > 0 || cbDone > 0) && (
                  <button
                    type="button"
                    onClick={() => setChecked({})}
                    title="Atur ulang checklist"
                    aria-label="Atur ulang checklist"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-900/15 bg-white text-[#426352] transition-colors hover:text-[#0F3D2E]"
                  >
                    <RotateCcw size={12} aria-hidden="true" />
                  </button>
                )}
                <Link
                  href="/dashboard/eco-action"
                  aria-label="Uji bukti foto di Aksi Hijau"
                  title="Uji bukti foto di Aksi Hijau"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F3D2E] text-white transition-colors hover:bg-[#18533F]"
                >
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Subtle inline readiness progress bar */}
            <div
              className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-emerald-950/[0.08]"
              role="progressbar"
              aria-label={`Kesiapan ${current.label}`}
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[#1D9E75] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right/Back Panel: Live-Synced 2-Column Readiness Kanban Board */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-900/12 bg-white p-5 shadow-[0_14px_34px_-14px_rgba(15,61,46,0.08)] md:col-span-9 md:col-start-4 md:row-start-1 md:mt-6 md:min-h-[380px] md:pl-[25%] lg:pl-[24%]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Kanban Col 1: Needs Check */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#0F3D2E]">
                <span className="inline-flex items-center gap-1.5">
                  <CircleAlert size={13} className="text-amber-600" aria-hidden="true" />
                  <span>Perlu Diperiksa</span>
                </span>
                <span className="tabular-nums text-[#426352]">{missingItems.length}</span>
              </div>

              <div className="space-y-2">
                {missingItems.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-emerald-900/20 bg-[#FAFDFB] p-3.5 text-center text-[11px] text-[#426352]">
                    Semua syarat {material === "pet" ? "Botol PET" : "Kardus"} telah diperiksa.
                  </div>
                ) : (
                  missingItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="block w-full rounded-xl border border-emerald-900/10 bg-[#FAFDFB] p-3 text-left transition-colors hover:border-emerald-300"
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] font-bold tabular-nums text-[#527362]">
                        <span>{item.code}</span>
                        <Circle size={11} className="text-amber-600" aria-hidden="true" />
                      </div>
                      <p className="mt-1.5 text-xs font-bold leading-snug text-[#0F3D2E]">
                        {item.shortTitle}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span className="text-[10px] font-medium text-[#426352]">
                          Belum dicentang
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Kanban Col 2: Ready / Checked */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#0F3D2E]">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#1D9E75]" aria-hidden="true" />
                  <span>Terpenuhi · Siap Setor</span>
                </span>
                <span className="tabular-nums text-[#426352]">{doneCount}</span>
              </div>

              <div className="space-y-2">
                {doneItems.length === 0 ? (
                  <>
                    <div className="rounded-xl border border-emerald-900/10 bg-[#FAFDFB]/80 p-3 text-[11px] leading-relaxed text-[#426352]">
                      Centang item di kartu kiri untuk memindahkan status siap setor ke kolom ini.
                    </div>
                    <div className="rounded-xl border border-emerald-900/10 bg-white p-3 opacity-60">
                      <p className="text-[10px] font-bold tabular-nums text-[#527362]">
                        {current.codePrefix}-OK
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#0F3D2E]">
                        Siap diajukan ke pengepul
                      </p>
                    </div>
                  </>
                ) : (
                  doneItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="block w-full rounded-xl border border-emerald-500/40 bg-[#F2F8F4] p-3 text-left transition-colors hover:bg-[#E8F5EE]"
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] font-bold tabular-nums text-[#1D9E75]">
                        <span>{item.code}</span>
                        <Check size={12} aria-hidden="true" />
                      </div>
                      <p className="mt-1.5 text-xs font-bold leading-snug text-[#0F3D2E]">
                        {item.shortTitle}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1D9E75]" />
                        <span className="text-[10px] font-semibold text-[#0F3D2E]">
                          Memenuhi syarat
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Soft right & bottom vignette matching Linear background ticket board */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/80 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/90 to-transparent"
          />
        </div>
      </div>

      {/* Bottom 3-Column Linear Feature/Metadata Strip */}
      <LinearRuleColumns
        defaultOpenId="pet-rule"
        leftColumn={
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#1D9E75]">Pemeriksaan Mandiri</p>
            <p className="text-xs leading-relaxed tabular-nums text-[#426352]">
              Status lokal: PET {petDone}/3 · Kardus {cbDone}/3
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/dashboard/eco-action"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
              >
                <span>Uji bukti foto di Aksi Hijau</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#setor-atau-jemput"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#426352] hover:text-[#0F3D2E]"
              >
                <span>Lanjut ke opsi setor</span>
                <ArrowDown size={11} aria-hidden="true" />
              </a>
            </div>
          </div>
        }
        col1={READINESS_TOPICS_COL_1}
        col2={READINESS_TOPICS_COL_2}
      />
    </div>
  );
}
