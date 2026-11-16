import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { DashboardSidebarPanel } from "@/components/layout/Sidebar";
import WelcomeSection from "@/components/features/dashboard-main/WelcomeSection";
import KpiCards from "@/components/features/dashboard-main/KpiCards";
import TantanganAktifPanel from "@/components/features/dashboard-main/TantanganAktifPanel";
import VoucherSummaryCard from "@/components/features/dashboard-main/VoucherSummaryCard";
import GreenActionHistory from "@/components/features/green-action/GreenActionHistory";
import EducationPillarsGrid from "@/components/features/edukasi/EducationPillarsGrid";
import GreenActionsCarousel from "@/components/features/edukasi/GreenActionsCarousel";
import MaterialShowcaseStage from "@/components/features/edukasi/MaterialShowcaseStage";
import PlanningAndRouteStage from "@/components/features/edukasi/PlanningAndRouteStage";
import ScrollReveal from "@/components/features/edukasi/ScrollReveal";
import SortingReadinessCheck from "@/components/features/edukasi/SortingReadinessCheck";
import VerificationShowcaseStage from "@/components/features/edukasi/VerificationShowcaseStage";
import WeighingPhotoIllustration from "@/components/features/edukasi/WeighingPhotoIllustration";
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

const ecosystemGroups = [
  {
    id: "peluang-kolaborasi",
    label: "Peluang kolaborasi di Surabaya",
    references: collaborationReferences,
    direction: "left" as const,
  },
  {
    id: "rencana-integrasi",
    label: "Peluang integrasi aplikasi dan layanan",
    references: integrationReferences,
    direction: "right" as const,
  },
];

type GalleryVisualKind =
  | "sorting-preview"
  | "weighing-illustration"
  | "ai-verification"
  | "photo-hero"
  | "umkm-voucher"
  | "district-map";

type GalleryItem = {
  stage: string;
  title: string;
  caption: string;
  footerLabel: string;
  footerLinkLabel: string;
  footerHref: string;
  visualKind: GalleryVisualKind;
};

