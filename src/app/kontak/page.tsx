import type { Metadata } from "next";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import ContactPageClient, { type FaqItem } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Kontak & FAQ | BONI",
  description: "Informasi kontak dan jawaban atas pertanyaan umum tentang demo BONI.",
};

const questions: FaqItem[] = [
  {
    question: "Apa yang bisa saya coba di BONI?",
    answer:
      "Demo warga menyediakan pencatatan Aksi Hijau, unggah bukti foto, EcoPoints, katalog hadiah, laporan titik sampah, dan peta dampak. Kamu dapat langsung mencoba Portal Warga maupun Portal Pemkot Surabaya.",
    links: [{ label: "Pilih portal demo", href: "/#gateway" }],
  },
  {
    question: "Bagaimana status fitur setor dan jemput oleh pengepul?",
    answer:
      "Untuk versi demo saat ini, pengajuan setor, penjemputan rutin, dan Portal Pengepul masih dalam rancangan pengembangan. Sambil menunggu alur penimbangan aktif, kamu tetap dapat mempelajari kriteria material dan menguji checklist kesiapan dari rumah.",
    links: [
      { label: "Buka panduan pilah", href: "/edukasi#material-setoran" },
      { label: "Cek kesiapan", href: "/edukasi#cek-kesiapan" },
    ],
  },
  {
    question: "Bagaimana BONI memeriksa bukti foto?",
    answer:
      "Verifikasi foto Aksi Hijau sudah berjalan di demo Warga menggunakan pemeriksaan AI dan validasi teknis foto (ukuran, resolusi, usia foto, dan duplikasi hash). Untuk foto timbangan transaksi PET dan kardus bersama pengepul, mekanismenya masih tersimpan sebagai rancangan.",
    links: [{ label: "Lihat syarat bukti foto", href: "/edukasi#aksi-hijau" }],
  },
  {
    question: "Apakah EcoPoints di demo dapat ditukar di toko?",
    answer:
      "Belum dapat ditukar secara nyata. EcoPoints, katalog hadiah, dan voucher mitra di demo ini seluruhnya memakai data simulasi.",
  },
];

export default function ContactPage() {
  return (
    <LayoutWrapper>
      <ContactPageClient questions={questions} />
    </LayoutWrapper>
  );
}
