"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Camera,
  CheckCircle2,
  Gift,
  Heart,
  MapPin,
  Minus,
  Plus,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Store,
  Ticket,
  Trash2,
} from "lucide-react";
import { GREEN_ACTIONS, GREEN_ACTION_LIST, type GreenActionType } from "@/config/green-actions";
import { DEMO_REWARDS, type RewardItem } from "@/data/demo/umkm-rewards";
import { GreenActionIcon } from "@/components/common/icons";
import {
  REPORT_CATEGORIES,
  SURABAYA_SAMPLE_DISTRICTS,
  type PreviewCommunityPost,
  type PreviewVoucherTicket,
} from "./portalPreviewData";

const FEATURED_REWARDS: RewardItem[] = [
  DEMO_REWARDS.find((r) => r.id === "rw_tumbler_coffee"),
  DEMO_REWARDS.find((r) => r.id === "rw_compost"),
  DEMO_REWARDS.find((r) => r.id === "rw_jelantah_soap"),
  DEMO_REWARDS.find((r) => r.id === "rw_veg_bundle"),
].filter((r): r is RewardItem => Boolean(r));

export function VerifyTabView({
  prefersReducedMotion,
  onVerifiedAction,
  onGoDashboard,
}: {
  prefersReducedMotion: boolean;
  onVerifiedAction: (actionType: GreenActionType, quantity: number) => void;
  onGoDashboard: () => void;
}) {
  const [selectedType, setSelectedType] = useState<GreenActionType>("waste_sorting");
  const [quantity, setQuantity] = useState<number>(GREEN_ACTIONS.waste_sorting.quantity.default);
  const [phase, setPhase] = useState<"idle" | "scanning" | "verified">("idle");

  const activeDef = GREEN_ACTIONS[selectedType];
  const estCo2 = activeDef.estimateCo2Kg(quantity);

  function handleSelectType(type: GreenActionType) {
    setSelectedType(type);
    setQuantity(GREEN_ACTIONS[type].quantity.default);
    setPhase("idle");
  }

  function stepQuantity(delta: number) {
    const next = Number((quantity + delta * activeDef.quantity.step).toFixed(1));
    if (next < activeDef.quantity.min || next > activeDef.quantity.max) return;
    setQuantity(next);
  }

  function runVerification() {
    if (phase === "scanning") return;
    setPhase("scanning");
    const duration = prefersReducedMotion ? 120 : 1250;
    window.setTimeout(() => {
      onVerifiedAction(selectedType, quantity);
      setPhase("verified");
    }, duration);
  }

  return (
    <div className="space-y-3.5">
      <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#1D9E75]">
              Simulasi Portal Warga · AI Screening
            </p>
            <h3 className="mt-0.5 text-base font-extrabold text-[#0F3D2E] sm:text-lg">
              Verifikasi Aksi Hijau Baru
            </h3>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-[#0F3D2E]">
            +{activeDef.ecoPoints} EcoPoints / aksi
          </span>
        </div>

        {/* 5 Category Selector Pills with layoutId */}
        <div
          role="tablist"
          aria-label="Pilih kategori aksi hijau"
          className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
        >
          {GREEN_ACTION_LIST.map((item) => {
            const isSelected = item.type === selectedType;
            return (
              <motion.button
                key={item.type}
                type="button"
                role="tab"
                aria-selected={isSelected}
                data-demo-target={`demo-verify-cat-${item.type}`}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() => handleSelectType(item.type)}
                className={`relative flex flex-col items-start gap-1 rounded-xl border p-2.5 text-left transition-colors ${
                  isSelected
                    ? "border-[#1D9E75] bg-[#F0FAF4]"
                    : "border-gray-200/90 bg-[#FAFDFB] hover:border-emerald-950/20"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="preview-verify-cat-ring"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.01 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                    className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[#1D9E75]/25"
                  />
                )}
                <GreenActionIcon type={item.type} size={17} />
                <span className="text-[11.5px] font-bold leading-tight text-[#0F3D2E]">
                  {item.labelId}
                </span>
                <span className="text-[10.5px] font-semibold text-[#1D9E75]">
                  +{item.ecoPoints} poin
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Evidence Frame + Controls */}
        <div className="mt-4 grid gap-3.5 md:grid-cols-[1.25fr_1fr]">
          {/* Animated 1-Frame Camera / Scanner Box */}
          <div className="relative overflow-hidden rounded-xl border border-dashed border-[#A8D5BA] bg-gradient-to-br from-[#F7FBF9] to-[#EFF7F2] p-4">
            {phase === "scanning" && !prefersReducedMotion && (
              <motion.div
                aria-hidden="true"
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "88%", "0%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-x-0 z-20 h-0.5 bg-gradient-to-r from-transparent via-[#1D9E75] to-transparent shadow-[0_0_12px_2px_rgba(29,158,117,0.65)]"
              />
            )}

            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[10.5px] font-bold text-[#0F3D2E] shadow-xs">
                <Camera size={12} className="text-[#1D9E75]" aria-hidden="true" />
                <span>Bingkai Contoh · {activeDef.labelId}</span>
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  phase === "verified"
                    ? "bg-emerald-100 text-[#15803D]"
                    : phase === "scanning"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-white text-[#426352]"
                }`}
              >
                {phase === "verified"
                  ? "✓ Lolos AI + Hash"
                  : phase === "scanning"
                    ? "Memindai..."
                    : "1 Frame Siap"}
              </span>
            </div>

            <div className="my-3.5 flex items-center gap-3 rounded-lg border border-emerald-950/10 bg-white/90 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#1D9E75]">
                {phase === "scanning" ? (
                  <ScanLine size={20} className="animate-pulse" aria-hidden="true" />
                ) : phase === "verified" ? (
                  <CheckCircle2 size={20} aria-hidden="true" />
                ) : (
                  <GreenActionIcon type={selectedType} size={20} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#0F3D2E]">
                  {phase === "scanning"
                    ? "Memeriksa objek, resolusi ≥ 320px, & hash SHA-256…"
                    : phase === "verified"
                      ? `Bukti ${activeDef.labelId} terverifikasi (+${activeDef.ecoPoints} poin)`
                      : activeDef.evidenceRequirement}
                </p>
                <p className="mt-0.5 text-[10.5px] text-[#527362]">
                  Metadata GPS dihapus otomatis · Batas {activeDef.dailyLimit}×/hari
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#426352]">
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} className="text-[#1D9E75]" aria-hidden="true" />
                Kecamatan Wonokromo
              </span>
              {estCo2 != null ? (
                <span className="font-semibold text-[#0E7490]">
                  Est. -{estCo2.toFixed(2)} kg CO₂e
                </span>
              ) : (
                <span className="font-semibold text-[#1D9E75]">
                  {quantity} {activeDef.quantity.unit} terpilah
                </span>
              )}
            </div>
          </div>

          {/* Quantity + Trigger Verification */}
          <div className="flex flex-col justify-between gap-3 rounded-xl border border-gray-200/90 bg-[#FAFCFB] p-3.5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                Kuantitas ({activeDef.quantity.unit})
              </p>
              <div className="mt-2 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-2.5 py-2">
                <button
                  type="button"
                  onClick={() => stepQuantity(-1)}
                  aria-label="Kurangi jumlah"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5FAF7] text-[#0F3D2E] transition-colors hover:bg-emerald-100"
                >
                  <Minus size={14} aria-hidden="true" />
                </button>
                <span className="text-sm font-extrabold tabular-nums text-[#0F3D2E]">
                  {quantity} {activeDef.quantity.unit}
                </span>
                <button
                  type="button"
                  onClick={() => stepQuantity(1)}
                  aria-label="Tambah jumlah"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5FAF7] text-[#0F3D2E] transition-colors hover:bg-emerald-100"
                >
                  <Plus size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <motion.button
                type="button"
                data-demo-target="demo-verify-submit"
                whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                disabled={phase === "scanning"}
                onClick={runVerification}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1D9E75] to-[#15803D] px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-emerald-950/15 transition-all hover:brightness-110 disabled:opacity-70"
              >
                <ShieldCheck size={15} aria-hidden="true" />
                <span>
                  {phase === "scanning"
                    ? "Memeriksa Bukti…"
                    : phase === "verified"
                      ? "Simulasikan Aksi Lagi"
                      : `Verifikasi & Klaim +${activeDef.ecoPoints} Poin`}
                </span>
              </motion.button>

              <button
                type="button"
                onClick={onGoDashboard}
                className={`flex w-full items-center justify-center gap-1.5 rounded-xl border py-2 text-[11.5px] font-bold transition-all ${
                  phase === "verified"
                    ? "border-emerald-300 bg-emerald-50 text-[#0F3D2E] shadow-xs hover:bg-emerald-100/80"
                    : "border-emerald-950/10 bg-white text-[#426352] hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-[#0F3D2E]"
                }`}
              >
                <span>Lihat Hasil di Dashboard</span>
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketplaceTabView({
  ecoPoints,
  redeemedTickets,
  prefersReducedMotion,
  onRedeemReward,
}: {
  ecoPoints: number;
  redeemedTickets: PreviewVoucherTicket[];
  prefersReducedMotion: boolean;
  onRedeemReward: (reward: RewardItem) => void;
}) {
  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-200/90 bg-white px-4 py-3.5 shadow-xs sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#1D9E75]">
            <Gift size={18} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-[#0F3D2E]">
              Katalog Kupon Mitra UMKM Surabaya
            </h3>
            <p className="text-[11px] text-[#527362]">
              Klik tukar untuk mencoba pengurangan EcoPoints & pembuatan kode kupon simulasi.
            </p>
          </div>
        </div>
        <span className="rounded-xl border border-emerald-200 bg-[#F0FAF4] px-3 py-1.5 text-xs font-extrabold tabular-nums text-[#0F3D2E]">
          Saldo: {ecoPoints.toLocaleString("id-ID")} poin
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {FEATURED_REWARDS.map((reward, idx) => {
          const canAfford = ecoPoints >= reward.ecoPointsCost;
          const claimed = redeemedTickets.find((t) => t.rewardId === reward.id);
          return (
            <motion.div
              key={reward.id}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              className="flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs transition-shadow hover:border-[#1D9E75]/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#0F3D2E]">
                    <Store size={11} className="text-[#1D9E75]" aria-hidden="true" />
                    {reward.merchant.name}
                  </span>
                  <span className="text-xs font-extrabold tabular-nums text-[#B7791F]">
                    {reward.ecoPointsCost} poin
                  </span>
                </div>
                <p className="mt-2 text-xs font-bold text-[#0F3D2E] sm:text-sm">
                  {reward.title}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#527362]">
                  {reward.description}
                </p>
              </div>

              <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-gray-100 pt-2.5">
                {claimed ? (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-bold text-[#15803D]">
                    <Ticket size={12} aria-hidden="true" />
                    {claimed.code} · Aktif
                  </span>
                ) : (
                  <span className="text-[11px] text-gray-500">
                    Berlaku {reward.validityDays} hari
                  </span>
                )}

                <motion.button
                  type="button"
                  data-demo-target={idx === 1 ? "demo-marketplace-redeem-1" : undefined}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  disabled={!canAfford}
                  onClick={() => onRedeemReward(reward)}
                  className="rounded-lg bg-[#0F3D2E] px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-[#18533F] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                >
                  {claimed ? "Tukar Lagi" : canAfford ? "Tukar Kupon" : "Poin Kurang"}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function ReportTabView({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const [categoryId, setCategoryId] = useState<string>(REPORT_CATEGORIES[0].id);
  const [district, setDistrict] = useState<string>(SURABAYA_SAMPLE_DISTRICTS[0]);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  function submitMockReport() {
    const suffix = String(100 + Math.floor((district.length * 37 + categoryId.length * 19) % 899));
    setSubmittedCode(`LPR-2026-${suffix}`);
  }

  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Trash2 size={16} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-[#0F3D2E]">Laporan Titik Kebersihan Warga</h3>
            <p className="text-[11px] text-[#527362]">
              Agregasi anonim ke peta 5 wilayah (31 kecamatan) Surabaya.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-[#F0FAF4] px-2.5 py-0.5 text-[10.5px] font-bold text-[#1D9E75]">
          Tanpa alamat pribadi
        </span>
      </div>

      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
            Jenis Laporan
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {REPORT_CATEGORIES.map((cat) => {
              const active = categoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategoryId(cat.id);
                    setSubmittedCode(null);
                  }}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? "border-[#1D9E75] bg-[#F0FAF4] text-[#0F3D2E]"
                      : "border-gray-200 bg-[#FAFDFB] text-gray-600 hover:border-emerald-950/20"
                  }`}
                >
                  <span>{cat.label}</span>
                  {active && <CheckCircle2 size={14} className="text-[#1D9E75]" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
              Wilayah Kecamatan
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {SURABAYA_SAMPLE_DISTRICTS.map((name) => {
                const active = district === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setDistrict(name);
                      setSubmittedCode(null);
                    }}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? "border-[#0F3D2E] bg-[#0F3D2E] text-white"
                        : "border-gray-200 bg-white text-[#426352] hover:border-emerald-950/25"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <motion.button
              type="button"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              onClick={submitMockReport}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0F3D2E] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#18533F]"
            >
              <span>Kirim Simulasi Laporan · {district}</span>
              <ArrowRight size={13} aria-hidden="true" />
            </motion.button>

            <AnimatePresence>
              {submittedCode && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-[#0F3D2E]"
                >
                  <span>✓ Tercatat di peta wilayah {district}</span>
                  <span className="font-mono font-bold text-[#15803D]">{submittedCode}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommunityTabView({
  posts,
  likedIds,
  prefersReducedMotion,
  onToggleLike,
}: {
  posts: PreviewCommunityPost[];
  likedIds: string[];
  prefersReducedMotion: boolean;
  onToggleLike: (postId: string) => void;
}) {
  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const liked = likedIds.includes(post.id);
        return (
          <motion.div
            key={post.id}
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50">
                  <GreenActionIcon type={post.actionType} size={16} />
                </span>
                <div>
                  <p className="text-xs font-bold text-[#0F3D2E]">
                    {post.author} · <span className="font-medium text-[#527362]">{post.district}</span>
                  </p>
                  <p className="text-[10.5px] text-gray-400">{post.timeAgo}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#F0FAF4] px-2.5 py-0.5 text-[10.5px] font-bold text-[#1D9E75]">
                {post.impactLabel}
              </span>
            </div>

            <p className="mt-2.5 text-xs leading-relaxed text-[#426352]">{post.caption}</p>

            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#527362]">
                <Sparkles size={12} className="text-[#1D9E75]" aria-hidden="true" />
                Aksi Terverifikasi Warga
              </span>
              <motion.button
                type="button"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                onClick={() => onToggleLike(post.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold transition-colors ${
                  liked
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-gray-200 bg-[#FAFDFB] text-[#426352] hover:border-emerald-950/20"
                }`}
              >
                <Heart
                  size={12}
                  className={liked ? "fill-rose-500 text-rose-500" : ""}
                  aria-hidden="true"
                />
                <span>Dukung ({post.likes + (liked ? 1 : 0)})</span>
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ProfileTabView({
  ecoPoints,
  verifiedCount,
  sortedKg,
  prefersReducedMotion,
  onGoVerify,
}: {
  ecoPoints: number;
  verifiedCount: number;
  sortedKg: number;
  prefersReducedMotion: boolean;
  onGoVerify: () => void;
}) {
  const level = Math.floor(ecoPoints / 300) + 2;
  const progressInLevel = Math.min(100, Math.round(((ecoPoints % 300) / 300) * 100));

  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F3D2E] text-base font-extrabold text-white">
            RP
          </span>
          <div>
            <h3 className="text-base font-extrabold text-[#0F3D2E]">Rendra Pratama</h3>
            <p className="text-xs text-[#527362]">
              Warga Surabaya · Kecamatan Wonokromo · Level {level}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#1D9E75]">
          <Award size={14} aria-hidden="true" />
          Aktif Pilah Sampah
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-semibold text-[#0F3D2E]">
          <span>Progres Menuju Level {level + 1}</span>
          <span className="tabular-nums text-[#1D9E75]">{progressInLevel}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressInLevel}%` }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            }
            className="h-full rounded-full bg-gradient-to-r from-[#1D9E75] to-[#15803D]"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
        <div className="rounded-xl border border-gray-100 bg-[#FAFCFB] p-3">
          <p className="text-[11px] text-gray-500">EcoPoints</p>
          <p className="mt-0.5 text-base font-extrabold tabular-nums text-[#0F3D2E]">
            {ecoPoints.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-[#FAFCFB] p-3">
          <p className="text-[11px] text-gray-500">Aksi Valid</p>
          <p className="mt-0.5 text-base font-extrabold tabular-nums text-[#0F3D2E]">
            {verifiedCount}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-[#FAFCFB] p-3">
          <p className="text-[11px] text-gray-500">Terpilah</p>
          <p className="mt-0.5 text-base font-extrabold tabular-nums text-[#0F3D2E]">
            {sortedKg.toFixed(1)} kg
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onGoVerify}
        className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0F3D2E] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#18533F]"
      >
        <span>Tambah Aksi untuk Naik Level</span>
        <ArrowRight size={13} aria-hidden="true" />
      </button>
    </div>
  );
}
