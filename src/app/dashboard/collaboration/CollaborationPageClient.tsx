"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgeCheck, MessageSquare, MapPin, ShieldCheck } from "lucide-react";
import PageWrapper from "@/components/common/PageWrapper";
import PostComposer from "@/components/features/collaboration-wall/PostComposer";
import PostCard from "@/components/features/collaboration-wall/PostCard";
import { useCollaborationStore } from "@/store/collaboration.store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/utils/cn";

type Filter = "all" | "verified" | "community";

const PAGE_SIZE = 3;

export default function CollaborationPageClient() {
  const hydrated = useHydrated();
  const posts = useCollaborationStore((s) => s.posts);
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () => (hydrated ? posts : []).filter((p) => filter === "all" || (filter === "verified" ? !!p.verifiedAction : !p.verifiedAction)),
    [hydrated, posts, filter]
  );

  const totalPages = Math.ceil(visible.length / PAGE_SIZE) || 1;
  const paginated = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const topTags = useMemo(() => {
    const count = new Map<string, number>();
    posts.forEach((p) => p.tags.forEach((t) => count.set(t, (count.get(t) ?? 0) + 1)));
    return Array.from(count.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [posts]);

  const topDistricts = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => {
      const kec = p.author?.kecamatan;
      if (kec) {
        counts.set(kec, (counts.get(kec) ?? 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [posts]);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 lg:gap-6">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-[#2D5F3F]">Kolaborasi Komunitas</p>
          <h1 className="text-xl font-bold text-[#1A1A1A] sm:text-2xl">Forum Komunitas Warga</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Perubahan lingkungan bergerak lebih cepat saat warga saling menginspirasi. Bagikan aksi nyata Anda, diskusikan ide hijau,
            dan bangun gerakan bersama warga Surabaya.
          </p>
        </header>

        <PostComposer />

        <div className="grid gap-4 lg:grid-cols-[3fr_2fr] lg:gap-6 items-start">
          <div className="flex flex-col gap-3">
            <div role="group" aria-label="Filter postingan" className="flex gap-1 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-1">
              {([
                ["all", "Semua Postingan"],
                ["verified", "Aksi Terverifikasi"],
                ["community", "Diskusi Warga"],
              ] as const).map(([id, label]) => (
                <button key={id} type="button" aria-pressed={filter === id} onClick={() => handleFilterChange(id)}
                  className={cn("flex-1 rounded-lg py-2 text-xs font-semibold", filter === id ? "bg-white text-[#2D5F3F] shadow-sm" : "text-gray-600")}>
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3" aria-live="polite">
              {paginated.map((p) => <PostCard key={p.id} post={p} />)}
              {hydrated && visible.length === 0 && <p className="rounded-xl bg-white p-6 text-center text-sm text-gray-500">Belum ada postingan pada kategori ini.</p>}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-xs shadow-sm">
                <span className="text-gray-500 font-medium">
                  Halaman <strong className="text-[#1A1A1A]">{page}</strong> dari <strong className="text-[#1A1A1A]">{totalPages}</strong> ({visible.length} postingan)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => {
                      setPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 320, behavior: "smooth" });
                    }}
                    className="rounded-lg border border-[#E5E7EB] px-3 py-1.5 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pNum = idx + 1;
                      if (pNum === 1 || pNum === totalPages || Math.abs(pNum - page) <= 1) {
                        return (
                          <button
                            key={pNum}
                            type="button"
                            onClick={() => {
                              setPage(pNum);
                              window.scrollTo({ top: 320, behavior: "smooth" });
                            }}
                            className={cn(
                              "h-7 w-7 rounded-lg font-bold text-xs transition-colors",
                              page === pNum ? "bg-[#2D5F3F] text-white" : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            {pNum}
                          </button>
                        );
                      }
                      if (pNum === 2 && page > 3) return <span key="ellipsis-1" className="text-gray-400 px-1">…</span>;
                      if (pNum === totalPages - 1 && page < totalPages - 2) return <span key="ellipsis-2" className="text-gray-400 px-1">…</span>;
                      return null;
                    })}
                  </div>
                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => {
                      setPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 320, behavior: "smooth" });
                    }}
                    className="rounded-lg border border-[#E5E7EB] px-3 py-1.5 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 h-fit" aria-label="Tentang forum komunitas">
            <section className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-bold text-[#1A1A1A]">Dua Kategori Postingan</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 border-b border-gray-100 pb-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0FAF4] text-[#2D5F3F]">
                    <BadgeCheck size={15} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-6 text-[#1A1A1A]">
                      Aksi Terverifikasi
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                      Aksi hijau yang lolos verifikasi, dengan ringkasan dampaknya.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <MessageSquare size={15} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-6 text-[#1A1A1A]">
                      Diskusi Warga
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                      Ide, agenda gotong royong, dan kabar lingkungan kampung.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-4 border-t border-gray-100 pt-3">
                <Link
                  href="/dashboard/eco-action"
                  className="inline-flex items-center text-sm font-semibold text-[#2D5F3F] hover:underline"
                >
                  Verifikasi aksi Anda untuk dibagikan →
                </Link>
              </div>
            </section>
            {topTags.length > 0 && (
              <section className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-sm font-bold text-[#1A1A1A]">Topik Populer</h2>
                <ul className="divide-y divide-gray-100">
                  {topTags.map(([t, n]) => (
                    <li
                      key={t}
                      className="flex min-h-[38px] items-center justify-between gap-3 py-2 text-xs"
                    >
                      <span className="min-w-0 flex-1 break-words font-semibold leading-5 text-[#1A1A1A]">
                        {t}
                      </span>
                      <span className="shrink-0 text-right font-medium tabular-nums text-gray-500">
                        {n} postingan
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {topDistricts.length > 0 && (
              <section className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h2 className="flex items-center gap-1.5 text-sm font-bold text-[#1A1A1A]">
                    <MapPin size={16} className="text-[#2D5F3F]" aria-hidden="true" />
                    Kecamatan Teraktif
                  </h2>
                  <span className="shrink-0 text-[11px] font-medium text-gray-500">Total Kiriman</span>
                </div>
                <ol className="divide-y divide-gray-100">
                  {topDistricts.map(([district, count], idx) => (
                    <li
                      key={district}
                      className="flex min-h-[38px] items-center justify-between gap-3 py-2 text-xs"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0FAF4] text-[11px] font-bold text-[#2D5F3F]">
                          {idx + 1}
                        </span>
                        <span className="min-w-0 flex-1 break-words font-semibold leading-5 text-[#1A1A1A]">
                          Kec. {district}
                        </span>
                      </div>
                      <span className="shrink-0 text-right font-bold tabular-nums text-[#0F3D2E]">
                        {count}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h2 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-[#1A1A1A]">
                <ShieldCheck size={16} className="text-[#2D5F3F]" aria-hidden="true" />
                Pedoman Komunitas Bersih
              </h2>
              <ol className="space-y-3">
                <li className="flex items-start gap-2.5 border-b border-gray-100 pb-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0FAF4] text-[11px] font-bold text-[#2D5F3F]">
                    1
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold leading-5 text-[#1A1A1A]">
                      Guyub & Santun
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                      Gunakan tutur kata sopan, hormati perbedaan, dan jalin kerukunan warga.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 border-b border-gray-100 pb-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0FAF4] text-[11px] font-bold text-[#2D5F3F]">
                    2
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold leading-5 text-[#1A1A1A]">
                      Aksi Asli & Nyata
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                      Kirim bukti foto kegiatan nyata di Surabaya tanpa manipulasi demi transparansi poin.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0FAF4] text-[11px] font-bold text-[#2D5F3F]">
                    3
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold leading-5 text-[#1A1A1A]">
                      Bebas Sampah & Hoaks
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                      Pastikan topik bermanfaat untuk kelestarian lingkungan dan terverifikasi akurat.
                    </p>
                  </div>
                </li>
              </ol>
            </section>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}
