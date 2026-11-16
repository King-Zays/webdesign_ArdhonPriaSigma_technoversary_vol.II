"use client";

import { useState, type FormEvent } from "react";
import { useHydrated } from "@/hooks/useHydrated";

export type ContactTopic = "" | "sorting" | "demo" | "collaboration" | "other";

export default function ContactForm({
  initialTopic = "collaboration",
}: {
  initialTopic?: ContactTopic;
}) {
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const [submitted, setSubmitted] = useState(false);
  const hydrated = useHydrated();

  function previewInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      aria-labelledby="contact-title"
      onSubmit={previewInquiry}
      onChange={() => setSubmitted(false)}
      className="space-y-4 rounded-2xl border border-emerald-900/12 bg-white p-6 shadow-[0_14px_34px_-16px_rgba(15,61,46,0.08)] sm:p-7"
    >
      {/* Row 1: Full Name & Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-full-name"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Nama lengkap
          </label>
          <input
            id="contact-full-name"
            name="fullName"
            autoComplete="name"
            placeholder="Nama lengkap Anda"
            required
            className="w-full rounded-lg border border-emerald-900/15 bg-[#FAFDFB] px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Alamat email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            required
            className="w-full rounded-lg border border-emerald-900/15 bg-[#FAFDFB] px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Row 2: Topic & Organization */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-topic"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Topik kebutuhan
          </label>
          <select
            id="contact-topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as ContactTopic)}
            required
            className="w-full rounded-lg border border-emerald-900/15 bg-[#FAFDFB] px-3.5 py-2.5 text-sm text-[#0F3D2E] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
          >
            <option value="" disabled>
              Pilih topik pertanyaan
            </option>
            <option value="collaboration">Kolaborasi bank sampah / UMKM</option>
            <option value="demo">Bantuan &amp; akses demo BONI</option>
            <option value="sorting">Pilah dan setor sampah</option>
            <option value="other">Pertanyaan umum / lainnya</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-org"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Komunitas / UMKM (opsional)
          </label>
          <input
            id="contact-org"
            name="organization"
            placeholder="Contoh: Bank Sampah RW 04"
            className="w-full rounded-lg border border-emerald-900/15 bg-[#FAFDFB] px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Row 3: Role & Area */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-role"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Peran
          </label>
          <select
            id="contact-role"
            name="role"
            defaultValue="warga"
            className="w-full rounded-lg border border-emerald-900/15 bg-[#FAFDFB] px-3.5 py-2.5 text-sm text-[#0F3D2E] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
          >
            <option value="warga">Warga / Masyarakat</option>
            <option value="bank-sampah">Pengelola Bank Sampah</option>
            <option value="umkm">Mitra UMKM Lokal</option>
            <option value="pemerintah">Instansi / Dinas Terkait</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-region"
            className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
          >
            Wilayah / Kecamatan
          </label>
          <input
            id="contact-region"
            name="region"
            placeholder="Contoh: Wonokromo, Surabaya"
            className="w-full rounded-lg border border-emerald-900/15 bg-[#FAFDFB] px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-semibold text-[#0F3D2E]"
        >
          Bagaimana kami dapat membantu?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Ceritakan rencana kolaborasi, kendala fitur demo, atau pertanyaan seputar pemilahan sampah..."
          required
          className="w-full resize-none rounded-lg border border-emerald-900/15 bg-[#FAFDFB] px-3.5 py-2.5 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
        />
      </div>

      {submitted && (
        <p
          role="status"
          className="rounded-lg border border-emerald-200 bg-[#F0FAF4] px-3.5 py-2.5 text-xs font-semibold text-[#0F3D2E]"
        >
          Simulasi berhasil. Isian ini tidak dikirim atau disimpan ke server.
        </p>
      )}

      {/* Consent + Submit Row (matches Vercel Enterprise footer row) */}
      <div className="flex flex-col gap-4 border-t border-emerald-900/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[#426352]">
          <input
            name="demoConfirmed"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-emerald-950/25 accent-[#0F3D2E]"
          />
          <span>Saya memahami formulir ini hanya untuk simulasi pratinjau demo.</span>
        </label>

        <button
          type="submit"
          disabled={!hydrated}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-colors hover:bg-[#18533F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2 disabled:opacity-50"
        >
          Coba kirim pesan
        </button>
      </div>
    </form>
  );
}
