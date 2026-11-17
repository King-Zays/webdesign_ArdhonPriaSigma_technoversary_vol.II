"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronDown,
  Leaf,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { DASHBOARD_NAV } from "@/config/navigation";
import { GREEN_ACTIONS, type GreenActionType } from "@/config/green-actions";
import type { RewardItem } from "@/data/demo/umkm-rewards";
import { teamConfig } from "@/config/site";
import { GreenActionIcon } from "@/components/common/icons";
import {
  INITIAL_CHALLENGE_PROGRESS,
  INITIAL_CHALLENGE_REWARD,
  INITIAL_CHALLENGE_TARGET,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_ECOPOINTS,
  INITIAL_HISTORY,
  INITIAL_SORTED_KG,
  PORTAL_URL_LABELS,
  type JourneyJumpLink,
  type PortalTabKey,
  type PreviewHistoryItem,
  type PreviewVoucherTicket,
} from "./portalPreviewData";
import {
  CommunityTabView,
  MarketplaceTabView,
  ProfileTabView,
  ReportTabView,
  VerifyTabView,
} from "./PortalPreviewTabs";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NAV_DEMO_TARGETS: Partial<Record<PortalTabKey, string>> = {
  "/dashboard": "demo-nav-dashboard",
  "/dashboard/eco-action": "demo-nav-eco-action",
  "/dashboard/marketplace": "demo-nav-marketplace",
};

interface DemoCursorState {
  visible: boolean;
  x: number;
  y: number;
  clicking: boolean;
  rippleKey: number;
}

function DemoPointerOverlay({ cursor }: { cursor: DemoCursorState }) {
  return (
    <AnimatePresence>
      {cursor.visible && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, x: cursor.x, y: cursor.y, scale: 0.9 }}
            animate={{
              opacity: 1,
              x: cursor.x,
              y: cursor.y,
              scale: cursor.clicking ? 0.82 : 1,
            }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              x: { type: "spring", stiffness: 210, damping: 24, mass: 0.85 },
              y: { type: "spring", stiffness: 210, damping: 24, mass: 0.85 },
              scale: { duration: 0.12 },
              opacity: { duration: 0.22 },
            }}
            className="absolute left-0 top-0"
          >
            {/* Expanding Double Emerald Click Ripple */}
            <AnimatePresence>
              {cursor.rippleKey > 0 && (
                <motion.span
                  key={cursor.rippleKey}
                  initial={{ opacity: 0.9, scale: 0.25 }}
                  animate={{ opacity: 0, scale: 2.15 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.56, ease: "easeOut" }}
                  className="absolute -left-4 -top-4 h-8 w-8 rounded-full border-2 border-[#1D9E75] bg-[#1D9E75]/20"
                />
              )}
            </AnimatePresence>

            {/* Crisp High-Contrast Pointer Arrow */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="-translate-x-[3px] -translate-y-[2px] drop-shadow-[0_4px_10px_rgba(15,61,46,0.35)]"
            >
              <path
                d="M5.5 3.2L19.4 10.6L12.7 12.6L9.9 19.3L5.5 3.2Z"
                fill="#0F3D2E"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const MOBILE_SHORT_LABELS: Record<PortalTabKey, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/eco-action": "Verifikasi",
  "/dashboard/marketplace": "Hadiah",
  "/dashboard/laporan-sampah": "Laporan",
  "/dashboard/collaboration": "Komunitas",
  "/dashboard/profile": "Profil",
};

/**
 * Animated number display: smoothly tweens from 0 on viewport entry and from
 * its previous displayed value whenever target changes.
 */
function AnimatedMetric({
  value,
  decimals = 0,
  localeFormat = false,
  active,
  prefersReducedMotion,
}: {
  value: number;
  decimals?: number;
  localeFormat?: boolean;
  active: boolean;
  prefersReducedMotion: boolean;
}) {
  const [display, setDisplay] = useState<number>(active || prefersReducedMotion ? value : 0);
  const currentRef = useRef<number>(display);

  useEffect(() => {
    if (prefersReducedMotion) {
      currentRef.current = value;
      setDisplay(value);
      return;
    }
    if (!active) return;

    const from = currentRef.current;
    const to = value;
    if (Math.abs(to - from) < 0.001) {
      currentRef.current = to;
      setDisplay(to);
      return;
    }

    const duration = 680;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = from + (to - from) * eased;
      currentRef.current = next;
      setDisplay(next);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        currentRef.current = to;
        setDisplay(to);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value, active, prefersReducedMotion]);

  const rounded =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display);

  if (localeFormat && typeof rounded === "number") {
    return <>{rounded.toLocaleString("id-ID")}</>;
  }
  return <>{rounded}</>;
}

