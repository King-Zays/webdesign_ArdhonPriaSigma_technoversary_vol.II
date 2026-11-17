import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import EducationPillarsGrid from "@/components/features/edukasi/EducationPillarsGrid";
import GreenActionsCarousel from "@/components/features/edukasi/GreenActionsCarousel";
import InteractivePortalPreview from "@/components/features/edukasi/InteractivePortalPreview";
import MaterialShowcaseStage from "@/components/features/edukasi/MaterialShowcaseStage";
import PlanningAndRouteStage from "@/components/features/edukasi/PlanningAndRouteStage";
import ScrollReveal from "@/components/features/edukasi/ScrollReveal";
import SortingReadinessCheck from "@/components/features/edukasi/SortingReadinessCheck";
import VerificationShowcaseStage from "@/components/features/edukasi/VerificationShowcaseStage";
import EducationGallery from "@/components/features/edukasi/EducationGallery";
import {
  collaborationReferences,
  integrationReferences,
} from "./ecosystem-references";
import EcosystemMarquee from "./EcosystemMarquee";
import styles from "./edukasi.module.css";

export const metadata: Metadata = {
  title: "Edukasi Pilah Sampah, Alur Setoran & Aksi Hijau | BONI",
  description:
    "Panduan langkah demi langkah BONI: pilah botol PET dan kardus, cek kesiapan mandiri, setor atau jemput ke pengepul, foto bukti timbangan, verifikasi AI & manual, hingga katalog Aksi Hijau.",
};

const journeyLinks = [
  { href: "#material-setoran", step: "01", label: "Pilah PET & Kardus" },
  { href: "#cek-kesiapan", step: "02", label: "Cek Kesiapan Mandiri" },
  { href: "#setor-atau-jemput", step: "03", label: "Setor atau Jemput" },
  { href: "#setelah-ditimbang", step: "04", label: "Setelah Ditimbang" },
  { href: "#aksi-hijau", step: "05", label: "Aksi Hijau" },
  { href: "#galeri", step: "06", label: "Galeri Kegiatan" },
] as const;

const ecosystemReferences = Array.from({
  length: Math.max(
    collaborationReferences.length,
    integrationReferences.length
  ),
}).flatMap((_, index) => {
  const collab = collaborationReferences[index];
  const integration = integrationReferences[index];
  return [
    ...(collab ? [collab] : []),
    ...(integration ? [integration] : []),
  ];
});

