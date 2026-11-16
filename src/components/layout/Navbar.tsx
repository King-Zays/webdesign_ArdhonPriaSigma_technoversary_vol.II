"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";
import { PUBLIC_NAV } from "@/config/navigation";
import FloatingMenu from "@/components/ui/liquid-morph-floating-menu";

export default function Navbar() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { logoutMutation } = useAuth();

  const signedIn = hydrated && isAuthenticated;
  const mobileMenuItems = PUBLIC_NAV.map((link) => ({
    label: link.label,
    href: link.href,
    active:
      link.href === "/"
        ? pathname === "/"
        : pathname === link.href || pathname.startsWith(`${link.href}/`),
  }));

  return (
    <>
      {/* Header Korporat & Civic-Tech Elegan, Luas & Berkarakter */}
      <header className="sticky top-0 z-50 w-full border-b border-emerald-950/[0.07] bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(15,61,46,0.04)] transition-all">
        {/* Aksen Garis Atas Identitas Hijau Presisi */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700" />

        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8"
          aria-label="Navigasi Utama"
        >
          {/* Brand BONI */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-90 py-1"
            aria-label="Beranda BONI"
          >
            <Image
              src="/logo.png"
              alt="BONI"
              width={145}
              height={48}
              className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
              priority
            />
          </Link>

          {/* Menu Navigasi Tengah: Bersih, Renggang & Rapi (Tidak Numpuk) */}
          <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
            {PUBLIC_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-[#0F3D2E]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Aksi Kanan: Tombol Presisi Korporat & Tegas */}
          <div className="hidden items-center gap-3 lg:flex">
            {signedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="rounded-full border border-emerald-800/15 bg-emerald-50/80 px-4 py-2 text-xs font-bold text-[#0F3D2E] transition-all hover:bg-emerald-100/70"
                >
                  Portal Warga
                </Link>

                <button
                  type="button"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="rounded-full px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50/60 hover:text-[#0F3D2E]"
                >
                  <span>Masuk Akun</span>
                </Link>

                <Link
                  href="/#gateway"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-2.5 text-sm font-bold text-white shadow-sm shadow-[#0F3D2E]/20 transition-all hover:bg-[#18533F] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Eksplorasi Demo</span>
                  <ArrowRight size={14} />
                </Link>
              </>
            )}
          </div>

          {/* Menu Morph Liquid Mobile (Tetap di Kanan Atas) */}
          <div className="lg:hidden">
            <FloatingMenu
              placement="top-right"
              items={mobileMenuItems}
              closedWidth={108}
              closedHeight={42}
              openWidth={276}
              openHeight={368}
              footer={(close) => (
                <div className="flex flex-col gap-2">
                  {signedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={close}
                        className="rounded-full bg-[#1D9E75] py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-[#17825F]"
                      >
                        Buka Portal Warga
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          close();
                          logoutMutation.mutate();
                        }}
                        disabled={logoutMutation.isPending}
                        className="rounded-full border border-white/25 py-2.5 text-center text-xs font-bold text-rose-200 transition-colors hover:bg-white/10 disabled:opacity-50"
                      >
                        Keluar Akun
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/#gateway"
                        onClick={close}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1D9E75] py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-[#17825F]"
                      >
                        <span>Eksplorasi Demo</span>
                        <ArrowRight size={13} />
                      </Link>
                      <Link
                        href="/login"
                        onClick={close}
                        className="rounded-full border border-white/25 py-2.5 text-center text-xs font-bold text-[#F5FAF7] transition-colors hover:bg-white/10"
                      >
                        Masuk Akun
                      </Link>
                    </>
                  )}
                </div>
              )}
            />
          </div>
        </nav>
      </header>
    </>
  );
}
