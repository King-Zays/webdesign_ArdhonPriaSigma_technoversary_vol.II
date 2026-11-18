"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export interface TeamFanMember {
  name: string;
  role?: string;
  image?: string;
  cardBgImage?: string;
  popoutBox?: {
    left: string;
    top: string;
    width: string;
    height: string;
    clipBottom?: string;
    topOnlyPopout?: boolean;
  };
  mascot?: {
    image: string;
    className?: string;
    style?: React.CSSProperties;
    alt?: string;
  };
}

export interface TeamFanSectionProps {
  id?: string;
  title: string;
  titleLine2Prefix?: string;
  titleHighlight?: string;
  description: string;
  footnote?: string;
  members: TeamFanMember[];
  animation?: "none" | "subtle";
  variant?: "standard" | "compact";
  className?: string;
}

const variantStyles = {
  standard: {
    section: "py-20 sm:py-28",
    title: "text-3xl sm:text-4xl md:text-5xl",
    description: "max-w-lg text-sm sm:text-base",
    header: "gap-5",
    content: "gap-10 sm:gap-12",
    fan: "max-w-3xl",
    fanCard: "aspect-[4/5]",
  },
  compact: {
    section: "py-14 sm:py-20",
    title: "text-2xl sm:text-3xl md:text-4xl",
    description: "max-w-md text-sm",
    header: "gap-4",
    content: "gap-8 sm:gap-10",
    fan: "max-w-2xl",
    fanCard: "aspect-[4/5]",
  },
} as const;

