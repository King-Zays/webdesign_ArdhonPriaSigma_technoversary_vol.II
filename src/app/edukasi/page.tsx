import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Check,
  MapPin,
  Scale,
  ShieldAlert,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SortingReadinessCheck from "@/components/features/edukasi/SortingReadinessCheck";
import WeighingPhotoIllustration from "@/components/features/edukasi/WeighingPhotoIllustration";
import { EVIDENCE_RULES, GREEN_ACTION_LIST } from "@/config/green-actions";
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

type PartnerLogoVariant =
  | "orbit"
  | "triangle"
  | "cloud"
  | "grid"
  | "cube"
  | "ring"
  | "arc";

interface PartnerLogoSlot {
  id: string;
  name: string;
  variant: PartnerLogoVariant;
  /** Isi path file (mis. "/images/partners/nama-mitra.svg") saat logo mitra resmi sudah siap dipasang */
  logoSrc?: string;
}

const PARTNER_LOGO_SLOTS: readonly PartnerLogoSlot[] = [
  { id: "bank-sampah", name: "Bank Sampah", variant: "orbit" },
  { id: "umkm-mitra", name: "UMKM Mitra", variant: "triangle" },
  { id: "kampus-hijau", name: "Kampus Hijau", variant: "cloud" },
  { id: "komunitas-rw", name: "Komunitas RW", variant: "grid" },
  { id: "aggregator-pet", name: "Aggregator PET", variant: "cube" },
  { id: "daur-karton", name: "Daur Karton", variant: "ring" },
  { id: "gerai-lokal", name: "Gerai Lokal", variant: "arc" },
];

