"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FaqItem } from "./ContactPageClient";

const AUTO_SCROLL_MS = 4500;

/**
 * Carousel horizontal bergaya etalase dua-kartu terpusat dengan kartu tepi
 * mengintip (peeking) dan pudar lembut di kiri/kanan, mengikuti pola
 * GreenActionsCarousel pada halaman Edukasi.
 */
export default function FaqCarousel({ questions }: { questions: FaqItem[] }) {
  const maxDesktopStart = Math.max(0, questions.length - 2);
  // Mulai dari indeks 1 saat item >= 4 agar kartu 02 & 03 berada di tengah
  // sementara kartu 01 dan 04 mengintip di sisi kiri & kanan.
  const [desktopStart, setDesktopStart] = useState(
    questions.length >= 4 ? 1 : 0,
  );
  const [mobileIndex, setMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const autoPlaying =
    isInView && !reduceMotion && !isHovered && !hasFocus &&
    questions.length > 1;

  useEffect(() => {
    if (!autoPlaying) return;

    const timer = window.setTimeout(() => {
      setDesktopStart((index) => (index + 1) % (maxDesktopStart + 1));
      setMobileIndex((index) => (index + 1) % questions.length);
    }, AUTO_SCROLL_MS);

    return () => window.clearTimeout(timer);
  }, [
    desktopStart,
    mobileIndex,
    autoPlaying,
    maxDesktopStart,
    questions.length,
  ]);

  const canPrevDesktop = desktopStart > 0;
  const canNextDesktop = desktopStart < maxDesktopStart;

  function renderIndicator(
    index: number,
    active: boolean,
    label: string,
    onClick: () => void,
  ) {
    return (
      <button
        key={index}
        type="button"
        onClick={onClick}
        aria-label={label}
        aria-pressed={active}
        className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] focus-visible:ring-offset-2 ${
          active
            ? "w-8 bg-[#0F3D2E]/15"
            : "w-2 bg-emerald-950/20 hover:scale-125 hover:bg-[#1D9E75]/60"
        }`}
      >
        {active && (
          <motion.span
            key={autoPlaying ? `playing-${desktopStart}-${mobileIndex}` : "idle"}
            aria-hidden="true"
            initial={{ scaleX: reduceMotion ? 1 : 0 }}
            animate={{ scaleX: reduceMotion ? 1 : autoPlaying ? 1 : 0.35 }}
            transition={{ duration: reduceMotion ? 0 : autoPlaying ? AUTO_SCROLL_MS / 1000 : 0.2, ease: "linear" }}
            className="block h-full w-full origin-left rounded-full bg-[#1D9E75]"
          />
        )}
      </button>
    );
  }

  function handleDesktopCardClick(index: number) {
    if (index < desktopStart) {
      setDesktopStart(index);
    } else if (index > desktopStart + 1) {
      setDesktopStart(Math.min(maxDesktopStart, index - 1));
    }
  }

  function handleDesktopKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft" && canPrevDesktop) {
      event.preventDefault();
      setDesktopStart((prev) => Math.max(0, prev - 1));
    } else if (event.key === "ArrowRight" && canNextDesktop) {
      event.preventDefault();
      setDesktopStart((prev) => Math.min(maxDesktopStart, prev + 1));
    }
  }

  function renderCardBody(item: FaqItem, index: number) {
    const numberLabel = String(index + 1).padStart(2, "0");
    return (
      <>
        <div>
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex min-w-0 items-start gap-2">
              <span
                className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.dotColor ?? "#1D9E75" }}
                aria-hidden="true"
              />
              <h3 className="text-base font-extrabold leading-snug text-[#0F3D2E]">
                {item.question}
              </h3>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#F0FAF4] px-2.5 py-0.5 text-[10.5px] font-bold tabular-nums text-[#0F3D2E]">
              {item.tag ?? `FAQ ${numberLabel}`}
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-emerald-950/[0.08] bg-[#F6FAF8] p-4">
            <p className="text-sm leading-relaxed text-[#2D4F3E]">
              {item.answer}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-emerald-950/[0.06] pt-3 text-xs">
          <span className="shrink-0 text-[11px] font-semibold text-[#4D6D5B]">
            Topik {numberLabel}
          </span>

          {item.links && item.links.length > 0 ? (
            <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
              {item.links.map((linkItem) => (
                <Link
                  key={linkItem.href}
                  href={linkItem.href}
                  onClick={(e) => e.stopPropagation()}
                  className="group/link inline-flex items-center gap-1 font-bold text-[#1D9E75] transition-colors hover:text-[#0F3D2E]"
                >
                  <span>{linkItem.label}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <span className="text-[11px] font-medium text-[#4D6D5B]">
              Informasi demo
            </span>
          )}
        </div>
      </>
    );
  }

  return (
    <div
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
    >
      {/* Desktop & Tablet Horizontal Vignette Stage (md 768px+) */}
      <div className="hidden md:block">
        <div
          className="relative [--card-w:300px] lg:[--card-w:370px]"
          role="region"
          aria-label="Daftar pertanyaan umum BONI"
          tabIndex={0}
          onKeyDown={handleDesktopKeyDown}
        >
          {/* Centered two-card anchor slot + peeking edges */}
          <div className="overflow-x-clip pb-11 pt-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] xl:[mask-image:linear-gradient(to_right,transparent,black_17%,black_83%,transparent)]">
            <div className="mx-auto w-[calc(var(--card-w)*2+20px)]">
              <div
                className="flex items-stretch gap-5 transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{
                  transform: `translateX(calc(${-desktopStart} * (var(--card-w) + 20px)))`,
                }}
              >
                {questions.map((item, index) => {
                  const isCentered =
                    index === desktopStart || index === desktopStart + 1;
                  return (
                    <article
                      key={item.question}
                      onClick={() => handleDesktopCardClick(index)}
                      className={`flex w-[var(--card-w)] shrink-0 flex-col justify-between rounded-2xl border p-6 transition-all duration-300 motion-reduce:transition-none ${
                        isCentered
                          ? "border-emerald-950/[0.12] bg-white shadow-[0_16px_36px_-18px_rgba(15,61,46,0.2)]"
                          : "translate-y-3 scale-[0.96] cursor-pointer border-emerald-950/[0.08] bg-white/80 opacity-45 hover:opacity-75"
                      }`}
                    >
                      {renderCardBody(item, index)}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Edge navigation arrows */}
          <button
            type="button"
            onClick={() => setDesktopStart((prev) => Math.max(0, prev - 1))}
            disabled={!canPrevDesktop}
            aria-label="Geser pertanyaan umum ke kiri"
            className="absolute left-3 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.1] bg-white/95 text-[#0F3D2E] shadow-sm transition-all hover:scale-105 hover:bg-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() =>
              setDesktopStart((prev) => Math.min(maxDesktopStart, prev + 1))
            }
            disabled={!canNextDesktop}
            aria-label="Geser pertanyaan umum ke kanan"
            className="absolute right-3 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/[0.1] bg-white/95 text-[#0F3D2E] shadow-sm transition-all hover:scale-105 hover:bg-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Indicator dots below stage */}
        <div className="flex items-center justify-center gap-2">
          {questions.length > 2 && Array.from({ length: maxDesktopStart + 1 }, (_, idx) =>
            renderIndicator(
              idx,
              desktopStart === idx,
              `Tampilkan pertanyaan ${idx + 1} dan ${idx + 2}`,
              () => setDesktopStart(idx),
            )
          )}
        </div>
      </div>

      {/* Mobile Compact Carousel (< 768px) */}
      <div className="mx-auto max-w-xl px-4 md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {questions.map((item, idx) => (
              <div key={item.question} className="w-full shrink-0 px-0.5">
                <article className="flex h-full flex-col justify-between rounded-2xl border border-emerald-950/[0.12] bg-white p-5">
                  {renderCardBody(item, idx)}
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileIndex((prev) => Math.max(0, prev - 1))}
            disabled={mobileIndex === 0}
            aria-label="Pertanyaan sebelumnya"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-[#0F3D2E] disabled:opacity-40"
          >
            <ChevronLeft size={15} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {questions.length > 1 && questions.map((_, idx) =>
              renderIndicator(
                idx,
                mobileIndex === idx,
                `Pilih pertanyaan ${idx + 1}`,
                () => setMobileIndex(idx),
              )
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileIndex((prev) => Math.min(questions.length - 1, prev + 1))
            }
            disabled={mobileIndex === questions.length - 1}
            aria-label="Pertanyaan berikutnya"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-[#0F3D2E] disabled:opacity-40"
          >
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