const galleryItems: GalleryItem[] = [
  {
    stage: "Urutan 01 · Pilah",
    title: "Pemilahan PET & kardus dari rumah",
    caption:
      "Pisahkan botol plastik PET kode 1 dan kardus kering dari sampah dapur basah sebelum ditimbang.",
    footerLabel: "Standar rumah",
    footerLinkLabel: "Lihat kriteria →",
    footerHref: "#material-setoran",
    visualKind: "sorting-preview",
  },
  {
    stage: "Urutan 02 · Timbang",
    title: "Satu foto material + angka timbangan",
    caption:
      "Posisi material terpilah dan layar timbangan digital terekam jelas dalam satu bingkai foto transaksi.",
    footerLabel: "Rancangan 1 Frame",
    footerLinkLabel: "Panduan foto →",
    footerHref: "#setelah-ditimbang",
    visualKind: "weighing-illustration",
  },
  {
    stage: "Urutan 03 · Verifikasi",
    title: "Pemeriksaan bukti AI & tinjauan manual",
    caption:
      "Sistem mengecek jenis material, resolusi minimal 320px, usia foto maks. 72 jam, serta duplikasi hash SHA-256.",
    footerLabel: "Verifikasi berlapis · AI & fisik",
    footerLinkLabel: "Uji di Portal Warga →",
    footerHref: "/login?role=warga",
    visualKind: "ai-verification",
  },
  {
    stage: "Aksi Hijau · Kegiatan",
    title: "5 Aksi Hijau di Portal Warga",
    caption:
      "Pilah sampah, setor jelantah, tanam pohon, hemat energi, dan transportasi rendah emisi sudah aktif diuji.",
    footerLabel: "Portal Warga",
    footerLinkLabel: "Mulai aksi →",
    footerHref: "/login?role=warga",
    visualKind: "photo-hero",
  },
  {
    stage: "Rencana Manfaat · UMKM",
    title: "Insentif EcoPoints & voucher UMKM",
    caption:
      "Poin terverifikasi ditukarkan menjadi voucher simulasi di warung dan mitra UMKM Surabaya.",
    footerLabel: "Bursa Pasar Hijau",
    footerLinkLabel: "Lihat hadiah →",
    footerHref: "/login?role=warga",
    visualKind: "umkm-voucher",
  },
  {
    stage: "Pemantauan · Wilayah",
    title: "Rekap partisipasi & peta dampak kota",
    caption:
      "Agregat aksi hijau dan laporan titik sampah dipetakan di 5 wilayah (31 kecamatan) Surabaya tanpa alamat pribadi.",
    footerLabel: "Agregasi spasial · 31 kecamatan",
    footerLinkLabel: "Pilih portal demo →",
    footerHref: "/#gateway",
    visualKind: "district-map",
  },
];

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

              <div className="relative z-10 overflow-hidden rounded-2xl border border-emerald-900/15 bg-[#F5F5F5] text-left shadow-[0_24px_48px_-12px_rgba(7,34,25,0.22)]">
                {/* Browser Chrome Bar matching Beranda HeroConsole */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 bg-[#FAFDFB] px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" aria-hidden="true" />
                    <span className="ml-2 rounded-md border border-emerald-900/10 bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#426352]">
                      boni.app/dashboard · Pratinjau Portal Warga
                    </span>
                  </div>
                  <Link
                    href="/login?role=warga"
                    className="font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
                  >
                    Buka halaman penuh →
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row">
                  {/* Left Authentic Portal Warga Sidebar */}
                  <aside
                    aria-label="Pratinjau navigasi akun warga"
                    className="hidden w-[212px] shrink-0 border-r border-[#E5E7EB] bg-white md:block"
                  >
                    <DashboardSidebarPanel activeHref="/dashboard" />
                  </aside>

                  {/* Right Authentic Portal Warga Canvas */}
                  <div className="min-w-0 flex-1 bg-[#F5F5F5]">
                    <div className="flex flex-col gap-3.5 p-3.5 sm:p-4">
                      <WelcomeSection headingTag="h2" compact />
                      <KpiCards compact />
                      <div className="grid gap-3.5 lg:grid-cols-[3fr_2fr]">
                        <div className="flex flex-col gap-3.5">
                          <GreenActionHistory limit={2} />
                        </div>
                        <div className="flex flex-col gap-3.5">
                          <TantanganAktifPanel />
                          <VoucherSummaryCard />
                        </div>
                      </div>
                    </div>

                    {/* Mobile quick jump strip inside preview */}
                    <nav
                      aria-label="Pintasan langkah mobile"
                      className="flex flex-wrap gap-1.5 border-t border-emerald-950/[0.07] bg-white p-4 md:hidden"
                    >
                      <Link
                        href="/login?role=warga"
                        className="rounded-lg bg-[#0F3D2E] px-2.5 py-1 text-[11px] font-bold text-white"
                      >
                        Buka Portal Warga →
                      </Link>
                      {journeyLinks.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="rounded-lg border border-emerald-950/10 bg-[#FAFDFB] px-2.5 py-1 text-[11px] font-semibold text-[#0F3D2E]"
                        >
                          {item.step} · {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 2. Peluang Kolaborasi + Pengantar — marquee full-bleed kiri-kanan, konten max-w-6xl */}
        <section className="overflow-x-clip pb-20 pt-12 sm:pb-24 sm:pt-14">
          <ScrollReveal className="mb-16 md:mb-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <p className="mb-6 max-w-xl text-sm leading-relaxed text-[#426352]">
                Kandidat kolaborasi dan integrasi berdasarkan riset awal BONI.
              </p>
            </div>
            <div className="space-y-6">
              {ecosystemGroups.map((group) => (
                <EcosystemMarquee key={group.id} {...group} />
              ))}
            </div>
          </ScrollReveal>

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
        <section id="material-setoran" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
          <ScrollReveal className="mx-auto max-w-6xl">
            <MaterialShowcaseStage />
          </ScrollReveal>
        </section>

        {/* 4. Section 02: Cek Kesiapan Mandiri Interaktif — Full-bleed dark emerald carousel (1:1 Beranda PlatformShowcase) */}
        <SortingReadinessCheck />

        {/* 5. Section 03: Setor atau Jemput — Vercel/Mintlify asymmetric showcase */}
        <section id="setor-atau-jemput" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
          <ScrollReveal className="mx-auto max-w-6xl">
            <PlanningAndRouteStage />
          </ScrollReveal>
        </section>

        {/* 6. Section 04: Setelah Ditimbang — Linear `/plan` style specification showcase */}
        <section id="setelah-ditimbang" className={`${styles.softSection} scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28`}>
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                  Setelah ditimbang:<br />
                  <span className="text-[#1D9E75]">satu foto hingga verifikasi</span>
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                  Saat penimbangan berlangsung, warga mengambil satu foto bukti yang memuat material terpilah sekaligus angka layar timbangan digital dalam satu bingkai.
                </p>
                <Link
                  href="/login?role=warga"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Coba verifikasi Aksi Hijau</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <VerificationShowcaseStage />
            </ScrollReveal>
          </div>
        </section>

        {/* 7. Section 05: Lima Kategori Aksi Hijau — Linear horizontal card showcase + 3-col footer rules */}
        <section id="aksi-hijau" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="mb-10 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                  Lima kategori<br />
                  <span className="text-[#1D9E75]">Aksi Hijau</span>
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                  Di luar rancangan setoran PET dan kardus, warga sudah bisa menguji pencatatan dan verifikasi foto lima kebiasaan hijau di Portal Warga.
                </p>
                <Link
                  href="/login?role=warga"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Coba verifikasi Aksi Hijau</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <GreenActionsCarousel />
            </ScrollReveal>
          </div>
        </section>

        {/* 8. Section 06: Galeri Kegiatan — 2/2/2 alternating 1/3 & 2/3 Beranda-themed bento */}
        <section id="galeri" className="scroll-mt-24 px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                Alur <span className="text-[#1D9E75]">dokumentasi</span>
              </h2>
            </ScrollReveal>

            {/* Alternating 2-2-2 Bento Grid: Row 1 (1/3 + 2/3), Row 2 (2/3 + 1/3), Row 3 (1/3 + 2/3) */}
            <div
              id="galeri-kartu"
              className="mt-10 grid scroll-mt-24 grid-cols-1 gap-5 md:grid-cols-3"
            >
              {galleryItems.map((item, idx) => {
                // Row 1: 1/3 (0) + 2/3 (1)
                // Row 2: 2/3 (2) + 1/3 (3)
                // Row 3: 1/3 (4) + 2/3 (5)
                const isWide = idx === 1 || idx === 2 || idx === 5;
                const isPhotoHero = idx === 3;
                const isMintAccent = idx === 0 || idx === 4;

                const surfaceClasses = isWide
                  ? "md:col-span-2 bg-gradient-to-br from-[#F5FAF7] via-white to-[#EDF7F1] text-[#0F3D2E] border-emerald-900/12"
                  : isPhotoHero
                    ? "md:col-span-1 bg-[#0B2516] text-white border-emerald-950/20"
                    : isMintAccent
                      ? "md:col-span-1 bg-[#E8F5EE] text-[#0F3D2E] border-emerald-900/15"
                      : "md:col-span-1 bg-white text-[#0F3D2E] border-emerald-900/12";

                if (isPhotoHero) {
                  return (
                    <ScrollReveal
                      key={item.title}
                      delay={(idx % 2) * 0.08}
                      className="md:col-span-1"
                    >
                      <figure
                        className={`group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_14px_34px_-12px_rgba(15,61,46,0.18)] sm:p-7 ${surfaceClasses}`}
                      >
                        <Image
                          src="/media/hero-planting-poster.jpg"
                          alt="Ilustrasi kegiatan penanaman bibit tanaman di pekarangan warga"
                          fill
                          sizes="(max-width: 767px) 100vw, 360px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B2516]/90 via-[#0F3320]/75 to-[#0B2516]/94"
                        />

                        <div className="relative z-10">
                          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                            {item.stage}
                          </span>
                          <h3 className="mt-2 text-lg font-extrabold leading-snug tracking-tight text-white sm:text-xl">
                            {item.title}
                          </h3>
                          <p className="mt-2.5 text-xs leading-relaxed text-emerald-100/90 sm:text-[13px]">
                            {item.caption}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            <span className="whitespace-nowrap rounded-full border border-emerald-400/25 bg-emerald-950/60 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-200">
                              5 Kategori Aksi
                            </span>
                            <span className="whitespace-nowrap rounded-full border border-emerald-400/25 bg-emerald-950/60 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-200">
                              +30 s.d. +80 Poin
                            </span>
                          </div>
                        </div>

                        <figcaption className="relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-white/15 pt-3.5 text-xs">
                          <span className="font-semibold text-emerald-100/90">
                            {item.footerLabel}
                          </span>
                          <Link
                            href={item.footerHref}
                            className="shrink-0 whitespace-nowrap font-bold text-emerald-300 transition-colors hover:text-white"
                          >
                            {item.footerLinkLabel}
                          </Link>
                        </figcaption>
                      </figure>
                    </ScrollReveal>
                  );
                }

                if (isWide) {
                  return (
                    <ScrollReveal
                      key={item.title}
                      delay={(idx % 2) * 0.08}
                      className="md:col-span-2"
                    >
                      <figure
                        className={`group relative flex h-full min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_14px_34px_-12px_rgba(15,61,46,0.08)] sm:p-7 ${surfaceClasses}`}
                      >
                        <div className="grid flex-1 grid-cols-1 items-center gap-6 sm:grid-cols-12">
                          <div className="sm:col-span-5">
                            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
                              {item.stage}
                            </span>
                            <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-[#0F3D2E] sm:text-2xl">
                              {item.title}
                            </h3>
                            <p className="mt-2.5 text-[13px] leading-relaxed text-[#426352] sm:text-sm">
                              {item.caption}
                            </p>
                          </div>

                          <div className="sm:col-span-7">
                            {item.visualKind === "weighing-illustration" && (
                              <div className="overflow-hidden rounded-xl border border-emerald-900/12 shadow-sm">
                                <WeighingPhotoIllustration compact />
                              </div>
                            )}

                            {item.visualKind === "ai-verification" && (
                              <div className="rounded-xl border border-emerald-900/12 bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between gap-2 border-b border-emerald-900/8 pb-2.5">
                                  <span className="text-[11px] font-bold text-[#0F3D2E]">
                                    Pemeriksaan Bukti Otomatis
                                  </span>
                                  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#E8F8F0] px-2.5 py-0.5 text-[10px] font-bold text-[#1D9E75]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#1D9E75]" />
                                    AI + Manual
                                  </span>
                                </div>
                                <div className="mt-2.5 space-y-2 text-[11.5px]">
                                  {[
                                    { label: "Resolusi foto minimum", status: "≥ 320px" },
                                    { label: "Usia foto & jeda kirim", status: "≤ 72 jam" },
                                    { label: "Pemeriksaan duplikasi", status: "SHA-256" },
                                  ].map((row) => (
                                    <div
                                      key={row.label}
                                      className="flex items-center justify-between gap-2 rounded-lg bg-[#F5FAF7] px-2.5 py-1.5"
                                    >
                                      <span className="font-medium text-[#2D5542]">
                                        {row.label}
                                      </span>
                                      <span className="shrink-0 whitespace-nowrap font-bold tabular-nums text-[#1D9E75]">
                                        ✓ {row.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.visualKind === "district-map" && (
                              <div className="rounded-xl border border-emerald-900/12 bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between gap-2 border-b border-emerald-900/8 pb-2.5">
                                  <span className="text-[11px] font-bold text-[#0F3D2E]">
                                    Sebaran Wilayah Surabaya
                                  </span>
                                  <span className="shrink-0 whitespace-nowrap rounded-full bg-[#EFF8F3] px-2.5 py-0.5 text-[10px] font-bold tabular-nums text-[#1D9E75]">
                                    31 Kecamatan
                                  </span>
                                </div>
                                <div className="mt-3 space-y-2 text-[11px]">
                                  {[
                                    { region: "Surabaya Selatan", count: 8, width: "w-full" },
                                    { region: "Surabaya Timur", count: 7, width: "w-[88%]" },
                                    { region: "Surabaya Barat", count: 7, width: "w-[88%]" },
                                    { region: "Surabaya Utara", count: 5, width: "w-[63%]" },
                                    { region: "Surabaya Pusat", count: 4, width: "w-[50%]" },
                                  ].map((d) => (
                                    <div key={d.region} className="grid grid-cols-[105px_1fr_auto] items-center gap-2.5">
                                      <span className="truncate font-semibold text-[#0F3D2E]">
                                        {d.region}
                                      </span>
                                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-950/[0.07]">
                                        <div
                                          className={`h-full rounded-full bg-[#1D9E75] ${d.width}`}
                                        />
                                      </div>
                                      <span className="shrink-0 whitespace-nowrap font-mono text-[10.5px] font-bold tabular-nums text-[#1D9E75]">
                                        {d.count} kec.
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-emerald-900/10 pt-3.5 text-xs">
                          <span className="font-semibold text-[#426352]">
                            {item.footerLabel}
                          </span>
                          <a
                            href={item.footerHref}
                            className="shrink-0 whitespace-nowrap font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
                          >
                            {item.footerLinkLabel}
                          </a>
                        </figcaption>
                      </figure>
                    </ScrollReveal>
                  );
                }

                return (
                  <ScrollReveal
                    key={item.title}
                    delay={(idx % 2) * 0.08}
                    className="md:col-span-1"
                  >
                    <figure
                      className={`group relative flex h-full min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_14px_34px_-12px_rgba(15,61,46,0.08)] sm:p-7 ${surfaceClasses}`}
                    >
                      <div>
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
                          {item.stage}
                        </span>
                        <h3 className="mt-2 text-lg font-extrabold leading-snug tracking-tight text-[#0F3D2E] sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-[#2D5542] sm:text-[13px]">
                          {item.caption}
                        </p>
                      </div>

                      {item.visualKind === "sorting-preview" && (
                        <div className="my-4 space-y-2 rounded-xl border border-emerald-900/10 bg-white/95 p-3 shadow-sm">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-bold text-[#0F3D2E]">
                              01 · Botol PET
                            </span>
                            <span className="shrink-0 whitespace-nowrap rounded-md bg-[#E8F8F0] px-2 py-0.5 text-[10px] font-bold text-[#1D9E75]">
                              Kode 1 · Kering
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2 border-t border-emerald-900/8 pt-2 text-xs">
                            <span className="font-bold text-[#0F3D2E]">
                              02 · Kardus
                            </span>
                            <span className="shrink-0 whitespace-nowrap rounded-md bg-[#E8F8F0] px-2 py-0.5 text-[10px] font-bold text-[#1D9E75]">
                              Lipat Rata
                            </span>
                          </div>
                        </div>
                      )}

                      {item.visualKind === "umkm-voucher" && (
                        <div className="my-4 rounded-xl border border-emerald-900/10 bg-white/95 p-3.5 shadow-sm">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#1D9E75]">
                              Kopi Kampung Genteng
                            </span>
                            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#0F3D2E] px-2.5 py-0.5 text-[10px] font-bold tabular-nums text-white">
                              150 Poin
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs font-extrabold text-[#0F3D2E]">
                            Gratis Kopi Susu · Bawa Tumbler
                          </p>
                          <p className="mt-1.5 border-t border-dashed border-emerald-900/15 pt-1.5 text-[10.5px] font-medium text-[#426352]">
                            Berlaku 14 hari · Simulasi katalog
                          </p>
                        </div>
                      )}

                      <figcaption className="flex items-center justify-between gap-2 border-t border-emerald-900/10 pt-3.5 text-xs">
                        <span className="font-semibold text-[#426352]">
                          {item.footerLabel}
                        </span>
                        <a
                          href={item.footerHref}
                          className="shrink-0 whitespace-nowrap font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
                        >
                          {item.footerLinkLabel}
                        </a>
                      </figcaption>
                    </figure>
                  </ScrollReveal>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-xs text-[#426352]">
              <p>
                Keenam slot dokumentasi di atas masih berupa ilustrasi rancangan hingga uji coba lapangan bersama pengepul berjalan.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-bold text-[#0F3D2E]">
                <Link href="/login?role=warga" className="transition-colors hover:text-[#1D9E75]">
                  Coba Portal Warga <span aria-hidden="true">→</span>
                </Link>
                <Link href="/#gateway" className="transition-colors hover:text-[#1D9E75]">
                  Pilih portal demo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
