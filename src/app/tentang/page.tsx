import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AboutSection3 from "@/components/ui/about-section";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Tentang BONI",
  description:
    `${siteConfig.fullName}. Mengubah sampah terpilah dari rumah menjadi setoran tercatat bagi warga, pengepul, dan pengelola program di Surabaya.`,
};

const ecosystemRoles = [
  {
    badge: "Peran 01",
    name: "Warga",
    role: "Memilah botol PET dan kardus bersih sejak di rumah, lalu mengajukan setor langsung atau penjemputan serta memantau riwayat transaksinya.",
  },
  {
    badge: "Peran 02",
    name: "Pengepul & Bank Sampah",
    role: "Memeriksa kesesuaian material secara fisik dan mencatat berat aktual hasil timbangan digital pada rute pengumpulan yang sudah berjalan.",
  },
  {
    badge: "Peran 03",
    name: "Pengelola Program",
    role: "Meninjau rekapitulasi partisipasi wilayah secara agregat dan melakukan peninjauan manual bila terdapat bukti transaksi yang meragukan.",
  },
] as const;

const depositSteps = [
  {
    step: "01",
    status: "Aktif di demo",
    statusTone: "bg-emerald-50 text-emerald-800 border-emerald-200",
    title: "Pilah dari rumah",
    description:
      "Warga menyiapkan botol plastik PET (kode 1) dan kardus dalam kondisi kering serta bebas residu, lalu memeriksa kesiapan lewat panduan pilah.",
    actionLabel: "Buka panduan pilah",
    actionHref: "/edukasi",
  },
  {
    step: "02",
    status: "Tahap rancangan",
    statusTone: "bg-slate-100 text-slate-700 border-slate-200",
    title: "Setor atau jemput dan timbang",
    description:
      "Warga memilih setor langsung atau penjemputan, sementara mitra pengepul memeriksa material fisik dan mencatat berat aktual pada timbangan.",
    actionLabel: "Pelajari panduan setor & jemput",
    actionHref: "/edukasi#setor-atau-jemput",
  },
  {
    step: "03",
    status: "AI Aksi Hijau aktif · Setoran dirancang",
    statusTone: "bg-amber-50 text-amber-900 border-amber-200",
    title: "Catat bukti dan tinjau",
    description:
      "Satu foto memuat material sekaligus angka timbangan. Pemeriksaan foto berbasis AI sudah dapat diuji di Aksi Hijau, sedangkan OCR timbangan dan tinjauan admin sedang disiapkan.",
    actionLabel: "Coba verifikasi AI Aksi Hijau",
    actionHref: "/dashboard/eco-action",
  },
  {
    step: "04",
    status: "Aktif di Aksi Hijau · Setoran direncanakan",
    statusTone: "bg-slate-100 text-slate-700 border-slate-200",
    title: "Insentif untuk transaksi valid",
    description:
      "Transaksi setoran valid direncanakan menerima EcoPoints. Saat ini pengguna sudah bisa mencoba penukaran EcoPoints dan contoh voucher UMKM melalui fitur Aksi Hijau.",
    actionLabel: "Lihat hadiah & EcoPoints",
    actionHref: "/dashboard/marketplace",
  },
] as const;

const collaborationTracks = [
  {
    partner: "Komunitas & Warga Surabaya",
    status: "Terbuka untuk pendampingan",
    detail:
      "Mendampingi edukasi pemilahan botol PET dan kardus dari rumah tangga serta menguji alur pengajuan setoran.",
  },
  {
    partner: "Pengepul & Bank Sampah",
    status: "Terbuka untuk uji coba rute",
    detail:
      "Menyusun jadwal setor langsung maupun penjemputan tanpa armada baru dan menguji pencatatan berat aktual di titik setor.",
  },
  {
    partner: "Pengelola Program & Mitra UMKM",
    status: "Tahap penjajakan",
    detail:
      "Meninjau rekap agregat partisipasi kecamatan dan merumuskan skema insentif voucher untuk transaksi valid.",
  },
] as const;

