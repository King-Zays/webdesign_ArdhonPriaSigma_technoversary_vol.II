"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const illustrationSizes = "(min-width: 768px) 220px, 260px";
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 320, damping: 24, mass: 0.85 };

const cameraCorners = [
  "left-0 top-0 rounded-tl-[9px] border-l-2 border-t-2",
  "right-0 top-0 rounded-tr-[9px] border-r-2 border-t-2",
  "bottom-0 left-0 rounded-bl-[9px] border-b-2 border-l-2",
  "bottom-0 right-0 rounded-br-[9px] border-b-2 border-r-2",
];

function PillarCard({
  fig,
  tag,
  title,
  description,
  label,
  delay = 0,
  className = "",
  renderIllustration,
}: {
  fig: string;
  tag: string;
  title: string;
  description: string;
  label: string;
  delay?: number;
  className?: string;
  renderIllustration: (hovered: boolean, reducedMotion: boolean) => ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT_EXPO }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col justify-between py-9 transition-colors duration-300 hover:bg-[#F5FAF7]/65 md:px-7 md:py-10 ${className}`}
    >
      {/* Top figure caption bar */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums text-[#4D6D5B]/85 transition-colors duration-300 group-hover:text-[#0F3D2E]">
          {fig}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1D9E75]">
          <motion.span
            aria-hidden="true"
            animate={
              reducedMotion
                ? undefined
                : hovered
                  ? { scale: 1.35, opacity: 1 }
                  : { scale: 1, opacity: 0.6 }
            }
            transition={{ duration: 0.25 }}
            className="h-1.5 w-1.5 rounded-full bg-[#1D9E75]"
          />
          <span>{tag}</span>
        </span>
      </div>

      {/* Interactive illustration canvas with soft emerald atmospheric glow */}
      <div
        role="img"
        aria-label={label}
        className="relative mx-auto my-7 h-52 w-full max-w-[260px]"
      >
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            reducedMotion
              ? undefined
              : hovered
                ? { scale: 1.14, opacity: 0.95 }
                : { scale: 0.96, opacity: 0.45 }
          }
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pointer-events-none absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,158,117,0.14),transparent_70%)]"
        />
        {renderIllustration(hovered, reducedMotion)}
      </div>

      <div>
        <h3 className="text-lg font-bold tracking-tight text-[#0F3D2E] transition-colors duration-300 group-hover:text-[#14845F]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#426352]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/** Shared idle gentle vertical float paused smoothly on hover or reduced-motion. */
function AmbientFloat({
  paused,
  reducedMotion,
  delay = 0,
  children,
}: {
  paused: boolean;
  reducedMotion: boolean;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      animate={
        reducedMotion || paused
          ? { y: 0 }
          : { y: [-2.5, 2.5] }
      }
      transition={
        reducedMotion || paused
          ? { duration: 0.35, ease: "easeOut" }
          : {
              y: {
                duration: 2.3,
                delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }
      }
      className="relative h-full w-full"
    >
      {children}
    </motion.div>
  );
}

/** FIG 0.1 — Botol PET & kardus terangkat memisahkan diri dari tempat sampah basah saat hover. */
function PilahIllustration({
  hovered,
  reducedMotion,
}: {
  hovered: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
      {/* Subtle grounded contact shadow */}
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion
            ? undefined
            : hovered
              ? { scaleX: 0.94, opacity: 0.35 }
              : { scaleX: 1, opacity: 0.2 }
        }
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute bottom-1.5 left-4 h-3 w-[56%] rounded-full bg-[#0F3D2E]/30 blur-md"
      />

      {/* Back layer: wet waste bin recedes smoothly on hover */}
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.88 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT_EXPO }}
        className="absolute right-0 top-4 aspect-square w-[34%]"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : hovered
                ? { x: 8, y: -4, scale: 0.89, rotate: 4, opacity: 0.68 }
                : { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
          }
          transition={SPRING_SNAPPY}
          className="relative h-full w-full"
        >
          <Image src="/images/edukasi/wadah.webp" alt="" fill sizes="90px" className="object-contain" />
        </motion.div>
      </motion.div>

      {/* Foreground layer: sorted PET + cardboard gently breathes idle and lifts forward on hover */}
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.93 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.72, delay: 0.14, ease: EASE_OUT_EXPO }}
        className="absolute bottom-2 left-0 aspect-square w-[68%]"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : hovered
                ? { x: -6, y: -6, scale: 1.06, rotate: -1.5 }
                : { x: 0, y: 0, scale: 1, rotate: 0 }
          }
          transition={SPRING_SNAPPY}
          className="relative h-full w-full"
        >
          <AmbientFloat paused={hovered} reducedMotion={reducedMotion} delay={0}>
            <Image
              src="/images/edukasi/pilah.webp"
              alt=""
              fill
              sizes={illustrationSizes}
              className="object-contain"
            />
          </AmbientFloat>
        </motion.div>
      </motion.div>
    </>
  );
}

