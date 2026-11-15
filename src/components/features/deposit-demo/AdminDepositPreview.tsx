"use client";

import { useDepositDemoRecords } from "@/hooks/useDepositDemoRecords";
import { DEPOSIT_MATERIALS, DEPOSIT_STATUS_LABELS } from "@/store/deposit-demo.store";

export default function AdminDepositPreview({ awaitingReview = false }: { awaitingReview?: boolean }) {
  const { deposits, hydrated } = useDepositDemoRecords();
  const visible = awaitingReview ? deposits.filter((deposit) => deposit.status === "weighed") : deposits;

  if (!hydrated) return <p>Memuat setoran simulasi…</p>;
  if (!visible.length) {
    return <p>{awaitingReview ? "Setoran yang menunggu verifikasi akan muncul di sini." : "Setoran demo di browser ini akan muncul di sini."}</p>;
  }

  return (
    <ul className="space-y-2">
      {visible.map((deposit) => (
        <li key={deposit.id} className="border-b border-emerald-100 pb-2 last:border-0">
          <span className="font-semibold">{DEPOSIT_MATERIALS[deposit.material]} · {deposit.id.slice(0, 8)}</span>
          <span className="block">{DEPOSIT_STATUS_LABELS[deposit.status]}</span>
        </li>
      ))}
    </ul>
  );
}
