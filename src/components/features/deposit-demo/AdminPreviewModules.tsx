import type { ReactNode } from "react";
import Link from "next/link";
import AdminDepositPreview from "@/components/features/deposit-demo/AdminDepositPreview";
import ProgramPreviewList from "@/components/features/program-preview/ProgramPreviewList";

const modules: { name: string; content: ReactNode }[] = [
  {
    name: "Pengelolaan Pengguna",
    content: <p>Contoh akun Warga Demo, Pengepul Demo, dan Pengelola Program. Rancangan daftar memuat nama akun contoh, peran, dan status akses.</p>,
  },
  {
    name: "Peran dan Hak Akses",
    content: <p>Rancangan peran. Warga melihat pengajuannya, pengepul menangani setoran yang ditugaskan, Pemkot melihat rekap program, dan admin mengelola konfigurasi.</p>,
  },
  {
    name: "Pengelolaan Transaksi",
    content: <AdminDepositPreview />,
  },
  {
    name: "Peninjauan Verifikasi",
    content: <AdminDepositPreview awaitingReview />,
  },
  {
    name: "Kategori Sampah",
    content: <p>Material demo yang tersedia untuk setoran adalah botol plastik PET dan kardus.</p>,
  },
  {
    name: "Konfigurasi EcoPoints",
    content: <p>Rancangan aturan poin berdasarkan jenis material dan berat aktual setelah setoran terverifikasi. Nilai konversi mengikuti keputusan tim.</p>,
  },
  {
    name: "Pengelolaan Hadiah",
    content: <p>Contoh konfigurasi hadiah mencakup judul voucher, biaya poin, stok, dan masa berlaku.</p>,
  },
  {
    name: "Pengelolaan Konten",
    content: (
      <ul className="space-y-2">
        <li><Link href="/edukasi" className="font-semibold text-emerald-800 underline">Panduan pilah</Link></li>
        <li><Link href="/edukasi#galeri" className="font-semibold text-emerald-800 underline">Galeri kegiatan</Link></li>
        <li><Link href="/kontak" className="font-semibold text-emerald-800 underline">Kontak dan FAQ</Link></li>
      </ul>
    ),
  },
  {
    name: "Pengelolaan Program",
    content: <ProgramPreviewList />,
  },
  {
    name: "Audit Log",
    content: <p>Contoh entri: Pengepul Demo menyimpan hasil timbang pada setoran contoh. Rancangan log memuat peran, waktu, tindakan, dan referensi setoran.</p>,
  },
];

/** Preserved prototype modules for Pratinjau Admin (currently disabled in /admin). */
export default function AdminPreviewModules() {
  return (
    <div className="grid items-start gap-4 md:grid-cols-2">
      {modules.map(({ name, content }) => (
        <details key={name} className="rounded-xl border border-emerald-100 bg-white p-5">
          <summary className="cursor-pointer font-bold text-[#0F3D2E]">{name}</summary>
          <div className="mt-3 border-t border-emerald-100 pt-3 text-sm leading-relaxed text-slate-700">
            {content}
          </div>
        </details>
      ))}
    </div>
  );
}
