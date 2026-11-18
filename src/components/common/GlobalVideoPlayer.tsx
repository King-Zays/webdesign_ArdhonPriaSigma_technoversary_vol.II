"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";

interface VideoPlayerContextValue {
  isPlaying: boolean;
  startVideo: () => void;
  stopVideo: () => void;
  registerSlot: (el: HTMLDivElement | null) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

export function useVideoPlayer() {
  const ctx = useContext(VideoPlayerContext);
  if (!ctx) {
    throw new Error("useVideoPlayer must be used within VideoPlayerProvider");
  }
  return ctx;
}

export function VideoPlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [slotEl, setSlotEl] = useState<HTMLDivElement | null>(null);

  const startVideo = useCallback(() => setIsPlaying(true), []);
  const stopVideo = useCallback(() => setIsPlaying(false), []);
  const registerSlot = useCallback((el: HTMLDivElement | null) => {
    setSlotEl(el);
  }, []);

  return (
    <VideoPlayerContext.Provider value={{ isPlaying, startVideo, stopVideo, registerSlot }}>
      {children}
      <PersistentVideoPlayer isPlaying={isPlaying} slotEl={slotEl} onClose={stopVideo} />
    </VideoPlayerContext.Provider>
  );
}

const MORPH_TRANSITION =
  "top 450ms cubic-bezier(0.22, 1, 0.36, 1), left 450ms cubic-bezier(0.22, 1, 0.36, 1), width 450ms cubic-bezier(0.22, 1, 0.36, 1), height 450ms cubic-bezier(0.22, 1, 0.36, 1)";
const HEADER_HEIGHT = 44;

function getMiniplayerRect() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isSmall = vw < 640;
  const margin = isSmall ? 16 : 24;
  const width = isSmall ? Math.min(296, vw - margin * 2) : 360;
  const height = Math.round((width * 9) / 16) + HEADER_HEIGHT;
  return {
    left: vw - width - margin,
    top: vh - height - margin,
    width,
    height,
  };
}

function PersistentVideoPlayer({
  isPlaying,
  slotEl,
  onClose,
}: {
  isPlaying: boolean;
  slotEl: HTMLDivElement | null;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSlotInView, setIsSlotInView] = useState(true);
  const prevInlineRef = useRef<boolean | null>(null);

  // Pantau apakah section video sedang terlihat di viewport saat berada di /tentang
  useEffect(() => {
    if (!isPlaying || pathname !== "/tentang" || !slotEl) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSlotInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(slotEl);
    return () => observer.disconnect();
  }, [isPlaying, pathname, slotEl]);

  const isInlineOnTentang = pathname === "/tentang" && slotEl !== null && isSlotInView;

  useEffect(() => {
    const el = containerRef.current;
    if (!isPlaying || !el) {
      prevInlineRef.current = null;
      return;
    }

    const modeChanged = prevInlineRef.current !== null && prevInlineRef.current !== isInlineOnTentang;
    prevInlineRef.current = isInlineOnTentang;

    let morphTimer: ReturnType<typeof setTimeout> | null = null;
    if (modeChanged) {
      el.style.transition = MORPH_TRANSITION;
      morphTimer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
        }
      }, 460);
    } else {
      el.style.transition = "none";
    }

    let rafId = 0;

    const applyInlineRect = () => {
      if (!slotEl || !containerRef.current) return;
      const rect = slotEl.getBoundingClientRect();
      containerRef.current.style.top = `${rect.top}px`;
      containerRef.current.style.left = `${rect.left}px`;
      containerRef.current.style.width = `${rect.width}px`;
      containerRef.current.style.height = `${rect.height}px`;
    };

    const applyMiniRect = () => {
      if (!containerRef.current) return;
      const r = getMiniplayerRect();
      containerRef.current.style.top = `${r.top}px`;
      containerRef.current.style.left = `${r.left}px`;
      containerRef.current.style.width = `${r.width}px`;
      containerRef.current.style.height = `${r.height}px`;
    };

    const scheduleSync = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(isInlineOnTentang ? applyInlineRect : applyMiniRect);
    };

    if (isInlineOnTentang) {
      applyInlineRect();
      window.addEventListener("scroll", scheduleSync, { passive: true });
      window.addEventListener("resize", scheduleSync, { passive: true });

      const resizeObserver = new ResizeObserver(scheduleSync);
      if (slotEl) resizeObserver.observe(slotEl);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (morphTimer) clearTimeout(morphTimer);
        window.removeEventListener("scroll", scheduleSync);
        window.removeEventListener("resize", scheduleSync);
        resizeObserver.disconnect();
      };
    }

    applyMiniRect();
    window.addEventListener("resize", scheduleSync, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (morphTimer) clearTimeout(morphTimer);
      window.removeEventListener("resize", scheduleSync);
    };
  }, [isPlaying, isInlineOnTentang, slotEl]);

  if (!isPlaying) return null;

  const handleExpand = () => {
    if (pathname === "/tentang" && slotEl) {
      slotEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      router.push("/tentang#video-boni");
    }
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Pemutar video pengenalan ekosistem BONI"
      className={isInlineOnTentang ? "fixed z-30" : "fixed z-[60]"}
    >
      {/* Tab silang muncul dari belakang kanan video saat inline di /tentang */}
      {isInlineOnTentang && (
        <motion.button
          type="button"
          onClick={onClose}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Matikan video"
          title="Matikan video"
          className="absolute right-4 top-0 z-0 flex h-9 -translate-y-full items-center justify-center rounded-t-xl border border-b-0 border-emerald-900/15 bg-[#EAF4EE] px-3 text-[#0F3D2E] shadow-md transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] sm:left-full sm:right-auto sm:top-5 sm:h-11 sm:-ml-2 sm:translate-y-0 sm:rounded-l-none sm:rounded-r-2xl sm:border-b sm:border-l-0 sm:pl-4 sm:pr-3"
        >
          <X size={17} aria-hidden="true" />
        </motion.button>
      )}

      <div
        className={
          isInlineOnTentang
            ? "relative z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#0A2315] shadow-[0_32px_80px_-32px_rgba(15,61,46,0.28)]"
            : "relative z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#0A2315] shadow-[0_24px_60px_-15px_rgba(10,35,21,0.55)] ring-1 ring-white/15"
        }
      >
        {/* Header miniplayer saat scroll menjauh di /tentang atau pindah halaman */}
        {!isInlineOnTentang && (
          <div className="flex h-11 shrink-0 items-center justify-between gap-2 bg-[#0F3D2E] px-3 text-white">
            <span className="truncate text-xs font-semibold tracking-tight text-emerald-50">
              Gambaran Ekosistem BONI
            </span>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={handleExpand}
                aria-label="Perbesar dan kembali ke bagian video"
                title="Kembali ke bagian video"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-emerald-100 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
              >
                <Maximize2 size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup dan matikan video"
                title="Matikan video"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-emerald-100 transition-colors hover:bg-red-500/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 w-full">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/ZrTQqDXzVYQ?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3"
            title="Video Pengenalan Ekosistem BONI"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
