import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "Bantuan | BONI",
  description:
    "Pusat bantuan BONI untuk pertanyaan fitur, kendala penggunaan, dan masukan warga.",
};

const SUPPORT_POINTS = [
  "Tanya tentang fitur BONI",
  "Laporkan kendala penggunaan",
  "Berikan masukan",
];

export default function BantuanPage() {
  return (
    <LayoutWrapper>
      <div className="bg-[#FAFDFB] text-[#0F3D2E] antialiased">
        <div className="mx-auto flex w-full max-w-[1160px] flex-grow items-center justify-center px-6 py-24 lg:py-32">
          <div className="grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-0">
            {/* Left Column: Information and Inquiries */}
            <section
              className="flex flex-col justify-start lg:border-r lg:border-emerald-950/[0.08] lg:pr-12"
              aria-labelledby="support-title"
            >
              <h1
                id="support-title"
                className="mb-8 text-[40px] font-semibold leading-tight tracking-tight text-[#0F3D2E]"
              >
                Hubungi bantuan BONI
              </h1>

              <ul className="mb-14 space-y-4 text-[14.5px] font-normal text-[#2D5542]">
                {SUPPORT_POINTS.map((point) => (
                  <li key={point} className="flex items-center space-x-3">
                    <span
                      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0F3D2E] text-white"
                      aria-hidden="true"
                    >
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-1.5 text-[13px] leading-relaxed text-[#4D6D5B]">
                <p>
                  Pertanyaan tentang kemitraan atau demo?{" "}
                  <Link
                    href="/kontak/kolaborasi"
                    className="rounded font-medium text-[#0F3D2E] underline-offset-2 decoration-[#1D9E75]/60 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
                  >
                    Hubungi tim kolaborasi
                  </Link>
                </p>
              </div>
            </section>

            {/* Right Column: Support Action Card */}
            <section
              className="flex flex-col lg:pl-12"
              aria-labelledby="support-card-heading"
            >
              <h2
                id="support-card-heading"
                className="mb-3 text-[13.5px] font-medium tracking-normal text-[#0F3D2E]"
              >
                Apa yang bisa kami bantu?
              </h2>
              <div className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border border-emerald-950/10 bg-white p-8 text-center">
                <p className="mb-4 max-w-[260px] text-[13.5px] font-normal leading-normal text-[#4D6D5B]">
                  Masuk ke akun BONI agar kami bisa membantumu lebih cepat.
                </p>
                <Link
                  href="/login?role=warga"
                  className="inline-flex items-center justify-center rounded-md border border-emerald-950/12 bg-[#F0FAF4] px-4 py-1.5 text-[13px] font-medium text-[#0F3D2E] transition-colors duration-150 hover:bg-[#E3F4E9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2"
                >
                  Masuk akun
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
