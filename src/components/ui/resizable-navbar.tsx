"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SMOOTH_SPRING = {
  type: "spring" as const,
  stiffness: 240,
  damping: 32,
  mass: 0.85,
};

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  // Hysteresis kecil (40px vs 64px) agar tidak berkedip saat berhenti tepat di ambang scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible((prev) => {
      if (!prev && latest > 64) return true;
      if (prev && latest < 40) return false;
      return prev;
    });
  });

  return (
    <header
      ref={ref}
      className={cn(
        "pointer-events-none sticky inset-x-0 top-0 z-50 w-full",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </header>
  );
};

export const NavBody = ({ children, className, visible = false }: NavBodyProps) => {
  return (
    <motion.div
      initial={false}
      animate={{
        width: visible ? "82%" : "100%",
        maxWidth: visible ? "980px" : "2400px",
        y: visible ? 14 : 0,
        borderRadius: visible ? 9999 : 0,
        paddingTop: visible ? 10 : 16,
        paddingBottom: visible ? 10 : 16,
        paddingLeft: visible ? 22 : 32,
        paddingRight: visible ? 22 : 32,
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.92)"
          : "rgba(255, 255, 255, 0.95)",
        boxShadow: visible
          ? "0 0 0 1px rgba(15, 61, 46, 0.10), 0 16px 40px -10px rgba(15, 61, 46, 0.12), 0 4px 12px -2px rgba(15, 61, 46, 0.06)"
          : "0 1px 0 0 rgba(15, 61, 46, 0.08), 0 4px 20px -4px rgba(15, 61, 46, 0.03)",
      }}
      transition={SMOOTH_SPRING}
      style={{
        minWidth: "760px",
      }}
      className={cn(
        "pointer-events-auto relative z-[60] mx-auto hidden w-full overflow-hidden backdrop-blur-md lg:block",
        className
      )}
    >
      {/* Garis aksen hijau atas yang memudar halus tanpa menggeser tinggi layout */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: visible ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-row items-center justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-semibold text-neutral-600 lg:flex",
        className
      )}
    >
      {items.map((item, idx) => {
        const isActive =
          item.link === "/"
            ? pathname === "/"
            : item.link !== "#" && pathname?.startsWith(item.link);
        const showPill = hovered === idx || (hovered === null && isActive);

        return (
          <Link
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative rounded-full px-4 py-2 transition-colors",
              isActive
                ? "font-bold text-[#0F3D2E]"
                : "text-neutral-600 hover:text-[#0F3D2E]"
            )}
            key={`link-${idx}`}
            href={item.link}
          >
            {showPill && (
              <motion.div
                layoutId="hovered"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="absolute inset-0 h-full w-full rounded-full bg-emerald-50/95"
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible = false }: MobileNavProps) => {
  return (
    <motion.div
      initial={false}
      animate={{
        width: visible ? "92%" : "100%",
        y: visible ? 10 : 0,
        borderRadius: visible ? 20 : 0,
        paddingTop: visible ? 10 : 12,
        paddingBottom: visible ? 10 : 12,
        paddingLeft: visible ? 14 : 18,
        paddingRight: visible ? 14 : 18,
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.94)"
          : "rgba(255, 255, 255, 0.96)",
        boxShadow: visible
          ? "0 0 0 1px rgba(15, 61, 46, 0.10), 0 14px 34px -8px rgba(15, 61, 46, 0.12)"
          : "0 1px 0 0 rgba(15, 61, 46, 0.08)",
      }}
      transition={SMOOTH_SPRING}
      className={cn(
        "pointer-events-auto relative z-50 mx-auto flex w-full flex-col items-center justify-between backdrop-blur-md lg:hidden",
        className
      )}
    >
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: visible ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700"
      />
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl border border-emerald-950/10 bg-white px-5 py-6 shadow-[0_20px_50px_-12px_rgba(15,61,46,0.18)]",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Tutup menu" : "Buka menu"}
      aria-expanded={isOpen}
      className="rounded-xl border border-gray-200 p-2 text-[#0F3D2E] transition-colors hover:bg-emerald-50/60"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      aria-label="Beranda BONI"
      className="relative z-20 mr-4 flex shrink-0 items-center py-0.5 transition-opacity hover:opacity-90"
    >
      <Image
        src="/logo.png"
        alt="BONI"
        width={135}
        height={44}
        className="h-9 w-auto object-contain sm:h-10"
        priority
      />
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center gap-1.5 text-center";

  const variantStyles = {
    primary:
      "bg-[#0F3D2E] text-white hover:bg-[#18533F] shadow-sm shadow-[#0F3D2E]/20",
    secondary:
      "bg-transparent text-gray-700 hover:bg-emerald-50/70 hover:text-[#0F3D2E] shadow-none",
    dark: "bg-[#081C11] text-white hover:bg-[#0F3D2E] shadow-sm",
    gradient:
      "bg-gradient-to-b from-[#1D9E75] to-[#0F3D2E] text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.25)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
