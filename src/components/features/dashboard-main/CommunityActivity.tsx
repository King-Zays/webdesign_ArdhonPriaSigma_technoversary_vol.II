"use client";

import Link from "next/link";
import { useCollaborationStore } from "@/store/collaboration.store";
import { useHydrated } from "@/hooks/useHydrated";
import { timeAgo } from "@/utils/formatters";
import PostKindBadge from "@/components/features/collaboration-wall/PostKindBadge";

export default function CommunityActivity() {
  const hydrated = useHydrated();
  const posts = useCollaborationStore((s) => s.posts);

  return (
    <section aria-labelledby="community-heading" className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h2 id="community-heading" className="text-sm font-bold text-[#0F3D2E]">
          Aktivitas Komunitas Warga
        </h2>
        <Link href="/dashboard/collaboration" className="text-xs font-semibold text-[#1D9E75] hover:text-[#15803D] hover:underline">
          Buka Jaringan Komunitas →
        </Link>
      </div>
      <ul className="divide-y divide-gray-100">
        {(hydrated ? posts.slice(0, 4) : []).map((p) => (
          <li key={p.id} className="flex items-start gap-3 py-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-[#0F3D2E]"
              aria-hidden="true"
            >
              {p.author.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="break-words text-sm font-bold text-gray-800">{p.author.name}</span>
                <PostKindBadge post={p} />
              </div>
              <p className="mt-0.5 text-xs font-medium text-gray-500">
                {p.author.kecamatan} · {timeAgo(p.createdAt)}
              </p>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-600">{p.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
