import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { DashboardSidebarPanel } from "@/components/layout/Sidebar";
import WelcomeSection from "@/components/features/dashboard-main/WelcomeSection";
import KpiCards from "@/components/features/dashboard-main/KpiCards";
import TantanganAktifPanel from "@/components/features/dashboard-main/TantanganAktifPanel";
import VoucherSummaryCard from "@/components/features/dashboard-main/VoucherSummaryCard";
import GreenActionHistory from "@/components/features/green-action/GreenActionHistory";
import GreenActionsCarousel from "@/components/features/edukasi/GreenActionsCarousel";
import MaterialShowcaseStage from "@/components/features/edukasi/MaterialShowcaseStage";
import PlanningAndRouteStage from "@/components/features/edukasi/PlanningAndRouteStage";
import SortingReadinessCheck from "@/components/features/edukasi/SortingReadinessCheck";
import VerificationShowcaseStage from "@/components/features/edukasi/VerificationShowcaseStage";
import WeighingPhotoIllustration from "@/components/features/edukasi/WeighingPhotoIllustration";
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

const collaborationReferences = [
  {
    name: "Bank Sampah Induk Surabaya",
    href: "https://surabaya.go.id/id/berita/10222/wali-kota-eri-cahyadi-resmikan-bank-sampah-induk-surabaya-target-penjualan-sampah-kering-150-ton-perbulan",
    logo: "/images/kolaborasi/bank-sampah-induk-surabaya.webp",
  },
  {
    name: "Tunas Hijau ID",
    href: "https://tunashijau.id/profil/",
    logo: "/images/kolaborasi/tunas-hijau.webp",
  },
  {
    name: "Green Living Support",
    href: "https://www.greenlivingsupport.or.id/tentang-kami/",
    logo: "/images/kolaborasi/green-living-support.webp",
  },
  {
    name: "Green Generation Surabaya",
    href: "https://www.instagram.com/greengnrsby/",
    logo: "/images/kolaborasi/green-generation-surabaya.webp",
  },
  {
    name: "Surabaya Next Leader",
    href: "https://surabaya.go.id/id/berita/9942/wali-kota-eri-cahyadi-resmikan-rumah-surabaya-next-leader-wadah-untuk-tampung-aspirasi-anak-muda",
    logo: "/images/kolaborasi/surabaya-next-leader.webp",
  },
] as const;

const publicServiceReferences = [
  {
    name: "WargaKu Surabaya",
    href: "https://wargaku.surabaya.go.id/",
    logo: "/images/kolaborasi/wargaku-surabaya.png",
  },
  {
    name: "PPID Kota Surabaya",
    href: "https://ppid.surabaya.go.id/",
    logo: "/images/kolaborasi/ppid-surabaya.png",
  },
  {
    name: "e-Peken Surabaya",
    href: "https://peken.surabaya.go.id/",
    logo: "/images/kolaborasi/peken-surabaya.webp",
  },
  {
    name: "SIMAKMUR",
    href: null,
    logo: "/images/kolaborasi/simakmur.webp",
  },
  {
    name: "SIMPELMANIS",
    href: null,
    logo: null,
  },
] as const;

type GalleryItem = {
  stage: string;
  title: string;
  slotStatus: string;
  dateSlot: string;
  locationSlot: string;
  caption: string;
  visual:
    | { kind: "image"; src: string; alt: string; fit: "cover" | "contain" }
    | { kind: "weighing-illustration" };
};

