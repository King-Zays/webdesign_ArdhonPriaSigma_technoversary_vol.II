"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export interface FloatingMenuItem {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface FloatingMenuProps {
  items?: readonly FloatingMenuItem[];
  placement?: "top-right" | "bottom-center";
  closedWidth?: number;
  closedHeight?: number;
  openWidth?: number;
  openHeight?: number;
  className?: string;
  footer?: (close: () => void) => ReactNode;
}

function KineticChars({
  label,
  hovered,
}: {
  label: string;
  hovered: boolean;
}) {
  const chars = label.split("");

  return (
    <span className="flex items-center justify-center">
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block overflow-hidden"
          style={{ height: "1.1em" }}
        >
          <span
            className="flex flex-col"
            style={{
              transitionProperty: "transform",
              transitionDuration: hovered ? "700ms" : "0ms",
              transitionDelay: hovered ? `${24 * i}ms` : "0ms",
              transform: hovered ? "translateY(-50%)" : "translateY(0%)",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span className="block" style={{ height: "1.1em", lineHeight: "1.1em" }}>
              {char === " " ? "\u00A0" : char}
            </span>
            <span
              className="block text-[#6EE7B7]"
              style={{ height: "1.1em", lineHeight: "1.1em" }}
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

function MenuButton({
  item,
  isOpen,
  index,
  onSelect,
}: {
  item: FloatingMenuItem;
  isOpen: boolean;
  index: number;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const animatingRef = useRef(false);
  const pendingLeaveRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockDuration = 24 * item.label.length + 280;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleEnter = useCallback(() => {
    pendingLeaveRef.current = false;
    if (hovered) return;
    setHovered(true);
    animatingRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      animatingRef.current = false;
      if (pendingLeaveRef.current) {
        pendingLeaveRef.current = false;
        setHovered(false);
      }
    }, lockDuration);
  }, [hovered, lockDuration]);

  const handleLeave = useCallback(() => {
    if (animatingRef.current) {
      pendingLeaveRef.current = true;
    } else {
      setHovered(false);
    }
  }, []);

  const handleClick = () => {
    item.onClick?.();
    onSelect();
  };

  const sharedClassName = [
    "group relative flex w-full items-center justify-center overflow-hidden rounded-xl px-3 py-1.5 text-[21px] font-bold tracking-[-0.02em] transition-colors",
    item.active ? "text-[#6EE7B7]" : "text-[#F5FAF7]",
  ].join(" ");

  return (
    <motion.div
      className="w-full"
      initial={false}
      animate={{
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : -6,
      }}
      transition={{
        duration: 0.35,
        delay: isOpen ? 0.28 + 0.06 * index : 0,
        ease,
      }}
    >
      {item.href ? (
        <Link
          href={item.href}
          onClick={handleClick}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          tabIndex={isOpen ? 0 : -1}
          className={sharedClassName}
        >
          <KineticChars label={item.label} hovered={hovered} />
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          tabIndex={isOpen ? 0 : -1}
          className={sharedClassName}
        >
          <KineticChars label={item.label} hovered={hovered} />
        </button>
      )}
    </motion.div>
  );
}

export default function FloatingMenu({
  items,
  placement = "top-right",
  closedWidth = 112,
  closedHeight = 42,
  openWidth = 280,
  openHeight,
  className = "",
  footer,
}: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems: readonly FloatingMenuItem[] = items ?? [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/tentang" },
    { label: "Edukasi", href: "/edukasi" },
    { label: "Kontak", href: "/kontak" },
  ];

  const resolvedOpenHeight =
    openHeight ?? (footer ? 378 : Math.max(250, 96 + menuItems.length * 48));
  const isTopRight = placement === "top-right";

  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const wrapperClass = isTopRight
    ? `relative shrink-0 ${className}`
    : `fixed bottom-10 left-1/2 z-[100] -translate-x-1/2 ${className}`;

  const morphTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : {
        duration: 0.72,
        ease,
        height: { duration: isOpen ? 0.72 : 0.24, ease },
        scale: { duration: 0.22, ease },
      };

  const toggleBar = (
    <motion.button
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Tutup menu" : "Buka menu"}
      className="relative z-10 flex w-full shrink-0 cursor-pointer items-center justify-between px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
      animate={{
        height: closedHeight,
        paddingLeft: isOpen ? 20 : 16,
        paddingRight: isOpen ? 20 : 16,
      }}
      transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.55, ease }}
    >
      <motion.span
        className="text-sm font-bold leading-none tracking-[-0.01em]"
        animate={{ color: isOpen ? "#F5FAF7" : "#0F3D2E" }}
        transition={{ duration: 0.28, ease }}
      >
        Menu
      </motion.span>

      <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden="true">
        <motion.span
          className="absolute block h-[2px] w-[17px] rounded-full"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -3.2,
            backgroundColor: isOpen ? "#F5FAF7" : "#0F3D2E",
          }}
          transition={{ duration: 0.36, ease }}
        />
        <motion.span
          className="absolute block h-[2px] w-[17px] rounded-full"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 3.2,
            backgroundColor: isOpen ? "#F5FAF7" : "#0F3D2E",
          }}
          transition={{ duration: 0.36, ease }}
        />
      </span>
    </motion.button>
  );

  const itemsBlock = (
    <nav
      aria-label="Menu Navigasi Mobile"
      aria-hidden={!isOpen}
      className={[
        "relative z-10 flex flex-1 flex-col justify-between px-5 pb-5 pt-2 transition-[opacity] duration-200",
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none",
      ].join(" ")}
      style={{
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
        {menuItems.map((item, idx) => (
          <MenuButton
            key={item.label}
            item={item}
            isOpen={isOpen}
            index={idx}
            onSelect={() => setIsOpen(false)}
          />
        ))}
      </div>

      {footer && (
        <motion.div
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 8,
          }}
          transition={{
            duration: 0.35,
            delay: isOpen ? 0.36 : 0,
            ease,
          }}
          className="mt-3 border-t border-white/15 pt-3.5"
        >
          {footer(() => setIsOpen(false))}
        </motion.div>
      )}
    </nav>
  );

  return (
    <div
      ref={containerRef}
      className={wrapperClass}
      style={
        isTopRight
          ? { width: closedWidth, height: closedHeight }
          : undefined
      }
    >
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="morph-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[45] bg-[#0F3D2E]/20 backdrop-blur-[2px] lg:hidden"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>,
          document.body,
        )}

      <motion.div
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-label={isOpen ? "Menu" : undefined}
        className={[
          "flex flex-col overflow-hidden font-sans",
          isTopRight ? "absolute right-0 top-0 z-[80]" : "relative z-[80]",
          isOpen
            ? "shadow-[0_24px_60px_-14px_rgba(15,61,46,0.45)]"
            : "shadow-[0_4px_14px_-4px_rgba(15,61,46,0.16)]",
        ].join(" ")}
        style={{
          maxWidth: isTopRight ? "calc(100vw - 2.5rem)" : "calc(100vw - 2rem)",
          flexDirection: isTopRight ? "column" : "column-reverse",
        }}
        initial={shouldReduceMotion ? false : { opacity: 0, y: isTopRight ? -8 : 16 }}
        animate={{
          opacity: 1,
          y: 0,
          width: isOpen ? openWidth : closedWidth,
          height: isOpen ? resolvedOpenHeight : closedHeight,
          borderRadius: isOpen ? 28 : 999,
          scale: 1,
        }}
        whileHover={isOpen || shouldReduceMotion ? undefined : { scale: 1.03 }}
        transition={morphTransition}
      >
        {/* Soft Mint Base Pill Layer (visible when closed) */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            backgroundColor: isOpen ? "#0F3D2E" : "#E8F6EE",
            borderColor: isOpen ? "#1D9E75" : "#9AD8BA",
          }}
          transition={{ duration: isOpen ? 0.15 : 0.3, ease }}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: "inherit",
          }}
        />

        {/* Liquid Morph Circle expanding from toggle edge */}
        <motion.div
          className="pointer-events-none absolute left-1/2 rounded-full bg-[#0F3D2E]"
          style={{
            width: "215%",
            height: "215%",
            x: "-50%",
          }}
          animate={
            isTopRight
              ? { top: isOpen ? "-18%" : "-225%" }
              : { bottom: isOpen ? "-18%" : "-225%" }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.01 }
              : {
                  duration: 0.78,
                  ease,
                  delay: isOpen ? 0.08 : 0,
                }
          }
        />

        {toggleBar}
        {itemsBlock}
      </motion.div>
    </div>
  );
}
