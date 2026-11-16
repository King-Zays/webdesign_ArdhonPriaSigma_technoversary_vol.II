"use client";

import Image from "next/image";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import ContactForm from "./ContactForm";

export interface FaqLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  links?: FaqLink[];
}

const ECOSYSTEM_REFERENCES = [
  {
    name: "Bank Sampah Induk Surabaya",
    logo: "/images/kolaborasi/bank-sampah-induk-surabaya.webp",
  },
  {
    name: "Tunas Hijau ID",
    logo: "/images/kolaborasi/tunas-hijau.webp",
  },
  {
    name: "Green Living Support",
    logo: "/images/kolaborasi/green-living-support.webp",
  },
  {
    name: "Green Generation Surabaya",
    logo: "/images/kolaborasi/green-generation-surabaya.webp",
  },
] as const;

export default function ContactPageClient({ questions }: { questions: FaqItem[] }) {
  return (
    <div className="bg-[#FAFDFB] text-[#0F3D2E] antialiased">
      {/* 1. Split Hero + Direct Contact Form (Vercel Enterprise layout 1) */}
      <section
        aria-labelledby="contact-title"
        className="bg-[#FAFDFB] px-6 pb-20 pt-16 md:pb-24 md:pt-24"
      >
        <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-12 md:items-start lg:gap-16">
          {/* Left Column: Bold Heading, Intro, Surabaya Ecosystem Reference Grid */}
          <div className="md:col-span-5 md:pt-2">
            <h1
              id="contact-title"
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F3D2E] sm:text-5xl lg:text-[50px]"
            >
              Mulai kolaborasi<br />bersama tim BONI
            </h1>

            <p className="mt-4 max-w-md text-base leading-relaxed text-[#2D5542]">
              Bahas kemitraan bank sampah, kolaborasi UMKM, pelaporan kendala demo, atau sampaikan masukan dari warga.
            </p>

            {/* 2x2 Reference Partner Marks (mirrors Vercel's 2x2 logo block cleanly) */}
            <div className="mt-10 border-t border-emerald-900/10 pt-7">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1D9E75]">
                Referensi Ekosistem Surabaya
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                {ECOSYSTEM_REFERENCES.map(({ name, logo }) => (
                  <div key={name} className="flex items-center gap-2.5">
                    <Image
                      src={logo}
                      alt=""
                      width={32}
                      height={32}
                      className="h-7 w-7 shrink-0 object-contain"
                    />
                    <span className="text-xs font-bold leading-snug text-[#0F3D2E]">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle Secondary Channel Links */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-[#426352]">
              <Link
                href="/kontak/kolaborasi"
                className="transition-colors hover:text-[#0F3D2E]"
              >
                Panduan kolaborasi →
              </Link>
              <Link
                href="/kontak/bantuan"
                className="transition-colors hover:text-[#0F3D2E]"
              >
                Pusat bantuan →
              </Link>
            </div>
          </div>

          {/* Right Column: Clean 2-Column Inline Form */}
          <div className="md:col-span-7">
            <ContactForm initialTopic="collaboration" />
          </div>
        </div>
      </section>

      {/* 2. Pertanyaan Umum — 4-Column Horizontal Layout (Vercel Enterprise layout 2) */}
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="scroll-mt-24 border-t border-emerald-900/10 bg-white px-6 py-20 md:py-24"
      >
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D9E75]">
              <HelpCircle size={14} aria-hidden="true" />
              <span>Pertanyaan Umum</span>
            </p>
            <h2
              id="faq-title"
              className="mt-3 text-3xl font-extrabold leading-[1.14] tracking-tight text-[#0F3D2E] sm:text-5xl"
            >
              Jawaban singkat seputar<br />demo dan pemilahan
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-emerald-900/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {questions.map(({ question, answer, links }) => (
              <article key={question} className="flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-[15px] font-bold leading-snug text-[#0F3D2E]">
                    {question}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#426352]">
                    {answer}
                  </p>
                </div>

                {links && links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                    {links.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                      >
                        <span>{item.label}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Centered Community Encouragement Quote (Vercel Enterprise layout 3) */}
      <section
        aria-label="Semangat gerakan pilah dari rumah"
        className="border-t border-emerald-900/10 bg-[#F5FAF7] px-6 py-24 text-center md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1D9E75]">
            BERSAMA WARGA SURABAYA
          </p>
          <blockquote className="mt-6 text-2xl font-extrabold leading-[1.3] tracking-tight text-[#0F3D2E] sm:text-4xl">
            “Perubahan kota yang bersih tidak menunggu langkah besar dari jauh—ia tumbuh dari satu botol terpilah dan satu aksi hijau yang kita mulai dari rumah hari ini.”
          </blockquote>
          <p className="mt-7 text-xs text-[#426352]">
            <strong className="font-bold text-[#0F3D2E]">Tim BONI</strong>{" "}
            — Gerakan Pilah Sampah &amp; Aksi Hijau Warga Surabaya
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard/eco-action"
              className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-colors hover:bg-[#18533F]"
            >
              <span>Mulai aksi hijau hari ini</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/edukasi"
              className="inline-flex items-center gap-2 rounded-full border border-[#0F3D2E]/25 bg-white px-6 py-3 text-sm font-bold text-[#0F3D2E] transition-colors hover:bg-emerald-50/70"
            >
              <span>Baca panduan pilah</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
