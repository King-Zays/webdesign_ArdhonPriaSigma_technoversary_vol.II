"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const socialChannels = [
  { name: "Facebook BONI (segera dilengkapi)", icon: "/media/tentang-fb.svg", animationNum: 0 },
  { name: "Instagram BONI (segera dilengkapi)", icon: "/media/tentang-insta.svg", animationNum: 1 },
  { name: "LinkedIn BONI (segera dilengkapi)", icon: "/media/tentang-linkedin.svg", animationNum: 2 },
  { name: "YouTube BONI (segera dilengkapi)", icon: "/media/tentang-youtube.svg", animationNum: 3 },
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
  return (
    <section className="border-b border-emerald-900/10 bg-[#F5FAF7] px-4 py-10 sm:px-6 sm:py-14" ref={heroRef}>
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          {/* Header dengan label ekosistem & tautan kanal */}
          <div className="absolute -top-3 z-10 mb-8 flex w-[85%] items-center justify-between sm:-top-2 md:top-0 lg:top-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1D9E75]" aria-hidden="true" />
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F3D2E]"
              >
                TENTANG BONI
              </TimelineContent>
            </div>
            <div className="flex gap-3">
              {socialChannels.map((channel) => (
                <TimelineContent
                  key={channel.icon}
                  as="a"
                  animationNum={channel.animationNum}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  href="#kolaborasi"
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-emerald-900/15 bg-white/90 transition-colors hover:border-[#1D9E75] hover:bg-emerald-50 md:h-8 md:w-8"
                >
                  <Image src={channel.icon} alt={channel.name} width={20} height={20} />
                </TimelineContent>
              ))}
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group"
          >
            <svg
              className="w-full"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
              role="img"
              aria-label="Ilustrasi penghijauan lokal BONI sementara sampai foto asli pemilahan atau penimbangan warga tersedia"
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
              ></image>
            </svg>
            <figcaption className="pointer-events-none absolute bottom-3 left-[10%] rounded-full border border-emerald-300/30 bg-[#081C11]/75 px-3 py-1 text-[11px] font-medium text-emerald-50 backdrop-blur-sm">
              Ilustrasi penghijauan lokal Surabaya · Ekosistem BONI
            </figcaption>
          </TimelineContent>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-between py-4 text-sm lg:justify-start">
            <TimelineContent
              as="div"
              animationNum={2}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-extrabold text-[#1D9E75]">5</span>
                <span className="text-[#426352]">kategori aksi hijau</span>
                <span className="text-emerald-900/20">|</span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-extrabold text-[#1D9E75]">31</span>
                <span className="text-[#426352]">kecamatan Surabaya</span>
              </div>
            </TimelineContent>
            <div className="right-0 bottom-16 flex flex-row-reverse gap-4 lg:absolute lg:flex-col lg:gap-0">
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 text-2xl sm:text-3xl xl:text-4xl"
              >
                <span className="font-extrabold text-[#0F3D2E]">3</span>
                <span className="font-semibold uppercase text-[#426352]">peran utama</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 text-xs sm:text-base"
              >
                <span className="font-bold text-[#1D9E75]">Surabaya</span>
                <span className="text-[#426352]">wilayah fokus</span>
                <span className="block text-emerald-900/20 lg:hidden">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="mt-4 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-6 text-2xl font-extrabold !leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl md:text-5xl">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.07}
                staggerFrom="first"
                reverse={true}
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
              className="grid gap-6 text-[#2D5542] md:grid-cols-2 md:gap-8"
            >
              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs sm:text-base"
              >
                <p className="leading-relaxed">
                  Sampah rumah tangga yang langsung tercampur sisa makanan sulit
                  dipilah kembali dan berakhir menjadi beban TPA Benowo. Memilah
                  plastik, kardus, dan minyak jelantah sejak di rumah menjaga nilai
                  material sekaligus mencegah saluran air tersumbat.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs sm:text-base"
              >
                <p className="leading-relaxed">
                  BONI menghubungkan aksi bersih warga yang terverifikasi foto,
                  jaringan pengepul serta bank sampah, pelaku UMKM lokal, dan
                  pemantauan agregat 31 kecamatan oleh Pemerintah Kota Surabaya.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="md:text-right">
              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-1 text-2xl font-black tracking-tight text-[#0F3D2E]"
              >
                BONI
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6 text-sm font-medium text-[#1D9E75]"
              >
                Ekosistem Aksi Hijau &amp; Setoran · Surabaya
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-5"
              >
                <p className="text-sm font-medium leading-relaxed text-[#2D5542]">
                  Ingin menjajaki uji coba pemilahan dan kolaborasi ekosistem lokal bersama tim kami?
                </p>
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={8}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="#kolaborasi"
                className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#18533F] md:ml-auto"
              >
                <span>Ajak kolaborasi</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