const fanSlots = [
  {
    width: "w-[38%]",
    layout: "-mr-5 sm:-mr-8 z-10",
    rotate: -6,
    ty: 24,
    stackX: "90%",
    stackRotate: -3,
  },
  {
    width: "w-[42%]",
    layout: "z-20",
    rotate: 0,
    ty: -8,
    stackX: "0%",
    stackRotate: 0,
  },
  {
    width: "w-[38%]",
    layout: "-ml-5 sm:-ml-8 z-10",
    rotate: 6,
    ty: 24,
    stackX: "-90%",
    stackRotate: 3,
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean;
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}>) {
  if (!active) return <div className={className}>{children}</div>;

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberFan({
  members,
  cardAspect,
  animate,
}: Readonly<{
  members: TeamFanMember[];
  cardAspect: string;
  animate: boolean;
}>) {
  const fanRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(fanRef, { once: true, amount: 0.4 });
  const shouldShow = !animate || isInView;
  const [introDone, setIntroDone] = React.useState(!animate);
  const [flippedIndices, setFlippedIndices] = React.useState<Record<number, boolean>>({});

  const toggleCard = (idx: number) => {
    if (!introDone) return;
    setFlippedIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div
      ref={fanRef}
      className="relative flex w-full items-center justify-center pb-20 pt-20 [perspective:1200px] sm:pb-24 sm:pt-28"
    >
      {members.slice(0, 3).map((member, i) => {
        const slot = fanSlots[i] ?? fanSlots[1];
        const initials = getInitials(member.name);
        const isFlipped = Boolean(flippedIndices[i]);

        return (
          <motion.div
            key={member.name}
            role="button"
            tabIndex={0}
            aria-label={`Balik kartu ${member.name}`}
            onClick={() => toggleCard(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleCard(i);
              }
            }}
            initial={
              animate
                ? {
                    x: slot.stackX,
                    y: 140,
                    rotate: slot.stackRotate,
                    scale: 0.88,
                    opacity: 0,
                  }
                : {
                    x: 0,
                    y: slot.ty,
                    rotate: slot.rotate,
                    scale: 1,
                    opacity: 1,
                  }
            }
            animate={
              introDone
                ? {
                    x: "0%",
                    y: slot.ty,
                    rotate: slot.rotate,
                    scale: 1,
                    opacity: 1,
                  }
                : shouldShow
                ? animate
                  ? {
                      x: [slot.stackX, slot.stackX, slot.stackX, "0%"],
                      y: [140, 0, 0, slot.ty],
                      rotate: [slot.stackRotate, slot.stackRotate, slot.stackRotate, slot.rotate],
                      scale: [0.88, 0.96, 0.96, 1],
                      opacity: [0, 1, 1, 1],
                    }
                  : {
                      x: "0%",
                      y: slot.ty,
                      rotate: slot.rotate,
                      scale: 1,
                      opacity: 1,
                    }
                : undefined
            }
            onAnimationComplete={() => {
              if (shouldShow && !introDone && i === Math.min(members.length, 3) - 1) {
                setIntroDone(true);
              }
            }}
            transition={
              introDone
                ? { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
                : animate
                ? {
                    duration: 2.8,
                    times: [0, 0.32, 0.55, 1],
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }
                : { duration: 0 }
            }
            className={cn(
              "group relative shrink-0 cursor-pointer [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]",
              cardAspect,
              slot.width,
              slot.layout
            )}
          >
            {/* Wrapper 3D terpisah tanpa opacity/overflow agar preserve-3d tidak pernah di-flatten */}
            <motion.div
              initial={{ rotateY: animate ? 180 : 0 }}
              animate={
                introDone
                  ? { rotateY: isFlipped ? 180 : 0 }
                  : shouldShow
                  ? animate
                    ? { rotateY: [180, 180, 180, 0] }
                    : { rotateY: 0 }
                  : undefined
              }
              transition={
                introDone
                  ? { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
                  : animate
                  ? {
                      duration: 2.8,
                      times: [0, 0.32, 0.55, 1],
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }
                  : { duration: 0 }
              }
              style={{ transformStyle: "preserve-3d" }}
              className="relative h-full w-full"
            >
              {/* Sisi Depan Kartu (background hutan rounded + foto cutout pop-out + nama di bawah kartu) */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
                className="absolute inset-0 overflow-visible"
              >
                {/* Latar kartu rounded (memotong background hutan, bukan foto pop-out) */}
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#EDF6F0] to-[#DCECE2] shadow-xl ring-1 ring-[#0F3D2E]/10">
                  <Image
                    src={member.cardBgImage ?? "/images/team-card-front-bg.png"}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 42vw, 325px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    priority
                  />

                  {!member.image && (
                    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1.5 px-3 text-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/50 bg-white/75 text-2xl font-extrabold tracking-tight text-[#0F3D2E]/75 shadow-sm backdrop-blur-sm sm:h-20 sm:w-20 sm:text-3xl">
                        {initials}
                      </span>
                      <span className="rounded-full bg-[#0F3D2E]/70 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:text-xs">
                        Foto anggota
                      </span>
                    </div>
                  )}
                </div>

                {/* Maskot BONI mengintip di belakang bahu anggota (di depan kartu, di belakang cutout) */}
                {member.mascot && (
                  <div
                    style={member.mascot.style}
                    className={cn("pointer-events-none absolute z-[5]", member.mascot.className)}
                  >
                    <Image
                      src={member.mascot.image}
                      alt={member.mascot.alt ?? `Maskot BONI ${member.name}`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 28vw, 220px"
                      className="object-contain drop-shadow-[0_8px_14px_rgba(15,61,46,0.22)] transition-transform duration-500 ease-out group-hover:scale-105"
                      priority
                    />
                  </div>
                )}

                {/* Foto cutout pop-out: topOnlyPopout memakai 1 layer dengan clipPath(-100% 0 0 0 round 16px) */}
                {member.image && member.popoutBox?.topOnlyPopout && (
                  <div
                    style={{
                      clipPath: "inset(-100% 0px 0px 0px round 16px)",
                    }}
                    className="pointer-events-none absolute inset-0 z-10"
                  >
                    <div className="relative h-full w-full">
                      <div
                        style={{
                          left: member.popoutBox.left,
                          top: member.popoutBox.top,
                          width: member.popoutBox.width,
                          height: member.popoutBox.height,
                        }}
                        className="absolute"
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 52vw, 420px"
                          className="object-contain object-top drop-shadow-[0_14px_20px_rgba(15,61,46,0.24)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Foto cutout pop-out samping + atas (Firzan): 2 layer identik agar bawah terpotong rapi di rounded-2xl kartu */}
                {member.image && member.popoutBox && !member.popoutBox.topOnlyPopout && (
                  <>
                    {/* Layer 1: di dalam frame kartu (terpotong rapi di semua sudut rounded-2xl) */}
                    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl">
                      <div className="relative h-full w-full">
                        <div
                          style={{
                            left: member.popoutBox.left,
                            top: member.popoutBox.top,
                            width: member.popoutBox.width,
                            height: member.popoutBox.height,
                          }}
                          className="absolute"
                        >
                          <Image
                            src={member.image}
                            alt=""
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 52vw, 420px"
                            className="object-contain object-top drop-shadow-[0_14px_20px_rgba(15,61,46,0.24)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            priority
                          />
                        </div>
                      </div>
                    </div>

                    {/* Layer 2: bagian atas & lengan pop-out keluar frame (berhenti sebelum sudut bawah agar tidak bocor) */}
                    <div
                      style={{
                        clipPath: `inset(-100% -40% ${member.popoutBox.clipBottom ?? "25%"} -40%)`,
                      }}
                      className="pointer-events-none absolute inset-0 z-10"
                    >
                      <div className="relative h-full w-full">
                        <div
                          style={{
                            left: member.popoutBox.left,
                            top: member.popoutBox.top,
                            width: member.popoutBox.width,
                            height: member.popoutBox.height,
                          }}
                          className="absolute"
                        >
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 52vw, 420px"
                            className="object-contain object-top drop-shadow-[0_14px_20px_rgba(15,61,46,0.24)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {member.image && !member.popoutBox && (
                  <div
                    style={{
                      clipPath: "inset(-100% -40% 0px -40% round 0 0 16px 16px)",
                    }}
                    className="pointer-events-none absolute inset-0 z-10"
                  >
                    <div className="relative h-full w-full">
                      <div className="absolute -top-[31%] bottom-[-3.5%] left-[-10%] right-[4%]">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 52vw, 420px"
                          className="object-contain object-bottom drop-shadow-[0_14px_20px_rgba(15,61,46,0.24)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Nama & peran di bawah kartu */}
                <div className="pointer-events-none absolute inset-x-[-10%] top-full z-20 pt-3 text-center sm:pt-4">
                  <p className="truncate text-[11px] font-bold leading-tight text-[#0F3D2E] sm:text-base">
                    {member.name}
                  </p>
                  {member.role && (
                    <p className="mt-0.5 truncate text-[10px] font-medium text-[#426352] sm:text-xs">
                      {member.role}
                    </p>
                  )}
                </div>
              </div>

              {/* Sisi Belakang Kartu (desain dari Figma, saat masih menumpuk sebelum flip) */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 overflow-hidden rounded-2xl bg-[#0F3D2E] shadow-xl ring-1 ring-white/20"
              >
                <Image
                  src="/images/team-card-back.png"
                  alt="Desain belakang kartu tim pengembang BONI"
                  fill
                  sizes="(max-width: 640px) 42vw, 325px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function TeamFanSection({
  id,
  title,
  titleLine2Prefix,
  titleHighlight,
  description,
  footnote,
  members,
  animation = "subtle",
  variant = "standard",
  className,
}: Readonly<TeamFanSectionProps>) {
  const reduce = useReducedMotion();
  const animate = animation === "subtle" && !reduce;
  const vs = variantStyles[variant];

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn(
        "relative isolate w-full scroll-mt-20 overflow-hidden bg-[#FAFDFB]",
        className
      )}
    >
      <motion.div
        className={cn(
          "relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center",
          vs.section,
          vs.content
        )}
        variants={animate ? container : undefined}
        initial={animate ? "hidden" : false}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Reveal
          active={animate}
          className={cn("flex w-full max-w-2xl flex-col items-center", vs.header)}
        >
          <h2
            id={id ? `${id}-title` : undefined}
            className={cn(
              "font-extrabold leading-[1.12] tracking-tight text-[#0F3D2E]",
              vs.title
            )}
          >
            {title}
            {(titleLine2Prefix || titleHighlight) && (
              <>
                <br />
                {titleLine2Prefix && <span>{titleLine2Prefix} </span>}
                {titleHighlight && (
                  <span className="text-[#1D9E75]">{titleHighlight}</span>
                )}
              </>
            )}
          </h2>

          <p className={cn("leading-relaxed text-[#2D5542]", vs.description)}>
            {description}
          </p>
        </Reveal>

        <div className={cn("mx-auto w-full", vs.fan)}>
          <MemberFan
            members={members}
            cardAspect={vs.fanCard}
            animate={animate}
          />
        </div>

        {footnote && (
          <Reveal active={animate}>
            <p className="text-xs font-medium text-[#527362]">{footnote}</p>
          </Reveal>
        )}
      </motion.div>
    </section>
  );
}

export default TeamFanSection;
