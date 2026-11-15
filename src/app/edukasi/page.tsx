import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
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
import SortingReadinessCheck from "@/components/features/edukasi/SortingReadinessCheck";
import WeighingPhotoIllustration from "@/components/features/edukasi/WeighingPhotoIllustration";
import PublicContentPage from "@/components/layout/PublicContentPage";
import { EVIDENCE_RULES, GREEN_ACTION_LIST } from "@/config/green-actions";

export const metadata: Metadata = {
  title: "Edukasi Pilah Sampah, Alur Setoran & Aksi Hijau | BONI",
  description:
    "Panduan langkah demi langkah BONI: pilah botol PET dan kardus, cek kesiapan mandiri, setor atau jemput ke pengepul, foto bukti timbangan, verifikasi AI & manual, hingga katalog Aksi Hijau.",
};

const journeyLinks = [
  { href: "#material-setoran", step: "01", label: "Pilah PET & Kardus" },
  { href: "#cek-kesiapan", step: "02", label: "Cek Kesiapan Mandiri" },
  { href: "#setor-atau-jemput", step: "03", label: "Setor atau Jemput" },
  { href: "#setelah-ditimbang", step: "04", label: "Setelah Sampah Ditimbang" },
  { href: "#aksi-hijau", step: "05", label: "Aksi Hijau (Poin Demo)" },
  { href: "#galeri", step: "06", label: "Galeri Kegiatan" },
] as const;

