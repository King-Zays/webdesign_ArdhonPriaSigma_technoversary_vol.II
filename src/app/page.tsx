import type { Metadata } from "next";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import {
  Hero,
  Problem,
  CaraKerjaDemo,
  BuiltForSurabaya,
  FinalCta,
} from "@/components/features/landing/LandingSections";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <LayoutWrapper>
      <Hero />
      <Problem />
      <CaraKerjaDemo />
      <BuiltForSurabaya />
      {/* DepositImpact dan nav pratinjau /pengepul + /admin dinonaktifkan sementara untuk fokus jalur demo Warga & Pemkot */}
      <FinalCta />
    </LayoutWrapper>
  );
}