export default function AboutPage() {
  return (
    <LayoutWrapper>
      {/* Pembuka (Komentar 1 — mempertahankan desain & tata letak AboutSection3) */}
      <AboutSection3 />

      {/* Konten Alur Cerita BONI (Komentar 2 — sejajar max-w-6xl dengan Pembuka) */}
      <div className="border-t border-emerald-950/[0.06] bg-[#FAFDFB] px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-16 sm:space-y-20">
          {/* 1. Masalah di rumah: Mulai dari rumah */}
          <section
            aria-labelledby="mulai-dari-rumah-title"
            className="rounded-3xl border border-emerald-950/[0.08] bg-white p-7 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] sm:p-9"
          >
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                  01 · Masalah di Rumah
                </span>
                <h2
                  id="mulai-dari-rumah-title"
                  className="mt-3 text-3xl font-black tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px] leading-snug sm:leading-tight lg:leading-[1.22]"
                >
                  Mulai dari rumah:{" "}
                  <span className="text-[#1D9E75]">pilah PET dan kardus</span> sejak awal
                </h2>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#2D5542] sm:text-base">
                  Ketika botol plastik dan kardus bercampur dengan sisa makanan atau sampah dapur yang basah, nilainya cepat rusak dan sulit dipilah kembali. Memulai dari dua material bernilai jelas ini memudahkan rumah tangga membangun kebiasaan memilah yang konsisten sebelum diperluas ke kategori lain.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-[#FAFDFB] p-5 lg:col-span-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Langkah Awal Warga
                </p>
                <p className="text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                  Pelajari syarat bersih-kering untuk botol PET (kode 1) dan kardus, lalu uji kesiapan melalui checklist mandiri.
                </p>
                <Link
                  href="/edukasi"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0F3D2E] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#18533F]"
                >
                  <span>Baca panduan pilah</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {/* 2. Siapa yang berperan */}
          <section aria-labelledby="peran-ekosistem-title">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                02 · Siapa yang Berperan
              </span>
              <h2
                id="peran-ekosistem-title"
                className="mt-3 text-3xl font-black tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px] leading-snug sm:leading-tight lg:leading-[1.22]"
              >
                Tiga peran utama{" "}
                <span className="text-[#1D9E75]">dalam ekosistem</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#2D5542] sm:text-base">
                BONI menghubungkan pemilahan warga dengan jaringan pengumpulan yang sudah ada tanpa menambah armada baru.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {ecosystemRoles.map(({ badge, name, role }) => (
                <article
                  key={name}
                  className="group flex flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-white p-7 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      {badge}
                    </span>
                    <h3 className="mt-2.5 text-xl font-extrabold text-[#0F3D2E]">{name}</h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                      {role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 3. Bagaimana setoran berjalan (#rencana-setoran) */}
          <section id="rencana-setoran" aria-labelledby="rencana-setoran-title" className="scroll-mt-24">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                03 · Bagaimana Setoran Berjalan
              </span>
              <h2
                id="rencana-setoran-title"
                className="mt-3 text-3xl font-black tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px] leading-snug sm:leading-tight lg:leading-[1.22]"
              >
                Rancangan alur setoran{" "}
                <span className="text-[#1D9E75]">empat tahap</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#2D5542] sm:text-base">
                Panduan edukasi dan demo <strong className="font-bold text-[#0F3D2E]">Warga serta Pemkot</strong> sudah dapat dicoba di peramban ini, sedangkan alur transaksi setoran ke pengepul, OCR timbangan, dan insentif setoran berada pada tahap <strong className="font-bold text-[#0F3D2E]">rancangan</strong>.
              </p>
            </div>

            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {depositSteps.map(
                ({ step, status, statusTone, title, description, actionLabel, actionHref }) => (
                  <li
                    key={step}
                    className="group flex flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-white p-7 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-700">
                          {step}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${statusTone}`}
                        >
                          {status}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-extrabold text-[#0F3D2E]">{title}</h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                        {description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <Link
                        href={actionHref}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
                      >
                        <span>{actionLabel}</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </li>
                )
              )}
            </ol>

            <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-emerald-950/[0.08] bg-white p-6 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] sm:p-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Jelajahi Fitur Demo yang Aktif
                </p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-[#2D5542] sm:text-sm">
                  Pada versi ini, jalur demo yang aktif adalah Portal Warga (Aksi Hijau AI, Laporan Sampah, dan Pusat Hadiah) serta Portal Pemkot, dilengkapi panduan pilah dan syarat timbangan di halaman Edukasi.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/edukasi"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#0F3D2E]/20 bg-white px-6 py-3 text-sm font-bold text-[#0F3D2E] shadow-sm transition-all hover:border-[#0F3D2E]/40 hover:bg-emerald-50/60"
                >
                  Buka panduan edukasi
                </Link>
                <Link
                  href="/#gateway"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0F3D2E]/20 transition-all hover:-translate-y-0.5 hover:bg-[#18533F] hover:shadow-xl active:scale-[0.98]"
                >
                  <span>Pilih portal demo</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {/* 4. Peluang kolaborasi & Kontak (#kolaborasi) */}
          <section id="kolaborasi" aria-labelledby="kolaborasi-title" className="scroll-mt-24">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full border border-emerald-900/10 bg-emerald-50 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]">
                04 · Peluang Kolaborasi
              </span>
              <h2
                id="kolaborasi-title"
                className="mt-3 text-3xl font-black tracking-tight text-[#0F3D2E] sm:text-4xl lg:text-[44px] leading-snug sm:leading-tight lg:leading-[1.22]"
              >
                Kolaborasi bertahap{" "}
                <span className="text-[#1D9E75]">sesuai peran</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#2D5542] sm:text-base">
                Status di bawah mencerminkan kesiapan uji coba prototipe saat ini—kemitraan operasional ditetapkan bertahap bersama pihak yang bersedia menguji di lapangan.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {collaborationTracks.map(({ partner, status, detail }) => (
                <article
                  key={partner}
                  className="flex flex-col justify-between rounded-3xl border border-emerald-950/[0.08] bg-white p-7 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)]"
                >
                  <div>
                    <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      {status}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold text-[#0F3D2E]">{partner}</h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                      {detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-emerald-950/[0.08] bg-white p-6 shadow-[0_12px_28px_-6px_rgba(15,61,46,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="max-w-2xl">
                <p className="text-base font-extrabold text-[#0F3D2E]">
                  Ingin berdiskusi tentang uji coba atau kerja sama lokal di Surabaya?
                </p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-[#2D5542] sm:text-sm">
                  Kirim pertanyaan atau usulan kolaborasi melalui halaman Kontak BONI.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0F3D2E]/20 transition-all hover:-translate-y-0.5 hover:bg-[#18533F] hover:shadow-xl active:scale-[0.98]"
                >
                  <span>Lihat informasi kontak</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </LayoutWrapper>
  );
}
