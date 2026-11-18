"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  Gift,
  ImagePlus,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  GREEN_ACTIONS,
  GREEN_ACTION_LIST,
  type GreenActionType,
} from "@/config/green-actions";
import { GreenActionIcon } from "@/components/common/icons";

/**
 * Pratinjau mini antarmuka asli `/dashboard/eco-action` (Portal Warga BONI).
 * Menampilkan sidebar warga, saldo EcoPoints, pemilih 5 kategori aksi asli,
 * area unggah bukti, serta daftar Riwayat Aksi Hijau yang langsung bertambah
 * saat simulasi dijalankan.
 */

type Fase = "siap" | "memeriksa" | "terverifikasi";

const DEMO_SEQUENCE: GreenActionType[] = [
  "used_cooking_oil",
  "tree_planting",
  "energy_saving",
  "sustainable_transport",
  "waste_sorting",
];

export default function HeroConsole() {
  const [aktif, setAktif] = useState<GreenActionType>("waste_sorting");
  const [fase, setFase] = useState<Fase>("terverifikasi");
  const [kuantitas, setKuantitas] = useState<number>(GREEN_ACTIONS.waste_sorting.quantity.default);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const criteriaRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<GreenActionType, HTMLButtonElement | null>>>({});
  const verifyBtnRef = useRef<HTMLButtonElement>(null);
  const [criteriaHeight, setCriteriaHeight] = useState<number | "auto">("auto");

  const isInView = useInView(consoleRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [demoPaused, setDemoPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 240,
    y: 160,
    visible: false,
  });
  const [cursorClicking, setCursorClicking] = useState(false);
  const [clickPulseKey, setClickPulseKey] = useState(0);

  useEffect(() => {
    const el = criteriaRef.current;
    if (!el) return;
    const measure = () => setCriteriaHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aktif]);

  const aksi = GREEN_ACTIONS[aktif];
  const baseSaldo = 500;
  const tampilSaldo = fase === "terverifikasi" ? baseSaldo + aksi.ecoPoints : baseSaldo;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseDemoTemporarily = useCallback(() => {
    setDemoPaused(true);
    setCursorPos((prev) => ({ ...prev, visible: false }));
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setDemoPaused(false);
    }, 6000);
  }, []);

  const moveCursorTo = useCallback((el: HTMLElement | null) => {
    const container = consoleRef.current;
    if (!container || !el) return false;
    const cRect = container.getBoundingClientRect();
    const tRect = el.getBoundingClientRect();
    if (tRect.width === 0 || tRect.height === 0) return false;
    setCursorPos({
      x: tRect.left - cRect.left + tRect.width * 0.56,
      y: tRect.top - cRect.top + tRect.height * 0.58,
      visible: true,
    });
    return true;
  }, []);

  const pilihKategori = useCallback((tipe: GreenActionType) => {
    if (timer.current) clearTimeout(timer.current);
    setAktif(tipe);
    setKuantitas(GREEN_ACTIONS[tipe].quantity.default);
    setFase("memeriksa");
    timer.current = setTimeout(() => setFase("terverifikasi"), 550);
  }, []);

  const jalankanVerifikasi = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setFase("memeriksa");
    timer.current = setTimeout(() => setFase("terverifikasi"), 650);
  }, []);

  // Animasi demo otomatis dengan kursor yang mengklik tab kategori lalu tombol verifikasi
  useEffect(() => {
    if (!isInView || demoPaused || reduceMotion) {
      setCursorPos((prev) => ({ ...prev, visible: false }));
      return;
    }

    let cancelled = false;
    let stepIdx = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => resolve(), ms);
        timeouts.push(id);
      });

    const triggerClickPulse = async () => {
      if (cancelled) return;
      setCursorClicking(true);
      setClickPulseKey((k) => k + 1);
      await wait(180);
      if (!cancelled) setCursorClicking(false);
    };

    const runLoop = async () => {
      await wait(900);
      while (!cancelled) {
        const nextType = DEMO_SEQUENCE[stepIdx % DEMO_SEQUENCE.length];
        stepIdx += 1;

        const tabEl = tabRefs.current[nextType] ?? null;
        if (moveCursorTo(tabEl)) {
          await wait(900);
          if (cancelled) break;
          await triggerClickPulse();
          if (cancelled) break;
          pilihKategori(nextType);
        }

        await wait(1150);
        if (cancelled) break;

        if (moveCursorTo(verifyBtnRef.current)) {
          await wait(850);
          if (cancelled) break;
          await triggerClickPulse();
          if (cancelled) break;
          jalankanVerifikasi();
        }

        await wait(2200);
      }
    };

    runLoop();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [isInView, demoPaused, reduceMotion, moveCursorTo, pilihKategori, jalankanVerifikasi]);

  return (
    <div
      ref={consoleRef}
      id="features"
      onPointerDown={pauseDemoTemporarily}
      className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-neutral-200/90 bg-[#F8FAF9] text-[#1A1A1A] shadow-[0_28px_70px_-24px_rgba(15,61,46,0.22)]"
    >
      <div id="how-it-works" className="scroll-mt-24" />

      {/* Top Browser/App Window Frame */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden shrink-0 items-center gap-2 sm:flex" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          </div>
          <span className="truncate rounded-md border border-neutral-200/80 bg-[#F8FAF9] px-2 py-0.5 font-mono text-[10.5px] text-neutral-500 sm:ml-2 sm:px-2.5 sm:text-[11px]">
            boni.app/dashboard/eco-action
          </span>
        </div>
        <Link
          href="/login?role=warga"
          className="shrink-0 whitespace-nowrap text-[11px] font-semibold text-[#2D5F3F] transition-colors hover:text-[#0F3D2E] sm:text-xs"
        >
          Buka halaman penuh →
        </Link>
      </div>

      {/* App Shell: Left Sidebar + Right Main Content (Mirrors real Dashboard layout) */}
      <div className="grid lg:grid-cols-[210px_1fr]">
        {/* Left Sidebar (Replica of real Citizen Sidebar.tsx) */}
        <aside className="hidden flex-col justify-between border-r border-neutral-200/80 bg-white p-4 lg:flex">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-base font-black tracking-tight text-[#0F3D2E]">BONI</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#2D5F3F]">
                Warga
              </span>
            </div>

            {/* EcoPoints Pill from Sidebar */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-900/10 bg-[#F0FAF4] px-3 py-2 text-xs">
              <span className="font-medium text-[#2D5F3F]">EcoPoints</span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={tampilSaldo}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="font-extrabold text-[#0F3D2E]"
                >
                  {tampilSaldo}
                </motion.span>
              </AnimatePresence>
            </div>

            <nav aria-label="Pratinjau menu warga" className="mt-4 space-y-1 text-xs font-medium text-neutral-600">
              <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-neutral-500">
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg bg-[#E6F4EC] px-2.5 py-2 font-semibold text-[#0F3D2E]">
                <ShieldCheck size={14} className="text-[#2D5F3F]" />
                <span>Verifikasi Aksi</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-neutral-500">
                <Gift size={14} />
                <span>Pusat Hadiah & Prestasi</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-neutral-500">
                <Trash2 size={14} />
                <span>Laporan Sampah</span>
              </div>
            </nav>
          </div>

          <p className="text-[11px] leading-relaxed text-neutral-400">
            Pratinjau interaktif portal Warga Surabaya
          </p>
        </aside>

        {/* Right Main Content (Replica of real GreenActionVerifier.tsx) */}
        <div className="p-4 sm:p-6">
          <div className="rounded-xl border border-neutral-200/80 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-[#1A1A1A] sm:text-lg">
                  Verifikasi Aksi Hijau Berbasis AI
                </h2>
                <p className="text-xs text-neutral-500">
                  Pilih kategori aksi hijau, unggah bukti foto, dan peroleh verifikasi otomatis dari sistem.
                </p>
              </div>
              <span className="rounded-full bg-[#F0FAF4] px-2.5 py-1 text-xs font-bold text-[#2D5F3F] lg:hidden">
                Saldo: {tampilSaldo} EcoPoints
              </span>
            </div>

            {/* 1. PILIH KATEGORI AKSI */}
            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                1. Pilih Kategori Aksi (Klik untuk mencoba)
              </p>
              <div role="tablist" aria-label="Kategori aksi hijau" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {GREEN_ACTION_LIST.map((a) => {
                  const active = a.type === aktif;
                  return (
                    <motion.button
                      key={a.type}
                      ref={(el) => {
                        tabRefs.current[a.type] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => {
                        pauseDemoTemporarily();
                        pilihKategori(a.type);
                      }}
                      className={`relative flex flex-col items-start gap-1 rounded-xl border-2 p-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5F3F] ${
                        active
                          ? "border-[#2D5F3F] bg-[#F0FAF4]"
                          : "border-[#E5E7EB] bg-white hover:border-[#A8D5BA]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="hero-active-action-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="pointer-events-none absolute inset-0 rounded-[10px] ring-2 ring-[#2D5F3F]/20"
                        />
                      )}
                      <GreenActionIcon type={a.type} size={20} />
                      <span className="text-xs font-bold leading-tight text-[#1A1A1A]">{a.labelId}</span>
                      <span className="mt-auto text-[11px] font-semibold text-[#2D5F3F]">
                        +{a.ecoPoints} EcoPoints
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                initial={false}
                animate={{ height: criteriaHeight }}
                transition={{ type: "spring", stiffness: 240, damping: 30 }}
                className="mt-2.5 overflow-hidden"
              >
                <div ref={criteriaRef}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={aktif}
                      initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="rounded-lg bg-[#F9FAFB] px-3 py-2 text-xs text-neutral-600"
                    >
                      <span className="font-semibold text-neutral-700">Kriteria bukti:</span> {aksi.evidenceRequirement}{" "}
                      <span className="text-neutral-400">· Batas {aksi.dailyLimit} kali per hari</span>
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* 2. UNGGAH FOTO BUKTI + 3. KUANTITAS (Side-by-side compact preview) */}
            <div className="mt-4 grid gap-3 sm:grid-cols-[1.25fr_1fr]">
              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                  2. Unggah Foto Bukti
                </p>
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#A8D5BA] bg-[#FAFDFB] px-3 py-4 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Link
                      href="/login?role=warga"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#2D5F3F] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#245033]"
                    >
                      <Camera size={14} aria-hidden="true" />
                      <span>Ambil Foto</span>
                    </Link>
                    <Link
                      href="/login?role=warga"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#2D5F3F] bg-white px-3.5 py-2 text-xs font-semibold text-[#2D5F3F] transition-colors hover:bg-[#F0FAF4]"
                    >
                      <ImagePlus size={14} aria-hidden="true" />
                      <span>Pilih dari Galeri</span>
                    </Link>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    JPG, PNG, atau WebP · Metadata GPS dibersihkan otomatis.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-2">
                <div>
                  <label htmlFor="hero-qty" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                    3. {aksi.quantity.label} ({aksi.quantity.unit})
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="hero-qty"
                      type="number"
                      min={aksi.quantity.min}
                      max={aksi.quantity.max}
                      step={aksi.quantity.step}
                      value={kuantitas}
                      onChange={(e) => setKuantitas(Number(e.target.value) || aksi.quantity.default)}
                      className="w-24 rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs font-semibold text-[#1A1A1A] outline-none focus:border-[#2D5F3F]"
                    />
                    <span className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-2 text-xs font-medium text-neutral-600">
                      <MapPin size={12} className="text-[#2D5F3F]" />
                      <span>Wonokromo</span>
                    </span>
                  </div>
                </div>

                <button
                  ref={verifyBtnRef}
                  type="button"
                  onClick={() => {
                    pauseDemoTemporarily();
                    jalankanVerifikasi();
                  }}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0F3D2E] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#18533F]"
                >
                  <CheckCircle2 size={14} />
                  <span>{fase === "memeriksa" ? "Memeriksa bukti..." : "Simulasikan Verifikasi Bukti"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Riwayat Aksi Hijau (Mirrors bottom list of /dashboard/eco-action) */}
          <div className="mt-3 rounded-xl border border-neutral-200/80 bg-white px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1A1A1A]">Riwayat Aksi Hijau</span>
              <span className="text-[11px] text-neutral-400">Pratinjau langsung</span>
            </div>

            <div className="mt-2.5 divide-y divide-neutral-100 text-xs">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${aktif}-${fase}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between gap-2 py-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GreenActionIcon type={aktif} size={18} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-[#1A1A1A]">{aksi.labelId}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                            fase === "terverifikasi"
                              ? "bg-emerald-50 text-[#15803D]"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {fase === "terverifikasi" ? "✓ Terverifikasi" : "Memeriksa..."}
                        </span>
                      </div>
                      <p className="truncate text-[11px] text-neutral-500">
                        {kuantitas} {aksi.quantity.unit} · Wonokromo · Baru saja
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 font-bold text-[#15803D]">+{aksi.ecoPoints} poin</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      {/* Kursor Demo Otomatis (pointer-events-none agar seluruh tombol tetap bebas diklik user) */}
      <AnimatePresence>
        {cursorPos.visible && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8, x: cursorPos.x, y: cursorPos.y }}
            animate={{
              opacity: 1,
              scale: cursorClicking ? 0.85 : 1,
              x: cursorPos.x,
              y: cursorPos.y,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              x: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.14, ease: "easeOut" },
              opacity: { duration: 0.25 },
            }}
            className="pointer-events-none absolute left-0 top-0 z-30"
          >
            {clickPulseKey > 0 && (
              <motion.span
                key={clickPulseKey}
                initial={{ scale: 0.3, opacity: 0.75 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute -left-2.5 -top-2.5 h-6 w-6 rounded-full border-2 border-[#1D9E75] bg-[#1D9E75]/20"
              />
            )}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-[0_4px_10px_rgba(15,61,46,0.35)]"
            >
              <path
                d="M5.5 3.5L19 11.2L12.6 13.1L10.3 19.5L5.5 3.5Z"
                fill="#0F3D2E"
                stroke="#FFFFFF"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
