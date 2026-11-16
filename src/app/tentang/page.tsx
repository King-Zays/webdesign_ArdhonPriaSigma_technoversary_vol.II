import type { Metadata } from "next";
import AboutSection3 from "@/components/ui/about-section";
import AboutSections from "@/components/features/tentang/AboutSections";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Tentang BONI",
  description:
    `${siteConfig.fullName}. Menghubungkan pemilahan warga dari rumah, verifikasi aksi hijau berbantuan AI, voucher UMKM lokal, dan pemantauan 31 kecamatan di Surabaya.`,
};

export default function AboutPage() {
  return (
    <LayoutWrapper>
      <AboutSection3 />
      <AboutSections />
    </LayoutWrapper>
  );
}
