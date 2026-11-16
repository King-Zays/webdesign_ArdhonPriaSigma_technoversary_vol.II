"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const TENS_DIGITS = ["0", "1", "2", "3"] as const;
const ONES_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1"] as const;

function DigitReel({
  digits,
  delay,
  duration,
  active,
}: {
  digits: readonly string[];
  delay: number;
  duration: number;
  active: boolean;
}) {
  const targetY = `-${((digits.length - 1) / digits.length) * 100}%`;

  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-top leading-none">
      <motion.span
        className="flex h-fit flex-col will-change-transform"
        initial={{ y: "0%" }}
        animate={{ y: active ? targetY : "0%" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {digits.map((digit, index) => (
          <span key={`${digit}-${index}`} className="flex h-[1.15em] shrink-0 items-center justify-center leading-none">
            {digit}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function Odometer31({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <span ref={ref} className={className} aria-label="31">
        31
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-flex items-center tabular-nums ${className ?? ""}`} aria-label="31">
      <span className="inline-flex items-center" aria-hidden="true">
        <DigitReel digits={TENS_DIGITS} delay={0.22} duration={1.45} active={isInView} />
        <DigitReel digits={ONES_DIGITS} delay={0.18} duration={1.75} active={isInView} />
      </span>
    </span>
  );
}

const sectionLinks = [
  { label: "Standar Material", href: "#standar-material" },
  { label: "Peran", href: "#peran-ekosistem" },
  { label: "Alur Sistem", href: "#rencana-setoran" },
  { label: "Kolaborasi", href: "#kolaborasi" },
] as const;

const socialChannels = [
  { name: "Facebook BONI", icon: "/media/tentang-fb.svg" },
  { name: "Instagram BONI", icon: "/media/tentang-insta.svg" },
  { name: "LinkedIn BONI", icon: "/media/tentang-linkedin.svg" },
  { name: "YouTube BONI", icon: "/media/tentang-youtube.svg" },
] as const;

export default function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: Math.min(i * 0.08, 0.45),
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
    hidden: {
      filter: "blur(6px)",
      y: 18,
      opacity: 0,
    },
  };
  const scaleVariants = {
    visible: () => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.12,
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
    hidden: {
      filter: "blur(6px)",
      scale: 0.985,
      opacity: 0,
    },
  };

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72);
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", href);
  };

  return (
    <section className="border-b border-emerald-900/10 bg-[#F5FAF7] px-4 py-10 sm:px-6 sm:py-16" ref={heroRef}>
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          {/* Baris atas di dalam ruang cutout atas (0% - 84%): Judul halaman & navigasi bagian */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:absolute sm:top-1 sm:left-0 sm:z-10 sm:mb-0 sm:w-[83%] md:top-2 lg:top-3.5">
            <TimelineContent
              as="span"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-xs font-bold tracking-tight text-[#0F3D2E] sm:text-sm"
            >
              Tentang Ekosistem BONI
            </TimelineContent>

            <nav aria-label="Bagian halaman Tentang" className="hidden items-center gap-5 sm:flex">
              {sectionLinks.map((item, idx) => (
                <TimelineContent
                  key={item.href}
                  as="div"
                  animationNum={idx + 1}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-xs font-medium text-[#426352] transition-colors hover:text-[#0F3D2E]"
                  >
                    {item.label}
                  </a>
                </TimelineContent>
              ))}
            </nav>
          </div>

          <TimelineContent
            as="figure"
            animationNum={2}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative"
          >
            <svg
              className="w-full"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
              role="img"
              aria-label="Warga merawat tanaman dan menjaga kebersihan lingkungan di Surabaya"
            >
              <defs>
                <clipPath
                  id="clip-inverted"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                href="/media/hero-planting-poster.jpg"
              />
            </svg>
            {/* 4 kanal media sosial tersusun vertikal di ruang cutout kiri (x < 7.3%, y > 47%) */}
            <div
              aria-label="Kanal media sosial BONI"
              className="hidden sm:absolute sm:bottom-1 sm:left-0 sm:top-[49%] sm:z-10 sm:flex sm:w-[6.6%] sm:flex-col sm:items-center sm:justify-between sm:py-0.5"
            >
              {socialChannels.map((channel) => (
                <a
                  key={channel.icon}
                  href="#kolaborasi"
                  onClick={(e) => handleAnchorClick(e, "#kolaborasi")}
                  title={channel.name}
                  aria-label={channel.name}
                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-emerald-900/12 bg-white/95 shadow-[0_2px_8px_-4px_rgba(15,61,46,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1D9E75] hover:bg-emerald-50 md:h-8 md:w-8 lg:h-10 lg:w-10"
                >
                  <Image
                    src={channel.icon}
                    alt={channel.name}
                    width={20}
                    height={20}
                    className="h-3.5 w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5"
                  />
                </a>
              ))}
            </div>
            {/* Kartu ringkas 31 kecamatan pas mengisi ruang cutout kanan bawah (x > 79.5%, y > 76.2%) */}
            <div className="mt-4 flex flex-col justify-center gap-2.5 rounded-2xl border border-emerald-900/12 bg-white/95 px-4 py-3 shadow-[0_6px_20px_-10px_rgba(15,61,46,0.14)] lg:absolute lg:bottom-0.5 lg:left-[79.5%] lg:right-0.5 lg:top-[76.2%] lg:mt-0 lg:gap-2 lg:px-3.5 lg:py-2.5 xl:gap-2.5 xl:px-4 xl:py-3">
              <div className="flex items-center gap-3">
                <Odometer31 className="text-3xl font-extrabold leading-none tracking-tight text-[#0F3D2E] xl:text-[34px]" />
                <span className="text-xs font-semibold leading-snug text-[#2D5542]">
                  Kecamatan di
                  <br />
                  Kota Surabaya
                </span>
              </div>
              <a
                href="#standar-material"
                onClick={(e) => handleAnchorClick(e, "#standar-material")}
                className="inline-flex items-center justify-between border-t border-emerald-900/10 pt-2 text-xs font-semibold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
              >
                <span>Lihat standar pilah</span>
                <ArrowRight size={13} className="rotate-90" />
              </a>
            </div>
          </TimelineContent>

          {/* Kanal sosial versi mobile */}
          <div className="mt-3 flex items-center gap-2.5 sm:hidden" aria-label="Kanal media sosial BONI">
            {socialChannels.map((channel) => (
              <a
                key={channel.icon}
                href="#kolaborasi"
                onClick={(e) => handleAnchorClick(e, "#kolaborasi")}
                title={channel.name}
                aria-label={channel.name}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-900/12 bg-white shadow-sm transition-colors hover:border-[#1D9E75] hover:bg-emerald-50"
              >
                <Image src={channel.icon} alt={channel.name} width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Konten Utama Editorial */}
        <div className="mt-8 grid gap-10 border-t border-emerald-900/12 pt-8 md:mt-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <h1 className="mb-6 text-2xl font-extrabold !leading-[1.18] tracking-tight text-[#0F3D2E] sm:text-4xl md:text-5xl">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.07}
                staggerFrom="first"
                reverse={false}
                wordLevelClassName="pt-[0.04em] pb-[0.18em]"
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 26,
                  delay: 0.15,
                }}
              >
                Dari kebiasaan baik di rumah menjadi manfaat bagi Surabaya.
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={4}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid gap-6 text-[#2D5542] sm:grid-cols-2 sm:gap-8"
            >
              <p className="text-sm leading-relaxed sm:text-base">
                Sampah rumah tangga yang langsung tercampur sisa makanan sulit
                dipilah kembali dan berakhir menjadi beban TPA Benowo. Memilah
                plastik, kardus, dan minyak jelantah sejak di rumah menjaga nilai
                material sekaligus mencegah saluran air tersumbat.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                BONI menghubungkan aksi bersih warga yang terverifikasi foto,
                jaringan pengepul serta bank sampah, pelaku UMKM lokal, dan
                pemantauan agregat 31 kecamatan oleh Pemerintah Kota Surabaya.
              </p>
            </TimelineContent>
          </div>

          <div className="flex flex-col justify-between border-t border-emerald-900/10 pt-6 md:col-span-4 md:border-t-0 md:border-l md:pl-8 md:pt-0">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="divide-y divide-emerald-900/10 text-xs"
            >
              <div className="flex items-baseline justify-between py-2.5 first:pt-0">
                <span className="text-[#527362]">Aksi Warga</span>
                <span className="font-bold text-[#0F3D2E]">5 Kategori Hijau</span>
              </div>
              <div className="flex items-baseline justify-between py-2.5">
                <span className="text-[#527362]">Ekosistem</span>
                <span className="font-bold text-[#0F3D2E]">Warga · Pengepul · Pemkot</span>
              </div>
              <div className="flex items-baseline justify-between py-2.5">
                <span className="text-[#527362]">Manfaat Lokal</span>
                <span className="font-bold text-[#0F3D2E]">Voucher UMKM Kampung</span>
              </div>
            </TimelineContent>

            <TimelineContent
              as="div"
              animationNum={6}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="mt-6"
            >
              <p className="mb-3.5 text-xs leading-relaxed text-[#426352]">
                Ingin menjajaki uji coba pemilahan dan kolaborasi ekosistem lokal bersama tim kami?
              </p>
              <a
                href="#kolaborasi"
                onClick={(e) => handleAnchorClick(e, "#kolaborasi")}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#18533F] sm:text-sm"
              >
                <span>Ajak kolaborasi</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
}
