"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpDown } from "lucide-react";
import { METRIC_META, type DistrictMetric, type DistrictStats } from "@/lib/impact-aggregation";
import { cn } from "@/utils/cn";

const COLUMNS: DistrictMetric[] = ["verifiedActions", "wasteReports", "estimatedCo2eKg", "activeContributors", "ecoPointsIssued", "umkmPartners"];
const PAGE_SIZE = 10;

/** Accessible tabular alternative to the map with clean 10-item pagination. */
export default function DistrictTable({
  stats,
  selectedId,
  onSelect,
  dark = false,
}: {
  stats: DistrictStats[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  dark?: boolean;
}) {
  const [sortKey, setSortKey] = useState<DistrictMetric>("verifiedActions");
  const [page, setPage] = useState(1);

  const rows = useMemo(
    () => [...stats].sort((a, b) => b[sortKey] - a[sortKey]),
    [stats, sortKey]
  );

  const totalPages = Math.ceil(rows.length / PAGE_SIZE) || 1;
  const paginatedRows = useMemo(
    () => rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [rows, page]
  );

  const handleSort = (key: DistrictMetric) => {
    setSortKey(key);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "overflow-x-auto rounded-xl border",
          dark ? "border-white/10" : "border-[#E5E7EB]"
        )}
      >
        <table
          className={cn(
            "w-full min-w-[860px] border-collapse text-left font-sans text-xs",
            dark ? "text-gray-200" : "text-gray-800"
          )}
        >
          <caption className="sr-only">
            Statistik kecamatan Surabaya (data simulasi). Diurutkan berdasarkan {METRIC_META[sortKey].label}.
          </caption>
          <thead>
            <tr
              className={cn(
                "border-b text-[11px] sm:text-xs",
                dark
                  ? "border-white/10 bg-white/5 text-gray-200"
                  : "border-[#E5E7EB] bg-gray-50/90 text-gray-700"
              )}
            >
              <th
                scope="col"
                className="min-w-[156px] whitespace-nowrap py-3 pl-4 pr-3 text-left font-bold"
              >
                Kecamatan
              </th>
              <th
                scope="col"
                className="min-w-[92px] whitespace-nowrap px-3 py-3 text-left font-bold"
              >
                Wilayah
              </th>
              {COLUMNS.map((c, idx) => {
                const isSorted = sortKey === c;
                const isLast = idx === COLUMNS.length - 1;
                return (
                  <th
                    key={c}
                    scope="col"
                    aria-sort={isSorted ? "descending" : "none"}
                    className={cn(
                      "min-w-[98px] p-0 text-right align-bottom font-bold transition-colors",
                      isSorted &&
                        (dark
                          ? "border-b-2 border-[#34D399] bg-emerald-500/15 text-emerald-300"
                          : "border-b-2 border-[#1D9E75] bg-emerald-50/75 text-[#0F3D2E]")
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(c)}
                      aria-label={`Urutkan menurun berdasarkan ${METRIC_META[c].label}`}
                      className={cn(
                        "group flex w-full items-center justify-end gap-1.5 py-3 text-right leading-snug transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1D9E75]",
                        isLast ? "pl-3 pr-4" : "px-3",
                        dark ? "hover:bg-white/10" : "hover:bg-gray-100/80",
                        isSorted && (dark ? "font-extrabold text-emerald-300" : "font-extrabold text-[#0F3D2E]")
                      )}
                    >
                      <span className="text-right">{METRIC_META[c].label}</span>
                      {isSorted ? (
                        <ArrowDown
                          size={13}
                          className={cn("shrink-0", dark ? "text-emerald-300" : "text-[#1D9E75]")}
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowUpDown
                          size={12}
                          className="shrink-0 opacity-35 transition-opacity group-hover:opacity-75"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={cn("divide-y", dark ? "divide-white/5" : "divide-gray-100")}>
            {paginatedRows.map((d) => {
              const isSelected = d.kecamatan.id === selectedId;
              return (
                <tr
                  key={d.kecamatan.id}
                  className={cn(
                    "transition-colors",
                    dark ? "hover:bg-white/5" : "hover:bg-gray-50/80",
                    isSelected && (dark ? "bg-white/10" : "bg-[#F0FAF4]")
                  )}
                >
                  <th
                    scope="row"
                    className={cn(
                      "whitespace-nowrap py-3 pl-4 pr-3 text-left text-xs font-bold sm:text-[13px]",
                      dark ? "text-white" : "text-[#0F3D2E]"
                    )}
                  >
                    {onSelect ? (
                      <button
                        type="button"
                        onClick={() => onSelect(d.kecamatan.id)}
                        className="rounded text-left hover:text-[#1D9E75] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]"
                      >
                        {d.kecamatan.name}
                      </button>
                    ) : (
                      d.kecamatan.name
                    )}
                  </th>
                  <td
                    className={cn(
                      "whitespace-nowrap px-3 py-3 text-left text-xs font-medium",
                      dark ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    {d.kecamatan.region}
                  </td>
                  {COLUMNS.map((c, idx) => {
                    const isSorted = sortKey === c;
                    const isLast = idx === COLUMNS.length - 1;
                    return (
                      <td
                        key={c}
                        className={cn(
                          "whitespace-nowrap py-3 text-right text-xs tabular-nums sm:text-[13px]",
                          isLast ? "pl-3 pr-4" : "px-3",
                          isSorted
                            ? dark
                              ? "bg-emerald-500/5 font-bold text-emerald-200"
                              : "bg-emerald-50/35 font-bold text-[#0F3D2E]"
                            : dark
                              ? "font-medium text-gray-100"
                              : "font-medium text-gray-800"
                        )}
                      >
                        {d[c].toLocaleString("id-ID")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginasi Rapi 10 Data per Halaman */}
      {totalPages > 1 && (
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-2.5 rounded-xl border px-4 py-2.5 text-xs",
            dark ? "border-white/10 bg-white/5 text-gray-300" : "border-[#E5E7EB] bg-[#FAFCFB] text-gray-600"
          )}
        >
          <span className="font-medium">
            Menampilkan data{" "}
            <strong className={dark ? "text-white" : "text-[#0F3D2E]"}>
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, rows.length)}
            </strong>{" "}
            dari <strong className={dark ? "text-white" : "text-[#0F3D2E]"}>{rows.length}</strong> kecamatan
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={cn(
                "rounded-lg border px-3 py-1.5 font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] disabled:cursor-not-allowed disabled:opacity-30",
                dark ? "border-white/10 hover:bg-white/10" : "border-[#E5E7EB] bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              Sebelumnya
            </button>
            <div className="flex flex-wrap items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pNum = idx + 1;
                return (
                  <button
                    key={pNum}
                    type="button"
                    aria-current={page === pNum ? "page" : undefined}
                    onClick={() => setPage(pNum)}
                    className={cn(
                      "h-7 w-7 rounded-lg text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75]",
                      page === pNum
                        ? "bg-[#0F3D2E] text-white shadow-xs"
                        : dark
                          ? "text-gray-300 hover:bg-white/10"
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
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={cn(
                "rounded-lg border px-3 py-1.5 font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9E75] disabled:cursor-not-allowed disabled:opacity-30",
                dark ? "border-white/10 hover:bg-white/10" : "border-[#E5E7EB] bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
