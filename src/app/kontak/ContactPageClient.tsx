"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import ContactForm from "./ContactForm";
import FaqCarousel from "./FaqCarousel";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface FaqLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  tag?: string;
  dotColor?: string;
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
        className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20"
      >
        {/* Subtle ambient emerald backdrop glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-1/4 h-80 w-80 rounded-full bg-emerald-200/25 blur-3xl"
        />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-12 md:items-start lg:gap-16">
          {/* Left Column: Bold Heading, Intro, Surabaya Ecosystem Reference Grid */}
          <div className="md:col-span-5 md:pt-2">
            <motion.h1
              id="contact-title"
              initial={{ opacity: 0, y: 34, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F3D2E] sm:text-5xl lg:text-[50px]"
            >
              Mulai kolaborasi<br />
              <span className="text-[#1D9E75]">bersama tim BONI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.05, delay: 0.16, ease: EASE_OUT_EXPO }}
              className="mt-4 max-w-md text-base leading-relaxed text-[#2D5542]"
            >
              Bahas kemitraan bank sampah, kolaborasi UMKM, pelaporan kendala demo, atau sampaikan masukan dari warga.
            </motion.p>

            {/* 2x2 Reference Partner Marks */}
            <motion.div
              initial={{ opacity: 0, y: 26, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.05, delay: 0.28, ease: EASE_OUT_EXPO }}
              className="mt-10"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[#1D9E75]">
                Referensi Ekosistem Surabaya
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ECOSYSTEM_REFERENCES.map(({ name, logo }, idx) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.3 + idx * 0.08,
                      ease: EASE_OUT_EXPO,
                    }}
                    whileHover={{ y: -2 }}
                    className="group flex items-center gap-2.5 rounded-xl border border-emerald-900/10 bg-white/85 px-3 py-2.5 shadow-sm transition-colors duration-200 hover:border-[#1D9E75]/30 hover:bg-white hover:shadow-md"
                  >
                    <Image
                      src={logo}
                      alt=""
                      width={32}
                      height={32}
                      className="h-7 w-7 shrink-0 object-contain transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-xs font-bold leading-snug text-[#0F3D2E]">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Subtle Secondary Channel Links */}
            <motion.div
              initial={{ opacity: 0, y: 26, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.05, delay: 0.36, ease: EASE_OUT_EXPO }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-[#426352]"
            >
              <Link
                href="/kontak/kolaborasi"
                className="group inline-flex items-center gap-1 transition-colors hover:text-[#0F3D2E]"
              >
                <span>Panduan kolaborasi</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/kontak/bantuan"
                className="group inline-flex items-center gap-1 transition-colors hover:text-[#0F3D2E]"
              >
                <span>Pusat bantuan</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Clean 2-Column Interactive Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.42, ease: EASE_OUT_EXPO }}
            className="md:col-span-7"
          >
            <ContactForm initialTopic="collaboration" />
          </motion.div>
        </div>
      </section>

      {/* 2. Pertanyaan Umum — Linear Horizontal Carousel Showcase */}
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
            className="mb-10 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-5">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D9E75]">
                <HelpCircle size={14} aria-hidden="true" />
                <span>Pertanyaan Umum</span>
              </p>
              <h2
                id="faq-title"
                className="mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]"
              >
                Jawaban singkat seputar<br />
                <span className="text-[#1D9E75]">demo dan pemilahan</span>
              </h2>
            </div>

            <div className="space-y-4 md:col-span-6 md:col-start-7 md:pt-7">
              <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                Geser kartu pertanyaan untuk melihat cakupan demo Warga &amp; Pemkot, rancangan alur pengepul, pemeriksaan bukti foto AI, dan aturan simulasi EcoPoints.
              </p>
              <Link
                href="/kontak/bantuan"
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
              >
                <span>Buka pusat bantuan lengkap</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.12, ease: EASE_OUT_EXPO }}
          >
            <FaqCarousel questions={questions} />
          </motion.div>
        </div>
      </section>

      {/* 3. Centered Community Encouragement Quote (Vercel Enterprise layout 3) */}
      <section
        aria-label="Semangat gerakan pilah dari rumah"
        className="px-6 pb-12 pt-20 text-center sm:pb-16 sm:pt-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
          className="mx-auto max-w-[920px]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1D9E75]">
            BERSAMA WARGA SURABAYA
          </p>
          <blockquote className="mt-6 text-2xl font-semibold leading-[1.22] tracking-[-0.03em] text-[#0F3D2E] sm:text-[32px] lg:text-[36px]">
            “Perubahan kota yang bersih tidak menunggu dari langkah yang besar, ia tumbuh dari satu botol terpilah dan satu aksi hijau yang kita mulai dari rumah.”
          </blockquote>
          <p className="mt-8 text-[13px] tracking-[-0.01em] text-[#527362]">
            <strong className="font-semibold text-[#0F3D2E]">Tim BONI</strong>
            <span className="ml-2.5">
              Gerakan Pilah Sampah &amp; Aksi Hijau Warga Surabaya
            </span>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
