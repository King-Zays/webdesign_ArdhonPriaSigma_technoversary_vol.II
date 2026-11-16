"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { EcosystemReference } from "./ecosystem-references";
import styles from "./edukasi.module.css";

function getInitials(name: string) {
  const words = name
    .replace(/[()]/g, " ")
    .split(/[\s-]+/)
    .filter((w) => w.length > 0 && !/^(di|dan|untuk|the|of)$/i.test(w));
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function ReferenceList({
  references,
  duplicate = false,
}: {
  references: readonly EcosystemReference[];
  duplicate?: boolean;
}) {
  return (
    <ul
      role="list"
      aria-hidden={duplicate || undefined}
      className={
        duplicate
          ? `${styles.referenceGroup} ${styles.referenceCopy}`
          : styles.referenceGroup
      }
    >
      {references.map(({ name, href, logo }) => {
        const cardClass =
          "group inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-emerald-950/[0.09] bg-white/95 px-3 py-2 text-[13px] font-semibold leading-tight text-[#0F3D2E] shadow-[0_6px_18px_-12px_rgba(15,61,46,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1D9E75]/40 hover:bg-white hover:shadow-[0_12px_26px_-14px_rgba(15,61,46,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9E75]";

        const inner = (
          <>
            {logo ? (
              <span className="flex h-8 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-emerald-950/[0.06] bg-[#FAFDFB] p-1">
                <Image
                  src={logo}
                  alt=""
                  width={48}
                  height={32}
                  className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="flex h-8 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-900/10 bg-[#EFF8F3] text-[11px] font-extrabold tracking-tight text-[#1D9E75] transition-colors duration-200 group-hover:bg-[#1D9E75] group-hover:text-white"
              >
                {getInitials(name)}
              </span>
            )}

            <span className="whitespace-nowrap">{name}</span>

            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="shrink-0 text-[#4D6D5B]/70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1D9E75]"
            />
          </>
        );

        return (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={duplicate ? -1 : undefined}
              className={cardClass}
            >
              {inner}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function EcosystemMarquee({
  id,
  label,
  references,
  direction = "left",
}: {
  id: string;
  label: string;
  references: readonly EcosystemReference[];
  direction?: "left" | "right";
}) {
  return (
    <section id={id} aria-labelledby={id + "-label"} className="scroll-mt-28 w-full">
      <div className="mx-auto mb-2.5 flex max-w-6xl items-center gap-2 px-4 sm:px-6">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#1D9E75]"
        />
        <h2
          id={id + "-label"}
          className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4D6D5B]"
        >
          {label}
        </h2>
      </div>

      <div id={id + "-track"} className={styles.referenceViewport}>
        <div
          className={`${styles.referenceTrack} ${
            direction === "right" ? styles.referenceTrackReverse : ""
          }`}
          style={{ animationDuration: `${references.length * 3.8}s` }}
        >
          <ReferenceList references={references} />
          <ReferenceList references={references} duplicate />
        </div>
      </div>
    </section>
  );
}
