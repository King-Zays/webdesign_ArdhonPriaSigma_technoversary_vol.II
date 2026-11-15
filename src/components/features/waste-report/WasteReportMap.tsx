"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  CATEGORY_CONFIG, SEVERITY_CONFIG, STATUS_CONFIG, useWasteReportStore,
  type WasteCategory, type WasteStatus,
} from "@/store/wasteReport.store";
import { findKecamatan } from "@/config/surabaya";
import { MapLoading } from "@/components/maps/MapLoading";
import DataBadge from "@/components/common/DataBadge";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/utils/cn";
import { WasteCategoryIcon } from "@/components/common/icons";

const WasteMapCanvas = dynamic(() => import("./WasteMapCanvas"), { ssr: false, loading: () => <MapLoading className="h-[360px] lg:h-[460px]" /> });

const STATUSES: WasteStatus[] = ["reported", "in_progress", "resolved", "rejected"];
const PAGE_SIZE = 10;

export default function WasteReportMap({ onDetail }: { onDetail: (id: string) => void }) {
  const hydrated = useHydrated();
  const reports = useWasteReportStore((s) => s.reports);
  const [status, setStatus] = useState<WasteStatus | "all">("all");
  const [category, setCategory] = useState<WasteCategory | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (hydrated ? reports : []).filter((r) => (status === "all" || r.status === status) && (category === "all" || r.category === category)),
    [reports, status, category, hydrated]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  const handleStatusChange = (val: WasteStatus | "all") => {
    setStatus(val);
    setPage(1);
  };

  const handleCategoryChange = (val: WasteCategory | "all") => {
    setCategory(val);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Ringkasan status (non-interaktif) + kelompok filter tepat di atas peta */}
      <section
        aria-labelledby="wr-summary-heading"
        className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs sm:p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 id="wr-summary-heading" className="text-xs font-bold text-[#0F3D2E]">
              Ringkasan Status Penanganan
            </h2>
            <p className="mt-0.5 text-[11px] text-gray-500">
              Menampilkan 3 status aktif &amp; selesai (tidak termasuk laporan berstatus Ditolak).
            </p>
          </div>
          <DataBadge variant="demo" label="Termasuk Laporan Simulasi" />
        </div>

        <dl className="mt-3 grid grid-cols-3 gap-2.5 sm:gap-3">
          {STATUSES.slice(0, 3).map((s) => {
            const count = hydrated ? reports.filter((r) => r.status === s).length : 0;
            const cfg = STATUS_CONFIG[s];
            return (
              <div
                key={s}
                className="rounded-xl border border-gray-100 bg-[#FAFCFB] px-3 py-2.5 sm:px-4"
                style={{ borderLeft: `4px solid ${cfg.color}` }}
              >
                <dt className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: cfg.color }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{cfg.label}</span>
                </dt>
                <dd className="mt-1 text-xl font-extrabold tabular-nums text-[#0F3D2E] sm:text-2xl">
                  {count}
                </dd>
              </div>
            );
          })}
        </dl>

        <div
          role="group"
          aria-label="Filter peta dan daftar laporan"
          className="mt-3.5 flex flex-col gap-2.5 border-t border-gray-100 pt-3.5 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label htmlFor="wr-filter-status" className="mb-1 block text-[11px] font-semibold text-gray-600">
              Filter Status
            </label>
            <select
              id="wr-filter-status"
              value={status}
              onChange={(e) => handleStatusChange(e.target.value as typeof status)}
              className="w-full cursor-pointer rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none transition-colors focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
            >
              <option value="all">Semua Status (termasuk Ditolak)</option>
              {STATUSES.map((s) => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="wr-filter-cat" className="mb-1 block text-[11px] font-semibold text-gray-600">
              Filter Kategori
            </label>
            <select
              id="wr-filter-cat"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as typeof category)}
              className="w-full cursor-pointer rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none transition-colors focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
            >
              <option value="all">Semua Kategori</option>
              {(Object.keys(CATEGORY_CONFIG) as WasteCategory[]).map((c) => <option key={c} value={c}>{CATEGORY_CONFIG[c].labelId}</option>)}
            </select>
          </div>
          {(status !== "all" || category !== "all") && (
            <button
              type="button"
              onClick={() => {
                setStatus("all");
                setCategory("all");
                setPage(1);
              }}
              className="shrink-0 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Reset Filter
            </button>
          )}
        </div>
      </section>

      <WasteMapCanvas reports={filtered} onSelect={(r) => onDetail(r.id)} className="h-[360px] lg:h-[460px]" />
      <p className="text-[11px] text-gray-500">Tampilan publik: Koordinat titik dibulatkan radius ~100m demi menjaga privasi lingkungan.</p>

      {/* Panel Daftar Laporan: disatukan dalam satu kartu putih berborder netral */}
      <section
        aria-labelledby="wr-list-heading"
        className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs sm:p-6"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <h3 id="wr-list-heading" className="text-sm font-bold text-[#0F3D2E]">
            Daftar Laporan Warga
          </h3>
          <span className="text-xs font-medium text-gray-500">
            {filtered.length} laporan ditemukan
            {totalPages > 1 ? ` · Halaman ${page} dari ${totalPages}` : ""}
          </span>
        </div>

        {paginated.length === 0 ? (
          <div className="rounded-xl bg-[#F9FAFB] px-4 py-8 text-center text-xs text-gray-500">
            Tidak ada laporan yang sesuai dengan filter status atau kategori yang dipilih.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {paginated.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => onDetail(r.id)}
                  className="group flex w-full items-start gap-3 py-3 text-left transition-colors hover:bg-[#FAFCFB] sm:items-center sm:rounded-xl sm:px-2"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#1D9E75]">
                    <WasteCategoryIcon category={r.category} size={18} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-bold leading-snug text-gray-800 group-hover:text-[#0F3D2E] sm:text-sm">
                        {r.title}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-gray-500">
                        {findKecamatan(r.kecamatanId)?.name} · {new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })} · {r.upvotes} dukungan
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:shrink-0 sm:justify-end">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                        style={{ color: STATUS_CONFIG[r.status].color, backgroundColor: STATUS_CONFIG[r.status].bg }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: STATUS_CONFIG[r.status].color }}
                          aria-hidden="true"
                        />
                        {STATUS_CONFIG[r.status].label}
                      </span>
                      <span
                        className="inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold"
                        style={{
                          color: SEVERITY_CONFIG[r.severity].color,
                          backgroundColor: SEVERITY_CONFIG[r.severity].bg,
                          borderColor: `${SEVERITY_CONFIG[r.severity].color}33`,
                        }}
                      >
                        Tingkat: {SEVERITY_CONFIG[r.severity].label}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Paginasi Rapi 10 Laporan per Halaman */}
        {totalPages > 1 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
            <span className="font-medium">
              Menampilkan <strong className="text-[#0F3D2E]">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</strong> dari <strong className="text-[#0F3D2E]">{filtered.length}</strong> laporan
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 font-bold text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Sebelumnya
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => {
                        setPage(pNum);
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      className={cn(
                        "h-7 w-7 rounded-lg text-xs font-bold transition-all",
                        page === pNum
                          ? "bg-[#0F3D2E] text-white shadow-xs"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 font-bold text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