function generateDemoTicketCode(seedIndex: number): string {
  const suffixes = ["BN1", "SR2", "WK4", "GB7", "RK9", "TM3"];
  return `PCL-${suffixes[seedIndex % suffixes.length]}-${140 + ((seedIndex * 37) % 800)}`;
}

export default function InteractivePortalPreview({
  journeyLinks,
}: {
  journeyLinks: readonly JourneyJumpLink[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasEnteredView = useInView(containerRef, { once: true, amount: 0.12 });
  const isViewportActive = useInView(containerRef, { once: false, amount: 0.12 });
  const prefersReducedMotion = Boolean(useReducedMotion());

  const [activeTab, setActiveTab] = useState<PortalTabKey>("/dashboard");
  const [todayLabel, setTodayLabel] = useState<string>("");
  const [ecoPoints, setEcoPoints] = useState<number>(INITIAL_ECOPOINTS);
  const [pointsDelta, setPointsDelta] = useState<{ id: number; amount: number } | null>(null);
  const [history, setHistory] = useState<PreviewHistoryItem[]>(INITIAL_HISTORY);
  const [challengeProgress, setChallengeProgress] = useState<number>(INITIAL_CHALLENGE_PROGRESS);
  const [redeemedTickets, setRedeemedTickets] = useState<PreviewVoucherTicket[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  const [quickSimulating, setQuickSimulating] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [userControlPaused, setUserControlPaused] = useState(false);
  const [demoCursor, setDemoCursor] = useState<DemoCursorState>({
    visible: false,
    x: 240,
    y: 180,
    clicking: false,
    rippleKey: 0,
  });

  const deltaTimerRef = useRef<number | null>(null);
  const idleResumeTimerRef = useRef<number | null>(null);
  const quickTimerRef = useRef<number | null>(null);

  const autopilotEnabled =
    isViewportActive && !isHovered && !userControlPaused && !prefersReducedMotion;

  useEffect(() => {
    setTodayLabel(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    return () => {
      if (deltaTimerRef.current) window.clearTimeout(deltaTimerRef.current);
      if (idleResumeTimerRef.current) window.clearTimeout(idleResumeTimerRef.current);
      if (quickTimerRef.current) window.clearTimeout(quickTimerRef.current);
    };
  }, []);

  function pauseAutopilotForUserActivity() {
    setUserControlPaused(true);
    setDemoCursor((prev) => ({ ...prev, visible: false, clicking: false }));
    if (idleResumeTimerRef.current) window.clearTimeout(idleResumeTimerRef.current);
    idleResumeTimerRef.current = window.setTimeout(() => {
      setUserControlPaused(false);
    }, 9000);
  }

  useEffect(() => {
    if (!autopilotEnabled) {
      setDemoCursor((prev) => ({ ...prev, visible: false, clicking: false }));
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timers.push(id);
      });

    function findVisibleTarget(targetKey: string): HTMLElement | null {
      const root = containerRef.current;
      if (!root) return null;
      const matches = Array.from(
        root.querySelectorAll<HTMLElement>(`[data-demo-target="${targetKey}"]`)
      );
      for (const el of matches) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) return el;
      }
      return null;
    }

    async function waitForVisibleTarget(targetKey: string): Promise<HTMLElement | null> {
      for (let attempt = 0; attempt < 12; attempt++) {
        if (cancelled) return null;
        const found = findVisibleTarget(targetKey);
        if (found) return found;
        await wait(70);
      }
      return null;
    }

    async function glideAndClick(targetKey: string, afterWaitMs: number) {
      if (cancelled) return false;
      const root = containerRef.current;
      const target = await waitForVisibleTarget(targetKey);
      if (!root || !target) return false;

      const rootRect = root.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const x = Math.round(targetRect.left - rootRect.left + targetRect.width * 0.5);
      const y = Math.round(targetRect.top - rootRect.top + targetRect.height * 0.55);

      setDemoCursor((prev) => ({
        ...prev,
        visible: true,
        x,
        y,
        clicking: false,
      }));
      await wait(620);
      if (cancelled) return false;

      setDemoCursor((prev) => ({
        ...prev,
        clicking: true,
        rippleKey: prev.rippleKey + 1,
      }));
      target.click();
      await wait(160);
      if (cancelled) return false;

      setDemoCursor((prev) => ({ ...prev, clicking: false }));
      await wait(afterWaitMs);
      return !cancelled;
    }

    function resetDemoLoopBaseline() {
      if (quickTimerRef.current) window.clearTimeout(quickTimerRef.current);
      setQuickSimulating(false);
      setEcoPoints(INITIAL_ECOPOINTS);
      setHistory(INITIAL_HISTORY);
      setChallengeProgress(INITIAL_CHALLENGE_PROGRESS);
      setRedeemedTickets([]);
      setLikedPostIds([]);
      setExpandedHistoryId(null);
      setPointsDelta(null);
      setActiveTab("/dashboard");
    }

    async function runLoop() {
      await wait(1350);

      while (!cancelled) {
        if (
          !findVisibleTarget("demo-history-row-0") ||
          !findVisibleTarget("demo-complete-challenge")
        ) {
          if (findVisibleTarget("demo-nav-dashboard")) {
            await glideAndClick("demo-nav-dashboard", 450);
            if (cancelled) break;
          }
          resetDemoLoopBaseline();
          await wait(650);
          if (cancelled) break;
        }

        await glideAndClick("demo-history-row-0", 1800);
        if (cancelled) break;

        await glideAndClick("demo-complete-challenge", 2200);
        if (cancelled) break;

        if (await glideAndClick("demo-nav-eco-action", 750)) {
          await glideAndClick("demo-verify-cat-used_cooking_oil", 650);
          if (cancelled) break;
          await glideAndClick("demo-verify-submit", 2300);
          if (cancelled) break;
        }

        if (await glideAndClick("demo-nav-marketplace", 850)) {
          await glideAndClick("demo-marketplace-redeem-1", 1900);
          if (cancelled) break;
        }

        await glideAndClick("demo-nav-dashboard", 2400);
        if (cancelled) break;

        setDemoCursor((prev) => ({ ...prev, visible: false, clicking: false }));
        await wait(900);
        if (cancelled) break;

        resetDemoLoopBaseline();
        await wait(1150);
      }
    }

    void runLoop();

    return () => {
      cancelled = true;
      for (const id of timers) window.clearTimeout(id);
    };
  }, [autopilotEnabled]);

  function announceDelta(amount: number) {
    if (deltaTimerRef.current) window.clearTimeout(deltaTimerRef.current);
    setPointsDelta({ id: Date.now(), amount });
    deltaTimerRef.current = window.setTimeout(() => setPointsDelta(null), 1900);
  }

  function recordVerifiedAction(actionType: GreenActionType, quantity: number) {
    const def = GREEN_ACTIONS[actionType];
    const estCo2 = def.estimateCo2Kg(quantity);
    let bonus = 0;

    if (
      actionType === "waste_sorting" &&
      challengeProgress < INITIAL_CHALLENGE_TARGET
    ) {
      const nextProg = challengeProgress + 1;
      setChallengeProgress(nextProg);
      if (nextProg === INITIAL_CHALLENGE_TARGET) {
        bonus = INITIAL_CHALLENGE_REWARD;
      }
    }

    const totalAdded = def.ecoPoints + bonus;
    const nextItem: PreviewHistoryItem = {
      id: `sim_${Date.now()}`,
      actionType,
      label: def.labelId,
      quantityText: `${quantity} ${def.quantity.unit}`,
      co2Kg: estCo2,
      district: "Wonokromo",
      timestampLabel: "Baru saja",
      points: totalAdded,
      confidence: 97,
      hashPreview: `sha256:${((Date.now() % 8999) + 1000).toString(16)}…8f2b`,
      isNew: true,
    };

    setHistory((prev) => [nextItem, ...prev]);
    setEcoPoints((prev) => prev + totalAdded);
    setExpandedHistoryId(nextItem.id);
    announceDelta(totalAdded);
  }

  function handleQuickCompleteChallenge() {
    if (quickSimulating || challengeProgress >= INITIAL_CHALLENGE_TARGET) return;
    setQuickSimulating(true);
    if (quickTimerRef.current) window.clearTimeout(quickTimerRef.current);
    quickTimerRef.current = window.setTimeout(() => {
      recordVerifiedAction("waste_sorting", 1.5);
      setQuickSimulating(false);
    }, prefersReducedMotion ? 100 : 520);
  }

  function handleRedeemReward(reward: RewardItem) {
    if (ecoPoints < reward.ecoPointsCost) return;
    const ticket: PreviewVoucherTicket = {
      id: `tk_${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      merchant: reward.merchant.name,
      code: generateDemoTicketCode(redeemedTickets.length + 1),
      cost: reward.ecoPointsCost,
    };
    setRedeemedTickets((prev) => [ticket, ...prev]);
    setEcoPoints((prev) => prev - reward.ecoPointsCost);
    announceDelta(-reward.ecoPointsCost);
  }

  function handleToggleCommunityLike(postId: string) {
    setLikedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  }

  function resetSimulation() {
    if (quickTimerRef.current) window.clearTimeout(quickTimerRef.current);
    setQuickSimulating(false);
    setEcoPoints(INITIAL_ECOPOINTS);
    setHistory(INITIAL_HISTORY);
    setChallengeProgress(INITIAL_CHALLENGE_PROGRESS);
    setRedeemedTickets([]);
    setLikedPostIds([]);
    setExpandedHistoryId(null);
    setPointsDelta(null);
    setActiveTab("/dashboard");
  }

  const totalCo2Kg = history.reduce((sum, item) => sum + (item.co2Kg ?? 0), 0);
  const totalSortedKg =
    INITIAL_SORTED_KG +
    history
      .slice(0, Math.max(0, history.length - INITIAL_HISTORY.length))
      .filter((item) => item.actionType === "waste_sorting")
      .reduce((sum, item) => sum + parseFloat(item.quantityText || "0"), 0);

  const runningChallengesCount = challengeProgress >= INITIAL_CHALLENGE_TARGET ? 0 : 1;
  const completedChallengesCount = challengeProgress >= INITIAL_CHALLENGE_TARGET ? 1 : 0;
  const challengePercent = Math.min(
    100,
    Math.round((challengeProgress / INITIAL_CHALLENGE_TARGET) * 100)
  );
  const userLevel = Math.floor(ecoPoints / 300) + 2;
  const pointsToNext = 300 - (ecoPoints % 300);

  const isModified =
    ecoPoints !== INITIAL_ECOPOINTS ||
    history.length !== INITIAL_HISTORY.length ||
    redeemedTickets.length > 0 ||
    likedPostIds.length > 0;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        setIsHovered(true);
        setDemoCursor((prev) => ({ ...prev, visible: false, clicking: false }));
      }}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDownCapture={(e) => {
        if (e.nativeEvent.isTrusted) pauseAutopilotForUserActivity();
      }}
      onKeyDownCapture={(e) => {
        if (e.nativeEvent.isTrusted) pauseAutopilotForUserActivity();
      }}
      className="relative z-10 overflow-hidden rounded-2xl border border-emerald-900/15 bg-[#F5F5F5] text-left shadow-[0_24px_48px_-12px_rgba(7,34,25,0.22)]"
    >
      <DemoPointerOverlay cursor={demoCursor} />
      {/* Top Browser Chrome Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 bg-[#FAFDFB] px-4 py-2.5 text-xs">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          </div>

          <div className="ml-1 flex items-center gap-2 overflow-hidden rounded-md border border-emerald-900/10 bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#426352]">
            <motion.span
              key={activeTab}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="truncate"
            >
              {PORTAL_URL_LABELS[activeTab]}
            </motion.span>
          </div>

          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200/80 bg-[#F0FAF4] px-2.5 py-0.5 text-[10.5px] font-bold text-[#1D9E75] sm:inline-flex">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              {!prefersReducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D9E75] opacity-70" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D9E75]" />
            </span>
            <span>
              {autopilotEnabled
                ? "Demo Otomatis · Sentuh untuk Kontrol"
                : "Simulasi Interaktif"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {isModified && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={resetSimulation}
                className="inline-flex items-center gap-1 rounded-md border border-emerald-950/15 bg-white px-2 py-0.5 text-[11px] font-semibold text-[#426352] transition-colors hover:border-[#1D9E75]/40 hover:text-[#0F3D2E]"
              >
                <RotateCcw size={11} aria-hidden="true" />
                <span>Reset</span>
              </motion.button>
            )}
          </AnimatePresence>

          <Link
            href="/login?role=warga"
            className="font-bold text-[#0F3D2E] transition-colors hover:text-[#1D9E75]"
          >
            Buka halaman penuh →
          </Link>
        </div>
      </div>

      {/* Interactive App Shell */}
      <div className="flex flex-col md:flex-row">
        {/* Left Authentic Interactive Portal Warga Sidebar */}
        <aside
          aria-label="Pratinjau navigasi akun warga interaktif"
          className="hidden w-[212px] shrink-0 flex-col justify-between border-r border-[#E5E7EB] bg-white md:flex"
        >
          <div>
            <div className="flex h-16 items-center justify-between border-b border-[#E5E7EB] px-4">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  aria-label="Beranda BONI"
                  className="transition-opacity hover:opacity-90"
                >
                  <Image
                    src="/logo.png"
                    alt="BONI"
                    width={110}
                    height={36}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                </Link>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#0F3D2E]">
                  Warga
                </span>
              </div>
            </div>

            {/* Interactive EcoPoints Pill */}
            <motion.button
              type="button"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              onClick={() => setActiveTab("/dashboard/marketplace")}
              aria-label={`Saldo ${ecoPoints} EcoPoints, buka katalog hadiah`}
              className="relative mx-3 mt-3 flex w-[calc(100%-1.5rem)] items-center justify-between rounded-lg border border-transparent bg-[#F0FAF4] px-3 py-2 text-xs transition-colors hover:border-[#1D9E75]/30 hover:bg-[#E3F4E9]"
            >
              <span className="font-semibold text-gray-600">EcoPoints</span>
              <span className="flex items-center gap-1.5 font-extrabold tabular-nums text-[#2D5F3F]">
                <AnimatedMetric
                  value={ecoPoints}
                  localeFormat
                  active={hasEnteredView}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </span>

              <AnimatePresence>
                {pointsDelta && (
                  <motion.span
                    key={pointsDelta.id}
                    initial={{ opacity: 0, y: 6, scale: 0.85 }}
                    animate={{ opacity: 1, y: -14, scale: 1 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                    className={`pointer-events-none absolute right-2 top-0 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold shadow-xs ${
                      pointsDelta.amount > 0
                        ? "bg-[#1D9E75] text-white"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {pointsDelta.amount > 0 ? `+${pointsDelta.amount}` : pointsDelta.amount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Interactive Sidebar Menu */}
            <nav className="p-3" aria-label="Menu Pratinjau Portal Warga">
              <ul className="flex flex-col gap-1">
                {DASHBOARD_NAV.map(({ label, icon: Icon, href, group }, idx) => {
                  const tabHref = href as PortalTabKey;
                  const isActive = activeTab === tabHref;
                  const firstMore =
                    group === "more" && DASHBOARD_NAV[idx - 1]?.group === "primary";

                  return (
                    <li key={href}>
                      {firstMore && (
                        <p className="mb-1 mt-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Fitur Pendukung
                        </p>
                      )}
                      <motion.button
                        type="button"
                        data-demo-target={NAV_DEMO_TARGETS[tabHref]}
                        onClick={() => setActiveTab(tabHref)}
                        aria-current={isActive ? "page" : undefined}
                        whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                        className={`relative flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5F3F] ${
                          isActive
                            ? "font-bold text-[#2D5F3F]"
                            : "font-medium text-gray-600 hover:bg-[#F5F5F5] hover:text-[#2D5F3F]"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="edukasi-portal-sidebar-pill"
                            transition={
                              prefersReducedMotion
                                ? { duration: 0.01 }
                                : { type: "spring", stiffness: 360, damping: 30 }
                            }
                            className="absolute inset-0 rounded-md bg-[#A8D5BA]"
                          />
                        )}
                        <Icon
                          size={18}
                          aria-hidden="true"
                          className={`relative z-10 shrink-0 ${
                            isActive ? "text-[#2D5F3F]" : "text-gray-400"
                          }`}
                        />
                        <span className="relative z-10 flex-1">{label}</span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-2.5 border-t border-[#E5E7EB] p-4">
            <Link
              href="/login?role=warga"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-950/15 bg-[#F0FAF4] py-2.5 text-xs font-semibold text-[#0F3D2E] transition-colors hover:bg-[#E1F5E9]"
            >
              <span>Buka Portal Warga</span>
            </Link>
            <div className="pt-0.5 text-center">
              <p className="text-[11px] font-medium text-gray-500">
                © 2026 BONI · {teamConfig.teamName}
              </p>
              <p className="mt-0.5 text-[10px] text-gray-400">
                {teamConfig.institutionShort}
              </p>
            </div>
          </div>
        </aside>

        {/* Right Interactive Canvas */}
        <div className="min-w-0 flex-1 bg-[#F5F5F5]">
          {/* Mobile interactive tab switcher */}
          <div
            role="tablist"
            aria-label="Tab Pratinjau Portal Warga"
            className="flex flex-wrap gap-1.5 border-b border-emerald-950/10 bg-white px-3.5 py-2.5 md:hidden"
          >
            {(Object.keys(MOBILE_SHORT_LABELS) as PortalTabKey[]).map((key) => {
              const selected = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  data-demo-target={NAV_DEMO_TARGETS[key]}
                  onClick={() => setActiveTab(key)}
                  className={`relative rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    selected ? "text-[#0F3D2E]" : "text-[#426352]"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="edukasi-portal-mobile-pill"
                      className="absolute inset-0 rounded-lg bg-[#A8D5BA]/80"
                    />
                  )}
                  <span className="relative z-10">{MOBILE_SHORT_LABELS[key]}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3.5 sm:p-4">
            <motion.div
              key={activeTab}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, ease: EASE_OUT_EXPO }}
            >
                {activeTab === "/dashboard" && (
                  <div className="flex flex-col gap-3.5">
                    {/* 1. Animated Welcome Card */}
                    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[#0F3D2E]">
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                              {!prefersReducedMotion && (
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D9E75] opacity-75" />
                              )}
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D9E75]" />
                            </span>
                            <span>Warga Surabaya</span>
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin size={13} className="text-gray-400" aria-hidden="true" />
                            <span>Kecamatan Wonokromo</span>
                          </span>
                        </div>

                        {todayLabel && (
                          <span className="rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs font-medium text-gray-600">
                            {todayLabel}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 lg:flex-nowrap">
                        <div className="min-w-0">
                          <h2 className="text-xl font-extrabold tracking-tight text-[#0F3D2E] sm:text-2xl">
                            Halo, Rendra Pratama
                          </h2>
                          <p className="mt-1 text-xs leading-relaxed text-[#4D6D5B] sm:text-sm">
                            Tercatat{" "}
                            <span className="font-bold text-[#1D9E75] tabular-nums">
                              {history.length} aksi hijau terverifikasi
                            </span>{" "}
                            aktif yang telah berkontribusi mengurangi jejak emisi kota.
                          </p>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <motion.button
                            type="button"
                            onClick={() => setActiveTab("/dashboard/eco-action")}
                            whileHover={prefersReducedMotion ? undefined : { y: -1.5, scale: 1.02 }}
                            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#1D9E75] to-[#15803D] px-5 py-3 text-xs font-bold text-white shadow-md shadow-emerald-950/20 sm:text-sm"
                          >
                            {!prefersReducedMotion && (
                              <motion.span
                                aria-hidden="true"
                                initial={{ x: "-130%" }}
                                animate={{ x: ["-130%", "230%"] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 3.2,
                                  ease: "easeInOut",
                                }}
                                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              />
                            )}
                            <Camera
                              size={16}
                              className="relative z-10 transition-transform duration-200 group-hover:rotate-[-6deg]"
                              aria-hidden="true"
                            />
                            <span className="relative z-10">Verifikasi Aksi Baru</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* 2. Staggered Animated KPI Cards */}
                    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                      {[
                        {
                          key: "points",
                          targetTab: "/dashboard/marketplace" as PortalTabKey,
                          Icon: Star,
                          color: "#B7791F",
                          label: "Saldo EcoPoints",
                          valueNode: (
                            <AnimatedMetric
                              value={ecoPoints}
                              localeFormat
                              active={hasEnteredView}
                              prefersReducedMotion={prefersReducedMotion}
                            />
                          ),
                          sub: `Level ${userLevel} (kurang ${pointsToNext} poin)`,
                        },
                        {
                          key: "verified",
                          targetTab: "/dashboard/eco-action" as PortalTabKey,
                          Icon: ShieldCheck,
                          color: "#1D9E75",
                          label: "Aksi Hijau Terverifikasi",
                          valueNode: (
                            <AnimatedMetric
                              value={history.length}
                              active={hasEnteredView}
                              prefersReducedMotion={prefersReducedMotion}
                            />
                          ),
                          sub: "Semua bukti valid",
                        },
                        {
                          key: "co2",
                          targetTab: "/dashboard/laporan-sampah" as PortalTabKey,
                          Icon: Leaf,
                          color: "#0E7490",
                          label: "Estimasi Reduksi Emisi",
                          valueNode: (
                            <>
                              <AnimatedMetric
                                value={totalCo2Kg}
                                decimals={1}
                                active={hasEnteredView}
                                prefersReducedMotion={prefersReducedMotion}
                              />{" "}
                              kg CO₂e
                            </>
                          ),
                          sub: `${totalSortedKg.toFixed(1)} kg sampah terpilah`,
                        },
                        {
                          key: "challenges",
                          targetTab: "/dashboard/eco-action" as PortalTabKey,
                          Icon: Target,
                          color: "#7C3AED",
                          label: "Tantangan Berjalan",
                          valueNode: (
                            <AnimatedMetric
                              value={runningChallengesCount}
                              active={hasEnteredView}
                              prefersReducedMotion={prefersReducedMotion}
                            />
                          ),
                          sub: `${completedChallengesCount} selesai dari 1 misi`,
                        },
                      ].map((kpi, idx) => (
                        <motion.button
                          key={kpi.key}
                          type="button"
                          onClick={() => setActiveTab(kpi.targetTab)}
                          initial={
                            prefersReducedMotion
                              ? false
                              : { opacity: 0, y: 12 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.45,
                            delay: prefersReducedMotion ? 0 : idx * 0.06,
                            ease: EASE_OUT_EXPO,
                          }}
                          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                          className="group flex gap-3 rounded-2xl border border-gray-200/90 bg-white p-4 text-left shadow-xs transition-colors hover:border-[#1D9E75]/45 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] sm:p-5"
                        >
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                            style={{ backgroundColor: `${kpi.color}18` }}
                          >
                            <kpi.Icon
                              size={18}
                              style={{ color: kpi.color }}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold text-gray-500">
                              {kpi.label}
                            </span>
                            <span className="block whitespace-nowrap text-base font-extrabold tabular-nums text-[#0F3D2E] sm:text-lg">
                              {kpi.valueNode}
                            </span>
                            <span className="mt-0.5 block text-[11px] font-medium text-gray-500">
                              {kpi.sub}
                            </span>
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    {/* 3. Interactive History & Side Panels Grid */}
                    <div className="grid gap-3.5 lg:grid-cols-[3fr_2fr]">
                      {/* Riwayat Aksi Hijau */}
                      <div className="flex flex-col gap-3.5">
                        <section
                          aria-labelledby="preview-history-heading"
                          className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs sm:p-6"
                        >
                          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <h3
                                id="preview-history-heading"
                                className="text-sm font-bold text-[#0F3D2E]"
                              >
                                Riwayat Aksi Hijau
                              </h3>
                              <span className="rounded-full bg-[#F0FAF4] px-2 py-0.5 text-[10px] font-semibold text-[#1D9E75]">
                                Klik baris untuk detail
                              </span>
                            </div>
                            <span className="text-xs font-medium text-gray-500">
                              {history.length} aksi tercatat
                            </span>
                          </div>

                          <ul className="divide-y divide-gray-100">
                            <AnimatePresence initial={false}>
                              {history.slice(0, 3).map((item, idx) => {
                                const isExpanded = expandedHistoryId === item.id;
                                return (
                                  <motion.li
                                    key={item.id}
                                    initial={
                                      item.isNew && !prefersReducedMotion
                                        ? {
                                            opacity: 0,
                                            height: 0,
                                            backgroundColor: "rgba(29,158,117,0.14)",
                                          }
                                        : false
                                    }
                                    animate={{
                                      opacity: 1,
                                      height: "auto",
                                      backgroundColor: "rgba(29,158,117,0)",
                                    }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                                    className="overflow-hidden"
                                  >
                                    <button
                                      type="button"
                                      data-demo-target={idx === 0 ? "demo-history-row-0" : undefined}
                                      onClick={() =>
                                        setExpandedHistoryId(isExpanded ? null : item.id)
                                      }
                                      aria-expanded={isExpanded}
                                      className="flex w-full items-center gap-3 rounded-xl px-1.5 py-3 text-left transition-colors hover:bg-[#FAFDFB]"
                                    >
                                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#0F3D2E]">
                                        <GreenActionIcon type={item.actionType} size={20} />
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-1.5">
                                          <span className="text-xs font-bold text-gray-800 sm:text-sm">
                                            {item.label}
                                          </span>
                                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#15803D]">
                                            <CheckCircle2 size={10} aria-hidden="true" />
                                            Terverifikasi
                                          </span>
                                          {item.isNew && (
                                            <span className="rounded bg-[#1D9E75] px-1.5 py-0.5 text-[9.5px] font-bold text-white">
                                              Baru
                                            </span>
                                          )}
                                        </div>
                                        <p className="mt-0.5 truncate text-[11px] text-gray-500">
                                          {item.quantityText}
                                          {item.co2Kg != null && `, est. ${item.co2Kg.toFixed(2)} kg CO₂e`},{" "}
                                          {item.district} · {item.timestampLabel}
                                        </p>
                                      </div>
                                      <div className="flex shrink-0 items-center gap-2">
                                        <span className="text-xs font-extrabold tabular-nums text-[#1D9E75]">
                                          +{item.points} poin
                                        </span>
                                        <ChevronDown
                                          size={14}
                                          aria-hidden="true"
                                          className={`text-gray-400 transition-transform duration-200 ${
                                            isExpanded ? "rotate-180 text-[#1D9E75]" : ""
                                          }`}
                                        />
                                      </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.22 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="mx-1.5 mb-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-950/10 bg-[#F7FBF9] px-3 py-2 text-[11px] text-[#426352]">
                                            <span>
                                              Audit: <strong>AI {item.confidence}%</strong> · Foto 1 Frame Valid
                                            </span>
                                            <span className="font-mono text-[10px] text-[#527362]">
                                              {item.hashPreview}
                                            </span>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.li>
                                );
                              })}
                            </AnimatePresence>
                          </ul>
                        </section>
                      </div>

                      {/* Right Stack: Tantangan + Kupon UMKM */}
                      <div className="flex flex-col gap-3.5">
                        {/* Tantangan Aksi Hijau */}
                        <section
                          aria-labelledby="preview-challenge-heading"
                          className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs sm:p-6"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <h3
                              id="preview-challenge-heading"
                              className="text-sm font-bold text-[#0F3D2E]"
                            >
                              Tantangan Aksi Hijau
                            </h3>
                            <button
                              type="button"
                              onClick={() => setActiveTab("/dashboard/eco-action")}
                              className="flex items-center gap-1 text-xs font-semibold text-[#1D9E75] transition-colors hover:text-[#15803D]"
                            >
                              Semua Misi <ArrowRight size={12} aria-hidden="true" />
                            </button>
                          </div>

                          <div className="mb-1.5 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-gray-800 sm:text-sm">
                                <GreenActionIcon
                                  type="waste_sorting"
                                  size={14}
                                  className="shrink-0"
                                />
                                Pekan Pilah Sampah Rumah Tangga
                              </p>
                              <p className="mt-0.5 text-[11px] text-gray-500">
                                {challengeProgress} dari {INITIAL_CHALLENGE_TARGET} terverifikasi · sisa 5 hari (+
                                {INITIAL_CHALLENGE_REWARD} poin)
                              </p>
                            </div>
                            <span className="shrink-0 text-xs font-extrabold tabular-nums text-[#0F3D2E]">
                              {challengePercent}%
                            </span>
                          </div>

                          {/* Living Shimmer Progress Bar */}
                          <div
                            className="relative h-2 overflow-hidden rounded-full bg-gray-100"
                            role="progressbar"
                            aria-label="Progres Pekan Pilah Sampah Rumah Tangga"
                            aria-valuenow={challengePercent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <motion.div
                              initial={prefersReducedMotion ? false : { width: 0 }}
                              animate={{
                                width: `${hasEnteredView ? challengePercent : 0}%`,
                              }}
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0.01 }
                                  : { duration: 0.75, ease: EASE_OUT_EXPO }
                              }
                              className="relative h-full overflow-hidden rounded-full bg-[#10B981]"
                            >
                              {!prefersReducedMotion && (
                                <motion.span
                                  aria-hidden="true"
                                  initial={{ x: "-120%" }}
                                  animate={{ x: ["-120%", "220%"] }}
                                  transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    repeatDelay: 2.2,
                                    ease: "easeInOut",
                                  }}
                                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                                />
                              )}
                            </motion.div>
                          </div>

                          <div className="mt-3.5">
                            {challengeProgress < INITIAL_CHALLENGE_TARGET ? (
                              <motion.button
                                type="button"
                                data-demo-target="demo-complete-challenge"
                                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                                disabled={quickSimulating}
                                onClick={handleQuickCompleteChallenge}
                                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-[#F0FAF4] px-3 py-2 text-[11.5px] font-bold text-[#0F3D2E] transition-colors hover:bg-[#E1F5E9] disabled:opacity-70"
                              >
                                <Sparkles size={13} className="text-[#1D9E75]" aria-hidden="true" />
                                <span>
                                  {quickSimulating
                                    ? "Memverifikasi setoran ke-3…"
                                    : "Simulasikan setoran ke-3 (+140 poin) →"}
                                </span>
                              </motion.button>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-bold text-[#15803D]"
                              >
                                <span>✓ Misi Tuntas! +100 Bonus Poin</span>
                                <button
                                  type="button"
                                  onClick={() => setActiveTab("/dashboard/marketplace")}
                                  className="underline hover:text-[#0F3D2E]"
                                >
                                  Tukar kupon →
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "/dashboard/eco-action" && (
                  <VerifyTabView
                    prefersReducedMotion={prefersReducedMotion}
                    onVerifiedAction={recordVerifiedAction}
                    onGoDashboard={() => setActiveTab("/dashboard")}
                  />
                )}

                {activeTab === "/dashboard/marketplace" && (
                  <MarketplaceTabView
                    ecoPoints={ecoPoints}
                    redeemedTickets={redeemedTickets}
                    prefersReducedMotion={prefersReducedMotion}
                    onRedeemReward={handleRedeemReward}
                  />
                )}

                {activeTab === "/dashboard/laporan-sampah" && (
                  <ReportTabView prefersReducedMotion={prefersReducedMotion} />
                )}

                {activeTab === "/dashboard/collaboration" && (
                  <CommunityTabView
                    posts={INITIAL_COMMUNITY_POSTS}
                    likedIds={likedPostIds}
                    prefersReducedMotion={prefersReducedMotion}
                    onToggleLike={handleToggleCommunityLike}
                  />
                )}

                {activeTab === "/dashboard/profile" && (
                  <ProfileTabView
                    ecoPoints={ecoPoints}
                    verifiedCount={history.length}
                    sortedKg={totalSortedKg}
                    prefersReducedMotion={prefersReducedMotion}
                    onGoVerify={() => setActiveTab("/dashboard/eco-action")}
                  />
                )}
            </motion.div>
          </div>

          {/* Mobile quick jump strip inside preview */}
          <nav
            aria-label="Pintasan langkah mobile"
            className="flex flex-wrap gap-1.5 border-t border-emerald-950/[0.07] bg-white p-4 md:hidden"
          >
            <Link
              href="/login?role=warga"
              className="rounded-lg bg-[#0F3D2E] px-2.5 py-1 text-[11px] font-bold text-white"
            >
              Buka Portal Warga →
            </Link>
            {journeyLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg border border-emerald-950/10 bg-[#FAFDFB] px-2.5 py-1 text-[11px] font-semibold text-[#0F3D2E]"
              >
                {item.step} · {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
