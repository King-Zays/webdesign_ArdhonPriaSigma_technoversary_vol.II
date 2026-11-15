"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./contact.module.css";

const PARTNER_PLACEHOLDERS = [
  { id: "mitra-1", label: "Contoh logo" },
  { id: "mitra-2", label: "Contoh logo" },
  { id: "mitra-3", label: "Contoh logo" },
  { id: "mitra-4", label: "Contoh logo" },
  { id: "mitra-5", label: "Contoh logo" },
];

function PlaceholderMark({ index }: { index: number }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={styles.logoMark}
    >
      {index % 3 === 0 ? (
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
      ) : index % 3 === 1 ? (
        <rect x="3.5" y="3.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      ) : (
        <path
          d="M10 3.2L16.2 14.5H3.8L10 3.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function PartnerMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.resources}>
      <div className={styles.marqueeHeader}>
        <p>Mitra &amp; kolaborasi (pratinjau)</p>
        <button
          type="button"
          onClick={() => setPaused((prev) => !prev)}
          aria-pressed={paused}
          aria-label={paused ? "Putar baris contoh logo" : "Jeda baris contoh logo"}
          className={styles.marqueeToggle}
        >
          {paused ? (
            <>
              <Play size={12} aria-hidden="true" />
              <span>Putar</span>
            </>
          ) : (
            <>
              <Pause size={12} aria-hidden="true" />
              <span>Jeda</span>
            </>
          )}
        </button>
      </div>

      <div
        className={styles.marquee}
        data-paused={paused ? "true" : "false"}
        aria-label="Baris contoh logo mitra kolaborasi"
      >
        <div className={styles.marqueeTrack}>
          <ul className={styles.marqueeGroup}>
            {PARTNER_PLACEHOLDERS.map((item, idx) => (
              <li key={item.id} className={styles.logoItem}>
                <PlaceholderMark index={idx} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <ul className={`${styles.marqueeGroup} ${styles.marqueeDuplicate}`} aria-hidden="true">
            {PARTNER_PLACEHOLDERS.map((item, idx) => (
              <li key={`${item.id}-dup`} className={styles.logoItem}>
                <PlaceholderMark index={idx} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