const materialGuides = [
  {
    id: "botol-pet",
    code: "MATERIAL 01 · PET (KODE 1)",
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
    code: "MATERIAL 02 · KARTON",
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
    code: "PILIHAN A",
    title: "Setor langsung ke titik kumpul",
    description:
      "Bawa botol PET atau kardus yang sudah terpilah langsung ke bank sampah, titik setoran, atau pengepul mitra terdekat sesuai jadwal penerimaan.",
    icon: MapPin,
  },
  {
    code: "PILIHAN B",
    title: "Ajukan penjemputan dari rumah",
    description:
      "Isi pengajuan jemput dengan jenis material, perkiraan berat (kg), wilayah, dan tanggal usulan agar masuk ke rute pengepul yang sudah berjalan.",
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
  badge: string;
  photoSlotStatus: string;
  dateSlot: string;
  locationSlot: string;
  caption: string;
  visual:
    | { kind: "image"; src: string; alt: string; fit: "cover" | "contain" }
    | { kind: "weighing-illustration" };
};

const galleryItems: GalleryItem[] = [
  {
    stage: "URUTAN 01 · PILAH",
    title: "Pemilahan PET & kardus dari rumah",
    badge: "Ilustrasi berlabel · Slot foto asli",
    photoSlotStatus: "Slot foto kegiatan #1 — menunggu foto asli pemilahan warga",
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
    stage: "URUTAN 02 · TIMBANG",
    title: "Satu foto material + angka timbangan",
    badge: "Ilustrasi berlabel · Slot foto asli",
    photoSlotStatus: "Slot foto kegiatan #2 — menunggu foto asli di atas timbangan",
    dateSlot: "Belum diisi (Tanggal penimbangan)",
    locationSlot: "Belum diisi (Titik pengepul / lokasi jemput)",
    caption:
      "Contoh visual posisi material terpilah dan angka layar timbangan digital dalam satu bingkai foto transaksi.",
    visual: {
      kind: "weighing-illustration",
    },
  },
  {
    stage: "URUTAN 03 · VERIFIKASI",
    title: "Pemeriksaan bukti AI & peninjauan manual",
    badge: "Ilustrasi berlabel · Slot foto asli",
    photoSlotStatus: "Slot foto kegiatan #3 — menunggu tangkapan layar uji verifikasi",
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
    stage: "AKSI HIJAU · KEGIATAN",
    title: "Dokumentasi Aksi Hijau warga",
    badge: "Foto ilustrasi · Slot foto asli",
    photoSlotStatus: "Slot foto kegiatan #4 — menunggu foto dokumentasi aksi lapangan",
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
    stage: "RENCANA MANFAAT · UMKM",
    title: "Rencana insentif & mitra UMKM lokal",
    badge: "Ilustrasi berlabel · Slot foto asli",
    photoSlotStatus: "Slot foto kegiatan #5 — menunggu foto kerja sama mitra retail",
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
    stage: "PEMANTAUAN · WILAYAH",
    title: "Rekap partisipasi & peta dampak kota",
    badge: "Ilustrasi berlabel · Slot foto asli",
    photoSlotStatus: "Slot foto kegiatan #6 — menunggu dokumentasi sosialisasi wilayah",
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

function StepHeader({
  step,
  eyebrow,
  title,
  description,
  action,
}: {
  step: string;
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
          Langkah {step} · {eyebrow}
        </span>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0F3D2E] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#3B5B49] sm:text-base">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function NextStepCue({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-5 flex justify-end sm:hidden">
      <a
        href={href}
        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-[#0F3D2E] shadow-sm hover:bg-emerald-50"
      >
        <span>{label}</span>
        <ArrowDown size={13} aria-hidden="true" />
      </a>
    </div>
  );
}

function EdukasiIntro() {
  return (
    <div className="border-b border-emerald-100 bg-[#FAFDFB]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-[#0F3D2E]">
          Edukasi &amp; Panduan Perjalanan Warga BONI
        </span>

        <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-[#0F3D2E] sm:text-5xl">
          Dari sampah terpilah menjadi{" "}
          <span className="text-[#1D9E75]">setoran yang tercatat dan bernilai.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3B5B49] sm:text-base">
          Ikuti alur perjalanan warga BONI dari rumah hingga penimbangan: mulai dengan memilah{" "}
          <strong className="font-bold text-[#0F3D2E]">botol plastik PET (kode 1)</strong> dan{" "}
          <strong className="font-bold text-[#0F3D2E]">kardus</strong>, lalu ajukan setor atau jemput, dokumentasikan hasil timbang, dan pahami cara verifikasi hingga rencana EcoPoints.
        </p>

        {/* Titik masuk utama: panduan PET & kardus */}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href="#botol-pet"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-emerald-950/[0.08] bg-white p-4 shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50/40"
          >
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Titik Masuk Utama 01
              </span>
              <p className="mt-1 text-base font-black text-[#0F3D2E]">Panduan Botol PET (Kode 1)</p>
              <p className="mt-0.5 text-xs text-[#4D6D5B]">
                Kosongkan, tiriskan kering, dan pisahkan dari sampah basah.
              </p>
            </div>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0F3D2E] transition-colors group-hover:bg-[#0F3D2E] group-hover:text-white">
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </a>

          <a
            href="#kardus"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-emerald-950/[0.08] bg-white p-4 shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50/40"
          >
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Titik Masuk Utama 02
              </span>
              <p className="mt-1 text-base font-black text-[#0F3D2E]">Panduan Kardus &amp; Karton</p>
              <p className="mt-0.5 text-xs text-[#4D6D5B]">
                Pastikan kering tanpa minyak, keluarkan plastik isi, lalu lipat rata.
              </p>
            </div>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0F3D2E] transition-colors group-hover:bg-[#0F3D2E] group-hover:text-white">
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </a>
        </div>

        {/* Tautan lompat sesuai urutan perjalanan warga */}
        <nav aria-label="Navigasi perjalanan warga" className="mt-6">
          <p className="mb-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#3B5B49]">
            Urutan langkah di halaman ini
          </p>
          <ol className="flex flex-wrap gap-2 text-xs font-bold sm:text-sm">
            {journeyLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3.5 py-2 text-[#0F3D2E] transition-colors hover:border-emerald-400 hover:bg-emerald-50/70"
                >
                  <span className="font-mono text-[11px] text-emerald-700">{item.step}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default function EducationPage() {
  const maxSizeMb = Math.round(EVIDENCE_RULES.maxBytes / (1024 * 1024));

  return (
    <PublicContentPage
      title="Dari sampah terpilah menjadi setoran yang tercatat dan bernilai"
      description="Panduan warga BONI mulai dari memilah botol PET dan kardus di rumah, mengajukan setor atau jemput, menimbang, hingga memahami cara verifikasi dan rencana insentif."
      intro={<EdukasiIntro />}
    >
      {/* LANGKAH 01: Pilah dan Cek Kesiapan */}
      <section id="material-setoran" className="scroll-mt-24 space-y-6">
        <StepHeader
          step="01"
          eyebrow="Pilah dari Rumah"
          title="Kenali material layak setor: botol PET dan kardus"
          description="Dua material utama yang aktif pada alur setoran BONI adalah botol plastik PET (kode 1) dan kardus. Baca ringkasan kriteria di bawah, lalu uji kesiapanmu lewat checklist pemeriksaan mandiri."
        />

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {materialGuides.map(({ id, code, title, focus, accepted, avoided }) => (
            <article
              id={id}
              key={id}
              className="scroll-mt-24 flex h-full flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-white p-5 shadow-[0_4px_20px_-4px_rgba(15,61,46,0.05)] sm:p-7"
            >
              <div>
                <span className="inline-block rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-emerald-800">
                  {code}
                </span>
                <h3 className="mt-3 text-xl font-black text-[#0F3D2E]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4D6D5B]">{focus}</p>
              </div>

              <div className="mt-5 grid gap-3 border-t border-emerald-100 pt-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50/70 p-3.5">
                  <p className="text-xs font-bold text-[#0F3D2E]">Contoh layak disetor</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-[#3B5B49]">
                    {accepted.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <Check size={14} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-amber-50/70 p-3.5">
                  <p className="text-xs font-bold text-amber-950">Hindari mencampur</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-amber-900/90">
                    {avoided.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <X size={14} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Checklist interaktif pemeriksaan mandiri */}
        <SortingReadinessCheck />
      </section>

      {/* LANGKAH 03: Setor atau Jemput & Peran Pengepul */}
      <section id="setor-atau-jemput" className="scroll-mt-24">
        <StepHeader
          step="03"
          eyebrow="Pengumpulan & Penimbangan Awal"
          title="Pilih setor langsung atau jemput, lalu timbang bersama pengepul"
          description="BONI tidak menambah armada pengangkutan baru, melainkan terhubung dengan rute pengumpulan pengepul dan bank sampah yang sudah berjalan."
        />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {depositOptions.map(({ code, title, description, icon: Icon }) => (
            <article
              key={code}
              className="rounded-3xl border border-emerald-950/[0.08] bg-white p-5 shadow-[0_4px_20px_-4px_rgba(15,61,46,0.05)] sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#0F3D2E]">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    {code}
                  </span>
                  <h3 className="text-lg font-black text-[#0F3D2E]">{title}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4D6D5B]">{description}</p>
            </article>
          ))}
        </div>

        {/* Peran pengepul + tombol utama ke Dashboard Warga */}
        <div className="mt-5 rounded-3xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                <Scale size={13} aria-hidden="true" />
                Peran Pengepul di Lapangan
              </span>
              <h3 className="mt-3 text-xl font-black text-[#0F3D2E]">
                Pengepul memeriksa material dan mencatat berat aktual
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#3B5B49]">
                <li className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-[#0F3D2E]">Pemeriksaan fisik material:</strong>{" "}
                    pengepul memastikan botol PET atau kardus yang diserahkan sesuai pengajuan serta bebas kontaminasi basah atau minyak.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-[#0F3D2E]">Pencatatan berat aktual:</strong>{" "}
                    sampah ditimbang dengan timbangan digital agar berat akhir yang tercatat bukan sekadar perkiraan.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-emerald-950/[0.08] bg-white p-5">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                Status Alur Setoran &amp; Aksi Aktif
              </p>
              <p className="text-sm leading-relaxed text-[#3B5B49]">
                Formulir setoran &amp; Portal Pengepul ditunda sementara pada versi ini. Untuk mencoba unggah foto bukti dan verifikasi AI yang sudah aktif, gunakan menu Aksi Hijau di Portal Warga.
              </p>
              <Link
                href="/dashboard/eco-action"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#18533F]"
              >
                <span>Coba Bukti Foto di Aksi Hijau</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a
                href="#setelah-ditimbang"
                className="text-center text-xs font-bold text-emerald-800 underline underline-offset-4 hover:text-[#0F3D2E]"
              >
                Lihat syarat satu foto timbangan
              </a>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Catatan demo: apabila sesi warga belum masuk, tautan Aksi Hijau akan membuka halaman masuk demo terlebih dahulu.
              </p>
            </div>
          </div>
        </div>

        <NextStepCue href="#setelah-ditimbang" label="Lanjut ke Langkah 04: Setelah sampah ditimbang" />
      </section>

      {/* LANGKAH 04: Setelah Sampah Ditimbang */}
      <section id="setelah-ditimbang" className="scroll-mt-24 space-y-6">
        <StepHeader
          step="04"
          eyebrow="Bukti Foto, Verifikasi & Rencana Nilai"
          title="Setelah sampah ditimbang: satu foto bukti hingga verifikasi"
          description="Saat penimbangan berlangsung, warga mengambil satu foto yang memuat material sekaligus angka pada layar timbangan digital sebagai bukti transaksi."
        />

        {/* Visual Utama: 1 foto berisi material + angka layar timbangan sekaligus */}
        <div className="grid gap-6 rounded-3xl border border-emerald-950/[0.08] bg-white p-5 shadow-[0_8px_28px_-6px_rgba(15,61,46,0.06)] sm:p-7 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <WeighingPhotoIllustration />
          </div>

          <div className="space-y-4 lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              <Camera size={13} aria-hidden="true" />
              Syarat Satu Foto Bukti Transaksi
            </div>
            <h3 className="text-xl font-black text-[#0F3D2E]">
              Material dan angka layar timbangan terlihat dalam satu frame
            </h3>
            <p className="text-sm leading-relaxed text-[#4D6D5B]">
              Visual di samping merupakan <strong className="font-semibold text-[#0F3D2E]">ilustrasi berlabel</strong> sebagai acuan sebelum foto dokumentasi lapangan tersedia. Dalam satu bidikan foto, pastikan dua hal berikut tampak utuh:
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#0F3D2E] marker:font-bold marker:text-emerald-700">
              <li>
                <span className="font-semibold">Material terpilah terlihat jelas</span> di atas platform timbangan (botol PET atau kardus terlipat).
              </li>
              <li>
                <span className="font-semibold">Angka berat pada layar timbangan digital terbaca tajam</span> dan tidak terpotong atau tertutup bayangan.
              </li>
            </ol>
          </div>
        </div>

        {/* Rancangan Verifikasi AI + Pemeriksaan Fisik/Manual vs Status Demo & Rencana EcoPoints */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Kolom Kiri: Peran AI + Penanganan Bukti Meragukan */}
          <article className="flex flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-5 sm:p-7">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                <Sparkles size={13} aria-hidden="true" />
                Rancangan Verifikasi BONI
              </span>
              <h3 className="mt-3 text-xl font-black text-[#0F3D2E]">
                Peran AI dan pemeriksaan manual saat bukti meragukan
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3B5B49]">
                Dalam rancangan sistem BONI, AI membantu menyaring bukti foto transaksi melalui empat pemeriksaan berikut:
              </p>

              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {aiChecks.map((check) => (
                  <div
                    key={check.title}
                    className="rounded-2xl border border-emerald-950/[0.08] bg-white p-3.5"
                  >
                    <dt className="text-xs font-bold text-[#0F3D2E]">{check.title}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-[#4D6D5B]">{check.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
              <div className="flex items-start gap-2.5">
                <ShieldAlert size={18} className="mt-0.5 shrink-0 text-amber-800" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-950">
                    Jika bukti meragukan atau AI berisiko keliru
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-950/90 sm:text-sm">
                    Karena AI dapat salah membaca, foto berisiko dimanipulasi, atau kondisi material di lapangan beragam, verifikasi tidak berdiri sendiri: transaksi yang meragukan tetap mengandalkan{" "}
                    <strong className="font-semibold">pemeriksaan fisik oleh pengepul</strong> dan{" "}
                    <strong className="font-semibold">peninjauan manual oleh admin</strong>.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Kolom Kanan: Status Demo Saat Ini + Rencana EcoPoints Setoran */}
          <article className="flex flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-white p-5 shadow-[0_4px_20px_-4px_rgba(15,61,46,0.05)] sm:p-7">
            <div className="space-y-5">
              <div>
                <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Status Saat Ini · Mode Demo
                </span>
                <h3 className="mt-3 text-xl font-black text-[#0F3D2E]">
                  Fitur verifikasi yang aktif di demo sekarang
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4D6D5B]">
                  Pada versi demo saat ini, jalur yang aktif untuk diuji adalah <strong className="font-semibold text-[#0F3D2E]">Portal Warga</strong> dan <strong className="font-semibold text-[#0F3D2E]">Portal Pemkot</strong>:
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#3B5B49]">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span>
                      Simulasi pengajuan setoran, antrean Portal Pengepul, dan Pratinjau Admin ditunda sementara pada tahap demo ini dan disimpan sebagai rancangan lanjutan.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span>
                      Pembacaan angka timbangan otomatis (OCR) pada transaksi setoran masih berupa rancangan; untuk mencoba pemeriksaan bukti foto berbasis AI yang aktif saat ini, gunakan demo{" "}
                      <Link href="/dashboard/eco-action" className="font-bold text-emerald-800 underline underline-offset-4">
                        Verifikasi Aksi Hijau
                      </Link>.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 sm:p-5">
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                  Manfaat yang Direncanakan
                </p>
                <h4 className="mt-1 text-base font-black text-[#0F3D2E]">
                  EcoPoints setoran untuk transaksi yang valid
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#3B5B49] sm:text-sm">
                  Dalam rancangan BONI, setiap transaksi setoran PET atau kardus yang sudah{" "}
                  <strong className="font-semibold text-[#0F3D2E]">valid</strong> (material sesuai, berat tercatat, dan lolos pemeriksaan bukti) direncanakan menghasilkan{" "}
                  <strong className="font-semibold text-[#0F3D2E]">EcoPoints</strong> yang dapat ditukarkan menjadi contoh voucher di mitra UMKM lokal. Besaran konversi poin per kilogram masih perlu ditetapkan bersama pengelola dan mitra.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-emerald-100 pt-4 text-sm font-bold">
              <Link
                href="/dashboard/eco-action"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-white transition-colors hover:bg-[#18533F]"
              >
                <span>Coba Verifikasi Foto Aksi Hijau</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/tentang#rencana-setoran"
                className="text-xs font-bold text-emerald-800 underline underline-offset-4 hover:text-[#0F3D2E]"
              >
                Baca ringkasan rancangan setoran
              </Link>
            </div>
          </article>
        </div>

        <NextStepCue href="#aksi-hijau" label="Lanjut ke Langkah 05: Aksi Hijau & poin demo" />
      </section>

      {/* LANGKAH 05: Lima Kategori Aksi Hijau (Poin Demo Khusus Aksi Hijau) */}
      <section id="aksi-hijau" className="scroll-mt-24">
        <StepHeader
          step="05"
          eyebrow="Fitur Demo Tambahan · Di Luar Setoran PET & Kardus"
          title="Lima kategori Aksi Hijau & aturan poin demo"
          description="Selain alur setoran sampah terpilah, warga dapat mencoba pencatatan lima kebiasaan lingkungan pada fitur Aksi Hijau. Nilai poin dan batas harian di bawah ini berlaku khusus untuk mode demo Aksi Hijau, sedangkan aturan poin setoran botol PET dan kardus masih perlu ditetapkan."
          action={
            <Link
              href="/dashboard/eco-action"
              className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#18533F]"
            >
              <span>Coba Verifikasi Aksi Hijau</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GREEN_ACTION_LIST.map((action) => (
            <article
              key={action.type}
              className="flex flex-col justify-between rounded-2xl border border-emerald-950/[0.08] bg-white p-5 shadow-[0_4px_20px_-4px_rgba(15,61,46,0.04)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: action.color }}
                    aria-hidden="true"
                  />
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-800">
                    +{action.ecoPoints} EcoPoints (demo Aksi Hijau)
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#0F3D2E]">{action.labelId}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                  {action.evidenceRequirement}
                </p>
              </div>

              <div className="mt-4 space-y-1.5 border-t border-emerald-100 pt-3 text-xs text-slate-600">
                <p>
                  <span className="font-semibold text-[#0F3D2E]">Batas harian demo Aksi Hijau:</span>{" "}
                  maks. {action.dailyLimit}× per hari
                </p>
                <p>
                  <span className="font-semibold text-[#0F3D2E]">Kontribusi SDGs:</span>{" "}
                  {action.sdgs.map((g) => `SDG ${g}`).join(", ")}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-200/80 bg-[#FAFDFB] p-5">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800">
            Syarat Bukti Foto Aksi Hijau (Demo)
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
            Format JPEG/PNG/WebP maksimal {maxSizeMb} MB, resolusi minimal {EVIDENCE_RULES.minDimension}px, usia foto maksimal {EVIDENCE_RULES.maxEvidenceAgeHours} jam, jeda antar pengajuan {EVIDENCE_RULES.minIntervalSeconds} detik, serta pemeriksaan duplikasi hash SHA-256. Ketentuan ini merupakan aturan simulasi Aksi Hijau dan berbeda dari mekanisme penimbangan setoran PET/kardus.
          </p>
        </div>

        <NextStepCue href="#galeri" label="Lanjut ke Langkah 06: Galeri kegiatan" />
      </section>

      {/* LANGKAH 06: Galeri Pilah, Timbang, Verifikasi & Slot Foto Asli */}
      <section id="galeri" className="scroll-mt-24">
        <StepHeader
          step="06"
          eyebrow="Dokumentasi Visual"
          title="Galeri alur pilah, timbang, dan verifikasi"
          description="Rangkaian visual disusun mengikuti urutan kerja BONI dari memilah, menimbang, hingga verifikasi dan ekosistem manfaat. Label ilustrasi dipertahankan dan setiap kartu telah disiapkan slot tanggal, lokasi, serta keterangan untuk diisi foto kegiatan asli."
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <figure
              key={item.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-emerald-950/[0.08] bg-white shadow-[0_4px_20px_-4px_rgba(15,61,46,0.04)]"
            >
              <div
                className={`relative aspect-video w-full overflow-hidden ${
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

              <figcaption className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-md bg-[#0F3D2E] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                      {item.stage}
                    </span>
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-900">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-base font-bold text-[#0F3D2E]">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                    {item.caption}
                  </p>
                </div>

                {/* Slot terstruktur untuk foto kegiatan asli */}
                <div className="mt-4 rounded-xl border border-dashed border-emerald-200 bg-[#FAFDFB] p-3 text-[11px] leading-relaxed text-[#3B5B49]">
                  <p className="font-mono font-bold uppercase tracking-wider text-emerald-800">
                    {item.photoSlotStatus}
                  </p>
                  <dl className="mt-1.5 space-y-0.5">
                    <div className="flex flex-wrap gap-x-1">
                      <dt className="font-bold text-[#0F3D2E]">Tanggal:</dt>
                      <dd>{item.dateSlot}</dd>
                    </div>
                    <div className="flex flex-wrap gap-x-1">
                      <dt className="font-bold text-[#0F3D2E]">Lokasi:</dt>
                      <dd>{item.locationSlot}</dd>
                    </div>
                    <div className="flex flex-wrap gap-x-1">
                      <dt className="font-bold text-[#0F3D2E]">Keterangan:</dt>
                      <dd>Siap diisi catatan foto lapangan.</dd>
                    </div>
                  </dl>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Penutup & Tautan Lanjutan */}
      <div className="flex flex-col gap-4 rounded-3xl border border-emerald-950/[0.08] bg-[#FAFDFB] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-base font-black text-[#0F3D2E]">
            Siap mulai dari rumah dan mencoba demo BONI yang aktif?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
            Uji pemeriksaan foto AI di fitur Aksi Hijau, jelajahi katalog hadiah EcoPoints, atau buka Portal Pemkot melalui pilihan demo.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3 text-sm font-semibold">
          <Link
            href="/dashboard/eco-action"
            className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 font-bold text-white transition-colors hover:bg-[#18533F]"
          >
            <span>Coba Aksi Hijau</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-xs font-bold text-[#0F3D2E] transition-colors hover:bg-emerald-50"
          >
            Buka Dashboard Warga
          </Link>
          <Link
            href="/#gateway"
            className="text-xs font-bold text-emerald-800 underline underline-offset-4 hover:text-[#0F3D2E]"
          >
            Pilih portal demo
          </Link>
        </div>
      </div>
    </PublicContentPage>
  );
}