const galleryItems: GalleryItem[] = [
  {
    stage: "Urutan 01 · Pilah",
    title: "Pemilahan PET & kardus dari rumah",
    slotStatus: "Ilustrasi · Slot foto asli belum terisi",
    dateSlot: "Belum diisi (Tanggal kegiatan)",
    locationSlot: "Belum diisi (Rumah warga / titik awal)",
    caption:
      "Menggambarkan warga memilah botol PET kode 1 dan kardus kering secara terpisah sebelum diajukan ke pengepul.",
    visual: {
      kind: "image",
      src: "/images/3d/community.jpg",
      alt: "Ilustrasi warga memilah material daur ulang dan berkolaborasi dengan bank sampah",
      fit: "contain",
    },
  },
  {
    stage: "Urutan 02 · Timbang",
    title: "Satu foto material + angka timbangan",
    slotStatus: "Ilustrasi · Slot foto asli belum terisi",
    dateSlot: "Belum diisi (Tanggal penimbangan)",
    locationSlot: "Belum diisi (Titik pengepul / lokasi jemput)",
    caption:
      "Contoh visual posisi material terpilah dan angka layar timbangan digital dalam satu bingkai foto transaksi.",
    visual: {
      kind: "weighing-illustration",
    },
  },
  {
    stage: "Urutan 03 · Verifikasi",
    title: "Pemeriksaan bukti AI & peninjauan manual",
    slotStatus: "Ilustrasi · Slot foto asli belum terisi",
    dateSlot: "Belum diisi (Tanggal uji coba)",
    locationSlot: "Belum diisi (Surabaya / ruang uji tim)",
    caption:
      "Visual tahap pengecekan kesesuaian material, pembacaan bukti oleh AI, dan peninjauan manual bila ada bukti meragukan.",
    visual: {
      kind: "image",
      src: "/images/3d/verification.jpg",
      alt: "Ilustrasi 3D daftar periksa pemilahan dan verifikasi bukti transaksi",
      fit: "contain",
    },
  },
  {
    stage: "Aksi Hijau · Kegiatan",
    title: "Dokumentasi Aksi Hijau warga",
    slotStatus: "Ilustrasi · Slot foto asli belum terisi",
    dateSlot: "Belum diisi (Tanggal kegiatan)",
    locationSlot: "Belum diisi (Lokasi aksi di Surabaya)",
    caption:
      "Contoh ilustrasi kegiatan penghijauan sebagai dokumentasi Aksi Hijau di luar alur penimbangan PET dan kardus.",
    visual: {
      kind: "image",
      src: "/media/hero-planting-poster.jpg",
      alt: "Foto ilustrasi kegiatan penanaman bibit tanaman di tanah",
      fit: "cover",
    },
  },
  {
    stage: "Rencana Manfaat · UMKM",
    title: "Rencana insentif & mitra UMKM lokal",
    slotStatus: "Ilustrasi · Slot foto asli belum terisi",
    dateSlot: "Belum diisi (Tanggal kolaborasi)",
    locationSlot: "Belum diisi (Warung / mitra UMKM Surabaya)",
    caption:
      "Visual contoh penukaran EcoPoints dari transaksi valid ke voucher mitra UMKM pada tahap pengembangan ekosistem.",
    visual: {
      kind: "image",
      src: "/images/3d/marketplace.jpg",
      alt: "Ilustrasi 3D voucher EcoPoints dan mitra UMKM lokal",
      fit: "contain",
    },
  },
  {
    stage: "Pemantauan · Wilayah",
    title: "Rekap partisipasi & peta dampak kota",
    slotStatus: "Ilustrasi · Slot foto asli belum terisi",
    dateSlot: "Belum diisi (Tanggal pemetaan)",
    locationSlot: "Belum diisi (Kecamatan di Surabaya)",
    caption:
      "Visualisasi agregat partisipasi warga per kecamatan yang mendukung perencanaan pengelolaan sampah kota tanpa membuka alamat pribadi.",
    visual: {
      kind: "image",
      src: "/images/3d/geospatial.jpg",
      alt: "Ilustrasi 3D peta dampak wilayah Surabaya",
      fit: "contain",
    },
  },
];

