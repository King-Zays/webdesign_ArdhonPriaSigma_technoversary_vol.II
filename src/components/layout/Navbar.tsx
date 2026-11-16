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
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

const RESIZABLE_NAV_ITEMS = PUBLIC_NAV.map((item) => ({
  name: item.label,
  link: item.href,
}));

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
      {/* Desktop Navigation: Resizable Floating Pill Navbar */}
      <ResizableNavbar className="hidden lg:block">
        <NavBody>
          <NavbarLogo />
          <NavItems items={RESIZABLE_NAV_ITEMS} />

          <div className="relative z-20 flex shrink-0 items-center gap-2 whitespace-nowrap">
            {signedIn ? (
              <>
                <NavbarButton
                  as={Link}
                  href="/dashboard"
                  variant="secondary"
                  className="border border-emerald-800/15 bg-emerald-50/80 px-4 py-2 text-xs font-bold text-[#0F3D2E]"
                >
                  Portal Warga
                </NavbarButton>
                <button
                  type="button"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="rounded-full px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <NavbarButton as={Link} href="/login" variant="secondary">
                  Masuk Akun
                </NavbarButton>
                <NavbarButton as={Link} href="/#gateway" variant="primary">
                  <span>Eksplorasi Demo</span>
                  <ArrowRight size={14} />
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>
      </ResizableNavbar>

      {/* Mobile Navigation: Liquid Morph Floating Menu */}
      <header className="sticky top-0 z-50 w-full border-b border-emerald-950/[0.07] bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(15,61,46,0.04)] lg:hidden">
        <div className="h-[2.5px] w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700" />
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6"
          aria-label="Navigasi Mobile"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center py-1 transition-opacity hover:opacity-90"
            aria-label="Beranda BONI"
          >
            <Image
              src="/logo.png"
              alt="BONI"
              width={145}
              height={48}
              className="h-10 w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:h-11"
              priority
            />
          </Link>

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
        </nav>
      </header>
    </>
  );
}
