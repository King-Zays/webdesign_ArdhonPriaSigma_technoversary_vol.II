import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import CollabForm from "./CollabForm";

export const metadata: Metadata = {
  title: "Kolaborasi | BONI",
  description:
    "Diskusikan peluang kolaborasi bank sampah, UMKM, kampus, atau komunitas bersama tim BONI.",
};

const COLLAB_BENEFITS = [
  "Jelajahi demo BONI",
  "Diskusikan kebutuhan komunitas",
  "Bahas peluang kolaborasi",
];

export default function KolaborasiPage() {
  return (
    <LayoutWrapper>
      <div className="flex flex-1 items-center bg-[#FAFDFB] py-16 text-[#0F3D2E] antialiased lg:py-24">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading and Value Propositions */}
          <div className="pt-1 lg:col-span-5">
            <h1 className="mb-8 text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-[#0F3D2E] sm:text-4xl xl:text-[38px]">
              Kolaborasi dengan BONI
            </h1>

            <div className="mb-9 space-y-4 text-[15px]">
              {COLLAB_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <span
                    className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#0F3D2E] text-white"
                    aria-hidden="true"
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="font-normal text-[#2D5542]">{benefit}</span>
                </div>
              ))}
            </div>

            <p className="text-[13px] text-[#4D6D5B]">
              Punya pertanyaan teknis?{" "}
              <Link
                href="/kontak#faq"
                className="font-medium text-[#0F3D2E] underline-offset-4 decoration-[#1D9E75]/60 hover:underline"
              >
                Buka bantuan &amp; FAQ
              </Link>
            </p>
          </div>

          {/* Right Column: Compact Open Form matching linear.app/contact/sales */}
          <div className="w-full max-w-[560px] lg:col-span-7 lg:ml-auto">
            <h2 id="collab-form-heading" className="mb-6 text-sm font-medium text-[#2D5542]">
              Sampaikan kebutuhanmu
            </h2>
            <CollabForm />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
