"use client";

import Image from "next/image";
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
          "group inline-flex min-h-10 items-center gap-2.5 rounded-lg px-1 py-1 text-[15px] font-bold leading-tight tracking-tight text-[#0F3D2E]/75 transition-all duration-200 hover:-translate-y-0.5 hover:text-[#0F3D2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D9E75] sm:text-base";

        const inner = (
          <>
            {logo ? (
              <span className="flex h-7 w-8 shrink-0 items-center justify-center">
                <Image
                  src={logo}
                  alt=""
                  width={44}
                  height={32}
                  className="h-full w-full object-contain opacity-90 transition-transform duration-200 group-hover:scale-105 group-hover:opacity-100"
                />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1D9E75]/10 text-[11px] font-extrabold tracking-tight text-[#1D9E75] transition-colors duration-200 group-hover:bg-[#1D9E75] group-hover:text-white"
              >
                {getInitials(name)}
              </span>
            )}

            <span className="whitespace-nowrap">{name}</span>
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

const ROW_DIRECTIONS = ["left", "right", "left"] as const;
const ROW_SECOND_PER_ITEM = [4.0, 4.7, 4.3] as const;

export default function EcosystemMarquee({
  id = "peluang-kolaborasi",
  references,
}: {
  id?: string;
  references: readonly EcosystemReference[];
}) {
  const rows: EcosystemReference[][] = [[], [], []];
  references.forEach((item, index) => {
    rows[index % 3].push(item);
  });

  return (
    <section
      id={id}
      aria-labelledby={id + "-label"}
      className="scroll-mt-28 w-full"
    >
      <div className="mx-auto mb-10 max-w-4xl px-4 text-center sm:mb-12 sm:px-6">
        <h2
          id={id + "-label"}
          className="text-[28px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0F3D2E] sm:text-4xl"
        >
          Ekosistem{" "}
          <span className="text-[#1D9E75]">lingkungan Surabaya</span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-[#426352] sm:text-base">
          BONI memetakan komunitas, kampus, dan layanan warga di Surabaya
          sebagai dasar rancangan kolaborasi dan integrasi.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {rows.map((rowItems, rowIndex) => (
          <div
            key={rowIndex}
            id={`${id}-track-${rowIndex + 1}`}
            className={styles.referenceViewport}
          >
            <div
              className={`${styles.referenceTrack} ${
                ROW_DIRECTIONS[rowIndex] === "right"
                  ? styles.referenceTrackReverse
                  : ""
              }`}
              style={{
                animationDuration: `${(
                  rowItems.length * ROW_SECOND_PER_ITEM[rowIndex]
                ).toFixed(1)}s`,
              }}
            >
              <ReferenceList references={rowItems} />
              <ReferenceList references={rowItems} duplicate />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
