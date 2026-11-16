"use client";

import { useEffect, useState } from "react";
import type { FormEvent, RefObject } from "react";
import { useHydrated } from "@/hooks/useHydrated";

export type ContactTopic = "" | "sorting" | "demo" | "collaboration" | "other";

export default function ContactForm({
  initialTopic = "",
  onCancel,
  firstInputRef,
}: {
  initialTopic?: ContactTopic;
  onCancel?: () => void;
  firstInputRef?: RefObject<HTMLInputElement>;
}) {
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const [submitted, setSubmitted] = useState(false);
  const hydrated = useHydrated();

  useEffect(() => {
    setTopic(initialTopic);
    setSubmitted(false);
  }, [initialTopic]);

  function previewInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      className="space-y-4 pt-4"
      aria-labelledby="contact-form-modal-title"
      onSubmit={previewInquiry}
      onChange={() => setSubmitted(false)}
    >
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-xs text-[#4D6D5B]">
          Email
        </label>
        <input
          ref={firstInputRef}
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          required
          className="w-full rounded-lg border border-emerald-950/15 bg-[#FAFDFB] px-3 py-2 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-first-name" className="mb-1.5 block text-xs text-[#4D6D5B]">
            Nama depan
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            autoComplete="given-name"
            placeholder="Nama depan"
            required
            className="w-full rounded-lg border border-emerald-950/15 bg-[#FAFDFB] px-3 py-2 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-last-name" className="mb-1.5 block text-xs text-[#4D6D5B]">
            Nama belakang
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Nama belakang"
            className="w-full rounded-lg border border-emerald-950/15 bg-[#FAFDFB] px-3 py-2 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className="mb-1.5 block text-xs text-[#4D6D5B]">
          Topik
        </label>
        <select
          id="contact-topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as ContactTopic)}
          required
          className="w-full rounded-lg border border-emerald-950/15 bg-[#FAFDFB] px-3 py-2 text-sm text-[#0F3D2E] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
        >
          <option value="" disabled>
            Topik pertanyaan
          </option>
          <option value="sorting">Pilah dan setor sampah</option>
          <option value="demo">Akses demo BONI</option>
          <option value="collaboration">Kolaborasi</option>
          <option value="other">Lainnya</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs text-[#4D6D5B]">
          Pesan
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          placeholder="Ceritakan yang ingin kamu diskusikan..."
          required
          className="w-full resize-none rounded-lg border border-emerald-950/15 bg-[#FAFDFB] px-3 py-2 text-sm text-[#0F3D2E] placeholder:text-[#6B8575] transition-colors focus:border-[#1D9E75] focus:bg-white focus:outline-none"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-xs text-[#2D5542]">
        <input
          name="demoConfirmed"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded border-emerald-950/25 accent-[#0F3D2E]"
        />
        <span>Saya memahami formulir ini hanya untuk simulasi.</span>
      </label>

      {submitted && (
        <p
          role="status"
          className="rounded-lg border border-emerald-200 bg-[#F0FAF4] px-3 py-2 text-xs font-medium text-[#0F3D2E]"
        >
          Simulasi berhasil. Isian ini tidak dikirim atau disimpan.
        </p>
      )}

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-xs font-medium text-[#4D6D5B] transition-colors hover:text-[#0F3D2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={!hydrated}
          className="rounded-lg bg-[#0F3D2E] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#18533F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] disabled:opacity-50"
        >
          Coba kirim pesan
        </button>
      </div>
    </form>
  );
}
