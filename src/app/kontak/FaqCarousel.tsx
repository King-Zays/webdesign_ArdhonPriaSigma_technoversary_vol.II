"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FaqItem } from "./ContactPageClient";

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

  const canPrevDesktop = desktopStart > 0;
  const canNextDesktop = desktopStart < maxDesktopStart;

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
              <h3 className="text-[14px] font-bold leading-snug text-[#0F3D2E]">
                {item.question}
              </h3>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#F0FAF4] px-2.5 py-0.5 text-[10.5px] font-bold tabular-nums text-[#0F3D2E]">
              {item.tag ?? `FAQ ${numberLabel}`}
            </span>
          </div>

          <div className="mt-3.5 rounded-xl border border-emerald-950/[0.06] bg-[#FAFDFB] p-3.5">
            <p className="text-xs leading-relaxed text-[#2D4F3E]">
              {item.answer}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-emerald-950/[0.06] pt-3 text-xs">
          <span className="font-mono text-[11px] font-semibold text-[#4D6D5B]">
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
    <div>
      {/* Desktop & Tablet Horizontal Vignette Stage (md 768px+) */}
      <div className="hidden md:block">
        <div
          className="relative overflow-hidden py-3 [--card-w:300px] lg:[--card-w:328px]"
          role="region"
          aria-label="Daftar pertanyaan umum BONI"
          tabIndex={0}
          onKeyDown={handleDesktopKeyDown}
        >
          {/* Centered two-card anchor slot + peeking edges */}
          <div className="mx-auto w-[calc(var(--card-w)*2+16px)]">
            <div
              className="flex items-stretch gap-4 transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{
                transform: `translateX(calc(${-desktopStart} * (var(--card-w) + 16px)))`,
              }}
            >
              {questions.map((item, index) => {
                const isCentered =
                  index === desktopStart || index === desktopStart + 1;
                return (
                  <article
                    key={item.question}
                    onClick={() => handleDesktopCardClick(index)}
                    className={`flex w-[var(--card-w)] shrink-0 flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-300 ${
                      isCentered
                        ? "border-emerald-950/[0.12] opacity-100 shadow-[0_14px_32px_-12px_rgba(15,61,46,0.12)]"
                        : "cursor-pointer border-emerald-950/[0.06] opacity-75 hover:opacity-95"
                    }`}
                  >
                    {renderCardBody(item, index)}
                  </article>
                );
              })}
            </div>
          </div>

          {/* Soft left & right vignette fade matching #FAFDFB surface */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FAFDFB] via-[#FAFDFB]/85 to-transparent lg:w-36"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FAFDFB] via-[#FAFDFB]/85 to-transparent lg:w-36"
            aria-hidden="true"
          />

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
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {Array.from({ length: maxDesktopStart + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setDesktopStart(idx)}
              aria-label={`Tampilkan pertanyaan ${idx + 1} dan ${idx + 2}`}
              aria-pressed={desktopStart === idx}
              className={`h-1.5 rounded-full transition-all ${
                desktopStart === idx
                  ? "w-6 bg-[#0F3D2E]"
                  : "w-1.5 bg-emerald-950/20 hover:bg-emerald-950/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Compact Carousel (< 768px) */}
      <div className="md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {questions.map((item, idx) => (
              <div key={item.question} className="w-full shrink-0 px-0.5">
                <article className="flex h-full flex-col justify-between rounded-2xl border border-emerald-950/[0.1] bg-white p-5 shadow-[0_12px_28px_-10px_rgba(15,61,46,0.08)]">
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

          <div className="flex items-center gap-1.5">
            {questions.map((item, idx) => (
              <button
                key={item.question}
                type="button"
                onClick={() => setMobileIndex(idx)}
                aria-label={`Pilih pertanyaan ${idx + 1}`}
                aria-pressed={mobileIndex === idx}
                className={`h-1.5 rounded-full transition-all ${
                  mobileIndex === idx
                    ? "w-5 bg-[#0F3D2E]"
                    : "w-1.5 bg-emerald-950/20"
                }`}
              />
            ))}
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