export default function EducationPage() {
  return (
    <LayoutWrapper>
      <div className="bg-[#FAFDFB] text-[#0F3D2E] antialiased">
        {/* 1. Hero Section — Matched 1:1 to Beranda Hero spacing, backdrop, two-tone H1, dual CTAs & window chrome */}
        <section className="relative isolate overflow-hidden bg-[#F5FAF7]">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <Image
              src="/media/hero-planting-poster.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F5FAF7]/90 via-[#F5FAF7]/80 to-[#F5FAF7]" />
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 text-left sm:px-6 sm:pb-12 sm:pt-20">
            <div className="max-w-3xl">
              <ScrollReveal heroRole="title">
                <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F3D2E] sm:text-5xl lg:text-[54px]">
                  Dari sampah
                  <br />
                  terpilah menjadi
                  <br />
                  <span className="text-[#1D9E75]">setoran yang tercatat</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal heroRole="subtitle">
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#2D5542] sm:text-lg">
                  Panduan warga memilah PET dan kardus, mengecek kesiapan mandiri, dan menguji verifikasi foto Aksi Hijau.
                </p>
              </ScrollReveal>

              <ScrollReveal heroRole="cta" className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#cek-kesiapan"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#18533F] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2"
                >
                  <span>Cek kesiapan pilah</span>
                </a>
                <Link
                  href="/login?role=warga"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
                >
                  <span>Uji verifikasi aksi</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* Grounded Portal Warga Preview Window (aligned to max-w-6xl & HeroConsole stagger) */}
          <div className={`${styles.heroBackdrop} relative px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-6`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-12 top-0 bg-[radial-gradient(62%_56%_at_50%_60%,rgba(255,255,255,0.72),transparent_72%)]"
            />

            <ScrollReveal
              heroRole="window"
              className={`${styles.heroPerspectiveContainer} relative mx-auto max-w-6xl`}
            >
              {/* Grounded double floor contact shadows directly underneath the standing frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2.5 inset-x-6 h-5 rounded-[100%] bg-[#072219]/40 blur-md"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-7 -inset-x-4 h-12 rounded-[100%] bg-[#072219]/22 blur-2xl"
              />

              <InteractivePortalPreview journeyLinks={journeyLinks} />
            </ScrollReveal>
          </div>
        </section>

        {/* 2. Kandidat Kolaborasi & Integrasi — marquee 3 baris full-bleed */}
        <section className="overflow-x-clip pb-10 pt-16 sm:pb-14 sm:pt-20">
          <ScrollReveal>
            <EcosystemMarquee
              id="peluang-kolaborasi"
              references={ecosystemReferences}
            />
          </ScrollReveal>
        </section>

        {/* 2B. Pengantar Standar Pilah & Grid Pilar */}
        <section className="overflow-x-clip pb-12 pt-10 sm:pb-16 sm:pt-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <h2 className="mb-16 max-w-3xl text-2xl font-bold leading-[1.3] tracking-tight text-[#0F3D2E] sm:text-3xl md:mb-20">
                <span>
                  Standar pilah jelas sejak dari rumah.
                </span>{" "}
                <span className="font-normal text-[#426352]">
                  Tiga kebiasaan inti menjaga kualitas material saat ditimbang, sementara Aksi Hijau
                  sudah aktif diuji pada demo Warga.
                </span>
              </h2>
            </ScrollReveal>

            <EducationPillarsGrid />
          </div>
        </section>

        {/* 3. Section 01: Material PET & Kardus — Vercel-style asymmetric editorial showcase */}
        <section id="material-setoran" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
          <ScrollReveal className="mx-auto max-w-6xl">
            <MaterialShowcaseStage />
          </ScrollReveal>
        </section>

        {/* 4. Section 02: Cek Kesiapan Mandiri Interaktif — Full-bleed dark emerald carousel (1:1 Beranda PlatformShowcase) */}
        <SortingReadinessCheck />

        {/* 5. Section 03: Setor atau Jemput — Vercel/Mintlify asymmetric showcase */}
        <section id="setor-atau-jemput" className="scroll-mt-24 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-12">
          <ScrollReveal className="mx-auto max-w-6xl">
            <PlanningAndRouteStage />
          </ScrollReveal>
        </section>

        {/* 6. Section 04: Setelah Ditimbang — Linear `/plan` style specification showcase */}
        <section id="setelah-ditimbang" className={`${styles.softSection} scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20`}>
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                  Dari foto timbangan
                  <br />
                  <span className="text-[#1D9E75]">hingga terverifikasi</span>
                </h2>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                  Saat penimbangan berlangsung, warga mengambil satu foto bukti yang memuat material terpilah sekaligus angka layar timbangan digital dalam satu bingkai.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <VerificationShowcaseStage />
            </ScrollReveal>
          </div>
        </section>

        {/* 7. Section 05: Lima Kategori Aksi Hijau — Linear horizontal card showcase + 3-col footer rules */}
        <section id="aksi-hijau" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="mb-10 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                  Lima kategori<br />
                  <span className="text-[#1D9E75]">Aksi Hijau</span>
                </h2>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                  Di luar rancangan setoran PET dan kardus, warga sudah bisa menguji pencatatan dan verifikasi foto lima kebiasaan hijau di Portal Warga.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <GreenActionsCarousel />
            </ScrollReveal>
          </div>
        </section>

        {/* Galeri edukasi */}
        <section id="galeri" className="scroll-mt-24 overflow-x-clip px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="mb-6 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                  Alur lengkap dari pilah
                  <br />
                  <span className="text-[#1D9E75]">hingga dampak kota</span>
                </h2>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                  <span className="font-bold text-[#0F3D2E]">
                    Enam tahap ekosistem BONI dalam satu urutan.
                  </span>{" "}
                  Mulai dari pemilahan PET dan kardus di rumah, bukti foto timbang dan verifikasi,
                  hingga uji Aksi Hijau, penukaran EcoPoints, dan pantauan 31 kecamatan.
                </p>
              </div>
            </ScrollReveal>

            <EducationGallery />
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
