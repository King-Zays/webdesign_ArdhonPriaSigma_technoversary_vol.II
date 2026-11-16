"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

const SCALE_OPTIONS = [
  { value: "1-19", label: "1–19 orang (RT / kelompok warga)" },
  { value: "20-49", label: "20–49 orang (RW / bank sampah)" },
  { value: "50-249", label: "50–249 orang (komunitas / kampus)" },
  { value: "250-999", label: "250–999 orang (instansi / kelurahan)" },
  { value: "1000+", label: "1.000+ orang (jaringan kota / mitra)" },
];

export default function CollabForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      className="space-y-4"
      aria-labelledby="collab-form-heading"
      onSubmit={handleSubmit}
      onChange={() => setSubmitted(false)}
    >
      <div>
        <label htmlFor="full-name" className="mb-1.5 block text-xs font-medium text-[#4D6D5B]">
          Nama lengkap
        </label>
        <input
          id="full-name"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Masukkan nama lengkap"
          required
          className="w-full rounded-md border border-emerald-950/15 bg-white px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="work-email" className="mb-1.5 block text-xs font-medium text-[#4D6D5B]">
          Email
        </label>
        <input
          id="work-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          required
          className="w-full rounded-md border border-emerald-950/15 bg-white px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="community-scale" className="mb-1.5 block text-xs font-medium text-[#4D6D5B]">
          Skala komunitas atau organisasi
        </label>
        <select
          id="community-scale"
          name="communityScale"
          defaultValue=""
          required
          className="w-full cursor-pointer rounded-md border border-emerald-950/15 bg-white px-3.5 py-2.5 text-sm text-[#0F3D2E] transition-colors focus:border-[#1D9E75] focus:outline-none invalid:text-[#6B8575]"
        >
          <option value="" disabled>
            Pilih skala komunitas atau organisasi
          </option>
          {SCALE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-[#0F3D2E]">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="requirements" className="mb-1.5 block text-xs font-medium text-[#4D6D5B]">
          Ceritakan rencana kolaborasimu
        </label>
        <textarea
          id="requirements"
          name="requirements"
          rows={4}
          placeholder="Ceritakan gambaran program, wilayah, atau kolaborasi yang ingin dijalankan..."
          required
          className="w-full resize-none rounded-md border border-emerald-950/15 bg-white px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:outline-none"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-xs text-[#2D5542]">
        <input
          name="demoConfirmed"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded border-emerald-950/25 accent-[#0F3D2E]"
        />
        <span>Saya memahami formulir ini hanya untuk simulasi dan isian tidak dikirim atau disimpan.</span>
      </label>

      {submitted && (
        <p
          role="status"
          className="rounded-md border border-emerald-200 bg-[#F0FAF4] px-3.5 py-2.5 text-xs font-medium text-[#0F3D2E]"
        >
          Simulasi berhasil. Isian ini tidak dikirim atau disimpan.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          className="rounded-full bg-[#0F3D2E] px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#18533F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
        >
          Coba kirim pesan
        </button>
        <span className="text-[13px] text-[#4D6D5B]">
          Email resmi segera tersedia — lihat{" "}
          <Link
            href="/kontak#faq"
            className="underline underline-offset-2 decoration-[#1D9E75]/50 transition-colors hover:text-[#0F3D2E]"
          >
            bantuan &amp; FAQ BONI
          </Link>
        </span>
      </div>
    </form>
  );
}