/** FIG 0.2 — Botol & kardus terlipat mengangkat diri disertai lencana centang berdenyut hidup. */
function KesiapanIllustration({
  hovered,
  reducedMotion,
}: {
  hovered: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion
            ? undefined
            : hovered
              ? { scaleX: 0.92, opacity: 0.32 }
              : { scaleX: 1, opacity: 0.2 }
        }
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute bottom-1.5 left-1/2 h-3 w-[68%] -translate-x-1/2 rounded-full bg-[#0F3D2E]/30 blur-md"
      />

      {/* Main material cluster */}
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.72, delay: 0.1, ease: EASE_OUT_EXPO }}
        className="absolute inset-x-[10%] inset-y-2"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : hovered
                ? { y: -6, scale: 1.05 }
                : { y: 0, scale: 1 }
          }
          transition={SPRING_SNAPPY}
          className="relative h-full w-full"
        >
          <AmbientFloat paused={hovered} reducedMotion={reducedMotion} delay={0.5}>
            <Image
              src="/images/edukasi/kesiapan.webp"
              alt=""
              fill
              sizes={illustrationSizes}
              className="object-contain"
            />
          </AmbientFloat>
        </motion.div>
      </motion.div>

      {/* Checkmark seal with ambient emerald ripple & spring pop on hover */}
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.45, rotate: -18 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.22 }}
        className="absolute bottom-4 right-[7%]"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : hovered
                ? { scale: 1.18, y: -7, rotate: 8 }
                : { scale: 1, y: 0, rotate: 0 }
          }
          transition={SPRING_SNAPPY}
          className="relative"
        >
          {!reducedMotion && (
            <motion.span
              animate={
                hovered
                  ? { scale: [1, 1.55], opacity: [0.55, 0] }
                  : { scale: [1, 1.38], opacity: [0.35, 0] }
              }
              transition={{
                duration: hovered ? 1.15 : 2.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute inset-0 rounded-full bg-[#1D9E75]/35"
            />
          )}
          <span className="relative grid size-12 place-items-center rounded-full border border-[#ABD7C0] bg-gradient-to-br from-[#E2F7EB] to-[#B9E9D0] text-[#0E7355] shadow-[0_7px_14px_-6px_rgba(15,61,46,0.35)]">
            <Check size={25} strokeWidth={2.6} />
          </span>
        </motion.div>
      </motion.div>
    </>
  );
}

/** FIG 0.3 — Bingkai kamera mengunci fokus (`autofocus snap`) + garis pindai AI lembut saat hover. */
function BuktiIllustration({
  hovered,
  reducedMotion,
}: {
  hovered: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion
            ? undefined
            : hovered
              ? { scaleX: 0.94, opacity: 0.32 }
              : { scaleX: 1, opacity: 0.2 }
        }
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute bottom-2.5 left-1/2 h-3 w-[68%] -translate-x-1/2 rounded-full bg-[#0F3D2E]/30 blur-md"
      />

      {/* Scale + materials photo target */}
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.72, delay: 0.1, ease: EASE_OUT_EXPO }}
        className="absolute inset-x-[9%] inset-y-5"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : hovered
                ? { y: -4, scale: 1.05 }
                : { y: 0, scale: 1 }
          }
          transition={SPRING_SNAPPY}
          className="relative h-full w-full"
        >
          <AmbientFloat paused={hovered} reducedMotion={reducedMotion} delay={1.0}>
            <Image
              src="/images/edukasi/bukti.webp"
              alt=""
              fill
              sizes={illustrationSizes}
              className="object-contain"
            />
          </AmbientFloat>
        </motion.div>
      </motion.div>

      {/* Outer centering anchor separated cleanly from Framer Motion scale transform */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-2 left-1/2 w-[85%] max-w-[200px] -translate-x-1/2"
      >
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 1.12 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="relative h-full w-full"
        >
          <motion.div
            animate={
              reducedMotion
                ? undefined
                : hovered
                  ? { scale: 0.92 }
                  : { scale: 1 }
            }
            transition={SPRING_SNAPPY}
            className="relative h-full w-full"
          >
            {cameraCorners.map((corner) => (
              <span
                key={corner}
                className={`absolute size-5 transition-colors duration-300 ${
                  hovered ? "border-[#1D9E75]" : "border-[#14845F]"
                } ${corner}`}
              />
            ))}

            {/* AI scan beam clipped neatly inside bracket frame when hovered */}
            <div className="pointer-events-none absolute inset-1.5 overflow-hidden rounded-[8px]">
              {!reducedMotion && hovered && (
                <motion.div
                  initial={{ top: "4%", opacity: 0 }}
                  animate={{
                    top: ["6%", "90%", "6%"],
                    opacity: [0, 0.95, 0],
                  }}
                  transition={{
                    duration: 2.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-x-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#1D9E75] to-transparent shadow-[0_0_12px_2px_rgba(29,158,117,0.45)]"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function EducationPillarsGrid() {
  return (
    <div id="standar-pilah" className="relative scroll-mt-28 border-y border-emerald-950/[0.08]">
      {/* Architectural corner crosshair ticks */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1.5 -top-1.5 hidden h-3 w-3 items-center justify-center text-[11px] font-light leading-none text-[#1D9E75]/60 md:flex"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1.5 -top-1.5 hidden h-3 w-3 items-center justify-center text-[11px] font-light leading-none text-[#1D9E75]/60 md:flex"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 -left-1.5 hidden h-3 w-3 items-center justify-center text-[11px] font-light leading-none text-[#1D9E75]/60 md:flex"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 -right-1.5 hidden h-3 w-3 items-center justify-center text-[11px] font-light leading-none text-[#1D9E75]/60 md:flex"
      >
        +
      </span>

      <div className="grid grid-cols-1 divide-y divide-emerald-950/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
        <PillarCard
          fig="FIG 0.1"
          tag="2 Material Utama"
          title="Pilah material"
          description="Pisahkan botol plastik PET (kode 1) dan kardus kering dari sisa makanan atau sampah dapur yang mudah membusuk."
          label="Botol PET dan kardus terlipat dipisahkan dari tempat sampah basah."
          delay={0}
          className="md:first:pl-4"
          renderIllustration={(hovered, reducedMotion) => (
            <PilahIllustration hovered={hovered} reducedMotion={reducedMotion} />
          )}
        />

        <PillarCard
          fig="FIG 0.2"
          tag="3 Syarat Mandiri"
          title="Cek kesiapan"
          description="Gunakan checklist interaktif untuk memastikan botol kering, lakban berlebih lepas, dan kardus sudah terlipat rata."
          label="Botol kosong dan kardus yang terlipat rata tanpa lakban berlebih, dengan tanda centang."
          delay={0.08}
          renderIllustration={(hovered, reducedMotion) => (
            <KesiapanIllustration hovered={hovered} reducedMotion={reducedMotion} />
          )}
        />

        <PillarCard
          fig="FIG 0.3"
          tag="1 Bingkai Bukti"
          title="Siapkan bukti foto"
          description="Pahami syarat satu foto material bersama angka timbangan serta uji pemeriksaan foto AI yang aktif di demo Warga."
          label="Botol PET, kardus, dan angka 3,45 kg pada layar timbangan terlihat dalam satu bingkai kamera."
          delay={0.16}
          className="md:last:pr-4"
          renderIllustration={(hovered, reducedMotion) => (
            <BuktiIllustration hovered={hovered} reducedMotion={reducedMotion} />
          )}
        />
      </div>
    </div>
  );
}
