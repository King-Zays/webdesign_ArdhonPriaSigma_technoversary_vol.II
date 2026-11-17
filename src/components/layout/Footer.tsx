"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";
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
  const footerRef = useRef<HTMLDivElement>(null);
  const isFooterInView = useInView(footerRef, { amount: 0.12 });
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [expandTopBtn, setExpandTopBtn] = useState(false);

  useEffect(() => {
    if (!isFooterInView) {
      setShowTopBtn(false);
      setExpandTopBtn(false);
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowTopBtn(true);
      setExpandTopBtn(true);
      return;
    }
    const showTimer = setTimeout(() => setShowTopBtn(true), 1450);
    const expandTimer = setTimeout(() => setExpandTopBtn(true), 1950);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(expandTimer);
    };
  }, [isFooterInView]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTopAction = (
    <AnimatePresence>
      {showTopBtn && (
        <motion.button
          type="button"
          onClick={handleScrollTop}
          aria-label="Kembali ke atas halaman"
          title="Kembali ke atas"
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.92 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            gridTemplateColumns: expandTopBtn ? "16px 1fr" : "16px 0fr",
          }}
          className="group relative z-20 grid h-11 items-center overflow-hidden rounded-full border border-emerald-300/30 bg-[#0F3D2E] px-[13px] text-white shadow-[0_12px_28px_-8px_rgba(7,23,14,0.65)] transition-[grid-template-columns,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#1D9E75]"
        >
          <ArrowUp
            size={16}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
          />
          <span className="min-w-0 overflow-hidden">
            <span
              className={`block whitespace-nowrap pl-2 pr-0.5 text-xs font-bold tracking-tight transition-opacity duration-300 ${
                expandTopBtn ? "opacity-100 delay-100" : "opacity-0"
              }`}
            >
              Kembali ke atas
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );

  return (
    <div ref={footerRef} className="relative">
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
        bottomAction={scrollTopAction}
      />
    </div>
  );
}