function PartnerSlotGlyph({ variant }: { variant: PartnerLogoVariant }) {
  switch (variant) {
    case "orbit":
      return (
        <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] shrink-0" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5.5 13.5C7.2 8.5 12.8 8.5 14.5 13.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="10" cy="6.5" r="1.4" fill="currentColor" />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 20 20" className="h-[16px] w-[16px] shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M10 3.5L17 16H3L10 3.5Z" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 22 20" className="h-[18px] w-[20px] shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M7.5 15.5h8.2a3.3 3.3 0 0 0 .4-6.58A4.6 4.6 0 0 0 7.4 7.4a3.6 3.6 0 0 0-3.9 3.6c0 2.45 1.8 4.5 4 4.5Z" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 20 20" className="h-[16px] w-[16px] shrink-0" fill="currentColor" aria-hidden="true">
          <circle cx="7" cy="6" r="2.2" />
          <circle cx="13" cy="6" r="2.2" opacity="0.6" />
          <circle cx="7" cy="11.5" r="2.2" opacity="0.75" />
          <circle cx="13" cy="11.5" r="2.2" />
          <path d="M4.8 16.5a2.2 2.2 0 1 1 4.4 0v.5H4.8v-.5Z" opacity="0.85" />
        </svg>
      );
    case "cube":
      return (
        <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] shrink-0" fill="none" aria-hidden="true">
          <path d="M10 2.5L16.5 6.2V13.8L10 17.5L3.5 13.8V6.2L10 2.5Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 10L16.5 6.2M10 10L3.5 6.2M10 10V17.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 20 20" className="h-[16px] w-[16px] shrink-0" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="3.2" strokeDasharray="28 10" />
        </svg>
      );
    case "arc":
      return (
        <svg viewBox="0 0 20 20" className="h-[16px] w-[16px] shrink-0" fill="none" aria-hidden="true">
          <path d="M3.5 14.5C9.5 14.5 14 10.5 15.8 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M11.5 14.5H16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

const materialGuides = [
  {
    id: "botol-pet",
    code: "Material 01 · PET (Kode 1)",
    title: "Botol plastik PET",
    focus:
      "Kenali simbol segitiga angka 1, pastikan botol kosong dan kering, lalu pisahkan dari sampah basah sebelum dicek pada checklist di bawah.",
    accepted: [
      "Botol air mineral & minuman bening/biru muda kode 1",
      "Kondisi bersih, sudah ditiriskan, dan tidak lengket",
      "Terpisah dari plastik lain dan sisa makanan",
    ],
    avoided: [
      "Plastik sachet berlapis foil atau kemasan berminyak",
      "Botol yang masih berisi cairan atau bercampur sampah dapur",
    ],
  },
  {
    id: "kardus",
    code: "Material 02 · Karton",
    title: "Kardus dan karton",
    focus:
      "Jaga kardus tetap kering dan bersih dari isi non-kertas, lalu lipat rata agar mudah dibawa dan akurat saat ditimbang pengepul.",
    accepted: [
      "Kardus paket, boks karton belanja, dan kemasan kering",
      "Sudah dilipat rata tanpa plastik, styrofoam, atau busa",
      "Bebas minyak, jamur, dan noda basah",
    ],
    avoided: [
      "Kardus bekas makanan berminyak atau basah kehujanan",
      "Karton yang masih berisi kemasan plastik atau residu",
    ],
  },
] as const;

const depositOptions = [
  {
    id: "setor-langsung",
    title: "Setor langsung ke titik kumpul",
    description:
      "Bawa botol PET atau kardus yang sudah terpilah langsung ke bank sampah, titik setoran, atau pengepul mitra terdekat sesuai jadwal penerimaan.",
    points: [
      "Material diterima sesuai standar bersih dan kering",
      "Ditimbang bersama pengepul di titik kumpul",
      "Mendukung jadwal operasional bank sampah setempat",
    ],
    icon: MapPin,
  },
  {
    id: "jemput-rumah",
    title: "Ajukan penjemputan dari rumah",
    description:
      "Isi pengajuan jemput dengan jenis material, perkiraan berat (kg), wilayah, dan tanggal usulan agar masuk ke rute pengepul yang sudah berjalan.",
    points: [
      "Mencantumkan jenis material dan estimasi berat",
      "Menentukan wilayah serta tanggal usulan jemput",
      "Terhubung dengan rute pengangkutan mitra pengepul",
    ],
    icon: Truck,
  },
] as const;

const aiChecks = [
  {
    title: "Membaca jenis material",
    detail: "Membantu mengenali apakah material di foto sesuai pengajuan botol PET atau kardus.",
  },
  {
    title: "Membaca angka timbangan (OCR)",
    detail: "Membaca angka berat pada layar timbangan digital untuk dicocokkan dengan catatan transaksi.",
  },
  {
    title: "Memeriksa kualitas foto",
    detail: "Mengecek ketajaman, pencahayaan, dan apakah material serta layar timbang berada dalam satu foto.",
  },
  {
    title: "Menandai indikasi duplikasi",
    detail: "Mendeteksi apabila foto transaksi yang sama berulang kali diajukan kembali.",
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
  const maxSizeMb = Math.round(EVIDENCE_RULES.maxBytes / (1024 * 1024));

  return (
    <LayoutWrapper>
      <div className="bg-[#FAFDFB] text-[#0F3D2E] antialiased">
        {/* 1. Hero Section — Linear-faithful left-aligned header + app preview panel */}
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_-15%,rgba(29,158,117,0.09),rgba(250,253,251,0)_65%)] px-6 pb-8 pt-16 md:pt-24">
          <div className="mx-auto max-w-[1100px] text-left">
            <h1 className="max-w-[780px] text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D2E] sm:text-5xl md:text-[56px]">
              Dari sampah terpilah menjadi setoran yang tercatat
            </h1>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-[15px] font-normal leading-relaxed text-[#4D6D5B]">
                Panduan warga memilah PET dan kardus, mengecek kesiapan mandiri, dan menguji verifikasi foto Aksi Hijau.
              </p>
              <a
                href="#cek-kesiapan"
                className="inline-flex shrink-0 items-center gap-2 self-start text-sm transition-colors hover:opacity-80 sm:self-auto"
              >
                <span className="font-semibold text-[#0F3D2E]">Panduan</span>
                <span className="text-[#4D6D5B]">Pilah &amp; Setor</span>
                <span className="text-[#1D9E75]" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            {/* Linear-style Flat App Preview Panel */}
            <div className={`${styles.heroPerspectiveContainer} mt-12 md:mt-14`}>
              <div
                className={`${styles.heroPerspectiveCard} overflow-hidden rounded-xl border border-emerald-950/[0.1] bg-white text-left`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left App Workspace Sidebar */}
                  <aside
                    aria-label="Navigasi panduan edukasi"
                    className="hidden shrink-0 flex-col justify-between border-r border-emerald-950/[0.08] bg-[#FAFDFB]/80 p-3 md:flex md:w-[228px]"
                  >
                    <div>
                      <div className="flex items-center justify-between px-1.5 py-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#0F3D2E]">
                          <span
                            className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#0F3D2E] text-[9px] font-bold text-white"
                            aria-hidden="true"
                          >
                            B
                          </span>
                          <span>BONI Edu</span>
                          <svg viewBox="0 0 12 12" className="h-3 w-3 text-[#4D6D5B]" fill="none" aria-hidden="true">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#4D6D5B]/75">
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>

                      <div className="mt-4 space-y-0.5 text-[12px] text-[#4D6D5B]">
                        {journeyLinks.slice(0, 4).map((item, idx) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors ${
                              idx === 0
                                ? "bg-[#F0FAF4] font-medium text-[#0F3D2E]"
                                : "hover:bg-[#FAFDFB] hover:text-[#0F3D2E]"
                            }`}
                          >
                            <span className="truncate">{item.label}</span>
                            <span className="text-[11px] font-semibold tabular-nums text-[#1D9E75]">
                              {item.step}
                            </span>
                          </a>
                        ))}
                      </div>

                      <div className="mt-5 px-2 text-[11px] font-medium text-[#4D6D5B]/70">
                        Lanjutan
                      </div>
                      <div className="mt-1 space-y-0.5 text-[12px] text-[#4D6D5B]">
                        {journeyLinks.slice(4).map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-[#FAFDFB] hover:text-[#0F3D2E]"
                          >
                            <span className="truncate">{item.label}</span>
                            <span className="text-[11px] font-semibold tabular-nums text-[#1D9E75]">
                              {item.step}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </aside>

                  {/* Right Workspace Canvas */}
                  <div className="min-w-0 flex-1">
                    {/* Slim Top Breadcrumb Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-950/[0.07] px-5 py-2.5 text-[12px] text-[#4D6D5B]">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full border-2 border-[#1D9E75]"
                          aria-hidden="true"
                        />
                        <span className="font-medium tabular-nums text-[#4D6D5B]">BONI-01</span>
                        <span className="font-medium text-[#0F3D2E]">Panduan Perjalanan Warga</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] tabular-nums text-[#4D6D5B]">
                        <span>1 / 6</span>
                        <span className="hidden rounded-md border border-emerald-950/10 bg-[#FAFDFB] px-2 py-0.5 font-medium sm:inline-block">
                          Setor &amp; Timbang: Rancangan
                        </span>
                        <span className="rounded-md bg-[#F0FAF4] px-2 py-0.5 font-semibold text-[#0F3D2E]">
                          Aksi Hijau: Demo Aktif
                        </span>
                      </div>
                    </div>

                    {/* Inner 2-Column Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      <div className="p-6 sm:p-7 lg:col-span-8">
                        <h2 className="text-lg font-semibold tracking-tight text-[#0F3D2E]">
                          Standar pilah &amp; penimbangan material
                        </h2>
                        <p className="mt-2.5 text-[13px] leading-relaxed text-[#4D6D5B]">
                          Fokus pemilahan awal mencakup botol{" "}
                          <span className="rounded bg-[#F0FAF4] px-1.5 py-0.5 text-[12px] font-medium text-[#0F3D2E]">
                            PET kode 1
                          </span>{" "}
                          dan kardus kering agar langsung siap dicek lewat fitur{" "}
                          <span className="rounded bg-[#F0FAF4] px-1.5 py-0.5 text-[12px] font-medium text-[#0F3D2E]">
                            cek-kesiapan
                          </span>{" "}
                          sebelum ditimbang pengepul.
                        </p>

                        {/* Quick Material Cards inside Workspace */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          <a
                            href="#botol-pet"
                            className="group flex items-center justify-between gap-3 rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-4 transition-colors hover:border-[#1D9E75]/40 hover:bg-[#F0FAF4]/50"
                          >
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-wider tabular-nums text-[#1D9E75]">
                                Material 01 · Kode 1
                              </p>
                              <p className="mt-0.5 text-sm font-semibold text-[#0F3D2E]">
                                Botol Plastik PET
                              </p>
                              <p className="mt-0.5 text-xs text-[#4D6D5B]">
                                Kosong, tiriskan kering, pisah dari residu.
                              </p>
                            </div>
                            <ArrowRight
                              size={15}
                              className="shrink-0 text-[#4D6D5B] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0F3D2E]"
                              aria-hidden="true"
                            />
                          </a>

                          <a
                            href="#kardus"
                            className="group flex items-center justify-between gap-3 rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-4 transition-colors hover:border-[#1D9E75]/40 hover:bg-[#F0FAF4]/50"
                          >
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-wider tabular-nums text-[#1D9E75]">
                                Material 02 · Karton
                              </p>
                              <p className="mt-0.5 text-sm font-semibold text-[#0F3D2E]">
                                Kardus &amp; Karton
                              </p>
                              <p className="mt-0.5 text-xs text-[#4D6D5B]">
                                Bebas minyak, keluar plastik isi, lipat rata.
                              </p>
                            </div>
                            <ArrowRight
                              size={15}
                              className="shrink-0 text-[#4D6D5B] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0F3D2E]"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </div>

                      {/* Right Workspace Metadata Strip */}
                      <div className="flex flex-col justify-between gap-4 border-t border-emerald-950/[0.07] bg-[#FAFDFB]/50 p-5 text-xs lg:col-span-4 lg:border-l lg:border-t-0">
                        <div className="space-y-3">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#4D6D5B]/80">
                            Ringkasan Alur
                          </div>
                          <div className="space-y-2 text-[12px] text-[#4D6D5B]">
                            <div className="flex items-center justify-between">
                              <span>Material utama</span>
                              <span className="font-semibold text-[#0F3D2E]">PET &amp; Kardus</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Foto bukti</span>
                              <span className="font-semibold text-[#0F3D2E]">Material + Timbang</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Uji demo Warga</span>
                              <span className="font-semibold text-[#1D9E75]">Aksi Hijau Aktif</span>
                            </div>
                          </div>
                        </div>

                        <a
                          href="#cek-kesiapan"
                          className="flex items-center justify-between rounded-lg border border-emerald-950/10 bg-white px-3 py-2 text-xs font-medium text-[#0F3D2E] transition-colors hover:border-[#1D9E75]/40"
                        >
                          <span>Mulai Cek Kesiapan</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>

                    {/* Mobile horizontal jump pills inside preview */}
                    <nav
                      aria-label="Pintasan langkah mobile"
                      className="flex flex-wrap gap-1.5 border-t border-emerald-950/[0.07] p-4 md:hidden"
                    >
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

        {/* 2. Partner Logo Slots + Manifesto / Pengantar — max-w-[1100px] */}
        <section className="px-6 pt-14 pb-24 md:pt-16 md:pb-28">
          <div className="mx-auto max-w-[1100px]">
            {/* Partner Logo Strip — disiapkan untuk logo mitra kolaborasi resmi */}
            <div
              aria-label="Ruang logo mitra kolaborasi"
              className="flex flex-wrap items-center justify-center gap-x-7 gap-y-5 sm:justify-between lg:flex-nowrap"
            >
              {PARTNER_LOGO_SLOTS.map((partner) => (
                <div
                  key={partner.id}
                  className="inline-flex items-center gap-2 text-[#0F3D2E]/80 transition-opacity hover:text-[#0F3D2E]"
                >
                  {partner.logoSrc ? (
                    <Image
                      src={partner.logoSrc}
                      alt={partner.name}
                      width={120}
                      height={28}
                      className="h-6 w-auto object-contain"
                    />
                  ) : (
                    <>
                      <PartnerSlotGlyph variant={partner.variant} />
                      <span className="whitespace-nowrap text-[14px] font-semibold tracking-[-0.02em] sm:text-[15px]">
                        {partner.name}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 mb-14 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-[#4D6D5B]/75 sm:text-left">
              RUANG LOGO MITRA KOLABORASI · EKOSISTEM SURABAYA
            </p>

            <h2 className="mb-14 max-w-[780px] text-2xl font-normal leading-[1.2] tracking-[-0.025em] text-[#4D6D5B]/85 sm:text-[32px] md:text-[36px]">
              <span className="font-semibold text-[#0F3D2E]">
                Standar pilah jelas sejak dari rumah.
              </span>{" "}
              Tiga kebiasaan inti menjaga kualitas material saat ditimbang, sementara verifikasi
              Aksi Hijau sudah aktif diuji pada demo Warga.
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

        {/* 3. Section 01: Material PET & Kardus — Linear "Intake and integrations" showcase */}
        <section id="material-setoran" className="scroll-mt-24 border-t border-emerald-950/[0.06] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D2E] sm:text-4xl md:text-[44px]">
                  Material layak setor:<br />PET dan kardus
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#4D6D5B]">
                  Dua material utama yang direncanakan pada alur setoran BONI adalah botol plastik PET (kode 1) dan kardus. Tinjau kartu kriteria di bawah sebelum menjalankan checklist kesiapan.
                </p>
                <a
                  href="#cek-kesiapan"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4D6D5B] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Lanjut ke checklist kesiapan</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Foreground Floating Summary Card overlapping Multi-Column Criterion Board */}
            <div className="relative flex flex-col gap-6 lg:block">
              {/* Foreground Card — mirrors Linear Thread #product */}
              <div className="rounded-2xl border border-emerald-950/[0.1] bg-white p-5 shadow-[0_24px_56px_-16px_rgba(15,61,46,0.16)] lg:absolute lg:left-0 lg:top-6 lg:z-10 lg:w-[310px]">
                <div className="flex items-center justify-between border-b border-emerald-950/[0.07] pb-3 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-[#0F3D2E]">
                    <span
                      className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#F0FAF4] text-[11px] font-bold text-[#1D9E75]"
                      aria-hidden="true"
                    >
                      #
                    </span>
                    <span>Catatan Pilah</span>
                    <span className="font-normal text-[#4D6D5B]">pet-kardus</span>
                  </div>
                  <span className="text-[11px] font-medium tabular-nums text-[#4D6D5B]/75">
                    01
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0FAF4] text-[10px] font-bold tabular-nums text-[#0F3D2E]">
                      01
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-[#0F3D2E]">Botol PET</span>
                        <span className="text-[11px] text-[#4D6D5B]/80">Kode 1</span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#4D6D5B]">
                        Kosong, tiriskan sampai kering, dan pisahkan dari botol berlemak atau residu cairan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0FAF4] text-[10px] font-bold tabular-nums text-[#0F3D2E]">
                      02
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-[#0F3D2E]">Kardus &amp; Karton</span>
                        <span className="text-[11px] text-[#4D6D5B]/80">Lipat rata</span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#4D6D5B]">
                        Keluarkan plastik atau styrofoam dari dalam boks, jaga tetap kering sebelum ditimbang.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[10px] font-bold tabular-nums text-amber-800">
                      !
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-[#0F3D2E]">Hindari Mencampur</span>
                        <span className="text-[11px] text-[#4D6D5B]/80">Wadah terpisah</span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#4D6D5B]">
                        Sachet foil, kardus berminyak, atau sampah dapur dipisah agar nilai timbangan terjaga.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Criterion Board Frame — overlapping behind left card on lg */}
              <div className="overflow-hidden rounded-2xl border border-emerald-950/[0.08] bg-white p-4 shadow-[0_12px_28px_-12px_rgba(15,61,46,0.08)] sm:p-5 lg:ml-[185px] lg:pl-[148px]">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
                  {materialGuides.map(({ id, code, title, accepted, avoided }, index) => (
                    <article
                      id={id}
                      key={id}
                      className="scroll-mt-24 flex flex-col gap-2.5 lg:col-span-5"
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between px-1 pb-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full border-2 ${
                              index === 0 ? "border-[#1D9E75]" : "border-[#0F3D2E]"
                            }`}
                            aria-hidden="true"
                          />
                          <h3 className="font-semibold text-[#0F3D2E]">{title}</h3>
                          <span className="text-[11px] tabular-nums text-[#4D6D5B]/75">
                            {accepted.length + avoided.length}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1D9E75]">
                          {index === 0 ? "PET 01" : "KARDUS"}
                        </span>
                      </div>

                      {/* Criterion Issue Cards inside Column */}
                      <div className="space-y-2.5">
                        {accepted.map((item, itemIdx) => (
                          <div
                            key={item}
                            className="rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-3.5 transition-colors hover:border-[#1D9E75]/35"
                          >
                            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider tabular-nums text-[#4D6D5B]/80">
                              <span>
                                {index === 0 ? `PET-0${itemIdx + 1}` : `KRD-0${itemIdx + 1}`} ·{" "}
                                {code}
                              </span>
                            </div>
                            <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#0F3D2E]">
                              {item}
                            </p>
                            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#0F3D2E]">
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-[#1D9E75]"
                                aria-hidden="true"
                              />
                              <span>Layak disetor</span>
                            </div>
                          </div>
                        ))}

                        {avoided.map((item, itemIdx) => (
                          <div
                            key={item}
                            className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3.5"
                          >
                            <div className="text-[10px] font-semibold uppercase tracking-wider tabular-nums text-amber-800/80">
                              {index === 0 ? `PET-X${itemIdx + 1}` : `KRD-X${itemIdx + 1}`}
                            </div>
                            <p className="mt-1 text-xs font-medium leading-relaxed text-amber-950">
                              {item}
                            </p>
                            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-amber-900">
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-amber-600"
                                aria-hidden="true"
                              />
                              <span>Hindari mencampur</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}

                  {/* Subtle receding right-edge preview column matching Linear board */}
                  <div
                    aria-hidden="true"
                    className="hidden select-none flex-col gap-2.5 opacity-40 lg:col-span-2 lg:flex [mask-image:linear-gradient(to_right,black_10%,transparent_95%)]"
                  >
                    <div className="flex items-center gap-2 px-1 pb-1 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-[#1D9E75]" />
                      <span className="truncate font-semibold text-[#0F3D2E]">Checklist</span>
                    </div>
                    <div className="rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-3">
                      <div className="text-[10px] font-semibold text-[#4D6D5B]">CHK-01</div>
                      <p className="mt-1 truncate text-xs text-[#0F3D2E]">Botol kering</p>
                    </div>
                    <div className="rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-3">
                      <div className="text-[10px] font-semibold text-[#4D6D5B]">CHK-02</div>
                      <p className="mt-1 truncate text-xs text-[#0F3D2E]">Kardus rata</p>
                    </div>
                    <div className="rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-3">
                      <div className="text-[10px] font-semibold text-[#4D6D5B]">CHK-03</div>
                      <p className="mt-1 truncate text-xs text-[#0F3D2E]">Siap foto AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Section 02: Cek Kesiapan Mandiri Interaktif — Linear "Planning and monitoring" overlap */}
        <section className="border-t border-emerald-950/[0.06] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D2E] sm:text-4xl md:text-[44px]">
                  Cek kesiapan<br />sebelum setor
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#4D6D5B]">
                  Pilih jenis material di panel interaktif berikut untuk memastikan botol PET maupun kardus telah memenuhi tiga syarat pemilahan mandiri.
                </p>
                <a
                  href="#setor-atau-jemput"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4D6D5B] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Lanjut ke opsi setor</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <SortingReadinessCheck />
          </div>
        </section>

        {/* 5. Section 03: Setor atau Jemput — Linear "AI and automations" 4-window showcase */}
        <section id="setor-atau-jemput" className="scroll-mt-24 border-t border-emerald-950/[0.06] py-24 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D2E] sm:text-4xl md:text-[44px]">
                  Setor langsung atau<br />penjemputan rutin
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#4D6D5B]">
                  BONI terhubung dengan rute pengepul dan bank sampah yang sudah berjalan. Alur setor, jemput, dan penimbangan bersama pengepul saat ini masih dalam tahap rancangan pengembangan.
                </p>
                <a
                  href="#setelah-ditimbang"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4D6D5B] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Lihat syarat bukti timbang</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4-Window Horizontal Showcase matching Linear's AI & automations fanned cards */}
          <div className="mx-auto max-w-[1380px] overflow-hidden px-6 lg:px-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[0.42fr_1fr_1fr_0.42fr]">
              {/* Far-left receding peek card */}
              <div
                aria-hidden="true"
                className="hidden select-none flex-col justify-between rounded-2xl border border-emerald-950/[0.08] bg-white/80 p-5 opacity-45 lg:flex [mask-image:linear-gradient(to_right,transparent_5%,black_90%)]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-emerald-950/[0.07] pb-3 text-xs text-[#4D6D5B]">
                    <span className="truncate font-semibold text-[#0F3D2E]">Bank Sampah</span>
                    <span className="tracking-widest text-[10px]">— ×</span>
                  </div>
                  <div className="mt-4 rounded-xl border border-emerald-950/[0.07] bg-[#FAFDFB] p-3 text-xs text-[#4D6D5B]">
                    Jadwal penerimaan rutin titik kumpul warga sekitar
                  </div>
                </div>
                <div className="mt-4 space-y-2 border-t border-emerald-950/[0.06] pt-3 text-[11px] text-[#4D6D5B]">
                  <div className="truncate rounded-lg bg-[#FAFDFB] px-2.5 py-1.5">Titik kumpul RT/RW</div>
                  <div className="truncate rounded-lg bg-[#FAFDFB] px-2.5 py-1.5">Timbang awal</div>
                </div>
              </div>

              {/* Center pair: Setor langsung & Ajukan penjemputan */}
              {depositOptions.map(({ id, title, description, points, icon: Icon }, index) => (
                <article
                  key={id}
                  className="flex h-full flex-col justify-between rounded-2xl border border-emerald-950/[0.1] bg-white p-5 shadow-[0_18px_40px_-16px_rgba(15,61,46,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-6"
                >
                  <div>
                    {/* Minimal Linear-style window top chrome */}
                    <div className="flex items-center justify-between border-b border-emerald-950/[0.07] pb-3 text-xs">
                      <div className="flex min-w-0 items-center gap-2">
                        <Icon size={15} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
                        <h3 className="truncate text-sm font-semibold text-[#0F3D2E]">
                          {title}
                        </h3>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="rounded-md bg-[#F0FAF4] px-2 py-0.5 text-[10px] font-semibold text-[#0F3D2E]">
                          {index === 0 ? "Titik Kumpul" : "Rute Jemput"}
                        </span>
                        <span aria-hidden="true" className="hidden text-[10px] tracking-widest text-[#4D6D5B]/60 sm:inline">
                          — ×
                        </span>
                      </div>
                    </div>

                    {/* Recessed description/prompt card inside window */}
                    <div className="mt-4 rounded-xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-4">
                      <p className="text-xs leading-relaxed text-[#4D6D5B] sm:text-[13px]">
                        {description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#4D6D5B]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1D9E75]" aria-hidden="true" />
                      <span>
                        {index === 0 ? "Alur Setor Langsung" : "Alur Jemput Rumah"} · {points.length} poin
                      </span>
                    </div>
                  </div>

                  {/* Action issue-style rows */}
                  <ul className="mt-3 space-y-2 border-t border-emerald-950/[0.07] pt-3.5 text-xs text-[#3B5B49]">
                    {points.map((point, pointIdx) => (
                      <li
                        key={point}
                        className="flex items-center justify-between gap-2.5 rounded-lg border border-emerald-950/[0.05] bg-[#FAFDFB]/70 px-3 py-2"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="shrink-0 text-[10px] font-semibold tabular-nums text-[#4D6D5B]/75">
                            {index === 0 ? `STR-0${pointIdx + 1}` : `JPT-0${pointIdx + 1}`}
                          </span>
                          <span className="truncate font-medium text-[#0F3D2E]">{point}</span>
                        </div>
                        <Check size={13} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
                      </li>
                    ))}
                  </ul>
                </article>
              ))}

              {/* Far-right receding peek card */}
              <div
                aria-hidden="true"
                className="hidden select-none flex-col justify-between rounded-2xl border border-emerald-950/[0.08] bg-white/80 p-5 opacity-45 lg:flex [mask-image:linear-gradient(to_left,transparent_5%,black_90%)]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-emerald-950/[0.07] pb-3 text-xs text-[#4D6D5B]">
                    <span className="truncate font-semibold text-[#0F3D2E]">Timbang Digital</span>
                    <span className="tracking-widest text-[10px]">— ×</span>
                  </div>
                  <div className="mt-4 rounded-xl border border-emerald-950/[0.07] bg-[#FAFDFB] p-3 text-xs text-[#4D6D5B]">
                    Pencatatan berat aktual material bersih bersama pengepul
                  </div>
                </div>
                <div className="mt-4 space-y-2 border-t border-emerald-950/[0.06] pt-3 text-[11px] text-[#4D6D5B]">
                  <div className="truncate rounded-lg bg-[#FAFDFB] px-2.5 py-1.5">Cek fisik material</div>
                  <div className="truncate rounded-lg bg-[#FAFDFB] px-2.5 py-1.5">Foto + angka layar</div>
                </div>
              </div>
            </div>
          </div>

          {/* Collector Role Summary Card */}
          <div className="mx-auto mt-6 max-w-[1100px] px-6">
            <div className="rounded-2xl border border-emerald-950/[0.08] bg-white p-6 shadow-[0_12px_28px_-10px_rgba(15,61,46,0.06)]">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    <Scale size={14} aria-hidden="true" />
                    <span>Peran Pengepul di Lapangan</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[#0F3D2E] sm:text-xl">
                    Pengepul memeriksa material dan mencatat berat aktual
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#3B5B49] sm:text-sm">
                    <li className="flex items-start gap-2">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-[#0F3D2E]">Pemeriksaan fisik material:</strong>{" "}
                        memastikan botol PET atau kardus sesuai pengajuan serta bebas kontaminasi basah atau minyak.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-[#0F3D2E]">Pencatatan berat aktual:</strong>{" "}
                        menimbang menggunakan timbangan digital agar berat akhir tercatat objektif.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-950/[0.06] bg-[#FAFDFB] p-5 lg:col-span-5">
                  <p className="text-xs leading-relaxed text-[#4D6D5B]">
                    Formulir setoran dan Portal Pengepul masih dalam rancangan. Untuk menguji unggah foto dan pemeriksaan AI yang sudah berjalan, gunakan menu Aksi Hijau di demo Warga.
                  </p>
                  <Link
                    href="/dashboard/eco-action"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#18533F]"
                  >
                    <span>Coba Aksi Hijau</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Section 04: Setelah Ditimbang — Linear "Build, review, and ship" overlapping showcase */}
        <section id="setelah-ditimbang" className="scroll-mt-24 border-t border-emerald-950/[0.06] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D2E] sm:text-4xl md:text-[44px]">
                  Setelah ditimbang:<br />satu foto hingga verifikasi
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#4D6D5B]">
                  Saat penimbangan berlangsung, warga mengambil satu foto bukti yang memuat material terpilah sekaligus angka layar timbangan digital dalam satu bingkai.
                </p>
                <Link
                  href="/dashboard/eco-action"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4D6D5B] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Coba verifikasi Aksi Hijau</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Overlapping Queue + Camera Inspector Showcase matching Linear's Build/Review */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left/Background Verification Queue Panel */}
              <div className="order-2 rounded-2xl border border-emerald-950/[0.08] bg-white p-5 shadow-[0_12px_28px_-12px_rgba(15,61,46,0.06)] sm:p-6 lg:order-1 lg:col-start-1 lg:col-end-7 lg:row-start-1">
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-950/[0.07] pb-2.5 text-xs">
                      <span className="font-semibold text-[#0F3D2E]">
                        Pemeriksaan AI (Rancangan)
                      </span>
                      <span className="tabular-nums text-[11px] text-[#4D6D5B]">
                        {aiChecks.length}
                      </span>
                    </div>
                    <ul className="mt-2.5 space-y-2">
                      {aiChecks.map((check, idx) => (
                        <li
                          key={check.title}
                          className="flex items-center gap-2.5 rounded-lg border border-emerald-950/[0.05] bg-[#FAFDFB] px-3 py-2 text-xs"
                        >
                          <span className="shrink-0 text-[10px] font-semibold tabular-nums text-[#4D6D5B]/75">
                            AI-0{idx + 1}
                          </span>
                          <span
                            className="h-2 w-2 shrink-0 rounded-full border-2 border-[#1D9E75]"
                            aria-hidden="true"
                          />
                          <span className="truncate font-medium text-[#0F3D2E]">{check.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-950/[0.07] pb-2.5 text-xs">
                      <span className="font-semibold text-[#0F3D2E]">Status Jalur Uji</span>
                      <span className="tabular-nums text-[11px] text-[#4D6D5B]">2</span>
                    </div>
                    <ul className="mt-2.5 space-y-2 text-xs">
                      <li className="flex items-center justify-between rounded-lg border border-emerald-950/[0.05] bg-[#FAFDFB] px-3 py-2">
                        <span className="font-medium text-[#0F3D2E]">OCR Timbangan &amp; Setor</span>
                        <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#4D6D5B]">
                          Rancangan
                        </span>
                      </li>
                      <li className="flex items-center justify-between rounded-lg border border-emerald-950/[0.05] bg-[#F0FAF4]/70 px-3 py-2">
                        <span className="font-medium text-[#0F3D2E]">Verifikasi Aksi Hijau</span>
                        <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#1D9E75]">
                          Demo Aktif
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right/Foreground Elevated Camera Illustration Window */}
              <div className="order-1 relative z-10 overflow-hidden rounded-2xl border border-emerald-950/[0.1] bg-white shadow-[0_24px_56px_-16px_rgba(15,61,46,0.16)] lg:order-2 lg:col-start-5 lg:col-end-13 lg:row-start-1 lg:mt-10">
                <div className="flex items-center justify-between border-b border-emerald-950/[0.07] bg-[#FAFDFB] px-4 py-2.5 text-xs">
                  <div className="flex min-w-0 items-center gap-2 text-[#4D6D5B]">
                    <Camera size={14} className="shrink-0 text-[#1D9E75]" aria-hidden="true" />
                    <span className="truncate font-medium text-[#0F3D2E]">
                      kamera-bukti-boni / foto-timbangan-v1.jpg
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    Ilustrasi
                  </span>
                </div>

                <div className="border-b border-emerald-950/[0.07]">
                  <WeighingPhotoIllustration compact />
                </div>

                <div className="grid grid-cols-1 divide-y divide-emerald-950/[0.07] bg-[#FAFDFB]/60 text-xs sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  <div className="p-4">
                    <p className="font-semibold text-[#0F3D2E]">
                      1. Material terpilah terlihat jelas
                    </p>
                    <p className="mt-1 leading-relaxed text-[#4D6D5B]">
                      Botol PET atau kardus terlipat utuh tampak di atas platform timbangan.
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-[#0F3D2E]">
                      2. Angka timbang terbaca tajam
                    </p>
                    <p className="mt-1 leading-relaxed text-[#4D6D5B]">
                      Angka berat pada layar timbangan berada di frame yang sama tanpa bayangan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dual Comparison Cards aligned via #team pattern */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Card: Deposit Verification Design (Planned) */}
              <article className="flex h-full flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-white p-7 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] sm:p-8">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Rancangan Verifikasi Setoran
                  </span>
                  <h3 className="mt-2 text-xl font-extrabold text-[#0F3D2E]">
                    Rancangan Verifikasi BONI &amp; pemeriksaan manual
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                    Pada alur setoran yang sedang dirancang, AI membantu menyaring foto transaksi sebelum diverifikasi tim lapangan.
                  </p>

                  <dl className="mt-5 grid gap-3 border-t border-gray-100 pt-4 sm:grid-cols-2">
                    {aiChecks.map((check) => (
                      <div
                        key={check.title}
                        className="rounded-2xl border border-emerald-950/[0.06] bg-[#FAFDFB] p-3.5"
                      >
                        <dt className="text-xs font-bold text-[#0F3D2E]">{check.title}</dt>
                        <dd className="mt-1 text-xs leading-relaxed text-[#4D6D5B]">{check.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Inset Box matching #tantangan */}
                <div className="mt-5 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert size={16} className="mt-0.5 shrink-0 text-amber-800" aria-hidden="true" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-950">
                        Jika bukti meragukan
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-amber-900">
                        Transaksi tetap mengandalkan pemeriksaan fisik oleh pengepul dan peninjauan manual admin.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Right Card: Current Demo Status (Active Green Action AI) */}
              <article className="flex h-full flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-white p-7 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] sm:p-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    <Sparkles size={13} aria-hidden="true" />
                    <span>Status Demo Saat Ini</span>
                  </div>
                  <h3 className="mt-2 text-xl font-extrabold text-[#0F3D2E]">
                    Verifikasi Aksi Hijau sudah dapat dicoba di demo Warga
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                    Berbeda dari pengajuan setoran dan OCR timbangan yang masih dirancang, pemeriksaan foto lima kebiasaan hijau sudah berjalan di Portal Warga.
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-xs leading-relaxed text-[#3B5B49]">
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                      <span>
                        Alur setor, jemput, penimbangan, dan OCR timbangan tersimpan sebagai rancangan tahap lanjut.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="mt-0.5 shrink-0 text-[#1D9E75]" aria-hidden="true" />
                      <span>
                        Pemeriksaan foto berbantuan AI sudah aktif untuk diuji pada menu Aksi Hijau di demo Warga.
                      </span>
                    </li>
                  </ul>

                  {/* Inset Box matching #tantangan */}
                  <div className="mt-5 rounded-2xl border border-emerald-200/70 bg-[#FAFDFB] p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                      Rencana EcoPoints setoran
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#4D6D5B]">
                      Transaksi setoran PET atau kardus yang valid direncanakan menghasilkan EcoPoints untuk voucher UMKM, dengan konversi per kilogram ditetapkan bersama mitra.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4">
                  <Link
                    href="/dashboard/eco-action"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#18533F]"
                  >
                    <span>Coba Verifikasi Aksi Hijau</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/tentang#rencana-setoran"
                    className="text-xs font-bold text-[#0F3D2E] underline underline-offset-4 hover:text-[#1D9E75]"
                  >
                    Baca ringkasan rancangan
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 7. Section 05: Lima Kategori Aksi Hijau — #how-it-works light cards + full-width Evidence Rules */}
        <section id="aksi-hijau" className="scroll-mt-24 border-t border-emerald-950/[0.06] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D2E] sm:text-4xl md:text-[44px]">
                  Lima kategori<br />Aksi Hijau
                </h2>
              </div>
              <div className="space-y-4 md:col-span-6 md:col-start-7">
                <p className="max-w-lg text-[15px] leading-relaxed text-[#4D6D5B]">
                  Di luar rancangan setoran PET dan kardus, warga sudah bisa menguji pencatatan dan verifikasi foto lima kebiasaan hijau di Portal Warga.
                </p>
                <Link
                  href="/dashboard/eco-action"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4D6D5B] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>Coba verifikasi Aksi Hijau</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {GREEN_ACTION_LIST.map((action) => (
                <article
                  key={action.type}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-white p-7 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: action.color }}
                        aria-hidden="true"
                      />
                      <span className="rounded-full bg-[#F0FAF4] px-3 py-0.5 text-[11px] font-bold tabular-nums text-[#0F3D2E]">
                        +{action.ecoPoints} EcoPoints
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold leading-snug text-[#0F3D2E]">
                      {action.labelId}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                      {action.evidenceRequirement}
                    </p>
                  </div>

                  <div className="mt-6 space-y-1 border-t border-gray-100 pt-4 text-xs text-[#3B5B49]">
                    <p>
                      <span className="font-semibold text-[#0F3D2E]">Batas demo:</span> maks.{" "}
                      {action.dailyLimit}×/hari
                    </p>
                    <p>
                      <span className="font-semibold text-[#0F3D2E]">SDGs:</span>{" "}
                      {action.sdgs.map((g) => `SDG ${g}`).join(", ")}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Full-grid-width concise summary panel for shared Evidence Rules */}
            <div className="mt-5 rounded-3xl border border-emerald-950/[0.08] bg-white p-6 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Syarat Bukti Foto Aksi Hijau (Berlaku untuk Kelima Kategori)
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                Format JPEG/PNG/WebP maksimal {maxSizeMb} MB, resolusi minimal {EVIDENCE_RULES.minDimension}px, usia foto maksimal {EVIDENCE_RULES.maxEvidenceAgeHours} jam, jeda antar pengajuan {EVIDENCE_RULES.minIntervalSeconds} detik, serta pemeriksaan duplikasi hash SHA-256.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Section 06: Galeri Kegiatan — Linear "Changelog" horizontal dot-line timeline + 6 visual cards */}
        <section id="galeri" className="scroll-mt-24 border-t border-emerald-950/[0.06] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F3D2E] sm:text-4xl md:text-[44px]">
              Alur dokumentasi
            </h2>

            {/* Horizontal 4-milestone Linear Changelog Track */}
            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-2 right-4 top-2 hidden h-px bg-emerald-950/[0.1] md:block"
              />
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                {galleryItems.slice(0, 4).map((item, idx) => (
                  <div key={item.title} className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <span
                        className={`relative z-10 inline-flex h-4 w-4 items-center justify-center rounded-full ${
                          idx === 0
                            ? "bg-[#1D9E75]/20 ring-4 ring-[#FAFDFB]"
                            : "bg-emerald-950/[0.08] ring-4 ring-[#FAFDFB]"
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            idx === 0 ? "bg-[#1D9E75]" : "bg-[#4D6D5B]/70"
                          }`}
                        />
                      </span>
                      <div className="h-px flex-1 bg-emerald-950/[0.08] md:hidden" />
                    </div>

                    <h3 className="text-[14px] font-semibold leading-snug text-[#0F3D2E]">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#4D6D5B]">
                      {item.caption}
                    </p>
                    <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.1em] tabular-nums text-[#4D6D5B]/75">
                      {item.stage}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#galeri-kartu"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4D6D5B] transition-colors hover:text-[#0F3D2E]"
              >
                <span>Lihat 6 slot dokumentasi &amp; ilustrasi</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Detailed 6-Card Illustration Grid below */}
            <div
              id="galeri-kartu"
              className="mt-16 grid scroll-mt-24 grid-cols-1 gap-5 border-t border-emerald-950/[0.06] pt-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              {galleryItems.map((item) => (
                <figure
                  key={item.title}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-950/[0.08] bg-white shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`relative aspect-video w-full overflow-hidden border-b border-gray-100 ${
                      item.visual.kind === "image" && item.visual.fit === "contain"
                        ? "bg-white"
                        : "bg-[#FAFDFB]"
                    }`}
                  >
                    {item.visual.kind === "weighing-illustration" ? (
                      <WeighingPhotoIllustration compact />
                    ) : (
                      <Image
                        src={item.visual.src}
                        alt={item.visual.alt}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 360px"
                        className={
                          item.visual.fit === "contain" ? "object-contain p-3" : "object-cover"
                        }
                      />
                    )}
                  </div>

                  <figcaption className="flex flex-1 flex-col justify-between p-7">
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        {item.stage}
                      </span>
                      <h3 className="mt-2 text-lg font-extrabold leading-snug text-[#0F3D2E]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                        {item.caption}
                      </p>
                    </div>

                    <div className="mt-5 rounded-2xl border border-emerald-950/[0.06] bg-[#FAFDFB] p-4 text-xs leading-relaxed text-[#3B5B49]">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        {item.slotStatus}
                      </p>
                      <dl className="mt-2 space-y-1 border-t border-gray-200/70 pt-2">
                        <div className="flex flex-wrap gap-x-1">
                          <dt className="font-semibold text-[#0F3D2E]">Tanggal:</dt>
                          <dd>{item.dateSlot}</dd>
                        </div>
                        <div className="flex flex-wrap gap-x-1">
                          <dt className="font-semibold text-[#0F3D2E]">Lokasi:</dt>
                          <dd>{item.locationSlot}</dd>
                        </div>
                      </dl>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Final CTA — max-w-[700px] centered, 2 buttons */}
        <section className="relative overflow-hidden border-t border-emerald-950/[0.06] px-6 py-28 text-center md:py-40">
          <div className="mx-auto max-w-[700px] space-y-8">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#0F3D2E] sm:text-6xl">
              Pilah dari rumah.<br />Uji demo hari ini.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/dashboard/eco-action"
                className="rounded-lg bg-[#0F3D2E] px-5 py-2.5 text-xs font-medium text-white shadow-lg shadow-[#0F3D2E]/15 transition-all hover:bg-[#18533F]"
              >
                Coba verifikasi aksi
              </Link>
              <Link
                href="/#gateway"
                className="rounded-lg border border-emerald-950/15 bg-white px-5 py-2.5 text-xs font-medium text-[#0F3D2E] transition-all hover:bg-emerald-50/70"
              >
                Pilih portal demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