export default function EducationPage() {
  return (
    <LayoutWrapper>
      <div className="bg-[#FAFDFB] text-[#0F3D2E] antialiased">
        {/* 1. Hero Section — Aligned with Beranda typography & colors */}
        <section className="relative overflow-hidden border-b border-emerald-900/10 bg-[#F5FAF7] pt-16 md:pt-24">
          <div className="mx-auto max-w-[1100px] px-6 text-left">
            <h1 className="max-w-[780px] text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F3D2E] sm:text-5xl lg:text-[54px]">
              Dari sampah terpilah menjadi setoran yang tercatat
            </h1>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-base leading-relaxed text-[#2D5542]">
                Panduan warga memilah PET dan kardus, mengecek kesiapan mandiri, dan menguji verifikasi foto Aksi Hijau.
              </p>
              <a
                href="#cek-kesiapan"
                className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75] sm:self-auto"
              >
                <span>Panduan</span>
                <span className="font-medium text-[#426352]">Pilah &amp; Setor</span>
                <span className="text-[#1D9E75]" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Full-Bleed Studio Horizon & Lit Floor Backdrop ("standing panel" illusion matching Linear hero) */}
          <div className={`${styles.heroBackdrop} relative mt-10 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:mt-12 md:pb-24 md:pt-12`}>
            {/* Soft radial studio spotlight behind standing window */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-12 top-0 bg-[radial-gradient(62%_56%_at_50%_60%,rgba(255,255,255,0.72),transparent_72%)]"
            />

            <div className={`${styles.heroPerspectiveContainer} relative mx-auto max-w-[1080px]`}>
              {/* Grounded double floor contact shadows directly underneath the standing frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2.5 inset-x-6 h-5 rounded-[100%] bg-[#072219]/40 blur-md"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-7 -inset-x-4 h-12 rounded-[100%] bg-[#072219]/22 blur-2xl"
              />

              <div className="relative z-10 overflow-hidden rounded-xl border border-emerald-950/[0.14] bg-[#F5F5F5] text-left shadow-[0_24px_48px_-12px_rgba(7,34,25,0.28),0_0_0_1px_rgba(15,61,46,0.06)]">
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
                        href="/dashboard"
                        className="rounded-lg bg-[#0F3D2E] px-2.5 py-1 text-[11px] font-semibold text-white"
                      >
                        Buka Portal Warga →
                      </Link>
                      {journeyLinks.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="rounded-lg border border-emerald-950/10 bg-[#FAFDFB] px-2.5 py-1 text-[11px] font-medium text-[#0F3D2E]"
                        >
                          {item.step} · {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Peluang Kolaborasi + Pengantar — max-w-[1100px] */}
        <section className="px-6 pb-24 pt-12 md:pb-28 md:pt-14">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 space-y-8 md:mb-20 md:space-y-10">
              {[
                {
                  id: "peluang-kolaborasi",
                  label: "Peluang kolaborasi di Surabaya",
                  references: collaborationReferences,
                },
                {
                  id: "rencana-integrasi",
                  label: "Rencana integrasi layanan publik",
                  references: publicServiceReferences,
                },
              ].map(({ id, label, references }) => (
                <section key={id} id={id} className="scroll-mt-28">
                  <ul
                    aria-labelledby={id + "-label"}
                    className="flex flex-wrap items-center justify-start gap-x-7 gap-y-3 lg:justify-between"
                  >
                    {references.map(({ name, href, logo }) => {
                      const LogoItem = href ? "a" : "span";

                      return (
                        <li key={name}>
                          <LogoItem
                            href={href ?? undefined}
                            className="inline-flex min-h-11 items-center gap-2.5 rounded-sm text-sm font-semibold leading-tight text-[#0F3D2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D9E75] [&[href]:hover]:text-[#147F5F]"
                          >
                            {logo ? (
                              <Image
                                src={logo}
                                alt=""
                                width={52}
                                height={36}
                                className="h-9 w-auto max-w-[52px] shrink-0 object-contain"
                              />
                            ) : (
                              <ClipboardList size={22} aria-hidden="true" className="shrink-0" />
                            )}
                            <span className="max-w-[11rem]">{name}</span>
                          </LogoItem>
                        </li>
                      );
                    })}
                  </ul>
                  <h2
                    id={id + "-label"}
                    className="mt-3 text-[11px] font-medium uppercase tracking-widest text-[#4D6D5B]"
                  >
                    {label}
                  </h2>
                </section>
              ))}
            </div>

            <h2 className="mb-16 max-w-3xl text-2xl font-bold leading-[1.3] tracking-tight text-[#0F3D2E] sm:text-3xl md:mb-20">
              <span>
                Standar pilah jelas sejak dari rumah.
              </span>{" "}
              <span className="font-normal text-[#426352]">
                Tiga kebiasaan inti menjaga kualitas material saat ditimbang, sementara Aksi Hijau
                sudah aktif diuji pada demo Warga.
              </span>
            </h2>

            <div className="grid grid-cols-1 divide-y divide-emerald-950/[0.08] border-t border-emerald-950/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
              {/* Pillar 1 — FIG 0.1 */}
              <div className="flex flex-col py-8 md:py-6 md:pr-8">
                <span className="text-[11px] font-medium uppercase tracking-widest tabular-nums text-[#4D6D5B]/80">
                  FIG 0.1
                </span>
                <div className="my-6 flex h-44 items-center justify-center sm:h-48">
                  <svg className="h-full w-full max-w-[230px]" viewBox="0 0 240 200" fill="none" aria-hidden="true">
                    {/* Lower 4 stacked isometric sorting layers */}
                    <path d="M120 120 L192 154 L120 188 L48 154 Z" fill="#FAFDFB" stroke="#0F3D2E" strokeOpacity="0.16" strokeWidth="1" />
                    <path d="M120 106 L192 140 L120 174 L48 140 Z" fill="#FAFDFB" stroke="#0F3D2E" strokeOpacity="0.2" strokeWidth="1" />
                    <path d="M120 92 L192 126 L120 160 L48 126 Z" fill="#FAFDFB" stroke="#0F3D2E" strokeOpacity="0.24" strokeWidth="1" />
                    <path d="M120 78 L192 112 L120 146 L48 112 Z" fill="#F0FAF4" stroke="#0F3D2E" strokeOpacity="0.3" strokeWidth="1" />
                    {/* Subtle dashed corner guides */}
                    <line x1="48" y1="62" x2="48" y2="112" stroke="#1D9E75" strokeOpacity="0.3" strokeDasharray="2 3" />
                    <line x1="192" y1="62" x2="192" y2="112" stroke="#1D9E75" strokeOpacity="0.3" strokeDasharray="2 3" />
                    <line x1="120" y1="96" x2="120" y2="146" stroke="#1D9E75" strokeOpacity="0.3" strokeDasharray="2 3" />
                    {/* Elevated top plate */}
                    <path d="M120 26 L192 60 L120 94 L48 60 Z" fill="#FFFFFF" stroke="#0F3D2E" strokeOpacity="0.45" strokeWidth="1.2" />
                    <path d="M48 60 L120 94 L120 100 L48 66 Z" fill="#F0FAF4" stroke="#0F3D2E" strokeOpacity="0.3" strokeWidth="1" />
                    <path d="M192 60 L120 94 L120 100 L192 66 Z" fill="#E3F4E9" stroke="#0F3D2E" strokeOpacity="0.3" strokeWidth="1" />
                    {/* Inner seal emblem matching isometric plane */}
                    <ellipse cx="120" cy="60" rx="24" ry="12" stroke="#1D9E75" strokeOpacity="0.55" strokeWidth="1" />
                    <line x1="100" y1="61" x2="140" y2="61" stroke="#1D9E75" strokeOpacity="0.4" strokeWidth="0.9" />
                    <line x1="104" y1="64" x2="136" y2="64" stroke="#1D9E75" strokeOpacity="0.4" strokeWidth="0.9" />
                    <line x1="110" y1="67" x2="130" y2="67" stroke="#1D9E75" strokeOpacity="0.4" strokeWidth="0.9" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#0F3D2E]">Pilah material</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4D6D5B]">
                  Pisahkan botol plastik PET (kode 1) dan kardus kering dari sisa makanan atau sampah dapur yang mudah membusuk.
                </p>
              </div>

              {/* Pillar 2 — FIG 0.2 */}
              <div className="flex flex-col py-8 md:px-8 md:py-6">
                <span className="text-[11px] font-medium uppercase tracking-widest tabular-nums text-[#4D6D5B]/80">
                  FIG 0.2
                </span>
                <div className="my-6 flex h-44 items-center justify-center sm:h-48">
                  <svg className="h-full w-full max-w-[230px]" viewBox="0 0 240 200" fill="none" aria-hidden="true">
                    {/* Back Cube */}
                    <g opacity="0.75">
                      <path d="M132 24 L168 42 L132 60 L96 42 Z" fill="#F0FAF4" stroke="#0F3D2E" strokeOpacity="0.35" strokeWidth="1.1" />
                      <path d="M96 42 L132 60 L132 96 L96 78 Z" fill="#FFFFFF" stroke="#0F3D2E" strokeOpacity="0.25" strokeWidth="1" />
                      <path d="M168 42 L132 60 L132 96 L168 78 Z" fill="#FAFDFB" stroke="#0F3D2E" strokeOpacity="0.25" strokeWidth="1" />
                    </g>
                    {/* Left Cube */}
                    <g>
                      <path d="M84 56 L120 74 L84 92 L48 74 Z" fill="#FFFFFF" stroke="#0F3D2E" strokeOpacity="0.4" strokeWidth="1.1" />
                      <path d="M48 74 L84 92 L84 134 L48 116 Z" fill="#FAFDFB" stroke="#0F3D2E" strokeOpacity="0.3" strokeWidth="1" />
                      <path d="M120 74 L84 92 L84 134 L120 116 Z" fill="#F0FAF4" stroke="#0F3D2E" strokeOpacity="0.3" strokeWidth="1" />
                    </g>
                    {/* Right Cube */}
                    <g>
                      <path d="M162 66 L196 83 L162 100 L128 83 Z" fill="#FFFFFF" stroke="#0F3D2E" strokeOpacity="0.4" strokeWidth="1.1" />
                      <path d="M128 83 L162 100 L162 138 L128 121 Z" fill="#FAFDFB" stroke="#0F3D2E" strokeOpacity="0.3" strokeWidth="1" />
                      <path d="M196 83 L162 100 L162 138 L196 121 Z" fill="#E3F4E9" stroke="#0F3D2E" strokeOpacity="0.3" strokeWidth="1" />
                    </g>
                    {/* Front Foreground Inspection Cube */}
                    <g>
                      <path d="M122 106 L160 125 L122 144 L84 125 Z" fill="#FFFFFF" stroke="#1D9E75" strokeOpacity="0.65" strokeWidth="1.25" />
                      <path d="M84 125 L122 144 L122 178 L84 159 Z" fill="#F0FAF4" stroke="#0F3D2E" strokeOpacity="0.38" strokeWidth="1.1" />
                      <path d="M160 125 L122 144 L122 178 L160 159 Z" fill="#E3F4E9" stroke="#0F3D2E" strokeOpacity="0.38" strokeWidth="1.1" />
                      <path d="M113 125 L120 130 L132 119" stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#0F3D2E]">Cek kesiapan</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4D6D5B]">
                  Gunakan checklist interaktif untuk memastikan botol kering, lakban berlebih lepas, dan kardus sudah terlipat rata.
                </p>
              </div>

              {/* Pillar 3 — FIG 0.3 */}
              <div className="flex flex-col py-8 md:py-6 md:pl-8">
                <span className="text-[11px] font-medium uppercase tracking-widest tabular-nums text-[#4D6D5B]/80">
                  FIG 0.3
                </span>
                <div className="my-6 flex h-44 items-center justify-center sm:h-48">
                  <svg className="h-full w-full max-w-[230px]" viewBox="0 0 240 200" fill="none" aria-hidden="true">
                    {/* Ascending isometric stepped planes (FIG 0.3 rhythm) */}
                    <path d="M108 26 L186 65 L186 154 L108 115 Z" fill="#F0FAF4" stroke="#0F3D2E" strokeOpacity="0.35" strokeWidth="1.1" />
                    <path d="M98 44 L174 82 L174 160 L98 122 Z" fill="#FAFDFB" stroke="#0F3D2E" strokeOpacity="0.32" strokeWidth="1.05" />
                    <path d="M88 62 L162 99 L162 165 L88 128 Z" fill="#FFFFFF" stroke="#0F3D2E" strokeOpacity="0.3" strokeWidth="1" />
                    <path d="M78 78 L150 114 L150 169 L78 133 Z" fill="#FAFDFB" stroke="#0F3D2E" strokeOpacity="0.28" strokeWidth="1" />
                    <path d="M68 94 L138 129 L138 173 L68 138 Z" fill="#FFFFFF" stroke="#0F3D2E" strokeOpacity="0.26" strokeWidth="1" />
                    <path d="M58 109 L126 143 L126 177 L58 143 Z" fill="#F0FAF4" stroke="#1D9E75" strokeOpacity="0.45" strokeWidth="1.05" />
                    <path d="M48 123 L114 156 L114 180 L48 147 Z" fill="#FFFFFF" stroke="#1D9E75" strokeOpacity="0.55" strokeWidth="1.1" />
                    {/* Subtle frame tick highlights on tallest plane */}
                    <rect x="136" y="72" width="30" height="18" rx="3" transform="skewY(26)" fill="#1D9E75" fillOpacity="0.14" stroke="#1D9E75" strokeOpacity="0.55" strokeWidth="1" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#0F3D2E]">Siapkan bukti foto</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4D6D5B]">
                  Pahami syarat satu foto material bersama angka timbangan serta uji pemeriksaan foto AI yang aktif di demo Warga.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Section 01: Material PET & Kardus — Vercel-style asymmetric editorial showcase */}
        <section id="material-setoran" className="scroll-mt-24 border-t border-emerald-950/[0.06] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <MaterialShowcaseStage />
          </div>
        </section>

        {/* 4. Section 02: Cek Kesiapan Mandiri Interaktif */}
        <section className="border-t border-emerald-900/10 bg-[#FAFDFB] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                  Cek kesiapan<br />sebelum setor
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                  Pilih jenis material di panel interaktif berikut untuk memastikan botol PET maupun kardus telah memenuhi tiga syarat pemilahan mandiri.
                </p>
                <a
                  href="#setor-atau-jemput"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Lanjut ke opsi setor</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <SortingReadinessCheck />
          </div>
        </section>

        {/* 5. Section 03: Setor atau Jemput — Vercel/Mintlify asymmetric showcase */}
        <section id="setor-atau-jemput" className="scroll-mt-24 border-t border-emerald-900/10 bg-[#F5FAF7] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <PlanningAndRouteStage />
          </div>
        </section>

        {/* 6. Section 04: Setelah Ditimbang — Linear `/plan` style specification showcase */}
        <section id="setelah-ditimbang" className="scroll-mt-24 border-t border-emerald-900/10 bg-[#FAFDFB] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                  Setelah ditimbang:<br />satu foto hingga verifikasi
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                  Saat penimbangan berlangsung, warga mengambil satu foto bukti yang memuat material terpilah sekaligus angka layar timbangan digital dalam satu bingkai.
                </p>
                <Link
                  href="/dashboard/eco-action"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Coba verifikasi Aksi Hijau</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <VerificationShowcaseStage />
          </div>
        </section>

        {/* 7. Section 05: Lima Kategori Aksi Hijau — Linear horizontal card showcase + 3-col footer rules */}
        <section id="aksi-hijau" className="scroll-mt-24 border-t border-emerald-900/10 bg-[#FAFDFB] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-10 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
                  Lima kategori<br />Aksi Hijau
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#2D5542]">
                  Di luar rancangan setoran PET dan kardus, warga sudah bisa menguji pencatatan dan verifikasi foto lima kebiasaan hijau di Portal Warga.
                </p>
                <Link
                  href="/dashboard/eco-action"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Coba verifikasi Aksi Hijau</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <GreenActionsCarousel />
          </div>
        </section>

        {/* 8. Section 06: Galeri Kegiatan — Linear "Changelog" horizontal dot-line timeline + 2/2/2 alternating 1/3 & 2/3 Beranda-themed bento */}
        <section id="galeri" className="scroll-mt-24 border-t border-emerald-900/10 bg-[#FAFDFB] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px]">
              Alur dokumentasi
            </h2>

            {/* Horizontal 4-milestone Linear Changelog Track */}
            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-2 right-4 top-2 hidden h-px bg-emerald-900/12 md:block"
              />
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                {galleryItems.slice(0, 4).map((item, idx) => (
                  <div key={item.title} className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <span
                        className={`relative z-10 inline-flex h-4 w-4 items-center justify-center rounded-full ${
                          idx === 0
                            ? "bg-[#1D9E75]/20 ring-4 ring-[#FAFDFB]"
                            : "bg-emerald-900/10 ring-4 ring-[#FAFDFB]"
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            idx === 0 ? "bg-[#1D9E75]" : "bg-[#426352]/70"
                          }`}
                        />
                      </span>
                      <div className="h-px flex-1 bg-emerald-900/10 md:hidden" />
                    </div>

                    <h3 className="text-[14px] font-bold leading-snug text-[#0F3D2E]">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#426352]">
                      {item.caption}
                    </p>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-wider tabular-nums text-[#1D9E75]">
                      {item.stage}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#galeri-kartu"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
              >
                <span>Lihat 6 slot dokumentasi &amp; ilustrasi</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Alternating 2-2-2 Bento Grid: Row 1 (1/3 + 2/3), Row 2 (2/3 + 1/3), Row 3 (1/3 + 2/3) */}
            <div
              id="galeri-kartu"
              className="mt-16 grid scroll-mt-24 grid-cols-1 gap-5 border-t border-emerald-900/10 pt-14 md:grid-cols-3"
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

                if (isPhotoHero && item.visual.kind === "image") {
                  return (
                    <figure
                      key={item.title}
                      className={`group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_14px_34px_-12px_rgba(15,61,46,0.18)] sm:p-7 ${surfaceClasses}`}
                    >
                      <Image
                        src={item.visual.src}
                        alt={item.visual.alt}
                        fill
                        sizes="(max-width: 767px) 100vw, 360px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B2516]/90 via-[#0F3320]/75 to-[#0B2516]/92"
                      />

                      <div className="relative z-10">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                          {item.stage}
                        </span>
                        <h3 className="mt-2 text-lg font-extrabold leading-snug tracking-tight text-white sm:text-xl">
                          “{item.title}”
                        </h3>
                        <p className="mt-2.5 text-xs leading-relaxed text-emerald-100/90 sm:text-[13px]">
                          {item.caption}
                        </p>
                      </div>

                      <figcaption className="relative z-10 mt-6 border-t border-white/15 pt-3.5 text-xs">
                        <p className="font-bold text-white">{item.slotStatus}</p>
                        <p className="mt-0.5 text-[11px] text-emerald-100/80">
                          {item.dateSlot} · {item.locationSlot}
                        </p>
                      </figcaption>
                    </figure>
                  );
                }

                if (isWide) {
                  return (
                    <figure
                      key={item.title}
                      className={`group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_14px_34px_-12px_rgba(15,61,46,0.08)] sm:p-7 ${surfaceClasses}`}
                    >
                      <div className="grid flex-1 grid-cols-1 items-center gap-6 sm:grid-cols-12">
                        <div className="sm:col-span-7">
                          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1D9E75]">
                            {item.stage}
                          </span>
                          <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-[#0F3D2E] sm:text-2xl">
                            {item.title}
                          </h3>
                          <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-[#426352] sm:text-sm">
                            {item.caption}
                          </p>
                        </div>

                        <div className="sm:col-span-5">
                          {item.visual.kind === "weighing-illustration" ? (
                            <div className="overflow-hidden rounded-xl border border-emerald-900/12 shadow-sm">
                              <WeighingPhotoIllustration compact />
                            </div>
                          ) : (
                            <div className="relative mx-auto aspect-square w-full max-w-[200px]">
                              <Image
                                src={item.visual.src}
                                alt={item.visual.alt}
                                fill
                                sizes="220px"
                                className="object-contain mix-blend-multiply"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-emerald-900/10 pt-3.5 text-xs">
                        <span className="font-bold text-[#0F3D2E]">{item.slotStatus}</span>
                        <span className="text-[11px] text-[#426352]">
                          {item.dateSlot} · {item.locationSlot}
                        </span>
                      </figcaption>
                    </figure>
                  );
                }

                return (
                  <figure
                    key={item.title}
                    className={`group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_14px_34px_-12px_rgba(15,61,46,0.08)] sm:p-7 ${surfaceClasses}`}
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

                    {item.visual.kind === "image" && (
                      <div className="relative my-3 ml-auto h-28 w-28 shrink-0">
                        <Image
                          src={item.visual.src}
                          alt={item.visual.alt}
                          fill
                          sizes="120px"
                          className="object-contain mix-blend-multiply"
                        />
                      </div>
                    )}

                    <figcaption className="border-t border-emerald-900/10 pt-3.5 text-xs">
                      <p className="font-bold text-[#0F3D2E]">{item.slotStatus}</p>
                      <p className="mt-0.5 text-[11px] text-[#426352]">
                        {item.dateSlot} · {item.locationSlot}
                      </p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-xs text-[#426352]">
              <p>
                Keenam slot dokumentasi di atas masih berupa ilustrasi rancangan hingga uji coba lapangan bersama pengepul berjalan.
              </p>
              <Link
                href="/dashboard/eco-action"
                className="inline-flex items-center gap-1.5 font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
              >
                <span>Coba Portal Warga</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 9. Final CTA — Aligned with Beranda buttons & weights */}
        <section className="relative overflow-hidden border-t border-emerald-900/10 bg-[#F5FAF7] px-6 py-28 text-center md:py-36">
          <div className="mx-auto max-w-[700px] space-y-8">
            <h2 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E] sm:text-5xl lg:text-6xl">
              Pilah dari rumah.<br />Uji demo hari ini.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/dashboard/eco-action"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-colors hover:bg-[#18533F]"
              >
                <span>Coba verifikasi aksi</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/#gateway"
                className="inline-flex items-center gap-2 rounded-full border border-[#0F3D2E]/25 bg-white px-6 py-3 text-sm font-bold text-[#0F3D2E] transition-colors hover:bg-emerald-50/70"
              >
                <span>Pilih portal demo</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
