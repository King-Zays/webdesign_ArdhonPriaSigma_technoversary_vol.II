"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function hasScrollableParent(target: EventTarget | null): boolean {
  let el = target instanceof HTMLElement ? target : null;
  while (el && el !== document.body && el !== document.documentElement) {
    if (
      el.classList.contains("leaflet-container") ||
      el.getAttribute("role") === "dialog" ||
      el.tagName === "TEXTAREA" ||
      el.tagName === "SELECT"
    ) {
      return true;
    }
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight + 2) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId: number | null = null;
    let isAnimating = false;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const tick = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.4) {
        currentY = targetY;
        window.scrollTo({ top: currentY, behavior: "instant" as ScrollBehavior });
        isAnimating = false;
        rafId = null;
        return;
      }

      currentY += diff * 0.1;
      window.scrollTo({ top: currentY, behavior: "instant" as ScrollBehavior });
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey || e.defaultPrevented) return;
      if (hasScrollableParent(e.target)) return;

      e.preventDefault();

      // Normalisasi deltaY untuk mouse wheel (line/page) vs trackpad (pixel)
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 32;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      // Jika scroll sedang diam, sinkronkan posisi awal dengan scrollY aktual
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }

      targetY = Math.min(maxScroll(), Math.max(0, targetY + delta * 0.92));

      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onNativeScroll = () => {
      // Jika pengguna menyeret scrollbar atau klik anchor link, sinkronkan state
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onNativeScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}
