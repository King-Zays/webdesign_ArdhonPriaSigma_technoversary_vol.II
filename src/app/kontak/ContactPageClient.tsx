"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ContactForm, { type ContactTopic } from "./ContactForm";
import styles from "./contact.module.css";

export interface FaqLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  links?: FaqLink[];
}

type ActiveModal = { kind: "form"; topic: ContactTopic } | null;

export default function ContactPageClient({ questions }: { questions: FaqItem[] }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const otherBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const closeModal = useCallback((restoreFocus = true) => {
    setActiveModal(null);
    if (restoreFocus && lastTriggerRef.current) {
      const target = lastTriggerRef.current;
      requestAnimationFrame(() => {
        target.focus();
      });
    }
  }, []);

  const openFormModal = (topic: ContactTopic, trigger: HTMLButtonElement | null) => {
    lastTriggerRef.current = trigger;
    setActiveModal({ kind: "form", topic });
  };

  useEffect(() => {
    if (!activeModal) return;

    const frame = requestAnimationFrame(() => {
      firstInputRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal, closeModal]);

  return (
    <div className="bg-[#FAFDFB] text-[#0F3D2E] antialiased">
      <div className="mx-auto w-full max-w-[1240px] px-6 pb-28 pt-16 md:pt-24">
        {/* Page Title */}
        <section aria-labelledby="contact-title" className="mb-12">
          <h1
            id="contact-title"
            className="text-4xl font-semibold tracking-[-0.03em] text-[#0F3D2E] sm:text-[46px] sm:leading-[1.12]"
          >
            Apa yang bisa kami bantu?
          </h1>
        </section>

        {/* 3 Core Contact Cards — proporsi & ritme 1:1 linear.app/contact */}
        <section
          aria-label="Kanal kontak dan bantuan"
          className="mb-16 grid grid-cols-1 gap-5 md:mb-20 md:grid-cols-3"
        >
          {/* Card 1: Kolaborasi */}
          <div className="group flex min-h-[228px] flex-col justify-between rounded-xl border border-emerald-950/10 bg-white p-7 transition-colors duration-200 hover:border-[#1D9E75]/45">
            <h2 className="text-[17px] font-semibold tracking-tight text-[#0F3D2E]">Kolaborasi</h2>
            <div className="mt-10">
              <p className="text-[13.5px] leading-[1.6] text-[#4D6D5B]">
                Bahas kemitraan bank sampah, kolaborasi UMKM, atau program komunitas.
              </p>
              <Link
                href="/kontak/kolaborasi"
                className="mt-4 inline-flex items-center gap-1.5 rounded text-[13px] font-medium text-[#3B5B49] transition-colors group-hover:text-[#0F3D2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
              >
                <span>Diskusikan kolaborasi</span>
                <span
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Card 2: Bantuan */}
          <div className="group flex min-h-[228px] flex-col justify-between rounded-xl border border-emerald-950/10 bg-white p-7 transition-colors duration-200 hover:border-[#1D9E75]/45">
            <h2 className="text-[17px] font-semibold tracking-tight text-[#0F3D2E]">Bantuan</h2>
            <div className="mt-10">
              <p className="text-[13.5px] leading-[1.6] text-[#4D6D5B]">
                Kami siap membantu. Tanya fitur BONI, laporkan kendala, atau beri masukan.
              </p>
              <Link
                href="/kontak/bantuan"
                className="mt-4 inline-flex items-center gap-1.5 rounded text-[13px] font-medium text-[#3B5B49] transition-colors group-hover:text-[#0F3D2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
              >
                <span>Buka pusat bantuan</span>
                <span
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Card 3: Pertanyaan Lain */}
          <div className="group flex min-h-[228px] flex-col justify-between rounded-xl border border-emerald-950/10 bg-white p-7 transition-colors duration-200 hover:border-[#1D9E75]/45">
            <h2 className="text-[17px] font-semibold tracking-tight text-[#0F3D2E]">Pertanyaan Lain</h2>
            <div className="mt-10">
              <p className="text-[13.5px] leading-[1.6] text-[#4D6D5B]">
                Hubungi tim BONI untuk masukan fitur, liputan media, atau pertanyaan umum.
              </p>
              <button
                ref={otherBtnRef}
                id="open-other-modal"
                type="button"
                onClick={() => openFormModal("other", otherBtnRef.current)}
                className="mt-4 inline-flex items-center gap-1.5 rounded text-[13px] font-medium text-[#3B5B49] transition-colors group-hover:text-[#0F3D2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
              >
                <span>Kirim pertanyaan lainnya</span>
                <span
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Pertanyaan Umum (Merged Sumber Daya links + FAQ Accordion right below cards) */}
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="grid scroll-mt-24 grid-cols-1 gap-8 border-t border-emerald-950/[0.08] pt-14 md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-4">
            <h2 id="faq-title" className="text-xl font-semibold tracking-tight text-[#0F3D2E]">
              Pertanyaan Umum
            </h2>
            <p className="mt-2 max-w-[260px] text-[13.5px] leading-[1.6] text-[#4D6D5B]">
              Jawaban singkat seputar demo BONI, panduan pilah, verifikasi foto, dan EcoPoints.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="border-t border-emerald-950/[0.08]">
              {questions.map(({ question, answer, links }) => (
                <details
                  key={question}
                  className="group border-b border-emerald-950/[0.08]"
                >
                  <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[14px] font-medium text-[#0F3D2E] transition-colors hover:text-[#1D9E75] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]">
                    <span>{question}</span>
                    <ChevronDown
                      size={17}
                      className="shrink-0 text-[#4D6D5B] transition-transform duration-200 group-open:rotate-180 group-open:text-[#1D9E75]"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="pb-5 pr-6">
                    <p className="text-[13.5px] leading-[1.65] text-[#4D6D5B]">{answer}</p>
                    {links && links.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                        {links.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="inline-flex items-center gap-1.5 rounded text-[13px] font-medium text-[#0F3D2E] transition-colors hover:text-[#1D9E75] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
                          >
                            <span>{item.label}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Modal: Contact Form (Pertanyaan Lain) */}
      {activeModal?.kind === "form" && (
        <div
          id="contact-form-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal(true);
          }}
        >
          <div
            className={`relative w-full max-w-lg rounded-2xl border border-emerald-950/[0.12] bg-white p-6 shadow-2xl ${styles.modalEnter}`}
          >
            <div className="flex items-center justify-between border-b border-emerald-950/[0.08] pb-4">
              <div>
                <h3 id="contact-form-modal-title" className="text-lg font-medium text-[#0F3D2E]">
                  Sampaikan kebutuhanmu
                </h3>
                <p className="text-xs text-[#4D6D5B]">
                  Kirim pertanyaan umum atau masukan untuk tim BONI.
                </p>
              </div>
              <button
                type="button"
                aria-label="Tutup dialog formulir"
                onClick={() => closeModal(true)}
                className="rounded-md p-1 text-xl leading-none text-[#4D6D5B] transition-colors hover:text-[#0F3D2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
              >
                ×
              </button>
            </div>
            <ContactForm
              key={activeModal.topic}
              initialTopic={activeModal.topic}
              onCancel={() => closeModal(true)}
              firstInputRef={firstInputRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}
