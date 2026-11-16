import Image from "next/image";
import MeadowRiseFooter, {
  type MeadowColumn,
  type MeadowLink,
  type MeadowPaletteOverrides,
} from "@/components/ui/meadow-rise-footer";
import { siteConfig, teamConfig } from "@/config/site";

const FOOTER_COLUMNS: MeadowColumn[] = [
  {
    title: "Halaman Publik",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Tentang BONI", href: "/tentang" },
      { label: "Edukasi & Pilah", href: "/edukasi" },
      { label: "Kontak & FAQ", href: "/kontak" },
    ],
  },
  {
    title: "Fitur Warga",
    links: [
      { label: "Masuk Demo Warga", href: "/login?role=warga" },
      { label: "Verifikasi Aksi Hijau", href: "/dashboard/eco-action" },
      { label: "Bursa Diskon UMKM", href: "/dashboard/marketplace" },
      { label: "Peta 31 Kecamatan", href: "/dashboard/map" },
      { label: "Laporan Titik Sampah", href: "/dashboard/laporan-sampah" },
    ],
  },
  {
    title: "Pemerintah Kota",
    links: [
      { label: "Portal Pemkot (Demo)", href: "/gov/login" },
      { label: "Monitoring Wilayah", href: "/gov/dashboard" },
      { label: "Panduan Kolaborasi", href: "/kontak/kolaborasi" },
      { label: "Pusat Bantuan", href: "/kontak/bantuan" },
    ],
  },
];

const LEGAL_LINKS: MeadowLink[] = [
  { label: "Kota Surabaya, Jawa Timur", href: "/tentang" },
  { label: "Repositori GitHub", href: siteConfig.repositoryUrl },
];

const BONI_MEADOW_PALETTE: MeadowPaletteOverrides = {
  sky: ["#FAFDFB", "#ECF7F0"],
  haze: "#E3F2E9",
  glow: "#FFFBEF",
  hills: [
    ["#CFE3D7", "#B8D3C3"],
    ["#ADD0BC", "#90BA9F"],
    ["#7DB294", "#5D9676"],
    ["#468864", "#2F6B4B"],
    ["#265D3F", "#16412A"],
    ["#133924", "#0A2315"],
  ],
  ground: "#07170E",
  ink: "#0B3326",
  sub: "#174837",
  pill: "#FFFFFF",
  pillInk: "#0B3326",
  text: "#F3FAF6",
  muted: "#C4DDD0",
  line: "rgba(243, 250, 246, 0.18)",
};

export default function Footer() {
  return (
    <MeadowRiseFooter
      name={siteConfig.name}
      brandHref="/"
      logo={
        <Image
          src="/logo-white.png"
          alt="BONI"
          width={124}
          height={40}
          className="h-8 w-auto object-contain object-left transition-opacity duration-200 hover:opacity-90"
        />
      }
      showBrandName={false}
      heading={"Mulai aksi *hijau*\ndari rumah hari ini."}
      subheading="Pilah sampah dari rumah, verifikasi foto, dan tukar EcoPoints di UMKM Surabaya."
      cta={{ label: "Coba demo BONI", href: "/login?role=warga" }}
      tagline={`${siteConfig.fullName} · Kota Surabaya`}
      newsletter
      placeholder="Simulasi buletin warga (demo)"
      successMessage="Simulasi berhasil. Alamat email tidak dikirim ke server."
      columns={FOOTER_COLUMNS}
      socials={[]}
      copyright={`© 2026 ${siteConfig.name} · Tim ${teamConfig.teamName} (${teamConfig.institutionShort})`}
      legal={LEGAL_LINKS}
      preset="meadow"
      palette={BONI_MEADOW_PALETTE}
      seed={7}
      height="920px"
      heroHeight="clamp(440px, 60svh, 580px)"
      fontFamily="var(--font-jakarta), system-ui, sans-serif"
    />
  );
}
